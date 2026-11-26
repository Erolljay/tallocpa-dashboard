"use client";

import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { CtaLink } from "./cta-link";

/** The phone menu: a disclosure under the header, closed by a link, Escape or the button. */
export function MobileMenu({ links, quoteHref, quoteLabel }: { links: { href: string; label: string }[]; quoteHref: string; quoteLabel: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const Icon = open ? RiCloseLine : RiMenuLine;
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-xl text-foreground-icon-primary outline-none hover:bg-background-secondary-default active:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring"
      >
        <Icon className="size-6" aria-hidden />
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-separator-border bg-background-primary-default px-4 pt-2 pb-6 shadow-md"
      >
        <nav aria-label="Site">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-2 text-headline-medium text-text-primary outline-none hover:bg-background-secondary-default active:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <CtaLink href={quoteHref} className="mt-4 h-11 w-full">
          {quoteLabel}
        </CtaLink>
      </div>
    </div>
  );
}
