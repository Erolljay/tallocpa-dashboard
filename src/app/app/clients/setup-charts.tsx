"use client";

import { useActionState } from "react";
import { Button, Input, Select } from "@/components/ui";
import { setupMissingChartsAction } from "./actions";

/**
 * Owner's decision 2: every client keeps account titles, tax compliance only
 * included. Sets up the chart for every client that has none, each from the
 * template for its kind of taxpayer.
 */
export function SetupCharts({ missing, defaultMonth }: { missing: string[]; defaultMonth: string }) {
  const [state, run, pending] = useActionState(setupMissingChartsAction, {});
  if (state.ok && !state.error) return <p role="status" className="mb-4 text-body-regular text-status-lime-text">{state.ok}</p>;
  return (
    <div className="mb-4 space-y-3 rounded-2xl bg-status-yellow-background/50 px-4 py-3">
      <p className="text-body-regular text-text-primary">
        {missing.length} client{missing.length === 1 ? " has" : "s have"} no account titles yet, so {missing.length === 1 ? "its" : "their"} documents are not booked:{" "}
        <span className="text-text-secondary">{missing.slice(0, 6).join(", ")}{missing.length > 6 ? ` and ${missing.length - 6} more` : ""}</span>.
      </p>
      <form action={run} className="flex flex-wrap items-end gap-2">
        <label className="flex flex-col gap-1 text-caption-1-medium text-text-secondary" htmlFor="charts-start">
          Books start
          <Input id="charts-start" name="books_start" type="month" required defaultValue={defaultMonth} className="w-44" />
        </label>
        <label className="flex flex-col gap-1 text-caption-1-medium text-text-secondary" htmlFor="charts-rule">
          For each client
          <Select id="charts-rule" name="start_rule" defaultValue="same" className="w-auto">
            <option value="same">Start in this month</option>
            <option value="taxable_year">Start of its taxable year that includes this month (fiscal-year clients)</option>
          </Select>
        </label>
        <Button type="submit" size="sm" disabled={pending}>{pending ? "Setting up…" : "Set up account titles for all"}</Button>
      </form>
      {state.error && <p role="alert" className="text-body-regular text-text-error-primary">{state.error}</p>}
      {state.ok && <p role="status" className="text-body-regular text-status-lime-text">{state.ok}</p>}
    </div>
  );
}
