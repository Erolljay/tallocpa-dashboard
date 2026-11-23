import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { EMPLOYEE_COLUMNS, ENTRY_COLUMNS, ITEM_COLUMNS, employeeFromRow, itemFromRow, storedMonthsFromRows, toEntries } from "./rows";
import type { PayrollContext } from "./types";

type Row = Record<string, unknown>;

/**
 * The payroll a 1601-C or 1604-C worksheet needs (WorksheetContext.payroll):
 * every employee of the client and their pay, totalled by BIR category, from
 * 1 January of the year of `periodEnd` through the month of `periodEnd`.
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
  const [employees, items, entries] = await Promise.all([
    supabase.from("employees").select(EMPLOYEE_COLUMNS).eq("client_id", clientId),
    supabase.from("payroll_items").select(ITEM_COLUMNS).eq("client_id", clientId),
    supabase
      .from("payroll_entries")
      .select(ENTRY_COLUMNS)
      .eq("client_id", clientId)
      .gte("pay_month", `${year}-01-01`)
      .lte("pay_month", `${year}-${String(throughMonth).padStart(2, "0")}-01`),
  ]);
  for (const r of [employees, items, entries]) if (r.error) throw new Error(`Could not load payroll: ${r.error.message}`);
  const itemList = (items.data ?? []).map((r) => itemFromRow(r as unknown as Row));
  return {
    year,
    throughMonth,
    employees: (employees.data ?? []).map((r) => employeeFromRow(r as unknown as Row)),
    entries: toEntries(storedMonthsFromRows((entries.data ?? []) as unknown as Row[]), itemList),
  };
}
