import { Suspense } from "react";
import { NotificationsView } from "@/components/application/notifications/notifications-view";
import { PageHeader, Skeleton } from "@/components/ui";
import { portalContext } from "../client-context";

export default function PortalNotificationsPage(props: PageProps<"/portal/notifications">) {
  return (
    <Suspense fallback={<><PageHeader title="Notifications" /><Skeleton rows={8} /></>}>
      <Content searchParams={props.searchParams} />
    </Suspense>
  );
}

async function Content({ searchParams }: Pick<PageProps<"/portal/notifications">, "searchParams">) {
  // Staff go to /app.
  const { id } = await portalContext();
  return <NotificationsView audience="client" userId={id.userId} searchParams={await searchParams} />;
}
