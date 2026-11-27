/**
 * Does a row match what was typed in a list's search box? Every word must
 * appear in one of the fields (case-insensitive), so "ace 2024" finds Ace
 * Trading's 2024 renewal. A query of digits and dashes also matches TINs and
 * codes typed in any grouping: "123456" finds 123-456-789-000.
 */
export function matchesSearch(q: string, fields: (string | null | undefined)[]): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const hay = fields.filter(Boolean).map((f) => f!.toLowerCase());
  if (/^[\d\s-]+$/.test(needle)) {
    const digits = needle.replace(/\D/g, "");
    if (digits.length >= 3 && hay.some((h) => h.replace(/\D/g, "").includes(digits))) return true;
  }
  return needle.split(/\s+/).every((word) => hay.some((h) => h.includes(word)));
}

/** The `?q=` of a page's searchParams. */
export const searchParam = (v: string | string[] | undefined) => ((Array.isArray(v) ? v[0] : v) ?? "").trim();

/** A query param narrowed to the values a page allows, or "" for none/unknown. */
export function pickParam<T extends string>(v: string | string[] | undefined, allowed: readonly T[]): T | "" {
  const s = searchParam(v);
  return (allowed as readonly string[]).includes(s) ? (s as T) : "";
}

const collator = new Intl.Collator("en-PH", { sensitivity: "base", numeric: true });

/** Compare text for an A–Z sort, blanks last. */
export const byText = (a: string | null | undefined, b: string | null | undefined) => (!a ? (b ? 1 : 0) : !b ? -1 : collator.compare(a, b));
