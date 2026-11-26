import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./site.css";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";
import { AttributionKeeper } from "@/components/site/cta-link";
import { getSiteBrand, type SiteBrand } from "@/lib/site/brand";
import { BRAND_NAME, PRACTITIONER, SITE_URL, TAGLINE, siteUrl } from "@/lib/site/config";
import { SERVICES } from "@/lib/site/content";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND_NAME,
  formatDetection: { telephone: false, address: false, email: false },
};

/** The public website (tallocpa.com): header, footer and the firm's structured data. */
export default async function SiteLayout({ children }: { children: ReactNode }) {
  const brand = await getSiteBrand();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(brand)).replace(/</g, "\\u003c") }} />
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-background-primary-default px-3 py-2 text-body-medium text-text-primary focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus-visible:ring-2 focus-visible:ring-border-focus-ring"
      >
        Skip to content
      </a>
      <SiteHeader brand={brand} />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <SiteFooter brand={brand} />
      <AttributionKeeper />
    </>
  );
}

/** schema.org AccountingService from the brands row; unset fields are left out. */
function jsonLd(brand: SiteBrand) {
  const address = brand.businessAddress ?? brand.registeredAddress;
  const sameAs = [brand.facebookUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${siteUrl("/")}#firm`,
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
    ...(sameAs.length ? { sameAs } : {}),
    employee: { "@type": "Person", name: PRACTITIONER, jobTitle: "Certified Public Accountant" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.summary, url: siteUrl(`/services/${s.slug}`) },
      })),
    },
  };
}
