import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Lockup } from "@/components/brand/lockup";
import { ProposalView, type ProposalData } from "@/components/funnel/proposal-view";
import { PrintButton } from "@/components/statement/print-button";
import { Notice, Skeleton } from "@/components/ui";
import { manilaToday } from "@/lib/filings/run";
import { funnelLive } from "@/lib/funnel/public";
import { supabaseServer } from "@/lib/supabase/server";
import { AcceptForm } from "./accept-form";

export const metadata: Metadata = { title: "Proposal · Tallo CPA", robots: { index: false, follow: false } };

/** Phase 2, step 4: the proposal at the link sent to the prospect, with online acceptance. */
export default function ProposalPage(props: PageProps<"/proposal/[token]">) {
  return (
    <Suspense fallback={<main className="flex flex-1 justify-center px-4 py-10"><div className="w-full max-w-3xl"><Skeleton rows={12} /></div></main>}>
      <Proposal params={props.params} />
    </Suspense>
  );
}

async function Proposal({ params }: Pick<PageProps<"/proposal/[token]">, "params">) {
  const { token } = await params;
  if (!/^[0-9a-f]{64}$/.test(token)) notFound();
  const supabase = await supabaseServer();
  const { data } = await supabase.rpc("proposal_by_token", { p_token: token });
  if (!data) notFound();
  const p = data as ProposalData;
  const live = await funnelLive();
  const expired = p.status === "sent" && p.valid_until < manilaToday();
  return (
    <main className="flex flex-1 justify-center bg-background-full px-4 py-10 print:bg-background-primary-default print:py-0">
      <div className="flex w-full max-w-3xl flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <Lockup />
          <div className="print:hidden"><PrintButton /></div>
        </div>
        {!live && <Notice tone="waiting">Preview: the funnel is not live. Only signed-in staff can open this link.</Notice>}
        {p.status === "withdrawn" && <Notice tone="blocked">This proposal has been replaced. Please use the latest link we sent you.</Notice>}
        {expired && <Notice tone="blocked">This proposal has expired. Please ask us for a new one.</Notice>}
        <ProposalView p={p} />
        {p.status === "sent" && !expired && <AcceptForm token={token} contact={p.lead.contact_name} />}
      </div>
    </main>
  );
}
