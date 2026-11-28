import "server-only";
/**
 * Brings the BIR's emails from the firm's eSubmission mailbox into the app (migration
 * 20270110000001): every message from a bir.gov.ph address received in the last
 * `days` days that is not already stored and is not a reply in the thread of a DAT send
 * (those the eSubmission poll attaches to their return). Stores its text, the app's
 * guess of what it is, the TINs it names, and its PDF and image attachments, unlinked,
 * for the BIR Mail Clerk to propose a match and a person to link. Reads the mailbox only.
 * Runs with the service role from the eSubmission cron job.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { esubmissionMailEnv } from "@/lib/env";
import { headerOf, mailboxToken, partsOf, readAttachment, readMessage, searchMessageIds, textOf } from "@/lib/esubmission/gmail";
import { classifyBirMail, findTins, isBirSender } from "./classify";

export type IngestResult = { seen: number; stored: number; errors: string[] } | { error: string };

const KEEP = /^(application\/pdf|image\/(jpeg|png|webp))$/i;
const MAX_ATTACHMENT = 20 * 1024 * 1024;
const MAX_ATTACHMENTS = 10;

/** `admin` is a service-role client. */
export async function ingestBirMail(admin: SupabaseClient, days = 14): Promise<IngestResult> {
  const env = esubmissionMailEnv();
  if (!env) return { error: "The eSubmission mailbox is not configured." };
  const token = await mailboxToken(env);
  const found = await searchMessageIds(env, token, `from:bir.gov.ph -in:sent newer_than:${Math.min(Math.max(days, 1), 60)}d`, 100);
  if (found.length === 0) return { seen: 0, stored: 0, errors: [] };

  const ids = found.map((m) => m.id);
  const threads = [...new Set(found.map((m) => m.threadId))];
  const [{ data: known, error: e1 }, { data: sends, error: e2 }] = await Promise.all([
    admin.from("bir_mail").select("gmail_message_id").in("gmail_message_id", ids),
    admin.from("esubmissions").select("gmail_thread_id").in("gmail_thread_id", threads),
  ]);
  if (e1 || e2) return { error: (e1 ?? e2)!.message };
  const stored = new Set((known ?? []).map((r) => r.gmail_message_id as string));
  const sendThreads = new Set((sends ?? []).map((r) => r.gmail_thread_id as string));

  let added = 0;
  const errors: string[] = [];
  for (const { id, threadId } of found) {
    if (stored.has(id) || sendThreads.has(threadId)) continue;
    try {
      const m = await readMessage(env, token, id);
      const from = headerOf(m, "From");
      if (!isBirSender(from)) continue;
      const subject = headerOf(m, "Subject").slice(0, 500);
      const text = textOf(m).slice(0, 20000);
      const { kind, noticeType } = classifyBirMail(subject, text);
      const mailId = crypto.randomUUID();
      const attachments: { path: string; file_name: string; mime_type: string; size: number }[] = [];
      for (const p of partsOf(m.payload)) {
        if (attachments.length >= MAX_ATTACHMENTS) break;
        if (!p.filename || !p.body?.attachmentId || !KEEP.test(p.mimeType ?? "") || (p.body.size ?? 0) > MAX_ATTACHMENT) continue;
        const bytes = await readAttachment(env, token, id, p.body.attachmentId);
        if (bytes.length === 0) continue;
        const name = p.filename.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 120) || "attachment";
        const path = `${mailId}/${attachments.length + 1}-${name}`;
        const up = await admin.storage.from("bir-mail").upload(path, bytes, { contentType: p.mimeType!, upsert: false });
        if (up.error) throw new Error(`Storing ${name}: ${up.error.message}`);
        attachments.push({ path, file_name: p.filename.slice(0, 200), mime_type: p.mimeType!.toLowerCase(), size: bytes.length });
      }
      const received = m.internalDate ? new Date(Number(m.internalDate)) : new Date();
      const ins = await admin.from("bir_mail").insert({
        id: mailId,
        gmail_message_id: id,
        gmail_thread_id: threadId,
        received_at: received.toISOString(),
        from_address: from.slice(0, 300),
        subject,
        body_text: text,
        kind,
        notice_type: noticeType,
        tins: findTins(`${subject}\n${text}`).slice(0, 20),
        attachments,
      });
      if (ins.error) throw new Error(ins.error.message);
      added += 1;
    } catch (e) {
      errors.push(`${id}: ${(e as Error).message}`);
    }
  }
  return { seen: found.length, stored: added, errors };
}
