"use server";

import { revalidatePath } from "next/cache";
import { periodEnd } from "@/lib/payroll/periods";
import { getIdentity } from "@/lib/auth";
import { previewOf, type RegisterPreview } from "@/lib/payroll/apply";
import { checkRegister } from "@/lib/payroll/register";
import { readRegister, XLSX_TYPE } from "@/lib/payroll/register-xlsx";
import { employeeFromRow, itemFromRow, ITEM_COLUMNS } from "@/lib/payroll/rows";
import { supabaseServer } from "@/lib/supabase/server";

export type PortalPayrollState = { error?: string; ok?: string; preview?: RegisterPreview };

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])-01$/;

/** Reads and checks a register the client is sending, as the client user (RLS: their own client only). */
async function check(form: FormData) {
  const id = await getIdentity();
  const clientId = String(form.get("client_id") ?? "");
  const month = String(form.get("month") ?? "");
  if (!id.clients.some((c) => c.clientId === clientId)) return { error: "Choose your business." } as const;
  if (!MONTH_RE.test(month)) return { error: "Choose the month." } as const;
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose your filled-in payroll register (.xlsx)." } as const;
  if (!file.name.toLowerCase().endsWith(".xlsx")) return { error: "Upload the register as an Excel workbook (.xlsx)." } as const;
  const supabase = await supabaseServer();
  const [items, roster] = await Promise.all([
    supabase.from("payroll_items").select(ITEM_COLUMNS).eq("client_id", clientId),
    supabase.rpc("payroll_roster", { p_client: clientId }),
  ]);
  if (items.error || roster.error) return { error: "Payroll is not available for this business yet." } as const;
  const itemList = (items.data ?? []).map((r) => itemFromRow(r as unknown as Record<string, unknown>));
  const employees = ((roster.data ?? []) as Record<string, unknown>[]).map(employeeFromRow);
  const bytes = await file.arrayBuffer();
  const read = await readRegister(bytes, itemList);
  if ("error" in read) return { error: read.error } as const;
  const checked = checkRegister(read.rows, employees, itemList, month);
  return { supabase, clientId, month, file, bytes, rows: read.rows, preview: previewOf(checked, employees, itemList), userId: id.userId } as const;
}

/** Step 1: show what the file says; nothing is sent. */
export async function previewPortalPayrollAction(_: PortalPayrollState, form: FormData): Promise<PortalPayrollState> {
  const r = await check(form);
  if ("error" in r) return { error: r.error };
  if (r.preview.rowCount === 0) return { error: "The register has no amounts." };
  return { preview: r.preview };
}

/** Step 2: store the file and send the register to the firm for review. */
export async function submitPortalPayrollAction(_: PortalPayrollState, form: FormData): Promise<PortalPayrollState> {
  const r = await check(form);
  if ("error" in r) return { error: r.error };
  if (r.preview.errors.length) return { error: "Fix the rows listed and upload the file again.", preview: r.preview };
  if (r.preview.rowCount === 0) return { error: "The register has no amounts." };
  const path = `${r.clientId}/${r.month.slice(0, 7)}/${crypto.randomUUID()}.xlsx`;
  const { error: upError } = await r.supabase.storage.from("payroll").upload(path, r.bytes, { contentType: XLSX_TYPE, upsert: false });
  if (upError) return { error: `Could not store the file: ${upError.message}` };
  const { error } = await r.supabase.from("payroll_submissions").insert({
    client_id: r.clientId,
    pay_month: r.month,
    submitted_by: r.userId,
    file_name: r.file.name.slice(0, 200),
    storage_path: path,
    rows: r.rows,
    pay_period_end: periodEnd(r.month, String(form.get("pay_period") ?? "month")),
  });
  if (error) return { error: `Could not send the register: ${error.message}` };
  revalidatePath("/portal", "layout");
  revalidatePath("/app", "layout");
  return { ok: "Sent. We will review it and tell you if anything needs fixing." };
}
