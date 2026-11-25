import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { Payslips } from "../module-pages";

export default function PayslipsRoute(props: PageProps<"/app/clients/[id]/books/payslips">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Payslips params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
