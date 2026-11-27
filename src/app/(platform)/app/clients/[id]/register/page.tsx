import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { AttachBatchImage } from "@/components/attach-batch-image";
import { Badge, Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { showMonth } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { bookkeepingPart, grossSales, isBalanced, KIND_LABELS, SLP_CATEGORIES, taxPart, toRegisterLine, totals, type RegisterKind, type RegisterLine, type RegisterRow } from "@/lib/register/parts";
import { formatAmount } from "@/lib/returns/money";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";

export default function RegisterPage(props: PageProps<"/app/clients/[id]/register">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Register params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const amt = (c: number) => (c === 0 ? "—" : formatAmount(c));
const SOURCE: Record<RegisterLine["source"], string> = { portal: "Portal", staff: "Staff", email: "Email", batch: "Batch", telegram: "Telegram" };
const COLUMNS = "id, document_id, kind, source, month, line_date, reference, party_name, party_tin, terms, vatable, vat_exempt, zero_rated, vat, total, discount, vat_withheld, other_deduction, atc, withholding, net, slp_category, vat_registered, ledger_accounts!register_lines_client_id_account_id_fkey(name, fs_line, bir_line), payment:ledger_accounts!register_lines_payment_account_fkey(name), other:ledger_accounts!register_lines_other_account_fkey(name)";

function shiftMonth(month: string, n: number) {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + n, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

async function Register({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/register">, "params" | "searchParams">) {
  const { id } = await params;
  const sp = await searchParams;
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const { data: client } = await supabase.from("clients").select("id, name").eq("id", id).maybeSingle();
  if (!client) notFound();
  if (me.staff.role !== "owner") {
    const { data: a } = await supabase.from("staff_assignments").select("user_id").eq("client_id", id).eq("user_id", me.userId).limit(1);
    if (!a?.length) notFound();
  }

  // The month asked for, else the latest month with lines, else this month.
  let month = /^\d{4}-\d{2}$/.test(one(sp.month)) ? one(sp.month) : "";
  if (!month) {
    const { data: latest } = await supabase.from("register_lines").select("month").eq("client_id", id).order("month", { ascending: false }).limit(1).maybeSingle();
    month = latest?.month ? String(latest.month).slice(0, 7) : manilaToday().slice(0, 7);
  }
  const { data, error } = await supabase.from("register_lines").select(COLUMNS).eq("client_id", id).eq("month", `${month}-01`).order("line_date", { ascending: true, nullsFirst: false }).order("reference");
  if (error) throw new Error(`Could not load the register: ${error.message}`);
  const lines = ((data ?? []) as unknown as RegisterRow[]).map(toRegisterLine);
  // Batch rows still without their image (B1): marked, with a way to attach it.
  // (The register line's month is its document's month.)
  const { data: bare } = lines.some((l) => l.source === "batch")
    ? await supabase.from("documents").select("id").eq("client_id", id).eq("source", "batch").eq("document_month", `${month}-01`).is("storage_path", null)
    : { data: [] as { id: string }[] };
  const noImage = new Set((bare ?? []).map((d) => d.id));
  const byKind = (k: RegisterKind) => lines.filter((l) => l.kind === k);
  const selected = lines.find((l) => l.id === one(sp.line)) ?? null;
  const base = `/app/clients/${id}/register`;
  const href = (over: { month?: string; line?: string }) => {
    const q = new URLSearchParams({ month: over.month ?? month });
    if (over.line) q.set("line", over.line);
    return `${base}?${q.toString()}`;
  };

  return (
    <>
      <PageHeader
        title="Register"
        description={<><Link href={`/app/clients/${id}`} className="text-button-ghost-foreground hover:underline">{client.name}</Link> · every approved sales invoice, receipt and 2307, with its sales, bookkeeping and tax parts.</>}
        actions={
          <div className="flex items-center gap-1">
            <Link href={href({ month: shiftMonth(month, -1) })} aria-label="Previous month" className="inline-flex size-10 items-center justify-center rounded-2lg text-foreground-icon-secondary outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring">
              <RiArrowLeftSLine aria-hidden className="size-4" />
            </Link>
            <span className="min-w-36 text-center text-title-3-semibold text-text-primary">{showMonth(`${month}-01`)}</span>
            <Link href={href({ month: shiftMonth(month, 1) })} aria-label="Next month" className="inline-flex size-10 items-center justify-center rounded-2lg text-foreground-icon-secondary outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring">
              <RiArrowRightSLine aria-hidden className="size-4" />
            </Link>
          </div>
        }
      />
      <div className="space-y-6">
        <Notice tone="waiting">
          Every line is written by the database when a document is approved, and rewritten when its figures, month or account title change. The returns read these lines, and booking a document posts the entry shown under its Parts.
        </Notice>

        {lines.length === 0 && (
          <Card><p className="text-body-regular text-text-secondary">No approved documents for {showMonth(`${month}-01`)}.</p></Card>
        )}

        {byKind("sale").length > 0 && <SalesTable lines={byKind("sale")} href={href} selected={selected?.id} noImage={noImage} />}
        {byKind("purchase").length > 0 && <PurchasesTable lines={byKind("purchase")} href={href} selected={selected?.id} noImage={noImage} />}
        {(["cwt_received", "ewt_issued"] as const).map((k) => byKind(k).length > 0 && <CertificatesTable key={k} kind={k} lines={byKind(k)} href={href} selected={selected?.id} />)}

        {selected && <LineParts line={selected} />}

        <div className="flex flex-wrap gap-2">
          <LinkButton href={`/app/clients/${id}`} variant="secondary">Back to the client</LinkButton>
          <LinkButton href={`/app/documents?client=${id}`} variant="secondary">Documents to review</LinkButton>
        </div>
      </div>
    </>
  );
}

type Href = (over: { month?: string; line?: string }) => string;

function th(label: string, numeric = false) {
  return <th scope="col" className={cx("px-2 pb-2 font-medium whitespace-nowrap", numeric ? "text-end" : "text-start")}>{label}</th>;
}
const num = "px-2 py-2 text-end tabular-nums whitespace-nowrap";
const cell = "px-2 py-2";

/** Where the line came from; a batch row without its image says so and offers to attach it. */
function SourceCell({ line: l, noImage }: { line: RegisterLine; noImage: Set<string> }) {
  if (!noImage.has(l.documentId)) return <Badge>{SOURCE[l.source]}</Badge>;
  return (
    <span className="flex flex-col items-start gap-1">
      <Badge tone="waiting">Batch · no image</Badge>
      <AttachBatchImage documentId={l.documentId} />
    </span>
  );
}

function PartsLink({ line, href, selected }: { line: RegisterLine; href: Href; selected?: string }) {
  return (
    <Link href={`${href({ line: line.id })}#parts`} aria-current={selected === line.id ? "true" : undefined} className={cx("text-caption-1-medium hover:underline", selected === line.id ? "text-text-primary" : "text-button-ghost-foreground")}>
      Parts
    </Link>
  );
}

function SalesTable({ lines, href, selected, noImage }: { lines: RegisterLine[]; href: Href; selected?: string; noImage: Set<string> }) {
  const t = totals(lines);
  return (
    <Card title={`Sales (${lines.length})`} actions={<span className="text-caption-1-regular text-text-tertiary">Net receipt is what reached cash</span>}>
      <div className="-mx-6 overflow-x-auto px-6">
        <table className="w-full min-w-max text-body-regular">
          <thead className="border-b border-separator-border text-caption-1-regular text-text-tertiary">
            <tr>{th("Date")}{th("Reference")}{th("Customer")}{th("Source")}{th("VATable", true)}{th("Exempt", true)}{th("Zero-rated", true)}{th("VAT", true)}{th("Total", true)}{th("CWT", true)}{th("Net receipt", true)}{th("Account title")}{th("")}</tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.id} className={cx("border-b border-separator-border last:border-0", selected === l.id && "bg-background-secondary-default")}>
                <td className={cx(cell, "tabular-nums whitespace-nowrap text-text-secondary")}>{l.date ?? "—"}</td>
                <td className={cx(cell, "whitespace-nowrap")}><Link href={`/app/documents/${l.documentId}`} className="text-button-ghost-foreground hover:underline">{l.reference ?? "No number"}</Link>{l.terms === "charge" && <span className="ms-1.5 text-caption-1-regular text-text-tertiary">charge</span>}</td>
                <td className={cell}>{l.partyName ?? "—"}</td>
                <td className={cell}><SourceCell line={l} noImage={noImage} /></td>
                <td className={num}>{amt(l.vatable)}</td>
                <td className={num}>{amt(l.vatExempt)}</td>
                <td className={num}>{amt(l.zeroRated)}</td>
                <td className={num}>{amt(l.vat)}</td>
                <td className={num}>{amt(l.total)}</td>
                <td className={num}>{amt(l.withholding)}</td>
                <td className={cx(num, "text-text-primary")}>{amt(l.net)}</td>
                <td className={cx(cell, l.account ? "text-text-primary" : "text-text-tertiary")}>{l.account?.name ?? "Not chosen"}</td>
                <td className={cell}><PartsLink line={l} href={href} selected={selected} /></td>
              </tr>
            ))}
          </tbody>
          <tfoot className="font-semibold text-text-primary">
            <tr className="border-t-2 border-border-button-default">
              <td className={cell} colSpan={4}>Total</td>
              <td className={num}>{formatAmount(t.vatable)}</td><td className={num}>{formatAmount(t.vatExempt)}</td><td className={num}>{formatAmount(t.zeroRated)}</td><td className={num}>{formatAmount(t.vat)}</td>
              <td className={num}>{formatAmount(t.total)}</td><td className={num}>{formatAmount(t.withholding)}</td><td className={num}>{formatAmount(t.net)}</td><td colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}

function PurchasesTable({ lines, href, selected, noImage }: { lines: RegisterLine[]; href: Href; selected?: string; noImage: Set<string> }) {
  const t = totals(lines);
  return (
    <Card title={`Purchases and expenses (${lines.length})`} actions={<span className="text-caption-1-regular text-text-tertiary">Net paid is what left cash</span>}>
      <div className="-mx-6 overflow-x-auto px-6">
        <table className="w-full min-w-max text-body-regular">
          <thead className="border-b border-separator-border text-caption-1-regular text-text-tertiary">
            <tr>{th("Date")}{th("Reference")}{th("Supplier")}{th("Account title")}{th("SLP category")}{th("VATable", true)}{th("Exempt", true)}{th("VAT", true)}{th("Total", true)}{th("EWT", true)}{th("Net paid", true)}{th("")}</tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.id} className={cx("border-b border-separator-border last:border-0", selected === l.id && "bg-background-secondary-default")}>
                <td className={cx(cell, "tabular-nums whitespace-nowrap text-text-secondary")}>{l.date ?? "—"}</td>
                <td className={cx(cell, "whitespace-nowrap")}><Link href={`/app/documents/${l.documentId}`} className="text-button-ghost-foreground hover:underline">{l.reference ?? "No number"}</Link>{l.terms === "charge" && <span className="ms-1.5 text-caption-1-regular text-text-tertiary">charge</span>}{noImage.has(l.documentId) && <span className="mt-1 block"><SourceCell line={l} noImage={noImage} /></span>}</td>
                <td className={cell}>{l.partyName ?? "—"}</td>
                <td className={cx(cell, l.account ? "text-text-primary" : "text-text-tertiary")}>{l.account?.name ?? "Not chosen"}</td>
                <td className={cell}>{l.slpCategory ? <Badge tone={l.slpCategory === "capital_goods" ? "progress" : "neutral"}>{SLP_CATEGORIES[l.slpCategory]}</Badge> : <span className="text-text-tertiary">—</span>}</td>
                <td className={num}>{amt(l.vatable)}</td>
                <td className={num}>{amt(l.vatExempt)}</td>
                <td className={num}>{amt(l.vat)}</td>
                <td className={num}>{amt(l.total)}</td>
                <td className={num}>{amt(l.withholding)}</td>
                <td className={cx(num, "text-text-primary")}>{amt(l.net)}</td>
                <td className={cell}><PartsLink line={l} href={href} selected={selected} /></td>
              </tr>
            ))}
          </tbody>
          <tfoot className="font-semibold text-text-primary">
            <tr className="border-t-2 border-border-button-default">
              <td className={cell} colSpan={5}>Total</td>
              <td className={num}>{formatAmount(t.vatable)}</td><td className={num}>{formatAmount(t.vatExempt)}</td><td className={num}>{formatAmount(t.vat)}</td>
              <td className={num}>{formatAmount(t.total)}</td><td className={num}>{formatAmount(t.withholding)}</td><td className={num}>{formatAmount(t.net)}</td><td />
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}

function CertificatesTable({ kind, lines, href, selected }: { kind: "cwt_received" | "ewt_issued"; lines: RegisterLine[]; href: Href; selected?: string }) {
  const t = totals(lines);
  return (
    <Card title={`${KIND_LABELS[kind]} (${lines.length})`}>
      <div className="-mx-6 overflow-x-auto px-6">
        <table className="w-full min-w-max text-body-regular">
          <thead className="border-b border-separator-border text-caption-1-regular text-text-tertiary">
            <tr>{th("Date")}{th(kind === "cwt_received" ? "Payor" : "Payee")}{th("TIN")}{th("ATC")}{th("Tax withheld", true)}{th("")}</tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.id} className={cx("border-b border-separator-border last:border-0", selected === l.id && "bg-background-secondary-default")}>
                <td className={cx(cell, "tabular-nums whitespace-nowrap text-text-secondary")}>{l.date ?? "—"}</td>
                <td className={cell}><Link href={`/app/documents/${l.documentId}`} className="text-button-ghost-foreground hover:underline">{l.partyName ?? "—"}</Link></td>
                <td className={cx(cell, "tabular-nums")}>{l.partyTin ?? "—"}</td>
                <td className={cell}>{l.atc ?? "—"}</td>
                <td className={num}>{amt(l.withholding)}</td>
                <td className={cell}><PartsLink line={l} href={href} selected={selected} /></td>
              </tr>
            ))}
          </tbody>
          <tfoot className="font-semibold text-text-primary">
            <tr className="border-t-2 border-border-button-default"><td className={cell} colSpan={4}>Total</td><td className={num}>{formatAmount(t.withholding)}</td><td /></tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}

function LineParts({ line: l }: { line: RegisterLine }) {
  const entry = bookkeepingPart(l);
  const tax = taxPart(l);
  const sales: [string, string][] =
    l.kind === "sale" || l.kind === "purchase"
      ? [
          ["Terms", l.terms === "charge" ? "Charge" : "Cash"],
          ...(l.kind === "sale" ? ([["Gross sales", formatAmount(grossSales(l))]] as [string, string][]) : []),
          ...(l.discount ? ([["SC/PWD discount", formatAmount(l.discount)]] as [string, string][]) : []),
          ["VATable", amt(l.vatable)], ["Exempt", amt(l.vatExempt)], ["Zero-rated", amt(l.zeroRated)], ["VAT", amt(l.vat)], ["Total", formatAmount(l.total)],
          [l.kind === "sale" ? `CWT${l.atc ? ` (${l.atc})` : ""}` : `EWT${l.atc ? ` (${l.atc})` : ""}`, amt(l.withholding)],
          ...(l.vatWithheld ? ([["VAT withheld", formatAmount(l.vatWithheld)]] as [string, string][]) : []),
          [l.kind === "sale" ? "Net receipt" : "Net paid", formatAmount(l.net)],
        ]
      : [["ATC", l.atc ?? "—"], ["Tax withheld", formatAmount(l.withholding)]];
  return (
    <section id="parts" aria-label="The line's three parts" className="space-y-3">
      <h2 className="text-title-2-medium text-text-primary">{l.reference ?? l.partyName ?? "Line"} · {KIND_LABELS[l.kind]}</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Sales part">
          <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 text-body-regular">
            {sales.map(([k, v]) => (
              <div key={k} className="contents"><dt className="text-text-tertiary">{k}</dt><dd className="text-end tabular-nums text-text-primary">{v}</dd></div>
            ))}
          </dl>
        </Card>
        <Card title="Bookkeeping part" actions={<Badge tone={isBalanced(entry) ? "done" : "blocked"}>{isBalanced(entry) ? "Balanced" : "Not balanced"}</Badge>}>
          {entry.length === 0 ? (
            <p className="text-body-regular text-text-secondary">No entry: the EWT was booked when the purchase was recorded.</p>
          ) : (
            <table className="w-full text-body-regular">
              <thead className="text-caption-1-regular text-text-tertiary"><tr>{th("Account")}{th("Debit", true)}{th("Credit", true)}</tr></thead>
              <tbody>
                {entry.map((e, i) => (
                  <tr key={i} className="border-t border-separator-border">
                    <td className={cx(cell, e.credit ? "ps-6" : "")}>{e.account}</td>
                    <td className={num}>{e.debit ? formatAmount(e.debit) : ""}</td>
                    <td className={num}>{e.credit ? formatAmount(e.credit) : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {l.kind === "cwt_received" && (
            <p className="mt-2 text-caption-1-regular text-text-tertiary">When less is awaiting from this payor, the rest settles the receivable, else cash, as before.</p>
          )}
          {l.kind === "ewt_issued" && entry.length === 0 && (
            <p className="mt-2 text-caption-1-regular text-text-tertiary">If the quarter&rsquo;s purchases from this payee did not carry the EWT, booking it puts the difference to EWT payable.</p>
          )}
          {!l.account && (l.kind === "sale" || l.kind === "purchase") && (
            <p className="mt-2 text-caption-1-regular text-text-tertiary">No account title yet: the client has no chart of accounts, or none was chosen on the document.</p>
          )}
        </Card>
        <Card title="Tax part">
          {tax.length === 0 ? (
            <p className="text-body-regular text-text-secondary">Nothing for the returns.</p>
          ) : (
            <ul className="space-y-2 text-body-regular">
              {tax.map((t, i) => (
                <li key={i} className="flex items-start justify-between gap-3">
                  <span className="min-w-0"><span className="text-caption-1-semibold text-text-tertiary">{t.form}</span><span className="block text-text-primary">{t.item}</span>{t.note && <span className="block text-caption-1-regular text-text-tertiary">{t.note}</span>}</span>
                  <span className="shrink-0 tabular-nums text-text-primary">{formatAmount(t.amount)}</span>
                </li>
              ))}
            </ul>
          )}
          {!l.vatRegistered && (l.kind === "sale" || l.kind === "purchase") && <p className="mt-2 text-caption-1-regular text-text-tertiary">Not VAT-registered on this date: VAT stays inside the amounts.</p>}
        </Card>
      </div>
    </section>
  );
}
