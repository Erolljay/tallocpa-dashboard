import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { requireOwner } from "@/lib/auth";
import { accountProblem, stateMatches } from "@/lib/calendar/oauth-state";
import { googleCalendarEnv } from "@/lib/env";
import { exchangeCode, revoke } from "@/lib/google/calendar";
import { parseKey, sealToken } from "@/lib/google/crypto";
import { MAILBOX_PATH, MAILBOX_STATE_COOKIE, mailboxRedirectUri } from "@/lib/mailboxes/oauth-state";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Google's return from the consent screen for a mailbox: checks the state (started by
 * this Owner in this browser) and that the account is the firm's, then keeps the
 * refresh token encrypted and bound to the mailbox's address. The token is never logged
 * or shown.
 */
export async function GET(request: NextRequest) {
  const me = await requireOwner();
  const env = googleCalendarEnv();
  const back = (q: string) => NextResponse.redirect(new URL(`${MAILBOX_PATH}?${q}`, request.url));
  if (!env) return back("error=setup");
  const jar = await cookies();
  const saved = jar.get(MAILBOX_STATE_COOKIE)?.value;
  jar.delete({ name: MAILBOX_STATE_COOKIE, path: MAILBOX_PATH });
  const url = new URL(request.url);
  if (!stateMatches(saved, url.searchParams.get("state"), me.userId)) return back("error=state");
  const code = url.searchParams.get("code");
  if (!code) return back("error=denied");
  if (!(url.searchParams.get("scope") ?? "").includes("gmail.readonly")) return back("error=scope");

  try {
    const account = await exchangeCode(env, code, mailboxRedirectUri(env.appUrl, request.url));
    // A mailbox of the firm's Google Workspace (the Owner's own inbox, support@…), any of them.
    if (accountProblem(account, env.domain, null)) {
      await revoke(account.refreshToken);
      return back("error=account");
    }
    const { error } = await supabaseAdmin().rpc("mailbox_save", {
      p_email: account.email,
      p_token: sealToken(account.refreshToken, parseKey(env.tokenKey), account.email),
      p_by: me.userId,
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error("Mailbox connect failed:", e instanceof Error ? e.message : "unknown error");
    return back("error=google");
  }
  return back("connected=1");
}
