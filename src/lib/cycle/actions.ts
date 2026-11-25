"use server";

import { revalidatePath } from "next/cache";
import { showMonth } from "@/lib/documents/labels";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { sendEmail } from "./email";

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

/**
 * The client confirms every document for the month is in (P1). `cancelled` lists the
 * missing invoice numbers the client says were cancelled; the database refuses while
 * any missing number is unanswered. The client's preparer gets an email, so work can
 * start before the cutoff.
 */
export async function confirmMonthAction(clientId: string, period: string, cancelled: { prefix: string; num: number }[]): Promise<CycleState> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("confirm_month_complete", { p_client: clientId, p_period: period, p_cancelled: cancelled });
  if (error) return { error: error.message };
  refresh();
  await tellPreparer(clientId, period, (data as { confirmed_documents: number | null } | null)?.confirmed_documents ?? null).catch(() => undefined);
  return { ok: `${showMonth(period)} is complete. Thank you.` };
}

/** The client undoes the confirmation (until the cutoff), or staff reopen it. */
export async function undoMonthAction(clientId: string, period: string): Promise<CycleState> {
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("undo_month_complete", { p_client: clientId, p_period: period });
  if (error) return { error: error.message };
  refresh();
  return { ok: `${showMonth(period)} is open again.` };
}

/** Best effort: an email never blocks the confirmation. */
async function tellPreparer(clientId: string, period: string, count: number | null) {
  const admin = supabaseAdmin();
  const [{ data: client }, { data: team }] = await Promise.all([
    admin.from("clients").select("name").eq("id", clientId).maybeSingle(),
    admin.from("staff_assignments").select("user_id").eq("client_id", clientId).eq("role", "preparer"),
  ]);
  const to: string[] = [];
  for (const t of team ?? []) {
    const { data: u } = await admin.auth.admin.getUserById(t.user_id);
    if (u.user?.email) to.push(u.user.email);
  }
  if (!client || to.length === 0) return;
  const month = showMonth(period);
  await sendEmail(
    to,
    `${client.name}: ${month} documents are complete`,
    `${client.name} confirmed they have sent everything for ${month}${count != null ? ` (${count} document${count === 1 ? "" : "s"})` : ""}. The documents step of their returns is done, so you can start now.\n\nAnything they send later for ${month} is marked late.`,
  );
}
