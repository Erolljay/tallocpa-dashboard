# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 888 files · ~704,133 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5507 nodes · 19222 edges · 197 communities (170 shown, 27 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 174 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `87fd9e34`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- formatAmount
- client
- migrate.yml
- ui.ts
- manilaToday
- package.json
- clients/actions.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
- Sign-in & Setup Docs
- notification.tsx
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
- supabaseServer
- index.ts
- payroll/forms.tsx
- modal.tsx
- addDays
- scripts
- slots.ts
- fees/[id]/page.tsx
- register-xlsx.ts
- documents/labels.ts
- formatAmount
- marketing/page.tsx
- payroll/data.ts
- Badge
- returns/types.ts
- Notice
- digest.ts
- ledger/data.ts
- layout.ts
- manilaToday
- cx
- settlement-pages.tsx
- Apple Design
- social-button.tsx
- testing.ts
- proposal.ts
- source.ts
- books/forms.tsx
- Centavos
- Rules
- Animation Performance
- site-document.tsx
- stat-cards.tsx
- cycle-forms.tsx
- theme-toggle.tsx
- quote.ts
- getIdentity
- how-we-work/page.tsx
- zod
- button.tsx
- Pro components
- getIdentity
- ledger/data.ts
- portal/reports/page.tsx
- portal-billing.test.ts
- Centavos
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- money.ts
- Recipes
- notifications-view.tsx
- BoardUI page patterns
- Pro templates
- review-form.tsx
- ledger/books.ts
- addDays
- select.tsx
- status.ts
- boardui
- quote/page.tsx
- profile.ts
- filings/[id]/page.tsx
- template.ts
- marketing/attribution.ts
- ref_node_fs
- Opening balances: checklist for any cut-off
- month-complete.tsx
- portal/page.tsx
- transactions-actions.ts
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- vat.ts
- proposal-view.tsx
- returns/load.ts
- form-2307.tsx
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- toCentavos
- terms.ts
- read.test.ts
- workpapers/load.ts
- return-file-actions.ts
- runs.tsx
- clients/[id]/page.tsx
- fields.ts
- fixed-assets/page.tsx
- rates.ts
- react
- ticked-allocation.test.ts
- books-ready.ts
- ledger.test.ts
- queries.ts
- filings/actions.ts
- idle-watcher.tsx
- notifications/format.ts
- book-income.ts
- register/page.tsx
- supabaseAdmin
- opening-checklist.tsx
- portal-nav.tsx
- Textarea
- (site)/page.tsx
- holiday-list.ts
- safeguards.ts
- workpapers/page.tsx
- notification-settings-view.tsx
- app/documents/page.tsx
- return-files.tsx
- gap/page.tsx
- eslint.config.mjs
- filed-returns.ts
- bell-store.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- lock-actions.ts
- Card
- items.ts
- fees/types.ts
- opengraph-image.tsx
- lead-attribution.test.ts
- reports/parallel-run/page.tsx
- Building UIs with BoardUI
- firm/parallel-run/page.tsx
- app/settings/page.tsx
- proof-upload.tsx
- requireOwner
- acting-approver.test.ts
- fixed-assets.test.ts
- batch-upload.test.ts
- parallel-run.test.ts
- returns-sign-off.test.ts
- LinkButton
- portal-home.test.ts
- leads-pipeline.test.ts
- vitest
- parties/new/page.tsx
- tests/books.test.ts
- @supabase/ssr
- portal-statements-approval.test.ts
- @techstark/opencv-js
- site/calendar.ts
- missing-2307/page.tsx
- db.test.ts
- ledger-closing.test.ts
- tests/payroll.test.ts
- returns-books.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 311 edges
2. `cx` - 280 edges
3. `react` - 251 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 233 edges
6. `next` - 209 edges
7. `Button()` - 204 edges
8. `Card()` - 166 edges
9. `Badge()` - 165 edges
10. `vitest` - 164 edges

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

## Communities (197 total, 27 thin omitted)

### Community 0 - "formatAmount"
Cohesion: 0.10
Nodes (43): BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href() (+35 more)

### Community 1 - "client"
Cohesion: 0.07
Nodes (23): templatePayload(), BOOK_LOCK_FORMS, as(), client(), root, approved(), as(), root (+15 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (41): BooksSummaryPage(), Summary(), SummaryCard(), AllocationRow, InvoiceLineRow, InvoiceRow, loadModuleCounts(), loadSettlements() (+33 more)

### Community 4 - "manilaToday"
Cohesion: 0.11
Nodes (31): ProposalSetup, JobOption, instantView(), Quote, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+23 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "clients/actions.ts"
Cohesion: 0.07
Nodes (46): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+38 more)

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
Cohesion: 0.25
Nodes (16): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), BellAudience (+8 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "notification.tsx"
Cohesion: 0.06
Nodes (36): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, ButtonLinkProps (+28 more)

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
Cohesion: 0.06
Nodes (55): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+47 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (63): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+55 more)

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
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (37): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+29 more)

### Community 42 - "Centavos"
Cohesion: 0.05
Nodes (73): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), Parties(), PartyRow() (+65 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "supabaseServer"
Cohesion: 0.06
Nodes (46): nextConfig, next, addClientNoteAction(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+38 more)

### Community 45 - "index.ts"
Cohesion: 0.07
Nodes (20): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+12 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (55): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+47 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "addDays"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.19
Nodes (17): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+9 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.12
Nodes (38): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+30 more)

### Community 52 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (32): RFC-4180, sortItems(), filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS (+24 more)

### Community 53 - "documents/labels.ts"
Cohesion: 0.08
Nodes (42): Doc, when(), ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS (+34 more)

### Community 54 - "formatAmount"
Cohesion: 0.14
Nodes (40): BankAccountsRoute(), booksContext(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column (+32 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.11
Nodes (27): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+19 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.12
Nodes (29): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release() (+21 more)

### Community 57 - "Badge"
Cohesion: 0.06
Nodes (88): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+80 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (74): client, form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q (+66 more)

### Community 59 - "Notice"
Cohesion: 0.08
Nodes (83): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+75 more)

### Community 60 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 61 - "ledger/data.ts"
Cohesion: 0.12
Nodes (27): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+19 more)

### Community 62 - "layout.ts"
Cohesion: 0.13
Nodes (24): cycleMessage(), dayFmt, showDay(), Email, line(), longDay(), NEEDS, ownerEmail() (+16 more)

### Community 63 - "manilaToday"
Cohesion: 0.16
Nodes (22): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+14 more)

### Community 64 - "cx"
Cohesion: 0.03
Nodes (84): react-aria-components, StatusDot(), StatusDotColor, StatusDotProps, styles, Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps (+76 more)

### Community 65 - "settlement-pages.tsx"
Cohesion: 0.15
Nodes (20): PaymentsNewPage(), PaymentsEditPage(), ReceiptsNewPage(), ReceiptsEditPage(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+12 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "social-button.tsx"
Cohesion: 0.08
Nodes (33): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+25 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "proposal.ts"
Cohesion: 0.18
Nodes (22): assignReviewerAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), sendProposalAction(), text() (+14 more)

### Community 70 - "source.ts"
Cohesion: 0.08
Nodes (52): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), normalizeTin(), ocrProviderFromEnv(), runOcr(), runPendingOcr() (+44 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (40): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+32 more)

### Community 72 - "Centavos"
Cohesion: 0.05
Nodes (97): GridRow, MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv() (+89 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "site-document.tsx"
Cohesion: 0.12
Nodes (14): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), SiteNotFound(), geist (+6 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "cycle-forms.tsx"
Cohesion: 0.19
Nodes (17): Cycle(), CycleWithClient, DocRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton(), closeCycleAction() (+9 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.17
Nodes (19): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+11 more)

### Community 79 - "quote.ts"
Cohesion: 0.11
Nodes (31): proposal(), buildProposalQuote(), buildQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem, EWT_NOTE (+23 more)

### Community 80 - "getIdentity"
Cohesion: 0.20
Nodes (18): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+10 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (35): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+27 more)

### Community 82 - "zod"
Cohesion: 0.23
Nodes (11): zod, amount, date, ProofState, refresh(), rejectProofAction(), StartProof, submitSchema (+3 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (28): @remixicon/react, apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps (+20 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "getIdentity"
Cohesion: 0.13
Nodes (30): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+22 more)

### Community 86 - "ledger/data.ts"
Cohesion: 0.15
Nodes (27): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), AMENDMENT_BADGE, Books() (+19 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.10
Nodes (58): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+50 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "Centavos"
Cohesion: 0.14
Nodes (17): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, approvalMemo(), Memo, MemoInput (+9 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (22): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), ATTRIBUTION_KEY, pickAttribution() (+14 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.12
Nodes (32): PLACES, bookingLinkAction(), reopenLeadAction(), BookingLink(), ConvertForm(), DiscoveryCallForm(), FunnelSwitch(), JobRow() (+24 more)

### Community 94 - "money.ts"
Cohesion: 0.20
Nodes (15): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+7 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "notifications-view.tsx"
Cohesion: 0.12
Nodes (28): notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, Empty(), NotificationsView(), one() (+20 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.07
Nodes (48): blankLine(), InvoiceForm(), InvoiceFormValue, ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED (+40 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+39 more)

### Community 101 - "addDays"
Cohesion: 0.08
Nodes (53): shift(), Rule, addMonths(), compareIso(), IsoDate, lastDayOfMonth(), ymd(), DeadlineRule (+45 more)

### Community 102 - "select.tsx"
Cohesion: 0.09
Nodes (35): SheetPreview(), Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem() (+27 more)

### Community 103 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "quote/page.tsx"
Cohesion: 0.15
Nodes (20): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), complexity() (+12 more)

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (60): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+52 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.05
Nodes (66): FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText, Filing() (+58 more)

### Community 108 - "template.ts"
Cohesion: 0.12
Nodes (18): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS (+10 more)

### Community 109 - "marketing/attribution.ts"
Cohesion: 0.15
Nodes (31): GET(), Link, pageAttribution(), requestQuoteAction(), SERVICES, StartState, php, StartForm() (+23 more)

### Community 110 - "ref_node_fs"
Cohesion: 0.07
Nodes (14): outDir, pkgDir, require, { version }, ctx, input, api, ctx (+6 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "month-complete.tsx"
Cohesion: 0.13
Nodes (19): MonthComplete(), SentRow, TimelineRow, confirmMonthAction(), CycleState, decideExceptionAction(), refresh(), text() (+11 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (35): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+27 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.24
Nodes (17): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+9 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (38): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), RunReadyButton(), VoidDepositForm() (+30 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (36): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+28 more)

### Community 118 - "vat.ts"
Cohesion: 0.12
Nodes (46): SaleSplit, incomeAttachments(), Periods, buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv() (+38 more)

### Community 119 - "proposal-view.tsx"
Cohesion: 0.20
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.09
Nodes (42): FinancialStatements, row(), withNonDeductible(), dayBefore(), FilingRow, listInvoices(), loadEwtRemittances(), loadEwtYear() (+34 more)

### Community 121 - "form-2307.tsx"
Cohesion: 0.25
Nodes (12): Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set(), padded(), PartyFields() (+4 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.12
Nodes (34): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+26 more)

### Community 126 - "toCentavos"
Cohesion: 0.11
Nodes (32): file(), GET(), safe(), PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview(), peso() (+24 more)

### Community 127 - "terms.ts"
Cohesion: 0.24
Nodes (8): acceptProposalAction(), AcceptState, contentHash(), acceptedQuote(), canonicalContent(), defaultTerms(), ProposalContent, SERVICE_LABELS

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (73): applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), PayrollItem, amountOf() (+65 more)

### Community 129 - "workpapers/load.ts"
Cohesion: 0.16
Nodes (20): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote (+12 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (43): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+35 more)

### Community 131 - "runs.tsx"
Cohesion: 0.25
Nodes (8): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), Run

### Community 132 - "clients/[id]/page.tsx"
Cohesion: 0.07
Nodes (48): ClientTab, ClientTabs(), UNDER, DocumentsCard(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), NotesCard() (+40 more)

### Community 133 - "fields.ts"
Cohesion: 0.06
Nodes (43): approveDocumentAction(), postDocumentToBooks(), unpostDocumentFromBooks(), ok, FieldKey, keys, normalizeAmount(), normalizeFields() (+35 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.08
Nodes (46): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+38 more)

### Community 135 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 136 - "react"
Cohesion: 0.06
Nodes (64): react, CustomersRoute(), INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE (+56 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "books-ready.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "queries.ts"
Cohesion: 0.21
Nodes (13): GET(), BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications(), loadBellData() (+5 more)

### Community 141 - "filings/actions.ts"
Cohesion: 0.17
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+9 more)

### Community 142 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 143 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 144 - "book-income.ts"
Cohesion: 0.27
Nodes (9): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, NonDeductibleRow (+1 more)

### Community 145 - "register/page.tsx"
Cohesion: 0.11
Nodes (38): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+30 more)

### Community 146 - "supabaseAdmin"
Cohesion: 0.12
Nodes (36): server-only, @supabase/supabase-js, GET(), GET(), GET(), generateFilingsNow(), generatePastFilingsAction(), runActingDigest() (+28 more)

### Community 147 - "opening-checklist.tsx"
Cohesion: 0.07
Nodes (42): Access, OpeningChecklist(), STATUS, CASH_FLOW_CLASSES, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES (+34 more)

### Community 148 - "portal-nav.tsx"
Cohesion: 0.38
Nodes (7): activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab, Tab, under()

### Community 149 - "Textarea"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 150 - "(site)/page.tsx"
Cohesion: 0.06
Nodes (89): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+81 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.16
Nodes (16): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+8 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.09
Nodes (42): DashboardStats(), FilingTable(), OwnerSections(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice() (+34 more)

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+14 more)

### Community 154 - "notification-settings-view.tsx"
Cohesion: 0.23
Nodes (11): EmailSwitches(), EmailSwitchGroup, Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS, NotificationAudience (+3 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (34): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ReadPayrollButton(), ApprovedTable() (+26 more)

### Community 156 - "return-files.tsx"
Cohesion: 0.50
Nodes (7): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), startReturnFileUpload()

### Community 157 - "gap/page.tsx"
Cohesion: 0.22
Nodes (14): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), estimateProfile(), ExistingClient, gapFor(), GapRow (+6 more)

### Community 158 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 159 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 160 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.12
Nodes (34): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), addDays(), byDay() (+26 more)

### Community 163 - "lock-actions.ts"
Cohesion: 0.15
Nodes (23): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+15 more)

### Community 164 - "Card"
Cohesion: 0.33
Nodes (9): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, PrintButton() (+1 more)

### Community 165 - "items.ts"
Cohesion: 0.20
Nodes (12): PayrollSetupPage(), Setup(), BirCategory, CATEGORIES, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS (+4 more)

### Community 166 - "fees/types.ts"
Cohesion: 0.11
Nodes (20): corp, items, EstimatedProfile, OWNER_PRICES, OWNER_SETTINGS, jobField, ProposalJob, corp (+12 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 169 - "reports/parallel-run/page.tsx"
Cohesion: 0.60
Nodes (5): ParallelRun(), ParallelRunPage(), quarterMonths(), monthName(), StatusBadge()

### Community 170 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 171 - "firm/parallel-run/page.tsx"
Cohesion: 0.53
Nodes (5): CELL, FirmParallelRunPage(), monthShort(), Summary(), loadFirmParallelRun()

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.16
Nodes (24): periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+16 more)

### Community 173 - "proof-upload.tsx"
Cohesion: 0.60
Nodes (5): METHODS, ProofUpload(), send(), startProofUpload(), submitProof()

### Community 174 - "requireOwner"
Cohesion: 0.07
Nodes (67): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+59 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 178 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 180 - "LinkButton"
Cohesion: 0.18
Nodes (17): Batch(), BatchPage(), one(), toCentavos(), MonthSelect(), PrintAll(), PrintAll2316Page(), Certificates() (+9 more)

### Community 182 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 183 - "vitest"
Cohesion: 0.04
Nodes (23): pg, vitest, dir, root, root, root, root, root (+15 more)

### Community 185 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 194 - "site/calendar.ts"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 195 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 198 - "db.test.ts"
Cohesion: 0.24
Nodes (3): buildSeedSql(), q(), root

### Community 200 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1464 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `formatAmount`, `client`, `ui.ts`, `manilaToday`, `package.json`, `clients/actions.ts`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `index.ts`, `payroll/forms.tsx`, `addDays`, `payroll/data.ts`, `Badge`, `returns/types.ts`, `digest.ts`, `ledger/data.ts`, `layout.ts`, `manilaToday`, `social-button.tsx`, `testing.ts`, `source.ts`, `Centavos`, `cycle-forms.tsx`, `quote.ts`, `getIdentity`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `Centavos`, `document-scanner.tsx`, `intake-picker.tsx`, `money.ts`, `review-form.tsx`, `ledger/books.ts`, `addDays`, `status.ts`, `quote/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `marketing/attribution.ts`, `ref_node_fs`, `month-complete.tsx`, `portal/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `returns/load.ts`, `batch/register.ts`, `terms.ts`, `read.test.ts`, `return-file-actions.ts`, `clients/[id]/page.tsx`, `fields.ts`, `fixed-assets/page.tsx`, `rates.ts`, `ticked-allocation.test.ts`, `books-ready.ts`, `ledger.test.ts`, `filings/actions.ts`, `idle-watcher.tsx`, `notifications/format.ts`, `register/page.tsx`, `supabaseAdmin`, `opening-checklist.tsx`, `portal-nav.tsx`, `(site)/page.tsx`, `holiday-list.ts`, `safeguards.ts`, `app/documents/page.tsx`, `gap/page.tsx`, `filed-returns.ts`, `calendar/page.tsx`, `fees/types.ts`, `lead-attribution.test.ts`, `app/settings/page.tsx`, `acting-approver.test.ts`, `fixed-assets.test.ts`, `batch-upload.test.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `portal-home.test.ts`, `leads-pipeline.test.ts`, `tests/books.test.ts`, `portal-statements-approval.test.ts`, `site/calendar.ts`, `db.test.ts`, `ledger-closing.test.ts`, `tests/payroll.test.ts`, `returns-books.test.ts`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `formatAmount` be split into smaller, more focused modules?**
  _Cohesion score 0.1012987012987013 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `formatAmount`, `ui.ts`, `package.json`, `clients/actions.ts`, `notification-bell.tsx`, `notification.tsx`, `dependencies`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `supabaseServer`, `payroll/forms.tsx`, `modal.tsx`, `addDays`, `slots.ts`, `fees/[id]/page.tsx`, `documents/labels.ts`, `formatAmount`, `marketing/page.tsx`, `payroll/data.ts`, `Badge`, `Notice`, `manilaToday`, `cx`, `settlement-pages.tsx`, `social-button.tsx`, `source.ts`, `books/forms.tsx`, `site-document.tsx`, `stat-cards.tsx`, `cycle-forms.tsx`, `theme-toggle.tsx`, `getIdentity`, `how-we-work/page.tsx`, `button.tsx`, `getIdentity`, `ledger/data.ts`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/[id]/page.tsx`, `money.ts`, `notifications-view.tsx`, `review-form.tsx`, `ledger/books.ts`, `select.tsx`, `quote/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `marketing/attribution.ts`, `month-complete.tsx`, `portal/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `proposal-view.tsx`, `batch/register.ts`, `manilaToday`, `toCentavos`, `runs.tsx`, `clients/[id]/page.tsx`, `fixed-assets/page.tsx`, `queries.ts`, `idle-watcher.tsx`, `register/page.tsx`, `Textarea`, `(site)/page.tsx`, `safeguards.ts`, `workpapers/page.tsx`, `notification-settings-view.tsx`, `app/documents/page.tsx`, `return-files.tsx`, `gap/page.tsx`, `bell-store.ts`, `calendar/page.tsx`, `Card`, `items.ts`, `fees/types.ts`, `reports/parallel-run/page.tsx`, `firm/parallel-run/page.tsx`, `app/settings/page.tsx`, `proof-upload.tsx`, `requireOwner`, `LinkButton`, `parties/new/page.tsx`, `missing-2307/page.tsx`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.06685633001422475 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `formatAmount`, `ui.ts`, `package.json`, `clients/actions.ts`, `notification-bell.tsx`, `dependencies`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `payroll/forms.tsx`, `addDays`, `slots.ts`, `fees/[id]/page.tsx`, `documents/labels.ts`, `formatAmount`, `marketing/page.tsx`, `payroll/data.ts`, `Badge`, `ledger/data.ts`, `manilaToday`, `cx`, `settlement-pages.tsx`, `social-button.tsx`, `proposal.ts`, `source.ts`, `books/forms.tsx`, `site-document.tsx`, `cycle-forms.tsx`, `getIdentity`, `zod`, `getIdentity`, `ledger/data.ts`, `portal/reports/page.tsx`, `Centavos`, `intake-picker.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `money.ts`, `notifications-view.tsx`, `review-form.tsx`, `ledger/books.ts`, `quote/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `marketing/attribution.ts`, `month-complete.tsx`, `portal/page.tsx`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `proposal-view.tsx`, `form-2307.tsx`, `batch/register.ts`, `manilaToday`, `toCentavos`, `terms.ts`, `read.test.ts`, `return-file-actions.ts`, `runs.tsx`, `clients/[id]/page.tsx`, `fields.ts`, `fixed-assets/page.tsx`, `react`, `queries.ts`, `filings/actions.ts`, `idle-watcher.tsx`, `register/page.tsx`, `supabaseAdmin`, `opening-checklist.tsx`, `portal-nav.tsx`, `Textarea`, `(site)/page.tsx`, `safeguards.ts`, `workpapers/page.tsx`, `app/documents/page.tsx`, `return-files.tsx`, `gap/page.tsx`, `lock-actions.ts`, `Card`, `opengraph-image.tsx`, `reports/parallel-run/page.tsx`, `firm/parallel-run/page.tsx`, `app/settings/page.tsx`, `proof-upload.tsx`, `requireOwner`, `LinkButton`, `missing-2307/page.tsx`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._