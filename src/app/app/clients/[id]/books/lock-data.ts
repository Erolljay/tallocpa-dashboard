import "server-only";
/**
 * What the month lock controls need for one client: the year's month statuses, who
 * the viewer is to the client (preparer, reviewer, Owner, acting approver) and the
 * names of the people on the locks and requests.
 */
import { booksMonthStatus } from "@/lib/books/actions";
import { activeFor, type Delegation } from "@/lib/acting/period";
import { requireStaff } from "@/lib/auth";
import type { LockMonth, LockViewer } from "@/lib/lock/month-lock";
import { supabaseServer } from "@/lib/supabase/server";

export interface LockContext {
  months: LockMonth[];
  viewer: LockViewer;
  reviewerName: string | null;
  names: Record<string, string>;
}

export async function loadLockContext(clientId: string, year: number): Promise<LockContext> {
  const me = await requireStaff();
  const owner = me.staff.role === "owner";
  const supabase = await supabaseServer();
  const [months, { data: team }, { data: people }, { data: delegations }] = await Promise.all([
    booksMonthStatus(clientId, year),
    supabase.from("staff_assignments").select("user_id, role").eq("client_id", clientId),
    supabase.from("staff_profiles").select("user_id, full_name"),
    owner
      ? Promise.resolve({ data: [] as Delegation[] })
      : supabase.from("acting_approver_delegations").select("id, delegate_user_id, starts_at, ends_at, max_tax_due, reason, ended_at").eq("delegate_user_id", me.userId).is("ended_at", null),
  ]);
  const names = Object.fromEntries(((people ?? []) as { user_id: string; full_name: string }[]).map((p) => [p.user_id, p.full_name]));
  const mine = ((team ?? []) as { user_id: string; role: string }[]).filter((t) => t.user_id === me.userId);
  const reviewer = ((team ?? []) as { user_id: string; role: string }[]).find((t) => t.role === "reviewer");
  return {
    months: months as LockMonth[],
    viewer: {
      userId: me.userId,
      owner,
      preparer: mine.some((t) => t.role === "preparer"),
      reviewer: mine.some((t) => t.role === "reviewer"),
      acting: activeFor((delegations ?? []) as Delegation[], me.userId) != null,
    },
    reviewerName: reviewer ? (names[reviewer.user_id] ?? null) : null,
    names,
  };
}
