import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/cycle/email";
import { addDays } from "@/lib/deadlines/dates";
import { digestMessage, type DigestRow } from "./digest";

/**
 * Sends the Owner the digest for the Manila day before `today` (Q58). A day is recorded in
 * acting_digests once handled, so a rerun of the nightly job sends nothing twice.
 */
export async function runActingDigest(admin: SupabaseClient, today: string, origin: string) {
  const day = addDays(today, -1);
  const { data: done } = await admin.from("acting_digests").select("day").eq("day", day).maybeSingle();
  if (done) return { day, approvals: 0, skipped: "already sent" };
  const { data, error } = await admin.rpc("acting_approvals_on", { p_day: day });
  if (error) throw error;
  const rows = (data ?? []) as DigestRow[];
  if (rows.length === 0) return { day, approvals: 0 };

  const { data: owners } = await admin.from("staff_profiles").select("user_id").eq("role", "owner").eq("active", true);
  const to: string[] = [];
  for (const o of owners ?? []) {
    const { data: u } = await admin.auth.admin.getUserById(o.user_id);
    if (u.user?.email) to.push(u.user.email);
  }
  const m = digestMessage(day, rows, origin);
  const sent = (await sendEmail(to, m.subject, m.text)) === "sent";
  await admin.from("acting_digests").insert({ day, approvals: rows.length, emailed: sent });
  return { day, approvals: rows.length, emailed: sent };
}
