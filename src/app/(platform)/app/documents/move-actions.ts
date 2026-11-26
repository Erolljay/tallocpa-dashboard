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
