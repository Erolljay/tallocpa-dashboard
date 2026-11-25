/**
 * The Filings page (docs/REWORK.md, decisions 10 and 13): returns grouped by their BIR
 * date, each with the five sign-off steps, who it waits on and, when a step is late,
 * whether the client or the staff caused it. Pure.
 *
 * Nil returns (tax due 0) skip the client's approval: advance_filing() moves a nil
 * return from review straight to client_approved, so the step shows as not needed and
 * the return waits on the Owner.
 */
import type { IsoDate } from "@/lib/deadlines/dates";
import { addDays } from "@/lib/deadlines/dates";
import type { Risk, StepWho } from "@/lib/deadlines/safeguards";
import type { FilingStatus } from "./sign-off";

export type DueGroup = "overdue" | "this_week" | "later";

export const DUE_GROUP_LABELS: Record<DueGroup, string> = { overdue: "Overdue", this_week: "Due this week", later: "Later" };

const FILED: readonly FilingStatus[] = ["filed"];

/**
 * Overdue: the BIR date has passed and it is not filed. Due this week: due in the
 * next 7 days (today included), or past due but filed and not yet closed out.
 * Later: the rest. Each group keeps the input order.
 */
export function groupByDue<T extends { dueDate: IsoDate; status: FilingStatus }>(rows: readonly T[], today: IsoDate): Record<DueGroup, T[]> {
  const weekEnd = addDays(today, 6);
  const out: Record<DueGroup, T[]> = { overdue: [], this_week: [], later: [] };
  for (const r of rows) {
    if (r.dueDate < today && !FILED.includes(r.status)) out.overdue.push(r);
    else if (r.dueDate <= weekEnd) out.this_week.push(r);
    else out.later.push(r);
  }
  return out;
}

export const isNil = (taxDue: number | null | undefined) => taxDue != null && taxDue === 0;

export type StepState = "done" | "current" | "todo" | "skipped";

export const FIVE_STEPS = ["Prepared", "Reviewed", "Client approved", "Owner approved", "Filed & paid"] as const;

/** The five sign-off steps and where the return is on them. */
export function fiveSteps(status: FilingStatus, taxDue: number | null): { label: (typeof FIVE_STEPS)[number]; state: StepState }[] {
  const nil = isNil(taxDue);
  const done =
    status === "not_started" ? 0
    : status === "prepared" ? 1
    : status === "reviewed" ? 2
    : status === "client_approved" ? 3
    : status === "owner_approved" ? 4
    : 5;
  // A nil return past review has its client approval skipped (the Owner records it).
  const current = nil && done === 2 ? 3 : done;
  return FIVE_STEPS.map((label, i) => ({
    label,
    state: nil && i === 2 ? (done >= 2 ? "skipped" : "todo") : i < done ? "done" : i === current ? "current" : "todo",
  }));
}

/** How many of the five steps are done (a skipped step counts as done). */
export const stepsDone = (status: FilingStatus, taxDue: number | null) => fiveSteps(status, taxDue).filter((s) => s.state === "done" || s.state === "skipped").length;

export type WaitingOn = { who: StepWho; name: string | null };

/**
 * Who the return waits on: the person on its next step (the client for documents and
 * approval). A nil return waiting for the client's approval waits on the Owner.
 */
export function waitingOn(r: { status: FilingStatus; taxDue: number | null; risk: Pick<Risk, "next">; preparer: { name: string } | null; reviewer: { name: string } | null }): WaitingOn | null {
  const next = r.risk.next;
  if (!next) return null;
  let who: StepWho = next.who;
  if (next.key === "client_approved" && isNil(r.taxDue)) who = "owner";
  const name = who === "preparer" ? (r.preparer?.name ?? null) : who === "reviewer" ? (r.reviewer?.name ?? null) : null;
  return { who, name };
}

export function waitingOnText(w: WaitingOn | null): string {
  if (!w) return "—";
  if (w.who === "client") return "The client";
  if (w.who === "owner") return "Owner";
  return w.name ?? (w.who === "preparer" ? "No preparer" : "No reviewer");
}

export type CauseTag = { label: string; cause: "client" | "staff"; step: string };

/** The late-step tag: which step slipped first and whose it was, or null when nothing is late. */
export function causeTag(risk: Pick<Risk, "late" | "cause" | "state">): CauseTag | null {
  if (!risk.cause || risk.late.length === 0 || risk.state === "filed") return null;
  return { label: risk.cause === "client" ? "Client-caused" : "Staff-caused", cause: risk.cause, step: risk.late[0].label };
}
