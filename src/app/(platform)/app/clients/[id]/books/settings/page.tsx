import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { SettingsPage } from "../module-pages";

export default function SettingsRoute(props: PageProps<"/app/clients/[id]/books/settings">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <SettingsPage params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
