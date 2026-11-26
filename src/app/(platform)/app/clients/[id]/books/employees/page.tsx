import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { Employees } from "../module-pages";

export default function EmployeesRoute(props: PageProps<"/app/clients/[id]/books/employees">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Employees params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
