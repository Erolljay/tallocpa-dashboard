"use client";

import { useActionState, useMemo, useState } from "react";
import { RiCheckLine, RiErrorWarningLine } from "@remixicon/react";
import { Badge, Button, Input, Notice, Select } from "@/components/ui";
import { ScrollFade, useScrollFade } from "@/components/foundations/scroll-fade/scroll-fade";
import { PAY_PERIODS } from "@/lib/payroll/periods";
import type { EmployeeMatch } from "@/lib/payroll/read/match";
import { addTotals, checkTotals, totalsOf } from "@/lib/payroll/read/totals";
import type { ColumnTarget, DraftRow, PayrollDraft, PayrollRead } from "@/lib/payroll/read/types";
import { formatAmount, toCentavos } from "@/lib/returns/money";
import { cx } from "@/utils/cx";
import { applyColumnsAction, readPayrollAction, savePayrollReadAction, type PayrollReadState } from "./payroll-read-actions";

/** Below this a figure or column is highlighted for staff (as for other documents, fields.ts LOW_CONFIDENCE). */
const LOW = 0.8;

export interface ReadItem {
  id: string;
  name: string;
  kind: "earning" | "deduction" | "employer_contribution";
}

const KIND_LABEL = { earning: "Earnings", deduction: "Deductions", employer_contribution: "Employer" } as const;

/** "Read payroll" / "Read again". */
export function ReadPayrollButton({ documentId, again }: { documentId: string; again: boolean }) {
  const [state, action, pending] = useActionState(readPayrollAction.bind(null, documentId), {} as PayrollReadState);
  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <Button type="submit" variant={again ? "secondary" : "primary"} disabled={pending}>
        {pending ? "Reading…" : again ? "Read again" : "Read payroll"}
      </Button>
      {state.error && <p className="text-body-regular text-text-error-primary">{state.error}</p>}
      {state.ok && <p className="text-body-regular text-text-secondary">{state.ok}</p>}
    </form>
  );
}

/** The client's spreadsheet as read, beside the register (the heading row marked). */
export function SheetPreview({ grid, headerRow }: { grid: string[][]; headerRow: number }) {
  const fade = useScrollFade();
  const width = Math.max(1, ...grid.map((r) => r.length));
  return (
    <div className="relative">
      <div onScroll={fade.onScroll} className="max-h-[70vh] overflow-auto rounded-xl border border-border-table">
        <table className="min-w-full text-body-2-regular">
          <tbody>
            {grid.map((r, i) => (
              <tr key={i} className={cx("border-b border-separator-border", i + 1 === headerRow && "bg-background-secondary-default text-body-2-medium")}>
                <th scope="row" className="px-2 py-1 text-end text-caption-1-regular text-text-tertiary tabular-nums">{i + 1}</th>
                {Array.from({ length: width }, (_, c) => (
                  <td key={c} className="px-2 py-1 whitespace-nowrap text-text-primary">{r[c] ?? ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScrollFade progress={fade.progress} surfaceClassName="from-background-primary-default" />
    </div>
  );
}

/** What each column of the client's sheet holds; staff confirm or change, then apply (kept for this client). */
export function ColumnMapping({ documentId, read, options }: { documentId: string; read: PayrollRead; options: { value: ColumnTarget; label: string; group: string }[] }) {
  const [state, action, pending] = useActionState(applyColumnsAction.bind(null, documentId), {} as PayrollReadState);
  const sheet = read.sheet!;
  const groups = [...new Set(options.map((o) => o.group))];
  const open = sheet.columns.some((c) => c.target == null || (c.from === "suggested" && (c.confidence ?? 0) < LOW));
  return (
    <details open={open} className="rounded-2xl border border-border-button-default p-4">
      <summary className="cursor-pointer text-headline-medium text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
        Columns of the client&apos;s sheet{" "}
        {open ? <Badge tone="waiting">Check</Badge> : <Badge tone="done">Kept for this client</Badge>}
      </summary>
      <form action={action} className="mt-4 space-y-3">
        <label className="flex items-center gap-2 text-body-regular text-text-primary" htmlFor="header_row">
          Headings are on row
          <Input id="header_row" name="header_row" type="number" min={1} max={sheet.grid.length} defaultValue={sheet.headerRow} className="w-20 text-end tabular-nums" />
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          {sheet.columns.map((c) => {
            const unsure = c.target == null || (c.from === "suggested" && (c.confidence ?? 0) < LOW);
            return (
              <label key={c.index} htmlFor={`col-${c.index}`} className={cx("flex flex-col gap-1 rounded-xl p-2", unsure && "bg-status-yellow-background/50")}>
                <span className="text-body-2-medium text-text-primary">
                  {c.header}{" "}
                  <span className="text-caption-1-regular text-text-tertiary">
                    {c.from === "saved" ? "· saved" : c.from === "name" ? "· item name" : c.from === "staff" ? "· chosen" : c.target == null ? "· choose" : `· suggested${c.confidence != null ? ` ${Math.round(c.confidence * 100)}%` : ""}`}
                  </span>
                </span>
                <Select id={`col-${c.index}`} name={`col:${c.index}`} defaultValue={c.target ?? ""}>
                  <option value="">Choose…</option>
                  {groups.map((g) => (
                    <optgroup key={g} label={g}>
                      {options.filter((o) => o.group === g).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </optgroup>
                  ))}
                </Select>
              </label>
            );
          })}
        </div>
        <p className="text-caption-1-medium text-text-secondary">A column that is none of the client&apos;s payslip items stays “Not used”; add the item on the Payroll page first if it should be loaded.</p>
        <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Applying…" : "Apply and keep for this client"}</Button>
        {state.error && <p className="text-body-regular text-text-error-primary">{state.error}</p>}
        {state.ok && <p className="text-body-regular text-text-secondary">{state.ok}</p>}
      </form>
    </details>
  );
}

const MATCH_BADGE: Record<EmployeeMatch["status"], { tone: "done" | "waiting" | "blocked"; label: string }> = {
  number: { tone: "done", label: "Matched by No." },
  tin: { tone: "done", label: "Matched by TIN" },
  exact: { tone: "done", label: "Matched" },
  close: { tone: "waiting", label: "Check the name" },
  ambiguous: { tone: "waiting", label: "Several match" },
  none: { tone: "blocked", label: "Not on the list" },
};

const peso = (c: number) => formatAmount(c);

/**
 * The prefilled Tallo register: one row per row of the client's file, the
 * employee matched (or to pick), each payslip item's figure as read. Figures
 * read with low confidence are highlighted; figures not on the client's file are
 * blank, never filled in. Totals are checked against the client's own.
 */
export function PayrollReadReview({
  documentId,
  read,
  draft: initial,
  matches,
  employees,
  items,
  open,
  downloadHref,
}: {
  documentId: string;
  read: PayrollRead;
  draft: PayrollDraft;
  matches: Record<number, EmployeeMatch>;
  employees: { id: string; label: string }[];
  items: ReadItem[];
  open: boolean;
  downloadHref: string;
}) {
  const [rows, setRows] = useState<DraftRow[]>(initial.rows);
  const [edited, setEdited] = useState<Set<string>>(new Set());
  const [saved, saveAction, saving] = useActionState(savePayrollReadAction.bind(null, documentId, "save"), {} as PayrollReadState);
  const [loaded, loadAction, loading] = useActionState(savePayrollReadAction.bind(null, documentId, "load"), {} as PayrollReadState);
  const readByLine = useMemo(() => new Map(read.rows.map((r) => [r.line, r])), [read.rows]);
  const nameOf = useMemo(() => new Map(employees.map((e) => [e.id, e.label])), [employees]);
  const onFile = useMemo(() => new Set(read.rows.flatMap((r) => Object.keys(r.amounts))), [read.rows]);
  const itemList = items as Parameters<typeof totalsOf>[1];

  const update = (line: number, patch: Partial<DraftRow>) => setRows((rs) => rs.map((r) => (r.line === line ? { ...r, ...patch } : r)));
  const setAmount = (line: number, itemId: string, v: string) => {
    setRows((rs) => rs.map((r) => (r.line === line ? { ...r, amounts: { ...r.amounts, [itemId]: v } } : r)));
    setEdited((s) => new Set(s).add(`${line}:${itemId}`));
  };

  const live = rows.filter((r) => !r.skip);
  const ours = addTotals(live.map((r) => totalsOf(r.amounts, itemList)));
  const theirs = read.sourceTotals;
  const checks = checkTotals(ours, theirs ? { gross: theirs.gross?.value, deductions: theirs.deductions?.value, net: theirs.net?.value } : null);
  const needsPick = live.filter((r) => !r.employeeId && !r.newName.trim()).length;
  const lowCount = read.rows.reduce((n, r) => n + Object.entries(r.amounts).filter(([id, f]) => f.confidence != null && f.confidence < LOW && !edited.has(`${r.line}:${id}`)).length, 0);
  const missing = items.filter((i) => !onFile.has(i.id));
  const message = loaded.ok ?? saved.ok;
  const error = loaded.error ?? saved.error;

  return (
    <div className="space-y-4">
      {read.notes.map((n) => <Notice key={n}>{n}</Notice>)}
      <ul className="flex flex-wrap gap-2" aria-label="What to check">
        <li><Badge tone={needsPick ? "blocked" : "done"}>{needsPick ? `${needsPick} row${needsPick === 1 ? "" : "s"} need an employee` : "Every row has an employee"}</Badge></li>
        <li><Badge tone={lowCount ? "waiting" : "done"}>{lowCount ? `${lowCount} figure${lowCount === 1 ? "" : "s"} to check` : "No unsure figures"}</Badge></li>
        {missing.length > 0 && <li><Badge tone="waiting">Not on the client&apos;s file: {missing.map((i) => i.name).join(", ")}</Badge></li>}
        {read.otherColumns.length > 0 && <li><Badge tone="waiting">Not loaded (no payslip item): {read.otherColumns.join(", ")}</Badge></li>}
      </ul>

      <div className="overflow-x-auto rounded-xl border border-border-table">
        <table className="min-w-full text-body-2-regular">
          <thead className="bg-background-secondary-default text-body-2-medium text-text-secondary">
            <tr>
              <th scope="col" className="px-2 py-2 text-start">Row</th>
              <th scope="col" className="px-2 py-2 text-start">Employee</th>
              {items.map((i) => (
                <th key={i.id} scope="col" className="min-w-28 px-2 py-2 text-end">
                  <span className="block text-caption-1-regular text-text-tertiary">{KIND_LABEL[i.kind]}</span>
                  {i.name}
                </th>
              ))}
              <th scope="col" className="px-2 py-2 text-end">Gross</th>
              <th scope="col" className="px-2 py-2 text-end">Deductions</th>
              <th scope="col" className="px-2 py-2 text-end">Net</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const src = readByLine.get(r.line);
              const m = matches[r.line];
              const t = totalsOf(r.amounts, itemList);
              const choice = r.skip ? "skip" : r.employeeId ?? "new";
              const picked = m && r.employeeId !== m.employeeId;
              const badge = r.skip ? null : picked ? { tone: "done" as const, label: "Picked" } : m ? MATCH_BADGE[m.status] : null;
              const shownNet = src?.shown.net?.value != null ? toCentavos(src.shown.net.value) : null;
              const shownGross = src?.shown.gross?.value != null ? toCentavos(src.shown.gross.value) : null;
              return (
                <tr key={r.line} className={cx("border-t border-separator-border align-top", r.skip && "opacity-60")}>
                  <td className="px-2 py-2 text-caption-1-regular text-text-tertiary tabular-nums">{r.line}</td>
                  <td className="min-w-64 px-2 py-2">
                    <p className="text-body-2-medium text-text-primary">
                      <bdi>{r.sourceName}</bdi>
                      {src?.nameConfidence != null && src.nameConfidence < LOW && <span className="text-caption-1-regular text-status-yellow-text"> · name hard to read</span>}
                    </p>
                    {(src?.days || src?.hours) && <p className="text-caption-1-regular text-text-tertiary">{[src.days && `${src.days} days`, src.hours && `${src.hours} hours`].filter(Boolean).join(" · ")}</p>}
                    <div className="mt-1 flex flex-col gap-1">
                      <Select
                        aria-label={`Employee for row ${r.line}`}
                        value={choice}
                        onChange={(e) => {
                          const v = e.target.value;
                          update(r.line, v === "skip" ? { skip: true, employeeId: null } : v === "new" ? { skip: false, employeeId: null } : { skip: false, employeeId: v });
                        }}
                      >
                        {m && m.candidates.length > 0 && (
                          <optgroup label="Likely">
                            {m.candidates.map((c) => <option key={`c-${c.id}`} value={c.id}>{nameOf.get(c.id)}</option>)}
                          </optgroup>
                        )}
                        <optgroup label="Employees">
                          {employees.map((e) => <option key={e.id} value={e.id}>{e.label}</option>)}
                        </optgroup>
                        <optgroup label="Other">
                          <option value="new">New employee…</option>
                          <option value="skip">Skip this row</option>
                        </optgroup>
                      </Select>
                      {choice === "new" && (
                        <Input aria-label={`New employee's name for row ${r.line}, as Last, First Middle`} placeholder="Last, First Middle" value={r.newName} onChange={(e) => update(r.line, { newName: e.target.value })} />
                      )}
                      {badge && <span><Badge tone={badge.tone}>{badge.label}</Badge></span>}
                    </div>
                  </td>
                  {items.map((i) => {
                    const f = src?.amounts[i.id];
                    const unsure = f && f.confidence != null && f.confidence < LOW && !edited.has(`${r.line}:${i.id}`);
                    return (
                      <td key={i.id} className="px-2 py-2">
                        <Input
                          aria-label={`${i.name}, row ${r.line}`}
                          inputMode="decimal"
                          value={r.amounts[i.id] ?? ""}
                          placeholder={f ? "" : "—"}
                          title={f?.confidence != null ? `Read with ${Math.round(f.confidence * 100)}% confidence` : f ? undefined : "Not on the client's file"}
                          onChange={(e) => setAmount(r.line, i.id, e.target.value)}
                          aria-invalid={r.amounts[i.id] && toCentavos(r.amounts[i.id]) == null ? true : undefined}
                          className={cx("min-w-24 text-end tabular-nums", unsure && "bg-status-yellow-background/70 ring-2 ring-status-yellow-text")}
                        />
                      </td>
                    );
                  })}
                  <td className="px-2 py-2 text-end tabular-nums text-text-primary">
                    {peso(t.gross)}
                    {shownGross != null && shownGross !== t.gross && <span className="block text-caption-1-regular text-text-error-primary">file: {peso(shownGross)}</span>}
                  </td>
                  <td className="px-2 py-2 text-end tabular-nums text-text-primary">{peso(t.deductions)}</td>
                  <td className="px-2 py-2 text-end tabular-nums text-text-primary">
                    {peso(t.net)}
                    {shownNet != null && shownNet !== t.net && <span className="block text-caption-1-regular text-text-error-primary">file: {peso(shownNet)}</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <section aria-labelledby="totals-check" className="rounded-2xl border border-border-button-default p-4">
        <h3 id="totals-check" className="text-headline-medium text-text-primary">Totals check</h3>
        {theirs == null && <p className="mt-1 text-body-regular text-text-secondary">The client&apos;s file shows no totals to compare with.</p>}
        <dl className="mt-2 grid gap-2 sm:grid-cols-3">
          {checks.map((c) => (
            <div key={c.key} className="rounded-xl bg-background-secondary-default p-3">
              <dt className="text-body-2-medium text-text-secondary">{c.label}</dt>
              <dd className="text-headline-medium text-text-primary tabular-nums">{peso(c.ours)}</dd>
              {c.theirs != null && (
                <dd className={cx("flex items-center gap-1 text-caption-1-medium", c.difference === 0 ? "text-status-lime-text" : "text-text-error-primary")}>
                  {c.difference === 0 ? <RiCheckLine aria-hidden className="size-4" /> : <RiErrorWarningLine aria-hidden className="size-4" />}
                  Client&apos;s file: {peso(c.theirs)}{c.difference !== 0 && ` (off by ${peso(c.difference!)})`}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </section>

      <form className="space-y-3">
        <input type="hidden" name="draft" value={JSON.stringify({ rows })} />
        {open && (
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-body-regular text-text-primary" htmlFor="read_period">
              Pay period
              <Select id="read_period" name="pay_period" defaultValue="month" className="w-auto">
                {Object.entries(PAY_PERIODS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </Select>
            </label>
            <label className="flex items-center gap-2 text-body-regular text-text-primary">
              <input type="checkbox" name="add_new" className="size-4" /> Add new employees (their details are asked for later)
            </label>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {open && <Button type="submit" formAction={loadAction} disabled={loading || saving}>{loading ? "Loading…" : "Load into payroll"}</Button>}
          <Button type="submit" variant="secondary" formAction={saveAction} disabled={loading || saving}>{saving ? "Saving…" : "Save edits"}</Button>
          <a href={downloadHref} className="text-body-medium text-button-ghost-foreground underline">Download as Tallo register (.xlsx)</a>
        </div>
        <p className="text-caption-1-medium text-text-secondary">Loading checks the register like an uploaded one and saves the month; the taxable compensation and year-to-date figures are computed then. Save edits first to download them.</p>
        {error && <Notice tone="blocked">{error}</Notice>}
        {loaded.issues && <ul className="list-disc ps-5 text-body-regular text-text-error-primary">{loaded.issues.map((i) => <li key={i}>{i}</li>)}</ul>}
        {loaded.preview && loaded.preview.errors.length > 0 && (
          <ul className="list-disc ps-5 text-body-regular text-text-error-primary">
            {loaded.preview.errors.map((e, n) => <li key={n}>{e.line ? `Row ${e.line}: ` : ""}{e.message}</li>)}
          </ul>
        )}
        {message && <Notice tone="done">{message}</Notice>}
      </form>
    </div>
  );
}
