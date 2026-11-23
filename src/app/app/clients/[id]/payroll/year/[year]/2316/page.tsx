import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { tinDashed } from "@/lib/payroll/alphalist";
import { certificate2316 } from "@/lib/payroll/certificate";
import { payrollAccess } from "@/lib/payroll/data";
import { loadPayrollContext } from "@/lib/payroll/load";
import { buildYear, displayName } from "@/lib/payroll/year";
import { formatAmount } from "@/lib/returns/money";

export default function Form2316Page(props: PageProps<"/app/clients/[id]/payroll/year/[year]/2316">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Certificates params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

/** BIR 2316 worksheets, one per employee paid in the year (or just ?employee=…), to copy into the official form. Print-friendly. */
async function Certificates({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/payroll/year/[year]/2316">, "params" | "searchParams">) {
  const { id, year: y } = await params;
  const only = (await searchParams).employee;
  if (!/^\d{4}$/.test(y)) notFound();
  const year = Number(y);
  const { supabase, client } = await payrollAccess(id);
  const payroll = await loadPayrollContext(supabase, id, "1604-C", `${year}-01-01`, `${year}-12-31`);
  const years = buildYear(payroll).filter((e) => e.lines.some((l) => l.hasEntry) && (!only || e.employee.id === only));

  return (
    <>
      <div className="print:hidden">
        <PageHeader
          title={`BIR 2316 · ${year}`}
          description={<>{client.name}: Certificate of Compensation Payment / Tax Withheld worksheets (items as on BIR Form 2316, September 2021 ENCS). Print, or copy into the official form.</>}
          actions={<LinkButton href={`/app/clients/${id}/payroll/year/${year}`} variant="ghost">Back</LinkButton>}
        />
      </div>
      {years.length === 0 && <Notice tone="waiting">No payroll for {year}.</Notice>}
      <div className="space-y-8">
        {years.map((e) => {
          const c = certificate2316(e, year);
          const block = (title: string, rows: { no: string; label: string; amount: number }[]) => (
            <section>
              <h3 className="mb-1 text-sm font-medium text-ink-heading">{title}</h3>
              <dl className="divide-y divide-border text-sm">
                {rows.map((r) => (
                  <div key={r.no} className="flex items-baseline justify-between gap-4 py-1">
                    <dt className="text-ink-muted"><span className="mr-2 inline-block w-8 text-ink-subtle tabular-nums">{r.no}</span>{r.label}</dt>
                    <dd className="tabular-nums text-ink-heading">{formatAmount(r.amount)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
          return (
            <article key={e.employee.id} className="break-after-page rounded-2xl border border-border bg-surface p-6 shadow-sm print:border-0 print:shadow-none">
              <header className="mb-4 grid gap-1 text-sm sm:grid-cols-2">
                <p><span className="text-ink-subtle">1 Year</span> {year} · <span className="text-ink-subtle">2 Period</span> {e.employee.hireDate && e.employee.hireDate > `${year}-01-01` ? e.employee.hireDate.slice(5).replace("-", "/") : "01/01"} – {e.employee.separationDate?.startsWith(String(year)) ? e.employee.separationDate.slice(5).replace("-", "/") : "12/31"}</p>
                <p><span className="text-ink-subtle">3 TIN</span> {e.employee.tin ? `${tinDashed(e.employee.tin)}-${e.employee.tinBranch}` : "—"}</p>
                <p className="font-medium text-ink-heading"><span className="font-normal text-ink-subtle">4 Employee</span> {displayName(e.employee)}</p>
                <p><span className="text-ink-subtle">11 MWE</span> {e.employee.isMwe ? `Yes${e.employee.mweDailyRate ? ` · ₱${formatAmount(e.employee.mweDailyRate)}/day (item 9)` : ""}` : "No"}</p>
                <p><span className="text-ink-subtle">12 Employer TIN</span> {client.tin ?? "—"}</p>
                <p><span className="text-ink-subtle">13 Employer</span> {client.name}</p>
              </header>
              <div className="grid gap-6 lg:grid-cols-2">
                {block("Part IV-A — Summary", c.items)}
                <div className="space-y-4">
                  {block("Part IV-B A. Non-taxable / exempt compensation", c.partA)}
                  {block("Part IV-B B. Taxable compensation", c.partB)}
                </div>
              </div>
              {e.employee.substitutedFiling && c.taxDue !== c.withheld && (
                <p className="mt-3 text-sm text-warning">Marked for substituted filing, but tax due ({formatAmount(c.taxDue)}) does not equal tax withheld ({formatAmount(c.withheld)}).</p>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
