/**
 * Rework phase 4 (decision 16; migration 20261201000001_ticked_allocation.sql): the
 * Owner ticks which statement items a verified payment pays; unticked items stay
 * open; the rest is credit; the dues payment still posts in the client's Books per
 * allocation; the Owner-approval payment check follows the return's own item; and
 * tax and contribution money is held as cash for remittance until remitted.
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
const DB_NAME = "ticked_allocation_test";

const OWNER = "00000000-0000-0000-0000-000000000f01";
const STAFF = "00000000-0000-0000-0000-000000000f02";
const CLIENT_USER = "00000000-0000-0000-0000-000000000f03";
const OTHER_CLIENT_USER = "00000000-0000-0000-0000-000000000f04";

describe.skipIf(!url)("collections: ticked items and cash for remittance", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let other: string;
  let soa: string;
  let filing: string;
  let gcash: string;
  /** Alpha's statement items, oldest first: retainer, 0619-E tax, SSS contribution. */
  let retainer: string;
  let tax: string;
  let sss: string;
  let unbilled: string;
  let otherDue: string;

  async function signIn(user: string) {
    await db.query("reset role");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
  }
  const q = async <T = Record<string, unknown>>(sql: string, params: unknown[] = []) => (await db.query(sql, params)).rows as T[];
  /** Runs `fn` inside a transaction that is rolled back, so each test starts from the same statement. */
  async function scenario(fn: () => Promise<void>) {
    await db.query("begin");
    try {
      await fn();
    } finally {
      await db.query("rollback");
    }
  }
  async function fails(sql: string, params: unknown[], pattern: RegExp) {
    await db.query("savepoint s");
    await expect(db.query(sql, params)).rejects.toThrow(pattern);
    await db.query("rollback to savepoint s");
  }
  /** The client uploads a proof of payment; returns its id. */
  async function submit(amount: number) {
    await signIn(CLIENT_USER);
    const p = `${client}/${soa}/${Math.random().toString(36).slice(2)}.jpg`;
    await db.query(`insert into storage.objects (bucket_id, name) values ('payment-proofs', $1)`, [p]);
    return (await q<{ id: string }>(`select public.submit_payment_proof($1, $2, 'gcash.jpg', 'image/jpeg', $3, '2026-11-20', $4, 'GC-1') as id`, [soa, p, amount, gcash]))[0].id;
  }
  async function verify(proof: string, ticked: string[] | null, amount: number | null = null) {
    await signIn(OWNER);
    return (await q<{ d: string }>(`select public.verify_payment_proof($1, null, $2, null, $3) as d`, [proof, amount, ticked]))[0].d;
  }
  const openOf = async (ids: string[]) => {
    await db.query("reset role");
    const rows = await q<{ id: string; open_amount: string }>(`select id, open_amount::text from public.due_balances where id = any($1)`, [ids]);
    return ids.map((id) => rows.find((r) => r.id === id)?.open_amount);
  };
  const remittance = async (c: string | null = null) => {
    await signIn(OWNER);
    return q<{ client_id: string; received: string; remitted: string; held: string }>(
      `select client_id, received::text, remitted::text, held::text from public.cash_for_remittance($1)`,
      [c],
    );
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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, STAFF, CLIENT_USER, OTHER_CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9931', 'Alpha Co', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    other = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9932', 'Beta Co', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.client_users (client_id, user_id, full_name) values ($1, $2, 'Ana'), ($3, $4, 'Ben')`, [client, CLIENT_USER, other, OTHER_CLIENT_USER]);
    gcash = (await db.query(
      `insert into public.brand_payment_accounts (brand_id, kind, institution, account_name, account_number, active) values ($1, 'ewallet', 'GCash', 'Tallo CPA', '0917', true) returning id`,
      [brand],
    )).rows[0].id;

    // Alpha keeps books with us, so a payment of a tax or contribution item posts its dues payment.
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [OWNER]);
    await db.query("set local role authenticated");
    await db.query(`select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    await db.query("commit");

    // A 0619-E for October, reviewed with ₱1,000 due, approved by the client.
    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '0619-E', 'monthly', '2020-01-01') returning id`, [client])).rows[0].id;
    filing = (await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status, tax_due)
       values ($1, $2, '0619-E', '2026-10', '2026-10-01', '2026-10-31', '0619E', '2026-11-10', '2026-11-10', 'client_approved', 1000) returning id`,
      [ob, client],
    )).rows[0].id;

    // The statement: retainer, the return's tax, and an SSS contribution; plus a charge not billed yet.
    soa = (await db.query(`insert into public.soas (client_id, billing_date, reference, due_on) values ($1, '2026-11-10', 'TC-9931-2026-11-10', '2026-11-15') returning id`, [client])).rows[0].id;
    const due = (sql: string, params: unknown[]) => db.query(sql, params).then((r) => r.rows[0].id as string);
    retainer = await due(
      `insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on, period_month) values ($1, $2, 'retainer', 'Monthly retainer, November 2026', 3000, '2026-11-05', '2026-11-01') returning id`,
      [client, soa],
    );
    tax = await due(
      `insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on, filing_instance_id) values ($1, $2, 'tax', 'Tax due, 0619-E 2026-10', 1000, '2026-11-10', $3) returning id`,
      [client, soa, filing],
    );
    sss = await due(
      `insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on) values ($1, $2, 'contribution', 'SSS contributions, October 2026', 500, '2026-11-15') returning id`,
      [client, soa],
    );
    unbilled = await due(`insert into public.client_dues (client_id, kind, description, amount, due_on) values ($1, 'other', 'Registration of books', 700, '2026-11-20') returning id`, [client]);
    otherDue = await due(`insert into public.client_dues (client_id, kind, description, amount, due_on) values ($1, 'other', 'Beta charge', 100, '2026-11-01') returning id`, [other]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  describe("verifying a payment", () => {
    it("applies it only to the ticked items; unticked items stay open; the rest is credit", () =>
      scenario(async () => {
        const proof = await submit(2000);
        const dep = await verify(proof, [tax, sss]);
        await db.query("reset role");
        expect(await q(`select due_id, amount::text, from_credit from public.payment_allocations where deposit_id = $1 order by id`, [dep])).toEqual([
          { due_id: tax, amount: "1000.00", from_credit: false },
          { due_id: sss, amount: "500.00", from_credit: false },
        ]);
        expect(await openOf([retainer, tax, sss])).toEqual(["3000.00", "0.00", "0.00"]);
        expect(await q(`select unallocated::text from public.deposit_balances where id = $1`, [dep])).toEqual([{ unallocated: "500.00" }]);

        // The client keeps paying the open retainer until it is settled.
        const second = await verify(await submit(1200), [retainer]);
        expect(await openOf([retainer])).toEqual(["1800.00"]);
        await verify(await submit(1800), [retainer]);
        expect(await openOf([retainer])).toEqual(["0.00"]);

        // The client sees the items each payment paid.
        await signIn(CLIENT_USER);
        expect(await q(`select a.due_id, a.amount::text from public.payment_allocations a where a.deposit_id = $1`, [second])).toEqual([{ due_id: retainer, amount: "1200.00" }]);
        await signIn(OTHER_CLIENT_USER);
        expect(await q(`select count(*)::int as n from public.payment_allocations`)).toEqual([{ n: 0 }]);
      }));

    it("pays the ticked items oldest first; a payment short of them leaves the later ticked items open", () =>
      scenario(async () => {
        // Ticked in any order, paid oldest first.
        await verify(await submit(3500), [sss, retainer]);
        expect(await openOf([retainer, tax, sss])).toEqual(["0.00", "1000.00", "0.00"]);
        await verify(await submit(600), [tax]);
        expect(await openOf([tax])).toEqual(["400.00"]);
      }));

    it("a payment short of the ticked items pays as far as it goes", () =>
      scenario(async () => {
        const dep = await verify(await submit(3200), [retainer, tax, sss]);
        expect(await openOf([retainer, tax, sss])).toEqual(["0.00", "800.00", "500.00"]);
        expect(await q(`select unallocated::text from public.deposit_balances where id = $1`, [dep])).toEqual([{ unallocated: "0.00" }]);
      }));

    it("keeps a payment with nothing ticked as credit, which the next billing applies oldest first as before", () =>
      scenario(async () => {
        const dep = await verify(await submit(3200), []);
        await db.query("reset role");
        expect(await q(`select count(*)::int as n from public.payment_allocations where deposit_id = $1`, [dep])).toEqual([{ n: 0 }]);
        expect(await openOf([retainer, tax, sss])).toEqual(["3000.00", "1000.00", "500.00"]);
        await signIn(OWNER);
        expect(await q(`select public.apply_client_credit($1)::text as applied`, [client])).toEqual([{ applied: "3200.00" }]);
        await db.query("reset role");
        expect(await q(`select due_id, amount::text, from_credit from public.payment_allocations where deposit_id = $1 order by id`, [dep])).toEqual([
          { due_id: retainer, amount: "3000.00", from_credit: true },
          { due_id: tax, amount: "200.00", from_credit: true },
        ]);
      }));

    it("refuses missing ticks and items that are not open on this client's statements", () =>
      scenario(async () => {
        const proof = await submit(1000);
        await signIn(OWNER);
        await fails(`select public.verify_payment_proof($1, null, null, null, null)`, [proof], /Tick the items/);
        await fails(`select public.verify_payment_proof($1, null, null, null, $2)`, [proof, [otherDue]], /not open on this client's statements/);
        await fails(`select public.verify_payment_proof($1, null, null, null, $2)`, [proof, [unbilled]], /not open on this client's statements/);
        await db.query(`select public.waive_due($1, 'Courtesy')`, [retainer]);
        await fails(`select public.verify_payment_proof($1, null, null, null, $2)`, [proof, [retainer]], /not open on this client's statements/);
        await signIn(STAFF);
        await fails(`select public.verify_payment_proof($1, null, null, null, $2)`, [proof, [tax]], /Only the Owner/);
        await signIn(CLIENT_USER);
        await fails(`select public.verify_payment_proof($1, null, null, null, $2)`, [proof, [tax]], /Only the Owner/);
        // Nothing was recorded by the refused calls.
        await db.query("reset role");
        expect(await q(`select status from public.payment_proofs where id = $1`, [proof])).toEqual([{ status: "for_verification" }]);
      }));
  });

  describe("what follows the ticked items", () => {
    it("posts the dues payment in the client's Books for each ticked tax or contribution item, not for the retainer", () =>
      scenario(async () => {
        await verify(await submit(4500), [retainer, tax, sss]);
        await db.query("reset role");
        // Contribution items post when the transaction commits; this scenario never commits.
        await db.query("set constraints contribution_payment_on_allocation immediate");
        const rows = await q<{ due_id: string; status: string; amount: string; entry_date: string }>(
          `select due_id, status, amount::text, entry_date::text from public.return_book_entries where kind = 'dues_payment' and client_id = $1 order by return_book_entries.amount desc`,
          [client],
        );
        expect(rows).toEqual([
          { due_id: tax, status: "posted", amount: "1000.00", entry_date: "2026-11-20" },
          { due_id: sss, status: "posted", amount: "500.00", entry_date: "2026-11-20" },
        ]);
      }));

    it("posts no dues payment for an unticked item", () =>
      scenario(async () => {
        await verify(await submit(3000), [retainer]);
        await db.query("reset role");
        expect(await q(`select count(*)::int as n from public.return_book_entries where kind = 'dues_payment' and client_id = $1`, [client])).toEqual([{ n: 0 }]);
      }));

    it("the Owner-approval payment check reads the return's own item: unpaid when it was left unticked, paid once ticked", () =>
      scenario(async () => {
        const check = async () => {
          await db.query("reset role");
          return (await q<{ c: { status: string; tax_paid: number } }>(`select private.payment_check($1) as c`, [filing]))[0].c;
        };
        await verify(await submit(3500), [retainer, sss]);
        expect(await check()).toMatchObject({ status: "unpaid", tax_paid: 0 });
        await verify(await submit(400), [tax]);
        expect(await check()).toMatchObject({ status: "partial", tax_paid: 400 });
        await verify(await submit(600), [tax]);
        expect(await check()).toMatchObject({ status: "paid", tax_paid: 1000 });
      }));
  });

  describe("cash for remittance", () => {
    it("holds money applied to tax and contribution items until the return is Filed & paid or the contribution is remitted", () =>
      scenario(async () => {
        expect(await remittance()).toEqual([]);
        await verify(await submit(4000), [retainer, tax, sss]);
        // The retainer is the firm's fee; the remaining ₱500 is credit, not held for remittance.
        expect(await remittance(client)).toEqual([{ client_id: client, received: "1000.00", remitted: "0.00", held: "1000.00" }]);

        // A second client with a contribution paid.
        await db.query("reset role");
        const soaB = (await q<{ id: string }>(`insert into public.soas (client_id, billing_date, reference, due_on) values ($1, '2026-11-10', 'TC-9932-2026-11-10', '2026-11-15') returning id`, [other]))[0].id;
        const phic = (await q<{ id: string }>(`insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on) values ($1, $2, 'contribution', 'PhilHealth, October 2026', 250, '2026-11-15') returning id`, [other, soaB]))[0].id;
        await signIn(OWNER);
        await db.query(`select public.record_deposit($1, '2026-11-20', 250, null, null, null, null, $2)`, [other, [phic]]);
        expect(await remittance()).toEqual([
          { client_id: client, received: "1000.00", remitted: "0.00", held: "1000.00" },
          { client_id: other, received: "250.00", remitted: "0.00", held: "250.00" },
        ]);

        // The 0619-E is filed: its tax is remitted.
        await db.query("reset role");
        await db.query(`update public.filing_instances set status = 'filed', filed_on = '2026-11-22', paid_on = '2026-11-22' where id = $1`, [filing]);
        expect(await remittance(client)).toEqual([{ client_id: client, received: "1000.00", remitted: "1000.00", held: "0.00" }]);
        await signIn(OWNER);
        await db.query(`select public.void_deposit((select id from public.client_deposits where client_id = $1 and voided_at is null order by created_at limit 1), 'Wrong client')`, [client]);
        expect(await remittance(client)).toEqual([]);
      }));

    it("counts a filed return's money as remitted; Filed & paid is the remittance", () =>
      scenario(async () => {
        await verify(await submit(1500), [tax, sss]);
        await db.query("reset role");
        await db.query(`update public.filing_instances set status = 'filed', filed_on = '2026-11-22', paid_on = '2026-11-23' where id = $1`, [filing]);
        expect(await remittance(client)).toEqual([{ client_id: client, received: "1500.00", remitted: "1000.00", held: "500.00" }]);
        await signIn(OWNER);
        expect(await q(`select kind, received::text, remitted, remitted_on::text, held::text from public.remittance_items where client_id = $1 order by kind desc`, [client])).toEqual([
          { kind: "tax", received: "1000.00", remitted: true, remitted_on: "2026-11-23", held: "0.00" },
          { kind: "contribution", received: "500.00", remitted: false, remitted_on: null, held: "500.00" },
        ]);
      }));

    it("the Owner records a contribution's remittance (and can undo it); only contributions, once, not in the future", () =>
      scenario(async () => {
        await verify(await submit(1500), [tax, sss]);
        await signIn(OWNER);
        await fails(`select public.mark_contribution_remitted($1, '2026-11-21', 'SSS-PRN-1')`, [tax], /Only a contribution/);
        await fails(`select public.mark_contribution_remitted($1, '2999-01-01', 'SSS-PRN-1')`, [sss], /future/);
        await fails(`select public.mark_contribution_remitted($1, null, 'SSS-PRN-1')`, [sss], /date it was remitted/);
        await signIn(STAFF);
        await fails(`select public.mark_contribution_remitted($1, '2026-11-21', 'SSS-PRN-1')`, [sss], /Only the Owner/);
        await signIn(CLIENT_USER);
        await fails(`select public.mark_contribution_remitted($1, '2026-11-21', 'SSS-PRN-1')`, [sss], /Only the Owner/);

        await signIn(OWNER);
        await db.query(`select public.mark_contribution_remitted($1, '2026-11-21', ' SSS-PRN-1 ')`, [sss]);
        await fails(`select public.mark_contribution_remitted($1, '2026-11-21', 'again')`, [sss], /already marked remitted/);
        expect(await q(`select remitted, remitted_on::text, remit_reference, held::text from public.remittance_items where due_id = $1`, [sss])).toEqual([
          { remitted: true, remitted_on: "2026-11-21", remit_reference: "SSS-PRN-1", held: "0.00" },
        ]);
        expect(await remittance(client)).toEqual([{ client_id: client, received: "1500.00", remitted: "500.00", held: "1000.00" }]);

        await db.query(`select public.clear_contribution_remitted($1)`, [sss]);
        expect(await remittance(client)).toEqual([{ client_id: client, received: "1500.00", remitted: "0.00", held: "1500.00" }]);
        await fails(`select public.clear_contribution_remitted($1)`, [sss], /not found/);

        // Only the Owner sees the totals; a client user sees only their own items.
        await signIn(STAFF);
        await fails(`select * from public.cash_for_remittance()`, [], /Only the Owner/);
        await signIn(OTHER_CLIENT_USER);
        expect(await q(`select count(*)::int as n from public.remittance_items`)).toEqual([{ n: 0 }]);
      }));
  });
});
