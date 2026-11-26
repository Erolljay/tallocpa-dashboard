"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { askClientAction, createTaskAction, reviewTaskAction, setTaskStatusAction, submitTaskAction, updateTaskAction, type TaskFormState } from "@/lib/tasks/actions";
import { PRIORITIES, PRIORITY_KEYS, type Job, type Priority } from "@/lib/tasks/labels";

const pesos = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });

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
  reviewer?: string | null;
  job_code?: string | null;
  job_price?: number | null;
}

/**
 * A new task, or the details of an open one. With `requestId` the task comes from a
 * request or ticket: the client is fixed and the form stays on the request's page.
 */
export function TaskForm({ staff, clients, defaults = {}, requestId, fixedClient, me, jobs = [] }: {
  staff: StaffOption[];
  clients?: ClientOption[];
  defaults?: TaskDefaults;
  requestId?: string;
  fixedClient?: ClientOption;
  me: string;
  /** Jobs from the active fee schedule, billed when the task is done. */
  jobs?: Job[];
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
  const [clientId, setClientId] = useState(fixedClient?.id ?? defaults.client_id ?? "");
  const [jobCode, setJobCode] = useState(defaults.job_code ?? "");
  const job = jobs.find((j) => j.code === jobCode);
  const forClient = Boolean(clientId);

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
          <Select id={id("client_id")} name="client_id" value={clientId} onChange={(ev) => setClientId(ev.target.value)}>
            <option value="">No client</option>
            {(clients ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </Field>
      )}
      <Field label="For the month" htmlFor={id("period")} error={e.period} hint={clientFixed && !(fixedClient ?? defaults.client_id) ? "Only for a client's task." : "Optional."}>
        <Input id={id("period")} name="period" type="month" defaultValue={defaults.period ?? ""} />
      </Field>
      <Field label="Reviewer" htmlFor={id("reviewer")} error={e.reviewer} hint="Optional: checks the work before it is done.">
        <Select id={id("reviewer")} name="reviewer" defaultValue={defaults.reviewer ?? ""}>
          <option value="">No review</option>
          {staff.map((s) => <option key={s.user_id} value={s.user_id}>{s.full_name}</option>)}
        </Select>
      </Field>
      {forClient && jobs.length > 0 && (
        <>
          <Field label="Job (billed when done)" htmlFor={id("job_code")} error={e.job_code} hint="From the active fee schedule.">
            <Select id={id("job_code")} name="job_code" value={jobCode} onChange={(ev) => setJobCode(ev.target.value)}>
              <option value="">Not billed</option>
              {jobs.map((j) => <option key={j.code} value={j.code}>{j.label}{j.price != null ? ` · ${pesos.format(j.price)}` : " · quoted"}</option>)}
            </Select>
          </Field>
          {jobCode && (
            <Field label="Price" htmlFor={id("job_price")} error={e.job_price} hint={job?.price != null ? `Schedule: ${pesos.format(job.price)}. Change it for this job if agreed.` : "Quoted per job: enter the agreed price."}>
              <Input key={jobCode} id={id("job_price")} name="job_price" inputMode="decimal" defaultValue={defaults.job_code === jobCode && defaults.job_price != null ? String(defaults.job_price) : job?.price != null ? String(job.price) : ""} />
            </Field>
          )}
        </>
      )}
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
      {!editing && forClient && (
        <div className="sm:col-span-2">
          <Field label={requestId ? "Reply to the client first (optional)" : "Ask the client first (optional)"} htmlFor={id("ask_client")} error={e.ask_client} hint="The task waits on the client until they answer in the portal, then comes back to whoever does it.">
            <Textarea id={id("ask_client")} name="ask_client" rows={2} maxLength={4000} placeholder="e.g. Please send the new lease contract and the barangay clearance." />
          </Field>
        </div>
      )}
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

/** The workflow step for whoever holds the task: hand in, review, or ask the client. */
export function TaskWorkflow({ taskId, stage, canPrepare, canReview, hasReviewer, hasClient, returnNote }: {
  taskId: string;
  stage: "client" | "preparer" | "reviewer";
  canPrepare: boolean;
  canReview: boolean;
  hasReviewer: boolean;
  hasClient: boolean;
  returnNote: string | null;
}) {
  const router = useRouter();
  const [submitState, submit, submitting] = useActionState(async (p: TaskFormState, f: FormData) => { const r = await submitTaskAction(p, f); if (r.ok) router.refresh(); return r; }, {} as TaskFormState);
  const [reviewState, review, reviewing] = useActionState(async (p: TaskFormState, f: FormData) => { const r = await reviewTaskAction(p, f); if (r.ok) router.refresh(); return r; }, {} as TaskFormState);
  const [askState, ask, asking] = useActionState(async (p: TaskFormState, f: FormData) => { const r = await askClientAction(p, f); if (r.ok) router.refresh(); return r; }, {} as TaskFormState);
  return (
    <div className="flex flex-col gap-5">
      {stage === "client" && <Notice tone="waiting">Waiting on the client. Their answer in the portal brings the task back to whoever does it.</Notice>}
      {stage === "preparer" && returnNote && <Notice tone="blocked">Sent back by the reviewer: {returnNote}</Notice>}
      {stage === "preparer" && canPrepare && (
        <form action={submit} className="flex flex-col gap-3">
          <input type="hidden" name="task_id" value={taskId} />
          <Field label={hasReviewer ? "Note for the reviewer (optional)" : "Note (optional)"} htmlFor={`${taskId}-submit-note`}>
            <Textarea id={`${taskId}-submit-note`} name="note" rows={2} maxLength={2000} />
          </Field>
          <div className="flex justify-end"><Button type="submit" disabled={submitting}>{submitting ? "Sending…" : hasReviewer ? "Send for review" : "Mark done"}</Button></div>
          {submitState.error && <Notice tone="blocked">{submitState.error}</Notice>}
        </form>
      )}
      {stage === "reviewer" && canReview && (
        <form action={review} className="flex flex-col gap-3">
          <input type="hidden" name="task_id" value={taskId} />
          <Field label="What to fix (when sending back)" htmlFor={`${taskId}-review-note`} error={reviewState.fieldErrors?.note}>
            <Textarea id={`${taskId}-review-note`} name="note" rows={2} maxLength={2000} />
          </Field>
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="submit" name="decision" value="back" variant="secondary" disabled={reviewing}>Send back</Button>
            <Button type="submit" name="decision" value="approve" disabled={reviewing}>Approve: done</Button>
          </div>
          {reviewState.error && !reviewState.fieldErrors && <Notice tone="blocked">{reviewState.error}</Notice>}
        </form>
      )}
      {stage === "reviewer" && !canReview && <p className="text-body-regular text-text-secondary">With the reviewer.</p>}
      {hasClient && stage !== "reviewer" && canPrepare && (
        <details>
          <summary className="cursor-pointer text-body-medium text-button-ghost-foreground hover:underline">{stage === "client" ? "Write to the client again" : "Ask the client for something"}</summary>
          <form action={ask} className="mt-3 flex flex-col gap-3">
            <input type="hidden" name="task_id" value={taskId} />
            <Field label="Message" htmlFor={`${taskId}-ask`} error={askState.fieldErrors?.message} hint="The client sees it in the portal; the task waits on them.">
              <Textarea id={`${taskId}-ask`} name="message" rows={2} maxLength={4000} />
            </Field>
            <div className="flex justify-end"><Button type="submit" variant="secondary" disabled={asking}>Send to the client</Button></div>
            {askState.error && !askState.fieldErrors && <Notice tone="blocked">{askState.error}</Notice>}
          </form>
        </details>
      )}
    </div>
  );
}
