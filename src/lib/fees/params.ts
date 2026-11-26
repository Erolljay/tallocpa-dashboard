/**
 * Reads the quote form (query string, or the website form's fields) into a client
 * profile. The preview form is a plain GET form so a quote can be bookmarked or
 * shared with staff.
 *
 * Fields: taxpayer_type, vat, ewt (none, rental, tamp_regular), employees, contributions, documents (a month),
 * complexity (repeated), branches, behind (months of backlog).
 */
import { TAXPAYER_TYPES, type TaxpayerType } from "@/lib/clients/obligations";
import { LEGACY_CATCH_UP_CODE } from "./template";
import { COMPLEXITY_FLAGS, EWT_KINDS, type ClientProfile, type ComplexityFlag, type EwtKind } from "./types";

export type QuerySource = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const all = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v === undefined ? [] : [v]);
const pick = <T extends string>(v: string, options: readonly T[], fallback: T): T => ((options as readonly string[]).includes(v) ? (v as T) : fallback);

/**
 * The website's withholding question ("Do you withhold tax on payments to others?"),
 * in plain words, and the kind it means. Anything else reads as "none".
 */
export const EWT_CHOICES: readonly { value: EwtKind; label: string }[] = [
  { value: "none", label: "No" },
  { value: "rental", label: "Yes, on rent or contractors" },
  { value: "tamp_regular", label: "Yes, we are a Top Withholding Agent (TAMP)" },
];

/** Months of backlog a quote takes at most. */
export const MAX_MONTHS_BEHIND = 120;

/** A whole number from 0 to max; anything else is 0. */
export function count(v: string | string[] | undefined, max = 100_000): number {
  const n = Number(first(v).replace(/,/g, ""));
  return Number.isInteger(n) && n >= 0 ? Math.min(n, max) : 0;
}

const complexity = (v: unknown[]) => v.filter((c): c is ComplexityFlag => typeof c === "string" && (COMPLEXITY_FLAGS as readonly string[]).includes(c));

/** The profile asked for. A bookmarked link from before 26 Nov 2026 still gives its backlog months. */
export function profileFromQuery(q: QuerySource): { profile: ClientProfile; submitted: boolean } {
  const submitted = first(q.q) === "1";
  const profile: ClientProfile = {
    taxpayerType: pick<TaxpayerType>(first(q.taxpayer_type), TAXPAYER_TYPES, "individual"),
    vatRegistered: first(q.vat) === "1",
    ewt: pick<EwtKind>(first(q.ewt), EWT_KINDS, "none"),
    employees: count(q.employees),
    remitsContributions: first(q.contributions) === "1",
    documentsPerMonth: count(q.documents),
    complexity: complexity(all(q.complexity)),
    branches: count(q.branches, 1000),
    monthsBehind: count(q.behind ?? q[`once.${LEGACY_CATCH_UP_CODE}`], MAX_MONTHS_BEHIND),
  };
  return { profile, submitted };
}

/**
 * A profile as stored on a lead (leads.profile), including those saved before
 * 26 Nov 2026: their bookkeeping level and annual items are dropped, and their
 * backlog months become months behind. Anything unreadable takes the plain default.
 */
export function profileFromStored(raw: unknown): ClientProfile {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const whole = (v: unknown, max: number) => (typeof v === "number" && Number.isInteger(v) && v >= 0 ? Math.min(v, max) : 0);
  const legacyBehind = Array.isArray(r.oneTimeItems)
    ? (r.oneTimeItems as { code?: unknown; quantity?: unknown }[]).find((o) => o?.code === LEGACY_CATCH_UP_CODE)?.quantity
    : undefined;
  return {
    taxpayerType: pick<TaxpayerType>(String(r.taxpayerType ?? ""), TAXPAYER_TYPES, "individual"),
    vatRegistered: r.vatRegistered === true,
    ewt: pick<EwtKind>(String(r.ewt ?? ""), EWT_KINDS, "none"),
    employees: whole(r.employees, 100_000),
    remitsContributions: r.remitsContributions === true,
    documentsPerMonth: whole(r.documentsPerMonth, 100_000),
    complexity: complexity(Array.isArray(r.complexity) ? r.complexity : []),
    branches: whole(r.branches, 1000),
    monthsBehind: whole(r.monthsBehind ?? legacyBehind, MAX_MONTHS_BEHIND),
  };
}
