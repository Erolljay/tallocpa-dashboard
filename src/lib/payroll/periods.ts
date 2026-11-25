/**
 * Pay periods of a payroll run (payroll to the books): a client can send the whole
 * month, or the 1st–15th and the 16th–end separately; each run is posted to the books
 * on its own. A run is keyed by its last day (null = the whole month).
 */
export const PAY_PERIODS = {
  month: "Whole month",
  first: "1st to 15th",
  second: "16th to end of month",
} as const;
export type PayPeriod = keyof typeof PAY_PERIODS;

const lastDay = (month: string) => {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
};

/** The run's pay_period_end for a month (YYYY-MM-01): null for the whole month. */
export function periodEnd(month: string, p: string | null | undefined): string | null {
  if (p === "first") return `${month.slice(0, 7)}-15`;
  if (p === "second") return lastDay(month);
  return null;
}

/** "March 2027", "March 1–15, 2027" or "March 16–31, 2027". */
export function periodLabel(month: string, end: string | null): string {
  const name = new Intl.DateTimeFormat("en-PH", { month: "long", timeZone: "UTC" }).format(new Date(`${month.slice(0, 7)}-01T00:00:00Z`));
  const year = month.slice(0, 4);
  if (!end) return `${name} ${year}`;
  const d = Number(end.slice(8, 10));
  return d <= 15 ? `${name} 1–${d}, ${year}` : `${name} 16–${d}, ${year}`;
}
