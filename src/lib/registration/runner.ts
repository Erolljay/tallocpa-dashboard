/**
 * The Registration Runner's arithmetic (docs/AI-WORKFORCE.md §3; src/lib/registration/ai-tools.ts).
 * Pure: where a case's file is and how long it has sat there (the app's own routing slip),
 * which BIR registration form the case files, and that form's fields filled only from
 * what the app holds. A value the app does not hold is listed as missing, never guessed.
 */
import { taxpayerTypeLabel } from "@/lib/clients/labels";
import type { TaxpayerType } from "@/lib/clients/obligations";
import { daysTone } from "./slip";
import {
  AGENCIES,
  birForm,
  CASE_KINDS,
  daysOpen,
  progress,
  routingSlip,
  STEP_STATUSES,
  UPDATE_CHANGES,
  waitingOn,
  type Agency,
  type CaseKind,
  type StepStatus,
} from "./steps";

export interface RunnerStep {
  code: string;
  agency: Agency;
  label: string;
  status: StepStatus;
  sort_order: number;
  done_on: string | null;
  status_changed_at: string;
}

/** How long a file may sit at one step before it needs a follow-up, and before it is late (the routing slip's colours, src/lib/registration/slip.ts). */
export const FOLLOW_UP_DAYS = 7;
export const LATE_DAYS = 14;

export type HoldFlag = "late" | "follow_up" | null;

/** The flag for days at one step: over 14 is late, over 7 needs a follow-up (same as the slip). */
export function holdFlag(days: number | null): HoldFlag {
  if (days === null) return null;
  const tone = daysTone(days).tone;
  return tone === "blocked" ? "late" : tone === "waiting" ? "follow_up" : null;
}

/** Where the case is now: the current step, its office, days held there, days open, who it waits on. `openedOn` and `today` are YYYY-MM-DD. */
export function whereIsTheFile(steps: readonly RunnerStep[], openedOn: string, today: string) {
  const slipSteps = steps.map((s) => ({ ...s, sortOrder: s.sort_order, doneOn: s.done_on }));
  const slip = routingSlip(slipSteps, openedOn, today);
  const here = slip.find((r) => r.current) ?? null;
  const { done, total } = progress(slipSteps);
  return {
    current: here
      ? {
          code: here.step.code,
          office: AGENCIES[here.step.agency],
          label: here.step.label,
          status: STEP_STATUSES[here.step.status],
          days_held: here.days ?? 0,
        }
      : null,
    flag: holdFlag(here?.days ?? null),
    days_open: daysOpen(slipSteps, openedOn, today),
    progress: `${done} of ${total} steps`,
    waiting_on: waitingOn(slipSteps),
  };
}

export type BirRegistrationForm = "1901" | "1903" | "1905";

/**
 * The BIR registration form a case files: a new business or a branch registers on 1901
 * (individuals) or 1903 (everyone else); a BIR update or a closure files 1905. Other
 * kinds (renewal, SEC filings, certificates, employer registration) file none.
 */
export function formsFor(kind: CaseKind, t: TaxpayerType): BirRegistrationForm[] {
  if (kind === "new_business") return [birForm(t) as BirRegistrationForm];
  // The firm registers a new branch on Form 1903, sole proprietors included (Owner's
  // practice; a new business, even the owner's second, is a new_business case).
  if (kind === "branch") return ["1903"];
  if (kind === "bir_update" || kind === "closure") return ["1905"];
  return [];
}

export interface FormFacts {
  kind: CaseKind;
  effective_date: string | null;
  lgu: string | null;
  employer: boolean;
  details: { changes?: string[]; branch_name?: string } & Record<string, unknown>;
  client: {
    name: string;
    taxpayer_type: TaxpayerType;
    tin: string | null;
    rdo_code: string | null;
    registered_address: string | null;
    fiscal_year_end_month: number;
    book_type: string;
    tax_types: unknown[];
    registration_date: string | null;
  };
  steps: { code: string; status: StepStatus; reference_no: string | null; done_on: string | null }[];
}

export interface FormField {
  field: string;
  value: string | null;
  /** Where the value came from in the app, or why it is missing. */
  source: string;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const BOOKS: Record<string, string> = { manual: "Manual books", loose_leaf: "Loose-leaf books" };

const present = (v: string | null | undefined) => (v && v.trim() ? v.trim() : null);
const taxTypeName = (t: unknown) =>
  typeof t === "string" ? t : typeof t === "object" && t !== null ? String((t as Record<string, unknown>).name ?? (t as Record<string, unknown>).code ?? (t as Record<string, unknown>).form ?? "") : "";

/**
 * The form's fields from what the app holds. Personal details of an individual (birth
 * date, civil status, citizenship), the line of business and the start of operations
 * are not kept in the app, so they are always missing: the client supplies them.
 */
export function birFormFields(form: BirRegistrationForm, f: FormFacts): FormField[] {
  const c = f.client;
  const step = (code: string) => f.steps.find((s) => s.code === code && s.status === "done") ?? null;
  const ref = (code: string, what: string): FormField => {
    const s = step(code);
    return { field: what, value: present(s?.reference_no), source: s?.reference_no ? `Step "${code}", done ${s.done_on}` : `Step "${code}" not done yet` };
  };
  const held = (field: string, value: string | null | undefined, source: string, missing = "Not in the app"): FormField => {
    const v = present(value ?? null);
    return { field, value: v, source: v ? source : missing };
  };
  const fiscal = c.fiscal_year_end_month === 12 ? "Calendar year (ends December)" : `Fiscal year ending ${MONTHS[c.fiscal_year_end_month - 1]}`;
  const taxTypes = (c.tax_types ?? []).map(taxTypeName).filter(Boolean).join(", ");

  const fields: FormField[] = [
    held(form === "1903" ? "Registered name" : form === "1905" ? "Registered name" : "Business / trade name", c.name, "Client record"),
    { field: "Kind of taxpayer", value: taxpayerTypeLabel[c.taxpayer_type] ?? c.taxpayer_type, source: "Client record" },
  ];

  if (form === "1905") {
    fields.push(held("TIN", c.tin, "Client record", "No TIN on the client record"));
    fields.push(held("RDO code", c.rdo_code, "Client record", "No RDO on the client record"));
    fields.push(held("Registered address", c.registered_address, "Client record", "No registered address on the client record"));
    if (f.kind === "closure") {
      fields.push({ field: "Purpose", value: "Cancellation of registration (closure of business)", source: "Case kind" });
      fields.push(held("Date the business stopped operating", f.effective_date, "Case"));
    } else {
      const changes = (f.details.changes ?? []).map((x) => UPDATE_CHANGES[x as keyof typeof UPDATE_CHANGES] ?? x);
      fields.push({ field: "Changes being filed", value: changes.length ? changes.join("; ") : null, source: changes.length ? "Case" : "No changes on the case" });
      fields.push(held("Effective date of the change", f.effective_date, "Case"));
      const has = (x: string) => (f.details.changes ?? []).includes(x);
      if (has("address") || has("rdo_transfer")) fields.push({ field: "New address", value: null, source: "The app keeps the current address only: get the new one from the client's lease or title" });
      if (has("rdo_transfer")) fields.push(ref("bir_rdo_transfer", "New RDO"));
      if (has("name")) fields.push({ field: "New registered / trade name", value: null, source: "Not in the app until the DTI or SEC step is done" });
      if (has("tax_types")) fields.push({ field: "Tax types after the change", value: null, source: "Not in the app until the updated COR is entered" });
      if (has("line_of_business")) fields.push({ field: "New line of business", value: null, source: "Not in the app" });
      if (taxTypes) fields.push({ field: "Tax types on the current COR", value: taxTypes, source: "Latest COR on the client" });
    }
    return fields;
  }

  // 1901 / 1903: a new business or a branch.
  if (f.kind === "branch") {
    fields.push(held("TIN (head office)", c.tin, "Client record", "No TIN on the client record"));
    fields.push(held("Branch name", f.details.branch_name ?? null, "Case"));
    fields.push({ field: "Branch address", value: null, source: "Not in the app: get it from the branch's lease or title" });
  } else {
    fields.push(held("TIN", c.tin, "Client record", "None yet: the BIR issues it on registration (or use the owner's existing TIN)"));
  }
  fields.push(held("Registered address", f.kind === "branch" ? null : c.registered_address, "Client record", f.kind === "branch" ? "Use the branch address" : "No registered address on the client record"));
  fields.push(held("City / municipality", f.lgu, "Case"));
  fields.push(held("RDO code", c.rdo_code, "Client record", "Not set: the RDO of the business address"));
  if (form === "1901") {
    fields.push(ref("dti_business_name", "DTI business name certificate no."));
    for (const x of ["Owner's full name (last, first, middle)", "Date of birth", "Civil status", "Citizenship"]) {
      fields.push({ field: x, value: null, source: "Not kept in the app: from the owner's ID" });
    }
  } else {
    fields.push(ref("sec_registration", "SEC registration no."));
    const sec = step("sec_registration");
    fields.push({ field: "Date of incorporation / registration", value: sec?.done_on ?? null, source: sec ? "Step \"sec_registration\" done date" : "Step \"sec_registration\" not done yet" });
  }
  fields.push(ref("mayors_permit", "Mayor's permit no."));
  fields.push({ field: "Line of business / industry", value: null, source: "Not in the app" });
  fields.push({ field: "Start of business operations", value: null, source: "Not in the app" });
  fields.push({ field: "Accounting period", value: fiscal, source: "Client record" });
  fields.push({ field: "Books of accounts", value: BOOKS[c.book_type] ?? c.book_type, source: "Client record" });
  fields.push({ field: "Will hire employees", value: f.employer ? "Yes" : "No", source: "Case" });
  return fields;
}

/** The case's name for people: kind, year, branch. */
export function caseTitle(kind: CaseKind, periodYear: number | null, details: { branch_name?: string }) {
  return `${CASE_KINDS[kind]}${periodYear ? ` ${periodYear}` : ""}${kind === "branch" && details.branch_name ? ` (${details.branch_name})` : ""}`;
}
