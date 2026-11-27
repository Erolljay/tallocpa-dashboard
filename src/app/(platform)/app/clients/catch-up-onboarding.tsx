"use client";

import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { catchUpOnboardingAction } from "./actions";

/** The Owner puts every onboarding client not yet in catch-up in catch-up through a month. */
export function CatchUpOnboarding({ clients, defaultMonth }: { clients: string[]; defaultMonth: string }) {
  const [state, run, pending] = useActionState(catchUpOnboardingAction, {});
  if (state.ok && !state.error) return <p role="status" className="mb-4 text-body-regular text-status-lime-text">{state.ok}</p>;
  return (
    <div className="mb-4 space-y-3 rounded-2xl bg-background-secondary-default px-4 py-3">
      <p className="text-body-regular text-text-primary">
        {clients.length} onboarding client{clients.length === 1 ? " is" : "s are"} not in catch-up:{" "}
        <span className="text-text-secondary">{clients.slice(0, 6).join(", ")}{clients.length > 6 ? ` and ${clients.length - 6} more` : ""}</span>.
        {" "}Catch-up hides their past returns from the deadlines. Staff record those returns as filed and the reviewer confirms them. Returns after the month you choose stay on the deadlines as usual. The clients stay onboarding.
      </p>
      <form action={run} className="flex flex-wrap items-end gap-2">
        <label className="flex flex-col gap-1 text-caption-1-medium text-text-secondary" htmlFor="catch-up-through">
          Catch up through
          <Input id="catch-up-through" name="through" type="month" required defaultValue={defaultMonth} className="w-44" />
        </label>
        <Button type="submit" size="sm" disabled={pending}>{pending ? "Saving…" : `Put ${clients.length === 1 ? "it" : `all ${clients.length}`} in catch-up`}</Button>
      </form>
      {state.error && <p role="alert" className="text-body-regular text-text-error-primary">{state.error}</p>}
      {state.ok && <p role="status" className="text-body-regular text-status-lime-text">{state.ok}</p>}
    </div>
  );
}
