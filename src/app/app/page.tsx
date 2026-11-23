import { Suspense } from "react";
import { Card, LinkButton, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { addDays } from "@/lib/deadlines/dates";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { FilingTable, type FilingListRow } from "./deadlines/filing-table";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="What needs attention across your clients." />
      <Suspense fallback={<Skeleton rows={6} />}>
        <Summary />
      </Suspense>
    </>
  );
}

const select = "id, form, period_label, due_date, statutory_due_date, status, clients(id, name, code)";

async function Summary() {
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const today = manilaToday();
  const in14 = addDays(today, 14);
  const [clients, overdue, next14] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }).in("status", ["onboarding", "active"]),
    supabase.from("filing_instances").select(select, { count: "exact" }).lt("due_date", today).not("status", "in", "(filed,paid,proof_uploaded)").order("due_date").limit(50),
    supabase.from("filing_instances").select(select, { count: "exact" }).gte("due_date", today).lte("due_date", in14).not("status", "in", "(filed,paid,proof_uploaded)").order("due_date").limit(100),
  ]);
  const rows = [...((overdue.data ?? []) as unknown as FilingListRow[]), ...((next14.data ?? []) as unknown as FilingListRow[])];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card title={me.staff.role === "owner" ? "Active clients" : "My clients"}>
          <p className="font-display text-3xl font-bold tabular-nums text-ink-heading">{clients.count ?? 0}</p>
          <LinkButton href="/app/clients" variant="ghost" className="mt-2 -ml-4">View clients</LinkButton>
        </Card>
        <Card title="Overdue">
          <p className={`font-display text-3xl font-bold tabular-nums ${(overdue.count ?? 0) > 0 ? "text-danger-text" : "text-ink-heading"}`}>{overdue.count ?? 0}</p>
          <p className="mt-2 text-sm text-ink-muted">Past due and not filed.</p>
        </Card>
        <Card title="Due in 14 days">
          <p className="font-display text-3xl font-bold tabular-nums text-ink-heading">{next14.count ?? 0}</p>
          <LinkButton href="/app/deadlines" variant="ghost" className="mt-2 -ml-4">All deadlines</LinkButton>
        </Card>
      </div>
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-ink-heading">Overdue and due in the next 14 days</h2>
        <FilingTable rows={rows} today={today} empty="Nothing due in the next 14 days." />
      </section>
    </div>
  );
}
