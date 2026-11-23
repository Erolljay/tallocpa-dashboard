/**
 * The OCR step is swappable (spec §3.5, `ocr-provider` interface): anything that
 * turns a document file into fields + confidence can stand in for Gemini.
 */
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
}
