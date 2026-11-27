/**
 * Portal access for clients we no longer serve (migration 20270105000001_inactive_client_portal.sql).
 * An inactive or archived client's contacts keep view-only access for two months, then lose
 * it; reactivating gives back their own level. Staff are not affected.
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
const DB_NAME = "inactive_client_portal_test";

const OWNER = "00000000-0000-0000-0000-000000000d01";
const STAFF = "00000000-0000-0000-0000-000000000d02";
/** Full access on Alpha. */
const MARIA = "00000000-0000-0000-0000-000000000d03";

describe.skipIf(!url)("portal access for inactive clients", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let alpha: string;
  let filing: string;

  /** Runs `fn` signed in as `user` in a transaction that is rolled back; `setup` runs first as the database owner. */
  async function as<T>(user: string, fn: () => Promise<T>, setup?: string): Promise<T> {
    await db.query("begin");
    try {
      if (setup) await db.query(setup, [alpha]);
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
      await db.query("set local role authenticated");
      return await fn();
    } finally {
      await db.query("rollback");
    }
  }
  const q = async <T = Record<string, unknown>>(sql: string, params: unknown[] = []) => (await db.query(sql, params)).rows as T[];
  async function fails(sql: string, pattern: RegExp) {
    await db.query("savepoint s");
    await expect(db.query(sql)).rejects.toThrow(pattern);
    await db.query("rollback to savepoint s");
  }
  async function works(sql: string) {
    await db.query("savepoint s");
    await db.query(sql);
    await db.query("release savepoint s");
  }
  const upload = () => `select public.register_document('${alpha}', 'bir_2307_received', date_trunc('month', now())::date, 'a.jpg', 'image/jpeg', 2048)`;
  const identity = async () => (await q<{ id: { clients: { client_name: string; access: string; access_ends_on: string | null }[] } }>(`select public.current_identity() as id`))[0].id.clients;
  const inactive = `update public.clients set status = 'inactive' where id = $1`;
  const lapsed = `update public.clients set status = 'inactive', inactive_since = now() - interval '2 months 1 day' where id = $1`;

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3)`, [OWNER, STAFF, MARIA]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
    alpha = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9701', 'Alpha Co', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [alpha, STAFF]);
    await db.query(`insert into public.client_users (client_id, user_id, full_name, access) values ($1, $2, 'Maria', 'full')`, [alpha, MARIA]);
    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01') returning id`, [alpha])).rows[0].id;
    filing = (await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
       values ($1, $2, '2550Q', 'Q1 2026', '2026-01-01', '2026-03-31', '2550Q', '2026-04-25', '2026-04-25', 'filed') returning id`,
      [ob, alpha],
    )).rows[0].id;
    await db.query(`insert into storage.objects (bucket_id, name) values ('documents', $1)`, [`${alpha}/2026-01/receipt.jpg`]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("marking a client inactive records when; reactivating clears it; archiving keeps the date", async () => {
    await db.query("begin");
    try {
      await db.query(inactive, [alpha]);
      const [a] = await q<{ inactive_since: Date | null }>(`select inactive_since from public.clients where id = $1`, [alpha]);
      expect(a.inactive_since).not.toBeNull();
      await db.query(`update public.clients set status = 'archived' where id = $1`, [alpha]);
      const [b] = await q<{ inactive_since: Date | null }>(`select inactive_since from public.clients where id = $1`, [alpha]);
      expect(b.inactive_since).toEqual(a.inactive_since);
      await db.query(`update public.clients set status = 'active' where id = $1`, [alpha]);
      const [c] = await q<{ inactive_since: Date | null }>(`select inactive_since from public.clients where id = $1`, [alpha]);
      expect(c.inactive_since).toBeNull();
    } finally {
      await db.query("rollback");
    }
  });

  it("an active client's contact keeps their own level", async () => {
    await as(MARIA, async () => {
      expect(await identity()).toEqual([{ client_id: alpha, full_name: "Maria", client_name: "Alpha Co", access: "full", access_ends_on: null }]);
      await works(upload());
    });
  });

  it("within two months: view only, with the last day shown, and files still readable", async () => {
    await as(
      MARIA,
      async () => {
        const [c] = await identity();
        expect(c.access).toBe("viewer");
        expect(c.access_ends_on).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(await q(`select id from public.filing_instances where id = $1`, [filing])).toHaveLength(1);
        expect(await q(`select name from storage.objects where bucket_id = 'documents'`)).toHaveLength(1);
        await fails(upload(), /no longer handle this business/);
        await fails(`select public.open_client_ticket('${alpha}', 'Question', 'Hello')`, /no longer handle this business/);
        await fails(`insert into storage.objects (bucket_id, name) values ('documents', '${alpha}/f/new.jpg')`, /row-level security/);
      },
      inactive,
    );
  });

  it("after two months: the business is gone from the portal and its rows and files are hidden", async () => {
    await as(
      MARIA,
      async () => {
        expect(await identity()).toEqual([]);
        expect(await q(`select id from public.clients`)).toHaveLength(0);
        expect(await q(`select id from public.filing_instances where id = $1`, [filing])).toHaveLength(0);
        expect(await q(`select name from storage.objects where bucket_id = 'documents'`)).toHaveLength(0);
        await fails(upload(), /cannot add documents/);
      },
      lapsed,
    );
  });

  it("archived clients follow the same two months", async () => {
    await as(
      MARIA,
      async () => {
        expect((await identity())[0].access).toBe("viewer");
      },
      `update public.clients set status = 'archived' where id = $1`,
    );
  });

  it("staff keep full access to an inactive client", async () => {
    await as(
      STAFF,
      async () => {
        expect(await q(`select id from public.filing_instances where id = $1`, [filing])).toHaveLength(1);
        await works(upload());
      },
      lapsed,
    );
  });
});
