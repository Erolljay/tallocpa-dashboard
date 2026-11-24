/**
 * TINs as the parties directory keeps them (migration 20261123000016): the
 * 9-digit TIN dashed (123-456-789) plus a branch code stored as 5 digits
 * ("00000" = head office). BIR shows branch codes as 3 (COR) to 5 digits; the
 * DAT files take 4 (Owner's taxify extension: `tin9`, branch padded to 4).
 */
import { normalizeTin } from "@/lib/ocr/fields";

export const HEAD_OFFICE = "00000";

export interface ParsedTin {
  /** "123-456-789" */
  tin: string;
  /** Five digits, "00000" when none was given. */
  branch: string;
  /** Whether the input carried a branch code. */
  hasBranch: boolean;
}

/**
 * "123456789", "123-456-789-000", "123 456 789 00002" → TIN + branch; null when
 * there are not 9 digits (plus up to 5 branch digits) or the TIN is all zeros.
 */
export function parseTin(raw: string | null | undefined): ParsedTin | null {
  const dashed = normalizeTin(raw);
  if (!dashed) return null;
  const [a, b, c, rest] = dashed.split("-");
  if (`${a}${b}${c}` === "000000000") return null;
  return { tin: `${a}-${b}-${c}`, branch: rest ? rest.padStart(5, "0") : HEAD_OFFICE, hasBranch: Boolean(rest) };
}

/** A branch code typed on its own: 3–5 digits → 5 digits; blank → head office; anything else → null. */
export function normalizeBranch(raw: string | null | undefined): string | null {
  const v = (raw ?? "").trim();
  if (v === "") return HEAD_OFFICE;
  return /^\d{3,5}$/.test(v) ? v.padStart(5, "0") : null;
}

/** The directory key: "123-456-789-00000". */
export const partyKeyOf = (tin: string, branch: string) => `${tin}-${branch}`;

/** The directory key for a TIN as typed or read by OCR (no branch → head office); null when not a TIN. */
export function partyKey(raw: string | null | undefined): string | null {
  const p = parseTin(raw);
  return p ? partyKeyOf(p.tin, p.branch) : null;
}

/** First 9 digits, zero-padded (taxify `tin9`): what the DAT files carry. */
export function tin9(raw: string | null | undefined): string {
  return (raw ?? "").replace(/\D/g, "").substring(0, 9).padEnd(9, "0");
}

/** Four-digit branch for the DAT files (taxify pads to 4 and keeps the last 4): "00000" → "0000", "001" → "0001". */
export function branch4(branch: string | null | undefined): string {
  const d = (branch ?? "").replace(/\D/g, "");
  return (d || "0").padStart(4, "0").slice(-4);
}
