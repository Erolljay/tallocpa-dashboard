import Link from "next/link";
import { Suspense } from "react";
import { CwtLooseDocuments, CwtTrackerGroups, CwtTrackerSummary } from "@/components/bir/cwt-tracker-view";
import { LinkButton, Notice, Skeleton } from "@/components/ui";
import { taxableYear } from "@/lib/books/cwt-tracker";
import { loadCwtTracker } from "@/lib/books/load-cwt-tracker";
import { manilaToday } from "@/lib/filings/run";
import { loadPortalBooks, portalBooksClient } from "@/lib/portal/books";
import { portalContext } from "../../client-context";
import { ParamSelect } from "../param-select";
import { emptyClass, pickClient } from "../shared";

export default function PortalCwt2307Page(props: PageProps<"/portal/reports/cwt-2307">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Tracker searchParams={props.searchParams} />
    </Suspense>
  );
}

/**
 * "2307s we still need": the tax the client's customers withheld on its sales (CWT) and
 * whether each customer's BIR 2307 is in, per customer and quarter, for months whose books
 * are locked. The client chases the missing ones and uploads them under Sales.
 */
async function Tracker({ searchParams }: Pick<PageProps<"/portal/reports/cwt-2307">, "searchParams">) {
  const q = await searchParams;
  const { supabase, clients } = await portalContext();
  const client = pickClient(clients, q.client);
  const head = (
    <div className="space-y-2">
      <Link href="/portal/reports" className="text-body-medium text-button-ghost-foreground hover:underline">← Reports</Link>
      <h1 className="text-title-1-medium text-text-primary">2307s from your customers</h1>
      <p className="text-body-regular text-text-secondary">
        When a customer withholds tax from what it pays you, it owes you a BIR Form 2307. Each 2307 lowers your income tax, so we need every one. Here is what your customers withheld and which 2307s are still missing. Months appear once we have closed their books.
      </p>
    </div>
  );
  if (!client) return <div className="space-y-6">{head}<p className={emptyClass}>Your account is not linked to a business yet.</p></div>;

  const [books, info] = await Promise.all([loadPortalBooks(supabase, client.id), portalBooksClient(supabase, client.id)]);
  if (!books) return <div className="space-y-6">{head}<p className={emptyClass}>Your books are not set up with us yet.</p></div>;
  const fye = info?.fiscal_year_end_month ?? 12;
  const years: { value: string; label: string }[] = [];
  for (let y = taxableYear(manilaToday(), fye); y.start >= taxableYear(books.booksStart, fye).start; y = taxableYear(`${Number(y.start.slice(0, 4)) - 1}${y.start.slice(4)}`, fye)) {
    years.push({ value: y.start, label: y.label });
  }
  const picked = years.find((y) => y.value === q.year)?.value ?? years[0].value;
  const t = await loadCwtTracker(supabase, client.id, picked, fye);
  const outstanding = t.groups.filter((g) => g.status !== "complete" && !g.stopped);

  return (
    <div className="space-y-6">
      {head}
      <div className="flex flex-wrap items-end gap-3">
        {clients.length > 1 && (
          <ParamSelect name="client" label="Business" value={client.id} options={clients.map((c) => ({ value: c.id, label: c.name }))} clear={["year"]} className="max-w-full sm:w-64" />
        )}
        {years.length > 1 && <ParamSelect name="year" label="Year" value={picked} options={years} className="w-48" />}
      </div>
      <CwtTrackerSummary totals={t.totals} audience="client" />
      {outstanding.length > 0 && (
        <Notice tone="waiting">
          {outstanding.length === 1 ? "One customer has" : `${outstanding.length} customer quarters have`} not sent all their 2307s. Ask them for it, then upload it under Sales.
        </Notice>
      )}
      <section className="space-y-3">
        <h2 className="text-title-3-semibold text-text-primary">Still needed</h2>
        <CwtTrackerGroups groups={outstanding} empty="Nothing missing. Every customer that withheld tax has sent its 2307." />
      </section>
      <CwtLooseDocuments title="Received, being checked" text="2307s you sent that we are still reviewing." docs={t.pending} />
      {t.groups.length > outstanding.length && (
        <section className="space-y-3">
          <h2 className="text-title-3-semibold text-text-primary">Complete</h2>
          <CwtTrackerGroups groups={t.groups.filter((g) => !outstanding.includes(g))} empty="" />
        </section>
      )}
      <LinkButton href="/portal/upload" variant="secondary">Upload a 2307</LinkButton>
    </div>
  );
}
