/**
 * Works out a quote from a client profile and a fee schedule (spec §3.12; Q49, Q50, Q53, Q54).
 * Pure: no database, no clock (the quote date is passed in). Amounts are worked in
 * centavos so totals never drift.
 *
 *  monthly retainer  = the monthly items that apply (at least the schedule's minimum)
 *  annual package    = the annual items chosen
 *  one-time          = the one-time items chosen (backlog months × the monthly retainer)
 *  first-year total  = 12 × monthly retainer + annual package + one-time
 */
import { addDays } from "@/lib/deadlines/dates";
import type { Billing, ClientProfile, ComponentLetter, Conditions, FeeItem, Range, ScheduleSettings, TaxOnFee } from "./types";

export interface QuoteLine {
  code: string;
  component: ComponentLetter;
  label: string;
  band: string | null;
  billing: Billing;
  /** Price per unit, or the factor for a multiplier; null when not set yet. */
  unitPrice: number | null;
  quantity: number;
  /** Null when the price is not set yet. */
  amount: number | null;
}

export interface CustomQuoteItem {
  code: string;
  label: string;
  band: string | null;
}

export interface QuoteTax {
  kind: TaxOnFee;
  rate: number;
  inclusive: boolean;
  /** Tax on the monthly retainer and on the first year. */
  monthly: number;
  firstYear: number;
  /** What the client pays, tax included. */
  monthlyWithTax: number;
  firstYearWithTax: number;
  note: string;
}

export interface Quote {
  monthly: QuoteLine[];
  annual: QuoteLine[];
  oneTime: QuoteLine[];
  monthlySubtotal: number;
  /** Added to reach the schedule's minimum monthly retainer (0 when not needed). */
  minimumTopUp: number;
  monthlyRetainer: number;
  annualTotal: number;
  oneTimeTotal: number;
  firstYearTotal: number;
  tax: QuoteTax;
  ewtNote: string;
  lateSurcharge: { amount: number; auto: boolean } | null;
  quoteDate: string;
  validUntil: string;
  /** Items that apply but have no price yet; totals leave them out. */
  missingPrices: QuoteLine[];
  /** Work that needs a quote on request; totals leave it out. */
  customQuote: CustomQuoteItem[];
  /** Codes chosen that the schedule does not have. */
  unknownCodes: string[];
  /** True when every amount is known: nothing missing, nothing on request. */
  complete: boolean;
}

export const EWT_NOTE =
  "Clients who are withholding agents may withhold expanded withholding tax (EWT) on our fee. Please send us BIR Form 2307 for the amount withheld.";

const TAX_RATE: Record<TaxOnFee, number> = { percentage_tax_3: 0.03, vat_12: 0.12 };

const cents = (n: number) => Math.round(n * 100);
const pesos = (c: number) => c / 100;

const inRange = (n: number, r: Range) => n >= r.min && (r.max === null || n <= r.max);

/** True when every condition given matches the profile. */
export function matches(c: Conditions, p: ClientProfile): boolean {
  if (c.taxpayer_types && !c.taxpayer_types.includes(p.taxpayerType)) return false;
  if (c.vat !== undefined && c.vat !== p.vatRegistered) return false;
  if (c.ewt !== undefined && (p.ewt === "none" || (c.ewt !== "any" && c.ewt !== p.ewt))) return false;
  if (c.employees && !inRange(p.employees, c.employees)) return false;
  if (c.remits_contributions !== undefined && c.remits_contributions !== p.remitsContributions) return false;
  if (c.documents && !inRange(p.documentsPerMonth, c.documents)) return false;
  if (c.bookkeeping !== undefined && (p.bookkeeping === "none" || (c.bookkeeping !== "any" && c.bookkeeping !== p.bookkeeping))) return false;
  if (c.complexity && !p.complexity.includes(c.complexity)) return false;
  return true;
}

/** Annual items the profile would normally need (pre-ticked on the quote form). */
export function suggestedAnnualItems(items: readonly FeeItem[], p: ClientProfile): string[] {
  return items.filter((i) => i.billing === "annual" && matches(i.conditions, p)).map((i) => i.code);
}

/** The document volume item for a number of documents a month, if the schedule has one. */
export function documentBand(items: readonly FeeItem[], documentsPerMonth: number): FeeItem | undefined {
  return items.find((i) => i.component === "F" && i.conditions.documents && inRange(documentsPerMonth, i.conditions.documents));
}

/** How many units a per-unit item counts for this profile. */
function unitsFor(c: Conditions, p: ClientProfile): number {
  if (c.per === "employee") return Math.max(0, p.employees - (c.above ?? 0));
  if (c.per === "branch") return Math.max(0, p.branches);
  return 0;
}

function taxNote(kind: TaxOnFee, inclusive: boolean): string {
  if (kind === "vat_12") {
    return inclusive ? "Our fees include 12% VAT." : "Our fees are before 12% VAT, which is added to each bill.";
  }
  return inclusive
    ? "We are not VAT-registered. Our fees include the 3% percentage tax we pay on them; no VAT is added."
    : "We are not VAT-registered. Our fees are before the 3% percentage tax, which is added to each bill; no VAT is added.";
}

function taxOn(amountCents: number, rate: number, inclusive: boolean): number {
  if (!inclusive) return Math.round(amountCents * rate);
  // VAT is inside the price: price × 12/112. Percentage tax is on gross receipts: price × 3%.
  return rate === TAX_RATE.vat_12 ? Math.round((amountCents * rate) / (1 + rate)) : Math.round(amountCents * rate);
}

export interface QuoteInput {
  profile: ClientProfile;
  items: readonly FeeItem[];
  settings: ScheduleSettings;
  taxOnFee: TaxOnFee;
  /** YYYY-MM-DD */
  quoteDate: string;
}

export function buildQuote({ profile: p, items, settings, taxOnFee, quoteDate }: QuoteInput): Quote {
  const missingPrices: QuoteLine[] = [];
  const customQuote: CustomQuoteItem[] = [];
  const unknownCodes: string[] = [];
  const byCode = new Map(items.map((i) => [i.code, i]));

  const line = (i: FeeItem, quantity: number, amountCents: number | null): QuoteLine => ({
    code: i.code,
    component: i.component,
    label: i.label,
    band: i.band,
    billing: i.billing,
    unitPrice: i.price,
    quantity,
    amount: amountCents === null ? null : pesos(amountCents),
  });
  const custom = (i: FeeItem) => customQuote.push({ code: i.code, label: i.label, band: i.band });

  // Monthly: fixed and per-unit items that apply.
  const monthly: QuoteLine[] = [];
  for (const i of items) {
    if ((i.billing !== "monthly" && i.billing !== "per_unit_monthly") || !matches(i.conditions, p)) continue;
    const quantity = i.billing === "per_unit_monthly" ? unitsFor(i.conditions, p) : 1;
    if (quantity === 0) continue;
    if (i.isCustomQuote) {
      custom(i);
      continue;
    }
    const l = line(i, quantity, i.price === null ? null : cents(i.price) * quantity);
    if (i.price === null) missingPrices.push(l);
    monthly.push(l);
  }

  // Bookkeeping factor for complex businesses: the highest factor that applies, on the bookkeeping level fee.
  const factors = items.filter((i) => i.billing === "multiplier" && i.conditions.of === "bookkeeping" && matches(i.conditions, p));
  if (factors.length) {
    const unpriced = factors.filter((f) => f.price === null);
    const priced = factors.filter((f) => f.price !== null).sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (unpriced.length) {
      for (const f of unpriced) {
        const l = line(f, 1, null);
        missingPrices.push(l);
        monthly.push(l);
      }
    } else {
      const top = priced[0];
      const base = monthly.filter((l) => l.component === "G" && l.billing === "monthly").reduce((s, l) => s + cents(l.amount ?? 0), 0);
      monthly.push(line(top, 1, Math.round(base * ((top.price ?? 1) - 1))));
    }
  }

  const monthlySubtotal = monthly.reduce((s, l) => s + cents(l.amount ?? 0), 0);
  const minimum = settings.minimumMonthlyRetainer === null ? 0 : cents(settings.minimumMonthlyRetainer);
  const minimumTopUp = Math.max(0, minimum - monthlySubtotal);
  const retainer = monthlySubtotal + minimumTopUp;

  // Annual package: the items chosen.
  const annual: QuoteLine[] = [];
  for (const code of new Set(p.annualItems)) {
    const i = byCode.get(code);
    if (!i || i.billing !== "annual") {
      unknownCodes.push(code);
      continue;
    }
    if (i.isCustomQuote) {
      custom(i);
      continue;
    }
    const l = line(i, 1, i.price === null ? null : cents(i.price));
    if (i.price === null) missingPrices.push(l);
    annual.push(l);
  }

  // One-time: the items chosen, with quantity; backlog months are a factor of the monthly retainer.
  const oneTime: QuoteLine[] = [];
  for (const { code, quantity } of p.oneTimeItems) {
    const i = byCode.get(code);
    const oneTimeKind = i && (i.billing === "one_time" || (i.billing === "multiplier" && i.conditions.of === "monthly_retainer"));
    if (!i || !oneTimeKind) {
      unknownCodes.push(code);
      continue;
    }
    if (quantity <= 0) continue;
    if (i.isCustomQuote) {
      custom(i);
      continue;
    }
    let amount: number | null = null;
    if (i.price !== null) amount = i.billing === "multiplier" ? Math.round(retainer * i.price * quantity) : cents(i.price) * quantity;
    const l = line(i, quantity, amount);
    if (i.price === null) missingPrices.push(l);
    oneTime.push(l);
  }

  const sum = (ls: QuoteLine[]) => ls.reduce((s, l) => s + cents(l.amount ?? 0), 0);
  const annualTotal = sum(annual);
  const oneTimeTotal = sum(oneTime);
  const firstYear = 12 * retainer + annualTotal + oneTimeTotal;

  const rate = TAX_RATE[taxOnFee];
  const inclusive = settings.pricesIncludeTax;
  const monthlyTax = taxOn(retainer, rate, inclusive);
  const firstYearTax = taxOn(firstYear, rate, inclusive);

  return {
    monthly,
    annual,
    oneTime,
    monthlySubtotal: pesos(monthlySubtotal),
    minimumTopUp: pesos(minimumTopUp),
    monthlyRetainer: pesos(retainer),
    annualTotal: pesos(annualTotal),
    oneTimeTotal: pesos(oneTimeTotal),
    firstYearTotal: pesos(firstYear),
    tax: {
      kind: taxOnFee,
      rate,
      inclusive,
      monthly: pesos(monthlyTax),
      firstYear: pesos(firstYearTax),
      monthlyWithTax: pesos(inclusive ? retainer : retainer + monthlyTax),
      firstYearWithTax: pesos(inclusive ? firstYear : firstYear + firstYearTax),
      note: taxNote(taxOnFee, inclusive),
    },
    ewtNote: EWT_NOTE,
    lateSurcharge: settings.lateSurchargeAmount === null ? null : { amount: settings.lateSurchargeAmount, auto: settings.lateSurchargeAuto },
    quoteDate,
    validUntil: addDays(quoteDate, settings.quoteValidDays),
    missingPrices,
    customQuote,
    unknownCodes,
    complete: missingPrices.length === 0 && customQuote.length === 0 && unknownCodes.length === 0,
  };
}
