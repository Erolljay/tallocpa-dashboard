import { describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { OcrManyOutput } from "./bundle";
import type { OcrProvider } from "./provider";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/payroll/read/run", () => ({ runPayrollRead: vi.fn(), runPendingPayrollReads: vi.fn() }));
vi.mock("@/lib/parties/lookup", () => ({ lookupParties: vi.fn(async () => new Map()) }));

const { runOcr, REREAD_APPROVED } = await import("./run");

type Row = Record<string, unknown>;

/**
 * A tiny in-memory stand-in for the service-role client: documents and extractions,
 * the stored file, and the split_document function (recorded, not run; the database
 * tests cover what it does).
 */
function fakeAdmin(doc: Row, opts: { file?: Uint8Array; children?: Row[] } = {}) {
  const tables: Record<string, Row[]> = { documents: [doc, ...(opts.children ?? [])], extractions: [] };
  const rpc = vi.fn<(name: string, args: Record<string, unknown>) => Promise<{ data: null; error: { message: string } | null }>>(async () => ({ data: null, error: null }));
  function from(table: string) {
    const filters: [string, unknown][] = [];
    let op: { kind: "select" | "update" | "upsert"; values?: Row; head?: boolean } = { kind: "select" };
    const rows = () => tables[table].filter((r) => filters.every(([k, v]) => r[k] === v));
    const run = () => {
      if (op.kind === "upsert") {
        const at = tables[table].findIndex((r) => r.document_id === op.values!.document_id);
        if (at >= 0) tables[table][at] = { ...tables[table][at], ...op.values };
        else tables[table].push({ ...op.values });
        return { data: null, error: null };
      }
      if (op.kind === "update") {
        for (const r of rows()) Object.assign(r, op.values);
        return { data: null, error: null };
      }
      return op.head ? { count: rows().length, data: null, error: null } : { data: rows(), error: null };
    };
    const q = {
      select: (_cols: string, o?: { head?: boolean }) => ((op = { kind: "select", head: o?.head }), q),
      update: (values: Row) => ((op = { kind: "update", values }), q),
      upsert: (values: Row) => ((op = { kind: "upsert", values }), q),
      eq: (k: string, v: unknown) => (filters.push([k, v]), q),
      single: async () => ({ data: rows()[0] ?? null, error: rows()[0] ? null : { message: "none" } }),
      maybeSingle: async () => ({ data: rows()[0] ?? null, error: null }),
      then: (ok: (v: unknown) => unknown, bad?: (e: unknown) => unknown) => Promise.resolve(run()).then(ok, bad),
    };
    return q;
  }
  const storage = { from: () => ({ download: async () => ({ data: new Blob([(opts.file ?? new Uint8Array([37, 80, 68, 70])) as BlobPart]), error: null }) }) };
  return { admin: { from, rpc, storage } as unknown as SupabaseClient, tables, rpc };
}

const pdfDoc = (over: Row = {}): Row => ({ id: "d1", storage_path: "c/d1/a.pdf", mime_type: "application/pdf", doc_type: "sales_invoice", status: "received", bundle_id: null, ...over });
const part = (page: number, number: string) => ({ page, position: null, fields: { number, total: "100.00" }, confidence: { total: 0.9 } });

function provider(many: OcrManyOutput | Error, single = { fields: { number: "ONE" }, confidence: {} }): OcrProvider & { extract: ReturnType<typeof vi.fn>; extractMany: ReturnType<typeof vi.fn> } {
  return {
    name: "fake",
    model: "fake-1",
    extract: vi.fn(async () => single),
    extractMany: vi.fn(async () => {
      if (many instanceof Error) throw many;
      return many;
    }),
  };
}

describe("runOcr with a PDF that bundles several invoices", () => {
  it("splits several invoices into one line each, in page order", async () => {
    const { admin, rpc } = fakeAdmin(pdfDoc());
    const p = provider({ pages: 3, documents: [part(2, "SI-2"), part(1, "SI-1"), part(3, "SI-3")], model: "fake-1" });
    expect(await runOcr(admin, "d1", p)).toEqual({ ok: true, invoices: 3 });
    expect(p.extract).not.toHaveBeenCalled();
    const [name, args] = rpc.mock.calls[0];
    expect(name).toBe("split_document");
    expect(args).toMatchObject({ p_document: "d1", p_pages: 3, p_provider: "fake", p_model: "fake-1" });
    expect((args.p_parts as { page: number; fields: { number: string } }[]).map((x) => [x.page, x.fields.number])).toEqual([[1, "SI-1"], [2, "SI-2"], [3, "SI-3"]]);
  });

  it("keeps a PDF with one invoice as one document, exactly as before", async () => {
    const { admin, rpc, tables } = fakeAdmin(pdfDoc());
    expect(await runOcr(admin, "d1", provider({ pages: 1, documents: [part(1, "SI-1")], model: "fake-1" }))).toEqual({ ok: true });
    expect(rpc).not.toHaveBeenCalled();
    expect(tables.extractions[0]).toMatchObject({ document_id: "d1", status: "done", fields: { number: "SI-1", total: "100.00" } });
    expect(tables.documents[0].status).toBe("under_review");
  });

  it("never splits a photo, or a kind of document that is not an invoice, receipt or 2307", async () => {
    for (const doc of [pdfDoc({ mime_type: "image/jpeg" }), pdfDoc({ doc_type: "other" })]) {
      const { admin, rpc, tables } = fakeAdmin(doc);
      const p = provider({ pages: 2, documents: [part(1, "A"), part(2, "B")] });
      expect(await runOcr(admin, "d1", p)).toEqual({ ok: true });
      expect(p.extractMany).not.toHaveBeenCalled();
      expect(rpc).not.toHaveBeenCalled();
      expect(tables.extractions[0]).toMatchObject({ status: "done", fields: { number: "ONE" } });
    }
  });

  it(`refuses a bundle over 50 pages before sending it, with a notice for staff that is not retried`, async () => {
    const big = new TextEncoder().encode(Array.from({ length: 60 }, (_, i) => `${i + 1} 0 obj << /Type /Page >> endobj`).join("\n"));
    const { admin, rpc, tables } = fakeAdmin(pdfDoc(), { file: big });
    const p = provider({ pages: 60, documents: [part(1, "A"), part(2, "B")] });
    const r = await runOcr(admin, "d1", p);
    expect(r).toMatchObject({ error: expect.stringMatching(/60 pages.*smaller PDFs/) });
    expect(p.extractMany).not.toHaveBeenCalled();
    expect(rpc).not.toHaveBeenCalled();
    expect(tables.extractions[0]).toMatchObject({ status: "failed", attempts: 3 });
    expect(tables.documents[0].status).toBe("received");
  });

  it("refuses when the model counts more than 50 pages", async () => {
    const { admin, tables } = fakeAdmin(pdfDoc());
    const r = await runOcr(admin, "d1", provider({ pages: 72, documents: [part(1, "A"), part(2, "B")] }));
    expect(r).toMatchObject({ error: expect.stringMatching(/72 pages/) });
    expect(tables.extractions[0]).toMatchObject({ status: "failed" });
  });

  it("reads a bundle again through split_document (replacing its unapproved lines), even when one invoice is found", async () => {
    const { admin, rpc } = fakeAdmin(pdfDoc({ status: "split" }), { children: [{ id: "c1", bundle_id: "d1", status: "under_review" }] });
    expect(await runOcr(admin, "d1", provider({ pages: 1, documents: [part(1, "SI-1")] }))).toEqual({ ok: true, invoices: 1 });
    expect(rpc.mock.calls[0][0]).toBe("split_document");
    expect(rpc.mock.calls[0][1]).toMatchObject({ p_pages: null, p_parts: [{ page: 1, fields: { number: "SI-1" } }] });
  });

  it("refuses to read a bundle again once any of its invoices is approved", async () => {
    const { admin, rpc } = fakeAdmin(pdfDoc({ status: "split" }), { children: [{ id: "c1", bundle_id: "d1", status: "posted" }] });
    const p = provider({ pages: 2, documents: [part(1, "A"), part(2, "B")] });
    expect(await runOcr(admin, "d1", p)).toEqual({ error: REREAD_APPROVED });
    expect(p.extractMany).not.toHaveBeenCalled();
    expect(rpc).not.toHaveBeenCalled();
  });

  it("does not read an invoice of a bundle on its own", async () => {
    const { admin } = fakeAdmin(pdfDoc({ storage_path: null, bundle_id: "b1", status: "under_review" }));
    const p = provider({ pages: 1, documents: [] });
    expect(await runOcr(admin, "d1", p)).toMatchObject({ skipped: expect.stringMatching(/bundled PDF/) });
    expect(p.extract).not.toHaveBeenCalled();
  });

  it("records a failed split (e.g. the database refused it) as an OCR failure", async () => {
    const { admin, rpc, tables } = fakeAdmin(pdfDoc());
    rpc.mockResolvedValueOnce({ data: null, error: { message: "boom" } });
    expect(await runOcr(admin, "d1", provider({ pages: 2, documents: [part(1, "A"), part(2, "B")] }))).toEqual({ error: "boom" });
    expect(tables.extractions[0]).toMatchObject({ status: "failed", error: "boom" });
  });
});
