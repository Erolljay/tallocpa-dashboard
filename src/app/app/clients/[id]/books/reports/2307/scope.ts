import "server-only";
import { notFound } from "next/navigation";
import { isBy2307, parsePeriod2307, quarterValue, type By2307 } from "@/lib/books/form-2307";
import { load2307 } from "@/lib/books/load-2307";
import { one, type BooksContext } from "../../books-context";

/** The staff 2307 page's choices from the query (the Books month, by, supplier) and its certificates. */
export async function load2307Staff(c: BooksContext) {
  const raw = one(c.sp.by);
  const by: By2307 = isBy2307(raw) ? raw : "quarter";
  const supplier = one(c.sp.supplier) || null;
  const period = parsePeriod2307(by === "quarter" ? quarterValue(c.month) : c.month)!;
  const set = await load2307(c.supabase, c.id, period, by, supplier);
  if (!set) notFound();
  return { set, by, supplier, period };
}

export function print2307Href(clientId: string, month: string, by: By2307, supplier: string | null, form?: string) {
  const q = new URLSearchParams({ month, by });
  if (supplier) q.set("supplier", supplier);
  if (form) q.set("form", form);
  return `/app/clients/${clientId}/books/reports/2307/print?${q.toString()}`;
}
