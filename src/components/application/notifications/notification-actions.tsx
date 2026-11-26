"use client";

import { RiCheckDoubleLine, RiCheckLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";
import { Tab, TabList, TabPanel, Tabs } from "@/components/base/tabs/tabs";
import { Button } from "@/components/ui";
import { markAllRead, markRead } from "@/lib/notifications/actions";
import type { NotificationFilter } from "@/lib/notifications/queries";
import { cx } from "@/utils/cx";
import { notifyNotificationsChanged } from "./bell-store";

/** All / Unread as BoardUI underline tabs; the filter lives in the URL (?filter=unread). */
export function NotificationFilterTabs({ filter, unread, children }: { filter: NotificationFilter; unread: number; children: ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const [selected, setSelected] = useState<NotificationFilter>(filter);
  const [pending, startTransition] = useTransition();
  // A new server render (Back, a link) wins over the last click.
  const [lastFilter, setLastFilter] = useState(filter);
  if (lastFilter !== filter) {
    setLastFilter(filter);
    setSelected(filter);
  }

  return (
    <Tabs
      selectedKey={selected}
      onSelectionChange={(key) => {
        const next = key === "unread" ? "unread" : "all";
        setSelected(next);
        startTransition(() => router.push(next === "unread" ? `${path}?filter=unread` : path, { scroll: false }));
      }}
    >
      <TabList aria-label="Show">
        <Tab id="all">All</Tab>
        <Tab id="unread" count={unread > 0 ? (unread > 99 ? "99+" : unread) : undefined}>
          Unread
        </Tab>
      </TabList>
      <TabPanel id={selected} aria-busy={pending || undefined} className={cx("transition-opacity", pending && "opacity-60")}>
        {children}
      </TabPanel>
    </Tabs>
  );
}

export function MarkAllReadButton({ disabled }: { disabled: boolean }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        disabled={disabled || pending}
        onClick={() =>
          startTransition(async () => {
            const res = await markAllRead();
            setError(res.ok ? null : res.error);
            notifyNotificationsChanged();
          })
        }
      >
        <RiCheckDoubleLine aria-hidden className="size-[18px]" />
        Mark all as read
      </Button>
      {error && <p role="alert" className="w-full text-body-2-regular text-text-error-primary">{error}</p>}
    </>
  );
}

export interface NotificationRowData {
  id: number;
  title: string;
  body: string | null;
  href: string | null;
  read: boolean;
  /** Clock time, e.g. "1:30 PM". */
  time: string;
  /** Full date and time for the tooltip. */
  when: string;
  createdAt: string;
  /** What kind it is, e.g. "A return is ready for my review". */
  kindLabel?: string;
}

/** One row of the notifications page: opening it marks it read; unread rows also get a Mark as read button. */
export function NotificationRow({ n }: { n: NotificationRowData }) {
  const [read, setRead] = useState(n.read);
  const [pending, startTransition] = useTransition();
  if (n.read && !read) setRead(true);

  const mark = () => {
    if (read) return;
    setRead(true);
    startTransition(async () => {
      const res = await markRead([n.id]);
      if (!res.ok) setRead(false);
      notifyNotificationsChanged();
    });
  };

  const content = (
    <>
      <span aria-hidden className={cx("mt-1.5 size-2 shrink-0 rounded-full", read ? "bg-transparent" : "bg-accent-600")} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={cx("text-body-medium", read ? "text-text-secondary" : "text-text-primary")}>
          {n.title}
          {!read && <span className="sr-only"> (unread)</span>}
        </span>
        {n.body && <span className="text-body-2-regular text-text-tertiary">{n.body}</span>}
        <span className="flex flex-wrap items-center gap-x-1.5 text-caption-1-medium text-text-tertiary">
          <time dateTime={n.createdAt} title={n.when}>{n.time}</time>
          {n.kindLabel && (
            <>
              <span aria-hidden>·</span>
              <span>{n.kindLabel}</span>
            </>
          )}
        </span>
      </span>
    </>
  );

  const rowClass = cx(
    "flex min-w-0 flex-1 items-start gap-3 rounded-2xl p-3 text-start transition-colors",
    "hover:bg-background-secondary-hover outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
  );

  return (
    <div className="flex items-start gap-1">
      {n.href ? (
        <Link href={n.href} onClick={mark} className={rowClass}>
          {content}
        </Link>
      ) : (
        <div className={cx(rowClass, "hover:bg-transparent")}>{content}</div>
      )}
      {!read && (
        <button
          type="button"
          onClick={mark}
          disabled={pending}
          aria-label={`Mark as read: ${n.title}`}
          title="Mark as read"
          className="mt-2 me-2 grid size-8 shrink-0 place-items-center rounded-lg text-foreground-icon-secondary transition-colors hover:bg-background-secondary-hover hover:text-foreground-icon-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:size-11"
        >
          <RiCheckLine aria-hidden className="size-[18px]" />
        </button>
      )}
    </div>
  );
}
