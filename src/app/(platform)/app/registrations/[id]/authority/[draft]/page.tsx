import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PrintButton } from "@/components/bir/print-button";
import { AuthoritySheet } from "@/components/registration/authority-sheet";
import { LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";

export default function AuthorityPrintPage(props: PageProps<"/app/registrations/[id]/authority/[draft]">) {
  return (
    <Suspense fallback={<Skeleton rows={12} />}>
      <AuthorityPrint params={props.params} />
    </Suspense>
  );
}

interface Payload {
  title?: string;
  marked?: string;
  missing?: string[];
  to_fill_by_staff?: string[];
}

/**
 * The Registration Runner's drafted authority document (Secretary's Certificate,
 * Partners' Certificate or Special Power of Attorney) ready to print on A4 for the client
 * to sign and notarize. Staff on the client read it (the draft's own row-level security);
 * the blanks can be filled on screen before printing, without saving.
 */
async function AuthorityPrint({ params }: Pick<PageProps<"/app/registrations/[id]/authority/[draft]">, "params">) {
  const { id, draft } = await params;
  await requireStaff();
  const supabase = await supabaseServer();
  const { data: d } = await supabase
    .from("ai_drafts")
    .select("id, kind, status, subject_table, subject_id, payload, clients(name)")
    .eq("id", draft)
    .maybeSingle();
  if (!d || d.kind !== "authority_document" || d.subject_table !== "registration_cases" || d.subject_id !== id) notFound();
  const p = (d.payload ?? {}) as Payload;
  if (!p.marked) notFound();
  const client = (d.clients as unknown as { name: string } | null)?.name ?? "";
  return (
    <>
      <div className="print:hidden">
        <PageHeader
          title={p.title ?? "Authority document"}
          description={<>{client}: drafted by the Registration Runner for the client to sign and notarize (A4 portrait).</>}
          actions={
            <>
              <LinkButton href={`/app/registrations/${id}`} variant="ghost">Back</LinkButton>
              <PrintButton />
            </>
          }
        />
        <div className="mb-6 space-y-3">
          {d.status !== "open" && <Notice tone="waiting">This draft was {d.status}.</Notice>}
          {(p.missing?.length ?? 0) > 0 && <Notice tone="waiting">Not in the app: {p.missing!.join("; ")}. Fill them below or by hand before the client signs.</Notice>}
        </div>
      </div>
      <AuthoritySheet marked={p.marked} />
    </>
  );
}
