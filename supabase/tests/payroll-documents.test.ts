/**
 * Payroll as an intake stream (migration 20261126000001_payroll_documents.sql):
 * a client sends their payroll in their own format (Excel, PDF or a photo) as a
 * "payroll" document. It counts toward the month like any other submission,
 * staff mark it done (posted) once loaded, and it never becomes a register line.
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
const DB_NAME = "payroll_documents_test";

const OWNER = "00000000-0000-0000-0000-000000000061";
const STAFF = "00000000-0000-0000-0000-000000000062";
const CLIENT_USER = "00000000-0000-0000-0000-000000000063";
const XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

describe.skipIf(!url)("payroll documents", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;

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
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9601', 'Jaro Bakery', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Jaro')`, [CLIENT_USER, client]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lets the client send payroll in their own Excel file, and the documents bucket takes it", async () => {
    const month = (await db.query(`select to_char(date_trunc('month', now() at time zone 'Asia/Manila'), 'YYYY-MM-DD') as m`)).rows[0].m;
    const d = (await as(CLIENT_USER, `select * from public.register_document($1, 'payroll', $2, 'payroll-oct.xlsx', $3, 2048)`, [client, month, XLSX])).rows[0];
    expect(d.doc_type).toBe("payroll");
    expect(d.source).toBe("portal");
    const bucket = (await db.query(`select allowed_mime_types from storage.buckets where id = 'documents'`)).rows[0];
    expect(bucket.allowed_mime_types).toEqual(expect.arrayContaining([XLSX, "application/vnd.ms-excel", "text/csv", "image/jpeg", "application/pdf"]));
  });

  it("is marked done by staff and never becomes a register line", async () => {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'portal', 'payroll', '2027-01-01', '2027-01-01', 'p.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'received') returning id`,
      [client, CLIENT_USER],
    )).rows[0].id;
    const posted = (await as(STAFF, `select status from public.review_document($1, 'post')`, [d])).rows[0];
    expect(posted.status).toBe("posted");
    expect((await db.query(`select count(*)::int as n from public.register_lines where document_id = $1`, [d])).rows[0].n).toBe(0);
  });

  it("can be returned to the client with a reason", async () => {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'portal', 'payroll', '2027-01-01', '2027-01-01', 'p.pdf', 'application/pdf', 1, gen_random_uuid()::text, 'received') returning id`,
      [client, CLIENT_USER],
    )).rows[0].id;
    await expect(as(STAFF, `select public.review_document($1, 'return')`, [d])).rejects.toThrow(/Say why/);
    const back = (await as(STAFF, `select status, return_reason from public.review_document($1, 'return', 'Page 2 is missing')`, [d])).rows[0];
    expect(back).toEqual({ status: "returned", return_reason: "Page 2 is missing" });
  });

  it("still refuses a type that is not on the list", async () => {
    await expect(
      db.query(
        `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path)
         values ($1, $2, 'portal', 'timesheet', '2027-01-01', '2027-01-01', 't.jpg', 'image/jpeg', 1, gen_random_uuid()::text)`,
        [client, CLIENT_USER],
      ),
    ).rejects.toThrow(/documents_doc_type_check/);
  });
});
