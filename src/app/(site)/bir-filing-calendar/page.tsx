import { H2, PageIntro, QuoteBand, Section, TextLink } from "@/components/site/blocks";
import { FilingCalendar } from "@/components/site/filing-calendar";
import { getSiteBrand } from "@/lib/site/brand";
import { GROUPS, MONTHS, deadlinesIn, formsIn, type FormGroup } from "@/lib/site/calendar";
import { pageMetadata } from "@/lib/site/metadata";

/*
 * OWNER REVIEW: an evergreen guide to BIR deadlines, built from src/lib/site/calendar.ts
 * (the same data as the home page's calendar). Check it against current revenue
 * regulations before each filing season. Primary search phrase: "BIR filing calendar".
 */
export const metadata = pageMetadata({
  title: "BIR Filing Calendar: Tax Deadlines by Month | Tallo CPA",
  description:
    "BIR filing calendar for Philippine businesses: due dates for withholding, VAT, percentage tax, income tax and annual information returns, month by month.",
  path: "/bir-filing-calendar",
});

export default async function BirCalendarPage() {
  const brand = await getSiteBrand();
  const groups = Object.keys(GROUPS) as FormGroup[];
  return (
    <>
      <PageIntro
        title="BIR filing calendar"
        lede="The BIR tax deadlines a registered business files to, month by month, for a calendar-year taxpayer."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "BIR filing calendar", path: "/bir-filing-calendar" },
        ]}
      />

      <Section labelledBy="year">
        <div className="flex flex-col gap-8">
          <h2 id="year" className={H2}>
            The year at a glance
          </h2>
          <FilingCalendar detailed />
          <p className="max-w-[68ch] text-body-regular text-text-secondary">
            Dates on a weekend or holiday move to the next working day, and the BIR sometimes extends them. eFPS filers file
            withholding returns on staggered dates, the 11th to the 15th.
          </p>
        </div>
      </Section>

      <Section labelledBy="months">
        <h2 id="months" className={H2}>
          Month by month
        </h2>
        <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {MONTHS.map((m, i) => (
            <li key={m} className="flex flex-col gap-2 border-t border-separator-border pt-3">
              <h3 className="text-title-3-semibold text-text-primary">{m}</h3>
              <ul className="flex flex-col gap-1">
                {deadlinesIn(i + 1).map((d) => (
                  <li key={d.form.code} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2 text-body-2-regular text-text-secondary">
                    <span className="figure text-text-primary">{d.day}</span>
                    <span className="figure">{d.form.code}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[68ch] text-body-regular text-text-secondary">
          More in the <TextLink href="/faq">BIR deadlines FAQ</TextLink>, and how our <TextLink href="/services/tax-compliance">BIR tax compliance services</TextLink> keep these dates for you.
        </p>
      </Section>

      <Section labelledBy="who">
        <h2 id="who" className={H2}>
          Who files which return
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g} className="flex flex-col gap-3">
              <h3 className="text-title-2-semibold text-text-primary">{GROUPS[g].title}</h3>
              <dl className="flex flex-col divide-y divide-separator-border">
                {formsIn(g).map((f) => (
                  <div key={f.code} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-3">
                    <dt className="figure text-body-semibold text-text-primary">{f.code}</dt>
                    <dd className="flex flex-col">
                      <span className="text-body-2-medium text-text-primary">{f.name}</span>
                      <span className="text-body-2-regular text-text-secondary">{f.who}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Section>

      <QuoteBand brand={brand} />
    </>
  );
}
