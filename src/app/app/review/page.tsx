import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { showDate } from "@/lib/filings/labels";
import { reviewQueue, type QueueFiling } from "@/lib/filings/review-queue";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";

export default function ReviewPage() {
  return (
    <>
      <PageHeader title="Review" description="Returns waiting for a reviewer or for the final approval. Open one to act on it." />
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
  if (!owner && reviewerOf.size === 0 && me.staff.role !== "reviewer") redirect("/app");

  const { data } = await supabase
    .from("filing_instances")
    .select("id, client_id, form, period_label, due_date, status, tax_due, open_query, updated_at, clients(name, payment_mode)")
    .in("status", ["prepared", "reviewed", "client_approved"])
    .order("due_date")
    .limit(500);
  const filings = (data ?? []) as unknown as Omit<Row, "prepared_by">[];

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
  const q = reviewQueue(rows, { userId: me.userId, owner, reviewerOf });
  const today = manilaToday();

  return (
    <div className="space-y-6">
      {owner && (
        <Section title="Waiting for your final approval" hint="Client has approved. Check payment, then approve." rows={q.toApprove} today={today} nameOf={nameOf} empty="Nothing waiting for your approval." />
      )}
      <Section title="Ready for review" hint={owner ? "Prepared by staff. You or the client's reviewer can review or send back." : "Prepared by staff on your clients. You cannot review your own work."} rows={q.toReview} today={today} nameOf={nameOf} empty="Nothing to review." />
      <Section title="Waiting for the client" hint="Reviewed and with the client. A question from the client needs an answer from staff." rows={q.withClient} today={today} nameOf={nameOf} empty="Nothing with clients." />
    </div>
  );
}

function Section({ title, hint, rows, today, nameOf, empty }: { title: string; hint: string; rows: Row[]; today: string; nameOf: Map<string, string>; empty: string }) {
  return (
    <Card title={`${title} (${rows.length})`} actions={<span className="text-xs text-ink-subtle">{hint}</span>}>
      {rows.length === 0 ? (
        <p className="text-sm text-ink-muted">{empty}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-sm">
            <thead className="text-left text-ink-subtle">
              <tr>
                <th scope="col" className="pb-2 font-medium">Due</th>
                <th scope="col" className="pb-2 font-medium">Client</th>
                <th scope="col" className="pb-2 font-medium">Return</th>
                <th scope="col" className="pb-2 text-right font-medium">Tax due</th>
                <th scope="col" className="pb-2 font-medium">Prepared by</th>
                <th scope="col" className="pb-2 font-medium"><span className="sr-only">Notes</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const overdue = r.due_date < today;
                return (
                  <tr key={r.id} className="border-t border-border">
                    <td className={`py-2 pr-4 tabular-nums ${overdue ? "font-medium text-danger-text" : "text-ink-heading"}`}>{showDate(r.due_date)}</td>
                    <td className="py-2 pr-4 text-ink-heading">{r.clients?.name ?? "—"}</td>
                    <td className="py-2 pr-4">
                      <Link href={`/app/filings/${r.id}`} className="font-medium text-link hover:underline">{r.form} · {r.period_label}</Link>
                    </td>
                    <td className="amount py-2 pr-4 text-right tabular-nums text-ink-heading">{r.tax_due == null ? "—" : peso.format(Number(r.tax_due))}</td>
                    <td className="py-2 pr-4 text-ink-muted">{(r.prepared_by && nameOf.get(r.prepared_by)) ?? "—"}</td>
                    <td className="py-2 text-right">
                      {overdue && <Badge tone="blocked">Overdue</Badge>} {r.open_query && <Badge tone="waiting">Client question</Badge>}
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
