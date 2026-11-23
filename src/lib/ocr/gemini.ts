/**
 * Gemini as the OCR provider (spec §3.5, Q9). Paid-tier API key only (the free
 * tier may use data for training). High media resolution for handwritten
 * receipts; the reply is constrained to a JSON schema and then validated.
 */
import { OCR_DOC_TYPES, OCR_FIELDS, normalizeFields, ocrOutputSchema, type OcrOutput } from "./fields";
import type { OcrInput, OcrProvider } from "./provider";

/** Default model; set GEMINI_MODEL to compare Flash and Pro (open item O4). */
export const DEFAULT_GEMINI_MODEL = "gemini-3.8-flash";

const PROMPT = `You read Philippine business documents for an accounting firm: sales invoices and official receipts, purchase and expense receipts, BIR Form 2307 (Certificate of Creditable Tax Withheld at Source) and BIR Form 2303 (Certificate of Registration). Many are handwritten or photographed on a phone.

Return every field you can read; use null for a field that is not on the document or that you cannot read. Never guess.
- doc_type: one of ${OCR_DOC_TYPES.join(", ")} ("bir_2307" for Form 2307).
- date: the document date as YYYY-MM-DD.
- number: the invoice / receipt / serial number as printed.
- party_name, party_tin, party_address: the OTHER party — the seller on a purchase receipt, the buyer/customer on a sales invoice, the payor (withholding agent) on a 2307.
- vatable, vat_exempt, zero_rated, vat, total: amounts in pesos as plain numbers, no currency sign or commas.
- atc and withholding: the ATC code and tax withheld, on a 2307 only.
For each field also give your confidence from 0 to 1 that you read it exactly right.`;

const nullableString = { type: "STRING", nullable: true };
const responseSchema = {
  type: "OBJECT",
  properties: {
    fields: { type: "OBJECT", properties: Object.fromEntries(OCR_FIELDS.map((f) => [f.key, nullableString])) },
    confidence: { type: "OBJECT", properties: Object.fromEntries(OCR_FIELDS.map((f) => [f.key, { type: "NUMBER" }])) },
  },
  required: ["fields", "confidence"],
};

function base64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

export function geminiProvider(opts: { apiKey: string; model?: string; fetch?: typeof fetch }): OcrProvider {
  const model = opts.model || DEFAULT_GEMINI_MODEL;
  const doFetch = opts.fetch ?? fetch;
  return {
    name: "gemini",
    model,
    async extract(input: OcrInput): Promise<OcrOutput> {
      const res = await doFetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": opts.apiKey },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: `${PROMPT}\n\nThe uploader says this is: ${input.docTypeHint}.` },
                { inline_data: { mime_type: input.mimeType, data: base64(input.bytes) } },
              ],
            },
          ],
          generationConfig: {
            temperature: 0,
            responseMimeType: "application/json",
            responseSchema,
            mediaResolution: "MEDIA_RESOLUTION_HIGH",
          },
        }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`Gemini ${res.status}: ${body.slice(0, 300)}`);
      }
      const json = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
      const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
      let parsed: unknown;
      try {
        parsed = JSON.parse(text);
      } catch {
        throw new Error("Gemini did not return JSON");
      }
      const out = ocrOutputSchema.safeParse(parsed);
      if (!out.success) throw new Error(`Gemini returned an unexpected shape: ${out.error.issues[0]?.message}`);
      return { fields: normalizeFields(out.data.fields), confidence: out.data.confidence };
    },
  };
}

/** The configured provider, or null when no key is set (uploads still work). */
export function ocrProviderFromEnv(): OcrProvider | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return geminiProvider({ apiKey, model: process.env.GEMINI_MODEL });
}
