import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { InvoiceView } from "../../invoice-pages";

export default function SalesInvoicesViewPage(props: PageProps<"/app/clients/[id]/books/sales-invoices/[invoiceId]">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <InvoiceView kind="sales" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
