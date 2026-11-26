"use client";

import { RiLockLine, RiLockUnlockLine, RiMailSendLine } from "@remixicon/react";
import { useActionState, useId, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/base/modal/modal";
import { Textarea } from "@/components/base/textarea/textarea";
import type { LockAction } from "@/lib/lock/month-lock";
import { decideUnlockAction, lockMonthAction, requestLockAction, requestUnlockAction, type LockState } from "./lock-actions";

function Message({ state }: { state: LockState }) {
  if (state.error) return <p role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</p>;
  if (state.ok) return <p role="status" className="text-caption-1-regular text-text-tertiary">{state.ok}</p>;
  return null;
}

/** The viewer's action on one month: a button, or a button that opens a dialog. */
export function LockControl({ clientId, month, monthLabel, action, label, filed, request }: {
  clientId: string;
  month: string;
  /** "October 2026". */
  monthLabel: string;
  action: LockAction;
  label: string;
  /** The month was locked by a filed return: unlocking flags it for an amended return. */
  filed: boolean;
  /** The pending unlock request, for the decision. */
  request?: { reason: string | null; by: string | null } | null;
}) {
  switch (action.kind) {
    case "request_lock":
      return <RequestLock clientId={clientId} month={month} label={label} disabled={action.disabled} />;
    case "lock":
      return <LockMonth clientId={clientId} month={month} label={label} />;
    case "request_unlock":
    case "unlock":
      return <UnlockDialog clientId={clientId} month={month} monthLabel={monthLabel} label={label} owner={action.kind === "unlock"} filed={filed} />;
    case "decide":
      return <DecideUnlock requestId={action.requestId} clientId={clientId} monthLabel={monthLabel} reason={request?.reason ?? null} by={request?.by ?? null} trigger={label} filed={filed} />;
  }
}

function RequestLock({ clientId, month, label, disabled }: { clientId: string; month: string; label: string; disabled: string | null }) {
  const [state, run, pending] = useActionState(requestLockAction.bind(null, clientId, month), {} as LockState);
  const hint = useId();
  return (
    <form action={run} className="flex flex-col items-start gap-1">
      <Button type="submit" size="small" variant="secondary" leadingIcon={RiMailSendLine} disabled={pending || disabled != null} aria-describedby={disabled ? hint : undefined}>
        {label}
      </Button>
      {disabled && <p id={hint} className="text-caption-1-regular text-text-tertiary">{disabled}</p>}
      <Message state={state} />
    </form>
  );
}

function LockMonth({ clientId, month, label }: { clientId: string; month: string; label: string }) {
  const [state, run, pending] = useActionState(lockMonthAction.bind(null, clientId, month), {} as LockState);
  return (
    <form action={run} className="flex flex-col items-start gap-1">
      <Button type="submit" size="small" leadingIcon={RiLockLine} disabled={pending}>{label}</Button>
      <Message state={state} />
    </form>
  );
}

function UnlockDialog({ clientId, month, monthLabel, label, owner, filed }: { clientId: string; month: string; monthLabel: string; label: string; owner: boolean; filed: boolean }) {
  const [open, setOpen] = useState(false);
  const formId = useId();
  const [state, run, pending] = useActionState(async (prev: LockState, form: FormData) => {
    const r = await requestUnlockAction(clientId, month, prev, form);
    if (r.ok) setOpen(false);
    return r;
  }, {} as LockState);
  return (
    <div className="flex flex-col items-start gap-1">
      <Button size="small" variant="secondary" leadingIcon={RiLockUnlockLine} onClick={() => setOpen(true)}>{label}</Button>
      {!open && <Message state={state} />}
      <Modal isOpen={open} onOpenChange={setOpen} size="sm">
        <ModalHeader
          title={owner ? `Unlock ${monthLabel}` : `Ask to unlock ${monthLabel}`}
          description={owner ? "The month opens at once so the books can be changed. Lock it again when done." : "The Owner or the acting approver decides. The month stays locked until then."}
        />
        <ModalBody>
          <form id={formId} action={run} className="flex flex-col gap-3">
            <Textarea name="reason" label={owner ? "Note" : "Reason"} hint="What has to change in the books, and why." isRequired rows={3} autoFocus />
            {filed && <p className="text-caption-1-regular text-text-tertiary">A return for this month was filed: unlocking flags it for an amended return.</p>}
            {state.error && <p role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</p>}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" form={formId} disabled={pending}>{owner ? "Unlock" : "Send the request"}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

/** Approve or reject an unlock request (the Owner or the acting approver). Rejecting needs a note. */
export function DecideUnlock({ requestId, clientId, monthLabel, reason, by, trigger = "Unlock…", filed = false, inline = false }: {
  requestId: string;
  clientId: string | null;
  monthLabel: string;
  reason: string | null;
  by: string | null;
  trigger?: string;
  filed?: boolean;
  /** Approve and Reject buttons in place of one button that opens the dialog (Home). */
  inline?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [decision, setDecision] = useState<"approve" | "reject">("approve");
  const formId = useId();
  const [state, run, pending] = useActionState(async (prev: LockState, form: FormData) => {
    const r = await decideUnlockAction(requestId, clientId, prev, form);
    if (r.ok) setOpen(false);
    return r;
  }, {} as LockState);
  const openWith = (d: "approve" | "reject") => {
    setDecision(d);
    setOpen(true);
  };
  return (
    <div className="flex flex-col items-start gap-1">
      {inline ? (
        <div className="flex gap-2">
          <Button size="small" leadingIcon={RiLockUnlockLine} onClick={() => openWith("approve")}>Approve</Button>
          <Button size="small" variant="secondary" onClick={() => openWith("reject")}>Reject</Button>
        </div>
      ) : (
        <Button size="small" variant="secondary" leadingIcon={RiLockUnlockLine} onClick={() => openWith("approve")}>{trigger}</Button>
      )}
      {!open && <Message state={state} />}
      <Modal isOpen={open} onOpenChange={setOpen} size="sm">
        <ModalHeader title={`Unlock ${monthLabel}?`} description={by ? `${by} asked to unlock it.` : "An unlock was requested."} />
        <ModalBody>
          <form id={formId} action={run} className="flex flex-col gap-3">
            <input type="hidden" name="decision" value={decision} />
            {reason && (
              <div className="rounded-xl bg-background-secondary-default px-3 py-2">
                <p className="text-caption-1-regular text-text-tertiary">Reason</p>
                <p className="text-body-regular text-text-primary">{reason}</p>
              </div>
            )}
            {filed && <p className="text-caption-1-regular text-text-tertiary">A return for this month was filed: unlocking flags it for an amended return.</p>}
            <Textarea
              name="note"
              label={decision === "reject" ? "Why it stays locked" : "Note (optional)"}
              isRequired={decision === "reject"}
              rows={3}
            />
            {state.error && <p role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</p>}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          {decision === "approve" ? (
            <>
              <Button variant="secondary" onClick={() => setDecision("reject")}>Reject instead</Button>
              <Button type="submit" form={formId} disabled={pending}>Approve and unlock</Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={() => setDecision("approve")}>Approve instead</Button>
              <Button type="submit" form={formId} variant="danger" disabled={pending}>Reject</Button>
            </>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
}
