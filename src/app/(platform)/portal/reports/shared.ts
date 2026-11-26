import type { PortalClient } from "../client-context";

/** The business a Reports page is about: `?client=` when it is one of the user's, else the first. */
export function pickClient(clients: PortalClient[], requested: string | string[] | undefined): PortalClient | null {
  return clients.find((c) => c.id === requested) ?? clients[0] ?? null;
}

const monthFmt = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" });
const shortMonthFmt = new Intl.DateTimeFormat("en-PH", { month: "short", timeZone: "UTC" });

/** "January 2026" for a YYYY-MM-DD (or YYYY-MM) date. */
export const monthLabel = (d: string) => monthFmt.format(new Date(`${d.slice(0, 7)}-01T00:00:00Z`));
/** "Jan". */
export const shortMonth = (d: string) => shortMonthFmt.format(new Date(`${d.slice(0, 7)}-01T00:00:00Z`));

/** A portal Reports link with its search params (empty ones left out). */
export function reportsHref(path: string, params: Record<string, string | null | undefined>): string {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) q.set(k, v);
  const s = q.toString();
  return s ? `${path}?${s}` : path;
}

export const linkClass = "text-body-medium text-button-ghost-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring rounded-md";
export const listClass = "divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default text-body-regular";
export const emptyClass = "rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary";
export const rowLi = "overflow-hidden first:rounded-t-3xl last:rounded-b-3xl";
