import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./site.css";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";
import { AttributionKeeper } from "@/components/site/cta-link";
import { JsonLd } from "@/components/site/json-ld";
import { getSiteBrand } from "@/lib/site/brand";
import { BRAND_NAME, SITE_URL } from "@/lib/site/config";
import { SERVICES } from "@/lib/site/content";
import { firmGraph } from "@/lib/site/structured-data";
import { cx } from "@/utils/cx";

/*
 * The website's faces: Geist for text, Geist Mono for form codes, dates and amounts.
 * site.css points BoardUI's --font-sans and --font-mono at them inside the site only;
 * the app keeps Inter. Mono is not preloaded: it is never the largest paint.
 */
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap", preload: false });

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const facebookVerification = process.env.FACEBOOK_DOMAIN_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND_NAME,
  formatDetection: { telephone: false, address: false, email: false },
  /* Search Console and Facebook domain verification, when the Owner sets them. */
  ...(googleVerification || facebookVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(facebookVerification ? { other: { "facebook-domain-verification": facebookVerification } } : {}),
        },
      }
    : {}),
};

/** The public website (tallocpa.com): header, footer and the firm's structured data. */
export default async function SiteLayout({ children }: { children: ReactNode }) {
  const brand = await getSiteBrand();
  return (
    <div lang="en-PH" className={cx(geist.variable, geistMono.variable, "site flex flex-1 flex-col")}>
      <JsonLd data={firmGraph(brand, SERVICES)} />
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
    </div>
  );
}
