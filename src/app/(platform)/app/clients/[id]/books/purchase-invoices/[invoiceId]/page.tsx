import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { InvoiceView } from "../../invoice-pages";

export default function PurchaseInvoicesViewPage(props: PageProps<"/app/clients/[id]/books/purchase-invoices/[invoiceId]">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <InvoiceView kind="purchase" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
