import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Card, LinkButton, Notice } from "@/components/ui";
import { payslips } from "@/lib/books/actions";
import { loadEntryLines, loadTaxCodes } from "@/lib/books/data";
import { formsFor, TAX_CODE_KIND_LABELS, appliesTo, type InvoiceKind } from "@/lib/books/tax-codes";
import { booksHref, cents, journalRows, matches, monthRange } from "@/lib/books/ui";
import { BOOK_TITLES } from "@/lib/ledger/books";
import { loadAccounts, loadTrialBalance } from "@/lib/ledger/data";
import { BOOKS, ENTRY_SOURCES, type Book, type EntrySource } from "@/lib/ledger/types";
import { loadEmployees } from "@/lib/payroll/data";
import { EMPLOYMENT_STATUSES } from "@/lib/payroll/types";
import { byName, displayName } from "@/lib/payroll/year";
import { formatAmount } from "@/lib/returns/money";
import { BooksFrame } from "./books-frame";
import { BooksList } from "./books-list";
import { booksContext, fmtDate, fmtMonth, type SearchParams } from "./books-context";
import { ReverseForm } from "./forms";
import { TransactionJournal } from "./transaction-journal";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<SearchParams> };

const dayBefore = (iso: string) => new Date(Date.parse(`${iso}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);

/** Bank and Cash Accounts: each cash or bank account with its balance from the ledger at the end of the month. */
export async function BankAccounts({ params, searchParams }: Props) {
  const c = await booksContext(params, searchParams);
  const { from, to } = c.range;
  const [accounts, tb] = await Promise.all([loadAccounts(c.supabase, c.id), loadTrialBalance(c.supabase, c.id, from < c.books.booksStart ? dayBefore(c.books.booksStart) : from, to)]);
  const cash = accounts.filter((a) => a.control === "cash" || a.control === "bank").filter((a) => matches(c.q, a.code, a.name));
  const row = new Map(tb.map((r) => [r.accountId, r]));
  const sum = (f: "opening" | "debit" | "credit" | "closing") => cash.reduce((s, a) => s + (row.get(a.id)?.[f] ?? 0), 0);
  const gl = (id: string) => `/app/clients/${c.id}/books/print?book=general_ledger&from=${from}&to=${to}#${id}`;
  return (
    <BooksFrame range={c.range} supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active="bank-accounts" query={{ q: c.q }}>
      <BooksList
        title="Bank and Cash Accounts"
        newHref={`/app/clients/${c.id}/books/accounts`}
        newLabel="New account"
        search={{ action: booksHref(c.id, "bank-accounts"), q: c.q, keep: { month: c.month } }}
        note={<>Actual balances from the ledger for {c.range.label}. Bank reconciliation is not in the app yet; the general ledger of each account lists its entries.</>}
        columns={[{ label: "Code" }, { label: "Name" }, { label: c.range.view === "month" ? "Start of month" : "Start of period", align: "end" }, { label: "Received", align: "end" }, { label: "Paid", align: "end" }, { label: "Actual balance", align: "end" }]}
        rows={cash.map((a) => {
          const r = row.get(a.id);
          return {
            key: a.id,
            muted: !a.active,
            viewHref: gl(a.id),
            cells: [
              <span key="c" className="tabular-nums text-text-secondary">{a.code}</span>,
              <span key="n" className="text-text-primary">{a.name}{a.control === "bank" ? "" : <span className="text-text-tertiary"> · cash</span>}</span>,
              formatAmount(r?.opening ?? 0),
              formatAmount(r?.debit ?? 0),
              formatAmount(r?.credit ?? 0),
              formatAmount(r?.closing ?? 0),
            ],
          };
        })}
        totals={["", "Total", formatAmount(sum("opening")), formatAmount(sum("debit")), formatAmount(sum("credit")), formatAmount(sum("closing"))]}
        empty="No cash or bank accounts in the chart of accounts."
      />
    </BooksFrame>
  );
}

/** Employees: the client's payroll employees, kept on the Payroll pages. */
export async function Employees({ params, searchParams }: Props) {
  const c = await booksContext(params, searchParams);
  const list = (await loadEmployees(c.supabase, c.id)).sort(byName).filter((e) => matches(c.q, displayName(e), e.employeeNo, e.tin));
  const pay = `/app/clients/${c.id}/payroll`;
  return (
    <BooksFrame range={c.range} supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active="employees" query={{ q: c.q }}>
      <BooksList
        title="Employees"
        newHref={`${pay}/employees/new`}
        newLabel="New Employee"
        search={{ action: booksHref(c.id, "employees"), q: c.q, keep: { month: c.month } }}
        note={<>Kept on the <Link href={pay} className="text-button-ghost-foreground hover:underline">Payroll</Link> pages (payslip items, alphalist, 2316).</>}
        columns={[{ label: "Name" }, { label: "Employee no." }, { label: "TIN" }, { label: "Status" }, { label: "Hired" }]}
        rows={list.map((e) => ({
          key: e.id,
          muted: !e.active,
          editHref: `${pay}/employees/${e.id}`,
          cells: [
            <span key="n" className="text-text-primary">{displayName(e)}</span>,
            e.employeeNo ?? "",
            <span key="t" className="tabular-nums">{e.tin ?? ""}</span>,
            e.active ? EMPLOYMENT_STATUSES[e.employmentStatus] : "Inactive",
            e.hireDate ? fmtDate(e.hireDate) : "",
          ],
        }))}
        empty={c.q ? "Nothing matches the search." : "No employees yet."}
        minWidth="40rem"
      />
    </BooksFrame>
  );
}

/** Payslips of the month (payslips()): date, employee, pay period, gross, deductions, net. */
export async function Payslips({ params, searchParams }: Props) {
  const c = await booksContext(params, searchParams);
  const rows = (await payslips(c.id, `${c.month}-01`, c.supabase)).filter((p) => matches(c.q, p.employee_name, p.employee_no));
  const t = (f: (p: (typeof rows)[number]) => string | number) => rows.reduce((s, p) => s + cents(f(p)), 0);
  const monthPage = `/app/clients/${c.id}/payroll/month/${c.month}`;
  const { to } = monthRange(c.month);
  return (
    <BooksFrame range={c.range} supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active="payslips" query={{ q: c.q }}>
      <BooksList
        title="Payslips"
        newHref={monthPage}
        newLabel="New Payslips"
        search={{ action: booksHref(c.id, "payslips"), q: c.q, keep: { month: c.month } }}
        note={<>From the payroll of {fmtMonth(c.month)}. Load and post it on the <Link href={monthPage} className="text-button-ghost-foreground hover:underline">payroll month</Link> page.</>}
        columns={[{ label: "Date" }, { label: "Employee" }, { label: "Pay period" }, { label: "Gross", align: "end" }, { label: "Deductions", align: "end" }, { label: "Net", align: "end" }, { label: "Books" }]}
        rows={rows.map((p) => ({
          key: p.payroll_entry_id,
          viewHref: p.journal_entry_id ? booksHref(c.id, "journal", c.month, {}, `/${p.journal_entry_id}`) : monthPage,
          cells: [
            <span key="d" className="whitespace-nowrap tabular-nums">{fmtDate(p.pay_period_end ?? to)}</span>,
            <span key="n" className="text-text-primary">{p.employee_name}</span>,
            p.pay_period_end ? `Until ${fmtDate(p.pay_period_end)}` : fmtMonth(p.pay_month),
            formatAmount(cents(p.gross)),
            formatAmount(cents(p.deductions) + cents(p.sss_loan) + cents(p.pagibig_loan) + cents(p.other_deductions)),
            formatAmount(cents(p.net)),
            p.journal_entry_id ? <Badge key="b" tone="done">Posted</Badge> : <Badge key="b">Not posted</Badge>,
          ],
        }))}
        totals={["Total", null, null, formatAmount(t((p) => p.gross)), formatAmount(t((p) => p.deductions) + t((p) => p.sss_loan) + t((p) => p.pagibig_loan) + t((p) => p.other_deductions)), formatAmount(t((p) => p.net)), null]}
        empty={c.q ? "Nothing matches the search." : `No payslips for ${fmtMonth(c.month)}.`}
        minWidth="52rem"
      />
    </BooksFrame>
  );
}

/** Journal Entries: the month's manual entries (adjustments, depreciation, accruals, corrections). */
export async function JournalList({ params, searchParams }: Props) {
  const c = await booksContext(params, searchParams);
  const { from, to } = c.range;
  const { data, error } = await c.supabase
    .from("journal_entries")
    .select("id, entry_date, reference, memo, status, journal_lines(debit)")
    .eq("client_id", c.id)
    .eq("source", "manual")
    .neq("status", "suggested")
    .gte("entry_date", from)
    .lte("entry_date", to)
    .order("entry_date", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Could not load the journal entries: ${error.message}`);
  const rows = (data ?? [])
    .map((e) => ({ ...e, total: ((e.journal_lines ?? []) as { debit: string }[]).reduce((s, l) => s + cents(l.debit), 0) }))
    .filter((e) => matches(c.q, e.reference, e.memo));
  return (
    <BooksFrame range={c.range} supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active="journal" query={{ q: c.q }}>
      <BooksList
        title="Journal Entries"
        newHref={`/app/clients/${c.id}/books/journal/new`}
        newLabel="New Journal Entry"
        search={{ action: booksHref(c.id, "journal"), q: c.q, keep: { month: c.month } }}
        note={<>Adjustments only: invoices, receipts, payments and payslips post their own entries. A posted entry never changes; reverse it and post a new one. Every entry of every kind is in the <Link href={`/app/clients/${c.id}/books/tools#journal`} className="text-button-ghost-foreground hover:underline">ledger tools</Link>.</>}
        columns={[{ label: "Date" }, { label: "Reference" }, { label: "Narration" }, { label: "Amount", align: "end" }, { label: "Status" }]}
        rows={rows.map((e) => ({
          key: e.id,
          muted: e.status === "reversed",
          viewHref: booksHref(c.id, "journal", c.month, {}, `/${e.id}`),
          cells: [
            <span key="d" className="whitespace-nowrap tabular-nums">{fmtDate(e.entry_date)}</span>,
            e.reference ?? "",
            <span key="m" className="text-text-primary">{e.memo}</span>,
            formatAmount(e.total),
            e.status === "reversed" ? <Badge key="s">Reversed</Badge> : <Badge key="s" tone="done">Posted</Badge>,
          ],
        }))}
        totals={["Total", null, null, formatAmount(rows.filter((e) => e.status !== "reversed").reduce((s, e) => s + e.total, 0)), null]}
        empty={c.q ? "Nothing matches the search." : `No journal entries dated in ${c.range.label}.`}
      />
    </BooksFrame>
  );
}

/** View any journal entry in Manager's Transaction Journal style, with Reverse for a manual one. */
export async function JournalView({ params, searchParams }: { params: Promise<{ id: string; entryId: string }>; searchParams: Promise<SearchParams> }) {
  const { entryId } = await params;
  const c = await booksContext(params, searchParams);
  const { data: e } = await c.supabase.from("journal_entries").select("id, entry_date, book, source, status, reference, memo").eq("client_id", c.id).eq("id", entryId).maybeSingle();
  if (!e) notFound();
  const [lines, accounts] = await Promise.all([loadEntryLines(c.supabase, e.id), loadAccounts(c.supabase, c.id)]);
  const name = new Map(accounts.map((a) => [a.id, a.name]));
  const rows = journalRows(lines, { accountName: (id) => name.get(id) ?? "Account" });
  return (
    <BooksFrame range={c.range} supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active="journal" sub={`/${e.id}`}>
      <div className="flex flex-wrap items-center gap-2">
        <LinkButton href={booksHref(c.id, "journal", c.month)} variant="ghost" size="sm">Back to Journal Entries</LinkButton>
      </div>
      <TransactionJournal
        clientName={c.client.name}
        type={`${BOOKS[e.book as Book]} · ${ENTRY_SOURCES[e.source as EntrySource]}${e.reference ? ` · ${e.reference}` : ""}`}
        date={fmtDate(e.entry_date)}
        rows={rows}
        status={e.status === "reversed" ? <Badge>Reversed</Badge> : undefined}
      >
        <p className="text-body-regular text-text-secondary">{e.memo}</p>
        {e.status === "posted" && e.source === "manual" && <ReverseForm clientId={c.id} entryId={e.id} minDate={e.entry_date} />}
      </TransactionJournal>
    </BooksFrame>
  );
}

/** What each book of account holds, for the Reports list. */
const BOOK_NOTES = {
  sales: "Every Sales Invoice (cash or on account), on ruled pages, for",
  purchases: "Every Purchase Invoice (cash or on account), on ruled pages, for",
  cash_receipts: "Receipts from customers and other cash received, for",
  cash_disbursements: "Payments to suppliers and other cash paid out (and purchases posted as cash before Purchase Invoices), for",
  general_journal: "Journal entries, payroll and other non-cash entries, for",
} as const;

/** Reports: the existing report pages, and the books of account. */
export async function ReportsIndex({ params, searchParams }: Props) {
  const c = await booksContext(params, searchParams);
  const { from, to } = c.range;
  const b = `/app/clients/${c.id}/books`;
  const book = (kind: string) => `${b}/print?book=${kind}&from=${from}&to=${to}`;
  const xlsx = (kind: string) => `${b}/export?kind=book&book=${kind}&from=${from}&to=${to}`;
  const items: { title: string; text: string; href: string; extra?: { label: string; href: string } }[] = [
    { title: "Balance Sheet and Profit and Loss", text: `Side by side for ${c.range.label}.`, href: booksHref(c.id, "summary", c.month) },
    { title: "Financial statements", text: "Monthly, quarterly or annual, with notes; release to the client's portal.", href: booksHref(c.id, "reports", c.month, {}, "/statements") },
    { title: "Trial Balance", text: "As of the end of any month.", href: `${b}/tools?to=${c.month}#trial-balance` },
    { title: "General Ledger", text: `Every account's entries for ${c.range.label}.`, href: book("general_ledger"), extra: { label: "Excel", href: xlsx("general_ledger") } },
    ...(["sales", "purchases", "cash_receipts", "cash_disbursements", "general_journal"] as const).map((k) => ({
      title: BOOK_TITLES[k],
      text: `${BOOK_NOTES[k]} ${c.range.label}.`,
      href: book(k),
      extra: { label: "Excel", href: xlsx(k) },
    })),
    { title: "BIR 2307 to suppliers", text: "Certificates for the EWT on Purchase Invoices, per quarter, month or transaction; print one or all.", href: booksHref(c.id, "reports", c.month, {}, "/2307") },
    { title: "2307 tracker (from customers)", text: "CWT on Sales Invoices against the 2307s the client sent, per customer and quarter; follow up the missing ones.", href: booksHref(c.id, "reports", c.month, {}, "/cwt-2307") },
    { title: "Old register beside the Books", text: "Parallel run: the returns' figures from the register and from the Books by tax code, to the centavo.", href: booksHref(c.id, "reports", c.month, {}, "/parallel-run") },
    { title: "Books of account, any dates (loose-leaf / manual)", text: "Any book for any date range, printed on ruled pages; the loose-leaf permit.", href: `${b}/tools#books-of-account` },
  ];
  return (
    <BooksFrame range={c.range} supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active="reports">
      <section className="min-w-0 rounded-3xl border border-border-button-default bg-background-primary-default">
        <h2 className="border-b border-separator-border px-5 py-4 text-title-3-semibold text-text-secondary">Reports</h2>
        <ul className="divide-y divide-separator-border">
          {items.map((r) => (
            <li key={r.title} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
              <div className="min-w-0">
                <Link href={r.href} className="text-body-medium text-text-primary hover:underline">{r.title}</Link>
                <p className="text-caption-1-regular text-text-tertiary">{r.text}</p>
              </div>
              {r.extra && <a href={r.extra.href} className="text-body-medium text-button-ghost-foreground hover:underline">{r.extra.label}</a>}
            </li>
          ))}
        </ul>
      </section>
      <Notice tone="waiting">SLS per customer and SLP per supplier (Excel and DAT) and the BIR-format loose-leaf books come with the returns (phase 3).</Notice>
    </BooksFrame>
  );
}

const INVOICE_LABEL: Record<InvoiceKind, string> = { sales: "Sales Invoice", purchase: "Purchase Invoice" };

/** Settings: the chart of accounts, the ledger tools, and the firm's tax codes with where each is used. */
export async function SettingsPage({ params, searchParams }: Props) {
  const c = await booksContext(params, searchParams);
  const codes = await loadTaxCodes(c.supabase);
  return (
    <BooksFrame range={c.range} supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active="settings">
      <Card title="Settings">
        <ul className="divide-y divide-separator-border">
          <li className="flex flex-wrap items-center justify-between gap-3 py-2.5 first:pt-0">
            <div>
              <Link href={`/app/clients/${c.id}/books/accounts`} className="text-body-medium text-text-primary hover:underline">Chart of accounts</Link>
              <p className="text-caption-1-regular text-text-tertiary">Each account&rsquo;s FS line, BIR line and control role.</p>
            </div>
          </li>
          <li className="flex flex-wrap items-center justify-between gap-3 py-2.5 last:pb-0">
            <div>
              <Link href={`/app/clients/${c.id}/books/tools`} className="text-body-medium text-text-primary hover:underline">Ledger tools</Link>
              <p className="text-caption-1-regular text-text-tertiary">Opening balances, period lock and amendments, year-end closing, AR/AP update, all journal entries.</p>
            </div>
          </li>
        </ul>
      </Card>
      <BooksList
        title="Tax Codes"
        columns={[{ label: "Name" }, { label: "Code" }, { label: "Rate", align: "end" }, { label: "Kind" }, { label: "Where it is used" }]}
        rows={codes.map((t) => ({
          key: t.id,
          muted: !t.active,
          cells: [
            <span key="n" className="text-text-primary">{t.name}</span>,
            <span key="c" className="tabular-nums text-text-secondary">{t.code}</span>,
            `${+(t.rate * 100).toFixed(2)}%`,
            TAX_CODE_KIND_LABELS[t.kind] ?? t.kind,
            <span key="u" className="block space-y-0.5">
              {appliesTo(t.kind).map((inv) => {
                const forms = formsFor(t.kind, inv);
                return (
                  <span key={inv} className="block text-caption-1-regular text-text-secondary">
                    {INVOICE_LABEL[inv]}: {forms.length ? forms.join(", ") : "Not on any BIR list · deductible expense"}
                  </span>
                );
              })}
            </span>,
          ],
        }))}
        note="The firm's list; only the Owner changes it. VAT codes go on invoice lines, withholding codes on the invoice. Receipts and Payments carry none."
        empty="No tax codes."
        minWidth="52rem"
      />
    </BooksFrame>
  );
}
