"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getIdentity, requireOwner } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";

export type ProofState = { ok?: string; error?: string };
export type StartProof = { path: string; token: string } | { error: string };

const MAX_BYTES = 10 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heif",
  "application/pdf": "pdf",
};
const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a date.");
const amount = z.coerce.number("Enter an amount.").positive("Enter an amount above zero.").multipleOf(0.01, "Use at most two decimals.");

function refresh(soaId: string) {
  revalidatePath("/portal/billing", "layout");
  revalidatePath("/app/collections", "layout");
  revalidatePath(`/app/collections/statements/${soaId}`);
}

/**
 * Step 1: a one-time link the browser sends the proof to, straight to storage
 * (no server size limit). Storage policies allow only the Owner and the
 * statement's own client users to add files under its folder.
 */
export async function startProofUpload(input: { soaId: string; mimeType: string; size: number }): Promise<StartProof> {
  await getIdentity();
  const ext = TYPES[input.mimeType];
  if (!ext) return { error: "Upload a photo or screenshot (JPEG, PNG, HEIC) or a PDF." };
  if (input.size > MAX_BYTES) return { error: "The file is over 10 MB. Send a smaller screenshot." };
  const supabase = await supabaseServer();
  const { data: soa } = await supabase.from("soas").select("id, client_id").eq("id", input.soaId).maybeSingle();
  if (!soa) return { error: "Statement not found." };
  const path = `${soa.client_id}/${soa.id}/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage.from("payment-proofs").createSignedUploadUrl(path);
  if (error || !data) return { error: `Could not start the upload: ${error?.message ?? "no link"}` };
  return { path: data.path, token: data.token };
}

const submitSchema = z.object({
  soaId: z.string().uuid(),
  path: z.string().min(1),
  fileName: z.string(),
  mimeType: z.string(),
  amount,
  paidOn: date,
  accountId: z.string().uuid().nullable(),
  method: z.enum(["transfer", "check", "deposit"], "Choose how you paid."),
  reference: z.string().max(100, "Keep the reference under 100 characters."),
});

/** Step 2: after the file is in storage, record the proof. The statement then reads For verification. */
export async function submitProof(input: z.input<typeof submitSchema>): Promise<ProofState> {
  await getIdentity();
  const parsed = submitSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const v = parsed.data;
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("submit_payment_proof", {
    p_soa: v.soaId,
    p_storage_path: v.path,
    p_file_name: v.fileName,
    p_mime_type: v.mimeType,
    p_amount: v.amount,
    p_paid_on: v.paidOn,
    p_payment_account: v.accountId,
    p_reference: v.reference,
    p_method: v.method,
  });
  if (error) return { error: error.message };
  refresh(v.soaId);
  return { ok: "Thank you. We received your proof of payment and will verify it." };
}

/**
 * The Owner confirms the money arrived: it is recorded as a deposit applied to the
 * items the Owner ticked (oldest first); the rest is the client's credit.
 */
export async function verifyProofAction(soaId: string, proofId: string, _: ProofState, form: FormData): Promise<ProofState> {
  await requireOwner();
  const parsed = z
    .object({ received_on: date, amount, bir: z.string().max(40) })
    .safeParse({ received_on: text(form.get("received_on")), amount: text(form.get("amount")) || undefined, bir: text(form.get("bir_invoice_number")) });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("verify_payment_proof", {
    p_proof: proofId,
    p_received_on: parsed.data.received_on,
    p_amount: parsed.data.amount,
    p_bir_invoice_number: parsed.data.bir || null,
    p_due_ids: form.getAll("due_ids").map(String),
  });
  if (error) return { error: error.message };
  refresh(soaId);
  return { ok: "Verified. The payment is applied to the ticked items." };
}

export async function rejectProofAction(soaId: string, proofId: string, _: ProofState, form: FormData): Promise<ProofState> {
  await requireOwner();
  const reason = text(form.get("reason"));
  if (!reason) return { error: "Say why the proof is rejected. The client sees the reason." };
  if (reason.length > 500) return { error: "Keep the reason under 500 characters." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("reject_payment_proof", { p_proof: proofId, p_reason: reason });
  if (error) return { error: error.message };
  refresh(soaId);
  return { ok: "Rejected. The client sees the reason." };
}
