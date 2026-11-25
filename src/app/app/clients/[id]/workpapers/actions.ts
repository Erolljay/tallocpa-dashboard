"use server";

import { revalidatePath } from "next/cache";
import { TIE_IDS, type TieId } from "@/lib/workpapers/tieouts";
import { supabaseServer } from "@/lib/supabase/server";

export type ExplainState = { ok?: string; error?: string };

/**
 * Explains a tie-out's difference in writing (workpaper 0-2). An explanation lets the
 * returns the tie-out feeds be marked prepared; saving it empty removes it.
 */
export async function explainTieAction(clientId: string, month: string, tie: TieId, _: ExplainState, form: FormData): Promise<ExplainState> {
  if (!TIE_IDS.includes(tie) || !/^\d{4}-\d{2}-01$/.test(month)) return { error: "Unknown tie-out." };
  const text = String(form.get("explanation") ?? "").trim();
  const supabase = await supabaseServer();
  const { error } = text
    ? await supabase.from("workpaper_explanations").upsert({ client_id: clientId, period: month, tie, explanation: text.slice(0, 2000) })
    : await supabase.from("workpaper_explanations").delete().eq("client_id", clientId).eq("period", month).eq("tie", tie);
  if (error) return { error: error.message };
  revalidatePath(`/app/clients/${clientId}/workpapers`);
  return { ok: text ? "Explanation saved." : "Explanation removed." };
}

const SIGNED = ["0", "0-2", "10", "20", "30", "B-2", "BB-2", "E"];

/** Signs a workpaper as prepared or reviewed, or takes the signature back (W2). */
export async function signWorkpaperAction(clientId: string, month: string, ref: string, action: "prepare" | "unprepare" | "review" | "unreview"): Promise<ExplainState> {
  if (!SIGNED.includes(ref)) return { error: "Unknown workpaper." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("sign_workpaper", { p_client: clientId, p_period: month, p_ref: ref, p_action: action });
  if (error) return { error: error.message };
  revalidatePath(`/app/clients/${clientId}/workpapers`);
  return { ok: "Saved." };
}

/** The reviewer raises a review note on a workpaper (0-1); its reviewer sign-off goes. */
export async function raiseNoteAction(clientId: string, month: string, _: ExplainState, form: FormData): Promise<ExplainState> {
  const ref = String(form.get("ref") ?? "");
  if (!SIGNED.includes(ref)) return { error: "Choose the workpaper." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("raise_review_note", { p_client: clientId, p_period: month, p_ref: ref, p_note: String(form.get("note") ?? "") });
  if (error) return { error: error.message };
  revalidatePath(`/app/clients/${clientId}/workpapers`);
  return { ok: "Note raised." };
}

/** The preparer answers a note; the reviewer clears or reopens it. */
export async function noteAction(clientId: string, noteId: string, action: "respond" | "clear" | "reopen", _: ExplainState, form: FormData): Promise<ExplainState> {
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("act_on_review_note", { p_note: noteId, p_action: action, p_text: String(form.get("text") ?? "") || null });
  if (error) return { error: error.message };
  revalidatePath(`/app/clients/${clientId}/workpapers`);
  return { ok: action === "respond" ? "Answer saved." : action === "clear" ? "Cleared." : "Reopened." };
}
