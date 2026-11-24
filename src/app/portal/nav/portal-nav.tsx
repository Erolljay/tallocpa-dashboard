"use client";

import { FileCheck2, FolderOpen, Receipt, Upload, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const baseTabs = [
  { href: "/portal", label: "Upload", icon: Upload },
  { href: "/portal/documents", label: "Documents", icon: FolderOpen },
  { href: "/portal/returns", label: "Returns", icon: FileCheck2 },
  { href: "/portal/statement", label: "Statement", icon: Receipt },
] as const;
const payrollTab = { href: "/portal/payroll", label: "Payroll", icon: Users } as const;

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
            <Link href={href} aria-current={active(href) ? "page" : undefined} className={`pressable flex min-h-[52px] flex-col items-center justify-center gap-1 text-[11px] leading-none font-medium ${active(href) ? "text-action" : "text-ink-subtle"}`}>
              <Icon aria-hidden className="size-6" strokeWidth={active(href) ? 2.25 : 1.75} />
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
          <Link href={href} aria-current={active(href) ? "page" : undefined} className={`pressable my-2 flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ${active(href) ? "bg-surface-tint-strong text-ink-on-tint" : "text-ink-muted hover:bg-surface-sunken hover:text-ink-heading"}`}>
            <Icon aria-hidden className="size-4" />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
