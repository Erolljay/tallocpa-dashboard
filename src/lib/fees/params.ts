/**
 * Reads the quote preview form (query string) into a client profile.
 * The form is a plain GET form so a quote can be bookmarked or shared with staff.
 */
import { TAXPAYER_TYPES, type TaxpayerType } from "@/lib/clients/obligations";
import { suggestedAnnualItems } from "./quote";
import { BOOKKEEPING_LEVELS, COMPLEXITY_FLAGS, EWT_KINDS, type BookkeepingLevel, type ClientProfile, type ComplexityFlag, type EwtKind, type FeeItem } from "./types";

export type QuerySource = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const all = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v === undefined ? [] : [v]);
const pick = <T extends string>(v: string, options: readonly T[], fallback: T): T => ((options as readonly string[]).includes(v) ? (v as T) : fallback);

/** A whole number from 0 to max; anything else is 0. */
export function count(v: string | string[] | undefined, max = 100_000): number {
  const n = Number(first(v).replace(/,/g, ""));
  return Number.isInteger(n) && n >= 0 ? Math.min(n, max) : 0;
}

/**
 * The profile asked for. Until the form is submitted (`q` absent) the annual
 * package is the suggested one, so a first look shows a realistic first-year total.
 */
export function profileFromQuery(q: QuerySource, items: readonly FeeItem[]): { profile: ClientProfile; submitted: boolean } {
  const submitted = first(q.q) === "1";
  const profile: ClientProfile = {
    taxpayerType: pick<TaxpayerType>(first(q.taxpayer_type), TAXPAYER_TYPES, "individual"),
    vatRegistered: first(q.vat) === "1",
    ewt: pick<EwtKind>(first(q.ewt), EWT_KINDS, "none"),
    employees: count(q.employees),
    remitsContributions: first(q.contributions) === "1",
    documentsPerMonth: count(q.documents),
    bookkeeping: pick<BookkeepingLevel>(first(q.bookkeeping), BOOKKEEPING_LEVELS, "none"),
    complexity: all(q.complexity).filter((c): c is ComplexityFlag => (COMPLEXITY_FLAGS as readonly string[]).includes(c)),
    branches: count(q.branches, 1000),
    annualItems: [],
    oneTimeItems: [],
  };
  const annualCodes = new Set(items.filter((i) => i.billing === "annual").map((i) => i.code));
  profile.annualItems = submitted ? all(q.annual).filter((c) => annualCodes.has(c)) : suggestedAnnualItems(items, profile);
  for (const i of items) {
    const oneTime = i.billing === "one_time" || (i.billing === "multiplier" && i.conditions.of === "monthly_retainer");
    if (!oneTime) continue;
    const quantity = count(q[`once.${i.code}`], 1000);
    if (quantity > 0) profile.oneTimeItems.push({ code: i.code, quantity });
  }
  return { profile, submitted };
}
