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
  bfp: "BFP (Fire)",
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

/* ----------------------------------------------- Renewals and closures */

/** The three kinds of case: registering a new business, the yearly renewal, and closing a business. */
export const CASE_KINDS = {
  new_business: "New business",
  renewal: "Annual renewal",
  bir_update: "BIR update (Form 1905)",
  branch: "New branch",
  closure: "Closing the business",
} as const;
export type CaseKind = keyof typeof CASE_KINDS;

export interface RenewalOptions {
  /** The firm handles the barangay clearance, mayor's permit, fire and sanitary permits. */
  lguServed: boolean;
  /** A sole proprietor's DTI business name is due for its 5-year renewal this year. */
  dtiDue: boolean;
}

/**
 * The yearly renewal, for the year the permits are for. The mayor's permit and
 * the permits that come with it are renewed in January (by the 20th in most
 * LGUs). Corporations file their SEC General Information Sheet; a sole
 * proprietor's DTI business name is renewed every five years. There is no BIR
 * annual registration fee since 2024 (RA 11976, EOPT).
 */
export function renewalStepsFor(t: TaxpayerType, options: RenewalOptions): PlannedStep[] {
  const list: StepTemplate[] = [
    { code: "barangay_clearance", agency: "barangay", label: "Barangay business clearance (renewal)", referenceLabel: "Clearance no." },
    { code: "fire_safety", agency: "bfp", label: "Fire Safety Inspection Certificate", referenceLabel: "FSIC no." },
    { code: "sanitary_permit", agency: "lgu", label: "Sanitary permit (City Health Office)", referenceLabel: "Permit no." },
    { code: "mayors_permit", agency: "lgu", label: "Mayor's / business permit renewal", referenceLabel: "Permit no." },
    ...(registersWithSec(t)
      ? [{ code: "sec_gis", agency: "sec" as const, label: "General Information Sheet filed", referenceLabel: "SEC filing reference" }]
      : [{ code: "dti_renewal", agency: "dti" as const, label: "Business name renewal (every 5 years)", referenceLabel: "Certificate no." }]),
    { code: "bir_books", agency: "bir", label: "Books of accounts for the new year (manual books registered, loose-leaf bound)", referenceLabel: "Reference no." },
    { code: "bir_display", agency: "bir", label: "Renewed permit and COR displayed at the place of business", referenceLabel: "Reference" },
  ];
  const lgu = new Set(["barangay_clearance", "fire_safety", "sanitary_permit", "mayors_permit"]);
  return list.map((s, i) => {
    let notes: string | null = null;
    if (lgu.has(s.code) && !options.lguServed) notes = "The client handles this.";
    if (s.code === "dti_renewal" && !options.dtiDue) notes = "Not due this year.";
    return { ...s, sortOrder: i + 1, status: notes ? "not_applicable" : "pending", notes };
  });
}

/** A DTI business name is valid for 5 years from registration: due in years registered + 5, + 10, and so on. */
export function dtiRenewalDue(registeredOn: string | null, year: number): boolean {
  if (!registeredOn) return false;
  const since = year - Number(registeredOn.slice(0, 4));
  return since > 0 && since % 5 === 0;
}

export interface ClosureOptions {
  /** The firm handles the barangay and City Hall closure. */
  lguServed: boolean;
  /** The business has employer numbers with SSS, PhilHealth and Pag-IBIG to close. */
  employer: boolean;
}

/**
 * Closing a business: barangay and City Hall retirement first (the BIR asks for
 * them), then BIR cancellation through Form 1905 with the final returns, the
 * unused invoices surrendered and the BIR's verification, then DTI cancellation
 * or SEC dissolution (SEC asks for the BIR tax clearance), and the employer
 * numbers.
 */
export function closureStepsFor(t: TaxpayerType, options: ClosureOptions): PlannedStep[] {
  const list: StepTemplate[] = [
    { code: "barangay_closure", agency: "barangay", label: "Barangay certificate of closure", referenceLabel: "Certificate no." },
    { code: "mayors_retirement", agency: "lgu", label: "Business retirement (closure of mayor's permit)", referenceLabel: "Retirement no." },
    { code: "bir_1905", agency: "bir", label: "Application for cancellation of registration (Form 1905)", referenceLabel: "Reference no." },
    { code: "bir_final_returns", agency: "bir", label: "Final returns filed (short-period income tax return, last percentage tax / VAT, withholding)", referenceLabel: "Reference no." },
    { code: "bir_invoices_surrender", agency: "bir", label: "Unused invoices and books surrendered; inventory list", referenceLabel: "Reference no." },
    { code: "bir_verification", agency: "bir", label: "BIR verification of open cases and tax clearance", referenceLabel: "Clearance no." },
    { code: "bir_cancelled", agency: "bir", label: "Registration cancelled (TIN inactive)", referenceLabel: "Reference no." },
    registersWithSec(t)
      ? { code: "sec_dissolution", agency: "sec", label: "Voluntary dissolution (Certificate of Dissolution)", referenceLabel: "SEC reference" }
      : { code: "dti_cancellation", agency: "dti", label: "Business name cancellation", referenceLabel: "Reference no." },
    { code: "sss_employer_closure", agency: "sss", label: "Employer closure / separation report", referenceLabel: "Reference no." },
    { code: "philhealth_employer_closure", agency: "philhealth", label: "Employer closure", referenceLabel: "Reference no." },
    { code: "pagibig_employer_closure", agency: "pagibig", label: "Employer closure", referenceLabel: "Reference no." },
  ];
  const lgu = new Set(["barangay_closure", "mayors_retirement"]);
  const employer = new Set(["sss_employer_closure", "philhealth_employer_closure", "pagibig_employer_closure"]);
  return list.map((s, i) => {
    let notes: string | null = null;
    if (lgu.has(s.code) && !options.lguServed) notes = "The client handles this.";
    if (employer.has(s.code) && !options.employer) notes = "No employer numbers.";
    return { ...s, sortOrder: i + 1, status: notes ? "not_applicable" : "pending", notes };
  });
}

/* ------------------------------------------------- BIR updates (1905) */

/** The changes a BIR update covers; several can be filed together on one Form 1905. */
export const UPDATE_CHANGES = {
  address: "Change of address (same city / RDO)",
  rdo_transfer: "Transfer to another city / RDO",
  tax_types: "Add or remove tax types (e.g. VAT registration)",
  name: "Change of business or trade name",
  line_of_business: "Change of line of business",
} as const;
export type UpdateChange = keyof typeof UPDATE_CHANGES;

export interface UpdateOptions {
  lguServed: boolean;
  /** The business has employer numbers whose records must follow a new name or address. */
  employer: boolean;
}

/**
 * The steps for a BIR update, from the changes filed. The DTI or SEC record and
 * the City Hall permit change first (the RDO asks for them), then Form 1905,
 * the transfer of records when the RDO changes, the updated COR, new invoices
 * when the name, address or tax type printed on them changes, and the books.
 */
export function updateStepsFor(t: TaxpayerType, changes: readonly UpdateChange[], options: UpdateOptions): PlannedStep[] {
  const c = new Set(changes);
  const moves = c.has("address") || c.has("rdo_transfer");
  const list: StepTemplate[] = [];
  if (registersWithSec(t)) {
    if (c.has("name") || c.has("rdo_transfer")) list.push({ code: "sec_amendment", agency: "sec", label: "Amended articles filed (name / principal office)", referenceLabel: "SEC reference" });
  } else if (c.has("name") || moves) {
    list.push({ code: "dti_amendment", agency: "dti", label: "Business name record amended (name / address)", referenceLabel: "Certificate no." });
  }
  if (moves) list.push({ code: "barangay_clearance", agency: "barangay", label: "Barangay clearance for the new address", referenceLabel: "Clearance no." });
  if (c.has("rdo_transfer")) {
    list.push({ code: "mayors_permit_new", agency: "lgu", label: "Mayor's permit in the new city / municipality", referenceLabel: "Permit no." });
    list.push({ code: "mayors_retirement_old", agency: "lgu", label: "Business retirement in the old city / municipality", referenceLabel: "Retirement no." });
  } else if (c.has("address") || c.has("name") || c.has("line_of_business")) {
    list.push({ code: "mayors_permit_amendment", agency: "lgu", label: "Mayor's permit amended", referenceLabel: "Permit no." });
  }
  list.push({ code: "bir_1905", agency: "bir", label: "Form 1905 filed (ORUS or the RDO)", referenceLabel: "Reference no." });
  if (c.has("rdo_transfer")) list.push({ code: "bir_rdo_transfer", agency: "bir", label: "Records transferred to the new RDO", referenceLabel: "New RDO" });
  list.push({ code: "bir_cor", agency: "bir", label: "Updated Certificate of Registration (Form 2303)", referenceLabel: "TIN" });
  if (c.has("name") || moves || c.has("tax_types")) {
    list.push({ code: "bir_invoices", agency: "bir", label: "New ATP and invoices; old invoices surrendered", referenceLabel: "ATP no." });
  }
  if (c.has("name") || c.has("rdo_transfer") || c.has("tax_types")) {
    list.push({ code: "bir_books", agency: "bir", label: "Books of accounts updated or registered", referenceLabel: "Reference no." });
  }
  list.push({ code: "bir_display", agency: "bir", label: "Updated COR displayed at the place of business", referenceLabel: "Reference" });
  if (c.has("name") || moves) {
    list.push({ code: "sss_employer_update", agency: "sss", label: "Employer record updated (name / address)", referenceLabel: "Reference no." });
    list.push({ code: "philhealth_employer_update", agency: "philhealth", label: "Employer record updated (name / address)", referenceLabel: "Reference no." });
    list.push({ code: "pagibig_employer_update", agency: "pagibig", label: "Employer record updated (name / address)", referenceLabel: "Reference no." });
  }
  return list.map((s, i) => {
    let notes: string | null = null;
    if ((s.agency === "lgu" || s.agency === "barangay") && !options.lguServed) notes = "The client handles this.";
    if (["sss", "philhealth", "pagibig"].includes(s.agency) && !options.employer) notes = "No employer numbers.";
    return { ...s, sortOrder: i + 1, status: notes ? "not_applicable" : "pending", notes };
  });
}

/* ------------------------------------------------------------- Branches */

export interface BranchOptions {
  lguServed: boolean;
}

/**
 * A new branch: its own barangay clearance and mayor's permit, and BIR
 * registration with the RDO where the branch is (a branch code on the TIN, its
 * own COR, books and invoices). A sole proprietor checks that the DTI business
 * name's territorial scope covers the branch; a corporation's branch needs no
 * SEC filing.
 */
export function branchStepsFor(t: TaxpayerType, options: BranchOptions): PlannedStep[] {
  const list: StepTemplate[] = [
    ...(registersWithSec(t) ? [] : [{ code: "dti_scope", agency: "dti" as const, label: "Business name scope covers the branch location", referenceLabel: "Certificate no." }]),
    { code: "barangay_clearance", agency: "barangay", label: "Barangay clearance for the branch", referenceLabel: "Clearance no." },
    { code: "mayors_permit", agency: "lgu", label: "Mayor's permit for the branch", referenceLabel: "Permit no." },
    { code: "bir_registration", agency: "bir", label: "Branch registered with the branch's RDO (ORUS)", referenceLabel: "Branch code" },
    { code: "bir_cor", agency: "bir", label: "Branch Certificate of Registration (Form 2303)", referenceLabel: "TIN with branch code" },
    { code: "bir_books", agency: "bir", label: "Books of accounts for the branch", referenceLabel: "Reference no." },
    { code: "bir_invoices", agency: "bir", label: "ATP and invoices for the branch", referenceLabel: "ATP no." },
    { code: "bir_display", agency: "bir", label: "Branch COR and notice displayed", referenceLabel: "Reference" },
  ];
  return list.map((s, i) => {
    const notes = (s.agency === "lgu" || s.agency === "barangay") && !options.lguServed ? "The client handles this." : null;
    return { ...s, sortOrder: i + 1, status: notes ? "not_applicable" : "pending", notes };
  });
}

/** Payload for open_registration_case and open_client_case. */
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
