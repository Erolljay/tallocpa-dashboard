"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";

export type AttachProofState = { ok?: string; error?: string };

const DAY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Staff attach the proof of payment the Payment Proof Clerk suggested: the email's PDF is
 * kept on the return, the references and the date paid are recorded, and the suggestion
 * is accepted (public.attach_payment_proof, as the signed-in staff member; the database
 * checks they may attach files to this client's returns). The return's status does not
 * change: Filed & paid is still recorded in its own step.
 */
export async function attachPaymentProofAction(draftId: string, filingId: string, _: AttachProofState, form: FormData): Promise<AttachProofState> {
  await requireStaff();
  const reference = String(form.get("payment_reference") ?? "").trim().slice(0, 100);
  const birReference = String(form.get("bir_reference") ?? "").trim().slice(0, 100);
  const paidOn = String(form.get("paid_on") ?? "");
  if (!reference) return { error: "Enter the payment reference." };
  if (!DAY.test(paidOn)) return { error: "Enter the date paid." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("attach_payment_proof", { p_draft: draftId, p_reference: reference, p_paid_on: paidOn, p_bir_reference: birReference || null });
  if (error) return { error: error.message };
  revalidatePath(`/app/filings/${filingId}`);
  return { ok: "Attached. Filed & paid now offers this payment's reference and date." };
}
