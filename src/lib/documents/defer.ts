/** Moving a sale or purchase to a later period (defer_document). Months are "YYYY-MM-01". */
export const MOVE_TARGETS = {
  next_month: "Next month",
  next_quarter: "Next quarter",
} as const;
export type MoveTarget = keyof typeof MOVE_TARGETS;

const ym = (y: number, m: number) => {
  const d = new Date(Date.UTC(y, m - 1, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-01`;
};

/** The month a document of `month` moves to: the next month, or the first month of the next calendar quarter. */
export function moveTarget(month: string, to: MoveTarget): string {
  const y = Number(month.slice(0, 4));
  const m = Number(month.slice(5, 7));
  return to === "next_month" ? ym(y, m + 1) : ym(y, Math.floor((m - 1) / 3) * 3 + 4);
}

/** Whether the move leaves the taxable year (fiscal year ending in `fyeMonth`, 12 = calendar year). */
export function crossesYear(from: string, to: string, fyeMonth = 12): boolean {
  const year = (iso: string) => {
    const y = Number(iso.slice(0, 4));
    return Number(iso.slice(5, 7)) > fyeMonth ? y + 1 : y;
  };
  return year(from) !== year(to);
}
