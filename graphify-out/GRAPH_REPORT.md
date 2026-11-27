# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 951 files · ~772,215 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5880 nodes · 20796 edges · 196 communities (177 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 184 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `b5e72a33`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- documents/[id]/page.tsx
- migrate.yml
- ui.ts
- public.ts
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- returns/types.ts
- Sign-in & Setup Docs
- cx
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- ledger/data.ts
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
- cwt-tracker.ts
- scores/page.tsx
- compare.ts
- payroll/types.ts
- link-button.tsx
- review-form.tsx
- payroll/forms.tsx
- modal.tsx
- form.tsx
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- remittances/[id]/page.tsx
- webhook.ts
- module-pages.tsx
- deadlines/page.tsx
- marketing/page.tsx
- PageHeader
- money.ts
- registrations/forms.tsx
- fees/types.ts
- books/export/route.ts
- work/page.tsx
- lock-bar.tsx
- ref_node_fs
- settlement-pages.tsx
- Apple Design
- addDays
- testing.ts
- client-form.tsx
- lib/books/actions.ts
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- react
- @remixicon/react
- ref_node_fs
- invoice-pages.tsx
- how-we-work/page.tsx
- form-2307.tsx
- app/settings/page.tsx
- Pro components
- tax-codes.ts
- Notice
- portalContext
- portal-billing.test.ts
- parts.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- Centavos
- manilaToday
- Recipes
- ledger/data.ts
- BoardUI theming reference
- Pro templates
- review-form.tsx
- Centavos
- opening-checklist.tsx
- cx
- rates.ts
- boardui
- income.ts
- getIdentity
- filings/[id]/page.tsx
- cycle/page.tsx
- client
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- Field
- google/calendar.ts
- apply-migrations.sh
- money.ts
- quote.ts
- source.ts
- leads/forms.tsx
- layout.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- firm/parallel-run/page.tsx
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- returns/load.ts
- move-bar.tsx
- gemini.ts
- fixed-assets/page.tsx
- site-document.tsx
- supabaseServer
- ticked-allocation.test.ts
- transactions-actions.ts
- bulk-actions.ts
- env.ts
- idle-watcher.tsx
- workpapers/load.ts
- IsoDate
- filings/actions.ts
- formatAmount
- server-only
- opening.ts
- approval-memo.tsx
- portal/reports/page.tsx
- blocks.tsx
- branches.ts
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- app/documents/page.tsx
- clients/[id]/page.tsx
- template.ts
- leads/[id]/page.tsx
- app/page.tsx
- proof-actions.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- cwt-tracker-view.tsx
- filed-returns.ts
- Card
- opengraph-image.tsx
- documents/labels.ts
- report-periods.ts
- requireOwner
- sign-off-actions.tsx
- Textarea
- holiday-list.ts
- staff/page.tsx
- acting-approver.test.ts
- morning.ts
- periods
- form-1604e.test.ts
- Building UIs with BoardUI
- lead-attribution.test.ts
- register-xlsx.ts
- sign-in-form.tsx
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- login/page.tsx
- parties/schema.ts
- cwt-2307-tracker.test.ts
- leads-pipeline.test.ts
- parallel-run.test.ts
- books-migration.test.ts
- tests/books.test.ts
- ledger-closing.test.ts
- returns-books.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 362 edges
2. `cx` - 302 edges
3. `react` - 270 edges
4. `Notice()` - 254 edges
5. `Skeleton()` - 254 edges
6. `next` - 231 edges
7. `Button()` - 227 edges
8. `Card()` - 181 edges
9. `Badge()` - 181 edges
10. `vitest` - 178 edges

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

## Communities (196 total, 19 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (39): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one(), portal2307() (+31 more)

### Community 1 - "documents/[id]/page.tsx"
Cohesion: 0.11
Nodes (31): GET(), safe(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ReadPayrollButton() (+23 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (54): booksContext(), BooksContext, booksViewFor(), fmtMonth(), one(), SearchParams, BooksFrame(), WithdrawReportButton() (+46 more)

### Community 4 - "public.ts"
Cohesion: 0.10
Nodes (25): acceptProposalAction(), AcceptState, instantView(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+17 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (30): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+22 more)

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

### Community 11 - "returns/types.ts"
Cohesion: 0.08
Nodes (43): FinancialStatements, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4() (+35 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.05
Nodes (53): notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, StatusDot(), StatusDotColor, StatusDotProps (+45 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+12 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "ledger/data.ts"
Cohesion: 0.09
Nodes (40): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine() (+32 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.17
Nodes (32): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+24 more)

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
Cohesion: 0.12
Nodes (34): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), addMonths(), buildTracker(), calendarQuarterStart() (+26 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (31): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+23 more)

### Community 42 - "compare.ts"
Cohesion: 0.12
Nodes (32): atcRows(), Bucket, compareParallelRun(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC, monthOf() (+24 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "link-button.tsx"
Cohesion: 0.07
Nodes (31): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+23 more)

### Community 45 - "review-form.tsx"
Cohesion: 0.13
Nodes (25): blankLine(), InvoiceForm(), InvoiceFormValue, Booking, BookingFields(), DirectoryParty, ENTRY_STATUS, fmtDay() (+17 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.07
Nodes (72): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+64 more)

### Community 47 - "modal.tsx"
Cohesion: 0.04
Nodes (70): LockState, DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), AvatarColor (+62 more)

### Community 48 - "form.tsx"
Cohesion: 0.14
Nodes (33): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+25 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (31): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+23 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.11
Nodes (40): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+32 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.09
Nodes (58): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+50 more)

### Community 53 - "webhook.ts"
Cohesion: 0.12
Nodes (28): TelegramApi, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF (+20 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.11
Nodes (24): BankAccountsRoute(), BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), JournalEntryRoute(), JournalRoute() (+16 more)

### Community 55 - "deadlines/page.tsx"
Cohesion: 0.07
Nodes (57): GenerateButton(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT (+49 more)

### Community 56 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (29): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), CreateLinkForm(), N() (+21 more)

### Community 57 - "PageHeader"
Cohesion: 0.09
Nodes (49): completeRegistrationAction(), CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration() (+41 more)

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (53): client, payslipSchedule(), agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule() (+45 more)

### Community 59 - "registrations/forms.tsx"
Cohesion: 0.09
Nodes (38): StaffOptions(), ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+30 more)

### Community 60 - "fees/types.ts"
Cohesion: 0.15
Nodes (18): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+10 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.12
Nodes (25): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+17 more)

### Community 62 - "work/page.tsx"
Cohesion: 0.09
Nodes (36): RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, View, VIEWS, Action() (+28 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (29): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+21 more)

### Community 64 - "ref_node_fs"
Cohesion: 0.05
Nodes (19): outDir, pkgDir, require, { version }, dir, ctx, input, api (+11 more)

### Community 65 - "settlement-pages.tsx"
Cohesion: 0.09
Nodes (35): PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage(), ReceiptsViewPage() (+27 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "addDays"
Cohesion: 0.08
Nodes (51): Rule, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup (+43 more)

### Community 68 - "testing.ts"
Cohesion: 0.13
Nodes (25): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+17 more)

### Community 69 - "client-form.tsx"
Cohesion: 0.15
Nodes (22): FormState, ClientForm(), ClientValues, frequencyLabel, Props, EditClient(), EditClientPage(), NewClientPage() (+14 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (24): decideUnlockAction(), lockMonthAction(), refresh(), requestLockAction(), requestUnlockAction(), run(), text(), CodeSource (+16 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (42): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+34 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.10
Nodes (38): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), Certificates2316 (+30 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.12
Nodes (42): SaleSplit, incomeAttachments(), buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv(), sawtDat() (+34 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "react"
Cohesion: 0.07
Nodes (55): react, Batch(), BatchPage(), one(), toCentavos(), CustomersRoute(), NewEntry(), NewEntryPage() (+47 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.07
Nodes (52): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+44 more)

### Community 79 - "ref_node_fs"
Cohesion: 0.03
Nodes (27): pg, vitest, root, Data, root, Row, root, root (+19 more)

### Community 80 - "invoice-pages.tsx"
Cohesion: 0.10
Nodes (28): fmtDate(), INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE (+20 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (36): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+28 more)

### Community 82 - "form-2307.tsx"
Cohesion: 0.20
Nodes (16): PortalPrint2307Page(), Print(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set() (+8 more)

### Community 83 - "app/settings/page.tsx"
Cohesion: 0.18
Nodes (17): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+9 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tax-codes.ts"
Cohesion: 0.14
Nodes (20): SettingsPage(), SettingsRoute(), loadTaxCodes(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf() (+12 more)

### Community 86 - "Notice"
Cohesion: 0.09
Nodes (73): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+65 more)

### Community 87 - "portalContext"
Cohesion: 0.18
Nodes (25): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker() (+17 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "parts.ts"
Cohesion: 0.09
Nodes (25): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, KIND_LABELS (+17 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (24): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+16 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "Centavos"
Cohesion: 0.08
Nodes (51): GridRow, AlphalistRow, form2316(), Form2316Data, Form2316Employer, Form2316Line, mmdd(), period2316() (+43 more)

### Community 94 - "manilaToday"
Cohesion: 0.10
Nodes (45): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+37 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "ledger/data.ts"
Cohesion: 0.10
Nodes (37): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), RepostRegisterButton(), ReverseForm(), OpeningChecklist() (+29 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.09
Nodes (29): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+21 more)

### Community 100 - "Centavos"
Cohesion: 0.07
Nodes (45): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+37 more)

### Community 101 - "opening-checklist.tsx"
Cohesion: 0.10
Nodes (28): Access, STATUS, Row, Asset, codes, PNL, COA_TEMPLATES, Cutoff (+20 more)

### Community 102 - "cx"
Cohesion: 0.05
Nodes (79): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps, ComboBoxSelectionMode (+71 more)

### Community 103 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "income.ts"
Cohesion: 0.11
Nodes (37): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+29 more)

### Community 106 - "getIdentity"
Cohesion: 0.12
Nodes (28): DocumentUpload(), send(), upload(), Item, typeFromName(), ReplyForm(), send(), getIdentity (+20 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (49): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind (+41 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (29): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+21 more)

### Community 109 - "client"
Cohesion: 0.06
Nodes (22): BOOK_LOCK_FORMS, as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth() (+14 more)

### Community 110 - "index.ts"
Cohesion: 0.05
Nodes (21): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+13 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), SentRow, BooksCards(), cents() (+26 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 115 - "Field"
Cohesion: 0.08
Nodes (62): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+54 more)

### Community 116 - "google/calendar.ts"
Cohesion: 0.21
Nodes (15): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+7 more)

### Community 118 - "money.ts"
Cohesion: 0.11
Nodes (25): PreviewTable(), AGENCIES, Db, LOANS, p(), Run, PayrollReadState, KIND_LABEL (+17 more)

### Community 119 - "quote.ts"
Cohesion: 0.08
Nodes (47): PriceRow, EngagementRow, FeeGapPage(), Gap(), proposal(), EstimatedProfile, estimateProfile(), ExistingClient (+39 more)

### Community 120 - "source.ts"
Cohesion: 0.15
Nodes (22): row(), amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND, DocumentRow, fromBooksRow(), fromRegisterLine() (+14 more)

### Community 121 - "leads/forms.tsx"
Cohesion: 0.13
Nodes (35): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+27 more)

### Community 122 - "layout.ts"
Cohesion: 0.13
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.08
Nodes (43): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), decideMissing2307Action(), DecisionState, Decision() (+35 more)

### Community 126 - "firm/parallel-run/page.tsx"
Cohesion: 0.12
Nodes (25): CELL, FirmParallelRunPage(), monthShort(), Summary(), BookInvoiceRow, differs(), MonthComparison, MonthStatus (+17 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.09
Nodes (47): mergePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), ocrProviderFromEnv(), runOcr(), runPendingOcr() (+39 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (73): applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), geminiJson(), PayrollItem (+65 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.12
Nodes (32): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, esubmissionMailEnv(), accessToken(), call(), findReplies() (+24 more)

### Community 131 - "returns/load.ts"
Cohesion: 0.11
Nodes (31): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+23 more)

### Community 132 - "move-bar.tsx"
Cohesion: 0.31
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveItem, crossesYear(), MOVE_TARGETS (+4 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (19): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+11 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.13
Nodes (30): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+22 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.17
Nodes (11): GlobalNotFound(), metadata, metadata, SiteLayout(), SiteNotFound(), geist, geistMono, montserrat (+3 more)

### Community 136 - "supabaseServer"
Cohesion: 0.06
Nodes (65): nextConfig, next, setIncomeTaxMethodAction(), addClientNoteAction(), file(), postPayrollAction(), PostState, PostPayrollButton() (+57 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "transactions-actions.ts"
Cohesion: 0.30
Nodes (14): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+6 more)

### Community 139 - "bulk-actions.ts"
Cohesion: 0.09
Nodes (37): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Codes (+29 more)

### Community 140 - "env.ts"
Cohesion: 0.18
Nodes (18): maxDuration, POST(), Content(), NotificationSettingsPage(), TelegramLinkButton(), TelegramSwitch(), TelegramUnlinkButton(), AnchorButton() (+10 more)

### Community 141 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 142 - "workpapers/load.ts"
Cohesion: 0.18
Nodes (19): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+11 more)

### Community 143 - "IsoDate"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 144 - "filings/actions.ts"
Cohesion: 0.17
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+9 more)

### Community 145 - "formatAmount"
Cohesion: 0.13
Nodes (26): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+18 more)

### Community 146 - "server-only"
Cohesion: 0.10
Nodes (42): server-only, @supabase/supabase-js, GET(), GET(), GET(), generateFilingsNow(), generatePastFilingsAction(), GenerateState (+34 more)

### Community 147 - "opening.ts"
Cohesion: 0.15
Nodes (18): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+10 more)

### Community 148 - "approval-memo.tsx"
Cohesion: 0.17
Nodes (14): amt(), ApprovalMemo(), Db, TIE, ReviewNote, approvalMemo(), Memo, MemoInput (+6 more)

### Community 149 - "portal/reports/page.tsx"
Cohesion: 0.29
Nodes (16): basePeriod(), HeldNote(), holdsWhat(), BooksSection(), NavRow(), PortalReports(), Reports(), Section() (+8 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (94): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+86 more)

### Community 151 - "branches.ts"
Cohesion: 0.22
Nodes (11): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), Branch, branchSchema, branchUpdateSchema (+3 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+14 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.04
Nodes (92): GET(), Content(), NotificationsPage(), emit(), listeners, markReadLocally(), onChanged(), onFocus() (+84 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (29): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths() (+21 more)

### Community 156 - "clients/[id]/page.tsx"
Cohesion: 0.23
Nodes (12): removeAssignmentAction(), RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, Row (+4 more)

### Community 157 - "template.ts"
Cohesion: 0.07
Nodes (32): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, ProposalJob, corp (+24 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (43): NoteState, NotesCard(), ClientNoteForm(), BookingLink(), DiscoveryCallForm(), JobRow(), LostForm(), ProposalForm() (+35 more)

### Community 159 - "app/page.tsx"
Cohesion: 0.09
Nodes (41): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+33 more)

### Community 160 - "proof-actions.ts"
Cohesion: 0.19
Nodes (16): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+8 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.11
Nodes (39): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant(), Admin, appBookedEvents() (+31 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.15
Nodes (20): loadTaxOnFee(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+12 more)

### Community 164 - "cwt-tracker-view.tsx"
Cohesion: 0.32
Nodes (12): Cwt2307TrackerPage(), Tracker(), CwtFollowUpForm(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure() (+4 more)

### Community 165 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 166 - "Card"
Cohesion: 0.19
Nodes (25): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+17 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "documents/labels.ts"
Cohesion: 0.12
Nodes (26): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+18 more)

### Community 169 - "report-periods.ts"
Cohesion: 0.36
Nodes (10): PortalBooks, BooksYear, iso(), lockedMonths(), monthsOfReport(), offeredKinds(), reportKindsEnding(), StatementHold (+2 more)

### Community 170 - "requireOwner"
Cohesion: 0.09
Nodes (37): zod@^4.6.7, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), setupMissingChartsAction() (+29 more)

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 172 - "Textarea"
Cohesion: 0.11
Nodes (38): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+30 more)

### Community 173 - "holiday-list.ts"
Cohesion: 0.27
Nodes (9): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), STANDARD_HOLIDAYS, StandardHoliday, suggestedDate() (+1 more)

### Community 174 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "morning.ts"
Cohesion: 0.13
Nodes (18): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+10 more)

### Community 177 - "periods"
Cohesion: 0.47
Nodes (9): Periods, periods(), addMonths(), docsWithin(), monthEnd(), monthWithin(), pad2(), quarterOf() (+1 more)

### Community 178 - "form-1604e.test.ts"
Cohesion: 0.25
Nodes (3): client, YEAR, EwtQuarter

### Community 179 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 180 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 181 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (30): RFC-4180, exceljs, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS (+22 more)

### Community 182 - "sign-in-form.tsx"
Cohesion: 0.60
Nodes (5): sendSignInEmail(), verifySignInCode(), SignInForm(), Divider(), SocialButton()

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "login/page.tsx"
Cohesion: 0.40
Nodes (5): errors, Form(), LoginPage(), notices, IDLE_MINUTES

### Community 186 - "parties/schema.ts"
Cohesion: 0.53
Nodes (5): blank(), optionalText(), PartyInput, partySchema, normalizeBranch()

### Community 187 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 188 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 189 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 190 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1547 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `documents/[id]/page.tsx`, `ui.ts`, `public.ts`, `package.json`, `onboarding/page.tsx`, `cx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `link-button.tsx`, `review-form.tsx`, `payroll/forms.tsx`, `form.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `module-pages.tsx`, `deadlines/page.tsx`, `marketing/page.tsx`, `PageHeader`, `registrations/forms.tsx`, `books/export/route.ts`, `work/page.tsx`, `lock-bar.tsx`, `settlement-pages.tsx`, `client-form.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `react`, `@remixicon/react`, `invoice-pages.tsx`, `form-2307.tsx`, `app/settings/page.tsx`, `portalContext`, `intake-picker.tsx`, `form-2316.tsx`, `manilaToday`, `ledger/data.ts`, `Centavos`, `opening-checklist.tsx`, `getIdentity`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `money.ts`, `quote.ts`, `leads/forms.tsx`, `batch/register.ts`, `manilaToday`, `firm/parallel-run/page.tsx`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `returns/load.ts`, `move-bar.tsx`, `fixed-assets/page.tsx`, `site-document.tsx`, `transactions-actions.ts`, `bulk-actions.ts`, `env.ts`, `idle-watcher.tsx`, `filings/actions.ts`, `formatAmount`, `server-only`, `approval-memo.tsx`, `portal/reports/page.tsx`, `blocks.tsx`, `branches.ts`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `proof-actions.ts`, `proposal-view.tsx`, `cwt-tracker-view.tsx`, `Card`, `opengraph-image.tsx`, `documents/labels.ts`, `requireOwner`, `sign-off-actions.tsx`, `Textarea`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11428571428571428 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `documents/[id]/page.tsx`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `cx`, `dependencies`, `scores/page.tsx`, `link-button.tsx`, `review-form.tsx`, `payroll/forms.tsx`, `modal.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `module-pages.tsx`, `deadlines/page.tsx`, `marketing/page.tsx`, `PageHeader`, `registrations/forms.tsx`, `work/page.tsx`, `lock-bar.tsx`, `settlement-pages.tsx`, `client-form.tsx`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `@remixicon/react`, `invoice-pages.tsx`, `how-we-work/page.tsx`, `form-2307.tsx`, `tax-codes.ts`, `Notice`, `portalContext`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `ledger/data.ts`, `Centavos`, `cx`, `getIdentity`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `money.ts`, `quote.ts`, `leads/forms.tsx`, `batch/register.ts`, `manilaToday`, `firm/parallel-run/page.tsx`, `parties/[id]/page.tsx`, `social-button.tsx`, `returns/load.ts`, `move-bar.tsx`, `fixed-assets/page.tsx`, `site-document.tsx`, `supabaseServer`, `bulk-actions.ts`, `env.ts`, `idle-watcher.tsx`, `formatAmount`, `server-only`, `portal/reports/page.tsx`, `blocks.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `proof-actions.ts`, `calendar/page.tsx`, `proposal-view.tsx`, `cwt-tracker-view.tsx`, `Card`, `documents/labels.ts`, `sign-off-actions.tsx`, `Textarea`, `staff/page.tsx`, `sign-in-form.tsx`, `login/page.tsx`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Should `documents/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11428571428571428 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ref_node_fs` to `form-2307.ts`, `ui.ts`, `public.ts`, `package.json`, `onboarding/page.tsx`, `ledger/data.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `payroll/forms.tsx`, `form.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `deadlines/page.tsx`, `PageHeader`, `money.ts`, `registrations/forms.tsx`, `fees/types.ts`, `books/export/route.ts`, `work/page.tsx`, `lock-bar.tsx`, `ref_node_fs`, `addDays`, `testing.ts`, `client-form.tsx`, `payroll/data.ts`, `react`, `@remixicon/react`, `invoice-pages.tsx`, `app/settings/page.tsx`, `tax-codes.ts`, `portal-billing.test.ts`, `parts.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `Centavos`, `manilaToday`, `review-form.tsx`, `Centavos`, `opening-checklist.tsx`, `rates.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `client`, `index.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `money.ts`, `quote.ts`, `source.ts`, `layout.ts`, `batch/register.ts`, `firm/parallel-run/page.tsx`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `move-bar.tsx`, `gemini.ts`, `fixed-assets/page.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `bulk-actions.ts`, `idle-watcher.tsx`, `IsoDate`, `filings/actions.ts`, `server-only`, `opening.ts`, `approval-memo.tsx`, `blocks.tsx`, `branches.ts`, `ledger.test.ts`, `notification-bell.tsx`, `app/documents/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `calendar/page.tsx`, `filed-returns.ts`, `report-periods.ts`, `requireOwner`, `Textarea`, `holiday-list.ts`, `acting-approver.test.ts`, `morning.ts`, `form-1604e.test.ts`, `lead-attribution.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `cwt-2307-tracker.test.ts`, `leads-pipeline.test.ts`, `parallel-run.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `ledger-closing.test.ts`, `returns-books.test.ts`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._