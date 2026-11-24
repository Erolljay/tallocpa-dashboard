"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner } from "@/lib/auth";
import { obligationChanges, obligationsForTaxTypes, TaxTypeError } from "@/lib/clients/obligations";
import { assignmentSchema, editClientSchema, engagementSchema, formToObject, newClientSchema } from "@/lib/clients/schema";
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

export async function setClientStatusAction(clientId: string, status: "active" | "inactive"): Promise<FormState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("clients").update({ status }).eq("id", clientId);
  if (error) return { error: `Could not update the client: ${error.message}` };
  revalidatePath(`/app/clients/${clientId}`);
  revalidatePath("/app/clients");
  return { ok: true };
}
