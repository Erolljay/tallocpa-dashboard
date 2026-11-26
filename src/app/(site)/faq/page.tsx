import { RiAddLine } from "@remixicon/react";
import { H2, PageIntro, QuoteBand, Section } from "@/components/site/blocks";
import { cx } from "@/utils/cx";
import { getSiteBrand } from "@/lib/site/brand";
import { FAQ_GROUPS } from "@/lib/site/content";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata = pageMetadata({
  title: "Questions",
  description: "BIR filing deadlines for monthly withholding, quarterly VAT and percentage tax, annual income tax and information returns, and how onboarding works.",
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
      <PageIntro title="Questions" lede="BIR deadlines and how working with us begins. General information, not advice for your particular case." />
      {FAQ_GROUPS.map((group, gi) => {
        const id = `faq-${gi}`;
        return (
          <Section key={group.title} labelledBy={id}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <h2 id={id} className={cx(H2, "lg:col-span-4")}>
                {group.title}
              </h2>
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
