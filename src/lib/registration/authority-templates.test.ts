import { describe, expect, it } from "vitest";
import { authorityDocumentFor, authorityRequirement, BLANK, buildAuthority, fillTemplate, officesFor, PLACEHOLDERS, TEMPLATES, type AuthorityFacts } from "./authority-templates";

const firm = { legal_name: "EJ Tallo Cloud Accounting and Auditing Services", display_name: "Tallo CPA", business_address: "Iloilo City", registered_address: null };
const facts = (over: Partial<AuthorityFacts> = {}): AuthorityFacts => ({
  kind: "new_business",
  lgu: "Iloilo City",
  agencies: ["dti", "barangay", "lgu", "bir"],
  client: { name: "Jaro Bakeshop", taxpayer_type: "individual", tin: null, rdo_code: "074", registered_address: "12 Lopez Jaena St., Jaro" },
  sec_no: null,
  dti_no: "BN-1234567",
  contacts: [],
  firm,
  ...over,
});

describe("authorityDocumentFor", () => {
  it("is an SPA for an individual, a Partners' Certificate for a partnership, else a Secretary's Certificate", () => {
    expect(authorityDocumentFor("individual")).toBe("special_power_of_attorney");
    expect(authorityDocumentFor("partnership")).toBe("partners_certificate");
    for (const t of ["corporation", "opc", "non_stock"] as const) expect(authorityDocumentFor(t)).toBe("secretary_certificate");
    expect(authorityRequirement("corporation").requirement).toBe("Notarized Secretary's Certificate authorizing the firm");
    expect(authorityRequirement("individual").requirement).toBe("Notarized Special Power of Attorney authorizing the firm");
  });
});

describe("fillTemplate", () => {
  it("fills held values, blanks the rest as missing, and always leaves the representative to staff", () => {
    const r = fillTemplate("{{client_name}} / {{client_tin}} / {{representative_name}}", { client_name: "Jaro", client_tin: " " });
    expect(r.text).toBe(`Jaro / ${BLANK} / ${BLANK}`);
    expect(r.marked).toBe("Jaro / ⟦missing:Client's TIN⟧ / ⟦staff:Representative's full name⟧");
    expect(r.missing).toEqual(["Client's TIN"]);
    expect(r.to_fill_by_staff).toEqual(["Representative's full name"]);
  });

  it("every template uses only known placeholders", () => {
    for (const t of Object.values(TEMPLATES)) {
      for (const [, key] of t.matchAll(/\{\{(\w+)\}\}/g)) expect(Object.keys(PLACEHOLDERS)).toContain(key);
    }
  });
});

describe("buildAuthority", () => {
  it("an individual gets an SPA: business facts filled, personal details and the representative blank", () => {
    const a = buildAuthority(facts());
    expect(a.document).toBe("special_power_of_attorney");
    expect(a.title).toBe("Special Power of Attorney");
    expect(a.text).toContain("doing business under the name Jaro Bakeshop (DTI Business Name Certificate No. BN-1234567)");
    expect(a.text).toContain("EJ Tallo Cloud Accounting and Auditing Services (Tallo CPA)");
    expect(a.text).toContain("registration of its new business with the Department of Trade and Industry (DTI), the Barangay, the City / Municipal Government of Iloilo City and the Bureau of Internal Revenue (BIR)");
    expect(a.missing).toEqual(expect.arrayContaining(["Owner's full name", "Civil status", "Citizenship", "Owner's residence address", "Client's TIN", "Date of signing"]));
    expect(a.missing).not.toContain("Representative's full name");
    expect(a.to_fill_by_staff).toEqual(["Representative's full name", "Representative's position", "Representative's valid ID no."]);
    expect(a.text).not.toMatch(/\{\{|⟦/);
    expect(a.marked).toContain("⟦staff:Representative's full name⟧");
  });

  it("a corporation gets a Secretary's Certificate, with the secretary from its contacts and the SEC number from its step", () => {
    const a = buildAuthority(
      facts({
        kind: "branch",
        branch_name: "Molo branch",
        agencies: ["lgu", "bir"],
        client: { name: "Molo Foods Inc.", taxpayer_type: "corporation", tin: "123-456-789-00000", rdo_code: "074", registered_address: "Molo, Iloilo City" },
        sec_no: "CS2026-0001",
        contacts: [{ full_name: "Ana Reyes", position: "Corporate Secretary" }, { full_name: "Ben Cruz", position: "President" }],
      }),
    );
    expect(a.document).toBe("secretary_certificate");
    expect(a.text).toContain("I, Ana Reyes, of legal age");
    expect(a.text).toContain("SEC Registration No. CS2026-0001, Taxpayer Identification No. 123-456-789-00000 (RDO 074)");
    expect(a.text).toContain("At the meeting of the Board of Directors of the Corporation held on [__________]");
    expect(a.text).toContain("registration of its new branch (Molo branch)");
    expect(a.text).toContain("the City / Municipal Government of Iloilo City and the Bureau of Internal Revenue (BIR)");
    expect(a.missing).toEqual(expect.arrayContaining(["Date of the board / partners' meeting", "Place of the meeting", "Date of signing"]));
    expect(a.missing).not.toContain("Corporate Secretary's full name");
  });

  it("without a secretary or SEC number on record, those are blank and listed; a one person corporation's sole director resolves", () => {
    const a = buildAuthority(facts({ client: { name: "Solo OPC", taxpayer_type: "opc", tin: null, rdo_code: null, registered_address: null }, dti_no: null }));
    expect(a.missing).toEqual(expect.arrayContaining(["Corporate Secretary's full name", "SEC registration no.", "Client's TIN", "RDO code", "Principal office / business address"]));
    expect(a.text).toContain("By the resolution of the Sole Director of the Corporation held on");
  });

  it("a partnership gets a Partners' Certificate naming the partners on record", () => {
    const a = buildAuthority(facts({ client: { name: "Reyes & Cruz", taxpayer_type: "partnership", tin: null, rdo_code: "074", registered_address: "Iloilo" }, contacts: [{ full_name: "A. Reyes", position: "Managing Partner" }, { full_name: "B. Cruz", position: "Partner" }] }));
    expect(a.document).toBe("partners_certificate");
    expect(a.text).toContain("Partners: A. Reyes, B. Cruz");
  });

  it("names the BIR even when the case has no BIR step", () => {
    expect(officesFor(["sec"], null)).toBe("the Bureau of Internal Revenue (BIR) and the Securities and Exchange Commission (SEC)");
  });
});
