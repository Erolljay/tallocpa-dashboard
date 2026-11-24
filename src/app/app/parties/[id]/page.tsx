import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { datNameCols, PARTY_COLUMNS, PARTY_KINDS, PARTY_ROLES, PARTY_SOURCES, partyTinLabel, type Party, type PartyRole } from "@/lib/parties/format";
import { branch4, tin9 } from "@/lib/parties/tin";
import { supabaseServer } from "@/lib/supabase/server";
import { MergeForm, PartyForm, PresetAccountForm, VerifyButton } from "../forms";

export default function PartyPage(props: PageProps<"/app/parties/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <PartyDetail params={props.params} />
    </Suspense>
  );
}

const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "Asia/Manila" }).format(new Date(d.length === 10 ? `${d}T00:00:00+08:00` : d));

async function PartyDetail({ params }: { params: PageProps<"/app/parties/[id]">["params"] }) {
  const { id } = await params;
  const me = await requireStaff();
  const isOwner = me.staff.role === "owner";
  const canVerify = isOwner || me.staff.role === "reviewer";
  const supabase = await supabaseServer();
  const { data } = await supabase.from("parties").select(PARTY_COLUMNS).eq("id", id).maybeSingle();
  if (!data) notFound();
  const party = data as unknown as Party;
  const [{ data: links }, { data: verifier }, { data: preset }] = await Promise.all([
    supabase.from("client_parties").select("client_id, role, first_seen, last_seen, clients(name, code)").eq("party_id", id).order("last_seen", { ascending: false }),
    party.verified_by ? supabase.from("staff_profiles").select("full_name").eq("user_id", party.verified_by).maybeSingle() : Promise.resolve({ data: null }),
    supabase.from("parties").select("preset_account_key").eq("id", id).maybeSingle(),
  ]);
  const verified = Boolean(party.verified_at);
  const locked = verified && !isOwner;
  const dat = datNameCols(party);

  return (
    <>
      <PageHeader
        title={party.display_name ?? partyTinLabel(party)}
        description={<span className="tabular-nums">TIN {partyTinLabel(party)} · {PARTY_KINDS[party.kind]}{party.trade_name ? ` · trading as ${party.trade_name}` : ""}</span>}
        actions={
          <div className="flex items-center gap-3">
            {verified ? <Badge tone="done">Verified</Badge> : <Badge tone="neutral">Not verified</Badge>}
            {canVerify && (!verified || isOwner) && <VerifyButton partyId={party.id} verified={verified} />}
          </div>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[3fr_2fr]">
        <Card title="Registered details">
          {verified && (
            <div className="mb-4">
              <Notice tone="done">
                Verified{verifier?.full_name ? ` by ${verifier.full_name}` : ""} on {fmtDate(party.verified_at!)} against a COR or 2307.
                {locked ? " Only the Owner can change it now." : ""}
              </Notice>
            </div>
          )}
          <PartyForm party={party} disabled={locked} />
          <p className="mt-4 text-caption-1-regular text-text-tertiary">Source: {PARTY_SOURCES[party.source]}.</p>
        </Card>

        <div className="space-y-6">
          <Card title="Clients dealing with this party">
            {(links ?? []).length === 0 ? (
              <p className="text-body-regular text-text-secondary">None of the clients you can see yet.</p>
            ) : (
              <ul className="divide-y divide-separator-border text-body-regular">
                {links!.map((l) => {
                  const c = l.clients as unknown as { name: string; code: string } | null;
                  return (
                    <li key={l.client_id} className="flex items-center justify-between gap-4 py-2">
                      <div>
                        <Link href={`/app/clients/${l.client_id}`} className="font-medium text-text-primary hover:underline">{c?.name}</Link>
                        <p className="text-caption-1-regular tabular-nums text-text-tertiary">{fmtDate(l.first_seen)} – {fmtDate(l.last_seen)}</p>
                      </div>
                      <span className="text-text-secondary">{PARTY_ROLES[l.role as PartyRole]}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>

          <Card title="Preset account title (books)">
            <PresetAccountForm partyId={party.id} value={preset?.preset_account_key ?? null} />
          </Card>

          <Card title="On BIR attachments">
            <dl className="grid grid-cols-[9rem_1fr] gap-x-4 gap-y-2 text-body-regular">
              <dt className="text-text-tertiary">TIN / branch</dt><dd className="tabular-nums text-text-primary">{tin9(party.tin)} / {branch4(party.branch_code)}</dd>
              <dt className="text-text-tertiary">Registered name</dt><dd className="text-text-primary">{dat.registeredName || "—"}</dd>
              <dt className="text-text-tertiary">Last, first, middle</dt><dd className="text-text-primary">{[dat.lastName, dat.firstName, dat.middleName].filter(Boolean).join(", ") || "—"}</dd>
            </dl>
          </Card>

          {isOwner && (
            <Card title="Merge a duplicate">
              <MergeForm partyId={party.id} />
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
