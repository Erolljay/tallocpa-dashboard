/**
 * What a proposal adds to the quote (Owner, 26 Nov 2026). Pure.
 *
 *  - The quote is monthly only, plus catch-up. Annual jobs (billing "annual") and
 *    ad hoc jobs (billing "one_time") are priced in the proposal: the Owner (or the
 *    lead's reviewer) ticks the jobs that apply. Each price comes from the schedule
 *    and can be overridden, with a note. The proposal shows them in their own
 *    sections, with no grand total that mixes them with the monthly retainer.
 *  - Jobs priced by annual gross sales (the audit) are one choice each: the Owner enters the client's sales once and the
 *    band's price is used. A value exactly on an edge falls in the lower band.
 *  - Above the schedule's monthly cap the quote has no price: the proposal carries
 *    the monthly retainer agreed for this client, and catch-up is worked out on it.
 *
 * The jobs are stored inside the proposal's quote, so the content a prospect
 * accepts (src/lib/funnel/terms.ts canonicalContent) includes each job and price.
 */
import { catchUpFor, feeTax, matches, type Quote } from "./quote";
import { parsePrice } from "./schedule";
import { AUDIT_LABEL, billedWhen, isAuditItem } from "./template";
import type { ClientProfile, FeeItem, Range } from "./types";

export type JobGroup = "annual" | "ad_hoc" | "audit";
export const JOB_GROUPS: Record<JobGroup, { title: string; hint: string }> = {
  annual: { title: "Annual jobs", hint: "Once a year, billed in the month shown." },
  ad_hoc: { title: "Ad hoc jobs", hint: "Each billed when done." },
  audit: { title: "Audit (separate engagement)", hint: "For information: quoted and contracted separately by the firm." },
};

/** One sales band of a job priced by annual gross sales. */
export interface JobBand {
  code: string;
  band: string | null;
  sales: Range;
  /** Null when the band is quoted on request. */
  price: number | null;
}

/** A job the proposal form offers, from the schedule. */
export interface JobOption {
  /** The item's code; for a job priced by sales, the code of its lowest band. */
  code: string;
  label: string;
  band: string | null;
  group: JobGroup;
  /** The schedule's price; null when not set, quoted on request, or priced by sales band. */
  schedulePrice: number | null;
  onRequest: boolean;
  billed: string;
  /** Applies to the lead's profile (listed as not included on the quote). */
  suggested: boolean;
  /** Priced by annual gross sales: the bands, lowest first. */
  bands: JobBand[] | null;
}

/** A job in the proposal, with its price. */
export interface ProposalJob {
  code: string;
  label: string;
  band: string | null;
  group: JobGroup;
  amount: number;
  /** The schedule's price when the proposal was made (the band's, for a job by sales); differs from `amount` when overridden. */
  schedulePrice: number | null;
  note: string | null;
  billed: string;
}

export interface ProposalQuote extends Quote {
  annualJobs: ProposalJob[];
  adHocJobs: ProposalJob[];
  /**
   * The audit, for information only: quoted and contracted separately by the firm
   * under its own engagement letter. Shown on the proposal, but left out of the
   * content the client accepts (src/lib/funnel/terms.ts canonicalContent).
   */
  audit: (ProposalJob & { indicative: true }) | null;
  /** The client's annual gross sales the sales bands were read from; null when not given. */
  annualSales: number | null;
  /** The monthly retainer agreed for a client above the cap; null when the quote's own is used. */
  agreedMonthly: number | null;
}

export const jobGroupOf = (i: Pick<FeeItem, "billing" | "code">): JobGroup | null =>
  isAuditItem(i) ? "audit" : i.billing === "annual" ? "annual" : i.billing === "one_time" ? "ad_hoc" : null;

/**
 * Every annual and ad hoc job of the schedule, those that apply to the profile
 * first in each group. Jobs priced by sales come once, with the bands for the
 * lead's taxpayer type.
 */
export function jobOptions(items: readonly FeeItem[], profile: ClientProfile): JobOption[] {
  const options: JobOption[] = [];
  const banded = new Map<string, JobOption>();
  for (const i of items) {
    const group = jobGroupOf(i);
    if (!group) continue;
    const sales = i.conditions.annual_sales;
    if (sales) {
      // Only the bands for this taxpayer type (and anything else but sales) are offered.
      if (!matches({ ...i.conditions, annual_sales: undefined }, profile)) continue;
      const key = `${group}|${i.label}`;
      const band: JobBand = { code: i.code, band: i.band, sales, price: i.isCustomQuote ? null : i.price };
      const existing = banded.get(key);
      if (existing) {
        existing.bands!.push(band);
        continue;
      }
      const o: JobOption = { code: i.code, label: i.label, band: null, group, schedulePrice: null, onRequest: false, billed: billedWhen(i), suggested: true, bands: [band] };
      banded.set(key, o);
      options.push(o);
      continue;
    }
    options.push({ code: i.code, label: i.label, band: i.band, group, schedulePrice: i.isCustomQuote ? null : i.price, onRequest: i.isCustomQuote, billed: billedWhen(i), suggested: matches(i.conditions, profile), bands: null });
  }
  for (const o of banded.values()) o.bands!.sort((a, b) => a.sales.min - b.sales.min);
  const rank = (o: JobOption) => ({ annual: 0, ad_hoc: 2, audit: 4 })[o.group] + (o.suggested ? 0 : 1);
  return options.map((o, n) => ({ o, n })).sort((a, b) => rank(a.o) - rank(b.o) || a.n - b.n).map(({ o }) => o);
}

/** The band for a client's annual gross sales (whole pesos, rounded up; an edge stays in the lower band). */
export function bandForSales(bands: readonly JobBand[], sales: number): JobBand | undefined {
  const s = Math.ceil(sales);
  return bands.find((b) => s >= b.sales.min && (b.sales.max === null || s <= b.sales.max));
}

/** Form fields of the proposal form, per job. */
export const jobField = {
  ticked: (code: string) => `job:${code}`,
  price: (code: string) => `job_price:${code}`,
  note: (code: string) => `job_note:${code}`,
};

/** Reads "₱12,500,000" style annual gross sales; empty is null. */
export function parseSales(raw: string | null): { value: number | null } | { error: string } {
  const s = (raw ?? "").replace(/[₱,\s]/g, "");
  if (s === "") return { value: null };
  if (!/^\d+(\.\d{1,2})?$/.test(s) || Number(s) > 1e13) return { error: "Enter the annual gross sales in pesos." };
  return { value: Number(s) };
}

/**
 * Reads the jobs ticked on the proposal form. A ticked job needs a price (0 is
 * allowed; empty takes the schedule's or the sales band's); a price that differs
 * from it needs a note saying why (e.g. "annual sales about ₱12M"). A job priced by
 * sales needs the client's annual gross sales.
 */
export function readJobs(options: readonly JobOption[], value: (field: string) => string | null, annualSales: number | null = null): { jobs: ProposalJob[] } | { error: string } {
  const jobs: ProposalJob[] = [];
  for (const o of options) {
    if (value(jobField.ticked(o.code)) !== "1") continue;
    let code = o.code;
    let band = o.band;
    let reference = o.schedulePrice;
    if (o.bands) {
      if (annualSales === null) return { error: `${o.label}: enter the client's annual gross sales; the price depends on them.` };
      const b = bandForSales(o.bands, annualSales);
      if (!b) return { error: `${o.label}: the schedule has no band for these sales.` };
      ({ code, band } = b);
      reference = b.price;
    }
    const name = band ? `${o.label} (${band})` : o.label;
    const parsed = parsePrice(value(jobField.price(o.code)) ?? "");
    if ("error" in parsed) return { error: `${name}: ${parsed.error}` };
    const amount = parsed.value ?? reference;
    if (amount === null) return { error: `${name}: enter its price (quoted on request), or untick it.` };
    const note = (value(jobField.note(o.code)) ?? "").trim().slice(0, 300);
    if (reference !== null && amount !== reference && !note) {
      return { error: `${name}: the price differs from the schedule's, so add a note saying why.` };
    }
    jobs.push({ code, label: o.label, band, group: o.group, amount, schedulePrice: reference, note: note || null, billed: o.billed });
  }
  return { jobs };
}

/**
 * The website says we do not audit statements we prepared. A warning (not a block)
 * when the audit is chosen for a client whose books we keep.
 */
export function auditIndependenceWarning(jobs: readonly Pick<ProposalJob, "label">[], keepsBooks: boolean): string | null {
  if (!keepsBooks || !jobs.some((j) => j.label === AUDIT_LABEL)) return null;
  return "Independence: this proposal has both the audit and bookkeeping for the same client. We do not audit statements we prepared; another firm should audit, or drop the bookkeeping.";
}

/**
 * The proposal's quote: the quote with the jobs chosen (they leave the
 * not-included list) and, above the cap, the agreed monthly retainer (required
 * then). `catchUpFactor` is the schedule's, for catch-up on the agreed retainer.
 */
export function buildProposalQuote(
  quote: Quote,
  jobs: readonly ProposalJob[],
  agreed: { monthly: number | null; catchUpFactor: number | null; annualSales?: number | null },
): { quote: ProposalQuote } | { error: string } {
  if (quote.outdatedSchedule) return { error: "The active fee schedule is from before 26 Nov 2026. Start a new version, price it and activate it first." };
  if (quote.overCap && agreed.monthly === null) {
    return { error: "The quote is above the monthly cap, so it is quoted on request. Enter the monthly retainer agreed for this client." };
  }
  const audit = jobs.find((j) => j.group === "audit") ?? null;
  const codes = new Set(jobs.map((j) => j.code));
  const labels = new Set(jobs.map((j) => j.label));
  let q: Quote = { ...quote, notIncluded: quote.notIncluded.filter((n) => !codes.has(n.code) && !(n.band === null && labels.has(n.label))) };
  if (agreed.monthly !== null) {
    const catchUp = quote.catchUp ? catchUpFor(quote.catchUp.months, agreed.catchUpFactor, agreed.monthly) : null;
    const oneTime = catchUp?.amount ?? 0;
    q = {
      ...q,
      monthlyRetainer: agreed.monthly,
      catchUp,
      oneTimeTotal: oneTime,
      tax: feeTax(quote.tax.kind, quote.tax.inclusive, agreed.monthly, oneTime),
      customQuote: q.customQuote.filter((c) => c.code !== "catch_up" || catchUp?.amount == null),
    };
  }
  return {
    quote: {
      ...q,
      annualJobs: jobs.filter((j) => j.group === "annual"),
      adHocJobs: jobs.filter((j) => j.group === "ad_hoc"),
      audit: audit ? { ...audit, indicative: true } : null,
      annualSales: agreed.annualSales ?? null,
      agreedMonthly: agreed.monthly,
    },
  };
}
