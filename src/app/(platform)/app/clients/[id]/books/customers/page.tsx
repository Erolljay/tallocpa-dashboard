import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { PartyList } from "../party-pages";

export default function CustomersRoute(props: PageProps<"/app/clients/[id]/books/customers">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <PartyList kind="sales" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
