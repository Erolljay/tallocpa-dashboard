import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { isSplittable, MAX_BUNDLE_PAGES, pdfPageCount, planRead, tooManyPagesMessage, type ReadPlan } from "./bundle";
import type { OcrOutput } from "./fields";
import { ocrProviderFromEnv } from "./gemini";
import type { OcrProvider } from "./provider";
import { DOC_TYPES, type DocType } from "@/lib/documents/labels";
import { lookupParties } from "@/lib/parties/lookup";
import { fillFromDirectory } from "@/lib/parties/resolve";
import { partyKey } from "@/lib/parties/tin";
import { runPayrollRead, runPendingPayrollReads } from "@/lib/payroll/read/run";

/**
 * Files staff attach to filings are not read by OCR. Payroll in the client's own
 * format is not read into extractions either: it has its own reader, into the
 * Tallo payroll register for staff review (lib/payroll/read).
 */
const SKIP: DocType[] = ["filed_return", "payment_proof", "payroll"];
const MAX_ATTEMPTS = 3;

/** Read again on a bundle once some of its invoices are approved: refused, it would duplicate them. */
export const REREAD_APPROVED = "Some invoices from this PDF are already approved: reading it again would duplicate them. Add or remove invoices by hand instead.";

class TooManyPages extends Error {
  constructor(readonly pages: number) {
    super(tooManyPagesMessage(pages));
  }
}

/**
 * Reads one document with the OCR provider and saves what it found. Runs with the
 * service-role client (after an upload, from the Owner's button, or the nightly
 * job). A received document moves to Under review once OCR is done.
 *
 * A PDF of invoices, receipts or 2307s is read as a list (lib/ocr/bundle.ts): with
 * more than one found, it becomes a bundle with one Inbox line per invoice
 * (split_document). Reading a bundle again replaces its invoices not yet approved,
 * and is refused once any is approved. An invoice of a bundle is not read on its own.
 */
export async function runOcr(
  admin: SupabaseClient,
  documentId: string,
  provider: OcrProvider | null = ocrProviderFromEnv(),
): Promise<{ ok: true; invoices?: number } | { skipped: string } | { error: string }> {
  const { data: doc, error } = await admin.from("documents").select("id, storage_path, mime_type, doc_type, status, bundle_id").eq("id", documentId).single();
  if (error || !doc) return { error: `Document not found: ${error?.message ?? documentId}` };
  if (doc.doc_type === "payroll") return runPayrollRead(admin, documentId);
  if (doc.bundle_id) return { skipped: "This invoice is part of a bundled PDF: read the PDF again from its bundle." };
  if (!provider) return { skipped: "No OCR key is set (GEMINI_API_KEY)." };
  if (SKIP.includes(doc.doc_type as DocType) || !["received", "under_review", "split"].includes(doc.status) || !doc.storage_path) return { skipped: "Not a document for OCR." };
  if (doc.status === "split") {
    const { count } = await admin.from("documents").select("id", { count: "exact", head: true }).eq("bundle_id", documentId).eq("status", "posted");
    if (count) return { error: REREAD_APPROVED };
  }

  const { data: prior } = await admin.from("extractions").select("attempts").eq("document_id", documentId).maybeSingle();
  const attempts = (prior?.attempts ?? 0) + 1;
  await admin.from("extractions").upsert({
    document_id: documentId, status: "pending", provider: provider.name, model: provider.model, attempts, started_at: new Date().toISOString(), error: null,
  });

  try {
    const { data: file, error: dlError } = await admin.storage.from("documents").download(doc.storage_path);
    if (dlError || !file) throw new Error(`Could not read the file: ${dlError?.message ?? "missing"}`);
    const input = {
      bytes: new Uint8Array(await file.arrayBuffer()),
      mimeType: doc.mime_type,
      docTypeHint: DOC_TYPES[doc.doc_type as DocType] ?? doc.doc_type,
    };
    let plan: ReadPlan;
    if (provider.extractMany && isSplittable(doc.doc_type, doc.mime_type)) {
      // Too long a bundle is refused before it is sent to the model.
      const pdfPages = pdfPageCount(input.bytes);
      if (pdfPages != null && pdfPages > MAX_BUNDLE_PAGES) throw new TooManyPages(pdfPages);
      plan = planRead(await provider.extractMany(input), { pdfPages });
      if (plan.kind === "too_many_pages") throw new TooManyPages(plan.pages);
    } else {
      plan = { kind: "single", read: await provider.extract(input) };
    }

    // Several invoices, or a bundle read again: its lines are replaced in one go.
    if (plan.kind === "split" || doc.status === "split") {
      const parts = plan.kind === "split" ? plan.parts : [{ ...plan.read, page: 1, position: null }];
      const filled = await withDirectory(admin, parts);
      const { error: splitError } = await admin.rpc("split_document", {
        p_document: documentId,
        p_pages: plan.kind === "split" ? plan.pages : null,
        p_parts: filled.map((p) => ({ page: p.page, position: p.position, fields: p.fields, confidence: p.confidence })),
        p_provider: provider.name,
        p_model: parts[0]?.model ?? provider.model,
      });
      if (splitError) throw new Error(splitError.message);
      return { ok: true as const, invoices: parts.length };
    }

    const out = plan.read;
    const [{ fields, confidence }] = await withDirectory(admin, [out]);
    await admin.from("extractions").update({ status: "done", model: out.model ?? provider.model, fields, confidence, finished_at: new Date().toISOString() }).eq("document_id", documentId);
    if (doc.status === "received") await admin.from("documents").update({ status: "under_review" }).eq("id", documentId).eq("status", "received");
    return { ok: true as const };
  } catch (e) {
    // Too many pages will not get better by trying again: the nightly job leaves it.
    const tooMany = e instanceof TooManyPages;
    await admin
      .from("extractions")
      .update({ status: "failed", error: (e as Error).message.slice(0, 500), finished_at: new Date().toISOString(), ...(tooMany ? { attempts: Math.max(attempts, MAX_ATTEMPTS) } : {}) })
      .eq("document_id", documentId);
    return { error: (e as Error).message };
  }
}

/** The parties directory: a TIN on file brings its registered name and address. A directory that cannot be read never blocks OCR. */
async function withDirectory<T extends OcrOutput>(admin: SupabaseClient, reads: T[]): Promise<T[]> {
  const tins = reads.map((r) => r.fields.party_tin).filter((t) => partyKey(t));
  const directory = tins.length ? await lookupParties(admin, tins).catch(() => null) : null;
  return reads.map((r) => {
    const key = partyKey(r.fields.party_tin);
    const entry = key ? directory?.get(key) : undefined;
    const { fields, confidence } = fillFromDirectory(r.fields, r.confidence as Record<string, number>, entry);
    return { ...r, fields, confidence };
  });
}

/** Nightly safety net: documents never read, or whose OCR failed fewer than 3 times; payroll documents too. Invoices of a bundle are read with their bundle. */
export async function runPendingOcr(admin: SupabaseClient, limit = 50) {
  const payroll = await runPendingPayrollReads(admin).catch((e: Error) => ({ error: e.message }));
  const provider = ocrProviderFromEnv();
  if (!provider) return { read: 0, failed: 0, skipped: "no key", payroll };
  const { data: docs } = await admin
    .from("documents")
    .select("id, extractions(status, attempts)")
    .in("status", ["received", "under_review"])
    .is("bundle_id", null)
    .not("doc_type", "in", `(${SKIP.join(",")})`)
    .order("created_at")
    .limit(500);
  const todo = (docs ?? [])
    .filter((d) => {
      const e = (d.extractions as unknown as { status: string; attempts: number } | null) ?? null;
      return !e || (e.status === "failed" && e.attempts < MAX_ATTEMPTS) || (e.status === "pending" && e.attempts < MAX_ATTEMPTS);
    })
    .slice(0, limit);
  let read = 0;
  let failed = 0;
  for (const d of todo) {
    const r = await runOcr(admin, d.id, provider);
    if ("ok" in r) read++;
    else if ("error" in r) failed++;
  }
  return { read, failed, payroll };
}
