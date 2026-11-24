"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { reviewDocumentAction, runOcrAction, type DocActionState } from "@/lib/documents/actions";
import type { Issue } from "@/lib/ocr/checks";
import { LOW_CONFIDENCE, OCR_DOC_TYPES, OCR_FIELDS, PAYMENT_TERMS, type OcrConfidence, type OcrFields } from "@/lib/ocr/fields";
import { approveDocumentAction } from "./actions";

const typeLabel: Record<string, string> = {
  sales_invoice: "Sales invoice / OR",
  purchase_receipt: "Purchase / expense receipt",
  bir_2307: "BIR 2307",
  cor: "BIR COR",
  other: "Other",
};

/** The parties directory's entry for the document's TIN (src/lib/parties/resolve.ts). */
export interface DirectoryParty {
  partyId: string;
  name: string | null;
  tin: string | null;
  address: string | null;
  verified: boolean;
  warning: string | null;
}

/**
 * Booking a bookkeeping client's document (spec §3.6): the account title it goes
 * to, prefilled from the client's history with the party, then the party's
 * firm-wide preset, then the default for the document type.
 */
export interface Booking {
  accounts: { id: string; label: string; group: string }[];
  accountId: string | null;
  /** Where the default came from, for the hint. */
  source: string;
  /** The document's journal entry, if any. */
  entry: { status: "suggested" | "posted" | "reversed" } | null;
  /** Whether cash / charge applies (sales and purchases). */
  terms: boolean;
  booksHref: string;
}

/** The figures beside the image: low-confidence fields highlighted, check warnings inline. */
export function ReviewForm(props: { documentId: string; mode: "approve" | "edit"; fields: OcrFields; confidence: OcrConfidence; issues: Issue[]; canAct: boolean; canRead: boolean; model: string | null; directory?: DirectoryParty | null; booking?: Booking | null }) {
  const [state, approve, pending] = useActionState(approveDocumentAction.bind(null, props.documentId, props.mode), {} as DocActionState);
  const [retState, ret, retPending] = useActionState(reviewDocumentAction.bind(null, props.documentId, "return"), {} as DocActionState);
  const [readState, read, readPending] = useActionState(async () => runOcrAction(props.documentId), {} as DocActionState);
  const [returning, setReturning] = useState(false);
  const issueFor = (k: string) => props.issues.filter((i) => i.field === k).map((i) => i.message).join(" ");
  const lowCount = Object.values(props.confidence).filter((c) => c < LOW_CONFIDENCE).length;
  const formRef = useRef<HTMLFormElement>(null);
  const [usedDirectory, setUsedDirectory] = useState(false);
  const dir = props.directory;
  /** Copies the directory's registered name, TIN and address into the party fields. */
  const applyDirectory = () => {
    if (!formRef.current || !dir) return;
    for (const [k, v] of [["party_name", dir.name], ["party_tin", dir.tin], ["party_address", dir.address]] as const) {
      const el = formRef.current.elements.namedItem(k);
      if (el instanceof HTMLInputElement && v) el.value = v;
    }
    setUsedDirectory(true);
  };

  return (
    <div className="space-y-4">
      <form ref={formRef} action={approve} className="space-y-3 rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-headline-semibold text-text-primary">Figures</h2>
          <p className="text-caption-1-regular text-text-tertiary">{lowCount ? `${lowCount} field(s) OCR was unsure of are highlighted.` : props.model ? `Read by ${props.model}.` : ""}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {OCR_FIELDS.map((f) => {
            const conf = props.confidence[f.key];
            const low = conf != null && conf < LOW_CONFIDENCE;
            const issue = issueFor(f.key);
            const id = `f-${f.key}`;
            const wide = f.key === "party_name" || f.key === "party_address";
            return (
              <div key={f.key} className={`${wide ? "sm:col-span-2" : ""} ${low ? "rounded-lg bg-status-yellow-background p-2" : ""}`}>
                <Field label={`${f.label}${low ? ` · ${Math.round((conf ?? 0) * 100)}% sure` : ""}`} htmlFor={id} error={issue || undefined}>
                  {f.kind === "doc_type" ? (
                    <Select id={id} name={f.key} defaultValue={props.fields[f.key] ?? ""} disabled={!props.canAct}>
                      <option value="">—</option>
                      {OCR_DOC_TYPES.map((t) => <option key={t} value={t}>{typeLabel[t]}</option>)}
                    </Select>
                  ) : f.kind === "terms" ? (
                    <Select id={id} name={f.key} defaultValue={props.fields[f.key] ?? ""} disabled={!props.canAct}>
                      <option value="">Not stated (cash)</option>
                      {Object.entries(PAYMENT_TERMS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                    </Select>
                  ) : (
                    <Input
                      id={id}
                      name={f.key}
                      type={f.kind === "date" ? "date" : "text"}
                      inputMode={f.kind === "amount" ? "decimal" : undefined}
                      defaultValue={props.fields[f.key] ?? ""}
                      disabled={!props.canAct}
                      className={f.kind === "amount" ? "text-end tabular-nums" : undefined}
                    />
                  )}
                </Field>
              </div>
            );
          })}
        </div>
        {dir && (
          <div className={`rounded-xl p-3 text-body-regular ${dir.warning && !usedDirectory ? "bg-status-yellow-background text-status-yellow-text" : "bg-background-secondary-default text-text-primary"}`}>
            <p>
              <Link href={`/app/parties/${dir.partyId}`} className="font-medium hover:underline">{dir.name}</Link>
              {dir.verified ? " (verified)" : ""} · {dir.tin}{dir.address ? ` · ${dir.address}` : ""}
            </p>
            {dir.warning && !usedDirectory && <p className="mt-1">{dir.warning}</p>}
            {props.canAct && (
              <button type="button" onClick={applyDirectory} className="mt-2 text-body-medium text-button-ghost-foreground hover:underline">
                {usedDirectory ? "Directory details filled in" : "Use directory details"}
              </button>
            )}
          </div>
        )}
        {props.booking && <BookingFields booking={props.booking} canAct={props.canAct} />}
        {props.issues.some((i) => !OCR_FIELDS.some((f) => f.key === i.field)) && (
          <Notice tone="waiting">{props.issues.filter((i) => !OCR_FIELDS.some((f) => f.key === i.field)).map((i) => i.message).join(" ")}</Notice>
        )}
        {props.canAct && (
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={pending}>{props.mode === "edit" ? (pending ? "Saving…" : "Save changes") : pending ? "Approving…" : "Approve figures"}</Button>
            {state.error && <Notice tone="blocked">{state.error}</Notice>}
          </div>
        )}
      </form>

      {props.canAct && props.mode === "approve" && (
        <div className="flex flex-wrap items-start gap-3">
          {returning ? (
            <form action={ret} className="flex flex-1 flex-wrap items-center gap-2">
              <label htmlFor="return-reason" className="sr-only">Reason</label>
              <Input id="return-reason" name="reason" required placeholder="Blurry, please retake" className="min-w-56 flex-1" />
              <Button type="submit" variant="secondary" disabled={retPending}>Return to client</Button>
              {retState.error && <span className="text-body-regular text-text-error-primary">{retState.error}</span>}
            </form>
          ) : (
            <Button type="button" variant="secondary" onClick={() => setReturning(true)}>Return to client…</Button>
          )}
          {props.canRead && (
            <form action={read}>
              <Button type="submit" variant="ghost" disabled={readPending}>{readPending ? "Reading…" : "Read again with OCR"}</Button>
              {(readState.error || readState.ok) && <span className={`ml-2 text-body-regular ${readState.error ? "text-text-error-primary" : "text-status-lime-text"}`}>{readState.error ?? readState.ok}</span>}
            </form>
          )}
        </div>
      )}
    </div>
  );
}

const ENTRY_STATUS = { suggested: "Suggested entry waiting to be confirmed", posted: "Posted to the books", reversed: "Entry reversed" } as const;

/** Account title for the books, inside the approve form (field `ledger_account`). */
function BookingFields({ booking, canAct }: { booking: Booking; canAct: boolean }) {
  const locked = booking.entry?.status === "posted";
  const groups = [...new Set(booking.accounts.map((a) => a.group))];
  return (
    <div className="space-y-2 rounded-xl bg-background-secondary-default p-3">
      <Field
        label="Account title (books)"
        htmlFor="ledger_account"
        hint={locked ? "Posted: reverse the entry on the Books page to change it." : booking.source}
      >
        <Select id="ledger_account" name="ledger_account" defaultValue={booking.accountId ?? ""} disabled={!canAct || locked}>
          <option value="">Choose…</option>
          {groups.map((g) => (
            <optgroup key={g} label={g}>
              {booking.accounts.filter((a) => a.group === g).map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
            </optgroup>
          ))}
        </Select>
      </Field>
      <p className="text-caption-1-regular text-text-tertiary">
        {booking.entry ? ENTRY_STATUS[booking.entry.status] : "Approving makes a suggested journal entry"}
        {booking.terms ? "; a charge opens a receivable or payable for the customer or supplier." : "."}{" "}
        <Link href={booking.booksHref} className="hover:underline">Books</Link>
      </p>
    </div>
  );
}
