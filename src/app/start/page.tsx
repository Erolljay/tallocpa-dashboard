import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Lockup } from "@/components/brand/lockup";
import { Notice, Skeleton } from "@/components/ui";
import { funnelLive, funnelOpen } from "@/lib/funnel/public";
import { prefillFromQuery } from "@/lib/site/intake";
import { StartForm } from "./form";

export const metadata: Metadata = { title: "Get a quote · Tallo CPA", robots: { index: false, follow: false } };

/**
 * Phase 2, step 1: the website's quote request. The page exists only once the
 * Owner opens the funnel; until then it answers signed-in staff, who can try it.
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
  if (!(await funnelOpen())) notFound();
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
