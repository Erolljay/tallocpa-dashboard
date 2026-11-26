/**
 * schema.org structured data for the website (JSON-LD). The firm is one node with a
 * stable @id; pages point at it rather than repeating it.
 */
import type { SiteBrand } from "./brand";
import { BRAND_NAME, PRACTITIONER, TAGLINE, siteUrl } from "./config";
import type { Service } from "./content";

export const FIRM_ID = `${siteUrl("/")}#firm`;
export const WEBSITE_ID = `${siteUrl("/")}#website`;

/** Where the firm works: its city and province, and the whole country (clients nationwide). */
export const AREA_SERVED = [
  { "@type": "City", name: "Iloilo City" },
  { "@type": "AdministrativeArea", name: "Iloilo" },
  { "@type": "Country", name: "Philippines" },
];

/**
 * The office's PostalAddress from the brands address line. The office is in Iloilo City,
 * so locality, region and country are fixed; trailing "Iloilo City", "Iloilo",
 * "Philippines" parts and a postal code are taken off the line into their own fields.
 */
export function postalAddress(line: string) {
  const parts = line.split(",").map((p) => p.trim()).filter(Boolean);
  let postalCode: string | null = null;
  while (parts.length > 1) {
    const last = parts[parts.length - 1];
    const code = last.match(/^(?:(.*?)\s+)?(\d{4})$/);
    if (code) {
      postalCode = code[2];
      parts.pop();
      if (code[1]) parts.push(code[1]);
      continue;
    }
    if (/^(iloilo( city)?|philippines|ph)$/i.test(last)) {
      parts.pop();
      continue;
    }
    break;
  }
  return {
    "@type": "PostalAddress",
    streetAddress: parts.join(", "),
    addressLocality: "Iloilo City",
    addressRegion: "Iloilo",
    ...(postalCode ? { postalCode } : {}),
    addressCountry: "PH",
  };
}

/** The brands website as an absolute URL, or the site's own address when it is not set. */
function firmUrl(website: string | null): string {
  if (!website) return siteUrl("/");
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
}

/** The firm (AccountingService and ProfessionalService, LocalBusiness types) and the website, from the brands row. */
export function firmGraph(brand: SiteBrand, services: Service[]) {
  const address = brand.businessAddress ?? brand.registeredAddress;
  const sameAs = [brand.facebookUrl].filter((v): v is string => Boolean(v));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AccountingService", "ProfessionalService"],
        "@id": FIRM_ID,
        name: brand.displayName,
        ...(brand.legalName && brand.legalName !== brand.displayName ? { legalName: brand.legalName } : {}),
        slogan: TAGLINE,
        url: firmUrl(brand.website),
        logo: siteUrl("/icon.svg"),
        image: siteUrl("/opengraph-image"),
        ...(brand.phone ? { telephone: brand.phone } : {}),
        ...(brand.email ? { email: brand.email } : {}),
        ...(address ? { address: postalAddress(address) } : {}),
        areaServed: AREA_SERVED,
        knowsLanguage: ["en", "fil"],
        ...(sameAs.length ? { sameAs } : {}),
        employee: { "@type": "Person", name: PRACTITIONER, jobTitle: "Certified Public Accountant" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@id": `${siteUrl(`/services/${s.slug}`)}#service` } })),
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteUrl("/"),
        name: BRAND_NAME,
        inLanguage: "en-PH",
        publisher: { "@id": FIRM_ID },
      },
    ],
  };
}

export function serviceLd(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl(`/services/${s.slug}`)}#service`,
    name: s.h1,
    serviceType: s.name,
    description: s.metaDescription,
    url: siteUrl(`/services/${s.slug}`),
    provider: { "@id": FIRM_ID },
    /* The audit page targets "auditor in Iloilo City"; the other services are offered nationwide. */
    areaServed: s.slug === "audit" ? AREA_SERVED : { "@type": "Country", name: "Philippines" },
  };
}

/** BreadcrumbList for a trail of [name, path] pairs, home first. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: siteUrl(t.path) })),
  };
}

/** Serialises JSON-LD for a <script> tag, with "<" escaped so it cannot close the tag. */
export const ldJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
