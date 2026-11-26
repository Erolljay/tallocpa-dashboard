"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Input, LinkButton } from "@/components/ui";

/**
 * The month in the Books header: previous / next, or pick one. Moves to the same
 * module with ?month=YYYY-MM (other query kept as given in `query`).
 */
export function MonthSelect({ path, month, min, query, prevHref, nextHref }: { path: string; month: string; min: string; query: string; prevHref: string | null; nextHref: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const go = (m: string) => {
    if (!/^\d{4}-\d{2}$/.test(m)) return;
    const q = new URLSearchParams(query);
    q.set("month", m);
    start(() => router.push(`${path}?${q.toString()}`));
  };
  return (
    <div className="flex items-center gap-1.5" aria-busy={pending || undefined}>
      {prevHref ? (
        <LinkButton href={prevHref} variant="secondary" size="sm" aria-label="Previous month" className="px-1.5">
          <RiArrowLeftSLine aria-hidden className="size-4 rtl:-scale-x-100" />
        </LinkButton>
      ) : null}
      <label htmlFor="books-month" className="sr-only">Month</label>
      <Input id="books-month" type="month" value={month} min={min} onChange={(e) => go(e.target.value)} className="w-40 tabular-nums" />
      <LinkButton href={nextHref} variant="secondary" size="sm" aria-label="Next month" className="px-1.5">
        <RiArrowRightSLine aria-hidden className="size-4 rtl:-scale-x-100" />
      </LinkButton>
    </div>
  );
}
