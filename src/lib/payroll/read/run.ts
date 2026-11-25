import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SPREADSHEET_TYPES } from "@/lib/documents/labels";
import { ITEM_COLUMNS, itemFromRow } from "../rows";
import type { PayrollItem } from "../items";
import type { SavedMap } from "./columns";
import { readGrid } from "./grid";
import { imageRead, payrollReaderFromEnv, readSheet, type PayrollReader } from "./reader";
import type { ColumnTarget, PayrollRead, SheetColumn } from "./types";

const MAX_ATTEMPTS = 3;

export async function loadColumnMap(db: SupabaseClient, clientId: string): Promise<SavedMap> {
  const { data } = await db.from("payroll_column_maps").select("header, target, item_id").eq("client_id", clientId);
  return new Map((data ?? []).map((r) => [String(r.header), (r.target === "item" ? `item:${r.item_id}` : r.target) as ColumnTarget]));
}

/**
 * Reads a payroll document (the client's own Excel, CSV, PDF or photo) into the
 * Tallo register and saves it in payroll_extractions for staff review. Runs with
 * the service-role client (after an upload, from "Read payroll", or the nightly
 * job). `staff` carries the heading row and columns staff chose (chosen columns
 * skip any suggestion).
 * A received document moves to Under review, as after OCR. Nothing is loaded.
 */
export async function runPayrollRead(
  admin: SupabaseClient,
  documentId: string,
  reader: PayrollReader | null = payrollReaderFromEnv(),
  staff?: { headerRow: number; columns?: SheetColumn[] },
): Promise<{ ok: true } | { skipped: string } | { error: string }> {
  const { data: doc, error } = await admin.from("documents").select("id, client_id, storage_path, mime_type, file_name, doc_type, period, status").eq("id", documentId).single();
  if (error || !doc) return { error: `Document not found: ${error?.message ?? documentId}` };
  if (doc.doc_type !== "payroll" || !["received", "under_review"].includes(doc.status)) return { skipped: "Not a payroll document waiting to be loaded." };
  const sheet = SPREADSHEET_TYPES.includes(doc.mime_type) || /\.(xlsx|csv)$/i.test(doc.file_name);
  if (!sheet && !reader) return { skipped: "No OCR key is set (GEMINI_API_KEY), so a PDF or photo cannot be read." };

  const { data: prior } = await admin.from("payroll_extractions").select("attempts").eq("document_id", documentId).maybeSingle();
  await admin.from("payroll_extractions").upsert({
    document_id: documentId,
    client_id: doc.client_id,
    status: "pending",
    source: sheet ? "sheet" : "image",
    provider: reader ? "gemini" : null,
    model: null,
    attempts: (prior?.attempts ?? 0) + 1,
    started_at: new Date().toISOString(),
    error: null,
  });

  try {
    const { data: itemRows, error: itemError } = await admin.from("payroll_items").select(ITEM_COLUMNS).eq("client_id", doc.client_id);
    if (itemError) throw new Error(`Could not load the payslip items: ${itemError.message}`);
    const items: PayrollItem[] = (itemRows ?? []).map((r) => itemFromRow(r as unknown as Record<string, unknown>));
    if (!items.some((i) => i.active)) throw new Error("This client has no payslip items yet. Open the client's Payroll page once (it adds the standard items), then read the payroll again.");
    const { data: file, error: dlError } = await admin.storage.from("documents").download(doc.storage_path);
    if (dlError || !file) throw new Error(`Could not read the file: ${dlError?.message ?? "missing"}`);
    const bytes = new Uint8Array(await file.arrayBuffer());
    const month = String(doc.period).slice(0, 10);

    let read: PayrollRead;
    let model: string | null = null;
    if (sheet) {
      const grid = await readGrid(bytes, doc.file_name, doc.mime_type);
      if ("error" in grid) throw new Error(grid.error);
      const r = await readSheet(grid, items, await loadColumnMap(admin, doc.client_id), month, staff?.columns ? null : reader, staff);
      read = r.read;
      model = r.model;
    } else {
      const r = await reader!.readImage({ bytes, mimeType: doc.mime_type }, items);
      read = imageRead(r.reply, items, month);
      model = r.model;
    }
    await admin
      .from("payroll_extractions")
      .update({ status: "done", result: read, draft: null, model, provider: model ? "gemini" : null, finished_at: new Date().toISOString() })
      .eq("document_id", documentId);
    if (doc.status === "received") await admin.from("documents").update({ status: "under_review" }).eq("id", documentId).eq("status", "received");
    return { ok: true };
  } catch (e) {
    await admin.from("payroll_extractions").update({ status: "failed", error: (e as Error).message.slice(0, 500), finished_at: new Date().toISOString() }).eq("document_id", documentId);
    return { error: (e as Error).message };
  }
}

/** Nightly safety net: payroll documents never read, or whose reading failed fewer than 3 times. */
export async function runPendingPayrollReads(admin: SupabaseClient, limit = 20) {
  const reader = payrollReaderFromEnv();
  const { data: docs } = await admin
    .from("documents")
    .select("id, mime_type, file_name, payroll_extractions(status, attempts)")
    .eq("doc_type", "payroll")
    .in("status", ["received", "under_review"])
    .order("created_at")
    .limit(500);
  const todo = (docs ?? [])
    .filter((d) => {
      const e = (d.payroll_extractions as unknown as { status: string; attempts: number } | null) ?? null;
      const sheet = SPREADSHEET_TYPES.includes(d.mime_type) || /\.(xlsx|csv)$/i.test(d.file_name);
      if (!sheet && !reader) return false;
      return !e || (e.status !== "done" && e.attempts < MAX_ATTEMPTS);
    })
    .slice(0, limit);
  let read = 0;
  let failed = 0;
  for (const d of todo) {
    const r = await runPayrollRead(admin, d.id, reader);
    if ("ok" in r) read++;
    else if ("error" in r) failed++;
  }
  return { read, failed };
}
