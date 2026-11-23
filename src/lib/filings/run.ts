import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { buildFilingRows, type ClientRow, type ObligationRow, type RuleRow } from "./generate";

/** Today's date in the Philippines, as YYYY-MM-DD. */
export function manilaToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

async function all<T>(admin: SupabaseClient, table: string, columns: string): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await admin.from(table).select(columns).range(from, from + 999);
    if (error) throw new Error(`Reading ${table}: ${error.message}`);
    out.push(...((data ?? []) as T[]));
    if (!data || data.length < 1000) return out;
  }
}

/**
 * Creates filing instances that do not exist yet. Existing filings are never changed,
 * so their sign-off progress is safe. Needs the service-role client.
 */
export async function runFilingGeneration(admin: SupabaseClient, today = manilaToday()) {
  const [obligations, clients, rules, holidays] = await Promise.all([
    all<ObligationRow>(admin, "obligations", "id, client_id, form, frequency, start_date, end_date"),
    all<ClientRow>(admin, "clients", "id, status, fiscal_year_end_month, filing_channel, efps_group"),
    all<RuleRow>(admin, "deadline_rules", "id, form, frequency, period_filter, due, channel, efps_group, effective_from, effective_to, calendar_year"),
    all<{ date: string }>(admin, "holidays", "date"),
  ]);
  const { rows, missing } = buildFilingRows({ obligations, clients, rules, holidays: holidays.map((h) => h.date), today });

  let created = 0;
  for (let i = 0; i < rows.length; i += 500) {
    const { data, error } = await admin
      .from("filing_instances")
      .upsert(rows.slice(i, i + 500), { onConflict: "obligation_id,period_end", ignoreDuplicates: true })
      .select("id");
    if (error) throw new Error(`Saving filings: ${error.message}`);
    created += data?.length ?? 0;
  }
  return { today, considered: rows.length, created, missingRules: missing };
}
