import { Suspense } from "react";
import { Card, LinkButton, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Deadlines, review queues and collections arrive here in the next releases." />
      <Suspense fallback={<Skeleton rows={2} />}>
        <Summary />
      </Suspense>
    </>
  );
}

async function Summary() {
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const [clients, obligations] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }).neq("status", "archived"),
    supabase.from("obligations").select("id", { count: "exact", head: true }).is("end_date", null),
  ]);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card title={me.staff.role === "owner" ? "Clients" : "My clients"}>
        <p className="font-display text-3xl font-bold tabular-nums text-ink-heading">{clients.count ?? 0}</p>
        <LinkButton href="/app/clients" variant="ghost" className="mt-2 -ml-4">View clients</LinkButton>
      </Card>
      <Card title="Filing obligations">
        <p className="font-display text-3xl font-bold tabular-nums text-ink-heading">{obligations.count ?? 0}</p>
        <p className="mt-2 text-sm text-ink-muted">Open BIR forms across your clients.</p>
      </Card>
    </div>
  );
}
