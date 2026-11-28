import { NextResponse, type NextRequest } from "next/server";
import { pollPaymentMail } from "@/lib/payment-proof/poll";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Payment confirmations (vercel.json; docs/ai-desks/payment-proof-clerk/): collects the
 * banks' confirmations of the taxes the firm paid from the payment mailbox, for the
 * Payment Proof Clerk to match and staff to attach. Does nothing until the mailbox is
 * configured (docs/SETUP.md). Runs mornings and afternoons, before the Clerk's runs.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const result = await pollPaymentMail(supabaseAdmin()).catch((e: Error) => ({ error: e.message }));
  return NextResponse.json(result);
}
