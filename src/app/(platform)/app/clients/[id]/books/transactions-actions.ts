"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveInvoice, saveSettlement, voidInvoice, voidSettlement, type InvoiceInput, type SettlementInput } from "@/lib/books/actions";
import { booksAccess } from "@/lib/ledger/data";

export type TxState = { error?: string; ok?: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const AMOUNT = /^-?\d+(\.\d{1,2})?$/;

const books = (clientId: string) => `/app/clients/${clientId}/books`;
const invoiceModule = (kind: "sales" | "purchase") => (kind === "sales" ? "sales-invoices" : "purchase-invoices");
const settlementModule = (kind: "receipt" | "payment") => (kind === "receipt" ? "receipts" : "payments");

function revalidate(clientId: string) {
  revalidatePath(books(clientId), "layout");
  revalidatePath("/app/documents");
}

/** Checks the shape of an invoice from the form before the database checks the rest. */
function checkInvoice(inv: InvoiceInput): string | null {
  if (inv.kind !== "sales" && inv.kind !== "purchase") return "Choose a Sales Invoice or a Purchase Invoice.";
  if (inv.id && !UUID.test(inv.id)) return "Unknown invoice.";
  if (!DATE.test(inv.issue_date ?? "")) return "Enter the invoice date.";
  if (inv.due_date && !DATE.test(inv.due_date)) return "Enter the due date as a date.";
  if (!inv.party_id && !(inv.party_name ?? "").trim()) return `Enter the ${inv.kind === "sales" ? "customer" : "supplier"}.`;
  if (inv.party_id && !UUID.test(inv.party_id)) return "Unknown customer or supplier.";
  if (!Array.isArray(inv.lines) || inv.lines.length === 0) return "An invoice needs at least one line.";
  for (const [i, l] of inv.lines.entries()) {
    if (!UUID.test(l.account_id ?? "")) return `Line ${i + 1}: choose the account.`;
    if (!AMOUNT.test(l.amount ?? "") || Number(l.amount) === 0) return `Line ${i + 1}: enter an amount like 1120.50.`;
    if (l.tax_code_id && !UUID.test(l.tax_code_id)) return `Line ${i + 1}: unknown tax code.`;
  }
  for (const [k, v] of [["withholding", inv.withholding], ["VAT withheld", inv.vat_withheld], ["discount", inv.discount]] as const) {
    if (v && !AMOUNT.test(v)) return `Enter the ${k} as an amount like 1120.50.`;
  }
  return null;
}

/** New or edited Sales / Purchase Invoice → its Transaction Journal. */
export async function saveInvoiceAction(clientId: string, invoice: InvoiceInput): Promise<TxState> {
  await booksAccess(clientId);
  const bad = checkInvoice(invoice);
  if (bad) return { error: bad };
  let id: string;
  try {
    id = await saveInvoice(clientId, invoice);
  } catch (e) {
    return { error: (e as Error).message };
  }
  revalidate(clientId);
  redirect(`${books(clientId)}/${invoiceModule(invoice.kind)}/${id}?month=${invoice.issue_date.slice(0, 7)}`);
}

export async function voidInvoiceAction(clientId: string, invoiceId: string, kind: "sales" | "purchase", _: TxState, form: FormData): Promise<TxState> {
  await booksAccess(clientId);
  const reason = String(form.get("reason") ?? "").trim();
  if (!reason) return { error: "Give the reason for voiding it." };
  try {
    await voidInvoice(invoiceId, reason);
  } catch (e) {
    return { error: (e as Error).message };
  }
  revalidate(clientId);
  redirect(`${books(clientId)}/${invoiceModule(kind)}/${invoiceId}`);
}

function checkSettlement(s: SettlementInput): string | null {
  if (s.kind !== "receipt" && s.kind !== "payment") return "Choose a Receipt or a Payment.";
  if (s.id && !UUID.test(s.id)) return "Unknown receipt or payment.";
  if (!DATE.test(s.settle_date ?? "")) return "Enter the date.";
  if (!UUID.test(s.cash_account_id ?? "")) return "Choose the cash or bank account.";
  if (s.deduction && !AMOUNT.test(s.deduction)) return "Enter the deduction as an amount like 25.00.";
  if (s.deduction && Number(s.deduction) > 0 && !UUID.test(s.deduction_account_id ?? "")) return "Choose the account for the deduction (for example Bank Charges).";
  if (!Array.isArray(s.allocations) || s.allocations.length === 0) return `Enter how much of each invoice this ${s.kind} settles.`;
  for (const a of s.allocations) {
    if (!UUID.test(a.invoice_id ?? "") || !AMOUNT.test(a.amount ?? "") || Number(a.amount) <= 0) return "Enter amounts above zero for the invoices settled.";
  }
  return null;
}

/** New or edited Receipt / Payment → its Transaction Journal. */
export async function saveSettlementAction(clientId: string, settlement: SettlementInput): Promise<TxState> {
  await booksAccess(clientId);
  const bad = checkSettlement(settlement);
  if (bad) return { error: bad };
  let id: string;
  try {
    id = await saveSettlement(clientId, { ...settlement, deduction: settlement.deduction && Number(settlement.deduction) > 0 ? settlement.deduction : null, deduction_account_id: settlement.deduction && Number(settlement.deduction) > 0 ? settlement.deduction_account_id : null });
  } catch (e) {
    return { error: (e as Error).message };
  }
  revalidate(clientId);
  redirect(`${books(clientId)}/${settlementModule(settlement.kind)}/${id}?month=${settlement.settle_date.slice(0, 7)}`);
}

export async function voidSettlementAction(clientId: string, settlementId: string, kind: "receipt" | "payment", _: TxState, form: FormData): Promise<TxState> {
  await booksAccess(clientId);
  const reason = String(form.get("reason") ?? "").trim();
  if (!reason) return { error: "Give the reason for voiding it." };
  try {
    await voidSettlement(settlementId, reason);
  } catch (e) {
    return { error: (e as Error).message };
  }
  revalidate(clientId);
  redirect(`${books(clientId)}/${settlementModule(kind)}/${settlementId}`);
}
