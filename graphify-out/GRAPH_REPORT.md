# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 296 files · ~194,545 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 4, .css 2, .example 1)

## Summary
- 1858 nodes · 6400 edges · 90 communities (74 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 78 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `465670d6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- Deadline Engine & Dates
- clients/actions.ts
- vat.ts
- Skeleton
- package.json
- fields.ts
- TypeScript Config
- CI Workflow
- settings/page.tsx
- Deadline Engine Docs
- documents/labels.ts
- Sign-in & Setup Docs
- profile.ts
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- copy-opencv.mjs
- Data Model & Security Docs
- supabaseServer
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- payroll/data.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- payroll/payroll.test.ts
- vitest
- [clientId]/page.tsx
- returns/load.ts
- fees/data.ts
- scripts
- alphalist.ts
- quote.ts
- Badge
- parties/[id]/page.tsx
- payroll/types.ts
- gemini.ts
- register-xlsx.ts
- next
- @supabase/supabase-js
- worksheet/page.tsx
- Centavos
- returns/types.ts
- parties/parties.test.ts
- fees/[id]/page.tsx
- items.ts
- qap.ts
- Apple Design
- withholding.test.ts
- testing.ts
- client-form.tsx
- clients/[id]/page.tsx
- requireOwner
- fees/types.ts
- ui.tsx
- Animation Performance
- brand/forms.tsx
- payment-forms.tsx
- template.ts
- documents/[id]/page.tsx
- quote/page.tsx
- settings/actions.ts
- form-2316.tsx
- review/page.tsx
- 2316/page.tsx
- staff/actions.ts
- returns/page.tsx
- sign-in-form.tsx
- staff/page.tsx
- generate-qap-fixture.mjs
- period.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 150 edges
2. `Notice()` - 94 edges
3. `Skeleton()` - 85 edges
4. `next` - 80 edges
5. `Button()` - 78 edges
6. `Card()` - 77 edges
7. `Badge()` - 76 edges
8. `requireOwner()` - 75 edges
9. `react` - 70 edges
10. `PageHeader()` - 70 edges

## Surprising Connections (you probably didn't know these)
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Postgres Row-Level Security`  [INFERRED]
  README.md → docs/SPEC.md
- `upload()` --indirect_call--> `month()`  [INFERRED]
  src/components/document-upload.tsx → src/lib/scores/scores.test.ts
- `Nightly Filing Job (120 days ahead)` --conceptually_related_to--> `/api/cron/generate-filings (02:00 Manila)`  [INFERRED]
  README.md → docs/SETUP.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (90 total, 16 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.09
Nodes (33): advanceFilingAction(), amount, SignOffState, stepData(), text(), Event, eventText, Filing() (+25 more)

### Community 1 - "Deadline Engine & Dates"
Cohesion: 0.05
Nodes (75): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), Rule, CloseCycleButton(), Message() (+67 more)

### Community 2 - "clients/actions.ts"
Cohesion: 0.19
Nodes (14): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), updateClientAction(), assignmentSchema, clientFields, editClientSchema (+6 more)

### Community 3 - "vat.ts"
Cohesion: 0.06
Nodes (104): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+96 more)

### Community 4 - "Skeleton"
Cohesion: 0.11
Nodes (46): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), PayrollMonth(), PayrollMonthPage(), when(), Payroll() (+38 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (26): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+18 more)

### Community 6 - "fields.ts"
Cohesion: 0.16
Nodes (17): approveDocumentAction(), checkFields(), Issue, num(), msgs(), ok, FieldKey, keys (+9 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "CI Workflow"
Cohesion: 0.12
Nodes (15): runs-on, steps, jobs, check, name, on, pull_request, push (+7 more)

### Community 9 - "settings/page.tsx"
Cohesion: 0.22
Nodes (15): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+7 more)

### Community 10 - "Deadline Engine Docs"
Cohesion: 0.21
Nodes (11): /api/cron/generate-filings (02:00 Manila), Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET), Withholding Returns Follow Calendar Year (calendar_year flag), Onboarding a Client Workflow, Nightly Filing Instance Generation (120 days ahead, 60 back), Filing Obligations & Deadline Engine, Weekend/Holiday Roll to Next Working Day, BIR Deadline Engine (src/lib/deadlines) (+3 more)

### Community 11 - "documents/labels.ts"
Cohesion: 0.05
Nodes (64): lucide-react, Doc, DocumentsCard(), when(), ExceptionRow, Row, AppLayout(), nav (+56 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.07
Nodes (40): BrandSettingsState, refresh(), saveBrandSectionAction(), SAVED, BRAND_FILES, BrandFileKind, birSchema, blank() (+32 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, lucide-react@^1.77.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, server-only@^0.0.1, @supabase/ssr@^0.12.7, @supabase/supabase-js@^2.119.2 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "supabaseServer"
Cohesion: 0.20
Nodes (11): zod, GET(), GET(), POST(), GET(), code, email, SignInState (+3 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "payroll/data.ts"
Cohesion: 0.11
Nodes (38): AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+30 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (34): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+26 more)

### Community 42 - "Notice"
Cohesion: 0.19
Nodes (35): DocReviewActions(), AssignForm(), ClientUserForm(), EngagementForm(), EmployeeForm(), EmployeeUpload(), ItemForm(), PayrollSettingsForm() (+27 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.14
Nodes (37): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+29 more)

### Community 44 - "payroll/payroll.test.ts"
Cohesion: 0.11
Nodes (34): GridRow, MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion() (+26 more)

### Community 45 - "vitest"
Cohesion: 0.08
Nodes (11): pg@^8.23.1, vitest@^5.1.1, pg, vitest, ctx, input, root, root (+3 more)

### Community 46 - "[clientId]/page.tsx"
Cohesion: 0.12
Nodes (32): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+24 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.13
Nodes (29): recomputeWorksheetAction(), WorksheetState, GET(), LOCKED_STATUSES, VatData, FilingRow, ListedDocument, loadWorksheet() (+21 more)

### Community 48 - "fees/data.ts"
Cohesion: 0.13
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "alphalist.ts"
Cohesion: 0.13
Nodes (27): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+19 more)

### Community 51 - "quote.ts"
Cohesion: 0.13
Nodes (29): EstimatedProfile, buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange(), matches() (+21 more)

### Community 52 - "Badge"
Cohesion: 0.17
Nodes (22): Detail(), StatementPage(), portalContext(), Home(), PortalHome(), Returns(), Detail(), PortalStatementDetail() (+14 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.12
Nodes (28): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList(), Row (+20 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.10
Nodes (24): exceljs@4.4.0, exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET (+16 more)

### Community 55 - "gemini.ts"
Cohesion: 0.12
Nodes (19): OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider(), call() (+11 more)

### Community 56 - "register-xlsx.ts"
Cohesion: 0.15
Nodes (25): file(), GET(), safe(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), GET() (+17 more)

### Community 57 - "next"
Cohesion: 0.12
Nodes (14): nextConfig, next, server-only, FilingTable(), Deadlines(), DeadlinesPage(), nextEffectiveDate(), metadata (+6 more)

### Community 58 - "@supabase/supabase-js"
Cohesion: 0.16
Nodes (15): @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, GenerateButton(), sendEmail(), cycleMessage(), dayFmt (+7 more)

### Community 59 - "worksheet/page.tsx"
Cohesion: 0.18
Nodes (20): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+12 more)

### Community 60 - "Centavos"
Cohesion: 0.11
Nodes (24): AlphalistRow, Form2316Line, AnnualSummary, PayrollItem, CheckedRegister, checkRegister(), fmt(), ID_HEADERS (+16 more)

### Community 61 - "returns/types.ts"
Cohesion: 0.18
Nodes (19): PayrollContext, agentBackground(), agentErrors(), atcSchedule(), detailSchedule(), totalsByAtc(), PREVIOUSLY_REMITTED, INPUTS (+11 more)

### Community 62 - "parties/parties.test.ts"
Cohesion: 0.18
Nodes (18): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), normalizeTin(), lookupParties(), person (+10 more)

### Community 63 - "fees/[id]/page.tsx"
Cohesion: 0.18
Nodes (21): longDate(), statusLabel, statusTone, ActivateForm(), billingHint, CreateFromTemplateForm(), DeleteDraftButton(), NewDraftForm() (+13 more)

### Community 64 - "items.ts"
Cohesion: 0.14
Nodes (20): Release2316Form(), PayrollSetupPage(), Setup(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release() (+12 more)

### Community 65 - "qap.ts"
Cohesion: 0.15
Nodes (19): tinDashed(), EwtLine, tinDigits(), branchFromTin(), buildQapRows(), csvCell(), mmYYYY(), MONTH_NAMES (+11 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "withholding.test.ts"
Cohesion: 0.12
Nodes (11): BUSINESS_TAX_FORMS, form1601C, PAYROLL_FORMS, form0619E, form1601EQ, WITHHOLDING_FORMS, client, Q1 (+3 more)

### Community 68 - "testing.ts"
Cohesion: 0.21
Nodes (16): individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput, lineNo() (+8 more)

### Community 69 - "client-form.tsx"
Cohesion: 0.20
Nodes (16): ClientForm(), ClientValues, frequencyLabel, Props, EditClient(), EditClientPage(), NewClientPage(), OwnerOnly() (+8 more)

### Community 70 - "clients/[id]/page.tsx"
Cohesion: 0.17
Nodes (17): FormState, removeAssignmentAction(), setClientStatusAction(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail(), ClientPage() (+9 more)

### Community 71 - "requireOwner"
Cohesion: 0.22
Nodes (19): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+11 more)

### Community 72 - "fees/types.ts"
Cohesion: 0.16
Nodes (17): EngagementRow, TaxpayerType, ExistingClient, count(), first(), pick(), profileFromQuery(), QuerySource (+9 more)

### Community 73 - "ui.tsx"
Cohesion: 0.18
Nodes (14): react, DirectoryParty, ReviewForm(), typeLabel, ButtonStyle, cx(), sizes, tones (+6 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "brand/forms.tsx"
Cohesion: 0.22
Nodes (16): BrandFileUpload(), FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm() (+8 more)

### Community 76 - "payment-forms.tsx"
Cohesion: 0.25
Nodes (16): PaymentSettings(), accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+8 more)

### Community 77 - "template.ts"
Cohesion: 0.12
Nodes (13): estimateProfile(), has(), items, PRICES, schedule, settings, items, DOCUMENT_BANDS (+5 more)

### Community 78 - "documents/[id]/page.tsx"
Cohesion: 0.22
Nodes (12): DocumentReviewPage(), Review(), LockFiling, lockingFiling(), Party, ABBREVIATIONS, nameTokens(), ResolvedParty (+4 more)

### Community 79 - "quote/page.tsx"
Cohesion: 0.22
Nodes (15): loadSchedules(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuoteView() (+7 more)

### Community 80 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.26
Nodes (14): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+6 more)

### Community 82 - "review/page.tsx"
Cohesion: 0.24
Nodes (10): Queue(), ReviewPage(), Row, Section(), peso, QueueFiling, QueueViewer, ReviewQueue (+2 more)

### Community 83 - "2316/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 84 - "staff/actions.ts"
Cohesion: 0.28
Nodes (10): addClientUserAction(), fieldErrors(), inviteStaffAction(), updateStaffAction(), ensureLogin(), clientUserSchema, email, inviteStaffSchema (+2 more)

### Community 85 - "returns/page.tsx"
Cohesion: 0.33
Nodes (7): FilingListRow, PortalReturns(), Row, FILED, filingStatusLabel, filingStatusTone, fmt

### Community 86 - "sign-in-form.tsx"
Cohesion: 0.39
Nodes (7): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), GoogleMark(), SignInForm()

### Community 87 - "staff/page.tsx"
Cohesion: 0.52
Nodes (5): InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "period.ts"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

## Knowledge Gaps
- **15 isolated node(s):** `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)`, `Weekend/Holiday Roll to Next Working Day`, `Magic Link Email with 6-digit Code`, `Stack (Next.js, Supabase, Gemini, n8n, Resend)` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 412 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `filings/[id]/page.tsx`, `Deadline Engine & Dates`, `clients/actions.ts`, `vat.ts`, `package.json`, `fields.ts`, `settings/page.tsx`, `documents/labels.ts`, `profile.ts`, `supabaseServer`, `payroll/data.ts`, `scores/page.tsx`, `payroll/payroll.test.ts`, `[clientId]/page.tsx`, `returns/load.ts`, `fees/data.ts`, `quote.ts`, `gemini.ts`, `@supabase/supabase-js`, `worksheet/page.tsx`, `parties/parties.test.ts`, `qap.ts`, `withholding.test.ts`, `testing.ts`, `client-form.tsx`, `template.ts`, `documents/[id]/page.tsx`, `settings/actions.ts`, `review/page.tsx`, `staff/actions.ts`, `period.ts`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **What connects `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)`, `Weekend/Holiday Roll to Next Working Day` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09176788124156546 - nodes in this community are weakly interconnected._
- **Why does `supabaseServer()` connect `supabaseServer` to `filings/[id]/page.tsx`, `Deadline Engine & Dates`, `clients/actions.ts`, `Skeleton`, `fields.ts`, `settings/page.tsx`, `documents/labels.ts`, `profile.ts`, `payroll/data.ts`, `scores/page.tsx`, `payroll/forms.tsx`, `[clientId]/page.tsx`, `returns/load.ts`, `fees/data.ts`, `Badge`, `parties/[id]/page.tsx`, `register-xlsx.ts`, `next`, `@supabase/supabase-js`, `worksheet/page.tsx`, `parties/parties.test.ts`, `fees/[id]/page.tsx`, `client-form.tsx`, `clients/[id]/page.tsx`, `requireOwner`, `ui.tsx`, `brand/forms.tsx`, `payment-forms.tsx`, `documents/[id]/page.tsx`, `quote/page.tsx`, `settings/actions.ts`, `review/page.tsx`, `staff/actions.ts`, `sign-in-form.tsx`, `staff/page.tsx`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `Deadline Engine & Dates` be split into smaller, more focused modules?**
  _Cohesion score 0.05284831846259437 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `filings/[id]/page.tsx`, `Deadline Engine & Dates`, `clients/actions.ts`, `Skeleton`, `package.json`, `fields.ts`, `settings/page.tsx`, `documents/labels.ts`, `profile.ts`, `dependencies`, `supabaseServer`, `payroll/data.ts`, `scores/page.tsx`, `payroll/forms.tsx`, `[clientId]/page.tsx`, `returns/load.ts`, `fees/data.ts`, `Badge`, `parties/[id]/page.tsx`, `register-xlsx.ts`, `@supabase/supabase-js`, `worksheet/page.tsx`, `parties/parties.test.ts`, `fees/[id]/page.tsx`, `items.ts`, `client-form.tsx`, `clients/[id]/page.tsx`, `requireOwner`, `ui.tsx`, `brand/forms.tsx`, `payment-forms.tsx`, `documents/[id]/page.tsx`, `quote/page.tsx`, `settings/actions.ts`, `form-2316.tsx`, `review/page.tsx`, `2316/page.tsx`, `staff/actions.ts`, `returns/page.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Should `vat.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.060154450616447634 - nodes in this community are weakly interconnected._