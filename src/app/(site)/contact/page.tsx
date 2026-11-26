import { RiFacebookCircleFill, RiMailLine, RiMapPinLine, RiPhoneLine } from "@remixicon/react";
import type { RemixiconComponentType } from "@remixicon/react";
import type { ReactNode } from "react";
import { H2, PageIntro, Section } from "@/components/site/blocks";
import { CtaLink } from "@/components/site/cta-link";
import { phoneLinks, quoteTarget, type SiteBrand, getSiteBrand } from "@/lib/site/brand";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: "How to reach Tallo CPA, and how to request a quote for bookkeeping, BIR compliance, audit and other services.",
  path: "/contact",
});

/** No form here on purpose: the quote form at /start is the one way a lead is captured. */
export default async function ContactPage() {
  const brand = await getSiteBrand();
  const quote = quoteTarget(brand, { onContactPage: true });
  return (
    <>
      <PageIntro
        title="Contact"
        lede={
          quote.toFunnel
            ? "The quote form is the quickest start: it shows your fee and sends us your details."
            : "Write or call with your registration type and what you need. We reply with a quote."
        }
      >
        {(quote.toFunnel || brand.email) && (
          <div>
            <CtaLink href={quote.href} className="h-12 px-5">
              {quote.toFunnel ? "Get a quote" : "Email us for a quote"}
            </CtaLink>
          </div>
        )}
      </PageIntro>
      <Section id="reach-us" labelledBy="reach">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <h2 id="reach" className={H2}>
              Reach us
            </h2>
            <ContactList brand={brand} />
          </div>
          <div className="flex flex-col gap-5 lg:col-span-6 lg:col-start-7">
            <h2 className="text-title-1-semibold text-text-primary">What to tell us</h2>
            <ol className="flex flex-col border-t border-separator-border">
              {BRING.map((b, i) => (
                <li key={b.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 gap-y-1 border-b border-separator-border py-5">
                  <span className="text-body-medium text-text-secondary tabular-nums">{i + 1}</span>
                  <h3 className="text-title-3-semibold text-text-primary">{b.title}</h3>
                  <p className="col-start-2 text-body-regular text-text-secondary">{b.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </>
  );
}

const BRING = [
  { title: "How you are registered", body: "Your Certificate of Registration (Form 2303) shows it." },
  { title: "What you need", body: "Monthly books and returns, an audit, or catching up." },
  { title: "How busy the books are", body: "Documents a month, employees, branches." },
];

function ContactList({ brand }: { brand: SiteBrand }) {
  const phones = phoneLinks(brand.phone);
  const sameAddress =
    brand.businessAddress && brand.registeredAddress && brand.businessAddress.toLowerCase() === brand.registeredAddress.toLowerCase();
  const rows: { icon: RemixiconComponentType; label: string; body: ReactNode }[] = [];
  if (brand.email)
    rows.push({ icon: RiMailLine, label: "Email", body: <a className={LINK} dir="ltr" href={`mailto:${brand.email}`}>{brand.email}</a> });
  if (phones.length)
    rows.push({
      icon: RiPhoneLine,
      label: phones.length > 1 ? "Phone numbers" : "Phone",
      body: (
        <span className="flex flex-col gap-1">
          {phones.map((p) => (
            <a key={p.href} className={LINK} href={p.href}>
              {p.label}
            </a>
          ))}
        </span>
      ),
    });
  if (brand.businessAddress) rows.push({ icon: RiMapPinLine, label: "Office", body: <address className="not-italic">{brand.businessAddress}</address> });
  if (brand.registeredAddress && !sameAddress)
    rows.push({ icon: RiMapPinLine, label: "Registered address", body: <address className="not-italic">{brand.registeredAddress}</address> });
  if (brand.facebookUrl)
    rows.push({ icon: RiFacebookCircleFill, label: "Facebook", body: <a className={LINK} href={brand.facebookUrl} rel="noopener" target="_blank">Message us on our page</a> });

  if (!rows.length)
    return <p className="text-body-regular text-text-secondary">Our phone, email and address are being updated. Please check back shortly.</p>;

  return (
    <dl className="flex flex-col border-t border-separator-border">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 border-b border-separator-border py-4">
          <r.icon className="mt-0.5 size-5 text-foreground-icon-secondary" aria-hidden />
          <dt className="text-body-2-regular text-text-secondary">{r.label}</dt>
          <dd className="col-start-2 text-title-3-medium [overflow-wrap:break-word] text-text-primary">{r.body}</dd>
        </div>
      ))}
    </dl>
  );
}

const LINK = "rounded-sm underline decoration-1 underline-offset-4 outline-none hover:decoration-2 active:text-text-secondary focus-visible:ring-2 focus-visible:ring-border-focus-ring";
