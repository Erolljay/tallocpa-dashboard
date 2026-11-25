/**
 * Tax codes (docs/REWORK.md, decisions 6, 7 and 11): the kinds the returns group on,
 * and the return lines each kind feeds. The codes themselves are the firm-wide
 * `tax_codes` table (migration 20261126000002_tax_codes.sql); every code has one of
 * these kinds. Tax codes go only on Sales and Purchase Invoices: a VAT code on each
 * line, a withholding code (and on a sale to the government a WV code) on the invoice.
 *
 * Line numbers are those of the 2550Q worksheet (src/lib/returns/forms/business/vat.ts).
 */

export const TAX_CODE_KINDS = [
  "output_vat",
  "vat_exempt_sales",
  "zero_rated_sales",
  "non_vat_sales",
  "input_vat_capital",
  "input_vat_goods",
  "input_vat_services",
  "vat_exempt_purchases",
  "zero_rated_purchases",
  "non_vat_purchases",
  "not_reported_purchases",
  "withholding",
  "govt_vat_withheld",
] as const;
export type TaxCodeKind = (typeof TAX_CODE_KINDS)[number];

export const TAX_CODE_KIND_LABELS: Record<TaxCodeKind, string> = {
  output_vat: "Output VAT",
  vat_exempt_sales: "VAT-exempt sales",
  zero_rated_sales: "Zero-rated sales",
  non_vat_sales: "Non-VAT sales (percentage tax or 8%)",
  input_vat_capital: "Input VAT – capital goods",
  input_vat_goods: "Input VAT – goods other than capital goods",
  input_vat_services: "Input VAT – services",
  vat_exempt_purchases: "VAT-exempt purchases",
  zero_rated_purchases: "Zero-rated purchases",
  non_vat_purchases: "Non-VAT purchases (no input VAT; deductible)",
  not_reported_purchases: "No invoice – not reported (deductible expense)",
  withholding: "Withholding tax (EWT on purchases, CWT on sales)",
  govt_vat_withheld: "VAT withheld by a government customer",
};

export type InvoiceKind = "sales" | "purchase";
/** Where a code goes: on a line (VAT codes) or on the invoice (withholding codes). */
export type TaxCodePlace = "line" | "invoice";

/** A tax code as read from `tax_codes`. */
export interface TaxCode {
  id: string;
  code: string;
  name: string;
  kind: TaxCodeKind;
  /** 0.12 for 12%. */
  rate: number;
  atc: string | null;
  payeeType: "corporate" | "individual" | null;
  active: boolean;
}

/** The invoices a kind goes on (as tax_codes.applies_to). */
export function appliesTo(kind: TaxCodeKind): InvoiceKind[] {
  if (kind === "withholding") return ["sales", "purchase"];
  if (kind === "output_vat" || kind === "vat_exempt_sales" || kind === "zero_rated_sales" || kind === "non_vat_sales" || kind === "govt_vat_withheld") return ["sales"];
  return ["purchase"];
}

export function placeOf(kind: TaxCodeKind): TaxCodePlace {
  return kind === "withholding" || kind === "govt_vat_withheld" ? "invoice" : "line";
}

/** Whether a code of this kind may go on this invoice, in this place (the database checks the same). */
export function canGoOn(kind: TaxCodeKind, invoice: InvoiceKind, place: TaxCodePlace): boolean {
  return placeOf(kind) === place && appliesTo(kind).includes(invoice);
}

export type ReturnForm = "2550Q" | "2551Q" | "SLS" | "SLP" | "0619-E" | "1601-EQ" | "QAP" | "2307 issued" | "SAWT" | "2307 received" | "1701Q" | "1702Q";

/** A return line or attachment column a tax code's amounts land on. */
export interface ReturnLine {
  form: ReturnForm;
  /** The item number on the form, or the attachment's column. */
  line: string;
  label: string;
}

const L = (form: ReturnForm, line: string, label: string): ReturnLine => ({ form, line, label });

/**
 * What each kind feeds, by the invoice it is on. Withholding is EWT on a Purchase
 * Invoice and CWT on a Sales Invoice.
 */
export const RETURN_LINES: Record<TaxCodeKind, Partial<Record<InvoiceKind, ReturnLine[]>>> = {
  output_vat: {
    sales: [L("2550Q", "31A", "VATable sales"), L("2550Q", "31B", "Output tax on VATable sales"), L("SLS", "taxable_sales", "Taxable sales"), L("SLS", "output_tax", "Output tax")],
  },
  vat_exempt_sales: { sales: [L("2550Q", "33A", "Exempt sales"), L("SLS", "exempt_sales", "Exempt sales")] },
  zero_rated_sales: { sales: [L("2550Q", "32A", "Zero-rated sales"), L("SLS", "zero_rated_sales", "Zero-rated sales")] },
  input_vat_capital: {
    purchase: [L("2550Q", "44A", "Domestic purchases"), L("2550Q", "44B", "Input tax on domestic purchases"), L("SLP", "capital_goods", "Purchase of capital goods"), L("SLP", "input_tax", "Input tax")],
  },
  input_vat_goods: {
    purchase: [L("2550Q", "44A", "Domestic purchases"), L("2550Q", "44B", "Input tax on domestic purchases"), L("SLP", "other_goods", "Purchase of goods other than capital goods"), L("SLP", "input_tax", "Input tax")],
  },
  input_vat_services: {
    purchase: [L("2550Q", "44A", "Domestic purchases"), L("2550Q", "44B", "Input tax on domestic purchases"), L("SLP", "services", "Purchase of services"), L("SLP", "input_tax", "Input tax")],
  },
  vat_exempt_purchases: { purchase: [L("2550Q", "49A", "VAT-exempt purchases"), L("SLP", "exempt_purchases", "Exempt purchases")] },
  zero_rated_purchases: { purchase: [L("2550Q", "48A", "Zero-rated purchases"), L("SLP", "zero_rated_purchases", "Zero-rated purchases")] },
  non_vat_sales: { sales: [L("2551Q", "taxable_amount", "Taxable amount (gross sales or receipts)"), L("1701Q", "sales", "Sales or receipts (8% option or graduated)")] },
  // A non-VAT client files no summary list: its purchases feed only the income statement.
  non_vat_purchases: { purchase: [] },
  // Purchases with no invoice: in the income statement and deductible, but on no BIR list or return.
  not_reported_purchases: { purchase: [] },
  withholding: {
    purchase: [
      L("0619-E", "14", "Amount of remittance (by ATC)"),
      L("1601-EQ", "Schedule 1", "Expanded withholding tax by ATC"),
      L("QAP", "tax_withheld", "Amount of tax withheld, per payee and ATC"),
      L("2307 issued", "tax_withheld", "Tax withheld, per payee and quarter"),
    ],
    sales: [
      L("SAWT", "tax_withheld", "Tax withheld, per payor and ATC"),
      L("2307 received", "tax_withheld", "Tax withheld by the customer"),
      L("1702Q", "creditable_tax_withheld", "Creditable tax withheld per BIR 2307"),
      L("1701Q", "creditable_tax_withheld", "Creditable tax withheld per BIR 2307"),
    ],
  },
  govt_vat_withheld: {
    sales: [L("2550Q", "16", "Creditable VAT withheld (Schedule 3)"), L("SAWT", "vat_withheld", "VAT withheld by a government payor (WV ATC)")],
  },
};

/** The return lines a code's amounts feed on this invoice (empty when it cannot go there). */
export function returnLinesFor(kind: TaxCodeKind, invoice: InvoiceKind): ReturnLine[] {
  return RETURN_LINES[kind][invoice] ?? [];
}

/** The forms a kind feeds on this invoice, once each. */
export function formsFor(kind: TaxCodeKind, invoice: InvoiceKind): ReturnForm[] {
  return [...new Set(returnLinesFor(kind, invoice).map((l) => l.form))];
}

/** VAT (or tax withheld) on an amount in centavos at a code's rate, rounded to the centavo. */
export function taxOn(amountCentavos: number, rate: number): number {
  return Math.round(amountCentavos * rate);
}

/** Maps a `tax_codes` row to a TaxCode. */
export function toTaxCode(r: { id: string; code: string; name: string; kind: string; rate: number | string; atc: string | null; payee_type: string | null; active: boolean }): TaxCode {
  return {
    id: r.id,
    code: r.code,
    name: r.name,
    kind: r.kind as TaxCodeKind,
    rate: Number(r.rate),
    atc: r.atc,
    payeeType: (r.payee_type as TaxCode["payeeType"]) ?? null,
    active: r.active,
  };
}
