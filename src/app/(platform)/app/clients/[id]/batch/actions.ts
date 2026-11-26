"use server";

import { revalidatePath } from "next/cache";
import { loadBatchContext } from "@/lib/batch/load";
import { checkBatch, type BatchKind } from "@/lib/batch/register";
import { readBatch } from "@/lib/batch/xlsx";
import { payrollAccess } from "@/lib/payroll/data";
import type { Centavos } from "@/lib/returns/types";

export interface BatchPreview {
  rowCount: number;
  errorCount: number;
  bookedCount: number;
  total: Centavos;
  months: { month: string; count: number; total: Centavos }[];
  /** Rows with problems first, then the first clean rows. */
  rows: { line: number; date: string | null; number: string | null; party: string; total: Centavos; net: Centavos; booked: boolean; errors: string[] }[];
  shown: number;
}
export type BatchState = { error?: string; ok?: string; preview?: BatchPreview };

const SHOWN = 150;

async function readAndCheck(clientId: string, kind: BatchKind, form: FormData) {
  const { supabase } = await payrollAccess(clientId);
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose the filled-in register (.xlsx)." } as const;
  if (!file.name.toLowerCase().endsWith(".xlsx")) return { error: "Upload the register as an Excel workbook (.xlsx)." } as const;
  const ctx = await loadBatchContext(supabase, clientId, kind);
  if (!ctx) return { error: "Set up the client's chart of accounts first (Books page): every row needs an account title." } as const;
  const read = await readBatch(await file.arrayBuffer(), kind);
  if ("error" in read) return { error: read.error } as const;
  if (read.rows.length === 0) return { error: "The register has no rows." } as const;
  const check = checkBatch(read.rows, ctx);
  const bad = check.rows.filter((r) => r.errors.length);
  const clean = check.rows.filter((r) => !r.errors.length);
  const rows = [...bad, ...clean].slice(0, SHOWN).map((r) => ({ line: r.line, date: r.date, number: r.fields.number ?? null, party: r.party, total: r.total, net: r.net, booked: r.booked, errors: r.errors }));
  const preview: BatchPreview = {
    rowCount: check.rows.length,
    errorCount: check.errorCount,
    bookedCount: check.rows.filter((r) => r.booked).length,
    total: check.total,
    months: check.months,
    rows,
    shown: rows.length,
  };
  return { supabase, check, preview, fileName: file.name } as const;
}

/** Step 1: read and check every row; nothing is saved. */
export async function previewBatchAction(clientId: string, kind: BatchKind, _: BatchState, form: FormData): Promise<BatchState> {
  const r = await readAndCheck(clientId, kind, form);
  if ("error" in r) return { error: r.error };
  return { preview: r.preview };
}

/** Step 2: read the file again, check it again, and post it whole (public.post_batch). */
export async function postBatchAction(clientId: string, kind: BatchKind, _: BatchState, form: FormData): Promise<BatchState> {
  const r = await readAndCheck(clientId, kind, form);
  if ("error" in r) return { error: r.error };
  if (r.check.errorCount > 0) return { error: "Fix the rows with problems and upload the file again.", preview: r.preview };
  const rows = r.check.rows.map((x) => ({ row: x.line, fields: x.fields, account_id: x.accountId }));
  const { error } = await r.supabase.rpc("post_batch", { p_client: clientId, p_kind: kind, p_file_name: r.fileName, p_rows: rows });
  if (error) return { error: `Nothing was posted. ${error.message}`, preview: r.preview };
  revalidatePath(`/app/clients/${clientId}`, "layout");
  const n = r.preview.rowCount;
  return {
    ok: `Posted ${n} row${n === 1 ? "" : "s"} to the register${r.preview.bookedCount ? `; ${r.preview.bookedCount} booked to the ledger` : ""}${r.preview.bookedCount < n ? `; ${n - r.preview.bookedCount} before the books start are in the register only` : ""}.`,
  };
}
