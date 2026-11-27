import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Unfiled returns of catch-up periods (migration 20270104000001): filed outside the app
 * long ago, so they are kept out of the overdue and deadline lists.
 */
export async function catchUpOpenIds(db: SupabaseClient): Promise<Set<string>> {
  const { data } = await db.rpc("catch_up_open_filings");
  return new Set(((data ?? []) as { filing_id: string }[]).map((r) => r.filing_id));
}

/** The rows that are not catch-up returns. */
export function withoutCatchUp<T extends { id: string }>(rows: T[], ids: Set<string>): T[] {
  return ids.size === 0 ? rows : rows.filter((r) => !ids.has(r.id));
}
