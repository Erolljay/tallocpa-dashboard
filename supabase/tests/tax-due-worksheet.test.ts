/**
 * The tax due on a return comes from its saved worksheet (migration 20261212000002): the
 * figure "__tax_due" wins over what is sent when the return is prepared; forms without a
 * worksheet keep the amount entered.
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
const DB_NAME = "tax_due_worksheet_test";

describe.skipIf(!url)("tax due from the worksheet", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  const filing: Record<string, string> = {};

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
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9961', 'Molo Tax Due Inc.', 'corporation') returning id`, [brand])).rows[0].id;
    for (const [key, form, rule] of [["vat", "2550Q", "2550Q"], ["other", "1702-RT", "1702RT"]]) {
      const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, $2, 'quarterly', '2020-01-01') returning id`, [client, form])).rows[0].id;
      filing[key] = (await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date)
         values ($1, $2, $3, 'Q4 2026', '2026-10-01', '2026-12-31', $4, '2027-01-25', '2027-01-25') returning id`,
        [ob, client, form, rule],
      )).rows[0].id;
    }
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  const due = async (key: string) => (await db.query(`select tax_due from public.filing_instances where id = $1`, [filing[key]])).rows[0].tax_due;

  it("takes the worksheet's tax due over the amount sent", async () => {
    await db.query(`insert into public.return_worksheets (filing_instance_id, client_id, inputs, result, figures, computed_at) values ($1, $2, '{}', '{"sections": []}', '{"total_amount_payable": 6240000, "__tax_due": 6240000}', now())`, [filing.vat, client]);
    await db.query(`update public.filing_instances set tax_due = 1 where id = $1`, [filing.vat]);
    expect(await due("vat")).toBe("62400.00");
  });

  it("keeps the amount entered when there is no saved worksheet", async () => {
    await db.query(`update public.filing_instances set tax_due = 1500 where id = $1`, [filing.other]);
    expect(await due("other")).toBe("1500.00");
  });
});
