# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1023 files · ~852,294 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6258 nodes · 22316 edges · 209 communities (181 shown, 28 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `76181777`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- params.ts
- package.json
- auth.ts
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
- fees/types.ts
- returns/types.ts
- ref_node_fs
- register-xlsx.ts
- modal.tsx
- app/page.tsx
- scripts
- supabaseAdmin
- button.tsx
- remittances/[id]/page.tsx
- webhook.ts
- qap.ts
- binder/page.tsx
- tax-codes.ts
- proposal-view.tsx
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
- settlement-pages.tsx
- [id]/books/page.tsx
- workpapers/load.ts
- parties/[id]/page.tsx
- how-we-work/page.tsx
- module-pages.tsx
- cx
- Pro components
- lib/books/actions.ts
- react
- portal/reports/page.tsx
- portal-billing.test.ts
- theme-toggle.tsx
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
- year.ts
- ledger/types.ts
- leads/actions.ts
- [month]/page.tsx
- december-rehearsal.test.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- opening.ts
- [clientId]/page.tsx
- portalContext
- apply-migrations.sh
- fees/schedule.ts
- brand/forms.tsx
- cancel-server.ts
- requireStaff
- showDate
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- filings/actions.ts
- holiday-list.ts
- read.test.ts
- return-file-actions.ts
- mime.ts
- app/settings/page.tsx
- Skeleton
- ocr/run.ts
- public.ts
- blocks.tsx
- supabaseServer
- ticked-allocation.test.ts
- memo.ts
- addDays
- calendar/page.tsx
- payroll/forms.tsx
- lock.ts
- safeguards.ts
- quote.ts
- payroll/types.ts
- dispatch.ts
- app/layout.tsx
- template.ts
- transactions-actions.ts
- formatAmount
- cycle/actions.ts
- ledger.test.ts
- xlsx.ts
- social-button.tsx
- move-bar.tsx
- documents/[id]/page.tsx
- batch/actions.ts
- grid.ts
- clients/[id]/page.tsx
- next
- Rework: one flow from lead to year-end
- calendar/staff.ts
- fixed-assets/forms.tsx
- books/periods.ts
- SourceDocument
- register/page.tsx
- opengraph-image.tsx
- items.ts
- getIdentity
- server-only
- deadlines/actions.ts
- Building UIs with BoardUI
- cycle/page.tsx
- notification-bell.tsx
- acting-approver.test.ts
- fields.ts
- returns-sign-off.test.ts
- db.test.ts
- lead-attribution.test.ts
- ledger-lock.test.ts
- workpapers.test.ts
- filed-returns.ts
- contact-access.test.ts
- rates.ts
- tests/proposal-email.test.ts
- funnel.test.ts
- late-surcharges.test.ts
- parallel-run.test.ts
- registration.test.ts
- vitest
- books-migration.test.ts
- post-button.tsx
- fixed-assets.test.ts
- tests/books.test.ts
- ledger-closing.test.ts
- returns-books.test.ts
- tasks-and-request-owners.test.ts
- books-lock.test.ts
- Badge
- review-form.tsx
- contribution-payables.test.ts
- year-end.test.ts
- templates/README.md
- toCentavos
- engine.test.ts
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

## Communities (209 total, 28 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (42): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page() (+34 more)

### Community 1 - "index.ts"
Cohesion: 0.05
Nodes (22): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+14 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.09
Nodes (38): MonthSelect(), KINDS, TransactionJournal(), SegmentedControl(), SegmentedControlItem(), AllocationRow, InvoiceLineRow, InvoiceRow (+30 more)

### Community 4 - "params.ts"
Cohesion: 0.26
Nodes (11): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+3 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "auth.ts"
Cohesion: 0.12
Nodes (29): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+21 more)

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
Cohesion: 0.12
Nodes (30): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending() (+22 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "PageHeader"
Cohesion: 0.11
Nodes (38): ClientList(), ClientsPage(), Row, SORTS, STATUS_GROUPS, Contacts(), ContactsPage(), SORTS (+30 more)

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
Nodes (37): FinancialStatementsView(), StatementTable(), PrintButton(), defaultCashFlow(), statementsFrom(), FsLineKey, Section, add() (+29 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (65): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+57 more)

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
Nodes (47): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary() (+39 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.07
Nodes (51): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+43 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (67): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+59 more)

### Community 43 - "fees/types.ts"
Cohesion: 0.09
Nodes (31): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, JOB_GROUPS, JobBand (+23 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.04
Nodes (75): PayrollClient, PayrollContext, client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q (+67 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.05
Nodes (13): ctx, input, api, ctx, fn, rows, src, root (+5 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.13
Nodes (27): GET(), safe(), buildEmployeeTemplate(), sortItems(), draftToTemplate(), CheckedRegister, checkRegister(), fmt() (+19 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (46): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), globalSearch(), SearchHit (+38 more)

### Community 48 - "app/page.tsx"
Cohesion: 0.14
Nodes (25): FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), UnlockRequests() (+17 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.12
Nodes (36): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), cancelMyMeetingAction(), Book() (+28 more)

### Community 51 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.14
Nodes (34): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+26 more)

### Community 53 - "webhook.ts"
Cohesion: 0.11
Nodes (41): ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF, CODES (+33 more)

### Community 54 - "qap.ts"
Cohesion: 0.12
Nodes (34): branch4(), branchOfTin(), HEAD_OFFICE, ParsedTin, payeeKeyOf(), tinDigits(), tinHasBranch(), alphaCols() (+26 more)

### Community 55 - "binder/page.tsx"
Cohesion: 0.39
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, SIGNED_REFS

### Community 56 - "tax-codes.ts"
Cohesion: 0.11
Nodes (26): blankLine(), InvoiceForm(), InvoiceFormValue, SettingsPage(), SettingsRoute(), InvoiceInput, loadTaxCodes(), appliesTo() (+18 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.19
Nodes (15): PriceRow, jobName(), lineName(), longDate(), money(), php, ProposalView(), Rows() (+7 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.08
Nodes (49): GET(), Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet() (+41 more)

### Community 59 - "steps.ts"
Cohesion: 0.04
Nodes (127): addStepFile(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction() (+119 more)

### Community 60 - "Card"
Cohesion: 0.11
Nodes (36): ClientReturnsPage(), Returns(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup() (+28 more)

### Community 61 - "arap.ts"
Cohesion: 0.17
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), CashAccount, checkUpdate(), OpenItem, accounts (+10 more)

### Community 62 - "lock-bar.tsx"
Cohesion: 0.16
Nodes (21): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+13 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (29): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+21 more)

### Community 64 - "pg"
Cohesion: 0.05
Nodes (10): pg, root, root, root, root, root, root, Row (+2 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (65): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), CreateLinkForm(), N() (+57 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.11
Nodes (37): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, DueRule, EfpsGroup, FilingChannel (+29 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.11
Nodes (39): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+31 more)

### Community 70 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (44): GridRow, MonthGrid(), toInput(), AlphaCols, buildAlphalist(), form2316(), Form2316Employer, mmdd() (+36 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.19
Nodes (35): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+27 more)

### Community 72 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (19): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), loadAssets(), Row (+11 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.10
Nodes (54): tin9(), tinDashed(), annualAttachments(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS (+46 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "settlement-pages.tsx"
Cohesion: 0.11
Nodes (26): PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage(), ReceiptsViewPage() (+18 more)

### Community 78 - "[id]/books/page.tsx"
Cohesion: 0.17
Nodes (25): booksContext(), booksViewFor(), fmtMonth(), one(), BooksFrame(), WithdrawReportButton(), ReportsIndex(), BooksSummaryPage() (+17 more)

### Community 79 - "workpapers/load.ts"
Cohesion: 0.12
Nodes (22): buildYear(), month1601C(), RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile (+14 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (46): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), fmtDate(), PartyDetail(), PartyPage() (+38 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "module-pages.tsx"
Cohesion: 0.13
Nodes (21): SearchParams, BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), JournalEntryRoute(), JournalRoute() (+13 more)

### Community 83 - "cx"
Cohesion: 0.03
Nodes (90): ClientTab, UNDER, UserMenu(), switchBusinessAction(), BusinessSwitcher(), SwitcherBusiness, ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE (+82 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (24): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+16 more)

### Community 86 - "react"
Cohesion: 0.05
Nodes (139): react, BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+131 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.10
Nodes (58): PortalClient, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker(), basePeriod() (+50 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.13
Nodes (24): outDir, pkgDir, require, { version }, Adjuster(), DocumentScanner(), capture(), saveScan() (+16 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 94 - "work/page.tsx"
Cohesion: 0.09
Nodes (52): RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks() (+44 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.13
Nodes (33): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Certificates2316, certificatesFromRaw(), Form2316Signatory, paidInYear() (+25 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "LinkButton"
Cohesion: 0.21
Nodes (17): Batch(), BatchPage(), one(), toCentavos(), Print(), Print2307Page(), PrintAll(), PrintAll2316Page() (+9 more)

### Community 100 - "Centavos"
Cohesion: 0.05
Nodes (59): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BatchCheck, AgingRow (+51 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.10
Nodes (39): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+31 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (74): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItem(), ComboBoxItemProps, ComboBoxProps, ComboBoxSection() (+66 more)

### Community 103 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 106 - "year.ts"
Cohesion: 0.13
Nodes (21): AlphalistRow, MonthLines, Suggestion, DraftIssue, draftSchema, initialDraft(), digits(), editDistance() (+13 more)

### Community 107 - "ledger/types.ts"
Cohesion: 0.08
Nodes (36): Accounts(), AccountsPage(), GROUPS, Access, OpeningChecklist(), STATUS, CASH_FLOW_CLASSES, CashFlowClass (+28 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.13
Nodes (31): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+23 more)

### Community 109 - "[month]/page.tsx"
Cohesion: 0.18
Nodes (16): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+8 more)

### Community 110 - "december-rehearsal.test.ts"
Cohesion: 0.08
Nodes (18): as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll() (+10 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.08
Nodes (39): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), birSchema, blank() (+31 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "opening.ts"
Cohesion: 0.17
Nodes (17): checkOpening(), fmt(), ItemRow, OpeningItem, openingPayload(), sheetOf(), TbRow, accounts (+9 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.09
Nodes (44): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+36 more)

### Community 116 - "portalContext"
Cohesion: 0.09
Nodes (34): Row, accessFor(), portalContext, decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page() (+26 more)

### Community 118 - "fees/schedule.ts"
Cohesion: 0.12
Nodes (24): ProposalSetup, JobOption, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num() (+16 more)

### Community 119 - "brand/forms.tsx"
Cohesion: 0.17
Nodes (19): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+11 more)

### Community 120 - "cancel-server.ts"
Cohesion: 0.25
Nodes (13): calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail(), manilaWhen(), MAX_CANCEL_REASON, cancelClientMeeting() (+5 more)

### Community 121 - "requireStaff"
Cohesion: 0.10
Nodes (42): addClientNoteAction(), NoteState, markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, NewParty(), NewPartyPage(), Rematch2307Button() (+34 more)

### Community 122 - "showDate"
Cohesion: 0.12
Nodes (30): CatchUpRow, CatchUpSection(), Queue(), ReviewPage(), Row, Section(), ActingState, appointActingAction() (+22 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.14
Nodes (17): BATCH_COLUMNS, BATCH_KINDS, BatchAccount, BatchColumn, centavosOf(), checkRow(), findAccount(), isoDate() (+9 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.10
Nodes (39): Detail(), StatementPage(), metadata, Shared(), SharedStatementPage(), Detail(), PortalStatementDetail(), Billing() (+31 more)

### Community 126 - "filings/actions.ts"
Cohesion: 0.18
Nodes (19): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+11 more)

### Community 127 - "holiday-list.ts"
Cohesion: 0.26
Nodes (10): easterSunday(), HolidayKind, HolidayRule, iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+2 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (75): applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), SPREADSHEET_TYPES, PayrollItem (+67 more)

### Community 129 - "return-file-actions.ts"
Cohesion: 0.24
Nodes (18): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+10 more)

### Community 130 - "mime.ts"
Cohesion: 0.14
Nodes (28): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, accessToken(), call(), findReplies(), headerOf() (+20 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.09
Nodes (47): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+39 more)

### Community 132 - "Skeleton"
Cohesion: 0.09
Nodes (36): BankAccountsRoute(), fmtDate(), CustomersRoute(), INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind (+28 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (45): MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+37 more)

### Community 134 - "public.ts"
Cohesion: 0.13
Nodes (22): acceptProposalAction(), AcceptState, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+14 more)

### Community 135 - "blocks.tsx"
Cohesion: 0.05
Nodes (97): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+89 more)

### Community 136 - "supabaseServer"
Cohesion: 0.05
Nodes (93): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setCatchUpAction() (+85 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "memo.ts"
Cohesion: 0.17
Nodes (14): ReviewNote, approvalMemo(), Memo, MemoInput, MemoMonth, ALWAYS, REFS_FOR_FORM, refsToSign() (+6 more)

### Community 139 - "addDays"
Cohesion: 0.18
Nodes (16): addDays(), parseIso(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 140 - "calendar/page.tsx"
Cohesion: 0.27
Nodes (16): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant(), appBookedEvents(), addDays() (+8 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (53): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+45 more)

### Community 142 - "lock.ts"
Cohesion: 0.16
Nodes (11): amount(), INCOME_TAX, LockFiling, lockFormsFor(), lockingFiling(), lockKind(), PAYROLL, PURCHASES (+3 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.11
Nodes (29): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+21 more)

### Community 144 - "quote.ts"
Cohesion: 0.10
Nodes (42): EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+34 more)

### Community 145 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 146 - "dispatch.ts"
Cohesion: 0.07
Nodes (56): GET(), GET(), GET(), digestMessage(), DigestRow, longDay(), peso, time() (+48 more)

### Community 147 - "app/layout.tsx"
Cohesion: 0.08
Nodes (43): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+35 more)

### Community 148 - "template.ts"
Cohesion: 0.11
Nodes (21): PRICE_SECTIONS, priceSection(), PriceSectionKey, AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL (+13 more)

### Community 149 - "transactions-actions.ts"
Cohesion: 0.30
Nodes (14): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+6 more)

### Community 150 - "formatAmount"
Cohesion: 0.24
Nodes (13): Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set(), padded(), PartyFields() (+5 more)

### Community 151 - "cycle/actions.ts"
Cohesion: 0.25
Nodes (13): MonthComplete(), SentRow, StandingRow, TimelineRow, closeCycleAction(), confirmMonthAction(), CycleState, decideExceptionAction() (+5 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "xlsx.ts"
Cohesion: 0.26
Nodes (12): GET(), safe(), loadAccounts(), accountLabel(), buildBatchTemplate(), cellText(), MAX_ROWS, norm() (+4 more)

### Community 154 - "social-button.tsx"
Cohesion: 0.10
Nodes (28): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+20 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (43): @remixicon/react, Doc, DocumentsCard(), when(), ExceptionRow, addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf() (+35 more)

### Community 157 - "batch/actions.ts"
Cohesion: 0.26
Nodes (11): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), loadBatchContext(), monthsBetween(), BatchContext (+3 more)

### Community 158 - "grid.ts"
Cohesion: 0.24
Nodes (11): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+3 more)

### Community 159 - "clients/[id]/page.tsx"
Cohesion: 0.05
Nodes (69): ClientTabs(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), NotesCard(), ClientNoteForm(), addClientFile(), KINDS (+61 more)

### Community 160 - "next"
Cohesion: 0.08
Nodes (23): nextConfig, next, CELL, FirmParallelRunPage(), monthShort(), Summary(), GET(), GET() (+15 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.10
Nodes (41): cancelMeetingAction(), disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState() (+33 more)

### Community 163 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm()

### Community 164 - "books/periods.ts"
Cohesion: 0.36
Nodes (7): BooksMonthRow, BOOKS_MONTH_STATUS_LABELS, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 165 - "SourceDocument"
Cohesion: 0.25
Nodes (6): SaleSplit, SawtResult, Split, EwtLine, ListedDocument, SourceDocument

### Community 166 - "register/page.tsx"
Cohesion: 0.13
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "items.ts"
Cohesion: 0.25
Nodes (8): BirCategory, Category, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ItemKind, KIND_ORDER, AmountField

### Community 169 - "getIdentity"
Cohesion: 0.06
Nodes (64): zod@^4.6.7, zod, file(), amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh() (+56 more)

### Community 170 - "server-only"
Cohesion: 0.14
Nodes (14): server-only, @supabase/supabase-js, maxDuration, POST(), contactLogin(), grantClientAccess(), GrantInput, linkContact() (+6 more)

### Community 171 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 172 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 173 - "cycle/page.tsx"
Cohesion: 0.14
Nodes (25): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CloseCycleButton(), Message(), NothingToSubmitButton() (+17 more)

### Community 174 - "notification-bell.tsx"
Cohesion: 0.04
Nodes (100): GET(), SheetPreview(), Content(), NotificationsPage(), emit(), listeners, markReadLocally(), notifyNotificationsChanged() (+92 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fields.ts"
Cohesion: 0.11
Nodes (26): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+18 more)

### Community 177 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 181 - "workpapers.test.ts"
Cohesion: 0.40
Nodes (4): LedgerTotals, as(), bookedDoc(), root

### Community 182 - "filed-returns.ts"
Cohesion: 0.16
Nodes (13): describeDue(), FREQUENCY_SECTIONS, ordinal(), periodWord, TAX_TYPE_GROUPS, taxTypeOfForm(), FiledFileRow, FiledReturn (+5 more)

### Community 184 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 186 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 188 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 190 - "vitest"
Cohesion: 0.04
Nodes (20): vitest, dir, root, Data, root, Row, root, root (+12 more)

### Community 191 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 193 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 194 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 199 - "Badge"
Cohesion: 0.06
Nodes (53): FilingRow, FilingListRow, SignOffState, amt(), ApprovalMemo(), Db, TIE, bookKind (+45 more)

### Community 200 - "review-form.tsx"
Cohesion: 0.07
Nodes (50): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+42 more)

### Community 208 - "toCentavos"
Cohesion: 0.20
Nodes (15): PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview(), peso(), ReadItem, addTotals(), checkTotals() (+7 more)

### Community 209 - "engine.test.ts"
Cohesion: 0.18
Nodes (11): DeadlineRule, Obligation, dueDates(), none, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026 (+3 more)

### Community 214 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 224 - "tests/register.test.ts"
Cohesion: 0.40
Nodes (4): DocumentRow, approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1660 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `ui.ts`, `params.ts`, `package.json`, `app/documents/page.tsx`, `PageHeader`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `fees/types.ts`, `returns/types.ts`, `ref_node_fs`, `app/page.tsx`, `supabaseAdmin`, `remittances/[id]/page.tsx`, `webhook.ts`, `tax-codes.ts`, `returns/load.ts`, `steps.ts`, `Card`, `arap.ts`, `lock-bar.tsx`, `year-end/page.tsx`, `pg`, `marketing/page.tsx`, `engine.ts`, `testing.ts`, `payroll/payroll.test.ts`, `fixed-assets/page.tsx`, `workpapers/load.ts`, `parties/[id]/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `work/page.tsx`, `Centavos`, `ledger/types.ts`, `leads/actions.ts`, `[month]/page.tsx`, `december-rehearsal.test.ts`, `profile.ts`, `portal/page.tsx`, `opening.ts`, `[clientId]/page.tsx`, `portalContext`, `fees/schedule.ts`, `cancel-server.ts`, `showDate`, `batch/register.ts`, `holiday-list.ts`, `read.test.ts`, `mime.ts`, `app/settings/page.tsx`, `Skeleton`, `ocr/run.ts`, `public.ts`, `blocks.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `memo.ts`, `addDays`, `calendar/page.tsx`, `lock.ts`, `safeguards.ts`, `quote.ts`, `dispatch.ts`, `app/layout.tsx`, `template.ts`, `formatAmount`, `ledger.test.ts`, `social-button.tsx`, `move-bar.tsx`, `clients/[id]/page.tsx`, `calendar/staff.ts`, `books/periods.ts`, `SourceDocument`, `register/page.tsx`, `server-only`, `cycle/page.tsx`, `notification-bell.tsx`, `acting-approver.test.ts`, `fields.ts`, `returns-sign-off.test.ts`, `db.test.ts`, `lead-attribution.test.ts`, `ledger-lock.test.ts`, `workpapers.test.ts`, `filed-returns.ts`, `contact-access.test.ts`, `rates.ts`, `tests/proposal-email.test.ts`, `funnel.test.ts`, `late-surcharges.test.ts`, `parallel-run.test.ts`, `registration.test.ts`, `books-migration.test.ts`, `fixed-assets.test.ts`, `tests/books.test.ts`, `ledger-closing.test.ts`, `returns-books.test.ts`, `tasks-and-request-owners.test.ts`, `books-lock.test.ts`, `Badge`, `review-form.tsx`, `contribution-payables.test.ts`, `year-end.test.ts`, `engine.test.ts`, `contribution-remittances.test.ts`, `tests/register.test.ts`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10595065312046444 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `form-2307.ts`, `ui.ts`, `package.json`, `auth.ts`, `app/documents/page.tsx`, `PageHeader`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `register-xlsx.ts`, `modal.tsx`, `app/page.tsx`, `supabaseAdmin`, `remittances/[id]/page.tsx`, `binder/page.tsx`, `returns/load.ts`, `steps.ts`, `Card`, `lock-bar.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `settlement-pages.tsx`, `[id]/books/page.tsx`, `parties/[id]/page.tsx`, `module-pages.tsx`, `cx`, `lib/books/actions.ts`, `react`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `workpapers/page.tsx`, `work/page.tsx`, `payroll/data.ts`, `LinkButton`, `Centavos`, `ledger/data.ts`, `site-document.tsx`, `ledger/types.ts`, `leads/actions.ts`, `[month]/page.tsx`, `profile.ts`, `portal/page.tsx`, `[clientId]/page.tsx`, `portalContext`, `brand/forms.tsx`, `requireStaff`, `showDate`, `manilaToday`, `filings/actions.ts`, `read.test.ts`, `return-file-actions.ts`, `mime.ts`, `app/settings/page.tsx`, `Skeleton`, `public.ts`, `blocks.tsx`, `supabaseServer`, `calendar/page.tsx`, `payroll/forms.tsx`, `quote.ts`, `dispatch.ts`, `app/layout.tsx`, `transactions-actions.ts`, `formatAmount`, `cycle/actions.ts`, `xlsx.ts`, `social-button.tsx`, `move-bar.tsx`, `documents/[id]/page.tsx`, `batch/actions.ts`, `clients/[id]/page.tsx`, `calendar/staff.ts`, `fixed-assets/forms.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `getIdentity`, `server-only`, `deadlines/actions.ts`, `cycle/page.tsx`, `notification-bell.tsx`, `post-button.tsx`, `Badge`, `review-form.tsx`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04541062801932367 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `auth.ts`, `app/documents/page.tsx`, `PageHeader`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `fees/types.ts`, `modal.tsx`, `app/page.tsx`, `supabaseAdmin`, `button.tsx`, `remittances/[id]/page.tsx`, `binder/page.tsx`, `tax-codes.ts`, `returns/load.ts`, `steps.ts`, `Card`, `lock-bar.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `stat-cards.tsx`, `settlement-pages.tsx`, `[id]/books/page.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `module-pages.tsx`, `cx`, `portal/reports/page.tsx`, `theme-toggle.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `workpapers/page.tsx`, `work/page.tsx`, `payroll/data.ts`, `LinkButton`, `Centavos`, `ledger/data.ts`, `combobox.tsx`, `site-document.tsx`, `ledger/types.ts`, `leads/actions.ts`, `[month]/page.tsx`, `profile.ts`, `portal/page.tsx`, `[clientId]/page.tsx`, `portalContext`, `brand/forms.tsx`, `requireStaff`, `showDate`, `manilaToday`, `return-file-actions.ts`, `app/settings/page.tsx`, `Skeleton`, `blocks.tsx`, `supabaseServer`, `calendar/page.tsx`, `payroll/forms.tsx`, `quote.ts`, `app/layout.tsx`, `transactions-actions.ts`, `formatAmount`, `cycle/actions.ts`, `social-button.tsx`, `move-bar.tsx`, `documents/[id]/page.tsx`, `clients/[id]/page.tsx`, `next`, `calendar/staff.ts`, `fixed-assets/forms.tsx`, `register/page.tsx`, `getIdentity`, `deadlines/actions.ts`, `cycle/page.tsx`, `notification-bell.tsx`, `post-button.tsx`, `Badge`, `review-form.tsx`, `toCentavos`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._