import { describe, expect, it } from "vitest";
import { digestMessage } from "./digest";

describe("acting approver digest", () => {
  it("lists each approval with a link and totals the tax due", () => {
    const m = digestMessage(
      "2026-12-02",
      [
        { filing_id: "f1", client_name: "Direct Co", form: "1601-C", period_label: "2026-11", tax_due: "12500.50", approver: "Ana", approved_at: "2026-12-02T02:15:00Z" },
        { filing_id: "f2", client_name: "Other Co", form: "0619-E", period_label: "2026-11", tax_due: null, approver: "Ana", approved_at: "2026-12-02T03:00:00Z" },
      ],
      "https://app.example",
    );
    expect(m.subject).toBe("Acting approver: 2 returns approved on December 2, 2026");
    expect(m.text).toContain("Direct Co · 1601-C 2026-11 · ₱12,500.50 · by Ana");
    expect(m.text).toContain("https://app.example/app/filings/f1");
    expect(m.text).toContain("Total tax due: ₱12,500.50");
  });
});
