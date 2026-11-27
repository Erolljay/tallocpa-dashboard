/**
 * Requests & tickets: who must act next, worded for whoever is looking.
 * A request goes to the client (the firm asks); a ticket comes from the client.
 * "open" means waiting on the side that must act: the client for a request, the
 * firm for a ticket. "answered" means the other side has replied.
 */
export type Direction = "to_client" | "from_client";
export type RequestStatus = "open" | "answered" | "closed";
type Tone = "neutral" | "progress" | "done" | "waiting" | "blocked";

export function statusFor(viewer: "firm" | "client", direction: Direction, status: RequestStatus): { label: string; tone: Tone; actionNeeded: boolean } {
  if (status === "closed") return { label: "Closed", tone: "done", actionNeeded: false };
  const clientMustAct = (direction === "to_client") === (status === "open");
  if (viewer === "client") {
    return clientMustAct
      ? { label: direction === "to_client" ? "Needs your reply" : "Answered", tone: direction === "to_client" ? "waiting" : "progress", actionNeeded: direction === "to_client" }
      : { label: direction === "to_client" ? "Sent to us" : "Waiting on us", tone: "neutral", actionNeeded: false };
  }
  return clientMustAct
    ? { label: direction === "to_client" ? "Waiting on client" : "Answered", tone: direction === "to_client" ? "waiting" : "neutral", actionNeeded: false }
    : { label: direction === "to_client" ? "Client replied" : "Needs our reply", tone: "progress", actionNeeded: true };
}

export const REQUEST_FILE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heif",
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};
export const REQUEST_FILE_MAX = 20 * 1024 * 1024;

/**
 * Standing monthly requests (migration 20270101000201): the setting staff switch on per
 * client, and the kind of each month's request.
 */
export type StandingSetting = "arap_update" | "bank_statements";
export type StandingKind = "arap_update" | "bank_statement";

export const STANDING_SETTINGS: Record<StandingSetting, { label: string; hint: string }> = {
  arap_update: {
    label: "Monthly AR/AP update",
    hint: "Collections from customers and payments to suppliers on charge sales and purchases.",
  },
  bank_statements: {
    label: "Bank statements",
    hint: "One a month for each bank account in the books, or for the accounts you list.",
  },
};

/** What the client is asked to do, in their words. */
export const STANDING_ASK: Record<StandingKind, string> = {
  arap_update:
    "Upload the AR/AP update for the month: what each customer paid you on charge invoices, and what you paid each supplier on charge purchases (with the date, the bank or cash account and the OR, deposit or check number). If nothing was collected or paid, say so below.",
  bank_statement: "Upload the bank statement for the month (PDF or a clear photo of every page).",
};

/** Open standing requests, as a short list for the month checklist: "AR/AP update", "Bank statement: BDO". */
export function standingLine(r: { standing_kind: StandingKind; subject: string }): string {
  const name = r.subject.includes(": ") ? r.subject.slice(r.subject.indexOf(": ") + 2) : "";
  return r.standing_kind === "arap_update" ? "AR/AP update" : name ? `Bank statement: ${name}` : "Bank statements";
}
