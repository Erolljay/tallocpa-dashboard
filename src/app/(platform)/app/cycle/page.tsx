import Link from "next/link";
import { Suspense } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { submission, submissionLabel, submissionTone, parseMonth } from "@/lib/cycle/summary";
import { addMonths, ymd } from "@/lib/deadlines/dates";
import { openMonth } from "@/lib/documents/cutoff";
import { DOC_TYPES, showMonth, type DocType } from "@/lib/documents/labels";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { currentClientStatuses } from "@/lib/clients/labels";
import { supabaseServer } from "@/lib/supabase/server";
import { CloseCycleButton, DecideExceptionForm, NothingToSubmitButton } from "@/components/cycle-forms";
import { SectionTabs } from "@/app/(platform)/app/nav/section-tabs";

export default function CyclePage(props: PageProps<"/app/cycle">) {
  return (
    <>
      <PageHeader
        title="Monthly cycle"
        description="Each client's documents for the month: requested on the 1st, reminded the day before the cutoff, due on the cutoff day. Closing a month moves anything not yet posted to the next month of the same taxable year."
      />
      <SectionTabs section="inbox" active="cycle" />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Cycle searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

interface CycleWithClient {
  id: string;
  client_id: string;
  period: string;
  cutoff_date: string;
  requested_at: string | null;
  reminded_at: string | null;
  nothing_to_submit_at: string | null;
  missed_cutoff: boolean | null;
  closed_at: string | null;
  carried_forward: number;
  to_exceptions: number;
  clients: { name: string; code: string } | null;
}

interface DocRow {
  client_id: string;
  status: string;
  late: boolean;
  carried_from: string | null;
}

interface ExceptionRow {
  id: string;
  doc_type: DocType;
  period: string;
  document_month: string;
  exception_reason: string | null;
  file_name: string;
  client_id: string;
  clients: { name: string } | null;
}

const shift = (period: string, n: number) => {
  const [y, m] = period.split("-").map(Number);
  const t = addMonths(y, m, n);
  return ymd(t.year, t.month, 1).slice(0, 7);
};

async function Cycle({ searchParams }: { searchParams: PageProps<"/app/cycle">["searchParams"] }) {
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const today = manilaToday();
  const { month } = await searchParams;
  const period = parseMonth(typeof month === "string" ? month : null) ?? openMonth(today, 5);

  const [cycles, docs, exceptions, assignments] = await Promise.all([
    supabase.from("document_cycles").select("*, clients!inner(name, code)").in("clients.status", currentClientStatuses).eq("period", period).order("cutoff_date"),
    supabase
      .from("documents")
      .select("client_id, status, late, carried_from")
      .eq("period", period)
      .not("doc_type", "in", "(filed_return,payment_proof,cor)")
      .not("status", "in", "(uploading,split)")
      .limit(5000),
    supabase
      .from("documents")
      .select("id, doc_type, period, document_month, exception_reason, file_name, client_id, clients!inner(name)")
      .in("clients.status", currentClientStatuses)
      .eq("exception_status", "open")
      .neq("status", "split")
      .order("created_at")
      .limit(200),
    supabase.from("staff_assignments").select("client_id, role").eq("user_id", me.userId),
  ]);
  const rows = ((cycles.data ?? []) as unknown as CycleWithClient[]).sort((a, b) => (a.clients?.name ?? "").localeCompare(b.clients?.name ?? ""));
  const owner = me.staff.role === "owner";
  const mine = new Set((assignments.data ?? []).map((a) => a.client_id));
  const reviewing = new Set((assignments.data ?? []).filter((a) => a.role === "reviewer").map((a) => a.client_id));

  const byClient = new Map<string, { total: number; pending: number; late: number; carried: number }>();
  for (const d of (docs.data ?? []) as DocRow[]) {
    const s = byClient.get(d.client_id) ?? { total: 0, pending: 0, late: 0, carried: 0 };
    s.total += 1;
    if (d.status !== "posted") s.pending += 1;
    if (d.late) s.late += 1;
    if (d.carried_from) s.carried += 1;
    byClient.set(d.client_id, s);
  }
  const states = rows.map((y) => submission(y, byClient.get(y.client_id)?.total ?? 0, today));
  const missed = states.filter((s) => s === "missed").length;
  const waiting = states.filter((s) => s === "waiting").length;
  const exceptionRows = (exceptions.data ?? []) as unknown as ExceptionRow[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Link href={`/app/cycle?month=${shift(period, -1)}`} className="pressable inline-flex size-10 items-center justify-center rounded-2lg text-text-secondary hover:bg-background-secondary-hover" aria-label="Previous month">
          <RiArrowLeftSLine aria-hidden className="size-4" />
        </Link>
        <h2 className="min-w-44 text-center text-title-3-semibold text-text-primary">{showMonth(period)}</h2>
        <Link href={`/app/cycle?month=${shift(period, 1)}`} className="pressable inline-flex size-10 items-center justify-center rounded-2lg text-text-secondary hover:bg-background-secondary-hover" aria-label="Next month">
          <RiArrowRightSLine aria-hidden className="size-4" />
        </Link>
        <span className="ml-auto text-body-regular text-text-secondary">
          {rows.length} client{rows.length === 1 ? "" : "s"} · {missed} missed the cutoff · {waiting} waiting
        </span>
      </div>

      <Card title="Clients">
        {rows.length === 0 ? (
          <p className="text-body-regular text-text-secondary">No cycle for {showMonth(period)}. The nightly job opens each active client&apos;s month as it starts.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] text-body-regular">
              <thead className="text-start text-body-medium text-text-tertiary">
                <tr>
                  <th scope="col" className="text-start pb-2">Client</th>
                  <th scope="col" className="text-start pb-2">Cutoff</th>
                  <th scope="col" className="text-start pb-2">Submission</th>
                  <th scope="col" className="text-start pb-2">Documents</th>
                  <th scope="col" className="text-start pb-2">Not posted</th>
                  <th scope="col" className="pb-2 text-end">Month</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((y, i) => {
                  const s = byClient.get(y.client_id) ?? { total: 0, pending: 0, late: 0, carried: 0 };
                  const canAct = owner || mine.has(y.client_id);
                  return (
                    <tr key={y.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover align-top">
                      <td className="py-2.5 pr-4">
                        <Link href={`/app/clients/${y.client_id}`} className="font-medium text-button-ghost-foreground hover:underline">{y.clients?.name ?? "—"}</Link>
                        <p className="text-caption-1-regular text-text-tertiary">{y.clients?.code}</p>
                      </td>
                      <td className="py-2.5 pr-4 tabular-nums text-text-secondary">
                        {showDate(y.cutoff_date)}
                        <p className="text-caption-1-regular text-text-tertiary">{y.requested_at ? (y.reminded_at ? "Requested, reminded" : "Requested") : "Not requested yet"}</p>
                      </td>
                      <td className="py-2.5 pr-4">
                        <Badge tone={submissionTone[states[i]]}>{submissionLabel[states[i]]}</Badge>
                        {canAct && !y.closed_at && (states[i] === "waiting" || states[i] === "not_due") && (
                          <div className="mt-1.5"><NothingToSubmitButton clientId={y.client_id} period={period} label="Client has nothing" /></div>
                        )}
                      </td>
                      <td className="py-2.5 pr-4 tabular-nums text-text-primary">
                        {s.total}
                        {s.late > 0 && <span className="ml-1.5 text-caption-1-regular text-status-yellow-text">{s.late} late</span>}
                        {s.carried > 0 && <span className="ml-1.5 text-caption-1-regular text-status-yellow-text">{s.carried} carried in</span>}
                      </td>
                      <td className="py-2.5 pr-4 tabular-nums">{s.pending > 0 ? <span className="text-status-yellow-text">{s.pending}</span> : <span className="text-text-tertiary">0</span>}</td>
                      <td className="py-2.5 text-end">
                        {y.closed_at ? (
                          <div>
                            <Badge tone="done">Closed</Badge>
                            {(y.carried_forward > 0 || y.to_exceptions > 0) && (
                              <p className="mt-1 text-caption-1-regular text-text-tertiary">
                                {y.carried_forward > 0 && `${y.carried_forward} moved on`}
                                {y.carried_forward > 0 && y.to_exceptions > 0 && " · "}
                                {y.to_exceptions > 0 && `${y.to_exceptions} to exceptions`}
                              </p>
                            )}
                          </div>
                        ) : today > y.cutoff_date && canAct ? (
                          <CloseCycleButton clientId={y.client_id} period={period} />
                        ) : (
                          <span className="text-caption-1-regular text-text-tertiary">Open</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title={`Prior-year exceptions (${exceptionRows.length})`}>
        <p className="mb-4 text-body-regular text-text-secondary">
          Documents from a closed taxable year are never carried forward. The client&apos;s Reviewer or the Owner decides: amend the prior-year return, treat the item as non-deductible, or record it in the current period.
        </p>
        {exceptionRows.length === 0 ? (
          <p className="text-body-regular text-text-secondary">Nothing waiting for a decision.</p>
        ) : (
          <ul className="divide-y divide-separator-border">
            {exceptionRows.map((d) => (
              <li key={d.id} className="flex flex-wrap items-start gap-x-6 gap-y-2 py-3">
                <div className="min-w-56 flex-1">
                  <Link href={`/app/documents/${d.id}`} className="font-medium text-button-ghost-foreground hover:underline">{DOC_TYPES[d.doc_type]}</Link>
                  <p className="text-body-regular text-text-primary">{d.clients?.name ?? "—"}</p>
                  <p className="text-caption-1-regular text-text-tertiary">{showMonth(d.document_month)} · {d.exception_reason ?? "Prior taxable year"} · {d.file_name}</p>
                </div>
                <div className="min-w-72 flex-1">
                  {owner || reviewing.has(d.client_id) ? <DecideExceptionForm documentId={d.id} /> : <span className="text-caption-1-regular text-text-tertiary">Waiting for the Reviewer or Owner</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
