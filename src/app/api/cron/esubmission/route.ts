import { NextResponse, type NextRequest } from "next/server";
import { pollEsubmissions } from "@/lib/esubmission/poll";
import { pollPaymentMail } from "@/lib/payment-proof/poll";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * eSubmission replies (vercel.json; decision 15): checks the firm's eSubmission mailbox
 * daily for the BIR's validation reports of the DAT files sent and attaches them to the
 * returns. Staff can also check one return at once from its page. Does nothing until
 * the mailbox is configured (docs/SETUP.md). Then checks the payment mailboxes a second
 * time in the day (one cron entry per path on Vercel's plan; /api/cron/payment-mail is
 * the morning run). The BIR's other emails have their own job (/api/cron/bir-mail).
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const admin = supabaseAdmin();
  const result = await pollEsubmissions(admin).catch((e: Error) => ({ error: e.message }));
  const paymentMail = await pollPaymentMail(admin).catch((e: Error) => ({ error: e.message }));
  return NextResponse.json({ ...result, payment_mail: paymentMail });
}
