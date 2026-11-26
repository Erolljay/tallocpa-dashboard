/** Period presets for the Documents filter. Months are "YYYY-MM-01", matching documents.period. */
export const PERIODS = {
  all: "All periods",
  this_month: "This month",
  last_month: "Last month",
  this_quarter: "This quarter",
  this_year: "This year",
  custom: "Custom…",
} as const;
export type PeriodKey = keyof typeof PERIODS;

const ym = (y: number, m: number) => {
  const d = new Date(Date.UTC(y, m - 1, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-01`;
};
const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;

/** The month range to filter on, or null for all periods. `today` is "YYYY-MM-DD" (Manila). */
export function periodRange(period: string, today: string, from?: string, to?: string): { key: PeriodKey; from: string; to: string } | null {
  const y = Number(today.slice(0, 4));
  const m = Number(today.slice(5, 7));
  switch (period) {
    case "this_month":
      return { key: period, from: ym(y, m), to: ym(y, m) };
    case "last_month":
      return { key: period, from: ym(y, m - 1), to: ym(y, m - 1) };
    case "this_quarter": {
      const q = Math.floor((m - 1) / 3) * 3 + 1;
      return { key: period, from: ym(y, q), to: ym(y, q + 2) };
    }
    case "this_year":
      return { key: period, from: ym(y, 1), to: ym(y, 12) };
    case "custom": {
      if (!from || !to || !MONTH.test(from) || !MONTH.test(to)) return null;
      const [a, b] = from <= to ? [from, to] : [to, from];
      return { key: period, from: `${a}-01`, to: `${b}-01` };
    }
    default:
      return null;
  }
}
