/**
 * One register (docs/UX-REVIEW.md, R11): each register line carries a sales
 * part, a bookkeeping part and a tax part. The database keeps the line's
 * figures (supabase/migrations/20261125000001_register.sql); this module works
 * out the other two parts from them. Pure, so it can be tested.
 *
 * Bookkeeping part, per the Owner's decisions (25 November 2026):
 *   - general bookkeeping posts cash to one Cash account, at the net that
 *     actually reached or left it (decision 11, R10);
 *   - CWT on a sale waits in "CWT – awaiting 2307" until the certificate comes,
 *     when it moves to "CWT – 2307 received" without touching cash (decision 10);
 *   - EWT on a purchase is payable when the purchase is paid or recorded, so
 *     it ties to the 0619-E and 1601-EQ;
 *   - the SC/PWD discount is its own debit, Sales Discount – SC/PWD (decision 9);
 *   - a client that is not VAT-registered carries VAT inside the amounts.
 * The books do not use these entries yet: book_document still posts as built.
 */
import { BIR_LINES, type BirLineKey } from "@/lib/ledger/bir-lines";
import { toCentavos } from "@/lib/returns/money";
import type { Centavos } from "@/lib/returns/types";

export type RegisterKind = "sale" | "purchase" | "cwt_received" | "ewt_issued";
export type SlpCategory = "capital_goods" | "other_goods" | "services" | "zero_rated" | "exempt";

export const SLP_CATEGORIES: Record<SlpCategory, string> = {
  capital_goods: "Capital goods",
  other_goods: "Goods other than capital goods",
  services: "Services",
  zero_rated: "Zero-rated",
  exempt: "Exempt",
};

export const KIND_LABELS: Record<RegisterKind, string> = {
  sale: "Sales",
  purchase: "Purchases and expenses",
  cwt_received: "2307s received",
  ewt_issued: "2307s issued",
};

/** A register line as the page reads it, amounts in centavos. */
export interface RegisterLine {
  id: string;
  documentId: string;
  kind: RegisterKind;
  source: "portal" | "staff" | "email" | "batch";
  month: string;
  date: string | null;
  reference: string | null;
  partyName: string | null;
  partyTin: string | null;
  terms: "cash" | "charge";
  vatable: Centavos;
  vatExempt: Centavos;
  zeroRated: Centavos;
  vat: Centavos;
  total: Centavos;
  discount: Centavos;
  vatWithheld: Centavos;
  otherDeduction: Centavos;
  atc: string | null;
  withholding: Centavos;
  net: Centavos;
  slpCategory: SlpCategory | null;
  vatRegistered: boolean;
  account: { name: string; fsLine: string; birLine: string | null } | null;
}

/** The database row (numeric columns arrive as strings). */
export interface RegisterRow {
  id: string;
  document_id: string;
  kind: RegisterKind;
  source: RegisterLine["source"];
  month: string;
  line_date: string | null;
  reference: string | null;
  party_name: string | null;
  party_tin: string | null;
  terms: "cash" | "charge";
  vatable: string | number;
  vat_exempt: string | number;
  zero_rated: string | number;
  vat: string | number;
  total: string | number;
  discount: string | number;
  vat_withheld: string | number;
  other_deduction: string | number;
  atc: string | null;
  withholding: string | number;
  net: string | number;
  slp_category: SlpCategory | null;
  vat_registered: boolean;
  /** ledger_accounts embedded by PostgREST (object, one-item array or null). */
  ledger_accounts?: { name: string; fs_line: string; bir_line: string | null } | { name: string; fs_line: string; bir_line: string | null }[] | null;
}

const c = (v: string | number | null | undefined): Centavos => toCentavos(v ?? null) ?? 0;

export function toRegisterLine(r: RegisterRow): RegisterLine {
  const a = Array.isArray(r.ledger_accounts) ? r.ledger_accounts[0] : r.ledger_accounts;
  const amounts = c(r.vatable) + c(r.vat_exempt) + c(r.zero_rated) + c(r.vat);
  // The database keeps the total as approved; a missing one is the amounts plus VAT (as book_document).
  const total = c(r.total) > 0 || (r.kind !== "sale" && r.kind !== "purchase") ? c(r.total) : amounts;
  return {
    id: r.id,
    documentId: r.document_id,
    kind: r.kind,
    source: r.source,
    month: String(r.month).slice(0, 10),
    date: r.line_date ? String(r.line_date).slice(0, 10) : null,
    reference: r.reference,
    partyName: r.party_name,
    partyTin: r.party_tin,
    terms: r.terms,
    vatable: c(r.vatable),
    vatExempt: c(r.vat_exempt),
    zeroRated: c(r.zero_rated),
    vat: c(r.vat),
    total,
    discount: c(r.discount),
    vatWithheld: c(r.vat_withheld),
    otherDeduction: c(r.other_deduction),
    atc: r.atc,
    withholding: c(r.withholding),
    net: c(r.net),
    slpCategory: r.slp_category,
    vatRegistered: r.vat_registered,
    account: a ? { name: a.name, fsLine: a.fs_line, birLine: a.bir_line } : null,
  };
}

/** Sales amounts before the discount: VATable, exempt (before the SC/PWD discount) and zero-rated. */
export const grossSales = (l: RegisterLine): Centavos => l.vatable + l.vatExempt + l.zeroRated + l.discount;

// ---------------------------------------------------------------- bookkeeping part

export interface EntryLine {
  account: string;
  debit: Centavos;
  credit: Centavos;
}

export const ACCOUNTS = {
  cash: "Cash",
  receivable: "Accounts Receivable",
  payable: "Accounts Payable",
  cwtAwaiting: "Creditable Withholding Tax – awaiting 2307",
  cwtReceived: "Creditable Withholding Tax – 2307 received",
  vatWithheld: "Creditable VAT Withheld",
  outputVat: "Output VAT",
  inputVat: "Input VAT",
  ewtPayable: "Withholding Tax Payable – Expanded",
  discount: "Sales Discount – SC/PWD",
  otherDeduction: "Other Deductions",
  sales: "Sales",
  expense: "Account title not chosen",
} as const;

const dr = (account: string, amount: Centavos): EntryLine => ({ account, debit: amount, credit: 0 });
const cr = (account: string, amount: Centavos): EntryLine => ({ account, debit: 0, credit: amount });

/**
 * The entry a line makes. Lines of zero are left out. 2307s issued make no
 * entry: the EWT was booked when the purchase was recorded.
 */
export function bookkeepingPart(l: RegisterLine): EntryLine[] {
  const title = l.account?.name;
  let lines: EntryLine[] = [];
  if (l.kind === "sale") {
    const vat = l.vatRegistered ? l.vat : 0;
    const revenue = l.total - vat + l.discount;
    lines = [
      l.terms === "charge" ? dr(ACCOUNTS.receivable, l.total) : dr(ACCOUNTS.cash, l.net),
      ...(l.terms === "charge" ? [] : [dr(ACCOUNTS.cwtAwaiting, l.withholding), dr(ACCOUNTS.vatWithheld, l.vatWithheld), dr(ACCOUNTS.otherDeduction, l.otherDeduction)]),
      dr(ACCOUNTS.discount, l.discount),
      cr(title ?? ACCOUNTS.sales, revenue),
      cr(ACCOUNTS.outputVat, vat),
    ];
  } else if (l.kind === "purchase") {
    const vat = l.vatRegistered ? l.vat : 0;
    lines = [
      dr(title ?? ACCOUNTS.expense, l.total - vat),
      dr(ACCOUNTS.inputVat, vat),
      l.terms === "charge" ? cr(ACCOUNTS.payable, l.total - l.withholding) : cr(ACCOUNTS.cash, l.net),
      cr(ACCOUNTS.ewtPayable, l.withholding),
      ...(l.terms === "charge" ? [] : [cr(ACCOUNTS.otherDeduction, l.vatWithheld + l.otherDeduction)]),
    ];
  } else if (l.kind === "cwt_received") {
    lines = [dr(ACCOUNTS.cwtReceived, l.withholding), cr(ACCOUNTS.cwtAwaiting, l.withholding)];
  }
  return lines.filter((x) => x.debit !== 0 || x.credit !== 0);
}

export const isBalanced = (lines: EntryLine[]) => lines.reduce((s, x) => s + x.debit - x.credit, 0) === 0;

// ---------------------------------------------------------------- tax part

export interface TaxLine {
  /** The return or attachment, e.g. "2550Q", "SLSP", "SAWT". */
  form: string;
  /** What the amount is on it. */
  item: string;
  amount: Centavos;
  note?: string;
}

const birLabel = (key: string | null | undefined) => (key && key in BIR_LINES ? BIR_LINES[key as BirLineKey].label : null);

/** Where the line goes on the returns and their attachments. Lines of zero are left out. */
export function taxPart(l: RegisterLine): TaxLine[] {
  const out: TaxLine[] = [];
  const push = (form: string, item: string, amount: Centavos, note?: string) => {
    if (amount !== 0) out.push({ form, item, amount, ...(note ? { note } : {}) });
  };
  const income = l.account?.birLine ? (l.account.fsLine === "ppe" ? null : birLabel(l.account.birLine)) : null;

  if (l.kind === "sale") {
    if (l.vatRegistered) {
      push("2550Q", "VATable sales", l.vatable);
      push("2550Q", "Zero-rated sales", l.zeroRated);
      push("2550Q", "Exempt sales", l.vatExempt);
      push("2550Q", "Output tax", l.vat);
      push("2550Q", "VAT withheld (creditable)", l.vatWithheld);
      if (l.partyTin) push("SLSP", `Sales to ${l.partyName ?? l.partyTin}`, l.vatable + l.zeroRated + l.vatExempt);
    } else {
      push("2551Q", "Gross sales or receipts", l.total);
    }
    push("1701Q / 1702Q", income ?? "Sales / revenues / receipts / fees", grossSales(l) + (l.vatRegistered ? 0 : l.vat));
    push("1701Q / 1702Q", "Deduction: SC/PWD discount", l.discount);
    push("SAWT", `${l.atc ?? "CWT"} from ${l.partyName ?? "the customer"}`, l.withholding, "claimed once the 2307 is received");
  } else if (l.kind === "purchase") {
    const net = l.total - (l.vatRegistered ? l.vat : 0);
    if (l.vatRegistered) {
      push("2550Q", l.slpCategory ? `Purchases: ${SLP_CATEGORIES[l.slpCategory].toLowerCase()}` : "Purchases (category not set)", net);
      push("2550Q", "Input tax", l.vat);
      if (l.partyTin) push("SLSP", `Purchases from ${l.partyName ?? l.partyTin}`, net);
    }
    push("QAP / 1601-EQ", `${l.atc ?? "EWT"} withheld from ${l.partyName ?? "the supplier"}`, l.withholding);
    if (l.account?.fsLine === "ppe") push("1701Q / 1702Q", "Depreciation only (capital goods)", net, "through the fixed asset register");
    else push("1701Q / 1702Q", income ?? "Deduction (account title not chosen)", net);
  } else if (l.kind === "cwt_received") {
    push("SAWT", `${l.atc ?? "CWT"} from ${l.partyName ?? "the payor"}`, l.withholding);
    push("1701Q / 1702Q", "Creditable tax withheld", l.withholding);
  } else {
    push("QAP", `${l.atc ?? "EWT"} withheld from ${l.partyName ?? "the payee"}`, l.withholding, "2307 issued");
  }
  return out;
}

// ---------------------------------------------------------------- totals

export interface RegisterTotals {
  count: number;
  vatable: Centavos;
  vatExempt: Centavos;
  zeroRated: Centavos;
  vat: Centavos;
  total: Centavos;
  discount: Centavos;
  withholding: Centavos;
  vatWithheld: Centavos;
  net: Centavos;
}

export function totals(lines: RegisterLine[]): RegisterTotals {
  const t: RegisterTotals = { count: 0, vatable: 0, vatExempt: 0, zeroRated: 0, vat: 0, total: 0, discount: 0, withholding: 0, vatWithheld: 0, net: 0 };
  for (const l of lines) {
    t.count += 1;
    t.vatable += l.vatable;
    t.vatExempt += l.vatExempt;
    t.zeroRated += l.zeroRated;
    t.vat += l.vat;
    t.total += l.total;
    t.discount += l.discount;
    t.withholding += l.withholding;
    t.vatWithheld += l.vatWithheld;
    t.net += l.net;
  }
  return t;
}
