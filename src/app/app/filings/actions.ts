"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getIdentity } from "@/lib/auth";
import type { SignOffAction } from "@/lib/filings/sign-off";
import { supabaseServer } from "@/lib/supabase/server";

export type SignOffState = { ok?: string; error?: string };

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const amount = z.coerce.number("Enter the tax due (0 if none).").min(0, "Enter zero or more.").multipleOf(0.01, "Use at most two decimals.");

/** Fields each step sends to advance_filing(), from the step's form. */
function stepData(action: SignOffAction, form: FormData): { data: Record<string, unknown> } | { error: string } {
  switch (action) {
    case "prepare": {
      const r = amount.safeParse(text(form.get("tax_due")) || undefined);
      return r.success ? { data: { tax_due: r.data } } : { error: r.error.issues[0].message };
    }
    case "owner_approve":
      // The payment check itself is worked out by the database from Collections.
      return { data: { approve_unpaid: form.get("approve_unpaid") === "on" } };
    case "file":
      return { data: { filing_reference: text(form.get("filing_reference")), filed_on: text(form.get("filed_on")) || null } };
    case "pay":
      return { data: { payment_reference: text(form.get("payment_reference")), paid_on: text(form.get("paid_on")) || null } };
    default:
      return { data: {} };
  }
}

/** One step of the sign-off chain (spec §3.8). The database decides who may take it. */
export async function advanceFilingAction(filingId: string, action: SignOffAction, _: SignOffState, form: FormData): Promise<SignOffState> {
  await getIdentity();
  const parsed = stepData(action, form);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("advance_filing", {
    p_filing: filingId,
    p_action: action,
    p_note: text(form.get("note")) || null,
    p_data: parsed.data,
  });
  if (error) return { error: error.message };
  revalidatePath(`/app/filings/${filingId}`);
  revalidatePath("/app/deadlines");
  revalidatePath("/app");
  revalidatePath("/portal");
  revalidatePath("/app/collections");
  return { ok: "Saved." };
}

/** Starts an amended return of a filed one (spec §4.3) and opens it. */
export async function amendFilingAction(filingId: string, _: SignOffState, form: FormData): Promise<SignOffState> {
  await getIdentity();
  const reason = text(form.get("reason"));
  if (!reason) return { error: "Give the reason for the amended return." };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("amend_filing", { p_filing: filingId, p_reason: reason });
  if (error) return { error: error.message };
  revalidatePath("/app", "layout");
  redirect(`/app/filings/${data as string}`);
}
