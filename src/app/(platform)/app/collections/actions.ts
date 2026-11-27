"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireOwner } from "@/lib/auth";
import { contributionDescription, isContribution, type Contribution } from "@/lib/collections/collections";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";

export type MoneyState = { ok?: string; error?: string };

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const peso = z.coerce.number("Enter an amount.").positive("Enter an amount above zero.").multipleOf(0.01, "Use at most two decimals.");
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a date.");

function refresh(clientId?: string) {
  revalidatePath("/app/collections");
  revalidatePath("/app");
  if (clientId) revalidatePath(`/app/collections/${clientId}`);
  revalidatePath("/portal/billing", "layout");
}

/**
 * Runs billing (decision 16c: only the Owner bills, nothing runs by itself): one
 * client, or every client in Ready to bill. The date defaults to today in Manila.
 */
export async function runBillingAction(clientId: string | null, _: MoneyState, form: FormData): Promise<MoneyState> {
  await requireOwner();
  const d = date.safeParse(text(form.get("billing_date")) || manilaToday());
  if (!d.success) return { error: d.error.issues[0].message };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("run_billing", { p_billing_date: d.data, p_client: clientId });
  if (error) return { error: error.message };
  refresh(clientId ?? undefined);
  const n = Number(data ?? 0);
  if (clientId) return { ok: n ? "Statement issued." : "Nothing ready to bill." };
  return { ok: n === 0 ? "Nothing ready to bill." : `${n} statement${n === 1 ? "" : "s"} issued or updated.` };
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
  let contribution: Contribution | null = null;
  if (kind === "contribution") {
    const agency = text(form.get("agency"));
    const month = text(form.get("month"));
    if (!isContribution(agency) || !/^\d{4}-\d{2}$/.test(month)) return { error: "Choose the agency and the month." };
    contribution = agency;
    description = contributionDescription(agency, month);
  }
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("add_client_charge", {
    p_client: clientId, p_kind: kind, p_description: description, p_amount: amount.data, p_due_on: due.data, p_contribution: contribution,
  });
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

/** Approves a late-submission surcharge waiting for the Owner: it goes in Ready to bill. */
export async function approveLateSurchargeAction(clientId: string, surchargeId: string): Promise<MoneyState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("approve_late_surcharge", { p_id: surchargeId });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: "Approved. It goes on the next statement." };
}

/** Waives a late-submission surcharge waiting for the Owner, with a reason. */
export async function waiveLateSurchargeAction(clientId: string, surchargeId: string, _: MoneyState, form: FormData): Promise<MoneyState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("waive_late_surcharge", { p_id: surchargeId, p_reason: text(form.get("reason")) });
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

/** Records that one contribution item (SSS, PhilHealth, Pag-IBIG or a loan payment) was remitted: its money is no longer held. */
export async function markRemittedAction(clientId: string, dueId: string, _: MoneyState, form: FormData): Promise<MoneyState> {
  await requireOwner();
  const d = date.safeParse(text(form.get("remitted_on")));
  if (!d.success) return { error: "Enter the date it was remitted." };
  const reference = text(form.get("reference"));
  if (reference.length > 100) return { error: "Keep the reference under 100 characters." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("mark_contribution_remitted", { p_due: dueId, p_remitted_on: d.data, p_reference: reference });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: "Marked remitted." };
}

export async function clearRemittedAction(clientId: string, dueId: string): Promise<MoneyState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("clear_contribution_remitted", { p_due: dueId });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: "Remittance undone; the money is held again." };
}
