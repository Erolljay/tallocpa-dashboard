"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { DocumentCodes } from "@/lib/books/actions";
import { slpCategoryFromCodes } from "@/lib/books/slp-from-codes";
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
  if (Number(form.get("books_unconfirmed") ?? 0) > 0) return { error: "Confirm the tax codes OCR suggested (or choose others) first." };
  if (form.has("ledger_account") && fields.payment_terms === "cash" && form.has("books_codes") && !fields.payment_account) {
    return { error: "Choose the cash or bank account it went to or came from." };
  }
  let codes: DocumentCodes | null = null;
  try {
    const rawCodes = String(form.get("books_codes") ?? "");
    codes = rawCodes ? (JSON.parse(rawCodes) as DocumentCodes) : null;
  } catch {
    codes = null;
  }
  const supabase = await supabaseServer();
  // Books clients choose the SLP category once, on the Input VAT tax code: the register follows it.
  if (codes) {
    try {
      fields.slp_category = (await slpCategoryFromCodes(supabase, codes)) ?? fields.slp_category ?? null;
    } catch (e) {
      return { error: (e as Error).message };
    }
  }
  // Approved and posted to the Books together (bookkeeping clients): a Sales or Purchase
  // Invoice, with its Receipt or Payment when cash; a 2307 received marks the CWT it
  // supports. When it cannot be posted (a locked month, no account), nothing is approved.
  // Correcting a document already in the Books voids its invoice first, in the same step.
  const books = form.has("ledger_account");
  const account = String(form.get("ledger_account") ?? "");
  const { data, error } = await supabase.rpc("approve_and_post_document", {
    p_document: documentId,
    p_fields: fields,
    p_post: books,
    p_account: books ? account || null : null,
    p_cash_account: books && fields.payment_terms === "cash" ? fields.payment_account ?? null : null,
    p_codes: books ? codes : null,
    p_redate: form.get("redate") === "1",
  });
  if (error) {
    // Dated in a locked month: offer the first open month after it (the late-document practice).
    if (error.code === "TL001" && error.hint) return { lockedMonth: { message: error.message, openMonth: error.hint } };
    return { error: books ? `Not approved: it could not be posted to the Books. ${error.message}` : error.message };
  }
  revalidatePath("/app", "layout");
  revalidatePath("/portal", "layout");
  const clientId = (data as { client_id?: string } | null)?.client_id;
  // Back to the Inbox tab the document came from (Sales, Purchases & Expenses, Other):
  // its Approved list after a correction, else what is still waiting.
  const stream = streamOf((data as { doc_type?: string } | null)?.doc_type as DocType);
  const tab = (stream && stream !== "sales" ? `&tab=${stream}` : "") + (mode === "edit" ? "&view=approved" : "");
  redirect(clientId ? `/app/documents?client=${clientId}${tab}` : "/app/documents");
}
