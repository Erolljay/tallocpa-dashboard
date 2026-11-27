import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PrintButton } from "@/components/bir/print-button";
import { LooseLeafPages } from "@/components/books/loose-leaf-pages";
import { Notice, Skeleton } from "@/components/ui";
import { BOOK_KINDS, BOOK_TITLES, type BookKind } from "@/lib/ledger/books";
import { bookPeriodLabel, loadLooseLeaf } from "@/lib/ledger/loose-leaf";
import { loadPortalBooks, portalBooksClient, portalBooksReader } from "@/lib/portal/books";
import { portalContext } from "../../../client-context";
import { linkClass, pickClient, reportsHref } from "../../shared";

export default function PortalBookPrint(props: PageProps<"/portal/reports/books/print">) {
  return (
    <Suspense fallback={<Skeleton rows={12} />}>
      <BookPrint searchParams={props.searchParams} />
    </Suspense>
  );
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * A book of account for closed months, on the same ruled pages staff print
 * (?book=…&from=…&to=…). Page numbers continue from the start of the taxable year.
 */
async function BookPrint({ searchParams }: Pick<PageProps<"/portal/reports/books/print">, "searchParams">) {
  const q = await searchParams;
  const { supabase, clients, all } = await portalContext();
  const picked = pickClient(clients, q.client, all);
  if (!picked) notFound();
  const kind = typeof q.book === "string" && (BOOK_KINDS as string[]).includes(q.book) ? (q.book as BookKind) : null;
  const from = typeof q.from === "string" && DATE_RE.test(q.from) ? q.from : null;
  const to = typeof q.to === "string" && DATE_RE.test(q.to) ? q.to : null;
  if (!kind || !from || !to || to < from) notFound();
  const [client, books] = await Promise.all([portalBooksClient(supabase, picked.id), loadPortalBooks(supabase, picked.id)]);
  if (!client || !books) notFound();
  const back = <Link href={reportsHref("/portal/reports/books", { client: clients.length > 1 ? picked.id : null })} className={linkClass}>Books of account</Link>;
  if (!books.lockedThrough || to > books.lockedThrough) {
    return (
      <div className="space-y-6">
        {back}
        <Notice tone="waiting">These months are not closed yet. Your books show here once we close each month.</Notice>
      </div>
    );
  }

  const { book, pages } = await loadLooseLeaf(portalBooksReader(supabase, picked.id), kind, from, to, client.fiscal_year_end_month);
  const period = bookPeriodLabel(from, to);
  return (
    <div className="space-y-6">
      <div className="space-y-3 print:hidden">
        {back}
        <div className="space-y-1">
          <h1 className="text-title-1-medium text-text-primary">{BOOK_TITLES[kind]}</h1>
          <p className="text-body-regular text-text-secondary">
            {period} · {pages.length} page{pages.length === 1 ? "" : "s"}, {book.orientation === "portrait" ? "8.5 × 13 in portrait" : "13 × 8.5 in landscape"}
          </p>
        </div>
        <PrintButton />
        {book.lines.length === 0 && <Notice tone="done">Nothing was recorded in this book for the period.</Notice>}
      </div>
      <div className="-mx-4 overflow-x-auto px-4 print:mx-0 print:overflow-visible print:px-0">
        <LooseLeafPages head={{ name: client.name, tin: client.tin, address: client.registered_address, manual: client.book_type === "manual", permit: books.permit, period }} book={book} pages={pages} />
      </div>
    </div>
  );
}
