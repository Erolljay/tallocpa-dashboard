# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 902 files · ~721,206 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5583 nodes · 19508 edges · 205 communities (179 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 173 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `a69f9d90`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- marketing/attribution.ts
- devDependencies
- engine.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
- Sign-in & Setup Docs
- cx.ts
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- income.ts
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- ledger/data.ts
- scores/page.tsx
- compare.ts
- payroll/types.ts
- filings/actions.ts
- returns-sign-off.test.ts
- items.ts
- modal.tsx
- deadlines/page.tsx
- scripts
- supabaseAdmin
- quote/page.tsx
- form-1601c.ts
- documents/labels.ts
- module-pages.tsx
- marketing/page.tsx
- payroll/data.ts
- Badge
- money.ts
- Notice
- blocks.tsx
- arap.ts
- layout.ts
- year-end/page.tsx
- combobox.tsx
- settlement-pages.tsx
- Apple Design
- supabaseServer
- form-1601c.ts
- client-form.tsx
- lib/books/actions.ts
- books/forms.tsx
- form-1601c.ts
- Rules
- Animation Performance
- dropdown.tsx
- stat-cards.tsx
- cycle/actions.ts
- theme-toggle.tsx
- vitest
- [clientId]/page.tsx
- how-we-work/page.tsx
- december-rehearsal.test.ts
- source.ts
- Pro components
- button.tsx
- ledger/data.ts
- portal/reports/page.tsx
- portal-billing.test.ts
- Centavos
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- formatAmount
- Recipes
- engine.ts
- BoardUI page patterns
- Pro templates
- review-form.tsx
- ledger/books.ts
- filings/run.ts
- cx
- cycle/page.tsx
- boardui
- ref_node_path
- quote.ts
- sign-off.ts
- addDays
- supabaseServer
- vitest
- Opening balances: checklist for any cut-off
- cycle/actions.ts
- Card
- transactions-actions.ts
- [clientId]/page.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- vat.ts
- proposal-view.tsx
- Centavos
- safeguards.ts
- ref_node_fs
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- [month]/page.tsx
- books/reports/2307/page.tsx
- read.test.ts
- opening.ts
- mime.ts
- invoice-pages.tsx
- cx
- fields.ts
- fixed-assets/forms.tsx
- site-document.tsx
- react
- ticked-allocation.test.ts
- portal/reports/page.tsx
- getIdentity
- idle-watcher.tsx
- rates.ts
- notes.ts
- showMonth
- parties/actions.ts
- parts.ts
- server-only
- ledger/types.ts
- proposal-view.tsx
- filings/[id]/page.tsx
- (site)/page.tsx
- @remixicon/react
- safeguards.ts
- workpapers/page.tsx
- leads/[id]/page.tsx
- app/documents/page.tsx
- profile.ts
- template.ts
- review-queue.ts
- Card
- batch/forms.tsx
- Rework: one flow from lead to year-end
- slots.ts
- start/page.tsx
- filings/actions.ts
- form-2307.ts
- grid.ts
- opengraph-image.tsx
- generate-qap-fixture.mjs
- bir-filing-calendar/page.tsx
- party-pages.tsx
- draft.ts
- app/settings/page.tsx
- profile.ts
- registrations/[id]/page.tsx
- acting-approver.test.ts
- file-upload.tsx
- collections/forms.tsx
- xlsx.ts
- upload/page.tsx
- money.ts
- documents/[id]/page.tsx
- package.json
- deadlines/actions.ts
- params.ts
- items.ts
- tieouts.test.ts
- lead-attribution.test.ts
- eslint.config.mjs
- batch/page.tsx
- ledger-lock.test.ts
- tests/register.test.ts
- leads-pipeline.test.ts
- parallel-run.test.ts
- portal-statements-approval.test.ts
- defer-documents.test.ts
- fees.test.ts
- register-books.test.ts
- adjustments.test.ts
- approve-and-post.test.ts
- batch-upload.test.ts
- books-lock.test.ts
- contribution-payables.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 315 edges
2. `cx` - 289 edges
3. `react` - 256 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 235 edges
6. `next` - 211 edges
7. `Button()` - 207 edges
8. `vitest` - 168 edges
9. `Card()` - 167 edges
10. `Badge()` - 165 edges

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

## Communities (205 total, 26 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.14
Nodes (28): booksContext(), BooksContext, booksViewFor(), one(), Certificates(), Staff2307Page(), Print(), Print2307Page() (+20 more)

### Community 1 - "index.ts"
Cohesion: 0.04
Nodes (33): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+25 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.13
Nodes (25): TransactionJournal(), TaxCode, taxOn(), allocateOldestFirst(), BOOKS_MODULES, BooksModule, BooksRange, booksRange() (+17 more)

### Community 4 - "marketing/attribution.ts"
Cohesion: 0.09
Nodes (35): ProposalSetup, dateFmt, statusLabel, statusTone, Supabase, QuerySource, JobOption, jobOptions() (+27 more)

### Community 5 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, pg@^8.23.1, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/react@^19, typescript@^5, vitest@^5.1.1 (+5 more)

### Community 6 - "engine.ts"
Cohesion: 0.14
Nodes (25): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+17 more)

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

### Community 11 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (82): GET(), SheetPreview(), Bell(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged() (+74 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx.ts"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

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
Cohesion: 0.08
Nodes (46): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), PrintButton(), CASH_FLOW_CLASSES, CashFlowClass (+38 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (69): BIR_LINES, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+61 more)

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

### Community 40 - "ledger/data.ts"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (64): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+56 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "filings/actions.ts"
Cohesion: 0.11
Nodes (26): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+18 more)

### Community 45 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 46 - "items.ts"
Cohesion: 0.09
Nodes (53): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+45 more)

### Community 47 - "modal.tsx"
Cohesion: 0.10
Nodes (35): react-aria-components, DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button() (+27 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.18
Nodes (18): FilingGroup(), StepProgress(), StepWho, CauseTag, causeTag(), DUE_GROUP_LABELS, DueGroup, FILED (+10 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.23
Nodes (17): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+9 more)

### Community 51 - "quote/page.tsx"
Cohesion: 0.14
Nodes (31): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+23 more)

### Community 52 - "form-1601c.ts"
Cohesion: 0.10
Nodes (25): Alphalist, tinDashed(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+17 more)

### Community 53 - "documents/labels.ts"
Cohesion: 0.15
Nodes (31): GET(), Link, pageAttribution(), requestQuoteAction(), SERVICES, StartState, php, StartForm() (+23 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.09
Nodes (31): BankAccountsRoute(), ReverseForm(), JournalEntryRoute(), BankAccounts(), BOOK_NOTES, dayBefore(), INVOICE_LABEL, JournalView() (+23 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (29): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+21 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.09
Nodes (46): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Release2316Form(), PayrollSetupPage(), Setup(), yearWorksheet() (+38 more)

### Community 57 - "Badge"
Cohesion: 0.05
Nodes (105): ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+97 more)

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (58): client, payslipCsv(), payslipSchedule(), agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule() (+50 more)

### Community 59 - "Notice"
Cohesion: 0.08
Nodes (79): ClientForm(), StaffOptions(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker() (+71 more)

### Community 60 - "blocks.tsx"
Cohesion: 0.12
Nodes (42): AboutPage(), HOW, metadata, BirCalendarPage(), BRING, ContactList(), ContactPage(), metadata (+34 more)

### Community 61 - "arap.ts"
Cohesion: 0.15
Nodes (20): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+12 more)

### Community 62 - "layout.ts"
Cohesion: 0.10
Nodes (42): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), tellPreparer() (+34 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.13
Nodes (28): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+20 more)

### Community 64 - "combobox.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 65 - "settlement-pages.tsx"
Cohesion: 0.11
Nodes (26): PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), ReceiptsViewPage(), fmt() (+18 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "supabaseServer"
Cohesion: 0.04
Nodes (110): nextConfig, zod@^4.6.7, next, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors() (+102 more)

### Community 68 - "form-1601c.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "client-form.tsx"
Cohesion: 0.13
Nodes (25): ClientValues, frequencyLabel, Props, EngagementRow, obligationChanges(), obligationsForTaxTypes(), PlannedObligation, TAX_TYPES (+17 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.14
Nodes (25): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+17 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (37): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+29 more)

### Community 72 - "form-1601c.ts"
Cohesion: 0.07
Nodes (60): GridRow, MonthGrid(), toInput(), AlphaCols, alphaCols(), AlphalistAgent, alphalistCsv(), alphalistDat() (+52 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "dropdown.tsx"
Cohesion: 0.09
Nodes (32): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+24 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (37): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+29 more)

### Community 77 - "cycle/actions.ts"
Cohesion: 0.24
Nodes (15): MonthComplete(), SentRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction() (+7 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.10
Nodes (30): react-dom@19.3.0, react-dom, EmailSwitches(), EmailSwitchGroup, applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme() (+22 more)

### Community 79 - "vitest"
Cohesion: 0.16
Nodes (18): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+10 more)

### Community 80 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (26): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+18 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.17
Nodes (29): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+21 more)

### Community 82 - "december-rehearsal.test.ts"
Cohesion: 0.08
Nodes (18): as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll() (+10 more)

### Community 83 - "source.ts"
Cohesion: 0.11
Nodes (32): newDocs(), oldDocs(), qapBuckets(), sawtBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc() (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "button.tsx"
Cohesion: 0.09
Nodes (25): ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles, IconButtonProps (+17 more)

### Community 86 - "ledger/data.ts"
Cohesion: 0.10
Nodes (40): Accounts(), AccountsPage(), GROUPS, dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision() (+32 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.10
Nodes (57): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+49 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "Centavos"
Cohesion: 0.17
Nodes (14): Db, TIE, ReviewNote, approvalMemo(), Memo, MemoMonth, ALWAYS, REFS_FOR_FORM (+6 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (24): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+16 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.23
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.17
Nodes (29): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+21 more)

### Community 94 - "formatAmount"
Cohesion: 0.17
Nodes (23): fmtMonth(), BooksFrame(), WithdrawReportButton(), JournalRoute(), JournalList(), Payslips(), BooksSummaryPage(), Summary() (+15 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "engine.ts"
Cohesion: 0.14
Nodes (25): compareIso(), lastDayOfMonth(), DeadlineRule, fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), nextWorkingDay() (+17 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.08
Nodes (44): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+36 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.08
Nodes (40): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+32 more)

### Community 101 - "filings/run.ts"
Cohesion: 0.13
Nodes (26): Rule, TimelineFiling, TimelineItem, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance (+18 more)

### Community 102 - "cx"
Cohesion: 0.07
Nodes (49): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, animateTag(), ComboBox(), ComboBoxItem() (+41 more)

### Community 103 - "cycle/page.tsx"
Cohesion: 0.12
Nodes (24): Cycle(), CyclePage(), CycleWithClient, DocRow, FilingsTabs(), FilingsTabsFor(), Section, SECTIONS (+16 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "ref_node_path"
Cohesion: 0.08
Nodes (10): outDir, pkgDir, require, { version }, ctx, input, root, Row (+2 more)

### Community 106 - "quote.ts"
Cohesion: 0.15
Nodes (23): PriceRow, buildQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem, feeTax(), inRange() (+15 more)

### Community 107 - "sign-off.ts"
Cohesion: 0.11
Nodes (16): Row, QueueFiling, QueueViewer, ReviewQueue, ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS (+8 more)

### Community 108 - "addDays"
Cohesion: 0.17
Nodes (19): addDays(), isWeekend(), parseIso(), toIso(), loadBoard(), lastMonth(), loadMyWork(), MyWork (+11 more)

### Community 109 - "supabaseServer"
Cohesion: 0.11
Nodes (24): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+16 more)

### Community 110 - "vitest"
Cohesion: 0.05
Nodes (15): pg, vitest, root, root, HASH, LEAD, root, root (+7 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "cycle/actions.ts"
Cohesion: 0.20
Nodes (17): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+9 more)

### Community 113 - "Card"
Cohesion: 0.12
Nodes (32): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+24 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.27
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.06
Nodes (69): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+61 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.12
Nodes (35): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+27 more)

### Community 118 - "vat.ts"
Cohesion: 0.16
Nodes (34): invoiceLabel(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, branchCode(), crlf(), csv() (+26 more)

### Community 119 - "proposal-view.tsx"
Cohesion: 0.07
Nodes (37): corp, items, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+29 more)

### Community 120 - "Centavos"
Cohesion: 0.05
Nodes (57): BirGroup, BirLine, BirLineKey, isBirLine(), BookLine, ColumnarRow, JournalRow, LedgerSection (+49 more)

### Community 121 - "safeguards.ts"
Cohesion: 0.10
Nodes (28): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, board (+20 more)

### Community 122 - "ref_node_fs"
Cohesion: 0.11
Nodes (13): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+5 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.15
Nodes (17): accountLabel(), BatchCheck, BatchColumn, BatchContext, centavosOf(), checkRow(), findAccount(), isoDate() (+9 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.19
Nodes (18): loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), CreateFromTemplateForm(), StartNewVersionForm(), FeeGapPage(), Gap() (+10 more)

### Community 126 - "[month]/page.tsx"
Cohesion: 0.19
Nodes (15): PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db (+7 more)

### Community 127 - "books/reports/2307/page.tsx"
Cohesion: 0.11
Nodes (33): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+25 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (72): ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, fillFromDirectory(), ITEM_KINDS, PayrollItem, amountOf() (+64 more)

### Community 129 - "opening.ts"
Cohesion: 0.11
Nodes (26): codes, PNL, COA_TEMPLATES, ClientBooks, CheckedOpening, checkOpening(), fmt(), ItemRow (+18 more)

### Community 130 - "mime.ts"
Cohesion: 0.08
Nodes (51): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+43 more)

### Community 131 - "invoice-pages.tsx"
Cohesion: 0.08
Nodes (39): fmtDate(), InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props (+31 more)

### Community 132 - "cx"
Cohesion: 0.04
Nodes (73): react, MonthSelect(), NotificationFilterTabs(), NotificationRowData, Counter(), CounterColor, CounterProps, styles (+65 more)

### Community 133 - "fields.ts"
Cohesion: 0.06
Nodes (43): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, normalizeAmount() (+35 more)

### Community 134 - "fixed-assets/forms.tsx"
Cohesion: 0.31
Nodes (10): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+2 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.12
Nodes (14): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), SiteNotFound(), geist (+6 more)

### Community 136 - "react"
Cohesion: 0.07
Nodes (59): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), EmployeesRoute(), NewEntry(), NewEntryPage() (+51 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "portal/reports/page.tsx"
Cohesion: 0.23
Nodes (10): FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear(), TaxTypeGroup (+2 more)

### Community 139 - "getIdentity"
Cohesion: 0.15
Nodes (25): NewRequestForm(), ReplyForm(), TicketForm(), ReplyForm(), send(), METHODS, ProofUpload(), send() (+17 more)

### Community 140 - "idle-watcher.tsx"
Cohesion: 0.11
Nodes (31): @supabase/ssr@^0.12.7, @supabase/ssr, Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs (+23 more)

### Community 141 - "rates.ts"
Cohesion: 0.24
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+10 more)

### Community 142 - "notes.ts"
Cohesion: 0.11
Nodes (20): ICON, when, inquiryAnswers(), NoteEntry, noteEntry(), NoteRow, NoteSource, notesTimeline() (+12 more)

### Community 143 - "showMonth"
Cohesion: 0.28
Nodes (14): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+6 more)

### Community 144 - "parties/actions.ts"
Cohesion: 0.21
Nodes (16): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), PARTY_COLUMNS, lookupParties(), blank(), optionalText() (+8 more)

### Community 145 - "parts.ts"
Cohesion: 0.12
Nodes (28): Href, LineParts(), one(), Register(), RegisterPage(), shiftMonth(), SOURCE, ACCOUNTS (+20 more)

### Community 146 - "server-only"
Cohesion: 0.12
Nodes (20): server-only, @supabase/supabase-js, GET(), GET(), brandFromRow(), BrandRow, cache, requestOrigin() (+12 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.11
Nodes (30): Access, STATUS, loadAssets(), Row, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD (+22 more)

### Community 148 - "proposal-view.tsx"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 149 - "filings/[id]/page.tsx"
Cohesion: 0.20
Nodes (12): SignOffState, AmendFilingForm(), checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck (+4 more)

### Community 150 - "(site)/page.tsx"
Cohesion: 0.12
Nodes (25): robots(), metadata, sitemap(), NAV, SiteChrome(), JsonLd(), MobileMenu(), clean() (+17 more)

### Community 151 - "@remixicon/react"
Cohesion: 0.17
Nodes (14): @remixicon/react, FLOW_ICONS, GROUP_SPAN, metadata, DOCS, PortalPreview(), Faq, FAQ_GROUPS (+6 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.15
Nodes (25): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+17 more)

### Community 154 - "leads/[id]/page.tsx"
Cohesion: 0.21
Nodes (15): BookingLink(), DiscoveryCallForm(), LostForm(), ProposalForm(), ReopenForm(), Result(), ReviewerForm(), bookedTime (+7 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (29): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths() (+21 more)

### Community 156 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 157 - "template.ts"
Cohesion: 0.11
Nodes (20): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, billedWhen(), BOOKKEEPING_LABEL, DOCUMENT_BANDS (+12 more)

### Community 158 - "review-queue.ts"
Cohesion: 0.15
Nodes (15): day(), Leads(), Row, ViewLink(), acceptProposalAction(), AcceptState, LEAD_STAGE_ORDER, LEAD_STAGES (+7 more)

### Community 159 - "Card"
Cohesion: 0.06
Nodes (79): ClientReturnsPage(), FilingRow, Returns(), DashboardStats(), FilingListRow, FilingTable(), AmendmentCard(), BooksStillOpen() (+71 more)

### Community 160 - "batch/forms.tsx"
Cohesion: 0.29
Nodes (11): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), loadBatchContext(), monthsBetween(), BatchAccount (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "slots.ts"
Cohesion: 0.14
Nodes (27): addDays(), byDay(), DAY_LABEL, freeSlots(), Interval, isFree(), LabelledDay, manilaDate() (+19 more)

### Community 163 - "start/page.tsx"
Cohesion: 0.19
Nodes (15): errors, Form(), LoginPage(), notices, metadata, QuotesClosed(), Start(), StartPage() (+7 more)

### Community 164 - "filings/actions.ts"
Cohesion: 0.23
Nodes (15): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+7 more)

### Community 165 - "form-2307.ts"
Cohesion: 0.11
Nodes (33): Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set(), padded(), PartyFields() (+25 more)

### Community 166 - "grid.ts"
Cohesion: 0.20
Nodes (14): RFC-4180, filled(), GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS, parseCsv() (+6 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 169 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (9): metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn(), GROUPS (+1 more)

### Community 170 - "party-pages.tsx"
Cohesion: 0.21
Nodes (11): SearchParams, BooksList(), Column, ListRow, RowLink(), CustomersRoute(), KINDS, PartyList() (+3 more)

### Community 171 - "draft.ts"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (35): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+27 more)

### Community 173 - "profile.ts"
Cohesion: 0.26
Nodes (14): amt(), CertificatesTable(), PartsLink(), PurchasesTable(), SalesTable(), th(), amt(), Binder() (+6 more)

### Community 174 - "registrations/[id]/page.tsx"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 177 - "collections/forms.tsx"
Cohesion: 0.27
Nodes (11): MoneyState, AddChargeForm(), ApplyCreditButton(), OpenItem, PaymentAccount, ReasonAction(), RecordDepositForm(), RemittedForm() (+3 more)

### Community 178 - "xlsx.ts"
Cohesion: 0.27
Nodes (11): GET(), safe(), loadAccounts(), BATCH_COLUMNS, buildBatchTemplate(), cellText(), MAX_ROWS, norm() (+3 more)

### Community 179 - "upload/page.tsx"
Cohesion: 0.12
Nodes (30): DocReviewActions(), DocumentsCard(), when(), shift(), one(), ORDER, PortalUpload(), STREAM_INFO (+22 more)

### Community 180 - "money.ts"
Cohesion: 0.18
Nodes (16): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+8 more)

### Community 181 - "documents/[id]/page.tsx"
Cohesion: 0.06
Nodes (66): Employees(), file(), GET(), safe(), Payroll(), PayrollPage(), BOOKED_TYPES, DocumentReviewPage() (+58 more)

### Community 182 - "package.json"
Cohesion: 0.18
Nodes (10): tailwindcss@4.3.3, @types/pg@^8.23.1, @types/react-dom@^19, name, packageManager, private, version, tailwindcss (+2 more)

### Community 183 - "deadlines/actions.ts"
Cohesion: 0.52
Nodes (5): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration()

### Community 184 - "params.ts"
Cohesion: 0.38
Nodes (8): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored()

### Community 185 - "items.ts"
Cohesion: 0.25
Nodes (8): BirCategory, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, KIND_ORDER, AmountField

### Community 186 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 187 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 188 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 189 - "batch/page.tsx"
Cohesion: 0.53
Nodes (5): Batch(), BatchPage(), one(), toCentavos(), BATCH_KINDS

### Community 190 - "ledger-lock.test.ts"
Cohesion: 0.33
Nodes (3): BOOK_LOCK_FORMS, doc(), root

### Community 191 - "tests/register.test.ts"
Cohesion: 0.40
Nodes (4): DocumentRow, approved(), as(), root

### Community 192 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 193 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 197 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1480 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `index.ts`, `ui.ts`, `marketing/attribution.ts`, `devDependencies`, `notification-bell.tsx`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `returns-sign-off.test.ts`, `items.ts`, `deadlines/page.tsx`, `quote/page.tsx`, `documents/labels.ts`, `module-pages.tsx`, `Badge`, `money.ts`, `arap.ts`, `layout.ts`, `year-end/page.tsx`, `supabaseServer`, `form-1601c.ts`, `client-form.tsx`, `form-1601c.ts`, `[clientId]/page.tsx`, `december-rehearsal.test.ts`, `source.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `Centavos`, `document-scanner.tsx`, `intake-picker.tsx`, `engine.ts`, `review-form.tsx`, `ledger/books.ts`, `filings/run.ts`, `cycle/page.tsx`, `ref_node_path`, `sign-off.ts`, `supabaseServer`, `Card`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `safeguards.ts`, `ref_node_fs`, `batch/register.ts`, `books/reports/2307/page.tsx`, `read.test.ts`, `opening.ts`, `mime.ts`, `invoice-pages.tsx`, `fields.ts`, `ticked-allocation.test.ts`, `portal/reports/page.tsx`, `idle-watcher.tsx`, `rates.ts`, `notes.ts`, `showMonth`, `parts.ts`, `server-only`, `ledger/types.ts`, `(site)/page.tsx`, `safeguards.ts`, `app/documents/page.tsx`, `profile.ts`, `review-queue.ts`, `Card`, `slots.ts`, `filings/actions.ts`, `form-2307.ts`, `bir-filing-calendar/page.tsx`, `app/settings/page.tsx`, `registrations/[id]/page.tsx`, `acting-approver.test.ts`, `upload/page.tsx`, `money.ts`, `package.json`, `params.ts`, `tieouts.test.ts`, `lead-attribution.test.ts`, `ledger-lock.test.ts`, `tests/register.test.ts`, `leads-pipeline.test.ts`, `parallel-run.test.ts`, `portal-statements-approval.test.ts`, `defer-documents.test.ts`, `fees.test.ts`, `register-books.test.ts`, `adjustments.test.ts`, `approve-and-post.test.ts`, `batch-upload.test.ts`, `books-lock.test.ts`, `contribution-payables.test.ts`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14444444444444443 - nodes in this community are weakly interconnected._
- **Why does `react` connect `cx` to `form-2307.ts`, `ui.ts`, `engine.ts`, `notification-bell.tsx`, `cx.ts`, `dependencies`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `filings/actions.ts`, `items.ts`, `modal.tsx`, `supabaseAdmin`, `quote/page.tsx`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `Badge`, `Notice`, `blocks.tsx`, `year-end/page.tsx`, `combobox.tsx`, `settlement-pages.tsx`, `supabaseServer`, `client-form.tsx`, `books/forms.tsx`, `dropdown.tsx`, `stat-cards.tsx`, `cycle/actions.ts`, `theme-toggle.tsx`, `vitest`, `how-we-work/page.tsx`, `button.tsx`, `ledger/data.ts`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/[id]/page.tsx`, `formatAmount`, `review-form.tsx`, `ledger/books.ts`, `cx`, `cycle/page.tsx`, `supabaseServer`, `Card`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `quote/page.tsx`, `[month]/page.tsx`, `books/reports/2307/page.tsx`, `mime.ts`, `invoice-pages.tsx`, `fixed-assets/forms.tsx`, `site-document.tsx`, `react`, `getIdentity`, `idle-watcher.tsx`, `showMonth`, `parts.ts`, `proposal-view.tsx`, `filings/[id]/page.tsx`, `(site)/page.tsx`, `workpapers/page.tsx`, `leads/[id]/page.tsx`, `app/documents/page.tsx`, `profile.ts`, `review-queue.ts`, `Card`, `batch/forms.tsx`, `start/page.tsx`, `form-2307.ts`, `party-pages.tsx`, `app/settings/page.tsx`, `profile.ts`, `file-upload.tsx`, `collections/forms.tsx`, `upload/page.tsx`, `money.ts`, `documents/[id]/page.tsx`, `package.json`, `deadlines/actions.ts`, `batch/page.tsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04180790960451977 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `engine.ts`, `notification-bell.tsx`, `dependencies`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `filings/actions.ts`, `items.ts`, `supabaseAdmin`, `quote/page.tsx`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `Badge`, `blocks.tsx`, `layout.ts`, `year-end/page.tsx`, `combobox.tsx`, `settlement-pages.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `cycle/actions.ts`, `vitest`, `[clientId]/page.tsx`, `ledger/data.ts`, `portal/reports/page.tsx`, `Centavos`, `intake-picker.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `formatAmount`, `review-form.tsx`, `ledger/books.ts`, `cycle/page.tsx`, `supabaseServer`, `Card`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `quote/page.tsx`, `[month]/page.tsx`, `books/reports/2307/page.tsx`, `mime.ts`, `invoice-pages.tsx`, `cx`, `fixed-assets/forms.tsx`, `site-document.tsx`, `react`, `getIdentity`, `idle-watcher.tsx`, `showMonth`, `parties/actions.ts`, `parts.ts`, `server-only`, `ledger/types.ts`, `proposal-view.tsx`, `filings/[id]/page.tsx`, `(site)/page.tsx`, `@remixicon/react`, `workpapers/page.tsx`, `leads/[id]/page.tsx`, `app/documents/page.tsx`, `profile.ts`, `review-queue.ts`, `Card`, `batch/forms.tsx`, `start/page.tsx`, `filings/actions.ts`, `form-2307.ts`, `opengraph-image.tsx`, `party-pages.tsx`, `app/settings/page.tsx`, `profile.ts`, `xlsx.ts`, `upload/page.tsx`, `money.ts`, `documents/[id]/page.tsx`, `package.json`, `deadlines/actions.ts`, `batch/page.tsx`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._