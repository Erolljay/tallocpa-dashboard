# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1017 files · ~850,045 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6235 nodes · 22244 edges · 222 communities (193 shown, 29 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `2870588d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- public.ts
- package.json
- Badge
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- app/documents/page.tsx
- Sign-in & Setup Docs
- next
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
- columns.ts
- returns/types.ts
- react
- payroll/payroll.test.ts
- modal.tsx
- site-document.tsx
- scripts
- access.ts
- button.tsx
- Card
- webhook.ts
- tax-codes.ts
- manilaToday
- module-pages.tsx
- proposal-view.tsx
- returns/load.ts
- ClientCaseForm
- calendar/page.tsx
- books/export/route.ts
- formatAmount
- lock-bar.tsx
- review-forms.tsx
- marketing/page.tsx
- Apple Design
- engine.ts
- testing.ts
- fees/[id]/page.tsx
- money.ts
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- invoice-pages.tsx
- theme-toggle.tsx
- ref_node_path
- parties/[id]/page.tsx
- how-we-work/page.tsx
- requireOwner
- cx.ts
- Pro components
- remittances/[id]/page.tsx
- Notice
- payroll/types.ts
- portal-billing.test.ts
- notifications-view.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- filings/actions.ts
- manilaToday
- Recipes
- react
- BoardUI page patterns
- Pro templates
- generate.ts
- ledger/books.ts
- ledger/data.ts
- combobox.tsx
- marketing/page.tsx
- boardui
- ref_node_fs
- money.ts
- supabaseServer
- leads/actions.ts
- documents/[id]/page.tsx
- templatePayload
- Opening balances: checklist for any cut-off
- profile.ts
- showMonth
- dropdown.tsx
- collections/forms.tsx
- steps.ts
- apply-migrations.sh
- public.ts
- fees/types.ts
- opening.ts
- leads/[id]/page.tsx
- app/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- showDate
- chrome.tsx
- holiday-list.ts
- read.test.ts
- idle-watcher.tsx
- return-file-actions.ts
- app/settings/page.tsx
- settlement-pages.tsx
- ocr/run.ts
- fixed-assets/forms.tsx
- cancel-server.ts
- supabaseServer
- ticked-allocation.test.ts
- transactions-actions.ts
- site/brand.ts
- work/load.ts
- payroll/forms.tsx
- site/brand.ts
- social-button.tsx
- quote.ts
- cycle/page.tsx
- dispatch.ts
- @remixicon/react
- template.ts
- ledger/types.ts
- blocks.tsx
- seed.ts
- ledger.test.ts
- ref_node_fs
- clients/[id]/page.tsx
- move-bar.tsx
- documents/[id]/page.tsx
- register/page.tsx
- lock.ts
- onboarding/page.tsx
- fixed-assets/page.tsx
- Rework: one flow from lead to year-end
- calendar/staff.ts
- registrations/[id]/page.tsx
- lock.ts
- books/periods.ts
- workpapers/load.ts
- opengraph-image.tsx
- cx
- getIdentity
- binder/page.tsx
- month.ts
- blocks.tsx
- cycle/actions.ts
- cwt-2307-tracker.test.ts
- acting-approver.test.ts
- fields.ts
- portal-statements-approval.test.ts
- generate-qap-fixture.mjs
- lead-attribution.test.ts
- bir-filing-calendar/page.tsx
- vitest
- safeguards-load.ts
- contribution-remittances.test.ts
- rates.ts
- pg
- registrations/page.tsx
- leads-pipeline.test.ts
- ocr/dates.ts
- registrations/actions.ts
- pg
- proof-upload.tsx
- eslint.config.mjs
- returns-sign-off.test.ts
- telegram-uploads.test.ts
- people/schema.ts
- return-file-actions.ts
- registrations/forms.tsx
- form-2307.tsx
- sign-off.ts
- pending-review.tsx
- @supabase/ssr
- file-upload.tsx
- db.test.ts
- templates/README.md
- sign-off-actions.tsx
- portal-nav.tsx
- read/match.ts
- seed.ts
- registrations/new/page.tsx
- filters.tsx
- review.ts
- tieouts.test.ts
- contribution-remittances.test.ts
- late-surcharges.test.ts
- fees.test.ts
- tasks-and-request-owners.test.ts
- workpapers.test.ts
- batch-row-images.test.ts
- portal-reports.test.ts
- @techstark/opencv-js

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 399 edges
2. `cx` - 313 edges
3. `react` - 283 edges
4. `Notice()` - 269 edges
5. `Skeleton()` - 258 edges
6. `Button()` - 250 edges
7. `next` - 245 edges
8. `vitest` - 195 edges
9. `Badge()` - 187 edges
10. `Card()` - 187 edges

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

## Communities (222 total, 29 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.10
Nodes (42): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page() (+34 more)

### Community 1 - "index.ts"
Cohesion: 0.06
Nodes (24): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+16 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.10
Nodes (41): booksViewFor(), fmtMonth(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate(), lastMonth() (+33 more)

### Community 4 - "public.ts"
Cohesion: 0.14
Nodes (21): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), complexity() (+13 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "Badge"
Cohesion: 0.08
Nodes (51): AuditRow, Contact(), ContactPage(), day, when, SignOffActions(), RequestDetail(), RequestPage() (+43 more)

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
Cohesion: 0.05
Nodes (84): DocReviewActions(), Doc, DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow (+76 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "next"
Cohesion: 0.08
Nodes (54): nextConfig, next, NewEntry(), NewEntryPage(), Payroll(), PayrollPage(), PrintAll(), PrintAll2316Page() (+46 more)

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
Cohesion: 0.07
Nodes (48): FinancialStatementsView(), StatementTable(), PrintButton(), CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL (+40 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (83): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), annualAttachments(), balanceSheet(), compute1701() (+75 more)

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
Nodes (52): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), Rematch2307Button(), CwtLooseDocuments(), CwtTrackerGroups() (+44 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (71): AtcComparison, atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentDifference, DocumentReason (+63 more)

### Community 43 - "columns.ts"
Cohesion: 0.12
Nodes (29): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), BirCategory (+21 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.05
Nodes (67): tinHasBranch(), client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q (+59 more)

### Community 45 - "react"
Cohesion: 0.06
Nodes (45): react, BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), JournalEntryRoute(), JournalRoute(), PaymentsListPage(), PayslipsRoute() (+37 more)

### Community 46 - "payroll/payroll.test.ts"
Cohesion: 0.18
Nodes (20): file(), GET(), safe(), monthlyTable(), employeesForMonth(), buildEmployeeTemplate(), sortItems(), draftToTemplate() (+12 more)

### Community 47 - "modal.tsx"
Cohesion: 0.15
Nodes (26): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+18 more)

### Community 48 - "site-document.tsx"
Cohesion: 0.18
Nodes (7): inter, metadata, montserrat, geist, geistMono, montserrat, themeScript

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "access.ts"
Cohesion: 0.13
Nodes (29): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+21 more)

### Community 51 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 52 - "Card"
Cohesion: 0.06
Nodes (81): ClientTabs(), EmployerCard(), ClientReturnsPage(), FilingRow, Returns(), Client, CollectionsPage(), OpenDue (+73 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (45): maxDuration, POST(), TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked(), Choice (+37 more)

### Community 54 - "tax-codes.ts"
Cohesion: 0.11
Nodes (27): blankLine(), InvoiceForm(), InvoiceFormValue, PickOption, InvoiceInput, appliesTo(), canGoOn(), formsFor() (+19 more)

### Community 55 - "manilaToday"
Cohesion: 0.14
Nodes (19): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), CELL, FirmParallelRunPage() (+11 more)

### Community 56 - "module-pages.tsx"
Cohesion: 0.12
Nodes (50): booksContext(), fmtDate(), one(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+42 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.21
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.06
Nodes (62): recomputeWorksheetAction(), Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet() (+54 more)

### Community 59 - "ClientCaseForm"
Cohesion: 0.10
Nodes (26): dtiRegisteredOn(), fieldErrors(), openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction(), updateStepAction(), Check(), ChecklistPreview() (+18 more)

### Community 60 - "calendar/page.tsx"
Cohesion: 0.21
Nodes (21): DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), Interval (+13 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.15
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+11 more)

### Community 62 - "formatAmount"
Cohesion: 0.19
Nodes (16): StepProgress(), CauseTag, causeTag(), DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS, fiveSteps() (+8 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.06
Nodes (57): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+49 more)

### Community 64 - "review-forms.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.13
Nodes (36): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+28 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.10
Nodes (44): addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule (+36 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "fees/[id]/page.tsx"
Cohesion: 0.11
Nodes (41): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+33 more)

### Community 70 - "money.ts"
Cohesion: 0.09
Nodes (36): branch4(), branchOfTin(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat() (+28 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.13
Nodes (46): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+38 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.13
Nodes (25): GridRow, AnnualSummary, annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+17 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.14
Nodes (28): tin9(), tinDashed(), tinDigits(), sawtCsv(), sawtDat(), crlf(), csv(), csvCell() (+20 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (38): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+30 more)

### Community 77 - "invoice-pages.tsx"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 79 - "ref_node_path"
Cohesion: 0.06
Nodes (10): outDir, pkgDir, require, { version }, root, root, root, root (+2 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (48): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), fmtDate(), PartyDetail(), PartyPage() (+40 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.15
Nodes (30): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+22 more)

### Community 82 - "requireOwner"
Cohesion: 0.18
Nodes (19): GlobalNotFound(), metadata, SiteLayout(), SiteNotFound(), HomePage(), SiteDocument(), ButtonLink(), Lockup() (+11 more)

### Community 83 - "cx.ts"
Cohesion: 0.04
Nodes (59): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+51 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "remittances/[id]/page.tsx"
Cohesion: 0.19
Nodes (28): DueDateForm(), EmployerNumberForm(), HandlesContributionsSwitch(), PrepareForm(), RemitForm(), RemittanceButton(), RemittanceFileUpload(), send() (+20 more)

### Community 86 - "Notice"
Cohesion: 0.07
Nodes (108): BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), BookPicker(), CloseYearForm(), EntryForm(), OpeningUpload() (+100 more)

### Community 87 - "payroll/types.ts"
Cohesion: 0.08
Nodes (69): Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker() (+61 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notifications-view.tsx"
Cohesion: 0.08
Nodes (48): KIND_LABEL, MATCH_BADGE, peso(), ReadItem, SheetPreview(), emit(), listeners, markReadLocally() (+40 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (24): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+16 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.23
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "filings/actions.ts"
Cohesion: 0.10
Nodes (31): amt(), Db, TIE, BOOKS_GO_LIVE, RegisterLine, Adjustment, c(), loadPeriodFile() (+23 more)

### Community 94 - "manilaToday"
Cohesion: 0.09
Nodes (50): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+42 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "react"
Cohesion: 0.08
Nodes (52): EmployeeDetail(), EmployeePage(), buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory (+44 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "generate.ts"
Cohesion: 0.31
Nodes (12): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+4 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.06
Nodes (49): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+41 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.12
Nodes (33): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+25 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.06
Nodes (53): react-aria-components, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, animateTag(), ComboBox() (+45 more)

### Community 103 - "marketing/page.tsx"
Cohesion: 0.11
Nodes (26): createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct() (+18 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "ref_node_fs"
Cohesion: 0.10
Nodes (29): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, showDay() (+21 more)

### Community 106 - "money.ts"
Cohesion: 0.11
Nodes (39): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+31 more)

### Community 107 - "supabaseServer"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.16
Nodes (26): PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction() (+18 more)

### Community 109 - "documents/[id]/page.tsx"
Cohesion: 0.11
Nodes (27): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+19 more)

### Community 110 - "templatePayload"
Cohesion: 0.05
Nodes (26): templatePayload(), as(), client(), root, root, generateFilings(), send(), as() (+18 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 113 - "showMonth"
Cohesion: 0.09
Nodes (40): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, StandingRow (+32 more)

### Community 114 - "dropdown.tsx"
Cohesion: 0.10
Nodes (28): Dropdown(), DropdownContext, DropdownContextValue, DropdownGroupProps, DropdownItemProps, DropdownPopoverProps, DropdownProps, DropdownVariant (+20 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.10
Nodes (43): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), LateSurchargeActions() (+35 more)

### Community 116 - "steps.ts"
Cohesion: 0.08
Nodes (33): Agency, amendmentWords, BillingFacts, BIR_CHANGES, birForm(), BranchOptions, CaseStep, certificateApplication (+25 more)

### Community 118 - "public.ts"
Cohesion: 0.13
Nodes (25): ProposalSetup, JobOption, jobOptions(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+17 more)

### Community 119 - "fees/types.ts"
Cohesion: 0.07
Nodes (42): corp, items, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+34 more)

### Community 120 - "opening.ts"
Cohesion: 0.21
Nodes (16): cancelMeetingAction(), cancelMyMeetingAction(), CancelState, calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail() (+8 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.06
Nodes (46): addClientNoteAction(), NoteState, NotesCard(), ClientNoteForm(), FunnelSwitch(), ProposalSent, bookedTime, LeadPage() (+38 more)

### Community 122 - "app/page.tsx"
Cohesion: 0.12
Nodes (33): FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), CatchUpRow (+25 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (45): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+37 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "showDate"
Cohesion: 0.14
Nodes (25): Detail(), StatementPage(), Billing(), PortalBilling(), statementHref(), credit(), ItemList(), PaymentsList() (+17 more)

### Community 126 - "chrome.tsx"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 127 - "holiday-list.ts"
Cohesion: 0.27
Nodes (9): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), STANDARD_HOLIDAYS, StandardHoliday, suggestedDate() (+1 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (67): RFC-4180, geminiJson(), PayrollItem, amountOf(), applyColumns(), columnsOf(), findHeaderRow(), knownTarget() (+59 more)

### Community 129 - "idle-watcher.tsx"
Cohesion: 0.13
Nodes (20): postPayrollAction(), PostState, PostPayrollButton(), GET(), GET(), code, email, sendSignInEmail() (+12 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.13
Nodes (29): RFC-2047, RFC-2822, GET(), esubmissionMailEnv(), accessToken(), call(), findReplies(), headerOf() (+21 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.07
Nodes (56): zod, addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState (+48 more)

### Community 132 - "settlement-pages.tsx"
Cohesion: 0.12
Nodes (27): PaymentsNewPage(), PaymentsEditPage(), ReceiptsEditPage(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, Kind (+19 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (47): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+39 more)

### Community 134 - "fixed-assets/forms.tsx"
Cohesion: 0.31
Nodes (10): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+2 more)

### Community 135 - "cancel-server.ts"
Cohesion: 0.14
Nodes (28): AboutPage(), HOW, metadata, BRING, ContactList(), ContactPage(), metadata, FaqPage() (+20 more)

### Community 136 - "supabaseServer"
Cohesion: 0.05
Nodes (95): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setCatchUpAction(), setClientStatusAction() (+87 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "transactions-actions.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 139 - "site/brand.ts"
Cohesion: 0.17
Nodes (15): standingLine(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 140 - "work/load.ts"
Cohesion: 0.14
Nodes (20): globalSearch(), SearchHit, SearchKind, CommandSearch(), Icon, isMac(), KINDS, noop() (+12 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (61): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+53 more)

### Community 142 - "site/brand.ts"
Cohesion: 0.33
Nodes (8): metadata, QuotesClosed(), Start(), StartPage(), funnelLive(), clean(), FALLBACK_BRAND, phoneLinks()

### Community 143 - "social-button.tsx"
Cohesion: 0.13
Nodes (22): board, MARCO, none, RHEA, row(), steps, documentCutoff(), DONE_FROM_STATUS (+14 more)

### Community 144 - "quote.ts"
Cohesion: 0.12
Nodes (30): PriceRow, proposal(), buildProposalQuote(), buildQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem (+22 more)

### Community 145 - "cycle/page.tsx"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 146 - "dispatch.ts"
Cohesion: 0.13
Nodes (34): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+26 more)

### Community 147 - "@remixicon/react"
Cohesion: 0.10
Nodes (38): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+30 more)

### Community 148 - "template.ts"
Cohesion: 0.13
Nodes (17): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+9 more)

### Community 149 - "ledger/types.ts"
Cohesion: 0.09
Nodes (36): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, loadAssets(), Row, accumulated(), Asset (+28 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.14
Nodes (20): robots(), metadata, sitemap(), SiteBrand, BRAND_NAME, QUOTE_LABEL, SITE_URL, siteUrl() (+12 more)

### Community 151 - "seed.ts"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "ref_node_fs"
Cohesion: 0.06
Nodes (8): ctx, input, root, root, root, root, root, root

### Community 154 - "clients/[id]/page.tsx"
Cohesion: 0.17
Nodes (21): ClientTab, UNDER, RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), fmtMonth() (+13 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "documents/[id]/page.tsx"
Cohesion: 0.08
Nodes (44): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+36 more)

### Community 157 - "register/page.tsx"
Cohesion: 0.16
Nodes (25): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+17 more)

### Community 158 - "lock.ts"
Cohesion: 0.32
Nodes (4): Row, QueueFiling, QueueViewer, ReviewQueue

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (30): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+22 more)

### Community 160 - "fixed-assets/page.tsx"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (38): disconnectCalendarAction(), FormState, GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE (+30 more)

### Community 163 - "registrations/[id]/page.tsx"
Cohesion: 0.15
Nodes (22): addStepFile(), removeStepFile(), startStepFileUpload(), StepBadge(), caseStatus, CertificateDetails, certificateLabel(), fmt() (+14 more)

### Community 164 - "lock.ts"
Cohesion: 0.11
Nodes (13): amount(), INCOME_TAX, LockFiling, lockFormsFor(), lockingFiling(), lockKind(), PAYROLL, PURCHASES (+5 more)

### Community 165 - "books/periods.ts"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 166 - "workpapers/load.ts"
Cohesion: 0.13
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "cx"
Cohesion: 0.09
Nodes (32): switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent (+24 more)

### Community 169 - "getIdentity"
Cohesion: 0.07
Nodes (54): amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text(), AttachBatchImage(), attach() (+46 more)

### Community 170 - "binder/page.tsx"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 172 - "blocks.tsx"
Cohesion: 0.14
Nodes (20): FLOW_ICONS, GROUP_SPAN, metadata, metadata, BreadcrumbItem(), Crumb, Crumbs(), H1 (+12 more)

### Community 173 - "cycle/actions.ts"
Cohesion: 0.40
Nodes (9): CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), CycleState, decideExceptionAction(), nothingToSubmitAction(), refresh() (+1 more)

### Community 174 - "cwt-2307-tracker.test.ts"
Cohesion: 0.07
Nodes (53): GET(), notifyNotificationsChanged(), EmailSwitches(), EmailSwitchGroup, MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData (+45 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fields.ts"
Cohesion: 0.09
Nodes (30): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+22 more)

### Community 177 - "portal-statements-approval.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 178 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 180 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 181 - "vitest"
Cohesion: 0.07
Nodes (8): vitest, dir, root, root, root, root, root, root

### Community 182 - "safeguards-load.ts"
Cohesion: 0.17
Nodes (17): ClientValues, TaxType, CoverageClient, coverageGaps(), Gap, GapKind, BoardRow, FilingRow (+9 more)

### Community 184 - "rates.ts"
Cohesion: 0.24
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+10 more)

### Community 185 - "pg"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 186 - "registrations/page.tsx"
Cohesion: 0.19
Nodes (19): StepRow, YearRenewalsForm(), RegistrationList(), RegistrationsPage(), Row, SORTS, CaseRow, clientStatus (+11 more)

### Community 187 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 189 - "registrations/actions.ts"
Cohesion: 0.17
Nodes (16): PROOF_TYPES, EngagementRow, TAXPAYER_TYPES, TaxpayerType, branchSchema, certificateSchema, checkbox, closureSchema (+8 more)

### Community 190 - "pg"
Cohesion: 0.06
Nodes (9): pg, root, root, root, root, root, root, root (+1 more)

### Community 191 - "proof-upload.tsx"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 193 - "returns-sign-off.test.ts"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 194 - "telegram-uploads.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "people/schema.ts"
Cohesion: 0.16
Nodes (16): roleLabel, StaffList(), StaffPage(), CONTACT_ACCESS, access, clientUserSchema, contactAccessSchema, contactDetailsSchema (+8 more)

### Community 196 - "return-file-actions.ts"
Cohesion: 0.26
Nodes (17): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+9 more)

### Community 197 - "registrations/forms.tsx"
Cohesion: 0.16
Nodes (13): cancelRegistrationAction(), completeRegistrationAction(), FormState, caseNote, caseTitle, CompleteButton(), statusTone, submitLabel (+5 more)

### Community 198 - "form-2307.tsx"
Cohesion: 0.23
Nodes (13): Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set(), padded(), PartyFields() (+5 more)

### Community 199 - "sign-off.ts"
Cohesion: 0.18
Nodes (12): availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner, preparer (+4 more)

### Community 200 - "pending-review.tsx"
Cohesion: 0.11
Nodes (30): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Codes (+22 more)

### Community 202 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 206 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 207 - "portal-nav.tsx"
Cohesion: 0.35
Nodes (8): PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab, Tab, under()

### Community 208 - "read/match.ts"
Cohesion: 0.29
Nodes (10): digits(), editDistance(), EmployeeMatch, keyNo(), matchEmployee(), MatchStatus, nameScore(), nameWords() (+2 more)

### Community 209 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 210 - "registrations/new/page.tsx"
Cohesion: 0.31
Nodes (8): ClientCaseKind, NewRegistrationForm(), today(), clientCase, NewRegistrationPage(), OwnerOnly(), manilaDate(), dtiRenewalDue()

### Community 211 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 212 - "review.ts"
Cohesion: 0.43
Nodes (5): ALWAYS, refsToSign(), reviewGaps(), SIGNED_REFS, quiet

### Community 213 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 214 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 218 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1650 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `ui.ts`, `public.ts`, `package.json`, `app/documents/page.tsx`, `next`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `returns/types.ts`, `access.ts`, `Card`, `webhook.ts`, `tax-codes.ts`, `returns/load.ts`, `ClientCaseForm`, `calendar/page.tsx`, `books/export/route.ts`, `formatAmount`, `lock-bar.tsx`, `marketing/page.tsx`, `engine.ts`, `testing.ts`, `fees/[id]/page.tsx`, `money.ts`, `payroll/payroll.test.ts`, `invoice-pages.tsx`, `ref_node_path`, `parties/[id]/page.tsx`, `payroll/types.ts`, `portal-billing.test.ts`, `notifications-view.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `filings/actions.ts`, `manilaToday`, `react`, `ledger/books.ts`, `ref_node_fs`, `leads/actions.ts`, `documents/[id]/page.tsx`, `templatePayload`, `profile.ts`, `showMonth`, `collections/forms.tsx`, `steps.ts`, `public.ts`, `fees/types.ts`, `opening.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `batch/register.ts`, `chrome.tsx`, `holiday-list.ts`, `read.test.ts`, `idle-watcher.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `ocr/run.ts`, `supabaseServer`, `ticked-allocation.test.ts`, `transactions-actions.ts`, `site/brand.ts`, `social-button.tsx`, `quote.ts`, `dispatch.ts`, `@remixicon/react`, `ledger/types.ts`, `blocks.tsx`, `ledger.test.ts`, `ref_node_fs`, `move-bar.tsx`, `lock.ts`, `onboarding/page.tsx`, `fixed-assets/page.tsx`, `calendar/staff.ts`, `lock.ts`, `workpapers/load.ts`, `month.ts`, `acting-approver.test.ts`, `fields.ts`, `portal-statements-approval.test.ts`, `lead-attribution.test.ts`, `bir-filing-calendar/page.tsx`, `safeguards-load.ts`, `contribution-remittances.test.ts`, `rates.ts`, `pg`, `leads-pipeline.test.ts`, `ocr/dates.ts`, `pg`, `proof-upload.tsx`, `telegram-uploads.test.ts`, `people/schema.ts`, `sign-off.ts`, `pending-review.tsx`, `db.test.ts`, `portal-nav.tsx`, `filters.tsx`, `review.ts`, `tieouts.test.ts`, `contribution-remittances.test.ts`, `late-surcharges.test.ts`, `fees.test.ts`, `tasks-and-request-owners.test.ts`, `workpapers.test.ts`, `batch-row-images.test.ts`, `portal-reports.test.ts`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10412299091544375 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `form-2307.ts`, `ui.ts`, `public.ts`, `package.json`, `Badge`, `app/documents/page.tsx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `columns.ts`, `react`, `payroll/payroll.test.ts`, `site-document.tsx`, `access.ts`, `Card`, `webhook.ts`, `manilaToday`, `module-pages.tsx`, `proposal-view.tsx`, `returns/load.ts`, `calendar/page.tsx`, `lock-bar.tsx`, `review-forms.tsx`, `marketing/page.tsx`, `fees/[id]/page.tsx`, `books/forms.tsx`, `parties/[id]/page.tsx`, `requireOwner`, `remittances/[id]/page.tsx`, `payroll/types.ts`, `notifications-view.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `filings/actions.ts`, `manilaToday`, `react`, `generate.ts`, `ledger/books.ts`, `ledger/data.ts`, `marketing/page.tsx`, `money.ts`, `leads/actions.ts`, `documents/[id]/page.tsx`, `profile.ts`, `showMonth`, `collections/forms.tsx`, `opening.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `batch/register.ts`, `showDate`, `idle-watcher.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `settlement-pages.tsx`, `fixed-assets/forms.tsx`, `cancel-server.ts`, `supabaseServer`, `work/load.ts`, `payroll/forms.tsx`, `site/brand.ts`, `dispatch.ts`, `@remixicon/react`, `ledger/types.ts`, `blocks.tsx`, `clients/[id]/page.tsx`, `move-bar.tsx`, `documents/[id]/page.tsx`, `register/page.tsx`, `onboarding/page.tsx`, `calendar/staff.ts`, `registrations/[id]/page.tsx`, `workpapers/load.ts`, `opengraph-image.tsx`, `cx`, `getIdentity`, `binder/page.tsx`, `blocks.tsx`, `cycle/actions.ts`, `cwt-2307-tracker.test.ts`, `registrations/page.tsx`, `registrations/actions.ts`, `returns-sign-off.test.ts`, `return-file-actions.ts`, `form-2307.tsx`, `pending-review.tsx`, `sign-off-actions.tsx`, `portal-nav.tsx`, `registrations/new/page.tsx`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0553306342780027 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `public.ts`, `package.json`, `Badge`, `app/documents/page.tsx`, `next`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `modal.tsx`, `site-document.tsx`, `access.ts`, `button.tsx`, `Card`, `tax-codes.ts`, `manilaToday`, `module-pages.tsx`, `proposal-view.tsx`, `returns/load.ts`, `calendar/page.tsx`, `lock-bar.tsx`, `review-forms.tsx`, `marketing/page.tsx`, `fees/[id]/page.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `requireOwner`, `cx.ts`, `remittances/[id]/page.tsx`, `Notice`, `payroll/types.ts`, `notifications-view.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `react`, `ledger/books.ts`, `ledger/data.ts`, `combobox.tsx`, `marketing/page.tsx`, `money.ts`, `documents/[id]/page.tsx`, `profile.ts`, `showMonth`, `dropdown.tsx`, `collections/forms.tsx`, `fees/types.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `batch/register.ts`, `showDate`, `idle-watcher.tsx`, `app/settings/page.tsx`, `settlement-pages.tsx`, `fixed-assets/forms.tsx`, `cancel-server.ts`, `supabaseServer`, `work/load.ts`, `payroll/forms.tsx`, `site/brand.ts`, `@remixicon/react`, `blocks.tsx`, `seed.ts`, `clients/[id]/page.tsx`, `move-bar.tsx`, `documents/[id]/page.tsx`, `register/page.tsx`, `onboarding/page.tsx`, `calendar/staff.ts`, `registrations/[id]/page.tsx`, `workpapers/load.ts`, `cx`, `getIdentity`, `binder/page.tsx`, `blocks.tsx`, `cycle/actions.ts`, `cwt-2307-tracker.test.ts`, `registrations/page.tsx`, `returns-sign-off.test.ts`, `people/schema.ts`, `return-file-actions.ts`, `registrations/forms.tsx`, `pending-review.tsx`, `file-upload.tsx`, `sign-off-actions.tsx`, `registrations/new/page.tsx`, `filters.tsx`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._