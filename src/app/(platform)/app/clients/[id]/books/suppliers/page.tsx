import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { PartyList } from "../party-pages";

export default function SuppliersRoute(props: PageProps<"/app/clients/[id]/books/suppliers">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <PartyList kind="purchase" params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
