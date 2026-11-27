import { describe, expect, it } from "vitest";
import { isSplittable, MAX_BUNDLE_PAGES, parseMany, pdfPageCount, planRead, tooManyPagesMessage, type OcrManyOutput } from "./bundle";
import { bundleLabel, bundleSummary } from "@/lib/documents/labels";

const pdf = (body: string) => new TextEncoder().encode(`%PDF-1.7\n${body}\n%%EOF`);
const pages = (n: number) =>
  pdf(
    [`1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj`, `2 0 obj << /Type /Pages /Count ${n} /Kids [] >> endobj`]
      .concat(Array.from({ length: n }, (_, i) => `${i + 3} 0 obj << /Type /Page /Parent 2 0 R >> endobj`))
      .join("\n"),
  );

describe("isSplittable", () => {
  it("splits PDFs of invoices, receipts and 2307s only; never photos or other kinds", () => {
    expect(isSplittable("sales_invoice", "application/pdf")).toBe(true);
    expect(isSplittable("bir_2307_issued", "application/pdf")).toBe(true);
    expect(isSplittable("sales_invoice", "image/jpeg")).toBe(false);
    for (const t of ["payroll", "cor", "other", "filed_return", "payment_proof"]) expect(isSplittable(t, "application/pdf")).toBe(false);
  });
});

describe("parseMany", () => {
  it("validates the list and tidies each document's fields like a single read", () => {
    const out = parseMany({
      page_count: 3,
      documents: [
        { page: 1, position: " top ", fields: { number: "SI-1", total: "1,120.00", party_tin: "123456789000" }, confidence: { total: 0.9 } },
        { page: "2", position: null, fields: { number: "SI-2", total: 50 }, confidence: {} },
      ],
    });
    expect(out.pages).toBe(3);
    expect(out.documents).toHaveLength(2);
    expect(out.documents[0]).toMatchObject({ page: 1, position: "top", fields: { number: "SI-1", total: "1120.00", party_tin: "123-456-789-000" }, confidence: { total: 0.9 } });
    expect(out.documents[1]).toMatchObject({ page: 2, position: null, fields: { number: "SI-2", total: "50.00" } });
  });

  it("rejects a reply in the wrong shape instead of saving it", () => {
    expect(() => parseMany({ documents: "none" })).toThrow(/Unexpected shape/);
    expect(() => parseMany({ page_count: 1, documents: [{ page: 0, fields: {}, confidence: {} }] })).toThrow(/page must be 1 or more/);
    expect(() => parseMany({ page_count: 1, documents: [{ page: 1, fields: {}, confidence: { total: 2 } }] })).toThrow(/Unexpected shape/);
  });

  it("treats a missing or nonsense page count as unknown", () => {
    expect(parseMany({ documents: [] }).pages).toBeNull();
    expect(parseMany({ page_count: 0, documents: [] }).pages).toBeNull();
  });
});

describe("pdfPageCount", () => {
  it("counts page objects, not the page tree", () => {
    expect(pdfPageCount(pages(1))).toBe(1);
    expect(pdfPageCount(pages(12))).toBe(12);
  });

  it("counts a page saved twice (an incremental update) once", () => {
    const b = pdf(`3 0 obj << /Type /Page >> endobj\n4 0 obj << /Type /Page >> endobj\n3 0 obj << /Type /Page /Rotate 90 >> endobj`);
    expect(pdfPageCount(b)).toBe(2);
  });

  it("falls back to the page tree's /Count, or null when nothing is visible", () => {
    expect(pdfPageCount(pdf(`2 0 obj << /Type /Pages /Count 64 /Kids [] >> endobj`))).toBe(64);
    expect(pdfPageCount(pdf(`stream of compressed objects`))).toBeNull();
  });
});

describe("planRead", () => {
  const doc = (page: number, number: string) => ({ page, position: null, fields: { number }, confidence: {} });
  const many = (documents: ReturnType<typeof doc>[], pagesSeen: number | null = null): OcrManyOutput => ({ pages: pagesSeen, documents, model: "m" });

  it("keeps a file with one invoice as one document, exactly as before", () => {
    expect(planRead(many([doc(1, "A")], 1))).toEqual({ kind: "single", read: { fields: { number: "A" }, confidence: {}, model: "m" } });
    // Nothing found: still one document, with nothing read.
    expect(planRead(many([], 2))).toEqual({ kind: "single", read: { fields: {}, confidence: {}, model: "m" } });
  });

  it("splits several into one each, in page order (the model's order within a page)", () => {
    const plan = planRead(many([doc(3, "C"), doc(1, "A"), doc(3, "D"), doc(2, "B")], 4));
    expect(plan.kind).toBe("split");
    if (plan.kind !== "split") return;
    expect(plan.pages).toBe(4);
    expect(plan.parts.map((p) => [p.page, p.fields.number])).toEqual([[1, "A"], [2, "B"], [3, "C"], [3, "D"]]);
    expect(plan.parts.every((p) => p.model === "m")).toBe(true);
  });

  it("takes the largest page count of the file, the model and the pages read", () => {
    const plan = planRead(many([doc(1, "A"), doc(9, "B")], 3), { pdfPages: 5 });
    expect(plan).toMatchObject({ kind: "split", pages: 9 });
    const capped = planRead({ pages: 4, documents: [doc(1, "A"), doc(2, "B")] }, { pdfPages: 2 });
    expect(capped).toMatchObject({ kind: "split", pages: 4 });
  });

  it(`does not split a bundle over ${MAX_BUNDLE_PAGES} pages`, () => {
    expect(planRead(many([doc(1, "A"), doc(2, "B")], 63))).toEqual({ kind: "too_many_pages", pages: 63 });
    expect(planRead(many([doc(1, "A"), doc(2, "B")], 2), { pdfPages: 51 })).toEqual({ kind: "too_many_pages", pages: 51 });
    expect(planRead(many([doc(1, "A"), doc(2, "B")], 50)).kind).toBe("split");
    expect(tooManyPagesMessage(63)).toMatch(/63 pages.*ask the client to send smaller PDFs/);
  });
});

describe("bundle labels", () => {
  it("reads as the Inbox shows it", () => {
    expect(bundleLabel("sales_invoice", 3, 25, 4)).toBe("Invoice 3 of 25 · page 4");
    expect(bundleLabel("bir_2307_received", 2, null, 1)).toBe("Form 2 · page 1");
    expect(bundleSummary("purchase_receipt", 25, 10)).toBe("25 invoices found on 10 pages");
    expect(bundleSummary("bir_2307_received", 1, 1)).toBe("1 2307 found on 1 page");
    expect(bundleSummary("sales_invoice", 2, null)).toBe("2 invoices found");
  });
});
