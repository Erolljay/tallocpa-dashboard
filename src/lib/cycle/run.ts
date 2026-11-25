import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { sendEmail } from "./email";
import { cycleMessage, type NoticeKind } from "./messages";

interface Due {
  cycle_id: string;
  client_id: string;
  kind: NoticeKind;
  period: string;
  cutoff_date: string;
}

/**
 * The nightly monthly-cycle step (spec §3.10): opens, marks missed and closes cycles
 * in the database, then emails the day's document requests and reminders to each
 * client's portal users. A notice is marked sent once emailed; when email is not set
 * up it is marked anyway, since the portal shows the same request.
 */
export async function runDocumentCycles(admin: SupabaseClient, today: string, siteUrl: string) {
  const { data: counts, error } = await admin.rpc("run_document_cycles", { p_today: today });
  if (error) throw new Error(`Monthly cycle: ${error.message}`);

  const { data: due, error: dueError } = await admin.rpc("cycle_notices_due", { p_today: today });
  if (dueError) throw new Error(`Monthly cycle notices: ${dueError.message}`);
  const notices = (due ?? []) as Due[];

  const portalUrl = `${siteUrl.replace(/\/$/, "")}/portal/upload`;
  const emailCache = new Map<string, string | null>();
  const emailOf = async (userId: string) => {
    if (!emailCache.has(userId)) {
      const { data } = await admin.auth.admin.getUserById(userId);
      emailCache.set(userId, data.user?.email ?? null);
    }
    return emailCache.get(userId) ?? null;
  };

  let emailed = 0;
  const failures: string[] = [];
  for (const n of notices) {
    try {
      const [{ data: client }, { data: users }] = await Promise.all([
        admin.from("clients").select("name").eq("id", n.client_id).single(),
        admin.from("client_users").select("user_id").eq("client_id", n.client_id),
      ]);
      const to = (await Promise.all((users ?? []).map((u) => emailOf(u.user_id)))).filter((e): e is string => !!e);
      const m = cycleMessage(n.kind, { clientName: client?.name ?? "your business", period: n.period, cutoff: n.cutoff_date, portalUrl });
      if ((await sendEmail(to, m.subject, m.text)) === "sent") emailed += 1;
      const { error: markError } = await admin.rpc("mark_cycle_notice", { p_cycle: n.cycle_id, p_kind: n.kind });
      if (markError) throw new Error(markError.message);
    } catch (e) {
      failures.push(`${n.kind} ${n.client_id}: ${(e as Error).message}`);
    }
  }
  return { ...(counts as { opened: number; missed: number; closed: number }), notices: notices.length, emailed, failures };
}
