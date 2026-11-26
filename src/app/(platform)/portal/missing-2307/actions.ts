"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";

export type DecisionState = { error?: string; ok?: string };

/** The client keeps claiming (or stops claiming) the tax a customer withheld without sending its 2307. */
export async function decideMissing2307Action(invoiceId: string, keep: boolean): Promise<DecisionState> {
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("decide_missing_2307", { p_invoice: invoiceId, p_keep: keep });
  if (error) return { error: error.message };
  revalidatePath("/portal/missing-2307");
  revalidatePath("/portal");
  return { ok: keep ? "We'll keep claiming it." : "We'll stop claiming it." };
}
