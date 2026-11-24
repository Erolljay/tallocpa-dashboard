import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { EMPLOYEE_COLUMNS, ENTRY_COLUMNS, ITEM_COLUMNS, PRIOR_EMPLOYER_COLUMNS, employeeFromRow, itemFromRow, priorEmployerFromRow, storedMonthsFromRows, toEntries } from "./rows";
import { certificatesFromRaw, type Certificates2316, type Payroll2316Raw } from "./certificate";
import type { PayrollContext } from "./types";

type Row = Record<string, unknown>;

/**
 * The payroll a 1601-C or 1604-C worksheet needs (WorksheetContext.payroll):
 * every employee of the client and their pay, totalled by BIR category, from
 * 1 January of the year of `periodEnd` through the month of `periodEnd`, and
 * their previous employers within that year (BIR 2316 Part III).
 * `form` and `periodStart` are accepted for symmetry with the worksheet loader;
 * both forms read the same data. Runs as the signed-in user, so RLS applies
 * (Owner and assigned staff only).
 */
export async function loadPayrollContext(
  supabase: SupabaseClient,
  clientId: string,
  form: string,
  periodStart: string,
  periodEnd: string,
): Promise<PayrollContext> {
  void form;
  void periodStart;
  const year = Number(periodEnd.slice(0, 4));
  const throughMonth = Number(periodEnd.slice(5, 7));
  const [employees, items, entries, prior] = await Promise.all([
    supabase.from("employees").select(EMPLOYEE_COLUMNS).eq("client_id", clientId),
    supabase.from("payroll_items").select(ITEM_COLUMNS).eq("client_id", clientId),
    supabase
      .from("payroll_entries")
      .select(ENTRY_COLUMNS)
      .eq("client_id", clientId)
      .gte("pay_month", `${year}-01-01`)
      .lte("pay_month", `${year}-${String(throughMonth).padStart(2, "0")}-01`),
    supabase.from("employee_prior_employers").select(PRIOR_EMPLOYER_COLUMNS).eq("client_id", clientId).eq("year", year),
  ]);
  for (const r of [employees, items, entries, prior]) if (r.error) throw new Error(`Could not load payroll: ${r.error.message}`);
  const itemList = (items.data ?? []).map((r) => itemFromRow(r as unknown as Row));
  return {
    year,
    throughMonth,
    employees: (employees.data ?? []).map((r) => employeeFromRow(r as unknown as Row)),
    entries: toEntries(storedMonthsFromRows((entries.data ?? []) as unknown as Row[]), itemList),
    priorEmployers: (prior.data ?? []).map((r) => priorEmployerFromRow(r as unknown as Row)),
  };
}

/**
 * A year's BIR 2316s for a client (all employees with compensation, or one).
 * Reads through payroll_2316_data(), which the Owner and assigned staff may
 * always call and the client's own users only once the year is released, so the
 * portal can render certificates without reading the payroll tables.
 * Returns null when the caller may not see them.
 */
export async function load2316(supabase: SupabaseClient, clientId: string, year: number, employeeId?: string): Promise<Certificates2316 | null> {
  const { data, error } = await supabase.rpc("payroll_2316_data", { p_client: clientId, p_year: year });
  if (error) {
    if (error.code === "42501") return null;
    throw new Error(`Could not load the 2316s: ${error.message}`);
  }
  return certificatesFromRaw(data as Payroll2316Raw, year, employeeId);
}
