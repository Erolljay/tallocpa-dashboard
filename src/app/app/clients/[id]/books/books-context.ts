import "server-only";
import { redirect } from "next/navigation";
import { manilaToday } from "@/lib/filings/run";
import { booksAccess } from "@/lib/ledger/data";
import { booksMonth } from "@/lib/books/ui";

export type SearchParams = Record<string, string | string[] | undefined>;

export const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/**
 * Everything a Books module page needs: access (Owner or assigned staff, else 404),
 * the books (else back to the Books page to set them up), the month in the header,
 * today in Manila and the search.
 */
export async function booksContext(params: Promise<{ id: string }>, searchParams: Promise<SearchParams>) {
  const { id } = await params;
  const sp = await searchParams;
  const access = await booksAccess(id);
  if (!access.books) redirect(`/app/clients/${id}/books`);
  const today = manilaToday();
  const month = booksMonth(one(sp.month), today, access.books.booksStart);
  return { id, sp, ...access, books: access.books, today, month, q: one(sp.q).trim() };
}

export type BooksContext = Awaited<ReturnType<typeof booksContext>>;

export const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d.slice(0, 10)}T00:00:00Z`));
export const fmtMonth = (ym: string) => new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${ym.slice(0, 7)}-01T00:00:00Z`));
