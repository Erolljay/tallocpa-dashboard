# Graph Report - tallocpa-dashboard  (2026-11-23)

## Corpus Check
- Corpus is ~25,919 words - fits in a single context window. You may not need a graph.

## Summary
- 445 nodes · 1034 edges · 23 communities (16 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.85)
- Token cost: 120,842 input · 0 output

## Community Hubs (Navigation)
- Deadline Engine & Dates
- Core Schema & RLS
- Client & Staff Actions
- Decisions & Setup
- Dev Tooling Deps
- Client & Deadline Pages
- Client Detail Forms
- Auth Routes & Supabase SSR
- Runtime Deps & Cron Route
- TypeScript Config
- CI Workflow
- Seed Data & DB Tests
- App Shell & Login
- Sign-off, Ledger & Payments
- Brand & Fee Schedule
- Product Spec & Migration
- DB Test Script
- Vercel Cron Config
- pnpm Workspace

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 34 edges
2. `next` - 22 edges
3. `Notice()` - 18 edges
4. `react` - 17 edges
5. `Button()` - 16 edges
6. `requireOwner()` - 16 edges
7. `compilerOptions` - 16 edges
8. `Skeleton()` - 15 edges
9. `PageHeader()` - 14 edges
10. `ClientDetail()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Stack: Next.js/Vercel, Supabase Singapore, Gemini OCR, n8n, Resend` --semantically_similar_to--> `Technology Choices & Running Cost`  [INFERRED] [semantically similar]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Nightly Filing Job (120 days ahead)` --conceptually_related_to--> `Filing Obligations & Deadline Engine`  [AMBIGUOUS]
  README.md → docs/SPEC.md
- `Next.js Agent Rules (breaking-changes notice)` --conceptually_related_to--> `Technology Choices & Running Cost`  [INFERRED]
  AGENTS.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Return preparation and approval flow** — docs_spec_ocr_review_queue, docs_spec_tax_computation_returns, docs_spec_signoff_chain, docs_spec_payment_check, docs_spec_period_lock [INFERRED 0.85]
- **Deadline rules to dated filing instances** — docs_spec_deadline_engine, readme_bir_deadline_engine, readme_nightly_filing_job, docs_setup_generate_filings_cron, docs_setup_server_only_keys [INFERRED 0.85]
- **Invite-only authentication and access control** — docs_setup_invite_only_sign_in, docs_setup_google_sign_in, docs_setup_first_owner, docs_spec_roles, docs_spec_row_level_security [INFERRED 0.75]

## Communities (23 total, 7 thin omitted)

### Community 0 - "Deadline Engine & Dates"
Cohesion: 0.11
Nodes (39): addDays(), addMonths(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), toIso() (+31 more)

### Community 1 - "Core Schema & RLS"
Cohesion: 0.09
Nodes (31): filing_instances_client_idx, filing_instances_due_idx, private.audit(), private.can_access_client(), private.can_manage_client(), private.staff_role(), public.acting_approver_delegations, public.audit_log (+23 more)

### Community 2 - "Client & Staff Actions"
Cohesion: 0.10
Nodes (33): zod@^4.6.7, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), addClientUserAction() (+25 more)

### Community 3 - "Decisions & Setup"
Cohesion: 0.06
Nodes (31): First Owner Bootstrap (staff_profiles insert), /api/cron/generate-filings (02:00 Manila), Google OAuth Sign-In, Invite-Only Sign-In (signups disabled), Resend Custom SMTP, Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET), Supabase Project Setup (Singapore), Vercel Deployment (app.tallocpa.com) (+23 more)

### Community 4 - "Dev Tooling Deps"
Cohesion: 0.07
Nodes (37): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+29 more)

### Community 5 - "Client & Deadline Pages"
Cohesion: 0.13
Nodes (30): ClientPage(), NewClientPage(), OwnerOnly(), ClientList(), ClientsPage(), Row, FilingListRow, FilingTable() (+22 more)

### Community 6 - "Client Detail Forms"
Cohesion: 0.18
Nodes (31): react, FormState, AssignForm(), ClientUserForm(), EngagementForm(), RemoveClientUserButton(), StatusButton(), ClientDetail() (+23 more)

### Community 7 - "Auth Routes & Supabase SSR"
Cohesion: 0.10
Nodes (21): nextConfig, @supabase/ssr@^0.12.7, next, @supabase/ssr, GET(), GET(), POST(), metadata (+13 more)

### Community 8 - "Runtime Deps & Cron Route"
Cohesion: 0.14
Nodes (18): dependencies, lucide-react@^1.77.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, server-only@^0.0.1, @supabase/supabase-js@^2.119.2, lucide-react (+10 more)

### Community 9 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "CI Workflow"
Cohesion: 0.12
Nodes (15): runs-on, steps, jobs, check, name, on, pull_request, push (+7 more)

### Community 11 - "Seed Data & DB Tests"
Cohesion: 0.18
Nodes (7): vitest@^5.1.1, vitest, seedDeadlineRules, seedHolidays2027, buildSeedSql(), q(), root

### Community 12 - "App Shell & Login"
Cohesion: 0.25
Nodes (11): AppLayout(), nav, roleLabel, UserMenu(), errors, Form(), LoginPage(), PortalPage() (+3 more)

### Community 13 - "Sign-off, Ledger & Payments"
Cohesion: 0.33
Nodes (6): Per-Client Double-Entry Ledger, Collections & Statement of Account, Payment Check at Owner Approval, Period Lock & Amendment, Sign-off Chain (Prepared to Proof Uploaded), Tax Computation & Return Worksheet

### Community 14 - "Brand & Fee Schedule"
Cohesion: 0.33
Nodes (5): Tallo CPA Brand Design System, Brands & Firm Settings, Appendix A: Draft Fee Bands & Calculator Review, Fee Schedule & Pricing Model, Gross Receipts Watch (warn at PHP 2.5M)

### Community 15 - "Product Spec & Migration"
Cohesion: 0.50
Nodes (4): Decisions Log (Q1-Q61), Migration from Moxie, TalloCPA OS Product Specification, TalloCPA OS

## Ambiguous Edges - Review These
- `Nightly Filing Job (120 days ahead)` → `Filing Obligations & Deadline Engine`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **14 isolated node(s):** `Stack: Next.js/Vercel, Supabase Singapore, Gemini OCR, n8n, Resend`, `Google OAuth Sign-In`, `First Owner Bootstrap (staff_profiles insert)`, `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`, `Gross Receipts Watch (warn at PHP 2.5M)` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 122 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Auth Routes & Supabase SSR` to `Client & Staff Actions`, `Dev Tooling Deps`, `Client & Deadline Pages`, `Client Detail Forms`, `Runtime Deps & Cron Route`, `App Shell & Login`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **What connects `Stack: Next.js/Vercel, Supabase Singapore, Gemini OCR, n8n, Resend`, `Google OAuth Sign-In`, `First Owner Bootstrap (staff_profiles insert)` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Deadline Engine & Dates` be split into smaller, more focused modules?**
  _Cohesion score 0.10629251700680271 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `Seed Data & DB Tests` to `Deadline Engine & Dates`, `Client & Staff Actions`, `Dev Tooling Deps`, `Auth Routes & Supabase SSR`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Should `Core Schema & RLS` be split into smaller, more focused modules?**
  _Cohesion score 0.0919661733615222 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Client Detail Forms` to `Runtime Deps & Cron Route`, `App Shell & Login`, `Dev Tooling Deps`, `Client & Deadline Pages`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Nightly Filing Job (120 days ahead)` and `Filing Obligations & Deadline Engine`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._