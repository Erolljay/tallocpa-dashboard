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
