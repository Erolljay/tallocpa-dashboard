import { NextResponse, type NextRequest } from "next/server";
import { pollEsubmissions } from "@/lib/esubmission/poll";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * eSubmission replies (vercel.json; decision 15): checks the firm's eSubmission mailbox
 * for the BIR's validation reports of the DAT files sent and attaches them to the
 * returns. Staff can also check one return at once from its page. Does nothing until
 * the mailbox is configured (docs/SETUP.md).
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const result = await pollEsubmissions(supabaseAdmin()).catch((e: Error) => ({ error: e.message }));
  return NextResponse.json(result);
}
