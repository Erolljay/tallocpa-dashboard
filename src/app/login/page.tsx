import { Suspense } from "react";
import { Lockup } from "@/components/brand/lockup";
import { Notice } from "@/components/ui";
import { SignInForm } from "./sign-in-form";

const errors: Record<string, string> = {
  no_access: "Your account is not linked to Tallo CPA staff or a client yet. Ask the firm to invite you.",
  link_expired: "That sign-in link has expired or was already used. Request a new one.",
  google: "Google sign-in did not finish. Try again, or use your email instead.",
};

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <Lockup />
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h1 className="font-display text-xl font-semibold text-ink-heading">Sign in</h1>
          <p className="mt-1 mb-6 text-sm text-ink-muted">For Tallo CPA staff and clients. Use your Google account or get a link by email.</p>
          <Suspense>
            <Form searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

async function Form({ searchParams }: { searchParams: PageProps<"/login">["searchParams"] }) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : "/app";
  const error = typeof sp.error === "string" ? errors[sp.error] : undefined;
  return (
    <div className="space-y-4">
      {error && <Notice tone="blocked">{error}</Notice>}
      <SignInForm next={next} />
    </div>
  );
}
