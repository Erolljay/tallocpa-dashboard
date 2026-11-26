import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Badge, Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { loadAssets } from "@/lib/assets/load";
import { accumulated, bookFor, monthTotals, startMonth } from "@/lib/assets/schedule";
import { requireStaff } from "@/lib/auth";
import { showMonth } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { formatAmount } from "@/lib/returns/money";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { OpeningAssetForm, RunDepreciationButton, SetupAssetForm } from "./forms";

export default function FixedAssetsPage(props: PageProps<"/app/clients/[id]/fixed-assets">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <FixedAssets params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const amt = (c: number) => (c === 0 ? "—" : formatAmount(c));
const shortMonth = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso.slice(0, 7)}-01T00:00:00Z`));

function shiftMonth(month: string, n: number) {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + n, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

/**
 * Workpaper E (A1; Owner's decisions 12–17): the fixed asset register built from the
 * purchases register's capital goods, each asset's depreciation set up per item, and
 * the month's straight-line schedule — books and tax — that posts one entry.
 */
async function FixedAssets({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/fixed-assets">, "params" | "searchParams">) {
  const { id } = await params;
  const sp = await searchParams;
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const { data: client } = await supabase.from("clients").select("id, name").eq("id", id).maybeSingle();
  if (!client) notFound();
  if (me.staff.role !== "owner") {
    const { data: a } = await supabase.from("staff_assignments").select("user_id").eq("client_id", id).eq("user_id", me.userId).limit(1);
    if (!a?.length) notFound();
  }
  const { data: books } = await supabase.from("client_books").select("books_start").eq("client_id", id).maybeSingle();
  const month = /^\d{4}-\d{2}$/.test(one(sp.month)) ? one(sp.month) : shiftMonth(manilaToday().slice(0, 7), -1);
  const first = `${month}-01`;
  const href = (m: string) => `/app/clients/${id}/fixed-assets?month=${m}`;
  const header = (
    <PageHeader
      title="Fixed assets"
      description={<><Link href={`/app/clients/${id}`} className="text-button-ghost-foreground hover:underline">{client.name}</Link> · workpaper E: property and equipment and straight-line depreciation.</>}
      actions={
        <div className="flex items-center gap-1">
          <Link href={href(shiftMonth(month, -1))} aria-label="Previous month" className="inline-flex size-10 items-center justify-center rounded-2lg text-foreground-icon-secondary outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring"><RiArrowLeftSLine aria-hidden className="size-4" /></Link>
          <span className="min-w-36 text-center text-title-3-semibold text-text-primary">{showMonth(first)}</span>
          <Link href={href(shiftMonth(month, 1))} aria-label="Next month" className="inline-flex size-10 items-center justify-center rounded-2lg text-foreground-icon-secondary outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring"><RiArrowRightSLine aria-hidden className="size-4" /></Link>
        </div>
      }
    />
  );
  if (!books) {
    return <>{header}<Notice tone="waiting">Set up this client&apos;s account titles first (Books).</Notice></>;
  }

  const [assets, { data: run }, { data: accounts }] = await Promise.all([
    loadAssets(supabase, id),
    supabase.from("depreciation_runs").select("entry_id, run_at, journal_entries(status)").eq("client_id", id).eq("month", first).maybeSingle(),
    supabase.from("ledger_accounts").select("id, code, name, template_key").eq("client_id", id).eq("active", true).eq("fs_line", "ppe").eq("normal_side", "debit").order("sort_order"),
  ]);
  const t = monthTotals(assets, first);
  const waiting = assets.filter((a) => a.status === "setup");
  const active = assets.filter((a) => a.status === "active");
  const posted = run && (run.journal_entries as unknown as { status: string } | null)?.status === "posted";
  const blockedBy = waiting.filter((a) => a.acquiredOn < first);

  return (
    <>
      {header}
      <div className="space-y-6">
        {waiting.length > 0 && (
          <Card title={`Set up depreciation (${waiting.length})`}>
            <p className="mb-3 text-caption-1-regular text-text-tertiary">Capital goods from the purchases register (₱10,000 and up). Give each item its useful life; the residual value is ₱1 and depreciation starts the month after purchase.</p>
            <ul className="divide-y divide-separator-border">
              {waiting.map((a) => (
                <li key={a.id} className="space-y-2 py-3">
                  <p className="text-body-regular text-text-primary">
                    <span className="font-medium">E-{a.number}</span> · {a.assetAccount} · bought {a.acquiredOn} · cost {formatAmount(a.cost)}
                    {a.documentId && <> · <Link href={`/app/documents/${a.documentId}`} className="text-button-ghost-foreground hover:underline">source document</Link></>}
                  </p>
                  <SetupAssetForm clientId={id} assetId={a.id} description={a.description} />
                </li>
              ))}
            </ul>
          </Card>
        )}

        <Card title={`Register E (${active.length})`} actions={<span className="text-caption-1-regular text-text-tertiary">As of the end of {showMonth(first)}</span>}>
          {active.length === 0 ? (
            <p className="text-body-regular text-text-secondary">No assets set up yet.</p>
          ) : (
            <div className="-mx-6 overflow-x-auto px-6">
              <table className="w-full min-w-max text-body-regular">
                <thead className="border-b border-separator-border text-caption-1-regular text-text-tertiary">
                  <tr>{["No.", "Bought", "Asset", "Account", "Cost", "Input VAT", "Life", "Tax life", "Starts", "Monthly", "Accumulated", "Net book value"].map((h, i) => <th key={h} scope="col" className={cx("px-2 pb-2 font-medium whitespace-nowrap", i >= 4 && h !== "Starts" ? "text-end" : "text-start")}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {active.map((a) => {
                    const acc = accumulated(a, first);
                    return (
                      <tr key={a.id} className="border-b border-separator-border last:border-0">
                        <td className="px-2 py-2 tabular-nums">E-{a.number}</td>
                        <td className="px-2 py-2 tabular-nums whitespace-nowrap text-text-secondary">{a.acquiredOn}</td>
                        <td className="px-2 py-2">{a.description}{a.source === "opening" && <span className="ms-1.5 text-caption-1-regular text-text-tertiary">opening</span>}</td>
                        <td className="px-2 py-2 text-text-secondary">{a.assetAccount}</td>
                        <td className="px-2 py-2 text-end tabular-nums">{formatAmount(a.cost)}</td>
                        <td className="px-2 py-2 text-end tabular-nums">{amt(a.inputVat)}</td>
                        <td className="px-2 py-2 text-end tabular-nums">{a.lifeMonths}</td>
                        <td className="px-2 py-2 text-end tabular-nums">{a.taxLifeMonths}</td>
                        <td className="px-2 py-2 whitespace-nowrap">{shortMonth(startMonth(a.acquiredOn))}</td>
                        <td className="px-2 py-2 text-end tabular-nums">{amt(bookFor(a, first))}</td>
                        <td className="px-2 py-2 text-end tabular-nums">{amt(acc)}</td>
                        <td className="px-2 py-2 text-end tabular-nums">{formatAmount(a.cost - acc)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card title={`Depreciation, ${showMonth(first)}`} actions={posted ? <Badge tone="done">Posted</Badge> : undefined}>
          <dl className="grid grid-cols-[auto_auto] gap-x-6 gap-y-1 text-body-regular sm:w-max">
            <dt className="text-text-secondary">Books (Depreciation Expense)</dt><dd className="text-end tabular-nums text-text-primary">{amt(t.book)}</dd>
            <dt className="text-text-secondary">Tax column (for the 1701Q)</dt><dd className="text-end tabular-nums text-text-primary">{amt(t.tax)}</dd>
            <dt className="text-text-secondary">Difference</dt><dd className="text-end tabular-nums text-text-primary">{amt(t.tax - t.book)}</dd>
          </dl>
          <div className="mt-4">
            {posted ? (
              <p className="text-body-regular text-text-secondary">Posted to the books. To run it again, reverse its entry on the Books page.</p>
            ) : first < `${String(books.books_start).slice(0, 7)}-01` ? (
              <p className="text-body-regular text-text-secondary">Before the books start.</p>
            ) : blockedBy.length ? (
              <p className="text-body-regular text-text-secondary">Set up {blockedBy.map((a) => `E-${a.number}`).join(", ")} first.</p>
            ) : t.book > 0 ? (
              <RunDepreciationButton clientId={id} month={first} label={showMonth(first)} />
            ) : (
              <p className="text-body-regular text-text-secondary">Nothing to depreciate this month.</p>
            )}
          </div>
          <p className="mt-3 text-caption-1-regular text-text-tertiary">Posts one entry dated the month&apos;s end: Dr Depreciation Expense, Cr each Accumulated Depreciation account. The tax column uses each asset&apos;s tax life; the difference shows in the reconciliation of book and taxable income.</p>
        </Card>

        <Card title="Opening assets">
          <p className="mb-3 text-caption-1-regular text-text-tertiary">Assets bought before the books start ({String(books.books_start).slice(0, 10)}). Their cost and accumulated depreciation are in the opening balances; from then on they depreciate here.</p>
          <OpeningAssetForm clientId={id} accounts={(accounts ?? []).filter((a) => a.template_key !== "land").map((a) => ({ id: a.id, label: `${a.code} · ${a.name}` }))} before={String(books.books_start).slice(0, 10)} />
        </Card>

        <div className="flex flex-wrap gap-2">
          <LinkButton href={`/app/clients/${id}`} variant="secondary">Back to the client</LinkButton>
          <LinkButton href={`/app/clients/${id}/workpapers?month=${month}`} variant="secondary">Workpapers</LinkButton>
          <LinkButton href={`/app/clients/${id}/books`} variant="secondary">Books</LinkButton>
        </div>
      </div>
    </>
  );
}
