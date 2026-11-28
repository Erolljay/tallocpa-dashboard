import "server-only";
/**
 * Read-only Gmail for the connected mailboxes (migration 20270111000001): the consent
 * link (scope gmail.readonly, plus who signed in), and listing, reading and downloading
 * messages. Never sends, labels, moves or deletes. The OAuth client is the firm's internal
 * one (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET), shared with the calendar.
 */
import type { MailMessage } from "@/lib/esubmission/gmail";
import type { GoogleCalendarEnv } from "@/lib/env";

export const GMAIL_READONLY = "https://www.googleapis.com/auth/gmail.readonly";
export const MAILBOX_SCOPES = ["openid", "email", GMAIL_READONLY];

const API = "https://gmail.googleapis.com/gmail/v1/users/me";

/** The consent link for connecting a mailbox read-only. `hd` limits the accounts offered to the firm's domain. */
export function mailboxAuthUrl(env: GoogleCalendarEnv, redirectUri: string, state: string): string {
  const u = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  u.searchParams.set("client_id", env.clientId);
  u.searchParams.set("redirect_uri", redirectUri);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("scope", MAILBOX_SCOPES.join(" "));
  u.searchParams.set("access_type", "offline");
  // Always ask, so Google returns a refresh token and the Owner picks the account (own inbox, support@).
  u.searchParams.set("prompt", "consent select_account");
  u.searchParams.set("hd", env.domain);
  u.searchParams.set("state", state);
  return u.toString();
}

/** A short-lived access token for a mailbox's refresh token. */
export async function gmailAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: "refresh_token" }),
    cache: "no-store",
  });
  const body = (await res.json().catch(() => ({}))) as { access_token?: string; error?: string; error_description?: string };
  if (!res.ok || !body.access_token) throw new Error(`Google sign-in for the mailbox failed: ${body.error_description ?? body.error ?? res.status}`);
  return body.access_token;
}

async function get<T>(token: string, path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  const body = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(`Gmail: ${body.error?.message ?? res.status}`);
  return body;
}

/** The ids of messages matching a Gmail search, newest first. */
export async function listMessageIds(token: string, q: string, max = 100): Promise<{ id: string; threadId: string }[]> {
  const list = await get<{ messages?: { id: string; threadId: string }[] }>(token, `/messages?maxResults=${Math.min(Math.max(max, 1), 100)}&q=${encodeURIComponent(q)}`);
  return list.messages ?? [];
}

/** One message with its parts. */
export const getMessage = (token: string, id: string) => get<MailMessage>(token, `/messages/${encodeURIComponent(id)}?format=full`);

/** An attachment's bytes. */
export async function getAttachment(token: string, messageId: string, attachmentId: string): Promise<Buffer> {
  const a = await get<{ data?: string }>(token, `/messages/${encodeURIComponent(messageId)}/attachments/${encodeURIComponent(attachmentId)}`);
  return Buffer.from(a.data ?? "", "base64url");
}
