"use client";

import { useActionState } from "react";
import { Divider } from "@/components/base/divider/divider";
import { SocialButton } from "@/components/base/social-button/social-button";
import { Button, Field, Input, Notice } from "@/components/ui";
import { sendSignInEmail, signInWithGoogle, verifySignInCode, type SignInState } from "./actions";

export function SignInForm({ next }: { next: string }) {
  const [emailState, sendAction, sending] = useActionState(sendSignInEmail, { step: "email" } as SignInState);
  const [codeState, verifyAction, verifying] = useActionState(verifySignInCode, { step: "email" } as SignInState);
  const state = codeState.step === "code" || codeState.error ? codeState : emailState;

  if (state.step === "code") {
    return (
      <div className="flex flex-col gap-4">
        <Notice tone="done">
          If <strong>{state.email}</strong> has an account, we sent it a sign-in link. Open it on this device, in this browser.
        </Notice>
        <details className="group text-body-regular" open={Boolean(state.error)}>
          <summary className="cursor-pointer text-button-ghost-foreground">The email has a 6-digit code instead?</summary>
          <form action={verifyAction} className="mt-4 flex flex-col gap-4">
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
    <div className="flex flex-col gap-6">
      <form action={signInWithGoogle}>
        <input type="hidden" name="next" value={next} />
        <SocialButton type="submit" brand="google" appearance="white" fullWidth />
      </form>
      <Divider aria-hidden>or</Divider>
      <form action={sendAction} className="flex flex-col gap-4">
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
