import { NextResponse, type NextRequest } from "next/server";
import { ingestBirMail } from "@/lib/bir-mail/ingest";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * BIR mail (vercel.json, every two days at 12:15 PM Manila; the Owner: "once every two
 * days will do"): stores the BIR's emails (filing confirmations, notices) from every
 * mailbox read for BIR mail, unlinked, for the BIR Mail Clerk and the Owner
 * (src/lib/bir-mail). The Owner can also check at once from the BIR mail page.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const result = await ingestBirMail(supabaseAdmin()).catch((e: Error) => ({ error: e.message }));
  return NextResponse.json(result);
}
