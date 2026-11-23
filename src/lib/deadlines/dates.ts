/**
 * Date-only helpers. All dates are ISO strings "YYYY-MM-DD" with no time zone,
 * so a deadline never shifts by a day because of the server's clock.
 */
export type IsoDate = string;

const ISO = /^\d{4}-\d{2}-\d{2}$/;

export function parseIso(d: IsoDate): Date {
  if (!ISO.test(d)) throw new Error(`Not an ISO date: ${d}`);
  const [y, m, day] = d.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, day));
  if (date.getUTCMonth() !== m - 1) throw new Error(`Invalid date: ${d}`);
  return date;
}

export function toIso(date: Date): IsoDate {
  return date.toISOString().slice(0, 10);
}

/** Make a date from year and 1-based month; month may overflow (13 = next January). */
export function ymd(year: number, month: number, day: number): IsoDate {
  return toIso(new Date(Date.UTC(year, month - 1, day)));
}

export function lastDayOfMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function addDays(d: IsoDate, days: number): IsoDate {
  const date = parseIso(d);
  date.setUTCDate(date.getUTCDate() + days);
  return toIso(date);
}

/** Year and 1-based month after adding `months` to a year/month pair. */
export function addMonths(year: number, month: number, months: number): { year: number; month: number } {
  const index = year * 12 + (month - 1) + months;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

export function isWeekend(d: IsoDate): boolean {
  const dow = parseIso(d).getUTCDay();
  return dow === 0 || dow === 6;
}

export function compareIso(a: IsoDate, b: IsoDate): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
