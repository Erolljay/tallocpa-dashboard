import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { accountFromRow, bookEntryFromRow, loadTrialBalance, type BooksClient } from "@/lib/ledger/data";
import type { BooksReader } from "@/lib/ledger/loose-leaf";

/**
 * The client's books as the portal reads them (decision 19): through the
 * portal_* functions, which answer only for the user's own business and only for
 * locked months. Client users never read the ledger tables themselves.
 */

export interface PortalBooks {
  booksStart: string;
  permit: string | null;
  /** Last day of the unbroken run of locked months from the start of the books; null when none is locked. */
  lockedThrough: string | null;
}

/** The business as its books print it (the client's users read their own clients row). */
export async function portalBooksClient(supabase: SupabaseClient, clientId: string): Promise<BooksClient | null> {
  const { data } = await supabase.from("clients").select("id, name, tin, taxpayer_type, registered_address, book_type, fiscal_year_end_month").eq("id", clientId).maybeSingle();
  return (data as BooksClient | null) ?? null;
}

/** The books' start, permit and locked-through date; null when the books are not set up (or the user may not see them). */
export async function loadPortalBooks(supabase: SupabaseClient, clientId: string): Promise<PortalBooks | null> {
  const { data, error } = await supabase.rpc("portal_books", { p_client: clientId });
  if (error) {
    if (error.code === "42501") return null;
    throw new Error(`Could not load the books: ${error.message}`);
  }
  if (!data) return null;
  const b = data as { books_start: string; permit: string | null; locked_through: string | null };
  return { booksStart: b.books_start, permit: b.permit, lockedThrough: b.locked_through };
}

/** Reads locked months of the client's books (the database refuses anything later). */
export function portalBooksReader(supabase: SupabaseClient, clientId: string): BooksReader {
  return {
    entries: async (from, to) => {
      const { data, error } = await supabase.rpc("portal_book_entries", { p_client: clientId, p_from: from, p_to: to });
      if (error) throw new Error(`Could not load the books: ${error.message}`);
      const d = data as { accounts: Record<string, unknown>[]; entries: Record<string, unknown>[] };
      return { accounts: d.accounts.map(accountFromRow), entries: d.entries.map(bookEntryFromRow) };
    },
    trialBalance: (from, to) => loadPortalTrialBalance(supabase, clientId, from, to),
  };
}

export const loadPortalTrialBalance = (supabase: SupabaseClient, clientId: string, from: string, to: string) =>
  loadTrialBalance(supabase, clientId, from, to, "portal_trial_balance");
