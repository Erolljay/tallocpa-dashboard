import Link from "next/link";
import { Suspense } from "react";
import { RiDownloadLine } from "@remixicon/react";
import { Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { BATCH_KINDS, type BatchKind } from "@/lib/batch/register";
import { payrollAccess } from "@/lib/payroll/data";
import { formatAmount } from "@/lib/returns/money";
import { cx } from "@/utils/cx";
import { BatchUpload } from "./forms";

export default function BatchPage(props: PageProps<"/app/clients/[id]/batch">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Batch params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const toCentavos = (v: unknown) => Math.round(Number(v ?? 0) * 100);

/**
 * B1: a client's sales or purchases in bulk, in the register layout, at onboarding.
 * Download the template (with the client's chart in the dropdowns), fill one row per
 * invoice, check the rows, and post the file whole. The rows become approved
 * documents marked "Batch · no image", in the register and, from the books start,
 * in the ledger.
 */
async function Batch({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/batch">, "params" | "searchParams">) {
  const { id } = await params;
  const sp = await searchParams;
  const { supabase, client } = await payrollAccess(id);
  const kind: BatchKind = one(sp.kind) === "purchases" ? "purchases" : "sales";
  const [{ data: books }, { data: batches }, { data: staff }] = await Promise.all([
    supabase.from("client_books").select("books_start").eq("client_id", id).maybeSingle(),
    supabase.from("batch_uploads").select("id, kind, file_name, row_count, booked_count, total, first_date, last_date, uploaded_by, created_at").eq("client_id", id).order("created_at", { ascending: false }).limit(50),
    supabase.from("staff_profiles").select("user_id, full_name"),
  ]);
  const nameOf = new Map((staff ?? []).map((s) => [s.user_id, s.full_name as string]));
  const tab = (k: BatchKind) => (
    <Link
      key={k}
      href={`/app/clients/${id}/batch?kind=${k}`}
      aria-current={k === kind ? "page" : undefined}
      className={cx(
        "rounded-full px-3 py-1.5 text-body-medium outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
        k === kind ? "bg-accent-50 text-text-primary" : "text-text-secondary hover:bg-background-secondary-hover",
      )}
    >
      {BATCH_KINDS[k]}
    </Link>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Batch upload"
        description={<><Link href={`/app/clients/${id}`} className="text-button-ghost-foreground hover:underline">{client.name}</Link> · sales or purchases in the register layout, for onboarding and backlogs.</>}
        actions={<LinkButton href={`/app/clients/${id}/register`} variant="secondary">Register</LinkButton>}
      />
      {!books && <Notice tone="blocked">Set up the client&apos;s chart of accounts first (Books page): every row needs an account title from it.</Notice>}
      <nav className="flex flex-wrap gap-2" aria-label="Register">{(["sales", "purchases"] as const).map(tab)}</nav>

      <Card title={BATCH_KINDS[kind]}>
        <div className="space-y-4">
          <ol className="list-decimal space-y-1 ps-5 text-body-regular text-text-secondary">
            <li>Download the template. It lists this client&apos;s chart in the account dropdowns.</li>
            <li>Fill one row per invoice. VATable amounts include VAT; individuals need last, first and middle name.</li>
            <li>Check the rows. Every problem is listed by row; nothing posts until all rows are clean.</li>
            <li>Post. The rows go to the register as &ldquo;Batch · no image&rdquo;{books ? `, and those dated from ${String(books.books_start).slice(0, 10)} to the ledger` : ""}.</li>
          </ol>
          <LinkButton href={`/app/clients/${id}/batch/template?kind=${kind}`} variant="secondary" prefetch={false}>
            <RiDownloadLine aria-hidden className="size-4" /> Download the {kind} template
          </LinkButton>
          {books && <BatchUpload key={kind} clientId={id} kind={kind} />}
        </div>
      </Card>

      <Card title="Uploaded files">
        {(batches ?? []).length === 0 ? (
          <p className="text-body-regular text-text-secondary">No batch uploads yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-body-regular">
              <thead className="text-body-medium text-text-tertiary">
                <tr><th className="pb-2 text-start">Uploaded</th><th className="pb-2 text-start">File</th><th className="pb-2 text-start">Dates</th><th className="pb-2 text-end">Rows</th><th className="pb-2 text-end">In the ledger</th><th className="pb-2 text-end">Total</th></tr>
              </thead>
              <tbody>
                {(batches ?? []).map((b) => (
                  <tr key={b.id} className="border-t border-separator-border">
                    <td className="py-2 pe-3">{String(b.created_at).slice(0, 10)} · {nameOf.get(b.uploaded_by) ?? "—"}</td>
                    <td className="py-2 pe-3">{BATCH_KINDS[b.kind as BatchKind]} · {b.file_name}</td>
                    <td className="py-2 pe-3 tabular-nums">{b.first_date ? `${b.first_date} to ${b.last_date}` : "—"}</td>
                    <td className="py-2 text-end tabular-nums">{b.row_count}</td>
                    <td className="py-2 text-end tabular-nums">{b.booked_count}</td>
                    <td className="py-2 text-end tabular-nums">{formatAmount(toCentavos(b.total))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
