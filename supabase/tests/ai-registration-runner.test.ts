/**
 * The Registration Runner's tools (migration 20270110000002, src/lib/registration/ai-tools.ts;
 * docs/AI-WORKFORCE.md step 6), end to end through the connector handler:
 *
 *   - its tools are listed only once granted;
 *   - it sees only its clients' open cases, with where each file is and for how long;
 *   - one case: steps, the names of the files on hand (never where they are stored),
 *     the requests already sent, the BIR form the case files;
 *   - the BIR form is filled only from what the app holds and saved as a draft on the
 *     case for staff on the client; refused for a case that files no form;
 *   - requests to the client are a draft too: only for steps still needed, never a
 *     duplicate of an open request; staff send them as themselves;
 *   - another AI employee, or the Runner switched off, reads nothing;
 *   - it still cannot move a step, send a request or read the tables directly.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hashKey, newKey } from "../../src/lib/ai/credentials";
import { asAi, handleMcp } from "../../src/lib/mcp/handler";
import type { Connector } from "../../src/lib/mcp/types";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "ai_registration_runner_test";

const OWNER = "00000000-0000-0000-0000-00000000b201";
const PREPARER = "00000000-0000-0000-0000-00000000b202";
const CLIENT_USER = "00000000-0000-0000-0000-00000000b203";
const RUNNER = "00000000-0000-0000-0000-00000000b2a1";
const CLERK = "00000000-0000-0000-0000-00000000b2a2";
// 2026-02-05 10:00 in Manila.
const NOW = new Date("2026-02-05T02:00:00Z");

describe.skipIf(!url)("AI Registration Runner: open cases, days held, BIR form and client requests as drafts", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let conn: Connector;
  let jaro: string;
  let molo: string;
  const kase: Record<string, string> = {};
  const step: Record<string, string> = {};
  const key = newKey();
  let id = 0;

  type Reply = { result?: { isError?: boolean; structuredContent?: Record<string, unknown>; content: { text: string }[] }; error?: { message: string } };
  const call = async (name: string, args: Record<string, unknown> = {}) =>
    (await handleMcp(conn, { aiKey: "registration_runner", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/call", params: { name, arguments: args } }, now: NOW })).json as Reply;
  const refusal = async (name: string, args: Record<string, unknown>) => {
    const r = await call(name, args);
    expect(r.result?.isError, JSON.stringify(args)).toBe(true);
    return r.result!.content[0].text;
  };
  async function as<T>(user: string, sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r as unknown as { rows: T[] };
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  async function addCase(client: string, kind: string, steps: [string, string, string, string | null, string | null][], extra: { period_year?: number; opened_at?: string } = {}) {
    const k = (await db.query(
      `insert into public.registration_cases (client_id, kind, period_year, lgu_served, employer, lgu, opened_at) values ($1, $2, $3, true, false, 'Iloilo City', $4) returning id`,
      [client, kind, extra.period_year ?? null, extra.opened_at ?? "2026-01-01T00:00:00Z"],
    )).rows[0].id as string;
    let n = 0;
    for (const [code, agency, status, done, ref] of steps) {
      const s = (await db.query(
        `insert into public.registration_steps (case_id, code, agency, label, reference_label, sort_order, status, done_on, reference_no, status_changed_at)
         values ($1, $2, $3, $4, 'Reference', $5, $6, $7, $8, '2026-01-05T00:00:00Z') returning id`,
        [k, code, agency, `Label ${code}`, ++n, status, done, ref],
      )).rows[0].id as string;
      step[`${kind}:${code}`] = s;
    }
    return k;
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
    conn = { connect: async () => ({ query: (sql: string, params?: unknown[]) => db.query(sql, params), release: () => undefined }) } as unknown as Connector;

    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, PREPARER, CLIENT_USER, RUNNER, CLERK]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Preparer', 'staff')`, [OWNER, PREPARER, brand]);
    jaro = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, status, registered_address) values ($1, 'TC-9921', 'Jaro Bakeshop', 'individual', 'firm_remits', 'onboarding', '12 Lopez Jaena St., Jaro, Iloilo City') returning id`, [brand])).rows[0].id;
    molo = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, status) values ($1, 'TC-9922', 'Molo Foods Inc.', 'corporation', 'firm_remits', 'onboarding') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [jaro, PREPARER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Jaro owner')`, [CLIENT_USER, jaro]);

    kase.jaro = await addCase(jaro, "new_business", [
      ["dti_business_name", "dti", "done", "2026-01-05", "BN-1234567"],
      ["barangay_clearance", "barangay", "waiting_client", null, null],
      ["mayors_permit", "lgu", "pending", null, null],
      ["bir_registration", "bir", "pending", null, null],
      ["sss_employer", "sss", "not_applicable", null, null],
    ]);
    kase.renewal = await addCase(jaro, "renewal", [["mayors_permit", "lgu", "in_progress", null, null]], { period_year: 2026, opened_at: "2026-02-01T00:00:00Z" });
    kase.molo = await addCase(molo, "new_business", [["sec_name", "sec", "pending", null, null]]);
    await db.query(
      `insert into public.registration_step_files (step_id, case_id, client_id, file_name, mime_type, size_bytes, storage_path) values ($1, $2, $3, 'dti-certificate.pdf', 'application/pdf', 1200, $4)`,
      [step["new_business:dti_business_name"], kase.jaro, jaro, `${jaro}/${kase.jaro}/secret-path.pdf`],
    );
    await db.query(
      `insert into public.client_requests (client_id, direction, subject, registration_step_id, created_by) values ($1, 'to_client', 'Lease contract', $2, $3)`,
      [jaro, step["new_business:barangay_clearance"], PREPARER],
    );

    await db.query(`insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, enabled) values ($1, $2, 'registration_runner', 'Registration Runner', 'registration', 'cowork', true)`, [RUNNER, brand]);
    await db.query(`insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, enabled, all_clients) values ($1, $2, 'document_clerk', 'Document Clerk', 'compliance', 'cowork', true, true)`, [CLERK, brand]);
    await db.query(`insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2)`, [RUNNER, jaro]);
    await db.query(`insert into public.ai_credentials (ai_user_id, token_hash, token_hint, created_at, expires_at) values ($1, $2, right($3, 4), '2026-01-01', '2026-06-01')`, [RUNNER, hashKey(key), key]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lists its tools only once the Owner grants them", async () => {
    expect((await call("registration_cases")).error?.message).toMatch(/Unknown tool/);
    await db.query(
      `insert into public.ai_tool_grants (ai_user_id, tool) values ($1, 'registration_cases'), ($1, 'registration_case'), ($1, 'draft_bir_registration_form'), ($1, 'draft_client_requests')`,
      [RUNNER],
    );
    const r = await handleMcp(conn, { aiKey: "registration_runner", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/list" }, now: NOW });
    const tools = (r.json as { result: { tools: { name: string; annotations: { readOnlyHint: boolean } }[] } }).result.tools;
    expect(tools.map((t) => t.name).sort()).toEqual(["draft_bir_registration_form", "draft_client_requests", "registration_case", "registration_cases"]);
    expect(tools.find((t) => t.name === "draft_client_requests")?.annotations.readOnlyHint).toBe(false);
  });

  it("lists only its clients' open cases, the file held longest first, with days held and a flag", async () => {
    const r = (await call("registration_cases")).result?.structuredContent as {
      cases: { id: string; client_code: string; current: { code: string; office: string; days_held: number } | null; flag: string | null; days_open: number; waiting_on: string | null }[];
      late: number;
    };
    expect(r.cases.map((c) => c.id)).toEqual([kase.jaro, kase.renewal]);
    expect(r.cases[0]).toMatchObject({ client_code: "TC-9921", current: { code: "barangay_clearance", office: "Barangay", days_held: 31 }, flag: "late", days_open: 35, waiting_on: "client" });
    expect(r.cases[1]).toMatchObject({ current: { code: "mayors_permit", days_held: 4 }, flag: null });
    expect(r.late).toBe(1);
    expect((await call("registration_cases", { client: "TC-9922" })).result?.isError).toBe(true);
  });

  it("reads one case: steps, file names (not where they are stored), requests sent, and the form it files", async () => {
    const r = (await call("registration_case", { case_id: kase.jaro })).result?.structuredContent as Record<string, unknown>;
    const steps = r.steps as { code: string; files_on_hand: string[]; requests_to_client: { subject: string }[]; reference: string | null }[];
    expect(steps.find((s) => s.code === "dti_business_name")).toMatchObject({ files_on_hand: ["dti-certificate.pdf"], reference: "Reference: BN-1234567" });
    expect(steps.find((s) => s.code === "barangay_clearance")?.requests_to_client).toEqual([{ subject: "Lease contract", status: "open" }]);
    expect((r.still_needed as { code: string }[]).map((s) => s.code)).toEqual(["barangay_clearance", "mayors_permit", "bir_registration"]);
    expect(r.bir_forms).toEqual(["1901"]);
    expect(JSON.stringify(r)).not.toContain("secret-path");
    expect(await refusal("registration_case", { case_id: kase.molo })).toMatch(/No registration case/);
  });

  it("fills the BIR form from the app only and saves it as a draft on the case, for staff on the client", async () => {
    const r = (await call("draft_bir_registration_form", { case_id: kase.jaro, note: "Get the owner's birth date and line of business from the client." })).result?.structuredContent as {
      form: string;
      missing: string[];
    };
    expect(r.form).toBe("1901");
    expect(r.missing).toEqual(expect.arrayContaining(["TIN", "RDO code", "Date of birth", "Line of business / industry", "Mayor's permit no."]));
    const { rows } = await db.query(`select kind, client_id, subject_table, subject_id, payload->>'form' as form from public.ai_drafts`);
    expect(rows).toEqual([{ kind: "bir_registration_form", client_id: jaro, subject_table: "registration_cases", subject_id: kase.jaro, form: "1901" }]);
    const staff = await as<{ v: string }>(PREPARER, `select s->>'value' as v from public.ai_drafts, jsonb_array_elements(payload->'summary') s where s->>'label' = 'DTI business name certificate no.'`);
    expect(staff.rows).toEqual([{ v: "BN-1234567" }]);
    expect(await refusal("draft_bir_registration_form", { case_id: kase.renewal, note: "Testing a case with no form." })).toMatch(/files no BIR registration form/);
    expect(await refusal("draft_bir_registration_form", { case_id: kase.jaro, form: "1903", note: "Testing the wrong form." })).toMatch(/files Form 1901, not 1903/);
  });

  it("drafts requests to the client only for steps still needed, never repeating an open one; a newer draft replaces the earlier", async () => {
    const ask = (requests: object[]) => call("draft_client_requests", { case_id: kase.jaro, requests, note: "The barangay needs these before it releases the clearance." });
    expect((await ask([{ step_code: "mayors_permit", subject: "Barangay clearance copy", message: "Please send a photo." }])).result?.isError).toBeUndefined();
    expect((await ask([{ step_code: "mayors_permit", subject: "Barangay clearance copy" }, { step_code: "bir_registration", subject: "Owner's valid ID" }])).result?.isError).toBeUndefined();
    const { rows } = await db.query(`select status, jsonb_array_length(payload->'requests') as n from public.ai_drafts where kind = 'registration_requests' order by created_at`);
    expect(rows).toEqual([{ status: "withdrawn", n: 1 }, { status: "open", n: 2 }]);
    expect(await refusal("draft_client_requests", { case_id: kase.jaro, requests: [{ step_code: "dti_business_name", subject: "DTI copy" }], note: "Testing a finished step." })).toMatch(/done/);
    expect(await refusal("draft_client_requests", { case_id: kase.jaro, requests: [{ step_code: "barangay_clearance", subject: "lease contract" }], note: "Testing a repeated request." })).toMatch(/already has an open request/);
    expect(await refusal("draft_client_requests", { case_id: kase.jaro, requests: [{ step_code: "nope", subject: "Anything" }], note: "Testing an unknown step." })).toMatch(/No step "nope"/);
    expect(await refusal("draft_client_requests", { case_id: kase.molo, requests: [{ step_code: "sec_name", subject: "Anything" }], note: "Testing another client's case." })).toMatch(/No registration case/);
  });

  it("staff send the accepted requests as themselves; the step waits on the client", async () => {
    const draft = (await db.query(`select id from public.ai_drafts where kind = 'registration_requests' and status = 'open'`)).rows[0].id;
    await as(PREPARER, `select public.create_client_request($1, 'Owner''s valid ID', '', null, $2)`, [jaro, step["new_business:bir_registration"]]);
    await as(PREPARER, `select public.decide_ai_draft($1, true, 'Sent 1')`, [draft]);
    expect((await db.query(`select status from public.registration_steps where id = $1`, [step["new_business:bir_registration"]])).rows[0].status).toBe("waiting_client");
    expect((await db.query(`select created_by from public.client_requests where subject = 'Owner''s valid ID'`)).rows[0].created_by).toBe(PREPARER);
  });

  it("another AI employee, or the Runner switched off, reads no cases", async () => {
    await expect(asAi(conn, CLERK, true, (q) => q.query(`select public.ai_registration_cases()`))).rejects.toThrow(/Only the switched-on Registration Runner/);
    await expect(asAi(conn, CLERK, true, (q) => q.query(`select public.ai_registration_case($1)`, [kase.jaro]))).rejects.toThrow(/Only the switched-on Registration Runner/);
    await db.query(`update public.ai_employees set enabled = false where user_id = $1`, [RUNNER]);
    await expect(asAi(conn, RUNNER, true, (q) => q.query(`select public.ai_registration_cases()`))).rejects.toThrow(/Only the switched-on Registration Runner/);
    await db.query(`update public.ai_employees set enabled = true where user_id = $1`, [RUNNER]);
  });

  it("still cannot move a step, send a request, attach a file or read the tables directly", async () => {
    const seen = await asAi(conn, RUNNER, true, async (q) => [
      (await q.query(`select count(*)::int as n from public.registration_cases`)).rows[0].n,
      (await q.query(`select count(*)::int as n from public.registration_steps`)).rows[0].n,
      (await q.query(`select count(*)::int as n from public.registration_step_files`)).rows[0].n,
    ]);
    expect(seen).toEqual([0, 0, 0]);
    const changed = await asAi(conn, RUNNER, false, async (q) => [
      (await q.query(`update public.registration_steps set status = 'done', done_on = '2026-02-05' where id = $1 returning id`, [step["new_business:mayors_permit"]])).rows.length,
      (await q.query(`update public.registration_cases set status = 'completed', closed_at = now() where id = $1 returning id`, [kase.jaro])).rows.length,
    ]);
    expect(changed).toEqual([0, 0]);
    await expect(asAi(conn, RUNNER, false, (q) => q.query(`select public.create_client_request($1, 'Hello', 'x', null, null)`, [jaro]))).rejects.toThrow(/Only staff/);
    await expect(asAi(conn, RUNNER, false, (q) => q.query(`insert into public.client_requests (client_id, direction, subject) values ($1, 'to_client', 'x')`, [jaro]))).rejects.toThrow(/row-level security|permission denied/);
    await expect(
      asAi(conn, RUNNER, false, (q) => q.query(`select public.add_registration_step_file($1, $2, 'x.pdf', 'application/pdf', 10)`, [step["new_business:mayors_permit"], `${jaro}/${kase.jaro}/x.pdf`])),
    ).rejects.toThrow(/Only staff/);
    await expect(asAi(conn, RUNNER, false, (q) => q.query(`select public.decide_ai_draft(id, true) from public.ai_drafts limit 1`))).rejects.toThrow(/Only staff/);
    expect((await db.query(`select status from public.registration_steps where id = $1`, [step["new_business:mayors_permit"]])).rows[0].status).toBe("pending");
  });
});
