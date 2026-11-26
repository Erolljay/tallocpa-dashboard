import { describe, expect, it } from "vitest";
import type { RegisterSourceRow } from "@/lib/returns/source";
import { compareParallelRun, differs, unmatchedIds, vatMonths, type BookInvoiceRow, type ParallelBooksRow, type ParallelRunInput } from "./compare";

const FEB = "2026-02-01";
const MAR = "2026-03-01";
const CUSTOMER = "123-456-789-00000";
const SUPPLIER = "222-333-444-00000";

function line(p: Partial<RegisterSourceRow> & Pick<RegisterSourceRow, "document_id" | "kind">): RegisterSourceRow {
  return {
    month: FEB, line_date: "2026-02-10", reference: null, party_name: null, party_tin: null, party_address: null,
    vatable: 0, vat_exempt: 0, zero_rated: 0, vat: 0, total: 0, atc: null, withholding: 0, slp_category: null, ...p,
  };
}

function book(p: Partial<ParallelBooksRow> & Pick<ParallelBooksRow, "invoice_id" | "source">): ParallelBooksRow {
  return {
    month: FEB, issue_date: "2026-02-10", reference: null, party_id: null, party_name: null, party_tin: null, slp_category: null,
    vatable: 0, vat_exempt: 0, zero_rated: 0, non_vat: 0, vat: 0, total: 0, atc: null, tax_code: null, withholding: 0, uncoded: 0,
    cwt_supported: null, cwt_followed_up_at: null, document_id: null, cwt_document_id: null, ...p,
  };
}

function invoice(p: Partial<BookInvoiceRow> & Pick<BookInvoiceRow, "id" | "kind">): BookInvoiceRow {
  return { issue_date: "2026-02-10", reference: null, party_name: null, total: 0, document_id: null, cwt_document_id: null, cwt_claim: null, ...p };
}

/** A February where the register and the Books carry the same sale, purchase, 2307 received and EWT. */
function agreeing(): ParallelRunInput {
  return {
    months: [FEB],
    vatRegistered: () => true,
    register: [
      line({ document_id: "d-sale", kind: "sale", reference: "SI-1", party_name: "Bacolod Feeds", party_tin: CUSTOMER, vatable: "1000.00", vat: "120.00", total: "1120.00", atc: "WC158", withholding: "10.00" }),
      line({ document_id: "d-buy", kind: "purchase", reference: "OR-9", party_name: "Jaro Steel", party_tin: SUPPLIER, vatable: "500.00", vat: "60.00", total: "560.00", slp_category: "services" }),
      line({ document_id: "d-2307", kind: "cwt_received", party_name: "Bacolod Feeds", party_tin: CUSTOMER, total: "1000.00", atc: "WC158", withholding: "10.00" }),
      line({ document_id: "d-2307e", kind: "ewt_issued", party_name: "Jaro Steel", party_tin: SUPPLIER, total: "500.00", atc: "WC158", withholding: "5.00" }),
    ],
    books: [
      book({ invoice_id: "i-sale", source: "sales_invoice", reference: "SI-1", party_name: "Bacolod Feeds", party_tin: CUSTOMER, vatable: "1000.00", vat: "120.00", total: "1120.00", document_id: "d-sale", cwt_document_id: "d-2307" }),
      book({ invoice_id: "i-sale", source: "bir_2307_received", party_name: "Bacolod Feeds", party_tin: CUSTOMER, total: "1000.00", atc: "WC158", tax_code: "WC158", withholding: "10.00", cwt_supported: true, document_id: "d-sale", cwt_document_id: "d-2307" }),
      book({ invoice_id: "i-buy", source: "purchase_receipt", reference: "OR-9", party_name: "Jaro Steel", party_tin: SUPPLIER, slp_category: "services", vatable: "500.00", vat: "60.00", total: "560.00", document_id: "d-buy" }),
      book({ invoice_id: "i-buy", source: "bir_2307_issued", party_name: "Jaro Steel", party_tin: SUPPLIER, total: "500.00", atc: "WC158", tax_code: "WC158", withholding: "5.00", document_id: "d-buy" }),
    ],
    invoices: [
      invoice({ id: "i-sale", kind: "sales", reference: "SI-1", total: "1110.00", document_id: "d-sale", cwt_document_id: "d-2307" }),
      invoice({ id: "i-buy", kind: "purchase", reference: "OR-9", total: "560.00", document_id: "d-buy" }),
    ],
  };
}

describe("parallel run: register beside the Books", () => {
  it("agrees when every figure, party and ATC is the same to the centavo", () => {
    const [feb] = compareParallelRun(agreeing());
    expect(feb.status).toBe("agree");
    expect(feb.sales.find((f) => f.key === "vatable")).toMatchObject({ old: 100000, new: 100000, compared: true });
    expect(feb.sales.find((f) => f.key === "output_vat")).toMatchObject({ old: 12000, new: 12000 });
    expect(feb.purchases.find((f) => f.key === "services")).toMatchObject({ old: 50000, new: 50000 });
    expect(feb.purchases.find((f) => f.key === "input_vat")).toMatchObject({ old: 6000, new: 6000 });
    expect(feb.sls).toEqual([expect.objectContaining({ key: "123456789", agrees: true, old: { vatable: 100000, exempt: 0, zeroRated: 0, vat: 12000 } })]);
    expect(feb.slp).toEqual([expect.objectContaining({ key: "222333444", agrees: true })]);
    expect(feb.sawt).toEqual([expect.objectContaining({ atc: "WC158", kind: "cwt", old: { base: 100000, withheld: 1000, count: 1 }, new: { base: 100000, withheld: 1000, count: 1 }, agrees: true })]);
    expect(feb.qap).toEqual([expect.objectContaining({ atc: "WC158", kind: "ewt", agrees: true })]);
    expect(feb.documents).toEqual([]);
    expect(feb.counts).toEqual({ old: 4, new: 2 });
  });

  it("flags a difference of one centavo, with the document behind it", () => {
    const input = agreeing();
    input.books[0] = { ...input.books[0], vat: "120.01" };
    const [feb] = compareParallelRun(input);
    expect(feb.status).toBe("differ");
    const vat = feb.sales.find((f) => f.key === "output_vat")!;
    expect([vat.old, vat.new, differs(vat)]).toEqual([12000, 12001, true]);
    expect(feb.sls[0].agrees).toBe(false);
    expect(feb.documents).toEqual([expect.objectContaining({ reason: "figures", kind: "sale", documentId: "d-sale", invoiceId: "i-sale", old: 112000, new: 112001, note: "The VAT differs." })]);
  });

  it("lists documents only in the register, invoices only in the Books and those counted in another month", () => {
    const input = agreeing();
    input.register.push(line({ document_id: "d-lost", kind: "sale", reference: "SI-9", vatable: "200.00", vat: "24.00", total: "224.00", party_tin: CUSTOMER }));
    input.books.push(book({ invoice_id: "i-typed", source: "sales_invoice", reference: "SI-10", vatable: "300.00", vat: "36.00", party_tin: CUSTOMER }));
    input.invoices.push(invoice({ id: "i-typed", kind: "sales", reference: "SI-10", total: "336.00" }));
    // The register counts this purchase in February (its document's month); the Books in March (its date).
    input.register.push(line({ document_id: "d-late", kind: "purchase", vatable: "100.00", vat: "12.00", total: "112.00", party_tin: SUPPLIER }));
    input.elsewhere = { invoices: [invoice({ id: "i-late", kind: "purchase", issue_date: "2026-03-02", total: "112.00", document_id: "d-late" })] };
    const [feb] = compareParallelRun(input);
    expect(feb.status).toBe("differ");
    expect(feb.documents.map((d) => [d.reason, d.documentId, d.invoiceId, d.old, d.new, d.otherMonth])).toEqual([
      ["old_only", "d-lost", null, 22400, null, undefined],
      ["other_month", "d-late", "i-late", 11200, null, "2026-03-01"],
      ["new_only", null, "i-typed", null, 33600, undefined],
    ]);
  });

  it("finds an invoice's register line in another month", () => {
    const input = agreeing();
    input.months = [MAR];
    input.register = [];
    input.books = [book({ invoice_id: "i-late", source: "purchase_receipt", month: MAR, issue_date: "2026-03-02", slp_category: "other_goods", vatable: "100.00", vat: "12.00", document_id: "d-late" })];
    input.invoices = [invoice({ id: "i-late", kind: "purchase", issue_date: "2026-03-02", document_id: "d-late" })];
    input.elsewhere = { registerMonth: new Map([["d-late", FEB]]) };
    const [mar] = compareParallelRun(input);
    expect(mar.status).toBe("no_old");
    expect(mar.documents).toEqual([expect.objectContaining({ reason: "other_month", invoiceId: "i-late", otherMonth: FEB, new: 11200 })]);
  });

  it("names the months with nothing on the old side, and nothing on either", () => {
    const input = agreeing();
    input.months = [FEB, MAR];
    input.register = [];
    const [feb, mar] = compareParallelRun(input);
    expect(feb.status).toBe("no_old");
    expect(mar.status).toBe("empty");
  });

  it("puts a register purchase without a category in other goods, and keeps the Books' columns by tax code", () => {
    const input = agreeing();
    input.register[1] = { ...input.register[1], slp_category: null };
    input.books[2] = { ...input.books[2], slp_category: "other_goods" };
    expect(compareParallelRun(input)[0].status).toBe("agree");
    input.books[2] = { ...input.books[2], slp_category: "capital_goods" };
    const [feb] = compareParallelRun(input);
    expect(feb.purchases.filter(differs).map((f) => [f.key, f.old, f.new])).toEqual([
      ["capital_goods", 0, 50000],
      ["other_goods", 50000, 0],
    ]);
    expect(feb.slp[0]).toMatchObject({ agrees: false, old: { capital: 0, goods: 50000 }, new: { capital: 50000, goods: 0 } });
  });

  it("shows a bare total read the way the old worksheet took it: a purchase without VAT is exempt, the Books may code it non-VAT", () => {
    const input = agreeing();
    input.register[1] = line({ document_id: "d-buy", kind: "purchase", party_tin: SUPPLIER, total: "300.00" });
    input.books[2] = book({ invoice_id: "i-buy", source: "purchase_receipt", party_tin: SUPPLIER, non_vat: "300.00", total: "300.00", document_id: "d-buy" });
    const [feb] = compareParallelRun(input);
    expect(feb.purchases.filter(differs).map((f) => [f.key, f.old, f.new])).toEqual([
      ["exempt", 30000, 0],
      ["non_vat", 0, 30000],
    ]);
  });

  it("for a non-VAT client compares gross sales (2551Q) and shows the VAT columns without counting them", () => {
    const input = agreeing();
    input.vatRegistered = () => false;
    input.register = [line({ document_id: "d-sale", kind: "sale", party_tin: CUSTOMER, total: "1000.00" })];
    input.books = [book({ invoice_id: "i-sale", source: "sales_invoice", party_tin: CUSTOMER, non_vat: "1000.00", total: "1000.00", document_id: "d-sale" })];
    input.invoices = [invoice({ id: "i-sale", kind: "sales", total: "1000.00", document_id: "d-sale" })];
    const [feb] = compareParallelRun(input);
    expect(feb.status).toBe("agree");
    expect(feb.sales.find((f) => f.key === "gross_sales")).toMatchObject({ old: 100000, new: 100000, compared: true });
    expect(feb.sales.find((f) => f.key === "non_vat")).toMatchObject({ old: 0, new: 100000, compared: false });
    expect(feb.sls).toEqual([]);
    expect(feb.slp).toEqual([]);
  });

  it("counts lines without a tax code as a difference", () => {
    const input = agreeing();
    input.books.push(book({ invoice_id: "i-buy", source: "purchase_receipt", party_tin: SUPPLIER, total: "40.00", uncoded: "40.00", document_id: "d-buy" }));
    const [feb] = compareParallelRun(input);
    expect(feb.purchases.find((f) => f.key === "uncoded_purchases")).toMatchObject({ old: 0, new: 4000 });
    expect(feb.status).toBe("differ");
  });

  it("matches the 2307 received with the invoice it supports, and flags a claim made in the invoice's month", () => {
    const input = agreeing();
    input.register[2] = { ...input.register[2], month: MAR };
    input.months = [FEB, MAR];
    const [feb, mar] = compareParallelRun(input);
    expect(feb.sawt[0]).toMatchObject({ old: { withheld: 0 }, new: { withheld: 1000 }, agrees: false });
    expect(mar.sawt[0]).toMatchObject({ old: { withheld: 1000 }, new: { withheld: 0 }, agrees: false });
    expect(mar.documents).toEqual([expect.objectContaining({ reason: "other_month", kind: "cwt", documentId: "d-2307", otherMonth: FEB })]);
  });

  it("puts VAT withheld under its WV code and leaves out CWT the client stopped claiming", () => {
    const input = agreeing();
    input.books.push(book({ invoice_id: "i-gov", source: "bir_2307_received", total: "2000.00", atc: "WV020", tax_code: "WV020", withholding: "100.00", cwt_supported: false }));
    input.books.push(book({ invoice_id: "i-stop", source: "bir_2307_received", total: "500.00", atc: "WC160", tax_code: "WC160", withholding: "10.00", cwt_supported: false }));
    input.invoices.push(invoice({ id: "i-stop", kind: "sales", cwt_claim: "stop" }));
    const [feb] = compareParallelRun(input);
    expect(feb.sawt.map((a) => [a.atc, a.kind, a.old.withheld, a.new.withheld])).toEqual([
      ["WC158", "cwt", 1000, 1000],
      ["WV020", "vat", 0, 10000],
    ]);
  });

  it("keeps a 2307 without an ATC in its own row", () => {
    const input = agreeing();
    input.register.push(line({ document_id: "d-noatc", kind: "cwt_received", total: "100.00", withholding: "1.00" }));
    const [feb] = compareParallelRun(input);
    expect(feb.sawt.find((a) => a.atc === "(no ATC)")).toMatchObject({ old: { withheld: 100 }, new: { withheld: 0 }, agrees: false });
  });

  it("names the documents to look up outside the months", () => {
    const input = agreeing();
    input.register.push(line({ document_id: "d-late", kind: "purchase" }), line({ document_id: "d-2307b", kind: "cwt_received" }));
    input.invoices.push(invoice({ id: "i-x", kind: "sales", document_id: "d-x" }));
    expect(unmatchedIds(input)).toEqual({ registerDocs: ["d-late"], cwtDocs: ["d-2307b"], invoiceDocs: ["d-x"] });
  });
});

describe("VAT-registered months", () => {
  it("follows the 2550Q obligation open at any time in the month", () => {
    const vat = vatMonths([{ start_date: "2026-02-15", end_date: "2026-04-01" }]);
    expect(["2026-01-01", "2026-02-01", "2026-04-01", "2026-05-01"].map(vat)).toEqual([false, true, true, false]);
    expect(vatMonths([])("2026-02-01")).toBe(false);
  });
});
