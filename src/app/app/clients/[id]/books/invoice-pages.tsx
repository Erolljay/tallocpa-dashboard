import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Card, LinkButton, Notice } from "@/components/ui";
import { loadClientParties, loadEntryLines, loadInvoice, loadInvoiceLines, loadInvoices, loadInvoicesByOpenItem, loadTaxCodes } from "@/lib/books/data";
import { invoiceStatus, invoiceTotals, type InvoiceStatusKind } from "@/lib/books/status";
import { booksHref, cents, journalRows, matches, monthRange, partyKeyOf } from "@/lib/books/ui";
import { loadAccounts } from "@/lib/ledger/data";
import { formatAmount } from "@/lib/returns/money";
import { BooksFrame } from "./books-frame";
import { BooksList } from "./books-list";
import { booksContext, fmtDate, fmtMonth, one, type SearchParams } from "./books-context";
import { InvoiceForm, type InvoiceFormValue } from "./invoice-form";
import { TransactionJournal } from "./transaction-journal";
import { VoidForm } from "./void-form";

type Kind = "sales" | "purchase";

export const INVOICE_KINDS = {
  sales: { module: "sales-invoices", title: "Sales Invoices", one: "Sales Invoice", party: "Customer", parties: "customers" },
  purchase: { module: "purchase-invoices", title: "Purchase Invoices", one: "Purchase Invoice", party: "Supplier", parties: "suppliers" },
} as const;

export const STATUS_TONE: Record<InvoiceStatusKind, "done" | "blocked" | "waiting" | "neutral"> = {
  paid: "done",
  overdue: "blocked",
  due_today: "waiting",
  due: "waiting",
  void: "neutral",
};

type Props = { params: Promise<{ id: string }>; searchParams: Promise<SearchParams> };

/** Sales or Purchase Invoices of the month (or all of one customer's / supplier's), with status and totals. */
export async function InvoiceList({ kind, params, searchParams }: Props & { kind: Kind }) {
  const c = await booksContext(params, searchParams);
  const k = INVOICE_KINDS[kind];
  const party = one(c.sp.party);
  const range = monthRange(c.month);
  const rows = (await loadInvoices(c.supabase, c.id, kind, party ? {} : range)).filter(
    (r) => (!party || partyKeyOf(r) === party) && matches(c.q, r.reference, r.party_name, r.description, r.party_tin),
  );
  const totals = invoiceTotals(rows.map((r) => ({ total: r.total, balanceDue: r.balance_due, voided: Boolean(r.voided_at) })));
  const base = booksHref(c.id, k.module);
  const partyName = party ? rows[0]?.party_name ?? "this party" : null;

  return (
    <BooksFrame supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active={k.module} query={{ q: c.q, party }}>
      <BooksList
        title={k.title}
        newHref={booksHref(c.id, k.module, c.month, {}, "/new")}
        newLabel={`New ${k.one}`}
        search={{ action: base, q: c.q, keep: { month: c.month, party } }}
        note={
          party ? (
            <>
              All months for {partyName}. <Link href={booksHref(c.id, k.module, c.month)} className="text-button-ghost-foreground hover:underline">Show {fmtMonth(c.month)} only</Link>
            </>
          ) : null
        }
        columns={[
          { label: "Issue date" },
          { label: "Reference" },
          { label: k.party },
          { label: "Description" },
          { label: "Invoice Amount", align: "end" },
          { label: "Balance due", align: "end" },
          { label: "Status" },
        ]}
        rows={rows.map((r) => {
          const st = invoiceStatus({ balanceDue: r.balance_due, issueDate: r.issue_date, dueDate: r.due_date, voided: Boolean(r.voided_at) }, c.today);
          return {
            key: r.id,
            muted: Boolean(r.voided_at),
            editHref: r.voided_at || r.document_id || r.legacy ? null : booksHref(c.id, k.module, c.month, {}, `/${r.id}/edit`),
            viewHref: booksHref(c.id, k.module, c.month, {}, `/${r.id}`),
            cells: [
              <span key="d" className="whitespace-nowrap tabular-nums">{fmtDate(r.issue_date)}</span>,
              r.reference ?? "",
              <span key="p" className="text-text-primary">{r.party_name}</span>,
              <span key="x" className="line-clamp-1 max-w-72 text-text-secondary">{r.description ?? ""}</span>,
              formatAmount(cents(r.total)),
              formatAmount(cents(r.balance_due)),
              <Badge key="s" tone={STATUS_TONE[st.kind]}>{st.label}</Badge>,
            ],
          };
        })}
        totals={["Total", null, null, null, formatAmount(totals.total), formatAmount(totals.due), null]}
        empty={c.q ? "Nothing matches the search." : party ? "No invoices." : `No ${k.title.toLowerCase()} dated in ${fmtMonth(c.month)}.`}
        minWidth="56rem"
      />
    </BooksFrame>
  );
}

/** View: the invoice's Transaction Journal, with Edit and Void. */
export async function InvoiceView({ kind, params, searchParams }: { kind: Kind; params: Promise<{ id: string; invoiceId: string }>; searchParams: Promise<SearchParams> }) {
  const { invoiceId } = await params;
  const c = await booksContext(params, searchParams);
  const k = INVOICE_KINDS[kind];
  const inv = await loadInvoice(c.supabase, c.id, invoiceId);
  if (!inv || inv.kind !== kind) notFound();
  const [lines, entry, accounts, codes] = await Promise.all([
    loadInvoiceLines(c.supabase, inv.id),
    inv.journal_entry_id ? loadEntryLines(c.supabase, inv.journal_entry_id) : Promise.resolve([]),
    loadAccounts(c.supabase, c.id),
    loadTaxCodes(c.supabase),
  ]);
  const byOpenItem = await loadInvoicesByOpenItem(c.supabase, c.id, entry.map((l) => l.openItemId).filter(Boolean) as string[]);
  const accountName = new Map(accounts.map((a) => [a.id, a.name]));
  const codeName = new Map(codes.map((t) => [t.id, t.name]));
  const date = fmtDate(inv.issue_date);
  const rows = journalRows(entry, {
    accountName: (id) => accountName.get(id) ?? "Account",
    invoiceOf: (oi) => (byOpenItem.has(oi) ? fmtDate(byOpenItem.get(oi)!.issue_date) : null),
    invoiceLines: lines.map((l) => ({ accountId: l.account_id, amount: kind === "sales" ? cents(l.amount) : -cents(l.amount), taxCode: l.tax_code_id ? codeName.get(l.tax_code_id) ?? null : null })),
    date,
  });
  const st = invoiceStatus({ balanceDue: inv.balance_due, issueDate: inv.issue_date, dueDate: inv.due_date, voided: Boolean(inv.voided_at) }, c.today);
  const editable = !inv.voided_at && !inv.document_id && !inv.legacy;

  return (
    <BooksFrame supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active={k.module} sub={`/${inv.id}`}>
      <div className="flex flex-wrap items-center gap-2">
        <LinkButton href={booksHref(c.id, k.module, c.month)} variant="ghost" size="sm">Back to {k.title}</LinkButton>
        {editable && <LinkButton href={booksHref(c.id, k.module, c.month, {}, `/${inv.id}/edit`)} variant="secondary" size="sm">Edit</LinkButton>}
        {inv.document_id && <LinkButton href={`/app/documents/${inv.document_id}`} variant="secondary" size="sm">Document in the Inbox</LinkButton>}
        {!inv.voided_at && cents(inv.balance_due) > 0 && (
          <LinkButton href={booksHref(c.id, kind === "sales" ? "receipts" : "payments", c.month, { party: partyKeyOf(inv), invoice: inv.id }, "/new")} variant="secondary" size="sm">
            {kind === "sales" ? "New Receipt" : "New Payment"}
          </LinkButton>
        )}
      </div>
      <TransactionJournal clientName={c.client.name} type={`${k.one}${inv.reference ? ` · ${inv.reference}` : ""} · ${inv.party_name}`} date={date} rows={rows} status={<Badge tone={STATUS_TONE[st.kind]}>{st.label}</Badge>}>
        <dl className="grid gap-x-6 gap-y-1 text-body-regular sm:grid-cols-[10rem_1fr]">
          <dt className="text-text-tertiary">Invoice amount</dt><dd className="tabular-nums text-text-primary">{formatAmount(cents(inv.total))}</dd>
          <dt className="text-text-tertiary">Balance due</dt><dd className="tabular-nums text-text-primary">{formatAmount(cents(inv.balance_due))}{inv.due_date ? ` · due ${fmtDate(inv.due_date)}` : ""}</dd>
          {inv.withholding_code && (<><dt className="text-text-tertiary">Withholding</dt><dd className="text-text-primary">{inv.withholding_code} · {formatAmount(cents(inv.withholding))}</dd></>)}
          {inv.description && (<><dt className="text-text-tertiary">Description</dt><dd className="text-text-primary">{inv.description}</dd></>)}
        </dl>
        {inv.voided_at && <Notice tone="blocked">Void: {inv.void_reason}. Its entry was reversed.</Notice>}
        {inv.document_id && !inv.voided_at && <p className="text-caption-1-regular text-text-tertiary">Posted from an approved document: correct its figures in the Inbox.</p>}
        {inv.legacy && !inv.voided_at && <p className="text-caption-1-regular text-text-tertiary">Came across from the register: void it and enter it again to change it.</p>}
        {!inv.voided_at && <VoidForm clientId={c.id} target={{ invoiceId: inv.id, kind }} />}
      </TransactionJournal>
    </BooksFrame>
  );
}

/** New (no invoiceId) or Edit form. */
export async function InvoiceEdit({ kind, params, searchParams }: { kind: Kind; params: Promise<{ id: string; invoiceId?: string }>; searchParams: Promise<SearchParams> }) {
  const { invoiceId } = await params;
  const c = await booksContext(params, searchParams);
  const k = INVOICE_KINDS[kind];
  const [inv, accounts, codes, parties] = await Promise.all([
    invoiceId ? loadInvoice(c.supabase, c.id, invoiceId) : Promise.resolve(null),
    loadAccounts(c.supabase, c.id),
    loadTaxCodes(c.supabase),
    loadClientParties(c.supabase, c.id, kind),
  ]);
  if (invoiceId && (!inv || inv.kind !== kind)) notFound();
  const lines = inv ? await loadInvoiceLines(c.supabase, inv.id) : [];
  const blocked = inv && (inv.voided_at ? "This invoice is void." : inv.document_id ? "Posted from an approved document: correct its figures in the Inbox." : inv.legacy ? "Came across from the register: void it and enter it again." : null);
  const used = new Set(lines.map((l) => l.account_id));
  const value: InvoiceFormValue = inv
    ? {
        id: inv.id,
        partyId: inv.party_id && parties.some((p) => p.id === inv.party_id) ? inv.party_id : null,
        partyName: inv.party_name,
        partyTin: inv.party_tin ?? "",
        reference: inv.reference ?? "",
        issueDate: inv.issue_date,
        dueDate: inv.due_date ?? "",
        description: inv.description ?? "",
        withholdingCodeId: inv.withholding_code_id,
        withholding: Number(inv.withholding) ? inv.withholding : "",
        vatWithholdingCodeId: inv.vat_withholding_code_id,
        vatWithheld: Number(inv.vat_withheld) ? inv.vat_withheld : "",
        discount: Number(inv.discount) ? inv.discount : "",
        lines: lines.map((l) => ({ accountId: l.account_id, description: l.description ?? "", amount: l.amount, taxCodeId: l.tax_code_id })),
      }
    : {
        partyId: null,
        partyName: "",
        partyTin: "",
        reference: "",
        issueDate: c.month === c.today.slice(0, 7) ? c.today : `${c.month}-01`,
        dueDate: "",
        description: "",
        withholdingCodeId: null,
        withholding: "",
        vatWithholdingCodeId: null,
        vatWithheld: "",
        discount: "",
        lines: [{ accountId: null, description: "", amount: "", taxCodeId: null }],
      };

  return (
    <BooksFrame supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active={k.module} sub={inv ? `/${inv.id}/edit` : "/new"}>
      <Card title={inv ? `Edit ${k.one}` : `New ${k.one}`} actions={<LinkButton href={booksHref(c.id, k.module, c.month, {}, inv ? `/${inv.id}` : "")} variant="ghost" size="sm">Cancel</LinkButton>}>
        {blocked ? (
          <Notice tone="waiting">{blocked}</Notice>
        ) : (
          <InvoiceForm
            clientId={c.id}
            kind={kind}
            value={value}
            parties={parties}
            accounts={accounts.filter((a) => (a.active || used.has(a.id)) && !a.control).map((a) => ({ id: a.id, label: `${a.code} · ${a.name}` }))}
            taxCodes={codes}
            minDate={c.books.booksStart}
          />
        )}
      </Card>
      {inv && !blocked && <p className="text-caption-1-regular text-text-tertiary">Saving reverses the invoice&rsquo;s entry and posts it again. An invoice already paid in part must have its receipts or payments voided first.</p>}
    </BooksFrame>
  );
}
