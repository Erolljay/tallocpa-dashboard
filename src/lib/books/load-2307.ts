import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { forms2307, type By2307, type Period2307, type Raw2307, type Set2307 } from "./form-2307";

/**
 * A period's BIR 2307s for a client's suppliers. Reads through books_2307_data(), which
 * the Owner and assigned staff may call for any month and the client's own users only
 * for locked months, so the portal renders certificates without reading the Books.
 * Returns null when the caller may not see them.
 */
export async function load2307(
  supabase: SupabaseClient,
  clientId: string,
  period: Period2307,
  by: By2307,
  supplier?: string | null,
): Promise<Set2307 | null> {
  const { data, error } = await supabase.rpc("books_2307_data", { p_client: clientId, p_from: period.from, p_to: period.to });
  if (error) {
    if (error.code === "42501") return null;
    throw new Error(`Could not load the 2307s: ${error.message}`);
  }
  return forms2307(data as Raw2307, period, by, supplier);
}
