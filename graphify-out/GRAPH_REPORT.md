# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 897 files · ~711,332 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5538 nodes · 19339 edges · 192 communities (165 shown, 27 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 175 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `f2fcd22c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- december-rehearsal.test.ts
- migrate.yml
- ui.ts
- fees/schedule.ts
- package.json
- clients/[id]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
- Sign-in & Setup Docs
- cx
- Sign-off, Ledger & Payments
- zod
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
- compare.ts
- employees-xlsx.ts
- next
- index.ts
- payroll/forms.tsx
- modal.tsx
- deadlines/page.tsx
- scripts
- supabaseAdmin
- server.ts
- grid.ts
- public.ts
- module-pages.tsx
- marketing/page.tsx
- payroll/data.ts
- registrations/forms.tsx
- returns/types.ts
- Notice
- quote/page.tsx
- arap.ts
- morning.ts
- lock-bar.tsx
- missing-2307/page.tsx
- Skeleton
- Apple Design
- supabaseServer
- testing.ts
- clients/actions.ts
- engine.ts
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- FormModule
- stat-cards.tsx
- cycle/actions.ts
- @remixicon/react
- portal/documents/page.tsx
- settings/actions.ts
- how-we-work/page.tsx
- tax-codes.ts
- social-button.tsx
- Pro components
- auth-templates.ts
- tools/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/forms.tsx
- app/requests/[id]/page.tsx
- Recipes
- seed.ts
- BoardUI theming reference
- Pro templates
- review-form.tsx
- ledger/books.ts
- generate.ts
- select.tsx
- summary.ts
- boardui
- portal-nav.tsx
- profile.ts
- filings/[id]/page.tsx
- cycle/page.tsx
- sign-in-form.tsx
- vitest
- Opening balances: checklist for any cut-off
- tieouts.ts
- portal/page.tsx
- lib/books/actions.ts
- [clientId]/page.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- vat.ts
- quote.ts
- returns/load.ts
- work/load.ts
- layout.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- documents/[id]/page.tsx
- parties/[id]/page.tsx
- read.test.ts
- opening.ts
- return-file-actions.ts
- status.ts
- notifications-view.tsx
- gemini.ts
- fixed-assets/page.tsx
- review.ts
- react
- ticked-allocation.test.ts
- proof-actions.ts
- proof-upload.tsx
- queries.ts
- move-bar.tsx
- messages.ts
- notifications/format.ts
- db.test.ts
- register/page.tsx
- server-only
- ledger/types.ts
- staff/page.tsx
- sign-off-actions.tsx
- blocks.tsx
- holiday-list.ts
- ledger.test.ts
- Badge
- notification-settings-view.tsx
- app/documents/page.tsx
- eslint.config.mjs
- template.ts
- leads/[id]/page.tsx
- acting-approver/page.tsx
- bell-store.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal/[token]/page.tsx
- filings/actions.ts
- ledger-lock.test.ts
- funnel.test.ts
- opengraph-image.tsx
- lead-attribution.test.ts
- notifications.test.ts
- portal-statements-approval.test.ts
- Building UIs with BoardUI
- app/settings/page.tsx
- Card
- books-migration.test.ts
- acting-approver.test.ts
- tests/books.test.ts
- defer-documents.test.ts
- ref_node_fs
- fixed-assets.test.ts
- parallel-run.test.ts
- [month]/page.tsx
- ledger-closing.test.ts
- generate-qap-fixture.mjs
- tests/payroll.test.ts
- register-books.test.ts
- returns-books.test.ts
- contribution-payables.test.ts
- @supabase/ssr
- @techstark/opencv-js
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 315 edges
2. `cx` - 283 edges
3. `react` - 254 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 235 edges
6. `next` - 211 edges
7. `Button()` - 206 edges
8. `Card()` - 167 edges
9. `vitest` - 167 edges
10. `Badge()` - 165 edges

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

## Communities (192 total, 27 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.07
Nodes (59): BooksContext, one(), SearchParams, Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff() (+51 more)

### Community 1 - "december-rehearsal.test.ts"
Cohesion: 0.09
Nodes (15): as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll() (+7 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.09
Nodes (45): BooksFrame(), blankLine(), InvoiceForm(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), KINDS (+37 more)

### Community 4 - "fees/schedule.ts"
Cohesion: 0.11
Nodes (27): ProposalSetup, JobOption, Quote, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+19 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "clients/[id]/page.tsx"
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

### Community 11 - "notification-bell.tsx"
Cohesion: 0.19
Nodes (18): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), BellAudience (+10 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.03
Nodes (84): ClientTab, UNDER, AvatarColor, AvatarProps, AvatarSize, styles, StatusDot(), StatusDotColor (+76 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "zod"
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
Nodes (53): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+45 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (81): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+73 more)

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

### Community 40 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (37): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+29 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (86): ParallelRun(), ParallelRunPage(), quarterMonths(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Atcs() (+78 more)

### Community 43 - "employees-xlsx.ts"
Cohesion: 0.11
Nodes (21): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+13 more)

### Community 44 - "next"
Cohesion: 0.06
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+26 more)

### Community 45 - "index.ts"
Cohesion: 0.06
Nodes (21): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+13 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (46): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+38 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.06
Nodes (65): GenerateButton(), AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+57 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.14
Nodes (27): Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage(), when (+19 more)

### Community 51 - "server.ts"
Cohesion: 0.10
Nodes (39): postPayrollAction(), PostState, PostPayrollButton(), activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema (+31 more)

### Community 52 - "grid.ts"
Cohesion: 0.18
Nodes (15): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+7 more)

### Community 53 - "public.ts"
Cohesion: 0.12
Nodes (36): GET(), Link, acceptProposalAction(), AcceptState, pageAttribution(), requestQuoteAction(), SERVICES, StartState (+28 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.12
Nodes (28): BankAccountsRoute(), booksContext(), fmtDate(), fmtMonth(), BooksList(), Column, ListRow, RowLink() (+20 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.11
Nodes (26): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+18 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.14
Nodes (32): EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Signatory, mmdd(), paidInYear() (+24 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (86): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openYearRenewalsAction() (+78 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (75): FinancialStatements, client, row(), incomePayment(), VatData, INPUTS, MONTH, PAYSLIP_COLUMNS (+67 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (67): BatchUpload(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), ReleaseReportForm(), SetupForm(), OpeningAssetForm(), AssignForm() (+59 more)

### Community 60 - "quote/page.tsx"
Cohesion: 0.16
Nodes (20): loadTaxOnFee(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+12 more)

### Community 61 - "arap.ts"
Cohesion: 0.12
Nodes (27): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+19 more)

### Community 62 - "morning.ts"
Cohesion: 0.20
Nodes (13): digestMessage(), DigestRow, longDay(), peso, time(), Email, line(), longDay() (+5 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (29): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+21 more)

### Community 64 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 65 - "Skeleton"
Cohesion: 0.07
Nodes (57): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE (+49 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "supabaseServer"
Cohesion: 0.08
Nodes (47): addClientNoteAction(), NoteState, GET(), archiveLinkAction(), createLinkAction(), text(), openRegistrationAction(), ActingState (+39 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "clients/actions.ts"
Cohesion: 0.06
Nodes (59): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+51 more)

### Community 70 - "engine.ts"
Cohesion: 0.23
Nodes (16): compareIso(), lastDayOfMonth(), fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), Obligation, periodApplies() (+8 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.13
Nodes (45): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+37 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (73): GridRow, MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv() (+65 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "FormModule"
Cohesion: 0.14
Nodes (12): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, form1601C (+4 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "cycle/actions.ts"
Cohesion: 0.22
Nodes (17): Cycle(), MonthComplete(), SentRow, TimelineRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+9 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.06
Nodes (62): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+54 more)

### Community 79 - "portal/documents/page.tsx"
Cohesion: 0.09
Nodes (36): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+28 more)

### Community 80 - "settings/actions.ts"
Cohesion: 0.19
Nodes (16): zod, addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState (+8 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (35): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+27 more)

### Community 82 - "tax-codes.ts"
Cohesion: 0.20
Nodes (14): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+6 more)

### Community 83 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 86 - "tools/page.tsx"
Cohesion: 0.15
Nodes (25): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+17 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.07
Nodes (71): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+63 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.18
Nodes (13): amt(), ApprovalMemo(), Db, TIE, ReviewNote, approvalMemo(), Memo, MemoMonth (+5 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (29): metadata, QuotesClosed(), Start(), StartPage(), AttributionKeeper(), noop(), readAttribution(), useAttribution() (+21 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.23
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/forms.tsx"
Cohesion: 0.19
Nodes (25): PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+17 more)

### Community 94 - "app/requests/[id]/page.tsx"
Cohesion: 0.12
Nodes (35): PreviewTable(), RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail() (+27 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "seed.ts"
Cohesion: 0.25
Nodes (8): DeadlineRule, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 97 - "BoardUI theming reference"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.06
Nodes (49): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+41 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.08
Nodes (40): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+32 more)

### Community 101 - "generate.ts"
Cohesion: 0.13
Nodes (26): Rule, TimelineFiling, TimelineItem, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance (+18 more)

### Community 102 - "select.tsx"
Cohesion: 0.05
Nodes (62): react-aria-components, SheetPreview(), Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps (+54 more)

### Community 103 - "summary.ts"
Cohesion: 0.25
Nodes (8): CycleRow, EXCEPTION_DECISIONS, ExceptionDecision, parseMonth(), Submission, submission(), submissionLabel, submissionTone

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "portal-nav.tsx"
Cohesion: 0.38
Nodes (7): activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab, Tab, under()

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (60): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+52 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (40): ClientTabs(), ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus (+32 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.29
Nodes (12): CycleWithClient, DocRow, shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd() (+4 more)

### Community 109 - "sign-in-form.tsx"
Cohesion: 0.13
Nodes (21): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+13 more)

### Community 110 - "vitest"
Cohesion: 0.05
Nodes (16): pg, vitest, root, root, root, root, root, HASH (+8 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "tieouts.ts"
Cohesion: 0.18
Nodes (18): buildYear(), month1601C(), RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile (+10 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.10
Nodes (37): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+29 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (40): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+32 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.08
Nodes (62): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+54 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.20
Nodes (17): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+9 more)

### Community 118 - "vat.ts"
Cohesion: 0.14
Nodes (43): SaleSplit, incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm (+35 more)

### Community 119 - "quote.ts"
Cohesion: 0.07
Nodes (51): PriceRow, jobName(), lineName(), longDate(), money(), php, ProposalData, ProposalView() (+43 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.07
Nodes (53): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+45 more)

### Community 121 - "work/load.ts"
Cohesion: 0.16
Nodes (20): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), lastMonth(), loadMyWork() (+12 more)

### Community 122 - "layout.ts"
Cohesion: 0.23
Nodes (14): bodyBlocks(), DEFAULT_BRAND, EmailAction, EmailBrand, escapeHtml(), fullBrand(), linkify(), plainTextToHtml() (+6 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (41): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+33 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.11
Nodes (33): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+25 more)

### Community 126 - "documents/[id]/page.tsx"
Cohesion: 0.07
Nodes (50): AGENCIES, Db, LOANS, p(), Run, applyColumnsAction(), done(), payrollDocument() (+42 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (56): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+48 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (64): geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+56 more)

### Community 129 - "opening.ts"
Cohesion: 0.08
Nodes (34): BookLine, ColumnarRow, JournalRow, LedgerSection, SundryLine, EntryLineOut, CheckedOpening, checkOpening() (+26 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (52): RFC-2047, RFC-2822, Filing(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+44 more)

### Community 131 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 132 - "notifications-view.tsx"
Cohesion: 0.12
Nodes (28): notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, Empty(), NotificationsView(), one() (+20 more)

### Community 133 - "gemini.ts"
Cohesion: 0.07
Nodes (36): ok, FieldKey, keys, normalizeAmount(), normalizeFields(), normalizePartyKind(), normalizeTerms(), normalizeTin() (+28 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 135 - "review.ts"
Cohesion: 0.36
Nodes (6): ALWAYS, MonthActivity, refsToSign(), reviewGaps(), SIGNED_REFS, quiet

### Community 136 - "react"
Cohesion: 0.07
Nodes (54): react, Batch(), BatchPage(), one(), toCentavos(), CustomersRoute(), NewEmployee(), NewEmployeePage() (+46 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "proof-actions.ts"
Cohesion: 0.29
Nodes (9): amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text(), TYPES (+1 more)

### Community 139 - "proof-upload.tsx"
Cohesion: 0.48
Nodes (6): METHODS, ProofUpload(), send(), ProofState, startProofUpload(), submitProof()

### Community 140 - "queries.ts"
Cohesion: 0.19
Nodes (14): GET(), BELL_LIMIT, BellData, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+6 more)

### Community 141 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 142 - "messages.ts"
Cohesion: 0.38
Nodes (5): cycleMessage(), dayFmt, NoticeKind, showDay(), Due

### Community 143 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 145 - "register/page.tsx"
Cohesion: 0.09
Nodes (25): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, KIND_LABELS (+17 more)

### Community 146 - "server-only"
Cohesion: 0.10
Nodes (39): server-only, @supabase/supabase-js, GET(), GET(), GET(), GET(), generateFilingsNow(), generatePastFilingsAction() (+31 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.09
Nodes (33): Accounts(), AccountsPage(), GROUPS, AccountForm(), Access, OpeningChecklist(), STATUS, Cutoff (+25 more)

### Community 148 - "staff/page.tsx"
Cohesion: 0.46
Nodes (6): BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList()

### Community 149 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+2 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (102): nextConfig, next, GlobalNotFound(), metadata, robots(), AboutPage(), HOW, metadata (+94 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.26
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+3 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "Badge"
Cohesion: 0.17
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 154 - "notification-settings-view.tsx"
Cohesion: 0.23
Nodes (11): EmailSwitches(), EmailSwitchGroup, Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS, NotificationAudience (+3 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (36): ApprovedReview(), ApprovedRow, ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), ApprovedTable() (+28 more)

### Community 156 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 157 - "template.ts"
Cohesion: 0.06
Nodes (52): EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow (+44 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (36): NotesCard(), FunnelSwitch(), bookedTime, LeadPage(), LeadTouch, Person, day(), Leads() (+28 more)

### Community 159 - "acting-approver/page.tsx"
Cohesion: 0.11
Nodes (37): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+29 more)

### Community 160 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.10
Nodes (40): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), buttonClass(), Interval (+32 more)

### Community 163 - "proposal/[token]/page.tsx"
Cohesion: 0.53
Nodes (4): AcceptForm(), metadata, Proposal(), ProposalPage()

### Community 164 - "filings/actions.ts"
Cohesion: 0.22
Nodes (15): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+7 more)

### Community 165 - "ledger-lock.test.ts"
Cohesion: 0.33
Nodes (3): BOOK_LOCK_FORMS, doc(), root

### Community 166 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 171 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.15
Nodes (26): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+18 more)

### Community 173 - "Card"
Cohesion: 0.19
Nodes (25): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+17 more)

### Community 174 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 178 - "ref_node_fs"
Cohesion: 0.05
Nodes (18): outDir, pkgDir, require, { version }, dir, ctx, input, root (+10 more)

### Community 179 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 180 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 181 - "[month]/page.tsx"
Cohesion: 0.10
Nodes (47): saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), PayrollRuns() (+39 more)

### Community 182 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 183 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 185 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1472 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `blocks.tsx` to `form-2307.ts`, `ui.ts`, `package.json`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `cx`, `zod`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `next`, `payroll/forms.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `server.ts`, `public.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `quote/page.tsx`, `arap.ts`, `lock-bar.tsx`, `missing-2307/page.tsx`, `Skeleton`, `supabaseServer`, `clients/actions.ts`, `books/forms.tsx`, `cycle/actions.ts`, `@remixicon/react`, `portal/documents/page.tsx`, `settings/actions.ts`, `tools/page.tsx`, `portal/reports/page.tsx`, `workpapers/load.ts`, `intake-picker.tsx`, `form-2316.tsx`, `leads/forms.tsx`, `app/requests/[id]/page.tsx`, `review-form.tsx`, `ledger/books.ts`, `portal-nav.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `sign-in-form.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `returns/load.ts`, `work/load.ts`, `batch/register.ts`, `statement.ts`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `return-file-actions.ts`, `notifications-view.tsx`, `fixed-assets/page.tsx`, `react`, `proof-actions.ts`, `proof-upload.tsx`, `queries.ts`, `move-bar.tsx`, `server-only`, `ledger/types.ts`, `sign-off-actions.tsx`, `Badge`, `app/documents/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `acting-approver/page.tsx`, `proposal/[token]/page.tsx`, `filings/actions.ts`, `opengraph-image.tsx`, `app/settings/page.tsx`, `Card`, `[month]/page.tsx`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0727927927927928 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `cx`, `zod`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `next`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `server.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `Notice`, `quote/page.tsx`, `lock-bar.tsx`, `missing-2307/page.tsx`, `Skeleton`, `supabaseServer`, `clients/actions.ts`, `books/forms.tsx`, `stat-cards.tsx`, `cycle/actions.ts`, `@remixicon/react`, `portal/documents/page.tsx`, `how-we-work/page.tsx`, `social-button.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/forms.tsx`, `app/requests/[id]/page.tsx`, `review-form.tsx`, `ledger/books.ts`, `select.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `sign-in-form.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `quote.ts`, `returns/load.ts`, `work/load.ts`, `batch/register.ts`, `statement.ts`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `return-file-actions.ts`, `notifications-view.tsx`, `fixed-assets/page.tsx`, `proof-upload.tsx`, `queries.ts`, `move-bar.tsx`, `server-only`, `ledger/types.ts`, `staff/page.tsx`, `sign-off-actions.tsx`, `blocks.tsx`, `Badge`, `notification-settings-view.tsx`, `app/documents/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `acting-approver/page.tsx`, `bell-store.ts`, `calendar/page.tsx`, `proposal/[token]/page.tsx`, `app/settings/page.tsx`, `Card`, `[month]/page.tsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `december-rehearsal.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08994708994708994 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `december-rehearsal.test.ts`, `ui.ts`, `fees/schedule.ts`, `package.json`, `clients/[id]/page.tsx`, `statements.ts`, `income.ts`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `index.ts`, `deadlines/page.tsx`, `supabaseAdmin`, `server.ts`, `public.ts`, `registrations/forms.tsx`, `returns/types.ts`, `quote/page.tsx`, `arap.ts`, `morning.ts`, `lock-bar.tsx`, `testing.ts`, `clients/actions.ts`, `engine.ts`, `books/forms.tsx`, `payroll/payroll.test.ts`, `@remixicon/react`, `settings/actions.ts`, `tax-codes.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `app/requests/[id]/page.tsx`, `review-form.tsx`, `ledger/books.ts`, `generate.ts`, `summary.ts`, `portal-nav.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `sign-in-form.tsx`, `portal/page.tsx`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `quote.ts`, `returns/load.ts`, `work/load.ts`, `layout.ts`, `batch/register.ts`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `read.test.ts`, `opening.ts`, `return-file-actions.ts`, `status.ts`, `gemini.ts`, `fixed-assets/page.tsx`, `review.ts`, `ticked-allocation.test.ts`, `move-bar.tsx`, `messages.ts`, `notifications/format.ts`, `db.test.ts`, `register/page.tsx`, `server-only`, `ledger/types.ts`, `blocks.tsx`, `holiday-list.ts`, `ledger.test.ts`, `app/documents/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `acting-approver/page.tsx`, `calendar/page.tsx`, `filings/actions.ts`, `ledger-lock.test.ts`, `funnel.test.ts`, `lead-attribution.test.ts`, `notifications.test.ts`, `portal-statements-approval.test.ts`, `app/settings/page.tsx`, `books-migration.test.ts`, `acting-approver.test.ts`, `tests/books.test.ts`, `defer-documents.test.ts`, `ref_node_fs`, `fixed-assets.test.ts`, `parallel-run.test.ts`, `ledger-closing.test.ts`, `tests/payroll.test.ts`, `register-books.test.ts`, `returns-books.test.ts`, `contribution-payables.test.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._