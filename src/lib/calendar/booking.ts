import "server-only";
/** Shared by the booking pages: free times of a staff member, and the holidays to skip. */
import { supabaseAdmin } from "@/lib/supabase/admin";
import { manilaDate, freeSlots, type Interval, type SlotRules } from "./slots";
import { busyOf, holidaysBetween } from "./staff";

/** The person's free slots from now, or null when their calendar is not connected. */
export async function slotsFor(userId: string, rules: SlotRules, now = new Date().toISOString()): Promise<{ slots: Interval[]; busy: Interval[]; holidays: Set<string> } | null> {
  const until = new Date(Date.parse(now) + (rules.days + 1) * 86_400_000).toISOString();
  const [busy, holidays] = await Promise.all([busyOf(userId, now, until), holidaysBetween(supabaseAdmin(), manilaDate(now), manilaDate(until))]);
  if (!busy) return null;
  return { slots: freeSlots(now, busy, holidays, rules), busy, holidays };
}
