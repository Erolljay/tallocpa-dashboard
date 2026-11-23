/**
 * BIR tax rates as effective-dated series, ported from taxify.ph
 * (`tax-rates-data.json` + `shared/tax-rates.js`). A lookup picks the entry
 * in force on a given date, so a return for an earlier period keeps the rate
 * that applied then (TRAIN's 2018–2022 brackets vs. its 2023 step-down, the
 * CREATE Act's temporary percentage-tax / MCIT relief).
 *
 * Add a new dated entry when a rate changes; never edit an entry that may
 * already have been used. Rates are percentages (12 = 12%), except the
 * graduated brackets, which are decimals as in taxify.
 *
 * Shared by every return worksheet (business tax and withholding forms).
 */

export interface RateEntry {
  effectiveDate: string;
  label: string;
}
export interface PercentRate extends RateEntry { rate: number }
export interface AmountRate extends RateEntry { amount: number }
export interface CorporateRate extends RateEntry { regular: number; small: number }
export interface IncomeTaxTable extends RateEntry { brackets: { upTo: number | null; rate: number }[] }

export const TAX_RATES = {
  vat: [{ effectiveDate: "2006-02-01", rate: 12, label: "Standard VAT (RA 9337)" }] as PercentRate[],
  pt: [
    { effectiveDate: "2018-01-01", rate: 3, label: "Percentage Tax — Non-VAT (NIRC Sec. 116)" },
    { effectiveDate: "2020-07-01", rate: 1, label: "Percentage Tax — Non-VAT (CREATE Act MSME relief)" },
    { effectiveDate: "2023-07-01", rate: 3, label: "Percentage Tax — Non-VAT (relief expired)" },
  ] as PercentRate[],
  ptNonbank: [{ effectiveDate: "2018-01-01", rate: 5, label: "Percentage Tax — Nonbank Financial Intermediaries" }] as PercentRate[],
  eightPct: [{ effectiveDate: "2018-01-01", rate: 8, label: "8% Flat Tax (in lieu of graduated rate + percentage tax)" }] as PercentRate[],
  osd: [{ effectiveDate: "2018-01-01", rate: 40, label: "Optional Standard Deduction" }] as PercentRate[],
  thirteenthCap: [{ effectiveDate: "2018-01-01", amount: 90000, label: "Non-taxable ceiling — 13th month pay & other benefits" }] as AmountRate[],
  incomeTax: [
    {
      effectiveDate: "2018-01-01",
      label: "TRAIN Law (RA 10963), 2018–2022",
      brackets: [
        { upTo: 250000, rate: 0 },
        { upTo: 400000, rate: 0.2 },
        { upTo: 800000, rate: 0.25 },
        { upTo: 2000000, rate: 0.3 },
        { upTo: 8000000, rate: 0.32 },
        { upTo: null, rate: 0.35 },
      ],
    },
    {
      effectiveDate: "2023-01-01",
      label: "TRAIN Law step-down, 2023 onward",
      brackets: [
        { upTo: 250000, rate: 0 },
        { upTo: 400000, rate: 0.15 },
        { upTo: 800000, rate: 0.2 },
        { upTo: 2000000, rate: 0.25 },
        { upTo: 8000000, rate: 0.3 },
        { upTo: null, rate: 0.35 },
      ],
    },
  ] as IncomeTaxTable[],
  corporate: [
    { effectiveDate: "2018-01-01", regular: 30, small: 30, label: "Pre-CREATE (flat 30%)" },
    { effectiveDate: "2020-07-01", regular: 25, small: 20, label: "CREATE Act (RA 11534)" },
  ] as CorporateRate[],
  mcit: [
    { effectiveDate: "2018-01-01", rate: 2, label: "MCIT standard" },
    { effectiveDate: "2020-07-01", rate: 1, label: "MCIT — CREATE Act relief" },
    { effectiveDate: "2023-07-01", rate: 2, label: "MCIT — relief expired" },
  ] as PercentRate[],
};

/** The entry in force on `onDate` (YYYY-MM-DD); the earliest entry if the date precedes them all. Port of taxify `pickEffective`. */
export function pickEffective<T extends RateEntry>(series: T[], onDate: string): T {
  const sorted = [...series].sort((a, b) => a.effectiveDate.localeCompare(b.effectiveDate));
  let picked = sorted[0];
  for (const entry of sorted) {
    if (entry.effectiveDate <= onDate.slice(0, 10)) picked = entry;
    else break;
  }
  return picked;
}

/** Percent rates (12 = 12%) in force on a date. */
export const vatRate = (onDate: string) => pickEffective(TAX_RATES.vat, onDate).rate;
export const percentageTaxRate = (onDate: string) => pickEffective(TAX_RATES.pt, onDate).rate;
export const percentageTaxNonbankRate = (onDate: string) => pickEffective(TAX_RATES.ptNonbank, onDate).rate;
export const eightPercentRate = (onDate: string) => pickEffective(TAX_RATES.eightPct, onDate).rate;
export const osdRate = (onDate: string) => pickEffective(TAX_RATES.osd, onDate).rate;
export const mcitRate = (onDate: string) => pickEffective(TAX_RATES.mcit, onDate).rate;
export const corporateRates = (onDate: string) => {
  const e = pickEffective(TAX_RATES.corporate, onDate);
  return { regular: e.regular, small: e.small };
};
/** Ceiling (in pesos) of non-taxable 13th-month pay and other benefits. */
export const thirteenthMonthCap = (onDate: string) => pickEffective(TAX_RATES.thirteenthCap, onDate).amount;

/**
 * Graduated income tax on `taxableIncome` centavos under the table in force on
 * `onDate`, in centavos (rounded). Port of taxify `getIncomeTaxTable` +
 * `computeGraduatedTax`: each bracket's fixed amount is derived from the rates
 * of the brackets below it.
 */
export function graduatedIncomeTax(taxableIncome: number, onDate: string): number {
  const { brackets } = pickEffective(TAX_RATES.incomeTax, onDate);
  const ti = Math.max(0, taxableIncome);
  let from = 0;
  let fixed = 0;
  for (const b of brackets) {
    const to = b.upTo === null ? Infinity : b.upTo * 100;
    if (ti <= to) return Math.round(fixed + (ti - from) * b.rate);
    fixed += (to - from) * b.rate;
    from = to;
  }
  return Math.round(fixed);
}
