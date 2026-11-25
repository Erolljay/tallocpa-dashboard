export const filingStatusLabel: Record<string, string> = {
  not_started: "Not started",
  prepared: "Prepared",
  reviewed: "Reviewed",
  client_approved: "Client approved",
  owner_approved: "Approved",
  filed: "Filed & paid",
};

export const filingStatusTone = {
  not_started: "neutral",
  prepared: "progress",
  reviewed: "progress",
  client_approved: "progress",
  owner_approved: "progress",
  filed: "done",
} as const;

/** Statuses where the return has been filed with BIR (Filed & paid, the last of the five steps). */
export const FILED = ["filed"];

/** eSubmission of a return's DAT attachments (decision 15). */
export type EsubmissionState = "not_required" | "not_sent" | "sent" | "validated" | "errors";

export const esubmissionLabel: Record<EsubmissionState, string> = {
  not_required: "No DAT attachments",
  not_sent: "Not sent",
  sent: "Sent, waiting for the BIR",
  validated: "Validated",
  errors: "Errors: fix and resend",
};

export const esubmissionTone = {
  not_required: "neutral",
  not_sent: "waiting",
  sent: "progress",
  validated: "done",
  errors: "blocked",
} as const;

const fmt = new Intl.DateTimeFormat("en-PH", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
export const showDate = (iso: string) => fmt.format(new Date(`${iso}T00:00:00Z`));
