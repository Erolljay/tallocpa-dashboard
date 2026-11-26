import Link from "next/link";
import { ButtonLink } from "@/components/base/buttons/button";
import { H1, QuoteBand, Section, SectionHeading } from "@/components/site/blocks";
import { Container } from "@/components/site/chrome";
import { CtaLink } from "@/components/site/cta-link";
import { getSiteBrand, quoteTarget } from "@/lib/site/brand";
import { PRACTITIONER } from "@/lib/site/config";
import { CLIENT_MONTH, FILING_RHYTHM, SERVICES } from "@/lib/site/content";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata = pageMetadata({
  title: null,
  description:
    "Bookkeeping, BIR tax compliance, audit and accounting outsourcing for Philippine businesses, from a CPA firm in public practice. Get an instant quote.",
  path: "/",
});

export default async function HomePage() {
  const brand = await getSiteBrand();
  const quote = quoteTarget(brand);
  return (
    <>
      {/* Hero, Stage: the promise and the action on the left, the BIR year itself on the right. */}
      <section aria-labelledby="hero">
        <Container className="grid min-h-[calc(100svh-4.5rem)] grid-cols-1 content-center gap-12 py-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] lg:items-center lg:gap-12 xl:gap-16 lg:py-10">
          <div className="flex min-w-0 flex-col gap-6">
            <h1 id="hero" className={H1}>
              Clear numbers. Clean compliance.
            </h1>
            <p className="max-w-[34ch] text-title-3-regular text-text-secondary">Bookkeeping, BIR filings and audit for businesses across the Philippines.</p>
            <div className="flex flex-wrap gap-3">
              <CtaLink href={quote.href} className="h-12 px-5">
                {quote.toFunnel ? "Get a quote" : "Ask for a quote"}
              </CtaLink>
              <ButtonLink href="/services" variant="secondary" className="h-12 px-5">
                See the services
              </ButtonLink>
            </div>
          </div>
          <FilingYear />
        </Container>
      </section>

      {/* Index: the seven services, the name doing the work. */}
      <Section labelledBy="services">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <SectionHeading id="services" title="What we do" className="lg:col-span-4" />
          <ol className="flex flex-col border-t border-separator-border lg:col-span-8">
            {SERVICES.map((s, i) => (
              <li key={s.slug} className="border-b border-separator-border">
                <Link
                  href={`/services/${s.slug}`}
                  className="group grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 gap-y-1 rounded-lg py-5 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring active:opacity-80 sm:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline"
                >
                  <span className="text-body-medium text-text-secondary tabular-nums">{i + 1}</span>
                  <span className="text-title-2-semibold text-text-primary underline-offset-4 group-hover:underline">{s.name}</span>
                  <span className="col-start-2 text-body-regular text-text-secondary sm:col-start-3">{s.short}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Statement: the practitioner, one sentence at the section's size. */}
      <Section labelledBy="practitioner">
        <div className="flex max-w-5xl flex-col gap-8">
          <h2 id="practitioner" className="min-w-0 [overflow-wrap:break-word] text-display-4-medium text-text-primary md:text-display-3-medium lg:text-display-2-medium">
            {PRACTITIONER} is a CPA in public practice, and serves the courts as receiver and liquidator for businesses under rehabilitation.
          </h2>
          <div>
            <ButtonLink href="/about" variant="secondary" className="h-12 px-5">
              About the firm
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Table: a client's month, both sides of it. */}
      <Section labelledBy="month">
        <SectionHeading id="month" title="Your month with us" lede="All of it happens in your client portal." />
        <div className="mt-12">
          <div aria-hidden className="grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,4fr)] gap-8 border-b border-separator-border pb-3 text-body-2-medium text-text-secondary max-md:hidden md:grid">
            <span>When</span>
            <span>You</span>
            <span>We</span>
          </div>
          <ul>
            {CLIENT_MONTH.map((r) => (
              <li key={r.when} className="grid grid-cols-1 gap-3 border-b border-separator-border py-6 md:grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,4fr)] md:gap-8">
                <h3 className="text-title-2-semibold text-text-primary">{r.when}</h3>
                <p className="text-body-regular text-text-primary">
                  <span className="text-text-secondary md:sr-only">You: </span>
                  {r.you}
                </p>
                <p className="text-body-regular text-text-secondary">
                  <span className="md:sr-only">We: </span>
                  {r.we}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <QuoteBand brand={brand} />
    </>
  );
}

/** The hero's object: the BIR filing rhythm a registered business keeps, as a real schedule. */
function FilingYear() {
  return (
    <figure aria-label="BIR filing calendar for a registered business" className="min-w-0 rounded-3xl border border-border-button-default bg-background-primary-default p-5 shadow-xs sm:p-7">
      <div className="flex flex-col gap-6">
        {FILING_RHYTHM.map((group) => (
          <div key={group.cadence} className="flex flex-col gap-1">
            <p className="text-body-2-semibold text-text-primary">{group.cadence}</p>
            <ul className="flex flex-col divide-y divide-separator-border border-y border-separator-border">
              {group.rows.map((r) => (
                <li key={r.form} className="grid grid-cols-[minmax(0,6.5rem)_minmax(0,1fr)] gap-x-3 gap-y-0.5 py-2.5 sm:grid-cols-[6.5rem_minmax(0,1fr)_minmax(0,auto)] sm:items-baseline">
                  <span className="text-body-2-semibold text-text-primary tabular-nums">{r.form}</span>
                  <span className="text-body-2-regular text-text-secondary">{r.what}</span>
                  <span className="col-start-2 text-body-2-medium text-text-primary sm:col-start-3 sm:text-end">{r.due}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </figure>
  );
}
