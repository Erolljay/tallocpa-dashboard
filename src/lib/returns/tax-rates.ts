/**
 * Centavo helpers over the effective-dated rates in rates.ts (the single copy
 * of taxify.ph tax-rates-data.json; add new rate entries there, not here).
 * Ported from taxify.ph shared/tax-rates.js `getIncomeTaxTable`,
 * `computeGraduatedTax`, `getThirteenthMonthCap`.
 */
import { roundHalfAway } from "./money";
import { pickEffective, TAX_RATES } from "./rates";
import type { Centavos } from "./types";

export { pickEffective, TAX_RATES } from "./rates";
export { corporateRates, eightPercentRate, mcitRate, osdRate, percentageTaxNonbankRate, percentageTaxRate, vatRate } from "./rates";

/** Yearly ceiling on non-taxable 13th month pay and other benefits, in centavos. */
export function thirteenthMonthCap(onDate: string): Centavos {
  return pickEffective(TAX_RATES.thirteenthCap, onDate).amount * 100;
}

export interface Bracket {
  /** Centavos. */
  from: Centavos;
  to: Centavos;
  rate: number;
  /** Tax on everything below `from`, in centavos. */
  fixed: Centavos;
}

/** taxify getIncomeTaxTable: brackets with the fixed amount derived, in centavos. */
export function incomeTaxTable(onDate: string): Bracket[] {
  let from = 0;
  let fixed = 0;
  return pickEffective(TAX_RATES.incomeTax, onDate).brackets.map((b) => {
    const to = b.upTo == null ? Infinity : b.upTo * 100;
    const bracket = { from, to, rate: b.rate, fixed };
    fixed += to === Infinity ? 0 : roundHalfAway((to - from) * b.rate);
    from = to;
    return bracket;
  });
}

/** taxify computeGraduatedTax, on centavos: tax on annual taxable income under the table in force on `onDate`. */
export function graduatedTax(taxable: Centavos, onDate: string): Centavos {
  const table = incomeTaxTable(onDate);
  if (!table.length) return 0;
  const ti = Math.max(0, taxable);
  const b = table.find((x) => ti >= x.from && ti <= x.to) ?? table[table.length - 1];
  return b.fixed + roundHalfAway((ti - b.from) * b.rate);
}
