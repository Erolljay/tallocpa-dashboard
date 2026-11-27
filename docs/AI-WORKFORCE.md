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

15 AI employees in 6 departments. Org chart:
<https://claude.ai/artifact/2Nj7saPXTEJe1QAJ1KBgrc> (private to the Owner).

| Department | AI employee | Job | Supervisor | Runs on |
|---|---|---|---|---|
| Office of the Managing Partner | Chief of Staff | Morning brief: approvals waiting, clients turning red, staff load, receivables at risk | Owner | Cowork |
| Client Services | Onboarding Officer | Works the client's Onboarding checklist (§4.1): COR, engagement draft, portal invites, chart of accounts, opening balances draft, kickoff brief | Preparer | Cowork; chat replies in the app |
| Client Services | Client Concierge | Answers clients on Telegram and the portal: deadlines, missing documents, 2307s, registration status; opens tickets for the rest | Preparer | App (Qwen) |
| Tax Compliance & Bookkeeping | Document Clerk | After OCR: document type, period, account title, duplicates, odd amounts, the return note to the client | Preparer | App (Qwen) first pass; Cowork catch-up |
| Tax Compliance & Bookkeeping | Pre-Review Assistant | Compares a return with prior periods, 2307s with sales, the VAT threshold, books with return lines; drafts the review memo | Reviewer | Cowork |
| Tax Compliance & Bookkeeping | BIR Mail Clerk | Matches BIR confirmations and notices to filings, attaches proof as a draft, flags LOA / PAN / FAN | Preparer | Cowork |
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
credential, and optional scheduled tasks. It does **not** hold the master templates
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

- **AI role.** `staff_profiles.role` gains `'ai'`. An AI employee has a branch,
  assigned clients (`staff_assignments`, as preparer) and a supervisor, so the
  existing queues, load and Scores pages show its work. It counts zero load points.
- **No human sign-in.** Each AI employee has an auth user with no password, Google
  or email login. It acts only through a credential.
- **Credentials.** Created in Settings → AI Employees, shown once, stored as a hash,
  with an expiry date, revocable at any time. Each one is bound to one AI employee.
- **Acting under the database rules.** When a request arrives with a valid
  credential, the app makes a short-lived session for that AI employee's user, so
  every query runs under the same row-level security as staff. The service key is
  never used for an AI employee's work.
- **Sign-off is refused for the AI role.** A new `private.is_human_staff()` check
  goes into every sign-off, approval, release, posting, lock and payment function and
  policy. A database test asserts that each of them refuses an AI caller.

**To confirm (A1):** whether Cowork stores a custom connector's sign-in per project or
once per account. If per project, each desk signs in as its own AI employee. If per
account, the Owner's connection gets a credential that may only act as AI employees,
every call names the AI employee acting, and both the Owner and the AI employee are
logged.

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
| Registration Runner, BIR Mail Clerk | None |
| All marketing employees | None, and no client-data tools at all |

The books policies (`books_read` and the ledger tables) gain a check on this level for
AI callers. Summary is served only through summary functions, never the entry tables.

## 7. The TalloCPA OS MCP server

### 7.1 Parts

1. **Endpoint**: one route on the app, e.g. `/api/mcp`, added in Cowork as a custom
   connector.
2. **Sign-in**: per AI employee (§5). OAuth for Cowork; a plain bearer credential for
   tests and n8n.
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
| Document Clerk | documents awaiting review; OCR fields and image; suggest type, period and account title; flag a duplicate; draft a return note |
| Onboarding Officer | onboarding checklist; read a COR into a client draft; draft the engagement; suggest a team; send a portal invite (approved template only); draft opening balances; propose kickoff times |
| Client Concierge | client status (deadlines, missing documents, open requests); 2307 list; registration status |
| Pre-Review Assistant | a filing with its prior periods; ledger summary; 2307s against sales; save a draft review memo |
| BIR Mail Clerk | unmatched BIR emails; propose a match to a filing; attach proof as a draft |
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

## 9. Settings → AI Employees (Owner only)

- List of AI employees: department, supervisor, status (on / off), where it runs.
- Per AI employee: assigned clients, books access level, tools granted, credential
  (create, expiry, revoke), daily call limit, monthly spending cap (in-app only).
- Activity: the log of calls, filterable by AI employee, client and tool.
- Scores page: items prepared, correction rate (how often people changed its draft),
  time from ready to accepted.

## 10. Data model (first draft)

- `staff_profiles.role` adds `'ai'`; new `ai_employees` (user_id, department, job,
  supervisor_user_id, runs_on, enabled, daily_limit, monthly_cap_centavos,
  books_level).
- `ai_credentials` (id, ai_user_id, hash, created_by, created_at, expires_at,
  revoked_at, last_used_at).
- `ai_tool_grants` (ai_user_id, tool, granted_by, granted_at).
- `ai_activity` (id, ai_user_id, acting_owner_user_id null, tool, client_id null,
  outcome, cost_centavos null, created_at).
- `ai_drafts` where a feature has no draft state of its own (kind, client_id,
  payload, status: open / accepted / rejected, decided_by).
- FS: `fs_templates`, `fs_note_library`, `fs_drafts`.
- Annual review: `annual_reviews` (client, taxable year, status, memo) and
  `annual_review_items` (check, books amount, returns amount, difference, status,
  explanation, recommendation); `external_return_figures` for returns filed elsewhere
  (drafted, confirmed_by).

## 11. Build order

1. **Foundation**: AI role, `is_human_staff()` on every sign-off path with tests,
   credentials, Settings → AI Employees, activity log, books access levels.
2. **MCP server**: endpoint, sign-in, tool registry with its tests, shared tools,
   reference library.
3. **Document Clerk** and **Onboarding Officer** tools; their Cowork desks.
4. **`ai-provider` with Qwen**; Client Concierge on Telegram and the portal.
5. **FS template, notes library and release validator** (useful to staff without AI);
   then the FS Preparer's tools and desk. **Annual reconciliation workpaper**, then the
   Annual Reviewer's tools and desk.
6. Pre-Review Assistant, Collections Clerk, Registration Runner, BIR Mail Clerk,
   Chief of Staff.
7. Marketing & Growth.

Each step ships with its tests and goes live switched off until the Owner turns it on.

## 12. Open items

| # | Item | Owner of the answer |
|---|---|---|
| A1 | Does Cowork keep a connector sign-in per project or per account? (§5) | Build: check in Cowork |
| A2 | Alibaba Cloud Model Studio terms against the Data Privacy Act; Singapore endpoint; which Qwen model by default | Owner, with Build |
| A3 | FS design, notes library, framework per client type, past FS samples (§8) | Owner |
| A4 | Approve the proposed books access defaults (§6) | Owner |
| A5 | Which client messages the Concierge may send on its own, and which go to a preparer first | Owner |
| A6 | Monthly spending cap per in-app AI employee | Owner |
| A7 | Claude plan for FS season if usage limits are reached | Owner |
| A8 | Should open annual differences block the annual ITR from being marked prepared until explained, as the monthly tie-outs do? Recommended: yes | Owner |
