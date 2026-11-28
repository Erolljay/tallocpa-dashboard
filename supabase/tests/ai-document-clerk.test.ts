/**
 * The Document Clerk's tools (migration 20270108000002, src/lib/documents/ai-tools.ts;
 * docs/AI-WORKFORCE.md step 3), end to end through the connector handler:
 *
 *   - its tools are listed only once granted;
 *   - it sees only its clients' documents waiting for review, their readings, and the
 *     suppliers linked to its clients;
 *   - read_document runs the app's checks and finds duplicates; account history and the
 *     chart only at Full books access;
 *   - suggest_document_review saves a draft on the document for staff on the client,
 *     replacing its earlier one; refused for other clients, posted documents, bad
 *     accounts and cross-client duplicates;
 *   - it still cannot change a document, a reading or a party.
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
const DB_NAME = "ai_document_clerk_test";

const OWNER = "00000000-0000-0000-0000-00000000e201";
const PREPARER = "00000000-0000-0000-0000-00000000e202";
const CLIENT_USER = "00000000-0000-0000-0000-00000000e203";
const CLERK = "00000000-0000-0000-0000-00000000e2a1";
const NOW = new Date("2026-02-05T02:00:00Z");
const TIN = "123-456-789-00000";

describe.skipIf(!url)("AI Document Clerk: review queue, readings, duplicates, suggestions as drafts", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let conn: Connector;
  let jaro: string;
  let molo: string;
  let expense: { id: string; code: string };
  const doc: Record<string, string> = {};
  const key = newKey();
  let id = 0;

  type Reply = { result?: { isError?: boolean; structuredContent?: Record<string, unknown>; content: { text: string }[] }; error?: { message: string } };
  const call = async (name: string, args: Record<string, unknown> = {}) =>
    (await handleMcp(conn, { aiKey: "document_clerk", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/call", params: { name, arguments: args } }, now: NOW })).json as Reply;
  const setClerk = (fields: Record<string, unknown>) => {
    const keys = Object.keys(fields);
    return db.query(`update public.ai_employees set ${keys.map((k, i) => `${k} = $${i + 2}`).join(", ")} where user_id = $1`, [CLERK, ...keys.map((k) => fields[k])]);
  };
  async function addDoc(client: string, status: string, fields: object, extra: { approved?: boolean; account?: string; docType?: string; period?: string } = {}) {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status, ledger_account_id)
       values ($1, $2, 'portal', $3, $4, $4, $5, 'image/jpeg', 1, gen_random_uuid()::text, $6, $7) returning id`,
      [client, CLIENT_USER, extra.docType ?? "purchase_receipt", extra.period ?? "2026-01-01", `receipt-${Object.keys(doc).length + 1}.jpg`, status, extra.account ?? null],
    )).rows[0].id as string;
    await db.query(
      `insert into public.extractions (document_id, status, fields, confidence, approved_fields, approved_by, approved_at) values ($1, 'done', $2, $3, $4, $5, $6)`,
      [d, JSON.stringify(fields), JSON.stringify({ total: 0.95, party_tin: 0.6 }), extra.approved ? JSON.stringify(fields) : null, extra.approved ? PREPARER : null, extra.approved ? NOW.toISOString() : null],
    );
    return d;
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

    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, PREPARER, CLIENT_USER, CLERK]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Preparer', 'staff')`, [OWNER, PREPARER, brand]);
    jaro = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9961', 'Jaro Trading', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    molo = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9962', 'Molo Foods', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    for (const c of [jaro, molo]) await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [c, PREPARER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Jaro owner')`, [CLIENT_USER, jaro]);
    // Jaro's books, and the account its earlier receipts from this supplier went to.
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [PREPARER]);
    await db.query("set local role authenticated");
    await db.query(`select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [jaro, JSON.stringify(templatePayload("stock_corporation"))]);
    await db.query("commit");
    expense = (await db.query(`select id, code from public.ledger_accounts where client_id = $1 and type = 'expense' and control is null order by code limit 1`, [jaro])).rows[0];

    // Suppliers: one linked to Jaro, one only to Molo.
    const supplier = (await db.query(`insert into public.parties (tin, branch_code, kind, registered_name) values ('123-456-789', '00000', 'non_individual', 'Iloilo Office Supply Inc.') returning id`)).rows[0].id;
    const moloSupplier = (await db.query(`insert into public.parties (tin, branch_code, kind, registered_name) values ('987-654-321', '00000', 'non_individual', 'Molo Fresh Meats Corp.') returning id`)).rows[0].id;
    await db.query(`insert into public.client_parties (client_id, party_id, role, first_seen, last_seen) values ($1, $2, 'supplier', '2026-01-01', '2026-01-31'), ($3, $4, 'supplier', '2026-01-01', '2026-01-31')`, [jaro, supplier, molo, moloSupplier]);

    const receipt = { date: "2026-01-10", number: "0001", party_name: "Iloilo Office Supply", party_tin: TIN, vatable: "1000", vat: "120", total: "1120", doc_type: "purchase_receipt" };
    doc.waiting = await addDoc(jaro, "received", receipt);
    doc.earlier = await addDoc(jaro, "posted", receipt, { approved: true, account: expense.id });
    doc.other = await addDoc(jaro, "under_review", { date: "2026-01-12", number: "77", party_tin: TIN, total: "560" });
    doc.molo = await addDoc(molo, "received", { date: "2026-01-10", number: "5", party_tin: "987-654-321-00000", total: "300" });

    await db.query(`insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, books_level, enabled) values ($1, $2, 'document_clerk', 'Document Clerk', 'compliance', 'both', 'full', true)`, [CLERK, brand]);
    await db.query(`insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2)`, [CLERK, jaro]);
    await db.query(`insert into public.ai_credentials (ai_user_id, token_hash, token_hint, created_at, expires_at) values ($1, $2, right($3, 4), '2026-01-01', '2026-06-01')`, [CLERK, hashKey(key), key]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lists its tools only once the Owner grants them", async () => {
    expect((await call("documents_to_review")).error?.message).toMatch(/Unknown tool/);
    await db.query(`insert into public.ai_tool_grants (ai_user_id, tool) values ($1, 'documents_to_review'), ($1, 'read_document'), ($1, 'suggest_document_review')`, [CLERK]);
    const r = await handleMcp(conn, { aiKey: "document_clerk", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/list" }, now: NOW });
    const names = (r.json as { result: { tools: { name: string; annotations: { readOnlyHint: boolean } }[] } }).result.tools;
    expect(names.map((t) => t.name).sort()).toEqual(["documents_to_review", "read_document", "suggest_document_review"]);
    expect(names.find((t) => t.name === "suggest_document_review")?.annotations.readOnlyHint).toBe(false);
  });

  it("lists only its clients' documents still waiting for review, oldest first", async () => {
    const r = await call("documents_to_review");
    const docs = r.result?.structuredContent?.documents as { id: string; client_code: string; unsure_fields: number; ocr: string }[];
    expect(docs.map((d) => d.id)).toEqual([doc.waiting, doc.other]);
    expect(docs[0]).toMatchObject({ client_code: "TC-9961", ocr: "done", unsure_fields: 1 });
    expect((await call("documents_to_review", { client: "TC-9962" })).result?.isError).toBe(true);
  });

  it("reads a document: checks, duplicates, the supplier, and the accounts used before", async () => {
    const r = (await call("read_document", { document_id: doc.waiting })).result?.structuredContent as Record<string, unknown>;
    expect(r.document).toMatchObject({ client_code: "TC-9961", status: "received", doc_type: "purchase_receipt" });
    expect((r.reading as { unsure_fields: { field: string }[] }).unsure_fields.map((f) => f.field)).toEqual(["party_tin"]);
    expect(r.possible_duplicates).toEqual([expect.objectContaining({ id: doc.earlier, approved: true, reason: "same supplier TIN and document number" })]);
    expect((r.checks as { message: string }[]).some((c) => /Same supplier TIN and document number/.test(c.message))).toBe(true);
    expect(r.supplier_in_directory).toMatchObject({ name: "Iloilo Office Supply Inc." });
    expect(r.account_history).toEqual([{ code: expense.code, name: expect.any(String), times: 1, last_period: "2026-01-01" }]);
    expect(Array.isArray(r.chart_of_accounts)).toBe(true);
  });

  it("with no TIN read, matches the account history by supplier name; with neither, says so (not 'Needs Full books access')", async () => {
    const byName = await addDoc(jaro, "received", { date: "2026-01-20", number: "9", party_name: " iloilo office supply ", total: "50" });
    const bare = await addDoc(jaro, "received", { date: "2026-01-21", number: "10", total: "40" });
    try {
      const a = (await call("read_document", { document_id: byName })).result?.structuredContent as Record<string, unknown>;
      expect(a.account_history).toEqual([{ code: expense.code, name: expect.any(String), times: 1, last_period: "2026-01-01" }]);
      expect(a.account_history_matched_by).toBe("supplier name (no TIN read)");
      const b = (await call("read_document", { document_id: bare })).result?.structuredContent as Record<string, unknown>;
      expect(b.account_history).toMatch(/no supplier TIN or name/);
      expect(Array.isArray(b.chart_of_accounts)).toBe(true);
    } finally {
      await db.query(`delete from public.extractions where document_id = any ($1::uuid[])`, [[byName, bare]]);
      await db.query(`delete from public.documents where id = any ($1::uuid[])`, [[byName, bare]]);
    }
  });

  it("without Full books access, reads the document but not the accounts", async () => {
    await setClerk({ books_level: "summary" });
    const r = (await call("read_document", { document_id: doc.waiting })).result?.structuredContent as Record<string, unknown>;
    expect(r.account_history).toBe("Needs Full books access.");
    expect(r.chart_of_accounts).toBe("Needs Full books access.");
    await setClerk({ books_level: "full" });
  });

  it("cannot read another client's document or supplier", async () => {
    const r = await call("read_document", { document_id: doc.molo });
    expect(r.result?.isError).toBe(true);
    expect(r.result?.content[0].text).toMatch(/No document/);
    const seen = await asAi(conn, CLERK, true, async (q) => (await q.query<{ name: string }>(`select display_name as name from public.parties order by 1`)).rows.map((x) => x.name));
    expect(seen).toEqual(["Iloilo Office Supply Inc."]);
  });

  it("saves a suggestion as a draft on the document, for staff on the client", async () => {
    const r = await call("suggest_document_review", { document_id: doc.waiting, account_code: expense.code, duplicate_of: doc.earlier, return_note: "This receipt was already sent in January.", reason: "Same TIN and OR number as a receipt already posted." });
    expect(r.result?.isError).toBeUndefined();
    const { rows } = await db.query(`select kind, client_id, subject_table, subject_id, status, payload->>'account_code' as account, payload->>'duplicate_of' as dup, note from public.ai_drafts`);
    expect(rows).toEqual([{ kind: "document_review", client_id: jaro, subject_table: "documents", subject_id: doc.waiting, status: "open", account: expense.code, dup: doc.earlier, note: "Same TIN and OR number as a receipt already posted." }]);
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [PREPARER]);
    await db.query("set local role authenticated");
    const staff = (await db.query(`select payload->'summary' as summary from public.ai_drafts where subject_id = $1 and status = 'open'`, [doc.waiting])).rows;
    await db.query("commit");
    expect((staff[0].summary as { label: string }[]).map((l) => l.label)).toEqual(["Document", "Account", "Duplicate of", "Note to the client"]);
  });

  it("a new suggestion for the same document replaces the earlier one", async () => {
    await call("suggest_document_review", { document_id: doc.waiting, doc_type: "purchase_receipt", period: "2026-01-01", reason: "Type and month are right as sent." });
    expect((await db.query(`select status from public.ai_drafts where subject_id = $1 order by created_at`, [doc.waiting])).rows.map((x) => x.status)).toEqual(["withdrawn", "open"]);
  });

  it("the next run leaves out documents it already suggested on, unless asked", async () => {
    type Listed = { already_suggested: number; documents: { id: string; my_suggestion: string }[] };
    const next = (await call("documents_to_review")).result?.structuredContent as Listed;
    expect(next.documents.map((d) => d.id)).toEqual([doc.other]);
    expect(next.already_suggested).toBe(1);
    const all = (await call("documents_to_review", { include_suggested: true })).result?.structuredContent as Listed;
    expect(all.documents.map((d) => [d.id, d.my_suggestion])).toEqual([[doc.waiting, "open"], [doc.other, "none"]]);
    expect(all.already_suggested).toBe(1);
  });

  it("refuses another client's document, a posted document, an unknown account, a cross-client duplicate and an empty suggestion", async () => {
    const msg = async (args: Record<string, unknown>) => {
      const r = await call("suggest_document_review", { reason: "Testing what is refused.", ...args });
      expect(r.result?.isError, JSON.stringify(args)).toBe(true);
      return r.result!.content[0].text;
    };
    expect(await msg({ document_id: doc.molo, period: "2026-01-01" })).toMatch(/No document/);
    expect(await msg({ document_id: doc.earlier, period: "2026-01-01" })).toMatch(/posted/);
    expect(await msg({ document_id: doc.waiting, account_code: "9999" })).toMatch(/No account 9999/);
    expect(await msg({ document_id: doc.waiting, duplicate_of: doc.molo })).toMatch(/No document/);
    expect(await msg({ document_id: doc.waiting })).toMatch(/at least one thing/);
    expect(await msg({ document_id: doc.waiting, period: "2026-01-15" })).toMatch(/first of the month/);
    expect(await msg({ document_id: doc.waiting, doc_type: "filed_return" })).toMatch(/Invalid input/);
    expect((await db.query(`select count(*)::int as n from public.ai_drafts where status = 'open'`)).rows[0].n).toBe(1);
  });

  it("still cannot change a document, a reading or a party", async () => {
    const changed = await asAi(conn, CLERK, false, async (q) => [
      (await q.query(`update public.documents set status = 'posted' where id = $1 returning id`, [doc.waiting])).rows.length,
      (await q.query(`update public.extractions set approved_fields = fields where document_id = $1 returning document_id`, [doc.waiting])).rows.length,
      (await q.query(`update public.parties set registered_name = 'x' returning id`)).rows.length,
    ]);
    expect(changed).toEqual([0, 0, 0]);
    expect((await db.query(`select status from public.documents where id = $1`, [doc.waiting])).rows[0].status).toBe("received");
  });
});
