"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { disconnectCalendarAction, type FormState } from "./actions";

export function DisconnectButton() {
  const [state, action, pending] = useActionState(async () => disconnectCalendarAction(), {} as FormState);
  return (
    <form action={action} className="flex items-center gap-2">
      <Button type="submit" size="sm" variant="ghost" disabled={pending}>{pending ? "Disconnecting…" : "Disconnect"}</Button>
      {state.error && <span role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}
