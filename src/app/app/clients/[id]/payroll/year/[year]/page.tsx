import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { load2316Release, loadPayrollSettings, payrollAccess } from "@/lib/payroll/data";
import { formatAmount } from "@/lib/returns/money";
import { Release2316Form } from "../../forms";
import { yearWorksheet } from "../../year-data";

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" }).format(new Date(iso));

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
  const [{ result }, settings, release] = await Promise.all([yearWorksheet(supabase, client, year), loadPayrollSettings(supabase, id), load2316Release(supabase, id, year)]);
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
            <LinkButton href={`/app/clients/${id}/payroll/year/${year}/2316`} variant="secondary">BIR 2316s</LinkButton>
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
            {blocked && <p className="text-body-regular text-text-secondary">Fix the problems above to download the DAT and CSV files.</p>}
          </div>
          <p className="mt-3 text-body-regular text-text-secondary">The same figures appear on the 1604-C worksheet of the filing. Validate the DAT in the BIR Alphalist Data Entry module before submitting.</p>
        </Card>
        <Card title="BIR 2316 certificates">
          <div className="flex flex-wrap gap-2">
            <LinkButton href={`/app/clients/${id}/payroll/year/${year}/2316`} variant="secondary">Per employee</LinkButton>
            <LinkButton href={`/app/clients/${id}/payroll/year/${year}/2316/all`} variant="secondary">Print all 2316s</LinkButton>
          </div>
          <p className="mt-3 text-body-regular text-text-secondary">
            Signed for the employer by {settings.signatoryName ? <span className="text-text-primary">{settings.signatoryName}{settings.signatoryTitle ? `, ${settings.signatoryTitle}` : ""}</span> : <span className="text-status-yellow-text">no one yet</span>}
            {" "}(<a href={`/app/clients/${id}/payroll/setup`} className="text-button-ghost-foreground underline">change in Payroll setup</a>). Previous employers within the year are entered on each employee&rsquo;s page.
          </p>
          <div className="mt-4 border-t border-separator-border pt-4">
            <p className="mb-2 text-body-regular text-text-secondary">
              {release
                ? <>Released to the client&rsquo;s portal on {when(release.releasedAt)}: their users can print these 2316s.</>
                : <>Not released: the client&rsquo;s users cannot see these 2316s yet. Release them once the year is final.</>}
            </p>
            <Release2316Form key={release ? "released" : "draft"} clientId={id} year={year} released={!!release} />
          </div>
        </Card>
        {result.sections.slice(1).map((s) => (
          <Card key={s.title} title={s.title}>
            <dl className="divide-y divide-separator-border text-body-regular">
              {s.lines.map((l) => (
                <div key={l.key} className="flex items-baseline justify-between gap-4 py-2">
                  <dt className="text-text-secondary"><span className="mr-2 text-text-tertiary tabular-nums">{l.line}</span>{l.label}</dt>
                  <dd className={`tabular-nums ${l.emphasis ? "font-medium text-text-primary" : "text-text-primary"}`}>{l.amount == null ? l.basis : formatAmount(l.amount)}</dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}
        {result.schedules.map((s) => (
          <Card key={s.title} title={s.title}>
            {s.rows.length === 0 ? (
              <p className="text-body-regular text-text-secondary">None.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[48rem] text-caption-1-regular">
                  <thead className="text-start text-body-medium text-text-tertiary">
                    <tr>{s.columns.map((c) => <th key={c.key} className={`pb-2 pr-3 font-medium ${c.numeric ? "text-end" : ""}`}>{c.label}</th>)}</tr>
                  </thead>
                  <tbody>
                    {s.rows.map((r, i) => (
                      <tr key={i} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                        {s.columns.map((c) => (
                          <td key={c.key} className={`py-1.5 pr-3 ${c.numeric ? "text-end tabular-nums" : ""}`}>{c.numeric ? formatAmount(Number(r[c.key] ?? 0)) : String(r[c.key] ?? "")}</td>
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
