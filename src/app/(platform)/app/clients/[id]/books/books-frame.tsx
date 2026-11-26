import Link from "next/link";
import type { ReactNode } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadModuleCounts } from "@/lib/books/data";
import { BOOKS_MODULES, booksHref, COUNTED, shiftMonth, type BooksModule, type BooksRange } from "@/lib/books/ui";
import { cx } from "@/utils/cx";
import { ClientTabs } from "../client-tabs";
import { BooksLockBar } from "./lock-bar";
import { MonthSelect } from "./month-select";

/**
 * The Books shell (Manager.io style, docs/REWORK.md decision 5): the client tabs, a
 * header with the month and the month's lock, and the module list on the start side
 * with counts. Each Books page renders its own content inside.
 */
export async function BooksFrame({
  supabase,
  clientId,
  clientName,
  booksStart,
  month,
  active,
  sub = "",
  at,
  query = {},
  range,
  children,
}: {
  supabase: SupabaseClient;
  clientId: string;
  clientName: string;
  booksStart: string;
  month: string;
  active: BooksModule;
  /** Sub-path under the module ("/new", "/<id>"), kept when the month changes. */
  sub?: string;
  /** A page outside the modules (e.g. "/tools"), under /books; replaces module and sub. */
  at?: string;
  /** Other query kept when the month changes (search, party, kind). */
  query?: Record<string, string | null | undefined>;
  /** The period the page's lists cover (Month, Quarter or Year to date); the month when omitted. */
  range?: BooksRange;
  children: ReactNode;
}) {
  const counts = await loadModuleCounts(supabase, clientId, month);
  const startMonth = booksStart.slice(0, 7);
  const view = range?.view ?? "month";
  // A quarter moves a quarter at a time, from its first month.
  const step = view === "quarter" ? 3 : 1;
  const anchor = view === "quarter" && range ? shiftMonth(range.endMonth, -2) : month;
  const prev = shiftMonth(anchor, -step);
  const kept = Object.fromEntries(Object.entries(query).filter(([, v]) => v)) as Record<string, string>;
  const path = at ? `/app/clients/${clientId}/books${at}` : booksHref(clientId, active, null, {}, sub);
  const hrefFor = (m: string) => `${path}?${new URLSearchParams({ ...kept, month: m, view: range?.view ?? "month" }).toString()}`;
  return (
    <>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-title-1-medium text-text-primary">Books</h1>
          <p className="mt-1 text-body-regular text-text-secondary">{clientName}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <MonthSelect
            path={path}
            month={month}
            min={startMonth}
            query={new URLSearchParams(kept).toString()}
            prevHref={shiftMonth(prev, step - 1) >= startMonth ? hrefFor(prev) : null}
            nextHref={hrefFor(shiftMonth(anchor, step))}
            view={view}
            label={range?.label ?? ""}
          />
          <BooksLockBar clientId={clientId} month={month} />
        </div>
      </div>
      <ClientTabs clientId={clientId} active="books" work />
      <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <nav aria-label="Books modules" className="min-w-0">
          <ul className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {BOOKS_MODULES.map((m) => {
              const on = m.key === active;
              const n = COUNTED.includes(m.key) ? counts[m.key] : undefined;
              return (
                <li key={m.key} className="shrink-0">
                  <Link
                    href={booksHref(clientId, m.key, month)}
                    aria-current={on ? "page" : undefined}
                    className={cx(
                      "flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-body-medium whitespace-nowrap transition-colors duration-150",
                      "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                      on ? "bg-background-secondary-default text-text-primary" : "text-text-secondary hover:bg-background-secondary-hover hover:text-text-primary",
                    )}
                  >
                    {m.label}
                    {n != null && <span className={cx("rounded-sm px-1.5 text-caption-1-medium tabular-nums", on ? "bg-background-primary-default text-text-primary" : "bg-background-tertiary-default text-text-secondary")}>{n}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="min-w-0 space-y-6">{children}</div>
      </div>
    </>
  );
}
