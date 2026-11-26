/**
 * Works out a quote from a client profile and a fee schedule (spec §3.12; Q49, Q53,
 * Q54; Owner, 26 Nov 2026). Pure: no database, no clock (the quote date is passed
 * in). Amounts are worked in centavos so totals never drift.
 *
 *  monthly retainer = the monthly items that apply (at least the schedule's minimum)
 *  catch-up         = months behind × catch-up factor × monthly retainer: a one-time
 *                     line below the monthly total
 *  monthly cap      = above it the quote shows no price: the business is quoted on
 *                     request in the proposal (catch-up too)
 *  not included     = annual work, registration work and services on request that
 *                     apply: listed by name, priced in the proposal
 *
 * There is no annual package and no first-year total on a quote any more.
 */
import { addDays } from "@/lib/deadlines/dates";
import { isAuditItem, isLegacySchedule, LEGACY_CATCH_UP_CODE } from "./template";
import { isProposalOnly, type Billing, type ClientProfile, type ComponentLetter, type Conditions, type FeeItem, type Range, type ScheduleSettings, type TaxOnFee } from "./types";

export interface QuoteLine {
  code: string;
  component: ComponentLetter;
  label: string;
  band: string | null;
  billing: Billing;
  /** Price per unit, or the factor for a multiplier; null when not set yet. */
  unitPrice: number | null;
  quantity: number;
  /** Null when the price is not set yet, or when the line is quoted on request. */
  amount: number | null;
}

export interface CustomQuoteItem {
  code: string;
  label: string;
  band: string | null;
}

/** Work the quote does not price: it is priced in the proposal. */
export interface NotIncludedItem {
  code: string;
  label: string;
  band: string | null;
  /** "annual": an annual job; "ad_hoc": an ad hoc job, billed when done. */
  group: "annual" | "ad_hoc" | "audit";
  /** Quoted for the job (audit, AUP, BIR audit support …). */
  onRequest: boolean;
}

export interface QuoteTax {
  kind: TaxOnFee;
  rate: number;
  inclusive: boolean;
  /** Tax on the monthly retainer and on the one-time catch-up. */
  monthly: number;
  oneTime: number;
  /** What the client pays, tax included. */
  monthlyWithTax: number;
  oneTimeWithTax: number;
  note: string;
}

export interface CatchUpLine {
  months: number;
  /** Share of the monthly retainer charged per month behind (0.5 = half); null when on request. */
  factor: number | null;
  /** Per month behind, and in all; null when on request. */
  perMonth: number | null;
  amount: number | null;
}

export interface Quote {
  monthly: QuoteLine[];
  monthlySubtotal: number;
  /** Added to reach the schedule's minimum monthly retainer (0 when not needed). */
  minimumTopUp: number;
  monthlyRetainer: number;
  /** The schedule's monthly cap (null = none), and whether this retainer is above it. */
  monthlyCap: number | null;
  /** Above the cap: the client sees no price; the proposal carries the agreed retainer. */
  overCap: boolean;
  /** Backlog catch-up, one time, below the monthly total; null when not behind. */
  catchUp: CatchUpLine | null;
  oneTimeTotal: number;
  tax: QuoteTax;
  ewtNote: string;
  lateSurcharge: { amount: number; auto: boolean } | null;
  quoteDate: string;
  validUntil: string;
  /** Not included in this quote; priced in the proposal. */
  notIncluded: NotIncludedItem[];
  /** Items that apply but have no price yet; totals leave them out. */
  missingPrices: QuoteLine[];
  /** Work that applies but is quoted on request (301+ documents, 50+ employees, catch-up without a factor). */
  customQuote: CustomQuoteItem[];
  /** The schedule predates 26 Nov 2026 (bookkeeping in G): its bookkeeping is not priced. */
  outdatedSchedule: boolean;
  /** True when every amount is known: nothing missing, nothing on request, under the cap, schedule current. */
  complete: boolean;
}

export const EWT_NOTE =
  "Clients who are withholding agents may withhold expanded withholding tax (EWT) on our fee. Please send us BIR Form 2307 for the amount withheld.";

export const NOT_INCLUDED_NOTE = "Not included in this quote. We price these in your proposal when you need them.";

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
  // Whole pesos, rounded up: exactly on an edge stays in the lower band, a centavo over moves up.
  if (c.annual_sales && (p.annualSales == null ? c.annual_sales.min > 0 : !inRange(Math.ceil(p.annualSales), c.annual_sales))) return false;
  // Bookkeeping levels belong to schedules made before 26 Nov 2026; no profile has one now.
  if (c.bookkeeping !== undefined) return false;
  if (c.complexity === "any" ? p.complexity.length === 0 : c.complexity && !p.complexity.includes(c.complexity)) return false;
  return true;
}

/** The bookkeeping band (F) for a number of documents a month, if the schedule has one. */
export function documentBand(items: readonly FeeItem[], documentsPerMonth: number): FeeItem | undefined {
  return items.find((i) => i.component === "F" && i.conditions.documents && inRange(documentsPerMonth, i.conditions.documents));
}

/** The items a quote lists as not included, for this profile, in schedule order. */
export function notIncludedItems(items: readonly FeeItem[], p: ClientProfile): FeeItem[] {
  return items.filter((i) => isProposalOnly(i) && matches(i.conditions, p));
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

/** Tax on our fee for a monthly retainer and a one-time amount (pesos). */
export function feeTax(kind: TaxOnFee, inclusive: boolean, monthly: number, oneTime: number): QuoteTax {
  const rate = TAX_RATE[kind];
  const m = cents(monthly);
  const o = cents(oneTime);
  const mt = taxOn(m, rate, inclusive);
  const ot = taxOn(o, rate, inclusive);
  return {
    kind,
    rate,
    inclusive,
    monthly: pesos(mt),
    oneTime: pesos(ot),
    monthlyWithTax: pesos(inclusive ? m : m + mt),
    oneTimeWithTax: pesos(inclusive ? o : o + ot),
    note: taxNote(kind, inclusive),
  };
}

/** Catch-up for `months` behind at `factor` × `retainer` (pesos); null amounts when there is no factor. */
export function catchUpFor(months: number, factor: number | null, retainer: number): CatchUpLine {
  if (factor === null) return { months, factor: null, perMonth: null, amount: null };
  const perMonth = Math.round(cents(retainer) * factor);
  return { months, factor, perMonth: pesos(perMonth), amount: pesos(perMonth * months) };
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

  // Monthly: fixed and per-unit items that apply. The retired G never applies (its conditions never match).
  const monthly: QuoteLine[] = [];
  for (const i of items) {
    if ((i.billing !== "monthly" && i.billing !== "per_unit_monthly") || i.component === "G" || !matches(i.conditions, p)) continue;
    const quantity = i.billing === "per_unit_monthly" ? unitsFor(i.conditions, p) : 1;
    if (quantity === 0) continue;
    if (i.isCustomQuote) {
      customQuote.push({ code: i.code, label: i.label, band: i.band });
      continue;
    }
    const l = line(i, quantity, i.price === null ? null : cents(i.price) * quantity);
    if (i.price === null) missingPrices.push(l);
    monthly.push(l);
  }

  const monthlySubtotal = monthly.reduce((s, l) => s + cents(l.amount ?? 0), 0);
  const minimum = settings.minimumMonthlyRetainer === null ? 0 : cents(settings.minimumMonthlyRetainer);
  const minimumTopUp = Math.max(0, minimum - monthlySubtotal);
  const retainer = monthlySubtotal + minimumTopUp;
  const overCap = settings.monthlyCap !== null && retainer > cents(settings.monthlyCap);

  // Catch-up: months behind × factor × the monthly retainer (after the minimum). Schedules made
  // before 26 Nov 2026 have no factor setting; their catch-up item's price is the factor.
  let catchUp: CatchUpLine | null = null;
  const months = Math.max(0, Math.floor(p.monthsBehind));
  if (months > 0) {
    const factor = settings.catchUpFactor ?? items.find((x) => x.code === LEGACY_CATCH_UP_CODE)?.price ?? null;
    catchUp = catchUpFor(months, overCap ? null : factor, pesos(retainer));
    if (factor === null) customQuote.push({ code: "catch_up", label: "Backlog catch-up", band: `${months} month${months === 1 ? "" : "s"} behind` });
  }
  const oneTime = catchUp?.amount == null ? 0 : cents(catchUp.amount);

  // Jobs priced by sales band (the audit) are listed once, without the band: the proposal picks it.
  const notIncluded: NotIncludedItem[] = [];
  const seen = new Set<string>();
  for (const i of notIncludedItems(items, p)) {
    const banded = Boolean(i.conditions.annual_sales);
    if (banded && seen.has(i.label)) continue;
    if (banded) seen.add(i.label);
    notIncluded.push({ code: i.code, label: i.label, band: banded ? null : i.band, group: isAuditItem(i) ? "audit" : i.billing === "annual" ? "annual" : "ad_hoc", onRequest: !banded && i.isCustomQuote });
  }

  const outdatedSchedule = isLegacySchedule(items);

  return {
    monthly,
    monthlySubtotal: pesos(monthlySubtotal),
    minimumTopUp: pesos(minimumTopUp),
    monthlyRetainer: pesos(retainer),
    monthlyCap: settings.monthlyCap,
    overCap,
    catchUp,
    oneTimeTotal: pesos(oneTime),
    tax: feeTax(taxOnFee, settings.pricesIncludeTax, pesos(retainer), pesos(oneTime)),
    ewtNote: EWT_NOTE,
    lateSurcharge: settings.lateSurchargeAmount === null ? null : { amount: settings.lateSurchargeAmount, auto: settings.lateSurchargeAuto },
    quoteDate,
    validUntil: addDays(quoteDate, settings.quoteValidDays),
    notIncluded,
    missingPrices,
    customQuote,
    outdatedSchedule,
    complete: missingPrices.length === 0 && customQuote.length === 0 && !outdatedSchedule && !overCap,
  };
}

/**
 * What the prospect sees right after the website form: the monthly price and catch-up
 * when the quote can give one, otherwise only the work that applies (over the cap,
 * an item on request, or prices not set). No amounts leave the server in that case.
 */
export interface InstantQuote {
  priced: boolean;
  /** Why there is no price: "over_cap" (quoted in the proposal) or "on_request". */
  reason: "over_cap" | "on_request" | null;
  monthlyRetainer: number | null;
  catchUp: { months: number; amount: number | null } | null;
  /** The components that apply, by name. */
  lines: { label: string; band: string | null; amount: number | null }[];
  notIncluded: { annual: string[]; adHoc: string[]; audit: string[] };
  taxNote: string;
  ewtNote: string;
}

/** "Annual income tax return with AFS (Non-individual)" style name for the not-included list. */
export const notIncludedName = (n: Pick<NotIncludedItem, "label" | "band">) => (n.band ? `${n.label} (${n.band})` : n.label);

export function instantView(q: Quote): InstantQuote {
  const priced = q.complete;
  const lines = [
    ...q.monthly.map((l) => ({ label: l.label, band: l.band, amount: priced ? l.amount : null })),
    ...q.customQuote.filter((c) => c.code !== "catch_up").map((c) => ({ label: c.label, band: c.band, amount: null })),
  ];
  return {
    priced,
    reason: priced ? null : q.overCap ? "over_cap" : "on_request",
    monthlyRetainer: priced ? q.monthlyRetainer : null,
    catchUp: q.catchUp ? { months: q.catchUp.months, amount: priced ? q.catchUp.amount : null } : null,
    lines,
    notIncluded: {
      annual: q.notIncluded.filter((n) => n.group === "annual").map(notIncludedName),
      adHoc: q.notIncluded.filter((n) => n.group === "ad_hoc").map(notIncludedName),
      audit: q.notIncluded.filter((n) => n.group === "audit").map(notIncludedName),
    },
    taxNote: q.tax.note,
    ewtNote: q.ewtNote,
  };
}
