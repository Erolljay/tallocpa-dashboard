# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 471 files · ~369,461 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3199 nodes · 10376 edges · 141 communities (122 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `64f91564`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- filings/run.ts
- migrate.yml
- Skeleton
- opening.ts
- package.json
- fields.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- register/page.tsx
- Sign-in & Setup Docs
- profile.ts
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
- clients/[id]/page.tsx
- scores/page.tsx
- Notice
- payroll/forms.tsx
- certificate.ts
- ref_node_fs
- [month]/page.tsx
- registrations/forms.tsx
- LinkButton
- scripts
- manilaToday
- ledger/types.ts
- returns/types.ts
- deadlines/page.tsx
- payroll/types.ts
- supabaseServer
- compute.ts
- client-form.tsx
- qap.ts
- books/page.tsx
- quote.ts
- register-xlsx.ts
- cycle/page.tsx
- Badge
- tabs.tsx
- dropdown.tsx
- Apple Design
- source.ts
- vitest
- engine.ts
- books/reports/page.tsx
- books/forms.tsx
- proof-upload.tsx
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- compute1702RT
- theme-toggle.tsx
- collections/actions.ts
- income.ts
- collections/forms.tsx
- requireStaff
- button.tsx
- Pro components
- notification.tsx
- file-upload.tsx
- morning.ts
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- server-only
- social-button.tsx
- Recipes
- requireOwner
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- getIdentity
- BoardUI page patterns
- arap.ts
- boardui
- rates.ts
- fees/types.ts
- parties/parties.test.ts
- quote/page.tsx
- settings/actions.ts
- filters.tsx
- registrations/[id]/page.tsx
- react
- form-1601eq.ts
- acting-approver.test.ts
- app/requests/[id]/page.tsx
- returns/load.ts
- apply-migrations.sh
- cx.ts
- fees/[id]/page.tsx
- worksheet/page.tsx
- react
- fees/data.ts
- steps.ts
- Staff and Owner UX review (Phase 1)
- sign-off-actions.tsx
- parties/parties.test.ts
- util.ts
- gap.ts
- checkbox.tsx
- money.ts
- auth.ts
- payment-actions.ts
- template.ts
- proxy.ts
- branches/actions.ts
- ymd
- acting-approver/actions.ts
- copy-opencv.mjs
- FormModule
- tests/parties.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 199 edges
2. `Notice()` - 146 edges
3. `cx` - 143 edges
4. `react` - 136 edges
5. `Button()` - 125 edges
6. `Skeleton()` - 121 edges
7. `next` - 113 edges
8. `Card()` - 110 edges
9. `Badge()` - 107 edges
10. `PageHeader()` - 97 edges

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

## Communities (141 total, 19 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.13
Nodes (19): Event, eventText, Filing(), FilingPage(), paymentText, when(), ACTION_LABEL, availableActions() (+11 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.15
Nodes (22): Rule, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance, Frequency, Period (+14 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "Skeleton"
Cohesion: 0.14
Nodes (25): NewEmployee(), NewEmployeePage(), ClientList(), ClientsPage(), Row, countBy(), Documents(), DocumentsPage() (+17 more)

### Community 4 - "opening.ts"
Cohesion: 0.09
Nodes (35): checkUpdate(), EntryLineOut, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine (+27 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "fields.ts"
Cohesion: 0.06
Nodes (47): Booking, DirectoryParty, ENTRY_STATUS, typeLabel, checkFields(), Issue, num(), msgs() (+39 more)

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

### Community 11 - "register/page.tsx"
Cohesion: 0.11
Nodes (40): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+32 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (60): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+52 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (39): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, loadStatements(), FS_LINES, FsLine (+31 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.16
Nodes (33): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), buildSawt(), incomePayment() (+25 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "clients/[id]/page.tsx"
Cohesion: 0.18
Nodes (18): removeAssignmentAction(), StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton() (+10 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.06
Nodes (60): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), OcrRate, OwnerSections() (+52 more)

### Community 42 - "Notice"
Cohesion: 0.13
Nodes (52): ClientForm(), AmendmentRequestForm(), ArapUpload(), EntryForm(), OpeningUpload(), ReleaseReportForm(), SetupForm(), DocReviewActions() (+44 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (46): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+38 more)

### Community 44 - "certificate.ts"
Cohesion: 0.15
Nodes (20): AlphaCols, buildAlphalist(), Certificates2316, form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+12 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.05
Nodes (17): pg@^8.23.1, pg, ctx, input, root, root, root, as() (+9 more)

### Community 46 - "[month]/page.tsx"
Cohesion: 0.17
Nodes (26): saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), Payroll() (+18 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.09
Nodes (36): cancelRegistrationAction(), ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+28 more)

### Community 48 - "LinkButton"
Cohesion: 0.17
Nodes (25): EmployeeDetail(), EmployeePage(), GET(), LinkButton(), certificatesFromRaw(), employeesForMonth(), loadPriorEmployers(), PayrollSettings (+17 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.23
Nodes (13): PortalClient, portalContext(), Payroll(), PortalPayroll(), STATUS, when(), PortalReports(), Reports() (+5 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.08
Nodes (33): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+25 more)

### Community 52 - "returns/types.ts"
Cohesion: 0.08
Nodes (44): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), csvCell() (+36 more)

### Community 53 - "deadlines/page.tsx"
Cohesion: 0.12
Nodes (33): BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO, addDays(), isWeekend() (+25 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "supabaseServer"
Cohesion: 0.09
Nodes (28): nextConfig, next, EditClient(), EditClientPage(), Detail(), StatementPage(), approveDocumentAction(), GET() (+20 more)

### Community 56 - "compute.ts"
Cohesion: 0.13
Nodes (28): GridRow, MonthGrid(), toInput(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+20 more)

### Community 57 - "client-form.tsx"
Cohesion: 0.18
Nodes (16): FormState, ClientValues, frequencyLabel, Props, obligationsForTaxTypes(), PlannedObligation, TAX_TYPES, TAXPAYER_TYPES (+8 more)

### Community 58 - "qap.ts"
Cohesion: 0.12
Nodes (21): tinDashed(), EwtLine, tinDigits(), branchFromTin(), buildQapRows(), csvCell(), mmYYYY(), MONTH_NAMES (+13 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.17
Nodes (21): AmendmentDecision(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm() (+13 more)

### Community 60 - "quote.ts"
Cohesion: 0.13
Nodes (23): buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos(), QuoteLine (+15 more)

### Community 61 - "register-xlsx.ts"
Cohesion: 0.13
Nodes (28): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), PayrollItem, sortItems(), checkRegister(), fmt() (+20 more)

### Community 62 - "cycle/page.tsx"
Cohesion: 0.15
Nodes (23): Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, shift(), CloseCycleButton(), Message() (+15 more)

### Community 63 - "Badge"
Cohesion: 0.14
Nodes (21): PortalRequests(), Requests(), when(), Latest(), PortalStatement(), Detail(), PayNow(), proofBadge (+13 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "source.ts"
Cohesion: 0.15
Nodes (22): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND (+14 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (19): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "engine.ts"
Cohesion: 0.18
Nodes (20): compareIso(), lastDayOfMonth(), DeadlineRule, fiscalYearOf(), followsCalendarYear(), generateFilingInstances(), nextWorkingDay(), Obligation (+12 more)

### Community 70 - "books/reports/page.tsx"
Cohesion: 0.18
Nodes (17): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+9 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.13
Nodes (44): Accounts(), AccountsPage(), GROUPS, ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction() (+36 more)

### Community 72 - "proof-upload.tsx"
Cohesion: 0.19
Nodes (16): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+8 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.17
Nodes (22): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "compute1702RT"
Cohesion: 0.23
Nodes (23): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+15 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "collections/actions.ts"
Cohesion: 0.32
Nodes (14): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+6 more)

### Community 80 - "income.ts"
Cohesion: 0.09
Nodes (45): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), form1701, form1702RT (+37 more)

### Community 81 - "collections/forms.tsx"
Cohesion: 0.20
Nodes (21): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+13 more)

### Community 82 - "requireStaff"
Cohesion: 0.12
Nodes (33): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+25 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.09
Nodes (26): Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize (+18 more)

### Community 86 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 87 - "morning.ts"
Cohesion: 0.16
Nodes (17): GET(), Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+9 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.14
Nodes (7): BOOK_LOCK_FORMS, api, ctx, fn, rows, src, root

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (30): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+22 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (20): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+12 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.11
Nodes (31): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+23 more)

### Community 93 - "server-only"
Cohesion: 0.12
Nodes (23): server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage(), DigestRow (+15 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "requireOwner"
Cohesion: 0.12
Nodes (24): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), updateClientAction(), NewClientPage(), OwnerOnly() (+16 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (49): exceljs, dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate() (+41 more)

### Community 101 - "getIdentity"
Cohesion: 0.19
Nodes (19): zod@^4.6.7, zod, advanceFilingAction(), amendFilingAction(), amount, SignOffState, stepData(), text() (+11 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "arap.ts"
Cohesion: 0.14
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+10 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+10 more)

### Community 106 - "fees/types.ts"
Cohesion: 0.18
Nodes (17): count(), first(), pick(), profileFromQuery(), QuerySource, items, QuoteInput, BOOKKEEPING_LEVELS (+9 more)

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.13
Nodes (29): mergePartyAction(), runOcr(), SKIP, displayName(), fullAddress(), listNameCols(), Party, lookupParties() (+21 more)

### Community 108 - "quote/page.tsx"
Cohesion: 0.22
Nodes (15): loadSchedules(), loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview() (+7 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "filters.tsx"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 111 - "registrations/[id]/page.tsx"
Cohesion: 0.13
Nodes (35): completeRegistrationAction(), CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration() (+27 more)

### Community 112 - "react"
Cohesion: 0.09
Nodes (45): @remixicon/react, Doc, DocumentsCard(), when(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review() (+37 more)

### Community 113 - "form-1601eq.ts"
Cohesion: 0.17
Nodes (18): agentBackground(), agentErrors(), atcSchedule(), detailSchedule(), totalsByAtc(), form0619E, PREVIOUSLY_REMITTED, form1601EQ (+10 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "app/requests/[id]/page.tsx"
Cohesion: 0.21
Nodes (17): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), Row, CloseRequestButton(), ReplyForm() (+9 more)

### Community 116 - "returns/load.ts"
Cohesion: 0.17
Nodes (17): recomputeWorksheetAction(), WorksheetState, GET(), LOCKED_STATUSES, dayBefore(), FilingRow, ListedDocument, loadLedger() (+9 more)

### Community 118 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 119 - "fees/[id]/page.tsx"
Cohesion: 0.17
Nodes (26): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+18 more)

### Community 120 - "worksheet/page.tsx"
Cohesion: 0.18
Nodes (14): FilingListRow, Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet() (+6 more)

### Community 121 - "react"
Cohesion: 0.12
Nodes (19): react, NewParty(), AddBranchForm(), BranchRowForm(), Branches(), errors, Form(), LoginPage() (+11 more)

### Community 122 - "fees/data.ts"
Cohesion: 0.12
Nodes (23): dateFmt, longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm(), StartNewVersionForm() (+15 more)

### Community 123 - "steps.ts"
Cohesion: 0.14
Nodes (15): Agency, BranchOptions, CaseStep, ClosureOptions, EMPLOYER_STEPS, LGU_STEPS, PlannedStep, RegistrationOptions (+7 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (12): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), SignOffActions() (+4 more)

### Community 126 - "parties/parties.test.ts"
Cohesion: 0.14
Nodes (23): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartyList(), Row, datAddress() (+15 more)

### Community 127 - "util.ts"
Cohesion: 0.30
Nodes (14): Periods, periods(), addMonths(), csvCell(), docsWithin(), Filer, monthEnd(), monthsBetween() (+6 more)

### Community 128 - "gap.ts"
Cohesion: 0.22
Nodes (11): EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), items, PRICES (+3 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "money.ts"
Cohesion: 0.36
Nodes (8): docLabel(), ewtLines(), applyRate(), basisPoints(), formatPeso(), grossUp(), grouped, sum()

### Community 131 - "auth.ts"
Cohesion: 0.20
Nodes (8): fieldErrors(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), Identity, IdentityRow, StaffRole

### Community 132 - "payment-actions.ts"
Cohesion: 0.33
Nodes (10): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+2 more)

### Community 133 - "template.ts"
Cohesion: 0.20
Nodes (7): conditionsSchema, settingsSchema, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL

### Community 134 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 135 - "branches/actions.ts"
Cohesion: 0.48
Nodes (6): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), branchUpdateSchema

### Community 136 - "ymd"
Cohesion: 0.76
Nodes (5): addMonths(), ymd(), monthChoices(), nextCutoff(), openMonth()

### Community 137 - "acting-approver/actions.ts"
Cohesion: 0.53
Nodes (5): ActingState, appointActingAction(), endActingAction(), refresh(), appointmentRow()

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 945 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `filings/[id]/page.tsx`, `Skeleton`, `auth.ts`, `package.json`, `fields.ts`, `branches/actions.ts`, `payment-actions.ts`, `acting-approver/actions.ts`, `proxy.ts`, `register/page.tsx`, `profile.ts`, `dependencies`, `clients/[id]/page.tsx`, `scores/page.tsx`, `payroll/forms.tsx`, `[month]/page.tsx`, `registrations/forms.tsx`, `LinkButton`, `manilaToday`, `ledger/types.ts`, `deadlines/page.tsx`, `books/page.tsx`, `register-xlsx.ts`, `cycle/page.tsx`, `Badge`, `dropdown.tsx`, `books/reports/page.tsx`, `books/forms.tsx`, `proof-upload.tsx`, `settings/page.tsx`, `theme-toggle.tsx`, `collections/actions.ts`, `collections/forms.tsx`, `requireStaff`, `morning.ts`, `app/app/layout.tsx`, `form-2316.tsx`, `server-only`, `requireOwner`, `print/page.tsx`, `getIdentity`, `quote/page.tsx`, `settings/actions.ts`, `registrations/[id]/page.tsx`, `react`, `app/requests/[id]/page.tsx`, `returns/load.ts`, `fees/[id]/page.tsx`, `worksheet/page.tsx`, `react`, `fees/data.ts`, `sign-off-actions.tsx`, `parties/parties.test.ts`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13438735177865613 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `checkbox.tsx`, `Skeleton`, `package.json`, `fields.ts`, `register/page.tsx`, `profile.ts`, `dependencies`, `statements.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `[month]/page.tsx`, `registrations/forms.tsx`, `LinkButton`, `manilaToday`, `deadlines/page.tsx`, `supabaseServer`, `client-form.tsx`, `books/page.tsx`, `cycle/page.tsx`, `Badge`, `tabs.tsx`, `dropdown.tsx`, `books/reports/page.tsx`, `books/forms.tsx`, `proof-upload.tsx`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `collections/forms.tsx`, `requireStaff`, `button.tsx`, `notification.tsx`, `file-upload.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `server-only`, `social-button.tsx`, `requireOwner`, `print/page.tsx`, `getIdentity`, `quote/page.tsx`, `registrations/[id]/page.tsx`, `react`, `app/requests/[id]/page.tsx`, `cx.ts`, `fees/[id]/page.tsx`, `worksheet/page.tsx`, `fees/data.ts`, `sign-off-actions.tsx`, `parties/parties.test.ts`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1455026455026455 - nodes in this community are weakly interconnected._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Skeleton` be split into smaller, more focused modules?**
  _Cohesion score 0.1354679802955665 - nodes in this community are weakly interconnected._