import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { booksMonthStatus } from "@/lib/books/actions";
import { manilaToday } from "@/lib/filings/run";
import { booksAccess, loadAccounts } from "@/lib/ledger/data";
import { monthName } from "@/lib/lock/month-lock";
import { toCentavos } from "@/lib/returns/money";
import { progress, readyToClose, taxableYearEnds, yearEndChecklist, type AnnualFiling, type CheckItem, type StepState } from "@/lib/year-end/checklist";
import { CloseYearForm } from "../books/forms";
import { ClientTabs } from "../client-tabs";
import { TickForm } from "./forms";

/**
 * A client's year-end (docs/REWORK.md, decision 23): close the books with the Owner's
 * closing entry, annual payroll and the final 2316s, the annual returns (1604-C and
 * 1604-E with eSubmission, the annual income tax return, inventory list, loose-leaf
 * binding, AFS) and the client's decisions on missing 2307s. One taxable year at a time.
 */
export default function YearEndPage(props: PageProps<"/app/clients/[id]/year-end">) {
  return (
    <Suspense fallback={<Skeleton rows={12} />}>
      <YearEnd params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const ANNUAL_FORMS = ["1604-C", "1604-E", "1700", "1701", "1701A", "1702-RT", "1702-EX", "1702-MX", "Inventory List"];
const CALENDAR_YEAR_FORMS = new Set(["1604-C", "1604-E"]);

const BADGE: Record<StepState, { tone: "done" | "waiting" | "blocked" | "neutral"; label: string }> = {
  done: { tone: "done", label: "Done" },
  waiting: { tone: "waiting", label: "To do" },
  blocked: { tone: "blocked", label: "Problem" },
  not_needed: { tone: "neutral", label: "Not needed" },
};

const fmtYear = (yearEnd: string) => (yearEnd.slice(5) === "12-31" ? yearEnd.slice(0, 4) : `FY ending ${monthName(yearEnd)}`);
/** The first day of the month after the year-end month, a year earlier (2025-02-28 → 2024-03-01). */
const yearStartOf = (yearEnd: string) => new Date(Date.UTC(Number(yearEnd.slice(0, 4)) - 1, Number(yearEnd.slice(5, 7)), 1)).toISOString().slice(0, 10);

async function YearEnd({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/year-end">, "params" | "searchParams">) {
  const { id } = await params;
  const q = await searchParams;
  const { supabase, client, books, me } = await booksAccess(id);
  const owner = me.staff.role === "owner";
  const today = manilaToday();

  const years = taxableYearEnds(client.fiscal_year_end_month, books?.booksStart ?? today, today);
  const asked = typeof q.year === "string" && years.includes(q.year) ? q.year : null;
  // The most recent year that has ended, else the year in progress.
  const yearEnd = asked ?? years.find((y) => y < today) ?? years[0];
  const yearStart = yearStartOf(yearEnd);
  const calendarYear = Number(yearEnd.slice(0, 4));

  const calendarYears = [...new Set([Number(yearStart.slice(0, 4)), calendarYear])];
  const [{ data: client2 }, { data: team }, { data: engagements }, monthRows, { count: suggested }, { data: tb }, { data: closing }, { data: ticks }, { data: obligations }, { data: release }, { data: filingRows }, { data: missing }, accounts] =
    await Promise.all([
      supabase.from("clients").select("code").eq("id", id).maybeSingle(),
      supabase.from("staff_assignments").select("user_id").eq("client_id", id),
      supabase.from("engagements").select("service_line, status").eq("client_id", id),
      books ? Promise.all(calendarYears.map((y) => booksMonthStatus(id, y, supabase))).then((r) => r.flat()) : Promise.resolve([]),
      supabase.from("journal_entries").select("id", { count: "exact", head: true }).eq("client_id", id).eq("status", "suggested").lte("entry_date", yearEnd),
      books ? supabase.rpc("trial_balance", { p_client: id, p_from: yearStart, p_to: yearEnd }) : Promise.resolve({ data: [] }),
      supabase.from("journal_entries").select("id, posted_at").eq("client_id", id).eq("source", "closing").eq("status", "posted").eq("entry_date", yearEnd).maybeSingle(),
      supabase.from("year_end_checks").select("item, done_at, note").eq("client_id", id).eq("year_end", yearEnd),
      supabase.from("obligations").select("form").eq("client_id", id).lte("start_date", yearEnd).or(`end_date.is.null,end_date.gte.${yearStart}`),
      supabase.from("payroll_2316_releases").select("released_at").eq("client_id", id).eq("year", calendarYear).maybeSingle(),
      supabase
        .from("filing_instances")
        .select("id, form, period_label, period_end, due_date, status, esubmission_required, amendment_no, esubmissions(status, superseded_at)")
        .eq("client_id", id)
        .in("form", ANNUAL_FORMS)
        .in("period_end", [yearEnd, `${calendarYear}-12-31`])
        .order("form")
        .order("amendment_no"),
      supabase.rpc("missing_2307s", { p_client: id }),
      books ? loadAccounts(supabase, id) : Promise.resolve([]),
    ]);

  const work = owner || (team ?? []).some((a) => a.user_id === me.userId);
  const hasBookkeeping = (engagements ?? []).some((e) => e.service_line === "bookkeeping" && e.status === "active");

  const inYear = (d: string) => d >= yearStart && d <= yearEnd;
  const openMonths = (monthRows as { month: string; status: string; in_books: boolean }[])
    // A month waiting on an unlock request is still locked; one waiting on a lock request is not yet.
    .filter((m) => inYear(String(m.month).slice(0, 10)) && m.in_books && m.status !== "locked" && m.status !== "unlock_requested")
    .map((m) => monthName(String(m.month)));
  const tbRows = (tb ?? []) as { closing: string | number }[];
  const tbDifference = tbRows.reduce((s, r) => s + (toCentavos(String(r.closing)) ?? 0), 0);
  const forms = new Set(((obligations ?? []) as { form: string }[]).map((o) => o.form));

  type FilingRow = { id: string; form: string; period_label: string; period_end: string; due_date: string; status: string; esubmission_required: boolean; amendment_no: number; esubmissions: { status: AnnualFiling["esubmission"]; superseded_at: string | null }[] | null };
  // The latest return of each form and period (an amended return replaces the original).
  const latest = new Map<string, FilingRow>();
  for (const f of (filingRows ?? []) as unknown as FilingRow[]) {
    if (!CALENDAR_YEAR_FORMS.has(f.form) ? f.period_end !== yearEnd : f.period_end !== `${calendarYear}-12-31`) continue;
    latest.set(`${f.form}|${f.period_end}`, f);
  }
  const filings: AnnualFiling[] = [...latest.values()].map((f) => ({
    id: f.id,
    form: f.form,
    periodLabel: f.period_label,
    dueDate: f.due_date,
    status: f.status,
    esubmissionRequired: f.esubmission_required,
    esubmission: (f.esubmissions ?? []).find((e) => !e.superseded_at)?.status ?? null,
  }));

  const missingRows = ((missing ?? []) as { issue_date: string; claim: string | null }[]).filter((m) => inYear(String(m.issue_date).slice(0, 10)));
  const tickMap = Object.fromEntries(((ticks ?? []) as { item: CheckItem; done_at: string; note: string | null }[]).map((t) => [t.item, { doneAt: t.done_at, note: t.note }]));
  const inventory = accounts.some((a) => a.active && /inventor/i.test(a.name));

  const input = {
    clientId: id,
    yearEnd,
    today,
    hasBooks: !!books && hasBookkeeping,
    openMonths,
    suggestedEntries: suggested ?? 0,
    trialBalanceDifference: tbDifference,
    closedAt: (closing as { posted_at: string } | null)?.posted_at ?? null,
    ticks: tickMap,
    payroll: forms.has("1601-C") || forms.has("1604-C"),
    released2316: !!release,
    inventory,
    looseLeaf: client.book_type === "loose_leaf",
    filings,
    missing2307: { undecided: missingRows.filter((m) => !m.claim).length, total: missingRows.length },
  };
  const groups = yearEndChecklist(input);
  const { done, total } = progress(groups);
  const close = readyToClose(input);
  const capitals = accounts.filter((a) => a.control === "capital" && a.active);
  const partners = accounts.some((a) => a.control === "retained_earnings") ? [] : capitals.map((a) => ({ id: a.id, name: a.name }));

  return (
    <>
      <PageHeader title={client.name} description={<span className="tabular-nums">{client2?.code} · Year-end {fmtYear(yearEnd)}</span>} />
      <ClientTabs clientId={id} active="year-end" work={work} books={hasBookkeeping} />
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Taxable year" className="flex flex-wrap gap-1">
            {years.map((y) => (
              <Link
                key={y}
                href={`/app/clients/${id}/year-end?year=${y}`}
                aria-current={y === yearEnd ? "page" : undefined}
                className={
                  y === yearEnd
                    ? "rounded-full bg-accent-600 px-3 py-1 text-body-medium text-text-white outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                    : "rounded-full border border-border-button-default px-3 py-1 text-body-medium text-text-secondary outline-none hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                }
              >
                {fmtYear(y)}
              </Link>
            ))}
          </nav>
          <p className="text-body-regular text-text-secondary tabular-nums">{done} of {total} done</p>
        </div>

        {groups.map((g) => (
          <Card key={g.title} title={g.title}>
            <ul className="divide-y divide-separator-border">
              {g.steps.map((s) => (
                <li key={s.key} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={BADGE[s.state].tone}>{BADGE[s.state].label}</Badge>
                      {s.href ? (
                        <Link href={s.href} className="text-body-medium text-text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">{s.label}</Link>
                      ) : (
                        <span className="text-body-medium text-text-primary">{s.label}</span>
                      )}
                    </div>
                    {s.detail && <p className="mt-1 text-body-regular text-text-secondary">{s.detail}</p>}
                  </div>
                  {s.tick && work && <TickForm clientId={id} yearEnd={yearEnd} item={s.tick} done={s.state === "done"} />}
                  {s.key === "closing" && !input.closedAt && (
                    owner ? (
                      close.ready ? <CloseYearForm clientId={id} yearEnd={yearEnd} partners={partners} /> : <span className="text-caption-1-regular text-text-tertiary">{close.why}</span>
                    ) : (
                      <span className="text-caption-1-regular text-text-tertiary">The Owner posts it.</span>
                    )
                  )}
                </li>
              ))}
            </ul>
          </Card>
        ))}

        <Notice tone="waiting">
          The closing entry brings income and expenses to nil against retained earnings (or capital) on {yearEnd}. The year&rsquo;s statements and returns still read the year before closing. To redo it, the Owner reverses it in the{" "}
          <Link href={`/app/clients/${id}/books/journal`} className="underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">journal</Link>.
        </Notice>
      </div>
    </>
  );
}
