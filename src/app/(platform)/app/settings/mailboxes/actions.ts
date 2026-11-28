"use server";
/**
 * Connected mailboxes (migration 20270111000001): the Owner chooses what each is read
 * for, checks them now, or disconnects one. Disconnecting tells Google to forget the
 * token (best effort) before the app deletes it.
 */
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireOwner } from "@/lib/auth";
import { ingestBirMail } from "@/lib/bir-mail/ingest";
import { googleCalendarEnv } from "@/lib/env";
import { revoke } from "@/lib/google/calendar";
import { openToken, parseKey } from "@/lib/google/crypto";
import { MAILBOX_PATH } from "@/lib/mailboxes/oauth-state";
import { pollPaymentMail } from "@/lib/payment-proof/poll";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";

export type MailboxState = { ok?: string; error?: string };

const uuid = z.string().uuid();

export async function setMailboxPurposesAction(id: string, _: MailboxState, form: FormData): Promise<MailboxState> {
  await requireOwner();
  if (!uuid.safeParse(id).success) return { error: "Unknown mailbox." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("mailbox_set_purposes", { p_id: id, p_bir_mail: form.get("bir_mail") === "on", p_payment_mail: form.get("payment_mail") === "on" });
  if (error) return { error: error.message };
  revalidatePath(MAILBOX_PATH);
  return { ok: "Saved." };
}

export async function disconnectMailboxAction(id: string): Promise<MailboxState> {
  await requireOwner();
  if (!uuid.safeParse(id).success) return { error: "Unknown mailbox." };
  const env = googleCalendarEnv();
  const { data } = await supabaseAdmin().rpc("mailbox_token", { p_id: id });
  const row = ((data ?? []) as { email: string; refresh_token: string }[])[0];
  if (env && row) {
    try {
      await revoke(openToken(row.refresh_token, parseKey(env.tokenKey), row.email));
    } catch {
      // Best effort: the app forgets it either way; the Owner can also remove access in Google.
    }
  }
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("mailbox_remove", { p_id: id });
  if (error) return { error: error.message };
  revalidatePath(MAILBOX_PATH);
  return { ok: "Disconnected." };
}

/** Reads every mailbox now: BIR mail and payment confirmations. */
export async function checkMailboxesNowAction(): Promise<MailboxState> {
  await requireOwner();
  const admin = supabaseAdmin();
  const [bir, pay] = await Promise.all([
    ingestBirMail(admin).catch((e: Error) => ({ error: e.message })),
    pollPaymentMail(admin).catch((e: Error) => ({ error: e.message })),
  ]);
  revalidatePath(MAILBOX_PATH);
  revalidatePath("/app/bir-mail");
  const part = (label: string, r: { error: string } | { stored: number; errors: string[] }) =>
    "error" in r ? `${label}: ${r.error}` : `${label}: ${r.stored} new${r.errors.length ? `, ${r.errors.length} could not be read` : ""}`;
  return { ok: `${part("BIR mail", bir)}. ${part("Payment confirmations", pay)}.` };
}
