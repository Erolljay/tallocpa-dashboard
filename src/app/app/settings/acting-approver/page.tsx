import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, PageHeader, peso, Skeleton } from "@/components/ui";
import { delegationState, lastDay, manilaDay, manilaDayStart, type Delegation } from "@/lib/acting/period";
import { addDays } from "@/lib/deadlines/dates";
import { requireOwner } from "@/lib/auth";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { AppointForm, EndButton } from "./forms";

export default function ActingApproverPage() {
  return (
    <>
      <p className="mb-3 text-body-regular">
        <Link href="/app/settings" className="text-button-ghost-foreground hover:underline">Settings</Link>
      </p>
      <PageHeader
        title="Acting approver"
        description="While you are away, a Reviewer you name gives the final approval on returns, up to a limit on the tax due. Unpaid returns, returns over the limit and returns they prepared still wait for you. You get a daily digest of what they approved."
      />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Acting />
      </Suspense>
    </>
  );
}

const stateBadge = { active: { tone: "done", word: "Acting now" }, upcoming: { tone: "progress", word: "Upcoming" }, ended: { tone: "neutral", word: "Ended" } } as const;

interface Approval {
  id: number;
  created_at: string;
  actor: string | null;
  filing_instances: { id: string; form: string; period_label: string; tax_due: string | null; clients: { name: string } | null } | null;
}

async function Acting() {
  await requireOwner();
  const supabase = await supabaseServer();
  const today = manilaToday();
  const since = manilaDayStart(addDays(today, -30));
  const [{ data: staff }, { data: rows }, { data: approvals }] = await Promise.all([
    supabase.from("staff_profiles").select("user_id, full_name, role, active").order("full_name"),
    supabase.from("acting_approver_delegations").select("id, delegate_user_id, starts_at, ends_at, max_tax_due, reason, ended_at").order("starts_at", { ascending: false }).limit(20),
    supabase
      .from("filing_events")
      .select("id, created_at, actor, filing_instances(id, form, period_label, tax_due, clients(name))")
      .eq("action", "owner_approve")
      .eq("data->>acting_approver", "true")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(100),
  ]);
  const nameOf = new Map((staff ?? []).map((s) => [s.user_id, s.full_name]));
  const reviewers = (staff ?? []).filter((s) => s.role === "reviewer" && s.active);
  const list = (rows ?? []) as Delegation[];
  const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" }).format(new Date(iso));

  return (
    <div className="space-y-6">
      <Card title="Name an acting approver">
        <AppointForm reviewers={reviewers} today={today} />
      </Card>

      <Card title="Appointments">
        {list.length === 0 ? (
          <p className="text-body-regular text-text-secondary">Nobody has stood in for you yet.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-separator-border">
            {list.map((d) => {
              const state = delegationState(d);
              const b = stateBadge[state];
              return (
                <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-body-medium text-text-primary">
                      {nameOf.get(d.delegate_user_id) ?? "—"} <Badge tone={b.tone}>{b.word}</Badge>
                    </p>
                    <p className="text-caption-1-regular text-text-tertiary">
                      {showDate(manilaDay(d.starts_at))} to {showDate(lastDay(d.ends_at))} · up to {peso.format(Number(d.max_tax_due))} tax due · {d.reason}
                      {d.ended_at && state === "ended" && new Date(d.ended_at) < new Date(d.ends_at) ? ` · ended early ${when(d.ended_at)}` : ""}
                    </p>
                  </div>
                  {state !== "ended" && <EndButton id={d.id} upcoming={state === "upcoming"} />}
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <Card title="Approved by an acting approver (last 30 days)">
        {(approvals ?? []).length === 0 ? (
          <p className="text-body-regular text-text-secondary">None.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-body-regular">
              <thead className="text-body-medium text-text-tertiary">
                <tr>
                  <th scope="col" className="pb-2 text-start">Approved</th>
                  <th scope="col" className="pb-2 text-start">Client</th>
                  <th scope="col" className="pb-2 text-start">Return</th>
                  <th scope="col" className="pb-2 text-end">Tax due</th>
                  <th scope="col" className="pb-2 text-start ps-4">By</th>
                </tr>
              </thead>
              <tbody>
                {((approvals ?? []) as unknown as Approval[]).map((a) => (
                  <tr key={a.id} className="border-t border-separator-border">
                    <td className="py-2 pe-4 tabular-nums text-text-secondary">{when(a.created_at)}</td>
                    <td className="py-2 pe-4 text-text-primary">{a.filing_instances?.clients?.name ?? "—"}</td>
                    <td className="py-2 pe-4">
                      {a.filing_instances ? (
                        <Link href={`/app/filings/${a.filing_instances.id}`} className="font-medium text-button-ghost-foreground hover:underline">{a.filing_instances.form} · {a.filing_instances.period_label}</Link>
                      ) : "—"}
                    </td>
                    <td className="py-2 text-end tabular-nums text-text-primary">{a.filing_instances?.tax_due == null ? "—" : peso.format(Number(a.filing_instances.tax_due))}</td>
                    <td className="py-2 ps-4 text-text-secondary">{(a.actor && nameOf.get(a.actor)) ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
