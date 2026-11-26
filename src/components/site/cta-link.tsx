"use client";

import { useEffect, useSyncExternalStore, type ComponentProps } from "react";
import { ButtonLink } from "@/components/base/buttons/button";
import { ATTRIBUTION_KEY, pickAttribution, withAttribution } from "@/lib/site/attribution";

/**
 * A call to action that carries the visit's attribution (utm_*, ref, click ids)
 * to the page it opens, so a lead from a Facebook post or ad keeps its source
 * on /start. The first landing's params are kept for the visit in session
 * storage, so they survive a few clicks around the site.
 *
 * The server renders the plain href; the browser adds the params after hydration.
 */
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

/* Icons are component references, which cannot cross from a server component into this one. */
type CtaLinkProps = Omit<ComponentProps<typeof ButtonLink>, "href" | "leadingIcon" | "trailingIcon" | "ref"> & { href: string };

export function CtaLink({ href, ...props }: CtaLinkProps) {
  const attribution = useAttribution();
  return <ButtonLink href={withAttribution(href, attribution)} {...props} />;
}

/** Keeps attribution on the first landing even on pages without a CTA in view. */
export function AttributionKeeper() {
  useAttribution();
  return null;
}
