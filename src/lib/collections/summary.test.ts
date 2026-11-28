import { describe, expect, it } from "vitest";
import { bucketFor, DEPOSIT_TO, summarize } from "./summary";

describe("collections summary buckets", () => {
  it("maps each kind of statement item to its bucket", () => {
    expect(bucketFor({ kind: "tax", contribution: null })).toBe("tax");
    expect(bucketFor({ kind: "retainer", contribution: null })).toBe("fees");
    expect(bucketFor({ kind: "contribution", contribution: "sss" })).toBe("sss");
    expect(bucketFor({ kind: "contribution", contribution: "sss_loan" })).toBe("sss");
    expect(bucketFor({ kind: "contribution", contribution: "philhealth" })).toBe("philhealth");
    expect(bucketFor({ kind: "contribution", contribution: "pagibig" })).toBe("pagibig");
    expect(bucketFor({ kind: "contribution", contribution: "pagibig_loan" })).toBe("pagibig");
    expect(bucketFor({ kind: "contribution", contribution: null })).toBe("others");
    expect(bucketFor({ kind: "other", contribution: null })).toBe("others");
    expect(bucketFor({ kind: "something_new", contribution: null })).toBe("others");
  });

  it("names deposit banks only, no account numbers", () => {
    expect(DEPOSIT_TO).toMatchObject({ tax: "UnionBank", sss: "Security Bank", philhealth: "Security Bank", pagibig: "Security Bank", fees: "BPI", others: "BPI" });
    for (const v of Object.values(DEPOSIT_TO)) expect(v).not.toMatch(/\d{4}/);
  });

  it("totals billed and collected per bucket in centavos, listing Others by name", () => {
    const s = summarize([
      { source: "billed", kind: "tax", contribution: null, description: "Tax due, 2550Q", amount: "1000.10" },
      { source: "billed", kind: "retainer", contribution: null, description: "Monthly retainer", amount: "5000" },
      { source: "billed", kind: "contribution", contribution: "sss", description: "SSS", amount: "0.20" },
      { source: "billed", kind: "other", contribution: null, description: "Notarial fees", amount: "300" },
      { source: "collected", kind: "tax", contribution: null, description: "Tax due, 2550Q", amount: "1000.10" },
      { source: "collected", kind: "contribution", contribution: "sss", description: "SSS", amount: "0.10" },
      { source: "unapplied", kind: "unapplied", contribution: null, description: "", amount: "50" },
    ]);
    expect(s.total_billed).toBe(6300.3);
    expect(s.total_collected).toBe(1050.2);
    expect(s.difference).toBe(5250.1);
    expect(s.by_bucket.find((b) => b.bucket === "sss")).toMatchObject({ billed: 0.2, collected: 0.1, deposit_to: "Security Bank" });
    expect(s.remittances_subtotal).toEqual({ billed: 0.2, collected: 0.1, deposit_to: "Security Bank" });
    expect(s.others).toEqual([
      { name: "Other charge: Notarial fees", billed: 300, collected: 0 },
      { name: "Received, not yet applied to a statement item (client credit)", billed: 0, collected: 50 },
    ]);
  });
});
