import "server-only";
/** Gathers the facts behind a client's onboarding checklist (src/lib/onboarding/checklist.ts). Runs as the signed-in staff member. */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { OnboardingFacts } from "./checklist";

export interface ClientFileRow {
  id: string;
  kind: "proposal" | "contract" | "other";
  title: string;
  file_name: string;
  signed_on: string | null;
  uploaded_by: string;
  created_at: string;
}

export async function loadOnboarding(db: SupabaseClient, clientId: string, fiscalYearEndMonth: number) {
  const count = (q: PromiseLike<{ count: number | null }>) => q.then((r) => r.count ?? 0);
  const [files, { data: ticks }, { data: eng }, { data: reg }, obligations, payrollOb, { data: team }, { data: users }, { data: books }, opening, batches, employees] = await Promise.all([
    db.from("client_files").select("id, kind, title, file_name, signed_on, uploaded_by, created_at").eq("client_id", clientId).order("created_at", { ascending: false }),
    db.from("onboarding_ticks").select("item, note, done_by, done_at").eq("client_id", clientId),
    db.from("engagements").select("id").eq("client_id", clientId).eq("status", "active").limit(1),
    db.from("client_registrations").select("tax_types").eq("client_id", clientId).limit(1).maybeSingle(),
    count(db.from("obligations").select("id", { count: "exact", head: true }).eq("client_id", clientId)),
    count(db.from("obligations").select("id", { count: "exact", head: true }).eq("client_id", clientId).eq("form", "1601-C")),
    db.from("staff_assignments").select("role").eq("client_id", clientId),
    db.from("client_users").select("user_id").eq("client_id", clientId),
    db.from("client_books").select("books_start").eq("client_id", clientId).maybeSingle(),
    count(db.from("journal_entries").select("id", { count: "exact", head: true }).eq("client_id", clientId).eq("source", "opening").eq("status", "posted")),
    count(db.from("batch_uploads").select("id", { count: "exact", head: true }).eq("client_id", clientId)),
    count(db.from("employees").select("id", { count: "exact", head: true }).eq("client_id", clientId)),
  ]);
  // Phase 2: a proposal accepted online is the client's proposal and signed contract.
  const { data: funnel } = await db
    .from("proposals")
    .select("token, accepted_at, accepted_name, accepted_position, monthly_retainer, leads!inner(client_id)")
    .eq("leads.client_id", clientId)
    .eq("status", "accepted")
    .order("accepted_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  const ids = (users ?? []).map((u) => u.user_id as string);
  const { data: emails } = ids.length ? await db.rpc("user_emails", { p_user_ids: ids }) : { data: [] };
  const fileRows = (files.data ?? []) as ClientFileRow[];
  const contracts = fileRows.filter((f) => f.kind === "contract");
  const facts: OnboardingFacts = {
    clientId,
    files: {
      proposal: fileRows.filter((f) => f.kind === "proposal").length + (funnel ? 1 : 0),
      contract: contracts.length + (funnel ? 1 : 0),
      contractSigned: Boolean(funnel) || contracts.some((f) => f.signed_on),
    },
    engagementActive: (eng ?? []).length > 0,
    corRecorded: ((reg?.tax_types as unknown[] | null) ?? []).length > 0,
    obligations,
    hasPayrollObligation: payrollOb > 0,
    preparer: (team ?? []).some((t) => t.role === "preparer"),
    reviewer: (team ?? []).some((t) => t.role === "reviewer"),
    portalUsers: ids.length,
    portalSignedIn: ((emails ?? []) as { last_sign_in_at: string | null }[]).some((e) => e.last_sign_in_at),
    booksStart: books ? String(books.books_start).slice(0, 10) : null,
    openingPosted: opening > 0,
    yearStartMonth: (fiscalYearEndMonth % 12) + 1,
    batchUploads: batches,
    employees,
    ticks: new Map(((ticks ?? []) as { item: string; note: string | null; done_by: string; done_at: string }[]).map((t) => [t.item, { by: t.done_by, at: String(t.done_at).slice(0, 10), note: t.note }])),
  };
  const accepted = funnel
    ? { token: funnel.token as string, acceptedAt: String(funnel.accepted_at), acceptedName: funnel.accepted_name as string, acceptedPosition: funnel.accepted_position as string | null }
    : null;
  return { facts, files: fileRows, accepted };
}
