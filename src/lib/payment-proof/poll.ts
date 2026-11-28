import "server-only";
/**
 * Collects payment confirmations for the Payment Proof Clerk (migration
 * 20270110000004_payment_proof_clerk.sql): searches the payment mailbox for recent
 * emails from the listed senders (src/lib/payment-proof/parse.ts), and keeps each new
 * one in public.payment_mail with what was read from it and a PDF in the "filing-files"
 * bucket under _payment-mail/: the email's own PDF attachment, or one written from its
 * text (src/lib/payment-proof/pdf.ts). Account numbers are masked before anything is
 * kept. Read only on Gmail: it lists, reads and downloads; it never sends, labels or
 * deletes. Runs with the service role (cron); the AI never runs it.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { paymentMailEnv, type PaymentMailEnv } from "@/lib/env";
import { gmailQuery, htmlToText, maskAccounts, paymentSender, proofLines, readPaymentMail } from "./parse";
import { textPdf } from "./pdf";

const API = "https://gmail.googleapis.com/gmail/v1/users/me";
const MAX_PDF_BYTES = 20 * 1024 * 1024;

interface Part {
  mimeType?: string;
  filename?: string;
  headers?: { name: string; value: string }[];
  body?: { data?: string; attachmentId?: string; size?: number };
  parts?: Part[];
}
interface Message {
  id: string;
  internalDate?: string;
  payload?: Part;
}

async function accessToken(env: PaymentMailEnv): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: env.clientId, client_secret: env.clientSecret, refresh_token: env.refreshToken, grant_type: "refresh_token" }),
    cache: "no-store",
  });
  const body = (await res.json().catch(() => ({}))) as { access_token?: string; error?: string; error_description?: string };
  if (!res.ok || !body.access_token) throw new Error(`Google sign-in for the payment mailbox failed: ${body.error_description ?? body.error ?? res.status}`);
  return body.access_token;
}

async function get<T>(token: string, path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  const body = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(`Gmail: ${body.error?.message ?? res.status}`);
  return body;
}

const flatten = (p: Part | undefined): Part[] => (p ? [p, ...(p.parts ?? []).flatMap(flatten)] : []);
const header = (m: Message, name: string) => m.payload?.headers?.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value ?? "";
const decode = (data: string) => Buffer.from(data, "base64url").toString("utf8");

/** The message's text: its plain part, else its HTML part as text. */
function messageText(m: Message): string {
  const parts = flatten(m.payload).filter((p) => !p.filename && p.body?.data);
  const plain = parts.filter((p) => p.mimeType === "text/plain").map((p) => decode(p.body!.data!));
  if (plain.length && plain.join("").trim()) return plain.join("\n").replace(/\r/g, "").trim();
  return htmlToText(parts.filter((p) => p.mimeType === "text/html").map((p) => decode(p.body!.data!)).join("\n"));
}

export type PaymentPollResult = { checked: number; stored: number; skipped: number; errors: string[] } | { error: string };

export async function pollPaymentMail(admin: SupabaseClient): Promise<PaymentPollResult> {
  const env = paymentMailEnv();
  if (!env) return { error: "The payment mailbox is not set up (docs/SETUP.md)." };
  const token = await accessToken(env);
  const list = await get<{ messages?: { id: string }[] }>(token, `/messages?maxResults=100&q=${encodeURIComponent(gmailQuery(env.days))}`);
  const ids = (list.messages ?? []).map((m) => m.id);
  if (ids.length === 0) return { checked: 0, stored: 0, skipped: 0, errors: [] };
  const { data: known, error: knownError } = await admin.from("payment_mail").select("gmail_message_id").in("gmail_message_id", ids);
  if (knownError) return { error: knownError.message };
  const have = new Set((known ?? []).map((k) => k.gmail_message_id as string));
  let stored = 0;
  let skipped = 0;
  const errors: string[] = [];
  for (const id of ids.filter((i) => !have.has(i))) {
    try {
      const m = await get<Message>(token, `/messages/${encodeURIComponent(id)}?format=full`);
      const from = header(m, "From");
      const subject = header(m, "Subject");
      const sender = paymentSender(from, subject);
      if (!sender) {
        skipped++;
        continue;
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
        const a = await get<{ data?: string }>(token, `/messages/${encodeURIComponent(id)}/attachments/${encodeURIComponent(pdfPart.body!.attachmentId!)}`);
        pdf = Buffer.from(a.data ?? "", "base64url");
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
        mailbox: env.mailbox,
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
      stored++;
    } catch (e) {
      errors.push(`${id}: ${(e as Error).message}`);
    }
  }
  return { checked: ids.length, stored, skipped, errors };
}
