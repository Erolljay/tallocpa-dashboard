/**
 * Staff KPIs, monthly with a 12-month trend (spec §3.11, Q40), from the monthly
 * figures the database sums up (public.staff_scorecard).
 */

/** One staff-month from public.staff_scorecard. */
export interface StaffMonth {
  month: string;
  filings_due: number;
  late_staff: number;
  late_client: number;
  prepared: number;
  kicked_back: number;
  filed: number;
  /** Average days from the cutoff to filing over that month's filed returns; null when none. */
  days_to_file: number | string | null;
  documents_processed: number;
  ocr_corrections: number;
}

export interface Kpis {
  /** Returns due, and the share filed on time. A late return the client caused does not count against staff. */
  filingsDue: number;
  onTimeRate: number | null;
  lateStaff: number;
  lateClient: number;
  /** Returns prepared, and the share a reviewer sent back. */
  prepared: number;
  kickbackRate: number | null;
  /** Average days from the cutoff to filing, weighted by returns filed. */
  daysToFile: number | null;
  documentsProcessed: number;
  ocrCorrections: number;
}

export function kpis(rows: readonly StaffMonth[]): Kpis {
  const sum = (k: keyof StaffMonth) => rows.reduce((s, r) => s + Number(r[k] ?? 0), 0);
  const filingsDue = sum("filings_due");
  const lateStaff = sum("late_staff");
  const prepared = sum("prepared");
  let days = 0;
  let filedWithDays = 0;
  for (const r of rows) {
    if (r.days_to_file === null || r.days_to_file === undefined || Number(r.filed) === 0) continue;
    days += Number(r.days_to_file) * Number(r.filed);
    filedWithDays += Number(r.filed);
  }
  return {
    filingsDue,
    onTimeRate: filingsDue === 0 ? null : (filingsDue - lateStaff) / filingsDue,
    lateStaff,
    lateClient: sum("late_client"),
    prepared,
    kickbackRate: prepared === 0 ? null : sum("kicked_back") / prepared,
    daysToFile: filedWithDays === 0 ? null : Math.round((days / filedWithDays) * 10) / 10,
    documentsProcessed: sum("documents_processed"),
    ocrCorrections: sum("ocr_corrections"),
  };
}

/** The `n` months ending with the month of `today`, oldest first, as "YYYY-MM-01". */
export function lastMonths(today: string, n: number): string[] {
  const y = Number(today.slice(0, 4));
  const m = Number(today.slice(5, 7));
  return Array.from({ length: n }, (_, i) => {
    const k = y * 12 + (m - 1) - (n - 1 - i);
    return `${Math.floor(k / 12)}-${String((k % 12) + 1).padStart(2, "0")}-01`;
  });
}

/** Last day of the month of `month` ("YYYY-MM-01"). */
export function monthEnd(month: string): string {
  const y = Number(month.slice(0, 4));
  const m = Number(month.slice(5, 7));
  return `${month.slice(0, 8)}${String(new Date(Date.UTC(y, m, 0)).getUTCDate()).padStart(2, "0")}`;
}

/** Percent with no decimals, or an em dash when there is nothing to rate. */
export const pct = (v: number | null) => (v === null ? "—" : `${Math.round(v * 100)}%`);
