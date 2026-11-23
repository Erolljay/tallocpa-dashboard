import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Lockup } from "@/components/brand/lockup";
import { Skeleton } from "@/components/ui";
import { getIdentity } from "@/lib/auth";

export default function PortalPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 space-y-8 px-4 py-10">
      <Lockup />
      <Suspense fallback={<Skeleton rows={3} />}>
        <Welcome />
      </Suspense>
    </main>
  );
}

async function Welcome() {
  const id = await getIdentity();
  if (id.staff) redirect("/app");
  const first = id.clients[0];
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <h1 className="font-display text-2xl font-bold text-ink-heading">Welcome{first ? `, ${first.fullName}` : ""}</h1>
      <p className="mt-2 text-sm text-ink-muted">
        {first ? `${first.clientName}'s portal is being set up.` : "Your portal is being set up."} Soon you will upload receipts and
        invoices here, approve your returns and see your Statement of Account.
      </p>
      <form action="/auth/signout" method="post" className="mt-6">
        <button className="text-sm text-link hover:underline">Sign out</button>
      </form>
    </section>
  );
}
