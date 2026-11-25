# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 539 files · ~425,152 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3545 nodes · 11732 edges · 163 communities (143 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 112 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `bcd04fb8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-off-actions.tsx
- engine.ts
- migrate.yml
- notification.tsx
- arap.ts
- devDependencies
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- settings/page.tsx
- Sign-in & Setup Docs
- steps.ts
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
- Centavos
- scores/page.tsx
- Notice
- payroll/forms.tsx
- Skeleton
- templatePayload
- [month]/page.tsx
- requireOwner
- profile.ts
- scripts
- percentage.ts
- [clientId]/page.tsx
- batch/register.ts
- ledger/data.ts
- payroll/types.ts
- server.ts
- compute.ts
- clients/actions.ts
- form-1601eq.ts
- Input
- payroll/data.ts
- app/app/page.tsx
- fixed-assets.test.ts
- workpapers/page.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- returns/types.ts
- vitest
- register-xlsx.ts
- percentage.ts
- books/forms.tsx
- requireOwner
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- deadlines/page.tsx
- theme-toggle.tsx
- quote.ts
- safeguards-load.ts
- payment-forms.tsx
- acting-approver/page.tsx
- button.tsx
- Pro components
- cx.ts
- [clientId]/page.tsx
- FormModule
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- LinkButton
- generate-filings/route.ts
- opening.ts
- Recipes
- index.ts
- BoardUI theming reference
- Pro templates
- supabaseServer
- print/page.tsx
- fees/data.ts
- BoardUI page patterns
- registrations/forms.tsx
- boardui
- rates.ts
- Textarea
- parties/[id]/page.tsx
- filings/actions.ts
- settings/actions.ts
- fees/[id]/page.tsx
- Opening balances: checklist for any cut-off
- source.ts
- LinkButton
- acting-approver.test.ts
- react
- parties/parties.test.ts
- apply-migrations.sh
- showMonth
- fees/types.ts
- ref_node_fs
- assets/schedule.ts
- work/load.ts
- formatAmount
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- toCentavos
- fixed-assets/forms.tsx
- cycle/page.tsx
- checkbox.tsx
- db.test.ts
- proof-actions.ts
- quote/page.tsx
- workpapers/load.ts
- money.ts
- package.json
- app/documents/page.tsx
- src/app/layout.tsx
- documents/[id]/page.tsx
- ledger.test.ts
- ref_node_fs
- social-button.tsx
- proxy.ts
- copy-opencv.mjs
- ledger-documents.test.ts
- eslint.config.mjs
- books/reports/page.tsx
- branches/page.tsx
- fields.ts
- manilaToday
- workpapers.test.ts
- Badge
- brand/forms.tsx
- names.ts
- sign-in-form.tsx
- gap/page.tsx
- people/schema.ts
- supabaseAdmin
- tieouts.test.ts
- parties/page.tsx
- register-books.test.ts
- ledger-lock.test.ts
- acting-approver/actions.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 226 edges
2. `Notice()` - 155 edges
3. `cx` - 155 edges
4. `react` - 149 edges
5. `Button()` - 147 edges
6. `Skeleton()` - 133 edges
7. `Card()` - 130 edges
8. `next` - 128 edges
9. `Badge()` - 127 edges
10. `PageHeader()` - 106 edges

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

## Communities (163 total, 20 thin omitted)

### Community 0 - "sign-off-actions.tsx"
Cohesion: 0.31
Nodes (9): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+1 more)

### Community 1 - "engine.ts"
Cohesion: 0.08
Nodes (48): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), DeadlineRule (+40 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "gemini.ts"
Cohesion: 0.13
Nodes (16): OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+8 more)

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

### Community 11 - "settings/page.tsx"
Cohesion: 0.17
Nodes (22): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+14 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "steps.ts"
Cohesion: 0.16
Nodes (29): CompleteButton(), StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+21 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (43): CASH_FLOW_CLASSES, defaultCashFlow(), codes, PNL, loadStatements(), FS_LINES, FsLine, FsLineKey (+35 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.10
Nodes (53): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments(), Periods (+45 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "Centavos"
Cohesion: 0.11
Nodes (34): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), previewOf(), RegisterPreview, totals(), Form2316Data (+26 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (34): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+26 more)

### Community 42 - "Notice"
Cohesion: 0.12
Nodes (44): FormState, ClientForm(), frequencyLabel, Props, StaffOptions(), BatchUpload(), PreviewTable(), AccountForm() (+36 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (52): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+44 more)

### Community 44 - "Skeleton"
Cohesion: 0.14
Nodes (27): RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, ClientList() (+19 more)

### Community 45 - "templatePayload"
Cohesion: 0.17
Nodes (8): templatePayload(), root, as(), client(), root, as(), books(), root

### Community 46 - "[month]/page.tsx"
Cohesion: 0.20
Nodes (14): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p(), PayrollRuns(), Run (+6 more)

### Community 47 - "requireOwner"
Cohesion: 0.29
Nodes (13): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+5 more)

### Community 48 - "profile.ts"
Cohesion: 0.06
Nodes (53): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+45 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "percentage.ts"
Cohesion: 0.12
Nodes (38): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+30 more)

### Community 51 - "[clientId]/page.tsx"
Cohesion: 0.16
Nodes (23): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), ageOpenItems(), AGING_BUCKETS (+15 more)

### Community 52 - "batch/register.ts"
Cohesion: 0.08
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 53 - "ledger/data.ts"
Cohesion: 0.14
Nodes (23): Accounts(), AccountsPage(), GROUPS, dayBefore(), GET(), safe(), fromWorkbookData(), buildBookWorkbook() (+15 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.08
Nodes (33): exceljs, entry(), P(), cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS (+25 more)

### Community 55 - "server.ts"
Cohesion: 0.11
Nodes (29): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+21 more)

### Community 56 - "compute.ts"
Cohesion: 0.14
Nodes (22): GridRow, MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion() (+14 more)

### Community 57 - "clients/actions.ts"
Cohesion: 0.12
Nodes (21): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), addClientUserAction(), fieldErrors(), inviteStaffAction() (+13 more)

### Community 58 - "form-1601eq.ts"
Cohesion: 0.09
Nodes (39): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), tinDigits(), totalsByAtc(), form0619E (+31 more)

### Community 59 - "Input"
Cohesion: 0.15
Nodes (28): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm(), ConfirmAllButton() (+20 more)

### Community 60 - "payroll/data.ts"
Cohesion: 0.10
Nodes (42): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Certificates2316, certificatesFromRaw(), form2316() (+34 more)

### Community 61 - "app/app/page.tsx"
Cohesion: 0.19
Nodes (18): DashboardStats(), FilingListRow, FilingTable(), SignOffActions(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView() (+10 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.19
Nodes (20): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+12 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.09
Nodes (42): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+34 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "register-xlsx.ts"
Cohesion: 0.25
Nodes (14): file(), GET(), safe(), Payroll(), PayrollPage(), GET(), employeesForMonth(), loadStored() (+6 more)

### Community 70 - "percentage.ts"
Cohesion: 0.22
Nodes (24): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+16 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (38): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+30 more)

### Community 72 - "requireOwner"
Cohesion: 0.19
Nodes (20): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction() (+12 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.13
Nodes (22): Access, STATUS, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, ChecklistInput (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (45): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+37 more)

### Community 77 - "deadlines/page.tsx"
Cohesion: 0.07
Nodes (50): BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO, SafeguardsNotice(), TaxType (+42 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.13
Nodes (25): buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos(), QuoteInput (+17 more)

### Community 80 - "safeguards-load.ts"
Cohesion: 0.28
Nodes (8): Queue(), ReviewPage(), Row, Section(), QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 81 - "payment-forms.tsx"
Cohesion: 0.29
Nodes (11): zod, accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+3 more)

### Community 82 - "acting-approver/page.tsx"
Cohesion: 0.25
Nodes (15): EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge, activeFor(), Appointment, appointmentRow() (+7 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.21
Nodes (20): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+12 more)

### Community 87 - "FormModule"
Cohesion: 0.14
Nodes (11): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, LoadedWorksheet (+3 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (28): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+20 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+11 more)

### Community 92 - "LinkButton"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 93 - "generate-filings/route.ts"
Cohesion: 0.17
Nodes (16): server-only, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+8 more)

### Community 94 - "opening.ts"
Cohesion: 0.16
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+9 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "index.ts"
Cohesion: 0.11
Nodes (16): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+8 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "supabaseServer"
Cohesion: 0.09
Nodes (28): nextConfig, next, postPayrollAction(), PostState, PostPayrollButton(), approveDocumentAction(), recomputeWorksheetAction(), WorksheetState (+20 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (40): BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad(), PrintButton(), BOOK_ABBR, BOOK_KINDS (+32 more)

### Community 101 - "fees/data.ts"
Cohesion: 0.14
Nodes (18): dateFmt, statusLabel, statusTone, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+10 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (60): ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+52 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "Textarea"
Cohesion: 0.18
Nodes (22): NewRequestForm(), TicketForm(), CloseRequestButton(), ReplyForm(), send(), METHODS, ProofUpload(), send() (+14 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (33): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName() (+25 more)

### Community 108 - "filings/actions.ts"
Cohesion: 0.20
Nodes (16): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+8 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "source.ts"
Cohesion: 0.09
Nodes (35): FinancialStatements, ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), qapWarnings(), dayBefore(), FilingRow (+27 more)

### Community 113 - "LinkButton"
Cohesion: 0.37
Nodes (10): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+2 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "react"
Cohesion: 0.10
Nodes (22): react, EntryForm(), NewEntry(), NewEntryPage(), DocReviewActions(), ExplainForm(), SetupCharts(), PeriodFilter() (+14 more)

### Community 116 - "parties/parties.test.ts"
Cohesion: 0.19
Nodes (18): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), runOcr(), SKIP, lookupParties() (+10 more)

### Community 118 - "showMonth"
Cohesion: 0.14
Nodes (27): PortalClient, MonthComplete(), SentRow, TimelineRow, Home(), KINDS, manilaDay(), MonthCard() (+19 more)

### Community 119 - "fees/types.ts"
Cohesion: 0.13
Nodes (19): count(), first(), pick(), profileFromQuery(), QuerySource, items, DOCUMENT_BANDS, EMPLOYEE_BANDS (+11 more)

### Community 120 - "ref_node_fs"
Cohesion: 0.14
Nodes (4): ctx, input, root, root

### Community 121 - "assets/schedule.ts"
Cohesion: 0.21
Nodes (19): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), loadAssets(), Row (+11 more)

### Community 122 - "work/load.ts"
Cohesion: 0.16
Nodes (22): Action(), MyWork(), MyWorkPage(), short(), TONE, addDays(), parseIso(), loadBoard() (+14 more)

### Community 123 - "formatAmount"
Cohesion: 0.09
Nodes (50): Batch(), BatchPage(), one(), toCentavos(), amt(), CertificatesTable(), Href, LineParts() (+42 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.13
Nodes (19): Event, eventText, Filing(), FilingPage(), paymentText, when(), ACTION_LABEL, availableActions() (+11 more)

### Community 126 - "toCentavos"
Cohesion: 0.22
Nodes (11): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, toCentavos(), c(), loadPeriodFile() (+3 more)

### Community 127 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 128 - "cycle/page.tsx"
Cohesion: 0.15
Nodes (24): Cycle(), CycleWithClient, DocRow, shift(), CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+16 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 131 - "proof-actions.ts"
Cohesion: 0.29
Nodes (9): amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text(), TYPES (+1 more)

### Community 132 - "quote/page.tsx"
Cohesion: 0.21
Nodes (15): loadSchedules(), longDate(), nextEffectiveDate(), CreateFromTemplateForm(), StartNewVersionForm(), FeeSchedulePage(), Schedules(), COMPLEXITY_LABEL (+7 more)

### Community 133 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (23): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+15 more)

### Community 134 - "money.ts"
Cohesion: 0.16
Nodes (19): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+11 more)

### Community 135 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, tsx@^4.23.15, @types/node@^20, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (31): approveSelectedAction(), BOOKED, BulkState, key(), ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList() (+23 more)

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "documents/[id]/page.tsx"
Cohesion: 0.31
Nodes (7): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), Booking, LockFiling, lockingFiling()

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.07
Nodes (10): pg, vitest, root, root, root, root, root, root (+2 more)

### Community 141 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 145 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 146 - "books/reports/page.tsx"
Cohesion: 0.24
Nodes (13): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReports(), Reports(), when() (+5 more)

### Community 147 - "branches/page.tsx"
Cohesion: 0.27
Nodes (7): Branches(), BranchesPage(), Branch, branchSchema, groupByBranch(), bac, ilo

### Community 148 - "fields.ts"
Cohesion: 0.10
Nodes (29): DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, Readiness, checkFields(), Issue, num() (+21 more)

### Community 149 - "manilaToday"
Cohesion: 0.11
Nodes (30): Detail(), StatementPage(), portalContext(), Payroll(), PortalPayroll(), STATUS, when(), PortalReport() (+22 more)

### Community 150 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 151 - "Badge"
Cohesion: 0.20
Nodes (17): @remixicon/react, RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), Row, Thread() (+9 more)

### Community 152 - "brand/forms.tsx"
Cohesion: 0.36
Nodes (7): FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm()

### Community 153 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 154 - "sign-in-form.tsx"
Cohesion: 0.24
Nodes (12): code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode(), errors, Form() (+4 more)

### Community 155 - "gap/page.tsx"
Cohesion: 0.15
Nodes (21): ClientValues, loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile, estimateProfile() (+13 more)

### Community 156 - "people/schema.ts"
Cohesion: 0.43
Nodes (5): clientUserSchema, email, inviteStaffSchema, name, updateStaffSchema

### Community 157 - "supabaseAdmin"
Cohesion: 0.29
Nodes (7): GET(), generateFilingsNow(), GenerateState, GenerateButton(), supabaseEnv(), runFilingGeneration(), supabaseAdmin()

### Community 158 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 159 - "parties/page.tsx"
Cohesion: 0.40
Nodes (5): one(), PartyList(), Row, PARTY_KINDS, VAT_STATUSES

### Community 160 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 162 - "acting-approver/actions.ts"
Cohesion: 0.60
Nodes (4): ActingState, appointActingAction(), endActingAction(), refresh()

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1026 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `cycle/page.tsx`, `sign-off-actions.tsx`, `proof-actions.ts`, `quote/page.tsx`, `money.ts`, `package.json`, `app/documents/page.tsx`, `src/app/layout.tsx`, `documents/[id]/page.tsx`, `settings/page.tsx`, `steps.ts`, `proxy.ts`, `dependencies`, `books/reports/page.tsx`, `branches/page.tsx`, `fields.ts`, `manilaToday`, `Badge`, `brand/forms.tsx`, `sign-in-form.tsx`, `gap/page.tsx`, `supabaseAdmin`, `parties/page.tsx`, `acting-approver/actions.ts`, `Centavos`, `scores/page.tsx`, `payroll/forms.tsx`, `Skeleton`, `[month]/page.tsx`, `requireOwner`, `profile.ts`, `[clientId]/page.tsx`, `batch/register.ts`, `ledger/data.ts`, `server.ts`, `clients/actions.ts`, `Input`, `payroll/data.ts`, `app/app/page.tsx`, `workpapers/page.tsx`, `dropdown.tsx`, `register-xlsx.ts`, `books/forms.tsx`, `requireOwner`, `opening-checklist.tsx`, `deadlines/page.tsx`, `theme-toggle.tsx`, `safeguards-load.ts`, `payment-forms.tsx`, `acting-approver/page.tsx`, `[clientId]/page.tsx`, `app/app/layout.tsx`, `LinkButton`, `generate-filings/route.ts`, `print/page.tsx`, `registrations/forms.tsx`, `Textarea`, `parties/[id]/page.tsx`, `filings/actions.ts`, `settings/actions.ts`, `fees/[id]/page.tsx`, `LinkButton`, `react`, `parties/parties.test.ts`, `showMonth`, `assets/schedule.ts`, `work/load.ts`, `formatAmount`, `sign-off.ts`, `toCentavos`, `fixed-assets/forms.tsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07853107344632769 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ref_node_fs` to `cycle/page.tsx`, `engine.ts`, `db.test.ts`, `arap.ts`, `devDependencies`, `gemini.ts`, `package.json`, `app/documents/page.tsx`, `money.ts`, `documents/[id]/page.tsx`, `settings/page.tsx`, `workpapers/load.ts`, `ledger.test.ts`, `ledger-documents.test.ts`, `statements.ts`, `branches/page.tsx`, `fields.ts`, `workpapers.test.ts`, `Badge`, `names.ts`, `gap/page.tsx`, `people/schema.ts`, `tieouts.test.ts`, `register-books.test.ts`, `ledger-lock.test.ts`, `scores/page.tsx`, `templatePayload`, `[month]/page.tsx`, `profile.ts`, `[clientId]/page.tsx`, `batch/register.ts`, `payroll/types.ts`, `clients/actions.ts`, `form-1601eq.ts`, `payroll/data.ts`, `fixed-assets.test.ts`, `vitest`, `requireOwner`, `opening-checklist.tsx`, `deadlines/page.tsx`, `quote.ts`, `safeguards-load.ts`, `acting-approver/page.tsx`, `document-scanner.tsx`, `generate-filings/route.ts`, `opening.ts`, `index.ts`, `supabaseServer`, `print/page.tsx`, `fees/data.ts`, `registrations/forms.tsx`, `rates.ts`, `parties/[id]/page.tsx`, `filings/actions.ts`, `settings/actions.ts`, `source.ts`, `acting-approver.test.ts`, `showMonth`, `fees/types.ts`, `ref_node_fs`, `assets/schedule.ts`, `formatAmount`, `sign-off.ts`, `toCentavos`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `cycle/page.tsx`, `sign-off-actions.tsx`, `checkbox.tsx`, `notification.tsx`, `quote/page.tsx`, `money.ts`, `package.json`, `app/documents/page.tsx`, `documents/[id]/page.tsx`, `settings/page.tsx`, `steps.ts`, `social-button.tsx`, `dependencies`, `books/reports/page.tsx`, `branches/page.tsx`, `fields.ts`, `manilaToday`, `statements.ts`, `Badge`, `brand/forms.tsx`, `sign-in-form.tsx`, `gap/page.tsx`, `supabaseAdmin`, `parties/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `Skeleton`, `[month]/page.tsx`, `profile.ts`, `[clientId]/page.tsx`, `ledger/data.ts`, `server.ts`, `Input`, `payroll/data.ts`, `app/app/page.tsx`, `workpapers/page.tsx`, `tabs.tsx`, `dropdown.tsx`, `register-xlsx.ts`, `books/forms.tsx`, `requireOwner`, `stat-cards.tsx`, `deadlines/page.tsx`, `theme-toggle.tsx`, `safeguards-load.ts`, `acting-approver/page.tsx`, `button.tsx`, `cx.ts`, `[clientId]/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `supabaseServer`, `print/page.tsx`, `registrations/forms.tsx`, `Textarea`, `parties/[id]/page.tsx`, `fees/[id]/page.tsx`, `LinkButton`, `showMonth`, `assets/schedule.ts`, `work/load.ts`, `formatAmount`, `sign-off.ts`, `fixed-assets/forms.tsx`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08275862068965517 - nodes in this community are weakly interconnected._