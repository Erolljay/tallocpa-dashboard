export const filingStatusLabel: Record<string, string> = {
  not_started: "Not started",
  prepared: "Prepared",
  reviewed: "Reviewed",
  client_approved: "Client approved",
  owner_approved: "Approved",
  filed: "Filed",
  paid: "Paid",
  proof_uploaded: "Done",
};

export const filingStatusTone = {
  not_started: "neutral",
  prepared: "progress",
  reviewed: "progress",
  client_approved: "progress",
  owner_approved: "progress",
  filed: "done",
  paid: "done",
  proof_uploaded: "done",
} as const;

/** Statuses where the return has been filed with BIR. */
export const FILED = ["filed", "paid", "proof_uploaded"];

const fmt = new Intl.DateTimeFormat("en-PH", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
export const showDate = (iso: string) => fmt.format(new Date(`${iso}T00:00:00Z`));
