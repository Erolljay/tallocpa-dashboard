import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { InvoiceEdit } from "../../invoice-pages";

export default function SalesInvoicesNewPage(props: PageProps<"/app/clients/[id]/books/sales-invoices/new">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <InvoiceEdit kind="sales" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
