/**
 * schema.org structured data for the website (JSON-LD). The firm is one node with a
 * stable @id; pages point at it rather than repeating it.
 */
import type { SiteBrand } from "./brand";
import { BRAND_NAME, PRACTITIONER, TAGLINE, siteUrl } from "./config";
import type { Service } from "./content";

export const FIRM_ID = `${siteUrl("/")}#firm`;
export const WEBSITE_ID = `${siteUrl("/")}#website`;

/** The firm (AccountingService, a ProfessionalService) and the website, from the brands row. */
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
        url: siteUrl("/"),
        logo: siteUrl("/icon.svg"),
        image: siteUrl("/opengraph-image"),
        ...(brand.phone ? { telephone: brand.phone } : {}),
        ...(brand.email ? { email: brand.email } : {}),
        ...(address ? { address: { "@type": "PostalAddress", streetAddress: address, addressCountry: "PH" } } : {}),
        areaServed: { "@type": "Country", name: "Philippines" },
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
    areaServed: { "@type": "Country", name: "Philippines" },
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
