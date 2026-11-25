/**
 * Rework phase 3a (migration 20261127000001): return worksheets from the Books by tax code,
 * for locked periods only. Tax-code totals per form (SLS, SLP by column, SAWT from CWT and
 * WV codes, QAP from EWT codes; ND and NR left out), locked-period gating, the 1601-EQ less
 * the 0619-E remittances once filed and paid, the 2550Q carry-over, ND add-back, the income
 * tax method per client and the missing-2307 follow-up.
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
const DB_NAME = "returns_books_test";

const OWNER = "00000000-0000-0000-0000-000000000e01";
const PREPARER = "00000000-0000-0000-0000-000000000e02";
const REVIEWER = "00000000-0000-0000-0000-000000000e03";
const OTHER = "00000000-0000-0000-0000-000000000e04";

type Row = Record<string, string | number | boolean | null>;

describe.skipIf(!url)("returns from the Books by tax code", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let person: string;
  const acct: Record<string, string> = {};
  const code: Record<string, string> = {};
  const filing: Record<string, string> = {};
  const inv: Record<string, string> = {};

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
  const sources = async (f: string, from: string | null = null) =>
    (await as(PREPARER, `select * from public.books_return_sources($1, $2)`, [f, from])).rows.map((r: Row) => ({
      ...r,
      ...Object.fromEntries(["vatable", "vat_exempt", "zero_rated", "non_vat", "vat", "total", "withholding", "uncoded"].map((k) => [k, Number(r[k])])),
    })) as Row[];
  const lock = (month: string) => as(REVIEWER, `select public.lock_books_month($1, $2)`, [client, month]);
  const saveWorksheet = (user: string, f: string, figures: Record<string, number>) =>
    as(user, `insert into public.return_worksheets (filing_instance_id, client_id, inputs, result, figures, computed_at)
              values ($1, $2, '{}', '{"sections": []}', $3, now())
              on conflict (filing_instance_id) do update set result = excluded.result, figures = excluded.figures, computed_at = now()`, [f, client, JSON.stringify(figures)]);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, PREPARER, REVIEWER, OTHER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $5, 'Owner', 'owner'), ($2, $5, 'Preparer', 'staff'), ($3, $5, 'Reviewer', 'reviewer'), ($4, $5, 'Other', 'staff')`,
      [OWNER, PREPARER, REVIEWER, OTHER, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9921', 'Molo Hardware', 'corporation') returning id`, [brand])).rows[0].id;
    person = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9922', 'Jaro Clinic', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $3, 'preparer'), ($1, $4, 'reviewer'), ($2, $3, 'preparer')`, [client, person, PREPARER, REVIEWER]);
    const returns: [string, string, string, string, string, string, string][] = [
      ["2550Q-2025Q4", "2550Q", "2550Q", "Q4 2025", "2025-10-01", "2025-12-31", "2026-01-25"],
      ["2550Q-Q1", "2550Q", "2550Q", "Q1 2026", "2026-01-01", "2026-03-31", "2026-04-25"],
      ["2550Q-Q2", "2550Q", "2550Q", "Q2 2026", "2026-04-01", "2026-06-30", "2026-07-25"],
      ["0619-E-01", "0619-E", "0619E", "January 2026", "2026-01-01", "2026-01-31", "2026-02-10"],
      ["0619-E-02", "0619-E", "0619E", "February 2026", "2026-02-01", "2026-02-28", "2026-03-10"],
      ["1601-EQ-Q1", "1601-EQ", "1601EQ", "Q1 2026", "2026-01-01", "2026-03-31", "2026-04-30"],
      ["1702Q-Q1", "1702Q", "1702Q", "Q1 2026", "2026-01-01", "2026-03-31", "2026-05-30"],
      ["1604-E-2026", "1604-E", "1604E", "2026", "2026-01-01", "2026-12-31", "2027-03-01"],
    ];
    const obligation: Record<string, string> = {};
    for (const [key, form, rule, label, start, end, due] of returns) {
      obligation[form] ??= (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, $2, 'quarterly', '2020-01-01') returning id`, [client, form])).rows[0].id;
      filing[key] = (await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $8, 'not_started') returning id`,
        [obligation[form], client, form, label, start, end, rule, due],
      )).rows[0].id;
    }
    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
    for (const r of (await db.query(`select id, code from public.tax_codes`)).rows) code[r.code] = r.id;

    // January: a sale with an SC/PWD discount and CWT; a purchase over every SLP column, ND and NR lines, and EWT.
    inv.s1 = await invoice({
      kind: "sales", party_name: "Arevalo Builders", party_tin: "111-222-333-00000", reference: "SI-1", issue_date: "2026-01-10", discount: "100",
      withholding_code_id: code.WC158,
      lines: [{ account_id: acct.sales, amount: "1000", tax_code_id: code.OVAT12 }, { account_id: acct.sales, amount: "500", tax_code_id: code.VES }],
    });
    inv.p1 = await invoice({
      kind: "purchase", party_name: "Iloilo Supply", party_tin: "444-555-666-00000", reference: "OR-9", issue_date: "2026-01-20", withholding_code_id: code.WC160,
      lines: [
        { account_id: acct.office_equipment, amount: "1000", tax_code_id: code["IVAT12-CG"] },
        { account_id: acct.repairs_maintenance, amount: "300", tax_code_id: code["IVAT12-S"] },
        { account_id: acct.office_supplies, amount: "200", tax_code_id: code.VEP },
        { account_id: acct.taxes_licenses, amount: "50", tax_code_id: code.ND },
        { account_id: acct.office_supplies, amount: "80", tax_code_id: code.NR },
      ],
    });
    // February: a sale to the government (VAT withheld, WV020, and CWT); a voided sale.
    inv.s2 = await invoice({
      kind: "sales", party_name: "City of Iloilo", party_tin: "777-888-999-00000", reference: "SI-2", issue_date: "2026-02-05",
      withholding_code_id: code.WC160, vat_withholding_code_id: code.WV020,
      lines: [{ account_id: acct.service_income, amount: "2000", tax_code_id: code.OVAT12 }],
    });
    inv.s3 = await invoice({ kind: "sales", party_name: "Void Co", issue_date: "2026-02-06", lines: [{ account_id: acct.sales, amount: "999", tax_code_id: code.OVAT12 }] });
    await as(PREPARER, `select public.void_book_invoice($1, 'Wrong customer')`, [inv.s3]);
    // March: goods other than capital goods.
    inv.p2 = await invoice({ kind: "purchase", party_name: "Iloilo Supply", party_tin: "444-555-666-00000", reference: "OR-10", issue_date: "2026-03-03", lines: [{ account_id: acct.purchases, amount: "400", tax_code_id: code["IVAT12-OG"] }] });
    // April (Q2, left open).
    await invoice({ kind: "sales", party_name: "Walk-in", issue_date: "2026-04-02", lines: [{ account_id: acct.sales, amount: "100", tax_code_id: code.OVAT12 }] });
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  describe("locked periods only", () => {
    it("refuses a return's figures until every month of its period is locked", async () => {
      await expect(sources(filing["2550Q-Q1"])).rejects.toThrow(/The Books are not locked for January 2026, February 2026, March 2026/);
      await lock("2026-01-01");
      await lock("2026-02-01");
      await expect(sources(filing["2550Q-Q1"])).rejects.toThrow(/not locked for March 2026:/);
      await lock("2026-03-01");
      expect((await sources(filing["2550Q-Q1"])).length).toBeGreaterThan(0);
      expect((await sources(filing["0619-E-01"])).length).toBeGreaterThan(0);
    });

    it("refuses the year to date while an earlier month is open, and a period before the books start is not held back", async () => {
      await expect(sources(filing["2550Q-Q2"], "2026-01-01")).rejects.toThrow(/not locked for April 2026, May 2026, June 2026/);
      expect(await sources(filing["2550Q-2025Q4"])).toEqual([]);
    });

    it("saves a worksheet of a return from the Books only once its months are locked", async () => {
      await expect(saveWorksheet(PREPARER, filing["2550Q-Q2"], {})).rejects.toThrow(/The Books are not locked for April 2026, May 2026, June 2026: lock the months before saving the worksheet/);
      await saveWorksheet(PREPARER, filing["2550Q-Q1"], { excess_input_tax: 0 });
    });

    it("lets only staff who see the client read its figures", async () => {
      await expect(as(OTHER, `select * from public.books_return_sources($1)`, [filing["2550Q-Q1"]])).rejects.toThrow(/Filing not found/);
    });
  });

  describe("figures by tax code", () => {
    it("gives each Sales Invoice's VATable, exempt and zero-rated sales, the discount off exempt sales, and leaves out void invoices", async () => {
      const rows = await sources(filing["2550Q-Q1"]);
      const sales = rows.filter((r) => r.source === "sales_invoice");
      expect(sales.map((r) => r.invoice_id).sort()).toEqual([inv.s1, inv.s2].sort());
      expect(sales.find((r) => r.invoice_id === inv.s1)).toMatchObject({ month: expect.anything(), vatable: 1000, vat: 120, vat_exempt: 400, zero_rated: 0, non_vat: 0, total: 1520, uncoded: 0, reference: "SI-1" });
      expect(sales.find((r) => r.invoice_id === inv.s2)).toMatchObject({ vatable: 2000, vat: 240, vat_exempt: 0 });
      // 2550Q Part IV and the SLS: VATable sales, output VAT, exempt sales.
      const sum = (k: string, xs: Row[]) => xs.reduce((a, r) => a + Number(r[k]), 0);
      expect([sum("vatable", sales), sum("vat", sales), sum("vat_exempt", sales)]).toEqual([3000, 360, 400]);
    });

    it("splits each Purchase Invoice into its SLP columns and leaves ND and NR lines off every list", async () => {
      const rows = (await sources(filing["2550Q-Q1"])).filter((r) => r.source === "purchase_receipt");
      const p1 = rows.filter((r) => r.invoice_id === inv.p1).map((r) => [r.slp_category, r.vatable, r.vat, r.vat_exempt]);
      expect(p1).toEqual(expect.arrayContaining([["capital_goods", 1000, 120, 0], ["services", 300, 36, 0], ["exempt", 0, 0, 200]]));
      expect(p1).toHaveLength(3);
      expect(rows.filter((r) => r.invoice_id === inv.p2).map((r) => [r.slp_category, r.vatable, r.vat])).toEqual([["other_goods", 400, 48]]);
      // 2550Q item 44: domestic purchases and input tax.
      expect([rows.reduce((a, r) => a + Number(r.vatable), 0), rows.reduce((a, r) => a + Number(r.vat), 0)]).toEqual([1700, 204]);
    });

    it("gives the SAWT the CWT and the VAT withheld on Sales Invoices, with whether the 2307 is in", async () => {
      const rows = (await sources(filing["2550Q-Q1"])).filter((r) => r.source === "bir_2307_received");
      expect(rows.map((r) => [r.invoice_id === inv.s1 ? "s1" : "s2", r.atc, r.total, r.withholding, r.cwt_supported]).sort()).toEqual([
        ["s1", "WC158", 1400, 14, false],
        ["s2", "WC160", 2000, 40, false],
        ["s2", "WV020", 2000, 100, false],
      ]);
    });

    it("gives the 0619-E and the QAP the EWT on Purchase Invoices of the month", async () => {
      const jan = (await sources(filing["0619-E-01"])).filter((r) => r.source === "bir_2307_issued");
      expect(jan.map((r) => [r.atc, r.total, r.withholding, r.party_tin])).toEqual([["WC160", 1630, 32.6, "444-555-666-00000"]]);
      expect((await sources(filing["0619-E-02"])).filter((r) => r.source === "bir_2307_issued")).toEqual([]);
    });

    it("lists the ND lines per account, to be added back for income tax", async () => {
      const nd = (await as(PREPARER, `select code, amount from public.books_non_deductible($1, '2026-01-01', '2026-03-31')`, [client])).rows;
      expect(nd.map((r: Row) => [r.code, Number(r.amount)])).toEqual([["6120", 50]]);
      expect((await as(OTHER, `select * from public.books_non_deductible($1, '2026-01-01', '2026-03-31')`, [client])).rows).toEqual([]);
    });
  });

  describe("missing 2307", () => {
    it("keeps the CWT claimed and marks it followed up", async () => {
      await as(PREPARER, `select public.mark_cwt_followed_up($1, 'Emailed Arevalo')`, [inv.s1]);
      const s1 = (await sources(filing["2550Q-Q1"])).find((r) => r.invoice_id === inv.s1 && r.source === "bir_2307_received")!;
      expect(s1.cwt_followed_up_at).toBeTruthy();
      expect(s1.withholding).toBe(14);
      await expect(as(PREPARER, `select public.mark_cwt_followed_up($1)`, [inv.p1])).rejects.toThrow(/Only a Sales Invoice with tax withheld/);
      await expect(as(OTHER, `select public.mark_cwt_followed_up($1)`, [inv.s2])).rejects.toThrow(/Invoice not found/);
    });
  });

  describe("2550Q carry-over", () => {
    it("reads the excess input VAT of the previous 2550Q, across the taxable year", async () => {
      await saveWorksheet(PREPARER, filing["2550Q-2025Q4"], { excess_input_tax: 500000 });
      await db.query(`update public.filing_instances set status = 'filed' where id = $1`, [filing["2550Q-2025Q4"]]);
      expect((await as(PREPARER, `select period_label, filed, computed, excess from public.vat_carry_over($1)`, [filing["2550Q-Q1"]])).rows).toEqual([
        { period_label: "Q4 2025", filed: true, computed: true, excess: "500000" },
      ]);
    });

    it("reads the previous quarter's worksheet next, even before it is filed", async () => {
      await saveWorksheet(PREPARER, filing["2550Q-Q1"], { excess_input_tax: 123456 });
      expect((await as(PREPARER, `select period_label, filed, excess from public.vat_carry_over($1)`, [filing["2550Q-Q2"]])).rows).toEqual([
        { period_label: "Q1 2026", filed: false, excess: "123456" },
      ]);
      expect((await as(PREPARER, `select * from public.vat_carry_over($1)`, [filing["2550Q-2025Q4"]])).rows).toEqual([]);
      expect((await as(OTHER, `select * from public.vat_carry_over($1)`, [filing["2550Q-Q1"]])).rows).toEqual([]);
    });
  });

  describe("1601-EQ less the 0619-E remittances", () => {
    const remitted = async () =>
      (await as(PREPARER, `select to_char(month, 'YYYY-MM') as month, period_label, settled, remitted from public.ewt_remittances($1)`, [filing["1601-EQ-Q1"]])).rows;

    it("lists months 1 and 2 with no 0619-E counted until filed and paid", async () => {
      await saveWorksheet(PREPARER, filing["0619-E-01"], { amount_of_remittance: 3260 });
      expect(await remitted()).toEqual([
        { month: "2026-01", period_label: "January 2026", settled: false, remitted: "3260" },
        { month: "2026-02", period_label: "February 2026", settled: false, remitted: "0" },
      ]);
    });

    it("counts a 0619-E once it is Filed & paid ('filed', five-step sign-off), and an approved one not yet", async () => {
      await db.query(`update public.filing_instances set status = 'filed' where id = $1`, [filing["0619-E-01"]]);
      await db.query(`update public.filing_instances set status = 'owner_approved' where id = $1`, [filing["0619-E-02"]]);
      expect(await remitted()).toEqual([
        { month: "2026-01", period_label: "January 2026", settled: true, remitted: "3260" },
        { month: "2026-02", period_label: "February 2026", settled: false, remitted: "0" },
      ]);
    });

    it("keeps the paid original while its amended 0619-E is not yet paid", async () => {
      const orig = (await db.query(`select * from public.filing_instances where id = $1`, [filing["0619-E-01"]])).rows[0];
      await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status, amendment_no, amends)
         values ($1, $2, '0619-E', 'January 2026 Amended', $3, $4, $5, $6, $6, 'prepared', 1, $7)`,
        [orig.obligation_id, client, orig.period_start, orig.period_end, orig.rule_id, orig.due_date, orig.id],
      );
      expect((await remitted())[0]).toMatchObject({ period_label: "January 2026", settled: true, remitted: "3260" });
    });

    it("is only for a 1601-EQ", async () => {
      expect((await as(PREPARER, `select * from public.ewt_remittances($1)`, [filing["2550Q-Q1"]])).rows).toEqual([]);
    });
  });

  describe("1604-E summary of the year's 1601-EQ (migration 20261210000001)", () => {
    const year = async (user = PREPARER) =>
      (await as(user, `select to_char(quarter_start, 'YYYY-MM') as q, period_label, settled, computed, withheld, penalties from public.ewt_year_remittances($1)`, [filing["1604-E-2026"]])).rows;

    it("lists the four quarters with each 1601-EQ's withheld and penalties", async () => {
      await saveWorksheet(PREPARER, filing["1601-EQ-Q1"], { total_taxes_withheld: 9000, total_penalties: 125 });
      await db.query(`update public.filing_instances set status = 'filed', filed_on = '2026-04-28', payment_reference = 'EFPS-9' where id = $1`, [filing["1601-EQ-Q1"]]);
      expect(await year()).toEqual([
        { q: "2026-01", period_label: "Q1 2026", settled: true, computed: true, withheld: "9000", penalties: "125" },
        { q: "2026-04", period_label: null, settled: false, computed: false, withheld: "0", penalties: "0" },
        { q: "2026-07", period_label: null, settled: false, computed: false, withheld: "0", penalties: "0" },
        { q: "2026-10", period_label: null, settled: false, computed: false, withheld: "0", penalties: "0" },
      ]);
    });

    it("is only for a 1604-E, and only for staff who can see the client", async () => {
      expect((await as(PREPARER, `select * from public.ewt_year_remittances($1)`, [filing["1601-EQ-Q1"]])).rows).toEqual([]);
      expect(await year(OTHER)).toEqual([]);
    });

    it("reads the Books only once all twelve months are locked", async () => {
      await expect(as(PREPARER, `select * from public.books_return_sources($1)`, [filing["1604-E-2026"]])).rejects.toThrow(/not locked/);
    });
  });

  describe("income tax method", () => {
    const method = async (c: string) => (await db.query(`select income_tax_method from public.clients where id = $1`, [c])).rows[0].income_tax_method;

    it("is set per client by the Owner or the staff assigned to it", async () => {
      await as(PREPARER, `select public.set_client_income_tax_method($1, 'itemized')`, [client]);
      expect(await method(client)).toBe("itemized");
      await as(OWNER, `select public.set_client_income_tax_method($1, 'osd')`, [client]);
      expect(await method(client)).toBe("osd");
      await expect(as(OTHER, `select public.set_client_income_tax_method($1, 'itemized')`, [client])).rejects.toThrow(/Client not found/);
      await expect(as(PREPARER, `select public.set_client_income_tax_method($1, 'graduated')`, [client])).rejects.toThrow(/Choose OSD, itemized/);
    });

    it("allows the 8% option for individuals only", async () => {
      await expect(as(PREPARER, `select public.set_client_income_tax_method($1, 'eight_percent')`, [client])).rejects.toThrow(/8% option is for individuals only/);
      await as(PREPARER, `select public.set_client_income_tax_method($1, 'eight_percent')`, [person]);
      expect(await method(person)).toBe("eight_percent");
      await as(PREPARER, `select public.set_client_income_tax_method($1, null)`, [person]);
      expect(await method(person)).toBeNull();
    });
  });
});
