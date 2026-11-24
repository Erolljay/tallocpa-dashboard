import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import type { Branch } from "@/lib/branches";
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
  const [{ data: staff }, { data: assignments }, { data: engagements }, { data: branchRows }] = await Promise.all([
    supabase.from("staff_profiles").select("user_id, full_name, role, capacity_points, active, branch_id").order("full_name"),
    supabase.from("staff_assignments").select("user_id, client_id, role"),
    supabase.from("engagements").select("client_id, monthly_retainer, status"),
    supabase.from("branches").select("id, code, name, address, active").order("name"),
  ]);
  const branches = (branchRows ?? []) as Branch[];
  const branchName = new Map(branches.map((b) => [b.id, b.name]));
  // With more than one branch, list people by branch; the Owner stays on top.
  const multi = branches.length > 1;
  const people = [...(staff ?? [])].sort((a, b) =>
    a.role === "owner" ? -1 : b.role === "owner" ? 1 : multi ? (branchName.get(a.branch_id ?? "") ?? "").localeCompare(branchName.get(b.branch_id ?? "") ?? "") || a.full_name.localeCompare(b.full_name) : 0,
  );
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
        <p className="mb-4 text-body-regular text-text-secondary">
          They sign in with this email using Google or an emailed link. No password or invite email is needed.
        </p>
        <InviteStaffForm branches={branches} />
      </Card>
      <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
        <table className="w-full min-w-[56rem] text-body-regular">
          <thead className="border-b border-separator-border bg-background-secondary-default text-start text-body-medium text-text-tertiary">
            <tr>
              <th scope="col" className="text-start px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3 text-end">Clients</th>
              <th scope="col" className="text-start px-4 py-3">Load</th>
              <th scope="col" className="text-start px-4 py-3">Role, branch, capacity, status</th>
            </tr>
          </thead>
          <tbody>
            {people.map((s) => {
              const mine = (assignments ?? []).filter((a) => a.user_id === s.user_id && a.role === "preparer").map((a) => a.client_id);
              const load = loadPoints(mine.map((c) => retainerByClient.get(c) ?? 0));
              const capacity = Number(s.capacity_points);
              const pct = capacity > 0 ? Math.round((load / capacity) * 100) : 0;
              const tone = pct > 100 ? "blocked" : pct >= 85 ? "waiting" : "done";
              const info = emailOf.get(s.user_id);
              return (
                <tr key={s.user_id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover align-middle">
                  <td className="px-4 py-3">
                    <p className="font-medium text-text-primary">{s.full_name}{!s.active && <span className="ml-2"><Badge>Inactive</Badge></span>}</p>
                    <p className="text-caption-1-regular text-text-tertiary">
                      {s.role === "owner" ? "All branches" : (branchName.get(s.branch_id ?? "") ?? "No branch")} · {info?.email ?? "—"}{info && !info.last_sign_in_at ? " · has not signed in yet" : ""}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-end tabular-nums text-text-primary">{s.role === "owner" ? "All" : mine.length}</td>
                  <td className="px-4 py-3">
                    {s.role === "owner" ? <span className="text-text-tertiary">—</span> : (
                      <div className="flex items-center gap-2">
                        <span className="tabular-nums text-text-primary">{load} / {capacity}</span>
                        <Badge tone={tone}>{pct}%</Badge>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {s.role !== "owner" ? (
                      <StaffRowForm userId={s.user_id} role={s.role} capacity={capacity} active={s.active} branchId={s.branch_id} branches={branches} />
                    ) : (
                      <span className="text-text-secondary">{roleLabel[s.role]}</span>
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
