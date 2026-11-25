/**
 * B1: batch upload in the register layout (docs/UX-REVIEW.md, "Batch upload";
 * Owner's decision 3). At onboarding, sales or purchases arrive as an Excel workbook
 * with one row per invoice, in the columns of the taxify batch templates.
 * The rows skip OCR but get the same checks as a reviewed image:
 *   - date and open period
 *   - the party's name and TIN
 *   - amounts and withholding (ATC)
 *   - duplicates
 *   - a known account title
 *   - cash received or paid against the net
 * A file posts only when every row is clean (public.post_batch). Pure.
 *
 * Amounts in the VATable columns include VAT, as in taxify. The VAT is 12/112 of
 * them, and the register keeps the VAT-exclusive amount and the VAT apart.
 */
import { normalizeTin, type OcrFields } from "@/lib/ocr/fields";
import type { Centavos } from "@/lib/returns/types";

export type BatchKind = "sales" | "purchases";
export const BATCH_KINDS: Record<BatchKind, string> = { sales: "Sales register", purchases: "Purchases and expenses register" };

export interface BatchColumn {
  key: string;
  header: string;
  /** What to type, shown under the header in the template. */
  hint: string;
  kind: "date" | "text" | "amount" | "yn" | "party_kind" | "account";
  width?: number;
}

const PARTY = (who: "Customer" | "Supplier"): BatchColumn[] => [
  { key: "date", header: "Date", hint: "YYYY-MM-DD", kind: "date", width: 12 },
  { key: "party_kind", header: `${who} type`, hint: "Business or Individual", kind: "party_kind", width: 12 },
  { key: "party_name", header: "Registered name", hint: "Business: name as registered with BIR", kind: "text", width: 32 },
  { key: "party_last_name", header: "Last name", hint: "Individual", kind: "text", width: 16 },
  { key: "party_first_name", header: "First name", hint: "Individual", kind: "text", width: 16 },
  { key: "party_middle_name", header: "Middle name", hint: "Individual", kind: "text", width: 14 },
  { key: "party_tin", header: "TIN", hint: "123-456-789-00000", kind: "text", width: 18 },
  { key: "party_address", header: "Address", hint: "With ZIP code", kind: "text", width: 30 },
];

export const BATCH_COLUMNS: Record<BatchKind, BatchColumn[]> = {
  sales: [
    ...PARTY("Customer"),
    { key: "number", header: "Invoice no.", hint: "Required", kind: "text", width: 12 },
    { key: "account", header: "Revenue account", hint: "From the Accounts sheet", kind: "account", width: 28 },
    { key: "vatable", header: "VATable sales", hint: "VAT-inclusive", kind: "amount" },
    { key: "vat_exempt", header: "VAT-exempt sales", hint: "Non-VAT sales go here", kind: "amount" },
    { key: "zero_rated", header: "Zero-rated sales", hint: "", kind: "amount" },
    { key: "discount", header: "SC/PWD discount", hint: "Amounts above are after it", kind: "amount" },
    { key: "atc", header: "CWT ATC", hint: "e.g. WC158", kind: "text", width: 9 },
    { key: "withholding", header: "CWT amount", hint: "Withheld by the customer", kind: "amount" },
    { key: "vat_withheld", header: "VAT withheld", hint: "Government customer", kind: "amount" },
    { key: "other_deduction", header: "Other deduction", hint: "Bank or card charges", kind: "amount" },
    { key: "other_account", header: "Other deduction account", hint: "From the Accounts sheet", kind: "account", width: 24 },
    { key: "paid", header: "Collected same day", hint: "Y (cash) or N (charge)", kind: "yn", width: 10 },
    { key: "paid_amount", header: "Amount received", hint: "Net receipt (check)", kind: "amount" },
    { key: "payment_account", header: "Deposited to", hint: "Cash or bank; blank = Cash", kind: "account", width: 22 },
  ],
  purchases: [
    ...PARTY("Supplier"),
    { key: "number", header: "Invoice / OR no.", hint: "Required", kind: "text", width: 12 },
    { key: "account", header: "Account title", hint: "From the Accounts sheet", kind: "account", width: 28 },
    { key: "capital_goods", header: "Capital goods", hint: "VAT-inclusive", kind: "amount" },
    { key: "other_goods", header: "Other goods", hint: "VAT-inclusive", kind: "amount" },
    { key: "services", header: "Services", hint: "VAT-inclusive", kind: "amount" },
    { key: "zero_rated", header: "Zero-rated", hint: "", kind: "amount" },
    { key: "exempt", header: "VAT-exempt / non-VAT", hint: "Non-VAT supplier goes here", kind: "amount" },
    { key: "atc", header: "EWT ATC", hint: "e.g. WC120", kind: "text", width: 9 },
    { key: "withholding", header: "EWT amount", hint: "Withheld from the supplier", kind: "amount" },
    { key: "other_deduction", header: "Other deduction", hint: "Discount taken at payment", kind: "amount" },
    { key: "other_account", header: "Other deduction account", hint: "From the Accounts sheet", kind: "account", width: 24 },
    { key: "paid", header: "Paid same day", hint: "Y (cash) or N (charge)", kind: "yn", width: 10 },
    { key: "paid_amount", header: "Amount paid", hint: "Net paid (check)", kind: "amount" },
    { key: "payment_account", header: "Paid from", hint: "Cash or bank; blank = Cash", kind: "account", width: 22 },
  ],
};

/** A row as read from the workbook: header key → cell text. */
export interface RawRow {
  /** The spreadsheet row number, for messages. */
  line: number;
  cells: Record<string, string>;
}

export interface BatchAccount {
  id: string;
  code: string;
  name: string;
  type: string;
  control: string | null;
}

export interface BatchContext {
  kind: BatchKind;
  accounts: BatchAccount[];
  /** Today in Manila, YYYY-MM-DD. */
  today: string;
  /** The client's books start, YYYY-MM-DD; earlier rows go to the register only. */
  booksStart: string;
  /** Months (YYYY-MM-01) locked by a filed return. */
  lockedMonths: ReadonlySet<string>;
  /** Whether the client is VAT-registered on a date. */
  vatRegistered: (date: string) => boolean;
  /** Approved documents already in the register: dupKey() of each. */
  existing: ReadonlySet<string>;
}

export interface BatchRow {
  line: number;
  fields: OcrFields;
  accountId: string | null;
  party: string;
  date: string | null;
  total: Centavos;
  net: Centavos;
  /** Booked to the ledger, or register only (before the books start). */
  booked: boolean;
  errors: string[];
}

export interface BatchCheck {
  rows: BatchRow[];
  errorCount: number;
  total: Centavos;
  /** Totals by month (YYYY-MM), for the preview. */
  months: { month: string; count: number; total: Centavos }[];
}

const TOLERANCE = 100; // ₱1 (Owner's decision 7)
const ATC_RE = /^W[A-Z]\d{3}$/;

/** "1,120.50" / "₱1120.5" / "(50)" → centavos; blank → 0; anything else → null. */
export function centavosOf(v: string | undefined): Centavos | null {
  const s = (v ?? "").trim().replace(/^(PHP|Php|P(?=[\d\s]))/, "").replace(/[₱,\s]/g, "");
  if (!s || s === "-") return 0;
  if (!/^-?\d+(\.\d+)?$/.test(s)) return null;
  return Math.round(Number(s) * 100);
}
const pesos = (c: Centavos) => (c / 100).toFixed(2);

/** Splits a VAT-inclusive amount: 12/112 is VAT. */
export function splitVat(inclusive: Centavos): { net: Centavos; vat: Centavos } {
  const net = Math.round((inclusive * 100) / 112);
  return { net, vat: inclusive - net };
}

/** Excel dates come as YYYY-MM-DD; text may be 2027-01-15, 1/15/2027 or 01/15/27. */
export function isoDate(v: string | undefined): string | null {
  const s = (v ?? "").trim();
  let y: number, m: number, d: number;
  let r = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s);
  if (r) [y, m, d] = [Number(r[1]), Number(r[2]), Number(r[3])];
  else if ((r = /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/.exec(s))) [m, d, y] = [Number(r[1]), Number(r[2]), Number(r[3]) < 100 ? 2000 + Number(r[3]) : Number(r[3])];
  else return null;
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
  return dt.toISOString().slice(0, 10);
}

/** "1010", "1010 · Cash on hand", "Cash on hand" → the account. */
export function findAccount(text: string | undefined, accounts: BatchAccount[]): BatchAccount | null {
  const s = (text ?? "").trim();
  if (!s) return null;
  const code = s.split(/\s+[·\-–]\s+/)[0].trim();
  const lower = s.toLowerCase();
  return accounts.find((a) => a.code === code) ?? accounts.find((a) => a.name.toLowerCase() === lower) ?? null;
}

/** The label used in the template's dropdowns. */
export const accountLabel = (a: Pick<BatchAccount, "code" | "name">) => `${a.code} · ${a.name}`;

/** Same document twice: sales by invoice number, purchases by supplier TIN and number. */
export function dupKey(kind: BatchKind, f: Pick<OcrFields, "number" | "party_tin">): string | null {
  const n = f.number?.trim().toUpperCase();
  if (!n) return null;
  return kind === "sales" ? `sale|${n}` : `purchase|${f.party_tin ?? ""}|${n}`;
}

const SALES_TYPES = ["revenue", "other_income"];
const PURCHASE_TYPES = ["cost", "expense", "asset"];

export function checkBatch(raw: RawRow[], ctx: BatchContext): BatchCheck {
  const seen = new Set<string>();
  const rows = raw.map((r) => checkRow(r, ctx, seen));
  const byMonth = new Map<string, { count: number; total: Centavos }>();
  for (const r of rows) {
    if (!r.date) continue;
    const m = r.date.slice(0, 7);
    const b = byMonth.get(m) ?? { count: 0, total: 0 };
    byMonth.set(m, { count: b.count + 1, total: b.total + r.total });
  }
  return {
    rows,
    errorCount: rows.filter((r) => r.errors.length).length,
    total: rows.reduce((s, r) => s + r.total, 0),
    months: [...byMonth.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([month, v]) => ({ month, ...v })),
  };
}

function checkRow(r: RawRow, ctx: BatchContext, seen: Set<string>): BatchRow {
  const c = r.cells;
  const errors: string[] = [];
  const sales = ctx.kind === "sales";

  // Date and period.
  const date = isoDate(c.date);
  if (!c.date?.trim()) errors.push("No date.");
  else if (!date) errors.push(`The date "${c.date}" is not a date (use YYYY-MM-DD).`);
  else if (date > ctx.today) errors.push(`The date ${date} is in the future.`);
  else if (ctx.lockedMonths.has(`${date.slice(0, 7)}-01`)) errors.push(`${date.slice(0, 7)} is locked: its return has been filed.`);

  // The other party, as the SLS / SLP / QAP need it.
  const kindText = (c.party_kind ?? "").trim().toLowerCase();
  const individual = kindText.startsWith("ind") || kindText === "person";
  if (kindText && !individual && !kindText.startsWith("bus") && !kindText.startsWith("corp") && !kindText.startsWith("non")) errors.push(`Type "${c.party_kind}" is neither Business nor Individual.`);
  const last = c.party_last_name?.trim() || null;
  const first = c.party_first_name?.trim() || null;
  const middle = c.party_middle_name?.trim() || null;
  let partyName = c.party_name?.trim() || null;
  if (individual) {
    if (!last || !first) errors.push("An individual needs a last and a first name.");
    else partyName = [first, middle, last].filter(Boolean).join(" ");
  } else if (!partyName && (last || first)) {
    errors.push("Last and first name are for individuals: set the type to Individual, or give the registered name.");
  }
  if (!partyName && !individual) errors.push(sales ? "No customer name." : "No supplier name.");
  const tinText = c.party_tin?.trim();
  const tin = tinText ? normalizeTin(tinText) : null;
  if (tinText && !tin) errors.push(`The TIN "${tinText}" is not 9 to 14 digits.`);
  if (!tinText && !sales) errors.push("No supplier TIN: the SLP and the input VAT need it.");

  const number = c.number?.trim() || null;
  if (!number) errors.push(sales ? "No invoice number." : "No invoice or OR number.");

  // Account title.
  const account = findAccount(c.account, ctx.accounts);
  if (!c.account?.trim()) errors.push("No account title.");
  else if (!account) errors.push(`The account "${c.account}" is not in the client's chart.`);
  else if (!(sales ? SALES_TYPES : PURCHASE_TYPES).includes(account.type) || account.control)
    errors.push(`${accountLabel(account)} is not ${sales ? "a revenue account" : "an expense, cost or asset account"}.`);

  // Amounts.
  const amount = (key: string, label: string): Centavos => {
    const v = centavosOf(c[key]);
    if (v == null) {
      errors.push(`${label}: "${c[key]}" is not an amount.`);
      return 0;
    }
    if (v < 0) {
      errors.push(`${label} is negative; enter a return or credit memo by journal entry.`);
      return 0;
    }
    return v;
  };
  let vatableIncl: Centavos;
  let exempt: Centavos;
  let zero: Centavos;
  let slp: string | null = null;
  if (sales) {
    vatableIncl = amount("vatable", "VATable sales");
    exempt = amount("vat_exempt", "VAT-exempt sales");
    zero = amount("zero_rated", "Zero-rated sales");
    if (vatableIncl > 0 && date && !ctx.vatRegistered(date)) errors.push("The client is not VAT-registered on that date: enter the sale under VAT-exempt sales.");
  } else {
    const cats = { capital_goods: amount("capital_goods", "Capital goods"), other_goods: amount("other_goods", "Other goods"), services: amount("services", "Services") };
    const used = Object.entries(cats).filter(([, v]) => v > 0);
    if (used.length > 1) errors.push("Put capital goods, other goods and services on separate rows (one SLP category per row).");
    vatableIncl = used.reduce((s, [, v]) => s + v, 0);
    zero = amount("zero_rated", "Zero-rated");
    exempt = amount("exempt", "VAT-exempt / non-VAT");
    slp = used[0]?.[0] ?? (zero > 0 && exempt === 0 ? "zero_rated" : exempt > 0 && zero === 0 ? "exempt" : null);
    if (account?.type === "asset" && slp && slp !== "capital_goods" && vatableIncl > 0) errors.push(`${accountLabel(account)} is an asset: put the amount under Capital goods.`);
  }
  const { net: vatable, vat } = splitVat(vatableIncl);
  const total = vatableIncl + exempt + zero;
  if (total === 0 && errors.length === 0) errors.push("No amount.");
  const discount = sales ? amount("discount", "SC/PWD discount") : 0;
  const vatWithheld = sales ? amount("vat_withheld", "VAT withheld") : 0;
  const withholding = amount("withholding", sales ? "CWT amount" : "EWT amount");
  const atc = c.atc?.trim().toUpperCase() || null;
  if (withholding > 0 && !atc) errors.push(`${sales ? "CWT" : "EWT"} needs its ATC.`);
  if (atc && !ATC_RE.test(atc)) errors.push(`The ATC "${atc}" is not in the form WC158.`);
  if (atc && withholding === 0) errors.push(`ATC ${atc} without a ${sales ? "CWT" : "EWT"} amount.`);

  // Cash or charge.
  const paidText = (c.paid ?? "").trim().toLowerCase();
  if (paidText && !["y", "yes", "n", "no"].includes(paidText)) errors.push(`"${c.paid}" under ${sales ? "Collected" : "Paid"} same day: use Y or N.`);
  const cash = !paidText.startsWith("n");
  const other = amount("other_deduction", "Other deduction");
  const otherAccount = findAccount(c.other_account, ctx.accounts);
  if (other > 0) {
    if (!cash) errors.push(`An other deduction is booked only when ${sales ? "collected" : "paid"} the same day.`);
    if (!otherAccount) errors.push(c.other_account?.trim() ? `The account "${c.other_account}" is not in the client's chart.` : "Give the account for the other deduction.");
  }
  const net = total - withholding - vatWithheld - other;
  const paymentAccount = findAccount(c.payment_account, ctx.accounts);
  if (c.payment_account?.trim()) {
    if (!paymentAccount) errors.push(`The account "${c.payment_account}" is not in the client's chart.`);
    else if (paymentAccount.control !== "cash" && paymentAccount.control !== "bank") errors.push(`${accountLabel(paymentAccount)} is not a cash or bank account.`);
  }
  if (cash && c.paid_amount?.trim()) {
    const paid = amount("paid_amount", sales ? "Amount received" : "Amount paid");
    if (Math.abs(paid - net) > TOLERANCE)
      errors.push(`${sales ? "Amount received" : "Amount paid"} ${pesos(paid)} is not the net ${pesos(net)} (total ${pesos(total)} less withholding and deductions).`);
  }

  // Duplicates, in the file and in the register.
  const fields: OcrFields = {
    date,
    number,
    party_kind: kindText ? (individual ? "individual" : "non_individual") : null,
    party_name: partyName,
    party_last_name: individual ? last : null,
    party_first_name: individual ? first : null,
    party_middle_name: individual ? middle : null,
    party_tin: tin,
    party_address: c.party_address?.trim() || null,
    vatable: pesos(vatable),
    vat_exempt: pesos(exempt),
    zero_rated: pesos(zero),
    vat: pesos(vat),
    total: pesos(total),
    discount: discount ? pesos(discount) : null,
    atc,
    withholding: withholding ? pesos(withholding) : null,
    vat_withheld: vatWithheld ? pesos(vatWithheld) : null,
    other_deduction: other ? pesos(other) : null,
    other_deduction_account: other && otherAccount ? otherAccount.id : null,
    slp_category: slp,
    payment_terms: cash ? "cash" : "charge",
    payment_account: cash && paymentAccount ? paymentAccount.id : null,
  };
  const key = dupKey(ctx.kind, fields);
  if (key) {
    if (seen.has(key)) errors.push(`${number} appears twice in the file.`);
    else if (ctx.existing.has(key)) errors.push(`${number} is already in the register.`);
    seen.add(key);
  }

  return {
    line: r.line,
    fields,
    accountId: account?.id ?? null,
    party: partyName ?? "—",
    date,
    total,
    net,
    booked: Boolean(date && date >= ctx.booksStart),
    errors,
  };
}
