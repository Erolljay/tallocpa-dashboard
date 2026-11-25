/**
 * The 7:00 am morning email (Owner's decision 5; docs/UX-REVIEW.md, safeguard 4).
 *   - The Owner: every overdue and critical filing, how many are at risk, and the coverage gaps.
 *   - Each preparer and reviewer: their own filings that are overdue, critical or at risk.
 * Nobody gets an email on a morning with nothing for them. Pure, so it can be tested.
 */
import type { Gap } from "./coverage";
import { RISK_LABELS, type RiskState } from "./safeguards";
import type { BoardRow } from "./safeguards-load";

const longDay = (day: string) => new Intl.DateTimeFormat("en-PH", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${day}T00:00:00Z`));
const shortDay = (day: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${day}T00:00:00Z`));
const NEEDS: readonly RiskState[] = ["overdue", "critical", "at_risk"];

function line(r: BoardRow, origin: string): string {
  const next = r.risk.next;
  const step = next ? ` · next: ${next.label} (${next.who}, ${r.risk.late.some((s) => s.key === next.key) ? "was due" : "by"} ${shortDay(next.target)})` : "";
  const cause = r.risk.cause ? ` · waiting on ${r.risk.cause === "client" ? "the client" : "us"}` : "";
  return `- ${RISK_LABELS[r.risk.state]} · ${r.clientName} · ${r.form} ${r.periodLabel} · due ${shortDay(r.dueDate)}${step}${cause}\n  ${origin}/app/filings/${r.id}`;
}

export interface Email {
  to: string;
  subject: string;
  text: string;
}

export function ownerEmail(day: string, board: BoardRow[], gaps: Gap[], origin: string, to: string): Email | null {
  const urgent = board.filter((r) => r.risk.state === "overdue" || r.risk.state === "critical");
  const atRisk = board.filter((r) => r.risk.state === "at_risk").length;
  if (urgent.length === 0 && gaps.length === 0) return null;
  const text = [
    `Deadlines for ${longDay(day)}.`,
    "",
    urgent.length ? `Overdue and critical (${urgent.length}):` : "Nothing overdue or critical.",
    ...urgent.map((r) => line(r, origin)),
    "",
    atRisk ? `${atRisk} more at risk: the preparers and reviewers have them in their own email.` : "",
    gaps.length ? `Coverage gaps (${gaps.length}): a filing that is never created never turns red.` : "",
    ...gaps.map((g) => `- ${g.clientName}: ${g.text}`),
    "",
    `All deadlines: ${origin}/app/deadlines?show=all`,
  ].filter((l, i, a) => l !== "" || a[i - 1] !== "");
  return { to, subject: `Deadlines: ${urgent.length} critical or overdue${gaps.length ? `, ${gaps.length} coverage gap${gaps.length === 1 ? "" : "s"}` : ""}`, text: text.join("\n") };
}

/** One email per person who is preparer or reviewer on a filing that needs attention. */
export function staffEmails(day: string, board: BoardRow[], emailOf: Map<string, string>, origin: string): Email[] {
  const byPerson = new Map<string, BoardRow[]>();
  for (const r of board) {
    if (!NEEDS.includes(r.risk.state)) continue;
    for (const p of [r.preparer, r.reviewer]) {
      if (!p) continue;
      const list = byPerson.get(p.userId) ?? [];
      if (!list.includes(r)) list.push(r);
      byPerson.set(p.userId, list);
    }
  }
  const out: Email[] = [];
  for (const [userId, rows] of byPerson) {
    const to = emailOf.get(userId);
    if (!to) continue;
    out.push({
      to,
      subject: `Your deadlines: ${rows.length} filing${rows.length === 1 ? "" : "s"} need${rows.length === 1 ? "s" : ""} you`,
      text: [`Filings on your clients that need attention, ${longDay(day)}:`, "", ...rows.map((r) => line(r, origin)), "", `Your deadlines: ${origin}/app/deadlines`].join("\n"),
    });
  }
  return out;
}
