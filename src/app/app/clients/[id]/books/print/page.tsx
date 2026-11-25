import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LooseLeafPages } from "@/components/books/loose-leaf-pages";
import { LinkButton, Notice, Skeleton } from "@/components/ui";
import { BOOK_KINDS, BOOK_TITLES, type BookKind } from "@/lib/ledger/books";
import { booksAccess, staffBooksReader } from "@/lib/ledger/data";
import { bookPeriodLabel, loadLooseLeaf } from "@/lib/ledger/loose-leaf";
import { PrintButton } from "./print-button";

export default function BookPrintPage(props: PageProps<"/app/clients/[id]/books/print">) {
  return (
    <Suspense fallback={<Skeleton rows={12} />}>
      <BookPrint params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * A book of account for a period, printed on ruled pad pages (?book=…&from=…&to=…).
 * Page numbers continue from the start of the taxable year.
 */
async function BookPrint({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/books/print">, "params" | "searchParams">) {
  const { id } = await params;
  const q = await searchParams;
  const { supabase, client, books } = await booksAccess(id);
  if (!books) notFound();
  const kind = (typeof q.book === "string" && (BOOK_KINDS as string[]).includes(q.book) ? q.book : "general_journal") as BookKind;
  const from = typeof q.from === "string" && DATE_RE.test(q.from) ? q.from : books.booksStart;
  const to = typeof q.to === "string" && DATE_RE.test(q.to) && q.to >= from ? q.to : from;

  const { book, pages, firstPage } = await loadLooseLeaf(staffBooksReader(supabase, id), kind, from, to, client.fiscal_year_end_month);
  const manual = client.book_type === "manual";
  const period = bookPeriodLabel(from, to);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h1 className="text-title-2-medium text-text-primary">{BOOK_TITLES[kind]}</h1>
          <p className="text-body-regular text-text-secondary">
            {client.name} · {period} · {pages.length} page{pages.length === 1 ? "" : "s"} ({book.orientation === "portrait" ? "8.5 × 13 in portrait" : "13 × 8.5 in landscape"}), numbered from page {firstPage}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LinkButton href={`/app/clients/${id}/books`} variant="ghost">Back to books</LinkButton>
          <PrintButton />
        </div>
      </div>
      {book.lines.length === 0 && <div className="mb-6 print:hidden"><Notice>No posted entries in this book for the period. The ruled page below is blank.</Notice></div>}
      {!manual && !books.permit && <div className="mb-6 print:hidden"><Notice tone="waiting">Add the loose-leaf books permit / registration reference on the Books page so it prints on every page.</Notice></div>}
      <LooseLeafPages head={{ name: client.name, tin: client.tin, address: client.registered_address, manual, permit: books.permit, period }} book={book} pages={pages} />
    </>
  );
}
