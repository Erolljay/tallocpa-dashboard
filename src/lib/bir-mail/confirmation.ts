/**
 * BIR filing confirmations (eBIRForms "Tax Return Receipt Confirmation", eFPS filing
 * reference emails): what was filed, read from the email's text. Pure and tolerant: every
 * field is null when the email does not say it. Used by the mailbox job (the PDF it writes
 * for the return) and by the BIR Mail Clerk's read tool (to find the return).
 *
 * eBIRForms names the file it received "<TIN 9><branch 3-5>-<form>v<version>-<MMYYYY>.xml",
 * e.g. 123456789000-1601EQv2018-092026.xml, which gives the TIN, the form and the period
 * even when the email has no labelled fields. Labelled fields ("TIN:", "Form Type:",
 * "Return Period:", "Reference No.:", "Date received by BIR:") win when present.
 */
import { formKey } from "@/lib/payment-proof/parse";

export interface FilingConfirmation {
  /** 999-999-999-00000 when the branch is known, else 999-999-999. */
  tin: string | null;
  /** The form as written, e.g. 1601EQ; compare with formKey(). */
  form: string | null;
  /** The last day of the period filed (YYYY-MM-DD). */
  period_end: string | null;
  /** The BIR's filing / confirmation reference, when the email gives one. */
  reference: string | null;
  /** When the BIR received it, as written (e.g. "10 Oct 2026 09:15 AM"). */
  received: string | null;
  /** The file name eBIRForms received, when given. */
  file_name: string | null;
}

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

const lastDay = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();
const pad = (n: number) => String(n).padStart(2, "0");
const monthEnd = (y: number, m: number) => (m >= 1 && m <= 12 && y >= 2000 && y <= 2100 ? `${y}-${pad(m)}-${pad(lastDay(y, m))}` : null);

function formatTin(nine: string, branch: string | null): string {
  const t = `${nine.slice(0, 3)}-${nine.slice(3, 6)}-${nine.slice(6, 9)}`;
  return branch ? `${t}-${branch.padStart(5, "0")}` : t;
}

/** The value after a label on the same line ("Label: value" or "Label  value"). */
function field(text: string, labels: string[]): string | null {
  for (const label of labels) {
    const re = new RegExp(`(?:^|\\n)\\s*${label}\\s*(?:[:\\-–]|\\s{2,}|\\t)\\s*([^\\n]+)`, "i");
    const m = text.match(re);
    if (m && m[1].trim()) return m[1].trim();
  }
  return null;
}

/** A return period written as MM/DD/YYYY, MM/YYYY, MMYYYY, "September 2026" or "Sep 2026" → its last day. */
export function periodEnd(raw: string | null): string | null {
  if (!raw) return null;
  const s = raw.trim();
  let m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return monthEnd(Number(m[3]), Number(m[1]));
  m = s.match(/^(\d{4})-(\d{2})(?:-\d{2})?/);
  if (m) return monthEnd(Number(m[1]), Number(m[2]));
  m = s.match(/^(\d{1,2})[/-](\d{4})\b/);
  if (m) return monthEnd(Number(m[2]), Number(m[1]));
  m = s.match(/^(\d{2})(\d{4})$/);
  if (m) return monthEnd(Number(m[2]), Number(m[1]));
  m = s.match(/^([A-Za-z]{3,9})\.?\s+(\d{4})/);
  if (m) {
    const month = MONTHS[m[1].toLowerCase().slice(0, 3)];
    if (month) return monthEnd(Number(m[2]), month);
  }
  return null;
}

/** What a BIR filing confirmation says was filed. */
export function readFilingConfirmation(subject: string, text: string): FilingConfirmation {
  const all = `${subject}\n${text}`.replace(/\r/g, "");
  const out: FilingConfirmation = { tin: null, form: null, period_end: null, reference: null, received: null, file_name: null };

  // eBIRForms' file name: 123456789000-1601EQv2018-092026.xml
  const file = all.match(/\b(\d{9})(\d{3,5})-([0-9]{4}[A-Z0-9-]*?)v\d{4}[A-Z]?-(\d{2})(\d{4})\.xml\b/i);
  if (file) {
    out.file_name = file[0];
    out.tin = formatTin(file[1], file[2]);
    out.form = file[3].toUpperCase();
    out.period_end = monthEnd(Number(file[5]), Number(file[4]));
  }

  const tin = field(all, ["TIN", "Taxpayer Identification Number"]);
  const tinDigits = tin?.replace(/\D/g, "") ?? "";
  if (tinDigits.length >= 9) out.tin = formatTin(tinDigits.slice(0, 9), tinDigits.length > 9 ? tinDigits.slice(9, 14) : out.tin?.split("-")[3] ?? null);

  const form = field(all, ["Form Type", "Form No\\.?", "Form Number", "BIR Form No\\.?", "BIR Form", "Tax Form", "Form"]);
  if (form) {
    const f = form.match(/\b(\d{4}[A-Z]{0,3}(?:-[A-Z]{1,3})?)\b/i);
    if (f) out.form = f[1].toUpperCase();
  }

  const period = field(all, ["Return Period", "Tax Period", "Period Covered", "For the (?:month|quarter|year) of", "Period"]);
  const p = periodEnd(period);
  if (p) out.period_end = p;

  const ref = field(all, ["Filing Reference (?:No\\.?|Number)", "Reference (?:No\\.?|Number)", "Confirmation (?:No\\.?|Number)", "Transaction (?:No\\.?|Number)", "Acknowledg(?:e)?ment (?:No\\.?|Number)"]);
  if (ref) out.reference = ref.replace(/\s+/g, "").replace(/[.,;]+$/, "").slice(0, 80) || null;
  else {
    const inline = all.match(/\breference (?:number|no\.?)\s*(?:is|:)?\s*([A-Z0-9-]{6,})/i);
    if (inline) out.reference = inline[1];
  }

  const date = field(all, ["Date received by BIR", "Date Received", "Date Filed", "Date and Time Filed", "Date/Time Received"]);
  const time = field(all, ["Time received by BIR", "Time Received"]);
  if (date) out.received = time ? `${date} ${time}` : date;

  return out;
}

/** Whether a confirmation names this form (any spelling: 1601-EQ, 1601EQ). */
export const sameForm = (a: string | null | undefined, b: string | null | undefined) => Boolean(a && b && formKey(a) === formKey(b));

/** The lines of the PDF the app writes for a BIR email without its own PDF. */
export function confirmationLines(input: { from: string; receivedAt: string; subject: string; text: string; kind: string; facts: FilingConfirmation | null }): string[] {
  const { facts } = input;
  const heading = input.kind === "filing_confirmation" ? "# BIR filing confirmation" : "# BIR email";
  const rows: [string, string | null][] = facts
    ? [
        ["TIN", facts.tin],
        ["Form", facts.form],
        ["Period ending", facts.period_end],
        ["Received by the BIR", facts.received],
        ["Reference", facts.reference],
        ["File", facts.file_name],
      ]
    : [];
  return [
    heading,
    "",
    `From: ${input.from}`,
    `Received: ${input.receivedAt}`,
    `Subject: ${input.subject}`,
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    "# The email",
    "",
    ...input.text.split("\n"),
  ];
}
