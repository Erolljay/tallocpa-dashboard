"use client";

import { RiBankCardLine, RiBarChartBoxLine, RiFileTextLine, RiFileTransferLine, RiFolderOpenLine, RiGroupLine, RiQuestionAnswerLine, RiUploadCloud2Line } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/utils/cx";

const baseTabs = [
  { href: "/portal", label: "Upload", icon: RiUploadCloud2Line },
  { href: "/portal/documents", label: "Documents", icon: RiFolderOpenLine },
  { href: "/portal/returns", label: "Returns", icon: RiFileTextLine },
  { href: "/portal/billing", label: "Billing", icon: RiBankCardLine },
] as const;
const payrollTab = { href: "/portal/payroll", label: "Payroll", icon: RiGroupLine } as const;
const reportsTab = { href: "/portal/reports", label: "Reports", icon: RiBarChartBoxLine } as const;
const requestsTab = { href: "/portal/requests", label: "Requests", icon: RiQuestionAnswerLine } as const;
const registrationTab = { href: "/portal/registration", label: "Registration", icon: RiFileTransferLine } as const;
const GRID_COLS: Record<number, string> = { 4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6" };

/**
 * `payroll`: show the Payroll tab (the business has payroll set up). `reports`: show Reports (a report has been released).
 * `registration`: show Registration (we are registering, renewing or updating the business). `pending`: requests waiting on the client, as a count on Requests.
 */
export function PortalNav({ variant, payroll = false, reports = false, registration = false, pending = 0 }: { variant: "top" | "bottom"; payroll?: boolean; reports?: boolean; registration?: boolean; pending?: number }) {
  const path = usePathname();
  const tabs = [
    ...baseTabs.slice(0, 3),
    ...(payroll ? [payrollTab] : []),
    ...(reports ? [reportsTab] : []),
    ...(registration ? [registrationTab] : []),
    requestsTab,
    baseTabs[3],
  ];
  const active = (href: string) => (href === "/portal" ? path === "/portal" : path.startsWith(href));
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
            <Link href={href} aria-current={active(href) ? "page" : undefined} className={cx("flex min-h-[52px] flex-col items-center justify-center gap-1 text-caption-2-medium transition-colors", active(href) ? "text-button-ghost-foreground" : "text-text-tertiary")}>
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
          <Link href={href} aria-current={active(href) ? "page" : undefined} className={cx(
              "my-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-body-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
              active(href) ? "bg-linear-to-b from-accent-500 to-accent-600 text-text-white shadow-nav-selected" : "text-text-secondary hover:bg-background-secondary-hover hover:text-text-primary",
            )}>
            <span className="relative"><Icon aria-hidden className="size-[18px]" />{badge(href)}</span>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
