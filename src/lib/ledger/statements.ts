/**
 * Financial statements from the ledger (spec §3.6, Phase 1B slice 6): each
 * account reports on its FS line (fs-lines.ts), and the lines are laid out in
 * the order of the firm's FS working papers.
 *
 *   Statement of Financial Position   as of the period end.
 *   Statement of Comprehensive Income for the period and, when the period is
 *                                     shorter than the year, the year to date.
 *   Statement of Changes in Equity    from the start of the taxable year.
 *   Statement of Cash Flows           indirect method, by each account's
 *                                     cash-flow class (cash-flow.ts).
 *   Notes                             the accounts behind each FS line that has a note.
 *
 * Annual reports add the prior year beside the current one when the books
 * hold it (`prior`).
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
import { defaultCashFlow, type CashFlowClass } from "./cash-flow";
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
  /** How the account reports on the statement of cash flows; worked out from the FS line when absent. */
  cashFlow?: CashFlowClass;
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
  cashFlows: Statement;
  notes: Note[];
  /** Total assets less total liabilities and equity (current year): 0 when the books balance. */
  difference: Centavos;
  /** Net change in cash per the statement of cash flows less the actual change, per column: 0 when they agree. */
  cashDifference: Centavos[];
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

interface Column {
  label: string;
  rows: StatementRow[];
}

/** Statement of financial position figures for one trial balance. */
function position(rows: StatementRow[]) {
  const balances = new Map<Fs, Map<string, Centavos>>();
  let priorIncome = 0; // income of earlier periods not closed (credit positive)
  let income = 0; // income of the range
  for (const r of rows) {
    const k = fsOf(r);
    if (isPnl(k)) {
      priorIncome -= r.opening;
      income -= r.debit - r.credit;
      continue;
    }
    const v = sign(sectionOf(k), r.closing);
    if (v === 0) continue;
    if (!balances.has(k)) balances.set(k, new Map());
    const acc = `${r.code} ${r.name}`;
    balances.get(k)!.set(acc, (balances.get(k)!.get(acc) ?? 0) + v);
  }
  return { balances, priorIncome, income };
}

/** Income and expense movement for one trial balance, by FS line and account (income positive in income sections). */
function movement(rows: StatementRow[]) {
  const m = new Map<Fs, Map<string, Centavos>>();
  for (const r of rows) {
    const k = fsOf(r);
    if (!isPnl(k)) continue;
    const v = sign(sectionOf(k), r.debit - r.credit);
    if (!m.has(k)) m.set(k, new Map());
    const acc = `${r.code} ${r.name}`;
    m.get(k)!.set(acc, (m.get(k)!.get(acc) ?? 0) + v);
  }
  return m;
}

const classOf = (r: StatementRow): CashFlowClass => r.cashFlow ?? defaultCashFlow({ fsLine: r.fsLine, control: null, normalSide: "debit" });

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
  /** Annual reports: the prior taxable year's trial balance; `income` false when the books did not cover that year (balance sheet only). */
  prior?: { end: string; rows: StatementRow[]; income: boolean };
}): FinancialStatements {
  const { year } = opts;
  const twoColumns = opts.periodStart !== opts.yearStart && !!opts.period;
  const flows: Column[] = twoColumns
    ? [
        { label: opts.kind === "monthly" ? fmtMonth(opts.periodStart) : opts.kind === "quarterly" ? `Quarter ended ${fmtDate(opts.periodEnd)}` : "Period", rows: opts.period! },
        { label: "Year to date", rows: year },
      ]
    : [{ label: opts.kind === "annual" ? `Year ended ${fmtDate(opts.periodEnd)}` : "Year to date", rows: year }];
  if (opts.prior?.income) flows.push({ label: `Year ended ${fmtDate(opts.prior.end)}`, rows: opts.prior.rows });
  const balancesAt: Column[] = [{ label: fmtDate(opts.periodEnd), rows: year }];
  if (opts.prior) balancesAt.push({ label: fmtDate(opts.prior.end), rows: opts.prior.rows });
  const sciColumns = flows.map((c) => c.label);
  const sfpColumns = balancesAt.map((c) => c.label);
  const unclassified = year.filter((r) => fsOf(r) === "unclassified" && (r.closing !== 0 || r.debit !== 0 || r.credit !== 0)).map((r) => `${r.code} ${r.name}`);

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
  const pos = balancesAt.map((c) => position(c.rows));
  const ns = pos.length;
  const balanceOf = (k: Fs) => pos.map((p) => [...(p.balances.get(k)?.values() ?? [])].reduce((a, v) => a + v, 0));
  const accountsOf = (k: Fs) => [...new Set(pos.flatMap((p) => [...(p.balances.get(k)?.keys() ?? [])]))].sort();
  const allKeys = ordered(pos.flatMap((p) => [...p.balances.keys()]));
  const posLines: StatementLine[] = [];
  const blank = (n: number) => Array<null>(n).fill(null);
  const sfpLine = (k: Fs): Centavos[] => {
    const v = balanceOf(k);
    const rows = accountsOf(k).map((acc) => ({ label: acc, amounts: pos.map((p) => p.balances.get(k)?.get(acc) ?? 0) }));
    posLines.push({ label: labelOf(k), amounts: v, kind: "line", note: noteFor(k, sfpColumns, rows) });
    return v;
  };
  const sfpSection = (section: Section, title: string, totalLabel: string): Centavos[] => {
    const keys = allKeys.filter((k) => sectionOf(k) === section);
    if (!keys.length) return zero(ns);
    posLines.push({ label: title, amounts: blank(ns), kind: "heading" });
    let total = zero(ns);
    for (const k of keys) total = add(total, sfpLine(k));
    posLines.push({ label: totalLabel, amounts: total, kind: "subtotal" });
    return total;
  };
  posLines.push({ label: "ASSETS", amounts: blank(ns), kind: "heading" });
  const assets = add(sfpSection("current_assets", "Current assets", "Total current assets"), sfpSection("noncurrent_assets", "Non-current assets", "Total non-current assets"));
  posLines.push({ label: "TOTAL ASSETS", amounts: assets, kind: "total" });
  posLines.push({ label: "LIABILITIES AND EQUITY", amounts: blank(ns), kind: "heading" });
  const liabilities = add(sfpSection("current_liabilities", "Current liabilities", "Total current liabilities"), sfpSection("noncurrent_liabilities", "Non-current liabilities", "Total non-current liabilities"));
  if (nonZero(liabilities)) posLines.push({ label: "Total liabilities", amounts: liabilities, kind: "subtotal" });
  posLines.push({ label: "Equity", amounts: blank(ns), kind: "heading" });
  let equityTotal = zero(ns);
  for (const k of allKeys.filter((k) => sectionOf(k) === "equity")) equityTotal = add(equityTotal, sfpLine(k));
  const priorIncome = pos.map((p) => p.priorIncome);
  if (nonZero(priorIncome)) {
    posLines.push({ label: "Income of prior years not yet closed", amounts: priorIncome, kind: "line" });
    equityTotal = add(equityTotal, priorIncome);
  }
  const income = pos.map((p) => p.income);
  posLines.push({ label: "Net income (loss) for the year to date", amounts: income, kind: "line" });
  equityTotal = add(equityTotal, income);
  posLines.push({ label: "Total equity", amounts: equityTotal, kind: "subtotal" });
  const totalLe = add(liabilities, equityTotal);
  posLines.push({ label: "TOTAL LIABILITIES AND EQUITY", amounts: totalLe, kind: "total" });

  // ── Statement of Comprehensive Income ──
  const mv = flows.map((c) => movement(c.rows));
  const n = mv.length;
  const pnlKeys = ordered(mv.flatMap((c) => [...c.keys()]));
  const pnlAmounts = (k: Fs): Centavos[] => mv.map((c) => [...(c.get(k)?.values() ?? [])].reduce((a, v) => a + v, 0));
  const pnlAccounts = (k: Fs) => [...new Set(mv.flatMap((c) => [...(c.get(k)?.keys() ?? [])]))].sort();
  const inc: StatementLine[] = [];
  const sciSection = (section: Section, title: string | null, totalLabel: string | null): Centavos[] => {
    const keys = pnlKeys.filter((k) => sectionOf(k) === section && nonZero(pnlAmounts(k)));
    if (!keys.length) return zero(n);
    if (title) inc.push({ label: title, amounts: blank(n), kind: "heading" });
    let total = zero(n);
    for (const k of keys) {
      const v = pnlAmounts(k);
      total = add(total, v);
      const rows = pnlAccounts(k).map((acc) => ({ label: acc, amounts: mv.map((c) => c.get(k)?.get(acc) ?? 0) })).filter((r) => nonZero(r.amounts));
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
  const cur = pos[0];
  const eq: StatementLine[] = [];
  const equityRows = year.filter((r) => !isPnl(fsOf(r)) && sectionOf(fsOf(r)) === "equity");
  const startEquity = equityRows.reduce((a, r) => a - r.opening, 0) + cur.priorIncome;
  eq.push({ label: `Balance at ${fmtDate(opts.yearStart)}`, amounts: [startEquity], kind: "subtotal" });
  const moves = new Map<Fs, Centavos>();
  for (const r of equityRows) moves.set(fsOf(r), (moves.get(fsOf(r)) ?? 0) - (r.debit - r.credit));
  for (const k of ordered(moves.keys())) if (moves.get(k)) eq.push({ label: `${labelOf(k)}: movement`, amounts: [moves.get(k)!], kind: "line" });
  eq.push({ label: "Net income (loss) for the year to date", amounts: [cur.income], kind: "line" });
  const endEquity = startEquity + [...moves.values()].reduce((a, v) => a + v, 0) + cur.income;
  eq.push({ label: `Balance at ${fmtDate(opts.periodEnd)}`, amounts: [endEquity], kind: "total" });

  // ── Statement of Cash Flows (indirect method), one column per income column ──
  const cf = flows.map((c) => {
    const lines = new Map<string, Centavos>(); // "class|label" → cash effect
    let noncash = 0;
    let cashOpen = 0;
    let cashClose = 0;
    let netIncome = 0;
    for (const r of c.rows) {
      const k = fsOf(r);
      if (isPnl(k)) {
        netIncome -= r.debit - r.credit;
        continue;
      }
      const cls = classOf(r);
      if (cls === "cash") {
        cashOpen += r.opening;
        cashClose += r.closing;
        continue;
      }
      const effect = -(r.closing - r.opening);
      if (effect === 0) continue;
      if (cls === "noncash") noncash += effect;
      else lines.set(`${cls}|${labelOf(k)}`, (lines.get(`${cls}|${labelOf(k)}`) ?? 0) + effect);
    }
    return { lines, noncash, cashOpen, cashClose, netIncome };
  });
  const cfLines: StatementLine[] = [];
  const groupKeys = (cls: CashFlowClass) => [...new Set(cf.flatMap((c) => [...c.lines.keys()].filter((key) => key.startsWith(`${cls}|`))))];
  const opLabel = (label: string, assetLike: boolean) => (assetLike ? `(Increase) decrease in ${label.toLowerCase()}` : `Increase (decrease) in ${label.toLowerCase()}`);
  const assetLabels = new Set(ORDER.filter((k) => FS_LINES[k].section === "current_assets" || FS_LINES[k].section === "noncurrent_assets").map((k) => FS_LINES[k].label as string));
  const section = (cls: CashFlowClass, title: string, totalLabel: string, extra: StatementLine[] = [], extraAmounts: Centavos[] = zero(n)): Centavos[] => {
    cfLines.push({ label: title, amounts: blank(n), kind: "heading" });
    cfLines.push(...extra);
    let total = extraAmounts;
    for (const key of groupKeys(cls)) {
      const label = key.slice(key.indexOf("|") + 1);
      const v = cf.map((c) => c.lines.get(key) ?? 0);
      total = add(total, v);
      cfLines.push({ label: cls === "operating" ? opLabel(label, assetLabels.has(label)) : label, amounts: v, kind: "line" });
    }
    cfLines.push({ label: totalLabel, amounts: total, kind: "subtotal" });
    return total;
  };
  const ni = cf.map((c) => c.netIncome);
  const nc = cf.map((c) => c.noncash);
  const opExtra: StatementLine[] = [{ label: "Net income (loss)", amounts: ni, kind: "line" }];
  if (nonZero(nc)) opExtra.push({ label: "Adjustments: depreciation, amortization and other non-cash items", amounts: nc, kind: "line" });
  const opTotal = section("operating", "CASH FLOWS FROM OPERATING ACTIVITIES", "Net cash from (used in) operating activities", opExtra, add(ni, nc));
  const invTotal = section("investing", "CASH FLOWS FROM INVESTING ACTIVITIES", "Net cash from (used in) investing activities");
  const finTotal = section("financing", "CASH FLOWS FROM FINANCING ACTIVITIES", "Net cash from (used in) financing activities");
  const netChange = opTotal.map((o, i) => o + invTotal[i] + finTotal[i]);
  cfLines.push({ label: "NET INCREASE (DECREASE) IN CASH AND CASH EQUIVALENTS", amounts: netChange, kind: "subtotal" });
  cfLines.push({ label: "Cash and cash equivalents at the beginning of the period", amounts: cf.map((c) => c.cashOpen), kind: "line" });
  cfLines.push({ label: "CASH AND CASH EQUIVALENTS AT THE END OF THE PERIOD", amounts: cf.map((c) => c.cashClose), kind: "total" });

  return {
    kind: opts.kind,
    periodStart: opts.periodStart,
    periodEnd: opts.periodEnd,
    yearStart: opts.yearStart,
    client: opts.client,
    position: { title: "Statement of Financial Position", columns: sfpColumns, lines: posLines },
    income: { title: "Statement of Comprehensive Income", columns: sciColumns, lines: inc },
    equity: { title: "Statement of Changes in Equity", columns: [`Year to ${fmtDate(opts.periodEnd)}`], lines: eq },
    cashFlows: { title: "Statement of Cash Flows", columns: sciColumns, lines: cfLines },
    notes,
    difference: assets[0] - totalLe[0],
    cashDifference: cf.map((c, i) => netChange[i] - (c.cashClose - c.cashOpen)),
    unclassified,
  };
}
