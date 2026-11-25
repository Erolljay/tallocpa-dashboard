/**
 * Portal Reports: which periods the client may open (decision 19). Financial
 * statements and the loose-leaf books show locked months only: every month from
 * the start of the books through the last locked one (the database checks the
 * same in portal_trial_balance and portal_book_entries). Pure.
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
