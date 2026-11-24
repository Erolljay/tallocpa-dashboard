import Link from "next/link";
import { Badge, Card, LinkButton, peso } from "@/components/ui";
import { ageOpenItems, agingLabel } from "@/lib/collections/collections";
import { addDays } from "@/lib/deadlines/dates";
import { DOC_TYPES, type DocType } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { loadPoints } from "@/lib/people/schema";
import { complianceScore, SCORE_RULES, type ClientMonth } from "@/lib/scores/compliance";
import type { LateFiling } from "@/lib/scores/late";
import { lastMonths, pct } from "@/lib/scores/staff";
import { supabaseServer } from "@/lib/supabase/server";

interface Queue { user_id: string | null; queue: "documents" | "returns"; items: number; oldest: string }
interface OcrRate { client_id: string; doc_type: string; read_by_ocr: number; corrected: number; fields_corrected: number }

const big = "text-display-4-semibold tabular-nums";
const DAY = 86_400_000;
/** Whole days an item has waited, as of now. */
const waited = (iso: string) => Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / DAY));

/** The Owner dashboard's firm-wide part (spec §3.11). The caller checks the Owner. */
export async function OwnerSections() {
  const supabase = await supabaseServer();
  const today = manilaToday();
  const year = lastMonths(today, 12);
  const scoreMonths = lastMonths(today, SCORE_RULES.months);

  const [clients, cards, late, dues, ocr, queues, staff, assignments, engagements] = await Promise.all([
    supabase.from("clients").select("id, name").in("status", ["onboarding", "active"]),
    supabase.rpc("client_scorecard", { p_from: scoreMonths[0], p_to: scoreMonths[scoreMonths.length - 1] }),
    supabase.rpc("late_filings", { p_from: year[0], p_to: today }),
    supabase.from("due_balances").select("due_on, open_amount").gt("open_amount", 0),
    supabase.rpc("ocr_correction_rates", { p_from: addDays(today, -90) }),
    supabase.rpc("work_queues"),
    supabase.from("staff_profiles").select("user_id, full_name, role, capacity_points, active").order("full_name"),
    supabase.from("staff_assignments").select("user_id, client_id, role"),
    supabase.from("engagements").select("client_id, monthly_retainer, status"),
  ]);

  const nameOfClient = new Map(((clients.data ?? []) as { id: string; name: string }[]).map((c) => [c.id, c.name]));

  // Clients not following the system: red compliance score.
  const monthsOf = new Map<string, ClientMonth[]>();
  for (const r of (cards.data ?? []) as (ClientMonth & { client_id: string })[]) monthsOf.set(r.client_id, [...(monthsOf.get(r.client_id) ?? []), r]);
  const red = [...nameOfClient.entries()]
    .filter(([id]) => complianceScore(monthsOf.get(id) ?? []).overall === "red")
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const lateRows = (late.data ?? []) as LateFiling[];
  const byClient = lateRows.filter((l) => l.cause === "client").length;
  const byStaff = lateRows.length - byClient;

  const aging = ageOpenItems((dues.data ?? []) as { due_on: string; open_amount: string }[], today);

  const rates = (ocr.data ?? []) as OcrRate[];
  const read = rates.reduce((s, r) => s + r.read_by_ocr, 0);
  const corrected = rates.reduce((s, r) => s + r.corrected, 0);
  const worst = rates
    .filter((r) => r.read_by_ocr >= 5 && r.corrected > 0)
    .sort((a, b) => b.corrected / b.read_by_ocr - a.corrected / a.read_by_ocr)
    .slice(0, 3);

  const retainerByClient = new Map<string, number>();
  for (const e of engagements.data ?? []) {
    if (e.status === "active") retainerByClient.set(e.client_id, (retainerByClient.get(e.client_id) ?? 0) + Number(e.monthly_retainer));
  }
  const work = (queues.data ?? []) as Queue[];
  const queueOf = (user: string | null, q: Queue["queue"]) => work.find((w) => w.user_id === user && w.queue === q);
  const people = ((staff.data ?? []) as { user_id: string; full_name: string; role: string; capacity_points: string; active: boolean }[]).filter(
    (s) => s.active && s.role !== "owner",
  );
  const unassigned = { documents: queueOf(null, "documents"), returns: queueOf(null, "returns") };

  const failed = [cards, late, ocr, queues].find((r) => r.error);

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-title-3-semibold text-text-primary">Firm overview</h2>
      {failed && <p className="text-body-regular text-text-error-primary">Could not load part of this: {failed.error?.message}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Late returns, 12 months">
          <p className={`${big} ${byStaff > 0 ? "text-text-error-primary" : "text-text-primary"}`}>{byStaff}</p>
          <p className="mt-2 text-body-regular text-text-secondary">staff-caused · <span className="tabular-nums">{byClient}</span> client-caused</p>
          <LinkButton href="/app/scores" variant="ghost" className="mt-3 -ml-5">See why</LinkButton>
        </Card>
        <Card title="Clients in the red">
          <p className={`${big} ${red.length > 0 ? "text-text-error-primary" : "text-text-primary"}`}>{red.length}</p>
          {red.length > 0 ? (
            <ul className="mt-2 space-y-0.5 text-body-regular text-text-secondary">
              {red.slice(0, 5).map((c) => (
                <li key={c.id} className="truncate"><Link href={`/app/clients/${c.id}`} className="hover:underline">{c.name}</Link></li>
              ))}
              {red.length > 5 && <li className="text-text-tertiary">and {red.length - 5} more</li>}
            </ul>
          ) : (
            <p className="mt-2 text-body-regular text-text-secondary">Every client is following the system.</p>
          )}
          <LinkButton href="/app/scores" variant="ghost" className="mt-3 -ml-5">Compliance scores</LinkButton>
        </Card>
        <Card title="Receivables overdue">
          <p className={`${big} ${aging.overdue > 0 ? "text-text-error-primary" : "text-text-primary"}`}>{peso.format(aging.overdue)}</p>
          <dl className="mt-2 space-y-0.5 text-body-regular">
            {(["1-30", "31-60", "61-90", "90+"] as const).map((b) => (
              <div key={b} className="flex justify-between gap-3">
                <dt className="text-text-secondary">{agingLabel[b]}</dt>
                <dd className="tabular-nums text-text-primary">{peso.format(aging.buckets[b])}</dd>
              </div>
            ))}
          </dl>
          <LinkButton href="/app/collections" variant="ghost" className="mt-3 -ml-5">Collections</LinkButton>
        </Card>
        <Card title="OCR corrections, 90 days">
          <p className={`${big} text-text-primary`}>{pct(read === 0 ? null : corrected / read)}</p>
          <p className="mt-2 text-body-regular text-text-secondary">{corrected} of {read} documents read by OCR needed a fix.</p>
          {worst.length > 0 && (
            <ul className="mt-2 space-y-0.5 text-body-regular text-text-secondary">
              {worst.map((r) => (
                <li key={`${r.client_id}-${r.doc_type}`} className="truncate">
                  {nameOfClient.get(r.client_id) ?? "—"} · {DOC_TYPES[r.doc_type as DocType] ?? r.doc_type}{" "}
                  <span className="tabular-nums text-text-primary">{pct(r.corrected / r.read_by_ocr)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card title="Staff: clients, load and work waiting">
        {people.length === 0 ? (
          <p className="text-body-regular text-text-secondary">No staff yet. <Link href="/app/staff" className="text-button-ghost-foreground hover:underline">Add staff</Link></p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] text-body-regular">
              <thead className="text-start text-body-medium text-text-tertiary">
                <tr>
                  <th scope="col" className="text-start pb-2">Name</th>
                  <th scope="col" className="pb-2 text-end">Clients</th>
                  <th scope="col" className="text-start pb-2">Load</th>
                  <th scope="col" className="text-start pb-2">Documents to review</th>
                  <th scope="col" className="text-start pb-2">Returns to review</th>
                </tr>
              </thead>
              <tbody>
                {people.map((s) => {
                  const mine = (assignments.data ?? []).filter((a) => a.user_id === s.user_id && a.role === "preparer").map((a) => a.client_id);
                  const load = loadPoints(mine.map((c) => retainerByClient.get(c) ?? 0));
                  const capacity = Number(s.capacity_points);
                  const p = capacity > 0 ? Math.round((load / capacity) * 100) : 0;
                  return (
                    <tr key={s.user_id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                      <td className="py-2 pr-4 font-medium text-text-primary">{s.full_name}</td>
                      <td className="py-2 pr-4 text-end tabular-nums text-text-primary">{mine.length}</td>
                      <td className="py-2 pr-4">
                        <span className="tabular-nums text-text-primary">{load} / {capacity}</span>{" "}
                        <Badge tone={p > 100 ? "blocked" : p >= 85 ? "waiting" : "done"}>{p}%</Badge>
                      </td>
                      <QueueCell q={queueOf(s.user_id, "documents")} />
                      <QueueCell q={queueOf(s.user_id, "returns")} />
                    </tr>
                  );
                })}
                {(unassigned.documents || unassigned.returns) && (
                  <tr className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                    <td className="py-2 pr-4 text-text-secondary" colSpan={3}>No one assigned</td>
                    <QueueCell q={unassigned.documents} />
                    <QueueCell q={unassigned.returns} />
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function QueueCell({ q }: { q: Queue | undefined }) {
  if (!q) return <td className="py-2 pr-4 text-text-tertiary">None</td>;
  const days = waited(q.oldest);
  return (
    <td className="py-2 pr-4">
      <span className="tabular-nums text-text-primary">{q.items}</span>
      <span className={`ml-2 text-caption-1-regular ${days > 3 ? "font-medium text-text-error-primary" : "text-text-secondary"}`}>oldest {days === 0 ? "today" : `${days} day${days === 1 ? "" : "s"}`}</span>
    </td>
  );
}
