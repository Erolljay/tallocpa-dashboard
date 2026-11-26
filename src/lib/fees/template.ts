/**
 * The fee schedule's structure, from spec Appendix A. "Create draft from template"
 * inserts these items into a new draft schedule with every price empty: the prices
 * are the Owner's decision (open item O2) and are entered in Settings → Fee schedule.
 *
 * Codes are stable keys: quotes, proposals and the gap report find items by them,
 * so change a code only together with a migration of existing schedules.
 *
 * 26 Nov 2026 (Owner):
 *  - document volume (F) and bookkeeping (G) are one component, "Bookkeeping, by
 *    documents a month" (F), with a flat add-on for inventory, manufacturing or
 *    construction (once, even if several apply) and a charge per branch;
 *  - payroll and contributions for 50 or more employees are quoted on request;
 *  - the quote is monthly only, plus backlog catch-up (a schedule setting: months
 *    behind × catch-up factor × monthly retainer). Annual jobs (billing "annual")
 *    and ad hoc jobs (billing "one_time") are "not included in this quote": the
 *    proposal prices them, each group in its own section. Their price here is
 *    optional and fills in the proposal; services on request (K) never take one.
 * Migration 20261214000002_fee_quote_monthly.sql moved existing drafts to this
 * structure and added the Owner's prices as a new draft.
 */
import type { FeeItem, FeeItemTemplate } from "./types";

const NON_INDIVIDUAL = ["opc", "partnership", "corporation", "non_stock"] as const;

export const BOOKKEEPING_LABEL = "Bookkeeping, by documents a month";
/** Schedules from before 26 Nov 2026 priced catch-up with this item (factor of the monthly retainer). */
export const LEGACY_CATCH_UP_CODE = "I.backlog_month";

/** Employee bands shared by payroll (D) and contributions (E). The last band is quoted on request. */
export const EMPLOYEE_BANDS = [
  { key: "1-9", band: "1–9 employees", min: 1, max: 9 },
  { key: "10-29", band: "10–29 employees", min: 10, max: 29 },
  { key: "30-49", band: "30–49 employees", min: 30, max: 49 },
  { key: "50plus", band: "50 or more employees", min: 50, max: null },
] as const;

/**
 * Bookkeeping bands by documents a month (F): sales, purchases and 2307s. The last
 * band is quoted on request. The band edges are the structure; the prices are the Owner's.
 */
export const DOCUMENT_BANDS = [
  { key: "0-50", band: "Up to 50 a month", min: 0, max: 50 },
  { key: "51-150", band: "51–150 a month", min: 51, max: 150 },
  { key: "151-300", band: "151–300 a month", min: 151, max: 300 },
  { key: "301plus", band: "301 or more a month", min: 301, max: null },
] as const;

const item = (code: string, component: FeeItemTemplate["component"], label: string, band: string | null, billing: FeeItemTemplate["billing"], conditions: FeeItemTemplate["conditions"] = {}, extra: Partial<FeeItemTemplate> = {}): FeeItemTemplate => ({
  code,
  component,
  label,
  band,
  billing,
  isCustomQuote: false,
  unit: null,
  conditions,
  ...extra,
});

/**
 * Annual gross sales bands (pesos, whole). A value exactly on an edge falls in the
 * lower band: "over ₱3M to ₱10M" starts at ₱3,000,001. The last band is on request.
 */
export const SALES_BANDS = [
  { key: "0-3m", band: "sales up to ₱3M", min: 0, max: 3_000_000 },
  { key: "3m-10m", band: "sales over ₱3M to ₱10M", min: 3_000_001, max: 10_000_000 },
  { key: "10m-20m", band: "sales over ₱10M to ₱20M", min: 10_000_001, max: 20_000_000 },
  { key: "20m-50m", band: "sales over ₱20M to ₱50M", min: 20_000_001, max: 50_000_000 },
  { key: "50m-100m", band: "sales over ₱50M to ₱100M", min: 50_000_001, max: 100_000_000 },
  { key: "100mplus", band: "sales over ₱100M", min: 100_000_001, max: null },
] as const;

/** The audit is priced by taxpayer type; OPC and non-stock take the corporation price. */
export const AUDIT_TAXPAYERS = [
  { key: "proprietor", name: "Single proprietor", types: ["individual"] },
  { key: "partnership", name: "Partnership", types: ["partnership"] },
  { key: "corporation", name: "Corporation, OPC or non-stock", types: ["corporation", "opc", "non_stock"] },
] as const;

export const AUDIT_LABEL = "Audit of financial statements";
export const ITR_AFS_LABEL = "Annual ITR with AFS (preparation)";

/**
 * The audit is quoted and contracted separately by the firm under its own name
 * (Owner, 26 Nov 2026): it sits in its own group in the schedule and in the
 * proposal, for information, and is not part of what the client accepts.
 */
export const isAuditItem = (i: Pick<FeeItem, "code">) => i.code.startsWith("H.audit_");
export const AUDIT_FIRM_FALLBACK = "EJ Tallo Cloud Accounting and Auditing Services";
export const auditNote = (legalName: string | null | undefined) =>
  `Quoted and contracted separately by ${legalName?.trim() || AUDIT_FIRM_FALLBACK} under its own engagement letter. Not part of the Tallo CPA retainer or this proposal's acceptance.`;

const AUDIT_ITEMS: FeeItemTemplate[] = AUDIT_TAXPAYERS.flatMap((t) =>
  SALES_BANDS.map(
    (b): FeeItemTemplate => ({
      code: `H.audit_${t.key}_${b.key}`,
      component: "H",
      label: AUDIT_LABEL,
      band: `${t.name} · ${b.band}`,
      billing: "annual",
      isCustomQuote: b.max === null,
      unit: null,
      conditions: { taxpayer_types: [...t.types], annual_sales: { min: b.min, max: b.max } },
    }),
  ),
);

const employeeItems = (component: "D" | "E", label: string, extra: { remits_contributions?: true }): FeeItemTemplate[] =>
  EMPLOYEE_BANDS.map((b) =>
    item(`${component}.${b.key}`, component, label, b.band, "monthly", { ...extra, employees: { min: b.min, max: b.max } }, { isCustomQuote: b.max === null }),
  );

export const FEE_TEMPLATE: readonly FeeItemTemplate[] = [
  // A. Base
  item("A.individual", "A", "Base", "Individual", "monthly", { taxpayer_types: ["individual"] }),
  item("A.corporate", "A", "Base", "Corporation, OPC or partnership", "monthly", { taxpayer_types: ["opc", "partnership", "corporation"] }),
  item("A.non_stock", "A", "Base", "Non-stock, non-profit", "monthly", { taxpayer_types: ["non_stock"] }),

  // B. VAT
  item("B.individual", "B", "VAT returns", "Individual", "monthly", { vat: true, taxpayer_types: ["individual"] }),
  item("B.non_individual", "B", "VAT returns", "Non-individual", "monthly", { vat: true, taxpayer_types: [...NON_INDIVIDUAL] }),

  // C. Expanded withholding
  item("C.rental", "C", "Expanded withholding", "Rental only", "monthly", { ewt: "rental" }),
  item("C.regular", "C", "Expanded withholding", "TAMP or regular", "monthly", { ewt: "tamp_regular" }),

  // D. Payroll 1601-C, E. Contributions
  ...employeeItems("D", "Payroll withholding (1601-C)", {}),
  ...employeeItems("E", "SSS, PhilHealth, Pag-IBIG", { remits_contributions: true }),

  // F. Bookkeeping, by documents a month (merged with the former G, 26 Nov 2026)
  ...DOCUMENT_BANDS.map((b) =>
    item(`F.${b.key}`, "F", BOOKKEEPING_LABEL, b.band, "monthly", { documents: { min: b.min, max: b.max } }, { isCustomQuote: b.max === null }),
  ),
  item("F.complexity", "F", "Bookkeeping add-on", "Inventory, manufacturing or construction", "monthly", { complexity: "any" }),
  item("F.per_branch", "F", "Bookkeeping", "Each branch", "per_unit_monthly", { per: "branch" }, { unit: "branch" }),

  // Annual jobs (billing "annual"): not in the quote; priced in the proposal, each in its own section.
  // Preparation of the annual ITR with AFS, flat by taxpayer type (OPC and non-stock at the corporation price).
  item("H.itr_afs_individual", "H", ITR_AFS_LABEL, "Individual", "annual", { taxpayer_types: ["individual"] }),
  item("H.itr_afs_partnership", "H", ITR_AFS_LABEL, "Partnership", "annual", { taxpayer_types: ["partnership"] }),
  item("H.itr_afs_corporation", "H", ITR_AFS_LABEL, "Corporation, OPC or non-stock", "annual", { taxpayer_types: ["corporation", "opc", "non_stock"] }),
  item("H.1604c", "H", "Annual information return 1604-C", null, "annual", { employees: { min: 1, max: null } }),
  item("H.1604e", "H", "Annual information return 1604-E", null, "annual", { ewt: "any" }),
  item("H.sawt", "H", "Summary alphalist of withholding taxes (SAWT)", null, "annual"),
  item("H.inventory_list", "H", "Inventory list", null, "annual", { complexity: "inventory" }),
  ...AUDIT_ITEMS,

  // Ad hoc jobs (billing "one_time"): not in the quote; priced in the proposal, billed when done.
  item("I.orus", "I", "ORUS and BIR registration updates", null, "one_time"),
  item("I.business_permit", "I", "Business permit renewal (Iloilo City)", "Only in Iloilo City for now", "one_time"),
  item("I.sec", "I", "SEC filings", "GIS, AFS submission", "one_time", { taxpayer_types: [...NON_INDIVIDUAL] }),
  item("I.closure", "I", "Closure of business", null, "one_time"),
  // New business registration covers BIR and SEC only; the LGU permit and other registrations are separate.
  // OPC, partnership and non-stock take the corporation price.
  item("I.registration_individual", "I", "New business registration", "Individual · BIR and SEC only; LGU permit and others separate", "one_time", { taxpayer_types: ["individual"] }),
  item("I.registration_non_individual", "I", "New business registration", "Corporation, OPC or partnership · BIR and SEC only; LGU permit and others separate", "one_time", { taxpayer_types: [...NON_INDIVIDUAL] }),
  item("I.sss_registration", "I", "SSS registration", "Employer", "one_time", { employees: { min: 1, max: null } }),
  item("I.philhealth_registration", "I", "PhilHealth registration", "Employer", "one_time", { employees: { min: 1, max: null } }),
  item("I.pagibig_registration", "I", "Pag-IBIG (HDMF) registration", "Employer", "one_time", { employees: { min: 1, max: null } }),
  item("I.amended_return", "I", "Amended return", "Per return", "one_time", {}, { isCustomQuote: true }),
  item("I.certificate", "I", "BIR certificate or clearance", "e.g. tax clearance", "one_time", {}, { isCustomQuote: true }),
  item("K.bir_audit_support", "K", "BIR audit / LOA support", null, "one_time", {}, { isCustomQuote: true }),
  item("K.aup", "K", "Agreed-upon procedures", null, "one_time", {}, { isCustomQuote: true }),
  item("K.cas", "K", "CAS implementation", "Computerized accounting system", "one_time", {}, { isCustomQuote: true }),
  item("K.systems_implementation", "K", "Systems implementation", null, "one_time", {}, { isCustomQuote: true }),
  item("K.ai_automation", "K", "AI and business automation", null, "one_time", {}, { isCustomQuote: true }),
];

/** When an annual job is billed (calendar-year clients); ad hoc jobs are billed when done. */
const BILLED: Readonly<Record<string, string>> = {
  "H.itr_afs_individual": "billed in April",
  "H.itr_afs_partnership": "billed in April",
  "H.itr_afs_corporation": "billed in April",
  "H.1604c": "billed in January",
  "H.1604e": "billed in February",
  "H.sawt": "billed in April, with the annual return",
  "H.inventory_list": "billed in January",
  ...Object.fromEntries(AUDIT_TAXPAYERS.flatMap((t) => SALES_BANDS.map((b) => [`H.audit_${t.key}_${b.key}`, "billed when the audit report is issued"]))),
};
export const billedWhen = (i: Pick<FeeItem, "code" | "billing">) => BILLED[i.code] ?? (i.billing === "annual" ? "billed once a year" : "billed when done");

/** Rows for fee_items, in template order. */
export function templateRows(template: readonly FeeItemTemplate[] = FEE_TEMPLATE) {
  return template.map((t, i) => ({
    code: t.code,
    component: t.component,
    label: t.label,
    band_label: t.band,
    billing: t.billing,
    price: null,
    is_custom_quote: t.isCustomQuote,
    unit_label: t.unit,
    conditions: t.conditions,
    sort_order: (i + 1) * 10,
  }));
}

/** True when a schedule still has the structure from before 26 Nov 2026 (component G). */
export const isLegacySchedule = (items: readonly Pick<FeeItem, "component">[]) => items.some((i) => i.component === "G");

const pesoText = (n: number) => `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

type SortedItem = FeeItem & { sortOrder: number };

/** Items whose code changed on 26 Nov 2026: new code → code before. Their price carries over. */
const RENAMED: Readonly<Record<string, string>> = {
  "F.per_branch": "G.per_branch",
  "H.itr_afs_individual": "H.afs_itr",
  "H.itr_afs_partnership": "H.afs_itr",
  "H.itr_afs_corporation": "H.afs_itr",
};

/**
 * Moves a schedule's items to the 26 Nov 2026 structure, as migration
 * 20261214000002_fee_quote_monthly.sql did for drafts. "Start new version" uses it
 * when the active schedule is older than that:
 *  - the per-branch charge moves from G to F with its price, and the annual return
 *    with AFS (H.afs_itr) becomes three items, by taxpayer type, each at its price;
 *  - the F bands now carry the whole bookkeeping fee, and the complexity add-on is
 *    a flat amount instead of a factor, so those are left for the Owner to price;
 *  - G's levels and factors are removed, and the unpriced audit (K.fs_audit) gives
 *    way to the audit by sales band (H.audit_*); so is the catch-up item, whose factor
 *    becomes the schedule's catch-up factor (`catchUpFactor`);
 *  - every price cleared or removed is written in `note`, so none is lost silently.
 * Labels, bands and conditions follow the template; other prices are kept, and items
 * the template does not have (e.g. per employee above 50) stay as they were.
 * `note` is null when the items are already on the new structure.
 */
export function upgradeLegacyItems(items: readonly SortedItem[]): { items: SortedItem[]; note: string | null; catchUpFactor: number | null } {
  const catchUp = items.find((i) => i.code === LEGACY_CATCH_UP_CODE);
  if (!isLegacySchedule(items)) return { items: items.filter((i) => i !== catchUp), note: null, catchUpFactor: catchUp?.price ?? null };
  const byCode = new Map(items.map((i) => [i.code, i]));
  for (const [now, before] of Object.entries(RENAMED)) if (!byCode.has(now) && byCode.has(before)) byCode.set(now, byCode.get(before)!);
  const isBand = (i: Pick<FeeItem, "component" | "conditions">) => i.component === "F" && Boolean(i.conditions.documents);
  const earlier = items
    .filter((i) => i.price !== null && (isBand(i) || (i.component === "G" && i.code !== "G.per_branch")))
    .map((i) => `${i.label} (${i.band ?? i.code}) ${i.billing === "multiplier" ? `× ${i.price}` : pesoText(i.price as number)}`);
  const upgraded: SortedItem[] = FEE_TEMPLATE.map((t, n) => {
    const old = byCode.get(t.code);
    const price = t.isCustomQuote || isBand(t) ? null : (old?.price ?? null);
    return { ...t, price, sortOrder: (n + 1) * 10 };
  });
  const known = new Set([...FEE_TEMPLATE.map((t) => t.code), ...Object.values(RENAMED), "K.fs_audit"]);
  const extra = items
    .filter((i) => !known.has(i.code) && i.component !== "G" && i !== catchUp)
    .map((i, n) => ({ ...i, sortOrder: (FEE_TEMPLATE.length + n + 1) * 10 }));
  const note =
    "26 Nov 2026: moved to the new structure. Bookkeeping and document volume are one component (F, by documents a month) with a flat complexity add-on; set those prices again." +
    (earlier.length ? ` Earlier prices: ${earlier.join("; ")}.` : "");
  return { items: [...upgraded, ...extra], note, catchUpFactor: catchUp?.price ?? null };
}
