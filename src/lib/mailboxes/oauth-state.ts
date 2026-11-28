/** The OAuth round trip for connecting a mailbox: its cookie, path and redirect. */
export const MAILBOX_STATE_COOKIE = "gmail_oauth";
export const MAILBOX_PATH = "/app/settings/mailboxes";

/** The OAuth redirect: APP_URL when set, else the request's own origin. Add it to the OAuth client in Google Cloud. */
export function mailboxRedirectUri(appUrl: string | null, requestUrl: string): string {
  return `${appUrl ?? new URL(requestUrl).origin}${MAILBOX_PATH}/callback`;
}
