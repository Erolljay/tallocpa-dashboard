"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import type { ManualInput } from "@/lib/returns/types";
import { recomputeWorksheetAction, type WorksheetState } from "./actions";

/** The figures staff type in, and the Recompute button that saves the snapshot. */
export function WorksheetInputsForm({ filingId, inputs, values, canEdit }: { filingId: string; inputs: ManualInput[]; values: Record<string, string>; canEdit: boolean }) {
  const [state, run, pending] = useActionState(recomputeWorksheetAction.bind(null, filingId), {} as WorksheetState);
  const shown = state.values ?? values;
  return (
    <form action={run} className="space-y-4">
      {inputs.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {inputs.map((d) => {
            const id = `ws-${d.key}`;
            return (
              <Field key={d.key} label={`${d.label}${d.required ? "" : " (optional)"}`} hint={d.help} htmlFor={id}>
                {d.kind === "choice" ? (
                  <Select id={id} name={d.key} defaultValue={shown[d.key] ?? ""} required={d.required} disabled={!canEdit}>
                    <option value="">Choose…</option>
                    {(d.choices ?? []).map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    id={id}
                    name={d.key}
                    defaultValue={shown[d.key] ?? ""}
                    required={d.required}
                    disabled={!canEdit}
                    autoComplete="off"
                    inputMode={d.kind === "amount" ? "decimal" : d.kind === "count" ? "numeric" : undefined}
                    placeholder={d.kind === "amount" ? "0.00" : undefined}
                    className={d.kind === "amount" || d.kind === "count" ? "text-right tabular-nums" : undefined}
                  />
                )}
              </Field>
            );
          })}
        </div>
      )}
      {canEdit && (
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={pending}>{pending ? "Recomputing…" : "Recompute and Save"}</Button>
          {state.error && <Notice tone="blocked">{state.error}</Notice>}
          {state.ok && <Notice tone="done">{state.ok}</Notice>}
        </div>
      )}
    </form>
  );
}
