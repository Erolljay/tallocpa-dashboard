"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getIdentity } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";

export type CatchUpState = { ok?: string; error?: string };

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const amount = z.coerce.number("Enter the tax due on the filed return (0 if none).").min(0, "Enter zero or more.").multipleOf(0.01, "Use at most two decimals.");

function refresh(filingId: string) {
  revalidatePath(`/app/filings/${filingId}`);
  revalidatePath("/app/review");
  revalidatePath("/app/deadlines");
  revalidatePath("/app");
}

/** Catch-up (migration 20270104000001): records a past return as filed outside the app. */
export async function recordCatchUpAction(filingId: string, _: CatchUpState, form: FormData): Promise<CatchUpState> {
  await getIdentity();
  const tax = amount.safeParse(text(form.get("tax_due")) || undefined);
  if (!tax.success) return { error: tax.error.issues[0].message };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("record_catch_up_filing", {
    p_filing: filingId,
    p_data: {
      tax_due: tax.data,
      filed_on: text(form.get("filed_on")) || null,
      filing_reference: text(form.get("filing_reference")),
      paid_on: text(form.get("paid_on")) || null,
      payment_reference: text(form.get("payment_reference")),
    },
    p_note: text(form.get("note")) || null,
  });
  if (error) return { error: error.message };
  refresh(filingId);
  return { ok: "Recorded. It waits for the reviewer to confirm it." };
}

/** The reviewer or the Owner confirms a recorded catch-up return, or sends it back. */
export async function confirmCatchUpAction(filingId: string, action: "confirm" | "send_back", _: CatchUpState, form: FormData): Promise<CatchUpState> {
  await getIdentity();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("confirm_catch_up_filing", {
    p_filing: filingId,
    p_action: action,
    p_note: text(form.get("note")) || null,
  });
  if (error) return { error: error.message };
  refresh(filingId);
  revalidatePath("/portal");
  return { ok: action === "confirm" ? "Confirmed: filed." : "Sent back." };
}
