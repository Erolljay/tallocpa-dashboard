import "server-only";
/**
 * The mailboxes a job reads, with a way to sign in to each (server only, service role):
 * the Owner's connected mailboxes for the purpose (Settings → Mailboxes; refresh tokens
 * kept encrypted, src/lib/google/crypto.ts), then the environment's mailboxes as before
 * (BIR mail: the eSubmission mailbox; payment confirmations: PAYMENT_MAIL_* or the
 * eSubmission mailbox). Tokens never leave the server and are never logged.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { esubmissionMailEnv, googleCalendarEnv, paymentMailEnv } from "@/lib/env";
import { openToken, parseKey } from "@/lib/google/crypto";
import { gmailAccessToken } from "./gmail";
import { mergeMailboxes, type MailboxRef, type Purpose } from "./merge";

export interface MailboxSource {
  email: string;
  connectedId: string | null;
  /** Signs in and returns an access token. */
  signIn: () => Promise<string>;
}

/** `admin` is a service-role client. Mailboxes that cannot be opened are reported, not thrown. */
export async function mailboxSources(admin: SupabaseClient, purpose: Purpose): Promise<{ sources: MailboxSource[]; errors: string[] }> {
  const errors: string[] = [];
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const connected: MailboxRef<() => Promise<string>>[] = [];

  const g = googleCalendarEnv();
  if (g) {
    const { data, error } = await admin.rpc("mailbox_tokens", { p_purpose: purpose });
    if (error) errors.push(`Connected mailboxes: ${error.message}`);
    for (const row of (data ?? []) as { id: string; email: string; refresh_token: string }[]) {
      connected.push({
        email: row.email,
        connectedId: row.id,
        data: async () => gmailAccessToken(g.clientId, g.clientSecret, openToken(row.refresh_token, parseKey(g.tokenKey), row.email)),
      });
    }
  }

  const fromEnv: MailboxRef<() => Promise<string>>[] = [];
  if (clientId && clientSecret) {
    if (purpose === "bir_mail") {
      const e = esubmissionMailEnv();
      if (e) fromEnv.push({ email: e.mailbox, connectedId: null, data: () => gmailAccessToken(e.clientId, e.clientSecret, e.refreshToken) });
    } else {
      const p = paymentMailEnv();
      if (p) fromEnv.push({ email: p.mailbox, connectedId: null, data: () => gmailAccessToken(p.clientId, p.clientSecret, p.refreshToken) });
    }
  }

  const sources = mergeMailboxes(connected, fromEnv).map((m) => ({ email: m.email, connectedId: m.connectedId, signIn: m.data }));
  return { sources, errors };
}

/** Records the check of a connected mailbox (its error, or none). */
export async function recordCheck(admin: SupabaseClient, source: MailboxSource, error: string | null): Promise<void> {
  if (!source.connectedId) return;
  await admin.rpc("mailbox_checked", { p_id: source.connectedId, p_error: error ?? "" });
}
