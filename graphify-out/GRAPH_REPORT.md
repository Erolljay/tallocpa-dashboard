# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 986 files · ~822,782 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6084 nodes · 21576 edges · 213 communities (182 shown, 31 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 189 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `43d62ffb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- money.ts
- migrate.yml
- ui.ts
- public.ts
- devDependencies
- register-xlsx.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- vat.ts
- Sign-in & Setup Docs
- notification-actions.tsx
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- modal.tsx
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
- notification-settings-view.tsx
- upload/page.tsx
- payroll/forms.tsx
- settings/actions.ts
- marketing/page.tsx
- scripts
- slots.ts
- fees/[id]/page.tsx
- showDate
- webhook.ts
- module-pages.tsx
- ref_node_fs
- settlement-pages.tsx
- button.tsx
- returns/types.ts
- steps.ts
- portal/page.tsx
- engine.ts
- quote.ts
- lock-bar.tsx
- auth-templates.ts
- invoice-pages.tsx
- Apple Design
- generate.ts
- testing.ts
- params.ts
- year-end/page.tsx
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- income.ts
- stat-cards.tsx
- blocks.tsx
- site-document.tsx
- vitest
- [id]/books/page.tsx
- how-we-work/page.tsx
- notes.ts
- cx.ts
- Pro components
- tax-codes.ts
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- Card
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- payroll/payroll.test.ts
- manilaToday
- Recipes
- year-end/page.tsx
- BoardUI page patterns
- Pro templates
- manilaToday
- ledger/types.ts
- ledger/data.ts
- cx
- rates.ts
- boardui
- addDays
- standing-forms.tsx
- ledger/data.ts
- cycle/page.tsx
- client
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- documents/[id]/page.tsx
- marketing/attribution.ts
- collections/forms.tsx
- calendar/staff.ts
- apply-migrations.sh
- lib/books/actions.ts
- gap/page.tsx
- returns/load.ts
- theme-toggle.tsx
- morning.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- items.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- mime.ts
- brand/page.tsx
- bir-filing-calendar/page.tsx
- ocr/run.ts
- fixed-assets/page.tsx
- 2316/page.tsx
- payment-forms.tsx
- ticked-allocation.test.ts
- @remixicon/react
- review-form.tsx
- requireStaff
- parts.ts
- transactions-actions.ts
- safeguards.ts
- filings/actions.ts
- notifications/format.ts
- server-only
- Centavos
- queries.ts
- brand/actions.ts
- notifications-view.tsx
- layout.ts
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- app/documents/page.tsx
- clients/[id]/page.tsx
- holiday-list.ts
- leads/[id]/page.tsx
- filings/[id]/page.tsx
- @remixicon/react
- Rework: one flow from lead to year-end
- calendar/page.tsx
- template.ts
- filed-returns.ts
- bell-store.ts
- quote/page.tsx
- opengraph-image.tsx
- eslint.config.mjs
- statement-view.tsx
- books/periods.ts
- sign-off-actions.tsx
- missing-2307/page.tsx
- db.test.ts
- tests/proposal-email.test.ts
- acting-approver.test.ts
- calendar/actions.ts
- lead-attribution.test.ts
- formatAmount
- copy-opencv.mjs
- notifications.test.ts
- documents/[id]/page.tsx
- parallel-run.test.ts
- contribution-remittances.test.ts
- quote/page.tsx
- post-button.tsx
- books-migration.test.ts
- cwt-2307-tracker.test.ts
- defer-documents.test.ts
- fees.test.ts
- ref_node_path
- tests/books.test.ts
- tests/payroll.test.ts
- generate-qap-fixture.mjs
- source.ts
- seed.ts
- ledger-closing.test.ts
- tests/parties.test.ts
- late-surcharges.test.ts
- batch-upload.test.ts
- tieouts.ts
- proposal-view.tsx
- returns-books.test.ts
- @supabase/ssr
- templates/README.md
- @techstark/opencv-js
- funnel.test.ts
- year-end.test.ts
- approval-memo.tsx
- fields.ts
- returns-sign-off.test.ts
- portal-statements-approval.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 383 edges
2. `cx` - 306 edges
3. `react` - 275 edges
4. `Notice()` - 263 edges
5. `Skeleton()` - 254 edges
6. `Button()` - 242 edges
7. `next` - 238 edges
8. `vitest` - 190 edges
9. `Badge()` - 182 edges
10. `Card()` - 182 edges

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

## Communities (213 total, 31 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (39): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one() (+31 more)

### Community 1 - "money.ts"
Cohesion: 0.08
Nodes (42): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+34 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.06
Nodes (57): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), TransactionJournal(), Booking, BookingFields(), DirectoryParty (+49 more)

### Community 4 - "public.ts"
Cohesion: 0.20
Nodes (12): acceptProposalAction(), AcceptState, QuerySource, instantView(), brandSchedule(), contentHash(), instantQuote(), acceptedQuote() (+4 more)

### Community 5 - "devDependencies"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "register-xlsx.ts"
Cohesion: 0.11
Nodes (32): file(), GET(), safe(), PayrollDocument(), ReadPayrollButton(), buildEmployeeTemplate(), sortItems(), targetOptions() (+24 more)

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

### Community 11 - "vat.ts"
Cohesion: 0.09
Nodes (70): branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDashed(), tinDigits(), tinHasBranch() (+62 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "notification-actions.tsx"
Cohesion: 0.16
Nodes (19): notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, IconComponent, Tab(), TabList() (+11 more)

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
Nodes (41): defaultCashFlow(), codes, PNL, statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine() (+33 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "modal.tsx"
Cohesion: 0.10
Nodes (35): react-aria-components, DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button() (+27 more)

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
Nodes (38): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+30 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (62): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), Parties(), PartyRow() (+54 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "notification-settings-view.tsx"
Cohesion: 0.23
Nodes (11): EmailSwitches(), EmailSwitchGroup, Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS, NotificationAudience (+3 more)

### Community 45 - "upload/page.tsx"
Cohesion: 0.22
Nodes (16): AttachBatchImage(), attach(), DocumentUpload(), send(), upload(), Item, typeFromName(), ALLOWED (+8 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (62): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+54 more)

### Community 47 - "settings/actions.ts"
Cohesion: 0.20
Nodes (16): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+8 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (32): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), CreateLinkForm(), N() (+24 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.13
Nodes (28): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), CancelState, BookingState (+20 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.12
Nodes (38): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+30 more)

### Community 52 - "showDate"
Cohesion: 0.08
Nodes (66): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+58 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (47): maxDuration, POST(), TelegramEnv, telegramEnv(), ClaimedNotification, TelegramApi, telegramApi(), ALLOWED (+39 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.14
Nodes (22): BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), JournalEntryRoute(), JournalRoute(), BankAccounts() (+14 more)

### Community 55 - "ref_node_fs"
Cohesion: 0.07
Nodes (10): dir, ctx, input, Data, root, Row, root, root (+2 more)

### Community 56 - "settlement-pages.tsx"
Cohesion: 0.11
Nodes (26): PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage(), ReceiptsViewPage() (+18 more)

### Community 57 - "button.tsx"
Cohesion: 0.10
Nodes (26): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+18 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (62): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+54 more)

### Community 59 - "steps.ts"
Cohesion: 0.04
Nodes (124): addStepFile(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction() (+116 more)

### Community 60 - "portal/page.tsx"
Cohesion: 0.07
Nodes (49): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, StandingRow (+41 more)

### Community 61 - "engine.ts"
Cohesion: 0.15
Nodes (26): compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), DeadlineRule, FilingInstance, fiscalYearOf(), followsCalendarYear() (+18 more)

### Community 62 - "quote.ts"
Cohesion: 0.10
Nodes (38): corp, items, proposal(), bandForSales(), buildProposalQuote(), JOB_GROUPS, JobBand, jobField (+30 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.17
Nodes (21): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+13 more)

### Community 64 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.09
Nodes (38): BankAccountsRoute(), fmtDate(), INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.17
Nodes (17): Rule, DueRule, EfpsGroup, FilingChannel, Frequency, PeriodFilter, ACTIVE, buildFilingRows() (+9 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "params.ts"
Cohesion: 0.11
Nodes (27): PriceRow, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery() (+19 more)

### Community 70 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), send() (+20 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (41): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+33 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.10
Nodes (43): EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+35 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "income.ts"
Cohesion: 0.08
Nodes (62): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+54 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "blocks.tsx"
Cohesion: 0.06
Nodes (89): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+81 more)

### Community 78 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 79 - "vitest"
Cohesion: 0.05
Nodes (15): pg, vitest, root, root, root, root, root, root (+7 more)

### Community 80 - "[id]/books/page.tsx"
Cohesion: 0.12
Nodes (34): booksContext(), booksViewFor(), fmtMonth(), one(), SearchParams, BooksFrame(), CustomersRoute(), ReportsIndex() (+26 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "notes.ts"
Cohesion: 0.20
Nodes (14): NotesCard(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry, noteEntry(), NoteRow (+6 more)

### Community 83 - "cx.ts"
Cohesion: 0.04
Nodes (62): ClientTab, UNDER, AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps (+54 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tax-codes.ts"
Cohesion: 0.15
Nodes (18): SettingsPage(), SettingsRoute(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES (+10 more)

### Community 86 - "Notice"
Cohesion: 0.07
Nodes (97): react, setupMissingChartsAction(), BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+89 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (71): Detail(), PortalStatementDetail(), PortalClient, portalContext(), Content(), PortalNotificationsPage(), Portal2316(), Portal2316Page() (+63 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "Card"
Cohesion: 0.16
Nodes (28): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+20 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 93 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (56): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+48 more)

### Community 94 - "manilaToday"
Cohesion: 0.07
Nodes (48): nextConfig, next, ClientList(), ClientsPage(), Row, FirmPage(), Places(), REVIEWER_PLACES (+40 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "manilaToday"
Cohesion: 0.12
Nodes (32): zod, EditClient(), EditClientPage(), NewClientPage(), OwnerOnly(), addChargeAction(), applyCreditAction(), approveLateSurchargeAction() (+24 more)

### Community 100 - "ledger/types.ts"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+39 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.11
Nodes (26): Accounts(), AccountsPage(), GROUPS, AccountForm(), Access, STATUS, CASH_FLOW_CLASSES, CashFlowClass (+18 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (93): SheetPreview(), ChipColor, Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, animateTag() (+85 more)

### Community 103 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "addDays"
Cohesion: 0.13
Nodes (30): DashboardStats(), OwnerSections(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary(), ActingState (+22 more)

### Community 106 - "standing-forms.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 107 - "ledger/data.ts"
Cohesion: 0.07
Nodes (57): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+49 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.11
Nodes (32): DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one() (+24 more)

### Community 109 - "client"
Cohesion: 0.07
Nodes (17): BOOK_LOCK_FORMS, as(), client(), root, send(), as(), purchase(), root (+9 more)

### Community 110 - "index.ts"
Cohesion: 0.05
Nodes (21): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+13 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.13
Nodes (19): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+11 more)

### Community 113 - "documents/[id]/page.tsx"
Cohesion: 0.11
Nodes (24): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+16 more)

### Community 114 - "marketing/attribution.ts"
Cohesion: 0.14
Nodes (33): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+25 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.10
Nodes (47): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), LateSurchargeActions() (+39 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.12
Nodes (36): disconnectCalendarAction(), GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches() (+28 more)

### Community 118 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (26): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+18 more)

### Community 119 - "gap/page.tsx"
Cohesion: 0.18
Nodes (19): loadSchedules(), EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient (+11 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.07
Nodes (44): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+36 more)

### Community 121 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 122 - "morning.ts"
Cohesion: 0.13
Nodes (18): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+10 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): exceljs, BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.14
Nodes (22): Billing(), PortalBilling(), statementHref(), credit(), ItemList(), PaymentsList(), proofMethod, VerifiedItems() (+14 more)

### Community 126 - "items.ts"
Cohesion: 0.14
Nodes (19): Release2316Form(), PayrollSetupPage(), Setup(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release() (+11 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (48): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage() (+40 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (77): RFC-4180, geminiJson(), BirCategory, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf() (+69 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.08
Nodes (33): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+25 more)

### Community 130 - "mime.ts"
Cohesion: 0.09
Nodes (51): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+43 more)

### Community 131 - "brand/page.tsx"
Cohesion: 0.16
Nodes (19): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), expiryStatus(), formatTin() (+11 more)

### Community 132 - "bir-filing-calendar/page.tsx"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (42): MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+34 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 135 - "2316/page.tsx"
Cohesion: 0.23
Nodes (14): Print(), Print2307Page(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), PortalPrint2307Page(), Print() (+6 more)

### Community 136 - "payment-forms.tsx"
Cohesion: 0.11
Nodes (39): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+31 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "@remixicon/react"
Cohesion: 0.06
Nodes (53): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+45 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.10
Nodes (33): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Codes (+25 more)

### Community 140 - "requireStaff"
Cohesion: 0.07
Nodes (47): setIncomeTaxMethodAction(), addClientNoteAction(), NoteState, markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), Content() (+39 more)

### Community 141 - "parts.ts"
Cohesion: 0.16
Nodes (16): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, KIND_LABELS (+8 more)

### Community 142 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.06
Nodes (56): SafeguardsNotice(), Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), CoverageClient (+48 more)

### Community 144 - "filings/actions.ts"
Cohesion: 0.15
Nodes (21): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+13 more)

### Community 145 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 146 - "server-only"
Cohesion: 0.11
Nodes (39): server-only, @supabase/supabase-js, GET(), GET(), GET(), generateFilingsNow(), generatePastFilingsAction(), runActingDigest() (+31 more)

### Community 147 - "Centavos"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 148 - "queries.ts"
Cohesion: 0.19
Nodes (14): GET(), isNotificationKind(), BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+6 more)

### Community 149 - "brand/actions.ts"
Cohesion: 0.18
Nodes (15): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+7 more)

### Community 150 - "notifications-view.tsx"
Cohesion: 0.39
Nodes (8): Empty(), NotificationsView(), one(), SearchParams, fullDateTime(), timeOfDay(), listNotifications(), unreadCount()

### Community 151 - "layout.ts"
Cohesion: 0.24
Nodes (13): bodyBlocks(), DEFAULT_BRAND, EmailAction, escapeHtml(), fullBrand(), linkify(), plainTextToHtml(), receivingLine() (+5 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.18
Nodes (21): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+13 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.23
Nodes (17): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), BellAudience (+9 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.09
Nodes (42): ApprovedReview(), ApprovedRow, ClientSelect(), moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction() (+34 more)

### Community 156 - "clients/[id]/page.tsx"
Cohesion: 0.05
Nodes (77): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+69 more)

### Community 157 - "holiday-list.ts"
Cohesion: 0.23
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), STANDARD_HOLIDAYS, StandardHoliday (+3 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (50): PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction() (+42 more)

### Community 159 - "filings/[id]/page.tsx"
Cohesion: 0.05
Nodes (86): ClientTabs(), ClientReturnsPage(), FilingRow, Returns(), FilingListRow, FilingTable(), AmendmentCard(), BooksStillOpen() (+78 more)

### Community 160 - "@remixicon/react"
Cohesion: 0.09
Nodes (46): Requests(), RequestsPage(), Row, View, VIEWS, PortalRequest(), RequestDetail(), PortalRequests() (+38 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (19): DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant(), appBookedEvents() (+11 more)

### Community 163 - "template.ts"
Cohesion: 0.07
Nodes (32): items, schedule, OWNER_PRICES, OWNER_SETTINGS, EWT_NOTE, base, code(), priced() (+24 more)

### Community 164 - "filed-returns.ts"
Cohesion: 0.23
Nodes (10): FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear(), TaxTypeGroup (+2 more)

### Community 165 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 166 - "quote/page.tsx"
Cohesion: 0.27
Nodes (10): loadTaxOnFee(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+2 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 169 - "statement-view.tsx"
Cohesion: 0.31
Nodes (8): Detail(), PayNow(), StatementView(), statusBadge, firmBlockLines(), PayAccount, StatementStatus, statementStatus()

### Community 170 - "books/periods.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.26
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 172 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 174 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "calendar/actions.ts"
Cohesion: 0.21
Nodes (15): cancelMeetingAction(), FormState, cancelMyMeetingAction(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail() (+7 more)

### Community 177 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 178 - "formatAmount"
Cohesion: 0.18
Nodes (17): Batch(), BatchPage(), one(), toCentavos(), Accreditation(), amount(), AmountRow(), DateCells() (+9 more)

### Community 179 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 181 - "documents/[id]/page.tsx"
Cohesion: 0.12
Nodes (30): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+22 more)

### Community 182 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "quote/page.tsx"
Cohesion: 0.15
Nodes (16): dateFmt, longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm(), NewDraftForm() (+8 more)

### Community 185 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 186 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 187 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 190 - "ref_node_path"
Cohesion: 0.07
Nodes (8): HASH, LEAD, root, root, root, Part, root, root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 193 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 194 - "source.ts"
Cohesion: 0.08
Nodes (40): qapBuckets(), sawtBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo() (+32 more)

### Community 195 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 196 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 200 - "tieouts.ts"
Cohesion: 0.12
Nodes (16): RegisterRow, LedgerTotals, purchases(), sales(), base, books, buy, sale (+8 more)

### Community 201 - "proposal-view.tsx"
Cohesion: 0.21
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 207 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 209 - "approval-memo.tsx"
Cohesion: 0.13
Nodes (23): amt(), ApprovalMemo(), Db, TIE, RegisterLine, Adjustment, c(), loadPeriodFile() (+15 more)

### Community 211 - "fields.ts"
Cohesion: 0.09
Nodes (29): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+21 more)

### Community 212 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1613 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `manilaToday` to `form-2307.ts`, `money.ts`, `ui.ts`, `public.ts`, `devDependencies`, `register-xlsx.ts`, `notification-actions.tsx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `upload/page.tsx`, `payroll/forms.tsx`, `settings/actions.ts`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `showDate`, `webhook.ts`, `module-pages.tsx`, `settlement-pages.tsx`, `steps.ts`, `portal/page.tsx`, `lock-bar.tsx`, `invoice-pages.tsx`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `blocks.tsx`, `site-document.tsx`, `[id]/books/page.tsx`, `cx.ts`, `Notice`, `portal/reports/page.tsx`, `Card`, `intake-picker.tsx`, `form-2316.tsx`, `year-end/page.tsx`, `manilaToday`, `ledger/types.ts`, `ledger/data.ts`, `cx`, `addDays`, `standing-forms.tsx`, `ledger/data.ts`, `cycle/page.tsx`, `documents/[id]/page.tsx`, `marketing/attribution.ts`, `collections/forms.tsx`, `calendar/staff.ts`, `lib/books/actions.ts`, `gap/page.tsx`, `returns/load.ts`, `batch/register.ts`, `statement.ts`, `items.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `mime.ts`, `brand/page.tsx`, `fixed-assets/page.tsx`, `2316/page.tsx`, `payment-forms.tsx`, `@remixicon/react`, `review-form.tsx`, `requireStaff`, `transactions-actions.ts`, `safeguards.ts`, `filings/actions.ts`, `server-only`, `queries.ts`, `brand/actions.ts`, `notifications-view.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `filings/[id]/page.tsx`, `@remixicon/react`, `calendar/page.tsx`, `quote/page.tsx`, `opengraph-image.tsx`, `sign-off-actions.tsx`, `missing-2307/page.tsx`, `calendar/actions.ts`, `formatAmount`, `documents/[id]/page.tsx`, `quote/page.tsx`, `post-button.tsx`, `proposal-view.tsx`, `approval-memo.tsx`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11479591836734694 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `money.ts`, `ui.ts`, `public.ts`, `devDependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `payroll/forms.tsx`, `settings/actions.ts`, `slots.ts`, `fees/[id]/page.tsx`, `showDate`, `webhook.ts`, `ref_node_fs`, `returns/types.ts`, `steps.ts`, `portal/page.tsx`, `engine.ts`, `quote.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `generate.ts`, `testing.ts`, `params.ts`, `year-end/page.tsx`, `payroll/data.ts`, `blocks.tsx`, `notes.ts`, `tax-codes.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `payroll/payroll.test.ts`, `manilaToday`, `year-end/page.tsx`, `ledger/types.ts`, `ledger/data.ts`, `rates.ts`, `addDays`, `ledger/data.ts`, `cycle/page.tsx`, `client`, `index.ts`, `marketing/attribution.ts`, `collections/forms.tsx`, `calendar/staff.ts`, `returns/load.ts`, `morning.ts`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `mime.ts`, `brand/page.tsx`, `bir-filing-calendar/page.tsx`, `ocr/run.ts`, `fixed-assets/page.tsx`, `payment-forms.tsx`, `ticked-allocation.test.ts`, `@remixicon/react`, `review-form.tsx`, `parts.ts`, `safeguards.ts`, `filings/actions.ts`, `notifications/format.ts`, `server-only`, `Centavos`, `layout.ts`, `ledger.test.ts`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `holiday-list.ts`, `filings/[id]/page.tsx`, `@remixicon/react`, `calendar/page.tsx`, `template.ts`, `filed-returns.ts`, `books/periods.ts`, `db.test.ts`, `tests/proposal-email.test.ts`, `acting-approver.test.ts`, `calendar/actions.ts`, `lead-attribution.test.ts`, `formatAmount`, `notifications.test.ts`, `documents/[id]/page.tsx`, `parallel-run.test.ts`, `contribution-remittances.test.ts`, `quote/page.tsx`, `books-migration.test.ts`, `cwt-2307-tracker.test.ts`, `defer-documents.test.ts`, `fees.test.ts`, `ref_node_path`, `tests/books.test.ts`, `tests/payroll.test.ts`, `source.ts`, `ledger-closing.test.ts`, `tests/parties.test.ts`, `late-surcharges.test.ts`, `batch-upload.test.ts`, `tieouts.ts`, `returns-books.test.ts`, `funnel.test.ts`, `year-end.test.ts`, `approval-memo.tsx`, `fields.ts`, `returns-sign-off.test.ts`, `portal-statements-approval.test.ts`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `money.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08489795918367347 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Notice` to `form-2307.ts`, `money.ts`, `ui.ts`, `devDependencies`, `notification-actions.tsx`, `dependencies`, `statements.ts`, `modal.tsx`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `notification-settings-view.tsx`, `upload/page.tsx`, `payroll/forms.tsx`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `showDate`, `module-pages.tsx`, `settlement-pages.tsx`, `button.tsx`, `steps.ts`, `portal/page.tsx`, `quote.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `blocks.tsx`, `site-document.tsx`, `[id]/books/page.tsx`, `how-we-work/page.tsx`, `cx.ts`, `tax-codes.ts`, `portal/reports/page.tsx`, `Card`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `year-end/page.tsx`, `manilaToday`, `ledger/types.ts`, `ledger/data.ts`, `cx`, `addDays`, `standing-forms.tsx`, `ledger/data.ts`, `cycle/page.tsx`, `documents/[id]/page.tsx`, `collections/forms.tsx`, `gap/page.tsx`, `returns/load.ts`, `theme-toggle.tsx`, `statement.ts`, `items.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `mime.ts`, `brand/page.tsx`, `fixed-assets/page.tsx`, `2316/page.tsx`, `payment-forms.tsx`, `@remixicon/react`, `review-form.tsx`, `requireStaff`, `transactions-actions.ts`, `safeguards.ts`, `queries.ts`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `filings/[id]/page.tsx`, `@remixicon/react`, `calendar/page.tsx`, `bell-store.ts`, `quote/page.tsx`, `statement-view.tsx`, `sign-off-actions.tsx`, `missing-2307/page.tsx`, `calendar/actions.ts`, `formatAmount`, `documents/[id]/page.tsx`, `quote/page.tsx`, `post-button.tsx`, `proposal-view.tsx`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._