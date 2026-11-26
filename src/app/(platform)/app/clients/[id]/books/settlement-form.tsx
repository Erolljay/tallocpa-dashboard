"use client";

import { useMemo, useState, useTransition } from "react";
import { Pick, type PickOption } from "@/components/books/pick";
import { Button, Field, Input, Notice } from "@/components/ui";
import type { SettlementInput } from "@/lib/books/actions";
import { allocateOldestFirst, parsePesos, pesos } from "@/lib/books/ui";
import { formatAmount } from "@/lib/returns/money";
import { saveSettlementAction } from "./transactions-actions";

export interface OpenInvoice {
  id: string;
  partyKey: string;
  partyId: string | null;
  partyName: string;
  reference: string | null;
  issueDate: string;
  /** What may still be settled, centavos (on an edit, with this settlement's own share added back). */
  balance: number;
}

export interface SettlementFormValue {
  id?: string;
  date: string;
  cashAccountId: string | null;
  partyKey: string | null;
  reference: string;
  description: string;
  deduction: string;
  deductionAccountId: string | null;
  allocations: Record<string, string>;
}

const fmt = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));

/**
 * New or edit Receipt / Payment (save_book_settlement): it only moves cash and
 * settles the party's open invoices, so there are no tax codes here. Type the
 * amount received or paid to spread it over the oldest invoices first, or set
 * each invoice's amount.
 */
export function SettlementForm({
  clientId,
  kind,
  value,
  invoices,
  cashAccounts,
  deductionAccounts,
  minDate,
}: {
  clientId: string;
  kind: "receipt" | "payment";
  value: SettlementFormValue;
  invoices: OpenInvoice[];
  cashAccounts: PickOption[];
  deductionAccounts: PickOption[];
  minDate: string;
}) {
  const [v, setV] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const set = <K extends keyof SettlementFormValue>(k: K, x: SettlementFormValue[K]) => setV((s) => ({ ...s, [k]: x }));
  const parties = useMemo(() => {
    const m = new Map<string, string>();
    for (const i of invoices) if (!m.has(i.partyKey)) m.set(i.partyKey, i.partyName);
    return [...m].map(([id, label]) => ({ id, label })).sort((a, b) => a.label.localeCompare(b.label));
  }, [invoices]);
  const mine = invoices.filter((i) => i.partyKey === v.partyKey).sort((a, b) => a.issueDate.localeCompare(b.issueDate));
  const total = mine.reduce((s, i) => s + (parsePesos(v.allocations[i.id]) ?? 0), 0);
  const ded = parsePesos(v.deduction) ?? 0;
  const who = kind === "receipt" ? "Paid by (customer)" : "Payee (supplier)";

  const spread = (amount: string) => {
    const c = parsePesos(amount);
    if (c == null) return;
    const out = allocateOldestFirst(mine.map((i) => ({ id: i.id, issueDate: i.issueDate, balance: i.balance })), c);
    set("allocations", Object.fromEntries(mine.map((i) => [i.id, out.has(i.id) ? pesos(out.get(i.id)!) : ""])));
  };

  const submit = () => {
    setError(null);
    const party = mine[0];
    const input: SettlementInput = {
      id: v.id,
      kind,
      settle_date: v.date,
      cash_account_id: v.cashAccountId ?? "",
      party_id: party?.partyId ?? null,
      party_name: party?.partyName ?? null,
      reference: v.reference.trim() || null,
      description: v.description.trim() || null,
      deduction: ded > 0 ? pesos(ded) : null,
      deduction_account_id: ded > 0 ? v.deductionAccountId : null,
      allocations: mine.filter((i) => (parsePesos(v.allocations[i.id]) ?? 0) > 0).map((i) => ({ invoice_id: i.id, amount: pesos(parsePesos(v.allocations[i.id])!) })),
    };
    start(async () => {
      const r = await saveSettlementAction(clientId, input);
      if (r?.error) setError(r.error);
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-5"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <Field label="Date" htmlFor="settle_date"><Input id="settle_date" type="date" min={minDate} value={v.date} onChange={(e) => set("date", e.target.value)} required /></Field>
        <Pick label={kind === "receipt" ? "Received in" : "Paid from"} value={v.cashAccountId} onChange={(x) => set("cashAccountId", x)} options={cashAccounts} />
        <Field label="Reference" htmlFor="reference"><Input id="reference" value={v.reference} onChange={(e) => set("reference", e.target.value)} placeholder={kind === "receipt" ? "OR 0123" : "Check no."} /></Field>
        <Pick label={who} value={v.partyKey} onChange={(x) => setV((s) => ({ ...s, partyKey: x, allocations: {} }))} options={parties} placeholder={parties.length ? "Choose…" : "No open invoices"} isDisabled={parties.length === 0 || Boolean(v.id)} />
        <div className="sm:col-span-1 xl:col-span-2">
          <Field label="Description" htmlFor="description"><Input id="description" value={v.description} onChange={(e) => set("description", e.target.value)} /></Field>
        </div>
      </div>

      {v.partyKey && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-end gap-3">
            <h3 className="me-auto text-headline-medium text-text-primary">Invoices settled</h3>
            <Field label={kind === "receipt" ? "Amount received" : "Amount paid"} htmlFor="spread" hint="Spreads over the oldest invoices first">
              <Input id="spread" inputMode="decimal" onBlur={(e) => spread(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); spread(e.currentTarget.value); } }} className="w-40 text-end tabular-nums" />
            </Field>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-body-regular">
              <thead className="text-body-medium text-text-tertiary">
                <tr>
                  <th scope="col" className="py-2 pe-3 text-start">Invoice</th>
                  <th scope="col" className="py-2 pe-3 text-start">Date</th>
                  <th scope="col" className="py-2 pe-3 text-end">Balance due</th>
                  <th scope="col" className="w-40 py-2 text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mine.map((i) => (
                  <tr key={i.id} className="border-t border-separator-border">
                    <td className="py-2 pe-3 text-text-primary">{i.reference ?? "Invoice"}</td>
                    <td className="py-2 pe-3 tabular-nums text-text-secondary">{fmt(i.issueDate)}</td>
                    <td className="py-2 pe-3 text-end tabular-nums text-text-secondary">
                      <button type="button" onClick={() => set("allocations", { ...v.allocations, [i.id]: pesos(i.balance) })} className="rounded-md hover:underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring" title="Settle in full">
                        {formatAmount(i.balance)}
                      </button>
                    </td>
                    <td className="py-1.5">
                      <label htmlFor={`alloc_${i.id}`} className="sr-only">Amount for {i.reference ?? "the invoice"}</label>
                      <Input id={`alloc_${i.id}`} inputMode="decimal" value={v.allocations[i.id] ?? ""} onChange={(e) => set("allocations", { ...v.allocations, [i.id]: e.target.value })} className="text-end tabular-nums" />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-separator-border text-body-medium text-text-primary">
                <tr>
                  <td colSpan={3} className="py-2">Total settled</td>
                  <td className="py-2 text-end tabular-nums">{formatAmount(total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={kind === "receipt" ? "Bank or card charges deducted" : "Deduction taken"} htmlFor="deduction"><Input id="deduction" inputMode="decimal" value={v.deduction} onChange={(e) => set("deduction", e.target.value)} className="text-end tabular-nums" /></Field>
        {ded > 0 && <Pick label="Account for the deduction" value={v.deductionAccountId} onChange={(x) => set("deductionAccountId", x)} options={deductionAccounts} />}
      </div>
      {ded > 0 && <p className="text-caption-1-regular text-text-tertiary">{kind === "receipt" ? "Cash received" : "Cash paid"}: {formatAmount(total - ded)}</p>}

      {error && <Notice tone="blocked">{error}</Notice>}
      <Button type="submit" disabled={pending || !v.partyKey || total <= 0}>{pending ? "Saving…" : v.id ? "Save changes" : "Create"}</Button>
    </form>
  );
}
