import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { JournalList } from "../module-pages";

export default function JournalRoute(props: PageProps<"/app/clients/[id]/books/journal">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <JournalList params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
