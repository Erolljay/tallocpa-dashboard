import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { showMonth } from "@/lib/documents/labels";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { loadPoints } from "@/lib/people/schema";
import { complianceScore, SCORE_RULES, toneBadge, toneLabel, type ClientMonth, type Part, type Score } from "@/lib/scores/compliance";
import { lateReason, type LateFiling } from "@/lib/scores/late";
import { kpis, lastMonths, pct, type StaffMonth } from "@/lib/scores/staff";
import { supabaseServer } from "@/lib/supabase/server";

export default function ScoresPage() {
  return (
    <>
      <PageHeader
        title="Scores"
        description="Which clients follow the system, which returns went late and why, and how each staff member is doing."
      />
      <Suspense fallback={<Skeleton rows={10} />}>
        <Scores />
      </Suspense>
    </>
  );
}

interface ClientRow { id: string; name: string; code: string }
type ScoredClient = { client: ClientRow; score: Score };
const order = { red: 0, yellow: 1, green: 2 } as const;

async function Scores() {
  await requireOwner();
  const supabase = await supabaseServer();
  const today = manilaToday();
  const year = lastMonths(today, 12);
  const scoreFrom = lastMonths(today, SCORE_RULES.months)[0];
  const thisMonth = year[year.length - 1];

  const [clients, cards, late, staffRows, staff, assignments, engagements] = await Promise.all([
    supabase.from("clients").select("id, name, code").in("status", ["onboarding", "active"]).order("name"),
    supabase.rpc("client_scorecard", { p_from: scoreFrom, p_to: thisMonth }),
    supabase.rpc("late_filings", { p_from: year[0], p_to: today }),
    supabase.rpc("staff_scorecard", { p_from: year[0], p_to: thisMonth }),
    supabase.from("staff_profiles").select("user_id, full_name, role, capacity_points, active").neq("role", "owner").order("full_name"),
    supabase.from("staff_assignments").select("user_id, client_id, role"),
    supabase.from("engagements").select("client_id, monthly_retainer, status"),
  ]);

  const monthsOf = new Map<string, ClientMonth[]>();
  for (const r of (cards.data ?? []) as (ClientMonth & { client_id: string })[]) {
    monthsOf.set(r.client_id, [...(monthsOf.get(r.client_id) ?? []), r]);
  }
  const scored: ScoredClient[] = ((clients.data ?? []) as ClientRow[])
    .map((client) => ({ client, score: complianceScore(monthsOf.get(client.id) ?? []) }))
    .sort((a, b) => (a.score.overall ? order[a.score.overall] : 3) - (b.score.overall ? order[b.score.overall] : 3) || a.client.name.localeCompare(b.client.name));

  const lateRows = (late.data ?? []) as LateFiling[];
  const clientName = new Map(((clients.data ?? []) as ClientRow[]).map((c) => [c.id, c.name]));
  const people = (staff.data ?? []) as { user_id: string; full_name: string; role: string; capacity_points: string; active: boolean }[];
  const nameOf = new Map(people.map((s) => [s.user_id, s.full_name]));

  const retainerByClient = new Map<string, number>();
  for (const e of engagements.data ?? []) {
    if (e.status === "active") retainerByClient.set(e.client_id, (retainerByClient.get(e.client_id) ?? 0) + Number(e.monthly_retainer));
  }
  const byStaff = new Map<string, StaffMonth[]>();
  for (const r of (staffRows.data ?? []) as (StaffMonth & { user_id: string })[]) {
    byStaff.set(r.user_id, [...(byStaff.get(r.user_id) ?? []), r]);
  }

  const failed = [cards, late, staffRows].find((r) => r.error);

  return (
    <div className="space-y-6">
      {failed && <p className="text-sm text-danger-text">Could not load the scores: {failed.error?.message}</p>}

      <Card title="Client compliance" actions={<span className="text-xs text-ink-subtle">Last {SCORE_RULES.months} months</span>}>
        <p className="mb-4 text-sm text-ink-muted">
          Each part is rated on its own and the client takes the worst. Green: documents by the cutoff at least {pct(SCORE_RULES.submission.green)} of months,
          at most {pct(SCORE_RULES.returned.green)} of documents returned, at least {pct(SCORE_RULES.payment.green)} paid on time, and no late returns the
          client caused. Red clients need a talk, repricing or offboarding.
        </p>
        {scored.length === 0 ? (
          <p className="text-sm text-ink-muted">No active clients yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] text-sm">
              <thead className="text-left text-ink-subtle">
                <tr>
                  <th scope="col" className="pb-2 font-medium">Client</th>
                  <th scope="col" className="pb-2 font-medium">Score</th>
                  <th scope="col" className="pb-2 font-medium">Documents by the cutoff</th>
                  <th scope="col" className="pb-2 font-medium">Returned documents</th>
                  <th scope="col" className="pb-2 font-medium">Paid on time</th>
                  <th scope="col" className="pb-2 font-medium">Late returns (client)</th>
                </tr>
              </thead>
              <tbody>
                {scored.map(({ client, score }) => (
                  <tr key={client.id} className="border-t border-border align-top">
                    <td className="py-2 pr-4">
                      <Link href={`/app/clients/${client.id}`} className="font-medium text-link hover:underline">{client.name}</Link>
                      <p className="text-xs text-ink-subtle">{client.code}</p>
                    </td>
                    <td className="py-2 pr-4">{score.overall ? <Badge tone={toneBadge[score.overall]}>{toneLabel[score.overall]}</Badge> : <span className="text-ink-subtle">No data yet</span>}</td>
                    <PartCell part={score.submission} show={pct} />
                    <PartCell part={score.quality} show={pct} />
                    <PartCell part={score.payment} show={pct} />
                    <PartCell part={score.lateFilings} show={(v) => String(v ?? "—")} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title={`Late returns (${lateRows.length})`} actions={<span className="text-xs text-ink-subtle">Due in the last 12 months</span>}>
        <p className="mb-4 text-sm text-ink-muted">
          Client-caused: the client missed the cutoff, sent documents after it, had not approved the reviewed return, or had not paid the tax the firm remits,
          by the due date. Everything else is staff-caused.
        </p>
        {lateRows.length === 0 ? (
          <p className="text-sm text-ink-muted">No late returns.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[48rem] text-sm">
              <thead className="text-left text-ink-subtle">
                <tr>
                  <th scope="col" className="pb-2 font-medium">Due</th>
                  <th scope="col" className="pb-2 font-medium">Filed</th>
                  <th scope="col" className="pb-2 font-medium">Client</th>
                  <th scope="col" className="pb-2 font-medium">Return</th>
                  <th scope="col" className="pb-2 font-medium">Caused by</th>
                  <th scope="col" className="pb-2 font-medium">Prepared by</th>
                </tr>
              </thead>
              <tbody>
                {lateRows.map((l) => (
                  <tr key={l.filing_id} className="border-t border-border align-top">
                    <td className="py-2 pr-4 tabular-nums text-ink-heading">{showDate(l.due_date)}</td>
                    <td className="py-2 pr-4 tabular-nums">{l.filed_on ? showDate(l.filed_on) : <span className="font-medium text-danger-text">Not filed</span>}</td>
                    <td className="py-2 pr-4 text-ink-heading">{clientName.get(l.client_id) ?? "—"}</td>
                    <td className="py-2 pr-4">
                      <Link href={`/app/filings/${l.filing_id}`} className="font-medium text-link hover:underline">{l.form} · {l.period_label}</Link>
                    </td>
                    <td className="py-2 pr-4">
                      <Badge tone={l.cause === "client" ? "waiting" : "blocked"}>{l.cause === "client" ? "Client" : "Staff"}</Badge>
                      <p className="mt-1 text-xs text-ink-muted">{lateReason(l)}</p>
                    </td>
                    <td className="py-2 text-ink-muted">{(l.preparer && nameOf.get(l.preparer)) ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title="Staff" actions={<span className="text-xs text-ink-subtle">This month · last 12 months</span>}>
        <p className="mb-4 text-sm text-ink-muted">
          On time counts returns due, by who prepared them; a late return the client caused does not count against staff. Days to file: from the cutoff of the
          period&apos;s last month to the filing date.
        </p>
        {people.length === 0 ? (
          <p className="text-sm text-ink-muted">No staff yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[60rem] text-sm">
              <thead className="text-left text-ink-subtle">
                <tr>
                  <th scope="col" className="pb-2 font-medium">Name</th>
                  <th scope="col" className="pb-2 font-medium">On time</th>
                  <th scope="col" className="pb-2 font-medium">On time, by month</th>
                  <th scope="col" className="pb-2 font-medium">Sent back</th>
                  <th scope="col" className="pb-2 text-right font-medium">Days to file</th>
                  <th scope="col" className="pb-2 text-right font-medium">Documents</th>
                  <th scope="col" className="pb-2 text-right font-medium">OCR fixes</th>
                  <th scope="col" className="pb-2 text-right font-medium">Load</th>
                </tr>
              </thead>
              <tbody>
                {people.map((s) => {
                  const rows = byStaff.get(s.user_id) ?? [];
                  const now = kpis(rows.filter((r) => r.month.slice(0, 7) === thisMonth.slice(0, 7)));
                  const all = kpis(rows);
                  const mine = (assignments.data ?? []).filter((a) => a.user_id === s.user_id && a.role === "preparer").map((a) => a.client_id);
                  const load = loadPoints(mine.map((c) => retainerByClient.get(c) ?? 0));
                  const capacity = Number(s.capacity_points);
                  const trend = year.map((m) => ({ month: m, k: kpis(rows.filter((r) => r.month.slice(0, 7) === m.slice(0, 7))) }));
                  return (
                    <tr key={s.user_id} className="border-t border-border align-top">
                      <td className="py-2 pr-4">
                        <p className="font-medium text-ink-heading">{s.full_name}</p>
                        <p className="text-xs text-ink-subtle">{s.role === "reviewer" ? "Reviewer" : "Staff"}{s.active ? "" : " · inactive"}</p>
                      </td>
                      <td className="py-2 pr-4 tabular-nums">
                        <span className="text-ink-heading">{pct(now.onTimeRate)}</span>
                        <span className="text-ink-subtle"> · {pct(all.onTimeRate)}</span>
                        {all.lateStaff > 0 && <p className="text-xs text-ink-muted">{all.lateStaff} late in 12 months</p>}
                      </td>
                      <td className="py-2 pr-4"><Trend points={trend.map((t) => ({ month: t.month, value: t.k.onTimeRate, due: t.k.filingsDue }))} /></td>
                      <td className="py-2 pr-4 tabular-nums">
                        <span className="text-ink-heading">{pct(now.kickbackRate)}</span>
                        <span className="text-ink-subtle"> · {pct(all.kickbackRate)}</span>
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        <span className="text-ink-heading">{now.daysToFile ?? "—"}</span>
                        <span className="text-ink-subtle"> · {all.daysToFile ?? "—"}</span>
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        <span className="text-ink-heading">{now.documentsProcessed}</span>
                        <span className="text-ink-subtle"> · {all.documentsProcessed}</span>
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        <span className="text-ink-heading">{now.ocrCorrections}</span>
                        <span className="text-ink-subtle"> · {all.ocrCorrections}</span>
                      </td>
                      <td className="py-2 text-right tabular-nums text-ink-heading">{load} / {capacity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function PartCell({ part, show }: { part: Part; show: (v: number | null) => string }) {
  return (
    <td className="py-2 pr-4">
      <div className="flex items-center gap-2">
        {part.tone ? <Badge tone={toneBadge[part.tone]}>{show(part.value)}</Badge> : <span className="text-ink-subtle">—</span>}
      </div>
      <p className="mt-1 text-xs text-ink-muted">{part.detail}</p>
    </td>
  );
}

/**
 * Twelve small bars, one per month: the share of returns filed on time (one
 * series, so no legend; the column header names it). Months with nothing due
 * show an empty slot. Each bar's title is its tooltip; the list reads out in full.
 */
function Trend({ points }: { points: { month: string; value: number | null; due: number }[] }) {
  return (
    <ol className="flex h-8 items-end gap-0.5" aria-label="Returns filed on time, by month">
      {points.map((p) => {
        const text = `${showMonth(p.month)}: ${p.value === null ? "nothing due" : `${pct(p.value)} of ${p.due} on time`}`;
        return (
          <li key={p.month} title={text} className="flex h-full w-2.5 items-end">
            <span className="sr-only">{text}</span>
            {p.value === null ? (
              <span aria-hidden className="h-0.5 w-full rounded-sm bg-border" />
            ) : (
              <span aria-hidden className="w-full rounded-t-[4px] bg-action" style={{ height: `${Math.max(8, Math.round(p.value * 100))}%` }} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
