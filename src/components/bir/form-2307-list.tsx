/**
 * The list of a period's BIR 2307s (staff Books Reports and the client portal): one row
 * per certificate with its supplier, period, ATCs and figures, what to check, and a link
 * to view and print it; and the pickers (period, per quarter / month / transaction,
 * supplier) as a plain GET form.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { Button, Select } from "@/components/ui";
import { BY_2307, type By2307, type Form2307Data, type Period2307 } from "@/lib/books/form-2307";
import { formatAmount } from "@/lib/returns/money";

const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));
export const period2307Text = (f: Pick<Form2307Data, "periodFrom" | "periodTo">) => `${fmtDate(f.periodFrom)} – ${fmtDate(f.periodTo)}`;

export function Form2307Pickers({
  action,
  hidden = {},
  periods,
  period,
  by,
  suppliers,
  supplier,
  leading,
}: {
  action: string;
  hidden?: Record<string, string>;
  /** Choices for the period; omitted when the period comes from elsewhere (the Books month). */
  periods?: Period2307[];
  period: Period2307;
  by: By2307;
  suppliers: { key: string; name: string }[];
  supplier: string | null;
  /** Fields before the period (the portal's business picker). */
  leading?: ReactNode;
}) {
  const label = "flex min-w-40 flex-col gap-1.5 text-body-medium text-text-primary";
  return (
    <form className="flex flex-wrap items-end gap-3" action={action}>
      {Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      {leading}
      {periods && (
        <label className={label}>
          Period
          <Select name="period" defaultValue={period.value}>
            {periods.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </Select>
        </label>
      )}
      <label className={label}>
        Certificates
        <Select name="by" defaultValue={by}>
          {(Object.keys(BY_2307) as By2307[]).map((k) => <option key={k} value={k}>{BY_2307[k]}</option>)}
        </Select>
      </label>
      <label className={label}>
        Supplier
        <Select name="supplier" defaultValue={supplier ?? ""}>
          <option value="">All suppliers</option>
          {suppliers.map((s) => <option key={s.key} value={s.key}>{s.name}</option>)}
        </Select>
      </label>
      <Button type="submit" variant="secondary">Show</Button>
    </form>
  );
}

export function Form2307List({ forms, hrefFor, showWarnings = true }: { forms: Form2307Data[]; hrefFor: (f: Form2307Data) => string; showWarnings?: boolean }) {
  return (
    <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default text-body-regular">
      {forms.map((f) => (
        <li key={f.key} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-3">
          <div className="min-w-0">
            <Link href={hrefFor(f)} className="text-body-medium text-text-primary hover:underline">{f.payee.name}</Link>
            <p className="text-caption-1-regular text-text-tertiary">
              {period2307Text(f)} · {f.lines.map((l) => l.atc || "no ATC").join(", ")} · income payments {formatAmount(f.totals.total)} · tax withheld {formatAmount(f.totals.withheld)}
              {" · "}{f.invoices.length === 1 ? (f.invoices[0].reference ?? "1 invoice") : `${f.invoices.length} invoices`}
            </p>
            {showWarnings && f.warnings.length > 0 && <p className="text-caption-1-regular text-status-yellow-text">{f.warnings.join(" ")}</p>}
          </div>
          <Link href={hrefFor(f)} className="text-body-medium text-button-ghost-foreground hover:underline">View / print</Link>
        </li>
      ))}
    </ul>
  );
}
