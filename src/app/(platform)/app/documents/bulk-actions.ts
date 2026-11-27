"use server";

import { revalidatePath } from "next/cache";
import type { DocumentCodes } from "@/lib/books/actions";
import { missingForApproval, missingMessage } from "@/lib/documents/required";
import { slpCategoryFromCodes } from "@/lib/books/slp-from-codes";
import { bulkReadiness } from "@/lib/documents/bulk";
import { manilaToday } from "@/lib/filings/run";
import { normalizeFields, type OcrConfidence, type OcrFields } from "@/lib/ocr/fields";
import { supabaseServer } from "@/lib/supabase/server";

export type BulkState = { ok?: string; error?: string };

const BOOKED = ["sales_invoice", "purchase_receipt", "bir_2307_received", "bir_2307_issued"];
/** Sales and purchases become Book invoices (and a receipt or payment when cash). */
const INVOICED = ["sales_invoice", "purchase_receipt"];

export interface ApproveItem {
  documentId: string;
  accountId: string | null;
  /** Sales / purchases: cash (invoice + receipt or payment) or charge (invoice on account). */
  terms?: "cash" | "charge" | null;
  /** Cash only: the cash or bank account it went to or came from. */
  cashAccountId?: string | null;
  /** The tax codes confirmed on the row. */
  codes?: DocumentCodes | null;
}

/**
 * "Approve selected" in a client's pending list (P1): approves each document's figures
 * as OCR read them (with cash or charge as chosen on the row), then posts it to the
 * Books (postDocumentToBooks): a sale as a Sales Invoice, and its Receipt when cash; a
 * purchase as a Purchase Invoice, and its Payment when cash; a 2307 received marks the
 * CWT it supports. Each one is checked again here (read cleanly, no warning, not a
 * duplicate); one that fails is skipped and named, the rest go through. The title and
 * tax codes chosen for a supplier or customer are saved for this client only.
 */
export async function approveSelectedAction(clientId: string, items: ApproveItem[]): Promise<BulkState> {
  if (items.length === 0) return { error: "Select the documents to approve." };
  const supabase = await supabaseServer();
  const ids = items.map((i) => i.documentId);
  const [{ data: docs, error }, { data: books }] = await Promise.all([
    supabase
      .from("documents")
      .select("id, client_id, doc_type, status, prior_year, document_month, file_name, extractions(status, fields, confidence)")
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
    const r = bulkReadiness(e && { ...e, fields }, { today, priorYear: d.prior_year, duplicate: Boolean(k && seen.has(k)), docType: d.doc_type, documentMonth: d.document_month });
    if (!r.ready) {
      skipped.push(`${d.file_name} (${r.reason})`);
      continue;
    }
    const booked = Boolean(books) && BOOKED.includes(d.doc_type);
    if (booked && !item.accountId && d.doc_type !== "bir_2307_issued" && d.doc_type !== "bir_2307_received") {
      skipped.push(`${d.file_name} (choose the account title)`);
      continue;
    }
    const invoiced = booked && INVOICED.includes(d.doc_type);
    if (invoiced && item.terms === "cash" && !item.cashAccountId) {
      skipped.push(`${d.file_name} (choose the cash or bank account)`);
      continue;
    }
    // "Goes to the Books as" sets cash or charge on the approved figures (the register follows them).
    const approvedFields = invoiced && (item.terms === "cash" || item.terms === "charge") ? { ...fields, payment_terms: item.terms, payment_account: item.terms === "cash" ? item.cashAccountId ?? fields.payment_account ?? null : fields.payment_account ?? null } : { ...fields };
    // The SLP category is the Input VAT code's (capital goods, other goods, services): asked once, on the code.
    if (invoiced && item.codes) {
      const slp = await slpCategoryFromCodes(supabase, item.codes).catch(() => null);
      if (slp) approvedFields.slp_category = slp;
    }
    // What the Books and the BIR lists need: a document still missing one is opened, not bulk-approved.
    const missing = missingForApproval(d.doc_type, approvedFields, booked ? {
      accountId: item.accountId ?? (d.doc_type === "bir_2307_issued" || d.doc_type === "bir_2307_received" ? "by rule" : null),
      invoice: invoiced ? {
        lineCodes: (item.codes?.lines ?? []).map((l) => l.tax_code_id),
        withholdingCode: item.codes?.withholding_code_id ?? null,
        vatWithholdingCode: item.codes?.vat_withholding_code_id ?? null,
        terms: item.terms === "charge" ? "charge" : "cash",
        cashAccountId: item.cashAccountId ?? null,
      } : null,
    } : null);
    if (missing.length) {
      skipped.push(`${d.file_name} (${missingMessage(missing)})`);
      continue;
    }
    // Approved and posted to the Books together: when it cannot be posted, it is not approved.
    const a = await supabase.rpc("approve_and_post_document", {
      p_document: d.id,
      p_fields: approvedFields,
      p_post: booked,
      p_account: booked ? item.accountId : null,
      p_cash_account: invoiced && item.terms === "cash" ? item.cashAccountId ?? null : null,
      p_codes: invoiced ? item.codes ?? null : null,
    });
    if (a.error) {
      const open = a.error.code === "TL001" && a.error.hint ? new Intl.DateTimeFormat("en-PH", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${a.error.hint}T00:00:00Z`)) : null;
      const how = a.error.details === "can_redate" ? "open it to approve it dated" : "the reviewer or the Owner can approve it dated";
      skipped.push(`${d.file_name} (${a.error.message}${open ? `: ${how} ${open}` : ""})`);
      continue;
    }
    if (k) seen.add(k);
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
