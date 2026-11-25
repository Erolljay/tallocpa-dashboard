/**
 * The sign-off chain (docs/REWORK.md, decision 13) as the screens see it: the five
 * steps in order and which actions a person may take on a filing now. The database
 * function advance_filing() enforces the same rules; this only decides what to show.
 *
 *   Prepared → Reviewed → Client approved → Owner approved → Filed & paid
 *
 * A nil return (tax due 0) skips the client's approval: reviewing it moves it on to
 * the Owner. The Owner (or the acting approver) approves once the client's payment
 * for the return's own statement item is verified (the database checks Collections).
 */

export type FilingStatus = "not_started" | "prepared" | "reviewed" | "client_approved" | "owner_approved" | "filed";

export type SignOffAction = "prepare" | "review" | "kick_back" | "client_approve" | "client_query" | "answer_query" | "owner_approve" | "file";

/** The chain, in order. `by` is who normally takes the step. */
export const SIGN_OFF_STEPS: { status: FilingStatus; label: string; by: string }[] = [
  { status: "prepared", label: "Prepared", by: "Preparer" },
  { status: "reviewed", label: "Reviewed", by: "Reviewer" },
  { status: "client_approved", label: "Client approved", by: "Client" },
  { status: "owner_approved", label: "Owner approved", by: "Owner" },
  { status: "filed", label: "Filed & paid", by: "Staff" },
];

export const ACTION_LABEL: Record<SignOffAction, string> = {
  prepare: "Mark prepared",
  review: "Mark reviewed",
  kick_back: "Send back to preparer",
  client_approve: "Approve",
  client_query: "Ask a question",
  answer_query: "Answer the client",
  owner_approve: "Give final approval",
  file: "Record filed & paid",
};

/** How far along the chain a status is: 0 = not started, 5 = filed & paid. */
export function stepIndex(status: FilingStatus): number {
  return status === "not_started" ? 0 : SIGN_OFF_STEPS.findIndex((s) => s.status === status) + 1;
}

/** A nil return: prepared with no tax due. It skips the client's approval. */
export const isNilReturn = (taxDue: number | null | undefined) => taxDue != null && Number(taxDue) === 0;

export interface Viewer {
  userId: string;
  /** Staff role, or "client" for a client user of this filing's client. */
  role: "owner" | "reviewer" | "staff" | "client";
  /** The viewer's assignments on this filing's client. */
  assignedAs: readonly ("preparer" | "reviewer")[];
  /**
   * Set while the viewer is the acting approver (Q58): the most tax due they may
   * approve. The database also refuses unpaid returns and the approver's own work.
   */
  actingLimit?: number | null;
}

export interface FilingState {
  status: FilingStatus;
  openQuery: string | null;
  /** Who marked the return prepared most recently. */
  preparedBy: string | null;
  /** Tax due on the return, once prepared. */
  taxDue?: number | null;
}

/** Whether an acting approver with this limit may give the final approval (payment is checked by the database). */
export function withinActingLimit(f: FilingState, v: Viewer): boolean {
  return v.actingLimit != null && (f.taxDue ?? 0) <= v.actingLimit && f.preparedBy !== v.userId;
}

/** Actions this person can take on the filing now, in the order to show them. */
export function availableActions(f: FilingState, v: Viewer): SignOffAction[] {
  const owner = v.role === "owner";
  const client = v.role === "client";
  const assigned = v.assignedAs.length > 0;
  const reviewer = v.assignedAs.includes("reviewer");
  const out: SignOffAction[] = [];

  switch (f.status) {
    case "not_started":
      if (owner || assigned) out.push("prepare");
      break;
    case "prepared":
      if (owner || (reviewer && f.preparedBy !== v.userId)) out.push("review");
      if (owner || reviewer) out.push("kick_back");
      break;
    case "reviewed":
      if (client) out.push("client_approve", "client_query");
      else if (owner) out.push("client_approve");
      if (f.openQuery && (owner || assigned)) out.push("answer_query");
      if (owner || reviewer) out.push("kick_back");
      break;
    case "client_approved":
      if (owner || withinActingLimit(f, v)) out.push("owner_approve");
      if (owner || reviewer) out.push("kick_back");
      break;
    case "owner_approved":
      if (owner || assigned) out.push("file");
      break;
  }
  return out;
}
