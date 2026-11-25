/**
 * Server-side entry points to the Books (rework phases 1 and 2). Each calls one
 * database function as the signed-in user (row-level security and the functions'
 * own access checks apply) and throws an Error with the database's message on
 * failure. Wrap them in Server Actions; they are not Server Actions themselves.
 * Amounts are pesos as strings ("1120.50"); dates are YYYY-MM-DD; ids are uuids.
 *
 * Inbox → Books
 *   postDocumentToBooks(documentId, { accountId?, cashAccountId?, codes? }): Promise<DocumentPosting | null>
 *       call after approve_document. Sale / purchase → Book invoice (+ receipt or payment
 *       when cash); 2307 received → marks the matching invoices' CWT supported; anything
 *       else (payroll…) → null. Idempotent for a document already in the Books. The tax
 *       codes used are saved as this client's default for the party.
 *   unpostDocumentFromBooks(documentId, reason): Promise<void>
 *       voids the document's invoice and receipt/payment (entries reversed) so the approved
 *       figures can be corrected (approve_document in edit mode), then post again.
 *   pendingDocumentTaxCodes(clientId): Promise<PendingTaxCodes[]>
 *       suggested tax codes of the client's waiting documents, with where each came from.
 *
 * Invoices, receipts and payments
 *   saveInvoice(clientId, invoice: InvoiceInput): Promise<string>        new, or edit when invoice.id
 *   voidInvoice(invoiceId, reason): Promise<void>
 *   saveSettlement(clientId, settlement: SettlementInput): Promise<string>  new, or edit when settlement.id
 *   voidSettlement(settlementId, reason): Promise<void>
 *   Lists: read the view `book_invoice_list` (invoice + balance_due) and the tables
 *   book_invoice_lines, book_settlements, book_settlement_allocations, tax_codes directly;
 *   status labels with invoiceStatus() from ./status.
 *
 * Month lock
 *   booksMonthStatus(clientId, year): Promise<BooksMonthRow[]>
 *   requestBooksLock(clientId, month): Promise<string>        preparer, once the month's Inbox is clear
 *   lockBooksMonth(clientId, month, note?): Promise<void>      the client's reviewer or the Owner
 *   requestBooksUnlock(clientId, month, reason): Promise<string>   reviewer (the Owner's own request unlocks at once)
 *   decideBooksUnlock(requestId, approve, note?): Promise<void>     Owner or acting approver
 *   booksUnlockRequests(): Promise<UnlockRequest[]>            waiting for the Owner / acting approver
 *   filingsNeedingAmendment(clientId?): Promise<AmendmentFlag[]>
 *
 * Returns and Filings
 *   filingsBooksReady(filingIds): Promise<Map<string, boolean>>   filter with onlyBooksReady() from ./periods
 *   booksStillOpen(today?): Promise<StillOpenRow[]>
 *
 * Payslips
 *   payslips(clientId, month): Promise<Payslip[]>
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";
import type { BooksMonthStatus } from "./periods";

type Db = SupabaseClient;

async function rpc<T>(fn: string, args: Record<string, unknown>, db?: Db): Promise<T> {
  const client = db ?? ((await supabaseServer()) as unknown as Db);
  const { data, error } = await client.rpc(fn, args);
  if (error) throw new Error(error.message);
  return data as T;
}

// ---------------------------------------------------------------------------
// Inbox → Books
// ---------------------------------------------------------------------------

/** Portions of a document's amounts, one invoice line each. */
export type DocumentPortion = "vatable" | "vat_exempt" | "zero_rated" | "total";

/** Tax codes confirmed on an Inbox row; anything left out takes the suggestion, null clears it. */
export interface DocumentCodes {
  lines?: { portion: DocumentPortion; tax_code_id: string | null }[];
  withholding_code_id?: string | null;
  vat_withholding_code_id?: string | null;
}

export type DocumentPosting = { invoice_id: string; settlement_id: string | null } | { cwt_marked: number };

export async function postDocumentToBooks(
  documentId: string,
  opts: { accountId?: string | null; cashAccountId?: string | null; codes?: DocumentCodes | null } = {},
  db?: Db,
): Promise<DocumentPosting | null> {
  return rpc("post_document_to_books", { p_document: documentId, p_account: opts.accountId ?? null, p_cash_account: opts.cashAccountId ?? null, p_codes: opts.codes ?? null }, db);
}

export async function unpostDocumentFromBooks(documentId: string, reason: string, db?: Db): Promise<void> {
  await rpc("unpost_document_from_books", { p_document: documentId, p_reason: reason }, db);
}

export type CodeSource = "party" | "ocr" | null;

export interface PendingTaxCodes {
  document_id: string;
  lines: { portion: DocumentPortion; amount: number; tax_amount: number; tax_code_id: string | null; source: CodeSource }[];
  withholding_code_id: string | null;
  withholding_source: CodeSource;
  vat_withholding_code_id: string | null;
  vat_withholding_source: CodeSource;
}

export async function pendingDocumentTaxCodes(clientId: string, db?: Db): Promise<PendingTaxCodes[]> {
  return (await rpc<PendingTaxCodes[] | null>("pending_document_tax_codes", { p_client: clientId }, db)) ?? [];
}

// ---------------------------------------------------------------------------
// Invoices, receipts and payments
// ---------------------------------------------------------------------------

export interface InvoiceLineInput {
  account_id: string;
  description?: string | null;
  /** Net of VAT. */
  amount: string;
  tax_code_id?: string | null;
  /** Defaults to amount × the code's rate. */
  tax_amount?: string | null;
}

export interface InvoiceInput {
  id?: string;
  kind: "sales" | "purchase";
  party_id?: string | null;
  party_name?: string | null;
  party_tin?: string | null;
  reference?: string | null;
  issue_date: string;
  due_date?: string | null;
  description?: string | null;
  withholding_code_id?: string | null;
  /** Defaults to (subtotal − discount) × the code's rate. */
  withholding?: string | null;
  vat_withholding_code_id?: string | null;
  vat_withheld?: string | null;
  discount?: string | null;
  lines: InvoiceLineInput[];
}

export async function saveInvoice(clientId: string, invoice: InvoiceInput, db?: Db): Promise<string> {
  return rpc("save_book_invoice", { p_client: clientId, p_invoice: invoice }, db);
}

export async function voidInvoice(invoiceId: string, reason: string, db?: Db): Promise<void> {
  await rpc("void_book_invoice", { p_invoice: invoiceId, p_reason: reason }, db);
}

export interface SettlementInput {
  id?: string;
  kind: "receipt" | "payment";
  settle_date: string;
  /** A cash or bank account of the client. */
  cash_account_id: string;
  party_id?: string | null;
  party_name?: string | null;
  reference?: string | null;
  description?: string | null;
  /** Bank or card charges (receipt) or a deduction taken (payment), with its account. */
  deduction?: string | null;
  deduction_account_id?: string | null;
  allocations: { invoice_id: string; amount: string }[];
}

export async function saveSettlement(clientId: string, settlement: SettlementInput, db?: Db): Promise<string> {
  return rpc("save_book_settlement", { p_client: clientId, p_settlement: settlement }, db);
}

export async function voidSettlement(settlementId: string, reason: string, db?: Db): Promise<void> {
  await rpc("void_book_settlement", { p_settlement: settlementId, p_reason: reason }, db);
}

// ---------------------------------------------------------------------------
// Month lock
// ---------------------------------------------------------------------------

export interface BooksMonthRow {
  month: string;
  status: BooksMonthStatus;
  lock_source: "reviewer" | "filed" | null;
  locked_by: string | null;
  locked_at: string | null;
  request_id: string | null;
  request_kind: "lock" | "unlock" | null;
  requested_by: string | null;
  requested_at: string | null;
  request_reason: string | null;
  waiting_documents: number;
  in_books: boolean;
}

export async function booksMonthStatus(clientId: string, year: number, db?: Db): Promise<BooksMonthRow[]> {
  return (await rpc<BooksMonthRow[] | null>("books_month_status", { p_client: clientId, p_year: year }, db)) ?? [];
}

export async function requestBooksLock(clientId: string, month: string, db?: Db): Promise<string> {
  return rpc("request_books_lock", { p_client: clientId, p_month: month }, db);
}

export async function lockBooksMonth(clientId: string, month: string, note?: string | null, db?: Db): Promise<void> {
  await rpc("lock_books_month", { p_client: clientId, p_month: month, p_note: note ?? null }, db);
}

export async function requestBooksUnlock(clientId: string, month: string, reason: string, db?: Db): Promise<string> {
  return rpc("request_books_unlock", { p_client: clientId, p_month: month, p_reason: reason }, db);
}

export async function decideBooksUnlock(requestId: string, approve: boolean, note?: string | null, db?: Db): Promise<void> {
  await rpc("decide_books_unlock", { p_request: requestId, p_approve: approve, p_note: note ?? null }, db);
}

export interface UnlockRequest {
  id: string;
  client_id: string;
  client_name: string;
  month: string;
  reason: string;
  requested_by: string;
  requested_at: string;
}

export async function booksUnlockRequests(db?: Db): Promise<UnlockRequest[]> {
  return (await rpc<UnlockRequest[] | null>("books_unlock_requests", {}, db)) ?? [];
}

export interface AmendmentFlag {
  filing_id: string;
  client_id: string;
  form: string;
  period_label: string;
  period_start: string;
  period_end: string;
  reason: string;
  unlocked_at: string;
}

export async function filingsNeedingAmendment(clientId?: string | null, db?: Db): Promise<AmendmentFlag[]> {
  return (await rpc<AmendmentFlag[] | null>("filings_needing_amendment", { p_client: clientId ?? null }, db)) ?? [];
}

// ---------------------------------------------------------------------------
// Returns and Filings
// ---------------------------------------------------------------------------

/** filing id → whether its Books period is all locked (missing: not visible to the user). */
export async function filingsBooksReady(filingIds: string[], db?: Db): Promise<Map<string, boolean>> {
  if (filingIds.length === 0) return new Map();
  const rows = (await rpc<{ filing_id: string; ready: boolean | null }[] | null>("filings_books_ready", { p_filings: filingIds }, db)) ?? [];
  return new Map(rows.filter((r) => r.ready !== null).map((r) => [r.filing_id, Boolean(r.ready)]));
}

export interface StillOpenRow {
  client_id: string;
  client_name: string;
  month: string;
  status: "open" | "lock_requested";
  nearest_due_date: string;
  filing_id: string;
  form: string;
  period_label: string;
  filings: number;
}

export async function booksStillOpen(today?: string | null, db?: Db): Promise<StillOpenRow[]> {
  return (await rpc<StillOpenRow[] | null>("books_still_open", { p_today: today ?? null }, db)) ?? [];
}

// ---------------------------------------------------------------------------
// Payslips
// ---------------------------------------------------------------------------

export interface Payslip {
  payroll_entry_id: string;
  employee_id: string;
  employee_no: string | null;
  employee_name: string;
  pay_month: string;
  pay_period_end: string | null;
  gross: string;
  sss: string;
  philhealth: string;
  pagibig: string;
  tax: string;
  /** SSS + PhilHealth + Pag-IBIG + tax. */
  deductions: string;
  other_deductions: string;
  net: string;
  employer_contributions: string;
  journal_entry_id: string | null;
}

export async function payslips(clientId: string, month: string, db?: Db): Promise<Payslip[]> {
  return (await rpc<Payslip[] | null>("payslips", { p_client: clientId, p_month: month }, db)) ?? [];
}
