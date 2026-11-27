import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RiArrowLeftSLine } from "@remixicon/react";
import { Badge, Skeleton } from "@/components/ui";
import { CloseRequestButton, ReplyForm } from "@/components/requests/reply-form";
import { StandingUpload } from "@/components/requests/standing-forms";
import { Thread, type ThreadMessage } from "@/components/requests/thread";
import { STANDING_ASK, statusFor, type Direction, type RequestStatus, type StandingKind } from "@/lib/requests/labels";
import { canAct } from "@/lib/contacts/access";
import { accessFor, portalContext } from "../../client-context";

export default function PortalRequest(props: PageProps<"/portal/requests/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={5} />}>
      <RequestDetail params={props.params} />
    </Suspense>
  );
}

async function RequestDetail({ params }: Pick<PageProps<"/portal/requests/[id]">, "params">) {
  const { id } = await params;
  const { supabase, all } = await portalContext();
  const { data: r } = await supabase
    .from("client_requests")
    .select("id, client_id, direction, subject, status, due_date, standing_kind, registration_steps(label)")
    .eq("id", id)
    .maybeSingle();
  if (!r) notFound();
  const { data: messages } = await supabase
    .from("client_request_messages")
    .select("id, from_firm, body, file_name, storage_path, created_at")
    .eq("request_id", id)
    .order("created_at");
  const view = statusFor("client", r.direction as Direction, r.status as RequestStatus);
  const step = r.registration_steps as unknown as { label: string } | null;
  const access = accessFor(all, r.client_id);
  const isOpen = r.status !== "closed";
  const standing = r.standing_kind as StandingKind | null;
  const canReply = isOpen && canAct(access);

  return (
    <div className="space-y-5">
      <Link href="/portal/requests" className="inline-flex items-center gap-1 text-body-medium text-text-secondary hover:text-text-primary">
        <RiArrowLeftSLine aria-hidden className="size-5 rtl:rotate-180" /> Requests
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-title-2-medium text-text-primary">{r.subject}</h1>
          <p className="text-body-regular text-text-secondary">
            {step ? `For your registration: ${step.label}` : standing ? "Every month" : r.direction === "to_client" ? "From us" : "Your question"}
            {r.due_date && isOpen ? ` · needed by ${r.due_date}` : ""}
          </p>
        </div>
        <Badge tone={view.tone}>{view.label}</Badge>
      </div>
      {standing ? (
        <div className="space-y-4 rounded-3xl border border-border-button-default bg-background-primary-default p-4">
          <p className="text-body-regular text-text-secondary">{STANDING_ASK[standing]}</p>
          {(messages ?? []).length > 0 && <Thread messages={(messages ?? []) as ThreadMessage[]} viewer="client" />}
          {canReply && (
            <div className="border-t border-separator-border pt-4">
              <StandingUpload requestId={id} kind={standing} />
            </div>
          )}
        </div>
      ) : (
      <div className="rounded-3xl border border-border-button-default bg-background-primary-default p-4">
        <Thread messages={(messages ?? []) as ThreadMessage[]} viewer="client" />
        {canReply && (
          <div className="mt-6 border-t border-separator-border pt-4">
            <ReplyForm requestId={id} placeholder={r.direction === "to_client" ? "Reply, or attach the documents we asked for…" : "Add to your question…"} />
          </div>
        )}
      </div>
      )}
      {canReply && r.direction === "from_client" && (
        <div className="flex justify-end"><CloseRequestButton requestId={id} label="Mark as resolved" /></div>
      )}
    </div>
  );
}
