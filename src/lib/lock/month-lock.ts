/**
 * What the Books month lock bar shows and offers (docs/REWORK.md, decision 9). The
 * database functions (request_books_lock, lock_books_month, request_books_unlock,
 * decide_books_unlock) enforce the rules; this only decides what to show. Pure.
 *
 *   Open             preparer: ask the reviewer to lock (once the month's Inbox is clear)
 *                    reviewer / Owner: lock it
 *   Lock requested   reviewer / Owner: lock it
 *   Locked           reviewer: ask to unlock, with a reason
 *                    Owner: unlock, with a note (the Owner's own request unlocks at once)
 *   Unlock requested Owner / acting approver: approve or reject the request
 */
import type { BooksMonthStatus } from "@/lib/books/periods";

export interface LockMonth {
  /** First day of the month, YYYY-MM-DD. */
  month: string;
  status: BooksMonthStatus;
  lock_source: "reviewer" | "filed" | null;
  locked_by: string | null;
  locked_at: string | null;
  request_id: string | null;
  request_kind: "lock" | "unlock" | null;
  requested_by: string | null;
  requested_at: string | null;
  request_reason: string | null;
  waiting_documents: number;
  in_books: boolean;
}

export interface LockViewer {
  userId: string;
  owner: boolean;
  /** The viewer's assignments on this client. */
  preparer: boolean;
  reviewer: boolean;
  /** Acting approver in office now. */
  acting: boolean;
}

export type LockAction =
  | { kind: "request_lock"; disabled: string | null }
  | { kind: "lock" }
  | { kind: "request_unlock" }
  | { kind: "unlock" }
  | { kind: "decide"; requestId: string };

const monthFmt = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" });
const shortMonthFmt = new Intl.DateTimeFormat("en-PH", { month: "long", timeZone: "UTC" });
const dayFmt = new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", year: "numeric", timeZone: "Asia/Manila" });

/** "October 2026". */
export const monthName = (month: string) => monthFmt.format(new Date(`${month.slice(0, 7)}-01T00:00:00Z`));
/** "October". */
export const monthShort = (month: string) => shortMonthFmt.format(new Date(`${month.slice(0, 7)}-01T00:00:00Z`));
const day = (iso: string) => dayFmt.format(new Date(iso));

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** The action the viewer can take on the month now, if any. `today` is YYYY-MM-DD (Manila). */
export function lockActionFor(m: LockMonth, v: LockViewer, today: string): LockAction | null {
  if (!m.in_books || m.month.slice(0, 7) > today.slice(0, 7)) return null;
  const locker = v.owner || v.reviewer;
  switch (m.status) {
    case "open":
      if (locker) return { kind: "lock" };
      if (v.preparer)
        return {
          kind: "request_lock",
          disabled: m.waiting_documents > 0 ? `${plural(m.waiting_documents, "document")} of ${monthName(m.month)} still in the Inbox: approve or return ${m.waiting_documents === 1 ? "it" : "them"} first.` : null,
        };
      return null;
    case "lock_requested":
      return locker ? { kind: "lock" } : null;
    case "locked":
      if (v.owner) return { kind: "unlock" };
      return v.reviewer ? { kind: "request_unlock" } : null;
    case "unlock_requested":
      return (v.owner || v.acting) && m.request_id ? { kind: "decide", requestId: m.request_id } : null;
  }
}

/** One line on the month's state: "Locked by Ana Cruz on Nov 3, 2026". */
export function lockStatusText(m: LockMonth, nameOf: (userId: string | null) => string | null): string {
  const by = (id: string | null) => nameOf(id) ?? "someone";
  switch (m.status) {
    case "open":
      return m.in_books ? "Open" : "Before the books start";
    case "lock_requested":
      return `Lock requested by ${by(m.requested_by)}`;
    case "locked":
      if (m.lock_source === "filed" && !m.locked_by) return "Locked: return filed";
      return `Locked by ${by(m.locked_by)}${m.locked_at ? ` on ${day(m.locked_at)}` : ""}`;
    case "unlock_requested":
      return `Unlock requested by ${by(m.requested_by)}`;
  }
}

/** The button label for an action: "Ask Ana to lock October", "Lock October". */
export function lockActionLabel(a: LockAction, month: string, reviewerName: string | null): string {
  switch (a.kind) {
    case "request_lock":
      return `Ask ${reviewerName ?? "the reviewer"} to lock ${monthShort(month)}`;
    case "lock":
      return `Lock ${monthShort(month)}`;
    case "request_unlock":
      return "Ask to unlock";
    case "unlock":
      return "Unlock…";
    case "decide":
      return "Unlock…";
  }
}
