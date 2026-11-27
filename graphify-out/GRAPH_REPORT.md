# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 948 files · ~770,571 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5870 nodes · 20783 edges · 216 communities (187 shown, 29 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 184 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `7da2def9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- ledger-lock.test.ts
- migrate.yml
- ui.ts
- public.ts
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- LinkButton
- Sign-in & Setup Docs
- notification.tsx
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
- requireStaff
- payroll/actions.ts
- modal.tsx
- marketing/page.tsx
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- remittances/[id]/page.tsx
- webhook.ts
- module-pages.tsx
- deadlines/page.tsx
- payroll/forms.tsx
- PageHeader
- money.ts
- filings/run.ts
- quote/page.tsx
- books/export/route.ts
- safeguards.ts
- lock-bar.tsx
- missing-2307/page.tsx
- status.ts
- Apple Design
- addDays
- testing.ts
- Select
- lib/books/actions.ts
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- react
- @remixicon/react
- vitest
- filings/actions.ts
- how-we-work/page.tsx
- notes.ts
- app/settings/page.tsx
- Pro components
- remittances/forms.tsx
- Button
- portalContext
- portal-billing.test.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- alphalist.ts
- Badge
- Recipes
- portal/reports/page.tsx
- BoardUI theming reference
- Pro templates
- review-form.tsx
- Centavos
- opening-checklist.tsx
- cx
- rates.ts
- boardui
- pending-review.tsx
- review/page.tsx
- filings/[id]/page.tsx
- cycle/page.tsx
- upload/page.tsx
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- Field
- google/calendar.ts
- apply-migrations.sh
- move-bar.tsx
- quote.ts
- returns/types.ts
- work/load.ts
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- draft.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- worksheet/page.tsx
- notification-actions.tsx
- gemini.ts
- fixed-assets/page.tsx
- site-document.tsx
- supabaseServer
- ticked-allocation.test.ts
- report-periods.ts
- tax-codes.ts
- cwt-tracker-view.tsx
- payroll-read-actions.ts
- notification-bell.tsx
- IsoDate
- ref_node_fs
- Card
- server-only
- opening.ts
- proof-upload.tsx
- booksContext
- blocks.tsx
- holiday-list.ts
- ledger.test.ts
- workpapers/page.tsx
- notification-settings-view.tsx
- app/documents/page.tsx
- queries.ts
- template.ts
- leads/[id]/page.tsx
- app/page.tsx
- notifications/format.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- db.test.ts
- transactions-actions.ts
- parts.ts
- opengraph-image.tsx
- documents/labels.ts
- lead-attribution.test.ts
- Notice
- generate.test.ts
- Textarea
- BoardUI page patterns
- bell-store.ts
- acting-approver.test.ts
- digest.ts
- pg
- eslint.config.mjs
- notifications-view.tsx
- parallel-run.test.ts
- register-xlsx.ts
- books-2307.test.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- source.ts
- documents-card.tsx
- funnel.test.ts
- leads-pipeline.test.ts
- portal-statements-approval.test.ts
- books-migration.test.ts
- tests/books.test.ts
- portal-nav.tsx
- financial-statements-view.tsx
- payroll-books.test.ts
- ref_node_path
- books/periods.ts
- year/[year]/page.tsx
- cwt-forms.tsx
- names.ts
- generate-qap-fixture.mjs
- copy-opencv.mjs
- cwt-2307-tracker.test.ts
- telegram-uploads.test.ts
- templates/README.md
- firm/page.tsx
- fixed-assets.test.ts
- ledger-closing.test.ts
- month-complete.test.ts
- returns-books.test.ts
- tasks-and-request-owners.test.ts
- approve-and-post.test.ts
- client-reports.test.ts
- @supabase/ssr
- @techstark/opencv-js

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 362 edges
2. `cx` - 300 edges
3. `react` - 269 edges
4. `Notice()` - 254 edges
5. `Skeleton()` - 254 edges
6. `next` - 231 edges
7. `Button()` - 227 edges
8. `Card()` - 181 edges
9. `Badge()` - 181 edges
10. `vitest` - 177 edges

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

## Communities (216 total, 29 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (42): PortalPrint2307Page(), Print(), one(), portal2307(), portal2307Href(), SearchParams, Accreditation(), amount() (+34 more)

### Community 1 - "ledger-lock.test.ts"
Cohesion: 0.33
Nodes (3): BOOK_LOCK_FORMS, doc(), root

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.07
Nodes (54): fmtMonth(), ReleaseReportForm(), SetupForm(), WithdrawReportButton(), blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect() (+46 more)

### Community 4 - "public.ts"
Cohesion: 0.14
Nodes (24): instantView(), Quote, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num() (+16 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.13
Nodes (28): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+20 more)

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

### Community 11 - "LinkButton"
Cohesion: 0.14
Nodes (20): ClientList(), ClientsPage(), Row, LeadsPage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS (+12 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "notification.tsx"
Cohesion: 0.04
Nodes (58): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, ButtonLinkProps (+50 more)

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

### Community 18 - "ledger/data.ts"
Cohesion: 0.07
Nodes (57): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, Amendment, AmendmentStatus, BooksClient (+49 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (69): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+61 more)

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
Cohesion: 0.14
Nodes (30): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), addMonths(), buildTracker(), calendarQuarterStart() (+22 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (63): ParallelRun(), ParallelRunPage(), quarterMonths(), CELL, FirmParallelRunPage(), monthShort(), Summary(), KIND (+55 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "link-button.tsx"
Cohesion: 0.07
Nodes (31): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+23 more)

### Community 45 - "requireStaff"
Cohesion: 0.09
Nodes (52): setIncomeTaxMethodAction(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage() (+44 more)

### Community 46 - "payroll/actions.ts"
Cohesion: 0.15
Nodes (33): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), fieldErrors(), fileOf(), friendly(), postSubmissionAction(), previewEmployeesAction() (+25 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (67): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), CreateLinkForm(), N() (+59 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.11
Nodes (42): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+34 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.11
Nodes (42): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+34 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.13
Nodes (35): EmployerCard(), RemittancesDue(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS (+27 more)

### Community 53 - "webhook.ts"
Cohesion: 0.11
Nodes (31): maxDuration, POST(), TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked(), Choice (+23 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.08
Nodes (41): BankAccountsRoute(), BooksFrame(), BooksList(), Column, ListRow, RowLink(), CustomersRoute(), EmployeesRoute() (+33 more)

### Community 55 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 56 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (48): EmployeeImportState, FormState, RegisterState, GridRow, ItemForm(), KIND_TITLE, MonthGrid(), PayrollSettingsForm() (+40 more)

### Community 57 - "PageHeader"
Cohesion: 0.05
Nodes (94): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+86 more)

### Community 58 - "money.ts"
Cohesion: 0.05
Nodes (72): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+64 more)

### Community 59 - "filings/run.ts"
Cohesion: 0.32
Nodes (7): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), refreshDueDates(), runFilingGeneration(), splitHolidays()

### Community 60 - "quote/page.tsx"
Cohesion: 0.14
Nodes (22): COMPLEXITY_LABEL, Lines(), Preview(), ProfileForm(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+14 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.11
Nodes (29): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+21 more)

### Community 62 - "safeguards.ts"
Cohesion: 0.09
Nodes (43): CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay(), NEEDS (+35 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.16
Nodes (22): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+14 more)

### Community 64 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 65 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "addDays"
Cohesion: 0.14
Nodes (32): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule, EfpsGroup (+24 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "Select"
Cohesion: 0.06
Nodes (60): zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setupMissingChartsAction() (+52 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (28): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+20 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.13
Nodes (46): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+38 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.07
Nodes (55): Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear(), Payroll2316Raw (+47 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.11
Nodes (52): SaleSplit, sawtBuckets(), atcInfo(), atcKind(), normalizeAtc(), incomeAttachments(), Periods, periods() (+44 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (43): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+35 more)

### Community 77 - "react"
Cohesion: 0.07
Nodes (62): react, fmtDate(), SearchParams, INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props (+54 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.05
Nodes (69): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+61 more)

### Community 79 - "vitest"
Cohesion: 0.08
Nodes (7): vitest, root, root, root, root, root, root

### Community 80 - "filings/actions.ts"
Cohesion: 0.20
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), SignOffState, stepData(), text(), tieOutsBlocking() (+9 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (36): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+28 more)

### Community 82 - "notes.ts"
Cohesion: 0.13
Nodes (17): ICON, when, acceptedQuote(), canonicalContent(), defaultTerms(), ProposalContent, inquiryAnswers(), NoteEntry (+9 more)

### Community 83 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (35): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+27 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "remittances/forms.tsx"
Cohesion: 0.19
Nodes (28): DueDateForm(), EmployerNumberForm(), HandlesContributionsSwitch(), PrepareForm(), RemitForm(), RemittanceButton(), RemittanceFileUpload(), send() (+20 more)

### Community 86 - "Button"
Cohesion: 0.17
Nodes (28): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+20 more)

### Community 87 - "portalContext"
Cohesion: 0.18
Nodes (28): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker() (+20 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.10
Nodes (33): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, RegisterLine, Adjustment, c() (+25 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (29): metadata, QuotesClosed(), Start(), StartPage(), SelectItem(), AttributionKeeper(), noop(), readAttribution() (+21 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.11
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 93 - "alphalist.ts"
Cohesion: 0.14
Nodes (25): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+17 more)

### Community 94 - "Badge"
Cohesion: 0.12
Nodes (35): RequestDetail(), RequestPage(), NewRequestForm(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests() (+27 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "portal/reports/page.tsx"
Cohesion: 0.15
Nodes (22): BooksSection(), NavRow(), PortalReports(), Released, Reports(), Section(), Statements(), when() (+14 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.07
Nodes (52): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), DirectoryParty (+44 more)

### Community 100 - "Centavos"
Cohesion: 0.06
Nodes (58): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+50 more)

### Community 101 - "opening-checklist.tsx"
Cohesion: 0.16
Nodes (16): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Row, Asset, Cutoff, cutoffOf() (+8 more)

### Community 102 - "cx"
Cohesion: 0.03
Nodes (109): react-aria-components, KIND_LABEL, MATCH_BADGE, ReadItem, SheetPreview(), ChipColor, StatusDot(), StatusDotColor (+101 more)

### Community 103 - "rates.ts"
Cohesion: 0.23
Nodes (19): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "pending-review.tsx"
Cohesion: 0.14
Nodes (24): Booking, BookingFields(), BooksChoices(), Codes, initialCodes(), ocrKeys(), PendingReview(), PendingRow (+16 more)

### Community 106 - "review/page.tsx"
Cohesion: 0.18
Nodes (15): ClientReturnsPage(), Returns(), PastReturnsForm(), Queue(), ReviewPage(), Row, Section(), filingsBooksReady() (+7 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (49): FilingRow, FilingListRow, AmendFilingForm(), bookKind, BookRow, bookStatus, Event, eventText (+41 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (28): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), MonthComplete(), SentRow, TimelineRow (+20 more)

### Community 109 - "upload/page.tsx"
Cohesion: 0.20
Nodes (18): Content(), NotificationSettingsPage(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), TelegramLinkButton() (+10 more)

### Community 110 - "index.ts"
Cohesion: 0.06
Nodes (21): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+13 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (60): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+52 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.10
Nodes (32): CloseYearForm(), ClientTab, ClientTabs(), UNDER, FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS (+24 more)

### Community 115 - "Field"
Cohesion: 0.09
Nodes (51): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+43 more)

### Community 116 - "google/calendar.ts"
Cohesion: 0.14
Nodes (26): disconnectCalendarAction(), GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches() (+18 more)

### Community 118 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 119 - "quote.ts"
Cohesion: 0.08
Nodes (45): loadTaxOnFee(), PriceRow, EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient (+37 more)

### Community 120 - "returns/types.ts"
Cohesion: 0.07
Nodes (43): PayrollReadReview(), peso(), loadAssets(), FinancialStatements, addTotals(), checkTotals(), LABELS, PayTotals (+35 more)

### Community 121 - "work/load.ts"
Cohesion: 0.20
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.27
Nodes (8): afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape(), Spec, SPECS, dir

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (47): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), BatchUpload(), PreviewTable(), Batch() (+39 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.13
Nodes (31): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), credit() (+23 more)

### Community 126 - "draft.ts"
Cohesion: 0.13
Nodes (25): file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), DraftIssue, draftSchema, draftToTemplate() (+17 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (53): PartyFormState, setPartyVerifiedAction(), MergeForm(), PartyForm(), PresetAccountForm(), VerifyButton(), fmtDate(), PartyDetail() (+45 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (77): RFC-4180, geminiJson(), BirCategory, CATEGORIES, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES (+69 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.08
Nodes (33): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+25 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (47): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+39 more)

### Community 131 - "worksheet/page.tsx"
Cohesion: 0.23
Nodes (15): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, FollowUpForm(), WorksheetInputsForm(), Lines(), lineStyle, Problems() (+7 more)

### Community 132 - "notification-actions.tsx"
Cohesion: 0.16
Nodes (17): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+9 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (19): OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, call() (+11 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.18
Nodes (11): GlobalNotFound(), metadata, metadata, SiteLayout(), SiteNotFound(), geist, geistMono, montserrat (+3 more)

### Community 136 - "supabaseServer"
Cohesion: 0.06
Nodes (67): nextConfig, next, setClientStatusAction(), addClientNoteAction(), NoteState, addChargeAction(), applyCreditAction(), clearRemittedAction() (+59 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "report-periods.ts"
Cohesion: 0.25
Nodes (16): basePeriod(), HeldNote(), holdsWhat(), PortalBooks, BooksYear, booksYears(), iso(), monthEnd() (+8 more)

### Community 139 - "tax-codes.ts"
Cohesion: 0.18
Nodes (15): SettingsPage(), SettingsRoute(), appliesTo(), canGoOn(), formsFor(), placeOf(), RETURN_LINES, ReturnForm (+7 more)

### Community 140 - "cwt-tracker-view.tsx"
Cohesion: 0.22
Nodes (16): Cwt2307TrackerPage(), Tracker(), CwtFollowUpForm(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure() (+8 more)

### Community 141 - "payroll-read-actions.ts"
Cohesion: 0.22
Nodes (15): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), lastDay() (+7 more)

### Community 142 - "notification-bell.tsx"
Cohesion: 0.24
Nodes (16): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), BellAudience (+8 more)

### Community 143 - "IsoDate"
Cohesion: 0.16
Nodes (16): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+8 more)

### Community 144 - "ref_node_fs"
Cohesion: 0.08
Nodes (8): dir, readme, templates, root, root, root, root, root

### Community 145 - "Card"
Cohesion: 0.15
Nodes (34): Certificates(), amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable() (+26 more)

### Community 146 - "server-only"
Cohesion: 0.08
Nodes (48): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+40 more)

### Community 147 - "opening.ts"
Cohesion: 0.13
Nodes (20): exceljs, PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine (+12 more)

### Community 148 - "proof-upload.tsx"
Cohesion: 0.16
Nodes (19): Detail(), PayNow(), METHODS, ProofUpload(), send(), amount, date, ProofState (+11 more)

### Community 149 - "booksContext"
Cohesion: 0.20
Nodes (19): booksContext(), BooksContext, booksViewFor(), one(), Certificates(), Staff2307Page(), Print(), Print2307Page() (+11 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.06
Nodes (89): robots(), AboutPage(), HOW, metadata, BirCalendarPage(), metadata, BRING, ContactList() (+81 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.26
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+3 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.14
Nodes (27): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+19 more)

### Community 154 - "notification-settings-view.tsx"
Cohesion: 0.20
Nodes (14): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor() (+6 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.09
Nodes (40): ApprovedReview(), ApprovedRow, ClientSelect(), PeriodFilter(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review() (+32 more)

### Community 156 - "queries.ts"
Cohesion: 0.19
Nodes (14): GET(), isNotificationKind(), BELL_LIMIT, BellData, bellData, bellDataFor, emailOffKinds(), emailPreferences() (+6 more)

### Community 157 - "template.ts"
Cohesion: 0.06
Nodes (48): corp, items, proposal(), items, schedule, OWNER_PRICES, OWNER_SETTINGS, buildProposalQuote() (+40 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (50): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+42 more)

### Community 159 - "app/page.tsx"
Cohesion: 0.18
Nodes (22): FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), EndButton() (+14 more)

### Community 160 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.21
Nodes (19): FormState, DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant() (+11 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.14
Nodes (20): AcceptForm(), acceptProposalAction(), AcceptState, metadata, Proposal(), ProposalPage(), jobName(), lineName() (+12 more)

### Community 165 - "transactions-actions.ts"
Cohesion: 0.38
Nodes (11): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+3 more)

### Community 166 - "parts.ts"
Cohesion: 0.10
Nodes (23): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), KIND_LABELS, one() (+15 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "documents/labels.ts"
Cohesion: 0.09
Nodes (35): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+27 more)

### Community 169 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 170 - "Notice"
Cohesion: 0.11
Nodes (33): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), EmployeeUpload(), PreviewTable(), PriorEmployerForm() (+25 more)

### Community 171 - "generate.test.ts"
Cohesion: 0.17
Nodes (10): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q(), ObligationRow (+2 more)

### Community 172 - "Textarea"
Cohesion: 0.20
Nodes (23): PaymentSettings(), accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction() (+15 more)

### Community 173 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 174 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 177 - "pg"
Cohesion: 0.08
Nodes (9): pg, root, root, root, root, root, approved(), as() (+1 more)

### Community 178 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 179 - "notifications-view.tsx"
Cohesion: 0.30
Nodes (11): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, fullDateTime() (+3 more)

### Community 180 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 181 - "register-xlsx.ts"
Cohesion: 0.15
Nodes (20): CheckedRegister, checkRegister(), fmt(), ID_HEADERS, NewEmployeeRow, norm(), normalizeTin(), parseName() (+12 more)

### Community 182 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "source.ts"
Cohesion: 0.12
Nodes (26): qapBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, AtcKind, BUSINESS_TAX_ATCS (+18 more)

### Community 186 - "documents-card.tsx"
Cohesion: 0.47
Nodes (8): DocReviewActions(), DocumentsCard(), when(), addMonths(), ymd(), monthChoices(), nextCutoff(), openMonth()

### Community 187 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 188 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 190 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "portal-nav.tsx"
Cohesion: 0.35
Nodes (8): PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab, Tab, under()

### Community 193 - "financial-statements-view.tsx"
Cohesion: 0.31
Nodes (7): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), periodTitle(), Statement

### Community 195 - "ref_node_path"
Cohesion: 0.08
Nodes (8): ctx, input, root, root, Row, root, root, root

### Community 196 - "books/periods.ts"
Cohesion: 0.36
Nodes (7): BooksMonthRow, BOOKS_MONTH_STATUS_LABELS, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 197 - "year/[year]/page.tsx"
Cohesion: 0.46
Nodes (7): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings()

### Community 198 - "cwt-forms.tsx"
Cohesion: 0.57
Nodes (5): Rematch2307Button(), CwtActionState, markCwtFollowedUp(), rematch2307(), trackerPath()

### Community 199 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 200 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 201 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 202 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 206 - "firm/page.tsx"
Cohesion: 0.50
Nodes (4): FirmPage(), PLACES, Places(), REVIEWER_PLACES

### Community 207 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 208 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1545 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `LinkButton`, `dependencies`, `ledger/data.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `link-button.tsx`, `requireStaff`, `payroll/actions.ts`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `module-pages.tsx`, `deadlines/page.tsx`, `PageHeader`, `filings/run.ts`, `quote/page.tsx`, `books/export/route.ts`, `lock-bar.tsx`, `missing-2307/page.tsx`, `Select`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `react`, `@remixicon/react`, `filings/actions.ts`, `app/settings/page.tsx`, `remittances/forms.tsx`, `Button`, `portalContext`, `workpapers/load.ts`, `intake-picker.tsx`, `form-2316.tsx`, `Badge`, `portal/reports/page.tsx`, `review-form.tsx`, `Centavos`, `opening-checklist.tsx`, `cx`, `pending-review.tsx`, `review/page.tsx`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `upload/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `move-bar.tsx`, `quote.ts`, `batch/register.ts`, `manilaToday`, `draft.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `return-file-actions.ts`, `worksheet/page.tsx`, `notification-actions.tsx`, `fixed-assets/page.tsx`, `site-document.tsx`, `report-periods.ts`, `cwt-tracker-view.tsx`, `payroll-read-actions.ts`, `notification-bell.tsx`, `Card`, `server-only`, `proof-upload.tsx`, `booksContext`, `blocks.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `queries.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `proposal-view.tsx`, `transactions-actions.ts`, `opengraph-image.tsx`, `documents/labels.ts`, `Notice`, `Textarea`, `notifications-view.tsx`, `portal-nav.tsx`, `financial-statements-view.tsx`, `year/[year]/page.tsx`, `cwt-forms.tsx`, `firm/page.tsx`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0942684766214178 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `ledger-lock.test.ts`, `ui.ts`, `public.ts`, `package.json`, `onboarding/page.tsx`, `ledger/data.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `requireStaff`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `deadlines/page.tsx`, `payroll/forms.tsx`, `PageHeader`, `money.ts`, `quote/page.tsx`, `books/export/route.ts`, `safeguards.ts`, `lock-bar.tsx`, `status.ts`, `addDays`, `testing.ts`, `Select`, `payroll/data.ts`, `@remixicon/react`, `notes.ts`, `app/settings/page.tsx`, `portal-billing.test.ts`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `Badge`, `portal/reports/page.tsx`, `review-form.tsx`, `Centavos`, `opening-checklist.tsx`, `rates.ts`, `review/page.tsx`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `index.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `move-bar.tsx`, `quote.ts`, `returns/types.ts`, `work/load.ts`, `auth-templates.ts`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `return-file-actions.ts`, `gemini.ts`, `fixed-assets/page.tsx`, `ticked-allocation.test.ts`, `report-periods.ts`, `tax-codes.ts`, `payroll-read-actions.ts`, `IsoDate`, `ref_node_fs`, `server-only`, `opening.ts`, `blocks.tsx`, `holiday-list.ts`, `ledger.test.ts`, `workpapers/page.tsx`, `app/documents/page.tsx`, `template.ts`, `app/page.tsx`, `notifications/format.ts`, `calendar/page.tsx`, `db.test.ts`, `parts.ts`, `lead-attribution.test.ts`, `generate.test.ts`, `acting-approver.test.ts`, `digest.ts`, `pg`, `parallel-run.test.ts`, `books-2307.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `source.ts`, `documents-card.tsx`, `funnel.test.ts`, `leads-pipeline.test.ts`, `portal-statements-approval.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `portal-nav.tsx`, `financial-statements-view.tsx`, `payroll-books.test.ts`, `ref_node_path`, `books/periods.ts`, `names.ts`, `cwt-2307-tracker.test.ts`, `telegram-uploads.test.ts`, `fixed-assets.test.ts`, `ledger-closing.test.ts`, `month-complete.test.ts`, `returns-books.test.ts`, `tasks-and-request-owners.test.ts`, `approve-and-post.test.ts`, `client-reports.test.ts`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `LinkButton`, `notification.tsx`, `dependencies`, `scores/page.tsx`, `compare.ts`, `link-button.tsx`, `requireStaff`, `modal.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `module-pages.tsx`, `deadlines/page.tsx`, `payroll/forms.tsx`, `PageHeader`, `filings/run.ts`, `quote/page.tsx`, `lock-bar.tsx`, `missing-2307/page.tsx`, `Select`, `books/forms.tsx`, `stat-cards.tsx`, `@remixicon/react`, `filings/actions.ts`, `how-we-work/page.tsx`, `app/settings/page.tsx`, `remittances/forms.tsx`, `Button`, `portalContext`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `Badge`, `portal/reports/page.tsx`, `review-form.tsx`, `Centavos`, `cx`, `pending-review.tsx`, `review/page.tsx`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `upload/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `Field`, `move-bar.tsx`, `quote.ts`, `batch/register.ts`, `manilaToday`, `parties/[id]/page.tsx`, `social-button.tsx`, `return-file-actions.ts`, `worksheet/page.tsx`, `notification-actions.tsx`, `fixed-assets/page.tsx`, `site-document.tsx`, `supabaseServer`, `tax-codes.ts`, `cwt-tracker-view.tsx`, `notification-bell.tsx`, `Card`, `proof-upload.tsx`, `booksContext`, `blocks.tsx`, `workpapers/page.tsx`, `notification-settings-view.tsx`, `app/documents/page.tsx`, `queries.ts`, `template.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `transactions-actions.ts`, `documents/labels.ts`, `Notice`, `Textarea`, `bell-store.ts`, `financial-statements-view.tsx`, `year/[year]/page.tsx`, `cwt-forms.tsx`, `firm/page.tsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Should `ui.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06605222734254992 - nodes in this community are weakly interconnected._