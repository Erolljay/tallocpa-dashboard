"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { SegmentedControl, SegmentedControlItem } from "@/components/base/segmented-control/segmented-control";
import { Input, LinkButton } from "@/components/ui";
import { BOOKS_VIEW_COOKIE, BOOKS_VIEWS, type BooksView } from "@/lib/books/ui";

/**
 * The period in the Books header: Month, Quarter or Year to date (kept for every
 * Books page), then previous / next or pick a month. In a quarter the arrows move a
 * quarter; the month picked chooses the quarter, or where the year to date ends.
 * Moves to the same module with ?month=YYYY-MM (other query kept as given in `query`).
 */
export function MonthSelect({ path, month, min, query, prevHref, nextHref, view, label }: { path: string; month: string; min: string; query: string; prevHref: string | null; nextHref: string; view: BooksView; label: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const go = (m: string, v: BooksView = view) => {
    if (!/^\d{4}-\d{2}$/.test(m)) return;
    const q = new URLSearchParams(query);
    q.set("month", m);
    q.set("view", v);
    start(() => router.push(`${path}?${q.toString()}`));
  };
  const setView = (v: BooksView) => {
    try {
      document.cookie = `${BOOKS_VIEW_COOKIE}=${v}; path=/app/clients; max-age=31536000; samesite=lax`;
    } catch {
      // The URL still carries the view.
    }
    go(month, v);
  };
  const unit = view === "quarter" ? "quarter" : "month";
  return (
    <div className="flex flex-wrap items-center gap-2" aria-busy={pending || undefined}>
      <SegmentedControl aria-label="Period" selectedKeys={[view]} onSelectionChange={(keys) => { const v = [...keys][0]; if (v && v !== view) setView(v as BooksView); }}>
        {BOOKS_VIEWS.map((v) => <SegmentedControlItem key={v.key} id={v.key}>{v.label}</SegmentedControlItem>)}
      </SegmentedControl>
      <div className="flex items-center gap-1.5">
        {prevHref ? (
          <LinkButton href={prevHref} variant="secondary" size="sm" aria-label={`Previous ${unit}`} className="px-1.5">
            <RiArrowLeftSLine aria-hidden className="size-4 rtl:-scale-x-100" />
          </LinkButton>
        ) : null}
        <label htmlFor="books-month" className="sr-only">{view === "ytd" ? "Year to date, up to the end of" : view === "quarter" ? "A month in the quarter" : "Month"}</label>
        <Input id="books-month" type="month" value={month} min={min} onChange={(e) => go(e.target.value)} className="w-40 tabular-nums" />
        <LinkButton href={nextHref} variant="secondary" size="sm" aria-label={`Next ${unit}`} className="px-1.5">
          <RiArrowRightSLine aria-hidden className="size-4 rtl:-scale-x-100" />
        </LinkButton>
      </div>
      {view !== "month" && <span className="text-caption-1-regular text-text-tertiary">{label}</span>}
    </div>
  );
}
