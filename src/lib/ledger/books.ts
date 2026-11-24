/**
 * The books of account (spec §3.6) laid out from posted entries:
 *   General Journal, General Ledger, and the columnar Cash Receipts Book, Cash
 *   Disbursements Book, Sales Journal and Purchase Journal.
 * Printed as BIR loose-leaf pages (or for copying into manual bound books); page
 * numbers run on from the start of the taxable year, so each month's pages
 * follow the last.
 *
 * Every special journal has main columns for the accounts it always touches
 * (cash, receivables, sales, VAT…); any other line goes to Sundry with its
 * account title.
 */
import type { AccountType, Book, Centavos, Control, LedgerAccount } from "./types";

export interface BookLine {
  accountId: string;
  partyName: string | null;
  partyTin: string | null;
  description: string | null;
  debit: Centavos;
  credit: Centavos;
}

export interface BookEntry {
  id: string;
  date: string;
  book: Book;
  reference: string | null;
  memo: string;
  lines: BookLine[];
}

type Matcher = { controls?: Control[]; types?: AccountType[] };

export interface Column {
  key: string;
  label: string;
  side: "debit" | "credit";
  match: Matcher;
}

const COLUMNS: Record<Exclude<Book, "general_journal">, Column[]> = {
  cash_receipts: [
    { key: "cash", label: "Cash Dr", side: "debit", match: { controls: ["cash", "bank"] } },
    { key: "cwt", label: "CWT Dr", side: "debit", match: { controls: ["cwt"] } },
    { key: "ar", label: "Accounts Receivable Cr", side: "credit", match: { controls: ["ar"] } },
    { key: "revenue", label: "Sales / Revenue Cr", side: "credit", match: { types: ["revenue"] } },
    { key: "output_vat", label: "Output VAT Cr", side: "credit", match: { controls: ["output_vat"] } },
  ],
  cash_disbursements: [
    { key: "ap", label: "Accounts Payable Dr", side: "debit", match: { controls: ["ap"] } },
    { key: "input_vat", label: "Input VAT Dr", side: "debit", match: { controls: ["input_vat"] } },
    { key: "cash", label: "Cash Cr", side: "credit", match: { controls: ["cash", "bank"] } },
    { key: "ewt", label: "Withholding Tax Cr", side: "credit", match: { controls: ["ewt_payable"] } },
  ],
  sales: [
    { key: "ar", label: "Accounts Receivable Dr", side: "debit", match: { controls: ["ar"] } },
    { key: "revenue", label: "Sales / Revenue Cr", side: "credit", match: { types: ["revenue"] } },
    { key: "output_vat", label: "Output VAT Cr", side: "credit", match: { controls: ["output_vat"] } },
  ],
  purchases: [
    { key: "purchases", label: "Purchases / Expenses Dr", side: "debit", match: { types: ["cost", "expense"] } },
    { key: "input_vat", label: "Input VAT Dr", side: "debit", match: { controls: ["input_vat"] } },
    { key: "ap", label: "Accounts Payable Cr", side: "credit", match: { controls: ["ap"] } },
  ],
};

export const BOOK_TITLES: Record<Book | "general_ledger", string> = {
  general_journal: "General Journal",
  general_ledger: "General Ledger",
  cash_receipts: "Cash Receipts Book",
  cash_disbursements: "Cash Disbursements Book",
  sales: "Sales Journal",
  purchases: "Purchase Journal",
};
export type BookKind = keyof typeof BOOK_TITLES;
export const BOOK_KINDS = Object.keys(BOOK_TITLES) as BookKind[];

const matches = (a: LedgerAccount, m: Matcher) => (m.controls?.includes(a.control as Control) ?? false) || (m.types?.includes(a.type) ?? false);
const sum = (xs: number[]) => xs.reduce((s, x) => s + x, 0);

// ── Columnar special journals ───────────────────────────────

export interface SundryLine {
  account: string;
  debit: Centavos;
  credit: Centavos;
}

export interface ColumnarRow {
  date: string;
  reference: string | null;
  party: string | null;
  tin: string | null;
  particulars: string;
  amounts: Record<string, Centavos>;
  sundry: SundryLine[];
}

export interface ColumnarBook {
  kind: Exclude<Book, "general_journal">;
  columns: Column[];
  rows: ColumnarRow[];
  totals: Record<string, Centavos>;
  sundryDebit: Centavos;
  sundryCredit: Centavos;
}

export function columnarBook(kind: Exclude<Book, "general_journal">, entries: BookEntry[], accounts: LedgerAccount[]): ColumnarBook {
  const byId = new Map(accounts.map((a) => [a.id, a]));
  const columns = COLUMNS[kind];
  const rows: ColumnarRow[] = [];
  for (const e of entries.filter((x) => x.book === kind)) {
    const amounts: Record<string, Centavos> = {};
    const sundry: SundryLine[] = [];
    for (const l of e.lines) {
      const a = byId.get(l.accountId);
      const side = l.debit > 0 ? "debit" : "credit";
      const col = a && columns.find((c) => c.side === side && matches(a, c.match));
      if (col) amounts[col.key] = (amounts[col.key] ?? 0) + (side === "debit" ? l.debit : l.credit);
      else sundry.push({ account: a ? `${a.code} ${a.name}` : "Unknown account", debit: l.debit, credit: l.credit });
    }
    const withParty = e.lines.find((l) => l.partyName || l.partyTin);
    rows.push({ date: e.date, reference: e.reference, party: withParty?.partyName ?? null, tin: withParty?.partyTin ?? null, particulars: e.memo, amounts, sundry });
  }
  const totals = Object.fromEntries(columns.map((c) => [c.key, sum(rows.map((r) => r.amounts[c.key] ?? 0))]));
  return {
    kind, columns, rows, totals,
    sundryDebit: sum(rows.flatMap((r) => r.sundry.map((s) => s.debit))),
    sundryCredit: sum(rows.flatMap((r) => r.sundry.map((s) => s.credit))),
  };
}

/** Debit columns + sundry debits = credit columns + sundry credits (the book cross-foots). */
export function crossFoots(b: ColumnarBook): boolean {
  const dr = sum(b.columns.filter((c) => c.side === "debit").map((c) => b.totals[c.key])) + b.sundryDebit;
  const cr = sum(b.columns.filter((c) => c.side === "credit").map((c) => b.totals[c.key])) + b.sundryCredit;
  return dr === cr;
}

// ── General Journal ─────────────────────────────────────────

export interface JournalRow {
  date: string;
  reference: string | null;
  memo: string;
  lines: { account: string; description: string | null; debit: Centavos; credit: Centavos }[];
}

export function generalJournal(entries: BookEntry[], accounts: LedgerAccount[]): { rows: JournalRow[]; debit: Centavos; credit: Centavos } {
  const byId = new Map(accounts.map((a) => [a.id, a]));
  const rows = entries
    .filter((e) => e.book === "general_journal")
    .map((e) => ({
      date: e.date,
      reference: e.reference,
      memo: e.memo,
      lines: e.lines.map((l) => {
        const a = byId.get(l.accountId);
        return { account: a ? `${a.code} ${a.name}` : "Unknown account", description: l.description ?? l.partyName, debit: l.debit, credit: l.credit };
      }),
    }));
  const all = rows.flatMap((r) => r.lines);
  return { rows, debit: sum(all.map((l) => l.debit)), credit: sum(all.map((l) => l.credit)) };
}

// ── General Ledger ──────────────────────────────────────────

const BOOK_ABBR: Record<Book, string> = { general_journal: "GJ", cash_receipts: "CRB", cash_disbursements: "CDB", sales: "SJ", purchases: "PJ" };

export interface LedgerSection {
  code: string;
  name: string;
  normalSide: "debit" | "credit";
  /** Balances in the account's normal direction (a debit-normal account's debit balance is positive). */
  opening: Centavos;
  lines: { date: string; book: string; reference: string | null; particulars: string; debit: Centavos; credit: Centavos; balance: Centavos }[];
  debit: Centavos;
  credit: Centavos;
  closing: Centavos;
}

/** `openings`: each account's balance before the period, debit positive. */
export function generalLedger(entries: BookEntry[], accounts: LedgerAccount[], openings: Map<string, Centavos>): LedgerSection[] {
  const lines = new Map<string, LedgerSection["lines"]>();
  for (const e of [...entries].sort((a, b) => a.date.localeCompare(b.date))) {
    for (const l of e.lines) {
      const list = lines.get(l.accountId) ?? [];
      list.push({ date: e.date, book: BOOK_ABBR[e.book], reference: e.reference, particulars: l.description ?? e.memo, debit: l.debit, credit: l.credit, balance: 0 });
      lines.set(l.accountId, list);
    }
  }
  const out: LedgerSection[] = [];
  for (const a of accounts) {
    const list = lines.get(a.id) ?? [];
    const sign = a.normalSide === "debit" ? 1 : -1;
    const opening = (openings.get(a.id) ?? 0) * sign;
    if (!list.length && opening === 0) continue;
    let bal = opening;
    for (const l of list) {
      bal += (l.debit - l.credit) * sign;
      l.balance = bal;
    }
    out.push({ code: a.code, name: a.name, normalSide: a.normalSide, opening, lines: list, debit: sum(list.map((l) => l.debit)), credit: sum(list.map((l) => l.credit)), closing: bal });
  }
  return out;
}

/** First day of the taxable year containing `date` (fiscal year ending in `fyeMonth`). */
export function taxableYearStart(date: string, fyeMonth: number): string {
  const y = Number(date.slice(0, 4));
  const m = Number(date.slice(5, 7));
  const startMonth = (fyeMonth % 12) + 1;
  const startYear = m >= startMonth ? y : y - 1;
  return `${startYear}-${String(startMonth).padStart(2, "0")}-01`;
}
