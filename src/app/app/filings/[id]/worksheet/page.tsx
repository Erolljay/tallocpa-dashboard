import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { DOC_TYPES, showMonth, type DocType } from "@/lib/documents/labels";
import { filingStatusLabel, filingStatusTone } from "@/lib/filings/labels";
import type { FilingStatus } from "@/lib/filings/sign-off";
import { LOCKED_STATUSES, loadWorksheet } from "@/lib/returns/load";
import { formatAmount, formatPeso } from "@/lib/returns/money";
import { flattenFigures } from "@/lib/returns/source";
import type { WorksheetLine, WorksheetResult, WorksheetSchedule } from "@/lib/returns/types";
import { supabaseServer } from "@/lib/supabase/server";
import { WorksheetInputsForm } from "./forms";

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
  subtotal: "border-t border-border font-medium text-ink-heading",
  total: "border-t-2 border-border-strong font-semibold text-ink-heading",
  payable: "border-t-2 border-border-strong bg-surface-tint font-bold text-ink-heading",
};

function Lines({ lines }: { lines: WorksheetLine[] }) {
  return (
    <ol className="text-sm">
      {lines.map((l) => (
        <li key={`${l.key}-${l.line}`} className={`grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-3 px-2 py-2 ${lineStyle[l.emphasis ?? "none"]}`}>
          <span className="text-xs tabular-nums text-ink-subtle">{l.line}</span>
          <span className="min-w-0">
            {l.label}
            {l.amount != null && l.basis && <span className="block text-xs font-normal text-ink-muted">{l.basis}</span>}
          </span>
          <span className={`text-right ${l.amount == null ? "max-w-[12rem] break-words text-ink-heading" : "amount tabular-nums whitespace-nowrap"}`}>
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
        <p className="text-sm text-ink-muted">Nothing to list.</p>
      ) : (
        <div className="-mx-6 overflow-x-auto px-6">
          <table className="w-full min-w-max text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-ink-subtle">
                {s.columns.map((c) => (
                  <th key={c.key} className={`px-2 py-2 font-medium ${c.numeric ? "text-right" : ""}`}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {s.columns.map((c) => {
                    const v = r[c.key];
                    return (
                      <td key={c.key} className={`px-2 py-2 ${c.numeric ? "amount text-right tabular-nums" : ""}`}>
                        {v == null ? "—" : c.numeric && typeof v === "number" ? formatAmount(v) : String(v)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-ink-heading">
                {s.columns.map((c, i) => (
                  <td key={c.key} className={`px-2 py-2 ${c.numeric ? "amount text-right tabular-nums" : ""}`}>
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
  const { filing, module: form, ctx, saved, documents } = loaded;
  const status = filing.status as FilingStatus;

  const header = (
    <PageHeader
      title={`Worksheet · ${filing.form} · ${filing.periodLabel}`}
      description={
        <span>
          <Link href={`/app/clients/${filing.clientId}`} className="text-link hover:underline">{filing.clientName}</Link> ·{" "}
          <Link href={`/app/filings/${filing.id}`} className="text-link hover:underline">Back to the return</Link>
        </span>
      }
      actions={<Badge tone={filingStatusTone[status]}>{filingStatusLabel[status]}</Badge>}
    />
  );
  if (!form || !ctx) {
    return (
      <>
        {header}
        <Card><p className="text-sm text-ink-muted">No worksheet for this form yet. Prepare it outside the OS and attach the filed return.</p></Card>
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

  return (
    <>
      {header}
      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="min-w-0 space-y-6">
          <div className="space-y-3">
            {locked && <Notice tone="done">This return has been filed. The worksheet is locked and shows the figures as saved{saved?.computedAt ? ` on ${when(saved.computedAt)}` : ""}.</Notice>}
            {!saved?.result && !locked && <Notice tone="waiting">Not saved yet. These figures are worked out from the approved documents now; press Recompute and Save to keep them.</Notice>}
            {stale && <Notice tone="waiting">The figures have changed since the worksheet was saved (documents approved or edited since). Recompute and save before preparing the return.</Notice>}
            <Problems result={shown} />
          </div>

          <Card title={form.title}>
            <div className="space-y-6">
              {shown.sections.map((s) => (
                <section key={s.title}>
                  <h3 className="mb-1 text-sm font-semibold text-ink-heading">{s.title}</h3>
                  <Lines lines={s.lines} />
                </section>
              ))}
            </div>
            {saved?.computedAt && (
              <p className="mt-4 text-xs text-ink-subtle">Saved {when(saved.computedAt)}{savedBy?.full_name ? ` by ${savedBy.full_name}` : ""}.</p>
            )}
          </Card>

          {shown.schedules.map((s) => <Schedule key={s.title} s={s} />)}
        </div>

        <div className="space-y-6">
          <Card title="Figures typed in">
            {form.manualInputs(ctx).length === 0 && <p className="mb-4 text-sm text-ink-muted">Everything on this form comes from approved documents.</p>}
            <WorksheetInputsForm filingId={filing.id} inputs={form.manualInputs(ctx)} values={saved?.inputs ?? {}} canEdit={canEdit} />
            {!canEdit && !locked && <p className="mt-3 text-xs text-ink-subtle">Only the Owner and staff assigned to this client can change the worksheet.</p>}
          </Card>

          {attachments.length > 0 && (
            <Card title="Attachments">
              {shown.errors.length > 0 ? (
                <p className="text-sm text-ink-muted">Fix the problems above to download the attachments.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {attachments.map((a) => (
                    <li key={a.kind}>
                      <a href={`/app/filings/${filing.id}/worksheet/${a.kind}`} className="text-link hover:underline" download>{a.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )}

          <Card title="Source documents">
            {documents.length === 0 ? (
              <p className="text-sm text-ink-muted">No approved documents for {filing.periodLabel}. Documents count once a staff member approves their figures.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {documents.map((d) => {
                  const s = d.source;
                  const amount = s.docType.startsWith("bir_2307") ? s.withholding : s.total;
                  return (
                    <li key={d.id} className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        <Link href={`/app/documents/${d.id}`} className="text-link hover:underline">{DOC_TYPES[s.docType as DocType]}{s.number ? ` ${s.number}` : ""}</Link>
                        <span className="block truncate text-xs text-ink-subtle">
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
