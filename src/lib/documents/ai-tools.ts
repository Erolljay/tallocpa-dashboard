/**
 * The Document Clerk's connector tools (docs/AI-WORKFORCE.md §3, §7.2; build step 3).
 * It works the review queue: reads what clients sent and what OCR read, runs the app's
 * own checks, looks for duplicates and, at Full books access, the accounts the client
 * used before for the same supplier. What it suggests is saved as a draft for the
 * reviewer (ai_drafts); approving, posting and returning documents stay with staff.
 *
 * Reads go through row-level security as the AI employee (migration
 * 20270108000002_ai_document_clerk.sql): only its clients' documents, and the books
 * only at Full access.
 */
import { z } from "zod";
import { saveDraft } from "@/lib/ai/drafts";
import { clientRef, findClient, notYours } from "@/lib/clients/ai-tools";
import { CLIENT_DOC_TYPES, DOC_TYPES, showMonth, type DocType } from "@/lib/documents/labels";
import { defineTool, ToolRefusal } from "@/lib/mcp/tool";
import type { Queryable } from "@/lib/mcp/types";
import { checkFields } from "@/lib/ocr/checks";
import { LOW_CONFIDENCE, OCR_FIELDS, type OcrConfidence, type OcrFields } from "@/lib/ocr/fields";
import { parseTin } from "@/lib/parties/tin";

const CLERK = ["document_clerk"] as const;
/** Documents still waiting for staff: sent, not yet posted, returned or split. */
export const WAITING_STATUSES = ["received", "under_review"] as const;

const docId = z.string().uuid("Give the document's id (from documents_to_review).");

interface DocRow extends Record<string, unknown> {
  id: string;
  client_id: string;
  client_code: string;
  client: string;
  doc_type: string;
  period: string;
  document_month: string | null;
  late: boolean;
  prior_year: boolean;
  file_name: string;
  status: string;
  return_reason: string | null;
  client_reply: string | null;
  created_at: Date;
  ocr_status: string | null;
  fields: OcrFields | null;
  confidence: OcrConfidence | null;
  approved_fields: OcrFields | null;
  ocr_error: string | null;
}

/** One of the AI employee's clients' documents, or a refusal (not visible, or not there). */
async function loadDocument(db: Queryable, id: string): Promise<DocRow> {
  const { rows } = await db.query<DocRow>(
    `select d.id, d.client_id, c.code as client_code, c.name as client, d.doc_type, d.period::text, d.document_month::text,
            d.late, d.prior_year, d.file_name, d.status, d.return_reason, d.client_reply, d.created_at,
            x.status as ocr_status, x.fields, x.confidence, x.approved_fields, x.error as ocr_error
     from public.documents d join public.clients c on c.id = d.client_id
     left join public.extractions x on x.document_id = d.id
     where d.id = $1`,
    [id],
  );
  if (!rows[0]) throw new ToolRefusal(`No document ${id} among your clients' documents.`);
  return rows[0];
}

const lowConfidence = (c: OcrConfidence | null) => Object.entries(c ?? {}).filter(([, v]) => typeof v === "number" && v < LOW_CONFIDENCE).map(([k]) => k);
const fieldLabel = (k: string) => OCR_FIELDS.find((f) => f.key === k)?.label ?? k;
const typeLabel = (t: string) => DOC_TYPES[t as DocType] ?? t;
const manilaDay = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);

export const documentsToReview = defineTool({
  name: "documents_to_review",
  title: "Documents to review",
  description:
    "Your clients' documents still waiting for staff (received or under review), oldest first: client, type, period, file name, date sent, OCR status and how many fields OCR was unsure of. Documents you already suggested on (your suggestion is still open, or a reviewer accepted or rejected it) are left out and only counted, so each run works new documents; pass include_suggested to list them too. Optionally for one client.",
  input: z.object({
    client: clientRef.optional().describe("Only this client (id or code)"),
    limit: z.number().int().min(1).max(200).default(50).describe("At most this many documents"),
    include_suggested: z.boolean().default(false).describe("Also list documents you already suggested on"),
  }),
  employees: CLERK,
  effect: "read",
  async run({ db, noteClient }, { client, limit, include_suggested }) {
    let clientId: string | null = null;
    if (client) {
      const found = await findClient(db, client);
      if (!found) throw notYours(client);
      clientId = found.id;
      noteClient(found.id);
    }
    const { rows } = await db.query<{
      id: string;
      client_code: string;
      client: string;
      doc_type: string;
      period: string;
      file_name: string;
      status: string;
      created_at: Date;
      late: boolean;
      prior_year: boolean;
      ocr_status: string | null;
      confidence: OcrConfidence | null;
      approved: boolean;
      my_suggestion: string | null;
    }>(
      `with mine as (
         -- This AI employee's latest suggestion on each document (its own drafts only, by RLS).
         select distinct on (subject_id) subject_id, status
         from public.ai_drafts
         where ai_user_id = auth.uid() and subject_table = 'documents' and status <> 'withdrawn'
         order by subject_id, created_at desc
       )
       select d.id, c.code as client_code, c.name as client, d.doc_type, d.period::text, d.file_name, d.status, d.created_at,
              d.late, d.prior_year, x.status as ocr_status, x.confidence, (x.approved_at is not null) as approved,
              m.status as my_suggestion
       from public.documents d join public.clients c on c.id = d.client_id
       left join public.extractions x on x.document_id = d.id
       left join mine m on m.subject_id = d.id
       where d.status = any ($1::text[]) and ($2::uuid is null or d.client_id = $2)
         and ($4 or m.subject_id is null)
       order by d.created_at, d.id
       limit $3`,
      [[...WAITING_STATUSES], clientId, limit, include_suggested],
    );
    const { rows: counted } = include_suggested
      ? { rows: [{ n: 0 }] }
      : await db.query<{ n: number }>(
          `select count(*)::int as n
           from public.documents d
           where d.status = any ($1::text[]) and ($2::uuid is null or d.client_id = $2)
             and exists (select 1 from public.ai_drafts a
                         where a.ai_user_id = auth.uid() and a.subject_table = 'documents' and a.subject_id = d.id and a.status <> 'withdrawn')`,
          [[...WAITING_STATUSES], clientId],
        );
    return {
      already_suggested: include_suggested ? rows.filter((r) => r.my_suggestion).length : (counted[0]?.n ?? 0),
      documents: rows.map((r) => ({
        id: r.id,
        client_code: r.client_code,
        client: r.client,
        type: typeLabel(r.doc_type),
        doc_type: r.doc_type,
        period: r.period,
        file_name: r.file_name,
        status: r.status,
        sent_on: manilaDay(new Date(r.created_at)),
        late: r.late,
        prior_year: r.prior_year,
        ocr: r.ocr_status ?? "not read",
        unsure_fields: r.approved ? 0 : lowConfidence(r.confidence).length,
        my_suggestion: r.my_suggestion ?? "none",
      })),
    };
  },
});

export const readDocument = defineTool({
  name: "read_document",
  title: "Read a document",
  description:
    "One of your clients' documents: details, what OCR read (with the fields it was unsure of), the app's checks (TIN format, 12% VAT, totals, date), possible duplicates among the same client's documents, the supplier as the parties directory knows it, and, with Full books access, the accounts this client used before for the same supplier and its chart of accounts.",
  input: z.object({ document_id: docId }),
  employees: CLERK,
  effect: "read",
  async run({ db, caller, today, noteClient }, { document_id }) {
    const d = await loadDocument(db, document_id);
    noteClient(d.client_id);
    const fields = (d.approved_fields ?? d.fields ?? {}) as OcrFields;
    const tin = fields.party_tin ?? null;
    const number = fields.number ?? null;

    // Duplicates among the same client's other documents (approved figures first, else OCR's).
    const { rows: dupes } = await db.query<{ id: string; status: string; period: string; file_name: string; approved: boolean; reason: string }>(
      `select d.id, d.status, d.period::text, d.file_name, (x.approved_at is not null) as approved,
              case when $3::text is not null and $4::text is not null
                        and coalesce(x.approved_fields, x.fields)->>'party_tin' = $3 and coalesce(x.approved_fields, x.fields)->>'number' = $4
                   then 'same supplier TIN and document number' else 'same total and date' end as reason
       from public.documents d join public.extractions x on x.document_id = d.id
       where d.client_id = $1 and d.id <> $2 and d.status <> 'split'
         and (
           ($3::text is not null and $4::text is not null
             and coalesce(x.approved_fields, x.fields)->>'party_tin' = $3 and coalesce(x.approved_fields, x.fields)->>'number' = $4)
           or ($5::text is not null and $6::text is not null
             and coalesce(x.approved_fields, x.fields)->>'total' = $5 and coalesce(x.approved_fields, x.fields)->>'date' = $6)
         )
       order by d.created_at
       limit 10`,
      [d.client_id, d.id, tin, number, fields.total ?? null, fields.date ?? null],
    );
    const approvedDuplicate = dupes.find((x) => x.approved && x.reason.startsWith("same supplier")) ?? null;
    const issues = checkFields(fields, { today, duplicateOf: approvedDuplicate?.id ?? null, priorYear: d.prior_year, documentMonth: d.document_month });

    // The supplier, as the parties directory knows it (only parties linked to this AI employee's clients).
    const parsed = parseTin(tin);
    const party = parsed
      ? (
          await db.query<{ name: string; registered_address: string | null; vat_status: string }>(
            `select display_name as name, registered_address, vat_status from public.parties where tin = $1 and branch_code = $2 limit 1`,
            [parsed.tin, parsed.branch],
          )
        ).rows[0] ?? null
      : null;

    // Account history and the chart: readable only at Full books access (row-level security).
    const full = caller.booksLevel === "full";
    const history =
      full && tin
        ? (
            await db.query<{ code: string; name: string; times: number; last_period: string }>(
              `select la.code, la.name, count(*)::int as times, max(d.period)::text as last_period
               from public.documents d
               join public.extractions x on x.document_id = d.id
               join public.ledger_accounts la on la.id = d.ledger_account_id
               where d.client_id = $1 and d.id <> $2 and x.approved_fields->>'party_tin' = $3
               group by la.code, la.name
               order by times desc, last_period desc
               limit 5`,
              [d.client_id, d.id, tin],
            )
          ).rows
        : null;
    const chart = full
      ? (
          await db.query<{ code: string; name: string; type: string }>(
            `select code, name, type from public.ledger_accounts where client_id = $1 and control is null order by code limit 400`,
            [d.client_id],
          )
        ).rows
      : null;

    const unsure = d.approved_fields ? [] : lowConfidence(d.confidence);
    return {
      document: {
        id: d.id,
        client_code: d.client_code,
        client: d.client,
        type: typeLabel(d.doc_type),
        doc_type: d.doc_type,
        period: d.period,
        document_month: d.document_month,
        late: d.late,
        prior_year: d.prior_year,
        file_name: d.file_name,
        status: d.status,
        sent_on: manilaDay(new Date(d.created_at)),
        return_reason: d.return_reason,
        client_reply: d.client_reply,
      },
      reading: {
        ocr: d.ocr_status ?? "not read",
        error: d.ocr_error,
        approved: Boolean(d.approved_fields),
        fields: Object.fromEntries(Object.entries(fields).filter(([, v]) => v != null && v !== "")),
        unsure_fields: unsure.map((k) => ({ field: k, label: fieldLabel(k), confidence: (d.confidence ?? {})[k as keyof OcrConfidence] })),
      },
      checks: issues.map((i) => ({ field: i.field, label: fieldLabel(i.field), message: i.message })),
      possible_duplicates: dupes,
      supplier_in_directory: party,
      account_history: history ?? "Needs Full books access.",
      chart_of_accounts: chart ?? "Needs Full books access.",
    };
  },
});

const PERIOD = /^\d{4}-(0[1-9]|1[0-2])-01$/;

export const suggestDocumentReview = defineTool({
  name: "suggest_document_review",
  title: "Suggest a review",
  description:
    "Save your suggestion for one waiting document as a draft for the reviewer: the document type, the period (first of the month), the account to book it to (Full books access), that it duplicates another document, and/or a note to the client if it should go back. Give your reason. The reviewer accepts or rejects it; nothing changes until a person acts. A new suggestion for the same document replaces your earlier one.",
  input: z.object({
    document_id: docId,
    doc_type: z.enum(CLIENT_DOC_TYPES as [DocType, ...DocType[]]).optional().describe("Suggested document type"),
    period: z.string().regex(PERIOD, "Use the first of the month, YYYY-MM-01.").optional().describe("Suggested period, YYYY-MM-01"),
    account_code: z.string().trim().min(1).max(20).optional().describe("Suggested account code from the client's chart"),
    duplicate_of: docId.optional().describe("The document this one duplicates"),
    return_note: z.string().trim().min(5).max(600).optional().describe("Note to the client, if the document should be returned"),
    reason: z.string().trim().min(10, "Explain your suggestion in a sentence or two.").max(1000).describe("Why, for the reviewer"),
  }),
  employees: CLERK,
  effect: "draft",
  async run({ db, noteClient }, input) {
    const { document_id, doc_type, period, account_code, duplicate_of, return_note, reason } = input;
    if (!doc_type && !period && !account_code && !duplicate_of && !return_note) {
      throw new ToolRefusal("Suggest at least one thing: doc_type, period, account_code, duplicate_of or return_note.");
    }
    const d = await loadDocument(db, document_id);
    noteClient(d.client_id);
    if (!(WAITING_STATUSES as readonly string[]).includes(d.status)) {
      throw new ToolRefusal(`This document is ${d.status}; only documents still waiting for review take suggestions.`);
    }
    const summary: { label: string; value: string }[] = [{ label: "Document", value: `${d.file_name} (${typeLabel(d.doc_type)}, ${showMonth(d.period)})` }];
    const data: Record<string, unknown> = { document_id };
    if (doc_type) {
      summary.push({ label: "Type", value: doc_type === d.doc_type ? `${typeLabel(doc_type)} (as sent)` : `${typeLabel(doc_type)} (sent as ${typeLabel(d.doc_type)})` });
      data.doc_type = doc_type;
    }
    if (period) {
      summary.push({ label: "Period", value: period === d.period ? `${showMonth(period)} (as sent)` : `${showMonth(period)} (sent for ${showMonth(d.period)})` });
      data.period = period;
    }
    if (account_code) {
      const { rows } = await db.query<{ id: string; code: string; name: string }>(
        `select id, code, name from public.ledger_accounts where client_id = $1 and code = $2 limit 1`,
        [d.client_id, account_code],
      );
      if (!rows[0]) throw new ToolRefusal(`No account ${account_code} in ${d.client}'s chart, or your books access is not Full.`);
      summary.push({ label: "Account", value: `${rows[0].code} ${rows[0].name}` });
      data.account_code = rows[0].code;
      data.account_id = rows[0].id;
    }
    if (duplicate_of) {
      if (duplicate_of === document_id) throw new ToolRefusal("A document cannot duplicate itself.");
      const other = await loadDocument(db, duplicate_of);
      if (other.client_id !== d.client_id) throw new ToolRefusal("The duplicate must be one of the same client's documents.");
      summary.push({ label: "Duplicate of", value: `${other.file_name} (${typeLabel(other.doc_type)}, ${showMonth(other.period)}, ${other.status})` });
      data.duplicate_of = duplicate_of;
    }
    if (return_note) {
      summary.push({ label: "Note to the client", value: return_note });
      data.return_note = return_note;
    }
    const draft = await saveDraft(db, { kind: "document_review", clientId: d.client_id, subject: { table: "documents", id: document_id }, summary, data, note: reason });
    return { saved: true, draft_id: draft.id, status: draft.status, for_reviewer: summary };
  },
});
