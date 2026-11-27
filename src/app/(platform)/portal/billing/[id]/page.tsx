import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RiArrowLeftLine } from "@remixicon/react";
import { Skeleton } from "@/components/ui";
import { StatementView } from "@/components/statement/statement-view";
import { loadStatement } from "@/lib/collections/statement";
import { manilaToday } from "@/lib/filings/run";
import { accessNote, canApprove } from "@/lib/contacts/access";
import { accessFor, portalContext } from "../../client-context";

/** Portal Billing: one statement, with its payments and Pay while anything is open. */
export default function PortalStatementDetail(props: PageProps<"/portal/billing/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <Detail params={props.params} />
    </Suspense>
  );
}

async function Detail({ params }: Pick<PageProps<"/portal/billing/[id]">, "params">) {
  const { id } = await params;
  const { supabase, all } = await portalContext();
  // RLS shows a client user only their own businesses' statements.
  const s = await loadStatement(supabase, id);
  if (!s) notFound();
  return (
    <div className="space-y-4">
      <Link href="/portal/billing" className="inline-flex items-center gap-1 text-body-regular text-button-ghost-foreground hover:underline pointer-coarse:min-h-11 print:hidden">
        <RiArrowLeftLine aria-hidden className="size-4 rtl:rotate-180" /> Billing
      </Link>
      <StatementView s={s} today={manilaToday()} payBlocked={canApprove(accessFor(all, s.client.id)) ? undefined : accessNote(accessFor(all, s.client.id), "approve")} />
    </div>
  );
}
