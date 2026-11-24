import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, LinkButton, PageHeader, Skeleton } from "@/components/ui";
import { CloseRequestButton, ReplyForm } from "@/components/requests/reply-form";
import { Thread, type ThreadMessage } from "@/components/requests/thread";
import { requireStaff } from "@/lib/auth";
import { statusFor, type Direction, type RequestStatus } from "@/lib/requests/labels";
import { supabaseServer } from "@/lib/supabase/server";

export default function RequestPage(props: PageProps<"/app/requests/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <RequestDetail params={props.params} />
    </Suspense>
  );
}

async function RequestDetail({ params }: Pick<PageProps<"/app/requests/[id]">, "params">) {
  const { id } = await params;
  await requireStaff();
  const supabase = await supabaseServer();
  const { data: r } = await supabase
    .from("client_requests")
    .select("id, client_id, direction, subject, status, due_date, created_at, clients(name), registration_steps(label, case_id)")
    .eq("id", id)
    .maybeSingle();
  if (!r) notFound();
  const { data: messages } = await supabase
    .from("client_request_messages")
    .select("id, from_firm, body, file_name, storage_path, created_at")
    .eq("request_id", id)
    .order("created_at");
  const client = r.clients as unknown as { name: string } | null;
  const step = r.registration_steps as unknown as { label: string; case_id: string } | null;
  const view = statusFor("firm", r.direction as Direction, r.status as RequestStatus);
  const isOpen = r.status !== "closed";

  return (
    <>
      <PageHeader
        title={r.subject}
        description={<>{r.direction === "to_client" ? "Request to" : "Ticket from"} <Link href={`/app/clients/${r.client_id}`} className="hover:underline">{client?.name}</Link>{r.due_date ? ` · needed by ${r.due_date}` : ""}</>}
        actions={
          <div className="flex items-center gap-3">
            <Badge tone={view.tone}>{view.label}</Badge>
            {step && <LinkButton href={`/app/registrations/${step.case_id}`} variant="secondary">Routing slip</LinkButton>}
            {isOpen && <CloseRequestButton requestId={id} />}
          </div>
        }
      />
      <Card title={step ? `For: ${step.label}` : "Messages"}>
        <Thread messages={(messages ?? []) as ThreadMessage[]} viewer="firm" />
        {isOpen && (
          <div className="mt-6 border-t border-separator-border pt-4">
            <ReplyForm requestId={id} placeholder="Write to the client…" />
          </div>
        )}
      </Card>
    </>
  );
}
