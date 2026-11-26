import { describe, expect, it } from "vitest";
import { AREA_SERVED, firmGraph, postalAddress, serviceLd } from "./structured-data";
import type { SiteBrand } from "./brand";
import { SERVICES } from "./content";

/* brand.ts is server-only (it reads the database); the test builds a brand of its own. */
const BRAND: SiteBrand = {
  displayName: "Tallo CPA",
  legalName: null,
  businessAddress: null,
  registeredAddress: null,
  phone: null,
  email: null,
  website: null,
  facebookUrl: null,
  cpaLicenseNo: null,
  boaFirmAccreditationNo: null,
  boaIndividualAccreditationNo: null,
  birTaxAgentAccreditationNo: null,
  funnelLive: false,
};

describe("postalAddress", () => {
  it("keeps the street line and fixes the locality to Iloilo City", () => {
    expect(postalAddress("Rm. 11, Mezzanine Floor, Red Plaza Building, JM Basa St., Iloilo City")).toEqual({
      "@type": "PostalAddress",
      streetAddress: "Rm. 11, Mezzanine Floor, Red Plaza Building, JM Basa St.",
      addressLocality: "Iloilo City",
      addressRegion: "Iloilo",
      addressCountry: "PH",
    });
  });

  it("takes a postal code, the province and the country off the line", () => {
    const a = postalAddress("Rm. 11, Red Plaza Building, JM Basa St., Iloilo City 5000, Iloilo, Philippines");
    expect(a.streetAddress).toBe("Rm. 11, Red Plaza Building, JM Basa St.");
    expect(a.postalCode).toBe("5000");
  });
});

describe("firmGraph", () => {
  it("serves Iloilo City, Iloilo and the Philippines and carries the brands address, phone and website", () => {
    const firm = firmGraph(
      { ...BRAND, businessAddress: "Rm. 11, Mezzanine Floor, Red Plaza Building, JM Basa St., Iloilo City", phone: "0917 000 0000", website: "tallocpa.com" },
      SERVICES,
    )["@graph"][0] as Record<string, unknown>;
    expect(firm["@type"]).toEqual(["AccountingService", "ProfessionalService"]);
    expect(firm.areaServed).toEqual(AREA_SERVED);
    expect(firm.telephone).toBe("0917 000 0000");
    expect(firm.url).toBe("https://tallocpa.com");
    expect((firm.address as { addressLocality: string }).addressLocality).toBe("Iloilo City");
  });

  it("leaves out the address when the brands row has none", () => {
    const firm = firmGraph(BRAND, SERVICES)["@graph"][0] as Record<string, unknown>;
    expect(firm.address).toBeUndefined();
  });
});

describe("serviceLd", () => {
  it("gives the audit service the firm's local area", () => {
    const audit = SERVICES.find((s) => s.slug === "audit")!;
    expect(serviceLd(audit).areaServed).toEqual(AREA_SERVED);
  });
});
