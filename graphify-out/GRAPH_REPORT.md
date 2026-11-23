# Graph Report - tallocpa-dashboard  (2026-11-23)

## Corpus Check
- 94 files · ~37,814 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .example 1, .ico 1)

## Summary
- 586 nodes · 1498 edges · 46 communities (26 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.86)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `2da7f0ca`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- clients/[id]/page.tsx
- Deadline Engine & Dates
- Client Actions & Edit
- Core Schema & RLS
- next
- Dev Tooling Deps
- Settings Page & Rule Wording
- TypeScript Config
- CI Workflow
- ui.tsx
- Deadline Engine Docs
- deadlines/actions.ts
- Sign-in & Setup Docs
- Package Scripts
- Sign-off, Ledger & Payments
- admin.ts
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- vitest
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
- dependencies
- proxy.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 56 edges
2. `Notice()` - 29 edges
3. `requireOwner()` - 28 edges
4. `next` - 28 edges
5. `Skeleton()` - 23 edges
6. `react` - 23 edges
7. `PageHeader()` - 22 edges
8. `Button()` - 21 edges
9. `Badge()` - 20 edges
10. `Input()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Postgres Row-Level Security`  [INFERRED]
  README.md → docs/SPEC.md
- `Nightly Filing Job (120 days ahead)` --conceptually_related_to--> `/api/cron/generate-filings (02:00 Manila)`  [INFERRED]
  README.md → docs/SETUP.md
- `New Client from COR` --implements--> `Onboarding a Client Workflow`  [INFERRED]
  README.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (46 total, 20 thin omitted)

### Community 0 - "clients/[id]/page.tsx"
Cohesion: 0.08
Nodes (43): FilingListRow, FilingTable(), Deadlines(), DeadlinesPage(), Event, eventText, Filing(), FilingPage() (+35 more)

### Community 1 - "Deadline Engine & Dates"
Cohesion: 0.10
Nodes (44): Rule, addDays(), addMonths(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso() (+36 more)

### Community 2 - "Client Actions & Edit"
Cohesion: 0.08
Nodes (49): zod@^4.6.7, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction() (+41 more)

### Community 3 - "Core Schema & RLS"
Cohesion: 0.08
Nodes (36): filing_instances_client_idx, filing_instances_due_idx, private.audit(), private.can_access_client(), private.can_manage_client(), private.staff_role(), public.acting_approver_delegations, public.audit_log (+28 more)

### Community 4 - "next"
Cohesion: 0.07
Nodes (35): nextConfig, next, advanceFilingAction(), amount, SignOffState, stepData(), text(), AppLayout() (+27 more)

### Community 5 - "Dev Tooling Deps"
Cohesion: 0.12
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "Settings Page & Rule Wording"
Cohesion: 0.25
Nodes (12): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, SettingsPage(), describeDue(), FREQUENCY_SECTIONS (+4 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "CI Workflow"
Cohesion: 0.12
Nodes (15): runs-on, steps, jobs, check, name, on, pull_request, push (+7 more)

### Community 9 - "ui.tsx"
Cohesion: 0.10
Nodes (61): react, FormState, ClientForm(), ClientValues, frequencyLabel, Props, EditClient(), EditClientPage() (+53 more)

### Community 10 - "Deadline Engine Docs"
Cohesion: 0.21
Nodes (11): /api/cron/generate-filings (02:00 Manila), Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET), Withholding Returns Follow Calendar Year (calendar_year flag), Onboarding a Client Workflow, Nightly Filing Instance Generation (120 days ahead, 60 back), Filing Obligations & Deadline Engine, Weekend/Holiday Roll to Next Working Day, BIR Deadline Engine (src/lib/deadlines) (+3 more)

### Community 11 - "deadlines/actions.ts"
Cohesion: 0.44
Nodes (6): GET(), generateFilingsNow(), GenerateState, GenerateButton(), runFilingGeneration(), supabaseAdmin()

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "Package Scripts"
Cohesion: 0.22
Nodes (9): scripts, build, db:seed:generate, dev, lint, start, test, test:db (+1 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "admin.ts"
Cohesion: 0.36
Nodes (5): server-only@^0.0.1, @supabase/supabase-js@^2.119.2, server-only, @supabase/supabase-js, supabaseEnv()

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "vitest"
Cohesion: 0.12
Nodes (13): vitest@^5.1.1, vitest, obligationsForTaxTypes(), TaxTypeError, forms(), seedDeadlineRules, SeedHoliday, seedHolidays (+5 more)

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

### Community 44 - "dependencies"
Cohesion: 0.29
Nodes (7): dependencies, lucide-react@^1.77.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, lucide-react, react-dom

### Community 45 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

## Knowledge Gaps
- **15 isolated node(s):** `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)`, `Weekend/Holiday Roll to Next Working Day`, `Magic Link Email with 6-digit Code`, `Stack (Next.js, Supabase, Gemini, n8n, Resend)` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 159 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `clients/[id]/page.tsx`, `Client Actions & Edit`, `Dev Tooling Deps`, `ui.tsx`, `deadlines/actions.ts`, `dependencies`, `proxy.ts`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **What connects `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)`, `Weekend/Holiday Roll to Next Working Day` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `clients/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07581453634085213 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `clients/[id]/page.tsx`, `Deadline Engine & Dates`, `Client Actions & Edit`, `next`, `Dev Tooling Deps`, `Settings Page & Rule Wording`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Should `Deadline Engine & Dates` be split into smaller, more focused modules?**
  _Cohesion score 0.1013277428371768 - nodes in this community are weakly interconnected._
- **Why does `supabaseServer()` connect `Client Actions & Edit` to `clients/[id]/page.tsx`, `next`, `Settings Page & Rule Wording`, `ui.tsx`, `admin.ts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `Client Actions & Edit` be split into smaller, more focused modules?**
  _Cohesion score 0.07589285714285714 - nodes in this community are weakly interconnected._