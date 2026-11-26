import Link from "next/link";
import { Suspense } from "react";
import { Notice, Skeleton } from "@/components/ui";
import { MonthDetail, StatusBadge, monthName } from "@/components/books/parallel-run";
import type { MonthStatus } from "@/lib/parallel-run/compare";
import { loadParallelRun } from "@/lib/parallel-run/load";
import { cx } from "@/utils/cx";
import { BooksFrame } from "../../books-frame";
import { booksContext, one } from "../../books-context";

export default function ParallelRunPage(props: PageProps<"/app/clients/[id]/books/reports/parallel-run">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <ParallelRun params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

/** The months of the Books month's calendar quarter, from the books start. */
function quarterMonths(ym: string, booksStart: string): string[] {
  const y = Number(ym.slice(0, 4));
  const q = Math.floor((Number(ym.slice(5, 7)) - 1) / 3);
  const start = `${booksStart.slice(0, 7)}-01`;
  return [1, 2, 3].map((i) => `${y}-${String(q * 3 + i).padStart(2, "0")}-01`).filter((m) => m >= start);
}

/**
 * Parallel run (docs/REWORK.md): the returns' figures from the old register beside the
 * Books by tax code, for the Books month or its quarter, to the centavo. Read only.
 */
async function ParallelRun({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/books/reports/parallel-run">, "params" | "searchParams">) {
  const c = await booksContext(params, searchParams);
  const by = one(c.sp.by) === "quarter" ? "quarter" : "month";
  const months = by === "quarter" ? quarterMonths(c.month, c.books.booksStart) : [`${c.month}-01`];
  const run = await loadParallelRun(c.supabase, c.id, months);
  const path = `/app/clients/${c.id}/books/reports/parallel-run`;
  const hrefBy = (b: string) => `${path}?${new URLSearchParams({ month: c.month, by: b }).toString()}`;
  const tally = (s: MonthStatus) => run.filter((m) => m.status === s).length;
  const allAgree = run.length > 0 && run.every((m) => m.status === "agree" || m.status === "empty") && tally("agree") > 0;
  return (
    <BooksFrame supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active="reports" sub="/parallel-run" query={{ by }}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-title-2-medium text-text-primary">Old register beside the Books</h2>
          <p className="mt-1 text-body-regular text-text-secondary">
            The returns&rsquo; figures from the register (approved documents) and from the Books by tax code, to the centavo. A month agrees when every figure, customer, supplier and ATC is the same.
          </p>
        </div>
        <nav aria-label="Period" className="flex gap-1 rounded-xl bg-background-secondary-default p-1">
          {(["month", "quarter"] as const).map((b) => (
            <Link
              key={b}
              href={hrefBy(b)}
              aria-current={by === b ? "page" : undefined}
              className={cx(
                "rounded-lg px-3 py-1.5 text-body-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-11",
                by === b ? "bg-background-primary-default text-text-primary shadow-xs" : "text-text-secondary hover:text-text-primary",
              )}
            >
              {b === "month" ? "Month" : "Quarter"}
            </Link>
          ))}
        </nav>
      </div>

      {run.length > 1 && (
        <div className="rounded-3xl border border-border-button-default bg-background-primary-default">
          <ul className="divide-y divide-separator-border">
            {run.map((m) => (
              <li key={m.month} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
                <a href={`#pr-${m.month}`} className="rounded-sm text-body-medium text-text-primary hover:underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">{monthName(m.month)}</a>
                <StatusBadge status={m.status} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {allAgree ? (
        <Notice tone="done">{run.length > 1 ? "Every month with figures agrees" : "This month agrees"}: the old register screens can be retired for {run.length > 1 ? "this quarter" : "it"}.</Notice>
      ) : tally("differ") > 0 ? (
        <Notice tone="blocked">
          {tally("differ") === 1 ? "One month differs" : `${tally("differ")} months differ`}. Each difference is New less Old; the documents behind it are listed under the month.
        </Notice>
      ) : null}

      {run.map((m) => (
        <MonthDetail key={m.month} m={m} clientId={c.id} />
      ))}

      <p className="text-caption-1-regular text-text-tertiary">
        Old: register lines read as the return worksheets read them before the Books (a bare total taken as the worksheet took it; purchases without an SLP category under other goods). New: the Books&rsquo; posted, not void invoices by tax code, locked or not; ND and NR lines are on no return. A 2307 issued has no Book invoice of its own, so the QAP is compared per ATC only.
      </p>
    </BooksFrame>
  );
}
