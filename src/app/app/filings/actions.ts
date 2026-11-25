"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getIdentity } from "@/lib/auth";
import type { SignOffAction } from "@/lib/filings/sign-off";
import { showMonth } from "@/lib/documents/labels";
import { supabaseServer } from "@/lib/supabase/server";
import { loadPeriodFile } from "@/lib/workpapers/load";
import { blockingTies, monthsOf, TIES_FOR_FORM } from "@/lib/workpapers/tieouts";

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
  if (action === "prepare") {
    const blocked = await tieOutsBlocking(supabase, filingId);
    if (blocked) return { error: blocked };
  }
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

/**
 * W1, recommendation 3: a return cannot be marked prepared while a tie-out it needs
 * (src/lib/workpapers/tieouts.ts) differs by more than ₱1 without a written
 * explanation, in any month it covers. Returns what to do, or null.
 */
async function tieOutsBlocking(supabase: Awaited<ReturnType<typeof supabaseServer>>, filingId: string): Promise<string | null> {
  const { data: f } = await supabase.from("filing_instances").select("client_id, form, period_start, period_end").eq("id", filingId).maybeSingle();
  if (!f || !(TIES_FOR_FORM[f.form] ?? []).length) return null;
  const open: string[] = [];
  for (const m of monthsOf(f.period_start, f.period_end)) {
    const file = await loadPeriodFile(supabase, f.client_id, m);
    for (const t of blockingTies(file.ties, f.form)) open.push(`${t.id} (${showMonth(m)})`);
  }
  return open.length
    ? `Explain ${open.join(", ")} in the client's Workpapers (0-2 tie-outs) before marking this return prepared: the difference is over ₱1.`
    : null;
}
