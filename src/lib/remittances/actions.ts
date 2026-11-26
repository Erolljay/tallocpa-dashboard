"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireOwner, requireStaff } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";
import { isAgency, type RemittanceFileKind } from "./labels";

export type RemittanceState = { error?: string; ok?: string; fieldErrors?: Record<string, string> };

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const money = z.union([z.literal(""), z.string().regex(/^\d{1,13}(\.\d{1,2})?$/, "Enter an amount, at most two decimals.")]);
const peso = (v: string) => (v === "" ? 0 : Number(v));

function refresh(id?: string, clientId?: string) {
  revalidatePath("/app/remittances");
  revalidatePath("/portal/remittances");
  revalidatePath("/app/collections", "layout");
  if (id) revalidatePath(`/app/remittances/${id}`);
  if (clientId) revalidatePath(`/app/clients/${clientId}`);
}

/** Enters or changes a client's employer number with one agency, and creates its months. */
export async function setEmployerNumberAction(_: RemittanceState, form: FormData): Promise<RemittanceState> {
  await requireStaff();
  const clientId = text(form.get("client_id"));
  const agency = text(form.get("agency"));
  const number = text(form.get("employer_number"));
  const start = text(form.get("start_month"));
  const end = text(form.get("end_month"));
  const fieldErrors: Record<string, string> = {};
  if (!isAgency(agency)) fieldErrors.agency = "Choose the agency.";
  if (!number) fieldErrors.employer_number = "Enter the employer number.";
  if (!/^\d{4}-\d{2}$/.test(start)) fieldErrors.start_month = "Choose the first month with employees.";
  if (end && !/^\d{4}-\d{2}$/.test(end)) fieldErrors.end_month = "Choose the last month, or leave it empty.";
  if (Object.keys(fieldErrors).length) return { error: "Check the highlighted fields.", fieldErrors };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("set_employer_number", {
    p_client: clientId,
    p_agency: agency,
    p_number: number.slice(0, 40),
    p_start: `${start}-01`,
    p_end: end ? `${end}-01` : null,
    p_registered_name: text(form.get("registered_name")).slice(0, 200) || null,
  });
  if (error) return { error: error.message };
  const made = await supabase.rpc("generate_contribution_remittances", {});
  if (made.error) return { error: made.error.message };
  refresh(undefined, clientId);
  return { ok: "Saved." };
}

/** Creates the months not there yet for every client the person sees. */
export async function generateRemittancesAction(): Promise<RemittanceState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("generate_contribution_remittances", {});
  if (error) return { error: error.message };
  refresh();
  const n = Number(data ?? 0);
  return { ok: n ? `Added ${n} remittance${n === 1 ? "" : "s"}.` : "Every month is already there." };
}

/** Adds one month by hand: a loan, or an earlier month. */
export async function addRemittanceAction(_: RemittanceState, form: FormData): Promise<RemittanceState> {
  await requireStaff();
  const clientId = text(form.get("client_id"));
  const kind = text(form.get("kind"));
  const month = text(form.get("month"));
  if (!/^\d{4}-\d{2}$/.test(month)) return { error: "Choose the month.", fieldErrors: { month: "Choose the month." } };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("add_contribution_remittance", { p_client: clientId, p_kind: kind, p_month: `${month}-01` });
  if (error) return { error: error.message };
  refresh(undefined, clientId);
  return { ok: "Added." };
}

const prepareSchema = z.object({ ee: money, er: money, ec: money, employees: z.union([z.literal(""), z.string().regex(/^\d{1,6}$/, "Enter a whole number.")]), prn: z.string().trim().min(1, "Enter the PRN.").max(60) });

/** Staff prepare: shares, headcount, PRN (the contribution report must already be attached). */
export async function prepareRemittanceAction(_: RemittanceState, form: FormData): Promise<RemittanceState> {
  await requireStaff();
  const id = text(form.get("id"));
  const parsed = prepareSchema.safeParse({ ee: text(form.get("ee")), er: text(form.get("er")), ec: text(form.get("ec")), employees: text(form.get("employees")), prn: text(form.get("prn")) });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] ??= i.message;
    return { error: "Check the highlighted fields.", fieldErrors };
  }
  const v = parsed.data;
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("prepare_contribution_remittance", {
    p_id: id, p_ee: peso(v.ee), p_er: peso(v.er), p_ec: peso(v.ec), p_employees: v.employees === "" ? null : Number(v.employees), p_prn: v.prn,
  });
  if (error) return { error: error.message };
  refresh(id);
  return { ok: "Prepared. The Owner is notified to approve it." };
}

export async function skipRemittanceAction(_: RemittanceState, form: FormData): Promise<RemittanceState> {
  await requireStaff();
  const id = text(form.get("id"));
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("skip_contribution_remittance", { p_id: id, p_note: text(form.get("note")).slice(0, 500) });
  if (error) return { error: error.message };
  refresh(id);
  return { ok: "Marked not required." };
}

export async function approveRemittanceAction(id: string): Promise<RemittanceState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("approve_contribution_remittance", { p_id: id });
  if (error) return { error: error.message };
  refresh(id);
  return { ok: (data as { due_id: string | null }).due_id ? "Approved. The amount is on the client's next statement." : "Approved. The client pays the agency with the PRN." };
}

export async function remitRemittanceAction(_: RemittanceState, form: FormData): Promise<RemittanceState> {
  await requireStaff();
  const id = text(form.get("id"));
  const paidOn = text(form.get("paid_on"));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(paidOn)) return { error: "Enter the date paid.", fieldErrors: { paid_on: "Enter the date paid." } };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("remit_contribution_remittance", { p_id: id, p_paid_on: paidOn, p_reference: text(form.get("reference")).slice(0, 100) || null });
  if (error) return { error: error.message };
  refresh(id);
  return { ok: "Recorded as remitted. The client can see the proof in the portal." };
}

export async function reopenRemittanceAction(id: string): Promise<RemittanceState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("reopen_contribution_remittance", { p_id: id });
  if (error) return { error: error.message };
  refresh(id);
  return { ok: "Moved back one step." };
}

export async function setDueDateAction(_: RemittanceState, form: FormData): Promise<RemittanceState> {
  await requireStaff();
  const id = text(form.get("id"));
  const due = text(form.get("due_date"));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(due)) return { error: "Enter the due date." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("set_remittance_due_date", { p_id: id, p_due: due });
  if (error) return { error: error.message };
  refresh(id);
  return { ok: "Due date changed." };
}

/** What staff may attach: PDF, photos, Excel or CSV (the agency's report files). */
const TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "text/csv": "csv",
  "text/plain": "txt",
};
const MAX = 25 * 1024 * 1024;

/** Step 1 of an upload: a one-time link under <client>/<remittance>/. */
export async function startRemittanceUpload(input: { id: string; mimeType: string; size: number }): Promise<{ path: string; token: string } | { error: string }> {
  await requireStaff();
  const ext = TYPES[input.mimeType];
  if (!ext) return { error: "Attach a PDF, a photo, an Excel file or a CSV." };
  if (input.size > MAX) return { error: "The file is over 25 MB." };
  const supabase = await supabaseServer();
  const { data: r } = await supabase.from("contribution_remittances").select("id, client_id").eq("id", input.id).maybeSingle();
  if (!r) return { error: "Remittance not found." };
  const path = `${r.client_id}/${r.id}/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage.from("remittance-files").createSignedUploadUrl(path);
  if (error || !data) return { error: `Could not start the upload: ${error?.message ?? "no link"}` };
  return { path: data.path, token: data.token };
}

/** Step 2: record the uploaded file on the remittance. */
export async function addRemittanceFile(input: { id: string; kind: RemittanceFileKind; path: string; fileName: string; mimeType: string; size: number }): Promise<RemittanceState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("add_remittance_file", {
    p_remittance: input.id, p_kind: input.kind, p_path: input.path, p_file_name: input.fileName.slice(0, 200), p_mime: input.mimeType, p_size: input.size,
  });
  if (error) return { error: error.message };
  refresh(input.id);
  return { ok: "Attached." };
}

export async function removeRemittanceFile(id: string, fileId: string): Promise<RemittanceState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("remove_remittance_file", { p_file: fileId });
  if (error) return { error: error.message };
  refresh(id);
  return { ok: "Removed." };
}
