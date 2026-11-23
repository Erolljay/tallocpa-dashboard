"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireOwner } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";

export type PaymentSettingsState = { ok?: string; error?: string };

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const QR_TYPES: Record<string, string> = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };
/** Server actions accept up to 1 MB; a payment QR code is far smaller. */
const QR_MAX = 1_000_000;

const accountSchema = z.object({
  kind: z.enum(["bank", "ewallet"], "Choose bank or e-wallet."),
  institution: z.string().min(2, "Enter the bank or e-wallet, e.g. BDO or GCash."),
  account_name: z.string().min(2, "Enter the account name."),
  account_number: z.string().min(4, "Enter the account or mobile number."),
  purpose: z.enum(["fees", "client_tax_funds"]),
  instructions: z.string().max(300, "Keep the instructions under 300 characters."),
});

function refresh() {
  revalidatePath("/app/settings");
  revalidatePath("/portal/statement");
}

/** Uploads a QR code image and returns its storage path, or an error sentence. */
async function uploadQr(file: FormDataEntryValue | null, accountId: string): Promise<{ path: string | null } | { error: string }> {
  if (!(file instanceof File) || file.size === 0) return { path: null };
  const ext = QR_TYPES[file.type];
  if (!ext) return { error: "Upload the QR code as a PNG, JPEG or WebP image." };
  if (file.size > QR_MAX) return { error: "The QR image is over 1 MB. Save it smaller and try again." };
  const supabase = await supabaseServer();
  const path = `${accountId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("payment-qr").upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { error: `Could not store the QR code: ${error.message}` };
  return { path };
}

export async function addPaymentAccountAction(_: PaymentSettingsState, form: FormData): Promise<PaymentSettingsState> {
  const owner = await requireOwner();
  const parsed = accountSchema.safeParse({
    kind: text(form.get("kind")),
    institution: text(form.get("institution")),
    account_name: text(form.get("account_name")),
    account_number: text(form.get("account_number")),
    purpose: text(form.get("purpose")) || "fees",
    instructions: text(form.get("instructions")),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("brand_payment_accounts")
    .insert({ ...parsed.data, instructions: parsed.data.instructions || null, brand_id: owner.staff.brandId })
    .select("id")
    .single();
  if (error) return { error: error.message };
  const qr = await uploadQr(form.get("qr"), data.id);
  if ("error" in qr) {
    refresh();
    return { error: `Account saved, but ${qr.error.charAt(0).toLowerCase()}${qr.error.slice(1)}` };
  }
  if (qr.path) await supabase.from("brand_payment_accounts").update({ qr_path: qr.path }).eq("id", data.id);
  refresh();
  return { ok: "Account added. Clients see it on their statements." };
}

export async function replaceQrAction(accountId: string, oldPath: string | null, _: PaymentSettingsState, form: FormData): Promise<PaymentSettingsState> {
  await requireOwner();
  const qr = await uploadQr(form.get("qr"), accountId);
  if ("error" in qr) return { error: qr.error };
  if (!qr.path) return { error: "Choose the QR image to upload." };
  const supabase = await supabaseServer();
  const { error } = await supabase.from("brand_payment_accounts").update({ qr_path: qr.path }).eq("id", accountId);
  if (error) return { error: error.message };
  if (oldPath) await supabase.storage.from("payment-qr").remove([oldPath]);
  refresh();
  return { ok: "QR code updated." };
}

export async function setAccountActiveAction(accountId: string, active: boolean): Promise<PaymentSettingsState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("brand_payment_accounts").update({ active }).eq("id", accountId);
  if (error) return { error: error.message };
  refresh();
  return { ok: active ? "Shown on statements again." : "Hidden from statements." };
}

export async function setPaymentDaysAction(_: PaymentSettingsState, form: FormData): Promise<PaymentSettingsState> {
  const owner = await requireOwner();
  const days = z.coerce.number().int().min(0).max(31).safeParse(text(form.get("soa_payment_days")));
  if (!days.success) return { error: "Enter a number of days from 0 to 31." };
  const supabase = await supabaseServer();
  const { error } = await supabase.from("brands").update({ soa_payment_days: days.data }).eq("id", owner.staff.brandId);
  if (error) return { error: error.message };
  refresh();
  return { ok: "Saved. New statements use it." };
}
