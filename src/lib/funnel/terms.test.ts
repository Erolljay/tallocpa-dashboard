import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { canonicalContent, defaultTerms } from "./terms";

const sha = (s: string) => createHash("sha256").update(s).digest("hex");

describe("proposal acceptance fingerprint", () => {
  const base = { firm: "EJ Tallo Cloud Accounting", client: "Molo Bakery", terms: "Terms", validUntil: "2027-01-31" };

  it("is the same whatever order the stored quote's keys come back in", () => {
    const a = canonicalContent({ ...base, quote: { monthlyRetainer: 5000, monthly: [{ code: "A", amount: 1 }] } });
    const b = canonicalContent({ ...base, quote: { monthly: [{ amount: 1, code: "A" }], monthlyRetainer: 5000 } });
    expect(sha(a)).toBe(sha(b));
  });

  it("changes when anything accepted changes", () => {
    const a = canonicalContent({ ...base, quote: { monthlyRetainer: 5000 } });
    expect(canonicalContent({ ...base, quote: { monthlyRetainer: 5001 } })).not.toBe(a);
    expect(canonicalContent({ ...base, terms: "Terms.", quote: { monthlyRetainer: 5000 } })).not.toBe(a);
  });
});

describe("default terms", () => {
  it("names the firm and the services, and the cutoff, the 2307 and e-signature", () => {
    const t = defaultTerms("EJ Tallo Cloud Accounting", ["tax_compliance", "bookkeeping"]);
    expect(t).toContain("EJ Tallo Cloud Accounting (\"we\") will provide Tax Compliance, Bookkeeping");
    expect(t).toMatch(/by the 5th of the following month/);
    expect(t).toMatch(/BIR Form 2307/);
    expect(t).toMatch(/RA 8792/);
  });
});
