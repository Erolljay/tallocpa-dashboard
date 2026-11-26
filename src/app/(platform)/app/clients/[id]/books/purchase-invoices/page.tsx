import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { InvoiceList } from "../invoice-pages";

export default function PurchaseInvoicesListPage(props: PageProps<"/app/clients/[id]/books/purchase-invoices">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <InvoiceList kind="purchase" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
