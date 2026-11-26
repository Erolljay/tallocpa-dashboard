import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { SettlementList } from "../settlement-pages";

export default function ReceiptsListPage(props: PageProps<"/app/clients/[id]/books/receipts">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <SettlementList kind="receipt" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
