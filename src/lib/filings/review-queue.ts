/**
 * The Review page's work queue (spec §3.8): returns waiting for a reviewer or for
 * the Owner's final approval, sorted by due date. The database decides who may
 * act; this only sorts what the viewer can already see into their to-do lists.
 */
import type { FilingStatus } from "./sign-off";

export interface QueueFiling {
  id: string;
  client_id: string;
  status: FilingStatus;
  due_date: string;
  open_query: string | null;
  /** Who marked it prepared most recently. */
  prepared_by: string | null;
}

export interface QueueViewer {
  userId: string;
  owner: boolean;
  /** Clients where the viewer is the assigned reviewer. */
  reviewerOf: ReadonlySet<string>;
  /** True while the viewer is the acting approver (Q58): they see the final approvals too. */
  acting?: boolean;
}

export interface ReviewQueue<T extends QueueFiling> {
  /** Prepared returns this person can review (not their own work, unless Owner). */
  toReview: T[];
  /** Client-approved returns waiting for the final approval (the Owner's, or the acting approver's). */
  toApprove: T[];
  /** Reviewed returns waiting for the client; queries flagged. */
  withClient: T[];
}

export function reviewQueue<T extends QueueFiling>(filings: readonly T[], v: QueueViewer): ReviewQueue<T> {
  const byDue = (a: T, b: T) => a.due_date.localeCompare(b.due_date);
  const mine = (f: T) => v.owner || v.reviewerOf.has(f.client_id);
  return {
    toReview: filings.filter((f) => f.status === "prepared" && mine(f) && (v.owner || f.prepared_by !== v.userId)).sort(byDue),
    toApprove: v.owner || v.acting ? filings.filter((f) => f.status === "client_approved").sort(byDue) : [],
    withClient: filings.filter((f) => f.status === "reviewed" && mine(f)).sort(byDue),
  };
}
