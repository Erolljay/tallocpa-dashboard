"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { ATTRIBUTION_KEY, pickAttribution, withAttribution } from "@/lib/site/attribution";

function readAttribution(): string {
  const here = pickAttribution(window.location.search);
  if (here) return here;
  try {
    return sessionStorage.getItem(ATTRIBUTION_KEY) ?? "";
  } catch {
    return "";
  }
}

const noop = () => () => {};

/** The visit's attribution query string ("" on the server and when there is none); keeps the first landing's. */
export function useAttribution(): string {
  const attribution = useSyncExternalStore(noop, readAttribution, () => "");
  useEffect(() => {
    const here = pickAttribution(window.location.search);
    if (!here) return;
    try {
      sessionStorage.setItem(ATTRIBUTION_KEY, here);
    } catch {
      /* private mode: the current page's params still apply */
    }
  }, []);
  return attribution;
}

/**
 * Keeps attribution on the first landing, and adds it to every CtaLink on the page
 * (links marked `data-attribution`), again after each client-side navigation.
 */
export function AttributionKeeper() {
  const attribution = useAttribution();
  const pathname = usePathname();
  useEffect(() => {
    if (!attribution) return;
    for (const a of document.querySelectorAll<HTMLAnchorElement>("a[data-attribution]")) {
      const href = a.getAttribute("href");
      if (href) a.setAttribute("href", withAttribution(href, attribution));
    }
  }, [attribution, pathname]);
  return null;
}
