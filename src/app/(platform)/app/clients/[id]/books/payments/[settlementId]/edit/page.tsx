import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { SettlementEdit } from "../../../settlement-pages";

export default function PaymentsEditPage(props: PageProps<"/app/clients/[id]/books/payments/[settlementId]/edit">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <SettlementEdit kind="payment" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
