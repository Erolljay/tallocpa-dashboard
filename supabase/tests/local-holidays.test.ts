/**
 * Local holidays (migration 20261212000005): a local day names its place and RDO codes;
 * national days stay one per date; a place has one local day per date; only the Owner
 * changes the list; the seed's holidays still load.
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
const DB_NAME = "local_holidays_test";
const OWNER = "00000000-0000-0000-0000-000000000b01";
const STAFF = "00000000-0000-0000-0000-000000000b02";

describe.skipIf(!url)("local holidays", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;

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
    // The seed runs twice without error (its holidays skip dates already there).
    await db.query(read("seed.sql"));
    await db.query(`insert into auth.users (id) values ($1), ($2)`, [OWNER, STAFF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  const add = (user: string, row: Record<string, unknown>) =>
    as(user, `insert into public.holidays (date, name, kind, source, place, rdo_codes) values ($1, $2, $3, 'test', $4, $5)`, [row.date, row.name, row.kind, row.place ?? null, row.rdo_codes ?? []]);

  it("keeps the seed's national days, one per date", async () => {
    expect(Number((await db.query(`select count(*) from public.holidays where date = '2026-12-25'`)).rows[0].count)).toBe(1);
    await expect(add(OWNER, { date: "2026-12-25", name: "Christmas again", kind: "regular" })).rejects.toThrow(/holidays_one_national/);
  });

  it("adds a local day on a national day's date, with its place and RDOs", async () => {
    await add(OWNER, { date: "2026-08-25", name: "Iloilo City Charter Day", kind: "local", place: "Iloilo City", rdo_codes: ["74"] });
    await add(OWNER, { date: "2026-12-25", name: "Town fiesta", kind: "local", place: "Oton", rdo_codes: ["75"] });
    await expect(add(OWNER, { date: "2026-08-25", name: "Again", kind: "local", place: "iloilo city", rdo_codes: ["74"] })).rejects.toThrow(/holidays_one_local/);
  });

  it("needs a place and RDOs for a local day, and none for a national one", async () => {
    await expect(add(OWNER, { date: "2026-09-01", name: "No place", kind: "local", rdo_codes: ["74"] })).rejects.toThrow(/holidays_local_place/);
    await expect(add(OWNER, { date: "2026-09-01", name: "No RDO", kind: "local", place: "Jaro" })).rejects.toThrow(/holidays_local_place/);
    await expect(add(OWNER, { date: "2026-09-02", name: "National with RDO", kind: "special", place: "Jaro", rdo_codes: ["74"] })).rejects.toThrow(/holidays_local_place/);
  });

  it("is changed only by the Owner, and read by staff", async () => {
    await expect(add(STAFF, { date: "2026-09-03", name: "Staff day", kind: "special" })).rejects.toThrow(/row-level security/);
    expect((await as(STAFF, `select name, place, rdo_codes from public.holidays where kind = 'local' order by date`)).rows).toEqual([
      { name: "Iloilo City Charter Day", place: "Iloilo City", rdo_codes: ["74"] },
      { name: "Town fiesta", place: "Oton", rdo_codes: ["75"] },
    ]);
  });
});
