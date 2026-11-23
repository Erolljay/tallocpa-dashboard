import { NextResponse, type NextRequest } from "next/server";
import { runFilingGeneration } from "@/lib/filings/run";
import { supabaseAdmin } from "@/lib/supabase/admin";

/** Nightly job (vercel.json): creates the next 120 days of filings for every client. */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const result = await runFilingGeneration(supabaseAdmin());
  return NextResponse.json({ ...result, missingRules: result.missingRules.length });
}
