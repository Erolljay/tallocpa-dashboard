import Link from "next/link";
import { Suspense } from "react";
import { getIdentity } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";

/*
 * The pages that sit under one sidebar place (rework, 25 November 2026): Home has
 * My work, tasks and the team calendar, Clients has customers and suppliers, requests and registrations,
 * Filings has Review and the SSS, PhilHealth and Pag-IBIG remittances. BoardUI underline tabs, as links so each page keeps its URL.
 */
export const SECTIONS = {
  home: [
    { key: "overview", label: "Overview", href: "/app" },
    { key: "work", label: "My work", href: "/app/work" },
    { key: "tasks", label: "Tasks", href: "/app/tasks" },
    { key: "calendar", label: "Team calendar", href: "/app/calendar" },
  ],
  clients: [
    { key: "clients", label: "Clients", href: "/app/clients" },
    { key: "parties", label: "Customers & suppliers", href: "/app/parties" },
    { key: "requests", label: "Requests", href: "/app/requests" },
    { key: "registrations", label: "Registrations", href: "/app/registrations" },
  ],
  filings: [
    { key: "deadlines", label: "Deadlines", href: "/app/deadlines" },
    { key: "review", label: "To review", href: "/app/review" },
    { key: "remittances", label: "SSS · PhilHealth · Pag-IBIG", href: "/app/remittances" },
  ],
  inbox: [
    { key: "documents", label: "Waiting for approval", href: "/app/documents" },
    { key: "cycle", label: "Month status", href: "/app/cycle" },
  ],
} as const;

type Section = keyof typeof SECTIONS;
type TabKey<S extends Section> = (typeof SECTIONS)[S][number]["key"];

export function SectionTabs<S extends Section>({ section, active, hide = [] }: { section: S; active: TabKey<S>; hide?: TabKey<S>[] }) {
  const tabs = (SECTIONS[section] as readonly { key: string; label: string; href: string }[]).filter((t) => !(hide as string[]).includes(t.key));
  return (
    <nav aria-label="Section" className="-mt-2 mb-6 flex gap-1 overflow-x-auto border-b border-separator-border">
      {tabs.map((t) => {
        const current = t.key === active;
        return (
          <Link
            key={t.key}
            href={t.href}
            aria-current={current ? "page" : undefined}
            className={cx(
              "-mb-px inline-flex items-center border-b-2 px-2.5 py-2 whitespace-nowrap transition-colors duration-150",
              "outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-border-focus-ring",
              current ? "border-accent-600 text-body-medium text-accent-600" : "border-transparent text-body-regular text-text-secondary hover:text-text-primary",
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Filings tabs: "To review" only for the Owner, reviewers, and staff who review a client. */
export function FilingsTabs({ active }: { active: TabKey<"filings"> }) {
  return (
    <Suspense fallback={<SectionTabs section="filings" active={active} hide={active === "review" ? [] : ["review"]} />}>
      <FilingsTabsFor active={active} />
    </Suspense>
  );
}

async function FilingsTabsFor({ active }: { active: TabKey<"filings"> }) {
  const id = await getIdentity();
  let reviews = id.staff?.role === "owner" || id.staff?.role === "reviewer";
  if (!reviews && id.staff) {
    const supabase = await supabaseServer();
    const { count } = await supabase.from("staff_assignments").select("client_id", { count: "exact", head: true }).eq("user_id", id.userId).eq("role", "reviewer");
    reviews = (count ?? 0) > 0;
  }
  return <SectionTabs section="filings" active={active} hide={reviews ? [] : ["review"]} />;
}
