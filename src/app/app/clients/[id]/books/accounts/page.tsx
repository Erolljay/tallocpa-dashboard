import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card, LinkButton, PageHeader, Skeleton } from "@/components/ui";
import { booksAccess, loadAccounts } from "@/lib/ledger/data";
import { ACCOUNT_TYPES, type AccountType } from "@/lib/ledger/types";
import { AccountForm } from "../forms";

export default function AccountsPage(props: PageProps<"/app/clients/[id]/books/accounts">) {
  return (
    <Suspense fallback={<Skeleton rows={12} />}>
      <Accounts params={props.params} />
    </Suspense>
  );
}

const GROUPS: AccountType[][] = [["asset"], ["liability"], ["equity"], ["revenue", "other_income"], ["cost"], ["expense", "income_tax"]];

async function Accounts({ params }: Pick<PageProps<"/app/clients/[id]/books/accounts">, "params">) {
  const { id } = await params;
  const { supabase, client, books } = await booksAccess(id);
  if (!books) notFound();
  const accounts = await loadAccounts(supabase, id);
  const { data: usedRows } = await supabase.from("journal_lines").select("account_id").eq("client_id", id);
  const used = new Set((usedRows ?? []).map((r) => r.account_id as string));

  return (
    <>
      <PageHeader
        title="Chart of accounts"
        description={<>{client.name}: each account is reported on an FS line and, for income and expenses, feeds a line of the BIR income tax return. An account with entries keeps its type and control role; deactivate it and add a new one instead.</>}
        actions={<LinkButton href={`/app/clients/${id}/books`} variant="ghost">Back to books</LinkButton>}
      />
      <div className="space-y-6">
        {GROUPS.map((g) => (
          <Card key={g.join()} title={g.map((t) => ACCOUNT_TYPES[t]).join(" and ")}>
            <ul className="space-y-4 divide-y divide-separator-border">
              {accounts.filter((a) => g.includes(a.type)).map((a) => (
                <li key={a.id} className="pt-4 first:pt-0"><AccountForm clientId={id} account={a} used={used.has(a.id)} /></li>
              ))}
            </ul>
          </Card>
        ))}
        <Card title="Add an account">
          <AccountForm clientId={id} account={null} used={false} />
        </Card>
      </div>
    </>
  );
}
