/**
 * A statement's share link (migration 20270105000001_soa_share_link.sql): only the
 * Owner makes it; asking again gives the same link; renewing replaces it.
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
const DB_NAME = "soa_share_link_test";
const OWNER = "00000000-0000-0000-0000-000000000e01";
const STAFF = "00000000-0000-0000-0000-000000000e02";
const CLIENT = "00000000-0000-0000-0000-000000000e03";

describe.skipIf(!url)("statement share link", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let soa: string;

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
  const token = async (renew = false) => (await db.query(`select public.soa_share_token($1, $2) as t`, [soa, renew])).rows[0].t as string;

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3)`, [OWNER, STAFF, CLIENT]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
    // An ad hoc job client: no engagement, just a charge on a statement.
    const client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9961', 'Ad Hoc Co', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.client_users (client_id, user_id, full_name) values ($1, $2, 'Ana')`, [client, CLIENT]);
    soa = (await db.query(`insert into public.soas (client_id, billing_date, reference, due_on) values ($1, '2026-11-20', 'TC-9961-2026-11-20', '2026-11-25') returning id`, [client])).rows[0].id;
    await db.query(`insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on) values ($1, $2, 'other', 'BIR registration', 5000, '2026-11-25')`, [client, soa]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("the Owner gets the same link each time, and a new one on renew", async () => {
    await as(OWNER, async () => {
      const first = await token();
      expect(first).toMatch(/^[0-9a-f]{64}$/);
      expect(await token()).toBe(first);
      const renewed = await token(true);
      expect(renewed).toMatch(/^[0-9a-f]{64}$/);
      expect(renewed).not.toBe(first);
      expect(await token()).toBe(renewed);
    });
  });

  it("staff and client users cannot make a link", async () => {
    await as(STAFF, () => expect(token()).rejects.toThrow(/Only the Owner/));
    await as(CLIENT, () => expect(token()).rejects.toThrow(/Only the Owner/));
  });

  it("anonymous visitors cannot call it", async () => {
    await db.query("begin");
    try {
      await db.query("set local role anon");
      await expect(token()).rejects.toThrow(/permission denied/);
    } finally {
      await db.query("rollback");
    }
  });
});
