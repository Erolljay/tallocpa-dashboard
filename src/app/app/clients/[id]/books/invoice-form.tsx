"use client";

import { useState, useTransition } from "react";
import { RiAddLine, RiDeleteBinLine } from "@remixicon/react";
import { Pick, type PickOption } from "@/components/books/pick";
import { Button, Field, Input, Notice } from "@/components/ui";
import type { InvoiceInput } from "@/lib/books/actions";
import type { TaxCode } from "@/lib/books/tax-codes";
import { codesFor, invoicePreview } from "@/lib/books/ui";
import { formatAmount } from "@/lib/returns/money";
import { saveInvoiceAction } from "./transactions-actions";

export interface InvoiceFormValue {
  id?: string;
  partyId: string | null;
  partyName: string;
  partyTin: string;
  reference: string;
  issueDate: string;
  dueDate: string;
  description: string;
  withholdingCodeId: string | null;
  withholding: string;
  vatWithholdingCodeId: string | null;
  vatWithheld: string;
  discount: string;
  lines: { accountId: string | null; description: string; amount: string; taxCodeId: string | null }[];
}

const OTHER = "__other__";
const blankLine = () => ({ accountId: null, description: "", amount: "", taxCodeId: null });

/**
 * New or edit Sales / Purchase Invoice (save_book_invoice): lines with account,
 * amount (net of VAT) and a tax code that may go on this invoice's lines; a
 * withholding code (CWT on a sale, EWT on a purchase) and, on a sale to the
 * government, a WV code. The figures below work out as the database will.
 */
export function InvoiceForm({
  clientId,
  kind,
  value,
  parties,
  accounts,
  taxCodes,
  minDate,
}: {
  clientId: string;
  kind: "sales" | "purchase";
  value: InvoiceFormValue;
  parties: { id: string; name: string; tin: string | null }[];
  accounts: PickOption[];
  taxCodes: TaxCode[];
  minDate: string;
}) {
  const [v, setV] = useState<InvoiceFormValue>(() => ({ ...value, partyId: value.partyId ?? (value.partyName || parties.length === 0 ? OTHER : null) }));
  const typed = v.partyId === OTHER;
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const set = <K extends keyof InvoiceFormValue>(k: K, x: InvoiceFormValue[K]) => setV((s) => ({ ...s, [k]: x }));
  const setLine = (i: number, patch: Partial<InvoiceFormValue["lines"][number]>) => setV((s) => ({ ...s, lines: s.lines.map((l, j) => (j === i ? { ...l, ...patch } : l)) }));
  const who = kind === "sales" ? "Customer" : "Supplier";

  const lineCodes = (keep: string | null) => codesFor(taxCodes, kind, "line", keep).map((c) => ({ id: c.id, label: c.name }));
  const invoiceCodes = codesFor(taxCodes, kind, "invoice", v.withholdingCodeId ?? v.vatWithholdingCodeId);
  const whCodes = invoiceCodes.filter((c) => c.kind === "withholding" || c.id === v.withholdingCodeId).map((c) => ({ id: c.id, label: c.name }));
  const wvCodes = invoiceCodes.filter((c) => c.kind === "govt_vat_withheld").map((c) => ({ id: c.id, label: c.name }));
  const preview = invoicePreview(v.lines.map((l) => ({ amount: l.amount, taxCodeId: l.taxCodeId })), taxCodes, {
    discount: kind === "sales" ? v.discount : "",
    withholdingCodeId: v.withholdingCodeId,
    withholding: v.withholding,
    vatWithholdingCodeId: kind === "sales" ? v.vatWithholdingCodeId : null,
    vatWithheld: v.vatWithheld,
  });

  const submit = () => {
    setError(null);
    const lines = v.lines.filter((l) => l.accountId || l.amount.trim());
    const input: InvoiceInput = {
      id: v.id,
      kind,
      party_id: typed ? null : v.partyId,
      party_name: typed ? v.partyName.trim() || null : null,
      party_tin: typed ? v.partyTin.trim() || null : null,
      reference: v.reference.trim() || null,
      issue_date: v.issueDate,
      due_date: v.dueDate || null,
      description: v.description.trim() || null,
      withholding_code_id: v.withholdingCodeId,
      withholding: v.withholdingCodeId && v.withholding.trim() ? v.withholding.replace(/,/g, "").trim() : null,
      vat_withholding_code_id: kind === "sales" ? v.vatWithholdingCodeId : null,
      vat_withheld: kind === "sales" && v.vatWithholdingCodeId && v.vatWithheld.trim() ? v.vatWithheld.replace(/,/g, "").trim() : null,
      discount: kind === "sales" && v.discount.trim() ? v.discount.replace(/,/g, "").trim() : null,
      lines: lines.map((l) => ({ account_id: l.accountId ?? "", description: l.description.trim() || null, amount: l.amount.replace(/,/g, "").trim(), tax_code_id: l.taxCodeId })),
    };
    start(async () => {
      const r = await saveInvoiceAction(clientId, input);
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
        <Pick
          label={who}
          value={v.partyId}
          onChange={(x) => set("partyId", x)}
          options={[...parties.map((p) => ({ id: p.id, label: p.tin ? `${p.name} · ${p.tin}` : p.name })), { id: OTHER, label: `Another ${who.toLowerCase()} (type the name)` }]}
        />
        {typed && (
          <>
            <Field label={`${who} name`} htmlFor="party_name"><Input id="party_name" value={v.partyName} onChange={(e) => set("partyName", e.target.value)} required /></Field>
            <Field label="TIN" htmlFor="party_tin" hint="000-000-000-000, if known"><Input id="party_tin" value={v.partyTin} onChange={(e) => set("partyTin", e.target.value)} className="tabular-nums" /></Field>
          </>
        )}
        <Field label="Reference" htmlFor="reference"><Input id="reference" value={v.reference} onChange={(e) => set("reference", e.target.value)} placeholder={kind === "sales" ? "SI 0451" : "Supplier's invoice no."} /></Field>
        <Field label="Issue date" htmlFor="issue_date"><Input id="issue_date" type="date" min={minDate} value={v.issueDate} onChange={(e) => set("issueDate", e.target.value)} required /></Field>
        <Field label="Due date" htmlFor="due_date" hint="Blank: due on the issue date"><Input id="due_date" type="date" min={v.issueDate || minDate} value={v.dueDate} onChange={(e) => set("dueDate", e.target.value)} /></Field>
        <div className="sm:col-span-2 xl:col-span-3">
          <Field label="Description" htmlFor="description"><Input id="description" value={v.description} onChange={(e) => set("description", e.target.value)} /></Field>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-headline-medium text-text-primary">Lines</h3>
        <div className="space-y-3">
          {v.lines.map((l, i) => {
            const code = taxCodes.find((c) => c.id === l.taxCodeId);
            return (
              <div key={i} className="grid items-end gap-2 rounded-2xl bg-background-secondary-default p-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_8rem_minmax(0,1fr)_auto]">
                <Pick label={i === 0 ? "Account" : undefined} ariaLabel={`Line ${i + 1} account`} value={l.accountId} onChange={(x) => setLine(i, { accountId: x })} options={accounts} />
                <Field label={i === 0 ? "Description" : ""} htmlFor={`line_desc_${i}`}><Input id={`line_desc_${i}`} aria-label={i === 0 ? undefined : `Line ${i + 1} description`} value={l.description} onChange={(e) => setLine(i, { description: e.target.value })} /></Field>
                <Field label={i === 0 ? "Amount (net of VAT)" : ""} htmlFor={`line_amt_${i}`}>
                  <Input id={`line_amt_${i}`} aria-label={i === 0 ? undefined : `Line ${i + 1} amount`} inputMode="decimal" value={l.amount} onChange={(e) => setLine(i, { amount: e.target.value })} aria-invalid={preview.bad.includes(i + 1) || undefined} className="text-end tabular-nums" />
                </Field>
                <div className="min-w-0">
                  <Pick label={i === 0 ? "Tax code" : undefined} ariaLabel={`Line ${i + 1} tax code`} value={l.taxCodeId} onChange={(x) => setLine(i, { taxCodeId: x })} options={lineCodes(l.taxCodeId)} noneLabel="No tax code" />
                  {code && code.rate > 0 && <p className="mt-1 text-caption-1-regular text-text-tertiary">VAT {Math.round(code.rate * 100)}%</p>}
                </div>
                <Button variant="ghost" size="sm" aria-label={`Remove line ${i + 1}`} disabled={v.lines.length === 1} onClick={() => setV((s) => ({ ...s, lines: s.lines.filter((_, j) => j !== i) }))}>
                  <RiDeleteBinLine aria-hidden className="size-4" />
                </Button>
              </div>
            );
          })}
        </div>
        <Button variant="secondary" size="sm" onClick={() => setV((s) => ({ ...s, lines: [...s.lines, blankLine()] }))}>
          <RiAddLine aria-hidden className="size-4" /> Add line
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Pick label={kind === "sales" ? "Withholding code (CWT the customer withholds)" : "Withholding code (EWT you withhold)"} value={v.withholdingCodeId} onChange={(x) => set("withholdingCodeId", x)} options={whCodes} noneLabel="None" />
          {v.withholdingCodeId && (
            <Field label="Tax withheld" htmlFor="withholding" hint="Blank: at the code's rate"><Input id="withholding" inputMode="decimal" value={v.withholding} onChange={(e) => set("withholding", e.target.value)} className="text-end tabular-nums" /></Field>
          )}
        </div>
        {kind === "sales" && (
          <div className="space-y-2">
            <Pick label="VAT withheld by a government customer" value={v.vatWithholdingCodeId} onChange={(x) => set("vatWithholdingCodeId", x)} options={wvCodes} noneLabel="None" />
            {v.vatWithholdingCodeId && (
              <Field label="VAT withheld" htmlFor="vat_withheld" hint="Blank: at the code's rate"><Input id="vat_withheld" inputMode="decimal" value={v.vatWithheld} onChange={(e) => set("vatWithheld", e.target.value)} className="text-end tabular-nums" /></Field>
            )}
            <Field label="SC/PWD discount" htmlFor="discount"><Input id="discount" inputMode="decimal" value={v.discount} onChange={(e) => set("discount", e.target.value)} className="text-end tabular-nums" /></Field>
          </div>
        )}
      </div>

      <dl className="ms-auto grid max-w-sm grid-cols-[1fr_auto] gap-x-6 gap-y-1 text-body-regular">
        <dt className="text-text-secondary">Subtotal</dt><dd className="text-end tabular-nums text-text-primary">{formatAmount(preview.subtotal)}</dd>
        <dt className="text-text-secondary">VAT</dt><dd className="text-end tabular-nums text-text-primary">{formatAmount(preview.tax)}</dd>
        {preview.discount !== 0 && (<><dt className="text-text-secondary">Discount</dt><dd className="text-end tabular-nums text-text-primary">({formatAmount(preview.discount)})</dd></>)}
        <dt className="border-t border-separator-border pt-1 text-body-medium text-text-primary">Invoice amount</dt><dd className="border-t border-separator-border pt-1 text-end text-body-medium tabular-nums text-text-primary">{formatAmount(preview.total)}</dd>
        {preview.withholding !== 0 && (<><dt className="text-text-secondary">{kind === "sales" ? "Less CWT" : "Less EWT"}</dt><dd className="text-end tabular-nums text-text-primary">({formatAmount(preview.withholding)})</dd></>)}
        {preview.vatWithheld !== 0 && (<><dt className="text-text-secondary">Less VAT withheld</dt><dd className="text-end tabular-nums text-text-primary">({formatAmount(preview.vatWithheld)})</dd></>)}
        <dt className="text-body-medium text-text-primary">{kind === "sales" ? "Receivable" : "Payable"}</dt><dd className="text-end text-body-medium tabular-nums text-text-primary">{formatAmount(preview.due)}</dd>
      </dl>

      {error && <Notice tone="blocked">{error}</Notice>}
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : v.id ? "Save changes" : "Create"}</Button>
      </div>
    </form>
  );
}
