import Link from "next/link";
import { Suspense } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Badge, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { manilaToday } from "@/lib/filings/run";
import type { MonthStatus } from "@/lib/parallel-run/compare";
import { loadFirmParallelRun } from "@/lib/parallel-run/load";
import { supabaseServer } from "@/lib/supabase/server";

export default function FirmParallelRunPage(props: PageProps<"/app/firm/parallel-run">) {
  return (
    <>
      <PageHeader
        title="Parallel run"
        description="Each client's months, old register beside the Books by tax code, to the centavo. The old register screens go once every month with figures agrees."
      />
      <Suspense fallback={<Skeleton rows={10} />}>
        <Summary searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

const CELL: Record<MonthStatus, { tone: "done" | "blocked" | "waiting" | "neutral"; label: string }> = {
  agree: { tone: "done", label: "Agrees" },
  differ: { tone: "blocked", label: "Differs" },
  no_old: { tone: "waiting", label: "No old data" },
  empty: { tone: "neutral", label: "Nothing" },
};

const monthShort = (m: string) => new Intl.DateTimeFormat("en-PH", { month: "short", timeZone: "UTC" }).format(new Date(`${m.slice(0, 7)}-01T00:00:00Z`));

async function Summary({ searchParams }: Pick<PageProps<"/app/firm/parallel-run">, "searchParams">) {
  await requireOwner();
  const sp = await searchParams;
  const today = manilaToday();
  const thisYear = Number(today.slice(0, 4));
  const raw = Number(Array.isArray(sp.year) ? sp.year[0] : sp.year);
  const year = Number.isInteger(raw) && raw >= 2000 && raw <= thisYear ? raw : thisYear;
  const lastMonth = year === thisYear ? Number(today.slice(5, 7)) : 12;
  const months = Array.from({ length: lastMonth }, (_, i) => `${year}-${String(i + 1).padStart(2, "0")}-01`);

  const supabase = await supabaseServer();
  const clients = await loadFirmParallelRun(supabase, months);
  const cells = clients.flatMap((c) => c.months.filter((m) => m != null));
  const count = (s: MonthStatus) => cells.filter((m) => m!.status === s).length;
  const ready = clients.filter((c) => c.months.some((m) => m?.status === "agree") && c.months.every((m) => m == null || m.status === "agree" || m.status === "empty"));
  const yearHref = (y: number) => `/app/firm/parallel-run?year=${y}`;
  const navLink = "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-body-medium text-text-secondary hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-body-regular text-text-secondary tabular-nums">
          {count("agree")} agree · {count("differ")} differ · {count("no_old")} with no old data · {ready.length} of {clients.length} client{clients.length === 1 ? "" : "s"} ready to retire the old screens
        </p>
        <nav aria-label="Year" className="flex items-center gap-1">
          <Link href={yearHref(year - 1)} className={navLink}>
            <RiArrowLeftSLine aria-hidden className="size-4 rtl:rotate-180" />
            {year - 1}
          </Link>
          <span className="px-2 text-headline-medium text-text-primary tabular-nums">{year}</span>
          {year < thisYear && (
            <Link href={yearHref(year + 1)} className={navLink}>
              {year + 1}
              <RiArrowRightSLine aria-hidden className="size-4 rtl:rotate-180" />
            </Link>
          )}
        </nav>
      </div>

      {clients.length === 0 ? (
        <Notice tone="waiting">No client keeps Books yet, so there is nothing to compare.</Notice>
      ) : (
        <section className="min-w-0 rounded-3xl border border-border-button-default bg-background-primary-default">
          <h2 className="border-b border-separator-border px-5 py-4 text-title-3-semibold text-text-secondary">Clients with Books, {year}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-body-regular" style={{ minWidth: `${16 + months.length * 7}rem` }}>
              <thead className="text-body-medium text-text-tertiary">
                <tr>
                  <th scope="col" className="px-3 py-2.5 ps-5 text-start whitespace-nowrap">Client</th>
                  {months.map((m) => (
                    <th key={m} scope="col" className="px-2 py-2.5 text-start whitespace-nowrap">{monthShort(m)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.clientId} className="border-t border-separator-border align-top">
                    <th scope="row" className="px-3 py-2 ps-5 text-start text-body-regular">
                      <Link
                        href={`/app/clients/${c.clientId}/books/reports/parallel-run?month=${months[months.length - 1].slice(0, 7)}&by=quarter`}
                        className="rounded-sm text-body-medium text-text-primary hover:underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                      >
                        {c.name}
                      </Link>
                      <span className="block text-caption-1-regular text-text-tertiary">
                        {c.code ? `${c.code} · ` : ""}Books from {c.booksStart.slice(0, 7)}
                      </span>
                      {c.error && <span className="block text-caption-1-regular text-text-error-primary">{c.error}</span>}
                    </th>
                    {c.months.map((m, i) => (
                      <td key={months[i]} className="px-2 py-2">
                        {m == null ? (
                          <span className="text-caption-1-regular text-text-tertiary">{c.error ? "" : "Before Books"}</span>
                        ) : (
                          <Link
                            href={`/app/clients/${c.clientId}/books/reports/parallel-run?month=${m.month.slice(0, 7)}`}
                            className="inline-flex flex-col gap-0.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                            aria-label={`${c.name}, ${monthShort(m.month)}: ${CELL[m.status].label}${m.status === "differ" ? `, ${m.differences} difference${m.differences === 1 ? "" : "s"}` : ""}`}
                          >
                            <Badge tone={CELL[m.status].tone}>{CELL[m.status].label}</Badge>
                            {m.status === "differ" && <span className="ps-1 text-caption-1-regular text-text-tertiary tabular-nums">{m.differences} item{m.differences === 1 ? "" : "s"}</span>}
                          </Link>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      <p className="text-caption-1-regular text-text-tertiary">
        Agrees: every compared figure, SLS customer, SLP supplier and ATC is the same on both sides. No old data: the Books have invoices but the register has no line that month (invoices typed into the Books have no register line). Months before a client&rsquo;s Books start are not compared.
      </p>
    </div>
  );
}
