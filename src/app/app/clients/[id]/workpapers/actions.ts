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
