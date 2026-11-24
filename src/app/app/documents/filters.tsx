"use client";

import { useState } from "react";
import { Button, Input, Select } from "@/components/ui";
import { PERIODS, type PeriodKey } from "./period";

/** Header client picker. It belongs to the filter form below (by `form` id) and applies on change. */
export function ClientSelect({ form, value, clients }: { form: string; value: string; clients: { id: string; name: string }[] }) {
  return (
    <div className="w-64 max-w-full">
      <label htmlFor="doc-client" className="sr-only">Client</label>
      <Select id="doc-client" name="client" form={form} defaultValue={value} onChange={(e) => e.currentTarget.form?.requestSubmit()}>
        <option value="">All clients</option>
        {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </Select>
    </div>
  );
}

/** Period filter: a preset applies at once; Custom shows a month range and an Apply button. */
export function PeriodFilter({ period, from, to }: { period: PeriodKey; from: string; to: string }) {
  const [custom, setCustom] = useState(period === "custom");
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="w-48">
        <label htmlFor="doc-period" className="mb-1.5 block text-sm font-medium text-ink-strong">Filter by period</label>
        <Select
          id="doc-period"
          name="period"
          defaultValue={period}
          onChange={(e) => {
            const isCustom = e.currentTarget.value === "custom";
            setCustom(isCustom);
            if (!isCustom) e.currentTarget.form?.requestSubmit();
          }}
        >
          {Object.entries(PERIODS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </Select>
      </div>
      {custom && (
        <>
          <div className="w-44">
            <label htmlFor="doc-from" className="mb-1.5 block text-sm font-medium text-ink-strong">From</label>
            <Input id="doc-from" name="from" type="month" defaultValue={from} required />
          </div>
          <div className="w-44">
            <label htmlFor="doc-to" className="mb-1.5 block text-sm font-medium text-ink-strong">To</label>
            <Input id="doc-to" name="to" type="month" defaultValue={to} required />
          </div>
          <Button type="submit" variant="secondary">Apply</Button>
        </>
      )}
    </div>
  );
}
