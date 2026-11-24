/**
 * Requests & tickets database tests (migration 20261124000014_client_requests.sql):
 * staff ask a client for something (optionally on a registration step, which then
 * waits on the client); clients open tickets; either side replies with a message
 * or a file; the client's reply puts the step back with the firm.
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
const DB_NAME = "client_requests_test";

const OWNER = "00000000-0000-0000-0000-000000000081";
const STAFF = "00000000-0000-0000-0000-000000000082";
const OTHER_STAFF = "00000000-0000-0000-0000-000000000083";
const CLIENT_USER = "00000000-0000-0000-0000-000000000084";
const OTHER_CLIENT_USER = "00000000-0000-0000-0000-000000000085";

describe.skipIf(!url)("client requests and tickets", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let other: string;
  let caseId: string;

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
  const request = (user: string, subject: string, step: string | null = null, clientId = client) =>
    as(user, `select * from public.create_client_request($1, $2, 'Please send them', '2027-03-01', $3)`, [clientId, subject, step]).then((r) => r.rows[0] as { id: string; status: string; direction: string });
  const reply = (user: string, id: string, body: string | null, filePath: string | null = null) =>
    as(user, `select * from public.reply_client_request($1, $2, $3, 'id.pdf', 'application/pdf')`, [id, body, filePath]).then((r) => r.rows[0]);
  const statusOf = (id: string) => db.query(`select status from public.client_requests where id = $1`, [id]).then((r) => r.rows[0].status as string);
  const stepStatus = (code: string) => db.query(`select status from public.registration_steps where case_id = $1 and code = $2`, [caseId, code]).then((r) => r.rows[0].status as string);
  const stepId = (code: string) => db.query(`select id from public.registration_steps where case_id = $1 and code = $2`, [caseId, code]).then((r) => r.rows[0].id as string);

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
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Other', 'staff')`,
      [OWNER, STAFF, OTHER_STAFF, brand],
    );
    const k = (await as(OWNER, `select * from public.open_registration_case($1, $2, $3)`, [
      JSON.stringify({ brand_id: brand, name: "Bagong Tindahan", taxpayer_type: "individual" }),
      JSON.stringify({ lgu_served: true, employer: false }),
      JSON.stringify(stepsPayload(stepsFor("individual", { lguServed: true, employer: false }))),
    ])).rows[0];
    caseId = k.id;
    client = k.client_id;
    other = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9801', 'Other Co', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Juan'), ($3, $4, 'Other user')`, [CLIENT_USER, client, OTHER_CLIENT_USER, other]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lets staff on the client ask; asking on a step puts it on Waiting on client", async () => {
    await expect(request(OTHER_STAFF, "IDs")).rejects.toThrow(/Only staff on this client/);
    await expect(request(CLIENT_USER, "IDs")).rejects.toThrow(/Only staff on this client/);
    await expect(request(OWNER, "IDs", await stepId("dti_business_name"), other)).rejects.toThrow(/not this client's/);
    const r = await request(STAFF, "Two valid IDs and proof of address", await stepId("dti_business_name"));
    expect(r).toMatchObject({ status: "open", direction: "to_client" });
    expect(await stepStatus("dti_business_name")).toBe("waiting_client");
    const msgs = (await db.query(`select from_firm, body from public.client_request_messages where request_id = $1`, [r.id])).rows;
    expect(msgs).toEqual([{ from_firm: true, body: "Please send them" }]);
  });

  it("takes the client's reply with a file in the request's folder; the step goes back to the firm", async () => {
    const r = await request(STAFF, "Lease contract", await stepId("barangay_clearance"));
    expect(await stepStatus("barangay_clearance")).toBe("waiting_client");
    await expect(reply(CLIENT_USER, r.id, null)).rejects.toThrow(/message or attach a file/);
    await expect(reply(CLIENT_USER, r.id, null, `${client}/${r.id}/lease.pdf`)).rejects.toThrow(/not been uploaded/);
    await expect(reply(CLIENT_USER, r.id, null, `${other}/${r.id}/lease.pdf`)).rejects.toThrow(/not in this request's folder/);
    await db.query(`insert into storage.objects (bucket_id, name) values ('requests', $1)`, [`${client}/${r.id}/lease.pdf`]);
    const m = await reply(CLIENT_USER, r.id, "Here it is", `${client}/${r.id}/lease.pdf`);
    expect(m).toMatchObject({ from_firm: false, file_name: "id.pdf" });
    expect(await statusOf(r.id)).toBe("answered");
    expect(await stepStatus("barangay_clearance")).toBe("in_progress");
    // The firm writes back: the request waits on the client again.
    await reply(STAFF, r.id, "The second page is missing");
    expect(await statusOf(r.id)).toBe("open");
    await expect(reply(OTHER_CLIENT_USER, r.id, "hi")).rejects.toThrow(/cannot reply/);
  });

  it("lets the client open a ticket and close it; staff answer it", async () => {
    await expect(as(STAFF, `select public.open_client_ticket($1, 'Q', 'body')`, [client])).rejects.toThrow(/client's own users/);
    await expect(as(OTHER_CLIENT_USER, `select public.open_client_ticket($1, 'Q', 'body')`, [client])).rejects.toThrow(/client's own users/);
    const t = (await as(CLIENT_USER, `select * from public.open_client_ticket($1, 'When is my COR ready?', 'Just checking')`, [client])).rows[0];
    expect(t).toMatchObject({ direction: "from_client", status: "open" });
    await reply(STAFF, t.id, "This week");
    expect(await statusOf(t.id)).toBe("answered");
    await as(CLIENT_USER, `select public.close_client_request($1)`, [t.id]);
    expect(await statusOf(t.id)).toBe("closed");
    await expect(reply(CLIENT_USER, t.id, "one more")).rejects.toThrow(/closed/);
  });

  it("does not let a client close the firm's request, and shows each client only its own", async () => {
    const r = await request(STAFF, "Bank statements");
    await expect(as(CLIENT_USER, `select public.close_client_request($1)`, [r.id])).rejects.toThrow(/cannot close/);
    await as(STAFF, `select public.close_client_request($1)`, [r.id]);
    expect(await statusOf(r.id)).toBe("closed");
    const seen = (user: string) => as(user, `select count(*)::int as n from public.client_requests`).then((x) => x.rows[0].n);
    expect(await seen(CLIENT_USER)).toBeGreaterThan(0);
    expect(await seen(OTHER_CLIENT_USER)).toBe(0);
    expect(await seen(OTHER_STAFF)).toBe(0);
  });
});
