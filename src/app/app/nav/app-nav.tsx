"use client";

import { RiBriefcase4Line, RiCalendarScheduleLine, RiGroupLine, RiHomeLine, RiInboxArchiveLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/utils/cx";

/*
 * Five places (rework, 25 November 2026): Home, Clients, Inbox, Filings, Firm.
 * Each owns the older pages that now sit under it as section tabs, so the row
 * stays selected on any of them.
 */
const items = {
  home: { href: "/app", label: "Home", icon: RiHomeLine, also: ["/app/work", "/app/calendar"] },
  clients: { href: "/app/clients", label: "Clients", icon: RiGroupLine, also: ["/app/parties", "/app/requests", "/app/registrations"] },
  inbox: { href: "/app/documents", label: "Inbox", icon: RiInboxArchiveLine, also: ["/app/cycle"] },
  filings: { href: "/app/deadlines", label: "Filings", icon: RiCalendarScheduleLine, also: ["/app/review", "/app/filings"] },
  firm: { href: "/app/firm", label: "Firm", icon: RiBriefcase4Line, also: ["/app/leads", "/app/collections", "/app/scores", "/app/staff", "/app/settings"] },
} as const;

export type NavKey = keyof typeof items;

const under = (path: string, href: string) => path === href || path.startsWith(`${href}/`);

/**
 * Sidebar rows in BoardUI's sidebar style: the current page is the filled accent row.
 * On the collapsed icon rail (md and up) the label becomes visually hidden, so the
 * link keeps its accessible name, and the title gives sighted users a tooltip.
 */
export function NavLinks({ keys }: { keys: readonly NavKey[] }) {
  return <Links keys={keys} path={usePathname()} />;
}

/** Same rows with nothing selected: the Suspense fallback while the URL is read. */
export function NavLinksFallback({ keys }: { keys: readonly NavKey[] }) {
  return <Links keys={keys} path={null} />;
}

function Links({ keys, path }: { keys: readonly NavKey[]; path: string | null }) {
  const active = (key: NavKey) => {
    if (path === null) return false;
    const { href, also } = items[key];
    return (href === "/app" ? path === "/app" : under(path, href)) || also.some((a) => under(path, a));
  };
  return keys.map((key) => {
    const { href, label, icon: Icon } = items[key];
    const current = active(key);
    return (
      <Link
        key={href}
        href={href}
        aria-current={current ? "page" : undefined}
        title={label}
        className={cx(
          "flex shrink-0 items-center gap-2 rounded-2lg p-2 transition-colors duration-150 pointer-coarse:min-h-11",
          "md:sidebar-collapsed:justify-center",
          "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
          current ? "bg-linear-to-b from-accent-500 to-accent-600 shadow-nav-selected" : "hover:bg-background-secondary-hover",
        )}
      >
        <Icon aria-hidden className={cx("size-5 shrink-0", current ? "text-text-white" : "text-foreground-icon-secondary")} />
        <span className={cx("text-body-medium whitespace-nowrap md:sidebar-collapsed:sr-only", current ? "text-text-white" : "text-text-secondary")}>{label}</span>
      </Link>
    );
  });
}
