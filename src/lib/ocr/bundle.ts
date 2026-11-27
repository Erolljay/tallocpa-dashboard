/**
 * Bundled PDFs (Owner's request, 27 November 2026): one PDF that holds several
 * invoices, receipts or 2307s is read as a list, one entry per document with its
 * page, and split into one Inbox line each (migration 20261231000003). Photos are
 * never split, and a PDF with one invoice stays one document.
 */
import { z } from "zod";
import { normalizeFields, ocrOutputSchema, type OcrConfidence, type OcrFields, type OcrOutput } from "./fields";

/** Document types whose PDFs are read as a list (private.is_splittable). */
export const SPLIT_DOC_TYPES = ["sales_invoice", "purchase_receipt", "bir_2307_received", "bir_2307_issued"] as const;

/** A bundle longer than this is not split: staff ask the client for smaller PDFs. */
export const MAX_BUNDLE_PAGES = 50;

export const isSplittable = (docType: string, mimeType: string) => mimeType === "application/pdf" && (SPLIT_DOC_TYPES as readonly string[]).includes(docType);

/** One document found in the file: the usual fields and confidence, and where it is. */
export type OcrPart = OcrOutput & { page: number; position: string | null };
/** What a provider returns for a whole file; `pages` is the page count it saw. */
export type OcrManyOutput = { pages: number | null; documents: OcrPart[]; model?: string };

const page = z.union([z.number(), z.string()]).transform((v, ctx) => {
  const n = Math.trunc(Number(v));
  if (!Number.isFinite(n) || n < 1) {
    ctx.addIssue({ code: "custom", message: "page must be 1 or more" });
    return z.NEVER;
  }
  return n;
});

/** What a provider must return for a multi-document read; anything else is rejected rather than saved. */
export const ocrManySchema = z.object({
  page_count: z.union([z.number(), z.string()]).nullable().optional().transform((v) => {
    const n = Math.trunc(Number(v));
    return v == null || !Number.isFinite(n) || n < 1 ? null : n;
  }),
  documents: z.array(
    ocrOutputSchema.extend({
      page,
      position: z.string().nullable().optional().transform((v) => v?.trim() || null),
    }),
  ),
});

/** Validates and tidies a provider's reply: each document's fields go through normalizeFields, as a single read's do. */
export function parseMany(json: unknown): OcrManyOutput {
  const out = ocrManySchema.safeParse(json);
  if (!out.success) throw new Error(`Unexpected shape for a multi-document read: ${out.error.issues[0]?.message}`);
  return {
    pages: out.data.page_count,
    documents: out.data.documents.map((d) => ({
      fields: normalizeFields(d.fields as OcrFields),
      confidence: d.confidence as OcrConfidence,
      page: d.page,
      position: d.position,
    })),
  };
}

/**
 * A cheap page count from the PDF bytes (no parser): the page objects, or failing
 * that the largest /Count of a page tree. Null when neither is visible, e.g. when
 * the page tree is inside compressed object streams.
 */
export function pdfPageCount(bytes: Uint8Array): number | null {
  const text = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString("latin1");
  // Each page object once, by object number: an incrementally saved PDF repeats objects it changed.
  const heads: { at: number; num: string }[] = [];
  for (const m of text.matchAll(/(\d+)\s+\d+\s+obj\b/g)) heads.push({ at: m.index, num: m[1] });
  const pages = new Set<string>();
  for (const m of text.matchAll(/\/Type\s*\/Page(?![a-zA-Z])/g)) {
    let lo = 0;
    let hi = heads.length - 1;
    let found = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (heads[mid].at < m.index) {
        found = mid;
        lo = mid + 1;
      } else hi = mid - 1;
    }
    pages.add(found >= 0 ? heads[found].num : `@${m.index}`);
  }
  if (pages.size > 0) return pages.size;
  let best = 0;
  for (const m of text.matchAll(/\/Type\s*\/Pages\b[^>]*?\/Count\s+(\d+)|\/Count\s+(\d+)[^>]*?\/Type\s*\/Pages\b/g)) best = Math.max(best, Number(m[1] ?? m[2]));
  return best > 0 ? best : null;
}

export type ReadPlan =
  /** Over MAX_BUNDLE_PAGES: not split; OCR fails with a notice for staff. */
  | { kind: "too_many_pages"; pages: number }
  /** One document (or nothing found): saved as today. */
  | { kind: "single"; read: OcrOutput }
  /** Several: one child document each, in page order. */
  | { kind: "split"; pages: number | null; parts: OcrPart[] };

export function tooManyPagesMessage(pages: number) {
  return `This PDF has ${pages} pages. Bundles over ${MAX_BUNDLE_PAGES} pages are not split into invoices: ask the client to send smaller PDFs (${MAX_BUNDLE_PAGES} pages or fewer each), or type the figures.`;
}

/**
 * What to save from a multi-document read. The page count is the largest of what the
 * file shows, what the model saw and the pages it put documents on; documents are put in
 * page order (the model's order within a page).
 */
export function planRead(out: OcrManyOutput, { pdfPages = null, maxPages = MAX_BUNDLE_PAGES }: { pdfPages?: number | null; maxPages?: number } = {}): ReadPlan {
  const seen = Math.max(pdfPages ?? 0, out.pages ?? 0, ...out.documents.map((d) => d.page)) || null;
  if (seen != null && seen > maxPages) return { kind: "too_many_pages", pages: seen };
  if (out.documents.length <= 1) {
    const one = out.documents[0];
    return { kind: "single", read: { fields: one?.fields ?? {}, confidence: one?.confidence ?? {}, model: out.model } };
  }
  const parts = out.documents
    .map((d, i) => ({ d, i }))
    .sort((a, b) => a.d.page - b.d.page || a.i - b.i)
    .map(({ d }) => ({ ...d, model: out.model }));
  return { kind: "split", pages: seen, parts };
}
