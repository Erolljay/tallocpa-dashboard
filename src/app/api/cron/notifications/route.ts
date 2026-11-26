import { NextResponse, type NextRequest } from "next/server";
import { siteOrigin } from "@/lib/email/brand";
import { dispatchNotificationEmails } from "@/lib/notifications/dispatch";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Backstop for notification emails: sends up to 100 pending ones. Most are sent right
 * after the request that queued them (scheduleNotificationEmails); this catches the rest.
 * Not in vercel.json (Hobby plans run cron daily only): call it every minute from a
 * Supabase Cron HTTP job with `Authorization: Bearer <CRON_SECRET>`.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const origin = siteOrigin() ?? new URL(request.url).origin;
  const result = await Promise.resolve()
    .then(() => dispatchNotificationEmails(supabaseAdmin(), origin, 100))
    .catch((e: Error) => ({ error: e.message }));
  return NextResponse.json(result);
}
