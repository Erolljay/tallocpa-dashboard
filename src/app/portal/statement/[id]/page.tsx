import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { StatementView } from "@/components/statement/statement-view";
import { loadStatement } from "@/lib/collections/statement";
import { manilaToday } from "@/lib/filings/run";
import { portalContext } from "../../client-context";

export default function PortalStatementDetail(props: PageProps<"/portal/statement/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <Detail params={props.params} />
    </Suspense>
  );
}

async function Detail({ params }: Pick<PageProps<"/portal/statement/[id]">, "params">) {
  const { id } = await params;
  const { supabase } = await portalContext();
  // RLS shows a client user only their own businesses' statements.
  const s = await loadStatement(supabase, id);
  if (!s) notFound();
  return (
    <div className="space-y-4">
      <Link href="/portal/statement" className="text-body-regular text-button-ghost-foreground hover:underline print:hidden">← All statements</Link>
      <StatementView s={s} today={manilaToday()} />
    </div>
  );
}
