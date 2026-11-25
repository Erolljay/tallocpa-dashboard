import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { FirmBlock } from "@/lib/brand/profile";
import { groupPaidItems, type AllocationRow, type PaidItem } from "./collections";

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

export type ProofStatus = "for_verification" | "verified" | "rejected";

export type ProofMethod = "transfer" | "check" | "deposit";

export interface PaymentProof {
  id: string;
  soa_id: string;
  /** The statement the client paid against. */
  soa_reference: string | null;
  status: ProofStatus;
  method: ProofMethod;
  amount: number;
  paid_on: string;
  reference: string | null;
  /** The bank or e-wallet the client says they paid to. */
  institution: string | null;
  file_name: string;
  mime_type: string;
  submitted_at: string;
  reviewed_at: string | null;
  reject_reason: string | null;
  fileUrl: string | null;
  /** Once verified: the items the payment was applied to (oldest first), from the allocation. */
  paidItems: PaidItem[];
  /** Verified, then the recorded deposit was voided by the Owner. */
  reversed: boolean;
}

/** What the client and the Owner call each payment status. */
export const PROOF_STATUS: Record<ProofStatus, { tone: "done" | "waiting" | "blocked"; label: string }> = {
  for_verification: { tone: "waiting", label: "Pending verification" },
  verified: { tone: "done", label: "Verified" },
  rejected: { tone: "blocked", label: "Rejected" },
};

/** Where a statement stands: Paid once nothing is open, For verification while a proof waits for the Owner. */
export type StatementStatus = "paid" | "for_verification" | "overdue" | "due";

export function statementStatus(open: number, pendingProofs: number, dueOn: string, today: string): StatementStatus {
  if (open <= 0) return "paid";
  if (pendingProofs > 0) return "for_verification";
  return dueOn < today ? "overdue" : "due";
}

export interface Statement {
  soa: { id: string; reference: string; billing_date: string; due_on: string };
  client: { id: string; name: string; code: string; tin: string | null; registered_address: string | null };
  /** The firm block in the header (spec §3.1); blanks are left out when printed. */
  brand: FirmBlock & { logoUrl: string | null; paymentDays: number };
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
  /** Proofs of payment the client uploaded for this statement, newest first. */
  proofs: PaymentProof[];
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
  const [{ data: brand }, { data: accounts }, proofs] = await Promise.all([
    supabase
      .from("brands")
      .select("display_name, legal_name, tin, tin_branch_code, registered_address, business_address, phone, reply_to_email, tax_on_fee, logo_path, soa_payment_days")
      .eq("id", client.brand_id)
      .single(),
    supabase.from("brand_payment_accounts").select("id, kind, institution, account_name, account_number, purpose, instructions, qr_path, sort_order").eq("brand_id", client.brand_id).eq("active", true).order("sort_order").order("institution"),
    loadPayments(supabase, { soaId: soa.id }),
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
  const [qr, logo] = await Promise.all([
    paths.length ? supabase.storage.from("payment-qr").createSignedUrls(paths, 3600) : null,
    brand?.logo_path ? supabase.storage.from("brand-files").createSignedUrl(brand.logo_path, 3600) : null,
  ]);
  for (const s of qr?.data ?? []) if (s.path && s.signedUrl) signed.set(s.path, s.signedUrl);

  return {
    soa: { id: soa.id, reference: soa.reference, billing_date: soa.billing_date, due_on: soa.due_on },
    client: { id: client.id, name: client.name, code: client.code, tin: client.tin, registered_address: client.registered_address },
    brand: {
      display_name: brand?.display_name ?? "Tallo CPA",
      legal_name: brand?.legal_name ?? "",
      tin: brand?.tin ?? null,
      tin_branch_code: brand?.tin_branch_code ?? null,
      registered_address: brand?.registered_address ?? null,
      business_address: brand?.business_address ?? null,
      phone: brand?.phone ?? null,
      reply_to_email: brand?.reply_to_email ?? null,
      tax_on_fee: brand?.tax_on_fee === "vat_12" ? "vat_12" : "percentage_tax_3",
      logoUrl: logo?.data?.signedUrl ?? null,
      paymentDays: brand?.soa_payment_days ?? 5,
    },
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
    proofs,
  };
}

type ProofRow = {
  id: string;
  soa_id: string;
  status: ProofStatus;
  method: ProofMethod;
  amount: string;
  paid_on: string;
  reference: string | null;
  file_name: string;
  mime_type: string;
  storage_path: string;
  submitted_at: string;
  reviewed_at: string | null;
  reject_reason: string | null;
  deposit_id: string | null;
  soas: { reference: string } | null;
  brand_payment_accounts: { institution: string } | null;
  client_deposits: { voided_at: string | null } | null;
};

/**
 * Payments (proofs of payment) for one statement or for whole businesses,
 * newest first, each with what a verified payment paid: the items the existing
 * allocation applied it to. RLS limits a client user to their own businesses.
 */
export async function loadPayments(supabase: SupabaseClient, where: { soaId: string } | { clientIds: string[] }, limit = 100): Promise<PaymentProof[]> {
  let query = supabase
    .from("payment_proofs")
    .select(
      "id, soa_id, status, method, amount, paid_on, reference, file_name, mime_type, storage_path, submitted_at, reviewed_at, reject_reason, deposit_id, soas(reference), brand_payment_accounts(institution), client_deposits(voided_at)",
    )
    .order("submitted_at", { ascending: false })
    .limit(limit);
  if ("soaId" in where) query = query.eq("soa_id", where.soaId);
  else {
    if (where.clientIds.length === 0) return [];
    query = query.in("client_id", where.clientIds);
  }
  const { data } = await query;
  const rows = (data ?? []) as unknown as ProofRow[];
  if (rows.length === 0) return [];

  const deposits = rows.map((r) => r.deposit_id).filter((d): d is string => Boolean(d));
  const [files, allocations] = await Promise.all([
    supabase.storage.from("payment-proofs").createSignedUrls(rows.map((r) => r.storage_path), 3600),
    deposits.length
      ? supabase.from("payment_allocations").select("deposit_id, due_id, amount, client_dues(description)").in("deposit_id", deposits).order("id")
      : null,
  ]);
  const fileUrl = new Map<string, string>();
  for (const f of files.data ?? []) if (f.path && f.signedUrl) fileUrl.set(f.path, f.signedUrl);
  const items = groupPaidItems((allocations?.data ?? []) as unknown as AllocationRow[]);

  return rows.map((r) => ({
    id: r.id,
    soa_id: r.soa_id,
    soa_reference: r.soas?.reference ?? null,
    status: r.status,
    method: r.method,
    amount: Number(r.amount),
    paid_on: r.paid_on,
    reference: r.reference,
    institution: r.brand_payment_accounts?.institution ?? null,
    file_name: r.file_name,
    mime_type: r.mime_type,
    submitted_at: r.submitted_at,
    reviewed_at: r.reviewed_at,
    reject_reason: r.reject_reason,
    fileUrl: fileUrl.get(r.storage_path) ?? null,
    paidItems: r.deposit_id ? (items.get(r.deposit_id) ?? []) : [],
    reversed: Boolean(r.client_deposits?.voided_at),
  }));
}
