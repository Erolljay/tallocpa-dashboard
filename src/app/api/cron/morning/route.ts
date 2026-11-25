import { NextResponse, type NextRequest } from "next/server";
import { runMorningEmail } from "@/lib/deadlines/run";
import { manilaToday } from "@/lib/filings/run";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Morning job (vercel.json, 07:00 Manila = 23:00 UTC; Owner's decision 5): emails the
 * Owner the critical and overdue filings and the coverage gaps, and each preparer and
 * reviewer their own filings at risk. Sends at most once per Manila day.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const result = await runMorningEmail(supabaseAdmin(), manilaToday(), new URL(request.url).origin).catch((e: Error) => ({ error: e.message }));
  return NextResponse.json(result);
}
