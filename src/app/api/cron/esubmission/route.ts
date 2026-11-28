import { NextResponse, type NextRequest } from "next/server";
import { ingestBirMail } from "@/lib/bir-mail/ingest";
import { pollEsubmissions } from "@/lib/esubmission/poll";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * eSubmission replies (vercel.json; decision 15): checks the firm's eSubmission mailbox
 * for the BIR's validation reports of the DAT files sent and attaches them to the
 * returns. Staff can also check one return at once from its page. Does nothing until
 * the mailbox is configured (docs/SETUP.md). Then stores the BIR's other emails (filing
 * confirmations, notices) unlinked, for the BIR Mail Clerk and the Owner (src/lib/bir-mail).
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const admin = supabaseAdmin();
  const result = await pollEsubmissions(admin).catch((e: Error) => ({ error: e.message }));
  const birMail = await ingestBirMail(admin).catch((e: Error) => ({ error: e.message }));
  return NextResponse.json({ ...result, bir_mail: birMail });
}
