"use client";

import { useEffect, useId, useState, type MouseEvent, type ReactNode } from "react";

/**
 * The phone menu: a disclosure under the header, closed by a link, Escape or the button.
 * Only the open state lives here; the header (chrome.tsx) renders the icons and the
 * panel's links on the server, so the browser gets no button or icon code for it.
 */
export function MobileMenu({ openIcon, closeIcon, children }: { openIcon: ReactNode; closeIcon: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Any link in the panel closes it. */
  const onPanelClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest("a")) setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-xl text-foreground-icon-primary outline-none hover:bg-background-secondary-default active:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring"
      >
        {open ? closeIcon : openIcon}
      </button>
      <div
        id={id}
        hidden={!open}
        onClick={onPanelClick}
        className="absolute inset-x-0 top-full border-b border-separator-border bg-background-primary-default px-4 pt-2 pb-6 shadow-md"
      >
        {children}
      </div>
    </div>
  );
}
