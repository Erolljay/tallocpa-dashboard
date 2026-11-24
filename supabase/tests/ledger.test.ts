/**
 * Ledger database tests (migration 20261124000004_ledger_core.sql): setting up
 * books from a template, the opening balances with their AR/AP detail, the
 * balance rule, posted entries never changing, reversals, the trial balance,
 * and who may read and write the books.
 *
 * Runs in its own database so it can run alongside db.test.ts. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { templatePayload } from "../../src/lib/ledger/coa";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "ledger_test";

const OWNER = "00000000-0000-0000-0000-000000000031";
const STAFF = "00000000-0000-0000-0000-000000000032";
const OTHER_STAFF = "00000000-0000-0000-0000-000000000033";
const CLIENT_USER = "00000000-0000-0000-0000-000000000034";

describe.skipIf(!url)("ledger database", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let clientA: string;
  let clientB: string;
  const acct: Record<string, string> = {};

  /** Runs `fn` signed in as `user` inside a transaction that is rolled back. */
  async function as<T>(user: string, fn: () => Promise<T>): Promise<T> {
    await db.query("begin");
    try {
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
      await db.query("set local role authenticated");
      return await fn();
    } finally {
      await db.query("rollback");
    }
  }

  /** Like `as`, but commits (for setup that later tests rely on). */
  async function asCommit(user: string, sql: string, params: unknown[]) {
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

  /** The statement fails, at once or when the transaction commits (deferred checks). */
  async function failsAtCommit(user: string, sql: string, params: unknown[], pattern: RegExp) {
    await expect(asCommit(user, sql, params)).rejects.toThrow(pattern);
  }

  async function fails(sql: string, params: unknown[], pattern: RegExp) {
    await db.query("savepoint s");
    await expect(db.query(sql, params)).rejects.toThrow(pattern);
    await db.query("rollback to savepoint s");
  }

  const line = (key: string, debit: string, credit = "0") => ({ account_id: acct[key], debit, credit });

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, STAFF, OTHER_STAFF, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Other', 'staff')`,
      [OWNER, STAFF, OTHER_STAFF, brand],
    );
    const ins = `insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, $2, $3, 'corporation') returning id`;
    clientA = (await db.query(ins, [brand, "TC-9301", "Client A"])).rows[0].id;
    clientB = (await db.query(ins, [brand, "TC-9302", "Client B"])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [clientA, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Client User')`, [CLIENT_USER, clientA]);
    await db.query(`insert into public.engagements (client_id, service_line, start_date) values ($1, 'bookkeeping', '2027-01-01'), ($2, 'tax_compliance', '2027-01-01')`, [clientA, clientB]);
    await db.query(`insert into public.parties (tin, registered_name) values ('123-456-789', 'ABC Trading Corp')`);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  const setup = `select public.setup_books($1, 'stock_corporation', '2027-01-01', $2)`;

  it("sets up books only for assigned staff of a bookkeeping client", async () => {
    const accounts = JSON.stringify(templatePayload("stock_corporation"));
    await expect(asCommit(OTHER_STAFF, setup, [clientA, accounts])).rejects.toThrow(/Only the Owner or staff assigned/);
    await expect(asCommit(OWNER, setup, [clientB, accounts])).rejects.toThrow(/no active Bookkeeping engagement/);
    await asCommit(STAFF, setup, [clientA, accounts]);
    await expect(asCommit(STAFF, setup, [clientA, accounts])).rejects.toThrow(/already set up/);
    const rows = (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [clientA])).rows;
    expect(rows.length).toBe(templatePayload("stock_corporation").length);
    for (const r of rows) acct[r.template_key] = r.id;
  });

  it("refuses a second account for a single-purpose control", async () => {
    await as(STAFF, async () => {
      await fails(
        `insert into public.ledger_accounts (client_id, code, name, type, normal_side, fs_line, control) values ($1, '1101', 'AR 2', 'asset', 'debit', 'receivables', 'ar')`,
        [clientA],
        /ledger_accounts_one_control/,
      );
    });
  });

  it("saves opening balances whose AR and AP detail ties, and replaces them on a new import", async () => {
    const lines = JSON.stringify([line("cash_on_hand", "100000"), line("accounts_receivable", "25000"), line("accounts_payable", "0", "5000"), line("share_capital", "0", "120000")]);
    const items = (ar: string) => JSON.stringify([
      { kind: "receivable", party_name: "ABC Trading Corp", party_tin: "123-456-789", doc_number: "SI-101", doc_date: "2026-12-10", amount: ar },
      { kind: "payable", party_name: "XYZ Supply", party_tin: null, doc_number: "INV-9", doc_date: "2026-12-20", amount: "5000" },
    ]);
    const save = `select public.save_opening_balances($1, $2, $3) as id`;
    await expect(asCommit(STAFF, save, [clientA, lines, items("20000")])).rejects.toThrow(/receivables listed .* do not add up/);
    await failsAtCommit(STAFF, save, [clientA, JSON.stringify([line("cash_on_hand", "100"), line("share_capital", "0", "90")]), "[]"], /must balance/);
    const first = (await asCommit(STAFF, save, [clientA, lines, items("25000")])).rows[0].id;
    const second = (await asCommit(STAFF, save, [clientA, lines, items("25000")])).rows[0].id;
    expect(second).not.toBe(first);
    const e = (await db.query(`select entry_date, status, source from public.journal_entries where client_id = $1`, [clientA])).rows;
    expect(e).toHaveLength(1);
    expect(e[0]).toMatchObject({ status: "posted", source: "opening" });
    expect(e[0].entry_date.toISOString().slice(0, 10)).toBe("2026-12-31");
    const open = (await db.query(`select kind, party_name, party_id is not null as linked, balance from public.open_items where client_id = $1 order by kind`, [clientA])).rows;
    expect(open).toEqual([
      { kind: "payable", party_name: "XYZ Supply", linked: false, balance: "5000.00" },
      { kind: "receivable", party_name: "ABC Trading Corp", linked: true, balance: "25000.00" },
    ]);
  });

  it("posts a balanced manual entry on or after the books start, and never an unbalanced one", async () => {
    const post = `select public.post_journal_entry($1, $2, $3, $4, $5) as id`;
    await expect(asCommit(STAFF, post, [clientA, "2026-12-31", "Too early", null, JSON.stringify([line("rent", "1000"), line("cash_on_hand", "0", "1000")])])).rejects.toThrow(/on or after the start of the books/);
    await failsAtCommit(STAFF, post, [clientA, "2027-01-15", "Unbalanced", null, JSON.stringify([line("rent", "1000"), line("cash_on_hand", "0", "900")])], /must balance/);
    await expect(asCommit(OTHER_STAFF, post, [clientA, "2027-01-15", "Rent", null, JSON.stringify([line("rent", "1000"), line("cash_on_hand", "0", "1000")])])).rejects.toThrow(/Only the Owner or staff assigned/);
    const id = (await asCommit(STAFF, post, [clientA, "2027-01-15", "January rent", "JV-1", JSON.stringify([line("rent", "1000"), line("cash_on_hand", "0", "1000")])])).rows[0].id;
    const e = (await db.query(`select period, book, source, status from public.journal_entries where id = $1`, [id])).rows[0];
    expect(e.period.toISOString().slice(0, 10)).toBe("2027-01-01");
    expect(e).toMatchObject({ book: "general_journal", source: "manual", status: "posted" });
  });

  it("keeps posted entries and their lines unchangeable", async () => {
    const id = (await db.query(`select id from public.journal_entries where client_id = $1 and source = 'manual'`, [clientA])).rows[0].id;
    await db.query("begin");
    await fails(`update public.journal_lines set debit = 2000 where entry_id = $1 and line_no = 1`, [id], /cannot be changed; reverse it/);
    await fails(`update public.journal_entries set memo = 'x' where id = $1`, [id], /cannot be changed; reverse it/);
    await fails(`delete from public.journal_entries where id = $1`, [id], /cannot be deleted; reverse it/);
    await fails(`delete from public.ledger_accounts where id = $1`, [acct.rent], /journal_lines_client_id_account_id_fkey/);
    await fails(`update public.ledger_accounts set type = 'asset' where id = $1`, [acct.rent], /type, normal balance and control role cannot change/);
    await db.query(`update public.ledger_accounts set name = 'Rent - Office' where id = $1`, [acct.rent]);
    await db.query("rollback");
  });

  it("reverses an entry once, and not the opening balances", async () => {
    const id = (await db.query(`select id from public.journal_entries where client_id = $1 and source = 'manual'`, [clientA])).rows[0].id;
    const opening = (await db.query(`select id from public.journal_entries where client_id = $1 and source = 'opening'`, [clientA])).rows[0].id;
    const rev = `select public.reverse_journal_entry($1, $2, $3) as id`;
    await expect(asCommit(STAFF, rev, [opening, "2027-01-20", "x"])).rejects.toThrow(/importing them again/);
    await expect(asCommit(STAFF, rev, [id, "2027-01-10", "x"])).rejects.toThrow(/before the entry/);
    const r = (await asCommit(STAFF, rev, [id, "2027-01-20", "Wrong month"])).rows[0].id;
    await expect(asCommit(STAFF, rev, [id, "2027-01-21", "again"])).rejects.toThrow(/Only a posted entry/);
    const lines = (await db.query(`select account_id, debit, credit from public.journal_lines where entry_id = $1 order by line_no`, [r])).rows;
    expect(lines).toEqual([
      { account_id: acct.rent, debit: "0.00", credit: "1000.00" },
      { account_id: acct.cash_on_hand, debit: "1000.00", credit: "0.00" },
    ]);
    expect((await db.query(`select status from public.journal_entries where id = $1`, [id])).rows[0].status).toBe("reversed");
  });

  it("computes the trial balance for a period", async () => {
    const rows = await as(STAFF, async () => (await db.query(`select code, opening, debit, credit, closing from public.trial_balance($1, '2027-01-01', '2027-01-31') where closing <> 0 or debit <> 0 or credit <> 0`, [clientA])).rows);
    const cash = rows.find((r) => r.code === "1010");
    expect(cash).toEqual({ code: "1010", opening: "100000.00", debit: "1000.00", credit: "1000.00", closing: "100000.00" });
    const total = rows.reduce((s, r) => s + Number(r.closing), 0);
    expect(total).toBe(0);
  });

  it("records the loose-leaf books permit for assigned staff only", async () => {
    await expect(asCommit(OTHER_STAFF, `select public.set_books_permit($1, 'x')`, [clientA])).rejects.toThrow(/Only the Owner or staff assigned/);
    await asCommit(STAFF, `select public.set_books_permit($1, ' ORUS 2026-12345 ')`, [clientA]);
    expect((await db.query(`select books_permit from public.client_books where client_id = $1`, [clientA])).rows[0].books_permit).toBe("ORUS 2026-12345");
  });

  it("shows the books to staff who can see the client, never to client users or other staff", async () => {
    const count = (user: string, table: string) =>
      as(user, async () => Number((await db.query(`select count(*) from public.${table} where client_id = $1`, [clientA])).rows[0].count));
    expect(await count(STAFF, "journal_entries")).toBeGreaterThan(0);
    expect(await count(OWNER, "journal_lines")).toBeGreaterThan(0);
    expect(await count(OTHER_STAFF, "journal_entries")).toBe(0);
    expect(await count(CLIENT_USER, "journal_entries")).toBe(0);
    expect(await count(CLIENT_USER, "ledger_accounts")).toBe(0);
    expect(await count(CLIENT_USER, "open_items")).toBe(0);
    await as(STAFF, async () => {
      await fails(`insert into public.journal_entries (client_id, entry_date, source, memo) values ($1, '2027-01-05', 'manual', 'direct')`, [clientA], /row-level security/);
      await fails(`select private.post_entry($1, '2027-01-05', 'general_journal', 'manual', 'x', null, '[]'::jsonb)`, [clientA], /permission denied/);
    });
  });
});
