import Link from "next/link";
import { Badge, Card, LinkButton, Notice } from "@/components/ui";
import { showMonth } from "@/lib/documents/labels";
import { BOOKS_GO_LIVE } from "@/lib/ledger/types";
import { grossSales } from "@/lib/register/parts";
import { formatAmount, toCentavos } from "@/lib/returns/money";
import type { supabaseServer } from "@/lib/supabase/server";
import { loadPeriodFile } from "@/lib/workpapers/load";
import { approvalMemo, type MemoMonth } from "@/lib/workpapers/memo";
import { monthsOf } from "@/lib/workpapers/tieouts";

type Db = Awaited<ReturnType<typeof supabaseServer>>;
const amt = (c: number | null) => (c == null ? "—" : `₱${formatAmount(c)}`);
const TIE: Record<string, { label: string; tone: "done" | "waiting" | "blocked" }> = {
  clean: { label: "Agrees", tone: "done" },
  explained: { label: "Explained", tone: "waiting" },
  open: { label: "Open", tone: "blocked" },
};

/**
 * The approval memo (W4; recommendation 6), above the Owner's final approval: tax due
 * against the previous period, the rate on sales, the tie-outs, the adjustments, the
 * review notes, the workpapers' sign-off, and who prepared and reviewed the return.
 */
export async function ApprovalMemo(props: {
  db: Db;
  filing: { id: string; clientId: string; obligationId: string; form: string; periodStart: string; periodEnd: string; taxDue: number | null };
  preparedBy: string | null;
  reviewedBy: string | null;
}) {
  const { db, filing: f } = props;
  const [{ data: prev }, { data: books }] = await Promise.all([
    db.from("filing_instances").select("period_label, tax_due").eq("obligation_id", f.obligationId).lt("period_end", f.periodStart)
      .order("period_end", { ascending: false }).order("amendment_no", { ascending: false }).limit(1).maybeSingle(),
    db.from("client_books").select("books_start").eq("client_id", f.clientId).maybeSingle(),
  ]);
  // Workpapers exist from the client's books start, not before the January 2027 cycle.
  const start = books?.books_start ? `${String(books.books_start).slice(0, 7)}-01` : null;
  const from = start && start > BOOKS_GO_LIVE ? start : BOOKS_GO_LIVE;
  const months: MemoMonth[] = [];
  if (books) {
    for (const m of monthsOf(f.periodStart, f.periodEnd).filter((x) => x >= from)) {
      const file = await loadPeriodFile(db, f.clientId, m);
      months.push({
        month: m,
        ties: file.ties,
        adjustments: file.adjustments.map((a) => ({ label: a.memo, amount: a.amount, ticked: Boolean(a.tickedAt), reversed: a.reversed })),
        notes: file.notes.map((n) => ({ cleared: Boolean(n.clearedAt) })),
        signoffs: file.signoffs,
        sales: file.lines.filter((l) => l.kind === "sale").reduce((s, l) => s + grossSales(l), 0),
      });
    }
  }
  const memo = approvalMemo({
    form: f.form,
    taxDue: f.taxDue == null ? null : (toCentavos(f.taxDue) ?? 0),
    previous: prev ? { periodLabel: prev.period_label, taxDue: prev.tax_due == null ? null : (toCentavos(Number(prev.tax_due)) ?? 0) } : null,
    months,
    preparedBy: props.preparedBy,
    reviewedBy: props.reviewedBy,
  });
  const range = `from=${f.periodStart.slice(0, 7)}&to=${f.periodEnd.slice(0, 7)}`;

  return (
    <Card title="Approval memo" actions={<LinkButton href={`/app/clients/${f.clientId}/workpapers/binder?${range}`} variant="secondary" size="sm">Workpaper binder</LinkButton>}>
      <div className="space-y-4">
        {memo.attention.length > 0 && (
          <Notice tone="waiting">
            <ul className="list-disc space-y-0.5 ps-4">{memo.attention.map((a) => <li key={a}>{a}</li>)}</ul>
          </Notice>
        )}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-body-regular sm:grid-cols-4">
          <div><dt className="text-caption-1-regular text-text-tertiary">Tax due</dt><dd className="tabular-nums text-text-primary">{amt(memo.taxDue)}</dd></div>
          <div>
            <dt className="text-caption-1-regular text-text-tertiary">{memo.previous ? `Previous (${memo.previous.periodLabel})` : "Previous period"}</dt>
            <dd className="tabular-nums text-text-primary">{memo.previous ? amt(memo.previous.taxDue) : "None in the OS"}{memo.changePct != null && <span className="text-text-tertiary"> · {memo.changePct > 0 ? "+" : ""}{memo.changePct}%</span>}</dd>
          </div>
          <div><dt className="text-caption-1-regular text-text-tertiary">Sales in the register</dt><dd className="tabular-nums text-text-primary">{memo.sales ? amt(memo.sales) : "—"}</dd></div>
          <div><dt className="text-caption-1-regular text-text-tertiary">Tax due on sales</dt><dd className="tabular-nums text-text-primary">{memo.rateOnSales == null ? "—" : `${memo.rateOnSales}%`}</dd></div>
          <div><dt className="text-caption-1-regular text-text-tertiary">Prepared by</dt><dd className="text-text-primary">{memo.preparedBy ?? "—"}</dd></div>
          <div><dt className="text-caption-1-regular text-text-tertiary">Reviewed by</dt><dd className="text-text-primary">{memo.reviewedBy ?? "—"}</dd></div>
          <div><dt className="text-caption-1-regular text-text-tertiary">Review notes</dt><dd className="text-text-primary">{memo.notes.raised ? `${memo.notes.raised} raised · ${memo.notes.cleared} cleared` : "None"}</dd></div>
          <div><dt className="text-caption-1-regular text-text-tertiary">Workpapers reviewed</dt><dd className="text-text-primary">{memo.workpapers.length ? `${memo.workpapers.filter((w) => w.reviewed).length} of ${memo.workpapers.length}` : "—"}</dd></div>
        </dl>

        {memo.ties.length > 0 && (
          <section>
            <h3 className="mb-1 text-body-medium text-text-primary">Tie-outs</h3>
            <ul className="space-y-1">
              {memo.ties.map((t) => (
                <li key={`${t.id}-${t.month}`} className="flex flex-wrap items-start gap-x-3 text-body-regular">
                  <span className="w-28 shrink-0 text-text-secondary">{t.id} · {showMonth(t.month).split(" ")[0]}</span>
                  <Badge tone={TIE[t.status].tone}>{TIE[t.status].label}</Badge>
                  {t.status !== "clean" && <span className="min-w-0 flex-1 text-text-secondary">{amt(t.difference)}{t.explanation ? ` · “${t.explanation}”` : ""}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
        {memo.adjustments.length > 0 && (
          <section>
            <h3 className="mb-1 text-body-medium text-text-primary">Adjustments</h3>
            <ul className="space-y-1 text-body-regular">
              {memo.adjustments.map((a, i) => (
                <li key={`${a.month}-${i}`} className="flex flex-wrap gap-x-3">
                  <span className="text-text-primary">{a.label}</span>
                  <span className="tabular-nums text-text-secondary">{amt(a.amount)}</span>
                  <Badge tone={a.ticked ? "done" : "waiting"}>{a.ticked ? "Ticked" : "Not ticked"}</Badge>
                </li>
              ))}
            </ul>
          </section>
        )}
        {months.length === 0 && (
          <p className="text-caption-1-regular text-text-tertiary">No workpapers for this period (before the books or the January 2027 cycle).{" "}
            <Link href={`/app/clients/${f.clientId}`} className="hover:underline">Client</Link>
          </p>
        )}
      </div>
    </Card>
  );
}
