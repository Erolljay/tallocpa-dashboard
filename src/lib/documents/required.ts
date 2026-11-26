/**
 * What a document must have before it is approved, so it can go to the Books and onto
 * the BIR attachments (SLS, SLP, QAP, SAWT) without coming back. Staff fill these in on
 * review; the approve actions refuse a document that still misses one. Pure: the
 * review form, the approve action and "Approve selected" share it.
 *
 *   Every sale or purchase   date, document number, supplier / customer, total
 *   A purchase (SLP)         the supplier's TIN and address
 *   Tax withheld (QAP, SAWT) the TIN and the ATC
 *   VAT withheld (SAWT)      the government customer's TIN
 *   An individual            last and first name (every list)
 *   A 2307                   date, payor / payee, TIN, ATC and the tax withheld
 *   Books clients            the account title, a tax code on every amount, the
 *                            withholding code when tax is withheld, and the cash or
 *                            bank account of a cash sale or purchase
 */
import type { OcrFields } from "@/lib/ocr/fields";

export interface Missing {
  field: string;
  label: string;
}

/** The Books side of the review form, when the client keeps books. */
export interface BooksChoices {
  accountId: string | null;
  /** A sale or purchase posted as an invoice: its line codes and withholding code. */
  invoice?: { lineCodes: (string | null)[]; withholdingCode: string | null; vatWithholdingCode: string | null; terms: "cash" | "charge"; cashAccountId: string | null } | null;
}

const has = (v: string | null | undefined) => v != null && String(v).trim() !== "";
const positive = (v: string | null | undefined) => has(v) && Number(v) > 0;

export function missingForApproval(docType: string, f: OcrFields, books?: BooksChoices | null): Missing[] {
  const out: Missing[] = [];
  const need = (ok: boolean, field: string, label: string) => {
    if (!ok) out.push({ field, label });
  };
  const sale = docType === "sales_invoice";
  const purchase = docType === "purchase_receipt";
  const form2307 = docType === "bir_2307_received" || docType === "bir_2307_issued";
  if (!sale && !purchase && !form2307) return out;

  const individual = f.party_kind === "individual";
  const named = individual ? has(f.party_last_name) && has(f.party_first_name) : has(f.party_name);

  need(has(f.date), "date", "Date");
  if (form2307) {
    need(named, individual ? "party_last_name" : "party_name", individual ? "Last and first name" : docType === "bir_2307_received" ? "Customer (payor)" : "Supplier (payee)");
    need(has(f.party_tin), "party_tin", "TIN");
    need(has(f.atc), "atc", "ATC");
    need(positive(f.withholding), "withholding", "Tax withheld");
    return out;
  }

  need(has(f.number), "number", "Document number");
  need(named, individual ? "party_last_name" : "party_name", individual ? "Last and first name" : sale ? "Customer" : "Supplier");
  need(positive(f.total), "total", "Total");
  const withheld = positive(f.withholding);
  const vatWithheld = sale && positive(f.vat_withheld);
  // The SLP lists every supplier with TIN and address; the QAP and SAWT every payee and payor.
  need(!(purchase || withheld || vatWithheld) || has(f.party_tin), "party_tin", "TIN");
  need(!purchase || has(f.party_address), "party_address", "Address");
  need(!withheld || has(f.atc), "atc", "ATC");

  if (books) {
    need(has(books.accountId), "ledger_account", "Account title");
    const inv = books.invoice;
    if (inv) {
      need(inv.lineCodes.length > 0 && inv.lineCodes.every((c) => has(c)), "tax_code", "Tax code on every amount");
      need(!withheld || has(inv.withholdingCode), "withholding_code", "Withholding code");
      need(!vatWithheld || has(inv.vatWithholdingCode), "vat_withholding_code", "VAT withheld code (WV010 / WV020)");
      need(inv.terms !== "cash" || has(inv.cashAccountId), "payment_account", "Paid from / deposited to");
    }
  }
  return out;
}

/** "Fill in the Address and TIN first." */
export function missingMessage(missing: Missing[]): string {
  const names = missing.map((m) => m.label);
  const list = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names[0];
  return `Fill in ${list} first: the Books and the BIR lists (SLS, SLP, QAP, SAWT) need ${missing.length > 1 ? "them" : "it"}.`;
}
