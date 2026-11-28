/**
 * The BIR Mail Clerk's connector tools (docs/AI-WORKFORCE.md §3, §7.2; build step 6).
 * BIR emails the mailbox job stored (src/lib/bir-mail/ingest.ts) wait unlinked; the Clerk
 * reads them, finds the client and the return they are about, and saves a proposal (a
 * draft) for a person to accept, which links the mail. For a notice (LOA, PAN, FAN, FLD,
 * subpoena…) it names the notice, its date and the deadline to answer; an urgent one
 * reaches the Owner at once (migration 20270110000001).
 *
 * It reads BIR mail only through public.ai_bir_mail() and public.ai_bir_mail_message(),
 * which refuse any caller but the switched-on BIR Mail Clerk, and its clients and their
 * returns under row-level security. It never links, replies, files or contacts anyone.
 */
import { z } from "zod";
import { saveDraft } from "@/lib/ai/drafts";
import { clientRef, findClient, notYours } from "@/lib/clients/ai-tools";
import { addDays } from "@/lib/deadlines/dates";
import { defineTool, ToolRefusal } from "@/lib/mcp/tool";
import type { Queryable } from "@/lib/mcp/types";
import { BIR_MAIL_KINDS, NOTICE_LABELS, URGENT_NOTICES, respondBy, type BirMailKind, type NoticeType } from "./classify";

const CLERK = ["bir_mail_clerk"] as const;
export const BIR_MAIL_DRAFT = "bir_mail_match";

const mailId = z.string().uuid("Give the BIR mail's id (from bir_mail_to_match).");
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD.");
const manilaDay = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);

interface MailRow extends Record<string, unknown> {
  id: string;
  received_at: Date;
  from_address: string;
  subject: string;
  body_text: string;
  kind: BirMailKind;
  notice_type: NoticeType | null;
  tins: string[];
  attachments: { file_name: string; mime_type: string; size: number }[];
  status: string;
  client_id: string | null;
  filing_instance_id: string | null;
}

async function loadMail(db: Queryable, id: string): Promise<MailRow> {
  const { rows } = await db.query<MailRow>(`select * from public.ai_bir_mail_message($1)`, [id]);
  if (!rows[0]) throw new ToolRefusal(`No BIR mail ${id} waiting to be matched (or it is linked to a client not yours).`);
  return rows[0];
}

export const birMailToMatch = defineTool({
  name: "bir_mail_to_match",
  title: "BIR mail to match",
  description:
    "BIR emails in the firm's mailbox not yet linked to a client, newest first: received date, sender, subject, a snippet, what the app thinks it is (filing confirmation, eSubmission reply, payment confirmation, notice and which), the TINs it names and how many attachments. Mail you already proposed a match for (open, accepted or rejected) is left out and only counted; pass include_proposed to list it too.",
  input: z.object({
    limit: z.number().int().min(1).max(200).default(50).describe("At most this many emails"),
    include_proposed: z.boolean().default(false).describe("Also list mail you already proposed a match for"),
  }),
  employees: CLERK,
  effect: "read",
  async run({ db }, { limit, include_proposed }) {
    const { rows } = await db.query<{
      id: string; received_at: Date; from_address: string; subject: string; snippet: string; kind: BirMailKind;
      notice_type: NoticeType | null; tins: string[]; attachment_count: number; my_proposal: string | null;
    }>(`select * from public.ai_bir_mail($1, $2)`, [include_proposed, limit]);
    const { rows: n } = await db.query<{ n: number }>(`select count(*)::int as n from public.ai_bir_mail(true, 200) where my_proposal is not null`);
    return {
      already_proposed: n[0]?.n ?? 0,
      mail: rows.map((r) => ({
        id: r.id,
        received_on: manilaDay(new Date(r.received_at)),
        from: r.from_address,
        subject: r.subject,
        snippet: r.snippet,
        looks_like: BIR_MAIL_KINDS[r.kind],
        kind: r.kind,
        notice: r.notice_type ? NOTICE_LABELS[r.notice_type] : null,
        urgent: r.notice_type ? URGENT_NOTICES.includes(r.notice_type) : false,
        tins: r.tins,
        attachments: r.attachment_count,
        my_proposal: r.my_proposal ?? "none",
      })),
    };
  },
});

export const readBirMail = defineTool({
  name: "read_bir_mail",
  title: "Read a BIR email",
  description:
    "One BIR email: its full text, its attachments (name, type, size), what the app thinks it is, and for a notice the deadline to answer worked out from its text. Also the clients of yours whose TIN it names, and their returns due within four months either side of when it arrived (marking the ones whose form the email mentions), to propose the match.",
  input: z.object({ mail_id: mailId }),
  employees: CLERK,
  effect: "read",
  async run({ db, noteClient }, { mail_id }) {
    const m = await loadMail(db, mail_id);
    const received = manilaDay(new Date(m.received_at));
    const text = `${m.subject}\n${m.body_text}`;
    const { rows: clients } = await db.query<{ id: string; code: string; name: string; tin: string | null }>(
      `select id, code, name, tin from public.clients where tin is not null and left(tin, 11) = any ($1::text[]) order by code`,
      [m.tins],
    );
    for (const c of clients) noteClient(c.id);
    const { rows: filings } = clients.length
      ? await db.query<{ id: string; client_code: string; form: string; period_label: string; due_date: string; status: string }>(
          `select f.id, c.code as client_code, f.form, f.period_label, f.due_date::text, f.status
           from public.filing_instances f join public.clients c on c.id = f.client_id
           where f.client_id = any ($1::uuid[]) and f.due_date between $2::date and $3::date
           order by abs(f.due_date - $4::date), c.code, f.form
           limit 25`,
          [clients.map((c) => c.id), addDays(received, -120), addDays(received, 120), received],
        )
      : { rows: [] };
    const lower = text.toLowerCase();
    return {
      mail: {
        id: m.id,
        received_on: received,
        from: m.from_address,
        subject: m.subject,
        text: m.body_text,
        attachments: m.attachments,
        looks_like: BIR_MAIL_KINDS[m.kind],
        kind: m.kind,
        notice: m.notice_type ? { type: m.notice_type, label: NOTICE_LABELS[m.notice_type], urgent: URGENT_NOTICES.includes(m.notice_type) } : null,
        respond_by: m.kind === "notice" ? respondBy(m.body_text, received) : null,
        status: m.status,
      },
      tins: m.tins,
      candidate_clients: clients.map((c) => ({ id: c.id, code: c.code, name: c.name, tin: c.tin })),
      candidate_returns: filings.map((f) => ({ ...f, form_mentioned: lower.includes(f.form.toLowerCase()) })),
      note: clients.length ? undefined : "None of your clients has a TIN named in this email. Match by the name in the text, or leave it for the Owner.",
    };
  },
});

const MESSAGE_KINDS = ["filing_confirmation", "esubmission_reply", "payment_confirmation", "notice", "other"] as const;
const NOTICE_TYPES = Object.keys(NOTICE_LABELS) as [NoticeType, ...NoticeType[]];

export const proposeBirMailMatch = defineTool({
  name: "propose_bir_mail_match",
  title: "Propose a match for a BIR email",
  description:
    "Save your proposal for one BIR email as a draft for the Owner and the client's staff: the client it is about, the return (if it is about one), what it is, and for a notice its type, date and deadline to answer (worked out from the text when you leave it out). LOA, PAN, FAN, FLD and subpoena are urgent: the Owner is told at once. A person accepts it, which links the email; nothing changes until then. A new proposal for the same email and client replaces your earlier one. Give your reason.",
  input: z.object({
    mail_id: mailId,
    client: clientRef.describe("The client the email is about (id or code)"),
    filing_id: z.string().uuid().optional().describe("The return it is about (from read_bir_mail's candidate_returns), if any"),
    message_kind: z.enum(MESSAGE_KINDS).describe("What the email is"),
    notice_type: z.enum(NOTICE_TYPES).optional().describe("For a notice: which one"),
    notice_date: isoDate.optional().describe("For a notice: the date on it, YYYY-MM-DD"),
    respond_by: isoDate.optional().describe("For a notice: the deadline to answer, YYYY-MM-DD"),
    reason: z.string().trim().min(10, "Explain your match in a sentence or two.").max(1000).describe("Why, for the reviewer"),
  }),
  employees: CLERK,
  effect: "draft",
  async run({ db, noteClient }, input) {
    const m = await loadMail(db, input.mail_id);
    if (m.status !== "unmatched") throw new ToolRefusal(`This BIR email is already ${m.status === "matched" ? "linked" : "set aside"}.`);
    const c = await findClient(db, input.client);
    if (!c) throw notYours(input.client);
    noteClient(c.id);
    let filing: { id: string; form: string; period_label: string } | null = null;
    if (input.filing_id) {
      const { rows } = await db.query<{ id: string; form: string; period_label: string }>(
        `select id, form, period_label from public.filing_instances where id = $1 and client_id = $2`,
        [input.filing_id, c.id],
      );
      if (!rows[0]) throw new ToolRefusal(`No return ${input.filing_id} for ${c.code}.`);
      filing = rows[0];
    }
    const isNotice = input.message_kind === "notice";
    if (isNotice && !input.notice_type) throw new ToolRefusal("For a notice, say which one (notice_type).");
    if (!isNotice && (input.notice_type || input.notice_date || input.respond_by)) throw new ToolRefusal("notice_type, notice_date and respond_by are for notices only.");
    const noticeType = isNotice ? input.notice_type! : null;
    const respond = isNotice ? (input.respond_by ?? respondBy(m.body_text, input.notice_date ?? manilaDay(new Date(m.received_at)))) : null;
    const urgency = noticeType && URGENT_NOTICES.includes(noticeType) ? "high" : "normal";
    const summary = [
      { label: "Email", value: `${m.subject || "(no subject)"} · ${manilaDay(new Date(m.received_at))}` },
      { label: "From", value: m.from_address },
      { label: "Client", value: `${c.code} ${c.name}` },
      ...(filing ? [{ label: "Return", value: `${filing.form} ${filing.period_label}` }] : []),
      { label: "What it is", value: noticeType ? NOTICE_LABELS[noticeType] : BIR_MAIL_KINDS[input.message_kind] },
      ...(input.notice_date ? [{ label: "Notice date", value: input.notice_date }] : []),
      ...(isNotice ? [{ label: "Answer by", value: respond ?? "Not stated: read the notice" }] : []),
      ...(urgency === "high" ? [{ label: "Urgency", value: "High: the Owner was told" }] : []),
      ...(m.attachments.length ? [{ label: "Attachments", value: m.attachments.map((a) => a.file_name).join(", ") }] : []),
    ];
    const saved = await saveDraft(db, {
      kind: BIR_MAIL_DRAFT,
      clientId: c.id,
      subject: { table: "bir_mail", id: m.id },
      summary,
      data: {
        mail_id: m.id,
        filing_id: filing?.id ?? null,
        message_kind: input.message_kind,
        notice_type: noticeType,
        notice_label: noticeType ? NOTICE_LABELS[noticeType] : null,
        notice_date: input.notice_date ?? null,
        respond_by: respond,
        urgency,
      },
      note: input.reason,
    });
    return { saved: true, draft_id: saved.id, urgency, respond_by: respond, note: "A person accepts or rejects it; accepting links the email. Nothing changed." };
  },
});
