"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { templatePayload } from "@/lib/ledger/coa";
import { booksAccess, loadAccounts, loadStatements } from "@/lib/ledger/data";
import { REPORT_KINDS, type ReportKind } from "@/lib/ledger/statements";
import { checkOpening, openingPayload, type CheckedOpening } from "@/lib/ledger/opening";
import { readOpeningFile } from "@/lib/ledger/opening-xlsx";
import { checkUpdate, fromWorkbookData, updatePayload, type CheckedUpdate } from "@/lib/ledger/arap";
import { readUpdateWorkbook } from "@/lib/ledger/arap-xlsx";
import { ACCOUNT_TYPES, CONTROLS, NORMAL_SIDE, TEMPLATES, type AccountType, type Control, type TemplateCode } from "@/lib/ledger/types";
import { isBirLine } from "@/lib/ledger/bir-lines";
import { isFsLine } from "@/lib/ledger/fs-lines";
import { isCashFlowClass } from "@/lib/ledger/cash-flow";
import { toCentavos, toDecimalString } from "@/lib/returns/money";

export type FormState = { error?: string; fieldErrors?: Record<string, string>; ok?: string };
export type OpeningState = { error?: string; ok?: string; checked?: CheckedOpening };
export type ArapState = { error?: string; ok?: string; checked?: CheckedUpdate };

const path = (clientId: string) => `/app/clients/${clientId}/books`;

/** Postgres errors from the ledger functions, in words staff can act on. */
function friendly(message: string): string {
  if (message.includes("ledger_accounts_client_id_code_key")) return "Another account of this client already has that code.";
  if (message.includes("ledger_accounts_one_control")) return "This client already has an account with that control role.";
  if (message.includes("journal_lines_client_id_account_id_fkey")) return "This account has entries and cannot be deleted; deactivate it instead.";
  if (message.includes("documents_ledger_account_fkey") || message.includes("client_party_accounts")) return "Documents are booked to this account; deactivate it instead.";
  if (message.includes("open_item_applications_open_item_id_fkey")) return "Collections or payments were already applied to these opening receivables or payables; reverse them before importing the opening balances again.";
  return message;
}

export async function setupBooksAction(clientId: string, _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const template = String(form.get("template") ?? "") as TemplateCode;
  const month = String(form.get("books_start") ?? "");
  if (!(template in TEMPLATES)) return { error: "Choose a chart-of-accounts template." };
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return { error: "Choose the first month of the books." };
  const { error } = await supabase.rpc("setup_books", { p_client: clientId, p_template: template, p_books_start: `${month}-01`, p_accounts: templatePayload(template) });
  if (error) return { error: `Could not set up the books: ${friendly(error.message)}` };
  revalidatePath(path(clientId), "layout");
  redirect(path(clientId));
}

/** Add an account (accountId null) or edit one. */
export async function saveAccountAction(clientId: string, accountId: string | null, _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const v = (k: string) => String(form.get(k) ?? "").trim();
  const type = v("type") as AccountType;
  const control = v("control") as Control | "";
  const errs: Record<string, string> = {};
  if (!/^[0-9A-Za-z][0-9A-Za-z.-]{0,19}$/.test(v("code"))) errs.code = "Letters, digits, dots or dashes";
  if (!v("name")) errs.name = "Required";
  if (!(type in ACCOUNT_TYPES)) errs.type = "Choose a type";
  if (!isFsLine(v("fs_line"))) errs.fs_line = "Choose an FS line";
  if (v("bir_line") && !isBirLine(v("bir_line"))) errs.bir_line = "Unknown BIR line";
  if (control && !(control in CONTROLS)) errs.control = "Unknown role";
  const cashFlow = v("cash_flow");
  if (cashFlow && !isCashFlowClass(cashFlow)) errs.cash_flow = "Unknown class";
  if (Object.keys(errs).length) return { error: "Check the highlighted fields.", fieldErrors: errs };
  const side = v("normal_side") === "debit" || v("normal_side") === "credit" ? v("normal_side") : NORMAL_SIDE[type];
  const row = {
    code: v("code"), name: v("name"), type, normal_side: side, fs_line: v("fs_line"),
    bir_line: v("bir_line") || null, control: control || null, active: form.get("active") === "on",
    cash_flow: ["asset", "liability", "equity"].includes(type) ? cashFlow || null : null,
    sort_order: Number(v("sort_order")) || 0,
  };
  const { error } = accountId
    ? await supabase.from("ledger_accounts").update(row).eq("id", accountId).eq("client_id", clientId)
    : await supabase.from("ledger_accounts").insert({ ...row, client_id: clientId });
  if (error) return { error: `Could not save the account: ${friendly(error.message)}` };
  revalidatePath(path(clientId), "layout");
  return { ok: accountId ? "Saved." : "Added." };
}

export async function deleteAccountAction(clientId: string, accountId: string): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const { error } = await supabase.from("ledger_accounts").delete().eq("id", accountId).eq("client_id", clientId);
  if (error) return { error: friendly(error.message) };
  revalidatePath(path(clientId), "layout");
  return { ok: "Deleted." };
}

async function checkOpeningFile(clientId: string, form: FormData) {
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose the opening balances workbook (.xlsx)." } as const;
  if (file.size > 5 * 1024 * 1024) return { error: "The file is larger than 5 MB." } as const;
  const { supabase, books } = await booksAccess(clientId);
  if (!books) return { error: "Set up the books first." } as const;
  const read = await readOpeningFile(await file.arrayBuffer());
  if ("error" in read) return { error: read.error } as const;
  const checked = checkOpening(read.tb, read.items, await loadAccounts(supabase, clientId));
  return { supabase, checked } as const;
}

export async function previewOpeningAction(clientId: string, _: OpeningState, form: FormData): Promise<OpeningState> {
  const r = await checkOpeningFile(clientId, form);
  if ("error" in r) return { error: r.error };
  return { checked: r.checked };
}

export async function saveOpeningAction(clientId: string, _: OpeningState, form: FormData): Promise<OpeningState> {
  const r = await checkOpeningFile(clientId, form);
  if ("error" in r) return { error: r.error };
  if (r.checked.errors.length) return { error: "Fix the problems listed and upload again.", checked: r.checked };
  const { error } = await r.supabase.rpc("save_opening_balances", { p_client: clientId, ...openingPayload(r.checked) });
  if (error) return { error: `Could not save the opening balances: ${friendly(error.message)}`, checked: r.checked };
  revalidatePath(path(clientId), "layout");
  return { ok: `Opening balances saved: ${r.checked.lines.length} accounts, ${r.checked.items.length} open receivables and payables.` };
}

/** A manual journal entry: `account_<n>`, `description_<n>`, `debit_<n>`, `credit_<n>` for rows 0…rows-1. */
export async function postEntryAction(clientId: string, _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const v = (k: string) => String(form.get(k) ?? "").trim();
  const rows = Math.min(Number(v("rows")) || 0, 100);
  const errs: Record<string, string> = {};
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v("date"))) errs.date = "Required";
  if (!v("memo")) errs.memo = "Describe the entry";
  const lines: { account_id: string; description: string | null; debit: string; credit: string }[] = [];
  let dr = 0;
  let cr = 0;
  for (let i = 0; i < rows; i++) {
    const account = v(`account_${i}`);
    const d = v(`debit_${i}`) ? toCentavos(v(`debit_${i}`)) : 0;
    const c = v(`credit_${i}`) ? toCentavos(v(`credit_${i}`)) : 0;
    if (!account && !d && !c) continue;
    if (!account) { errs[`account_${i}`] = "Choose an account"; continue; }
    if (d == null || d < 0) { errs[`debit_${i}`] = "Not an amount"; continue; }
    if (c == null || c < 0) { errs[`credit_${i}`] = "Not an amount"; continue; }
    if ((d > 0) === (c > 0)) { errs[`debit_${i}`] = "A debit or a credit"; continue; }
    dr += d;
    cr += c;
    lines.push({ account_id: account, description: v(`description_${i}`) || null, debit: toDecimalString(d), credit: toDecimalString(c) });
  }
  if (Object.keys(errs).length) return { error: "Check the highlighted fields.", fieldErrors: errs };
  if (lines.length < 2) return { error: "An entry needs at least two lines." };
  if (dr !== cr) return { error: `Debits (${toDecimalString(dr)}) and credits (${toDecimalString(cr)}) must be equal.` };
  const { error } = await supabase.rpc("post_journal_entry", { p_client: clientId, p_date: v("date"), p_memo: v("memo"), p_reference: v("reference") || null, p_lines: lines });
  if (error) return { error: `Could not post the entry: ${friendly(error.message)}` };
  revalidatePath(path(clientId), "layout");
  redirect(path(clientId));
}

export async function reverseEntryAction(clientId: string, entryId: string, _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const date = String(form.get("date") ?? "");
  const reason = String(form.get("reason") ?? "").trim();
  if (!reason) return { error: "Give the reason." };
  const { error } = await supabase.rpc("reverse_journal_entry", { p_entry: entryId, p_date: date, p_reason: reason });
  if (error) return { error: friendly(error.message) };
  revalidatePath(path(clientId), "layout");
  return { ok: "Reversed." };
}

/** Confirms one suggested entry (from a document): it is posted and opens or settles receivables and payables. */
export async function confirmEntryAction(clientId: string, entryId: string): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const { error } = await supabase.rpc("confirm_journal_entry", { p_entry: entryId });
  if (error) return { error: friendly(error.message) };
  revalidatePath(path(clientId), "layout");
  return { ok: "Posted." };
}

/** Confirms every suggested entry of the client, oldest first; stops at the first that fails. */
export async function confirmAllAction(clientId: string): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const { data } = await supabase.from("journal_entries").select("id, memo").eq("client_id", clientId).eq("status", "suggested").order("entry_date").order("created_at");
  let n = 0;
  for (const e of data ?? []) {
    const { error } = await supabase.rpc("confirm_journal_entry", { p_entry: e.id });
    if (error) {
      revalidatePath(path(clientId), "layout");
      return { error: `Posted ${n}; stopped at "${e.memo}": ${friendly(error.message)}` };
    }
    n++;
  }
  revalidatePath(path(clientId), "layout");
  return { ok: `Posted ${n} entr${n === 1 ? "y" : "ies"}.` };
}

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

async function checkArapFile(clientId: string, form: FormData) {
  const month = String(form.get("month") ?? "");
  if (!MONTH_RE.test(month)) return { error: "Choose the month of the update." } as const;
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose the AR/AP update workbook (.xlsx)." } as const;
  if (file.size > 5 * 1024 * 1024) return { error: "The file is larger than 5 MB." } as const;
  const { supabase } = await booksAccess(clientId);
  const read = await readUpdateWorkbook(await file.arrayBuffer());
  if ("error" in read) return { error: read.error } as const;
  const { data, error } = await supabase.rpc("arap_workbook", { p_client: clientId });
  if (error) return { error: friendly(error.message) } as const;
  const { items, accounts } = fromWorkbookData(data);
  return { supabase, month: `${month}-01`, checked: checkUpdate(read.rows, items, accounts, `${month}-01`) } as const;
}

export async function previewArapAction(clientId: string, _: ArapState, form: FormData): Promise<ArapState> {
  const r = await checkArapFile(clientId, form);
  if ("error" in r) return { error: r.error };
  return { checked: r.checked };
}

/** Staff upload: posted at once to the Cash Receipts / Cash Disbursements Books. */
export async function saveArapAction(clientId: string, _: ArapState, form: FormData): Promise<ArapState> {
  const r = await checkArapFile(clientId, form);
  if ("error" in r) return { error: r.error };
  if (r.checked.errors.length) return { error: "Fix the rows listed and upload again.", checked: r.checked };
  const { error } = await r.supabase.rpc("submit_arap_update", { p_client: clientId, p_month: r.month, p_rows: updatePayload(r.checked) });
  if (error) return { error: `Could not post the update: ${friendly(error.message)}`, checked: r.checked };
  revalidatePath(path(clientId), "layout");
  return { ok: `Posted ${r.checked.rows.length} collection(s) and payment(s).` };
}

export async function postArapAction(clientId: string, updateId: string): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const { error } = await supabase.rpc("post_arap_update", { p_update: updateId });
  if (error) return { error: friendly(error.message) };
  revalidatePath(path(clientId), "layout");
  return { ok: "Posted." };
}

export async function returnArapAction(clientId: string, updateId: string, _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const { error } = await supabase.rpc("return_arap_update", { p_update: updateId, p_reason: String(form.get("reason") ?? "") });
  if (error) return { error: friendly(error.message) };
  revalidatePath(path(clientId), "layout");
  return { ok: "Returned." };
}

/** The loose-leaf books permit / registration reference printed on every page. */
export async function savePermitAction(clientId: string, _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const { error } = await supabase.rpc("set_books_permit", { p_client: clientId, p_permit: String(form.get("permit") ?? "") });
  if (error) return { error: friendly(error.message) };
  revalidatePath(path(clientId), "layout");
  return { ok: "Saved." };
}

// ---------------------------------------------------------------------------
// Period lock and amendments (spec §3.6, §4.3).
// ---------------------------------------------------------------------------

/** The Owner or the client's reviewer asks to reopen a filed return's months (the Owner's own request reopens them at once). */
export async function requestAmendmentAction(clientId: string, _: FormState, form: FormData): Promise<FormState> {
  const { supabase, me } = await booksAccess(clientId);
  const filing = String(form.get("filing") ?? "");
  const reason = String(form.get("reason") ?? "").trim();
  if (!filing) return { error: "Choose the filed return." };
  if (!reason) return { error: "Give the reason for the amendment." };
  const { error } = await supabase.rpc("request_ledger_amendment", { p_filing: filing, p_reason: reason });
  if (error) return { error: friendly(error.message) };
  revalidatePath(path(clientId), "layout");
  revalidatePath("/app");
  return { ok: me.staff.role === "owner" ? "Reopened. Lock the months again once the books are corrected." : "Sent to the Owner for approval." };
}

export async function decideAmendmentAction(clientId: string, amendmentId: string, approve: boolean, _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const note = String(form.get("note") ?? "").trim();
  if (!approve && !note) return { error: "Give the reason for rejecting it." };
  const { error } = await supabase.rpc("decide_ledger_amendment", { p_amendment: amendmentId, p_approve: approve, p_note: note || null });
  if (error) return { error: friendly(error.message) };
  revalidatePath(path(clientId), "layout");
  revalidatePath("/app");
  return { ok: approve ? "Approved: the months are reopened." : "Rejected." };
}

export async function relockAmendmentAction(clientId: string, amendmentId: string, _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const changes = String(form.get("changes") ?? "").trim();
  if (!changes) return { error: "Note what was changed in the books." };
  const { error } = await supabase.rpc("relock_ledger_amendment", { p_amendment: amendmentId, p_changes: changes });
  if (error) return { error: friendly(error.message) };
  revalidatePath(path(clientId), "layout");
  return { ok: "Locked again." };
}

// ---------------------------------------------------------------------------
// Reports released to the client (spec §3.4, §3.6 slice 6; Q42).
// ---------------------------------------------------------------------------

/** The Owner releases the statements as they stand now; they are rebuilt from the ledger here, never taken from the browser. */
export async function releaseReportAction(clientId: string, kind: ReportKind, endMonth: string, _: FormState, form: FormData): Promise<FormState> {
  const { supabase, client, me } = await booksAccess(clientId);
  if (me.staff.role !== "owner") return { error: "Only the Owner releases reports to clients." };
  if (!(kind in REPORT_KINDS)) return { error: "Choose the kind of report." };
  const r = await loadStatements(supabase, client, kind, endMonth);
  if ("error" in r) return { error: r.error };
  if (r.fs.difference !== 0) return { error: "The statements do not balance; check the books before releasing." };
  if (r.fs.unclassified.length) return { error: `Set the FS line of ${r.fs.unclassified.join(", ")} before releasing.` };
  const { error } = await supabase.rpc("release_client_report", {
    p_client: clientId, p_kind: kind, p_start: r.fs.periodStart, p_end: r.fs.periodEnd, p_statements: r.fs, p_note: String(form.get("note") ?? ""),
  });
  if (error) return { error: friendly(error.message) };
  revalidatePath(path(clientId), "layout");
  revalidatePath("/portal/reports", "layout");
  return { ok: "Released to the client's portal." };
}

export async function withdrawReportAction(clientId: string, reportId: string): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  const { error } = await supabase.rpc("withdraw_client_report", { p_report: reportId });
  if (error) return { error: friendly(error.message) };
  revalidatePath(path(clientId), "layout");
  revalidatePath("/portal/reports", "layout");
  return { ok: "Withdrawn." };
}

// ---------------------------------------------------------------------------
// Year-end closing (slice 7).
// ---------------------------------------------------------------------------

/** Closes the taxable year ending `yearEnd`. Partnerships give each partner's share (form fields share_<account id>). */
export async function closeYearAction(clientId: string, yearEnd: string, partners: string[], _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await booksAccess(clientId);
  let shares: { account_id: string; percent: number }[] | null = null;
  if (partners.length > 1) {
    shares = partners.map((a) => ({ account_id: a, percent: Number(String(form.get(`share_${a}`) ?? "").trim()) }));
    if (shares.some((s) => !Number.isFinite(s.percent) || s.percent < 0)) return { error: "Enter each partner's share as a percentage." };
  }
  const { error } = await supabase.rpc("close_books_year", { p_client: clientId, p_year_end: yearEnd, p_shares: shares });
  if (error) return { error: friendly(error.message) };
  revalidatePath(path(clientId), "layout");
  return { ok: "Closed." };
}
