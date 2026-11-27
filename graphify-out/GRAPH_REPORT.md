# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1017 files · ~850,154 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6237 nodes · 22247 edges · 231 communities (195 shown, 36 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `790fa676`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- params.ts
- package.json
- access.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- app/documents/page.tsx
- Sign-in & Setup Docs
- Badge
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
- clients/[id]/page.tsx
- returns/types.ts
- invoice-pages.tsx
- register-xlsx.ts
- modal.tsx
- react
- scripts
- slots.ts
- button.tsx
- remittances/[id]/page.tsx
- webhook.ts
- payroll/data.ts
- Card
- module-pages.tsx
- proposal-view.tsx
- returns/load.ts
- registration-fee-jobs.test.ts
- calendar/page.tsx
- arap.ts
- lock-bar.tsx
- year-end/page.tsx
- review-forms.tsx
- form.tsx
- Apple Design
- generate.ts
- testing.ts
- quote/page.tsx
- money.ts
- books/forms.tsx
- fixed-assets/page.tsx
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- worksheet/page.tsx
- collections/forms.tsx
- pg
- parties/[id]/page.tsx
- how-we-work/page.tsx
- idle-watcher.tsx
- cx.ts
- Pro components
- booksContext
- Notice
- portalContext
- portal-billing.test.ts
- notifications/format.ts
- document-scanner.tsx
- [slug]/page.tsx
- LinkButton
- workpapers/load.ts
- work/page.tsx
- Recipes
- rows.ts
- BoardUI theming reference
- Pro templates
- filings/actions.ts
- Centavos
- ledger/data.ts
- cx
- marketing/page.tsx
- boardui
- layout.ts
- lib/books/actions.ts
- home.ts
- leads/actions.ts
- [month]/page.tsx
- december-rehearsal.test.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- settings/actions.ts
- [clientId]/page.tsx
- steps.ts
- apply-migrations.sh
- public.ts
- fees/types.ts
- book/actions.ts
- leads/[id]/page.tsx
- review/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- showDate
- vitest
- holiday-list.ts
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- app/settings/page.tsx
- Skeleton
- ocr/run.ts
- fixed-assets/forms.tsx
- blocks.tsx
- clients/actions.ts
- ticked-allocation.test.ts
- opening.ts
- work/load.ts
- engine.ts
- payroll/forms.tsx
- requireOwner
- deadlines/page.tsx
- quote.ts
- payroll/types.ts
- email/brand.ts
- @remixicon/react
- template.ts
- ledger/types.ts
- proof-upload.tsx
- transactions-actions.ts
- ledger.test.ts
- contact-access.test.ts
- supabaseServer
- move-bar.tsx
- portal/documents/page.tsx
- parallel-run.tsx
- notifications-view.tsx
- onboarding/page.tsx
- documents/actions.ts
- Rework: one flow from lead to year-end
- calendar/staff.ts
- registrations/[id]/page.tsx
- lock.ts
- notification-bell.tsx
- register/page.tsx
- opengraph-image.tsx
- business-switcher.tsx
- requests/actions.ts
- server-only
- portal-statements-approval.test.ts
- queries.ts
- deadlines/dates.ts
- notification-settings-view.tsx
- acting-approver.test.ts
- ocr/dates.ts
- returns-sign-off.test.ts
- generate-qap-fixture.mjs
- lead-attribution.test.ts
- notification-actions.tsx
- defer-documents.test.ts
- filed-returns.ts
- bell-store.ts
- rates.ts
- tests/proposal-email.test.ts
- registration/page.tsx
- funnel.test.ts
- notifications.test.ts
- registrations/actions.ts
- ref_node_fs
- books-migration.test.ts
- eslint.config.mjs
- staff/page.tsx
- tests/books.test.ts
- people/schema.ts
- books-ready.ts
- registrations/forms.tsx
- formatAmount
- filings/[id]/page.tsx
- review-form.tsx
- @supabase/ssr
- party-pages.tsx
- db.test.ts
- templates/README.md
- BoardUI page patterns
- StepStatus
- documents/[id]/page.tsx
- seed.ts
- names.ts
- copy-opencv.mjs
- memo.ts
- books-2307.test.ts
- contribution-remittances.test.ts
- late-surcharges.test.ts
- fees.test.ts
- cwt-2307-tracker.test.ts
- parallel-run.test.ts
- fixed-assets.test.ts
- ledger-lock.test.ts
- @techstark/opencv-js
- lock-by-return-type.test.ts
- month-complete.test.ts
- tests/register.test.ts
- returns-books.test.ts
- adjustments.test.ts
- books-lock.test.ts
- contribution-payables.test.ts
- payroll-books.test.ts
- year-end.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 399 edges
2. `cx` - 313 edges
3. `react` - 283 edges
4. `Notice()` - 269 edges
5. `Skeleton()` - 258 edges
6. `Button()` - 250 edges
7. `next` - 245 edges
8. `vitest` - 195 edges
9. `Card()` - 187 edges
10. `Badge()` - 187 edges

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

## Communities (231 total, 36 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (36): Portal2307(), Portal2307Page(), one(), portal2307(), SearchParams, fmtDate(), Form2307List(), Form2307Pickers() (+28 more)

### Community 1 - "index.ts"
Cohesion: 0.04
Nodes (29): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+21 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.07
Nodes (57): fmtMonth(), BooksFrame(), WithdrawReportButton(), ReportsIndex(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard() (+49 more)

### Community 4 - "params.ts"
Cohesion: 0.20
Nodes (14): TAXPAYER_TYPES, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery() (+6 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "access.ts"
Cohesion: 0.18
Nodes (20): AccessOptions(), AccessRowForm(), AddBusinessForm(), Business, NewContactForm(), RemoveBusinessButton(), Result(), AuditRow (+12 more)

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

### Community 11 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (40): Doc, ExceptionRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), confirmedMonths() (+32 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "Badge"
Cohesion: 0.09
Nodes (53): EditClient(), EditClientPage(), ClientList(), ClientsPage(), SORTS, Contacts(), ContactsPage(), SORTS (+45 more)

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
Nodes (43): FinancialStatementsView(), StatementTable(), CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), statementsFrom(), FS_LINES, FsLine (+35 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (68): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+60 more)

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
Nodes (51): Cwt2307TrackerPage(), Tracker(), amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtFollowUpForm() (+43 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (52): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+44 more)

### Community 43 - "clients/[id]/page.tsx"
Cohesion: 0.09
Nodes (37): FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), CatchUpForm(), ClientUserForm(), EngagementForm() (+29 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.05
Nodes (72): SaleSplit, client, row(), VatData, agentLines(), agentProblems(), amountText(), emptyResult() (+64 more)

### Community 45 - "invoice-pages.tsx"
Cohesion: 0.12
Nodes (23): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage() (+15 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.11
Nodes (26): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+18 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (45): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), SearchHit, SearchKind (+37 more)

### Community 48 - "react"
Cohesion: 0.09
Nodes (33): react, postPayrollAction(), PostState, PostPayrollButton(), CatchUpConfirmForms(), CatchUpRecorded, NewParty(), NewPartyPage() (+25 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.15
Nodes (24): Booking(), BookingPage(), metadata, when, BookingState, slotsFor(), addDays(), byDay() (+16 more)

### Community 51 - "button.tsx"
Cohesion: 0.06
Nodes (38): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+30 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.09
Nodes (62): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+54 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (43): CLIENT_DOC_TYPES, TelegramApi, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery() (+35 more)

### Community 54 - "payroll/data.ts"
Cohesion: 0.14
Nodes (25): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), file(), GET(), safe(), Release2316Form() (+17 more)

### Community 55 - "Card"
Cohesion: 0.09
Nodes (43): DocumentsCard(), when(), amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable() (+35 more)

### Community 56 - "module-pages.tsx"
Cohesion: 0.09
Nodes (35): BankAccountsRoute(), BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), JournalRoute(), BankAccounts() (+27 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.12
Nodes (21): jobName(), lineName(), longDate(), money(), php, ProposalData, ProposalView(), Rows() (+13 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.11
Nodes (36): lookupParties(), NonDeductibleRow, withNonDeductible(), dayBefore(), FilingRow, listInvoices(), loadEwtRemittances(), loadEwtYear() (+28 more)

### Community 59 - "registration-fee-jobs.test.ts"
Cohesion: 0.12
Nodes (17): fieldErrors(), openClientCaseAction(), openRegistrationAction(), approval(), branchStepsFor(), certificateStepsFor(), closureStepsFor(), employerStepsFor() (+9 more)

### Community 60 - "calendar/page.tsx"
Cohesion: 0.27
Nodes (16): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant(), appBookedEvents(), addDays() (+8 more)

### Community 61 - "arap.ts"
Cohesion: 0.17
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), CashAccount, checkUpdate(), OpenItem, accounts (+10 more)

### Community 62 - "lock-bar.tsx"
Cohesion: 0.16
Nodes (19): BooksLockBar(), ICON, LockBarFor(), MonthLock(), LockContext, BooksMonthRow, BooksMonthStatus, day() (+11 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 64 - "review-forms.tsx"
Cohesion: 0.21
Nodes (14): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+6 more)

### Community 65 - "form.tsx"
Cohesion: 0.13
Nodes (37): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+29 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.13
Nodes (25): Rule, PlannedObligation, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance, Frequency (+17 more)

### Community 68 - "testing.ts"
Cohesion: 0.12
Nodes (27): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+19 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.11
Nodes (39): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+31 more)

### Community 70 - "money.ts"
Cohesion: 0.07
Nodes (57): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+49 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.13
Nodes (44): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+36 more)

### Community 72 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (18): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), Row, accumulated() (+10 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.12
Nodes (45): tin9(), tinDashed(), annualAttachments(), incomeAttachments(), Periods, periods(), buildSawt(), incomePayment() (+37 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "worksheet/page.tsx"
Cohesion: 0.17
Nodes (19): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, Lines(), lineStyle, Problems(), sameFigures() (+11 more)

### Community 78 - "collections/forms.tsx"
Cohesion: 0.22
Nodes (20): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+12 more)

### Community 79 - "pg"
Cohesion: 0.08
Nodes (7): pg, root, Part, root, root, root, root

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (52): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage() (+44 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "idle-watcher.tsx"
Cohesion: 0.21
Nodes (18): ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS (+10 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (65): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+57 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "booksContext"
Cohesion: 0.25
Nodes (16): booksContext(), BooksContext, booksViewFor(), one(), Certificates(), Staff2307Page(), Print(), Print2307Page() (+8 more)

### Community 86 - "Notice"
Cohesion: 0.07
Nodes (90): setupMissingChartsAction(), ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker() (+82 more)

### Community 87 - "portalContext"
Cohesion: 0.09
Nodes (63): PortalClient, portalContext, Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+55 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notifications/format.ts"
Cohesion: 0.19
Nodes (15): badgeText(), bellLabel(), clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay (+7 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "[slug]/page.tsx"
Cohesion: 0.10
Nodes (32): generateMetadata(), PICKER_SERVICE, Service(), ServicePage(), SelectItem(), AttributionKeeper(), noop(), readAttribution() (+24 more)

### Community 92 - "LinkButton"
Cohesion: 0.12
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 93 - "workpapers/load.ts"
Cohesion: 0.19
Nodes (18): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+10 more)

### Community 94 - "work/page.tsx"
Cohesion: 0.12
Nodes (35): RequestDetail(), RequestPage(), Row, TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow (+27 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "rows.ts"
Cohesion: 0.11
Nodes (38): buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+30 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "filings/actions.ts"
Cohesion: 0.16
Nodes (18): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+10 more)

### Community 100 - "Centavos"
Cohesion: 0.05
Nodes (63): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), AgingRow, CheckedUpdate (+55 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.11
Nodes (36): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+28 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (96): react-aria-components, ChipColor, Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Checkbox(), CheckboxProps (+88 more)

### Community 103 - "marketing/page.tsx"
Cohesion: 0.11
Nodes (24): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), CreateLinkForm(), N() (+16 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "layout.ts"
Cohesion: 0.16
Nodes (20): afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape(), Spec, SPECS, bodyBlocks() (+12 more)

### Community 106 - "lib/books/actions.ts"
Cohesion: 0.14
Nodes (24): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+16 more)

### Community 107 - "home.ts"
Cohesion: 0.16
Nodes (17): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksSummaryRaw, c(), EXPENSE (+9 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.08
Nodes (53): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+45 more)

### Community 109 - "[month]/page.tsx"
Cohesion: 0.12
Nodes (28): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+20 more)

### Community 110 - "december-rehearsal.test.ts"
Cohesion: 0.08
Nodes (18): as(), client(), root, approveIntoBooks(), as(), lockMonth(), payroll(), root (+10 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.07
Nodes (51): Cycle(), CycleWithClient, DocRow, MonthComplete(), SentRow, StandingRow, TimelineRow, BooksCards() (+43 more)

### Community 114 - "settings/actions.ts"
Cohesion: 0.20
Nodes (16): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+8 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (37): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), LateSurchargeActions(), ReasonAction() (+29 more)

### Community 116 - "steps.ts"
Cohesion: 0.09
Nodes (23): Agency, amendmentWords, BillingFacts, BIR_CHANGES, BranchOptions, CaseStep, certificateApplication, ClosureOptions (+15 more)

### Community 118 - "public.ts"
Cohesion: 0.14
Nodes (23): instantView(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num(), optionalAmount (+15 more)

### Community 119 - "fees/types.ts"
Cohesion: 0.11
Nodes (30): ClientValues, EngagementRow, FeeGapPage(), Gap(), TAX_TYPES, TaxpayerType, TaxType, CoverageClient (+22 more)

### Community 120 - "book/actions.ts"
Cohesion: 0.22
Nodes (13): cancelMeetingAction(), cancelMyMeetingAction(), CancelState, calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail() (+5 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (47): NotesCard(), ProposalSent, bookedTime, Lead(), LeadPage(), LeadSource(), LeadTouch, Person (+39 more)

### Community 122 - "review/page.tsx"
Cohesion: 0.09
Nodes (34): loadLockContext(), BooksMonthsPage(), Months(), one(), FilingsTabs(), CatchUpRow, CatchUpSection(), Queue() (+26 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (43): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+35 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "showDate"
Cohesion: 0.10
Nodes (39): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), accessFor() (+31 more)

### Community 126 - "vitest"
Cohesion: 0.09
Nodes (8): vitest, root, root, HASH, LEAD, root, root, root

### Community 127 - "holiday-list.ts"
Cohesion: 0.26
Nodes (10): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), STANDARD_HOLIDAYS, StandardHoliday (+2 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (75): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), geminiJson() (+67 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.09
Nodes (29): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+21 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (38): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+30 more)

### Community 132 - "Skeleton"
Cohesion: 0.10
Nodes (41): fmtDate(), InvoiceView(), JournalEntryRoute(), JournalView(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage() (+33 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (45): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+37 more)

### Community 134 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm()

### Community 135 - "blocks.tsx"
Cohesion: 0.05
Nodes (100): GlobalNotFound(), metadata, metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage() (+92 more)

### Community 136 - "clients/actions.ts"
Cohesion: 0.11
Nodes (23): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), removeAssignmentAction(), setCatchUpAction(), setClientStatusAction() (+15 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "opening.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 139 - "work/load.ts"
Cohesion: 0.18
Nodes (16): loadAssets(), standingLine(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 140 - "engine.ts"
Cohesion: 0.23
Nodes (16): compareIso(), fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), nextWorkingDay(), Obligation, periodApplies() (+8 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (53): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+45 more)

### Community 142 - "requireOwner"
Cohesion: 0.31
Nodes (16): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+8 more)

### Community 143 - "deadlines/page.tsx"
Cohesion: 0.07
Nodes (62): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+54 more)

### Community 144 - "quote.ts"
Cohesion: 0.12
Nodes (29): PriceRow, buildQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem, documentBand(), EWT_NOTE (+21 more)

### Community 145 - "payroll/types.ts"
Cohesion: 0.11
Nodes (23): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+15 more)

### Community 146 - "email/brand.ts"
Cohesion: 0.09
Nodes (40): GET(), GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+32 more)

### Community 147 - "@remixicon/react"
Cohesion: 0.06
Nodes (52): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+44 more)

### Community 148 - "template.ts"
Cohesion: 0.09
Nodes (24): PRICE_SECTIONS, priceSection(), PriceSectionKey, AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED (+16 more)

### Community 149 - "ledger/types.ts"
Cohesion: 0.12
Nodes (23): Access, STATUS, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, ChecklistInput, ChecklistItem (+15 more)

### Community 150 - "proof-upload.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 151 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 154 - "supabaseServer"
Cohesion: 0.06
Nodes (71): nextConfig, next, setIncomeTaxMethodAction(), addClientNoteAction(), FilingTable(), amount, CatchUpState, confirmCatchUpAction() (+63 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.26
Nodes (14): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+6 more)

### Community 156 - "portal/documents/page.tsx"
Cohesion: 0.11
Nodes (30): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+22 more)

### Community 157 - "parallel-run.tsx"
Cohesion: 0.15
Nodes (22): th(), Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), Parties() (+14 more)

### Community 158 - "notifications-view.tsx"
Cohesion: 0.23
Nodes (13): Content(), NotificationsPage(), Content(), PortalNotificationsPage(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty() (+5 more)

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (32): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+24 more)

### Community 160 - "documents/actions.ts"
Cohesion: 0.25
Nodes (13): AttachBatchImage(), attach(), DocumentUpload(), send(), upload(), typeFromName(), ALLOWED, finishBatchImage() (+5 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.10
Nodes (41): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), bookClientMeetingAction(), accountProblem(), newState() (+33 more)

### Community 163 - "registrations/[id]/page.tsx"
Cohesion: 0.18
Nodes (19): addStepFile(), removeStepFile(), startStepFileUpload(), StepBadge(), caseStatus, CertificateDetails, certificateLabel(), fmt() (+11 more)

### Community 164 - "lock.ts"
Cohesion: 0.21
Nodes (11): amount(), INCOME_TAX, LockFiling, lockFormsFor(), lockingFiling(), lockKind(), PAYROLL, PURCHASES (+3 more)

### Community 165 - "notification-bell.tsx"
Cohesion: 0.30
Nodes (12): markReadLocally(), BellPanel(), BellRow(), BellVariant, base(), BellAudience, notificationSettingsHref(), notificationsHref() (+4 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (34): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+26 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "business-switcher.tsx"
Cohesion: 0.16
Nodes (19): switchBusinessAction(), BusinessSwitcher(), SwitcherBusiness, ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, DotBadge(), NotificationBell(), Counter() (+11 more)

### Community 169 - "requests/actions.ts"
Cohesion: 0.14
Nodes (30): PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), uploadRequestFile(), ReturnStandingForm(), StandingUpload() (+22 more)

### Community 170 - "server-only"
Cohesion: 0.12
Nodes (24): server-only, @supabase/supabase-js, GET(), maxDuration, POST(), generateFilingsNow(), generatePastFilingsAction(), bookDiscoveryCallAction() (+16 more)

### Community 172 - "queries.ts"
Cohesion: 0.22
Nodes (12): GET(), BELL_LIMIT, bellData, bellDataFor, latestNotifications(), loadBellData(), NotificationFilter, NotificationItem (+4 more)

### Community 173 - "deadlines/dates.ts"
Cohesion: 0.33
Nodes (11): shift(), addMonths(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), ymd(), statutoryDueDate() (+3 more)

### Community 174 - "notification-settings-view.tsx"
Cohesion: 0.15
Nodes (19): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), NotificationActionResult, revalidateLists() (+11 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "ocr/dates.ts"
Cohesion: 0.43
Nodes (6): dateFarFromMonth(), iso(), month(), MONTHS, parsePrintedDate(), year()

### Community 177 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 178 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 180 - "notification-actions.tsx"
Cohesion: 0.23
Nodes (12): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+4 more)

### Community 182 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 183 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 184 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 186 - "registration/page.tsx"
Cohesion: 0.21
Nodes (15): clientStatus, fmt(), PortalRegistration(), Registration(), birForm(), dayNumber(), daysBetween(), daysOpen() (+7 more)

### Community 187 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 189 - "registrations/actions.ts"
Cohesion: 0.14
Nodes (21): ClientCaseKind, dtiRegisteredOn(), openYearRenewalsAction(), PROOF_TYPES, clientCase, NewRegistrationPage(), OwnerOnly(), branchSchema (+13 more)

### Community 190 - "ref_node_fs"
Cohesion: 0.05
Nodes (14): dir, readme, templates, dir, ctx, input, root, root (+6 more)

### Community 191 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 193 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 194 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "people/schema.ts"
Cohesion: 0.19
Nodes (13): access, clientUserSchema, contactAccessSchema, contactDetailsSchema, contactLinkSchema, email, inviteStaffSchema, loadPoints() (+5 more)

### Community 196 - "books-ready.ts"
Cohesion: 0.36
Nodes (7): filingsBooksReady(), BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked(), booksReadyMap()

### Community 197 - "registrations/forms.tsx"
Cohesion: 0.13
Nodes (15): cancelRegistrationAction(), completeRegistrationAction(), FormState, caseNote, caseTitle, Check(), CompleteButton(), statusTone (+7 more)

### Community 198 - "formatAmount"
Cohesion: 0.23
Nodes (15): PortalPrint2307Page(), Print(), portal2307Href(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+7 more)

### Community 199 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (53): SignOffState, AmendFilingForm(), amt(), ApprovalMemo(), Db, TIE, bookKind, BookRow (+45 more)

### Community 200 - "review-form.tsx"
Cohesion: 0.05
Nodes (66): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+58 more)

### Community 202 - "party-pages.tsx"
Cohesion: 0.39
Nodes (5): SearchParams, CustomersRoute(), KINDS, PartyList(), SuppliersRoute()

### Community 206 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 207 - "StepStatus"
Cohesion: 0.38
Nodes (7): StepRow, Row, CaseRow, AGENCIES, CASE_KINDS, CaseKind, StepStatus

### Community 208 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (39): zod, BOOKED_TYPES, BundleChild, PayrollDocument(), Supabase, ColumnMapping(), KIND_LABEL, MATCH_BADGE (+31 more)

### Community 209 - "seed.ts"
Cohesion: 0.25
Nodes (8): DeadlineRule, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 210 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 211 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 212 - "memo.ts"
Cohesion: 0.18
Nodes (13): ReviewNote, approvalMemo(), Memo, MemoInput, MemoMonth, ALWAYS, REFS_FOR_FORM, refsToSign() (+5 more)

### Community 213 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 214 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 217 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 218 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 219 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 224 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1651 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `ui.ts`, `params.ts`, `package.json`, `app/documents/page.tsx`, `Badge`, `statements.ts`, `income.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `clients/[id]/page.tsx`, `returns/types.ts`, `invoice-pages.tsx`, `slots.ts`, `remittances/[id]/page.tsx`, `webhook.ts`, `module-pages.tsx`, `proposal-view.tsx`, `returns/load.ts`, `registration-fee-jobs.test.ts`, `calendar/page.tsx`, `arap.ts`, `lock-bar.tsx`, `year-end/page.tsx`, `form.tsx`, `generate.ts`, `testing.ts`, `money.ts`, `fixed-assets/page.tsx`, `pg`, `parties/[id]/page.tsx`, `idle-watcher.tsx`, `portalContext`, `portal-billing.test.ts`, `notifications/format.ts`, `document-scanner.tsx`, `[slug]/page.tsx`, `work/page.tsx`, `rows.ts`, `filings/actions.ts`, `Centavos`, `layout.ts`, `home.ts`, `leads/actions.ts`, `[month]/page.tsx`, `december-rehearsal.test.ts`, `profile.ts`, `portal/page.tsx`, `settings/actions.ts`, `[clientId]/page.tsx`, `public.ts`, `fees/types.ts`, `book/actions.ts`, `leads/[id]/page.tsx`, `review/page.tsx`, `batch/register.ts`, `holiday-list.ts`, `read.test.ts`, `social-button.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `ocr/run.ts`, `blocks.tsx`, `clients/actions.ts`, `ticked-allocation.test.ts`, `opening.ts`, `work/load.ts`, `engine.ts`, `deadlines/page.tsx`, `quote.ts`, `email/brand.ts`, `@remixicon/react`, `template.ts`, `ledger/types.ts`, `ledger.test.ts`, `contact-access.test.ts`, `move-bar.tsx`, `onboarding/page.tsx`, `calendar/staff.ts`, `lock.ts`, `register/page.tsx`, `requests/actions.ts`, `server-only`, `portal-statements-approval.test.ts`, `deadlines/dates.ts`, `acting-approver.test.ts`, `ocr/dates.ts`, `returns-sign-off.test.ts`, `lead-attribution.test.ts`, `defer-documents.test.ts`, `filed-returns.ts`, `rates.ts`, `tests/proposal-email.test.ts`, `registration/page.tsx`, `funnel.test.ts`, `notifications.test.ts`, `ref_node_fs`, `books-migration.test.ts`, `tests/books.test.ts`, `people/schema.ts`, `books-ready.ts`, `filings/[id]/page.tsx`, `review-form.tsx`, `db.test.ts`, `names.ts`, `memo.ts`, `books-2307.test.ts`, `contribution-remittances.test.ts`, `late-surcharges.test.ts`, `fees.test.ts`, `cwt-2307-tracker.test.ts`, `parallel-run.test.ts`, `fixed-assets.test.ts`, `ledger-lock.test.ts`, `lock-by-return-type.test.ts`, `month-complete.test.ts`, `tests/register.test.ts`, `returns-books.test.ts`, `adjustments.test.ts`, `books-lock.test.ts`, `contribution-payables.test.ts`, `payroll-books.test.ts`, `year-end.test.ts`?**
  _High betweenness centrality (0.184) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11212121212121212 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `package.json`, `access.ts`, `app/documents/page.tsx`, `Badge`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `clients/[id]/page.tsx`, `invoice-pages.tsx`, `modal.tsx`, `react`, `slots.ts`, `button.tsx`, `remittances/[id]/page.tsx`, `payroll/data.ts`, `Card`, `module-pages.tsx`, `calendar/page.tsx`, `year-end/page.tsx`, `review-forms.tsx`, `form.tsx`, `quote/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `worksheet/page.tsx`, `collections/forms.tsx`, `parties/[id]/page.tsx`, `idle-watcher.tsx`, `booksContext`, `Notice`, `portalContext`, `[slug]/page.tsx`, `LinkButton`, `work/page.tsx`, `filings/actions.ts`, `Centavos`, `ledger/data.ts`, `cx`, `marketing/page.tsx`, `lib/books/actions.ts`, `leads/actions.ts`, `[month]/page.tsx`, `profile.ts`, `portal/page.tsx`, `settings/actions.ts`, `[clientId]/page.tsx`, `fees/types.ts`, `book/actions.ts`, `leads/[id]/page.tsx`, `review/page.tsx`, `batch/register.ts`, `showDate`, `read.test.ts`, `social-button.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `Skeleton`, `fixed-assets/forms.tsx`, `blocks.tsx`, `clients/actions.ts`, `payroll/forms.tsx`, `requireOwner`, `deadlines/page.tsx`, `email/brand.ts`, `@remixicon/react`, `ledger/types.ts`, `proof-upload.tsx`, `transactions-actions.ts`, `move-bar.tsx`, `portal/documents/page.tsx`, `parallel-run.tsx`, `notifications-view.tsx`, `onboarding/page.tsx`, `documents/actions.ts`, `calendar/staff.ts`, `registrations/[id]/page.tsx`, `notification-bell.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `business-switcher.tsx`, `requests/actions.ts`, `server-only`, `queries.ts`, `notification-settings-view.tsx`, `notification-actions.tsx`, `registration/page.tsx`, `registrations/actions.ts`, `formatAmount`, `filings/[id]/page.tsx`, `review-form.tsx`, `party-pages.tsx`, `documents/[id]/page.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04324956165984804 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `access.ts`, `app/documents/page.tsx`, `Badge`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `clients/[id]/page.tsx`, `invoice-pages.tsx`, `modal.tsx`, `slots.ts`, `button.tsx`, `remittances/[id]/page.tsx`, `payroll/data.ts`, `Card`, `module-pages.tsx`, `proposal-view.tsx`, `calendar/page.tsx`, `lock-bar.tsx`, `year-end/page.tsx`, `review-forms.tsx`, `form.tsx`, `quote/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `stat-cards.tsx`, `worksheet/page.tsx`, `collections/forms.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `idle-watcher.tsx`, `cx.ts`, `booksContext`, `Notice`, `portalContext`, `document-scanner.tsx`, `[slug]/page.tsx`, `LinkButton`, `work/page.tsx`, `Centavos`, `ledger/data.ts`, `cx`, `marketing/page.tsx`, `leads/actions.ts`, `[month]/page.tsx`, `profile.ts`, `portal/page.tsx`, `[clientId]/page.tsx`, `fees/types.ts`, `leads/[id]/page.tsx`, `review/page.tsx`, `batch/register.ts`, `showDate`, `social-button.tsx`, `app/settings/page.tsx`, `Skeleton`, `fixed-assets/forms.tsx`, `blocks.tsx`, `payroll/forms.tsx`, `deadlines/page.tsx`, `@remixicon/react`, `proof-upload.tsx`, `transactions-actions.ts`, `supabaseServer`, `move-bar.tsx`, `portal/documents/page.tsx`, `parallel-run.tsx`, `notifications-view.tsx`, `onboarding/page.tsx`, `documents/actions.ts`, `calendar/staff.ts`, `registrations/[id]/page.tsx`, `notification-bell.tsx`, `register/page.tsx`, `business-switcher.tsx`, `requests/actions.ts`, `queries.ts`, `notification-settings-view.tsx`, `notification-actions.tsx`, `bell-store.ts`, `registration/page.tsx`, `registrations/actions.ts`, `staff/page.tsx`, `registrations/forms.tsx`, `formatAmount`, `filings/[id]/page.tsx`, `review-form.tsx`, `party-pages.tsx`, `documents/[id]/page.tsx`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._