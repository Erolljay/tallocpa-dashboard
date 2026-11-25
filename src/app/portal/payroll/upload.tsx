"use client";

import { useActionState, useState } from "react";
import { Badge, Button, Field, Input, Notice, Select } from "@/components/ui";
import { showMonth } from "@/lib/documents/labels";
import { PAY_PERIODS, type PayPeriod } from "@/lib/payroll/periods";
import { formatAmount, toCentavos } from "@/lib/returns/money";
import { previewPortalPayrollAction, submitPortalPayrollAction, type PortalPayrollState } from "./actions";

/** Download the month's register, fill it in, upload it: preview first, then send to the firm. */
export function PortalPayrollUpload({ clients, months }: { clients: { id: string; name: string }[]; months: string[] }) {
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [month, setMonth] = useState(months[0]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, previewAction, previewing] = useActionState(previewPortalPayrollAction, {} as PortalPayrollState);
  const [sent, sendAction, sending] = useActionState(submitPortalPayrollAction, {} as PortalPayrollState);
  const [period, setPeriod] = useState<PayPeriod>("month");
  const p = sent.preview ?? preview.preview;
  const withFields = (fd: FormData) => {
    fd.set("client_id", clientId);
    fd.set("month", month);
    fd.set("pay_period", period);
    if (file) fd.set("file", file);
    return fd;
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {clients.length > 1 && (
          <Field label="Business" htmlFor="pp_client">
            <Select id="pp_client" value={clientId} onChange={(e) => setClientId(e.target.value)}>{clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Select>
          </Field>
        )}
        <Field label="Payroll for the month of" htmlFor="pp_month">
          <Select id="pp_month" value={month} onChange={(e) => setMonth(e.target.value)}>{months.map((m) => <option key={m} value={m}>{showMonth(m)}</option>)}</Select>
        </Field>
        <Field label="Pay period" htmlFor="pp_period" hint="Paying twice a month? Send the 15th and the 30th separately.">
          <Select id="pp_period" value={period} onChange={(e) => setPeriod(e.target.value as PayPeriod)}>{Object.entries(PAY_PERIODS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</Select>
        </Field>
      </div>
      <p className="text-body-regular">
        <a href={`/portal/payroll/template?client=${clientId}&month=${month.slice(0, 7)}`} className="font-medium text-button-ghost-foreground underline">Download the {showMonth(month)} payroll register (.xlsx)</a>
        <span className="text-text-secondary"> — one row per employee per payday; leave blank anyone not paid.</span>
      </p>
      <form action={(fd) => previewAction(withFields(fd))} className="flex flex-wrap items-end gap-3">
        <Field label="Filled-in register" htmlFor="pp_file">
          <Input id="pp_file" type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="py-1.5" />
        </Field>
        <Button type="submit" variant="secondary" disabled={!file || previewing || file.size > 950_000}>{previewing ? "Reading…" : "Check the file"}</Button>
      </form>
      {file && file.size > 950_000 && <Notice tone="blocked">The file is over 1 MB. Delete unused rows or sheets and try again.</Notice>}
      {preview.error && <Notice tone="blocked">{preview.error}</Notice>}
      {p && (
        <div className="space-y-3">
          {p.errors.length > 0 && (
            <Notice tone="blocked">
              <ul className="list-disc space-y-0.5 pl-5">{p.errors.map((x, i) => <li key={i}>{x.line ? `Row ${x.line}: ` : ""}{x.message}</li>)}</ul>
            </Notice>
          )}
          <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default text-body-regular">
            {p.rows.map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-3 px-4 py-2">
                <span className="min-w-0 text-text-primary">{r.name} {r.isNew && <Badge tone="waiting">New</Badge>}</span>
                <span className="text-end tabular-nums text-text-secondary">Net {formatAmount(toCentavos(r.net) ?? 0)}<br /><span className="text-caption-1-regular">Gross {formatAmount(toCentavos(r.gross) ?? 0)}</span></span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {preview.preview && preview.preview.errors.length === 0 && !sent.ok && (
        <form action={(fd) => sendAction(withFields(fd))}>
          <Button type="submit" disabled={sending}>{sending ? "Sending…" : "Send to Tallo"}</Button>
        </form>
      )}
      {sent.error && <Notice tone="blocked">{sent.error}</Notice>}
      {sent.ok && <Notice tone="done">{sent.ok}</Notice>}
    </div>
  );
}
