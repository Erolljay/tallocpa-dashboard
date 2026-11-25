"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth";
import { esubmissionMailEnv } from "@/lib/env";
import { datFiles } from "@/lib/esubmission/dat";
import { sendMail } from "@/lib/esubmission/gmail";
import { esubmissionBody, esubmissionSubject } from "@/lib/esubmission/mime";
import { pollEsubmissions } from "@/lib/esubmission/poll";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";

export type ReturnFileState = { ok?: string; error?: string };

/** What staff may upload on a return: the scanned copy and the BIR's validation report. */
const TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "text/plain": "txt",
  "text/html": "html",
};
const MAX = 25 * 1024 * 1024;

const refresh = (filingId: string) => {
  revalidatePath(`/app/filings/${filingId}`);
  revalidatePath("/portal/returns");
  revalidatePath("/app/deadlines");
};

/** Step 1 of an upload: a one-time link under <client>/<return>/ in the filing-files bucket. */
export async function startReturnFileUpload(input: { filingId: string; mimeType: string; size: number }): Promise<{ path: string; token: string } | { error: string }> {
  await requireStaff();
  const ext = TYPES[input.mimeType];
  if (!ext) return { error: "Attach a PDF or a photo (the validation report may also be text or HTML)." };
  if (input.size > MAX) return { error: "The file is over 25 MB." };
  const supabase = await supabaseServer();
  const { data: f } = await supabase.from("filing_instances").select("id, client_id").eq("id", input.filingId).maybeSingle();
  if (!f) return { error: "Return not found." };
  const path = `${f.client_id}/${f.id}/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage.from("filing-files").createSignedUploadUrl(path);
  if (error || !data) return { error: `Could not start the upload: ${error?.message ?? "no link"}` };
  return { path: data.path, token: data.token };
}

/**
 * Step 2: record the uploaded file. A scanned copy replaces the current one; a
 * validation report also records the BIR's answer as validated (the manual fallback).
 */
export async function addReturnFile(input: { filingId: string; kind: "filed_copy" | "validation_report"; path: string; fileName: string; mimeType: string; size: number }): Promise<ReturnFileState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { data: id, error } = await supabase.rpc("add_filing_file", {
    p_filing: input.filingId,
    p_kind: input.kind,
    p_path: input.path,
    p_file_name: input.fileName.slice(0, 200),
    p_mime: input.mimeType,
    p_size: input.size,
  });
  if (error) return { error: error.message };
  if (input.kind === "validation_report") {
    const r = await supabase.rpc("record_esubmission_result", { p_filing: input.filingId, p_status: "validated", p_note: null, p_file: id as string });
    if (r.error) return { error: r.error.message };
  }
  refresh(input.filingId);
  return { ok: input.kind === "filed_copy" ? "Scanned copy attached." : "Validation report attached: validated." };
}

/** Sends the return's DAT files from the eSubmission mailbox to the BIR (decision 15). */
export async function sendEsubmissionAction(filingId: string): Promise<ReturnFileState> {
  await requireStaff();
  const env = esubmissionMailEnv();
  if (!env) return { error: "The eSubmission mailbox is not set up yet. Send the DAT files by hand and mark them sent." };
  const supabase = await supabaseServer();
  const { data: f } = await supabase
    .from("filing_instances")
    .select("id, client_id, form, period_label, status, clients(name, tin)")
    .eq("id", filingId)
    .maybeSingle();
  if (!f) return { error: "Return not found." };
  const { data: state } = await supabase.rpc("filing_esubmission_state", { p_filing: filingId });
  if (state !== "not_sent" && state !== "errors") return { error: state === "sent" ? "The DAT files were sent; wait for the BIR's reply." : "Nothing to send." };
  const dat = await datFiles(filingId, supabase);
  if (dat.problem) return { error: dat.problem };
  if (dat.files.length === 0) return { error: "The worksheet has no DAT file to send." };
  const client = f.clients as unknown as { name: string; tin: string | null };
  const info = { form: f.form, periodLabel: f.period_label, clientName: client.name, tin: client.tin };
  let sent: { id: string; threadId: string };
  try {
    sent = await sendMail(env, {
      subject: esubmissionSubject(info),
      text: esubmissionBody({ ...info, files: dat.files.map((d) => d.fileName) }),
      attachments: dat.files,
    });
  } catch (e) {
    return { error: (e as Error).message };
  }
  const { data: sendId, error } = await supabase.rpc("record_esubmission_sent", {
    p_filing: filingId,
    p_method: "gmail",
    p_files: dat.files.map((d) => d.fileName),
    p_gmail_message_id: sent.id,
    p_gmail_thread_id: sent.threadId,
  });
  if (error) return { error: `Sent, but not recorded: ${error.message}. Mark it sent by hand.` };
  // A copy of each file sent, kept on the return.
  for (const d of dat.files) {
    const path = `${f.client_id}/${f.id}/${crypto.randomUUID()}/${d.fileName.replace(/[^A-Za-z0-9._-]/g, "_")}`;
    const up = await supabase.storage.from("filing-files").upload(path, new Blob([d.body], { type: "application/octet-stream" }), { contentType: "application/octet-stream" });
    if (!up.error) await supabase.rpc("esubmission_add_dat", { p_esubmission: sendId as string, p_path: path, p_file_name: d.fileName, p_size: Buffer.byteLength(d.body) });
  }
  refresh(filingId);
  return { ok: `Sent ${dat.files.length} DAT file${dat.files.length === 1 ? "" : "s"} to the BIR.` };
}

/** Manual fallback: staff sent the DAT files themselves. */
export async function markEsubmissionSentAction(filingId: string): Promise<ReturnFileState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("record_esubmission_sent", { p_filing: filingId, p_method: "manual", p_files: null });
  if (error) return { error: error.message };
  refresh(filingId);
  return { ok: "Marked sent." };
}

/** The BIR found errors: what to fix. The return can then be fixed and sent again. */
export async function recordEsubmissionErrorsAction(filingId: string, _: ReturnFileState, form: FormData): Promise<ReturnFileState> {
  await requireStaff();
  const note = String(form.get("note") ?? "").trim();
  if (!note) return { error: "Say what the BIR found wrong." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("record_esubmission_result", { p_filing: filingId, p_status: "errors", p_note: note, p_file: null });
  if (error) return { error: error.message };
  refresh(filingId);
  return { ok: "Recorded. Fix the figures, then send again." };
}

/** Checks the mailbox now for this return's reply (the scheduled job does it once a day). */
export async function checkEsubmissionReplyAction(filingId: string): Promise<ReturnFileState> {
  await requireStaff();
  const supabase = await supabaseServer();
  // Only someone who can see the return's send may check it.
  const { data: e } = await supabase.from("esubmissions").select("id").eq("filing_instance_id", filingId).is("superseded_at", null).maybeSingle();
  if (!e) return { error: "Nothing sent yet." };
  const r = await pollEsubmissions(supabaseAdmin(), filingId);
  if ("error" in r) return { error: r.error };
  if (r.errors.length) return { error: r.errors.join("; ") };
  refresh(filingId);
  return { ok: r.answered ? "The BIR's reply is attached." : "No reply from the BIR yet." };
}

/** Posts again a Books entry of the return that could not be posted. */
export async function retryReturnBookEntryAction(filingId: string, rowId: string): Promise<ReturnFileState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("retry_return_book_entry", { p_row: rowId });
  if (error) return { error: error.message };
  refresh(filingId);
  return { ok: "Posted to the Books." };
}
