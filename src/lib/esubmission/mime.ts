/**
 * eSubmission (docs/REWORK.md, decision 15): the pure parts. Building the email that
 * carries a return's DAT files to the BIR, and reading the BIR's reply. No network.
 */

export interface MailAttachment {
  fileName: string;
  contentType: string;
  /** File contents as text (DAT files are plain text). */
  body: string;
}

export interface OutgoingMail {
  from: string;
  to: string;
  subject: string;
  text: string;
  attachments: MailAttachment[];
}

const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64");
/** Base64 in lines of 76 characters, as MIME wants. */
const wrap = (s: string) => s.replace(/.{1,76}/g, "$&\r\n").trimEnd();
/** A header value: plain when ASCII, else RFC 2047 encoded-word. */
const header = (s: string) => (/^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${b64(s)}?=`);
/** A file name safe for a Content-Disposition parameter. */
const safeName = (s: string) => s.replace(/[^A-Za-z0-9._-]/g, "_");

/** The whole message as RFC 2822 text (multipart/mixed), CRLF line ends. `boundary` is fixed in tests. */
export function buildMime(mail: OutgoingMail, boundary = `tallo-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`): string {
  const lines = [
    `From: ${mail.from}`,
    `To: ${mail.to}`,
    `Subject: ${header(mail.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    wrap(b64(mail.text)),
  ];
  for (const a of mail.attachments) {
    const name = safeName(a.fileName);
    lines.push(
      `--${boundary}`,
      `Content-Type: ${a.contentType || "application/octet-stream"}; name="${name}"`,
      `Content-Disposition: attachment; filename="${name}"`,
      "Content-Transfer-Encoding: base64",
      "",
      wrap(b64(a.body)),
    );
  }
  lines.push(`--${boundary}--`, "");
  return lines.join("\r\n");
}

/** Gmail's `raw`: the message in URL-safe base64 without padding. */
export const toRaw = (mime: string) => Buffer.from(mime, "utf8").toString("base64url");

/** The subject of a return's eSubmission email. */
export function esubmissionSubject(f: { form: string; periodLabel: string; clientName: string; tin: string | null }): string {
  return `${f.form} ${f.periodLabel} - ${f.clientName}${f.tin ? ` (TIN ${f.tin})` : ""}`;
}

export function esubmissionBody(f: { form: string; periodLabel: string; clientName: string; tin: string | null; files: string[] }): string {
  return [
    "Good day.",
    "",
    `Attached are the DAT files for the ${f.form} of ${f.clientName}${f.tin ? `, TIN ${f.tin}` : ""}, for ${f.periodLabel}:`,
    ...f.files.map((n) => `- ${n}`),
    "",
    "Thank you.",
    "Tallo CPA",
  ].join("\n");
}

/**
 * Reads the BIR's reply (its text, and the names of its attachments): 'errors' when it
 * reports errors or a rejection, 'validated' when it reports the files received or
 * validated without errors, null when it says neither (staff decide).
 */
export function classifyReply(text: string): "validated" | "errors" | null {
  const t = text.toLowerCase().replace(/\s+/g, " ");
  const noErrors = /\b(no|zero|0|without)\s+errors?\b|\berrors?\s*[:=]\s*0\b|\b0\s+error\(s\)/.test(t);
  if (!noErrors && /\b(errors?|invalid|failed|rejected|not accepted|unsuccessful)\b/.test(t)) return "errors";
  if (noErrors || /\b(validated|successfully|accepted|has been received|have been received|validation report)\b/.test(t)) return "validated";
  return null;
}

/** Whether a Gmail From header is the firm's own mailbox (our sent message, not the BIR's reply). */
export function fromMailbox(fromHeader: string, mailbox: string): boolean {
  const from = fromHeader.toLowerCase();
  // A Google Group rewrites an outside sender as "'BIR' via eSubmission <group address>": that is a reply.
  if (/\bvia\b/.test(from)) return false;
  return from.includes(mailbox.toLowerCase());
}

/**
 * Whether a message in the thread is one the firm sent: Gmail's SENT label when present
 * (the mailbox may be a person's account sending as a group address), else its sender.
 */
export function isOwnMessage(m: { labelIds?: string[]; from: string }, mailbox: string): boolean {
  if (m.labelIds) return m.labelIds.includes("SENT");
  return fromMailbox(m.from, mailbox);
}

/** The DAT attachments of a worksheet (kinds such as "qap-dat", "sls_dat_2027-01", "alphalist_dat"). */
export const isDatKind = (kind: string) => /(^|[_-])dat($|[_-])/i.test(kind);
