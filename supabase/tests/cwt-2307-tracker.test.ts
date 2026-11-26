/**
 * The 2307 tracker (migration 20261217000001): cwt_2307_tracker() gives the CWT on posted,
 * not void Sales Invoices beside the 2307s received, with the 2307 supporting each invoice;
 * staff who see the client get every month, the client's own users only locked months'
 * invoices, everyone else nothing. rematch_2307() matches an approved 2307 that supports no
 * invoice yet (keyed after the 2307 was approved), and never moves one that already does.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { templatePayload } from "../../src/lib/ledger/coa";
import { buildTracker, looseDocuments, type TrackerData } from "../../src/lib/books/cwt-tracker";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "cwt_2307_tracker_test";

const OWNER = "00000000-0000-0000-0000-000000000e01";
const PREPARER = "00000000-0000-0000-0000-000000000e02";
const REVIEWER = "00000000-0000-0000-0000-000000000e03";
const OTHER = "00000000-0000-0000-0000-000000000e04";
const CLIENT_USER = "00000000-0000-0000-0000-000000000e05";

const HOTEL = "004-555-111-00000";
const CAFE = "222-333-444-00000";

describe.skipIf(!url)("2307 tracker: CWT on Sales Invoices beside the 2307s received", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  const acct: Record<string, string> = {};
  const code: Record<string, string> = {};
  const inv: Record<string, string> = {};
  const doc: Record<string, string> = {};

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
  const invoice = async (p: Record<string, unknown>) => (await as(PREPARER, `select public.save_book_invoice($1, $2) as id`, [client, JSON.stringify(p)])).rows[0].id as string;
  const tracker = async (user: string, from = "2026-01-01", to = "2026-12-31") =>
    (await as(user, `select public.cwt_2307_tracker($1, $2, $3) as d`, [client, from, to])).rows[0].d as TrackerData;

  /** The client uploads a 2307 on the portal; staff approve it and post it to the Books, as the Inbox does. */
  async function send2307(month: string, name: string) {
    const d = (await as(CLIENT_USER, `select id, storage_path from public.register_document($1, 'bir_2307_received', $2, $3, 'image/jpeg', 2048)`, [client, month, name])).rows[0];
    await db.query(`insert into storage.objects (bucket_id, name) values ('documents', $1)`, [d.storage_path]);
    await as(CLIENT_USER, `select public.confirm_document($1)`, [d.id]);
    return d.id as string;
  }
  async function approve(d: string, fields: Record<string, string>) {
    await as(PREPARER, `select public.approve_document($1, $2)`, [d, JSON.stringify(fields)]);
    return (await as(PREPARER, `select public.post_document_to_books($1, null, null, null) as r`, [d])).rows[0].r as { cwt_marked?: number };
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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, PREPARER, REVIEWER, OTHER, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $5, 'Owner', 'owner'), ($2, $5, 'Preparer', 'staff'), ($3, $5, 'Reviewer', 'reviewer'), ($4, $5, 'Other', 'staff')`,
      [OWNER, PREPARER, REVIEWER, OTHER, brand],
    );
    client = (await db.query(
      `insert into public.clients (brand_id, code, name, taxpayer_type, tin) values ($1, 'TC-9941', 'Molo Bakery', 'individual', '123-456-789-000') returning id`,
      [brand],
    )).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    await db.query(`insert into public.client_users (client_id, user_id, full_name) values ($1, $2, 'Carla')`, [client, CLIENT_USER]);
    await as(PREPARER, `select public.setup_books($1, 'sole_proprietorship', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("sole_proprietorship"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
    for (const r of (await db.query(`select id, code from public.tax_codes`)).rows) code[r.code] = r.id;

    const sale = (reference: string, issue_date: string, amount: string, party_name: string, party_tin: string) =>
      invoice({ kind: "sales", party_name, party_tin, reference, issue_date, withholding_code_id: code.WC158, lines: [{ account_id: acct.sales, amount, tax_code_id: code.OVAT12 }] });
    // January: two sales to the hotel (CWT 1% of the subtotal: 400 and 200), one to the cafe (100).
    inv.h1 = await sale("SI-001", "2026-01-05", "40000", "Iloilo Grand Hotel Corp.", HOTEL);
    inv.h2 = await sale("SI-002", "2026-01-20", "20000", "Iloilo Grand Hotel Corp.", HOTEL);
    inv.c1 = await sale("SI-003", "2026-01-25", "10000", "Jaro Cafe", CAFE);
    // A sale with no CWT is not tracked.
    await invoice({ kind: "sales", party_name: "Walk-in", issue_date: "2026-01-26", lines: [{ account_id: acct.sales, amount: "500", tax_code_id: code.OVAT12 }] });
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lists each Sales Invoice with CWT, none supported before the 2307s come", async () => {
    const d = await tracker(PREPARER);
    expect(d.invoices.map((i) => [i.reference, i.withholding, i.document_id, i.locked])).toEqual([
      ["SI-001", "400.00", null, false],
      ["SI-002", "200.00", null, false],
      ["SI-003", "100.00", null, false],
    ]);
    expect(d.documents).toEqual([]);
    expect(buildTracker(d, "2026-01-01").map((g) => [g.partyName, g.status, g.awaiting])).toEqual([
      ["Iloilo Grand Hotel Corp.", "missing", 600],
      ["Jaro Cafe", "missing", 100],
    ]);
  });

  it("shows a 2307 waiting for review, then the invoices it supports once approved", async () => {
    doc.hotel = await send2307("2026-03-01", "2307 hotel Q1.jpg");
    let d = await tracker(PREPARER);
    expect(looseDocuments(d).pending.map((x) => x.document_id)).toEqual([doc.hotel]);
    expect(await approve(doc.hotel, { date: "2026-03-31", party_name: "Iloilo Grand Hotel Corp.", party_tin: HOTEL, atc: "WC158", withholding: "600.00" })).toMatchObject({ cwt_marked: 2 });
    d = await tracker(PREPARER);
    expect(d.documents.map((x) => [x.document_id, x.status, x.approved, x.withholding, x.date])).toEqual([[doc.hotel, "posted", true, "600.00", "2026-03-31"]]);
    const [hotel, cafe] = buildTracker(d, "2026-01-01");
    expect(hotel).toMatchObject({ status: "complete", cwt: 600, received: 600, difference: 0 });
    expect(cafe).toMatchObject({ status: "missing", awaiting: 100 });
  });

  it("matches a 2307 again once its invoice is keyed; never one that already supports invoices", async () => {
    doc.cafe = await send2307("2026-03-01", "2307 cafe Feb.jpg");
    expect(await approve(doc.cafe, { date: "2026-02-28", party_name: "Jaro Cafe", party_tin: CAFE, atc: "WC158", withholding: "50.00" })).toMatchObject({ cwt_marked: 0 });
    expect(looseDocuments(await tracker(PREPARER)).unmatched.map((x) => x.document_id)).toEqual([doc.cafe]);
    // The February invoice the 2307 is for comes in later.
    inv.c2 = (await invoice({ kind: "sales", party_name: "Jaro Cafe", party_tin: CAFE, reference: "SI-010", issue_date: "2026-02-10", withholding_code_id: code.WC158, lines: [{ account_id: acct.sales, amount: "5000", tax_code_id: code.OVAT12 }] }));
    await expect(as(OTHER, `select public.rematch_2307($1)`, [doc.cafe])).rejects.toThrow(/Document not found/);
    await expect(as(CLIENT_USER, `select public.rematch_2307($1)`, [doc.cafe])).rejects.toThrow(/Document not found/);
    expect((await as(PREPARER, `select public.rematch_2307($1) as n`, [doc.cafe])).rows[0].n).toBe(1);
    await expect(as(PREPARER, `select public.rematch_2307($1)`, [doc.cafe])).rejects.toThrow(/already supports a Sales Invoice/);
    await expect(as(PREPARER, `select public.rematch_2307($1)`, [doc.hotel])).rejects.toThrow(/already supports a Sales Invoice/);
    const cafe = buildTracker(await tracker(PREPARER), "2026-01-01").find((g) => g.partyName === "Jaro Cafe")!;
    expect(cafe).toMatchObject({ status: "partial", cwt: 150, received: 50, awaiting: 100 });
  });

  it("gives the client's own users only locked months' invoices, and nobody else anything", async () => {
    expect((await tracker(CLIENT_USER)).invoices).toEqual([]);
    expect((await tracker(CLIENT_USER)).documents.map((x) => x.document_id).sort()).toEqual([doc.hotel, doc.cafe].sort());
    await as(REVIEWER, `select public.lock_books_month($1, '2026-01-01')`, [client]);
    expect((await tracker(CLIENT_USER)).invoices.map((i) => i.reference)).toEqual(["SI-001", "SI-002", "SI-003"]);
    await expect(tracker(OTHER)).rejects.toThrow(/not available/);
    await expect(as(PREPARER, `select public.cwt_2307_tracker($1, '2026-01-01', '2027-06-30')`, [client])).rejects.toThrow(/at most a year/);
  });
});
