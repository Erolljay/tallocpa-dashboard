"use server";

import { revalidatePath } from "next/cache";
import { moveTarget, MOVE_TARGETS, type MoveTarget } from "@/lib/documents/defer";
import { showMonth } from "@/lib/documents/labels";
import { supabaseServer } from "@/lib/supabase/server";

export type MoveState = { ok?: string; error?: string };

const plural = (n: number) => `${n} document${n === 1 ? "" : "s"}`;

/**
 * "Move to next period" in a client's Inbox: each selected sale or purchase goes to the
 * next month or the next quarter of its own month (defer_document), reported there.
 * Approved ones are taken back first and wait for approval in their new month. The
 * client's reviewer or the Owner only (the database checks); one that fails is named,
 * the rest go through.
 */
export async function moveSelectedAction(clientId: string, ids: string[], _: MoveState, form: FormData): Promise<MoveState> {
  if (ids.length === 0) return { error: "Select the documents to move." };
  const to = String(form.get("to") ?? "") as MoveTarget;
  if (!(to in MOVE_TARGETS)) return { error: "Choose where to move them." };
  const reason = String(form.get("reason") ?? "").trim();
  if (!reason) return { error: "Give the reason (for example, the client's request)." };
  const supabase = await supabaseServer();
  const { data: docs, error } = await supabase.from("documents").select("id, file_name, document_month").in("id", ids).eq("client_id", clientId);
  if (error) return { error: error.message };
  let done = 0;
  const months = new Set<string>();
  const failed: string[] = [];
  for (const d of docs ?? []) {
    const target = moveTarget(String(d.document_month), to);
    const r = await supabase.rpc("defer_document", { p_document: d.id, p_to: target, p_reason: reason });
    if (r.error) failed.push(`${d.file_name} (${r.error.message})`);
    else {
      done += 1;
      months.add(showMonth(target));
    }
  }
  revalidatePath("/app", "layout");
  revalidatePath("/portal", "layout");
  const ok = done ? `Moved ${plural(done)} to ${[...months].join(", ")}. ${done === 1 ? "It waits" : "They wait"} for approval there.` : undefined;
  return failed.length ? { ok, error: `Not moved: ${failed.join("; ")}.` } : { ok };
}

/**
 * "Back to unapproved": each selected approved sale or purchase returns to the Inbox
 * (unapprove_document). Its Book invoice and receipt or payment are voided and its
 * register line removed. The client's reviewer or the Owner only; never in a filed month.
 */
export async function unapproveSelectedAction(clientId: string, ids: string[], _: MoveState, form: FormData): Promise<MoveState> {
  if (ids.length === 0) return { error: "Select the documents to take back." };
  const reason = String(form.get("reason") ?? "").trim();
  if (!reason) return { error: "Give the reason." };
  const supabase = await supabaseServer();
  const { data: docs, error } = await supabase.from("documents").select("id, file_name").in("id", ids).eq("client_id", clientId);
  if (error) return { error: error.message };
  let done = 0;
  const failed: string[] = [];
  for (const d of docs ?? []) {
    const r = await supabase.rpc("unapprove_document", { p_document: d.id, p_reason: reason });
    if (r.error) failed.push(`${d.file_name} (${r.error.message})`);
    else done += 1;
  }
  revalidatePath("/app", "layout");
  revalidatePath("/portal", "layout");
  const ok = done ? `Took back ${plural(done)}. ${done === 1 ? "It waits" : "They wait"} for review in the Inbox.` : undefined;
  return failed.length ? { ok, error: `Not taken back: ${failed.join("; ")}.` } : { ok };
}

/**
 * "Request unlock to defer": the selected approved sales or purchases sit in months the
 * reviewer locked, so they cannot be moved yet. Asks to unlock each of those months
 * (request_books_unlock) with the deferral as the reason. The Owner's own request
 * unlocks at once; a reviewer's waits for the Owner. Unlocking sends the unfiled
 * returns covering the month back to Not started.
 */
export async function requestUnlockToDeferAction(clientId: string, months: string[], labels: string[], _: MoveState, form: FormData): Promise<MoveState> {
  if (months.length === 0) return { error: "None of the selected documents is in a locked month." };
  const why = String(form.get("reason") ?? "").trim();
  if (!why) return { error: "Give the reason (for example, the client's request)." };
  const docs = labels.length > 6 ? `${labels.slice(0, 6).join(", ")} and ${labels.length - 6} more` : labels.join(", ");
  const reason = `To move to a later period (${docs}): ${why}`;
  const supabase = await supabaseServer();
  const failed: string[] = [];
  const asked: string[] = [];
  for (const m of months) {
    const r = await supabase.rpc("request_books_unlock", { p_client: clientId, p_month: m, p_reason: reason });
    if (r.error) failed.push(`${showMonth(m)} (${r.error.message})`);
    else asked.push(m);
  }
  // The Owner's request opens the month at once; a reviewer's waits for the Owner.
  const { data: still } = asked.length
    ? await supabase.from("books_month_locks").select("month").eq("client_id", clientId).in("month", asked)
    : { data: [] as { month: string }[] };
  const locked = new Set((still ?? []).map((l) => String(l.month)));
  const opened = asked.filter((m) => !locked.has(m)).map(showMonth);
  const waiting = asked.filter((m) => locked.has(m)).map(showMonth);
  revalidatePath("/app", "layout");
  const ok = [
    opened.length ? `${opened.join(", ")} unlocked: the returns covering ${opened.length === 1 ? "it" : "them"} went back to Not started. Move the documents now, then lock the month again.` : "",
    waiting.length ? `Unlock of ${waiting.join(", ")} requested: it waits for the Owner. Move the documents once it is approved.` : "",
  ].filter(Boolean).join(" ") || undefined;
  return failed.length ? { ok, error: `Not requested: ${failed.join("; ")}.` } : { ok };
}
