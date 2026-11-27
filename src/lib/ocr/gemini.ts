/**
 * Gemini as the OCR provider (spec §3.5, Q9). Paid-tier API key only (the free
 * tier may use data for training). High media resolution for handwritten
 * receipts; the reply is constrained to a JSON schema and then validated.
 */
import { parseMany, type OcrManyOutput } from "./bundle";
import { OCR_DOC_TYPES, OCR_READ_FIELDS, normalizeFields, ocrOutputSchema, type OcrOutput } from "./fields";
import type { OcrInput, OcrProvider } from "./provider";

/** Default model; set GEMINI_MODEL to compare Flash and Pro (open item O4). */
export const DEFAULT_GEMINI_MODEL = "gemini-3.8-flash";

const PROMPT = `You read Philippine business documents for an accounting firm: sales invoices and official receipts, purchase and expense receipts, BIR Form 2307 (Certificate of Creditable Tax Withheld at Source) and BIR Form 2303 (Certificate of Registration). Many are handwritten or photographed on a phone.

Return every field you can read; use null for a field that is not on the document or that you cannot read. Never guess.
- doc_type: one of ${OCR_DOC_TYPES.join(", ")} ("bir_2307" for Form 2307).
- date: the document date copied EXACTLY as printed or written (for example "11/27/2026", "11-27-26" or "Nov. 27, 2026"); do not reorder, convert or complete it, and never take the year from today's date. Philippine invoices print dates month first (MM/DD/YYYY). Read each digit of the year carefully.
- number: the invoice / receipt / serial number as printed.
- party_name, party_tin, party_address: the OTHER party — the seller on a purchase receipt, the buyer/customer on a sales invoice, the payor (withholding agent) on a 2307.
- party_kind: "individual" when the other party is a natural person (a sole proprietor, a professional, a person buying or selling in their own name), "non_individual" for a corporation, partnership, cooperative or other entity. A sole proprietor's business is still "individual": its BIR registered name is the owner's name (often printed as "JUAN S. DELA CRUZ - Prop." under the trade name).
- party_last_name, party_first_name, party_middle_name: for an individual only, the person's name split as the BIR lists want it. Keep a compound surname together ("Dela Cruz", "De los Santos"); put Jr./Sr./III with the first name; give the middle name or initial as printed, null if none. For a sole proprietor this is the owner's name, while party_name keeps what is printed as the business name. Null for a non-individual.
- vatable, vat_exempt, zero_rated, vat, total: amounts in pesos as plain numbers, no currency sign or commas.
- atc and withholding: the ATC code and tax withheld, on a 2307 only.
- discount: on a sales invoice, the senior citizen or PWD discount deducted (the "Less: SC/PWD discount" line), as a plain number; null if none.
- vat_withheld: on a sales invoice or OR, VAT withheld by a government customer (often "Less: withholding VAT" or 5% final VAT); null if none.
- other_deduction: any other amount deducted from what was received or paid, such as bank or card charges; null if none.
- payment_terms: on an invoice or receipt, "cash" if it is a cash sale / paid in cash (the "Cash" box is ticked or it is an official receipt for payment), "charge" if it is a charge / credit sale on account (the "Charge" box is ticked, or it shows terms such as "30 days"); null if the document does not say.
For each field also give your confidence from 0 to 1 that you read it exactly right.`;

const nullableString = { type: "STRING", nullable: true };
const responseSchema = {
  type: "OBJECT",
  properties: {
    fields: { type: "OBJECT", properties: Object.fromEntries(OCR_READ_FIELDS.map((f) => [f.key, nullableString])) },
    confidence: { type: "OBJECT", properties: Object.fromEntries(OCR_READ_FIELDS.map((f) => [f.key, { type: "NUMBER" }])) },
  },
  required: ["fields", "confidence"],
};

/**
 * A file that may bundle several documents (a PDF of many invoices): the same field
 * instructions as PROMPT, for each document found, with where it is.
 */
const MANY_PROMPT = `${PROMPT}

This file may hold more than one separate document: several pages, and a page may hold one or more invoices, receipts or 2307s. Return one entry in "documents" for EACH separate document, in the order they appear, with the fields and confidence above for that document alone:
- page: the page (1 = first page of the file) the document starts on.
- position: where it is on that page when a page holds more than one ("top", "bottom", "left", "right", "1 of 3"…); null when it fills the page.
A document that runs over several pages is one entry, on its first page. Do not return the same document twice (a duplicate copy, a carbon copy or a continuation page is not a new document). Pages with no document (a cover page, a blank page) have no entry.
- page_count: the number of pages in the file.`;

const manyResponseSchema = {
  type: "OBJECT",
  properties: {
    page_count: { type: "INTEGER" },
    documents: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          page: { type: "INTEGER" },
          position: nullableString,
          fields: responseSchema.properties.fields,
          confidence: responseSchema.properties.confidence,
        },
        required: ["page", "fields", "confidence"],
      },
    },
  },
  required: ["page_count", "documents"],
};

function base64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

/** Gemini errors worth trying again: overloaded, rate-limited, or a passing server fault. */
const RETRYABLE = new Set([429, 500, 503, 504]);
/** Waits between tries of one model (ms). */
const BACKOFF = [2000, 6000];
/** Second model to try when the main one stays busy; set GEMINI_FALLBACK_MODEL to change it. */
export const DEFAULT_FALLBACK_MODEL = "gemini-2.5-flash";

class GeminiError extends Error {
  constructor(readonly status: number, body: string) {
    super(status === 503 || status === 429 ? `Gemini is busy right now (${status}); try again later.` : `Gemini ${status}: ${body.slice(0, 300)}`);
  }
}

/** One part of a Gemini request: text, or a file sent inline. */
export type GeminiPart = { text: string } | { inline_data: { mime_type: string; data: string } };

export interface GeminiOptions {
  apiKey: string;
  model?: string;
  fallbackModel?: string;
  fetch?: typeof fetch;
  sleep?: (ms: number) => Promise<void>;
}

/**
 * A JSON-only Gemini call shared by every reader (documents, payroll): the reply
 * is constrained to `schema`; busy errors are retried (2 s, then 6 s) on the main
 * model, then on the fallback model; other errors stop at once. `check` validates
 * the parsed reply and throws if it has the wrong shape (not retried).
 */
export function geminiJson(opts: GeminiOptions) {
  const model = opts.model || DEFAULT_GEMINI_MODEL;
  const fallback = opts.fallbackModel === undefined ? DEFAULT_FALLBACK_MODEL : opts.fallbackModel;
  const models = [model, ...(fallback && fallback !== model ? [fallback] : [])];
  const doFetch = opts.fetch ?? fetch;
  const sleep = opts.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)));

  async function call<T>(name: string, parts: GeminiPart[], schema: object, highRes: boolean, check: (json: unknown) => T): Promise<T> {
    const res = await doFetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(name)}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": opts.apiKey },
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig: {
          temperature: 0,
          responseMimeType: "application/json",
          responseSchema: schema,
          ...(highRes ? { mediaResolution: "MEDIA_RESOLUTION_HIGH" } : {}),
        },
      }),
    });
    if (!res.ok) throw new GeminiError(res.status, await res.text().catch(() => ""));
    const json = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Gemini did not return JSON");
    }
    return check(parsed);
  }

  return {
    model,
    async generate<T>(parts: GeminiPart[], schema: object, check: (json: unknown) => T, { highRes = false }: { highRes?: boolean } = {}): Promise<{ data: T; model: string }> {
      let last: unknown;
      for (const name of models) {
        for (let attempt = 0; attempt <= BACKOFF.length; attempt++) {
          if (attempt > 0) await sleep(BACKOFF[attempt - 1]);
          try {
            return { data: await call(name, parts, schema, highRes, check), model: name };
          } catch (e) {
            last = e;
            if (!(e instanceof GeminiError && RETRYABLE.has(e.status))) throw e;
          }
        }
      }
      throw last;
    },
  };
}

export const inlineFile = (mimeType: string, bytes: Uint8Array): GeminiPart => ({ inline_data: { mime_type: mimeType, data: base64(bytes) } });

export function geminiProvider(opts: GeminiOptions): OcrProvider {
  const gemini = geminiJson(opts);
  const check = (parsed: unknown) => {
    const out = ocrOutputSchema.safeParse(parsed);
    if (!out.success) throw new Error(`Gemini returned an unexpected shape: ${out.error.issues[0]?.message}`);
    return out.data;
  };
  return {
    name: "gemini",
    model: gemini.model,
    /**
     * Tries the main model up to three times when Gemini is busy (waiting 2 s, then
     * 6 s), then the fallback model the same way. Other errors stop at once.
     */
    async extract(input: OcrInput): Promise<OcrOutput> {
      const { data, model } = await gemini.generate(
        [{ text: `${PROMPT}\n\nThe uploader says this is: ${input.docTypeHint}.` }, inlineFile(input.mimeType, input.bytes)],
        responseSchema,
        check,
        { highRes: true },
      );
      return { fields: normalizeFields(data.fields), confidence: data.confidence, model };
    },
    /** Every document in the file, each with its page; same retries and fallback as extract(). */
    async extractMany(input: OcrInput): Promise<OcrManyOutput> {
      const { data, model } = await gemini.generate(
        [{ text: `${MANY_PROMPT}\n\nThe uploader says these are: ${input.docTypeHint}.` }, inlineFile(input.mimeType, input.bytes)],
        manyResponseSchema,
        parseMany,
        { highRes: true },
      );
      return { ...data, model };
    },
  };
}

/** The configured provider, or null when no key is set (uploads still work). */
export function ocrProviderFromEnv(): OcrProvider | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return geminiProvider({ apiKey, model: process.env.GEMINI_MODEL, fallbackModel: process.env.GEMINI_FALLBACK_MODEL });
}
