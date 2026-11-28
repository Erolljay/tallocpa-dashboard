# TalloCPA OS — AI Workforce (design note)

Status: **draft for the Owner's approval** (27 Nov 2026). Nothing here is built yet.
Decisions already made by the Owner are in [`DECISIONS.md`](DECISIONS.md) Q75–Q80; the
items marked **To confirm** below are recommendations waiting for an answer.

This note is about the firm's own AI employees: AI that does work inside the firm's
processes. It is not the *AI & Business Automation* service line sold to clients,
which stays off this platform (Q66).

---

## 1. The idea in one paragraph

Each AI employee is a member of staff with a narrow job, a human supervisor, its own
credential and its own scorecard. It **prepares** work: it reads, classifies, drafts,
explains and chases. People **review, approve, sign and file**, through the same
sign-off chain the app already enforces (§3.8 of the spec). Most AI employees work at
a "desk" in the Owner's Claude Cowork and reach the app through one connector, the
**TalloCPA OS MCP server**. The few that must answer clients instantly run inside the
app on the Qwen API.

## 2. Principles

1. **Prepare, never sign.** No AI employee can review, give final approval, act as
   approver, release a report, post or reverse an entry, or mark a return filed or
   paid. The database enforces this, not only the prompt: those tools do not exist
   on the connector, and the database functions behind them refuse an AI caller.
2. **Figures come from code.** Tax due, deadlines, balances, totals and FS note
   numbers are calculated by the tested engine. An AI never types a figure into a
   return, statement or ledger.
3. **Least access.** Each AI employee sees only its own tools and its assigned
   clients. Books access is a separate switch (§6). Marketing employees never see
   client data.
4. **Everything is attributable.** Every call is logged under the AI employee's name,
   and every view of client data goes to the existing access log.
5. **The Owner can stop any of them at once.** One switch per AI employee, effective
   on its next request.
6. **Business rules stay in the app** (Q11). Cowork desks hold instructions and
   procedures; the master templates, notes library, fee schedule and data live in
   the app.

## 3. The AI employees

17 AI employees in 6 departments. Org chart:
<https://claude.ai/artifact/2Nj7saPXTEJe1QAJ1KBgrc> (private to the Owner).

| Department | AI employee | Job | Supervisor | Runs on |
|---|---|---|---|---|
| Office of the Managing Partner | Chief of Staff | Morning brief: approvals waiting, clients turning red, staff load, receivables at risk | Owner | Cowork |
| Client Services | Onboarding Officer | Works the client's Onboarding checklist (§4.1): COR, engagement draft, portal invites, chart of accounts, opening balances draft, kickoff brief | Preparer | Cowork; chat replies in the app |
| Client Services | Client Concierge | Answers clients on Telegram and the portal: deadlines, missing documents, 2307s, registration status; opens tickets for the rest | Preparer | App (Qwen) |
| Tax Compliance & Bookkeeping | Document Clerk | After OCR: document type, period, account title, duplicates, odd amounts, the return note to the client | Preparer | App (Qwen) first pass; Cowork catch-up |
| Tax Compliance & Bookkeeping | Pre-Review Assistant | Compares a return with prior periods, 2307s with sales, the VAT threshold, books with return lines; drafts the review memo | Reviewer | Cowork |
| Tax Compliance & Bookkeeping | BIR Mail Clerk | Matches BIR confirmations and notices to filings, attaches proof as a draft, flags LOA / PAN / FAN | Preparer | Cowork |
| Tax Compliance & Bookkeeping | Payment Proof Clerk | Matches the banks' tax payment confirmations (e.g. UnionBank Bills Payment to the BIR) to the return by TIN, form, period and amount; staff click Attach proof to file the PDF and record the payment | Preparer | Cowork |
| Tax Compliance & Bookkeeping | FS Preparer | Assembles the full financial statements in the firm's design (§8) | Reviewer; Owner releases | Cowork |
| Tax Compliance & Bookkeeping | Annual Reviewer | Checks that the whole year adds up: the books against every return filed (§8a) | Reviewer; Owner approves amendments | Cowork |
| Business Registration | Registration Runner | Drafts Form 1901 / 1903 / 1905 fields, lists missing requirements as client requests, watches days held at each office | Preparer | Cowork |
| Billing & Collections | Collections Clerk | Drafts reminders by aging, summarizes payment habits, flags jobs ready to bill | Owner approves sends | Cowork |
| Marketing & Growth | Content Writer | Articles and guides for tallocpa.com | Owner | Cowork |
| Marketing & Growth | Social Media Manager | Content calendar, captions, Canva visuals | Owner | Cowork |
| Marketing & Growth | SEO Specialist | Local search, Google Business Profile, page titles and FAQs; site changes as pull requests | Owner | Cowork |
| Marketing & Growth | Sales Assistant | Proposal drafts from leads and the fee schedule; follow-ups | Owner | Cowork |
| Marketing & Growth | Marketing Analyst | Monthly report from Firm → Marketing: leads by channel, what brought in proposals | Owner | Cowork |

Hand-offs: Sales Assistant → Onboarding Officer ← Registration Runner. Document Clerk →
preparer → Pre-Review Assistant → Reviewer → Owner. FS Preparer → Reviewer → Owner
releases to the portal. Annual Reviewer → Reviewer → Owner approves any amendment.

**Marketing** follows the Code of Ethics for Professional Accountants on advertising:
no exaggerated claims, no comparison with other firms, no client names or figures
without written consent. Nothing is published without the Owner.

## 4. Where they run and what they cost

| Where | Who | Paid by |
|---|---|---|
| **Cowork desk** (a Claude Cowork project per AI employee) | 12 of the 15, plus the Document Clerk's catch-up | The Owner's Claude plan, within its usage allowance. FS season (January–April) may need a higher plan |
| **Inside the app** | Client Concierge, Document Clerk first pass, Onboarding Officer chat replies | Qwen API on Alibaba Cloud, pay per use (Q76) |
| **The MCP server** | Every Cowork desk | No AI cost: it is the app's own code on Vercel |

A Cowork desk holds: the job description (project instructions), a working procedure
(a skill), reference copies, the TalloCPA OS connector with that employee's
credential, and optional scheduled tasks. The files for each desk are in
[`docs/ai-desks/`](ai-desks/README.md) (first: the Chief of Staff's morning brief). It does **not** hold the master templates
or any finished work: drafts are saved in the app, where people review them.

### 4.1 The in-app model is swappable

In-app AI goes behind an `ai-provider` interface, the same way OCR sits behind
`ocr-provider` (`src/lib/ocr/provider.ts`). Qwen is the first provider; changing
model or provider is a setting, not a rebuild.

- Qwen through Alibaba Cloud Model Studio's **international (Singapore) endpoint**,
  never the mainland China endpoint.
- Paid tier only. Their data-handling terms are checked against the Data Privacy Act
  before go-live (open item A2).
- The app sends Qwen only what the task needs (one document's fields, one client's
  open items), never a client's whole ledger.
- A monthly spending cap per in-app AI employee, set in Settings; at the cap it stops
  and the work falls back to people.

## 5. Identity and credentials

Built in step 1 (migration `20270107000001_ai_employees.sql`, tests in
`supabase/tests/ai-employees.test.ts`).

- **Not staff, by design.** An AI employee is a row in `ai_employees` with its own
  login, and has **no** `staff_profiles` or `client_users` row. Every existing check
  (`staff_role()`, `is_staff()`, `is_owner()`, `is_assigned()`, `can_access_client()`
  and everything built on them) therefore refuses it: it cannot prepare, review,
  approve, post, reverse, lock, release, file, pay or remit anything. This is
  deny-by-default: a feature added later refuses AI employees too unless a migration
  grants access on purpose. (The first draft proposed an `'ai'` staff role with an
  `is_human_staff()` guard on each sign-off path; that would have needed a guard on
  every path, present and future.) A login is a person or an AI employee, never both
  (triggers on `ai_employees`, `staff_profiles` and `client_users`).
- **What is granted on purpose**, read-only and only while switched on: its own
  record, assignments and tool grants; its assigned client records (`ai_assignments`,
  or every client of the brand with "every client"); and those clients' books at
  Full access (§6). Marketing (`client_data = false`) can be given no client and no
  books.
- **The test** checks that an AI employee, switched on with Full access, is refused on
  every sign-off path, can change or delete no row in any table, and reads no more
  than a signed-in stranger apart from the grants above.
- **No human sign-in.** Its login is on a reserved domain no mail can reach
  (`*.invalid`) and is banned from signing in. It acts only through a key.
- **Keys.** Created in Settings → AI Employees, shown once, stored as a SHA-256 hash
  with the last four characters, with an expiry (30 days, 90 days or 1 year),
  revocable; a revoked key cannot be revived and no key can be edited.
- **Acting under the database rules** (step 2). When a request arrives with a valid
  key, the server acts as that AI employee, so the same rules apply. For server code,
  `private.ai_books_level(ai, client)` gives the same answer as the policies. The
  service key is never used to read data on an AI employee's behalf.
- **Supervisor.** Each AI employee names the staff member who checks its work; none
  means the Owner.

**A1, answered (27 Nov 2026).** Claude's custom connectors (claude.ai, desktop, Cowork) sign in with OAuth;
plain keys in a header are a beta for some organizations only, and a sign-in belongs to
the account, not to a Cowork project. So **each AI employee has its own connector
address** (`/api/mcp/<key>`): each Cowork desk adds only its own connector, and each
connector signs in separately as that AI employee. Keys work for Claude Code, tests and
scheduled jobs; Cowork and claude.ai sign in with OAuth (step 2b, built): only the Owner
can allow a connection, on a consent page that names the AI employee, and can disconnect
it in Settings.

## 6. Books access

Being assigned to a client is not enough to read its books. Each AI employee has a
books access level, set by the Owner:

| Level | Can read |
|---|---|
| **None** | No ledger figures |
| **Summary** | Monthly totals, trial balance and FS lines; no entries, customers or suppliers |
| **Full** | Entries, general ledger, receivables and payables by party: the same as the assigned preparer |

Read-only at every level. Proposed defaults:

| AI employee | Level |
|---|---|
| Document Clerk, Pre-Review Assistant, FS Preparer, Annual Reviewer | Full, assigned clients |
| Onboarding Officer | Full, while the client is in Onboarding |
| Chief of Staff | Summary, all clients |
| Client Concierge | What the client sees in its own portal, for the businesses that contact can access |
| Collections Clerk | None (reads the firm's receivables, not the client's books) |
| Registration Runner, BIR Mail Clerk, Payment Proof Clerk | None |
| All marketing employees | None, and no client-data tools at all |

The books policies (`books_read` and the ledger tables) gain a check on this level for
AI callers. Summary is served only through summary functions, never the entry tables.

## 7. The TalloCPA OS MCP server

### 7.1 Parts

1. **Endpoint** (built): `/api/mcp/<key>`, one address per AI employee, Streamable
   HTTP, stateless (each POST gets one JSON answer). `src/app/api/mcp/[ai]/route.ts`,
   `src/lib/mcp/`.
2. **Sign-in**: per AI employee (§5). A key as `Authorization: Bearer tcai_…`, or OAuth
   2.1 (built in 2b): protected resource and sign-in server metadata, dynamic client
   registration, the Owner's consent page, PKCE (S256), one-hour access tokens (stored as
   keys, source `oauth`) and rotating refresh tokens valid 90 days from their last use; disconnecting revokes them.
3. **Permissions**: each AI employee sees only the tools granted to it and only its
   assigned clients; books access per §6.
4. **Tools**: read, search and save-draft actions (§7.2).
5. **Reference library** (read-only resources): SOPs, fee schedule, BIR deadline
   rules, chart-of-accounts templates, the FS notes library, the brand tone guide.
6. **Safety**: no sign-off tools exist; a daily call limit per AI employee; the
   on/off switch; the spending cap for in-app employees.
7. **Activity log**: every call (AI employee, tool, client, outcome, time) in a new
   `ai_activity` table, viewable in Settings → AI Employees. Views of client data
   also go to `access_log`.

### 7.2 Tools

All tools only read or save drafts. A draft becomes real only when a person accepts
it in the app.

| For | Tools |
|---|---|
| Everyone | who am I; my work queue; search (uses the global search behind Ctrl/Cmd K); open a client file; add a note; draft a request to a client; open a ticket |
| Document Clerk | **Built (step 3):** `documents_to_review`, `read_document` (OCR reading, the app's checks, possible duplicates, supplier, account history at Full), `suggest_document_review` (draft: type, period, account, duplicate, return note). Images: later |
| Onboarding Officer | **Built (step 3):** `onboarding_clients`, `onboarding_checklist` (the app's own checklist, COR facts), `staff_for_team` (names, roles, branch, load only), `draft_onboarding_item` (draft: engagement, team, chart of accounts, opening balances that balance, kickoff brief, client request). Sending invites: later, as a person's action |
| Client Concierge | client status (deadlines, missing documents, open requests); 2307 list; registration status |
| Pre-Review Assistant | a filing with its prior periods; ledger summary; 2307s against sales; save a draft review memo |
| BIR Mail Clerk | unmatched BIR emails; propose a match to a filing; attach proof as a draft |
| Payment Proof Clerk | unmatched payment confirmations; candidate returns; propose a payment proof (staff attach) |
| FS Preparer | statements and notes data for a period; notes library; save an FS draft; run the FS validator |
| Annual Reviewer | the annual reconciliation for a client and year; the entries and filings behind a difference; filed-return files; draft figures for a return filed elsewhere; save the annual review memo; propose an amendment |
| Registration Runner | a registration case; draft 1901 / 1903 / 1905 fields; create client requests |
| Collections Clerk | receivables aging; a client's payment history; jobs ready to bill; draft a reminder |
| Chief of Staff | dashboard summary; scores; staff load |
| Marketing | leads by channel; fee schedule; draft a proposal; website pages and FAQs |

The in-app (Qwen) employees call **the same tools** through the same registry, so
nothing is built twice and the same permissions apply.

### 7.3 New features and the MCP

New features do not appear on the MCP by themselves. The rule that keeps it current:

1. **Tools live beside their feature** (e.g. `src/lib/collections/ai-tools.ts`). The
   registry collects every such file; there is no central list to edit.
2. **A project rule in `AGENTS.md`**: when a feature is added, decide which AI
   employees need it and add its tools and tests.
3. **Registry tests** fail the build when a tool has no permission entry, is a
   sign-off action, or does not write to the activity log.
4. **New tools start switched off.** The Owner grants each one to AI employees in
   Settings, so a new feature never quietly widens an AI employee's access.
5. Records that appear in global search are findable by AI employees through the
   general search tool without new work.

## 8. FS Preparer

The rule: **the AI never types an amount, a total or a note number.**

| Part | Done by |
|---|---|
| Amounts, subtotals, totals | Code, from the ledger (`src/lib/ledger/statements.ts`) |
| Note numbers and face-to-note references | Code (already numbered in order of first appearance) |
| Prior-year column | Code, from last year's released FS |
| Client name, TIN, address, period, dates on every page | Code, from the client record |
| Which notes apply | AI, choosing from the firm's notes library by the client's facts |
| Narrative wording | AI, starting from the firm's note templates; figures written as placeholders that code fills |
| Missing information | AI lists questions instead of guessing |
| The look | The firm's FS design template, rendered as PDF and Word |

**Release validator** (code), run before a draft can go to review and again before
release; any failure blocks release and names the line:

- the statement of financial position balances; the cash flow agrees with the change
  in cash (both already computed: `difference`, `cashDifference`);
- every face line with a note number has that note, and every note is referenced;
- notes run 1, 2, 3… with no gap or repeat;
- every note table adds up and agrees with the face amount;
- client name, TIN and period are the same on every page;
- no placeholder is left unfilled;
- no account is unclassified.

The design template and the notes library are app features (Settings → FS template,
Settings → Notes library) that human staff use too.

**Needed from the Owner (A3):** the current FS design (a past FS, client redacted);
the full notes library; the framework used per client type (PFRS for SMEs, PFRS for
Small Entities); two or three past FS of different client types to test against.

## 8a. Annual Reviewer

The Pre-Review Assistant checks **each return** before it is filed. The Annual Reviewer
checks that **the whole year adds up**: the books against every return filed for the
taxable year. Code computes every difference; the AI traces the cause and recommends
what to do.

**Annual reconciliation workpaper** (an app feature, computed by code; useful to
reviewers without AI). For one client and taxable year it takes the latest version of
every filed return (an amended return replaces the original, Q73), from
`return_worksheets.figures`, and the ledger for the year. It extends the monthly
tie-outs T-1 to T-10 (`src/lib/workpapers/tieouts.ts`) to the year, with the same ₱1
rounding tolerance:

| # | Check | Books vs returns |
|---|---|---|
| A-1 | Sales | Revenue per books vs 2550Q or 2551Q vs 1701Q / 1702Q vs the annual ITR |
| A-2 | Output and input VAT | VAT accounts vs the 2550Qs, input VAT carried over |
| A-3 | Percentage tax | Books vs the 2551Qs |
| A-4 | Creditable withholding (CWT) | 2307s received vs SAWT vs credits claimed on the quarterly and annual ITR; missing 2307s |
| A-5 | Expanded withholding (EWT) | Expenses subject to EWT and the payable vs 0619-E and 1601-EQ vs 1604-E / QAP |
| A-6 | Compensation | Salaries per books vs the 1601-Cs vs 1604-C / alphalist vs the 2316s |
| A-7 | Income tax | Taxable income per books vs the ITR (OSD or itemized, NOLCO, MCIT); Q3 cumulative vs annual |
| A-8 | Year-end tax payables | BIR payables in the December books vs what the January returns pay |
| A-9 | Tax payments | Payments to BIR in the cash disbursements book vs the payments on the returns |
| A-10 | SSS, PhilHealth, Pag-IBIG | Payables vs remittances |
| A-11 | Deductibility risk | Expenses that called for withholding but have none (non-deductible; a common LOA finding) |

**The Annual Reviewer (AI)**, for each open difference:

- traces the likely cause: timing or cutoff, a document booked in the next open month
  (Q72), a 2307 received after the quarter, a misclassified account, a wrong rate, an
  amendment not yet filed;
- recommends one of: no action, explain in writing, adjust the books, or amend the
  return (only the Owner approves an amendment, Q71);
- writes the annual review memo and lists questions for the preparer or the client;
- flags LOA risk (feeds Phase 4).

**Returns filed elsewhere.** Returns filed by a previous accountant, or before the
client joined, have no stored figures. The Annual Reviewer reads the uploaded filed
return and drafts its figures; a staff member confirms them before they count.

Runs in Cowork, Full books access for assigned clients, January to April before the
annual ITR, 1604-C and 1604-E, or on request. The workpaper needs no input from the
Owner and can be built at any time.

## 8b. Schedules (the Owner's calendar and everything dated)

**Now:** the Chief of Staff reads the Owner's Google Calendar through Cowork's Google
Calendar connector and opens the morning brief with today's schedule and the client
matters to raise in each meeting (docs/ai-desks/chief-of-staff/). Read only: no AI
employee creates, changes, accepts or declines an event.

**Later (planned tool `my_schedule`):** one list of everything dated for a person, from
TalloCPA OS itself, so every AI employee that needs a schedule uses the same source:

- Google Calendar events of the calendars linked in the app (staff calendars, already
  connected for booking pages);
- client bookings (discovery calls, kickoff meetings) from the booking pages;
- BIR filing deadlines of the person's clients, and registration office visits
  (routing slip steps with a date);
- later, tasks with a due date.

When it exists, the morning brief switches to it with no change to its format (the skill
already says so), and a scheduling AI employee, if the Owner wants one, builds on the same
tool. Reading stays the default; booking or moving meetings would be a separate, explicitly
granted draft tool that a person confirms.

## 9. Settings → AI Employees (Owner only)

- List of AI employees: department, supervisor, status (on / off), where it runs.
- Per AI employee: assigned clients, books access level, tools granted, credential
  (create, expiry, revoke), daily call limit, monthly spending cap (in-app only).
- Activity: the log of calls, filterable by AI employee, client and tool.
- Scores page: items prepared, correction rate (how often people changed its draft),
  time from ready to accepted.

## 10. Data model (first draft)

- Built in step 1: `ai_employees` (user_id, brand, key, name, department, job,
  supervisor_user_id, runs_on, enabled, books_level, all_clients, client_data,
  daily_limit, monthly_cap in pesos); `ai_assignments` (ai_user_id, client_id);
  `ai_credentials` (hash, hint, label, expiry, revoked, last used); `ai_tool_grants`
  (ai_user_id, tool); `ai_activity` (ai_user_id, acting_user_id, tool, client_id,
  outcome, detail, cost in pesos), written by the server and read by the Owner.
- `ai_drafts` where a feature has no draft state of its own (kind, client_id,
  payload, status: open / accepted / rejected, decided_by).
- FS: `fs_templates`, `fs_note_library`, `fs_drafts`.
- Annual review: `annual_reviews` (client, taxable year, status, memo) and
  `annual_review_items` (check, books amount, returns amount, difference, status,
  explanation, recommendation); `external_return_figures` for returns filed elsewhere
  (drafted, confirmed_by).

## 11. Build order

1. **Foundation** (built): AI employees outside staff, refused by every sign-off path
   with tests, keys, Settings → AI Employees, activity log, books access levels.
2. **MCP server** (built): endpoint, key sign-in, tool registry with its tests, shared
   tools (who am I, my clients, a client, upcoming returns, trial balance), reference
   library (house rules, my job, the workforce), daily limit, activity log, tool grants
   in Settings. **2b** (built): OAuth sign-in for Cowork and claude.ai connectors, with
   Connected apps and Disconnect in Settings.
3. **Document Clerk** and **Onboarding Officer** tools; their Cowork desks (built). **Drafts** (`ai_drafts`): what an AI employee prepares waits for a person to accept or reject, on the document review page and the client's Onboarding tab; accepting records the decision and applies nothing.
4. **`ai-provider` with Qwen**; Client Concierge on Telegram and the portal.
5. **FS template, notes library and release validator** (useful to staff without AI);
   then the FS Preparer's tools and desk. **Annual reconciliation workpaper**, then the
   Annual Reviewer's tools and desk.
6. **Pre-Review Assistant** (built): returns waiting for review, prior periods, the app's tie-outs, 2307s, the ₱3M VAT threshold; review memos as drafts on the return's page. **Collections Clerk** (built): receivables aging, payment history, ready to bill, billed vs collected split by tax dues (UnionBank), SSS / PhilHealth / Pag-IBIG remittances (Security Bank), retainers and others (BPI); payment reminders as Owner-only drafts. Billing stays Owner-only: the Clerk reads it through narrow functions only it may call. **BIR Mail Clerk** (built): the app stores the BIR's emails (filing confirmations, notices) in *BIR mail*; the Clerk proposes the client and return, flags LOA / PAN / FAN / FLD with the respond-by date (Owner notified); staff accept and link. **Registration Runner** (built): open cases by days held, Form 1901 / 1903 / 1905 fields from what the app holds, missing documents as client requests (staff send). **Chief of Staff `my_schedule`** (built): the Owner's meetings, discovery calls, returns due, tasks, requests and registration targets in one list; Google Calendar stays through Cowork. **Payment Proof Clerk** (built, added at the Owner's request): the app collects bank payment confirmations and writes a PDF; the Clerk matches them by TIN, form, period and amount; staff click Attach proof.
7. **Marketing & Growth** (built): one **Marketing Team** connector for the whole department (Owner's choice), used from Claude Code with marketing skill packs; firm profile, fee schedule, website pages, leads pipeline and reports, proposal and follow-up drafts (Owner only). No client data; the advertising rules of the Code of Ethics are in its house rules. The five role rows remain and work through it.

Each step ships with its tests and goes live switched off until the Owner turns it on.

## 12. Open items

| # | Item | Owner of the answer |
|---|---|---|
| A1 | ~~Does Cowork keep a connector sign-in per project or per account?~~ Per account; answered with one address per AI employee (§5) | Done |
| A2 | Alibaba Cloud Model Studio terms against the Data Privacy Act; Singapore endpoint; which Qwen model by default | Owner, with Build |
| A3 | FS design, notes library, framework per client type, past FS samples (§8) | Owner |
| A4 | Approve the proposed books access defaults (§6) | Owner |
| A5 | Which client messages the Concierge may send on its own, and which go to a preparer first | Owner |
| A6 | Monthly spending cap per in-app AI employee | Owner |
| A7 | Claude plan for FS season if usage limits are reached | Owner |
| A8 | Should open annual differences block the annual ITR from being marked prepared until explained, as the monthly tie-outs do? Recommended: yes | Owner |
