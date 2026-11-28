import "server-only";
/**
 * Brings the BIR's emails into the app (migrations 20270110000001, 20270111000001/2):
 * from every mailbox read for BIR mail (the Owner's connected mailboxes, e.g. the Owner's
 * inbox and support@, and the eSubmission mailbox), every message from a bir.gov.ph
 * address received in the last `days` days that is not already stored and is not a reply
 * in the thread of a DAT send (those the eSubmission poll attaches to their return). A
 * message that reached two mailboxes is kept once (its Message-ID header). Stores its
 * text, the app's guess of what it is, the TINs it names, its PDF and image attachments
 * (bucket "bir-mail"), and one PDF to attach to a return (bucket "filing-files",
 * _bir-mail/<id>.pdf): the email's own PDF, else one written from its text. Unlinked, for
 * the BIR Mail Clerk to propose a match and a person to link. Reads the mailboxes only.
 * Runs with the service role from its cron job (every two days) or the Owner's "Check
 * the mailbox now".
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { headerOf, partsOf, textOf } from "@/lib/esubmission/gmail";
import { getAttachment, getMessage, listMessageIds } from "@/lib/mailboxes/gmail";
import { messageIdKey } from "@/lib/mailboxes/merge";
import { mailboxSources, recordCheck } from "@/lib/mailboxes/sources";
import { textPdf } from "@/lib/pdf/text";
import { classifyBirMail, findTins, isBirSender } from "./classify";
import { confirmationLines, readFilingConfirmation } from "./confirmation";

export type IngestResult = { mailboxes: number; seen: number; stored: number; errors: string[] } | { error: string };

const KEEP = /^(application\/pdf|image\/(jpeg|png|webp))$/i;
const MAX_ATTACHMENT = 20 * 1024 * 1024;
const MAX_ATTACHMENTS = 10;

/** `admin` is a service-role client. */
export async function ingestBirMail(admin: SupabaseClient, days = 14): Promise<IngestResult> {
  const { sources, errors } = await mailboxSources(admin, "bir_mail");
  if (sources.length === 0) return errors.length ? { error: errors.join("; ") } : { error: "No mailbox is set up for BIR mail (Settings → Mailboxes, or the eSubmission mailbox)." };

  let seen = 0;
  let added = 0;
  for (const source of sources) {
    let failure: string | null = null;
    try {
      const token = await source.signIn();
      const found = await listMessageIds(token, `from:bir.gov.ph -in:sent newer_than:${Math.min(Math.max(days, 1), 60)}d`, 100);
      seen += found.length;
      if (found.length === 0) {
        await recordCheck(admin, source, null);
        continue;
      }
      const ids = found.map((m) => m.id);
      const threads = [...new Set(found.map((m) => m.threadId))];
      const [{ data: known, error: e1 }, { data: sends, error: e2 }] = await Promise.all([
        admin.from("bir_mail").select("gmail_message_id").in("gmail_message_id", ids),
        admin.from("esubmissions").select("gmail_thread_id").in("gmail_thread_id", threads),
      ]);
      if (e1 || e2) throw new Error((e1 ?? e2)!.message);
      const stored = new Set((known ?? []).map((r) => r.gmail_message_id as string));
      const sendThreads = new Set((sends ?? []).map((r) => r.gmail_thread_id as string));

      for (const { id, threadId } of found) {
        if (stored.has(id) || sendThreads.has(threadId)) continue;
        try {
          if (await storeMessage(admin, token, source.email, id, threadId)) added += 1;
        } catch (e) {
          errors.push(`${source.email} ${id}: ${(e as Error).message}`);
        }
      }
    } catch (e) {
      failure = (e as Error).message;
      errors.push(`${source.email}: ${failure}`);
    }
    await recordCheck(admin, source, failure);
  }
  return { mailboxes: sources.length, seen, stored: added, errors };
}

/** Stores one message; false when it is not the BIR's or another mailbox already brought it in. */
async function storeMessage(admin: SupabaseClient, token: string, mailbox: string, id: string, threadId: string): Promise<boolean> {
  const m = await getMessage(token, id);
  const from = headerOf(m, "From");
  if (!isBirSender(from)) return false;
  const rfc = messageIdKey(headerOf(m, "Message-ID"));
  if (rfc) {
    const { data: dup, error } = await admin.from("bir_mail").select("id").eq("rfc822_message_id", rfc).limit(1);
    if (error) throw new Error(error.message);
    if (dup?.length) return false;
  }
  const subject = headerOf(m, "Subject").slice(0, 500);
  const text = textOf(m).slice(0, 20000);
  const { kind, noticeType } = classifyBirMail(subject, text);
  const mailId = crypto.randomUUID();
  const received = m.internalDate ? new Date(Number(m.internalDate)) : new Date();

  const attachments: { path: string; file_name: string; mime_type: string; size: number }[] = [];
  let ownPdf: { bytes: Buffer; name: string } | null = null;
  for (const p of partsOf(m.payload)) {
    if (attachments.length >= MAX_ATTACHMENTS) break;
    if (!p.filename || !p.body?.attachmentId || !KEEP.test(p.mimeType ?? "") || (p.body.size ?? 0) > MAX_ATTACHMENT) continue;
    const bytes = await getAttachment(token, id, p.body.attachmentId);
    if (bytes.length === 0) continue;
    const name = p.filename.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 120) || "attachment";
    const path = `${mailId}/${attachments.length + 1}-${name}`;
    const up = await admin.storage.from("bir-mail").upload(path, bytes, { contentType: p.mimeType!, upsert: false });
    if (up.error) throw new Error(`Storing ${name}: ${up.error.message}`);
    attachments.push({ path, file_name: p.filename.slice(0, 200), mime_type: p.mimeType!.toLowerCase(), size: bytes.length });
    if (!ownPdf && /pdf$/i.test(p.mimeType ?? "")) ownPdf = { bytes, name: p.filename };
  }

  // One PDF to attach to the return: the BIR's own, else one written from the email.
  const facts = kind === "filing_confirmation" ? readFilingConfirmation(subject, text) : null;
  const pdf = ownPdf?.bytes ?? textPdf(confirmationLines({ from, receivedAt: received.toISOString(), subject, text, kind, facts }), kind === "filing_confirmation" ? "BIR filing confirmation" : "BIR email");
  const pdfName = (ownPdf?.name ?? `bir-${kind === "filing_confirmation" ? "confirmation" : "email"}${facts?.form ? `-${facts.form}` : ""}${facts?.period_end ? `-${facts.period_end.slice(0, 7)}` : ""}.pdf`).replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 200);
  const pdfPath = `_bir-mail/${mailId}.pdf`;
  const up = await admin.storage.from("filing-files").upload(pdfPath, pdf, { contentType: "application/pdf", upsert: false });
  if (up.error) throw new Error(`Storing the PDF: ${up.error.message}`);

  const ins = await admin.from("bir_mail").insert({
    id: mailId,
    gmail_message_id: id,
    gmail_thread_id: threadId,
    rfc822_message_id: rfc,
    mailbox,
    received_at: received.toISOString(),
    from_address: from.slice(0, 300),
    subject,
    body_text: text,
    kind,
    notice_type: noticeType,
    tins: findTins(`${subject}\n${text}`).slice(0, 20),
    attachments,
    pdf_path: pdfPath,
    pdf_name: pdfName,
    pdf_size: pdf.length,
  });
  if (ins.error) throw new Error(ins.error.message);
  return true;
}
