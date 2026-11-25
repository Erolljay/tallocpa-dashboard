/**
 * Portal Billing (rework decisions 16–17; migration 20261128000001_portal_billing.sql):
 * payment channels only the Owner manages, clients seeing only their firm's
 * active channels and their QR images, and payments that go Pending
 * verification → Verified (applied oldest item first) or Rejected (with a reason).
 *
 * Runs in its own database so it can run alongside db.test.ts. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "portal_billing_test";

const OWNER = "00000000-0000-0000-0000-000000000051";
const STAFF = "00000000-0000-0000-0000-000000000052";
const CLIENT_A = "00000000-0000-0000-0000-000000000053";
const CLIENT_B = "00000000-0000-0000-0000-000000000054";

describe.skipIf(!url)("portal billing", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let brand: string;
  let otherBrand: string;
  let clientA: string;
  let clientB: string;
  let soaA: string;
  let gcash: string;
  let bpi: string;
  let hidden: string;
  let foreign: string;
  let older: string;
  let newer: string;

  /** Runs `fn` signed in as `user` inside a transaction that is rolled back. */
  async function as<T>(user: string, fn: () => Promise<T>): Promise<T> {
    await db.query("begin");
    try {
      await signIn(user);
      return await fn();
    } finally {
      await db.query("rollback");
    }
  }
  async function signIn(user: string) {
    await db.query("reset role");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
  }
  const q = async <T = Record<string, unknown>>(sql: string, params: unknown[] = []) => (await db.query(sql, params)).rows as T[];
  /** Expects `sql` to fail with `pattern`, without aborting the surrounding transaction. */
  async function fails(sql: string, params: unknown[], pattern: RegExp) {
    await db.query("savepoint s");
    await expect(db.query(sql, params)).rejects.toThrow(pattern);
    await db.query("rollback to savepoint s");
  }
  /** Client A uploads a file and submits it as a proof; returns the proof id. */
  async function submit(file: string, amount: number, account: string | null, method = "transfer", ref = "GC-1") {
    const p = `${clientA}/${soaA}/${file}`;
    await db.query(`insert into storage.objects (bucket_id, name) values ('payment-proofs', $1)`, [p]);
    return (await q<{ id: string }>(`select public.submit_payment_proof($1, $2, $3, 'image/jpeg', $4, '2026-11-20', $5, $6, $7) as id`, [soaA, p, file, amount, account, ref, method]))[0].id;
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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, STAFF, CLIENT_A, CLIENT_B]);
    brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    otherBrand = (
      await db.query(`insert into public.brands (code, display_name, legal_name) values ('ZZ', 'Other Firm', 'Other Firm Inc.') returning id`)
    ).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
    clientA = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9501', 'Alpha Co', 'corporation') returning id`, [brand])).rows[0].id;
    clientB = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9502', 'Beta Co', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.client_users (client_id, user_id, full_name) values ($1, $2, 'Ana'), ($3, $4, 'Ben')`, [clientA, CLIENT_A, clientB, CLIENT_B]);

    const channel = (b: string, kind: string, name: string, active: boolean, order: number, qr: string) =>
      db.query(
        `insert into public.brand_payment_accounts (brand_id, kind, institution, account_name, account_number, active, sort_order, qr_path)
         values ($1, $2, $3, 'Tallo CPA', '0917 000 0000', $4, $5, $6) returning id`,
        [b, kind, name, active, order, qr],
      ).then((r) => r.rows[0].id as string);
    gcash = await channel(brand, "ewallet", "GCash", true, 1, "gcash/qr.png");
    bpi = await channel(brand, "bank", "BPI", true, 2, "bpi/qr.png");
    hidden = await channel(brand, "bank", "Old Bank", false, 3, "old/qr.png");
    foreign = await channel(otherBrand, "bank", "Their Bank", true, 1, "theirs/qr.png");
    for (const p of ["gcash/qr.png", "bpi/qr.png", "old/qr.png", "theirs/qr.png"]) await db.query(`insert into storage.objects (bucket_id, name) values ('payment-qr', $1)`, [p]);

    // A statement for Alpha Co with two items: the older is paid first.
    soaA = (await db.query(`insert into public.soas (client_id, billing_date, reference, due_on) values ($1, '2026-11-10', 'TC-9501-2026-11-10', '2026-11-15') returning id`, [clientA])).rows[0].id;
    older = (await db.query(`insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on) values ($1, $2, 'other', 'Registration of books', 1000, '2026-11-05') returning id`, [clientA, soaA])).rows[0].id;
    newer = (await db.query(`insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on) values ($1, $2, 'other', 'Annual registration fee', 2000, '2026-11-15') returning id`, [clientA, soaA])).rows[0].id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  describe("payment channels", () => {
    it("a client sees only their firm's active channels, in order", async () => {
      const seen = await as(CLIENT_A, () => q(`select institution from public.brand_payment_accounts order by sort_order`));
      expect(seen).toEqual([{ institution: "GCash" }, { institution: "BPI" }]);
    });

    it("staff see the active channels; the Owner sees all, hidden ones too", async () => {
      expect((await as(STAFF, () => q(`select id from public.brand_payment_accounts`))).map((r) => r.id).sort()).toEqual([gcash, bpi, foreign].sort());
      expect(await as(OWNER, () => q(`select count(*)::int as n from public.brand_payment_accounts`))).toEqual([{ n: 4 }]);
    });

    it("only the Owner adds, edits, orders and hides channels", async () => {
      await as(OWNER, async () => {
        await db.query(`insert into public.brand_payment_accounts (brand_id, kind, institution, account_name, account_number, sort_order) values ($1, 'ewallet', 'Maya', 'Tallo CPA', '0918', 4)`, [brand]);
        await db.query(`update public.brand_payment_accounts set sort_order = 9, account_number = '0917 111 1111' where id = $1`, [gcash]);
        await db.query(`update public.brand_payment_accounts set active = false where id = $1`, [bpi]);
        await fails(`insert into public.brand_payment_accounts (brand_id, kind, institution, account_name, account_number) values ($1, 'bank', '  ', 'x', '1')`, [brand], /institution_present/);
      });
      for (const user of [STAFF, CLIENT_A]) {
        await as(user, async () => {
          await fails(`insert into public.brand_payment_accounts (brand_id, kind, institution, account_name, account_number) values ($1, 'bank', 'Fake', 'x', '1')`, [brand], /row-level security/);
          const updated = await q(`update public.brand_payment_accounts set account_number = '999' where id = $1 returning id`, [gcash]);
          expect(updated).toEqual([]);
          const removed = await q(`delete from public.brand_payment_accounts where id = $1 returning id`, [gcash]);
          expect(removed).toEqual([]);
        });
      }
    });

    it("QR images: a client opens only those of their firm's active channels; only the Owner uploads", async () => {
      const qr = async (user: string) => (await as(user, () => q<{ name: string }>(`select name from storage.objects where bucket_id = 'payment-qr' order by name`))).map((r) => r.name);
      expect(await qr(CLIENT_A)).toEqual(["bpi/qr.png", "gcash/qr.png"]);
      expect(await qr(STAFF)).toEqual(["bpi/qr.png", "gcash/qr.png", "old/qr.png", "theirs/qr.png"]);
      await as(OWNER, () => db.query(`insert into storage.objects (bucket_id, name) values ('payment-qr', 'new/qr.png')`));
      await as(CLIENT_A, () => fails(`insert into storage.objects (bucket_id, name) values ('payment-qr', 'fake.png')`, [], /row-level security/));
      await as(STAFF, () => fails(`insert into storage.objects (bucket_id, name) values ('payment-qr', 'fake.png')`, [], /row-level security/));
    });
  });

  describe("payments", () => {
    it("the client must choose one of the firm's active channels", async () => {
      await as(CLIENT_A, async () => {
        await db.query("savepoint s");
        await expect(submit("a.jpg", 500, null)).rejects.toThrow(/Choose the bank or e-wallet/);
        await db.query("rollback to savepoint s");
        await expect(submit("b.jpg", 500, hidden)).rejects.toThrow(/Choose one of the banks or e-wallets/);
        await db.query("rollback to savepoint s");
        await expect(submit("c.jpg", 500, foreign)).rejects.toThrow(/Choose one of the banks or e-wallets/);
        await db.query("rollback to savepoint s");
        const id = await submit("d.jpg", 500, gcash);
        expect(await q(`select status from public.payment_proofs where id = $1`, [id])).toEqual([{ status: "for_verification" }]);
      });
    });

    it("clients see only their own payments; staff (not Owner) see none", async () => {
      await db.query("begin");
      try {
        await signIn(CLIENT_A);
        await submit("mine.jpg", 300, gcash);
        await signIn(CLIENT_B);
        expect(await q(`select count(*)::int as n from public.payment_proofs`)).toEqual([{ n: 0 }]);
        expect(await q(`select count(*)::int as n from public.soas`)).toEqual([{ n: 0 }]);
        await signIn(STAFF);
        expect(await q(`select count(*)::int as n from public.payment_proofs`)).toEqual([{ n: 0 }]);
        await signIn(CLIENT_A);
        expect(await q(`select count(*)::int as n from public.payment_proofs`)).toEqual([{ n: 1 }]);
        // Nobody writes the table directly; it changes only through the functions.
        expect(await q(`update public.payment_proofs set status = 'verified' returning id`)).toEqual([]);
        await signIn(OWNER);
        expect(await q(`update public.payment_proofs set amount = 1 returning id`)).toEqual([]);
      } finally {
        await db.query("rollback");
      }
    });

    it("verified: applied to the oldest item first, and the client sees which items it paid", async () => {
      await db.query("begin");
      try {
        await signIn(CLIENT_A);
        const proof = await submit("pay.jpg", 1500, bpi, "transfer", "BPI-77");
        await signIn(CLIENT_A);
        await fails(`select public.verify_payment_proof($1, null, null, null)`, [proof], /Only the Owner/);
        await signIn(STAFF);
        await fails(`select public.verify_payment_proof($1, null, null, null)`, [proof], /Only the Owner/);
        await signIn(OWNER);
        await db.query(`select public.verify_payment_proof($1, null, null, null)`, [proof]);
        await signIn(CLIENT_A);
        const paid = await q(
          `select d.description, a.amount::text
             from public.payment_proofs p
             join public.payment_allocations a on a.deposit_id = p.deposit_id
             join public.client_dues d on d.id = a.due_id
            where p.id = $1 order by a.id`,
          [proof],
        );
        expect(paid).toEqual([
          { description: "Registration of books", amount: "1000.00" },
          { description: "Annual registration fee", amount: "500.00" },
        ]);
        expect(await q(`select id, open_amount::text from public.due_balances where soa_id = $1 order by due_on`, [soaA])).toEqual([
          { id: older, open_amount: "0.00" },
          { id: newer, open_amount: "1500.00" },
        ]);
        expect(await q(`select status, reviewed_at is not null as reviewed from public.payment_proofs where id = $1`, [proof])).toEqual([{ status: "verified", reviewed: true }]);
        // A reviewed payment is final.
        await signIn(OWNER);
        await fails(`select public.reject_payment_proof($1, 'Changed my mind')`, [proof], /already reviewed/);
        await fails(`select public.verify_payment_proof($1, null, null, null)`, [proof], /already reviewed/);
      } finally {
        await db.query("rollback");
      }
    });

    it("rejected: needs a reason, which the client sees; the items stay open", async () => {
      await db.query("begin");
      try {
        await signIn(CLIENT_A);
        const proof = await submit("wrong.jpg", 3000, gcash);
        await signIn(CLIENT_A);
        await fails(`select public.reject_payment_proof($1, 'nope')`, [proof], /Only the Owner/);
        await signIn(OWNER);
        await fails(`select public.reject_payment_proof($1, '')`, [proof], /why the proof is rejected/);
        await fails(`select public.reject_payment_proof($1, '   ')`, [proof], /why the proof is rejected/);
        await fails(`select public.reject_payment_proof($1, null)`, [proof], /why the proof is rejected/);
        await fails(`select public.reject_payment_proof($1, $2)`, [proof, "x".repeat(501)], /under 500/);
        await db.query(`select public.reject_payment_proof($1, ' Not found in our GCash ')`, [proof]);
        await signIn(CLIENT_A);
        expect(await q(`select status, reject_reason, deposit_id from public.payment_proofs where id = $1`, [proof])).toEqual([
          { status: "rejected", reject_reason: "Not found in our GCash", deposit_id: null },
        ]);
        expect(await q(`select sum(open_amount)::text as open from public.due_balances where soa_id = $1`, [soaA])).toEqual([{ open: "3000.00" }]);
        await signIn(OWNER);
        await fails(`select public.verify_payment_proof($1, null, null, null)`, [proof], /already reviewed/);
      } finally {
        await db.query("rollback");
      }
    });

    it("the database itself keeps a reviewed payment final and what the client sent unchanged", async () => {
      await db.query("begin");
      try {
        await signIn(CLIENT_A);
        const proof = await submit("guard.jpg", 200, gcash);
        await db.query("reset role");
        await fails(`update public.payment_proofs set amount = 1 where id = $1`, [proof], /cannot be changed/);
        await fails(`update public.payment_proofs set status = 'rejected', reject_reason = ' ', reviewed_at = now() where id = $1`, [proof], /why the proof is rejected/);
        await db.query(`update public.payment_proofs set status = 'rejected', reject_reason = 'No match', reviewed_at = now() where id = $1`, [proof]);
        await fails(`update public.payment_proofs set status = 'for_verification', reject_reason = null, reviewed_at = null where id = $1`, [proof], /already reviewed/);
      } finally {
        await db.query("rollback");
      }
    });
  });
});
