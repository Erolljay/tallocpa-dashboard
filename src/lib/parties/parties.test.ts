import { describe, expect, it, vi } from "vitest";
import { datAddress, datNameCols, displayName, listNameCols, type Party } from "./format";
import { fillFromDirectory, resolveParty, sameName } from "./resolve";
import { branch4, normalizeBranch, parseTin, partyKey, tin9 } from "./tin";

vi.mock("server-only", () => ({}));

const party = (over: Partial<Party> = {}): Party => ({
  id: "p1",
  tin: "123-456-789",
  branch_code: "00000",
  kind: "non_individual",
  registered_name: "Acme Trading Corporation",
  last_name: null,
  first_name: null,
  middle_name: null,
  trade_name: "Acme Hardware",
  registered_address: "12 Rizal St., Jaro, Iloilo City",
  zip_code: "5000",
  vat_status: "vat",
  source: "manual",
  verified_at: null,
  verified_by: null,
  notes: null,
  display_name: "Acme Trading Corporation",
  ...over,
});
const person = party({ kind: "individual", registered_name: null, last_name: "Dela Cruz", first_name: "Juan", middle_name: "Santos", trade_name: null, display_name: "Dela Cruz, Juan Santos" });

describe("TINs", () => {
  it("parses a TIN with or without a branch code", () => {
    expect(parseTin("123456789")).toEqual({ tin: "123-456-789", branch: "00000", hasBranch: false });
    expect(parseTin("123-456-789-000")).toEqual({ tin: "123-456-789", branch: "00000", hasBranch: true });
    expect(parseTin(" 123 456 789 0002 ")).toEqual({ tin: "123-456-789", branch: "00002", hasBranch: true });
    expect(parseTin("123-456-789-00003")?.branch).toBe("00003");
    expect(parseTin("12345678")).toBeNull();
    expect(parseTin("000-000-000")).toBeNull();
    expect(parseTin(null)).toBeNull();
  });

  it("keys the directory by dashed TIN and branch", () => {
    expect(partyKey("123456789")).toBe("123-456-789-00000");
    expect(partyKey("123-456-789-001")).toBe("123-456-789-00001");
    expect(partyKey("n/a")).toBeNull();
  });

  it("normalizes a branch code typed on its own", () => {
    expect(normalizeBranch("")).toBe("00000");
    expect(normalizeBranch("000")).toBe("00000");
    expect(normalizeBranch("0012")).toBe("00012");
    expect(normalizeBranch("12")).toBeNull();
    expect(normalizeBranch("123456")).toBeNull();
  });

  it("formats for the DAT files like taxify", () => {
    expect(tin9("123-456-789-00000")).toBe("123456789");
    expect(tin9("")).toBe("000000000");
    expect(branch4("00000")).toBe("0000");
    expect(branch4("00012")).toBe("0012");
    expect(branch4("001")).toBe("0001");
  });
});

describe("names", () => {
  it("shows companies by registered name and people as Last, First Middle", () => {
    expect(displayName(party())).toBe("Acme Trading Corporation");
    expect(displayName(person)).toBe("Dela Cruz, Juan Santos");
    expect(displayName({ ...person, middle_name: null })).toBe("Dela Cruz, Juan");
  });

  it("fills one of the two listing name columns (taxify partyNameCols)", () => {
    expect(listNameCols(party())).toEqual(["Acme Trading Corporation", ""]);
    expect(listNameCols(person)).toEqual(["", "Dela Cruz, Juan Santos"]);
  });

  it("gives DAT name and address columns in upper case without special characters", () => {
    expect(datNameCols(party({ registered_name: "Ñ & Co., Inc." }))).toEqual({ registeredName: "CO. INC.", lastName: "", firstName: "", middleName: "" });
    expect(datNameCols(person)).toEqual({ registeredName: "", lastName: "DELA CRUZ", firstName: "JUAN", middleName: "SANTOS" });
    expect(datAddress(party())).toEqual({ address1: "12 RIZAL ST. JARO ILOILO CITY", address2: "5000" });
  });
});

describe("resolveParty", () => {
  it("uses OCR's reading when the TIN is not on file", () => {
    expect(resolveParty("Acme", "123-456-789", "Iloilo", null)).toMatchObject({ name: "Acme", tin: "123-456-789", address: "Iloilo", from: "ocr", warning: null });
  });

  it("uses the directory and stays quiet when OCR agrees", () => {
    const r = resolveParty("ACME TRADING CORP.", "123456789", "Jaro, Iloilo City", party());
    expect(r).toMatchObject({ name: "Acme Trading Corporation", tin: "123-456-789-00000", address: "12 Rizal St., Jaro, Iloilo City 5000", from: "directory", nameDiffers: false, addressDiffers: false, warning: null });
  });

  it("warns when OCR's name differs from the registered name", () => {
    const r = resolveParty("Beta Supplies", "123456789", null, party());
    expect(r.nameDiffers).toBe(true);
    expect(r.warning).toMatch(/registered to “Acme Trading Corporation”/);
  });

  it("notes a trade name without calling it a mismatch", () => {
    const r = resolveParty("ACME HARDWARE", "123456789", null, party());
    expect(r).toMatchObject({ nameDiffers: false, isTradeName: true, name: "Acme Trading Corporation" });
    expect(r.warning).toMatch(/trade name/);
  });

  it("matches a person's name in either order, and flags a different address", () => {
    expect(sameName("Juan Santos Dela Cruz", "Dela Cruz, Juan Santos")).toBe(true);
    const r = resolveParty("JUAN S. DELA CRUZ", "123456789", "Cebu City", person);
    expect(r.nameDiffers).toBe(true);
    expect(r.addressDiffers).toBe(true);
    expect(resolveParty("Juan Santos Dela Cruz", "123456789", "Jaro Iloilo City", person).warning).toBeNull();
  });
});

describe("lookupParties", () => {
  it("keys rows by TIN and branch, falling back to the only branch when none was given", async () => {
    const { lookupParties } = await import("./lookup");
    const rows = [party(), party({ id: "p2", tin: "222-333-444", branch_code: "00002" }), party({ id: "p3", tin: "555-666-777", branch_code: "00001" }), party({ id: "p4", tin: "555-666-777", branch_code: "00002" })];
    const inArgs: string[][] = [];
    const supabase = {
      from: () => ({ select: () => ({ in: async (_: string, tins: string[]) => (inArgs.push(tins), { data: rows.filter((r) => tins.includes(r.tin)), error: null }) }) }),
    };
    const map = await lookupParties(supabase as never, ["123456789", "123-456-789-000", "222333444", "222-333-444-00001", "555666777", "bad", null]);
    expect(inArgs).toEqual([["123-456-789", "222-333-444", "555-666-777"]]);
    expect([...map.entries()].map(([k, v]) => [k, v.id])).toEqual([
      ["123-456-789-00000", "p1"],
      ["222-333-444-00000", "p2"],
    ]);
    expect(await lookupParties(supabase as never, [])).toEqual(new Map());
  });
});

describe("partySchema", () => {
  it("tidies the TIN, takes a branch from the TIN, and keeps only the names the kind uses", async () => {
    const { partySchema } = await import("./schema");
    const r = partySchema.parse({ tin: "123456789001", branch_code: "", kind: "individual", registered_name: "X", last_name: "Cruz", first_name: "Ana", middle_name: "", vat_status: "unknown", zip_code: "" });
    expect(r).toMatchObject({ tin: "123-456-789", branch_code: "00001", registered_name: null, last_name: "Cruz", first_name: "Ana", middle_name: null, zip_code: null });
    const bad = partySchema.safeParse({ tin: "123", branch_code: "12", kind: "non_individual", vat_status: "vat", zip_code: "50" });
    expect(bad.success).toBe(false);
    expect(bad.error?.issues.map((i) => i.path[0]).sort()).toEqual(["branch_code", "registered_name", "tin", "zip_code"]);
  });
});

describe("fillFromDirectory (when OCR reads a document)", () => {
  it("replaces a blank or matching name with the registered name, address and TIN with branch", () => {
    for (const name of [null, "ACME TRADING CORP."]) {
      const r = fillFromDirectory({ party_name: name, party_tin: "123456789", party_address: null, total: "100.00" }, { party_name: 0.4 }, party());
      expect(r.filled).toBe(true);
      expect(r.fields).toMatchObject({ party_name: "Acme Trading Corporation", party_tin: "123-456-789-00000", total: "100.00" });
      expect(r.fields.party_address).toContain("Iloilo City");
      expect(r.confidence).toMatchObject({ party_name: 1, party_tin: 1, party_address: 1 });
    }
  });

  it("leaves a different name alone: the TIN may be misread", () => {
    const fields = { party_name: "Beta Supplies", party_tin: "123456789", party_address: null };
    const r = fillFromDirectory(fields, {}, party());
    expect(r.filled).toBe(false);
    expect(r.fields).toBe(fields);
  });

  it("brings an individual's last, first and middle name for the BIR lists", () => {
    const shop = party({ ...person, trade_name: "JDC Hardware" });
    const r = fillFromDirectory({ party_name: "JDC Hardware", party_tin: "123456789", party_kind: "non_individual" }, {}, shop);
    expect(r.fields).toMatchObject({ party_name: "Dela Cruz, Juan Santos", party_kind: "individual", party_last_name: "Dela Cruz", party_first_name: "Juan", party_middle_name: "Santos" });
    const biz = fillFromDirectory({ party_name: "Acme Trading Corp", party_tin: "123456789", party_kind: "individual", party_last_name: "Corp" }, {}, party());
    expect(biz.fields).toMatchObject({ party_kind: "non_individual", party_last_name: null });
  });

  it("does nothing when the TIN is not on file", () => {
    expect(fillFromDirectory({ party_name: "X", party_tin: "999999999" }, {}, undefined).filled).toBe(false);
  });
});
