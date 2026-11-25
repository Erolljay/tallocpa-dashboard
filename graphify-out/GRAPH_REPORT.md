# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 458 files · ~361,620 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3130 nodes · 10166 edges · 144 communities (125 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `3aadb680`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- filings/run.ts
- migrate.yml
- app/documents/page.tsx
- opening.ts
- devDependencies
- review-form.tsx
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
- payroll/data.ts
- ref_node_fs
- gemini.ts
- registrations/forms.tsx
- payroll/data.ts
- scripts
- manilaToday
- ledger/types.ts
- returns/types.ts
- parties/[id]/page.tsx
- payroll/types.ts
- next
- Centavos
- withholding.test.ts
- money.ts
- Button
- quote.ts
- register-xlsx.ts
- cycle/page.tsx
- [clientId]/page.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- source.ts
- vitest
- package.json
- books/reports/page.tsx
- books/forms.tsx
- @remixicon/react
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- compute1702RT
- theme-toggle.tsx
- engine.ts
- income.ts
- manilaToday
- acting-approver/page.tsx
- button.tsx
- Pro components
- notification.tsx
- file-upload.tsx
- proxy.ts
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- PageHeader
- server-only
- social-button.tsx
- Recipes
- supabaseServer
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- eslint.config.mjs
- BoardUI page patterns
- arap.ts
- boardui
- rates.ts
- fees/types.ts
- auth.ts
- quote/page.tsx
- settings/actions.ts
- Centavos
- Card
- portal/documents/page.tsx
- qap.ts
- acting-approver.test.ts
- tests/parties.test.ts
- ledger.test.ts
- apply-migrations.sh
- cx.ts
- fees/[id]/page.tsx
- worksheet/page.tsx
- zod
- fees/data.ts
- review/page.tsx
- Staff and Owner UX review (Phase 1)
- sign-off-actions.tsx
- parties/parties.test.ts
- react
- gap/page.tsx
- checkbox.tsx
- fees/forms.tsx
- clients/schema.ts
- percentage.ts
- template.ts
- returns/load.ts
- ref_node_fs
- app/app/page.tsx
- lookupAtc
- copy-opencv.mjs
- getIdentity
- periods
- src/app/layout.tsx
- tests/payroll.test.ts
- register-books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 198 edges
2. `Notice()` - 145 edges
3. `cx` - 140 edges
4. `react` - 136 edges
5. `Button()` - 125 edges
6. `Skeleton()` - 121 edges
7. `next` - 112 edges
8. `Card()` - 108 edges
9. `Badge()` - 105 edges
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

## Communities (144 total, 19 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.12
Nodes (21): Event, eventText, Filing(), FilingPage(), paymentText, when(), PaymentCheck, Delegation (+13 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.14
Nodes (23): Rule, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance, Frequency, Obligation (+15 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.15
Nodes (19): ClientSelect(), ApprovedTable(), ClientList(), countBy(), Documents(), DocumentsPage(), MonthCell(), one() (+11 more)

### Community 4 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, tsx@^4.23.15, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.09
Nodes (41): approveDocumentAction(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), Booking, DirectoryParty, ENTRY_STATUS (+33 more)

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
Cohesion: 0.07
Nodes (56): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amt() (+48 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (39): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine() (+31 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.16
Nodes (35): sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow, branchCode(), crlf(), csv() (+27 more)

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
Cohesion: 0.22
Nodes (16): FormState, AssignForm(), ClientUserForm(), EngagementForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail() (+8 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "Notice"
Cohesion: 0.15
Nodes (43): AmendmentRequestForm(), ArapUpload(), EntryForm(), OpeningUpload(), ReleaseReportForm(), SetupForm(), EmployeeForm(), EmployeeUpload() (+35 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.12
Nodes (37): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+29 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.12
Nodes (31): GET(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Data, Form2316Employer, Form2316Line, Form2316Signatory (+23 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.09
Nodes (13): pg, vitest, templatePayload(), BOOK_LOCK_FORMS, root, root, as(), books() (+5 more)

### Community 46 - "gemini.ts"
Cohesion: 0.13
Nodes (15): OcrOutput, ocrOutputSchema, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+7 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (73): ClientCaseKind, dtiRegisteredOn(), FormState, openClientCaseAction(), openYearRenewalsAction(), CompleteButton(), StepRow, YearRenewalsForm() (+65 more)

### Community 48 - "payroll/data.ts"
Cohesion: 0.16
Nodes (31): saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), Payroll() (+23 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.15
Nodes (21): Detail(), PortalStatementDetail(), Latest(), PortalStatement(), Detail(), PayNow(), proofBadge, proofMethod (+13 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.08
Nodes (38): Accounts(), AccountsPage(), GROUPS, AccountForm(), codes, PNL, acct(), ADVANCES_FROM (+30 more)

### Community 52 - "returns/types.ts"
Cohesion: 0.11
Nodes (34): FinancialStatements, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4() (+26 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.29
Nodes (11): MergeForm(), PresetAccountForm(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), PARTY_KINDS, PARTY_ROLES (+3 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "next"
Cohesion: 0.09
Nodes (27): nextConfig, next, server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, POST() (+19 more)

### Community 56 - "Centavos"
Cohesion: 0.14
Nodes (28): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+20 more)

### Community 57 - "withholding.test.ts"
Cohesion: 0.17
Nodes (8): PAYROLL_FORMS, form0619E, form1601EQ, WITHHOLDING_FORMS, client, Q1, moduleForForm(), modules

### Community 58 - "money.ts"
Cohesion: 0.12
Nodes (26): incomePayment(), agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel() (+18 more)

### Community 59 - "Button"
Cohesion: 0.17
Nodes (21): AmendmentDecision(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm() (+13 more)

### Community 60 - "quote.ts"
Cohesion: 0.14
Nodes (26): EstimatedProfile, buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange(), matches() (+18 more)

### Community 61 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (28): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), sortItems(), CheckedRegister, checkRegister(), fmt() (+20 more)

### Community 62 - "cycle/page.tsx"
Cohesion: 0.16
Nodes (22): Cycle(), CyclePage(), CycleWithClient, DocRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+14 more)

### Community 63 - "[clientId]/page.tsx"
Cohesion: 0.09
Nodes (53): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+45 more)

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
Cohesion: 0.14
Nodes (23): ATC_MASTER, AtcInfo, normalizeAtc(), amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND, DocumentRow (+15 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 70 - "books/reports/page.tsx"
Cohesion: 0.15
Nodes (20): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+12 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (36): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+28 more)

### Community 72 - "@remixicon/react"
Cohesion: 0.11
Nodes (36): @remixicon/react, RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalClient, portalContext() (+28 more)

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
Nodes (34): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+26 more)

### Community 77 - "compute1702RT"
Cohesion: 0.23
Nodes (23): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+15 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "engine.ts"
Cohesion: 0.17
Nodes (23): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule, fiscalYearOf() (+15 more)

### Community 80 - "income.ts"
Cohesion: 0.08
Nodes (44): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), form1701, form1702RT (+36 more)

### Community 81 - "manilaToday"
Cohesion: 0.22
Nodes (19): DocReviewActions(), DocumentsCard(), when(), shift(), Home(), PortalHome(), DocumentUpload(), send() (+11 more)

### Community 82 - "acting-approver/page.tsx"
Cohesion: 0.26
Nodes (14): EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge, activeFor(), Appointment, appointmentRow() (+6 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 86 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 87 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (30): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+22 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+11 more)

### Community 92 - "PageHeader"
Cohesion: 0.12
Nodes (36): NewEntry(), NewEntryPage(), EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Release2316Form(), PayrollSetupPage() (+28 more)

### Community 93 - "server-only"
Cohesion: 0.19
Nodes (12): digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail(), cycleMessage() (+4 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "supabaseServer"
Cohesion: 0.08
Nodes (56): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), updateClientAction(), NewClientPage() (+48 more)

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
Cohesion: 0.07
Nodes (51): exceljs, dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate() (+43 more)

### Community 101 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "arap.ts"
Cohesion: 0.15
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+10 more)

### Community 106 - "fees/types.ts"
Cohesion: 0.14
Nodes (20): PriceRow, EngagementRow, TaxpayerType, ExistingClient, count(), first(), pick(), profileFromQuery() (+12 more)

### Community 107 - "auth.ts"
Cohesion: 0.15
Nodes (17): GenerateButton(), Deadlines(), DeadlinesPage(), recomputeWorksheetAction(), WorksheetState, GET(), fieldErrors(), PartyFormState (+9 more)

### Community 108 - "quote/page.tsx"
Cohesion: 0.31
Nodes (9): longDate(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+1 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "Centavos"
Cohesion: 0.18
Nodes (19): GridRow, AlphalistRow, AnnualSummary, MonthLines, PriorAmounts, Suggestion, TemplateInput, MonthInput (+11 more)

### Community 111 - "Card"
Cohesion: 0.10
Nodes (36): ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient(), EditClientPage(), caseNote (+28 more)

### Community 112 - "portal/documents/page.tsx"
Cohesion: 0.18
Nodes (16): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+8 more)

### Community 113 - "qap.ts"
Cohesion: 0.18
Nodes (16): EwtLine, tinDigits(), branchFromTin(), buildQapRows(), csvCell(), mmYYYY(), MONTH_NAMES, qapCsv() (+8 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 116 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 118 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 119 - "fees/[id]/page.tsx"
Cohesion: 0.17
Nodes (24): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+16 more)

### Community 120 - "worksheet/page.tsx"
Cohesion: 0.18
Nodes (15): FilingListRow, Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet() (+7 more)

### Community 121 - "zod"
Cohesion: 0.18
Nodes (16): zod, GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+8 more)

### Community 122 - "fees/data.ts"
Cohesion: 0.14
Nodes (17): dateFmt, statusLabel, statusTone, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+9 more)

### Community 123 - "review/page.tsx"
Cohesion: 0.26
Nodes (10): Queue(), ReviewPage(), Row, Section(), showDate(), QueueFiling, QueueViewer, ReviewQueue (+2 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (12): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheckView(), SignOffActions() (+4 more)

### Community 126 - "parties/parties.test.ts"
Cohesion: 0.15
Nodes (24): datAddress(), datNameCols(), displayName(), fullAddress(), listNameCols(), Names, Party, PARTY_COLUMNS (+16 more)

### Community 127 - "react"
Cohesion: 0.15
Nodes (21): react, FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList() (+13 more)

### Community 128 - "gap/page.tsx"
Cohesion: 0.20
Nodes (13): loadSchedules(), FeeGapPage(), Gap(), estimateProfile(), gapFor(), GapRow, has(), lastWholeMonths() (+5 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "fees/forms.tsx"
Cohesion: 0.29
Nodes (11): nextEffectiveDate(), ActivateForm(), billingHint, CreateFromTemplateForm(), NewDraftForm(), PricesForm(), Result(), SettingsValues (+3 more)

### Community 131 - "clients/schema.ts"
Cohesion: 0.19
Nodes (8): assignmentSchema, clientFields, editClientSchema, efpsGroupError, engagementSchema, NewClient, newClientSchema, base

### Community 132 - "percentage.ts"
Cohesion: 0.21
Nodes (12): costsOf(), incomeAttachments(), salesOf(), buildSawt(), docLabel(), docsWithin(), monthWithin(), netOfVat() (+4 more)

### Community 133 - "template.ts"
Cohesion: 0.20
Nodes (7): items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL, FeeItemTemplate

### Community 134 - "returns/load.ts"
Cohesion: 0.25
Nodes (10): dayBefore(), FilingRow, ListedDocument, loadLedger(), loadYearStatements(), PAYROLL_FORM_CODES, SavedWorksheet, Supabase (+2 more)

### Community 135 - "ref_node_fs"
Cohesion: 0.20
Nodes (3): ctx, input, root

### Community 136 - "app/app/page.tsx"
Cohesion: 0.46
Nodes (7): FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary(), Chip()

### Community 137 - "lookupAtc"
Cohesion: 0.39
Nodes (7): lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc()

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 139 - "getIdentity"
Cohesion: 0.57
Nodes (6): advanceFilingAction(), amendFilingAction(), amount, stepData(), text(), getIdentity()

### Community 140 - "periods"
Cohesion: 0.67
Nodes (7): Periods, periods(), addMonths(), monthEnd(), pad2(), quarterOf(), taxableYear()

### Community 141 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 143 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 925 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `filings/[id]/page.tsx`, `gap/page.tsx`, `fees/forms.tsx`, `app/documents/page.tsx`, `review-form.tsx`, `app/app/page.tsx`, `register/page.tsx`, `getIdentity`, `profile.ts`, `src/app/layout.tsx`, `dependencies`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `payroll/data.ts`, `manilaToday`, `ledger/types.ts`, `parties/[id]/page.tsx`, `Button`, `register-xlsx.ts`, `cycle/page.tsx`, `[clientId]/page.tsx`, `dropdown.tsx`, `package.json`, `books/reports/page.tsx`, `books/forms.tsx`, `@remixicon/react`, `settings/page.tsx`, `theme-toggle.tsx`, `manilaToday`, `acting-approver/page.tsx`, `proxy.ts`, `app/app/layout.tsx`, `PageHeader`, `supabaseServer`, `print/page.tsx`, `auth.ts`, `quote/page.tsx`, `settings/actions.ts`, `Card`, `portal/documents/page.tsx`, `fees/[id]/page.tsx`, `worksheet/page.tsx`, `zod`, `review/page.tsx`, `sign-off-actions.tsx`, `react`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `gap/page.tsx`, `fees/forms.tsx`, `app/documents/page.tsx`, `checkbox.tsx`, `review-form.tsx`, `app/app/page.tsx`, `register/page.tsx`, `profile.ts`, `dependencies`, `statements.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `registrations/forms.tsx`, `payroll/data.ts`, `manilaToday`, `ledger/types.ts`, `parties/[id]/page.tsx`, `next`, `Button`, `cycle/page.tsx`, `[clientId]/page.tsx`, `tabs.tsx`, `dropdown.tsx`, `package.json`, `books/reports/page.tsx`, `books/forms.tsx`, `@remixicon/react`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `manilaToday`, `acting-approver/page.tsx`, `button.tsx`, `notification.tsx`, `file-upload.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `PageHeader`, `social-button.tsx`, `supabaseServer`, `print/page.tsx`, `auth.ts`, `quote/page.tsx`, `Card`, `portal/documents/page.tsx`, `cx.ts`, `fees/[id]/page.tsx`, `worksheet/page.tsx`, `zod`, `review/page.tsx`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13793103448275862 - nodes in this community are weakly interconnected._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._