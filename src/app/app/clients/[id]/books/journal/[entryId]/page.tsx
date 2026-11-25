import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { JournalView } from "../../module-pages";

export default function JournalEntryRoute(props: PageProps<"/app/clients/[id]/books/journal/[entryId]">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <JournalView params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
