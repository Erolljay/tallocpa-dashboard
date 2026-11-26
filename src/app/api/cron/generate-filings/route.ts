import { NextResponse, type NextRequest } from "next/server";
import { runActingDigest } from "@/lib/acting/run";
import { runDocumentCycles } from "@/lib/cycle/run";
import { manilaToday, runFilingGeneration } from "@/lib/filings/run";
import { runPendingOcr } from "@/lib/ocr/run";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Nightly job (vercel.json, 02:00 Manila): creates the next 120 days of filings for every
 * client and the month's SSS, PhilHealth and Pag-IBIG remittances, runs the monthly document cycle (requests, reminders, missed cutoffs,
 * closing months, spec §3.10), reads any uploaded documents OCR has not read yet (or failed
 * on, up to 3 tries), then emails the Owner the acting approver's approvals of the day before (Q58).
 * It issues no statements: the Owner runs billing from Collections, Ready to bill (docs/REWORK.md, 16c).
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const admin = supabaseAdmin();
  const result = await runFilingGeneration(admin);
  const remittances = await admin.rpc("generate_contribution_remittances", {}).then((r) => (r.error ? { error: r.error.message } : { remittances: r.data as number }));
  const cycle = await runDocumentCycles(admin, manilaToday(), new URL(request.url).origin).catch((e: Error) => ({ error: e.message }));
  const ocr = await runPendingOcr(admin).catch((e: Error) => ({ error: e.message }));
  const acting = await runActingDigest(admin, manilaToday(), new URL(request.url).origin).catch((e: Error) => ({ error: e.message }));
  return NextResponse.json({ ...result, missingRules: result.missingRules.length, remittances, cycle, ocr, acting });
}
