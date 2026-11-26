import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { buildTracker, looseDocuments, taxableYear, trackerTotals, type TrackerData } from "./cwt-tracker";

/**
 * The 2307 tracker of one taxable year (the one holding `date`): customer × quarter rows,
 * their totals, approved 2307s supporting no invoice, and 2307s waiting for review. Staff
 * see every month; the client's own users only locked months' invoices (the database
 * decides).
 */
export async function loadCwtTracker(supabase: SupabaseClient, clientId: string, date: string, fyeMonth: number) {
  const year = taxableYear(date, fyeMonth);
  const { data, error } = await supabase.rpc("cwt_2307_tracker", { p_client: clientId, p_from: year.start, p_to: year.end });
  if (error) throw new Error(`Could not load the 2307 tracker: ${error.message}`);
  const raw = data as TrackerData;
  const groups = buildTracker(raw, year.start);
  return { year, groups, totals: trackerTotals(groups), ...looseDocuments(raw), months: raw.months };
}

export type CwtTracker = Awaited<ReturnType<typeof loadCwtTracker>>;
