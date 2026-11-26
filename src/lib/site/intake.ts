/**
 * The "Tell us about your business" picker on the service pages, and how /start
 * prefills its form from it. The picker sends plain query parameters; /start maps
 * them onto the fields it already has and leaves everything else alone:
 *
 *   taxpayer_type  → the Type select (same values as the fee model)
 *   tax=vat        → VAT-registered checked (tax=pt leaves it unchecked)
 *   industry       → a complexity checkbox where one fits (inventory, manufacturing,
 *                    construction); otherwise only the note
 *   service        → the Services checkboxes (tax_compliance, bookkeeping)
 *   industry + tax → a short editable note in "Anything we should know", because
 *                    /start has no field for industry, 1601-C, expanded withholding
 *                    or income tax (the fee model counts employees instead)
 *
 * Nothing is submitted for the visitor: these are default values they can change.
 */

export const INDUSTRIES = [
  { id: "retail", label: "Retail or trading", complexity: "inventory" },
  { id: "food", label: "Food and restaurants" },
  { id: "professional", label: "Professional services" },
  { id: "construction", label: "Construction", complexity: "construction" },
  { id: "manufacturing", label: "Manufacturing", complexity: "manufacturing" },
  { id: "real_estate", label: "Real estate" },
  { id: "online", label: "Online selling", complexity: "inventory" },
  { id: "other", label: "Others" },
] as const;
export type IndustryId = (typeof INDUSTRIES)[number]["id"];

export const PICKER_TAXPAYER_TYPES = [
  { id: "individual", label: "Individual (sole proprietor or professional)" },
  { id: "opc", label: "One Person Corporation" },
  { id: "partnership", label: "Partnership" },
  { id: "corporation", label: "Corporation" },
] as const;
export type PickerTaxpayerType = (typeof PICKER_TAXPAYER_TYPES)[number]["id"];

/** Tax types as a Certificate of Registration (Form 2303) lists them. VAT and percentage tax exclude each other. */
export const TAX_CHOICES = [
  { id: "vat", label: "VAT", form: "2550Q" },
  { id: "pt", label: "Percentage tax", form: "2551Q" },
  { id: "wc", label: "Withholding on compensation", form: "1601-C" },
  { id: "ewt", label: "Expanded withholding", form: "0619-E, 1601-EQ" },
  { id: "it", label: "Income tax", form: "1701Q/1701 or 1702Q/1702" },
] as const;
export type TaxChoice = (typeof TAX_CHOICES)[number]["id"];

export const PICKER_SERVICES = ["tax_compliance", "bookkeeping"] as const;
export type PickerService = (typeof PICKER_SERVICES)[number];

type Query = Record<string, string | string[] | undefined>;
const all = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v === undefined ? [] : [v]);
const first = (v: string | string[] | undefined) => all(v)[0] ?? "";
const known = <T extends string>(ids: readonly T[], v: string): v is T => (ids as readonly string[]).includes(v);

/** The /start URL for a picker's answers (attribution is added by the CTA link). */
export function startHref(a: { industry: IndustryId | null; taxpayerType: PickerTaxpayerType | null; taxes: TaxChoice[]; service: PickerService | null }): string {
  const q = new URLSearchParams();
  if (a.service) q.set("service", a.service);
  if (a.taxpayerType) q.set("taxpayer_type", a.taxpayerType);
  if (a.industry) q.set("industry", a.industry);
  for (const t of TAX_CHOICES) if (a.taxes.includes(t.id)) q.append("tax", t.id);
  const qs = q.toString();
  return qs ? `/start?${qs}` : "/start";
}

export interface StartPrefill {
  taxpayerType?: PickerTaxpayerType;
  vat?: boolean;
  complexity: string[];
  services: PickerService[];
  message?: string;
}

/** Reads /start's query string into default values for its form; unknown values are ignored. */
export function prefillFromQuery(q: Query): StartPrefill {
  const out: StartPrefill = { complexity: [], services: [] };
  const type = first(q.taxpayer_type);
  if (known(PICKER_TAXPAYER_TYPES.map((t) => t.id), type)) out.taxpayerType = type;

  const taxes = all(q.tax).filter((t): t is TaxChoice => known(TAX_CHOICES.map((c) => c.id), t));
  if (taxes.includes("vat")) out.vat = true;
  else if (taxes.includes("pt")) out.vat = false;

  const industry = INDUSTRIES.find((i) => i.id === first(q.industry));
  if (industry && "complexity" in industry) out.complexity.push(industry.complexity);

  const service = first(q.service);
  if (known(PICKER_SERVICES, service)) out.services.push(service);

  const parts: string[] = [];
  if (industry) parts.push(`Industry: ${industry.label}.`);
  const listed = TAX_CHOICES.filter((c) => taxes.includes(c.id) && !(c.id === "pt" && taxes.includes("vat")));
  if (listed.length) parts.push(`Tax types on our COR: ${listed.map((c) => `${c.label} (${c.form})`).join("; ")}.`);
  if (parts.length) out.message = parts.join(" ");
  return out;
}
