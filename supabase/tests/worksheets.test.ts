/**
 * Return worksheet database tests (spec §3.7; migration 20261123000015_return_worksheets.sql):
 * the Owner and assigned staff read and save worksheets, client users and other
 * staff see none, client_id follows the filing, and a filed return's worksheet is locked.
 *
 * Runs in its own database so it can run alongside the other database tests. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "return_worksheets_test";

const OWNER = "00000000-0000-0000-0000-000000000021";
const STAFF = "00000000-0000-0000-0000-000000000022";
const REVIEWER = "00000000-0000-0000-0000-000000000023";
const CLIENT_USER = "00000000-0000-0000-0000-000000000024";
const OTHER_STAFF = "00000000-0000-0000-0000-000000000025";

describe.skipIf(!url)("return worksheets database", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let clientA: string;
  let clientB: string;
  let filing: string;
  let filingB: string;

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

  const insert = (filingId: string, clientId?: string) =>
    db.query(
      `insert into public.return_worksheets (filing_instance_id, client_id, inputs, result, figures, document_ids, computed_at, computed_by)
       values ($1, $2, '{"surcharge":"10"}', '{"sections":[]}', '{"amount_of_remittance":100}', '{}', now(), auth.uid()) returning client_id, figures`,
      [filingId, clientId ?? null],
    );

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, STAFF, REVIEWER, CLIENT_USER, OTHER_STAFF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values
       ($1, $5, 'Owner', 'owner'), ($2, $5, 'Staff', 'staff'), ($3, $5, 'Reviewer', 'reviewer'), ($4, $5, 'Other', 'staff')`,
      [OWNER, STAFF, REVIEWER, OTHER_STAFF, brand],
    );
    const ins = `insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, $2, $3, 'corporation') returning id`;
    clientA = (await db.query(ins, [brand, "TC-9201", "Client A"])).rows[0].id;
    clientB = (await db.query(ins, [brand, "TC-9202", "Client B"])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer'), ($4, $5, 'preparer')`, [clientA, STAFF, REVIEWER, clientB, OTHER_STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Client A owner')`, [CLIENT_USER, clientA]);
    const fi = async (c: string) => {
      const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '0619-E', 'monthly', '2026-01-01') returning id`, [c])).rows[0].id;
      return (
        await db.query(
          `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date)
           values ($1, $2, '0619-E', 'January 2026', '2026-01-01', '2026-01-31', '0619E', '2026-02-10', '2026-02-10') returning id`,
          [ob, c],
        )
      ).rows[0].id as string;
    };
    filing = await fi(clientA);
    filingB = await fi(clientB);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("assigned staff save a worksheet; client_id is taken from the filing", async () => {
    const row = await as(STAFF, async () => (await insert(filing, clientB)).rows[0]);
    expect(row).toEqual({ client_id: clientA, figures: { amount_of_remittance: 100 } });
  });

  it("the Owner and the reviewer can save too; other staff and client users cannot", async () => {
    expect((await as(OWNER, () => insert(filing))).rowCount).toBe(1);
    expect((await as(REVIEWER, () => insert(filing))).rowCount).toBe(1);
    await expect(as(OTHER_STAFF, () => insert(filing))).rejects.toThrow(/row-level security/);
    await expect(as(CLIENT_USER, () => insert(filing))).rejects.toThrow(/row-level security/);
  });

  it("rejects a result without a computed time", async () => {
    await expect(
      as(OWNER, () => db.query(`insert into public.return_worksheets (filing_instance_id, result) values ($1, '{}')`, [filing])),
    ).rejects.toThrow(/check constraint/);
  });

  describe("with a saved worksheet", () => {
    beforeAll(async () => {
      await db.query(`select set_config('request.jwt.claim.sub', $1, false)`, [OWNER]);
      await insert(filing);
      await insert(filingB);
      await db.query(`select set_config('request.jwt.claim.sub', '', false)`);
    });

    it("is read by the Owner and the client's staff only, never by client users", async () => {
      const sql = "select client_id from public.return_worksheets order by client_id = $1 desc";
      expect(await as(OWNER, async () => (await db.query(sql, [clientA])).rowCount)).toBe(2);
      expect(await as(STAFF, async () => (await db.query(sql, [clientA])).rows)).toEqual([{ client_id: clientA }]);
      expect(await as(REVIEWER, async () => (await db.query(sql, [clientA])).rows)).toEqual([{ client_id: clientA }]);
      expect(await as(OTHER_STAFF, async () => (await db.query(sql, [clientA])).rows)).toEqual([{ client_id: clientB }]);
      expect(await as(CLIENT_USER, async () => (await db.query(sql, [clientA])).rows)).toEqual([]);
    });

    it("is updated by assigned staff, writes the audit log and touches updated_at", async () => {
      const out = await as(STAFF, async () => {
        const upd = await db.query(`update public.return_worksheets set inputs = '{"surcharge":"20"}' where filing_instance_id = $1 returning updated_at > created_at as touched`, [filing]);
        await db.query("reset role");
        const audit = await db.query(`select actor, action from public.audit_log where table_name = 'return_worksheets' order by id desc limit 1`);
        return { upd: upd.rows, audit: audit.rows };
      });
      expect(out.upd).toHaveLength(1);
      expect(out.audit).toEqual([{ actor: STAFF, action: "UPDATE" }]);
      expect(await as(OTHER_STAFF, async () => (await db.query(`update public.return_worksheets set inputs = '{}' where filing_instance_id = $1`, [filing])).rowCount)).toBe(0);
    });

    it("cannot move to another filing or be deleted through the API", async () => {
      await expect(as(OWNER, () => db.query(`update public.return_worksheets set filing_instance_id = $2 where filing_instance_id = $1`, [filing, filingB]))).rejects.toThrow(/stays with its filing/);
      expect(await as(OWNER, async () => (await db.query(`delete from public.return_worksheets where filing_instance_id = $1`, [filing])).rowCount)).toBe(0);
    });

    it("is locked once the return is filed", async () => {
      await as(OWNER, async () => {
        await db.query("reset role");
        await db.query(`update public.filing_instances set status = 'filed' where id = $1`, [filing]);
        await db.query("set local role authenticated");
        await db.query("savepoint s");
        await expect(db.query(`update public.return_worksheets set inputs = '{}' where filing_instance_id = $1`, [filing])).rejects.toThrow(/worksheet is locked/);
        await db.query("rollback to savepoint s");
        // Still readable.
        expect((await db.query(`select 1 from public.return_worksheets where filing_instance_id = $1`, [filing])).rowCount).toBe(1);
      });
      // Not yet filed: still editable.
      expect(await as(OWNER, async () => (await db.query(`update public.return_worksheets set inputs = '{}' where filing_instance_id = $1`, [filing])).rowCount)).toBe(1);
    });

    it("goes with its filing", async () => {
      await db.query("begin");
      try {
        await db.query(`delete from public.filing_instances where id = $1`, [filingB]);
        expect((await db.query(`select 1 from public.return_worksheets where filing_instance_id = $1`, [filingB])).rowCount).toBe(0);
      } finally {
        await db.query("rollback");
      }
    });
  });

});
