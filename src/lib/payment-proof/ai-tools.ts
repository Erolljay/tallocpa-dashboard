/**
 * The Payment Proof Clerk's connector tools (docs/ai-desks/payment-proof-clerk/;
 * migration 20270110000004_payment_proof_clerk.sql). The app collects payment
 * confirmation emails (src/lib/payment-proof/poll.ts); the Clerk matches each to the
 * return it pays for and saves a suggestion. A person attaches the proof with one click
 * on the return's page. The Clerk never attaches, records or files anything.
 *
 * Match keys, strongest first: TIN and branch → the client; form and return period → the
 * return; the amount confirms (a different amount is flagged, not refused: it may be a
 * partial payment or include penalties). The client's name in the email's subject is a
 * further confirmation.
 */
import { z } from "zod";
import { saveDraft } from "@/lib/ai/drafts";
import { defineTool, ToolRefusal } from "@/lib/mcp/tool";
import type { Queryable } from "@/lib/mcp/types";
import { formKey, namesMatch, tinMatches, type PaymentFacts } from "./parse";

const CLERK = ["payment_proof_clerk"] as const;
export const PAYMENT_PROOF_KIND = "payment_proof";

const money = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });
const cents = (v: number | string | null | undefined) => (v == null ? null : Math.round(Number(v) * 100));
const DAY = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const mailId = z.string().uuid("Give the payment email's id (from payment_mail_to_match).");

interface MailRow extends Record<string, unknown> {
  id: string;
  received_at: Date;
  sender: string;
  subject: string;
  channel: string;
  extracted: Partial<PaymentFacts>;
  has_pdf: boolean;
  my_suggestion: string | null;
}

interface MailDetail {
  id: string;
  received_at: string;
  sender: string;
  subject: string;
  channel: string;
  extracted: Partial<PaymentFacts>;
  text: string;
  has_pdf: boolean;
  pdf_source: string | null;
}

async function mailDetail(db: Queryable, id: string): Promise<MailDetail> {
  try {
    const { rows } = await db.query<{ d: MailDetail }>(`select public.ai_payment_mail_detail($1) as d`, [id]);
    return rows[0].d;
  } catch (e) {
    if (/No unmatched payment email/.test((e as Error).message)) throw new ToolRefusal(`No unmatched payment email ${id}: it may already be attached to a return.`);
    throw e;
  }
}

interface FilingRow extends Record<string, unknown> {
  id: string;
  client_id: string;
  client_code: string;
  client: string;
  client_tin: string | null;
  form: string;
  period_label: string;
  period_end: string;
  due_date: string;
  status: string;
  tax_due: string | null;
  payment_reference: string | null;
}

const FILING_SQL = `select f.id, f.client_id, c.code as client_code, c.name as client, c.tin as client_tin, f.form, f.period_label,
                           f.period_end::text, f.due_date::text, f.status, f.tax_due::text, f.payment_reference
                    from public.filing_instances f join public.clients c on c.id = f.client_id`;

/** Returns that may still take a proof of payment: not filed, or filed without a payment reference. */
const OPEN_FOR_PROOF = `(f.status <> 'filed' or f.payment_reference is null)`;

interface Candidate {
  filing_id: string;
  client_code: string;
  client: string;
  form: string;
  period: string;
  period_end: string;
  due_date: string;
  status: string;
  tax_due: number | null;
  score: number;
  matches: string[];
  differences: string[];
}

/** Scores a return against what the email says. */
export function scoreFiling(f: FilingRow, facts: Partial<PaymentFacts>): Candidate {
  const matches: string[] = [];
  const differences: string[] = [];
  let score = 0;
  if (facts.tin) {
    if (tinMatches(f.client_tin, facts.tin)) {
      score += 4;
      matches.push("TIN and branch");
    } else differences.push(f.client_tin ? `TIN ${f.client_tin} is not ${facts.tin}` : "client has no TIN on file");
  }
  if (facts.client_name) {
    if (namesMatch(f.client, facts.client_name)) {
      score += 2;
      matches.push("client name in the subject");
    } else differences.push(`subject names "${facts.client_name}"`);
  }
  if (facts.form) {
    if (formKey(f.form) === formKey(facts.form)) {
      score += 2;
      matches.push("form");
    } else differences.push(`form ${f.form} is not ${facts.form}`);
  }
  if (facts.period_end) {
    if (f.period_end === facts.period_end) {
      score += 2;
      matches.push("return period");
    } else differences.push(`period ends ${f.period_end}, not ${facts.period_end}`);
  }
  if (facts.amount != null) {
    if (f.tax_due != null && cents(f.tax_due) === cents(facts.amount)) {
      score += 2;
      matches.push("amount, to the centavo");
    } else differences.push(f.tax_due == null ? "tax due not yet computed" : `tax due ${money.format(Number(f.tax_due))}, paid ${money.format(facts.amount)}`);
  }
  return {
    filing_id: f.id,
    client_code: f.client_code,
    client: f.client,
    form: f.form,
    period: f.period_label,
    period_end: f.period_end,
    due_date: f.due_date,
    status: f.status,
    tax_due: f.tax_due == null ? null : Number(f.tax_due),
    score,
    matches,
    differences,
  };
}

export const paymentMailToMatch = defineTool({
  name: "payment_mail_to_match",
  title: "Payment emails to match",
  description:
    "Payment confirmation emails for taxes the firm paid (UnionBank bills payment to the BIR and other listed channels) that are not yet attached to a return, newest first, with what the app read from each: amount, bank and BIR references, TIN, form, tax type, return period, the client named in the subject. Emails you already suggested a return for (open, accepted or rejected) are left out and counted; pass include_suggested to list them too.",
  input: z.object({
    include_suggested: z.boolean().default(false).describe("Also list emails you already suggested a return for"),
    limit: z.number().int().min(1).max(200).default(50).describe("At most this many emails"),
  }),
  employees: CLERK,
  effect: "read",
  async run({ db }, { include_suggested, limit }) {
    const { rows } = await db.query<MailRow>(`select * from public.ai_payment_mail()`);
    const suggested = rows.filter((r) => r.my_suggestion);
    const list = (include_suggested ? rows : rows.filter((r) => !r.my_suggestion)).slice(0, limit);
    return {
      already_suggested: suggested.length,
      emails: list.map((r) => ({
        id: r.id,
        received_at: new Date(r.received_at).toISOString(),
        sender: r.sender,
        subject: r.subject,
        channel: r.channel,
        read: r.extracted,
        has_pdf: r.has_pdf,
        my_suggestion: r.my_suggestion ?? "none",
      })),
    };
  },
});

export const readPaymentMail = defineTool({
  name: "read_payment_mail",
  title: "Read a payment email",
  description:
    "One unmatched payment email: its text (bank account numbers masked), what the app read from it, and the returns of your clients it may pay for, best first, each with what matches (TIN and branch, client name, form, return period, amount to the centavo) and what differs. Candidates are returns not yet filed, or filed without a payment reference.",
  input: z.object({ mail_id: mailId }),
  employees: CLERK,
  effect: "read",
  async run({ db, noteClient }, { mail_id }) {
    const m = await mailDetail(db, mail_id);
    const facts = m.extracted ?? {};
    const { rows: clients } = await db.query<{ id: string; name: string; tin: string | null }>(`select id, name, tin from public.clients`);
    const byKey = clients.filter((c) => (facts.tin && tinMatches(c.tin, facts.tin)) || (facts.client_name && namesMatch(c.name, facts.client_name))).map((c) => c.id);
    const { rows: filings } = await db.query<FilingRow>(
      `${FILING_SQL}
       where ${OPEN_FOR_PROOF}
         and (f.client_id = any ($1::uuid[]) or ($2::numeric is not null and f.tax_due = $2::numeric))
       order by f.period_end desc
       limit 200`,
      [byKey, facts.amount ?? null],
    );
    const proven = new Set(
      filings.length
        ? (await db.query<{ id: string }>(`select x as id from public.ai_filings_with_payment_proof($1::uuid[]) as x`, [filings.map((f) => f.id)])).rows.map((r) => r.id)
        : [],
    );
    const candidates = filings
      .filter((f) => !proven.has(f.id))
      .map((f) => scoreFiling(f, facts))
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score || b.period_end.localeCompare(a.period_end))
      .slice(0, 10);
    for (const id of new Set(candidates.slice(0, 1).map((c) => filings.find((f) => f.id === c.filing_id)!.client_id))) noteClient(id);
    return {
      email: { id: m.id, received_at: m.received_at, sender: m.sender, subject: m.subject, channel: m.channel, has_pdf: m.has_pdf, pdf: m.pdf_source === "attachment" ? "the email's own PDF" : "a PDF the app made from the email" },
      read: facts,
      text: m.text,
      candidates,
      note: byKey.length === 0 ? "No client of yours has this TIN or name; candidates (if any) match only the amount." : undefined,
    };
  },
});

export const proposePaymentProof = defineTool({
  name: "propose_payment_proof",
  title: "Suggest a proof of payment",
  description:
    "Save your suggestion that this payment email is the proof of payment for this return, as a draft for the preparer: the return, the email, the amount, the bank reference, the BIR reference, the date paid, your confidence and your reason. A person checks it and attaches the PDF with one click; you attach nothing. Refused for a return that is not one of your clients', already has a proof of payment or a recorded payment, or is nil. A different amount is shown to the person, not refused. A new suggestion for the same return replaces your earlier one.",
  input: z.object({
    mail_id: mailId,
    filing_id: z.string().uuid("Give the return's id (from read_payment_mail's candidates)."),
    bank_reference: z.string().trim().min(3).max(60).optional().describe("Only if the app did not read it: the bank's reference, e.g. UB661855"),
    bir_reference: z.string().trim().min(3).max(60).optional().describe("Only if the app did not read it: the BIR reference number"),
    paid_on: z.string().regex(DAY, "Use YYYY-MM-DD.").optional().describe("Only if the app did not read it: the date paid"),
    confidence: z.enum(["high", "medium", "low"]).describe("high: TIN, form and period all match; medium: most match; low: a guess the person must check"),
    reason: z.string().trim().min(10, "Explain the match in a sentence or two.").max(1000).describe("Why this email pays this return"),
  }),
  employees: CLERK,
  effect: "draft",
  async run({ db, noteClient }, { mail_id, filing_id, bank_reference, bir_reference, paid_on, confidence, reason }) {
    const m = await mailDetail(db, mail_id);
    const facts = m.extracted ?? {};
    const { rows } = await db.query<FilingRow>(`${FILING_SQL} where f.id = $1`, [filing_id]);
    const f = rows[0];
    if (!f) throw new ToolRefusal(`No return ${filing_id} among your clients' returns.`);
    noteClient(f.client_id);
    if (f.status === "filed" && f.payment_reference) throw new ToolRefusal(`${f.form} ${f.period_label} of ${f.client} is already filed with payment reference ${f.payment_reference}.`);
    if (f.tax_due != null && Number(f.tax_due) === 0) throw new ToolRefusal(`${f.form} ${f.period_label} of ${f.client} is a nil return: nothing was payable.`);
    const { rows: proven } = await db.query(`select 1 from public.ai_filings_with_payment_proof($1::uuid[])`, [[f.id]]);
    if (proven.length) throw new ToolRefusal(`${f.form} ${f.period_label} of ${f.client} already has a proof of payment attached.`);
    if (!m.has_pdf) throw new ToolRefusal("This payment email has no PDF yet; tell the Owner the mailbox job could not make one.");
    const bank = bank_reference ?? facts.bank_reference ?? null;
    const bir = bir_reference ?? facts.bir_reference ?? null;
    const paid = paid_on ?? facts.paid_on ?? null;
    if (!bank && !bir) throw new ToolRefusal("No payment reference was read from the email; give bank_reference or bir_reference from its text.");
    if (!paid) throw new ToolRefusal("No payment date was read from the email; give paid_on from its text.");
    const c = scoreFiling(f, facts);
    const amountLine =
      facts.amount == null
        ? "Not read from the email"
        : f.tax_due == null
          ? `${money.format(facts.amount)} (tax due not yet computed)`
          : cents(f.tax_due) === cents(facts.amount)
            ? `${money.format(facts.amount)}, equal to the tax due`
            : `${money.format(facts.amount)}; the tax due is ${money.format(Number(f.tax_due))}. Check: partial payment or penalties?`;
    const summary = [
      { label: "Return", value: `${f.form} · ${f.period_label} (${f.client_code} ${f.client})` },
      { label: "Email", value: `${m.subject} · ${new Date(m.received_at).toLocaleString("en-PH", { timeZone: "Asia/Manila", dateStyle: "medium", timeStyle: "short" })}` },
      { label: "Amount paid", value: amountLine },
      ...(bank ? [{ label: "Bank reference", value: bank }] : []),
      ...(bir ? [{ label: "BIR reference", value: bir }] : []),
      { label: "Paid on", value: paid },
      { label: "Matches", value: c.matches.join(", ") || "none" },
      ...(c.differences.length ? [{ label: "Differs", value: c.differences.join("; ") }] : []),
      { label: "Confidence", value: confidence[0].toUpperCase() + confidence.slice(1) },
    ];
    const draft = await saveDraft(db, {
      kind: PAYMENT_PROOF_KIND,
      clientId: f.client_id,
      subject: { table: "filing_instances", id: f.id },
      summary,
      data: { mail_id: m.id, amount: facts.amount ?? null, bank_reference: bank, bir_reference: bir, paid_on: paid, confidence },
      note: reason,
    });
    return { saved: true, draft_id: draft.id, status: draft.status, for_the_preparer: summary };
  },
});
