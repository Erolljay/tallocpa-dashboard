import { RiAddLine } from "@remixicon/react";
import { H2, PageIntro, QuoteBand, Section, TextLink } from "@/components/site/blocks";
import { getSiteBrand } from "@/lib/site/brand";
import { FAQ_GROUPS } from "@/lib/site/content";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata = pageMetadata({
  title: "BIR Filing Deadlines and Onboarding FAQ | Tallo CPA",
  description: "Answers on BIR filing deadlines (withholding, VAT, percentage tax, income tax, alphalists) and on how working with a CPA firm begins.",
  path: "/faq",
});

export default async function FaqPage() {
  const brand = await getSiteBrand();
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />
      <PageIntro
        title="BIR deadlines and onboarding: questions"
        lede="Answers on BIR filing deadlines and on how working with us begins. General information, not advice for your particular case."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />
      {FAQ_GROUPS.map((group, gi) => {
        const id = `faq-${gi}`;
        return (
          <Section key={group.title} labelledBy={id}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="flex flex-col gap-4 lg:col-span-4">
                <h2 id={id} className={H2}>
                  {group.title}
                </h2>
                {gi === 0 && (
                  <p className="text-body-regular text-text-secondary">
                    Every due date on one page: <TextLink href="/bir-filing-calendar">the BIR filing calendar</TextLink>.
                  </p>
                )}
              </div>
              <div className="border-t border-separator-border lg:col-span-8">
                {group.items.map((f) => (
                  <details key={f.q} className="group border-b border-separator-border">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-lg py-4 text-headline-semibold text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring active:text-text-secondary [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <RiAddLine className="mt-0.5 size-5 shrink-0 text-foreground-icon-secondary transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" aria-hidden />
                    </summary>
                    <div className="flex max-w-2xl flex-col gap-3 pb-5 text-body-regular text-text-secondary">
                      {f.a.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </Section>
        );
      })}
      <QuoteBand brand={brand} />
    </>
  );
}
