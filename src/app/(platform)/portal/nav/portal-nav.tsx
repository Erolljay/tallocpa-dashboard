"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/utils/cx";
import { activeTab, GRID_COLS, mainTabs, registrationTab, requestsTab } from "./tabs";

/**
 * `registration`: show Registration (we are registering, renewing or updating the business).
 * `pending`: requests waiting on the client, as a count on Requests.
 */
export function PortalNav({ variant, registration = false, pending = 0 }: { variant: "top" | "bottom"; registration?: boolean; pending?: number }) {
  const path = usePathname();
  const tabs = [...mainTabs, requestsTab, ...(registration ? [registrationTab] : [])];
  const current = activeTab(path, tabs);
  const badge = (href: string) =>
    href === requestsTab.href && pending > 0 ? (
      <span className="absolute -top-1 -end-2 min-w-4 rounded-full bg-accent-600 px-1 text-center text-caption-2-medium tabular-nums text-text-white">
        {pending}<span className="sr-only"> waiting on you</span>
      </span>
    ) : null;
  if (variant === "bottom") {
    // Up to six tabs share the bar; more scroll sideways.
    const scroll = tabs.length > 6;
    return (
      <ul className={cx(scroll ? "flex overflow-x-auto [scrollbar-width:none]" : cx("grid", GRID_COLS[tabs.length]))}>
        {tabs.map(({ href, label, icon: Icon }) => (
          <li key={href} className={cx(scroll && "min-w-[4.5rem] flex-1 shrink-0")}>
            <Link href={href} aria-current={current === href ? "page" : undefined} className={cx("flex min-h-[52px] flex-col items-center justify-center gap-1 text-caption-2-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring", current === href ? "text-button-ghost-foreground" : "text-text-tertiary")}>
              <span className="relative"><Icon aria-hidden className="size-6" />{badge(href)}</span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="flex gap-1">
      {tabs.map(({ href, label, icon: Icon }) => (
        <li key={href}>
          <Link href={href} aria-current={current === href ? "page" : undefined} className={cx(
              "my-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-body-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
              current === href ? "bg-linear-to-b from-accent-500 to-accent-600 text-text-white shadow-nav-selected" : "text-text-secondary hover:bg-background-secondary-hover hover:text-text-primary",
            )}>
            <span className="relative"><Icon aria-hidden className="size-[18px]" />{badge(href)}</span>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
