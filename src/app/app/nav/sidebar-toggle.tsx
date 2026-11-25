"use client";

import { RiArrowLeftSLine } from "@remixicon/react";
import { useLayoutEffect, useSyncExternalStore } from "react";
import { IconButton } from "@/components/base/buttons/icon-button";
import { SIDEBAR_ATTRIBUTE, SIDEBAR_COOKIE } from "@/lib/sidebar-state";
import { cx } from "@/utils/cx";

const CHANGE_EVENT = "tallo:sidebar-change";
const YEAR = 60 * 60 * 24 * 365;

const cookieSaysCollapsed = () => new RegExp(`(?:^|; )${SIDEBAR_COOKIE}=collapsed(?:;|$)`).test(document.cookie);
const isCollapsed = () => document.documentElement.getAttribute(SIDEBAR_ATTRIBUTE) === "collapsed";

function apply(collapsed: boolean) {
  if (collapsed) document.documentElement.setAttribute(SIDEBAR_ATTRIBUTE, "collapsed");
  else document.documentElement.removeAttribute(SIDEBAR_ATTRIBUTE);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

/**
 * Collapses the desktop sidebar to an icon rail. The layout itself follows the
 * `data-sidebar` attribute on <html> (set before paint from the cookie), so
 * this only owns the button's label and the write.
 */
export function SidebarToggle({ controls, className }: { controls: string; className?: string }) {
  // Server snapshot is "expanded"; React swaps in the DOM's value right after hydration.
  const collapsed = useSyncExternalStore(subscribe, isCollapsed, () => false);

  // React's dev remount resets <html> attributes; re-apply from the cookie (no-op in production).
  useLayoutEffect(() => {
    if (cookieSaysCollapsed() !== isCollapsed()) apply(cookieSaysCollapsed());
  }, []);

  const label = collapsed ? "Expand sidebar" : "Collapse sidebar";
  return (
    <IconButton
      icon={RiArrowLeftSLine}
      size="small"
      aria-label={label}
      title={label}
      aria-expanded={!collapsed}
      aria-controls={controls}
      onClick={() => {
        const next = !isCollapsed();
        document.cookie = `${SIDEBAR_COOKIE}=${next ? "collapsed" : "expanded"}; path=/; max-age=${YEAR}; SameSite=Lax`;
        apply(next);
      }}
      // The chevron points to the inline start (IconButton mirrors it in RTL);
      // mirroring the square button turns it to point back out when collapsed.
      className={cx("md:sidebar-collapsed:-scale-x-100", className)}
    />
  );
}
