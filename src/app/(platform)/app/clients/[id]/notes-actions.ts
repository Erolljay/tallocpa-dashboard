"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";

export type NoteState = { ok?: string; error?: string };

/** A note written on the client; it joins the Notes timeline with the inquiry, discovery calls and onboarding. */
export async function addClientNoteAction(clientId: string, _: NoteState, form: FormData): Promise<NoteState> {
  await requireStaff();
  const body = String(form.get("body") ?? "").trim();
  if (!body) return { error: "Write the note." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("add_client_note", { p_client: clientId, p_body: body });
  if (error) return { error: error.message };
  revalidatePath(`/app/clients/${clientId}`);
  return { ok: "Note added." };
}
