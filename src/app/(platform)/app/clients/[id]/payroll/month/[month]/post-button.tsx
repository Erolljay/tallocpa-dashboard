"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { postPayrollAction, type PostState } from "./post-action";

export function PostPayrollButton({ clientId, month, periodEnd, label }: { clientId: string; month: string; periodEnd: string | null; label: string }) {
  const [state, run, pending] = useActionState(() => postPayrollAction(clientId, month, periodEnd), {} as PostState);
  return (
    <form action={run} className="flex flex-wrap items-center gap-2">
      <Button type="submit" size="sm" disabled={pending || Boolean(state.ok)}>{pending ? "Posting…" : `Post ${label} to the books`}</Button>
      {state.error && <span role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
      {state.ok && <span role="status" className="text-caption-1-regular text-status-lime-text">{state.ok}</span>}
    </form>
  );
}
