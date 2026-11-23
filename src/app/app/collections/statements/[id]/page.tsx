import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { StatementView } from "@/components/statement/statement-view";
import { requireOwner } from "@/lib/auth";
import { loadStatement } from "@/lib/collections/statement";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";

export default function StatementPage(props: PageProps<"/app/collections/statements/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Detail params={props.params} />
    </Suspense>
  );
}

async function Detail({ params }: Pick<PageProps<"/app/collections/statements/[id]">, "params">) {
  const { id } = await params;
  await requireOwner();
  const s = await loadStatement(await supabaseServer(), id);
  if (!s) notFound();
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link href={`/app/collections/${s.client.id}`} className="text-sm text-link hover:underline print:hidden">← {s.client.name}</Link>
      <StatementView s={s} today={manilaToday()} />
    </div>
  );
}
