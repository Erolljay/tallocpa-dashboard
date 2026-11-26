import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Lockup } from "@/components/brand/lockup";
import { Notice, Skeleton } from "@/components/ui";
import { funnelLive, funnelOpen } from "@/lib/funnel/public";
import { getSiteBrand, phoneLinks } from "@/lib/site/brand";
import { signInHref } from "@/lib/site/config";
import { prefillFromQuery } from "@/lib/site/intake";
import { StartForm } from "./form";

export const metadata: Metadata = { title: "Get a quote · Tallo CPA", robots: { index: false, follow: false } };

/**
 * Phase 2, step 1: the website's quote request. The form shows once the Owner opens
 * the funnel (Firm → Leads → The funnel); until then signed-in staff can try it, and
 * everyone else gets the firm's contact details instead of a missing page.
 */
export default function StartPage(props: PageProps<"/start">) {
  return (
    <main className="flex flex-1 justify-center bg-background-full px-4 py-10">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <div className="flex justify-center"><Lockup /></div>
        <Suspense fallback={<Skeleton rows={8} />}>
          <Start searchParams={props.searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function Start({ searchParams }: { searchParams: PageProps<"/start">["searchParams"] }) {
  if (!(await funnelOpen())) return <QuotesClosed />;
  // Answers from the website's picker on the service pages, as default values only.
  const prefill = prefillFromQuery(await searchParams);
  const live = await funnelLive();
  return (
    <>
      {!live && <Notice tone="waiting">Preview: the funnel is not live. Only signed-in staff can see this page, and requests made here are marked as tests.</Notice>}
      <div className="rounded-3xl border border-border-button-default bg-background-primary-default p-6 shadow-xs">
        <h1 className="text-title-1-medium text-text-primary">Get a quote</h1>
        <p className="mt-1 mb-6 text-body-regular text-text-secondary">Bookkeeping and BIR compliance for your business. Tell us about it and see your fee right away.</p>
        <StartForm prefill={prefill} />
      </div>
    </>
  );
}

/** The funnel is not open yet: how to ask for a quote meanwhile. */
async function QuotesClosed() {
  const brand = await getSiteBrand();
  const phones = phoneLinks(brand.phone);
  const link = "text-button-ghost-foreground underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring rounded-sm";
  return (
    <div className="rounded-3xl border border-border-button-default bg-background-primary-default p-6 shadow-xs">
      <h1 className="text-title-1-medium text-text-primary">Get a quote</h1>
      <p className="mt-1 text-body-regular text-text-secondary">Online quotes open soon. Until then, write or call us with how your business is registered and what you need, and we reply with a quote.</p>
      <ul className="mt-6 flex flex-col gap-2 text-body-regular text-text-primary">
        {brand.email && (
          <li>Email: <a className={link} href={`mailto:${brand.email}?subject=${encodeURIComponent("Quote request")}`}>{brand.email}</a></li>
        )}
        {phones.map((p) => (
          <li key={p.href}>Phone: <a className={link} href={p.href}>{p.label}</a></li>
        ))}
        <li><Link className={link} href="/contact">All contact details</Link></li>
      </ul>
      <p className="mt-6 text-body-regular text-text-secondary">Already a client? <a className={link} href={signInHref()}>Log in to your portal</a>.</p>
    </div>
  );
}
