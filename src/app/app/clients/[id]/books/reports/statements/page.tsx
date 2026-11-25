import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FinancialStatementsView } from "@/components/statement/financial-statements-view";
import { Badge, Card, Notice, Skeleton } from "@/components/ui";
import { booksAccess, loadReleasedReports, loadStatements } from "@/lib/ledger/data";
import { periodTitle, REPORT_KINDS, type ReportKind } from "@/lib/ledger/statements";
import { formatAmount } from "@/lib/returns/money";
import { ReleaseReportForm, WithdrawReportButton } from "../../forms";
import { BooksFrame } from "../../books-frame";
import { booksMonth } from "@/lib/books/ui";
import { manilaToday } from "@/lib/filings/run";

export default function ReportsPage(props: PageProps<"/app/clients/[id]/books/reports/statements">) {
  return (
    <Suspense fallback={<Skeleton rows={12} />}>
      <Reports params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d.slice(0, 10)}T00:00:00Z`));

/** The month before today's, as "YYYY-MM". */
function lastMonth(): string {
  const d = new Date();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() - 1);
  return d.toISOString().slice(0, 7);
}

async function Reports({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/books/reports/statements">, "params" | "searchParams">) {
  const { id } = await params;
  const q = await searchParams;
  const { supabase, client, books, me } = await booksAccess(id);
  if (!books) notFound();
  const kind: ReportKind = typeof q.kind === "string" && q.kind in REPORT_KINDS ? (q.kind as ReportKind) : "monthly";
  const startMonth = books.booksStart.slice(0, 7);
  const month = booksMonth(typeof q.month === "string" ? q.month : "", manilaToday(), books.booksStart);
  const requested = typeof q.to === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(q.to) ? q.to : typeof q.month === "string" ? month : lastMonth();
  const endMonth = requested < startMonth ? startMonth : requested;
  const owner = me.staff.role === "owner";

  const [result, released] = await Promise.all([loadStatements(supabase, client, kind, endMonth), loadReleasedReports(supabase, id)]);
  const current = "error" in result && result.error ? undefined : released.find((r) => r.kind === kind && r.periodEnd === result.fs?.periodEnd);

  return (
    <BooksFrame supabase={supabase} clientId={id} clientName={client.name} booksStart={books.booksStart} month={month} active="reports" sub="/statements" query={{ kind: q.kind as string | undefined }}>
      <div className="print:hidden">
        <h2 className="text-title-2-medium text-text-primary">Financial statements</h2>
        <p className="mt-1 text-body-regular text-text-secondary">From the books, by each account&rsquo;s FS line.</p>
      </div>
      <div className="space-y-6">
        <Card className="print:hidden">
          <form className="flex flex-wrap items-end gap-3" action={`/app/clients/${id}/books/reports/statements`}>
            <label className="flex flex-col gap-1.5 text-body-medium text-text-primary">
              Report
              <select name="kind" defaultValue={kind} className="h-9 rounded-2lg bg-background-tertiary-default px-2 text-body-regular text-text-primary ring-1 ring-border-button-default ring-inset">
                {(Object.keys(REPORT_KINDS) as ReportKind[]).map((k) => <option key={k} value={k}>{REPORT_KINDS[k]}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-body-medium text-text-primary">
              Ending month
              <input type="month" name="to" defaultValue={endMonth} min={startMonth} className="h-9 rounded-2lg bg-background-tertiary-default px-2 text-body-regular text-text-primary ring-1 ring-border-button-default ring-inset" />
            </label>
            <button type="submit" className="h-9 text-body-medium text-text-primary hover:underline">Show</button>
          </form>
          <p className="mt-3 text-caption-1-regular text-text-tertiary">
            Quarters and years follow the client&rsquo;s taxable year (year ending month {client.fiscal_year_end_month}). Clients see a report in the portal only after the Owner releases it.
          </p>
        </Card>

        {"error" in result ? (
          <Notice tone="blocked">{result.error}</Notice>
        ) : (
          <>
            <div className="space-y-3 print:hidden">
              {result.fs.difference !== 0 && (
                <Notice tone="blocked">Total assets differ from total liabilities and equity by {formatAmount(result.fs.difference)}. Check the books before using these statements.</Notice>
              )}
              {(result.fs.cashDifference ?? []).some((d) => d !== 0) && (
                <Notice tone="waiting">
                  The statement of cash flows does not reconcile to the change in cash ({result.fs.cashDifference.map(formatAmount).join(" / ")}). Check the cash-flow class of cash accounts in the chart of accounts.
                </Notice>
              )}
              {result.fs.unclassified.length > 0 && (
                <Notice tone="blocked">
                  These accounts have no known FS line and show as &ldquo;Unclassified&rdquo;: {result.fs.unclassified.join(", ")}.{" "}
                  <Link href={`/app/clients/${id}/books/accounts`} className="font-medium underline">Chart of accounts</Link>
                </Notice>
              )}
              {result.suggested > 0 && (
                <Notice tone="waiting">
                  {result.suggested} suggested entr{result.suggested === 1 ? "y is" : "ies are"} not posted yet for the year to date and are not in these figures.{" "}
                  <Link href={`/app/clients/${id}/books/tools`} className="font-medium underline">Confirm them</Link>
                </Notice>
              )}
            </div>

            <Card title="Release to the client" className="print:hidden" actions={current ? <Badge tone="done">Released {fmtDate(current.releasedAt)}</Badge> : <Badge>Not released</Badge>}>
              {owner ? (
                <ReleaseReportForm clientId={id} kind={kind} endMonth={endMonth} released={!!current} />
              ) : (
                <p className="text-body-regular text-text-secondary">The Owner releases reports to the client&rsquo;s portal. The client sees them exactly as released.</p>
              )}
            </Card>

            <FinancialStatementsView fs={result.fs} />
          </>
        )}

        <Card title="Released to the client" className="print:hidden">
          {released.length === 0 ? (
            <p className="text-body-regular text-text-secondary">Nothing released yet.</p>
          ) : (
            <ul className="divide-y divide-separator-border">
              {released.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span className="min-w-0">
                    <Link href={`/app/clients/${id}/books/reports/statements?kind=${r.kind}&to=${r.periodEnd.slice(0, 7)}`} className="text-body-medium text-text-primary hover:underline">
                      {REPORT_KINDS[r.kind]} · {periodTitle(r.kind, r.periodEnd).replace(/^For the /, "")}
                    </Link>
                    <span className="block text-caption-1-regular text-text-tertiary">Released {fmtDate(r.releasedAt)}{r.note ? ` · ${r.note}` : ""}</span>
                  </span>
                  {owner && <WithdrawReportButton clientId={id} reportId={r.id} />}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </BooksFrame>
  );
}
