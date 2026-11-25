import "server-only";
/**
 * Returns appear only for locked periods (docs/REWORK.md, decision 10): every list
 * where staff pick up return work keeps only the returns whose Books period is
 * locked, by the database's answer (filings_books_ready). Run as the signed-in user.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { filingsBooksReady } from "@/lib/books/actions";
import { onlyBooksReady } from "@/lib/books/periods";

/** The rows whose return is ready to work on; `idOf` picks the filing id (default `id`). */
export async function keepBooksReady<T>(rows: T[], db?: SupabaseClient, idOf: (r: T) => string = (r) => (r as { id: string }).id): Promise<T[]> {
  if (rows.length === 0) return rows;
  const ready = await filingsBooksReady([...new Set(rows.map(idOf))], db);
  const keep = new Set(onlyBooksReady([...ready.keys()].map((id) => ({ id })), [...ready.entries()].map(([filing_id, ok]) => ({ filing_id, ready: ok }))).map((r) => r.id));
  return rows.filter((r) => keep.has(idOf(r)));
}

/** filing id → ready, for lists that show held-back returns apart. */
export async function booksReadyMap(ids: string[], db?: SupabaseClient): Promise<Map<string, boolean>> {
  return filingsBooksReady([...new Set(ids)], db);
}
