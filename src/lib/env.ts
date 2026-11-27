/** Supabase connection settings. See .env.example. */
export function supabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local");
  }
  return { url, key };
}

/**
 * The firm's eSubmission mailbox through the Gmail API (docs/REWORK.md, decision 15;
 * docs/SETUP.md). Optional: null until the Owner sets up the Google OAuth client and
 * the mailbox's refresh token. Without it, staff send the DAT files by hand, mark them
 * sent and upload the BIR's validation report themselves.
 *
 *   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET   the internal OAuth client (tallocpa.com)
 *   ESUBMISSION_GMAIL_REFRESH_TOKEN          refresh token of the mailbox, scope gmail.modify
 *   ESUBMISSION_MAILBOX                      optional; default attachments@tallocpa.com
 *   ESUBMISSION_TO                           optional; default esubmission@bir.gov.ph
 */
export interface EsubmissionMailEnv {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  mailbox: string;
  to: string;
}

export function esubmissionMailEnv(): EsubmissionMailEnv | null {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.ESUBMISSION_GMAIL_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;
  return {
    clientId,
    clientSecret,
    refreshToken,
    mailbox: process.env.ESUBMISSION_MAILBOX || "attachments@tallocpa.com",
    to: process.env.ESUBMISSION_TO || "esubmission@bir.gov.ph",
  };
}

/**
 * Google Calendar for the team calendar and the booking pages (docs/REWORK.md, decision 22;
 * docs/SETUP.md). Optional: null until set, and the calendar pages say so.
 *
 *   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET   the internal OAuth client (tallocpa.com), shared with eSubmission
 *   GOOGLE_TOKEN_KEY                         32 random bytes, base64: encrypts the staff refresh tokens at rest
 *   APP_URL                                  optional; the app's address for the OAuth redirect (default: the request's host)
 *   GOOGLE_WORKSPACE_DOMAIN                  optional; default tallocpa.com: only accounts of this domain connect
 */
export interface GoogleCalendarEnv {
  clientId: string;
  clientSecret: string;
  tokenKey: string;
  appUrl: string | null;
  domain: string;
}

export function googleCalendarEnv(): GoogleCalendarEnv | null {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const tokenKey = process.env.GOOGLE_TOKEN_KEY;
  if (!clientId || !clientSecret || !tokenKey) return null;
  return {
    clientId,
    clientSecret,
    tokenKey,
    appUrl: process.env.APP_URL?.replace(/\/+$/, "") || null,
    domain: (process.env.GOOGLE_WORKSPACE_DOMAIN || "tallocpa.com").toLowerCase(),
  };
}

/**
 * The Telegram upload bot (docs/SETUP.md, "Telegram uploads"). Optional: null until set,
 * and the portal and the client page say Telegram is not set up.
 *
 *   TELEGRAM_BOT_TOKEN       from @BotFather
 *   TELEGRAM_BOT_USERNAME    the bot's username without @, for the t.me link
 *   TELEGRAM_WEBHOOK_SECRET  any long random string; Telegram sends it on every webhook call
 */
export interface TelegramEnv {
  token: string;
  username: string;
  webhookSecret: string;
}

export function telegramEnv(): TelegramEnv | null {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const username = process.env.TELEGRAM_BOT_USERNAME?.replace(/^@/, "");
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!token || !username || !webhookSecret) return null;
  return { token, username, webhookSecret };
}
