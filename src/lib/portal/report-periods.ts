/**
 * Portal Reports: which periods the client may open (decision 19). The loose-leaf
 * books show closed months: every month from the start of the books through the last
 * locked one (the database checks the same in portal_book_entries). The financial
 * statements also wait for the client's approval of the returns (Owner, REWORK 19a;
 * migration 20261207000002): a closed month is held while a monthly or quarterly
 * return covering it is not yet client approved, each month on its own; a quarter
 * shows when its three months show; the year when its twelve months show and its
 * annual income tax return is approved (portal_trial_balance checks the same). Pure.
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

/**
 * What holds the client's statements, with the return (not yet client approved) that holds it:
 * "month": a closed month covered by a monthly or quarterly return;
 * "year": the year ending on `month`, by its annual income tax return.
 */
export interface StatementHold {
  scope: "month" | "year";
  /** First day of the month (for "year", the year's last month). */
  month: string;
  filingId: string;
  form: string;
  periodLabel: string;
  /** The holding return is an amended return: the period's books were corrected. */
  amended: boolean;
  status: string;
}

/** A return holding statements, with what it holds. */
export interface WaitingReturn {
  filingId: string;
  form: string;
  periodLabel: string;
  status: string;
  amended: boolean;
  /** Closed months it holds (first days, oldest first). */
  months: string[];
  /** The last month of the year whose annual statements it holds, if any. */
  yearEnding: string | null;
}

const ym = (d: string) => d.slice(0, 7);

/** The months a report ending on `month` stands on, as YYYY-MM, oldest first: the month; its quarter's three; the year's twelve. */
export function monthsOfReport(month: string, kind: ReportKind): string[] {
  const n = kind === "monthly" ? 1 : kind === "quarterly" ? 3 : 12;
  const y = Number(month.slice(0, 4));
  const m = Number(month.slice(5, 7));
  return Array.from({ length: n }, (_, i) => ym(iso(y, m - (n - 1 - i), 1)));
}

/**
 * The statements offered ending on a closed month (first day). Each month stands on
 * its own returns: the month shows when it is not held; the quarter ending on it when
 * its three months show; the year when its twelve months show and its annual income
 * tax return holds nothing. Months before the books' start (not in `closed`) hold
 * nothing. `closed`: the closed months (first days).
 */
export function offeredKinds(month: string, fyeMonth: number, closed: string[], holds: StatementHold[]): ReportKind[] {
  const closedSet = new Set(closed.map(ym));
  if (!closedSet.has(ym(month))) return [];
  const held = new Set(holds.filter((h) => h.scope === "month").map((h) => ym(h.month)));
  const yearHeld = holds.some((h) => h.scope === "year" && ym(h.month) === ym(month));
  return reportKindsEnding(month, fyeMonth).filter(
    (kind) => monthsOfReport(month, kind).every((m) => !closedSet.has(m) || !held.has(m)) && !(kind === "annual" && yearHeld),
  );
}

/** Each closed month with a statement offered, oldest first, with the kinds offered. */
export function statementPeriods(closed: string[], holds: StatementHold[], fyeMonth: number): { month: string; kinds: ReportKind[] }[] {
  return closed.map((month) => ({ month, kinds: offeredKinds(month, fyeMonth, closed, holds) })).filter((p) => p.kinds.length > 0);
}

/** The returns holding statements, one each with what it holds, by its earliest month. */
export function waitingReturns(holds: StatementHold[]): WaitingReturn[] {
  const byId = new Map<string, WaitingReturn>();
  for (const h of holds) {
    const r = byId.get(h.filingId) ?? { filingId: h.filingId, form: h.form, periodLabel: h.periodLabel, status: h.status, amended: h.amended, months: [], yearEnding: null };
    if (h.scope === "year") r.yearEnding = h.month;
    else if (!r.months.includes(h.month)) r.months.push(h.month);
    byId.set(h.filingId, r);
  }
  const first = (r: WaitingReturn) => r.months[0] ?? r.yearEnding ?? "";
  return [...byId.values()]
    .map((r) => ({ ...r, months: [...r.months].sort() }))
    .sort((a, b) => first(a).localeCompare(first(b)) || a.form.localeCompare(b.form));
}

