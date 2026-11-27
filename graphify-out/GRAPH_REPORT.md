# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1011 files · ~840,118 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6208 nodes · 22147 edges · 206 communities (179 shown, 27 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 193 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `7035509b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LinkButton
- index.ts
- migrate.yml
- ui.ts
- public.ts
- package.json
- auth.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/labels.ts
- Sign-in & Setup Docs
- PageHeader
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
- toCentavos
- form-1604e.ts
- documents/[id]/page.tsx
- payroll/payroll.test.ts
- modal.tsx
- site-document.tsx
- scripts
- supabaseAdmin
- [month]/page.tsx
- filings/[id]/page.tsx
- webhook.ts
- tax-codes.ts
- next
- react
- proposal-view.tsx
- returns/load.ts
- steps.ts
- calendar/page.tsx
- arap.ts
- Card
- lock-bar.tsx
- marketing/page.tsx
- form.tsx
- Apple Design
- engine.ts
- testing.ts
- fees/[id]/page.tsx
- portalContext
- books/forms.tsx
- year.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- status.ts
- @remixicon/react
- ref_node_fs
- ledger/data.ts
- how-we-work/page.tsx
- marketing/page.tsx
- cx.ts
- Pro components
- remittances/[id]/page.tsx
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- proposal-view.test.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- workpapers/page.tsx
- work/page.tsx
- Recipes
- payroll/data.ts
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
- ref_node_path
- leads/forms.tsx
- [month]/page.tsx
- workpapers.test.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- lib/books/actions.ts
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
- vitest
- holiday-list.ts
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- app/settings/page.tsx
- proof-upload.tsx
- ocr/run.ts
- fixed-assets/page.tsx
- generate.ts
- clients/actions.ts
- ticked-allocation.test.ts
- december-rehearsal.test.ts
- review-form.tsx
- reports/[id]/page.tsx
- payroll/forms.tsx
- app/settings/notifications/page.tsx
- safeguards.ts
- filed-returns.ts
- payroll-read.tsx
- server-only
- grid.ts
- template.ts
- notification-bell.tsx
- blocks.tsx
- seed.ts
- ledger.test.ts
- books/periods.ts
- firm/parallel-run/page.tsx
- move-bar.tsx
- documents/[id]/page.tsx
- formatAmount
- payroll-read-actions.ts
- onboarding/page.tsx
- workpapers.test.ts
- Rework: one flow from lead to year-end
- calendar/staff.ts
- read/match.ts
- app/documents/page.tsx
- notifications-view.tsx
- parts.ts
- opengraph-image.tsx
- dropdown.tsx
- requests/actions.ts
- deadlines/actions.ts
- BoardUI page patterns
- supabaseServer
- cycle/actions.ts
- notification-actions.tsx
- acting-approver.test.ts
- names.ts
- pg
- generate-qap-fixture.mjs
- lead-attribution.test.ts
- site/calendar.ts
- copy-opencv.mjs
- ContactAccess
- contribution-remittances.test.ts
- tests/register.test.ts
- tests/proposal-email.test.ts
- books-2307.test.ts
- funnel.test.ts
- notifications.test.ts
- parallel-run.test.ts
- telegram-uploads.test.ts
- books-migration.test.ts
- eslint.config.mjs
- binder/page.tsx
- tests/books.test.ts
- fees.test.ts
- fixed-assets.test.ts
- lock-by-return-type.test.ts
- returns-books.test.ts
- batch-row-images.test.ts
- names.ts
- @supabase/ssr
- @techstark/opencv-js
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

## Communities (206 total, 27 thin omitted)

### Community 0 - "LinkButton"
Cohesion: 0.06
Nodes (68): BooksContext, booksViewFor(), one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff() (+60 more)

### Community 1 - "index.ts"
Cohesion: 0.04
Nodes (33): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+25 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.07
Nodes (52): fmtMonth(), WithdrawReportButton(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate(), lastMonth() (+44 more)

### Community 4 - "public.ts"
Cohesion: 0.08
Nodes (39): ProposalSetup, acceptProposalAction(), AcceptState, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND (+31 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "auth.ts"
Cohesion: 0.07
Nodes (57): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+49 more)

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
Cohesion: 0.07
Nodes (53): Doc, DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow (+45 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "PageHeader"
Cohesion: 0.10
Nodes (41): ClientList(), ClientsPage(), Row, SORTS, Contacts(), ContactsPage(), FilingsTabs(), FilingsTabsFor() (+33 more)

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
Nodes (35): defaultCashFlow(), statementsFrom(), isFsLine(), add(), buildStatements(), classOf(), Column, CREDIT_SECTIONS (+27 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (71): BIR_LINES, annualAttachments(), balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701() (+63 more)

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
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "Centavos"
Cohesion: 0.08
Nodes (49): KIND, REASON, STATUS_TONE, AtcComparison, atcRows(), BookInvoiceRow, compareParallelRun(), differs() (+41 more)

### Community 43 - "toCentavos"
Cohesion: 0.10
Nodes (26): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), Run (+18 more)

### Community 44 - "form-1604e.ts"
Cohesion: 0.05
Nodes (77): qapBuckets(), lookupAtc(), client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q (+69 more)

### Community 45 - "documents/[id]/page.tsx"
Cohesion: 0.19
Nodes (18): AttachBatchImage(), attach(), DocumentUpload(), send(), upload(), Item, typeFromName(), ALLOWED (+10 more)

### Community 46 - "payroll/payroll.test.ts"
Cohesion: 0.11
Nodes (31): DEFAULT_ITEMS, PayrollItem, employee(), entry(), fixtureContext(), ITEMS, P(), pay() (+23 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (46): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), globalSearch(), SearchHit (+38 more)

### Community 48 - "site-document.tsx"
Cohesion: 0.08
Nodes (24): GlobalNotFound(), metadata, apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter (+16 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (35): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+27 more)

### Community 51 - "[month]/page.tsx"
Cohesion: 0.36
Nodes (9): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), AddBranchForm(), BranchRowForm(), Branches() (+1 more)

### Community 52 - "filings/[id]/page.tsx"
Cohesion: 0.05
Nodes (63): FilingRow, amt(), one(), shiftMonth(), SignStatus(), STATUS, TieRow(), Workpapers() (+55 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (46): maxDuration, POST(), TelegramEnv, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked() (+38 more)

### Community 54 - "tax-codes.ts"
Cohesion: 0.17
Nodes (16): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+8 more)

### Community 55 - "next"
Cohesion: 0.10
Nodes (24): nextConfig, next, addClientNoteAction(), markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), Lines() (+16 more)

### Community 56 - "react"
Cohesion: 0.06
Nodes (91): react, BankAccountsRoute(), booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column (+83 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.22
Nodes (14): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+6 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.10
Nodes (39): FinancialStatements, ATC_MASTER, AtcInfo, normalizeAtc(), withNonDeductible(), dayBefore(), FilingRow, listInvoices() (+31 more)

### Community 59 - "steps.ts"
Cohesion: 0.04
Nodes (126): addStepFile(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction() (+118 more)

### Community 60 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (19): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaWhen(), manilaInstant(), appBookedEvents() (+11 more)

### Community 61 - "arap.ts"
Cohesion: 0.08
Nodes (39): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+31 more)

### Community 62 - "Card"
Cohesion: 0.10
Nodes (41): ClientReturnsPage(), Returns(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup() (+33 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.13
Nodes (26): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+18 more)

### Community 64 - "marketing/page.tsx"
Cohesion: 0.26
Nodes (12): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), Msg() (+4 more)

### Community 65 - "form.tsx"
Cohesion: 0.12
Nodes (38): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.17
Nodes (21): compareIso(), IsoDate, isWeekend(), parseIso(), DeadlineRule, FilingInstance, fiscalYearOf(), followsCalendarYear() (+13 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (31): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+23 more)

### Community 70 - "portalContext"
Cohesion: 0.15
Nodes (30): PortalClient, portalContext, Content(), PortalNotificationsPage(), Portal2316(), Portal2316Page(), Books(), PortalBooks() (+22 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.13
Nodes (45): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+37 more)

### Community 72 - "year.ts"
Cohesion: 0.07
Nodes (54): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+46 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.10
Nodes (43): sawtBuckets(), tin9(), tinDashed(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS (+35 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 78 - "@remixicon/react"
Cohesion: 0.08
Nodes (46): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+38 more)

### Community 79 - "ref_node_fs"
Cohesion: 0.07
Nodes (7): ctx, input, root, root, root, root, root

### Community 80 - "ledger/data.ts"
Cohesion: 0.08
Nodes (50): mergePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), withDirectory(), datAddress(), datNameCols() (+42 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.11
Nodes (33): HowWeWorkPage(), Pair(), Split(), step(), StepText(), TimelineFigure(), Chip(), CHIP_COLORS (+25 more)

### Community 82 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (27): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), CreateLinkForm(), N() (+19 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (73): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+65 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "remittances/[id]/page.tsx"
Cohesion: 0.09
Nodes (64): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+56 more)

### Community 86 - "Notice"
Cohesion: 0.06
Nodes (105): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+97 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.17
Nodes (29): basePeriod(), HeldNote(), holdsWhat(), BooksSection(), NavRow(), PortalReports(), Released, Reports() (+21 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "proposal-view.test.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (22): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), ATTRIBUTION_KEY, pickAttribution() (+14 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 93 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (19): month1601C(), RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart() (+11 more)

### Community 94 - "work/page.tsx"
Cohesion: 0.07
Nodes (61): RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks() (+53 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.17
Nodes (25): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), certificatesFromRaw(), loadEntries(), loadPriorEmployers(), payAccountsOf() (+17 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "book/actions.ts"
Cohesion: 0.16
Nodes (20): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+12 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.09
Nodes (35): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_KINDS (+27 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.05
Nodes (68): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), RepostRegisterButton(), ReverseForm(), Access (+60 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (101): react-aria-components, SheetPreview(), ChipColor, Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Checkbox() (+93 more)

### Community 103 - "compute.ts"
Cohesion: 0.14
Nodes (31): annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation(), monthlyTable() (+23 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "leads/actions.ts"
Cohesion: 0.11
Nodes (26): digestMessage(), DigestRow, longDay(), peso, time(), afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates() (+18 more)

### Community 106 - "proof-upload.tsx"
Cohesion: 0.07
Nodes (35): BirGroup, BirLine, BirLineKey, isBirLine(), BOOK_ABBR, BookLine, Column, ColumnarBook (+27 more)

### Community 107 - "ref_node_path"
Cohesion: 0.07
Nodes (8): dir, readme, templates, root, root, root, root, root

### Community 108 - "leads/forms.tsx"
Cohesion: 0.11
Nodes (38): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+30 more)

### Community 109 - "[month]/page.tsx"
Cohesion: 0.11
Nodes (38): saveMonthAction(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), PayrollRuns(), Payroll() (+30 more)

### Community 110 - "workpapers.test.ts"
Cohesion: 0.09
Nodes (12): as(), client(), root, doc(), root, doc(), root, doc() (+4 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (44): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+36 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.05
Nodes (72): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+64 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.12
Nodes (34): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), RemittedForm(), VoidDepositForm() (+26 more)

### Community 116 - "2316/page.tsx"
Cohesion: 0.35
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Form2316Set(), Form2316Sheet(), PrintButton(), Form2316Data (+1 more)

### Community 118 - "quote/page.tsx"
Cohesion: 0.12
Nodes (28): dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase (+20 more)

### Community 119 - "quote.ts"
Cohesion: 0.06
Nodes (67): PriceRow, corp, items, proposal(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+59 more)

### Community 120 - "tests/register.test.ts"
Cohesion: 0.25
Nodes (13): cancelMeetingAction(), cancelMyMeetingAction(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail(), MAX_CANCEL_REASON (+5 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.06
Nodes (52): NotesCard(), BookingLink(), DiscoveryCallForm(), LostForm(), ProposalSent, ReopenForm(), Result(), ReviewerForm() (+44 more)

### Community 122 - "app/page.tsx"
Cohesion: 0.12
Nodes (31): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary(), Queue() (+23 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (45): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+37 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.09
Nodes (39): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), accessFor() (+31 more)

### Community 126 - "vitest"
Cohesion: 0.07
Nodes (9): vitest, root, root, HASH, LEAD, root, root, root (+1 more)

### Community 127 - "holiday-list.ts"
Cohesion: 0.15
Nodes (17): easterSunday(), HolidayKind, HolidayRule, iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+9 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (64): geminiJson(), BirCategory, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+56 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.06
Nodes (52): GET(), GET(), POST(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+44 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (45): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+37 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.22
Nodes (15): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote(), Rule, SettingsPage() (+7 more)

### Community 132 - "proof-upload.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (44): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+36 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.12
Nodes (32): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+24 more)

### Community 135 - "generate.ts"
Cohesion: 0.18
Nodes (14): EfpsGroup, FilingChannel, Frequency, ACTIVE, ClientRow, DueDateUpdate, FilingRow, LocalHoliday (+6 more)

### Community 136 - "clients/actions.ts"
Cohesion: 0.06
Nodes (59): zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction() (+51 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "december-rehearsal.test.ts"
Cohesion: 0.17
Nodes (10): buildFilingRows(), toDeadlineRule(), approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll(), root (+2 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.14
Nodes (22): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DocumentCodes, slpCategoryFromCodes() (+14 more)

### Community 140 - "reports/[id]/page.tsx"
Cohesion: 0.83
Nodes (3): PortalReport(), Report(), when()

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.06
Nodes (70): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+62 more)

### Community 142 - "app/settings/notifications/page.tsx"
Cohesion: 0.33
Nodes (11): Content(), NotificationSettingsPage(), TelegramLinkButton(), TelegramUnlinkButton(), AnchorButton(), telegramEnv(), LinkState, setTelegramEnabledAction() (+3 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.11
Nodes (30): SafeguardsNotice(), board, MARCO, none, RHEA, row(), steps, documentCutoff() (+22 more)

### Community 144 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 145 - "payroll-read.tsx"
Cohesion: 0.16
Nodes (14): ReviewNote, Memo, MemoInput, MemoMonth, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps() (+6 more)

### Community 146 - "server-only"
Cohesion: 0.08
Nodes (46): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+38 more)

### Community 147 - "grid.ts"
Cohesion: 0.24
Nodes (11): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+3 more)

### Community 148 - "template.ts"
Cohesion: 0.11
Nodes (19): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+11 more)

### Community 149 - "notification-bell.tsx"
Cohesion: 0.25
Nodes (11): EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS (+3 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.06
Nodes (92): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+84 more)

### Community 151 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "books/periods.ts"
Cohesion: 0.23
Nodes (15): markReadLocally(), useBellData(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), Counter() (+7 more)

### Community 154 - "firm/parallel-run/page.tsx"
Cohesion: 0.19
Nodes (14): GET(), isNotificationKind(), NotificationKind, BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences() (+6 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "documents/[id]/page.tsx"
Cohesion: 0.12
Nodes (29): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+21 more)

### Community 157 - "formatAmount"
Cohesion: 0.17
Nodes (29): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+21 more)

### Community 158 - "payroll-read-actions.ts"
Cohesion: 0.44
Nodes (9): applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), headerKey(), draftToRegister() (+1 more)

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (30): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+22 more)

### Community 160 - "workpapers.test.ts"
Cohesion: 0.42
Nodes (10): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+2 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (37): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+29 more)

### Community 163 - "read/match.ts"
Cohesion: 0.33
Nodes (9): digits(), editDistance(), keyNo(), matchEmployee(), MatchStatus, nameScore(), nameWords(), similarity() (+1 more)

### Community 164 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (37): ApprovedReview(), ApprovedRow, BulkState, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList() (+29 more)

### Community 165 - "notifications-view.tsx"
Cohesion: 0.24
Nodes (15): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, base() (+7 more)

### Community 166 - "parts.ts"
Cohesion: 0.10
Nodes (24): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, KIND_LABELS (+16 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "dropdown.tsx"
Cohesion: 0.14
Nodes (22): switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider() (+14 more)

### Community 169 - "requests/actions.ts"
Cohesion: 0.10
Nodes (40): Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row, when(), CloseRequestButton() (+32 more)

### Community 170 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 171 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 172 - "supabaseServer"
Cohesion: 0.06
Nodes (70): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+62 more)

### Community 173 - "cycle/actions.ts"
Cohesion: 0.24
Nodes (15): MonthComplete(), SentRow, StandingRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction() (+7 more)

### Community 174 - "notification-actions.tsx"
Cohesion: 0.21
Nodes (13): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+5 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 177 - "pg"
Cohesion: 0.07
Nodes (8): pg, root, root, root, root, Part, root, root

### Community 178 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 180 - "site/calendar.ts"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 181 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 182 - "ContactAccess"
Cohesion: 0.33
Nodes (6): SwitcherBusiness, Identity, IdentityRow, ContactAccess, GrantInput, ContactBusiness

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "tests/register.test.ts"
Cohesion: 0.40
Nodes (4): DocumentRow, approved(), as(), root

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 186 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 187 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 189 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 191 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 193 - "binder/page.tsx"
Cohesion: 0.29
Nodes (10): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, FinancialStatementsView() (+2 more)

### Community 194 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 196 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 200 - "names.ts"
Cohesion: 0.07
Nodes (39): Booking, DirectoryParty, ENTRY_STATUS, fmtDay(), fmtMonthOf(), ONLY_FOR, typeLabel, TaxCode (+31 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1641 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `LinkButton`, `index.ts`, `ui.ts`, `public.ts`, `package.json`, `auth.ts`, `documents/labels.ts`, `PageHeader`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `Centavos`, `toCentavos`, `form-1604e.ts`, `payroll/payroll.test.ts`, `supabaseAdmin`, `filings/[id]/page.tsx`, `webhook.ts`, `tax-codes.ts`, `returns/load.ts`, `steps.ts`, `calendar/page.tsx`, `arap.ts`, `Card`, `lock-bar.tsx`, `form.tsx`, `engine.ts`, `testing.ts`, `fees/[id]/page.tsx`, `year.ts`, `status.ts`, `@remixicon/react`, `ref_node_fs`, `ledger/data.ts`, `remittances/[id]/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `proposal-view.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `work/page.tsx`, `book/actions.ts`, `ledger/books.ts`, `ledger/types.ts`, `compute.ts`, `leads/actions.ts`, `ref_node_path`, `leads/forms.tsx`, `workpapers.test.ts`, `profile.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `collections/forms.tsx`, `quote.ts`, `tests/register.test.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `batch/register.ts`, `holiday-list.ts`, `read.test.ts`, `social-button.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `ocr/run.ts`, `fixed-assets/page.tsx`, `generate.ts`, `clients/actions.ts`, `ticked-allocation.test.ts`, `december-rehearsal.test.ts`, `review-form.tsx`, `safeguards.ts`, `filed-returns.ts`, `payroll-read.tsx`, `server-only`, `template.ts`, `blocks.tsx`, `ledger.test.ts`, `move-bar.tsx`, `documents/[id]/page.tsx`, `onboarding/page.tsx`, `calendar/staff.ts`, `app/documents/page.tsx`, `parts.ts`, `requests/actions.ts`, `acting-approver.test.ts`, `names.ts`, `pg`, `lead-attribution.test.ts`, `site/calendar.ts`, `contribution-remittances.test.ts`, `tests/register.test.ts`, `tests/proposal-email.test.ts`, `books-2307.test.ts`, `funnel.test.ts`, `notifications.test.ts`, `parallel-run.test.ts`, `telegram-uploads.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `fees.test.ts`, `fixed-assets.test.ts`, `lock-by-return-type.test.ts`, `returns-books.test.ts`, `batch-row-images.test.ts`, `names.ts`, `db.test.ts`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LinkButton` be split into smaller, more focused modules?**
  _Cohesion score 0.06330532212885154 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `LinkButton`, `ui.ts`, `public.ts`, `package.json`, `auth.ts`, `documents/labels.ts`, `PageHeader`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `Centavos`, `toCentavos`, `documents/[id]/page.tsx`, `modal.tsx`, `site-document.tsx`, `supabaseAdmin`, `[month]/page.tsx`, `filings/[id]/page.tsx`, `webhook.ts`, `react`, `proposal-view.tsx`, `steps.ts`, `calendar/page.tsx`, `arap.ts`, `Card`, `lock-bar.tsx`, `marketing/page.tsx`, `form.tsx`, `fees/[id]/page.tsx`, `portalContext`, `books/forms.tsx`, `@remixicon/react`, `ledger/data.ts`, `marketing/page.tsx`, `remittances/[id]/page.tsx`, `Notice`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `work/page.tsx`, `payroll/data.ts`, `book/actions.ts`, `ledger/books.ts`, `ledger/types.ts`, `cx`, `leads/forms.tsx`, `[month]/page.tsx`, `profile.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `collections/forms.tsx`, `2316/page.tsx`, `quote/page.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `batch/register.ts`, `manilaToday`, `social-button.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `proof-upload.tsx`, `fixed-assets/page.tsx`, `clients/actions.ts`, `review-form.tsx`, `reports/[id]/page.tsx`, `payroll/forms.tsx`, `app/settings/notifications/page.tsx`, `server-only`, `blocks.tsx`, `books/periods.ts`, `firm/parallel-run/page.tsx`, `move-bar.tsx`, `documents/[id]/page.tsx`, `formatAmount`, `payroll-read-actions.ts`, `onboarding/page.tsx`, `calendar/staff.ts`, `app/documents/page.tsx`, `notifications-view.tsx`, `opengraph-image.tsx`, `dropdown.tsx`, `requests/actions.ts`, `deadlines/actions.ts`, `supabaseServer`, `cycle/actions.ts`, `notification-actions.tsx`, `binder/page.tsx`, `names.ts`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.035412474849094565 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `LinkButton`, `ui.ts`, `package.json`, `auth.ts`, `documents/labels.ts`, `PageHeader`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `Centavos`, `toCentavos`, `documents/[id]/page.tsx`, `modal.tsx`, `site-document.tsx`, `supabaseAdmin`, `[month]/page.tsx`, `filings/[id]/page.tsx`, `next`, `proposal-view.tsx`, `steps.ts`, `calendar/page.tsx`, `Card`, `lock-bar.tsx`, `marketing/page.tsx`, `form.tsx`, `fees/[id]/page.tsx`, `portalContext`, `books/forms.tsx`, `stat-cards.tsx`, `@remixicon/react`, `ledger/data.ts`, `how-we-work/page.tsx`, `marketing/page.tsx`, `cx.ts`, `remittances/[id]/page.tsx`, `Notice`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `work/page.tsx`, `payroll/data.ts`, `ledger/books.ts`, `ledger/types.ts`, `cx`, `leads/forms.tsx`, `[month]/page.tsx`, `profile.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `collections/forms.tsx`, `2316/page.tsx`, `quote/page.tsx`, `quote.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `batch/register.ts`, `manilaToday`, `social-button.tsx`, `app/settings/page.tsx`, `proof-upload.tsx`, `fixed-assets/page.tsx`, `clients/actions.ts`, `reports/[id]/page.tsx`, `payroll/forms.tsx`, `app/settings/notifications/page.tsx`, `notification-bell.tsx`, `blocks.tsx`, `books/periods.ts`, `firm/parallel-run/page.tsx`, `move-bar.tsx`, `documents/[id]/page.tsx`, `formatAmount`, `onboarding/page.tsx`, `workpapers.test.ts`, `calendar/staff.ts`, `app/documents/page.tsx`, `dropdown.tsx`, `requests/actions.ts`, `deadlines/actions.ts`, `supabaseServer`, `cycle/actions.ts`, `notification-actions.tsx`, `binder/page.tsx`, `names.ts`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._