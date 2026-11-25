import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card, Skeleton } from "@/components/ui";
import { PrintButton } from "@/components/statement/print-button";
import { requireStaff } from "@/lib/auth";
import { showMonth } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { grossSales, totals, type RegisterLine } from "@/lib/register/parts";
import { formatAmount } from "@/lib/returns/money";
import { supabaseServer } from "@/lib/supabase/server";
import { loadPeriodFile, type PeriodFile } from "@/lib/workpapers/load";
import { SIGNED_REFS, type SignedRef } from "@/lib/workpapers/review";
import { monthsOf } from "@/lib/workpapers/tieouts";

export default function BinderPage(props: PageProps<"/app/clients/[id]/workpapers/binder">) {
  return (
    <Suspense fallback={<Skeleton rows={12} />}>
      <Binder params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const amt = (c: number | null) => (c == null || c === 0 ? "—" : formatAmount(c));
const TIE_STATUS = { clean: "Agrees", open: "Open", explained: "Explained", not_applicable: "—" } as const;

/**
 * The workpaper binder (W4): the period's workpapers on one printable page, saved as
 * PDF from the browser — index and sign-offs, tie-outs with their explanations,
 * adjustments, review notes, and the sales, purchases and 2307 registers line by line.
 * `from` and `to` are months (YYYY-MM); one month by default.
 */
async function Binder({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/workpapers/binder">, "params" | "searchParams">) {
  const { id } = await params;
  const sp = await searchParams;
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const { data: client } = await supabase.from("clients").select("id, name, tin").eq("id", id).maybeSingle();
  if (!client) notFound();
  if (me.staff.role !== "owner") {
    const { data: a } = await supabase.from("staff_assignments").select("user_id").eq("client_id", id).eq("user_id", me.userId).limit(1);
    if (!a?.length) notFound();
  }
  const fallback = (() => {
    const d = new Date(`${manilaToday().slice(0, 7)}-01T00:00:00Z`);
    d.setUTCMonth(d.getUTCMonth() - 1);
    return d.toISOString().slice(0, 7);
  })();
  const from = /^\d{4}-\d{2}$/.test(one(sp.from)) ? one(sp.from) : /^\d{4}-\d{2}$/.test(one(sp.month)) ? one(sp.month) : fallback;
  const to = /^\d{4}-\d{2}$/.test(one(sp.to)) && one(sp.to) >= from ? one(sp.to) : from;
  const months = monthsOf(`${from}-01`, `${to}-28`).slice(0, 12);
  const [files, { data: staff }] = await Promise.all([
    Promise.all(months.map((m) => loadPeriodFile(supabase, id, m))),
    supabase.from("staff_profiles").select("user_id, full_name"),
  ]);
  const [{ data: signers }] = await Promise.all([
    supabase.from("workpaper_signoffs").select("period, ref, prepared_by, reviewed_by").eq("client_id", id).in("period", months),
  ]);
  const nameOf = new Map((staff ?? []).map((s) => [s.user_id, s.full_name as string]));
  const span = months.length === 1 ? showMonth(months[0]) : `${showMonth(months[0])} to ${showMonth(months[months.length - 1])}`;

  return (
    <div className="space-y-6 print:space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="text-body-regular text-text-secondary">Save as PDF from the print dialog.</p>
        <PrintButton />
      </div>
      <header className="space-y-1">
        <p className="text-caption-1-medium text-text-tertiary">Workpaper binder</p>
        <h1 className="text-title-1-medium text-text-primary">{client.name}</h1>
        <p className="text-body-regular text-text-secondary">{client.tin ? `TIN ${client.tin} · ` : ""}{span} · printed {manilaToday()}</p>
      </header>
      {files.map((f) => (
        <MonthSection key={f.month} file={f} signers={(signers ?? []).filter((s) => String(s.period).slice(0, 10) === f.month)} nameOf={nameOf} />
      ))}
    </div>
  );
}

function MonthSection({ file: f, signers, nameOf }: { file: PeriodFile; signers: { ref: string; prepared_by: string | null; reviewed_by: string | null }[]; nameOf: Map<string, string> }) {
  const sales = f.lines.filter((l) => l.kind === "sale");
  const purchases = f.lines.filter((l) => l.kind === "purchase");
  const certs = f.lines.filter((l) => l.kind === "cwt_received" || l.kind === "ewt_issued");
  const who = (u: string | null) => (u ? nameOf.get(u) ?? "—" : "—");
  return (
    <section className="space-y-4 print:break-before-page">
      <h2 className="text-title-2-medium text-text-primary">{showMonth(f.month)}</h2>

      <Card title="Index and sign-off" className="break-inside-avoid print:border-0 print:shadow-none">
        <table className="w-full text-body-regular">
          <thead className="text-caption-1-regular text-text-tertiary"><tr><th className="pb-1 text-start">Ref</th><th className="pb-1 text-start">Workpaper</th><th className="pb-1 text-start">Prepared</th><th className="pb-1 text-start">Reviewed</th></tr></thead>
          <tbody>
            {(Object.keys(SIGNED_REFS) as SignedRef[]).map((ref) => {
              const s = signers.find((x) => x.ref === ref);
              return (
                <tr key={ref} className="border-t border-separator-border">
                  <td className="py-1 pe-3 tabular-nums">{ref}</td><td className="py-1 pe-3">{SIGNED_REFS[ref]}</td>
                  <td className="py-1 pe-3">{who(s?.prepared_by ?? null)}</td><td className="py-1">{who(s?.reviewed_by ?? null)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <Card title="0-2 · Tie-outs" className="break-inside-avoid print:border-0 print:shadow-none">
        <table className="w-full text-body-regular">
          <tbody>
            {f.ties.map((t) => (
              <tr key={t.id} className="border-t border-separator-border align-top first:border-0">
                <td className="py-1 pe-3 tabular-nums">{t.id}</td>
                <td className="py-1 pe-3">{t.what}{t.explanation && <span className="block text-caption-1-regular text-text-secondary">Explanation: {t.explanation}</span>}</td>
                <td className="py-1 pe-3 text-end tabular-nums">{amt(t.left.amount)}</td>
                <td className="py-1 pe-3 text-end tabular-nums">{amt(t.right.amount)}</td>
                <td className="py-1 text-end">{TIE_STATUS[t.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {(f.adjustments.length > 0 || f.notes.length > 0) && (
        <Card title="Adjustments and review notes" className="break-inside-avoid print:border-0 print:shadow-none">
          <ul className="space-y-1 text-body-regular">
            {f.adjustments.map((a, i) => (
              <li key={a.entryId}>ADJ {i + 1} · {a.date} · {a.memo} · {formatAmount(a.amount)} · {a.kind}: {a.reason}{a.reversed ? " · reversed" : a.tickedAt ? " · ticked" : " · not ticked"}</li>
            ))}
            {f.notes.map((n) => (
              <li key={n.id}>Note on {n.ref}: {n.note}{n.response ? ` — answer: ${n.response}` : ""}{n.clearedAt ? " · cleared" : " · open"}</li>
            ))}
          </ul>
        </Card>
      )}

      {sales.length > 0 && <RegisterTable title="10 · Sales register" lines={sales} kind="sale" />}
      {purchases.length > 0 && <RegisterTable title="20 · Purchases and expenses register" lines={purchases} kind="purchase" />}
      {certs.length > 0 && <RegisterTable title="B-2 / BB-2 · 2307s" lines={certs} kind="cert" />}

      {(f.payroll || f.assets) && (
        <Card title="30 · Payroll and E · Fixed assets" className="break-inside-avoid print:border-0 print:shadow-none">
          <p className="text-body-regular text-text-primary">
            {f.payroll ? `Payroll: gross ${formatAmount(f.payroll.gross)}, tax withheld ${formatAmount(f.payroll.taxWithheld)}. ` : ""}
            {f.assets ? `Fixed assets: additions ${formatAmount(f.assets.additions)}, depreciation ${formatAmount(f.assets.depreciation)}.` : ""}
          </p>
        </Card>
      )}
    </section>
  );
}

function RegisterTable({ title, lines, kind }: { title: string; lines: RegisterLine[]; kind: "sale" | "purchase" | "cert" }) {
  const t = totals(lines);
  const head = kind === "cert" ? ["Date", "Reference", "Party", "ATC", "Tax withheld"] : ["Date", "Reference", kind === "sale" ? "Customer" : "Supplier", "Gross", "VAT", "Total", "Withheld", kind === "sale" ? "Net receipt" : "Net paid"];
  return (
    <Card title={`${title} (${lines.length})`} className="print:border-0 print:shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-caption-1-regular">
          <thead className="text-text-tertiary"><tr>{head.map((h, i) => <th key={h} className={i >= 3 && !(kind === "cert" && i === 3) ? "pb-1 pe-2 text-end" : "pb-1 pe-2 text-start"}>{h}</th>)}</tr></thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.id} className="border-t border-separator-border">
                <td className="py-0.5 pe-2 tabular-nums">{l.date ?? "—"}</td>
                <td className="py-0.5 pe-2">{l.reference ?? "—"}</td>
                <td className="py-0.5 pe-2">{l.partyName ?? "—"}</td>
                {kind === "cert" ? (
                  <><td className="py-0.5 pe-2">{l.atc ?? "—"}</td><td className="py-0.5 text-end tabular-nums">{amt(l.withholding)}</td></>
                ) : (
                  <>
                    <td className="py-0.5 pe-2 text-end tabular-nums">{amt(kind === "sale" ? grossSales(l) : l.vatable + l.vatExempt + l.zeroRated)}</td>
                    <td className="py-0.5 pe-2 text-end tabular-nums">{amt(l.vat)}</td>
                    <td className="py-0.5 pe-2 text-end tabular-nums">{amt(l.total)}</td>
                    <td className="py-0.5 pe-2 text-end tabular-nums">{amt(l.withholding + l.vatWithheld)}</td>
                    <td className="py-0.5 text-end tabular-nums">{amt(l.net)}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
          {kind !== "cert" && (
            <tfoot className="font-medium">
              <tr className="border-t border-separator-border">
                <td className="py-1" colSpan={3}>Total</td>
                <td className="py-1 pe-2 text-end tabular-nums">{amt(kind === "sale" ? lines.reduce((s, l) => s + grossSales(l), 0) : t.vatable + t.vatExempt + t.zeroRated)}</td>
                <td className="py-1 pe-2 text-end tabular-nums">{amt(t.vat)}</td>
                <td className="py-1 pe-2 text-end tabular-nums">{amt(t.total)}</td>
                <td className="py-1 pe-2 text-end tabular-nums">{amt(t.withholding + t.vatWithheld)}</td>
                <td className="py-1 text-end tabular-nums">{amt(t.net)}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </Card>
  );
}
