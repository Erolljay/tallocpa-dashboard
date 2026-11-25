/**
 * Payroll read from the client's own file (migration 20261206000001_payroll_ocr.sql):
 * the reading (payroll_extractions) and the client's saved column mapping
 * (payroll_column_maps) are for the Owner and the staff assigned to the client
 * only. Client users never see either; nobody but the server writes a reading.
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
const DB_NAME = "payroll_ocr_test";

const OWNER = "00000000-0000-0000-0000-000000000071";
const STAFF = "00000000-0000-0000-0000-000000000072";
const OTHER_STAFF = "00000000-0000-0000-0000-000000000073";
const CLIENT_USER = "00000000-0000-0000-0000-000000000074";

describe.skipIf(!url)("payroll read from the client's file", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let otherClient: string;
  let payrollDoc: string;
  let receiptDoc: string;
  let basic: string;
  let otherBasic: string;

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

  const doc = async (clientId: string, docType: string) =>
    (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'portal', $3, '2027-01-01', '2027-01-01', 'p.xlsx', 'text/csv', 1, gen_random_uuid()::text, 'under_review') returning id`,
      [clientId, CLIENT_USER, docType],
    )).rows[0].id as string;

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, STAFF, OTHER_STAFF, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Other staff', 'staff')`,
      [OWNER, STAFF, OTHER_STAFF, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9701', 'Jaro Bakery', 'corporation') returning id`, [brand])).rows[0].id;
    otherClient = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9702', 'Molo Cafe', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($3, $4, 'preparer')`, [client, STAFF, otherClient, OTHER_STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Jaro')`, [CLIENT_USER, client]);
    basic = (await db.query(`insert into public.payroll_items (client_id, name, kind, bir_category) values ($1, 'Basic Pay', 'earning', 'basic') returning id`, [client])).rows[0].id;
    otherBasic = (await db.query(`insert into public.payroll_items (client_id, name, kind, bir_category) values ($1, 'Basic Pay', 'earning', 'basic') returning id`, [otherClient])).rows[0].id;
    payrollDoc = await doc(client, "payroll");
    receiptDoc = await doc(client, "purchase_receipt");
    // The server (service role) writes the reading; its client comes from the document.
    await db.query(`insert into public.payroll_extractions (document_id, client_id, status, source, result) values ($1, $2, 'done', 'sheet', '{"rows": []}')`, [payrollDoc, otherClient]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("takes the client from the document, and only for a payroll document", async () => {
    const row = (await db.query(`select client_id from public.payroll_extractions where document_id = $1`, [payrollDoc])).rows[0];
    expect(row.client_id).toBe(client);
    await expect(db.query(`insert into public.payroll_extractions (document_id, client_id) values ($1, $2)`, [receiptDoc, client])).rejects.toThrow(/Only a payroll document/);
  });

  it("shows the reading to the Owner and the staff on the client, not to other staff or the client", async () => {
    const q = `select document_id from public.payroll_extractions where document_id = $1`;
    expect((await as(OWNER, q, [payrollDoc])).rowCount).toBe(1);
    expect((await as(STAFF, q, [payrollDoc])).rowCount).toBe(1);
    expect((await as(OTHER_STAFF, q, [payrollDoc])).rowCount).toBe(0);
    expect((await as(CLIENT_USER, q, [payrollDoc])).rowCount).toBe(0);
  });

  it("lets staff on the client save their edits; nobody else changes it, and nobody but the server adds one", async () => {
    const upd = `update public.payroll_extractions set draft = '{"rows": []}' where document_id = $1`;
    expect((await as(STAFF, upd, [payrollDoc])).rowCount).toBe(1);
    expect((await as(OTHER_STAFF, upd, [payrollDoc])).rowCount).toBe(0);
    expect((await as(CLIENT_USER, upd, [payrollDoc])).rowCount).toBe(0);
    const second = await doc(client, "payroll");
    await expect(as(STAFF, `insert into public.payroll_extractions (document_id, client_id) values ($1, $2)`, [second, client])).rejects.toThrow(/row-level security/);
    await expect(as(CLIENT_USER, `delete from public.payroll_extractions where document_id = $1`, [payrollDoc])).resolves.toMatchObject({ rowCount: 0 });
  });

  it("keeps the client's column mapping for staff on the client only", async () => {
    await as(STAFF, `insert into public.payroll_column_maps (client_id, header, target, item_id) values ($1, 'sahod', 'item', $2), ($1, 'pangalan', 'name', null)`, [client, basic]);
    const q = `select header, target, confirmed_by from public.payroll_column_maps where client_id = $1 order by header`;
    expect((await as(OWNER, q, [client])).rows).toEqual([
      { header: "pangalan", target: "name", confirmed_by: STAFF },
      { header: "sahod", target: "item", confirmed_by: STAFF },
    ]);
    expect((await as(OTHER_STAFF, q, [client])).rowCount).toBe(0);
    expect((await as(CLIENT_USER, q, [client])).rowCount).toBe(0);
    await expect(as(CLIENT_USER, `insert into public.payroll_column_maps (client_id, header, target) values ($1, 'x', 'ignore')`, [client])).rejects.toThrow(/row-level security/);
    await expect(as(OTHER_STAFF, `insert into public.payroll_column_maps (client_id, header, target) values ($1, 'x', 'ignore')`, [client])).rejects.toThrow(/row-level security/);
    // Changing a confirmed column (an upsert by header).
    await as(STAFF, `insert into public.payroll_column_maps (client_id, header, target) values ($1, 'sahod', 'ignore') on conflict (client_id, header) do update set target = excluded.target, item_id = excluded.item_id`, [client]);
    expect((await as(STAFF, `select target, item_id from public.payroll_column_maps where client_id = $1 and header = 'sahod'`, [client])).rows[0]).toEqual({ target: "ignore", item_id: null });
  });

  it("refuses an item of another client, or an item column without an item", async () => {
    await expect(as(STAFF, `insert into public.payroll_column_maps (client_id, header, target, item_id) values ($1, 'basic', 'item', $2)`, [client, otherBasic])).rejects.toThrow(/not one of this client/);
    await expect(as(STAFF, `insert into public.payroll_column_maps (client_id, header, target) values ($1, 'basic', 'item')`, [client])).rejects.toThrow(/check/);
    await expect(as(STAFF, `insert into public.payroll_column_maps (client_id, header, target) values ($1, 'basic', 'bonus')`, [client])).rejects.toThrow(/check/);
  });
});
