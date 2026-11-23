"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireOwner } from "@/lib/auth";
import { parseBillingDays } from "@/lib/collections/collections";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";

export type MoneyState = { ok?: string; error?: string };

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const peso = z.coerce.number("Enter an amount.").positive("Enter an amount above zero.").multipleOf(0.01, "Use at most two decimals.");
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a date.");

function refresh(clientId?: string) {
  revalidatePath("/app/collections");
  if (clientId) revalidatePath(`/app/collections/${clientId}`);
  revalidatePath("/portal/statement");
}

/** Runs billing for a date: every client scheduled that day, or one client. */
export async function runBillingAction(clientId: string | null, _: MoneyState, form: FormData): Promise<MoneyState> {
  await requireOwner();
  const d = date.safeParse(text(form.get("billing_date")) || manilaToday());
  if (!d.success) return { error: d.error.issues[0].message };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("run_billing", { p_billing_date: d.data, p_client: clientId });
  if (error) return { error: error.message };
  refresh(clientId ?? undefined);
  const n = Number(data ?? 0);
  if (clientId) return { ok: n ? "Statement issued." : "Nothing new to bill." };
  return { ok: n === 0 ? "Nothing new to bill for that day." : `${n} statement${n === 1 ? "" : "s"} issued or updated.` };
}

const depositSchema = z.object({
  received_on: date,
  amount: peso,
  method: z.enum(["transfer", "check", "ewallet", "cash"], "Choose how the client paid."),
  payment_account_id: z.string().uuid().nullable(),
  deposited_by: z.string().uuid().nullable(),
});

export async function recordDepositAction(clientId: string, _: MoneyState, form: FormData): Promise<MoneyState> {
  await requireOwner();
  const parsed = depositSchema.safeParse({
    received_on: text(form.get("received_on")),
    amount: text(form.get("amount")) || undefined,
    method: text(form.get("method")),
    payment_account_id: text(form.get("payment_account_id")) || null,
    deposited_by: text(form.get("deposited_by")) || null,
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const v = parsed.data;
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("record_deposit", {
    p_client: clientId,
    p_received_on: v.received_on,
    p_amount: v.amount,
    p_payment_account: v.payment_account_id,
    p_reference: text(form.get("reference")),
    p_bir_invoice_number: text(form.get("bir_invoice_number")),
    p_note: text(form.get("note")),
    p_due_ids: form.getAll("due_ids").map(String),
    p_method: v.method,
    p_deposited_by: v.method === "cash" ? v.deposited_by : null,
  });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: "Payment recorded." };
}

export async function addChargeAction(clientId: string, _: MoneyState, form: FormData): Promise<MoneyState> {
  await requireOwner();
  const kind = text(form.get("kind")) === "contribution" ? "contribution" : "other";
  const amount = peso.safeParse(text(form.get("amount")) || undefined);
  if (!amount.success) return { error: amount.error.issues[0].message };
  const due = date.safeParse(text(form.get("due_on")));
  if (!due.success) return { error: "Enter the due date." };
  let description = text(form.get("description"));
  if (kind === "contribution") {
    const agency = text(form.get("agency"));
    const month = text(form.get("month"));
    if (!agency || !/^\d{4}-\d{2}$/.test(month)) return { error: "Choose the agency and the month." };
    const label = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${month}-01T00:00:00Z`));
    description = `${agency} contributions, ${label}`;
  }
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("add_client_charge", { p_client: clientId, p_kind: kind, p_description: description, p_amount: amount.data, p_due_on: due.data });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: "Added. It goes on the next statement." };
}

export async function voidDepositAction(clientId: string, depositId: string, _: MoneyState, form: FormData): Promise<MoneyState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("void_deposit", { p_deposit: depositId, p_reason: text(form.get("reason")) });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: "Payment voided." };
}

export async function waiveDueAction(clientId: string, dueId: string, _: MoneyState, form: FormData): Promise<MoneyState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("waive_due", { p_due: dueId, p_reason: text(form.get("reason")) });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: "Waived." };
}

export async function applyCreditAction(clientId: string): Promise<MoneyState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("apply_client_credit", { p_client: clientId });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: Number(data) > 0 ? "Credit applied to open items." : "No credit or nothing open to apply it to." };
}

export async function setBillingDaysAction(clientId: string, _: MoneyState, form: FormData): Promise<MoneyState> {
  await requireOwner();
  const parsed = parseBillingDays(text(form.get("billing_days")));
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("set_billing_days", { p_client: clientId, p_days: parsed.days });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: "Billing days saved." };
}
