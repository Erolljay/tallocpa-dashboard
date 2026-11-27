import "server-only";
import { manilaToday } from "@/lib/filings/run";
import { isBy2307, parsePeriod2307, portalPeriods, quarterValue, type By2307 } from "@/lib/books/form-2307";
import { load2307 } from "@/lib/books/load-2307";
import { portalContext } from "../../client-context";

type SearchParams = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/**
 * A client user's 2307s: which business (?client=), the period (?period=, only fully
 * locked quarters and locked months are offered), per quarter / month / transaction
 * (?by=) and the supplier (?supplier=). books_2307_data() itself gives a client user only
 * the invoices of locked months.
 */
export async function portal2307(sp: SearchParams) {
  const { supabase, clients, all } = await portalContext();
  // A link to any linked business opens it, even when another business is selected.
  const client = all.find((c) => c.id === one(sp.client)) ?? clients[0] ?? null;
  if (!client) return { clients, client: null, periods: [], set: null, by: "quarter" as By2307, supplier: null };
  const rawBy = one(sp.by);
  const supplier = one(sp.supplier) || null;
  const asked = parsePeriod2307(one(sp.period));

  // The locked months come with any period's data: ask for the requested one (or this quarter) first.
  let set = await load2307(supabase, client.id, asked ?? parsePeriod2307(quarterValue(manilaToday().slice(0, 7)))!, "quarter", supplier);
  const periods = set ? portalPeriods(set.lockedMonths) : [];
  const period = periods.find((p) => p.value === asked?.value) ?? periods[0] ?? null;
  if (!set || !period) return { clients, client, periods, set: null, by: "quarter" as By2307, supplier };
  const by: By2307 = isBy2307(rawBy) && !(rawBy === "quarter" && period.kind === "month") ? rawBy : period.kind === "quarter" ? "quarter" : "month";
  set = await load2307(supabase, client.id, period, by, supplier);
  return { clients, client, periods, set, by, supplier };
}

export function portal2307Href(path: "" | "/print", p: { client: string; period: string; by: By2307; supplier?: string | null; form?: string }) {
  const q = new URLSearchParams({ client: p.client, period: p.period, by: p.by });
  if (p.supplier) q.set("supplier", p.supplier);
  if (p.form) q.set("form", p.form);
  return `/portal/reports/2307${path}?${q.toString()}`;
}
