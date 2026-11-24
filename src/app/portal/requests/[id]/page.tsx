import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RiArrowLeftSLine } from "@remixicon/react";
import { Badge, Skeleton } from "@/components/ui";
import { CloseRequestButton, ReplyForm } from "@/components/requests/reply-form";
import { Thread, type ThreadMessage } from "@/components/requests/thread";
import { statusFor, type Direction, type RequestStatus } from "@/lib/requests/labels";
import { portalContext } from "../../client-context";

export default function PortalRequest(props: PageProps<"/portal/requests/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={5} />}>
      <RequestDetail params={props.params} />
    </Suspense>
  );
}

async function RequestDetail({ params }: Pick<PageProps<"/portal/requests/[id]">, "params">) {
  const { id } = await params;
  const { supabase } = await portalContext();
  const { data: r } = await supabase
    .from("client_requests")
    .select("id, direction, subject, status, due_date, registration_steps(label)")
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
  const isOpen = r.status !== "closed";

  return (
    <div className="space-y-5">
      <Link href="/portal/requests" className="inline-flex items-center gap-1 text-body-medium text-text-secondary hover:text-text-primary">
        <RiArrowLeftSLine aria-hidden className="size-5 rtl:rotate-180" /> Requests
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-title-2-medium text-text-primary">{r.subject}</h1>
          <p className="text-body-regular text-text-secondary">
            {step ? `For your registration: ${step.label}` : r.direction === "to_client" ? "From us" : "Your question"}
            {r.due_date && isOpen ? ` · needed by ${r.due_date}` : ""}
          </p>
        </div>
        <Badge tone={view.tone}>{view.label}</Badge>
      </div>
      <div className="rounded-3xl border border-border-button-default bg-background-primary-default p-4">
        <Thread messages={(messages ?? []) as ThreadMessage[]} viewer="client" />
        {isOpen && (
          <div className="mt-6 border-t border-separator-border pt-4">
            <ReplyForm requestId={id} placeholder={r.direction === "to_client" ? "Reply, or attach the documents we asked for…" : "Add to your question…"} />
          </div>
        )}
      </div>
      {isOpen && r.direction === "from_client" && (
        <div className="flex justify-end"><CloseRequestButton requestId={id} label="Mark as resolved" /></div>
      )}
    </div>
  );
}
