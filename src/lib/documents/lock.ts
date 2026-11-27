/**
 * When an approved document can still be edited (mirrors private.locking_filing).
 * A month is locked for a document once a return of the client whose period covers
 * it has been filed, if that return was prepared from that kind of document: the
 * filed worksheet used those figures. A filed 1601-C (from payroll) does not lock
 * the month's sales or purchases.
 */
import { BOOK_LOCK_FORMS } from "@/lib/ledger/types";

/** Filing statuses after which a return (and the months it covers) is locked. */
export const LOCKED_STATUSES = ["filed", "paid", "proof_uploaded"];

const INCOME_TAX = ["1701Q", "1702Q", "1701", "1701A", "1702-RT", "1702-EX", "1702-MX"];
const SALES = ["2550M", "2550Q", "2551M", "2551Q", ...INCOME_TAX];
const PURCHASES = ["0619-E", "1601-EQ", "2550M", "2550Q", ...INCOME_TAX];
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
    case "purchase_receipt":
    case "bir_2307_issued":
      return PURCHASES;
    case "payroll":
      return PAYROLL;
    default:
      return BOOK_LOCK_FORMS;
  }
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

/** The filed return that locks this client's month ("YYYY-MM-01") for a kind of document, or null while it is open. */
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
