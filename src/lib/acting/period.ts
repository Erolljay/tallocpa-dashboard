/**
 * The acting approver's appointment (spec §3.8, Q58): who stands in for the Owner, from
 * when to when, and up to what tax due. Dates are Manila calendar days; an appointment
 * from 1 to 7 December runs from 1 December 00:00 to 8 December 00:00 Manila time.
 */
import { z } from "zod";
import { addDays } from "@/lib/deadlines/dates";

/** Start of a Manila calendar day (YYYY-MM-DD), as an ISO timestamp. */
export const manilaDayStart = (day: string) => `${day}T00:00:00+08:00`;

/** The Manila calendar day a timestamp falls on. */
export const manilaDay = (iso: string) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date(iso));

/** The last Manila day an appointment covers (its end is midnight of the next day). */
export const lastDay = (endsAt: string) => addDays(manilaDay(endsAt), -1);

export const appointmentSchema = z
  .object({
    delegate_user_id: z.uuid("Choose the reviewer."),
    from: z.iso.date("Enter the first day."),
    to: z.iso.date("Enter the last day."),
    max_tax_due: z.coerce.number("Enter the limit.").min(0, "Enter zero or more.").max(100_000_000).multipleOf(0.01, "Use at most two decimals."),
    reason: z.string().trim().min(3, "Say why (e.g. on leave 1–7 Dec).").max(200),
  })
  .refine((v) => v.to >= v.from, { path: ["to"], message: "The last day is before the first day." });

export type Appointment = z.infer<typeof appointmentSchema>;

/** The row to save for an appointment typed in the form. */
export function appointmentRow(a: Appointment) {
  return {
    delegate_user_id: a.delegate_user_id,
    starts_at: manilaDayStart(a.from),
    ends_at: manilaDayStart(addDays(a.to, 1)),
    max_tax_due: a.max_tax_due,
    reason: a.reason,
  };
}

export interface Delegation {
  id: string;
  delegate_user_id: string;
  starts_at: string;
  ends_at: string;
  max_tax_due: string | number;
  reason: string;
  ended_at: string | null;
}

export type DelegationState = "upcoming" | "active" | "ended";

export function delegationState(d: Pick<Delegation, "starts_at" | "ends_at" | "ended_at">, now = new Date()): DelegationState {
  if (d.ended_at || new Date(d.ends_at) <= now) return "ended";
  return new Date(d.starts_at) > now ? "upcoming" : "active";
}

/** The appointment in force now for this person, if any. */
export function activeFor(rows: readonly Delegation[], userId: string, now = new Date()): Delegation | null {
  return rows.find((d) => d.delegate_user_id === userId && delegationState(d, now) === "active") ?? null;
}
