import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { COA_TEMPLATES } from "@/lib/ledger/coa";
import { booksAccess, loadAccounts, loadEntries, loadOpening, loadTrialBalance } from "@/lib/ledger/data";
import { BOOKS, ENTRY_SOURCES, TEMPLATE_FOR_TAXPAYER, TEMPLATES, type TemplateCode } from "@/lib/ledger/types";
import { formatAmount } from "@/lib/returns/money";
import { OpeningUpload, ReverseForm, SetupForm } from "./forms";

export default function BooksPage(props: PageProps<"/app/clients/[id]/books">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Books params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));
const dayBefore = (iso: string) => new Date(Date.parse(`${iso}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);
const monthEnd = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
};

async function Books({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/books">, "params" | "searchParams">) {
  const { id } = await params;
  const q = await searchParams;
  const { supabase, client, books } = await booksAccess(id);
  const back = <LinkButton href={`/app/clients/${id}`} variant="ghost">Back to client</LinkButton>;

  if (!books) {
    const { data: eng } = await supabase.from("engagements").select("id").eq("client_id", id).eq("service_line", "bookkeeping").eq("status", "active").limit(1);
    const counts = Object.fromEntries((Object.keys(TEMPLATES) as TemplateCode[]).map((t) => [t, COA_TEMPLATES[t].length])) as Record<TemplateCode, number>;
    return (
      <>
        <PageHeader title="Books" description={<>{client.name}: set up the double-entry books from a chart-of-accounts template.</>} actions={back} />
        <Card title="Set up books">
          {eng?.length ? (
            <SetupForm clientId={id} defaultTemplate={TEMPLATE_FOR_TAXPAYER[client.taxpayer_type] ?? "stock_corporation"} counts={counts} />
          ) : (
            <Notice tone="waiting">Books are kept for clients with an active Bookkeeping engagement. Add one on the client page first.</Notice>
          )}
        </Card>
      </>
    );
  }

  const asOfParam = typeof q.to === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(q.to) ? q.to : null;
  const today = new Date().toISOString().slice(0, 7);
  const toMonth = asOfParam ?? (today < books.booksStart.slice(0, 7) ? books.booksStart.slice(0, 7) : today);
  const to = monthEnd(toMonth);
  const from = `${toMonth.slice(0, 4)}-01-01` < books.booksStart ? dayBefore(books.booksStart) : `${toMonth.slice(0, 4)}-01-01`;
  const [accounts, opening, tb, entries] = await Promise.all([
    loadAccounts(supabase, id),
    loadOpening(supabase, id),
    loadTrialBalance(supabase, id, from, to),
    loadEntries(supabase, id),
  ]);
  const accountName = new Map(accounts.map((a) => [a.id, `${a.code} · ${a.name}`]));
  const shown = tb.filter((r) => r.closing !== 0 || r.debit !== 0 || r.credit !== 0);
  const totalDr = shown.reduce((s, r) => s + Math.max(r.closing, 0), 0);
  const totalCr = shown.reduce((s, r) => s + Math.max(-r.closing, 0), 0);
  const openingAsOf = dayBefore(books.booksStart);

  return (
    <>
      <PageHeader
        title="Books"
        description={<>{client.name} · {TEMPLATES[books.template]} chart · books from {fmtDate(books.booksStart)}</>}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <LinkButton href={`/app/clients/${id}/books/accounts`} variant="secondary">Chart of accounts</LinkButton>
            <LinkButton href={`/app/clients/${id}/books/journal/new`} variant="secondary">New journal entry</LinkButton>
            {back}
          </div>
        }
      />
      <div className="space-y-6">
        <Card
          title={`Opening balances as of ${fmtDate(openingAsOf)}`}
          actions={opening.entry ? <Badge tone="done">Entered</Badge> : <Badge tone="waiting">Not entered</Badge>}
        >
          <div className="space-y-4">
            <p className="text-body-regular text-text-secondary">
              Download the workbook (the chart is listed{opening.entry ? ", with the balances already saved" : ""}), enter each account&rsquo;s balance from Manager.io or the 2026 working papers, list the unpaid customer and supplier invoices behind Accounts Receivable and Accounts Payable, then upload it. Uploading again replaces the opening balances.
            </p>
            <LinkButton href={`/app/clients/${id}/books/export?kind=opening`} variant="secondary" size="sm" prefetch={false}>Download workbook</LinkButton>
            <OpeningUpload clientId={id} />
          </div>
        </Card>

        <Card
          title={`Trial balance as of ${fmtDate(to)}`}
          actions={
            <form className="flex items-center gap-2" action={`/app/clients/${id}/books`}>
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
    </>
  );
}
