import { describe, expect, it } from "vitest";
import { count, EWT_CHOICES, profileFromQuery, profileFromStored } from "./params";

describe("profileFromQuery", () => {
  it("defaults to a plain individual, not behind", () => {
    const { profile, submitted } = profileFromQuery({});
    expect(submitted).toBe(false);
    expect(profile).toEqual({ taxpayerType: "individual", vatRegistered: false, ewt: "none", employees: 0, remitsContributions: false, documentsPerMonth: 0, complexity: [], branches: 0, monthsBehind: 0 });
  });

  it("reads every field of a submitted form", () => {
    const { profile } = profileFromQuery({
      q: "1", taxpayer_type: "corporation", vat: "1", ewt: "tamp_regular", employees: "51", contributions: "1", documents: "1,200",
      complexity: ["inventory", "bogus"], branches: "2", behind: "3", bookkeeping: "heavy", annual: ["H.1604c"],
    });
    expect(profile).toEqual({
      taxpayerType: "corporation", vatRegistered: true, ewt: "tamp_regular", employees: 51, remitsContributions: true, documentsPerMonth: 1200,
      complexity: ["inventory"], branches: 2, monthsBehind: 3,
    });
  });

  it("reads a bookmarked link from before 26 Nov 2026, and caps months behind", () => {
    expect(profileFromQuery({ "once.I.backlog_month": "4" }).profile.monthsBehind).toBe(4);
    expect(profileFromQuery({ behind: "999" }).profile.monthsBehind).toBe(120);
  });

  it("ignores values it does not know", () => {
    const { profile } = profileFromQuery({ q: "1", taxpayer_type: "alien", ewt: "x", behind: "-2" });
    expect(profile).toMatchObject({ taxpayerType: "individual", ewt: "none", monthsBehind: 0 });
  });
});

describe("the withholding question on /start", () => {
  it("maps each plain-language answer to its kind, and anything else to none", () => {
    expect(EWT_CHOICES.map((c) => [c.label, c.value])).toEqual([["No", "none"], ["Yes, on rent or contractors", "rental"], ["Yes, we are a Top Withholding Agent (TAMP)", "tamp_regular"]]);
    for (const c of EWT_CHOICES) expect(profileFromQuery({ ewt: c.value }).profile.ewt).toBe(c.value);
    expect(profileFromQuery({ ewt: "Yes, on rent or contractors" }).profile.ewt).toBe("none");
    expect(profileFromQuery({ ewt: ["rental", "tamp_regular"] }).profile.ewt).toBe("rental");
  });
});

describe("profileFromStored", () => {
  it("reads a profile saved before 26 Nov 2026: bookkeeping and annual items dropped, backlog becomes months behind", () => {
    const old = {
      taxpayerType: "opc", vatRegistered: true, ewt: "rental", employees: 4, remitsContributions: true, documentsPerMonth: 80,
      bookkeeping: "standard", complexity: ["construction"], branches: 1, annualItems: ["H.afs_itr"], oneTimeItems: [{ code: "I.orus", quantity: 1 }, { code: "I.backlog_month", quantity: 2 }],
    };
    expect(profileFromStored(old)).toEqual({
      taxpayerType: "opc", vatRegistered: true, ewt: "rental", employees: 4, remitsContributions: true, documentsPerMonth: 80, complexity: ["construction"], branches: 1, monthsBehind: 2,
    });
  });

  it("takes the plain default for anything unreadable", () => {
    expect(profileFromStored(null)).toMatchObject({ taxpayerType: "individual", employees: 0, monthsBehind: 0, complexity: [] });
    expect(profileFromStored({ employees: -1, monthsBehind: 2.5, complexity: "inventory" })).toMatchObject({ employees: 0, monthsBehind: 0, complexity: [] });
  });
});

describe("count", () => {
  it("accepts whole numbers only, capped", () => {
    expect(count("12")).toBe(12);
    expect(count("-1")).toBe(0);
    expect(count("2.5")).toBe(0);
    expect(count("abc")).toBe(0);
    expect(count(undefined)).toBe(0);
    expect(count("5000", 1000)).toBe(1000);
  });
});
