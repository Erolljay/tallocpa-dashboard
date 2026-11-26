import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { InvoiceEdit } from "../../../invoice-pages";

export default function PurchaseInvoicesEditPage(props: PageProps<"/app/clients/[id]/books/purchase-invoices/[invoiceId]/edit">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <InvoiceEdit kind="purchase" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
