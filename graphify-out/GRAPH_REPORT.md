# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 976 files · ~801,218 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6029 nodes · 21453 edges · 214 communities (189 shown, 25 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 189 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `ffaf5f5e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LinkButton
- index.ts
- migrate.yml
- formatAmount
- fees/types.ts
- package.json
- auth.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/labels.ts
- Sign-in & Setup Docs
- settings/actions.ts
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
- documents/[id]/page.tsx
- form-1604e.ts
- bundle-tools.tsx
- [month]/page.tsx
- modal.tsx
- public.ts
- scripts
- supabaseAdmin
- fees/forms.tsx
- Card
- webhook.ts
- module-pages.tsx
- money.ts
- settlement-pages.tsx
- template.ts
- returns/types.ts
- registrations/forms.tsx
- calendar/page.tsx
- ledger/data.ts
- payroll/types.ts
- lock-bar.tsx
- workpapers/page.tsx
- marketing/page.tsx
- Apple Design
- generate.ts
- testing.ts
- quote/page.tsx
- lib/books/actions.ts
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- invoice-pages.tsx
- @remixicon/react
- vitest
- review-form.tsx
- how-we-work/page.tsx
- react
- cx
- Pro components
- requireStaff
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- notification-bell.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- workpapers/load.ts
- PageHeader
- Recipes
- tools/page.tsx
- BoardUI theming reference
- Pro templates
- filings/actions.ts
- Centavos
- ledger/types.ts
- combobox.tsx
- rates.ts
- boardui
- layout.ts
- getIdentity
- review-queue.ts
- leads/forms.tsx
- payroll/data.ts
- client
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- collections.ts
- addDays
- apply-migrations.sh
- clients/[id]/page.tsx
- quote.ts
- returns/load.ts
- leads/[id]/page.tsx
- Centavos
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- cycle/actions.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- work/load.ts
- tax-codes.ts
- gemini.ts
- fixed-assets/page.tsx
- sign-off.ts
- supabaseServer
- ticked-allocation.test.ts
- board.ts
- fields.ts
- params.ts
- payroll/forms.tsx
- public.ts
- safeguards.ts
- auth-templates.ts
- parallel-run.tsx
- server-only
- opening.ts
- template.ts
- theme-toggle.tsx
- blocks.tsx
- seed.ts
- ledger.test.ts
- brand/forms.tsx
- [clientId]/page.tsx
- move-bar.tsx
- deadlines/actions.ts
- form-2307.tsx
- transactions-actions.ts
- onboarding/forms.tsx
- cx
- Rework: one flow from lead to year-end
- google/calendar.ts
- register-xlsx.ts
- app/documents/page.tsx
- collections/actions.ts
- register/page.tsx
- opengraph-image.tsx
- booksContext
- Skeleton
- safeguards-load.ts
- sign-off-actions.tsx
- app/settings/page.tsx
- cycle/page.tsx
- month.ts
- acting-approver.test.ts
- ocr/run.ts
- tieouts.test.ts
- return-files.tsx
- filed-returns.ts
- BoardUI page patterns
- portal-statements-approval.test.ts
- ref_node_fs
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- onboarding/checklist.ts
- site-document.tsx
- package.json
- books-2307.test.ts
- pg
- breadcrumb.tsx
- tests/books.test.ts
- eslint.config.mjs
- binder/page.tsx
- books-migration.test.ts
- copy-opencv.mjs
- deadlines/dates.ts
- spinner.tsx
- lock-by-return-type.test.ts
- books/periods.ts
- names.ts
- register-books.test.ts
- review.ts
- db.test.ts
- templates/README.md
- lead-attribution.test.ts
- funnel.test.ts
- notifications.test.ts
- cycle-forms.tsx
- defer-documents.test.ts
- fees.test.ts
- tasks-and-request-owners.test.ts
- workpapers.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 377 edges
2. `cx` - 306 edges
3. `react` - 276 edges
4. `Skeleton()` - 258 edges
5. `Notice()` - 257 edges
6. `Button()` - 238 edges
7. `next` - 237 edges
8. `Badge()` - 186 edges
9. `Card()` - 186 edges
10. `vitest` - 184 edges

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

## Communities (214 total, 25 thin omitted)

### Community 0 - "LinkButton"
Cohesion: 0.12
Nodes (38): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one(), portal2307() (+30 more)

### Community 1 - "index.ts"
Cohesion: 0.04
Nodes (28): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+20 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "formatAmount"
Cohesion: 0.08
Nodes (52): BooksContext, booksViewFor(), fmtMonth(), BooksFrame(), WithdrawReportButton(), MonthSelect(), BooksSummaryPage(), Summary() (+44 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.12
Nodes (27): activateAction(), createFromTemplateAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction(), startNewVersionAction() (+19 more)

### Community 5 - "package.json"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "auth.ts"
Cohesion: 0.09
Nodes (33): Contacts(), ContactsPage(), when, AuditRow, Contact(), ContactPage(), day, when (+25 more)

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
Cohesion: 0.10
Nodes (36): Doc, when(), ExceptionRow, BOOKED_TYPES, BundleChild, BundleDocument(), DocumentReviewPage(), loadBooking() (+28 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "settings/actions.ts"
Cohesion: 0.12
Nodes (24): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+16 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (40): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), PrintButton(), defaultCashFlow(), FsLine (+32 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (64): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+56 more)

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
Cohesion: 0.07
Nodes (55): Cwt2307TrackerPage(), Tracker(), amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtFollowUpForm() (+47 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "compare.ts"
Cohesion: 0.09
Nodes (42): atcRows(), BookInvoiceRow, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC (+34 more)

### Community 43 - "documents/[id]/page.tsx"
Cohesion: 0.07
Nodes (47): PayrollDocument(), applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction() (+39 more)

### Community 44 - "form-1604e.ts"
Cohesion: 0.08
Nodes (48): branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDashed(), tinDigits(), tinHasBranch() (+40 more)

### Community 45 - "bundle-tools.tsx"
Cohesion: 0.33
Nodes (10): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+2 more)

### Community 46 - "[month]/page.tsx"
Cohesion: 0.09
Nodes (45): saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction() (+37 more)

### Community 47 - "modal.tsx"
Cohesion: 0.15
Nodes (26): LockState, DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button() (+18 more)

### Community 48 - "public.ts"
Cohesion: 0.22
Nodes (22): GET(), Link, ATTR_COOKIE, ATTR_COOKIE_MAX_AGE, cleanText(), first(), firstTouch(), fromPage() (+14 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (30): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+22 more)

### Community 51 - "fees/forms.tsx"
Cohesion: 0.29
Nodes (10): ActivateForm(), billingHint, CreateFromTemplateForm(), DeleteDraftButton(), NewDraftForm(), PricesForm(), Result(), ScheduleSettingsForm() (+2 more)

### Community 52 - "Card"
Cohesion: 0.05
Nodes (93): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, FilingTable(), AmendmentCard(), BooksStillOpen(), Deadlines() (+85 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (42): TelegramApi, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF (+34 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.10
Nodes (33): BankAccountsRoute(), fmtDate(), BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), InvoiceView() (+25 more)

### Community 55 - "money.ts"
Cohesion: 0.19
Nodes (16): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+8 more)

### Community 56 - "settlement-pages.tsx"
Cohesion: 0.09
Nodes (33): PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage(), ReceiptsViewPage() (+25 more)

### Community 57 - "template.ts"
Cohesion: 0.11
Nodes (22): jobName(), lineName(), longDate(), money(), php, ProposalData, ProposalView(), Rows() (+14 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (41): FinancialStatements, client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q (+33 more)

### Community 59 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (69): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+61 more)

### Community 60 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (17): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+9 more)

### Community 61 - "ledger/data.ts"
Cohesion: 0.11
Nodes (30): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+22 more)

### Community 62 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.16
Nodes (22): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+14 more)

### Community 64 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+14 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.11
Nodes (23): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+15 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.13
Nodes (25): Rule, TimelineFiling, TimelineItem, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance (+17 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.16
Nodes (28): deleteDraftAction(), dateFmt, loadItems(), loadSchedule(), loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate() (+20 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (24): decideUnlockAction(), lockMonthAction(), refresh(), requestLockAction(), requestUnlockAction(), run(), text(), AmendmentFlag (+16 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (38): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+30 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (59): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+51 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.10
Nodes (43): ATC_MASTER, AtcInfo, lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS (+35 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "invoice-pages.tsx"
Cohesion: 0.12
Nodes (23): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage() (+15 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.09
Nodes (36): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+28 more)

### Community 79 - "vitest"
Cohesion: 0.05
Nodes (13): vitest, dir, root, root, root, root, HASH, LEAD (+5 more)

### Community 80 - "review-form.tsx"
Cohesion: 0.12
Nodes (27): blankLine(), InvoiceForm(), fmt(), SettlementForm(), addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction() (+19 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.11
Nodes (33): HowWeWorkPage(), Pair(), Split(), step(), StepText(), TimelineFigure(), Chip(), CHIP_COLORS (+25 more)

### Community 82 - "react"
Cohesion: 0.09
Nodes (30): react, NoteState, ClientNoteForm(), ExplainForm(), ReplyForm(), YearSelect(), AcceptForm(), metadata (+22 more)

### Community 83 - "cx"
Cohesion: 0.03
Nodes (80): AvatarColor, AvatarProps, AvatarSize, styles, StatusDot(), StatusDotColor, StatusDotProps, styles (+72 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "requireStaff"
Cohesion: 0.09
Nodes (64): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+56 more)

### Community 86 - "Notice"
Cohesion: 0.08
Nodes (84): FormState, ClientForm(), frequencyLabel, Props, StaffOptions(), BatchUpload(), PreviewTable(), AccountForm() (+76 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.10
Nodes (56): accessFor(), PortalClient, portalContext, Content(), PortalNotificationsPage(), Books(), PortalBooks(), PortalCwt2307Page() (+48 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (69): GET(), notifyNotificationsChanged(), EmailSwitches(), EmailSwitchGroup, MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData (+61 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.10
Nodes (30): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+22 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.11
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 93 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (23): RegisterLine, Adjustment, PeriodFile, ReviewNote, approvalMemo(), Memo, MemoInput, MemoMonth (+15 more)

### Community 94 - "PageHeader"
Cohesion: 0.13
Nodes (28): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+20 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "tools/page.tsx"
Cohesion: 0.17
Nodes (22): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm() (+14 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "filings/actions.ts"
Cohesion: 0.22
Nodes (16): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+8 more)

### Community 100 - "Centavos"
Cohesion: 0.07
Nodes (51): BookPrint(), BookPrintPage(), PrintButton(), BookPrint(), PortalBookPrint(), LooseLeafHead, LooseLeafPages(), Pad() (+43 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.07
Nodes (43): Access, OpeningChecklist(), STATUS, Asset, CASH_FLOW_CLASSES, CashFlowClass, codes, PNL (+35 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (70): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps, ComboBoxSelectionMode (+62 more)

### Community 103 - "rates.ts"
Cohesion: 0.24
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+10 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "layout.ts"
Cohesion: 0.11
Nodes (25): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+17 more)

### Community 106 - "getIdentity"
Cohesion: 0.09
Nodes (40): DocumentUpload(), send(), upload(), Item, typeFromName(), ReplyForm(), send(), METHODS (+32 more)

### Community 107 - "review-queue.ts"
Cohesion: 0.32
Nodes (4): Row, QueueFiling, QueueViewer, ReviewQueue

### Community 108 - "leads/forms.tsx"
Cohesion: 0.11
Nodes (40): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState (+32 more)

### Community 109 - "payroll/data.ts"
Cohesion: 0.10
Nodes (39): EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Signatory, mmdd(), paidInYear() (+31 more)

### Community 110 - "client"
Cohesion: 0.06
Nodes (19): BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), as(), purchase() (+11 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (47): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+39 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (35): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+27 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 115 - "collections.ts"
Cohesion: 0.17
Nodes (24): RunReadyButton(), Client, CollectionsPage(), OpenDue, Overview(), Stat(), ageOpenItems(), AGING_BUCKETS (+16 more)

### Community 116 - "addDays"
Cohesion: 0.21
Nodes (19): compareIso(), lastDayOfMonth(), DeadlineRule, fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), nextWorkingDay() (+11 more)

### Community 118 - "clients/[id]/page.tsx"
Cohesion: 0.08
Nodes (43): removeAssignmentAction(), ClientTab, ClientTabs(), UNDER, DocumentsCard(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton() (+35 more)

### Community 119 - "quote.ts"
Cohesion: 0.07
Nodes (56): ClientValues, PriceRow, EngagementRow, proposal(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient (+48 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.10
Nodes (38): normalizeAtc(), withNonDeductible(), dayBefore(), FilingRow, listInvoices(), loadEwtRemittances(), loadEwtYear(), loadLedger() (+30 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (35): BookingLink(), ReopenForm(), bookedTime, Lead(), LeadPage(), LeadSource(), LeadTouch, Person (+27 more)

### Community 122 - "Centavos"
Cohesion: 0.08
Nodes (29): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), AtcComparison, Bucket, DocumentDifference (+21 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (45): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+37 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.10
Nodes (34): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), decideMissing2307Action(), DecisionState, Decision() (+26 more)

### Community 126 - "cycle/actions.ts"
Cohesion: 0.27
Nodes (9): MonthComplete(), SentRow, TimelineRow, confirmMonthAction(), CycleState, decideExceptionAction(), refresh(), text() (+1 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.11
Nodes (31): datAddress(), datNameCols(), displayName(), fullAddress(), listNameCols(), Names, Party, PARTY_COLUMNS (+23 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (66): CATEGORIES, ITEM_KINDS, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES (+58 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.06
Nodes (47): GET(), GET(), POST(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+39 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "work/load.ts"
Cohesion: 0.20
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 132 - "tax-codes.ts"
Cohesion: 0.17
Nodes (17): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+9 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiJson() (+12 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (18): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), loadAssets(), Row (+10 more)

### Community 135 - "sign-off.ts"
Cohesion: 0.17
Nodes (13): ACTION_LABEL, availableActions(), FilingState, isNilReturn(), SIGN_OFF_STEPS, stepIndex(), client, owner (+5 more)

### Community 136 - "supabaseServer"
Cohesion: 0.03
Nodes (120): nextConfig, zod@^4.6.7, next, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors() (+112 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "board.ts"
Cohesion: 0.23
Nodes (12): StepProgress(), CauseTag, DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS, fiveSteps(), isNil() (+4 more)

### Community 139 - "fields.ts"
Cohesion: 0.06
Nodes (54): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Codes (+46 more)

### Community 140 - "params.ts"
Cohesion: 0.22
Nodes (13): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+5 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (47): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+39 more)

### Community 142 - "public.ts"
Cohesion: 0.13
Nodes (22): acceptProposalAction(), AcceptState, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+14 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.11
Nodes (28): line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board, MARCO (+20 more)

### Community 144 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 145 - "parallel-run.tsx"
Cohesion: 0.17
Nodes (24): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+16 more)

### Community 146 - "server-only"
Cohesion: 0.12
Nodes (36): server-only, @supabase/supabase-js, GET(), GET(), GET(), maxDuration, POST(), runActingDigest() (+28 more)

### Community 147 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 148 - "template.ts"
Cohesion: 0.10
Nodes (23): PRICE_SECTIONS, priceSection(), PriceSectionKey, AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL (+15 more)

### Community 149 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (97): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+89 more)

### Community 151 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "brand/forms.tsx"
Cohesion: 0.38
Nodes (6): FieldDef, FIELDS, pesoInput(), Result(), SUBMIT, TaxForm()

### Community 154 - "[clientId]/page.tsx"
Cohesion: 0.18
Nodes (22): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+14 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.26
Nodes (14): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+6 more)

### Community 156 - "deadlines/actions.ts"
Cohesion: 0.33
Nodes (7): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), refreshDueDates(), runFilingGeneration(), splitHolidays()

### Community 157 - "form-2307.tsx"
Cohesion: 0.18
Nodes (16): PortalPrint2307Page(), Print(), portal2307Href(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+8 more)

### Community 158 - "transactions-actions.ts"
Cohesion: 0.23
Nodes (17): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+9 more)

### Community 159 - "onboarding/forms.tsx"
Cohesion: 0.24
Nodes (15): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+7 more)

### Community 160 - "cx"
Cohesion: 0.08
Nodes (45): SheetPreview(), switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, emit(), listeners, markReadLocally() (+37 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "google/calendar.ts"
Cohesion: 0.11
Nodes (38): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+30 more)

### Community 163 - "register-xlsx.ts"
Cohesion: 0.13
Nodes (25): RFC-4180, monthlyTable(), sortItems(), filled(), Grid, GridResult, isCsv(), isXls() (+17 more)

### Community 164 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (40): ClientSelect(), Booking, ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths() (+32 more)

### Community 165 - "collections/actions.ts"
Cohesion: 0.22
Nodes (17): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+9 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "booksContext"
Cohesion: 0.21
Nodes (11): booksContext(), one(), SearchParams, CustomersRoute(), ReportsIndex(), KINDS, PartyList(), Print() (+3 more)

### Community 169 - "Skeleton"
Cohesion: 0.06
Nodes (82): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), Payroll(), PayrollPage(), PayrollSetupPage() (+74 more)

### Community 170 - "safeguards-load.ts"
Cohesion: 0.24
Nodes (11): TaxType, CoverageClient, coverageGaps(), Gap, GapKind, BoardRow, FilingRow, holidaySet() (+3 more)

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.23
Nodes (12): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+4 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.15
Nodes (27): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+19 more)

### Community 173 - "cycle/page.tsx"
Cohesion: 0.23
Nodes (12): Cycle(), CyclePage(), CycleWithClient, DocRow, CycleRow, EXCEPTION_DECISIONS, ExceptionDecision, parseMonth() (+4 more)

### Community 174 - "month.ts"
Cohesion: 0.33
Nodes (8): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "ocr/run.ts"
Cohesion: 0.10
Nodes (28): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+20 more)

### Community 177 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 178 - "return-files.tsx"
Cohesion: 0.50
Nodes (7): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), startReturnFileUpload()

### Community 179 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 180 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 182 - "ref_node_fs"
Cohesion: 0.07
Nodes (11): ctx, input, api, ctx, fn, rows, src, root (+3 more)

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "onboarding/checklist.ts"
Cohesion: 0.21
Nodes (9): ItemState, MANUAL_ITEM_LABELS, MANUAL_ITEMS, ONBOARDING_GROUPS, onboardingChecklist(), OnboardingFacts, OnboardingItem, state() (+1 more)

### Community 186 - "site-document.tsx"
Cohesion: 0.08
Nodes (24): GlobalNotFound(), metadata, apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter (+16 more)

### Community 187 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 188 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 189 - "pg"
Cohesion: 0.07
Nodes (9): pg, root, root, root, root, Row, Part, root (+1 more)

### Community 190 - "breadcrumb.tsx"
Cohesion: 0.24
Nodes (6): Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 193 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 194 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 196 - "deadlines/dates.ts"
Cohesion: 0.39
Nodes (9): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff() (+1 more)

### Community 197 - "spinner.tsx"
Cohesion: 0.32
Nodes (7): PendingGlyph(), Arc(), SIZES, Spinner(), SpinnerGlyph(), SpinnerProps, SpinnerSize

### Community 199 - "books/periods.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 200 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 201 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 202 - "review.ts"
Cohesion: 0.43
Nodes (5): ALWAYS, refsToSign(), reviewGaps(), SIGNED_REFS, quiet

### Community 206 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 207 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 209 - "cycle-forms.tsx"
Cohesion: 0.70
Nodes (4): CloseCycleButton(), DecideExceptionForm(), Message(), closeCycleAction()

### Community 213 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1590 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `LinkButton`, `index.ts`, `formatAmount`, `fees/types.ts`, `package.json`, `auth.ts`, `settings/actions.ts`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/[id]/page.tsx`, `form-1604e.ts`, `public.ts`, `supabaseAdmin`, `Card`, `webhook.ts`, `money.ts`, `template.ts`, `returns/types.ts`, `registrations/forms.tsx`, `calendar/page.tsx`, `ledger/data.ts`, `lock-bar.tsx`, `generate.ts`, `testing.ts`, `payroll/payroll.test.ts`, `invoice-pages.tsx`, `@remixicon/react`, `requireStaff`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `notification-bell.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `workpapers/load.ts`, `PageHeader`, `Centavos`, `ledger/types.ts`, `rates.ts`, `layout.ts`, `review-queue.ts`, `payroll/data.ts`, `client`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `collections.ts`, `addDays`, `clients/[id]/page.tsx`, `quote.ts`, `returns/load.ts`, `leads/[id]/page.tsx`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `return-file-actions.ts`, `work/load.ts`, `tax-codes.ts`, `gemini.ts`, `fixed-assets/page.tsx`, `sign-off.ts`, `supabaseServer`, `ticked-allocation.test.ts`, `board.ts`, `fields.ts`, `params.ts`, `public.ts`, `safeguards.ts`, `server-only`, `opening.ts`, `template.ts`, `blocks.tsx`, `ledger.test.ts`, `move-bar.tsx`, `form-2307.tsx`, `google/calendar.ts`, `app/documents/page.tsx`, `register/page.tsx`, `Skeleton`, `safeguards-load.ts`, `app/settings/page.tsx`, `cycle/page.tsx`, `month.ts`, `acting-approver.test.ts`, `ocr/run.ts`, `tieouts.test.ts`, `filed-returns.ts`, `portal-statements-approval.test.ts`, `ref_node_fs`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `onboarding/checklist.ts`, `package.json`, `books-2307.test.ts`, `pg`, `tests/books.test.ts`, `books-migration.test.ts`, `deadlines/dates.ts`, `lock-by-return-type.test.ts`, `books/periods.ts`, `names.ts`, `register-books.test.ts`, `review.ts`, `db.test.ts`, `lead-attribution.test.ts`, `funnel.test.ts`, `notifications.test.ts`, `defer-documents.test.ts`, `fees.test.ts`, `tasks-and-request-owners.test.ts`, `workpapers.test.ts`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LinkButton` be split into smaller, more focused modules?**
  _Cohesion score 0.11879432624113476 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `LinkButton`, `formatAmount`, `auth.ts`, `documents/labels.ts`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `documents/[id]/page.tsx`, `bundle-tools.tsx`, `[month]/page.tsx`, `modal.tsx`, `supabaseAdmin`, `fees/forms.tsx`, `Card`, `module-pages.tsx`, `money.ts`, `settlement-pages.tsx`, `template.ts`, `registrations/forms.tsx`, `calendar/page.tsx`, `lock-bar.tsx`, `workpapers/page.tsx`, `marketing/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `invoice-pages.tsx`, `@remixicon/react`, `review-form.tsx`, `how-we-work/page.tsx`, `cx`, `requireStaff`, `Notice`, `portal/reports/page.tsx`, `notification-bell.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `PageHeader`, `tools/page.tsx`, `Centavos`, `combobox.tsx`, `getIdentity`, `leads/forms.tsx`, `payroll/data.ts`, `portal/page.tsx`, `year-end/page.tsx`, `collections.ts`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `batch/register.ts`, `statement.ts`, `cycle/actions.ts`, `social-button.tsx`, `fixed-assets/page.tsx`, `supabaseServer`, `fields.ts`, `payroll/forms.tsx`, `parallel-run.tsx`, `theme-toggle.tsx`, `blocks.tsx`, `brand/forms.tsx`, `[clientId]/page.tsx`, `move-bar.tsx`, `deadlines/actions.ts`, `form-2307.tsx`, `transactions-actions.ts`, `onboarding/forms.tsx`, `cx`, `google/calendar.ts`, `app/documents/page.tsx`, `register/page.tsx`, `booksContext`, `Skeleton`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `cycle/page.tsx`, `return-files.tsx`, `site-document.tsx`, `package.json`, `breadcrumb.tsx`, `binder/page.tsx`, `spinner.tsx`, `cycle-forms.tsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04266510812390415 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `LinkButton`, `formatAmount`, `fees/types.ts`, `auth.ts`, `documents/labels.ts`, `settings/actions.ts`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `documents/[id]/page.tsx`, `bundle-tools.tsx`, `[month]/page.tsx`, `public.ts`, `supabaseAdmin`, `Card`, `module-pages.tsx`, `money.ts`, `settlement-pages.tsx`, `registrations/forms.tsx`, `ledger/data.ts`, `lock-bar.tsx`, `workpapers/page.tsx`, `marketing/page.tsx`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `invoice-pages.tsx`, `@remixicon/react`, `review-form.tsx`, `react`, `requireStaff`, `portal/reports/page.tsx`, `notification-bell.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `PageHeader`, `tools/page.tsx`, `filings/actions.ts`, `Centavos`, `ledger/types.ts`, `getIdentity`, `leads/forms.tsx`, `payroll/data.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `collections.ts`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `batch/register.ts`, `statement.ts`, `cycle/actions.ts`, `social-button.tsx`, `return-file-actions.ts`, `fixed-assets/page.tsx`, `fields.ts`, `payroll/forms.tsx`, `public.ts`, `parallel-run.tsx`, `server-only`, `blocks.tsx`, `brand/forms.tsx`, `[clientId]/page.tsx`, `move-bar.tsx`, `deadlines/actions.ts`, `form-2307.tsx`, `transactions-actions.ts`, `onboarding/forms.tsx`, `cx`, `google/calendar.ts`, `app/documents/page.tsx`, `collections/actions.ts`, `register/page.tsx`, `opengraph-image.tsx`, `booksContext`, `Skeleton`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `cycle/page.tsx`, `return-files.tsx`, `site-document.tsx`, `package.json`, `breadcrumb.tsx`, `binder/page.tsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._