/**
 * AI employees, step 1 (migration 20270107000001; docs/AI-WORKFORCE.md §5–§6):
 *
 *   - only the Owner manages AI employees, assignments, keys and tool grants;
 *   - a login is a person or an AI employee, never both; marketing gets no clients;
 *   - an AI employee prepares nothing and signs nothing: every sign-off, posting, lock,
 *     release and approval path refuses it, and it can change no row in any table;
 *   - it reads no more than a signed-in stranger, except what is granted on purpose:
 *     its own record, its assigned client records, and their books at Full access;
 *   - switched off, unassigned, or at Summary / None, it reads no books at all.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { templatePayload } from "../../src/lib/ledger/coa";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "ai_employees_test";

const OWNER = "00000000-0000-0000-0000-00000000a101";
const PREPARER = "00000000-0000-0000-0000-00000000a102";
const REVIEWER = "00000000-0000-0000-0000-00000000a103";
const CLIENT_USER = "00000000-0000-0000-0000-00000000a104";
const STRANGER = "00000000-0000-0000-0000-00000000a105";
const CLERK = "00000000-0000-0000-0000-00000000a1a1";
const MARKETER = "00000000-0000-0000-0000-00000000a1a2";

/** Tables and views an AI employee may read rows of, on purpose. */
const BOOKS = [
  "client_books", "ledger_accounts", "journal_entries", "journal_lines", "client_party_accounts",
  "open_items", "open_item_applications", "arap_updates", "book_invoices", "book_invoice_lines",
  "book_settlements", "book_settlement_allocations", "books_month_locks", "book_invoice_list",
  // The Pre-Review Assistant's tie-outs (migration 20270109000001): registers and explanations, Full only.
  "register_lines", "workpaper_explanations",
];
const OWN = ["ai_employees", "ai_assignments", "ai_tool_grants", "ai_drafts"];
/** Client records granted with the client (step 2, migration 20270107000002). */
const CLIENT_RECORDS = ["clients", "obligations", "filing_instances", "return_worksheets"];
/** The Document Clerk's reading (step 3, migration 20270108000002): documents, OCR readings, its clients' suppliers. */
const DOCUMENT_RECORDS = ["documents", "extractions", "client_parties", "parties"];

describe.skipIf(!url)("AI employees: managed by the Owner, sign nothing, read only what is granted", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let brand: string;
  let jaro: string;
  let molo: string;
  let filing: string;
  let entry: string;
  let relations: string[] = [];

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
  /** Runs as the user and always rolls back; returns the result or the error. */
  async function attempt(user: string, sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
    try {
      return { rows: (await db.query(sql, params)).rows, rowCount: null as number | null, error: null as string | null };
    } catch (e) {
      return { rows: [], rowCount: null, error: (e as Error).message };
    } finally {
      await db.query("rollback");
    }
  }
  const setClerk = (fields: Record<string, unknown>) => {
    const keys = Object.keys(fields);
    return db.query(`update public.ai_employees set ${keys.map((k, i) => `${k} = $${i + 2}`).join(", ")} where user_id = $1`, [CLERK, ...keys.map((k) => fields[k])]);
  };
  const count = async (user: string, rel: string) => {
    const r = await attempt(user, `select count(*)::int as n from public.${rel}`);
    return r.error ? 0 : (r.rows[0].n as number);
  };
  const clientIdsSeen = async (user: string, rel: string) =>
    (await attempt(user, `select distinct client_id::text as c from public.${rel}`)).rows.map((r) => r.c as string);

  beforeAll(async () => {
    await admin.connect();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.query(`create database ${DB_NAME}`);
    db = new Client({ connectionString: url!.replace(/^(postgres(?:ql)?:\/\/[^/]*\/)[^?]*/, `$1${DB_NAME}`) });
    await db.connect();
    await db.query(read("tests/supabase-stub.sql"));
    for (const f of readdirSync(path.join(root, "migrations")).sort()) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
    await db.query(`grant usage on schema public to service_role`);
    await db.query(read("seed.sql"));
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5), ($6), ($7)`, [OWNER, PREPARER, REVIEWER, CLIENT_USER, STRANGER, CLERK, MARKETER]);
    brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Preparer', 'staff'), ($3, $4, 'Reviewer', 'reviewer')`,
      [OWNER, PREPARER, REVIEWER, brand],
    );
    jaro = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9931', 'Jaro Trading', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    molo = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9932', 'Molo Foods', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    for (const c of [jaro, molo]) {
      await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [c, PREPARER, REVIEWER]);
      await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [c, JSON.stringify(templatePayload("stock_corporation"))]);
    }
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Jaro owner')`, [CLIENT_USER, jaro]);
    const obligation = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '0619E', 'monthly', '2020-01-01') returning id`, [jaro])).rows[0].id;
    filing = (await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date)
       values ($1, $2, '0619-E', '2026-01', '2026-01-01', '2026-01-31', '0619E', '2026-02-10', '2026-02-10') returning id`,
      [obligation, jaro],
    )).rows[0].id;
    // A posted entry in each client's books.
    for (const c of [jaro, molo]) {
      const pick = async (type: string) =>
        (await db.query(`select id from public.ledger_accounts where client_id = $1 and type = $2 and control is null order by code limit 1`, [c, type])).rows[0].id as string;
      const [cash, capital] = [await pick("asset"), await pick("equity")];
      const id = (await as(PREPARER, `select public.post_journal_entry($1, '2026-01-15', 'Opening cash', 'JV-1', $2) as id`, [
        c,
        JSON.stringify([{ account_id: cash, debit: "1000", credit: "0" }, { account_id: capital, debit: "0", credit: "1000" }]),
      ])).rows[0].id;
      if (c === jaro) entry = id;
    }
    // The AI employees, created by the Owner.
    await as(OWNER, `insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, books_level) values ($1, $2, 'document_clerk', 'Document Clerk', 'compliance', 'both', 'full')`, [CLERK, brand]);
    await as(OWNER, `insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, client_data) values ($1, $2, 'content_writer', 'Content Writer', 'marketing', 'cowork', false)`, [MARKETER, brand]);
    await as(OWNER, `insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2)`, [CLERK, jaro]);
    relations = (await db.query(
      `select table_name from information_schema.tables where table_schema = 'public' and table_type in ('BASE TABLE', 'VIEW') order by 1`,
    )).rows.map((r) => r.table_name as string);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  describe("managed by the Owner", () => {
    it("staff cannot add, change or switch on an AI employee", async () => {
      const add = await attempt(REVIEWER, `insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on) values ($1, $2, 'x_clerk', 'X', 'compliance', 'app')`, [STRANGER, brand]);
      expect(add.error).toMatch(/row-level security/);
      const on = await attempt(REVIEWER, `update public.ai_employees set enabled = true returning user_id`);
      expect(on.rows).toHaveLength(0);
      const assign = await attempt(PREPARER, `insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2)`, [CLERK, molo]);
      expect(assign.error).toMatch(/row-level security/);
    });

    it("only the Owner sees keys; an AI employee cannot read its own", async () => {
      await as(OWNER, `insert into public.ai_credentials (ai_user_id, token_hash, token_hint, expires_at) values ($1, repeat('a', 64), 'abcd', now() + interval '90 days')`, [CLERK]);
      expect(await count(OWNER, "ai_credentials")).toBe(1);
      expect(await count(REVIEWER, "ai_credentials")).toBe(0);
      await setClerk({ enabled: true });
      expect(await count(CLERK, "ai_credentials")).toBe(0);
      await setClerk({ enabled: false });
    });

    it("a revoked key stays revoked, and a key's hash and expiry cannot be edited", async () => {
      const id = (await db.query(`select id from public.ai_credentials limit 1`)).rows[0].id;
      await expect(as(OWNER, `update public.ai_credentials set expires_at = now() + interval '9 years' where id = $1`, [id])).rejects.toThrow(/cannot be changed/);
      await as(OWNER, `update public.ai_credentials set revoked_at = now(), revoked_by = $2 where id = $1`, [id, OWNER]);
      await expect(as(OWNER, `update public.ai_credentials set revoked_at = null where id = $1`, [id])).rejects.toThrow(/cannot be changed/);
    });

    it("activity is written by the server; the Owner reads it, nobody else", async () => {
      await db.query(`insert into public.ai_activity (ai_user_id, tool, client_id, outcome) values ($1, 'whoami', $2, 'ok')`, [CLERK, jaro]);
      expect(await count(OWNER, "ai_activity")).toBe(1);
      expect(await count(REVIEWER, "ai_activity")).toBe(0);
      await setClerk({ enabled: true });
      expect(await count(CLERK, "ai_activity")).toBe(0);
      const write = await attempt(CLERK, `insert into public.ai_activity (ai_user_id, tool, outcome) values ($1, 'x', 'ok')`, [CLERK]);
      expect(write.error).toMatch(/row-level security/);
      await setClerk({ enabled: false });
    });
  });

  describe("people and AI employees stay apart", () => {
    it("a staff login cannot become an AI employee, nor an AI login staff or a client contact", async () => {
      await expect(as(OWNER, `insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on) values ($1, $2, 'y_clerk', 'Y', 'compliance', 'app')`, [PREPARER, brand])).rejects.toThrow(/belongs to a person/);
      await expect(db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $2, 'Clerk', 'staff')`, [CLERK, brand])).rejects.toThrow(/belongs to an AI employee/);
      await expect(db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Clerk')`, [CLERK, jaro])).rejects.toThrow(/belongs to an AI employee/);
    });

    it("marketing is never given client records or books", async () => {
      await expect(as(OWNER, `insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2)`, [MARKETER, jaro])).rejects.toThrow(/may not work on client records/);
      await expect(as(OWNER, `update public.ai_employees set books_level = 'full' where user_id = $1`, [MARKETER])).rejects.toThrow(/check constraint/);
      await expect(as(OWNER, `update public.ai_employees set all_clients = true where user_id = $1`, [MARKETER])).rejects.toThrow(/check constraint/);
    });

    it("an AI employee has no staff or client identity in the app", async () => {
      const id = (await as(CLERK, `select public.current_identity() as x`)).rows[0].x;
      expect(id.staff).toBeNull();
      expect(id.clients).toEqual([]);
    });
  });

  describe("signs nothing", () => {
    // Switched on, assigned to Jaro, Full books access: the most an AI employee can have.
    let statusBefore: string;
    beforeAll(async () => {
      await setClerk({ enabled: true, books_level: "full" });
      statusBefore = (await db.query(`select status from public.filing_instances where id = $1`, [filing])).rows[0].status;
    });

    const paths: [string, () => [string, unknown[]]][] = [
      ["prepare a return", () => [`select public.advance_filing($1, 'prepare', null, '{}'::jsonb)`, [filing]]],
      ["review a return", () => [`select public.advance_filing($1, 'review', null, '{}'::jsonb)`, [filing]]],
      ["give the Owner's approval", () => [`select public.advance_filing($1, 'owner_approve', null, '{}'::jsonb)`, [filing]]],
      ["approve for the client", () => [`select public.advance_filing($1, 'client_approve', null, '{}'::jsonb)`, [filing]]],
      ["mark a return filed", () => [`select public.advance_filing($1, 'file', null, '{}'::jsonb)`, [filing]]],
      ["send a return back", () => [`select public.advance_filing($1, 'kick_back', 'x', '{}'::jsonb)`, [filing]]],
      ["post a journal entry", () => [`select public.post_journal_entry($1, '2026-01-20', 'x', 'x', '[]'::jsonb)`, [jaro]]],
      ["reverse a journal entry", () => [`select public.reverse_journal_entry($1, '2026-01-20', 'x')`, [entry]]],
      ["lock a month", () => [`select public.lock_books_month($1, '2026-01-01')`, [jaro]]],
      ["close the year", () => [`select public.close_books_year($1, '2026-12-31')`, [jaro]]],
      ["start the books", () => [`select public.setup_books($1, 'stock_corporation', '2026-01-01', '[]'::jsonb)`, [jaro]]],
      ["release statements to the portal", () => [`select public.release_client_report($1, 'monthly', '2026-01-01', '2026-01-31', '{}'::jsonb)`, [jaro]]],
      ["sign a workpaper", () => [`select public.sign_workpaper($1, '2026-01-01', '0-2', 'prepare')`, [jaro]]],
      ["decide an amendment", () => [`select public.decide_ledger_amendment(gen_random_uuid(), true)`, []]],
      ["approve a document", () => [`select public.approve_document(gen_random_uuid(), '{}'::jsonb)`, []]],
      ["approve a remittance", () => [`select public.approve_contribution_remittance(gen_random_uuid())`, []]],
      ["approve a task", () => [`select public.review_staff_task(gen_random_uuid(), true)`, []]],
    ];

    for (const [what, call] of paths) {
      it(`cannot ${what}`, async () => {
        const [sql, params] = call();
        const r = await attempt(CLERK, sql, params);
        expect(r.error, `${what} was not refused`).not.toBeNull();
      });
    }

    it("the return and the books are unchanged after every attempt", async () => {
      expect((await db.query(`select status from public.filing_instances where id = $1`, [filing])).rows[0].status).toBe(statusBefore);
      expect((await db.query(`select count(*)::int as n from public.journal_entries where client_id = $1`, [jaro])).rows[0].n).toBe(1);
      expect((await db.query(`select count(*)::int as n from public.books_month_locks`)).rows[0].n).toBe(0);
    });

    it("cannot change or delete a row in any table, its own record included", async () => {
      const changed: string[] = [];
      for (const t of relations) {
        const kind = (await db.query(`select table_type from information_schema.tables where table_schema = 'public' and table_name = $1`, [t])).rows[0].table_type;
        if (kind !== "BASE TABLE") continue;
        const r = await attempt(CLERK, `with d as (delete from public.${t} returning 1) select count(*)::int as n from d`);
        if (!r.error && r.rows[0].n > 0) changed.push(t);
      }
      expect(changed).toEqual([]);
      const raise = await attempt(CLERK, `update public.ai_employees set books_level = 'full', all_clients = true, monthly_cap = 99999 returning 1`);
      expect(raise.rows).toHaveLength(0);
      const grant = await attempt(CLERK, `insert into public.ai_tool_grants (ai_user_id, tool) values ($1, 'anything')`, [CLERK]);
      expect(grant.error).toMatch(/row-level security/);
    });
  });

  describe("reads only what is granted", () => {
    it("sees no more than a signed-in stranger, except its own record, its client and that client's books", async () => {
      await setClerk({ enabled: true, books_level: "full", all_clients: false });
      const extra: string[] = [];
      for (const t of relations) {
        if (BOOKS.includes(t) || OWN.includes(t) || CLIENT_RECORDS.includes(t) || DOCUMENT_RECORDS.includes(t)) continue;
        const ai = await count(CLERK, t);
        const stranger = await count(STRANGER, t);
        if (ai > stranger) extra.push(`${t} (${ai} vs ${stranger})`);
      }
      expect(extra).toEqual([]);
    });

    it("reads its assigned client and that client's books, nothing of other clients", async () => {
      expect((await attempt(CLERK, `select id from public.clients`)).rows.map((r) => r.id)).toEqual([jaro]);
      for (const t of BOOKS) {
        const seen = await clientIdsSeen(CLERK, t);
        expect(seen.every((c) => c === jaro), t).toBe(true);
      }
      expect(await count(CLERK, "journal_entries")).toBe(1);
      expect(await count(CLERK, "journal_lines")).toBeGreaterThan(0);
      expect(await count(CLERK, "ledger_accounts")).toBeGreaterThan(0);
    });

    it("reads the filings and obligations of its client only", async () => {
      for (const t of ["obligations", "filing_instances"]) {
        expect(await count(CLERK, t), t).toBeGreaterThan(0);
        expect((await clientIdsSeen(CLERK, t)).every((c) => c === jaro), t).toBe(true);
      }
    });

    it("reads only its own record, assignments and tool grants", async () => {
      expect((await attempt(CLERK, `select key from public.ai_employees`)).rows).toEqual([{ key: "document_clerk" }]);
      expect(await count(CLERK, "ai_assignments")).toBe(1);
    });

    it("at Summary or None, reads the client record but no books", async () => {
      for (const level of ["summary", "none"]) {
        await setClerk({ books_level: level });
        expect(await count(CLERK, "clients"), level).toBe(1);
        for (const t of BOOKS) expect(await count(CLERK, t), `${level}: ${t}`).toBe(0);
      }
    });

    it("with all clients ticked, reads every client of its brand", async () => {
      await setClerk({ books_level: "full", all_clients: true });
      expect(await count(CLERK, "clients")).toBe(2);
      expect((await clientIdsSeen(CLERK, "journal_entries")).sort()).toEqual([jaro, molo].sort());
      await setClerk({ all_clients: false });
    });

    it("switched off, reads no client and no books", async () => {
      await setClerk({ enabled: false, books_level: "full" });
      expect(await count(CLERK, "clients")).toBe(0);
      for (const t of BOOKS) expect(await count(CLERK, t), t).toBe(0);
    });

    it("unassigned, reads nothing of the client", async () => {
      await setClerk({ enabled: true });
      await as(OWNER, `delete from public.ai_assignments where ai_user_id = $1`, [CLERK]);
      expect(await count(CLERK, "clients")).toBe(0);
      for (const t of BOOKS) expect(await count(CLERK, t), t).toBe(0);
      await as(OWNER, `insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2)`, [CLERK, jaro]);
    });

    it("marketing reads no client data even when switched on", async () => {
      await db.query(`update public.ai_employees set enabled = true where user_id = $1`, [MARKETER]);
      expect(await count(MARKETER, "clients")).toBe(0);
      for (const t of BOOKS) expect(await count(MARKETER, t), t).toBe(0);
    });

    it("the server-side check gives the same books level", async () => {
      await setClerk({ enabled: true, books_level: "full" });
      const level = async (client: string) => (await db.query(`select private.ai_books_level($1, $2) as l`, [CLERK, client])).rows[0].l;
      expect(await level(jaro)).toBe("full");
      expect(await level(molo)).toBe("none");
      await setClerk({ enabled: false });
      expect(await level(jaro)).toBe("none");
    });

    it("gets totals by account at Summary or Full access, and nothing at None or for other clients", async () => {
      const tb = (user: string, client: string) => attempt(user, `select code, debit::text, credit::text from public.ai_trial_balance($1, '2026-01-01', '2026-01-31') where debit <> 0 or credit <> 0`, [client]);
      for (const level of ["summary", "full"]) {
        await setClerk({ enabled: true, books_level: level });
        const r = await tb(CLERK, jaro);
        expect(r.error, level).toBeNull();
        expect(r.rows).toHaveLength(2);
        expect((await tb(CLERK, molo)).error).toMatch(/No books access/);
      }
      await setClerk({ books_level: "none" });
      expect((await tb(CLERK, jaro)).error).toMatch(/No books access/);
      expect((await tb(PREPARER, jaro)).error).toMatch(/No books access/);
      await setClerk({ enabled: false, books_level: "full" });
    });

    it("staff still read the books as before", async () => {
      expect(await count(PREPARER, "journal_entries")).toBe(2);
      expect(await count(CLIENT_USER, "journal_entries")).toBe(0);
    });
  });
});
