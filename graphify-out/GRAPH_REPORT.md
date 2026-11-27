# Graph Report - agent-aa6d5b3023b723085  (2026-11-27)

## Corpus Check
- 950 files · ~773,806 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: .css 10, (none) 5, .woff2 3)

## Summary
- 5885 nodes · 20823 edges · 194 communities (176 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 186 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `b5e72a33`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- formatAmount
- draft.ts
- migrate.yml
- ui.ts
- december-rehearsal.test.ts
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/[id]/page.tsx
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
- cwt-tracker.ts
- scores/page.tsx
- compare.ts
- employees-xlsx.ts
- button.tsx
- document-upload.tsx
- payroll/forms.tsx
- modal.tsx
- public.ts
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- showDate
- webhook.ts
- module-pages.tsx
- deadlines/page.tsx
- marketing/page.tsx
- registrations/[id]/page.tsx
- returns/types.ts
- deadlines/actions.ts
- quote/page.tsx
- arap.ts
- safeguards.ts
- lock-bar.tsx
- generate.ts
- steps.test.ts
- Apple Design
- engine.ts
- vitest
- registrations/forms.tsx
- ocr/run.ts
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- react
- @remixicon/react
- ref_node_fs
- task-form.tsx
- how-we-work/page.tsx
- LinkButton
- settings/actions.ts
- Pro components
- tools/page.tsx
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- payroll/payroll.test.ts
- Badge
- Recipes
- ledger/data.ts
- BoardUI page patterns
- Pro templates
- fields.ts
- ledger/books.ts
- ledger/types.ts
- cx
- rates.ts
- boardui
- percentage.ts
- filings/[id]/page.tsx
- sign-off-actions.tsx
- cycle/page.tsx
- compute.ts
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- lib/books/actions.ts
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- payroll-read.tsx
- quote.ts
- returns/load.ts
- leads/[id]/page.tsx
- layout.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- upload/page.tsx
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- requireStaff
- move-bar.tsx
- parties/forms.tsx
- notification-actions.tsx
- site-document.tsx
- supabaseServer
- ticked-allocation.test.ts
- work/load.ts
- review-form.tsx
- Centavos
- cwt-tracker-view.tsx
- fixed-assets/page.tsx
- filings/actions.ts
- book-income.ts
- queries.ts
- server-only
- opening.ts
- notifications/format.ts
- memo.ts
- blocks.tsx
- bir-filing-calendar/page.tsx
- ledger.test.ts
- review-forms.tsx
- notification-bell.tsx
- app/documents/page.tsx
- copy-opencv.mjs
- template.ts
- leads/forms.tsx
- addDays
- requests/actions.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- notification-settings-view.tsx
- steps.ts
- register/page.tsx
- opengraph-image.tsx
- portal/documents/page.tsx
- cwt-match.tsx
- holiday-list.ts
- notifications-view.tsx
- app/settings/page.tsx
- month-select.tsx
- [id]/books/print/page.tsx
- acting-approver.test.ts
- messages.ts
- registrations/actions.ts
- bell-store.ts
- [month]/page.tsx
- approval-memo.tsx
- register-xlsx.ts
- missing-2307/page.tsx
- contribution-remittances.test.ts
- periods
- binder/page.tsx
- registrations/new/page.tsx
- Building UIs with BoardUI
- tieouts.test.ts
- cwt-2307-tracker.test.ts
- accept-form.tsx
- workpapers.test.ts
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

## Communities (194 total, 18 thin omitted)

### Community 0 - "formatAmount"
Cohesion: 0.08
Nodes (51): Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print(), one(), portal2307(), portal2307Href(), SearchParams (+43 more)

### Community 1 - "draft.ts"
Cohesion: 0.11
Nodes (29): file(), GET(), safe(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when() (+21 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.06
Nodes (60): blankLine(), InvoiceForm(), InvoiceFormValue, SettingsPage(), SettingsRoute(), fmt(), OpenInvoice, SettlementForm() (+52 more)

### Community 4 - "december-rehearsal.test.ts"
Cohesion: 0.05
Nodes (28): BOOK_LOCK_FORMS, api, ctx, fn, rows, src, as(), client() (+20 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (29): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+21 more)

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

### Community 11 - "documents/[id]/page.tsx"
Cohesion: 0.12
Nodes (26): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Payroll(), PayrollPage(), BOOKED_TYPES, DocumentReviewPage() (+18 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx.ts"
Cohesion: 0.04
Nodes (54): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+46 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (44): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES (+36 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.12
Nodes (49): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), penalties(), quarterlyPayments(), reconciliation() (+41 more)

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
Cohesion: 0.16
Nodes (26): addMonths(), buildTracker(), calendarQuarterStart(), cents(), explainMatch(), fromCents(), lastDay(), looseDocuments() (+18 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (65): ParallelRun(), ParallelRunPage(), quarterMonths(), Documents(), KIND, MonthDetail(), monthName(), Parties() (+57 more)

### Community 43 - "employees-xlsx.ts"
Cohesion: 0.11
Nodes (20): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+12 more)

### Community 44 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "document-upload.tsx"
Cohesion: 0.20
Nodes (14): DocumentUpload(), send(), upload(), Item, typeFromName(), ALLOWED, DocActionState, finishUpload() (+6 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (52): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+44 more)

### Community 47 - "modal.tsx"
Cohesion: 0.10
Nodes (35): LockState, DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button() (+27 more)

### Community 48 - "public.ts"
Cohesion: 0.12
Nodes (39): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+31 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+25 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.07
Nodes (57): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+49 more)

### Community 52 - "showDate"
Cohesion: 0.09
Nodes (65): EmployerCard(), RemittancesDue(), MonthRemittances(), GET(), ListRow, ORDER, Remittance(), RemittancePage() (+57 more)

### Community 53 - "webhook.ts"
Cohesion: 0.08
Nodes (47): maxDuration, POST(), TelegramEnv, telegramEnv(), ClaimedNotification, TelegramApi, telegramApi(), ALLOWED (+39 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.06
Nodes (79): BankAccountsRoute(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow, RowLink() (+71 more)

### Community 55 - "deadlines/page.tsx"
Cohesion: 0.15
Nodes (27): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+19 more)

### Community 56 - "marketing/page.tsx"
Cohesion: 0.11
Nodes (23): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+15 more)

### Community 57 - "registrations/[id]/page.tsx"
Cohesion: 0.18
Nodes (26): CompleteButton(), StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+18 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (74): qapBuckets(), PayrollContext, lookupAtc(), client, row(), INPUTS, MONTH, PAYSLIP_COLUMNS (+66 more)

### Community 59 - "deadlines/actions.ts"
Cohesion: 0.42
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 60 - "quote/page.tsx"
Cohesion: 0.06
Nodes (58): loadSchedules(), loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview() (+50 more)

### Community 61 - "arap.ts"
Cohesion: 0.16
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+10 more)

### Community 62 - "safeguards.ts"
Cohesion: 0.08
Nodes (39): ClientValues, TaxType, CoverageClient, coverageGaps(), Gap, GapKind, line(), longDay() (+31 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.14
Nodes (26): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+18 more)

### Community 64 - "generate.ts"
Cohesion: 0.12
Nodes (26): Rule, PlannedObligation, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance, Frequency (+18 more)

### Community 65 - "steps.test.ts"
Cohesion: 0.15
Nodes (18): dtiRegisteredOn(), fieldErrors(), openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction(), YearRenewalsForm(), birForm(), branchStepsFor() (+10 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.14
Nodes (26): compareIso(), lastDayOfMonth(), DeadlineRule, fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), nextWorkingDay() (+18 more)

### Community 68 - "vitest"
Cohesion: 0.12
Nodes (27): vitest, form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual (+19 more)

### Community 69 - "registrations/forms.tsx"
Cohesion: 0.13
Nodes (17): FormState, frequencyLabel, Props, Row, FormState, caseNote, caseTitle, Check() (+9 more)

### Community 70 - "ocr/run.ts"
Cohesion: 0.17
Nodes (20): ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, displayName(), fullAddress(), listNameCols(), partyTinLabel() (+12 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (40): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+32 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.09
Nodes (48): GridRow, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+40 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.13
Nodes (42): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments(), buildSawt() (+34 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (45): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+37 more)

### Community 77 - "react"
Cohesion: 0.07
Nodes (45): react, CustomersRoute(), JournalEntryRoute(), NewEntry(), NewEntryPage(), ReportsIndex(), PartyList(), PaymentsNewPage() (+37 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.06
Nodes (59): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+51 more)

### Community 79 - "ref_node_fs"
Cohesion: 0.02
Nodes (39): pg, dir, ctx, input, root, root, root, root (+31 more)

### Community 80 - "task-form.tsx"
Cohesion: 0.19
Nodes (21): ClientOption, pesos, StaffOption, TaskDefaults, TaskWorkflow(), askClientAction(), createTaskAction(), fieldErrors() (+13 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.13
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "LinkButton"
Cohesion: 0.17
Nodes (25): booksContext(), BooksContext, booksViewFor(), fmtMonth(), one(), BooksSummaryPage(), Summary(), SummaryCard() (+17 more)

### Community 83 - "settings/actions.ts"
Cohesion: 0.21
Nodes (15): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+7 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tools/page.tsx"
Cohesion: 0.18
Nodes (20): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), RepostRegisterButton() (+12 more)

### Community 86 - "Notice"
Cohesion: 0.09
Nodes (74): setupMissingChartsAction(), ClientForm(), StaffOptions(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload() (+66 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (67): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker() (+59 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.18
Nodes (19): month1601C(), RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart() (+11 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.15
Nodes (21): AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), ATTRIBUTION_KEY, pickAttribution(), withAttribution() (+13 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "payroll/payroll.test.ts"
Cohesion: 0.10
Nodes (36): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+28 more)

### Community 94 - "Badge"
Cohesion: 0.06
Nodes (80): amt(), one(), shiftMonth(), SignStatus(), STATUS, TieRow(), Workpapers(), WorkpapersPage() (+72 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "ledger/data.ts"
Cohesion: 0.15
Nodes (25): dayBefore(), GET(), safe(), Released, fromWorkbookData(), accountFromRow(), Amendment, AmendmentStatus (+17 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "fields.ts"
Cohesion: 0.06
Nodes (40): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, normalizeAmount() (+32 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.09
Nodes (35): exceljs, BOOK_ABBR, BookEntry, BookKind, Column, ColumnarBook, columnarBook(), COLUMNS (+27 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.09
Nodes (35): Accounts(), AccountsPage(), GROUPS, Access, STATUS, Row, accumulated(), Asset (+27 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (96): react-aria-components, ChipColor, Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Checkbox(), CheckboxProps (+88 more)

### Community 103 - "rates.ts"
Cohesion: 0.24
Nodes (17): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+9 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "percentage.ts"
Cohesion: 0.35
Nodes (11): inputs1701(), inputs1702RT(), penaltyInputs(), inputs1701Q(), inputs1702Q(), withoutBookFigures(), withoutMethodChoice(), inputsFor() (+3 more)

### Community 106 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (42): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind (+34 more)

### Community 107 - "sign-off-actions.tsx"
Cohesion: 0.23
Nodes (12): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+4 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.12
Nodes (31): DocReviewActions(), DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, shift() (+23 more)

### Community 109 - "compute.ts"
Cohesion: 0.19
Nodes (20): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+12 more)

### Community 110 - "index.ts"
Cohesion: 0.03
Nodes (45): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+37 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (53): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+45 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (43): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+35 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (69): decideUnlockAction(), lockMonthAction(), refresh(), requestLockAction(), requestUnlockAction(), run(), text(), books() (+61 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (42): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+34 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (36): disconnectCalendarAction(), FormState, GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE (+28 more)

### Community 118 - "payroll-read.tsx"
Cohesion: 0.12
Nodes (28): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+20 more)

### Community 119 - "quote.ts"
Cohesion: 0.09
Nodes (42): corp, items, proposal(), buildProposalQuote(), JobBand, jobField, JobGroup, jobGroupOf() (+34 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.08
Nodes (47): loadAssets(), FinancialStatements, ATC_MASTER, AtcInfo, normalizeAtc(), withNonDeductible(), dayBefore(), FilingRow (+39 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (50): BookingLink(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), ReopenForm(), Result(), ReviewerForm(), bookedTime (+42 more)

### Community 122 - "layout.ts"
Cohesion: 0.13
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (45): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+37 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.08
Nodes (46): Detail(), StatementPage(), Billing(), PortalBilling(), statementHref(), Detail(), PayNow(), credit() (+38 more)

### Community 126 - "upload/page.tsx"
Cohesion: 0.19
Nodes (17): Content(), NotificationSettingsPage(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), TelegramLinkButton() (+9 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.17
Nodes (19): fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, Party, PARTY_COLUMNS (+11 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (64): geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+56 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.06
Nodes (51): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+43 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (51): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+43 more)

### Community 131 - "requireStaff"
Cohesion: 0.09
Nodes (38): ClientList(), ClientsPage(), FilingTable(), markCwtFollowedUpAction(), recomputeWorksheetAction(), GET(), Lines(), lineStyle (+30 more)

### Community 132 - "move-bar.tsx"
Cohesion: 0.31
Nodes (11): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveItem, crossesYear(), MOVE_TARGETS (+3 more)

### Community 133 - "parties/forms.tsx"
Cohesion: 0.18
Nodes (17): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), PARTY_KINDS (+9 more)

### Community 134 - "notification-actions.tsx"
Cohesion: 0.16
Nodes (17): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+9 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.12
Nodes (14): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), SiteNotFound(), geist (+6 more)

### Community 136 - "supabaseServer"
Cohesion: 0.04
Nodes (98): nextConfig, zod@^4.6.7, next, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors() (+90 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "work/load.ts"
Cohesion: 0.18
Nodes (15): Risk, lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.07
Nodes (45): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+37 more)

### Community 140 - "Centavos"
Cohesion: 0.11
Nodes (18): BookLine, ColumnarRow, JournalRow, LedgerSection, SundryLine, EntryLineOut, PrintLine, EntryLine (+10 more)

### Community 141 - "cwt-tracker-view.tsx"
Cohesion: 0.24
Nodes (15): Cwt2307TrackerPage(), Tracker(), CwtFollowUpForm(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure() (+7 more)

### Community 142 - "fixed-assets/page.tsx"
Cohesion: 0.23
Nodes (15): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+7 more)

### Community 143 - "filings/actions.ts"
Cohesion: 0.21
Nodes (15): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+7 more)

### Community 144 - "book-income.ts"
Cohesion: 0.27
Nodes (9): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, NonDeductibleRow (+1 more)

### Community 145 - "queries.ts"
Cohesion: 0.19
Nodes (14): GET(), isNotificationKind(), BELL_LIMIT, BellData, bellData, bellDataFor, emailOffKinds(), emailPreferences() (+6 more)

### Community 146 - "server-only"
Cohesion: 0.11
Nodes (38): server-only, @supabase/supabase-js, GET(), GET(), GET(), MonthComplete(), SentRow, TimelineRow (+30 more)

### Community 147 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 148 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 149 - "memo.ts"
Cohesion: 0.17
Nodes (11): ReviewNote, Memo, MemoInput, MemoMonth, ALWAYS, MonthActivity, REFS_FOR_FORM, SIGNED_REFS (+3 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.06
Nodes (87): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+79 more)

### Community 151 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "review-forms.tsx"
Cohesion: 0.21
Nodes (14): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+6 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.26
Nodes (15): markReadLocally(), useBellData(), BellPanel(), BellRow(), DotBadge(), NotificationBell(), base(), BellAudience (+7 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.11
Nodes (31): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths() (+23 more)

### Community 156 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 157 - "template.ts"
Cohesion: 0.10
Nodes (21): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS (+13 more)

### Community 158 - "leads/forms.tsx"
Cohesion: 0.16
Nodes (27): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState (+19 more)

### Community 159 - "addDays"
Cohesion: 0.13
Nodes (27): Queue(), ReviewPage(), Row, Section(), appointActingAction(), endActingAction(), refresh(), EndButton() (+19 more)

### Community 160 - "requests/actions.ts"
Cohesion: 0.23
Nodes (15): ReplyForm(), send(), shrinkImage(), assignRequestAction(), closeRequestAction(), createRequestAction(), openTicketAction(), refresh() (+7 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (17): DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant(), appBookedEvents() (+9 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 164 - "notification-settings-view.tsx"
Cohesion: 0.23
Nodes (12): EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS (+4 more)

### Community 165 - "steps.ts"
Cohesion: 0.15
Nodes (14): Agency, BranchOptions, CaseStep, ClosureOptions, dayNumber(), EMPLOYER_STEPS, LGU_STEPS, PlannedStep (+6 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.14
Nodes (32): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+24 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "portal/documents/page.tsx"
Cohesion: 0.15
Nodes (18): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+10 more)

### Community 169 - "cwt-match.tsx"
Cohesion: 0.29
Nodes (10): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), Rematch2307Button(), CwtActionState, markCwtFollowedUp() (+2 more)

### Community 170 - "holiday-list.ts"
Cohesion: 0.26
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+3 more)

### Community 171 - "notifications-view.tsx"
Cohesion: 0.30
Nodes (11): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, fullDateTime() (+3 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (38): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+30 more)

### Community 173 - "month-select.tsx"
Cohesion: 0.25
Nodes (9): MonthSelect(), SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, BOOKS_VIEW_COOKIE (+1 more)

### Community 174 - "[id]/books/print/page.tsx"
Cohesion: 0.31
Nodes (7): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), bookPeriodLabel()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "messages.ts"
Cohesion: 0.17
Nodes (12): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+4 more)

### Community 177 - "registrations/actions.ts"
Cohesion: 0.29
Nodes (8): branchSchema, checkbox, closureSchema, newRegistrationSchema, renewalSchema, stepUpdateSchema, updateSchema, CaseKind

### Community 178 - "bell-store.ts"
Cohesion: 0.42
Nodes (10): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+2 more)

### Community 179 - "[month]/page.tsx"
Cohesion: 0.19
Nodes (15): PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db (+7 more)

### Community 180 - "approval-memo.tsx"
Cohesion: 0.31
Nodes (7): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, approvalMemo(), monthsOf()

### Community 181 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (33): RFC-4180, sortItems(), filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS (+25 more)

### Community 182 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "periods"
Cohesion: 0.47
Nodes (9): Periods, periods(), addMonths(), docsWithin(), monthEnd(), monthWithin(), pad2(), quarterOf() (+1 more)

### Community 185 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 186 - "registrations/new/page.tsx"
Cohesion: 0.39
Nodes (6): ClientCaseKind, clientCase, NewRegistrationPage(), OwnerOnly(), manilaDate(), dtiRenewalDue()

### Community 187 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 188 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 189 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 190 - "accept-form.tsx"
Cohesion: 0.70
Nodes (3): acceptProposalAction(), AcceptState, contentHash()

### Community 191 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1547 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `formatAmount`, `draft.ts`, `package.json`, `onboarding/page.tsx`, `documents/[id]/page.tsx`, `dependencies`, `scores/page.tsx`, `compare.ts`, `document-upload.tsx`, `payroll/forms.tsx`, `public.ts`, `supabaseAdmin`, `fees/[id]/page.tsx`, `showDate`, `webhook.ts`, `module-pages.tsx`, `deadlines/page.tsx`, `marketing/page.tsx`, `registrations/[id]/page.tsx`, `deadlines/actions.ts`, `quote/page.tsx`, `lock-bar.tsx`, `books/forms.tsx`, `payroll/data.ts`, `react`, `@remixicon/react`, `task-form.tsx`, `LinkButton`, `settings/actions.ts`, `tools/page.tsx`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `Badge`, `ledger/data.ts`, `ledger/types.ts`, `cx`, `filings/[id]/page.tsx`, `sign-off-actions.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `payroll-read.tsx`, `leads/[id]/page.tsx`, `batch/register.ts`, `statement.ts`, `upload/page.tsx`, `parties/[id]/page.tsx`, `social-button.tsx`, `return-file-actions.ts`, `requireStaff`, `move-bar.tsx`, `parties/forms.tsx`, `notification-actions.tsx`, `site-document.tsx`, `review-form.tsx`, `cwt-tracker-view.tsx`, `fixed-assets/page.tsx`, `filings/actions.ts`, `queries.ts`, `server-only`, `blocks.tsx`, `review-forms.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `leads/forms.tsx`, `addDays`, `requests/actions.ts`, `proposal-view.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `portal/documents/page.tsx`, `cwt-match.tsx`, `notifications-view.tsx`, `app/settings/page.tsx`, `month-select.tsx`, `[id]/books/print/page.tsx`, `registrations/actions.ts`, `[month]/page.tsx`, `approval-memo.tsx`, `missing-2307/page.tsx`, `binder/page.tsx`, `registrations/new/page.tsx`, `accept-form.tsx`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `formatAmount` be split into smaller, more focused modules?**
  _Cohesion score 0.0819252432155658 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `formatAmount`, `ui.ts`, `december-rehearsal.test.ts`, `package.json`, `onboarding/page.tsx`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `public.ts`, `supabaseAdmin`, `fees/[id]/page.tsx`, `showDate`, `webhook.ts`, `module-pages.tsx`, `deadlines/page.tsx`, `returns/types.ts`, `quote/page.tsx`, `arap.ts`, `safeguards.ts`, `lock-bar.tsx`, `generate.ts`, `steps.test.ts`, `engine.ts`, `ocr/run.ts`, `payroll/data.ts`, `@remixicon/react`, `ref_node_fs`, `settings/actions.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `payroll/payroll.test.ts`, `Badge`, `fields.ts`, `ledger/books.ts`, `ledger/types.ts`, `rates.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `index.ts`, `profile.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `payroll-read.tsx`, `quote.ts`, `returns/load.ts`, `leads/[id]/page.tsx`, `layout.ts`, `batch/register.ts`, `read.test.ts`, `social-button.tsx`, `return-file-actions.ts`, `move-bar.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `work/load.ts`, `review-form.tsx`, `filings/actions.ts`, `server-only`, `opening.ts`, `notifications/format.ts`, `memo.ts`, `blocks.tsx`, `bir-filing-calendar/page.tsx`, `ledger.test.ts`, `app/documents/page.tsx`, `template.ts`, `addDays`, `calendar/page.tsx`, `register/page.tsx`, `holiday-list.ts`, `app/settings/page.tsx`, `acting-approver.test.ts`, `messages.ts`, `approval-memo.tsx`, `contribution-remittances.test.ts`, `tieouts.test.ts`, `cwt-2307-tracker.test.ts`, `workpapers.test.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Should `draft.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10695187165775401 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `formatAmount`, `draft.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `documents/[id]/page.tsx`, `cx.ts`, `dependencies`, `statements.ts`, `scores/page.tsx`, `compare.ts`, `button.tsx`, `document-upload.tsx`, `payroll/forms.tsx`, `modal.tsx`, `public.ts`, `supabaseAdmin`, `fees/[id]/page.tsx`, `showDate`, `module-pages.tsx`, `deadlines/page.tsx`, `marketing/page.tsx`, `registrations/[id]/page.tsx`, `deadlines/actions.ts`, `quote/page.tsx`, `lock-bar.tsx`, `registrations/forms.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `@remixicon/react`, `task-form.tsx`, `how-we-work/page.tsx`, `LinkButton`, `tools/page.tsx`, `Notice`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `Badge`, `ledger/types.ts`, `cx`, `filings/[id]/page.tsx`, `sign-off-actions.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `payroll-read.tsx`, `quote.ts`, `leads/[id]/page.tsx`, `batch/register.ts`, `statement.ts`, `upload/page.tsx`, `parties/[id]/page.tsx`, `social-button.tsx`, `return-file-actions.ts`, `requireStaff`, `move-bar.tsx`, `parties/forms.tsx`, `notification-actions.tsx`, `site-document.tsx`, `supabaseServer`, `review-form.tsx`, `cwt-tracker-view.tsx`, `fixed-assets/page.tsx`, `queries.ts`, `server-only`, `blocks.tsx`, `review-forms.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `leads/forms.tsx`, `addDays`, `requests/actions.ts`, `calendar/page.tsx`, `proposal-view.tsx`, `notification-settings-view.tsx`, `register/page.tsx`, `portal/documents/page.tsx`, `cwt-match.tsx`, `app/settings/page.tsx`, `month-select.tsx`, `[id]/books/print/page.tsx`, `bell-store.ts`, `[month]/page.tsx`, `missing-2307/page.tsx`, `binder/page.tsx`, `registrations/new/page.tsx`, `accept-form.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._