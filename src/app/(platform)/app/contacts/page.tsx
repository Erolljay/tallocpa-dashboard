import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, Input, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { ACCESS_LABEL, ACCESS_TONE } from "@/lib/contacts/access";
import { contactMatches, loadContacts } from "@/lib/contacts/load";
import { supabaseServer } from "@/lib/supabase/server";
import { SectionTabs } from "@/app/(platform)/app/nav/section-tabs";
import { NewContactForm } from "./forms";

export default function ContactsPage(props: PageProps<"/app/contacts">) {
  return (
    <Suspense fallback={<><PageHeader title="Contacts" /><Skeleton rows={6} /></>}>
      <Contacts searchParams={props.searchParams} />
    </Suspense>
  );
}

const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "Asia/Manila" });

async function Contacts({ searchParams }: Pick<PageProps<"/app/contacts">, "searchParams">) {
  const me = await requireStaff();
  const { q } = await searchParams;
  const search = typeof q === "string" ? q : "";
  const isOwner = me.staff.role === "owner";
  const supabase = await supabaseServer();
  const [contacts, { data: clients }] = await Promise.all([
    loadContacts(supabase),
    isOwner ? supabase.from("clients").select("id, name").in("status", ["onboarding", "active"]).order("name") : Promise.resolve({ data: [] as { id: string; name: string }[] }),
  ]);
  const shown = contacts.filter((c) => contactMatches(c, search));

  return (
    <>
      <PageHeader
        title="Contacts"
        description={
          isOwner
            ? "The people on the client's side who sign in to the portal: one login per email, the businesses each one sees, and what they may do in each."
            : "Portal contacts of the clients assigned to you."
        }
      />
      <SectionTabs section="clients" active="contacts" />
      <div className="space-y-6">
        {isOwner && (
          <Card title="New contact">
            <NewContactForm businesses={clients ?? []} />
          </Card>
        )}

        <form role="search" className="max-w-sm">
          <label htmlFor="contacts_q" className="sr-only">Search contacts</label>
          <Input id="contacts_q" name="q" type="search" defaultValue={search} placeholder="Search name, email or business" />
        </form>

        {shown.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-10 text-center">
            <p className="text-body-medium text-text-primary">{search ? "No contact matches that search" : "No contacts yet"}</p>
            <p className="mt-1 text-body-regular text-text-secondary">{search ? "Try a name, an email or a business." : "Add the client's contact person above, or from the client's page."}</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
            <table className="w-full min-w-[44rem] text-body-regular">
              <thead className="border-b border-separator-border bg-background-secondary-default text-body-medium text-text-tertiary">
                <tr>
                  <th scope="col" className="px-4 py-3 text-start">Contact</th>
                  <th scope="col" className="px-4 py-3 text-start">Businesses and access</th>
                  <th scope="col" className="px-4 py-3 text-start">Last sign-in</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((c) => (
                  <tr key={c.userId} className="border-t border-separator-border align-top transition-colors first:border-t-0 hover:bg-background-secondary-hover">
                    <td className="px-4 py-3">
                      <Link href={`/app/contacts/${c.userId}`} className="text-body-medium text-text-primary hover:underline">{c.fullName}</Link>
                      <p className="text-caption-1-regular text-text-tertiary"><bdi dir="ltr">{c.email ?? "—"}</bdi></p>
                    </td>
                    <td className="px-4 py-3">
                      <ul className="flex flex-col gap-1.5">
                        {c.businesses.map((b) => (
                          <li key={b.clientId} className="flex flex-wrap items-center gap-2">
                            <span className="text-text-primary">{b.clientName}</span>
                            <Badge tone={ACCESS_TONE[b.access]}>{ACCESS_LABEL[b.access]}</Badge>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{c.lastSignInAt ? when.format(new Date(c.lastSignInAt)) : "Not yet"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
