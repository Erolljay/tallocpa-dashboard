"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { Badge, Button, Card, Select } from "@/components/ui";
import { ACCOUNT_SOURCES, needsConfirming, type AccountSource } from "@/lib/documents/bulk";
import { cx } from "@/utils/cx";
import { approveSelectedAction, type BulkState } from "./bulk-actions";

export interface PendingRow {
  id: string;
  received: string;
  typeLabel: string;
  fileName: string;
  month: string;
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
}

/**
 * A client's documents waiting for review (P1): the account title chosen inline from
 * this client's chart, where it came from, and "Approve selected" for the ones OCR
 * read cleanly. A firm suggestion or a default must be confirmed (or changed) first;
 * a title from this client's history can go as is.
 */
export function PendingReview({ clientId, rows, accounts }: { clientId: string; rows: PendingRow[]; accounts: { id: string; label: string; group: string }[] }) {
  const [chosen, setChosen] = useState<Record<string, string>>(() => Object.fromEntries(rows.map((r) => [r.id, r.account?.id ?? ""])));
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const groups = useMemo(() => [...new Set(accounts.map((a) => a.group))], [accounts]);

  const titleOk = (r: PendingRow) => !r.booked || !r.titled || (chosen[r.id] !== "" && (!needsConfirming(r.account?.source ?? "choose") || confirmed.has(r.id)));
  const canSelect = (r: PendingRow) => r.ready && titleOk(r);
  const selectable = rows.filter(canSelect);
  const picked = rows.filter((r) => selected.has(r.id) && canSelect(r));
  const items = picked.map((r) => ({ documentId: r.id, accountId: r.booked ? chosen[r.id] || null : null }));
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
              Account titles come from this client&apos;s chart. A title from the client&apos;s own history can be approved as is; confirm or change a firm suggestion or a default. The title you choose is kept for this client and supplier only.
            </p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] text-body-regular">
              <thead className="text-start text-body-medium text-text-tertiary">
                <tr>
                  <th scope="col" className="w-8 pb-2 text-start">
                    <input
                      type="checkbox"
                      aria-label="Select every document ready to approve"
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
                          checked={selected.has(r.id) && canSelect(r)}
                          disabled={!canSelect(r)}
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
                            <div className="flex min-w-60 flex-col gap-1">
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
