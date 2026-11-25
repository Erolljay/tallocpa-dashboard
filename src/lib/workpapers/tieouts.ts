/**
 * Tie-outs T-1 to T-10 (workpaper 0-2; docs/UX-REVIEW.md, recommendation 3 and the
 * workpaper index; Owner's decisions 6 and 7). Each compares a register with the
 * books or with another register for one month. A difference over ₱1 must be
 * explained in writing before a return it feeds can be marked prepared. Pure, so it
 * can be tested; src/lib/workpapers/load.ts gathers the figures.
 *
 *   T-1  Sales: sales register vs revenue in the books (what the 1701Q/1702Q read)
 *   T-2  Output VAT: sales register vs the Output VAT account
 *   T-3  CWT: sales register (CWT column) vs 2307s received, quarter to date
 *   T-4  EWT: purchases register vs Withholding Tax Payable – Expanded
 *   T-5  Input VAT: purchases register vs the Input VAT account
 *   T-6  Tax withheld on compensation: payroll register vs Withholding Tax Payable – Compensation
 *   T-7  Gross compensation: payroll register vs salaries, wages and benefits in the books
 *   T-8  Net receipts: sales register vs the cash and bank debits of those sales
 *   T-9  Asset additions: fixed asset register vs property and equipment (land left out)
 *   T-10 Depreciation: schedule vs Depreciation Expense
 * The books side counts posted entries only: a suggested entry is not in the books yet.
 */
import type { Centavos } from "@/lib/returns/types";
import type { RegisterLine } from "@/lib/register/parts";

/** Decision 7: differences up to ₱1 are rounding. */
export const TOLERANCE: Centavos = 100;

export type TieId = "T-1" | "T-2" | "T-3" | "T-4" | "T-5" | "T-6" | "T-7" | "T-8" | "T-9" | "T-10";
export const TIE_IDS: TieId[] = ["T-1", "T-2", "T-3", "T-4", "T-5", "T-6", "T-7", "T-8", "T-9", "T-10"];

export type TieStatus = "clean" | "open" | "explained" | "not_applicable";

export interface TieOut {
  id: TieId;
  what: string;
  left: { label: string; amount: Centavos | null };
  right: { label: string; amount: Centavos | null };
  /** left − right, null when not applicable. */
  difference: Centavos | null;
  status: TieStatus;
  /** Why it does not apply, or a hint about the likely cause of a difference. */
  note: string | null;
  explanation: string | null;
  /** Workpapers this tie-out belongs to. */
  refs: string[];
}

/** The month's figures from the books (posted entries), in centavos. */
export interface LedgerTotals {
  /** Net credit to revenue accounts. */
  revenue: Centavos;
  outputVat: Centavos;
  /** Net debit to Input VAT. */
  inputVat: Centavos;
  ewtPayable: Centavos;
  wtcPayable: Centavos;
  /** Net debit to Salaries and Wages and to 13th Month Pay and Employee Benefits. */
  compensation: Centavos;
  /** Debits to cash and bank accounts in the posted entries of the month's cash sales. */
  cashFromSales: Centavos;
  /** Net debit to property and equipment other than land (T-9). */
  ppeAdditions: Centavos;
  /** Net debit to Depreciation Expense (T-10). */
  depreciation: Centavos;
  /** Entries of the month still only suggested. */
  suggested: number;
}

/** The fixed asset register's month (src/lib/assets/schedule.ts). */
export interface AssetTotals {
  additions: Centavos;
  depreciation: Centavos;
  /** Assets bought before the month whose depreciation is not set up. */
  waiting: number;
}

export interface PayrollTotals {
  gross: Centavos;
  taxWithheld: Centavos;
}

export interface TieInputs {
  /** The month's register lines. */
  month: RegisterLine[];
  /** The quarter's register lines up to the end of the month (T-3). */
  quarterToDate: RegisterLine[];
  /** Null when the client has no chart of accounts. */
  ledger: LedgerTotals | null;
  /** Null when the client has no payroll for the month. */
  payroll: PayrollTotals | null;
  /** The fixed asset register's month; null when not loaded. */
  assets?: AssetTotals | null;
  /** Written explanations by tie-out. */
  explanations: Partial<Record<TieId, string>>;
}

const sum = (lines: RegisterLine[], f: (l: RegisterLine) => Centavos) => lines.reduce((s, l) => s + f(l), 0);
const sales = (ls: RegisterLine[]) => ls.filter((l) => l.kind === "sale");
const purchases = (ls: RegisterLine[]) => ls.filter((l) => l.kind === "purchase");

export function tieOuts(input: TieInputs): TieOut[] {
  const { month, ledger, payroll } = input;
  const s = sales(month);
  const p = purchases(month);
  const unconfirmed = ledger && ledger.suggested > 0 ? `${ledger.suggested} entr${ledger.suggested === 1 ? "y is" : "ies are"} still suggested; confirm them on the Books page.` : null;
  const noBooks = "This client has no account titles yet.";
  const noPayroll = "No payroll this month.";
  const assets = input.assets ?? null;
  const waiting = assets && assets.waiting > 0 ? `${assets.waiting} asset${assets.waiting === 1 ? " waits" : "s wait"} for depreciation setup on the Fixed assets page.` : null;

  const tie = (id: TieId, what: string, refs: string[], left: [string, Centavos | null], right: [string, Centavos | null], na: string | null, hint: string | null = null): TieOut => {
    if (na) return { id, what, refs, left: { label: left[0], amount: null }, right: { label: right[0], amount: null }, difference: null, status: "not_applicable", note: na, explanation: null };
    const difference = (left[1] ?? 0) - (right[1] ?? 0);
    const explanation = input.explanations[id]?.trim() || null;
    const status: TieStatus = Math.abs(difference) <= TOLERANCE ? "clean" : explanation ? "explained" : "open";
    return {
      id, what, refs, left: { label: left[0], amount: left[1] }, right: { label: right[0], amount: right[1] },
      difference, status, note: status === "clean" ? null : hint, explanation,
    };
  };

  // What book_document credits to revenue: the total before VAT, with the SC/PWD discount added back.
  const registerRevenue = sum(s, (l) => l.total - (l.vatRegistered ? l.vat : 0) + l.discount);
  const qtdCwt = sum(sales(input.quarterToDate), (l) => l.withholding);
  const qtd2307 = sum(input.quarterToDate.filter((l) => l.kind === "cwt_received"), (l) => l.withholding);
  const cashSalesNet = sum(s.filter((l) => l.terms === "cash"), (l) => l.net);

  return [
    tie("T-1", "Sales: sales register vs revenue in the books (read by the 1701Q/1702Q)", ["10", "50"],
      ["Sales register", registerRevenue], ["Revenue in the books", ledger?.revenue ?? null], ledger ? null : noBooks,
      unconfirmed ?? "A manual entry, a reversal, or a sale booked to an account that is not revenue."),
    tie("T-2", "Output VAT: sales register vs the Output VAT account", ["10", "BB-1"],
      ["Sales register", sum(s, (l) => (l.vatRegistered ? l.vat : 0))], ["Output VAT account", ledger?.outputVat ?? null], ledger ? null : noBooks, unconfirmed),
    tie("T-3", "CWT: sales register (CWT column) vs 2307s received, quarter to date", ["10", "B-2"],
      ["CWT on sales", qtdCwt], ["2307s received", qtd2307], null,
      "Customers who have not sent their 2307 yet: ask them through Requests. CWT without a 2307 stays pending until the annual return (decision 10)."),
    tie("T-4", "EWT: purchases register vs Withholding Tax Payable – Expanded", ["20", "BB-2"],
      ["Purchases register", sum(p, (l) => l.withholding)], ["EWT payable account", ledger?.ewtPayable ?? null], ledger ? null : noBooks,
      unconfirmed ?? "A 2307 issued for EWT the purchases did not carry, or a manual entry."),
    tie("T-5", "Input VAT: purchases register vs the Input VAT account", ["20", "D"],
      ["Purchases register", sum(p, (l) => (l.vatRegistered ? l.vat : 0))], ["Input VAT account", ledger?.inputVat ?? null], ledger ? null : noBooks, unconfirmed),
    tie("T-6", "Tax withheld on compensation: payroll register vs Withholding Tax Payable – Compensation", ["30", "BB-3"],
      ["Payroll register", payroll?.taxWithheld ?? null], ["WTC payable account", ledger?.wtcPayable ?? null], !ledger ? noBooks : !payroll ? noPayroll : null,
      "Payroll does not post to the books yet: record the month's payroll entry."),
    tie("T-7", "Gross compensation: payroll register vs salaries, wages and benefits in the books", ["30"],
      ["Payroll register", payroll?.gross ?? null], ["Salaries and benefits", ledger?.compensation ?? null], !ledger ? noBooks : !payroll ? noPayroll : null,
      "Payroll does not post to the books yet: record the month's payroll entry."),
    tie("T-8", "Net receipts: sales register vs cash and bank debits from those sales", ["10", "A"],
      ["Net receipts, cash sales", cashSalesNet], ["Cash and bank debits", ledger?.cashFromSales ?? null], ledger ? null : noBooks, unconfirmed),
    tie("T-9", "Asset additions: fixed asset register vs property and equipment in the books", ["E"],
      ["Fixed asset register", assets?.additions ?? 0], ["Property and equipment", ledger?.ppeAdditions ?? null], ledger ? null : noBooks,
      unconfirmed ?? "An item under ₱10,000 booked to an asset account (expense it, decision 12), an asset bought without a document, or a manual entry."),
    tie("T-10", "Depreciation: schedule vs Depreciation Expense in the books", ["E"],
      ["Depreciation schedule", assets?.depreciation ?? 0], ["Depreciation Expense", ledger?.depreciation ?? null], ledger ? null : noBooks,
      waiting ?? "Run the month's depreciation on the Fixed assets page, or reverse a manual depreciation entry."),
  ];
}

/**
 * The tie-outs each return needs clean or explained before it is marked prepared
 * (workpaper 0, the lead). Forms not listed have none. T-6 and T-7 tie payroll to
 * the books, which payroll does not post to yet: they belong to closing the month
 * and do not hold up the 1601-C, which reads the payroll register itself.
 */
export const TIES_FOR_FORM: Record<string, TieId[]> = {
  "2550M": ["T-1", "T-2", "T-5"],
  "2550Q": ["T-1", "T-2", "T-5"],
  "2551Q": ["T-1"],
  "0619-E": ["T-4"],
  "1601-EQ": ["T-4"],
  "1701Q": ["T-1", "T-3"],
  "1702Q": ["T-1", "T-3"],
  "1701": ["T-1", "T-3"],
  "1701A": ["T-1", "T-3"],
  "1702-RT": ["T-1", "T-3"],
};

/** Open tie-outs that block a return from being marked prepared. */
export function blockingTies(ties: TieOut[], form: string): TieOut[] {
  const ids = TIES_FOR_FORM[form] ?? [];
  return ties.filter((t) => ids.includes(t.id) && t.status === "open");
}

/** Months a filing period covers, as YYYY-MM-01. */
export function monthsOf(periodStart: string, periodEnd: string): string[] {
  const out: string[] = [];
  let y = Number(periodStart.slice(0, 4));
  let m = Number(periodStart.slice(5, 7));
  const endKey = periodEnd.slice(0, 7);
  for (let i = 0; i < 24; i++) {
    const key = `${y}-${String(m).padStart(2, "0")}`;
    out.push(`${key}-01`);
    if (key >= endKey) break;
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return out;
}
