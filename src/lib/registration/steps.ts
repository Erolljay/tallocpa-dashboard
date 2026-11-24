/**
 * Business Registration (Phase 1C, spec §2): the checklist of agency steps to
 * register a new business. The steps depend on the kind of business (DTI for a
 * sole proprietorship, SEC for partnerships and corporations), whether the firm
 * handles the barangay and mayor's permit for the client, and whether the
 * business will have employees (SSS, PhilHealth and Pag-IBIG employer
 * registration).
 *
 * The list is worked out here and saved with the case (open_registration_case),
 * so a later change to these templates does not change open cases.
 */
import type { TaxpayerType } from "@/lib/clients/obligations";

export const AGENCIES = {
  dti: "DTI",
  sec: "SEC",
  barangay: "Barangay",
  lgu: "City Hall",
  bir: "BIR",
  sss: "SSS",
  philhealth: "PhilHealth (PHIC)",
  pagibig: "Pag-IBIG (HDMF)",
} as const;
export type Agency = keyof typeof AGENCIES;

export const STEP_STATUSES = {
  pending: "Not started",
  in_progress: "In progress",
  waiting_client: "Waiting on client",
  waiting_agency: "Waiting on agency",
  done: "Done",
  not_applicable: "Not needed",
} as const;
export type StepStatus = keyof typeof STEP_STATUSES;

export interface StepTemplate {
  code: string;
  agency: Agency;
  label: string;
  /** What the reference number is called on this step's certificate or permit. */
  referenceLabel: string;
}

export interface PlannedStep extends StepTemplate {
  sortOrder: number;
  status: Extract<StepStatus, "pending" | "not_applicable">;
  notes: string | null;
}

export interface RegistrationOptions {
  /** The firm handles the barangay clearance and mayor's permit for the client. */
  lguServed: boolean;
  /** The business will hire employees: SSS, PhilHealth and Pag-IBIG employer registration. */
  employer: boolean;
}

/** Individuals register a business name with DTI; everyone else registers with SEC. */
export const registersWithSec = (t: TaxpayerType) => t !== "individual";

/** BIR registration form: 1901 for individuals (sole proprietors, professionals), 1903 for juridical persons. */
export const birForm = (t: TaxpayerType) => (t === "individual" ? "1901" : "1903");

function templates(t: TaxpayerType): StepTemplate[] {
  const sec: StepTemplate[] = [
    { code: "sec_name", agency: "sec", label: "Name verification and reservation (eSPARC)", referenceLabel: "Reservation no." },
    {
      code: "sec_registration",
      agency: "sec",
      label: t === "non_stock" ? "Certificate of Incorporation (non-stock)" : t === "partnership" ? "Certificate of Recording (partnership)" : "Certificate of Incorporation",
      referenceLabel: "SEC registration no.",
    },
  ];
  const dti: StepTemplate[] = [{ code: "dti_business_name", agency: "dti", label: "Business name registration (BNRS)", referenceLabel: "Certificate no." }];
  return [
    ...(registersWithSec(t) ? sec : dti),
    { code: "barangay_clearance", agency: "barangay", label: "Barangay business clearance", referenceLabel: "Clearance no." },
    { code: "mayors_permit", agency: "lgu", label: "Mayor's / business permit", referenceLabel: "Permit no." },
    { code: "bir_registration", agency: "bir", label: `Registration through ORUS (Form ${birForm(t)})`, referenceLabel: "ORUS application no." },
    { code: "bir_cor", agency: "bir", label: "Certificate of Registration (Form 2303)", referenceLabel: "TIN" },
    { code: "bir_books", agency: "bir", label: "Books of accounts registered", referenceLabel: "Reference no." },
    { code: "bir_invoices", agency: "bir", label: "Authority to Print and invoices", referenceLabel: "ATP no." },
    { code: "bir_efiling", agency: "bir", label: "Enrollment in eBIRForms / eFPS", referenceLabel: "Enrollment reference" },
    { code: "bir_display", agency: "bir", label: "COR and \"Ask for invoice\" notice displayed at the place of business", referenceLabel: "Reference" },
    { code: "sss_employer", agency: "sss", label: "Employer registration", referenceLabel: "SSS employer no." },
    { code: "philhealth_employer", agency: "philhealth", label: "Employer registration", referenceLabel: "PhilHealth employer no." },
    { code: "pagibig_employer", agency: "pagibig", label: "Employer registration", referenceLabel: "Pag-IBIG employer ID" },
  ];
}

const LGU_STEPS = new Set(["barangay_clearance", "mayors_permit"]);
const EMPLOYER_STEPS = new Set(["sss_employer", "philhealth_employer", "pagibig_employer"]);

/**
 * The steps for a new case, in order. Steps the firm does not handle are kept
 * (as "Not needed", with the reason) so staff can switch them on later.
 */
export function stepsFor(t: TaxpayerType, options: RegistrationOptions): PlannedStep[] {
  return templates(t).map((s, i) => {
    let notes: string | null = null;
    if (LGU_STEPS.has(s.code) && !options.lguServed) notes = "The client handles this.";
    if (EMPLOYER_STEPS.has(s.code) && !options.employer) notes = "No employees yet.";
    return { ...s, sortOrder: i + 1, status: notes ? "not_applicable" : "pending", notes };
  });
}

/** Payload for open_registration_case. */
export const stepsPayload = (steps: PlannedStep[]) =>
  steps.map((s) => ({ code: s.code, agency: s.agency, label: s.label, reference_label: s.referenceLabel, sort_order: s.sortOrder, status: s.status, notes: s.notes }));

export interface CaseStep {
  code: string;
  status: StepStatus;
  sortOrder: number;
}

/** Steps finished or not needed, out of all steps. */
export function progress(steps: readonly CaseStep[]) {
  const needed = steps.filter((s) => s.status !== "not_applicable");
  return { done: needed.filter((s) => s.status === "done").length, total: needed.length };
}

/** The first step in order that is not finished, or null when every step is done or not needed. */
export function nextStep<T extends CaseStep>(steps: readonly T[]): T | null {
  return [...steps].sort((a, b) => a.sortOrder - b.sortOrder).find((s) => s.status !== "done" && s.status !== "not_applicable") ?? null;
}

/** Who the case is waiting on, if anyone. */
export function waitingOn(steps: readonly CaseStep[]): "client" | "agency" | null {
  if (steps.some((s) => s.status === "waiting_client")) return "client";
  if (steps.some((s) => s.status === "waiting_agency")) return "agency";
  return null;
}

/* ------------------------------------------------------------ Routing slip */

export interface SlipStep extends CaseStep {
  /** Date the step was done (YYYY-MM-DD), when done. */
  doneOn: string | null;
}

export interface SlipRow<T extends SlipStep> {
  step: T;
  /** The file reached this step: the day the step before it was done, or the day the case opened. Null for steps not reached yet or not needed. */
  receivedOn: string | null;
  /** The day the step was done. */
  releasedOn: string | null;
  /** Days the file sat at this step: released − received, or today − received for the current step. */
  days: number | null;
  current: boolean;
}

const dayNumber = (d: string) => Math.round(Date.parse(`${d}T00:00:00Z`) / 86_400_000);
export const daysBetween = (from: string, to: string) => Math.max(0, dayNumber(to) - dayNumber(from));

/**
 * The case as a routing slip: the file moves from step to step in order. A step
 * receives the file when the step before it is done (steps not needed are
 * skipped), and releases it when it is done. Steps done out of order still show
 * their own dates. `today` and `openedOn` are YYYY-MM-DD.
 */
export function routingSlip<T extends SlipStep>(steps: readonly T[], openedOn: string, today: string): SlipRow<T>[] {
  const ordered = [...steps].sort((a, b) => a.sortOrder - b.sortOrder);
  const current = nextStep(ordered);
  let lastRelease = openedOn;
  let reached = true;
  return ordered.map((step) => {
    if (step.status === "not_applicable") return { step, receivedOn: null, releasedOn: null, days: null, current: false };
    const isCurrent = step === current;
    const done = step.status === "done" && step.doneOn !== null;
    const receivedOn = reached || done ? (done && step.doneOn! < lastRelease ? step.doneOn! : lastRelease) : null;
    const releasedOn = done ? step.doneOn : null;
    const days = receivedOn === null ? null : daysBetween(receivedOn, releasedOn ?? today);
    if (done && step.doneOn! > lastRelease) lastRelease = step.doneOn!;
    if (isCurrent) reached = false;
    return { step, receivedOn, releasedOn, days: isCurrent || done ? days : null, current: isCurrent };
  });
}

/** Total days from opening to today (or to the last step's release when everything is finished). */
export function daysOpen(steps: readonly SlipStep[], openedOn: string, today: string): number {
  if (nextStep(steps) === null) {
    const last = steps.map((s) => s.doneOn).filter((d): d is string => d !== null).sort().at(-1);
    return daysBetween(openedOn, last ?? today);
  }
  return daysBetween(openedOn, today);
}
