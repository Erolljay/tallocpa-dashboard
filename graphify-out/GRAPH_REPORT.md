# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 949 files · ~771,344 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5872 nodes · 20777 edges · 178 communities (158 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 184 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `9602d97f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- documents/[id]/page.tsx
- migrate.yml
- ui.ts
- public.ts
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- remittances/forms.tsx
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
- review-form.tsx
- payroll/forms.tsx
- modal.tsx
- form.tsx
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- Badge
- webhook.ts
- module-pages.tsx
- deadlines/page.tsx
- marketing/page.tsx
- PageHeader
- money.ts
- filings/run.ts
- quote/page.tsx
- books/export/route.ts
- safeguards.ts
- lock-bar.tsx
- theme-toggle.tsx
- settlement-pages.tsx
- Apple Design
- addDays
- testing.ts
- clients/actions.ts
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
- invoice-pages.tsx
- how-we-work/page.tsx
- form-2307.tsx
- app/settings/page.tsx
- Pro components
- tax-codes.ts
- Button
- portalContext
- portal-billing.test.ts
- filings/actions.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- Centavos
- Textarea
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
- amountInput
- sign-off.ts
- filings/[id]/page.tsx
- cycle/page.tsx
- pending-review.tsx
- ref_node_path
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- Field
- google/calendar.ts
- apply-migrations.sh
- payroll-read.tsx
- quote.ts
- returns/load.ts
- proposal.ts
- layout.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- requireOwner
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- worksheet/page.tsx
- move-bar.tsx
- gemini.ts
- assets/schedule.ts
- site-document.tsx
- supabaseServer
- ticked-allocation.test.ts
- transactions-actions.ts
- bulk-actions.ts
- dates.ts
- clients/schema.ts
- fixed-assets/forms.tsx
- IsoDate
- book-income.ts
- formatAmount
- server-only
- opening.ts
- books/periods.ts
- eslint.config.mjs
- blocks.tsx
- @supabase/ssr
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- app/documents/page.tsx
- @techstark/opencv-js
- template.ts
- leads/[id]/page.tsx
- app/page.tsx
- proof-actions.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- Card
- opengraph-image.tsx
- documents/labels.ts
- formToObject
- Textarea
- BoardUI page patterns
- acting-approver.test.ts
- morning.ts
- runs.tsx
- register-xlsx.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 362 edges
2. `cx` - 302 edges
3. `react` - 270 edges
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

## Communities (178 total, 20 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (40): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print() (+32 more)

### Community 1 - "documents/[id]/page.tsx"
Cohesion: 0.10
Nodes (36): file(), GET(), safe(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review() (+28 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.09
Nodes (33): MonthSelect(), SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, loadModuleCounts() (+25 more)

### Community 4 - "public.ts"
Cohesion: 0.11
Nodes (24): zod, dateFmt, statusLabel, Supabase, QuerySource, instantView(), conditionsSchema, FEE_ITEM_COLUMNS (+16 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.07
Nodes (44): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+36 more)

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

### Community 11 - "remittances/forms.tsx"
Cohesion: 0.19
Nodes (27): DueDateForm(), EmployerNumberForm(), HandlesContributionsSwitch(), PrepareForm(), RemitForm(), RemittanceButton(), RemittanceFileUpload(), send() (+19 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.03
Nodes (102): NotificationFilterTabs(), NotificationRowData, AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps (+94 more)

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

### Community 18 - "ledger/data.ts"
Cohesion: 0.09
Nodes (42): ReleaseReportForm(), WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report() (+34 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.13
Nodes (48): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), penalties(), quarterlyPayments(), reconciliation() (+40 more)

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
Cohesion: 0.10
Nodes (35): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+27 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (50): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+42 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "link-button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 45 - "review-form.tsx"
Cohesion: 0.13
Nodes (25): blankLine(), InvoiceForm(), InvoiceFormValue, BookingFields(), DirectoryParty, ENTRY_STATUS, fmtDay(), fmtMonthOf() (+17 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (59): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+51 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

### Community 48 - "form.tsx"
Cohesion: 0.13
Nodes (35): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+27 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.11
Nodes (42): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+34 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.12
Nodes (37): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+29 more)

### Community 52 - "Badge"
Cohesion: 0.06
Nodes (72): EmployerCard(), ClientReturnsPage(), FilingRow, Returns(), Client, CollectionsPage(), OpenDue, Overview() (+64 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (32): maxDuration, POST(), ClaimedNotification, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked() (+24 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.12
Nodes (46): booksContext(), BooksContext, booksViewFor(), fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame() (+38 more)

### Community 55 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+20 more)

### Community 56 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (29): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+21 more)

### Community 57 - "PageHeader"
Cohesion: 0.05
Nodes (90): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+82 more)

### Community 58 - "money.ts"
Cohesion: 0.04
Nodes (92): FinancialStatements, tinDashed(), displayName(), ATC_MASTER, AtcInfo, lookupAtc(), client, row() (+84 more)

### Community 59 - "filings/run.ts"
Cohesion: 0.36
Nodes (7): PastReturnsForm(), generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 60 - "quote/page.tsx"
Cohesion: 0.10
Nodes (32): loadSchedules(), loadTaxOnFee(), longDate(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines() (+24 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.18
Nodes (17): accountLabel(), AGING, aging(), agingBucket(), CashAccount, checkUpdate(), OpenItem, accounts (+9 more)

### Community 62 - "safeguards.ts"
Cohesion: 0.07
Nodes (48): ClientValues, TAX_TYPES, TaxType, CoverageClient, coverageGaps(), Gap, GapKind, addDays() (+40 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.19
Nodes (17): BooksLockBar(), ICON, LockBarFor(), MonthLock(), LockContext, day(), dayFmt, lockActionFor() (+9 more)

### Community 64 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 65 - "settlement-pages.tsx"
Cohesion: 0.11
Nodes (28): PaymentsNewPage(), PaymentsEditPage(), ReceiptsNewPage(), ReceiptsEditPage(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+20 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "addDays"
Cohesion: 0.08
Nodes (50): Rule, PlannedObligation, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, EfpsGroup, FilingChannel (+42 more)

### Community 68 - "testing.ts"
Cohesion: 0.14
Nodes (25): vitest, form1701, form1702RT, year, form1701Q, form1702Q, individual, form2551Q (+17 more)

### Community 69 - "clients/actions.ts"
Cohesion: 0.12
Nodes (22): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+14 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (27): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+19 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.10
Nodes (54): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+46 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.07
Nodes (54): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), PriorEmployerForm(), Release2316Form(), yearWorksheet() (+46 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.15
Nodes (40): incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, addMonths() (+32 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (43): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+35 more)

### Community 77 - "react"
Cohesion: 0.05
Nodes (80): react, addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), ClientForm(), BankAccountsRoute() (+72 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.07
Nodes (49): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+41 more)

### Community 79 - "ref_node_fs"
Cohesion: 0.02
Nodes (48): pg, outDir, pkgDir, require, { version }, dir, ctx, input (+40 more)

### Community 80 - "invoice-pages.tsx"
Cohesion: 0.16
Nodes (21): INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesViewPage(), VoidForm() (+13 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "form-2307.tsx"
Cohesion: 0.18
Nodes (16): Print(), Print2307Page(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set() (+8 more)

### Community 83 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (29): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+21 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tax-codes.ts"
Cohesion: 0.18
Nodes (16): SettingsPage(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm (+8 more)

### Community 86 - "Button"
Cohesion: 0.11
Nodes (48): setupMissingChartsAction(), StaffOptions(), AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+40 more)

### Community 87 - "portalContext"
Cohesion: 0.08
Nodes (64): PortalClient, portalContext(), Content(), PortalNotificationsPage(), Portal2316(), Portal2316Page(), Books(), PortalBooks() (+56 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "filings/actions.ts"
Cohesion: 0.05
Nodes (68): advanceFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom(), worksheetTaxDue() (+60 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (22): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), ATTRIBUTION_KEY, pickAttribution() (+14 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.14
Nodes (22): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+14 more)

### Community 93 - "Centavos"
Cohesion: 0.08
Nodes (55): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+47 more)

### Community 94 - "Textarea"
Cohesion: 0.05
Nodes (83): DeadlinesPage(), amendFilingAction(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey (+75 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "ledger/data.ts"
Cohesion: 0.13
Nodes (27): dayBefore(), GET(), safe(), Released, fromWorkbookData(), accountFromRow(), Amendment, AmendmentStatus (+19 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.13
Nodes (21): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, normalizeAmount() (+13 more)

### Community 100 - "Centavos"
Cohesion: 0.07
Nodes (51): exceljs, BookPrint(), BookPrintPage(), PrintButton(), BookPrint(), PortalBookPrint(), LooseLeafHead, LooseLeafPages() (+43 more)

### Community 101 - "opening-checklist.tsx"
Cohesion: 0.14
Nodes (21): Access, STATUS, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, ChecklistInput (+13 more)

### Community 102 - "cx"
Cohesion: 0.05
Nodes (79): react-aria-components, SheetPreview(), ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps (+71 more)

### Community 103 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "amountInput"
Cohesion: 0.36
Nodes (11): inputs1701(), inputs1702RT(), penaltyInputs(), inputs1701Q(), inputs1702Q(), withoutBookFigures(), withoutMethodChoice(), inputsFor() (+3 more)

### Community 106 - "sign-off.ts"
Cohesion: 0.10
Nodes (19): Row, FilingRow, QueueFiling, QueueViewer, ReviewQueue, reviewQueue(), ACTION_LABEL, availableActions() (+11 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (46): BatchUpload(), PreviewTable(), Batch(), BatchPage(), one(), toCentavos(), SignOffState, AmendFilingForm() (+38 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.16
Nodes (18): CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton(), closeCycleAction(), CycleState, decideExceptionAction(), nothingToSubmitAction() (+10 more)

### Community 109 - "pending-review.tsx"
Cohesion: 0.16
Nodes (16): BulkState, Booking, Codes, initialCodes(), ocrKeys(), PendingReview(), PendingRow, PendingTaxCodes (+8 more)

### Community 110 - "ref_node_path"
Cohesion: 0.02
Nodes (60): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+52 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (55): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+47 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), SentRow, BooksCards(), cents() (+26 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (29): CloseYearForm(), FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear() (+21 more)

### Community 115 - "Field"
Cohesion: 0.11
Nodes (42): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+34 more)

### Community 116 - "google/calendar.ts"
Cohesion: 0.13
Nodes (28): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+20 more)

### Community 118 - "payroll-read.tsx"
Cohesion: 0.09
Nodes (35): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+27 more)

### Community 119 - "quote.ts"
Cohesion: 0.07
Nodes (56): PriceRow, corp, items, EstimatedProfile, estimateProfile(), gapFor(), GapRow, has() (+48 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.08
Nodes (44): loadAssets(), newDocs(), oldDocs(), withNonDeductible(), EwtLine, dayBefore(), FilingRow, ListedDocument (+36 more)

### Community 121 - "proposal.ts"
Cohesion: 0.18
Nodes (17): ProposalSetup, JOB_GROUPS, JobBand, JobGroup, jobGroupOf(), JobOption, jobOptions(), ProposalJob (+9 more)

### Community 122 - "layout.ts"
Cohesion: 0.13
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.08
Nodes (42): @remixicon/react, Detail(), StatementPage(), CELL, FirmParallelRunPage(), monthShort(), Summary(), BrandSettings() (+34 more)

### Community 126 - "requireOwner"
Cohesion: 0.27
Nodes (17): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+9 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (54): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), MergeForm(), PartyForm(), PresetAccountForm() (+46 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (68): BirCategory, Category, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ITEM_KINDS, KIND_ORDER, PayrollItem (+60 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.09
Nodes (29): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+21 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (41): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), refresh(), ReturnFileState, sendEsubmissionAction(), TYPES (+33 more)

### Community 131 - "worksheet/page.tsx"
Cohesion: 0.23
Nodes (15): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, FollowUpForm(), WorksheetInputsForm(), Lines(), lineStyle, Problems() (+7 more)

### Community 132 - "move-bar.tsx"
Cohesion: 0.28
Nodes (13): ApprovedReview(), moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem (+5 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 134 - "assets/schedule.ts"
Cohesion: 0.28
Nodes (12): Row, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor(), monthIndex(), monthTotals() (+4 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 136 - "supabaseServer"
Cohesion: 0.06
Nodes (70): RemoveClientUserButton(), addClientNoteAction(), NoteState, NotesCard(), ClientNoteForm(), ClientDetail(), ClientPage(), fmtDate() (+62 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 139 - "bulk-actions.ts"
Cohesion: 0.14
Nodes (22): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), BatchRow, DocumentCodes (+14 more)

### Community 140 - "dates.ts"
Cohesion: 0.36
Nodes (10): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), statutoryDueDate(), monthChoices() (+2 more)

### Community 141 - "clients/schema.ts"
Cohesion: 0.19
Nodes (8): assignmentSchema, clientFields, editClientSchema, efpsGroupError, engagementSchema, NewClient, newClientSchema, base

### Community 142 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 143 - "IsoDate"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 144 - "book-income.ts"
Cohesion: 0.31
Nodes (8): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, linesWithMovement()

### Community 145 - "formatAmount"
Cohesion: 0.13
Nodes (28): ParallelRun(), ParallelRunPage(), quarterMonths(), th(), Atcs(), Diff(), Documents(), FigureRows() (+20 more)

### Community 146 - "server-only"
Cohesion: 0.11
Nodes (34): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+26 more)

### Community 147 - "opening.ts"
Cohesion: 0.07
Nodes (36): AgingRow, CheckedUpdate, EntryLineOut, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem (+28 more)

### Community 148 - "books/periods.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 149 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (98): StartForm(), metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW (+90 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (81): GET(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus(), onVisible() (+73 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.11
Nodes (30): ApprovedRow, ClientSelect(), PeriodFilter(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths() (+22 more)

### Community 157 - "template.ts"
Cohesion: 0.12
Nodes (18): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+10 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (43): PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+35 more)

### Community 159 - "app/page.tsx"
Cohesion: 0.36
Nodes (9): Acting(), Appointment, appointmentRow(), appointmentSchema, DelegationState, delegationState(), lastDay(), manilaDay() (+1 more)

### Community 160 - "proof-actions.ts"
Cohesion: 0.19
Nodes (16): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+8 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.33
Nodes (11): manilaInstant(), addDays(), Entry, isTeamEvent(), manilaTime(), mondayOf(), ev(), weekCells() (+3 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.16
Nodes (17): jobName(), lineName(), longDate(), money(), php, ProposalData, ProposalView(), Rows() (+9 more)

### Community 166 - "Card"
Cohesion: 0.11
Nodes (37): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), Payroll(), PayrollPage() (+29 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "documents/labels.ts"
Cohesion: 0.06
Nodes (50): nextConfig, next, DocReviewActions(), Doc, DocumentsCard(), when(), Cycle(), CyclePage() (+42 more)

### Community 170 - "formToObject"
Cohesion: 0.10
Nodes (30): ActingState, appointActingAction(), endActingAction(), refresh(), AppointForm(), EndButton(), addBranchAction(), BranchState (+22 more)

### Community 172 - "Textarea"
Cohesion: 0.12
Nodes (35): RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+27 more)

### Community 173 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "morning.ts"
Cohesion: 0.17
Nodes (15): digestMessage(), DigestRow, longDay(), peso, time(), Email, line(), longDay() (+7 more)

### Community 179 - "runs.tsx"
Cohesion: 0.24
Nodes (10): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+2 more)

### Community 181 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (33): RFC-4180, sortItems(), filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS (+25 more)

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1546 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `documents/labels.ts` to `form-2307.ts`, `documents/[id]/page.tsx`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `remittances/forms.tsx`, `cx`, `dependencies`, `ledger/data.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `review-form.tsx`, `payroll/forms.tsx`, `form.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `Badge`, `webhook.ts`, `module-pages.tsx`, `deadlines/page.tsx`, `marketing/page.tsx`, `PageHeader`, `filings/run.ts`, `quote/page.tsx`, `settlement-pages.tsx`, `clients/actions.ts`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `react`, `@remixicon/react`, `invoice-pages.tsx`, `form-2307.tsx`, `app/settings/page.tsx`, `Button`, `portalContext`, `filings/actions.ts`, `intake-picker.tsx`, `form-2316.tsx`, `Textarea`, `ledger/data.ts`, `Centavos`, `opening-checklist.tsx`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `pending-review.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `payroll-read.tsx`, `batch/register.ts`, `manilaToday`, `requireOwner`, `parties/[id]/page.tsx`, `social-button.tsx`, `return-file-actions.ts`, `worksheet/page.tsx`, `move-bar.tsx`, `site-document.tsx`, `supabaseServer`, `transactions-actions.ts`, `bulk-actions.ts`, `fixed-assets/forms.tsx`, `formatAmount`, `server-only`, `blocks.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `leads/[id]/page.tsx`, `proof-actions.ts`, `Card`, `opengraph-image.tsx`, `formToObject`, `Textarea`, `runs.tsx`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11215686274509803 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `testing.ts` to `form-2307.ts`, `ui.ts`, `public.ts`, `package.json`, `onboarding/page.tsx`, `ledger/data.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `form.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `Badge`, `webhook.ts`, `deadlines/page.tsx`, `PageHeader`, `money.ts`, `quote/page.tsx`, `books/export/route.ts`, `safeguards.ts`, `lock-bar.tsx`, `addDays`, `clients/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `@remixicon/react`, `ref_node_fs`, `invoice-pages.tsx`, `form-2307.tsx`, `app/settings/page.tsx`, `tax-codes.ts`, `portalContext`, `portal-billing.test.ts`, `filings/actions.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `Centavos`, `Textarea`, `review-form.tsx`, `Centavos`, `opening-checklist.tsx`, `rates.ts`, `sign-off.ts`, `cycle/page.tsx`, `pending-review.tsx`, `ref_node_path`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `payroll-read.tsx`, `quote.ts`, `returns/load.ts`, `layout.ts`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `return-file-actions.ts`, `move-bar.tsx`, `gemini.ts`, `assets/schedule.ts`, `ticked-allocation.test.ts`, `bulk-actions.ts`, `dates.ts`, `clients/schema.ts`, `IsoDate`, `server-only`, `opening.ts`, `books/periods.ts`, `blocks.tsx`, `ledger.test.ts`, `notification-bell.tsx`, `app/documents/page.tsx`, `app/page.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `formToObject`, `Textarea`, `acting-approver.test.ts`, `morning.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `documents/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09634146341463415 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `documents/[id]/page.tsx`, `social-button.tsx`, `ui.ts`, `move-bar.tsx`, `package.json`, `onboarding/page.tsx`, `worksheet/page.tsx`, `supabaseServer`, `site-document.tsx`, `transactions-actions.ts`, `remittances/forms.tsx`, `cx`, `fixed-assets/forms.tsx`, `dependencies`, `formatAmount`, `ledger/data.ts`, `blocks.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `leads/[id]/page.tsx`, `proof-actions.ts`, `Card`, `documents/labels.ts`, `scores/page.tsx`, `formToObject`, `cwt-tracker.ts`, `link-button.tsx`, `review-form.tsx`, `payroll/forms.tsx`, `modal.tsx`, `Textarea`, `form.tsx`, `supabaseAdmin`, `runs.tsx`, `Badge`, `fees/[id]/page.tsx`, `module-pages.tsx`, `deadlines/page.tsx`, `marketing/page.tsx`, `PageHeader`, `filings/run.ts`, `quote/page.tsx`, `lock-bar.tsx`, `theme-toggle.tsx`, `settlement-pages.tsx`, `clients/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `@remixicon/react`, `invoice-pages.tsx`, `how-we-work/page.tsx`, `form-2307.tsx`, `app/settings/page.tsx`, `Button`, `portalContext`, `document-scanner.tsx`, `intake-picker.tsx`, `Textarea`, `Centavos`, `cx`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `pending-review.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `payroll-read.tsx`, `quote.ts`, `batch/register.ts`, `manilaToday`, `parties/[id]/page.tsx`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._