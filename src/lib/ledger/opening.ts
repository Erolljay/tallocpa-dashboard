/**
 * Opening balances (spec §3.6): the trial balance as of the day before the
 * books start (31 December 2026 for the go-live clients), plus the open
 * receivables and payables by customer / supplier that make up the AR and AP
 * balances. Checked here before anything is saved; the database checks the
 * same totals again (save_opening_balances).
 */
import { parseTin } from "@/lib/parties/tin";
import { toCentavos, toDecimalString } from "@/lib/returns/money";
import type { Centavos, LedgerAccount } from "./types";

export interface TbRow {
  line: number;
  code: string;
  debit: string;
  credit: string;
}

export interface ItemRow {
  line: number;
  kind: "receivable" | "payable";
  partyName: string;
  tin: string;
  docNumber: string;
  docDate: string;
  dueDate: string;
  amount: string;
}

export interface OpeningLine {
  accountId: string;
  code: string;
  name: string;
  debit: Centavos;
  credit: Centavos;
}

export interface OpeningItem {
  kind: "receivable" | "payable";
  partyName: string;
  partyTin: string | null;
  docNumber: string | null;
  docDate: string | null;
  dueDate: string | null;
  amount: Centavos;
}

export interface CheckedOpening {
  lines: OpeningLine[];
  items: OpeningItem[];
  totalDebit: Centavos;
  totalCredit: Centavos;
  arBalance: Centavos;
  apBalance: Centavos;
  arItems: Centavos;
  apItems: Centavos;
  errors: string[];
}

const DATE_RE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const sheetOf = (k: ItemRow["kind"]) => (k === "receivable" ? "Receivables" : "Payables");

export function checkOpening(tb: TbRow[], itemRows: ItemRow[], accounts: LedgerAccount[]): CheckedOpening {
  const errors: string[] = [];
  const byCode = new Map(accounts.map((a) => [a.code.toUpperCase(), a]));
  const lines: OpeningLine[] = [];
  const seen = new Set<string>();

  for (const r of tb) {
    const code = r.code.trim();
    if (!code && !r.debit.trim() && !r.credit.trim()) continue;
    const a = byCode.get(code.toUpperCase());
    if (!a) { errors.push(`Trial Balance row ${r.line}: no account ${code || "(blank code)"} in this client's chart.`); continue; }
    if (seen.has(a.id)) { errors.push(`Trial Balance row ${r.line}: account ${a.code} appears twice.`); continue; }
    const dr = r.debit.trim() ? toCentavos(r.debit) : 0;
    const cr = r.credit.trim() ? toCentavos(r.credit) : 0;
    if (dr == null || cr == null) { errors.push(`Trial Balance row ${r.line} (${a.code}): the amount is not a number.`); continue; }
    if (dr < 0 || cr < 0) { errors.push(`Trial Balance row ${r.line} (${a.code}): enter amounts as positive debits or credits.`); continue; }
    if (dr > 0 && cr > 0) { errors.push(`Trial Balance row ${r.line} (${a.code}): enter either a debit or a credit, not both.`); continue; }
    if (dr === 0 && cr === 0) continue;
    seen.add(a.id);
    lines.push({ accountId: a.id, code: a.code, name: a.name, debit: dr, credit: cr });
  }

  const items: OpeningItem[] = [];
  for (const r of itemRows) {
    const where = `${sheetOf(r.kind)} row ${r.line}`;
    if (!r.partyName.trim() && !r.amount.trim()) continue;
    if (!r.partyName.trim()) { errors.push(`${where}: enter the ${r.kind === "receivable" ? "customer" : "supplier"}'s name.`); continue; }
    const amount = toCentavos(r.amount);
    if (amount == null || amount === 0) { errors.push(`${where} (${r.partyName}): enter the balance.`); continue; }
    let tin: string | null = null;
    if (r.tin.trim()) {
      const p = parseTin(r.tin);
      if (!p) { errors.push(`${where} (${r.partyName}): the TIN is not 9 digits.`); continue; }
      tin = p.tin;
    }
    const bad = [r.docDate, r.dueDate].find((d) => d.trim() && !DATE_RE.test(d.trim()));
    if (bad) { errors.push(`${where} (${r.partyName}): write dates as YYYY-MM-DD.`); continue; }
    items.push({
      kind: r.kind, partyName: r.partyName.trim(), partyTin: tin, docNumber: r.docNumber.trim() || null,
      docDate: r.docDate.trim() || null, dueDate: r.dueDate.trim() || null, amount,
    });
  }

  const sum = (xs: number[]) => xs.reduce((s, x) => s + x, 0);
  const totalDebit = sum(lines.map((l) => l.debit));
  const totalCredit = sum(lines.map((l) => l.credit));
  const control = (c: "ar" | "ap") => accounts.find((a) => a.control === c);
  const ar = control("ar");
  const ap = control("ap");
  const net = (id: string | undefined) => sum(lines.filter((l) => l.accountId === id).map((l) => l.debit - l.credit));
  const arBalance = net(ar?.id);
  const apBalance = -net(ap?.id);
  const arItems = sum(items.filter((i) => i.kind === "receivable").map((i) => i.amount));
  const apItems = sum(items.filter((i) => i.kind === "payable").map((i) => i.amount));

  if (lines.length < 2) errors.push("The trial balance has fewer than two accounts with a balance.");
  if (totalDebit !== totalCredit) errors.push(`The trial balance does not balance: debits ${fmt(totalDebit)}, credits ${fmt(totalCredit)} (difference ${fmt(totalDebit - totalCredit)}).`);
  if (arItems !== arBalance) errors.push(`The receivables listed (${fmt(arItems)}) do not add up to the Accounts Receivable balance (${fmt(arBalance)}).`);
  if (apItems !== apBalance) errors.push(`The payables listed (${fmt(apItems)}) do not add up to the Accounts Payable balance (${fmt(apBalance)}).`);

  return { lines, items, totalDebit, totalCredit, arBalance, apBalance, arItems, apItems, errors };
}

const fmt = (c: Centavos) => toDecimalString(c);

/** save_opening_balances arguments. */
export function openingPayload(c: CheckedOpening) {
  return {
    p_lines: c.lines.map((l) => ({ account_id: l.accountId, debit: toDecimalString(l.debit), credit: toDecimalString(l.credit) })),
    p_items: c.items.map((i) => ({
      kind: i.kind, party_name: i.partyName, party_tin: i.partyTin, doc_number: i.docNumber,
      doc_date: i.docDate, due_date: i.dueDate, amount: toDecimalString(i.amount),
    })),
  };
}
