import { Suspense } from "react";
import { NotificationSettingsView } from "@/components/application/notifications/notification-settings-view";
import { PageHeader, Skeleton } from "@/components/ui";
import { portalContext } from "../../client-context";

export default function PortalNotificationSettingsPage() {
  return (
    <Suspense fallback={<><PageHeader title="Notification settings" /><Skeleton rows={6} /></>}>
      <Content />
    </Suspense>
  );
}

async function Content() {
  // Staff go to /app.
  const { id } = await portalContext();
  return <NotificationSettingsView audience="client" userId={id.userId} role={null} />;
}
