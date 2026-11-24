import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { buildFilingRows, recomputeDueDates, type ClientRow, type ObligationRow, type OpenFilingRow, type RuleRow } from "./generate";

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

const RULE_COLUMNS = "id, form, frequency, period_filter, due, channel, efps_group, effective_from, effective_to, calendar_year";

/**
 * Creates filing instances that do not exist yet. Existing filings are never changed,
 * so their sign-off progress is safe. Needs the service-role client.
 */
export async function runFilingGeneration(admin: SupabaseClient, today = manilaToday()) {
  const [obligations, clients, rules, holidays] = await Promise.all([
    all<ObligationRow>(admin, "obligations", "id, client_id, form, frequency, start_date, end_date"),
    all<ClientRow>(admin, "clients", "id, status, fiscal_year_end_month, filing_channel, efps_group"),
    all<RuleRow>(admin, "deadline_rules", RULE_COLUMNS),
    all<{ date: string }>(admin, "holidays", "date"),
  ]);
  const { rows, missing } = buildFilingRows({ obligations, clients, rules, holidays: holidays.map((h) => h.date), today });

  let created = 0;
  for (let i = 0; i < rows.length; i += 500) {
    const { data, error } = await admin
      .from("filing_instances")
      .upsert(rows.slice(i, i + 500), { onConflict: "obligation_id,period_end,amendment_no", ignoreDuplicates: true })
      .select("id");
    if (error) throw new Error(`Saving filings: ${error.message}`);
    created += data?.length ?? 0;
  }
  return { today, considered: rows.length, created, missingRules: missing };
}

/**
 * After a deadline rule or holiday changes: moves the due dates of filings not yet
 * filed to match. Needs the service-role client (filings are not writable by users).
 */
export async function refreshDueDates(admin: SupabaseClient) {
  const [filings, obligations, clients, rules, holidays] = await Promise.all([
    (async () => {
      const { data, error } = await admin
        .from("filing_instances")
        .select("id, obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date")
        .not("status", "in", "(filed,paid,proof_uploaded)")
        .limit(10000);
      if (error) throw new Error(`Reading filings: ${error.message}`);
      return (data ?? []) as OpenFilingRow[];
    })(),
    all<Pick<ObligationRow, "id" | "frequency">>(admin, "obligations", "id, frequency"),
    all<ClientRow>(admin, "clients", "id, status, fiscal_year_end_month, filing_channel, efps_group"),
    all<RuleRow>(admin, "deadline_rules", RULE_COLUMNS),
    all<{ date: string }>(admin, "holidays", "date"),
  ]);
  const updates = recomputeDueDates({ filings, obligations, clients, rules, holidays: holidays.map((h) => h.date) });
  for (const u of updates) {
    const { error } = await admin.from("filing_instances").update({ rule_id: u.rule_id, statutory_due_date: u.statutory_due_date, due_date: u.due_date }).eq("id", u.id);
    if (error) throw new Error(`Updating filing due dates: ${error.message}`);
  }
  return { checked: filings.length, moved: updates.length };
}
