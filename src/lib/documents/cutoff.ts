/**
 * The monthly document cutoff (spec §3.10, Q28): documents for a month are due by
 * the client's cutoff day of the next month. Mirrors private.document_period().
 */
import { addMonths, ymd, type IsoDate } from "@/lib/deadlines/dates";

/** The month now open for documents: last month until its cutoff, then this month. */
export function openMonth(today: IsoDate, cutoffDay: number): IsoDate {
  const [y, m, d] = today.split("-").map(Number);
  const back = d <= cutoffDay ? addMonths(y, m, -1) : { year: y, month: m };
  return ymd(back.year, back.month, 1);
}

/** The cutoff for the open month, and how many days are left (0 = today). */
export function nextCutoff(today: IsoDate, cutoffDay: number): { month: IsoDate; cutoff: IsoDate; daysLeft: number } {
  const month = openMonth(today, cutoffDay);
  const [y, m] = month.split("-").map(Number);
  const next = addMonths(y, m, 1);
  const cutoff = ymd(next.year, next.month, cutoffDay);
  const daysLeft = Math.round((Date.parse(`${cutoff}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000);
  return { month, cutoff, daysLeft };
}

/** Months a document can be for, newest first: this month back `count` months. */
export function monthChoices(today: IsoDate, count = 15): IsoDate[] {
  const [y, m] = today.split("-").map(Number);
  return Array.from({ length: count }, (_, i) => {
    const t = addMonths(y, m, -i);
    return ymd(t.year, t.month, 1);
  });
}
