"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { decideMissing2307Action, type DecisionState } from "./actions";

/** Keep claiming / Stop claiming, for one invoice, in one form: the button pressed decides. The current choice is shown pressed. */
export function Decision({ invoiceId, claim }: { invoiceId: string; claim: "keep" | "stop" | null }) {
  const [state, submit, pending] = useActionState(
    async (_: DecisionState, form: FormData) => decideMissing2307Action(invoiceId, form.get("choice") === "keep"),
    {} as DecisionState,
  );
  return (
    <form action={submit} className="flex flex-wrap items-center gap-2">
      <Button type="submit" name="choice" value="keep" size="sm" variant={claim === "keep" ? "primary" : "secondary"} aria-pressed={claim === "keep"} disabled={pending}>
        Keep claiming
      </Button>
      <Button type="submit" name="choice" value="stop" size="sm" variant={claim === "stop" ? "primary" : "secondary"} aria-pressed={claim === "stop"} disabled={pending}>
        Stop claiming
      </Button>
      {pending && <span className="text-caption-1-regular text-text-secondary">Saving…</span>}
      {state.error && <span role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}
