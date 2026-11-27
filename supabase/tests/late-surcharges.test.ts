/**
 * Late-submission surcharge on statements (migration 20270101000301): a client's month
 * with late documents gets one surcharge when the active fee schedule has an amount;
 * it goes straight into Ready to bill when the schedule says so, else waits for the
 * Owner to approve or waive it (with a reason). It shows on the statement as its own line.
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
const DB_NAME = "late_surcharges_test";

const OWNER = "00000000-0000-0000-0000-000000000e01";
const STAFF = "00000000-0000-0000-0000-000000000e02";
const CLIENT_USER = "00000000-0000-0000-0000-000000000e03";
const SENT = "2026-11-20T10:00:00+08";

describe.skipIf(!url)("late-submission surcharge", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let brand: string;
  let client: string;

  /** Runs `sql` as `user`; the change is kept. */
  async function as<T = Record<string, unknown>>(user: string, sql: string, params: unknown[] = []): Promise<T[]> {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r.rows as T[];
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }

  /** A submission as the portal leaves it once sent. */
  async function doc(month: string, opts: { late?: boolean; status?: string; sent?: string; docType?: string } = {}) {
    return (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, late, file_name, mime_type, size_bytes, storage_path, status, created_at)
       values ($1, $2, 'portal', $3, $4, $4, $5, 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, $6, $7) returning id`,
      [client, CLIENT_USER, opts.docType ?? "purchase_receipt", month, opts.late ?? true, opts.status ?? "received", opts.sent ?? SENT],
    )).rows[0].id as string;
  }

  /** Activates a fee schedule version with the given surcharge setting. */
  async function activate(effectiveFrom: string, amount: number | null, auto: boolean) {
    const sid = (await db.query(
      `insert into public.fee_schedules (brand_id, name, effective_from, late_surcharge_amount, late_surcharge_auto) values ($1, $2, $3, $4, $5) returning id`,
      [brand, `Schedule from ${effectiveFrom}`, effectiveFrom, amount, auto],
    )).rows[0].id;
    await db.query(`insert into public.fee_items (schedule_id, code, component, label, billing, price) values ($1, 'A.corporate', 'A', 'Bookkeeping', 'monthly', 1500)`, [sid]);
    await db.query(`update public.fee_schedules set status = 'active' where id = $1`, [sid]);
  }

  const surcharges = async () =>
    (await db.query(`select month::text, amount::text, status, auto, due_id is not null as has_due, waive_reason, decided_by from public.late_surcharges where client_id = $1 order by month`, [client])).rows;
  const idOf = async (month: string) => (await db.query(`select id from public.late_surcharges where client_id = $1 and month = $2`, [client, month])).rows[0].id as string;
  const ready = async () =>
    (await as<{ kind: string; description: string; amount: string; reason: string }>(OWNER, `select kind, description, amount::text, reason from public.ready_to_bill('2026-11-27') where client_id = $1 order by description`, [client]));

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
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, status) values ($1, 'TC-9961', 'Molo Late Sender Inc.', 'corporation', 'active') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Molo')`, [CLIENT_USER, client]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("raises nothing without an active schedule with a surcharge amount", async () => {
    await doc("2026-07-01");
    expect(await surcharges()).toEqual([]);
  });

  it("waits for the Owner when the schedule does not add it automatically: one per client per month", async () => {
    await activate("2026-01-01", 500, false);
    await doc("2026-10-01");
    await doc("2026-10-01", { docType: "sales_invoice" });
    // On time, a document still uploading, a filed return, or one sent before the schedule took effect: nothing.
    await doc("2026-11-01", { late: false });
    await doc("2026-09-01", { status: "uploading" });
    await doc("2026-08-01", { docType: "filed_return" });
    await doc("2026-06-01", { sent: "2025-12-31T10:00:00+08" });
    expect(await surcharges()).toEqual([
      { month: "2026-10-01", amount: "500.00", status: "pending", auto: false, has_due: false, waive_reason: null, decided_by: null },
    ]);
    // Not billable until approved.
    expect((await ready()).filter((r) => r.description.startsWith("Late"))).toEqual([]);
  });

  it("raises it once the uploading document is sent, and again never", async () => {
    await db.query(`update public.documents set status = 'received' where client_id = $1 and document_month = '2026-09-01'`, [client]);
    await db.query(`update public.documents set status = 'under_review' where client_id = $1 and document_month = '2026-09-01'`, [client]);
    expect((await surcharges()).map((s) => [s.month, s.status])).toEqual([["2026-09-01", "pending"], ["2026-10-01", "pending"]]);
  });

  it("only the Owner sees, approves and waives surcharges", async () => {
    const id = await idOf("2026-10-01");
    expect(await as(STAFF, `select id from public.late_surcharges`)).toEqual([]);
    expect(await as(CLIENT_USER, `select id from public.late_surcharges`)).toEqual([]);
    await expect(as(STAFF, `select public.approve_late_surcharge($1)`, [id])).rejects.toThrow(/Only the Owner/);
    await expect(as(CLIENT_USER, `select public.waive_late_surcharge($1, 'kind')`, [id])).rejects.toThrow(/Only the Owner/);
    expect((await as(OWNER, `select id from public.late_surcharges`)).length).toBe(2);
  });

  it("approved, it is in Ready to bill and goes on the statement as its own line", async () => {
    const id = await idOf("2026-10-01");
    await as(OWNER, `select public.approve_late_surcharge($1)`, [id]);
    await expect(as(OWNER, `select public.approve_late_surcharge($1)`, [id])).rejects.toThrow(/already approved/);
    expect((await surcharges())[1]).toMatchObject({ status: "approved", has_due: true, decided_by: OWNER, auto: false });
    expect(await ready()).toContainEqual({ kind: "other", description: "Late-submission surcharge — October 2026", amount: "500.00", reason: "charge" });

    await as(OWNER, `select public.run_billing('2026-11-27', $1)`, [client]);
    const lines = (await db.query(
      `select d.description, d.amount::text, s.reference from public.client_dues d join public.soas s on s.id = d.soa_id where d.client_id = $1 and d.kind = 'other'`,
      [client],
    )).rows;
    expect(lines).toEqual([{ description: "Late-submission surcharge — October 2026", amount: "500.00", reference: "TC-9961-2026-11-27" }]);
    // The client sees it on their statement.
    expect(await as(CLIENT_USER, `select description from public.client_dues where kind = 'other'`)).toEqual([{ description: "Late-submission surcharge — October 2026" }]);
    // More late documents for October add nothing.
    await doc("2026-10-01");
    expect((await db.query(`select count(*)::int as n from public.client_dues where client_id = $1 and kind = 'other'`, [client])).rows[0].n).toBe(1);
  });

  it("waived with a reason, it never goes in", async () => {
    const id = await idOf("2026-09-01");
    await expect(as(OWNER, `select public.waive_late_surcharge($1, '  ')`, [id])).rejects.toThrow(/Say why/);
    await as(OWNER, `select public.waive_late_surcharge($1, 'First time; typhoon week')`, [id]);
    expect((await surcharges())[0]).toMatchObject({ status: "waived", has_due: false, waive_reason: "First time; typhoon week", decided_by: OWNER });
    await expect(as(OWNER, `select public.waive_late_surcharge($1, 'again')`, [id])).rejects.toThrow(/already waived/);
    await expect(as(OWNER, `select public.approve_late_surcharge($1)`, [id])).rejects.toThrow(/already waived/);
    await expect(as(OWNER, `select public.waive_late_surcharge($1, 'x')`, [await idOf("2026-10-01")])).rejects.toThrow(/already a charge/);
    // A waived month stays waived: a later late document raises nothing new.
    await doc("2026-09-01");
    expect((await surcharges()).filter((s) => s.month === "2026-09-01")).toHaveLength(1);
    expect((await ready()).filter((r) => r.description.includes("September"))).toEqual([]);
  });

  it("goes straight into Ready to bill when the schedule adds it automatically", async () => {
    await activate("2026-06-01", 750, true);
    await doc("2026-11-01", { late: false });
    await doc("2026-05-01");
    expect((await surcharges()).find((s) => s.month === "2026-05-01")).toEqual({
      month: "2026-05-01", amount: "750.00", status: "approved", auto: true, has_due: true, waive_reason: null, decided_by: null,
    });
    expect(await ready()).toContainEqual({ kind: "other", description: "Late-submission surcharge — May 2026", amount: "750.00", reason: "charge" });
  });
});
