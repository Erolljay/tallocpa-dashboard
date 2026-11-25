import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Badge, Card, LinkButton, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { showMonth } from "@/lib/documents/labels";
import { filingStatusLabel, filingStatusTone, showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { totals } from "@/lib/register/parts";
import { formatAmount } from "@/lib/returns/money";
import { supabaseServer } from "@/lib/supabase/server";
import { loadPeriodFile } from "@/lib/workpapers/load";
import { blockingTies, TIES_FOR_FORM, type TieOut, type TieStatus } from "@/lib/workpapers/tieouts";
import { cx } from "@/utils/cx";
import { refsToSign, SIGNED_REFS, type SignedRef, type Signoff } from "@/lib/workpapers/review";
import { ExplainForm } from "./explain-form";
import { NoteActions, RaiseNoteForm, SignButtons, TickButton } from "./review-forms";

export default function WorkpapersPage(props: PageProps<"/app/clients/[id]/workpapers">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Workpapers params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const amt = (c: number | null) => (c == null ? "—" : formatAmount(c));
const STATUS: Record<TieStatus, { label: string; tone: "done" | "blocked" | "waiting" | "neutral" }> = {
  clean: { label: "Agrees", tone: "done" },
  open: { label: "Explain", tone: "blocked" },
  explained: { label: "Explained", tone: "waiting" },
  not_applicable: { label: "Not yet", tone: "neutral" },
};

function shiftMonth(month: string, n: number) {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + n, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

/**
 * The period file (W1; Owner's decision 6): one client and month, with the
 * audit-style index — 0 the lead (the returns of the period), 0-2 the tie-outs,
 * 10 sales, 20 purchases and expenses, 30 payroll, B-2 the 2307s received,
 * BB-2 withholding on payments. The registers themselves live on the Register
 * and Payroll pages; this file sums them, ties them to the books and keeps the
 * explanations.
 */
async function Workpapers({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/workpapers">, "params" | "searchParams">) {
  const { id } = await params;
  const sp = await searchParams;
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const { data: client } = await supabase.from("clients").select("id, name").eq("id", id).maybeSingle();
  if (!client) notFound();
  let canAct = me.staff.role === "owner";
  // The reviewer signs the review and clears notes: the client's reviewer, or the Owner.
  let canReview = canAct;
  if (!canAct) {
    const { data: a } = await supabase.from("staff_assignments").select("user_id, role").eq("client_id", id).eq("user_id", me.userId);
    if (!a?.length) notFound();
    canAct = true;
    // As private.can_manage_client(): a reviewer on the staff assigned to this client.
    canReview = me.staff.role === "reviewer";
  }

  // The month asked for, else last month (the one being closed).
  const month = /^\d{4}-\d{2}$/.test(one(sp.month)) ? one(sp.month) : shiftMonth(manilaToday().slice(0, 7), -1);
  const first = `${month}-01`;
  const [file, { data: filings }] = await Promise.all([
    loadPeriodFile(supabase, id, first),
    supabase.from("filing_instances").select("id, form, period_label, period_start, period_end, due_date, status").eq("client_id", id).lte("period_start", first).gte("period_end", first).order("due_date"),
  ]);
  const sales = file.lines.filter((l) => l.kind === "sale");
  const purchases = file.lines.filter((l) => l.kind === "purchase");
  const received = file.quarterToDate.filter((l) => l.kind === "cwt_received");
  const s = totals(sales);
  const p = totals(purchases);
  const open = file.ties.filter((t) => t.status === "open");
  const href = (m: string) => `/app/clients/${id}/workpapers?month=${m}`;
  const register = `/app/clients/${id}/register?month=${month}`;

  const openNotes = file.notes.filter((n) => !n.clearedAt);
  const needed = new Set(refsToSign(file.activity));
  const index: { ref: string; title: string; detail: string; href?: string; tone?: "done" | "blocked" | "neutral" }[] = [
    { ref: "0", title: "Lead: returns of the period", detail: `${(filings ?? []).length} return${(filings ?? []).length === 1 ? "" : "s"} cover ${showMonth(first)}`, href: "#lead" },
    { ref: "ADJ", title: "Adjustments (journal entries marked as adjustments)", detail: file.adjustments.length ? `${file.adjustments.length} · ${file.adjustments.filter((a) => !a.tickedAt && !a.reversed).length} to tick` : "None this month", href: "#adjustments", tone: file.adjustments.some((a) => !a.tickedAt && !a.reversed) ? "blocked" : file.adjustments.length ? "done" : undefined },
    { ref: "0-1", title: "Review notes", detail: openNotes.length ? `${openNotes.length} open` : file.notes.length ? "All cleared" : "None raised", href: "#notes", tone: openNotes.length ? "blocked" : "done" },
    { ref: "0-2", title: "Tie-outs T-1 to T-10", detail: open.length ? `${open.length} to explain` : "Nothing to explain", href: "#tieouts", tone: open.length ? "blocked" : "done" },
    { ref: "10", title: "Revenue · sales register", detail: `${s.count} line${s.count === 1 ? "" : "s"} · net receipts ${amt(s.net)}`, href: register },
    { ref: "20", title: "Cost of sales and expenses · purchases register", detail: `${p.count} line${p.count === 1 ? "" : "s"} · net paid ${amt(p.net)}`, href: register },
    { ref: "30", title: "Payroll register", detail: file.payroll ? `Gross ${amt(file.payroll.gross)} · tax withheld ${amt(file.payroll.taxWithheld)}` : "No payroll this month", href: `/app/clients/${id}/payroll` },
    { ref: "B-2", title: "Creditable withholding tax (2307s received)", detail: `Quarter to date: ${received.length} certificate${received.length === 1 ? "" : "s"} · ${amt(totals(received).withholding)}`, href: register },
    { ref: "BB-2", title: "Withholding on payments", detail: `EWT on purchases ${amt(p.withholding)}`, href: register },
    {
      ref: "E", title: "Property and equipment · fixed asset register and depreciation",
      detail: file.assets ? `Additions ${amt(file.assets.additions)} · depreciation ${amt(file.assets.depreciation)}${file.assets.waiting ? ` · ${file.assets.waiting} waiting for setup` : ""}` : "No account titles yet",
      href: `/app/clients/${id}/fixed-assets?month=${month}`,
    },
  ];

  return (
    <>
      <PageHeader
        title="Workpapers"
        description={<><Link href={`/app/clients/${id}`} className="text-button-ghost-foreground hover:underline">{client.name}</Link> · the period file: registers, tie-outs to the books, and the returns they feed.</>}
        actions={
          <div className="flex items-center gap-1">
            <Link href={href(shiftMonth(month, -1))} aria-label="Previous month" className="inline-flex size-10 items-center justify-center rounded-2lg text-foreground-icon-secondary outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring">
              <RiArrowLeftSLine aria-hidden className="size-4" />
            </Link>
            <span className="min-w-36 text-center text-title-3-semibold text-text-primary">{showMonth(first)}</span>
            <Link href={href(shiftMonth(month, 1))} aria-label="Next month" className="inline-flex size-10 items-center justify-center rounded-2lg text-foreground-icon-secondary outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring">
              <RiArrowRightSLine aria-hidden className="size-4" />
            </Link>
          </div>
        }
      />
      <div className="space-y-6">
        <Card title="Index">
          <ul className="divide-y divide-separator-border">
            {index.map((w) => (
              <li key={w.ref} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2.5">
                <span className="w-12 shrink-0 text-body-medium tabular-nums text-text-primary">{w.ref}</span>
                <span className="min-w-0 flex-1">
                  {w.href ? <Link href={w.href} className="text-body-medium text-button-ghost-foreground hover:underline">{w.title}</Link> : <span className="text-body-medium text-text-secondary">{w.title}</span>}
                  <span className="block text-caption-1-regular text-text-tertiary">{w.detail}</span>
                </span>
                {w.tone && w.tone !== "neutral" && <Badge tone={w.tone}>{w.tone === "done" ? "Clean" : "Open"}</Badge>}
                {w.ref in SIGNED_REFS && (
                  <div className="flex w-full flex-wrap items-center gap-2 ps-16 sm:w-auto sm:ps-0">
                    <SignStatus s={file.signoffs.find((x) => x.ref === w.ref)} needed={needed.has(w.ref as SignedRef)} />
                    {canAct && (
                      <SignButtons clientId={id} month={first} refId={w.ref as SignedRef} canReview={canReview}
                        prepared={Boolean(file.signoffs.find((x) => x.ref === w.ref)?.preparedAt)} reviewed={Boolean(file.signoffs.find((x) => x.ref === w.ref)?.reviewedAt)} />
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Card>

        <section id="notes">
          <Card title="0-1 · Review notes" actions={<span className="text-caption-1-regular text-text-tertiary">A workpaper with an open note cannot be reviewer-signed</span>}>
            {file.notes.length === 0 ? (
              <p className="mb-3 text-body-regular text-text-secondary">No review notes for {showMonth(first)}.</p>
            ) : (
              <ul className="mb-4 divide-y divide-separator-border">
                {[...openNotes, ...file.notes.filter((n) => n.clearedAt)].map((n) => (
                  <li key={n.id} className="space-y-2 py-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-body-regular text-text-primary"><span className="font-medium">{n.ref}</span> · {n.note}</p>
                      <Badge tone={n.clearedAt ? "done" : "blocked"}>{n.clearedAt ? "Cleared" : n.response ? "Answered" : "Open"}</Badge>
                    </div>
                    {n.response && <p className="text-body-regular text-text-secondary">Answer: “{n.response}”</p>}
                    {canAct && <NoteActions clientId={id} noteId={n.id} open={!n.clearedAt} canReview={canReview} response={n.response} />}
                  </li>
                ))}
              </ul>
            )}
            {canAct && <RaiseNoteForm clientId={id} month={first} refs={Object.keys(SIGNED_REFS) as SignedRef[]} />}
          </Card>
        </section>

        <section id="adjustments">
          <Card title="Adjustments" actions={<LinkButton href={`/app/clients/${id}/books/journal/new`} variant="secondary" size="sm">Create journal entry</LinkButton>}>
            <p className="mb-3 text-caption-1-regular text-text-tertiary">An adjustment is only ever a journal entry: create one and mark it as an adjustment, with its kind, reason and support. The reviewer ticks each one; 0-2 cannot be reviewer-signed until they are.</p>
            {file.adjustments.length === 0 ? (
              <p className="text-body-regular text-text-secondary">No adjustments in {showMonth(first)}.</p>
            ) : (
              <ul className="divide-y divide-separator-border">
                {file.adjustments.map((a, i) => (
                  <li key={a.entryId} className="flex flex-wrap items-start gap-x-4 gap-y-2 py-3">
                    <span className="w-14 shrink-0 text-body-medium tabular-nums text-text-primary">ADJ {i + 1}</span>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-body-regular text-text-primary">{a.memo}{a.reference ? ` · ${a.reference}` : ""} · {formatAmount(a.amount)}</p>
                      <p className="text-caption-1-regular text-text-secondary">{a.date} · {a.kind} · {a.reason}{a.documentId && <> · <Link href={`/app/documents/${a.documentId}`} className="text-button-ghost-foreground hover:underline">support</Link></>}</p>
                    </div>
                    {a.reversed ? <Badge>Reversed</Badge> : a.tickedAt ? <Badge tone="done">Ticked</Badge> : <Badge tone="waiting">To tick</Badge>}
                    {canReview && !a.reversed && <TickButton clientId={id} entryId={a.entryId} ticked={Boolean(a.tickedAt)} />}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>

        <section id="lead">
          <Card title="0 · Lead: returns of the period">
            {(filings ?? []).length === 0 ? (
              <p className="text-body-regular text-text-secondary">No return covers {showMonth(first)}.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[40rem] text-body-regular">
                  <thead className="text-caption-1-regular text-text-tertiary">
                    <tr><th scope="col" className="pb-2 text-start">Return</th><th scope="col" className="pb-2 text-start">Due</th><th scope="col" className="pb-2 text-start">Tie-outs</th><th scope="col" className="pb-2 text-start">Status</th></tr>
                  </thead>
                  <tbody>
                    {(filings ?? []).map((f) => {
                      const need = TIES_FOR_FORM[f.form] ?? [];
                      const blocked = blockingTies(file.ties, f.form);
                      return (
                        <tr key={f.id} className="border-t border-separator-border">
                          <td className="py-2 pe-4"><Link href={`/app/filings/${f.id}`} className="font-medium text-button-ghost-foreground hover:underline">{f.form} · {f.period_label}</Link></td>
                          <td className="py-2 pe-4 tabular-nums text-text-secondary">{showDate(f.due_date)}</td>
                          <td className="py-2 pe-4 text-text-secondary">
                            {need.length ? need.join(", ") : "—"}
                            {blocked.length > 0 && f.status === "not_started" && <span className="ms-2 text-caption-1-medium text-text-error-primary">{blocked.map((t) => t.id).join(", ")} to explain first</span>}
                          </td>
                          <td className="py-2"><Badge tone={filingStatusTone[f.status as keyof typeof filingStatusTone]}>{filingStatusLabel[f.status]}</Badge></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <p className="mt-3 text-caption-1-regular text-text-tertiary">A return can be marked prepared once the tie-outs it needs agree within ₱1 or are explained, for every month it covers.</p>
              </div>
            )}
          </Card>
        </section>

        <section id="tieouts">
          <Card title="0-2 · Tie-outs" actions={<span className="text-caption-1-regular text-text-tertiary">Within ₱1 agrees; the books count posted entries</span>}>
            <ul className="divide-y divide-separator-border">
              {file.ties.map((t) => <TieRow key={t.id} t={t} clientId={id} month={first} canAct={canAct} />)}
            </ul>
          </Card>
        </section>

        <div className="flex flex-wrap gap-2">
          <LinkButton href={`/app/clients/${id}`} variant="secondary">Back to the client</LinkButton>
          <LinkButton href={register} variant="secondary">Register</LinkButton>
          <LinkButton href={`/app/clients/${id}/books`} variant="secondary">Books</LinkButton>
        </div>
      </div>
    </>
  );
}

function TieRow({ t, clientId, month, canAct }: { t: TieOut; clientId: string; month: string; canAct: boolean }) {
  const st = STATUS[t.status];
  return (
    <li className="py-3">
      <div className="flex flex-wrap items-start gap-x-4 gap-y-1">
        <span className="w-12 shrink-0 text-body-medium tabular-nums text-text-primary">{t.id}</span>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-body-medium text-text-primary">{t.what}</p>
          {t.status === "not_applicable" ? (
            <p className="text-caption-1-regular text-text-tertiary">{t.note}</p>
          ) : (
            <dl className="grid grid-cols-[auto_auto] gap-x-4 gap-y-0.5 text-caption-1-regular sm:w-max">
              <dt className="text-text-tertiary">{t.left.label}</dt><dd className="text-end tabular-nums text-text-primary">{amt(t.left.amount)}</dd>
              <dt className="text-text-tertiary">{t.right.label}</dt><dd className="text-end tabular-nums text-text-primary">{amt(t.right.amount)}</dd>
              <dt className="text-text-tertiary">Difference</dt><dd className={cx("text-end tabular-nums", t.status === "open" ? "text-text-error-primary" : "text-text-primary")}>{amt(t.difference)}</dd>
            </dl>
          )}
          {t.note && t.status !== "not_applicable" && <p className="text-caption-1-regular text-text-secondary">{t.note}</p>}
          {t.status === "explained" && !canAct && <p className="text-body-regular text-text-primary">“{t.explanation}”</p>}
          {canAct && (t.status === "open" || t.status === "explained") && <ExplainForm clientId={clientId} month={month} tie={t.id} value={t.explanation} />}
        </div>
        <Badge tone={st.tone}>{st.label}</Badge>
      </div>
    </li>
  );
}

function SignStatus({ s, needed }: { s: Signoff | undefined; needed: boolean }) {
  if (s?.reviewedAt) return <Badge tone="done">Reviewed</Badge>;
  if (s?.preparedAt) return <Badge tone="waiting">Prepared</Badge>;
  return needed ? <Badge tone="blocked">To sign</Badge> : <Badge>Not needed this month</Badge>;
}
