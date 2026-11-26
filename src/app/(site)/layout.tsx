import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BRAND_NAME, SITE_URL } from "@/lib/site/config";
import { SiteDocument } from "./site-document";

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

/**
 * The public website (tallocpa.com): a root layout of its own (the app's is
 * src/app/(platform)/layout.tsx), with the header, footer and the firm's structured data.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteDocument>{children}</SiteDocument>;
}
