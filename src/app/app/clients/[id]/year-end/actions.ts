"use server";

import { revalidatePath } from "next/cache";
import { booksAccess } from "@/lib/ledger/data";
import { CHECK_ITEMS, type CheckItem } from "@/lib/year-end/checklist";

export type FormState = { error?: string; ok?: string };

/** Ticks or clears a year-end step the app cannot see for itself. */
export async function setYearEndCheckAction(clientId: string, yearEnd: string, item: CheckItem, done: boolean, _: FormState, form: FormData): Promise<FormState> {
  if (!Object.hasOwn(CHECK_ITEMS, item) || !/^\d{4}-\d{2}-\d{2}$/.test(yearEnd)) return { error: "Unknown step." };
  const { supabase } = await booksAccess(clientId);
  const { error } = await supabase.rpc("set_year_end_check", {
    p_client: clientId, p_year_end: yearEnd, p_item: item, p_done: done, p_note: String(form.get("note") ?? "").slice(0, 500) || null,
  });
  if (error) return { error: error.message };
  revalidatePath(`/app/clients/${clientId}/year-end`);
  return { ok: done ? "Ticked." : "Cleared." };
}
