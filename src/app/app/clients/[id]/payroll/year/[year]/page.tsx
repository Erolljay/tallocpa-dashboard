import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { payrollAccess } from "@/lib/payroll/data";
import { formatAmount } from "@/lib/returns/money";
import { yearWorksheet } from "../../year-data";

export default function PayrollYearPage(props: PageProps<"/app/clients/[id]/payroll/year/[year]">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <PayrollYear params={props.params} />
    </Suspense>
  );
}

async function PayrollYear({ params }: Pick<PageProps<"/app/clients/[id]/payroll/year/[year]">, "params">) {
  const { id, year: y } = await params;
  if (!/^\d{4}$/.test(y)) notFound();
  const year = Number(y);
  const { supabase, client } = await payrollAccess(id);
  const { result } = await yearWorksheet(supabase, client, year);
  const blocked = result.errors.length > 0;
  const dl = (kind: string, label: string) =>
    blocked ? null : <LinkButton key={kind} href={`/app/clients/${id}/payroll/export?kind=${kind}&year=${year}`} variant="secondary" prefetch={false}>{label}</LinkButton>;

  return (
    <>
      <PageHeader
        title={`1604-C and alphalist · ${year}`}
        description={client.name}
        actions={
          <>
            <LinkButton href={`/app/clients/${id}/payroll?year=${year}`} variant="ghost">Back to payroll</LinkButton>
            <LinkButton href={`/app/clients/${id}/payroll/year/${year}/2316`} variant="secondary">BIR 2316 (all)</LinkButton>
          </>
        }
      />
      <div className="space-y-6">
        {blocked && (
          <Notice tone="blocked">
            <p className="mb-1 font-medium">The alphalist cannot be exported yet:</p>
            <ul className="list-disc pl-5">{result.errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
          </Notice>
        )}
        {result.warnings.length > 0 && (
          <Notice tone="waiting">
            <ul className="list-disc pl-5">{result.warnings.map((e, i) => <li key={i}>{e}</li>)}</ul>
          </Notice>
        )}
        <Card title="Downloads">
          <div className="flex flex-wrap gap-2">
            {dl("dat", "Alphalist DAT")}
            {dl("csv1", "Schedule 1 (Excel CSV)")}
            {dl("csv2", "Schedule 2 (Excel CSV)")}
            {blocked && <p className="text-sm text-ink-muted">Fix the problems above to download the DAT and CSV files.</p>}
          </div>
          <p className="mt-3 text-sm text-ink-muted">The same figures appear on the 1604-C worksheet of the filing. Validate the DAT in the BIR Alphalist Data Entry module before submitting.</p>
        </Card>
        {result.sections.slice(1).map((s) => (
          <Card key={s.title} title={s.title}>
            <dl className="divide-y divide-border text-sm">
              {s.lines.map((l) => (
                <div key={l.key} className="flex items-baseline justify-between gap-4 py-2">
                  <dt className="text-ink-muted"><span className="mr-2 text-ink-subtle tabular-nums">{l.line}</span>{l.label}</dt>
                  <dd className={`tabular-nums ${l.emphasis ? "font-medium text-ink-heading" : "text-ink-heading"}`}>{l.amount == null ? l.basis : formatAmount(l.amount)}</dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}
        {result.schedules.map((s) => (
          <Card key={s.title} title={s.title}>
            {s.rows.length === 0 ? (
              <p className="text-sm text-ink-muted">None.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[48rem] text-xs">
                  <thead className="text-left text-ink-subtle">
                    <tr>{s.columns.map((c) => <th key={c.key} className={`pb-2 pr-3 font-medium ${c.numeric ? "text-right" : ""}`}>{c.label}</th>)}</tr>
                  </thead>
                  <tbody>
                    {s.rows.map((r, i) => (
                      <tr key={i} className="border-t border-border">
                        {s.columns.map((c) => (
                          <td key={c.key} className={`py-1.5 pr-3 ${c.numeric ? "text-right tabular-nums" : ""}`}>{c.numeric ? formatAmount(Number(r[c.key] ?? 0)) : String(r[c.key] ?? "")}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
