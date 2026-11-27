import { Suspense } from "react";
import { Lockup } from "@/components/brand/lockup";
import { Notice } from "@/components/ui";
import { safeNextPath } from "@/lib/safe-redirect";
import { IDLE_MINUTES } from "@/lib/session/idle";
import { SignInForm } from "./sign-in-form";

const errors: Record<string, string> = {
  no_access: "Your account is not linked to Tallo CPA staff or a current client. If we no longer handle your business, your view-only access ended two months after that. Ask the firm if you need a copy of your files.",
  link_expired: "That sign-in link has expired or was already used. Request a new one.",
  google: "Google sign-in did not finish. Try again, or use your email instead.",
  signin_failed: "Sign-in did not finish. The link may have expired or been opened in a different browser. Request a new one here.",
};

/** Not errors: the person was signed out to keep client data safe (src/lib/session/idle.ts). */
const notices: Record<string, string> = {
  idle_staff: `You were signed out after ${IDLE_MINUTES.staff} minutes without activity. Sign in again to continue.`,
  idle_client: `You were signed out after ${IDLE_MINUTES.client} minutes without activity, to keep your records safe. Sign in again to continue.`,
};

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <main className="flex flex-1 items-center justify-center bg-background-full px-4 py-12">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex justify-center">
          <Lockup />
        </div>
        {/* BoardUI auth card: rounded-3xl panel on the page ground. */}
        <div className="rounded-3xl border border-border-button-default bg-background-primary-default p-6 shadow-xs">
          <h1 className="text-title-2-medium text-text-primary">Sign in</h1>
          <p className="mt-1 mb-6 text-body-regular text-text-secondary">For Tallo CPA staff and clients. Use your Google account or get a link by email.</p>
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
  const next = safeNextPath(sp.next);
  const error = typeof sp.error === "string" ? errors[sp.error] : undefined;
  const notice = typeof sp.error === "string" ? notices[sp.error] : undefined;
  return (
    <div className="flex flex-col gap-4">
      {error && <Notice tone="blocked">{error}</Notice>}
      {notice && <Notice tone="waiting">{notice}</Notice>}
      <SignInForm next={next} />
    </div>
  );
}
