# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 448 files · ~332,251 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3066 nodes · 9963 edges · 127 communities (109 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 106 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `6543a36c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- supabaseServer
- cycle/page.tsx
- sign-off.ts
- app/documents/page.tsx
- registrations/forms.tsx
- package.json
- fields.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- steps.ts
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
- money.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- payroll/data.ts
- ref_node_fs
- [clientId]/page.tsx
- registrations/forms.tsx
- requireOwner
- scripts
- @remixicon/react
- ledger/types.ts
- LinkButton
- parties/[id]/page.tsx
- payroll/types.ts
- supabaseServer
- Centavos
- src/app/layout.tsx
- returns/types.ts
- books/page.tsx
- opening.ts
- register-xlsx.ts
- cycle-forms.tsx
- schedule.ts
- tabs.tsx
- dropdown.tsx
- Apple Design
- returns/load.ts
- vitest
- clients/[id]/page.tsx
- ledger/data.ts
- books/forms.tsx
- LinkButton
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- ledger-lock.test.ts
- theme-toggle.tsx
- arap.ts
- income.ts
- form-2316.tsx
- acting-approver/page.tsx
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- formatAmount
- generate-qap-fixture.mjs
- cx
- document-scanner.tsx
- app/app/layout.tsx
- ui.tsx
- fees/types.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- collections/forms.tsx
- BoardUI page patterns
- proxy.ts
- boardui
- rates.ts
- books/reports/page.tsx
- register-xlsx.ts
- quote.ts
- settings/actions.ts
- proof-upload.tsx
- requireOwner
- manilaToday
- quote/page.tsx
- acting-approver.test.ts
- Skeleton
- ledger.test.ts
- portal/layout.tsx
- schedule.ts
- fees/[id]/page.tsx
- fees/types.ts
- server.ts
- book-income.ts
- business.ts
- upload.tsx
- fees/data.ts
- copy-opencv.mjs

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 196 edges
2. `Notice()` - 143 edges
3. `react` - 135 edges
4. `cx` - 133 edges
5. `Button()` - 125 edges
6. `Skeleton()` - 119 edges
7. `next` - 111 edges
8. `Card()` - 102 edges
9. `Badge()` - 101 edges
10. `requireOwner()` - 96 edges

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

## Communities (127 total, 18 thin omitted)

### Community 0 - "supabaseServer"
Cohesion: 0.08
Nodes (36): Event, eventText, Filing(), FilingPage(), paymentText, when(), Lines(), lineStyle (+28 more)

### Community 1 - "cycle/page.tsx"
Cohesion: 0.09
Nodes (45): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+37 more)

### Community 2 - "sign-off.ts"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.39
Nodes (5): PeriodFilter(), PeriodKey, periodRange(), PERIODS, ym()

### Community 4 - "registrations/forms.tsx"
Cohesion: 0.16
Nodes (19): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+11 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "fields.ts"
Cohesion: 0.14
Nodes (20): approveDocumentAction(), checkFields(), Issue, num(), msgs(), ok, FieldKey, keys (+12 more)

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

### Community 11 - "steps.ts"
Cohesion: 0.08
Nodes (59): completeRegistrationAction(), CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration() (+51 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (57): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+49 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (36): defaultCashFlow(), loadStatements(), FsLine, FsLineKey, isFsLine(), Section, Statement, add() (+28 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.12
Nodes (52): atcInfo(), atcKind(), normalizeAtc(), incomeAttachments(), Periods, periods(), buildSawt(), incomePayment() (+44 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "money.ts"
Cohesion: 0.18
Nodes (14): Split, AtcTotal, docLabel(), EwtLine, ewtLines(), ListedDocument, applyRate(), basisPoints() (+6 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (37): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+29 more)

### Community 42 - "Notice"
Cohesion: 0.12
Nodes (57): AccountForm(), EntryForm(), ReleaseReportForm(), SetupForm(), AssignForm(), ClientUserForm(), EngagementForm(), EmployeeForm() (+49 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (49): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+41 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.09
Nodes (56): saveMonthAction(), EmployeeDetail(), EmployeePage(), MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when() (+48 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.06
Nodes (11): pg@^8.23.1, pg, ctx, input, root, root, root, root (+3 more)

### Community 46 - "[clientId]/page.tsx"
Cohesion: 0.13
Nodes (16): OCR_DOC_TYPES, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+8 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.09
Nodes (38): cancelRegistrationAction(), ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+30 more)

### Community 48 - "requireOwner"
Cohesion: 0.12
Nodes (34): zod, activateAction(), createFromTemplateAction(), deleteDraftAction(), newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+26 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "@remixicon/react"
Cohesion: 0.11
Nodes (32): @remixicon/react, RequestDetail(), RequestPage(), portalContext(), PortalRequest(), RequestDetail(), Detail(), PortalStatementDetail() (+24 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.09
Nodes (31): CASH_FLOW_CLASSES, CashFlowClass, codes, PNL, acct(), ADVANCES_FROM, ASSETS, build() (+23 more)

### Community 52 - "LinkButton"
Cohesion: 0.13
Nodes (29): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist() (+21 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (37): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList(), Row (+29 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (21): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+13 more)

### Community 55 - "supabaseServer"
Cohesion: 0.08
Nodes (42): nextConfig, next, server-only, Detail(), StatementPage(), generateFilingsNow(), advanceFilingAction(), amendFilingAction() (+34 more)

### Community 56 - "Centavos"
Cohesion: 0.09
Nodes (48): GridRow, AlphalistRow, Certificates2316, form2316(), Form2316Employer, Form2316Line, Form2316Signatory, mmdd() (+40 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (51): VatData, agentProblems(), amountText(), emptyResult(), PAYROLL_NOT_LOADED, form1601C, INPUTS, MONTH (+43 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.17
Nodes (23): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+15 more)

### Community 60 - "opening.ts"
Cohesion: 0.14
Nodes (21): buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos(), QuoteLine (+13 more)

### Community 61 - "register-xlsx.ts"
Cohesion: 0.16
Nodes (23): file(), GET(), safe(), GET(), monthlyTable(), monthlyWithholding(), employeesForMonth(), buildEmployeeTemplate() (+15 more)

### Community 62 - "cycle-forms.tsx"
Cohesion: 0.32
Nodes (11): CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton(), closeCycleAction(), CycleState, decideExceptionAction(), nothingToSubmitAction() (+3 more)

### Community 63 - "schedule.ts"
Cohesion: 0.13
Nodes (15): conditionsSchema, num(), optionalAmount, range, ScheduleStatus, SettingsInput, settingsSchema, toFeeItem() (+7 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (41): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+33 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/load.ts"
Cohesion: 0.11
Nodes (32): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, AtcKind, BUSINESS_TAX_ATCS, dayBefore() (+24 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (19): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "clients/[id]/page.tsx"
Cohesion: 0.23
Nodes (13): RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, Row (+5 more)

### Community 70 - "ledger/data.ts"
Cohesion: 0.12
Nodes (26): Accounts(), AccountsPage(), GROUPS, dayBefore(), GET(), safe(), NewEntry(), NewEntryPage() (+18 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.19
Nodes (34): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+26 more)

### Community 72 - "LinkButton"
Cohesion: 0.33
Nodes (11): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+3 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.15
Nodes (22): SettingsState, periodWord, RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "ledger-lock.test.ts"
Cohesion: 0.20
Nodes (6): templatePayload(), BOOK_LOCK_FORMS, as(), books(), root, root

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "arap.ts"
Cohesion: 0.14
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 80 - "income.ts"
Cohesion: 0.12
Nodes (51): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+43 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 82 - "acting-approver/page.tsx"
Cohesion: 0.12
Nodes (35): DashboardStats(), FilingListRow, FilingTable(), Deadlines(), DeadlinesPage(), ActingNotice(), AmendmentNotice(), DashboardPage() (+27 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 86 - "cx.ts"
Cohesion: 0.05
Nodes (37): react, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor (+29 more)

### Community 87 - "formatAmount"
Cohesion: 0.12
Nodes (34): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+26 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "cx"
Cohesion: 0.12
Nodes (26): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+18 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+11 more)

### Community 92 - "ui.tsx"
Cohesion: 0.09
Nodes (27): DocReviewActions(), GenerateState, GenerateButton(), DirectoryParty, ENTRY_STATUS, typeLabel, SignOffState, AmendFilingForm() (+19 more)

### Community 93 - "fees/types.ts"
Cohesion: 0.16
Nodes (17): @supabase/supabase-js, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+9 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.18
Nodes (13): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButton(), SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps (+5 more)

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

### Community 101 - "collections/forms.tsx"
Cohesion: 0.27
Nodes (15): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+7 more)

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

### Community 106 - "books/reports/page.tsx"
Cohesion: 0.14
Nodes (22): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+14 more)

### Community 107 - "register-xlsx.ts"
Cohesion: 0.17
Nodes (20): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), runOcr(), SKIP (+12 more)

### Community 108 - "quote.ts"
Cohesion: 0.15
Nodes (22): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient (+14 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.26
Nodes (12): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, updateRuleAction(), checkbox, dayBefore() (+4 more)

### Community 110 - "proof-upload.tsx"
Cohesion: 0.16
Nodes (19): NewRequestForm(), TicketForm(), ReplyForm(), send(), METHODS, ProofUpload(), ProofState, shrinkImage() (+11 more)

### Community 111 - "requireOwner"
Cohesion: 0.08
Nodes (45): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+37 more)

### Community 112 - "manilaToday"
Cohesion: 0.08
Nodes (50): Doc, DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow (+42 more)

### Community 113 - "quote/page.tsx"
Cohesion: 0.32
Nodes (7): COMPLEXITY_LABEL, Lines(), QuoteView(), TAXPAYER_LABEL, Total(), Quote, COMPLEXITY_FLAGS

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "Skeleton"
Cohesion: 0.09
Nodes (43): NewClientPage(), ClientList(), ClientsPage(), ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review() (+35 more)

### Community 116 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 118 - "schedule.ts"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 119 - "fees/[id]/page.tsx"
Cohesion: 0.20
Nodes (17): FeeFormState, loadSchedule(), ActivateForm(), billingHint, DeleteDraftButton(), PriceRow, PricesForm(), Result() (+9 more)

### Community 120 - "fees/types.ts"
Cohesion: 0.19
Nodes (15): count(), first(), pick(), profileFromQuery(), QuerySource, items, suggestedAnnualItems(), BOOKKEEPING_LEVELS (+7 more)

### Community 121 - "server.ts"
Cohesion: 0.24
Nodes (12): GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode(), errors (+4 more)

### Community 122 - "book-income.ts"
Cohesion: 0.31
Nodes (8): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, LedgerMovement

### Community 123 - "business.ts"
Cohesion: 0.22
Nodes (8): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, modules

### Community 124 - "upload.tsx"
Cohesion: 0.60
Nodes (4): PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), PortalPayrollUpload()

### Community 132 - "fees/data.ts"
Cohesion: 0.20
Nodes (14): dateFmt, longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm(), StartNewVersionForm() (+6 more)

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 904 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `cx.ts` to `supabaseServer`, `app/documents/page.tsx`, `fees/data.ts`, `package.json`, `steps.ts`, `profile.ts`, `dependencies`, `statements.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `@remixicon/react`, `parties/[id]/page.tsx`, `supabaseServer`, `books/page.tsx`, `cycle-forms.tsx`, `tabs.tsx`, `dropdown.tsx`, `clients/[id]/page.tsx`, `ledger/data.ts`, `books/forms.tsx`, `LinkButton`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `acting-approver/page.tsx`, `button.tsx`, `notification.tsx`, `formatAmount`, `cx`, `document-scanner.tsx`, `app/app/layout.tsx`, `ui.tsx`, `social-button.tsx`, `file-upload.tsx`, `print/page.tsx`, `collections/forms.tsx`, `books/reports/page.tsx`, `quote.ts`, `proof-upload.tsx`, `requireOwner`, `manilaToday`, `quote/page.tsx`, `Skeleton`, `schedule.ts`, `fees/[id]/page.tsx`, `server.ts`, `upload.tsx`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `supabaseServer` be split into smaller, more focused modules?**
  _Cohesion score 0.07822410147991543 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `supabaseServer`, `fees/data.ts`, `package.json`, `fields.ts`, `steps.ts`, `profile.ts`, `dependencies`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `requireOwner`, `@remixicon/react`, `parties/[id]/page.tsx`, `src/app/layout.tsx`, `books/page.tsx`, `register-xlsx.ts`, `cycle-forms.tsx`, `clients/[id]/page.tsx`, `ledger/data.ts`, `books/forms.tsx`, `LinkButton`, `settings/page.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `acting-approver/page.tsx`, `cx.ts`, `formatAmount`, `app/app/layout.tsx`, `ui.tsx`, `fees/types.ts`, `print/page.tsx`, `collections/forms.tsx`, `proxy.ts`, `books/reports/page.tsx`, `register-xlsx.ts`, `quote.ts`, `settings/actions.ts`, `proof-upload.tsx`, `requireOwner`, `manilaToday`, `quote/page.tsx`, `Skeleton`, `fees/[id]/page.tsx`, `server.ts`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `cycle/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08552188552188553 - nodes in this community are weakly interconnected._
- **Should `sign-off.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0960591133004926 - nodes in this community are weakly interconnected._