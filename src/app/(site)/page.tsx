import { RiCheckDoubleLine, RiFileList3Line, RiLoginBoxLine, RiSendPlaneLine, RiStackLine, RiUploadCloud2Line } from "@remixicon/react";
import Link from "next/link";
import { ButtonLink } from "@/components/base/buttons/button";
import { H1, H2_ON_NAVY, QUOTE_LABEL, QuoteBand, Section, SectionHeading } from "@/components/site/blocks";
import { Container } from "@/components/site/chrome";
import { CtaLink } from "@/components/site/cta-link";
import { FilingCalendar } from "@/components/site/filing-calendar";
import { PortalPreview } from "@/components/site/portal-preview";
import { getSiteBrand, quoteTarget } from "@/lib/site/brand";
import { PRACTITIONER, signInHref } from "@/lib/site/config";
import { PLATFORM_FLOW, SAFEGUARDS, SERVICES, SERVICE_GROUPS, type ServiceGroup } from "@/lib/site/content";
import { pageMetadata } from "@/lib/site/metadata";
import { cx } from "@/utils/cx";

/* Primary search phrase: "CPA Iloilo City". */
export const metadata = pageMetadata({
  title: "Tallo CPA | Accountant and CPA in Iloilo City",
  description:
    "A CPA firm in Iloilo City for bookkeeping, BIR tax compliance and audit, serving businesses nationwide. Approve returns and pay in one client portal.",
  path: "/",
});

const FLOW_ICONS = [RiUploadCloud2Line, RiStackLine, RiFileList3Line, RiCheckDoubleLine, RiSendPlaneLine];
const GROUP_SPAN: Record<ServiceGroup, string> = { accounting: "lg:col-span-8", assurance: "lg:col-span-4" };

export default async function HomePage() {
  const brand = await getSiteBrand();
  const quote = quoteTarget(brand);
  return (
    <>
      {/* Hero: the promise and the action, beside the product itself. */}
      <section aria-labelledby="hero" className="site-navy site-grid">
        <Container className="grid grid-cols-1 items-center gap-10 py-12 lg:min-h-[calc(100dvh-4.5rem)] lg:grid-cols-2 lg:gap-14 lg:py-12">
          <div className="flex min-w-0 flex-col gap-6">
            <h1 id="hero" className={cx(H1, "text-text-white lg:text-display-1-semibold")}>
              BIR compliance, in one portal.
            </h1>
            <p className="max-w-[40ch] text-title-3-regular text-accent-200">
              A CPA firm in Iloilo City, serving businesses across the Philippines, keeps your books and files your returns. You approve online.
            </p>
            <div className="flex flex-wrap gap-3">
              <CtaLink href={quote.href} className="h-12 px-5">
                {QUOTE_LABEL}
              </CtaLink>
              <ButtonLink href="#how" variant="secondary" className="h-12 px-5">
                How it works
              </ButtonLink>
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <div className="site-glow">
              <PortalPreview onNavy />
            </div>
            <a
              href={signInHref()}
              className="flex w-fit items-center gap-1.5 rounded-sm text-body-2-medium text-accent-200 underline decoration-1 underline-offset-4 outline-none hover:text-text-white active:text-text-white focus-visible:ring-2 focus-visible:ring-border-focus-ring"
            >
              <RiLoginBoxLine className="size-4" aria-hidden />
              Already a client? Log in to your portal
            </a>
          </div>
        </Container>
      </section>

      {/* Process: receipt to filed return, five verbs on one line. */}
      <Section id="how" labelledBy="how-title">
        <SectionHeading id="how-title" title="From receipt to filed return" />
        <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {PLATFORM_FLOW.map((step, i) => {
            const Icon = FLOW_ICONS[i];
            return (
              <li key={step.verb} className="flex flex-col gap-3 border-t-2 border-accent-500 pt-5">
                <span className="flex items-center gap-2">
                  <Icon className="size-5 text-button-ghost-foreground" aria-hidden />
                  <h3 className="text-title-3-semibold text-text-primary">{step.verb}</h3>
                </span>
                <p className="text-body-regular text-text-secondary">{step.body}</p>
              </li>
            );
          })}
        </ol>
        <div className="mt-10">
          <ButtonLink href="/how-we-work" variant="secondary" className="h-12 px-5">
            See each step in the portal
          </ButtonLink>
        </div>
      </Section>

      {/* Services, grouped by kind of work; the names are the links. */}
      <Section labelledBy="services" tone="wash">
        <SectionHeading id="services" title="Services" />
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {(Object.keys(SERVICE_GROUPS) as ServiceGroup[]).map((g) => (
            <div key={g} className={cx("flex flex-col gap-4", GROUP_SPAN[g])}>
              <h3 className="text-body-2-semibold text-text-secondary">{SERVICE_GROUPS[g]}</h3>
              <ul className={cx("grid grid-cols-1 gap-x-8 gap-y-6", g === "accounting" && "sm:grid-cols-2")}>
                {SERVICES.filter((s) => s.group === g).map((s) => (
                  <li key={s.slug} className="border-t border-separator-border pt-4 pb-2">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex flex-col gap-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring active:opacity-80"
                    >
                      <span className="text-title-3-semibold text-text-primary underline-offset-4 group-hover:underline">{s.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Data: the BIR year as a matrix, linked to the full guide. */}
      <Section labelledBy="calendar" tone="navy">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 id="calendar" className={H2_ON_NAVY}>
              The BIR year, by due day
            </h2>
            <p className="max-w-[56ch] text-title-3-regular text-accent-200">Common returns for a calendar-year business, and the day each is due.</p>
          </div>
          <FilingCalendar onNavy />
          <div>
            <ButtonLink href="/bir-filing-calendar" variant="secondary" className="h-12 px-5">
              Open the BIR filing calendar
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Safeguards: one panel, four facts. */}
      <Section labelledBy="safeguards">
        <SectionHeading id="safeguards" title="Your records, kept private" />
        <ul className="mt-12 grid grid-cols-1 divide-y divide-separator-border rounded-3xl border border-border-button-default sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {SAFEGUARDS.map((g, i) => (
            <li key={g.title} className={cx("flex flex-col gap-2 p-6", i < 2 && "sm:border-b sm:border-separator-border lg:border-b-0", i % 2 === 0 && "sm:max-lg:border-e sm:max-lg:border-separator-border")}>
              <h3 className="text-title-3-semibold text-text-primary">{g.title}</h3>
              <p className="text-body-2-regular text-text-secondary">{g.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Statement: the practitioner, one sentence at the section's size. */}
      <Section labelledBy="practitioner" tone="wash">
        <div className="flex max-w-5xl flex-col gap-8">
          <h2 id="practitioner" className="min-w-0 [overflow-wrap:break-word] text-display-4-medium text-text-primary md:text-display-3-medium lg:text-display-2-medium">
            {PRACTITIONER} is a Philippine CPA in public practice and leads every engagement the firm takes on.
          </h2>
          <div>
            <ButtonLink href="/about" variant="secondary" className="h-12 px-5">
              About the firm
            </ButtonLink>
          </div>
        </div>
      </Section>

      <QuoteBand brand={brand} />
    </>
  );
}
