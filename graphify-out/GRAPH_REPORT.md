# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 454 files · ~357,348 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3122 nodes · 10143 edges · 136 communities (118 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `e1e80cb7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- engine.ts
- migrate.yml
- filters.tsx
- arap.ts
- package.json
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
- [month]/page.tsx
- scores/page.tsx
- Notice
- payroll/forms.tsx
- payroll/data.ts
- ref_node_fs
- gemini.ts
- registrations/forms.tsx
- generate.ts
- scripts
- manilaToday
- ledger/types.ts
- returns/types.ts
- parties/[id]/page.tsx
- payroll/types.ts
- supabaseServer
- Centavos
- src/app/layout.tsx
- form-1601eq.ts
- Button
- quote.ts
- register-xlsx.ts
- cycle/page.tsx
- requireOwner
- tabs.tsx
- dropdown.tsx
- Apple Design
- returns/load.ts
- vitest
- dates.ts
- books/reports/page.tsx
- books/forms.tsx
- @remixicon/react
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- register.test.ts
- theme-toggle.tsx
- opening.ts
- income.ts
- form-2316.tsx
- requireStaff
- button.tsx
- Pro components
- notification.tsx
- file-upload.tsx
- [clientId]/page.tsx
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- Skeleton
- server-only
- social-button.tsx
- Recipes
- clients/actions.ts
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- staff/actions.ts
- BoardUI page patterns
- review/page.tsx
- boardui
- rates.ts
- @supabase/supabase-js
- parties/parties.test.ts
- quote/page.tsx
- settings/actions.ts
- getIdentity
- clients/[id]/page.tsx
- app/documents/page.tsx
- payment-actions.ts
- acting-approver.test.ts
- worksheet/page.tsx
- ledger.test.ts
- apply-migrations.sh
- cx.ts
- fees/[id]/page.tsx
- quote/page.tsx
- sign-in-form.tsx
- book-income.ts
- returns/load.ts
- Staff and Owner UX review (Phase 1)
- sign-off-actions.tsx
- parties/parties.test.ts
- ui.tsx
- staff/page.tsx
- checkbox.tsx
- brand/forms.tsx
- auth.ts
- fees/data.ts
- parties/actions.ts
- lock.ts
- copy-opencv.mjs

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

## Communities (136 total, 18 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.13
Nodes (19): Event, eventText, Filing(), FilingPage(), paymentText, when(), ACTION_LABEL, availableActions() (+11 more)

### Community 1 - "engine.ts"
Cohesion: 0.14
Nodes (22): IsoDate, isWeekend(), parseIso(), DeadlineRule, FilingInstance, fiscalYearOf(), followsCalendarYear(), generateFilingInstances() (+14 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "filters.tsx"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.12
Nodes (25): BOOKED_TYPES, loadBooking(), Booking, DirectoryParty, ENTRY_STATUS, typeLabel, checkFields(), Issue (+17 more)

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
Cohesion: 0.14
Nodes (33): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+25 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (53): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+45 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+15 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.11
Nodes (34): defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section, Statement (+26 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.12
Nodes (52): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments(), Periods (+44 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "[month]/page.tsx"
Cohesion: 0.19
Nodes (23): saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), Payroll() (+15 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (34): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+26 more)

### Community 42 - "Notice"
Cohesion: 0.13
Nodes (40): ReleaseReportForm(), EmployeeUpload(), ItemForm(), PayrollSettingsForm(), PreviewTable(), PriorEmployerForm(), RegisterUpload(), SubmissionReview() (+32 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (54): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+46 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.17
Nodes (26): server-only, @supabase/supabase-js, EmployeeDetail(), EmployeePage(), certificatesFromRaw(), loadEntries(), loadPriorEmployers(), PayrollClient (+18 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.06
Nodes (18): pg@^8.23.1, pg, vitest, templatePayload(), BOOK_LOCK_FORMS, ctx, input, root (+10 more)

### Community 46 - "gemini.ts"
Cohesion: 0.13
Nodes (15): OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider(), call() (+7 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (90): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+82 more)

### Community 48 - "generate.ts"
Cohesion: 0.17
Nodes (18): Rule, DueRule, EfpsGroup, FilingChannel, Frequency, PeriodFilter, selectRule(), ACTIVE (+10 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.12
Nodes (29): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), Detail(), PortalStatementDetail() (+21 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.07
Nodes (40): BookEntry, ColumnarBook, CASH_FLOW_CLASSES, CashFlowClass, codes, PNL, acct(), ADVANCES_FROM (+32 more)

### Community 52 - "returns/types.ts"
Cohesion: 0.14
Nodes (28): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+20 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.18
Nodes (18): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, PARTY_COLUMNS (+10 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (23): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+15 more)

### Community 55 - "supabaseServer"
Cohesion: 0.09
Nodes (28): nextConfig, next, zod, Detail(), StatementPage(), approveDocumentAction(), recomputeWorksheetAction(), WorksheetState (+20 more)

### Community 56 - "Centavos"
Cohesion: 0.06
Nodes (69): GridRow, EntryLineOut, CheckedOpening, OpeningLine, Note, StatementLine, AlphaCols, AlphalistRow (+61 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "form-1601eq.ts"
Cohesion: 0.06
Nodes (60): lookupAtc(), BUSINESS_TAX_FORMS, VatData, form1601C, form1604C, PAYROLL_FORMS, agentBackground(), agentErrors() (+52 more)

### Community 59 - "Button"
Cohesion: 0.15
Nodes (27): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+19 more)

### Community 60 - "quote.ts"
Cohesion: 0.11
Nodes (33): EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), has(), buildQuote(), cents(), CustomQuoteItem (+25 more)

### Community 61 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (28): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), previewOf(), totals(), PayrollItem, checkRegister() (+20 more)

### Community 62 - "cycle/page.tsx"
Cohesion: 0.16
Nodes (22): Cycle(), CyclePage(), CycleWithClient, DocRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+14 more)

### Community 63 - "requireOwner"
Cohesion: 0.23
Nodes (18): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+10 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/load.ts"
Cohesion: 0.19
Nodes (19): ATC_MASTER, AtcInfo, normalizeAtc(), loadWorksheet(), amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND (+11 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "dates.ts"
Cohesion: 0.35
Nodes (11): shift(), addMonths(), compareIso(), lastDayOfMonth(), toIso(), ymd(), periodsBetween(), statutoryDueDate() (+3 more)

### Community 70 - "books/reports/page.tsx"
Cohesion: 0.14
Nodes (21): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+13 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (36): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+28 more)

### Community 72 - "@remixicon/react"
Cohesion: 0.13
Nodes (30): @remixicon/react, RequestDetail(), RequestPage(), Row, PortalClient, portalContext(), PortalRequest(), RequestDetail() (+22 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.22
Nodes (13): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote, ToggleAccountButton(), describeDue() (+5 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (34): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+26 more)

### Community 77 - "register.test.ts"
Cohesion: 0.40
Nodes (4): RegisterSourceRow, approved(), as(), root

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "opening.ts"
Cohesion: 0.17
Nodes (16): checkOpening(), fmt(), ItemRow, OpeningItem, sheetOf(), TbRow, accounts, buildOpeningTemplate() (+8 more)

### Community 80 - "income.ts"
Cohesion: 0.10
Nodes (58): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), form1701, form1702RT, inputs1701() (+50 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.11
Nodes (31): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+23 more)

### Community 82 - "requireStaff"
Cohesion: 0.16
Nodes (27): FilingListRow, FilingTable(), Deadlines(), DeadlinesPage(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView() (+19 more)

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

### Community 87 - "[clientId]/page.tsx"
Cohesion: 0.12
Nodes (35): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+27 more)

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

### Community 92 - "Skeleton"
Cohesion: 0.18
Nodes (24): ClientList(), ClientsPage(), DocumentReviewPage(), Review(), NewParty(), NewPartyPage(), PartiesPage(), Requests() (+16 more)

### Community 93 - "server-only"
Cohesion: 0.17
Nodes (16): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+8 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "clients/actions.ts"
Cohesion: 0.12
Nodes (26): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), updateClientAction(), ClientValues (+18 more)

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
Nodes (45): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+37 more)

### Community 101 - "staff/actions.ts"
Cohesion: 0.25
Nodes (11): addClientUserAction(), fieldErrors(), inviteStaffAction(), removeClientUserAction(), updateStaffAction(), ensureLogin(), clientUserSchema, email (+3 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "review/page.tsx"
Cohesion: 0.26
Nodes (9): Queue(), ReviewPage(), Row, Section(), QueueFiling, QueueViewer, ReviewQueue, reviewQueue() (+1 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.24
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+10 more)

### Community 106 - "@supabase/supabase-js"
Cohesion: 0.38
Nodes (5): generateFilingsNow(), GenerateState, GenerateButton(), supabaseEnv(), supabaseAdmin()

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.21
Nodes (16): mergePartyAction(), normalizeTin(), runOcr(), SKIP, lookupParties(), fillFromDirectory(), blank(), optionalText() (+8 more)

### Community 108 - "quote/page.tsx"
Cohesion: 0.20
Nodes (15): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage() (+7 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "getIdentity"
Cohesion: 0.17
Nodes (18): advanceFilingAction(), amendFilingAction(), amount, stepData(), text(), send(), getIdentity(), amount (+10 more)

### Community 111 - "clients/[id]/page.tsx"
Cohesion: 0.13
Nodes (26): FormState, ClientForm(), frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm() (+18 more)

### Community 112 - "app/documents/page.tsx"
Cohesion: 0.09
Nodes (44): Doc, DocumentsCard(), when(), ExceptionRow, ClientSelect(), ApprovedTable(), ClientList(), countBy() (+36 more)

### Community 113 - "payment-actions.ts"
Cohesion: 0.33
Nodes (10): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+2 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "worksheet/page.tsx"
Cohesion: 0.16
Nodes (17): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+9 more)

### Community 116 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 118 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 119 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 120 - "quote/page.tsx"
Cohesion: 0.11
Nodes (23): items, PRICES, schedule, settings, count(), first(), pick(), profileFromQuery() (+15 more)

### Community 121 - "sign-in-form.tsx"
Cohesion: 0.36
Nodes (8): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), SignInForm(), Divider(), SocialButton()

### Community 122 - "book-income.ts"
Cohesion: 0.31
Nodes (8): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, LedgerMovement

### Community 123 - "returns/load.ts"
Cohesion: 0.24
Nodes (10): FinancialStatements, dayBefore(), FilingRow, ListedDocument, loadLedger(), PAYROLL_FORM_CODES, SavedWorksheet, Supabase (+2 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off-actions.tsx"
Cohesion: 0.31
Nodes (9): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+1 more)

### Community 126 - "parties/parties.test.ts"
Cohesion: 0.18
Nodes (14): displayName(), fullAddress(), listNameCols(), Party, person, ABBREVIATIONS, nameTokens(), ResolvedParty (+6 more)

### Community 127 - "ui.tsx"
Cohesion: 0.12
Nodes (21): Accounts(), AccountsPage(), GROUPS, AccountForm(), EntryForm(), NewEntry(), NewEntryPage(), one() (+13 more)

### Community 128 - "staff/page.tsx"
Cohesion: 0.36
Nodes (7): react, FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "brand/forms.tsx"
Cohesion: 0.16
Nodes (16): NewRequestForm(), FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm() (+8 more)

### Community 131 - "auth.ts"
Cohesion: 0.20
Nodes (10): NewClientPage(), OwnerOnly(), addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), Identity (+2 more)

### Community 132 - "fees/data.ts"
Cohesion: 0.12
Nodes (25): dateFmt, loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm() (+17 more)

### Community 133 - "parties/actions.ts"
Cohesion: 0.40
Nodes (5): fieldErrors(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction()

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 921 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `staff/page.tsx` to `filings/[id]/page.tsx`, `checkbox.tsx`, `brand/forms.tsx`, `auth.ts`, `fees/data.ts`, `package.json`, `review-form.tsx`, `register/page.tsx`, `profile.ts`, `dependencies`, `[month]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `manilaToday`, `ledger/types.ts`, `parties/[id]/page.tsx`, `supabaseServer`, `Button`, `cycle/page.tsx`, `tabs.tsx`, `dropdown.tsx`, `books/reports/page.tsx`, `books/forms.tsx`, `@remixicon/react`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `requireStaff`, `button.tsx`, `notification.tsx`, `file-upload.tsx`, `[clientId]/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `Skeleton`, `social-button.tsx`, `clients/actions.ts`, `print/page.tsx`, `review/page.tsx`, `@supabase/supabase-js`, `quote/page.tsx`, `clients/[id]/page.tsx`, `app/documents/page.tsx`, `worksheet/page.tsx`, `cx.ts`, `fees/[id]/page.tsx`, `sign-in-form.tsx`, `sign-off-actions.tsx`, `ui.tsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13438735177865613 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `filings/[id]/page.tsx`, `brand/forms.tsx`, `auth.ts`, `fees/data.ts`, `package.json`, `review-form.tsx`, `parties/actions.ts`, `register/page.tsx`, `profile.ts`, `dependencies`, `[month]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `manilaToday`, `ledger/types.ts`, `parties/[id]/page.tsx`, `src/app/layout.tsx`, `Button`, `register-xlsx.ts`, `cycle/page.tsx`, `requireOwner`, `dropdown.tsx`, `books/reports/page.tsx`, `books/forms.tsx`, `@remixicon/react`, `settings/page.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `requireStaff`, `[clientId]/page.tsx`, `app/app/layout.tsx`, `Skeleton`, `server-only`, `clients/actions.ts`, `print/page.tsx`, `staff/actions.ts`, `review/page.tsx`, `@supabase/supabase-js`, `quote/page.tsx`, `settings/actions.ts`, `getIdentity`, `clients/[id]/page.tsx`, `app/documents/page.tsx`, `payment-actions.ts`, `worksheet/page.tsx`, `fees/[id]/page.tsx`, `sign-off-actions.tsx`, `ui.tsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13538461538461538 - nodes in this community are weakly interconnected._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0960591133004926 - nodes in this community are weakly interconnected._