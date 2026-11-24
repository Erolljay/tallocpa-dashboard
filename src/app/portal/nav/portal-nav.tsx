"use client";

import { RiFileList3Line, RiFileTextLine, RiFolderOpenLine, RiGroupLine, RiUploadCloud2Line } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/utils/cx";

const baseTabs = [
  { href: "/portal", label: "Upload", icon: RiUploadCloud2Line },
  { href: "/portal/documents", label: "Documents", icon: RiFolderOpenLine },
  { href: "/portal/returns", label: "Returns", icon: RiFileTextLine },
  { href: "/portal/statement", label: "Statement", icon: RiFileList3Line },
] as const;
const payrollTab = { href: "/portal/payroll", label: "Payroll", icon: RiGroupLine } as const;

/** `payroll`: show the Payroll tab (the business has payroll set up). */
export function PortalNav({ variant, payroll = false }: { variant: "top" | "bottom"; payroll?: boolean }) {
  const path = usePathname();
  const tabs = payroll ? [...baseTabs.slice(0, 3), payrollTab, baseTabs[3]] : baseTabs;
  const active = (href: string) => (href === "/portal" ? path === "/portal" : path.startsWith(href));
  if (variant === "bottom") {
    return (
      <ul className={`grid ${payroll ? "grid-cols-5" : "grid-cols-4"}`}>
        {tabs.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link href={href} aria-current={active(href) ? "page" : undefined} className={cx("flex min-h-[52px] flex-col items-center justify-center gap-1 text-caption-2-medium transition-colors", active(href) ? "text-button-ghost-foreground" : "text-text-tertiary")}>
              <Icon aria-hidden className="size-6" />
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
            <Icon aria-hidden className="size-[18px]" />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
