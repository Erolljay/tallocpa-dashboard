import Link from "next/link";
import { loadPartyBalances } from "@/lib/books/data";
import { booksHref, matches } from "@/lib/books/ui";
import { formatAmount } from "@/lib/returns/money";
import { BooksFrame } from "./books-frame";
import { BooksList } from "./books-list";
import { booksContext, type SearchParams } from "./books-context";

const KINDS = {
  sales: { module: "customers", title: "Customers", invoices: "sales-invoices", balance: "Accounts receivable", newInvoice: "New Sales Invoice" },
  purchase: { module: "suppliers", title: "Suppliers", invoices: "purchase-invoices", balance: "Accounts payable", newInvoice: "New Purchase Invoice" },
} as const;

/** Customers or Suppliers (from their invoices): name, TIN, and what is still due, linking to their invoices. */
export async function PartyList({ kind, params, searchParams }: { kind: "sales" | "purchase"; params: Promise<{ id: string }>; searchParams: Promise<SearchParams> }) {
  const c = await booksContext(params, searchParams);
  const k = KINDS[kind];
  const rows = (await loadPartyBalances(c.supabase, c.id, kind)).filter((p) => matches(c.q, p.name, p.tin));
  const total = rows.reduce((s, p) => s + p.balance, 0);
  return (
    <BooksFrame range={c.range} supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active={k.module} query={{ q: c.q }}>
      <BooksList
        title={k.title}
        newHref={booksHref(c.id, k.invoices, c.month, {}, "/new")}
        newLabel={k.newInvoice}
        search={{ action: booksHref(c.id, k.module), q: c.q, keep: { month: c.month } }}
        note={<>Balances as of today, from every invoice not void. The directory of {k.title.toLowerCase()} is under <Link href={`/app/parties?client=${c.id}`} className="text-button-ghost-foreground hover:underline">Customers &amp; suppliers</Link>.</>}
        columns={[{ label: "Name" }, { label: "TIN" }, { label: "Invoices", align: "end" }, { label: k.balance, align: "end" }]}
        rows={rows.map((p) => ({
          key: p.key,
          viewHref: booksHref(c.id, k.invoices, c.month, { party: p.key }),
          cells: [
            <span key="n" className="text-text-primary">{p.name}</span>,
            <span key="t" className="tabular-nums text-text-secondary">{p.tin ?? ""}</span>,
            p.invoices,
            <Link key="b" href={booksHref(c.id, k.invoices, c.month, { party: p.key })} className="text-text-primary hover:underline">{formatAmount(p.balance)}</Link>,
          ],
        }))}
        totals={["Total", null, rows.reduce((s, p) => s + p.invoices, 0), formatAmount(total)]}
        empty={c.q ? "Nothing matches the search." : `No ${k.title.toLowerCase()} yet. They appear with their first invoice.`}
        minWidth="36rem"
      />
    </BooksFrame>
  );
}
