"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { createTaskAction, setTaskStatusAction, updateTaskAction, type TaskFormState } from "@/lib/tasks/actions";
import { PRIORITIES, PRIORITY_KEYS, type Priority } from "@/lib/tasks/labels";

export interface StaffOption {
  user_id: string;
  full_name: string;
}
export interface ClientOption {
  id: string;
  name: string;
}

export interface TaskDefaults {
  id?: string;
  title?: string;
  notes?: string | null;
  assignee?: string;
  due_date?: string | null;
  priority?: Priority;
  client_id?: string | null;
  period?: string | null;
}

/**
 * A new task, or the details of an open one. With `requestId` the task comes from a
 * request or ticket: the client is fixed and the form stays on the request's page.
 */
export function TaskForm({ staff, clients, defaults = {}, requestId, fixedClient, me }: {
  staff: StaffOption[];
  clients?: ClientOption[];
  defaults?: TaskDefaults;
  requestId?: string;
  fixedClient?: ClientOption;
  me: string;
}) {
  const editing = Boolean(defaults.id);
  const [state, action, pending] = useActionState(editing ? updateTaskAction : createTaskAction, {} as TaskFormState);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok && !editing) form.current?.reset();
  }, [state, editing]);
  const e = state.fieldErrors ?? {};
  const id = (f: string) => `${defaults.id ?? requestId ?? "new"}-task-${f}`;
  const clientFixed = Boolean(fixedClient || requestId || editing);

  return (
    <form ref={form} action={action} className="grid gap-3 sm:grid-cols-2">
      {defaults.id && <input type="hidden" name="task_id" value={defaults.id} />}
      {requestId && <input type="hidden" name="request_id" value={requestId} />}
      {clientFixed && <input type="hidden" name="client_id" value={fixedClient?.id ?? defaults.client_id ?? ""} />}
      <div className="sm:col-span-2">
        <Field label="What needs doing" htmlFor={id("title")} error={e.title}>
          <Input id={id("title")} name="title" required maxLength={200} defaultValue={defaults.title} />
        </Field>
      </div>
      <Field label="Who does it" htmlFor={id("assignee")} error={e.assignee}>
        <Select id={id("assignee")} name="assignee" defaultValue={defaults.assignee ?? me} required>
          {staff.map((s) => <option key={s.user_id} value={s.user_id}>{s.user_id === me ? `${s.full_name} (me)` : s.full_name}</option>)}
        </Select>
      </Field>
      <Field label="Due" htmlFor={id("due_date")} error={e.due_date}>
        <Input id={id("due_date")} name="due_date" type="date" defaultValue={defaults.due_date ?? ""} />
      </Field>
      {!clientFixed && (
        <Field label="Client" htmlFor={id("client_id")} error={e.client_id} hint="Optional: leave empty for firm work.">
          <Select id={id("client_id")} name="client_id" defaultValue={defaults.client_id ?? ""}>
            <option value="">No client</option>
            {(clients ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </Field>
      )}
      <Field label="For the month" htmlFor={id("period")} error={e.period} hint={clientFixed && !(fixedClient ?? defaults.client_id) ? "Only for a client's task." : "Optional."}>
        <Input id={id("period")} name="period" type="month" defaultValue={defaults.period ?? ""} />
      </Field>
      <Field label="Priority" htmlFor={id("priority")} error={e.priority}>
        <Select id={id("priority")} name="priority" defaultValue={defaults.priority ?? "normal"}>
          {PRIORITY_KEYS.map((p) => <option key={p} value={p}>{PRIORITIES[p]}</option>)}
        </Select>
      </Field>
      <div className="sm:col-span-2">
        <Field label="Notes" htmlFor={id("notes")} error={e.notes}>
          <Textarea id={id("notes")} name="notes" rows={3} maxLength={4000} defaultValue={defaults.notes ?? ""} />
        </Field>
      </div>
      <div className="flex justify-end sm:col-span-2">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : editing ? "Save changes" : "Create task"}</Button>
      </div>
      {state.ok && <div className="sm:col-span-2"><Notice tone="done">{editing ? "Saved." : "Task created. The person it is assigned to is notified."}</Notice></div>}
      {state.error && <div className="sm:col-span-2"><Notice tone="blocked">{state.error}</Notice></div>}
    </form>
  );
}

/** Done / Cancel / Reopen. */
export function TaskStatusButtons({ taskId, status, compact = false }: { taskId: string; status: "open" | "done" | "cancelled"; compact?: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const run = (to: "open" | "done" | "cancelled") =>
    start(async () => {
      setError(null);
      const r = await setTaskStatusAction(taskId, to);
      if (r.error) setError(r.error);
      else router.refresh();
    });
  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === "open" ? (
        <>
          <Button size={compact ? "sm" : "md"} onClick={() => run("done")} disabled={pending}>Mark done</Button>
          {!compact && <Button variant="secondary" onClick={() => run("cancelled")} disabled={pending}>Cancel task</Button>}
        </>
      ) : (
        <Button size={compact ? "sm" : "md"} variant="secondary" onClick={() => run("open")} disabled={pending}>Reopen</Button>
      )}
      {error && <span className="text-caption-1-regular text-text-error-primary">{error}</span>}
    </div>
  );
}
