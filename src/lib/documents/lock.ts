/**
 * When an approved document can still be edited (mirrors private.locking_filing).
 * A month is locked for a document once a return of the client whose period covers
 * it has been filed, if that return was prepared from that kind of document: the
 * filed worksheet used those figures. A filed 1601-C (from payroll) does not lock
 * the month's sales or purchases, and a filed 0619-E or 1601-EQ locks only the
 * purchases it declared: those with EWT withheld (a 2307 issued to the supplier).
 */
import { BOOK_LOCK_FORMS } from "@/lib/ledger/types";

/** Filing statuses after which a return (and the months it covers) is locked. */
export const LOCKED_STATUSES = ["filed", "paid", "proof_uploaded"];

const INCOME_TAX = ["1701Q", "1702Q", "1701", "1701A", "1702-RT", "1702-EX", "1702-MX"];
const SALES = ["2550M", "2550Q", "2551M", "2551Q", ...INCOME_TAX];
const PURCHASES = ["2550M", "2550Q", ...INCOME_TAX];
const PURCHASES_EWT = ["0619-E", "1601-EQ", ...PURCHASES];
const PAYROLL = ["1601-C", ...INCOME_TAX];

/**
 * The filed returns that lock a kind of document; the same lists as
 * private.book_lock_forms(doc_type) in the database. Any other kind: every return
 * that locks the Books.
 */
export function lockFormsFor(docType: string | null): readonly string[] {
  switch (docType) {
    case "sales_invoice":
    case "bir_2307_received":
      return SALES;
    case "purchase_receipt_ewt":
    case "bir_2307_issued":
      return PURCHASES_EWT;
    case "purchase_receipt":
      return PURCHASES;
    case "payroll":
      return PAYROLL;
    default:
      return BOOK_LOCK_FORMS;
  }
}

/** "1,120.50" style amounts are not plain numbers: the database counts them as 0 too (private.register_amount). */
const amount = (v: unknown) => (typeof v === "string" && /^-?\d+(\.\d+)?$/.test(v.trim()) ? Number(v) : typeof v === "number" ? v : 0);

/**
 * What locks a document (mirrors private.lock_kind): its type, except that a
 * purchase with EWT withheld is "purchase_receipt_ewt".
 */
export function lockKind(docType: string, fields: Record<string, unknown> | null | undefined): string {
  return docType === "purchase_receipt" && amount(fields?.withholding) > 0 ? "purchase_receipt_ewt" : docType;
}

export interface LockFiling {
  id: string;
  client_id: string;
  form: string;
  period_label: string;
  period_start: string;
  period_end: string;
  status: string;
}

/** The filed return that locks this client's month ("YYYY-MM-01") for a lock kind (see lockKind), or null while it is open. */
export function lockingFiling<F extends LockFiling>(clientId: string, month: string, filings: F[], docType: string | null): F | null {
  const forms = docType ? lockFormsFor(docType) : null;
  let hit: F | null = null;
  for (const f of filings) {
    if (f.client_id !== clientId || !LOCKED_STATUSES.includes(f.status)) continue;
    if (forms && !forms.includes(f.form)) continue;
    if (month < `${f.period_start.slice(0, 7)}-01` || month > f.period_end) continue;
    if (!hit || f.period_end > hit.period_end) hit = f;
  }
  return hit;
}
