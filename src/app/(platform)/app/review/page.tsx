import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { activeFor, lastDay, type Delegation } from "@/lib/acting/period";
import { requireStaff } from "@/lib/auth";
import { showDate } from "@/lib/filings/labels";
import { keepBooksReady } from "@/lib/filings/books-ready";
import { filingsNeedingAmendment } from "@/lib/books/actions";
import { reviewQueue, type QueueFiling } from "@/lib/filings/review-queue";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { FilingsTabs } from "@/app/(platform)/app/nav/section-tabs";

export default function ReviewPage() {
  return (
    <>
      <PageHeader title="Review" description="Returns waiting for a reviewer or for the final approval. Open one to act on it." />
      <FilingsTabs active="review" />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Queue />
      </Suspense>
    </>
  );
}

interface Row extends QueueFiling {
  form: string;
  period_label: string;
  tax_due: string | null;
  updated_at: string;
  clients: { name: string; payment_mode: string } | null;
}

async function Queue() {
  const me = await requireStaff();
  const owner = me.staff.role === "owner";
  const supabase = await supabaseServer();
  const { data: assignments } = await supabase.from("staff_assignments").select("client_id").eq("user_id", me.userId).eq("role", "reviewer");
  const reviewerOf = new Set((assignments ?? []).map((a) => a.client_id));
  const { data: delegations } = owner
    ? { data: [] as Delegation[] }
    : await supabase.from("acting_approver_delegations").select("id, delegate_user_id, starts_at, ends_at, max_tax_due, reason, ended_at").eq("delegate_user_id", me.userId).is("ended_at", null);
  const acting = activeFor((delegations ?? []) as Delegation[], me.userId);
  const limit = acting ? Number(acting.max_tax_due) : null;
  if (!owner && reviewerOf.size === 0 && me.staff.role !== "reviewer") redirect("/app");

  const { data } = await supabase
    .from("filing_instances")
    .select("id, client_id, form, period_label, due_date, status, tax_due, open_query, updated_at, clients(name, payment_mode)")
    .in("status", ["prepared", "reviewed", "client_approved"])
    .order("due_date")
    .limit(500);
  // Returns appear only for locked periods (docs/REWORK.md, decision 10).
  const filings = await keepBooksReady((data ?? []) as unknown as Omit<Row, "prepared_by">[], supabase);
  const flagOf = new Map((await filingsNeedingAmendment()).map((f) => [f.filing_id, f.reason]));

  const ids = filings.map((f) => f.id);
  const [{ data: events }, { data: staff }] = await Promise.all([
    ids.length
      ? supabase.from("filing_events").select("filing_instance_id, actor, created_at").eq("action", "prepare").in("filing_instance_id", ids).order("created_at")
      : Promise.resolve({ data: [] as { filing_instance_id: string; actor: string | null; created_at: string }[] }),
    supabase.from("staff_profiles").select("user_id, full_name"),
  ]);
  const preparedBy = new Map<string, string | null>();
  for (const e of events ?? []) preparedBy.set(e.filing_instance_id, e.actor);
  const nameOf = new Map((staff ?? []).map((s) => [s.user_id, s.full_name]));

  const rows: Row[] = filings.map((f) => ({ ...f, prepared_by: preparedBy.get(f.id) ?? null }));
  const q = reviewQueue(rows, { userId: me.userId, owner, reviewerOf, acting: acting != null });
  // What the acting approver must leave for the Owner (the database also checks payment).
  const leaveForOwner = (r: Row) =>
    limit == null ? null : Number(r.tax_due ?? 0) > limit ? "Over your limit" : r.prepared_by === me.userId ? "Your own work" : null;
  const today = manilaToday();
  // Catch-up returns recorded by staff, waiting for the reviewer's confirmation (migration 20270104000001).
  const { data: catchUpRows } = await supabase.rpc("catch_up_waiting");
  const catchUp = ((catchUpRows ?? []) as CatchUpRow[]).filter((r) => owner || reviewerOf.has(r.client_id));

  return (
    <div className="space-y-6">
      {owner && (
        <Section title="Waiting for your final approval" hint="Client has approved. Check payment, then approve." rows={q.toApprove} today={today} nameOf={nameOf} amended={flagOf} empty="Nothing waiting for your approval." />
      )}
      {acting && limit != null && (
        <>
          <Notice tone="waiting">
            You are the acting approver until the end of {showDate(lastDay(acting.ends_at))}. You can give the final approval on fully paid returns up to {peso.format(limit)} tax due. The rest waits for the Owner.
          </Notice>
          <Section title="Waiting for the final approval" hint="You approve for the Owner. Check payment first." rows={q.toApprove} today={today} nameOf={nameOf} amended={flagOf} empty="Nothing waiting for the final approval." flag={leaveForOwner} />
        </>
      )}
      {catchUp.length > 0 && <CatchUpSection rows={catchUp} nameOf={nameOf} me={me.userId} owner={owner} />}
      <Section title="Ready for review" hint={owner ? "Prepared by staff. You or the client's reviewer can review or send back." : "Prepared by staff on your clients. You cannot review your own work."} rows={q.toReview} today={today} nameOf={nameOf} amended={flagOf} empty="Nothing to review." />
      <Section title="Waiting for the client" hint="Reviewed and with the client. A question from the client needs an answer from staff." rows={q.withClient} today={today} nameOf={nameOf} amended={flagOf} empty="Nothing with clients." />
    </div>
  );
}

function Section({ title, hint, rows, today, nameOf, amended, empty, flag }: { title: string; hint: string; rows: Row[]; today: string; nameOf: Map<string, string>; amended: Map<string, string>; empty: string; flag?: (r: Row) => string | null }) {
  return (
    <Card title={`${title} (${rows.length})`} actions={<span className="text-caption-1-regular text-text-tertiary">{hint}</span>}>
      {rows.length === 0 ? (
        <p className="text-body-regular text-text-secondary">{empty}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-body-regular">
            <thead className="text-start text-body-medium text-text-tertiary">
              <tr>
                <th scope="col" className="text-start pb-2">Due</th>
                <th scope="col" className="text-start pb-2">Client</th>
                <th scope="col" className="text-start pb-2">Return</th>
                <th scope="col" className="pb-2 text-end">Tax due</th>
                <th scope="col" className="text-start pb-2">Prepared by</th>
                <th scope="col" className="text-start pb-2"><span className="sr-only">Notes</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const overdue = r.due_date < today;
                return (
                  <tr key={r.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                    <td className={`py-2 pr-4 tabular-nums ${overdue ? "font-medium text-text-error-primary" : "text-text-primary"}`}>{showDate(r.due_date)}</td>
                    <td className="py-2 pr-4 text-text-primary">{r.clients?.name ?? "—"}</td>
                    <td className="py-2 pr-4">
                      <Link href={`/app/filings/${r.id}`} className="font-medium text-button-ghost-foreground hover:underline">{r.form} · {r.period_label}</Link>
                    </td>
                    <td className="amount py-2 pr-4 text-end tabular-nums text-text-primary">{r.tax_due == null ? "—" : peso.format(Number(r.tax_due))}</td>
                    <td className="py-2 pr-4 text-text-secondary">{(r.prepared_by && nameOf.get(r.prepared_by)) ?? "—"}</td>
                    <td className="py-2 text-end">
                      {overdue && <Badge tone="blocked">Overdue</Badge>} {amended.has(r.id) && <Badge tone="blocked">Needs amended return</Badge>} {r.open_query && <Badge tone="waiting">Client question</Badge>}{" "}
                      {flag?.(r) && <Badge>{`${flag(r)}: waits for the Owner`}</Badge>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

interface CatchUpRow {
  filing_id: string;
  client_id: string;
  client_name: string;
  form: string;
  period_label: string;
  tax_due: string | null;
  filed_on: string | null;
  recorded_by: string | null;
}

function CatchUpSection({ rows, nameOf, me, owner }: { rows: CatchUpRow[]; nameOf: Map<string, string>; me: string; owner: boolean }) {
  return (
    <Card title={`Catch-up returns to confirm (${rows.length})`} actions={<span className="text-caption-1-regular text-text-tertiary">Filed outside the app. Check each against the BIR copy.</span>}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] text-body-regular">
          <thead className="text-start text-body-medium text-text-tertiary">
            <tr>
              <th scope="col" className="text-start pb-2">Client</th>
              <th scope="col" className="text-start pb-2">Return</th>
              <th scope="col" className="pb-2 text-end">Tax due</th>
              <th scope="col" className="text-start pb-2">Filed on</th>
              <th scope="col" className="text-start pb-2">Recorded by</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.filing_id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                <td className="py-2 pr-4 text-text-primary">{r.client_name}</td>
                <td className="py-2 pr-4">
                  <Link href={`/app/filings/${r.filing_id}`} className="font-medium text-button-ghost-foreground hover:underline">{r.form} · {r.period_label}</Link>
                </td>
                <td className="amount py-2 pr-4 text-end tabular-nums text-text-primary">{r.tax_due == null ? "—" : peso.format(Number(r.tax_due))}</td>
                <td className="py-2 pr-4 tabular-nums text-text-primary">{r.filed_on ? showDate(r.filed_on) : "—"}</td>
                <td className="py-2 text-text-secondary">
                  {(r.recorded_by && nameOf.get(r.recorded_by)) ?? "—"} {!owner && r.recorded_by === me && <Badge>Your own: another person confirms</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
