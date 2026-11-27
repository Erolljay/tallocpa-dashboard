# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 983 files · ~816,386 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6077 nodes · 21524 edges · 213 communities (185 shown, 28 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 188 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `5b7eae98`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- draft.ts
- migrate.yml
- ui.ts
- public.ts
- devDependencies
- toCentavos
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
- react
- button.tsx
- returns/types.ts
- steps.ts
- portal/page.tsx
- engine.ts
- work/load.ts
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
- LinkButton
- how-we-work/page.tsx
- notes.ts
- cx.ts
- Pro components
- tax-codes.ts
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- register/page.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- payroll/payroll.test.ts
- manilaToday
- Recipes
- lib/books/actions.ts
- BoardUI page patterns
- Pro templates
- upload/page.tsx
- ledger/types.ts
- ledger/data.ts
- cx
- rates.ts
- boardui
- addDays
- standing-forms.tsx
- arap.ts
- cycle/page.tsx
- client
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- documents/[id]/page.tsx
- registrations/new/page.tsx
- collections/forms.tsx
- calendar/staff.ts
- apply-migrations.sh
- payroll-read-actions.ts
- quote.ts
- returns/load.ts
- registrations/[id]/page.tsx
- returns/books.test.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- Badge
- cycle/actions.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- mime.ts
- parties/parties.test.ts
- bir-filing-calendar/page.tsx
- ocr/run.ts
- fixed-assets/page.tsx
- registration-fee-jobs.test.ts
- payment-forms.tsx
- ticked-allocation.test.ts
- theme-toggle.tsx
- review-form.tsx
- supabaseServer
- idle-watcher.tsx
- workpapers/load.ts
- safeguards.ts
- filings/actions.ts
- notifications/format.ts
- server-only
- Centavos
- queries.ts
- registrations/forms.tsx
- notifications-view.tsx
- cwt-tracker-view.tsx
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- app/documents/page.tsx
- clients/[id]/page.tsx
- resolve.ts
- leads/[id]/page.tsx
- filings/[id]/page.tsx
- @remixicon/react
- Rework: one flow from lead to year-end
- calendar/page.tsx
- template.ts
- tools/page.tsx
- bell-store.ts
- deadlines/dates.ts
- opengraph-image.tsx
- eslint.config.mjs
- package.json
- step-files.tsx
- sign-off-actions.tsx
- missing-2307/page.tsx
- db.test.ts
- tests/proposal-email.test.ts
- acting-approver.test.ts
- book/actions.ts
- env.ts
- formatAmount
- Building UIs with BoardUI
- move-bar.tsx
- documents/[id]/page.tsx
- cwt-match.tsx
- contribution-remittances.test.ts
- quote/page.tsx
- social-button.tsx
- stepsFor
- cwt-2307-tracker.test.ts
- split-bundled-pdfs.test.ts
- fixed-assets.test.ts
- ref_node_path
- tests/books.test.ts
- tests/payroll.test.ts
- generate-qap-fixture.mjs
- Centavos
- seed.ts
- binder/page.tsx
- batch-row-images.test.ts
- late-surcharges.test.ts
- batch-upload.test.ts
- tieouts.ts
- proposal-view.tsx
- books-lock.test.ts
- portal-home.test.ts
- templates/README.md
- portal-reports.test.ts
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
8. `vitest` - 189 edges
9. `Badge()` - 182 edges
10. `Card()` - 182 edges

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

## Communities (213 total, 28 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (51): booksContext(), BooksContext, booksViewFor(), one(), Certificates(), Staff2307Page(), Print(), Print2307Page() (+43 more)

### Community 1 - "draft.ts"
Cohesion: 0.13
Nodes (24): file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), DraftIssue, draftSchema, draftToTemplate() (+16 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.07
Nodes (48): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), TransactionJournal(), Booking, BookingFields(), ComboBoxItem() (+40 more)

### Community 4 - "public.ts"
Cohesion: 0.10
Nodes (28): acceptProposalAction(), AcceptState, QuerySource, instantView(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+20 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "toCentavos"
Cohesion: 0.12
Nodes (28): PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db (+20 more)

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
Cohesion: 0.12
Nodes (44): SaleSplit, Periods, incomePayment(), invoiceLabel(), sawtAnnualAttachments(), SawtAnnualForm, sawtAttachments(), sawtCsv() (+36 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "notification-actions.tsx"
Cohesion: 0.16
Nodes (17): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+9 more)

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
Cohesion: 0.10
Nodes (36): defaultCashFlow(), statementsFrom(), FsLine, FsLineKey, isFsLine(), Section, Statement, add() (+28 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

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
Cohesion: 0.11
Nodes (31): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+23 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (72): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), Parties(), PartyRow() (+64 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "notification-settings-view.tsx"
Cohesion: 0.21
Nodes (13): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS (+5 more)

### Community 45 - "upload/page.tsx"
Cohesion: 0.19
Nodes (17): AttachBatchImage(), attach(), DocumentUpload(), send(), upload(), Item, typeFromName(), ALLOWED (+9 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (50): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+42 more)

### Community 47 - "settings/actions.ts"
Cohesion: 0.09
Nodes (34): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange() (+26 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (65): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+57 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.12
Nodes (34): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), cancelMyMeetingAction(), Book() (+26 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.15
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 52 - "showDate"
Cohesion: 0.09
Nodes (64): EmployerCard(), RemittancesDue(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS (+56 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (41): SPREADSHEET_TYPES, TelegramApi, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery() (+33 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.12
Nodes (29): fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow, RowLink(), EmployeesRoute() (+21 more)

### Community 55 - "ref_node_fs"
Cohesion: 0.06
Nodes (11): dir, ctx, input, root, LEAD, LinkRow, ReportRow, root (+3 more)

### Community 56 - "react"
Cohesion: 0.07
Nodes (56): react, Accounts(), AccountsPage(), GROUPS, BankAccountsRoute(), CustomersRoute(), NewEntry(), NewEntryPage() (+48 more)

### Community 57 - "button.tsx"
Cohesion: 0.06
Nodes (38): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+30 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (81): tinDashed(), PayrollContext, agentLines(), agentProblems(), amountText(), emptyResult(), PAYROLL_NOT_LOADED, form1601C (+73 more)

### Community 59 - "steps.ts"
Cohesion: 0.07
Nodes (31): Agency, amendmentWords, approval(), BillingFacts, BIR_CHANGES, birForm(), BranchOptions, branchStepsFor() (+23 more)

### Community 60 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 61 - "engine.ts"
Cohesion: 0.19
Nodes (20): compareIso(), lastDayOfMonth(), FilingInstance, fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), nextWorkingDay() (+12 more)

### Community 62 - "work/load.ts"
Cohesion: 0.19
Nodes (16): loadAssets(), standingLine(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.14
Nodes (26): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+18 more)

### Community 64 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.10
Nodes (29): INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage() (+21 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.14
Nodes (23): Rule, IsoDate, DeadlineRule, DueRule, EfpsGroup, FilingChannel, Frequency, PeriodFilter (+15 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "params.ts"
Cohesion: 0.17
Nodes (17): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+9 more)

### Community 70 - "year-end/page.tsx"
Cohesion: 0.10
Nodes (32): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+24 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (40): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+32 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.11
Nodes (37): saveMonthAction(), EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), Form2316Signatory, paidInYear(), Payroll2316Raw (+29 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "income.ts"
Cohesion: 0.10
Nodes (65): annualAttachments(), balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+57 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "blocks.tsx"
Cohesion: 0.06
Nodes (90): robots(), AboutPage(), HOW, metadata, BirCalendarPage(), metadata, BRING, ContactList() (+82 more)

### Community 78 - "site-document.tsx"
Cohesion: 0.17
Nodes (11): GlobalNotFound(), metadata, metadata, SiteLayout(), SiteNotFound(), geist, geistMono, montserrat (+3 more)

### Community 79 - "vitest"
Cohesion: 0.04
Nodes (17): pg, vitest, root, root, root, root, root, Row (+9 more)

### Community 80 - "LinkButton"
Cohesion: 0.18
Nodes (17): Batch(), BatchPage(), one(), toCentavos(), fmtMonth(), BooksSummaryPage(), Summary(), SummaryCard() (+9 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.13
Nodes (29): HowWeWorkPage(), TimelineFigure(), Chip(), CHIP_COLORS, ChipProps, ChipVariant, styles, Mark() (+21 more)

### Community 82 - "notes.ts"
Cohesion: 0.17
Nodes (16): NoteState, NotesCard(), ClientNoteForm(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry (+8 more)

### Community 83 - "cx.ts"
Cohesion: 0.04
Nodes (63): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+55 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tax-codes.ts"
Cohesion: 0.13
Nodes (20): SettingsPage(), SettingsRoute(), loadBooking(), loadTaxCodes(), appliesTo(), canGoOn(), formsFor(), InvoiceKind (+12 more)

### Community 86 - "Notice"
Cohesion: 0.07
Nodes (94): setupMissingChartsAction(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm() (+86 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.07
Nodes (73): PortalClient, portalContext(), Content(), PortalNotificationsPage(), Portal2316(), Portal2316Page(), Books(), PortalBooks() (+65 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "register/page.tsx"
Cohesion: 0.13
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.09
Nodes (33): metadata, QuotesClosed(), Start(), StartPage(), Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState (+25 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.22
Nodes (16): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+8 more)

### Community 93 - "payroll/payroll.test.ts"
Cohesion: 0.05
Nodes (77): MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat() (+69 more)

### Community 94 - "manilaToday"
Cohesion: 0.11
Nodes (40): NewParty(), NewPartyPage(), RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS (+32 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "lib/books/actions.ts"
Cohesion: 0.05
Nodes (70): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+62 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "upload/page.tsx"
Cohesion: 0.20
Nodes (17): Content(), NotificationSettingsPage(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), TelegramLinkButton() (+9 more)

### Community 100 - "ledger/types.ts"
Cohesion: 0.08
Nodes (39): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+31 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.08
Nodes (39): Access, STATUS, Row, Asset, CASH_FLOW_CLASSES, CashFlowClass, codes, PNL (+31 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (88): react-aria-components, ChipColor, Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, animateTag(), ComboBox() (+80 more)

### Community 103 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "addDays"
Cohesion: 0.10
Nodes (37): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+29 more)

### Community 106 - "standing-forms.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 107 - "arap.ts"
Cohesion: 0.12
Nodes (27): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+19 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.23
Nodes (12): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CycleRow, ExceptionDecision, parseMonth() (+4 more)

### Community 109 - "client"
Cohesion: 0.07
Nodes (22): templatePayload(), BOOK_LOCK_FORMS, as(), client(), root, send(), as(), books() (+14 more)

### Community 110 - "index.ts"
Cohesion: 0.06
Nodes (21): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+13 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.08
Nodes (43): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+35 more)

### Community 113 - "documents/[id]/page.tsx"
Cohesion: 0.11
Nodes (30): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+22 more)

### Community 114 - "registrations/new/page.tsx"
Cohesion: 0.39
Nodes (6): ClientCaseKind, clientCase, NewRegistrationPage(), OwnerOnly(), manilaDate(), dtiRenewalDue()

### Community 115 - "collections/forms.tsx"
Cohesion: 0.08
Nodes (69): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+61 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.10
Nodes (42): cancelMeetingAction(), disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), cancelClientMeeting(), accountProblem() (+34 more)

### Community 118 - "payroll-read-actions.ts"
Cohesion: 0.20
Nodes (17): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), applyRegister() (+9 more)

### Community 119 - "quote.ts"
Cohesion: 0.09
Nodes (47): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), proposal(), TaxpayerType, EstimatedProfile, estimateProfile() (+39 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.07
Nodes (53): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+45 more)

### Community 121 - "registrations/[id]/page.tsx"
Cohesion: 0.15
Nodes (29): StepBadge(), StepRow, caseStatus, CertificateDetails, certificateLabel(), fmt(), Registration(), RegistrationPage() (+21 more)

### Community 122 - "returns/books.test.ts"
Cohesion: 0.18
Nodes (9): client, form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q (+1 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "Badge"
Cohesion: 0.06
Nodes (63): @remixicon/react, Detail(), StatementPage(), MonthRemittances(), CELL, FirmParallelRunPage(), monthShort(), Summary() (+55 more)

### Community 126 - "cycle/actions.ts"
Cohesion: 0.12
Nodes (26): MonthComplete(), SentRow, StandingRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction() (+18 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.15
Nodes (20): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), listNameCols(), Names (+12 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (74): RFC-4180, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+66 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.17
Nodes (17): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+9 more)

### Community 130 - "mime.ts"
Cohesion: 0.09
Nodes (48): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+40 more)

### Community 131 - "parties/parties.test.ts"
Cohesion: 0.24
Nodes (13): mergePartyAction(), lookupParties(), person, blank(), optionalText(), PartyInput, partySchema, HEAD_OFFICE (+5 more)

### Community 132 - "bir-filing-calendar/page.tsx"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (43): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+35 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 135 - "registration-fee-jobs.test.ts"
Cohesion: 0.18
Nodes (13): dtiRegisteredOn(), fieldErrors(), openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction(), certificateStepsFor(), employerStepsFor(), renewalStepsFor() (+5 more)

### Community 136 - "payment-forms.tsx"
Cohesion: 0.12
Nodes (34): appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage(), accountSchema (+26 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "theme-toggle.tsx"
Cohesion: 0.06
Nodes (51): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+43 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.07
Nodes (47): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), DirectoryParty (+39 more)

### Community 140 - "supabaseServer"
Cohesion: 0.06
Nodes (63): nextConfig, next, setIncomeTaxMethodAction(), addClientNoteAction(), NewClientPage(), OwnerOnly(), ClientList(), ClientsPage() (+55 more)

### Community 141 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 142 - "workpapers/load.ts"
Cohesion: 0.24
Nodes (13): buildYear(), month1601C(), RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile (+5 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.05
Nodes (65): StepProgress(), TAX_TYPES, CoverageClient, coverageGaps(), Gap, GapKind, line(), longDay() (+57 more)

### Community 144 - "filings/actions.ts"
Cohesion: 0.23
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 145 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 146 - "server-only"
Cohesion: 0.09
Nodes (49): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), cancelDiscoveryCall(), CancelResult (+41 more)

### Community 147 - "Centavos"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 148 - "queries.ts"
Cohesion: 0.21
Nodes (13): GET(), isNotificationKind(), BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+5 more)

### Community 149 - "registrations/forms.tsx"
Cohesion: 0.10
Nodes (27): cancelRegistrationAction(), completeRegistrationAction(), FormState, PROOF_TYPES, caseNote, caseTitle, Check(), CompleteButton() (+19 more)

### Community 150 - "notifications-view.tsx"
Cohesion: 0.25
Nodes (13): Content(), NotificationsPage(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one() (+5 more)

### Community 151 - "cwt-tracker-view.tsx"
Cohesion: 0.26
Nodes (12): CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure(), money(), showDate(), showStamp() (+4 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+14 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.23
Nodes (17): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), BellAudience (+9 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (31): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending() (+23 more)

### Community 156 - "clients/[id]/page.tsx"
Cohesion: 0.05
Nodes (74): zod@^4.6.7, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction() (+66 more)

### Community 157 - "resolve.ts"
Cohesion: 0.25
Nodes (14): displayName(), fullAddress(), Party, partyTinLabel(), ABBREVIATIONS, fillFromDirectory(), nameTokens(), PartyFields (+6 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (54): PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction() (+46 more)

### Community 159 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (47): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage() (+39 more)

### Community 160 - "@remixicon/react"
Cohesion: 0.10
Nodes (43): Requests(), RequestsPage(), Row, View, VIEWS, PortalRequest(), RequestDetail(), PortalRequests() (+35 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.27
Nodes (16): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant(), appBookedEvents(), addDays() (+8 more)

### Community 163 - "template.ts"
Cohesion: 0.06
Nodes (46): ProposalSetup, corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, JOB_GROUPS (+38 more)

### Community 164 - "tools/page.tsx"
Cohesion: 0.17
Nodes (22): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), RepostRegisterButton() (+14 more)

### Community 165 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 166 - "deadlines/dates.ts"
Cohesion: 0.44
Nodes (8): addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff(), openMonth()

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 169 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 170 - "step-files.tsx"
Cohesion: 0.39
Nodes (8): addStepFile(), removeStepFile(), startStepFileUpload(), FileChip(), StepFile, StepFileList(), StepFileUpload(), send()

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 172 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 174 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "book/actions.ts"
Cohesion: 0.16
Nodes (15): digestMessage(), DigestRow, longDay(), peso, time(), calendarNote(), CalendarOutcome, cancelledMessage() (+7 more)

### Community 177 - "env.ts"
Cohesion: 0.33
Nodes (7): maxDuration, POST(), TelegramEnv, telegramEnv(), ClaimedNotification, telegramApi(), notifyTelegram()

### Community 178 - "formatAmount"
Cohesion: 0.13
Nodes (25): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+17 more)

### Community 179 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 180 - "move-bar.tsx"
Cohesion: 0.32
Nodes (13): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+5 more)

### Community 181 - "documents/[id]/page.tsx"
Cohesion: 0.10
Nodes (35): Payroll(), PayrollPage(), addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage() (+27 more)

### Community 182 - "cwt-match.tsx"
Cohesion: 0.53
Nodes (5): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate()

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "quote/page.tsx"
Cohesion: 0.17
Nodes (20): dateFmt, loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm() (+12 more)

### Community 185 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 186 - "stepsFor"
Cohesion: 0.33
Nodes (3): stepsFor(), codes(), root

### Community 187 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 189 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 190 - "ref_node_path"
Cohesion: 0.07
Nodes (12): outDir, pkgDir, require, { version }, root, approved(), as(), root (+4 more)

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 193 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 194 - "Centavos"
Cohesion: 0.07
Nodes (32): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookLine, ColumnarRow, JournalRow (+24 more)

### Community 195 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 196 - "binder/page.tsx"
Cohesion: 0.20
Nodes (14): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, ReviewNote (+6 more)

### Community 200 - "tieouts.ts"
Cohesion: 0.13
Nodes (14): LedgerTotals, purchases(), sales(), base, books, buy, sale, TIE_IDS (+6 more)

### Community 201 - "proposal-view.tsx"
Cohesion: 0.20
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 207 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 209 - "approval-memo.tsx"
Cohesion: 0.19
Nodes (12): amt(), ApprovalMemo(), Db, TIE, approvalMemo(), Memo, MemoInput, MemoMonth (+4 more)

### Community 211 - "fields.ts"
Cohesion: 0.10
Nodes (27): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+19 more)

### Community 212 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 215 - "portal-statements-approval.test.ts"
Cohesion: 0.16
Nodes (4): MONTHS, root, root, Row

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1605 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `ui.ts`, `public.ts`, `devDependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `settings/actions.ts`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `showDate`, `webhook.ts`, `ref_node_fs`, `returns/types.ts`, `steps.ts`, `portal/page.tsx`, `engine.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `generate.ts`, `testing.ts`, `params.ts`, `year-end/page.tsx`, `payroll/data.ts`, `blocks.tsx`, `notes.ts`, `tax-codes.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `payroll/payroll.test.ts`, `manilaToday`, `lib/books/actions.ts`, `ledger/types.ts`, `ledger/data.ts`, `rates.ts`, `addDays`, `arap.ts`, `cycle/page.tsx`, `client`, `index.ts`, `profile.ts`, `collections/forms.tsx`, `calendar/staff.ts`, `payroll-read-actions.ts`, `quote.ts`, `returns/load.ts`, `registrations/[id]/page.tsx`, `returns/books.test.ts`, `batch/register.ts`, `cycle/actions.ts`, `read.test.ts`, `social-button.tsx`, `mime.ts`, `parties/parties.test.ts`, `bir-filing-calendar/page.tsx`, `ocr/run.ts`, `fixed-assets/page.tsx`, `registration-fee-jobs.test.ts`, `payment-forms.tsx`, `ticked-allocation.test.ts`, `theme-toggle.tsx`, `review-form.tsx`, `idle-watcher.tsx`, `safeguards.ts`, `filings/actions.ts`, `notifications/format.ts`, `server-only`, `Centavos`, `ledger.test.ts`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `@remixicon/react`, `calendar/page.tsx`, `template.ts`, `deadlines/dates.ts`, `package.json`, `db.test.ts`, `tests/proposal-email.test.ts`, `acting-approver.test.ts`, `book/actions.ts`, `formatAmount`, `move-bar.tsx`, `contribution-remittances.test.ts`, `stepsFor`, `cwt-2307-tracker.test.ts`, `split-bundled-pdfs.test.ts`, `fixed-assets.test.ts`, `ref_node_path`, `tests/books.test.ts`, `tests/payroll.test.ts`, `binder/page.tsx`, `batch-row-images.test.ts`, `late-surcharges.test.ts`, `batch-upload.test.ts`, `tieouts.ts`, `books-lock.test.ts`, `portal-home.test.ts`, `portal-reports.test.ts`, `funnel.test.ts`, `year-end.test.ts`, `approval-memo.tsx`, `fields.ts`, `returns-sign-off.test.ts`, `portal-statements-approval.test.ts`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08878968253968254 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `toCentavos`, `notification-actions.tsx`, `dependencies`, `modal.tsx`, `scores/page.tsx`, `compare.ts`, `notification-settings-view.tsx`, `upload/page.tsx`, `payroll/forms.tsx`, `settings/actions.ts`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `showDate`, `module-pages.tsx`, `button.tsx`, `portal/page.tsx`, `lock-bar.tsx`, `invoice-pages.tsx`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `blocks.tsx`, `site-document.tsx`, `LinkButton`, `how-we-work/page.tsx`, `notes.ts`, `cx.ts`, `tax-codes.ts`, `Notice`, `portal/reports/page.tsx`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `lib/books/actions.ts`, `upload/page.tsx`, `ledger/types.ts`, `cx`, `addDays`, `standing-forms.tsx`, `cycle/page.tsx`, `profile.ts`, `documents/[id]/page.tsx`, `registrations/new/page.tsx`, `collections/forms.tsx`, `calendar/staff.ts`, `quote.ts`, `returns/load.ts`, `registrations/[id]/page.tsx`, `batch/register.ts`, `Badge`, `cycle/actions.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `mime.ts`, `fixed-assets/page.tsx`, `payment-forms.tsx`, `theme-toggle.tsx`, `review-form.tsx`, `supabaseServer`, `idle-watcher.tsx`, `queries.ts`, `registrations/forms.tsx`, `notifications-view.tsx`, `cwt-tracker-view.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `filings/[id]/page.tsx`, `@remixicon/react`, `calendar/page.tsx`, `template.ts`, `tools/page.tsx`, `bell-store.ts`, `package.json`, `step-files.tsx`, `sign-off-actions.tsx`, `missing-2307/page.tsx`, `formatAmount`, `move-bar.tsx`, `documents/[id]/page.tsx`, `quote/page.tsx`, `social-button.tsx`, `binder/page.tsx`, `proposal-view.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `draft.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13105413105413105 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `draft.ts`, `ui.ts`, `public.ts`, `toCentavos`, `notification-actions.tsx`, `dependencies`, `scores/page.tsx`, `compare.ts`, `upload/page.tsx`, `payroll/forms.tsx`, `settings/actions.ts`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `showDate`, `module-pages.tsx`, `react`, `button.tsx`, `portal/page.tsx`, `lock-bar.tsx`, `invoice-pages.tsx`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `blocks.tsx`, `site-document.tsx`, `LinkButton`, `portal/reports/page.tsx`, `register/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `manilaToday`, `lib/books/actions.ts`, `upload/page.tsx`, `ledger/types.ts`, `ledger/data.ts`, `cx`, `addDays`, `standing-forms.tsx`, `arap.ts`, `cycle/page.tsx`, `profile.ts`, `documents/[id]/page.tsx`, `registrations/new/page.tsx`, `collections/forms.tsx`, `calendar/staff.ts`, `payroll-read-actions.ts`, `quote.ts`, `returns/load.ts`, `registrations/[id]/page.tsx`, `batch/register.ts`, `Badge`, `cycle/actions.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `mime.ts`, `fixed-assets/page.tsx`, `payment-forms.tsx`, `theme-toggle.tsx`, `review-form.tsx`, `idle-watcher.tsx`, `filings/actions.ts`, `server-only`, `queries.ts`, `registrations/forms.tsx`, `notifications-view.tsx`, `cwt-tracker-view.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `filings/[id]/page.tsx`, `@remixicon/react`, `calendar/page.tsx`, `tools/page.tsx`, `opengraph-image.tsx`, `package.json`, `step-files.tsx`, `sign-off-actions.tsx`, `missing-2307/page.tsx`, `env.ts`, `formatAmount`, `move-bar.tsx`, `documents/[id]/page.tsx`, `cwt-match.tsx`, `quote/page.tsx`, `binder/page.tsx`, `proposal-view.tsx`, `approval-memo.tsx`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._