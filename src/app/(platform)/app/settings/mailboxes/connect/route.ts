import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { requireOwner } from "@/lib/auth";
import { newState } from "@/lib/calendar/oauth-state";
import { googleCalendarEnv } from "@/lib/env";
import { mailboxAuthUrl } from "@/lib/mailboxes/gmail";
import { MAILBOX_PATH, MAILBOX_STATE_COOKIE, mailboxRedirectUri } from "@/lib/mailboxes/oauth-state";

/** Starts connecting a Gmail mailbox read-only (Owner only; migration 20270111000001). */
export async function GET(request: NextRequest) {
  const me = await requireOwner();
  const env = googleCalendarEnv();
  if (!env) return NextResponse.redirect(new URL(`${MAILBOX_PATH}?error=setup`, request.url));
  const { state, cookie } = newState(me.userId);
  (await cookies()).set(MAILBOX_STATE_COOKIE, cookie, { httpOnly: true, secure: true, sameSite: "lax", path: MAILBOX_PATH, maxAge: 600 });
  return NextResponse.redirect(mailboxAuthUrl(env, mailboxRedirectUri(env.appUrl, request.url), state));
}
