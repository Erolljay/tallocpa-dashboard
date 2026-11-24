import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card, LinkButton, PageHeader, Skeleton } from "@/components/ui";
import { booksAccess, loadAccounts } from "@/lib/ledger/data";
import { EntryForm } from "../../forms";

export default function NewEntryPage(props: PageProps<"/app/clients/[id]/books/journal/new">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <NewEntry params={props.params} />
    </Suspense>
  );
}

async function NewEntry({ params }: Pick<PageProps<"/app/clients/[id]/books/journal/new">, "params">) {
  const { id } = await params;
  const { supabase, client, books } = await booksAccess(id);
  if (!books) notFound();
  const accounts = await loadAccounts(supabase, id);
  return (
    <>
      <PageHeader
        title="New journal entry"
        description={<>{client.name}: adjustments, depreciation, accruals and corrections, posted to the General Journal. Entries from documents come in from the review queue.</>}
        actions={<LinkButton href={`/app/clients/${id}/books`} variant="ghost">Back to books</LinkButton>}
      />
      <Card>
        <EntryForm clientId={id} accounts={accounts} minDate={books.booksStart} />
      </Card>
    </>
  );
}
