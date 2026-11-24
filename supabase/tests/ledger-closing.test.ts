/**
 * Slice 7 database tests (migration 20261124000010_year_end_closing.sql): the
 * closing entry brings income and expenses to nil against retained earnings,
 * the owner's capital or the partners' capital; the trial balance reads the
 * year before closing and the next year after it; the period lock does not stop it.
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
const DB_NAME = "ledger_closing_test";

const OWNER = "00000000-0000-0000-0000-000000000071";
const STAFF = "00000000-0000-0000-0000-000000000072";

describe.skipIf(!url)("ledger: year-end closing", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let brand: string;

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

  /** A client with books from 1 January 2025 on a template; returns its id and accounts by template key. */
  async function books(code: string, template: string, taxpayer: string) {
    const id = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, $2, $2, $3) returning id`, [brand, code, taxpayer])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [id, STAFF]);
    await db.query(`insert into public.engagements (client_id, service_line, start_date) values ($1, 'bookkeeping', '2025-01-01')`, [id]);
    await as(STAFF, `select public.setup_books($1, $2, '2025-01-01', $3)`, [id, template, JSON.stringify(templatePayload(template as never))]);
    const acct: Record<string, string> = {};
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [id])).rows) acct[r.template_key] = r.id;
    return { id, acct };
  }
  const post = (client: string, date: string, lines: [string, number, number][]) =>
    as(STAFF, `select public.post_journal_entry($1, $2, 'x', null, $3)`, [client, date, JSON.stringify(lines.map(([account_id, debit, credit]) => ({ account_id, debit: String(debit), credit: String(credit) })))]);
  const tb = async (client: string, from: string, to: string) => {
    const rows = (await as(STAFF, `select a.template_key as k, t.opening, t.closing from public.trial_balance($1, $2, $3) t join public.ledger_accounts a on a.id = t.account_id where t.closing <> 0 or t.opening <> 0`, [client, from, to])).rows;
    return Object.fromEntries(rows.map((r) => [r.k, [Number(r.opening), Number(r.closing)]]));
  };

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
    await db.query(`insert into auth.users (id) values ($1), ($2)`, [OWNER, STAFF]);
    brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("closes a corporation's income and expenses into retained earnings; the year reads before closing, the next year after", async () => {
    const { id, acct } = await books("TC-9701", "stock_corporation", "corporation");
    await post(id, "2025-03-01", [[acct.cash_on_hand, 50_000, 0], [acct.sales, 0, 50_000]]);
    await post(id, "2025-06-01", [[acct.rent, 20_000, 0], [acct.cash_on_hand, 0, 20_000]]);
    await expect(as(STAFF, `select public.close_books_year($1, '2025-11-30')`, [id])).rejects.toThrow(/last day of the taxable year/);
    await expect(as(STAFF, `select public.close_books_year($1, '2099-12-31')`, [id])).rejects.toThrow(/not ended yet/);
    // A filed return locks December: the closing entry still goes through.
    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1601-C', 'monthly', '2020-01-01') returning id`, [id])).rows[0].id;
    await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
       values ($1, $2, '1601-C', '2025-12', '2025-12-01', '2025-12-31', '1601C', '2026-01-10', '2026-01-10', 'filed')`,
      [ob, id],
    );
    const e = (await as(STAFF, `select public.close_books_year($1, '2025-12-31') as id`, [id])).rows[0].id;
    const lines = (await db.query(`select a.template_key as k, l.debit, l.credit from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id where l.entry_id = $1 order by l.line_no`, [e])).rows;
    expect(lines).toEqual([
      { k: "sales", debit: "50000.00", credit: "0.00" },
      { k: "rent", debit: "0.00", credit: "20000.00" },
      { k: "retained_earnings", debit: "0.00", credit: "30000.00" },
    ]);
    await expect(as(STAFF, `select public.close_books_year($1, '2025-12-31')`, [id])).rejects.toThrow(/already closed/);

    // The year, before closing; the next year opens after it.
    expect(await tb(id, "2025-01-01", "2025-12-31")).toMatchObject({ sales: [0, -5_000_000 / 100], rent: [0, 20_000], cash_on_hand: [0, 30_000] });
    expect((await tb(id, "2025-01-01", "2025-12-31")).retained_earnings).toBeUndefined();
    const next = await tb(id, "2026-01-01", "2026-01-31");
    expect(next.retained_earnings).toEqual([-30_000, -30_000]);
    expect(next.sales).toBeUndefined();
    // Income for the year's returns still counts the year's sales.
    const income = (await as(STAFF, `select sum(net) as net from public.ledger_income($1, '2025-01-01', '2025-12-31')`, [id])).rows[0].net;
    expect(Number(income)).toBe(-30_000);

    // Reversing the closing entry (dated in the locked December) reopens the year for closing.
    await as(STAFF, `select public.reverse_journal_entry($1, '2025-12-31', 'Missed accrual')`, [e]);
    expect((await tb(id, "2026-01-01", "2026-01-31")).retained_earnings).toBeUndefined();
    expect(await as(STAFF, `select public.close_books_year($1, '2025-12-31') as id`, [id]).then((r) => r.rows[0].id)).toBeTruthy();
  });

  it("closes a sole proprietor's income and drawings into capital", async () => {
    const { id, acct } = await books("TC-9702", "sole_proprietorship", "individual");
    await post(id, "2025-02-01", [[acct.cash_on_hand, 10_000, 0], [acct.service_income, 0, 10_000]]);
    await post(id, "2025-02-02", [[acct.owners_drawings, 4_000, 0], [acct.cash_on_hand, 0, 4_000]]);
    await as(STAFF, `select public.close_books_year($1, '2025-12-31')`, [id]);
    expect(await tb(id, "2026-01-01", "2026-01-31")).toEqual({ cash_on_hand: [6_000, 6_000], owners_capital: [-6_000, -6_000] });
  });

  it("splits a partnership's income by the partners' shares", async () => {
    const { id, acct } = await books("TC-9703", "partnership", "partnership");
    await post(id, "2025-02-01", [[acct.cash_on_hand, 10_000.01, 0], [acct.service_income, 0, 10_000.01]]);
    await expect(as(STAFF, `select public.close_books_year($1, '2025-12-31')`, [id])).rejects.toThrow(/each partner's share/);
    const shares = (a: number, b: number) => JSON.stringify([{ account_id: acct.partner_a_capital, percent: a }, { account_id: acct.partner_b_capital, percent: b }]);
    await expect(as(STAFF, `select public.close_books_year($1, '2025-12-31', $2)`, [id, shares(60, 30)])).rejects.toThrow(/add up to 90 percent/);
    await as(STAFF, `select public.close_books_year($1, '2025-12-31', $2)`, [id, shares(60, 40)]);
    const next = await tb(id, "2026-01-01", "2026-01-31");
    expect(next.partner_a_capital).toEqual([-6_000.01, -6_000.01]);
    expect(next.partner_b_capital).toEqual([-4_000, -4_000]);
  });
});
