/**
 * The Registration Runner's connector tools (docs/AI-WORKFORCE.md §3, §7.2; build step 6).
 *
 * It reads its clients' open registration cases through public.ai_registration_cases()
 * and public.ai_registration_case() (migration 20270110000002) and works out where each
 * file is with the app's own routing slip (src/lib/registration/steps.ts). It changes
 * nothing: the BIR registration form it fills and the requests it words for the client
 * are drafts on the case (ai_save_draft()) for staff to accept or reject. It never
 * submits anything to the BIR, the LGU, SEC or DTI, and never marks a step done; a staff
 * member sends accepted requests from the case page.
 */
import { z } from "zod";
import { saveDraft } from "@/lib/ai/drafts";
import { clientRef, findClient, notYours } from "@/lib/clients/ai-tools";
import type { TaxpayerType } from "@/lib/clients/obligations";
import { defineTool, ToolRefusal } from "@/lib/mcp/tool";
import type { Queryable } from "@/lib/mcp/types";
import { manilaDate } from "./slip";
import { AGENCIES, CASE_KINDS, STEP_STATUSES, type Agency, type CaseKind, type StepStatus } from "./steps";
import { birFormFields, caseTitle, formsFor, whereIsTheFile, type BirRegistrationForm, type FormFacts, type RunnerStep } from "./runner";

const RUNNER = ["registration_runner"] as const;

interface CaseListRow {
  id: string;
  kind: CaseKind;
  period_year: number | null;
  effective_date: string | null;
  lgu: string | null;
  target_date: string | null;
  opened_at: string;
  details: { branch_name?: string; changes?: string[] };
  client_id: string;
  client_code: string;
  client_name: string;
  taxpayer_type: TaxpayerType;
  steps: RunnerStep[];
}

interface CaseStepDetail extends RunnerStep {
  id: string;
  reference_label: string;
  reference_no: string | null;
  notes: string | null;
  files: { file_name: string; mime_type: string; added_on: string }[];
  requests: { subject: string; status: string; direction: string; created_at: string }[];
}

interface CaseDetail {
  id: string;
  kind: CaseKind;
  status: string;
  period_year: number | null;
  effective_date: string | null;
  lgu: string | null;
  lgu_served: boolean;
  employer: boolean;
  target_date: string | null;
  opened_at: string;
  details: FormFacts["details"];
  notes: string | null;
  client: FormFacts["client"] & { id: string; code: string; status: string };
  steps: CaseStepDetail[];
}

const caseId = z.string().uuid("Give the case's id (from registration_cases).");
const openedOn = (k: { opened_at: string }) => manilaDate(new Date(k.opened_at));

async function readCase(db: Queryable, id: string): Promise<CaseDetail> {
  try {
    const { rows } = await db.query<{ k: CaseDetail }>(`select public.ai_registration_case($1) as k`, [id]);
    return rows[0].k;
  } catch (e) {
    if ((e as { code?: string }).code === "42501") throw new ToolRefusal((e as Error).message);
    throw e;
  }
}

/** Steps still needed (not done, not marked not needed). */
const stillNeeded = (s: { status: StepStatus }) => s.status !== "done" && s.status !== "not_applicable";

export const registrationCases = defineTool({
  name: "registration_cases",
  title: "Open registration cases",
  description:
    "Your clients' open registration cases (new business, renewal, BIR update, branch, SEC filings, certificate, employer registration, closure), the file held longest at its current step first: where the file is now (step and office), how many days it has sat there, days open, progress, who it waits on, and a flag: 'late' over 14 days at one step, 'follow_up' over 7. Optionally for one client.",
  input: z.object({ client: clientRef.optional().describe("Only this client (id or code)") }),
  employees: RUNNER,
  effect: "read",
  async run({ db, today, noteClient }, { client }) {
    let only: string | null = null;
    if (client) {
      const found = await findClient(db, client);
      if (!found) throw notYours(client);
      only = found.id;
      noteClient(found.id);
    }
    const { rows } = await db.query<{ c: CaseListRow[] }>(`select public.ai_registration_cases() as c`);
    const cases = rows[0].c
      .filter((k) => !only || k.client_id === only)
      .map((k) => ({
        id: k.id,
        client_code: k.client_code,
        client: k.client_name,
        case: caseTitle(k.kind, k.period_year, k.details),
        kind: k.kind,
        lgu: k.lgu,
        opened_on: openedOn(k),
        target_date: k.target_date,
        ...whereIsTheFile(k.steps, openedOn(k), today),
      }))
      .sort((a, b) => (b.current?.days_held ?? -1) - (a.current?.days_held ?? -1));
    return {
      cases,
      late: cases.filter((c) => c.flag === "late").length,
      follow_up: cases.filter((c) => c.flag === "follow_up").length,
    };
  },
});

export const registrationCase = defineTool({
  name: "registration_case",
  title: "A registration case",
  description:
    "One of your clients' registration cases: the client facts a BIR form needs, every step in order (office, status, reference number, the day done, notes, days held, the names of the proof files on hand, requests already sent to the client on it), the steps still needed, and which BIR registration form the case files (1901, 1903, 1905 or none).",
  input: z.object({ case_id: caseId }),
  employees: RUNNER,
  effect: "read",
  async run({ db, today, noteClient }, { case_id }) {
    const k = await readCase(db, case_id);
    noteClient(k.client.id);
    const where = whereIsTheFile(k.steps, openedOn(k), today);
    return {
      case: {
        id: k.id,
        title: caseTitle(k.kind, k.period_year, k.details),
        kind: k.kind,
        status: k.status,
        lgu: k.lgu,
        firm_handles_permits: k.lgu_served,
        employer: k.employer,
        effective_date: k.effective_date,
        target_date: k.target_date,
        opened_on: openedOn(k),
        details: k.details,
        notes: k.notes,
      },
      client: {
        code: k.client.code,
        name: k.client.name,
        taxpayer_type: k.client.taxpayer_type,
        tin: k.client.tin,
        rdo_code: k.client.rdo_code,
        registered_address: k.client.registered_address,
        status: k.client.status,
      },
      ...where,
      steps: k.steps.map((s) => ({
        code: s.code,
        office: AGENCIES[s.agency as Agency],
        step: s.label,
        status: STEP_STATUSES[s.status],
        reference: s.reference_no ? `${s.reference_label}: ${s.reference_no}` : null,
        done_on: s.done_on,
        notes: s.notes,
        files_on_hand: s.files.map((f) => f.file_name),
        requests_to_client: s.requests.filter((r) => r.direction === "to_client").map((r) => ({ subject: r.subject, status: r.status })),
      })),
      still_needed: k.steps.filter(stillNeeded).map((s) => ({ code: s.code, office: AGENCIES[s.agency as Agency], step: s.label, status: STEP_STATUSES[s.status], files_on_hand: s.files.length })),
      bir_forms: formsFor(k.kind, k.client.taxpayer_type),
    };
  },
});

export const draftBirRegistrationForm = defineTool({
  name: "draft_bir_registration_form",
  title: "Draft the BIR registration form",
  description:
    "Fill the BIR registration form a case files (1901 for an individual's new business or branch, 1903 for a corporation's or partnership's, 1905 for a BIR update or a closure) from what the app holds only, and save it as a draft on the case for the preparer. Fields the app does not hold are listed as missing, never guessed. Nothing is submitted to the BIR.",
  input: z.object({
    case_id: caseId,
    form: z.enum(["1901", "1903", "1905"]).optional().describe("The form; defaults to the one the case files"),
    note: z.string().trim().min(10, "Say in a sentence or two what the preparer should know.").max(1000).describe("For the preparer: what to check, what to get from the client"),
  }),
  employees: RUNNER,
  effect: "draft",
  async run({ db, noteClient }, { case_id, form, note }) {
    const k = await readCase(db, case_id);
    noteClient(k.client.id);
    if (k.status !== "open") throw new ToolRefusal(`This case is ${k.status}; only open cases take drafts.`);
    const allowed = formsFor(k.kind, k.client.taxpayer_type);
    if (allowed.length === 0) throw new ToolRefusal(`A ${CASE_KINDS[k.kind]} case files no BIR registration form.`);
    const chosen: BirRegistrationForm = form ?? allowed[0];
    if (!allowed.includes(chosen)) throw new ToolRefusal(`This case files Form ${allowed.join(" or ")}, not ${chosen}.`);
    const fields = birFormFields(chosen, k);
    const missing = fields.filter((f) => f.value === null);
    const draft = await saveDraft(db, {
      kind: "bir_registration_form",
      clientId: k.client.id,
      subject: { table: "registration_cases", id: k.id },
      summary: [
        { label: "Form", value: `BIR Form ${chosen}` },
        ...fields.map((f) => ({ label: f.field, value: f.value ?? `Missing (${f.source})` })),
      ],
      data: { form: chosen, fields, missing: missing.map((f) => f.field) },
      note,
    });
    return { draft_id: draft.id, status: draft.status, form: chosen, filled: fields.length - missing.length, missing: missing.map((f) => f.field) };
  },
});

export const draftClientRequests = defineTool({
  name: "draft_client_requests",
  title: "Draft requests to the client",
  description:
    "Word what the client still has to provide for a case's open steps as requests to the client (one per item: the step's code, a short subject and the message), saved as a draft on the case. Staff accept and send them from the case page, as themselves; nothing reaches the client until then. A newer draft replaces your earlier one on the same case.",
  input: z.object({
    case_id: caseId,
    requests: z
      .array(
        z.object({
          step_code: z.string().trim().min(1).max(60).describe("The step the item is for (from registration_case)"),
          subject: z.string().trim().min(3, "Say what you need.").max(200),
          message: z.string().trim().max(2000).default("").describe("What exactly to send, and how (polite, specific)"),
          due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD.").optional(),
        }),
      )
      .min(1, "List at least one request.")
      .max(20),
    note: z.string().trim().min(10, "Say in a sentence or two why these are needed now.").max(1000),
  }),
  employees: RUNNER,
  effect: "draft",
  async run({ db, today, noteClient }, { case_id, requests, note }) {
    const k = await readCase(db, case_id);
    noteClient(k.client.id);
    if (k.status !== "open") throw new ToolRefusal(`This case is ${k.status}; only open cases take requests.`);
    const items = requests.map((r) => {
      const s = k.steps.find((x) => x.code === r.step_code);
      if (!s) throw new ToolRefusal(`No step "${r.step_code}" on this case.`);
      if (!stillNeeded(s)) throw new ToolRefusal(`Step "${r.step_code}" is ${STEP_STATUSES[s.status].toLowerCase()}; ask only for steps still needed.`);
      if (r.due_date && r.due_date < today) throw new ToolRefusal(`The due date ${r.due_date} has passed.`);
      const already = s.requests.find((q) => q.direction === "to_client" && q.status !== "closed" && q.subject.trim().toLowerCase() === r.subject.toLowerCase());
      if (already) throw new ToolRefusal(`The client already has an open request "${already.subject}" on step "${s.code}".`);
      return { step_code: s.code, step: s.label, office: AGENCIES[s.agency as Agency], subject: r.subject, message: r.message, due_date: r.due_date ?? null };
    });
    const draft = await saveDraft(db, {
      kind: "registration_requests",
      clientId: k.client.id,
      subject: { table: "registration_cases", id: k.id },
      summary: items.map((i, n) => ({
        label: `${n + 1}. ${i.office}`,
        value: `${i.subject}${i.due_date ? ` (by ${i.due_date})` : ""}${i.message ? `\n${i.message}` : ""}`,
      })),
      data: { requests: items },
      note,
    });
    return { draft_id: draft.id, status: draft.status, requests: items.length };
  },
});
