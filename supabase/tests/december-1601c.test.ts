/**
 * December's 1601-C is due 15 January (migration 20261212000003_december_1601c.sql).
 * The migration runs on a database made before it: the 1601-C rule hands December
 * to a new rule, open December filings move to 15 January, filed ones and other
 * months keep their dates. A new database gets the same rules from seed.sql.
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
const DB_NAME = "december_1601c_test";
const MIGRATION = "20261212000003_december_1601c.sql";

describe.skipIf(!url)("December 1601-C due 15 January", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  const id: Record<string, string> = {};

  const filing = async (key: string, obligation: string, client: string, form: string, rule: string, month: string, statutory: string, due: string, status = "not_started") => {
    const end = new Date(Date.UTC(Number(month.slice(0, 4)), Number(month.slice(5, 7)), 0)).toISOString().slice(0, 10);
    id[key] = (await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning id`,
      [obligation, client, form, month, `${month}-01`, end, rule, statutory, due, status],
    )).rows[0].id;
  };
  const dates = async (key: string) =>
    (await db.query(`select rule_id, statutory_due_date::text as statutory, due_date::text as due from public.filing_instances where id = $1`, [id[key]])).rows[0];

  beforeAll(async () => {
    await admin.connect();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.query(`create database ${DB_NAME}`);
    db = new Client({ connectionString: url!.replace(/^(postgres(?:ql)?:\/\/[^/]*\/)[^?]*/, `$1${DB_NAME}`) });
    await db.connect();
    await db.query(read("tests/supabase-stub.sql"));
    const migrations = readdirSync(path.join(root, "migrations")).sort();
    const before = migrations.filter((f) => f < MIGRATION);
    for (const f of before) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));

    // The rules as they stood before the migration: one 1601-C rule for every month.
    await db.query(`insert into public.deadline_rules (id, form, frequency, period_filter, calendar_year, due, effective_from) values
      ('0619E', '0619-E', 'monthly', 'exclude_quarter_end_months', true, '{"kind":"day_of_month_after","monthsAfter":1,"day":10}', '2026-01-01'),
      ('1601C', '1601-C', 'monthly', 'all', true, '{"kind":"day_of_month_after","monthsAfter":1,"day":10}', '2025-01-01')`);
    const brand = (await db.query(`insert into public.brands (code, display_name, legal_name, tax_on_fee, portal_domain) values ('TC', 'Tallo CPA', 'Tallo', 'percentage_tax_3', 'x') returning id`)).rows[0].id;
    const client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9902', 'Molo Bakery', 'corporation') returning id`, [brand])).rows[0].id;
    const c = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1601-C', 'monthly', '2025-01-01') returning id`, [client])).rows[0].id;
    const e = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '0619-E', 'monthly', '2025-01-01') returning id`, [client])).rows[0].id;
    await filing("dec2025Filed", c, client, "1601-C", "1601C", "2025-12", "2026-01-10", "2026-01-12", "filed");
    await filing("nov2026", c, client, "1601-C", "1601C", "2026-11", "2026-12-10", "2026-12-10");
    await filing("dec2026", c, client, "1601-C", "1601C", "2026-12", "2027-01-10", "2027-01-11", "prepared");
    await filing("nov0619E", e, client, "0619-E", "0619E", "2026-11", "2026-12-10", "2026-12-10");

    for (const f of migrations.filter((m) => m >= MIGRATION)) await db.query(read(`migrations/${f}`));
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("splits the 1601-C rule: December on its own, due the 15th", async () => {
    const rules = (await db.query(`select id, period_filter, due, effective_from::text as from from public.deadline_rules where form = '1601-C' order by id`)).rows;
    expect(rules).toEqual([
      { id: "1601C", period_filter: "exclude_year_end_month", due: { kind: "day_of_month_after", monthsAfter: 1, day: 10 }, from: "2025-01-01" },
      { id: "1601C-DEC", period_filter: "year_end_month_only", due: { kind: "day_of_month_after", monthsAfter: 1, day: 15 }, from: "2025-01-01" },
    ]);
    expect((await db.query(`select period_filter from public.deadline_rules where id = '0619E'`)).rows[0].period_filter).toBe("exclude_quarter_end_months");
  });

  it("moves the open December 2026 1601-C to 15 January 2027 and leaves the rest", async () => {
    expect(await dates("dec2026")).toEqual({ rule_id: "1601C-DEC", statutory: "2027-01-15", due: "2027-01-15" });
    expect(await dates("nov2026")).toEqual({ rule_id: "1601C", statutory: "2026-12-10", due: "2026-12-10" });
    expect(await dates("dec2025Filed")).toEqual({ rule_id: "1601C", statutory: "2026-01-10", due: "2026-01-12" });
    expect(await dates("nov0619E")).toEqual({ rule_id: "0619E", statutory: "2026-12-10", due: "2026-12-10" });
  });

  it("rejects an unknown period filter", async () => {
    await expect(db.query(`update public.deadline_rules set period_filter = 'december' where id = '1601C'`)).rejects.toThrow(/period_filter/);
  });

  it("gives a new database the same rules from seed.sql", async () => {
    await db.query(`delete from public.filing_instances`);
    await db.query(`delete from public.deadline_rules`);
    await db.query(read("seed.sql"));
    const rules = (await db.query(`select id, period_filter, due ->> 'day' as day from public.deadline_rules where form = '1601-C' order by id`)).rows;
    expect(rules).toEqual([
      { id: "1601C", period_filter: "exclude_year_end_month", day: "10" },
      { id: "1601C-DEC", period_filter: "year_end_month_only", day: "15" },
    ]);
  });
});
