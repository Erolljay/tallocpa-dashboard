import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RiArrowLeftSLine } from "@remixicon/react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { ACCESS_HINT, ACCESS_LABEL, ACCESS_TONE, CONTACT_ACCESS, isContactAccess } from "@/lib/contacts/access";
import { loadContacts } from "@/lib/contacts/load";
import { supabaseServer } from "@/lib/supabase/server";
import { SectionTabs } from "@/app/(platform)/app/nav/section-tabs";
import { AccessRowForm, AddBusinessForm, ContactDetailsForm, RemoveBusinessButton } from "../forms";

export default function ContactPage(props: PageProps<"/app/contacts/[userId]">) {
  return (
    <Suspense fallback={<><PageHeader title="Contact" /><Skeleton rows={6} /></>}>
      <Contact params={props.params} />
    </Suspense>
  );
}

const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" });
const day = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "Asia/Manila" });

interface AuditRow {
  id: number;
  at: string;
  actor: string | null;
  action: "INSERT" | "UPDATE" | "DELETE";
  old_row: { client_id?: string; access?: string; position?: string | null } | null;
  new_row: { client_id?: string; access?: string; position?: string | null } | null;
}

async function Contact({ params }: Pick<PageProps<"/app/contacts/[userId]">, "params">) {
  const { userId } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(userId)) notFound();
  const me = await requireStaff();
  const isOwner = me.staff.role === "owner";
  const supabase = await supabaseServer();
  const [contact] = await loadContacts(supabase, userId);
  if (!contact) notFound();
  const linked = new Set(contact.businesses.map((b) => b.clientId));
  const [{ data: clients }, { data: history }] = await Promise.all([
    isOwner ? supabase.from("clients").select("id, name").in("status", ["onboarding", "active"]).order("name") : Promise.resolve({ data: [] as { id: string; name: string }[] }),
    // Who gave, changed or removed access, and when (the Owner reads the audit log).
    isOwner
      ? supabase.from("audit_log").select("id, at, actor, action, old_row, new_row").eq("table_name", "client_users").eq("row_pk", userId).order("at", { ascending: false }).limit(50)
      : Promise.resolve({ data: [] as AuditRow[] }),
  ]);
  const events = (history ?? []) as AuditRow[];
  const actorIds = [...new Set(events.map((e) => e.actor).filter((a): a is string => !!a))];
  const historyClientIds = [...new Set(events.map((e) => e.new_row?.client_id ?? e.old_row?.client_id).filter((c): c is string => !!c))];
  const [{ data: actors }, { data: historyClients }] = await Promise.all([
    actorIds.length ? supabase.from("staff_profiles").select("user_id, full_name").in("user_id", actorIds) : Promise.resolve({ data: [] as { user_id: string; full_name: string }[] }),
    historyClientIds.length ? supabase.from("clients").select("id, name").in("id", historyClientIds) : Promise.resolve({ data: [] as { id: string; name: string }[] }),
  ]);
  const actorOf = new Map((actors ?? []).map((a) => [a.user_id, a.full_name]));
  const clientOf = new Map((historyClients ?? []).map((c) => [c.id, c.name]));
  const levelOf = (v: string | undefined) => (isContactAccess(v) ? ACCESS_LABEL[v] : "Full access");

  const describe = (e: AuditRow): string | null => {
    const business = clientOf.get(e.new_row?.client_id ?? e.old_row?.client_id ?? "") ?? "a business";
    if (e.action === "INSERT") return `Given ${levelOf(e.new_row?.access).toLowerCase()} to ${business}`;
    if (e.action === "DELETE") return `Access to ${business} removed`;
    const changes: string[] = [];
    if ((e.old_row?.access ?? "full") !== (e.new_row?.access ?? "full")) changes.push(`${levelOf(e.old_row?.access)} → ${levelOf(e.new_row?.access)}`);
    if ((e.old_row?.position ?? null) !== (e.new_row?.position ?? null)) changes.push(`position ${e.new_row?.position ? `“${e.new_row.position}”` : "cleared"}`);
    return changes.length ? `${business}: ${changes.join(", ")}` : null;
  };
  const described = events.map((e) => ({ e, text: describe(e) })).filter((x): x is { e: AuditRow; text: string } => x.text !== null);

  return (
    <>
      <Link href="/app/contacts" className="mb-2 inline-flex items-center gap-1 text-body-medium text-text-secondary hover:text-text-primary">
        <RiArrowLeftSLine aria-hidden className="size-5 rtl:rotate-180" /> Contacts
      </Link>
      <PageHeader
        title={contact.fullName}
        description={
          <>
            <bdi dir="ltr">{contact.email ?? "—"}</bdi>
            {contact.mobile && <>{" · "}<bdi dir="ltr">{contact.mobile}</bdi></>}
            {" · "}
            {contact.lastSignInAt ? `last signed in ${when.format(new Date(contact.lastSignInAt))}` : "has not signed in yet"}
          </>
        }
      />
      <SectionTabs section="clients" active="contacts" />
      <div className="space-y-6">
        <Card title="Businesses this contact can see">
          <div className="-mx-1 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-body-regular">
              <thead className="border-b border-separator-border text-body-medium text-text-tertiary">
                <tr>
                  <th scope="col" className="px-1 py-2 text-start">Business</th>
                  <th scope="col" className="px-1 py-2 text-start">{isOwner ? "Position and access" : "Access"}</th>
                  {isOwner && <th scope="col" className="px-1 py-2 text-end"><span className="sr-only">Remove</span></th>}
                </tr>
              </thead>
              <tbody>
                {contact.businesses.map((b) => (
                  <tr key={b.clientId} className="border-t border-separator-border align-middle first:border-t-0">
                    <td className="px-1 py-3">
                      <Link href={`/app/clients/${b.clientId}`} className="text-body-medium text-text-primary hover:underline">{b.clientName}</Link>
                      <p className="text-caption-1-regular text-text-tertiary">{b.clientCode} · since {day.format(new Date(b.since))}</p>
                    </td>
                    <td className="px-1 py-3">
                      {isOwner ? (
                        <AccessRowForm userId={contact.userId} clientId={b.clientId} clientName={b.clientName} position={b.position} access={b.access} />
                      ) : (
                        <span className="flex flex-wrap items-center gap-2">
                          <Badge tone={ACCESS_TONE[b.access]}>{ACCESS_LABEL[b.access]}</Badge>
                          {b.position && <span className="text-text-secondary">{b.position}</span>}
                        </span>
                      )}
                    </td>
                    {isOwner && (
                      <td className="px-1 py-3 text-end">
                        <RemoveBusinessButton userId={contact.userId} clientId={b.clientId} clientName={b.clientName} />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className="mt-4 grid gap-2 border-t border-separator-border pt-4 sm:grid-cols-3">
            {CONTACT_ACCESS.map((a) => (
              <div key={a}>
                <dt><Badge tone={ACCESS_TONE[a]}>{ACCESS_LABEL[a]}</Badge></dt>
                <dd className="mt-1 text-caption-1-regular text-text-secondary">{ACCESS_HINT[a]}</dd>
              </div>
            ))}
          </dl>
        </Card>

        {isOwner && (
          <Card title="Give access to another business">
            <AddBusinessForm userId={contact.userId} businesses={(clients ?? []).filter((c) => !linked.has(c.id))} />
          </Card>
        )}

        {isOwner && (
          <Card title="Details">
            <ContactDetailsForm userId={contact.userId} fullName={contact.fullName} mobile={contact.mobile} />
          </Card>
        )}

        {isOwner && (
          <Card title="Access history">
            {described.length === 0 ? (
              <p className="text-body-regular text-text-secondary">No changes recorded yet.</p>
            ) : (
              <ol className="divide-y divide-separator-border text-body-regular">
                {described.map(({ e, text }) => (
                  <li key={e.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2">
                    <span className="text-text-primary">{text}</span>
                    <span className="text-caption-1-regular text-text-tertiary">
                      {when.format(new Date(e.at))}{e.actor ? ` · ${actorOf.get(e.actor) ?? "Staff"}` : ""}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </Card>
        )}
      </div>
    </>
  );
}
