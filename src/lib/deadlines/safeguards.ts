/**
 * Deadline safeguards (docs/UX-REVIEW.md, D1; Owner's decisions 4 and 5).
 *
 * A BIR date is rarely missed because nobody knew it: it is missed when a step
 * before it stalls. Each filing therefore gets steps with target dates counted
 * back from its due date in working days, and a status worked out from the steps
 * that are late:
 *
 *   1 Documents in        client      the client's document cutoff for the period's last month
 *   2 Prepared            preparer    4 working days before the BIR date
 *   3 Reviewed            reviewer    3 working days before
 *   4 Client approved     client      2 working days before
 *   5 Owner approved      owner       1 working day before
 *   6 Filed and paid      preparer    1 working day before (the internal target)
 *   7 Proof recorded      preparer    the BIR date
 *
 * For a 1601-C due Monday 12 April with a cutoff on the 5th this gives Apr 5, 6,
 * 7, 8, 9, 9 and 12 (decision 4). A target is never earlier than the step before it.
 *
 * A return covering more than one month (2550Q, 1601-EQ, 1701Q, 1702Q, 2551Q) is
 * prepared earlier (Owner's decision 24): by the 15th of the month it is due, then
 * reviewed, client approved and Owner approved one working day apart, and filed the
 * day the Owner approves. A 2550Q due Monday 26 April gives Apr 5, 15, 16, 19, 20,
 * 20 and 26. The monthly pattern still applies when it is earlier (an annual return
 * due on the 15th).
 *
 * Status: filed (proof recorded) · on track · at risk (one step late) · critical
 * (two steps late, or one working day or less left and not filed) · overdue
 * (the BIR date has passed and it is not filed). A late filing is client-caused
 * when the first step that slipped was the client's, else staff-caused.
 */
import { addDays, isWeekend, type IsoDate } from "./dates";
import type { FilingStatus } from "@/lib/filings/sign-off";

export type StepKey = "documents" | "prepared" | "reviewed" | "client_approved" | "owner_approved" | "filed" | "proof";
export type StepWho = "client" | "preparer" | "reviewer" | "owner";
export type RiskState = "filed" | "on_track" | "at_risk" | "critical" | "overdue";

export interface Step {
  key: StepKey;
  label: string;
  who: StepWho;
  target: IsoDate;
}

export const STEP_LABELS: Record<StepKey, string> = {
  documents: "Documents in",
  prepared: "Prepared",
  reviewed: "Reviewed",
  client_approved: "Client approved",
  owner_approved: "Owner approved, funds in",
  filed: "Filed and paid",
  proof: "Proof recorded, sent to client",
};

export const RISK_LABELS: Record<RiskState, string> = {
  filed: "Filed",
  on_track: "On track",
  at_risk: "At risk",
  critical: "Critical",
  overdue: "Overdue",
};

const WHO: Record<StepKey, StepWho> = {
  documents: "client",
  prepared: "preparer",
  reviewed: "reviewer",
  client_approved: "client",
  owner_approved: "owner",
  filed: "preparer",
  proof: "preparer",
};

const isWorkingDay = (d: IsoDate, holidays: ReadonlySet<IsoDate>) => !isWeekend(d) && !holidays.has(d);

/** The date `n` working days before (n > 0) or after (n < 0) `date`. */
export function workingDaysBefore(date: IsoDate, n: number, holidays: ReadonlySet<IsoDate>): IsoDate {
  let d = date;
  let left = Math.abs(n);
  const step = n >= 0 ? -1 : 1;
  while (left > 0) {
    d = addDays(d, step);
    if (isWorkingDay(d, holidays)) left -= 1;
  }
  return d;
}

/** Working days from `from` up to and including `to` (0 when `to` is not after `from`). */
export function workingDaysUntil(from: IsoDate, to: IsoDate, holidays: ReadonlySet<IsoDate>): number {
  let n = 0;
  for (let d = addDays(from, 1); d <= to; d = addDays(d, 1)) if (isWorkingDay(d, holidays)) n += 1;
  return n;
}

/** The client's document cutoff for a period: day `cutoffDay` of the month after the period ends. */
export function documentCutoff(periodEnd: IsoDate, cutoffDay: number): IsoDate {
  const y = Number(periodEnd.slice(0, 4));
  const m = Number(periodEnd.slice(5, 7));
  const ny = m === 12 ? y + 1 : y;
  const nm = m === 12 ? 1 : m + 1;
  return `${ny}-${String(nm).padStart(2, "0")}-${String(Math.min(cutoffDay, 28)).padStart(2, "0")}`;
}

/** The filing's steps and their target dates. */
export function stepsFor(opts: { dueDate: IsoDate; periodEnd: IsoDate; periodStart?: IsoDate; cutoffDay: number; holidays: ReadonlySet<IsoDate> }): Step[] {
  const { dueDate, holidays } = opts;
  const docs = documentCutoff(opts.periodEnd, opts.cutoffDay);
  const monthly: IsoDate[] = [4, 3, 2, 1, 1].map((n) => workingDaysBefore(dueDate, n, holidays));
  let middle = monthly;
  if (opts.periodStart && opts.periodStart.slice(0, 7) !== opts.periodEnd.slice(0, 7)) {
    // Prepared by the 15th of the due month (the working day before when it is not one).
    let prep: IsoDate = `${dueDate.slice(0, 7)}-15`;
    if (!isWorkingDay(prep, holidays)) prep = workingDaysBefore(prep, 1, holidays);
    const early = [0, 1, 2, 3, 3].map((n) => (n === 0 ? prep : workingDaysBefore(prep, -n, holidays)));
    middle = monthly.map((m, i) => (early[i] < m ? early[i] : m));
  }
  const raw: [StepKey, IsoDate][] = [
    ["documents", docs],
    ["prepared", middle[0]],
    ["reviewed", middle[1]],
    ["client_approved", middle[2]],
    ["owner_approved", middle[3]],
    ["filed", middle[4]],
    ["proof", dueDate],
  ];
  // Never earlier than the step before (a short window after the cutoff squeezes them together),
  // and the steps after the documents start the working day after the cutoff at the earliest.
  const out: Step[] = [];
  let floor = "";
  raw.forEach(([key, target], i) => {
    let t = target < floor ? floor : target;
    if (i === 1 && t <= docs) t = docs < dueDate ? workingDaysBefore(docs, -1, holidays) : docs;
    if (t > dueDate) t = dueDate;
    out.push({ key, label: STEP_LABELS[key], who: WHO[key], target: t });
    floor = t;
  });
  return out;
}

const DONE_FROM_STATUS: Record<FilingStatus, number> = {
  // How many of steps 2–7 the filing status has completed. Filed & paid carries its
  // scanned copy (decision 14), so it completes the proof step too.
  not_started: 0,
  prepared: 1,
  reviewed: 2,
  client_approved: 3,
  owner_approved: 4,
  filed: 6,
};

export interface Risk {
  state: RiskState;
  /** Steps completed, in order. */
  done: number;
  /** The next step to do, if any. */
  next: Step | null;
  /** Steps past their target and not done. */
  late: Step[];
  /** Who the lateness is on, from the first step that slipped. */
  cause: "client" | "staff" | null;
  /** Working days left before the BIR date. */
  daysLeft: number;
}

/**
 * The filing's status today. `documentsIn` says whether the client's documents
 * for the period are in (confirmed, nothing to submit, or the month closed);
 * a filing already prepared counts its documents as in.
 */
export function riskOf(opts: { steps: Step[]; status: FilingStatus; documentsIn: boolean; today: IsoDate; holidays: ReadonlySet<IsoDate> }): Risk {
  const { steps, status, today, holidays } = opts;
  const fromStatus = DONE_FROM_STATUS[status];
  const done = fromStatus > 0 || opts.documentsIn ? 1 + fromStatus : 0;
  const due = steps[steps.length - 1].target;
  const daysLeft = workingDaysUntil(today, due, holidays);
  const next = steps[done] ?? null;
  const late = steps.slice(done).filter((s) => s.target < today);
  const filed = fromStatus >= 5;
  const cause = late.length ? (late[0].who === "client" ? "client" : "staff") : null;
  let state: RiskState;
  if (done >= steps.length) state = "filed";
  else if (!filed && today > due) state = "overdue";
  else if (late.length >= 2 || (!filed && daysLeft <= 1 && today >= steps[5].target)) state = "critical";
  else if (late.length === 1) state = "at_risk";
  else state = "on_track";
  return { state, done, next, late, cause, daysLeft };
}

/** Order for lists: worst first, then by due date. */
export const RISK_ORDER: Record<RiskState, number> = { overdue: 0, critical: 1, at_risk: 2, on_track: 3, filed: 4 };
