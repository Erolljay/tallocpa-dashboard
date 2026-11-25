"use server";

import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { applyRegister, type RegisterPreview } from "@/lib/payroll/apply";
import { loadEmployees, payrollAccess } from "@/lib/payroll/data";
import { periodEnd } from "@/lib/payroll/periods";
import { headerKey } from "@/lib/payroll/read/columns";
import { draftToRegister, parseDraft } from "@/lib/payroll/read/draft";
import { runPayrollRead } from "@/lib/payroll/read/run";
import { isColumnTarget, type PayrollRead, type SheetColumn } from "@/lib/payroll/read/types";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";

export type PayrollReadState = { ok?: string; error?: string; preview?: RegisterPreview; issues?: string[] };

/** The payroll document, for the Owner or staff assigned to its client (anyone else: not found). */
async function payrollDocument(documentId: string) {
  const supabase = await supabaseServer();
  const { data: doc } = await supabase.from("documents").select("id, client_id, doc_type, period, status").eq("id", documentId).maybeSingle();
  if (!doc || doc.doc_type !== "payroll") return null;
  const access = await payrollAccess(doc.client_id);
  return { ...access, doc };
}

function done(documentId: string) {
  revalidatePath(`/app/documents/${documentId}`);
}

/** "Read payroll": read (or read again) the client's file into the Tallo register. */
export async function readPayrollAction(documentId: string): Promise<PayrollReadState> {
  const d = await payrollDocument(documentId);
  if (!d) return { error: "Document not found." };
  const r = await runPayrollRead(supabaseAdmin(), documentId);
  done(documentId);
  if ("error" in r) return { error: r.error };
  if ("skipped" in r) return { error: r.skipped };
  return { ok: "Read. Check the figures below." };
}

/** Keeps what staff said each column holds, for this client's next files. Columns with no heading are not kept. */
async function saveColumnMap(supabase: SupabaseClient, clientId: string, read: PayrollRead, columns: SheetColumn[]) {
  const headerCells = read.sheet?.grid[(read.sheet.headerRow ?? 1) - 1] ?? [];
  const rows = new Map<string, { client_id: string; header: string; target: string; item_id: string | null }>();
  for (const c of columns) {
    if (!c.target || !(headerCells[c.index - 1] ?? "").trim()) continue;
    const header = headerKey(c.header).slice(0, 200);
    if (!header) continue;
    const isItem = c.target.startsWith("item:");
    rows.set(header, { client_id: clientId, header, target: isItem ? "item" : c.target, item_id: isItem ? c.target.slice(5) : null });
  }
  if (rows.size === 0) return null;
  const { error } = await supabase.from("payroll_column_maps").upsert([...rows.values()], { onConflict: "client_id,header" });
  return error ? error.message : null;
}

/** Staff choose what each column of the client's sheet holds; kept for the client, and the sheet is read again with it. */
export async function applyColumnsAction(documentId: string, _: PayrollReadState, form: FormData): Promise<PayrollReadState> {
  const d = await payrollDocument(documentId);
  if (!d) return { error: "Document not found." };
  const { data: ext } = await d.supabase.from("payroll_extractions").select("result").eq("document_id", documentId).maybeSingle();
  const read = ext?.result as PayrollRead | null;
  if (!read?.sheet) return { error: "Read the payroll first." };
  const headerRow = Number(form.get("header_row") ?? read.sheet.headerRow);
  if (!Number.isInteger(headerRow) || headerRow < 1 || headerRow > read.sheet.grid.length) return { error: "Choose the row with the column headings." };
  // Another heading row: the columns shown were for the old one, so read again from the new row first.
  if (headerRow !== read.sheet.headerRow) {
    const again = await runPayrollRead(supabaseAdmin(), documentId, undefined, { headerRow });
    done(documentId);
    if ("error" in again) return { error: again.error };
    if ("skipped" in again) return { error: again.skipped };
    return { ok: `Read again with the headings on row ${headerRow}. Check the columns, then apply.` };
  }
  const header = read.sheet.grid[headerRow - 1] ?? [];
  const columns: SheetColumn[] = [];
  const seen = new Set<string>();
  for (const c of read.sheet.columns) {
    const i = c.index;
    const raw = String(form.get(`col:${i}`) ?? "");
    const h = (header[i - 1] ?? "").trim();
    const target = raw === "" ? null : isColumnTarget(raw) ? raw : null;
    if (target && target !== "ignore") {
      if (seen.has(target)) return { error: `Two columns are set to the same thing (column ${i}). Each meaning goes to one column.` };
      seen.add(target);
    }
    columns.push({ index: i, header: h || `Column ${i}`, target: target ?? "ignore", from: "staff", confidence: null });
  }
  const mapError = await saveColumnMap(d.supabase, d.doc.client_id, { ...read, sheet: { ...read.sheet, headerRow } }, columns);
  if (mapError) return { error: `Could not keep the columns: ${mapError}` };
  const r = await runPayrollRead(supabaseAdmin(), documentId, null, { headerRow, columns });
  done(documentId);
  if ("error" in r) return { error: r.error };
  if ("skipped" in r) return { error: r.skipped };
  return { ok: "Columns kept for this client; the sheet was read again." };
}

/**
 * Save staff's edits, or load the register into the month through the same path as
 * an uploaded Tallo register (applyRegister → save_payroll_month). Loading also
 * keeps the client's column mapping and marks the document done.
 */
export async function savePayrollReadAction(documentId: string, intent: "save" | "load", _: PayrollReadState, form: FormData): Promise<PayrollReadState> {
  const d = await payrollDocument(documentId);
  if (!d) return { error: "Document not found." };
  const draft = parseDraft(String(form.get("draft") ?? ""));
  if (!draft) return { error: "The register could not be read from the page. Reload and try again." };
  const { error: saveError } = await d.supabase.from("payroll_extractions").update({ draft }).eq("document_id", documentId);
  if (saveError) return { error: `Could not save: ${saveError.message}` };
  if (intent === "save") {
    done(documentId);
    return { ok: "Saved." };
  }
  if (!["received", "under_review"].includes(d.doc.status)) return { error: "This payroll has already been loaded." };

  const employees = await loadEmployees(d.supabase, d.doc.client_id);
  const { rows, issues } = draftToRegister(draft, employees);
  if (issues.length) return { error: "Some rows need an employee before loading.", issues: issues.map((i) => i.message) };
  if (rows.length === 0) return { error: "There are no amounts to load." };
  const month = String(d.doc.period).slice(0, 10);
  const r = await applyRegister(d.supabase, d.doc.client_id, month, rows, { addNew: form.get("add_new") === "on", periodEnd: periodEnd(month, String(form.get("pay_period") ?? "month")) });
  if ("error" in r) return { error: r.error, preview: r.preview };

  const { data: ext } = await d.supabase.from("payroll_extractions").select("result").eq("document_id", documentId).maybeSingle();
  const read = ext?.result as PayrollRead | null;
  if (read?.sheet) await saveColumnMap(d.supabase, d.doc.client_id, read, read.sheet.columns);
  await d.supabase.from("payroll_extractions").update({ loaded_at: new Date().toISOString(), loaded_by: d.me.userId }).eq("document_id", documentId);
  const { error: postError } = await d.supabase.rpc("review_document", { p_document: documentId, p_action: "post", p_reason: null });
  revalidatePath(`/app/clients/${d.doc.client_id}/payroll`, "layout");
  revalidatePath("/app", "layout");
  revalidatePath("/portal", "layout");
  const saved = `Loaded into payroll: ${r.saved} employee${r.saved === 1 ? "" : "s"} changed.`;
  return postError ? { ok: `${saved} The document could not be marked done (${postError.message}); mark it below.` } : { ok: saved };
}
