"use client";

import { PAY_PERIODS } from "@/lib/payroll/periods";

import { useActionState, useMemo, useState } from "react";
import { Badge, Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { computeEmployeeYear, enteredNet, suggestWithholding, type PriorAmounts } from "@/lib/payroll/compute";
import { CATEGORIES, CATEGORY_KEYS, ITEM_KINDS, categoryTotals, payTotals, sortItems, type ItemKind, type PayrollItem } from "@/lib/payroll/items";
import { EMPLOYMENT_STATUSES, SEPARATION_REASONS, type Employee, type PayAmounts } from "@/lib/payroll/types";
import { formatAmount, toCentavos } from "@/lib/returns/money";
import type { RegisterPreview } from "@/lib/payroll/apply";
import {
  deleteItemAction,
  deletePriorEmployerAction,
  release2316Action,
  savePayrollSettingsAction,
  savePriorEmployerAction,
  withdraw2316Action,
  postSubmissionAction,
  previewEmployeesAction,
  saveEmployeesAction,
  saveItemAction,
  type EmployeeImportState,
  previewRegisterAction,
  returnSubmissionAction,
  saveEmployeeAction,
  saveMonthAction,
  saveRegisterAction,
  type FormState,
  type RegisterState,
} from "./actions";

// ---------------------------------------------------------------------------
// Employee form (add, edit, separate).
// ---------------------------------------------------------------------------
export function EmployeeForm({ clientId, employee, payAccounts }: { clientId: string; employee: Employee | null; payAccounts?: { id: string; label: string; group: string }[] }) {
  const [state, action, pending] = useActionState(saveEmployeeAction.bind(null, clientId, employee?.id ?? null), {} as FormState);
  const [mwe, setMwe] = useState(employee?.isMwe ?? false);
  const e = state.fieldErrors ?? {};
  const v = employee;
  const tin = v?.tin ? `${v.tin}${v.tinBranch && v.tinBranch !== "0000" ? `-${v.tinBranch}` : ""}` : "";
  return (
    <form action={action} className="space-y-6">
      {payAccounts && payAccounts.length > 0 && (
        <Field label="Pay account (books)" htmlFor="pay_account_id" hint="Where this employee's pay is booked. Cost-of-services staff (Direct Labor) also take the direct contributions account.">
          <Select id="pay_account_id" name="pay_account_id" defaultValue={v?.payAccountId ?? ""} className="sm:max-w-md">
            <option value="">Salaries and Wages (default)</option>
            {[...new Set(payAccounts.map((a) => a.group))].map((g) => (
              <optgroup key={g} label={g}>{payAccounts.filter((a) => a.group === g).map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}</optgroup>
            ))}
          </Select>
        </Field>
      )}
      <fieldset className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <legend className="mb-2 text-body-medium text-text-primary">Name and TIN</legend>
        <Field label="Last name" htmlFor="last_name" error={e.last_name}><Input id="last_name" name="last_name" defaultValue={v?.lastName} required /></Field>
        <Field label="First name" htmlFor="first_name" error={e.first_name}><Input id="first_name" name="first_name" defaultValue={v?.firstName} required /></Field>
        <Field label="Middle name" htmlFor="middle_name" error={e.middle_name}><Input id="middle_name" name="middle_name" defaultValue={v?.middleName ?? ""} /></Field>
        <Field label="Employee No." htmlFor="employee_no" hint="Matches rows of the uploaded register." error={e.employee_no}><Input id="employee_no" name="employee_no" defaultValue={v?.employeeNo ?? ""} /></Field>
        <Field label="TIN" htmlFor="tin" hint="123-456-789; branch optional." error={e.tin}><Input id="tin" name="tin" inputMode="numeric" defaultValue={tin} /></Field>
        <Field label="Date of birth" htmlFor="birth_date" error={e.birth_date}><Input id="birth_date" name="birth_date" type="date" defaultValue={v?.birthDate ?? ""} /></Field>
        <Field label="Nationality" htmlFor="nationality" error={e.nationality}><Input id="nationality" name="nationality" defaultValue={v?.nationality ?? "FILIPINO"} /></Field>
      </fieldset>
      <fieldset className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <legend className="mb-2 text-body-medium text-text-primary">Address</legend>
        <div className="sm:col-span-2"><Field label="Address" htmlFor="address" error={e.address}><Input id="address" name="address" defaultValue={v?.address ?? ""} /></Field></div>
        <Field label="ZIP code" htmlFor="zip_code" error={e.zip_code}><Input id="zip_code" name="zip_code" inputMode="numeric" defaultValue={v?.zipCode ?? ""} /></Field>
        <Field label="Region of work" htmlFor="region" hint="e.g. NCR, VI. Needed for MWEs." error={e.region}><Input id="region" name="region" defaultValue={v?.region ?? ""} /></Field>
      </fieldset>
      <fieldset className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <legend className="mb-2 text-body-medium text-text-primary">Employment</legend>
        <Field label="Employment status" htmlFor="employment_status" error={e.employment_status}>
          <Select id="employment_status" name="employment_status" defaultValue={v?.employmentStatus ?? "R"}>
            {Object.entries(EMPLOYMENT_STATUSES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </Select>
        </Field>
        <Field label="Hired" htmlFor="hire_date" error={e.hire_date}><Input id="hire_date" name="hire_date" type="date" defaultValue={v?.hireDate ?? ""} /></Field>
        <label className="flex items-center gap-2 self-end pb-2 text-body-regular text-text-primary">
          <input type="checkbox" name="is_mwe" checked={mwe} onChange={(x) => setMwe(x.target.checked)} className="size-4" /> Minimum wage earner
        </label>
        {mwe && (
          <Field label="Daily minimum wage (₱)" htmlFor="mwe_daily_rate" error={e.mwe_daily_rate}>
            <Input id="mwe_daily_rate" name="mwe_daily_rate" type="number" min={0} step="0.01" className="text-end tabular-nums" defaultValue={v?.mweDailyRate != null ? (v.mweDailyRate / 100).toFixed(2) : ""} />
          </Field>
        )}
        {mwe && (
          <Field label="Monthly minimum wage (₱)" htmlFor="mwe_monthly_rate" hint="BIR 2316 item 10; blank if not set." error={e.mwe_monthly_rate}>
            <Input id="mwe_monthly_rate" name="mwe_monthly_rate" type="number" min={0} step="0.01" className="text-end tabular-nums" defaultValue={v?.mweMonthlyRate != null ? (v.mweMonthlyRate / 100).toFixed(2) : ""} />
          </Field>
        )}
        <label className="flex items-center gap-2 self-end pb-2 text-body-regular text-text-primary">
          <input type="checkbox" name="substituted_filing" defaultChecked={v?.substitutedFiling ?? true} className="size-4" /> Qualified for substituted filing
        </label>
        <label className="flex items-center gap-2 self-end pb-2 text-body-regular text-text-primary">
          <input type="checkbox" name="active" defaultChecked={v?.active ?? true} className="size-4" /> Active (on the monthly payroll)
        </label>
      </fieldset>
      <fieldset className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <legend className="mb-2 text-body-medium text-text-primary">Separation</legend>
        <Field label="Separation date" htmlFor="separation_date" hint="Leave blank while employed." error={e.separation_date}><Input id="separation_date" name="separation_date" type="date" defaultValue={v?.separationDate ?? ""} /></Field>
        <Field label="Reason" htmlFor="separation_reason" error={e.separation_reason}>
          <Select id="separation_reason" name="separation_reason" defaultValue={v?.separationReason ?? ""}>
            <option value="">Not separated</option>
            {Object.entries(SEPARATION_REASONS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </Select>
        </Field>
      </fieldset>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
      <Button type="submit" disabled={pending}>{pending ? "Saving…" : employee ? "Save changes" : "Add employee"}</Button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Monthly grid: one block per employee, one input per active payslip item.
// ---------------------------------------------------------------------------
export interface GridRow {
  employee: Employee;
  /** Item id → amount saved for the month. */
  lines: Record<string, number>;
  adjustment: number;
  note: string | null;
  /** Category totals for January … the month before (null where none). */
  earlier: (PayAmounts | null)[];
  /** Previous employer within the year: enters the year-end adjustment. */
  prior: PriorAmounts | null;
}

const toInput = (c: number | undefined) => (c ? (c / 100).toFixed(2) : "");
const KIND_TITLE: Record<ItemKind, string> = { earning: "Earnings", deduction: "Deductions", employer_contribution: "Employer contributions" };

export function MonthGrid({ clientId, month, locked, rows, items }: { clientId: string; month: string; locked: boolean; rows: GridRow[]; items: PayrollItem[] }) {
  const [state, action, pending] = useActionState(saveMonthAction.bind(null, clientId, month), {} as FormState);
  // Active items, plus inactive ones that already hold an amount this month.
  const used = new Set(rows.flatMap((r) => Object.keys(r.lines)));
  const shown = sortItems(items.filter((i) => i.active || used.has(i.id)));
  const [values, setValues] = useState<Record<string, string>>(() => {
    const v: Record<string, string> = {};
    for (const r of rows) {
      for (const i of shown) v[`${r.employee.id}:item:${i.id}`] = toInput(r.lines[i.id]);
      v[`${r.employee.id}:adjustment`] = toInput(r.adjustment);
    }
    return v;
  });
  const year = Number(month.slice(0, 4));
  const m = Number(month.slice(5, 7)) - 1;

  const computed = useMemo(
    () =>
      rows.map((r) => {
        const lines: [string, number][] = [];
        for (const i of shown) {
          const c = toCentavos(values[`${r.employee.id}:item:${i.id}`] ?? "");
          if (c) lines.push([i.id, c]);
        }
        const adj = toCentavos(values[`${r.employee.id}:adjustment`] ?? "") ?? 0;
        const a = categoryTotals(lines, items, adj);
        const any = lines.length > 0 || adj !== 0;
        const months = [...r.earlier.slice(0, m), any ? a : null, ...Array(11 - m).fill(null)];
        const yl = computeEmployeeYear(months, r.employee.isMwe, year);
        const s = suggestWithholding(r.employee, yl, m, year, r.prior);
        return { a, any, pay: payTotals(a), lines: yl[m], suggestion: s, differs: any && Math.abs(enteredNet(yl[m]) - s.net) > 100 };
      }),
    [rows, values, m, year, shown, items],
  );
  const totals = useMemo(() => {
    const t = { gross: 0, deductions: 0, net: 0, employer: 0, taxable: 0, withheld: 0, suggested: 0 };
    for (const c of computed) {
      if (!c.any) continue;
      t.gross += c.pay.gross;
      t.deductions += c.pay.deductions;
      t.net += c.pay.net;
      t.employer += c.a.sssEmployer + c.a.philhealthEmployer + c.a.pagibigEmployer + c.a.otherEmployer;
      t.taxable += c.lines.l22;
      t.withheld += enteredNet(c.lines);
      t.suggested += c.suggestion.net;
    }
    return t;
  }, [computed]);
  const e = state.fieldErrors ?? {};
  const set = (name: string, v: string) => setValues((cur) => ({ ...cur, [name]: v }));
  const amountInput = (name: string, label: string) => (
    <label key={name} className="block text-caption-1-regular text-text-secondary">
      {label}
      <Input name={name} inputMode="decimal" value={values[name] ?? ""} onChange={(x) => set(name, x.target.value)} aria-invalid={e[name] ? true : undefined} className="mt-1 text-end tabular-nums" />
      {e[name] && <span className="text-text-error-primary">{e[name]}</span>}
    </label>
  );

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="employee_ids" value={rows.map((r) => r.employee.id).join(",")} />
      {rows.map((r, idx) => {
        const c = computed[idx];
        return (
          <fieldset key={r.employee.id} disabled={locked} className="rounded-3xl border border-border-button-default bg-background-primary-default p-4 shadow-xs">
            <legend className="sr-only">{r.employee.lastName}, {r.employee.firstName}</legend>
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-medium text-text-primary">{r.employee.lastName}, {r.employee.firstName}{r.employee.middleName ? ` ${r.employee.middleName}` : ""}</p>
                <p className="text-caption-1-regular text-text-tertiary">{r.employee.employeeNo ? `No. ${r.employee.employeeNo}` : "No employee no."}{r.employee.tin ? ` · TIN ${r.employee.tin}` : " · no TIN"}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {r.employee.isMwe && <Badge tone="neutral">MWE</Badge>}
                {r.employee.needsDetails && <Badge tone="waiting">Needs details</Badge>}
                {c.differs && <Badge tone="waiting">Check tax</Badge>}
              </div>
            </div>
            {(["earning", "deduction", "employer_contribution"] as const).map((k) => {
              const list = shown.filter((i) => i.kind === k);
              if (!list.length) return null;
              return (
                <div key={k} className="mb-3">
                  <p className="mb-1 text-caption-1-medium text-text-tertiary uppercase">{KIND_TITLE[k]}</p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-4 lg:grid-cols-6">
                    {list.map((i) => amountInput(`${r.employee.id}:item:${i.id}`, `${i.name}${i.active ? "" : " (inactive)"}`))}
                  </div>
                </div>
              );
            })}
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-4">
              {amountInput(`${r.employee.id}:adjustment`, "Tax adjustment (±)")}
              <label className="col-span-1 block text-caption-1-regular text-text-secondary sm:col-span-3">
                Note
                <Input name={`${r.employee.id}:note`} defaultValue={r.note ?? ""} className="mt-1" />
              </label>
            </div>
            {c.any && (
              <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-separator-border pt-3 text-body-regular sm:grid-cols-3 lg:grid-cols-6">
                <div><dt className="text-caption-1-regular text-text-tertiary">Gross pay</dt><dd className="tabular-nums text-text-primary">{formatAmount(c.pay.gross)}</dd></div>
                <div><dt className="text-caption-1-regular text-text-tertiary">Deductions</dt><dd className="tabular-nums text-text-primary">{formatAmount(c.pay.deductions)}</dd></div>
                <div><dt className="text-caption-1-regular text-text-tertiary">Net pay</dt><dd className="tabular-nums font-medium text-text-primary">{formatAmount(c.pay.net)}</dd></div>
                <div><dt className="text-caption-1-regular text-text-tertiary">Taxable (item 22)</dt><dd className="tabular-nums text-text-primary">{formatAmount(c.lines.l22)}</dd></div>
                <div>
                  <dt className="text-caption-1-regular text-text-tertiary">{c.suggestion.method === "annualized" ? "Year-end tax" : "Suggested tax"}</dt>
                  <dd className="tabular-nums text-text-primary">{formatAmount(c.suggestion.net)}</dd>
                </div>
                <div><dt className="text-caption-1-regular text-text-tertiary">Withheld + adj.</dt><dd className={`tabular-nums ${c.differs ? "font-bold text-status-yellow-text" : "text-text-primary"}`}>{formatAmount(enteredNet(c.lines))}</dd></div>
                {c.suggestion.method === "annualized" && (
                  <p className="col-span-2 text-caption-1-regular text-text-secondary sm:col-span-3 lg:col-span-6">
                    Annual tax due {formatAmount(c.suggestion.annualTaxDue ?? 0)} less {formatAmount(c.suggestion.withheldBefore ?? 0)} withheld in earlier months.
                    {c.suggestion.net < 0 ? " Over-withheld: refund it, and enter the refund as a negative tax adjustment with no withholding tax this month." : ""}
                  </p>
                )}
              </dl>
            )}
          </fieldset>
        );
      })}

      <section className="rounded-2xl border border-border-button-default bg-background-secondary-default p-4">
        <h3 className="mb-2 font-medium text-text-primary">Totals</h3>
        <dl className="grid grid-cols-2 gap-2 text-body-regular sm:grid-cols-4 lg:grid-cols-7">
          {([["Gross pay", totals.gross], ["Deductions", totals.deductions], ["Net pay", totals.net], ["Employer contributions", totals.employer], ["Taxable (item 22)", totals.taxable], ["Withheld + adj.", totals.withheld], ["Suggested tax", totals.suggested]] as const).map(([l, v]) => (
            <div key={l}><dt className="text-caption-1-regular text-text-tertiary">{l}</dt><dd className="tabular-nums font-medium text-text-primary">{formatAmount(v)}</dd></div>
          ))}
        </dl>
      </section>

      {state.error && <Notice tone="blocked">{state.error}</Notice>}
      {state.ok && <Notice tone="done">{state.ok}</Notice>}
      {!locked && <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save month"}</Button>}
    </form>
  );
}

// ---------------------------------------------------------------------------
// Register upload (staff) and the review of a client's submission.
// ---------------------------------------------------------------------------
function PreviewTable({ preview }: { preview: RegisterPreview }) {
  return (
    <div className="space-y-3">
      {preview.errors.length > 0 && (
        <Notice tone="blocked">
          <p className="mb-1 font-medium">{preview.errors.length} problem{preview.errors.length === 1 ? "" : "s"} in the file:</p>
          <ul className="list-disc space-y-0.5 pl-5">
            {preview.errors.map((x, i) => <li key={i}>{x.line ? `Row ${x.line}: ` : ""}{x.message}</li>)}
          </ul>
        </Notice>
      )}
      {preview.rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-body-regular">
            <thead className="text-start text-body-medium text-text-tertiary">
              <tr><th className="text-start pb-2">Rows</th><th className="text-start pb-2">Employee</th><th className="pb-2 text-end">Gross pay</th><th className="pb-2 text-end">Deductions</th><th className="pb-2 text-end">Net pay</th></tr>
            </thead>
            <tbody>
              {preview.rows.map((r, i) => (
                <tr key={i} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                  <td className="py-2 tabular-nums text-text-secondary">{r.lines.join(", ")}</td>
                  <td className="py-2 text-text-primary">{r.name}{r.employeeNo ? <span className="text-text-tertiary"> · {r.employeeNo}</span> : null} {r.isNew && <Badge tone="waiting">New employee</Badge>}</td>
                  <td className="py-2 text-end tabular-nums">{formatAmount(toCentavos(r.gross) ?? 0)}</td>
                  <td className="py-2 text-end tabular-nums">{formatAmount(toCentavos(r.deductions) ?? 0)}</td>
                  <td className="py-2 text-end tabular-nums">{formatAmount(toCentavos(r.net) ?? 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function RegisterUpload({ clientId, month }: { clientId: string; month: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, previewAction, previewing] = useActionState(previewRegisterAction.bind(null, clientId, month), {} as RegisterState);
  const [saved, saveAction, saving] = useActionState(saveRegisterAction.bind(null, clientId, month), {} as RegisterState);
  const shown = saved.preview ?? preview.preview;
  const tooBig = file != null && file.size > 950_000;
  return (
    <div className="space-y-4">
      <form action={previewAction} className="flex flex-wrap items-end gap-3">
        <Field label="Filled-in register (.xlsx)" htmlFor="register_file">
          <Input id="register_file" name="file" type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" required onChange={(x) => setFile(x.target.files?.[0] ?? null)} className="py-1.5" />
        </Field>
        <Button type="submit" variant="secondary" disabled={previewing || !file || tooBig}>{previewing ? "Reading…" : "Preview"}</Button>
      </form>
      {tooBig && <Notice tone="blocked">The file is over 1 MB. Delete unused rows and sheets, or ask the Owner to raise the upload limit.</Notice>}
      {preview.error && <Notice tone="blocked">{preview.error}</Notice>}
      {shown && <PreviewTable preview={shown} />}
      {preview.preview && preview.preview.errors.length === 0 && file && !saved.ok && (
        <form
          action={(fd) => {
            fd.set("file", file);
            return saveAction(fd);
          }}
          className="flex flex-wrap items-center gap-4"
        >
          {preview.preview.newEmployees > 0 && (
            <label className="flex items-center gap-2 text-body-regular text-text-primary">
              <input type="checkbox" name="add_new" className="size-4" /> Add them as new employees ({preview.preview.newEmployees}); complete their details afterwards
            </label>
          )}
            <label className="flex items-center gap-2 text-body-regular text-text-primary" htmlFor="register_period">
            Pay period
            <Select id="register_period" name="pay_period" defaultValue="month" className="w-auto">
              {Object.entries(PAY_PERIODS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </Select>
          </label>
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save into the month"}</Button>
        </form>
      )}
      {saved.error && <Notice tone="blocked">{saved.error}</Notice>}
      {saved.ok && <Notice tone="done">{saved.ok}</Notice>}
    </div>
  );
}

export function SubmissionReview({ clientId, submissionId, preview }: { clientId: string; submissionId: string; preview: RegisterPreview }) {
  const [posted, postAction, posting] = useActionState(postSubmissionAction.bind(null, clientId, submissionId), {} as RegisterState);
  const [returned, returnAction, returning] = useActionState(returnSubmissionAction.bind(null, clientId, submissionId), {} as FormState);
  if (posted.ok) return <Notice tone="done">{posted.ok}</Notice>;
  if (returned.ok) return <Notice tone="done">{returned.ok}</Notice>;
  return (
    <div className="space-y-4">
      <PreviewTable preview={posted.preview ?? preview} />
      {preview.errors.length === 0 && (
        <form action={postAction} className="flex flex-wrap items-center gap-4">
          {preview.newEmployees > 0 && (
            <label className="flex items-center gap-2 text-body-regular text-text-primary">
              <input type="checkbox" name="add_new" className="size-4" /> Add {preview.newEmployees} new employee{preview.newEmployees === 1 ? "" : "s"}
            </label>
          )}
          <Button type="submit" disabled={posting}>{posting ? "Posting…" : "Post into the month"}</Button>
        </form>
      )}
      {posted.error && <Notice tone="blocked">{posted.error}</Notice>}
      <form action={returnAction} className="space-y-2">
        <Field label="Or return it to the client" htmlFor={`reason-${submissionId}`} error={returned.error}>
          <Textarea id={`reason-${submissionId}`} name="reason" rows={2} placeholder="What needs fixing" />
        </Field>
        <Button type="submit" variant="secondary" size="sm" disabled={returning}>{returning ? "Returning…" : "Return"}</Button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Payslip items (setup).
// ---------------------------------------------------------------------------
export function ItemForm({ clientId, item, used }: { clientId: string; item: PayrollItem | null; used: boolean }) {
  const [state, action, pending] = useActionState(saveItemAction.bind(null, clientId, item?.id ?? null), {} as FormState);
  const [del, delAction, deleting] = useActionState(deleteItemAction.bind(null, clientId, item?.id ?? ""), {} as FormState);
  const [category, setCategory] = useState<string>(item?.category ?? "basic");
  const e = state.fieldErrors ?? {};
  const p = item?.id ?? "new";
  if (del.ok) return <p className="text-body-regular text-text-secondary">Deleted.</p>;
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-[1fr_1.4fr_6rem_auto] sm:items-end">
      <Field label="Name (column header)" htmlFor={`name-${p}`} error={e.name}>
        <Input id={`name-${p}`} name="name" defaultValue={item?.name ?? ""} required />
      </Field>
      <Field label="BIR category" htmlFor={`cat-${p}`} error={e.category} hint={used ? "Used on the payroll: the category is fixed." : CATEGORIES[category as keyof typeof CATEGORIES]?.help}>
        <Select id={`cat-${p}`} name="category" value={category} onChange={(x) => setCategory(x.target.value)} disabled={used}>
          {(["earning", "deduction", "employer_contribution"] as const).map((k) => (
            <optgroup key={k} label={ITEM_KINDS[k]}>
              {CATEGORY_KEYS.filter((c) => CATEGORIES[c].kind === k).map((c) => <option key={c} value={c}>{CATEGORIES[c].label}</option>)}
            </optgroup>
          ))}
        </Select>
        {used && <input type="hidden" name="category" value={category} />}
      </Field>
      <Field label="Order" htmlFor={`order-${p}`}>
        <Input id={`order-${p}`} name="sort_order" type="number" step={1} defaultValue={item?.sortOrder ?? 100} className="text-end tabular-nums" />
      </Field>
      <div className="flex flex-wrap items-center gap-3 pb-1">
        <label className="flex items-center gap-2 text-body-regular text-text-primary"><input type="checkbox" name="active" defaultChecked={item?.active ?? true} className="size-4" /> Active</label>
        <Button type="submit" size="sm" disabled={pending}>{pending ? "Saving…" : item ? "Save" : "Add item"}</Button>
        {item && !used && (
          <button type="submit" formAction={delAction} disabled={deleting} className="text-caption-1-regular text-text-error-primary hover:underline">{deleting ? "Deleting…" : "Delete"}</button>
        )}
      </div>
      {(state.error || del.error) && <div className="sm:col-span-4"><Notice tone="blocked">{state.error ?? del.error}</Notice></div>}
      {state.ok && !item && <div className="sm:col-span-4"><Notice tone="done">Added.</Notice></div>}
    </form>
  );
}

// ---------------------------------------------------------------------------
// Employee master upload.
// ---------------------------------------------------------------------------
export function EmployeeUpload({ clientId }: { clientId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, previewAction, previewing] = useActionState(previewEmployeesAction.bind(null, clientId), {} as EmployeeImportState);
  const [saved, saveAction, saving] = useActionState(saveEmployeesAction.bind(null, clientId), {} as EmployeeImportState);
  const c = saved.checked ?? preview.checked;
  return (
    <div className="space-y-4">
      <form action={previewAction} className="flex flex-wrap items-end gap-3">
        <Field label="Employee master (.xlsx)" htmlFor="employee_file">
          <Input id="employee_file" name="file" type="file" accept=".xlsx" required onChange={(x) => setFile(x.target.files?.[0] ?? null)} className="py-1.5" />
        </Field>
        <Button type="submit" variant="secondary" disabled={previewing || !file}>{previewing ? "Reading…" : "Preview"}</Button>
      </form>
      {preview.error && <Notice tone="blocked">{preview.error}</Notice>}
      {c && (
        <div className="space-y-2 text-body-regular">
          {c.errors.length > 0 && (
            <Notice tone="blocked">
              <ul className="list-disc space-y-0.5 pl-5">{c.errors.map((x, i) => <li key={i}>Row {x.line} ({c.names[x.line]}): {x.message}</li>)}</ul>
            </Notice>
          )}
          <p className="text-text-secondary">{c.creates.length} new: {c.creates.map((x) => c.names[x.line]).join("; ") || "none"}.</p>
          <p className="text-text-secondary">{c.updates.length} to update: {c.updates.map((x) => c.names[x.line]).join("; ") || "none"}.</p>
        </div>
      )}
      {preview.checked && preview.checked.errors.length === 0 && file && !saved.ok && (
        <form action={(fd) => { fd.set("file", file); return saveAction(fd); }}>
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save employees"}</Button>
        </form>
      )}
      {saved.error && <Notice tone="blocked">{saved.error}</Notice>}
      {saved.ok && <Notice tone="done">{saved.ok}</Notice>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// BIR 2316: signatory, previous employer, release to the portal.
// ---------------------------------------------------------------------------
export function PayrollSettingsForm({ clientId, settings }: { clientId: string; settings: { employerZipCode: string | null; signatoryName: string | null; signatoryTitle: string | null } }) {
  const [state, action, pending] = useActionState(savePayrollSettingsAction.bind(null, clientId), {} as FormState);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-[1.4fr_1.2fr_7rem_auto] sm:items-end">
      <Field label="Authorized representative" htmlFor="signatory_name" hint="Signs items 53 and 55 for the employer." error={e.signatory_name}>
        <Input id="signatory_name" name="signatory_name" defaultValue={settings.signatoryName ?? ""} />
      </Field>
      <Field label="Title" htmlFor="signatory_title" hint="e.g. HR Manager, Treasurer." error={e.signatory_title}>
        <Input id="signatory_title" name="signatory_title" defaultValue={settings.signatoryTitle ?? ""} />
      </Field>
      <Field label="Employer ZIP" htmlFor="employer_zip_code" hint="Item 14A." error={e.employer_zip_code}>
        <Input id="employer_zip_code" name="employer_zip_code" inputMode="numeric" defaultValue={settings.employerZipCode ?? ""} />
      </Field>
      <div className="pb-1"><Button type="submit" size="sm" disabled={pending}>{pending ? "Saving…" : "Save"}</Button></div>
      {state.error && <div className="sm:col-span-4"><Notice tone="blocked">{state.error}</Notice></div>}
      {state.ok && <div className="sm:col-span-4"><Notice tone="done">{state.ok}</Notice></div>}
    </form>
  );
}

export interface PriorEmployerValues {
  tin: string | null;
  name: string;
  address: string | null;
  zipCode: string | null;
  taxable: number;
  nonTaxable: number;
  withheld: number;
}

export function PriorEmployerForm({ clientId, employeeId, year, prior }: { clientId: string; employeeId: string; year: number; prior: PriorEmployerValues | null }) {
  const [state, action, pending] = useActionState(savePriorEmployerAction.bind(null, clientId, employeeId, year), {} as FormState);
  const [del, delAction, deleting] = useActionState(deletePriorEmployerAction.bind(null, clientId, employeeId, year), {} as FormState);
  const e = state.fieldErrors ?? {};
  const money = (c: number | undefined) => (c ? (c / 100).toFixed(2) : "");
  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Employer's name (17)" htmlFor="prior_name" error={e.name}><Input id="prior_name" name="name" defaultValue={prior?.name ?? ""} required /></Field>
        <Field label="TIN (16)" htmlFor="prior_tin" hint="123-456-789; branch optional." error={e.tin}><Input id="prior_tin" name="tin" inputMode="numeric" defaultValue={prior?.tin ?? ""} /></Field>
        <Field label="Registered address (18)" htmlFor="prior_address" error={e.address}><Input id="prior_address" name="address" defaultValue={prior?.address ?? ""} /></Field>
        <Field label="ZIP (18A)" htmlFor="prior_zip" error={e.zip_code}><Input id="prior_zip" name="zip_code" inputMode="numeric" defaultValue={prior?.zipCode ?? ""} /></Field>
        <Field label="Taxable compensation (₱)" htmlFor="prior_taxable" hint="Their 2316 item 21; goes to item 22." error={e.taxable_compensation}>
          <Input id="prior_taxable" name="taxable_compensation" type="number" min={0} step="0.01" className="text-end tabular-nums" defaultValue={money(prior?.taxable)} />
        </Field>
        <Field label="Non-taxable compensation (₱)" htmlFor="prior_nontaxable" hint="Their 2316 item 20." error={e.non_taxable_compensation}>
          <Input id="prior_nontaxable" name="non_taxable_compensation" type="number" min={0} step="0.01" className="text-end tabular-nums" defaultValue={money(prior?.nonTaxable)} />
        </Field>
        <Field label="Tax withheld (₱)" htmlFor="prior_withheld" hint="Their 2316 item 26; goes to item 25B." error={e.tax_withheld}>
          <Input id="prior_withheld" name="tax_withheld" type="number" min={0} step="0.01" className="text-end tabular-nums" defaultValue={money(prior?.withheld)} />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="sm" disabled={pending}>{pending ? "Saving…" : "Save previous employer"}</Button>
        {prior && !del.ok && (
          <button type="submit" formAction={delAction} formNoValidate disabled={deleting} className="text-caption-1-regular text-text-error-primary hover:underline">{deleting ? "Removing…" : "Remove"}</button>
        )}
      </div>
      {(state.error || del.error) && <Notice tone="blocked">{state.error ?? del.error}</Notice>}
      {(state.ok || del.ok) && <Notice tone="done">{state.ok ?? del.ok}</Notice>}
    </form>
  );
}

export function Release2316Form({ clientId, year, released }: { clientId: string; year: number; released: boolean }) {
  const [state, action, pending] = useActionState((released ? withdraw2316Action : release2316Action).bind(null, clientId, year), {} as FormState);
  return (
    <form action={action} className="space-y-2">
      <Button type="submit" size="sm" variant={released ? "secondary" : "primary"} disabled={pending}>
        {pending ? "Saving…" : released ? "Withdraw from the portal" : "Release to the client's portal"}
      </Button>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}
