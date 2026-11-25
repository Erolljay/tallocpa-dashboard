import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ocrProviderFromEnv } from "./gemini";
import type { OcrProvider } from "./provider";
import { DOC_TYPES, type DocType } from "@/lib/documents/labels";
import { lookupParties } from "@/lib/parties/lookup";
import { fillFromDirectory } from "@/lib/parties/resolve";
import { partyKey } from "@/lib/parties/tin";

/** Files staff attach to filings, and payroll in the client's own format, are not read by OCR. */
const SKIP: DocType[] = ["filed_return", "payment_proof", "payroll"];
const MAX_ATTEMPTS = 3;

/**
 * Reads one document with the OCR provider and saves what it found. Runs with the
 * service-role client (after an upload, from the Owner's button, or the nightly
 * job). A received document moves to Under review once OCR is done.
 */
export async function runOcr(admin: SupabaseClient, documentId: string, provider: OcrProvider | null = ocrProviderFromEnv()) {
  if (!provider) return { skipped: "No OCR key is set (GEMINI_API_KEY)." };
  const { data: doc, error } = await admin.from("documents").select("id, storage_path, mime_type, doc_type, status").eq("id", documentId).single();
  if (error || !doc) return { error: `Document not found: ${error?.message ?? documentId}` };
  if (SKIP.includes(doc.doc_type as DocType) || !["received", "under_review"].includes(doc.status)) return { skipped: "Not a document for OCR." };

  const { data: prior } = await admin.from("extractions").select("attempts").eq("document_id", documentId).maybeSingle();
  const attempts = (prior?.attempts ?? 0) + 1;
  await admin.from("extractions").upsert({
    document_id: documentId, status: "pending", provider: provider.name, model: provider.model, attempts, started_at: new Date().toISOString(), error: null,
  });

  try {
    const { data: file, error: dlError } = await admin.storage.from("documents").download(doc.storage_path);
    if (dlError || !file) throw new Error(`Could not read the file: ${dlError?.message ?? "missing"}`);
    const out = await provider.extract({
      bytes: new Uint8Array(await file.arrayBuffer()),
      mimeType: doc.mime_type,
      docTypeHint: DOC_TYPES[doc.doc_type as DocType] ?? doc.doc_type,
    });
    // The parties directory: a TIN on file brings its registered name and address.
    const key = partyKey(out.fields.party_tin);
    const entry = key ? (await lookupParties(admin, [out.fields.party_tin]).catch(() => null))?.get(key) : undefined;
    const { fields, confidence } = fillFromDirectory(out.fields, out.confidence as Record<string, number>, entry);
    await admin.from("extractions").update({ status: "done", model: out.model ?? provider.model, fields, confidence, finished_at: new Date().toISOString() }).eq("document_id", documentId);
    if (doc.status === "received") await admin.from("documents").update({ status: "under_review" }).eq("id", documentId).eq("status", "received");
    return { ok: true as const };
  } catch (e) {
    await admin.from("extractions").update({ status: "failed", error: (e as Error).message.slice(0, 500), finished_at: new Date().toISOString() }).eq("document_id", documentId);
    return { error: (e as Error).message };
  }
}

/** Nightly safety net: documents never read, or whose OCR failed fewer than 3 times. */
export async function runPendingOcr(admin: SupabaseClient, limit = 50) {
  const provider = ocrProviderFromEnv();
  if (!provider) return { read: 0, failed: 0, skipped: "no key" };
  const { data: docs } = await admin.from("documents").select("id, extractions(status, attempts)").in("status", ["received", "under_review"]).not("doc_type", "in", `(${SKIP.join(",")})`).order("created_at").limit(500);
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
  return { read, failed };
}
