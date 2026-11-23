"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";

export type CycleState = { ok?: string; error?: string };

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");

function refresh() {
  revalidatePath("/app", "layout");
  revalidatePath("/portal", "layout");
}

/** Staff close a month after its cutoff; unposted documents move to the next month. */
export async function closeCycleAction(clientId: string, period: string): Promise<CycleState> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("close_document_cycle", { p_client: clientId, p_period: period });
  if (error) return { error: error.message };
  refresh();
  const y = data as { carried_forward: number; to_exceptions: number };
  const parts = [
    y.carried_forward ? `${y.carried_forward} document${y.carried_forward === 1 ? "" : "s"} moved to next month` : "",
    y.to_exceptions ? `${y.to_exceptions} sent to the exceptions queue` : "",
  ].filter(Boolean);
  return { ok: parts.length ? `Closed. ${parts.join("; ")}.` : "Closed." };
}

/** The client (or staff for them) says there are no documents this month. */
export async function nothingToSubmitAction(clientId: string, period: string): Promise<CycleState> {
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("declare_nothing_to_submit", { p_client: clientId, p_period: period });
  if (error) return { error: error.message };
  refresh();
  return { ok: "Noted: nothing to submit this month." };
}

/** The Reviewer or Owner decides a prior-year exception, with a note for the file. */
export async function decideExceptionAction(documentId: string, _: CycleState, form: FormData): Promise<CycleState> {
  const decision = text(form.get("decision"));
  const note = text(form.get("note"));
  if (!decision) return { error: "Choose a decision." };
  if (!note) return { error: "Add a note for the file." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("decide_exception", { p_document: documentId, p_decision: decision, p_note: note });
  if (error) return { error: error.message };
  refresh();
  return { ok: "Decision recorded." };
}
