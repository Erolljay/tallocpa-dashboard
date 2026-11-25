import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { requireStaff } from "@/lib/auth";
import { newState, redirectUri, STATE_COOKIE } from "@/lib/calendar/oauth-state";
import { googleCalendarEnv } from "@/lib/env";
import { authUrl } from "@/lib/google/calendar";

/** Starts connecting the signed-in staff member's Google Calendar (decision 22). */
export async function GET(request: NextRequest) {
  const me = await requireStaff();
  const env = googleCalendarEnv();
  if (!env) return NextResponse.redirect(new URL("/app/calendar?error=setup", request.url));
  const { state, cookie } = newState(me.userId);
  (await cookies()).set(STATE_COOKIE, cookie, { httpOnly: true, secure: true, sameSite: "lax", path: "/app/calendar", maxAge: 600 });
  return NextResponse.redirect(authUrl(env, redirectUri(env.appUrl, request.url), state, me.email));
}
