# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 948 files · ~771,076 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5871 nodes · 20787 edges · 189 communities (171 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 184 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `3f2d8274`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- workpapers.test.ts
- migrate.yml
- ui.ts
- public.ts
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- LinkButton
- Sign-in & Setup Docs
- cx
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- ledger/data.ts
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
- payroll/types.ts
- link-button.tsx
- requireStaff
- payroll/forms.tsx
- modal.tsx
- form.tsx
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- remittances/[id]/page.tsx
- webhook.ts
- module-pages.tsx
- deadlines/page.tsx
- marketing/page.tsx
- PageHeader
- money.ts
- filings/run.ts
- params.ts
- books/export/route.ts
- safeguards.ts
- lock-bar.tsx
- idle-watcher.tsx
- invoice-pages.tsx
- Apple Design
- addDays
- testing.ts
- Select
- lib/books/actions.ts
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- react
- @remixicon/react
- ref_node_fs
- filings/actions.ts
- how-we-work/page.tsx
- leads/[id]/page.tsx
- app/settings/page.tsx
- Pro components
- parties/parties.test.ts
- Button
- portalContext
- portal-billing.test.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- Centavos
- Badge
- Recipes
- ledger/data.ts
- BoardUI theming reference
- Pro templates
- review-form.tsx
- Centavos
- opening-checklist.tsx
- cx
- rates.ts
- boardui
- percentage.ts
- showDate
- filings/[id]/page.tsx
- cycle/page.tsx
- upload/page.tsx
- ref_node_path
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- Field
- google/calendar.ts
- apply-migrations.sh
- ocr/run.ts
- quote.ts
- returns/load.ts
- work/load.ts
- layout.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- reports/books/print/page.tsx
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- worksheet/page.tsx
- xlsx.ts
- gemini.ts
- fixed-assets/page.tsx
- site-document.tsx
- supabaseServer
- ticked-allocation.test.ts
- report-periods.ts
- bulk-actions.ts
- cwt-tracker-view.tsx
- 2316/page.tsx
- statement-view.tsx
- IsoDate
- receipts.ts
- formatAmount
- server-only
- opening.ts
- proof-upload.tsx
- [id]/books/page.tsx
- blocks.tsx
- batch/forms.tsx
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- app/documents/page.tsx
- brand/forms.tsx
- template.ts
- leads/forms.tsx
- app/page.tsx
- proof-actions.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- periods
- binder/page.tsx
- register/page.tsx
- opengraph-image.tsx
- documents/labels.ts
- tieouts.test.ts
- Notice
- cwt-match.tsx
- Textarea
- BoardUI page patterns
- documents/period.ts
- acting-approver.test.ts
- messages.ts
- sign-in-form.tsx
- tests/register.test.ts
- post-button.tsx
- grid.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- source.ts
- funnel.test.ts
- fees.test.ts
- cwt-2307-tracker.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 362 edges
2. `cx` - 300 edges
3. `react` - 269 edges
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

## Communities (189 total, 18 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (54): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print() (+46 more)

### Community 1 - "workpapers.test.ts"
Cohesion: 0.06
Nodes (25): BOOK_LOCK_FORMS, as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth() (+17 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.06
Nodes (61): blankLine(), InvoiceForm(), InvoiceFormValue, fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, BookingFields() (+53 more)

### Community 4 - "public.ts"
Cohesion: 0.13
Nodes (15): acceptProposalAction(), AcceptState, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, brandSchedule(), contentHash() (+7 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (30): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+22 more)

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

### Community 11 - "LinkButton"
Cohesion: 0.15
Nodes (16): Batch(), BatchPage(), one(), toCentavos(), NewEntry(), NewEntryPage(), MonthSelect(), SegmentedControl() (+8 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.03
Nodes (96): react-dom@19.3.0, react-dom, NotificationFilterTabs(), NotificationRowData, AvatarColor, AvatarProps, AvatarSize, styles (+88 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+12 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "ledger/data.ts"
Cohesion: 0.08
Nodes (42): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), statementsFrom(), FsLineKey, Section (+34 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.11
Nodes (50): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+42 more)

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
Cohesion: 0.07
Nodes (57): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+49 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (20): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+12 more)

### Community 44 - "link-button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "requireStaff"
Cohesion: 0.09
Nodes (51): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+43 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.06
Nodes (88): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+80 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "form.tsx"
Cohesion: 0.13
Nodes (35): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+27 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (31): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+23 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.07
Nodes (63): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), activateAction(), createFromTemplateAction() (+55 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.09
Nodes (61): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+53 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (33): maxDuration, POST(), CLIENT_DOC_TYPES, TelegramEnv, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS (+25 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.15
Nodes (32): BankAccountsRoute(), booksContext(), fmtDate(), BooksFrame(), BooksList(), Column, ListRow, RowLink() (+24 more)

### Community 55 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 56 - "marketing/page.tsx"
Cohesion: 0.09
Nodes (31): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+23 more)

### Community 57 - "PageHeader"
Cohesion: 0.05
Nodes (87): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+79 more)

### Community 58 - "money.ts"
Cohesion: 0.05
Nodes (73): ParallelBooksRow, SaleSplit, differsFromSuggestion(), enteredNet(), client, row(), SawtResult, Split (+65 more)

### Community 59 - "filings/run.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 60 - "params.ts"
Cohesion: 0.26
Nodes (11): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+3 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.15
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+10 more)

### Community 62 - "safeguards.ts"
Cohesion: 0.09
Nodes (39): SafeguardsNotice(), Gap, isWeekend(), line(), longDay(), NEEDS, ownerEmail(), shortDay() (+31 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.11
Nodes (31): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+23 more)

### Community 64 - "idle-watcher.tsx"
Cohesion: 0.14
Nodes (24): POST(), errors, Form(), LoginPage(), notices, ACTIVITY, IdleWatcher(), readCookie() (+16 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.09
Nodes (44): SearchParams, INVOICE_KINDS, InvoiceView(), Kind, Props, STATUS_TONE, PaymentsEditPage(), ReceiptsNewPage() (+36 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "addDays"
Cohesion: 0.08
Nodes (50): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+42 more)

### Community 68 - "testing.ts"
Cohesion: 0.12
Nodes (21): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+13 more)

### Community 69 - "Select"
Cohesion: 0.05
Nodes (73): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+65 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (40): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+32 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.08
Nodes (65): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+57 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.10
Nodes (37): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Certificates2316, certificatesFromRaw(), Form2316Employer, Form2316Signatory (+29 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.14
Nodes (40): costsOf(), salesOf(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow, branchCode() (+32 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (45): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+37 more)

### Community 77 - "react"
Cohesion: 0.06
Nodes (44): react, EmployeesRoute(), InvoiceEdit(), JournalEntryRoute(), JournalRoute(), PaymentsNewPage(), PaymentsListPage(), PaymentsViewPage() (+36 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.08
Nodes (46): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+38 more)

### Community 79 - "ref_node_fs"
Cohesion: 0.03
Nodes (26): outDir, pkgDir, require, { version }, ctx, input, api, ctx (+18 more)

### Community 80 - "filings/actions.ts"
Cohesion: 0.24
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.13
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (31): NotesCard(), FunnelSwitch(), bookedTime, Lead(), LeadPage(), LeadTouch, Person, day() (+23 more)

### Community 83 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (29): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+21 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "parties/parties.test.ts"
Cohesion: 0.17
Nodes (16): displayName(), fullAddress(), listNameCols(), Party, partyTinLabel(), person, ABBREVIATIONS, fillFromDirectory() (+8 more)

### Community 86 - "Button"
Cohesion: 0.17
Nodes (22): AmendmentDecision(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload(), PermitForm() (+14 more)

### Community 87 - "portalContext"
Cohesion: 0.12
Nodes (42): PortalClient, portalContext(), Books(), PortalBooks(), PortalCwt2307Page(), Tracker(), BooksSection(), NavRow() (+34 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.12
Nodes (28): amt(), ApprovalMemo(), Db, TIE, RegisterLine, Adjustment, c(), loadPeriodFile() (+20 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 93 - "Centavos"
Cohesion: 0.05
Nodes (94): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+86 more)

### Community 94 - "Badge"
Cohesion: 0.08
Nodes (53): ClientList(), ClientsPage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey (+45 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "ledger/data.ts"
Cohesion: 0.17
Nodes (17): Released, accountFromRow(), Amendment, AmendmentStatus, bookEntryFromRow(), BooksClient, BooksMonth, cents() (+9 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.07
Nodes (41): Booking, DirectoryParty, ENTRY_STATUS, fmtDay(), fmtMonthOf(), ONLY_FOR, typeLabel, PendingRow (+33 more)

### Community 100 - "Centavos"
Cohesion: 0.07
Nodes (46): dayBefore(), GET(), safe(), fromWorkbookData(), BOOK_ABBR, BookEntry, BookKind, BookLine (+38 more)

### Community 101 - "opening-checklist.tsx"
Cohesion: 0.17
Nodes (16): Access, STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput, ChecklistItem (+8 more)

### Community 102 - "cx"
Cohesion: 0.05
Nodes (70): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps, ComboBoxSelectionMode (+62 more)

### Community 103 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "percentage.ts"
Cohesion: 0.15
Nodes (20): form1701, form1702RT, inputs1701(), inputs1702RT(), penaltyInputs(), BUSINESS_TAX_FORMS, form1701Q, form1702Q (+12 more)

### Community 106 - "showDate"
Cohesion: 0.11
Nodes (30): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage() (+22 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (47): SignOffState, bookKind, BookRow, bookStatus, Event, eventText, Filing(), FilingFile (+39 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.11
Nodes (33): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+25 more)

### Community 109 - "upload/page.tsx"
Cohesion: 0.36
Nodes (10): Content(), NotificationSettingsPage(), TelegramLinkButton(), TelegramUnlinkButton(), telegramEnv(), LinkState, setTelegramEnabledAction(), telegramLinkAction() (+2 more)

### Community 110 - "ref_node_path"
Cohesion: 0.03
Nodes (49): pg, acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY (+41 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.10
Nodes (24): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+16 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.09
Nodes (39): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, TimelineRow (+31 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.11
Nodes (30): ClientTab, ClientTabs(), UNDER, FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE (+22 more)

### Community 115 - "Field"
Cohesion: 0.09
Nodes (50): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+42 more)

### Community 116 - "google/calendar.ts"
Cohesion: 0.11
Nodes (37): disconnectCalendarAction(), FormState, GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE (+29 more)

### Community 118 - "ocr/run.ts"
Cohesion: 0.20
Nodes (17): DocumentReviewPage(), Review(), runOcr(), runPendingOcr(), SKIP, lookupParties(), blank(), optionalText() (+9 more)

### Community 119 - "quote.ts"
Cohesion: 0.06
Nodes (63): PriceRow, corp, items, proposal(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+55 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.10
Nodes (28): withNonDeductible(), form1601C, form1604C, PAYROLL_FORMS, dayBefore(), FilingRow, listInvoices(), LoadedWorksheet (+20 more)

### Community 121 - "work/load.ts"
Cohesion: 0.18
Nodes (16): loadAssets(), Row, lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 122 - "layout.ts"
Cohesion: 0.12
Nodes (24): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+16 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.13
Nodes (20): accountLabel(), BatchAccount, BatchCheck, BatchColumn, BatchContext, BatchRow, centavosOf(), checkBatch() (+12 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.17
Nodes (15): credit(), ItemList(), proofMethod, VerifiedItems(), FirmBlock, AllocationRow, PaidItem, OpenStatementItem (+7 more)

### Community 126 - "reports/books/print/page.tsx"
Cohesion: 0.22
Nodes (13): BookPrint(), BookPrintPage(), PrintButton(), BookPrint(), PortalBookPrint(), LooseLeafHead, LooseLeafPages(), Pad() (+5 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.16
Nodes (19): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, PARTY_COLUMNS (+11 more)

### Community 128 - "read.test.ts"
Cohesion: 0.04
Nodes (106): BOOKED_TYPES, PayrollDocument(), applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap() (+98 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "worksheet/page.tsx"
Cohesion: 0.38
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 132 - "xlsx.ts"
Cohesion: 0.24
Nodes (12): GET(), safe(), loadAccounts(), BATCH_COLUMNS, BATCH_KINDS, buildBatchTemplate(), cellText(), MAX_ROWS (+4 more)

### Community 133 - "gemini.ts"
Cohesion: 0.11
Nodes (19): OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiJson(), call() (+11 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.12
Nodes (14): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), SiteNotFound(), geist (+6 more)

### Community 136 - "supabaseServer"
Cohesion: 0.05
Nodes (78): nextConfig, next, zod, addClientNoteAction(), addChargeAction(), applyCreditAction(), clearRemittedAction(), date (+70 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "report-periods.ts"
Cohesion: 0.29
Nodes (14): basePeriod(), HeldNote(), holdsWhat(), BooksYear, booksYears(), iso(), monthEnd(), monthsOfReport() (+6 more)

### Community 139 - "bulk-actions.ts"
Cohesion: 0.13
Nodes (23): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), DocumentCodes (+15 more)

### Community 140 - "cwt-tracker-view.tsx"
Cohesion: 0.27
Nodes (11): CwtLooseDocuments(), CwtTrackerGroups(), dateFmt, Figure(), money(), showDate(), showStamp(), stampFmt (+3 more)

### Community 141 - "2316/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 142 - "statement-view.tsx"
Cohesion: 0.32
Nodes (11): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), PaymentsList(), StatementView(), statusBadge (+3 more)

### Community 143 - "IsoDate"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 144 - "receipts.ts"
Cohesion: 0.22
Nodes (11): firmBlockLines(), formatTin(), cents(), CLIENT_MONEY_KINDS, FEE_KINDS, GrossReceiptsWatch, grossReceiptsWatch(), pesos() (+3 more)

### Community 145 - "formatAmount"
Cohesion: 0.12
Nodes (31): one(), Print(), Print2307Page(), ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff() (+23 more)

### Community 146 - "server-only"
Cohesion: 0.14
Nodes (32): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+24 more)

### Community 147 - "opening.ts"
Cohesion: 0.16
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+9 more)

### Community 148 - "proof-upload.tsx"
Cohesion: 0.29
Nodes (10): Detail(), PayNow(), METHODS, ProofUpload(), send(), startProofUpload(), submitProof(), PayAccount (+2 more)

### Community 149 - "[id]/books/page.tsx"
Cohesion: 0.23
Nodes (16): BooksContext, booksViewFor(), fmtMonth(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate(), lastMonth() (+8 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (98): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+90 more)

### Community 151 - "batch/forms.tsx"
Cohesion: 0.35
Nodes (9): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), loadBatchContext(), monthsBetween(), BatchKind (+1 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.12
Nodes (28): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+20 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.04
Nodes (94): GET(), SheetPreview(), Content(), PortalNotificationSettingsPage(), emit(), listeners, markReadLocally(), notifyNotificationsChanged() (+86 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.09
Nodes (41): ApprovedReview(), ApprovedRow, ClientSelect(), loadBooking(), moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction() (+33 more)

### Community 156 - "brand/forms.tsx"
Cohesion: 0.24
Nodes (10): BrandSettingsState, BrandFileUpload(), FieldDef, FIELDS, pesoInput(), Result(), SUBMIT, TaxForm() (+2 more)

### Community 157 - "template.ts"
Cohesion: 0.08
Nodes (26): jobGroupOf(), PRICE_SECTIONS, priceSection(), PriceSectionKey, AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED (+18 more)

### Community 158 - "leads/forms.tsx"
Cohesion: 0.13
Nodes (37): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+29 more)

### Community 159 - "app/page.tsx"
Cohesion: 0.23
Nodes (17): EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge, activeFor(), Appointment, appointmentRow() (+9 more)

### Community 160 - "proof-actions.ts"
Cohesion: 0.25
Nodes (10): amount, date, ProofState, refresh(), rejectProofAction(), StartProof, submitSchema, text() (+2 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (19): DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), buttonClass() (+11 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 164 - "periods"
Cohesion: 0.40
Nodes (10): incomeAttachments(), Periods, periods(), addMonths(), docsWithin(), monthEnd(), monthWithin(), pad2() (+2 more)

### Community 165 - "binder/page.tsx"
Cohesion: 0.42
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, monthsOf()

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "documents/labels.ts"
Cohesion: 0.09
Nodes (37): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+29 more)

### Community 169 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 170 - "Notice"
Cohesion: 0.09
Nodes (77): BatchUpload(), PreviewTable(), AmendmentRequestForm(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), ReleaseReportForm(), SetupForm() (+69 more)

### Community 171 - "cwt-match.tsx"
Cohesion: 0.53
Nodes (5): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate()

### Community 172 - "Textarea"
Cohesion: 0.13
Nodes (34): RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+26 more)

### Community 173 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 174 - "documents/period.ts"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "messages.ts"
Cohesion: 0.17
Nodes (12): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+4 more)

### Community 177 - "sign-in-form.tsx"
Cohesion: 0.60
Nodes (5): sendSignInEmail(), verifySignInCode(), SignInForm(), Divider(), SocialButton()

### Community 178 - "tests/register.test.ts"
Cohesion: 0.40
Nodes (4): DocumentRow, approved(), as(), root

### Community 179 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 181 - "grid.ts"
Cohesion: 0.18
Nodes (15): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+7 more)

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "source.ts"
Cohesion: 0.26
Nodes (11): approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND, isApproved(), monthInPeriod(), monthsInPeriod(), priorKey(), PriorWorksheetRow (+3 more)

### Community 187 - "funnel.test.ts"
Cohesion: 0.15
Nodes (4): HASH, LEAD, root, root

### Community 188 - "fees.test.ts"
Cohesion: 0.10
Nodes (6): root, HASH, LEAD, root, root, Row

### Community 202 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1545 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `testing.ts` to `form-2307.ts`, `workpapers.test.ts`, `ui.ts`, `public.ts`, `package.json`, `onboarding/page.tsx`, `ledger/data.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `requireStaff`, `payroll/forms.tsx`, `form.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `deadlines/page.tsx`, `PageHeader`, `money.ts`, `params.ts`, `books/export/route.ts`, `safeguards.ts`, `lock-bar.tsx`, `idle-watcher.tsx`, `invoice-pages.tsx`, `addDays`, `Select`, `books/forms.tsx`, `payroll/data.ts`, `@remixicon/react`, `ref_node_fs`, `leads/[id]/page.tsx`, `app/settings/page.tsx`, `parties/parties.test.ts`, `portalContext`, `portal-billing.test.ts`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `Centavos`, `Badge`, `review-form.tsx`, `Centavos`, `opening-checklist.tsx`, `rates.ts`, `showDate`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `ref_node_path`, `portal/page.tsx`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `quote.ts`, `layout.ts`, `batch/register.ts`, `read.test.ts`, `return-file-actions.ts`, `gemini.ts`, `fixed-assets/page.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `report-periods.ts`, `bulk-actions.ts`, `IsoDate`, `receipts.ts`, `server-only`, `opening.ts`, `blocks.tsx`, `ledger.test.ts`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `template.ts`, `app/page.tsx`, `calendar/page.tsx`, `register/page.tsx`, `tieouts.test.ts`, `Textarea`, `documents/period.ts`, `acting-approver.test.ts`, `messages.ts`, `tests/register.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `source.ts`, `funnel.test.ts`, `fees.test.ts`, `cwt-2307-tracker.test.ts`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07989464442493416 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `public.ts`, `package.json`, `onboarding/page.tsx`, `LinkButton`, `cx`, `dependencies`, `ledger/data.ts`, `scores/page.tsx`, `requireStaff`, `payroll/forms.tsx`, `form.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `module-pages.tsx`, `deadlines/page.tsx`, `marketing/page.tsx`, `PageHeader`, `filings/run.ts`, `lock-bar.tsx`, `idle-watcher.tsx`, `invoice-pages.tsx`, `Select`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `react`, `@remixicon/react`, `filings/actions.ts`, `leads/[id]/page.tsx`, `app/settings/page.tsx`, `Button`, `portalContext`, `workpapers/load.ts`, `intake-picker.tsx`, `form-2316.tsx`, `Badge`, `ledger/data.ts`, `review-form.tsx`, `Centavos`, `opening-checklist.tsx`, `showDate`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `upload/page.tsx`, `portal/page.tsx`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `statement.ts`, `reports/books/print/page.tsx`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `worksheet/page.tsx`, `xlsx.ts`, `fixed-assets/page.tsx`, `site-document.tsx`, `report-periods.ts`, `bulk-actions.ts`, `cwt-tracker-view.tsx`, `2316/page.tsx`, `statement-view.tsx`, `formatAmount`, `server-only`, `proof-upload.tsx`, `[id]/books/page.tsx`, `blocks.tsx`, `batch/forms.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `brand/forms.tsx`, `leads/forms.tsx`, `app/page.tsx`, `proof-actions.ts`, `proposal-view.tsx`, `binder/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `documents/labels.ts`, `cwt-match.tsx`, `Textarea`, `post-button.tsx`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Should `workpapers.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06116642958748222 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `LinkButton`, `cx`, `dependencies`, `ledger/data.ts`, `scores/page.tsx`, `link-button.tsx`, `requireStaff`, `payroll/forms.tsx`, `modal.tsx`, `form.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `module-pages.tsx`, `deadlines/page.tsx`, `marketing/page.tsx`, `PageHeader`, `filings/run.ts`, `lock-bar.tsx`, `idle-watcher.tsx`, `invoice-pages.tsx`, `Select`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `@remixicon/react`, `how-we-work/page.tsx`, `leads/[id]/page.tsx`, `app/settings/page.tsx`, `Button`, `portalContext`, `document-scanner.tsx`, `intake-picker.tsx`, `Badge`, `review-form.tsx`, `cx`, `showDate`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `upload/page.tsx`, `portal/page.tsx`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `quote.ts`, `reports/books/print/page.tsx`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `worksheet/page.tsx`, `fixed-assets/page.tsx`, `site-document.tsx`, `supabaseServer`, `cwt-tracker-view.tsx`, `2316/page.tsx`, `statement-view.tsx`, `formatAmount`, `proof-upload.tsx`, `[id]/books/page.tsx`, `blocks.tsx`, `batch/forms.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `brand/forms.tsx`, `leads/forms.tsx`, `app/page.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `binder/page.tsx`, `register/page.tsx`, `documents/labels.ts`, `Notice`, `Textarea`, `sign-in-form.tsx`, `post-button.tsx`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._