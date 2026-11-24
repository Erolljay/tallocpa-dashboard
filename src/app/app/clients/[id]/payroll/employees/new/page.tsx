import { Suspense } from "react";
import { Card, PageHeader, Skeleton } from "@/components/ui";
import { payrollAccess } from "@/lib/payroll/data";
import { EmployeeForm } from "../../forms";

export default function NewEmployeePage(props: PageProps<"/app/clients/[id]/payroll/employees/new">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <NewEmployee params={props.params} />
    </Suspense>
  );
}

async function NewEmployee({ params }: Pick<PageProps<"/app/clients/[id]/payroll/employees/new">, "params">) {
  const { id } = await params;
  const { client } = await payrollAccess(id);
  return (
    <>
      <PageHeader title="Add employee" description={client.name} />
      <Card><EmployeeForm clientId={id} employee={null} /></Card>
    </>
  );
}
