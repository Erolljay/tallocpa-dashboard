"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth";
import { safeNextPath } from "@/lib/safe-redirect";
import { supabaseServer } from "@/lib/supabase/server";

export type DraftDecisionState = { ok?: string; error?: string };

/** Staff accept or reject an AI employee's draft. Accepting changes nothing else: the person makes the change. */
export async function decideAiDraftAction(id: string, accept: boolean, path: string, _: DraftDecisionState, form: FormData): Promise<DraftDecisionState> {
  await requireStaff();
  const note = String(form.get("note") ?? "").slice(0, 1000);
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("decide_ai_draft", { p_id: id, p_accept: accept, p_note: note || null });
  if (error) return { error: error.message };
  revalidatePath(safeNextPath(path));
  return { ok: accept ? "Accepted. Make the change in the app as usual." : "Rejected." };
}
