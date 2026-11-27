"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner, requireStaff } from "@/lib/auth";
import { obligationChanges, obligationsForTaxTypes, TaxTypeError } from "@/lib/clients/obligations";
import { assignmentSchema, editClientSchema, engagementSchema, formToObject, newClientSchema } from "@/lib/clients/schema";
import { taxableYearStart } from "@/lib/ledger/books";
import { templatePayload } from "@/lib/ledger/coa";
import { chartStart, TEMPLATE_FOR_TAXPAYER } from "@/lib/ledger/types";
import { supabaseServer } from "@/lib/supabase/server";

export type FormState = { error?: string; fieldErrors?: Record<string, string>; ok?: boolean };

function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) {
    const key = String(i.path[0] ?? "form");
    out[key] ??= i.message;
  }
  return out;
}

export async function createClientAction(_: FormState, form: FormData): Promise<FormState> {
  const owner = await requireOwner();
  const parsed = newClientSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  const v = parsed.data;

  let planned;
  try {
    planned = obligationsForTaxTypes(v.taxpayer_type, v.tax_types);
  } catch (e) {
    if (e instanceof TaxTypeError) return { error: e.message, fieldErrors: { tax_types: e.message } };
    throw e;
  }

  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("create_client_with_obligations", {
    p_client: {
      brand_id: owner.staff.brandId,
      name: v.name,
      taxpayer_type: v.taxpayer_type,
      tin: v.tin ?? "",
      rdo_code: v.rdo_code ?? "",
      registered_address: v.registered_address ?? "",
      fiscal_year_end_month: v.fiscal_year_end_month,
      filing_channel: v.filing_channel,
      efps_group: v.efps_group ?? "",
      book_type: v.book_type,
      payment_mode: v.payment_mode,
      submission_cutoff_day: v.submission_cutoff_day,
      branch_id: v.branch_id,
    },
    p_tax_types: v.tax_types,
    p_registration_date: v.registration_date,
    p_obligations: planned.map((o) => ({ form: o.form, frequency: o.frequency, start_date: v.registration_date })),
  });
  if (error) return { error: `Could not save the client: ${error.message}` };
  const clientId = (data as { id: string }).id;
  // The ZIP code is not part of create_client_with_obligations' payload.
  if (v.zip_code) await supabase.from("clients").update({ zip_code: v.zip_code }).eq("id", clientId);
  // Every client keeps account titles (decision 2). Best effort: the Books page can set it up later.
  await supabase.rpc("setup_books", {
    p_client: clientId,
    p_template: TEMPLATE_FOR_TAXPAYER[v.taxpayer_type] ?? "stock_corporation",
    p_books_start: chartStart(v.registration_date),
    p_accounts: templatePayload(TEMPLATE_FOR_TAXPAYER[v.taxpayer_type] ?? "stock_corporation"),
  });

  const team: { client_id: string; user_id: string; role: "preparer" | "reviewer" }[] = [];
  if (v.preparer_id) team.push({ client_id: clientId, user_id: v.preparer_id, role: "preparer" });
  if (v.reviewer_id) team.push({ client_id: clientId, user_id: v.reviewer_id, role: "reviewer" });
  if (team.length) {
    const { error: teamError } = await supabase.from("staff_assignments").insert(team);
    // The client is saved; a failed assignment can be redone from the client page.
    if (teamError) redirect(`/app/clients/${clientId}?error=assign_failed`);
  }
  revalidatePath("/app/clients");
  redirect(`/app/clients/${clientId}`);
}

/** Owner edits a client. A changed tax setup starts and ends obligations from the effective date. */
export async function updateClientAction(clientId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireOwner();
  const parsed = editClientSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  const v = parsed.data;

  let planned;
  try {
    planned = obligationsForTaxTypes(v.taxpayer_type, v.tax_types);
  } catch (e) {
    if (e instanceof TaxTypeError) return { error: e.message, fieldErrors: { tax_types: e.message } };
    throw e;
  }

  const supabase = await supabaseServer();
  const { data: open, error: readError } = await supabase.from("obligations").select("form").eq("client_id", clientId).is("end_date", null);
  if (readError) return { error: `Could not read the client's obligations: ${readError.message}` };
  const { add, end } = obligationChanges(open ?? [], planned);
  const taxSetupChanged = add.length > 0 || end.length > 0;
  if (taxSetupChanged && !v.effective_date) {
    const message = "The forms this client files will change. Enter the date the change took effect.";
    return { error: message, fieldErrors: { effective_date: message } };
  }

  const { error } = await supabase.rpc("update_client_with_obligations", {
    p_client_id: clientId,
    p_client: {
      name: v.name,
      taxpayer_type: v.taxpayer_type,
      tin: v.tin ?? "",
      rdo_code: v.rdo_code ?? "",
      registered_address: v.registered_address ?? "",
      fiscal_year_end_month: v.fiscal_year_end_month,
      filing_channel: v.filing_channel,
      efps_group: v.efps_group ?? "",
      book_type: v.book_type,
      payment_mode: v.payment_mode,
      submission_cutoff_day: v.submission_cutoff_day,
      branch_id: v.branch_id,
    },
    p_tax_types: taxSetupChanged ? v.tax_types : null,
    p_effective_date: taxSetupChanged ? v.effective_date : null,
    p_add: add.map((o) => ({ form: o.form, frequency: o.frequency })),
    p_end: end,
  });
  if (error) return { error: `Could not save the client: ${error.message}` };
  // The ZIP code is not part of update_client_with_obligations' payload.
  const zip = await supabase.from("clients").update({ zip_code: v.zip_code ?? null }).eq("id", clientId);
  if (zip.error) return { error: `The client was saved, but not its ZIP code: ${zip.error.message}`, fieldErrors: { zip_code: "Not saved." } };
  revalidatePath("/app/clients");
  revalidatePath(`/app/clients/${clientId}`);
  redirect(`/app/clients/${clientId}`);
}

export async function addEngagementAction(clientId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireOwner();
  const parsed = engagementSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  const supabase = await supabaseServer();
  const { error } = await supabase.from("engagements").insert({ client_id: clientId, ...parsed.data });
  if (error) return { error: `Could not save the engagement: ${error.message}` };
  revalidatePath(`/app/clients/${clientId}`);
  return { ok: true };
}

export async function assignStaffAction(clientId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireOwner();
  const parsed = assignmentSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Choose a staff member and a role.", fieldErrors: fieldErrors(parsed.error.issues) };
  const supabase = await supabaseServer();
  const { error } = await supabase.from("staff_assignments").insert({ client_id: clientId, ...parsed.data });
  if (error) {
    return { error: error.code === "23505" ? "That person already has this role for the client." : `Could not assign: ${error.message}` };
  }
  revalidatePath(`/app/clients/${clientId}`);
  return { ok: true };
}

export async function removeAssignmentAction(clientId: string, userId: string, role: "preparer" | "reviewer"): Promise<FormState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("staff_assignments").delete().match({ client_id: clientId, user_id: userId, role });
  if (error) return { error: `Could not remove: ${error.message}` };
  revalidatePath(`/app/clients/${clientId}`);
  revalidatePath("/app/clients");
  return { ok: true };
}

/**
 * The client's income tax method (docs/REWORK.md decision 11): OSD, itemized, or 8%
 * (individuals only), used by the 1701Q and 1702Q worksheets. The Owner or staff
 * assigned to the client set it; the database checks.
 */
export async function setIncomeTaxMethodAction(clientId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const method = String(form.get("income_tax_method") ?? "").trim();
  const { error } = await supabase.rpc("set_client_income_tax_method", { p_client: clientId, p_method: method || null });
  if (error) return { error: error.message };
  revalidatePath(`/app/clients/${clientId}`);
  return { ok: true };
}

export type ClientStatusTarget = "active" | "inactive" | "archived";

export async function setClientStatusAction(clientId: string, status: ClientStatusTarget): Promise<FormState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("clients").update({ status }).eq("id", clientId);
  if (error) return { error: `Could not update the client: ${error.message}` };
  revalidatePath(`/app/clients/${clientId}`);
  revalidatePath("/app/clients");
  return { ok: true };
}

/**
 * The Owner sets up account titles for every client that has none (decision 2), each
 * from the template for its kind of taxpayer, books starting `month` (YYYY-MM).
 */
export async function setupMissingChartsAction(_: { ok?: string; error?: string }, form: FormData): Promise<{ ok?: string; error?: string }> {
  await requireOwner();
  const month = String(form.get("books_start") ?? "");
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return { error: "Choose the first month of the books." };
  const supabase = await supabaseServer();
  const [{ data: clients }, { data: books }] = await Promise.all([
    supabase.from("clients").select("id, name, taxpayer_type, fiscal_year_end_month").neq("status", "archived"),
    supabase.from("client_books").select("client_id"),
  ]);
  const have = new Set((books ?? []).map((b) => b.client_id));
  const todo = (clients ?? []).filter((c) => !have.has(c.id));
  const failed: string[] = [];
  // Any cut-off: the same month for every client, or each client's own taxable year (fiscal-year clients).
  const perYear = form.get("start_rule") === "taxable_year";
  for (const c of todo) {
    const template = TEMPLATE_FOR_TAXPAYER[c.taxpayer_type] ?? "stock_corporation";
    const start = perYear ? taxableYearStart(`${month}-01`, c.fiscal_year_end_month ?? 12) : `${month}-01`;
    const { error } = await supabase.rpc("setup_books", { p_client: c.id, p_template: template, p_books_start: start, p_accounts: templatePayload(template) });
    if (error) failed.push(`${c.name}: ${error.message}`);
  }
  revalidatePath("/app", "layout");
  const done = todo.length - failed.length;
  const ok = `Account titles set up for ${done} client${done === 1 ? "" : "s"}.`;
  return failed.length ? { ok, error: `Not set up: ${failed.join("; ")}` } : { ok };
}

/**
 * Catch-up accounting (migration 20270104000001): the Owner puts the client in catch-up
 * through a month (YYYY-MM), or ends it ("end").
 */
export async function setCatchUpAction(clientId: string, mode: "set" | "end", _: FormState, form: FormData): Promise<FormState> {
  await requireOwner();
  const month = String(form.get("through") ?? "").trim();
  if (mode === "set" && !/^\d{4}-\d{2}$/.test(month)) return { error: "Choose the last month to catch up." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("set_catch_up", { p_client: clientId, p_through: mode === "set" ? `${month}-01` : null });
  if (error) return { error: error.message };
  revalidatePath(`/app/clients/${clientId}`);
  revalidatePath("/app/deadlines");
  revalidatePath("/app");
  return { ok: true };
}
