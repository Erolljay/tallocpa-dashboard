import { ButtonLink } from "@/components/base/buttons/button";
import { H2, PageIntro, QuoteBand, Section } from "@/components/site/blocks";
import { getSiteBrand } from "@/lib/site/brand";
import { PRACTITIONER } from "@/lib/site/config";
import { pageMetadata } from "@/lib/site/metadata";
import { cx } from "@/utils/cx";

export const metadata = pageMetadata({
  title: "About Eroll Jay C. Tallo, CPA | Tallo CPA",
  description: `${PRACTITIONER} is a Philippine CPA in public practice, leading the firm's bookkeeping, BIR tax compliance, accounting and assurance work.`,
  path: "/about",
});

/** OWNER REVIEW: the practitioner's description. Add only facts you can support (BOA Code of Ethics on advertising). */
const HOW = [
  { title: "Clients", body: "Individuals, one person corporations, partnerships, corporations and non-stock organizations across the Philippines." },
  { title: "Fees", body: "From our fee schedule, confirmed in an engagement letter." },
  { title: "Working together", body: "Documents, approvals, filed returns, statements and payments, all in one client portal." },
];

export default async function AboutPage() {
  const brand = await getSiteBrand();
  const credentials = [
    brand.cpaLicenseNo && { label: "CPA licence no.", value: brand.cpaLicenseNo },
    brand.boaFirmAccreditationNo && { label: "BOA accreditation, firm", value: brand.boaFirmAccreditationNo },
    brand.boaIndividualAccreditationNo && { label: "BOA accreditation, individual", value: brand.boaIndividualAccreditationNo },
    brand.birTaxAgentAccreditationNo && { label: "BIR tax agent accreditation", value: brand.birTaxAgentAccreditationNo },
  ].filter((c): c is { label: string; value: string } => Boolean(c));

  return (
    <>
      <PageIntro
        title="About the firm"
        lede={`${brand.displayName} is the accounting practice of ${PRACTITIONER}, a Philippine CPA in public practice.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* Statement: who the practitioner is, one sentence; the registration numbers beside it when set. */}
      <Section labelledBy="practitioner">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-8 lg:col-span-8">
            <h2 id="practitioner" className="min-w-0 [overflow-wrap:break-word] text-display-4-medium text-text-primary md:text-display-3-medium lg:text-display-2-medium">
              A Certified Public Accountant in public practice in the Philippines, leading every engagement the firm takes on.
            </h2>
            <div>
              <ButtonLink href="/how-we-work" variant="secondary" className="h-12 px-5">
                How we work
              </ButtonLink>
            </div>
          </div>
          {credentials.length > 0 && (
            <aside aria-labelledby="credentials" className="lg:col-span-3 lg:col-start-10 lg:self-end">
              <h3 id="credentials" className="text-title-3-semibold text-text-primary">
                Registration
              </h3>
              <dl className="mt-3 flex flex-col border-t border-separator-border">
                {credentials.map((c) => (
                  <div key={c.label} className="flex flex-col gap-0.5 border-b border-separator-border py-3">
                    <dt className="text-body-2-regular text-text-secondary">{c.label}</dt>
                    <dd className="text-body-medium text-text-primary tabular-nums">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}
        </div>
      </Section>

      {/* Rows: how the firm works, three plain facts. */}
      <Section labelledBy="how">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <h2 id="how" className={cx(H2, "lg:col-span-4")}>
            How the firm works
          </h2>
          <dl className="flex flex-col border-t border-separator-border lg:col-span-8">
            {HOW.map((h) => (
              <div key={h.title} className="grid grid-cols-1 gap-2 border-b border-separator-border py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] md:gap-8">
                <dt className="text-title-2-semibold text-text-primary">{h.title}</dt>
                <dd className="text-body-regular text-text-secondary">{h.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
      <QuoteBand brand={brand} />
    </>
  );
}
