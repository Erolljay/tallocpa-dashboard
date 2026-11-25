import Link from "next/link";
import { cx } from "@/utils/cx";

export type ClientTab = "overview" | "onboarding" | "register" | "batch" | "workpapers" | "fixed-assets" | "books" | "payroll";

/**
 * The tabs across a client's pages. The work tabs show to the Owner and the staff
 * assigned to the client; Books only with an active bookkeeping engagement.
 */
export function ClientTabs({ clientId, active, work, books, onboarding }: { clientId: string; active: ClientTab; work: boolean; books: boolean; onboarding?: { done: number; total: number } }) {
  const c = `/app/clients/${clientId}`;
  const tabs: [ClientTab, string, string, boolean][] = [
    ["overview", "Overview", c, true],
    ["onboarding", onboarding ? `Onboarding ${onboarding.done}/${onboarding.total}` : "Onboarding", `${c}/onboarding`, true],
    ["register", "Register", `${c}/register`, work],
    ["batch", "Batch upload", `${c}/batch`, work],
    ["workpapers", "Workpapers", `${c}/workpapers`, work],
    ["fixed-assets", "Fixed assets", `${c}/fixed-assets`, work],
    ["books", "Books", `${c}/books`, work && books],
    ["payroll", "Payroll", `${c}/payroll`, work],
  ];
  return (
    <nav aria-label="Client" className="mb-6 flex gap-1 overflow-x-auto border-b border-separator-border">
      {tabs.filter(([, , , show]) => show).map(([key, label, href]) => (
        <Link
          key={key}
          href={href}
          aria-current={key === active ? "page" : undefined}
          className={cx(
            "-mb-px shrink-0 border-b-2 px-3 py-2 text-body-medium outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
            key === active ? "border-accent-600 text-text-primary" : "border-transparent text-text-secondary hover:text-text-primary",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
