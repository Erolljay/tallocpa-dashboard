/**
 * A client's payment dated in a locked month (migration 20261212000001): its dues payment
 * entry is booked on the first day of the next open month, with the payment date in the
 * memo, instead of being refused.
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
const DB_NAME = "late_dues_payment_test";
const STAFF = "00000000-0000-0000-0000-000000000d01";

describe.skipIf(!url)("a payment dated in a locked month", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  const acct: Record<string, string> = {};

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
    await db.query(`insert into auth.users (id) values ($1)`, [STAFF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $2, 'Preparer', 'staff')`, [STAFF, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9951', 'Iloilo Late Payer Inc.', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [STAFF]);
    await db.query("set local role authenticated");
    await db.query(`select public.setup_books($1, 'stock_corporation', '2026-10-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    await db.query("commit");
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  const post = (date: string) =>
    db.query(`select private.post_dues_entry($1, $2, 1000, $3, $4, 'Bureau of Internal Revenue', 'Payment of 2550Q Q4 2026', 'REF-1') as id`, [
      client, date, acct.vat_payable ?? Object.values(acct)[0], acct.cash_on_hand ?? acct.cash_in_bank ?? Object.values(acct)[1],
    ]);
  const entry = async (id: string) => (await db.query(`select entry_date::text as d, memo from public.journal_entries where id = $1`, [id])).rows[0];

  it("books on the payment date while its month is open", async () => {
    const id = (await post("2026-12-29")).rows[0].id;
    expect(await entry(id)).toEqual({ d: "2026-12-29", memo: "Payment of 2550Q Q4 2026" });
  });

  it("books on the first day of the next open month once the month is locked, saying when it was paid", async () => {
    await db.query(`insert into public.books_month_locks (client_id, month) values ($1, '2026-12-01')`, [client]);
    const id = (await post("2026-12-29")).rows[0].id;
    expect(await entry(id)).toEqual({ d: "2027-01-01", memo: "Payment of 2550Q Q4 2026 · paid Dec 29, 2026, booked in January 2027 (December was locked)" });
    // January locked too: February.
    await db.query(`insert into public.books_month_locks (client_id, month) values ($1, '2027-01-01')`, [client]);
    expect((await entry((await post("2026-12-30")).rows[0].id)).d).toBe("2027-02-01");
  });
});
