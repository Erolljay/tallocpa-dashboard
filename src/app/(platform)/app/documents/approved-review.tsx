"use client";

import Link from "next/link";
import { useState } from "react";
import { RiLockLine } from "@remixicon/react";
import { Card } from "@/components/ui";
import { cx } from "@/utils/cx";
import { MoveBar } from "./move-bar";

export interface ApprovedRow {
  id: string;
  approved: string;
  label: string;
  party: string;
  /** The review month shown, and its flags. */
  month: string;
  flags: { label: string; title?: string; tone: "warn" | "bad" }[];
  /** The month it is reported in ("YYYY-MM-01"). */
  documentMonth: string;
  total: string;
  /** The filed return that locks it, as "2550Q Q3 2026". */
  lock: string | null;
  /** A sale or purchase (can be moved or taken back). */
  titled: boolean;
}

/**
 * Approved documents, newest first. Open ones can still be corrected; filed months are
 * locked. The client's reviewer or the Owner can tick open sales and purchases to move
 * them to a later period or put them back to unapproved.
 */
export function ApprovedReview({ clientId, rows, canMove = false, fyeMonth = 12 }: { clientId: string; rows: ApprovedRow[]; canMove?: boolean; fyeMonth?: number }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const tickable = (r: ApprovedRow) => canMove && r.titled && !r.lock;
  const all = rows.filter(tickable);
  const picked = rows.filter((r) => selected.has(r.id) && tickable(r));
  const allOn = all.length > 0 && all.every((r) => selected.has(r.id));
  const toggle = (id: string, on: boolean) =>
    setSelected((s) => {
      const n = new Set(s);
      if (on) n.add(id);
      else n.delete(id);
      return n;
    });

  return (
    <Card title={`Approved (${rows.length})`} actions={<span className="text-caption-1-regular text-text-tertiary">Newest approval first</span>}>
      {rows.length === 0 ? (
        <p className="text-body-regular text-text-secondary">No approved documents for this period.</p>
      ) : (
        <>
          {canMove && <MoveBar clientId={clientId} selected={picked.map((r) => ({ id: r.id, month: r.documentMonth }))} approved fyeMonth={fyeMonth} />}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] text-body-regular">
              <thead className="text-start text-body-medium text-text-tertiary">
                <tr>
                  {canMove && (
                    <th scope="col" className="w-8 pb-2 text-start">
                      <input
                        type="checkbox"
                        aria-label="Select every open sale and purchase"
                        checked={allOn}
                        disabled={all.length === 0}
                        onChange={(e) => setSelected(e.target.checked ? new Set(all.map((r) => r.id)) : new Set())}
                        className="size-4 accent-accent-600"
                      />
                    </th>
                  )}
                  <th scope="col" className="pb-2 text-start">Approved</th>
                  <th scope="col" className="pb-2 text-start">Document</th>
                  <th scope="col" className="pb-2 text-start">Month</th>
                  <th scope="col" className="pb-2 text-end">Total</th>
                  <th scope="col" className="pb-2 ps-4 text-start">Edit</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                    {canMove && (
                      <td className="py-2 pe-2">
                        <input
                          type="checkbox"
                          aria-label={`Select ${r.label}`}
                          checked={selected.has(r.id) && tickable(r)}
                          disabled={!tickable(r)}
                          onChange={(e) => toggle(r.id, e.target.checked)}
                          className="size-4 accent-accent-600"
                        />
                      </td>
                    )}
                    <td className="py-2 pe-4 tabular-nums text-text-secondary">{r.approved}</td>
                    <td className="py-2 pe-4">
                      <Link href={`/app/documents/${r.id}`} className="font-medium text-button-ghost-foreground hover:underline">{r.label}</Link>
                      <p className="max-w-56 truncate text-caption-1-regular text-text-tertiary">{r.party}</p>
                    </td>
                    <td className="py-2 pe-4 text-text-secondary">
                      {r.month}
                      {r.flags.map((f) => (
                        <span key={f.label} title={f.title} className={cx("ms-1 text-caption-1-regular", f.tone === "bad" ? "text-text-error-primary" : "text-status-yellow-text")}>{f.label}</span>
                      ))}
                    </td>
                    <td className="amount py-2 pe-4 text-end tabular-nums text-text-primary">{r.total}</td>
                    <td className="py-2 ps-4">
                      {r.lock ? (
                        <span className="inline-flex items-center gap-1.5 text-caption-1-regular text-text-secondary" title={`${r.lock} has been filed`}>
                          <RiLockLine aria-hidden className="size-3.5" /> Locked · {r.lock} filed
                        </span>
                      ) : (
                        <Link href={`/app/documents/${r.id}`} className="text-caption-1-medium text-button-ghost-foreground hover:underline">Edit figures</Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Card>
  );
}
