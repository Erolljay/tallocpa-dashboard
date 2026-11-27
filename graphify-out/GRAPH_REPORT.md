# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 961 files · ~791,033 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5958 nodes · 21046 edges · 193 communities (173 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 187 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `ab62c26b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- draft.ts
- migrate.yml
- ui.ts
- fees/types.ts
- devDependencies
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- returns/load.ts
- Sign-in & Setup Docs
- notification-actions.tsx
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
- employees-xlsx.ts
- button.tsx
- documents/[id]/page.tsx
- payroll/forms.tsx
- modal.tsx
- marketing/page.tsx
- scripts
- slots.ts
- fees/[id]/page.tsx
- requireStaff
- webhook.ts
- module-pages.tsx
- deadlines/page.tsx
- react
- steps.ts
- returns/types.ts
- registrations/forms.tsx
- percentage.ts
- arap.ts
- work/page.tsx
- lock-bar.tsx
- gap/page.tsx
- invoice-pages.tsx
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
- Skeleton
- @remixicon/react
- vitest
- ledger/data.ts
- how-we-work/page.tsx
- parties/[id]/page.tsx
- cx
- Pro components
- review/page.tsx
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- upload/page.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- form-1601c.ts
- tasks/page.tsx
- Recipes
- tools/page.tsx
- BoardUI page patterns
- Pro templates
- steps.test.ts
- ledger/books.ts
- ledger/types.ts
- combobox.tsx
- rates.ts
- boardui
- documents/actions.ts
- requests/actions.ts
- filings/[id]/page.tsx
- cycle/page.tsx
- december-rehearsal.test.ts
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- queries.ts
- quote.ts
- source.ts
- leads/forms.tsx
- layout.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- Badge
- transactions-actions.ts
- parties/parties.test.ts
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- BooksFrame
- notifications/format.ts
- ocr/run.ts
- fixed-assets/page.tsx
- notification-settings-view.tsx
- supabaseServer
- ticked-allocation.test.ts
- staff/page.tsx
- review-form.tsx
- clients/[id]/page.tsx
- idle-watcher.tsx
- filings/actions.ts
- safeguards.ts
- bell-store.ts
- formatAmount
- supabaseAdmin
- Centavos
- notifications-view.tsx
- package.json
- blocks.tsx
- lock.ts
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- app/documents/page.tsx
- deadlines/actions.ts
- template.ts
- leads/[id]/page.tsx
- app/page.tsx
- app/requests/page.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- engine.ts
- month-complete.tsx
- register/page.tsx
- opengraph-image.tsx
- books/periods.ts
- registrations/[id]/page.tsx
- requireOwner
- sign-off-actions.tsx
- app/settings/page.tsx
- holiday-list.ts
- messages.ts
- acting-approver.test.ts
- eslint.config.mjs
- tests/register.test.ts
- bir-filing-calendar/page.tsx
- Building UIs with BoardUI
- lead-attribution.test.ts
- register-xlsx.ts
- @types/react@^19
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- site-document.tsx
- tests/books.test.ts
- seed.ts
- digest.ts
- db.test.ts
- templates/README.md
- telegram-uploads.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 367 edges
2. `cx` - 304 edges
3. `react` - 271 edges
4. `Notice()` - 255 edges
5. `Skeleton()` - 254 edges
6. `next` - 233 edges
7. `Button()` - 232 edges
8. `Badge()` - 182 edges
9. `Card()` - 182 edges
10. `vitest` - 182 edges

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

## Communities (193 total, 20 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (56): react-dom@19.3.0, react-dom, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page() (+48 more)

### Community 1 - "draft.ts"
Cohesion: 0.18
Nodes (15): DraftIssue, draftSchema, matchesOf(), digits(), editDistance(), EmployeeMatch, keyNo(), matchEmployee() (+7 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (53): BooksContext, booksViewFor(), fmtMonth(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate() (+45 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.07
Nodes (48): ProposalSetup, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery() (+40 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react-dom@^19, typescript@^5 (+7 more)

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

### Community 11 - "returns/load.ts"
Cohesion: 0.09
Nodes (37): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+29 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "notification-actions.tsx"
Cohesion: 0.16
Nodes (17): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+9 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (39): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine() (+31 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (47): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), codes, PNL, COA_TEMPLATES (+39 more)

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
Cohesion: 0.12
Nodes (30): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+22 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (56): CELL, FirmParallelRunPage(), monthShort(), Summary(), KIND, REASON, Section(), shortDate() (+48 more)

### Community 43 - "employees-xlsx.ts"
Cohesion: 0.12
Nodes (19): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+11 more)

### Community 44 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "documents/[id]/page.tsx"
Cohesion: 0.08
Nodes (48): Doc, ExceptionRow, addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage() (+40 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.06
Nodes (87): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+79 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (64): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+56 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.12
Nodes (31): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+23 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.12
Nodes (37): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+29 more)

### Community 52 - "requireStaff"
Cohesion: 0.09
Nodes (62): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+54 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (44): maxDuration, POST(), TelegramEnv, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked() (+36 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.08
Nodes (39): BankAccountsRoute(), fmtDate(), BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), JournalEntryRoute() (+31 more)

### Community 55 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 56 - "react"
Cohesion: 0.12
Nodes (26): react, PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage() (+18 more)

### Community 57 - "steps.ts"
Cohesion: 0.15
Nodes (14): Agency, BranchOptions, CaseKind, CaseStep, ClosureOptions, EMPLOYER_STEPS, LGU_STEPS, PlannedStep (+6 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (64): client, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel(), EwtLine (+56 more)

### Community 59 - "registrations/forms.tsx"
Cohesion: 0.10
Nodes (35): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+27 more)

### Community 60 - "percentage.ts"
Cohesion: 0.18
Nodes (30): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+22 more)

### Community 61 - "arap.ts"
Cohesion: 0.17
Nodes (18): exceljs, accountLabel(), AGING, aging(), agingBucket(), CashAccount, checkUpdate(), OpenItem (+10 more)

### Community 62 - "work/page.tsx"
Cohesion: 0.15
Nodes (21): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), Row, lastMonth() (+13 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.17
Nodes (21): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+13 more)

### Community 64 - "gap/page.tsx"
Cohesion: 0.11
Nodes (28): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+20 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.10
Nodes (28): SearchParams, INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE (+20 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.14
Nodes (23): TimelineFiling, TimelineItem, IsoDate, EfpsGroup, FilingChannel, FilingInstance, nextWorkingDay(), Period (+15 more)

### Community 68 - "testing.ts"
Cohesion: 0.12
Nodes (27): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+19 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.31
Nodes (9): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), NOT_INCLUDED_NOTE (+1 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (27): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+19 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (38): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+30 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (79): EmployeeDetail(), EmployeePage(), GridRow, AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer (+71 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.12
Nodes (43): incomeAttachments(), Periods, periods(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv(), sawtDat() (+35 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "Skeleton"
Cohesion: 0.07
Nodes (60): Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS, NewEntry() (+52 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.08
Nodes (46): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+38 more)

### Community 79 - "vitest"
Cohesion: 0.02
Nodes (41): pg, vitest, dir, ctx, input, root, root, root (+33 more)

### Community 80 - "ledger/data.ts"
Cohesion: 0.12
Nodes (27): dayBefore(), GET(), safe(), Released, fromWorkbookData(), buildBookWorkbook(), accountFromRow(), Amendment (+19 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.13
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "parties/[id]/page.tsx"
Cohesion: 0.13
Nodes (25): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList() (+17 more)

### Community 83 - "cx"
Cohesion: 0.03
Nodes (88): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+80 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "review/page.tsx"
Cohesion: 0.16
Nodes (15): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, TabKey, Queue(), ReviewPage(), Row (+7 more)

### Community 86 - "Notice"
Cohesion: 0.08
Nodes (88): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm(), EntryForm() (+80 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.10
Nodes (58): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker() (+50 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "upload/page.tsx"
Cohesion: 0.25
Nodes (15): DocReviewActions(), DocumentsCard(), when(), shift(), one(), ORDER, PortalUpload(), STREAM_INFO (+7 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (22): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), ATTRIBUTION_KEY, pickAttribution() (+14 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "form-1601c.ts"
Cohesion: 0.10
Nodes (37): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+29 more)

### Community 94 - "tasks/page.tsx"
Cohesion: 0.08
Nodes (52): RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks() (+44 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "tools/page.tsx"
Cohesion: 0.17
Nodes (21): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), RepostRegisterButton() (+13 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "steps.test.ts"
Cohesion: 0.18
Nodes (12): Check(), ClientCaseForm(), birForm(), closureStepsFor(), registersWithSec(), renewalStepsFor(), stepsFor(), templates() (+4 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (45): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+37 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.12
Nodes (24): Access, OpeningChecklist(), STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut (+16 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (78): react-aria-components, SheetPreview(), ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps (+70 more)

### Community 103 - "rates.ts"
Cohesion: 0.23
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+10 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "documents/actions.ts"
Cohesion: 0.21
Nodes (14): DocumentUpload(), send(), upload(), Item, typeFromName(), ALLOWED, DocActionState, finishUpload() (+6 more)

### Community 106 - "requests/actions.ts"
Cohesion: 0.11
Nodes (30): ReplyForm(), send(), METHODS, ProofUpload(), send(), amount, date, ProofState (+22 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (44): ClientTabs(), ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus (+36 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.16
Nodes (21): Cycle(), CyclePage(), CycleWithClient, DocRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+13 more)

### Community 109 - "december-rehearsal.test.ts"
Cohesion: 0.21
Nodes (7): taxableYearStart(), approveIntoBooks(), as(), lockMonth(), payroll(), root, Row

### Community 110 - "index.ts"
Cohesion: 0.03
Nodes (47): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+39 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (47): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+39 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.12
Nodes (35): disconnectCalendarAction(), GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches() (+27 more)

### Community 118 - "queries.ts"
Cohesion: 0.19
Nodes (14): GET(), isNotificationKind(), BELL_LIMIT, BellData, bellData, bellDataFor, emailOffKinds(), emailPreferences() (+6 more)

### Community 119 - "quote.ts"
Cohesion: 0.09
Nodes (38): PriceRow, corp, items, proposal(), buildProposalQuote(), JOB_GROUPS, JobBand, jobField (+30 more)

### Community 120 - "source.ts"
Cohesion: 0.11
Nodes (32): newDocs(), oldDocs(), qapBuckets(), sawtBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc() (+24 more)

### Community 121 - "leads/forms.tsx"
Cohesion: 0.24
Nodes (21): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+13 more)

### Community 122 - "layout.ts"
Cohesion: 0.12
Nodes (24): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+16 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "Badge"
Cohesion: 0.10
Nodes (40): Detail(), StatementPage(), MonthRemittances(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref() (+32 more)

### Community 126 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 127 - "parties/parties.test.ts"
Cohesion: 0.12
Nodes (29): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), displayName(), fullAddress(), listNameCols() (+21 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (87): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+79 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "BooksFrame"
Cohesion: 0.15
Nodes (23): booksContext(), one(), BooksFrame(), CustomersRoute(), JournalRoute(), JournalList(), ReportsIndex(), KINDS (+15 more)

### Community 132 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (44): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+36 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 135 - "notification-settings-view.tsx"
Cohesion: 0.23
Nodes (11): EmailSwitches(), EmailSwitchGroup, Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS, NotificationAudience (+3 more)

### Community 136 - "supabaseServer"
Cohesion: 0.05
Nodes (66): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), addChargeAction() (+58 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "staff/page.tsx"
Cohesion: 0.27
Nodes (9): roleLabel, StaffList(), StaffPage(), clientUserSchema, email, inviteStaffSchema, loadPoints(), name (+1 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.05
Nodes (62): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DirectoryParty, ENTRY_STATUS (+54 more)

### Community 140 - "clients/[id]/page.tsx"
Cohesion: 0.13
Nodes (24): ClientTab, UNDER, RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel (+16 more)

### Community 141 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 142 - "filings/actions.ts"
Cohesion: 0.06
Nodes (58): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, advanceFilingAction() (+50 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.07
Nodes (47): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, CoverageClient (+39 more)

### Community 144 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 145 - "formatAmount"
Cohesion: 0.15
Nodes (23): blankLine(), InvoiceForm(), InvoiceFormValue, TransactionJournal(), BookingFields(), ComboBoxItem(), ComboBoxSection(), Atcs() (+15 more)

### Community 146 - "supabaseAdmin"
Cohesion: 0.14
Nodes (32): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+24 more)

### Community 147 - "Centavos"
Cohesion: 0.09
Nodes (31): AgingRow, CheckedUpdate, EntryLineOut, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem (+23 more)

### Community 148 - "notifications-view.tsx"
Cohesion: 0.30
Nodes (11): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, fullDateTime() (+3 more)

### Community 149 - "package.json"
Cohesion: 0.18
Nodes (10): @supabase/ssr@^0.12.7, @techstark/opencv-js@4.12.0-release.1, tsx@^4.23.15, name, packageManager, private, version, @supabase/ssr (+2 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.06
Nodes (84): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+76 more)

### Community 151 - "lock.ts"
Cohesion: 0.25
Nodes (8): INCOME_TAX, LockFiling, lockFormsFor(), lockingFiling(), PAYROLL, PURCHASES, SALES, BOOK_LOCK_FORMS

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.24
Nodes (16): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), BellAudience (+8 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (52): ApprovedReview(), ApprovedRow, BulkState, ClientSelect(), Booking, moveSelectedAction(), MoveState, plural() (+44 more)

### Community 156 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 157 - "template.ts"
Cohesion: 0.11
Nodes (19): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS (+11 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (38): NotesCard(), BookingLink(), FunnelSwitch(), ReopenForm(), bookedTime, Lead(), LeadPage(), LeadSource() (+30 more)

### Community 159 - "app/page.tsx"
Cohesion: 0.16
Nodes (26): FilingTable(), OwnerSections(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+18 more)

### Community 160 - "app/requests/page.tsx"
Cohesion: 0.18
Nodes (17): SectionTabs(), Requests(), RequestsPage(), Row, View, VIEWS, PortalRequests(), Requests() (+9 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (18): FormState, DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant() (+10 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.18
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 164 - "engine.ts"
Cohesion: 0.23
Nodes (16): compareIso(), lastDayOfMonth(), fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), Obligation, periodApplies() (+8 more)

### Community 165 - "month-complete.tsx"
Cohesion: 0.32
Nodes (7): MonthComplete(), SentRow, TimelineRow, confirmMonthAction(), CycleState, undoMonthAction(), MissingRange

### Community 166 - "register/page.tsx"
Cohesion: 0.10
Nodes (39): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+31 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "books/periods.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 169 - "registrations/[id]/page.tsx"
Cohesion: 0.19
Nodes (25): StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell(), RegistrationList() (+17 more)

### Community 170 - "requireOwner"
Cohesion: 0.06
Nodes (67): zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction() (+59 more)

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.22
Nodes (12): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+4 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.09
Nodes (47): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+39 more)

### Community 173 - "holiday-list.ts"
Cohesion: 0.16
Nodes (16): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+8 more)

### Community 174 - "messages.ts"
Cohesion: 0.38
Nodes (5): cycleMessage(), dayFmt, NoticeKind, showDay(), Due

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 177 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 178 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 179 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 180 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 181 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (31): RFC-4180, GET(), safe(), yearWorksheet(), PayrollClient, buildEmployeeTemplate(), draftToTemplate(), initialDraft() (+23 more)

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 186 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "seed.ts"
Cohesion: 0.25
Nodes (8): DeadlineRule, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 201 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 202 - "db.test.ts"
Cohesion: 0.09
Nodes (10): outDir, pkgDir, require, { version }, api, ctx, fn, rows (+2 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1575 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `onboarding/page.tsx`, `returns/load.ts`, `notification-actions.tsx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `requireStaff`, `webhook.ts`, `module-pages.tsx`, `deadlines/page.tsx`, `react`, `registrations/forms.tsx`, `work/page.tsx`, `lock-bar.tsx`, `gap/page.tsx`, `invoice-pages.tsx`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/payroll.test.ts`, `Skeleton`, `@remixicon/react`, `ledger/data.ts`, `parties/[id]/page.tsx`, `cx`, `review/page.tsx`, `Notice`, `portal/reports/page.tsx`, `upload/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `tasks/page.tsx`, `tools/page.tsx`, `ledger/books.ts`, `ledger/types.ts`, `documents/actions.ts`, `requests/actions.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `queries.ts`, `leads/forms.tsx`, `batch/register.ts`, `Badge`, `transactions-actions.ts`, `parties/parties.test.ts`, `read.test.ts`, `return-file-actions.ts`, `BooksFrame`, `fixed-assets/page.tsx`, `review-form.tsx`, `clients/[id]/page.tsx`, `idle-watcher.tsx`, `filings/actions.ts`, `supabaseAdmin`, `notifications-view.tsx`, `package.json`, `blocks.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `deadlines/actions.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `app/requests/page.tsx`, `proposal-view.tsx`, `month-complete.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `registrations/[id]/page.tsx`, `requireOwner`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `register-xlsx.ts`, `site-document.tsx`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0761904761904762 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `ui.ts`, `fees/types.ts`, `devDependencies`, `onboarding/page.tsx`, `statements.ts`, `income.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `payroll/forms.tsx`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `requireStaff`, `webhook.ts`, `module-pages.tsx`, `deadlines/page.tsx`, `returns/types.ts`, `arap.ts`, `work/page.tsx`, `lock-bar.tsx`, `gap/page.tsx`, `invoice-pages.tsx`, `filings/run.ts`, `testing.ts`, `payroll/payroll.test.ts`, `@remixicon/react`, `review/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `upload/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `tasks/page.tsx`, `steps.test.ts`, `ledger/books.ts`, `ledger/types.ts`, `rates.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `december-rehearsal.test.ts`, `index.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `quote.ts`, `source.ts`, `layout.ts`, `batch/register.ts`, `parties/parties.test.ts`, `read.test.ts`, `return-file-actions.ts`, `notifications/format.ts`, `ocr/run.ts`, `fixed-assets/page.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `staff/page.tsx`, `review-form.tsx`, `idle-watcher.tsx`, `filings/actions.ts`, `safeguards.ts`, `supabaseAdmin`, `Centavos`, `package.json`, `blocks.tsx`, `lock.ts`, `ledger.test.ts`, `app/documents/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `engine.ts`, `register/page.tsx`, `books/periods.ts`, `requireOwner`, `app/settings/page.tsx`, `holiday-list.ts`, `messages.ts`, `acting-approver.test.ts`, `tests/register.test.ts`, `bir-filing-calendar/page.tsx`, `lead-attribution.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `tests/books.test.ts`, `digest.ts`, `db.test.ts`, `telegram-uploads.test.ts`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `onboarding/page.tsx`, `returns/load.ts`, `notification-actions.tsx`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `button.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `requireStaff`, `module-pages.tsx`, `deadlines/page.tsx`, `registrations/forms.tsx`, `work/page.tsx`, `lock-bar.tsx`, `gap/page.tsx`, `invoice-pages.tsx`, `quote/page.tsx`, `books/forms.tsx`, `payroll/payroll.test.ts`, `stat-cards.tsx`, `Skeleton`, `@remixicon/react`, `how-we-work/page.tsx`, `parties/[id]/page.tsx`, `cx`, `review/page.tsx`, `Notice`, `portal/reports/page.tsx`, `upload/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `tasks/page.tsx`, `tools/page.tsx`, `ledger/books.ts`, `combobox.tsx`, `documents/actions.ts`, `requests/actions.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `queries.ts`, `quote.ts`, `leads/forms.tsx`, `batch/register.ts`, `Badge`, `read.test.ts`, `social-button.tsx`, `BooksFrame`, `fixed-assets/page.tsx`, `notification-settings-view.tsx`, `supabaseServer`, `staff/page.tsx`, `review-form.tsx`, `clients/[id]/page.tsx`, `idle-watcher.tsx`, `filings/actions.ts`, `bell-store.ts`, `formatAmount`, `package.json`, `blocks.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `deadlines/actions.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `month-complete.tsx`, `register/page.tsx`, `registrations/[id]/page.tsx`, `requireOwner`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `site-document.tsx`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `ui.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07615018508725542 - nodes in this community are weakly interconnected._