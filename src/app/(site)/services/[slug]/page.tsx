import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { H2, PageIntro, QUOTE_LABEL, Section, TextLink } from "@/components/site/blocks";
import { JsonLd } from "@/components/site/json-ld";
import { serviceLd } from "@/lib/site/structured-data";
import { IntakePicker } from "@/components/site/intake-picker";
import type { PickerService } from "@/lib/site/intake";

const PICKER_SERVICE: Record<string, PickerService> = { "tax-compliance": "tax_compliance", bookkeeping: "bookkeeping" };
import { ButtonLink } from "@/components/base/buttons/button";
import { getSiteBrand, quoteTarget } from "@/lib/site/brand";
import { SERVICES, serviceBySlug } from "@/lib/site/content";
import { pageMetadata } from "@/lib/site/metadata";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seoTitle, description: service.metaDescription, path: `/services/${service.slug}` });
}

/* params are URL data: the page streams behind a quiet placeholder (every slug is prerendered at build). */
export default function ServicePage(props: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
      <Service params={props.params} />
    </Suspense>
  );
}

async function Service({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  const brand = await getSiteBrand();
  const quote = quoteTarget(brand);
  const related = service.related.map(serviceBySlug).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      <JsonLd data={serviceLd(service)} />
      <PageIntro
        title={service.h1}
        lede={service.opening}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      >
        <div>
          <ButtonLink href="#tell-us" className="h-12 px-5">
            {QUOTE_LABEL}
          </ButtonLink>
        </div>
      </PageIntro>

      <Section labelledBy="scope">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <h2 id="scope" className={H2}>
              What it covers
            </h2>
          </div>
          <ul className="flex flex-col divide-y divide-separator-border lg:col-span-7">
            {service.includes.map((item) => (
              <li key={item} className="py-4 text-title-3-regular text-text-primary first:pt-0">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="who">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <h2 id="who" className="text-title-2-semibold text-text-secondary lg:col-span-3">
            Who engages it
          </h2>
          <div className="flex flex-col gap-6 lg:col-span-9">
            <p className="min-w-0 [overflow-wrap:break-word] text-display-4-medium text-text-primary md:text-display-3-medium">{service.forWhom}</p>
            {service.notes?.map((n) => (
              <p key={n} className="max-w-[60ch] text-body-regular text-text-secondary">
                {n}
              </p>
            ))}
            {(service.slug === "tax-compliance" || service.slug === "bookkeeping") && (
              <p className="max-w-[60ch] text-body-regular text-text-secondary">
                See each step of the month in the portal: <TextLink href="/how-we-work">how we work</TextLink>.
              </p>
            )}
            {service.slug === "tax-compliance" && (
              <p className="max-w-[60ch] text-body-regular text-text-secondary">
                See every due date in the <TextLink href="/bir-filing-calendar">BIR filing calendar</TextLink>.
              </p>
            )}
          </div>
        </div>
      </Section>

      <Section id="tell-us" labelledBy="intake" tone="wash">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <h2 id="intake" className={H2}>
              Tell us about your business
            </h2>
            <p className="max-w-[44ch] text-body-regular text-text-secondary">Pick what your Certificate of Registration shows. The quote form starts from your answers.</p>
          </div>
          <div className="lg:col-span-7">
            <IntakePicker service={PICKER_SERVICE[service.slug] ?? null} toFunnel={quote.toFunnel} fallbackHref={quote.href} />
          </div>
        </div>
      </Section>

      <Section labelledBy="related">
        <h2 id="related" className="text-title-1-semibold text-text-primary">
          Related services
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug} className="border-t border-separator-border pt-4">
              <Link
                href={`/services/${r.slug}`}
                className="group flex flex-col gap-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring active:opacity-80"
              >
                <span className="text-title-3-semibold text-text-primary underline-offset-4 group-hover:underline">{r.h1}</span>
                <span className="text-body-2-regular text-text-secondary">{r.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

    </>
  );
}
