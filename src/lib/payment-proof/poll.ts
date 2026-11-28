import "server-only";
/**
 * Collects payment confirmations for the Payment Proof Clerk (migrations
 * 20270110000004_payment_proof_clerk.sql, 20270111000001_connected_mailboxes.sql):
 * searches every mailbox read for payment confirmations (the Owner's connected
 * mailboxes, e.g. the Owner's inbox and support@; and PAYMENT_MAIL_* or the eSubmission
 * mailbox) for recent emails from the listed senders (src/lib/payment-proof/parse.ts),
 * and keeps each new one in public.payment_mail with what was read from it and a PDF in
 * the "filing-files" bucket under _payment-mail/: the email's own PDF attachment, or one
 * written from its text (src/lib/pdf/text.ts). A message that reached two mailboxes is
 * kept once (its Message-ID header). Account numbers are masked before anything is kept.
 * Read only on Gmail: it lists, reads and downloads; it never sends, labels or deletes.
 * Runs with the service role (cron); the AI never runs it.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { MailMessage, MailPart } from "@/lib/esubmission/gmail";
import { getAttachment, getMessage, listMessageIds } from "@/lib/mailboxes/gmail";
import { messageIdKey } from "@/lib/mailboxes/merge";
import { mailboxSources, recordCheck } from "@/lib/mailboxes/sources";
import { textPdf } from "@/lib/pdf/text";
import { gmailQuery, htmlToText, maskAccounts, paymentSender, proofLines, readPaymentMail } from "./parse";

const MAX_PDF_BYTES = 20 * 1024 * 1024;

const flatten = (p: MailPart | undefined): MailPart[] => (p ? [p, ...(p.parts ?? []).flatMap(flatten)] : []);
const header = (m: MailMessage, name: string) => m.payload?.headers?.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value ?? "";
const decode = (data: string) => Buffer.from(data, "base64url").toString("utf8");

/** The message's text: its plain part, else its HTML part as text. */
function messageText(m: MailMessage): string {
  const parts = flatten(m.payload).filter((p) => !p.filename && p.body?.data);
  const plain = parts.filter((p) => p.mimeType === "text/plain").map((p) => decode(p.body!.data!));
  if (plain.length && plain.join("").trim()) return plain.join("\n").replace(/\r/g, "").trim();
  return htmlToText(parts.filter((p) => p.mimeType === "text/html").map((p) => decode(p.body!.data!)).join("\n"));
}

/** How many days back to look: PAYMENT_MAIL_DAYS (default 14, at most 90). */
function lookBackDays(): number {
  const days = Number(process.env.PAYMENT_MAIL_DAYS || 14);
  return Number.isFinite(days) ? Math.min(Math.max(Math.round(days), 1), 90) : 14;
}

export type PaymentPollResult = { mailboxes: number; checked: number; stored: number; skipped: number; errors: string[] } | { error: string };

export async function pollPaymentMail(admin: SupabaseClient): Promise<PaymentPollResult> {
  const { sources, errors } = await mailboxSources(admin, "payment_mail");
  if (sources.length === 0) return errors.length ? { error: errors.join("; ") } : { error: "No mailbox is set up for payment confirmations (Settings → Mailboxes, or docs/SETUP.md)." };
  let checked = 0;
  let stored = 0;
  let skipped = 0;
  for (const source of sources) {
    let failure: string | null = null;
    try {
      const token = await source.signIn();
      const ids = (await listMessageIds(token, gmailQuery(lookBackDays()), 100)).map((m) => m.id);
      checked += ids.length;
      if (ids.length) {
        const { data: known, error: knownError } = await admin.from("payment_mail").select("gmail_message_id").in("gmail_message_id", ids);
        if (knownError) throw new Error(knownError.message);
        const have = new Set((known ?? []).map((k) => k.gmail_message_id as string));
        for (const id of ids.filter((i) => !have.has(i))) {
          try {
            const r = await storeMessage(admin, token, source.email, id);
            if (r === "stored") stored++;
            else skipped++;
          } catch (e) {
            errors.push(`${source.email} ${id}: ${(e as Error).message}`);
          }
        }
      }
    } catch (e) {
      failure = (e as Error).message;
      errors.push(`${source.email}: ${failure}`);
    }
    await recordCheck(admin, source, failure);
  }
  return { mailboxes: sources.length, checked, stored, skipped, errors };
}

async function storeMessage(admin: SupabaseClient, token: string, mailbox: string, id: string): Promise<"stored" | "skipped"> {
  const m = await getMessage(token, id);
  const from = header(m, "From");
  const subject = header(m, "Subject");
  const sender = paymentSender(from, subject);
  if (!sender) return "skipped";
  const rfc = messageIdKey(header(m, "Message-ID"));
  if (rfc) {
    const { data: dup, error } = await admin.from("payment_mail").select("id").eq("rfc822_message_id", rfc).limit(1);
    if (error) throw new Error(error.message);
    if (dup?.length) return "skipped";
  }
  const receivedAt = new Date(Number(m.internalDate ?? Date.now())).toISOString();
  const text = maskAccounts(messageText(m)).slice(0, 20000);
  const facts = readPaymentMail({ subject, text, receivedAt });
  // The email's own PDF when it has one; else one written from its text.
  const pdfPart = flatten(m.payload).find((p) => p.body?.attachmentId && (p.mimeType === "application/pdf" || /\.pdf$/i.test(p.filename ?? "")));
  let pdf: Buffer;
  let source: "attachment" | "rendered";
  let name: string;
  if (pdfPart && (pdfPart.body?.size ?? 0) <= MAX_PDF_BYTES) {
    pdf = await getAttachment(token, id, pdfPart.body!.attachmentId!);
    source = "attachment";
    name = pdfPart.filename || "proof-of-payment.pdf";
  } else {
    pdf = textPdf(proofLines({ channel: sender.channel, sender: from, receivedAt, subject, facts, text }), `Proof of payment ${facts.bank_reference ?? ""}`.trim());
    source = "rendered";
    name = `proof-of-payment-${(facts.bank_reference ?? facts.bir_reference ?? id).replace(/[^A-Za-z0-9-]/g, "")}.pdf`;
  }
  if (pdf.length === 0) throw new Error("empty PDF");
  const path = `_payment-mail/${id.replace(/[^A-Za-z0-9_-]/g, "")}.pdf`;
  const up = await admin.storage.from("filing-files").upload(path, pdf, { contentType: "application/pdf", upsert: true });
  if (up.error) throw new Error(up.error.message);
  const { error } = await admin.from("payment_mail").insert({
    gmail_message_id: id,
    rfc822_message_id: rfc,
    mailbox,
    received_at: receivedAt,
    sender: from.slice(0, 300),
    subject: subject.slice(0, 500),
    channel: sender.channel,
    body_text: text,
    extracted: facts,
    pdf_path: path,
    pdf_name: name.slice(0, 200),
    pdf_size: pdf.length,
    pdf_source: source,
  });
  if (error) throw new Error(error.message);
  return "stored";
}
