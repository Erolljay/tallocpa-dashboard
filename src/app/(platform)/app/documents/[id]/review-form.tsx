"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { reviewDocumentAction, runOcrAction, type DocActionState } from "@/lib/documents/actions";
import type { Issue } from "@/lib/ocr/checks";
import { LOW_CONFIDENCE, OCR_DOC_TYPES, OCR_FIELDS, PARTY_KINDS, PAYMENT_TERMS, SLP_CATEGORY_KEYS, type OcrConfidence, type OcrFields } from "@/lib/ocr/fields";
import { SLP_CATEGORIES } from "@/lib/register/parts";
import { Pick, PickInput } from "@/components/books/pick";
import type { DocumentCodes, PendingTaxCodes } from "@/lib/books/actions";
import type { TaxCode } from "@/lib/books/tax-codes";
import { CODE_SOURCE_LABELS, codesFor, codeTone, PORTION_LABELS, postingChoices } from "@/lib/books/ui";
import { formatAmount } from "@/lib/returns/money";
import { approveDocumentAction } from "./actions";

/** Which document types each slice 4 field applies to (others always show). */
const ONLY_FOR: Partial<Record<string, readonly string[]>> = {
  discount: ["sales_invoice"],
  vat_withheld: ["sales_invoice"],
  other_deduction: ["sales_invoice", "purchase_receipt"],
  other_deduction_account: ["sales_invoice", "purchase_receipt"],
  slp_category: ["purchase_receipt"],
  payment_account: ["sales_invoice", "purchase_receipt"],
};

const fmtDay = (iso: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));
const fmtMonthOf = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));

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
  /** This client's cash and bank accounts, for "Paid from / deposited to". */
  cashAccounts: { id: string; label: string }[];
  accountId: string | null;
  /** Where the default came from, for the hint. */
  source: string;
  /** The document's journal entry, if any. */
  entry: { status: "suggested" | "posted" | "reversed" } | null;
  /** Whether cash / charge applies (sales and purchases). */
  terms: boolean;
  booksHref: string;
  /** A sale or purchase: posted to the Books as an invoice (rework). */
  invoiceKind: "sales" | "purchase" | null;
  /** Suggested tax codes while the document waits. */
  codes: PendingTaxCodes | null;
  taxCodes: TaxCode[];
  /** The invoice in the Books, once posted. */
  inBooks: string | null;
}

/** The figures beside the image: low-confidence fields highlighted, check warnings inline. */
export function ReviewForm(props: { documentId: string; docType: string; mode: "approve" | "edit"; fields: OcrFields; confidence: OcrConfidence; issues: Issue[]; canAct: boolean; canRead: boolean; model: string | null; directory?: DirectoryParty | null; booking?: Booking | null }) {
  const [state, approve, pending] = useActionState(approveDocumentAction.bind(null, props.documentId, props.mode), {} as DocActionState);
  const [retState, ret, retPending] = useActionState(reviewDocumentAction.bind(null, props.documentId, "return"), {} as DocActionState);
  const [readState, read, readPending] = useActionState(async () => runOcrAction(props.documentId), {} as DocActionState);
  const [returning, setReturning] = useState(false);
  const issueFor = (k: string) => props.issues.filter((i) => i.field === k).map((i) => i.message).join(" ");
  const lowCount = Object.values(props.confidence).filter((c) => c < LOW_CONFIDENCE).length;
  const formRef = useRef<HTMLFormElement>(null);
  const [usedDirectory, setUsedDirectory] = useState(false);
  // Last, first and middle name show only for an individual (the BIR lists need them).
  const [partyKind, setPartyKind] = useState(props.fields.party_kind ?? "");
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
            if (f.kind === "person" && partyKind !== "individual") return null;
            const only = ONLY_FOR[f.key];
            if (only && !only.includes(props.docType)) return null;
            // The account fields need this client's chart.
            if ((f.kind === "account" || f.kind === "payment_account") && !props.booking) return null;
            // Cash or charge and the cash account are chosen with the Books (BookingFields).
            if ((f.kind === "terms" || f.kind === "payment_account") && props.booking?.invoiceKind) return null;
            // The Input VAT tax code is the SLP category (capital goods, other goods, services): asked once, there.
            if (f.kind === "slp" && props.booking?.invoiceKind) return null;
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
                  ) : f.kind === "party_kind" ? (
                    <Select id={id} name={f.key} value={partyKind} onChange={(e) => setPartyKind(e.target.value)} disabled={!props.canAct}>
                      <option value="">Not stated (business)</option>
                      {Object.entries(PARTY_KINDS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                    </Select>
                  ) : f.kind === "slp" ? (
                    <Select id={id} name={f.key} defaultValue={props.fields[f.key] ?? ""} disabled={!props.canAct}>
                      <option value="">From the account title</option>
                      {SLP_CATEGORY_KEYS.map((k) => <option key={k} value={k}>{SLP_CATEGORIES[k]}</option>)}
                    </Select>
                  ) : f.kind === "payment_account" ? (
                    <Select id={id} name={f.key} defaultValue={props.fields[f.key] ?? ""} disabled={!props.canAct}>
                      <option value="">Cash (default)</option>
                      {(props.booking?.cashAccounts ?? []).map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
                    </Select>
                  ) : f.kind === "account" ? (
                    <PickInput id={id} ariaLabel={f.label} name={f.key} defaultValue={props.fields[f.key] ?? null} options={props.booking?.accounts ?? []} noneLabel="None" isDisabled={!props.canAct} />
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
        {props.booking && <BookingFields booking={props.booking} canAct={props.canAct} mode={props.mode} terms={props.fields.payment_terms === "charge" ? "charge" : "cash"} cashAccountId={props.fields.payment_account ?? null} />}
        {props.issues.some((i) => !OCR_FIELDS.some((f) => f.key === i.field)) && (
          <Notice tone="waiting">{props.issues.filter((i) => !OCR_FIELDS.some((f) => f.key === i.field)).map((i) => i.message).join(" ")}</Notice>
        )}
        {props.canAct && (
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={pending}>{props.mode === "edit" ? (pending ? "Saving…" : "Save changes") : pending ? "Approving…" : "Approve figures"}</Button>
            {state.error && <Notice tone="blocked">{state.error}</Notice>}
          </div>
        )}
        {props.canAct && state.lockedMonth && (
          <div role="alert" className="space-y-2 rounded-xl bg-status-yellow-background p-3">
            <p className="text-body-medium text-status-yellow-text">
              {state.lockedMonth.message}: it cannot be posted in that month. Approve it dated {fmtDay(state.lockedMonth.openMonth)} instead? It is reported and posted in {fmtMonthOf(state.lockedMonth.openMonth)}; the document keeps its own date, and the move is recorded.
            </p>
            <Button type="submit" name="redate" value="1" size="sm" disabled={pending}>
              {pending ? "Approving…" : `Approve dated ${fmtDay(state.lockedMonth.openMonth)}`}
            </Button>
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

const ENTRY_STATUS = { suggested: "Suggested entry from the old flow, not posted", posted: "Posted to the books", reversed: "Entry reversed" } as const;

/**
 * The Books side of the approve form: the account title (field `ledger_account`) and,
 * for a sale or purchase, a tax code per line portion and the withholding code (hidden
 * field `books_codes`, JSON), what it goes to the Books as (`payment_terms`) and the
 * cash or bank account when cash (`payment_account`). Green: the party default; amber:
 * OCR's suggestion, to confirm (choosing it on purpose, or Confirm).
 */
function BookingFields({ booking, canAct, mode, terms: initialTerms, cashAccountId }: { booking: Booking; canAct: boolean; mode: "approve" | "edit"; terms: "cash" | "charge"; cashAccountId: string | null }) {
  const kind = booking.invoiceKind;
  const sug = booking.codes;
  const [lines, setLines] = useState<Record<string, string | null>>(() => Object.fromEntries((sug?.lines ?? []).map((l) => [l.portion, l.tax_code_id])));
  const [wh, setWh] = useState<string | null>(sug?.withholding_code_id ?? null);
  const [vw, setVw] = useState<string | null>(sug?.vat_withholding_code_id ?? null);
  const [ok, setOk] = useState<Set<string>>(new Set());
  const [terms, setTerms] = useState(initialTerms);
  const [cash, setCash] = useState<string | null>(cashAccountId ?? booking.cashAccounts[0]?.id ?? null);
  const confirm = (k: string) => setOk((s) => new Set(s).add(k));
  const ocr = [...(sug?.lines ?? []).filter((l) => l.source === "ocr").map((l) => l.portion), ...(sug?.withholding_source === "ocr" ? ["wh"] : []), ...(sug?.vat_withholding_source === "ocr" ? ["vw"] : [])].filter((k) => !ok.has(k));
  const codes: DocumentCodes | null = kind && sug
    ? { lines: sug.lines.map((l) => ({ portion: l.portion, tax_code_id: lines[l.portion] ?? null })), withholding_code_id: wh, ...(kind === "sales" ? { vat_withholding_code_id: vw } : {}) }
    : null;
  const label = (k: string, source: "party" | "ocr" | null) => (ok.has(k) ? "Confirmed" : source ? CODE_SOURCE_LABELS[source] : "No suggestion");
  const invoiceCodes = kind ? codesFor(booking.taxCodes, kind, "invoice", wh ?? vw) : [];
  const disabled = !canAct;

  return (
    <div className="space-y-3 rounded-xl bg-background-secondary-default p-3">
      <Field label="Account title (books)" htmlFor="ledger_account" hint={booking.source}>
        <PickInput id="ledger_account" ariaLabel="Account title (books)" name="ledger_account" defaultValue={booking.accountId} options={booking.accounts} isDisabled={disabled} />
      </Field>

      {kind && (
        <>
          {codes && <input type="hidden" name="books_codes" value={JSON.stringify(codes)} />}
          <input type="hidden" name="books_unconfirmed" value={ocr.length} />
          {sug && (
            <div className="grid gap-3 sm:grid-cols-2">
              {sug.lines.map((l) => (
                <div key={l.portion} className="space-y-1">
                  <Pick
                    label={`Tax code${sug.lines.length > 1 ? ` · ${PORTION_LABELS[l.portion]} ${formatAmount(Math.round(Number(l.amount) * 100))}` : ""}`}
                    value={lines[l.portion] ?? null}
                    onChange={(x) => {
                      setLines((s) => ({ ...s, [l.portion]: x }));
                      confirm(l.portion);
                    }}
                    options={codesFor(booking.taxCodes, kind, "line", lines[l.portion]).map((c) => ({ id: c.id, label: c.name }))}
                    noneLabel="No tax code"
                    tone={codeTone(l.source, ok.has(l.portion))}
                    isDisabled={disabled}
                  />
                  <p className="text-caption-1-regular text-text-tertiary">{label(l.portion, l.source)}</p>
                </div>
              ))}
              <div className="space-y-1">
                <Pick
                  label={kind === "sales" ? "Withholding code (CWT)" : "Withholding code (EWT)"}
                  value={wh}
                  onChange={(x) => {
                    setWh(x);
                    confirm("wh");
                  }}
                  options={invoiceCodes.filter((c) => c.kind === "withholding").map((c) => ({ id: c.id, label: c.name }))}
                  noneLabel="None"
                  tone={codeTone(sug.withholding_source, ok.has("wh"))}
                  isDisabled={disabled}
                />
                <p className="text-caption-1-regular text-text-tertiary">{label("wh", sug.withholding_source)}</p>
              </div>
              {kind === "sales" && (vw || sug.vat_withholding_source) && (
                <div className="space-y-1">
                  <Pick
                    label="VAT withheld by a government customer"
                    value={vw}
                    onChange={(x) => {
                      setVw(x);
                      confirm("vw");
                    }}
                    options={invoiceCodes.filter((c) => c.kind === "govt_vat_withheld").map((c) => ({ id: c.id, label: c.name }))}
                    noneLabel="None"
                    tone={codeTone(sug.vat_withholding_source, ok.has("vw"))}
                    isDisabled={disabled}
                  />
                  <p className="text-caption-1-regular text-text-tertiary">{label("vw", sug.vat_withholding_source)}</p>
                </div>
              )}
            </div>
          )}
          {ocr.length > 0 && canAct && (
            <button type="button" onClick={() => setOk((s) => new Set([...s, ...ocr]))} className="rounded-md text-body-medium text-button-ghost-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">
              Confirm tax codes ({ocr.length})
            </button>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <Pick label="Goes to the Books as" name="payment_terms" value={terms} onChange={(x) => setTerms(x === "charge" ? "charge" : "cash")} options={postingChoices(kind).map((c) => ({ id: c.value, label: c.label }))} isDisabled={disabled} />
            {terms === "cash" && (
              <Pick label={kind === "sales" ? "Deposited to" : "Paid from"} name="payment_account" value={cash} onChange={setCash} options={booking.cashAccounts} isDisabled={disabled} tone={cash ? "neutral" : "error"} />
            )}
          </div>
        </>
      )}

      <p className="text-caption-1-regular text-text-tertiary">
        {booking.inBooks ? (
          <>
            In the Books: <Link href={booking.inBooks} className="hover:underline">{kind === "sales" ? "Sales Invoice" : "Purchase Invoice"}</Link>
            {mode === "edit" ? ". Saving changes voids it and posts it again with the corrected figures." : "."}
          </>
        ) : booking.entry ? (
          ENTRY_STATUS[booking.entry.status]
        ) : kind ? (
          `Approving posts it to the Books as ${postingChoices(kind).find((c) => c.value === terms)?.label}.`
        ) : (
          "Approving posts it to the Books."
        )}{" "}
        <Link href={booking.booksHref} className="hover:underline">Books</Link>
      </p>
      {ocr.length > 0 && <p className="text-caption-1-regular text-status-yellow-text">Confirm the tax codes OCR suggested before approving.</p>}
    </div>
  );
}
