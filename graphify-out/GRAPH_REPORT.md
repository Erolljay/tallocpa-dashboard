# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 920 files · ~743,461 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5680 nodes · 20069 edges · 183 communities (165 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 182 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `45310439`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- remittances/[id]/page.tsx
- fees/types.ts
- devDependencies
- safeguards-load.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- portal/page.tsx
- Sign-in & Setup Docs
- cx
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
- compare.ts
- payroll/types.ts
- onboarding/page.tsx
- server.ts
- payroll/forms.tsx
- modal.tsx
- deadlines/page.tsx
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- Badge
- marketing/page.tsx
- module-pages.tsx
- requireStaff
- ui.ts
- registrations/actions.ts
- returns/types.ts
- Notice
- registrations/[id]/page.tsx
- books/export/route.ts
- safeguards-load.ts
- lock-bar.tsx
- site/brand.ts
- invoice-pages.tsx
- Apple Design
- react
- testing.ts
- clients/actions.ts
- registrations/[id]/page.tsx
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- returns/types.ts
- @remixicon/react
- Badge
- theme-toggle.tsx
- proposal-view.tsx
- parallel-run.tsx
- how-we-work/page.tsx
- registrations/forms.tsx
- link-button.tsx
- Pro components
- safeguards.ts
- tools/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- notification.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- collections/forms.tsx
- Recipes
- notifications-view.tsx
- BoardUI page patterns
- Pro templates
- review-form.tsx
- ledger/books.ts
- filings/run.ts
- select.tsx
- return-file-actions.ts
- boardui
- public.ts
- profile.ts
- manilaToday
- cycle/page.tsx
- social-button.tsx
- vitest
- Opening balances: checklist for any cut-off
- tieouts.ts
- home.ts
- lib/books/actions.ts
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- idle-watcher.tsx
- idle-watcher.tsx
- returns/load.ts
- work/load.ts
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- portalContext
- toCentavos
- parties/[id]/page.tsx
- read.test.ts
- opening.ts
- mime.ts
- calendar/staff.ts
- chrome.tsx
- documents/[id]/page.tsx
- fixed-assets/page.tsx
- site-document.tsx
- react
- ticked-allocation.test.ts
- books/reports/statements/page.tsx
- review/page.tsx
- engine.ts
- move-bar.tsx
- sign-off.ts
- blocks.tsx
- dates.ts
- register/page.tsx
- server-only
- ledger/data.ts
- app/requests/page.tsx
- public.ts
- (site)/page.tsx
- holiday-list.ts
- safeguards.ts
- tax-codes.ts
- package.json
- app/documents/page.tsx
- steps.ts
- template.ts
- notes.ts
- steps.ts
- clients/[id]/page.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- onboarding/forms.tsx
- bir-filing-calendar/page.tsx
- lock-actions.ts
- opengraph-image.tsx
- portal/documents/page.tsx
- notifications-view.tsx
- runs.tsx
- cycle/actions.ts
- requireOwner
- month.ts
- worksheet/page.tsx
- acting-approver.test.ts
- digest.ts
- contribution-remittances.test.ts
- books-2307.test.ts
- payroll/data.ts
- generate-qap-fixture.mjs
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 352 edges
2. `cx` - 287 edges
3. `react` - 262 edges
4. `Skeleton()` - 250 edges
5. `Notice()` - 245 edges
6. `next` - 224 edges
7. `Button()` - 220 edges
8. `Badge()` - 179 edges
9. `Card()` - 177 edges
10. `vitest` - 171 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `worksheet()` --indirect_call--> `employeeFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts
- `worksheet()` --indirect_call--> `priorEmployerFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts
- `worksheet()` --indirect_call--> `itemFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (183 total, 18 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (47): BooksContext, load2307Staff(), PortalPrint2307Page(), Print(), one(), portal2307(), portal2307Href(), SearchParams (+39 more)

### Community 1 - "index.ts"
Cohesion: 0.03
Nodes (47): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+39 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "remittances/[id]/page.tsx"
Cohesion: 0.06
Nodes (64): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), TransactionJournal() (+56 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.09
Nodes (37): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), Preview(), TaxpayerType, EstimatedProfile, estimateProfile() (+29 more)

### Community 5 - "devDependencies"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "safeguards-load.ts"
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

### Community 11 - "portal/page.tsx"
Cohesion: 0.28
Nodes (14): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), notificationSettingsHref() (+6 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.03
Nodes (99): ClientTab, UNDER, UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles (+91 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+12 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (37): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine() (+29 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.05
Nodes (130): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+122 more)

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
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "compare.ts"
Cohesion: 0.07
Nodes (55): CELL, FirmParallelRunPage(), monthShort(), Summary(), atcRows(), BookInvoiceRow, Bucket, compareParallelRun() (+47 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "onboarding/page.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "server.ts"
Cohesion: 0.09
Nodes (48): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+40 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (64): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+56 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+25 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.11
Nodes (39): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+31 more)

### Community 52 - "Badge"
Cohesion: 0.14
Nodes (36): EmployerCard(), RemittancesDue(), MonthRemittances(), GET(), ListRow, ORDER, STEPS, Remittances() (+28 more)

### Community 53 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (63): archiveLinkAction(), ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+55 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.12
Nodes (38): BankAccountsRoute(), booksContext(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column (+30 more)

### Community 55 - "requireStaff"
Cohesion: 0.19
Nodes (31): Remittance(), RemittancePage(), DueDateForm(), EmployerNumberForm(), HandlesContributionsSwitch(), PrepareForm(), RemitForm(), RemittanceButton() (+23 more)

### Community 56 - "ui.ts"
Cohesion: 0.12
Nodes (36): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), Certificates2316 (+28 more)

### Community 57 - "registrations/actions.ts"
Cohesion: 0.11
Nodes (27): cancelRegistrationAction(), dtiRegisteredOn(), fieldErrors(), openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction(), updateStepAction(), branchSchema (+19 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (62): SaleSplit, client, row(), incomePayment(), payslipSchedule(), agentBackground(), agentErrors(), tinDashed() (+54 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (78): BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), CloseYearForm(), EntryForm(), OpeningUpload(), ReleaseReportForm() (+70 more)

### Community 60 - "registrations/[id]/page.tsx"
Cohesion: 0.11
Nodes (26): PriceRow, COMPLEXITY_LABEL, Lines(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), TAXPAYER_TYPES (+18 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.12
Nodes (26): exceljs@4.4.0, exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging() (+18 more)

### Community 62 - "safeguards-load.ts"
Cohesion: 0.10
Nodes (31): TaxType, CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay() (+23 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (30): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+22 more)

### Community 64 - "site/brand.ts"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.09
Nodes (37): INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesViewPage() (+29 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "react"
Cohesion: 0.14
Nodes (23): react, PaymentsNewPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), ReceiptsViewPage(), fmt() (+15 more)

### Community 68 - "testing.ts"
Cohesion: 0.14
Nodes (23): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q, individual (+15 more)

### Community 69 - "clients/actions.ts"
Cohesion: 0.05
Nodes (76): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+68 more)

### Community 70 - "registrations/[id]/page.tsx"
Cohesion: 0.17
Nodes (28): SectionTabs(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+20 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (41): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+33 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.09
Nodes (44): GridRow, AlphaCols, form2316(), Form2316Employer, contrib, employer, entry(), one() (+36 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "returns/types.ts"
Cohesion: 0.08
Nodes (42): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+34 more)

### Community 76 - "@remixicon/react"
Cohesion: 0.06
Nodes (37): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+29 more)

### Community 77 - "Badge"
Cohesion: 0.24
Nodes (15): MonthComplete(), SentRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction() (+7 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (44): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+36 more)

### Community 79 - "proposal-view.tsx"
Cohesion: 0.11
Nodes (31): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, one() (+23 more)

### Community 80 - "parallel-run.tsx"
Cohesion: 0.13
Nodes (27): one(), ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows() (+19 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (35): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+27 more)

### Community 82 - "registrations/forms.tsx"
Cohesion: 0.12
Nodes (24): Row, ClientCaseKind, completeRegistrationAction(), FormState, caseNote, caseTitle, Check(), ChecklistPreview() (+16 more)

### Community 83 - "link-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "safeguards.ts"
Cohesion: 0.15
Nodes (20): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+12 more)

### Community 86 - "tools/page.tsx"
Cohesion: 0.17
Nodes (22): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), ReverseForm() (+14 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (68): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+60 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notification.tsx"
Cohesion: 0.13
Nodes (23): amt(), ApprovalMemo(), Db, TIE, Adjustment, c(), loadPeriodFile(), monthEnd() (+15 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): metadata, QuotesClosed(), Start(), StartPage(), SelectItem(), AttributionKeeper(), noop(), readAttribution() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.23
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (48): PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+40 more)

### Community 94 - "collections/forms.tsx"
Cohesion: 0.09
Nodes (40): @remixicon/react, RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send() (+32 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "notifications-view.tsx"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.07
Nodes (43): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), BatchRow (+35 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (45): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+37 more)

### Community 101 - "filings/run.ts"
Cohesion: 0.08
Nodes (51): generatePastFilingsAction(), Rule, TimelineFiling, TimelineItem, addDays(), compareIso(), IsoDate, isWeekend() (+43 more)

### Community 102 - "select.tsx"
Cohesion: 0.06
Nodes (56): react-aria-components, Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem() (+48 more)

### Community 103 - "return-file-actions.ts"
Cohesion: 0.19
Nodes (21): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+13 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "public.ts"
Cohesion: 0.38
Nodes (7): activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab, Tab, under()

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 107 - "manilaToday"
Cohesion: 0.07
Nodes (45): ClientTabs(), ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus (+37 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.20
Nodes (17): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CycleRow, ExceptionDecision, parseMonth() (+9 more)

### Community 109 - "social-button.tsx"
Cohesion: 0.09
Nodes (28): addClientNoteAction(), NoteState, createLinkAction(), MarketingState, text(), GET(), GET(), GET() (+20 more)

### Community 110 - "vitest"
Cohesion: 0.02
Nodes (50): pg, vitest, dir, ctx, input, year, mv(), root (+42 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "tieouts.ts"
Cohesion: 0.11
Nodes (19): ExplainState, explainTieAction(), SIGNED, RegisterLine, LedgerTotals, purchases(), sales(), base (+11 more)

### Community 113 - "home.ts"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (25): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+17 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.07
Nodes (66): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+58 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.21
Nodes (16): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+8 more)

### Community 118 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 119 - "idle-watcher.tsx"
Cohesion: 0.08
Nodes (50): corp, items, proposal(), items, schedule, OWNER_PRICES, OWNER_SETTINGS, buildProposalQuote() (+42 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.08
Nodes (51): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), loadAssets(), LOCKED_STATUSES, ATC_MASTER, AtcInfo (+43 more)

### Community 121 - "work/load.ts"
Cohesion: 0.21
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.13
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "portalContext"
Cohesion: 0.12
Nodes (30): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+22 more)

### Community 126 - "toCentavos"
Cohesion: 0.07
Nodes (52): BOOKED_TYPES, PayrollDocument(), applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap() (+44 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (63): DocumentReviewPage(), loadBooking(), Review(), fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction() (+55 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (75): RFC-4180, SPREADSHEET_TYPES, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES (+67 more)

### Community 129 - "opening.ts"
Cohesion: 0.08
Nodes (35): AgingRow, CheckedUpdate, EntryLineOut, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem (+27 more)

### Community 130 - "mime.ts"
Cohesion: 0.13
Nodes (30): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, esubmissionMailEnv(), accessToken(), call(), findReplies() (+22 more)

### Community 131 - "calendar/staff.ts"
Cohesion: 0.19
Nodes (19): Admin, busyOf(), connect(), Connection, teamWeek(), googleCalendarEnv(), accessToken(), CALENDAR_SCOPES (+11 more)

### Community 132 - "chrome.tsx"
Cohesion: 0.18
Nodes (16): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+8 more)

### Community 133 - "documents/[id]/page.tsx"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.12
Nodes (13): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), geist (+5 more)

### Community 136 - "react"
Cohesion: 0.07
Nodes (58): Batch(), BatchPage(), one(), toCentavos(), NewEntry(), NewEntryPage(), PaymentsListPage(), PurchaseInvoicesListPage() (+50 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "books/reports/statements/page.tsx"
Cohesion: 0.19
Nodes (17): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+9 more)

### Community 139 - "review/page.tsx"
Cohesion: 0.18
Nodes (13): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, TabKey, Queue(), ReviewPage(), Row (+5 more)

### Community 140 - "engine.ts"
Cohesion: 0.18
Nodes (14): GET(), isNotificationKind(), BELL_LIMIT, BellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+6 more)

### Community 141 - "move-bar.tsx"
Cohesion: 0.26
Nodes (14): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+6 more)

### Community 142 - "sign-off.ts"
Cohesion: 0.38
Nodes (5): cycleMessage(), dayFmt, NoticeKind, showDay(), Due

### Community 143 - "blocks.tsx"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 144 - "dates.ts"
Cohesion: 0.14
Nodes (5): outDir, pkgDir, require, { version }, root

### Community 145 - "register/page.tsx"
Cohesion: 0.12
Nodes (21): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, KIND_LABELS (+13 more)

### Community 146 - "server-only"
Cohesion: 0.14
Nodes (29): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+21 more)

### Community 147 - "ledger/data.ts"
Cohesion: 0.09
Nodes (33): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, codes, PNL, Cutoff, cutoffOf() (+25 more)

### Community 148 - "app/requests/page.tsx"
Cohesion: 0.24
Nodes (13): Requests(), RequestsPage(), Row, View, VIEWS, PortalRequests(), Requests(), Row (+5 more)

### Community 149 - "public.ts"
Cohesion: 0.22
Nodes (11): acceptProposalAction(), AcceptState, QuerySource, instantView(), brandSchedule(), contentHash(), instantQuote(), acceptedQuote() (+3 more)

### Community 150 - "(site)/page.tsx"
Cohesion: 0.06
Nodes (83): nextConfig, next, robots(), AboutPage(), HOW, metadata, BRING, ContactList() (+75 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.26
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+3 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.17
Nodes (6): asCommit(), failsAtCommit(), root, as(), attach(), root

### Community 153 - "tax-codes.ts"
Cohesion: 0.15
Nodes (24): noteAction(), raiseNoteAction(), signWorkpaperAction(), tickAdjustmentAction(), ExplainForm(), amt(), one(), shiftMonth() (+16 more)

### Community 154 - "package.json"
Cohesion: 0.21
Nodes (12): EmailSwitches(), EmailSwitchGroup, BellAudience, Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS (+4 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (29): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), Documents(), DocumentsPage() (+21 more)

### Community 156 - "steps.ts"
Cohesion: 0.15
Nodes (15): Agency, BranchOptions, CaseStep, ClosureOptions, dayNumber(), daysBetween(), EMPLOYER_STEPS, LGU_STEPS (+7 more)

### Community 157 - "template.ts"
Cohesion: 0.10
Nodes (20): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS (+12 more)

### Community 158 - "notes.ts"
Cohesion: 0.19
Nodes (15): NotesCard(), ICON, NotesTimeline(), when, SERVICE_LABELS, inquiryAnswers(), NoteEntry, noteEntry() (+7 more)

### Community 159 - "steps.ts"
Cohesion: 0.15
Nodes (25): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+17 more)

### Community 160 - "clients/[id]/page.tsx"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.22
Nodes (20): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), Interval, manilaInstant() (+12 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 164 - "onboarding/forms.tsx"
Cohesion: 0.23
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 165 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 166 - "lock-actions.ts"
Cohesion: 0.31
Nodes (13): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+5 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "portal/documents/page.tsx"
Cohesion: 0.20
Nodes (12): Documents(), FolderKey, FOLDERS, Item, MONTHS, one(), PayrollFile, payrollStatus (+4 more)

### Community 169 - "notifications-view.tsx"
Cohesion: 0.30
Nodes (11): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, fullDateTime() (+3 more)

### Community 170 - "runs.tsx"
Cohesion: 0.25
Nodes (8): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), Run

### Community 171 - "cycle/actions.ts"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 172 - "requireOwner"
Cohesion: 0.07
Nodes (57): zod, generateFilingsNow(), GenerateState, GenerateButton(), addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange() (+49 more)

### Community 173 - "month.ts"
Cohesion: 0.19
Nodes (25): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+17 more)

### Community 174 - "worksheet/page.tsx"
Cohesion: 0.38
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 177 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 180 - "books-2307.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 181 - "payroll/data.ts"
Cohesion: 0.12
Nodes (30): file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), sortItems(), draftToTemplate(), CheckedRegister (+22 more)

### Community 183 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1503 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `remittances/[id]/page.tsx`, `fees/types.ts`, `devDependencies`, `safeguards-load.ts`, `statements.ts`, `income.ts`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `server.ts`, `deadlines/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `Badge`, `marketing/page.tsx`, `registrations/actions.ts`, `returns/types.ts`, `registrations/[id]/page.tsx`, `books/export/route.ts`, `safeguards-load.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `testing.ts`, `clients/actions.ts`, `payroll/data.ts`, `returns/types.ts`, `safeguards.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `notification.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `review-form.tsx`, `ledger/books.ts`, `filings/run.ts`, `public.ts`, `profile.ts`, `manilaToday`, `cycle/page.tsx`, `social-button.tsx`, `tieouts.ts`, `home.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `idle-watcher.tsx`, `idle-watcher.tsx`, `returns/load.ts`, `auth-templates.ts`, `batch/register.ts`, `toCentavos`, `parties/[id]/page.tsx`, `read.test.ts`, `opening.ts`, `mime.ts`, `documents/[id]/page.tsx`, `fixed-assets/page.tsx`, `ticked-allocation.test.ts`, `review/page.tsx`, `move-bar.tsx`, `sign-off.ts`, `blocks.tsx`, `dates.ts`, `register/page.tsx`, `server-only`, `ledger/data.ts`, `app/requests/page.tsx`, `public.ts`, `(site)/page.tsx`, `holiday-list.ts`, `safeguards.ts`, `tax-codes.ts`, `app/documents/page.tsx`, `template.ts`, `notes.ts`, `steps.ts`, `calendar/page.tsx`, `onboarding/forms.tsx`, `bir-filing-calendar/page.tsx`, `requireOwner`, `acting-approver.test.ts`, `digest.ts`, `contribution-remittances.test.ts`, `books-2307.test.ts`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08650937689050212 - nodes in this community are weakly interconnected._
- **Why does `next` connect `(site)/page.tsx` to `form-2307.ts`, `remittances/[id]/page.tsx`, `fees/types.ts`, `devDependencies`, `safeguards-load.ts`, `portal/page.tsx`, `cx`, `dependencies`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `server.ts`, `payroll/forms.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `Badge`, `marketing/page.tsx`, `module-pages.tsx`, `requireStaff`, `ui.ts`, `registrations/actions.ts`, `Notice`, `registrations/[id]/page.tsx`, `books/export/route.ts`, `lock-bar.tsx`, `site/brand.ts`, `invoice-pages.tsx`, `react`, `clients/actions.ts`, `registrations/[id]/page.tsx`, `books/forms.tsx`, `Badge`, `theme-toggle.tsx`, `proposal-view.tsx`, `parallel-run.tsx`, `registrations/forms.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `notification.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `collections/forms.tsx`, `review-form.tsx`, `ledger/books.ts`, `return-file-actions.ts`, `public.ts`, `profile.ts`, `manilaToday`, `cycle/page.tsx`, `social-button.tsx`, `tieouts.ts`, `home.ts`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `idle-watcher.tsx`, `returns/load.ts`, `batch/register.ts`, `portalContext`, `toCentavos`, `parties/[id]/page.tsx`, `mime.ts`, `chrome.tsx`, `fixed-assets/page.tsx`, `site-document.tsx`, `react`, `books/reports/statements/page.tsx`, `review/page.tsx`, `engine.ts`, `move-bar.tsx`, `server-only`, `ledger/data.ts`, `app/requests/page.tsx`, `public.ts`, `tax-codes.ts`, `app/documents/page.tsx`, `steps.ts`, `proposal-view.tsx`, `onboarding/forms.tsx`, `lock-actions.ts`, `opengraph-image.tsx`, `portal/documents/page.tsx`, `notifications-view.tsx`, `runs.tsx`, `requireOwner`, `month.ts`, `worksheet/page.tsx`, `payroll/data.ts`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.032467532467532464 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `remittances/[id]/page.tsx`, `fees/types.ts`, `devDependencies`, `safeguards-load.ts`, `portal/page.tsx`, `cx`, `dependencies`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `onboarding/page.tsx`, `server.ts`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `Badge`, `marketing/page.tsx`, `module-pages.tsx`, `requireStaff`, `ui.ts`, `Notice`, `registrations/[id]/page.tsx`, `lock-bar.tsx`, `site/brand.ts`, `invoice-pages.tsx`, `clients/actions.ts`, `registrations/[id]/page.tsx`, `books/forms.tsx`, `@remixicon/react`, `Badge`, `theme-toggle.tsx`, `proposal-view.tsx`, `parallel-run.tsx`, `how-we-work/page.tsx`, `registrations/forms.tsx`, `link-button.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/[id]/page.tsx`, `collections/forms.tsx`, `ledger/books.ts`, `select.tsx`, `return-file-actions.ts`, `profile.ts`, `manilaToday`, `cycle/page.tsx`, `social-button.tsx`, `tieouts.ts`, `home.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `idle-watcher.tsx`, `idle-watcher.tsx`, `batch/register.ts`, `portalContext`, `toCentavos`, `parties/[id]/page.tsx`, `chrome.tsx`, `fixed-assets/page.tsx`, `site-document.tsx`, `react`, `books/reports/statements/page.tsx`, `review/page.tsx`, `engine.ts`, `move-bar.tsx`, `app/requests/page.tsx`, `(site)/page.tsx`, `tax-codes.ts`, `package.json`, `app/documents/page.tsx`, `steps.ts`, `clients/[id]/page.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `portal/documents/page.tsx`, `runs.tsx`, `requireOwner`, `month.ts`, `worksheet/page.tsx`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._