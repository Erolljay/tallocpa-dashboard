"use client";

import { useActionState, useState } from "react";
import { Button, Input, Notice, Select } from "@/components/ui";
import { crossesYear, moveTarget, MOVE_TARGETS, type MoveTarget } from "@/lib/documents/defer";
import { showMonth } from "@/lib/documents/labels";
import { moveSelectedAction, unapproveSelectedAction, type MoveState } from "./move-actions";

/**
 * The reviewer's or Owner's actions on the selected sales and purchases: move them to
 * the next month or quarter (reported there), and, on approved ones, take the approval
 * back. Each needs a reason, kept on the document and in the audit log.
 */
export function MoveBar({ clientId, selected, approved = false, fyeMonth = 12 }: { clientId: string; selected: { id: string; month: string }[]; approved?: boolean; fyeMonth?: number }) {
  const ids = selected.map((s) => s.id);
  const [to, setTo] = useState<MoveTarget>("next_quarter");
  const [moveState, move, moving] = useActionState((s: MoveState, f: FormData) => moveSelectedAction(clientId, ids, s, f), {} as MoveState);
  const [backState, back, backing] = useActionState((s: MoveState, f: FormData) => unapproveSelectedAction(clientId, ids, s, f), {} as MoveState);
  const state = moving || backing ? {} : { ...backState, ...moveState };
  const targets = [...new Set(selected.map((s) => moveTarget(s.month, to)))].sort();
  const crossing = selected.filter((s) => crossesYear(s.month, moveTarget(s.month, to), fyeMonth)).length;
  const busy = moving || backing;

  if (ids.length === 0 && !state.ok && !state.error) return null;
  return (
    <form className="mb-4 space-y-3 rounded-2xl border border-border-button-default bg-background-secondary-default p-3">
      {ids.length > 0 && (
        <>
          <div className="flex flex-wrap items-end gap-2">
            <div className="w-40">
              <label htmlFor="move-to" className="text-caption-1-regular text-text-tertiary">Move to</label>
              <Select id="move-to" name="to" value={to} onChange={(e) => setTo(e.target.value as MoveTarget)}>
                {(Object.keys(MOVE_TARGETS) as MoveTarget[]).map((k) => <option key={k} value={k}>{MOVE_TARGETS[k]}</option>)}
              </Select>
            </div>
            <div className="min-w-64 flex-1">
              <label htmlFor="move-reason" className="text-caption-1-regular text-text-tertiary">Reason (kept on the document)</label>
              <Input id="move-reason" name="reason" required placeholder="For example: client's request, invoice received late" />
            </div>
            <Button type="submit" size="sm" formAction={move} disabled={busy}>
              {moving ? "Moving…" : `Move ${ids.length} to ${targets.map(showMonth).join(", ")}`}
            </Button>
            {approved && (
              <Button type="submit" size="sm" variant="secondary" formAction={back} disabled={busy}>
                {backing ? "Taking back…" : `Back to unapproved (${ids.length})`}
              </Button>
            )}
          </div>
          <p className="text-caption-1-regular text-text-tertiary">
            A moved sale or purchase is reported in its new month (register, SLSP and return) and posted to the Books on the first day of that month; the register keeps its own date.
            {approved ? " Approved ones are taken back first: their Books entries are voided and they wait for approval in the new month." : " It waits for approval there."}
            {" "}Only the client&apos;s reviewer or the Owner can do this. A month whose return is filed cannot be moved out of or into.
          </p>
          {crossing > 0 && (
            <Notice tone="waiting">
              {crossing === ids.length ? "These move" : `${crossing} of these move`} into the next taxable year: income tax for both years changes, not only VAT. Make sure this is supportable before you move them.
            </Notice>
          )}
        </>
      )}
      {state.ok && <p role="status" className="text-body-regular text-status-lime-text">{state.ok}</p>}
      {state.error && <p role="alert" className="text-body-regular text-text-error-primary">{state.error}</p>}
    </form>
  );
}
