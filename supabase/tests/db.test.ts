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
    expect(counts.service_lines).toBe(8);
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
    async function chain(run: (step: (who: string, action: string, note?: string | null, data?: object) => Promise<Record<string, unknown>>) => Promise<void>) {
      await db.query("begin");
      try {
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
        await expect(step(REVIEWER, "owner_approve", null, { payment_status: "paid" })).rejects.toThrow(/Only the Owner/);
        await expect(step(OWNER, "owner_approve", null, { payment_status: "unpaid" })).rejects.toThrow(/approve even though unpaid/);
        expect(await step(OWNER, "owner_approve", null, { payment_status: "unpaid", approve_unpaid: true })).toMatchObject({ status: "owner_approved" });
        await expect(step(STAFF, "file", null, { filed_on: "2027-04-20" })).rejects.toThrow(/filing reference/);
        expect(await step(STAFF, "file", null, { filing_reference: "EFPS-123456", filed_on: "2027-04-20" })).toMatchObject({ status: "filed", filing_reference: "EFPS-123456" });
        await expect(step(STAFF, "pay")).rejects.toThrow(/payment reference/);
        expect(await step(STAFF, "pay", null, { payment_reference: "LBP-998877", paid_on: "2027-04-21" })).toMatchObject({ status: "paid" });
        expect(await step(STAFF, "send_proof")).toMatchObject({ status: "proof_uploaded" });
      });
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
        await step(OWNER, "prepare", null, { tax_due: 0 });
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
