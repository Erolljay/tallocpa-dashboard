/**
 * BIR mail (migration 20270110000001): what an email from the BIR is, which TINs it
 * names, and for a notice the deadline it sets. Pure, so the mailbox job and the BIR
 * Mail Clerk's tools read the same way.
 */

export type BirMailKind = "filing_confirmation" | "esubmission_reply" | "payment_confirmation" | "notice" | "other";
export type NoticeType = "loa" | "pan" | "fan" | "fld" | "subpoena" | "informal_conference" | "tvn" | "other_notice";

export const NOTICE_LABELS: Record<NoticeType, string> = {
  loa: "Letter of Authority (LOA)",
  pan: "Preliminary Assessment Notice (PAN)",
  fan: "Final Assessment Notice (FAN)",
  fld: "Formal Letter of Demand (FLD)",
  subpoena: "Subpoena duces tecum",
  informal_conference: "Notice of informal conference",
  tvn: "Tax Verification Notice (TVN)",
  other_notice: "Other BIR notice or letter",
};

/** Notices with a short statutory time to answer: the Owner is told at once. */
export const URGENT_NOTICES: readonly NoticeType[] = ["loa", "pan", "fan", "fld", "subpoena"];

export const BIR_MAIL_KINDS: Record<BirMailKind, string> = {
  filing_confirmation: "Filing confirmation (eFPS / eBIRForms)",
  esubmission_reply: "eSubmission reply / validation",
  payment_confirmation: "Payment confirmation",
  notice: "Notice or letter",
  other: "Other BIR mail",
};

/** Whether a From header is the BIR's (any address at bir.gov.ph, e.g. eFPS or eSubmission). */
export function isBirSender(from: string): boolean {
  return /@([a-z0-9-]+\.)*bir\.gov\.ph\b/i.test(from);
}

const NOTICE_PATTERNS: [NoticeType, RegExp][] = [
  ["fld", /\b(formal letter of demand|fld)\b/],
  ["fan", /\b(final assessment notice|fan)\b/],
  ["pan", /\b(preliminary assessment notice|pan)\b/],
  ["loa", /\b(letter of authority|loa|electronic letter of authority|eloa)\b/],
  ["subpoena", /\bsubpoena\b/],
  ["informal_conference", /\b(notice (for|of) informal conference|informal conference)\b/],
  ["tvn", /\b(tax verification notice|tvn)\b/],
];

/** The kind of BIR email and, for a notice, which one; from its subject and text. */
export function classifyBirMail(subject: string, text: string): { kind: BirMailKind; noticeType: NoticeType | null } {
  const s = subject.toLowerCase().replace(/\s+/g, " ");
  const t = `${s} ${text.toLowerCase().replace(/\s+/g, " ")}`;
  for (const [type, re] of NOTICE_PATTERNS) if (re.test(t)) return { kind: "notice", noticeType: type };
  if (/\b(notice|letter|demand|assessment|delinquen|compliance|show cause)\b/.test(s)) return { kind: "notice", noticeType: "other_notice" };
  if (/\b(esubmission|e-submission|validation report)\b/.test(t)) return { kind: "esubmission_reply", noticeType: null };
  if (/\b(payment confirmation|payment acknowledg|acknowledgment of payment|paid|payment reference|epay)/.test(s)) return { kind: "payment_confirmation", noticeType: null };
  if (/\b(filing reference|tax return receipt|return receipt|successfully filed|filing confirmation|acknowledg(e)?ment receipt|ebirforms|efps)\b/.test(t)) {
    return { kind: "filing_confirmation", noticeType: null };
  }
  return { kind: "other", noticeType: null };
}

/** TINs written in the text, as 999-999-999 (branch code dropped), first seen first. */
export function findTins(text: string): string[] {
  const out: string[] = [];
  for (const m of text.matchAll(/(?<!\d)(\d{3})[-\s]?(\d{3})[-\s]?(\d{3})(?:[-\s]?\d{3,5})?(?!\d)/g)) {
    const tin = `${m[1]}-${m[2]}-${m[3]}`;
    if (tin !== "000-000-000" && !out.includes(tin)) out.push(tin);
  }
  return out;
}

const NUMBER_WORDS: Record<string, number> = {
  five: 5, seven: 7, ten: 10, fifteen: 15, twenty: 20, thirty: 30, sixty: 60,
};
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

const iso = (d: Date) => d.toISOString().slice(0, 10);
function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return iso(d);
}

/**
 * The deadline a notice sets, YYYY-MM-DD: a date it names ("on or before March 30, 2027"),
 * else "within N days" counted from `received` (the date the mailbox received it). Null
 * when it states neither; the reviewer reads the notice.
 */
export function respondBy(text: string, received: string): string | null {
  const t = text.toLowerCase().replace(/\s+/g, " ");
  const dated = t.match(new RegExp(`(?:on or before|not later than|until|deadline[^a-z0-9]*)\\s*(${MONTHS.join("|")})\\s+(\\d{1,2}),?\\s+(\\d{4})`));
  if (dated) {
    const d = new Date(Date.UTC(Number(dated[3]), MONTHS.indexOf(dated[1]), Number(dated[2])));
    if (!Number.isNaN(d.getTime())) return iso(d);
  }
  const within = t.match(/within\s+(?:([a-z]+)\s*\(\s*(\d{1,3})\s*\)|(\d{1,3})|([a-z]+))\s+(?:\(\s*\d{1,3}\s*\)\s+)?(calendar\s+|working\s+)?days?/);
  if (within) {
    const n = Number(within[2] ?? within[3] ?? NUMBER_WORDS[within[4] ?? within[1] ?? ""] ?? NaN);
    if (Number.isFinite(n) && n > 0 && n <= 366) return addDays(received, n);
  }
  return null;
}
