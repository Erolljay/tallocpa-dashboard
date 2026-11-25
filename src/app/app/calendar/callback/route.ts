import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { requireStaff } from "@/lib/auth";
import { accountProblem, redirectUri, STATE_COOKIE, stateMatches } from "@/lib/calendar/oauth-state";
import { googleCalendarEnv } from "@/lib/env";
import { exchangeCode, revoke } from "@/lib/google/calendar";
import { parseKey, sealToken } from "@/lib/google/crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

/** Google's return from the consent screen: checks the state and the account, then keeps the encrypted refresh token. */
export async function GET(request: NextRequest) {
  const me = await requireStaff();
  const env = googleCalendarEnv();
  const back = (q: string) => NextResponse.redirect(new URL(`/app/calendar?${q}`, request.url));
  if (!env) return back("error=setup");
  const jar = await cookies();
  const saved = jar.get(STATE_COOKIE)?.value;
  jar.delete({ name: STATE_COOKIE, path: "/app/calendar" });
  const url = new URL(request.url);
  if (!stateMatches(saved, url.searchParams.get("state"), me.userId)) return back("error=state");
  const code = url.searchParams.get("code");
  if (!code) return back("error=denied");

  try {
    const account = await exchangeCode(env, code, redirectUri(env.appUrl, request.url));
    const problem = accountProblem(account, env.domain, me.email);
    if (problem) {
      await revoke(account.refreshToken);
      return back("error=account");
    }
    const { error } = await supabaseAdmin().rpc("calendar_link_save", { p_user: me.userId, p_email: account.email, p_token: sealToken(account.refreshToken, parseKey(env.tokenKey), me.userId) });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error("Calendar connect failed:", e instanceof Error ? e.message : e);
    return back("error=google");
  }
  return back("connected=1");
}
