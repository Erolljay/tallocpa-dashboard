import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { loadPriorEmployers, payrollAccess } from "@/lib/payroll/data";
import { EMPLOYEE_COLUMNS, employeeFromRow } from "@/lib/payroll/rows";
import { displayName } from "@/lib/payroll/year";
import { manilaToday } from "@/lib/filings/run";
import { EmployeeForm, PriorEmployerForm } from "../../forms";

export default function EmployeePage(props: PageProps<"/app/clients/[id]/payroll/employees/[employeeId]">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <EmployeeDetail params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

async function EmployeeDetail({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/payroll/employees/[employeeId]">, "params" | "searchParams">) {
  const { id, employeeId } = await params;
  const y = (await searchParams).year;
  const { supabase, client } = await payrollAccess(id);
  const { data } = await supabase.from("employees").select(EMPLOYEE_COLUMNS).eq("id", employeeId).eq("client_id", id).maybeSingle();
  if (!data) notFound();
  const employee = employeeFromRow(data as unknown as Record<string, unknown>);
  const year = typeof y === "string" && /^\d{4}$/.test(y) ? Number(y) : Number(manilaToday().slice(0, 4));
  const prior = (await loadPriorEmployers(supabase, id, year)).find((p) => p.employeeId === employee.id) ?? null;
  return (
    <>
      <PageHeader
        title={displayName(employee)}
        description={client.name}
        actions={<LinkButton href={`/app/clients/${id}/payroll/year/${year}/2316?employee=${employee.id}`} variant="secondary">BIR 2316 ({year})</LinkButton>}
      />
      {employee.needsDetails && <div className="mb-6"><Notice tone="waiting">Added from an uploaded register: complete the TIN, dates and status, then save.</Notice></div>}
      <div className="space-y-6">
        <Card><EmployeeForm clientId={id} employee={employee} /></Card>
        <Card
          title={`Previous employer in ${year}`}
          actions={
            <div className="flex gap-3 text-sm">
              <a href={`?year=${year - 1}`} className="text-link hover:underline">{year - 1}</a>
              <a href={`?year=${year + 1}`} className="text-link hover:underline">{year + 1}</a>
            </div>
          }
        >
          <p className="mb-4 text-sm text-ink-muted">
            If {employee.firstName} worked for another employer earlier in {year}, enter it from that employer&rsquo;s BIR 2316. It prints in Part III of this client&rsquo;s 2316
            (items 16–18), adds to taxable compensation (item 22) and tax withheld (item 25B), enters the year-end adjustment, and fills the alphalist&rsquo;s previous-employer columns.
            An employee with a previous employer is not qualified for substituted filing.
          </p>
          <PriorEmployerForm key={`${year}:${prior ? "y" : "n"}`} clientId={id} employeeId={employee.id} year={year} prior={prior} />
        </Card>
      </div>
    </>
  );
}
