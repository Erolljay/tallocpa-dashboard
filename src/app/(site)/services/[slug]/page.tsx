import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ButtonLink } from "@/components/base/buttons/button";
import { H2, PageIntro, QuoteBand, Section } from "@/components/site/blocks";
import { CtaLink } from "@/components/site/cta-link";
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
  return pageMetadata({ title: service.name, description: service.intro, path: `/services/${service.slug}` });
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

  return (
    <>
      <PageIntro
        title={service.name}
        lede={service.summary}
      >
        <div className="flex flex-wrap gap-3">
          <CtaLink href={quote.href} className="h-12 px-5">
            {quote.toFunnel ? "Get a quote" : "Ask for a quote"}
          </CtaLink>
          <ButtonLink href="/services" variant="secondary" className="h-12 px-5">
            All services
          </ButtonLink>
        </div>
      </PageIntro>

      <Section labelledBy="scope">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <h2 id="scope" className={H2}>
              What it covers
            </h2>
            <div className="flex flex-col gap-3 border-t-2 border-accent-500 pt-5 lg:max-w-sm">
              <h3 className="text-title-3-semibold text-text-primary">To start, we need</h3>
              <ol className="flex list-decimal flex-col gap-2 ps-5 text-body-regular text-text-secondary marker:text-text-secondary">
                {service.start.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          </div>
          <ul className="flex flex-col border-t border-separator-border lg:col-span-7">
            {service.includes.map((item) => (
              <li key={item} className="border-b border-separator-border py-4 text-title-3-regular text-text-primary">
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
          </div>
        </div>
      </Section>

      <QuoteBand brand={brand} />
    </>
  );
}
