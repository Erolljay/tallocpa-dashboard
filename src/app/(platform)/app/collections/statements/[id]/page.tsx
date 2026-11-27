import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RiMoneyDollarCircleLine } from "@remixicon/react";
import { Card, Skeleton } from "@/components/ui";
import { ShareLink } from "@/components/statement/share-link";
import { StatementView } from "@/components/statement/statement-view";
import { shareMessage } from "@/lib/collections/share-message";
import { requireOwner } from "@/lib/auth";
import { loadStatement } from "@/lib/collections/statement";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { RecordDepositForm } from "../../forms";

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
  const supabase = await supabaseServer();
  const [s, { data: staff }] = await Promise.all([
    loadStatement(supabase, id),
    supabase.from("staff_profiles").select("user_id, full_name").eq("active", true).order("full_name"),
  ]);
  if (!s) notFound();
  const today = manilaToday();
  // Every open item of the client, this statement's ticked: a cash or transfer payment the client sent without a proof.
  const items = s.openItems.map((i) => ({ id: i.id, description: i.thisStatement ? i.description : `${i.description} (earlier statement)`, due_on: i.due_on, open_amount: i.open }));
  const preticked = s.openItems.filter((i) => i.thisStatement).map((i) => i.id);
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link href={`/app/collections/${s.client.id}`} className="text-body-regular text-button-ghost-foreground hover:underline print:hidden">← {s.client.name}</Link>
      <StatementView
        s={s}
        today={today}
        owner
        actions={
          <>
            <a href="#record-payment" className="pressable inline-flex items-center gap-1.5 rounded-2lg px-2 py-1 text-body-regular text-button-ghost-foreground outline-none hover:text-text-primary hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-11">
              <RiMoneyDollarCircleLine aria-hidden className="size-4" />
              Record payment
            </a>
            <ShareLink soaId={s.soa.id} message={shareMessage(s)} />
          </>
        }
      />
      <div id="record-payment" className="scroll-mt-6 print:hidden">
        <Card title="Record a Payment">
          <p className="mb-4 text-body-regular text-text-secondary">
            For cash, a transfer or a down payment the client sent without uploading a proof. With nothing ticked, the amount is kept as credit and used on the next statement.
          </p>
          <RecordDepositForm
            clientId={s.client.id}
            today={today}
            items={items}
            preticked={preticked}
            accounts={s.accounts.map((a) => ({ id: a.id, label: `${a.institution} ${maskNumber(a.account_number)}${a.purpose === "client_tax_funds" ? " (tax funds)" : ""}` }))}
            staff={(staff ?? []).map((m) => ({ id: m.user_id, name: m.full_name }))}
          />
        </Card>
      </div>
    </div>
  );
}

function maskNumber(n: string) {
  const digits = n.replace(/\s/g, "");
  return digits.length > 4 ? `····${digits.slice(-4)}` : digits;
}
