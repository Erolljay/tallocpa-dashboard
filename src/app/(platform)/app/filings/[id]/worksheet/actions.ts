"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth";
import { LOCKED_STATUSES, loadWorksheet } from "@/lib/returns/load";
import { flattenFigures } from "@/lib/returns/source";
import { supabaseServer } from "@/lib/supabase/server";

export type WorksheetState = { ok?: string; error?: string; values?: Record<string, string> };

/**
 * Saves the figures staff typed in, recomputes the worksheet from the approved
 * documents and stores the snapshot (result + flattened figures) that later
 * worksheets read. The database decides who may save (RLS) and refuses once
 * the return is filed.
 */
export async function recomputeWorksheetAction(filingId: string, _: WorksheetState, form: FormData): Promise<WorksheetState> {
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const loaded = await loadWorksheet(filingId, supabase);
  if (!loaded) return { error: "Filing not found." };
  if (loaded.notReady) return { error: `${loaded.notReady}.` };
  if (!loaded.module || !loaded.ctx) return { error: "There is no worksheet for this form yet." };
  if (LOCKED_STATUSES.includes(loaded.filing.status)) return { error: "This return has been filed; its worksheet is locked." };

  const defs = loaded.module.manualInputs(loaded.ctx);
  const inputs: Record<string, string> = {};
  for (const d of defs) {
    const v = form.get(d.key);
    const s = typeof v === "string" ? v.trim() : "";
    if (s !== "") inputs[d.key] = s.slice(0, 500);
  }

  const ctx = { ...loaded.ctx, inputs };
  const result = loaded.module.compute(ctx);
  const { error } = await supabase.from("return_worksheets").upsert(
    {
      filing_instance_id: filingId,
      client_id: loaded.filing.clientId,
      inputs,
      result,
      figures: flattenFigures(result),
      document_ids: result.documentIds,
      computed_at: new Date().toISOString(),
      computed_by: me.userId,
    },
    { onConflict: "filing_instance_id" },
  );
  if (error) return { error: /row-level security/.test(error.message) ?"Only the Owner and staff assigned to this client can save the worksheet." : error.message, values: inputs };

  revalidatePath(`/app/filings/${filingId}/worksheet`);
  revalidatePath(`/app/filings/${filingId}`);
  return {
    ok: result.errors.length ? `Saved with ${result.errors.length} problem${result.errors.length === 1 ? "" : "s"} to fix.` : "Recomputed and saved.",
    values: inputs,
  };
}

/**
 * Missing 2307 (decision 12): the CWT on a Sales Invoice stays claimed; this records that
 * the customer was asked for the 2307. The database checks who may do it.
 */
export async function markCwtFollowedUpAction(filingId: string, invoiceId: string, _: WorksheetState, form: FormData): Promise<WorksheetState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const note = String(form.get("note") ?? "").trim().slice(0, 500);
  const { error } = await supabase.rpc("mark_cwt_followed_up", { p_invoice: invoiceId, p_note: note || null });
  if (error) return { error: error.message };
  revalidatePath(`/app/filings/${filingId}/worksheet`);
  return { ok: "Marked followed up." };
}
