# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 456 files · ~358,444 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3125 nodes · 10149 edges · 130 communities (111 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `5eb27a94`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- filings/run.ts
- migrate.yml
- app/documents/page.tsx
- toCentavos
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
- registrations/forms.tsx
- scores/page.tsx
- Notice
- payroll/forms.tsx
- payroll/data.ts
- ref_node_fs
- gemini.ts
- registrations/forms.tsx
- registrations/page.tsx
- scripts
- manilaToday
- ledger/types.ts
- returns/types.ts
- parties/[id]/page.tsx
- payroll/types.ts
- supabaseServer
- Centavos
- FormModule
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
- package.json
- books/reports/page.tsx
- books/forms.tsx
- @remixicon/react
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- accounts/page.tsx
- theme-toggle.tsx
- proof-upload.tsx
- income.ts
- form-2316.tsx
- requireStaff
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
- clients/actions.ts
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- eslint.config.mjs
- BoardUI page patterns
- ledger-lock.test.ts
- boardui
- rates.ts
- ledger-closing.test.ts
- parties/parties.test.ts
- quote/page.tsx
- settings/actions.ts
- proof-actions.ts
- clients/[id]/page.tsx
- app/documents/page.tsx
- payment-actions.ts
- acting-approver.test.ts
- tests/parties.test.ts
- ledger.test.ts
- apply-migrations.sh
- cx.ts
- fees/[id]/page.tsx
- PartyForm
- sign-in-form.tsx
- Staff and Owner UX review (Phase 1)
- sign-off-actions.tsx
- parties/parties.test.ts
- react
- checkbox.tsx
- branches/page.tsx
- documents/[id]/page.tsx
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

## Communities (130 total, 19 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.10
Nodes (27): Event, eventText, Filing(), FilingPage(), paymentText, when(), SignOffActions(), PortalReturns() (+19 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.09
Nodes (46): Rule, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), toIso() (+38 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.18
Nodes (17): ClientSelect(), ApprovedTable(), ClientList(), countBy(), Documents(), DocumentsPage(), MonthCell(), one() (+9 more)

### Community 4 - "toCentavos"
Cohesion: 0.08
Nodes (42): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+34 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, tsx@^4.23.15, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.13
Nodes (23): approveDocumentAction(), DirectoryParty, ENTRY_STATUS, typeLabel, DocActionState, checkFields(), Issue, num() (+15 more)

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
Cohesion: 0.10
Nodes (43): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+35 more)

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
Nodes (41): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine() (+33 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.14
Nodes (41): incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtResult (+33 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "registrations/forms.tsx"
Cohesion: 0.14
Nodes (22): Row, completeRegistrationAction(), caseNote, caseTitle, CompleteButton(), statusTone, StepBadge(), StepRow (+14 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.05
Nodes (73): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), VoidDepositForm(), WaiveDueForm() (+65 more)

### Community 42 - "Notice"
Cohesion: 0.14
Nodes (41): EntryForm(), ReleaseReportForm(), EmployeeUpload(), ItemForm(), PayrollSettingsForm(), PreviewTable(), PriorEmployerForm(), RegisterUpload() (+33 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (43): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+35 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.10
Nodes (41): @supabase/supabase-js, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Party, Form2316Signatory, mmdd() (+33 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.08
Nodes (11): pg, vitest, ctx, input, root, root, root, root (+3 more)

### Community 46 - "gemini.ts"
Cohesion: 0.12
Nodes (19): OCR_DOC_TYPES, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+11 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.07
Nodes (51): cancelRegistrationAction(), ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+43 more)

### Community 48 - "registrations/page.tsx"
Cohesion: 0.18
Nodes (22): YearRenewalsForm(), fmt(), Registration(), RegistrationPage(), SlipCell(), RegistrationList(), RegistrationsPage(), Requests() (+14 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.13
Nodes (29): Detail(), StatementPage(), portalContext(), Payroll(), PortalPayroll(), STATUS, when(), Detail() (+21 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.07
Nodes (38): BIR_LINES, BirGroup, BirLine, codes, PNL, acct(), ADVANCES_FROM, ASSETS (+30 more)

### Community 52 - "returns/types.ts"
Cohesion: 0.11
Nodes (32): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+24 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.13
Nodes (25): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList() (+17 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "supabaseServer"
Cohesion: 0.06
Nodes (51): nextConfig, next, server-only, zod, generateFilingsNow(), GenerateState, GenerateButton(), advanceFilingAction() (+43 more)

### Community 56 - "Centavos"
Cohesion: 0.09
Nodes (42): GridRow, MonthGrid(), toInput(), Form2316Line, annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion() (+34 more)

### Community 57 - "FormModule"
Cohesion: 0.15
Nodes (10): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, LoadedWorksheet (+2 more)

### Community 58 - "form-1601eq.ts"
Cohesion: 0.07
Nodes (50): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), EwtLine (+42 more)

### Community 59 - "Button"
Cohesion: 0.17
Nodes (26): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+18 more)

### Community 60 - "quote.ts"
Cohesion: 0.06
Nodes (59): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+51 more)

### Community 61 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (47): file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), Payroll(), PayrollPage() (+39 more)

### Community 62 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (29): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), Home(), PortalHome(), CloseCycleButton() (+21 more)

### Community 63 - "requireOwner"
Cohesion: 0.25
Nodes (16): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+8 more)

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
Cohesion: 0.06
Nodes (60): recomputeWorksheetAction(), GET(), Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when() (+52 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 70 - "books/reports/page.tsx"
Cohesion: 0.24
Nodes (13): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReports(), Reports(), when() (+5 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (36): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+28 more)

### Community 72 - "@remixicon/react"
Cohesion: 0.20
Nodes (19): @remixicon/react, RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests() (+11 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.16
Nodes (23): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+15 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (34): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+26 more)

### Community 77 - "accounts/page.tsx"
Cohesion: 0.31
Nodes (8): Accounts(), AccountsPage(), GROUPS, AccountForm(), NewEntry(), NewEntryPage(), accountFromRow(), loadAccounts()

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "proof-upload.tsx"
Cohesion: 0.33
Nodes (7): ProofReview(), METHODS, ProofUpload(), send(), ProofState, startProofUpload(), submitProof()

### Community 80 - "income.ts"
Cohesion: 0.11
Nodes (57): BirLineKey, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+49 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.18
Nodes (18): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+10 more)

### Community 82 - "requireStaff"
Cohesion: 0.11
Nodes (36): FilingListRow, FilingTable(), Deadlines(), DeadlinesPage(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView() (+28 more)

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
Cohesion: 0.13
Nodes (28): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), Release2316Form(), yearWorksheet(), PrintAll() (+20 more)

### Community 93 - "server-only"
Cohesion: 0.17
Nodes (15): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+7 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "clients/actions.ts"
Cohesion: 0.10
Nodes (37): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), updateClientAction(), ClientValues, EditClient() (+29 more)

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
Nodes (47): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+39 more)

### Community 101 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+12 more)

### Community 106 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.20
Nodes (17): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), normalizeTin(), lookupParties(), blank() (+9 more)

### Community 108 - "quote/page.tsx"
Cohesion: 0.24
Nodes (14): loadSchedules(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage() (+6 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "proof-actions.ts"
Cohesion: 0.29
Nodes (9): amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text(), TYPES (+1 more)

### Community 111 - "clients/[id]/page.tsx"
Cohesion: 0.14
Nodes (24): FormState, removeAssignmentAction(), ClientForm(), frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm() (+16 more)

### Community 112 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (30): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+22 more)

### Community 113 - "payment-actions.ts"
Cohesion: 0.36
Nodes (9): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setPaymentDaysAction(), text() (+1 more)

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
Cohesion: 0.08
Nodes (54): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+46 more)

### Community 120 - "PartyForm"
Cohesion: 0.83
Nodes (3): PartyForm(), NewParty(), NewPartyPage()

### Community 121 - "sign-in-form.tsx"
Cohesion: 0.36
Nodes (8): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), SignInForm(), Divider(), SocialButton()

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off-actions.tsx"
Cohesion: 0.31
Nodes (9): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+1 more)

### Community 126 - "parties/parties.test.ts"
Cohesion: 0.24
Nodes (14): displayName(), fullAddress(), listNameCols(), Party, person, ABBREVIATIONS, fillFromDirectory(), nameTokens() (+6 more)

### Community 127 - "react"
Cohesion: 0.13
Nodes (18): react, DocReviewActions(), PeriodFilter(), FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm() (+10 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 131 - "branches/page.tsx"
Cohesion: 0.36
Nodes (9): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), AddBranchForm(), BranchRowForm(), Branches() (+1 more)

### Community 134 - "documents/[id]/page.tsx"
Cohesion: 0.29
Nodes (8): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), Booking, LOCKED_STATUSES, LockFiling, lockingFiling()

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 923 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `checkbox.tsx`, `app/documents/page.tsx`, `branches/page.tsx`, `documents/[id]/page.tsx`, `review-form.tsx`, `register/page.tsx`, `profile.ts`, `dependencies`, `statements.ts`, `registrations/forms.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `registrations/forms.tsx`, `registrations/page.tsx`, `manilaToday`, `parties/[id]/page.tsx`, `supabaseServer`, `Button`, `register-xlsx.ts`, `cycle/page.tsx`, `requireOwner`, `tabs.tsx`, `dropdown.tsx`, `returns/load.ts`, `package.json`, `books/reports/page.tsx`, `books/forms.tsx`, `@remixicon/react`, `settings/page.tsx`, `stat-cards.tsx`, `accounts/page.tsx`, `theme-toggle.tsx`, `proof-upload.tsx`, `requireStaff`, `button.tsx`, `notification.tsx`, `file-upload.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `PageHeader`, `social-button.tsx`, `clients/actions.ts`, `print/page.tsx`, `quote/page.tsx`, `clients/[id]/page.tsx`, `app/documents/page.tsx`, `cx.ts`, `fees/[id]/page.tsx`, `PartyForm`, `sign-in-form.tsx`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10037878787878787 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `filings/[id]/page.tsx`, `app/documents/page.tsx`, `branches/page.tsx`, `review-form.tsx`, `documents/[id]/page.tsx`, `register/page.tsx`, `profile.ts`, `dependencies`, `registrations/forms.tsx`, `scores/page.tsx`, `payroll/forms.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `registrations/page.tsx`, `manilaToday`, `ledger/types.ts`, `parties/[id]/page.tsx`, `Button`, `register-xlsx.ts`, `cycle/page.tsx`, `requireOwner`, `dropdown.tsx`, `returns/load.ts`, `package.json`, `books/reports/page.tsx`, `books/forms.tsx`, `@remixicon/react`, `settings/page.tsx`, `accounts/page.tsx`, `theme-toggle.tsx`, `proof-upload.tsx`, `form-2316.tsx`, `requireStaff`, `proxy.ts`, `app/app/layout.tsx`, `PageHeader`, `server-only`, `clients/actions.ts`, `print/page.tsx`, `parties/parties.test.ts`, `quote/page.tsx`, `settings/actions.ts`, `proof-actions.ts`, `clients/[id]/page.tsx`, `app/documents/page.tsx`, `payment-actions.ts`, `fees/[id]/page.tsx`, `sign-off-actions.tsx`, `react`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09147869674185463 - nodes in this community are weakly interconnected._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `toCentavos` be split into smaller, more focused modules?**
  _Cohesion score 0.07619738751814223 - nodes in this community are weakly interconnected._