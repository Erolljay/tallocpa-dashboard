import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { SettlementView } from "../../settlement-pages";

export default function ReceiptsViewPage(props: PageProps<"/app/clients/[id]/books/receipts/[settlementId]">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <SettlementView kind="receipt" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
