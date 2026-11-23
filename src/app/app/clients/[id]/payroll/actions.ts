"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { applyRegister, previewOf, type RegisterPreview } from "@/lib/payroll/apply";
import { loadEmployees, loadItems, loadStored, payrollAccess } from "@/lib/payroll/data";
import { checkEmployeeImport, readEmployeeFile, type CheckedEmployees } from "@/lib/payroll/employees-xlsx";
import { CATEGORIES, type BirCategory, type ItemKind } from "@/lib/payroll/items";
import { checkRegister, type RegisterRow } from "@/lib/payroll/register";
import { readRegister } from "@/lib/payroll/register-xlsx";
import { categoryToDb, monthPayload, sameMonth, toEntries, type MonthInput } from "@/lib/payroll/rows";
import { employeeSchema } from "@/lib/payroll/schema";
import { toCentavos } from "@/lib/returns/money";

export type FormState = { error?: string; fieldErrors?: Record<string, string>; ok?: string };
export type RegisterState = { error?: string; ok?: string; preview?: RegisterPreview };

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])-01$/;

function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) out[String(i.path[0] ?? "form")] ??= i.message;
  return out;
}

function friendly(message: string): string {
  if (message.includes("employees_client_tin_key")) return "Another employee of this client already has that TIN.";
  if (message.includes("employees_client_id_employee_no_key")) return "Another employee of this client already has that Employee No.";
  return message;
}

/** Add an employee (employeeId null) or edit one, including separating them. */
export async function saveEmployeeAction(clientId: string, employeeId: string | null, _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await payrollAccess(clientId);
  const parsed = employeeSchema.safeParse(Object.fromEntries(form.entries()));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  const { error } = employeeId
    ? await supabase.from("employees").update(parsed.data).eq("id", employeeId).eq("client_id", clientId)
    : await supabase.from("employees").insert({ ...parsed.data, client_id: clientId });
  if (error) return { error: `Could not save the employee: ${friendly(error.message)}` };
  revalidatePath(`/app/clients/${clientId}/payroll`, "layout");
  redirect(`/app/clients/${clientId}/payroll`);
}

/** The monthly grid: one block per employee, `<employee id>:item:<item id>`, `:adjustment` and `:note` inputs. Only changed employees are saved; a cleared one is removed. */
export async function saveMonthAction(clientId: string, month: string, _: FormState, form: FormData): Promise<FormState> {
  if (!MONTH_RE.test(month)) return { error: "Unknown month." };
  const { supabase } = await payrollAccess(clientId);
  const ids = String(form.get("employee_ids") ?? "").split(",").filter(Boolean);
  const [items, employees] = await Promise.all([loadItems(supabase, clientId), loadEmployees(supabase, clientId)]);
  const kind = new Map(items.map((i) => [i.id, i.kind]));
  const errs: Record<string, string> = {};
  const input = new Map<string, MonthInput>();
  for (const id of ids) {
    const lines = new Map<string, number>();
    for (const item of items) {
      const key = `${id}:item:${item.id}`;
      const raw = String(form.get(key) ?? "").trim();
      if (raw === "") continue;
      const c = toCentavos(raw);
      if (c == null) errs[key] = "Not an amount";
      else if (c < 0 && kind.get(item.id) !== "earning") errs[key] = "Cannot be negative";
      else if (c !== 0) lines.set(item.id, c);
    }
    const rawAdj = String(form.get(`${id}:adjustment`) ?? "").trim();
    const adjustment = rawAdj === "" ? 0 : toCentavos(rawAdj);
    if (adjustment == null) errs[`${id}:adjustment`] = "Not an amount";
    const note = String(form.get(`${id}:note`) ?? "").trim() || null;
    input.set(id, { lines, adjustment: adjustment ?? 0, note });
  }
  if (Object.keys(errs).length) return { error: "Some amounts are not valid; they are marked below.", fieldErrors: errs };

  const year = Number(month.slice(0, 4));
  const stored = await loadStored(supabase, clientId, `${year}-01-01`, month);
  const current = new Map(stored.filter((s) => s.payMonth === month).map((s) => [s.employeeId, s]));
  for (const [id, v] of input) if (sameMonth(current.get(id), v)) input.delete(id);
  if (input.size === 0) return { ok: "No changes." };
  const payload = monthPayload(year, Number(month.slice(5, 7)) - 1, employees, items, toEntries(stored.filter((s) => s.payMonth < month), items), input);
  const { error } = await supabase.rpc("save_payroll_month", { p_client: clientId, p_month: month, p_entries: payload });
  if (error) return { error: error.message };
  revalidatePath(`/app/clients/${clientId}/payroll`, "layout");
  return { ok: `Saved: ${input.size} employee${input.size === 1 ? "" : "s"} changed.` };
}

function fileOf(form: FormData): { file: File } | { error: string } {
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose the filled-in payroll register (.xlsx)." };
  if (!file.name.toLowerCase().endsWith(".xlsx")) return { error: "Upload the register as an Excel workbook (.xlsx)." };
  return { file };
}

/** Staff upload, step 1: read and check the file; nothing is saved. */
export async function previewRegisterAction(clientId: string, month: string, _: RegisterState, form: FormData): Promise<RegisterState> {
  if (!MONTH_RE.test(month)) return { error: "Unknown month." };
  const { supabase } = await payrollAccess(clientId);
  const f = fileOf(form);
  if ("error" in f) return { error: f.error };
  const [items, employees] = await Promise.all([loadItems(supabase, clientId), loadEmployees(supabase, clientId)]);
  const read = await readRegister(await f.file.arrayBuffer(), items);
  if ("error" in read) return { error: read.error };
  const preview = previewOf(checkRegister(read.rows, employees, items, month), employees, items);
  if (preview.rowCount === 0) return { error: "The register has no amounts for this month." };
  return { preview };
}

/** Staff upload, step 2: read the file again and save it into the month. */
export async function saveRegisterAction(clientId: string, month: string, _: RegisterState, form: FormData): Promise<RegisterState> {
  if (!MONTH_RE.test(month)) return { error: "Unknown month." };
  const { supabase } = await payrollAccess(clientId);
  const f = fileOf(form);
  if ("error" in f) return { error: f.error };
  const read = await readRegister(await f.file.arrayBuffer(), await loadItems(supabase, clientId));
  if ("error" in read) return { error: read.error };
  const r = await applyRegister(supabase, clientId, month, read.rows, { addNew: form.get("add_new") === "on" });
  if ("error" in r) return { error: r.error, preview: r.preview };
  revalidatePath(`/app/clients/${clientId}/payroll`, "layout");
  return { ok: r.saved ? `Saved the register: ${r.saved} employee${r.saved === 1 ? "" : "s"} changed.` : "Saved: nothing had changed." };
}

/** Post a client's submitted register into the month. */
export async function postSubmissionAction(clientId: string, submissionId: string, _: RegisterState, form: FormData): Promise<RegisterState> {
  const { supabase } = await payrollAccess(clientId);
  const { data: sub } = await supabase.from("payroll_submissions").select("id, pay_month, rows, status").eq("id", submissionId).eq("client_id", clientId).maybeSingle();
  if (!sub) return { error: "Submission not found." };
  if (sub.status !== "pending") return { error: `This register was already ${sub.status}.` };
  const r = await applyRegister(supabase, clientId, String(sub.pay_month).slice(0, 10), sub.rows as RegisterRow[], { addNew: form.get("add_new") === "on", submissionId });
  if ("error" in r) return { error: r.error, preview: r.preview };
  revalidatePath(`/app/clients/${clientId}/payroll`, "layout");
  revalidatePath("/portal", "layout");
  return { ok: `Posted: ${r.saved} employee${r.saved === 1 ? "" : "s"} changed.` };
}

/** Return a client's register with a reason; they upload a corrected one. */
export async function returnSubmissionAction(clientId: string, submissionId: string, _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await payrollAccess(clientId);
  const reason = String(form.get("reason") ?? "").trim();
  if (!reason) return { error: "Say what needs fixing." };
  const { data, error } = await supabase
    .from("payroll_submissions")
    .update({ status: "returned", return_reason: reason })
    .eq("id", submissionId)
    .eq("client_id", clientId)
    .eq("status", "pending")
    .select("id");
  if (error) return { error: error.message };
  if (!data?.length) return { error: "This register is no longer waiting for review." };
  revalidatePath(`/app/clients/${clientId}/payroll`, "layout");
  revalidatePath("/portal", "layout");
  return { ok: "Returned to the client." };
}

// ---------------------------------------------------------------------------
// Payslip items (setup page).
// ---------------------------------------------------------------------------
export async function saveItemAction(clientId: string, itemId: string | null, _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await payrollAccess(clientId);
  const name = String(form.get("name") ?? "").trim().replace(/\s+/g, " ");
  const category = String(form.get("category") ?? "") as BirCategory;
  const info = CATEGORIES[category];
  if (!name) return { error: "Enter the item's name.", fieldErrors: { name: "Enter the item's name." } };
  if (!info) return { error: "Choose the BIR category.", fieldErrors: { category: "Choose the BIR category." } };
  if (["employee no.", "employee name (last, first middle)", "tin", "pay date (yyyy-mm-dd, optional)", "gross pay (computed)", "total deductions (computed)", "net pay (computed)"].includes(name.toLowerCase())) {
    return { error: "That name is one of the register's fixed columns.", fieldErrors: { name: "Choose another name." } };
  }
  const row = {
    name,
    kind: info.kind as ItemKind,
    bir_category: categoryToDb(category),
    sort_order: Number(form.get("sort_order") ?? 0) || 0,
    active: form.get("active") === "on",
  };
  const { error } = itemId
    ? await supabase.from("payroll_items").update(row).eq("id", itemId).eq("client_id", clientId)
    : await supabase.from("payroll_items").insert({ ...row, client_id: clientId });
  if (error) {
    if (error.message.includes("payroll_items_client_name_key")) return { error: "This client already has an item with that name.", fieldErrors: { name: "Already used." } };
    return { error: error.message };
  }
  revalidatePath(`/app/clients/${clientId}/payroll`, "layout");
  return { ok: "Saved." };
}

export async function deleteItemAction(clientId: string, itemId: string): Promise<FormState> {
  const { supabase } = await payrollAccess(clientId);
  const { data: used } = await supabase.from("payroll_entry_lines").select("id").eq("item_id", itemId).limit(1);
  if (used?.length) return { error: "Already used on the payroll: deactivate it instead." };
  const { error } = await supabase.from("payroll_items").delete().eq("id", itemId).eq("client_id", clientId);
  if (error) return { error: error.message };
  revalidatePath(`/app/clients/${clientId}/payroll`, "layout");
  return { ok: "Deleted." };
}

// ---------------------------------------------------------------------------
// Employee master upload (staff only).
// ---------------------------------------------------------------------------
export type EmployeeImportState = { error?: string; ok?: string; checked?: CheckedEmployees & { names: Record<number, string> } };

async function checkEmployeeFile(clientId: string, form: FormData) {
  const { supabase } = await payrollAccess(clientId);
  const f = fileOf(form);
  if ("error" in f) return { error: f.error } as const;
  const read = await readEmployeeFile(await f.file.arrayBuffer());
  if ("error" in read) return { error: read.error } as const;
  const existing = await loadEmployees(supabase, clientId);
  const checked = checkEmployeeImport(read.rows, existing);
  const names: Record<number, string> = {};
  for (const r of read.rows) names[r.line] = `${r.values.last_name ?? ""}, ${r.values.first_name ?? ""}`;
  return { supabase, checked, names, existing } as const;
}

export async function previewEmployeesAction(clientId: string, _: EmployeeImportState, form: FormData): Promise<EmployeeImportState> {
  const r = await checkEmployeeFile(clientId, form);
  if ("error" in r) return { error: r.error };
  if (!r.checked.creates.length && !r.checked.updates.length && !r.checked.errors.length) return { error: "The file has no employees." };
  return { checked: { ...r.checked, names: r.names } };
}

export async function saveEmployeesAction(clientId: string, _: EmployeeImportState, form: FormData): Promise<EmployeeImportState> {
  const r = await checkEmployeeFile(clientId, form);
  if ("error" in r) return { error: r.error };
  const { supabase, checked, existing } = r;
  if (checked.errors.length) return { error: "Fix the rows listed and upload again.", checked: { ...checked, names: r.names } };
  if (checked.creates.length) {
    const { error } = await supabase.from("employees").insert(checked.creates.map((c) => ({ ...c.data, client_id: clientId })));
    if (error) return { error: `Could not add the employees: ${friendly(error.message)}` };
  }
  for (const u of checked.updates) {
    const was = existing.find((e) => e.id === u.id);
    const { error } = await supabase.from("employees").update({ ...u.data, needs_details: !!was?.needsDetails && !u.data.tin }).eq("id", u.id).eq("client_id", clientId);
    if (error) return { error: `Row ${u.line}: ${friendly(error.message)}` };
  }
  revalidatePath(`/app/clients/${clientId}/payroll`, "layout");
  return { ok: `Saved: ${checked.creates.length} added, ${checked.updates.length} updated.` };
}
