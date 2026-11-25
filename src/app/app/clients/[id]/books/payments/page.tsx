import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { SettlementList } from "../settlement-pages";

export default function PaymentsListPage(props: PageProps<"/app/clients/[id]/books/payments">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <SettlementList kind="payment" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
