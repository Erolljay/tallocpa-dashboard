/**
 * When an approved document can still be edited (mirrors private.locking_filing).
 * A month is locked once a return of the client whose period covers it has been
 * filed: the filed worksheet used those figures.
 */
/** Filing statuses after which a return (and the months it covers) is locked. */
export const LOCKED_STATUSES = ["filed", "paid", "proof_uploaded"];

export interface LockFiling {
  id: string;
  client_id: string;
  form: string;
  period_label: string;
  period_start: string;
  period_end: string;
  status: string;
}

/** The filed return that locks this client's month ("YYYY-MM-01"), or null while it is open. */
export function lockingFiling<F extends LockFiling>(clientId: string, month: string, filings: F[]): F | null {
  let hit: F | null = null;
  for (const f of filings) {
    if (f.client_id !== clientId || !LOCKED_STATUSES.includes(f.status)) continue;
    if (month < `${f.period_start.slice(0, 7)}-01` || month > f.period_end) continue;
    if (!hit || f.period_end > hit.period_end) hit = f;
  }
  return hit;
}
