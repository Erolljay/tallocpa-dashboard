import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Form2316Sheet } from "@/components/bir/form-2316-sheet";
import { PrintButton } from "@/components/bir/print-button";
import { LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { payrollAccess } from "@/lib/payroll/data";
import { load2316 } from "@/lib/payroll/load";

export default function PrintAll2316Page(props: PageProps<"/app/clients/[id]/payroll/year/[year]/2316/all">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <PrintAll params={props.params} />
    </Suspense>
  );
}

/** Every employee's BIR 2316 for the year, one per printed page. */
async function PrintAll({ params }: Pick<PageProps<"/app/clients/[id]/payroll/year/[year]/2316/all">, "params">) {
  const { id, year: y } = await params;
  if (!/^\d{4}$/.test(y)) notFound();
  const year = Number(y);
  const { supabase, client } = await payrollAccess(id);
  const set = await load2316(supabase, id, year);
  if (!set) notFound();
  const warned = set.forms.filter((f) => f.warnings.length > 0);
  return (
    <>
      <div className="print:hidden">
        <PageHeader
          title={`All BIR 2316s · ${year}`}
          description={<>{client.name}: {set.forms.length} certificate{set.forms.length === 1 ? "" : "s"}, one per page (A4 portrait).</>}
          actions={
            <>
              <LinkButton href={`/app/clients/${id}/payroll/year/${year}/2316`} variant="ghost">Back</LinkButton>
              {set.forms.length > 0 && <PrintButton label="Print all" />}
            </>
          }
        />
        {set.forms.length === 0 && <Notice tone="waiting">No payroll for {year}.</Notice>}
        {warned.length > 0 && (
          <div className="mb-6">
            <Notice tone="waiting">
              <ul className="list-disc pl-5">{warned.map((f) => <li key={f.employeeId}><span className="font-medium">{f.employeeName}:</span> {f.warnings.join(" ")}</li>)}</ul>
            </Notice>
          </div>
        )}
      </div>
      <Form2316Sheet forms={set.forms} />
    </>
  );
}
