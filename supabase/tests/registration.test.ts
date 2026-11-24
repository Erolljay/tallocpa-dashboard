/**
 * Phase 1C slice 1 database tests (migration 20261124000010_business_registration.sql):
 * the Owner opens a registration case (client, engagement, steps); staff on the
 * client move steps along; the Owner completes it once the COR is on the client.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { stepsFor, stepsPayload } from "../../src/lib/registration/steps";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "registration_test";

const OWNER = "00000000-0000-0000-0000-000000000071";
const STAFF = "00000000-0000-0000-0000-000000000072";
const OTHER_STAFF = "00000000-0000-0000-0000-000000000073";
const CLIENT_USER = "00000000-0000-0000-0000-000000000074";

describe.skipIf(!url)("business registration", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let brand: string;

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

  const open = (user: string, name: string, type: "individual" | "corporation" = "corporation", options = { lguServed: true, employer: false }) =>
    as(user, `select * from public.open_registration_case($1, $2, $3)`, [
      JSON.stringify({ brand_id: brand, name, taxpayer_type: type, registered_address: "Iloilo City" }),
      JSON.stringify({ lgu_served: options.lguServed, employer: options.employer, lgu: "Iloilo City", start_date: "2027-02-01" }),
      JSON.stringify(stepsPayload(stepsFor(type, options))),
    ]).then((r) => r.rows[0] as { id: string; client_id: string; status: string });

  const step = (caseId: string, code: string) =>
    db.query(`select id from public.registration_steps where case_id = $1 and code = $2`, [caseId, code]).then((r) => r.rows[0].id as string);

  const update = (user: string, stepId: string, status: string, ref: string | null = null, doneOn: string | null = null, fee: number | null = null) =>
    as(user, `select * from public.update_registration_step($1, $2, $3, $4, $5, null)`, [stepId, status, ref, doneOn, fee]).then((r) => r.rows[0]);

  async function finishAll(caseId: string, tin = "123-456-789-00000") {
    const { rows } = await db.query(`select id, code from public.registration_steps where case_id = $1 and status <> 'not_applicable'`, [caseId]);
    for (const r of rows) await update(STAFF, r.id, "done", r.code === "bir_cor" ? tin : "REF", "2027-02-15");
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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, STAFF, OTHER_STAFF, CLIENT_USER]);
    brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Other', 'staff')`,
      [OWNER, STAFF, OTHER_STAFF, brand],
    );
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("only the Owner opens a case; it creates the client, the engagement and the steps", async () => {
    await expect(open(STAFF, "Not Allowed Corp")).rejects.toThrow(/Only the Owner opens/);
    const k = await open(OWNER, "Bagong Negosyo Corp");
    expect(k.status).toBe("open");
    const c = (await db.query(`select status, tin, taxpayer_type, branch_id from public.clients where id = $1`, [k.client_id])).rows[0];
    expect(c).toMatchObject({ status: "onboarding", tin: null, taxpayer_type: "corporation" });
    expect(c.branch_id).not.toBeNull();
    const e = (await db.query(`select service_line, status, start_date::text from public.engagements where client_id = $1`, [k.client_id])).rows;
    expect(e).toEqual([{ service_line: "business_registration", status: "active", start_date: "2027-02-01" }]);
    const steps = (await db.query(`select code, status from public.registration_steps where case_id = $1 order by sort_order`, [k.id])).rows;
    expect(steps[0]).toEqual({ code: "sec_name", status: "pending" });
    expect(steps.find((s) => s.code === "sss_employer")?.status).toBe("not_applicable");
  });

  it("refuses an empty checklist and steps that start already done", async () => {
    const bad = (steps: unknown) =>
      as(OWNER, `select public.open_registration_case($1, '{}', $2)`, [JSON.stringify({ brand_id: brand, name: "X Corp", taxpayer_type: "corporation" }), JSON.stringify(steps)]);
    await expect(bad([])).rejects.toThrow(/steps are missing/);
    await expect(bad([{ code: "x", agency: "bir", label: "x", reference_label: "x", sort_order: 1, status: "done" }])).rejects.toThrow(/pending or not needed/);
  });

  it("lets assigned staff, not others, update steps; done needs a date and the COR needs a TIN", async () => {
    const k = await open(OWNER, "Tindahan ni Juan", "individual");
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [k.client_id, STAFF]);
    const dti = await step(k.id, "dti_business_name");
    await expect(update(OTHER_STAFF, dti, "in_progress")).rejects.toThrow(/Only staff on this client/);
    await expect(update(STAFF, dti, "done", "BN-1")).rejects.toThrow(/date this step was done/);
    const s = await update(STAFF, dti, "done", "BN-1", "2027-02-03", 500);
    expect(s).toMatchObject({ status: "done", reference_no: "BN-1", government_fee: "500.00" });
    // Moving a step back off done clears the date.
    expect((await update(STAFF, dti, "waiting_agency", "BN-1", "2027-02-03")).done_on).toBeNull();
    const cor = await step(k.id, "bir_cor");
    await expect(update(STAFF, cor, "done", "not a tin", "2027-02-10")).rejects.toThrow(/TIN on the COR/);
    expect((await update(STAFF, cor, "done", "123-456-789-00000", "2027-02-10")).status).toBe("done");
  });

  it("shows the case to the client's users and staff on the client only", async () => {
    const k = await open(OWNER, "Kapehan Inc");
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Kapehan')`, [CLIENT_USER, k.client_id]);
    const seen = (user: string) => as(user, `select count(*)::int as n from public.registration_steps s join public.registration_cases c on c.id = s.case_id where c.id = $1`, [k.id]).then((r) => r.rows[0].n);
    expect(await seen(CLIENT_USER)).toBeGreaterThan(0);
    expect(await seen(OTHER_STAFF)).toBe(0);
    await expect(as(STAFF, `update public.registration_steps set status = 'done' where case_id = $1`, [k.id]).then((r) => r.rowCount)).resolves.toBe(0);
  });

  it("completes only when every step is finished and the COR is entered on the client", async () => {
    const k = await open(OWNER, "Sari-sari Corp");
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [k.client_id, STAFF]);
    const complete = (user = OWNER) => as(user, `select * from public.complete_registration_case($1)`, [k.id]).then((r) => r.rows[0]);
    await expect(complete()).rejects.toThrow(/not finished/);
    await finishAll(k.id);
    await expect(complete(STAFF)).rejects.toThrow(/Only the Owner completes/);
    await expect(complete()).rejects.toThrow(/Enter the COR on the client first/);

    // The Owner enters the COR on the client (as the Edit form does), with the wrong TIN first.
    const enterCor = (tin: string) =>
      as(OWNER, `update public.clients set tin = $2 where id = $1`, [k.client_id, tin]).then(() =>
        as(OWNER, `insert into public.client_registrations (client_id, registration_date, tax_types) values ($1, '2027-02-10', '["income_tax"]')`, [k.client_id]));
    await enterCor("999-999-999-00000");
    await expect(complete()).rejects.toThrow(/does not match the COR/);
    await as(OWNER, `update public.clients set tin = '123-456-789-000' where id = $1`, [k.client_id]);
    expect((await complete()).status).toBe("completed");
    expect((await db.query(`select status from public.clients where id = $1`, [k.client_id])).rows[0].status).toBe("active");
    expect((await db.query(`select status from public.engagements where client_id = $1`, [k.client_id])).rows[0].status).toBe("ended");
    await expect(complete()).rejects.toThrow(/already closed/);
    await expect(update(STAFF, await step(k.id, "sec_name"), "pending")).rejects.toThrow(/closed/);
  });

  it("lets the Owner cancel with a reason, and open a new case for the same client after", async () => {
    const k = await open(OWNER, "Hindi Tuloy Corp");
    await expect(as(OWNER, `select public.cancel_registration_case($1, ' ')`, [k.id])).rejects.toThrow(/reason/);
    await expect(as(STAFF, `select public.cancel_registration_case($1, 'x')`, [k.id])).rejects.toThrow(/Only the Owner cancels/);
    const r = (await as(OWNER, `select * from public.cancel_registration_case($1, 'Client changed plans')`, [k.id])).rows[0];
    expect(r).toMatchObject({ status: "cancelled", cancel_reason: "Client changed plans" });
    expect((await db.query(`select status from public.engagements where client_id = $1`, [k.client_id])).rows[0].status).toBe("ended");
    // A second open case for one client is refused; after cancelling, another may be opened.
    await db.query(`insert into public.registration_cases (client_id, lgu_served, employer) values ($1, true, false)`, [k.client_id]);
    await expect(db.query(`insert into public.registration_cases (client_id, lgu_served, employer) values ($1, true, false)`, [k.client_id])).rejects.toThrow(/registration_cases_open_idx/);
  });

  it("lists Business Registration as an available service line", async () => {
    const { rows } = await db.query(`select code, available from public.service_lines order by sort_order limit 4`);
    expect(rows).toEqual([
      { code: "tax_compliance", available: true },
      { code: "bookkeeping", available: true },
      { code: "business_registration", available: true },
      { code: "bir_loa", available: false },
    ]);
  });
});
