import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { payrollAccess } from "@/lib/payroll/data";
import { EMPLOYEE_COLUMNS, employeeFromRow } from "@/lib/payroll/rows";
import { displayName } from "@/lib/payroll/year";
import { EmployeeForm } from "../../forms";

export default function EmployeePage(props: PageProps<"/app/clients/[id]/payroll/employees/[employeeId]">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <EmployeeDetail params={props.params} />
    </Suspense>
  );
}

async function EmployeeDetail({ params }: Pick<PageProps<"/app/clients/[id]/payroll/employees/[employeeId]">, "params">) {
  const { id, employeeId } = await params;
  const { supabase, client } = await payrollAccess(id);
  const { data } = await supabase.from("employees").select(EMPLOYEE_COLUMNS).eq("id", employeeId).eq("client_id", id).maybeSingle();
  if (!data) notFound();
  const employee = employeeFromRow(data as unknown as Record<string, unknown>);
  const year = new Date().getFullYear();
  return (
    <>
      <PageHeader
        title={displayName(employee)}
        description={client.name}
        actions={<LinkButton href={`/app/clients/${id}/payroll/year/${year}/2316?employee=${employee.id}`} variant="secondary">BIR 2316 ({year})</LinkButton>}
      />
      {employee.needsDetails && <div className="mb-6"><Notice tone="waiting">Added from an uploaded register: complete the TIN, dates and status, then save.</Notice></div>}
      <Card><EmployeeForm clientId={id} employee={employee} /></Card>
    </>
  );
}
