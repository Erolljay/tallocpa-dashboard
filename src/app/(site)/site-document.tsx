import localFont from "next/font/local";
import type { ReactNode } from "react";
/* The website's own Tailwind entry: BoardUI tokens and base, utilities from the site's files only. */
import "./site-globals.css";
import { SiteChrome } from "@/components/site/chrome";
import { getSiteBrand } from "@/lib/site/brand";
import { themeScript } from "@/lib/theme-script";
import { cx } from "@/utils/cx";

/*
 * The website's faces: Geist for text, Geist Mono for form codes, dates and amounts,
 * Montserrat SemiBold for the "Tallo CPA" wordmark. site.css points BoardUI's
 * --font-sans and --font-mono at them; the app keeps Inter, which the website never loads.
 *
 * Each is one small file, subset to what the site sets and preloaded, so the first
 * paint does not wait on a font found late in the stylesheet (with Google's split
 * subsets, the peso sign alone pulled a second Latin Extended file per face).
 * Sources: Geist and Geist Mono variable fonts from the `geist` package (1.9.2),
 * Montserrat 600 from Google Fonts; all under the SIL Open Font License
 * (fonts/LICENSE-*.txt). Made with fontTools:
 *   Geist       pyftsubset Geist-Variable.woff2 --unicodes="U+0020-007E,U+00A0-00FF,U+0131,
 *               U+0152-0153,U+02C6,U+02DA,U+02DC,U+2010-2027,U+2030-203A,U+20AC,U+20B1,U+2122,
 *               U+2190-2193,U+2212" --layout-features="kern,liga,calt,tnum,ccmp,locl,mark,mkmk"
 *   Geist Mono  pyftsubset GeistMono-Variable.woff2 --unicodes="U+0020-007E,U+00A0,U+00B0,
 *               U+00B1,U+00B7,U+00D7,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2026,U+2212,
 *               U+20B1" --layout-features="kern,liga,calt,tnum"
 *   (both with --name-IDs="*" --flavor=woff2, then narrowed to the weights the site
 *    sets: fonttools varLib.instancer <file> wght=400:600)
 *   Montserrat  pyftsubset <Montserrat 600 latin> --text="Tallo CPA" --layout-features=kern
 * A character outside a subset falls back (Geist's size-matched fallback, the system
 * monospace, or Geist for the wordmark face); a weight above 600 is synthesised.
 */
const geist = localFont({ src: "./fonts/geist-site.woff2", weight: "400 600", variable: "--font-geist", display: "swap" });
/* Mono falls back to the system monospace in --font-mono, not to a re-metred Arial. */
const geistMono = localFont({ src: "./fonts/geist-mono-site.woff2", weight: "400 600", variable: "--font-geist-mono", display: "swap", adjustFontFallback: false });
const montserrat = localFont({ src: "./fonts/montserrat-600-wordmark.woff2", weight: "600", variable: "--font-montserrat", display: "swap" });

/**
 * The website's whole document: <html> with its fonts, the dark-mode pre-paint script,
 * and the header, main and footer around the page. The public website is a root layout
 * of its own ((site)/layout.tsx), so it ships only this stylesheet, these fonts and its
 * own scripts, not the app's (src/app/(platform)/layout.tsx). The global 404
 * (src/app/global-not-found.tsx) renders it too.
 */
export async function SiteDocument({ children }: { children: ReactNode }) {
  const brand = await getSiteBrand();
  return (
    <html lang="en-PH" suppressHydrationWarning className={cx(geist.variable, geistMono.variable, montserrat.variable, "h-full antialiased")}>
      <head>
        {/* Dark mode follows the device (or a saved choice) before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="site flex min-h-full flex-col bg-background-full text-text-primary">
        <SiteChrome brand={brand}>{children}</SiteChrome>
      </body>
    </html>
  );
}
