import Link from "next/link";
import { H2, PageIntro, QuoteBand, Section } from "@/components/site/blocks";
import { getSiteBrand } from "@/lib/site/brand";
import { SERVICES, SERVICE_GROUPS, type ServiceGroup } from "@/lib/site/content";
import { pageMetadata } from "@/lib/site/metadata";

/* Primary search phrase: "accounting and tax services Philippines". */
export const metadata = pageMetadata({
  title: "Accounting and Tax Services, Philippines | Tallo CPA",
  description: "Accounting and tax services in the Philippines: bookkeeping, BIR tax compliance, accounting outsourcing, audit, CAS implementation and AUP.",
  path: "/services",
});

export default async function ServicesPage() {
  const brand = await getSiteBrand();
  return (
    <>
      <PageIntro
        title="Accounting and tax services"
        lede="Accounting and tax services for businesses across the Philippines, each scoped and quoted on its own."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <Section labelledBy="all-services">
        <h2 id="all-services" className={H2}>
          Six services, two kinds of work
        </h2>
        <div className="mt-12 flex flex-col gap-14">
          {(Object.keys(SERVICE_GROUPS) as ServiceGroup[]).map((g) => (
            <div key={g} className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
              <h3 className="text-title-1-semibold text-text-primary lg:col-span-4">{SERVICE_GROUPS[g]}</h3>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
                {SERVICES.filter((s) => s.group === g).map((s) => (
                  <li key={s.slug} className="border-t border-separator-border pt-4">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex flex-col gap-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring active:opacity-80"
                    >
                      <span className="text-title-3-semibold text-text-primary underline-offset-4 group-hover:underline">{s.h1}</span>
                      <span className="text-body-2-regular text-text-secondary">{s.short}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <QuoteBand brand={brand} />
    </>
  );
}
