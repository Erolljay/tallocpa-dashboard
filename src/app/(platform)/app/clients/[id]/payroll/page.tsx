import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { showMonth } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { loadEmployees, loadItems, payrollAccess } from "@/lib/payroll/data";
import { EMPLOYMENT_STATUSES } from "@/lib/payroll/types";
import { byName, displayName } from "@/lib/payroll/year";
import { EmployeeUpload } from "./forms";

export default function PayrollPage(props: PageProps<"/app/clients/[id]/payroll">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Payroll params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

async function Payroll({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/payroll">, "params" | "searchParams">) {
  const { id } = await params;
  const sp = await searchParams;
  const { supabase, client } = await payrollAccess(id);
  const today = manilaToday();
  const year = /^\d{4}$/.test(String(sp.year ?? "")) ? Number(sp.year) : Number(today.slice(0, 4));

  await loadItems(supabase, id, true); // the default payslip items, the first time
  const [employees, entries, filings, submissions] = await Promise.all([
    loadEmployees(supabase, id),
    supabase.from("payroll_entries").select("pay_month, employee_id").eq("client_id", id).gte("pay_month", `${year}-01-01`).lte("pay_month", `${year}-12-01`),
    supabase.from("filing_instances").select("period_start, status").eq("client_id", id).eq("form", "1601-C").gte("period_start", `${year}-01-01`).lte("period_start", `${year}-12-31`),
    supabase.from("payroll_submissions").select("id, pay_month, file_name, row_count, late, created_at").eq("client_id", id).eq("status", "pending").order("created_at"),
  ]);
  const paid = new Map<string, number>();
  for (const e of entries.data ?? []) paid.set(String(e.pay_month).slice(0, 7), (paid.get(String(e.pay_month).slice(0, 7)) ?? 0) + 1);
  const filed = new Set((filings.data ?? []).filter((f) => ["filed", "paid", "proof_uploaded"].includes(f.status)).map((f) => String(f.period_start).slice(0, 7)));
  const months = Array.from({ length: 12 }, (_, i) => `${year}-${String(i + 1).padStart(2, "0")}`).filter((m) => m <= today.slice(0, 7) || paid.has(m));
  const list = [...employees].sort(byName);
  const active = list.filter((e) => e.active);
  const inactive = list.filter((e) => !e.active);
  const needs = list.filter((e) => e.needsDetails);

  return (
    <>
      <PageHeader
        title="Payroll"
        description={<>{client.name}: employees and monthly pay, the source of the 1601-C, 1604-C and the alphalist.</>}
        actions={
          <>
            <LinkButton href={`/app/clients/${id}`} variant="ghost">Back to client</LinkButton>
            <LinkButton href={`/app/clients/${id}/payroll/setup`} variant="secondary">Payslip items</LinkButton>
            <LinkButton href={`/app/clients/${id}/payroll/year/${year}`} variant="secondary">{year} alphalist</LinkButton>
            <LinkButton href={`/app/clients/${id}/payroll/employees/new`}>Add employee</LinkButton>
          </>
        }
      />
      <div className="space-y-6">
        {(submissions.data ?? []).length > 0 && (
          <Card title="Registers sent by the client">
            <ul className="divide-y divide-separator-border text-body-regular">
              {submissions.data!.map((s) => (
                <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 py-2">
                  <span className="text-text-primary">{showMonth(s.pay_month)} · {s.file_name} · {s.row_count} row{s.row_count === 1 ? "" : "s"}{s.late ? " · late" : ""}</span>
                  <Link href={`/app/clients/${id}/payroll/month/${String(s.pay_month).slice(0, 7)}`} className="text-button-ghost-foreground hover:underline">Review</Link>
                </li>
              ))}
            </ul>
          </Card>
        )}
        {needs.length > 0 && <Notice tone="waiting">{needs.length} employee{needs.length === 1 ? " was" : "s were"} added from an uploaded register. Complete their details (TIN, dates, status).</Notice>}

        <Card
          title={`Months of ${year}`}
          actions={
            <span className="flex gap-3 text-body-regular">
              <Link href={`?year=${year - 1}`} className="text-button-ghost-foreground hover:underline">{year - 1}</Link>
              {year < Number(today.slice(0, 4)) && <Link href={`?year=${year + 1}`} className="text-button-ghost-foreground hover:underline">{year + 1}</Link>}
            </span>
          }
        >
          {months.length === 0 ? (
            <p className="text-body-regular text-text-secondary">Nothing yet for {year}.</p>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {months.map((m) => (
                <li key={m}>
                  <Link href={`/app/clients/${id}/payroll/month/${m}`} className="flex items-center justify-between gap-2 rounded-xl border border-separator-border px-4 py-3 text-body-regular hover:bg-background-secondary-hover">
                    <span className="font-medium text-text-primary">{showMonth(`${m}-01`)}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-text-secondary">{paid.get(m) ?? 0} paid</span>
                      {filed.has(m) && <Badge tone="done">Filed</Badge>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Import employees">
          <p className="mb-3 text-body-regular text-text-secondary">
            <a href={`/app/clients/${id}/payroll/export?kind=employees`} className="text-button-ghost-foreground underline">Download the employee master (.xlsx)</a>, prefilled with the employees below, with dropdowns for status, MWE, region and separation.
            Add or correct rows, then upload it. Rows are matched by Employee No. (or TIN).
          </p>
          <EmployeeUpload clientId={id} />
        </Card>

        <Card title={`Employees (${active.length} active)`}>
          {list.length === 0 ? (
            <p className="text-body-regular text-text-secondary">No employees yet. Add them one by one, or upload the client&rsquo;s payroll register for a month and add the new names from there.</p>
          ) : (
            <ul className="divide-y divide-separator-border text-body-regular">
              {[...active, ...inactive].map((e) => (
                <li key={e.id} className="flex flex-wrap items-center justify-between gap-3 py-2">
                  <div className="min-w-0">
                    <Link href={`/app/clients/${id}/payroll/employees/${e.id}`} className="font-medium text-button-ghost-foreground hover:underline">{displayName(e)}</Link>
                    <p className="text-caption-1-regular text-text-tertiary">
                      {e.employeeNo ? `No. ${e.employeeNo} · ` : ""}{e.tin ? `TIN ${e.tin}` : "no TIN"} · {EMPLOYMENT_STATUSES[e.employmentStatus]}
                      {e.separationDate ? ` · left ${e.separationDate}` : ""}
                    </p>
                  </div>
                  <span className="flex flex-wrap gap-2">
                    {e.isMwe && <Badge tone="neutral">MWE</Badge>}
                    {e.needsDetails && <Badge tone="waiting">Needs details</Badge>}
                    {!e.active && <Badge tone="neutral">{e.separationDate ? "Separated" : "Inactive"}</Badge>}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
