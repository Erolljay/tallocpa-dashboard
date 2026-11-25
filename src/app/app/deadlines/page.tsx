import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { booksStillOpen, filingsNeedingAmendment, type AmendmentFlag, type StillOpenRow } from "@/lib/books/actions";
import { loadBoard, loadCoverage, type BoardRow } from "@/lib/deadlines/safeguards-load";
import { RISK_LABELS, type RiskState } from "@/lib/deadlines/safeguards";
import { causeTag, DUE_GROUP_LABELS, groupByDue, waitingOn, waitingOnText, type DueGroup } from "@/lib/filings/board";
import { keepBooksReady } from "@/lib/filings/books-ready";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { monthName } from "@/lib/lock/month-lock";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { GenerateButton } from "./generate-button";
import { StepProgress } from "./step-progress";
import { FilingsTabs } from "@/app/app/nav/section-tabs";

export default function DeadlinesPage(props: PageProps<"/app/deadlines">) {
  return (
    <>
      <PageHeader
        title="Filings"
        description="Returns by their BIR date, each with its five sign-off steps and who it waits on. A return shows here once the Books for its whole period are locked; until then it is under Books still open."
      />
      <FilingsTabs active="deadlines" />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Deadlines searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const plural = (n: number, word: string, many = `${word}s`) => `${n} ${n === 1 ? word : many}`;

interface OpenRow extends StillOpenRow {
  waiting: number;
  preparer: string | null;
}

async function Deadlines({ searchParams }: Pick<PageProps<"/app/deadlines">, "searchParams">) {
  const me = await requireStaff();
  const owner = me.staff.role === "owner";
  const sp = await searchParams;
  // Staff and reviewers see the filings of their own clients first; the Owner sees all.
  const mine = one(sp.show) === "mine" || (!owner && one(sp.show) !== "all");
  const supabase = await supabaseServer();
  const today = manilaToday();
  const [board, gaps, flags, stillOpen, { data: team }, { data: people }] = await Promise.all([
    loadBoard(supabase, today, mine ? { userId: me.userId } : {}),
    owner ? loadCoverage(supabase, today) : Promise.resolve([]),
    filingsNeedingAmendment(),
    booksStillOpen(today),
    supabase.from("staff_assignments").select("client_id, user_id, role"),
    supabase.from("staff_profiles").select("user_id, full_name"),
  ]);
  // Returns appear only for locked periods (decision 10).
  const ready = await keepBooksReady(board, supabase);
  const held = board.length - ready.length;
  const groups = groupByDue(ready, today);
  const count = (s: RiskState) => ready.filter((r) => r.risk.state === s).length;

  const assignments = (team ?? []) as { client_id: string; user_id: string; role: string }[];
  const myClients = new Set(assignments.filter((a) => a.user_id === me.userId).map((a) => a.client_id));
  const nameOf = new Map(((people ?? []) as { user_id: string; full_name: string }[]).map((p) => [p.user_id, p.full_name]));
  const preparerOf = (clientId: string) => {
    const a = assignments.find((t) => t.client_id === clientId && t.role === "preparer");
    return a ? (nameOf.get(a.user_id) ?? null) : null;
  };

  const openRows = stillOpen.filter((r) => !mine || myClients.has(r.client_id));
  const waitingOf = await documentsWaiting(supabase, openRows);
  const open: OpenRow[] = openRows.map((r) => ({ ...r, waiting: waitingOf.get(`${r.client_id}|${r.month.slice(0, 10)}`) ?? 0, preparer: preparerOf(r.client_id) }));
  const shownFlags = flags.filter((f) => !mine || myClients.has(f.client_id));
  const flagOf = new Map(flags.map((f) => [f.filing_id, f]));
  const clientName = new Map(stillOpen.map((r) => [r.client_id, r.client_name]));
  for (const r of board) clientName.set(r.clientId, r.clientName);

  return (
    <div className="space-y-6">
      {owner && (
        <Notice>
          Deadline rules and holidays are starting figures until checked. Review and edit them in <Link href="/app/settings" className="text-button-ghost-foreground underline">Settings</Link>.
        </Notice>
      )}
      {owner && <GenerateButton />}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(["overdue", "critical", "at_risk", "on_track"] as const).map((s) => (
          <div key={s} className="rounded-2xl border border-border-button-default bg-background-primary-default px-4 py-3">
            <p className="text-caption-1-regular text-text-tertiary">{RISK_LABELS[s]}</p>
            <p className={cx("text-title-2-medium tabular-nums", count(s) > 0 && (s === "overdue" || s === "critical") ? "text-text-error-primary" : "text-text-primary")}>{count(s)}</p>
          </div>
        ))}
      </div>

      {owner && gaps.length > 0 && (
        <Card title={`Coverage gaps (${gaps.length})`} actions={<span className="text-caption-1-regular text-text-tertiary">A missing obligation is a filing that never turns red</span>}>
          <ul className="divide-y divide-separator-border text-body-regular">
            {gaps.map((g, i) => (
              <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2">
                <Link href={`/app/clients/${g.clientId}`} className="font-medium text-text-primary hover:underline">{g.clientName}</Link>
                <span className="text-text-secondary">{g.text}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <nav aria-label="Filter" className="flex gap-2 text-body-regular">
        <Link href="/app/deadlines?show=mine" aria-current={mine ? "page" : undefined} className={cx("rounded-full border px-3 py-1 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring", mine ? "border-accent-600 text-accent-600" : "border-border-button-default text-text-secondary hover:text-text-primary")}>My clients</Link>
        <Link href="/app/deadlines?show=all" aria-current={!mine ? "page" : undefined} className={cx("rounded-full border px-3 py-1 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring", !mine ? "border-accent-600 text-accent-600" : "border-border-button-default text-text-secondary hover:text-text-primary")}>All clients</Link>
      </nav>

      {ready.length === 0 && held === 0 ? (
        <p className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-8 text-center text-body-regular text-text-secondary">
          {mine ? "None of your clients has a filing due in the next 60 days." : "No filings yet. Add clients with tax types, then generate filings."}
        </p>
      ) : (
        (["overdue", "this_week", "later"] as const).map((g) => <FilingGroup key={g} group={g} rows={groups[g]} today={today} flagOf={flagOf} />)
      )}

      {shownFlags.length > 0 && <AmendmentCard flags={shownFlags} clientName={clientName} />}

      <BooksStillOpen rows={open} today={today} held={held} />
    </div>
  );
}

/** Documents still in the Inbox for each client and month of the Books still open. */
async function documentsWaiting(supabase: Awaited<ReturnType<typeof supabaseServer>>, rows: StillOpenRow[]): Promise<Map<string, number>> {
  const out = new Map<string, number>();
  if (rows.length === 0) return out;
  const { data } = await supabase
    .from("documents")
    .select("client_id, document_month")
    .in("client_id", [...new Set(rows.map((r) => r.client_id))])
    .in("document_month", [...new Set(rows.map((r) => r.month.slice(0, 10)))])
    .in("status", ["received", "under_review"])
    .limit(10000);
  for (const d of (data ?? []) as { client_id: string; document_month: string }[]) {
    const k = `${d.client_id}|${String(d.document_month).slice(0, 10)}`;
    out.set(k, (out.get(k) ?? 0) + 1);
  }
  return out;
}

const GROUP_HINT: Record<DueGroup, string> = {
  overdue: "The BIR date has passed and the return is not filed",
  this_week: "Due in the next 7 days",
  later: "Due within 60 days",
};

function FilingGroup({ group, rows, today, flagOf }: { group: DueGroup; rows: BoardRow[]; today: string; flagOf: Map<string, AmendmentFlag> }) {
  const red = group === "overdue";
  if (rows.length === 0 && group !== "this_week") return null;
  return (
    <section aria-labelledby={`group-${group}`} className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id={`group-${group}`} className={cx("text-title-3-semibold", red ? "text-text-error-primary" : "text-text-primary")}>
          {DUE_GROUP_LABELS[group]} <span className="tabular-nums">({rows.length})</span>
        </h2>
        <span className="text-caption-1-regular text-text-tertiary">{GROUP_HINT[group]}</span>
      </div>
      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-center text-body-regular text-text-secondary">Nothing due this week.</p>
      ) : (
        <div className={cx("overflow-x-auto rounded-3xl border bg-background-primary-default shadow-xs", red ? "border-border-error-default" : "border-border-button-default")}>
          <table className="w-full min-w-[64rem] text-body-regular">
            <thead className="border-b border-separator-border bg-background-secondary-default text-body-medium text-text-tertiary">
              <tr>
                <th scope="col" className="px-4 py-3 text-start">Return</th>
                <th scope="col" className="px-4 py-3 text-start">Client</th>
                <th scope="col" className="px-4 py-3 text-start">Period</th>
                <th scope="col" className="px-4 py-3 text-start">Due</th>
                <th scope="col" className="px-4 py-3 text-end">Amount</th>
                <th scope="col" className="px-4 py-3 text-start">Steps</th>
                <th scope="col" className="px-4 py-3 text-start">Waiting on</th>
                <th scope="col" className="px-4 py-3 text-start">Late step</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const tag = causeTag(r.risk);
                const flag = flagOf.get(r.id);
                const overdue = r.dueDate < today && group === "overdue";
                return (
                  <tr key={r.id} className="border-t border-separator-border align-top transition-colors duration-150 hover:bg-background-secondary-hover">
                    <td className="whitespace-nowrap px-4 py-3">
                      <Link href={`/app/filings/${r.id}`} className="rounded-sm font-medium text-button-ghost-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">{r.form}</Link>
                      {flag && <div className="mt-1"><Badge tone="blocked">Needs amended return</Badge></div>}
                    </td>
                    <td className="px-4 py-3"><Link href={`/app/clients/${r.clientId}`} className="text-text-primary hover:underline">{r.clientName}</Link></td>
                    <td className="whitespace-nowrap px-4 py-3 text-text-secondary">{r.periodLabel}</td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                      <span className={overdue ? "font-medium text-text-error-primary" : "text-text-primary"}>{showDate(r.dueDate)}</span>
                      {!overdue && r.risk.state !== "filed" && r.risk.daysLeft <= 5 && <p className="text-caption-1-regular text-text-tertiary">{plural(r.risk.daysLeft, "working day")} left</p>}
                    </td>
                    <td className="amount whitespace-nowrap px-4 py-3 text-end tabular-nums text-text-primary">{r.taxDue == null ? "—" : r.taxDue === 0 ? "Nil" : peso.format(r.taxDue)}</td>
                    <td className="px-4 py-3"><StepProgress status={r.status} taxDue={r.taxDue} /></td>
                    <td className="px-4 py-3 text-text-primary">{waitingOnText(waitingOn(r))}</td>
                    <td className="px-4 py-3">
                      {tag ? (
                        <>
                          <Badge tone={tag.cause === "client" ? "waiting" : "blocked"}>{tag.label}</Badge>
                          <p className="mt-1 text-caption-1-regular text-text-tertiary">{tag.step} slipped</p>
                        </>
                      ) : (
                        <span className="text-text-tertiary">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function AmendmentCard({ flags, clientName }: { flags: AmendmentFlag[]; clientName: Map<string, string> }) {
  return (
    <Card title={`Needs amended return (${flags.length})`} actions={<span className="text-caption-1-regular text-text-tertiary">A filed return whose month was unlocked</span>}>
      <ul className="divide-y divide-separator-border text-body-regular">
        {flags.map((f) => (
          <li key={f.filing_id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2">
            <span>
              <Link href={`/app/filings/${f.filing_id}`} className="font-medium text-button-ghost-foreground hover:underline">{f.form} · {f.period_label}</Link>
              <span className="text-text-secondary"> · {clientName.get(f.client_id) ?? "Client"}</span>
            </span>
            <span className="text-text-secondary">Unlocked: {f.reason}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function BooksStillOpen({ rows, today, held }: { rows: OpenRow[]; today: string; held: number }) {
  return (
    <section aria-labelledby="books-open" className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="books-open" className="text-title-3-semibold text-text-primary">Books still open <span className="tabular-nums">({rows.length})</span></h2>
        <span className="text-caption-1-regular text-text-tertiary">
          {held > 0 ? `${plural(held, "return")} held until the reviewer locks the month` : "Months a return needs that are not locked yet"}
        </span>
      </div>
      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-center text-body-regular text-text-secondary">Every month a return needs is locked.</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
          <table className="w-full min-w-[52rem] text-body-regular">
            <thead className="border-b border-separator-border bg-background-secondary-default text-body-medium text-text-tertiary">
              <tr>
                <th scope="col" className="px-4 py-3 text-start">Client</th>
                <th scope="col" className="px-4 py-3 text-start">Month</th>
                <th scope="col" className="px-4 py-3 text-start">Holding it</th>
                <th scope="col" className="px-4 py-3 text-start">Nearest BIR date</th>
                <th scope="col" className="px-4 py-3 text-end">Returns waiting</th>
                <th scope="col" className="px-4 py-3 text-start">Preparer</th>
                <th scope="col" className="px-4 py-3 text-end"><span className="sr-only">Open</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const month = r.month.slice(0, 10);
                const due = r.nearest_due_date.slice(0, 10);
                const late = due < today;
                return (
                  <tr key={`${r.client_id}|${month}`} className="border-t border-separator-border align-top transition-colors duration-150 hover:bg-background-secondary-hover">
                    <td className="px-4 py-3"><Link href={`/app/clients/${r.client_id}`} className="text-text-primary hover:underline">{r.client_name}</Link></td>
                    <td className="whitespace-nowrap px-4 py-3 text-text-primary">{monthName(month)}</td>
                    <td className="px-4 py-3 text-text-secondary">
                      {r.waiting > 0 ? `${plural(r.waiting, "document")} waiting in the Inbox` : r.status === "lock_requested" ? "Lock requested, with the reviewer" : "Inbox clear: ready to ask for the lock"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                      <span className={late ? "font-medium text-text-error-primary" : "text-text-primary"}>{showDate(due)}</span>
                      {late && <span className="ms-1 text-caption-1-semibold text-text-error-primary">overdue</span>}
                      <p className="text-caption-1-regular text-text-tertiary">{r.form} · {r.period_label}</p>
                    </td>
                    <td className="px-4 py-3 text-end tabular-nums text-text-primary">{r.filings}</td>
                    <td className="px-4 py-3">{r.preparer ? <span className="text-text-primary">{r.preparer}</span> : <Badge tone="blocked">None</Badge>}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-end">
                      <Link href={`/app/documents?client=${r.client_id}`} className="rounded-sm font-medium text-button-ghost-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">Open Inbox</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
