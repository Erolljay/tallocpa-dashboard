import Link from "next/link";
import { Suspense } from "react";
import { Chip } from "@/components/base/badges/chip";
import { BirMailAlert } from "@/components/bir-mail/panels";
import { Card, LinkButton, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { delegationState, lastDay, type Delegation } from "@/lib/acting/period";
import { requireStaff } from "@/lib/auth";
import { addDays } from "@/lib/deadlines/dates";
import { showMonth } from "@/lib/documents/labels";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { currentClientStatuses } from "@/lib/clients/labels";
import { supabaseServer } from "@/lib/supabase/server";
import { loadBoard, loadCoverage } from "@/lib/deadlines/safeguards-load";
import { FilingTable, type FilingListRow } from "./deadlines/filing-table";
import { DashboardStats } from "./dashboard-stats";
import { OwnerSections } from "./owner-sections";
import { UnlockRequests } from "./unlock-requests";
import { keepBooksReady } from "@/lib/filings/books-ready";
import { catchUpOpenIds, withoutCatchUp } from "@/lib/filings/catch-up";
import { SectionTabs } from "@/app/(platform)/app/nav/section-tabs";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Home" description="What needs attention across your clients." />
      <SectionTabs section="home" active="overview" />
      <Suspense fallback={null}>
        <ActingNotice />
      </Suspense>
      <Suspense fallback={null}>
        <OwnerBirMail />
      </Suspense>
      <Suspense fallback={null}>
        <AmendmentNotice />
      </Suspense>
      <Suspense fallback={null}>
        <UnlockRequests />
      </Suspense>
      <Suspense fallback={null}>
        <SafeguardsNotice />
      </Suspense>
      <Suspense fallback={<Skeleton rows={6} />}>
        <Summary />
      </Suspense>
      <Suspense fallback={null}>
        <OwnerView />
      </Suspense>
    </>
  );
}

/**
 * Acting approver (Q58): the stand-in sees that they are acting; the Owner sees who is
 * acting and how many returns they approved in the last 7 days.
 */
async function ActingNotice() {
  const me = await requireStaff();
  if (me.staff.role === "staff") return null;
  const supabase = await supabaseServer();
  const query = supabase.from("acting_approver_delegations").select("id, delegate_user_id, starts_at, ends_at, max_tax_due, reason, ended_at").is("ended_at", null);
  const { data } = await (me.staff.role === "owner" ? query : query.eq("delegate_user_id", me.userId));
  const now = new Date();
  const active = ((data ?? []) as Delegation[]).find((d) => delegationState(d, now) === "active");
  if (me.staff.role === "reviewer") {
    if (!active) return null;
    return (
      <div className="mb-6">
        <Notice tone="waiting">
          You are the acting approver until the end of {showDate(lastDay(active.ends_at))}, for fully paid returns up to {peso.format(Number(active.max_tax_due))} tax due.{" "}
          <Link href="/app/review" className="font-medium underline">Open the final approvals</Link>
        </Notice>
      </div>
    );
  }
  const since = new Date(now.getTime() - 7 * 86_400_000).toISOString();
  const { count } = await supabase.from("filing_events").select("id", { count: "exact", head: true }).eq("action", "owner_approve").eq("data->>acting_approver", "true").gte("created_at", since);
  if (!active && !count) return null;
  const { data: who } = active ? await supabase.from("staff_profiles").select("full_name").eq("user_id", active.delegate_user_id).maybeSingle() : { data: null };
  return (
    <div className="mb-6">
      <Notice tone="waiting">
        {active ? `${who?.full_name ?? "A reviewer"} is acting approver until the end of ${showDate(lastDay(active.ends_at))}. ` : ""}
        {count ? `${count} return${count === 1 ? "" : "s"} approved by an acting approver in the last 7 days. ` : ""}
        <Link href="/app/settings/acting-approver" className="font-medium underline">Acting approver</Link>
      </Notice>
    </div>
  );
}

/** Urgent BIR notices the BIR Mail Clerk found, and BIR mail not linked yet: the Owner only. */
async function OwnerBirMail() {
  const me = await requireStaff();
  if (me.staff.role !== "owner") return null;
  return <BirMailAlert />;
}

/** Book amendments waiting for the Owner's approval (spec §4.3, Q30). */
async function AmendmentNotice() {
  const me = await requireStaff();
  if (me.staff.role !== "owner") return null;
  const supabase = await supabaseServer();
  const { data } = await supabase.from("ledger_amendments").select("id, client_id, clients!inner(name)").eq("status", "requested").in("clients.status", currentClientStatuses).order("requested_at").limit(20);
  const rows = (data ?? []) as unknown as { id: string; client_id: string; clients: { name: string } | null }[];
  if (!rows.length) return null;
  const clients = [...new Map(rows.map((r) => [r.client_id, r.clients?.name ?? "A client"])).entries()];
  return (
    <div className="mb-6">
      <Notice tone="waiting">
        {rows.length} book amendment{rows.length === 1 ? "" : "s"} waiting for your approval:{" "}
        {clients.map(([id, name], i) => (
          <span key={id}>
            {i > 0 && ", "}
            <Link href={`/app/clients/${id}/books`} className="font-medium underline">{name}</Link>
          </span>
        ))}
      </Notice>
    </div>
  );
}

/**
 * Deadline safeguards (docs/UX-REVIEW.md, D1): the Owner sees critical and overdue
 * filings and coverage gaps firm-wide; staff and reviewers see their own filings at risk.
 */
async function SafeguardsNotice() {
  const me = await requireStaff();
  const owner = me.staff.role === "owner";
  const supabase = await supabaseServer();
  const today = manilaToday();
  const [board, gaps] = await Promise.all([loadBoard(supabase, today, owner ? {} : { userId: me.userId }), owner ? loadCoverage(supabase, today) : Promise.resolve([])]);
  const urgent = board.filter((r) => r.risk.state === "overdue" || r.risk.state === "critical").length;
  const atRisk = board.filter((r) => r.risk.state === "at_risk").length;
  const parts = [
    urgent ? `${urgent} filing${urgent === 1 ? " is" : "s are"} critical or overdue` : null,
    !owner && atRisk ? `${atRisk} at risk` : null,
    owner && gaps.length ? `${gaps.length} coverage gap${gaps.length === 1 ? "" : "s"} (a client with a tax type, payroll or EWT but no obligation, or no preparer or reviewer)` : null,
  ].filter(Boolean);
  if (!parts.length) return null;
  return (
    <div className="mb-6">
      <Notice tone={urgent ? "blocked" : "waiting"}>
        {parts.join("; ")}. <Link href={owner ? "/app/deadlines?show=all" : "/app/deadlines"} className="font-medium underline">Open Deadlines</Link>
      </Notice>
    </div>
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

// Inner join so the counts below can leave out inactive and archived clients.
const select = "id, form, period_label, due_date, statutory_due_date, status, clients!inner(id, name, code)";

async function Summary() {
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const today = manilaToday();
  const in14 = addDays(today, 14);
  const [clients, overdue, next14, missed, exceptions, catchUp] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }).in("status", currentClientStatuses),
    supabase.from("filing_instances").select(select, { count: "exact" }).lt("due_date", today).not("status", "in", "(filed,paid,proof_uploaded)").in("clients.status", currentClientStatuses).order("due_date").limit(50),
    supabase.from("filing_instances").select(select, { count: "exact" }).gte("due_date", today).lte("due_date", in14).not("status", "in", "(filed,paid,proof_uploaded)").in("clients.status", currentClientStatuses).order("due_date").limit(100),
    // Months still open where the client sent nothing by the cutoff (spec §3.10, §3.11).
    supabase.from("document_cycles").select("client_id, period, cutoff_date, clients!inner(name)", { count: "exact" }).eq("missed_cutoff", true).in("clients.status", currentClientStatuses).is("closed_at", null).order("cutoff_date", { ascending: false }).limit(8),
    supabase.from("documents").select("id, clients!inner(status)", { count: "exact", head: true }).eq("exception_status", "open").in("clients.status", currentClientStatuses).neq("status", "split"),
    catchUpOpenIds(supabase),
  ]);
  // Returns of catch-up periods were filed outside the app: not overdue (migration 20270104000001).
  const lessCatchUp = (q: { data: unknown; count: number | null }) => {
    const before = (q.data ?? []) as FilingListRow[];
    const after = withoutCatchUp(before, catchUp);
    return { data: after, count: q.count == null ? null : Math.max(0, q.count - (before.length - after.length)) };
  };
  const overdueNow = lessCatchUp(overdue);
  const next14Now = lessCatchUp(next14);
  const missedRows = (missed.data ?? []) as unknown as { client_id: string; period: string; cutoff_date: string; clients: { name: string } | null }[];
  // Returns appear only for locked periods (docs/REWORK.md, decision 10); Filings lists the Books still open.
  const rows = await keepBooksReady([...overdueNow.data, ...next14Now.data], supabase);

  const n = (c: number | null) => c ?? 0;
  const flag = (c: number | null, bad: string, good: string) => (n(c) > 0 ? { delta: bad, deltaColor: "rose" as const } : { delta: good, deltaColor: "lime" as const });

  return (
    <div className="flex flex-col gap-6">
      <DashboardStats
        stats={[
          { icon: "clients", label: me.staff.role === "owner" ? "Active clients" : "My clients", value: String(n(clients.count)), delta: "Onboarding + active", deltaColor: "neutral" },
          { icon: "overdue", label: "Overdue filings", value: String(n(overdueNow.count)), ...flag(overdueNow.count, "Past due", "None") },
          { icon: "due", label: "Due in 14 days", value: String(n(next14Now.count)), delta: "Upcoming", deltaColor: "neutral" },
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
