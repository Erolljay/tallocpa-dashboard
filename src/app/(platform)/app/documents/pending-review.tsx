"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { Pick } from "@/components/books/pick";
import { Badge, Button, Card, Select } from "@/components/ui";
import type { DocumentCodes, PendingTaxCodes } from "@/lib/books/actions";
import type { TaxCode } from "@/lib/books/tax-codes";
import { CODE_SOURCE_LABELS, codesFor, codeTone, PORTION_LABELS, postingChoices, type CodeSourceKind } from "@/lib/books/ui";
import { ACCOUNT_SOURCES, needsConfirming, type AccountSource } from "@/lib/documents/bulk";
import { formatAmount } from "@/lib/returns/money";
import { cx } from "@/utils/cx";
import { approveSelectedAction, type BulkState } from "./bulk-actions";
import { MoveBar } from "./move-bar";

export interface PendingRow {
  id: string;
  received: string;
  typeLabel: string;
  fileName: string;
  month: string;
  /** The month it is reported in ("YYYY-MM-01"). */
  documentMonth: string;
  flags: { label: string; tone: "warn" | "bad" }[];
  party: string | null;
  number: string | null;
  total: string | null;
  ocr: { label: string; tone: "neutral" | "progress" | "done" | "waiting" | "blocked" };
  ready: boolean;
  reason: string | null;
  /** The account title applies: a bookkeeping client and a booked document type. */
  booked: boolean;
  /** A sale or purchase: the title is the client's choice, not a rule (2307s follow the open item). */
  titled: boolean;
  account: { id: string | null; source: AccountSource } | null;
  /** A sale or purchase posted to the Books as an invoice (books set up). */
  invoiceKind: "sales" | "purchase" | null;
  /** Suggested tax codes (pending_document_tax_codes), one per line portion. */
  codes: PendingTaxCodes | null;
  /** Cash (invoice + receipt/payment) or charge (invoice only), from the figures. */
  terms: "cash" | "charge";
  cashAccountId: string | null;
}

type Codes = { lines: Record<string, string | null>; wh: string | null; vw: string | null };
const initialCodes = (r: PendingRow): Codes => ({
  lines: Object.fromEntries((r.codes?.lines ?? []).map((l) => [l.portion, l.tax_code_id])),
  wh: r.codes?.withholding_code_id ?? null,
  vw: r.codes?.vat_withholding_code_id ?? null,
});
/** The pickers of a row that came from OCR and wait for a confirmation. */
const ocrKeys = (r: PendingRow) =>
  r.codes
    ? [
        ...r.codes.lines.filter((l) => l.source === "ocr").map((l) => `${r.id}:${l.portion}`),
        ...(r.codes.withholding_source === "ocr" ? [`${r.id}:wh`] : []),
        ...(r.codes.vat_withholding_source === "ocr" ? [`${r.id}:vw`] : []),
      ]
    : [];

/**
 * A client's documents waiting for review (P1): the account title chosen inline from
 * this client's chart, where it came from, and "Approve selected" for the ones OCR
 * read cleanly. A firm suggestion or a default must be confirmed (or changed) first;
 * a title from this client's history can go as is.
 */
export function PendingReview({ clientId, rows, accounts, cashAccounts = [], taxCodes = [], canMove = false, fyeMonth = 12 }: { clientId: string; rows: PendingRow[]; accounts: { id: string; label: string; group: string }[]; cashAccounts?: { id: string; label: string }[]; taxCodes?: TaxCode[]; canMove?: boolean; fyeMonth?: number }) {
  const [chosen, setChosen] = useState<Record<string, string>>(() => Object.fromEntries(rows.map((r) => [r.id, r.account?.id ?? ""])));
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const groups = useMemo(() => [...new Set(accounts.map((a) => a.group))], [accounts]);

  const [codes, setCodes] = useState<Record<string, Codes>>(() => Object.fromEntries(rows.map((r) => [r.id, initialCodes(r)])));
  const [codeOk, setCodeOk] = useState<Set<string>>(new Set());
  const [terms, setTerms] = useState<Record<string, "cash" | "charge">>(() => Object.fromEntries(rows.map((r) => [r.id, r.terms])));
  const [cash, setCash] = useState<Record<string, string | null>>(() => Object.fromEntries(rows.map((r) => [r.id, r.cashAccountId ?? cashAccounts[0]?.id ?? null])));
  const codesOk = (r: PendingRow) => !r.invoiceKind || ocrKeys(r).every((k) => codeOk.has(k));
  const pickCode = (r: PendingRow, key: string, patch: Partial<Codes>) => {
    setCodes((c) => ({ ...c, [r.id]: { ...c[r.id], ...patch, lines: { ...c[r.id].lines, ...(patch.lines ?? {}) } } }));
    // Choosing a code on purpose confirms it.
    setCodeOk((s) => new Set(s).add(`${r.id}:${key}`));
  };
  const titleOk = (r: PendingRow) => !r.booked || !r.titled || (chosen[r.id] !== "" && (!needsConfirming(r.account?.source ?? "choose") || confirmed.has(r.id)));
  const canSelect = (r: PendingRow) => r.ready && titleOk(r) && codesOk(r) && (!r.invoiceKind || terms[r.id] === "charge" || cash[r.id] != null);
  // The reviewer or Owner can also tick a sale or purchase not yet ready, to move it to a later period.
  const movable = (r: PendingRow) => canMove && r.titled;
  const canTick = (r: PendingRow) => canSelect(r) || movable(r);
  const selectable = rows.filter(canTick);
  const toMove = rows.filter((r) => selected.has(r.id) && movable(r)).map((r) => ({ id: r.id, month: r.documentMonth }));
  const picked = rows.filter((r) => selected.has(r.id) && canSelect(r));
  const items = picked.map((r) => {
    const c = codes[r.id];
    const docCodes: DocumentCodes | null = r.invoiceKind
      ? {
          lines: (r.codes?.lines ?? []).map((l) => ({ portion: l.portion, tax_code_id: c.lines[l.portion] ?? null })),
          withholding_code_id: c.wh,
          ...(r.invoiceKind === "sales" ? { vat_withholding_code_id: c.vw } : {}),
        }
      : null;
    return {
      documentId: r.id,
      accountId: r.booked ? chosen[r.id] || null : null,
      terms: r.invoiceKind ? terms[r.id] : null,
      cashAccountId: r.invoiceKind && terms[r.id] === "cash" ? cash[r.id] : null,
      codes: docCodes,
    };
  });
  const [state, approve, pending] = useActionState(() => approveSelectedAction(clientId, items), {} as BulkState);

  const set = (s: Set<string>, id: string, on: boolean) => {
    const n = new Set(s);
    if (on) n.add(id);
    else n.delete(id);
    return n;
  };
  const allOn = selectable.length > 0 && selectable.every((r) => selected.has(r.id));
  const showTitles = rows.some((r) => r.booked);

  return (
    <Card
      title={`Waiting for review (${rows.length})`}
      actions={
        <form action={approve} className="flex flex-wrap items-center justify-end gap-2">
          <span className="text-caption-1-regular text-text-tertiary">Oldest first</span>
          <Button type="submit" size="sm" disabled={pending || picked.length === 0}>{pending ? "Approving…" : `Approve selected (${picked.length})`}</Button>
        </form>
      }
    >
      {(state.ok || state.error) && (
        <div className="mb-3 space-y-1">
          {state.ok && <p role="status" className="text-body-regular text-status-lime-text">{state.ok}</p>}
          {state.error && <p role="alert" className="text-body-regular text-text-error-primary">{state.error}</p>}
        </div>
      )}
      {rows.length === 0 ? (
        <p className="text-body-regular text-text-secondary">Nothing waiting for this period. New uploads appear here.</p>
      ) : (
        <>
          {showTitles && (
            <p className="mb-3 text-caption-1-regular text-text-tertiary">
              Account titles come from this client&apos;s chart. A title from the client&apos;s own history can be approved as is; confirm or change a firm suggestion or a default. Tax codes in green are this client&apos;s default for the party; amber ones were read by OCR and need confirming. The title and codes you choose are kept for this client and party only. Approving posts each sale or purchase to the Books as chosen under &ldquo;Goes to the Books as&rdquo;.
            </p>
          )}
          {canMove && <MoveBar clientId={clientId} selected={toMove} fyeMonth={fyeMonth} />}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] text-body-regular">
              <thead className="text-start text-body-medium text-text-tertiary">
                <tr>
                  <th scope="col" className="w-8 pb-2 text-start">
                    <input
                      type="checkbox"
                      aria-label={canMove ? "Select every document" : "Select every document ready to approve"}
                      checked={allOn}
                      disabled={selectable.length === 0}
                      onChange={(e) => setSelected(e.target.checked ? new Set(selectable.map((r) => r.id)) : new Set())}
                      className="size-4 accent-accent-600"
                    />
                  </th>
                  <th scope="col" className="pb-2 text-start">Received</th>
                  <th scope="col" className="pb-2 text-start">Document</th>
                  <th scope="col" className="pb-2 text-start">Month</th>
                  <th scope="col" className="pb-2 text-end">Total</th>
                  {showTitles && <th scope="col" className="pb-2 ps-4 text-start">Account title</th>}
                  <th scope="col" className="pb-2 text-start">OCR</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const source = r.account?.source ?? "choose";
                  const s = ACCOUNT_SOURCES[source];
                  const mustConfirm = r.booked && r.titled && needsConfirming(source) && !confirmed.has(r.id);
                  return (
                    <tr key={r.id} className="border-t border-separator-border align-top transition-colors duration-150 hover:bg-background-secondary-hover">
                      <td className="py-2 pe-2">
                        <input
                          type="checkbox"
                          aria-label={`Select ${r.typeLabel}${r.number ? ` ${r.number}` : ""}`}
                          checked={selected.has(r.id) && canTick(r)}
                          disabled={!canTick(r)}
                          onChange={(e) => setSelected(set(selected, r.id, e.target.checked))}
                          className="mt-1 size-4 accent-accent-600"
                        />
                      </td>
                      <td className="py-2 pe-4 tabular-nums text-text-secondary">{r.received}</td>
                      <td className="py-2 pe-4">
                        <Link href={`/app/documents/${r.id}`} className="font-medium text-button-ghost-foreground hover:underline">{r.typeLabel}{r.number ? ` ${r.number}` : ""}</Link>
                        <p className="max-w-56 truncate text-caption-1-regular text-text-tertiary">{r.party ?? r.fileName}</p>
                      </td>
                      <td className="py-2 pe-4 text-text-secondary">
                        {r.month}
                        {r.flags.map((f) => (
                          <span key={f.label} className={cx("ms-1 text-caption-1-regular", f.tone === "bad" ? "text-text-error-primary" : "text-status-yellow-text")}>{f.label}</span>
                        ))}
                      </td>
                      <td className="amount py-2 pe-4 text-end tabular-nums text-text-primary">{r.total ?? "—"}</td>
                      {showTitles && (
                        <td className="py-2 ps-4 pe-4">
                          {r.booked ? (
                            <div className="flex min-w-72 flex-col gap-1">
                              <label htmlFor={`acct-${r.id}`} className="sr-only">Account title</label>
                              <Select
                                id={`acct-${r.id}`}
                                value={chosen[r.id]}
                                onChange={(e) => {
                                  setChosen({ ...chosen, [r.id]: e.target.value });
                                  // Choosing a title on purpose confirms it.
                                  setConfirmed(set(confirmed, r.id, e.target.value !== ""));
                                }}
                                className="text-caption-1-regular"
                              >
                                <option value="">Choose…</option>
                                {groups.map((g) => (
                                  <optgroup key={g} label={g}>
                                    {accounts.filter((a) => a.group === g).map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
                                  </optgroup>
                                ))}
                              </Select>
                              {r.invoiceKind && (
                                <BooksChoices
                                  row={r}
                                  codes={codes[r.id]}
                                  confirmed={codeOk}
                                  taxCodes={taxCodes}
                                  cashAccounts={cashAccounts}
                                  terms={terms[r.id]}
                                  cash={cash[r.id]}
                                  onCode={(key, patch) => pickCode(r, key, patch)}
                                  onConfirm={() => setCodeOk((s) => new Set([...s, ...ocrKeys(r)]))}
                                  onTerms={(t) => setTerms({ ...terms, [r.id]: t })}
                                  onCash={(a) => setCash({ ...cash, [r.id]: a })}
                                />
                              )}
                              <div className="flex flex-wrap items-center gap-2">
                                <span title={s.hint}><Badge tone={confirmed.has(r.id) && source !== "choose" ? "done" : s.tone}>{confirmed.has(r.id) && needsConfirming(source) ? "Confirmed" : r.titled ? s.label : "By rule"}</Badge></span>
                                {mustConfirm && chosen[r.id] !== "" && (
                                  <button type="button" onClick={() => setConfirmed(set(confirmed, r.id, true))} className="text-caption-1-medium text-button-ghost-foreground hover:underline">Confirm</button>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="text-caption-1-regular text-text-tertiary">—</span>
                          )}
                        </td>
                      )}
                      <td className="py-2">
                        <Badge tone={r.ocr.tone}>{r.ocr.label}</Badge>
                        {!r.ready && r.reason && r.ocr.label !== r.reason && <p className="mt-1 max-w-48 text-caption-1-regular text-text-tertiary">{r.reason}. Open it to review.</p>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Card>
  );
}

/**
 * The Books side of a sale or purchase row: a tax code per line portion (split when
 * the document has VATable, exempt and zero-rated amounts), the withholding code (and
 * on a sale the WV code), what the row goes to the Books as, and the cash account
 * when it is cash. Green: the party default; amber: OCR's suggestion to confirm.
 */
function BooksChoices({
  row,
  codes,
  confirmed,
  taxCodes,
  cashAccounts,
  terms,
  cash,
  onCode,
  onConfirm,
  onTerms,
  onCash,
}: {
  row: PendingRow;
  codes: Codes;
  confirmed: Set<string>;
  taxCodes: TaxCode[];
  cashAccounts: { id: string; label: string }[];
  terms: "cash" | "charge";
  cash: string | null;
  onCode: (key: string, patch: Partial<Codes>) => void;
  onConfirm: () => void;
  onTerms: (t: "cash" | "charge") => void;
  onCash: (a: string | null) => void;
}) {
  const kind = row.invoiceKind!;
  const tone = (key: string, source: CodeSourceKind) => codeTone(source, confirmed.has(`${row.id}:${key}`));
  const hint = (key: string, source: CodeSourceKind) => (confirmed.has(`${row.id}:${key}`) ? "Confirmed" : source ? CODE_SOURCE_LABELS[source] : "No suggestion");
  const pending = ocrKeys(row).filter((k) => !confirmed.has(k)).length;
  const invoiceCodes = codesFor(taxCodes, kind, "invoice", codes.wh ?? codes.vw);
  const lines = row.codes?.lines ?? [];
  return (
    <div className="mt-1 space-y-1.5 rounded-xl bg-background-secondary-default p-2">
      {lines.map((l) => (
        <div key={l.portion}>
          <span className="text-caption-1-regular text-text-tertiary">
            Tax code{lines.length > 1 ? ` · ${PORTION_LABELS[l.portion]} ${formatAmount(Math.round(Number(l.amount) * 100))}` : ""} · {hint(l.portion, l.source)}
          </span>
          <Pick
            ariaLabel={`Tax code${lines.length > 1 ? `, ${PORTION_LABELS[l.portion]}` : ""}`}
            size="sm"
            value={codes.lines[l.portion] ?? null}
            onChange={(x) => onCode(l.portion, { lines: { [l.portion]: x } })}
            options={codesFor(taxCodes, kind, "line", codes.lines[l.portion]).map((c) => ({ id: c.id, label: c.name }))}
            noneLabel="No tax code"
            tone={tone(l.portion, l.source)}
          />
        </div>
      ))}
      <div>
        <span className="text-caption-1-regular text-text-tertiary">Withholding code · {hint("wh", row.codes?.withholding_source ?? null)}</span>
        <Pick
          ariaLabel="Withholding code"
          size="sm"
          value={codes.wh}
          onChange={(x) => onCode("wh", { wh: x })}
          options={invoiceCodes.filter((c) => c.kind === "withholding").map((c) => ({ id: c.id, label: c.name }))}
          noneLabel="None"
          tone={tone("wh", row.codes?.withholding_source ?? null)}
        />
      </div>
      {kind === "sales" && (codes.vw || row.codes?.vat_withholding_source) && (
        <div>
          <span className="text-caption-1-regular text-text-tertiary">VAT withheld (government) · {hint("vw", row.codes?.vat_withholding_source ?? null)}</span>
          <Pick
            ariaLabel="VAT withheld code"
            size="sm"
            value={codes.vw}
            onChange={(x) => onCode("vw", { vw: x })}
            options={invoiceCodes.filter((c) => c.kind === "govt_vat_withheld").map((c) => ({ id: c.id, label: c.name }))}
            noneLabel="None"
            tone={tone("vw", row.codes?.vat_withholding_source ?? null)}
          />
        </div>
      )}
      {pending > 0 && (
        <button type="button" onClick={onConfirm} className="rounded-md text-caption-1-medium text-button-ghost-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">
          Confirm tax codes ({pending})
        </button>
      )}
      <div>
        <span className="text-caption-1-regular text-text-tertiary">Goes to the Books as</span>
        <Pick ariaLabel="Goes to the Books as" size="sm" value={terms} onChange={(x) => onTerms(x === "charge" ? "charge" : "cash")} options={postingChoices(kind).map((c) => ({ id: c.value, label: c.label }))} />
      </div>
      {terms === "cash" && (
        <div>
          <span className="text-caption-1-regular text-text-tertiary">{kind === "sales" ? "Deposited to" : "Paid from"}</span>
          <Pick ariaLabel={kind === "sales" ? "Deposited to" : "Paid from"} size="sm" value={cash} onChange={onCash} options={cashAccounts} tone={cash ? "neutral" : "error"} />
        </div>
      )}
    </div>
  );
}
