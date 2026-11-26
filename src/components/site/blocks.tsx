import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/base/buttons/button";
import { quoteTarget, type SiteBrand } from "@/lib/site/brand";
import { cx } from "@/utils/cx";
import { Container } from "./chrome";
import { CtaLink } from "./cta-link";

/** Display heads: one weight, one colour, and they may break inside long words on a phone. */
export const H1 = "min-w-0 [overflow-wrap:break-word] text-display-3-semibold text-text-primary md:text-display-1-semibold lg:text-large-title-semibold";
export const H2 = "min-w-0 [overflow-wrap:break-word] text-display-4-semibold text-text-primary md:text-display-3-semibold lg:text-display-2-semibold";

/** Top of an inner page (Banner posture): the heading, one sentence, optionally one action; content shows above the fold. */
export function PageIntro({ title, lede, children, aside }: { title: string; lede: string; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="border-b border-separator-border">
      <Container className="grid grid-cols-1 gap-10 py-12 md:py-20 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-7">
          <h1 className={H1}>{title}</h1>
          <p className="max-w-[52ch] text-title-3-regular text-text-secondary">{lede}</p>
          {children}
        </div>
        {aside && <div className="min-w-0 lg:col-span-5 lg:self-end">{aside}</div>}
      </Container>
    </section>
  );
}

/** A section: the outer element owns the hairline seam and the block padding, the container the width. */
export function Section({ children, className, id, labelledBy, seam = true }: { children: ReactNode; className?: string; id?: string; labelledBy?: string; seam?: boolean }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx("scroll-mt-20", seam && "border-t border-separator-border first:border-t-0")}>
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
    <section aria-labelledby="quote-band" className="bg-accent-950">
      <Container className="grid grid-cols-1 gap-8 py-16 md:py-24 lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col gap-4 lg:col-span-8">
          <h2 id="quote-band" className="min-w-0 [overflow-wrap:break-word] text-display-4-semibold text-text-white md:text-display-3-semibold lg:text-display-2-semibold">
            {title}
          </h2>
          <p className="max-w-[48ch] text-title-3-regular text-accent-200">{lede}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <CtaLink href={quote.href} className="h-12 px-5">
            {quote.toFunnel ? "Get a quote" : "Ask for a quote"}
          </CtaLink>
          {!onContactPage && (
            <ButtonLink href="/contact" variant="secondary" className="h-12 px-5">
              Contact us
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}

export const textLink =
  "rounded-sm text-button-ghost-foreground underline decoration-1 underline-offset-4 outline-none hover:decoration-2 active:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring";

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={textLink}>
      {children}
    </Link>
  );
}
