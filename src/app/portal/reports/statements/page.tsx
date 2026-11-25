import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FinancialStatementsView } from "@/components/statement/financial-statements-view";
import { Notice, Skeleton } from "@/components/ui";
import { statementsFrom } from "@/lib/ledger/data";
import { REPORT_KINDS, type ReportKind } from "@/lib/ledger/statements";
import { loadPortalBooks, loadPortalTrialBalance, portalBooksClient } from "@/lib/portal/books";
import { lockedMonths, reportKindsEnding } from "@/lib/portal/report-periods";
import { portalContext } from "../../client-context";
import { ParamSelect } from "../param-select";
import { emptyClass, linkClass, monthLabel, pickClient, reportsHref } from "../shared";

export default function PortalStatements(props: PageProps<"/portal/reports/statements">) {
  return (
    <Suspense fallback={<Skeleton rows={12} />}>
      <Statements searchParams={props.searchParams} />
    </Suspense>
  );
}

/**
 * The client's financial statements for a closed month, quarter or year (decision 19),
 * built from the books now. Only locked months can be chosen; the database refuses
 * anything later (portal_trial_balance).
 */
async function Statements({ searchParams }: Pick<PageProps<"/portal/reports/statements">, "searchParams">) {
  const q = await searchParams;
  const { supabase, clients } = await portalContext();
  const picked = pickClient(clients, q.client);
  if (!picked) notFound();
  const [client, books] = await Promise.all([portalBooksClient(supabase, picked.id), loadPortalBooks(supabase, picked.id)]);
  if (!client) notFound();
  const months = lockedMonths(books?.booksStart ?? null, books?.lockedThrough ?? null).reverse();
  const back = <Link href={reportsHref("/portal/reports", { client: clients.length > 1 ? picked.id : null })} className={`${linkClass} print:hidden`}>All reports</Link>;
  if (months.length === 0) {
    return (
      <div className="space-y-6">
        {back}
        <h1 className="text-title-1-medium text-text-primary">Financial statements</h1>
        <p className={emptyClass}>Your statements appear here once we close the first month of your books.</p>
      </div>
    );
  }
  const month = months.find((m) => m.slice(0, 7) === q.month) ?? months[0];
  const kinds = reportKindsEnding(month, client.fiscal_year_end_month);
  const kind: ReportKind = kinds.find((k) => k === q.kind) ?? "monthly";
  const result = await statementsFrom((from, to) => loadPortalTrialBalance(supabase, client.id, from, to), client, kind, month.slice(0, 7), books?.booksStart ?? null);

  return (
    <div className="space-y-6">
      <div className="space-y-3 print:hidden">
        {back}
        <h1 className="text-title-1-medium text-text-primary">Financial statements</h1>
        <div className="flex flex-wrap gap-3">
          <ParamSelect name="month" label="Month" value={month.slice(0, 7)} options={months.map((m) => ({ value: m.slice(0, 7), label: monthLabel(m) }))} className="min-w-0 flex-1 sm:flex-none sm:w-48" />
          <ParamSelect name="kind" label="Report" value={kind} options={kinds.map((k) => ({ value: k, label: REPORT_KINDS[k] }))} className="min-w-0 flex-1 sm:flex-none sm:w-40" />
        </div>
        <p className="text-caption-1-regular text-text-tertiary">
          From your books as closed through {monthLabel(months[0])}. Quarters and the year follow your taxable year.
        </p>
      </div>
      {"error" in result && result.error ? (
        <Notice tone="blocked">{result.error}</Notice>
      ) : result.fs ? (
        <FinancialStatementsView
          fs={result.fs}
          footer={<p className="text-center text-caption-1-regular text-text-tertiary">Prepared from your books by Tallo CPA, for months we have closed.</p>}
        />
      ) : null}
    </div>
  );
}
