/**
 * Tasks (migration 20261216000001_tasks_and_request_owners.sql): the firm's own to-dos.
 * Priorities are shared with requests and tickets.
 */
export const PRIORITIES = { high: "High", normal: "Normal", low: "Low" } as const;
export type Priority = keyof typeof PRIORITIES;
export const PRIORITY_KEYS = Object.keys(PRIORITIES) as Priority[];
export function isPriority(v: string): v is Priority {
  return Object.hasOwn(PRIORITIES, v);
}

export type TaskStatus = "open" | "done" | "cancelled";
export const TASK_STATUS_LABELS: Record<TaskStatus, string> = { open: "Open", done: "Done", cancelled: "Cancelled" };

type Tone = "neutral" | "progress" | "done" | "waiting" | "blocked";

/** How an open task stands against its due date (dates YYYY-MM-DD, Manila). */
export function taskDue(status: TaskStatus, dueDate: string | null, today: string): { label: string; tone: Tone } {
  if (status === "done") return { label: "Done", tone: "done" };
  if (status === "cancelled") return { label: "Cancelled", tone: "neutral" };
  if (!dueDate) return { label: "No due date", tone: "neutral" };
  if (dueDate < today) return { label: "Overdue", tone: "blocked" };
  if (dueDate === today) return { label: "Due today", tone: "waiting" };
  return { label: "Open", tone: "progress" };
}

const RANK: Record<Priority, number> = { high: 0, normal: 1, low: 2 };

/** Open tasks first, then overdue and soonest due (no date last), then by priority. */
export function sortTasks<T extends { status: TaskStatus; due_date: string | null; priority: Priority; created_at: string }>(tasks: readonly T[]): T[] {
  return [...tasks].sort((a, b) =>
    Number(a.status !== "open") - Number(b.status !== "open")
    || (a.due_date ?? "9999-12-31").localeCompare(b.due_date ?? "9999-12-31")
    || RANK[a.priority] - RANK[b.priority]
    || a.created_at.localeCompare(b.created_at));
}
