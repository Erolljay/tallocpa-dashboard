import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { SettlementView } from "../../settlement-pages";

export default function PaymentsViewPage(props: PageProps<"/app/clients/[id]/books/payments/[settlementId]">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <SettlementView kind="payment" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
