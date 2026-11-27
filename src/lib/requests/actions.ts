"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getIdentity, requireStaff } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";
import { REQUEST_FILE_MAX, REQUEST_FILE_TYPES, STANDING_SETTINGS, type StandingSetting } from "./labels";

export type RequestFormState = { error?: string; fieldErrors?: Record<string, string>; ok?: boolean };

function refresh(requestId?: string) {
  revalidatePath("/app/requests");
  revalidatePath("/portal/requests");
  revalidatePath("/portal/registration");
  revalidatePath("/app/registrations", "layout");
  if (requestId) {
    revalidatePath(`/app/requests/${requestId}`);
    revalidatePath(`/portal/requests/${requestId}`);
  }
}

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");

const requestSchema = z.object({
  client_id: z.uuid("Choose the client."),
  subject: z.string().trim().min(3, "Say what you need.").max(200),
  body: z.string().trim().max(4000),
  due_date: z.union([z.literal(""), z.iso.date("Enter a valid date.")]),
  step_id: z.union([z.literal(""), z.uuid()]),
});

/** Staff ask a client for something; on a registration step, the step then waits on the client. */
export async function createRequestAction(_: RequestFormState, form: FormData): Promise<RequestFormState> {
  await requireStaff();
  const parsed = requestSchema.safeParse({
    client_id: text(form.get("client_id")),
    subject: text(form.get("subject")),
    body: text(form.get("body")),
    due_date: text(form.get("due_date")),
    step_id: text(form.get("step_id")),
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] ??= i.message;
    return { error: "Check the highlighted fields.", fieldErrors };
  }
  const v = parsed.data;
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("create_client_request", {
    p_client: v.client_id,
    p_subject: v.subject,
    p_body: v.body,
    p_due: v.due_date || null,
    p_step: v.step_id || null,
  });
  if (error) return { error: error.message };
  refresh();
  return { ok: true };
}

/** A client user opens a ticket. */
export async function openTicketAction(_: RequestFormState, form: FormData): Promise<RequestFormState> {
  const id = await getIdentity();
  const clientId = text(form.get("client_id"));
  if (!id.clients.some((c) => c.clientId === clientId)) return { error: "Choose the business." };
  const subject = text(form.get("subject"));
  const body = text(form.get("body"));
  const fieldErrors: Record<string, string> = {};
  if (subject.length < 3) fieldErrors.subject = "Enter a subject.";
  if (!body) fieldErrors.body = "Write your message.";
  if (Object.keys(fieldErrors).length) return { error: "Check the highlighted fields.", fieldErrors };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("open_client_ticket", { p_client: clientId, p_subject: subject.slice(0, 200), p_body: body.slice(0, 4000) });
  if (error) return { error: error.message };
  refresh();
  redirect(`/portal/requests/${(data as { id: string }).id}`);
}

/** Step 1 of a reply with a file: a one-time upload link under <client>/<request>/. */
export async function startRequestUpload(input: { requestId: string; mimeType: string; size: number }): Promise<{ path: string; token: string } | { error: string }> {
  await getIdentity();
  const ext = REQUEST_FILE_TYPES[input.mimeType];
  if (!ext) return { error: "Attach a photo, PDF, Excel or Word file." };
  if (input.size > REQUEST_FILE_MAX) return { error: "The file is over 20 MB." };
  const supabase = await supabaseServer();
  const { data: r } = await supabase.from("client_requests").select("id, client_id, status").eq("id", input.requestId).maybeSingle();
  if (!r) return { error: "Request not found." };
  if (r.status === "closed") return { error: "This request is closed." };
  const path = `${r.client_id}/${r.id}/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage.from("requests").createSignedUploadUrl(path);
  if (error || !data) return { error: `Could not start the upload: ${error?.message ?? "no link"}` };
  return { path: data.path, token: data.token };
}

/** Step 2: the reply, with the uploaded file if any. */
export async function replyRequest(input: { requestId: string; body: string; path: string | null; fileName: string | null; mimeType: string | null }): Promise<RequestFormState> {
  await getIdentity();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("reply_client_request", {
    p_request: input.requestId,
    p_body: input.body.trim().slice(0, 4000),
    p_path: input.path,
    p_file_name: input.fileName ? input.fileName.slice(0, 200) : null,
    p_mime: input.mimeType,
  });
  if (error) return { error: error.message };
  refresh(input.requestId);
  return { ok: true };
}

/** Staff close a request or ticket; a client closes its own ticket. */
export async function closeRequestAction(requestId: string): Promise<RequestFormState> {
  await getIdentity();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("close_client_request", { p_request: requestId });
  if (error) return { error: error.message };
  refresh(requestId);
  return { ok: true };
}

/** Staff on the client hand a request or ticket to someone else and set its priority. */
export async function assignRequestAction(_: RequestFormState, form: FormData): Promise<RequestFormState> {
  await requireStaff();
  const requestId = text(form.get("request_id"));
  const assignee = text(form.get("assignee"));
  const priority = text(form.get("priority"));
  if (!z.uuid().safeParse(assignee).success) return { error: "Choose who answers for it.", fieldErrors: { assignee: "Choose who answers for it." } };
  if (!["low", "normal", "high"].includes(priority)) return { error: "Choose the priority." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("assign_client_request", { p_request: requestId, p_assignee: assignee, p_priority: priority });
  if (error) return { error: error.message };
  refresh(requestId);
  return { ok: true };
}

/** Staff on the client (or the Owner) switch a standing monthly request on or off; bank statements may list the accounts. */
export async function setStandingRequestAction(clientId: string, kind: StandingSetting, on: boolean, accounts: string[] = []): Promise<RequestFormState> {
  await requireStaff();
  if (!Object.hasOwn(STANDING_SETTINGS, kind)) return { error: "Unknown standing request." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("set_standing_request", {
    p_client: clientId,
    p_kind: kind,
    p_on: on,
    p_accounts: accounts.map((a) => a.trim()).filter(Boolean).slice(0, 30),
  });
  if (error) return { error: error.message };
  revalidatePath(`/app/clients/${clientId}`);
  revalidatePath("/portal");
  refresh();
  return { ok: true };
}

/** The client: no collections or payments this month (the AR/AP update). */
export async function standingNoActivityAction(requestId: string): Promise<RequestFormState> {
  await getIdentity();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("standing_no_activity", { p_request: requestId });
  if (error) return { error: error.message };
  revalidatePath("/portal");
  refresh(requestId);
  return { ok: true };
}

/** Staff return what the client sent for a standing request, with the reason. */
export async function returnStandingAction(_: RequestFormState, form: FormData): Promise<RequestFormState> {
  await requireStaff();
  const requestId = text(form.get("request_id"));
  const reason = text(form.get("reason"));
  if (!reason) return { error: "Say why you are returning it.", fieldErrors: { reason: "Say why you are returning it." } };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("return_standing_request", { p_request: requestId, p_reason: reason.slice(0, 2000) });
  if (error) return { error: error.message };
  refresh(requestId);
  return { ok: true };
}
