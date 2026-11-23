"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice } from "@/components/ui";
import { sendSignInEmail, signInWithGoogle, verifySignInCode, type SignInState } from "./actions";

export function SignInForm({ next }: { next: string }) {
  const [emailState, sendAction, sending] = useActionState(sendSignInEmail, { step: "email" } as SignInState);
  const [codeState, verifyAction, verifying] = useActionState(verifySignInCode, { step: "email" } as SignInState);
  const state = codeState.step === "code" || codeState.error ? codeState : emailState;

  if (state.step === "code") {
    return (
      <div className="space-y-4">
        <Notice tone="done">
          If <strong>{state.email}</strong> has an account, we sent it a sign-in link. Open it on this device, in this browser.
        </Notice>
        <details className="group text-sm" open={Boolean(state.error)}>
          <summary className="cursor-pointer text-link">The email has a 6-digit code instead?</summary>
          <form action={verifyAction} className="mt-4 space-y-4">
            <input type="hidden" name="email" value={state.email} />
            <input type="hidden" name="next" value={next} />
            <Field label="Code" htmlFor="code" error={state.error}>
              <Input id="code" name="code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} required />
            </Field>
            <Button type="submit" className="w-full" disabled={verifying}>
              {verifying ? "Checking…" : "Sign in"}
            </Button>
          </form>
        </details>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form action={signInWithGoogle}>
        <input type="hidden" name="next" value={next} />
        <Button type="submit" variant="secondary" className="w-full">
          <GoogleMark />
          Continue with Google
        </Button>
      </form>
      <div className="flex items-center gap-3 text-xs text-ink-subtle" aria-hidden>
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
      <form action={sendAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <Field label="Email" htmlFor="email" error={state.error}>
          <Input id="email" name="email" type="email" autoComplete="email" defaultValue={state.email} required />
        </Field>
        <Button type="submit" className="w-full" disabled={sending}>
          {sending ? "Sending…" : "Email me a sign-in link"}
        </Button>
      </form>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9Z" />
    </svg>
  );
}
