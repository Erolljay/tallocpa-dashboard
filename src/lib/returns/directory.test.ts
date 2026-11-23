import { describe, expect, it } from "vitest";
import type { Party } from "@/lib/parties/format";
import { buildQapRows } from "./forms/withholding/qap";
import type { EwtLine } from "./forms/withholding/ewt";
import { withDirectoryParty } from "./source";
import type { SourceDocument } from "./types";

const doc = (over: Partial<SourceDocument> = {}): SourceDocument => ({
  id: "d1", docType: "bir_2307_issued", month: "2026-01-01", date: "2026-01-15", number: "1",
  partyName: "acme svc", partyTin: "111222333", partyAddress: "somewhere",
  vatable: 0, vatExempt: 0, zeroRated: 0, vat: 0, total: 100000, atc: "WC158", withholding: 1000, ...over,
});

const party = (over: Partial<Party> = {}): Party => ({
  id: "p1", tin: "111-222-333", branch_code: "00000", kind: "non_individual",
  registered_name: "ACME SERVICES CORPORATION", last_name: null, first_name: null, middle_name: null,
  trade_name: null, registered_address: "1 Main St, Iloilo City", zip_code: "5000", vat_status: "vat",
  source: "manual", verified_at: "2026-11-01T00:00:00Z", verified_by: null, notes: null, display_name: null, ...over,
});

describe("withDirectoryParty", () => {
  it("uses the directory's registered name, address and TIN with branch", () => {
    const out = withDirectoryParty(doc(), new Map([["111-222-333-00000", party()]]));
    expect(out.partyName).toBe("ACME SERVICES CORPORATION");
    expect(out.partyAddress).toBe("1 Main St, Iloilo City 5000");
    expect(out.partyTin).toBe("111-222-333-00000");
    expect(out.party).toMatchObject({ kind: "non_individual", verified: true });
  });

  it("leaves the document alone when the TIN is not on file", () => {
    const d = doc({ partyTin: "999-999-999" });
    expect(withDirectoryParty(d, new Map([["111-222-333-00000", party()]]))).toBe(d);
  });

  it("writes an individual as Last, First Middle", () => {
    const p = party({ kind: "individual", registered_name: null, last_name: "Dela Cruz", first_name: "Juan", middle_name: "Santos" });
    expect(withDirectoryParty(doc(), new Map([["111-222-333-00000", p]])).partyName).toBe("Dela Cruz, Juan Santos");
  });
});

describe("QAP rows with directory parties", () => {
  const line = (over: Partial<EwtLine>): EwtLine => ({
    documentId: "d1", month: "2026-01-01", date: "2026-01-15", number: "1", payeeName: "X", payeeTin: "111-222-333-00000",
    atc: "WI010", desc: "", rate: 5, base: 100000, withheld: 5000, known: true, ...over,
  } as EwtLine);

  it("takes an individual payee's name parts from the directory, middle name included", () => {
    const [row] = buildQapRows([line({ payeeName: "Dela Cruz, Juan Santos", party: { kind: "individual", registeredName: null, lastName: "Dela Cruz", firstName: "Juan", middleName: "Santos", verified: true } })], "2026-01-01");
    expect(row.individual).toEqual({ lastName: "Dela Cruz", firstName: "Juan", middleName: "Santos" });
  });

  it("never splits a non-individual's name, even under an individual ATC", () => {
    const [row] = buildQapRows([line({ payeeName: "Smith, Jones & Co", party: { kind: "non_individual", registeredName: "Smith, Jones & Co", lastName: null, firstName: null, middleName: null, verified: false } })], "2026-01-01");
    expect(row.individual).toBeNull();
  });
});
