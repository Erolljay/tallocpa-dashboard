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
  const [accounts, { data: docs }] = await Promise.all([
    loadAccounts(supabase, id),
    supabase.from("documents").select("id, file_name, doc_type, document_month").eq("client_id", id).neq("status", "uploading").order("created_at", { ascending: false }).limit(200),
  ]);
  const documents = (docs ?? []).map((d) => ({ id: d.id, label: `${String(d.document_month).slice(0, 7)} · ${d.file_name}` }));
  return (
    <>
      <PageHeader
        title="New journal entry"
        description={<>{client.name}: adjustments, depreciation, accruals and corrections, posted to the General Journal. Entries from documents come in from the review queue.</>}
        actions={<LinkButton href={`/app/clients/${id}/books/journal`} variant="ghost">Back to journal entries</LinkButton>}
      />
      <Card>
        <EntryForm clientId={id} accounts={accounts} minDate={books.booksStart} documents={documents} />
      </Card>
    </>
  );
}
