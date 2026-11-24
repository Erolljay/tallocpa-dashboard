import Link from "next/link";
import { Suspense } from "react";
import { Chip } from "@/components/base/badges/chip";
import { Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { addDays } from "@/lib/deadlines/dates";
import { showMonth } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { FilingTable, type FilingListRow } from "./deadlines/filing-table";
import { DashboardStats } from "./dashboard-stats";
import { OwnerSections } from "./owner-sections";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="What needs attention across your clients." />
      <Suspense fallback={<Skeleton rows={6} />}>
        <Summary />
      </Suspense>
      <Suspense fallback={null}>
        <OwnerView />
      </Suspense>
    </>
  );
}

/** The Owner's firm-wide figures (spec §3.11); nothing for staff and reviewers. */
async function OwnerView() {
  const me = await requireStaff();
  if (me.staff.role !== "owner") return null;
  return (
    <Suspense fallback={<div className="mt-6"><Skeleton rows={6} /></div>}>
      <OwnerSections />
    </Suspense>
  );
}

const select = "id, form, period_label, due_date, statutory_due_date, status, clients(id, name, code)";

async function Summary() {
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const today = manilaToday();
  const in14 = addDays(today, 14);
  const [clients, overdue, next14, missed, exceptions] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }).in("status", ["onboarding", "active"]),
    supabase.from("filing_instances").select(select, { count: "exact" }).lt("due_date", today).not("status", "in", "(filed,paid,proof_uploaded)").order("due_date").limit(50),
    supabase.from("filing_instances").select(select, { count: "exact" }).gte("due_date", today).lte("due_date", in14).not("status", "in", "(filed,paid,proof_uploaded)").order("due_date").limit(100),
    // Months still open where the client sent nothing by the cutoff (spec §3.10, §3.11).
    supabase.from("document_cycles").select("client_id, period, cutoff_date, clients(name)", { count: "exact" }).eq("missed_cutoff", true).is("closed_at", null).order("cutoff_date", { ascending: false }).limit(8),
    supabase.from("documents").select("id", { count: "exact", head: true }).eq("exception_status", "open"),
  ]);
  const missedRows = (missed.data ?? []) as unknown as { client_id: string; period: string; cutoff_date: string; clients: { name: string } | null }[];
  const rows = [...((overdue.data ?? []) as unknown as FilingListRow[]), ...((next14.data ?? []) as unknown as FilingListRow[])];

  const n = (c: number | null) => c ?? 0;
  const flag = (c: number | null, bad: string, good: string) => (n(c) > 0 ? { delta: bad, deltaColor: "rose" as const } : { delta: good, deltaColor: "lime" as const });

  return (
    <div className="flex flex-col gap-6">
      <DashboardStats
        stats={[
          { icon: "clients", label: me.staff.role === "owner" ? "Active clients" : "My clients", value: String(n(clients.count)), delta: "Onboarding + active", deltaColor: "neutral" },
          { icon: "overdue", label: "Overdue filings", value: String(n(overdue.count)), ...flag(overdue.count, "Past due", "None") },
          { icon: "due", label: "Due in 14 days", value: String(n(next14.count)), delta: "Upcoming", deltaColor: "neutral" },
          { icon: "missed", label: "Missed the cutoff", value: String(n(missed.count)), ...flag(missed.count, "Follow up", "All in") },
        ]}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Missed the document cutoff" className="lg:col-span-2" actions={<LinkButton href="/app/cycle" variant="secondary" size="sm">Monthly cycle</LinkButton>}>
          {missedRows.length > 0 ? (
            <ul className="flex flex-col divide-y divide-separator-border">
              {missedRows.map((r) => (
                <li key={`${r.client_id}-${r.period}`} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <Link href={`/app/cycle?month=${r.period.slice(0, 7)}`} className="truncate text-body-medium text-text-primary hover:underline">{r.clients?.name ?? "—"}</Link>
                  <Chip variant="caption" color="rose">{showMonth(r.period)}</Chip>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-body-regular text-text-secondary">Every client sent their documents.</p>
          )}
          {n(exceptions.count) > 0 && (
            <div className="mt-4">
              <Notice tone="waiting">{exceptions.count} prior-year exception{exceptions.count === 1 ? "" : "s"} to decide.</Notice>
            </div>
          )}
        </Card>
        <Card title="Shortcuts">
          <div className="flex flex-col gap-2">
            <LinkButton href="/app/clients" variant="secondary" className="justify-start">View clients</LinkButton>
            <LinkButton href="/app/deadlines" variant="secondary" className="justify-start">All deadlines</LinkButton>
            <LinkButton href="/app/documents" variant="secondary" className="justify-start">Documents inbox</LinkButton>
          </div>
        </Card>
      </div>
      <section>
        <h2 className="mb-3 text-title-2-medium text-text-primary">Overdue and due in the next 14 days</h2>
        <FilingTable rows={rows} today={today} empty="Nothing due in the next 14 days." />
      </section>
    </div>
  );
}
