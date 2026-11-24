/**
 * Money for return worksheets: every amount is an integer number of centavos
 * (types.ts `Centavos`), so sums never drift. Rates are percentages as printed
 * on the BIR ATC table (0.5, 1, 2, 5, 10, 15…); multiplying by a rate rounds
 * once, half away from zero, to the centavo — the way eBIRForms and the
 * alphalist validation module round (taxify's `toFixed(2)` on the result).
 */
import type { Centavos } from "./types";

/**
 * "1,234.56" / "₱1,234.56" / "PHP 1234.5" / "(1,234.56)" / -12 / 1234.567 → centavos.
 * More than two decimals are rounded half away from zero. Anything else → null.
 */
export function toCentavos(v: string | number | null | undefined): Centavos | null {
  if (v == null) return null;
  if (typeof v === "number") return Number.isFinite(v) ? roundHalfAway(v * 100) : null;
  let s = v.trim();
  if (s === "") return null;
  let negative = false;
  if (/^\(.*\)$/.test(s)) {
    negative = true;
    s = s.slice(1, -1).trim();
  }
  s = s.replace(/^(PHP|Php|P(?=[\d\s]))/, "").replace(/[₱,\s]/g, "");
  if (s.startsWith("-")) {
    negative = !negative;
    s = s.slice(1);
  }
  const m = /^(\d*)(?:\.(\d*))?$/.exec(s);
  if (!m || (m[1] === "" && !m[2])) return null;
  const whole = Number(m[1] || "0");
  const frac = (m[2] ?? "").padEnd(3, "0");
  // Integer arithmetic for the first three decimals, then round the third.
  let c = whole * 100 + Number(frac.slice(0, 2));
  const rest = frac.slice(2);
  if (rest !== "" && Number(rest[0]) >= 5) c += 1;
  if (!Number.isSafeInteger(c)) return null;
  return negative && c !== 0 ? -c : c;
}

/** Round half away from zero to an integer (Math.round rounds -0.5 towards +∞). */
export function roundHalfAway(x: number): number {
  // Guard against binary noise such as 1.005 * 100 = 100.49999999999999.
  const r = Math.round(Math.abs(x) * 1e6) / 1e6;
  const out = Math.floor(r + 0.5);
  return x < 0 ? -out : out;
}

/** "1234.56", for DAT files and CSV cells (no separators, always two decimals, "-" for negatives). */
export function toDecimalString(c: Centavos): string {
  const neg = c < 0;
  const a = Math.abs(c);
  return `${neg ? "-" : ""}${Math.floor(a / 100)}.${String(a % 100).padStart(2, "0")}`;
}

const grouped = new Intl.NumberFormat("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** "1,234.56"; negatives in parentheses as on BIR forms: "(1,234.56)". */
export function formatAmount(c: Centavos): string {
  const s = grouped.format(Math.abs(c) / 100);
  return c < 0 ? `(${s})` : s;
}

/** "₱1,234.56"; negatives (over-remittances) as "(₱1,234.56)". */
export function formatPeso(c: Centavos | null | undefined): string {
  if (c == null) return "—";
  const s = `₱${grouped.format(Math.abs(c) / 100)}`;
  return c < 0 ? `(${s})` : s;
}

/** A rate in percent as integer hundredths of a percent (0.5 → 50, 15 → 1500), so rate maths stays in integers. */
function basisPoints(ratePercent: number): number {
  return Math.round(ratePercent * 100);
}

/** base × rate%, rounded half away from zero to the centavo. */
export function applyRate(base: Centavos, ratePercent: number): Centavos {
  const bp = basisPoints(ratePercent);
  const num = Math.abs(base) * bp;
  const q = Math.floor(num / 10000);
  const out = num - q * 10000 >= 5000 ? q + 1 : q;
  return base < 0 ? -out : out;
}

/**
 * The income payment that gives `withheld` at `ratePercent` (taxify's gross-up of a
 * pass-through EWT line: base = ewt / (rate / 100)), rounded to the centavo.
 * Returns `withheld` unchanged for a zero rate, as taxify does.
 */
export function grossUp(withheld: Centavos, ratePercent: number): Centavos {
  const bp = basisPoints(ratePercent);
  if (bp <= 0) return withheld;
  return roundHalfAway((withheld * 10000) / bp);
}

export function sum(values: (Centavos | null | undefined)[]): Centavos {
  let t = 0;
  for (const v of values) t += v ?? 0;
  return t;
}

/** A rate for display: 0.5 → "0.5%", 10 → "10%". */
export function formatRate(ratePercent: number | null | undefined): string {
  return ratePercent == null ? "—" : `${ratePercent}%`;
}
