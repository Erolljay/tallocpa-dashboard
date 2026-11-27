import Link from "next/link";
import { Suspense } from "react";
import { Card, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { AddChargeForm } from "../forms";

/**
 * New Bill: a fee for an ad hoc job (consultation, appearance …) billed straight from
 * Collections. The Owner picks the client, adds the fee, and Add and Bill Now opens the statement.
 */
export default function NewBillPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/app/collections" className="text-body-regular text-button-ghost-foreground hover:underline">← Collections</Link>
      <PageHeader title="New Bill" description="Bill a client for a job right away, such as a consultation or appearance fee. No task needed." />
      <Suspense fallback={<Skeleton rows={6} />}>
        <Form />
      </Suspense>
    </div>
  );
}

async function Form() {
  await requireOwner();
  const supabase = await supabaseServer();
  // Ad hoc job clients may be inactive between jobs: every client except archived ones.
  const { data } = await supabase.from("clients").select("id, name, code").neq("status", "archived").order("name");
  const clients = (data ?? []).map((c) => ({ id: c.id, label: `${c.name} (${c.code})` }));
  return (
    <Card>
      <AddChargeForm clientId={null} today={manilaToday()} clients={clients} />
    </Card>
  );
}
