"use server";
/**
 * BIR mail (migration 20270110000001): people link it to a client and a return. Each
 * action runs as the signed-in person; the database checks who may (the Owner, or staff
 * keeping the client's books for an AI proposal). The BIR Mail Clerk has no part here.
 */
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireOwner, requireStaff } from "@/lib/auth";
import { ingestBirMail } from "@/lib/bir-mail/ingest";
import { safeNextPath } from "@/lib/safe-redirect";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";

export type BirMailState = { ok?: string; error?: string };

const uuid = z.string().uuid();

/** Accept the BIR Mail Clerk's proposal: links the email to the client (and return) it named. */
export async function acceptBirMailMatchAction(draftId: string, path: string, _: BirMailState, form: FormData): Promise<BirMailState> {
  await requireStaff();
  if (!uuid.safeParse(draftId).success) return { error: "Unknown proposal." };
  const note = String(form.get("note") ?? "").slice(0, 1000);
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("accept_bir_mail_match", { p_draft: draftId, p_note: note || null });
  if (error) return { error: error.message };
  revalidatePath(safeNextPath(path));
  revalidatePath("/app/bir-mail");
  return { ok: "Linked. The email now shows on the client's return." };
}

/**
 * Attach a BIR filing confirmation to the return the Clerk named: links the email and
 * adds its PDF to the return's files (attach_bir_confirmation, migration 20270111000002).
 * The person then prints it with the form and marks the return filed at Filed & paid.
 */
export async function attachBirConfirmationAction(draftId: string, path: string, _: BirMailState, form: FormData): Promise<BirMailState> {
  await requireStaff();
  if (!uuid.safeParse(draftId).success) return { error: "Unknown proposal." };
  const note = String(form.get("note") ?? "").slice(0, 1000);
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("attach_bir_confirmation", { p_draft: draftId, p_note: note || null });
  if (error) return { error: error.message };
  revalidatePath(safeNextPath(path));
  revalidatePath("/app/bir-mail");
  return { ok: "Attached. Print it with the form for the scanned copy, then mark the return filed." };
}

/** The Owner links an email himself. */
export async function linkBirMailAction(mailId: string, _: BirMailState, form: FormData): Promise<BirMailState> {
  await requireOwner();
  const client = String(form.get("client_id") ?? "");
  const filing = String(form.get("filing_id") ?? "");
  if (!uuid.safeParse(mailId).success || !uuid.safeParse(client).success) return { error: "Choose the client." };
  if (filing && !uuid.safeParse(filing).success) return { error: "Choose a return from the list." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("link_bir_mail", { p_mail: mailId, p_client: client, p_filing: filing || null });
  if (error) return { error: error.message };
  revalidatePath(`/app/bir-mail/${mailId}`);
  revalidatePath("/app/bir-mail");
  return { ok: "Linked." };
}

/** The Owner sets aside an email that is no client's (an advisory, a newsletter). */
export async function dismissBirMailAction(mailId: string): Promise<BirMailState> {
  await requireOwner();
  if (!uuid.safeParse(mailId).success) return { error: "Unknown email." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("dismiss_bir_mail", { p_mail: mailId });
  if (error) return { error: error.message };
  revalidatePath(`/app/bir-mail/${mailId}`);
  revalidatePath("/app/bir-mail");
  return { ok: "Set aside." };
}

/** The Owner checks the mailboxes now instead of waiting for the job (every two days). */
export async function checkBirMailboxAction(): Promise<BirMailState> {
  await requireOwner();
  const r = await ingestBirMail(supabaseAdmin()).catch((e: Error) => ({ error: e.message }));
  if ("error" in r) return { error: r.error };
  revalidatePath("/app/bir-mail");
  const failed = r.errors.length ? ` ${r.errors.length} could not be read.` : "";
  const where = ` (${r.mailboxes} mailbox${r.mailboxes === 1 ? "" : "es"} checked)`;
  return { ok: r.stored ? `${r.stored} new BIR email${r.stored === 1 ? "" : "s"}${where}.${failed}` : `No new BIR email${where}.${failed}` };
}
