import { Suspense } from "react";
import { NotificationsView } from "@/components/application/notifications/notifications-view";
import { PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";

export default function NotificationsPage(props: PageProps<"/app/notifications">) {
  return (
    <Suspense fallback={<><PageHeader title="Notifications" /><Skeleton rows={8} /></>}>
      <Content searchParams={props.searchParams} />
    </Suspense>
  );
}

async function Content({ searchParams }: Pick<PageProps<"/app/notifications">, "searchParams">) {
  const id = await requireStaff();
  return <NotificationsView audience="staff" userId={id.userId} searchParams={await searchParams} />;
}
