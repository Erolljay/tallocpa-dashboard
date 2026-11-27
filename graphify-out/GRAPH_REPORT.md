# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1023 files · ~852,731 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6260 nodes · 22326 edges · 202 communities (171 shown, 31 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `c12b2941`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- quote/page.tsx
- package.json
- next
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- app/documents/page.tsx
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
- compare.ts
- proposal-view.tsx
- returns/types.ts
- generate-qap-fixture.mjs
- [month]/page.tsx
- modal.tsx
- app/page.tsx
- scripts
- supabaseAdmin
- button.tsx
- requireStaff
- webhook.ts
- cx
- structured-data.ts
- tax-codes.ts
- chrome.tsx
- returns/load.ts
- steps.ts
- Card
- arap.ts
- lock-bar.tsx
- year-end/page.tsx
- pg
- marketing/page.tsx
- Apple Design
- engine.ts
- testing.ts
- quote/page.tsx
- payroll/payroll.test.ts
- books/forms.tsx
- fixed-assets/page.tsx
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- morning.ts
- command-search.tsx
- idle-watcher.tsx
- parties/[id]/page.tsx
- how-we-work/page.tsx
- module-pages.tsx
- cx
- Pro components
- lib/books/actions.ts
- react
- portalContext
- portal-billing.test.ts
- notification-settings-view.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- workpapers/page.tsx
- work/page.tsx
- Recipes
- payroll/data.ts
- BoardUI page patterns
- Pro templates
- LinkButton
- Centavos
- ledger/data.ts
- combobox.tsx
- site-document.tsx
- boardui
- auth-templates.ts
- documents/[id]/page.tsx
- ledger/types.ts
- leads/actions.ts
- report-periods.ts
- december-rehearsal.test.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- opening.ts
- [clientId]/page.tsx
- proposal/[token]/page.tsx
- apply-migrations.sh
- fees/schedule.ts
- documents/actions.ts
- cancel-server.ts
- notifications/format.ts
- proof-upload.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- filings/actions.ts
- layout.ts
- read.test.ts
- bir-filing-calendar/page.tsx
- mime.ts
- app/settings/page.tsx
- react
- ocr/run.ts
- leads/[id]/page.tsx
- blocks.tsx
- supabaseServer
- ticked-allocation.test.ts
- social-button.tsx
- app/settings/notifications/page.tsx
- calendar/page.tsx
- payroll/forms.tsx
- onboarding/checklist.ts
- safeguards.ts
- quote.ts
- portal/reports/cwt-2307/page.tsx
- server-only
- app/layout.tsx
- template.ts
- [slug]/page.tsx
- formatAmount
- status.ts
- ledger.test.ts
- split-bundled-pdfs.test.ts
- social-button.tsx
- move-bar.tsx
- Review
- eslint.config.mjs
- copy-opencv.mjs
- clients/[id]/page.tsx
- books-2307.test.ts
- Rework: one flow from lead to year-end
- calendar/staff.ts
- fixed-assets/forms.tsx
- leads-pipeline.test.ts
- notifications.test.ts
- register/page.tsx
- opengraph-image.tsx
- portal-statements-approval.test.ts
- getIdentity
- telegram-uploads.test.ts
- deadlines/actions.ts
- catch-up.test.ts
- documents/labels.ts
- notification-bell.tsx
- acting-approver.test.ts
- names.ts
- returns-sign-off.test.ts
- tests/parties.test.ts
- lead-attribution.test.ts
- register-books.test.ts
- adjustments.test.ts
- filed-returns.ts
- contact-access.test.ts
- rates.ts
- tests/proposal-email.test.ts
- approve-and-post.test.ts
- batch-upload.test.ts
- parallel-run.test.ts
- @supabase/ssr
- ref_node_fs
- books-migration.test.ts
- @techstark/opencv-js
- fixed-assets.test.ts
- tests/books.test.ts
- returns-books.test.ts
- Badge
- review-form.tsx
- templates/README.md
- contribution-remittances.test.ts
- tests/register.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 400 edges
2. `cx` - 315 edges
3. `react` - 286 edges
4. `Notice()` - 269 edges
5. `Skeleton()` - 260 edges
6. `Button()` - 250 edges
7. `next` - 246 edges
8. `vitest` - 197 edges
9. `Card()` - 189 edges
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

## Communities (202 total, 31 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (40): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one() (+32 more)

### Community 1 - "index.ts"
Cohesion: 0.03
Nodes (34): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+26 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.07
Nodes (57): booksViewFor(), fmtMonth(), SearchParams, blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage() (+49 more)

### Community 4 - "quote/page.tsx"
Cohesion: 0.11
Nodes (29): PriceRow, COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+21 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "next"
Cohesion: 0.04
Nodes (60): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), AccessOptions() (+52 more)

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
Cohesion: 0.09
Nodes (39): ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths(), Documents() (+31 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "PageHeader"
Cohesion: 0.06
Nodes (79): @remixicon/react, ClientList(), ClientsPage(), SORTS, STATUS_GROUPS, Contacts(), ContactsPage(), CyclePage() (+71 more)

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
Nodes (43): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES (+35 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (80): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), annualAttachments(), balanceSheet(), compute1701() (+72 more)

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
Cohesion: 0.11
Nodes (36): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), dateFmt, stampFmt, addMonths() (+28 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (71): CELL, FirmParallelRunPage(), monthShort(), Summary(), KIND, REASON, Section(), shortDate() (+63 more)

### Community 43 - "proposal-view.tsx"
Cohesion: 0.11
Nodes (25): jobName(), lineName(), longDate(), money(), php, ProposalData, ProposalView(), Rows() (+17 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.05
Nodes (71): client, agentLines(), agentProblems(), amountText(), emptyResult(), PAYROLL_NOT_LOADED, INPUTS, MONTH (+63 more)

### Community 45 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 46 - "[month]/page.tsx"
Cohesion: 0.08
Nodes (54): saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES (+46 more)

### Community 47 - "modal.tsx"
Cohesion: 0.10
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), ButtonLinkProps (+26 more)

### Community 48 - "app/page.tsx"
Cohesion: 0.11
Nodes (37): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+29 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.16
Nodes (25): cancelMeetingAction(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), cancelMyMeetingAction() (+17 more)

### Community 51 - "button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 52 - "requireStaff"
Cohesion: 0.08
Nodes (62): EmployerCard(), GET(), NewParty(), NewPartyPage(), GET(), ListRow, ORDER, Remittance() (+54 more)

### Community 53 - "webhook.ts"
Cohesion: 0.08
Nodes (50): maxDuration, POST(), supabaseEnv(), TelegramEnv, telegramEnv(), ClaimedNotification, TelegramApi, telegramApi() (+42 more)

### Community 54 - "cx"
Cohesion: 0.06
Nodes (53): ZoomPreview(), switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, DotBadge(), NotificationBell(), Counter() (+45 more)

### Community 55 - "structured-data.ts"
Cohesion: 0.10
Nodes (28): robots(), metadata, metadata, sitemap(), BRAND_NAME, QUOTE_LABEL, SITE_URL, siteUrl() (+20 more)

### Community 56 - "tax-codes.ts"
Cohesion: 0.20
Nodes (14): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+6 more)

### Community 57 - "chrome.tsx"
Cohesion: 0.18
Nodes (17): metadata, QuotesClosed(), Start(), StartPage(), ContactList(), Lockup(), Mark(), NAV (+9 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.07
Nodes (51): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+43 more)

### Community 59 - "steps.ts"
Cohesion: 0.05
Nodes (87): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+79 more)

### Community 60 - "Card"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 61 - "arap.ts"
Cohesion: 0.15
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+10 more)

### Community 62 - "lock-bar.tsx"
Cohesion: 0.14
Nodes (26): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+18 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 64 - "pg"
Cohesion: 0.06
Nodes (8): pg, root, root, root, root, root, root, root

### Community 65 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (60): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+52 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.06
Nodes (62): Rule, PlannedObligation, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule (+54 more)

### Community 68 - "testing.ts"
Cohesion: 0.16
Nodes (21): vitest, form1701, form1702RT, year, individual, individual, amounts(), cert2307() (+13 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.11
Nodes (39): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+31 more)

### Community 70 - "payroll/payroll.test.ts"
Cohesion: 0.07
Nodes (68): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+60 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (44): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+36 more)

### Community 72 - "fixed-assets/page.tsx"
Cohesion: 0.11
Nodes (34): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), loadAssets(), Row (+26 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.10
Nodes (47): SaleSplit, branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDashed(), tinDigits() (+39 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "morning.ts"
Cohesion: 0.13
Nodes (18): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+10 more)

### Community 78 - "command-search.tsx"
Cohesion: 0.14
Nodes (19): SearchHit, SearchKind, CommandSearch(), Icon, isMac(), KINDS, noop(), PAGES (+11 more)

### Community 79 - "idle-watcher.tsx"
Cohesion: 0.21
Nodes (18): ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS (+10 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.09
Nodes (37): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+29 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.18
Nodes (27): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+19 more)

### Community 82 - "module-pages.tsx"
Cohesion: 0.09
Nodes (41): BankAccountsRoute(), booksContext(), one(), BooksFrame(), BooksList(), Column, ListRow, RowLink() (+33 more)

### Community 83 - "cx"
Cohesion: 0.04
Nodes (59): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+51 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "lib/books/actions.ts"
Cohesion: 0.09
Nodes (43): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+35 more)

### Community 86 - "react"
Cohesion: 0.05
Nodes (123): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+115 more)

### Community 87 - "portalContext"
Cohesion: 0.12
Nodes (33): PortalClient, portalContext, Content(), PortalNotificationsPage(), PortalRemittances(), Remittances(), Row, Portal2316() (+25 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notification-settings-view.tsx"
Cohesion: 0.14
Nodes (19): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), SwitchProps, SwitchShape (+11 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (23): AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY, pickAttribution() (+15 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 93 - "workpapers/page.tsx"
Cohesion: 0.05
Nodes (66): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+58 more)

### Community 94 - "work/page.tsx"
Cohesion: 0.09
Nodes (49): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+41 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.15
Nodes (28): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Certificates2316, certificatesFromRaw(), loadEntries(), loadPriorEmployers() (+20 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "LinkButton"
Cohesion: 0.27
Nodes (12): Batch(), BatchPage(), one(), toCentavos(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page() (+4 more)

### Community 100 - "Centavos"
Cohesion: 0.07
Nodes (44): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+36 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.09
Nodes (45): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+37 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.06
Nodes (56): react-aria-components, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Checkbox(), CheckboxProps (+48 more)

### Community 103 - "site-document.tsx"
Cohesion: 0.14
Nodes (11): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), geist, geistMono (+3 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 106 - "documents/[id]/page.tsx"
Cohesion: 0.08
Nodes (49): BOOKED_TYPES, BundleChild, PayrollDocument(), Supabase, applyColumnsAction(), done(), payrollDocument(), PayrollReadState (+41 more)

### Community 107 - "ledger/types.ts"
Cohesion: 0.12
Nodes (23): Access, STATUS, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, ChecklistInput, ChecklistItem (+15 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.11
Nodes (42): assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction(), recordCallAction() (+34 more)

### Community 109 - "report-periods.ts"
Cohesion: 0.26
Nodes (16): basePeriod(), HeldNote(), holdsWhat(), periodTitle(), BooksYear, booksYears(), iso(), lockedMonths() (+8 more)

### Community 110 - "december-rehearsal.test.ts"
Cohesion: 0.09
Nodes (15): as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll() (+7 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (53): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+45 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "opening.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.08
Nodes (47): statementLinkAction(), ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), RunReadyButton() (+39 more)

### Community 116 - "proposal/[token]/page.tsx"
Cohesion: 0.25
Nodes (10): PortalReport(), Report(), when(), metadata, Proposal(), ProposalPage(), FinancialStatementsView(), StatementTable() (+2 more)

### Community 118 - "fees/schedule.ts"
Cohesion: 0.13
Nodes (25): QuerySource, instantView(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num() (+17 more)

### Community 119 - "documents/actions.ts"
Cohesion: 0.23
Nodes (15): AttachBatchImage(), attach(), DocumentUpload(), send(), upload(), Item, typeFromName(), ALLOWED (+7 more)

### Community 120 - "cancel-server.ts"
Cohesion: 0.36
Nodes (7): calendarNote(), CalendarOutcome, cancelledMessage(), leadCancellationEmail(), manilaWhen(), MAX_CANCEL_REASON, when

### Community 121 - "notifications/format.ts"
Cohesion: 0.18
Nodes (16): badgeText(), bellLabel(), clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay (+8 more)

### Community 122 - "proof-upload.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (41): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+33 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.09
Nodes (42): metadata, Shared(), SharedStatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref() (+34 more)

### Community 126 - "filings/actions.ts"
Cohesion: 0.11
Nodes (23): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+15 more)

### Community 127 - "layout.ts"
Cohesion: 0.24
Nodes (13): bodyBlocks(), DEFAULT_BRAND, EmailAction, escapeHtml(), fullBrand(), linkify(), plainTextToHtml(), receivingLine() (+5 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (78): RFC-4180, geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES (+70 more)

### Community 129 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 130 - "mime.ts"
Cohesion: 0.09
Nodes (48): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+40 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (29): zod, addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState (+21 more)

### Community 132 - "react"
Cohesion: 0.08
Nodes (54): react, fmtDate(), INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props (+46 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.05
Nodes (49): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+41 more)

### Community 134 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (39): BookingLink(), FunnelSwitch(), ProposalSent, ReopenForm(), bookedTime, Lead(), LeadPage(), LeadTouch (+31 more)

### Community 135 - "blocks.tsx"
Cohesion: 0.11
Nodes (40): AboutPage(), HOW, metadata, BRING, ContactPage(), metadata, FaqPage(), metadata (+32 more)

### Community 136 - "supabaseServer"
Cohesion: 0.04
Nodes (111): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setCatchUpAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+103 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 139 - "app/settings/notifications/page.tsx"
Cohesion: 0.30
Nodes (11): Content(), NotificationSettingsPage(), TelegramLinkButton(), TelegramSwitch(), TelegramUnlinkButton(), AnchorButton(), LinkState, setTelegramEnabledAction() (+3 more)

### Community 140 - "calendar/page.tsx"
Cohesion: 0.12
Nodes (33): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), addDays(), byDay(), DAY_LABEL (+25 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.05
Nodes (73): exceljs, checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState (+65 more)

### Community 142 - "onboarding/checklist.ts"
Cohesion: 0.21
Nodes (9): ItemState, MANUAL_ITEM_LABELS, MANUAL_ITEMS, ONBOARDING_GROUPS, onboardingChecklist(), OnboardingFacts, OnboardingItem, state() (+1 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.09
Nodes (34): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, isWeekend() (+26 more)

### Community 144 - "quote.ts"
Cohesion: 0.12
Nodes (31): buildProposalQuote(), jobGroupOf(), buildQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem, documentBand() (+23 more)

### Community 145 - "portal/reports/cwt-2307/page.tsx"
Cohesion: 0.32
Nodes (10): PortalCwt2307Page(), Tracker(), ParamSelect(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), Figure(), money() (+2 more)

### Community 146 - "server-only"
Cohesion: 0.12
Nodes (35): server-only, @supabase/supabase-js, GET(), GET(), GET(), MonthComplete(), runActingDigest(), cancelDiscoveryCall() (+27 more)

### Community 147 - "app/layout.tsx"
Cohesion: 0.06
Nodes (52): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+44 more)

### Community 148 - "template.ts"
Cohesion: 0.08
Nodes (35): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+27 more)

### Community 149 - "[slug]/page.tsx"
Cohesion: 0.29
Nodes (9): generateMetadata(), PICKER_SERVICE, Service(), ServicePage(), TextLink(), JsonLd(), serviceBySlug(), pageMetadata() (+1 more)

### Community 150 - "formatAmount"
Cohesion: 0.16
Nodes (19): TransactionJournal(), PortalPrint2307Page(), Print(), portal2307Href(), Accreditation(), amount(), AmountRow(), DateCells() (+11 more)

### Community 151 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 154 - "social-button.tsx"
Cohesion: 0.17
Nodes (17): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+9 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.26
Nodes (14): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+6 more)

### Community 156 - "Review"
Cohesion: 0.20
Nodes (17): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+9 more)

### Community 157 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 158 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 159 - "clients/[id]/page.tsx"
Cohesion: 0.06
Nodes (63): ClientStatusTarget, FormState, ClientValues, frequencyLabel, Props, StaffOptions(), ClientTab, ClientTabs() (+55 more)

### Community 160 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (37): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+29 more)

### Community 163 - "fixed-assets/forms.tsx"
Cohesion: 0.31
Nodes (10): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+2 more)

### Community 164 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 166 - "register/page.tsx"
Cohesion: 0.07
Nodes (56): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+48 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 169 - "getIdentity"
Cohesion: 0.09
Nodes (50): amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text(), RequestDetail(), RequestPage() (+42 more)

### Community 171 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 173 - "documents/labels.ts"
Cohesion: 0.07
Nodes (53): Doc, DocumentsCard(), when(), Cycle(), CycleWithClient, DocRow, ExceptionRow, shift() (+45 more)

### Community 174 - "notification-bell.tsx"
Cohesion: 0.06
Nodes (67): GET(), SheetPreview(), Content(), NotificationsPage(), emit(), listeners, markReadLocally(), notifyNotificationsChanged() (+59 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 177 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 180 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 182 - "filed-returns.ts"
Cohesion: 0.13
Nodes (27): BooksSection(), NavRow(), PortalReports(), Released, Reports(), Section(), Statements(), when() (+19 more)

### Community 184 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 188 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 190 - "ref_node_fs"
Cohesion: 0.04
Nodes (18): dir, ctx, input, root, root, root, HASH, LEAD (+10 more)

### Community 191 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 193 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 194 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 199 - "Badge"
Cohesion: 0.05
Nodes (73): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, SignOffState, ApprovalMemo(), bookKind, BookRow (+65 more)

### Community 200 - "review-form.tsx"
Cohesion: 0.05
Nodes (68): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+60 more)

### Community 214 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 224 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1661 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `testing.ts` to `form-2307.ts`, `index.ts`, `ui.ts`, `quote/page.tsx`, `package.json`, `app/documents/page.tsx`, `PageHeader`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `proposal-view.tsx`, `returns/types.ts`, `app/page.tsx`, `requireStaff`, `webhook.ts`, `structured-data.ts`, `tax-codes.ts`, `returns/load.ts`, `steps.ts`, `Card`, `arap.ts`, `lock-bar.tsx`, `year-end/page.tsx`, `pg`, `marketing/page.tsx`, `engine.ts`, `quote/page.tsx`, `payroll/payroll.test.ts`, `fixed-assets/page.tsx`, `morning.ts`, `idle-watcher.tsx`, `parties/[id]/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `workpapers/page.tsx`, `work/page.tsx`, `Centavos`, `documents/[id]/page.tsx`, `ledger/types.ts`, `report-periods.ts`, `december-rehearsal.test.ts`, `profile.ts`, `portal/page.tsx`, `opening.ts`, `[clientId]/page.tsx`, `fees/schedule.ts`, `cancel-server.ts`, `notifications/format.ts`, `batch/register.ts`, `layout.ts`, `read.test.ts`, `bir-filing-calendar/page.tsx`, `mime.ts`, `app/settings/page.tsx`, `ocr/run.ts`, `leads/[id]/page.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `calendar/page.tsx`, `onboarding/checklist.ts`, `safeguards.ts`, `quote.ts`, `server-only`, `app/layout.tsx`, `template.ts`, `formatAmount`, `status.ts`, `ledger.test.ts`, `split-bundled-pdfs.test.ts`, `social-button.tsx`, `move-bar.tsx`, `clients/[id]/page.tsx`, `books-2307.test.ts`, `calendar/staff.ts`, `leads-pipeline.test.ts`, `notifications.test.ts`, `register/page.tsx`, `portal-statements-approval.test.ts`, `getIdentity`, `telegram-uploads.test.ts`, `catch-up.test.ts`, `documents/labels.ts`, `acting-approver.test.ts`, `names.ts`, `returns-sign-off.test.ts`, `tests/parties.test.ts`, `lead-attribution.test.ts`, `register-books.test.ts`, `adjustments.test.ts`, `filed-returns.ts`, `contact-access.test.ts`, `rates.ts`, `tests/proposal-email.test.ts`, `approve-and-post.test.ts`, `batch-upload.test.ts`, `parallel-run.test.ts`, `ref_node_fs`, `books-migration.test.ts`, `fixed-assets.test.ts`, `tests/books.test.ts`, `returns-books.test.ts`, `Badge`, `review-form.tsx`, `contribution-remittances.test.ts`, `tests/register.test.ts`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1110204081632653 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `quote/page.tsx`, `package.json`, `next`, `app/documents/page.tsx`, `PageHeader`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `proposal-view.tsx`, `[month]/page.tsx`, `modal.tsx`, `app/page.tsx`, `supabaseAdmin`, `button.tsx`, `requireStaff`, `cx`, `structured-data.ts`, `chrome.tsx`, `returns/load.ts`, `steps.ts`, `Card`, `lock-bar.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `stat-cards.tsx`, `command-search.tsx`, `idle-watcher.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `module-pages.tsx`, `cx`, `react`, `portalContext`, `notification-settings-view.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `workpapers/page.tsx`, `work/page.tsx`, `payroll/data.ts`, `LinkButton`, `Centavos`, `ledger/data.ts`, `combobox.tsx`, `site-document.tsx`, `documents/[id]/page.tsx`, `leads/actions.ts`, `profile.ts`, `portal/page.tsx`, `[clientId]/page.tsx`, `proposal/[token]/page.tsx`, `documents/actions.ts`, `proof-upload.tsx`, `manilaToday`, `mime.ts`, `app/settings/page.tsx`, `leads/[id]/page.tsx`, `blocks.tsx`, `supabaseServer`, `social-button.tsx`, `app/settings/notifications/page.tsx`, `calendar/page.tsx`, `payroll/forms.tsx`, `portal/reports/cwt-2307/page.tsx`, `app/layout.tsx`, `template.ts`, `[slug]/page.tsx`, `formatAmount`, `social-button.tsx`, `move-bar.tsx`, `Review`, `clients/[id]/page.tsx`, `calendar/staff.ts`, `fixed-assets/forms.tsx`, `register/page.tsx`, `getIdentity`, `deadlines/actions.ts`, `documents/labels.ts`, `notification-bell.tsx`, `filed-returns.ts`, `Badge`, `review-form.tsx`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03333333333333333 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `form-2307.ts`, `ui.ts`, `quote/page.tsx`, `package.json`, `app/documents/page.tsx`, `PageHeader`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `[month]/page.tsx`, `app/page.tsx`, `supabaseAdmin`, `requireStaff`, `webhook.ts`, `cx`, `structured-data.ts`, `chrome.tsx`, `returns/load.ts`, `steps.ts`, `Card`, `lock-bar.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `command-search.tsx`, `idle-watcher.tsx`, `parties/[id]/page.tsx`, `module-pages.tsx`, `lib/books/actions.ts`, `react`, `portalContext`, `intake-picker.tsx`, `form-2316.tsx`, `workpapers/page.tsx`, `work/page.tsx`, `payroll/data.ts`, `LinkButton`, `Centavos`, `ledger/data.ts`, `site-document.tsx`, `documents/[id]/page.tsx`, `ledger/types.ts`, `leads/actions.ts`, `report-periods.ts`, `profile.ts`, `portal/page.tsx`, `[clientId]/page.tsx`, `proposal/[token]/page.tsx`, `documents/actions.ts`, `proof-upload.tsx`, `batch/register.ts`, `manilaToday`, `filings/actions.ts`, `mime.ts`, `app/settings/page.tsx`, `react`, `leads/[id]/page.tsx`, `blocks.tsx`, `supabaseServer`, `app/settings/notifications/page.tsx`, `calendar/page.tsx`, `payroll/forms.tsx`, `portal/reports/cwt-2307/page.tsx`, `server-only`, `app/layout.tsx`, `template.ts`, `[slug]/page.tsx`, `formatAmount`, `social-button.tsx`, `move-bar.tsx`, `Review`, `clients/[id]/page.tsx`, `calendar/staff.ts`, `fixed-assets/forms.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `getIdentity`, `deadlines/actions.ts`, `documents/labels.ts`, `notification-bell.tsx`, `filed-returns.ts`, `Badge`, `review-form.tsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._