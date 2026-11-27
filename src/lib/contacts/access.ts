/**
 * What a contact (a person on the client's side) may do for one business.
 * Mirrors client_users.access and private.client_guard() in
 * supabase/migrations/20270102000001_contact_access.sql: the database enforces it,
 * these helpers only decide what the portal shows.
 */
export const CONTACT_ACCESS = ["full", "uploader", "viewer"] as const;
export type ContactAccess = (typeof CONTACT_ACCESS)[number];

export const ACCESS_LABEL: Record<ContactAccess, string> = {
  full: "Full access",
  uploader: "Upload only",
  viewer: "View only",
};

export const ACCESS_HINT: Record<ContactAccess, string> = {
  full: "Approves returns, pays statements, decides on missing 2307s, uploads and answers requests.",
  uploader: "Uploads documents, answers requests, confirms the month and books meetings. Cannot approve or pay.",
  viewer: "Sees status, returns, reports and statements. Cannot upload, approve or pay.",
};

/** Badge tone per level on staff screens. */
export const ACCESS_TONE: Record<ContactAccess, "done" | "progress" | "neutral"> = { full: "done", uploader: "progress", viewer: "neutral" };

export function isContactAccess(v: unknown): v is ContactAccess {
  return typeof v === "string" && (CONTACT_ACCESS as readonly string[]).includes(v);
}

/** Upload, reply, confirm the month, book a meeting. */
export function canAct(access: ContactAccess | null | undefined): boolean {
  return access === "full" || access === "uploader";
}

/** Approve or query a return, pay a statement, keep or stop a 2307 claim. */
export function canApprove(access: ContactAccess | null | undefined): boolean {
  return access === "full";
}

/** The note a portal page shows in place of an action the contact may not take. */
export function accessNote(access: ContactAccess | null | undefined, what: "act" | "approve"): string {
  if (access === "viewer") return "Your access to this business is view only. Ask us if you need to upload or approve.";
  if (what === "approve") return "Your access to this business lets you upload and answer requests. Approving returns and paying are for its full-access contacts.";
  return "";
}
