/**
 * Current fee vs computed fee for existing clients (spec §3.12; Q49, Q52).
 * Existing clients keep their fees until their annual renewal; this only shows
 * the gap. The OS does not record everything a quote needs (employees, kind of
 * withholding, branches, complexity), so anything not recorded takes the LOWEST band
 * and is listed as an assumption: the computed fee is an estimate, at least this much.
 * Bookkeeping is priced by the documents the client actually sent (F), whether or
 * not the client has the bookkeeping service line (Owner, 26 Nov 2026). The quote is
 * monthly only, so the gap is monthly only: there is no annual package to compare.
 */
import type { TaxpayerType } from "@/lib/clients/obligations";
import { buildQuote, documentBand, type QuoteInput } from "./quote";
import type { ClientProfile, FeeItem, ScheduleSettings, TaxOnFee } from "./types";

export interface ExistingClient {
  taxpayerType: TaxpayerType;
  /** Forms of the client's open obligations, e.g. 2550Q, 0619-E, 1601-C. */
  openForms: readonly string[];
  /** Submitted documents (sales, purchases, 2307s, other) per month over the window, oldest first. */
  monthlyDocuments: readonly number[];
}

export interface EstimatedProfile {
  profile: ClientProfile;
  assumptions: string[];
  averageDocuments: number;
}

const has = (forms: readonly string[], ...wanted: string[]) => wanted.some((w) => forms.includes(w));

export function estimateProfile(c: ExistingClient): EstimatedProfile {
  const assumptions: string[] = [];
  const vat = has(c.openForms, "2550Q", "2550M");
  const ewt = has(c.openForms, "0619-E", "1601-EQ", "1604-E");
  const payroll = has(c.openForms, "1601-C", "1604-C");
  const months = c.monthlyDocuments.length;
  const averageDocuments = months ? Math.round(c.monthlyDocuments.reduce((s, n) => s + n, 0) / months) : 0;

  if (ewt) assumptions.push("Expanded withholding priced at the rent-or-contractors band (the lower band); the kind is not recorded.");
  if (payroll) assumptions.push("Payroll priced at 1–9 employees and without SSS, PhilHealth, Pag-IBIG; headcount is not recorded.");
  if (!months) assumptions.push("No document history yet; volume taken as 0.");

  return {
    averageDocuments,
    assumptions,
    profile: {
      taxpayerType: c.taxpayerType,
      vatRegistered: vat,
      ewt: ewt ? "rental" : "none",
      employees: payroll ? 1 : 0,
      remitsContributions: false,
      documentsPerMonth: averageDocuments,
      complexity: [],
      branches: 0,
      monthsBehind: 0,
    },
  };
}

export interface GapRow {
  currentMonthly: number;
  computedMonthly: number;
  /** computed − current: positive means the client pays less than the schedule. */
  gap: number;
  averageDocuments: number;
  /** The bookkeeping band the client's documents fall in, and whether it is above the first band. */
  volumeBand: string | null;
  aboveFirstBand: boolean;
  volumeNeedsCustomQuote: boolean;
  /** Documents in the busiest month of the window. */
  peakDocuments: number;
  assumptions: string[];
  /** True when some item that applies has no price, so the computed fee is understated. */
  incomplete: boolean;
}

export function gapFor(
  client: ExistingClient & { currentMonthly: number },
  schedule: { items: readonly FeeItem[]; settings: ScheduleSettings; taxOnFee: TaxOnFee },
  today: string,
): GapRow {
  const est = estimateProfile(client);
  const input: QuoteInput = { profile: est.profile, items: schedule.items, settings: schedule.settings, taxOnFee: schedule.taxOnFee, quoteDate: today };
  const q = buildQuote(input);
  const band = documentBand(schedule.items, est.averageDocuments);
  const firstBand = schedule.items
    .filter((i) => i.component === "F" && i.conditions.documents)
    .sort((a, b) => (a.conditions.documents?.min ?? 0) - (b.conditions.documents?.min ?? 0))[0];
  const firstMax = firstBand?.conditions.documents?.max ?? null;
  const peak = client.monthlyDocuments.length ? Math.max(...client.monthlyDocuments) : 0;
  return {
    currentMonthly: client.currentMonthly,
    computedMonthly: q.monthlyRetainer,
    gap: Math.round((q.monthlyRetainer - client.currentMonthly) * 100) / 100,
    averageDocuments: est.averageDocuments,
    volumeBand: band?.band ?? null,
    aboveFirstBand: firstMax !== null && est.averageDocuments > firstMax,
    volumeNeedsCustomQuote: Boolean(band?.isCustomQuote),
    peakDocuments: peak,
    assumptions: est.assumptions,
    incomplete: !q.complete,
  };
}

/** First days of the `count` whole months before `today`'s month, oldest first. */
export function lastWholeMonths(today: string, count: number): string[] {
  const [y, m] = today.split("-").map(Number);
  const out: string[] = [];
  for (let k = count; k >= 1; k--) {
    const index = y * 12 + (m - 1) - k;
    const yy = Math.floor(index / 12);
    const mm = (index % 12) + 1;
    out.push(`${yy}-${String(mm).padStart(2, "0")}-01`);
  }
  return out;
}
