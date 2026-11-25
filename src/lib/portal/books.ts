import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { accountFromRow, bookEntryFromRow, loadTrialBalance, type BooksClient } from "@/lib/ledger/data";
import type { BooksReader } from "@/lib/ledger/loose-leaf";
import { toCentavos } from "@/lib/returns/money";
import type { StatementHold } from "./report-periods";

/**
 * The client's books as the portal reads them (decision 19): through the
 * portal_* functions, which answer only for the user's own business and only for
 * locked months. The financial statements also wait for the client's approval of
 * the returns covering a month (migration 20261207000001). Client users never read
 * the ledger tables themselves.
 */

export interface PortalBooks {
  booksStart: string;
  permit: string | null;
  /** Last day of the unbroken run of locked months from the start of the books; null when none is locked. */
  lockedThrough: string | null;
  /** Closed months held from the statements, each with the return not yet client approved that holds it (none for staff). */
  statementHolds: StatementHold[];
}

/** The business as its books print it (the client's users read their own clients row). */
export async function portalBooksClient(supabase: SupabaseClient, clientId: string): Promise<BooksClient | null> {
  const { data } = await supabase.from("clients").select("id, name, tin, taxpayer_type, registered_address, book_type, fiscal_year_end_month").eq("id", clientId).maybeSingle();
  return (data as BooksClient | null) ?? null;
}

/** The books' start, permit, locked-through date and statement holds; null when the books are not set up (or the user may not see them). */
export async function loadPortalBooks(supabase: SupabaseClient, clientId: string): Promise<PortalBooks | null> {
  const { data, error } = await supabase.rpc("portal_books", { p_client: clientId });
  if (error) {
    if (error.code === "42501") return null;
    throw new Error(`Could not load the books: ${error.message}`);
  }
  if (!data) return null;
  const b = data as {
    books_start: string;
    permit: string | null;
    locked_through: string | null;
    statement_holds?: { month: string; filing_id: string; form: string; period_label: string; status: string }[];
  };
  return {
    booksStart: b.books_start,
    permit: b.permit,
    lockedThrough: b.locked_through,
    statementHolds: (b.statement_holds ?? []).map((h) => ({ month: h.month, filingId: h.filing_id, form: h.form, periodLabel: h.period_label, status: h.status })),
  };
}

/** Reads locked months of the client's books for the loose-leaf books (the database refuses anything later). */
export function portalBooksReader(supabase: SupabaseClient, clientId: string): BooksReader {
  return {
    entries: async (from, to) => {
      const { data, error } = await supabase.rpc("portal_book_entries", { p_client: clientId, p_from: from, p_to: to });
      if (error) throw new Error(`Could not load the books: ${error.message}`);
      const d = data as { accounts: Record<string, unknown>[]; entries: Record<string, unknown>[] };
      return { accounts: d.accounts.map(accountFromRow), entries: d.entries.map(bookEntryFromRow) };
    },
    // The loose-leaf books keep the lock-only rule: openings through portal_book_openings, not the statements' trial balance.
    trialBalance: async (from, to) => {
      const { data, error } = await supabase.rpc("portal_book_openings", { p_client: clientId, p_from: from, p_to: to });
      if (error) throw new Error(`Could not load the books: ${error.message}`);
      return ((data ?? []) as { account_id: string; opening: string | number }[]).map((r) => ({ accountId: r.account_id, opening: toCentavos(r.opening) ?? 0 }));
    },
  };
}

/** The statements' trial balance: locked months none of which waits for the client's approval of its returns. */
export const loadPortalTrialBalance = (supabase: SupabaseClient, clientId: string, from: string, to: string) =>
  loadTrialBalance(supabase, clientId, from, to, "portal_trial_balance");
