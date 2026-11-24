/**
 * Slice 6 database tests (migration 20261124000009_client_reports.sql): the Owner
 * releases financial statements to the client's portal; client users see only
 * their own released reports; staff cannot release.
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
const DB_NAME = "client_reports_test";

const OWNER = "00000000-0000-0000-0000-000000000061";
const STAFF = "00000000-0000-0000-0000-000000000062";
const CLIENT_USER = "00000000-0000-0000-0000-000000000063";
const OTHER_CLIENT_USER = "00000000-0000-0000-0000-000000000064";

describe.skipIf(!url)("client reports", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let other: string;

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
  const release = (user: string, note: string | null = null, statements = { kind: "monthly", marker: 1 }) =>
    as(user, `select public.release_client_report($1, 'monthly', '2027-01-01', '2027-01-31', $2, $3) as id`, [client, JSON.stringify(statements), note]).then((r) => r.rows[0].id as string);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, STAFF, CLIENT_USER, OTHER_CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9601', 'Client R', 'corporation') returning id`, [brand])).rows[0].id;
    other = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9602', 'Client S', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Client R user'), ($3, $4, 'Client S user')`, [CLIENT_USER, client, OTHER_CLIENT_USER, other]);
    await db.query(`insert into public.engagements (client_id, service_line, start_date) values ($1, 'bookkeeping', '2027-01-01')`, [client]);
    await as(STAFF, `select public.setup_books($1, 'stock_corporation', '2027-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  const visible = (user: string) => as(user, `select kind, period_end::text, note, statements from public.client_reports`).then((r) => r.rows);

  it("only the Owner releases; the client sees nothing before", async () => {
    await expect(release(STAFF)).rejects.toThrow(/Only the Owner releases/);
    expect(await visible(CLIENT_USER)).toEqual([]);
    await expect(as(OWNER, `select public.release_client_report($1, 'monthly', '2027-01-01', '2027-01-31', '{}', null)`, [other])).rejects.toThrow(/no books/);
  });

  it("the client's users see the released report as released; other clients and their users do not", async () => {
    const id = await release(OWNER, " January figures ");
    expect(await visible(CLIENT_USER)).toEqual([{ kind: "monthly", period_end: "2027-01-31", note: "January figures", statements: { kind: "monthly", marker: 1 } }]);
    expect(await visible(STAFF)).toHaveLength(1);
    expect(await visible(OTHER_CLIENT_USER)).toEqual([]);
    // Releasing again replaces it.
    expect(await release(OWNER, null, { kind: "monthly", marker: 2 })).toBe(id);
    expect((await visible(CLIENT_USER))[0].statements).toEqual({ kind: "monthly", marker: 2 });
    // Written only through the functions.
    await expect(as(OWNER, `update public.client_reports set note = 'x'`)).resolves.toMatchObject({ rowCount: 0 });
  });

  it("only the Owner withdraws a report", async () => {
    const id = (await db.query(`select id from public.client_reports where client_id = $1`, [client])).rows[0].id;
    await expect(as(STAFF, `select public.withdraw_client_report($1)`, [id])).rejects.toThrow(/Only the Owner/);
    await as(OWNER, `select public.withdraw_client_report($1)`, [id]);
    expect(await visible(CLIENT_USER)).toEqual([]);
  });
});
