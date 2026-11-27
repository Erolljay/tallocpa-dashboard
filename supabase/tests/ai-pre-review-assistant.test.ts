/**
 * The Pre-Review Assistant's tools (migration 20270109000001, src/lib/filings/
 * pre-review-tools.ts; docs/AI-WORKFORCE.md §3), end to end through the connector handler:
 *
 *   - its tools are listed only once granted;
 *   - it lists only its clients' returns marked prepared, and skips those it already
 *     wrote a memo on unless asked;
 *   - pre_review_return reads the worksheet, the same form's earlier periods and what
 *     moved, and at Full books access the tie-outs, customers without a 2307, the VAT
 *     threshold and the books; at Summary none of the books detail;
 *   - save_review_memo saves a draft on the return for staff on the client; refused for
 *     returns not waiting for review and other clients' returns;
 *   - it still cannot change a return, a worksheet or an explanation, nor move a return
 *     along the sign-off chain.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hashKey, newKey } from "../../src/lib/ai/credentials";
import { templatePayload } from "../../src/lib/ledger/coa";
import { asAi, handleMcp } from "../../src/lib/mcp/handler";
import type { Connector } from "../../src/lib/mcp/types";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "ai_pre_review_assistant_test";

const OWNER = "00000000-0000-0000-0000-00000000e101";
const PREPARER = "00000000-0000-0000-0000-00000000e102";
const OTHER_STAFF = "00000000-0000-0000-0000-00000000e103";
const CLIENT_USER = "00000000-0000-0000-0000-00000000e104";
const ASSISTANT = "00000000-0000-0000-0000-00000000e1a1";
const NOW = new Date("2027-04-05T02:00:00Z");

const worksheet = (sales: number, taxDue: number, warnings: string[] = []) => ({
  sections: [{ title: "Part II", lines: [
    { key: "sales", line: "47", label: "Sales/receipts", amount: sales },
    { key: "tax_due", line: "60", label: "Total amount payable", amount: taxDue, emphasis: "payable" },
  ] }],
  schedules: [], errors: [], warnings, documentIds: [],
});

describe.skipIf(!url)("AI Pre-Review Assistant: prepared returns, prior periods, tie-outs, memos as drafts", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let conn: Connector;
  let jaro: string;
  let molo: string;
  const filing: Record<string, string> = {};
  const key = newKey();
  let id = 0;

  type Reply = { result?: { isError?: boolean; structuredContent?: Record<string, unknown>; content: { text: string }[] }; error?: { message: string } };
  const call = async (name: string, args: Record<string, unknown> = {}) =>
    (await handleMcp(conn, { aiKey: "pre_review_assistant", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/call", params: { name, arguments: args } }, now: NOW })).json as Reply;
  const data = async (name: string, args: Record<string, unknown> = {}) => {
    const r = await call(name, args);
    expect(r.result?.isError, JSON.stringify(r)).toBeUndefined();
    return r.result!.structuredContent as Record<string, unknown>;
  };
  const setAssistant = (fields: Record<string, unknown>) => {
    const keys = Object.keys(fields);
    return db.query(`update public.ai_employees set ${keys.map((k, i) => `${k} = $${i + 2}`).join(", ")} where user_id = $1`, [ASSISTANT, ...keys.map((k) => fields[k])]);
  };

  async function addFiling(client: string, ob: string, label: string, start: string, end: string, due: string, status: string, ws?: object, figures?: object) {
    const f = (await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status, tax_due)
       values ($1, $2, '1702Q', $3, $4, $5, '1702Q', $6, $6, 'not_started', 2500) returning id`,
      [ob, client, label, start, end, due],
    )).rows[0].id as string;
    // A fixture: the worksheet's guards (month locks, filed returns) are for the app, not for this setup.
    if (ws) {
      await db.query("set session_replication_role = replica");
      await db.query(
        `insert into public.return_worksheets (filing_instance_id, client_id, inputs, result, figures, computed_at) values ($1, $2, '{}', $3, $4, now())`,
        [f, client, JSON.stringify(ws), JSON.stringify(figures ?? {})],
      );
      await db.query("set session_replication_role = origin");
    }
    await db.query(`update public.filing_instances set status = $2 where id = $1`, [f, status]);
    return f;
  }

  async function addRegisterLine(client: string, kind: string, month: string, fields: Record<string, number | string | boolean>) {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'portal', $3, $4, $4, 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'received') returning id`,
      [client, CLIENT_USER, kind === "sale" ? "sales_invoice" : "bir_2307_received", month],
    )).rows[0].id;
    const cols = Object.keys(fields);
    await db.query(
      `insert into public.register_lines (client_id, document_id, kind, source, month, line_date, ${cols.join(", ")})
       values ($1, $2, $3, 'portal', $4, $4, ${cols.map((_, i) => `$${i + 5}`).join(", ")})`,
      [client, d, kind, month, ...cols.map((k) => fields[k])],
    );
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

    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, PREPARER, OTHER_STAFF, CLIENT_USER, ASSISTANT]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Preparer', 'staff'), ($3, $4, 'Other', 'staff')`, [OWNER, PREPARER, OTHER_STAFF, brand]);
    jaro = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9971', 'Jaro Trading', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    molo = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9972', 'Molo Foods', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [jaro, PREPARER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Jaro owner')`, [CLIENT_USER, jaro]);
    // Jaro's books from January 2027 (no entries: revenue in the books is nil).
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [PREPARER]);
    await db.query("set local role authenticated");
    await db.query(`select public.setup_books($1, 'stock_corporation', '2027-01-01', $2)`, [jaro, JSON.stringify(templatePayload("stock_corporation"))]);
    await db.query("commit");

    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1702Q', 'quarterly', '2020-01-01') returning id`, [jaro])).rows[0].id;
    const moloOb = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1702Q', 'quarterly', '2020-01-01') returning id`, [molo])).rows[0].id;
    filing.lastYear = await addFiling(jaro, ob, "Q1 2026", "2026-01-01", "2026-03-31", "2026-05-30", "filed", worksheet(90_000_00, 2_000_00), { sales: 90_000_00, tax_due: 2_000_00 });
    filing.previous = await addFiling(jaro, ob, "Q4 2026", "2026-10-01", "2026-12-31", "2027-01-30", "filed", worksheet(50_000_00, 1_000_00), { sales: 50_000_00, tax_due: 1_000_00 });
    filing.waiting = await addFiling(jaro, ob, "Q1 2027", "2027-01-01", "2027-03-31", "2027-05-30", "prepared", worksheet(100_000_00, 2_500_00, ["Check the regime."]), { sales: 100_000_00, tax_due: 2_500_00 });
    filing.reviewed = await addFiling(jaro, ob, "Q2 2027", "2027-04-01", "2027-06-30", "2027-08-29", "reviewed");
    filing.molo = await addFiling(molo, moloOb, "Q1 2027", "2027-01-01", "2027-03-31", "2027-05-30", "prepared");

    // January 2027: a sale with ₱2,000 CWT and no 2307 yet; nothing in the books.
    await addRegisterLine(jaro, "sale", "2027-01-01", { party_name: "Bacolod Feeds Corp", party_tin: "123-456-789-00000", vatable: 100000, vat: 12000, total: 112000, withholding: 2000, net: 110000, vat_registered: true });
    await addRegisterLine(molo, "sale", "2027-01-01", { party_name: "Molo customer", vatable: 5000, total: 5000, net: 5000 });

    await db.query(`insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, books_level, enabled) values ($1, $2, 'pre_review_assistant', 'Pre-Review Assistant', 'compliance', 'cowork', 'full', true)`, [ASSISTANT, brand]);
    await db.query(`insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2)`, [ASSISTANT, jaro]);
    await db.query(`insert into public.ai_credentials (ai_user_id, token_hash, token_hint, created_at, expires_at) values ($1, $2, right($3, 4), '2027-01-01', '2027-06-01')`, [ASSISTANT, hashKey(key), key]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lists its tools only once the Owner grants them", async () => {
    expect((await call("returns_to_pre_review")).error?.message).toMatch(/Unknown tool/);
    await db.query(`insert into public.ai_tool_grants (ai_user_id, tool) values ($1, 'returns_to_pre_review'), ($1, 'pre_review_return'), ($1, 'save_review_memo')`, [ASSISTANT]);
    const r = await handleMcp(conn, { aiKey: "pre_review_assistant", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/list" }, now: NOW });
    const tools = (r.json as { result: { tools: { name: string; annotations: { readOnlyHint: boolean } }[] } }).result.tools;
    expect(tools.map((t) => t.name).sort()).toEqual(["pre_review_return", "returns_to_pre_review", "save_review_memo"]);
    expect(tools.find((t) => t.name === "save_review_memo")?.annotations.readOnlyHint).toBe(false);
  });

  it("lists only its clients' returns marked prepared", async () => {
    const r = await data("returns_to_pre_review");
    expect((r.returns as { id: string }[]).map((x) => x.id)).toEqual([filing.waiting]);
    expect(r.returns).toEqual([expect.objectContaining({ client_code: "TC-9971", form: "1702Q", period: "Q1 2027", worksheet_saved: true, my_memo: "none", overdue: false })]);
    expect(r.already_reviewed).toBe(0);
    expect((await call("returns_to_pre_review", { client: "TC-9972" })).result?.isError).toBe(true);
  });

  it("reads a return with its earlier periods, what moved, the tie-outs, 2307s, the VAT threshold and the books", async () => {
    const r = await data("pre_review_return", { filing_id: filing.waiting });
    expect(r.return).toMatchObject({ client_code: "TC-9971", form: "1702Q", status: "prepared", tax_due: 2500 });
    expect(r.worksheet).toMatchObject({ warnings: ["Check the regime."], errors: [] });
    expect((r.prior_periods as { period: string }[]).map((p) => p.period)).toEqual(["Q4 2026", "Q1 2026"]);
    expect(r.same_period_last_year).toMatchObject({ period: "Q1 2026", status: "filed" });
    expect((r.moved_vs_previous as { key: string; change: number; change_pct: number; notable: boolean }[])[0]).toMatchObject({ key: "sales", previous: 50000, current: 100000, change: 50000, change_pct: 100, notable: true });
    expect((r.moved_vs_last_year as { key: string; change: number }[]).find((l) => l.key === "sales")?.change).toBe(10000);

    const ties = (r.tie_outs as { needed: string[]; ties: { id: string; month: string; status: string; difference: number }[] });
    expect(ties.needed).toEqual(["T-1", "T-3"]);
    const jan = ties.ties.filter((t) => t.month === "2027-01-01");
    expect(jan.find((t) => t.id === "T-1")).toMatchObject({ status: "open", difference: 100000 });
    expect(jan.find((t) => t.id === "T-3")).toMatchObject({ status: "open", difference: 2000 });
  });

  it("names customers whose CWT has no 2307, and places the client against the VAT threshold", async () => {
    const r = await data("pre_review_return", { filing_id: filing.waiting });
    // The quarter of the period's last month (March 2027) starts in January, so the sale is in it.
    expect(r.customers_without_2307).toEqual([{ customer: "Bacolod Feeds Corp", tin: "123-456-789-00000", cwt_on_sales: 2000, received_2307: 0, missing: 2000 }]);
    expect(r.vat_threshold).toMatchObject({ status: "below", sales_last_12_months: 100000, threshold: 3000000 });
    expect(r.books_for_period).toBe("No posted entries in the period, or no books.");
  });

  it("at Summary books access, reads the return and its earlier periods but no books detail", async () => {
    await setAssistant({ books_level: "summary" });
    const r = await data("pre_review_return", { filing_id: filing.waiting });
    expect(r.worksheet).toMatchObject({ warnings: ["Check the regime."] });
    for (const k of ["tie_outs", "customers_without_2307", "vat_threshold", "books_for_period"]) expect(r[k], k).toBe("Needs Full books access.");
    const seen = await asAi(conn, ASSISTANT, true, async (q) => [
      (await q.query(`select count(*)::int as n from public.register_lines`)).rows[0].n,
      (await q.query(`select count(*)::int as n from public.workpaper_explanations`)).rows[0].n,
      (await q.query(`select count(*)::int as n from public.return_worksheets`)).rows[0].n,
    ]);
    expect(seen).toEqual([0, 0, 3]);
    await setAssistant({ books_level: "full" });
  });

  it("cannot read another client's return, worksheet or register", async () => {
    const r = await call("pre_review_return", { filing_id: filing.molo });
    expect(r.result?.isError).toBe(true);
    expect(r.result?.content[0].text).toMatch(/No return/);
    const seen = await asAi(conn, ASSISTANT, true, async (q) => (await q.query<{ client_id: string }>(`select distinct client_id from public.register_lines union select distinct client_id from public.return_worksheets`)).rows.map((x) => x.client_id));
    expect(seen).toEqual([jaro]);
  });

  it("saves a memo as a draft on the return, for staff on the client", async () => {
    const r = await data("save_review_memo", {
      filing_id: filing.waiting,
      summary: "Sales doubled from Q4 2026 and two tie-outs are open; look at T-1 before reviewing.",
      findings: [
        { severity: "low", item: "Worksheet warning", detail: "Check the regime." },
        { severity: "high", item: "T-1 sales vs revenue, January", detail: "Register ₱100,000 vs books ₱0, not explained." },
      ],
    });
    expect(r.saved).toBe(true);
    const { rows } = await db.query(`select kind, client_id, subject_table, subject_id, status, note, (payload->>'high')::int as high from public.ai_drafts`);
    expect(rows).toEqual([{ kind: "review_memo", client_id: jaro, subject_table: "filing_instances", subject_id: filing.waiting, status: "open", note: expect.stringMatching(/^Sales doubled/), high: 1 }]);
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [PREPARER]);
    await db.query("set local role authenticated");
    const staff = (await db.query(`select payload->'summary' as summary from public.ai_drafts where subject_id = $1 and status = 'open'`, [filing.waiting])).rows;
    await db.query("commit");
    // High findings first.
    expect((staff[0].summary as { label: string }[]).map((l) => l.label)).toEqual(["Return", "Must look: T-1 sales vs revenue, January", "Note: Worksheet warning"]);
  });

  it("the next run leaves out returns it already wrote a memo on, unless asked", async () => {
    const next = await data("returns_to_pre_review");
    expect(next.returns).toEqual([]);
    expect(next.already_reviewed).toBe(1);
    const all = await data("returns_to_pre_review", { include_reviewed: true });
    expect((all.returns as { id: string; my_memo: string }[]).map((x) => [x.id, x.my_memo])).toEqual([[filing.waiting, "open"]]);
  });

  it("refuses a return not waiting for review, another client's return and an empty memo", async () => {
    const msg = async (args: Record<string, unknown>) => {
      const r = await call("save_review_memo", { summary: "Testing what is refused here.", ...args });
      expect(r.result?.isError, JSON.stringify(args)).toBe(true);
      return r.result!.content[0].text;
    };
    expect(await msg({ filing_id: filing.reviewed })).toMatch(/reviewed; only prepared returns/);
    expect(await msg({ filing_id: filing.molo })).toMatch(/No return/);
    expect(await msg({ filing_id: filing.waiting, summary: "short" })).toMatch(/Sum up/);
    expect((await db.query(`select count(*)::int as n from public.ai_drafts where status = 'open'`)).rows[0].n).toBe(1);
  });

  it("still cannot change a return, a worksheet or an explanation, nor move a return along", async () => {
    const changed = await asAi(conn, ASSISTANT, false, async (q) => [
      (await q.query(`update public.filing_instances set status = 'reviewed' where id = $1 returning id`, [filing.waiting])).rows.length,
      (await q.query(`update public.return_worksheets set figures = '{}' where filing_instance_id = $1 returning id`, [filing.waiting])).rows.length,
      (await q.query(`update public.register_lines set total = 0 returning id`)).rows.length,
    ]);
    expect(changed).toEqual([0, 0, 0]);
    await expect(asAi(conn, ASSISTANT, false, (q) => q.query(`insert into public.workpaper_explanations (client_id, period, tie, explanation) values ($1, '2027-01-01', 'T-1', 'x')`, [jaro]))).rejects.toThrow(/row-level security/);
    for (const action of ["review", "kick_back", "owner_approve", "file"]) {
      await expect(asAi(conn, ASSISTANT, false, (q) => q.query(`select public.advance_filing($1, $2, 'x', '{}'::jsonb)`, [filing.waiting, action])), action).rejects.toThrow();
    }
    expect((await db.query(`select status from public.filing_instances where id = $1`, [filing.waiting])).rows[0].status).toBe("prepared");
  });
});
