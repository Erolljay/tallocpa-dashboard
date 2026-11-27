# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 978 files · ~806,649 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6036 nodes · 21389 edges · 216 communities (195 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 188 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `a49b452f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- Centavos
- migrate.yml
- ui.ts
- public.ts
- devDependencies
- returns/types.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- vat.ts
- Sign-in & Setup Docs
- cx
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- modal.tsx
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- cwt-tracker.ts
- scores/page.tsx
- compare.ts
- payroll/types.ts
- queries.ts
- upload/page.tsx
- payroll/forms.tsx
- settings/actions.ts
- marketing/page.tsx
- scripts
- slots.ts
- fees/[id]/page.tsx
- showDate
- webhook.ts
- module-pages.tsx
- board.ts
- react
- button.tsx
- returns/types.ts
- steps.ts
- portal/page.tsx
- ledger/data.ts
- work/load.ts
- lock-bar.tsx
- ref_node_fs
- invoice-pages.tsx
- Apple Design
- engine.ts
- testing.ts
- params.ts
- year-end/page.tsx
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- income.ts
- stat-cards.tsx
- blocks.tsx
- site-document.tsx
- vitest
- settlement-pages.tsx
- how-we-work/page.tsx
- (site)/page.tsx
- cx.ts
- Pro components
- tax-codes.ts
- Notice
- portalContext
- portal-billing.test.ts
- register/page.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- payroll/payroll.test.ts
- manilaToday
- Recipes
- lib/books/actions.ts
- BoardUI page patterns
- Pro templates
- supabaseAdmin
- ledger/types.ts
- opening-checklist.tsx
- combobox.tsx
- rates.ts
- boardui
- addDays
- standing-forms.tsx
- arap.ts
- PageHeader
- client
- ref_node_path
- Opening balances: checklist for any cut-off
- profile.ts
- documents/[id]/page.tsx
- registrations/forms.tsx
- collections/forms.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- dropdown.tsx
- quote.ts
- returns/load.ts
- registrations/[id]/page.tsx
- returns/books.test.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- cycle/actions.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- mime.ts
- site/brand.ts
- bir-filing-calendar/page.tsx
- ocr/run.ts
- fixed-assets/page.tsx
- portal/reports/page.tsx
- payment-forms.tsx
- ticked-allocation.test.ts
- theme-toggle.tsx
- review-form.tsx
- supabaseServer
- idle-watcher.tsx
- workpapers/load.ts
- safeguards.ts
- filings/actions.ts
- layout.ts
- server-only
- Centavos
- staff/actions.ts
- registrations/actions.ts
- structured-data.ts
- cwt-tracker-view.tsx
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- app/documents/page.tsx
- clients/[id]/page.tsx
- template.ts
- leads/[id]/page.tsx
- filings/[id]/page.tsx
- @remixicon/react
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal.ts
- tools/page.tsx
- month.ts
- deadlines/page.tsx
- opengraph-image.tsx
- eslint.config.mjs
- package.json
- clients/actions.ts
- sign-off-actions.tsx
- app/settings/page.tsx
- report-periods.ts
- books-2307.test.ts
- acting-approver.test.ts
- book/actions.ts
- env.ts
- formatAmount
- Building UIs with BoardUI
- move-bar.tsx
- register-xlsx.ts
- app/requests/page.tsx
- contribution-remittances.test.ts
- quote/page.tsx
- social-button.tsx
- accept-form.tsx
- gap/page.tsx
- split-bundled-pdfs.test.ts
- parallel-run.test.ts
- books-migration.test.ts
- tests/books.test.ts
- morning.ts
- generate-qap-fixture.mjs
- ledger/types.ts
- seed.ts
- memo.ts
- cycle/run.ts
- late-surcharges.test.ts
- content.ts
- workpapers.test.ts
- proposal-view.tsx
- binder/page.tsx
- portal/books.ts
- templates/README.md
- deadlines/actions.ts
- funnel.test.ts
- form-1604e.test.ts
- approval-memo.tsx
- PrintButton
- names.ts
- returns-sign-off.test.ts
- defer-documents.test.ts
- register-books.test.ts
- returns-books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 378 edges
2. `cx` - 306 edges
3. `react` - 274 edges
4. `Notice()` - 261 edges
5. `Skeleton()` - 254 edges
6. `Button()` - 240 edges
7. `next` - 236 edges
8. `vitest` - 188 edges
9. `Badge()` - 182 edges
10. `Card()` - 182 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `worksheet()` --indirect_call--> `fromBooksRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/returns/source.ts
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (216 total, 21 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (41): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one() (+33 more)

### Community 1 - "Centavos"
Cohesion: 0.08
Nodes (40): PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview(), peso(), ReadItem, Form2316Line, DraftIssue (+32 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.09
Nodes (51): booksContext(), booksViewFor(), fmtMonth(), one(), BooksFrame(), BooksLockBar(), MonthSelect(), BooksSummaryPage() (+43 more)

### Community 4 - "public.ts"
Cohesion: 0.11
Nodes (25): ProposalSetup, JobOption, ProposalQuote, Quote, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+17 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "returns/types.ts"
Cohesion: 0.09
Nodes (40): FinancialStatements, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell() (+32 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "CI Workflow"
Cohesion: 0.12
Nodes (15): runs-on, steps, jobs, check, name, on, pull_request, push (+7 more)

### Community 9 - "Free components"
Cohesion: 0.03
Nodes (79): Accordion, Agent Chat, Agent runtime, Agent Thinking, Announcement, Auth Card, Avatar, Badge (+71 more)

### Community 10 - "Deadline Engine Docs"
Cohesion: 0.21
Nodes (11): /api/cron/generate-filings (02:00 Manila), Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET), Withholding Returns Follow Calendar Year (calendar_year flag), Onboarding a Client Workflow, Nightly Filing Instance Generation (120 days ahead, 60 back), Filing Obligations & Deadline Engine, Weekend/Holiday Roll to Next Working Day, BIR Deadline Engine (src/lib/deadlines) (+3 more)

### Community 11 - "vat.ts"
Cohesion: 0.09
Nodes (61): sawtBuckets(), annualAttachments(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc() (+53 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.05
Nodes (59): ApprovedReview(), NotificationFilterTabs(), NotificationRowData, StatusDot(), StatusDotColor, StatusDotProps, styles, Breadcrumb() (+51 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (41): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), loadStatements(), statementsFrom(), FS_LINES, FsLine, FsLineKey (+33 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 25 - "Vercel Cron Config"
Cohesion: 0.50
Nodes (3): crons, regions, $schema

### Community 40 - "cwt-tracker.ts"
Cohesion: 0.13
Nodes (31): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), addMonths(), buildTracker(), calendarQuarterStart() (+23 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (69): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), monthName(), Parties() (+61 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "queries.ts"
Cohesion: 0.08
Nodes (36): GET(), Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), SwitchProps (+28 more)

### Community 45 - "upload/page.tsx"
Cohesion: 0.11
Nodes (33): DocumentsCard(), when(), shift(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload() (+25 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.06
Nodes (74): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+66 more)

### Community 47 - "settings/actions.ts"
Cohesion: 0.12
Nodes (25): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+17 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (64): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+56 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.16
Nodes (19): Book(), PortalBookPage(), when, addDays(), byDay(), CLIENT_MEETING, DAY_LABEL, freeSlots() (+11 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 52 - "showDate"
Cohesion: 0.09
Nodes (59): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+51 more)

### Community 53 - "webhook.ts"
Cohesion: 0.11
Nodes (39): ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF, CODES (+31 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.12
Nodes (33): BankAccountsRoute(), fmtDate(), SearchParams, BooksList(), Column, ListRow, RowLink(), EmployeesRoute() (+25 more)

### Community 55 - "board.ts"
Cohesion: 0.10
Nodes (24): StepProgress(), CauseTag, DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS, fiveSteps(), isNil() (+16 more)

### Community 56 - "react"
Cohesion: 0.07
Nodes (39): react, CustomersRoute(), InvoiceEdit(), NewEntry(), NewEntryPage(), ReportsIndex(), PartyList(), PaymentsNewPage() (+31 more)

### Community 57 - "button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (57): qapBuckets(), lookupAtc(), agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule() (+49 more)

### Community 59 - "steps.ts"
Cohesion: 0.10
Nodes (27): Agency, birForm(), BranchOptions, branchStepsFor(), CaseStep, ClosureOptions, dayNumber(), daysBetween() (+19 more)

### Community 60 - "portal/page.tsx"
Cohesion: 0.11
Nodes (33): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+25 more)

### Community 61 - "ledger/data.ts"
Cohesion: 0.17
Nodes (18): dayBefore(), GET(), safe(), fromWorkbookData(), buildBookWorkbook(), Amendment, AmendmentStatus, BooksMonth (+10 more)

### Community 62 - "work/load.ts"
Cohesion: 0.21
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.15
Nodes (23): ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months(), one() (+15 more)

### Community 64 - "ref_node_fs"
Cohesion: 0.05
Nodes (21): outDir, pkgDir, require, { version }, dir, readme, templates, afterButton() (+13 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.18
Nodes (15): INVOICE_KINDS, InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesListPage(), SalesInvoicesListPage(), VoidForm() (+7 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.10
Nodes (45): Rule, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), DeadlineRule, DueRule (+37 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "params.ts"
Cohesion: 0.18
Nodes (17): TaxpayerType, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery() (+9 more)

### Community 70 - "year-end/page.tsx"
Cohesion: 0.06
Nodes (60): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+52 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (43): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+35 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.08
Nodes (50): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Release2316Form(), yearWorksheet(), PrintAll(), PrintAll2316Page() (+42 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "income.ts"
Cohesion: 0.10
Nodes (59): BirLineKey, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+51 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "blocks.tsx"
Cohesion: 0.15
Nodes (26): AboutPage(), HOW, metadata, BRING, ContactList(), ContactPage(), metadata, FaqPage() (+18 more)

### Community 78 - "site-document.tsx"
Cohesion: 0.12
Nodes (13): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), SiteNotFound(), geist (+5 more)

### Community 79 - "vitest"
Cohesion: 0.03
Nodes (28): pg, vitest, root, root, root, root, root, root (+20 more)

### Community 80 - "settlement-pages.tsx"
Cohesion: 0.12
Nodes (27): PaymentsListPage(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, Kind, Props, SETTLEMENT_KINDS (+19 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.15
Nodes (30): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+22 more)

### Community 82 - "(site)/page.tsx"
Cohesion: 0.17
Nodes (25): FLOW_ICONS, GROUP_SPAN, HomePage(), metadata, BreadcrumbItem(), ButtonLink(), Crumb, Crumbs() (+17 more)

### Community 83 - "cx.ts"
Cohesion: 0.06
Nodes (36): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, ButtonLinkProps (+28 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tax-codes.ts"
Cohesion: 0.11
Nodes (25): blankLine(), InvoiceForm(), InvoiceFormValue, SettingsPage(), SettingsRoute(), PickOption, appliesTo(), canGoOn() (+17 more)

### Community 86 - "Notice"
Cohesion: 0.10
Nodes (70): BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), CloseYearForm(), EntryForm(), OpeningUpload(), ReleaseReportForm() (+62 more)

### Community 87 - "portalContext"
Cohesion: 0.19
Nodes (26): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+18 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "register/page.tsx"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (23): AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY, pickAttribution() (+15 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (49): GridRow, AlphaCols, AlphalistRow, buildAlphalist(), form2316(), Form2316Employer, mmdd(), period2316() (+41 more)

### Community 94 - "manilaToday"
Cohesion: 0.11
Nodes (35): RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks() (+27 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (42): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+34 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "supabaseAdmin"
Cohesion: 0.12
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), slotsFor(), DISCOVERY_CALL (+25 more)

### Community 100 - "ledger/types.ts"
Cohesion: 0.07
Nodes (45): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+37 more)

### Community 101 - "opening-checklist.tsx"
Cohesion: 0.15
Nodes (20): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES (+12 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.07
Nodes (50): react-aria-components, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, animateTag(), ComboBox() (+42 more)

### Community 103 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "addDays"
Cohesion: 0.13
Nodes (26): Queue(), ReviewPage(), Row, appointActingAction(), endActingAction(), refresh(), EndButton(), Acting() (+18 more)

### Community 106 - "standing-forms.tsx"
Cohesion: 0.15
Nodes (20): zod@^4.6.7, zod, Detail(), PayNow(), METHODS, ProofUpload(), send(), amount (+12 more)

### Community 107 - "arap.ts"
Cohesion: 0.15
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 108 - "PageHeader"
Cohesion: 0.11
Nodes (27): ClientList(), ClientsPage(), Cycle(), CyclePage(), CycleWithClient, DocRow, FilingsTabs(), FilingsTabsFor() (+19 more)

### Community 109 - "client"
Cohesion: 0.08
Nodes (15): BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), as(), purchase() (+7 more)

### Community 110 - "ref_node_path"
Cohesion: 0.03
Nodes (37): setupMissingChartsAction(), taxableYearStart(), acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+29 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 113 - "documents/[id]/page.tsx"
Cohesion: 0.08
Nodes (46): Doc, ExceptionRow, addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage() (+38 more)

### Community 114 - "registrations/forms.tsx"
Cohesion: 0.13
Nodes (21): Row, ClientCaseKind, caseNote, caseTitle, Check(), ChecklistPreview(), ClientCaseForm(), NewRegistrationForm() (+13 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.08
Nodes (61): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+53 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.21
Nodes (16): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+8 more)

### Community 118 - "dropdown.tsx"
Cohesion: 0.10
Nodes (31): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+23 more)

### Community 119 - "quote.ts"
Cohesion: 0.11
Nodes (31): PriceRow, buildQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem, documentBand(), EWT_NOTE (+23 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.07
Nodes (54): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+46 more)

### Community 121 - "registrations/[id]/page.tsx"
Cohesion: 0.17
Nodes (24): CompleteButton(), StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+16 more)

### Community 122 - "returns/books.test.ts"
Cohesion: 0.16
Nodes (10): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+2 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (44): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+36 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.09
Nodes (46): Client, CollectionsPage(), OpenDue, Overview(), Stat(), RemittancesDue(), MonthRemittances(), Section() (+38 more)

### Community 126 - "cycle/actions.ts"
Cohesion: 0.19
Nodes (15): MonthComplete(), SentRow, StandingRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction() (+7 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (52): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+44 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (74): applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), geminiJson(), PayrollItem (+66 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.13
Nodes (21): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+13 more)

### Community 130 - "mime.ts"
Cohesion: 0.09
Nodes (48): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+40 more)

### Community 131 - "site/brand.ts"
Cohesion: 0.31
Nodes (9): metadata, QuotesClosed(), Start(), StartPage(), funnelLive(), funnelOpen(), clean(), FALLBACK_BRAND (+1 more)

### Community 132 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (44): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+36 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 135 - "portal/reports/page.tsx"
Cohesion: 0.17
Nodes (21): BooksSection(), NavRow(), PortalReports(), Reports(), Section(), Statements(), when(), monthLabel() (+13 more)

### Community 136 - "payment-forms.tsx"
Cohesion: 0.20
Nodes (22): PaymentSettings(), accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction() (+14 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "theme-toggle.tsx"
Cohesion: 0.07
Nodes (51): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+43 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.05
Nodes (75): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+67 more)

### Community 140 - "supabaseServer"
Cohesion: 0.06
Nodes (64): nextConfig, next, setIncomeTaxMethodAction(), addClientNoteAction(), postPayrollAction(), PostState, PostPayrollButton(), Detail() (+56 more)

### Community 141 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 142 - "workpapers/load.ts"
Cohesion: 0.15
Nodes (20): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MemoMonth (+12 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.09
Nodes (32): CoverageClient, coverageGaps(), Gap, GapKind, board, MARCO, none, RHEA (+24 more)

### Community 144 - "filings/actions.ts"
Cohesion: 0.16
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+9 more)

### Community 145 - "layout.ts"
Cohesion: 0.16
Nodes (19): bodyBlocks(), DEFAULT_BRAND, EmailAction, escapeHtml(), fullBrand(), linkify(), plainTextToHtml(), receivingLine() (+11 more)

### Community 146 - "server-only"
Cohesion: 0.10
Nodes (45): server-only, @supabase/supabase-js, GET(), GET(), assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+37 more)

### Community 147 - "Centavos"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+11 more)

### Community 148 - "staff/actions.ts"
Cohesion: 0.17
Nodes (19): addClientUserAction(), fieldErrors(), FormState, inviteStaffAction(), updateStaffAction(), BranchOption, BranchOptions(), InviteStaffForm() (+11 more)

### Community 149 - "registrations/actions.ts"
Cohesion: 0.16
Nodes (19): cancelRegistrationAction(), completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+11 more)

### Community 150 - "structured-data.ts"
Cohesion: 0.15
Nodes (19): robots(), metadata, sitemap(), SiteBrand, BRAND_NAME, SITE_URL, siteUrl(), TAGLINE (+11 more)

### Community 151 - "cwt-tracker-view.tsx"
Cohesion: 0.26
Nodes (12): CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure(), money(), showDate(), showStamp() (+4 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.07
Nodes (59): SheetPreview(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus(), onVisible() (+51 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.11
Nodes (31): ApprovedRow, ClientSelect(), PeriodFilter(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending() (+23 more)

### Community 156 - "clients/[id]/page.tsx"
Cohesion: 0.09
Nodes (42): FormState, removeAssignmentAction(), ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient() (+34 more)

### Community 157 - "template.ts"
Cohesion: 0.11
Nodes (21): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+13 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.06
Nodes (52): NoteState, NotesCard(), ClientNoteForm(), BookingLink(), ConvertForm(), CopyLink(), DiscoveryCallForm(), FunnelSwitch() (+44 more)

### Community 159 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (43): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, FilingTable(), bookKind, BookRow, bookStatus (+35 more)

### Community 160 - "@remixicon/react"
Cohesion: 0.12
Nodes (34): @remixicon/react, PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), uploadRequestFile(), ReturnStandingForm() (+26 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (19): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), Interval, manilaInstant(), appBookedEvents() (+11 more)

### Community 163 - "proposal.ts"
Cohesion: 0.10
Nodes (28): ProposalData, corp, items, proposal(), items, schedule, OWNER_PRICES, OWNER_SETTINGS (+20 more)

### Community 164 - "tools/page.tsx"
Cohesion: 0.19
Nodes (19): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), RepostRegisterButton() (+11 more)

### Community 165 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 166 - "deadlines/page.tsx"
Cohesion: 0.19
Nodes (19): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+11 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 169 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 170 - "clients/actions.ts"
Cohesion: 0.13
Nodes (23): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), updateClientAction(), obligationChanges(), obligationsForTaxTypes() (+15 more)

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.26
Nodes (12): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote(), SettingsPage(), describeDue() (+4 more)

### Community 173 - "report-periods.ts"
Cohesion: 0.26
Nodes (16): basePeriod(), HeldNote(), holdsWhat(), periodTitle(), BooksYear, booksYears(), iso(), lockedMonths() (+8 more)

### Community 174 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "book/actions.ts"
Cohesion: 0.22
Nodes (13): cancelMeetingAction(), cancelMyMeetingAction(), CancelState, BookingState, calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason() (+5 more)

### Community 177 - "env.ts"
Cohesion: 0.23
Nodes (9): maxDuration, POST(), supabaseEnv(), TelegramEnv, telegramEnv(), ClaimedNotification, TelegramApi, telegramApi() (+1 more)

### Community 178 - "formatAmount"
Cohesion: 0.18
Nodes (17): PortalReport(), Report(), when(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+9 more)

### Community 179 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 180 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 181 - "register-xlsx.ts"
Cohesion: 0.09
Nodes (37): RFC-4180, exceljs, file(), GET(), safe(), PayrollDocument(), ReadPayrollButton(), buildEmployeeTemplate() (+29 more)

### Community 182 - "app/requests/page.tsx"
Cohesion: 0.23
Nodes (13): Requests(), RequestsPage(), Row, View, VIEWS, PortalRequests(), Requests(), Row (+5 more)

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "quote/page.tsx"
Cohesion: 0.17
Nodes (20): dateFmt, loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm() (+12 more)

### Community 185 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 186 - "accept-form.tsx"
Cohesion: 0.70
Nodes (3): acceptProposalAction(), AcceptState, contentHash()

### Community 187 - "gap/page.tsx"
Cohesion: 0.25
Nodes (12): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+4 more)

### Community 188 - "split-bundled-pdfs.test.ts"
Cohesion: 0.14
Nodes (5): HASH, LEAD, root, Part, root

### Community 189 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 190 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "morning.ts"
Cohesion: 0.20
Nodes (13): digestMessage(), DigestRow, longDay(), peso, time(), Email, line(), longDay() (+5 more)

### Community 193 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 194 - "ledger/types.ts"
Cohesion: 0.21
Nodes (10): BIR_LINES, BirGroup, BirLine, codes, PNL, BOOKS, ENTRY_SOURCES, SINGLE_CONTROLS (+2 more)

### Community 195 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 196 - "memo.ts"
Cohesion: 0.23
Nodes (10): ReviewNote, Memo, MemoInput, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), SignedRef (+2 more)

### Community 197 - "cycle/run.ts"
Cohesion: 0.30
Nodes (8): GET(), cycleMessage(), dayFmt, NoticeKind, showDay(), Due, runDocumentCycles(), runPendingOcr()

### Community 199 - "content.ts"
Cohesion: 0.21
Nodes (10): metadata, Faq, FAQ_GROUPS, HOW_STEPS, PLATFORM_FLOW, SAFEGUARDS, Service, SERVICE_GROUPS (+2 more)

### Community 200 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 201 - "proposal-view.tsx"
Cohesion: 0.29
Nodes (11): jobName(), lineName(), longDate(), money(), php, ProposalView(), Rows(), Section() (+3 more)

### Community 202 - "binder/page.tsx"
Cohesion: 0.38
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, PrintButton()

### Community 203 - "portal/books.ts"
Cohesion: 0.27
Nodes (9): Released, accountFromRow(), bookEntryFromRow(), BooksClient, ReleasedReport, ReportKind, PortalBooks, portalBooksReader() (+1 more)

### Community 206 - "deadlines/actions.ts"
Cohesion: 0.42
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 207 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 208 - "form-1604e.test.ts"
Cohesion: 0.22
Nodes (4): form1604E, client, YEAR, EwtQuarter

### Community 209 - "approval-memo.tsx"
Cohesion: 0.32
Nodes (6): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, approvalMemo()

### Community 210 - "PrintButton"
Cohesion: 0.52
Nodes (5): PortalPrint2307Page(), Print(), portal2307Href(), Form2307Sheet(), PrintButton()

### Community 211 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 212 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 214 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1592 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `ui.ts`, `public.ts`, `devDependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `upload/page.tsx`, `payroll/forms.tsx`, `settings/actions.ts`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `showDate`, `webhook.ts`, `board.ts`, `react`, `returns/types.ts`, `steps.ts`, `portal/page.tsx`, `lock-bar.tsx`, `ref_node_fs`, `invoice-pages.tsx`, `engine.ts`, `testing.ts`, `params.ts`, `year-end/page.tsx`, `payroll/data.ts`, `tax-codes.ts`, `portal-billing.test.ts`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `payroll/payroll.test.ts`, `manilaToday`, `ledger/types.ts`, `opening-checklist.tsx`, `rates.ts`, `addDays`, `arap.ts`, `PageHeader`, `client`, `ref_node_path`, `profile.ts`, `collections/forms.tsx`, `calendar/callback/route.ts`, `quote.ts`, `returns/load.ts`, `returns/books.test.ts`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `mime.ts`, `bir-filing-calendar/page.tsx`, `ocr/run.ts`, `fixed-assets/page.tsx`, `portal/reports/page.tsx`, `ticked-allocation.test.ts`, `theme-toggle.tsx`, `review-form.tsx`, `idle-watcher.tsx`, `workpapers/load.ts`, `safeguards.ts`, `filings/actions.ts`, `layout.ts`, `server-only`, `Centavos`, `staff/actions.ts`, `structured-data.ts`, `ledger.test.ts`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `filings/[id]/page.tsx`, `@remixicon/react`, `calendar/page.tsx`, `proposal.ts`, `month.ts`, `package.json`, `clients/actions.ts`, `app/settings/page.tsx`, `report-periods.ts`, `books-2307.test.ts`, `acting-approver.test.ts`, `book/actions.ts`, `formatAmount`, `move-bar.tsx`, `contribution-remittances.test.ts`, `split-bundled-pdfs.test.ts`, `parallel-run.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `morning.ts`, `ledger/types.ts`, `memo.ts`, `cycle/run.ts`, `late-surcharges.test.ts`, `workpapers.test.ts`, `funnel.test.ts`, `form-1604e.test.ts`, `approval-memo.tsx`, `names.ts`, `returns-sign-off.test.ts`, `defer-documents.test.ts`, `register-books.test.ts`, `returns-books.test.ts`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10745098039215686 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `cx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `queries.ts`, `upload/page.tsx`, `payroll/forms.tsx`, `settings/actions.ts`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `showDate`, `module-pages.tsx`, `react`, `portal/page.tsx`, `ledger/data.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `blocks.tsx`, `site-document.tsx`, `settlement-pages.tsx`, `(site)/page.tsx`, `portalContext`, `register/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `manilaToday`, `lib/books/actions.ts`, `supabaseAdmin`, `ledger/types.ts`, `opening-checklist.tsx`, `addDays`, `standing-forms.tsx`, `PageHeader`, `profile.ts`, `documents/[id]/page.tsx`, `registrations/forms.tsx`, `collections/forms.tsx`, `calendar/callback/route.ts`, `returns/load.ts`, `registrations/[id]/page.tsx`, `batch/register.ts`, `statement.ts`, `cycle/actions.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `mime.ts`, `site/brand.ts`, `fixed-assets/page.tsx`, `portal/reports/page.tsx`, `payment-forms.tsx`, `theme-toggle.tsx`, `review-form.tsx`, `idle-watcher.tsx`, `filings/actions.ts`, `server-only`, `staff/actions.ts`, `registrations/actions.ts`, `structured-data.ts`, `cwt-tracker-view.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `filings/[id]/page.tsx`, `@remixicon/react`, `calendar/page.tsx`, `tools/page.tsx`, `deadlines/page.tsx`, `opengraph-image.tsx`, `package.json`, `clients/actions.ts`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `report-periods.ts`, `book/actions.ts`, `env.ts`, `formatAmount`, `move-bar.tsx`, `register-xlsx.ts`, `app/requests/page.tsx`, `quote/page.tsx`, `accept-form.tsx`, `gap/page.tsx`, `cycle/run.ts`, `content.ts`, `binder/page.tsx`, `deadlines/actions.ts`, `approval-memo.tsx`, `PrintButton`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Should `Centavos` be split into smaller, more focused modules?**
  _Cohesion score 0.08383838383838384 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `Centavos`, `ui.ts`, `cx`, `dependencies`, `modal.tsx`, `scores/page.tsx`, `compare.ts`, `queries.ts`, `upload/page.tsx`, `payroll/forms.tsx`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `showDate`, `module-pages.tsx`, `button.tsx`, `portal/page.tsx`, `lock-bar.tsx`, `invoice-pages.tsx`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `blocks.tsx`, `site-document.tsx`, `settlement-pages.tsx`, `how-we-work/page.tsx`, `(site)/page.tsx`, `cx.ts`, `tax-codes.ts`, `Notice`, `portalContext`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `supabaseAdmin`, `ledger/types.ts`, `combobox.tsx`, `addDays`, `standing-forms.tsx`, `PageHeader`, `profile.ts`, `documents/[id]/page.tsx`, `registrations/forms.tsx`, `collections/forms.tsx`, `calendar/callback/route.ts`, `dropdown.tsx`, `returns/load.ts`, `registrations/[id]/page.tsx`, `batch/register.ts`, `statement.ts`, `cycle/actions.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `mime.ts`, `site/brand.ts`, `fixed-assets/page.tsx`, `portal/reports/page.tsx`, `payment-forms.tsx`, `theme-toggle.tsx`, `review-form.tsx`, `supabaseServer`, `idle-watcher.tsx`, `staff/actions.ts`, `structured-data.ts`, `cwt-tracker-view.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `filings/[id]/page.tsx`, `@remixicon/react`, `calendar/page.tsx`, `proposal.ts`, `tools/page.tsx`, `deadlines/page.tsx`, `package.json`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `formatAmount`, `move-bar.tsx`, `app/requests/page.tsx`, `quote/page.tsx`, `social-button.tsx`, `accept-form.tsx`, `gap/page.tsx`, `binder/page.tsx`, `deadlines/actions.ts`, `PrintButton`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._