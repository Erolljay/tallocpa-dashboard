# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 964 files · ~794,856 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5979 nodes · 21157 edges · 207 communities (185 shown, 22 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 188 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `8cd1f0f1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- toCentavos
- migrate.yml
- ui.ts
- public.ts
- devDependencies
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- vat.ts
- Sign-in & Setup Docs
- cx
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
- marketing/page.tsx
- documents/[id]/page.tsx
- payroll/forms.tsx
- settings/actions.ts
- form.tsx
- scripts
- supabaseAdmin
- next
- showDate
- webhook.ts
- module-pages.tsx
- board.ts
- react
- button.tsx
- returns/types.ts
- registrations/forms.tsx
- portal/page.tsx
- ledger/data.ts
- work/load.ts
- lock-bar.tsx
- auth-templates.ts
- invoice-pages.tsx
- Apple Design
- engine.ts
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
- settlement-pages.tsx
- how-we-work/page.tsx
- (site)/page.tsx
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
- Badge
- Recipes
- lib/books/actions.ts
- BoardUI page patterns
- Pro templates
- draft.ts
- ledger/types.ts
- opening-checklist.tsx
- combobox.tsx
- rates.ts
- boardui
- batch/register.ts
- standing-forms.tsx
- arap.ts
- cycle/page.tsx
- client
- ref_node_path
- Opening balances: checklist for any cut-off
- profile.ts
- documents/labels.ts
- section-tabs.tsx
- collections/forms.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- transactions-actions.ts
- quote.ts
- returns/load.ts
- proposal.ts
- returns/books.test.ts
- xlsx.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- cycle/actions.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- mime.ts
- site/brand.ts
- bir-filing-calendar/page.tsx
- ocr/run.ts
- fixed-assets/page.tsx
- cwt-match.tsx
- requireOwner
- ticked-allocation.test.ts
- theme-toggle.tsx
- review-form.tsx
- supabaseServer
- idle-watcher.tsx
- workpapers/load.ts
- safeguards.ts
- filings/actions.ts
- MonthDetail
- server-only
- Centavos
- ui.tsx
- booksContext
- structured-data.ts
- cwt-tracker-view.tsx
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- app/documents/page.tsx
- clients/[id]/page.tsx
- template.ts
- leads/[id]/page.tsx
- deadlines/page.tsx
- app/requests/page.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- return-file-actions.ts
- month.ts
- tieouts.test.ts
- opengraph-image.tsx
- eslint.config.mjs
- package.json
- clients/actions.ts
- filings/[id]/page.tsx
- app/settings/page.tsx
- holiday-list.ts
- books-2307.test.ts
- acting-approver.test.ts
- obligations.ts
- env.ts
- formatAmount
- Building UIs with BoardUI
- lead-attribution.test.ts
- register-xlsx.ts
- branches/actions.ts
- contribution-remittances.test.ts
- fees/forms.tsx
- portal-statements-approval.test.ts
- proposal/[token]/page.tsx
- books/periods.ts
- ref_node_fs
- parallel-run.test.ts
- books-migration.test.ts
- tests/books.test.ts
- digest.ts
- generate-qap-fixture.mjs
- copy-opencv.mjs
- seed.ts
- batch/page.tsx
- cwt-2307-tracker.test.ts
- late-surcharges.test.ts
- missing-2307/page.tsx
- workpapers.test.ts
- db.test.ts
- templates/README.md
- funnel.test.ts
- fixed-assets.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 372 edges
2. `cx` - 304 edges
3. `react` - 272 edges
4. `Notice()` - 258 edges
5. `Skeleton()` - 254 edges
6. `Button()` - 237 edges
7. `next` - 234 edges
8. `vitest` - 183 edges
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

## Communities (207 total, 22 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (45): react-dom@19.3.0, react-dom, PortalPrint2307Page(), Print(), one(), portal2307(), portal2307Href(), SearchParams (+37 more)

### Community 1 - "toCentavos"
Cohesion: 0.09
Nodes (38): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+30 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.10
Nodes (41): fmtMonth(), BooksFrame(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate(), lastMonth() (+33 more)

### Community 4 - "public.ts"
Cohesion: 0.13
Nodes (23): ProposalSetup, JobOption, jobOptions(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+15 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19 (+7 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (29): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+21 more)

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
Cohesion: 0.13
Nodes (40): SaleSplit, invoiceLabel(), sawtAnnualAttachments(), SawtAnnualForm, sawtAttachments(), sawtCsv(), sawtDat(), SawtForm (+32 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.05
Nodes (56): NotificationFilterTabs(), NotificationRowData, Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Checkbox(), CheckboxProps (+48 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0, server-only@^0.0.1 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.14
Nodes (28): statementsFrom(), add(), buildStatements(), classOf(), Column, CREDIT_SECTIONS, fmtDate(), fmtMonth() (+20 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "modal.tsx"
Cohesion: 0.09
Nodes (40): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), SheetPreview(), Button() (+32 more)

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
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (66): KIND, REASON, Section(), shortDate(), STATUS_TONE, AtcComparison, atcRows(), BookInvoiceRow (+58 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "marketing/page.tsx"
Cohesion: 0.11
Nodes (27): ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable(), FirmMarketingPage() (+19 more)

### Community 45 - "documents/[id]/page.tsx"
Cohesion: 0.13
Nodes (28): @remixicon/react, addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain() (+20 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (53): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+45 more)

### Community 47 - "settings/actions.ts"
Cohesion: 0.20
Nodes (16): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+8 more)

### Community 48 - "form.tsx"
Cohesion: 0.12
Nodes (38): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+30 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.10
Nodes (39): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata (+31 more)

### Community 51 - "next"
Cohesion: 0.08
Nodes (45): nextConfig, next, activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh() (+37 more)

### Community 52 - "showDate"
Cohesion: 0.12
Nodes (44): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+36 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (40): TelegramApi, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF (+32 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.13
Nodes (21): BankAccountsRoute(), SearchParams, BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), JournalRoute() (+13 more)

### Community 55 - "board.ts"
Cohesion: 0.19
Nodes (17): FilingGroup(), StepProgress(), StepWho, CauseTag, causeTag(), DUE_GROUP_LABELS, DueGroup, FILED (+9 more)

### Community 56 - "react"
Cohesion: 0.11
Nodes (28): react, CustomersRoute(), InvoiceEdit(), JournalEntryRoute(), ReportsIndex(), KINDS, PartyList(), PaymentsViewPage() (+20 more)

### Community 57 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (63): VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel(), EwtLine (+55 more)

### Community 59 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (89): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+81 more)

### Community 60 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 61 - "ledger/data.ts"
Cohesion: 0.10
Nodes (40): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+32 more)

### Community 62 - "work/load.ts"
Cohesion: 0.20
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.17
Nodes (20): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+12 more)

### Community 64 - "auth-templates.ts"
Cohesion: 0.19
Nodes (11): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+3 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.10
Nodes (39): fmtDate(), INVOICE_KINDS, InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE, JournalView() (+31 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.10
Nodes (41): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+33 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "params.ts"
Cohesion: 0.19
Nodes (14): complexity(), count(), first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored(), QuerySource (+6 more)

### Community 70 - "year-end/page.tsx"
Cohesion: 0.11
Nodes (32): ClientTab, ClientTabs(), UNDER, FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE (+24 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.10
Nodes (54): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+46 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.10
Nodes (36): @supabase/supabase-js, Release2316Form(), yearWorksheet(), PrintAll(), PrintAll2316Page(), PayrollYear(), PayrollYearPage(), when() (+28 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "income.ts"
Cohesion: 0.09
Nodes (78): BirLineKey, annualAttachments(), balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701() (+70 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "blocks.tsx"
Cohesion: 0.12
Nodes (29): AboutPage(), HOW, metadata, FaqPage(), metadata, metadata, Part(), PrivacyPage() (+21 more)

### Community 78 - "site-document.tsx"
Cohesion: 0.12
Nodes (14): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), SiteNotFound(), geist (+6 more)

### Community 79 - "vitest"
Cohesion: 0.05
Nodes (15): pg, vitest, root, root, root, root, root, root (+7 more)

### Community 80 - "settlement-pages.tsx"
Cohesion: 0.13
Nodes (22): PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage(), fmt(), OpenInvoice (+14 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.18
Nodes (27): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+19 more)

### Community 82 - "(site)/page.tsx"
Cohesion: 0.17
Nodes (22): FLOW_ICONS, GROUP_SPAN, HomePage(), metadata, ButtonLink(), Lockup(), Mark(), QuoteBand() (+14 more)

### Community 83 - "cx.ts"
Cohesion: 0.04
Nodes (50): AvatarColor, AvatarProps, AvatarSize, styles, CHIP_COLORS, ChipProps, ChipVariant, styles (+42 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tax-codes.ts"
Cohesion: 0.12
Nodes (25): blankLine(), InvoiceForm(), InvoiceFormValue, PickOption, appliesTo(), canGoOn(), formsFor(), InvoiceKind (+17 more)

### Community 86 - "Notice"
Cohesion: 0.08
Nodes (82): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+74 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.07
Nodes (73): Detail(), PortalStatementDetail(), PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks() (+65 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "register/page.tsx"
Cohesion: 0.14
Nodes (32): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+24 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (22): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), ATTRIBUTION_KEY, pickAttribution() (+14 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.22
Nodes (16): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+8 more)

### Community 93 - "payroll/payroll.test.ts"
Cohesion: 0.05
Nodes (85): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+77 more)

### Community 94 - "Badge"
Cohesion: 0.05
Nodes (89): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), EmployeeDetail(), EmployeePage(), Payroll() (+81 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "lib/books/actions.ts"
Cohesion: 0.14
Nodes (25): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+17 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "draft.ts"
Cohesion: 0.15
Nodes (22): file(), GET(), safe(), buildEmployeeTemplate(), DraftIssue, draftSchema, draftToTemplate(), initialDraft() (+14 more)

### Community 100 - "ledger/types.ts"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+39 more)

### Community 101 - "opening-checklist.tsx"
Cohesion: 0.14
Nodes (20): Access, STATUS, Row, Asset, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut (+12 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (73): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItem(), ComboBoxItemProps, ComboBoxProps, ComboBoxSection() (+65 more)

### Community 103 - "rates.ts"
Cohesion: 0.26
Nodes (15): roundHalfAway(), AmountRate, CorporateRate, IncomeTaxTable, percentageTaxNonbankRate(), percentageTaxRate(), PercentRate, pickEffective() (+7 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "batch/register.ts"
Cohesion: 0.13
Nodes (20): accountLabel(), BatchCheck, BatchColumn, BatchContext, BatchRow, centavosOf(), checkBatch(), checkRow() (+12 more)

### Community 106 - "standing-forms.tsx"
Cohesion: 0.13
Nodes (24): ReplyForm(), send(), uploadRequestFile(), StandingUpload(), send(), METHODS, ProofUpload(), send() (+16 more)

### Community 107 - "arap.ts"
Cohesion: 0.16
Nodes (19): exceljs@4.4.0, exceljs, accountLabel(), AGING, aging(), agingBucket(), CashAccount, checkUpdate() (+11 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (29): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+21 more)

### Community 109 - "client"
Cohesion: 0.08
Nodes (15): BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), doc(), root (+7 more)

### Community 110 - "ref_node_path"
Cohesion: 0.03
Nodes (37): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+29 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 113 - "documents/labels.ts"
Cohesion: 0.10
Nodes (36): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+28 more)

### Community 114 - "section-tabs.tsx"
Cohesion: 0.17
Nodes (16): ClientList(), ClientsPage(), Row, FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs() (+8 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.10
Nodes (48): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), LateSurchargeActions() (+40 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.20
Nodes (17): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+9 more)

### Community 118 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 119 - "quote.ts"
Cohesion: 0.07
Nodes (57): PriceRow, EngagementRow, proposal(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+49 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.07
Nodes (55): recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when() (+47 more)

### Community 121 - "proposal.ts"
Cohesion: 0.12
Nodes (30): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState (+22 more)

### Community 122 - "returns/books.test.ts"
Cohesion: 0.15
Nodes (11): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+3 more)

### Community 123 - "xlsx.ts"
Cohesion: 0.16
Nodes (21): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+13 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.12
Nodes (28): Detail(), StatementPage(), Billing(), PortalBilling(), statementHref(), credit(), ItemList(), PaymentsList() (+20 more)

### Community 126 - "cycle/actions.ts"
Cohesion: 0.30
Nodes (10): MonthComplete(), SentRow, StandingRow, TimelineRow, confirmMonthAction(), CycleState, decideExceptionAction(), refresh() (+2 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (51): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage() (+43 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (73): geminiJson(), BirCategory, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ITEM_KINDS (+65 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.09
Nodes (29): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+21 more)

### Community 130 - "mime.ts"
Cohesion: 0.13
Nodes (30): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, accessToken(), call(), findReplies(), headerOf() (+22 more)

### Community 131 - "site/brand.ts"
Cohesion: 0.25
Nodes (13): metadata, QuotesClosed(), Start(), StartPage(), BRING, ContactList(), ContactPage(), metadata (+5 more)

### Community 132 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (42): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+34 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 135 - "cwt-match.tsx"
Cohesion: 0.29
Nodes (10): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), Rematch2307Button(), CwtActionState, markCwtFollowedUp() (+2 more)

### Community 136 - "requireOwner"
Cohesion: 0.11
Nodes (38): zod@^4.6.7, zod, addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema (+30 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "theme-toggle.tsx"
Cohesion: 0.07
Nodes (50): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+42 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.05
Nodes (60): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DirectoryParty, ENTRY_STATUS (+52 more)

### Community 140 - "supabaseServer"
Cohesion: 0.07
Nodes (70): setIncomeTaxMethodAction(), addClientNoteAction(), NoteState, markCwtFollowedUpAction(), GET(), Content(), NotificationsPage(), setPartyVerifiedAction() (+62 more)

### Community 141 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 142 - "workpapers/load.ts"
Cohesion: 0.09
Nodes (40): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, amt() (+32 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.12
Nodes (30): isWeekend(), board, MARCO, none, RHEA, row(), steps, documentCutoff() (+22 more)

### Community 144 - "filings/actions.ts"
Cohesion: 0.22
Nodes (15): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+7 more)

### Community 145 - "MonthDetail"
Cohesion: 0.43
Nodes (8): Atcs(), Diff(), Documents(), FigureRows(), MonthDetail(), Parties(), PartyRow(), Table()

### Community 146 - "server-only"
Cohesion: 0.08
Nodes (54): server-only, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured(), OutgoingEmail (+46 more)

### Community 147 - "Centavos"
Cohesion: 0.08
Nodes (36): AgingRow, CheckedUpdate, EntryLineOut, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem (+28 more)

### Community 148 - "ui.tsx"
Cohesion: 0.14
Nodes (17): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage() (+9 more)

### Community 149 - "booksContext"
Cohesion: 0.24
Nodes (16): booksContext(), BooksContext, booksViewFor(), one(), Print(), Print2307Page(), load2307Staff(), Cwt2307TrackerPage() (+8 more)

### Community 150 - "structured-data.ts"
Cohesion: 0.11
Nodes (27): robots(), metadata, metadata, sitemap(), SiteBrand, BRAND_NAME, SITE_URL, siteUrl() (+19 more)

### Community 151 - "cwt-tracker-view.tsx"
Cohesion: 0.26
Nodes (12): CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure(), money(), showDate(), showStamp() (+4 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.13
Nodes (26): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+18 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (82): GET(), Content(), PortalNotificationsPage(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged() (+74 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.07
Nodes (53): ApprovedReview(), ApprovedRow, BulkState, ClientSelect(), Booking, moveSelectedAction(), MoveState, plural() (+45 more)

### Community 156 - "clients/[id]/page.tsx"
Cohesion: 0.11
Nodes (34): FormState, removeAssignmentAction(), ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient() (+26 more)

### Community 157 - "template.ts"
Cohesion: 0.09
Nodes (24): jobGroupOf(), PRICE_SECTIONS, priceSection(), PriceSectionKey, AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED (+16 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (29): NotesCard(), bookedTime, Lead(), LeadPage(), LeadTouch, Person, ICON, NotesTimeline() (+21 more)

### Community 159 - "deadlines/page.tsx"
Cohesion: 0.08
Nodes (46): ClientReturnsPage(), Returns(), FilingListRow, FilingTable(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage() (+38 more)

### Community 160 - "app/requests/page.tsx"
Cohesion: 0.12
Nodes (26): Requests(), RequestsPage(), Row, View, VIEWS, PortalRequest(), RequestDetail(), PortalRequests() (+18 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.12
Nodes (36): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), Interval, manilaInstant(), Admin (+28 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.11
Nodes (22): jobName(), lineName(), longDate(), money(), php, ProposalData, ProposalView(), Rows() (+14 more)

### Community 164 - "return-file-actions.ts"
Cohesion: 0.27
Nodes (16): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+8 more)

### Community 165 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 166 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 169 - "package.json"
Cohesion: 0.18
Nodes (10): tailwind-merge@^3.7.1, tailwindcss@4.3.3, typescript@^5, name, packageManager, private, version, tailwind-merge (+2 more)

### Community 170 - "clients/actions.ts"
Cohesion: 0.10
Nodes (29): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction(), addClientUserAction() (+21 more)

### Community 171 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (44): FilingRow, SignOffState, bookKind, BookRow, bookStatus, Event, eventText, Filing() (+36 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.15
Nodes (26): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+18 more)

### Community 173 - "holiday-list.ts"
Cohesion: 0.23
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), STANDARD_HOLIDAYS, StandardHoliday (+3 more)

### Community 174 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "obligations.ts"
Cohesion: 0.24
Nodes (9): obligationChanges(), obligationsForTaxTypes(), PlannedObligation, TaxTypeError, forms(), CoverageClient, coverageGaps(), Gap (+1 more)

### Community 177 - "env.ts"
Cohesion: 0.35
Nodes (6): maxDuration, POST(), TelegramEnv, telegramEnv(), ClaimedNotification, telegramApi()

### Community 178 - "formatAmount"
Cohesion: 0.33
Nodes (7): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), Statement, formatAmount()

### Community 179 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 180 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 181 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (32): RFC-4180, sortItems(), filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS (+24 more)

### Community 182 - "branches/actions.ts"
Cohesion: 0.38
Nodes (8): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), AddBranchForm(), BranchRowForm(), branchUpdateSchema

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "fees/forms.tsx"
Cohesion: 0.31
Nodes (9): ActivateForm(), billingHint, CreateFromTemplateForm(), DeleteDraftButton(), NewDraftForm(), PricesForm(), Result(), SettingsValues (+1 more)

### Community 186 - "proposal/[token]/page.tsx"
Cohesion: 0.33
Nodes (7): AcceptForm(), acceptProposalAction(), AcceptState, metadata, Proposal(), ProposalPage(), contentHash()

### Community 187 - "books/periods.ts"
Cohesion: 0.36
Nodes (7): BooksMonthRow, BOOKS_MONTH_STATUS_LABELS, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 188 - "ref_node_fs"
Cohesion: 0.06
Nodes (11): ctx, input, root, HASH, LEAD, root, root, Row (+3 more)

### Community 189 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 190 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 193 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 194 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 195 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 196 - "batch/page.tsx"
Cohesion: 0.53
Nodes (5): Batch(), BatchPage(), one(), toCentavos(), BATCH_KINDS

### Community 197 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 199 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 200 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 207 - "funnel.test.ts"
Cohesion: 0.15
Nodes (4): HASH, LEAD, root, root

### Community 210 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1575 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `form-2307.ts`, `toCentavos`, `ui.ts`, `onboarding/page.tsx`, `cx`, `dependencies`, `scores/page.tsx`, `compare.ts`, `marketing/page.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `settings/actions.ts`, `form.tsx`, `supabaseAdmin`, `showDate`, `module-pages.tsx`, `react`, `registrations/forms.tsx`, `portal/page.tsx`, `ledger/data.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `blocks.tsx`, `site-document.tsx`, `settlement-pages.tsx`, `(site)/page.tsx`, `Notice`, `portal/reports/page.tsx`, `register/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `Badge`, `lib/books/actions.ts`, `draft.ts`, `ledger/types.ts`, `opening-checklist.tsx`, `standing-forms.tsx`, `cycle/page.tsx`, `profile.ts`, `documents/labels.ts`, `section-tabs.tsx`, `collections/forms.tsx`, `calendar/callback/route.ts`, `transactions-actions.ts`, `returns/load.ts`, `proposal.ts`, `xlsx.ts`, `statement.ts`, `cycle/actions.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `mime.ts`, `site/brand.ts`, `fixed-assets/page.tsx`, `cwt-match.tsx`, `requireOwner`, `theme-toggle.tsx`, `review-form.tsx`, `supabaseServer`, `idle-watcher.tsx`, `workpapers/load.ts`, `filings/actions.ts`, `server-only`, `ui.tsx`, `booksContext`, `structured-data.ts`, `cwt-tracker-view.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `deadlines/page.tsx`, `app/requests/page.tsx`, `return-file-actions.ts`, `opengraph-image.tsx`, `package.json`, `clients/actions.ts`, `filings/[id]/page.tsx`, `app/settings/page.tsx`, `env.ts`, `formatAmount`, `branches/actions.ts`, `proposal/[token]/page.tsx`, `batch/page.tsx`, `missing-2307/page.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08686868686868687 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `toCentavos`, `ui.ts`, `public.ts`, `devDependencies`, `onboarding/page.tsx`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/[id]/page.tsx`, `settings/actions.ts`, `form.tsx`, `supabaseAdmin`, `showDate`, `webhook.ts`, `board.ts`, `returns/types.ts`, `registrations/forms.tsx`, `portal/page.tsx`, `work/load.ts`, `lock-bar.tsx`, `auth-templates.ts`, `invoice-pages.tsx`, `engine.ts`, `testing.ts`, `params.ts`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `tax-codes.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `payroll/payroll.test.ts`, `Badge`, `ledger/types.ts`, `opening-checklist.tsx`, `rates.ts`, `batch/register.ts`, `arap.ts`, `cycle/page.tsx`, `client`, `ref_node_path`, `profile.ts`, `collections/forms.tsx`, `calendar/callback/route.ts`, `quote.ts`, `returns/load.ts`, `returns/books.test.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `mime.ts`, `bir-filing-calendar/page.tsx`, `ocr/run.ts`, `fixed-assets/page.tsx`, `ticked-allocation.test.ts`, `theme-toggle.tsx`, `review-form.tsx`, `idle-watcher.tsx`, `workpapers/load.ts`, `safeguards.ts`, `filings/actions.ts`, `server-only`, `Centavos`, `structured-data.ts`, `ledger.test.ts`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `deadlines/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `month.ts`, `tieouts.test.ts`, `package.json`, `clients/actions.ts`, `filings/[id]/page.tsx`, `app/settings/page.tsx`, `holiday-list.ts`, `books-2307.test.ts`, `acting-approver.test.ts`, `obligations.ts`, `formatAmount`, `lead-attribution.test.ts`, `contribution-remittances.test.ts`, `portal-statements-approval.test.ts`, `books/periods.ts`, `ref_node_fs`, `parallel-run.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `digest.ts`, `cwt-2307-tracker.test.ts`, `late-surcharges.test.ts`, `workpapers.test.ts`, `dispatch.test.ts`, `db.test.ts`, `funnel.test.ts`, `fixed-assets.test.ts`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Should `toCentavos` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `toCentavos`, `ui.ts`, `onboarding/page.tsx`, `cx`, `dependencies`, `modal.tsx`, `scores/page.tsx`, `compare.ts`, `marketing/page.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `form.tsx`, `supabaseAdmin`, `next`, `showDate`, `module-pages.tsx`, `button.tsx`, `registrations/forms.tsx`, `portal/page.tsx`, `ledger/data.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `blocks.tsx`, `site-document.tsx`, `settlement-pages.tsx`, `how-we-work/page.tsx`, `(site)/page.tsx`, `cx.ts`, `tax-codes.ts`, `Notice`, `portal/reports/page.tsx`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `Badge`, `ledger/types.ts`, `combobox.tsx`, `standing-forms.tsx`, `cycle/page.tsx`, `profile.ts`, `documents/labels.ts`, `section-tabs.tsx`, `collections/forms.tsx`, `calendar/callback/route.ts`, `transactions-actions.ts`, `returns/load.ts`, `proposal.ts`, `statement.ts`, `cycle/actions.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `site/brand.ts`, `fixed-assets/page.tsx`, `cwt-match.tsx`, `theme-toggle.tsx`, `review-form.tsx`, `supabaseServer`, `idle-watcher.tsx`, `workpapers/load.ts`, `ui.tsx`, `booksContext`, `structured-data.ts`, `cwt-tracker-view.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `deadlines/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `return-file-actions.ts`, `package.json`, `filings/[id]/page.tsx`, `app/settings/page.tsx`, `formatAmount`, `branches/actions.ts`, `fees/forms.tsx`, `proposal/[token]/page.tsx`, `batch/page.tsx`, `missing-2307/page.tsx`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._