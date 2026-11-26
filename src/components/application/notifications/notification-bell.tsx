"use client";

import { RiCheckDoubleLine, RiNotification3Line, RiSettings3Line } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition, type KeyboardEvent } from "react";
import { LinkButton } from "@/components/ui";
import { Counter } from "@/components/base/badges/counter";
import { Dropdown, DropdownPopover, DropdownTrigger } from "@/components/base/dropdown/dropdown";
import { ScrollFade, useScrollFade } from "@/components/foundations/scroll-fade/scroll-fade";
import { markAllRead, markRead } from "@/lib/notifications/actions";
import { badgeText, bellLabel, fullDateTime, relativeTime } from "@/lib/notifications/format";
import { cx } from "@/utils/cx";
import { notificationSettingsHref, notificationsHref, type BellAudience } from "./paths";
import { markReadLocally, refreshBell, useBellData, type BellData, type NotificationItem } from "./bell-store";

/**
 * `row`: the desktop sidebar row (icon, label and count; icon only on the collapsed rail).
 * `icon`: a 36px icon button, for the phone top bar and the portal header.
 */
export type BellVariant = "row" | "icon";

export function NotificationBell({
  audience,
  variant,
  initial,
  className,
}: {
  audience: BellAudience;
  variant: BellVariant;
  initial: BellData;
  className?: string;
}) {
  const data = useBellData(initial);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const badge = badgeText(data.unread);
  const label = bellLabel(data.unread);
  const current = path === notificationsHref(audience) || path === notificationSettingsHref(audience);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) void refreshBell();
  };

  return (
    <Dropdown isOpen={open} onOpenChange={onOpenChange}>
      {variant === "row" ? (
        <DropdownTrigger
          aria-label={label}
          className={cx(
            "relative flex w-full items-center gap-2 rounded-2lg p-2 transition-colors duration-150 pointer-coarse:min-h-11",
            "md:sidebar-collapsed:justify-center",
            open || current ? "bg-background-secondary-hover" : "hover:bg-background-secondary-hover",
            className,
          )}
        >
          <span className="relative flex shrink-0">
            <RiNotification3Line aria-hidden className="size-5 text-foreground-icon-secondary" />
            {badge && <DotBadge className="hidden md:sidebar-collapsed:block" />}
          </span>
          <span className="flex-1 text-start text-body-medium whitespace-nowrap text-text-secondary md:sidebar-collapsed:sr-only">Notifications</span>
          {badge && (
            <Counter aria-hidden color="primary" className="min-w-5 rounded-full tabular-nums md:sidebar-collapsed:hidden">
              {badge}
            </Counter>
          )}
        </DropdownTrigger>
      ) : (
        <DropdownTrigger
          aria-label={label}
          className={cx(
            "relative flex size-9 items-center justify-center rounded-2lg text-foreground-icon-secondary transition-colors duration-150",
            "hover:bg-background-secondary-hover hover:text-foreground-icon-primary pointer-coarse:size-11",
            open && "bg-background-secondary-hover text-foreground-icon-primary",
            className,
          )}
        >
          <RiNotification3Line aria-hidden className="size-5" />
          {badge && (
            <span
              aria-hidden
              className="absolute top-0.5 end-0.5 min-w-4 rounded-full bg-accent-600 px-1 text-center text-caption-2-medium tabular-nums text-text-white ring-2 ring-background-secondary-default"
            >
              {badge}
            </span>
          )}
        </DropdownTrigger>
      )}
      <DropdownPopover
        aria-label="Notifications"
        placement={variant === "row" ? "end bottom" : "bottom end"}
        offset={8}
        className="flex w-[360px] flex-col overflow-hidden p-0"
        dialogClassName="min-h-0 gap-0"
      >
        <BellPanel audience={audience} data={data} close={() => setOpen(false)} />
      </DropdownPopover>
    </Dropdown>
  );
}

function DotBadge({ className }: { className?: string }) {
  return <span aria-hidden className={cx("absolute -top-0.5 -end-0.5 size-2.5 rounded-full bg-accent-600 ring-2 ring-background-secondary-default", className)} />;
}

function BellPanel({ audience, data, close }: { audience: BellAudience; data: BellData; close: () => void }) {
  const fade = useScrollFade();
  const [pending, startTransition] = useTransition();
  const now = new Date();

  const readAll = () => {
    markReadLocally();
    startTransition(async () => {
      await markAllRead();
      await refreshBell();
    });
  };

  // Up and Down move between rows, as in a menu; Tab still walks every control.
  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End") return;
    const rows = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("[data-bell-row]"));
    if (!rows.length) return;
    e.preventDefault();
    const i = rows.indexOf(document.activeElement as HTMLElement);
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? rows.length - 1 : e.key === "ArrowDown" ? (i + 1) % rows.length : (i - 1 + rows.length) % rows.length;
    rows[next]?.focus();
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 border-b border-separator-border px-4 py-3">
        <h2 className="text-headline-medium text-text-primary">Notifications</h2>
        <div className="flex items-center gap-1">
          {data.unread > 0 && (
            <button
              type="button"
              onClick={readAll}
              disabled={pending}
              className="flex h-8 items-center gap-1 rounded-lg px-2 text-body-medium text-button-ghost-foreground transition-colors hover:bg-background-secondary-hover outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring disabled:text-text-tertiary"
            >
              <RiCheckDoubleLine aria-hidden className="size-[18px]" />
              Mark all as read
            </button>
          )}
          <Link
            href={notificationSettingsHref(audience)}
            aria-label="Notification settings"
            title="Notification settings"
            onClick={close}
            className="grid size-8 place-items-center rounded-lg text-foreground-icon-secondary transition-colors hover:bg-background-secondary-hover hover:text-foreground-icon-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
          >
            <RiSettings3Line aria-hidden className="size-[18px]" />
          </Link>
        </div>
      </div>
      {data.latest.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
          <span className="grid size-10 place-items-center rounded-full bg-background-secondary-default">
            <RiNotification3Line aria-hidden className="size-5 text-foreground-icon-tertiary" />
          </span>
          <p className="text-body-medium text-text-primary">You&apos;re all caught up</p>
          <p className="text-body-2-regular text-text-tertiary">New returns, payments and requests for you show up here.</p>
        </div>
      ) : (
        <div className="relative min-h-0 flex-1">
          <ul onScroll={fade.onScroll} onKeyDown={onKeyDown} className="flex max-h-[min(420px,60dvh)] flex-col gap-0.5 overflow-y-auto p-1.5">
            {data.latest.map((n) => (
              <li key={n.id}>
                <BellRow n={n} now={now} close={close} />
              </li>
            ))}
          </ul>
          <ScrollFade progress={fade.progress} surfaceClassName="from-background-primary-default" />
        </div>
      )}
      <div className="border-t border-separator-border p-2">
        <LinkButton href={notificationsHref(audience)} variant="secondary" size="sm" className="w-full" onClick={close}>
          See all notifications
        </LinkButton>
      </div>
    </>
  );
}

function BellRow({ n, now, close }: { n: NotificationItem; now: Date; close: () => void }) {
  const unread = n.read_at == null;
  const onActivate = () => {
    if (unread) {
      markReadLocally([n.id]);
      void markRead([n.id]).then(() => refreshBell());
    }
    if (n.href) close();
  };
  const content = (
    <>
      <span aria-hidden className={cx("mt-1.5 size-2 shrink-0 rounded-full", unread ? "bg-accent-600" : "bg-transparent")} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={cx("text-body-medium", unread ? "text-text-primary" : "text-text-secondary")}>{n.title}</span>
        {n.body && <span className="line-clamp-2 text-body-2-regular text-text-tertiary">{n.body}</span>}
        <time dateTime={n.created_at} title={fullDateTime(n.created_at)} className="text-caption-1-medium text-text-tertiary">
          {relativeTime(n.created_at, now)}
        </time>
      </span>
      {unread && <span className="sr-only">(unread)</span>}
    </>
  );
  const rowClass = cx(
    "flex w-full items-start gap-2.5 rounded-2lg p-2 text-start transition-colors",
    "hover:bg-dropdown-item-hover-background outline-none focus-visible:bg-dropdown-item-hover-background focus-visible:ring-2 focus-visible:ring-border-focus-ring",
  );
  return n.href ? (
    <Link href={n.href} data-bell-row onClick={onActivate} className={rowClass}>
      {content}
    </Link>
  ) : (
    <button type="button" data-bell-row onClick={onActivate} className={rowClass}>
      {content}
    </button>
  );
}
