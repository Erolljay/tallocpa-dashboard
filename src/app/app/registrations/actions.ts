"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner, requireStaff } from "@/lib/auth";
import { formToObject } from "@/lib/clients/schema";
import { closureSchema, newRegistrationSchema, renewalSchema, stepUpdateSchema } from "@/lib/registration/schema";
import { closureStepsFor, dtiRenewalDue, renewalStepsFor, stepsFor, stepsPayload } from "@/lib/registration/steps";
import type { TaxpayerType } from "@/lib/clients/obligations";
import { supabaseServer } from "@/lib/supabase/server";

export type FormState = { error?: string; fieldErrors?: Record<string, string>; ok?: boolean; message?: string };

function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) out[String(i.path[0] ?? "form")] ??= i.message;
  return out;
}

/** The Owner opens a registration: the client (Onboarding), the engagement and the checklist. */
export async function openRegistrationAction(_: FormState, form: FormData): Promise<FormState> {
  const owner = await requireOwner();
  const parsed = newRegistrationSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  const v = parsed.data;

  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("open_registration_case", {
    p_client: {
      brand_id: owner.staff.brandId,
      branch_id: v.branch_id,
      name: v.name,
      taxpayer_type: v.taxpayer_type,
      registered_address: v.registered_address ?? "",
      fiscal_year_end_month: v.fiscal_year_end_month,
    },
    p_case: { lgu_served: v.lgu_served, employer: v.employer, lgu: v.lgu ?? "", start_date: v.start_date, target_date: v.target_date ?? "", notes: v.notes ?? "" },
    p_steps: stepsPayload(stepsFor(v.taxpayer_type, { lguServed: v.lgu_served, employer: v.employer })),
  });
  if (error) return { error: `Could not open the registration: ${error.message}` };
  const opened = data as { id: string; client_id: string };

  if (v.preparer_id) {
    const { error: teamError } = await supabase.from("staff_assignments").insert({ client_id: opened.client_id, user_id: v.preparer_id, role: "preparer" });
    if (teamError) redirect(`/app/registrations/${opened.id}?error=assign_failed`);
  }
  revalidatePath("/app/registrations");
  revalidatePath("/app/clients");
  redirect(`/app/registrations/${opened.id}`);
}

/** Staff on the client record a step's progress. */
export async function updateStepAction(caseId: string, stepId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireStaff();
  const parsed = stepUpdateSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check the step.", fieldErrors: fieldErrors(parsed.error.issues) };
  const v = parsed.data;
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("update_registration_step", {
    p_step: stepId,
    p_status: v.status,
    p_reference: v.reference_no ?? "",
    p_done_on: v.status === "done" ? v.done_on! : null,
    p_fee: v.government_fee ?? null,
    p_notes: v.notes ?? "",
  });
  if (error) return { error: error.message };
  revalidatePath(`/app/registrations/${caseId}`);
  revalidatePath("/app/registrations");
  return { ok: true };
}

/** The Owner completes the case; the client becomes active. */
export async function completeRegistrationAction(caseId: string): Promise<FormState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("complete_registration_case", { p_case: caseId });
  if (error) return { error: error.message };
  revalidatePath(`/app/registrations/${caseId}`);
  revalidatePath("/app/registrations");
  revalidatePath("/app/clients");
  return { ok: true };
}

/** The Owner cancels an open case, with the reason. */
export async function cancelRegistrationAction(caseId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireOwner();
  const reason = String(form.get("reason") ?? "").trim();
  if (!reason) return { error: "Give the reason for cancelling.", fieldErrors: { reason: "Give the reason for cancelling." } };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("cancel_registration_case", { p_case: caseId, p_reason: reason });
  if (error) return { error: error.message };
  revalidatePath(`/app/registrations/${caseId}`);
  revalidatePath("/app/registrations");
  return { ok: true };
}

/** The Owner opens a renewal or a closure for an existing client. */
export async function openClientCaseAction(clientId: string, kind: "renewal" | "closure", _: FormState, form: FormData): Promise<FormState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { data: client } = await supabase.from("clients").select("taxpayer_type").eq("id", clientId).maybeSingle();
  if (!client) return { error: "Client not found." };
  const type = client.taxpayer_type as TaxpayerType;

  let caseData: Record<string, unknown>;
  let steps;
  if (kind === "renewal") {
    const parsed = renewalSchema.safeParse(formToObject(form));
    if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
    const v = parsed.data;
    caseData = { period_year: v.period_year, lgu_served: v.lgu_served, target_date: v.target_date ?? "", notes: v.notes ?? "" };
    steps = renewalStepsFor(type, { lguServed: v.lgu_served, dtiDue: v.dti_due });
  } else {
    const parsed = closureSchema.safeParse(formToObject(form));
    if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
    const v = parsed.data;
    caseData = { effective_date: v.effective_date, lgu_served: v.lgu_served, employer: v.employer, target_date: v.target_date ?? "", notes: v.notes ?? "" };
    steps = closureStepsFor(type, { lguServed: v.lgu_served, employer: v.employer });
  }
  const { data, error } = await supabase.rpc("open_client_case", { p_client: clientId, p_kind: kind, p_case: caseData, p_steps: stepsPayload(steps) });
  if (error) {
    if (error.message.includes("registration_cases_renewal_idx")) return { error: "This client already has a renewal for that year." };
    if (error.message.includes("registration_cases_open_idx")) return { error: `This client already has an open ${kind === "renewal" ? "renewal" : "closure"}.` };
    return { error: error.message };
  }
  revalidatePath("/app/registrations");
  revalidatePath(`/app/clients/${clientId}`);
  redirect(`/app/registrations/${(data as { id: string }).id}`);
}

/** When each client's DTI business name was registered through us (the DTI step of a completed new-business case). */
async function dtiRegisteredOn(supabase: Awaited<ReturnType<typeof supabaseServer>>) {
  const { data } = await supabase
    .from("registration_steps")
    .select("done_on, registration_cases!inner(client_id, kind, status)")
    .eq("code", "dti_business_name")
    .eq("status", "done")
    .eq("registration_cases.kind", "new_business");
  return new Map((data ?? []).map((r) => [(r.registration_cases as unknown as { client_id: string }).client_id, r.done_on as string]));
}

/**
 * The Owner opens the year's renewals for every active client that has none
 * yet. The firm is taken to handle the permits; staff mark what the client
 * handles as not needed. The DTI renewal is due every 5 years from the DTI
 * registration we did.
 */
export async function openYearRenewalsAction(_: FormState, form: FormData): Promise<FormState> {
  await requireOwner();
  const year = Number(form.get("year"));
  if (!Number.isInteger(year) || year < 2000 || year > 2100) return { error: "Choose the year." };
  const supabase = await supabaseServer();
  const [{ data: clients, error }, { data: existing }, dti] = await Promise.all([
    supabase.from("clients").select("id, taxpayer_type").eq("status", "active"),
    supabase.from("registration_cases").select("client_id").eq("kind", "renewal").eq("period_year", year).neq("status", "cancelled"),
    dtiRegisteredOn(supabase),
  ]);
  if (error) return { error: error.message };
  const has = new Set((existing ?? []).map((r) => r.client_id));
  const todo = (clients ?? []).filter((c) => !has.has(c.id));
  let opened = 0;
  const failed: string[] = [];
  for (const c of todo) {
    const type = c.taxpayer_type as TaxpayerType;
    const steps = renewalStepsFor(type, { lguServed: true, dtiDue: dtiRenewalDue(dti.get(c.id) ?? null, year) });
    const { error: e } = await supabase.rpc("open_client_case", {
      p_client: c.id,
      p_kind: "renewal",
      p_case: { period_year: year, lgu_served: true, target_date: `${year}-01-20` },
      p_steps: stepsPayload(steps),
    });
    if (e) failed.push(e.message);
    else opened++;
  }
  revalidatePath("/app/registrations");
  if (failed.length) return { error: `Opened ${opened}; ${failed.length} could not be opened: ${failed[0]}` };
  if (opened === 0) return { error: `Every active client already has a ${year} renewal.` };
  return { ok: true, message: `Opened ${opened} renewal${opened === 1 ? "" : "s"} for ${year}.` };
}
