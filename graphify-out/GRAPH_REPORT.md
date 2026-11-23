# Graph Report - tallocpa-dashboard  (2026-11-23)

## Corpus Check
- 127 files · ~52,510 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .example 1, .ico 1)

## Summary
- 763 nodes · 2081 edges · 50 communities (30 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.86)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `dee061f0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- clients/[id]/page.tsx
- Deadline Engine & Dates
- Client Actions & Edit
- 20261123000001_core.sql
- document-scanner.tsx
- package.json
- review-form.tsx
- TypeScript Config
- CI Workflow
- ui.tsx
- Deadline Engine Docs
- documents-card.tsx
- Sign-in & Setup Docs
- filings/actions.ts
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- copy-opencv.mjs
- Data Model & Security Docs
- next
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- db.test.ts
- scripts
- proxy.ts
- eslint.config.mjs
- vitest
- deadlines/actions.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 73 edges
2. `next` - 37 edges
3. `Notice()` - 37 edges
4. `react` - 33 edges
5. `Skeleton()` - 31 edges
6. `Badge()` - 28 edges
7. `requireOwner()` - 28 edges
8. `Button()` - 27 edges
9. `PageHeader()` - 26 edges
10. `Card()` - 24 edges

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

## Communities (50 total, 20 thin omitted)

### Community 0 - "clients/[id]/page.tsx"
Cohesion: 0.07
Nodes (54): NewClientPage(), ClientList(), ClientsPage(), Row, FilingListRow, FilingTable(), Deadlines(), DeadlinesPage() (+46 more)

### Community 1 - "Deadline Engine & Dates"
Cohesion: 0.09
Nodes (47): Rule, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), toIso() (+39 more)

### Community 2 - "Client Actions & Edit"
Cohesion: 0.06
Nodes (68): zod@^4.6.7, server-only, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState (+60 more)

### Community 3 - "20261123000001_core.sql"
Cohesion: 0.05
Nodes (55): filing_instances_client_idx, filing_instances_due_idx, private.audit(), private.can_access_client(), private.can_manage_client(), private.staff_role(), public.acting_approver_delegations, public.audit_log (+47 more)

### Community 4 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 5 - "package.json"
Cohesion: 0.12
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.08
Nodes (37): approveDocumentAction(), DocumentReviewPage(), typeLabel, DocActionState, reviewDocumentAction(), checkFields(), Issue, num() (+29 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "CI Workflow"
Cohesion: 0.12
Nodes (15): runs-on, steps, jobs, check, name, on, pull_request, push (+7 more)

### Community 9 - "ui.tsx"
Cohesion: 0.10
Nodes (57): react, ClientForm(), DocReviewActions(), AssignForm(), ClientUserForm(), EngagementForm(), RemoveAssignmentButton(), RemoveClientUserButton() (+49 more)

### Community 10 - "Deadline Engine Docs"
Cohesion: 0.21
Nodes (11): /api/cron/generate-filings (02:00 Manila), Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET), Withholding Returns Follow Calendar Year (calendar_year flag), Onboarding a Client Workflow, Nightly Filing Instance Generation (120 days ahead, 60 back), Filing Obligations & Deadline Engine, Weekend/Holiday Roll to Next Working Day, BIR Deadline Engine (src/lib/deadlines) (+3 more)

### Community 11 - "documents-card.tsx"
Cohesion: 0.12
Nodes (37): Doc, DocumentsCard(), when(), Row, PortalClient, portalContext(), Doc, Documents() (+29 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "filings/actions.ts"
Cohesion: 0.43
Nodes (6): advanceFilingAction(), amount, SignOffState, stepData(), text(), SignOffAction

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, next@16.4.6, react@19.3.0, react-dom@19.3.0, server-only@^0.0.1, @supabase/supabase-js@^2.119.2, react-dom, @supabase/supabase-js

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "copy-opencv.mjs"
Cohesion: 0.22
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "next"
Cohesion: 0.07
Nodes (32): nextConfig, lucide-react@^1.77.0, lucide-react, next, AppLayout(), nav, NavLinks(), ownerNav (+24 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 45 - "db.test.ts"
Cohesion: 0.24
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 51 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 53 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 55 - "vitest"
Cohesion: 0.29
Nodes (3): vitest@^5.1.1, vitest, input

### Community 58 - "deadlines/actions.ts"
Cohesion: 0.39
Nodes (6): GET(), generateFilingsNow(), GenerateState, GenerateButton(), runFilingGeneration(), runPendingOcr()

## Knowledge Gaps
- **15 isolated node(s):** `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)`, `Weekend/Holiday Roll to Next Working Day`, `Magic Link Email with 6-digit Code`, `Stack (Next.js, Supabase, Gemini, n8n, Resend)` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 196 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `clients/[id]/page.tsx`, `Deadline Engine & Dates`, `Client Actions & Edit`, `document-scanner.tsx`, `package.json`, `review-form.tsx`, `ui.tsx`, `documents-card.tsx`, `db.test.ts`, `next`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)`, `Weekend/Holiday Roll to Next Working Day` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `clients/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0650103519668737 - nodes in this community are weakly interconnected._
- **Why does `react` connect `ui.tsx` to `clients/[id]/page.tsx`, `Client Actions & Edit`, `document-scanner.tsx`, `package.json`, `review-form.tsx`, `documents-card.tsx`, `dependencies`, `next`, `deadlines/actions.ts`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Should `Deadline Engine & Dates` be split into smaller, more focused modules?**
  _Cohesion score 0.09134906231094979 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `clients/[id]/page.tsx`, `Client Actions & Edit`, `package.json`, `review-form.tsx`, `ui.tsx`, `documents-card.tsx`, `filings/actions.ts`, `dependencies`, `proxy.ts`, `deadlines/actions.ts`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Should `Client Actions & Edit` be split into smaller, more focused modules?**
  _Cohesion score 0.055633473585787754 - nodes in this community are weakly interconnected._