/**
 * B1 follow-up (migration 20270101000401_batch_row_images.sql): staff attach the
 * source image to a batch-uploaded row later. The file goes under the row's folder in
 * the documents bucket; only the document's file columns change, so the approved
 * figures, the register line and the posted entry stay as they were, even in a month
 * locked by a filed return. Who attached it and when is recorded.
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
const DB_NAME = "batch_row_images_test";

const STAFF = "00000000-0000-0000-0000-000000000481";
const OUTSIDER = "00000000-0000-0000-0000-000000000482";
const CLIENT_USER = "00000000-0000-0000-0000-000000000483";

describe.skipIf(!url)("attaching an image to a batch row", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let batchDoc: string;
  let lockedDoc: string;

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
  const accountId = async (key: string) => (await db.query(`select id from public.ledger_accounts where client_id = $1 and template_key = $2`, [client, key])).rows[0].id as string;
  const sale = (row: number, number: string, date: string, account: string) => ({
    row,
    account_id: account,
    fields: { date, number, party_kind: "non_individual", party_name: "Bacolod Feeds Corp", party_tin: "123-456-789", vatable: "120000.00", vat: "14400.00", total: "134400.00", atc: "WC158", withholding: "1200.00", payment_terms: "cash" },
  });
  const begin = (doc: string, user = STAFF, mime = "image/jpeg", size = 2048) =>
    as(user, `select public.begin_batch_image($1, 'SI 0412 photo.jpg', $2, $3) as path`, [doc, mime, size]);
  const attach = (doc: string, p: string, user = STAFF) => as(user, `select (public.attach_batch_image($1, $2, 'image/jpeg', 2048)).id`, [doc, p]);
  const store = (p: string) => db.query(`insert into storage.objects (bucket_id, name) values ('documents', $1)`, [p]);
  // Everything attaching must not change.
  const snapshot = async (doc: string) => ({
    doc: (await db.query(`select status, source, doc_type, document_month::text, period::text, ledger_account_id, batch_id, batch_row from public.documents where id = $1`, [doc])).rows[0],
    fields: (await db.query(`select approved_fields, approved_at from public.extractions where document_id = $1`, [doc])).rows[0],
    line: (await db.query(`select id, reference, total, net, vat, account_id, month::text from public.register_lines where document_id = $1`, [doc])).rows[0],
    entries: (await db.query(`select j.id, j.status, j.entry_date::text, (select json_agg(json_build_object('a', l.account_id, 'd', l.debit, 'c', l.credit) order by l.line_no) from public.journal_lines l where l.entry_id = j.id) as lines from public.journal_entries j where j.document_id = $1 order by j.id`, [doc])).rows,
  });

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3)`, [STAFF, OUTSIDER, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Staff', 'staff'), ($2, $3, 'Other', 'staff')`, [STAFF, OUTSIDER, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9841', 'Jaro Agri Supply', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Jaro Agri')`, [CLIENT_USER, client]);
    await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01')`, [client]);
    await as(STAFF, `select public.setup_books($1, 'sole_proprietorship', '2027-01-01', $2)`, [client, JSON.stringify(templatePayload("sole_proprietorship"))]);
    const sales = await accountId("sales");
    const batch = (await as(STAFF, `select public.post_batch($1, 'sales', 'onboarding.xlsx', $2) as id`, [client, JSON.stringify([sale(3, "SI 0412", "2027-01-05", sales), sale(4, "SI 0413", "2027-02-06", sales)])])).rows[0].id;
    const docs = (await db.query(`select id from public.documents where batch_id = $1 order by batch_row`, [batch])).rows;
    batchDoc = docs[0].id;
    lockedDoc = docs[1].id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("puts the file under the row's folder and records it, leaving figures, register line and entry as they were", async () => {
    const before = await snapshot(batchDoc);
    expect(before.entries).toHaveLength(1);
    const p = (await begin(batchDoc)).rows[0].path as string;
    expect(p).toBe(`${client}/${batchDoc}/SI_0412_photo.jpg`);
    // Nothing changes until the file is there.
    await expect(attach(batchDoc, p)).rejects.toThrow(/has not arrived yet/);
    await store(p);
    await attach(batchDoc, p);

    const d = (await db.query(`select storage_path, mime_type, size_bytes, image_attached_by, image_attached_at is not null as at from public.documents where id = $1`, [batchDoc])).rows[0];
    expect(d).toEqual({ storage_path: p, mime_type: "image/jpeg", size_bytes: "2048", image_attached_by: STAFF, at: true });
    expect(await snapshot(batchDoc)).toEqual(before);
    // The audit log has the change, by the staff member.
    const audit = (await db.query(`select count(*)::int as n from public.audit_log where table_name = 'documents' and row_pk = $1 and action = 'UPDATE' and actor = $2 and new_row ->> 'storage_path' = $3`, [batchDoc, STAFF, p])).rows[0].n;
    expect(audit).toBe(1);
  });

  it("takes one image per row", async () => {
    await expect(begin(batchDoc)).rejects.toThrow(/already has its image/);
  });

  it("is allowed in a month locked by a filed return, without touching the books", async () => {
    const ob = (await db.query(`select id from public.obligations where client_id = $1 and form = '2550Q'`, [client])).rows[0].id;
    await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
       values ($1, $2, '2550Q', 'Q1 2027', '2027-01-01', '2027-03-31', '2550Q', '2027-04-25', '2027-04-25', 'filed')`,
      [ob, client],
    );
    const before = await snapshot(lockedDoc);
    const p = (await begin(lockedDoc)).rows[0].path as string;
    await store(p);
    await attach(lockedDoc, p);
    expect((await db.query(`select storage_path from public.documents where id = $1`, [lockedDoc])).rows[0].storage_path).toBe(p);
    expect(await snapshot(lockedDoc)).toEqual(before);
  });

  it("refuses another row's path, a file of the wrong kind and a document that is not a batch row", async () => {
    const sales = await accountId("sales");
    const batch = (await as(STAFF, `select public.post_batch($1, 'sales', 'more.xlsx', $2) as id`, [client, JSON.stringify([sale(5, "SI 0414", "2027-04-07", sales)])])).rows[0].id;
    const doc = (await db.query(`select id from public.documents where batch_id = $1`, [batch])).rows[0].id;
    await expect(begin(doc, STAFF, "application/zip")).rejects.toThrow(/photo .* or a PDF/);
    await expect(begin(doc, STAFF, "image/png", 30 * 1024 * 1024)).rejects.toThrow(/20 MB or less/);
    const other = `${client}/${batchDoc}/someone-else.jpg`;
    await store(other);
    await expect(attach(doc, other)).rejects.toThrow(/not this row's/);
    await expect(attach(doc, `${client}/${doc}/../${batchDoc}/x.jpg`)).rejects.toThrow(/not this row's/);
    // A normal upload already has its file: only batch rows take an image later.
    const normal = (await as(STAFF, `select (public.register_document($1, 'sales_invoice', '2026-11-01', 'si.jpg', 'image/jpeg', 100)).id`, [client])).rows[0].id;
    await expect(begin(normal)).rejects.toThrow(/Only a batch-uploaded row/);
  });

  it("is for the Owner and staff assigned to the client, not other staff or the client", async () => {
    const sales = await accountId("sales");
    const batch = (await as(STAFF, `select public.post_batch($1, 'sales', 'last.xlsx', $2) as id`, [client, JSON.stringify([sale(6, "SI 0415", "2027-04-08", sales)])])).rows[0].id;
    const doc = (await db.query(`select id from public.documents where batch_id = $1`, [batch])).rows[0].id;
    await expect(begin(doc, OUTSIDER)).rejects.toThrow(/Document not found|Only the Owner/);
    await expect(begin(doc, CLIENT_USER)).rejects.toThrow(/Document not found/);
  });
});
