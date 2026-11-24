import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LinkButton, Notice, Skeleton } from "@/components/ui";
import { BOOK_KINDS, BOOK_TITLES, taxableYearStart, type BookKind } from "@/lib/ledger/books";
import { booksAccess, loadAccounts, loadBookEntries, loadTrialBalance } from "@/lib/ledger/data";
import { buildPrintBook, LINES_PER_PAGE, pageBook, pageCount, splitAmount, type PrintBook } from "@/lib/ledger/print";
import { cx } from "@/utils/cx";
import s from "./pad.module.css";
import { PrintButton } from "./print-button";

export default function BookPrintPage(props: PageProps<"/app/clients/[id]/books/print">) {
  return (
    <Suspense fallback={<Skeleton rows={12} />}>
      <BookPrint params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));
const dayBefore = (iso: string) => new Date(Date.parse(`${iso}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);

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

  const yearStart = taxableYearStart(from, client.fiscal_year_end_month);
  const [accounts, entries, earlier, tb] = await Promise.all([
    loadAccounts(supabase, id),
    loadBookEntries(supabase, id, from, to),
    // Earlier pages of the same taxable year, to number this period's pages on from them.
    yearStart < from ? loadBookEntries(supabase, id, yearStart, dayBefore(from)) : Promise.resolve([]),
    kind === "general_ledger" ? loadTrialBalance(supabase, id, from, to) : Promise.resolve([]),
  ]);
  const openings = new Map(tb.map((r) => [r.accountId, r.opening]));
  const book = buildPrintBook(kind, entries, accounts, openings);
  const perPage = LINES_PER_PAGE[book.orientation];
  let firstPage = 1;
  if (earlier.length) {
    const earlierOpenings = kind === "general_ledger" ? new Map((await loadTrialBalance(supabase, id, yearStart, dayBefore(from))).map((r) => [r.accountId, r.opening])) : new Map();
    firstPage += pageCount(buildPrintBook(kind, earlier, accounts, earlierOpenings), perPage);
  }
  const pages = pageBook(book, perPage, firstPage);
  const manual = client.book_type === "manual";
  const period = from === to ? fmtDate(from) : `${fmtDate(from)} to ${fmtDate(to)}`;

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
      {pages.map((p) => (
        <section key={p.number} className={cx(s.sheet, book.orientation === "portrait" ? s.portrait : s.landscape)}>
          <header className={s.head}>
            <div className={s.who}>
              <strong>{client.name}</strong>
              <br />
              TIN {client.tin ?? "—"}
              <br />
              {client.registered_address ?? ""}
            </div>
            <div className={s.book}>
              <strong>{BOOK_TITLES[kind]}</strong>
              <br />
              {period}
              <br />
              {manual ? <span className={s.note}>For copying into the bound book</span> : books.permit ? `Loose-leaf books: ${books.permit}` : ""}
            </div>
          </header>
          <Pad book={book} lines={p.lines} />
          <footer className={s.foot}>
            <span>{manual ? "" : "Loose-leaf books of account"}</span>
            <span>Page {p.number}</span>
          </footer>
        </section>
      ))}
    </>
  );
}

function Pad({ book, lines }: { book: PrintBook; lines: ReturnType<typeof pageBook>[number]["lines"] }) {
  const textCols = book.columns.filter((c) => c.kind === "text");
  const moneyWidth = book.orientation === "portrait" ? 92 : 88;
  const textTotal = textCols.reduce((n, c) => n + (c.width ?? 1), 0);
  const firstText = book.columns[0].key;
  return (
    <table className={s.pad}>
      <colgroup>
        <col style={{ width: 24 }} />
        {book.columns.map((c) =>
          c.kind === "money"
            ? [<col key={`${c.key}p`} style={{ width: moneyWidth - 20 }} />, <col key={`${c.key}c`} style={{ width: 20 }} />]
            : <col key={c.key} style={{ width: `${((c.width ?? 1) / textTotal) * 100}%` }} />,
        )}
        <col style={{ width: 24 }} />
      </colgroup>
      <thead>
        <tr>
          <th className={s.no} />
          {book.columns.map((c) => (
            <th key={c.key} colSpan={c.kind === "money" ? 2 : 1} className={cx(c.kind === "money" && s.money, c.key === firstText && s.first)}>{c.label}</th>
          ))}
          <th className={cx(s.no, s.noEnd)} />
        </tr>
      </thead>
      <tbody>
        {lines.map((l, i) => (
          <tr key={i} className={cx(l?.style === "heading" && s.heading, l?.style === "total" && s.total, l?.style === "indent" && s.indent, l?.style === "note" && s.noteRow)}>
            <td className={s.no}>{i + 1}</td>
            {book.columns.map((c) => {
              if (c.kind === "money") {
                const [p, ct] = splitAmount(l?.money[c.key]);
                return [<td key={`${c.key}p`} className={s.pesos}>{p}</td>, <td key={`${c.key}c`} className={s.cents}>{ct}</td>];
              }
              const isParticulars = c.key === "particulars";
              return (
                <td key={c.key} className={cx(c.key === firstText && s.first, isParticulars && s.text1)} title={l?.text[c.key] || undefined}>
                  {l?.text[c.key] ?? ""}
                </td>
              );
            })}
            <td className={cx(s.no, s.noEnd)}>{i + 1}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
