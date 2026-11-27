"use server";

import { requireStaff } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";

export type SearchKind = "client" | "contact" | "party" | "request" | "task" | "lead";

export interface SearchHit {
  kind: SearchKind;
  id: string;
  title: string;
  detail: string | null;
  href: string;
}

const PER_KIND = 6;

/**
 * The ⌘K search: clients, contacts, customers & suppliers, requests, tasks and
 * (for the Owner and reviewers) leads. Runs as the signed-in staff member, so
 * row-level security decides what each person finds: a preparer only finds the
 * clients assigned to them and what hangs off those clients.
 */
export async function globalSearch(raw: string): Promise<SearchHit[]> {
  const me = await requireStaff();
  // PostgREST `or()` filters: strip its syntax characters and LIKE wildcards.
  const q = raw.replace(/[,()*%\\"'.:]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);
  if (q.length < 2) return [];
  const like = `*${q}*`;
  const digits = q.replace(/\D/g, "");
  const tinLike = /^[\d\s-]+$/.test(q) && digits.length >= 3 ? [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 9), digits.slice(9)].filter(Boolean).join("-") : null;
  const seesLeads = me.staff.role === "owner" || me.staff.role === "reviewer";
  const supabase = await supabaseServer();

  const [clients, contacts, parties, requests, tasks, leads] = await Promise.all([
    supabase
      .from("clients")
      .select("id, name, code, tin, status")
      .or(tinLike ? `tin.like.${tinLike}*,code.ilike.${like}` : `name.ilike.${like},code.ilike.${like},tin.ilike.${like}`)
      .order("name")
      .limit(PER_KIND),
    tinLike
      ? Promise.resolve({ data: [] })
      : supabase.from("client_users").select("user_id, full_name, position, clients(name)").ilike("full_name", like).order("full_name").limit(PER_KIND * 2),
    supabase
      .from("parties")
      .select("id, display_name, trade_name, tin")
      .or(tinLike ? `tin.like.${tinLike}*` : `display_name.ilike.${like},trade_name.ilike.${like}`)
      .order("display_name")
      .limit(PER_KIND),
    tinLike
      ? Promise.resolve({ data: [] })
      : supabase.from("client_requests").select("id, subject, direction, status, clients(name)").ilike("subject", like).order("updated_at", { ascending: false }).limit(PER_KIND),
    tinLike
      ? Promise.resolve({ data: [] })
      : supabase.from("staff_tasks").select("id, title, status, clients(name)").ilike("title", like).order("created_at", { ascending: false }).limit(PER_KIND),
    seesLeads && !tinLike
      ? supabase.from("leads").select("id, business_name, contact_name, stage").or(`business_name.ilike.${like},contact_name.ilike.${like}`).order("stage_changed_at", { ascending: false }).limit(PER_KIND)
      : Promise.resolve({ data: [] }),
  ]);

  const hits: SearchHit[] = [];
  for (const c of (clients.data ?? []) as { id: string; name: string; code: string; tin: string | null }[]) {
    hits.push({ kind: "client", id: c.id, title: c.name, detail: [c.code, c.tin].filter(Boolean).join(" · "), href: `/app/clients/${c.id}` });
  }
  // One row per person, though they may be linked to several businesses.
  const people = new Map<string, SearchHit>();
  for (const c of (contacts.data ?? []) as unknown as { user_id: string; full_name: string; position: string | null; clients: { name: string } | null }[]) {
    const seen = people.get(c.user_id);
    if (seen) seen.detail = `${seen.detail} +1`;
    else if (people.size < PER_KIND) people.set(c.user_id, { kind: "contact", id: c.user_id, title: c.full_name, detail: [c.position, c.clients?.name].filter(Boolean).join(" · ") || null, href: `/app/contacts/${c.user_id}` });
  }
  hits.push(...people.values());
  for (const p of (parties.data ?? []) as { id: string; display_name: string; trade_name: string | null; tin: string | null }[]) {
    hits.push({ kind: "party", id: p.id, title: p.display_name, detail: [p.trade_name, p.tin].filter(Boolean).join(" · ") || null, href: `/app/parties/${p.id}` });
  }
  for (const r of (requests.data ?? []) as unknown as { id: string; subject: string; direction: string; status: string; clients: { name: string } | null }[]) {
    hits.push({ kind: "request", id: r.id, title: r.subject, detail: [r.direction === "to_client" ? "Request" : "Ticket", r.clients?.name, r.status === "closed" ? "Closed" : null].filter(Boolean).join(" · "), href: `/app/requests/${r.id}` });
  }
  for (const t of (tasks.data ?? []) as unknown as { id: string; title: string; status: string; clients: { name: string } | null }[]) {
    hits.push({ kind: "task", id: t.id, title: t.title, detail: [t.clients?.name, t.status === "done" ? "Done" : null].filter(Boolean).join(" · ") || null, href: `/app/tasks/${t.id}` });
  }
  for (const l of (leads.data ?? []) as { id: string; business_name: string | null; contact_name: string | null; stage: string }[]) {
    hits.push({ kind: "lead", id: l.id, title: l.business_name || l.contact_name || "Lead", detail: l.business_name ? l.contact_name : null, href: `/app/leads/${l.id}` });
  }
  return hits;
}
