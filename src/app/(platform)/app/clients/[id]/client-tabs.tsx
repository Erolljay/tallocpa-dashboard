import Link from "next/link";
import { cx } from "@/utils/cx";

/** Older tab names still passed by some pages; they light up the tab they now sit under. */
export type ClientTab = "overview" | "inbox" | "books" | "returns" | "year-end" | "onboarding" | "register" | "batch" | "workpapers" | "fixed-assets" | "payroll";

const UNDER: Partial<Record<ClientTab, ClientTab>> = {
  onboarding: "overview",
  register: "overview",
  batch: "overview",
  workpapers: "overview",
  "fixed-assets": "books",
  payroll: "books",
};

/**
 * The tabs across a client's pages (docs/REWORK.md, Navigation): Overview · Inbox ·
 * Books · Returns · Year-end. The work tabs show to the Owner and the staff assigned
 * to the client, for every client: tax compliance needs the books too, so Books and
 * Year-end do not wait on a bookkeeping engagement.
 * Onboarding, the register, batch upload and workpapers are reached from the
 * Overview; payroll and fixed assets from the Books.
 */
export function ClientTabs({ clientId, active, work }: { clientId: string; active: ClientTab; work: boolean; onboarding?: { done: number; total: number } }) {
  const c = `/app/clients/${clientId}`;
  const current = UNDER[active] ?? active;
  const tabs: [ClientTab, string, string, boolean][] = [
    ["overview", "Overview", c, true],
    ["inbox", "Inbox", `/app/documents?client=${clientId}`, work],
    ["books", "Books", `${c}/books`, work],
    ["returns", "Returns", `${c}/returns`, work],
    ["year-end", "Year-end", `${c}/year-end`, work],
  ];
  return (
    <nav aria-label="Client" className="mb-6 flex gap-1 overflow-x-auto border-b border-separator-border">
      {tabs.filter(([, , , show]) => show).map(([key, label, href]) => (
        <Link
          key={key}
          href={href}
          aria-current={key === current ? "page" : undefined}
          className={cx(
            "-mb-px shrink-0 border-b-2 px-3 py-2 text-body-medium outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
            key === current ? "border-accent-600 text-text-primary" : "border-transparent text-text-secondary hover:text-text-primary",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
