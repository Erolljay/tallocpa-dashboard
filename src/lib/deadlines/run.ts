import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { sendBrandedEmail } from "@/lib/cycle/email";
import { loadEmailBrand } from "@/lib/email/brand";
import { settingsUrlFor } from "@/lib/email/layout";
import { ownerEmail, staffEmails, type Email } from "./morning";
import { loadBoard, loadCoverage } from "./safeguards-load";

/**
 * The 7:00 am morning email (docs/UX-REVIEW.md, D1): the Owner gets the critical
 * and overdue filings and the coverage gaps, each preparer and reviewer their own
 * filings at risk. Runs once per Manila day (deadline_digests).
 */
export async function runMorningEmail(admin: SupabaseClient, today: string, origin: string) {
  const { data: done } = await admin.from("deadline_digests").select("day").eq("day", today).maybeSingle();
  if (done) return { day: today, skipped: "already sent" };

  const [board, gaps, { data: staff }] = await Promise.all([
    loadBoard(admin, today),
    loadCoverage(admin, today),
    admin.from("staff_profiles").select("user_id, role").eq("active", true),
  ]);
  const emailOf = new Map<string, string>();
  for (const s of (staff ?? []) as { user_id: string; role: string }[]) {
    const { data: u } = await admin.auth.admin.getUserById(s.user_id);
    if (u.user?.email) emailOf.set(s.user_id, u.user.email);
  }
  const owners = ((staff ?? []) as { user_id: string; role: string }[]).filter((s) => s.role === "owner");
  const emails: Email[] = [
    ...owners.map((o) => (emailOf.has(o.user_id) ? ownerEmail(today, board, gaps, origin, emailOf.get(o.user_id)!) : null)).filter((e): e is Email => e != null),
    // The Owner's own filings are already in the Owner's email.
    ...staffEmails(today, board, new Map([...emailOf].filter(([id]) => !owners.some((o) => o.user_id === id))), origin),
  ];
  let sent = 0;
  const failed: string[] = [];
  const brand = emails.length ? await loadEmailBrand(null, admin) : undefined;
  const opts = { brand, footerNote: `you are on the ${brand?.displayName ?? "Tallo CPA"} team and get the 7:00 am deadlines email`, settingsUrl: settingsUrlFor(origin, "staff") };
  for (const e of emails) {
    // One rejected address must not stop the others' email.
    try {
      if ((await sendBrandedEmail([e.to], e, opts)) === "sent") sent += 1;
    } catch (err) {
      failed.push(`${e.to}: ${(err as Error).message}`);
    }
  }
  const critical = board.filter((r) => r.risk.state === "critical" || r.risk.state === "overdue").length;
  const atRisk = board.filter((r) => r.risk.state === "at_risk").length;
  await admin.from("deadline_digests").insert({ day: today, emails: emails.length, critical, at_risk: atRisk, gaps: gaps.length, emailed: sent === emails.length });
  return { day: today, emails: emails.length, sent, failed, critical, atRisk, gaps: gaps.length };
}
