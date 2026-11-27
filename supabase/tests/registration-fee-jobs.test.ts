/**
 * Registration cases match the fee schedule, and proof files on steps (migrations
 * 20270101000101_registration_fee_jobs.sql and 20270101000102_registration_step_files.sql):
 * SEC filings, BIR certificates and employer registration as cases; SEC amendments;
 * each completed case billed from the active fee schedule (feeJobsFor), unpriced jobs
 * as a task for the Owner; staff attach proof files to steps, the client sees them.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  branchStepsFor,
  certificateStepsFor,
  employerStepsFor,
  feeJobsFor,
  renewalStepsFor,
  secFilingStepsFor,
  stepsPayload,
  updateStepsFor,
  type CaseKind,
  type PlannedStep,
} from "../../src/lib/registration/steps";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "registration_fee_jobs_test";

const OWNER = "00000000-0000-0000-0000-000000000b01";
const STAFF = "00000000-0000-0000-0000-000000000b02";
const OTHER_STAFF = "00000000-0000-0000-0000-000000000b03";
const CLIENT_USER = "00000000-0000-0000-0000-000000000b04";
const OTHER_CLIENT_USER = "00000000-0000-0000-0000-000000000b05";

describe.skipIf(!url)("registration fee jobs and proof files", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let brand: string;
  let seq = 100;

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

  async function activeClient(name: string, type: "individual" | "corporation" = "corporation") {
    const id = (await db.query(
      `insert into public.clients (brand_id, code, name, taxpayer_type, tin) values ($1, $2, $3, $4, '111-222-333-00000') returning id`,
      [brand, `TC-8${seq++}`, name, type],
    )).rows[0].id as string;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [id, STAFF]);
    return id;
  }

  const openCase = (client: string, kind: string, caseData: object, steps: PlannedStep[], user = OWNER) =>
    as<{ id: string; kind: string; period_year: number | null; employer: boolean; lgu_served: boolean; details: Record<string, unknown> }>(
      user, `select * from public.open_client_case($1, $2, $3, $4)`, [client, kind, JSON.stringify(caseData), JSON.stringify(stepsPayload(steps))],
    ).then((r) => r[0]);

  async function finishAndComplete(caseId: string) {
    const { rows } = await db.query(`select id, code from public.registration_steps where case_id = $1 and status <> 'not_applicable'`, [caseId]);
    for (const r of rows) {
      await as(STAFF, `select public.update_registration_step($1, 'done', $2, '2027-03-01', null, null)`, [r.id, r.code === "bir_cor" ? "111-222-333-00000" : "REF"]);
    }
    await as(OWNER, `select public.complete_registration_case($1)`, [caseId]);
  }

  const dues = (client: string) =>
    db.query(`select description, amount from public.client_dues where client_id = $1 order by description`, [client]).then((r) => r.rows);
  const tasks = (client: string) =>
    db.query(`select title, job_code from public.staff_tasks where client_id = $1 order by title`, [client]).then((r) => r.rows);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, STAFF, OTHER_STAFF, CLIENT_USER, OTHER_CLIENT_USER]);
    brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Other', 'staff')`,
      [OWNER, STAFF, OTHER_STAFF, brand],
    );
    // The active fee schedule's ad hoc jobs; the certificate is quoted per job (no price).
    const sid = (await db.query(`insert into public.fee_schedules (brand_id, name, effective_from) values ($1, 'Jobs', '2026-01-01') returning id`, [brand])).rows[0].id;
    await db.query(
      `insert into public.fee_items (schedule_id, code, component, label, band_label, billing, price) values
         ($1, 'I.orus', 'I', 'ORUS and BIR registration updates', null, 'one_time', 1500),
         ($1, 'I.business_permit', 'I', 'Business permit (Iloilo City)', null, 'one_time', 3000),
         ($1, 'I.sec', 'I', 'SEC filings', 'GIS, AFS submission', 'one_time', 5000),
         ($1, 'I.sec_amendment', 'I', 'SEC amendment', null, 'one_time', 15000),
         ($1, 'I.certificate', 'I', 'BIR certificate or clearance', 'e.g. tax clearance', 'one_time', null),
         ($1, 'I.sss_registration', 'I', 'SSS registration', 'Employer', 'one_time', 1000),
         ($1, 'I.philhealth_registration', 'I', 'PhilHealth registration', 'Employer', 'one_time', 1100),
         ($1, 'I.pagibig_registration', 'I', 'Pag-IBIG (HDMF) registration', 'Employer', 'one_time', 1200)`,
      [sid],
    );
    await db.query(`update public.fee_schedules set status = 'active' where id = $1`, [sid]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  /* ------------------------------------------------------------- New kinds */

  it("opens SEC filings for a corporation, once per year, and never for a sole proprietor", async () => {
    const corp = await activeClient("Filing Corp");
    const steps = secFilingStepsFor("corporation", { gis: true, afs: true });
    await expect(openCase(corp, "sec_filing", {}, steps)).rejects.toThrow(/Choose the year/);
    const k = await openCase(corp, "sec_filing", { period_year: 2027 }, steps);
    expect(k).toMatchObject({ kind: "sec_filing", period_year: 2027, lgu_served: false, employer: false });
    await expect(openCase(corp, "sec_filing", { period_year: 2027 }, steps)).rejects.toThrow(/registration_cases_open_idx|registration_cases_sec_filing_idx/);
    const solo = await activeClient("Solo Store", "individual");
    await expect(openCase(solo, "sec_filing", { period_year: 2027 }, steps)).rejects.toThrow(/partnerships and corporations/);
  });

  it("opens several certificates at once, each naming the certificate", async () => {
    const client = await activeClient("Bidding Corp");
    await expect(openCase(client, "certificate", { certificate: " " }, certificateStepsFor("tax_clearance"))).rejects.toThrow(/Choose the certificate/);
    const a = await openCase(client, "certificate", { certificate: "tax_clearance", purpose: "Provincial bidding" }, certificateStepsFor("tax_clearance"));
    expect(a.details).toEqual({ certificate: "tax_clearance", purpose: "Provincial bidding" });
    const b = await openCase(client, "certificate", { certificate: "cor_replacement" }, certificateStepsFor("cor_replacement"));
    expect(b.details).toEqual({ certificate: "cor_replacement" });
  });

  it("refuses SEC amendments for a sole proprietor", async () => {
    const solo = await activeClient("Solo Amend", "individual");
    await expect(openCase(solo, "bir_update", { effective_date: "2027-03-01", changes: ["directors"] }, updateStepsFor("individual", ["address"], { lguServed: true, employer: false })))
      .rejects.toThrow(/no SEC amendments/);
  });

  /* --------------------------------------------------------------- Billing */

  it("bills SEC filings as SEC filings, an SEC-only amendment as the SEC amendment, a name change as ORUS and the SEC amendment", async () => {
    const client = await activeClient("Amend Corp");
    const filing = await openCase(client, "sec_filing", { period_year: 2027 }, secFilingStepsFor("corporation", { gis: true, afs: false }));
    await finishAndComplete(filing.id);
    expect(await dues(client)).toEqual([{ description: "SEC filings (GIS, AFS submission)", amount: "5000.00" }]);

    const directors = await openCase(client, "bir_update", { effective_date: "2027-03-01", changes: ["directors"] }, updateStepsFor("corporation", ["directors"], { lguServed: true, employer: false }));
    expect((await db.query(`select count(*)::int as n from public.registration_steps where case_id = $1 and code = 'bir_1905'`, [directors.id])).rows[0].n).toBe(0);
    await finishAndComplete(directors.id);
    expect(await dues(client)).toEqual([
      { description: "SEC amendment", amount: "15000.00" },
      { description: "SEC filings (GIS, AFS submission)", amount: "5000.00" },
    ]);

    const other = await activeClient("Rename Corp");
    const rename = await openCase(other, "bir_update", { effective_date: "2027-03-01", changes: ["name"] }, updateStepsFor("corporation", ["name"], { lguServed: true, employer: false }));
    await finishAndComplete(rename.id);
    expect(await dues(other)).toEqual([
      { description: "ORUS and BIR registration updates", amount: "1500.00" },
      { description: "SEC amendment", amount: "15000.00" },
    ]);
  });

  it("bills the permit renewal only where the firm handles the permits", async () => {
    const served = await activeClient("Served Corp");
    const a = await openCase(served, "renewal", { period_year: 2027, lgu_served: true, lgu: "Iloilo City" }, renewalStepsFor("corporation", { lguServed: true, dtiDue: false }));
    await finishAndComplete(a.id);
    expect(await dues(served)).toEqual([{ description: "Business permit (Iloilo City)", amount: "3000.00" }]);

    const own = await activeClient("Own Permits Corp");
    const b = await openCase(own, "renewal", { period_year: 2027, lgu_served: false }, renewalStepsFor("corporation", { lguServed: false, dtiDue: false }));
    await finishAndComplete(b.id);
    expect(await dues(own)).toEqual([]);
    expect(await tasks(own)).toEqual([]);
  });

  it("handles permits only for Iloilo City clients, and bills a new business's first permit there", async () => {
    // Another city is refused while the firm handles the permits; unticked it is fine.
    const oton = await activeClient("Oton Corp");
    await expect(openCase(oton, "renewal", { period_year: 2027, lgu_served: true, lgu: "Oton" }, renewalStepsFor("corporation", { lguServed: true, dtiDue: false })))
      .rejects.toThrow(/only for Iloilo City clients/);
    const own = await openCase(oton, "renewal", { period_year: 2027, lgu_served: false, lgu: "Oton" }, renewalStepsFor("corporation", { lguServed: false, dtiDue: false }));
    expect(own.lgu_served).toBe(false);

    // A renewal without a city takes the client's city from its latest case.
    const jaro = await activeClient("Jaro Corp");
    const first = await openCase(jaro, "branch", { branch_name: "Jaro branch", lgu: "Jaro, Iloilo City", lgu_served: true }, branchStepsFor("corporation", { lguServed: true }));
    await finishAndComplete(first.id);
    const renewal = await openCase(jaro, "renewal", { period_year: 2028, lgu_served: true }, renewalStepsFor("corporation", { lguServed: true, dtiDue: false }));
    expect((await db.query(`select lgu from public.registration_cases where id = $1`, [renewal.id])).rows[0].lgu).toBe("Jaro, Iloilo City");
    await finishAndComplete(renewal.id);
    expect(await dues(jaro)).toEqual([
      { description: "Business permit (Iloilo City)", amount: "3000.00" },
      { description: "ORUS and BIR registration updates", amount: "1500.00" },
    ]);

    // A new business in Iloilo City whose permit we handle bills the permit with the registration.
    const fresh = await activeClient("Fresh Corp");
    const jobs = async (lgu: string | null, served: boolean) => {
      const id = (await db.query(`insert into public.registration_cases (client_id, kind, lgu_served, employer, lgu) values ($1, 'new_business', $2, false, $3) returning id`, [fresh, served, lgu])).rows[0].id;
      const codes = (await db.query(`select private.registration_fee_jobs(c) as codes from public.registration_cases c where id = $1`, [id])).rows[0].codes;
      await db.query(`delete from public.registration_cases where id = $1`, [id]);
      return codes;
    };
    expect(await jobs("Iloilo City", true)).toEqual(["I.registration_non_individual", "I.business_permit"]);
    expect(await jobs("Iloilo City", false)).toEqual(["I.registration_non_individual"]);
  });

  it("bills employer registration per agency registered", async () => {
    const client = await activeClient("Hiring Corp");
    const k = await openCase(client, "employer", {}, employerStepsFor({ sss: true, philhealth: false, pagibig: true }));
    expect(k.employer).toBe(true);
    await finishAndComplete(k.id);
    expect(await dues(client)).toEqual([
      { description: "Pag-IBIG (HDMF) registration (Employer)", amount: "1200.00" },
      { description: "SSS registration (Employer)", amount: "1000.00" },
    ]);
  });

  it("puts the employer numbers from the steps on the client when the case is completed", async () => {
    const client = await activeClient("Numbers Corp");
    // PhilHealth is already on the client: it is kept.
    await db.query(`insert into public.client_employer_numbers (client_id, agency, employer_number, start_month) values ($1, 'philhealth', '11-000000001-1', '2026-01-01')`, [client]);
    const k = await openCase(client, "employer", {}, employerStepsFor({ sss: true, philhealth: true, pagibig: true }));
    const steps = (await db.query(`select id, code from public.registration_steps where case_id = $1 and status <> 'not_applicable'`, [k.id])).rows;
    const number: Record<string, string> = { sss_employer: "03-1234567-8", philhealth_employer: "11-999999999-9", pagibig_employer: "2010-1234-5678" };
    for (const r of steps) {
      // The SSS step is done without its number first.
      const ref = r.code === "sss_employer" ? null : (number[r.code] ?? "REF");
      await as(STAFF, `select public.update_registration_step($1, 'done', $2, '2027-03-15', null, null)`, [r.id, ref]);
    }
    await expect(as(OWNER, `select public.complete_registration_case($1)`, [k.id])).rejects.toThrow(/Enter the SSS employer no\./);
    const sss = steps.find((r) => r.code === "sss_employer")!.id;
    await as(STAFF, `select public.update_registration_step($1, 'done', $2, '2027-03-15', null, null)`, [sss, " 03-1234567-8 "]);
    await as(OWNER, `select public.complete_registration_case($1)`, [k.id]);
    const rows = (await db.query(`select agency, employer_number, start_month::text from public.client_employer_numbers where client_id = $1 order by agency`, [client])).rows;
    expect(rows).toEqual([
      { agency: "pagibig", employer_number: "2010-1234-5678", start_month: "2027-03-01" },
      { agency: "philhealth", employer_number: "11-000000001-1", start_month: "2026-01-01" },
      { agency: "sss", employer_number: "03-1234567-8", start_month: "2027-03-01" },
    ]);
  });

  it("gives the Owner a task to price a certificate the schedule quotes per job", async () => {
    const client = await activeClient("Clearance Corp");
    const k = await openCase(client, "certificate", { certificate: "tax_clearance" }, certificateStepsFor("tax_clearance"));
    await finishAndComplete(k.id);
    expect(await dues(client)).toEqual([]);
    expect(await tasks(client)).toEqual([{ title: "Price and bill: BIR certificate or clearance (e.g. tax clearance) (BIR certificate)", job_code: "I.certificate" }]);
  });

  it("bills what feeJobsFor says for each kind", async () => {
    const cases: [CaseKind, "individual" | "corporation", object, PlannedStep[]][] = [
      ["renewal", "corporation", { period_year: 2029, lgu_served: true, lgu: "Iloilo City" }, renewalStepsFor("corporation", { lguServed: true, dtiDue: false }).map((s) => (s.code === "mayors_permit" ? { ...s, status: "not_applicable" as const } : s))],
      ["bir_update", "corporation", { effective_date: "2027-03-01", changes: ["capital_increase", "fiscal_year"] }, updateStepsFor("corporation", ["capital_increase", "fiscal_year"], { lguServed: true, employer: false })],
      ["employer", "individual", {}, employerStepsFor({ sss: true, philhealth: true, pagibig: true })],
    ];
    for (const [kind, type, data, steps] of cases) {
      const client = await activeClient(`Mirror ${kind}`, type);
      const k = await openCase(client, kind, data, steps);
      const row = (await db.query(`select private.registration_fee_jobs(c) as codes, c.lgu_served, c.lgu, c.employer, c.details from public.registration_cases c where id = $1`, [k.id])).rows[0];
      const expected = feeJobsFor(kind, type, {
        lguServed: row.lgu_served,
        lgu: row.lgu,
        employer: row.employer,
        changes: row.details.changes,
        notNeeded: steps.filter((s) => s.status === "not_applicable").map((s) => s.code),
      });
      expect(row.codes).toEqual(expected);
    }
  });

  /* ----------------------------------------------------------- Proof files */

  it("lets staff on the client attach proof to a step; the client sees it, nobody else", async () => {
    const client = await activeClient("Proof Corp");
    const otherClient = await activeClient("Other Corp");
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Ana'), ($3, $4, 'Ben')`, [CLIENT_USER, client, OTHER_CLIENT_USER, otherClient]);
    const k = await openCase(client, "certificate", { certificate: "tax_clearance" }, certificateStepsFor("tax_clearance"));
    const step = (await db.query(`select id from public.registration_steps where case_id = $1 and code = 'bir_release'`, [k.id])).rows[0].id;
    const p1 = `${client}/${k.id}/a.pdf`;
    const p2 = `${client}/${k.id}/b.jpg`;

    // Uploading: staff on the client may write to the case's folder; others may not.
    await as(STAFF, `insert into storage.objects (bucket_id, name) values ('registration-files', $1)`, [p1]);
    await expect(as(OTHER_STAFF, `insert into storage.objects (bucket_id, name) values ('registration-files', $1)`, [`${client}/${k.id}/x.pdf`])).rejects.toThrow(/row-level security/);
    await expect(as(CLIENT_USER, `insert into storage.objects (bucket_id, name) values ('registration-files', $1)`, [`${client}/${k.id}/y.pdf`])).rejects.toThrow(/row-level security/);
    await db.query(`insert into storage.objects (bucket_id, name) values ('registration-files', $1)`, [p2]);

    const add = (user: string, p: string, mime = "application/pdf", name = "receipt.pdf") =>
      as<{ id: string }>(user, `select public.add_registration_step_file($1, $2, $3, $4, 1234) as id`, [step, p, name, mime]).then((r) => r[0].id);
    await expect(add(OTHER_STAFF, p1)).rejects.toThrow(/Only staff on this client/);
    await expect(add(CLIENT_USER, p1)).rejects.toThrow(/Only staff on this client/);
    await expect(add(STAFF, `${otherClient}/${k.id}/a.pdf`)).rejects.toThrow(/case's folder/);
    await expect(add(STAFF, `${client}/${k.id}/missing.pdf`)).rejects.toThrow(/not been uploaded/);
    await expect(add(STAFF, p1, "text/plain")).rejects.toThrow(/PDF or a photo/);
    const f1 = await add(STAFF, p1);
    const f2 = await add(OWNER, p2, "image/jpeg", "certificate.jpg");

    const names = (user: string) => as<{ file_name: string }>(user, `select file_name from public.registration_step_files order by file_name`).then((r) => r.map((x) => x.file_name));
    expect(await names(STAFF)).toEqual(["certificate.jpg", "receipt.pdf"]);
    expect(await names(CLIENT_USER)).toEqual(["certificate.jpg", "receipt.pdf"]);
    expect(await names(OTHER_STAFF)).toEqual([]);
    expect(await names(OTHER_CLIENT_USER)).toEqual([]);
    // The stored object follows the row.
    expect((await as(CLIENT_USER, `select name from storage.objects where bucket_id = 'registration-files' order by name`)).length).toBe(2);
    expect(await as(OTHER_CLIENT_USER, `select name from storage.objects where bucket_id = 'registration-files'`)).toEqual([]);

    // Taking a file off: staff on the client while the case is open.
    await expect(as(CLIENT_USER, `select public.remove_registration_step_file($1)`, [f1])).rejects.toThrow(/Only staff on this client/);
    await as(STAFF, `select public.remove_registration_step_file($1)`, [f1]);
    expect(await names(CLIENT_USER)).toEqual(["certificate.jpg"]);

    // Once completed, proof can still be added but not taken off; a cancelled case takes none.
    await finishAndComplete(k.id);
    await db.query(`insert into storage.objects (bucket_id, name) values ('registration-files', $1)`, [`${client}/${k.id}/c.pdf`]);
    await add(STAFF, `${client}/${k.id}/c.pdf`);
    await expect(as(STAFF, `select public.remove_registration_step_file($1)`, [f2])).rejects.toThrow(/case is closed/);
    const cancelled = await openCase(client, "certificate", { certificate: "other" }, certificateStepsFor("other"));
    await as(OWNER, `select public.cancel_registration_case($1, 'Not needed')`, [cancelled.id]);
    const cStep = (await db.query(`select id from public.registration_steps where case_id = $1 limit 1`, [cancelled.id])).rows[0].id;
    await db.query(`insert into storage.objects (bucket_id, name) values ('registration-files', $1)`, [`${client}/${cancelled.id}/d.pdf`]);
    await expect(as(STAFF, `select public.add_registration_step_file($1, $2, 'd.pdf', 'application/pdf', 10)`, [cStep, `${client}/${cancelled.id}/d.pdf`])).rejects.toThrow(/cancelled/);
  });
});
