/**
 * Late submitters: which clients keep sending documents late (Owner, 27 Nov 2026).
 *
 * The Owner tracks this to decide whether to drop a client or, later, charge the
 * late-submission surcharge (it is only charged while the active fee schedule has
 * a surcharge amount; none is set for now). Figures come from the monthly rows of
 * public.client_scorecard.
 */

import type { ClientMonth } from "./compliance";

export const LATE_SUBMITTER_RULES = {
  /** How many months back the list looks. */
  months: 12,
  /** "Always late": late in at least this share of the months with a document cycle … */
  alwaysLateShare: 0.5,
  /** … and in at least this many months. */
  alwaysLateMonths: 3,
} as const;

/** One client-month from public.client_scorecard. */
export type ScorecardRow = Pick<ClientMonth, "cycles_due" | "cycles_missed" | "documents_late"> & { client_id: string; month: string };

export interface LateSubmitter {
  clientId: string;
  /** Months with a document cycle (a cutoff that has passed, or documents after one). */
  cycleMonths: number;
  /** Months the client missed the cutoff or sent any document after it. */
  lateMonths: number;
  /** Documents sent after the cutoff. */
  lateDocuments: number;
  /** The latest late month, "YYYY-MM-01". */
  latestLate: string;
  alwaysLate: boolean;
}

/** A month is late when the client missed the cutoff or sent any document after it. */
export const isLateMonth = (r: Pick<ClientMonth, "cycles_missed" | "documents_late">) => Number(r.cycles_missed) > 0 || Number(r.documents_late) > 0;

export function isAlwaysLate(lateMonths: number, cycleMonths: number): boolean {
  return cycleMonths > 0 && lateMonths >= LATE_SUBMITTER_RULES.alwaysLateMonths && lateMonths / cycleMonths >= LATE_SUBMITTER_RULES.alwaysLateShare;
}

/** Clients late at least once, worst first: most late months, then most late documents. */
export function lateSubmitters(rows: readonly ScorecardRow[]): LateSubmitter[] {
  const byClient = new Map<string, { cycles: Set<string>; late: Set<string>; docs: number }>();
  for (const r of rows) {
    const m = r.month.slice(0, 7);
    const c = byClient.get(r.client_id) ?? { cycles: new Set<string>(), late: new Set<string>(), docs: 0 };
    byClient.set(r.client_id, c);
    const late = isLateMonth(r);
    if (Number(r.cycles_due) > 0 || late) c.cycles.add(m);
    if (late) c.late.add(m);
    c.docs += Number(r.documents_late ?? 0);
  }
  const out: LateSubmitter[] = [];
  for (const [clientId, c] of byClient) {
    if (c.late.size === 0) continue;
    out.push({
      clientId,
      cycleMonths: c.cycles.size,
      lateMonths: c.late.size,
      lateDocuments: c.docs,
      latestLate: `${[...c.late].sort().at(-1)}-01`,
      alwaysLate: isAlwaysLate(c.late.size, c.cycles.size),
    });
  }
  return out.sort((a, b) => b.lateMonths - a.lateMonths || b.lateDocuments - a.lateDocuments || b.latestLate.localeCompare(a.latestLate));
}
