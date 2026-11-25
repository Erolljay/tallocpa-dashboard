/**
 * Documents reviewed per client with "Approve selected" (P1; docs/UX-REVIEW.md,
 * recommendation 13). Only a document OCR has read cleanly can be approved from
 * the list: every field read with confidence, no check warning, not from a prior
 * year. Anything else opens on its own page. Pure, so the list and the server
 * action agree.
 */
import { checkFields } from "@/lib/ocr/checks";
import { LOW_CONFIDENCE, type OcrConfidence, type OcrFields } from "@/lib/ocr/fields";

export interface Readiness {
  ready: boolean;
  /** Why it must be opened on its own, for the list. */
  reason: string | null;
}

export function bulkReadiness(
  e: { status: string; fields: OcrFields | null; confidence: OcrConfidence | null } | null,
  ctx: { today: string; priorYear: boolean; duplicate: boolean },
): Readiness {
  if (!e) return { ready: false, reason: "Not read yet" };
  if (e.status === "pending") return { ready: false, reason: "Reading…" };
  if (e.status !== "done") return { ready: false, reason: "OCR failed" };
  const low = Object.values(e.confidence ?? {}).filter((c) => c < LOW_CONFIDENCE).length;
  if (low) return { ready: false, reason: `${low} to check` };
  const issues = checkFields(e.fields ?? {}, { today: ctx.today, duplicateOf: ctx.duplicate ? "yes" : null, priorYear: ctx.priorYear });
  if (issues.length) return { ready: false, reason: issues[0].message };
  // Bank or card charges need their account chosen on the document's own page.
  if (Number(e.fields?.other_deduction ?? 0) > 0 && !e.fields?.other_deduction_account) return { ready: false, reason: "Choose the account for the other deduction" };
  return { ready: true, reason: null };
}

/** Where a document's account title came from (pending_document_accounts()). */
export type AccountSource = "chosen" | "history" | "preset" | "default" | "choose";

export const ACCOUNT_SOURCES: Record<AccountSource, { label: string; tone: "done" | "waiting" | "blocked"; hint: string }> = {
  chosen: { label: "Chosen", tone: "done", hint: "Chosen for this document." },
  history: { label: "This client's history", tone: "done", hint: "The account this client used for this supplier or customer before." },
  preset: { label: "Firm suggestion", tone: "waiting", hint: "The firm-wide preset for this supplier. Confirm it fits this client." },
  default: { label: "Default", tone: "waiting", hint: "The default for this kind of document. Confirm it." },
  choose: { label: "Choose", tone: "blocked", hint: "A new supplier, or a preset not in this client's chart: choose the account title." },
};

/** A title from this client's history (or chosen) can be approved as is; a suggestion must be confirmed or changed. */
export const needsConfirming = (source: AccountSource) => source === "preset" || source === "default" || source === "choose";
