"use client";

import { FileCheck2, FolderOpen, Upload } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/portal", label: "Upload", icon: Upload },
  { href: "/portal/documents", label: "Documents", icon: FolderOpen },
  { href: "/portal/returns", label: "Returns", icon: FileCheck2 },
] as const;

export function PortalNav({ variant }: { variant: "top" | "bottom" }) {
  const path = usePathname();
  const active = (href: string) => (href === "/portal" ? path === "/portal" : path.startsWith(href));
  if (variant === "bottom") {
    return (
      <ul className="grid grid-cols-3">
        {tabs.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link href={href} aria-current={active(href) ? "page" : undefined} className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium ${active(href) ? "text-action" : "text-ink-muted"}`}>
              <Icon aria-hidden className="size-5" />
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
          <Link href={href} aria-current={active(href) ? "page" : undefined} className={`flex items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium ${active(href) ? "border-action text-ink-heading" : "border-transparent text-ink-muted hover:text-ink-heading"}`}>
            <Icon aria-hidden className="size-4" />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
