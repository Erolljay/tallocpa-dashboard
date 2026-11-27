import "server-only";
import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireStaff } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";
import type { PayrollItem } from "./items";
import { EMPLOYEE_COLUMNS, ENTRY_COLUMNS, ITEM_COLUMNS, PRIOR_EMPLOYER_COLUMNS, employeeFromRow, itemFromRow, priorEmployerFromRow, storedMonthsFromRows, toEntries, type StoredMonth } from "./rows";
import type { Employee, PayrollEntry, PriorEmployer } from "./types";

export interface PayrollClient {
  id: string;
  name: string;
  tin: string | null;
  rdo_code: string | null;
  registered_address: string | null;
  zip_code: string | null;
}

/**
 * The client whose payroll a staff screen shows. Payroll is for the Owner and
 * staff assigned to the client (RLS enforces the same); anyone else gets 404.
 */
export async function payrollAccess(clientId: string) {
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const { data: client } = await supabase.from("clients").select("id, name, tin, rdo_code, registered_address, zip_code").eq("id", clientId).maybeSingle();
  if (!client) notFound();
  if (me.staff.role !== "owner") {
    const { data: a } = await supabase.from("staff_assignments").select("user_id").eq("client_id", clientId).eq("user_id", me.userId).limit(1);
    if (!a?.length) notFound();
  }
  return { me, supabase, client: client as PayrollClient };
}

export async function loadEmployees(supabase: SupabaseClient, clientId: string): Promise<Employee[]> {
  const { data, error } = await supabase.from("employees").select(EMPLOYEE_COLUMNS).eq("client_id", clientId);
  if (error) throw new Error(`Could not load employees: ${error.message}`);
  return (data ?? []).map((r) => employeeFromRow(r as unknown as Record<string, unknown>));
}

/** Employees' previous employers within `year` (BIR 2316 Part III). */
export async function loadPriorEmployers(supabase: SupabaseClient, clientId: string, year: number): Promise<PriorEmployer[]> {
  const { data, error } = await supabase.from("employee_prior_employers").select(PRIOR_EMPLOYER_COLUMNS).eq("client_id", clientId).eq("year", year);
  if (error) throw new Error(`Could not load previous employers: ${error.message}`);
  return (data ?? []).map((r) => priorEmployerFromRow(r as unknown as Record<string, unknown>));
}

/** Per-client 2316 settings (payroll_settings): employer ZIP code and signatory. */
export interface PayrollSettings {
  employerZipCode: string | null;
  signatoryName: string | null;
  signatoryTitle: string | null;
}

export async function loadPayrollSettings(supabase: SupabaseClient, clientId: string): Promise<PayrollSettings> {
  const { data, error } = await supabase.from("payroll_settings").select("employer_zip_code, signatory_name, signatory_title").eq("client_id", clientId).maybeSingle();
  if (error) throw new Error(`Could not load payroll settings: ${error.message}`);
  return { employerZipCode: data?.employer_zip_code ?? null, signatoryName: data?.signatory_name ?? null, signatoryTitle: data?.signatory_title ?? null };
}

/** When a year's 2316s were released to the client's portal users (null if not released). */
export async function load2316Release(supabase: SupabaseClient, clientId: string, year: number): Promise<{ releasedAt: string; releasedBy: string } | null> {
  const { data, error } = await supabase.from("payroll_2316_releases").select("released_at, released_by").eq("client_id", clientId).eq("year", year).maybeSingle();
  if (error) throw new Error(`Could not load the 2316 release: ${error.message}`);
  return data ? { releasedAt: String(data.released_at), releasedBy: String(data.released_by) } : null;
}

/** The client's payslip items (sorted for the register). Adds the default set the first time, when `seed` and none exist. */
export async function loadItems(supabase: SupabaseClient, clientId: string, seed = false): Promise<PayrollItem[]> {
  if (seed) await supabase.rpc("ensure_payroll_items", { p_client: clientId });
  const { data, error } = await supabase.from("payroll_items").select(ITEM_COLUMNS).eq("client_id", clientId);
  if (error) throw new Error(`Could not load payslip items: ${error.message}`);
  return (data ?? []).map((r) => itemFromRow(r as unknown as Record<string, unknown>));
}

/** Stored months (item lines) from `from` to `to` (first days of months, inclusive). */
export async function loadStored(supabase: SupabaseClient, clientId: string, from: string, to: string): Promise<StoredMonth[]> {
  const { data, error } = await supabase.from("payroll_entries").select(ENTRY_COLUMNS).eq("client_id", clientId).gte("pay_month", from).lte("pay_month", to);
  if (error) throw new Error(`Could not load payroll: ${error.message}`);
  return storedMonthsFromRows((data ?? []) as unknown as Record<string, unknown>[]);
}

/** Category totals per employee-month from `from` to `to`. */
export async function loadEntries(supabase: SupabaseClient, clientId: string, items: PayrollItem[], from: string, to: string): Promise<PayrollEntry[]> {
  return toEntries(await loadStored(supabase, clientId, from, to), items);
}

/** Is the month's 1601-C filed (payroll locked)? */
export async function monthLocked(supabase: SupabaseClient, clientId: string, month: string): Promise<boolean> {
  const { data } = await supabase
    .from("filing_instances")
    .select("id")
    .eq("client_id", clientId)
    .eq("form", "1601-C")
    .lte("period_start", month)
    .gte("period_end", month)
    .in("status", ["filed", "paid", "proof_uploaded"])
    .limit(1);
  return (data ?? []).length > 0;
}

/** Employees who belong on a month's register: active, or leaving in/after the month, or already paid in it. */
export function employeesForMonth(employees: Employee[], month: string, paid: Set<string>): Employee[] {
  return employees.filter((e) => paid.has(e.id) || (e.active && (!e.hireDate || e.hireDate.slice(0, 7) <= month.slice(0, 7))) || (e.separationDate != null && e.separationDate.slice(0, 7) >= month.slice(0, 7) && (!e.hireDate || e.hireDate.slice(0, 7) <= month.slice(0, 7))));
}

/** Accounts an employee's pay can be booked to (payroll to the books): the client's active cost and expense accounts. */
export async function payAccountsOf(supabase: SupabaseClient, clientId: string): Promise<{ id: string; label: string; group: string }[]> {
  const { data } = await supabase.from("ledger_accounts").select("id, code, name, type").eq("client_id", clientId).eq("active", true).in("type", ["cost", "expense"]).order("sort_order");
  return (data ?? []).map((a) => ({ id: a.id, label: `${a.code} · ${a.name}`, group: a.type === "cost" ? "Cost of sales or services" : "Operating expenses" }));
}
