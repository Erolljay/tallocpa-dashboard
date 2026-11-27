/**
 * The Collections Clerk's tools (migration 20270109000002, src/lib/collections/ai-tools.ts;
 * docs/AI-WORKFORCE.md §3, §6, §7.2), end to end through the connector handler:
 *
 *   - its tools are listed only once granted;
 *   - receivables_aging shows only its clients' issued statements still open, in the
 *     right aging buckets, with credit and waiting payment proofs;
 *   - client_payment_history: billed items, payments and payment habits of its client;
 *     refused for another client;
 *   - jobs_ready_to_bill: the Owner's Ready to bill list narrowed to its clients;
 *   - draft_payment_reminder saves a client-less draft only the Owner reads and decides;
 *     the next run skips that client; refused for another client, an unknown statement,
 *     or a client whose payment proof waits for the Owner;
 *   - the receivables functions refuse staff, client contacts and other AI employees;
 *   - it still cannot read the tables directly, bill, record or change anything.
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

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "ai_collections_clerk_test";

const OWNER = "00000000-0000-0000-0000-00000000f201";
const PREPARER = "00000000-0000-0000-0000-00000000f202";
const CLIENT_USER = "00000000-0000-0000-0000-00000000f203";
const CLERK = "00000000-0000-0000-0000-00000000f2a1";
const CHIEF = "00000000-0000-0000-0000-00000000f2a2";
// 10:00 AM, 10 March 2026 in Manila.
const NOW = new Date("2026-03-10T02:00:00Z");

describe.skipIf(!url)("AI Collections Clerk: receivables, payment habits, ready to bill, reminders as drafts", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let conn: Connector;
  let jaro: string;
  let molo: string;
  const soa: Record<string, string> = {};
  const key = newKey();
  let id = 0;

  type Reply = { result?: { isError?: boolean; structuredContent?: Record<string, unknown>; content: { text: string }[] }; error?: { message: string } };
  const call = async (name: string, args: Record<string, unknown> = {}) =>
    (await handleMcp(conn, { aiKey: "collections_clerk", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/call", params: { name, arguments: args } }, now: NOW })).json as Reply;
  const ok = async (name: string, args: Record<string, unknown> = {}) => {
    const r = await call(name, args);
    expect(r.result?.isError, JSON.stringify(r)).toBeUndefined();
    return r.result!.structuredContent as Record<string, unknown>;
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
  const addSoa = async (client: string, code: string, billing: string, due: string) =>
    (await db.query(`insert into public.soas (client_id, billing_date, reference, due_on) values ($1, $2, $3, $4) returning id`, [client, billing, `${code}-${billing}`, due])).rows[0].id as string;
  const addDue = async (client: string, soaId: string | null, description: string, amount: number, due: string) =>
    (await db.query(`insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on) values ($1, $2, 'other', $3, $4, $5) returning id`, [client, soaId, description, amount, due])).rows[0].id as string;
  const pay = async (client: string, due: string, received: string, amount: number) => {
    const dep = (await db.query(`insert into public.client_deposits (client_id, received_on, amount, method, reference, bir_invoice_number) values ($1, $2, $3, 'transfer', 'BANK-REF-SECRET', '0042') returning id`, [client, received, amount])).rows[0].id;
    await db.query(`insert into public.payment_allocations (deposit_id, due_id, amount) values ($1, $2, $3)`, [dep, due, amount]);
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

    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, PREPARER, CLIENT_USER, CLERK, CHIEF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Preparer', 'staff')`, [OWNER, PREPARER, brand]);
    jaro = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, status) values ($1, 'TC-9981', 'Jaro Trading', 'corporation', 'firm_remits', 'active') returning id`, [brand])).rows[0].id;
    molo = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, status) values ($1, 'TC-9982', 'Molo Foods', 'corporation', 'firm_remits', 'active') returning id`, [brand])).rows[0].id;
    for (const c of [jaro, molo]) await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [c, PREPARER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Jaro owner')`, [CLIENT_USER, jaro]);

    // Jaro: December paid in full 5 days late; January part-paid (₱3,000 open, 54 days
    // past due); March not yet due; a charge not yet billed.
    soa.dec = await addSoa(jaro, "TC-9981", "2025-12-10", "2025-12-15");
    await pay(jaro, await addDue(jaro, soa.dec, "Bookkeeping, December", 5000, "2025-12-15"), "2025-12-20", 5000);
    soa.jan = await addSoa(jaro, "TC-9981", "2026-01-10", "2026-01-15");
    await pay(jaro, await addDue(jaro, soa.jan, "Bookkeeping, January", 5000, "2026-01-15"), "2026-01-20", 2000);
    soa.mar = await addSoa(jaro, "TC-9981", "2026-03-05", "2026-03-12");
    await addDue(jaro, soa.mar, "Notarial fees", 1500, "2026-03-12");
    await addDue(jaro, null, "Certified true copies", 800, "2026-03-20");
    // Molo (not the Clerk's): owes ₱7,000 and has a charge to bill.
    soa.molo = await addSoa(molo, "TC-9982", "2025-12-28", "2026-01-01");
    await addDue(molo, soa.molo, "Bookkeeping, December", 7000, "2026-01-01");
    await addDue(molo, null, "Registration", 900, "2026-03-20");

    await db.query(
      `insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, books_level, enabled) values
         ($1, $3, 'collections_clerk', 'Collections Clerk', 'collections', 'cowork', 'none', true),
         ($2, $3, 'chief_of_staff', 'Chief of Staff', 'managing_partner', 'cowork', 'summary', true)`,
      [CLERK, CHIEF, brand],
    );
    await db.query(`insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2), ($3, $2)`, [CLERK, jaro, CHIEF]);
    await db.query(`insert into public.ai_credentials (ai_user_id, token_hash, token_hint, created_at, expires_at) values ($1, $2, right($3, 4), '2026-01-01', '2026-06-01')`, [CLERK, hashKey(key), key]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lists its tools only once the Owner grants them", async () => {
    expect((await call("receivables_aging")).error?.message).toMatch(/Unknown tool/);
    await db.query(
      `insert into public.ai_tool_grants (ai_user_id, tool) values ($1, 'receivables_aging'), ($1, 'client_payment_history'), ($1, 'jobs_ready_to_bill'), ($1, 'draft_payment_reminder')`,
      [CLERK],
    );
    const r = await handleMcp(conn, { aiKey: "collections_clerk", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/list" }, now: NOW });
    const tools = (r.json as { result: { tools: { name: string; annotations: { readOnlyHint: boolean } }[] } }).result.tools;
    expect(tools.map((t) => t.name).sort()).toEqual(["client_payment_history", "draft_payment_reminder", "jobs_ready_to_bill", "receivables_aging"]);
    expect(tools.find((t) => t.name === "draft_payment_reminder")?.annotations.readOnlyHint).toBe(false);
  });

  it("ages only its clients' issued statements still open", async () => {
    const r = await ok("receivables_aging");
    expect(r).toMatchObject({ as_of: "2026-03-10", firm_total_open: 4500, firm_overdue: 3000, already_drafted: 0 });
    const clients = r.clients as { client_code: string; total_open: number; overdue: number; buckets: Record<string, number>; days_past_due: number; credit: number; payment_proof_waiting: boolean; statements: { statement: string; open: number }[] }[];
    expect(clients).toHaveLength(1);
    expect(clients[0]).toMatchObject({ client_code: "TC-9981", total_open: 4500, overdue: 3000, days_past_due: 54, credit: 0, payment_proof_waiting: false });
    expect(clients[0].buckets).toEqual({ current: 1500, "1-30": 0, "31-60": 3000, "61-90": 0, "90+": 0 });
    expect(clients[0].statements.map((s) => [s.statement, s.open])).toEqual([["TC-9981-2026-01-10", 3000], ["TC-9981-2026-03-05", 1500]]);
    expect(JSON.stringify(r)).not.toMatch(/BANK-REF-SECRET|Molo/);
  });

  it("summarizes a client's payment habits, and refuses another client", async () => {
    const r = await ok("client_payment_history", { client: "TC-9981" });
    const billed = r.billed as { statement: string; paid_in_full_on: string | null; open: number }[];
    expect(billed.map((b) => [b.statement, b.paid_in_full_on, Number(b.open)])).toEqual([
      ["TC-9981-2025-12-10", "2025-12-20", 0],
      ["TC-9981-2026-01-10", null, 3000],
      ["TC-9981-2026-03-05", null, 1500],
    ]);
    expect((r.payments as unknown[]).length).toBe(2);
    expect(r.habits).toEqual({ items_paid: 1, items_open: 2, average_days_statement_to_paid: 10, average_days_late: 5, paid_on_time: 0 });
    expect(JSON.stringify(r)).not.toMatch(/BANK-REF-SECRET|0042/);
    const other = await call("client_payment_history", { client: "TC-9982" });
    expect(other.result?.isError).toBe(true);
    expect(other.result?.content[0].text).toMatch(/No client "TC-9982"/);
  });

  it("lists what is ready to bill for its clients only", async () => {
    const r = await ok("jobs_ready_to_bill");
    expect(r.total).toBe(800);
    expect(r.clients).toEqual([{ client_id: jaro, client_code: "TC-9981", client: "Jaro Trading", total: 800, items: [{ kind: "Other charge", description: "Certified true copies", amount: 800, why: "Not yet billed" }] }]);
  });

  it("saves a reminder as a draft only the Owner reads and decides", async () => {
    const r = await ok("draft_payment_reminder", {
      client: "TC-9981",
      statements: ["TC-9981-2026-01-10"],
      tone: "gentle",
      message: "Good day! This is a friendly reminder that ₱3,000.00 on statement TC-9981-2026-01-10 is still open. Thank you.",
      reason: "January is 54 days past due; first reminder.",
    });
    expect(r.saved).toBe(true);
    const { rows } = await db.query(`select kind, client_id, subject_table, subject_id, status, payload->>'amount' as amount, payload->>'tone' as tone from public.ai_drafts`);
    expect(rows).toEqual([{ kind: "payment_reminder", client_id: null, subject_table: "clients", subject_id: jaro, status: "open", amount: "3000", tone: "gentle" }]);
    const sel = `select count(*)::int as n from public.ai_drafts where kind = 'payment_reminder'`;
    expect((await as(OWNER, sel)).rows[0].n).toBe(1);
    expect((await as(PREPARER, sel)).rows[0].n).toBe(0);
    expect((await as(CLIENT_USER, sel)).rows[0].n).toBe(0);
    const draft = rows.length && (await db.query(`select id from public.ai_drafts`)).rows[0].id;
    await expect(as(PREPARER, `select public.decide_ai_draft($1, true)`, [draft])).rejects.toThrow(/Only staff/);
    await expect(as(CLERK, `select public.decide_ai_draft($1, true)`, [draft])).rejects.toThrow(/Only staff/);
  });

  it("the next run leaves out the client it drafted for, unless asked", async () => {
    const next = await ok("receivables_aging");
    expect(next.already_drafted).toBe(1);
    expect(next.clients).toEqual([]);
    const all = await ok("receivables_aging", { include_drafted: true });
    expect((all.clients as { last_reminder: unknown }[])[0].last_reminder).toEqual({ status: "open", on: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/) });
    // A newer reminder replaces the open one.
    await ok("draft_payment_reminder", { client: jaro, tone: "firm", message: "Good day! Your statements TC-9981-2026-01-10 and TC-9981-2026-03-05 total ₱4,500.00. Kindly settle at your earliest convenience.", reason: "Both statements, firmer." });
    expect((await db.query(`select status, payload->>'amount' as amount from public.ai_drafts order by created_at`)).rows).toEqual([{ status: "withdrawn", amount: "3000" }, { status: "open", amount: "4500" }]);
  });

  it("refuses another client, an unknown statement, and a client whose payment proof waits for the Owner", async () => {
    const msg = async (args: Record<string, unknown>) => {
      const r = await call("draft_payment_reminder", { tone: "gentle", message: "Good day! This is a friendly reminder about your open statement with us.", reason: "Testing what is refused.", ...args });
      expect(r.result?.isError, JSON.stringify(args)).toBe(true);
      return r.result!.content[0].text;
    };
    expect(await msg({ client: "TC-9982" })).toMatch(/No client "TC-9982"/);
    expect(await msg({ client: "TC-9981", statements: ["TC-9982-2025-12-28"] })).toMatch(/No open statement/);
    await db.query(
      `insert into public.payment_proofs (client_id, soa_id, amount, paid_on, storage_path, file_name, mime_type, submitted_by) values ($1, $2, 1500, '2026-03-09', 'proof-f2.jpg', 'proof.jpg', 'image/jpeg', $3)`,
      [jaro, soa.mar, CLIENT_USER],
    );
    expect(await msg({ client: "TC-9981" })).toMatch(/payment proof/);
    const all = await ok("receivables_aging", { include_drafted: true });
    expect((all.clients as { payment_proof_waiting: boolean }[])[0].payment_proof_waiting).toBe(true);
    expect((await db.query(`select count(*)::int as n from public.ai_drafts where status = 'open'`)).rows[0].n).toBe(1);
  });

  it("only the switched-on Collections Clerk may call the receivables functions", async () => {
    for (const user of [PREPARER, CLIENT_USER, CHIEF]) {
      await expect(as(user, `select * from public.ai_receivables()`)).rejects.toThrow(/Only the switched-on Collections Clerk/);
      await expect(as(user, `select public.ai_client_payments($1, '2025-01-01')`, [jaro])).rejects.toThrow(/Only the switched-on Collections Clerk/);
      await expect(as(user, `select * from public.ai_ready_to_bill()`)).rejects.toThrow(/Only the switched-on Collections Clerk/);
    }
    await db.query(`update public.ai_employees set enabled = false where user_id = $1`, [CLERK]);
    await expect(as(CLERK, `select * from public.ai_receivables()`)).rejects.toThrow(/Only the switched-on Collections Clerk/);
    await db.query(`update public.ai_employees set enabled = true where user_id = $1`, [CLERK]);
    await expect(as(CLERK, `select public.ai_client_payments($1, '2025-01-01')`, [molo])).rejects.toThrow(/Not one of your clients/);
  });

  it("still cannot read the tables directly, bill, record or change anything", async () => {
    const seen = await asAi(conn, CLERK, true, async (q) => [
      (await q.query(`select count(*)::int as n from public.client_dues`)).rows[0].n,
      (await q.query(`select count(*)::int as n from public.client_deposits`)).rows[0].n,
      (await q.query(`select count(*)::int as n from public.soas`)).rows[0].n,
      (await q.query(`select count(*)::int as n from public.payment_proofs`)).rows[0].n,
    ]);
    expect(seen).toEqual([0, 0, 0, 0]);
    const changed = await asAi(conn, CLERK, false, async (q) => [
      (await q.query(`update public.client_dues set amount = 1 returning id`)).rows.length,
      (await q.query(`update public.client_deposits set amount = 1 returning id`)).rows.length,
      (await q.query(`delete from public.soas returning id`)).rows.length,
    ]);
    expect(changed).toEqual([0, 0, 0]);
    await expect(as(CLERK, `insert into public.client_dues (client_id, kind, description, amount, due_on) values ($1, 'other', 'x', 1, '2026-03-10')`, [jaro])).rejects.toThrow(/row-level security|permission denied/);
    const due = (await db.query(`select id from public.client_dues where soa_id = $1`, [soa.jan])).rows[0].id;
    await expect(as(CLERK, `select public.run_billing('2026-03-10', $1)`, [jaro])).rejects.toThrow(/Owner/);
    await expect(as(CLERK, `select public.add_client_charge($1, 'other', 'x', 1, '2026-03-10')`, [jaro])).rejects.toThrow(/Owner/);
    await expect(as(CLERK, `select public.waive_due($1, 'x')`, [due])).rejects.toThrow(/Owner/);
    expect((await db.query(`select count(*)::int as n from public.client_dues where client_id = $1`, [jaro])).rows[0].n).toBe(4);
  });
  it("splits a month's collections by what the money is for, as the Owner applied it", async () => {
    await db.query(`insert into public.ai_tool_grants (ai_user_id, tool) values ($1, 'collections_summary')`, [CLERK]);
    // February: one statement with a tax due, the retainer, and SSS, PhilHealth and Pag-IBIG.
    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1601-C', 'monthly', '2026-01-01') returning id`, [jaro])).rows[0].id;
    const filing = (await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, tax_due)
       values ($1, $2, '1601-C', '2026-01', '2026-01-01', '2026-01-31', '1601C', '2026-02-10', '2026-02-10', 10000) returning id`,
      [ob, jaro],
    )).rows[0].id;
    const feb = await addSoa(jaro, "TC-9981", "2026-02-10", "2026-02-15");
    const line = async (kind: string, description: string, amount: number, extra: { contribution?: string; period?: string; filing?: string } = {}) =>
      (await db.query(
        `insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on, contribution, period_month, filing_instance_id) values ($1, $2, $3, $4, $5, '2026-02-15', $6, $7, $8) returning id`,
        [jaro, feb, kind, description, amount, extra.contribution ?? null, extra.period ?? null, extra.filing ?? null],
      )).rows[0].id as string;
    const tax = await line("tax", "Tax due, 1601-C 2026-01", 10000, { filing });
    const retainer = await line("retainer", "Monthly retainer, February 2026", 5000, { period: "2026-02-01" });
    const sss = await line("contribution", "SSS contributions, January 2026", 1200, { contribution: "sss" });
    const phic = await line("contribution", "PhilHealth contributions, January 2026", 500, { contribution: "philhealth" });
    const hdmf = await line("contribution", "Pag-IBIG contributions, January 2026", 200, { contribution: "pagibig" });
    // A full payment of the tax and remittances, a partial payment of the retainer, and ₱300 not yet applied.
    const full = (await db.query(`insert into public.client_deposits (client_id, received_on, amount) values ($1, '2026-02-12', 11900) returning id`, [jaro])).rows[0].id;
    for (const [due, amt] of [[tax, 10000], [sss, 1200], [phic, 500], [hdmf, 200]] as const) await db.query(`insert into public.payment_allocations (deposit_id, due_id, amount) values ($1, $2, $3)`, [full, due, amt]);
    const part = (await db.query(`insert into public.client_deposits (client_id, received_on, amount) values ($1, '2026-02-20', 2300) returning id`, [jaro])).rows[0].id;
    await db.query(`insert into public.payment_allocations (deposit_id, due_id, amount) values ($1, $2, 2000)`, [part, retainer]);
    // Molo's February bill and payment are not the Clerk's.
    const moloFeb = await addSoa(molo, "TC-9982", "2026-02-10", "2026-02-15");
    await pay(molo, await addDue(molo, moloFeb, "Bookkeeping, February", 4000, "2026-02-15"), "2026-02-15", 4000);

    const r = await ok("collections_summary", { month: "2026-02" });
    expect(r).toMatchObject({ period: { from: "2026-02-01", to: "2026-02-28" }, total_billed: 16900, total_collected: 14200, difference: 2700, allocation: "as applied by the Owner" });
    const by = Object.fromEntries((r.by_bucket as { bucket: string; billed: number; collected: number; deposit_to: string }[]).map((b) => [b.bucket, [b.billed, b.collected, b.deposit_to]]));
    expect(by).toEqual({
      tax: [10000, 10000, "UnionBank"],
      fees: [5000, 2000, "BPI"],
      sss: [1200, 1200, "Security Bank"],
      philhealth: [500, 500, "Security Bank"],
      pagibig: [200, 200, "Security Bank"],
      others: [0, 300, "BPI"],
    });
    expect(r.remittances_subtotal).toEqual({ billed: 1900, collected: 1900, deposit_to: "Security Bank" });
    expect(r.others).toEqual([{ name: "Received, not yet applied to a statement item (client credit)", billed: 0, collected: 300 }]);
    expect(JSON.stringify(r)).not.toMatch(/Molo|4000/);
    // One client, a date range, and refusals.
    expect((await ok("collections_summary", { client: "TC-9981", from: "2026-02-12", to: "2026-02-12" })).total_collected).toBe(11900);
    expect((await call("collections_summary", { client: "TC-9982" })).result?.isError).toBe(true);
    expect((await call("collections_summary", { from: "2026-02-01" })).result?.content[0].text).toMatch(/both from and to/);
    await expect(as(CHIEF, `select * from public.ai_collections_rows('2026-02-01', '2026-02-28')`)).rejects.toThrow(/Only the switched-on Collections Clerk/);
  });
});
