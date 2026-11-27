# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1010 files · ~838,684 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6203 nodes · 22122 edges · 186 communities (168 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 193 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `df1e07ca`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LinkButton
- ref_node_path
- migrate.yml
- ui.ts
- public.ts
- package.json
- auth.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- ref_node_fs
- Sign-in & Setup Docs
- holiday-list.ts
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
- Centavos
- read/match.ts
- form-1604e.ts
- documents/[id]/page.tsx
- payroll/payroll.test.ts
- modal.tsx
- button.tsx
- scripts
- supabaseAdmin
- [month]/page.tsx
- filings/[id]/page.tsx
- webhook.ts
- module-pages.tsx
- money.ts
- invoice-pages.tsx
- proposal-view.tsx
- returns/types.ts
- steps.ts
- calendar/page.tsx
- arap.ts
- employees-xlsx.ts
- lock-bar.tsx
- marketing/page.tsx
- form.tsx
- Apple Design
- filings/run.ts
- testing.ts
- fees/[id]/page.tsx
- Badge
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- react
- @remixicon/react
- vitest
- ledger/data.ts
- how-we-work/page.tsx
- lib/books/actions.ts
- cx.ts
- Pro components
- remittances/[id]/page.tsx
- Notice
- portalContext
- portal-billing.test.ts
- proposal-view.test.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- workpapers/page.tsx
- requireStaff
- Recipes
- tools/page.tsx
- BoardUI page patterns
- Pro templates
- book/actions.ts
- ledger/books.ts
- ledger/types.ts
- cx
- compute.ts
- boardui
- leads/actions.ts
- proof-upload.tsx
- fees/types.ts
- leads/forms.tsx
- transactions-actions.ts
- client
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- collections/forms.tsx
- 2316/page.tsx
- apply-migrations.sh
- quote/page.tsx
- quote.ts
- tests/register.test.ts
- leads/[id]/page.tsx
- app/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- cycle/actions.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- month.ts
- tax-codes.ts
- ocr/run.ts
- fixed-assets/page.tsx
- idle-watcher.tsx
- clients/actions.ts
- ticked-allocation.test.ts
- deadlines/page.tsx
- review-form.tsx
- seed.ts
- payroll/forms.tsx
- supabaseServer
- addDays
- auth-templates.ts
- payroll-read.tsx
- server-only
- opening.ts
- template.ts
- notification-bell.tsx
- blocks.tsx
- step-files.tsx
- ledger.test.ts
- books/periods.ts
- firm/parallel-run/page.tsx
- move-bar.tsx
- books-2307.test.ts
- formatAmount
- cwt-2307-tracker.test.ts
- onboarding/page.tsx
- workpapers.test.ts
- Rework: one flow from lead to year-end
- calendar/staff.ts
- grid.ts
- app/documents/page.tsx
- Card
- opengraph-image.tsx
- app/requests/[id]/page.tsx
- requireOwner
- Textarea
- app/settings/page.tsx
- cycle/page.tsx
- acting-approver.test.ts
- return-files.tsx
- filed-returns.ts
- Building UIs with BoardUI
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- site-document.tsx
- booksContext
- parallel-run.test.ts
- tests/books.test.ts
- names.ts
- db.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 395 edges
2. `cx` - 313 edges
3. `react` - 282 edges
4. `Notice()` - 265 edges
5. `Skeleton()` - 258 edges
6. `Button()` - 246 edges
7. `next` - 244 edges
8. `vitest` - 194 edges
9. `Card()` - 186 edges
10. `Badge()` - 186 edges

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

## Communities (186 total, 18 thin omitted)

### Community 0 - "LinkButton"
Cohesion: 0.10
Nodes (44): Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page() (+36 more)

### Community 1 - "ref_node_path"
Cohesion: 0.03
Nodes (37): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+29 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.07
Nodes (60): BooksContext, booksViewFor(), fmtMonth(), blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage() (+52 more)

### Community 4 - "public.ts"
Cohesion: 0.12
Nodes (24): QuerySource, InstantQuote, instantView(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+16 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "auth.ts"
Cohesion: 0.08
Nodes (42): RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, Row, RemoveBusinessButton(), AuditRow (+34 more)

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

### Community 11 - "ref_node_fs"
Cohesion: 0.04
Nodes (23): outDir, pkgDir, require, { version }, ctx, input, api, ctx (+15 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "holiday-list.ts"
Cohesion: 0.16
Nodes (16): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+8 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+11 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (42): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES (+34 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (85): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), annualAttachments(), balanceSheet(), compute1701() (+77 more)

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
Cohesion: 0.09
Nodes (43): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary() (+35 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "Centavos"
Cohesion: 0.04
Nodes (90): KIND, REASON, Section(), shortDate(), STATUS_TONE, BookLine, ColumnarRow, JournalRow (+82 more)

### Community 43 - "read/match.ts"
Cohesion: 0.26
Nodes (11): matchesOf(), digits(), editDistance(), EmployeeMatch, keyNo(), matchEmployee(), MatchStatus, nameScore() (+3 more)

### Community 44 - "form-1604e.ts"
Cohesion: 0.07
Nodes (59): branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDashed(), tinDigits(), tinHasBranch() (+51 more)

### Community 45 - "documents/[id]/page.tsx"
Cohesion: 0.06
Nodes (70): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf() (+62 more)

### Community 46 - "payroll/payroll.test.ts"
Cohesion: 0.12
Nodes (31): exceljs, PayrollItem, sortItems(), employee(), entry(), fixtureContext(), ITEMS, P() (+23 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (45): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), globalSearch(), SearchHit (+37 more)

### Community 48 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.11
Nodes (33): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata (+25 more)

### Community 51 - "[month]/page.tsx"
Cohesion: 0.11
Nodes (33): file(), GET(), safe(), MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when() (+25 more)

### Community 52 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (40): ClientReturnsPage(), FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText (+32 more)

### Community 53 - "webhook.ts"
Cohesion: 0.08
Nodes (49): maxDuration, POST(), TelegramEnv, ClaimedNotification, runOcr(), TelegramApi, telegramApi(), ALLOWED (+41 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.12
Nodes (23): BankAccountsRoute(), BooksList(), Column, ListRow, RowLink(), CustomersRoute(), EmployeesRoute(), JournalRoute() (+15 more)

### Community 55 - "money.ts"
Cohesion: 0.08
Nodes (36): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+28 more)

### Community 56 - "invoice-pages.tsx"
Cohesion: 0.09
Nodes (55): fmtDate(), SearchParams, BooksFrame(), INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind (+47 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.18
Nodes (17): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+9 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (66): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+58 more)

### Community 59 - "steps.ts"
Cohesion: 0.04
Nodes (98): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+90 more)

### Community 60 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (17): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+9 more)

### Community 61 - "arap.ts"
Cohesion: 0.15
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+10 more)

### Community 62 - "employees-xlsx.ts"
Cohesion: 0.12
Nodes (19): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+11 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.15
Nodes (23): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+15 more)

### Community 64 - "marketing/page.tsx"
Cohesion: 0.11
Nodes (24): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+16 more)

### Community 65 - "form.tsx"
Cohesion: 0.13
Nodes (36): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+28 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.10
Nodes (44): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+36 more)

### Community 68 - "testing.ts"
Cohesion: 0.11
Nodes (28): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+20 more)

### Community 69 - "fees/[id]/page.tsx"
Cohesion: 0.11
Nodes (41): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+33 more)

### Community 70 - "Badge"
Cohesion: 0.09
Nodes (61): ClientList(), ClientsPage(), SORTS, Contacts(), ContactsPage(), SORTS, when, CyclePage() (+53 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (41): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+33 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.08
Nodes (57): EmployeeDetail(), EmployeePage(), GridRow, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory (+49 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.17
Nodes (24): invoiceLabel(), sawtAnnualAttachments(), SawtAnnualForm, sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, crlf() (+16 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "react"
Cohesion: 0.07
Nodes (38): react, Accounts(), AccountsPage(), GROUPS, JournalEntryRoute(), NewEntry(), NewEntryPage(), ReportsIndex() (+30 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.06
Nodes (55): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links() (+47 more)

### Community 79 - "vitest"
Cohesion: 0.03
Nodes (27): pg, vitest, dir, root, root, root, root, HASH (+19 more)

### Community 80 - "ledger/data.ts"
Cohesion: 0.13
Nodes (26): dayBefore(), GET(), safe(), Released, fromWorkbookData(), buildBookWorkbook(), accountFromRow(), Amendment (+18 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (24): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+16 more)

### Community 83 - "cx.ts"
Cohesion: 0.04
Nodes (63): react-dom@19.3.0, react-dom, UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles (+55 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "remittances/[id]/page.tsx"
Cohesion: 0.09
Nodes (61): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+53 more)

### Community 86 - "Notice"
Cohesion: 0.09
Nodes (79): BatchUpload(), PreviewTable(), AccountForm(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), ReleaseReportForm(), SetupForm() (+71 more)

### Community 87 - "portalContext"
Cohesion: 0.10
Nodes (54): ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, PortalClient, portalContext, Content(), PortalNotificationsPage(), Portal2316(), Portal2316Page() (+46 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "proposal-view.test.ts"
Cohesion: 0.12
Nodes (16): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, jobField, ProposalJob (+8 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (24): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+16 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.28
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Item(), mmddyyyy(), PartyFields() (+5 more)

### Community 93 - "workpapers/page.tsx"
Cohesion: 0.05
Nodes (82): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+74 more)

### Community 94 - "requireStaff"
Cohesion: 0.09
Nodes (49): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+41 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "tools/page.tsx"
Cohesion: 0.15
Nodes (25): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+17 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "book/actions.ts"
Cohesion: 0.20
Nodes (17): cancelMeetingAction(), cancelMyMeetingAction(), CancelState, BookingState, calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason() (+9 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.08
Nodes (42): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+34 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.12
Nodes (22): Access, STATUS, Cutoff, cutoffOf(), TbRowOut, ChecklistInput, ChecklistItem, ItemStatus (+14 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (96): react-aria-components, switchBusinessAction(), BusinessSwitcher(), DotBadge(), NotificationBell(), ChipColor, Counter(), Breadcrumb() (+88 more)

### Community 103 - "compute.ts"
Cohesion: 0.14
Nodes (32): annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation(), monthlyTable() (+24 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "leads/actions.ts"
Cohesion: 0.23
Nodes (19): assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), markLostAction(), recordCallAction(), refresh() (+11 more)

### Community 106 - "proof-upload.tsx"
Cohesion: 0.39
Nodes (7): METHODS, ProofUpload(), send(), ProofState, startProofUpload(), submitProof(), ProofMethod

### Community 107 - "fees/types.ts"
Cohesion: 0.17
Nodes (17): EngagementRow, TaxpayerType, ExistingClient, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND (+9 more)

### Community 108 - "leads/forms.tsx"
Cohesion: 0.13
Nodes (25): LeadState, sendProposalAction(), CopyLink(), JobRow(), Person, pesoFmt, ProposalSent, ProposalSetup (+17 more)

### Community 109 - "transactions-actions.ts"
Cohesion: 0.25
Nodes (16): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+8 more)

### Community 110 - "client"
Cohesion: 0.06
Nodes (21): as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll() (+13 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.10
Nodes (35): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+27 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.07
Nodes (66): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+58 more)

### Community 116 - "2316/page.tsx"
Cohesion: 0.36
Nodes (8): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Form2316Set(), Form2316Sheet(), Form2316Data, load2316()

### Community 118 - "quote/page.tsx"
Cohesion: 0.24
Nodes (14): loadSchedules(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage() (+6 more)

### Community 119 - "quote.ts"
Cohesion: 0.11
Nodes (37): proposal(), EstimatedProfile, estimateProfile(), gapFor(), GapRow, has(), buildProposalQuote(), buildQuote() (+29 more)

### Community 120 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (44): NotesCard(), ClientNoteForm(), BookingLink(), DiscoveryCallForm(), FunnelSwitch(), ReopenForm(), Result(), bookedTime (+36 more)

### Community 122 - "app/page.tsx"
Cohesion: 0.11
Nodes (33): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary(), Queue() (+25 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.09
Nodes (46): Detail(), StatementPage(), MonthRemittances(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref() (+38 more)

### Community 126 - "cycle/actions.ts"
Cohesion: 0.30
Nodes (10): MonthComplete(), SentRow, StandingRow, TimelineRow, confirmMonthAction(), CycleState, decideExceptionAction(), refresh() (+2 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.09
Nodes (39): zod, fmtDate(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress(), listNameCols() (+31 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (79): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), SPREADSHEET_TYPES (+71 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 132 - "tax-codes.ts"
Cohesion: 0.15
Nodes (18): SettingsPage(), SettingsRoute(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES (+10 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (41): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+33 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (28): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+20 more)

### Community 135 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 136 - "clients/actions.ts"
Cohesion: 0.06
Nodes (56): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+48 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "deadlines/page.tsx"
Cohesion: 0.13
Nodes (31): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+23 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.05
Nodes (67): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+59 more)

### Community 140 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (57): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+49 more)

### Community 142 - "supabaseServer"
Cohesion: 0.05
Nodes (55): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), GET() (+47 more)

### Community 143 - "addDays"
Cohesion: 0.07
Nodes (52): SafeguardsNotice(), Gap, addDays(), line(), longDay(), NEEDS, ownerEmail(), shortDay() (+44 more)

### Community 144 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 145 - "payroll-read.tsx"
Cohesion: 0.29
Nodes (9): KIND_LABEL, MATCH_BADGE, PayrollReadReview(), peso(), ReadItem, ReadPayrollButton(), addTotals(), checkTotals() (+1 more)

### Community 146 - "server-only"
Cohesion: 0.07
Nodes (54): server-only, @supabase/supabase-js, GET(), GET(), GET(), digestMessage(), DigestRow, longDay() (+46 more)

### Community 147 - "opening.ts"
Cohesion: 0.15
Nodes (19): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+11 more)

### Community 148 - "template.ts"
Cohesion: 0.10
Nodes (22): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+14 more)

### Community 149 - "notification-bell.tsx"
Cohesion: 0.04
Nodes (96): GET(), SheetPreview(), Content(), PortalNotificationSettingsPage(), emit(), listeners, markReadLocally(), notifyNotificationsChanged() (+88 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (97): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+89 more)

### Community 151 - "step-files.tsx"
Cohesion: 0.39
Nodes (8): addStepFile(), removeStepFile(), startStepFileUpload(), FileChip(), StepFile, StepFileList(), StepFileUpload(), send()

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "books/periods.ts"
Cohesion: 0.36
Nodes (7): BooksMonthRow, BOOKS_MONTH_STATUS_LABELS, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 154 - "firm/parallel-run/page.tsx"
Cohesion: 0.43
Nodes (6): CELL, FirmParallelRunPage(), monthShort(), Summary(), MonthStatus, loadFirmParallelRun()

### Community 155 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 157 - "formatAmount"
Cohesion: 0.12
Nodes (25): Batch(), BatchPage(), one(), toCentavos(), PortalReport(), Report(), when(), Accreditation() (+17 more)

### Community 158 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (33): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+25 more)

### Community 160 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.10
Nodes (40): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+32 more)

### Community 163 - "grid.ts"
Cohesion: 0.24
Nodes (11): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+3 more)

### Community 164 - "app/documents/page.tsx"
Cohesion: 0.09
Nodes (37): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending() (+29 more)

### Community 166 - "Card"
Cohesion: 0.11
Nodes (42): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+34 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 169 - "app/requests/[id]/page.tsx"
Cohesion: 0.11
Nodes (46): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+38 more)

### Community 170 - "requireOwner"
Cohesion: 0.06
Nodes (64): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), renameContactAction(), updateContactAccessAction() (+56 more)

### Community 171 - "Textarea"
Cohesion: 0.15
Nodes (18): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+10 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.18
Nodes (22): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+14 more)

### Community 173 - "cycle/page.tsx"
Cohesion: 0.14
Nodes (26): Cycle(), CycleWithClient, DocRow, shift(), CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+18 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 178 - "return-files.tsx"
Cohesion: 0.57
Nodes (6): ActionButton(), EsubmissionControls(), ReturnFileUpload(), send(), addReturnFile(), startReturnFileUpload()

### Community 179 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 182 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 186 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 188 - "booksContext"
Cohesion: 0.38
Nodes (9): booksContext(), one(), Cwt2307TrackerPage(), Tracker(), ParallelRun(), ParallelRunPage(), quarterMonths(), monthName() (+1 more)

### Community 190 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 200 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 203 - "db.test.ts"
Cohesion: 0.13
Nodes (3): root, Part, root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1640 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `LinkButton`, `ref_node_path`, `ui.ts`, `public.ts`, `package.json`, `ref_node_fs`, `holiday-list.ts`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `Centavos`, `form-1604e.ts`, `payroll/payroll.test.ts`, `supabaseAdmin`, `[month]/page.tsx`, `filings/[id]/page.tsx`, `webhook.ts`, `money.ts`, `invoice-pages.tsx`, `returns/types.ts`, `steps.ts`, `calendar/page.tsx`, `arap.ts`, `lock-bar.tsx`, `form.tsx`, `filings/run.ts`, `testing.ts`, `fees/[id]/page.tsx`, `Badge`, `payroll/data.ts`, `@remixicon/react`, `remittances/[id]/page.tsx`, `portalContext`, `portal-billing.test.ts`, `proposal-view.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `workpapers/page.tsx`, `requireStaff`, `book/actions.ts`, `ledger/books.ts`, `ledger/types.ts`, `compute.ts`, `fees/types.ts`, `client`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `collections/forms.tsx`, `quote.ts`, `tests/register.test.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `month.ts`, `tax-codes.ts`, `ocr/run.ts`, `fixed-assets/page.tsx`, `idle-watcher.tsx`, `clients/actions.ts`, `ticked-allocation.test.ts`, `deadlines/page.tsx`, `review-form.tsx`, `supabaseServer`, `addDays`, `server-only`, `opening.ts`, `template.ts`, `notification-bell.tsx`, `blocks.tsx`, `ledger.test.ts`, `books/periods.ts`, `move-bar.tsx`, `books-2307.test.ts`, `cwt-2307-tracker.test.ts`, `onboarding/page.tsx`, `workpapers.test.ts`, `calendar/staff.ts`, `app/documents/page.tsx`, `Card`, `requireOwner`, `app/settings/page.tsx`, `cycle/page.tsx`, `acting-approver.test.ts`, `filed-returns.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `parallel-run.test.ts`, `tests/books.test.ts`, `names.ts`, `db.test.ts`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LinkButton` be split into smaller, more focused modules?**
  _Cohesion score 0.10150375939849623 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `LinkButton`, `ui.ts`, `package.json`, `auth.ts`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `Centavos`, `documents/[id]/page.tsx`, `modal.tsx`, `supabaseAdmin`, `[month]/page.tsx`, `filings/[id]/page.tsx`, `webhook.ts`, `module-pages.tsx`, `invoice-pages.tsx`, `proposal-view.tsx`, `returns/types.ts`, `steps.ts`, `calendar/page.tsx`, `lock-bar.tsx`, `marketing/page.tsx`, `form.tsx`, `fees/[id]/page.tsx`, `Badge`, `books/forms.tsx`, `payroll/data.ts`, `react`, `@remixicon/react`, `ledger/data.ts`, `lib/books/actions.ts`, `remittances/[id]/page.tsx`, `portalContext`, `intake-picker.tsx`, `form-2316.tsx`, `workpapers/page.tsx`, `requireStaff`, `tools/page.tsx`, `book/actions.ts`, `ledger/books.ts`, `ledger/types.ts`, `cx`, `leads/actions.ts`, `proof-upload.tsx`, `transactions-actions.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `collections/forms.tsx`, `2316/page.tsx`, `quote/page.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `batch/register.ts`, `manilaToday`, `cycle/actions.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `fixed-assets/page.tsx`, `idle-watcher.tsx`, `clients/actions.ts`, `deadlines/page.tsx`, `review-form.tsx`, `payroll/forms.tsx`, `server-only`, `notification-bell.tsx`, `blocks.tsx`, `step-files.tsx`, `firm/parallel-run/page.tsx`, `move-bar.tsx`, `formatAmount`, `onboarding/page.tsx`, `calendar/staff.ts`, `app/documents/page.tsx`, `Card`, `opengraph-image.tsx`, `app/requests/[id]/page.tsx`, `requireOwner`, `Textarea`, `app/settings/page.tsx`, `cycle/page.tsx`, `return-files.tsx`, `site-document.tsx`, `booksContext`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `ref_node_path` be split into smaller, more focused modules?**
  _Cohesion score 0.031294792164357384 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `LinkButton`, `ui.ts`, `package.json`, `auth.ts`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `Centavos`, `documents/[id]/page.tsx`, `modal.tsx`, `button.tsx`, `supabaseAdmin`, `[month]/page.tsx`, `filings/[id]/page.tsx`, `module-pages.tsx`, `invoice-pages.tsx`, `proposal-view.tsx`, `returns/types.ts`, `steps.ts`, `calendar/page.tsx`, `lock-bar.tsx`, `marketing/page.tsx`, `form.tsx`, `fees/[id]/page.tsx`, `Badge`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `@remixicon/react`, `how-we-work/page.tsx`, `cx.ts`, `remittances/[id]/page.tsx`, `Notice`, `portalContext`, `proposal-view.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `workpapers/page.tsx`, `requireStaff`, `tools/page.tsx`, `ledger/books.ts`, `cx`, `proof-upload.tsx`, `leads/forms.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `collections/forms.tsx`, `2316/page.tsx`, `quote/page.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `batch/register.ts`, `manilaToday`, `cycle/actions.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `tax-codes.ts`, `fixed-assets/page.tsx`, `idle-watcher.tsx`, `clients/actions.ts`, `deadlines/page.tsx`, `review-form.tsx`, `payroll/forms.tsx`, `supabaseServer`, `payroll-read.tsx`, `notification-bell.tsx`, `blocks.tsx`, `step-files.tsx`, `firm/parallel-run/page.tsx`, `move-bar.tsx`, `formatAmount`, `onboarding/page.tsx`, `calendar/staff.ts`, `app/documents/page.tsx`, `Card`, `app/requests/[id]/page.tsx`, `requireOwner`, `Textarea`, `app/settings/page.tsx`, `cycle/page.tsx`, `return-files.tsx`, `site-document.tsx`, `booksContext`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._