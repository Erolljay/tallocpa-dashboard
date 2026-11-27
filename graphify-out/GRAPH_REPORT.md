# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 975 files · ~800,342 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6027 nodes · 21446 edges · 205 communities (179 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 189 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `bd771d0c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LinkButton
- index.ts
- migrate.yml
- formatAmount
- fees/types.ts
- package.json
- Card
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
- button.tsx
- Review
- payroll/forms.tsx
- modal.tsx
- public.ts
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- Badge
- webhook.ts
- module-pages.tsx
- money.test.ts
- invoice-pages.tsx
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
- react
- @remixicon/react
- vitest
- review-form.tsx
- how-we-work/page.tsx
- bulk-actions.ts
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
- approval-memo.tsx
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
- steps.ts
- getIdentity
- app/page.tsx
- leads/forms.tsx
- payroll/data.ts
- client
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- [clientId]/page.tsx
- addDays
- apply-migrations.sh
- env.ts
- quote.ts
- returns/load.ts
- leads/[id]/page.tsx
- pending-review.tsx
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
- items.ts
- workpapers/load.ts
- safeguards.ts
- auth-templates.ts
- parallel-run.tsx
- server-only
- opening.ts
- cwt-match.tsx
- clients/[id]/page.tsx
- blocks.tsx
- seed.ts
- ledger.test.ts
- Notice
- lock.ts
- move-bar.tsx
- deadlines/actions.ts
- portalContext
- Rework: one flow from lead to year-end
- google/calendar.ts
- register-xlsx.ts
- app/documents/page.tsx
- document-upload.tsx
- register/page.tsx
- opengraph-image.tsx
- branches.ts
- registrations/[id]/page.tsx
- client-form.tsx
- Textarea
- app/settings/page.tsx
- cwt-tracker-view.tsx
- month.ts
- acting-approver.test.ts
- ocr/run.ts
- tieouts.ts
- return-files.tsx
- Building UIs with BoardUI
- BoardUI page patterns
- portal-statements-approval.test.ts
- ref_node_fs
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- split-bundled-pdfs.test.ts
- site-document.tsx
- parseTin
- books-2307.test.ts
- pg
- leads-pipeline.test.ts
- tests/books.test.ts
- eslint.config.mjs
- books-migration.test.ts
- ref_node_path
- documents/cutoff.ts
- cwt-2307-tracker.test.ts
- lock-by-return-type.test.ts
- returns-books.test.ts
- fixed-assets.test.ts
- register-books.test.ts
- generate-qap-fixture.mjs
- portal-home.test.ts
- templates/README.md
- @supabase/ssr
- @techstark/opencv-js
- telegram-uploads.test.ts

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

## Communities (205 total, 26 thin omitted)

### Community 0 - "LinkButton"
Cohesion: 0.08
Nodes (57): Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page() (+49 more)

### Community 1 - "index.ts"
Cohesion: 0.04
Nodes (28): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+20 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "formatAmount"
Cohesion: 0.08
Nodes (53): BooksContext, booksViewFor(), fmtMonth(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate() (+45 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.10
Nodes (25): acceptProposalAction(), AcceptState, InstantQuote, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+17 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "Card"
Cohesion: 0.06
Nodes (60): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, ClientList() (+52 more)

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
Cohesion: 0.12
Nodes (28): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+20 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "settings/actions.ts"
Cohesion: 0.16
Nodes (17): zod, addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState (+9 more)

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
Nodes (37): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine() (+29 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (62): BIR_LINES, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+54 more)

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
Nodes (27): addMonths(), buildTracker(), calendarQuarterStart(), cents(), fromCents(), lastDay(), looseDocuments(), MatchCandidate (+19 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.08
Nodes (44): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+36 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (75): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+67 more)

### Community 43 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (37): BOOKED_TYPES, BundleChild, PayrollDocument(), Supabase, PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview() (+29 more)

### Community 44 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "Review"
Cohesion: 0.14
Nodes (22): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+14 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (65): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+57 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "public.ts"
Cohesion: 0.15
Nodes (32): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+24 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.16
Nodes (26): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+18 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.15
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 52 - "Badge"
Cohesion: 0.06
Nodes (80): EmployerCard(), ClientReturnsPage(), FilingRow, Returns(), FilingListRow, AmendmentCard(), BooksStillOpen(), Deadlines() (+72 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (40): TelegramApi, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF (+32 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.12
Nodes (39): BankAccountsRoute(), booksContext(), fmtDate(), one(), SearchParams, BooksFrame(), BooksList(), Column (+31 more)

### Community 55 - "money.test.ts"
Cohesion: 0.50
Nodes (3): applyRate(), basisPoints(), sum()

### Community 56 - "invoice-pages.tsx"
Cohesion: 0.08
Nodes (46): INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, NewEntry(), NewEntryPage() (+38 more)

### Community 57 - "template.ts"
Cohesion: 0.06
Nodes (39): jobName(), lineName(), longDate(), money(), php, ProposalData, ProposalView(), Rows() (+31 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.04
Nodes (78): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+70 more)

### Community 59 - "registrations/forms.tsx"
Cohesion: 0.11
Nodes (35): StaffOptions(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+27 more)

### Community 60 - "calendar/page.tsx"
Cohesion: 0.12
Nodes (33): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), addDays(), byDay(), DAY_LABEL (+25 more)

### Community 61 - "ledger/data.ts"
Cohesion: 0.09
Nodes (34): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+26 more)

### Community 62 - "payroll/types.ts"
Cohesion: 0.11
Nodes (23): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+15 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.13
Nodes (28): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+20 more)

### Community 64 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.15
Nodes (17): ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine, ReportTable() (+9 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.09
Nodes (33): TimelineFiling, TimelineItem, IsoDate, EfpsGroup, FilingChannel, FilingInstance, Frequency, Period (+25 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.13
Nodes (27): dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase (+19 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (42): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+34 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (42): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+34 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (76): GridRow, MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv() (+68 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.11
Nodes (48): branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDashed(), tinDigits(), tinHasBranch() (+40 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "react"
Cohesion: 0.08
Nodes (34): react, Batch(), BatchPage(), one(), toCentavos(), JournalEntryRoute(), PaymentsListPage(), PaymentsEditPage() (+26 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.08
Nodes (48): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+40 more)

### Community 79 - "vitest"
Cohesion: 0.07
Nodes (8): vitest, root, root, root, Row, root, root, root

### Community 80 - "review-form.tsx"
Cohesion: 0.12
Nodes (25): blankLine(), InvoiceForm(), InvoiceFormValue, fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, BookingFields() (+17 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (36): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+28 more)

### Community 82 - "bulk-actions.ts"
Cohesion: 0.13
Nodes (22): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), BatchRow (+14 more)

### Community 83 - "cx"
Cohesion: 0.03
Nodes (89): ZoomPreview(), switchBusinessAction(), BusinessSwitcher(), AvatarColor, AvatarProps, AvatarSize, styles, CounterColor (+81 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "requireStaff"
Cohesion: 0.14
Nodes (36): FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), UnlockRequests() (+28 more)

### Community 86 - "Notice"
Cohesion: 0.10
Nodes (62): ClientForm(), AccountForm(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), ReleaseReportForm(), SetupForm(), OpeningAssetForm() (+54 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (66): Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker(), basePeriod(), HeldNote() (+58 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notification-bell.tsx"
Cohesion: 0.04
Nodes (101): GET(), Content(), PortalNotificationsPage(), Content(), PortalNotificationSettingsPage(), emit(), listeners, markReadLocally() (+93 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (25): Checkbox(), SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind (+17 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.15
Nodes (24): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), amount(), BoxCells() (+16 more)

### Community 93 - "approval-memo.tsx"
Cohesion: 0.13
Nodes (17): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, approvalMemo(), Memo, MemoInput (+9 more)

### Community 94 - "PageHeader"
Cohesion: 0.09
Nodes (51): RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks() (+43 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "tools/page.tsx"
Cohesion: 0.15
Nodes (25): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+17 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "filings/actions.ts"
Cohesion: 0.27
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 100 - "Centavos"
Cohesion: 0.05
Nodes (61): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+53 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.10
Nodes (27): Access, STATUS, codes, PNL, COA_TEMPLATES, Cutoff, cutoffOf(), PNL_TYPES (+19 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (76): react-aria-components, ChipColor, CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, animateTag() (+68 more)

### Community 103 - "rates.ts"
Cohesion: 0.24
Nodes (17): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+9 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "steps.ts"
Cohesion: 0.09
Nodes (23): branchSchema, checkbox, closureSchema, newRegistrationSchema, renewalSchema, stepUpdateSchema, updateSchema, Agency (+15 more)

### Community 106 - "getIdentity"
Cohesion: 0.10
Nodes (36): NewRequestForm(), TicketForm(), AssignRequestForm(), CloseRequestButton(), ReplyForm(), send(), METHODS, ProofUpload() (+28 more)

### Community 107 - "app/page.tsx"
Cohesion: 0.14
Nodes (23): Queue(), ReviewPage(), Row, Section(), EndButton(), Acting(), ActingApproverPage(), Approval (+15 more)

### Community 108 - "leads/forms.tsx"
Cohesion: 0.13
Nodes (37): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+29 more)

### Community 109 - "payroll/data.ts"
Cohesion: 0.10
Nodes (38): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage() (+30 more)

### Community 110 - "client"
Cohesion: 0.07
Nodes (16): BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), doc(), root (+8 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (53): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+45 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.10
Nodes (35): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), BooksCards(), cents() (+27 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.06
Nodes (60): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+52 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.08
Nodes (63): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+55 more)

### Community 116 - "addDays"
Cohesion: 0.19
Nodes (24): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), ymd(), DeadlineRule (+16 more)

### Community 118 - "env.ts"
Cohesion: 0.18
Nodes (18): maxDuration, POST(), Content(), NotificationSettingsPage(), TelegramLinkButton(), TelegramSwitch(), TelegramUnlinkButton(), AnchorButton() (+10 more)

### Community 119 - "quote.ts"
Cohesion: 0.09
Nodes (46): PriceRow, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), has(), lastWholeMonths(), items (+38 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.08
Nodes (44): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+36 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.06
Nodes (51): NotesCard(), BookingLink(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), ReopenForm(), Result(), ReviewerForm() (+43 more)

### Community 122 - "pending-review.tsx"
Cohesion: 0.18
Nodes (15): Booking, Codes, initialCodes(), ocrKeys(), PendingReview(), PendingRow, PendingTaxCodes, ACCOUNT_SOURCES (+7 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.14
Nodes (26): Detail(), StatementPage(), Billing(), PortalBilling(), statementHref(), credit(), ItemList(), PaymentsList() (+18 more)

### Community 126 - "cycle/actions.ts"
Cohesion: 0.24
Nodes (14): SentRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction(), CycleState (+6 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.11
Nodes (34): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+26 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (74): applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), geminiJson(), PayrollItem (+66 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.06
Nodes (51): GET(), GET(), POST(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+43 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "work/load.ts"
Cohesion: 0.20
Nodes (15): loadAssets(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 132 - "tax-codes.ts"
Cohesion: 0.18
Nodes (14): canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine, returnLinesFor() (+6 more)

### Community 133 - "gemini.ts"
Cohesion: 0.07
Nodes (24): OcrManyOutput, OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL (+16 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 135 - "sign-off.ts"
Cohesion: 0.17
Nodes (13): availableActions(), FilingState, isNilReturn(), SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner (+5 more)

### Community 136 - "supabaseServer"
Cohesion: 0.05
Nodes (91): nextConfig, next, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction() (+83 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "board.ts"
Cohesion: 0.21
Nodes (13): StepProgress(), StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS, fiveSteps() (+5 more)

### Community 139 - "fields.ts"
Cohesion: 0.09
Nodes (29): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+21 more)

### Community 140 - "params.ts"
Cohesion: 0.22
Nodes (13): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+5 more)

### Community 141 - "items.ts"
Cohesion: 0.20
Nodes (12): PayrollSetupPage(), Setup(), BirCategory, CATEGORIES, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS (+4 more)

### Community 142 - "workpapers/load.ts"
Cohesion: 0.22
Nodes (14): month1601C(), RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart() (+6 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.10
Nodes (34): Gap, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board (+26 more)

### Community 144 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 145 - "parallel-run.tsx"
Cohesion: 0.13
Nodes (26): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+18 more)

### Community 146 - "server-only"
Cohesion: 0.08
Nodes (54): server-only, @supabase/supabase-js, GET(), GET(), GET(), digestMessage(), DigestRow, longDay() (+46 more)

### Community 147 - "opening.ts"
Cohesion: 0.17
Nodes (17): checkOpening(), fmt(), ItemRow, OpeningItem, openingPayload(), sheetOf(), TbRow, accounts (+9 more)

### Community 148 - "cwt-match.tsx"
Cohesion: 0.27
Nodes (11): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), Rematch2307Button(), CwtActionState, markCwtFollowedUp() (+3 more)

### Community 149 - "clients/[id]/page.tsx"
Cohesion: 0.26
Nodes (11): RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, Row, months (+3 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (94): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+86 more)

### Community 151 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "Notice"
Cohesion: 0.13
Nodes (24): BatchUpload(), PreviewTable(), PreviewTable(), SubmissionReview(), FieldDef, FIELDS, pesoInput(), Result() (+16 more)

### Community 154 - "lock.ts"
Cohesion: 0.29
Nodes (7): INCOME_TAX, LockFiling, lockFormsFor(), lockingFiling(), PAYROLL, PURCHASES, SALES

### Community 155 - "move-bar.tsx"
Cohesion: 0.26
Nodes (14): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+6 more)

### Community 156 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 160 - "portalContext"
Cohesion: 0.11
Nodes (32): Detail(), PortalStatementDetail(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, accessFor(), PortalClient, portalContext, decideMissing2307Action() (+24 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "google/calendar.ts"
Cohesion: 0.13
Nodes (27): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+19 more)

### Community 163 - "register-xlsx.ts"
Cohesion: 0.09
Nodes (34): RFC-4180, file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), draftToTemplate(), initialDraft() (+26 more)

### Community 164 - "app/documents/page.tsx"
Cohesion: 0.13
Nodes (29): ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths(), Documents() (+21 more)

### Community 165 - "document-upload.tsx"
Cohesion: 0.42
Nodes (8): DocumentUpload(), send(), upload(), Item, typeFromName(), finishUpload(), startUpload(), streamOf()

### Community 166 - "register/page.tsx"
Cohesion: 0.13
Nodes (34): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+26 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "branches.ts"
Cohesion: 0.31
Nodes (6): Branch, branchSchema, branchUpdateSchema, groupByBranch(), bac, ilo

### Community 169 - "registrations/[id]/page.tsx"
Cohesion: 0.12
Nodes (40): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+32 more)

### Community 170 - "client-form.tsx"
Cohesion: 0.20
Nodes (15): ClientValues, frequencyLabel, Props, obligationChanges(), obligationsForTaxTypes(), PlannedObligation, TAX_TYPES, TAXPAYER_TYPES (+7 more)

### Community 171 - "Textarea"
Cohesion: 0.12
Nodes (22): NoteState, ClientNoteForm(), SignOffState, AmendFilingForm(), checkTone, checkWord, needsNote(), noteLabel() (+14 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.14
Nodes (29): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+21 more)

### Community 173 - "cwt-tracker-view.tsx"
Cohesion: 0.33
Nodes (10): CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure(), money(), showDate(), showStamp() (+2 more)

### Community 174 - "month.ts"
Cohesion: 0.39
Nodes (7): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "ocr/run.ts"
Cohesion: 0.15
Nodes (21): isSplittable(), MAX_BUNDLE_PAGES, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+13 more)

### Community 177 - "tieouts.ts"
Cohesion: 0.14
Nodes (13): LedgerTotals, purchases(), sales(), base, books, buy, sale, tieOuts() (+5 more)

### Community 178 - "return-files.tsx"
Cohesion: 0.50
Nodes (7): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), startReturnFileUpload()

### Community 179 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 180 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 182 - "ref_node_fs"
Cohesion: 0.07
Nodes (7): ctx, input, root, root, root, root, root

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 186 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 187 - "parseTin"
Cohesion: 0.39
Nodes (7): mergePartyAction(), blank(), optionalText(), PartyInput, partySchema, normalizeBranch(), parseTin()

### Community 188 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 189 - "pg"
Cohesion: 0.07
Nodes (12): pg, root, HASH, LEAD, root, root, LEAD, LinkRow (+4 more)

### Community 190 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 194 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "ref_node_path"
Cohesion: 0.07
Nodes (9): outDir, pkgDir, require, { version }, dir, root, root, root (+1 more)

### Community 196 - "documents/cutoff.ts"
Cohesion: 0.80
Nodes (4): addMonths(), monthChoices(), nextCutoff(), openMonth()

### Community 197 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 200 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 201 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 202 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1590 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `LinkButton`, `index.ts`, `formatAmount`, `fees/types.ts`, `package.json`, `Card`, `settings/actions.ts`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `payroll/forms.tsx`, `public.ts`, `fees/[id]/page.tsx`, `Badge`, `webhook.ts`, `money.test.ts`, `invoice-pages.tsx`, `template.ts`, `returns/types.ts`, `registrations/forms.tsx`, `calendar/page.tsx`, `ledger/data.ts`, `lock-bar.tsx`, `generate.ts`, `testing.ts`, `payroll/payroll.test.ts`, `@remixicon/react`, `bulk-actions.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `notification-bell.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `approval-memo.tsx`, `PageHeader`, `Centavos`, `ledger/types.ts`, `rates.ts`, `app/page.tsx`, `payroll/data.ts`, `client`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `addDays`, `quote.ts`, `leads/[id]/page.tsx`, `pending-review.tsx`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `return-file-actions.ts`, `tax-codes.ts`, `gemini.ts`, `fixed-assets/page.tsx`, `sign-off.ts`, `supabaseServer`, `ticked-allocation.test.ts`, `board.ts`, `fields.ts`, `params.ts`, `safeguards.ts`, `server-only`, `opening.ts`, `blocks.tsx`, `ledger.test.ts`, `lock.ts`, `move-bar.tsx`, `google/calendar.ts`, `app/documents/page.tsx`, `register/page.tsx`, `branches.ts`, `registrations/[id]/page.tsx`, `client-form.tsx`, `app/settings/page.tsx`, `month.ts`, `acting-approver.test.ts`, `ocr/run.ts`, `tieouts.ts`, `portal-statements-approval.test.ts`, `ref_node_fs`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `split-bundled-pdfs.test.ts`, `books-2307.test.ts`, `pg`, `leads-pipeline.test.ts`, `tests/books.test.ts`, `books-migration.test.ts`, `ref_node_path`, `documents/cutoff.ts`, `cwt-2307-tracker.test.ts`, `lock-by-return-type.test.ts`, `returns-books.test.ts`, `fixed-assets.test.ts`, `register-books.test.ts`, `portal-home.test.ts`, `telegram-uploads.test.ts`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LinkButton` be split into smaller, more focused modules?**
  _Cohesion score 0.0770735524256651 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `LinkButton`, `formatAmount`, `fees/types.ts`, `package.json`, `Card`, `documents/labels.ts`, `settings/actions.ts`, `dependencies`, `scores/page.tsx`, `documents/[id]/page.tsx`, `Review`, `payroll/forms.tsx`, `public.ts`, `supabaseAdmin`, `fees/[id]/page.tsx`, `Badge`, `module-pages.tsx`, `invoice-pages.tsx`, `registrations/forms.tsx`, `ledger/data.ts`, `lock-bar.tsx`, `workpapers/page.tsx`, `marketing/page.tsx`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `react`, `@remixicon/react`, `review-form.tsx`, `bulk-actions.ts`, `cx`, `requireStaff`, `portal/reports/page.tsx`, `notification-bell.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `approval-memo.tsx`, `PageHeader`, `tools/page.tsx`, `filings/actions.ts`, `Centavos`, `ledger/types.ts`, `getIdentity`, `app/page.tsx`, `leads/forms.tsx`, `payroll/data.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `env.ts`, `returns/load.ts`, `leads/[id]/page.tsx`, `pending-review.tsx`, `batch/register.ts`, `statement.ts`, `cycle/actions.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `return-file-actions.ts`, `fixed-assets/page.tsx`, `parallel-run.tsx`, `server-only`, `cwt-match.tsx`, `clients/[id]/page.tsx`, `blocks.tsx`, `Notice`, `move-bar.tsx`, `deadlines/actions.ts`, `portalContext`, `google/calendar.ts`, `register-xlsx.ts`, `app/documents/page.tsx`, `document-upload.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `registrations/[id]/page.tsx`, `Textarea`, `app/settings/page.tsx`, `cwt-tracker-view.tsx`, `return-files.tsx`, `site-document.tsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04266510812390415 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `LinkButton`, `formatAmount`, `package.json`, `Card`, `documents/labels.ts`, `dependencies`, `statements.ts`, `scores/page.tsx`, `documents/[id]/page.tsx`, `button.tsx`, `Review`, `payroll/forms.tsx`, `modal.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `Badge`, `module-pages.tsx`, `invoice-pages.tsx`, `template.ts`, `registrations/forms.tsx`, `calendar/page.tsx`, `lock-bar.tsx`, `workpapers/page.tsx`, `marketing/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `@remixicon/react`, `review-form.tsx`, `how-we-work/page.tsx`, `cx`, `requireStaff`, `Notice`, `portal/reports/page.tsx`, `notification-bell.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `PageHeader`, `tools/page.tsx`, `Centavos`, `combobox.tsx`, `getIdentity`, `app/page.tsx`, `leads/forms.tsx`, `payroll/data.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `env.ts`, `returns/load.ts`, `leads/[id]/page.tsx`, `pending-review.tsx`, `batch/register.ts`, `statement.ts`, `cycle/actions.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `fixed-assets/page.tsx`, `supabaseServer`, `items.ts`, `parallel-run.tsx`, `cwt-match.tsx`, `clients/[id]/page.tsx`, `blocks.tsx`, `Notice`, `move-bar.tsx`, `deadlines/actions.ts`, `portalContext`, `google/calendar.ts`, `app/documents/page.tsx`, `document-upload.tsx`, `register/page.tsx`, `registrations/[id]/page.tsx`, `client-form.tsx`, `Textarea`, `app/settings/page.tsx`, `cwt-tracker-view.tsx`, `return-files.tsx`, `site-document.tsx`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._