/**
 * Database tests: migrations apply, seed loads, and row-level security keeps
 * each person to their own clients (spec §1.1, §3.14).
 * Run with `pnpm test:db` (starts a throwaway Postgres).
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildSeedSql } from "@/lib/deadlines/seed-sql";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");

const OWNER = "00000000-0000-0000-0000-000000000001";
const STAFF = "00000000-0000-0000-0000-000000000002";
const REVIEWER = "00000000-0000-0000-0000-000000000003";
const CLIENT_USER = "00000000-0000-0000-0000-000000000004";

describe("seed.sql", () => {
  it("is up to date with src/lib/deadlines/seed.ts (run pnpm db:seed:generate)", () => {
    expect(read("seed.sql")).toBe(buildSeedSql());
  });
});

describe.skipIf(!url)("database", () => {
  const db = new Client({ connectionString: url });
  let clientA: string;
  let clientB: string;

  /** Runs `sql` as the given signed-in user, inside a transaction that is rolled back. */
  async function as<T = Record<string, unknown>>(user: string, sql: string, params: unknown[] = []): Promise<T[]> {
    await db.query("begin");
    try {
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
      await db.query("set local role authenticated");
      const res = await db.query(sql, params);
      return res.rows as T[];
    } finally {
      await db.query("rollback");
    }
  }

  beforeAll(async () => {
    await db.connect();
    await db.query("drop schema if exists public cascade; drop schema if exists private cascade; drop schema if exists auth cascade; create schema public;");
    await db.query(read("tests/supabase-stub.sql"));
    for (const f of readdirSync(path.join(root, "migrations")).sort()) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
    await db.query(read("seed.sql"));

    await db.query(
      `insert into auth.users (id) values ($1), ($2), ($3), ($4)`,
      [OWNER, STAFF, REVIEWER, CLIENT_USER],
    );
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values
       ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Reviewer', 'reviewer')`,
      [OWNER, STAFF, REVIEWER, brand],
    );
    const ins = `insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, $2, $3, 'corporation') returning id`;
    clientA = (await db.query(ins, [brand, "TC-9001", "Client A"])).rows[0].id;
    clientB = (await db.query(ins, [brand, "TC-9002", "Client B"])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [clientA, STAFF, REVIEWER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Client A owner')`, [CLIENT_USER, clientA]);
  });

  afterAll(async () => {
    await db.end();
  });

  it("loads the brand, service lines, rules and holidays", async () => {
    const counts = (
      await db.query(`select
        (select legal_name from public.brands where code = 'TC') as legal_name,
        (select count(*)::int from public.service_lines) as service_lines,
        (select count(*)::int from public.deadline_rules) as rules,
        (select count(*)::int from public.deadline_rules where source = 'UNVERIFIED') as unverified,
        (select count(*)::int from public.holidays) as holidays`)
    ).rows[0];
    expect(counts.legal_name).toBe("EJ Tallo Cloud Accounting and Auditing Services");
    expect(counts.service_lines).toBe(10);
    expect(counts.rules).toBeGreaterThan(10);
    expect(counts.unverified).toBe(counts.rules);
    expect(counts.holidays).toBeGreaterThan(10);
  });

  it("Owner sees every client", async () => {
    expect(await as(OWNER, "select code from public.clients order by code")).toEqual([{ code: "TC-9001" }, { code: "TC-9002" }]);
  });

  it("staff see only assigned clients", async () => {
    expect(await as(STAFF, "select code from public.clients order by code")).toEqual([{ code: "TC-9001" }]);
  });

  it("a client user sees only their own client and no staff", async () => {
    expect(await as(CLIENT_USER, "select code from public.clients")).toEqual([{ code: "TC-9001" }]);
    expect(await as(CLIENT_USER, "select user_id from public.staff_profiles")).toEqual([]);
    expect(await as(CLIENT_USER, "select id from public.deadline_rules")).toEqual([]);
  });

  it("a signed-in stranger sees nothing", async () => {
    expect(await as("00000000-0000-0000-0000-0000000000ff", "select id from public.clients")).toEqual([]);
  });

  it("only the Owner creates clients", async () => {
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    const sql = `insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-0099', 'X', 'individual') returning code`;
    await expect(as(STAFF, sql, [brand])).rejects.toThrow(/row-level security/);
    await expect(as(REVIEWER, sql, [brand])).rejects.toThrow(/row-level security/);
    expect(await as(OWNER, sql, [brand])).toEqual([{ code: "TC-0099" }]);
  });

  it("an assigned Reviewer can edit the client, staff cannot", async () => {
    const sql = `update public.clients set registered_address = 'Iloilo City' where id = $1 returning code`;
    expect(await as(REVIEWER, sql, [clientA])).toEqual([{ code: "TC-9001" }]);
    expect(await as(STAFF, sql, [clientA])).toEqual([]);
    expect(await as(REVIEWER, sql, [clientB])).toEqual([]);
  });

  it("filing instances cannot be written through the API", async () => {
    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1601-C', 'monthly', '2027-01-01') returning id`, [clientA])).rows[0].id;
    const sql = `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date)
                 values ($1, $2, '1601-C', '2027-01', '2027-01-01', '2027-01-31', '1601C', '2027-02-10', '2027-02-10')`;
    await expect(as(OWNER, sql, [ob, clientA])).rejects.toThrow(/row-level security/);
  });

  it("rejects an eFPS client without a group, and a bad TIN", async () => {
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await expect(
      db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, filing_channel) values ($1, 'TC-0100', 'X', 'individual', 'efps')`, [brand]),
    ).rejects.toThrow(/check constraint/);
    await expect(
      db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, tin) values ($1, 'TC-0101', 'X', 'individual', '12345')`, [brand]),
    ).rejects.toThrow(/check constraint/);
  });

  it("writes every change to the audit log, readable by the Owner only", async () => {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [REVIEWER]);
    await db.query("set local role authenticated");
    await db.query(`update public.clients set name = 'Client A Corp.' where id = $1`, [clientA]);
    await db.query("reset role");
    const row = (await db.query(`select actor, action, old_row ->> 'name' as old_name, new_row ->> 'name' as new_name from public.audit_log where table_name = 'clients' and row_pk = $1 order by id desc limit 1`, [clientA])).rows[0];
    await db.query("rollback");
    expect(row).toEqual({ actor: REVIEWER, action: "UPDATE", old_name: "Client A", new_name: "Client A Corp." });
    expect(await as(STAFF, "select id from public.audit_log")).toEqual([]);
  });
  it("Owner creates a client with obligations in one step, numbered per brand", async () => {
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    const call = `select (c).code, (c).status from public.create_client_with_obligations($1::jsonb, $2::jsonb, '2027-01-04', $3::jsonb) as c`;
    const client = JSON.stringify({ brand_id: brand, name: "Iloilo Feast Food Corp.", taxpayer_type: "corporation", tin: "123-456-789-00000" });
    const obligations = JSON.stringify([
      { form: "1702Q", frequency: "quarterly", start_date: "2027-01-04" },
      { form: "2550Q", frequency: "quarterly", start_date: "2027-01-04" },
    ]);
    await db.query("begin");
    try {
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [OWNER]);
      await db.query("set local role authenticated");
      const first = (await db.query(call, [client, '["income_tax","vat"]', obligations])).rows[0];
      const second = (await db.query(call, [client, "[]", "[]"])).rows[0];
      const forms = (await db.query(`select o.form from public.obligations o join public.clients c on c.id = o.client_id where c.code = $1 order by o.form`, [first.code])).rows;
      const reg = (await db.query(`select r.tax_types from public.client_registrations r join public.clients c on c.id = r.client_id where c.code = $1`, [first.code])).rows[0];
      expect(first).toEqual({ code: "TC-0001", status: "onboarding" });
      expect(second.code).toBe("TC-0002");
      expect(forms).toEqual([{ form: "1702Q" }, { form: "2550Q" }]);
      expect(reg.tax_types).toEqual(["income_tax", "vat"]);
    } finally {
      await db.query("rollback");
    }
  });

  it("Owner edits a client and switches it from percentage tax to VAT from a date", async () => {
    await db.query("begin");
    try {
      const ob = `insert into public.obligations (client_id, form, frequency, start_date) values ($1, $2, 'quarterly', '2026-01-01') returning id`;
      const pt = (await db.query(ob, [clientB, "2551Q"])).rows[0].id;
      await db.query(ob, [clientB, "1702Q"]);
      // A not-started filing after the switch is dropped; one already in progress stays.
      await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
         values ($1, $2, '2551Q', 'FY2027-Q1', '2027-01-01', '2027-03-31', '2551Q', '2027-04-25', '2027-04-26', 'not_started'),
                ($1, $2, '2551Q', 'FY2027-Q2', '2027-04-01', '2027-06-30', '2551Q', '2027-07-25', '2027-07-26', 'prepared')`,
        [pt, clientB],
      );
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [OWNER]);
      await db.query("set local role authenticated");
      const updated = (
        await db.query(
          `select (c).name, (c).tin from public.update_client_with_obligations($1, $2::jsonb, '["income_tax","vat"]', '2027-01-01', $3::jsonb, array['2551Q']) as c`,
          [
            clientB,
            JSON.stringify({ name: "Client B Inc.", taxpayer_type: "corporation", tin: "123-456-789-00000", fiscal_year_end_month: 12, filing_channel: "ebirforms", book_type: "manual", payment_mode: "client_pays_direct", submission_cutoff_day: 5 }),
            JSON.stringify([{ form: "2550Q", frequency: "quarterly" }]),
          ],
        )
      ).rows[0];
      const obligations = (await db.query(`select form, start_date::text, end_date::text from public.obligations where client_id = $1 order by form`, [clientB])).rows;
      const filings = (await db.query(`select period_label from public.filing_instances where client_id = $1`, [clientB])).rows;
      expect(updated).toEqual({ name: "Client B Inc.", tin: "123-456-789-00000" });
      expect(obligations).toEqual([
        { form: "1702Q", start_date: "2026-01-01", end_date: null },
        { form: "2550Q", start_date: "2027-01-01", end_date: null },
        { form: "2551Q", start_date: "2026-01-01", end_date: "2026-12-31" },
      ]);
      expect(filings).toEqual([{ period_label: "FY2027-Q2" }]);
    } finally {
      await db.query("rollback");
    }
  });

  it("staff and reviewers cannot edit clients through the edit function", async () => {
    for (const who of [STAFF, REVIEWER]) {
      await expect(
        as(who, `select public.update_client_with_obligations($1, $2::jsonb, null, null, null, null)`, [clientA, JSON.stringify({ name: "X", taxpayer_type: "corporation" })]),
      ).rejects.toThrow(/Only the Owner/);
    }
  });

  describe("sign-off chain", () => {
    /** Runs steps as different people inside one transaction that is rolled back. */
    async function chain(
      run: (step: (who: string, action: string, note?: string | null, data?: object) => Promise<Record<string, unknown>>) => Promise<void>,
      opts: { firmRemits?: boolean } = {},
    ) {
      await db.query("begin");
      try {
        if (opts.firmRemits) await db.query(`update public.clients set payment_mode = 'firm_remits' where id = $1`, [clientA]);
        const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2026-01-01') returning id`, [clientA])).rows[0].id;
        const filing = (
          await db.query(
            `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date)
             values ($1, $2, '2550Q', 'FY2027-Q1', '2027-01-01', '2027-03-31', '2550Q', '2027-04-25', '2027-04-26') returning id`,
            [ob, clientA],
          )
        ).rows[0].id;
        await db.query("set local role authenticated");
        await run(async (who, action, note = null, data = {}) => {
          await db.query("select set_config('request.jwt.claim.sub', $1, true)", [who]);
          await db.query("savepoint step");
          try {
            const r = await db.query(`select (f).status, (f).tax_due::text, (f).open_query, (f).filing_reference from public.advance_filing($1, $2, $3, $4::jsonb) as f`, [filing, action, note, JSON.stringify(data)]);
            await db.query("release savepoint step");
            return r.rows[0];
          } catch (e) {
            await db.query("rollback to savepoint step");
            throw e;
          }
        });
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [OWNER]);
        const events = (await db.query(`select from_status, to_status, action from public.filing_events where filing_instance_id = $1 order by id`, [filing])).rows;
        expect(events.length).toBeGreaterThan(0);
        expect(events[0].from_status).toBe("not_started");
      } finally {
        await db.query("rollback");
      }
    }

    it("runs a return from preparation to done, each step by the right person", async () => {
      await chain(async (step) => {
        expect(await step(STAFF, "prepare", null, { tax_due: "12500.50" })).toMatchObject({ status: "prepared", tax_due: "12500.50" });
        await expect(step(STAFF, "review")).rejects.toThrow(/reviewer or the Owner/);
        expect(await step(REVIEWER, "review")).toMatchObject({ status: "reviewed" });
        expect(await step(CLIENT_USER, "client_query", "Why is output VAT higher?")).toMatchObject({ status: "reviewed", open_query: "Why is output VAT higher?" });
        expect(await step(STAFF, "answer_query", "Two large December sales.")).toMatchObject({ open_query: null });
        expect(await step(CLIENT_USER, "client_approve")).toMatchObject({ status: "client_approved" });
        await expect(step(REVIEWER, "owner_approve")).rejects.toThrow(/Only the Owner/);
        // The firm remits this client's tax and nothing has been paid: the check says unpaid,
        // whatever the form claims, and even the Owner waits for the payment (decision 13).
        await expect(step(OWNER, "owner_approve", null, { payment_status: "paid" })).rejects.toThrow(/not verified yet \(not on a statement yet\)/);
        await expect(step(OWNER, "owner_approve", null, { approve_unpaid: true })).rejects.toThrow(/not verified yet/);
        // A client who pays the BIR directly has no item to check.
        await db.query("reset role");
        await db.query(`update public.clients set payment_mode = 'client_pays_direct' where id = $1`, [clientA]);
        await db.query("set local role authenticated");
        expect(await step(OWNER, "owner_approve")).toMatchObject({ status: "owner_approved" });
        await expect(step(STAFF, "file", null, { filed_on: "2027-04-20" })).rejects.toThrow(/filing reference/);
        await expect(step(STAFF, "file", null, { filing_reference: "EFPS-123456", filed_on: "2027-04-20" })).rejects.toThrow(/payment reference/);
        await expect(step(STAFF, "file", null, { filing_reference: "EFPS-123456", filed_on: "2027-04-20", payment_reference: "LBP-998877", paid_on: "2027-04-21" })).rejects.toThrow(/scanned copy/);
        await expect(step(STAFF, "pay")).rejects.toThrow(/Unknown action/);
        const check = (await db.query(`select data -> 'payment_check' as c from public.filing_events where action = 'owner_approve' order by id desc limit 1`)).rows[0].c;
        expect(check).toMatchObject({ status: "not_applicable" });
      }, { firmRemits: true });
    });

    it("a reviewer can send a return back with a reason, and cannot review their own work", async () => {
      await chain(async (step) => {
        await step(REVIEWER, "prepare", null, { tax_due: 0 });
        await expect(step(REVIEWER, "review")).rejects.toThrow(/another person must review/);
        await expect(step(REVIEWER, "kick_back")).rejects.toThrow(/what needs fixing/);
        expect(await step(REVIEWER, "kick_back", "Input VAT missing November receipts")).toMatchObject({ status: "not_started" });
      });
    });

    it("the Owner can record a client's approval on their behalf, with a note", async () => {
      await chain(async (step) => {
        await step(OWNER, "prepare", null, { tax_due: 100 });
        await step(OWNER, "review");
        await expect(step(OWNER, "client_approve")).rejects.toThrow(/how the client approved/);
        expect(await step(OWNER, "client_approve", "Approved by email, 20 Apr")).toMatchObject({ status: "client_approved" });
      });
    });

    it("steps cannot be skipped and strangers cannot act", async () => {
      await chain(async (step) => {
        await expect(step(OWNER, "file", null, { filing_reference: "X", filed_on: "2027-04-20" })).rejects.toThrow(/Only an approved return/);
        await expect(step(CLIENT_USER, "prepare", null, { tax_due: 0 })).rejects.toThrow(/assigned to this client/);
        await step(OWNER, "prepare", null, { tax_due: 0 });
      });
    });
  });

  describe("collections", () => {
    /**
     * Runs a money scenario inside one rolled-back transaction. `as` runs SQL as a
     * signed-in person; `admin` runs setup SQL with full rights.
     */
    async function money(
      run: (h: {
        as: <T = Record<string, unknown>>(who: string, sql: string, params?: unknown[]) => Promise<T[]>;
        admin: (sql: string, params?: unknown[]) => Promise<Record<string, unknown>[]>;
        withholding: string;
        vat: string;
      }) => Promise<void>,
    ) {
      await db.query("begin");
      try {
        await db.query(`update public.clients set payment_mode = 'firm_remits', billing_days = '{10,20}' where id = $1`, [clientA]);
        await db.query(`insert into public.engagements (client_id, service_line, monthly_retainer, start_date) values ($1, 'tax_compliance', 3000, '2027-01-01')`, [clientA]);
        const ob = async (form: string, frequency: string) =>
          (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, $2, $3, '2027-01-17') returning id`, [clientA, form, frequency])).rows[0].id;
        const filing = async (obligation: string, form: string, due: string, tax: number, status: string) =>
          (
            await db.query(
              `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, tax_due, status)
               values ($1, $2, $3, 'Jan 2027', '2027-01-01', '2027-01-31', '2550Q', $4, $4, $5, $6) returning id`,
              [obligation, clientA, form, due, tax, status],
            )
          ).rows[0].id;
        const withholding = await filing(await ob("1601-C", "monthly"), "1601-C", "2027-02-10", 5000, "reviewed");
        const vat = await filing(await ob("2550Q", "quarterly"), "2550Q", "2027-02-25", 8000, "prepared");
        await db.query("set local role authenticated");
        let n = 0;
        const step = async (sql: string, params: unknown[]) => {
          const sp = `s${n++}`;
          await db.query(`savepoint ${sp}`);
          try {
            const r = await db.query(sql, params);
            await db.query(`release savepoint ${sp}`);
            return r.rows;
          } catch (e) {
            await db.query(`rollback to savepoint ${sp}`);
            throw e;
          }
        };
        await run({
          withholding,
          vat,
          as: async (who, sql, params = []) => {
            await db.query("select set_config('request.jwt.claim.sub', $1, true)", [who]);
            return (await step(sql, params)) as never;
          },
          admin: async (sql, params = []) => {
            await db.query("reset role");
            try {
              return await step(sql, params);
            } finally {
              await db.query("set local role authenticated");
            }
          },
        });
      } finally {
        await db.query("rollback");
      }
    }

    const open = `select kind, description, amount::text, open_amount::text from public.due_balances where client_id = $1 order by due_on, kind`;

    it("bills on the billing days: retainer on the month's first statement, returns once reviewed", async () => {
      await money(async ({ as, admin, vat }) => {
        expect(await as(OWNER, `select public.run_billing('2027-02-10') as n`)).toEqual([{ n: 1 }]);
        const soas = await as(OWNER, `select reference, billing_date::text, due_on::text from public.soas where client_id = $1`, [clientA]);
        expect(soas).toEqual([{ reference: "TC-9001-2027-02-10", billing_date: "2027-02-10", due_on: "2027-02-15" }]);
        expect(await as(OWNER, open, [clientA])).toEqual([
          { kind: "tax", description: "Tax due, 1601-C Jan 2027", amount: "5000.00", open_amount: "5000.00" },
          { kind: "retainer", description: "Monthly retainer, February 2027", amount: "3000.00", open_amount: "3000.00" },
        ]);
        // Running again adds nothing; a day that is not a billing day bills no one.
        expect(await as(OWNER, `select public.run_billing('2027-02-10') as n`)).toEqual([{ n: 0 }]);
        expect(await as(OWNER, `select public.run_billing('2027-02-15') as n`)).toEqual([{ n: 0 }]);

        // VAT is reviewed later and goes on the 20th, without a second retainer.
        await admin(`update public.filing_instances set status = 'reviewed' where id = $1`, [vat]);
        expect(await as(OWNER, `select public.run_billing('2027-02-20') as n`)).toEqual([{ n: 1 }]);
        const second = await as(OWNER, `select d.kind, d.amount::text from public.client_dues d join public.soas s on s.id = d.soa_id where s.reference = 'TC-9001-2027-02-20'`);
        expect(second).toEqual([{ kind: "tax", amount: "8000.00" }]);

        // A client billed once a month is skipped on the 20th.
        await as(OWNER, `select public.set_billing_days($1, '{10}')`, [clientA]);
        await as(OWNER, `select public.add_client_charge($1, 'contribution', 'SSS contributions, January 2027', 1450, '2027-02-28')`, [clientA]);
        expect(await as(OWNER, `select public.run_billing('2027-03-20') as n`)).toEqual([{ n: 0 }]);
        expect(await as(OWNER, `select public.run_billing('2027-03-10') as n`)).toEqual([{ n: 1 }]);
        const march = await as(OWNER, `select d.kind, d.amount::text from public.client_dues d join public.soas s on s.id = d.soa_id where s.reference = 'TC-9001-2027-03-10' order by d.kind`);
        expect(march).toEqual([{ kind: "contribution", amount: "1450.00" }, { kind: "retainer", amount: "3000.00" }]);
      });
    });

    it("matches deposits oldest first; partials stay open, overpayments become credit, voids undo", async () => {
      await money(async ({ as, admin, vat }) => {
        await as(OWNER, `select public.run_billing('2027-02-10')`);
        const ids = (await as<{ id: string }>(OWNER, `select id from public.client_dues where client_id = $1`, [clientA])).map((r) => r.id);
        const deposit = (amount: number) =>
          as<{ id: string }>(OWNER, `select public.record_deposit($1, '2026-11-20', $2, null, 'BDO-111', '0042', null, $3) as id`, [clientA, amount, ids]);

        await deposit(4000);
        expect((await as(OWNER, open, [clientA])).map((r) => r.open_amount)).toEqual(["1000.00", "3000.00"]);
        const [{ id: second }] = await deposit(5000);
        expect((await as(OWNER, open, [clientA])).map((r) => r.open_amount)).toEqual(["0.00", "0.00"]);
        expect(await as(OWNER, `select unallocated::text from public.deposit_balances where id = $1`, [second])).toEqual([{ unallocated: "1000.00" }]);

        // The credit is used on the next statement.
        await admin(`update public.filing_instances set status = 'reviewed' where id = $1`, [vat]);
        await as(OWNER, `select public.run_billing('2027-02-20')`);
        expect(await as(OWNER, `select open_amount::text from public.due_balances where filing_instance_id = $1`, [vat])).toEqual([{ open_amount: "7000.00" }]);

        await expect(as(OWNER, `select public.void_deposit($1, '')`, [second])).rejects.toThrow(/why the deposit is voided/);
        await as(OWNER, `select public.void_deposit($1, 'Bounced cheque')`, [second]);
        expect((await as(OWNER, open, [clientA])).map((r) => r.open_amount)).toEqual(["1000.00", "3000.00", "8000.00"]);

        await expect(as(OWNER, `select public.record_deposit($1, '2999-01-01', 100, null, null, null, null, '{}')`, [clientA])).rejects.toThrow(/future/);
        await expect(as(OWNER, `select public.record_deposit($1, '2026-11-20', 10.005, null, null, null, null, '{}')`, [clientA])).rejects.toThrow(/two decimals/);
        await expect(as(OWNER, `select public.record_deposit($1, '2026-11-20', 100, null, null, null, null, '{}', 'check')`, [clientA])).rejects.toThrow(/check number/);
        await expect(as(OWNER, `select public.record_deposit($1, '2026-11-20', 100, null, null, null, null, '{}', 'cash')`, [clientA])).rejects.toThrow(/who deposited the cash/);
        const [{ id: cash }] = await as<{ id: string }>(OWNER, `select public.record_deposit($1, '2026-11-20', 100, null, null, null, null, '{}', 'cash', $2) as id`, [clientA, STAFF]);
        expect(await as(OWNER, `select method, deposited_by from public.client_deposits where id = $1`, [cash])).toEqual([{ method: "cash", deposited_by: STAFF }]);
      });
    });

    it("works out the payment check for the Owner's approval", async () => {
      await money(async ({ as, withholding }) => {
        const check = async () => (await as<{ c: Record<string, unknown> }>(OWNER, `select public.filing_payment_check($1) as c`, [withholding]))[0].c;
        expect(await check()).toMatchObject({ status: "unpaid", tax_status: "unpaid", tax_due: 5000, tax_paid: 0 });
        await as(OWNER, `select public.run_billing('2027-02-10')`);
        const tax = (await as<{ id: string }>(OWNER, `select id from public.client_dues where filing_instance_id = $1`, [withholding]))[0].id;
        await as(OWNER, `select public.record_deposit($1, '2026-11-20', 2000, null, null, null, null, $2)`, [clientA, [tax]]);
        expect(await check()).toMatchObject({ status: "partial", tax_status: "partial", tax_paid: 2000 });
        await as(OWNER, `select public.record_deposit($1, '2026-11-20', 3000, null, null, null, null, $2)`, [clientA, [tax]]);
        // The retainer falls due in 2027, so it does not count yet.
        expect(await check()).toMatchObject({ status: "paid", tax_status: "paid", other_open: 0 });
        await expect(as(STAFF, `select public.filing_payment_check($1)`, [withholding])).rejects.toThrow(/Only the Owner/);
      });
    });

    it("keeps money to the Owner and the client's own users", async () => {
      await money(async ({ as }) => {
        await as(OWNER, `select public.run_billing('2027-02-10')`);
        expect(await as(CLIENT_USER, `select reference from public.soas`)).toEqual([{ reference: "TC-9001-2027-02-10" }]);
        expect(await as(CLIENT_USER, `select count(*)::int as n from public.due_balances`)).toEqual([{ n: 2 }]);
        expect(await as(STAFF, `select count(*)::int as n from public.client_dues`)).toEqual([{ n: 0 }]);
        expect(await as(REVIEWER, `select count(*)::int as n from public.soas`)).toEqual([{ n: 0 }]);
        await expect(as(STAFF, `select public.run_billing('2027-02-10')`)).rejects.toThrow(/Only the Owner/);
        await expect(as(CLIENT_USER, `select public.record_deposit($1, '2026-11-20', 100, null, null, null, null, '{}')`, [clientA])).rejects.toThrow(/Only the Owner/);
        await expect(as(OWNER, `select public.run_scheduled_billing('2027-02-10')`)).rejects.toThrow(/permission denied/);
        await expect(as(OWNER, `insert into public.client_dues (client_id, kind, description, amount, due_on) values ($1, 'other', 'x', 1, '2027-01-01')`, [clientA])).rejects.toThrow(/row-level security/);
        // Payment QR codes: everyone signed in can view them, only the Owner uploads.
        await as(OWNER, `insert into storage.objects (bucket_id, name) values ('payment-qr', 'gcash.png')`);
        await expect(as(CLIENT_USER, `insert into storage.objects (bucket_id, name) values ('payment-qr', 'fake.png')`)).rejects.toThrow(/row-level security/);
      });
    });

    it("takes proof of payment from the client, For verification until the Owner verifies it into a deposit", async () => {
      await money(async ({ as }) => {
        await as(OWNER, `select public.run_billing('2027-02-10')`);
        const [{ id: soa }] = await as<{ id: string }>(OWNER, `select id from public.soas where client_id = $1`, [clientA]);
        const dir = `${clientA}/${soa}`;
        const submit = (path: string, amount: number, paidOn = "2026-11-20") =>
          as<{ id: string }>(CLIENT_USER, `select public.submit_payment_proof($1, $2, 'gcash.jpg', 'image/jpeg', $3, $4, null, 'GC-123') as id`, [soa, path, amount, paidOn]);

        // The client uploads the file under their own client's folder; staff and other clients cannot.
        await as(CLIENT_USER, `insert into storage.objects (bucket_id, name) values ('payment-proofs', $1)`, [`${dir}/a.jpg`]);
        await expect(as(CLIENT_USER, `insert into storage.objects (bucket_id, name) values ('payment-proofs', $1)`, [`${clientB}/${soa}/x.jpg`])).rejects.toThrow(/row-level security/);
        await expect(as(STAFF, `insert into storage.objects (bucket_id, name) values ('payment-proofs', $1)`, [`${dir}/s.jpg`])).rejects.toThrow(/row-level security/);

        await expect(submit(`${dir}/missing.jpg`, 8000)).rejects.toThrow(/not received/);
        await expect(submit(`${clientB}/${soa}/a.jpg`, 8000)).rejects.toThrow(/for this statement/);
        await expect(submit(`${dir}/a.jpg`, 8000, "2999-01-01")).rejects.toThrow(/future/);
        const [{ id: proof }] = await submit(`${dir}/a.jpg`, 8000);
        expect(await as(CLIENT_USER, `select status from public.payment_proofs`)).toEqual([{ status: "for_verification" }]);
        expect(await as(STAFF, `select count(*)::int as n from public.payment_proofs`)).toEqual([{ n: 0 }]);

        // Only the Owner verifies; the payment is matched to the open items and the statement is settled.
        await expect(as(CLIENT_USER, `select public.verify_payment_proof($1, null, null, null)`, [proof])).rejects.toThrow(/Only the Owner/);
        await as(OWNER, `select public.verify_payment_proof($1, null, null, '0101')`, [proof]);
        expect(await as(OWNER, `select status, (deposit_id is not null) as has_deposit from public.payment_proofs where id = $1`, [proof])).toEqual([{ status: "verified", has_deposit: true }]);
        expect((await as(OWNER, open, [clientA])).map((r) => r.open_amount)).toEqual(["0.00", "0.00"]);
        expect(await as(OWNER, `select reference, bir_invoice_number, amount::text from public.client_deposits where client_id = $1`, [clientA])).toEqual([{ reference: "GC-123", bir_invoice_number: "0101", amount: "8000.00" }]);
        await expect(as(OWNER, `select public.verify_payment_proof($1, null, null, null)`, [proof])).rejects.toThrow(/already reviewed/);

        // A proof that does not match the bank is rejected with a reason.
        await as(CLIENT_USER, `insert into storage.objects (bucket_id, name) values ('payment-proofs', $1)`, [`${dir}/b.jpg`]);
        const [{ id: wrong }] = await submit(`${dir}/b.jpg`, 500);
        await expect(as(OWNER, `select public.reject_payment_proof($1, '')`, [wrong])).rejects.toThrow(/why the proof is rejected/);
        await as(OWNER, `select public.reject_payment_proof($1, 'Not found in GCash')`, [wrong]);
        expect(await as(CLIENT_USER, `select status, reject_reason from public.payment_proofs where id = $1`, [wrong])).toEqual([{ status: "rejected", reject_reason: "Not found in GCash" }]);

        // A check: the validated deposit slip, with the check number; it is recorded as a check.
        await as(CLIENT_USER, `insert into storage.objects (bucket_id, name) values ('payment-proofs', $1)`, [`${dir}/slip.jpg`]);
        const check = (ref: string) =>
          as<{ id: string }>(CLIENT_USER, `select public.submit_payment_proof($1, $2, 'slip.jpg', 'image/jpeg', 1000, '2026-11-20', null, $3, 'check') as id`, [soa, `${dir}/slip.jpg`, ref]);
        await expect(check("")).rejects.toThrow(/check number/);
        const [{ id: slip }] = await check("CHK-555");
        const [{ d }] = await as<{ d: string }>(OWNER, `select public.verify_payment_proof($1, null, null, null) as d`, [slip]);
        expect(await as(OWNER, `select method, reference from public.client_deposits where id = $1`, [d])).toEqual([{ method: "check", reference: "CHK-555" }]);
      });
    });

    it("totals the brand's receipts by month and kind for the gross receipts watch, Owner only", async () => {
      await money(async ({ as }) => {
        const brand = (await as<{ id: string }>(OWNER, `select id from public.brands where code = 'TC'`))[0].id;
        await as(OWNER, `select public.run_billing('2027-02-10')`);
        const [{ id: other }] = await as<{ id: string }>(OWNER, `select public.add_client_charge($1, 'other', 'Registration of books', 1500, '2026-12-01') as id`, [clientA]);
        const dues = (await as<{ id: string }>(OWNER, `select id from public.client_dues where client_id = $1`, [clientA])).map((d) => d.id);
        expect(dues).toHaveLength(3);
        await as(OWNER, `select public.record_deposit($1, '2026-11-20', 10000, null, 'BDO-1', null, null, $2)`, [clientA, dues]);
        // A voided deposit does not count.
        const [{ id: bounced }] = await as<{ id: string }>(OWNER, `select public.record_deposit($1, '2026-11-21', 700, null, 'CHK-9', null, null, '{}', 'check') as id`, [clientA]);
        await as(OWNER, `select public.void_deposit($1, 'Bounced cheque')`, [bounced]);
        const receipts = `select month::text, kind, amount::text from public.brand_receipts_by_month($1, $2)`;
        expect(await as(OWNER, receipts, [brand, 2026])).toEqual([
          { month: "2026-11-01", kind: "other", amount: "1500.00" },
          { month: "2026-11-01", kind: "retainer", amount: "3000.00" },
          { month: "2026-11-01", kind: "tax", amount: "5000.00" },
          { month: "2026-11-01", kind: "unallocated", amount: "500.00" },
        ]);
        expect(await as(OWNER, receipts, [brand, 2025])).toEqual([]);
        expect(other).toBeTruthy();
        await expect(as(STAFF, receipts, [brand, 2026])).rejects.toThrow(/Only the Owner/);
        await expect(as(CLIENT_USER, receipts, [brand, 2026])).rejects.toThrow(/Only the Owner/);
      });
    });
  });

  describe("brand profile", () => {
    const brandId = async () => (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id as string;

    it("the Owner saves the profile; others cannot; everyone signed in can read it", async () => {
      const brand = await brandId();
      const sql = `update public.brands set tin = '123-456-789', tin_branch_code = '00000', registered_address = 'Jaro, Iloilo City',
                   reply_to_email = 'billing@tallocpa.com', website = 'https://tallocpa.com', facebook_url = 'https://facebook.com/tallocpa',
                   boa_firm_accreditation_valid_until = '2027-01-01', ptr_date = '2026-01-05', invoice_method = 'booklet',
                   signatory_name = 'E. J. Tallo, CPA'
                   where id = $1 returning tin_branch_code`;
      expect(await as(OWNER, sql, [brand])).toEqual([{ tin_branch_code: "00000" }]);
      expect(await as(STAFF, sql, [brand])).toEqual([]);
      expect(await as(REVIEWER, sql, [brand])).toEqual([]);
      expect(await as(CLIENT_USER, sql, [brand])).toEqual([]);
      expect(await as(CLIENT_USER, `select display_name, cor_path from public.brands where id = $1`, [brand])).toEqual([{ display_name: "Tallo CPA", cor_path: null }]);
    });

    it("rejects a badly formed TIN, branch code, email, link or invoice method", async () => {
      const brand = await brandId();
      for (const [col, value] of [
        ["tin", "123456789"],
        ["tin", "123-456-789-000"],
        ["tin_branch_code", "12"],
        ["tin_branch_code", "000000"],
        ["reply_to_email", "billing@"],
        ["website", "tallocpa"],
        ["facebook_url", "https://example.com/tallocpa"],
        ["invoice_method", "receipt"],
      ]) {
        await expect(as(OWNER, `update public.brands set ${col} = $2 where id = $1`, [brand, value]), `${col} = ${value}`).rejects.toThrow(/check constraint/);
      }
      await expect(as(OWNER, `update public.brands set gross_receipts_warning = 0 where id = $1`, [brand])).rejects.toThrow(/check constraint/);
    });

    it("keeps brand files to staff, the logo also to clients, and changes to the Owner", async () => {
      const brand = await brandId();
      const cor = `${brand}/cor/1.pdf`;
      const logo = `${brand}/logo/1.svg`;
      await db.query("begin");
      try {
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [OWNER]);
        await db.query("set local role authenticated");
        await db.query(`insert into storage.objects (bucket_id, name) values ('brand-files', $1), ('brand-files', $2)`, [cor, logo]);
        const seen = async (who: string) => {
          await db.query("select set_config('request.jwt.claim.sub', $1, true)", [who]);
          return (await db.query(`select name from storage.objects where bucket_id = 'brand-files' order by name`)).rows.map((r) => r.name);
        };
        expect(await seen(STAFF)).toEqual([cor, logo]);
        expect(await seen(CLIENT_USER)).toEqual([logo]);
        expect(await seen("00000000-0000-0000-0000-0000000000ff")).toEqual([logo]);
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [STAFF]);
        expect((await db.query(`delete from storage.objects where bucket_id = 'brand-files' returning name`)).rows).toEqual([]);
        await expect(db.query(`insert into storage.objects (bucket_id, name) values ('brand-files', $1)`, [`${brand}/cor/2.pdf`])).rejects.toThrow(/row-level security/);
      } finally {
        await db.query("rollback");
      }
      const bucket = (await db.query(`select public, file_size_limit, allowed_mime_types from storage.buckets where id = 'brand-files'`)).rows[0];
      expect(bucket).toEqual({ public: false, file_size_limit: "5242880", allowed_mime_types: ["application/pdf", "image/png", "image/jpeg", "image/svg+xml"] });
    });
  });

  describe("documents", () => {
    it("places a document in its month, the next open month when late, or flags a prior taxable year", async () => {
      const place = async (month: string, today: string, fye = 12) =>
        (await db.query(`select period::text, late, prior_year from private.document_period($1, $2, 5, $3)`, [month, today, fye])).rows[0];
      // November documents uploaded by the 5 December cutoff stay in November.
      expect(await place("2026-11-01", "2026-12-05")).toEqual({ period: "2026-11-01", late: false, prior_year: false });
      // After the cutoff they go to December, flagged late.
      expect(await place("2026-11-01", "2026-12-06")).toEqual({ period: "2026-12-01", late: true, prior_year: false });
      // This month's documents uploaded early stay in this month.
      expect(await place("2026-12-01", "2026-12-15")).toEqual({ period: "2026-12-01", late: false, prior_year: false });
      // A December 2026 receipt uploaded in February 2027 is from the prior taxable year: exceptions queue.
      expect(await place("2026-12-01", "2027-02-10")).toEqual({ period: "2026-12-01", late: false, prior_year: true });
      // Same receipt for a June year-end client is still the same taxable year: carried forward, late.
      expect(await place("2026-12-01", "2027-02-10", 6)).toEqual({ period: "2027-02-01", late: true, prior_year: false });
    });

    /** Runs in one rolled-back transaction as the given user. */
    async function asUser<T>(user: string, run: () => Promise<T>) {
      await db.query("begin");
      try {
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
        await db.query("set local role authenticated");
        return await run();
      } finally {
        await db.query("rollback");
      }
    }
    const register = (client: string, type = "purchase_receipt") =>
      db.query(`select (d).id, (d).source, (d).status, (d).storage_path from public.register_document($1, $2, date_trunc('month', now())::date, 'Receipt #1.jpg', 'image/jpeg', 12345) as d`, [client, type]);

    it("lets the client and assigned staff upload, but not others", async () => {
      await asUser(CLIENT_USER, async () => {
        const d = (await register(clientA)).rows[0];
        expect(d).toMatchObject({ source: "portal", status: "uploading" });
        expect(d.storage_path).toMatch(new RegExp(`^${clientA}/[0-9a-f-]+/Receipt_1.jpg$`));
      });
      await asUser(STAFF, async () => expect((await register(clientA)).rows[0].source).toBe("staff"));
      await asUser(CLIENT_USER, async () => expect(register(clientB)).rejects.toThrow(/cannot add documents/));
      await asUser(STAFF, async () => expect(register(clientB)).rejects.toThrow(/cannot add documents/));
      await asUser(CLIENT_USER, async () => expect(register(clientA, "filed_return")).rejects.toThrow(/Only staff/));
    });

    it("confirms only once the file is stored, then staff return it and the client replies", async () => {
      await db.query("begin");
      try {
        await db.query("set local role authenticated");
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [CLIENT_USER]);
        const d = (await register(clientA)).rows[0];
        await db.query("savepoint s0");
        await expect(db.query(`select public.confirm_document($1)`, [d.id])).rejects.toThrow(/has not arrived/);
        await db.query("rollback to savepoint s0");
        await db.query("reset role");
        await db.query(`insert into storage.objects (bucket_id, name) values ('documents', $1)`, [d.storage_path]);
        await db.query("set local role authenticated");
        expect((await db.query(`select (public.confirm_document($1)).status`, [d.id])).rows[0].status).toBe("received");

        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [STAFF]);
        await db.query("savepoint s");
        await expect(db.query(`select public.review_document($1, 'return')`, [d.id])).rejects.toThrow(/Say why/);
        await db.query("rollback to savepoint s");
        expect((await db.query(`select (public.review_document($1, 'return', 'Blurry, please retake')).status`, [d.id])).rows[0].status).toBe("returned");

        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [CLIENT_USER]);
        const replied = (await db.query(`select (d).status, (d).client_reply from public.reply_document($1, 'Retook it, see the new upload') as d`, [d.id])).rows[0];
        expect(replied).toEqual({ status: "received", client_reply: "Retook it, see the new upload" });
        await db.query("savepoint s2");
        await expect(db.query(`select public.review_document($1, 'accept')`, [d.id])).rejects.toThrow(/Only staff assigned/);
        await db.query("rollback to savepoint s2");
      } finally {
        await db.query("rollback");
      }
    });

    it("keeps each client's files to people who can see that client", async () => {
      await db.query("begin");
      try {
        await db.query(`insert into storage.objects (bucket_id, name) values ('documents', $1), ('documents', $2)`, [`${clientA}/x/a.jpg`, `${clientB}/y/b.jpg`]);
        await db.query("set local role authenticated");
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [CLIENT_USER]);
        const seen = (await db.query(`select name from storage.objects where bucket_id = 'documents' order by name`)).rows.map((r) => r.name);
        expect(seen).toEqual([`${clientA}/x/a.jpg`]);
        await db.query("savepoint s");
        await expect(db.query(`insert into storage.objects (bucket_id, name) values ('documents', $1)`, [`${clientB}/z/c.jpg`])).rejects.toThrow(/row-level security/);
        await db.query("rollback to savepoint s");
      } finally {
        await db.query("rollback");
      }
    });
  });

  describe("OCR review", () => {
    it("approves a document, logs each correction, re-places it by its date and marks it posted", async () => {
      await db.query("begin");
      try {
        const doc = (
          await db.query(
            `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status, created_at)
             values ($1, $2, 'portal', 'purchase_receipt', '2026-11-01', '2026-11-01', 'r.jpg', 'image/jpeg', 10, $3, 'under_review', '2026-12-03 09:00+08') returning id`,
            [clientA, CLIENT_USER, `${clientA}/ocr-test/r.jpg`],
          )
        ).rows[0].id;
        await db.query(
          `insert into public.extractions (document_id, status, fields, confidence) values ($1, 'done', $2, '{}')`,
          [doc, JSON.stringify({ date: "2026-10-28", number: "0012", party_tin: "123-456-789-000", total: "1120.00", vat: "120.00" })],
        );
        await db.query("set local role authenticated");

        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [CLIENT_USER]);
        expect((await db.query(`select count(*)::int n from public.extractions`)).rows[0].n).toBe(0);
        await db.query("savepoint s");
        await expect(db.query(`select public.approve_document($1, '{}')`, [doc])).rejects.toThrow(/Only staff assigned/);
        await db.query("rollback to savepoint s");

        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [STAFF]);
        const approved = { date: "2026-10-28", number: "0021", party_tin: "123-456-789-000", total: "1120.00", vat: "120.00" };
        const d = (await db.query(`select (d).status, (d).period::text, (d).late from public.approve_document($1, $2::jsonb) as d`, [doc, JSON.stringify(approved)])).rows[0];
        // October receipt uploaded 3 Dec, after the 5 Nov cutoff: counted in the open month, November, as late.
        expect(d).toEqual({ status: "posted", period: "2026-11-01", late: true });
        const corrections = (await db.query(`select field, ocr_value, approved_value from public.extraction_corrections where document_id = $1`, [doc])).rows;
        expect(corrections).toEqual([{ field: "number", ocr_value: "0012", approved_value: "0021" }]);
        expect((await db.query(`select approved_fields ->> 'number' n from public.extractions where document_id = $1`, [doc])).rows[0].n).toBe("0021");
      } finally {
        await db.query("rollback");
      }
    });

    it("lets staff correct an approved document until a return covering its month is filed", async () => {
      await db.query("begin");
      try {
        const doc = (
          await db.query(
            `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
             values ($1, $2, 'portal', 'purchase_receipt', '2027-02-01', '2027-02-01', 'r.jpg', 'image/jpeg', 10, $3, 'under_review') returning id`,
            [clientA, CLIENT_USER, `${clientA}/edit-test/r.jpg`],
          )
        ).rows[0].id;
        await db.query(`insert into public.extractions (document_id, status, fields, confidence) values ($1, 'done', $2, '{}')`, [doc, JSON.stringify({ date: "2027-02-10", number: "7", total: "500.00" })]);
        const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2027-01-01') returning id`, [clientA])).rows[0].id;
        const filing = (
          await db.query(
            `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date)
             values ($1, $2, '2550Q', 'FY2027-Q1', '2027-01-01', '2027-03-31', '2550Q', '2027-04-25', '2027-04-26') returning id`,
            [ob, clientA],
          )
        ).rows[0].id;
        await db.query("set local role authenticated");
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [STAFF]);
        await db.query(`select public.approve_document($1, $2::jsonb)`, [doc, JSON.stringify({ date: "2027-02-10", number: "7", total: "500.00" })]);

        // Still open: the correction is saved and not counted as an OCR correction.
        await db.query(`select public.approve_document($1, $2::jsonb)`, [doc, JSON.stringify({ date: "2027-02-10", number: "7", total: "550.00" })]);
        expect((await db.query(`select approved_fields ->> 'total' t from public.extractions where document_id = $1`, [doc])).rows[0].t).toBe("550.00");
        expect((await db.query(`select count(*)::int n from public.extraction_corrections where document_id = $1`, [doc])).rows[0].n).toBe(0);

        // The Q1 return is filed: February is locked.
        await db.query("reset role");
        await db.query(`update public.filing_instances set status = 'filed' where id = $1`, [filing]);
        await db.query("set local role authenticated");
        await db.query("savepoint s");
        await expect(db.query(`select public.approve_document($1, $2::jsonb)`, [doc, JSON.stringify({ date: "2027-02-10", total: "600.00" })])).rejects.toThrow(/locked: the 2550Q return/);
        await db.query("rollback to savepoint s");
      } finally {
        await db.query("rollback");
      }
    });
  });

  describe("monthly cycle", () => {
    const doc = (client: string, month: string, period: string, status: string, uploaded: string, extra = "") =>
      db.query(
        `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status, created_at${extra ? ", prior_year" : ""})
         values ($1::uuid, $2, 'portal', 'purchase_receipt', $3, $4, 'r.jpg', 'image/jpeg', 10, $1::text || '/' || gen_random_uuid() || '/r.jpg', $5, $6${extra ? `, ${extra}` : ""})
         returning id, period::text, carried_from::text, exception_status`,
        [client, CLIENT_USER, period, month, status, uploaded],
      ).then((r) => r.rows[0]);
    const cycle = (client: string, period: string) =>
      db.query(`select missed_cutoff, closed_at is not null as closed, carried_forward, to_exceptions, cutoff_date::text from public.document_cycles where client_id = $1 and period = $2`, [client, period]).then((r) => r.rows[0]);
    const notices = (today: string) =>
      db.query(`select client_id, kind from public.cycle_notices_due($1) order by kind, client_id`, [today]).then((r) => r.rows.map((x) => `${x.client_id === clientA ? "A" : "B"}:${x.kind}`).sort());
    const docRow = (id: string) => db.query(`select period::text, carried_from::text, exception_status from public.documents where id = $1`, [id]).then((r) => r.rows[0]);

    it("opens the month, requests and reminds, records missed cutoffs and carries unposted documents forward", async () => {
      await db.query("begin");
      try {
        await db.query(`delete from public.document_cycles`);
        // 23 November: November is open for documents, due 5 December.
        expect((await db.query(`select public.run_document_cycles('2026-11-23') r`)).rows[0].r).toEqual({ opened: 2, missed: 0, closed: 0 });
        expect(await cycle(clientA, "2026-11-01")).toMatchObject({ cutoff_date: "2026-12-05", missed_cutoff: null, closed: false });
        // No request while the month is still running; on 1 December both clients get one.
        expect(await notices("2026-11-23")).toEqual([]);
        expect(await notices("2026-12-01")).toEqual(["A:request", "B:request"]);
        await db.query(`update public.document_cycles set requested_at = '2026-12-01 08:00+08'`);
        expect(await notices("2026-12-02")).toEqual([]);

        // Client A sends one receipt on 3 December (still in review) and one posted; B sends nothing.
        const open = await doc(clientA, "2026-11-01", "2026-11-01", "received", "2026-12-03 09:00+08");
        const posted = await doc(clientA, "2026-11-01", "2026-11-01", "posted", "2026-12-03 09:00+08");
        // The day before the cutoff only B is reminded.
        expect(await notices("2026-12-04")).toEqual(["B:reminder"]);

        // 6 December: B missed the cutoff, A did not; December opens.
        expect((await db.query(`select public.run_document_cycles('2026-12-06') r`)).rows[0].r).toEqual({ opened: 2, missed: 1, closed: 0 });
        expect((await cycle(clientA, "2026-11-01")).missed_cutoff).toBe(false);
        expect((await cycle(clientB, "2026-11-01")).missed_cutoff).toBe(true);

        // 1 January: November closes. The unposted receipt moves to December, late-recorded; the posted one stays.
        expect((await db.query(`select public.run_document_cycles('2027-01-01') r`)).rows[0].r).toMatchObject({ closed: 2 });
        expect(await cycle(clientA, "2026-11-01")).toMatchObject({ closed: true, carried_forward: 1, to_exceptions: 0 });
        expect(await docRow(open.id)).toEqual({ period: "2026-12-01", carried_from: "2026-11-01", exception_status: null });
        expect(await docRow(posted.id)).toEqual({ period: "2026-11-01", carried_from: null, exception_status: null });

        // A document placed in a closed month is moved to the next open one.
        expect(await doc(clientA, "2026-11-01", "2026-11-01", "received", "2026-12-20 09:00+08")).toMatchObject({ period: "2026-12-01", carried_from: "2026-11-01" });

        // December is the last month of the taxable year: on close, unposted documents go to the exceptions queue.
        expect((await db.query(`select public.run_document_cycles('2027-02-01') r`)).rows[0].r).toMatchObject({ closed: 2 });
        expect(await cycle(clientA, "2026-12-01")).toMatchObject({ closed: true, carried_forward: 0, to_exceptions: 2 });
        expect(await docRow(open.id)).toEqual({ period: "2026-12-01", carried_from: "2026-11-01", exception_status: "open" });
      } finally {
        await db.query("rollback");
      }
    });

    it("sends prior-year documents to the exceptions queue for the Reviewer or Owner to decide", async () => {
      await db.query("begin");
      try {
        const d = await doc(clientA, "2026-12-01", "2026-12-01", "received", "2027-02-10 09:00+08", "true");
        expect(d.exception_status).toBe("open");
        await db.query("set local role authenticated");
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [STAFF]);
        await db.query("savepoint s");
        await expect(db.query(`select public.decide_exception($1, 'amend', 'x')`, [d.id])).rejects.toThrow(/Reviewer or the Owner/);
        await db.query("rollback to savepoint s");
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [REVIEWER]);
        await db.query("savepoint s2");
        await expect(db.query(`select public.decide_exception($1, 'amend', ' ')`, [d.id])).rejects.toThrow(/Add a note/);
        await db.query("rollback to savepoint s2");
        const decided = (await db.query(`select (d).exception_status from public.decide_exception($1, 'non_deductible', 'No 2307, claim disallowed') d`, [d.id])).rows[0];
        expect(decided.exception_status).toBe("non_deductible");
      } finally {
        await db.query("rollback");
      }
    });

    it("lets the client say there is nothing to submit, and staff close a month only after its cutoff", async () => {
      await db.query("begin");
      try {
        await db.query(`delete from public.document_cycles`);
        await db.query(
          `insert into public.document_cycles (client_id, period, cutoff_date) values ($1, '2099-01-01', '2099-02-05'), ($2, '2099-01-01', '2099-02-05')`,
          [clientA, clientB],
        );
        await db.query("set local role authenticated");
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [CLIENT_USER]);
        const y = (await db.query(`select (y).nothing_to_submit_at is not null as nil from public.declare_nothing_to_submit($1, '2099-01-01') y`, [clientA])).rows[0];
        expect(y.nil).toBe(true);
        await db.query("savepoint s");
        await expect(db.query(`select public.declare_nothing_to_submit($1, '2099-01-01')`, [clientB])).rejects.toThrow(/cannot do this/);
        await db.query("rollback to savepoint s");
        await expect(db.query(`select public.close_document_cycle($1, '2099-01-01')`, [clientA])).rejects.toThrow(/Only staff assigned/);
        await db.query("rollback");
        await db.query("begin");
        await db.query(`insert into public.document_cycles (client_id, period, cutoff_date) values ($1, '2099-01-01', '2099-02-05')`, [clientA]);
        await db.query("set local role authenticated");
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [STAFF]);
        await db.query("savepoint s3");
        await expect(db.query(`select public.close_document_cycle($1, '2099-01-01')`, [clientA])).rejects.toThrow(/only after its cutoff/);
        await db.query("rollback to savepoint s3");
        await expect(db.query(`select public.run_document_cycles('2099-01-01')`)).rejects.toThrow(/permission denied/);
      } finally {
        await db.query("rollback");
      }
    });
  });

  describe("scores", () => {
    it("splits late returns into client- and staff-caused and sums the score inputs, for the Owner only", async () => {
      await db.query("begin");
      try {
        // November 2026 1601-C for both clients, due 10 December. Today: 15 December.
        const filing = async (client: string) => {
          const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1601-C', 'monthly', '2026-01-01') returning id`, [client])).rows[0].id;
          return (
            await db.query(
              `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date)
               values ($1, $2, '1601-C', '2026-11', '2026-11-01', '2026-11-30', '1601C', '2026-12-10', '2026-12-10') returning id`,
              [ob, client],
            )
          ).rows[0].id as string;
        };
        const fa = await filing(clientA);
        const fb = await filing(clientB);
        await db.query(`delete from public.document_cycles`);
        // A sent nothing by the 5 December cutoff; B did. B's return was prepared by Staff and filed on the 12th.
        await db.query(
          `insert into public.document_cycles (client_id, period, cutoff_date, missed_cutoff) values ($1, '2026-11-01', '2026-12-05', true), ($2, '2026-11-01', '2026-12-05', false)`,
          [clientA, clientB],
        );
        await db.query(
          `insert into public.filing_events (filing_instance_id, from_status, to_status, actor, action, created_at) values ($1, 'not_started', 'prepared', $2, 'prepare', '2026-12-11 09:00+08')`,
          [fb, STAFF],
        );
        await db.query(`update public.filing_instances set status = 'filed', filed_on = '2026-12-12' where id = $1`, [fb]);
        // One of A's November receipts was returned once; it is waiting for staff again.
        const doc = (
          await db.query(
            `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status, return_reason)
             values ($1::uuid, $2, 'portal', 'purchase_receipt', '2026-12-01', '2026-11-01', 'r.jpg', 'image/jpeg', 10, $1::text || '/x/r.jpg', 'received', 'Blurry') returning id`,
            [clientA, CLIENT_USER],
          )
        ).rows[0].id;
        await db.query(
          `insert into public.extractions (document_id, status, fields, approved_fields, approved_by, approved_at) values ($1, 'done', '{"total":"100"}', '{"total":"110"}', $2, '2026-12-14 10:00+08')`,
          [doc, STAFF],
        );
        await db.query(`insert into public.extraction_corrections (document_id, field, ocr_value, approved_value, corrected_by, corrected_at) values ($1, 'total', '100', '110', $2, '2026-12-14 10:00+08')`, [doc, STAFF]);

        await db.query("set local role authenticated");
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [STAFF]);
        for (const sql of [
          `select * from public.late_filings('2026-12-01', '2026-12-31', '2026-12-15')`,
          `select * from public.client_scorecard('2026-11-01', '2026-12-01', '2026-12-15')`,
          `select * from public.staff_scorecard('2026-11-01', '2026-12-01', '2026-12-15')`,
          `select * from public.ocr_correction_rates('2026-01-01')`,
          `select * from public.work_queues()`,
        ]) {
          await db.query("savepoint s");
          await expect(db.query(sql)).rejects.toThrow(/Only the Owner/);
          await db.query("rollback to savepoint s");
        }

        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [OWNER]);
        const late = (await db.query(`select filing_id, cause, missed_cutoff, preparer from public.late_filings('2026-12-01', '2026-12-31', '2026-12-15')`)).rows;
        expect(late).toHaveLength(2);
        expect(late.find((r) => r.filing_id === fa)).toMatchObject({ cause: "client", missed_cutoff: true, preparer: STAFF });
        expect(late.find((r) => r.filing_id === fb)).toMatchObject({ cause: "staff", missed_cutoff: false, preparer: STAFF });

        const cards = (await db.query(`select * from public.client_scorecard('2026-11-01', '2026-12-01', '2026-12-15')`)).rows;
        expect(cards.find((r) => r.client_id === clientA && r.cycles_due === 1)).toMatchObject({ cycles_missed: 1, documents: 1, documents_returned: 1 });
        expect(cards.find((r) => r.client_id === clientA && r.filings_due === 1)).toMatchObject({ filings_late: 1, late_client: 1 });
        expect(cards.find((r) => r.client_id === clientB && r.filings_due === 1)).toMatchObject({ filings_late: 1, late_client: 0 });

        const staff = (await db.query(`select * from public.staff_scorecard('2026-12-01', '2026-12-01', '2026-12-15')`)).rows;
        expect(staff).toHaveLength(1);
        expect(staff[0]).toMatchObject({ user_id: STAFF, filings_due: 2, late_staff: 1, late_client: 1, prepared: 1, filed: 1, days_to_file: "7.0", documents_processed: 1, ocr_corrections: 1 });

        expect((await db.query(`select * from public.ocr_correction_rates('2026-12-01')`)).rows).toEqual([
          { client_id: clientA, doc_type: "purchase_receipt", read_by_ocr: 1, corrected: 1, fields_corrected: 1 },
        ]);
        const queues = (await db.query(`select user_id, queue, items from public.work_queues() order by queue`)).rows;
        expect(queues).toEqual([{ user_id: STAFF, queue: "documents", items: 1 }]);
      } finally {
        await db.query("rollback");
      }
    });
  });

  it("staff cannot create clients through the onboarding function", async () => {
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await expect(
      as(STAFF, `select public.create_client_with_obligations($1::jsonb, '[]', null, '[]')`, [JSON.stringify({ brand_id: brand, name: "X", taxpayer_type: "individual" })]),
    ).rejects.toThrow(/Only the Owner/);
  });

  it("reports who is signed in", async () => {
    const [owner] = await as<{ id: { staff: { role: string }; clients: unknown[] } }>(OWNER, "select public.current_identity() as id");
    expect(owner.id.staff.role).toBe("owner");
    const [client] = await as<{ id: { staff: null; clients: { client_name: string }[] } }>(CLIENT_USER, "select public.current_identity() as id");
    expect(client.id.staff).toBeNull();
    expect(client.id.clients.map((c) => c.client_name)).toEqual(["Client A"]);
  });
  it("a person linked to two businesses sees both, and only those", async () => {
    await db.query("begin");
    try {
      const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
      const third = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9003', 'Client C', 'individual') returning id`, [brand])).rows[0].id;
      await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Client A owner')`, [CLIENT_USER, third]);
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [CLIENT_USER]);
      await db.query("set local role authenticated");
      const seen = (await db.query("select code from public.clients order by code")).rows;
      const id = (await db.query("select public.current_identity() as id")).rows[0].id;
      expect(seen).toEqual([{ code: "TC-9001" }, { code: "TC-9003" }]);
      expect(id.clients.map((c: { client_name: string }) => c.client_name).sort()).toEqual(["Client A", "Client C"]);
    } finally {
      await db.query("rollback");
    }
  });
  it("only the Owner can look up a user by email", async () => {
    await db.query("update auth.users set email = 'staff@example.com' where id = $1", [STAFF]);
    expect(await as(OWNER, "select public.owner_find_user(' Staff@Example.com ') as id")).toEqual([{ id: STAFF }]);
    expect(await as(OWNER, "select public.owner_find_user('nobody@example.com') as id")).toEqual([{ id: null }]);
    await expect(as(REVIEWER, "select public.owner_find_user('staff@example.com')")).rejects.toThrow(/Only the Owner/);
  });

  it("shows emails of colleagues and own clients' users to staff, nothing to client users", async () => {
    await db.query("update auth.users set email = 'client@example.com' where id = $1", [CLIENT_USER]);
    const ids = [OWNER, STAFF, CLIENT_USER];
    const staffSees = await as<{ user_id: string }>(STAFF, "select user_id from public.user_emails($1::uuid[]) order by user_id", [ids]);
    expect(staffSees.map((r) => r.user_id)).toEqual([OWNER, STAFF, CLIENT_USER]);
    expect(await as(CLIENT_USER, "select user_id from public.user_emails($1::uuid[])", [ids])).toEqual([]);
  });
});
