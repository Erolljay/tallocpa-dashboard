import Link from "next/link";
import { PageIntro, QuoteBand, Section } from "@/components/site/blocks";
import { getSiteBrand } from "@/lib/site/brand";
import { SERVICES } from "@/lib/site/content";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description: "Bookkeeping, BIR tax compliance, accounting outsourcing, audit, CAS implementation, agreed-upon procedures, and corporate rehabilitation and liquidation.",
  path: "/services",
});

export default async function ServicesPage() {
  const brand = await getSiteBrand();
  return (
    <>
      <PageIntro title="Services" lede="Accounting, tax and assurance work for Philippine businesses, each scoped and quoted on its own." />
      <Section labelledBy="service-list">
        <h2 id="service-list" className="sr-only">
          All services
        </h2>
        <ol className="flex flex-col">
          {SERVICES.map((s, i) => (
            <li key={s.slug} className="border-b border-separator-border first:border-t">
              <Link
                href={`/services/${s.slug}`}
                className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 rounded-lg py-6 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring active:opacity-80 md:grid-cols-[3rem_minmax(0,5fr)_minmax(0,7fr)] md:gap-x-8"
              >
                <span className="text-title-2-medium text-text-secondary tabular-nums" aria-hidden>
                  {i + 1}
                </span>
                <span className="text-title-2-semibold text-text-primary group-hover:underline group-hover:underline-offset-4">{s.name}</span>
                <span className="col-start-2 text-body-regular text-text-secondary md:col-start-3">{s.short}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>
      <QuoteBand brand={brand} />
    </>
  );
}
