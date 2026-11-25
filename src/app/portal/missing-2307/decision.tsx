"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { decideMissing2307Action, type DecisionState } from "./actions";

/** Keep claiming / Stop claiming, for one invoice. The current choice is shown pressed. */
export function Decision({ invoiceId, claim }: { invoiceId: string; claim: "keep" | "stop" | null }) {
  const [keepState, keep, keeping] = useActionState(async () => decideMissing2307Action(invoiceId, true), {} as DecisionState);
  const [stopState, stop, stopping] = useActionState(async () => decideMissing2307Action(invoiceId, false), {} as DecisionState);
  const error = keepState.error ?? stopState.error;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <form action={keep}>
        <Button type="submit" size="sm" variant={claim === "keep" ? "primary" : "secondary"} aria-pressed={claim === "keep"} disabled={keeping || stopping}>
          {keeping ? "Saving…" : "Keep claiming"}
        </Button>
      </form>
      <form action={stop}>
        <Button type="submit" size="sm" variant={claim === "stop" ? "primary" : "secondary"} aria-pressed={claim === "stop"} disabled={keeping || stopping}>
          {stopping ? "Saving…" : "Stop claiming"}
        </Button>
      </form>
      {error && <span role="alert" className="text-caption-1-regular text-text-error-primary">{error}</span>}
    </div>
  );
}
