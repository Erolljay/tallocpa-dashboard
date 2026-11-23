import { NextResponse, type NextRequest } from "next/server";
import { runDocumentCycles } from "@/lib/cycle/run";
import { manilaToday, runFilingGeneration } from "@/lib/filings/run";
import { runPendingOcr } from "@/lib/ocr/run";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Nightly job (vercel.json, 02:00 Manila): creates the next 120 days of filings for every
 * client, runs the day's billing for clients billed on this day of the month (statements of
 * account, spec §3.9), runs the monthly document cycle (requests, reminders, missed cutoffs,
 * closing months, spec §3.10), then reads any uploaded documents OCR has not read yet (or failed
 * on, up to 3 tries).
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const admin = supabaseAdmin();
  const result = await runFilingGeneration(admin);
  const billing = await admin
    .rpc("run_scheduled_billing", { p_billing_date: manilaToday() })
    .then(({ data, error }) => (error ? { error: error.message } : { statements: Number(data ?? 0) }));
  const cycle = await runDocumentCycles(admin, manilaToday(), new URL(request.url).origin).catch((e: Error) => ({ error: e.message }));
  const ocr = await runPendingOcr(admin).catch((e: Error) => ({ error: e.message }));
  return NextResponse.json({ ...result, missingRules: result.missingRules.length, billing, cycle, ocr });
}
