import { NextResponse, type NextRequest } from "next/server";
import { runMorningEmail } from "@/lib/deadlines/run";
import { siteOrigin } from "@/lib/email/brand";
import { manilaToday } from "@/lib/filings/run";
import { dispatchNotificationEmails } from "@/lib/notifications/dispatch";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Morning job (vercel.json, 07:00 Manila = 23:00 UTC; Owner's decision 5): emails the
 * Owner the critical and overdue filings and the coverage gaps, and each preparer and
 * reviewer their own filings at risk. Sends at most once per Manila day. Then sends any
 * notification emails still pending (the daily backstop; /api/cron/notifications is the frequent one).
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const origin = new URL(request.url).origin;
  const result = await runMorningEmail(supabaseAdmin(), manilaToday(), origin).catch((e: Error) => ({ error: e.message }));
  const notifications = await Promise.resolve()
    .then(() => dispatchNotificationEmails(supabaseAdmin(), siteOrigin() ?? origin, 100))
    .catch((e: Error) => ({ error: e.message }));
  return NextResponse.json({ ...result, notifications });
}
