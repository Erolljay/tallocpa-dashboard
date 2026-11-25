import Link from "next/link";
import { Suspense } from "react";
import { RiArrowRightSLine, RiCalendarScheduleLine, RiCheckboxCircleLine, RiErrorWarningLine, RiMailLine, RiTimeLine } from "@remixicon/react";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, Card, LinkButton, Skeleton } from "@/components/ui";
import { nextCutoff } from "@/lib/documents/cutoff";
import { showMonth } from "@/lib/documents/labels";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { missingRanges, monthTimeline, type MissingNumber } from "@/lib/cycle/month";
import { financialPosition, monthlySeries, monthsBack, streamProgress, todoList, type BooksSummaryRaw } from "@/lib/portal/home";
import { formatPeso, toCentavos } from "@/lib/returns/money";
import { cx } from "@/utils/cx";
import { BooksChart } from "./_home/books-chart";
import { portalContext, type PortalClient } from "./client-context";
import { MonthComplete, type SentRow } from "./month-complete";

/**
 * Portal Home (rework decision 18): what waits on the client, the progress of the
 * month (Inbox streams, the cutoff, "I've sent everything", the Books lock), their
 * dues, their financial position and six months of income from the Books, and
 * their team. Uploading is on its own page (/portal/upload).
 */
export default function PortalHome(props: PageProps<"/portal">) {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <Home searchParams={props.searchParams} />
    </Suspense>
  );
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const cents = (v: unknown) => toCentavos(v as string | number) ?? 0;

async function Home({ searchParams }: Pick<PageProps<"/portal">, "searchParams">) {
  const sp = await searchParams;
  const { id, supabase, clients } = await portalContext();
  const today = manilaToday();
  const first = id.clients[0];
  if (clients.length === 0) {
    return <p className="rounded-3xl border border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">Your portal is being set up. Please check back soon.</p>;
  }
  const ids = clients.map((c) => c.id);
  const business = clients.find((c) => c.id === one(sp.business)) ?? clients[0];
  const several = clients.length > 1;
  const months = clients.map((client) => ({ client, ...nextCutoff(today, client.submission_cutoff_day) }));
  const periods = [...new Set(months.map((m) => m.month))];
  const thisMonth = `${today.slice(0, 7)}-01`;
  const from = monthsBack(thisMonth, 5);

  const [
    { data: cycles },
    { data: docs },
    { data: payroll },
    { count: returned },
    { data: approvals },
    { data: requests },
    { data: dues },
    { data: verifying },
    checks,
    summaries,
    { data: team },
    decisions,
  ] = await Promise.all([
    supabase.from("document_cycles").select("client_id, period, cutoff_date, nothing_to_submit_at, closed_at, client_confirmed_at, confirmed_documents").in("client_id", ids).in("period", periods),
    supabase.from("documents").select("client_id, document_month, doc_type, status").in("client_id", ids).in("document_month", periods).neq("status", "uploading").not("doc_type", "in", "(filed_return,payment_proof)").limit(5000),
    supabase.from("payroll_submissions").select("client_id, pay_month, status").in("client_id", ids).in("pay_month", periods),
    supabase.from("documents").select("id", { count: "exact", head: true }).in("client_id", ids).eq("status", "returned"),
    // Returns waiting for the client's approval (Prepared → Reviewed → Client approved).
    supabase.from("filing_instances").select("id, client_id, form, period_label, due_date").in("client_id", ids).eq("status", "reviewed").order("due_date"),
    supabase.from("client_requests").select("id, client_id, subject").in("client_id", ids).eq("direction", "to_client").eq("status", "open").order("created_at").limit(10),
    supabase.from("due_balances").select("client_id, open_amount").in("client_id", ids).not("soa_id", "is", null),
    supabase.from("payment_proofs").select("client_id").in("client_id", ids).eq("status", "for_verification"),
    Promise.all(months.map((m) => supabase.rpc("month_check", { p_client: m.client.id, p_period: m.month }))),
    Promise.all(clients.map((c) => supabase.rpc("portal_books_summary", { p_client: c.id, p_from: from, p_to: today }))),
    supabase.rpc("portal_client_team", { p_client: business.id }),
    Promise.all(clients.map((c) => supabase.rpc("missing_2307s", { p_client: c.id }))),
  ]);
  const undecided = decisions.flatMap((d) => (d.data ?? []) as { claim: string | null; closed: boolean; year_ended: boolean }[]).filter((r) => r.year_ended && !r.closed && !r.claim).length;

  const summaryOf = new Map(clients.map((c, i) => [c.id, (summaries[i].data ?? null) as BooksSummaryRaw | null]));
  const openDues = cents((dues ?? []).reduce((a, d) => a + Number(d.open_amount), 0).toFixed(2));
  const pendingProofs = (verifying ?? []).length;
  const nameOf = new Map(clients.map((c) => [c.id, c.name]));
  const prefix = (clientId: string) => (several ? `${nameOf.get(clientId)}: ` : "");

  const todos = todoList({
    returnedDocuments: returned ?? 0,
    returnsToApprove: (approvals ?? []).map((f) => ({ id: f.id, form: `${prefix(f.client_id)}${f.form}`, periodLabel: f.period_label, dueDate: showDate(f.due_date) })),
    requests: (requests ?? []).map((r) => ({ id: r.id, subject: `${prefix(r.client_id)}${r.subject}` })),
    dues: openDues,
    duesLabel: `${formatPeso(openDues)} open${pendingProofs ? " · a payment is being verified" : ""}`,
    missing2307Decisions: undecided,
    missing2307: months.flatMap((m, i) => ((checks[i].data as { cwt?: { party: string; amount: number }[] } | null)?.cwt ?? []).map((w) => ({ party: w.party, amount: cents(w.amount) }))),
  });

  const status = months.map(({ client, month, cutoff, daysLeft }) => {
    const y = (cycles ?? []).find((r) => r.client_id === client.id && r.period === month);
    const ofMonth = (docs ?? []).filter((d) => d.client_id === client.id && d.document_month === month);
    const count = ofMonth.filter((d) => d.doc_type !== "cor").length;
    return {
      client, month, daysLeft,
      cutoff: (y?.cutoff_date as string | undefined) ?? cutoff,
      open: !!y && !y.closed_at,
      nothing: !!y?.nothing_to_submit_at,
      count,
      streams: streamProgress(ofMonth, (payroll ?? []).filter((p) => p.client_id === client.id && p.pay_month === month)),
      locked: (summaryOf.get(client.id)?.locked ?? []).some((l) => l.slice(0, 10) === month),
      confirmedAt: (y?.client_confirmed_at as string | null | undefined) ?? null,
      confirmedCount: (y?.confirmed_documents as number | null | undefined) ?? null,
    };
  });
  // "I've sent everything" for each business with something sent this month (P1).
  const completable = status.filter((x) => x.open && !x.nothing && (x.count > 0 || x.confirmedAt));
  const books = summaryOf.get(business.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-title-1-medium text-text-primary">Hi{first ? `, ${first.fullName.split(" ")[0]}` : ""}</h1>
        <p className="mt-1 text-body-regular text-text-secondary">{clients.map((x) => x.name).join(" · ")}</p>
      </div>

      <Card title="To do">
        {todos.length === 0 ? (
          <p className="flex items-center gap-2 text-body-regular text-text-secondary">
            <RiCheckboxCircleLine aria-hidden className="size-5 text-status-lime-text" /> Nothing is waiting on you. Thank you.
          </p>
        ) : (
          <ul className="-my-2 divide-y divide-separator-border">
            {todos.map((t) => (
              <li key={t.key}>
                <Link href={t.href} className="flex items-center gap-3 py-3 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
                  {t.tone === "blocked" ? (
                    <RiErrorWarningLine aria-hidden className="size-5 shrink-0 text-status-rose-text" />
                  ) : (
                    <RiTimeLine aria-hidden className="size-5 shrink-0 text-status-yellow-text" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-body-medium text-text-primary">{t.title}</span>
                    {t.detail && <span className="block text-caption-1-regular text-text-secondary">{t.detail}</span>}
                  </span>
                  <RiArrowRightSLine aria-hidden className="size-5 shrink-0 text-foreground-icon-tertiary rtl:rotate-180" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {status.map((x) => (
        <Card
          key={x.client.id}
          title={`${several ? `${x.client.name}: ` : ""}${showMonth(x.month)}`}
          actions={x.locked ? <Badge tone="done">Books locked</Badge> : <Badge tone="neutral">Books open</Badge>}
        >
          <p className="mb-4 text-body-regular text-text-secondary">
            {x.nothing
              ? `You told us there was nothing to submit for ${showMonth(x.month)}.`
              : x.confirmedAt
                ? `You confirmed ${showMonth(x.month)} is complete. We are checking it into your books.`
                : <>Documents are due by <span className="text-body-medium text-text-primary">{showDate(x.cutoff)}</span>{x.daysLeft > 0 ? ` — ${x.daysLeft} day${x.daysLeft === 1 ? "" : "s"} left.` : x.daysLeft === 0 ? " — today is the last day." : "."}</>}
            {x.locked ? " The month is locked: its books are final." : ""}
          </p>
          <ul className="space-y-3">
            {x.streams.map((s) => (
              <li key={s.stream} className="space-y-1">
                <div className="flex items-baseline justify-between gap-3 text-body-regular">
                  <span className="text-text-primary">{s.label}</span>
                  <span className="text-caption-1-regular tabular-nums text-text-secondary">
                    {s.received === 0 ? "Nothing sent" : `${s.received} sent · ${s.approved} approved${s.returned ? ` · ${s.returned} returned` : ""}`}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-background-tertiary-default" aria-hidden>
                  <div className="h-full rounded-full bg-accent-500" style={{ width: s.received ? `${Math.round((s.approved / s.received) * 100)}%` : "0%" }} />
                </div>
              </li>
            ))}
          </ul>
          {!x.nothing && !x.confirmedAt && (
            <LinkButton href="/portal/upload" className="mt-4 w-full justify-center">Upload documents</LinkButton>
          )}
        </Card>
      ))}

      {completable.map((x) => (
        <Suspense key={x.client.id} fallback={<Skeleton rows={4} />}>
          <MonthCard client={x.client} several={several} period={x.month} cutoff={x.cutoff} today={today} confirmedAt={x.confirmedAt} confirmedCount={x.confirmedCount} />
        </Suspense>
      ))}

      <Card title="Dues" actions={<Link href="/portal/billing" className="text-body-medium text-button-ghost-foreground hover:underline">Billing</Link>}>
        {openDues > 0 ? (
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-caption-1-regular text-text-secondary">Open on your statement{several ? "s" : ""}</p>
              <p className="text-title-2-medium tabular-nums text-text-primary">{formatPeso(openDues)}</p>
              {pendingProofs > 0 && <p className="text-caption-1-regular text-text-secondary">A payment you sent is being verified.</p>}
            </div>
            <LinkButton href="/portal/billing">Pay</LinkButton>
          </div>
        ) : (
          <p className="text-body-regular text-text-secondary">You&apos;re all paid up.{pendingProofs > 0 ? " A payment you sent is being verified." : ""}</p>
        )}
      </Card>

      {several && (
        <nav aria-label="Business" className="flex flex-wrap gap-2">
          {clients.map((c) => (
            <Link
              key={c.id}
              href={`/portal?business=${c.id}`}
              scroll={false}
              aria-current={c.id === business.id ? "page" : undefined}
              className={cx(
                "rounded-full border px-3 py-1.5 text-body-medium outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                c.id === business.id ? "border-accent-500 bg-accent-50 text-text-primary" : "border-border-button-default text-text-secondary hover:bg-background-secondary-hover",
              )}
            >
              {c.name}
            </Link>
          ))}
        </nav>
      )}

      <BooksCards books={books ?? null} today={today} name={several ? business.name : null} />

      <TeamCard team={(team ?? []) as TeamMember[]} name={several ? business.name : null} bookHref={`/portal/book?business=${business.id}`} />
    </div>
  );
}

/** Financial position and six months of income, from the Books; unlocked months labelled as not final. */
function BooksCards({ books, today, name }: { books: BooksSummaryRaw | null; today: string; name: string | null }) {
  const title = (t: string) => (name ? `${name}: ${t}` : t);
  if (!books?.has_books) {
    return (
      <Card title={title("Your books")}>
        <p className="text-body-regular text-text-secondary">Your cash, receivables, payables and monthly income appear here once we start keeping your books in Tallo.</p>
      </Card>
    );
  }
  const position = financialPosition(books);
  const points = monthlySeries(books, `${today.slice(0, 7)}-01`, 6);
  const tiles = [
    { label: "Cash and bank", value: position.cash },
    { label: "Owed to you", hint: "Receivables", value: position.receivables },
    { label: "You owe", hint: "Payables", value: position.payables },
    { label: "Equity", hint: "Assets less liabilities", value: position.equity },
  ];
  const finalUpTo = [...books.locked].sort().at(-1);
  return (
    <>
      <Card title={title("Financial position")}>
        <p className="mb-4 text-caption-1-regular text-text-tertiary">
          From your books to {showDate(today)}.{" "}
          {finalUpTo ? `Final up to ${showMonth(finalUpTo)}; later months may still change.` : "No month is locked yet, so these figures may still change."}
        </p>
        <dl className="grid grid-cols-2 gap-3">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-2xl bg-background-secondary-default px-3 py-3">
              <dt className="text-caption-1-medium text-text-secondary">{t.label}</dt>
              <dd className={cx("mt-1 truncate text-headline-semibold tabular-nums", t.value < 0 ? "text-text-error-primary" : "text-text-primary")}>{formatPeso(t.value)}</dd>
              {t.hint && <dd className="text-caption-2-medium text-text-tertiary">{t.hint}</dd>}
            </div>
          ))}
        </dl>
      </Card>
      <Card title={title("Last 6 months")} actions={<Link href="/portal/reports" className="text-body-medium text-button-ghost-foreground hover:underline">Reports</Link>}>
        <BooksChart points={points} />
      </Card>
    </>
  );
}

interface TeamMember {
  role: "preparer" | "reviewer";
  full_name: string;
  email: string | null;
  photo_url: string | null;
}

const ROLE = { preparer: "Your bookkeeper", reviewer: "Your reviewer" } as const;
const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

/** The client's preparer and reviewer, and Book a meeting (decision 22): the reviewer's free times, with a Meet link. */
function TeamCard({ team, name, bookHref }: { team: TeamMember[]; name: string | null; bookHref: string }) {
  return (
    <Card title={name ? `${name}: your team` : "Your team"}>
      {team.length === 0 ? (
        <p className="text-body-regular text-text-secondary">Your team is being assigned. We will introduce them here.</p>
      ) : (
        <ul className="space-y-3">
          {team.map((t) => (
            <li key={`${t.role}-${t.full_name}`} className="flex items-center gap-3">
              <Avatar size="lg" src={t.photo_url ?? undefined} alt="" initials={initials(t.full_name)} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-body-medium text-text-primary">{t.full_name}</p>
                <p className="text-caption-1-regular text-text-secondary">{ROLE[t.role]}</p>
              </div>
              {t.email && (
                <a href={`mailto:${t.email}`} className="flex size-11 items-center justify-center rounded-full text-foreground-icon-secondary hover:bg-background-secondary-hover outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring" aria-label={`Email ${t.full_name}`}>
                  <RiMailLine aria-hidden className="size-5" />
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
      {team.length > 0 && (
        <div className="mt-4 border-t border-separator-border pt-4">
          <LinkButton href={bookHref} variant="secondary" className="w-full justify-center">
            <RiCalendarScheduleLine aria-hidden className="size-5" /> Book a meeting
          </LinkButton>
        </div>
      )}
    </Card>
  );
}

const shortDay = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));
const manilaDay = (ts: string) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date(ts));

/** Sent documents by kind, in the order a client thinks of them. */
const KINDS: { label: string; types: string[] }[] = [
  { label: "Sales invoices", types: ["sales_invoice"] },
  { label: "Receipts for purchases and expenses", types: ["purchase_receipt"] },
  { label: "2307s from customers", types: ["bir_2307_received"] },
  { label: "2307s you issued", types: ["bir_2307_issued"] },
  { label: "Other documents", types: ["other"] },
];

/** One business's month: what was sent, the gaps to answer, the confirm step and what happens next. */
async function MonthCard(props: { client: PortalClient; several: boolean; period: string; cutoff: string; today: string; confirmedAt: string | null; confirmedCount: number | null }) {
  const { supabase } = await portalContext();
  const { client, period } = props;
  const [check, { data: docs }, { data: payroll }, { data: filings }, { data: hols }] = await Promise.all([
    supabase.rpc("month_check", { p_client: client.id, p_period: period }),
    supabase.from("documents").select("doc_type, status").eq("client_id", client.id).eq("document_month", period).not("status", "in", "(uploading)").not("doc_type", "in", "(filed_return,payment_proof,cor)").limit(5000),
    supabase.from("payroll_submissions").select("status").eq("client_id", client.id).eq("pay_month", period),
    supabase.from("filing_instances").select("form, period_label, period_start, period_end, due_date, status").eq("client_id", client.id).lte("period_start", period).gte("period_end", period).neq("status", "proof_uploaded"),
    supabase.from("holidays").select("date"),
  ]);
  const c = (check.data ?? { missing: [], cwt: [], reading: 0 }) as { missing: MissingNumber[]; cwt: { party: string; amount: number }[]; reading: number };
  const sent: SentRow[] = KINDS.map((k) => {
    const of = (docs ?? []).filter((d) => k.types.includes(d.doc_type));
    return { label: k.label, count: of.length, checked: of.filter((d) => d.status === "posted").length };
  }).filter((r) => r.count > 0);
  if ((payroll ?? []).length) sent.push({ label: "Payroll register", count: payroll!.length, checked: payroll!.filter((p) => p.status === "posted").length });
  const holidays = new Set((hols ?? []).map((h: { date: string }) => String(h.date).slice(0, 10)));
  const confirmedOn = props.confirmedAt ? manilaDay(props.confirmedAt) : null;
  const timeline = monthTimeline({
    cutoff: props.cutoff,
    confirmedOn,
    cutoffDay: client.submission_cutoff_day,
    holidays,
    filings: (filings ?? []).map((f) => ({ form: f.form, periodLabel: f.period_label, periodStart: f.period_start, periodEnd: f.period_end, dueDate: f.due_date, status: f.status })),
  });
  const daysLeft = Math.round((Date.parse(`${props.cutoff}T00:00:00Z`) - Date.parse(`${props.today}T00:00:00Z`)) / 86_400_000);
  return (
    <MonthComplete
      clientId={client.id}
      business={props.several ? client.name : null}
      period={period}
      month={showMonth(period)}
      cutoff={shortDay(props.cutoff)}
      daysLeft={daysLeft}
      canUndo={props.today <= props.cutoff}
      confirmed={confirmedOn ? { on: shortDay(confirmedOn), count: props.confirmedCount } : null}
      sent={sent}
      ranges={missingRanges(c.missing)}
      cwt={c.cwt}
      reading={c.reading}
      timeline={timeline.map((t) => ({ ...t, date: shortDay(t.date) }))}
    />
  );
}
