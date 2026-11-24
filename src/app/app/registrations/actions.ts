"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner, requireStaff } from "@/lib/auth";
import { formToObject } from "@/lib/clients/schema";
import { newRegistrationSchema, stepUpdateSchema } from "@/lib/registration/schema";
import { stepsFor, stepsPayload } from "@/lib/registration/steps";
import { supabaseServer } from "@/lib/supabase/server";

export type FormState = { error?: string; fieldErrors?: Record<string, string>; ok?: boolean };

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
