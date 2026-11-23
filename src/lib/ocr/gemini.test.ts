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
    await expect(geminiProvider({ apiKey: "k", fallbackModel: "", fetch: reply({ error: "bad key" }, 400) }).extract(input)).rejects.toThrow(/Gemini 400/);
    await expect(geminiProvider({ apiKey: "k", fetch: reply({ candidates: [{ content: { parts: [{ text: "not json" }] } }] }) }).extract(input)).rejects.toThrow(/did not return JSON/);
    await expect(geminiProvider({ apiKey: "k", fetch: reply({ candidates: [{ content: { parts: [{ text: '{"total": 5}' }] } }] }) }).extract(input)).rejects.toThrow(/unexpected shape/);
  });
});

describe("geminiProvider when Gemini is busy", () => {
  const ok = { candidates: [{ content: { parts: [{ text: JSON.stringify({ fields: { total: "100" }, confidence: {} }) }] } }] };
  const respond = (body: unknown, status: number) => new Response(JSON.stringify(body), { status });
  const busy = () => respond({ error: { code: 503, status: "UNAVAILABLE" } }, 503);

  it("waits and tries again, then succeeds", async () => {
    const fetch = vi.fn().mockResolvedValueOnce(busy()).mockResolvedValueOnce(respond(ok, 200));
    const sleep = vi.fn(async () => {});
    const out = await geminiProvider({ apiKey: "k", model: "main", fetch, sleep }).extract(input);
    expect(out).toMatchObject({ fields: { total: "100.00" }, model: "main" });
    expect(sleep).toHaveBeenCalledWith(2000);
  });

  it("switches to the fallback model when the main one stays busy", async () => {
    const fetch = vi.fn().mockResolvedValueOnce(busy()).mockResolvedValueOnce(busy()).mockResolvedValueOnce(busy()).mockResolvedValueOnce(respond(ok, 200));
    const out = await geminiProvider({ apiKey: "k", model: "main", fallbackModel: "backup", fetch, sleep: async () => {} }).extract(input);
    expect(out.model).toBe("backup");
    expect((fetch.mock.calls[3] as unknown as [string])[0]).toContain("/models/backup:");
  });

  it("gives a plain message when every try is busy, and does not retry other errors", async () => {
    const allBusy = vi.fn(async () => busy());
    await expect(geminiProvider({ apiKey: "k", model: "main", fallbackModel: "backup", fetch: allBusy, sleep: async () => {} }).extract(input)).rejects.toThrow(/busy right now/);
    expect(allBusy).toHaveBeenCalledTimes(6);
    const bad = vi.fn(async () => respond({ error: "bad request" }, 400));
    await expect(geminiProvider({ apiKey: "k", fetch: bad, sleep: async () => {} }).extract(input)).rejects.toThrow(/Gemini 400/);
    expect(bad).toHaveBeenCalledTimes(1);
  });
});
