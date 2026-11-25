/**
 * W2 (migration 20261125000011_workpaper_reviews.sql): the preparer signs a workpaper,
 * the client's reviewer (or the Owner) signs the review, a review note takes the review
 * away and blocks it until cleared; nobody else signs, clients see nothing.
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
const DB_NAME = "workpaper_reviews_test";

const PREPARER = "00000000-0000-0000-0000-0000000000c1";
const REVIEWER = "00000000-0000-0000-0000-0000000000c2";
const OTHER = "00000000-0000-0000-0000-0000000000c3";
const CLIENT_USER = "00000000-0000-0000-0000-0000000000c4";
const MONTH = "2027-03-01";

describe.skipIf(!url)("workpaper sign-off and review notes", () => {
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
  const sign = (user: string, ref: string, action: string) => as(user, `select (public.sign_workpaper($1, $2, $3, $4)).*`, [client, MONTH, ref, action]);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [PREPARER, REVIEWER, OTHER, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Preparer', 'staff'), ($2, $4, 'Reviewer', 'reviewer'), ($3, $4, 'Other', 'staff')`,
      [PREPARER, REVIEWER, OTHER, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9971', 'Jaro Agri Supply', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Jaro')`, [CLIENT_USER, client]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("the preparer signs first; only the client's reviewer signs the review", async () => {
    await expect(sign(REVIEWER, "10", "review")).rejects.toThrow(/preparer has not signed/);
    expect((await sign(PREPARER, "10", "prepare")).rows[0]).toMatchObject({ prepared_by: PREPARER, reviewed_by: null });
    await expect(sign(PREPARER, "10", "review")).rejects.toThrow(/reviewer or the Owner/);
    await expect(sign(OTHER, "10", "prepare")).rejects.toThrow(/assigned to this client/);
    expect((await sign(REVIEWER, "10", "review")).rows[0]).toMatchObject({ reviewed_by: REVIEWER });
    await expect(sign(PREPARER, "10", "unprepare")).rejects.toThrow(/take the review back first/);
  });

  it("a review note takes the review away and blocks it until the reviewer clears it", async () => {
    const note = (await as(REVIEWER, `select (public.raise_review_note($1, $2, '10', 'SI 0457 is not in the register')).id`, [client, MONTH])).rows[0].id;
    expect((await db.query(`select reviewed_at from public.workpaper_signoffs where client_id = $1 and ref = '10'`, [client])).rows[0].reviewed_at).toBeNull();
    await expect(sign(REVIEWER, "10", "review")).rejects.toThrow(/open review notes on 10/);
    await as(PREPARER, `select public.act_on_review_note($1, 'respond', 'Requested from the client; posted by JE 03-118')`, [note]);
    await expect(as(PREPARER, `select public.act_on_review_note($1, 'clear')`, [note])).rejects.toThrow(/clears review notes/);
    await as(REVIEWER, `select public.act_on_review_note($1, 'clear')`, [note]);
    expect((await sign(REVIEWER, "10", "review")).rows[0].reviewed_by).toBe(REVIEWER);
  });

  it("shows sign-offs and notes to staff on the client only", async () => {
    expect((await as(PREPARER, `select ref from public.workpaper_signoffs`)).rows).toEqual([{ ref: "10" }]);
    expect((await as(OTHER, `select * from public.review_notes`)).rows).toEqual([]);
    expect((await as(CLIENT_USER, `select * from public.workpaper_signoffs`)).rows).toEqual([]);
    await expect(sign(PREPARER, "99", "prepare")).rejects.toThrow(/ref_check/);
  });
});
