import type { SupabaseClient } from "@supabase/supabase-js";
import type { DocumentCodes } from "./actions";
import { slpCategoryFromKinds, type SlpCategoryKey, type TaxCodeKind } from "./tax-codes";

/**
 * The SLP category of a purchase posted with these line tax codes (server only).
 * The Input VAT code already says capital goods, other goods or services, so the
 * register line takes its category from it instead of a second question. Null when
 * the codes say nothing (keep what the reviewer entered).
 */
export async function slpCategoryFromCodes(db: SupabaseClient, codes: DocumentCodes | null | undefined): Promise<SlpCategoryKey | null> {
  const ids = (codes?.lines ?? []).map((l) => l.tax_code_id).filter((id): id is string => Boolean(id));
  if (ids.length === 0) return null;
  const { data, error } = await db.from("tax_codes").select("id, kind").in("id", ids);
  if (error) throw new Error(`Could not read the tax codes: ${error.message}`);
  return slpCategoryFromKinds(((data ?? []) as { kind: TaxCodeKind }[]).map((r) => r.kind));
}
