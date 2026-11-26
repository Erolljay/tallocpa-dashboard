# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 862 files · ~676,480 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .css 8, (none) 4, .mdc 1)

## Summary
- 5342 nodes · 18621 edges · 181 communities (163 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 155 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `0a10e06c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- generate.ts
- migrate.yml
- Centavos
- public.ts
- devDependencies
- clients/[id]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
- Sign-in & Setup Docs
- documents/[id]/page.tsx
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
- year-end/page.tsx
- scores/page.tsx
- Centavos
- payroll/types.ts
- module-pages.tsx
- index.ts
- payroll/forms.tsx
- modal.tsx
- addDays
- scripts
- slots.ts
- workpapers/page.tsx
- register-xlsx.ts
- app/settings/page.tsx
- settlement-pages.tsx
- marketing/page.tsx
- payroll/data.ts
- registrations/[id]/page.tsx
- returns/types.ts
- Notice
- layout.ts
- ledger/data.ts
- filings/actions.ts
- manilaToday
- cx
- dropdown.tsx
- Apple Design
- server.ts
- testing.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- [month]/page.tsx
- stat-cards.tsx
- cycle-forms.tsx
- theme-toggle.tsx
- quote.ts
- portal/layout.tsx
- idle-watcher.tsx
- supabaseServer
- button.tsx
- Pro components
- getIdentity
- Badge
- portal/reports/page.tsx
- portal-billing.test.ts
- steps.ts
- document-scanner.tsx
- gap/page.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- toCentavos
- Recipes
- year/[year]/page.tsx
- BoardUI page patterns
- Pro templates
- ui.ts
- ledger/books.ts
- addDays
- settings/actions.ts
- Skeleton
- boardui
- react
- profile.ts
- filings/[id]/page.tsx
- app/documents/page.tsx
- document-upload.tsx
- generate-qap-fixture.mjs
- Opening balances: checklist for any cut-off
- month.ts
- portal/page.tsx
- transactions-actions.ts
- return-file-actions.ts
- calendar/staff.ts
- apply-migrations.sh
- vat.ts
- documents/labels.ts
- returns/types.ts
- returns/load.ts
- Card
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- payroll-read-actions.ts
- lib/books/actions.ts
- read.test.ts
- app/requests/page.tsx
- return-file-actions.ts
- fees/forms.tsx
- onboarding/page.tsx
- gemini.ts
- work/load.ts
- rates.ts
- PageHeader
- ticked-allocation.test.ts
- books-ready.ts
- ledger.test.ts
- pending-review.tsx
- cycle/actions.ts
- booksContext
- layout.ts
- names.ts
- [clientId]/[year]/page.tsx
- supabaseAdmin
- opening-checklist.tsx
- fixed-assets/page.tsx
- sign-off-actions.tsx
- (site)/page.tsx
- holiday-list.ts
- safeguards.ts
- register/page.tsx
- social-button.tsx
- app/documents/page.tsx
- package.json
- financial-statements-view.tsx
- seed.ts
- filed-returns.ts
- proof-actions.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- template.ts
- [id]/returns/page.tsx
- batch/page.tsx
- eslint.config.mjs
- opengraph-image.tsx
- lead-attribution.test.ts
- typescript@^5
- requireOwner
- acting-approver.test.ts
- registrations/forms.tsx
- parallel-run.test.ts
- returns-sign-off.test.ts
- formatAmount
- fees/types.ts
- vitest
- books-migration.test.ts
- tests/books.test.ts
- review/page.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 310 edges
2. `cx` - 265 edges
3. `react` - 245 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 233 edges
6. `next` - 206 edges
7. `Button()` - 204 edges
8. `Card()` - 166 edges
9. `Badge()` - 165 edges
10. `vitest` - 157 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `generateFilings()` --calls--> `buildFilingRows()`  [EXTRACTED]
  supabase/tests/december-rehearsal.test.ts → src/lib/filings/generate.ts
- `worksheet()` --indirect_call--> `fromBooksRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/returns/source.ts
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (181 total, 18 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.13
Nodes (31): load2307Staff(), one(), portal2307(), SearchParams, By2307, fmt(), forms2307(), groupByAtc() (+23 more)

### Community 1 - "generate.ts"
Cohesion: 0.13
Nodes (25): Rule, PlannedObligation, IsoDate, DeadlineRule, DueRule, EfpsGroup, FilingChannel, FilingInstance (+17 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "Centavos"
Cohesion: 0.08
Nodes (47): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+39 more)

### Community 4 - "public.ts"
Cohesion: 0.12
Nodes (23): zod, dateFmt, statusLabel, statusTone, Supabase, QuerySource, conditionsSchema, FEE_ITEM_COLUMNS (+15 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19 (+7 more)

### Community 6 - "clients/[id]/page.tsx"
Cohesion: 0.10
Nodes (35): FormState, removeAssignmentAction(), ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient() (+27 more)

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

### Community 11 - "notification-bell.tsx"
Cohesion: 0.04
Nodes (93): GET(), SheetPreview(), Content(), NotificationsPage(), Content(), NotificationSettingsPage(), Content(), PortalNotificationSettingsPage() (+85 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "documents/[id]/page.tsx"
Cohesion: 0.25
Nodes (11): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ReadPayrollButton(), pendingDocumentTaxCodes(), LockFiling (+3 more)

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
Nodes (44): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES (+36 more)

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

### Community 40 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (26): FormState, ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd(), YearEndPage(), yearStartOf() (+18 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "Centavos"
Cohesion: 0.05
Nodes (76): ParallelRun(), ParallelRunPage(), quarterMonths(), th(), CELL, FirmParallelRunPage(), monthShort(), Summary() (+68 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.12
Nodes (19): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+11 more)

### Community 44 - "module-pages.tsx"
Cohesion: 0.15
Nodes (31): BankAccountsRoute(), fmtDate(), fmtMonth(), BooksFrame(), BooksList(), Column, ListRow, RowLink() (+23 more)

### Community 45 - "index.ts"
Cohesion: 0.04
Nodes (35): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+27 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (54): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+46 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

### Community 48 - "addDays"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "slots.ts"
Cohesion: 0.13
Nodes (30): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+22 more)

### Community 51 - "workpapers/page.tsx"
Cohesion: 0.18
Nodes (21): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+13 more)

### Community 52 - "register-xlsx.ts"
Cohesion: 0.17
Nodes (21): file(), GET(), safe(), loadStored(), buildEmployeeTemplate(), sortItems(), draftToTemplate(), initialDraft() (+13 more)

### Community 53 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (34): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+26 more)

### Community 54 - "settlement-pages.tsx"
Cohesion: 0.11
Nodes (25): PaymentsNewPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), ReceiptsViewPage(), fmt(), OpenInvoice (+17 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.07
Nodes (53): ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable(), FirmMarketingPage() (+45 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.09
Nodes (54): EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+46 more)

### Community 57 - "registrations/[id]/page.tsx"
Cohesion: 0.16
Nodes (30): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+22 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (62): lookupAtc(), client, row(), VatData, INPUTS, MONTH, PAYSLIP_COLUMNS, payslipCsv() (+54 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (66): AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), OpeningUpload(), ReleaseReportForm() (+58 more)

### Community 60 - "layout.ts"
Cohesion: 0.13
Nodes (18): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+10 more)

### Community 61 - "ledger/data.ts"
Cohesion: 0.09
Nodes (36): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+28 more)

### Community 62 - "filings/actions.ts"
Cohesion: 0.06
Nodes (58): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, advanceFilingAction() (+50 more)

### Community 63 - "manilaToday"
Cohesion: 0.15
Nodes (24): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+16 more)

### Community 64 - "cx"
Cohesion: 0.03
Nodes (96): NotificationFilterTabs(), NotificationRowData, Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CHIP_COLORS (+88 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.05
Nodes (58): react-aria-components, Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem() (+50 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "server.ts"
Cohesion: 0.17
Nodes (17): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+9 more)

### Community 68 - "testing.ts"
Cohesion: 0.13
Nodes (25): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+17 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.07
Nodes (64): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+56 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.12
Nodes (31): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), displayName(), fullAddress(), listNameCols(), lookupParties() (+23 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (39): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+31 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.14
Nodes (26): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+18 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "[month]/page.tsx"
Cohesion: 0.18
Nodes (16): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+8 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "cycle-forms.tsx"
Cohesion: 0.19
Nodes (18): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CycleRow, EXCEPTION_DECISIONS, ExceptionDecision (+10 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 79 - "quote.ts"
Cohesion: 0.15
Nodes (21): buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange(), matches(), pesos() (+13 more)

### Community 80 - "portal/layout.tsx"
Cohesion: 0.08
Nodes (38): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+30 more)

### Community 81 - "idle-watcher.tsx"
Cohesion: 0.20
Nodes (17): POST(), ACTIVITY, readCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS, IDLE_WRITE_EVERY_MS (+9 more)

### Community 82 - "supabaseServer"
Cohesion: 0.07
Nodes (51): nextConfig, next, setIncomeTaxMethodAction(), addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton() (+43 more)

### Community 83 - "button.tsx"
Cohesion: 0.06
Nodes (37): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+29 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "getIdentity"
Cohesion: 0.20
Nodes (20): RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), Thread() (+12 more)

### Community 86 - "Badge"
Cohesion: 0.10
Nodes (32): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), ReverseForm() (+24 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.12
Nodes (53): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote() (+45 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "steps.ts"
Cohesion: 0.09
Nodes (22): Agency, birForm(), BranchOptions, CaseStep, ClosureOptions, closureStepsFor(), dayNumber(), EMPLOYER_STEPS (+14 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "gap/page.tsx"
Cohesion: 0.15
Nodes (21): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+13 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (44): NotesCard(), ClientNoteForm(), FunnelSwitch(), ReopenForm(), bookedTime, Lead(), LeadPage(), LeadSource() (+36 more)

### Community 94 - "toCentavos"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "year/[year]/page.tsx"
Cohesion: 0.31
Nodes (9): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings(), PayrollClient (+1 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "ui.ts"
Cohesion: 0.07
Nodes (48): SettingsPage(), BooksSummaryPage(), Summary(), SummaryCard(), SettingsRoute(), AllocationRow, InvoiceLineRow, InvoiceRow (+40 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.06
Nodes (50): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+42 more)

### Community 101 - "addDays"
Cohesion: 0.19
Nodes (22): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), fiscalYearOf(), followsCalendarYear() (+14 more)

### Community 102 - "settings/actions.ts"
Cohesion: 0.21
Nodes (15): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+7 more)

### Community 103 - "Skeleton"
Cohesion: 0.09
Nodes (31): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, JournalRoute() (+23 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "react"
Cohesion: 0.09
Nodes (31): react, setYearEndCheckAction(), TickForm(), AddBranchForm(), BranchRowForm(), Branches(), BranchesPage(), FormState (+23 more)

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (37): FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText, Filing() (+29 more)

### Community 108 - "app/documents/page.tsx"
Cohesion: 0.09
Nodes (39): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DirectoryParty, ENTRY_STATUS (+31 more)

### Community 109 - "document-upload.tsx"
Cohesion: 0.13
Nodes (24): DocReviewActions(), DocumentsCard(), when(), DocumentUpload(), send(), upload(), Item, typeFromName() (+16 more)

### Community 110 - "generate-qap-fixture.mjs"
Cohesion: 0.14
Nodes (9): outDir, pkgDir, require, { version }, api, ctx, fn, rows (+1 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.25
Nodes (16): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+8 more)

### Community 115 - "return-file-actions.ts"
Cohesion: 0.18
Nodes (22): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+14 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (37): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+29 more)

### Community 118 - "vat.ts"
Cohesion: 0.11
Nodes (52): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments(), Periods (+44 more)

### Community 119 - "documents/labels.ts"
Cohesion: 0.11
Nodes (26): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+18 more)

### Community 120 - "returns/types.ts"
Cohesion: 0.07
Nodes (36): FinancialStatements, SaleSplit, withNonDeductible(), SawtResult, Split, form1601C, PAYROLL_FORMS, client (+28 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.07
Nodes (42): worksheetTaxDue(), Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet() (+34 more)

### Community 122 - "Card"
Cohesion: 0.11
Nodes (35): Accounts(), AccountsPage(), GROUPS, NewEmployee(), NewEmployeePage(), loadSchedules(), longDate(), nextEffectiveDate() (+27 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (38): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+30 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.11
Nodes (32): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+24 more)

### Community 126 - "payroll-read-actions.ts"
Cohesion: 0.14
Nodes (23): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), headerKey() (+15 more)

### Community 127 - "lib/books/actions.ts"
Cohesion: 0.17
Nodes (21): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+13 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (82): RFC-4180, geminiJson(), ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, PayrollItem, amountOf() (+74 more)

### Community 129 - "app/requests/page.tsx"
Cohesion: 0.21
Nodes (14): Requests(), RequestsPage(), Row, PortalRequests(), Requests(), Row, when(), manilaDate() (+6 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.14
Nodes (28): RFC-2047, RFC-2822, GET(), esubmissionMailEnv(), accessToken(), call(), findReplies(), headerOf() (+20 more)

### Community 131 - "fees/forms.tsx"
Cohesion: 0.23
Nodes (17): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+9 more)

### Community 132 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (29): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+21 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (19): OCR_READ_FIELDS, OcrOutput, ocrOutputSchema, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+11 more)

### Community 134 - "work/load.ts"
Cohesion: 0.16
Nodes (20): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), lastMonth(), loadMyWork() (+12 more)

### Community 135 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 136 - "PageHeader"
Cohesion: 0.09
Nodes (37): NewEntry(), NewEntryPage(), Certificates(), Form2316Page(), ClientList(), ClientsPage(), MergeForm(), PartyForm() (+29 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "books-ready.ts"
Cohesion: 0.35
Nodes (8): filingsBooksReady(), BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked(), booksReadyMap(), keepBooksReady()

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "pending-review.tsx"
Cohesion: 0.16
Nodes (18): BulkState, BookingFields(), BooksChoices(), Codes, initialCodes(), ocrKeys(), PendingReview(), Pick() (+10 more)

### Community 141 - "cycle/actions.ts"
Cohesion: 0.26
Nodes (14): MonthComplete(), SentRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction() (+6 more)

### Community 142 - "booksContext"
Cohesion: 0.27
Nodes (10): booksContext(), BooksContext, one(), SearchParams, CustomersRoute(), KINDS, PartyList(), Print() (+2 more)

### Community 143 - "layout.ts"
Cohesion: 0.26
Nodes (13): bodyBlocks(), DEFAULT_BRAND, EmailAction, escapeHtml(), fullBrand(), linkify(), plainTextToHtml(), receivingLine() (+5 more)

### Community 144 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 145 - "[clientId]/[year]/page.tsx"
Cohesion: 0.39
Nodes (8): PrintAll(), PrintAll2316Page(), Portal2316(), Portal2316Page(), Form2316Set(), Form2316Sheet(), PrintButton(), load2316()

### Community 146 - "supabaseAdmin"
Cohesion: 0.12
Nodes (35): server-only, @supabase/supabase-js, GET(), GET(), GET(), generateFilingsNow(), generatePastFilingsAction(), runActingDigest() (+27 more)

### Community 147 - "opening-checklist.tsx"
Cohesion: 0.13
Nodes (22): Access, STATUS, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, ChecklistInput, ChecklistItem (+14 more)

### Community 148 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 149 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 150 - "(site)/page.tsx"
Cohesion: 0.05
Nodes (95): robots(), AboutPage(), HOW, metadata, BirCalendarPage(), metadata, BRING, ContactList() (+87 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.26
Nodes (10): easterSunday(), HolidayKind, HolidayRule, iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+2 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.10
Nodes (35): SafeguardsNotice(), CoverageClient, coverageGaps(), Gap, GapKind, board, MARCO, none (+27 more)

### Community 153 - "register/page.tsx"
Cohesion: 0.09
Nodes (42): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+34 more)

### Community 154 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.13
Nodes (26): Booking, ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+18 more)

### Community 156 - "package.json"
Cohesion: 0.18
Nodes (10): @supabase/ssr@^0.12.7, tailwind-merge@^3.7.1, @tailwindcss/turbopack@4.3.3, name, packageManager, private, version, @supabase/ssr (+2 more)

### Community 157 - "financial-statements-view.tsx"
Cohesion: 0.17
Nodes (15): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+7 more)

### Community 158 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 159 - "filed-returns.ts"
Cohesion: 0.23
Nodes (10): FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear(), TaxTypeGroup (+2 more)

### Community 160 - "proof-actions.ts"
Cohesion: 0.29
Nodes (9): amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text(), TYPES (+1 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.22
Nodes (20): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), Interval, manilaInstant() (+12 more)

### Community 163 - "template.ts"
Cohesion: 0.22
Nodes (6): items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL

### Community 164 - "[id]/returns/page.tsx"
Cohesion: 0.36
Nodes (7): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), Returns(), booksStillOpen(), filingsNeedingAmendment()

### Community 165 - "batch/page.tsx"
Cohesion: 0.42
Nodes (7): BatchUpload(), PreviewTable(), Batch(), BatchPage(), one(), toCentavos(), BatchKind

### Community 166 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 174 - "requireOwner"
Cohesion: 0.09
Nodes (39): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction(), ActingState (+31 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 177 - "registrations/forms.tsx"
Cohesion: 0.11
Nodes (37): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+29 more)

### Community 178 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 180 - "formatAmount"
Cohesion: 0.12
Nodes (29): MonthSelect(), Certificates(), Staff2307Page(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print() (+21 more)

### Community 181 - "fees/types.ts"
Cohesion: 0.23
Nodes (13): count(), first(), pick(), profileFromQuery(), BOOKKEEPING_LEVELS, BookkeepingLevel, COMPLEXITY_FLAGS, ComplexityFlag (+5 more)

### Community 183 - "vitest"
Cohesion: 0.03
Nodes (35): pg, vitest, ctx, input, root, root, root, root (+27 more)

### Community 184 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 185 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 193 - "review/page.tsx"
Cohesion: 0.10
Nodes (38): DashboardStats(), FilingTable(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey (+30 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1428 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `generate.ts`, `Centavos`, `devDependencies`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `documents/[id]/page.tsx`, `statements.ts`, `income.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `index.ts`, `addDays`, `slots.ts`, `app/settings/page.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/[id]/page.tsx`, `returns/types.ts`, `layout.ts`, `ledger/data.ts`, `filings/actions.ts`, `manilaToday`, `server.ts`, `testing.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `payroll/payroll.test.ts`, `[month]/page.tsx`, `cycle-forms.tsx`, `quote.ts`, `portal/layout.tsx`, `idle-watcher.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `steps.ts`, `document-scanner.tsx`, `gap/page.tsx`, `leads/[id]/page.tsx`, `toCentavos`, `ui.ts`, `ledger/books.ts`, `addDays`, `settings/actions.ts`, `Skeleton`, `profile.ts`, `filings/[id]/page.tsx`, `app/documents/page.tsx`, `month.ts`, `portal/page.tsx`, `calendar/staff.ts`, `returns/types.ts`, `returns/load.ts`, `batch/register.ts`, `read.test.ts`, `app/requests/page.tsx`, `return-file-actions.ts`, `fees/forms.tsx`, `onboarding/page.tsx`, `gemini.ts`, `work/load.ts`, `rates.ts`, `ticked-allocation.test.ts`, `books-ready.ts`, `ledger.test.ts`, `pending-review.tsx`, `layout.ts`, `names.ts`, `supabaseAdmin`, `opening-checklist.tsx`, `fixed-assets/page.tsx`, `(site)/page.tsx`, `holiday-list.ts`, `safeguards.ts`, `register/page.tsx`, `app/documents/page.tsx`, `package.json`, `financial-statements-view.tsx`, `filed-returns.ts`, `calendar/page.tsx`, `template.ts`, `lead-attribution.test.ts`, `requireOwner`, `acting-approver.test.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `formatAmount`, `books-migration.test.ts`, `tests/books.test.ts`, `review/page.tsx`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13363363363363365 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `clients/[id]/page.tsx`, `notification-bell.tsx`, `documents/[id]/page.tsx`, `dependencies`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `module-pages.tsx`, `payroll/forms.tsx`, `addDays`, `slots.ts`, `workpapers/page.tsx`, `register-xlsx.ts`, `app/settings/page.tsx`, `settlement-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/[id]/page.tsx`, `ledger/data.ts`, `filings/actions.ts`, `manilaToday`, `cx`, `server.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `[month]/page.tsx`, `cycle-forms.tsx`, `portal/layout.tsx`, `idle-watcher.tsx`, `button.tsx`, `getIdentity`, `Badge`, `portal/reports/page.tsx`, `gap/page.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `year/[year]/page.tsx`, `ui.ts`, `ledger/books.ts`, `settings/actions.ts`, `Skeleton`, `react`, `profile.ts`, `filings/[id]/page.tsx`, `app/documents/page.tsx`, `document-upload.tsx`, `portal/page.tsx`, `transactions-actions.ts`, `return-file-actions.ts`, `calendar/staff.ts`, `documents/labels.ts`, `returns/load.ts`, `Card`, `batch/register.ts`, `manilaToday`, `payroll-read-actions.ts`, `lib/books/actions.ts`, `app/requests/page.tsx`, `return-file-actions.ts`, `fees/forms.tsx`, `onboarding/page.tsx`, `work/load.ts`, `PageHeader`, `pending-review.tsx`, `cycle/actions.ts`, `booksContext`, `[clientId]/[year]/page.tsx`, `supabaseAdmin`, `opening-checklist.tsx`, `fixed-assets/page.tsx`, `sign-off-actions.tsx`, `(site)/page.tsx`, `register/page.tsx`, `app/documents/page.tsx`, `package.json`, `financial-statements-view.tsx`, `proof-actions.ts`, `[id]/returns/page.tsx`, `batch/page.tsx`, `opengraph-image.tsx`, `requireOwner`, `registrations/forms.tsx`, `formatAmount`, `review/page.tsx`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Should `generate.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12807881773399016 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `clients/[id]/page.tsx`, `notification-bell.tsx`, `documents/[id]/page.tsx`, `dependencies`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `module-pages.tsx`, `payroll/forms.tsx`, `modal.tsx`, `addDays`, `slots.ts`, `workpapers/page.tsx`, `app/settings/page.tsx`, `settlement-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/[id]/page.tsx`, `Notice`, `filings/actions.ts`, `manilaToday`, `cx`, `dropdown.tsx`, `server.ts`, `[clientId]/page.tsx`, `books/forms.tsx`, `[month]/page.tsx`, `stat-cards.tsx`, `cycle-forms.tsx`, `theme-toggle.tsx`, `portal/layout.tsx`, `idle-watcher.tsx`, `supabaseServer`, `button.tsx`, `getIdentity`, `Badge`, `portal/reports/page.tsx`, `document-scanner.tsx`, `gap/page.tsx`, `leads/[id]/page.tsx`, `year/[year]/page.tsx`, `ui.ts`, `ledger/books.ts`, `Skeleton`, `profile.ts`, `filings/[id]/page.tsx`, `app/documents/page.tsx`, `document-upload.tsx`, `portal/page.tsx`, `transactions-actions.ts`, `return-file-actions.ts`, `calendar/staff.ts`, `documents/labels.ts`, `returns/load.ts`, `Card`, `manilaToday`, `app/requests/page.tsx`, `onboarding/page.tsx`, `work/load.ts`, `PageHeader`, `pending-review.tsx`, `cycle/actions.ts`, `booksContext`, `[clientId]/[year]/page.tsx`, `fixed-assets/page.tsx`, `sign-off-actions.tsx`, `(site)/page.tsx`, `register/page.tsx`, `social-button.tsx`, `app/documents/page.tsx`, `package.json`, `financial-statements-view.tsx`, `calendar/page.tsx`, `[id]/returns/page.tsx`, `batch/page.tsx`, `registrations/forms.tsx`, `formatAmount`, `review/page.tsx`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._