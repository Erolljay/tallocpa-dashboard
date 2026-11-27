import Link from "next/link";
import { Badge, Card } from "@/components/ui";
import { loadAssets } from "@/lib/assets/load";
import { cutoffOf } from "@/lib/ledger/cutoff";
import type { booksAccess } from "@/lib/ledger/data";
import { openingChecklist, type ChecklistItem, type ItemStatus, type OpeningBalance } from "@/lib/ledger/opening-checklist";
import type { LedgerAccount } from "@/lib/ledger/types";
import type { Centavos } from "@/lib/returns/types";
import { ChangeBooksStartForm } from "./forms";

type Access = Awaited<ReturnType<typeof booksAccess>>;
const STATUS: Record<ItemStatus, { label: string; tone: "done" | "blocked" | "waiting" | "neutral" | "progress" }> = {
  done: { label: "Done", tone: "done" },
  todo: { label: "To do", tone: "blocked" },
  warn: { label: "Check", tone: "waiting" },
  info: { label: "Note", tone: "neutral" },
  na: { label: "Not needed", tone: "neutral" },
};

/**
 * The opening balance checklist (Owner, 25 November 2026), for this client's own cut-off:
 * the start of a calendar or fiscal year, or part-way through it.
 */
export async function OpeningChecklist({ access, accounts, balances, entered }: { access: Access; accounts: LedgerAccount[]; balances: Map<string, Centavos>; entered: boolean }) {
  const { supabase, client, books } = access;
  if (!books) return null;
  const id = client.id;
  const cutoff = cutoffOf(books.booksStart, client.fiscal_year_end_month);
  const calendarStart = `${books.booksStart.slice(0, 4)}-01-01`;
  const [assets, { count: employees }, { data: payMonths }, { data: filings }, { count: certificates }, { count: entries }] = await Promise.all([
    loadAssets(supabase, id),
    supabase.from("employees").select("id", { count: "exact", head: true }).eq("client_id", id),
    supabase.from("payroll_entries").select("pay_month").eq("client_id", id).gte("pay_month", calendarStart).lt("pay_month", books.booksStart),
    supabase.from("filing_instances").select("form, period_label, status").eq("client_id", id).gte("period_start", cutoff.yearStart).lt("period_end", books.booksStart).order("period_end"),
    supabase.from("documents").select("id", { count: "exact", head: true }).eq("client_id", id).eq("doc_type", "bir_2307_received").gte("document_month", cutoff.yearStart).lte("document_month", cutoff.openingAsOf).not("status", "in", "(uploading,split)"),
    supabase.from("journal_entries").select("id", { count: "exact", head: true }).eq("client_id", id).neq("source", "opening"),
  ]);
  const opening: OpeningBalance[] | null = entered
    ? accounts.filter((a) => balances.has(a.id)).map((a) => ({ type: a.type, fsLine: a.fsLine, control: a.control, key: a.key, normalSide: a.normalSide, net: balances.get(a.id) ?? 0 }))
    : null;
  const items = openingChecklist({
    cutoff,
    opening,
    openingAssets: assets.filter((a) => a.source === "opening"),
    payroll: { employees: employees ?? 0, months: [...new Set((payMonths ?? []).map((p) => String(p.pay_month).slice(0, 10)))] },
    earlierReturns: (filings ?? []).map((f) => ({ form: f.form, periodLabel: f.period_label, filed: ["filed", "paid", "proof_uploaded"].includes(f.status) })),
    certificatesBefore: certificates ?? 0,
  });
  const todo = items.filter((x) => x.status === "todo").length;
  const href: Record<NonNullable<ChecklistItem["where"]>, string> = {
    opening: "#opening",
    fixed_assets: `/app/clients/${id}/fixed-assets`,
    payroll: `/app/clients/${id}/payroll`,
    documents: `/app/documents?client=${id}`,
    returns: `/app/clients/${id}`,
    books_start: "#books-start",
  };

  return (
    <Card title="Opening balance checklist" actions={todo ? <Badge tone="blocked">{todo} to do</Badge> : <Badge tone="done">Complete</Badge>}>
      <ul className="divide-y divide-separator-border">
        {items.map((x) => (
          <li key={x.key} className="flex flex-wrap items-start gap-x-4 gap-y-1 py-3">
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="text-body-medium text-text-primary">
                {x.where && x.where !== "books_start" ? <Link href={href[x.where]} className="hover:underline">{x.title}</Link> : x.title}
              </p>
              <p className="text-caption-1-regular text-text-secondary">{x.detail}</p>
            </div>
            <Badge tone={STATUS[x.status].tone}>{STATUS[x.status].label}</Badge>
          </li>
        ))}
      </ul>
      {(entries ?? 0) === 0 && (
        <div id="books-start" className="mt-4 border-t border-separator-border pt-4">
          <ChangeBooksStartForm clientId={id} current={books.booksStart.slice(0, 7)} hasOpening={entered} />
        </div>
      )}
    </Card>
  );
}
