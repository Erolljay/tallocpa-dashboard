/**
 * "My work" (W3; docs/UX-REVIEW.md, recommendation 5): one next action per client and
 * period for the person signed in, with the rest of that client-period's work behind it.
 * Actions come from the returns' sign-off steps, documents, the books, payroll,
 * fixed assets and the workpapers; this module only ranks and groups them. Pure.
 */
import type { Risk } from "@/lib/deadlines/safeguards";

export type Urgency = "overdue" | "critical" | "at_risk" | "due" | "open";

/** Who does it: what the person signed in is to the client. */
export type Role = "preparer" | "reviewer" | "owner";

export interface WorkItem {
  clientId: string;
  clientName: string;
  /** The month it belongs to, YYYY-MM. */
  period: string;
  role: Role;
  label: string;
  href: string;
  urgency: Urgency;
  /** When it should be done, if there is a date. */
  due: string | null;
}

export interface WorkRow {
  clientId: string;
  clientName: string;
  period: string;
  next: WorkItem;
  more: WorkItem[];
}

const RANK: Record<Urgency, number> = { overdue: 0, critical: 1, at_risk: 2, due: 3, open: 4 };

export const byUrgency = (a: WorkItem, b: WorkItem) =>
  RANK[a.urgency] - RANK[b.urgency] || (a.due ?? "9999").localeCompare(b.due ?? "9999") || a.period.localeCompare(b.period) || a.label.localeCompare(b.label);

/** Groups the items by client and period, the most urgent first; each row's next action is its most urgent item. */
export function nextActions(items: WorkItem[], roles: readonly Role[]): WorkRow[] {
  const mine = items.filter((i) => roles.includes(i.role));
  const groups = new Map<string, WorkItem[]>();
  for (const i of mine) {
    const k = `${i.clientId}|${i.period}`;
    groups.set(k, [...(groups.get(k) ?? []), i]);
  }
  const rows: WorkRow[] = [...groups.values()].map((list) => {
    const sorted = [...list].sort(byUrgency);
    return { clientId: sorted[0].clientId, clientName: sorted[0].clientName, period: sorted[0].period, next: sorted[0], more: sorted.slice(1) };
  });
  return rows.sort((a, b) => byUrgency(a.next, b.next) || a.clientName.localeCompare(b.clientName));
}

export const URGENCY_LABELS: Record<Urgency, string> = {
  overdue: "Overdue",
  critical: "Critical",
  at_risk: "At risk",
  due: "Due soon",
  open: "To do",
};

// ---------------------------------------------------------------- returns

/** A return's next sign-off step as an action (src/lib/deadlines/safeguards.ts), or null when nothing is left. */
export function filingItem(f: { id: string; clientId: string; clientName: string; form: string; periodLabel: string; periodEnd: string; risk: Risk }): WorkItem | null {
  const next = f.risk.next;
  if (!next || f.risk.state === "filed") return null;
  const name = `${f.form} ${f.periodLabel}`;
  const step: Record<string, [Role, string]> = {
    documents: ["preparer", `Get the client's documents for ${name}`],
    prepared: ["preparer", `Prepare ${name}`],
    reviewed: ["reviewer", `Review ${name}`],
    client_approved: ["preparer", `Get the client's approval of ${name}`],
    owner_approved: ["owner", `Approve ${name}`],
    filed: ["preparer", `File and pay ${name}`],
    proof: ["preparer", `Record the proof of ${name}`],
  };
  const [role, label] = step[next.key];
  const urgency: Urgency =
    f.risk.state === "overdue" || f.risk.state === "critical" || f.risk.state === "at_risk" ? f.risk.state : f.risk.daysLeft <= 5 ? "due" : "open";
  return { clientId: f.clientId, clientName: f.clientName, period: f.periodEnd.slice(0, 7), role, label, href: `/app/filings/${f.id}`, urgency, due: next.target };
}
