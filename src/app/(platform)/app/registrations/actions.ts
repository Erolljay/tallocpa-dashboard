"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner, requireStaff } from "@/lib/auth";
import { formToObject } from "@/lib/clients/schema";
import { branchSchema, certificateSchema, closureSchema, employerSchema, newRegistrationSchema, renewalSchema, secFilingSchema, stepUpdateSchema, updateSchema } from "@/lib/registration/schema";
import {
  branchStepsFor,
  certificateStepsFor,
  closureStepsFor,
  dtiRenewalDue,
  employerStepsFor,
  registersWithSec,
  renewalStepsFor,
  SEC_ONLY_CHANGES,
  secFilingStepsFor,
  stepsFor,
  stepsPayload,
  updateStepsFor,
  type CaseKind,
} from "@/lib/registration/steps";
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

export type ClientCaseKind = Exclude<CaseKind, "new_business">;

/** The Owner opens a renewal, BIR update, branch or closure for an existing client. */
export async function openClientCaseAction(clientId: string, kind: ClientCaseKind, _: FormState, form: FormData): Promise<FormState> {
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
  } else if (kind === "bir_update") {
    const parsed = updateSchema.safeParse(formToObject(form));
    if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
    const v = parsed.data;
    if (!registersWithSec(type) && v.changes.some((c) => SEC_ONLY_CHANGES.includes(c))) {
      return { error: "Check the highlighted fields.", fieldErrors: { changes: "A sole proprietorship has no SEC amendments." } };
    }
    caseData = { effective_date: v.effective_date, changes: v.changes, lgu_served: v.lgu_served, employer: v.employer, lgu: v.lgu ?? "", target_date: v.target_date ?? "", notes: v.notes ?? "" };
    steps = updateStepsFor(type, v.changes, { lguServed: v.lgu_served, employer: v.employer });
  } else if (kind === "branch") {
    const parsed = branchSchema.safeParse(formToObject(form));
    if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
    const v = parsed.data;
    caseData = { branch_name: v.branch_name, lgu: v.lgu ?? "", lgu_served: v.lgu_served, target_date: v.target_date ?? "", notes: v.notes ?? "" };
    steps = branchStepsFor(type, { lguServed: v.lgu_served });
  } else if (kind === "sec_filing") {
    if (!registersWithSec(type)) return { error: "SEC filings are for partnerships and corporations." };
    const parsed = secFilingSchema.safeParse(formToObject(form));
    if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
    const v = parsed.data;
    caseData = { period_year: v.period_year, target_date: v.target_date ?? "", notes: v.notes ?? "" };
    steps = secFilingStepsFor(type, { gis: v.gis, afs: v.afs });
  } else if (kind === "certificate") {
    const parsed = certificateSchema.safeParse(formToObject(form));
    if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
    const v = parsed.data;
    caseData = { certificate: v.certificate, purpose: v.purpose ?? "", target_date: v.target_date ?? "", notes: v.notes ?? "" };
    steps = certificateStepsFor(v.certificate);
  } else if (kind === "employer") {
    const parsed = employerSchema.safeParse(formToObject(form));
    if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
    const v = parsed.data;
    caseData = { target_date: v.target_date ?? "", notes: v.notes ?? "" };
    steps = employerStepsFor({ sss: v.sss, philhealth: v.philhealth, pagibig: v.pagibig });
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
    if (error.message.includes("registration_cases_sec_filing_idx")) return { error: "This client already has SEC filings for that year." };
    if (error.message.includes("registration_cases_open_idx")) return { error: "This client already has an open case of this kind." };
    return { error: error.message };
  }
  revalidatePath("/app/registrations");
  revalidatePath(`/app/clients/${clientId}`);
  redirect(`/app/registrations/${(data as { id: string }).id}`);
}

/* --------------------------------------------------------- Proof files on a step */

/** What staff may attach as proof: a PDF or a photo, up to 25 MB. */
const PROOF_TYPES: Record<string, string> = { "application/pdf": "pdf", "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const PROOF_MAX = 25 * 1024 * 1024;

/** Step 1 of an upload: a one-time link under <client>/<case>/. */
export async function startStepFileUpload(input: { stepId: string; mimeType: string; size: number }): Promise<{ path: string; token: string } | { error: string }> {
  await requireStaff();
  const ext = PROOF_TYPES[input.mimeType];
  if (!ext) return { error: "Attach a PDF or a photo (JPEG, PNG or WebP)." };
  if (input.size > PROOF_MAX) return { error: "The file is over 25 MB." };
  const supabase = await supabaseServer();
  const { data: s } = await supabase.from("registration_steps").select("id, case_id, registration_cases!inner(client_id)").eq("id", input.stepId).maybeSingle();
  if (!s) return { error: "Step not found." };
  const clientId = (s.registration_cases as unknown as { client_id: string }).client_id;
  const path = `${clientId}/${s.case_id}/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage.from("registration-files").createSignedUploadUrl(path);
  if (error || !data) return { error: `Could not start the upload: ${error?.message ?? "no link"}` };
  return { path: data.path, token: data.token };
}

/** Step 2: record the uploaded file on the step. */
export async function addStepFile(input: { caseId: string; stepId: string; path: string; fileName: string; mimeType: string; size: number }): Promise<FormState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("add_registration_step_file", {
    p_step: input.stepId, p_path: input.path, p_file_name: input.fileName.slice(0, 200), p_mime: input.mimeType, p_size: input.size,
  });
  if (error) return { error: error.message };
  revalidatePath(`/app/registrations/${input.caseId}`);
  revalidatePath("/portal/registration");
  return { ok: true };
}

export async function removeStepFile(caseId: string, fileId: string): Promise<FormState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("remove_registration_step_file", { p_file: fileId });
  if (error) return { error: error.message };
  revalidatePath(`/app/registrations/${caseId}`);
  revalidatePath("/portal/registration");
  return { ok: true };
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
