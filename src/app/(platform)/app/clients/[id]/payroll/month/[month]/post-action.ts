"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";

export type PostState = { ok?: string; error?: string };

/** Posts a reviewed payroll run to the books (post_payroll): one entry, net pay to Cash. */
export async function postPayrollAction(clientId: string, month: string, periodEnd: string | null): Promise<PostState> {
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("post_payroll", { p_client: clientId, p_month: month, p_period_end: periodEnd });
  if (error) return { error: error.message };
  revalidatePath(`/app/clients/${clientId}/payroll`, "layout");
  revalidatePath(`/app/clients/${clientId}/books`);
  revalidatePath(`/app/clients/${clientId}/workpapers`);
  return { ok: "Posted to the books." };
}
