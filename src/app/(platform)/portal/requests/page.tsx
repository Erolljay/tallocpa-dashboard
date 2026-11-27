import Link from "next/link";
import { Suspense } from "react";
import { Badge, Skeleton } from "@/components/ui";
import { statusFor, type Direction, type RequestStatus } from "@/lib/requests/labels";
import { accessNote, canAct } from "@/lib/contacts/access";
import { portalContext } from "../client-context";
import { TicketForm } from "./ticket-form";

export default function PortalRequests() {
  return (
    <Suspense fallback={<Skeleton rows={5} />}>
      <Requests />
    </Suspense>
  );
}

interface Row {
  id: string;
  client_id: string;
  direction: Direction;
  subject: string;
  status: RequestStatus;
  due_date: string | null;
  standing_kind: string | null;
  updated_at: string;
  registration_steps: { label: string } | null;
}

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "Asia/Manila" }).format(new Date(iso));

/** Requests from the firm (e.g. documents for a registration step) and the client's own tickets; what needs the client first. */
async function Requests() {
  const { supabase, clients } = await portalContext();
  const { data } = await supabase
    .from("client_requests")
    .select("id, client_id, direction, subject, status, due_date, standing_kind, updated_at, registration_steps(label)")
    .in("client_id", clients.map((c) => c.id))
    .order("updated_at", { ascending: false })
    .limit(100);
  const nameOf = new Map(clients.map((c) => [c.id, c.name]));
  const rows = ((data ?? []) as unknown as Row[]).map((r) => ({ ...r, view: statusFor("client", r.direction, r.status) }));
  // Waiting on the contact only where they may answer (view-only contacts cannot).
  const answerable = new Set(clients.filter((c) => canAct(c.access)).map((c) => c.id));
  const needed = rows.filter((r) => r.view.actionNeeded && answerable.has(r.client_id));
  const rest = rows.filter((r) => !needed.includes(r));

  const list = (items: typeof rows) => (
    <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default text-body-regular">
      {items.map((r) => (
        <li key={r.id}>
          <Link href={`/portal/requests/${r.id}`} className="flex items-start justify-between gap-3 px-4 py-3 outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring first:rounded-t-3xl last:rounded-b-3xl pointer-coarse:min-h-14">
            <span className="min-w-0">
              <span className="block text-body-medium text-text-primary">{r.subject}</span>
              <span className="block text-caption-1-regular text-text-tertiary">
                {r.standing_kind ? "Every month" : r.direction === "to_client" ? "From us" : "Your question"}
                {r.registration_steps ? ` · for ${r.registration_steps.label}` : ""}
                {r.due_date && r.status !== "closed" ? ` · needed by ${r.due_date}` : ""}
                {clients.length > 1 ? ` · ${nameOf.get(r.client_id)}` : ""}
                {` · ${when(r.updated_at)}`}
              </span>
            </span>
            <span className="shrink-0"><Badge tone={r.view.tone}>{r.view.label}</Badge></span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-title-1-medium text-text-primary">Requests</h1>
      {needed.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-headline-medium text-text-primary">Needs your reply</h2>
          {list(needed)}
        </section>
      )}
      <section className="space-y-3">
        <h2 className="text-headline-medium text-text-primary">Ask us something</h2>
        <div className="rounded-3xl border border-border-button-default bg-background-primary-default p-4">
          {clients.some((c) => canAct(c.access)) ? (
            <TicketForm clients={clients.filter((c) => canAct(c.access)).map((c) => ({ id: c.id, name: c.name }))} />
          ) : (
            <p className="text-body-regular text-text-secondary">{accessNote("viewer", "act")}</p>
          )}
        </div>
      </section>
      {rest.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-headline-medium text-text-primary">Earlier</h2>
          {list(rest)}
        </section>
      )}
      {rows.length === 0 && (
        <p className="text-body-regular text-text-secondary">When we need documents from you, they will show here.</p>
      )}
    </div>
  );
}
