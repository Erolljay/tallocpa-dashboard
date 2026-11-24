import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Form2316Sheet } from "@/components/bir/form-2316-sheet";
import { PrintButton } from "@/components/bir/print-button";
import { Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { payrollAccess } from "@/lib/payroll/data";
import { load2316 } from "@/lib/payroll/load";
import { formatAmount } from "@/lib/returns/money";

export default function Form2316Page(props: PageProps<"/app/clients/[id]/payroll/year/[year]/2316">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Certificates params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

/**
 * BIR 2316 for a year. With ?employee=…, that employee's certificate, ready to
 * print; without, the list of employees paid in the year, each with their
 * figures and what to check, and a link to print them all.
 */
async function Certificates({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/payroll/year/[year]/2316">, "params" | "searchParams">) {
  const { id, year: y } = await params;
  const only = (await searchParams).employee;
  if (!/^\d{4}$/.test(y)) notFound();
  const year = Number(y);
  const { supabase, client } = await payrollAccess(id);
  const employeeId = typeof only === "string" ? only : undefined;
  const set = await load2316(supabase, id, year, employeeId);
  if (!set) notFound();
  const base = `/app/clients/${id}/payroll/year/${year}`;

  if (employeeId) {
    const form = set.forms[0];
    return (
      <>
        <div className="print:hidden">
          <PageHeader
            title={form ? `BIR 2316 · ${form.employeeName} · ${year}` : `BIR 2316 · ${year}`}
            description={client.name}
            actions={
              <>
                <LinkButton href={`${base}/2316`} variant="ghost">All employees</LinkButton>
                <LinkButton href={`/app/clients/${id}/payroll/employees/${employeeId}?year=${year}`} variant="secondary">Employee &amp; previous employer</LinkButton>
                {form && <PrintButton />}
              </>
            }
          />
          {!form && <Notice tone="waiting">No compensation for this employee in {year}.</Notice>}
          {form && form.warnings.length > 0 && (
            <div className="mb-6"><Notice tone="waiting"><ul className="list-disc pl-5">{form.warnings.map((w, i) => <li key={i}>{w}</li>)}</ul></Notice></div>
          )}
        </div>
        {form && <Form2316Sheet forms={[form]} />}
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={`BIR 2316 · ${year}`}
        description={<>{client.name}: Certificates of Compensation Payment / Tax Withheld (BIR Form 2316, September 2021 ENCS), one per employee paid in {year}.</>}
        actions={
          <>
            <LinkButton href={base} variant="ghost">Back</LinkButton>
            {set.forms.length > 0 && <LinkButton href={`${base}/2316/all`}>Print all 2316s</LinkButton>}
          </>
        }
      />
      {set.forms.length === 0 ? (
        <Notice tone="waiting">No payroll for {year}.</Notice>
      ) : (
        <Card>
          <ul className="divide-y divide-border text-sm">
            {set.forms.map((f) => (
              <li key={f.employeeId} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                <div className="min-w-0">
                  <Link href={`${base}/2316?employee=${f.employeeId}`} className="font-medium text-link hover:underline">{f.employeeName}</Link>
                  <p className="text-xs text-ink-subtle">
                    {f.mwe.isMwe ? "MWE · " : ""}gross {formatAmount(f.amounts["19"])} · taxable {formatAmount(f.amounts["23"])} · tax due {formatAmount(f.amounts["24"])} · withheld {formatAmount(f.amounts["28"])}
                    {f.previous ? " · with previous employer" : ""}
                  </p>
                  {f.warnings.length > 0 && <p className="text-xs text-warning">{f.warnings.join(" ")}</p>}
                </div>
                <Link href={`${base}/2316?employee=${f.employeeId}`} className="text-link hover:underline">View / print</Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
