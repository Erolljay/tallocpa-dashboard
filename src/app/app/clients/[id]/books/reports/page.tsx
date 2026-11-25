import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { ReportsIndex } from "../module-pages";

export default function ReportsRoute(props: PageProps<"/app/clients/[id]/books/reports">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <ReportsIndex params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
