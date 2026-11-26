"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postDocumentToBooks, unpostDocumentFromBooks, type DocumentCodes } from "@/lib/books/actions";
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
  const supabase = await supabaseServer();
  // Correcting a document already in the Books: void its invoice (and receipt or payment) first, then post it again below.
  let unposted = false;
  if (mode === "edit" && form.has("ledger_account")) {
    const { data: inBooks } = await supabase.from("book_invoices").select("id").eq("document_id", documentId).is("voided_at", null).maybeSingle();
    if (inBooks) {
      try {
        await unpostDocumentFromBooks(documentId, "Document figures corrected", supabase);
        unposted = true;
      } catch (e) {
        return { error: `The Books could not be corrected: ${(e as Error).message}` };
      }
    }
  }
  const { data, error } = await supabase.rpc("approve_document", { p_document: documentId, p_fields: fields });
  if (error) {
    // Put the document back in the Books as it was.
    if (unposted) await postDocumentToBooks(documentId, {}, supabase).catch(() => null);
    return { error: error.message };
  }
  revalidatePath("/app", "layout");
  revalidatePath("/portal", "layout");
  const clientId = (data as { client_id?: string } | null)?.client_id;
  // Bookkeeping clients: the approved document goes to the Books (a Sales or Purchase Invoice,
  // with its Receipt or Payment when cash; a 2307 received marks the CWT it supports).
  if (form.has("ledger_account")) {
    const account = String(form.get("ledger_account") ?? "");
    let codes: DocumentCodes | null = null;
    try {
      const raw = String(form.get("books_codes") ?? "");
      codes = raw ? (JSON.parse(raw) as DocumentCodes) : null;
    } catch {
      codes = null;
    }
    try {
      await postDocumentToBooks(documentId, { accountId: account || null, cashAccountId: fields.payment_terms === "cash" ? fields.payment_account ?? null : null, codes }, supabase);
    } catch (e) {
      return { error: `The figures were approved, but the document was not posted to the Books: ${(e as Error).message}` };
    }
  }
  // Back to the Inbox tab the document came from (Sales, Purchases & Expenses, Other):
  // its Approved list after a correction, else what is still waiting.
  const stream = streamOf((data as { doc_type?: string } | null)?.doc_type as DocType);
  const tab = (stream && stream !== "sales" ? `&tab=${stream}` : "") + (mode === "edit" ? "&view=approved" : "");
  redirect(clientId ? `/app/documents?client=${clientId}${tab}` : "/app/documents");
}
