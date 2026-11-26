import type { Metadata } from "next";
import { SiteDocument } from "./(site)/site-document";
import { SiteNotFoundBody } from "@/components/site/not-found-body";

export const metadata: Metadata = { title: { absolute: "Page not found | Tallo CPA" }, robots: { index: false } };

/**
 * Any URL that matches no route. With two root layouts (the website's and the app's)
 * there is no single layout to render a 404 in, so this one brings its own document:
 * the website's, which is where a mistyped or old public link lands. A notFound()
 * inside the app still renders in the app's layout.
 */
export default function GlobalNotFound() {
  return (
    <SiteDocument>
      <SiteNotFoundBody />
    </SiteDocument>
  );
}
