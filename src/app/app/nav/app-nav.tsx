"use client";

import {
  RiBarChartBoxLine,
  RiCalendarCheckLine,
  RiCalendarScheduleLine,
  RiFileList3Line,
  RiGroupLine,
  RiHomeLine,
  RiSettings4Line,
  RiShieldCheckLine,
  RiTeamLine,
  RiWallet3Line,
} from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/utils/cx";

const items = {
  dashboard: { href: "/app", label: "Dashboard", icon: RiHomeLine },
  clients: { href: "/app/clients", label: "Clients", icon: RiGroupLine },
  deadlines: { href: "/app/deadlines", label: "Deadlines", icon: RiCalendarScheduleLine },
  documents: { href: "/app/documents", label: "Documents", icon: RiFileList3Line },
  cycle: { href: "/app/cycle", label: "Monthly cycle", icon: RiCalendarCheckLine },
  review: { href: "/app/review", label: "Review", icon: RiShieldCheckLine },
  collections: { href: "/app/collections", label: "Collections", icon: RiWallet3Line },
  scores: { href: "/app/scores", label: "Scores", icon: RiBarChartBoxLine },
  staff: { href: "/app/staff", label: "Staff", icon: RiTeamLine },
  settings: { href: "/app/settings", label: "Settings", icon: RiSettings4Line },
} as const;

export type NavKey = keyof typeof items;

/** Sidebar rows in BoardUI's sidebar style: the current page is the filled accent row. */
export function NavLinks({ keys }: { keys: readonly NavKey[] }) {
  return <Links keys={keys} path={usePathname()} />;
}

/** Same rows with nothing selected: the Suspense fallback while the URL is read. */
export function NavLinksFallback({ keys }: { keys: readonly NavKey[] }) {
  return <Links keys={keys} path={null} />;
}

function Links({ keys, path }: { keys: readonly NavKey[]; path: string | null }) {
  const active = (href: string) => path !== null && (href === "/app" ? path === "/app" : path === href || path.startsWith(`${href}/`));
  return keys.map((key) => {
    const { href, label, icon: Icon } = items[key];
    const current = active(href);
    return (
      <Link
        key={href}
        href={href}
        aria-current={current ? "page" : undefined}
        className={cx(
          "flex shrink-0 items-center gap-2 rounded-2lg p-2 transition-colors duration-150 pointer-coarse:min-h-11",
          "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
          current ? "bg-linear-to-b from-accent-500 to-accent-600 shadow-nav-selected" : "hover:bg-background-secondary-hover",
        )}
      >
        <Icon aria-hidden className={cx("size-5 shrink-0", current ? "text-text-white" : "text-foreground-icon-secondary")} />
        <span className={cx("text-body-medium whitespace-nowrap", current ? "text-text-white" : "text-text-secondary")}>{label}</span>
      </Link>
    );
  });
}
