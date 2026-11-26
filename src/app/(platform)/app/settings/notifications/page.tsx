import { Suspense } from "react";
import { NotificationSettingsView } from "@/components/application/notifications/notification-settings-view";
import { PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";

/** Personal, not firm settings: every staff member can open it (the rest of /app/settings is the Owner's). */
export default function NotificationSettingsPage() {
  return (
    <Suspense fallback={<><PageHeader title="Notification settings" /><Skeleton rows={8} /></>}>
      <Content />
    </Suspense>
  );
}

async function Content() {
  const id = await requireStaff();
  return <NotificationSettingsView audience="staff" userId={id.userId} role={id.staff.role} />;
}
