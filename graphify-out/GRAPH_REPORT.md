# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 897 files · ~710,282 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5536 nodes · 19330 edges · 186 communities (168 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 175 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `06630ec6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- december-rehearsal.test.ts
- migrate.yml
- ui.ts
- manilaToday
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
- Centavos
- employees-xlsx.ts
- next
- index.ts
- payroll/forms.tsx
- modal.tsx
- deadlines/page.tsx
- scripts
- supabaseAdmin
- server.ts
- register-xlsx.ts
- documents/labels.ts
- module-pages.tsx
- marketing/page.tsx
- payroll/data.ts
- registrations/forms.tsx
- returns/types.ts
- Notice
- registrations/[id]/page.tsx
- arap.ts
- morning.ts
- lock-bar.tsx
- showDate
- invoice-pages.tsx
- Apple Design
- supabaseServer
- testing.ts
- clients/actions.ts
- form-2307.tsx
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- lib/books/actions.ts
- stat-cards.tsx
- cycle/page.tsx
- @remixicon/react
- portal/documents/page.tsx
- zod
- how-we-work/page.tsx
- steps.ts
- notification.tsx
- Pro components
- Textarea
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
- notifications-view.tsx
- BoardUI theming reference
- Pro templates
- bulk-actions.ts
- ledger/books.ts
- engine.ts
- select.tsx
- month-complete.tsx
- boardui
- batch/forms.tsx
- profile.ts
- filings/[id]/page.tsx
- upload/page.tsx
- social-button.tsx
- vitest
- Opening balances: checklist for any cut-off
- tieouts.ts
- portal/page.tsx
- transactions-actions.ts
- [clientId]/page.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- vat.ts
- proposal-view.tsx
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
- fields.ts
- notification-actions.tsx
- gemini.ts
- fixed-assets/page.tsx
- rates.ts
- react
- ticked-allocation.test.ts
- proof-upload.tsx
- receipts.ts
- queries.ts
- move-bar.tsx
- brand/actions.ts
- notifications/format.ts
- worksheet/page.tsx
- register/page.tsx
- server-only
- ledger/types.ts
- staff/page.tsx
- sign-off-actions.tsx
- blocks.tsx
- holiday-list.ts
- addDays
- Badge
- notification-settings-view.tsx
- app/documents/page.tsx
- billing/page.tsx
- quote.ts
- leads/[id]/page.tsx
- acting-approver/page.tsx
- bell-store.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- parallel-run.tsx
- filings/actions.ts
- site/calendar.ts
- deadlines/actions.ts
- opengraph-image.tsx
- lead-attribution.test.ts
- book-income.ts
- payments-list.tsx
- Building UIs with BoardUI
- app/settings/page.tsx
- binder/page.tsx
- names.ts
- acting-approver.test.ts
- periods
- xlsx.ts
- copy-opencv.mjs
- returns-sign-off.test.ts
- parallel-run.test.ts
- [month]/page.tsx
- reports/parallel-run/page.tsx
- generate-qap-fixture.mjs
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 314 edges
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

## Communities (186 total, 18 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (41): BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href() (+33 more)

### Community 1 - "december-rehearsal.test.ts"
Cohesion: 0.05
Nodes (23): BOOK_LOCK_FORMS, as(), client(), root, approved(), as(), root, approved() (+15 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.06
Nodes (65): blankLine(), InvoiceForm(), InvoiceFormValue, BooksLockBar(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard() (+57 more)

### Community 4 - "manilaToday"
Cohesion: 0.09
Nodes (41): acceptProposalAction(), AcceptState, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick() (+33 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "clients/[id]/page.tsx"
Cohesion: 0.08
Nodes (43): ClientTabs(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+35 more)

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
Cohesion: 0.22
Nodes (16): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), Counter(), DropdownPopover() (+8 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.04
Nodes (75): react-aria-components, ClientTab, UNDER, StatusDot(), StatusDotColor, StatusDotProps, styles, Checkbox() (+67 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "zod"
Cohesion: 0.12
Nodes (17): dependencies, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (53): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), FinancialStatementsView(), StatementTable(), PrintButton() (+45 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.11
Nodes (58): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+50 more)

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

### Community 42 - "Centavos"
Cohesion: 0.08
Nodes (44): CELL, FirmParallelRunPage(), monthShort(), Summary(), atcRows(), BookInvoiceRow, Bucket, compareParallelRun() (+36 more)

### Community 43 - "employees-xlsx.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "next"
Cohesion: 0.07
Nodes (26): nextConfig, next, GlobalNotFound(), metadata, apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle() (+18 more)

### Community 45 - "index.ts"
Cohesion: 0.04
Nodes (29): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+21 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (40): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+32 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (38): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+30 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+20 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.10
Nodes (46): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+38 more)

### Community 51 - "server.ts"
Cohesion: 0.07
Nodes (60): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+52 more)

### Community 52 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (30): RFC-4180, file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), draftToTemplate(), filled() (+22 more)

### Community 53 - "documents/labels.ts"
Cohesion: 0.15
Nodes (21): DocReviewActions(), DocumentsCard(), when(), DocumentUpload(), send(), upload(), Item, typeFromName() (+13 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.16
Nodes (43): booksContext(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+35 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.07
Nodes (57): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+49 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.10
Nodes (39): saveMonthAction(), applyRegister(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Signatory, mmdd(), paidInYear() (+31 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.10
Nodes (38): StaffOptions(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction() (+30 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (64): qapBuckets(), lookupAtc(), client, row(), INPUTS, MONTH, PAYSLIP_COLUMNS, payslipCsv() (+56 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (64): BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), BookPicker(), CloseYearForm(), EntryForm(), OpeningUpload() (+56 more)

### Community 60 - "registrations/[id]/page.tsx"
Cohesion: 0.16
Nodes (33): SectionTabs(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+25 more)

### Community 61 - "arap.ts"
Cohesion: 0.12
Nodes (26): exceljs@4.4.0, exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging() (+18 more)

### Community 62 - "morning.ts"
Cohesion: 0.14
Nodes (17): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, showDay() (+9 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.15
Nodes (24): ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months(), one() (+16 more)

### Community 64 - "showDate"
Cohesion: 0.11
Nodes (22): DeadlinesPage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, TabKey, Queue(), ReviewPage() (+14 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.09
Nodes (34): INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage() (+26 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "supabaseServer"
Cohesion: 0.06
Nodes (65): removeAssignmentAction(), setClientStatusAction(), addClientNoteAction(), addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema (+57 more)

### Community 68 - "testing.ts"
Cohesion: 0.09
Nodes (31): vitest, form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual (+23 more)

### Community 69 - "clients/actions.ts"
Cohesion: 0.08
Nodes (40): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setIncomeTaxMethodAction(), setupMissingChartsAction(), updateClientAction() (+32 more)

### Community 70 - "form-2307.tsx"
Cohesion: 0.13
Nodes (24): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), PortalPrint2307Page(), Print(), portal2307Href(), Accreditation() (+16 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (41): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+33 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (72): GridRow, MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv() (+64 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (22): ClientReturnsPage(), Returns(), AmendmentFlag, BooksMonthRow, booksStillOpen(), CodeSource, Db, DocumentPortion (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): @remixicon/react, DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "cycle/page.tsx"
Cohesion: 0.17
Nodes (20): Cycle(), CycleWithClient, DocRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton(), closeCycleAction() (+12 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.07
Nodes (49): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+41 more)

### Community 79 - "portal/documents/page.tsx"
Cohesion: 0.16
Nodes (17): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+9 more)

### Community 80 - "zod"
Cohesion: 0.17
Nodes (16): zod@^4.6.7, zod, addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), AddBranchForm() (+8 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.11
Nodes (36): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+28 more)

### Community 82 - "steps.ts"
Cohesion: 0.10
Nodes (22): Agency, birForm(), BranchOptions, CaseStep, ClosureOptions, EMPLOYER_STEPS, LGU_STEPS, PlannedStep (+14 more)

### Community 83 - "notification.tsx"
Cohesion: 0.04
Nodes (54): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, ButtonLinkProps (+46 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "Textarea"
Cohesion: 0.16
Nodes (20): NoteState, ClientNoteForm(), NewRequestForm(), ReplyForm(), TicketForm(), ReplyForm(), send(), Textarea() (+12 more)

### Community 86 - "tools/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), AMENDMENT_BADGE, Books() (+20 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (69): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+61 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.15
Nodes (16): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, approvalMemo(), Memo, MemoMonth (+8 more)

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
Cohesion: 0.21
Nodes (23): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+15 more)

### Community 94 - "app/requests/[id]/page.tsx"
Cohesion: 0.21
Nodes (17): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+9 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "notifications-view.tsx"
Cohesion: 0.24
Nodes (15): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, base() (+7 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "bulk-actions.ts"
Cohesion: 0.14
Nodes (17): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), DocumentCodes, ACCOUNT_SOURCES (+9 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+39 more)

### Community 101 - "engine.ts"
Cohesion: 0.07
Nodes (53): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+45 more)

### Community 102 - "select.tsx"
Cohesion: 0.07
Nodes (41): Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider() (+33 more)

### Community 103 - "month-complete.tsx"
Cohesion: 0.16
Nodes (16): MonthComplete(), SentRow, TimelineRow, confirmMonthAction(), CycleState, undoMonthAction(), invoiceLabel(), MissingNumber (+8 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "batch/forms.tsx"
Cohesion: 0.29
Nodes (11): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), loadBatchContext(), monthsBetween(), BatchContext (+3 more)

### Community 106 - "profile.ts"
Cohesion: 0.11
Nodes (22): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+14 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (41): FilingRow, FilingListRow, worksheetTaxDue(), bookKind, BookRow, bookStatus, Event, eventText (+33 more)

### Community 108 - "upload/page.tsx"
Cohesion: 0.33
Nodes (11): shift(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), addMonths(), ymd() (+3 more)

### Community 109 - "social-button.tsx"
Cohesion: 0.06
Nodes (52): GET(), GET(), POST(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+44 more)

### Community 110 - "vitest"
Cohesion: 0.02
Nodes (37): pg, dir, ctx, input, root, root, root, root (+29 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "tieouts.ts"
Cohesion: 0.14
Nodes (21): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote (+13 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (35): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+27 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (47): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+39 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.13
Nodes (26): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+18 more)

### Community 118 - "vat.ts"
Cohesion: 0.13
Nodes (42): sawtBuckets(), atcInfo(), atcKind(), normalizeAtc(), incomeAttachments(), buildSawt(), incomePayment(), invoiceLabel() (+34 more)

### Community 119 - "proposal-view.tsx"
Cohesion: 0.21
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.05
Nodes (66): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), loadAssets(), Row, LOCKED_STATUSES, FinancialStatements (+58 more)

### Community 121 - "work/load.ts"
Cohesion: 0.17
Nodes (19): Action(), MyWork(), MyWorkPage(), short(), TONE, lastMonth(), loadMyWork(), MyWork (+11 more)

### Community 122 - "layout.ts"
Cohesion: 0.13
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.15
Nodes (16): BatchCheck, BatchColumn, BatchRow, centavosOf(), checkRow(), findAccount(), isoDate(), pesos() (+8 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.17
Nodes (15): Detail(), PayNow(), statusBadge, FirmBlock, AllocationRow, PaidItem, PayAccount, PaymentProof (+7 more)

### Community 126 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (41): BOOKED_TYPES, PayrollDocument(), applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap() (+33 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.06
Nodes (66): DocumentReviewPage(), loadBooking(), Review(), fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction() (+58 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (76): geminiJson(), BirCategory, Category, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ITEM_KINDS, KIND_ORDER (+68 more)

### Community 129 - "opening.ts"
Cohesion: 0.08
Nodes (37): AgingRow, CheckedUpdate, EntryLineOut, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem (+29 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (52): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+44 more)

### Community 131 - "fields.ts"
Cohesion: 0.11
Nodes (27): approveDocumentAction(), DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, postDocumentToBooks(), unpostDocumentFromBooks(), CODE_SOURCE_LABELS (+19 more)

### Community 132 - "notification-actions.tsx"
Cohesion: 0.23
Nodes (12): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+4 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (19): OCR_READ_FIELDS, OcrOutput, ocrOutputSchema, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+11 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 135 - "rates.ts"
Cohesion: 0.25
Nodes (17): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+9 more)

### Community 136 - "react"
Cohesion: 0.06
Nodes (61): react, Batch(), BatchPage(), one(), toCentavos(), BankAccountsRoute(), CustomersRoute(), EmployeesRoute() (+53 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "proof-upload.tsx"
Cohesion: 0.18
Nodes (17): ProofReview(), METHODS, ProofUpload(), send(), suggestTicks(), amount, date, ProofState (+9 more)

### Community 139 - "receipts.ts"
Cohesion: 0.22
Nodes (11): firmBlockLines(), formatTin(), cents(), CLIENT_MONEY_KINDS, FEE_KINDS, GrossReceiptsWatch, grossReceiptsWatch(), pesos() (+3 more)

### Community 140 - "queries.ts"
Cohesion: 0.19
Nodes (14): GET(), isNotificationKind(), BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+6 more)

### Community 141 - "move-bar.tsx"
Cohesion: 0.29
Nodes (12): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), unapproveSelectedAction(), MoveBar(), crossesYear() (+4 more)

### Community 142 - "brand/actions.ts"
Cohesion: 0.23
Nodes (10): BrandSettingsState, refresh(), saveBrandSectionAction(), SAVED, BRAND_FILES, BrandFileKind, parseSection(), Section (+2 more)

### Community 143 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 144 - "worksheet/page.tsx"
Cohesion: 0.38
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 145 - "register/page.tsx"
Cohesion: 0.13
Nodes (34): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+26 more)

### Community 146 - "server-only"
Cohesion: 0.14
Nodes (29): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+21 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.13
Nodes (24): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES (+16 more)

### Community 148 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 149 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.06
Nodes (84): robots(), AboutPage(), HOW, metadata, BirCalendarPage(), metadata, BRING, ContactList() (+76 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.16
Nodes (15): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+7 more)

### Community 152 - "addDays"
Cohesion: 0.12
Nodes (26): board, MARCO, none, RHEA, row(), steps, documentCutoff(), DONE_FROM_STATUS (+18 more)

### Community 153 - "Badge"
Cohesion: 0.15
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

### Community 154 - "notification-settings-view.tsx"
Cohesion: 0.14
Nodes (17): EmailSwitches(), EmailSwitchGroup, Switch(), SwitchProps, SwitchShape, SwitchSize, switchSizes, SwitchTrack() (+9 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (29): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), Documents(), DocumentsPage() (+21 more)

### Community 156 - "billing/page.tsx"
Cohesion: 0.42
Nodes (8): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), StatementView(), loadPayments(), loadStatement()

### Community 157 - "quote.ts"
Cohesion: 0.05
Nodes (81): corp, items, proposal(), EstimatedProfile, estimateProfile(), gapFor(), has(), items (+73 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (36): NotesCard(), BookingLink(), ReopenForm(), bookedTime, Lead(), LeadPage(), LeadTouch, Person (+28 more)

### Community 159 - "acting-approver/page.tsx"
Cohesion: 0.15
Nodes (28): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+20 more)

### Community 160 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.24
Nodes (18): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+10 more)

### Community 163 - "parallel-run.tsx"
Cohesion: 0.14
Nodes (23): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), monthName(), Parties() (+15 more)

### Community 164 - "filings/actions.ts"
Cohesion: 0.17
Nodes (16): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+8 more)

### Community 165 - "site/calendar.ts"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 166 - "deadlines/actions.ts"
Cohesion: 0.42
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 169 - "book-income.ts"
Cohesion: 0.36
Nodes (7): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS

### Community 170 - "payments-list.tsx"
Cohesion: 0.36
Nodes (7): credit(), ItemList(), PaymentsList(), proofMethod, VerifiedItems(), OpenStatementItem, PROOF_STATUS

### Community 171 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (37): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+29 more)

### Community 173 - "binder/page.tsx"
Cohesion: 0.39
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, SIGNED_REFS

### Community 174 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "periods"
Cohesion: 0.67
Nodes (7): Periods, periods(), addMonths(), monthEnd(), pad2(), quarterOf(), taxableYear()

### Community 177 - "xlsx.ts"
Cohesion: 0.20
Nodes (15): GET(), safe(), loadAccounts(), accountLabel(), BATCH_COLUMNS, BATCH_KINDS, BatchAccount, buildBatchTemplate() (+7 more)

### Community 178 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 180 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 181 - "[month]/page.tsx"
Cohesion: 0.09
Nodes (41): EmployeeDetail(), EmployeePage(), PreviewTable(), SubmissionReview(), PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction() (+33 more)

### Community 182 - "reports/parallel-run/page.tsx"
Cohesion: 0.83
Nodes (3): ParallelRun(), ParallelRunPage(), quarterMonths()

### Community 183 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1471 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `testing.ts` to `form-2307.ts`, `december-rehearsal.test.ts`, `ui.ts`, `manilaToday`, `package.json`, `clients/[id]/page.tsx`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `index.ts`, `deadlines/page.tsx`, `supabaseAdmin`, `server.ts`, `marketing/page.tsx`, `payroll/data.ts`, `returns/types.ts`, `arap.ts`, `morning.ts`, `lock-bar.tsx`, `showDate`, `invoice-pages.tsx`, `clients/actions.ts`, `payroll/payroll.test.ts`, `lib/books/actions.ts`, `cycle/page.tsx`, `@remixicon/react`, `zod`, `steps.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `app/requests/[id]/page.tsx`, `bulk-actions.ts`, `ledger/books.ts`, `engine.ts`, `month-complete.tsx`, `filings/[id]/page.tsx`, `upload/page.tsx`, `social-button.tsx`, `vitest`, `tieouts.ts`, `portal/page.tsx`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `returns/load.ts`, `work/load.ts`, `layout.ts`, `batch/register.ts`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `read.test.ts`, `opening.ts`, `return-file-actions.ts`, `fields.ts`, `gemini.ts`, `fixed-assets/page.tsx`, `rates.ts`, `ticked-allocation.test.ts`, `receipts.ts`, `move-bar.tsx`, `notifications/format.ts`, `register/page.tsx`, `server-only`, `ledger/types.ts`, `blocks.tsx`, `holiday-list.ts`, `addDays`, `app/documents/page.tsx`, `quote.ts`, `leads/[id]/page.tsx`, `acting-approver/page.tsx`, `calendar/page.tsx`, `filings/actions.ts`, `site/calendar.ts`, `lead-attribution.test.ts`, `app/settings/page.tsx`, `names.ts`, `acting-approver.test.ts`, `returns-sign-off.test.ts`, `parallel-run.test.ts`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10595065312046444 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `form-2307.ts`, `ui.ts`, `manilaToday`, `package.json`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `cx`, `zod`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `server.ts`, `register-xlsx.ts`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `Notice`, `registrations/[id]/page.tsx`, `arap.ts`, `lock-bar.tsx`, `showDate`, `invoice-pages.tsx`, `supabaseServer`, `clients/actions.ts`, `form-2307.tsx`, `books/forms.tsx`, `lib/books/actions.ts`, `cycle/page.tsx`, `@remixicon/react`, `portal/documents/page.tsx`, `zod`, `Textarea`, `tools/page.tsx`, `portal/reports/page.tsx`, `workpapers/load.ts`, `intake-picker.tsx`, `form-2316.tsx`, `leads/forms.tsx`, `app/requests/[id]/page.tsx`, `notifications-view.tsx`, `bulk-actions.ts`, `ledger/books.ts`, `select.tsx`, `month-complete.tsx`, `batch/forms.tsx`, `filings/[id]/page.tsx`, `upload/page.tsx`, `social-button.tsx`, `portal/page.tsx`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `returns/load.ts`, `work/load.ts`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `return-file-actions.ts`, `fields.ts`, `notification-actions.tsx`, `fixed-assets/page.tsx`, `react`, `proof-upload.tsx`, `queries.ts`, `move-bar.tsx`, `brand/actions.ts`, `worksheet/page.tsx`, `register/page.tsx`, `server-only`, `ledger/types.ts`, `sign-off-actions.tsx`, `blocks.tsx`, `Badge`, `app/documents/page.tsx`, `billing/page.tsx`, `leads/[id]/page.tsx`, `acting-approver/page.tsx`, `parallel-run.tsx`, `filings/actions.ts`, `deadlines/actions.ts`, `opengraph-image.tsx`, `payments-list.tsx`, `app/settings/page.tsx`, `binder/page.tsx`, `xlsx.ts`, `[month]/page.tsx`, `reports/parallel-run/page.tsx`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Should `december-rehearsal.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053426248548199766 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `cx`, `zod`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `next`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `server.ts`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `registrations/forms.tsx`, `Notice`, `registrations/[id]/page.tsx`, `lock-bar.tsx`, `showDate`, `invoice-pages.tsx`, `supabaseServer`, `clients/actions.ts`, `form-2307.tsx`, `books/forms.tsx`, `lib/books/actions.ts`, `stat-cards.tsx`, `cycle/page.tsx`, `@remixicon/react`, `portal/documents/page.tsx`, `zod`, `how-we-work/page.tsx`, `notification.tsx`, `Textarea`, `tools/page.tsx`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/forms.tsx`, `app/requests/[id]/page.tsx`, `ledger/books.ts`, `select.tsx`, `month-complete.tsx`, `batch/forms.tsx`, `filings/[id]/page.tsx`, `upload/page.tsx`, `social-button.tsx`, `portal/page.tsx`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `work/load.ts`, `statement.ts`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `return-file-actions.ts`, `fields.ts`, `notification-actions.tsx`, `fixed-assets/page.tsx`, `proof-upload.tsx`, `queries.ts`, `move-bar.tsx`, `worksheet/page.tsx`, `register/page.tsx`, `staff/page.tsx`, `sign-off-actions.tsx`, `blocks.tsx`, `Badge`, `notification-settings-view.tsx`, `app/documents/page.tsx`, `billing/page.tsx`, `quote.ts`, `leads/[id]/page.tsx`, `acting-approver/page.tsx`, `bell-store.ts`, `calendar/page.tsx`, `parallel-run.tsx`, `deadlines/actions.ts`, `app/settings/page.tsx`, `binder/page.tsx`, `[month]/page.tsx`, `reports/parallel-run/page.tsx`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._