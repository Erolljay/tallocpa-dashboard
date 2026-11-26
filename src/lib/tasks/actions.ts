"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireStaff } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";
import { PRIORITY_KEYS } from "./labels";

export type TaskFormState = { error?: string; fieldErrors?: Record<string, string>; ok?: boolean };

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const optionalDate = z.union([z.literal(""), z.iso.date("Enter a valid date.")]);
const optionalMonth = z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}$/, "Choose the month.")]);

const taskSchema = z.object({
  title: z.string().trim().min(3, "Say what needs doing.").max(200, "Keep it under 200 characters; put the rest in the notes."),
  notes: z.string().trim().max(4000),
  assignee: z.uuid("Choose who does it."),
  due_date: optionalDate,
  priority: z.enum(PRIORITY_KEYS as [string, ...string[]]),
  client_id: z.union([z.literal(""), z.uuid()]),
  period: optionalMonth,
  request_id: z.union([z.literal(""), z.uuid()]),
  reviewer: z.union([z.literal(""), z.uuid()]),
  job_code: z.union([z.literal(""), z.string().regex(/^[A-K]\.[a-z0-9_+-]+$/)]),
  job_price: z.union([z.literal(""), z.string().regex(/^\d{1,13}(\.\d{1,2})?$/, "Enter the price, at most two decimals.")]),
  ask_client: z.string().trim().max(4000),
});

function parse(form: FormData) {
  return taskSchema.safeParse({
    title: text(form.get("title")),
    notes: text(form.get("notes")),
    assignee: text(form.get("assignee")),
    due_date: text(form.get("due_date")),
    priority: text(form.get("priority")) || "normal",
    client_id: text(form.get("client_id")),
    period: text(form.get("period")),
    request_id: text(form.get("request_id")),
    reviewer: text(form.get("reviewer")),
    job_code: text(form.get("job_code")),
    job_price: text(form.get("job_price")).replace(/,/g, ""),
    ask_client: text(form.get("ask_client")),
  });
}

function fieldErrors(error: z.ZodError): TaskFormState {
  const out: Record<string, string> = {};
  for (const i of error.issues) out[String(i.path[0])] ??= i.message;
  return { error: "Check the highlighted fields.", fieldErrors: out };
}

function refresh(taskId?: string, requestId?: string) {
  revalidatePath("/app/tasks");
  revalidatePath("/app/work");
  if (taskId) revalidatePath(`/app/tasks/${taskId}`);
  if (requestId) revalidatePath(`/app/requests/${requestId}`);
}

/** Creates a task and assigns it. From a ticket, the task links back to it and the page stays put. */
export async function createTaskAction(_: TaskFormState, form: FormData): Promise<TaskFormState> {
  await requireStaff();
  const parsed = parse(form);
  if (!parsed.success) return fieldErrors(parsed.error);
  const v = parsed.data;
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("create_staff_task", {
    p_title: v.title,
    p_assignee: v.assignee,
    p_due: v.due_date || null,
    p_priority: v.priority,
    p_notes: v.notes || null,
    p_client: v.client_id || null,
    p_period: v.period ? `${v.period}-01` : null,
    p_request: v.request_id || null,
    p_reviewer: v.reviewer || null,
    p_job_code: v.job_code || null,
    p_job_price: v.job_price === "" ? null : Number(v.job_price),
    p_ask_client: v.ask_client || null,
  });
  if (error) return { error: error.message };
  refresh((data as { id: string }).id, v.request_id || undefined);
  if (v.request_id || text(form.get("stay")) === "1") return { ok: true };
  redirect(`/app/tasks/${(data as { id: string }).id}`);
}

/** Changes an open task: what, who, when, priority, notes, month. */
export async function updateTaskAction(_: TaskFormState, form: FormData): Promise<TaskFormState> {
  await requireStaff();
  const taskId = text(form.get("task_id"));
  const parsed = parse(form);
  if (!parsed.success) return fieldErrors(parsed.error);
  const v = parsed.data;
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("update_staff_task", {
    p_task: taskId,
    p_title: v.title,
    p_assignee: v.assignee,
    p_due: v.due_date || null,
    p_priority: v.priority,
    p_notes: v.notes || null,
    p_period: v.period ? `${v.period}-01` : null,
    p_reviewer: v.reviewer || null,
    p_job_code: v.job_code || null,
    p_job_price: v.job_price === "" ? null : Number(v.job_price),
  });
  if (error) return { error: error.message };
  refresh(taskId);
  return { ok: true };
}

/** The preparer hands the work in: to the reviewer, or done. */
export async function submitTaskAction(_: TaskFormState, form: FormData): Promise<TaskFormState> {
  await requireStaff();
  const taskId = text(form.get("task_id"));
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("submit_staff_task", { p_task: taskId, p_note: text(form.get("note")).slice(0, 2000) || null });
  if (error) return { error: error.message };
  refresh(taskId, (data as { request_id: string | null }).request_id ?? undefined);
  return { ok: true };
}

/** The reviewer approves, or sends it back with what to fix. */
export async function reviewTaskAction(_: TaskFormState, form: FormData): Promise<TaskFormState> {
  await requireStaff();
  const taskId = text(form.get("task_id"));
  const approve = text(form.get("decision")) === "approve";
  const note = text(form.get("note")).slice(0, 2000);
  if (!approve && !note) return { error: "Say what to fix.", fieldErrors: { note: "Say what to fix." } };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("review_staff_task", { p_task: taskId, p_approve: approve, p_note: note || null });
  if (error) return { error: error.message };
  refresh(taskId, (data as { request_id: string | null }).request_id ?? undefined);
  return { ok: true };
}

/** The preparer asks the client for something; the task waits on the client. */
export async function askClientAction(_: TaskFormState, form: FormData): Promise<TaskFormState> {
  await requireStaff();
  const taskId = text(form.get("task_id"));
  const message = text(form.get("message")).slice(0, 4000);
  if (!message) return { error: "Write what you need from the client.", fieldErrors: { message: "Write what you need from the client." } };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("ask_client_on_task", { p_task: taskId, p_message: message });
  if (error) return { error: error.message };
  refresh(taskId, (data as { request_id: string | null }).request_id ?? undefined);
  revalidatePath("/portal");
  return { ok: true };
}

/** Done, cancelled, or open again. */
export async function setTaskStatusAction(taskId: string, status: "open" | "done" | "cancelled"): Promise<TaskFormState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("set_staff_task_status", { p_task: taskId, p_status: status });
  if (error) return { error: error.message };
  refresh(taskId, (data as { request_id: string | null }).request_id ?? undefined);
  return { ok: true };
}
