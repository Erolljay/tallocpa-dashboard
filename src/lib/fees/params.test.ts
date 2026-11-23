import { describe, expect, it } from "vitest";
import { count, profileFromQuery } from "./params";
import { FEE_TEMPLATE } from "./template";

const items = FEE_TEMPLATE.map((t) => ({ ...t, price: null }));

describe("profileFromQuery", () => {
  it("defaults to a plain individual with the suggested annual package", () => {
    const { profile, submitted } = profileFromQuery({}, items);
    expect(submitted).toBe(false);
    expect(profile).toMatchObject({ taxpayerType: "individual", vatRegistered: false, ewt: "none", employees: 0, bookkeeping: "none", complexity: [], oneTimeItems: [] });
    expect(profile.annualItems).toEqual(["H.sawt", "H.afs_itr"]);
  });

  it("reads every field of a submitted form", () => {
    const { profile } = profileFromQuery(
      {
        q: "1", taxpayer_type: "corporation", vat: "1", ewt: "tamp_regular", employees: "51", contributions: "1", documents: "1,200",
        bookkeeping: "heavy", complexity: ["inventory", "bogus"], branches: "2", annual: ["H.1604c", "A.individual"],
        "once.I.backlog_month": "3", "once.K.aup": "1", "once.I.orus": "0", "once.A.individual": "4",
      },
      items,
    );
    expect(profile).toEqual({
      taxpayerType: "corporation", vatRegistered: true, ewt: "tamp_regular", employees: 51, remitsContributions: true, documentsPerMonth: 1200,
      bookkeeping: "heavy", complexity: ["inventory"], branches: 2, annualItems: ["H.1604c"],
      oneTimeItems: [{ code: "I.backlog_month", quantity: 3 }, { code: "K.aup", quantity: 1 }],
    });
  });

  it("ignores values it does not know", () => {
    const { profile } = profileFromQuery({ q: "1", taxpayer_type: "alien", ewt: "x", bookkeeping: "max" }, items);
    expect(profile).toMatchObject({ taxpayerType: "individual", ewt: "none", bookkeeping: "none", annualItems: [] });
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
