# Graph Report - agent-a09fa3a2c7155e4ad  (2026-11-27)

## Corpus Check
- 964 files · ~793,905 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: .css 10, (none) 5, .woff2 3)

## Summary
- 5967 nodes · 21103 edges · 216 communities (186 shown, 30 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 187 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `94256424`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- manilaToday
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/labels.ts
- Sign-in & Setup Docs
- settings/actions.ts
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
- match.ts
- button.tsx
- documents/[id]/page.tsx
- payroll/forms.tsx
- modal.tsx
- form.tsx
- scripts
- calendar/staff.ts
- fees/[id]/page.tsx
- remittances/[id]/page.tsx
- webhook.ts
- tax-codes.ts
- returns/types.ts
- formatAmount
- ref_node_fs
- form-1604e.ts
- Badge
- theme-toggle.tsx
- arap.ts
- payroll/types.ts
- lock-bar.tsx
- workpapers/page.tsx
- status.ts
- Apple Design
- filings/run.ts
- testing.ts
- quote/page.tsx
- lib/books/actions.ts
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- react
- app/layout.tsx
- vitest
- ledger/data.ts
- how-we-work/page.tsx
- requireOwner
- cx.ts
- Pro components
- marketing/page.tsx
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- notification-actions.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- approval-memo.tsx
- tasks/page.tsx
- Recipes
- tools/page.tsx
- BoardUI page patterns
- Pro templates
- filings/actions.ts
- ledger/books.ts
- ledger/types.ts
- cx
- rates.ts
- boardui
- clients/[id]/page.tsx
- @remixicon/react
- review/page.tsx
- cycle/page.tsx
- rows.ts
- client
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- [clientId]/page.tsx
- remittances/forms.tsx
- apply-migrations.sh
- deadlines/page.tsx
- quote.ts
- returns/load.ts
- leads/forms.tsx
- notifications/format.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- showDate
- transactions-actions.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- 2316/page.tsx
- queries.ts
- ocr/run.ts
- fixed-assets/page.tsx
- filings/[id]/page.tsx
- supabaseServer
- ticked-allocation.test.ts
- work/page.tsx
- fields.ts
- notifications-view.tsx
- notification-settings-view.tsx
- workpapers/load.ts
- safeguards.ts
- auth-templates.ts
- supabaseAdmin
- server-only
- Centavos
- LinkButton
- Card
- blocks.tsx
- calendar/page.tsx
- ledger.test.ts
- requireStaff
- notification-bell.tsx
- move-bar.tsx
- deadlines/actions.ts
- template.ts
- leads/[id]/page.tsx
- binder/page.tsx
- addDays
- Rework: one flow from lead to year-end
- google/calendar.ts
- gap/page.tsx
- app/documents/page.tsx
- bell-store.ts
- register/page.tsx
- opengraph-image.tsx
- books/periods.ts
- acting-approver/page.tsx
- clients/actions.ts
- sign-off-actions.tsx
- app/settings/page.tsx
- engine.test.ts
- [id]/actions.ts
- acting-approver.test.ts
- upload/page.tsx
- tieouts.test.ts
- site/calendar.ts
- Building UIs with BoardUI
- pg
- portal-statements-approval.test.ts
- db.test.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- split-bundled-pdfs.test.ts
- site-document.tsx
- holiday-list.ts
- books-2307.test.ts
- funnel.test.ts
- month.ts
- tests/books.test.ts
- parallel-run.test.ts
- portal-nav.tsx
- books-migration.test.ts
- copy-opencv.mjs
- lock.ts
- missing-2307/page.tsx
- lock-by-return-type.test.ts
- returns-books.test.ts
- tasks-and-request-owners.test.ts
- proof-upload.tsx
- generate-qap-fixture.mjs
- return-files.tsx
- templates/README.md
- eslint.config.mjs
- proposal/[token]/page.tsx
- telegram-uploads.test.ts
- tests/register.test.ts
- notifications.test.ts
- ledger-closing.test.ts
- adjustments.test.ts
- portal-reports.test.ts
- @supabase/ssr
- @techstark/opencv-js

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 367 edges
2. `cx` - 304 edges
3. `react` - 271 edges
4. `Notice()` - 255 edges
5. `Skeleton()` - 254 edges
6. `next` - 233 edges
7. `Button()` - 232 edges
8. `vitest` - 183 edges
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

## Communities (216 total, 30 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (52): BooksContext, load2307Staff(), Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print(), one(), portal2307() (+44 more)

### Community 1 - "index.ts"
Cohesion: 0.06
Nodes (20): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+12 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.06
Nodes (59): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+51 more)

### Community 4 - "manilaToday"
Cohesion: 0.10
Nodes (37): buildQuote(), instantView(), unitsFor(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+29 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

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

### Community 11 - "documents/labels.ts"
Cohesion: 0.09
Nodes (37): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+29 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "settings/actions.ts"
Cohesion: 0.12
Nodes (25): zod, addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, updateRuleAction() (+17 more)

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
Nodes (43): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), PrintButton(), defaultCashFlow(), statementsFrom() (+35 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (71): BirLineKey, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), form1701, form1702RT (+63 more)

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
Cohesion: 0.08
Nodes (43): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+35 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (85): ParallelRun(), ParallelRunPage(), quarterMonths(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Atcs() (+77 more)

### Community 43 - "match.ts"
Cohesion: 0.29
Nodes (10): digits(), editDistance(), EmployeeMatch, keyNo(), matchEmployee(), MatchStatus, nameScore(), nameWords() (+2 more)

### Community 44 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "documents/[id]/page.tsx"
Cohesion: 0.14
Nodes (28): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+20 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.07
Nodes (78): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+70 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (32): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+24 more)

### Community 48 - "form.tsx"
Cohesion: 0.13
Nodes (37): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+29 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (38): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+30 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (27): FeeFormState, dateFmt, loadSchedule(), loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone (+19 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.14
Nodes (32): RemittancesDue(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+24 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (44): maxDuration, POST(), TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked(), Choice (+36 more)

### Community 54 - "tax-codes.ts"
Cohesion: 0.17
Nodes (16): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+8 more)

### Community 55 - "returns/types.ts"
Cohesion: 0.06
Nodes (48): FinancialStatements, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+40 more)

### Community 56 - "formatAmount"
Cohesion: 0.10
Nodes (64): booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), INVOICE_KINDS, InvoiceEdit(), InvoiceList() (+56 more)

### Community 57 - "ref_node_fs"
Cohesion: 0.07
Nodes (7): ctx, input, root, root, root, root, root

### Community 58 - "form-1604e.ts"
Cohesion: 0.07
Nodes (51): tinHasBranch(), client, row(), payslipSchedule(), agentBackground(), agentErrors(), atcSchedule(), AtcTotal (+43 more)

### Community 59 - "Badge"
Cohesion: 0.05
Nodes (101): SectionTabs(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction() (+93 more)

### Community 60 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 61 - "arap.ts"
Cohesion: 0.16
Nodes (17): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+9 more)

### Community 62 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.15
Nodes (24): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+16 more)

### Community 64 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 65 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.14
Nodes (22): IsoDate, EfpsGroup, FilingChannel, FilingInstance, Frequency, Period, PeriodFilter, ACTIVE (+14 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.15
Nodes (19): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), complexity() (+11 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (26): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+18 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.10
Nodes (53): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+45 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (42): monthlyTable(), monthlyWithholding(), BirCategory, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS (+34 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.11
Nodes (50): SaleSplit, branchOfTin(), payeeKeyOf(), tin9(), tinDashed(), tinDigits(), incomeAttachments(), Periods (+42 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "react"
Cohesion: 0.05
Nodes (62): react, BankAccountsRoute(), Column, ListRow, RowLink(), CustomersRoute(), EmployeesRoute(), JournalEntryRoute() (+54 more)

### Community 78 - "app/layout.tsx"
Cohesion: 0.08
Nodes (41): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+33 more)

### Community 79 - "vitest"
Cohesion: 0.05
Nodes (14): vitest, dir, root, HASH, LEAD, root, root, root (+6 more)

### Community 80 - "ledger/data.ts"
Cohesion: 0.14
Nodes (25): dayBefore(), GET(), safe(), Released, fromWorkbookData(), accountFromRow(), Amendment, AmendmentStatus (+17 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.13
Nodes (33): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+25 more)

### Community 82 - "requireOwner"
Cohesion: 0.10
Nodes (44): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), markLostAction(), recordCallAction(), refresh(), reopenLeadAction(), sendProposalAction() (+36 more)

### Community 83 - "cx.ts"
Cohesion: 0.04
Nodes (60): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, StatusDot(), StatusDotColor (+52 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "marketing/page.tsx"
Cohesion: 0.09
Nodes (31): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+23 more)

### Community 86 - "Notice"
Cohesion: 0.09
Nodes (71): BatchUpload(), PreviewTable(), AmendmentRequestForm(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), ReleaseReportForm(), SetupForm() (+63 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.09
Nodes (59): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker() (+51 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notification-actions.tsx"
Cohesion: 0.16
Nodes (17): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+9 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "approval-memo.tsx"
Cohesion: 0.19
Nodes (12): amt(), ApprovalMemo(), Db, TIE, approvalMemo(), Memo, MemoInput, MemoMonth (+4 more)

### Community 94 - "tasks/page.tsx"
Cohesion: 0.10
Nodes (43): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+35 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "tools/page.tsx"
Cohesion: 0.17
Nodes (22): AmendmentDecision(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload(), PermitForm() (+14 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "filings/actions.ts"
Cohesion: 0.27
Nodes (12): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+4 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (49): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+41 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.12
Nodes (23): Access, STATUS, CASH_FLOW_CLASSES, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut (+15 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (91): react-aria-components, KIND_LABEL, MATCH_BADGE, peso(), ReadItem, SheetPreview(), ChipColor, Breadcrumb() (+83 more)

### Community 103 - "rates.ts"
Cohesion: 0.22
Nodes (20): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+12 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "clients/[id]/page.tsx"
Cohesion: 0.12
Nodes (30): setupMissingChartsAction(), EmployerCard(), RemoveAssignmentButton(), RemoveClientUserButton(), NotesCard(), ClientDetail(), ClientPage(), fmtDate() (+22 more)

### Community 106 - "@remixicon/react"
Cohesion: 0.14
Nodes (27): @remixicon/react, FilingsTabsFor(), Section, SECTIONS, TabKey, RequestDetail(), RequestPage(), PortalRequest() (+19 more)

### Community 107 - "review/page.tsx"
Cohesion: 0.13
Nodes (21): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), Returns(), FilingsTabs(), Queue(), ReviewPage() (+13 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.19
Nodes (18): Cycle(), CyclePage(), CycleWithClient, DocRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+10 more)

### Community 109 - "rows.ts"
Cohesion: 0.07
Nodes (54): AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+46 more)

### Community 110 - "client"
Cohesion: 0.08
Nodes (15): BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), as(), purchase() (+7 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm() (+44 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.08
Nodes (63): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+55 more)

### Community 116 - "remittances/forms.tsx"
Cohesion: 0.18
Nodes (29): DueDateForm(), EmployerNumberForm(), HandlesContributionsSwitch(), PrepareForm(), RemitForm(), RemittanceButton(), RemittanceFileUpload(), send() (+21 more)

### Community 118 - "deadlines/page.tsx"
Cohesion: 0.15
Nodes (26): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+18 more)

### Community 119 - "quote.ts"
Cohesion: 0.10
Nodes (29): PriceRow, buildProposalQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem, EWT_NOTE, feeTax() (+21 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.07
Nodes (50): loadAssets(), addTotals(), checkTotals(), LABELS, PayTotals, TotalCheck, totalsAgree(), totalsOf() (+42 more)

### Community 121 - "leads/forms.tsx"
Cohesion: 0.07
Nodes (45): LeadState, JobRow(), Person, pesoFmt, ProposalForm(), ProposalSetup, jobName(), lineName() (+37 more)

### Community 122 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (42): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+34 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "showDate"
Cohesion: 0.12
Nodes (32): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail(), PayNow(), credit() (+24 more)

### Community 126 - "transactions-actions.ts"
Cohesion: 0.25
Nodes (16): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+8 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (49): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList(), Row (+41 more)

### Community 128 - "read.test.ts"
Cohesion: 0.04
Nodes (88): RFC-4180, applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction() (+80 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "2316/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 132 - "queries.ts"
Cohesion: 0.22
Nodes (12): GET(), isNotificationKind(), BELL_LIMIT, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications(), loadBellData() (+4 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (44): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+36 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 135 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (38): FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText, Filing() (+30 more)

### Community 136 - "supabaseServer"
Cohesion: 0.05
Nodes (56): nextConfig, next, addClientNoteAction(), postPayrollAction(), PostState, PostPayrollButton(), Detail(), StatementPage() (+48 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "work/page.tsx"
Cohesion: 0.17
Nodes (20): Action(), MyWork(), MyWorkPage(), short(), TONE, sortTasks(), lastMonth(), loadMyWork() (+12 more)

### Community 139 - "fields.ts"
Cohesion: 0.09
Nodes (30): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+22 more)

### Community 140 - "notifications-view.tsx"
Cohesion: 0.30
Nodes (11): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, fullDateTime() (+3 more)

### Community 141 - "notification-settings-view.tsx"
Cohesion: 0.23
Nodes (11): EmailSwitches(), EmailSwitchGroup, Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS, NotificationAudience (+3 more)

### Community 142 - "workpapers/load.ts"
Cohesion: 0.15
Nodes (20): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+12 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.09
Nodes (41): CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay(), NEEDS (+33 more)

### Community 144 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 145 - "supabaseAdmin"
Cohesion: 0.19
Nodes (15): @supabase/supabase-js, GET(), GET(), requestOrigin(), siteOrigin(), supabaseEnv(), ClaimedNotification, dispatchNotificationEmails() (+7 more)

### Community 146 - "server-only"
Cohesion: 0.08
Nodes (49): server-only, GET(), MonthComplete(), SentRow, TimelineRow, digestMessage(), DigestRow, longDay() (+41 more)

### Community 147 - "Centavos"
Cohesion: 0.09
Nodes (32): EntryLineOut, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+24 more)

### Community 148 - "LinkButton"
Cohesion: 0.15
Nodes (24): booksViewFor(), fmtMonth(), one(), BooksSummaryPage(), Summary(), SummaryCard(), Certificates(), Staff2307Page() (+16 more)

### Community 149 - "Card"
Cohesion: 0.17
Nodes (18): Batch(), BatchPage(), one(), toCentavos(), Lines(), lineStyle, Problems(), sameFigures() (+10 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.06
Nodes (90): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+82 more)

### Community 151 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (19): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant(), appBookedEvents(), teamWeek() (+11 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "requireStaff"
Cohesion: 0.22
Nodes (17): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+9 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.16
Nodes (22): Bell(), markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base() (+14 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.26
Nodes (14): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+6 more)

### Community 156 - "deadlines/actions.ts"
Cohesion: 0.50
Nodes (5): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration()

### Community 157 - "template.ts"
Cohesion: 0.11
Nodes (21): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+13 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (39): BookingLink(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), ReopenForm(), Result(), ReviewerForm(), bookedTime (+31 more)

### Community 159 - "binder/page.tsx"
Cohesion: 0.20
Nodes (14): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, ReviewNote (+6 more)

### Community 160 - "addDays"
Cohesion: 0.24
Nodes (19): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), fiscalYearOf(), followsCalendarYear() (+11 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "google/calendar.ts"
Cohesion: 0.12
Nodes (28): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+20 more)

### Community 163 - "gap/page.tsx"
Cohesion: 0.19
Nodes (16): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+8 more)

### Community 164 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (46): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), ApprovedTable(), BOOKED_TYPES (+38 more)

### Community 165 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "books/periods.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 169 - "acting-approver/page.tsx"
Cohesion: 0.25
Nodes (15): EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge, activeFor(), Appointment, appointmentRow() (+7 more)

### Community 170 - "clients/actions.ts"
Cohesion: 0.07
Nodes (55): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+47 more)

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.14
Nodes (29): SettingsState, HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings() (+21 more)

### Community 173 - "engine.test.ts"
Cohesion: 0.18
Nodes (11): DeadlineRule, Obligation, dueDates(), none, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026 (+3 more)

### Community 174 - "[id]/actions.ts"
Cohesion: 0.23
Nodes (11): approveDocumentAction(), slpCategoryFromCodes(), slpCategoryFromKinds(), BooksChoices, has(), Missing, missingForApproval(), missingMessage() (+3 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "upload/page.tsx"
Cohesion: 0.30
Nodes (12): shift(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), addMonths(), ymd() (+4 more)

### Community 177 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 178 - "site/calendar.ts"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 179 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 180 - "pg"
Cohesion: 0.07
Nodes (10): pg, root, root, root, LEAD, LinkRow, ReportRow, root (+2 more)

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 186 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 187 - "holiday-list.ts"
Cohesion: 0.23
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), STANDARD_HOLIDAYS, StandardHoliday (+3 more)

### Community 188 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 189 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 190 - "month.ts"
Cohesion: 0.29
Nodes (9): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+1 more)

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 193 - "portal-nav.tsx"
Cohesion: 0.38
Nodes (7): activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab, Tab, under()

### Community 194 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 196 - "lock.ts"
Cohesion: 0.29
Nodes (7): INCOME_TAX, LockFiling, lockFormsFor(), lockingFiling(), PAYROLL, PURCHASES, SALES

### Community 197 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 201 - "proof-upload.tsx"
Cohesion: 0.50
Nodes (6): METHODS, ProofUpload(), send(), startProofUpload(), submitProof(), shrinkImage()

### Community 202 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 203 - "return-files.tsx"
Cohesion: 0.57
Nodes (6): ActionButton(), EsubmissionControls(), ReturnFileUpload(), send(), addReturnFile(), startReturnFileUpload()

### Community 206 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 207 - "proposal/[token]/page.tsx"
Cohesion: 0.53
Nodes (4): AcceptForm(), metadata, Proposal(), ProposalPage()

### Community 209 - "tests/register.test.ts"
Cohesion: 0.40
Nodes (4): DocumentRow, approved(), as(), root

### Community 211 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1580 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `documents/labels.ts`, `settings/actions.ts`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `form.tsx`, `calendar/staff.ts`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `formatAmount`, `Badge`, `lock-bar.tsx`, `workpapers/page.tsx`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `react`, `app/layout.tsx`, `ledger/data.ts`, `requireOwner`, `marketing/page.tsx`, `portal/reports/page.tsx`, `notification-actions.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `approval-memo.tsx`, `tasks/page.tsx`, `tools/page.tsx`, `filings/actions.ts`, `ledger/books.ts`, `ledger/types.ts`, `cx`, `clients/[id]/page.tsx`, `@remixicon/react`, `review/page.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `remittances/forms.tsx`, `deadlines/page.tsx`, `batch/register.ts`, `showDate`, `transactions-actions.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `2316/page.tsx`, `queries.ts`, `fixed-assets/page.tsx`, `filings/[id]/page.tsx`, `work/page.tsx`, `notifications-view.tsx`, `supabaseAdmin`, `server-only`, `LinkButton`, `Card`, `blocks.tsx`, `requireStaff`, `notification-bell.tsx`, `move-bar.tsx`, `deadlines/actions.ts`, `leads/[id]/page.tsx`, `binder/page.tsx`, `google/calendar.ts`, `gap/page.tsx`, `app/documents/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `acting-approver/page.tsx`, `clients/actions.ts`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `[id]/actions.ts`, `upload/page.tsx`, `site-document.tsx`, `portal-nav.tsx`, `missing-2307/page.tsx`, `proof-upload.tsx`, `return-files.tsx`, `proposal/[token]/page.tsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08028846153846154 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `ui.ts`, `manilaToday`, `package.json`, `onboarding/page.tsx`, `settings/actions.ts`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `payroll/forms.tsx`, `form.tsx`, `calendar/staff.ts`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `tax-codes.ts`, `returns/types.ts`, `ref_node_fs`, `form-1604e.ts`, `Badge`, `arap.ts`, `lock-bar.tsx`, `status.ts`, `filings/run.ts`, `testing.ts`, `quote/page.tsx`, `books/forms.tsx`, `payroll/payroll.test.ts`, `app/layout.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `approval-memo.tsx`, `tasks/page.tsx`, `filings/actions.ts`, `ledger/books.ts`, `ledger/types.ts`, `rates.ts`, `review/page.tsx`, `cycle/page.tsx`, `rows.ts`, `client`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `deadlines/page.tsx`, `quote.ts`, `returns/load.ts`, `leads/forms.tsx`, `notifications/format.ts`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `ocr/run.ts`, `fixed-assets/page.tsx`, `filings/[id]/page.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `work/page.tsx`, `fields.ts`, `workpapers/load.ts`, `safeguards.ts`, `supabaseAdmin`, `server-only`, `Centavos`, `Card`, `blocks.tsx`, `calendar/page.tsx`, `ledger.test.ts`, `move-bar.tsx`, `template.ts`, `leads/[id]/page.tsx`, `binder/page.tsx`, `google/calendar.ts`, `gap/page.tsx`, `app/documents/page.tsx`, `register/page.tsx`, `books/periods.ts`, `acting-approver/page.tsx`, `clients/actions.ts`, `app/settings/page.tsx`, `engine.test.ts`, `[id]/actions.ts`, `acting-approver.test.ts`, `upload/page.tsx`, `tieouts.test.ts`, `site/calendar.ts`, `pg`, `portal-statements-approval.test.ts`, `db.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `split-bundled-pdfs.test.ts`, `holiday-list.ts`, `books-2307.test.ts`, `funnel.test.ts`, `month.ts`, `tests/books.test.ts`, `parallel-run.test.ts`, `portal-nav.tsx`, `books-migration.test.ts`, `lock.ts`, `lock-by-return-type.test.ts`, `returns-books.test.ts`, `tasks-and-request-owners.test.ts`, `telegram-uploads.test.ts`, `tests/register.test.ts`, `notifications.test.ts`, `ledger-closing.test.ts`, `adjustments.test.ts`, `portal-reports.test.ts`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06050420168067227 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `documents/labels.ts`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `button.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `form.tsx`, `calendar/staff.ts`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `formatAmount`, `Badge`, `theme-toggle.tsx`, `lock-bar.tsx`, `workpapers/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `app/layout.tsx`, `how-we-work/page.tsx`, `cx.ts`, `marketing/page.tsx`, `Notice`, `portal/reports/page.tsx`, `notification-actions.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `tasks/page.tsx`, `tools/page.tsx`, `ledger/books.ts`, `cx`, `clients/[id]/page.tsx`, `@remixicon/react`, `review/page.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `remittances/forms.tsx`, `deadlines/page.tsx`, `leads/forms.tsx`, `batch/register.ts`, `showDate`, `parties/[id]/page.tsx`, `social-button.tsx`, `2316/page.tsx`, `queries.ts`, `fixed-assets/page.tsx`, `filings/[id]/page.tsx`, `supabaseServer`, `work/page.tsx`, `notification-settings-view.tsx`, `server-only`, `LinkButton`, `Card`, `blocks.tsx`, `calendar/page.tsx`, `requireStaff`, `notification-bell.tsx`, `move-bar.tsx`, `deadlines/actions.ts`, `leads/[id]/page.tsx`, `binder/page.tsx`, `google/calendar.ts`, `gap/page.tsx`, `app/documents/page.tsx`, `bell-store.ts`, `register/page.tsx`, `acting-approver/page.tsx`, `clients/actions.ts`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `upload/page.tsx`, `site-document.tsx`, `missing-2307/page.tsx`, `proof-upload.tsx`, `return-files.tsx`, `proposal/[token]/page.tsx`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._