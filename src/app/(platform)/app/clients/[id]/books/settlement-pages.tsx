import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Card, LinkButton, Notice } from "@/components/ui";
import { loadAllocations, loadEntryLines, loadInvoices, loadInvoicesById, loadInvoicesByOpenItem, loadSettlement, loadSettlements } from "@/lib/books/data";
import { booksHref, cents, journalRows, matches, partyKeyOf, pesos } from "@/lib/books/ui";
import { loadAccounts } from "@/lib/ledger/data";
import { formatAmount } from "@/lib/returns/money";
import { BooksFrame } from "./books-frame";
import { BooksList } from "./books-list";
import { booksContext, fmtDate, one, type SearchParams } from "./books-context";
import { SettlementForm, type OpenInvoice, type SettlementFormValue } from "./settlement-form";
import { TransactionJournal } from "./transaction-journal";
import { VoidForm } from "./void-form";

type Kind = "receipt" | "payment";

export const SETTLEMENT_KINDS = {
  receipt: { module: "receipts", title: "Receipts", one: "Receipt", cash: "Received in", party: "Paid by", invoices: "sales" },
  payment: { module: "payments", title: "Payments", one: "Payment", cash: "Paid from", party: "Payee", invoices: "purchase" },
} as const;

type Props = { params: Promise<{ id: string }>; searchParams: Promise<SearchParams> };

/** Receipts or Payments of the month, with totals. */
export async function SettlementList({ kind, params, searchParams }: Props & { kind: Kind }) {
  const c = await booksContext(params, searchParams);
  const k = SETTLEMENT_KINDS[kind];
  const [rows0, accounts] = await Promise.all([loadSettlements(c.supabase, c.id, kind, { from: c.range.from, to: c.range.to }), loadAccounts(c.supabase, c.id)]);
  const name = new Map(accounts.map((a) => [a.id, a.name]));
  const rows = rows0.filter((r) => matches(c.q, r.reference, r.party_name, r.description, name.get(r.cash_account_id)));
  const total = rows.filter((r) => !r.voided_at).reduce((s, r) => s + cents(r.amount), 0);

  return (
    <BooksFrame range={c.range} supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active={k.module} query={{ q: c.q }}>
      <BooksList
        title={k.title}
        newHref={booksHref(c.id, k.module, c.month, {}, "/new")}
        newLabel={`New ${k.one}`}
        search={{ action: booksHref(c.id, k.module), q: c.q, keep: { month: c.month } }}
        columns={[{ label: "Date" }, { label: "Reference" }, { label: k.cash }, { label: "Description" }, { label: k.party }, { label: "Amount", align: "end" }]}
        rows={rows.map((r) => ({
          key: r.id,
          muted: Boolean(r.voided_at),
          editHref: r.voided_at || r.legacy || r.document_id ? null : booksHref(c.id, k.module, c.month, {}, `/${r.id}/edit`),
          viewHref: booksHref(c.id, k.module, c.month, {}, `/${r.id}`),
          cells: [
            <span key="d" className="whitespace-nowrap tabular-nums">{fmtDate(r.settle_date)}</span>,
            r.reference ?? "",
            name.get(r.cash_account_id) ?? "",
            <span key="x" className="line-clamp-1 max-w-72 text-text-secondary">{r.description ?? ""}</span>,
            <span key="p" className="text-text-primary">{r.party_name}</span>,
            r.voided_at ? <span key="v" className="inline-flex items-center gap-2"><Badge>Void</Badge>{formatAmount(cents(r.amount))}</span> : formatAmount(cents(r.amount)),
          ],
        }))}
        totals={["Total", null, null, null, null, formatAmount(total)]}
        empty={c.q ? "Nothing matches the search." : `No ${k.title.toLowerCase()} dated in ${c.range.label}.`}
      />
    </BooksFrame>
  );
}

/** View: the receipt's or payment's Transaction Journal, with Edit and Void. */
export async function SettlementView({ kind, params, searchParams }: { kind: Kind; params: Promise<{ id: string; settlementId: string }>; searchParams: Promise<SearchParams> }) {
  const { settlementId } = await params;
  const c = await booksContext(params, searchParams);
  const k = SETTLEMENT_KINDS[kind];
  const s = await loadSettlement(c.supabase, c.id, settlementId);
  if (!s || s.kind !== kind) notFound();
  const [entry, accounts, allocations] = await Promise.all([
    s.journal_entry_id ? loadEntryLines(c.supabase, s.journal_entry_id) : Promise.resolve([]),
    loadAccounts(c.supabase, c.id),
    loadAllocations(c.supabase, s.id),
  ]);
  const [byOpenItem, invoices] = await Promise.all([
    loadInvoicesByOpenItem(c.supabase, c.id, entry.map((l) => l.openItemId).filter(Boolean) as string[]),
    loadInvoicesById(c.supabase, c.id, allocations.map((a) => a.invoice_id)),
  ]);
  const accountName = new Map(accounts.map((a) => [a.id, a.name]));
  const date = fmtDate(s.settle_date);
  const rows = journalRows(entry, {
    accountName: (id) => accountName.get(id) ?? "Account",
    invoiceOf: (oi) => {
      const inv = byOpenItem.get(oi);
      return inv ? `${inv.reference ? `${inv.reference} · ` : ""}${fmtDate(inv.issue_date)}` : null;
    },
    date,
  });
  const invModule = kind === "receipt" ? "sales-invoices" : "purchase-invoices";
  const editable = !s.voided_at && !s.legacy && !s.document_id;

  return (
    <BooksFrame range={c.range} supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active={k.module} sub={`/${s.id}`}>
      <div className="flex flex-wrap items-center gap-2">
        <LinkButton href={booksHref(c.id, k.module, c.month)} variant="ghost" size="sm">Back to {k.title}</LinkButton>
        {editable && <LinkButton href={booksHref(c.id, k.module, c.month, {}, `/${s.id}/edit`)} variant="secondary" size="sm">Edit</LinkButton>}
        {s.document_id && <LinkButton href={`/app/documents/${s.document_id}`} variant="secondary" size="sm">Document in the Inbox</LinkButton>}
      </div>
      <TransactionJournal clientName={c.client.name} type={`${k.one}${s.reference ? ` · ${s.reference}` : ""} · ${s.party_name}`} date={date} rows={rows} status={s.voided_at ? <Badge>Void</Badge> : undefined}>
        {invoices.length > 0 && (
          <div>
            <h3 className="mb-1 text-body-medium text-text-primary">Settles</h3>
            <ul className="space-y-0.5 text-body-regular">
              {invoices.map((i) => (
                <li key={i.id} className="flex flex-wrap justify-between gap-3">
                  <Link href={booksHref(c.id, invModule, c.month, {}, `/${i.id}`)} className="text-button-ghost-foreground hover:underline">{i.reference ?? "Invoice"} · {fmtDate(i.issue_date)}</Link>
                  <span className="tabular-nums text-text-primary">{formatAmount(cents(allocations.find((a) => a.invoice_id === i.id)?.amount))}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {s.voided_at && <Notice tone="blocked">Void: {s.void_reason}. Its entry was reversed.</Notice>}
        {s.document_id && !s.voided_at && <p className="text-caption-1-regular text-text-tertiary">Posted from an approved document with its invoice: correct the document in the Inbox.</p>}
        {!s.voided_at && <VoidForm clientId={c.id} target={{ settlementId: s.id, kind }} />}
      </TransactionJournal>
    </BooksFrame>
  );
}

/** New (no settlementId) or Edit. ?party=<key>&invoice=<id> start a new one on an invoice. */
export async function SettlementEdit({ kind, params, searchParams }: { kind: Kind; params: Promise<{ id: string; settlementId?: string }>; searchParams: Promise<SearchParams> }) {
  const { settlementId } = await params;
  const c = await booksContext(params, searchParams);
  const k = SETTLEMENT_KINDS[kind];
  const [s, accounts, open] = await Promise.all([
    settlementId ? loadSettlement(c.supabase, c.id, settlementId) : Promise.resolve(null),
    loadAccounts(c.supabase, c.id),
    loadInvoices(c.supabase, c.id, k.invoices, { openOnly: true }),
  ]);
  if (settlementId && (!s || s.kind !== kind)) notFound();
  const allocations = s ? await loadAllocations(c.supabase, s.id) : [];
  const allocated = await loadInvoicesById(c.supabase, c.id, allocations.map((a) => a.invoice_id).filter((id) => !open.some((o) => o.id === id)));
  const share = new Map(allocations.map((a) => [a.invoice_id, cents(a.amount)]));
  const invoices: OpenInvoice[] = [...open, ...allocated]
    .filter((i) => !i.voided_at)
    .map((i) => ({ id: i.id, partyKey: partyKeyOf(i), partyId: i.party_id, partyName: i.party_name, reference: i.reference, issueDate: i.issue_date, balance: cents(i.balance_due) + (share.get(i.id) ?? 0) }));
  const blocked = s && (s.voided_at ? `This ${kind} is void.` : s.legacy ? `Came across from the register: void its invoice and enter both again.` : s.document_id ? "Posted from an approved document: correct the document in the Inbox." : null);
  const askedInvoice = one(c.sp.invoice);
  const asked = invoices.find((i) => i.id === askedInvoice);
  const cash = accounts.filter((a) => (a.active || a.id === s?.cash_account_id) && (a.control === "cash" || a.control === "bank"));
  const value: SettlementFormValue = s
    ? {
        id: s.id,
        date: s.settle_date,
        cashAccountId: s.cash_account_id,
        partyKey: partyKeyOf(s),
        reference: s.reference ?? "",
        description: s.description ?? "",
        deduction: Number(s.deduction) ? s.deduction : "",
        deductionAccountId: s.deduction_account_id,
        allocations: Object.fromEntries(allocations.map((a) => [a.invoice_id, a.amount])),
      }
    : {
        date: c.month === c.today.slice(0, 7) ? c.today : `${c.month}-01`,
        cashAccountId: cash.length === 1 ? cash[0].id : null,
        partyKey: asked?.partyKey ?? (one(c.sp.party) || null),
        reference: "",
        description: "",
        deduction: "",
        deductionAccountId: null,
        allocations: asked ? { [asked.id]: pesos(asked.balance) } : {},
      };

  return (
    <BooksFrame range={c.range} supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active={k.module} sub={s ? `/${s.id}/edit` : "/new"}>
      <Card title={s ? `Edit ${k.one}` : `New ${k.one}`} actions={<LinkButton href={booksHref(c.id, k.module, c.month, {}, s ? `/${s.id}` : "")} variant="ghost" size="sm">Cancel</LinkButton>}>
        {blocked ? (
          <Notice tone="waiting">{blocked}</Notice>
        ) : cash.length === 0 ? (
          <Notice tone="blocked">The chart of accounts has no cash or bank account. Add one under Settings → Chart of accounts.</Notice>
        ) : (
          <SettlementForm
            clientId={c.id}
            kind={kind}
            value={value}
            invoices={invoices}
            cashAccounts={cash.map((a) => ({ id: a.id, label: `${a.code} · ${a.name}` }))}
            deductionAccounts={accounts.filter((a) => a.active && (a.type === "expense" || a.type === "other_income" || a.type === "revenue")).map((a) => ({ id: a.id, label: `${a.code} · ${a.name}` }))}
            minDate={c.books.booksStart}
          />
        )}
      </Card>
    </BooksFrame>
  );
}
