/**
 * What the OCR reviewer should use for a document's party: the directory's
 * registered name and address when the TIN is on file, OCR's otherwise, and
 * whether OCR's reading disagrees with the directory (a warning to check).
 */
import { displayName, fullAddress, partyTinLabel, type Party } from "./format";

export interface ResolvedParty {
  /** Use these. */
  name: string | null;
  tin: string | null;
  address: string | null;
  from: "directory" | "ocr";
  party: Party | null;
  /** OCR read a name that is not the registered (or trade) name on file. */
  nameDiffers: boolean;
  /** OCR's name is the party's trade name, not its registered name. */
  isTradeName: boolean;
  addressDiffers: boolean;
  /** One sentence for the reviewer, or null when OCR agrees. */
  warning: string | null;
}

const ABBREVIATIONS: Record<string, string> = { INCORPORATED: "INC", CORPORATION: "CORP", COMPANY: "CO", LIMITED: "LTD", COOPERATIVE: "COOP", ENTERPRISES: "ENTERPRISE", PHILIPPINES: "PHILS", PHIL: "PHILS" };

/** Words of a name, upper case, abbreviations unified, order ignored ("Dela Cruz, Juan" = "Juan Dela Cruz"). */
function nameTokens(v: string): string {
  return v
    .toUpperCase()
    .replace(/[^A-Z0-9Ñ ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => ABBREVIATIONS[w] ?? w)
    .sort()
    .join(" ");
}
const squash = (v: string) => v.toUpperCase().replace(/[^A-Z0-9]/g, "");

export function sameName(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  return nameTokens(a) === nameTokens(b) || squash(a) === squash(b);
}

/** Addresses rarely match word for word; they differ only when neither contains the other once squashed. */
function sameAddress(a: string, b: string): boolean {
  const x = squash(a);
  const y = squash(b);
  return x.includes(y) || y.includes(x);
}

export function resolveParty(
  ocrName: string | null | undefined,
  ocrTin: string | null | undefined,
  ocrAddress: string | null | undefined,
  entry: Party | null | undefined,
): ResolvedParty {
  const name = ocrName?.trim() || null;
  const address = ocrAddress?.trim() || null;
  if (!entry) {
    return { name, tin: ocrTin?.trim() || null, address, from: "ocr", party: null, nameDiffers: false, isTradeName: false, addressDiffers: false, warning: null };
  }
  const registered = displayName(entry);
  const dirAddress = fullAddress(entry) || null;
  const isTradeName = Boolean(name && !sameName(name, registered) && sameName(name, entry.trade_name));
  const nameDiffers = Boolean(name && !sameName(name, registered) && !isTradeName);
  const addressDiffers = Boolean(address && dirAddress && !sameAddress(address, dirAddress));
  const warnings: string[] = [];
  if (nameDiffers) warnings.push(`OCR read “${name}”, but this TIN is registered to “${registered}”. Check the TIN and the name.`);
  else if (isTradeName) warnings.push(`“${name}” is the trade name; BIR attachments use the registered name “${registered}”.`);
  if (addressDiffers) warnings.push("The address differs from the one on file.");
  return {
    name: registered || name,
    tin: partyTinLabel(entry),
    address: dirAddress ?? address,
    from: "directory",
    party: entry,
    nameDiffers,
    isTradeName,
    addressDiffers,
    warning: warnings.join(" ") || null,
  };
}
