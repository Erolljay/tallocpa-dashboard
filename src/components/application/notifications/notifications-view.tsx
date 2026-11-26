import { RiArrowLeftSLine, RiArrowRightSLine, RiNotification3Line, RiSettings3Line } from "@remixicon/react";
import Link from "next/link";
import { LinkButton, PageHeader } from "@/components/ui";
import { fullDateTime, groupByDay, timeOfDay } from "@/lib/notifications/format";
import { isNotificationKind, NOTIFICATION_KINDS } from "@/lib/notifications/kinds";
import { listNotifications, unreadCount, type NotificationFilter } from "@/lib/notifications/queries";
import { supabaseServer } from "@/lib/supabase/server";
import { MarkAllReadButton, NotificationFilterTabs, NotificationRow } from "./notification-actions";
import { notificationSettingsHref, notificationsHref, type BellAudience } from "./paths";

type SearchParams = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/** The notifications page for staff and clients alike: grouped by day, All or Unread, newest first. */
export async function NotificationsView({ audience, userId, searchParams }: { audience: BellAudience; userId: string; searchParams: SearchParams }) {
  const filter: NotificationFilter = one(searchParams.filter) === "unread" ? "unread" : "all";
  const page = Math.max(1, Number.parseInt(one(searchParams.page), 10) || 1);
  const [list, unread] = await Promise.all([listNotifications(userId, { filter, page }), supabaseServer().then((s) => unreadCount(s, userId))]);
  const groups = groupByDay(list.rows);
  const self = notificationsHref(audience);
  const pageHref = (p: number) => {
    const q = new URLSearchParams();
    if (filter === "unread") q.set("filter", "unread");
    if (p > 1) q.set("page", String(p));
    const s = q.toString();
    return s ? `${self}?${s}` : self;
  };

  return (
    <>
      <PageHeader
        title="Notifications"
        description="What needs you or concerns you, newest first. Opening one marks it read."
        actions={
          <>
            <MarkAllReadButton disabled={unread === 0} />
            <LinkButton href={notificationSettingsHref(audience)} variant="secondary" size="sm">
              <RiSettings3Line aria-hidden className="size-[18px]" />
              Email settings
            </LinkButton>
          </>
        }
      />
      <NotificationFilterTabs filter={filter} unread={unread}>
        {groups.length === 0 ? (
          <Empty filter={filter} page={list.page} allHref={self} firstHref={pageHref(1)} />
        ) : (
          <div className="flex flex-col gap-6">
            {groups.map((g) => (
              <section key={g.day} aria-labelledby={`day-${g.day}`} className="flex flex-col gap-2">
                <h2 id={`day-${g.day}`} className="ps-1 text-caption-1-semibold text-text-tertiary">
                  {g.label}
                </h2>
                <ul className="flex flex-col gap-0.5 rounded-3xl border border-border-button-default bg-background-primary-default p-1.5">
                  {g.items.map((n) => (
                    <li key={n.id}>
                      <NotificationRow
                        n={{
                          id: n.id,
                          title: n.title,
                          body: n.body,
                          href: n.href,
                          read: n.read_at != null,
                          time: timeOfDay(n.created_at),
                          when: fullDateTime(n.created_at),
                          createdAt: n.created_at,
                          kindLabel: isNotificationKind(n.kind) ? NOTIFICATION_KINDS[n.kind].label : undefined,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            {(list.page > 1 || list.hasMore) && (
              <nav aria-label="Pages" className="flex items-center justify-between gap-2">
                {list.page > 1 ? (
                  <LinkButton href={pageHref(list.page - 1)} variant="secondary" size="sm">
                    <RiArrowLeftSLine aria-hidden className="size-[18px] rtl:-scale-x-100" />
                    Newer
                  </LinkButton>
                ) : (
                  <span />
                )}
                {list.hasMore && (
                  <LinkButton href={pageHref(list.page + 1)} variant="secondary" size="sm">
                    Older
                    <RiArrowRightSLine aria-hidden className="size-[18px] rtl:-scale-x-100" />
                  </LinkButton>
                )}
              </nav>
            )}
          </div>
        )}
      </NotificationFilterTabs>
    </>
  );
}

function Empty({ filter, page, allHref, firstHref }: { filter: NotificationFilter; page: number; allHref: string; firstHref: string }) {
  const [title, text] =
    page > 1
      ? ["Nothing on this page", "There are no older notifications."]
      : filter === "unread"
        ? ["No unread notifications", "You're all caught up."]
        : ["No notifications yet", "When a return, payment or request needs you, it shows up here and on the bell."];
  return (
    <div className="flex flex-col items-center gap-2 rounded-3xl border border-border-button-default bg-background-primary-default px-6 py-12 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-background-secondary-default">
        <RiNotification3Line aria-hidden className="size-6 text-foreground-icon-tertiary" />
      </span>
      <p className="text-headline-medium text-text-primary">{title}</p>
      <p className="max-w-sm text-body-regular text-text-secondary">{text}</p>
      {page > 1 ? (
        <Link href={firstHref} className="rounded-sm text-body-medium text-accent-600 underline-offset-3 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
          Back to the newest
        </Link>
      ) : (
        filter === "unread" && (
          <Link href={allHref} className="rounded-sm text-body-medium text-accent-600 underline-offset-3 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
            See all notifications
          </Link>
        )
      )}
    </div>
  );
}
