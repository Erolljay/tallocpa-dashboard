/**
 * The Payment Proof Clerk (migration 20270110000004, src/lib/payment-proof/; the Owner's
 * request: find the proof of payment of the taxes paid in the mailbox, match it to the
 * return, attach it as a PDF), end to end through the connector handler:
 *
 *   - the mailbox job's rows (UnionBank's real email, account number masked) are the
 *     Owner's; other staff, client contacts and AI employees cannot read the table;
 *   - its tools are listed only once granted; it lists the unmatched emails and reads
 *     one with the returns it may pay, best first (TIN and branch, client name, form,
 *     return period, amount to the centavo);
 *   - it saves a suggestion on the return (kind payment_proof); refused for another
 *     client's return, a return already filed with a payment reference, a nil return;
 *     the next run skips the email;
 *   - it cannot attach, record or change anything itself;
 *   - staff on the client then read the email and its PDF; one click attaches the PDF to
 *     the return, records the bank and BIR references and the date paid, and accepts the
 *     suggestion, without changing the return's status; Filed & paid then goes through the
 *     normal step; staff not assigned to the client cannot attach.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hashKey, newKey } from "../../src/lib/ai/credentials";
import { asAi, handleMcp } from "../../src/lib/mcp/handler";
import type { Connector } from "../../src/lib/mcp/types";
import { htmlToText, maskAccounts, readPaymentMail } from "../../src/lib/payment-proof/parse";
import { UNIONBANK_FROM, UNIONBANK_HTML, UNIONBANK_RECEIVED, UNIONBANK_SUBJECT } from "../../src/lib/payment-proof/fixtures";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "ai_payment_proof_clerk_test";

const OWNER = "00000000-0000-0000-0000-00000000d401";
const PREPARER = "00000000-0000-0000-0000-00000000d402";
const OTHER_STAFF = "00000000-0000-0000-0000-00000000d403";
const CLIENT_USER = "00000000-0000-0000-0000-00000000d404";
const CLERK = "00000000-0000-0000-0000-00000000d4a1";
const CHIEF = "00000000-0000-0000-0000-00000000d4a2";
// 4:00 PM, 10 November 2026 in Manila.
const NOW = new Date("2026-11-10T08:00:00Z");

describe.skipIf(!url)("AI Payment Proof Clerk: payment emails matched to returns, attached by people", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let conn: Connector;
  let charlie: string;
  let molo: string;
  const filing: Record<string, string> = {};
  const mail: Record<string, string> = {};
  const key = newKey();
  let id = 0;
  let draftId = "";

  type Reply = { result?: { isError?: boolean; structuredContent?: Record<string, unknown>; content: { text: string }[] }; error?: { message: string } };
  const call = async (name: string, args: Record<string, unknown> = {}) =>
    (await handleMcp(conn, { aiKey: "payment_proof_clerk", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/call", params: { name, arguments: args } }, now: NOW })).json as Reply;
  const ok = async (name: string, args: Record<string, unknown> = {}) => {
    const r = await call(name, args);
    expect(r.result?.isError, JSON.stringify(r)).toBeUndefined();
    return r.result!.structuredContent as Record<string, unknown>;
  };
  const refused = async (name: string, args: Record<string, unknown>) => {
    const r = await call(name, args);
    expect(r.result?.isError, JSON.stringify(r)).toBe(true);
    return r.result!.content[0].text;
  };
  async function as(user: string, sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r;
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  const addFiling = async (client: string, ob: string, label: string, start: string, end: string, due: string, status: string, taxDue: number, extra: string = "") =>
    (await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status, tax_due${extra ? ", payment_reference, paid_on, filing_reference, filed_on" : ""})
       values ($1, $2, '0619-E', $3, $4, $5, '0619E', $6, $6, $7, $8${extra ? ", $9, $6, 'FR-1', $6" : ""}) returning id`,
      [ob, client, label, start, end, due, status, taxDue, ...(extra ? [extra] : [])],
    )).rows[0].id as string;
  // What the mailbox job stores (src/lib/payment-proof/poll.ts): masked text, what was read, a PDF.
  const ingest = async (gmailId: string, subject: string, html: string) => {
    const text = maskAccounts(htmlToText(html));
    const extracted = readPaymentMail({ subject, text, receivedAt: UNIONBANK_RECEIVED });
    const pdf = `_payment-mail/${gmailId}.pdf`;
    await db.query(`insert into storage.objects (bucket_id, name) values ('filing-files', $1)`, [pdf]);
    return (await db.query(
      `insert into public.payment_mail (gmail_message_id, mailbox, received_at, sender, subject, channel, body_text, extracted, pdf_path, pdf_name, pdf_size, pdf_source)
       values ($1, 'owner@example.ph', $2, $3, $4, 'unionbank', $5, $6, $7, 'proof-of-payment.pdf', 2048, 'rendered') returning id`,
      [gmailId, UNIONBANK_RECEIVED, UNIONBANK_FROM, subject, text, JSON.stringify(extracted), pdf],
    )).rows[0].id as string;
  };

  beforeAll(async () => {
    await admin.connect();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.query(`create database ${DB_NAME}`);
    db = new Client({ connectionString: url!.replace(/^(postgres(?:ql)?:\/\/[^/]*\/)[^?]*/, `$1${DB_NAME}`) });
    await db.connect();
    await db.query(read("tests/supabase-stub.sql"));
    for (const f of readdirSync(path.join(root, "migrations")).sort()) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
    await db.query(read("seed.sql"));
    conn = { connect: async () => ({ query: (sql: string, params?: unknown[]) => db.query(sql, params), release: () => undefined }) } as unknown as Connector;

    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5), ($6)`, [OWNER, PREPARER, OTHER_STAFF, CLIENT_USER, CLERK, CHIEF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Preparer', 'staff'), ($3, $4, 'Other', 'staff')`,
      [OWNER, PREPARER, OTHER_STAFF, brand],
    );
    charlie = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, tin) values ($1, 'TC-9941', 'Charlie Sindol', 'individual', 'firm_remits', '180-359-760-000') returning id`, [brand])).rows[0].id;
    molo = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, tin) values ($1, 'TC-9942', 'Molo Foods Inc.', 'corporation', 'firm_remits', '123-456-789-000') returning id`, [brand])).rows[0].id;
    for (const c of [charlie, molo]) await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [c, PREPARER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Charlie')`, [CLIENT_USER, charlie]);

    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '0619-E', 'monthly', '2020-01-01') returning id`, [charlie])).rows[0].id;
    const moloOb = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '0619-E', 'monthly', '2020-01-01') returning id`, [molo])).rows[0].id;
    filing.oct = await addFiling(charlie, ob, "October 2026", "2026-10-01", "2026-10-31", "2026-11-10", "owner_approved", 20578.58);
    filing.sep = await addFiling(charlie, ob, "September 2026", "2026-09-01", "2026-09-30", "2026-10-12", "filed", 20578.58, "UB000001");
    filing.aug = await addFiling(charlie, ob, "August 2026", "2026-08-01", "2026-08-31", "2026-09-10", "client_approved", 0);
    filing.molo = await addFiling(molo, moloOb, "October 2026", "2026-10-01", "2026-10-31", "2026-11-10", "owner_approved", 20578.58);

    mail.charlie = await ingest("gm-charlie", UNIONBANK_SUBJECT, UNIONBANK_HTML);
    mail.molo = await ingest("gm-molo", "Successful Bills Payment (MOLO FOODS INC.)", UNIONBANK_HTML.replace("CHARLIE SINDOL", "MOLO FOODS INC.").replace("180359760", "123456789").replace("UB661855", "UB700001"));

    await db.query(
      `insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, books_level, enabled) values
         ($1, $3, 'payment_proof_clerk', 'Payment Proof Clerk', 'compliance', 'cowork', 'none', true),
         ($2, $3, 'chief_of_staff', 'Chief of Staff', 'managing_partner', 'cowork', 'summary', true)`,
      [CLERK, CHIEF, brand],
    );
    // The Clerk works Charlie only, so Molo's return is not its to suggest.
    await db.query(`insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2), ($3, $2)`, [CLERK, charlie, CHIEF]);
    await db.query(`insert into public.ai_credentials (ai_user_id, token_hash, token_hint, created_at, expires_at) values ($1, $2, right($3, 4), '2026-01-01', '2027-06-01')`, [CLERK, hashKey(key), key]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("keeps the mailbox's emails for the Owner, with the account number masked", async () => {
    const owner = (await as(OWNER, `select subject, body_text, extracted from public.payment_mail order by subject`)).rows;
    expect(owner).toHaveLength(2);
    expect(owner[0].body_text).toContain("**** 5831");
    expect(owner[0].body_text).not.toMatch(/0001 8002/);
    expect(owner[0].extracted).toMatchObject({ tin: "180-359-760-00000", form: "0619E", period_end: "2026-10-31", amount: 20578.58, bank_reference: "UB661855", bir_reference: "So202611101440361634313861" });
    for (const who of [PREPARER, OTHER_STAFF, CLIENT_USER, CLERK, CHIEF]) {
      expect((await as(who, `select count(*)::int as n from public.payment_mail`)).rows[0].n, who).toBe(0);
      expect((await as(who, `select count(*)::int as n from storage.objects where name like '\\_payment-mail/%'`)).rows[0].n, who).toBe(0);
    }
    expect((await as(OWNER, `select count(*)::int as n from storage.objects where name like '\\_payment-mail/%'`)).rows[0].n).toBe(2);
  });

  it("lists its tools only once the Owner grants them", async () => {
    expect((await call("payment_mail_to_match")).error?.message).toMatch(/Unknown tool/);
    await db.query(`insert into public.ai_tool_grants (ai_user_id, tool) values ($1, 'payment_mail_to_match'), ($1, 'read_payment_mail'), ($1, 'propose_payment_proof')`, [CLERK]);
    const r = await handleMcp(conn, { aiKey: "payment_proof_clerk", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/list" }, now: NOW });
    const tools = (r.json as { result: { tools: { name: string; annotations: { readOnlyHint: boolean } }[] } }).result.tools;
    expect(tools.map((t) => t.name).sort()).toEqual(["payment_mail_to_match", "propose_payment_proof", "read_payment_mail"]);
    expect(tools.find((t) => t.name === "propose_payment_proof")?.annotations.readOnlyHint).toBe(false);
  });

  it("lists the unmatched emails with what was read from them", async () => {
    const r = await ok("payment_mail_to_match");
    expect(r.already_suggested).toBe(0);
    const emails = r.emails as { id: string; subject: string; read: Record<string, unknown>; my_suggestion: string }[];
    expect(emails.map((e) => e.id).sort()).toEqual([mail.charlie, mail.molo].sort());
    expect(emails.find((e) => e.id === mail.charlie)?.read).toMatchObject({ client_name: "CHARLIE SINDOL", bank_reference: "UB661855" });
    expect(JSON.stringify(r)).not.toMatch(/0001 8002/);
  });

  it("reads an email with its client's returns it may pay, best first", async () => {
    const r = await ok("read_payment_mail", { mail_id: mail.charlie });
    expect(r.text).toContain("**** 5831");
    const candidates = r.candidates as { filing_id: string; matches: string[]; differences: string[] }[];
    expect(candidates[0].filing_id).toBe(filing.oct);
    expect(candidates[0].matches).toEqual(["TIN and branch", "client name in the subject", "form", "return period", "amount, to the centavo"]);
    // Not Molo's return (not its client), not September (filed with a payment reference).
    expect(candidates.map((c) => c.filing_id)).not.toContain(filing.molo);
    expect(candidates.map((c) => c.filing_id)).not.toContain(filing.sep);
    // Molo's email: no client of the Clerk has that TIN or name.
    const m = await ok("read_payment_mail", { mail_id: mail.molo });
    expect(m.note).toMatch(/No client of yours/);
    expect((m.candidates as { filing_id: string }[]).map((c) => c.filing_id)).toEqual([filing.oct]);
  });

  it("refuses another client's return, a filed one, a nil one, and an unknown email", async () => {
    expect(await refused("propose_payment_proof", { mail_id: mail.charlie, filing_id: filing.molo, confidence: "high", reason: "Testing what is refused." })).toMatch(/No return/);
    expect(await refused("propose_payment_proof", { mail_id: mail.charlie, filing_id: filing.sep, confidence: "high", reason: "Testing what is refused." })).toMatch(/already filed/);
    expect(await refused("propose_payment_proof", { mail_id: mail.charlie, filing_id: filing.aug, confidence: "low", reason: "Testing what is refused." })).toMatch(/nil return/);
    expect(await refused("propose_payment_proof", { mail_id: "00000000-0000-4000-8000-00000000d4ff", filing_id: filing.oct, confidence: "low", reason: "Testing what is refused." })).toMatch(/No unmatched payment email/);
    expect((await db.query(`select count(*)::int as n from public.ai_drafts`)).rows[0].n).toBe(0);
  });

  it("saves its suggestion on the return; the next run skips the email", async () => {
    const r = await ok("propose_payment_proof", { mail_id: mail.charlie, filing_id: filing.oct, confidence: "high", reason: "TIN, form, period and amount all match the October 0619-E." });
    draftId = r.draft_id as string;
    const { rows } = await db.query(`select kind, client_id, subject_table, subject_id, status, payload from public.ai_drafts`);
    expect(rows).toEqual([
      expect.objectContaining({ kind: "payment_proof", client_id: charlie, subject_table: "filing_instances", subject_id: filing.oct, status: "open" }),
    ]);
    expect(rows[0].payload).toMatchObject({ mail_id: mail.charlie, bank_reference: "UB661855", bir_reference: "So202611101440361634313861", paid_on: "2026-11-10", amount: 20578.58, confidence: "high" });
    const next = await ok("payment_mail_to_match");
    expect(next.already_suggested).toBe(1);
    expect((next.emails as { id: string }[]).map((e) => e.id)).toEqual([mail.molo]);
    const all = await ok("payment_mail_to_match", { include_suggested: true });
    expect((all.emails as { id: string; my_suggestion: string }[]).find((e) => e.id === mail.charlie)?.my_suggestion).toBe("open");
  });

  it("cannot attach, record or change anything itself", async () => {
    await expect(as(CLERK, `select public.attach_payment_proof($1, 'UB661855', '2026-11-10')`, [draftId])).rejects.toThrow(/Return not found/);
    await expect(as(CLERK, `select public.decide_ai_draft($1, true)`, [draftId])).rejects.toThrow(/Only staff/);
    const changed = await asAi(conn, CLERK, false, async (q) => [
      (await q.query(`update public.filing_instances set payment_reference = 'X' where id = $1 returning id`, [filing.oct])).rows.length,
      (await q.query(`update public.payment_mail set status = 'attached' returning id`)).rows.length,
    ]);
    expect(changed).toEqual([0, 0]);
    await expect(
      asAi(conn, CLERK, false, (q) => q.query(`insert into public.filing_files (filing_instance_id, client_id, kind, file_name, mime_type, size_bytes, storage_path) values ($1, $2, 'payment_proof', 'x.pdf', 'application/pdf', 1, '_payment-mail/gm-charlie.pdf')`, [filing.oct, charlie])),
    ).rejects.toThrow(/row-level security|permission denied/);
    // Other AI employees may not read the payment mailbox at all.
    await expect(as(CHIEF, `select * from public.ai_payment_mail()`)).rejects.toThrow(/Only the switched-on Payment Proof Clerk/);
    await expect(as(PREPARER, `select * from public.ai_payment_mail()`)).rejects.toThrow(/Only the switched-on Payment Proof Clerk/);
  });

  it("staff on the client read the suggested email and its PDF; others do not", async () => {
    expect((await as(PREPARER, `select id from public.payment_mail`)).rows.map((r) => r.id)).toEqual([mail.charlie]);
    expect((await as(PREPARER, `select name from storage.objects where name like '\\_payment-mail/%'`)).rows.map((r) => r.name)).toEqual(["_payment-mail/gm-charlie.pdf"]);
    expect((await as(OTHER_STAFF, `select count(*)::int as n from public.payment_mail`)).rows[0].n).toBe(0);
    expect((await as(CLIENT_USER, `select count(*)::int as n from public.payment_mail`)).rows[0].n).toBe(0);
  });

  it("one click attaches the PDF and records the payment; Filed & paid stays the person's step", async () => {
    await expect(as(OTHER_STAFF, `select public.attach_payment_proof($1, 'UB661855', '2026-11-10')`, [draftId])).rejects.toThrow(/Return not found/);
    await expect(as(PREPARER, `select public.attach_payment_proof($1, ' ', '2026-11-10')`, [draftId])).rejects.toThrow(/payment reference/);
    const fileId = (await as(PREPARER, `select public.attach_payment_proof($1, 'UB661855', '2026-11-10') as id`, [draftId])).rows[0].id;
    expect((await db.query(`select kind, storage_path, source, uploaded_by::text from public.filing_files where id = $1`, [fileId])).rows[0]).toEqual({
      kind: "payment_proof",
      storage_path: "_payment-mail/gm-charlie.pdf",
      source: "mailbox",
      uploaded_by: PREPARER,
    });
    expect((await db.query(`select status, filing_instance_id, client_id, payment_reference, bir_reference, paid_on::text, attached_by::text from public.payment_mail where id = $1`, [mail.charlie])).rows[0]).toEqual({
      status: "attached",
      filing_instance_id: filing.oct,
      client_id: charlie,
      payment_reference: "UB661855",
      bir_reference: "So202611101440361634313861",
      paid_on: "2026-11-10",
      attached_by: PREPARER,
    });
    expect((await db.query(`select status, decided_by::text from public.ai_drafts where id = $1`, [draftId])).rows[0]).toEqual({ status: "accepted", decided_by: PREPARER });
    expect((await db.query(`select status from public.filing_instances where id = $1`, [filing.oct])).rows[0].status).toBe("owner_approved");
    // Done once: the suggestion is decided and the email attached.
    await expect(as(PREPARER, `select public.attach_payment_proof($1, 'UB661855', '2026-11-10')`, [draftId])).rejects.toThrow(/already accepted/);
    // The email is gone from the Clerk's list; the client sees no proof file (staff only).
    expect(((await ok("payment_mail_to_match", { include_suggested: true })).emails as { id: string }[]).map((e) => e.id)).toEqual([mail.molo]);
    expect(await refused("read_payment_mail", { mail_id: mail.charlie })).toMatch(/No unmatched payment email/);
    expect((await as(CLIENT_USER, `select count(*)::int as n from public.filing_files where kind = 'payment_proof'`)).rows[0].n).toBe(0);
    // The Clerk now sees the return as having its proof.
    expect(await refused("propose_payment_proof", { mail_id: mail.molo, filing_id: filing.oct, confidence: "low", reason: "Testing a return that has its proof." })).toMatch(/already has a proof of payment/);

    // Filed & paid, as always: the scanned copy, then the step with the references offered.
    await db.query(`insert into storage.objects (bucket_id, name) values ('filing-files', $1)`, [`${charlie}/${filing.oct}/scan.pdf`]);
    await as(PREPARER, `select public.add_filing_file($1, 'filed_copy', $2, 'scan.pdf', 'application/pdf', 1000)`, [filing.oct, `${charlie}/${filing.oct}/scan.pdf`]);
    const filed = (await as(PREPARER, `select (f).status, (f).payment_reference, (f).paid_on::text from public.advance_filing($1, 'file', null, $2::jsonb) as f`, [
      filing.oct,
      JSON.stringify({ filing_reference: "EFPS-123", filed_on: "2026-11-10", payment_reference: "UB661855 · BIR So202611101440361634313861", paid_on: "2026-11-10" }),
    ])).rows[0];
    expect(filed).toEqual({ status: "filed", payment_reference: "UB661855 · BIR So202611101440361634313861", paid_on: "2026-11-10" });
  });
});
