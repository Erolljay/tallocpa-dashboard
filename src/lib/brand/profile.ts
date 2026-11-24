/**
 * Brand profile rules (spec §3.1): TIN and branch code, contact details,
 * credentials and their expiry, invoicing. Shared by the settings form, its
 * server actions and the statement header. The database checks the same
 * formats (migration 20261123000013_brand_profile.sql).
 */
import { z } from "zod";

/** Parses a TIN typed any common way: 123456789, 123-456-789, 123 456 789, or with a branch code appended. */
export function parseTin(input: string): { tin: string; branch: string | null } | null {
  const m = input.trim().match(/^(\d{3})[- ]?(\d{3})[- ]?(\d{3})(?:[- ]?(\d{3,5}))?$/);
  if (!m) return null;
  return { tin: `${m[1]}-${m[2]}-${m[3]}`, branch: m[4] ?? null };
}

/** TIN with its branch code for print, e.g. 123-456-789-00000. */
export function formatTin(tin: string | null | undefined, branch: string | null | undefined): string | null {
  if (!tin) return null;
  return branch ? `${tin}-${branch}` : tin;
}

export const BRANCH_CODE = /^\d{3,5}$/;
const RDO = /^\d{2,3}[A-Z]?$/;
const PHONE = /^[0-9+()\-./\s]{7,40}$/;
const FACEBOOK = /^https?:\/\/([a-z0-9-]+\.)*(facebook\.com|fb\.com|fb\.me)\/\S+$/i;

export type ExpiryTone = "expired" | "soon" | "ok";
export interface Expiry {
  tone: ExpiryTone;
  /** Days from today to the valid-until date; negative once past. */
  days: number;
  /** "Expired", "Expires today", "Expires in 12 days", or null when not close. */
  label: string | null;
}

/** Days are counted on calendar dates (YYYY-MM-DD), so time zones do not shift them. */
export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

/** Whether a credential valid until `validUntil` needs attention as of `today` (within `windowDays`, or past). */
export function expiryStatus(validUntil: string | null | undefined, today: string, windowDays = 60): Expiry | null {
  if (!validUntil) return null;
  const days = daysBetween(today, validUntil);
  if (days < 0) return { tone: "expired", days, label: "Expired" };
  if (days > windowDays) return { tone: "ok", days, label: null };
  return { tone: "soon", days, label: days === 0 ? "Expires today" : `Expires in ${days} day${days === 1 ? "" : "s"}` };
}

export const INVOICE_METHODS = {
  booklet: "Printed booklet (bound, from an accredited printer)",
  loose_leaf: "Loose-leaf (from an accredited printer)",
  cas: "Computerized accounting system (CAS)",
} as const;
export type InvoiceMethod = keyof typeof INVOICE_METHODS;

export const TAX_ON_FEE = {
  percentage_tax_3: "Non-VAT · 3% percentage tax",
  vat_12: "VAT-registered · 12% VAT",
} as const;
export type TaxOnFee = keyof typeof TAX_ON_FEE;

// ---------------------------------------------------------------------------
// Form schemas, one per settings card. Blank fields become null.
// ---------------------------------------------------------------------------
const blank = (v: unknown) => (typeof v === "string" ? (v.trim() === "" ? null : v.trim()) : v);
const optional = (inner: z.ZodType) => z.preprocess(blank, inner.nullable());
const text = (max: number, label: string) => optional(z.string().max(max, `Keep ${label} under ${max} characters.`));
const date = (label: string) => optional(z.iso.date(`Enter ${label} as a date.`));
/** Accepts tallocpa.com and stores https://tallocpa.com. */
const withScheme = (v: unknown) => {
  const b = blank(v);
  return typeof b === "string" && !/^https?:\/\//i.test(b) ? `https://${b}` : b;
};

export const identitySchema = z.object({
  display_name: z.string().trim().min(2, "Enter the name clients know the firm by.").max(80, "Keep the display name under 80 characters."),
  legal_name: z.string().trim().min(2, "Enter the registered name as on the COR.").max(160, "Keep the legal name under 160 characters."),
});

export const birSchema = z
  .object({
    tin: optional(z.string()),
    tin_branch_code: optional(z.string().regex(BRANCH_CODE, "The branch code is 3 to 5 digits, e.g. 00000 for the head office.")),
    rdo_code: z.preprocess((v) => (typeof blank(v) === "string" ? (blank(v) as string).toUpperCase() : blank(v)), z.string().regex(RDO, "The RDO code is 2 or 3 digits, sometimes with a letter, e.g. 074 or 113A.").nullable()),
    registered_address: text(300, "the address"),
  })
  .transform((v, ctx) => {
    if (v.tin === null) return { ...v, tin: null };
    const parsed = parseTin(v.tin as string);
    if (!parsed) {
      ctx.addIssue({ code: "custom", message: "Enter the TIN as 9 digits, e.g. 123-456-789.", path: ["tin"] });
      return z.NEVER;
    }
    return { ...v, tin: parsed.tin, tin_branch_code: v.tin_branch_code ?? parsed.branch };
  });

export const contactSchema = z.object({
  business_address: text(300, "the address"),
  phone: optional(z.string().regex(PHONE, "Enter a phone number, e.g. 0917 123 4567, or two numbers as 0917 123 4567 / 0938 777 7795.")),
  reply_to_email: optional(z.email("Enter a valid email address.").max(120)),
  website: z.preprocess(withScheme, z.url({ protocol: /^https?$/, message: "Enter a web address, e.g. tallocpa.com." }).max(200).nullable()),
  facebook_url: z.preprocess(withScheme, z.string().regex(FACEBOOK, "Enter the Facebook page link, e.g. facebook.com/tallocpa.").max(200).nullable()),
});

export const credentialsSchema = z.object({
  cpa_license_no: text(40, "the licence number"),
  boa_firm_accreditation_no: text(60, "the accreditation number"),
  boa_firm_accreditation_valid_until: date("the BOA firm accreditation expiry"),
  boa_individual_accreditation_no: text(60, "the accreditation number"),
  boa_individual_accreditation_valid_until: date("the BOA individual accreditation expiry"),
  bir_tax_agent_accreditation_no: text(60, "the accreditation number"),
  bir_tax_agent_accreditation_valid_until: date("the BIR accreditation expiry"),
  ptr_no: text(40, "the PTR number"),
  ptr_date: date("the PTR date"),
  ptr_place: text(80, "the place"),
  dti_business_name_no: text(40, "the DTI number"),
});

export const signatorySchema = z.object({
  signatory_name: text(120, "the name"),
  signatory_title: text(120, "the title"),
});

export const invoicingSchema = z.object({
  invoice_method: optional(z.enum(Object.keys(INVOICE_METHODS) as [InvoiceMethod, ...InvoiceMethod[]], "Choose how invoices are issued.")),
  invoice_series_prefix: text(20, "the prefix"),
  atp_or_permit_no: text(60, "the permit number"),
});

export const taxSchema = z.object({
  tax_on_fee: z.enum(Object.keys(TAX_ON_FEE) as [TaxOnFee, ...TaxOnFee[]], "Choose the tax on our fee."),
  gross_receipts_warning: z.preprocess(
    (v) => (typeof v === "string" ? v.replace(/[₱,\s]/g, "") : v),
    z.coerce.number("Enter the warning amount in pesos.").positive("Enter an amount above zero.").max(1_000_000_000, "That amount is too large.").multipleOf(0.01, "Use at most two decimals."),
  ),
});

export const SECTIONS = {
  identity: identitySchema,
  bir: birSchema,
  contact: contactSchema,
  credentials: credentialsSchema,
  signatory: signatorySchema,
  invoicing: invoicingSchema,
  tax: taxSchema,
} as const;
export type Section = keyof typeof SECTIONS;

/** Fields each section's form sends; anything else in the form is ignored. */
export const SECTION_FIELDS: Record<Section, readonly string[]> = {
  identity: Object.keys(identitySchema.shape),
  bir: ["tin", "tin_branch_code", "rdo_code", "registered_address"],
  contact: Object.keys(contactSchema.shape),
  credentials: Object.keys(credentialsSchema.shape),
  signatory: Object.keys(signatorySchema.shape),
  invoicing: Object.keys(invoicingSchema.shape),
  tax: Object.keys(taxSchema.shape),
};

/** Validates one section of the form; returns the columns to save or the first problem. */
export function parseSection(section: Section, values: Record<string, unknown>): { data: Record<string, unknown> } | { error: string } {
  const input = Object.fromEntries(SECTION_FIELDS[section].map((k) => [k, values[k] ?? ""]));
  const r = SECTIONS[section].safeParse(input);
  if (!r.success) return { error: r.error.issues[0].message };
  return { data: r.data as Record<string, unknown> };
}

/** The firm block printed on statements: blank lines are left out. */
export interface FirmBlock {
  display_name: string;
  legal_name: string;
  tin: string | null;
  tin_branch_code: string | null;
  registered_address: string | null;
  business_address: string | null;
  phone: string | null;
  reply_to_email: string | null;
  tax_on_fee: TaxOnFee;
}

export function firmBlockLines(b: FirmBlock): string[] {
  const tin = formatTin(b.tin, b.tin_branch_code);
  const sameAddress = b.business_address && b.registered_address && b.business_address.trim().toLowerCase() === b.registered_address.trim().toLowerCase();
  const contact = [b.phone, b.reply_to_email].filter(Boolean).join(" · ");
  return [
    b.legal_name && b.legal_name !== b.display_name ? b.legal_name : null,
    tin ? `${b.tax_on_fee === "vat_12" ? "VAT" : "Non-VAT"} Reg. TIN ${tin}` : null,
    b.registered_address,
    sameAddress ? null : b.business_address,
    contact || null,
  ].filter((l): l is string => Boolean(l && l.trim()));
}
