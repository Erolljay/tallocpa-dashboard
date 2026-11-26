"use client";

import { useOptimistic, useState, useTransition } from "react";
import { Switch } from "@/components/base/switch/switch";
import { setEmailPreference } from "@/lib/notifications/actions";

export interface EmailSwitchGroup {
  key: string;
  label: string;
  kinds: { kind: string; label: string; on: boolean }[];
}

/** One BoardUI switch per kind of email, grouped; each change saves at once. */
export function EmailSwitches({ groups }: { groups: EmailSwitchGroup[] }) {
  const initial = Object.fromEntries(groups.flatMap((g) => g.kinds.map((k) => [k.kind, k.on])));
  const [values, setOptimistic] = useOptimistic(initial, (state: Record<string, boolean>, change: { kind: string; on: boolean }) => ({
    ...state,
    [change.kind]: change.on,
  }));
  const [, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const change = (kind: string, on: boolean) =>
    startTransition(async () => {
      setOptimistic({ kind, on });
      const res = await setEmailPreference(kind, on);
      setError(res.ok ? null : `Could not save: ${res.error}`);
    });

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <p role="alert" className="text-body-regular text-text-error-primary">
          {error}
        </p>
      )}
      {groups.map((g) => (
        <section
          key={g.key}
          aria-labelledby={`group-${g.key}`}
          className="rounded-3xl border border-border-button-default bg-background-primary-default p-5 sm:p-6"
        >
          <h2 id={`group-${g.key}`} className="mb-2 text-title-3-semibold text-text-primary">
            {g.label}
          </h2>
          <ul className="flex flex-col divide-y divide-separator-border">
            {g.kinds.map((k) => (
              <li key={k.kind} className="flex items-center justify-between gap-4 py-3">
                <span id={`kind-${k.kind}`} className="text-body-regular text-text-primary">
                  {k.label}
                </span>
                <Switch
                  aria-labelledby={`kind-${k.kind}`}
                  isSelected={values[k.kind] ?? true}
                  onChange={(on) => change(k.kind, on)}
                  className="shrink-0 pointer-coarse:min-h-11"
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
