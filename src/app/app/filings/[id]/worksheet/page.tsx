import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { DOC_TYPES, showMonth, type DocType } from "@/lib/documents/labels";
import { filingStatusLabel, filingStatusTone } from "@/lib/filings/labels";
import type { FilingStatus } from "@/lib/filings/sign-off";
import { LOCKED_STATUSES, loadWorksheet } from "@/lib/returns/load";
import { booksCover } from "@/lib/returns/forms/business/income";
import { formatAmount, formatPeso } from "@/lib/returns/money";
import { flattenFigures } from "@/lib/returns/source";
import type { WorksheetLine, WorksheetResult, WorksheetSchedule } from "@/lib/returns/types";
import { supabaseServer } from "@/lib/supabase/server";
import { FollowUpForm, WorksheetInputsForm } from "./forms";

export default function WorksheetPage(props: PageProps<"/app/filings/[id]/worksheet">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Worksheet params={props.params} />
    </Suspense>
  );
}

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" }).format(new Date(iso));

const lineStyle: Record<NonNullable<WorksheetLine["emphasis"]> | "none", string> = {
  none: "",
  subtotal: "border-t border-separator-border font-medium text-text-primary",
  total: "border-t-2 border-border-button-default font-semibold text-text-primary",
  payable: "border-t-2 border-border-button-default bg-button-ghost-background font-bold text-text-primary",
};

function Lines({ lines }: { lines: WorksheetLine[] }) {
  return (
    <ol className="text-body-regular">
      {lines.map((l) => (
        <li key={`${l.key}-${l.line}`} className={`grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-3 px-2 py-2 ${lineStyle[l.emphasis ?? "none"]}`}>
          <span className="text-caption-1-regular tabular-nums text-text-tertiary">{l.line}</span>
          <span className="min-w-0">
            {l.label}
            {l.amount != null && l.basis && <span className="block text-caption-1-regular text-text-secondary">{l.basis}</span>}
          </span>
          <span className={`text-end ${l.amount == null ? "max-w-[12rem] break-words text-text-primary" : "amount tabular-nums whitespace-nowrap"}`}>
            {l.amount == null ? (l.basis ?? "—") : formatPeso(l.amount)}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Schedule({ s }: { s: WorksheetSchedule }) {
  const totals = Object.fromEntries(s.columns.filter((c) => c.numeric).map((c) => [c.key, s.rows.reduce((a, r) => a + (typeof r[c.key] === "number" ? (r[c.key] as number) : 0), 0)]));
  return (
    <Card title={s.title}>
      {s.rows.length === 0 ? (
        <p className="text-body-regular text-text-secondary">Nothing to list.</p>
      ) : (
        <div className="-mx-6 overflow-x-auto px-6">
          <table className="w-full min-w-max text-body-regular">
            <thead>
              <tr className="border-b border-separator-border text-start text-caption-1-regular text-text-tertiary">
                {s.columns.map((c) => (
                  <th key={c.key} className={`px-2 py-2 font-medium ${c.numeric ? "text-end" : ""}`}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r, i) => (
                <tr key={i} className="border-b border-separator-border last:border-0">
                  {s.columns.map((c) => {
                    const v = r[c.key];
                    return (
                      <td key={c.key} className={`px-2 py-2 ${c.numeric ? "amount text-end tabular-nums" : ""}`}>
                        {v == null ? "—" : c.numeric && typeof v === "number" ? formatAmount(v) : String(v)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-text-primary">
                {s.columns.map((c, i) => (
                  <td key={c.key} className={`px-2 py-2 ${c.numeric ? "amount text-end tabular-nums" : ""}`}>
                    {c.numeric ? formatAmount(totals[c.key]) : i === 0 ? "Total" : ""}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </Card>
  );
}

function Problems({ result }: { result: WorksheetResult }) {
  if (!result.errors.length && !result.warnings.length) return null;
  return (
    <div className="space-y-3">
      {result.errors.length > 0 && (
        <Notice tone="blocked">
          <p className="font-medium">Fix before filing</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">{result.errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </Notice>
      )}
      {result.warnings.length > 0 && (
        <Notice tone="waiting">
          <p className="font-medium">Check</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">{result.warnings.map((w, i) => <li key={i}>{w}</li>)}</ul>
        </Notice>
      )}
    </div>
  );
}

const sameFigures = (a: Record<string, number>, b: Record<string, number>) => {
  const ka = Object.keys(a);
  return ka.length === Object.keys(b).length && ka.every((k) => a[k] === b[k]);
};

async function Worksheet({ params }: { params: PageProps<"/app/filings/[id]/worksheet">["params"] }) {
  const { id } = await params;
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const loaded = await loadWorksheet(id, supabase);
  if (!loaded) notFound();
  const { filing, module: form, ctx, saved, documents, notReady } = loaded;
  const status = filing.status as FilingStatus;

  const header = (
    <PageHeader
      title={`Worksheet · ${filing.form} · ${filing.periodLabel}`}
      description={
        <span>
          <Link href={`/app/clients/${filing.clientId}`} className="text-button-ghost-foreground hover:underline">{filing.clientName}</Link> ·{" "}
          <Link href={`/app/filings/${filing.id}`} className="text-button-ghost-foreground hover:underline">Back to the return</Link>
        </span>
      }
      actions={<Badge tone={filingStatusTone[status]}>{filingStatusLabel[status]}</Badge>}
    />
  );
  if (notReady) {
    // Decision 10: a return is worked out only once the Books of its period are locked.
    return (
      <>
        {header}
        <Notice tone="waiting">
          <p className="font-medium">{notReady}.</p>
          <p className="mt-1">The reviewer locks each month once its Inbox is clear; the worksheet is worked out from the Books after that.</p>
          <Link href={`/app/clients/${filing.clientId}/books/months`} className="mt-2 inline-block text-button-ghost-foreground hover:underline">Open the months of the Books</Link>
        </Notice>
      </>
    );
  }
  if (!form || !ctx) {
    return (
      <>
        {header}
        <Card><p className="text-body-regular text-text-secondary">No worksheet for this form yet. Prepare it outside the OS and attach the filed return.</p></Card>
      </>
    );
  }

  const [{ data: team }, { data: savedBy }] = await Promise.all([
    supabase.from("staff_assignments").select("user_id").eq("client_id", filing.clientId).eq("user_id", me.userId),
    saved?.computedBy ? supabase.from("staff_profiles").select("full_name").eq("user_id", saved.computedBy).maybeSingle() : Promise.resolve({ data: null }),
  ]);
  const locked = LOCKED_STATUSES.includes(filing.status);
  const canEdit = !locked && (me.staff.role === "owner" || (team ?? []).length > 0);

  // A filed return shows the snapshot it was filed with; otherwise the figures as they stand now.
  const live = form.compute(ctx);
  const shown: WorksheetResult = locked && saved?.result ? saved.result : live;
  const stale = !locked && saved?.result != null && !sameFigures(flattenFigures(saved.result), flattenFigures(live));
  const used = new Set(shown.documentIds);
  const attachments = form.attachments?.(ctx, shown) ?? [];
  const fromBooks = ctx.source === "books" || (!!form.usesLedger && booksCover(ctx));
  // Decision 12: CWT claimed without the customer's 2307 yet, to follow up.
  const missing2307 = [...new Map(ctx.documents.filter((d) => d.fromBooks && d.docType === "bir_2307_received" && d.cwtSupported === false && d.withholding > 0 && used.has(d.id)).map((d) => [d.id, d])).values()];

  return (
    <>
      {header}
      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="min-w-0 space-y-6">
          <div className="space-y-3">
            {locked && <Notice tone="done">This return has been filed. The worksheet is locked and shows the figures as saved{saved?.computedAt ? ` on ${when(saved.computedAt)}` : ""}.</Notice>}
            {!saved?.result && !locked && <Notice tone="waiting">Not saved yet. These figures are worked out from the {fromBooks ? "books" : "approved documents"} now; press Recompute and Save to keep them.</Notice>}
            {stale && <Notice tone="waiting">The figures have changed since the worksheet was saved ({fromBooks ? "entries posted to the books or documents approved since" : "documents approved or edited since"}). Recompute and save before preparing the return.</Notice>}
            <Problems result={shown} />
          </div>

          <Card title={form.title}>
            <div className="space-y-6">
              {shown.sections.map((s) => (
                <section key={s.title}>
                  <h3 className="mb-1 text-body-semibold text-text-primary">{s.title}</h3>
                  <Lines lines={s.lines} />
                </section>
              ))}
            </div>
            {saved?.computedAt && (
              <p className="mt-4 text-caption-1-regular text-text-tertiary">Saved {when(saved.computedAt)}{savedBy?.full_name ? ` by ${savedBy.full_name}` : ""}.</p>
            )}
          </Card>

          {shown.schedules.map((s) => <Schedule key={s.title} s={s} />)}
        </div>

        <div className="space-y-6">
          <Card title="Figures typed in">
            {form.manualInputs(ctx).length === 0 && <p className="mb-4 text-body-regular text-text-secondary">Everything on this form comes from approved documents.</p>}
            <WorksheetInputsForm filingId={filing.id} inputs={form.manualInputs(ctx)} values={saved?.inputs ?? {}} canEdit={canEdit} />
            {!canEdit && !locked && <p className="mt-3 text-caption-1-regular text-text-tertiary">Only the Owner and staff assigned to this client can change the worksheet.</p>}
          </Card>

          {attachments.length > 0 && (
            <Card title="Attachments">
              {shown.errors.length > 0 ? (
                <p className="text-body-regular text-text-secondary">Fix the problems above to download the attachments.</p>
              ) : (
                <ul className="space-y-2 text-body-regular">
                  {attachments.map((a) => (
                    <li key={a.kind}>
                      <a href={`/app/filings/${filing.id}/worksheet/${a.kind}`} className="text-button-ghost-foreground hover:underline" download>{a.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )}

          {missing2307.length > 0 && (
            <Card title="2307s still to come">
              <p className="mb-3 text-body-regular text-text-secondary">The tax these customers withheld is claimed. Ask each for the 2307 and mark it followed up; whether to keep claiming at year end is the client&rsquo;s decision.</p>
              <ul className="space-y-4 text-body-regular">
                {missing2307.map((d) => (
                  <li key={d.id}>
                    <Link href={`/app/clients/${filing.clientId}/books/sales-invoices/${d.id}`} className="text-button-ghost-foreground hover:underline">Sales Invoice{d.number ? ` ${d.number}` : ""}</Link>
                    <span className="block text-caption-1-regular text-text-tertiary">
                      {[d.partyName, d.atc, formatPeso(d.withholding)].filter(Boolean).join(" · ")}
                      {d.cwtFollowedUpAt ? ` · followed up ${when(d.cwtFollowedUpAt)}` : " · not followed up yet"}
                    </span>
                    {canEdit && <FollowUpForm filingId={filing.id} invoiceId={d.id} />}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {fromBooks && (
            <Card title="From the books">
              <p className="text-body-regular text-text-secondary">
                {ctx.source === "books"
                  ? "The figures are the Sales and Purchase Invoices in the Books by tax code, for locked months only: the VAT codes for the SLS and SLP, the withholding codes for the SAWT (on Sales Invoices) and the QAP (on Purchase Invoices). "
                  : ""}
                {form.usesLedger && booksCover(ctx) ? "Sales, cost of sales, other income and deductions are the posted entries of the taxable year to date, by each account’s BIR line, with ND lines added back." : ""}
              </p>
              <Link href={`/app/clients/${filing.clientId}/books`} className="mt-3 inline-block text-body-medium text-button-ghost-foreground hover:underline">Open the books</Link>
            </Card>
          )}

          <Card title={ctx.source === "books" ? "Sources" : "Source documents"}>
            {documents.length === 0 ? (
              <p className="text-body-regular text-text-secondary">{ctx.source === "books" ? `No invoices in the Books for ${filing.periodLabel}.` : `No approved documents for ${filing.periodLabel}. Documents count once a staff member approves their figures.`}</p>
            ) : (
              <ul className="space-y-3 text-body-regular">
                {documents.map((d) => {
                  const s = d.source;
                  const amount = s.docType.startsWith("bir_2307") && !d.href ? s.withholding : s.total;
                  return (
                    <li key={d.id} className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        {d.href ? (
                          <Link href={d.href} className="text-button-ghost-foreground hover:underline">{d.label}</Link>
                        ) : (
                          <Link href={`/app/documents/${d.id}`} className="text-button-ghost-foreground hover:underline">{DOC_TYPES[s.docType as DocType]}{s.number ? ` ${s.number}` : ""}</Link>
                        )}
                        <span className="block truncate text-caption-1-regular text-text-tertiary">
                          {[s.partyName, s.atc, showMonth(s.month)].filter(Boolean).join(" · ")}
                        </span>
                      </span>
                      <span className="flex shrink-0 flex-col items-end gap-1">
                        <span className="amount tabular-nums">{formatAmount(amount)}</span>
                        {used.has(d.id) ? <Badge tone="done">Used</Badge> : <Badge>Not used</Badge>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
