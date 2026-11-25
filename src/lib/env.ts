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
