import { NextResponse, type NextRequest } from "next/server";
import { runFilingGeneration } from "@/lib/filings/run";
import { runPendingOcr } from "@/lib/ocr/run";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Nightly job (vercel.json): creates the next 120 days of filings for every client,
 * then reads any uploaded documents OCR has not read yet (or failed on, up to 3 tries).
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const admin = supabaseAdmin();
  const result = await runFilingGeneration(admin);
  const ocr = await runPendingOcr(admin).catch((e: Error) => ({ error: e.message }));
  return NextResponse.json({ ...result, missingRules: result.missingRules.length, ocr });
}
