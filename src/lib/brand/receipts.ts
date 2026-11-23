/**
 * Gross receipts watch (spec §3.1, Q55). A non-VAT firm must register for VAT
 * once its gross receipts pass ₱3,000,000 in a year; the Owner is warned first,
 * at ₱2,500,000 by default. Only the firm's own fees count. Tax and government
 * contributions clients send us to remit are their money, not our receipts.
 */

export const VAT_THRESHOLD = 3_000_000;
/** Kinds of due that are the firm's own fees (see public.client_dues.kind). */
export const FEE_KINDS = ["retainer", "other"] as const;
/** Client money the firm passes on to BIR, SSS, PhilHealth and Pag-IBIG. */
export const CLIENT_MONEY_KINDS = ["tax", "contribution"] as const;

/** One row of public.brand_receipts_by_month: a month, a kind of due (or 'unallocated'), and the amount. */
export interface ReceiptRow {
  month: string;
  kind: string;
  amount: number | string;
}

export type WatchStatus = "ok" | "warning" | "over";

export interface GrossReceiptsWatch {
  year: number;
  /** The firm's own fees collected so far this year. */
  fees: number;
  /** Tax and contributions received for clients: not counted. */
  clientMoney: number;
  /** Received but not matched to any due yet (client credit): not counted until matched. */
  unallocated: number;
  /** Fees by month, January to the current month. */
  months: { month: string; fees: number }[];
  warning: number;
  threshold: number;
  status: WatchStatus;
  /** Fees as a share of the VAT threshold, 0–1 (capped at 1). */
  share: number;
  toWarning: number;
  toThreshold: number;
  /** Year-end fees at this year's pace so far; null in the first month, when the pace means little. */
  projected: number | null;
}

const cents = (v: number | string) => Math.round(Number(v) * 100);
const pesos = (c: number) => c / 100;

export function grossReceiptsWatch(rows: ReceiptRow[], opts: { today: string; warning: number; threshold?: number }): GrossReceiptsWatch {
  const threshold = opts.threshold ?? VAT_THRESHOLD;
  const year = Number(opts.today.slice(0, 4));
  const currentMonth = Number(opts.today.slice(5, 7));
  const feeKinds = new Set<string>(FEE_KINDS);
  const clientKinds = new Set<string>(CLIENT_MONEY_KINDS);

  const byMonth = new Array<number>(12).fill(0);
  let fees = 0;
  let client = 0;
  let unallocated = 0;
  for (const r of rows) {
    if (Number(r.month.slice(0, 4)) !== year) continue;
    const c = cents(r.amount);
    if (feeKinds.has(r.kind)) {
      fees += c;
      byMonth[Number(r.month.slice(5, 7)) - 1] += c;
    } else if (clientKinds.has(r.kind)) client += c;
    else if (r.kind === "unallocated") unallocated += c;
  }

  const warningC = cents(opts.warning);
  const thresholdC = cents(threshold);
  const status: WatchStatus = fees >= thresholdC ? "over" : fees >= warningC ? "warning" : "ok";

  const start = Date.UTC(year, 0, 1);
  const elapsed = Math.round((Date.parse(`${opts.today}T00:00:00Z`) - start) / 86_400_000) + 1;
  const daysInYear = Math.round((Date.UTC(year + 1, 0, 1) - start) / 86_400_000);
  const projected = elapsed >= 31 ? pesos(Math.round((fees * daysInYear) / elapsed)) : null;

  return {
    year,
    fees: pesos(fees),
    clientMoney: pesos(client),
    unallocated: pesos(unallocated),
    months: byMonth.slice(0, currentMonth).map((c, i) => ({ month: `${year}-${String(i + 1).padStart(2, "0")}-01`, fees: pesos(c) })),
    warning: pesos(warningC),
    threshold: pesos(thresholdC),
    status,
    share: thresholdC > 0 ? Math.min(1, fees / thresholdC) : 0,
    toWarning: pesos(Math.max(0, warningC - fees)),
    toThreshold: pesos(Math.max(0, thresholdC - fees)),
    projected,
  };
}
