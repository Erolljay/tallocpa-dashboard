# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 962 files · ~792,863 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5958 nodes · 21079 edges · 208 communities (179 shown, 29 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 187 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `3965ac7a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- fees/types.ts
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/labels.ts
- Sign-in & Setup Docs
- requireOwner
- Sign-off, Ledger & Payments
- zod
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
- draft.ts
- button.tsx
- documents/[id]/page.tsx
- payroll/forms.tsx
- modal.tsx
- marketing/page.tsx
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- remittances/[id]/page.tsx
- webhook.ts
- module-pages.tsx
- money.ts
- settlement-pages.tsx
- ref_node_fs
- returns/types.ts
- registrations/forms.tsx
- theme-toggle.tsx
- books/export/route.ts
- payroll/types.ts
- lock-bar.tsx
- tieouts.ts
- invoice-pages.tsx
- Apple Design
- filings/run.ts
- testing.ts
- quote/page.tsx
- lib/books/actions.ts
- books/forms.tsx
- Centavos
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- react
- @remixicon/react
- pg
- ledger/data.ts
- how-we-work/page.tsx
- [month]/page.tsx
- cx
- Pro components
- task-form.tsx
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- notification-actions.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- approval-memo.tsx
- manilaToday
- Recipes
- tools/page.tsx
- BoardUI page patterns
- Pro templates
- filings/actions.ts
- ledger/books.ts
- opening-checklist.tsx
- combobox.tsx
- rates.ts
- boardui
- steps.ts
- getIdentity
- filings/[id]/page.tsx
- cycle/page.tsx
- payroll/data.ts
- workpapers.test.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- requireOwner
- booksContext
- apply-migrations.sh
- registrations/[id]/page.tsx
- quote.ts
- returns/load.ts
- leads/forms.tsx
- notifications/format.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- Badge
- transactions-actions.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- 2316/page.tsx
- queries.ts
- ocr/run.ts
- fixed-assets/page.tsx
- filings/[id]/page.tsx
- supabaseServer
- ticked-allocation.test.ts
- portal/reports/2307/scope.ts
- review-form.tsx
- notifications-view.tsx
- notification-settings-view.tsx
- workpapers/load.ts
- deadlines/page.tsx
- auth-templates.ts
- parallel-run.tsx
- server-only
- opening.ts
- Card
- form-2307.tsx
- blocks.tsx
- registration.test.ts
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- move-bar.tsx
- deadlines/actions.ts
- template.ts
- leads/[id]/page.tsx
- binder/page.tsx
- app/requests/page.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- grid.ts
- app/documents/page.tsx
- bell-store.ts
- register/page.tsx
- opengraph-image.tsx
- books/periods.ts
- registrations/page.tsx
- clients/[id]/page.tsx
- sign-off-actions.tsx
- app/settings/page.tsx
- cwt-tracker-view.tsx
- digest.ts
- acting-approver.test.ts
- ocr/run.ts
- tieouts.test.ts
- bir-filing-calendar/page.tsx
- Building UIs with BoardUI
- lead-attribution.test.ts
- portal-statements-approval.test.ts
- db.test.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- split-bundled-pdfs.test.ts
- site-document.tsx
- parties/forms.tsx
- books-2307.test.ts
- ref_node_path
- leads-pipeline.test.ts
- tests/books.test.ts
- parallel-run.test.ts
- portal/reports/2307/page.tsx
- books-migration.test.ts
- copy-opencv.mjs
- defer-documents.test.ts
- fees.test.ts
- lock-by-return-type.test.ts
- returns-books.test.ts
- tasks-and-request-owners.test.ts
- batch-upload.test.ts
- generate-qap-fixture.mjs
- books-lock.test.ts
- templates/README.md
- contribution-payables.test.ts
- telegram-uploads.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 367 edges
2. `cx` - 304 edges
3. `react` - 271 edges
4. `Notice()` - 255 edges
5. `Skeleton()` - 254 edges
6. `next` - 233 edges
7. `Button()` - 232 edges
8. `Badge()` - 182 edges
9. `Card()` - 182 edges
10. `vitest` - 182 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `worksheet()` --indirect_call--> `employeeFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts
- `worksheet()` --indirect_call--> `itemFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts
- `worksheet()` --indirect_call--> `priorEmployerFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (208 total, 29 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.15
Nodes (20): fmtDate(), period2307Text(), BY_2307, fmt(), Form2307Data, forms2307(), groupByAtc(), Line2307 (+12 more)

### Community 1 - "index.ts"
Cohesion: 0.06
Nodes (20): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+12 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (48): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+40 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.07
Nodes (47): ProposalSetup, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery() (+39 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (29): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+21 more)

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

### Community 11 - "documents/labels.ts"
Cohesion: 0.09
Nodes (35): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+27 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "requireOwner"
Cohesion: 0.11
Nodes (33): zod, addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), peso (+25 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "zod"
Cohesion: 0.10
Nodes (21): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+13 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (35): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section (+27 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (66): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), codes, PNL, balanceSheet() (+58 more)

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
Cohesion: 0.10
Nodes (38): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), addMonths(), buildTracker(), calendarQuarterStart() (+30 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (37): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+29 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (52): atcRows(), BookInvoiceRow, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC (+44 more)

### Community 43 - "draft.ts"
Cohesion: 0.11
Nodes (29): file(), GET(), safe(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when() (+21 more)

### Community 44 - "button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 45 - "documents/[id]/page.tsx"
Cohesion: 0.12
Nodes (31): deleteBundleInvoiceAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice(), Status(), BOOKED_TYPES, BundleChild (+23 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (58): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+50 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (64): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+56 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.12
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+25 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.12
Nodes (37): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+29 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.09
Nodes (62): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+54 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (43): maxDuration, POST(), TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked(), Choice (+35 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.07
Nodes (40): BankAccountsRoute(), SearchParams, BooksList(), Column, ListRow, RowLink(), CustomersRoute(), EmployeesRoute() (+32 more)

### Community 55 - "money.ts"
Cohesion: 0.11
Nodes (21): incomePayment(), agentLines(), agentProblems(), amountText(), emptyResult(), PAYROLL_NOT_LOADED, form1601C, INPUTS (+13 more)

### Community 56 - "settlement-pages.tsx"
Cohesion: 0.11
Nodes (38): fmtDate(), BooksFrame(), InvoiceView(), JournalList(), JournalView(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage() (+30 more)

### Community 57 - "ref_node_fs"
Cohesion: 0.08
Nodes (7): ctx, input, root, root, root, root, root

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (67): FinancialStatements, SaleSplit, branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tinDigits(), tinHasBranch() (+59 more)

### Community 59 - "registrations/forms.tsx"
Cohesion: 0.11
Nodes (34): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+26 more)

### Community 60 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.17
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), CashAccount, checkUpdate(), OpenItem, accounts (+10 more)

### Community 62 - "payroll/types.ts"
Cohesion: 0.11
Nodes (21): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+13 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.17
Nodes (20): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+12 more)

### Community 64 - "tieouts.ts"
Cohesion: 0.16
Nodes (18): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), Msg() (+10 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.12
Nodes (22): INVOICE_KINDS, InvoiceEdit(), InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage() (+14 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.05
Nodes (67): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+59 more)

### Community 68 - "testing.ts"
Cohesion: 0.10
Nodes (28): client, form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual (+20 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.29
Nodes (9): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), NOT_INCLUDED_NOTE (+1 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (24): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+16 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (39): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+31 more)

### Community 72 - "Centavos"
Cohesion: 0.06
Nodes (71): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+63 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.12
Nodes (43): tin9(), tinDashed(), incomeAttachments(), Periods, sawtAttachments(), sawtCsv(), sawtDat(), SawtForm (+35 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "react"
Cohesion: 0.06
Nodes (64): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+56 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.08
Nodes (45): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+37 more)

### Community 79 - "pg"
Cohesion: 0.07
Nodes (8): pg, root, Row, root, root, root, root, root

### Community 80 - "ledger/data.ts"
Cohesion: 0.14
Nodes (24): dayBefore(), GET(), safe(), Released, fromWorkbookData(), accountFromRow(), Amendment, AmendmentStatus (+16 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.11
Nodes (36): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+28 more)

### Community 82 - "[month]/page.tsx"
Cohesion: 0.18
Nodes (16): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+8 more)

### Community 83 - "cx"
Cohesion: 0.03
Nodes (87): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+79 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "task-form.tsx"
Cohesion: 0.23
Nodes (18): ClientOption, pesos, StaffOption, askClientAction(), createTaskAction(), fieldErrors(), optionalDate, optionalMonth (+10 more)

### Community 86 - "Notice"
Cohesion: 0.08
Nodes (88): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm(), EntryForm() (+80 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.09
Nodes (58): PortalClient, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker(), basePeriod() (+50 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notification-actions.tsx"
Cohesion: 0.18
Nodes (16): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+8 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (23): Checkbox(), SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), ATTRIBUTION_KEY (+15 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "approval-memo.tsx"
Cohesion: 0.18
Nodes (13): amt(), ApprovalMemo(), Db, TIE, grossSales(), approvalMemo(), Memo, MemoInput (+5 more)

### Community 94 - "manilaToday"
Cohesion: 0.09
Nodes (44): RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks() (+36 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "tools/page.tsx"
Cohesion: 0.17
Nodes (21): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), RepostRegisterButton() (+13 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "filings/actions.ts"
Cohesion: 0.23
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.06
Nodes (49): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+41 more)

### Community 101 - "opening-checklist.tsx"
Cohesion: 0.13
Nodes (23): Access, OpeningChecklist(), STATUS, Asset, Cutoff, cutoffOf(), TbRowOut, ChecklistInput (+15 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (79): react-aria-components, KIND_LABEL, MATCH_BADGE, peso(), ReadItem, SheetPreview(), ChipColor, animateTag() (+71 more)

### Community 103 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "steps.ts"
Cohesion: 0.14
Nodes (16): Agency, birForm(), BranchOptions, CaseStep, ClosureOptions, EMPLOYER_STEPS, LGU_STEPS, PlannedStep (+8 more)

### Community 106 - "getIdentity"
Cohesion: 0.12
Nodes (31): ReplyForm(), send(), METHODS, ProofUpload(), send(), TelegramLinkButton(), TelegramSwitch(), AnchorButton() (+23 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.10
Nodes (37): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey, ActingNotice(), AmendmentNotice() (+29 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.11
Nodes (34): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+26 more)

### Community 109 - "payroll/data.ts"
Cohesion: 0.11
Nodes (37): Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear(), Payroll2316Raw (+29 more)

### Community 110 - "workpapers.test.ts"
Cohesion: 0.07
Nodes (19): templatePayload(), BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), as() (+11 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (46): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, TimelineRow (+38 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.11
Nodes (32): ClientTab, ClientTabs(), UNDER, FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE (+24 more)

### Community 115 - "requireOwner"
Cohesion: 0.10
Nodes (48): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+40 more)

### Community 116 - "booksContext"
Cohesion: 0.30
Nodes (12): booksContext(), BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff() (+4 more)

### Community 118 - "registrations/[id]/page.tsx"
Cohesion: 0.26
Nodes (14): CompleteButton(), StepBadge(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell(), dayNumber() (+6 more)

### Community 119 - "quote.ts"
Cohesion: 0.08
Nodes (46): ClientValues, loadTaxOnFee(), PriceRow, EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile (+38 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.06
Nodes (62): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+54 more)

### Community 121 - "leads/forms.tsx"
Cohesion: 0.14
Nodes (34): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+26 more)

### Community 122 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "Badge"
Cohesion: 0.11
Nodes (38): Detail(), StatementPage(), FilingTable(), MonthRemittances(), Detail(), PortalStatementDetail(), Billing(), PortalBilling() (+30 more)

### Community 126 - "transactions-actions.ts"
Cohesion: 0.25
Nodes (16): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+8 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.09
Nodes (41): fmtDate(), PartyPage(), withDirectory(), datAddress(), datNameCols(), displayName(), fullAddress(), listNameCols() (+33 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (81): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), SPREADSHEET_TYPES (+73 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "2316/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 132 - "queries.ts"
Cohesion: 0.19
Nodes (13): GET(), NotificationKind, BELL_LIMIT, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications(), loadBellData() (+5 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (36): MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+28 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.11
Nodes (35): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+27 more)

### Community 135 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (40): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus, Event (+32 more)

### Community 136 - "supabaseServer"
Cohesion: 0.05
Nodes (65): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), addBundleInvoiceAction() (+57 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "portal/reports/2307/scope.ts"
Cohesion: 0.27
Nodes (12): one(), portal2307(), SearchParams, By2307, isBy2307(), lastDay(), pad2(), parsePeriod2307() (+4 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.05
Nodes (72): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+64 more)

### Community 140 - "notifications-view.tsx"
Cohesion: 0.28
Nodes (12): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, fullDateTime() (+4 more)

### Community 141 - "notification-settings-view.tsx"
Cohesion: 0.26
Nodes (10): EmailSwitches(), EmailSwitchGroup, Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS, NotificationAudience (+2 more)

### Community 142 - "workpapers/load.ts"
Cohesion: 0.23
Nodes (13): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote (+5 more)

### Community 143 - "deadlines/page.tsx"
Cohesion: 0.05
Nodes (79): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+71 more)

### Community 144 - "auth-templates.ts"
Cohesion: 0.19
Nodes (11): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+3 more)

### Community 145 - "parallel-run.tsx"
Cohesion: 0.14
Nodes (27): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+19 more)

### Community 146 - "server-only"
Cohesion: 0.09
Nodes (48): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), confirmMonthAction(), tellPreparer() (+40 more)

### Community 147 - "opening.ts"
Cohesion: 0.09
Nodes (33): AgingRow, CheckedUpdate, PNL_TYPES, EntryLineOut, CheckedOpening, checkOpening(), fmt(), ItemRow (+25 more)

### Community 148 - "Card"
Cohesion: 0.17
Nodes (24): booksViewFor(), fmtMonth(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate(), lastMonth(), Reports() (+16 more)

### Community 149 - "form-2307.tsx"
Cohesion: 0.29
Nodes (10): Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set(), padded(), PartyFields() (+2 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.06
Nodes (93): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+85 more)

### Community 151 - "registration.test.ts"
Cohesion: 0.17
Nodes (5): stepsFor(), stepsPayload(), codes(), root, root

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.21
Nodes (14): ExplainForm(), amt(), one(), shiftMonth(), SignStatus(), STATUS, TieRow(), Workpapers() (+6 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.21
Nodes (19): Bell(), markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base() (+11 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.26
Nodes (14): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+6 more)

### Community 156 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 157 - "template.ts"
Cohesion: 0.07
Nodes (35): vitest, ProposalData, corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS (+27 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (45): NotesCard(), bookedTime, Lead(), LeadPage(), LeadSource(), LeadTouch, Person, day() (+37 more)

### Community 159 - "binder/page.tsx"
Cohesion: 0.26
Nodes (14): amt(), CertificatesTable(), PartsLink(), PurchasesTable(), SalesTable(), th(), amt(), Binder() (+6 more)

### Community 160 - "app/requests/page.tsx"
Cohesion: 0.24
Nodes (13): Requests(), RequestsPage(), Row, View, VIEWS, PortalRequests(), Requests(), Row (+5 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.08
Nodes (55): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), addDays(), dayLabel(), ERRORS (+47 more)

### Community 163 - "grid.ts"
Cohesion: 0.24
Nodes (11): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+3 more)

### Community 164 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (27): ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths(), Documents() (+19 more)

### Community 165 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.11
Nodes (30): Href, LineParts(), one(), Register(), RegisterPage(), shiftMonth(), SOURCE, ACCOUNTS (+22 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "books/periods.ts"
Cohesion: 0.36
Nodes (7): BooksMonthRow, BOOKS_MONTH_STATUS_LABELS, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 169 - "registrations/page.tsx"
Cohesion: 0.23
Nodes (17): StepRow, YearRenewalsForm(), RegistrationList(), RegistrationsPage(), Row, CaseRow, clientStatus, fmt() (+9 more)

### Community 170 - "clients/[id]/page.tsx"
Cohesion: 0.05
Nodes (72): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+64 more)

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.22
Nodes (12): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+4 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.09
Nodes (48): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+40 more)

### Community 173 - "cwt-tracker-view.tsx"
Cohesion: 0.38
Nodes (9): CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure(), money(), showDate(), showStamp() (+1 more)

### Community 174 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "ocr/run.ts"
Cohesion: 0.31
Nodes (8): tooManyPagesMessage(), ocrProviderFromEnv(), REREAD_APPROVED, runOcr(), runPendingOcr(), SKIP, TooManyPages, runPendingPayrollReads()

### Community 177 - "tieouts.test.ts"
Cohesion: 0.17
Nodes (8): LedgerTotals, base, books, buy, sale, as(), bookedDoc(), root

### Community 178 - "bir-filing-calendar/page.tsx"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 179 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 180 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 181 - "portal-statements-approval.test.ts"
Cohesion: 0.18
Nodes (3): root, MONTHS, root

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 186 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 187 - "parties/forms.tsx"
Cohesion: 0.42
Nodes (7): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton()

### Community 188 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 189 - "ref_node_path"
Cohesion: 0.08
Nodes (7): HASH, LEAD, root, root, root, root, root

### Community 190 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 193 - "portal/reports/2307/page.tsx"
Cohesion: 0.39
Nodes (7): Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print(), portal2307Href(), Form2307Sheet(), Form2307Pickers()

### Community 194 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 202 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1578 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `documents/labels.ts`, `requireOwner`, `zod`, `cwt-tracker.ts`, `scores/page.tsx`, `draft.ts`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `module-pages.tsx`, `settlement-pages.tsx`, `registrations/forms.tsx`, `lock-bar.tsx`, `tieouts.ts`, `invoice-pages.tsx`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `react`, `@remixicon/react`, `ledger/data.ts`, `[month]/page.tsx`, `cx`, `task-form.tsx`, `Notice`, `portal/reports/page.tsx`, `notification-actions.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `approval-memo.tsx`, `manilaToday`, `tools/page.tsx`, `filings/actions.ts`, `ledger/books.ts`, `opening-checklist.tsx`, `getIdentity`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `payroll/data.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `requireOwner`, `booksContext`, `registrations/[id]/page.tsx`, `quote.ts`, `returns/load.ts`, `leads/forms.tsx`, `batch/register.ts`, `Badge`, `transactions-actions.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `2316/page.tsx`, `queries.ts`, `fixed-assets/page.tsx`, `filings/[id]/page.tsx`, `review-form.tsx`, `notifications-view.tsx`, `deadlines/page.tsx`, `parallel-run.tsx`, `server-only`, `Card`, `form-2307.tsx`, `blocks.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `move-bar.tsx`, `deadlines/actions.ts`, `leads/[id]/page.tsx`, `binder/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `app/documents/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `registrations/page.tsx`, `clients/[id]/page.tsx`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `cwt-tracker-view.tsx`, `site-document.tsx`, `parties/forms.tsx`, `portal/reports/2307/page.tsx`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.062388591800356503 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `template.ts` to `form-2307.ts`, `index.ts`, `ui.ts`, `fees/types.ts`, `package.json`, `onboarding/page.tsx`, `statements.ts`, `income.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/[id]/page.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `module-pages.tsx`, `money.ts`, `ref_node_fs`, `returns/types.ts`, `books/export/route.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `filings/run.ts`, `testing.ts`, `Centavos`, `@remixicon/react`, `pg`, `[month]/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `approval-memo.tsx`, `manilaToday`, `filings/actions.ts`, `ledger/books.ts`, `opening-checklist.tsx`, `rates.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `payroll/data.ts`, `workpapers.test.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `requireOwner`, `registrations/[id]/page.tsx`, `quote.ts`, `returns/load.ts`, `notifications/format.ts`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `ocr/run.ts`, `fixed-assets/page.tsx`, `filings/[id]/page.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `review-form.tsx`, `deadlines/page.tsx`, `auth-templates.ts`, `server-only`, `opening.ts`, `form-2307.tsx`, `blocks.tsx`, `registration.test.ts`, `ledger.test.ts`, `workpapers/page.tsx`, `move-bar.tsx`, `leads/[id]/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `app/documents/page.tsx`, `register/page.tsx`, `books/periods.ts`, `clients/[id]/page.tsx`, `app/settings/page.tsx`, `digest.ts`, `acting-approver.test.ts`, `tieouts.test.ts`, `bir-filing-calendar/page.tsx`, `lead-attribution.test.ts`, `portal-statements-approval.test.ts`, `db.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `split-bundled-pdfs.test.ts`, `books-2307.test.ts`, `ref_node_path`, `leads-pipeline.test.ts`, `tests/books.test.ts`, `parallel-run.test.ts`, `books-migration.test.ts`, `defer-documents.test.ts`, `fees.test.ts`, `lock-by-return-type.test.ts`, `returns-books.test.ts`, `tasks-and-request-owners.test.ts`, `batch-upload.test.ts`, `books-lock.test.ts`, `contribution-payables.test.ts`, `telegram-uploads.test.ts`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `documents/labels.ts`, `requireOwner`, `zod`, `statements.ts`, `scores/page.tsx`, `draft.ts`, `button.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `module-pages.tsx`, `settlement-pages.tsx`, `registrations/forms.tsx`, `theme-toggle.tsx`, `lock-bar.tsx`, `tieouts.ts`, `invoice-pages.tsx`, `quote/page.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `@remixicon/react`, `how-we-work/page.tsx`, `[month]/page.tsx`, `cx`, `task-form.tsx`, `Notice`, `portal/reports/page.tsx`, `notification-actions.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `tools/page.tsx`, `ledger/books.ts`, `combobox.tsx`, `getIdentity`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `requireOwner`, `booksContext`, `registrations/[id]/page.tsx`, `quote.ts`, `returns/load.ts`, `leads/forms.tsx`, `batch/register.ts`, `Badge`, `parties/[id]/page.tsx`, `social-button.tsx`, `2316/page.tsx`, `queries.ts`, `fixed-assets/page.tsx`, `filings/[id]/page.tsx`, `supabaseServer`, `review-form.tsx`, `notification-settings-view.tsx`, `deadlines/page.tsx`, `parallel-run.tsx`, `Card`, `form-2307.tsx`, `blocks.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `move-bar.tsx`, `deadlines/actions.ts`, `template.ts`, `leads/[id]/page.tsx`, `binder/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `app/documents/page.tsx`, `bell-store.ts`, `register/page.tsx`, `registrations/page.tsx`, `clients/[id]/page.tsx`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `cwt-tracker-view.tsx`, `site-document.tsx`, `parties/forms.tsx`, `portal/reports/2307/page.tsx`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Should `ui.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07581453634085213 - nodes in this community are weakly interconnected._