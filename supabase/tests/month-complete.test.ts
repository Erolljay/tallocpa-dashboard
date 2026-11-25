/**
 * P1 (migration 20261125000006_month_complete.sql): the client confirms "I've sent
 * everything" once every missing sales invoice number is answered; the client can
 * undo until the cutoff; anything sent afterwards is marked late; and the per-client
 * review knows where each waiting document's account title came from.
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
const DB_NAME = "month_complete_test";

const STAFF = "00000000-0000-0000-0000-000000000081";
const CLIENT_USER = "00000000-0000-0000-0000-000000000082";
const STRANGER = "00000000-0000-0000-0000-000000000083";
const OPEN = "2026-10-01"; // cutoff far ahead: the client can still undo
const PAST = "2026-09-01"; // cutoff passed

describe.skipIf(!url)("month complete: I've sent everything", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;

  /** Runs `sql` as `user`; the change is kept. */
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

  /** A document with what OCR read, as the service role leaves it. */
  async function doc(docType: string, month: string, fields: Record<string, string>, status = "under_review") {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'portal', $3, $4, $4, 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, $5) returning id, late`,
      [client, CLIENT_USER, docType, month, status],
    )).rows[0];
    await db.query(`insert into public.extractions (document_id, status, fields, confidence) values ($1, 'done', $2, '{}')`, [d.id, JSON.stringify(fields)]);
    return d as { id: string; late: boolean };
  }
  const check = async (month: string) => (await as(STAFF, `select public.month_check($1, $2) as c`, [client, month])).rows[0].c;
  const missing = async (month: string) => (await check(month)).missing.map((m: { prefix: string; num: number }) => `${m.prefix} ${m.num}`);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3)`, [STAFF, CLIENT_USER, STRANGER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $2, 'Staff', 'staff')`, [STAFF, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9801', 'Jaro Agri Supply', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Jaro')`, [CLIENT_USER, client]);
    await db.query(
      `insert into public.document_cycles (client_id, period, cutoff_date) values ($1, $2, '2099-01-05'), ($1, $3, '2026-10-05')`,
      [client, OPEN, PAST],
    );
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("finds sales invoice numbers missing from the series, including from last month's last number", async () => {
    await doc("sales_invoice", "2026-09-01", { number: "SI 0446" });
    for (const n of ["SI No. 0448", "SI-0449", "si0453"]) await doc("sales_invoice", OPEN, { number: n });
    // A new booklet far away is not a gap; another series has its own.
    await doc("sales_invoice", OPEN, { number: "SI 5001" });
    await doc("sales_invoice", OPEN, { number: "OR 0010" });
    await doc("sales_invoice", OPEN, { number: "OR 0012" });
    expect(await missing(OPEN)).toEqual(["OR 11", "SI 447", "SI 450", "SI 451", "SI 452"]);
    expect((await check(OPEN)).missing[0]).toMatchObject({ prefix: "OR", width: 4 });
  });

  it("blocks the confirmation until every missing number is answered, then confirms", async () => {
    await expect(as(CLIENT_USER, `select public.confirm_month_complete($1, $2)`, [client, OPEN])).rejects.toThrow(/Answer the missing invoices first: OR 0011, SI 0447/);
    // An upload fills one gap; the client says the rest were cancelled. A number that is not missing is ignored.
    await doc("sales_invoice", OPEN, { number: "SI 0447" });
    const cancelled = [{ prefix: "si", num: 450 }, { prefix: "SI", num: 451 }, { prefix: "SI", num: "452" }, { prefix: "OR", num: 11 }, { prefix: "SI", num: 9999 }];
    const y = (await as(CLIENT_USER, `select (public.confirm_month_complete($1, $2, $3)).*`, [client, OPEN, JSON.stringify(cancelled)])).rows[0];
    expect(y.client_confirmed_by).toBe(CLIENT_USER);
    expect(y.confirmed_documents).toBe(7);
    expect((await db.query(`select prefix, num::int from public.cancelled_invoices order by prefix, num`)).rows).toEqual([
      { prefix: "OR", num: 11 }, { prefix: "SI", num: 450 }, { prefix: "SI", num: 451 }, { prefix: "SI", num: 452 },
    ]);
    expect(await missing(OPEN)).toEqual([]);
  });

  it("marks anything sent afterwards late", async () => {
    expect((await doc("purchase_receipt", OPEN, {})).late).toBe(true);
    expect((await doc("purchase_receipt", "2026-11-01", {})).late).toBe(false);
  });

  it("lets the client undo until the cutoff; after it only staff can", async () => {
    await as(CLIENT_USER, `select public.undo_month_complete($1, $2)`, [client, OPEN]);
    expect((await db.query(`select client_confirmed_at from public.document_cycles where client_id = $1 and period = $2`, [client, OPEN])).rows[0].client_confirmed_at).toBeNull();

    await doc("sales_invoice", PAST, { number: "SI 0100" });
    await as(CLIENT_USER, `select public.confirm_month_complete($1, $2)`, [client, PAST]);
    await expect(as(CLIENT_USER, `select public.undo_month_complete($1, $2)`, [client, PAST])).rejects.toThrow(/cutoff \(October 5\) has passed/);
    await as(STAFF, `select public.undo_month_complete($1, $2)`, [client, PAST]);
  });

  it("refuses a month with nothing sent, someone outside the client, and an unknown month", async () => {
    await db.query(`insert into public.document_cycles (client_id, period, cutoff_date) values ($1, '2026-12-01', '2099-01-05')`, [client]);
    await expect(as(CLIENT_USER, `select public.confirm_month_complete($1, '2026-12-01')`, [client])).rejects.toThrow(/No transactions this month/);
    await expect(as(STRANGER, `select public.confirm_month_complete($1, $2)`, [client, OPEN])).rejects.toThrow(/cannot do this/);
    await expect(as(STRANGER, `select public.month_check($1, $2)`, [client, OPEN])).rejects.toThrow(/cannot see/);
    await expect(as(CLIENT_USER, `select public.confirm_month_complete($1, '2025-01-01')`, [client])).rejects.toThrow(/not open/);
  });

  it("lists customers who withheld this quarter without a 2307", async () => {
    const party = (await db.query(`insert into public.parties (tin, registered_name) values ('123-456-789', 'Bacolod Feeds Corp') returning id`)).rows[0].id;
    await db.query(
      `insert into public.register_lines (client_id, document_id, kind, source, month, line_date, party_id, party_name, total, withholding, net)
       values ($1, $2, 'sale', 'portal', '2026-10-01', '2026-10-03', $3, 'Bacolod Feeds Corp', 134400, 1200, 133200)`,
      [client, (await doc("other", OPEN, {}, "posted")).id, party],
    );
    expect((await check(OPEN)).cwt).toEqual([{ party: "Bacolod Feeds Corp", amount: 1200 }]);
  });

  it("tells the review where each waiting document's account title came from", async () => {
    await db.query(`insert into public.engagements (client_id, service_line, start_date) values ($1, 'bookkeeping', '2026-01-01')`, [client]);
    await as(STAFF, `select public.setup_books($1, 'sole_proprietorship', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("sole_proprietorship"))]);
    const acct = async (key: string) => (await db.query(`select id from public.ledger_accounts where client_id = $1 and template_key = $2`, [client, key])).rows[0].id as string;
    const known = (await db.query(`insert into public.parties (tin, registered_name) values ('300-000-001', 'Known Supplier') returning id`)).rows[0].id;
    await db.query(`insert into public.parties (tin, registered_name, preset_account_key) values ('300-000-002', 'Preset Supplier', 'rent')`);
    await db.query(`insert into public.client_party_accounts (client_id, party_id, kind, account_id) values ($1, $2, 'purchase', $3)`, [client, known, await acct("repairs_maintenance")]);
    await db.query(`delete from public.documents where client_id = $1 and status in ('received', 'under_review')`, [client]);
    const a = await doc("purchase_receipt", OPEN, { party_tin: "300-000-001" });
    const b = await doc("purchase_receipt", OPEN, { party_tin: "300-000-002" });
    const c = await doc("purchase_receipt", OPEN, { party_tin: "300-000-003" });
    const s = await doc("sales_invoice", OPEN, { party_tin: "300-000-004" });
    const rows = (await as(STAFF, `select document_id, account_id, source from public.pending_document_accounts($1)`, [client])).rows;
    const of = (id: string) => rows.find((r) => r.document_id === id);
    expect(of(a.id)).toMatchObject({ source: "history", account_id: await acct("repairs_maintenance") });
    expect(of(b.id)).toMatchObject({ source: "preset", account_id: await acct("rent") });
    expect(of(c.id)).toMatchObject({ source: "choose", account_id: null });
    expect(of(s.id)).toMatchObject({ source: "default", account_id: await acct("sales") });
    await expect(as(CLIENT_USER, `select * from public.pending_document_accounts($1)`, [client])).rejects.toThrow(/cannot see/);
  });
});
