/**
 * Splits an individual's name as printed on a receipt or invoice into last, first
 * and middle name, for the BIR lists (SLS, SLP, QAP, SAWT) and the parties
 * directory. OCR is asked for the parts; this is the fallback when it only read
 * one line, and the reviewer checks the result.
 *
 *   "DELA CRUZ, JUAN SANTOS"        → Dela Cruz · Juan · Santos
 *   "Juan S. Dela Cruz"             → Dela Cruz · Juan · S.
 *   "MARIA CRISTINA REYES DE LOS SANTOS" → De Los Santos · Maria Cristina · Reyes
 *   "Juan Dela Cruz Jr. - Prop."    → Dela Cruz · Juan Jr. · (none)
 *
 * Surname particles (de, del, dela, de la, de los, delos, san, sta., sto.) stay
 * with the surname; a suffix (Jr., Sr., II, III, IV) stays with the first name.
 */
export interface PersonName {
  last: string;
  first: string;
  middle: string | null;
}

const PARTICLES = new Set(["DE", "DEL", "DELA", "DELOS", "DELAS", "LA", "LOS", "LAS", "SAN", "STA", "STA.", "STO", "STO.", "VAN", "VON", "DI", "DA"]);
const SUFFIXES = new Set(["JR", "JR.", "SR", "SR.", "II", "III", "IV", "V"]);
/** Words that mark the owner of a sole proprietorship, or a business name: not part of the person's name. */
const NOT_A_NAME = /\s*[-–,(]?\s*\b(prop(rietor|rietress)?|owner|mgr|manager)\b\.?\)?\s*$/i;
const BUSINESS = /\b(inc|corp|corporation|company|co|ltd|enterprises?|trading|store|hardware|shop|cooperative|coop|services|partnership|opc)\b\.?/i;

const tidy = (s: string) => s.replace(/\s+/g, " ").trim();

export function splitPersonName(raw: string | null | undefined): PersonName | null {
  let s = tidy((raw ?? "").replace(NOT_A_NAME, ""));
  if (!s || BUSINESS.test(s)) return null;

  // "Last, First Middle": the comma tells us where the surname ends.
  const comma = s.indexOf(",");
  if (comma > 0) {
    const last = tidy(s.slice(0, comma));
    const rest = tidy(s.slice(comma + 1)).split(" ").filter(Boolean);
    if (!last || rest.length === 0) return null;
    const suffix = rest.length > 1 && SUFFIXES.has(rest[rest.length - 1].toUpperCase()) ? rest.pop()! : null;
    const middle = rest.length > 1 ? rest.pop()! : null;
    return { last, first: [...rest, ...(suffix ? [suffix] : [])].join(" "), middle };
  }

  s = s.replace(/\./g, ". ").replace(/\s+/g, " ").trim();
  const words = s.split(" ");
  const suffix = words.length > 2 && SUFFIXES.has(words[words.length - 1].toUpperCase()) ? words.pop()! : null;
  if (words.length < 2) return null;
  // The surname: the last word, with any particles before it.
  let i = words.length - 1;
  while (i > 1 && PARTICLES.has(words[i - 1].toUpperCase())) i -= 1;
  const last = words.slice(i).join(" ");
  const given = words.slice(0, i);
  if (given.length === 0) return null;
  const middle = given.length > 1 ? given.pop()! : null;
  return { last, first: [...given, ...(suffix ? [suffix] : [])].join(" "), middle };
}
