import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { SettlementEdit } from "../../../settlement-pages";

export default function ReceiptsEditPage(props: PageProps<"/app/clients/[id]/books/receipts/[settlementId]/edit">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <SettlementEdit kind="receipt" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
