# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 422 files · ~309,552 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 2907 nodes · 9221 edges · 125 communities (106 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 101 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `5d79f3c5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-off.ts
- filings/run.ts
- migrate.yml
- filters.tsx
- arap.ts
- package.json
- review-form.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- index.ts
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
- payroll/payroll.test.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- payroll/data.ts
- ref_node_fs
- gemini.ts
- register.ts
- Card
- scripts
- next
- ledger/types.ts
- returns/types.ts
- parties/[id]/page.tsx
- payroll/types.ts
- books/export/route.ts
- Centavos
- src/app/layout.tsx
- money.ts
- books/page.tsx
- quote.ts
- [id]/payroll/page.tsx
- cycle/page.tsx
- template.ts
- tabs.tsx
- cx
- Apple Design
- source.ts
- vitest
- year/[year]/page.tsx
- acting/run.ts
- books/forms.tsx
- ui.tsx
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- ledger-lock.test.ts
- theme-toggle.tsx
- opening.ts
- income.ts
- form-2316.tsx
- filings/[id]/page.tsx
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- [clientId]/page.tsx
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- sign-off-actions.tsx
- server-only
- social-button.tsx
- Recipes
- file-upload.tsx
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- business.ts
- BoardUI page patterns
- proxy.ts
- boardui
- rates.ts
- Building UIs with BoardUI
- parties/actions.ts
- fees/types.ts
- book-income.ts
- react
- supabaseServer
- Card
- PageHeader
- acting-approver.test.ts
- lock.ts
- ledger.test.ts
- apply-migrations.sh
- checkbox.tsx
- fees/data.ts
- upload.tsx
- deadlines/page.tsx
- parties/parties.test.ts
- brand/forms.tsx
- fees/data.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 171 edges
2. `Notice()` - 130 edges
3. `cx` - 123 edges
4. `react` - 123 edges
5. `Button()` - 111 edges
6. `Skeleton()` - 103 edges
7. `next` - 99 edges
8. `Card()` - 92 edges
9. `requireOwner()` - 88 edges
10. `Badge()` - 85 edges

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

## Communities (125 total, 19 thin omitted)

### Community 0 - "sign-off.ts"
Cohesion: 0.11
Nodes (18): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue(), ACTION_LABEL, availableActions(), FilingState (+10 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.05
Nodes (74): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), periodWord (+66 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+12 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.11
Nodes (29): approveDocumentAction(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Booking, DirectoryParty, ENTRY_STATUS, typeLabel (+21 more)

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

### Community 11 - "index.ts"
Cohesion: 0.11
Nodes (19): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+11 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (47): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+39 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.06
Nodes (55): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+47 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.09
Nodes (59): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+51 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "payroll/payroll.test.ts"
Cohesion: 0.13
Nodes (28): MonthGrid(), toInput(), entry(), P(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear() (+20 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "Notice"
Cohesion: 0.16
Nodes (43): AccountForm(), EntryForm(), ReleaseReportForm(), SetupForm(), ClientUserForm(), EngagementForm(), EmployeeForm(), EmployeeUpload() (+35 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (42): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+34 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.13
Nodes (38): @supabase/supabase-js, saveMonthAction(), EmployeeDetail(), EmployeePage(), PayrollMonth(), PayrollMonthPage(), when(), check() (+30 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.08
Nodes (11): pg@^8.23.1, pg, vitest, ctx, input, root, root, root (+3 more)

### Community 46 - "gemini.ts"
Cohesion: 0.13
Nodes (16): OcrOutput, ocrOutputSchema, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+8 more)

### Community 47 - "register.ts"
Cohesion: 0.25
Nodes (12): Payroll(), PayrollPage(), checkRegister(), fmt(), norm(), normalizeTin(), parseName(), RegisterIssue (+4 more)

### Community 48 - "Card"
Cohesion: 0.16
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "next"
Cohesion: 0.08
Nodes (39): nextConfig, next, Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat() (+31 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.22
Nodes (11): CASH_FLOW_CLASSES, CashFlowClass, EntryOut, TbRowOut, BOOKS, Control, CONTROLS, ENTRY_SOURCES (+3 more)

### Community 52 - "returns/types.ts"
Cohesion: 0.12
Nodes (28): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell(), datDate() (+20 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.16
Nodes (19): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names (+11 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (20): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+12 more)

### Community 55 - "books/export/route.ts"
Cohesion: 0.36
Nodes (8): dayBefore(), GET(), safe(), fromWorkbookData(), buildBookWorkbook(), accountFromRow(), loadAccounts(), loadBookEntries()

### Community 56 - "Centavos"
Cohesion: 0.10
Nodes (41): GridRow, AlphaCols, AlphalistRow, buildAlphalist(), certificatesFromRaw(), form2316(), Form2316Data, Form2316Employer (+33 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (55): Split, form1601C, INPUTS, MONTH, form1604C, PAYROLL_FORMS, agentBackground(), agentErrors() (+47 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.10
Nodes (43): GROUPS, AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BOOK_OPTIONS, BookPicker(), CloseYearForm() (+35 more)

### Community 60 - "quote.ts"
Cohesion: 0.13
Nodes (23): buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos(), QuoteLine (+15 more)

### Community 61 - "[id]/payroll/page.tsx"
Cohesion: 0.18
Nodes (21): file(), GET(), safe(), GET(), employeesForMonth(), buildEmployeeTemplate(), ID_HEADERS, TOTAL_HEADERS (+13 more)

### Community 62 - "cycle/page.tsx"
Cohesion: 0.15
Nodes (22): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CloseCycleButton(), Message(), NothingToSubmitButton() (+14 more)

### Community 63 - "template.ts"
Cohesion: 0.22
Nodes (6): items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "cx"
Cohesion: 0.06
Nodes (51): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+43 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "source.ts"
Cohesion: 0.12
Nodes (30): recomputeWorksheetAction(), WorksheetState, LOCKED_STATUSES, dayBefore(), FilingRow, ListedDocument, loadLedger(), loadWorksheet() (+22 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "year/[year]/page.tsx"
Cohesion: 0.46
Nodes (7): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings()

### Community 70 - "acting/run.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 71 - "books/forms.tsx"
Cohesion: 0.19
Nodes (31): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+23 more)

### Community 72 - "ui.tsx"
Cohesion: 0.09
Nodes (45): Accounts(), AccountsPage(), NewEntry(), NewEntryPage(), AssignForm(), StatusButton(), ClientDetail(), ClientPage() (+37 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.18
Nodes (22): appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote, SettingsPage(), accountSchema (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "ledger-lock.test.ts"
Cohesion: 0.20
Nodes (6): templatePayload(), BOOK_LOCK_FORMS, as(), books(), root, root

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (32): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), reportsTab, applyTheme() (+24 more)

### Community 79 - "opening.ts"
Cohesion: 0.14
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 80 - "income.ts"
Cohesion: 0.12
Nodes (50): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+42 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 82 - "filings/[id]/page.tsx"
Cohesion: 0.12
Nodes (36): DashboardStats(), Event, eventText, Filing(), FilingPage(), paymentText, when(), GET() (+28 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (27): react-dom@19.3.0, react-dom, AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 86 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 87 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (46): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+38 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.14
Nodes (9): outDir, pkgDir, require, { version }, api, ctx, fn, rows (+1 more)

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (30): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+22 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.12
Nodes (26): advanceFilingAction(), amendFilingAction(), amount, SignOffState, stepData(), text(), AppLayout(), nav (+18 more)

### Community 92 - "sign-off-actions.tsx"
Cohesion: 0.23
Nodes (12): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), SignOffActions() (+4 more)

### Community 93 - "server-only"
Cohesion: 0.23
Nodes (12): server-only, GET(), runActingDigest(), sendEmail(), cycleMessage(), dayFmt, NoticeKind, showDay() (+4 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.09
Nodes (29): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+21 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.09
Nodes (39): BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad(), PrintButton(), BOOK_ABBR, BOOK_KINDS (+31 more)

### Community 101 - "business.ts"
Cohesion: 0.25
Nodes (7): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 107 - "parties/actions.ts"
Cohesion: 0.18
Nodes (19): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), lookupParties(), person, blank() (+11 more)

### Community 108 - "fees/types.ts"
Cohesion: 0.11
Nodes (30): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+22 more)

### Community 109 - "book-income.ts"
Cohesion: 0.31
Nodes (8): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, LedgerMovement

### Community 110 - "react"
Cohesion: 0.14
Nodes (21): react, DocReviewActions(), Detail(), PayNow(), METHODS, ProofUpload(), send(), amount (+13 more)

### Community 111 - "supabaseServer"
Cohesion: 0.06
Nodes (71): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+63 more)

### Community 112 - "Card"
Cohesion: 0.06
Nodes (74): @remixicon/react, Doc, DocumentsCard(), when(), ExceptionRow, ClientSelect(), Review(), ApprovedTable() (+66 more)

### Community 113 - "PageHeader"
Cohesion: 0.23
Nodes (14): loadSchedules(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuoteView() (+6 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 116 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 118 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 120 - "fees/data.ts"
Cohesion: 0.19
Nodes (12): zod@^4.6.7, zod, conditionsSchema, num(), optionalAmount, range, ScheduleStatus, SettingsInput (+4 more)

### Community 121 - "upload.tsx"
Cohesion: 0.60
Nodes (4): PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), PortalPayrollUpload()

### Community 122 - "deadlines/page.tsx"
Cohesion: 0.32
Nodes (7): generateFilingsNow(), GenerateState, FilingTable(), GenerateButton(), Deadlines(), DeadlinesPage(), supabaseAdmin()

### Community 123 - "parties/parties.test.ts"
Cohesion: 0.26
Nodes (13): displayName(), fullAddress(), listNameCols(), partyTinLabel(), ABBREVIATIONS, fillFromDirectory(), nameTokens(), ResolvedParty (+5 more)

### Community 131 - "brand/forms.tsx"
Cohesion: 0.38
Nodes (6): FieldDef, FIELDS, pesoInput(), Result(), SUBMIT, TaxForm()

### Community 132 - "fees/data.ts"
Cohesion: 0.20
Nodes (14): dateFmt, longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm(), NewDraftForm() (+6 more)

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 873 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filings/run.ts`, `filters.tsx`, `brand/forms.tsx`, `package.json`, `review-form.tsx`, `fees/data.ts`, `dependencies`, `statements.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `register.ts`, `Card`, `next`, `parties/[id]/page.tsx`, `books/page.tsx`, `cycle/page.tsx`, `tabs.tsx`, `cx`, `year/[year]/page.tsx`, `ui.tsx`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `filings/[id]/page.tsx`, `button.tsx`, `notification.tsx`, `cx.ts`, `[clientId]/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `sign-off-actions.tsx`, `social-button.tsx`, `file-upload.tsx`, `print/page.tsx`, `supabaseServer`, `Card`, `PageHeader`, `checkbox.tsx`, `upload.tsx`, `deadlines/page.tsx`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `sign-off.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `filings/run.ts`, `brand/forms.tsx`, `fees/data.ts`, `package.json`, `review-form.tsx`, `profile.ts`, `dependencies`, `statements.ts`, `scores/page.tsx`, `payroll/forms.tsx`, `payroll/data.ts`, `register.ts`, `Card`, `parties/[id]/page.tsx`, `books/export/route.ts`, `src/app/layout.tsx`, `books/page.tsx`, `[id]/payroll/page.tsx`, `cycle/page.tsx`, `cx`, `source.ts`, `year/[year]/page.tsx`, `books/forms.tsx`, `ui.tsx`, `settings/page.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `filings/[id]/page.tsx`, `[clientId]/page.tsx`, `app/app/layout.tsx`, `sign-off-actions.tsx`, `server-only`, `social-button.tsx`, `print/page.tsx`, `proxy.ts`, `parties/actions.ts`, `react`, `supabaseServer`, `Card`, `PageHeader`, `deadlines/page.tsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05165965404394577 - nodes in this community are weakly interconnected._
- **Why does `cx()` connect `form-2316.tsx` to `Building UIs with BoardUI`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._