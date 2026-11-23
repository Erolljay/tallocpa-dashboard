# Graph Report - tallocpa-dashboard  (2026-11-23)

## Corpus Check
- Corpus is ~32,331 words - fits in a single context window. You may not need a graph.

## Summary
- 526 nodes · 1297 edges · 44 communities (24 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.86)
- Token cost: 120,132 input · 0 output

## Community Hubs (Navigation)
- Client & Team Forms
- Deadline Engine & Dates
- Client Actions & Edit
- Core Schema & RLS
- App Shell, Nav & Auth Routes
- Dev Tooling Deps
- Settings Page & Rule Wording
- TypeScript Config
- CI Workflow
- Filing Job & Admin Client
- Deadline Engine Docs
- Runtime Deps
- Sign-in & Setup Docs
- Package Scripts
- Sign-off, Ledger & Payments
- Staff Schemas & Load
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- Supabase SSR Proxy
- Data Model & Security Docs
- ESLint Config
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 46 edges
2. `requireOwner()` - 28 edges
3. `next` - 25 edges
4. `Notice()` - 23 edges
5. `react` - 20 edges
6. `Button()` - 19 edges
7. `Skeleton()` - 19 edges
8. `PageHeader()` - 18 edges
9. `ClientDetail()` - 16 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Postgres Row-Level Security`  [INFERRED]
  README.md → docs/SPEC.md
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --references--> `Setup Guide`  [EXTRACTED]
  README.md → docs/SETUP.md
- `Nightly Filing Job (120 days ahead)` --conceptually_related_to--> `/api/cron/generate-filings (02:00 Manila)`  [INFERRED]
  README.md → docs/SETUP.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]

## Communities (44 total, 20 thin omitted)

### Community 0 - "Client & Team Forms"
Cohesion: 0.09
Nodes (65): react, FormState, ClientForm(), frequencyLabel, Props, AssignForm(), ClientUserForm(), EngagementForm() (+57 more)

### Community 1 - "Deadline Engine & Dates"
Cohesion: 0.08
Nodes (51): Rule, addDays(), addMonths(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso() (+43 more)

### Community 2 - "Client Actions & Edit"
Cohesion: 0.08
Nodes (49): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), updateClientAction(), ClientValues (+41 more)

### Community 3 - "Core Schema & RLS"
Cohesion: 0.09
Nodes (32): filing_instances_client_idx, filing_instances_due_idx, private.audit(), private.can_access_client(), private.can_manage_client(), private.staff_role(), public.acting_approver_delegations, public.audit_log (+24 more)

### Community 4 - "App Shell, Nav & Auth Routes"
Cohesion: 0.09
Nodes (29): nextConfig, next, AppLayout(), nav, NavLinks(), ownerNav, OwnerNavLinks(), roleLabel (+21 more)

### Community 5 - "Dev Tooling Deps"
Cohesion: 0.12
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "Settings Page & Rule Wording"
Cohesion: 0.14
Nodes (15): vitest@^5.1.1, vitest, RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, SettingsPage() (+7 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "CI Workflow"
Cohesion: 0.12
Nodes (15): runs-on, steps, jobs, check, name, on, pull_request, push (+7 more)

### Community 9 - "Filing Job & Admin Client"
Cohesion: 0.30
Nodes (8): server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, supabaseEnv(), runFilingGeneration(), supabaseAdmin()

### Community 10 - "Deadline Engine Docs"
Cohesion: 0.21
Nodes (11): /api/cron/generate-filings (02:00 Manila), Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET), Withholding Returns Follow Calendar Year (calendar_year flag), Onboarding a Client Workflow, Nightly Filing Instance Generation (120 days ahead, 60 back), Filing Obligations & Deadline Engine, Weekend/Holiday Roll to Next Working Day, BIR Deadline Engine (src/lib/deadlines) (+3 more)

### Community 11 - "Runtime Deps"
Cohesion: 0.18
Nodes (11): dependencies, lucide-react@^1.77.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, server-only@^0.0.1, @supabase/supabase-js@^2.119.2, zod@^4.6.7 (+3 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "Package Scripts"
Cohesion: 0.22
Nodes (9): scripts, build, db:seed:generate, dev, lint, start, test, test:db (+1 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "Staff Schemas & Load"
Cohesion: 0.39
Nodes (6): clientUserSchema, email, inviteStaffSchema, loadPoints(), name, updateStaffSchema

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "Supabase SSR Proxy"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "ESLint Config"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

## Knowledge Gaps
- **15 isolated node(s):** `Decisions Log (Q1-Q61)`, `Develop Commands (pnpm dev/test/test:db/db:seed:generate)`, `Stack (Next.js, Supabase, Gemini, n8n, Resend)`, `Magic Link Email with 6-digit Code`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 142 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `App Shell, Nav & Auth Routes` to `Client & Team Forms`, `Client Actions & Edit`, `Dev Tooling Deps`, `Filing Job & Admin Client`, `Runtime Deps`, `Supabase SSR Proxy`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **What connects `Decisions Log (Q1-Q61)`, `Develop Commands (pnpm dev/test/test:db/db:seed:generate)`, `Stack (Next.js, Supabase, Gemini, n8n, Resend)` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Client & Team Forms` be split into smaller, more focused modules?**
  _Cohesion score 0.08672086720867209 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Client & Team Forms` to `Client Actions & Edit`, `App Shell, Nav & Auth Routes`, `Dev Tooling Deps`, `Settings Page & Rule Wording`, `Runtime Deps`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `Deadline Engine & Dates` be split into smaller, more focused modules?**
  _Cohesion score 0.07932692307692307 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `Settings Page & Rule Wording` to `Deadline Engine & Dates`, `Client Actions & Edit`, `App Shell, Nav & Auth Routes`, `Dev Tooling Deps`, `Staff Schemas & Load`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `Client Actions & Edit` be split into smaller, more focused modules?**
  _Cohesion score 0.08090117767537122 - nodes in this community are weakly interconnected._