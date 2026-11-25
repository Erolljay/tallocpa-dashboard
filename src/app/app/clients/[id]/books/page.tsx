import Link from "next/link";
import { Suspense } from "react";
import { Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { COA_TEMPLATES } from "@/lib/ledger/coa";
import { booksAccess, loadStatements } from "@/lib/ledger/data";
import type { Statement } from "@/lib/ledger/statements";
import { TEMPLATE_FOR_TAXPAYER, TEMPLATES, type TemplateCode } from "@/lib/ledger/types";
import { booksHref, booksMonth, fsLineOfLabel, moduleForFsLine } from "@/lib/books/ui";
import { manilaToday } from "@/lib/filings/run";
import { formatAmount } from "@/lib/returns/money";
import { cx } from "@/utils/cx";
import { BooksFrame } from "./books-frame";
import { fmtMonth } from "./books-context";
import { SetupForm } from "./forms";

export default function BooksSummaryPage(props: PageProps<"/app/clients/[id]/books">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Summary params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

/** Summary (Manager.io style): balance sheet and profit and loss side by side for the month; each line opens its module. */
async function Summary({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/books">, "params" | "searchParams">) {
  const { id } = await params;
  const q = await searchParams;
  const { supabase, client, books } = await booksAccess(id);

  if (!books) {
    const counts = Object.fromEntries((Object.keys(TEMPLATES) as TemplateCode[]).map((t) => [t, COA_TEMPLATES[t].length])) as Record<TemplateCode, number>;
    return (
      <>
        <PageHeader title="Books" description={<>{client.name}: set up the double-entry books from a chart-of-accounts template.</>} actions={<LinkButton href={`/app/clients/${id}`} variant="ghost">Back to client</LinkButton>} />
        <Card title="Set up books">
          {/* Every client keeps account titles, tax compliance only included (Owner's decision 2). */}
          <SetupForm clientId={id} defaultTemplate={TEMPLATE_FOR_TAXPAYER[client.taxpayer_type] ?? "stock_corporation"} counts={counts} />
        </Card>
      </>
    );
  }

  const month = booksMonth(typeof q.month === "string" ? q.month : "", manilaToday(), books.booksStart);
  const result = await loadStatements(supabase, client, "monthly", month);

  return (
    <BooksFrame supabase={supabase} clientId={id} clientName={client.name} booksStart={books.booksStart} month={month} active="summary">
      {"error" in result ? (
        <Notice tone="blocked">{result.error}</Notice>
      ) : (
        <>
          {result.fs.difference !== 0 && <Notice tone="blocked">Total assets differ from total liabilities and equity by {formatAmount(result.fs.difference)}. Check the books.</Notice>}
          {result.suggested > 0 && (
            <Notice tone="waiting">
              {result.suggested} suggested entr{result.suggested === 1 ? "y is" : "ies are"} from the old flow and not in these figures.{" "}
              <Link href={`/app/clients/${id}/books/tools`} className="font-medium underline">Confirm them</Link>
            </Notice>
          )}
          <div className="grid gap-6 2xl:grid-cols-2">
            <SummaryCard title="Balance Sheet" subtitle={`As of the end of ${fmtMonth(month)}`} statement={result.fs.position} clientId={id} month={month} />
            <SummaryCard title="Profit and Loss" subtitle={fmtMonth(month)} statement={result.fs.income} clientId={id} month={month} />
          </div>
          <p className="text-caption-1-regular text-text-tertiary">
            Full statements, notes and release to the client: <Link href={booksHref(id, "reports", month, {}, "/statements")} className="text-button-ghost-foreground hover:underline">Financial statements</Link>.
          </p>
        </>
      )}
    </BooksFrame>
  );
}

function SummaryCard({ title, subtitle, statement, clientId, month }: { title: string; subtitle: string; statement: Statement; clientId: string; month: string }) {
  return (
    <section className="min-w-0 rounded-3xl border border-border-button-default bg-background-primary-default p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-title-3-semibold text-text-primary">{title}</h2>
        <span className="text-caption-1-regular text-text-tertiary">{subtitle}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[24rem] text-body-regular">
          {statement.columns.length > 1 && (
            <thead className="text-caption-1-medium text-text-tertiary">
              <tr>
                <th scope="col"><span className="sr-only">Line</span></th>
                {statement.columns.map((c) => <th key={c} scope="col" className="py-1 ps-3 text-end">{c}</th>)}
              </tr>
            </thead>
          )}
          <tbody>
            {statement.lines.map((l, i) => {
              const fs = l.kind === "line" ? fsLineOfLabel(l.label) : null;
              return (
                <tr key={i} className={cx(l.kind === "total" && "border-t-2 border-separator-border", l.kind === "subtotal" && "border-t border-separator-border")}>
                  <td className={cx("py-1.5 pe-3", l.kind === "heading" ? "pt-3 text-body-medium text-text-secondary" : l.kind === "line" ? "ps-3" : "text-body-medium text-text-primary")}>
                    {fs ? (
                      <Link href={booksHref(clientId, moduleForFsLine(fs), month)} className="text-text-primary hover:underline">{l.label}</Link>
                    ) : (
                      l.label
                    )}
                  </td>
                  {l.amounts.map((a, j) => (
                    <td key={j} className={cx("py-1.5 ps-3 text-end tabular-nums", l.kind === "line" ? "text-text-primary" : "text-body-medium text-text-primary")}>{a == null ? "" : formatAmount(a)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
