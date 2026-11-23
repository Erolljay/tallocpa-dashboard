import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Badge, Button, Input, LinkButton, PageHeader, Select, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { PARTY_KINDS, VAT_STATUSES, partyTinLabel, type Party } from "@/lib/parties/format";
import { supabaseServer } from "@/lib/supabase/server";

export default function PartiesPage(props: PageProps<"/app/parties">) {
  return (
    <Suspense fallback={<><PageHeader title="Customers & suppliers" /><Skeleton rows={8} /></>}>
      <PartyList searchParams={props.searchParams} />
    </Suspense>
  );
}

const LIMIT = 200;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

type Row = Pick<Party, "id" | "tin" | "branch_code" | "kind" | "display_name" | "trade_name" | "vat_status" | "verified_at" | "source">;

async function PartyList({ searchParams }: Pick<PageProps<"/app/parties">, "searchParams">) {
  await requireStaff();
  const sp = await searchParams;
  const q = one(sp.q).trim();
  const kind = one(sp.kind);
  const vat = one(sp.vat);
  const verified = one(sp.verified);
  const clientId = one(sp.client);
  const supabase = await supabaseServer();

  const clientName = clientId ? (await supabase.from("clients").select("name").eq("id", clientId).maybeSingle()).data?.name ?? null : null;
  let query = supabase
    .from("parties")
    .select(`id, tin, branch_code, kind, display_name, trade_name, vat_status, verified_at, source${clientId ? ", client_parties!inner(client_id)" : ""}`)
    .order("display_name")
    .limit(LIMIT + 1);
  if (clientId) query = query.eq("client_parties.client_id", clientId);
  if (kind in PARTY_KINDS) query = query.eq("kind", kind);
  if (vat in VAT_STATUSES) query = query.eq("vat_status", vat);
  if (verified === "yes") query = query.not("verified_at", "is", null);
  if (verified === "no") query = query.is("verified_at", null);
  if (q) {
    const digits = q.replace(/\D/g, "");
    if (/^[\d\s-]+$/.test(q) && digits.length >= 3) {
      // TIN search: digits typed in any grouping match the dashed TIN from the start.
      const dashed = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 9)].filter(Boolean).join("-");
      query = query.like("tin", `${dashed}%`);
    } else {
      const safe = q.replace(/[,()*%\\]/g, " ").trim();
      if (safe) query = query.or(`display_name.ilike.*${safe}*,trade_name.ilike.*${safe}*`);
    }
  }
  const { data, error } = await query;
  if (error) throw error;
  const rows = (data ?? []) as unknown as Row[];
  const more = rows.length > LIMIT;

  return (
    <>
      <PageHeader
        title="Customers & suppliers"
        description={clientName ? `Parties ${clientName} deals with.` : "Every customer and supplier our clients deal with, by TIN. Registered names here go on the BIR attachments."}
        actions={<LinkButton href="/app/parties/new"><Plus aria-hidden className="size-4" />New party</LinkButton>}
      />
      <form className="mb-6 grid gap-3 sm:grid-cols-[1fr_10rem_10rem_10rem_auto] sm:items-end" role="search">
        {clientId && <input type="hidden" name="client" value={clientId} />}
        <div>
          <label htmlFor="q" className="sr-only">Search by TIN or name</label>
          <Input id="q" name="q" type="search" defaultValue={q} placeholder="TIN or name" />
        </div>
        <div>
          <label htmlFor="kind" className="sr-only">Kind</label>
          <Select id="kind" name="kind" defaultValue={kind}>
            <option value="">Any kind</option>
            {Object.entries(PARTY_KINDS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </Select>
        </div>
        <div>
          <label htmlFor="vat" className="sr-only">VAT status</label>
          <Select id="vat" name="vat" defaultValue={vat}>
            <option value="">Any VAT status</option>
            {Object.entries(VAT_STATUSES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </Select>
        </div>
        <div>
          <label htmlFor="verified" className="sr-only">Verified</label>
          <Select id="verified" name="verified" defaultValue={verified}>
            <option value="">Verified or not</option>
            <option value="yes">Verified</option>
            <option value="no">Not verified</option>
          </Select>
        </div>
        <Button type="submit" variant="secondary">Filter</Button>
      </form>
      {clientName && (
        <p className="mb-4 text-sm text-ink-muted">
          Showing {clientName}&rsquo;s parties. <Link href="/app/parties" className="text-link hover:underline">Show everyone</Link>
        </p>
      )}

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-10 text-center">
          <p className="font-medium text-ink-heading">No parties found</p>
          <p className="mt-1 text-sm text-ink-muted">Parties are added when a document is approved, or you can add one from its COR.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
          <table className="w-full min-w-[44rem] text-sm">
            <thead className="border-b border-border bg-surface-muted text-left text-xs text-ink-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Name</th>
                <th scope="col" className="px-4 py-3 font-medium">TIN</th>
                <th scope="col" className="px-4 py-3 font-medium">Kind</th>
                <th scope="col" className="px-4 py-3 font-medium">VAT</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, LIMIT).map((p) => (
                <tr key={p.id} className="border-t border-border transition-colors first:border-t-0 hover:bg-surface-muted">
                  <td className="px-4 py-3">
                    <Link href={`/app/parties/${p.id}`} className="font-medium text-ink-heading hover:underline">{p.display_name}</Link>
                    {p.trade_name && <p className="text-xs text-ink-subtle">{p.trade_name}</p>}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-ink-muted">{partyTinLabel(p)}</td>
                  <td className="px-4 py-3 text-ink-muted">{PARTY_KINDS[p.kind]}</td>
                  <td className="px-4 py-3 text-ink-muted">{VAT_STATUSES[p.vat_status]}</td>
                  <td className="px-4 py-3">{p.verified_at ? <Badge tone="done">Verified</Badge> : <Badge tone="neutral">Not verified</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {more && <p className="border-t border-border px-4 py-3 text-sm text-ink-muted">Showing the first {LIMIT}. Search to narrow the list.</p>}
        </div>
      )}
    </>
  );
}
