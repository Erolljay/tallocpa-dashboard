"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth";
import { MANUAL_ITEMS } from "@/lib/onboarding/checklist";
import { CLIENT_FILE_KINDS, CLIENT_FILE_MAX, CLIENT_FILE_TYPES } from "@/lib/onboarding/files";
import { supabaseServer } from "@/lib/supabase/server";

export type OnboardingState = { ok?: string; error?: string };

const KINDS = Object.keys(CLIENT_FILE_KINDS);

const refresh = (clientId: string) => revalidatePath(`/app/clients/${clientId}`, "layout");

/** Step 1 of an upload: a one-time link under <client>/ in the client-files bucket. */
export async function startClientFileUpload(input: { clientId: string; mimeType: string; size: number }): Promise<{ path: string; token: string } | { error: string }> {
  await requireStaff();
  const ext = CLIENT_FILE_TYPES[input.mimeType];
  if (!ext) return { error: "Attach a PDF, Word, Excel file or a photo." };
  if (input.size > CLIENT_FILE_MAX) return { error: "The file is over 20 MB." };
  const supabase = await supabaseServer();
  const path = `${input.clientId}/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage.from("client-files").createSignedUploadUrl(path);
  if (error || !data) return { error: `Could not start the upload: ${error?.message ?? "no link"}` };
  return { path: data.path, token: data.token };
}

/** Step 2: record the uploaded file on the client. */
export async function addClientFile(input: { clientId: string; kind: string; title: string; path: string; fileName: string; mimeType: string; size: number; signedOn: string | null }): Promise<OnboardingState> {
  await requireStaff();
  if (!KINDS.includes(input.kind)) return { error: "Choose proposal, contract or other." };
  if (input.signedOn && !/^\d{4}-\d{2}-\d{2}$/.test(input.signedOn)) return { error: "The signing date must be a date." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("add_client_file", {
    p_client: input.clientId,
    p_kind: input.kind,
    p_title: input.title.trim().slice(0, 200),
    p_path: input.path,
    p_file_name: input.fileName.slice(0, 200),
    p_mime: input.mimeType,
    p_size: input.size,
    p_signed_on: input.signedOn || null,
  });
  if (error) return { error: error.message };
  refresh(input.clientId);
  return { ok: "Attached." };
}

export async function removeClientFileAction(clientId: string, fileId: string): Promise<OnboardingState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("remove_client_file", { p_file: fileId });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: "Removed." };
}

export async function tickOnboardingAction(clientId: string, item: string, done: boolean, _: OnboardingState, form: FormData): Promise<OnboardingState> {
  await requireStaff();
  if (!(MANUAL_ITEMS as readonly string[]).includes(item)) return { error: "Unknown item." };
  const supabase = await supabaseServer();
  const note = String(form.get("note") ?? "").slice(0, 500);
  const { error } = await supabase.rpc("set_onboarding_item", { p_client: clientId, p_item: item, p_done: done, p_note: note || null });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: done ? "Ticked." : "Unticked." };
}
