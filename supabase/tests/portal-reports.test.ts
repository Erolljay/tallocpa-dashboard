/**
 * Rework phase 4 (migration 20261203000001, decision 19): portal Reports. The client's
 * users read their financial statements and loose-leaf books only through the
 * portal_* functions, only for their own business and only for locked months (every
 * month from the start of the books through the period end); their filed returns and
 * the scanned copy and validation report of each, and nobody else's.
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
const DB_NAME = "portal_reports_test";

const OWNER = "00000000-0000-0000-0000-000000000e01";
const PREPARER = "00000000-0000-0000-0000-000000000e02";
const REVIEWER = "00000000-0000-0000-0000-000000000e03";
const USER_A = "00000000-0000-0000-0000-000000000e04";
const USER_B = "00000000-0000-0000-0000-000000000e05";
const OTHER_STAFF = "00000000-0000-0000-0000-000000000e06";

describe.skipIf(!url)("portal reports: locked books and filed returns for the client's own business", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let clientA: string;
  let clientB: string;
  const acct: Record<string, string> = {};

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
  const post = (date: string, amount: string) =>
    as(PREPARER, `select public.save_book_invoice($1, $2) as id`, [
      clientA, JSON.stringify({ kind: "sales", party_name: "Walk-in", issue_date: date, lines: [{ account_id: acct.sales, amount }] }),
    ]);
  const lock = (month: string) => as(REVIEWER, `select public.lock_books_month($1, $2)`, [clientA, month]);
  const through = async (user = USER_A, client = clientA) => (await as(user, `select public.portal_books($1) as b`, [client])).rows[0].b?.locked_through ?? null;
  const tb = (user: string, from: string, to: string, client = clientA) =>
    as(user, `select code, closing::text from public.portal_trial_balance($1, $2, $3) where closing <> 0 order by code`, [client, from, to]);
  const entries = async (user: string, from: string, to: string) => (await as(user, `select public.portal_book_entries($1, $2, $3) as d`, [clientA, from, to])).rows[0].d;

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5), ($6)`, [OWNER, PREPARER, REVIEWER, USER_A, USER_B, OTHER_STAFF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $5, 'Owner', 'owner'), ($2, $5, 'Preparer', 'staff'), ($3, $5, 'Reviewer', 'reviewer'), ($4, $5, 'Other', 'staff')`,
      [OWNER, PREPARER, REVIEWER, OTHER_STAFF, brand],
    );
    clientA = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9921', 'Molo Bakery', 'corporation') returning id`, [brand])).rows[0].id;
    clientB = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9922', 'Jaro Hardware', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer'), ($4, $2, 'preparer'), ($4, $3, 'reviewer')`, [clientA, PREPARER, REVIEWER, clientB]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Molo'), ($3, $4, 'Owner of Jaro')`, [USER_A, clientA, USER_B, clientB]);
    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [clientA, JSON.stringify(templatePayload("stock_corporation"))]);
    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [clientB, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [clientA])).rows) acct[r.template_key] = r.id;
    await post("2026-01-10", "1000");
    await post("2026-02-10", "2000");
    await post("2026-03-10", "4000");
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  describe("the books", () => {
    it("show nothing until the first month is locked", async () => {
      expect(await through()).toBeNull();
      await expect(tb(USER_A, "2026-01-01", "2026-01-31")).rejects.toThrow(/January 2026 are not locked yet/);
      await expect(entries(USER_A, "2026-01-01", "2026-01-31")).rejects.toThrow(/not locked yet/);
    });

    it("show the locked months, up to the first open one", async () => {
      await lock("2026-01-01");
      await lock("2026-03-01");
      expect(await through()).toBe("2026-01-31");
      const rows = (await tb(USER_A, "2026-01-01", "2026-01-31")).rows;
      expect(rows.find((r) => r.code.startsWith("4"))?.closing).toBe("-1000.00");
      // March is locked but February is open: March would rest on open figures.
      await expect(tb(USER_A, "2026-03-01", "2026-03-31")).rejects.toThrow(/March 2026 are not locked yet/);
      await expect(tb(USER_A, "2026-01-01", "2026-02-28")).rejects.toThrow(/not locked yet/);
      await lock("2026-02-01");
      expect(await through()).toBe("2026-03-31");
      expect((await tb(USER_A, "2026-03-01", "2026-03-31")).rows.find((r) => r.code.startsWith("4"))?.closing).toBe("-7000.00");
    });

    it("give the posted entries and the chart for the loose-leaf books", async () => {
      const d = await entries(USER_A, "2026-02-01", "2026-02-28");
      expect(d.entries).toHaveLength(1);
      expect(d.entries[0]).toMatchObject({ entry_date: "2026-02-10" });
      expect(d.entries[0].journal_lines.length).toBeGreaterThan(1);
      expect(d.accounts.some((a: { id: string }) => a.id === acct.sales)).toBe(true);
    });

    it("answer only the business's own users and the staff who keep its books", async () => {
      await expect(through(USER_B, clientA)).rejects.toThrow(/Client not found/);
      await expect(tb(USER_B, "2026-01-01", "2026-01-31")).rejects.toThrow(/Client not found/);
      await expect(entries(USER_B, "2026-01-01", "2026-01-31")).rejects.toThrow(/Client not found/);
      await expect(tb(OTHER_STAFF, "2026-01-01", "2026-01-31")).rejects.toThrow(/Client not found/);
      expect((await tb(REVIEWER, "2026-01-01", "2026-01-31")).rows.length).toBeGreaterThan(0);
      expect(await through(USER_B, clientB)).toBeNull();
    });

    it("keep the ledger tables closed to the client's users", async () => {
      expect((await as(USER_A, `select count(*)::int as n from public.journal_entries`)).rows[0].n).toBe(0);
      expect((await as(USER_A, `select count(*)::int as n from public.journal_lines`)).rows[0].n).toBe(0);
      expect((await as(USER_A, `select count(*)::int as n from public.trial_balance($1, '2026-01-01', '2026-01-31') where closing <> 0`, [clientA])).rows[0].n).toBe(0);
    });

    it("close again when a month is unlocked", async () => {
      await as(OWNER, `select public.request_books_unlock($1, '2026-02-01', 'Missed invoice')`, [clientA]);
      expect(await through()).toBe("2026-01-31");
      await expect(tb(USER_A, "2026-02-01", "2026-02-28")).rejects.toThrow(/February 2026 are not locked yet/);
    });
  });

  describe("filed returns", () => {
    const filing: Record<string, string> = {};

    beforeAll(async () => {
      const add = async (client: string, key: string, status: string) => {
        const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01') returning id`, [client])).rows[0].id;
        filing[key] = (await db.query(
          `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
           values ($1, $2, '2550Q', 'Q4 2025', '2025-10-01', '2025-12-31', '2550Q', '2026-01-25', '2026-01-25', $3) returning id`, [ob, client, status])).rows[0].id;
        for (const kind of ["filed_copy", "validation_report", "esubmission_dat"]) {
          await db.query(
            `insert into public.filing_files (filing_instance_id, client_id, kind, file_name, mime_type, size_bytes, storage_path) values ($1, $2, $3, 'f.pdf', 'application/pdf', 1, $4)`,
            [filing[key], client, kind, `${client}/${filing[key]}/${kind}.pdf`],
          );
        }
      };
      await add(clientA, "a", "filed");
      await add(clientB, "b", "filed");
    });

    it("show the client their own filed returns with the scanned copy and validation report, not the DAT files", async () => {
      const returns = (await as(USER_A, `select id from public.filing_instances where status = 'filed'`)).rows.map((r) => r.id);
      expect(returns).toEqual([filing.a]);
      const files = (await as(USER_A, `select filing_instance_id, kind from public.filing_files order by kind`)).rows;
      expect(files).toEqual([{ filing_instance_id: filing.a, kind: "filed_copy" }, { filing_instance_id: filing.a, kind: "validation_report" }]);
    });

    it("show nothing of another business's returns", async () => {
      expect((await as(USER_B, `select count(*)::int as n from public.filing_files where client_id = $1`, [clientA])).rows[0].n).toBe(0);
      expect((await as(USER_B, `select count(*)::int as n from public.filing_instances where client_id = $1`, [clientA])).rows[0].n).toBe(0);
    });
  });
});
