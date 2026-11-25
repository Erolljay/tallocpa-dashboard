import { describe, expect, it } from "vitest";
import { bulkReadiness, needsConfirming } from "./bulk";

const ctx = { today: "2026-11-25", priorYear: false, duplicate: false };
const clean = { status: "done", fields: { date: "2026-11-10", number: "0012", party_tin: "123-456-789-000", vatable: "1000.00", vat: "120.00", total: "1120.00" }, confidence: { total: 0.95 } };

describe("bulkReadiness", () => {
  it("lets a cleanly read document be approved from the list", () => {
    expect(bulkReadiness(clean, ctx)).toEqual({ ready: true, reason: null });
  });

  it("sends anything doubtful to its own page", () => {
    expect(bulkReadiness(null, ctx).reason).toBe("Not read yet");
    expect(bulkReadiness({ ...clean, status: "pending" }, ctx).reason).toBe("Reading…");
    expect(bulkReadiness({ ...clean, status: "failed" }, ctx).reason).toBe("OCR failed");
    expect(bulkReadiness({ ...clean, confidence: { total: 0.5, vat: 0.6 } }, ctx).reason).toBe("2 to check");
    expect(bulkReadiness({ ...clean, fields: { ...clean.fields, vat: "50.00" } }, ctx).reason).toMatch(/12%/);
    expect(bulkReadiness(clean, { ...ctx, duplicate: true }).ready).toBe(false);
    expect(bulkReadiness(clean, { ...ctx, priorYear: true }).ready).toBe(false);
    expect(bulkReadiness({ ...clean, fields: { ...clean.fields, party_kind: "individual" } }, ctx).reason).toMatch(/last and first name/);
  });

  it("asks staff to confirm a firm suggestion or a default, not the client's own history", () => {
    expect(needsConfirming("history")).toBe(false);
    expect(needsConfirming("chosen")).toBe(false);
    expect(needsConfirming("preset")).toBe(true);
    expect(needsConfirming("choose")).toBe(true);
  });
});
