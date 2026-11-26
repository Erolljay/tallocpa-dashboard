# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 893 files · ~710,111 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5550 nodes · 19396 edges · 184 communities (165 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 173 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `204938c2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- client
- migrate.yml
- module-pages.tsx
- manilaToday
- package.json
- clients/[id]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- lock-bar.tsx
- Sign-in & Setup Docs
- cx
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
- index.ts
- payroll/forms.tsx
- modal.tsx
- deadlines/page.tsx
- scripts
- supabaseAdmin
- quote/page.tsx
- payroll/payroll.test.ts
- getIdentity
- documents/labels.ts
- marketing/page.tsx
- payroll/data.ts
- registrations/forms.tsx
- money.ts
- Notice
- marketing/attribution.ts
- arap.ts
- layout.ts
- year-end/page.tsx
- Centavos
- react
- Apple Design
- sign-in-form.tsx
- form-1601c.ts
- supabaseServer
- return-file-actions.ts
- books/forms.tsx
- form-1601c.ts
- Rules
- Animation Performance
- [clientId]/page.tsx
- stat-cards.tsx
- cycle/page.tsx
- @remixicon/react
- Textarea
- calendar/staff.ts
- how-we-work/page.tsx
- settings/actions.ts
- link-button.tsx
- Pro components
- form-2307.tsx
- tools/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/forms.tsx
- filed-returns.ts
- Recipes
- Card
- BoardUI page patterns
- Pro templates
- ui.ts
- ledger/books.ts
- filings/run.ts
- combobox.tsx
- client-form.tsx
- boardui
- pending-review.tsx
- profile.ts
- filings/[id]/page.tsx
- template.ts
- db.test.ts
- generate-qap-fixture.mjs
- Opening balances: checklist for any cut-off
- [id]/returns/page.tsx
- Card
- lib/books/actions.ts
- [clientId]/page.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- vat.ts
- proposal-view.tsx
- returns/types.ts
- next
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- work/page.tsx
- parties/[id]/page.tsx
- read.test.ts
- opening.ts
- mime.ts
- names.ts
- onboarding/page.tsx
- gemini.ts
- fixed-assets/page.tsx
- rates.ts
- Skeleton
- ticked-allocation.test.ts
- report-periods.ts
- ledger.test.ts
- notification-bell.tsx
- review-form.tsx
- idle-watcher.tsx
- holiday-list.ts
- onboarding/forms.tsx
- parts.ts
- server-only
- ledger/types.ts
- sign-off-actions.tsx
- zod
- blocks.tsx
- payroll/export/route.ts
- safeguards.ts
- workpapers/page.tsx
- ui.tsx
- app/documents/page.tsx
- deadlines/actions.ts
- quote.ts
- leads/[id]/page.tsx
- Badge
- books/reports/2307/page.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- document-upload.tsx
- grid.ts
- [id]/books/print/page.tsx
- social-button.tsx
- opengraph-image.tsx
- cycle/actions.ts
- morning.ts
- Building UIs with BoardUI
- review-queue.ts
- app/settings/page.tsx
- missing-2307/page.tsx
- people/schema.ts
- acting-approver.test.ts
- eslint.config.mjs
- tests/register.test.ts
- parallel-run.test.ts
- returns-sign-off.test.ts
- toCentavos
- ref_node_fs
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 311 edges
2. `cx` - 286 edges
3. `react` - 254 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 233 edges
6. `next` - 209 edges
7. `Button()` - 205 edges
8. `Card()` - 166 edges
9. `Badge()` - 165 edges
10. `vitest` - 165 edges

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

## Communities (184 total, 19 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.10
Nodes (41): BooksContext, load2307Staff(), one(), portal2307(), SearchParams, Accreditation(), amount(), AmountRow() (+33 more)

### Community 1 - "client"
Cohesion: 0.07
Nodes (21): as(), client(), root, approved(), as(), root, approveIntoBooks(), as() (+13 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "module-pages.tsx"
Cohesion: 0.07
Nodes (40): BankAccountsRoute(), fmtDate(), BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), JournalEntryRoute() (+32 more)

### Community 4 - "manilaToday"
Cohesion: 0.07
Nodes (57): dateFmt, loadItems(), loadSchedule(), loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), Supabase (+49 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "clients/[id]/page.tsx"
Cohesion: 0.07
Nodes (51): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+43 more)

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

### Community 11 - "lock-bar.tsx"
Cohesion: 0.15
Nodes (24): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+16 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.03
Nodes (99): NotificationFilterTabs(), NotificationRowData, AvatarColor, AvatarProps, AvatarSize, styles, Counter(), CounterColor (+91 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
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
Nodes (34): defaultCashFlow(), statementsFrom(), FsLineKey, Section, add(), buildStatements(), classOf(), Column (+26 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (56): BirLineKey, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+48 more)

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
Nodes (27): dayBefore(), GET(), safe(), Released, fromWorkbookData(), buildBookWorkbook(), accountFromRow(), Amendment (+19 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (32): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+24 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (64): KIND, REASON, Section(), shortDate(), STATUS_TONE, AtcComparison, atcRows(), BookInvoiceRow (+56 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.13
Nodes (18): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EmployeeImportRow, readEmployeeFile(), reasonChoices (+10 more)

### Community 44 - "filings/actions.ts"
Cohesion: 0.17
Nodes (19): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+11 more)

### Community 45 - "index.ts"
Cohesion: 0.04
Nodes (33): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+25 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (62): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+54 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.15
Nodes (27): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+19 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.16
Nodes (19): Book(), PortalBookPage(), when, addDays(), byDay(), CLIENT_MEETING, DAY_LABEL, freeSlots() (+11 more)

### Community 51 - "quote/page.tsx"
Cohesion: 0.10
Nodes (34): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+26 more)

### Community 52 - "payroll/payroll.test.ts"
Cohesion: 0.11
Nodes (31): EMPLOYEE_SHEET, categoryTotals(), sortItems(), employee(), entry(), fixtureContext(), ITEMS, P() (+23 more)

### Community 53 - "getIdentity"
Cohesion: 0.19
Nodes (19): RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail(), PortalRequests() (+11 more)

### Community 54 - "documents/labels.ts"
Cohesion: 0.14
Nodes (23): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+15 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.11
Nodes (26): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+18 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.08
Nodes (54): Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear(), Payroll2316Raw (+46 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (88): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+80 more)

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (56): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel(), EwtLine, ewtLines() (+48 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (67): BatchUpload(), PreviewTable(), AccountForm(), CloseYearForm(), EntryForm(), ReleaseReportForm(), SetupForm(), OpeningAssetForm() (+59 more)

### Community 60 - "marketing/attribution.ts"
Cohesion: 0.15
Nodes (31): GET(), Link, pageAttribution(), requestQuoteAction(), SERVICES, StartState, php, Thanks() (+23 more)

### Community 61 - "arap.ts"
Cohesion: 0.15
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+10 more)

### Community 62 - "layout.ts"
Cohesion: 0.10
Nodes (37): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), tellPreparer() (+29 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 64 - "Centavos"
Cohesion: 0.11
Nodes (22): PrintLine, Bucket, SaleSplit, NonDeductibleRow, SawtResult, SawtRow, SlpRow, SlsRow (+14 more)

### Community 65 - "react"
Cohesion: 0.08
Nodes (41): react, CustomersRoute(), KINDS, PartyList(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage() (+33 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "sign-in-form.tsx"
Cohesion: 0.17
Nodes (17): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+9 more)

### Community 68 - "form-1601c.ts"
Cohesion: 0.06
Nodes (41): differsFromSuggestion(), enteredNet(), client, row(), form1701, form1702RT, year, BUSINESS_TAX_FORMS (+33 more)

### Community 69 - "supabaseServer"
Cohesion: 0.08
Nodes (38): addClientNoteAction(), NoteState, addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction() (+30 more)

### Community 70 - "return-file-actions.ts"
Cohesion: 0.30
Nodes (15): RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+7 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.10
Nodes (56): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+48 more)

### Community 72 - "form-1601c.ts"
Cohesion: 0.15
Nodes (24): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+16 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "[clientId]/page.tsx"
Cohesion: 0.17
Nodes (22): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (28): Cycle(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload(), STREAM_INFO (+20 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.08
Nodes (46): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+38 more)

### Community 79 - "Textarea"
Cohesion: 0.18
Nodes (19): PayrollIntake(), NewRequestForm(), ReplyForm(), TicketForm(), SlotPicker(), ReplyForm(), send(), Textarea() (+11 more)

### Community 80 - "calendar/staff.ts"
Cohesion: 0.17
Nodes (21): Interval, Admin, busyOf(), connect(), Connection, PersonWeek, teamWeek(), accessToken() (+13 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.13
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "settings/actions.ts"
Cohesion: 0.21
Nodes (16): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+8 more)

### Community 83 - "link-button.tsx"
Cohesion: 0.06
Nodes (38): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+30 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "form-2307.tsx"
Cohesion: 0.17
Nodes (21): booksContext(), one(), Print(), Print2307Page(), ParallelRun(), ParallelRunPage(), quarterMonths(), PrintAll() (+13 more)

### Community 86 - "tools/page.tsx"
Cohesion: 0.17
Nodes (22): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+14 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.17
Nodes (33): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), BooksSection(), NavRow() (+25 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.09
Nodes (33): Binder(), BinderPage(), one(), TIE_STATUS, month1601C(), RegisterLine, Adjustment, c() (+25 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.10
Nodes (30): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+22 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/forms.tsx"
Cohesion: 0.14
Nodes (33): PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+25 more)

### Community 94 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "Card"
Cohesion: 0.10
Nodes (48): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+40 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "ui.ts"
Cohesion: 0.09
Nodes (50): booksViewFor(), fmtMonth(), BooksFrame(), blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage() (+42 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.08
Nodes (37): BOOK_ABBR, BookEntry, BookKind, BookLine, Column, ColumnarBook, columnarBook(), ColumnarRow (+29 more)

### Community 101 - "filings/run.ts"
Cohesion: 0.08
Nodes (49): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, EfpsGroup, FilingChannel, FilingInstance (+41 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (79): react-aria-components, SheetPreview(), ChipColor, animateTag(), ComboBox(), ComboBoxItem(), ComboBoxItemProps, ComboBoxProps (+71 more)

### Community 103 - "client-form.tsx"
Cohesion: 0.18
Nodes (17): ClientValues, frequencyLabel, Props, EngagementRow, obligationChanges(), obligationsForTaxTypes(), PlannedObligation, TAX_TYPES (+9 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "pending-review.tsx"
Cohesion: 0.15
Nodes (19): BulkState, BookingFields(), BooksChoices(), Codes, initialCodes(), ocrKeys(), PendingReview(), PendingRow (+11 more)

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandFileUpload(), FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm() (+44 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (37): FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText, Filing() (+29 more)

### Community 108 - "template.ts"
Cohesion: 0.12
Nodes (18): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+10 more)

### Community 110 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "[id]/returns/page.tsx"
Cohesion: 0.18
Nodes (15): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), Returns(), booksStillOpen(), filingsBooksReady(), filingsNeedingAmendment() (+7 more)

### Community 113 - "Card"
Cohesion: 0.09
Nodes (43): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+35 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (40): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+32 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.16
Nodes (26): RunReadyButton(), Client, CollectionsPage(), OpenDue, Overview(), Stat(), ageOpenItems(), AGING_BUCKETS (+18 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.21
Nodes (17): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+9 more)

### Community 118 - "vat.ts"
Cohesion: 0.14
Nodes (50): incomeAttachments(), Periods, compute(), buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv() (+42 more)

### Community 119 - "proposal-view.tsx"
Cohesion: 0.18
Nodes (17): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+9 more)

### Community 120 - "returns/types.ts"
Cohesion: 0.06
Nodes (54): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+46 more)

### Community 121 - "next"
Cohesion: 0.16
Nodes (11): nextConfig, next, postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS (+3 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.19
Nodes (11): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+3 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (41): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+33 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.11
Nodes (34): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+26 more)

### Community 126 - "work/page.tsx"
Cohesion: 0.17
Nodes (16): loadAssets(), Row, lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (56): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+48 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (66): SPREADSHEET_TYPES, geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES (+58 more)

### Community 129 - "opening.ts"
Cohesion: 0.15
Nodes (18): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+10 more)

### Community 130 - "mime.ts"
Cohesion: 0.13
Nodes (29): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, esubmissionMailEnv(), accessToken(), call(), findReplies() (+21 more)

### Community 131 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 132 - "onboarding/page.tsx"
Cohesion: 0.08
Nodes (39): StatusButton(), NotesCard(), ClientNoteForm(), RemoveFileButton(), fmtDate(), Onboarding(), OnboardingPage(), ClientDetail() (+31 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (19): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+11 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 135 - "rates.ts"
Cohesion: 0.16
Nodes (29): annualTax(), computeEmployeeYear(), dateForYear(), employeeContributions(), grossCompensation(), monthlyTable(), monthlyWithholding(), separatedInMonth() (+21 more)

### Community 136 - "Skeleton"
Cohesion: 0.06
Nodes (66): Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS, NewEntry() (+58 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "report-periods.ts"
Cohesion: 0.27
Nodes (15): basePeriod(), HeldNote(), holdsWhat(), periodTitle(), BooksYear, booksYears(), iso(), monthEnd() (+7 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (79): GET(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus(), onVisible() (+71 more)

### Community 141 - "review-form.tsx"
Cohesion: 0.08
Nodes (45): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), Booking, DirectoryParty (+37 more)

### Community 142 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (18): POST(), ACTIVITY, readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS (+10 more)

### Community 143 - "holiday-list.ts"
Cohesion: 0.26
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+3 more)

### Community 144 - "onboarding/forms.tsx"
Cohesion: 0.23
Nodes (15): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+7 more)

### Community 145 - "parts.ts"
Cohesion: 0.12
Nodes (21): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, KIND_LABELS (+13 more)

### Community 146 - "server-only"
Cohesion: 0.13
Nodes (26): server-only, @supabase/supabase-js, GET(), GET(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata (+18 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.10
Nodes (27): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Asset, Cutoff, cutoffOf(), TbRowOut (+19 more)

### Community 148 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 149 - "zod"
Cohesion: 0.25
Nodes (10): zod, amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text() (+2 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.04
Nodes (108): GlobalNotFound(), metadata, metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage() (+100 more)

### Community 151 - "payroll/export/route.ts"
Cohesion: 0.23
Nodes (14): file(), GET(), safe(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when() (+6 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.12
Nodes (29): board, MARCO, none, RHEA, row(), steps, documentCutoff(), DONE_FROM_STATUS (+21 more)

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.15
Nodes (25): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+17 more)

### Community 154 - "ui.tsx"
Cohesion: 0.08
Nodes (34): SearchParams, INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE (+26 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (35): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ReadPayrollButton(), ApprovedTable() (+27 more)

### Community 156 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 157 - "quote.ts"
Cohesion: 0.07
Nodes (55): vitest, corp, items, proposal(), EstimatedProfile, estimateProfile(), gapFor(), GapRow (+47 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (29): BookingLink(), FunnelSwitch(), ReopenForm(), Result(), bookedTime, Lead(), LeadPage(), LeadSource() (+21 more)

### Community 159 - "Badge"
Cohesion: 0.15
Nodes (29): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+21 more)

### Community 160 - "books/reports/2307/page.tsx"
Cohesion: 0.32
Nodes (11): Certificates(), Staff2307Page(), print2307Href(), Portal2307(), Portal2307Page(), portal2307Href(), fmtDate(), Form2307List() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (17): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+9 more)

### Community 163 - "document-upload.tsx"
Cohesion: 0.14
Nodes (21): DocReviewActions(), DocumentUpload(), send(), upload(), Item, typeFromName(), METHODS, ProofUpload() (+13 more)

### Community 164 - "grid.ts"
Cohesion: 0.22
Nodes (12): RFC-4180, exceljs, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS (+4 more)

### Community 165 - "[id]/books/print/page.tsx"
Cohesion: 0.27
Nodes (9): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), staffBooksReader(), bookPeriodLabel() (+1 more)

### Community 166 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "cycle/actions.ts"
Cohesion: 0.30
Nodes (10): MonthComplete(), SentRow, TimelineRow, confirmMonthAction(), CycleState, decideExceptionAction(), refresh(), text() (+2 more)

### Community 169 - "morning.ts"
Cohesion: 0.33
Nodes (10): Gap, Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+2 more)

### Community 170 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 171 - "review-queue.ts"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (35): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+27 more)

### Community 173 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 174 - "people/schema.ts"
Cohesion: 0.39
Nodes (6): clientUserSchema, email, inviteStaffSchema, loadPoints(), name, updateStaffSchema

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 177 - "tests/register.test.ts"
Cohesion: 0.40
Nodes (4): DocumentRow, approved(), as(), root

### Community 178 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 181 - "toCentavos"
Cohesion: 0.08
Nodes (43): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+35 more)

### Community 183 - "ref_node_fs"
Cohesion: 0.03
Nodes (38): pg, outDir, pkgDir, require, { version }, dir, ctx, input (+30 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1471 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `form-2307.ts`, `module-pages.tsx`, `manilaToday`, `package.json`, `clients/[id]/page.tsx`, `lock-bar.tsx`, `cx`, `dependencies`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `filings/actions.ts`, `payroll/forms.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `getIdentity`, `documents/labels.ts`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `marketing/attribution.ts`, `layout.ts`, `year-end/page.tsx`, `react`, `sign-in-form.tsx`, `supabaseServer`, `return-file-actions.ts`, `books/forms.tsx`, `[clientId]/page.tsx`, `cycle/page.tsx`, `@remixicon/react`, `Textarea`, `settings/actions.ts`, `link-button.tsx`, `form-2307.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `workpapers/load.ts`, `intake-picker.tsx`, `form-2316.tsx`, `leads/forms.tsx`, `Card`, `ui.ts`, `pending-review.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `[id]/returns/page.tsx`, `Card`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `returns/types.ts`, `batch/register.ts`, `manilaToday`, `parties/[id]/page.tsx`, `mime.ts`, `onboarding/page.tsx`, `fixed-assets/page.tsx`, `Skeleton`, `report-periods.ts`, `notification-bell.tsx`, `review-form.tsx`, `idle-watcher.tsx`, `onboarding/forms.tsx`, `server-only`, `ledger/types.ts`, `sign-off-actions.tsx`, `zod`, `blocks.tsx`, `payroll/export/route.ts`, `workpapers/page.tsx`, `ui.tsx`, `app/documents/page.tsx`, `deadlines/actions.ts`, `leads/[id]/page.tsx`, `Badge`, `books/reports/2307/page.tsx`, `document-upload.tsx`, `[id]/books/print/page.tsx`, `opengraph-image.tsx`, `cycle/actions.ts`, `app/settings/page.tsx`, `missing-2307/page.tsx`, `toCentavos`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0988235294117647 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `quote.ts` to `form-2307.ts`, `client`, `module-pages.tsx`, `manilaToday`, `package.json`, `clients/[id]/page.tsx`, `lock-bar.tsx`, `statements.ts`, `income.ts`, `scores/page.tsx`, `compare.ts`, `filings/actions.ts`, `index.ts`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `payroll/payroll.test.ts`, `getIdentity`, `payroll/data.ts`, `registrations/forms.tsx`, `money.ts`, `marketing/attribution.ts`, `arap.ts`, `layout.ts`, `year-end/page.tsx`, `Centavos`, `sign-in-form.tsx`, `form-1601c.ts`, `books/forms.tsx`, `cycle/page.tsx`, `@remixicon/react`, `settings/actions.ts`, `portal-billing.test.ts`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `filed-returns.ts`, `ui.ts`, `ledger/books.ts`, `filings/run.ts`, `client-form.tsx`, `pending-review.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `db.test.ts`, `[id]/returns/page.tsx`, `Card`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `returns/types.ts`, `batch/register.ts`, `work/page.tsx`, `parties/[id]/page.tsx`, `read.test.ts`, `opening.ts`, `mime.ts`, `names.ts`, `onboarding/page.tsx`, `gemini.ts`, `fixed-assets/page.tsx`, `rates.ts`, `ticked-allocation.test.ts`, `report-periods.ts`, `ledger.test.ts`, `notification-bell.tsx`, `review-form.tsx`, `idle-watcher.tsx`, `holiday-list.ts`, `parts.ts`, `server-only`, `ledger/types.ts`, `blocks.tsx`, `safeguards.ts`, `ui.tsx`, `app/documents/page.tsx`, `leads/[id]/page.tsx`, `Badge`, `calendar/page.tsx`, `review-queue.ts`, `app/settings/page.tsx`, `people/schema.ts`, `acting-approver.test.ts`, `tests/register.test.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `toCentavos`, `ref_node_fs`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.06554621848739496 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `module-pages.tsx`, `manilaToday`, `package.json`, `clients/[id]/page.tsx`, `lock-bar.tsx`, `cx`, `dependencies`, `statements.ts`, `scores/page.tsx`, `compare.ts`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `getIdentity`, `documents/labels.ts`, `marketing/page.tsx`, `registrations/forms.tsx`, `Notice`, `marketing/attribution.ts`, `year-end/page.tsx`, `sign-in-form.tsx`, `supabaseServer`, `return-file-actions.ts`, `books/forms.tsx`, `[clientId]/page.tsx`, `stat-cards.tsx`, `cycle/page.tsx`, `@remixicon/react`, `Textarea`, `how-we-work/page.tsx`, `settings/actions.ts`, `link-button.tsx`, `form-2307.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/forms.tsx`, `Card`, `ui.ts`, `combobox.tsx`, `client-form.tsx`, `pending-review.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `[id]/returns/page.tsx`, `Card`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `returns/types.ts`, `next`, `batch/register.ts`, `manilaToday`, `parties/[id]/page.tsx`, `onboarding/page.tsx`, `fixed-assets/page.tsx`, `Skeleton`, `notification-bell.tsx`, `review-form.tsx`, `idle-watcher.tsx`, `onboarding/forms.tsx`, `server-only`, `sign-off-actions.tsx`, `blocks.tsx`, `payroll/export/route.ts`, `workpapers/page.tsx`, `ui.tsx`, `app/documents/page.tsx`, `deadlines/actions.ts`, `quote.ts`, `leads/[id]/page.tsx`, `Badge`, `books/reports/2307/page.tsx`, `calendar/page.tsx`, `document-upload.tsx`, `[id]/books/print/page.tsx`, `social-button.tsx`, `cycle/actions.ts`, `app/settings/page.tsx`, `missing-2307/page.tsx`, `toCentavos`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._