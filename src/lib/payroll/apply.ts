import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { toDecimalString } from "@/lib/returns/money";
import type { Centavos } from "@/lib/returns/types";
import { loadEmployees, loadItems, loadStored } from "./data";
import type { PayrollItem } from "./items";
import { checkRegister, type CheckedRegister, type RegisterIssue, type RegisterRow } from "./register";
import { monthPayload, sameMonth, toEntries, type MonthInput } from "./rows";
import type { Employee } from "./types";
import { displayName } from "./year";

/** What the preview screen shows (serializable). */
export interface RegisterPreview {
  rows: { name: string; employeeNo: string | null; lines: number[]; gross: string; deductions: string; net: string; isNew: boolean }[];
  errors: RegisterIssue[];
  newEmployees: number;
  rowCount: number;
}

function totals(lines: Map<string, Centavos>, items: PayrollItem[]) {
  const kind = new Map(items.map((i) => [i.id, i.kind]));
  let gross = 0;
  let deductions = 0;
  for (const [id, a] of lines) {
    if (kind.get(id) === "earning") gross += a;
    else if (kind.get(id) === "deduction") deductions += a;
  }
  return { gross: toDecimalString(gross), deductions: toDecimalString(deductions), net: toDecimalString(gross - deductions) };
}

export function previewOf(checked: CheckedRegister, employees: Employee[], items: PayrollItem[]): RegisterPreview {
  const known = [...checked.entries.entries()].map(([id, lines]) => {
    const e = employees.find((x) => x.id === id)!;
    return { name: displayName(e), employeeNo: e.employeeNo, lines: checked.linesByEmployee.get(id) ?? [], ...totals(lines, items), isNew: false };
  });
  const fresh = checked.newEmployees.map((n) => ({ name: displayName(n), employeeNo: n.employeeNo, lines: n.rows, ...totals(n.lines, items), isNew: true }));
  return { rows: [...known, ...fresh].sort((a, b) => (a.lines[0] ?? 0) - (b.lines[0] ?? 0)), errors: checked.errors, newEmployees: checked.newEmployees.length, rowCount: checked.rowCount };
}

/**
 * Saves a checked register into the month (staff upload, or posting a client's
 * submission): adds the new employees if staff agreed (flagged "needs details"),
 * keeps each employee's existing adjustment and note, works out item 22 and saves
 * in one call (save_payroll_month, which also marks the submission posted). A run for
 * part of the month (`periodEnd`) replaces only that period's figures.
 */
export async function applyRegister(
  supabase: SupabaseClient,
  clientId: string,
  month: string,
  rows: RegisterRow[],
  opts: { addNew: boolean; submissionId?: string; periodEnd?: string | null },
): Promise<{ saved: number } | { error: string; preview?: RegisterPreview }> {
  const items = await loadItems(supabase, clientId);
  let employees = await loadEmployees(supabase, clientId);
  let checked = checkRegister(rows, employees, items, month);
  if (checked.errors.length) return { error: "Fix the rows listed below and upload the file again.", preview: previewOf(checked, employees, items) };
  if (checked.newEmployees.length) {
    if (!opts.addNew) return { error: "Some rows are for people who are not on the employee list. Tick “Add them as new employees”, or fix the Employee No.", preview: previewOf(checked, employees, items) };
    const { error } = await supabase.from("employees").insert(
      checked.newEmployees.map((n) => ({ client_id: clientId, employee_no: n.employeeNo, last_name: n.lastName, first_name: n.firstName, middle_name: n.middleName, tin: n.tin, needs_details: true })),
    );
    if (error) return { error: `Could not add the new employees: ${error.message}` };
    employees = await loadEmployees(supabase, clientId);
    checked = checkRegister(rows, employees, items, month);
    if (checked.errors.length || checked.newEmployees.length) return { error: "The new employees could not be matched after adding them.", preview: previewOf(checked, employees, items) };
  }
  const year = Number(month.slice(0, 4));
  const stored = await loadStored(supabase, clientId, `${year}-01-01`, month);
  const current = new Map(stored.filter((s) => s.payMonth === month).map((s) => [s.employeeId, s]));
  const input = new Map<string, MonthInput>();
  for (const [id, lines] of checked.entries) {
    // A run for part of the month (the 15th, the 30th) stands beside the month's other runs.
    if (opts.periodEnd) {
      input.set(id, { lines, adjustment: 0, note: null });
      continue;
    }
    const ex = current.get(id);
    const v = { lines, adjustment: ex?.adjustment ?? 0, note: ex?.note ?? null };
    if (!sameMonth(ex, v)) input.set(id, v);
  }
  if (input.size === 0 && !opts.submissionId) return { saved: 0 };
  const earlier = toEntries(stored.filter((s) => s.payMonth < month), items);
  const payload = monthPayload(year, Number(month.slice(5, 7)) - 1, employees, items, earlier, input).map((e) => ({ ...e, pay_period_end: opts.periodEnd ?? null }));
  const { error } = await supabase.rpc("save_payroll_month", { p_client: clientId, p_month: month, p_entries: payload, p_submission: opts.submissionId ?? null });
  if (error) return { error: error.message };
  return { saved: input.size };
}
