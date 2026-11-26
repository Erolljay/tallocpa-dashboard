# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 900 files · ~715,901 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5574 nodes · 19491 edges · 208 communities (185 shown, 23 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 174 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `ec8b7aaa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- client
- migrate.yml
- ui.tsx
- marketing/attribution.ts
- package.json
- engine.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
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
- ledger/data.ts
- scores/page.tsx
- compare.ts
- payroll/types.ts
- filings/actions.ts
- index.ts
- items.ts
- modal.tsx
- deadlines/page.tsx
- scripts
- supabaseAdmin
- quote/page.tsx
- register-xlsx.ts
- documents/labels.ts
- module-pages.tsx
- marketing/page.tsx
- payroll/data.ts
- registrations/new/page.tsx
- money.ts
- Notice
- app/requests/page.tsx
- arap.ts
- morning.ts
- year-end/page.tsx
- combobox.tsx
- react
- Apple Design
- returns/load.ts
- form-1601c.ts
- supabaseServer
- parties/[id]/page.tsx
- books/forms.tsx
- form-1601c.ts
- Rules
- Animation Performance
- firm/parallel-run/page.tsx
- stat-cards.tsx
- cycle/page.tsx
- @remixicon/react
- vitest
- [clientId]/page.tsx
- how-we-work/page.tsx
- settings/actions.ts
- link-button.tsx
- Pro components
- pg
- tools/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- Centavos
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- calendar/staff.ts
- Recipes
- notifications-view.tsx
- BoardUI page patterns
- Pro templates
- review-form.tsx
- ledger/books.ts
- filings/run.ts
- cx
- site-document.tsx
- boardui
- manilaToday
- brand/page.tsx
- showDate
- template.ts
- supabaseServer
- ref_node_fs
- Opening balances: checklist for any cut-off
- cycle/actions.ts
- Card
- lib/books/actions.ts
- [clientId]/page.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- vat.ts
- proposal-view.tsx
- source.ts
- requireStaff
- layout.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- toCentavos
- books/reports/2307/page.tsx
- read.test.ts
- opening.ts
- mime.ts
- names.ts
- fees/types.ts
- gemini.ts
- fixed-assets/page.tsx
- rates.ts
- react
- ticked-allocation.test.ts
- getIdentity
- ledger.test.ts
- review/page.tsx
- pending-review.tsx
- idle-watcher.tsx
- brand/forms.tsx
- Centavos
- parts.ts
- server-only
- ledger/types.ts
- returns/books.test.ts
- filings/[id]/page.tsx
- blocks.tsx
- payroll/export/route.ts
- safeguards.ts
- workpapers/page.tsx
- calendar/page.tsx
- app/documents/page.tsx
- deadlines/actions.ts
- sign-off-actions.tsx
- review-queue.ts
- Badge
- staff/actions.ts
- Rework: one flow from lead to year-end
- calendar/staff.ts
- formatAmount
- filings/actions.ts
- returns/types.ts
- social-button.tsx
- opengraph-image.tsx
- lead-attribution.test.ts
- statement-view.tsx
- bulk-actions.ts
- draft.ts
- app/settings/page.tsx
- profile.ts
- registrations/[id]/page.tsx
- acting-approver.test.ts
- fixed-assets.test.ts
- documents/[id]/page.tsx
- pending-review.tsx
- returns-sign-off.test.ts
- lock-actions.ts
- payroll/forms.tsx
- ledger-closing.test.ts
- generate-qap-fixture.mjs
- filed-returns.ts
- tests/books.test.ts
- month.ts
- portal-statements-approval.test.ts
- site/calendar.ts
- Card
- books/periods.ts
- deadlines/actions.ts
- Building UIs with BoardUI
- digest.ts
- messages.ts
- db.test.ts
- eslint.config.mjs
- books-2307.test.ts
- seed.ts
- leads-pipeline.test.ts
- books-migration.test.ts
- vitest
- defer-documents.test.ts
- fees.test.ts
- templates/README.md
- unlock-requests.tsx
- portal-home.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 314 edges
2. `cx` - 288 edges
3. `react` - 256 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 235 edges
6. `next` - 211 edges
7. `Button()` - 207 edges
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

## Communities (208 total, 23 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (48): BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href() (+40 more)

### Community 1 - "client"
Cohesion: 0.07
Nodes (18): BOOK_LOCK_FORMS, as(), client(), root, send(), doc(), root, doc() (+10 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.tsx"
Cohesion: 0.07
Nodes (44): blankLine(), InvoiceForm(), MonthSelect(), TransactionJournal(), SegmentedControl(), SegmentedControlItem(), loadModuleCounts(), canGoOn() (+36 more)

### Community 4 - "marketing/attribution.ts"
Cohesion: 0.11
Nodes (29): ProposalSetup, QuerySource, JobOption, jobOptions(), InstantQuote, instantView(), FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS (+21 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "engine.ts"
Cohesion: 0.16
Nodes (25): addMonths(), compareIso(), lastDayOfMonth(), toIso(), ymd(), FilingInstance, fiscalYearOf(), followsCalendarYear() (+17 more)

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
Cohesion: 0.07
Nodes (58): emit(), listeners, markReadLocally(), onChanged(), onFocus(), onVisible(), refreshBell(), set() (+50 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.03
Nodes (72): ClientTab, UNDER, AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps (+64 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+11 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (40): defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES, FsLine, FsLineKey (+32 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (61): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+53 more)

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

### Community 40 - "ledger/data.ts"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (31): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+23 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (44): KIND, REASON, Section(), shortDate(), STATUS_TONE, AtcComparison, atcRows(), Bucket (+36 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "filings/actions.ts"
Cohesion: 0.12
Nodes (29): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+21 more)

### Community 45 - "index.ts"
Cohesion: 0.06
Nodes (20): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+12 more)

### Community 46 - "items.ts"
Cohesion: 0.20
Nodes (12): PayrollSetupPage(), Setup(), loadPayrollSettings(), BirCategory, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS (+4 more)

### Community 47 - "modal.tsx"
Cohesion: 0.15
Nodes (25): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), AlertDialog(), AlertDialogProps (+17 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.14
Nodes (32): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+24 more)

### Community 51 - "quote/page.tsx"
Cohesion: 0.14
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 52 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (25): RFC-4180, sortItems(), filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS (+17 more)

### Community 53 - "documents/labels.ts"
Cohesion: 0.08
Nodes (45): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+37 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.11
Nodes (38): BankAccountsRoute(), booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+30 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (58): ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable(), FirmMarketingPage() (+50 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.11
Nodes (34): EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), Form2316Signatory, mmdd(), paidInYear(), Payroll2316Raw (+26 more)

### Community 57 - "registrations/new/page.tsx"
Cohesion: 0.39
Nodes (6): ClientCaseKind, clientCase, NewRegistrationPage(), OwnerOnly(), manilaDate(), dtiRenewalDue()

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (54): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), EwtLine (+46 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (76): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+68 more)

### Community 60 - "app/requests/page.tsx"
Cohesion: 0.20
Nodes (19): SectionTabs(), StepRow, YearRenewalsForm(), RegistrationList(), RegistrationsPage(), Row, CaseRow, clientStatus (+11 more)

### Community 61 - "arap.ts"
Cohesion: 0.12
Nodes (27): exceljs@4.4.0, exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging() (+19 more)

### Community 62 - "morning.ts"
Cohesion: 0.29
Nodes (11): Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), runMorningEmail() (+3 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.16
Nodes (22): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+14 more)

### Community 64 - "combobox.tsx"
Cohesion: 0.14
Nodes (21): PaymentsNewPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), ReceiptsViewPage(), fmt(), OpenInvoice (+13 more)

### Community 65 - "react"
Cohesion: 0.09
Nodes (37): INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesViewPage() (+29 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/load.ts"
Cohesion: 0.09
Nodes (38): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), Lines(), lineStyle, Problems(), sameFigures() (+30 more)

### Community 68 - "form-1601c.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "supabaseServer"
Cohesion: 0.05
Nodes (76): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+68 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.20
Nodes (17): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), lookupParties(), blank() (+9 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (40): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+32 more)

### Community 72 - "form-1601c.ts"
Cohesion: 0.08
Nodes (48): GridRow, MonthGrid(), toInput(), AlphaCols, AlphalistRow, form2316(), Form2316Employer, contrib (+40 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "firm/parallel-run/page.tsx"
Cohesion: 0.13
Nodes (24): CELL, FirmParallelRunPage(), monthShort(), Summary(), BookInvoiceRow, differs(), MonthComparison, ParallelBooksRow (+16 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "cycle/page.tsx"
Cohesion: 0.19
Nodes (18): Cycle(), CycleWithClient, DocRow, shift(), CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+10 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.06
Nodes (56): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+48 more)

### Community 79 - "vitest"
Cohesion: 0.11
Nodes (22): corp, items, OWNER_PRICES, OWNER_SETTINGS, bandForSales(), JOB_GROUPS, JobBand, jobField (+14 more)

### Community 80 - "[clientId]/page.tsx"
Cohesion: 0.16
Nodes (23): dateFmt, loadItems(), loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone (+15 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (37): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+29 more)

### Community 82 - "settings/actions.ts"
Cohesion: 0.10
Nodes (35): cancelRegistrationAction(), completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+27 more)

### Community 83 - "link-button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "pg"
Cohesion: 0.08
Nodes (8): pg, root, root, root, Row, root, root, root

### Community 86 - "tools/page.tsx"
Cohesion: 0.14
Nodes (25): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), RepostRegisterButton(), ReverseForm(), OpeningChecklist() (+17 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.10
Nodes (58): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+50 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "Centavos"
Cohesion: 0.20
Nodes (13): EntryLine, RegisterTotals, TaxLine, Centavos, ReviewNote, approvalMemo(), Memo, MemoInput (+5 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.10
Nodes (31): metadata, QuotesClosed(), Start(), StartPage(), Checkbox(), SelectItem(), AttributionKeeper(), noop() (+23 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.23
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.11
Nodes (40): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+32 more)

### Community 94 - "calendar/staff.ts"
Cohesion: 0.20
Nodes (20): RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail(), PortalRequests() (+12 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "notifications-view.tsx"
Cohesion: 0.12
Nodes (29): GET(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, Empty(), NotificationsView() (+21 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.09
Nodes (32): DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, BatchRow, CODE_SOURCE_LABELS, PORTION_LABELS, ACCOUNT_SOURCES (+24 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (40): LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry, BookKind, BookLine, Column (+32 more)

### Community 101 - "filings/run.ts"
Cohesion: 0.14
Nodes (24): Rule, IsoDate, DeadlineRule, DueRule, EfpsGroup, FilingChannel, Frequency, PeriodFilter (+16 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (103): react-aria-components, ChipColor, Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, CheckboxProps (+95 more)

### Community 103 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "manilaToday"
Cohesion: 0.33
Nodes (9): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+1 more)

### Community 106 - "brand/page.tsx"
Cohesion: 0.15
Nodes (20): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), daysBetween(), expiryStatus() (+12 more)

### Community 107 - "showDate"
Cohesion: 0.14
Nodes (22): ClientTabs(), ClientReturnsPage(), FilingRow, Returns(), FilingListRow, decideMissing2307Action(), DecisionState, Decision() (+14 more)

### Community 108 - "template.ts"
Cohesion: 0.11
Nodes (19): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+11 more)

### Community 109 - "supabaseServer"
Cohesion: 0.08
Nodes (42): archiveLinkAction(), createLinkAction(), MarketingState, text(), accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState (+34 more)

### Community 110 - "ref_node_fs"
Cohesion: 0.05
Nodes (19): outDir, pkgDir, require, { version }, dir, readme, templates, dir (+11 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "cycle/actions.ts"
Cohesion: 0.13
Nodes (21): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+13 more)

### Community 113 - "Card"
Cohesion: 0.12
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (25): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+17 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.08
Nodes (65): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+57 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.21
Nodes (17): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+9 more)

### Community 118 - "vat.ts"
Cohesion: 0.10
Nodes (53): SaleSplit, incomeAttachments(), Periods, periods(), buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments() (+45 more)

### Community 119 - "proposal-view.tsx"
Cohesion: 0.14
Nodes (20): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+12 more)

### Community 120 - "source.ts"
Cohesion: 0.15
Nodes (22): newDocs(), oldDocs(), amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND, DocumentRow, fromBooksRow() (+14 more)

### Community 121 - "requireStaff"
Cohesion: 0.17
Nodes (19): Action(), MyWork(), MyWorkPage(), short(), TONE, lastMonth(), loadMyWork(), MyWork (+11 more)

### Community 122 - "layout.ts"
Cohesion: 0.16
Nodes (20): afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape(), Spec, SPECS, bodyBlocks() (+12 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.13
Nodes (19): Detail(), PayNow(), credit(), ItemList(), proofMethod, VerifiedItems(), FirmBlock, AllocationRow (+11 more)

### Community 126 - "toCentavos"
Cohesion: 0.10
Nodes (28): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+20 more)

### Community 127 - "books/reports/2307/page.tsx"
Cohesion: 0.10
Nodes (36): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), Row, datAddress(), datNameCols() (+28 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (79): @supabase/supabase-js, applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), geminiJson() (+71 more)

### Community 129 - "opening.ts"
Cohesion: 0.16
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+9 more)

### Community 130 - "mime.ts"
Cohesion: 0.09
Nodes (51): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+43 more)

### Community 131 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 132 - "fees/types.ts"
Cohesion: 0.14
Nodes (22): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+14 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (19): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+11 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (19): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), loadAssets(), Row (+11 more)

### Community 135 - "rates.ts"
Cohesion: 0.20
Nodes (22): monthlyTable(), monthlyWithholding(), roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax() (+14 more)

### Community 136 - "react"
Cohesion: 0.06
Nodes (69): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+61 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "getIdentity"
Cohesion: 0.12
Nodes (31): zod@^4.6.7, zod, ReplyForm(), send(), METHODS, ProofUpload(), send(), getIdentity (+23 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "review/page.tsx"
Cohesion: 0.15
Nodes (16): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, TabKey, Queue(), ReviewPage(), Row (+8 more)

### Community 141 - "pending-review.tsx"
Cohesion: 0.29
Nodes (12): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), unapproveSelectedAction(), MoveBar(), crossesYear() (+4 more)

### Community 142 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 143 - "brand/forms.tsx"
Cohesion: 0.16
Nodes (20): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+12 more)

### Community 144 - "Centavos"
Cohesion: 0.15
Nodes (14): Agency, BranchOptions, CaseStep, ClosureOptions, EMPLOYER_STEPS, LGU_STEPS, PlannedStep, RegistrationOptions (+6 more)

### Community 145 - "parts.ts"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 146 - "server-only"
Cohesion: 0.11
Nodes (37): server-only, GET(), GET(), GET(), MonthComplete(), SentRow, TimelineRow, runActingDigest() (+29 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.10
Nodes (33): Access, STATUS, CASH_FLOW_CLASSES, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES, Amendment (+25 more)

### Community 148 - "returns/books.test.ts"
Cohesion: 0.12
Nodes (16): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), client, row(), form1701 (+8 more)

### Community 149 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (39): SignOffState, bookKind, BookRow, bookStatus, Event, eventText, Filing(), FilingFile (+31 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.06
Nodes (84): nextConfig, next, robots(), AboutPage(), HOW, metadata, BirCalendarPage(), metadata (+76 more)

### Community 151 - "payroll/export/route.ts"
Cohesion: 0.16
Nodes (16): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+8 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.10
Nodes (33): CoverageClient, coverageGaps(), Gap, GapKind, isWeekend(), parseIso(), board, MARCO (+25 more)

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 154 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (17): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+9 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (29): ClientSelect(), Booking, ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy() (+21 more)

### Community 156 - "deadlines/actions.ts"
Cohesion: 0.31
Nodes (10): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+2 more)

### Community 157 - "sign-off-actions.tsx"
Cohesion: 0.11
Nodes (32): PriceRow, proposal(), buildProposalQuote(), buildQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem (+24 more)

### Community 158 - "review-queue.ts"
Cohesion: 0.16
Nodes (17): addClientNoteAction(), NoteState, NotesCard(), ClientNoteForm(), ICON, NotesTimeline(), when, inquiryAnswers() (+9 more)

### Community 159 - "Badge"
Cohesion: 0.18
Nodes (25): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+17 more)

### Community 160 - "staff/actions.ts"
Cohesion: 0.19
Nodes (15): addClientUserAction(), fieldErrors(), FormState, inviteStaffAction(), updateStaffAction(), roleLabel, StaffList(), StaffPage() (+7 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.17
Nodes (21): Interval, Admin, busyOf(), connect(), Connection, PersonWeek, teamWeek(), accessToken() (+13 more)

### Community 163 - "formatAmount"
Cohesion: 0.15
Nodes (24): ParallelRun(), ParallelRunPage(), quarterMonths(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+16 more)

### Community 164 - "filings/actions.ts"
Cohesion: 0.14
Nodes (25): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, advanceFilingAction() (+17 more)

### Community 165 - "returns/types.ts"
Cohesion: 0.07
Nodes (41): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+33 more)

### Community 166 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 169 - "statement-view.tsx"
Cohesion: 0.25
Nodes (14): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), PaymentsList() (+6 more)

### Community 170 - "bulk-actions.ts"
Cohesion: 0.20
Nodes (15): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), DocumentCodes (+7 more)

### Community 171 - "draft.ts"
Cohesion: 0.13
Nodes (23): file(), GET(), safe(), yearWorksheet(), employeesForMonth(), PayrollClient, buildEmployeeTemplate(), DraftIssue (+15 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (28): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+20 more)

### Community 173 - "profile.ts"
Cohesion: 0.15
Nodes (17): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), Expiry, ExpiryTone (+9 more)

### Community 174 - "registrations/[id]/page.tsx"
Cohesion: 0.22
Nodes (15): CompleteButton(), StepBadge(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell(), dayNumber() (+7 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 177 - "documents/[id]/page.tsx"
Cohesion: 0.23
Nodes (12): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ReadPayrollButton(), SheetPreview(), pendingDocumentTaxCodes() (+4 more)

### Community 178 - "pending-review.tsx"
Cohesion: 0.24
Nodes (13): BookingFields(), BooksChoices(), Codes, initialCodes(), ocrKeys(), PendingReview(), Pick(), CodeSourceKind (+5 more)

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 180 - "lock-actions.ts"
Cohesion: 0.31
Nodes (13): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+5 more)

### Community 181 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (58): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+50 more)

### Community 182 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 183 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 184 - "filed-returns.ts"
Cohesion: 0.23
Nodes (10): FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear(), TaxTypeGroup (+2 more)

### Community 185 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 186 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 188 - "site/calendar.ts"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 189 - "Card"
Cohesion: 0.13
Nodes (26): booksViewFor(), fmtMonth(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate(), lastMonth(), Reports() (+18 more)

### Community 190 - "books/periods.ts"
Cohesion: 0.36
Nodes (7): BooksMonthRow, BOOKS_MONTH_STATUS_LABELS, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 191 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 192 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 193 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 194 - "messages.ts"
Cohesion: 0.38
Nodes (5): cycleMessage(), dayFmt, NoticeKind, showDay(), Due

### Community 196 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 197 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 198 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 199 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 200 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 201 - "vitest"
Cohesion: 0.07
Nodes (8): vitest, HASH, LEAD, root, root, root, root, root

### Community 206 - "unlock-requests.tsx"
Cohesion: 0.83
Nodes (3): UnlockRequests(), when(), booksUnlockRequests()

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1475 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `client`, `ui.tsx`, `marketing/attribution.ts`, `package.json`, `engine.ts`, `notification-bell.tsx`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `filings/actions.ts`, `index.ts`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `money.ts`, `arap.ts`, `year-end/page.tsx`, `react`, `form-1601c.ts`, `supabaseServer`, `form-1601c.ts`, `firm/parallel-run/page.tsx`, `cycle/page.tsx`, `@remixicon/react`, `vitest`, `settings/actions.ts`, `pg`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `Centavos`, `document-scanner.tsx`, `intake-picker.tsx`, `calendar/staff.ts`, `review-form.tsx`, `ledger/books.ts`, `filings/run.ts`, `manilaToday`, `brand/page.tsx`, `template.ts`, `supabaseServer`, `ref_node_fs`, `cycle/actions.ts`, `Card`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `source.ts`, `requireStaff`, `layout.ts`, `batch/register.ts`, `toCentavos`, `books/reports/2307/page.tsx`, `read.test.ts`, `opening.ts`, `mime.ts`, `names.ts`, `fees/types.ts`, `gemini.ts`, `fixed-assets/page.tsx`, `rates.ts`, `ticked-allocation.test.ts`, `ledger.test.ts`, `review/page.tsx`, `pending-review.tsx`, `idle-watcher.tsx`, `parts.ts`, `ledger/types.ts`, `returns/books.test.ts`, `filings/[id]/page.tsx`, `blocks.tsx`, `payroll/export/route.ts`, `safeguards.ts`, `calendar/page.tsx`, `app/documents/page.tsx`, `sign-off-actions.tsx`, `review-queue.ts`, `Badge`, `staff/actions.ts`, `formatAmount`, `filings/actions.ts`, `returns/types.ts`, `lead-attribution.test.ts`, `app/settings/page.tsx`, `registrations/[id]/page.tsx`, `acting-approver.test.ts`, `fixed-assets.test.ts`, `documents/[id]/page.tsx`, `pending-review.tsx`, `returns-sign-off.test.ts`, `ledger-closing.test.ts`, `filed-returns.ts`, `tests/books.test.ts`, `month.ts`, `portal-statements-approval.test.ts`, `site/calendar.ts`, `Card`, `books/periods.ts`, `digest.ts`, `messages.ts`, `db.test.ts`, `books-2307.test.ts`, `leads-pipeline.test.ts`, `books-migration.test.ts`, `defer-documents.test.ts`, `fees.test.ts`, `portal-home.test.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09152542372881356 - nodes in this community are weakly interconnected._
- **Why does `next` connect `blocks.tsx` to `form-2307.ts`, `ui.tsx`, `package.json`, `notification-bell.tsx`, `cx`, `dependencies`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `filings/actions.ts`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/new/page.tsx`, `app/requests/page.tsx`, `arap.ts`, `year-end/page.tsx`, `combobox.tsx`, `react`, `returns/load.ts`, `supabaseServer`, `parties/[id]/page.tsx`, `books/forms.tsx`, `firm/parallel-run/page.tsx`, `cycle/page.tsx`, `@remixicon/react`, `[clientId]/page.tsx`, `settings/actions.ts`, `tools/page.tsx`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `calendar/staff.ts`, `notifications-view.tsx`, `review-form.tsx`, `cx`, `site-document.tsx`, `brand/page.tsx`, `showDate`, `supabaseServer`, `Card`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `requireStaff`, `batch/register.ts`, `statement.ts`, `toCentavos`, `books/reports/2307/page.tsx`, `read.test.ts`, `mime.ts`, `fixed-assets/page.tsx`, `react`, `getIdentity`, `review/page.tsx`, `pending-review.tsx`, `idle-watcher.tsx`, `brand/forms.tsx`, `parts.ts`, `server-only`, `ledger/types.ts`, `filings/[id]/page.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `deadlines/actions.ts`, `review-queue.ts`, `Badge`, `staff/actions.ts`, `formatAmount`, `filings/actions.ts`, `opengraph-image.tsx`, `statement-view.tsx`, `bulk-actions.ts`, `draft.ts`, `app/settings/page.tsx`, `registrations/[id]/page.tsx`, `documents/[id]/page.tsx`, `pending-review.tsx`, `lock-actions.ts`, `payroll/forms.tsx`, `Card`, `deadlines/actions.ts`, `unlock-requests.tsx`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.06628787878787878 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.tsx`, `package.json`, `notification-bell.tsx`, `cx`, `dependencies`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `filings/actions.ts`, `items.ts`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/new/page.tsx`, `Notice`, `app/requests/page.tsx`, `year-end/page.tsx`, `combobox.tsx`, `react`, `returns/load.ts`, `supabaseServer`, `books/forms.tsx`, `firm/parallel-run/page.tsx`, `stat-cards.tsx`, `cycle/page.tsx`, `@remixicon/react`, `vitest`, `[clientId]/page.tsx`, `how-we-work/page.tsx`, `settings/actions.ts`, `link-button.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/[id]/page.tsx`, `calendar/staff.ts`, `notifications-view.tsx`, `review-form.tsx`, `cx`, `site-document.tsx`, `brand/page.tsx`, `showDate`, `supabaseServer`, `Card`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `requireStaff`, `batch/register.ts`, `statement.ts`, `toCentavos`, `books/reports/2307/page.tsx`, `mime.ts`, `fixed-assets/page.tsx`, `getIdentity`, `review/page.tsx`, `pending-review.tsx`, `idle-watcher.tsx`, `brand/forms.tsx`, `parts.ts`, `server-only`, `filings/[id]/page.tsx`, `blocks.tsx`, `workpapers/page.tsx`, `calendar/page.tsx`, `app/documents/page.tsx`, `deadlines/actions.ts`, `review-queue.ts`, `Badge`, `staff/actions.ts`, `formatAmount`, `filings/actions.ts`, `social-button.tsx`, `statement-view.tsx`, `app/settings/page.tsx`, `registrations/[id]/page.tsx`, `documents/[id]/page.tsx`, `pending-review.tsx`, `payroll/forms.tsx`, `Card`, `deadlines/actions.ts`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._