/**
 * A rehearsal of one client's December 2026, end to end (docs/REWORK.md, "The flow" and
 * decisions 1–23), through the database functions the screens call, as the people who
 * use them: the preparer, the reviewer, the Owner and the client's user.
 *
 * Lapaz Trading Corp: a VAT-registered corporation with two employees that withholds
 * EWT on its purchases, whose taxes the firm remits. Its Books start 1 October 2026 so
 * the fourth quarter is whole: October and November are kept and locked first (their
 * 0619-E and 1601-C run through the five steps and billing), then December goes the
 * whole way: the client sends documents → staff approve them into the Books → the
 * preparer asks for the lock and the reviewer locks → the returns of the locked period
 * (1601-C for December; 2550Q and 1601-EQ for the quarter; a quarter's last month has no
 * 0619-E and the fourth quarter no 1702Q, the 1601-EQ and the annual 1702-RT cover them)
 * are computed from the Books with the app's own worksheet modules → Prepared → Reviewed
 * → Client approved → the Owner runs billing, the client pays on the portal, the Owner
 * verifies and ticks → Owner approved → Filed & paid with the scanned copy → the VAT
 * closing and dues payments in the client's Books → what the portal shows → the
 * year-end closing entry.
 *
 * The calendar. The database reads the date from now(): a month cannot be locked before
 * it starts, a client cannot send next month's documents, the year cannot be closed
 * before it ends. To rehearse December before it comes, this test's own database
 * replaces pg_catalog.now() with one that reads the setting `rehearsal.today` (falling
 * back to the transaction time), and the test moves the date forward step by step
 * (`on(...)`). Only this throwaway database is changed.
 *
 * What the database alone does not do, done here as the app does it:
 *   - filing instances come from the nightly job (src/lib/filings/generate.ts
 *     buildFilingRows, run here with the job's own code and inserted as the job would);
 *   - worksheets are computed in TypeScript (src/lib/returns/load.ts builds the context,
 *     a form module computes it, the worksheet action saves it): `worksheet()` reads the
 *     same rows through the same database functions as the preparer, builds the same
 *     context, runs the same module and saves what the action saves;
 *   - the tax due at Prepared is typed by the preparer; here it is the worksheet's total;
 *   - the DAT files the Owner's approval records come from the worksheet (dat.ts), and
 *     eSubmission is sent by hand here (the Gmail mailbox needs the Google setup);
 *   - document figures are typed as staff approve them (no OCR).
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client, types } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { templatePayload } from "../../src/lib/ledger/coa";
import { buildFilingRows, type ClientRow, type ObligationRow, type RuleRow } from "../../src/lib/filings/generate";
import { moduleForForm } from "../../src/lib/returns/registry";
import { buildPriorFigures, flattenFigures, fromBooksRow, monthOf, taxableYearStart, type BooksSourceRow } from "../../src/lib/returns/source";
import type { WorksheetContext, WorksheetResult } from "../../src/lib/returns/types";
import { toCentavos } from "../../src/lib/returns/money";
import { isDatKind } from "../../src/lib/esubmission/mime";
import { employeeFromRow, itemFromRow, priorEmployerFromRow, storedMonthsFromRows, toEntries } from "../../src/lib/payroll/rows";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "december_rehearsal_test";

const OWNER = "00000000-0000-0000-0000-00000000d001";
const PREPARER = "00000000-0000-0000-0000-00000000d002";
const REVIEWER = "00000000-0000-0000-0000-00000000d003";
const CLIENT_USER = "00000000-0000-0000-0000-00000000d004";

const MOLO = "111-222-333-00000"; // customer that withholds 1% (WC158) and sends 2307s
const SUPPLY = "444-555-666-00000"; // goods supplier, EWT 1% (WC158)
const REALTY = "222-333-444-00000"; // landlord, EWT 5% (WC100)
const JARO = "555-666-777-00000"; // cash customer

type Row = Record<string, unknown>;

describe.skipIf(!url)("December 2026 rehearsal: one client's month, end to end", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let gcash: string;
  const acct: Record<string, string> = {};
  const code: Record<string, string> = {};
  const item: Record<string, string> = {};
  const emp: Record<string, string> = {};
  const filing: Record<string, string> = {};
  const doc: Record<string, string> = {};
  const inv: Record<string, string> = {};

  // ---------------------------------------------------------------------------
  // Plumbing.
  // ---------------------------------------------------------------------------

  /** Moves the rehearsal's calendar: now() is 9 a.m. in Manila on that day. */
  const on = (day: string) => db.query(`select set_config('rehearsal.today', $1, false)`, [`${day} 09:00:00+08`]);

  async function as<T = Row>(user: string, sql: string, params: unknown[] = []): Promise<T[]> {
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
  const one = async <T = Row>(user: string, sql: string, params: unknown[] = []) => (await as<T>(user, sql, params))[0];
  const q = async <T = Row>(sql: string, params: unknown[] = []) => (await db.query(sql, params)).rows as T[];

  /** The nightly job: filing instances for the obligations, with the job's own code. */
  async function generateFilings(today: string) {
    const obligations = await q<ObligationRow>(`select id, client_id, form, frequency, start_date::text, end_date::text from public.obligations`);
    const clients = await q<ClientRow>(`select id, status, fiscal_year_end_month, filing_channel, efps_group from public.clients`);
    const rules = await q<RuleRow>(
      `select id, form, frequency, period_filter, due, channel, efps_group, effective_from::text, effective_to::text, calendar_year from public.deadline_rules`,
    );
    const holidays = (await q<{ date: string }>(`select date::text from public.holidays`)).map((h) => h.date);
    const { rows } = buildFilingRows({ obligations, clients, rules, holidays, today });
    for (const r of rows) {
      await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9) on conflict (obligation_id, period_end, amendment_no) do nothing`,
        [r.obligation_id, r.client_id, r.form, r.period_label, r.period_start, r.period_end, r.rule_id, r.statutory_due_date, r.due_date],
      );
    }
    for (const r of await q<{ id: string; form: string; period_end: string }>(`select id, form, period_end::text from public.filing_instances where client_id = $1`, [client])) {
      filing[`${r.form} ${r.period_end}`] = r.id;
    }
  }

  const step = async (user: string, f: string, action: string, data: object = {}, note: string | null = null) =>
    one<{ status: string }>(user, `select (x).status from public.advance_filing($1, $2, $3, $4::jsonb) as x`, [f, action, note, JSON.stringify(data)]);
  const statusOf = async (f: string) => (await q<{ status: string }>(`select status from public.filing_instances where id = $1`, [f]))[0].status;

  /** Stores the scanned copy in the return's folder (as the upload does) and records it. */
  async function attachFiledCopy(f: string) {
    const p = `${client}/${f}/${Math.random().toString(36).slice(2)}/filed.pdf`;
    await db.query(`insert into storage.objects (bucket_id, name) values ('filing-files', $1)`, [p]);
    return (await one<{ id: string }>(PREPARER, `select public.add_filing_file($1, 'filed_copy', $2, 'filed.pdf', 'application/pdf', 1000) as id`, [f, p])).id;
  }

  /** The client uploads a document on the portal: the row, the file, then the confirmation. */
  async function send(docType: string, month: string, fileName: string) {
    const d = await one<{ id: string; storage_path: string }>(CLIENT_USER, `select id, storage_path from public.register_document($1, $2, $3, $4, 'image/jpeg', 2048)`, [client, docType, month, fileName]);
    await db.query(`insert into storage.objects (bucket_id, name) values ('documents', $1)`, [d.storage_path]);
    const confirmed = await one<{ status: string; source: string }>(CLIENT_USER, `select status, source from public.confirm_document($1)`, [d.id]);
    expect(confirmed).toEqual({ status: "received", source: "portal" });
    return d.id;
  }

  /** Staff approve a document's figures and post it to the Books, as the Inbox row does. */
  async function approveIntoBooks(d: string, fields: Record<string, string>, account: string | null, cash: string | null = null) {
    await as(PREPARER, `select public.approve_document($1, $2)`, [d, JSON.stringify(fields)]);
    return one<{ r: { invoice_id?: string; settlement_id?: string | null; cwt_marked?: number } }>(
      PREPARER, `select public.post_document_to_books($1, $2, $3, null) as r`, [d, account, cash],
    ).then((x) => x.r);
  }

  const save = (p: Record<string, unknown>) => one<{ id: string }>(PREPARER, `select public.save_book_invoice($1, $2) as id`, [client, JSON.stringify(p)]).then((r) => r.id);
  const pay = (p: Record<string, unknown>) => one<{ id: string }>(PREPARER, `select public.save_book_settlement($1, $2) as id`, [client, JSON.stringify(p)]).then((r) => r.id);

  /** One month's payroll for the two employees, loaded by staff and posted to the Books. */
  async function payroll(month: string) {
    const line = (amounts: Record<string, string>) => Object.entries(amounts).map(([cat, amount]) => ({ item_id: item[cat], amount }));
    await as(PREPARER, `select public.save_payroll_month($1, $2, $3::jsonb)`, [client, month, JSON.stringify([
      { employee_id: emp.ana, lines: line({ basic: "30000", withholding_tax: "1030.05", sss_ee: "1350", phic_ee: "750", hdmf_ee: "200", sss_er: "2850", phic_er: "750", hdmf_er: "200" }) },
      { employee_id: emp.ben, lines: line({ basic: "15000", sss_ee: "675", phic_ee: "375", hdmf_ee: "200", sss_er: "1425", phic_er: "375", hdmf_er: "200" }) },
    ])]);
    const run = (await one<{ r: Row }>(PREPARER, `select public.payroll_run($1, $2) as r`, [client, month])).r;
    expect(run).toMatchObject({ employees: 2, gross: 45000, tax_withheld: 1030.05, employer: 5800, net: 40419.95, problems: [] });
    return (await one<{ id: string }>(PREPARER, `select public.post_payroll($1, $2) as id`, [client, month])).id;
  }

  /** The preparer asks for the lock once the Inbox is clear; the reviewer locks. */
  async function lockMonth(month: string) {
    await as(PREPARER, `select public.request_books_lock($1, $2)`, [client, month]);
    await as(REVIEWER, `select public.lock_books_month($1, $2)`, [client, month]);
  }

  /**
   * The worksheet, as src/lib/returns/load.ts builds it and the worksheet action saves it:
   * the Books by tax code (books_return_sources, refused until the period is locked), the
   * earlier worksheets of the year, the previous 2550Q (vat_carry_over), the 0619-E of the
   * quarter (ewt_remittances), the payroll and payslips; computed by the form's module and
   * saved with its flattened figures. Returns the figures in pesos.
   */
  async function worksheet(f: string): Promise<{ result: WorksheetResult; figures: Record<string, number>; dat: string[] }> {
    const fi = await one<Row>(PREPARER,
      `select f.id, f.client_id, f.form, f.period_label, f.period_start::text, f.period_end::text, f.due_date::text, r.calendar_year,
              c.name, c.tin, c.rdo_code, c.registered_address, c.taxpayer_type, c.fiscal_year_end_month, c.income_tax_method
       from public.filing_instances f join public.clients c on c.id = f.client_id left join public.deadline_rules r on r.id = f.rule_id
       where f.id = $1`, [f]);
    const form = String(fi.form);
    const periodStart = String(fi.period_start);
    const periodEnd = String(fi.period_end);
    const mod = moduleForForm(form);
    if (!mod) throw new Error(`No worksheet for ${form}`);
    const yearStart = taxableYearStart(periodEnd, fi.calendar_year ? 12 : Number(fi.fiscal_year_end_month));
    const docsFrom = mod.documentScope === "year_to_date" ? yearStart : monthOf(periodStart);
    const books = await as<BooksSourceRow>(PREPARER, `select * from public.books_return_sources($1, $2)`, [f, docsFrom]);
    const vat = await as(PREPARER, `select id from public.obligations where client_id = $1 and form = '2550Q' and start_date <= $2 and (end_date is null or end_date >= $3)`, [client, periodEnd, periodStart]);
    const prior = await as<{ form: string; period_start: string; figures: Record<string, number> }>(PREPARER,
      `select fi.form, fi.period_start::text, w.figures from public.return_worksheets w join public.filing_instances fi on fi.id = w.filing_instance_id
       where w.client_id = $1 and w.filing_instance_id <> $2 and fi.period_start >= $3 and fi.period_end < $4`,
      [client, f, yearStart, mod.priorWithinPeriod ? periodEnd : periodStart]);
    const ctx: WorksheetContext = {
      client: {
        id: client, name: String(fi.name), tin: fi.tin as string | null, rdoCode: fi.rdo_code as string | null, registeredAddress: fi.registered_address as string | null,
        taxpayerType: fi.taxpayer_type as WorksheetContext["client"]["taxpayerType"], fiscalYearEndMonth: Number(fi.fiscal_year_end_month), vatRegistered: vat.length > 0,
        incomeTaxMethod: (fi.income_tax_method as WorksheetContext["client"]["incomeTaxMethod"]) ?? null,
      },
      filing: { id: f, form, periodLabel: String(fi.period_label), periodStart, periodEnd, dueDate: String(fi.due_date) },
      documents: books.map(fromBooksRow),
      inputs: {},
      priorFigures: buildPriorFigures(prior.map((p) => ({ form: p.form, periodStart: p.period_start, figures: p.figures }))),
      source: "books",
    };
    if (form === "2550Q") {
      const r = (await as<Row>(PREPARER, `select * from public.vat_carry_over($1)`, [f]))[0];
      ctx.vatCarryOver = r ? { periodLabel: String(r.period_label), filed: Boolean(r.filed), computed: Boolean(r.computed), excess: Number(r.excess) } : null;
    }
    if (form === "1601-EQ") {
      ctx.ewtRemittances = (await as<Row>(PREPARER, `select month::text, period_label, status, settled, computed, remitted from public.ewt_remittances($1)`, [f])).map((r) => ({
        month: String(r.month), periodLabel: r.period_label as string | null, status: r.status as string | null, settled: Boolean(r.settled), computed: Boolean(r.computed), remitted: Number(r.remitted),
      }));
    }
    if (form === "1601-C") {
      const year = Number(periodEnd.slice(0, 4));
      const through = periodEnd.slice(0, 7) + "-01";
      const employees = await as<Row>(PREPARER, `select * from public.employees where client_id = $1`, [client]);
      const items = (await as<Row>(PREPARER, `select * from public.payroll_items where client_id = $1`, [client])).map(itemFromRow);
      const entries = await as<Row>(PREPARER,
        `select e.employee_id, e.pay_month::text, e.adjustment, e.note,
                coalesce((select json_agg(json_build_object('item_id', l.item_id, 'amount', l.amount)) from public.payroll_entry_lines l where l.entry_id = e.id), '[]') as payroll_entry_lines
         from public.payroll_entries e where e.client_id = $1 and e.pay_month between $2 and $3`, [client, `${year}-01-01`, through]);
      const priorEmployers = await as<Row>(PREPARER, `select * from public.employee_prior_employers where client_id = $1 and year = $2`, [client, year]);
      ctx.payroll = {
        year, throughMonth: Number(periodEnd.slice(5, 7)),
        employees: employees.map(employeeFromRow), entries: toEntries(storedMonthsFromRows(entries), items), priorEmployers: priorEmployers.map(priorEmployerFromRow),
      };
      ctx.payslips = (await as<Row>(PREPARER, `select * from public.payslips($1, $2)`, [client, monthOf(periodStart)])).map((r) => ({
        employeeNo: r.employee_no as string | null, employeeName: String(r.employee_name), payPeriodEnd: r.pay_period_end ? String(r.pay_period_end).slice(0, 10) : null,
        gross: c(r.gross), sss: c(r.sss), philhealth: c(r.philhealth), pagibig: c(r.pagibig), tax: c(r.tax), otherDeductions: c(r.other_deductions), net: c(r.net),
      }));
    }
    const result = mod.compute(ctx);
    const figures = flattenFigures(result);
    await as(PREPARER,
      `insert into public.return_worksheets (filing_instance_id, client_id, inputs, result, figures, document_ids, computed_at, computed_by)
       values ($1, $2, '{}', $3, $4, $5, now(), $6)
       on conflict (filing_instance_id) do update set result = excluded.result, figures = excluded.figures, document_ids = excluded.document_ids, computed_at = now(), computed_by = excluded.computed_by`,
      [f, client, JSON.stringify(result), JSON.stringify(figures), result.documentIds, PREPARER]);
    // The DAT attachments the Owner's approval records for eSubmission (src/lib/esubmission/dat.ts).
    const dat = (mod.attachments?.(ctx, result) ?? []).filter((a) => isDatKind(a.kind)).map((a) => a.build().fileName);
    return { result, figures: Object.fromEntries(Object.entries(figures).map(([k, v]) => [k, v / 100])), dat };
  }
  const c = (v: unknown) => toCentavos(v == null ? null : String(v)) ?? 0;

  /** The client uploads a proof of payment for a statement on the portal. */
  async function proof(soa: string, amount: number, paidOn: string) {
    const p = `${client}/${soa}/${Math.random().toString(36).slice(2)}.jpg`;
    await db.query(`insert into storage.objects (bucket_id, name) values ('payment-proofs', $1)`, [p]);
    return (await one<{ id: string }>(CLIENT_USER, `select public.submit_payment_proof($1, $2, 'gcash.jpg', 'image/jpeg', $3, $4, $5, 'GC-REF') as id`, [soa, p, amount, paidOn, gcash])).id;
  }
  const dues = (soa: string) =>
    as<{ id: string; kind: string; description: string; amount: string; open_amount: string; filing_instance_id: string | null }>(
      OWNER, `select id, kind, description, amount::text, open_amount::text, filing_instance_id from public.due_balances where soa_id = $1 order by kind, description`, [soa]);
  const balance = async (key: string, to = "2027-12-31") =>
    (await q<{ b: string }>(
      `select coalesce(sum(l.debit - l.credit), 0)::text as b from public.journal_lines l join public.journal_entries e on e.id = l.entry_id and e.status in ('posted', 'reversed')
       where l.account_id = $1 and e.entry_date <= $2`, [acct[key], to]))[0].b;
  const entryLines = async (entry: string) =>
    q(`select a.template_key as account, l.debit::text, l.credit::text from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id where l.entry_id = $1 order by l.line_no`, [entry]);

  // ---------------------------------------------------------------------------
  // The firm and the client, onboarded in October 2026.
  // ---------------------------------------------------------------------------
  beforeAll(async () => {
    await admin.connect();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.query(`create database ${DB_NAME}`);
    // Dates come back as text, as PostgREST gives them to the app.
    db = new Client({
      connectionString: url!.replace(/^(postgres(?:ql)?:\/\/[^/]*\/)[^?]*/, `$1${DB_NAME}`),
      types: { getTypeParser: ((oid: number, format?: "text" | "binary") => (oid === 1082 ? (v: string) => v : types.getTypeParser(oid, format))) as typeof types.getTypeParser },
    });
    await db.connect();
    // The rehearsal's calendar (see the header): this database only.
    await db.query(`create or replace function pg_catalog.now() returns timestamptz language sql stable as $$
      select coalesce(nullif(pg_catalog.current_setting('rehearsal.today', true), '')::timestamptz, pg_catalog.transaction_timestamp()) $$`);
    await db.query(read("tests/supabase-stub.sql"));
    for (const f of readdirSync(path.join(root, "migrations")).sort()) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
    await db.query(read("seed.sql"));
    await on("2026-10-01");

    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, PREPARER, REVIEWER, CLIENT_USER]);
    const brand = (await q<{ id: string }>(`select id from public.brands where code = 'TC'`))[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Preparer', 'staff'), ($3, $4, 'Reviewer', 'reviewer')`,
      [OWNER, PREPARER, REVIEWER, brand],
    );
    client = (await q<{ id: string }>(
      `insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, tin, rdo_code, registered_address, status)
       values ($1, 'TC-9951', 'Lapaz Trading Corp', 'corporation', 'firm_remits', '123-456-789-00000', '074', 'Lopez Jaena St, Lapaz, Iloilo City', 'active') returning id`, [brand]))[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name, is_primary) values ($1, $2, 'Rosa Lapaz', true)`, [CLIENT_USER, client]);
    await db.query(`insert into public.engagements (client_id, service_line, monthly_retainer, start_date) values ($1, 'bookkeeping', 5000, '2026-10-01')`, [client]);
    for (const [form, frequency] of [["2550Q", "quarterly"], ["0619-E", "monthly"], ["1601-EQ", "quarterly"], ["1601-C", "monthly"], ["1702Q", "quarterly"], ["1702-RT", "annual"]]) {
      await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, $2, $3, '2026-10-01')`, [client, form, frequency]);
    }
    gcash = (await q<{ id: string }>(
      `insert into public.brand_payment_accounts (brand_id, kind, institution, account_name, account_number, active) values ($1, 'ewallet', 'GCash', 'Tallo CPA', '0917', true) returning id`, [brand]))[0].id;
    for (const [tin, name] of [[MOLO, "Molo Builders Inc"], [SUPPLY, "Iloilo Supply Co"], [REALTY, "Sta. Barbara Realty Corp"], [JARO, "Jaro Hardware"]]) {
      await db.query(`insert into public.parties (tin, registered_name) values ($1, $2)`, [tin.slice(0, 11), name]);
    }

    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-10-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of await q<{ id: string; template_key: string }>(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])) acct[r.template_key] = r.id;
    for (const r of await q<{ id: string; code: string }>(`select id, code from public.tax_codes`)) code[r.code] = r.id;
    await as(PREPARER, `select public.ensure_payroll_items($1)`, [client]);
    for (const r of await q<{ id: string; bir_category: string }>(`select id, bir_category from public.payroll_items where client_id = $1`, [client])) item[r.bir_category] = r.id;
    emp.ana = (await q<{ id: string }>(`insert into public.employees (client_id, last_name, first_name, tin, hire_date) values ($1, 'Santos', 'Ana', '301-222-333', '2024-01-15') returning id`, [client]))[0].id;
    emp.ben = (await q<{ id: string }>(`insert into public.employees (client_id, last_name, first_name, tin, hire_date) values ($1, 'Reyes', 'Ben', '302-222-333', '2025-06-01') returning id`, [client]))[0].id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  // ---------------------------------------------------------------------------
  // The quarter's first two months.
  // ---------------------------------------------------------------------------
  describe("October and November: the quarter's first months, kept and locked", () => {
    it("generates the returns the obligations call for: no 0619-E in a quarter's last month, no 1702Q for the fourth quarter", async () => {
      await on("2026-11-03");
      await generateFilings("2026-11-03");
      const rows = await q<{ form: string; period_label: string; due_date: string }>(
        `select form, period_label, due_date::text from public.filing_instances where client_id = $1 and period_end <= '2026-12-31' order by period_end, form`, [client]);
      expect(rows.map((r) => `${r.form} ${r.period_label} due ${r.due_date}`)).toEqual([
        "0619-E 2026-10 due 2026-11-10",
        "1601-C 2026-10 due 2026-11-10",
        "0619-E 2026-11 due 2026-12-10",
        "1601-C 2026-11 due 2026-12-10",
        // The seed rule (marked UNVERIFIED) puts December's 1601-C on the 10th, moved to Monday the 11th;
        // the BIR's guidelines give 15 January for December's taxes withheld (reported, not changed here).
        "1601-C 2026-12 due 2027-01-15",
        "1601-EQ FY2026-Q4 due 2027-02-01",
        "2550Q FY2026-Q4 due 2027-01-25",
      ]);
    });

    it("books October: a sale on account with CWT, a purchase with EWT, the payroll; the month is locked", async () => {
      inv.oct_sale = await save({
        kind: "sales", party_name: "Molo Builders Inc", party_tin: MOLO, reference: "SI-0101", issue_date: "2026-10-12", withholding_code_id: code.WC158,
        lines: [{ account_id: acct.sales, amount: "200000", tax_code_id: code.OVAT12 }],
      });
      inv.oct_purchase = await save({
        kind: "purchase", party_name: "Iloilo Supply Co", party_tin: SUPPLY, reference: "INV-77", issue_date: "2026-10-15", withholding_code_id: code.WC158,
        lines: [{ account_id: acct.purchases, amount: "50000", tax_code_id: code["IVAT12-OG"] }],
      });
      await payroll("2026-10-01");
      await expect(as(PREPARER, `select public.lock_books_month($1, '2026-10-01')`, [client])).rejects.toThrow(/Only the client's reviewer or the Owner locks/);
      await lockMonth("2026-10-01");
      expect(await one(REVIEWER, `select status from public.books_month_status($1, 2026) where month = '2026-10-01'`, [client])).toMatchObject({ status: "locked" });
      await expect(save({ kind: "sales", party_name: "Late", issue_date: "2026-10-30", lines: [{ account_id: acct.sales, amount: "1" }] })).rejects.toThrow(/October 2026 is locked by the reviewer/);
    });

    it("runs October's 0619-E and 1601-C from the Books through the five steps, billing and payment", async () => {
      const e = await worksheet(filing["0619-E 2026-10-31"]);
      expect(e.result.errors).toEqual([]);
      const ewt = taxDue(e.figures);
      expect(ewt).toBe(500);
      const w = await worksheet(filing["1601-C 2026-10-31"]);
      expect(w.result.errors).toEqual([]);
      expect(taxDue(w.figures)).toBe(1030.05);
      for (const [f, tax] of [[filing["0619-E 2026-10-31"], 500], [filing["1601-C 2026-10-31"], 1030.05]] as const) {
        await step(PREPARER, f, "prepare", { tax_due: tax });
        await expect(step(PREPARER, f, "review")).rejects.toThrow(/Only the client's reviewer/);
        expect(await step(REVIEWER, f, "review")).toEqual({ status: "reviewed" });
        expect(await step(CLIENT_USER, f, "client_approve")).toEqual({ status: "client_approved" });
      }

      // Nobody ran billing in October: its retainer is "Not billed" and goes on November's statement.
      await on("2026-11-05");
      const ready = await as<Row>(OWNER, `select kind, description, amount::text, reason from public.ready_to_bill('2026-11-05') where client_id = $1`, [client]);
      expect(ready).toEqual([
        { kind: "retainer", description: "Monthly retainer, October 2026", amount: "5000.00", reason: "retainer_unbilled" },
        { kind: "retainer", description: "Monthly retainer, November 2026", amount: "5000.00", reason: "retainer" },
        { kind: "tax", description: "Tax due, 0619-E 2026-10", amount: "500.00", reason: "client_approved" },
        { kind: "tax", description: "Tax due, 1601-C 2026-10", amount: "1030.05", reason: "client_approved" },
      ]);
      expect(await one(OWNER, `select public.run_billing('2026-11-05', $1) as n`, [client])).toEqual({ n: 1 });
      const soa = (await one<{ id: string }>(CLIENT_USER, `select id from public.soas where client_id = $1 and billing_date = '2026-11-05'`, [client])).id;
      const items = await dues(soa);
      expect(items.reduce((a, d) => a + Number(d.amount), 0)).toBe(11530.05);

      // The client pays the whole statement by GCash; the Owner verifies and ticks every item.
      await on("2026-11-06");
      const p = await proof(soa, 11530.05, "2026-11-06");
      await as(OWNER, `select public.verify_payment_proof($1, null, null, 'OR-1001', $2)`, [p, items.map((d) => d.id)]);
      expect((await dues(soa)).every((d) => d.open_amount === "0.00")).toBe(true);

      await on("2026-11-09");
      for (const f of [filing["0619-E 2026-10-31"], filing["1601-C 2026-10-31"]]) {
        expect(await step(OWNER, f, "owner_approve")).toEqual({ status: "owner_approved" });
        await attachFiledCopy(f);
        expect(await step(PREPARER, f, "file", { filing_reference: "EB-OCT", filed_on: "2026-11-09", payment_reference: "GC-OCT", paid_on: "2026-11-09" })).toEqual({ status: "filed" });
      }
      // The client's money for the returns was remitted when they were filed.
      expect(await as(OWNER, `select received::text, remitted::text, held::text from public.cash_for_remittance($1)`, [client])).toEqual([{ received: "1530.05", remitted: "1530.05", held: "0.00" }]);
      // Each item the client paid became a dues payment in its Books, dated the day it paid.
      expect(await q(`select r.entry_date::text, r.amount::text from public.return_book_entries r where r.client_id = $1 and r.kind = 'dues_payment' and r.status = 'posted' order by r.amount`, [client]))
        .toEqual([{ entry_date: "2026-11-06", amount: "500.00" }, { entry_date: "2026-11-06", amount: "1030.05" }]);
    });

    it("keeps October's statements from the portal until the quarter's returns are approved too (decision 19a)", async () => {
      // October's own returns are filed, but the 2550Q and the 1601-EQ of the quarter cover October as well.
      const holds = (await one<{ h: Row[] }>(CLIENT_USER, `select public.portal_books($1) -> 'statement_holds' as h`, [client])).h;
      expect(holds.map((h) => `${h.month} ${h.form} ${h.period_label} ${h.status}`)).toEqual([
        "2026-10-01 1601-EQ FY2026-Q4 not_started", "2026-10-01 2550Q FY2026-Q4 not_started",
      ]);
      await expect(as(CLIENT_USER, `select * from public.portal_trial_balance($1, '2026-10-01', '2026-10-31', 'monthly')`, [client])).rejects.toThrow(/statements for October 2026 wait for your approval/);
      // The loose-leaf books and Home keep the lock-only rule.
      expect((await one<{ e: Row[] }>(CLIENT_USER, `select public.portal_book_entries($1, '2026-10-01', '2026-10-31') -> 'entries' as e`, [client])).e.length).toBeGreaterThan(0);
    });

    it("books November (a cash sale, a purchase with no EWT, the payroll) and locks it; a nil 0619-E skips the client's approval", async () => {
      await on("2026-12-02");
      await generateFilings("2026-12-02");
      inv.nov_sale = await save({ kind: "sales", party_name: "Jaro Hardware", party_tin: JARO, reference: "SI-0102", issue_date: "2026-11-20", lines: [{ account_id: acct.sales, amount: "150000", tax_code_id: code.OVAT12 }] });
      await pay({ kind: "receipt", settle_date: "2026-11-20", cash_account_id: acct.cash_in_bank, reference: "OR-0102", allocations: [{ invoice_id: inv.nov_sale, amount: "168000" }] });
      inv.nov_purchase = await save({ kind: "purchase", party_name: "Iloilo Supply Co", party_tin: SUPPLY, reference: "INV-91", issue_date: "2026-11-22", lines: [{ account_id: acct.purchases, amount: "30000", tax_code_id: code["IVAT12-OG"] }] });
      await payroll("2026-11-01");
      await lockMonth("2026-11-01");

      const e = await worksheet(filing["0619-E 2026-11-30"]);
      expect(taxDue(e.figures)).toBe(0);
      await step(PREPARER, filing["0619-E 2026-11-30"], "prepare", { tax_due: 0 });
      expect(await step(REVIEWER, filing["0619-E 2026-11-30"], "review")).toEqual({ status: "client_approved" });
      expect(await step(OWNER, filing["0619-E 2026-11-30"], "owner_approve")).toEqual({ status: "owner_approved" });

      const w = await worksheet(filing["1601-C 2026-11-30"]);
      expect(taxDue(w.figures)).toBe(1030.05);
      await step(PREPARER, filing["1601-C 2026-11-30"], "prepare", { tax_due: 1030.05 });
      await step(REVIEWER, filing["1601-C 2026-11-30"], "review");
      await step(CLIENT_USER, filing["1601-C 2026-11-30"], "client_approve");

      // Billing: December's retainer and the 1601-C; the nil 0619-E is never billed.
      await on("2026-12-04");
      await as(OWNER, `select public.run_billing('2026-12-04', $1)`, [client]);
      const soa = (await one<{ id: string }>(OWNER, `select id from public.soas where client_id = $1 and billing_date = '2026-12-04'`, [client])).id;
      const items = await dues(soa);
      expect(items.map((d) => [d.kind, d.description, d.amount])).toEqual([
        ["retainer", "Monthly retainer, December 2026", "5000.00"],
        ["tax", "Tax due, 1601-C 2026-11", "1030.05"],
      ]);
      // The client pays only the tax for now; the Owner ticks it, the retainer stays open.
      await on("2026-12-07");
      const p = await proof(soa, 1030.05, "2026-12-07");
      await as(OWNER, `select public.verify_payment_proof($1, null, null, 'OR-1002', $2)`, [p, [items[1].id]]);
      expect((await dues(soa)).map((d) => d.open_amount)).toEqual(["5000.00", "0.00"]);

      await on("2026-12-09");
      await step(OWNER, filing["1601-C 2026-11-30"], "owner_approve");
      for (const f of [filing["0619-E 2026-11-30"], filing["1601-C 2026-11-30"]]) {
        await attachFiledCopy(f);
        const nil = f === filing["0619-E 2026-11-30"];
        await step(PREPARER, f, "file", { filing_reference: "EB-NOV", filed_on: "2026-12-09", payment_reference: nil ? "" : "GC-NOV", paid_on: nil ? null : "2026-12-09" });
        expect(await statusOf(f)).toBe("filed");
      }
    });
  });

  // ---------------------------------------------------------------------------
  // December.
  // ---------------------------------------------------------------------------
  describe("December: the client sends documents", () => {
    it("takes sales, purchases & expenses, a customer's 2307 and the payroll on the portal, and the client confirms the month", async () => {
      await on("2026-12-29");
      await db.query(`select public.run_document_cycles('2026-12-29')`);
      doc.cash_sale = await send("sales_invoice", "2026-12-01", "SI-0201.jpg");
      doc.credit_sale = await send("sales_invoice", "2026-12-01", "SI-0202.jpg");
      doc.cert = await send("bir_2307_received", "2026-12-01", "2307-molo-q4.jpg");
      doc.cert_oct = await send("bir_2307_received", "2026-12-01", "2307-molo-oct.jpg");
      doc.rent = await send("purchase_receipt", "2026-12-01", "rent-dec.jpg");
      doc.supplies = await send("purchase_receipt", "2026-12-01", "INV-120.jpg");
      doc.payroll = await send("payroll", "2026-12-01", "payroll-dec.xlsx");
      // January's documents cannot be sent in December.
      await expect(as(CLIENT_USER, `select public.register_document($1, 'sales_invoice', '2027-01-01', 'x.jpg', 'image/jpeg', 1)`, [client])).rejects.toThrow(/this month or an earlier one/);
      await on("2027-01-02");
      await db.query(`select public.run_document_cycles('2027-01-02')`);
      expect(await one(CLIENT_USER, `select confirmed_documents from public.confirm_month_complete($1, '2026-12-01')`, [client])).toEqual({ confirmed_documents: 7 });
    });
  });

  describe("December: staff approve the Inbox into the Books", () => {
    it("refuses the lock while the Inbox has documents of the month", async () => {
      await on("2027-01-04");
      await expect(as(PREPARER, `select public.request_books_lock($1, '2026-12-01')`, [client])).rejects.toThrow(/7 documents of December 2026 are still in the Inbox/);
    });

    it("makes a cash sale a Sales Invoice and its Receipt", async () => {
      const r = await approveIntoBooks(doc.cash_sale, { date: "2026-12-10", number: "SI-0201", party_tin: JARO, party_name: "Jaro Hardware", vatable: "100000.00", vat: "12000.00", total: "112000.00", payment_terms: "cash" }, acct.sales);
      inv.cash_sale = r.invoice_id!;
      expect(r.settlement_id).toBeTruthy();
      expect(await one(PREPARER, `select total::text, balance_due::text from public.book_invoice_list where id = $1`, [inv.cash_sale])).toEqual({ total: "112000.00", balance_due: "0.00" });
    });

    it("makes a sale on account a Sales Invoice with its CWT, the balance waiting under the customer", async () => {
      const r = await approveIntoBooks(doc.credit_sale, {
        date: "2026-12-15", number: "SI-0202", party_tin: MOLO, party_name: "Molo Builders Inc", vatable: "250000.00", vat: "30000.00", total: "280000.00",
        withholding: "2500.00", atc: "WC158", payment_terms: "charge",
      }, acct.sales);
      inv.credit_sale = r.invoice_id!;
      expect(r.settlement_id).toBeNull();
      const i = await one<Row>(PREPARER, `select withholding_code, withholding::text, amount_due::text, balance_due::text from public.book_invoice_list where id = $1`, [inv.credit_sale]);
      expect(i).toEqual({ withholding_code: "WC158", withholding: "2500.00", amount_due: "277500.00", balance_due: "277500.00" });
    });

    it("takes the customer's 2307s as the CWT of their Sales Invoices, October's included", async () => {
      expect(await approveIntoBooks(doc.cert, { date: "2026-12-28", party_tin: MOLO, atc: "WC158", withholding: "2500.00" }, null)).toEqual({ cwt_marked: 1 });
      expect(await approveIntoBooks(doc.cert_oct, { date: "2026-12-28", party_tin: MOLO, atc: "WC158", withholding: "2000.00" }, null)).toEqual({ cwt_marked: 1 });
      const supported = await q<{ reference: string }>(`select reference from public.book_invoices where client_id = $1 and cwt_document_id is not null order by reference`, [client]);
      expect(supported.map((r) => r.reference)).toEqual(["SI-0101", "SI-0202"]);
    });

    it("makes the rent a Purchase Invoice with EWT, paid later by a Payment", async () => {
      const r = await approveIntoBooks(doc.rent, {
        date: "2026-12-01", number: "BILL-12", party_tin: REALTY, party_name: "Sta. Barbara Realty Corp", vatable: "40000.00", vat: "4800.00", total: "44800.00",
        withholding: "2000.00", atc: "WC100", slp_category: "services", payment_terms: "charge",
      }, acct.rent);
      inv.rent = r.invoice_id!;
      expect(await one(PREPARER, `select withholding_code, amount_due::text from public.book_invoice_list where id = $1`, [inv.rent])).toEqual({ withholding_code: "WC100", amount_due: "42800.00" });
      await pay({ kind: "payment", settle_date: "2026-12-05", cash_account_id: acct.cash_in_bank, reference: "CHK-501", allocations: [{ invoice_id: inv.rent, amount: "42800" }] });
      expect(await one(PREPARER, `select balance_due::text from public.book_invoice_list where id = $1`, [inv.rent])).toEqual({ balance_due: "0.00" });
    });

    it("makes a cash purchase a Purchase Invoice with EWT and its Payment", async () => {
      const r = await approveIntoBooks(doc.supplies, {
        date: "2026-12-18", number: "INV-120", party_tin: SUPPLY, party_name: "Iloilo Supply Co", vatable: "60000.00", vat: "7200.00", total: "67200.00",
        withholding: "600.00", atc: "WC158", slp_category: "other_goods", payment_terms: "cash",
      }, acct.purchases, acct.cash_in_bank);
      inv.supplies = r.invoice_id!;
      expect(r.settlement_id).toBeTruthy();
      expect(await one(PREPARER, `select amount_due::text, balance_due::text from public.book_invoice_list where id = $1`, [inv.supplies])).toEqual({ amount_due: "66600.00", balance_due: "0.00" });
    });

    it("loads the client's payroll into payslips and posts it", async () => {
      await as(PREPARER, `select public.review_document($1, 'accept')`, [doc.payroll]);
      await payroll("2026-12-01");
      await as(PREPARER, `select public.review_document($1, 'post')`, [doc.payroll]);
      const slips = await as<Row>(PREPARER, `select employee_name, gross::text, tax::text, net::text, journal_entry_id is not null as posted from public.payslips($1, '2026-12-01')`, [client]);
      expect(slips).toEqual([
        { employee_name: "Reyes, Ben", gross: "15000.00", tax: "0.00", net: "13750.00", posted: true },
        { employee_name: "Santos, Ana", gross: "30000.00", tax: "1030.05", net: "26669.95", posted: true },
      ]);
    });
  });

  describe("December: the lock", () => {
    it("is asked for by the preparer and done by the reviewer; the 2550Q's books are then ready", async () => {
      expect(await one(PREPARER, `select public.filing_books_ready($1) as r`, [filing["2550Q 2026-12-31"]])).toEqual({ r: false });
      // Filings lists December under "Books still open" with its nearest BIR date.
      const stillOpen = () => as<Row>(PREPARER, `select month::text, status, form, nearest_due_date::text, filings from public.books_still_open() where client_id = $1 and month < '2027-01-01'`, [client]);
      expect(await stillOpen()).toEqual([{ month: "2026-12-01", status: "open", form: "1601-C", nearest_due_date: "2027-01-15", filings: 3 }]);
      await as(PREPARER, `select public.request_books_lock($1, '2026-12-01')`, [client]);
      expect((await stillOpen())[0].status).toBe("lock_requested");
      await expect(as(PREPARER, `select public.lock_books_month($1, '2026-12-01')`, [client])).rejects.toThrow(/Only the client's reviewer or the Owner locks/);
      await as(REVIEWER, `select public.lock_books_month($1, '2026-12-01')`, [client]);
      expect(await stillOpen()).toEqual([]);
      // Nothing more is posted into December.
      await expect(save({ kind: "sales", party_name: "Late", issue_date: "2026-12-31", lines: [{ account_id: acct.sales, amount: "1" }] })).rejects.toThrow(/December 2026 is locked by the reviewer/);
      expect(await one(PREPARER, `select public.filing_books_ready($1) as r`, [filing["2550Q 2026-12-31"]])).toEqual({ r: true });
      const months = await as<Row>(REVIEWER, `select to_char(month, 'YYYY-MM') as m, status from public.books_month_status($1, 2026) order by month`, [client]);
      expect(months.filter((m) => String(m.m) >= "2026-10")).toEqual([
        { m: "2026-10", status: "locked" }, { m: "2026-11", status: "locked" }, { m: "2026-12", status: "locked" },
      ]);
    });
  });

  // ---------------------------------------------------------------------------
  // The returns of the locked period.
  // ---------------------------------------------------------------------------
  const due: Record<string, number> = {};
  const dat: Record<string, string[]> = {};

  describe("December: the returns, computed from the Books", () => {
    it("1601-C for December: the month's payslips", async () => {
      await on("2027-01-05");
      await generateFilings("2027-01-05");
      const w = await worksheet(filing["1601-C 2026-12-31"]);
      expect(w.result.errors).toEqual([]);
      expect(w.figures.total_compensation).toBe(45000);
      due["1601-C"] = taxDue(w.figures);
      dat["1601-C"] = w.dat;
      expect(due["1601-C"]).toBe(1030.05);
    });

    it("2550Q for the fourth quarter: output VAT on the quarter's sales less input VAT on its purchases", async () => {
      const w = await worksheet(filing["2550Q 2026-12-31"]);
      expect(w.result.errors).toEqual([]);
      due["2550Q"] = taxDue(w.figures);
      dat["2550Q"] = w.dat;
      // Output 12% of 700,000; input 12% of 180,000.
      expect(due["2550Q"]).toBe(84000 - 21600);
    });

    it("1601-EQ for the fourth quarter: the quarter's EWT less the 0619-E of October and November", async () => {
      const w = await worksheet(filing["1601-EQ 2026-12-31"]);
      expect(w.result.errors).toEqual([]);
      due["1601-EQ"] = taxDue(w.figures);
      dat["1601-EQ"] = w.dat;
      // EWT 500 (October) + 0 (November) + 2,000 + 600 (December), less the 500 remitted in November.
      expect(due["1601-EQ"]).toBe(2600);
    });

    it("are prepared and reviewed by two different people, and approved by the client", async () => {
      for (const form of ["1601-C", "2550Q", "1601-EQ"]) {
        const f = filing[`${form} 2026-12-31`];
        expect(await step(PREPARER, f, "prepare", { tax_due: due[form] })).toEqual({ status: "prepared" });
        expect(await step(REVIEWER, f, "review")).toEqual({ status: "reviewed" });
      }
      // The portal shows December's statements only once its returns are approved.
      await expect(as(CLIENT_USER, `select * from public.portal_trial_balance($1, '2026-12-01', '2026-12-31', 'monthly')`, [client])).rejects.toThrow(/statements for December 2026 wait for your approval/);
      for (const form of ["1601-C", "2550Q", "1601-EQ"]) {
        expect(await step(CLIENT_USER, filing[`${form} 2026-12-31`], "client_approve")).toEqual({ status: "client_approved" });
      }
    });
  });

  // ---------------------------------------------------------------------------
  // Billing.
  // ---------------------------------------------------------------------------
  let janSoa: string;

  describe("January: billing, payment and the Owner's approval", () => {
    it("lists the client in Ready to bill and bills the approved returns, the contributions and January's retainer", async () => {
      await on("2027-01-06");
      for (const [what, amount] of [["SSS contributions, December 2026", 6300], ["PhilHealth contributions, December 2026", 2250], ["Pag-IBIG contributions, December 2026", 800]] as const) {
        await as(OWNER, `select public.add_client_charge($1, 'contribution', $2, $3, '2027-01-15')`, [client, what, amount]);
      }
      const ready = await as<Row>(OWNER, `select kind, description, amount::text, reason from public.ready_to_bill('2027-01-06') where client_id = $1`, [client]);
      expect(ready.map((r) => `${r.reason}: ${r.description} ${r.amount}`)).toEqual([
        "retainer: Monthly retainer, January 2027 5000.00",
        "client_approved: Tax due, 1601-C 2026-12 1030.05",
        "client_approved: Tax due, 2550Q FY2026-Q4 62400.00",
        "client_approved: Tax due, 1601-EQ FY2026-Q4 2600.00",
        "charge: Pag-IBIG contributions, December 2026 800.00",
        "charge: PhilHealth contributions, December 2026 2250.00",
        "charge: SSS contributions, December 2026 6300.00",
      ]);
      // Not before the client pays: the Owner cannot approve a return whose item is unpaid.
      await expect(step(OWNER, filing["2550Q 2026-12-31"], "owner_approve")).rejects.toThrow(/not on a statement yet/);
      await as(OWNER, `select public.run_billing('2027-01-06', $1)`, [client]);
      janSoa = (await one<{ id: string }>(OWNER, `select id from public.soas where client_id = $1 and billing_date = '2027-01-06'`, [client])).id;
      expect((await dues(janSoa)).map((d) => [d.kind, d.amount])).toEqual([
        ["contribution", "800.00"], ["contribution", "2250.00"], ["contribution", "6300.00"],
        ["retainer", "5000.00"],
        ["tax", "1030.05"], ["tax", "2600.00"], ["tax", "62400.00"],
      ]);
      await expect(step(OWNER, filing["2550Q 2026-12-31"], "owner_approve")).rejects.toThrow(/not verified yet \(unpaid\)/);
    });

    it("lets the client see the statements and pay on the portal; the Owner verifies and ticks the items", async () => {
      const mine = await as<Row>(CLIENT_USER, `select billing_date::text from public.soas order by billing_date`);
      expect(mine.map((s) => s.billing_date)).toEqual(["2026-11-05", "2026-12-04", "2027-01-06"]);
      // December's retainer from the earlier statement is still open, and January's is new.
      const open = await as<Row>(CLIENT_USER, `select description, open_amount::text from public.due_balances where client_id = $1 and open_amount > 0 and kind = 'retainer' order by period_month`, [client]);
      expect(open).toEqual([{ description: "Monthly retainer, December 2026", open_amount: "5000.00" }, { description: "Monthly retainer, January 2027", open_amount: "5000.00" }]);

      await on("2027-01-07");
      // Everything except January's retainer: the returns, the contributions and December's retainer.
      const items = (await dues(janSoa)).filter((d) => d.kind !== "retainer");
      const decRetainer = (await as<{ id: string }>(OWNER, `select id from public.client_dues where client_id = $1 and period_month = '2026-12-01'`, [client]))[0].id;
      const total = items.reduce((a, d) => a + Number(d.amount), 0) + 5000;
      expect(total).toBe(80380.05);
      const p = await proof(janSoa, total, "2027-01-07");
      expect(await one(CLIENT_USER, `select status from public.payment_proofs where id = $1`, [p])).toEqual({ status: "for_verification" });
      await as(OWNER, `select public.verify_payment_proof($1, null, null, 'OR-1003', $2)`, [p, [...items.map((d) => d.id), decRetainer]]);
      expect(await one(CLIENT_USER, `select status from public.payment_proofs where id = $1`, [p])).toEqual({ status: "verified" });
      expect((await dues(janSoa)).filter((d) => d.open_amount !== "0.00").map((d) => d.description)).toEqual(["Monthly retainer, January 2027"]);
      // The tax and contribution money is held for remittance.
      expect(await as(OWNER, `select received::text, remitted::text, held::text from public.cash_for_remittance($1)`, [client])).toEqual([
        { received: String((1530.05 + 1030.05 + 75380.05).toFixed(2)), remitted: "2560.10", held: "75380.05" },
      ]);
    });

    it("posts each item paid as a dues payment in the client's Books, dated the day the client paid", async () => {
      const rows = await q<Row>(
        `select d.description, r.status, r.entry_date::text, r.amount::text, r.entry_id from public.return_book_entries r join public.client_dues d on d.id = r.due_id
         where r.client_id = $1 and r.kind = 'dues_payment' and r.entry_date = '2027-01-07' order by d.description`, [client]);
      expect(rows.map((r) => [r.description, r.status, r.amount])).toEqual([
        ["Pag-IBIG contributions, December 2026", "posted", "800.00"],
        ["PhilHealth contributions, December 2026", "posted", "2250.00"],
        ["SSS contributions, December 2026", "posted", "6300.00"],
        ["Tax due, 1601-C 2026-12", "posted", "1030.05"],
        ["Tax due, 1601-EQ FY2026-Q4", "posted", "2600.00"],
        ["Tax due, 2550Q FY2026-Q4", "posted", "62400.00"],
      ]);
      const vat = rows.find((r) => r.description === "Tax due, 2550Q FY2026-Q4")!;
      expect(await entryLines(String(vat.entry_id))).toEqual([
        { account: "vat_payable", debit: "62400.00", credit: "0.00" },
        { account: "cash_in_bank", debit: "0.00", credit: "62400.00" },
      ]);
      // The payroll's withholding and contributions for December are paid off.
      expect(await balance("wtc_payable")).toBe("0.00");
      expect(await balance("government_contributions_payable", "2027-01-31")).toBe(String((-9350 * 2).toFixed(2)));
    });

    it("gives the Owner's approval once each return's own item is paid", async () => {
      await on("2027-01-08");
      // The SLS and SLP of each month go with the 2550Q, the QAP with the 1601-EQ; the 1601-C has none.
      expect(dat).toEqual({
        "1601-C": [],
        "2550Q": ["123456789S102026.DAT", "123456789S112026.DAT", "123456789S122026.DAT", "123456789P102026.DAT", "123456789P112026.DAT", "123456789P122026.DAT"],
        "1601-EQ": ["12345678900001220261601EQ.DAT"],
      });
      for (const form of ["1601-C", "2550Q", "1601-EQ"]) {
        expect(await step(OWNER, filing[`${form} 2026-12-31`], "owner_approve", { dat_files: dat[form] })).toEqual({ status: "owner_approved" });
      }
      const check = (await one<{ data: Row }>(OWNER, `select data from public.filing_events where filing_instance_id = $1 and action = 'owner_approve'`, [filing["2550Q 2026-12-31"]])).data;
      expect(check).toMatchObject({ payment_status: "paid", payment_check: { tax_due: 62400, tax_paid: 62400 } });
    });
  });

  // ---------------------------------------------------------------------------
  // Filed & paid.
  // ---------------------------------------------------------------------------
  describe("January: Filed & paid", () => {
    it("records each return with its references and scanned copy; the money is remitted", async () => {
      await on("2027-01-09");
      await attachFiledCopy(filing["1601-C 2026-12-31"]);
      await step(PREPARER, filing["1601-C 2026-12-31"], "file", { filing_reference: "EB-1601C-DEC", filed_on: "2027-01-09", payment_reference: "GC-1601C", paid_on: "2027-01-09" });
      await on("2027-01-22");
      await expect(step(PREPARER, filing["2550Q 2026-12-31"], "file", { filing_reference: "EB-2550Q", filed_on: "2027-01-22", payment_reference: "GC-2550Q", paid_on: "2027-01-22" })).rejects.toThrow(/scanned copy/);
      for (const form of ["2550Q", "1601-EQ"]) {
        await attachFiledCopy(filing[`${form} 2026-12-31`]);
        expect(await step(PREPARER, filing[`${form} 2026-12-31`], "file", { filing_reference: `EB-${form}`, filed_on: "2027-01-22", payment_reference: `GC-${form}`, paid_on: "2027-01-22" })).toEqual({ status: "filed" });
      }
      // Contributions are remitted when the Owner records them.
      for (const r of await as<{ id: string }>(OWNER, `select id from public.client_dues where client_id = $1 and kind = 'contribution'`, [client])) {
        await as(OWNER, `select public.mark_contribution_remitted($1, '2027-01-15', 'SSS/PH/HDMF Jan-15')`, [r.id]);
      }
      expect(await as(OWNER, `select held::text from public.cash_for_remittance($1)`, [client])).toEqual([{ held: "0.00" }]);
    });

    it("sends the DAT attachments for eSubmission; a return is complete with the BIR's validation report", async () => {
      const state = async (f: string) => one(PREPARER, `select public.filing_esubmission_state($1) as s, public.filing_complete($1) as c`, [f]);
      expect(await state(filing["1601-C 2026-12-31"])).toEqual({ s: "not_required", c: true });
      const f = filing["2550Q 2026-12-31"];
      expect(await state(f)).toEqual({ s: "not_sent", c: false });
      // Sent by hand (the Gmail mailbox is a Google setup, not rehearsed here); the report is uploaded by staff.
      await as(PREPARER, `select public.record_esubmission_sent($1, 'manual', null)`, [f]);
      expect(await state(f)).toEqual({ s: "sent", c: false });
      const p = `${client}/${f}/reply/validation.pdf`;
      await db.query(`insert into storage.objects (bucket_id, name) values ('filing-files', $1)`, [p]);
      const report = (await one<{ id: string }>(PREPARER, `select public.add_filing_file($1, 'validation_report', $2, 'validation.pdf', 'application/pdf', 900) as id`, [f, p])).id;
      await as(PREPARER, `select public.record_esubmission_result($1, 'validated', null, $2)`, [f, report]);
      expect(await state(f)).toEqual({ s: "validated", c: true });
    });

    it("closes the quarter's VAT when the 2550Q is filed: Dr Output VAT, Cr Input VAT, Cr VAT Payable, dated 31 December", async () => {
      const r = await q<Row>(`select status, entry_id, entry_date::text, amount::text, note from public.return_book_entries where filing_instance_id = $1 and kind = 'vat_closing'`, [filing["2550Q 2026-12-31"]]);
      expect(r).toMatchObject([{ status: "posted", entry_date: "2026-12-31", amount: "62400.00", note: null }]);
      expect(await entryLines(String(r[0].entry_id))).toEqual([
        { account: "output_vat", debit: "84000.00", credit: "0.00" },
        { account: "input_vat", debit: "0.00", credit: "21600.00" },
        { account: "vat_payable", debit: "0.00", credit: "62400.00" },
      ]);
      // After the client's payment, VAT payable, output VAT and input VAT are all at zero.
      expect([await balance("vat_payable"), await balance("output_vat"), await balance("input_vat")]).toEqual(["0.00", "0.00", "0.00"]);
      // EWT payable: the quarter's 3,100 paid through the firm (500 in November, 2,600 in January).
      expect(await balance("ewt_payable")).toBe("0.00");
    });
  });

  // ---------------------------------------------------------------------------
  // The portal.
  // ---------------------------------------------------------------------------
  describe("the portal", () => {
    it("shows the client its filed returns, each with its one scanned copy (and the 2550Q's validation report)", async () => {
      const filed = await as<Row>(CLIENT_USER, `select form, period_label, status from public.filing_instances where status = 'filed' order by period_end, form`);
      expect(filed.map((f) => `${f.form} ${f.period_label}`)).toEqual([
        "0619-E 2026-10", "1601-C 2026-10", "0619-E 2026-11", "1601-C 2026-11", "1601-C 2026-12", "1601-EQ FY2026-Q4", "2550Q FY2026-Q4",
      ]);
      const files = await as<Row>(CLIENT_USER, `select kind, count(*)::int as n from public.filing_files group by kind order by kind`);
      expect(files).toEqual([{ kind: "filed_copy", n: 7 }, { kind: "validation_report", n: 1 }]);
    });

    it("shows each month's statements, the quarter's, and holds the year for the annual income tax return", async () => {
      expect(await one(CLIENT_USER, `select (public.portal_books($1) ->> 'locked_through') as through`, [client])).toEqual({ through: "2026-12-31" });
      for (const [from, to, kind] of [["2026-10-01", "2026-10-31", "monthly"], ["2026-11-01", "2026-11-30", "monthly"], ["2026-12-01", "2026-12-31", "monthly"], ["2026-10-01", "2026-12-31", "quarterly"]]) {
        const tb = await as<Row>(CLIENT_USER, `select code, credit::text from public.portal_trial_balance($1, $2, $3, $4) where account_id = $5`, [client, from, to, kind, acct.sales]);
        expect(tb.length).toBe(1);
      }
      const dec = await one<Row>(CLIENT_USER, `select credit::text from public.portal_trial_balance($1, '2026-12-01', '2026-12-31', 'monthly') where account_id = $2`, [client, acct.sales]);
      expect(dec.credit).toBe("350000.00");
      const holds = (await one<{ h: Row[] }>(CLIENT_USER, `select public.portal_books($1) -> 'statement_holds' as h`, [client])).h;
      expect(holds.map((h) => `${h.scope} ${h.form} ${h.status}`)).toEqual(["year 1702-RT not_started"]);
      await expect(as(CLIENT_USER, `select * from public.portal_trial_balance($1, '2026-01-01', '2026-12-31', 'annual')`, [client])).rejects.toThrow(/year ending December 2026 wait for your approval of its income tax return/);
    });

    it("shows Home's month-by-month figures, and the 2307s the client gives its suppliers for the quarter", async () => {
      const home = (await one<{ s: { months: Row[] } }>(CLIENT_USER, `select public.portal_books_summary($1, '2026-10-01', '2026-12-31') as s`, [client])).s;
      expect(home.months.filter((m) => m.type === "revenue").map((m) => [String(m.month).slice(0, 7), Number(m.credit)])).toEqual([["2026-10", 200000], ["2026-11", 150000], ["2026-12", 350000]]);
      const certs = (await one<{ d: { rows: Row[] } }>(CLIENT_USER, `select public.books_2307_data($1, '2026-10-01', '2026-12-31') as d`, [client])).d.rows;
      expect(certs.map((r) => [r.party_name, r.atc, r.income_payment, r.withholding])).toEqual([
        ["Iloilo Supply Co", "WC158", "50000.00", "500.00"],
        ["Sta. Barbara Realty Corp", "WC100", "40000.00", "2000.00"],
        ["Iloilo Supply Co", "WC158", "60000.00", "600.00"],
      ]);
    });

    it("shows the client's payments with their statuses and the statements month by month", async () => {
      const proofs = await as<Row>(CLIENT_USER, `select paid_on::text, amount::text, status from public.payment_proofs order by paid_on`);
      expect(proofs).toEqual([
        { paid_on: "2026-11-06", amount: "11530.05", status: "verified" },
        { paid_on: "2026-12-07", amount: "1030.05", status: "verified" },
        { paid_on: "2027-01-07", amount: "80380.05", status: "verified" },
      ]);
      const open = await as<Row>(CLIENT_USER, `select description, open_amount::text from public.due_balances where open_amount > 0`);
      expect(open).toEqual([{ description: "Monthly retainer, January 2027", open_amount: "5000.00" }]);
    });
  });

  // ---------------------------------------------------------------------------
  // Year-end.
  // ---------------------------------------------------------------------------
  describe("year-end 2026", () => {
    it("closes the year into retained earnings: the Owner's entry", async () => {
      await on("2027-01-28");
      await expect(as(PREPARER, `select public.close_books_year($1, '2026-12-31')`, [client])).rejects.toThrow(/Only the Owner posts or reverses the closing entry/);
      const e = (await one<{ id: string }>(OWNER, `select public.close_books_year($1, '2026-12-31') as id`, [client])).id;
      const re = (await entryLines(e)).find((l) => l.account === "retained_earnings")!;
      // Sales 700,000 less purchases 80,000 + 60,000, rent 40,000, and three months' payroll (45,000 pay + 5,800 employer share).
      expect(re).toEqual({ account: "retained_earnings", debit: "0.00", credit: String((700000 - 180000 - 3 * 50800).toFixed(2)) });
      expect(await as(CLIENT_USER, `select * from public.missing_2307s($1)`, [client])).toEqual([]);
      // The closing does not wipe December's figures on the portal, and every entry balances.
      const dec = await one<Row>(CLIENT_USER, `select credit::text from public.portal_trial_balance($1, '2026-12-01', '2026-12-31', 'monthly') where account_id = $2`, [client, acct.sales]);
      expect(dec.credit).toBe("350000.00");
      expect(await q(`select entry_id from public.journal_lines where client_id = $1 group by entry_id having sum(debit) <> sum(credit)`, [client])).toEqual([]);
      expect(await balance("sales", "2026-12-31")).toBe("0.00");
    });

    it("releases the year's final 2316s: every month of the Books is locked (January to September came before them)", async () => {
      await as(OWNER, `insert into public.payroll_2316_releases (client_id, year) values ($1, 2026)`, [client]);
      expect(await q(`select year from public.payroll_2316_releases where client_id = $1`, [client])).toEqual([{ year: 2026 }]);
    });
  });

  /** The tax still due on a return's worksheet, in pesos. */
  function taxDue(figures: Record<string, number>): number {
    for (const k of ["total_remittance", "total_amount_payable", "total_amount_due"]) if (k in figures) return figures[k];
    throw new Error(`No tax due among ${Object.keys(figures).join(", ")}`);
  }
});
