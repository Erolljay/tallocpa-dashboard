/**
 * Fee schedule database tests (spec §3.12; migration 20261123000014_fee_schedule.sql):
 * staff read, the Owner writes, only drafts change, activation needs every price
 * and retires the previous version.
 *
 * Runs in its own database so it can run alongside db.test.ts. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { templateRows } from "@/lib/fees/template";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "fee_schedule_test";

const OWNER = "00000000-0000-0000-0000-000000000011";
const STAFF = "00000000-0000-0000-0000-000000000012";
const CLIENT_USER = "00000000-0000-0000-0000-000000000014";

describe.skipIf(!url)("fee schedule database", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let brand: string;
  let clientA: string;

  /** Runs `fn` signed in as `user` inside a transaction that is rolled back. */
  async function as<T>(user: string, fn: () => Promise<T>): Promise<T> {
    await db.query("begin");
    try {
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
      await db.query("set local role authenticated");
      return await fn();
    } finally {
      await db.query("rollback");
    }
  }

  /** Expects `sql` to fail with `pattern`, without aborting the surrounding transaction. */
  async function fails(sql: string, params: unknown[], pattern: RegExp) {
    await db.query("savepoint s");
    await expect(db.query(sql, params)).rejects.toThrow(pattern);
    await db.query("rollback to savepoint s");
  }

  const draft = (name: string, effectiveFrom: string, priced: boolean) =>
    db.query(`select public.create_fee_schedule_draft($1::jsonb, $2::jsonb) as id`, [
      JSON.stringify({ brand_id: brand, name, effective_from: effectiveFrom, minimum_monthly_retainer: null }),
      JSON.stringify(templateRows().map((r) => ({ ...r, price: priced && !r.is_custom_quote ? (r.billing === "multiplier" ? 1 : 100) : null }))),
    ]).then((r) => r.rows[0].id as string);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3)`, [OWNER, STAFF, CLIENT_USER]);
    brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
    clientA = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9101', 'Client A', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Client A owner')`, [CLIENT_USER, clientA]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("the template fits the table: one draft with every item, prices empty", async () => {
    await as(OWNER, async () => {
      const id = await draft("2027 draft", "2027-01-01", false);
      const s = (await db.query(`select status, prices_include_tax, quote_valid_days, late_surcharge_auto, created_by from public.fee_schedules where id = $1`, [id])).rows[0];
      expect(s).toEqual({ status: "draft", prices_include_tax: true, quote_valid_days: 30, late_surcharge_auto: false, created_by: OWNER });
      const items = (await db.query(`select count(*)::int as n, count(price)::int as priced from public.fee_items where schedule_id = $1`, [id])).rows[0];
      expect(items).toEqual({ n: templateRows().length, priced: 0 });
    });
  });

  it("staff read schedules but cannot write them; client users see none", async () => {
    await db.query("begin");
    try {
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [OWNER]);
      await db.query("set local role authenticated");
      const id = await draft("Shared draft", "2027-01-01", false);
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [STAFF]);
      expect((await db.query(`select name from public.fee_schedules`)).rows).toEqual([{ name: "Shared draft" }]);
      expect((await db.query(`select count(*)::int as n from public.fee_items`)).rows[0].n).toBe(templateRows().length);
      expect((await db.query(`update public.fee_items set price = 1 where schedule_id = $1 returning id`, [id])).rows).toEqual([]);
      await fails(`insert into public.fee_schedules (brand_id, name, effective_from) values ($1, 'X schedule', '2027-01-01')`, [brand], /row-level security/);
      await fails(`select public.create_fee_schedule_draft($1::jsonb, '[{"code":"A.x","component":"A","label":"x","billing":"monthly"}]')`, [JSON.stringify({ brand_id: brand, name: "Staff", effective_from: "2027-01-01" })], /Only the Owner/);
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [CLIENT_USER]);
      expect((await db.query(`select id from public.fee_schedules`)).rows).toEqual([]);
      expect((await db.query(`select id from public.fee_items`)).rows).toEqual([]);
    } finally {
      await db.query("rollback");
    }
  });

  it("activation needs every price, except items quoted on request", async () => {
    await as(OWNER, async () => {
      const id = await draft("2027", "2027-01-01", false);
      await fails(`update public.fee_schedules set status = 'active' where id = $1`, [id], /Not priced yet: Base \(Individual\); Base \(Corporation, OPC or partnership\);/);
      await db.query(`update public.fee_items set price = case when billing = 'multiplier' then 1 else 0 end where schedule_id = $1 and not is_custom_quote and code <> 'G.heavy'`, [id]);
      await fails(`update public.fee_schedules set status = 'active' where id = $1`, [id], /Not priced yet: Bookkeeping \(Heavy\)$/);
      await db.query(`update public.fee_items set price = 8000 where schedule_id = $1 and code = 'G.heavy'`, [id]);
      const active = (await db.query(`update public.fee_schedules set status = 'active' where id = $1 returning status, activated_by, activated_at is not null as stamped`, [id])).rows[0];
      expect(active).toEqual({ status: "active", activated_by: OWNER, stamped: true });
    });
  });

  it("active and retired schedules never change; a new version retires the old one", async () => {
    await as(OWNER, async () => {
      const v1 = await draft("2027", "2027-01-01", true);
      await db.query(`update public.fee_schedules set status = 'active' where id = $1`, [v1]);

      await fails(`update public.fee_items set price = 1 where schedule_id = $1 and code = 'A.individual'`, [v1], /Only a draft fee schedule's items can be changed; this one is active/);
      await fails(`delete from public.fee_items where schedule_id = $1 and code = 'A.individual'`, [v1], /Only a draft/);
      await fails(`insert into public.fee_items (schedule_id, code, component, label, billing) values ($1, 'A.new', 'A', 'New', 'monthly')`, [v1], /Only a draft/);
      await fails(`update public.fee_schedules set late_surcharge_amount = 500 where id = $1`, [v1], /active fee schedule cannot be changed/);
      await fails(`update public.fee_schedules set status = 'draft' where id = $1`, [v1], /active fee schedule cannot be changed/);
      await fails(`delete from public.fee_schedules where id = $1`, [v1], /Only a draft fee schedule can be deleted/);

      // Start a new version: it must take effect after the current one.
      const early = await draft("2027 again", "2027-01-01", true);
      await fails(`update public.fee_schedules set status = 'active' where id = $1`, [early], /must take effect after the current one \(2027-01-01\)/);
      const v2 = await draft("2028", "2028-01-01", true);
      await db.query(`update public.fee_schedules set status = 'active' where id = $1`, [v2]);
      const rows = (await db.query(`select id, status, retired_at is not null as retired from public.fee_schedules where id in ($1, $2) order by effective_from`, [v1, v2])).rows;
      expect(rows).toEqual([{ id: v1, status: "retired", retired: true }, { id: v2, status: "active", retired: false }]);
      await fails(`update public.fee_schedules set name = 'Renamed' where id = $1`, [v1], /retired fee schedule cannot be changed/);
      await fails(`update public.fee_items set price = 1 where schedule_id = $1`, [v1], /this one is retired/);

      // Drafts can be deleted with their items.
      await db.query(`delete from public.fee_schedules where id = $1`, [early]);
      expect((await db.query(`select count(*)::int as n from public.fee_items where schedule_id = $1`, [early])).rows[0].n).toBe(0);
    });
  });

  it("at most one active schedule per brand, and a schedule starts as a draft", async () => {
    await expect(
      db.query(`insert into public.fee_schedules (brand_id, name, effective_from, status) values ($1, 'Straight to active', '2027-01-01', 'active')`, [brand]),
    ).rejects.toThrow(/starts as a draft/);
    const idx = (await db.query(`select indexdef from pg_indexes where indexname = 'fee_schedules_one_active'`)).rows[0].indexdef;
    expect(idx).toMatch(/UNIQUE INDEX .* \(brand_id\) WHERE \(status = 'active'::text\)/);
  });

  it("rejects a price on an item quoted on request and a factor below 1", async () => {
    await as(OWNER, async () => {
      const id = await draft("Checks", "2027-01-01", false);
      await fails(`update public.fee_items set price = 1000 where schedule_id = $1 and code = 'K.fs_audit'`, [id], /check constraint/);
      await fails(`update public.fee_items set price = 0.5 where schedule_id = $1 and code = 'G.x_inventory'`, [id], /check constraint/);
      await fails(`update public.fee_items set price = -1 where schedule_id = $1 and code = 'A.individual'`, [id], /check constraint/);
    });
  });

  it("writes schedule changes to the audit log", async () => {
    await as(OWNER, async () => {
      const id = await draft("Audited", "2027-01-01", false);
      await db.query(`update public.fee_items set price = 1500 where schedule_id = $1 and code = 'A.individual'`, [id]);
      await db.query("reset role");
      const n = (await db.query(`select count(*)::int as n from public.audit_log where table_name = 'fee_items' and action = 'UPDATE' and new_row ->> 'price' = '1500.00'`)).rows[0].n;
      expect(n).toBe(1);
    });
  });

  it("counts submitted documents per client per month", async () => {
    await db.query("begin");
    try {
      const doc = (type: string, month: string, status = "received") =>
        db.query(
          `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
           values ($1::uuid, $2, 'portal', $3, $4, $4, 'f.jpg', 'image/jpeg', 10, $1::text || '/' || gen_random_uuid() || '/f.jpg', $5)`,
          [clientA, CLIENT_USER, type, month, status],
        );
      await doc("sales_invoice", "2026-09-01");
      await doc("purchase_receipt", "2026-09-01");
      await doc("bir_2307_received", "2026-10-01");
      await doc("cor", "2026-10-01");
      await doc("payment_proof", "2026-10-01");
      await doc("sales_invoice", "2026-10-01", "uploading");
      await doc("sales_invoice", "2026-11-01");
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [OWNER]);
      await db.query("set local role authenticated");
      const rows = (await db.query(`select month::text, documents from public.client_document_volume('2026-08-15', '2026-10-31') order by month`)).rows;
      expect(rows).toEqual([{ month: "2026-09-01", documents: 2 }, { month: "2026-10-01", documents: 1 }]);
    } finally {
      await db.query("rollback");
    }
  });
});
