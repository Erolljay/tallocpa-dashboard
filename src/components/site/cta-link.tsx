import type { ComponentProps } from "react";
import { ButtonLink } from "@/components/base/buttons/button";

/**
 * A call to action that carries the visit's attribution (utm_*, ref, click ids)
 * to the page it opens, so a lead from a Facebook post or ad keeps its source
 * on /start. The first landing's params are kept for the visit in session
 * storage, so they survive a few clicks around the site.
 *
 * The server renders the plain href, marked `data-attribution`; after hydration
 * AttributionKeeper (attribution-keeper.tsx) adds the params to every marked link.
 * It renders on the server, so the website ships no button code to the browser
 * for it. A client component whose href changes (the intake picker) passes
 * withAttribution(href, useAttribution()) itself.
 */
type CtaLinkProps = Omit<ComponentProps<typeof ButtonLink>, "href" | "leadingIcon" | "trailingIcon" | "ref"> & { href: string };

export function CtaLink({ href, ...props }: CtaLinkProps) {
  return <ButtonLink href={href} data-attribution="" {...props} />;
}
