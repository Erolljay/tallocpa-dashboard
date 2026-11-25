# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 774 files · ~607,277 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4807 nodes · 16689 edges · 181 communities (156 shown, 25 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 129 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `408e64c1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- filings/run.ts
- migrate.yml
- cx.ts
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- zod
- Sign-in & Setup Docs
- requireStaff
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- vat.ts
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- documents/[id]/page.tsx
- scores/page.tsx
- registrations/forms.tsx
- payroll/types.ts
- requireStaff
- index.ts
- payroll/forms.tsx
- modal.tsx
- lock-bar.tsx
- scripts
- supabaseAdmin
- workpapers/load.ts
- deadlines/page.tsx
- lib/books/actions.ts
- review/page.tsx
- app/app/page.tsx
- payroll/payroll.test.ts
- Skeleton
- form-1604e.ts
- Notice
- requireOwner
- fees/[id]/page.tsx
- steps.ts
- tieouts.ts
- cx
- select.tsx
- Apple Design
- public.ts
- testing.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- module-pages.tsx
- Rules
- Animation Performance
- Badge
- stat-cards.tsx
- social-button.tsx
- theme-toggle.tsx
- quote.ts
- notification.tsx
- supabaseServer
- parties/page.tsx
- button.tsx
- Pro components
- server-only
- year-end/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- LinkButton
- opening.ts
- Recipes
- payroll/data.ts
- BoardUI page patterns
- Pro templates
- workpapers/page.tsx
- ledger/books.ts
- ui.ts
- toCentavos
- invoice-pages.tsx
- boardui
- rates.ts
- money.ts
- proxy.ts
- alphalist.ts
- profile.ts
- slots.ts
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- portal/page.tsx
- lib/books/actions.ts
- ledger/data.ts
- calendar/callback/route.ts
- apply-migrations.sh
- buildSawt
- PageHeader
- filings/[id]/page.tsx
- returns/load.ts
- LinkButton
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- [month]/page.tsx
- cycle/page.tsx
- read.test.ts
- checkbox.tsx
- return-file-actions.ts
- fees/types.ts
- review.ts
- review-form.tsx
- work/load.ts
- manilaToday
- documents/labels.ts
- ticked-allocation.test.ts
- FormModule
- ledger.test.ts
- vitest
- settings/actions.ts
- income.ts
- binder/page.tsx
- Building UIs with BoardUI
- generate-qap-fixture.mjs
- formatAmount
- db.test.ts
- calendar/staff.ts
- filings/actions.ts
- leads/[id]/page.tsx
- names.ts
- safeguards.ts
- parts.ts
- ref_node_path
- app/documents/page.tsx
- register-books.test.ts
- funnel.test.ts
- vitest
- proposal/[token]/page.tsx
- register-xlsx.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- books-migration.test.ts
- tests/books.test.ts
- fixed-assets.test.ts
- fees/types.ts
- file-upload.tsx
- client-reports.test.ts
- year-end.test.ts
- registrations/[id]/page.tsx
- clients/actions.ts
- acting-approver.test.ts
- eslint.config.mjs
- ledger-lock.test.ts
- leads-pipeline.test.ts
- portal-statements-approval.test.ts
- returns-sign-off.test.ts
- ledger-documents.test.ts
- month-complete.test.ts
- returns-books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 291 edges
2. `cx` - 228 edges
3. `Skeleton()` - 226 edges
4. `Notice()` - 222 edges
5. `react` - 221 edges
6. `Button()` - 194 edges
7. `next` - 180 edges
8. `Card()` - 163 edges
9. `Badge()` - 157 edges
10. `vitest` - 139 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Postgres Row-Level Security`  [INFERRED]
  README.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (181 total, 25 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.13
Nodes (34): BooksContext, one(), Print(), Print2307Page(), load2307Staff(), PortalPrint2307Page(), Print(), one() (+26 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.08
Nodes (49): TimelineFiling, TimelineItem, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso() (+41 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "cx.ts"
Cohesion: 0.09
Nodes (20): Counter(), CounterColor, CounterProps, styles, StatusDot(), StatusDotColor, StatusDotProps, styles (+12 more)

### Community 4 - "arap.ts"
Cohesion: 0.16
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "gemini.ts"
Cohesion: 0.10
Nodes (20): OCR_READ_FIELDS, OcrOutput, ocrOutputSchema, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

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

### Community 11 - "zod"
Cohesion: 0.18
Nodes (16): zod, GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+8 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "requireStaff"
Cohesion: 0.12
Nodes (30): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+22 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (51): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), FinancialStatementsView(), StatementTable(), PrintButton() (+43 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.10
Nodes (65): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+57 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (40): EmployeeDetail(), EmployeePage(), file(), GET(), safe(), Payroll(), PayrollPage(), BOOKED_TYPES (+32 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "registrations/forms.tsx"
Cohesion: 0.12
Nodes (26): cancelRegistrationAction(), completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+18 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "requireStaff"
Cohesion: 0.18
Nodes (23): ActionButton(), EsubmissionControls(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction() (+15 more)

### Community 45 - "index.ts"
Cohesion: 0.06
Nodes (25): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+17 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (54): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+46 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (32): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+24 more)

### Community 48 - "lock-bar.tsx"
Cohesion: 0.13
Nodes (28): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+20 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.19
Nodes (20): server-only, bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book() (+12 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.16
Nodes (18): Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote, approvalMemo() (+10 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.11
Nodes (33): generateFilingsNow(), GenerateState, GenerateButton(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting() (+25 more)

### Community 53 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (23): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+15 more)

### Community 54 - "review/page.tsx"
Cohesion: 0.21
Nodes (12): Queue(), ReviewPage(), Row, Section(), filingsBooksReady(), onlyBooksReady(), booksReadyMap(), keepBooksReady() (+4 more)

### Community 55 - "app/app/page.tsx"
Cohesion: 0.18
Nodes (22): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary(), EndButton() (+14 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.11
Nodes (37): GridRow, AnnualSummary, annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+29 more)

### Community 57 - "Skeleton"
Cohesion: 0.08
Nodes (38): react, BankAccountsRoute(), CustomersRoute(), InvoiceEdit(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage() (+30 more)

### Community 58 - "form-1604e.ts"
Cohesion: 0.07
Nodes (58): client, VatData, INPUTS, MONTH, PAYSLIP_COLUMNS, payslipCsv(), payslipSchedule(), agentBackground() (+50 more)

### Community 59 - "Notice"
Cohesion: 0.07
Nodes (96): ClientForm(), StaffOptions(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker() (+88 more)

### Community 60 - "requireOwner"
Cohesion: 0.21
Nodes (21): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+13 more)

### Community 61 - "fees/[id]/page.tsx"
Cohesion: 0.17
Nodes (28): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+20 more)

### Community 62 - "steps.ts"
Cohesion: 0.10
Nodes (28): Check(), ChecklistPreview(), ClientCaseForm(), Agency, birForm(), BranchOptions, branchStepsFor(), CaseStep (+20 more)

### Community 63 - "tieouts.ts"
Cohesion: 0.13
Nodes (15): RegisterLine, LedgerTotals, purchases(), sales(), base, books, buy, sale (+7 more)

### Community 64 - "cx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "select.tsx"
Cohesion: 0.06
Nodes (49): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+41 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "public.ts"
Cohesion: 0.11
Nodes (28): dateFmt, statusLabel, statusTone, Supabase, requestQuoteAction(), SERVICES, StartState, QuerySource (+20 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.12
Nodes (37): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+29 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (52): @supabase/supabase-js, mergePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), ocrProviderFromEnv(), runOcr() (+44 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.10
Nodes (55): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+47 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.14
Nodes (36): booksContext(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+28 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "Badge"
Cohesion: 0.21
Nodes (18): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+10 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (44): @remixicon/react, DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+36 more)

### Community 77 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (35): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+27 more)

### Community 79 - "quote.ts"
Cohesion: 0.13
Nodes (23): buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange(), matches(), pesos() (+15 more)

### Community 80 - "notification.tsx"
Cohesion: 0.08
Nodes (29): react-dom@19.3.0, react-dom, UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles (+21 more)

### Community 81 - "supabaseServer"
Cohesion: 0.06
Nodes (57): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), Db (+49 more)

### Community 82 - "parties/page.tsx"
Cohesion: 0.17
Nodes (16): ClientList(), ClientsPage(), Row, FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs() (+8 more)

### Community 83 - "button.tsx"
Cohesion: 0.06
Nodes (38): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+30 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "server-only"
Cohesion: 0.18
Nodes (14): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+6 more)

### Community 86 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (26): FormState, ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd(), YearEndPage(), yearStartOf() (+18 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (63): PortalClient, portalContext(), Missing(), Missing2307Page(), Row, Books(), PortalBooks(), BookPrint() (+55 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (27): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+11 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "LinkButton"
Cohesion: 0.19
Nodes (18): Batch(), BatchPage(), one(), toCentavos(), Certificates(), Staff2307Page(), print2307Href(), LeadsPage() (+10 more)

### Community 94 - "opening.ts"
Cohesion: 0.14
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.09
Nodes (45): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), AlphaCols, Certificates2316, certificatesFromRaw() (+37 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+14 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.06
Nodes (53): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages() (+45 more)

### Community 101 - "ui.ts"
Cohesion: 0.09
Nodes (42): blankLine(), InvoiceForm(), InvoiceFormValue, BookingFields(), BooksChoices(), Codes, initialCodes(), ocrKeys() (+34 more)

### Community 102 - "toCentavos"
Cohesion: 0.12
Nodes (29): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+21 more)

### Community 103 - "invoice-pages.tsx"
Cohesion: 0.08
Nodes (36): INVOICE_KINDS, InvoiceView(), Kind, Props, STATUS_TONE, MonthSelect(), PurchaseInvoicesViewPage(), TransactionJournal() (+28 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.25
Nodes (17): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+9 more)

### Community 106 - "money.ts"
Cohesion: 0.21
Nodes (14): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+6 more)

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "alphalist.ts"
Cohesion: 0.15
Nodes (24): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+16 more)

### Community 109 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 110 - "slots.ts"
Cohesion: 0.23
Nodes (14): addDays(), byDay(), DAY_LABEL, freeSlots(), isFree(), LabelledDay, manilaDate(), overlaps() (+6 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.08
Nodes (41): Access, OpeningChecklist(), STATUS, addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction() (+33 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.09
Nodes (42): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+34 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 115 - "ledger/data.ts"
Cohesion: 0.11
Nodes (35): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), AMENDMENT_BADGE, Books() (+27 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.20
Nodes (18): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+10 more)

### Community 118 - "buildSawt"
Cohesion: 0.21
Nodes (14): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+6 more)

### Community 119 - "PageHeader"
Cohesion: 0.26
Nodes (12): ClientCaseKind, clientCase, NewRegistrationPage(), OwnerOnly(), RegistrationsPage(), Requests(), RequestsPage(), PageHeader() (+4 more)

### Community 120 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (46): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), FilingRow, Returns(), FilingListRow, amt() (+38 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.05
Nodes (65): FinancialStatements, Party, NewEmployeeRow, row(), NonDeductibleRow, withNonDeductible(), SawtResult, SawtRow (+57 more)

### Community 122 - "LinkButton"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.23
Nodes (14): loadSchedules(), longDate(), nextEffectiveDate(), CreateFromTemplateForm(), StartNewVersionForm(), FeeSchedulePage(), Schedules(), COMPLEXITY_LABEL (+6 more)

### Community 126 - "[month]/page.tsx"
Cohesion: 0.28
Nodes (11): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p(), PayrollRuns(), Run (+3 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.12
Nodes (28): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), MonthComplete(), SentRow, TimelineRow (+20 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (60): PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS, findHeaderRow() (+52 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "return-file-actions.ts"
Cohesion: 0.13
Nodes (28): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, esubmissionMailEnv(), accessToken(), call(), headerOf() (+20 more)

### Community 131 - "fees/types.ts"
Cohesion: 0.18
Nodes (10): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+2 more)

### Community 132 - "review.ts"
Cohesion: 0.36
Nodes (6): ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), SIGNED_REFS, quiet

### Community 133 - "review-form.tsx"
Cohesion: 0.07
Nodes (46): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+38 more)

### Community 134 - "work/load.ts"
Cohesion: 0.17
Nodes (19): Action(), MyWork(), MyWorkPage(), short(), TONE, lastMonth(), loadMyWork(), MyWork (+11 more)

### Community 135 - "manilaToday"
Cohesion: 0.11
Nodes (34): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+26 more)

### Community 136 - "documents/labels.ts"
Cohesion: 0.08
Nodes (43): Doc, when(), ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS (+35 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "FormModule"
Cohesion: 0.14
Nodes (12): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, form1601C (+4 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.06
Nodes (11): pg, Data, root, Row, root, root, root, root (+3 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.14
Nodes (21): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), periodWord (+13 more)

### Community 142 - "income.ts"
Cohesion: 0.12
Nodes (39): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+31 more)

### Community 143 - "binder/page.tsx"
Cohesion: 0.26
Nodes (14): amt(), CertificatesTable(), PartsLink(), PurchasesTable(), SalesTable(), th(), amt(), Binder() (+6 more)

### Community 144 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "formatAmount"
Cohesion: 0.17
Nodes (19): BooksSummaryPage(), Summary(), SummaryCard(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+11 more)

### Community 148 - "calendar/staff.ts"
Cohesion: 0.17
Nodes (19): Interval, Admin, Connection, PersonWeek, teamWeek(), accessToken(), CALENDAR_SCOPES, CalendarEvent (+11 more)

### Community 149 - "filings/actions.ts"
Cohesion: 0.06
Nodes (56): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), SignOffState, stepData(), text(), tieOutsBlocking() (+48 more)

### Community 150 - "leads/[id]/page.tsx"
Cohesion: 0.06
Nodes (62): NewEntry(), NewEntryPage(), NotesCard(), ClientNoteForm(), NewEmployee(), NewEmployeePage(), FirmPage(), PLACES (+54 more)

### Community 151 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 152 - "safeguards.ts"
Cohesion: 0.09
Nodes (43): GET(), SafeguardsNotice(), CoverageClient, coverageGaps(), Gap, GapKind, Email, line() (+35 more)

### Community 153 - "parts.ts"
Cohesion: 0.13
Nodes (28): Href, LineParts(), one(), Register(), RegisterPage(), shiftMonth(), SOURCE, ACCOUNTS (+20 more)

### Community 154 - "ref_node_path"
Cohesion: 0.11
Nodes (8): outDir, pkgDir, require, { version }, ctx, input, root, root

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (26): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+18 more)

### Community 156 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 157 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 158 - "vitest"
Cohesion: 0.11
Nodes (5): vitest, root, root, root, root

### Community 159 - "proposal/[token]/page.tsx"
Cohesion: 0.15
Nodes (17): acceptProposalAction(), AcceptState, metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage() (+9 more)

### Community 160 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (33): RFC-4180, exceljs, sortItems(), filled(), Grid, GridResult, isCsv(), isXls() (+25 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (16): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+8 more)

### Community 163 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 164 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 166 - "fees/types.ts"
Cohesion: 0.12
Nodes (29): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient (+21 more)

### Community 167 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 173 - "registrations/[id]/page.tsx"
Cohesion: 0.19
Nodes (24): StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell(), RegistrationList() (+16 more)

### Community 174 - "clients/actions.ts"
Cohesion: 0.05
Nodes (69): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+61 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 177 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 179 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 181 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1300 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `return-file-actions.ts`, `package.json`, `review-form.tsx`, `manilaToday`, `work/load.ts`, `documents/labels.ts`, `zod`, `requireStaff`, `settings/actions.ts`, `dependencies`, `binder/page.tsx`, `formatAmount`, `statements.ts`, `filings/actions.ts`, `leads/[id]/page.tsx`, `safeguards.ts`, `parts.ts`, `app/documents/page.tsx`, `proposal/[token]/page.tsx`, `fees/types.ts`, `documents/[id]/page.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `requireStaff`, `registrations/[id]/page.tsx`, `clients/actions.ts`, `payroll/forms.tsx`, `lock-bar.tsx`, `supabaseAdmin`, `deadlines/page.tsx`, `lib/books/actions.ts`, `review/page.tsx`, `app/app/page.tsx`, `Skeleton`, `Notice`, `requireOwner`, `fees/[id]/page.tsx`, `select.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `Badge`, `theme-toggle.tsx`, `parties/page.tsx`, `button.tsx`, `server-only`, `year-end/page.tsx`, `portal/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `LinkButton`, `payroll/data.ts`, `workpapers/page.tsx`, `ledger/books.ts`, `ui.ts`, `toCentavos`, `invoice-pages.tsx`, `money.ts`, `proxy.ts`, `profile.ts`, `fixed-assets/page.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `ledger/data.ts`, `calendar/callback/route.ts`, `PageHeader`, `filings/[id]/page.tsx`, `LinkButton`, `batch/register.ts`, `quote/page.tsx`, `[month]/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12513842746400886 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `form-2307.ts`, `cx.ts`, `package.json`, `zod`, `requireStaff`, `dependencies`, `statements.ts`, `documents/[id]/page.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `requireStaff`, `payroll/forms.tsx`, `modal.tsx`, `lock-bar.tsx`, `supabaseAdmin`, `deadlines/page.tsx`, `review/page.tsx`, `app/app/page.tsx`, `Notice`, `requireOwner`, `fees/[id]/page.tsx`, `cx`, `select.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `Badge`, `stat-cards.tsx`, `social-button.tsx`, `theme-toggle.tsx`, `notification.tsx`, `supabaseServer`, `parties/page.tsx`, `button.tsx`, `year-end/page.tsx`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `LinkButton`, `payroll/data.ts`, `workpapers/page.tsx`, `ledger/books.ts`, `ui.ts`, `toCentavos`, `invoice-pages.tsx`, `money.ts`, `profile.ts`, `fixed-assets/page.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `ledger/data.ts`, `calendar/callback/route.ts`, `PageHeader`, `filings/[id]/page.tsx`, `LinkButton`, `batch/register.ts`, `quote/page.tsx`, `[month]/page.tsx`, `cycle/page.tsx`, `checkbox.tsx`, `review-form.tsx`, `work/load.ts`, `manilaToday`, `documents/labels.ts`, `settings/actions.ts`, `binder/page.tsx`, `formatAmount`, `filings/actions.ts`, `leads/[id]/page.tsx`, `parts.ts`, `app/documents/page.tsx`, `proposal/[token]/page.tsx`, `calendar/page.tsx`, `fees/types.ts`, `file-upload.tsx`, `registrations/[id]/page.tsx`, `clients/actions.ts`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08192090395480225 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `filings/run.ts`, `arap.ts`, `package.json`, `gemini.ts`, `zod`, `requireStaff`, `statements.ts`, `scores/page.tsx`, `index.ts`, `lock-bar.tsx`, `workpapers/load.ts`, `deadlines/page.tsx`, `review/page.tsx`, `app/app/page.tsx`, `payroll/payroll.test.ts`, `form-1604e.ts`, `steps.ts`, `tieouts.ts`, `public.ts`, `testing.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `Badge`, `theme-toggle.tsx`, `quote.ts`, `server-only`, `year-end/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `opening.ts`, `payroll/data.ts`, `ledger/books.ts`, `ui.ts`, `toCentavos`, `invoice-pages.tsx`, `rates.ts`, `money.ts`, `profile.ts`, `slots.ts`, `fixed-assets/page.tsx`, `portal/page.tsx`, `calendar/callback/route.ts`, `filings/[id]/page.tsx`, `returns/load.ts`, `batch/register.ts`, `cycle/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `fees/types.ts`, `review.ts`, `review-form.tsx`, `work/load.ts`, `documents/labels.ts`, `ticked-allocation.test.ts`, `ledger.test.ts`, `vitest`, `settings/actions.ts`, `formatAmount`, `db.test.ts`, `filings/actions.ts`, `leads/[id]/page.tsx`, `names.ts`, `safeguards.ts`, `parts.ts`, `ref_node_path`, `app/documents/page.tsx`, `register-books.test.ts`, `funnel.test.ts`, `calendar/page.tsx`, `books-migration.test.ts`, `tests/books.test.ts`, `fixed-assets.test.ts`, `fees/types.ts`, `client-reports.test.ts`, `year-end.test.ts`, `clients/actions.ts`, `acting-approver.test.ts`, `ledger-lock.test.ts`, `leads-pipeline.test.ts`, `portal-statements-approval.test.ts`, `returns-sign-off.test.ts`, `ledger-documents.test.ts`, `month-complete.test.ts`, `returns-books.test.ts`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._