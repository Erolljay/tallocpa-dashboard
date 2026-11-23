import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface StatementLine {
  id: string;
  kind: string;
  description: string;
  due_on: string;
  amount: number;
  paid: number;
  open: number;
  waived: boolean;
}

export interface PayAccount {
  id: string;
  kind: "bank" | "ewallet";
  institution: string;
  account_name: string;
  account_number: string;
  purpose: "fees" | "client_tax_funds";
  instructions: string | null;
  qrUrl: string | null;
}

export interface Statement {
  soa: { id: string; reference: string; billing_date: string; due_on: string };
  client: { id: string; name: string; code: string; tin: string | null; registered_address: string | null };
  brand: { display_name: string; legal_name: string; tin: string | null };
  lines: StatementLine[];
  /** Still open on earlier statements. */
  earlierOpen: number;
  /** Unused overpayments. */
  credit: number;
  thisOpen: number;
  totalDue: number;
  /** Whether part of what is open is tax money, which goes to the client tax funds account. */
  hasTax: boolean;
  accounts: PayAccount[];
}

/** Everything a statement shows. RLS decides who may read it (Owner, the client's own users). */
export async function loadStatement(supabase: SupabaseClient, soaId: string): Promise<Statement | null> {
  const { data: soa } = await supabase.from("soas").select("id, reference, billing_date, due_on, client_id").eq("id", soaId).maybeSingle();
  if (!soa) return null;
  const [{ data: client }, { data: dues }, { data: credits }] = await Promise.all([
    supabase.from("clients").select("id, name, code, tin, registered_address, brand_id").eq("id", soa.client_id).single(),
    supabase.from("due_balances").select("id, soa_id, kind, description, due_on, amount, paid, open_amount, waived_at").eq("client_id", soa.client_id).order("due_on"),
    supabase.from("deposit_balances").select("unallocated").eq("client_id", soa.client_id).gt("unallocated", 0),
  ]);
  if (!client) return null;
  const [{ data: brand }, { data: accounts }] = await Promise.all([
    supabase.from("brands").select("display_name, legal_name, tin").eq("id", client.brand_id).single(),
    supabase.from("brand_payment_accounts").select("id, kind, institution, account_name, account_number, purpose, instructions, qr_path, sort_order").eq("brand_id", client.brand_id).eq("active", true).order("sort_order").order("institution"),
  ]);

  const all = dues ?? [];
  const lines: StatementLine[] = all
    .filter((d) => d.soa_id === soa.id)
    .map((d) => ({ id: d.id, kind: d.kind, description: d.description, due_on: d.due_on, amount: Number(d.amount), paid: Number(d.paid), open: Number(d.open_amount), waived: Boolean(d.waived_at) }));
  const earlierOpen = all.filter((d) => d.soa_id && d.soa_id !== soa.id && Number(d.open_amount) > 0).reduce((s, d) => s + Number(d.open_amount), 0);
  const thisOpen = lines.reduce((s, l) => s + l.open, 0);
  const credit = (credits ?? []).reduce((s, c) => s + Number(c.unallocated), 0);
  const hasTax = all.some((d) => d.soa_id && d.kind === "tax" && Number(d.open_amount) > 0);

  const rows = accounts ?? [];
  const paths = rows.map((a) => a.qr_path).filter((p): p is string => Boolean(p));
  const signed = new Map<string, string>();
  if (paths.length) {
    const { data } = await supabase.storage.from("payment-qr").createSignedUrls(paths, 3600);
    for (const s of data ?? []) if (s.path && s.signedUrl) signed.set(s.path, s.signedUrl);
  }

  return {
    soa: { id: soa.id, reference: soa.reference, billing_date: soa.billing_date, due_on: soa.due_on },
    client: { id: client.id, name: client.name, code: client.code, tin: client.tin, registered_address: client.registered_address },
    brand: brand ?? { display_name: "Tallo CPA", legal_name: "", tin: null },
    lines,
    earlierOpen,
    credit,
    thisOpen,
    totalDue: Math.round((thisOpen + earlierOpen) * 100) / 100,
    hasTax,
    accounts: rows.map((a) => ({
      id: a.id,
      kind: a.kind,
      institution: a.institution,
      account_name: a.account_name,
      account_number: a.account_number,
      purpose: a.purpose,
      instructions: a.instructions,
      qrUrl: a.qr_path ? (signed.get(a.qr_path) ?? null) : null,
    })),
  };
}
