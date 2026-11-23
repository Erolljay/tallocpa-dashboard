"use server";

import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { runOcr } from "@/lib/ocr/run";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getIdentity } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";
import type { DocType } from "./labels";

export type StartUpload = { documentId: string; path: string; token: string } | { error: string };

const MAX_BYTES = 20 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"];

/**
 * Step 1 of an upload: the database checks the person may add documents for the
 * client and places the document in a month; storage returns a one-time signed
 * link the browser sends the file to directly (no size limit from our server).
 */
export async function startUpload(input: {
  clientId: string;
  docType: DocType;
  month: string;
  fileName: string;
  mimeType: string;
  size: number;
  filingId?: string;
}): Promise<StartUpload> {
  await getIdentity();
  if (!ALLOWED.includes(input.mimeType)) return { error: `${input.fileName}: only photos (JPEG, PNG, HEIC) and PDF files can be uploaded.` };
  if (input.size > MAX_BYTES) return { error: `${input.fileName} is over 20 MB.` };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("register_document", {
    p_client: input.clientId,
    p_doc_type: input.docType,
    p_month: input.month,
    p_file_name: input.fileName,
    p_mime_type: input.mimeType,
    p_size: input.size,
    p_filing: input.filingId ?? null,
  });
  if (error) return { error: error.message };
  const doc = data as { id: string; storage_path: string };
  const { data: signed, error: signError } = await supabase.storage.from("documents").createSignedUploadUrl(doc.storage_path);
  if (signError || !signed) return { error: `Could not start the upload: ${signError?.message ?? "no link"}` };
  return { documentId: doc.id, path: signed.path, token: signed.token };
}

/** Step 3: after the browser has sent the file, mark the document Received. */
export async function finishUpload(documentId: string): Promise<{ ok: true } | { error: string }> {
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("confirm_document", { p_document: documentId });
  if (error) return { error: error.message };
  // Read the document with OCR once the client has their answer (spec §3.5).
  after(async () => {
    try {
      await runOcr(supabaseAdmin(), documentId);
    } catch {
      // The nightly job retries documents OCR has not read.
    }
  });
  revalidatePath("/portal", "layout");
  revalidatePath("/app", "layout");
  return { ok: true };
}

export type DocActionState = { ok?: string; error?: string };

/** Staff: accept for review, mark posted, or return to the client with a reason. */
export async function reviewDocumentAction(documentId: string, action: "accept" | "post" | "return", _: DocActionState, form: FormData): Promise<DocActionState> {
  const supabase = await supabaseServer();
  const reason = form.get("reason");
  const { error } = await supabase.rpc("review_document", { p_document: documentId, p_action: action, p_reason: typeof reason === "string" ? reason : null });
  if (error) return { error: error.message };
  revalidatePath("/app", "layout");
  revalidatePath("/portal", "layout");
  return { ok: "Saved." };
}

/** Client: reply to a returned document. */
export async function replyDocumentAction(documentId: string, _: DocActionState, form: FormData): Promise<DocActionState> {
  const supabase = await supabaseServer();
  const reply = form.get("reply");
  const { error } = await supabase.rpc("reply_document", { p_document: documentId, p_reply: typeof reply === "string" ? reply : "" });
  if (error) return { error: error.message };
  revalidatePath("/portal", "layout");
  revalidatePath("/app", "layout");
  return { ok: "Sent. We will check it again." };
}

/** Staff: read (or re-read) a document with OCR now. */
export async function runOcrAction(documentId: string): Promise<DocActionState> {
  const supabase = await supabaseServer();
  // RLS: only staff who can see the document get a row back.
  const { data } = await supabase.from("documents").select("id, client_id").eq("id", documentId).maybeSingle();
  const { data: me } = await supabase.rpc("current_identity");
  if (!data || !(me as { staff: unknown } | null)?.staff) return { error: "Document not found." };
  const r = await runOcr(supabaseAdmin(), documentId);
  revalidatePath("/app", "layout");
  if ("error" in r) return { error: r.error };
  if ("skipped" in r) return { error: r.skipped };
  return { ok: "Read." };
}
