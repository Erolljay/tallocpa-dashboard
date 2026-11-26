"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";

export type CwtActionState = { ok?: string; error?: string };

const trackerPath = (clientId: string) => `/app/clients/${clientId}/books/reports/cwt-2307`;

/**
 * Missing 2307 (decision 12): records that the customer was asked for the 2307 of a Sales
 * Invoice with CWT; the CWT stays claimed. The database checks who may do it.
 */
export async function markCwtFollowedUp(clientId: string, invoiceId: string, _: CwtActionState, form: FormData): Promise<CwtActionState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const note = String(form.get("note") ?? "").trim().slice(0, 500);
  const { error } = await supabase.rpc("mark_cwt_followed_up", { p_invoice: invoiceId, p_note: note || null });
  if (error) return { error: error.message };
  revalidatePath(trackerPath(clientId));
  return { ok: "Marked followed up." };
}

/** Matches an approved 2307 that supports no Sales Invoice yet (e.g. the invoice was keyed after it). */
export async function rematch2307(clientId: string, documentId: string): Promise<CwtActionState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("rematch_2307", { p_document: documentId });
  if (error) return { error: error.message };
  revalidatePath(`/app/documents/${documentId}`);
  revalidatePath(trackerPath(clientId));
  const n = Number(data ?? 0);
  return n > 0 ? { ok: `Matched to ${n} Sales Invoice${n === 1 ? "" : "s"}.` } : { error: "Still no Sales Invoice fits this 2307." };
}
