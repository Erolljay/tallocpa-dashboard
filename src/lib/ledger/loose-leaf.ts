/**
 * A book of account for a period as printed loose-leaf pages (decision 8): the
 * staff print view and the client's portal both build it here, each with its own
 * reader (staff read the ledger; the portal reads locked months only). Page
 * numbers continue from the start of the taxable year, so a month printed on its
 * own carries the same page numbers it has in the bound book for the year.
 */
import type { BookEntry, BookKind } from "./books";
import { buildPrintBook, LINES_PER_PAGE, pageBook, pageCount, type PrintBook, type PrintPage } from "./print";
import { taxableYearStart } from "./statements";
import type { Centavos, LedgerAccount } from "./types";

export interface BooksReader {
  /** The chart of accounts and the posted entries dated from…to, oldest first. */
  entries(from: string, to: string): Promise<{ accounts: LedgerAccount[]; entries: BookEntry[] }>;
  /** Each account's balance before `from` (opening), for the General Ledger. */
  trialBalance(from: string, to: string): Promise<{ accountId: string; opening: Centavos }[]>;
}

export interface LooseLeaf {
  book: PrintBook;
  pages: PrintPage[];
  /** The number of this period's first page within the taxable year. */
  firstPage: number;
}

export const dayBefore = (iso: string) => new Date(Date.parse(`${iso}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);

const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));

/** "January 1, 2026" for one day, else "January 1, 2026 to January 31, 2026". */
export const bookPeriodLabel = (from: string, to: string) => (from === to ? fmtDate(from) : `${fmtDate(from)} to ${fmtDate(to)}`);

/** The book `kind` for `from`…`to`, paged, numbered on from the earlier months of the same taxable year. */
export async function loadLooseLeaf(reader: BooksReader, kind: BookKind, from: string, to: string, fyeMonth: number): Promise<LooseLeaf> {
  const yearStart = taxableYearStart(from, fyeMonth);
  const ledger = kind === "general_ledger";
  const openingsOf = async (f: string, t: string) => new Map(ledger ? (await reader.trialBalance(f, t)).map((r) => [r.accountId, r.opening]) : []);
  const [{ accounts, entries }, earlier, openings] = await Promise.all([
    reader.entries(from, to),
    // Earlier pages of the same taxable year, to number this period's pages on from them.
    yearStart < from ? reader.entries(yearStart, dayBefore(from)) : Promise.resolve(null),
    openingsOf(from, to),
  ]);
  const book = buildPrintBook(kind, entries, accounts, openings);
  const perPage = LINES_PER_PAGE[book.orientation];
  let firstPage = 1;
  if (earlier && earlier.entries.length) {
    firstPage += pageCount(buildPrintBook(kind, earlier.entries, accounts, await openingsOf(yearStart, dayBefore(from))), perPage);
  }
  return { book, pages: pageBook(book, perPage, firstPage), firstPage };
}
