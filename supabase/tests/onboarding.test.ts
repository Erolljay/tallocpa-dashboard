/**
 * Onboarding tab (migration 20261125000015_onboarding.sql): the proposal and the
 * signed contract are attached to the client, and staff tick the checklist items
 * nothing else records. Only the Owner and the client's staff may do either.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "onboarding_test";

const OWNER = "00000000-0000-0000-0000-000000000091";
const STAFF = "00000000-0000-0000-0000-000000000092";
const OUTSIDER = "00000000-0000-0000-0000-000000000093";

describe.skipIf(!url)("onboarding: files and ticks", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;

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
  const upload = (p: string) => db.query(`insert into storage.objects (bucket_id, name) values ('client-files', $1)`, [p]);
  const add = (user: string, p: string, kind = "contract", signed: string | null = "2026-12-01") =>
    as(user, `select * from public.add_client_file($1, $2, 'Engagement letter', $3, 'letter.pdf', 'application/pdf', 1200, $4)`, [client, kind, p, signed]);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3)`, [OWNER, STAFF, OUTSIDER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Other', 'staff')`,
      [OWNER, STAFF, OUTSIDER, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, status) values ($1, 'TC-9901', 'Molo Bakery', 'individual', 'onboarding') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("records an uploaded contract with its signing date; a proposal keeps none", async () => {
    await upload(`${client}/a.pdf`);
    const f = (await add(STAFF, `${client}/a.pdf`)).rows[0];
    expect(f).toMatchObject({ kind: "contract", title: "Engagement letter", signed_on: expect.any(Date), uploaded_by: STAFF });
    await upload(`${client}/b.pdf`);
    expect((await add(STAFF, `${client}/b.pdf`, "proposal", "2026-12-01")).rows[0].signed_on).toBeNull();
    expect((await as(STAFF, `select count(*)::int as n from public.client_files where client_id = $1`, [client])).rows[0].n).toBe(2);
  });

  it("refuses a file that was not uploaded, sits outside the client's folder, or comes from someone off the client", async () => {
    await expect(add(STAFF, `${client}/missing.pdf`)).rejects.toThrow(/has not been uploaded/);
    await upload(`other/c.pdf`);
    await expect(add(STAFF, `other/c.pdf`)).rejects.toThrow(/not in this client's folder/);
    await upload(`${client}/d.pdf`);
    await expect(add(OUTSIDER, `${client}/d.pdf`)).rejects.toThrow(/Client not found|Only the Owner/);
    expect((await as(OUTSIDER, `select count(*)::int as n from public.client_files`)).rows[0].n).toBe(0);
  });

  it("lets only the Owner remove a file from the list", async () => {
    const id = (await db.query(`select id from public.client_files where kind = 'proposal'`)).rows[0].id;
    await expect(as(STAFF, `select public.remove_client_file($1)`, [id])).rejects.toThrow(/Only the Owner/);
    await as(OWNER, `select public.remove_client_file($1)`, [id]);
    expect((await db.query(`select count(*)::int as n from public.client_files where id = $1`, [id])).rows[0].n).toBe(0);
  });

  it("ticks and unticks a manual item, with a note", async () => {
    await as(STAFF, `select public.set_onboarding_item($1, 'kickoff', true, 'Met at the shop')`, [client]);
    expect((await db.query(`select item, note, done_by from public.onboarding_ticks where client_id = $1`, [client])).rows).toEqual([{ item: "kickoff", note: "Met at the shop", done_by: STAFF }]);
    await as(STAFF, `select public.set_onboarding_item($1, 'kickoff', false)`, [client]);
    expect((await db.query(`select count(*)::int as n from public.onboarding_ticks where client_id = $1`, [client])).rows[0].n).toBe(0);
    await expect(as(OUTSIDER, `select public.set_onboarding_item($1, 'kickoff', true)`, [client])).rejects.toThrow(/Client not found|Only the Owner/);
  });
});
