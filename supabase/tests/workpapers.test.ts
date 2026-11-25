/**
 * W1 (migration 20261125000008_workpapers.sql): the books side of the tie-outs
 * (workpaper_ledger) counts posted entries only and agrees with the register when
 * documents are booked from it; a manual entry shows as a T-1 difference; the
 * explanations follow client access.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { templatePayload } from "../../src/lib/ledger/coa";
import { toRegisterLine, type RegisterRow } from "../../src/lib/register/parts";
import { tieOuts, type LedgerTotals } from "../../src/lib/workpapers/tieouts";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "workpapers_test";

const STAFF = "00000000-0000-0000-0000-000000000091";
const OTHER = "00000000-0000-0000-0000-000000000092";
const CLIENT_USER = "00000000-0000-0000-0000-000000000093";
const CUSTOMER = "123-456-789";

describe.skipIf(!url)("workpapers: tie-outs to the books", () => {
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
  async function bookedDoc(docType: string, fields: Record<string, string>, account?: string) {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'staff', $3, '2027-03-01', '2027-03-01', 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'under_review') returning id`,
      [client, STAFF, docType],
    )).rows[0].id;
    await as(STAFF, `select public.approve_document($1, $2)`, [d, JSON.stringify(fields)]);
    const acct = account ? (await db.query(`select id from public.ledger_accounts where client_id = $1 and template_key = $2`, [client, account])).rows[0].id : null;
    return (await as(STAFF, `select public.book_document($1, $2) as id`, [d, acct])).rows[0].id as string;
  }
  const ledger = async (): Promise<LedgerTotals> => {
    const j = (await as(STAFF, `select public.workpaper_ledger($1, '2027-03-01', '2027-03-31') as j`, [client])).rows[0].j;
    const c = (v: unknown) => Math.round(Number(v) * 100);
    return { revenue: c(j.revenue), outputVat: c(j.output_vat), inputVat: c(j.input_vat), ewtPayable: c(j.ewt_payable), wtcPayable: c(j.wtc_payable), compensation: c(j.compensation), cashFromSales: c(j.cash_from_sales), suggested: Number(j.suggested) };
  };
  const ties = async () => {
    const lines = ((await db.query(`select * from public.register_lines where client_id = $1 and month = '2027-03-01'`, [client])).rows as RegisterRow[]).map(toRegisterLine);
    return Object.fromEntries(tieOuts({ month: lines, quarterToDate: lines, ledger: await ledger(), payroll: null, explanations: {} }).map((t) => [t.id, t]));
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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3)`, [STAFF, OTHER, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Staff', 'staff'), ($2, $3, 'Other', 'staff')`, [STAFF, OTHER, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9901', 'Jaro Agri Supply', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Jaro')`, [CLIENT_USER, client]);
    await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01')`, [client]);
    await db.query(`insert into public.parties (tin, registered_name) values ($1, 'Bacolod Feeds Corp')`, [CUSTOMER]);
    await as(STAFF, `select public.setup_books($1, 'sole_proprietorship', '2027-01-01', $2)`, [client, JSON.stringify(templatePayload("sole_proprietorship"))]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("counts only posted entries; once confirmed, the books agree with the register", async () => {
    const sale = await bookedDoc("sales_invoice", { date: "2027-03-05", number: "SI 0412", party_name: "Bacolod Feeds Corp", party_tin: CUSTOMER, vatable: "120000.00", vat: "14400.00", total: "134400.00", withholding: "1200.00", atc: "WC158" });
    const buy = await bookedDoc("purchase_receipt", { date: "2027-03-06", number: "OR 2201", vatable: "45000.00", vat: "5400.00", total: "50400.00", withholding: "2250.00", atc: "WC100" }, "rent");
    let t = await ties();
    expect(t["T-1"]).toMatchObject({ status: "open", difference: 12000000 });
    expect((await ledger()).suggested).toBe(2);

    for (const e of [sale, buy]) await as(STAFF, `select public.confirm_journal_entry($1)`, [e]);
    t = await ties();
    for (const id of ["T-1", "T-2", "T-4", "T-5", "T-8"]) expect(t[id].status).toBe("clean");
    expect(t["T-3"]).toMatchObject({ status: "open", difference: 120000 });
    expect(await ledger()).toMatchObject({ revenue: 12000000, outputVat: 1440000, inputVat: 540000, ewtPayable: 225000, cashFromSales: 13320000, suggested: 0 });
  });

  it("shows a manual sales entry as a T-1 difference", async () => {
    const acct = async (k: string) => (await db.query(`select id from public.ledger_accounts where client_id = $1 and template_key = $2`, [client, k])).rows[0].id;
    await as(STAFF, `select public.post_journal_entry($1, '2027-03-30', 'Cash sale, no invoice uploaded', 'JE 03-118', $2)`, [
      client, JSON.stringify([{ account_id: await acct("cash_on_hand"), debit: "6800" }, { account_id: await acct("sales"), credit: "6800" }]),
    ]);
    expect((await ties())["T-1"]).toMatchObject({ status: "open", difference: -680000 });
  });

  it("lets assigned staff explain a difference; others and the client cannot see or write it", async () => {
    await as(STAFF, `insert into public.workpaper_explanations (client_id, period, tie, explanation) values ($1, '2027-03-01', 'T-1', 'JE 03-118: invoice requested')`, [client]);
    await expect(as(OTHER, `insert into public.workpaper_explanations (client_id, period, tie, explanation) values ($1, '2027-03-01', 'T-3', 'x')`, [client])).rejects.toThrow(/row-level security/);
    expect((await as(OTHER, `select * from public.workpaper_explanations`)).rows).toEqual([]);
    expect((await as(CLIENT_USER, `select * from public.workpaper_explanations`)).rows).toEqual([]);
    expect((await as(STAFF, `select tie, explained_by from public.workpaper_explanations`)).rows).toEqual([{ tie: "T-1", explained_by: STAFF }]);
    await expect(as(STAFF, `insert into public.workpaper_explanations (client_id, period, tie, explanation) values ($1, '2027-03-01', 'T-11', 'x')`, [client])).rejects.toThrow(/tie_check/);
  });
});
