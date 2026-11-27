# Graph Report - agent-a5a8eabba24058096  (2026-11-27)

## Corpus Check
- 961 files · ~789,853 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: .css 10, (none) 5, .woff2 3)

## Summary
- 5960 nodes · 21068 edges · 207 communities (179 shown, 28 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 187 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `ab62c26b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- toCentavos
- migrate.yml
- ui.ts
- fees/schedule.ts
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- Centavos
- Sign-in & Setup Docs
- notification-actions.tsx
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
- cwt-tracker.ts
- scores/page.tsx
- compare.ts
- employees-xlsx.ts
- marketing/page.tsx
- documents/[id]/page.tsx
- payroll/forms.tsx
- filings/run.ts
- public.ts
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- remittances/[id]/page.tsx
- webhook.ts
- module-pages.tsx
- board.ts
- notifications-view.tsx
- steps.ts
- returns/types.ts
- registrations/forms.tsx
- Card
- tools/page.tsx
- work/load.ts
- lock-bar.tsx
- ref_node_path
- react
- Apple Design
- engine.ts
- testing.ts
- quote/page.tsx
- lib/books/actions.ts
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- vat.ts
- @remixicon/react
- ui.tsx
- app/layout.tsx
- ref_node_fs
- notification-settings-view.tsx
- how-we-work/page.tsx
- money.ts
- cx.ts
- Pro components
- tax-codes.ts
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- register/page.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- payroll/payroll.test.ts
- PageHeader
- Recipes
- notifications/format.ts
- BoardUI page patterns
- Pro templates
- queries.ts
- ledger/books.ts
- ledger/data.ts
- cx
- rates.ts
- boardui
- dropdown.tsx
- getIdentity
- items.ts
- cycle/page.tsx
- workpapers.test.ts
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- documents/labels.ts
- home.ts
- collections/forms.tsx
- calendar/staff.ts
- apply-migrations.sh
- deadlines/dates.ts
- quote.ts
- returns/load.ts
- leads/forms.tsx
- bell-store.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- Badge
- cycle/actions.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- 2316/page.tsx
- move-bar.tsx
- ocr/run.ts
- fixed-assets/page.tsx
- fixed-assets/forms.tsx
- supabaseServer
- ticked-allocation.test.ts
- theme-toggle.tsx
- review-form.tsx
- clients/[id]/page.tsx
- idle-watcher.tsx
- workpapers/load.ts
- safeguards.ts
- filings/actions.ts
- formatAmount
- server-only
- opening.ts
- staff/page.tsx
- booksContext
- blocks.tsx
- deadlines/actions.ts
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- app/documents/page.tsx
- client-form.tsx
- template.ts
- leads/[id]/page.tsx
- deadlines/page.tsx
- app/requests/page.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- return-files.tsx
- review.ts
- tieouts.test.ts
- opengraph-image.tsx
- eslint.config.mjs
- registrations/[id]/page.tsx
- clients/actions.ts
- sign-off-actions.tsx
- app/settings/page.tsx
- holiday-list.ts
- books-2307.test.ts
- acting-approver.test.ts
- safeguards-load.ts
- runs.tsx
- notifications.test.ts
- Building UIs with BoardUI
- lead-attribution.test.ts
- register-xlsx.ts
- sign-in-form.tsx
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- portal-statements-approval.test.ts
- register-books.test.ts
- approve-and-post.test.ts
- vitest
- parallel-run.test.ts
- books-migration.test.ts
- tests/books.test.ts
- @supabase/ssr
- @techstark/opencv-js
- seed.ts
- breadcrumb.tsx
- binder/page.tsx
- missing-2307/page.tsx
- db.test.ts
- templates/README.md
- pg
- telegram-uploads.test.ts
- fees.test.ts
- fixed-assets.test.ts
- tests/payroll.test.ts
- books-lock.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 369 edges
2. `cx` - 304 edges
3. `react` - 271 edges
4. `Notice()` - 255 edges
5. `Skeleton()` - 254 edges
6. `Button()` - 233 edges
7. `next` - 233 edges
8. `Badge()` - 182 edges
9. `Card()` - 182 edges
10. `vitest` - 182 edges

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

## Communities (207 total, 28 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.10
Nodes (45): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page() (+37 more)

### Community 1 - "toCentavos"
Cohesion: 0.08
Nodes (43): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+35 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (57): fmtMonth(), BooksFrame(), blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage(), Summary() (+49 more)

### Community 4 - "fees/schedule.ts"
Cohesion: 0.13
Nodes (23): ProposalSetup, JobOption, jobOptions(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, num() (+15 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (31): ClientTabs(), StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload() (+23 more)

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

### Community 11 - "Centavos"
Cohesion: 0.11
Nodes (20): AtcComparison, Bucket, DocumentDifference, Figure, PartyComparison, SaleSplit, NonDeductibleRow, SawtResult (+12 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "notification-actions.tsx"
Cohesion: 0.18
Nodes (16): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+8 more)

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
Cohesion: 0.08
Nodes (44): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), defaultCashFlow(), statementsFrom(), FsLine (+36 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.11
Nodes (40): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+32 more)

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
Cohesion: 0.08
Nodes (47): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary() (+39 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (50): atcRows(), BookInvoiceRow, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC (+42 more)

### Community 43 - "employees-xlsx.ts"
Cohesion: 0.11
Nodes (20): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+12 more)

### Community 44 - "marketing/page.tsx"
Cohesion: 0.13
Nodes (20): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+12 more)

### Community 45 - "documents/[id]/page.tsx"
Cohesion: 0.15
Nodes (23): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+15 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.07
Nodes (69): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+61 more)

### Community 47 - "filings/run.ts"
Cohesion: 0.18
Nodes (16): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+8 more)

### Community 48 - "public.ts"
Cohesion: 0.13
Nodes (36): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+28 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.12
Nodes (35): GET(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book() (+27 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.11
Nodes (39): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+31 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.09
Nodes (60): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+52 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (46): maxDuration, POST(), TelegramEnv, ClaimedNotification, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS (+38 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.11
Nodes (24): BankAccountsRoute(), fmtDate(), SearchParams, EmployeesRoute(), JournalEntryRoute(), JournalRoute(), BankAccounts(), BOOK_NOTES (+16 more)

### Community 55 - "board.ts"
Cohesion: 0.10
Nodes (25): StepProgress(), StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS, fiveSteps() (+17 more)

### Community 56 - "notifications-view.tsx"
Cohesion: 0.20
Nodes (16): Content(), NotificationsPage(), Content(), PortalNotificationsPage(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty() (+8 more)

### Community 57 - "steps.ts"
Cohesion: 0.10
Nodes (21): Agency, birForm(), BranchOptions, branchStepsFor(), CaseStep, ClosureOptions, dayNumber(), EMPLOYER_STEPS (+13 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (78): client, form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q (+70 more)

### Community 59 - "registrations/forms.tsx"
Cohesion: 0.10
Nodes (37): ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+29 more)

### Community 60 - "Card"
Cohesion: 0.19
Nodes (20): BooksCards(), cents(), Home(), initials(), KINDS, manilaDay(), MonthCard(), one() (+12 more)

### Community 61 - "tools/page.tsx"
Cohesion: 0.07
Nodes (49): exceljs, dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton() (+41 more)

### Community 62 - "work/load.ts"
Cohesion: 0.20
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.13
Nodes (27): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+19 more)

### Community 64 - "ref_node_path"
Cohesion: 0.06
Nodes (19): outDir, pkgDir, require, { version }, dir, readme, templates, afterButton() (+11 more)

### Community 65 - "react"
Cohesion: 0.06
Nodes (71): react, BooksList(), Column, ListRow, RowLink(), CustomersRoute(), INVOICE_KINDS, InvoiceEdit() (+63 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.10
Nodes (44): Rule, PlannedObligation, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup (+36 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.12
Nodes (26): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), TAXPAYER_TYPES (+18 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.05
Nodes (70): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+62 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (44): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+36 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.11
Nodes (35): EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), Form2316Signatory, mmdd(), paidInYear(), Payroll2316Raw (+27 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.09
Nodes (72): annualAttachments(), balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q() (+64 more)

### Community 76 - "@remixicon/react"
Cohesion: 0.05
Nodes (50): @remixicon/react, DashboardStat, icons, ZoomPreview(), DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill() (+42 more)

### Community 77 - "ui.tsx"
Cohesion: 0.10
Nodes (22): DocReviewActions(), NoteState, ClientNoteForm(), NewEmployee(), NewEmployeePage(), ExplainForm(), NewParty(), NewPartyPage() (+14 more)

### Community 78 - "app/layout.tsx"
Cohesion: 0.07
Nodes (35): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+27 more)

### Community 79 - "ref_node_fs"
Cohesion: 0.07
Nodes (11): ctx, input, api, ctx, fn, rows, src, root (+3 more)

### Community 80 - "notification-settings-view.tsx"
Cohesion: 0.21
Nodes (13): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor() (+5 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "money.ts"
Cohesion: 0.21
Nodes (14): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+6 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (73): ClientTab, UNDER, MonthComplete(), SentRow, TimelineRow, AvatarColor, AvatarProps, AvatarSize (+65 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tax-codes.ts"
Cohesion: 0.16
Nodes (17): SettingsPage(), SettingsRoute(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES (+9 more)

### Community 86 - "Notice"
Cohesion: 0.09
Nodes (72): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), CloseYearForm(), EntryForm() (+64 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (67): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), PortalCwt2307Page(), Tracker() (+59 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "register/page.tsx"
Cohesion: 0.13
Nodes (27): Href, LineParts(), one(), Register(), RegisterPage(), shiftMonth(), SOURCE, ACCOUNTS (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.10
Nodes (29): Checkbox(), CheckboxProps, CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper(), noop() (+21 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.28
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Item(), mmddyyyy(), PartyFields() (+5 more)

### Community 93 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (74): MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat() (+66 more)

### Community 94 - "PageHeader"
Cohesion: 0.08
Nodes (60): RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks() (+52 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "queries.ts"
Cohesion: 0.19
Nodes (13): GET(), NotificationKind, BELL_LIMIT, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications(), loadBellData() (+5 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (50): BookPrint(), BookPrintPage(), PrintButton(), BookPrint(), PortalBookPrint(), PrintButton(), LooseLeafHead, LooseLeafPages() (+42 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.09
Nodes (38): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Asset, CASH_FLOW_CLASSES, CashFlowClass, codes (+30 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (112): react-aria-components, DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), SheetPreview() (+104 more)

### Community 103 - "rates.ts"
Cohesion: 0.25
Nodes (17): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+9 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "dropdown.tsx"
Cohesion: 0.11
Nodes (28): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+20 more)

### Community 106 - "getIdentity"
Cohesion: 0.11
Nodes (33): ReplyForm(), send(), ProofReview(), METHODS, ProofUpload(), send(), getIdentity, suggestTicks() (+25 more)

### Community 107 - "items.ts"
Cohesion: 0.19
Nodes (13): PayrollSetupPage(), Setup(), loadPayrollSettings(), BirCategory, CATEGORIES, Category, CATEGORY_KEYS, DEDUCTION_FIELDS (+5 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.15
Nodes (18): Cycle(), CyclePage(), CycleWithClient, DocRow, FilingsTabs(), FilingsTabsFor(), Section, SECTIONS (+10 more)

### Community 109 - "workpapers.test.ts"
Cohesion: 0.08
Nodes (15): BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), doc(), root (+7 more)

### Community 110 - "index.ts"
Cohesion: 0.04
Nodes (29): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+21 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 113 - "documents/labels.ts"
Cohesion: 0.07
Nodes (46): Doc, ExceptionRow, approveDocumentAction(), Row, Doc, Documents(), FolderKey, FOLDERS (+38 more)

### Community 114 - "home.ts"
Cohesion: 0.19
Nodes (12): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksSummaryRaw, EXPENSE, INCOME (+4 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.10
Nodes (48): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), LateSurchargeActions() (+40 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.12
Nodes (35): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+27 more)

### Community 118 - "deadlines/dates.ts"
Cohesion: 0.39
Nodes (9): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff() (+1 more)

### Community 119 - "quote.ts"
Cohesion: 0.08
Nodes (48): loadTaxOnFee(), PriceRow, EngagementRow, FeeGapPage(), Gap(), proposal(), TaxpayerType, EstimatedProfile (+40 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.09
Nodes (42): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, row(), withNonDeductible(), dayBefore(), FilingRow, listInvoices() (+34 more)

### Community 121 - "leads/forms.tsx"
Cohesion: 0.12
Nodes (36): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState (+28 more)

### Community 122 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "Badge"
Cohesion: 0.05
Nodes (79): ClientReturnsPage(), FilingRow, Returns(), Detail(), StatementPage(), FilingListRow, amt(), ApprovalMemo() (+71 more)

### Community 126 - "cycle/actions.ts"
Cohesion: 0.36
Nodes (10): CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction(), CycleState, decideExceptionAction(), nothingToSubmitAction() (+2 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (55): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+47 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (65): GeminiError, geminiJson(), call(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf() (+57 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (43): RFC-2047, RFC-2822, checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction(), ReturnFileState (+35 more)

### Community 131 - "2316/page.tsx"
Cohesion: 0.36
Nodes (8): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Form2316Set(), Form2316Sheet(), Form2316Data, load2316()

### Community 132 - "move-bar.tsx"
Cohesion: 0.26
Nodes (14): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+6 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (42): zod, isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany() (+34 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (18): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), loadAssets(), Row (+10 more)

### Community 135 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm()

### Community 136 - "supabaseServer"
Cohesion: 0.05
Nodes (76): nextConfig, next, EditClient(), EditClientPage(), addClientNoteAction(), NewClientPage(), OwnerOnly(), addChargeAction() (+68 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (35): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+27 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.05
Nodes (59): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), DirectoryParty, ENTRY_STATUS, fmtDay() (+51 more)

### Community 140 - "clients/[id]/page.tsx"
Cohesion: 0.12
Nodes (29): removeAssignmentAction(), DocumentsCard(), when(), RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate() (+21 more)

### Community 141 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 142 - "workpapers/load.ts"
Cohesion: 0.13
Nodes (26): month1601C(), RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart() (+18 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.10
Nodes (31): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+23 more)

### Community 144 - "filings/actions.ts"
Cohesion: 0.27
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 145 - "formatAmount"
Cohesion: 0.11
Nodes (32): Batch(), BatchPage(), one(), toCentavos(), Accreditation(), amount(), AmountRow(), DateCells() (+24 more)

### Community 146 - "server-only"
Cohesion: 0.07
Nodes (59): server-only, @supabase/supabase-js, GET(), GET(), GET(), digestMessage(), DigestRow, longDay() (+51 more)

### Community 147 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 148 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 149 - "booksContext"
Cohesion: 0.26
Nodes (14): booksContext(), booksViewFor(), one(), Print(), Print2307Page(), Cwt2307TrackerPage(), Tracker(), ParallelRun() (+6 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (105): GlobalNotFound(), metadata, metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage() (+97 more)

### Community 151 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (21): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+13 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.22
Nodes (18): Bell(), markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base() (+10 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.09
Nodes (41): BulkState, ClientSelect(), Booking, ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending() (+33 more)

### Community 156 - "client-form.tsx"
Cohesion: 0.17
Nodes (17): FormState, ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), AssignForm(), AddBranchForm() (+9 more)

### Community 157 - "template.ts"
Cohesion: 0.07
Nodes (33): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, jobField, ProposalJob (+25 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (43): NotesCard(), bookedTime, Lead(), LeadPage(), LeadSource(), LeadTouch, Person, day() (+35 more)

### Community 159 - "deadlines/page.tsx"
Cohesion: 0.09
Nodes (44): DashboardStats(), FilingTable(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup() (+36 more)

### Community 160 - "app/requests/page.tsx"
Cohesion: 0.21
Nodes (14): Requests(), RequestsPage(), Row, View, VIEWS, PortalRequests(), Requests(), Row (+6 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.24
Nodes (18): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant(), appBookedEvents(), PersonWeek (+10 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.22
Nodes (14): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+6 more)

### Community 164 - "return-files.tsx"
Cohesion: 0.50
Nodes (7): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), startReturnFileUpload()

### Community 165 - "review.ts"
Cohesion: 0.36
Nodes (6): ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), SIGNED_REFS, quiet

### Community 166 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 169 - "registrations/[id]/page.tsx"
Cohesion: 0.17
Nodes (28): StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell(), RegistrationList() (+20 more)

### Community 170 - "clients/actions.ts"
Cohesion: 0.07
Nodes (41): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), setIncomeTaxMethodAction(), setupMissingChartsAction(), updateClientAction() (+33 more)

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.18
Nodes (22): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+14 more)

### Community 173 - "holiday-list.ts"
Cohesion: 0.27
Nodes (9): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), STANDARD_HOLIDAYS, StandardHoliday, suggestedDate() (+1 more)

### Community 174 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "safeguards-load.ts"
Cohesion: 0.13
Nodes (15): Row, TAX_TYPES, CoverageClient, coverageGaps(), Gap, GapKind, BoardRow, FilingRow (+7 more)

### Community 177 - "runs.tsx"
Cohesion: 0.25
Nodes (8): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), Run

### Community 179 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 180 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 181 - "register-xlsx.ts"
Cohesion: 0.09
Nodes (37): RFC-4180, file(), GET(), safe(), PayrollDocument(), ReadPayrollButton(), employeesForMonth(), buildEmployeeTemplate() (+29 more)

### Community 182 - "sign-in-form.tsx"
Cohesion: 0.27
Nodes (10): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), notices, SignInForm(), Divider() (+2 more)

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 186 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 188 - "vitest"
Cohesion: 0.08
Nodes (8): vitest, HASH, LEAD, root, root, root, root, root

### Community 189 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 190 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 197 - "breadcrumb.tsx"
Cohesion: 0.24
Nodes (6): Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 198 - "binder/page.tsx"
Cohesion: 0.24
Nodes (15): amt(), CertificatesTable(), PartsLink(), PurchasesTable(), SalesTable(), th(), amt(), Binder() (+7 more)

### Community 199 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 207 - "pg"
Cohesion: 0.07
Nodes (9): pg, root, HASH, LEAD, root, root, root, root (+1 more)

### Community 210 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1572 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `toCentavos`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `notification-actions.tsx`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `marketing/page.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `filings/run.ts`, `public.ts`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `module-pages.tsx`, `notifications-view.tsx`, `registrations/forms.tsx`, `Card`, `tools/page.tsx`, `lock-bar.tsx`, `react`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `ui.tsx`, `app/layout.tsx`, `money.ts`, `cx.ts`, `portal/reports/page.tsx`, `register/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `PageHeader`, `queries.ts`, `ledger/books.ts`, `ledger/data.ts`, `getIdentity`, `cycle/page.tsx`, `profile.ts`, `documents/labels.ts`, `collections/forms.tsx`, `calendar/staff.ts`, `quote.ts`, `returns/load.ts`, `leads/forms.tsx`, `batch/register.ts`, `Badge`, `cycle/actions.ts`, `parties/[id]/page.tsx`, `return-file-actions.ts`, `2316/page.tsx`, `move-bar.tsx`, `fixed-assets/page.tsx`, `fixed-assets/forms.tsx`, `theme-toggle.tsx`, `review-form.tsx`, `clients/[id]/page.tsx`, `idle-watcher.tsx`, `filings/actions.ts`, `formatAmount`, `server-only`, `booksContext`, `blocks.tsx`, `deadlines/actions.ts`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `client-form.tsx`, `leads/[id]/page.tsx`, `deadlines/page.tsx`, `app/requests/page.tsx`, `proposal-view.tsx`, `return-files.tsx`, `opengraph-image.tsx`, `registrations/[id]/page.tsx`, `clients/actions.ts`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `runs.tsx`, `register-xlsx.ts`, `breadcrumb.tsx`, `binder/page.tsx`, `missing-2307/page.tsx`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09740259740259741 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `toCentavos`, `ui.ts`, `fees/schedule.ts`, `package.json`, `onboarding/page.tsx`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/[id]/page.tsx`, `filings/run.ts`, `public.ts`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `board.ts`, `steps.ts`, `returns/types.ts`, `Card`, `tools/page.tsx`, `work/load.ts`, `lock-bar.tsx`, `ref_node_path`, `react`, `engine.ts`, `testing.ts`, `quote/page.tsx`, `lib/books/actions.ts`, `payroll/data.ts`, `ref_node_fs`, `money.ts`, `tax-codes.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `payroll/payroll.test.ts`, `PageHeader`, `notifications/format.ts`, `ledger/books.ts`, `ledger/data.ts`, `rates.ts`, `cycle/page.tsx`, `workpapers.test.ts`, `index.ts`, `profile.ts`, `collections/forms.tsx`, `calendar/staff.ts`, `deadlines/dates.ts`, `quote.ts`, `returns/load.ts`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `move-bar.tsx`, `ocr/run.ts`, `fixed-assets/page.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `theme-toggle.tsx`, `review-form.tsx`, `idle-watcher.tsx`, `workpapers/load.ts`, `safeguards.ts`, `formatAmount`, `server-only`, `opening.ts`, `blocks.tsx`, `ledger.test.ts`, `app/documents/page.tsx`, `client-form.tsx`, `template.ts`, `leads/[id]/page.tsx`, `deadlines/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `review.ts`, `tieouts.test.ts`, `registrations/[id]/page.tsx`, `clients/actions.ts`, `app/settings/page.tsx`, `holiday-list.ts`, `books-2307.test.ts`, `acting-approver.test.ts`, `safeguards-load.ts`, `notifications.test.ts`, `lead-attribution.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `portal-statements-approval.test.ts`, `register-books.test.ts`, `approve-and-post.test.ts`, `parallel-run.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `db.test.ts`, `pg`, `telegram-uploads.test.ts`, `fees.test.ts`, `fixed-assets.test.ts`, `tests/payroll.test.ts`, `books-lock.test.ts`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Should `toCentavos` be split into smaller, more focused modules?**
  _Cohesion score 0.08081632653061224 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `toCentavos`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `notification-actions.tsx`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `marketing/page.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `module-pages.tsx`, `notifications-view.tsx`, `registrations/forms.tsx`, `Card`, `tools/page.tsx`, `lock-bar.tsx`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `@remixicon/react`, `ui.tsx`, `app/layout.tsx`, `notification-settings-view.tsx`, `how-we-work/page.tsx`, `money.ts`, `cx.ts`, `tax-codes.ts`, `Notice`, `portal/reports/page.tsx`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `PageHeader`, `queries.ts`, `ledger/books.ts`, `cx`, `dropdown.tsx`, `getIdentity`, `items.ts`, `cycle/page.tsx`, `profile.ts`, `documents/labels.ts`, `collections/forms.tsx`, `calendar/staff.ts`, `quote.ts`, `leads/forms.tsx`, `bell-store.ts`, `batch/register.ts`, `Badge`, `cycle/actions.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `2316/page.tsx`, `move-bar.tsx`, `fixed-assets/page.tsx`, `fixed-assets/forms.tsx`, `supabaseServer`, `theme-toggle.tsx`, `review-form.tsx`, `clients/[id]/page.tsx`, `idle-watcher.tsx`, `formatAmount`, `staff/page.tsx`, `booksContext`, `blocks.tsx`, `deadlines/actions.ts`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `client-form.tsx`, `template.ts`, `leads/[id]/page.tsx`, `deadlines/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `return-files.tsx`, `registrations/[id]/page.tsx`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `runs.tsx`, `sign-in-form.tsx`, `breadcrumb.tsx`, `binder/page.tsx`, `missing-2307/page.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._