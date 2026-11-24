"use client";

import { useActionState } from "react";
import { RiRefreshLine } from "@remixicon/react";
import { Button, Notice } from "@/components/ui";
import { generateFilingsNow, type GenerateState } from "./actions";

export function GenerateButton() {
  const [state, action, pending] = useActionState(generateFilingsNow, {} as GenerateState);
  return (
    <div className="space-y-3">
      <form action={action}>
        <Button type="submit" variant="secondary" disabled={pending}>
          <RiRefreshLine aria-hidden className={`size-4 ${pending ? "animate-spin" : ""}`} />
          {pending ? "Generating…" : "Generate filings now"}
        </Button>
      </form>
      {(state.message || state.error) && <Notice tone={state.error ? "blocked" : "done"}>{state.message ?? state.error}</Notice>}
    </div>
  );
}
