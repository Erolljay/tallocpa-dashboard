/**
 * Month lock helpers for the Returns and Filings lists (docs/REWORK.md, decisions 9
 * and 10). The database decides (public.filing_books_ready / filings_books_ready);
 * these mirror it for lists that already hold the month statuses, and filter a list
 * by the database's answer.
 */

export type BooksMonthStatus = "open" | "lock_requested" | "locked" | "unlock_requested";

export const BOOKS_MONTH_STATUS_LABELS: Record<BooksMonthStatus, string> = {
  open: "Open",
  lock_requested: "Lock requested",
  locked: "Locked",
  unlock_requested: "Unlock requested",
};

/** First day of each month from start to end (YYYY-MM-DD), inclusive. */
export function monthsInPeriod(start: string, end: string): string[] {
  const out: string[] = [];
  let y = Number(start.slice(0, 4));
  let m = Number(start.slice(5, 7));
  const ey = Number(end.slice(0, 4));
  const em = Number(end.slice(5, 7));
  while (y < ey || (y === ey && m <= em)) {
    out.push(`${y}-${String(m).padStart(2, "0")}-01`);
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return out;
}

/**
 * Whether a return's period is all locked. Months before the books start do not
 * count; a client without books (booksStart null) is not held back.
 * lockedMonths: first days of the locked months ("locked" or "unlock_requested").
 */
export function periodLocked(periodStart: string, periodEnd: string, lockedMonths: ReadonlySet<string>, booksStart: string | null): boolean {
  if (!booksStart) return true;
  const from = periodStart < booksStart ? booksStart : periodStart;
  return monthsInPeriod(from, periodEnd).every((m) => lockedMonths.has(m));
}

/** Whether a month status counts as locked (an unlock request leaves it locked until decided). */
export function isLocked(status: BooksMonthStatus): boolean {
  return status === "locked" || status === "unlock_requested";
}

/** Keeps the filings whose books are ready, given the answer of filings_books_ready(). */
export function onlyBooksReady<T extends { id: string }>(filings: T[], ready: { filing_id: string; ready: boolean | null }[]): T[] {
  const ok = new Set(ready.filter((r) => r.ready).map((r) => r.filing_id));
  return filings.filter((f) => ok.has(f.id));
}
