/**
 * Financial statements from the ledger (spec §3.6, Phase 1B slice 6): each
 * account reports on its FS line (fs-lines.ts), and the lines are laid out in
 * the order of the firm's FS working papers.
 *
 *   Statement of Financial Position   as of the period end.
 *   Statement of Comprehensive Income for the period and, when the period is
 *                                     shorter than the year, the year to date.
 *   Statement of Changes in Equity    from the start of the taxable year.
 *   Notes                             the accounts behind each FS line that has a note.
 *
 * The books are not closed at year end (no closing entries yet), so income of
 * the year to date shows as "Net income for the year", and income of earlier
 * years not yet closed into capital or retained earnings shows on its own line.
 *
 * Pure: the caller loads the trial balances (database function trial_balance).
 * Amounts are centavos; the result is plain JSON so a released report can be
 * stored as it was released.
 */
import { FS_LINES, isFsLine, type FsLineKey, type Section } from "./fs-lines";
import type { Centavos } from "./types";

export type ReportKind = "monthly" | "quarterly" | "annual";

export const REPORT_KINDS: Record<ReportKind, string> = { monthly: "Monthly", quarterly: "Quarterly", annual: "Annual" };

/** One account of a trial balance: balance before the range, movement in it, balance at its end (debit positive). */
export interface StatementRow {
  code: string;
  name: string;
  fsLine: string;
  opening: Centavos;
  debit: Centavos;
  credit: Centavos;
  closing: Centavos;
}

export interface StatementLine {
  label: string;
  /** One amount per column of the statement; null on headings. */
  amounts: (Centavos | null)[];
  kind: "heading" | "line" | "subtotal" | "total";
  /** FS note number, if the line has a note. */
  note?: number;
}

export interface Statement {
  title: string;
  columns: string[];
  lines: StatementLine[];
}

export interface Note {
  number: number;
  title: string;
  columns: string[];
  rows: { label: string; amounts: Centavos[] }[];
  total: Centavos[];
}

export interface FinancialStatements {
  kind: ReportKind;
  periodStart: string;
  periodEnd: string;
  yearStart: string;
  client: { name: string; tin: string | null; address: string | null };
  position: Statement;
  income: Statement;
  equity: Statement;
  notes: Note[];
  /** Total assets less total liabilities and equity: 0 when the books balance. */
  difference: Centavos;
  /** Accounts whose FS line is unknown (reported under "Unclassified"). */
  unclassified: string[];
}

// ── Periods ────────────────────────────────────────────────

const iso = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d)).toISOString().slice(0, 10);
const monthEndOf = (y: number, m: number) => iso(y, m + 1, 0);

/** First day of the taxable year that contains `date`, for a year ending in month `fyeMonth`. */
export function taxableYearStart(date: string, fyeMonth: number): string {
  const y = Number(date.slice(0, 4));
  const m = Number(date.slice(5, 7));
  const startMonth = (fyeMonth % 12) + 1;
  return m >= startMonth ? iso(y, startMonth, 1) : iso(y - 1, startMonth, 1);
}

/**
 * The dates a report covers, from its kind and its last month ("YYYY-MM").
 * Quarters and years follow the client's taxable year; an annual report must
 * end on the year-end month. Returns an error message otherwise.
 */
export function reportPeriod(kind: ReportKind, endMonth: string, fyeMonth: number): { start: string; end: string; yearStart: string } | { error: string } {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(endMonth)) return { error: "Choose the month the report ends." };
  const y = Number(endMonth.slice(0, 4));
  const m = Number(endMonth.slice(5, 7));
  const end = monthEndOf(y, m);
  const yearStart = taxableYearStart(end, fyeMonth);
  const monthsIn = (y - Number(yearStart.slice(0, 4))) * 12 + m - Number(yearStart.slice(5, 7)) + 1;
  if (kind === "monthly") return { start: iso(y, m, 1), end, yearStart };
  if (kind === "quarterly") {
    if (monthsIn % 3 !== 0) return { error: "A quarter of the taxable year ends on its 3rd, 6th, 9th or 12th month." };
    return { start: iso(y, m - 2, 1), end, yearStart };
  }
  if (monthsIn !== 12) return { error: "An annual report ends on the last month of the taxable year." };
  return { start: yearStart, end, yearStart };
}

const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));
const fmtMonth = (d: string) => new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));

/** "For the month ended 31 January 2027", "For the quarter ended …", "For the year ended …". */
export function periodTitle(kind: ReportKind, end: string): string {
  return `For the ${kind === "monthly" ? "month" : kind === "quarterly" ? "quarter" : "year"} ended ${fmtDate(end)}`;
}

// ── Building ───────────────────────────────────────────────

/** Sections whose balances are credits (shown positive when credit). */
const CREDIT_SECTIONS = new Set<Section>(["current_liabilities", "noncurrent_liabilities", "equity", "revenue", "other_income"]);
const sign = (section: Section, net: Centavos) => (CREDIT_SECTIONS.has(section) ? -net : net);

type Fs = FsLineKey | "unclassified";
const sectionOf = (k: Fs): Section => (k === "unclassified" ? "operating_expenses" : FS_LINES[k].section);
const labelOf = (k: Fs) => (k === "unclassified" ? "Unclassified" : FS_LINES[k].label);
const fsOf = (r: StatementRow): Fs => (isFsLine(r.fsLine) ? r.fsLine : "unclassified");
const isPnl = (k: Fs) => k === "unclassified" || FS_LINES[k].statement === "sci";
const ORDER = Object.keys(FS_LINES) as FsLineKey[];
const ordered = (keys: Iterable<Fs>): Fs[] => {
  const set = new Set(keys);
  return [...ORDER.filter((k) => set.has(k)), ...(set.has("unclassified") ? ["unclassified" as const] : [])];
};

const add = (a: Centavos[], b: Centavos[]) => a.map((x, i) => x + (b[i] ?? 0));
const zero = (n: number) => Array<Centavos>(n).fill(0);
const nonZero = (xs: Centavos[]) => xs.some((x) => x !== 0);

export function buildStatements(opts: {
  kind: ReportKind;
  periodStart: string;
  periodEnd: string;
  yearStart: string;
  client: FinancialStatements["client"];
  /** Trial balance from the start of the taxable year to the period end. */
  year: StatementRow[];
  /** Trial balance from the period start to its end; omit when the period is the year to date. */
  period?: StatementRow[];
}): FinancialStatements {
  const { year } = opts;
  const twoColumns = opts.periodStart !== opts.yearStart && !!opts.period;
  const sciColumns = twoColumns
    ? [opts.kind === "monthly" ? fmtMonth(opts.periodStart) : opts.kind === "quarterly" ? `Quarter ended ${fmtDate(opts.periodEnd)}` : "Period", "Year to date"]
    : [opts.kind === "annual" ? `Year ended ${fmtDate(opts.periodEnd)}` : "Year to date"];
  const sfpColumns = [fmtDate(opts.periodEnd)];
  const unclassified = year.filter((r) => fsOf(r) === "unclassified" && (r.closing !== 0 || r.debit !== 0 || r.credit !== 0)).map((r) => `${r.code} ${r.name}`);

  // Movement of P&L accounts per column; balances of SFP accounts at the end.
  const movement = (rows: StatementRow[]) => {
    const m = new Map<Fs, Map<string, Centavos>>();
    for (const r of rows) {
      const k = fsOf(r);
      if (!isPnl(k)) continue;
      const v = sign(sectionOf(k), r.debit - r.credit);
      if (!m.has(k)) m.set(k, new Map());
      m.get(k)!.set(`${r.code} ${r.name}`, (m.get(k)!.get(`${r.code} ${r.name}`) ?? 0) + v);
    }
    return m;
  };
  const pnlCols = twoColumns ? [movement(opts.period!), movement(year)] : [movement(year)];
  const pnlKeys = ordered(pnlCols.flatMap((c) => [...c.keys()]));
  const pnlAccounts = (k: Fs) => [...new Set(pnlCols.flatMap((c) => [...(c.get(k)?.keys() ?? [])]))].sort();
  const pnlAmounts = (k: Fs): Centavos[] => pnlCols.map((c) => [...(c.get(k)?.values() ?? [])].reduce((s, v) => s + v, 0));
  const pnlByAccount = (k: Fs, acc: string): Centavos[] => pnlCols.map((c) => c.get(k)?.get(acc) ?? 0);

  const balances = new Map<Fs, Map<string, Centavos>>();
  let priorIncome = 0; // P&L of earlier years not closed: credit positive
  for (const r of year) {
    const k = fsOf(r);
    if (isPnl(k)) {
      priorIncome -= r.opening;
      continue;
    }
    const v = sign(sectionOf(k), r.closing);
    if (v === 0) continue;
    if (!balances.has(k)) balances.set(k, new Map());
    balances.get(k)!.set(`${r.code} ${r.name}`, (balances.get(k)!.get(`${r.code} ${r.name}`) ?? 0) + v);
  }
  const balance = (k: Fs) => [...(balances.get(k)?.values() ?? [])].reduce((s, v) => s + v, 0);

  // Notes are numbered in the order their lines appear: position first, then income.
  const notes: Note[] = [];
  const noteNumbers = new Map<string, number>();
  const noteFor = (k: Fs, columns: string[], rows: { label: string; amounts: Centavos[] }[]): number | undefined => {
    if (k === "unclassified" || !("note" in FS_LINES[k])) return undefined;
    const title = (FS_LINES[k] as { note: string }).note;
    let n = noteNumbers.get(title);
    if (n == null) {
      n = notes.length + 1;
      noteNumbers.set(title, n);
      notes.push({ number: n, title, columns, rows: [], total: zero(columns.length) });
    }
    const note = notes[n - 1];
    for (const r of rows) {
      note.rows.push(r);
      note.total = add(note.total, r.amounts);
    }
    return n;
  };

  // ── Statement of Financial Position ──
  const pos: StatementLine[] = [];
  const sfpSection = (section: Section, title: string, totalLabel: string): Centavos => {
    const keys = ordered([...balances.keys()].filter((k) => sectionOf(k) === section));
    if (!keys.length) return 0;
    pos.push({ label: title, amounts: [null], kind: "heading" });
    let total = 0;
    for (const k of keys) {
      const v = balance(k);
      total += v;
      const rows = [...balances.get(k)!.entries()].sort().map(([label, a]) => ({ label, amounts: [a] }));
      pos.push({ label: labelOf(k), amounts: [v], kind: "line", note: noteFor(k, sfpColumns, rows) });
    }
    pos.push({ label: totalLabel, amounts: [total], kind: "subtotal" });
    return total;
  };
  pos.push({ label: "ASSETS", amounts: [null], kind: "heading" });
  const assets = sfpSection("current_assets", "Current assets", "Total current assets") + sfpSection("noncurrent_assets", "Non-current assets", "Total non-current assets");
  pos.push({ label: "TOTAL ASSETS", amounts: [assets], kind: "total" });
  pos.push({ label: "LIABILITIES AND EQUITY", amounts: [null], kind: "heading" });
  const liabilities = sfpSection("current_liabilities", "Current liabilities", "Total current liabilities") + sfpSection("noncurrent_liabilities", "Non-current liabilities", "Total non-current liabilities");
  if (liabilities !== 0) pos.push({ label: "Total liabilities", amounts: [liabilities], kind: "subtotal" });

  const ytdIncome = pnlNet(pnlKeys, pnlAmounts, pnlCols.length - 1);
  const equityKeys = ordered([...balances.keys()].filter((k) => sectionOf(k) === "equity"));
  pos.push({ label: "Equity", amounts: [null], kind: "heading" });
  let equityTotal = 0;
  for (const k of equityKeys) {
    const v = balance(k);
    equityTotal += v;
    const rows = [...balances.get(k)!.entries()].sort().map(([label, a]) => ({ label, amounts: [a] }));
    pos.push({ label: labelOf(k), amounts: [v], kind: "line", note: noteFor(k, sfpColumns, rows) });
  }
  if (priorIncome !== 0) {
    pos.push({ label: "Income of prior years not yet closed", amounts: [priorIncome], kind: "line" });
    equityTotal += priorIncome;
  }
  pos.push({ label: "Net income (loss) for the year to date", amounts: [ytdIncome], kind: "line" });
  equityTotal += ytdIncome;
  pos.push({ label: "Total equity", amounts: [equityTotal], kind: "subtotal" });
  pos.push({ label: "TOTAL LIABILITIES AND EQUITY", amounts: [liabilities + equityTotal], kind: "total" });

  // ── Statement of Comprehensive Income ──
  const inc: StatementLine[] = [];
  const n = pnlCols.length;
  const sciSection = (section: Section, title: string | null, totalLabel: string | null): Centavos[] => {
    const keys = pnlKeys.filter((k) => sectionOf(k) === section && nonZero(pnlAmounts(k)));
    if (!keys.length) return zero(n);
    if (title) inc.push({ label: title, amounts: Array(n).fill(null), kind: "heading" });
    let total = zero(n);
    for (const k of keys) {
      const v = pnlAmounts(k);
      total = add(total, v);
      const rows = pnlAccounts(k).map((acc) => ({ label: acc, amounts: pnlByAccount(k, acc) })).filter((r) => nonZero(r.amounts));
      inc.push({ label: labelOf(k), amounts: v, kind: "line", note: noteFor(k, sciColumns, rows) });
    }
    if (totalLabel && keys.length > 1) inc.push({ label: totalLabel, amounts: total, kind: "subtotal" });
    return total;
  };
  const revenue = sciSection("revenue", null, "Total revenues");
  const cost = sciSection("cost", null, "Total cost of sales and services");
  const gross = revenue.map((r, i) => r - cost[i]);
  if (nonZero(cost)) inc.push({ label: "Gross profit", amounts: gross, kind: "subtotal" });
  const opex = sciSection("operating_expenses", "Operating expenses", "Total operating expenses");
  const operating = gross.map((g, i) => g - opex[i]);
  inc.push({ label: "Income (loss) from operations", amounts: operating, kind: "subtotal" });
  const other = sciSection("other_income", null, null);
  const finance = sciSection("finance_costs", null, null);
  const beforeTax = operating.map((o, i) => o + other[i] - finance[i]);
  inc.push({ label: "Income (loss) before income tax", amounts: beforeTax, kind: "subtotal" });
  const tax = sciSection("income_tax", null, null);
  const net = beforeTax.map((b, i) => b - tax[i]);
  inc.push({ label: "NET INCOME (LOSS)", amounts: net, kind: "total" });

  // ── Statement of Changes in Equity (year to date) ──
  const eq: StatementLine[] = [];
  const equityRows = year.filter((r) => !isPnl(fsOf(r)) && sectionOf(fsOf(r)) === "equity");
  const startEquity = equityRows.reduce((s, r) => s - r.opening, 0) + priorIncome;
  eq.push({ label: `Balance at ${fmtDate(opts.yearStart)}`, amounts: [startEquity], kind: "subtotal" });
  const moves = new Map<Fs, Centavos>();
  for (const r of equityRows) moves.set(fsOf(r), (moves.get(fsOf(r)) ?? 0) - (r.debit - r.credit));
  for (const k of ordered(moves.keys())) if (moves.get(k)) eq.push({ label: `${labelOf(k)}: movement`, amounts: [moves.get(k)!], kind: "line" });
  eq.push({ label: "Net income (loss) for the year to date", amounts: [ytdIncome], kind: "line" });
  const endEquity = startEquity + [...moves.values()].reduce((s, v) => s + v, 0) + ytdIncome;
  eq.push({ label: `Balance at ${fmtDate(opts.periodEnd)}`, amounts: [endEquity], kind: "total" });

  return {
    kind: opts.kind,
    periodStart: opts.periodStart,
    periodEnd: opts.periodEnd,
    yearStart: opts.yearStart,
    client: opts.client,
    position: { title: "Statement of Financial Position", columns: sfpColumns, lines: pos },
    income: { title: "Statement of Comprehensive Income", columns: sciColumns, lines: inc },
    equity: { title: "Statement of Changes in Equity", columns: [`Year to ${fmtDate(opts.periodEnd)}`], lines: eq },
    notes,
    difference: assets - (liabilities + equityTotal),
    unclassified,
  };
}

/** Net income of column `col` (revenue and other income less costs, expenses, finance costs and tax). */
function pnlNet(keys: Fs[], amounts: (k: Fs) => Centavos[], col: number): Centavos {
  return keys.reduce((s, k) => {
    const v = amounts(k)[col] ?? 0;
    const section = sectionOf(k);
    return section === "revenue" || section === "other_income" ? s + v : s - v;
  }, 0);
}
