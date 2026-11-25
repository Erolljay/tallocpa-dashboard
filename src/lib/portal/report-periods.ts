/**
 * Portal Reports: which periods the client may open (decision 19). The loose-leaf
 * books show closed months: every month from the start of the books through the last
 * locked one (the database checks the same in portal_book_entries). The financial
 * statements also wait for the client's approval of the returns covering a month
 * (Owner, option b; migration 20261207000001): a closed month is held while a monthly
 * or quarterly return covering it is not yet client approved, and a statement is
 * offered only when no closed month it reads is held (portal_trial_balance checks the
 * same). Pure.
 */
import type { ReportKind } from "@/lib/ledger/statements";
import { taxableYearStart } from "@/lib/ledger/statements";

const iso = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d)).toISOString().slice(0, 10);

/** Last day of the month of `d` (YYYY-MM-DD). */
export const monthEnd = (d: string) => iso(Number(d.slice(0, 4)), Number(d.slice(5, 7)) + 1, 0);

/** The first day of each locked month, oldest first: from the books' start month through `lockedThrough`. */
export function lockedMonths(booksStart: string | null, lockedThrough: string | null): string[] {
  if (!booksStart || !lockedThrough) return [];
  const out: string[] = [];
  let y = Number(booksStart.slice(0, 4));
  let m = Number(booksStart.slice(5, 7));
  const last = lockedThrough.slice(0, 7);
  for (;;) {
    const first = iso(y, m, 1);
    if (first.slice(0, 7) > last) break;
    out.push(first);
    m += 1;
    if (m > 12) { m = 1; y += 1; }
  }
  return out;
}

/** Which reports end on a month (first day given): every month; quarters on the 3rd, 6th, 9th and 12th month of the taxable year; the year on its last month. */
export function reportKindsEnding(month: string, fyeMonth: number): ReportKind[] {
  const yearStart = taxableYearStart(month, fyeMonth);
  const monthsIn = (Number(month.slice(0, 4)) - Number(yearStart.slice(0, 4))) * 12 + Number(month.slice(5, 7)) - Number(yearStart.slice(5, 7)) + 1;
  return ["monthly", ...(monthsIn % 3 === 0 ? (["quarterly"] as const) : []), ...(monthsIn === 12 ? (["annual"] as const) : [])];
}

export interface BooksYear {
  /** First day of the taxable year. */
  yearStart: string;
  /** "2026", or "FY 2025–2026" for a fiscal year. */
  label: string;
  /** Locked months of the year (first days), oldest first. */
  months: string[];
  /** The bound book: the year's first locked month through its last. */
  from: string;
  to: string;
  /** The whole taxable year is locked. */
  complete: boolean;
}

/** Locked months grouped by taxable year, newest year first. */
export function booksYears(months: string[], fyeMonth: number): BooksYear[] {
  const byYear = new Map<string, string[]>();
  for (const m of months) {
    const ys = taxableYearStart(m, fyeMonth);
    if (!byYear.has(ys)) byYear.set(ys, []);
    byYear.get(ys)!.push(m);
  }
  return [...byYear.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([yearStart, list]) => {
      const last = list[list.length - 1];
      const endYear = Number(yearStart.slice(0, 4)) + (Number(yearStart.slice(5, 7)) === 1 ? 0 : 1);
      const yearEnd = iso(endYear, fyeMonth + 1, 0);
      return {
        yearStart,
        label: Number(yearStart.slice(5, 7)) === 1 ? yearStart.slice(0, 4) : `FY ${yearStart.slice(0, 4)}–${endYear}`,
        months: list,
        from: list[0],
        to: monthEnd(last),
        complete: monthEnd(last) === yearEnd,
      };
    });
}

/** A closed month held from the client's statements, and the return (not yet client approved) that holds it. */
export interface StatementHold {
  /** First day of the month. */
  month: string;
  filingId: string;
  form: string;
  periodLabel: string;
  status: string;
}

/** A return holding statements, with the closed months it holds (first days, oldest first). */
export interface WaitingReturn {
  filingId: string;
  form: string;
  periodLabel: string;
  status: string;
  months: string[];
}

const ym = (d: string) => d.slice(0, 7);

/** The first month a statement ending on `month` reads: its taxable year's start, and the prior year's for the annual one (shown beside it). */
export function statementReadsFrom(month: string, kind: ReportKind, fyeMonth: number): string {
  const yearStart = taxableYearStart(month, fyeMonth);
  return kind === "annual" ? taxableYearStart(iso(Number(yearStart.slice(0, 4)), Number(yearStart.slice(5, 7)), 0), fyeMonth) : yearStart;
}

/**
 * The statements offered ending on a closed month (first day): the month, quarter and
 * year that end on it (reportKindsEnding) whose every closed month read, from
 * statementReadsFrom through `month`, is not held. So a quarter or the year shows
 * only when all its months show. Months before the books' start hold nothing.
 * `closed`: the closed months (first days).
 */
export function offeredKinds(month: string, fyeMonth: number, closed: string[], holds: StatementHold[]): ReportKind[] {
  if (!closed.some((m) => ym(m) === ym(month))) return [];
  const held = new Set(holds.map((h) => ym(h.month)));
  return reportKindsEnding(month, fyeMonth).filter((kind) => {
    const from = ym(statementReadsFrom(month, kind, fyeMonth));
    return !closed.some((m) => ym(m) >= from && ym(m) <= ym(month) && held.has(ym(m)));
  });
}

/** Each closed month with a statement offered, oldest first, with the kinds offered. */
export function statementPeriods(closed: string[], holds: StatementHold[], fyeMonth: number): { month: string; kinds: ReportKind[] }[] {
  return closed.map((month) => ({ month, kinds: offeredKinds(month, fyeMonth, closed, holds) })).filter((p) => p.kinds.length > 0);
}

/** The returns holding statements, one each with the months it holds, by its earliest month. */
export function waitingReturns(holds: StatementHold[]): WaitingReturn[] {
  const byId = new Map<string, WaitingReturn>();
  for (const h of holds) {
    const r = byId.get(h.filingId) ?? { filingId: h.filingId, form: h.form, periodLabel: h.periodLabel, status: h.status, months: [] };
    if (!r.months.includes(h.month)) r.months.push(h.month);
    byId.set(h.filingId, r);
  }
  return [...byId.values()]
    .map((r) => ({ ...r, months: [...r.months].sort() }))
    .sort((a, b) => a.months[0].localeCompare(b.months[0]) || a.form.localeCompare(b.form));
}
