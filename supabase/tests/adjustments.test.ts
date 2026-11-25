/**
 * Adjustments (migration 20261125000012_adjustments.sql): only ever a journal entry,
 * with its kind and reason; posting one takes away the review of the month's tie-outs,
 * which cannot be reviewer-signed again until the reviewer ticks it.
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
const DB_NAME = "adjustments_test";
const PREPARER = "00000000-0000-0000-0000-0000000000d1";
const REVIEWER = "00000000-0000-0000-0000-0000000000d2";

describe.skipIf(!url)("adjustments", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let lines: string;

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
  const sign = (user: string, ref: string, action: string) => as(user, `select public.sign_workpaper($1, '2027-03-01', $2, $3)`, [client, ref, action]);
  const reviewed = async (ref: string) => (await db.query(`select reviewed_at from public.workpaper_signoffs where client_id = $1 and ref = $2`, [client, ref])).rows[0]?.reviewed_at ?? null;

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
    await db.query(`insert into auth.users (id) values ($1), ($2)`, [PREPARER, REVIEWER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Preparer', 'staff'), ($2, $3, 'Reviewer', 'reviewer')`, [PREPARER, REVIEWER, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9981', 'Jaro Agri Supply', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    await as(PREPARER, `select public.setup_books($1, 'sole_proprietorship', '2027-01-01', $2)`, [client, JSON.stringify(templatePayload("sole_proprietorship"))]);
    const acct = async (k: string) => (await db.query(`select id from public.ledger_accounts where client_id = $1 and template_key = $2`, [client, k])).rows[0].id;
    lines = JSON.stringify([{ account_id: await acct("penalties"), debit: "1200" }, { account_id: await acct("input_vat"), credit: "1200" }]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("needs a kind and a reason, and is a posted journal entry", async () => {
    await expect(as(PREPARER, `select public.post_adjustment($1, '2027-03-31', 'Disallow input VAT', null, $2, 'disallowance', ' ')`, [client, lines])).rejects.toThrow(/reason/);
    await expect(as(PREPARER, `select public.post_adjustment($1, '2027-03-31', 'Disallow input VAT', null, $2, 'guess', 'x')`, [client, lines])).rejects.toThrow(/kind/);
    await sign(PREPARER, "0-2", "prepare");
    await sign(REVIEWER, "0-2", "review");
    const e = (await as(PREPARER, `select public.post_adjustment($1, '2027-03-31', 'Disallow input VAT on SI 77', 'ADJ-1', $2, 'disallowance', 'Invoice not addressed to the client') as id`, [client, lines])).rows[0].id;
    expect((await db.query(`select status, source from public.journal_entries where id = $1`, [e])).rows[0]).toEqual({ status: "posted", source: "manual" });
    expect((await db.query(`select kind, reason, ticked_at from public.adjustments where entry_id = $1`, [e])).rows[0]).toEqual({ kind: "disallowance", reason: "Invoice not addressed to the client", ticked_at: null });
    // The month's tie-outs lose their review.
    expect(await reviewed("0-2")).toBeNull();
  });

  it("keeps 0-2 from being reviewer-signed until the reviewer ticks every adjustment", async () => {
    await expect(sign(REVIEWER, "0-2", "review")).rejects.toThrow(/Tick the month's adjustments first/);
    const e = (await db.query(`select entry_id from public.adjustments where client_id = $1`, [client])).rows[0].entry_id;
    await expect(as(PREPARER, `select public.tick_adjustment($1, true)`, [e])).rejects.toThrow(/reviewer or the Owner/);
    await as(REVIEWER, `select public.tick_adjustment($1, true)`, [e]);
    await sign(REVIEWER, "0-2", "review");
    expect(await reviewed("0-2")).not.toBeNull();
  });

  it("leaves a plain journal entry alone", async () => {
    const e = (await as(PREPARER, `select public.post_journal_entry($1, '2027-03-30', 'Reclass', null, $2) as id`, [client, lines])).rows[0].id;
    expect((await db.query(`select count(*)::int as n from public.adjustments where entry_id = $1`, [e])).rows[0].n).toBe(0);
    expect(await reviewed("0-2")).not.toBeNull();
  });
});
