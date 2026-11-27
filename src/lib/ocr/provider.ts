/**
 * The OCR step is swappable (spec §3.5, `ocr-provider` interface): anything that
 * turns a document file into fields + confidence can stand in for Gemini.
 */
import type { OcrManyOutput } from "./bundle";
import type { OcrOutput } from "./fields";

export interface OcrInput {
  bytes: Uint8Array;
  mimeType: string;
  /** What the uploader said it is, as a hint. */
  docTypeHint: string;
}

export interface OcrProvider {
  name: string;
  model: string;
  extract(input: OcrInput): Promise<OcrOutput>;
  /**
   * Reads every separate document in a file (a PDF bundling several invoices), each
   * with its page. Optional: without it, a file is always read as one document.
   */
  extractMany?(input: OcrInput): Promise<OcrManyOutput>;
}
