/**
 * Payment confirmation emails for taxes the firm paid (the Payment Proof Clerk,
 * docs/ai-desks/payment-proof-clerk/): which emails count, and what can be read from
 * them. Pure functions, used by the mailbox job (src/lib/payment-proof/poll.ts) and the
 * Clerk's tools. Nothing here is trusted as fact: a person confirms every match.
 *
 * Built first for UnionBank Business Banking's "Successful Bills Payment (<client>)"
 * email to the BIR biller, whose "Transaction Details" rows (BIR Reference Number, TIN,
 * TIN Branch Code, Form Type, Tax Type, Return Period, Amount) are the match keys. Other
 * channels are listed in PAYMENT_SENDERS; add one there (sender and subject patterns) and
 * the same label/value reader applies.
 *
 * The bank's source account number is never kept in what is read or shown: it is masked
 * to its last 4 digits (maskAccounts) before the text is stored.
 */

/**
 * Senders whose payment confirmations are collected: banks and e-wallets. Add a channel
 * here; keep it narrow. Mail from the BIR itself (bir.gov.ph, eFPS) is the BIR Mail
 * Clerk's (its bir_mail table), not collected here.
 */
export interface PaymentSender {
  channel: string;
  label: string;
  /** Matches the From header (display name or address). */
  from: RegExp;
  /** Matches the subject of a payment confirmation (not promotions or statements). */
  subject: RegExp;
  /** Words for Gmail's search (from:… subject:…). */
  gmailFrom: string;
}

export const PAYMENT_SENDERS: PaymentSender[] = [
  { channel: "unionbank", label: "UnionBank Business Banking", from: /unionbank/i, subject: /successful\s+bills?\s+payment/i, gmailFrom: "unionbank" },
  { channel: "landbank", label: "LANDBANK Link.BizPortal", from: /landbank|link\.?biz/i, subject: /payment|transaction/i, gmailFrom: "landbank" },
  { channel: "dbp", label: "DBP PayTax", from: /\bdbp\b|devbank/i, subject: /payment|paytax/i, gmailFrom: "dbp" },
  { channel: "gcash", label: "GCash", from: /gcash/i, subject: /bills?\s*pay|payment/i, gmailFrom: "gcash" },
  { channel: "maya", label: "Maya", from: /maya|paymaya/i, subject: /bills?\s*pay|payment/i, gmailFrom: "maya" },
];

/** The sender this email comes from, when it is a payment confirmation. */
export function paymentSender(from: string, subject: string): PaymentSender | null {
  return PAYMENT_SENDERS.find((s) => s.from.test(from) && s.subject.test(subject)) ?? null;
}

/** Gmail search for recent confirmations from the listed senders (the app filters again). */
export function gmailQuery(days: number): string {
  const from = [...new Set(PAYMENT_SENDERS.map((s) => s.gmailFrom))].join(" OR ");
  return `from:(${from}) -in:sent newer_than:${Math.max(1, Math.min(days, 90))}d`;
}

/** An HTML email's text, one row or paragraph per line. */
export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style|head)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|li|h[1-6]|table|section)>/gi, "\n")
    .replace(/<\/t[dh]>/gi, "\t")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .split("\n")
    .map((l) => l.replace(/[ \t\u00a0]+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

/**
 * Masks bank account numbers: on any line that names an account, and any run of digits
 * grouped like "0001 8002 5831", only the last 4 digits remain ("**** 5831").
 */
export function maskAccounts(text: string): string {
  const mask = (digits: string) => `**** ${digits.replace(/\D/g, "").slice(-4)}`;
  return text
    .split("\n")
    .map((line) => {
      let l = line.replace(/\b\d{4}(?:[ -]\d{4}){2,}\b/g, mask);
      if (/account/i.test(l)) l = l.replace(/\b\d(?:[ -]?\d){7,}\b/g, mask);
      return l;
    })
    .join("\n");
}

export const TAX_TYPES: Record<string, string> = {
  WE: "Expanded withholding tax",
  WC: "Withholding tax on compensation",
  WF: "Final withholding tax",
  WB: "Withholding on business tax",
  VT: "Value-added tax",
  PT: "Percentage tax",
  IT: "Income tax",
  DS: "Documentary stamp tax",
  CG: "Capital gains tax",
  ET: "Estate tax",
  DN: "Donor's tax",
};

export interface PaymentFacts {
  /** The client named in the subject (UnionBank: "Successful Bills Payment (CLIENT)"). */
  client_name: string | null;
  biller: string | null;
  amount: number | null;
  /** The bank's (or channel's) reference, e.g. UB661855. */
  bank_reference: string | null;
  /** The BIR's payment reference, e.g. So202611101440361634313861. */
  bir_reference: string | null;
  /** 000-000-000-00000, from TIN and TIN Branch Code. */
  tin: string | null;
  /** Form as written, e.g. 0619E; compare with formKey(). */
  form: string | null;
  tax_type: string | null;
  tax_type_label: string | null;
  /** The return period's last day, YYYY-MM-DD (Return Period 10/31/2026). */
  period_end: string | null;
  /** YYYY-MM-DD: the day the payment was made (Created by … on …), else the email's date. */
  paid_on: string | null;
  created_by: string | null;
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => {
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d ? `${y}-${pad(m)}-${pad(d)}` : null;
};

/** "November 10, 2026" or "11/10/2026" (MM/DD/YYYY) or "2026-11-10" → YYYY-MM-DD. */
export function parseDate(s: string | null | undefined): string | null {
  if (!s) return null;
  const words = s.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{1,2}),?\s+(\d{4})\b/i);
  if (words) return iso(Number(words[3]), MONTHS.findIndex((m) => m.startsWith(words[1].toLowerCase())) + 1, Number(words[2]));
  const us = s.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/);
  if (us) return iso(Number(us[3]), Number(us[1]), Number(us[2]));
  const ymd = s.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  if (ymd) return iso(Number(ymd[1]), Number(ymd[2]), Number(ymd[3]));
  // Return Period written as MM/YYYY: the month's last day.
  const my = s.match(/\b(\d{1,2})\/(\d{4})\b/);
  if (my) {
    const m = Number(my[1]);
    const y = Number(my[2]);
    return m >= 1 && m <= 12 ? iso(y, m, new Date(Date.UTC(y, m, 0)).getUTCDate()) : null;
  }
  return null;
}

/** "PHP 20,578.58" / "₱20,578.58" → 20578.58. */
export function parseAmount(s: string | null | undefined): number | null {
  const m = s?.match(/(?:PHP|Php|₱|P)?\s*(\d{1,3}(?:,\d{3})+|\d+)(\.\d{1,2})?/);
  if (!m) return null;
  const n = Number(m[1].replace(/,/g, "") + (m[2] ?? ""));
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : null;
}

/** 9-digit TIN and branch code → 000-000-000-00000 (the app's format). */
export function formatTin(tin: string | null | undefined, branch?: string | null): string | null {
  const d = (tin ?? "").replace(/\D/g, "");
  if (d.length < 9) return null;
  const b = ((branch ?? "").replace(/\D/g, "") || d.slice(9) || "").slice(0, 5);
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 9)}${b ? `-${b}` : ""}`;
}

/** Whether a client's TIN (as stored) is this TIN: same 9 digits, same branch (000 = 00000). */
export function tinMatches(clientTin: string | null | undefined, tin: string | null | undefined): boolean {
  const a = (clientTin ?? "").replace(/\D/g, "");
  const b = (tin ?? "").replace(/\D/g, "");
  if (a.length < 9 || b.length < 9 || a.slice(0, 9) !== b.slice(0, 9)) return false;
  return Number(a.slice(9) || "0") === Number(b.slice(9) || "0");
}

/** A form code for comparing: "0619-E", "0619E", "BIR Form 1601-C" → "0619E", "1601C". */
export const formKey = (form: string | null | undefined) => (form ?? "").toUpperCase().replace(/^BIR\s*FORM\s*(NO\.?)?/, "").replace(/-EBIR$/, "").replace(/[^0-9A-Z]/g, "");

/** A name for comparing: case, punctuation and company endings ignored. */
export function nameKey(name: string | null | undefined): string {
  return (name ?? "")
    .toUpperCase()
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9 ]+/g, " ")
    .replace(/\b(INCORPORATED|INC|CORPORATION|CORP|CO|COMPANY|LTD|LIMITED|OPC|ENTERPRISES?|TRADING|THE)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Whether two names are the same client name, ignoring case, punctuation and endings. */
export const namesMatch = (a: string | null | undefined, b: string | null | undefined) => {
  const x = nameKey(a);
  return x.length > 0 && x === nameKey(b);
};

// Labels of the "Payment to" and "Transaction Details" rows, longest first so "TIN Branch
// Code" is not read as "TIN".
const LABELS: [string, keyof Rows][] = (
  [
    ["BIR Reference Number", "bir_reference"],
    ["BIR Reference No", "bir_reference"],
    ["Payment Reference Number", "bir_reference"],
    ["TIN Branch Code", "branch"],
    ["Branch Code", "branch"],
    ["Return Period", "period"],
    ["Amount Paid", "amount"],
    ["Total Amount", "amount"],
    ["Form Type", "form"],
    ["Tax Type", "tax_type"],
    ["Biller Name", "biller"],
    ["Biller", "biller"],
    ["Amount", "amount"],
    ["Form", "form"],
    ["TIN", "tin"],
  ] as [string, keyof Rows][]
).sort((a, b) => b[0].length - a[0].length);

interface Rows {
  bir_reference?: string;
  branch?: string;
  period?: string;
  amount?: string;
  form?: string;
  tax_type?: string;
  biller?: string;
  tin?: string;
}

/** The label/value rows: "Label value", "Label: value", or the label on one line and the value on the next. */
export function readRows(text: string): Rows {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const rows: Rows = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const hit = LABELS.find(([label]) => {
      if (line.length < label.length || line.slice(0, label.length).toLowerCase() !== label.toLowerCase()) return false;
      const next = line.charAt(label.length);
      return next === "" || /[\s:\t]/.test(next);
    });
    if (!hit) continue;
    const [label, key] = hit;
    if (rows[key] !== undefined) continue;
    let value = line.slice(label.length).replace(/^[\s:\t]+/, "").trim();
    if (!value && i + 1 < lines.length && !LABELS.some(([l]) => lines[i + 1].toLowerCase().startsWith(l.toLowerCase()))) value = lines[i + 1].trim();
    if (value) rows[key] = value;
  }
  return rows;
}

/** What a payment confirmation says. `receivedAt` is the email's date (ISO). */
export function readPaymentMail(input: { subject: string; text: string; receivedAt?: string | null }): PaymentFacts {
  const text = input.text;
  const rows = readRows(text);
  const subjectName = input.subject.match(/\(([^()]{2,120})\)\s*$/)?.[1]?.trim() ?? null;
  const bank = text.match(/\b(UB\d{5,})\b/)?.[1] ?? text.match(/\b([A-Z0-9-]{6,})\s+serves as your\b/i)?.[1] ?? text.match(/reference (?:number|no\.?)\s*[:\-]?\s*([A-Z]{0,4}\d[A-Z0-9-]{4,})/i)?.[1] ?? null;
  const created = text.match(/created by\s+(.+?)\s+on\s+([A-Za-z]+\.?\s+\d{1,2},?\s+\d{4})/i);
  const amountText = rows.amount ?? text.match(/amount(?:\s+paid)?\s*[:\-]?\s*((?:PHP|Php|₱)\s*[\d,]+\.\d{2})/i)?.[1] ?? null;
  const formRaw = rows.form?.replace(/^BIR\s*Form\s*(No\.?)?\s*/i, "").split(/\s+/)[0] ?? null;
  const taxType = rows.tax_type?.match(/^[A-Z]{2}\b/)?.[0] ?? null;
  const received = input.receivedAt ? manilaDay(input.receivedAt) : null;
  return {
    client_name: subjectName,
    biller: rows.biller ?? (/bureau of internal revenue/i.test(text) ? "Bureau of Internal Revenue (BIR)" : null),
    amount: parseAmount(amountText),
    bank_reference: bank,
    bir_reference: rows.bir_reference ? rows.bir_reference.replace(/\s+/g, "") : null,
    tin: formatTin(rows.tin, rows.branch),
    form: formRaw,
    tax_type: taxType,
    tax_type_label: taxType ? (TAX_TYPES[taxType] ?? null) : null,
    period_end: parseDate(rows.period),
    paid_on: parseDate(created?.[2]) ?? received,
    created_by: created?.[1]?.trim() ?? null,
  };
}

/** YYYY-MM-DD in Manila for an instant. */
export function manilaDay(at: string | number | Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(at));
}

/** The text of the PDF the app makes when the email has no PDF of its own. */
export function proofLines(m: { channel: string; sender: string; receivedAt: string; subject: string; facts: PaymentFacts; text: string }): string[] {
  const f = m.facts;
  const peso = (n: number) => `PHP ${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "long", timeStyle: "short", timeZone: "Asia/Manila" }).format(new Date(m.receivedAt));
  const row = (label: string, value: string | null) => (value ? [`${label}: ${value}`] : []);
  return [
    "# Proof of payment",
    `From the payment confirmation email received ${when}.`,
    "",
    "# Payment",
    ...row("Paid for", f.client_name),
    ...row("Biller", f.biller),
    ...row("Amount", f.amount != null ? peso(f.amount) : null),
    ...row("Bank reference", f.bank_reference),
    ...row("BIR reference number", f.bir_reference),
    ...row("TIN", f.tin),
    ...row("Form", f.form),
    ...row("Tax type", f.tax_type ? `${f.tax_type}${f.tax_type_label ? ` (${f.tax_type_label})` : ""}` : null),
    ...row("Return period ending", f.period_end),
    ...row("Paid on", f.paid_on),
    "",
    "# Email",
    `From: ${m.sender}`,
    `Subject: ${m.subject}`,
    "",
    ...m.text.split("\n"),
  ];
}
