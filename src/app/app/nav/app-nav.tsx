"use client";

import { CalendarClock, CalendarRange, ClipboardCheck, FileText, LayoutDashboard, Settings, UserCog, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = {
  dashboard: { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  clients: { href: "/app/clients", label: "Clients", icon: Users },
  deadlines: { href: "/app/deadlines", label: "Deadlines", icon: CalendarClock },
  documents: { href: "/app/documents", label: "Documents", icon: FileText },
  cycle: { href: "/app/cycle", label: "Monthly cycle", icon: CalendarRange },
  review: { href: "/app/review", label: "Review", icon: ClipboardCheck },
  collections: { href: "/app/collections", label: "Collections", icon: Wallet },
  staff: { href: "/app/staff", label: "Staff", icon: UserCog },
  settings: { href: "/app/settings", label: "Settings", icon: Settings },
} as const;

export type NavKey = keyof typeof items;

/** Sidebar links, macOS-style: the current page sits in a tinted, selected row. */
export function NavLinks({ keys }: { keys: readonly NavKey[] }) {
  return <Links keys={keys} path={usePathname()} />;
}

/** Same links with nothing selected: the Suspense fallback while the URL is read. */
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
        className={`pressable flex min-h-9 shrink-0 items-center gap-2.5 rounded-[8px] px-3 text-sm font-medium pointer-coarse:min-h-11 ${
          current ? "bg-surface-tint-strong text-ink-on-tint" : "text-ink-strong hover:bg-surface-sunken"
        }`}
      >
        <Icon aria-hidden className={`size-4 ${current ? "text-ink-on-tint" : "text-ink-muted"}`} strokeWidth={2} />
        {label}
      </Link>
    );
  });
}
