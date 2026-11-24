"use client";

import { useActionState, useMemo, useState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { BIR_LINES } from "@/lib/ledger/bir-lines";
import { FS_LINES } from "@/lib/ledger/fs-lines";
import { ACCOUNT_TYPES, CONTROLS, NORMAL_SIDE, TEMPLATES, type AccountType, type LedgerAccount, type TemplateCode } from "@/lib/ledger/types";
import { formatAmount, toCentavos } from "@/lib/returns/money";
import {
  deleteAccountAction,
  postEntryAction,
  previewOpeningAction,
  reverseEntryAction,
  saveAccountAction,
  saveOpeningAction,
  setupBooksAction,
  type FormState,
  type OpeningState,
} from "./actions";

// ---------------------------------------------------------------------------
// Setting up the books.
// ---------------------------------------------------------------------------
export function SetupForm({ clientId, defaultTemplate, counts }: { clientId: string; defaultTemplate: TemplateCode; counts: Record<TemplateCode, number> }) {
  const [state, action, pending] = useActionState(setupBooksAction.bind(null, clientId), {} as FormState);
  const [template, setTemplate] = useState<TemplateCode>(defaultTemplate);
  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Chart-of-accounts template" htmlFor="template" hint={`${counts[template]} accounts; you can add, rename or deactivate accounts afterwards.`}>
          <Select id="template" name="template" value={template} onChange={(e) => setTemplate(e.target.value as TemplateCode)}>
            {(Object.keys(TEMPLATES) as TemplateCode[]).map((t) => <option key={t} value={t}>{TEMPLATES[t]}</option>)}
          </Select>
        </Field>
        <Field label="First month of the books" htmlFor="books_start" hint="The opening balances are dated the day before (31 December 2026 for January 2027).">
          <Input id="books_start" name="books_start" type="month" defaultValue="2027-01" required />
        </Field>
      </div>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
      <Button type="submit" disabled={pending}>{pending ? "Setting up…" : "Set up books"}</Button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Chart of accounts.
// ---------------------------------------------------------------------------
export function AccountForm({ clientId, account, used }: { clientId: string; account: LedgerAccount | null; used: boolean }) {
  const [state, action, pending] = useActionState(saveAccountAction.bind(null, clientId, account?.id ?? null), {} as FormState);
  const [del, setDel] = useState<FormState>({});
  const [deleting, setDeleting] = useState(false);
  const [type, setType] = useState<AccountType>(account?.type ?? "expense");
  const e = state.fieldErrors ?? {};
  const p = account?.id ?? "new";
  const pnl = !["asset", "liability", "equity"].includes(type);
  if (del.ok) return <p className="text-body-regular text-text-secondary">Deleted.</p>;
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-[6rem_1fr_10rem] lg:grid-cols-[6rem_1.4fr_9rem_8rem_1fr_1fr]">
      <Field label="Code" htmlFor={`code-${p}`} error={e.code}>
        <Input id={`code-${p}`} name="code" defaultValue={account?.code ?? ""} required className="tabular-nums" />
      </Field>
      <Field label="Account title" htmlFor={`name-${p}`} error={e.name}>
        <Input id={`name-${p}`} name="name" defaultValue={account?.name ?? ""} required />
      </Field>
      <Field label="Type" htmlFor={`type-${p}`} error={e.type} hint={used ? "Has entries: fixed." : undefined}>
        <Select id={`type-${p}`} name="type" value={type} onChange={(x) => setType(x.target.value as AccountType)} disabled={used}>
          {(Object.keys(ACCOUNT_TYPES) as AccountType[]).map((t) => <option key={t} value={t}>{ACCOUNT_TYPES[t]}</option>)}
        </Select>
        {used && <input type="hidden" name="type" value={type} />}
      </Field>
      <Field label="Normal balance" htmlFor={`side-${p}`}>
        <Select id={`side-${p}`} name="normal_side" defaultValue={account?.normalSide ?? NORMAL_SIDE[type]} key={account ? "fixed" : type} disabled={used}>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </Select>
        {used && <input type="hidden" name="normal_side" value={account?.normalSide} />}
      </Field>
      <Field label="FS line" htmlFor={`fs-${p}`} error={e.fs_line}>
        <Select id={`fs-${p}`} name="fs_line" defaultValue={account?.fsLine ?? (pnl ? "operating_expenses" : "")} required>
          <option value="">Choose…</option>
          {Object.entries(FS_LINES).filter(([, l]) => (l.statement === "sci") === pnl).map(([k, l]) => <option key={k} value={k}>{l.label}</option>)}
        </Select>
      </Field>
      <Field label="BIR income tax line" htmlFor={`bir-${p}`} error={e.bir_line}>
        <Select id={`bir-${p}`} name="bir_line" defaultValue={account?.birLine ?? ""} disabled={!pnl}>
          <option value="">{pnl ? "Choose…" : "Not on the income tax return"}</option>
          {pnl && Object.entries(BIR_LINES).map(([k, l]) => <option key={k} value={k}>{l.label}</option>)}
        </Select>
      </Field>
      <Field label="Control role" htmlFor={`control-${p}`} error={e.control} hint={used ? "Has entries: fixed." : undefined}>
        <Select id={`control-${p}`} name="control" defaultValue={account?.control ?? ""} disabled={used}>
          <option value="">None</option>
          {Object.entries(CONTROLS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </Select>
        {used && <input type="hidden" name="control" value={account?.control ?? ""} />}
      </Field>
      <Field label="Order" htmlFor={`order-${p}`}>
        <Input id={`order-${p}`} name="sort_order" type="number" step={1} defaultValue={account?.sortOrder ?? 1000} className="text-end tabular-nums" />
      </Field>
      <div className="flex flex-wrap items-center gap-3 pb-1 sm:col-span-3 lg:col-span-4 lg:self-end">
        <label className="flex items-center gap-2 text-body-regular text-text-primary"><input type="checkbox" name="active" defaultChecked={account?.active ?? true} className="size-4" /> Active</label>
        <Button type="submit" size="sm" disabled={pending}>{pending ? "Saving…" : account ? "Save" : "Add account"}</Button>
        {account && !used && (
          <button
            type="button"
            disabled={deleting}
            onClick={async () => { setDeleting(true); setDel(await deleteAccountAction(clientId, account.id)); setDeleting(false); }}
            className="text-caption-1-regular text-text-error-primary hover:underline"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        )}
        {state.ok && <span className="text-body-regular text-text-secondary">{state.ok}</span>}
      </div>
      {(state.error || del.error) && <div className="sm:col-span-3 lg:col-span-6"><Notice tone="blocked">{state.error ?? del.error}</Notice></div>}
    </form>
  );
}

// ---------------------------------------------------------------------------
// Opening balances upload.
// ---------------------------------------------------------------------------
export function OpeningUpload({ clientId }: { clientId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, previewAction, previewing] = useActionState(previewOpeningAction.bind(null, clientId), {} as OpeningState);
  const [saved, saveAction, saving] = useActionState(saveOpeningAction.bind(null, clientId), {} as OpeningState);
  const c = saved.checked ?? preview.checked;
  return (
    <div className="space-y-4">
      <form action={previewAction} className="flex flex-wrap items-end gap-3">
        <Field label="Opening balances (.xlsx)" htmlFor="opening_file">
          <Input id="opening_file" name="file" type="file" accept=".xlsx" required onChange={(x) => setFile(x.target.files?.[0] ?? null)} className="py-1.5" />
        </Field>
        <Button type="submit" variant="secondary" disabled={previewing || !file}>{previewing ? "Reading…" : "Preview"}</Button>
      </form>
      {preview.error && <Notice tone="blocked">{preview.error}</Notice>}
      {c && !saved.ok && (
        <div className="space-y-2 text-body-regular">
          {c.errors.length > 0 && (
            <Notice tone="blocked"><ul className="list-disc space-y-0.5 ps-5">{c.errors.map((x, i) => <li key={i}>{x}</li>)}</ul></Notice>
          )}
          <dl className="grid gap-x-6 gap-y-1 text-text-secondary sm:grid-cols-2">
            <div className="flex justify-between gap-3"><dt>Accounts with a balance</dt><dd className="tabular-nums text-text-primary">{c.lines.length}</dd></div>
            <div className="flex justify-between gap-3"><dt>Total debits / credits</dt><dd className="tabular-nums text-text-primary">{formatAmount(c.totalDebit)} / {formatAmount(c.totalCredit)}</dd></div>
            <div className="flex justify-between gap-3"><dt>Receivables ({c.items.filter((i) => i.kind === "receivable").length})</dt><dd className="tabular-nums text-text-primary">{formatAmount(c.arItems)} of {formatAmount(c.arBalance)}</dd></div>
            <div className="flex justify-between gap-3"><dt>Payables ({c.items.filter((i) => i.kind === "payable").length})</dt><dd className="tabular-nums text-text-primary">{formatAmount(c.apItems)} of {formatAmount(c.apBalance)}</dd></div>
          </dl>
        </div>
      )}
      {preview.checked && preview.checked.errors.length === 0 && file && !saved.ok && (
        <form action={(fd) => { fd.set("file", file); return saveAction(fd); }}>
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save opening balances"}</Button>
        </form>
      )}
      {saved.error && <Notice tone="blocked">{saved.error}</Notice>}
      {saved.ok && <Notice tone="done">{saved.ok}</Notice>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Manual journal entry.
// ---------------------------------------------------------------------------
export function EntryForm({ clientId, accounts, minDate }: { clientId: string; accounts: LedgerAccount[]; minDate: string }) {
  const [state, action, pending] = useActionState(postEntryAction.bind(null, clientId), {} as FormState);
  const [rows, setRows] = useState(4);
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const e = state.fieldErrors ?? {};
  const totals = useMemo(() => {
    let dr = 0;
    let cr = 0;
    for (let i = 0; i < rows; i++) {
      dr += toCentavos(amounts[`debit_${i}`] ?? "") ?? 0;
      cr += toCentavos(amounts[`credit_${i}`] ?? "") ?? 0;
    }
    return { dr, cr };
  }, [amounts, rows]);
  const active = accounts.filter((a) => a.active);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="rows" value={rows} />
      <div className="grid gap-3 sm:grid-cols-[10rem_1fr_12rem]">
        <Field label="Date" htmlFor="date" error={e.date}><Input id="date" name="date" type="date" min={minDate} required /></Field>
        <Field label="Explanation" htmlFor="memo" error={e.memo}><Input id="memo" name="memo" required placeholder="e.g. Depreciation for January 2027" /></Field>
        <Field label="Reference" htmlFor="reference"><Input id="reference" name="reference" placeholder="JV-0001" /></Field>
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-[1.6fr_1fr_8rem_8rem]">
            <Field label={i === 0 ? "Account" : ""} htmlFor={`account_${i}`} error={e[`account_${i}`]}>
              <Select id={`account_${i}`} name={`account_${i}`} defaultValue="">
                <option value="">—</option>
                {active.map((a) => <option key={a.id} value={a.id}>{a.code} · {a.name}</option>)}
              </Select>
            </Field>
            <Field label={i === 0 ? "Line description" : ""} htmlFor={`description_${i}`}><Input id={`description_${i}`} name={`description_${i}`} /></Field>
            <Field label={i === 0 ? "Debit" : ""} htmlFor={`debit_${i}`} error={e[`debit_${i}`]}>
              <Input id={`debit_${i}`} name={`debit_${i}`} inputMode="decimal" className="text-end tabular-nums" onChange={(x) => setAmounts((s) => ({ ...s, [`debit_${i}`]: x.target.value }))} />
            </Field>
            <Field label={i === 0 ? "Credit" : ""} htmlFor={`credit_${i}`} error={e[`credit_${i}`]}>
              <Input id={`credit_${i}`} name={`credit_${i}`} inputMode="decimal" className="text-end tabular-nums" onChange={(x) => setAmounts((s) => ({ ...s, [`credit_${i}`]: x.target.value }))} />
            </Field>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm" onClick={() => setRows((r) => Math.min(r + 2, 100))}>Add lines</Button>
        <p className="text-body-regular tabular-nums text-text-secondary">
          Debits {formatAmount(totals.dr)} · Credits {formatAmount(totals.cr)}
          {totals.dr !== totals.cr && <span className="text-text-error-primary"> · Difference {formatAmount(totals.dr - totals.cr)}</span>}
        </p>
      </div>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
      <Button type="submit" disabled={pending || totals.dr === 0 || totals.dr !== totals.cr}>{pending ? "Posting…" : "Post entry"}</Button>
    </form>
  );
}

export function ReverseForm({ clientId, entryId, minDate }: { clientId: string; entryId: string; minDate: string }) {
  const [state, action, pending] = useActionState(reverseEntryAction.bind(null, clientId, entryId), {} as FormState);
  const [open, setOpen] = useState(false);
  if (state.ok) return <span className="text-caption-1-regular text-text-secondary">Reversed</span>;
  if (!open) return <button type="button" onClick={() => setOpen(true)} className="text-caption-1-regular text-text-secondary hover:underline">Reverse</button>;
  return (
    <form action={action} className="flex flex-wrap items-end gap-2">
      <Input name="date" type="date" min={minDate} defaultValue={minDate} required aria-label="Reversal date" className="w-40" />
      <Input name="reason" required placeholder="Reason" aria-label="Reason" className="w-56" />
      <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "…" : "Reverse"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}
