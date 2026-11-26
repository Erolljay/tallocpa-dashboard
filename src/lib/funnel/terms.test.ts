import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { acceptedQuote, canonicalContent, defaultTerms } from "./terms";

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

describe("the audit is not part of what the client accepts", () => {
  const base = { firm: "Tallo CPA", client: "Molo Bakery", terms: "Terms", validUntil: "2027-01-31" };
  const quote = { monthlyRetainer: 4900, annualJobs: [{ code: "H.1604c", amount: 1500 }], adHocJobs: [{ code: "I.orus", amount: 1500 }] };
  const audit = { code: "H.audit_corporation_0-3m", amount: 16000, indicative: true };

  it("leaves the separate audit out of the fingerprint, whatever its price", () => {
    const without = canonicalContent({ ...base, quote: { ...quote, audit: null } });
    expect(canonicalContent({ ...base, quote: { ...quote, audit } })).toBe(without);
    expect(canonicalContent({ ...base, quote: { ...quote, audit: { ...audit, amount: 24000 } } })).toBe(without);
    expect(without).not.toContain("audit");
  });

  it("but every annual and ad hoc job and its price is in it", () => {
    const a = canonicalContent({ ...base, quote: { ...quote, audit } });
    expect(a).toContain('"code":"H.1604c"');
    expect(canonicalContent({ ...base, quote: { ...quote, annualJobs: [{ code: "H.1604c", amount: 2000 }], audit } })).not.toBe(a);
    expect(canonicalContent({ ...base, quote: { ...quote, adHocJobs: [], audit } })).not.toBe(a);
  });

  it("a proposal from before 26 Nov 2026 hashes as it did", () => {
    expect(acceptedQuote({ monthlyRetainer: 1, firstYearTotal: 12 })).toEqual({ monthlyRetainer: 1, firstYearTotal: 12 });
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
