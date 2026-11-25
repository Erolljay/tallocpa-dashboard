"use server";

import { revalidatePath } from "next/cache";
import { bulkReadiness } from "@/lib/documents/bulk";
import { manilaToday } from "@/lib/filings/run";
import { normalizeFields, type OcrConfidence, type OcrFields } from "@/lib/ocr/fields";
import { supabaseServer } from "@/lib/supabase/server";

export type BulkState = { ok?: string; error?: string };

const BOOKED = ["sales_invoice", "purchase_receipt", "bir_2307_received", "bir_2307_issued"];

/**
 * "Approve selected" in a client's pending list (P1): approves each document's figures
 * as OCR read them and books it to the account title chosen in the list. Each one is
 * checked again here (read cleanly, no warning, not a duplicate); one that fails is
 * skipped and named, the rest go through. The title chosen for a supplier or customer
 * is saved for this client only (book_document → client_party_accounts).
 */
export async function approveSelectedAction(clientId: string, items: { documentId: string; accountId: string | null }[]): Promise<BulkState> {
  if (items.length === 0) return { error: "Select the documents to approve." };
  const supabase = await supabaseServer();
  const ids = items.map((i) => i.documentId);
  const [{ data: docs, error }, { data: books }] = await Promise.all([
    supabase
      .from("documents")
      .select("id, client_id, doc_type, status, prior_year, file_name, extractions(status, fields, confidence)")
      .in("id", ids)
      .eq("client_id", clientId),
    supabase.from("client_books").select("client_id").eq("client_id", clientId).maybeSingle(),
  ]);
  if (error) return { error: error.message };
  const today = manilaToday();

  // Duplicates: an approved document of this client with the same TIN and number.
  const { data: approved } = await supabase
    .from("extractions")
    .select("approved_fields, documents!inner(client_id)")
    .eq("documents.client_id", clientId)
    .not("approved_fields", "is", null)
    .limit(5000);
  const seen = new Set((approved ?? []).map((a) => key(a.approved_fields as OcrFields)).filter(Boolean));

  let done = 0;
  const skipped: string[] = [];
  for (const item of items) {
    const d = (docs ?? []).find((x) => x.id === item.documentId);
    if (!d || !["received", "under_review"].includes(d.status)) {
      skipped.push(`${d?.file_name ?? "a document"} (no longer waiting)`);
      continue;
    }
    const e = d.extractions as unknown as { status: string; fields: OcrFields; confidence: OcrConfidence } | null;
    const fields = normalizeFields(e?.fields ?? {});
    const k = key(fields);
    const r = bulkReadiness(e && { ...e, fields }, { today, priorYear: d.prior_year, duplicate: Boolean(k && seen.has(k)) });
    if (!r.ready) {
      skipped.push(`${d.file_name} (${r.reason})`);
      continue;
    }
    const booked = Boolean(books) && BOOKED.includes(d.doc_type);
    if (booked && !item.accountId && d.doc_type !== "bir_2307_issued" && d.doc_type !== "bir_2307_received") {
      skipped.push(`${d.file_name} (choose the account title)`);
      continue;
    }
    const a = await supabase.rpc("approve_document", { p_document: d.id, p_fields: fields });
    if (a.error) {
      skipped.push(`${d.file_name} (${a.error.message})`);
      continue;
    }
    if (k) seen.add(k);
    if (booked) {
      const b = await supabase.rpc("book_document", { p_document: d.id, p_account: item.accountId });
      if (b.error) {
        skipped.push(`${d.file_name} (approved, not booked: ${b.error.message})`);
        done += 1;
        continue;
      }
    }
    done += 1;
  }
  revalidatePath("/app", "layout");
  revalidatePath("/portal", "layout");
  const ok = done ? `Approved ${done} document${done === 1 ? "" : "s"}.` : undefined;
  return skipped.length ? { ok, error: `Not approved: ${skipped.join("; ")}. Open ${skipped.length === 1 ? "it" : "them"} to review.` } : { ok };
}

function key(f: OcrFields | null | undefined): string | null {
  return f?.party_tin && f.number ? `${f.party_tin}|${f.number}` : null;
}
