import { describe, expect, it, vi } from "vitest";
import { geminiProvider } from "./gemini";

const reply = (body: unknown, status = 200) =>
  vi.fn(async () => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } }));
const input = { bytes: new Uint8Array([1, 2, 3]), mimeType: "image/jpeg", docTypeHint: "Purchase or expense receipt" };

describe("geminiProvider", () => {
  it("sends the image at high resolution with a JSON schema, and tidies what comes back", async () => {
    const fetch = reply({
      candidates: [{ content: { parts: [{ text: JSON.stringify({ fields: { date: "2026-11-10", party_tin: "123456789000", total: "1,120.00", vat: 120 }, confidence: { date: 0.98, total: 0.6 } }) }] } }],
    });
    const out = await geminiProvider({ apiKey: "k", model: "test-model", fetch }).extract(input);
    expect(out.fields).toMatchObject({ date: "2026-11-10", party_tin: "123-456-789-000", total: "1120.00", vat: "120.00", number: null });
    expect(out.confidence).toEqual({ date: 0.98, total: 0.6 });

    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toContain("/models/test-model:generateContent");
    expect((init.headers as Record<string, string>)["x-goog-api-key"]).toBe("k");
    const body = JSON.parse(init.body as string);
    expect(body.generationConfig).toMatchObject({ responseMimeType: "application/json", mediaResolution: "MEDIA_RESOLUTION_HIGH", temperature: 0 });
    expect(body.contents[0].parts[1].inline_data).toEqual({ mime_type: "image/jpeg", data: "AQID" });
  });

  it("reports API errors and replies in the wrong shape instead of saving them", async () => {
    await expect(geminiProvider({ apiKey: "k", fetch: reply({ error: "quota" }, 429) }).extract(input)).rejects.toThrow(/Gemini 429/);
    await expect(geminiProvider({ apiKey: "k", fetch: reply({ candidates: [{ content: { parts: [{ text: "not json" }] } }] }) }).extract(input)).rejects.toThrow(/did not return JSON/);
    await expect(geminiProvider({ apiKey: "k", fetch: reply({ candidates: [{ content: { parts: [{ text: '{"total": 5}' }] } }] }) }).extract(input)).rejects.toThrow(/unexpected shape/);
  });
});
