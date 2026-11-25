import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { manilaToday } from "@/lib/filings/run";
import { monthName } from "@/lib/lock/month-lock";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { MonthLock } from "../lock-bar";
import { loadLockContext } from "../lock-data";

/** The Books month locks of one year (docs/REWORK.md, decision 9), with each month's action. */
export default function BooksMonthsPage(props: PageProps<"/app/clients/[id]/books/months">) {
  return (
    <Suspense fallback={<Skeleton rows={12} />}>
      <Months params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

async function Months({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/books/months">, "params" | "searchParams">) {
  const { id } = await params;
  const sp = await searchParams;
  const today = manilaToday();
  const thisYear = Number(today.slice(0, 4));
  const asked = Number(one(sp.year));
  const year = Number.isInteger(asked) && asked >= 2000 && asked <= thisYear + 1 ? asked : thisYear;

  const supabase = await supabaseServer();
  const [{ data: client }, { data: books }] = await Promise.all([
    supabase.from("clients").select("id, name").eq("id", id).maybeSingle(),
    supabase.from("client_books").select("books_start").eq("client_id", id).maybeSingle(),
  ]);
  if (!client) notFound();
  const ctx = await loadLockContext(id, year);
  const nav = (y: number, label: string) => (
    <Link href={`/app/clients/${id}/books/months?year=${y}`} className="rounded-full border border-border-button-default px-3 py-1 text-body-regular text-text-secondary outline-none hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring">{label}</Link>
  );

  return (
    <>
      <PageHeader
        title={`Month locks ${year}`}
        description={<>{client.name}: the reviewer locks each month once its Inbox is clear. Returns appear only for locked months.</>}
        actions={<LinkButton href={`/app/clients/${id}/books`} variant="ghost">Back to Books</LinkButton>}
      />
      {!books && (
        <div className="mb-6"><Notice tone="waiting">The books are not set up yet. Set them up on the <Link href={`/app/clients/${id}/books`} className="underline">Books</Link> page first.</Notice></div>
      )}
      <nav aria-label="Year" className="mb-4 flex items-center gap-2">
        {nav(year - 1, String(year - 1))}
        {year < thisYear + 1 && nav(year + 1, String(year + 1))}
      </nav>
      <Card>
        <ul className="divide-y divide-separator-border">
          {ctx.months.map((m) => {
            const month = m.month.slice(0, 10);
            const current = month.slice(0, 7) === today.slice(0, 7);
            return (
              <li key={month} className="grid gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[10rem_1fr] sm:items-start">
                <div>
                  <p className={cx("text-body-medium", m.in_books ? "text-text-primary" : "text-text-tertiary")}>{monthName(month)}</p>
                  {current && <p className="text-caption-1-regular text-text-tertiary">This month</p>}
                  {m.in_books && m.waiting_documents > 0 && (
                    <Link href={`/app/documents?client=${id}`} className="text-caption-1-regular text-button-ghost-foreground hover:underline">{m.waiting_documents} in the Inbox</Link>
                  )}
                </div>
                <MonthLock clientId={id} month={m} ctx={ctx} compact />
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
}
