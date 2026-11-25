import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, LinkButton, Notice, Skeleton } from "@/components/ui";
import { AGING, aging } from "@/lib/ledger/arap";
import { booksAccess, loadAccounts, loadAmendments, loadBooksMonths, loadEntries, loadOpenItems, loadOpening, loadTrialBalance, monthState, type AmendmentStatus } from "@/lib/ledger/data";
import { BOOK_LOCK_FORMS, BOOKS, ENTRY_SOURCES, TEMPLATES } from "@/lib/ledger/types";
import { formatAmount } from "@/lib/returns/money";
import { OpeningChecklist } from "../opening-checklist";
import { BooksFrame } from "../books-frame";
import { booksMonth } from "@/lib/books/ui";
import { manilaToday } from "@/lib/filings/run";
import { AmendmentDecision, AmendmentRequestForm, ArapDecision, ArapUpload, BookPicker, ConfirmAllButton, ConfirmButton, OpeningUpload, PermitForm, RelockForm, ReverseForm } from "../forms";

export default function BooksToolsPage(props: PageProps<"/app/clients/[id]/books/tools">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Books params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const fmtMonth = (d: string) => new Intl.DateTimeFormat("en-PH", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${d.slice(0, 10)}T00:00:00Z`));
const AMENDMENT_BADGE: Record<AmendmentStatus, { tone: "waiting" | "progress" | "blocked" | "done"; label: string }> = {
  requested: { tone: "waiting", label: "Waiting for the Owner" },
  reopened: { tone: "progress", label: "Reopened" },
  rejected: { tone: "blocked", label: "Rejected" },
  relocked: { tone: "done", label: "Locked again" },
};
const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));
const dayBefore = (iso: string) => new Date(Date.parse(`${iso}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);
const monthEnd = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
};

async function Books({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/books/tools">, "params" | "searchParams">) {
  const { id } = await params;
  const q = await searchParams;
  const { supabase, client, books, me } = await booksAccess(id);

  if (!books) redirect(`/app/clients/${id}/books`);

  const asOfParam = typeof q.to === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(q.to) ? q.to : null;
  const today = new Date().toISOString().slice(0, 7);
  const toMonth = asOfParam ?? (today < books.booksStart.slice(0, 7) ? books.booksStart.slice(0, 7) : today);
  const to = monthEnd(toMonth);
  const from = `${toMonth.slice(0, 4)}-01-01` < books.booksStart ? dayBefore(books.booksStart) : `${toMonth.slice(0, 4)}-01-01`;
  const todayIso = new Date().toISOString().slice(0, 10);
  const [accounts, opening, tb, entries, suggested, openItems, { data: pendingUpdates }, months, amendments, { data: filedReturns }, { data: reviewerOf }] = await Promise.all([
    loadAccounts(supabase, id),
    loadOpening(supabase, id),
    loadTrialBalance(supabase, id, from, to),
    loadEntries(supabase, id),
    loadEntries(supabase, id, 200, true),
    loadOpenItems(supabase, id),
    supabase.from("arap_updates").select("id, month, rows, submitted_at").eq("client_id", id).eq("status", "submitted").order("submitted_at"),
    loadBooksMonths(supabase, id, `${today}-01`),
    loadAmendments(supabase, id),
    supabase.from("filing_instances").select("id, form, period_label, period_start").eq("client_id", id).in("form", [...BOOK_LOCK_FORMS])
      .in("status", ["filed", "paid", "proof_uploaded"]).gte("period_end", books.booksStart).order("period_start", { ascending: false }).limit(60),
    supabase.from("staff_assignments").select("user_id").eq("client_id", id).eq("user_id", me.userId).eq("role", "reviewer").limit(1),
  ]);
  // Taxable years ended since the books started, newest first, with their closing entry if any.
  const yearEnds: string[] = [];
  for (let y = Number(todayIso.slice(0, 4)); y >= Number(books.booksStart.slice(0, 4)) - 1; y--) {
    const end = new Date(Date.UTC(y, client.fiscal_year_end_month, 0)).toISOString().slice(0, 10);
    if (end < todayIso && end >= books.booksStart) yearEnds.push(end);
  }
  const { data: closings } = yearEnds.length
    ? await supabase.from("journal_entries").select("id, entry_date, posted_at").eq("client_id", id).eq("source", "closing").eq("status", "posted").in("entry_date", yearEnds)
    : { data: [] };
  const closedOn = new Map(((closings ?? []) as { entry_date: string; posted_at: string }[]).map((c) => [c.entry_date, c.posted_at]));
  const capitals = accounts.filter((a) => a.control === "capital" && a.active);
  const partners = accounts.some((a) => a.control === "retained_earnings") ? [] : capitals.map((a) => ({ id: a.id, name: a.name }));
  const isOwner = me.staff.role === "owner";

  const canAmend = isOwner || (reviewerOf ?? []).length > 0;
  const inProgress = new Set(amendments.filter((a) => a.status === "requested" || a.status === "reopened").map((a) => a.filingId));
  const amendable = ((filedReturns ?? []) as { id: string; form: string; period_label: string }[])
    .filter((f) => !inProgress.has(f.id))
    .map((f) => ({ id: f.id, label: `${f.form} ${f.period_label}` }));
  const lockedCount = months.filter((m) => monthState(m) === "locked").length;
  // The AR and AP control accounts against the open items (all dates: open items are as of now).
  const { data: allTb } = await supabase.rpc("trial_balance", { p_client: id, p_from: "1900-01-01", p_to: "9999-12-31" });
  const closingOf = (control: "ar" | "ap") => {
    const a = accounts.find((x) => x.control === control);
    const r = ((allTb ?? []) as { account_id: string; closing: string }[]).find((x) => x.account_id === a?.id);
    return Math.round(Number(r?.closing ?? 0) * 100);
  };
  const sumOpen = (kind: "receivable" | "payable") => openItems.filter((i) => i.kind === kind).reduce((s, i) => s + i.balance, 0);
  const tieOut = [
    { label: "Accounts Receivable", ledger: closingOf("ar"), open: sumOpen("receivable") },
    { label: "Accounts Payable", ledger: -closingOf("ap"), open: sumOpen("payable") },
  ];
  const lastMonthStart = (() => { const d = new Date(`${todayIso.slice(0, 7)}-01T00:00:00Z`); d.setUTCMonth(d.getUTCMonth() - 1); const m = d.toISOString().slice(0, 10); return m < books.booksStart ? books.booksStart : m; })();
  const lastMonth = (() => { const d = new Date(`${todayIso.slice(0, 7)}-01T00:00:00Z`); d.setUTCMonth(d.getUTCMonth() - 1); return d.toISOString().slice(0, 7); })();
  const accountName = new Map(accounts.map((a) => [a.id, `${a.code} · ${a.name}`]));
  const shown = tb.filter((r) => r.closing !== 0 || r.debit !== 0 || r.credit !== 0);
  const totalDr = shown.reduce((s, r) => s + Math.max(r.closing, 0), 0);
  const totalCr = shown.reduce((s, r) => s + Math.max(-r.closing, 0), 0);
  const openingAsOf = dayBefore(books.booksStart);

  const month = booksMonth(typeof q.month === "string" ? q.month : "", manilaToday(), books.booksStart);

  return (
    <BooksFrame supabase={supabase} clientId={id} clientName={client.name} booksStart={books.booksStart} month={month} active="settings" at="/tools">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-title-2-medium text-text-primary">Ledger tools</h2>
          <p className="mt-1 text-body-regular text-text-secondary">{TEMPLATES[books.template]} chart · books from {fmtDate(books.booksStart)}. Opening balances, the period lock and amendments, year-end closing, the AR/AP update and every journal entry.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <LinkButton href={`/app/clients/${id}/books/accounts`} variant="secondary" size="sm">Chart of accounts</LinkButton>
          <LinkButton href={`/app/clients/${id}/books/journal/new`} variant="secondary" size="sm">New journal entry</LinkButton>
        </div>
      </div>
      <div className="space-y-6">
        {suggested.length > 0 && (
          <Card title="Suggested entries to confirm" actions={<ConfirmAllButton clientId={id} count={suggested.length} />}>
            <p className="mb-3 text-body-regular text-text-secondary">From approved documents. Check the account titles; to change one, open the document and pick another title.</p>
            <ul className="divide-y divide-separator-border">
              {suggested.map((e) => (
                <li key={e.id} className="py-3 first:pt-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="tabular-nums text-text-secondary">{fmtDate(e.date)}</span>
                    <span className="min-w-0 flex-1 text-text-primary">{e.memo}</span>
                    <span className="text-caption-1-regular text-text-tertiary">{BOOKS[e.book]}</span>
                    <ConfirmButton clientId={id} entryId={e.id} />
                  </div>
                  <table className="mt-1 w-full text-body-regular">
                    <tbody>
                      {e.lines.map((l) => (
                        <tr key={l.lineNo}>
                          <td className={l.credit > 0 ? "py-0.5 ps-8 text-text-secondary" : "py-0.5 text-text-primary"}>{accountName.get(l.accountId)}</td>
                          <td className="w-32 py-0.5 text-end tabular-nums">{l.debit ? formatAmount(l.debit) : ""}</td>
                          <td className="w-32 py-0.5 text-end tabular-nums">{l.credit ? formatAmount(l.credit) : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <div id="books-of-account" className="scroll-mt-6">
        <Card title="Books of account">
          <div className="space-y-4">
            <p className="text-body-regular text-text-secondary">
              {client.book_type === "manual"
                ? "This client keeps manual bound books: print the pages and copy them into the books."
                : "This client keeps loose-leaf books: print the pages for the period, then bind them at year end."}{" "}
              Page numbers continue from the start of the taxable year.
            </p>
            <BookPicker clientId={id} defaultFrom={`${lastMonthStart}`} defaultTo={monthEnd(lastMonthStart.slice(0, 7))} />
            {client.book_type !== "manual" && <PermitForm clientId={id} permit={books.permit} />}
          </div>
        </Card>
        </div>

        <div id="period-lock" className="scroll-mt-6" />
        <Card
          title="Period lock"
          actions={<span className="text-body-regular text-text-secondary">{lockedCount} of {months.length} month{months.length === 1 ? "" : "s"} locked</span>}
        >
          <div className="space-y-5">
            <p className="text-body-regular text-text-secondary">
              A month locks once a return covering it is filed (withholding, VAT or percentage tax, income tax). Nothing is posted to a locked month: correct it by reversing in an open month, or ask for an amendment, which the Owner approves. Documents dated in a locked month are booked on the next open month of the taxable year.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {months.map((m) => {
                const st = monthState(m);
                return (
                  <li key={m.month} className="flex items-start justify-between gap-3 rounded-xl px-3 py-2 ring-1 ring-border-button-default ring-inset">
                    <div className="min-w-0">
                      <div className="text-body-medium text-text-primary">{fmtMonth(m.month)}</div>
                      {m.filed && <div className="truncate text-caption-1-regular text-text-tertiary" title={m.filed}>{m.filed}</div>}
                    </div>
                    {st === "open" ? <Badge tone="neutral">Open</Badge> : st === "locked" ? <Badge tone="done">Locked</Badge> : <Badge tone="progress">Reopened</Badge>}
                  </li>
                );
              })}
            </ul>

            {amendments.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-headline-medium text-text-primary">Amendments</h3>
                <ul className="divide-y divide-separator-border">
                  {amendments.map((a) => (
                    <li key={a.id} className="space-y-1.5 py-3 first:pt-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-body-medium text-text-primary">{a.filing}</span>
                        <span className="text-caption-1-regular text-text-tertiary">{fmtMonth(a.periodStart)}{a.periodStart.slice(0, 7) !== a.periodEnd.slice(0, 7) ? ` – ${fmtMonth(a.periodEnd)}` : ""}</span>
                        <Badge tone={AMENDMENT_BADGE[a.status].tone}>{AMENDMENT_BADGE[a.status].label}</Badge>
                      </div>
                      <p className="text-body-regular text-text-secondary">
                        {a.reason} <span className="text-text-tertiary">· {a.requestedBy ?? "Someone"}, {fmtDate(a.requestedAt.slice(0, 10))}</span>
                      </p>
                      {a.status === "rejected" && <p className="text-body-regular text-text-secondary">Rejected by {a.decidedBy ?? "the Owner"}: {a.decisionNote}</p>}
                      {a.status === "relocked" && (
                        <p className="text-body-regular text-text-secondary">
                          Changed: {a.changesNote} <span className="text-text-tertiary">· locked again by {a.relockedBy ?? "—"}{a.relockedAt ? `, ${fmtDate(a.relockedAt.slice(0, 10))}` : ""}</span>
                        </p>
                      )}
                      {a.status === "requested" && isOwner && <AmendmentDecision clientId={id} amendmentId={a.id} />}
                      {a.status === "reopened" && (
                        <>
                          <p className="text-caption-1-regular text-text-tertiary">
                            Approved by {a.decidedBy ?? "the Owner"}. Post the corrections, then{" "}
                            <Link href={`/app/filings/${a.filingId}`} className="underline">start the amended return</Link> from the filed return; filing it locks the months again (or lock them here).
                          </p>
                          {canAmend && <RelockForm clientId={id} amendmentId={a.id} />}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {canAmend && amendable.length > 0 && (
              <div className="space-y-2 border-t border-separator-border pt-4">
                <h3 className="text-headline-medium text-text-primary">Reopen a filed return&rsquo;s months</h3>
                <AmendmentRequestForm clientId={id} filings={amendable} owner={isOwner} />
              </div>
            )}
          </div>
        </Card>

        <div id="year-end" className="scroll-mt-6" />
        {yearEnds.length > 0 && (
          <Card title="Year-end closing">
            <div className="space-y-3">
              <p className="text-body-regular text-text-secondary">
                Closing brings the year&rsquo;s income and expenses to nil against{" "}
                {partners.length > 1 ? "the partners\u2019 capital, by their shares" : partners.length === 1 ? "the owner\u2019s capital (with the drawings)" : "retained earnings"}. The year&rsquo;s statements and returns still read the year before closing. Close after the year&rsquo;s adjustments; reverse the closing entry to close again.
              </p>
              <ul className="divide-y divide-separator-border">
                {yearEnds.map((end) => (
                  <li key={end} className="flex flex-wrap items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                    <span className="text-body-medium text-text-primary">Year ended {fmtDate(end)}</span>
                    {closedOn.has(end) ? (
                      <Badge tone="done">Closed {fmtDate(closedOn.get(end)!.slice(0, 10))}</Badge>
                    ) : (
                      <Link href={`/app/clients/${id}/year-end?year=${end}`} className="text-body-regular text-button-ghost-foreground hover:underline">
                        {isOwner ? "Close on the Year-end page" : "On the Year-end page (the Owner closes)"}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        <div id="arap" className="scroll-mt-6" />
        <Card title="Receivables and payables">
          <div className="space-y-6">
            {tieOut.some((t) => t.ledger !== t.open) && (
              <Notice tone="blocked">
                {tieOut.filter((t) => t.ledger !== t.open).map((t) => `${t.label} in the ledger (${formatAmount(t.ledger)}) differs from the open invoices (${formatAmount(t.open)}). `)}
                Post entries that touch AR or AP from documents or the AR/AP update, not by hand.
              </Notice>
            )}
            {(["receivable", "payable"] as const).map((kind) => {
              const rows = aging(openItems, kind, todayIso);
              const total = rows.reduce((s, r) => s + r.total, 0);
              return (
                <div key={kind}>
                  <h3 className="mb-2 text-headline-medium text-text-primary">{kind === "receivable" ? "Receivables" : "Payables"} · {formatAmount(total)}</h3>
                  {rows.length === 0 ? (
                    <p className="text-body-regular text-text-secondary">None open.</p>
                  ) : (
                    <div className="-mx-2 overflow-x-auto">
                      <table className="w-full min-w-[40rem] text-body-regular">
                        <thead className="text-body-medium text-text-tertiary">
                          <tr>
                            <th scope="col" className="px-2 py-1.5 text-start">{kind === "receivable" ? "Customer" : "Supplier"}</th>
                            {AGING.map((h) => <th key={h} scope="col" className="px-2 py-1.5 text-end">{h}</th>)}
                            <th scope="col" className="px-2 py-1.5 text-end">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r) => (
                            <tr key={r.partyName} className="border-t border-separator-border">
                              <td className="px-2 py-1.5 text-text-primary">{r.partyName}</td>
                              {r.buckets.map((b, i) => <td key={i} className="px-2 py-1.5 text-end tabular-nums text-text-secondary">{b ? formatAmount(b) : ""}</td>)}
                              <td className="px-2 py-1.5 text-end tabular-nums text-text-primary">{formatAmount(r.total)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="space-y-3 border-t border-separator-border pt-4">
              <h3 className="text-headline-medium text-text-primary">Monthly AR/AP update</h3>
              <p className="text-body-regular text-text-secondary">
                Download the workbook for the month: every open invoice is listed. Fill in what was collected and paid (amount, date, cash or bank account, reference), then upload it. Collections post to the Cash Receipts Book, payments to the Cash Disbursements Book.
              </p>
              <ArapUpload clientId={id} defaultMonth={lastMonth < books.booksStart.slice(0, 7) ? books.booksStart.slice(0, 7) : lastMonth} />
              {(pendingUpdates ?? []).length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-body-medium text-text-primary">Sent by the client, waiting for you</h4>
                  <ul className="divide-y divide-separator-border">
                    {pendingUpdates!.map((u) => (
                      <li key={u.id} className="flex flex-wrap items-center justify-between gap-3 py-2">
                        <span className="text-body-regular text-text-secondary">{u.month.slice(0, 7)} · {(u.rows as unknown[]).length} row(s) · sent {fmtDate(u.submitted_at.slice(0, 10))}</span>
                        <ArapDecision clientId={id} updateId={u.id} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Card>

        <OpeningChecklist access={{ supabase, client, books, me }} accounts={accounts} balances={opening.balances} entered={Boolean(opening.entry)} />

        <span id="opening" aria-hidden className="block" />
        <Card
          title={`Opening balances as of ${fmtDate(openingAsOf)}`}
          actions={opening.entry ? <Badge tone="done">Entered</Badge> : <Badge tone="waiting">Not entered</Badge>}
        >
          <div className="space-y-4">
            <p className="text-body-regular text-text-secondary">
              Download the workbook (the chart is listed{opening.entry ? ", with the balances already saved" : ""}), enter each account&rsquo;s balance as of {fmtDate(openingAsOf)} from the previous books or working papers (for a mid-year cut-off, income and expenses for the year to date too), list the unpaid customer and supplier invoices behind Accounts Receivable and Accounts Payable, then upload it. Uploading again replaces the opening balances.
            </p>
            <LinkButton href={`/app/clients/${id}/books/export?kind=opening`} variant="secondary" size="sm" prefetch={false}>Download workbook</LinkButton>
            <OpeningUpload clientId={id} />
          </div>
        </Card>

        <div id="trial-balance" className="scroll-mt-6" />
        <Card
          title={`Trial balance as of ${fmtDate(to)}`}
          actions={
            <form className="flex items-center gap-2" action={`/app/clients/${id}/books/tools#trial-balance`}>
              <label htmlFor="to" className="text-body-regular text-text-secondary">Month</label>
              <input id="to" name="to" type="month" defaultValue={toMonth} className="h-9 rounded-2lg bg-background-tertiary-default px-2 text-body-regular text-text-primary ring-1 ring-border-button-default ring-inset" />
              <button type="submit" className="text-body-medium text-text-primary hover:underline">Show</button>
            </form>
          }
        >
          {shown.length === 0 ? (
            <p className="text-body-regular text-text-secondary">No balances yet. Enter the opening balances first.</p>
          ) : (
            <div className="-mx-2 overflow-x-auto">
              <table className="w-full min-w-[36rem] text-body-regular">
                <thead className="border-b border-separator-border text-body-medium text-text-tertiary">
                  <tr>
                    <th scope="col" className="px-2 py-2 text-start">Code</th>
                    <th scope="col" className="px-2 py-2 text-start">Account</th>
                    <th scope="col" className="px-2 py-2 text-end">Debit</th>
                    <th scope="col" className="px-2 py-2 text-end">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((r) => (
                    <tr key={r.accountId} className="border-t border-separator-border first:border-t-0">
                      <td className="px-2 py-1.5 tabular-nums text-text-secondary">{r.code}</td>
                      <td className="px-2 py-1.5 text-text-primary">{r.name}</td>
                      <td className="px-2 py-1.5 text-end tabular-nums">{r.closing > 0 ? formatAmount(r.closing) : ""}</td>
                      <td className="px-2 py-1.5 text-end tabular-nums">{r.closing < 0 ? formatAmount(-r.closing) : ""}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-separator-border text-body-medium text-text-primary">
                  <tr>
                    <td className="px-2 py-2" colSpan={2}>Total</td>
                    <td className="px-2 py-2 text-end tabular-nums">{formatAmount(totalDr)}</td>
                    <td className="px-2 py-2 text-end tabular-nums">{formatAmount(totalCr)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </Card>

        <div id="journal" className="scroll-mt-6" />
        <Card title="Journal entries" actions={<span className="text-body-regular text-text-secondary">Latest {entries.length}</span>}>
          {entries.length === 0 ? (
            <p className="text-body-regular text-text-secondary">No entries yet.</p>
          ) : (
            <ul className="divide-y divide-separator-border">
              {entries.map((e) => {
                const total = e.lines.reduce((s, l) => s + l.debit, 0);
                return (
                  <li key={e.id} className="py-3 first:pt-0">
                    <details>
                      <summary className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="tabular-nums text-text-secondary">{fmtDate(e.date)}</span>
                        <span className="min-w-0 flex-1 text-text-primary">{e.memo}{e.reference ? <span className="text-text-tertiary"> · {e.reference}</span> : null}</span>
                        <span className="text-caption-1-regular text-text-tertiary">{BOOKS[e.book]} · {ENTRY_SOURCES[e.source]}</span>
                        <span className="tabular-nums text-text-primary">{formatAmount(total)}</span>
                        {e.status === "reversed" && <Badge tone="neutral">Reversed</Badge>}
                      </summary>
                      <table className="mt-2 w-full text-body-regular">
                        <tbody>
                          {e.lines.map((l) => (
                            <tr key={l.lineNo}>
                              <td className={l.credit > 0 ? "py-1 ps-8 text-text-secondary" : "py-1 text-text-primary"}>
                                {accountName.get(l.accountId)}
                                {l.description && <span className="text-text-tertiary"> · {l.description}</span>}
                              </td>
                              <td className="w-32 py-1 text-end tabular-nums">{l.debit ? formatAmount(l.debit) : ""}</td>
                              <td className="w-32 py-1 text-end tabular-nums">{l.credit ? formatAmount(l.credit) : ""}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {e.status === "posted" && e.source !== "opening" && (
                        <div className="mt-2"><ReverseForm clientId={id} entryId={e.id} minDate={e.date} /></div>
                      )}
                    </details>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="mt-4 text-caption-1-regular text-text-tertiary">
            Posted entries never change; correct one by reversing it and posting a new entry. <Link href={`/app/clients/${id}/books/journal/new`} className="hover:underline">New journal entry</Link>
          </p>
        </Card>
      </div>
    </BooksFrame>
  );
}
