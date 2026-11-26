import { RiCloseLine, RiFacebookCircleFill, RiLoginBoxLine, RiMenuLine } from "@remixicon/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/base/buttons/button";
import { Lockup } from "@/components/brand/lockup";
import { phoneLinks, quoteTarget, type SiteBrand } from "@/lib/site/brand";
import { QUOTE_LABEL, signInHref } from "@/lib/site/config";
import { SERVICES } from "@/lib/site/content";
import { firmGraph } from "@/lib/site/structured-data";
import { cx } from "@/utils/cx";
import { AttributionKeeper } from "./attribution-keeper";
import { CtaLink } from "./cta-link";
import { JsonLd } from "./json-ld";
import { MobileMenu } from "./mobile-menu";

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/bir-filing-calendar", label: "BIR calendar" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const LINK = "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring active:text-text-primary";

/** The page measure: one container width across the site, centred, gutters grow past it. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function SiteHeader({ brand }: { brand: SiteBrand }) {
  const quote = quoteTarget(brand);
  return (
    <header className="sticky top-0 z-30 border-b border-separator-border bg-background-full">
      <Container className="relative flex h-18 items-center justify-between gap-4">
        <Link href="/" aria-label={`${brand.displayName}, home`} className={cx(LINK, "min-w-0")}>
          <Lockup taglineClassName="text-text-secondary max-sm:hidden lg:max-xl:hidden" />
        </Link>
        <nav aria-label="Site" className="max-lg:hidden">
          <ul className="flex items-center gap-0.5">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={cx(LINK, "flex h-11 items-center rounded-lg px-3 text-body-medium text-text-secondary hover:bg-background-secondary-default hover:text-text-primary active:bg-background-secondary-hover")}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href={signInHref()} variant="secondary" leadingIcon={RiLoginBoxLine} className="h-11 px-3 max-lg:hidden">
            Client log-in
          </ButtonLink>
          <CtaLink href={quote.href} className="h-11 px-4 max-lg:hidden">
            {QUOTE_LABEL}
          </CtaLink>
          <MobileMenu openIcon={<RiMenuLine className="size-6" aria-hidden />} closeIcon={<RiCloseLine className="size-6" aria-hidden />}>
            <nav aria-label="Site">
              <ul className="flex flex-col">
                {NAV.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="flex min-h-12 items-center rounded-xl px-2 text-headline-medium text-text-primary outline-none hover:bg-background-secondary-default active:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">
              <ButtonLink href={signInHref()} variant="secondary" leadingIcon={RiLoginBoxLine} className="h-12 w-full">
                Client log-in
              </ButtonLink>
              <CtaLink href={quote.href} className="h-12 w-full">
                {QUOTE_LABEL}
              </CtaLink>
            </div>
          </MobileMenu>
        </div>
      </Container>
    </header>
  );
}

export function SiteFooter({ brand }: { brand: SiteBrand }) {
  const phones = phoneLinks(brand.phone);
  const sameAddress =
    brand.businessAddress && brand.registeredAddress && brand.businessAddress.toLowerCase() === brand.registeredAddress.toLowerCase();
  const credentials = [
    brand.cpaLicenseNo && `CPA licence no. ${brand.cpaLicenseNo}`,
    brand.boaFirmAccreditationNo && `BOA firm accreditation no. ${brand.boaFirmAccreditationNo}`,
    brand.boaIndividualAccreditationNo && `BOA accreditation no. ${brand.boaIndividualAccreditationNo}`,
    brand.birTaxAgentAccreditationNo && `BIR tax agent accreditation no. ${brand.birTaxAgentAccreditationNo}`,
  ].filter((c): c is string => Boolean(c));

  return (
    <footer className="mt-auto border-t border-separator-border bg-background-full">
      <Container className="grid grid-cols-1 gap-10 py-12 md:grid-cols-12">
        <div className="flex flex-col gap-4 md:col-span-5">
          <Lockup taglineClassName="text-text-secondary" />
          <div className="flex flex-col gap-1 text-body-2-regular text-text-secondary">
            {brand.legalName && <p className="text-body-2-medium text-text-primary">{brand.legalName}</p>}
            <p>A CPA firm in Iloilo City, serving clients across the Philippines.</p>
            {brand.businessAddress && <address className="not-italic">{brand.businessAddress}</address>}
            {brand.registeredAddress && !sameAddress && (
              <address className="not-italic">Registered address: {brand.registeredAddress}</address>
            )}
            {phones.map((p) => (
              <a key={p.href} href={p.href} className={cx(LINK, "w-fit hover:text-text-primary")}>
                {p.label}
              </a>
            ))}
            {brand.email && (
              <a href={`mailto:${brand.email}`} dir="ltr" className={cx(LINK, "w-fit hover:text-text-primary")}>
                {brand.email}
              </a>
            )}
            {brand.facebookUrl && (
              <a href={brand.facebookUrl} rel="noopener" target="_blank" className={cx(LINK, "mt-2 flex w-fit items-center gap-1.5 hover:text-text-primary")}>
                <RiFacebookCircleFill className="size-5 text-foreground-icon-secondary" aria-hidden />
                Facebook page
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Services" className="md:col-span-4">
          <p className="text-body-2-semibold text-text-primary">Services</p>
          <ul className="mt-2 flex flex-col text-body-2-regular text-text-secondary">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={cx(LINK, "inline-flex min-h-8 items-center hover:text-text-primary")}>
                  {s.shortName ?? s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Firm" className="md:col-span-3">
          <p className="text-body-2-semibold text-text-primary">Firm</p>
          <ul className="mt-2 flex flex-col text-body-2-regular text-text-secondary">
            {[...NAV, { href: "/about", label: "About" }, { href: "/privacy", label: "Privacy notice" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={cx(LINK, "inline-flex min-h-8 items-center hover:text-text-primary")}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={signInHref()} className={cx(LINK, "inline-flex min-h-8 items-center hover:text-text-primary")}>
                Client and staff sign-in
              </a>
            </li>
          </ul>
        </nav>
      </Container>
      <Container className="flex flex-col gap-1 border-t border-separator-border py-6 text-caption-1-regular text-text-secondary">
        {credentials.length > 0 && (
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
        <p>© {brand.legalName ?? brand.displayName}</p>
      </Container>
    </footer>
  );
}

/**
 * The website's frame inside <body>: the skip link, header, main, footer, the firm's
 * structured data and the attribution keeper. Shared by the (site) root layout and
 * the global 404 (src/app/global-not-found.tsx), which renders without a layout.
 */
export function SiteChrome({ brand, children }: { brand: SiteBrand; children: ReactNode }) {
  return (
    <>
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
    </>
  );
}
