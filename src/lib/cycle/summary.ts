/** Where a client stands in a month's cycle (spec §3.10), for the staff and portal screens. */

export interface CycleRow {
  cutoff_date: string;
  requested_at: string | null;
  nothing_to_submit_at: string | null;
  missed_cutoff: boolean | null;
  closed_at: string | null;
}

export type Submission = "nothing" | "submitted" | "missed" | "waiting" | "not_due";

/** Submission state as of `today`, given how many documents for the month have come in. */
export function submission(y: CycleRow, documents: number, today: string): Submission {
  if (y.missed_cutoff === true) return "missed";
  if (y.nothing_to_submit_at) return "nothing";
  if (documents > 0 || y.missed_cutoff === false) return "submitted";
  return today > y.cutoff_date ? "missed" : y.requested_at ? "waiting" : "not_due";
}

export const submissionLabel: Record<Submission, string> = {
  nothing: "Nothing to submit",
  submitted: "Submitted",
  missed: "Missed cutoff",
  waiting: "Waiting",
  not_due: "Month in progress",
};

export const submissionTone = {
  nothing: "done",
  submitted: "done",
  missed: "blocked",
  waiting: "waiting",
  not_due: "neutral",
} as const;

export const EXCEPTION_DECISIONS = {
  amend: "Amend the prior-year return",
  non_deductible: "Treat as non-deductible",
  record_current: "Record in the current period",
} as const;
export type ExceptionDecision = keyof typeof EXCEPTION_DECISIONS;

/** "2026-11" or "2026-11-01" → "2026-11-01"; anything else → null. */
export function parseMonth(v: string | undefined | null): string | null {
  const m = /^(\d{4})-(\d{2})(?:-01)?$/.exec(v ?? "");
  if (!m || Number(m[2]) < 1 || Number(m[2]) > 12) return null;
  return `${m[1]}-${m[2]}-01`;
}
