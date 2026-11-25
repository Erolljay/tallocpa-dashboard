"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { DocActionState } from "@/lib/documents/actions";
import { streamOf, type DocType } from "@/lib/documents/labels";
import { normalizeFields, OCR_FIELDS, type OcrFields } from "@/lib/ocr/fields";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Staff approve the figures (as edited), or correct an approved document's figures
 * before its month is locked. Corrections from OCR are logged by the database.
 */
export async function approveDocumentAction(documentId: string, mode: "approve" | "edit", _: DocActionState, form: FormData): Promise<DocActionState> {
  const raw: OcrFields = {};
  for (const f of OCR_FIELDS) {
    const v = form.get(f.key);
    raw[f.key] = typeof v === "string" && v.trim() !== "" ? v.trim() : null;
  }
  const fields = normalizeFields(raw);
  for (const f of OCR_FIELDS) {
    if (f.kind === "amount" && raw[f.key] && !fields[f.key]) return { error: `${f.label}: enter a number like 1120.50.` };
  }
  // Bookkeeping clients: bank or card charges need their account before anything is approved.
  if (form.has("ledger_account") && Number(fields.other_deduction ?? 0) > 0 && !fields.other_deduction_account) {
    return { error: "Choose the account for the other deduction (for example Bank Charges)." };
  }
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("approve_document", { p_document: documentId, p_fields: fields });
  if (error) return { error: error.message };
  revalidatePath("/app", "layout");
  revalidatePath("/portal", "layout");
  const clientId = (data as { client_id?: string } | null)?.client_id;
  // Bookkeeping clients: the approved document becomes a suggested journal entry (no-op for other clients).
  if (form.has("ledger_account")) {
    const account = String(form.get("ledger_account") ?? "");
    const booked = await supabase.rpc("book_document", { p_document: documentId, p_account: account || null });
    if (booked.error) return { error: `The figures were approved, but the document was not booked: ${booked.error.message}` };
  }
  if (mode === "edit" && clientId) redirect(`/app/documents?tab=approved&client=${clientId}`);
  // Back to the Inbox tab the document came from (Sales, Purchases & Expenses, Other).
  const stream = streamOf((data as { doc_type?: string } | null)?.doc_type as DocType);
  const tab = stream && stream !== "sales" ? `&tab=${stream}` : "";
  redirect(clientId ? `/app/documents?client=${clientId}${tab}` : "/app/documents");
}
