import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Form2316Sheet } from "@/components/bir/form-2316-sheet";
import { PrintButton } from "@/components/bir/print-button";
import { Skeleton } from "@/components/ui";
import { load2316 } from "@/lib/payroll/load";
import { portalContext } from "../../../../client-context";

export default function Portal2316Page(props: PageProps<"/portal/payroll/2316/[clientId]/[year]">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Portal2316 params={props.params} />
    </Suspense>
  );
}

/**
 * A client user's BIR 2316s for a year, once staff released them. Rendered on
 * the server from payroll_2316_data(), which checks that the user belongs to
 * the client and that the year is released; client users never read the payroll
 * tables themselves.
 */
async function Portal2316({ params }: Pick<PageProps<"/portal/payroll/2316/[clientId]/[year]">, "params">) {
  const { clientId, year: y } = await params;
  if (!/^\d{4}$/.test(y)) notFound();
  const { supabase, clients } = await portalContext();
  if (!clients.some((c) => c.id === clientId)) notFound();
  const set = await load2316(supabase, clientId, Number(y));
  if (!set || !set.releasedAt) notFound();
  return (
    <div className="space-y-6">
      <div className="space-y-2 print:hidden">
        <Link href="/portal/payroll" className="text-body-regular text-button-ghost-foreground hover:underline">← Payroll</Link>
        <h1 className="text-title-1-medium text-text-primary">BIR 2316 · {y}</h1>
        <p className="text-body-regular text-text-secondary">
          {set.clientName}: {set.forms.length} certificate{set.forms.length === 1 ? "" : "s"}, one per page. Print them (or save as PDF), have your authorized representative and each employee sign, and give each employee their copy.
        </p>
        {set.forms.length > 0 && <PrintButton />}
      </div>
      <Form2316Sheet forms={set.forms} />
    </div>
  );
}
