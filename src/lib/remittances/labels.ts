/**
 * SSS, PhilHealth and Pag-IBIG remittances (migrations 20261216000002 and 20261216000003),
 * run like a return from the posted payroll: Not started → Prepared (PRN) → Approved →
 * Remitted (or Not required).
 */
import { CONTRIBUTIONS, type Contribution } from "@/lib/collections/collections";

export type RemittanceKind = Contribution;
export type Agency = "sss" | "philhealth" | "pagibig";
export type RemittanceStatus = "not_started" | "prepared" | "approved" | "remitted" | "not_required";
export type RemittanceFileKind = "report" | "prn" | "proof";

export const AGENCIES: Record<Agency, { name: string; report: string; number: string }> = {
  sss: { name: "SSS", report: "R-3 / contribution collection list", number: "SSS employer number" },
  philhealth: { name: "PhilHealth", report: "RF-1 / employer remittance report", number: "PhilHealth employer number (PEN)" },
  pagibig: { name: "Pag-IBIG", report: "MCRF / membership contribution remittance form", number: "Pag-IBIG employer ID" },
};
export const AGENCY_KEYS = Object.keys(AGENCIES) as Agency[];
export function isAgency(v: string): v is Agency {
  return Object.hasOwn(AGENCIES, v);
}

export const REMITTANCE_KINDS = CONTRIBUTIONS;
export const KIND_ORDER: RemittanceKind[] = ["sss", "sss_loan", "philhealth", "pagibig", "pagibig_loan"];
export const isLoan = (k: RemittanceKind) => k === "sss_loan" || k === "pagibig_loan";
export const agencyOf = (k: RemittanceKind): Agency => (k === "sss_loan" ? "sss" : k === "pagibig_loan" ? "pagibig" : k);

/** What the report attached at Prepared is called for this kind. */
export function reportName(k: RemittanceKind): string {
  if (k === "sss_loan") return "SSS loan collection list (ML-2)";
  if (k === "pagibig_loan") return "Pag-IBIG STL remittance schedule";
  return AGENCIES[agencyOf(k)].report;
}

type Tone = "neutral" | "progress" | "done" | "waiting" | "blocked";

export const STATUS_LABELS: Record<RemittanceStatus, string> = {
  not_started: "Not started",
  prepared: "Prepared",
  approved: "Approved: to remit",
  remitted: "Remitted",
  not_required: "Not required",
};

/** The status as a badge, red once an open remittance is past its due date. */
export function remittanceBadge(status: RemittanceStatus, dueDate: string, today: string): { label: string; tone: Tone } {
  const late = dueDate < today && (status === "not_started" || status === "prepared" || status === "approved");
  const tone: Tone = late ? "blocked" : status === "remitted" ? "done" : status === "not_required" ? "neutral" : status === "approved" ? "waiting" : status === "prepared" ? "progress" : "neutral";
  return { label: late ? `${STATUS_LABELS[status]} · overdue` : STATUS_LABELS[status], tone };
}

export const FILE_KINDS: Record<RemittanceFileKind, string> = {
  report: "Agency report (optional)",
  prn: "PRN from the agency's site",
  proof: "Proof of payment",
};

/** The work queues on the Remittances page. */
export const QUEUES = {
  open: { label: "Open", statuses: ["not_started", "prepared", "approved"] },
  prepare: { label: "To prepare", statuses: ["not_started"] },
  approve: { label: "To approve", statuses: ["prepared"] },
  remit: { label: "To remit", statuses: ["approved"] },
  done: { label: "Remitted", statuses: ["remitted", "not_required"] },
} as const satisfies Record<string, { label: string; statuses: readonly RemittanceStatus[] }>;
export type Queue = keyof typeof QUEUES;
export function isQueue(v: string): v is Queue {
  return Object.hasOwn(QUEUES, v);
}

/** How the agency sets the deadline, in words (matches private.remittance_statutory_due). */
export function deadlineRule(k: RemittanceKind, employerNumber: string | null, registeredName: string | null): string {
  const a = agencyOf(k);
  if (a === "sss") return "Last day of the following month.";
  if (a === "philhealth") {
    const digit = (employerNumber ?? "").replace(/\D/g, "").slice(-1);
    if (!digit) return "15th or 20th of the following month, by the last digit of the PEN.";
    return Number(digit) >= 5 ? `20th of the following month (PEN ends in ${digit}).` : `15th of the following month (PEN ends in ${digit}).`;
  }
  const letter = (registeredName ?? "").replace(/[^A-Za-z]/g, "").slice(0, 1).toUpperCase();
  if (!letter) return "By the first letter of the employer's name: A–D the 14th, E–L the 19th, M–Q the 24th, R–Z the last day of the following month.";
  const when = letter <= "D" ? "14th" : letter <= "L" ? "19th" : letter <= "Q" ? "24th" : "last day";
  return `${when === "last day" ? "Last day" : when} of the following month (employer name starts with ${letter}).`;
}

/** "November 2026" for a month's first day (YYYY-MM-DD) or YYYY-MM. */
export function monthLabel(month: string): string {
  return new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${month.slice(0, 7)}-01T00:00:00Z`));
}
