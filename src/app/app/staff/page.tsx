import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { loadPoints } from "@/lib/people/schema";
import { supabaseServer } from "@/lib/supabase/server";
import { InviteStaffForm, StaffRowForm } from "./forms";

export default function StaffPage() {
  return (
    <>
      <PageHeader title="Staff" description="Who works on which clients, and how full each person's load is. Load points = monthly retainers ÷ ₱1,000." />
      <Suspense fallback={<Skeleton rows={5} />}>
        <StaffList />
      </Suspense>
    </>
  );
}

const roleLabel: Record<string, string> = { owner: "Owner", reviewer: "Reviewer", staff: "Staff" };

async function StaffList() {
  // The Staff page is the Owner's: staff and reviewers are sent back to the Dashboard.
  await requireOwner();
  const supabase = await supabaseServer();
  const [{ data: staff }, { data: assignments }, { data: engagements }] = await Promise.all([
    supabase.from("staff_profiles").select("user_id, full_name, role, capacity_points, active").order("full_name"),
    supabase.from("staff_assignments").select("user_id, client_id, role"),
    supabase.from("engagements").select("client_id, monthly_retainer, status"),
  ]);
  const ids = (staff ?? []).map((s) => s.user_id);
  const { data: emails } = ids.length ? await supabase.rpc("user_emails", { p_user_ids: ids }) : { data: [] };
  const emailOf = new Map(((emails ?? []) as { user_id: string; email: string; last_sign_in_at: string | null }[]).map((e) => [e.user_id, e]));

  const retainerByClient = new Map<string, number>();
  for (const e of engagements ?? []) {
    if (e.status === "active") retainerByClient.set(e.client_id, (retainerByClient.get(e.client_id) ?? 0) + Number(e.monthly_retainer));
  }

  return (
    <div className="space-y-6">
      <Card title="Add a staff member">
        <p className="mb-4 text-sm text-ink-muted">
          They sign in with this email using Google or an emailed link. No password or invite email is needed.
        </p>
        <InviteStaffForm />
      </Card>
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full min-w-[48rem] text-sm">
          <thead className="border-b border-border bg-surface-muted text-left text-xs text-ink-muted">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Name</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Clients</th>
              <th scope="col" className="px-4 py-3 font-medium">Load</th>
              <th scope="col" className="px-4 py-3 font-medium">Role, capacity, status</th>
            </tr>
          </thead>
          <tbody>
            {(staff ?? []).map((s) => {
              const mine = (assignments ?? []).filter((a) => a.user_id === s.user_id && a.role === "preparer").map((a) => a.client_id);
              const load = loadPoints(mine.map((c) => retainerByClient.get(c) ?? 0));
              const capacity = Number(s.capacity_points);
              const pct = capacity > 0 ? Math.round((load / capacity) * 100) : 0;
              const tone = pct > 100 ? "blocked" : pct >= 85 ? "waiting" : "done";
              const info = emailOf.get(s.user_id);
              return (
                <tr key={s.user_id} className="border-t border-border align-middle">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink-heading">{s.full_name}{!s.active && <span className="ml-2"><Badge>Inactive</Badge></span>}</p>
                    <p className="text-xs text-ink-subtle">{info?.email ?? "—"}{info && !info.last_sign_in_at ? " · has not signed in yet" : ""}</p>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink-heading">{s.role === "owner" ? "All" : mine.length}</td>
                  <td className="px-4 py-3">
                    {s.role === "owner" ? <span className="text-ink-subtle">—</span> : (
                      <div className="flex items-center gap-2">
                        <span className="tabular-nums text-ink-heading">{load} / {capacity}</span>
                        <Badge tone={tone}>{pct}%</Badge>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {s.role !== "owner" ? (
                      <StaffRowForm userId={s.user_id} role={s.role} capacity={capacity} active={s.active} />
                    ) : (
                      <span className="text-ink-muted">{roleLabel[s.role]}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
