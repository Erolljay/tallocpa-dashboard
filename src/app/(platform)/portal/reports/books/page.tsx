import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { BOOK_KINDS, BOOK_TITLES } from "@/lib/ledger/books";
import { loadPortalBooks, portalBooksClient } from "@/lib/portal/books";
import { booksYears, lockedMonths, monthEnd } from "@/lib/portal/report-periods";
import { cx } from "@/utils/cx";
import { portalContext } from "../../client-context";
import { ParamSelect } from "../param-select";
import { emptyClass, linkClass, listClass, monthLabel, pickClient, reportsHref, shortMonth } from "../shared";

export default function PortalBooks(props: PageProps<"/portal/reports/books">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Books searchParams={props.searchParams} />
    </Suspense>
  );
}

const chip = "inline-flex min-w-12 items-center justify-center rounded-full border border-border-button-default px-3 py-1 text-body-medium text-text-primary outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-11";

/** The loose-leaf books (decision 8) of a taxable year: each book bound for the year so far, and each closed month. */
async function Books({ searchParams }: Pick<PageProps<"/portal/reports/books">, "searchParams">) {
  const q = await searchParams;
  const { supabase, clients, all } = await portalContext();
  const picked = pickClient(clients, q.client, all);
  if (!picked) notFound();
  const [client, books] = await Promise.all([portalBooksClient(supabase, picked.id), loadPortalBooks(supabase, picked.id)]);
  if (!client) notFound();
  const years = booksYears(lockedMonths(books?.booksStart ?? null, books?.lockedThrough ?? null), client.fiscal_year_end_month);
  const year = years.find((y) => y.yearStart === q.year) ?? years[0];
  const cid = clients.length > 1 ? picked.id : null;

  return (
    <div className="space-y-6">
      <Link href={reportsHref("/portal/reports", { client: cid })} className={linkClass}>All reports</Link>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-title-1-medium text-text-primary">Books of account</h1>
          <p className="text-body-regular text-text-secondary">{client.name}: in the BIR format, for the months we have closed.</p>
        </div>
        {years.length > 1 && year && (
          <ParamSelect name="year" label="Year" value={year.yearStart} options={years.map((y) => ({ value: y.yearStart, label: y.label }))} className="w-40" />
        )}
      </div>
      {!year ? (
        <p className={emptyClass}>Your books appear here once we close the first month.</p>
      ) : (
        <ul className={listClass}>
          {BOOK_KINDS.map((kind) => (
            <li key={kind} className="space-y-3 px-4 py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-headline-semibold text-text-primary">{BOOK_TITLES[kind]}</h2>
                <Link href={reportsHref("/portal/reports/books/print", { client: cid, book: kind, from: year.from, to: year.to })} className={cx(linkClass, "pointer-coarse:py-2")}>
                  {year.complete ? `Bound, ${year.label}` : `${monthLabel(year.from)} to ${monthLabel(year.to)}`}
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {year.months.map((m) => (
                  <Link key={m} href={reportsHref("/portal/reports/books/print", { client: cid, book: kind, from: m, to: monthEnd(m) })} className={chip} aria-label={`${BOOK_TITLES[kind]}, ${monthLabel(m)}`}>
                    {shortMonth(m)}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
