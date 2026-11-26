import Link from "next/link";
import { Suspense } from "react";
import { RiArrowDownSLine, RiFileTextLine, RiFolder3Line } from "@remixicon/react";
import { Badge, Skeleton } from "@/components/ui";
import { DOC_TYPES, docStatusLabel, docStatusTone, showMonth, type DocType } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { cx } from "@/utils/cx";
import { portalContext } from "../client-context";
import { ReplyForm } from "./reply-form";
import { YearSelect } from "./year-select";

export default function PortalDocuments(props: PageProps<"/portal/documents">) {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <Documents searchParams={props.searchParams} />
    </Suspense>
  );
}

interface Doc {
  id: string;
  client_id: string;
  doc_type: DocType;
  period: string;
  document_month: string;
  late: boolean;
  file_name: string;
  status: keyof typeof docStatusTone;
  return_reason: string | null;
  client_reply: string | null;
  created_at: string;
}

interface PayrollFile {
  id: string;
  client_id: string;
  pay_month: string;
  file_name: string;
  status: "pending" | "posted" | "returned";
  late: boolean;
  created_at: string;
}

/** One row in a month folder, whichever table it came from. */
interface Item {
  id: string;
  name: string;
  href: string | null;
  month: string;
  detail: string;
  tone: keyof typeof docStatusTone;
  status: string;
}

/** Folders, in the order a client thinks of them: what they sold, bought and paid, then the BIR certificates. */
const FOLDERS = [
  { key: "sales", label: "Sales", types: ["sales_invoice"] },
  { key: "purchases", label: "Purchases", types: ["purchase_receipt"] },
  { key: "payroll", label: "Payroll", types: [] },
  { key: "2307-received", label: "2307 received", types: ["bir_2307_received"] },
  { key: "cwt-issued", label: "CWT issued", types: ["bir_2307_issued"] },
  { key: "others", label: "Others", types: ["cor", "other"] },
] as const satisfies readonly { key: string; label: string; types: readonly DocType[] }[];
type FolderKey = (typeof FOLDERS)[number]["key"];

const MONTHS = Array.from({ length: 12 }, (_, m) => new Intl.DateTimeFormat("en-PH", { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2000, m, 1))));
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "Asia/Manila" }).format(new Date(iso));
const payrollStatus = {
  pending: { label: "Received", tone: "received" },
  posted: { label: "Posted", tone: "posted" },
  returned: { label: "Returned", tone: "returned" },
} as const;

async function Documents({ searchParams }: Pick<PageProps<"/portal/documents">, "searchParams">) {
  const sp = await searchParams;
  const { supabase, clients } = await portalContext();
  const ids = clients.map((c) => c.id);
  const thisYear = Number(manilaToday().slice(0, 4));
  const thisMonth = Number(manilaToday().slice(5, 7));

  // Earliest month anything was sent, so the year list starts there.
  const [{ data: firstDoc }, { data: firstPayroll }] = await Promise.all([
    supabase.from("documents").select("document_month").not("doc_type", "in", "(filed_return,payment_proof)").order("document_month").limit(1).maybeSingle(),
    supabase.from("payroll_submissions").select("pay_month").in("client_id", ids).order("pay_month").limit(1).maybeSingle(),
  ]);
  const firstYear = Math.min(
    thisYear,
    Number(firstDoc?.document_month?.slice(0, 4) ?? thisYear),
    Number(firstPayroll?.pay_month?.slice(0, 4) ?? thisYear),
  );
  const years = Array.from({ length: thisYear - firstYear + 1 }, (_, n) => thisYear - n);
  const year = years.includes(Number(one(sp.year))) ? Number(one(sp.year)) : thisYear;
  const folder: FolderKey = FOLDERS.find((f) => f.key === one(sp.folder))?.key ?? "sales";

  const from = `${year}-01-01`;
  const to = `${year}-12-01`;
  const [{ data: docRows }, { data: payrollRows }, { data: returnedRows }] = await Promise.all([
    supabase
      .from("documents")
      .select("id, client_id, doc_type, period, document_month, late, file_name, status, return_reason, client_reply, created_at")
      .not("doc_type", "in", "(filed_return,payment_proof)")
      .neq("status", "uploading")
      .gte("document_month", from)
      .lte("document_month", to)
      .order("created_at", { ascending: false })
      .limit(2000),
    supabase
      .from("payroll_submissions")
      .select("id, client_id, pay_month, file_name, status, late, created_at")
      .in("client_id", ids)
      .gte("pay_month", from)
      .lte("pay_month", to)
      .order("created_at", { ascending: false }),
    // Returned documents need an answer whatever year they are for.
    supabase
      .from("documents")
      .select("id, client_id, doc_type, period, document_month, late, file_name, status, return_reason, client_reply, created_at")
      .eq("status", "returned")
      .not("doc_type", "in", "(filed_return,payment_proof)")
      .order("created_at", { ascending: false }),
  ]);
  const docs = (docRows ?? []) as Doc[];
  const payroll = (payrollRows ?? []) as PayrollFile[];
  const returned = (returnedRows ?? []) as Doc[];
  const nameOf = new Map(clients.map((c) => [c.id, c.name]));
  const several = clients.length > 1;
  const business = (clientId: string) => (several ? ` · ${nameOf.get(clientId)}` : "");

  const docItem = (d: Doc): Item => ({
    id: d.id,
    name: d.file_name,
    href: `/files/${d.id}`,
    month: d.document_month,
    detail: `${DOC_TYPES[d.doc_type]} · sent ${when(d.created_at)}${d.late ? " · late" : ""}${business(d.client_id)}`,
    tone: d.status,
    status: docStatusLabel[d.status],
  });
  const payrollItem = (p: PayrollFile): Item => ({
    id: p.id,
    name: p.file_name,
    href: null,
    month: p.pay_month,
    detail: `Payroll register · sent ${when(p.created_at)}${p.late ? " · late" : ""}${business(p.client_id)}`,
    tone: payrollStatus[p.status].tone,
    status: payrollStatus[p.status].label,
  });

  const itemsFor = (key: FolderKey): Item[] => {
    if (key === "payroll") return payroll.map(payrollItem);
    const types: readonly DocType[] = FOLDERS.find((f) => f.key === key)!.types;
    return docs.filter((d) => types.includes(d.doc_type)).map(docItem);
  };
  const counts = new Map(FOLDERS.map((f) => [f.key, itemsFor(f.key).length]));
  // "Others" only shows when something is in it.
  const folders = FOLDERS.filter((f) => f.key !== "others" || (counts.get("others") ?? 0) > 0 || folder === "others");
  const items = itemsFor(folder);
  const byMonth = new Map<number, Item[]>();
  for (const i of items) {
    const m = Number(i.month.slice(5, 7));
    byMonth.set(m, [...(byMonth.get(m) ?? []), i]);
  }
  // Months that have started: all twelve for past years, up to now for this year.
  const lastMonth = year < thisYear ? 12 : thisMonth;
  const latestWithFiles = Math.max(0, ...byMonth.keys());
  const href = (patch: { folder?: string; year?: number }) => `/portal/documents?${new URLSearchParams({ year: String(patch.year ?? year), folder: patch.folder ?? folder })}`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-title-1-medium text-text-primary">Documents</h1>
        <YearSelect years={years} value={year} />
      </div>

      {returned.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-title-3-semibold text-text-error-primary">Returned to you</h2>
          {returned.map((d) => (
            <article key={d.id} className="space-y-3 rounded-3xl border border-border-button-default bg-background-primary-default p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <a href={`/files/${d.id}`} target="_blank" rel="noopener" className="block truncate text-body-medium text-button-ghost-foreground underline">{d.file_name}</a>
                  <p className="text-caption-1-regular text-text-secondary">{DOC_TYPES[d.doc_type]} · {showMonth(d.document_month)}{business(d.client_id)}</p>
                </div>
                <Badge tone="blocked">Returned</Badge>
              </div>
              <p className="text-body-regular text-text-primary">Reason: “{d.return_reason}”</p>
              <p className="text-caption-1-regular text-text-secondary">Upload a new copy from the Upload tab if needed, then tell us here.</p>
              <ReplyForm documentId={d.id} />
            </article>
          ))}
        </section>
      )}

      <nav aria-label="Folders">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {folders.map((f) => {
            const active = f.key === folder;
            return (
              <li key={f.key}>
                <Link
                  href={href({ folder: f.key })}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                    active
                      ? "border-accent-500 bg-accent-50 text-text-primary"
                      : "border-border-button-default bg-background-primary-default text-text-secondary hover:border-border-button-hover hover:bg-background-secondary-hover",
                  )}
                >
                  <RiFolder3Line aria-hidden className={cx("size-5 shrink-0", active ? "text-accent-600" : "text-foreground-icon-tertiary")} />
                  <span className="min-w-0 flex-1 truncate text-body-medium">{f.label}</span>
                  <span className="text-caption-1-regular text-text-tertiary">{counts.get(f.key)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className="space-y-2" aria-label={`${FOLDERS.find((f) => f.key === folder)!.label} ${year}`}>
        <ul className="divide-y divide-separator-border overflow-hidden rounded-3xl border border-border-button-default bg-background-primary-default">
            {MONTHS.slice(0, lastMonth).map((label, n) => {
              const list = byMonth.get(n + 1) ?? [];
              return (
                <li key={label}>
                  <details open={n + 1 === latestWithFiles} className="group">
                    <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-inset [&::-webkit-details-marker]:hidden">
                      <RiArrowDownSLine aria-hidden className="size-5 shrink-0 -rotate-90 text-foreground-icon-tertiary transition-transform group-open:rotate-0" />
                      <span className={cx("flex-1 text-body-medium", list.length ? "text-text-primary" : "text-text-tertiary")}>{label}</span>
                      <span className="text-caption-1-regular text-text-tertiary">{list.length ? `${list.length} file${list.length === 1 ? "" : "s"}` : "None"}</span>
                    </summary>
                    {list.length === 0 ? (
                      <p className="px-4 pb-3 ps-12 text-caption-1-regular text-text-tertiary">Nothing sent for {label} {year}.</p>
                    ) : (
                      <ul className="pb-2">
                        {list.map((i) => (
                          <li key={i.id} className="flex items-center gap-3 px-4 py-2 ps-12">
                            <RiFileTextLine aria-hidden className="size-4 shrink-0 text-foreground-icon-tertiary" />
                            <div className="min-w-0 flex-1">
                              {i.href ? (
                                <a href={i.href} target="_blank" rel="noopener" className="block truncate text-body-regular text-text-primary hover:underline">{i.name}</a>
                              ) : (
                                <p className="truncate text-body-regular text-text-primary">{i.name}</p>
                              )}
                              <p className="text-caption-1-regular text-text-secondary">{i.detail}</p>
                            </div>
                            <Badge tone={docStatusTone[i.tone]}>{i.status}</Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>
                </li>
              );
            })}
          </ul>
        {folder === "payroll" && (
          <p className="text-caption-1-regular text-text-tertiary">
            Send your payroll from <Link href="/portal" className="text-button-ghost-foreground hover:underline">Upload</Link>, in your own format.
          </p>
        )}
      </section>
    </div>
  );
}
