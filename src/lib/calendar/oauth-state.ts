/** The OAuth round trip's state: random, tied to the staff member who started it, checked on return. */
import { randomBytes, timingSafeEqual } from "node:crypto";

export const STATE_COOKIE = "gcal_oauth";

export function newState(userId: string): { state: string; cookie: string } {
  const state = randomBytes(24).toString("hex");
  return { state, cookie: `${state}.${userId}` };
}

/** Whether the state Google sent back is the one this browser started, for this user. */
export function stateMatches(cookie: string | undefined, state: string | null, userId: string): boolean {
  if (!cookie || !state) return false;
  const [saved, owner] = cookie.split(".");
  if (!saved || owner !== userId || saved.length !== state.length) return false;
  return timingSafeEqual(Buffer.from(saved), Buffer.from(state));
}

/** The OAuth redirect: APP_URL when set, else the request's own origin. */
export function redirectUri(appUrl: string | null, requestUrl: string): string {
  return `${appUrl ?? new URL(requestUrl).origin}/app/calendar/callback`;
}

/** The account must be of the firm's Google Workspace, and the person's own when their sign-in email is known. */
export function accountProblem(account: { email: string; hd: string | null; verified: boolean }, domain: string, signInEmail: string | null): string | null {
  if (!account.verified) return "Google has not verified that account's email.";
  if (account.hd !== domain && !account.email.endsWith(`@${domain}`)) return `Connect your ${domain} Google account.`;
  if (signInEmail && signInEmail.toLowerCase() !== account.email) return `Connect the Google account you sign in with (${signInEmail}).`;
  return null;
}
