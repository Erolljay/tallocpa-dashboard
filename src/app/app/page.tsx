import Link from "next/link";
import { Suspense } from "react";
import { Card, LinkButton, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { addDays } from "@/lib/deadlines/dates";
import { showMonth } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { FilingTable, type FilingListRow } from "./deadlines/filing-table";
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

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title={me.staff.role === "owner" ? "Active clients" : "My clients"}>
          <p className="text-4xl leading-none font-semibold tracking-tight tabular-nums text-ink-heading">{clients.count ?? 0}</p>
          <LinkButton href="/app/clients" variant="ghost" className="mt-3 -ml-5">View clients</LinkButton>
        </Card>
        <Card title="Overdue">
          <p className={`text-4xl leading-none font-semibold tracking-tight tabular-nums ${(overdue.count ?? 0) > 0 ? "text-danger-text" : "text-ink-heading"}`}>{overdue.count ?? 0}</p>
          <p className="mt-2 text-sm text-ink-muted">Past due and not filed.</p>
        </Card>
        <Card title="Due in 14 days">
          <p className="text-4xl leading-none font-semibold tracking-tight tabular-nums text-ink-heading">{next14.count ?? 0}</p>
          <LinkButton href="/app/deadlines" variant="ghost" className="mt-3 -ml-5">All deadlines</LinkButton>
        </Card>
        <Card title="Missed the cutoff">
          <p className={`text-4xl leading-none font-semibold tracking-tight tabular-nums ${(missed.count ?? 0) > 0 ? "text-danger-text" : "text-ink-heading"}`}>{missed.count ?? 0}</p>
          {missedRows.length > 0 ? (
            <ul className="mt-2 space-y-0.5 text-sm text-ink-muted">
              {missedRows.map((r) => (
                <li key={`${r.client_id}-${r.period}`} className="truncate">
                  <Link href={`/app/cycle?month=${r.period.slice(0, 7)}`} className="hover:underline">{r.clients?.name ?? "—"}</Link>
                  <span className="text-ink-subtle"> · {showMonth(r.period)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-ink-muted">Every client sent their documents.</p>
          )}
          {(exceptions.count ?? 0) > 0 && (
            <p className="mt-2 text-sm text-warning">{exceptions.count} prior-year exception{exceptions.count === 1 ? "" : "s"} to decide</p>
          )}
          <LinkButton href="/app/cycle" variant="ghost" className="mt-3 -ml-5">Monthly cycle</LinkButton>
        </Card>
      </div>
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-ink-heading">Overdue and due in the next 14 days</h2>
        <FilingTable rows={rows} today={today} empty="Nothing due in the next 14 days." />
      </section>
    </div>
  );
}
