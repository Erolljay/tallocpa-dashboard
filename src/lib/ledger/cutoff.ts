/**
 * The books' cut-off (Owner, 25 November 2026): the books can start at the beginning of
 * a calendar or fiscal year, or part-way through it, e.g. the second quarter. Pure.
 *
 *   year-start cut-off  the opening trial balance is after closing: no income or expenses
 *   mid-year cut-off    the opening carries the taxable year to date's income and expenses,
 *                       so the quarterly and annual income tax returns read the whole year
 */
import { addDays, type IsoDate } from "@/lib/deadlines/dates";
import type { AccountType } from "./types";

export const PNL_TYPES: readonly AccountType[] = ["revenue", "cost", "expense", "other_income", "income_tax"];

export interface Cutoff {
  booksStart: IsoDate;
  /** The opening balances' date: the day before the books start. */
  openingAsOf: IsoDate;
  /** The first day of the taxable year the books start in. */
  yearStart: IsoDate;
  /** The books start on the first day of a taxable year. */
  atYearStart: boolean;
  /** The books start on the first day of a quarter of the taxable year. */
  atQuarterStart: boolean;
  /** Which quarter of the taxable year the books start in (1–4). */
  quarter: number;
}

export function cutoffOf(booksStart: IsoDate, fyeMonth: number): Cutoff {
  const y = Number(booksStart.slice(0, 4));
  const m = Number(booksStart.slice(5, 7));
  const startMonth = (fyeMonth % 12) + 1;
  const yearStartYear = m >= startMonth ? y : y - 1;
  const yearStart = `${yearStartYear}-${String(startMonth).padStart(2, "0")}-01`;
  const monthsIn = (y - yearStartYear) * 12 + m - startMonth;
  return {
    booksStart,
    openingAsOf: addDays(booksStart, -1),
    yearStart,
    atYearStart: monthsIn === 0 && booksStart.slice(8, 10) === "01",
    atQuarterStart: monthsIn % 3 === 0 && booksStart.slice(8, 10) === "01",
    quarter: Math.floor(monthsIn / 3) + 1,
  };
}
