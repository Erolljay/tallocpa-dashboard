"use client";

import { useActionState, useState } from "react";
import { Button, Field, Notice, Textarea } from "@/components/ui";
import type { LabelledDay } from "@/lib/calendar/slots";
import { cx } from "@/utils/cx";

export type BookingState = { error?: string; ok?: string; meetUrl?: string | null };

/** Free times by day; pick one and book. Times are shown in Manila time. */
export function SlotPicker({
  days,
  action,
  topic,
  submitLabel = "Book this time",
}: {
  days: LabelledDay[];
  action: (start: string, topic: string) => Promise<BookingState>;
  topic?: { label: string; hint?: string };
  submitLabel?: string;
}) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [state, submit, pending] = useActionState(async (_: BookingState, form: FormData) => {
    const start = String(form.get("start") ?? "");
    if (!start) return { error: "Choose a time." };
    return action(start, String(form.get("topic") ?? ""));
  }, {} as BookingState);

  if (state.ok) {
    return (
      <Notice tone="done">
        {state.ok}
        {state.meetUrl?.startsWith("https://") && (
          <>
            {" "}
            <a href={state.meetUrl} target="_blank" rel="noreferrer" className="underline">Google Meet link</a>
          </>
        )}
      </Notice>
    );
  }
  if (days.length === 0) return <Notice tone="waiting">No free times in the next weeks. Please email us and we will find a time.</Notice>;

  return (
    <form action={submit} className="space-y-5">
      <div className="space-y-4">
        <p className="sr-only">Times are Manila time.</p>
        {days.map((d) => (
          <fieldset key={d.date} className="space-y-2">
            <legend className="text-body-medium text-text-primary">{d.label}</legend>
            <div className="flex flex-wrap gap-2">
              {d.slots.map((s) => (
                <label
                  key={s.start}
                  className={cx(
                    "cursor-pointer rounded-full border px-3 py-1.5 text-body-medium tabular-nums outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-border-focus-ring",
                    chosen === s.start ? "border-accent-600 bg-accent-600 text-text-white" : "border-border-button-default text-text-primary hover:bg-background-secondary-hover",
                  )}
                >
                  <input type="radio" name="start" value={s.start} className="sr-only" onChange={() => setChosen(s.start)} checked={chosen === s.start} />
                  {s.label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      {topic && (
        <Field label={topic.label} htmlFor="booking-topic" hint={topic.hint}>
          <Textarea id="booking-topic" name="topic" rows={3} maxLength={1000} />
        </Field>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending || !chosen}>{pending ? "Booking…" : submitLabel}</Button>
        {state.error && <span role="alert" className="text-body-regular text-text-error-primary">{state.error}</span>}
      </div>
    </form>
  );
}
