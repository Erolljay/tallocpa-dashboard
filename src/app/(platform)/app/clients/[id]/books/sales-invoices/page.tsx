import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { InvoiceList } from "../invoice-pages";

export default function SalesInvoicesListPage(props: PageProps<"/app/clients/[id]/books/sales-invoices">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <InvoiceList kind="sales" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
