import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FinancialStatementsView } from "@/components/statement/financial-statements-view";
import { Notice, Skeleton } from "@/components/ui";
import type { FinancialStatements } from "@/lib/ledger/statements";
import { portalContext } from "../../client-context";

export default function PortalReport(props: PageProps<"/portal/reports/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={12} />}>
      <Report params={props.params} />
    </Suspense>
  );
}

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "long", timeZone: "Asia/Manila" }).format(new Date(iso));

/** One released report, exactly as the firm released it (row-level security limits it to the client's own users). */
async function Report({ params }: { params: PageProps<"/portal/reports/[id]">["params"] }) {
  const { id } = await params;
  const { supabase } = await portalContext();
  const { data } = await supabase.from("client_reports").select("statements, note, released_at").eq("id", id).maybeSingle();
  if (!data) notFound();
  return (
    <div className="space-y-6">
      <Link href="/portal/reports" className="text-body-medium text-button-ghost-foreground hover:underline print:hidden">All reports</Link>
      {data.note && <Notice tone="done">{data.note}</Notice>}
      <FinancialStatementsView
        fs={data.statements as FinancialStatements}
        footer={<p className="text-center text-caption-1-regular text-text-tertiary">Prepared from your books by Tallo CPA. Released {when(data.released_at)}.</p>}
      />
    </div>
  );
}
