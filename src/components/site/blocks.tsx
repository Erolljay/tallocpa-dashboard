import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumb, BreadcrumbItem } from "@/components/base/breadcrumb/breadcrumb";
import { quoteTarget, type SiteBrand } from "@/lib/site/brand";
import { cx } from "@/utils/cx";
import { Container } from "./chrome";
import { CtaLink } from "./cta-link";
import { JsonLd } from "./json-ld";
import { breadcrumbLd } from "@/lib/site/structured-data";

import { QUOTE_LABEL } from "@/lib/site/config";
export { QUOTE_LABEL };

/** Display heads: one weight, one colour, and they may break inside long words on a phone. */
export const H1 = "min-w-0 text-balance [overflow-wrap:break-word] text-display-3-semibold text-text-primary md:text-display-1-semibold lg:text-large-title-semibold";
/** A section head on the navy band. */
export const H2_ON_NAVY = "min-w-0 text-balance [overflow-wrap:break-word] text-display-4-semibold text-text-white md:text-display-3-semibold lg:text-display-2-semibold";
export const H2 = "min-w-0 text-balance [overflow-wrap:break-word] text-display-4-semibold text-text-primary md:text-display-3-semibold lg:text-display-2-semibold";

export type Crumb = { name: string; path: string };

/** The visible trail (BoardUI Breadcrumb) and its BreadcrumbList, home first, the current page last. */
export function Crumbs({ trail, onNavy = false }: { trail: Crumb[]; onNavy?: boolean }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(trail)} />
      <Breadcrumb className="-ms-1">
        {trail.map((c, i) =>
          i === trail.length - 1 ? (
            <BreadcrumbItem key={c.path} current className={cx(onNavy && "text-accent-200")}>
              {c.name}
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={c.path} href={c.path} className={onNavy ? "text-accent-200 hover:bg-transparent hover:text-text-white" : "text-text-secondary hover:text-text-primary"}>
              {c.name}
            </BreadcrumbItem>
          ),
        )}
      </Breadcrumb>
    </>
  );
}

/** Top of an inner page (Banner posture): breadcrumbs, the heading, one sentence, optionally one action. */
export function PageIntro({ title, lede, children, aside, crumbs, navy = true }: { title: string; lede: string; children?: ReactNode; aside?: ReactNode; crumbs?: Crumb[]; navy?: boolean }) {
  return (
    <section className={cx(navy ? "site-navy site-grid" : "border-b border-separator-border")}>
      <Container className="grid grid-cols-1 gap-10 py-12 md:py-24 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-8">
          {crumbs && <Crumbs trail={crumbs} onNavy={navy} />}
          <h1 className={cx(H1, navy && "text-text-white")}>{title}</h1>
          <p className={cx("max-w-[52ch] text-title-3-regular", navy ? "text-accent-200" : "text-text-secondary")}>{lede}</p>
          {children}
        </div>
        {aside && <div className="min-w-0 lg:col-span-4 lg:self-end">{aside}</div>}
      </Container>
    </section>
  );
}

/** A section: the outer element owns the hairline seam and the block padding, the container the width. */
export function Section({
  children,
  className,
  id,
  labelledBy,
  tone = "plain",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  /** plain: the page ground; wash: a faint blue tint; navy: the brand gradient band (use light text inside). */
  tone?: "plain" | "wash" | "navy";
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx("scroll-mt-20", tone === "plain" && "border-t border-separator-border", tone === "wash" && "site-wash", tone === "navy" && "site-navy site-grid")}
    >
      <Container className={cx("py-16 md:py-24", className)}>{children}</Container>
    </section>
  );
}

export function SectionHeading({ id, title, lede, className }: { id: string; title: string; lede?: string; className?: string }) {
  return (
    <div className={cx("flex max-w-2xl flex-col gap-4", className)}>
      <h2 id={id} className={H2}>
        {title}
      </h2>
      {lede && <p className="max-w-[48ch] text-title-3-regular text-text-secondary">{lede}</p>}
    </div>
  );
}

/** The close on each page: the quote, on the brand navy. */
export function QuoteBand({ brand, title = "Tell us about your business.", onContactPage = false }: { brand: SiteBrand; title?: string; onContactPage?: boolean }) {
  const quote = quoteTarget(brand, { onContactPage });
  const lede = quote.toFunnel
    ? "The quote form shows your fee right away."
    : "Write to us, and we reply with a quote.";
  return (
    <section aria-labelledby="quote-band" className="site-navy site-grid">
      <Container className="grid grid-cols-1 gap-8 py-16 md:py-24 lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col gap-4 lg:col-span-8">
          <h2 id="quote-band" className="min-w-0 [overflow-wrap:break-word] text-display-4-semibold text-text-white md:text-display-3-semibold lg:text-display-2-semibold">
            {title}
          </h2>
          <p className="max-w-[48ch] text-title-3-regular text-accent-200">{lede}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <CtaLink href={quote.href} className="h-12 px-5">
            {onContactPage && !quote.toFunnel ? "Email us for a quote" : QUOTE_LABEL}
          </CtaLink>
        </div>
      </Container>
    </section>
  );
}

export const textLink =
  "rounded-sm whitespace-nowrap text-button-ghost-foreground underline decoration-1 underline-offset-4 outline-none hover:decoration-2 active:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring";

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={textLink}>
      {children}
    </Link>
  );
}
