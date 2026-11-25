/**
 * Pure helpers for the staff Books screens (docs/REWORK.md, decisions 4–8): the
 * Manager.io-style module list, the month in the Books header, list filters and
 * totals, the Transaction Journal view, the invoice form's preview, and the
 * Inbox's tax-code pickers. No I/O: the pages load the rows and pass them in.
 * Amounts are centavos unless a name says pesos.
 */
import { FS_LINES, type FsLineKey } from "@/lib/ledger/fs-lines";
import type { DocumentPortion } from "./actions";
import { canGoOn, taxOn, type InvoiceKind, type TaxCode, type TaxCodePlace } from "./tax-codes";

// ---------------------------------------------------------------------------
// Modules
// ---------------------------------------------------------------------------

export const BOOKS_MODULES = [
  { key: "summary", label: "Summary", path: "" },
  { key: "bank-accounts", label: "Bank and Cash Accounts", path: "/bank-accounts" },
  { key: "receipts", label: "Receipts", path: "/receipts" },
  { key: "payments", label: "Payments", path: "/payments" },
  { key: "customers", label: "Customers", path: "/customers" },
  { key: "sales-invoices", label: "Sales Invoices", path: "/sales-invoices" },
  { key: "suppliers", label: "Suppliers", path: "/suppliers" },
  { key: "purchase-invoices", label: "Purchase Invoices", path: "/purchase-invoices" },
  { key: "employees", label: "Employees", path: "/employees" },
  { key: "payslips", label: "Payslips", path: "/payslips" },
  { key: "journal", label: "Journal Entries", path: "/journal" },
  { key: "reports", label: "Reports", path: "/reports" },
  { key: "settings", label: "Settings", path: "/settings" },
] as const;

export type BooksModule = (typeof BOOKS_MODULES)[number]["key"];

/** Modules that show a count beside their name. */
export const COUNTED: readonly BooksModule[] = ["bank-accounts", "receipts", "payments", "customers", "sales-invoices", "suppliers", "purchase-invoices", "employees", "payslips", "journal"];

const YM = /^\d{4}-(0[1-9]|1[0-2])$/;

/**
 * The month the Books header shows ("YYYY-MM"): the one asked for, else today's,
 * never before the month the books start.
 */
export function booksMonth(raw: unknown, today: string, booksStart: string | null): string {
  const asked = typeof raw === "string" && YM.test(raw) ? raw : today.slice(0, 7);
  const start = booksStart?.slice(0, 7);
  return start && asked < start ? start : asked;
}

/** First and last day of a "YYYY-MM" month. */
export function monthRange(ym: string): { from: string; to: string } {
  const [y, m] = ym.split("-").map(Number);
  const to = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
  return { from: `${ym}-01`, to };
}

/** "YYYY-MM" n months from ym (n may be negative). */
export function shiftMonth(ym: string, n: number): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + n, 1));
  return d.toISOString().slice(0, 7);
}

/** A Books URL for a module (or a sub-path of it), keeping the month and any extra query. */
export function booksHref(clientId: string, module: BooksModule, month?: string | null, extra?: Record<string, string | null | undefined>, sub = ""): string {
  const m = BOOKS_MODULES.find((x) => x.key === module)!;
  const q = new URLSearchParams();
  if (month) q.set("month", month);
  for (const [k, v] of Object.entries(extra ?? {})) if (v) q.set(k, v);
  const s = q.toString();
  return `/app/clients/${clientId}/books${m.path}${sub}${s ? `?${s}` : ""}`;
}

/** Where a line of the Summary leads: the module that holds its transactions. */
export function moduleForFsLine(key: FsLineKey | null): BooksModule {
  switch (key) {
    case "cash_and_equivalents":
      return "bank-accounts";
    case "receivables":
      return "customers";
    case "accounts_payable":
      return "suppliers";
    case "revenue":
      return "sales-invoices";
    case "cost_of_sales":
    case "cost_of_services":
    case "operating_expenses":
      return "purchase-invoices";
    default:
      return "journal";
  }
}

const FS_BY_LABEL = new Map(Object.entries(FS_LINES).map(([k, v]) => [v.label as string, k as FsLineKey]));

/** The FS line a statement line's label stands for, if it is one. */
export function fsLineOfLabel(label: string): FsLineKey | null {
  return FS_BY_LABEL.get(label) ?? null;
}

// ---------------------------------------------------------------------------
// Lists
// ---------------------------------------------------------------------------

/** Case-insensitive match of a search over some text fields. */
export function matches(q: string | null | undefined, ...fields: (string | number | null | undefined)[]): boolean {
  const s = (q ?? "").trim().toLowerCase();
  if (!s) return true;
  return fields.some((f) => f != null && String(f).toLowerCase().includes(s));
}

export const cents = (v: string | number | null | undefined): number => Math.round(Number(v ?? 0) * 100);

/** The key a customer or supplier is grouped on: its directory id, else its name. */
export function partyKeyOf(r: { party_id: string | null; party_name: string }): string {
  return r.party_id ?? `name:${r.party_name.trim().toLowerCase()}`;
}

export interface PartyBalance {
  key: string;
  partyId: string | null;
  name: string;
  tin: string | null;
  invoices: number;
  /** Total of the invoices (not void). */
  total: number;
  /** Still due: AR for customers, AP for suppliers. */
  balance: number;
}

/** Customers or suppliers from their invoices, with what is still due, by name. */
export function partyBalances(rows: { party_id: string | null; party_name: string; party_tin: string | null; total: string | number; balance_due: string | number; voided_at: string | null }[]): PartyBalance[] {
  const by = new Map<string, PartyBalance>();
  for (const r of rows) {
    const key = partyKeyOf(r);
    const p = by.get(key) ?? { key, partyId: r.party_id, name: r.party_name.trim(), tin: r.party_tin, invoices: 0, total: 0, balance: 0 };
    if (!p.tin && r.party_tin) p.tin = r.party_tin;
    if (!r.voided_at) {
      p.invoices += 1;
      p.total += cents(r.total);
      p.balance += cents(r.balance_due);
    }
    by.set(key, p);
  }
  return [...by.values()].sort((a, b) => a.name.localeCompare(b.name));
}

// ---------------------------------------------------------------------------
// Transaction Journal
// ---------------------------------------------------------------------------

export interface JournalLineIn {
  lineNo: number;
  accountId: string;
  partyName: string | null;
  description: string | null;
  openItemId: string | null;
  debit: number;
  credit: number;
}

export interface JournalRow {
  account: string;
  /** "party — invoice date" when the line belongs to a party or an invoice. */
  detail: string | null;
  /** "Tax code: …" on an invoice line. */
  taxCode: string | null;
  debit: number;
  credit: number;
}

/**
 * The lines of a Transaction Journal view (Manager style): the account, then the
 * party and the date of the invoice the line belongs to, and on the lines that
 * carry an invoice line, its tax code. Invoice lines are matched to the entry by
 * account and amount, each used once.
 */
export function journalRows(
  lines: JournalLineIn[],
  opts: {
    accountName: (id: string) => string;
    /** open item id → the invoice it is ("SI 0451 · 3 Jan 2027"). */
    invoiceOf?: (openItemId: string) => string | null;
    /** The invoice's own lines, with their tax code names. */
    invoiceLines?: { accountId: string; amount: number; taxCode: string | null }[];
    /** The date shown for lines without an invoice of their own. */
    date?: string | null;
    party?: string | null;
  },
): JournalRow[] {
  const pool = [...(opts.invoiceLines ?? [])];
  return [...lines]
    .sort((a, b) => a.lineNo - b.lineNo)
    .map((l) => {
      const net = l.credit - l.debit;
      let taxCode: string | null = null;
      const i = pool.findIndex((x) => x.accountId === l.accountId && (x.amount === net || x.amount === -net));
      if (i >= 0) {
        taxCode = pool[i].taxCode;
        pool.splice(i, 1);
      }
      const party = l.partyName ?? opts.party ?? null;
      const inv = l.openItemId && opts.invoiceOf ? opts.invoiceOf(l.openItemId) : null;
      const parts = [party, inv ?? (party ? opts.date ?? null : null)].filter(Boolean) as string[];
      return { account: opts.accountName(l.accountId), detail: parts.length ? parts.join(" — ") : null, taxCode, debit: l.debit, credit: l.credit };
    });
}

export function journalTotals(rows: { debit: number; credit: number }[]) {
  return rows.reduce((t, r) => ({ debit: t.debit + r.debit, credit: t.credit + r.credit }), { debit: 0, credit: 0 });
}

// ---------------------------------------------------------------------------
// Invoice form
// ---------------------------------------------------------------------------

/** Tax codes that may go on this invoice in this place, active ones only (keeping one already chosen). */
export function codesFor(codes: TaxCode[], invoice: InvoiceKind, place: TaxCodePlace, keep?: string | null): TaxCode[] {
  return codes.filter((c) => canGoOn(c.kind, invoice, place) && (c.active || c.id === keep));
}

/** A peso amount typed in a form ("1,120.50") → centavos, or null when not a number. */
export function parsePesos(s: string | null | undefined): number | null {
  const t = (s ?? "").replace(/,/g, "").trim();
  if (t === "") return null;
  if (!/^-?\d+(\.\d{1,2})?$/.test(t)) return null;
  return Math.round(Number(t) * 100);
}

/** Centavos → "1120.50" for the database. */
export const pesos = (c: number) => (c / 100).toFixed(2);

export interface PreviewLine {
  amount: string;
  taxCodeId: string | null;
}

export interface InvoicePreview {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  withholding: number;
  vatWithheld: number;
  /** What the customer pays or the supplier is paid: total less withholding and VAT withheld. */
  due: number;
  /** Line numbers (1-based) whose amount is not a number. */
  bad: number[];
}

/**
 * What an invoice comes to, as the database works it out (save_book_invoice):
 * VAT per line at its code's rate, total = subtotal + VAT − discount, withholding
 * at its code's rate on (subtotal − discount) unless typed, VAT withheld likewise.
 */
export function invoicePreview(
  lines: PreviewLine[],
  codes: TaxCode[],
  opts: { discount?: string; withholdingCodeId?: string | null; withholding?: string; vatWithholdingCodeId?: string | null; vatWithheld?: string } = {},
): InvoicePreview {
  const rate = (id: string | null | undefined) => codes.find((c) => c.id === id)?.rate ?? 0;
  let subtotal = 0;
  let tax = 0;
  const bad: number[] = [];
  lines.forEach((l, i) => {
    const a = parsePesos(l.amount);
    if (a == null) {
      if (l.amount.trim() !== "") bad.push(i + 1);
      return;
    }
    subtotal += a;
    tax += taxOn(a, rate(l.taxCodeId));
  });
  const discount = parsePesos(opts.discount) ?? 0;
  const base = subtotal - discount;
  const withholding = opts.withholdingCodeId ? (parsePesos(opts.withholding) ?? taxOn(base, rate(opts.withholdingCodeId))) : 0;
  const vatWithheld = opts.vatWithholdingCodeId ? (parsePesos(opts.vatWithheld) ?? taxOn(base, rate(opts.vatWithholdingCodeId))) : 0;
  const total = subtotal + tax - discount;
  return { subtotal, tax, discount, total, withholding, vatWithheld, due: total - withholding - vatWithheld, bad };
}

/**
 * How much of each open invoice a receipt or payment settles, oldest first, up to
 * an amount received or paid (centavos). Returns invoice id → centavos.
 */
export function allocateOldestFirst(invoices: { id: string; issueDate: string; balance: number }[], amount: number): Map<string, number> {
  const out = new Map<string, number>();
  let left = amount;
  for (const inv of [...invoices].sort((a, b) => a.issueDate.localeCompare(b.issueDate))) {
    if (left <= 0) break;
    const take = Math.min(left, inv.balance);
    if (take > 0) out.set(inv.id, take);
    left -= take;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Inbox
// ---------------------------------------------------------------------------

/** Where a suggested tax code came from (pending_document_tax_codes): the party default, OCR, or nothing. */
export type CodeSourceKind = "party" | "ocr" | null;

/** Picker colour: the party default can go as is (success); an OCR suggestion is confirmed first (warning). */
export function codeTone(source: CodeSourceKind, confirmed: boolean): "success" | "warning" | "neutral" {
  if (source === "party" || (confirmed && source != null)) return "success";
  if (source === "ocr") return "warning";
  return "neutral";
}

export const CODE_SOURCE_LABELS: Record<"party" | "ocr", string> = { party: "Party default", ocr: "From OCR" };

export const PORTION_LABELS: Record<DocumentPortion, string> = {
  vatable: "VATable",
  vat_exempt: "VAT-exempt",
  zero_rated: "Zero-rated",
  total: "Whole amount",
};

/** "Goes to the Books as" choices for an Inbox row: cash (invoice and its receipt or payment) or on account. */
export function postingChoices(kind: "sales" | "purchase"): { value: "cash" | "charge"; label: string }[] {
  return kind === "sales"
    ? [{ value: "cash", label: "Sales Invoice + Receipt (cash)" }, { value: "charge", label: "Sales Invoice (on account)" }]
    : [{ value: "cash", label: "Purchase Invoice + Payment (cash)" }, { value: "charge", label: "Purchase Invoice (on account)" }];
}

/** Whether a row's tax codes still need confirming before it can be approved from the list. */
export function codesNeedConfirming(codes: { lines: { source: CodeSourceKind }[]; withholding_source: CodeSourceKind; vat_withholding_source: CodeSourceKind } | null | undefined): boolean {
  if (!codes) return false;
  return codes.lines.some((l) => l.source === "ocr") || codes.withholding_source === "ocr" || codes.vat_withholding_source === "ocr";
}
