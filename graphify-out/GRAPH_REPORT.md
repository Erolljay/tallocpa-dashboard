# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 931 files · ~751,273 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5754 nodes · 20360 edges · 190 communities (170 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 182 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `248d1a00`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- client
- migrate.yml
- ui.ts
- fees/types.ts
- devDependencies
- clients/[id]/page.tsx
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
- cwt-tracker.ts
- scores/page.tsx
- compare.ts
- payroll/types.ts
- button.tsx
- server.ts
- payroll/forms.tsx
- modal.tsx
- requireStaff
- scripts
- slots.ts
- fees/[id]/page.tsx
- Badge
- marketing/attribution.ts
- Skeleton
- input.tsx
- rows.ts
- registrations/forms.tsx
- returns/types.ts
- Notice
- params.ts
- arap.ts
- safeguards.ts
- year-end/page.tsx
- missing-2307/page.tsx
- LinkButton
- Apple Design
- filings/run.ts
- vitest
- clients/actions.ts
- registrations/[id]/page.tsx
- books/forms.tsx
- year.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- settlement-pages.tsx
- @remixicon/react
- notes.ts
- filings/actions.ts
- how-we-work/page.tsx
- public.ts
- filed-returns.ts
- Pro components
- notification-actions.tsx
- ledger/data.ts
- portal/reports/page.tsx
- portal-billing.test.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/actions.ts
- supabaseServer
- Recipes
- Centavos
- BoardUI theming reference
- Pro templates
- fields.ts
- print.ts
- addDays
- select.tsx
- compute.ts
- boardui
- pending-review.tsx
- brand/forms.tsx
- sign-off.ts
- cycle/actions.ts
- social-button.tsx
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- lib/books/actions.ts
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- parties/format.ts
- quote.ts
- returns/load.ts
- work/page.tsx
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- documents/[id]/page.tsx
- ocr/run.ts
- read.test.ts
- opening.ts
- return-file-actions.ts
- money.ts
- binder/page.tsx
- gemini.ts
- fixed-assets/page.tsx
- site-document.tsx
- react
- ticked-allocation.test.ts
- buildSawt
- tax-codes.ts
- queries.ts
- batch/page.tsx
- quote/page.tsx
- notifications/format.ts
- ref_node_fs
- formatAmount
- supabaseAdmin
- ledger/types.ts
- billing/page.tsx
- package.json
- blocks.tsx
- settings/actions.ts
- ledger.test.ts
- workpapers/page.tsx
- notification-settings-view.tsx
- app/documents/page.tsx
- steps.ts
- template.ts
- leads/[id]/page.tsx
- app/page.tsx
- bell-store.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal.ts
- portal/requests/page.tsx
- receipts.ts
- tieouts.test.ts
- opengraph-image.tsx
- documents/labels.ts
- notifications-view.tsx
- payroll/data.ts
- seed.ts
- requireOwner
- BoardUI page patterns
- review.ts
- acting-approver.test.ts
- layout.ts
- generate-qap-fixture.mjs
- eslint.config.mjs
- fixed-assets.test.ts
- parallel-run.test.ts
- payroll/payroll.test.ts
- books-2307.test.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- month-complete.test.ts
- workpapers.test.ts
- @types/react@^19
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 355 edges
2. `cx` - 294 edges
3. `react` - 266 edges
4. `Skeleton()` - 254 edges
5. `Notice()` - 251 edges
6. `next` - 229 edges
7. `Button()` - 223 edges
8. `Badge()` - 181 edges
9. `Card()` - 179 edges
10. `vitest` - 173 edges

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

## Communities (190 total, 20 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (55): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page() (+47 more)

### Community 1 - "client"
Cohesion: 0.07
Nodes (20): BOOK_LOCK_FORMS, as(), client(), root, approved(), as(), root, approved() (+12 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.11
Nodes (27): BooksSummaryPage(), Summary(), SummaryCard(), TransactionJournal(), taxOn(), BOOKS_MODULES, BooksModule, booksMonth() (+19 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.09
Nodes (37): zod, ProposalSetup, dateFmt, statusLabel, statusTone, Supabase, JobOption, QuoteInput (+29 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "clients/[id]/page.tsx"
Cohesion: 0.09
Nodes (40): removeAssignmentAction(), setIncomeTaxMethodAction(), AssignForm(), ClientUserForm(), IncomeTaxMethodForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton() (+32 more)

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
Cohesion: 0.26
Nodes (15): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), BellAudience (+7 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.03
Nodes (88): react-dom@19.3.0, react-dom, ClientTab, UNDER, AvatarColor, AvatarProps, AvatarSize, styles (+80 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, next@16.4.6, react@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1, @supabase/supabase-js@^2.119.2 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (34): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), statementsFrom(), isFsLine(), add(), buildStatements(), classOf() (+26 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (70): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+62 more)

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
Cohesion: 0.09
Nodes (37): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+29 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (64): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+56 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "server.ts"
Cohesion: 0.08
Nodes (48): RequestDetail(), RequestPage(), registrationSteps(), STEP_STATUS, TaskRow, TasksPage(), View, VIEWS (+40 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (53): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+45 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

### Community 48 - "requireStaff"
Cohesion: 0.12
Nodes (38): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), Rematch2307Button(), DueDateForm(), EmployerNumberForm(), HandlesContributionsSwitch() (+30 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.12
Nodes (31): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+23 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.15
Nodes (26): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+18 more)

### Community 52 - "Badge"
Cohesion: 0.05
Nodes (104): ClientTabs(), DocumentsCard(), EmployerCard(), ClientReturnsPage(), FilingRow, Returns(), Cycle(), FilingListRow (+96 more)

### Community 53 - "marketing/attribution.ts"
Cohesion: 0.22
Nodes (22): GET(), Link, ATTR_COOKIE, ATTR_COOKIE_MAX_AGE, cleanText(), first(), firstTouch(), fromPage() (+14 more)

### Community 54 - "Skeleton"
Cohesion: 0.11
Nodes (44): BankAccountsRoute(), booksContext(), fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList() (+36 more)

### Community 55 - "input.tsx"
Cohesion: 0.11
Nodes (27): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+19 more)

### Community 56 - "rows.ts"
Cohesion: 0.10
Nodes (35): AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+27 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.09
Nodes (33): ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+25 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (79): FinancialStatements, client, form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+71 more)

### Community 59 - "Notice"
Cohesion: 0.07
Nodes (97): BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), EntryForm(), OpeningUpload(), ReleaseReportForm() (+89 more)

### Community 60 - "params.ts"
Cohesion: 0.26
Nodes (11): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+3 more)

### Community 61 - "arap.ts"
Cohesion: 0.16
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 62 - "safeguards.ts"
Cohesion: 0.09
Nodes (40): StepProgress(), board, MARCO, none, RHEA, row(), steps, documentCutoff() (+32 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.07
Nodes (55): CloseYearForm(), BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage() (+47 more)

### Community 64 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 65 - "LinkButton"
Cohesion: 0.08
Nodes (36): Column, ListRow, RowLink(), INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props (+28 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.14
Nodes (26): Rule, IsoDate, DeadlineRule, DueRule, EfpsGroup, FilingChannel, Frequency, PeriodFilter (+18 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (19): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "clients/actions.ts"
Cohesion: 0.07
Nodes (49): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setupMissingChartsAction(), updateClientAction(), ClientForm() (+41 more)

### Community 70 - "registrations/[id]/page.tsx"
Cohesion: 0.17
Nodes (25): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+17 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (43): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+35 more)

### Community 72 - "year.ts"
Cohesion: 0.10
Nodes (35): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+27 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.15
Nodes (36): SaleSplit, sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtResult, branchCode(), crlf() (+28 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "settlement-pages.tsx"
Cohesion: 0.10
Nodes (32): PaymentsNewPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), ReceiptsViewPage(), fmt(), OpenInvoice (+24 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.08
Nodes (45): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+37 more)

### Community 79 - "notes.ts"
Cohesion: 0.11
Nodes (21): ICON, when, inquiryAnswers(), NoteEntry, noteEntry(), NoteRow, NoteSource, notesTimeline() (+13 more)

### Community 80 - "filings/actions.ts"
Cohesion: 0.14
Nodes (23): advanceFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom(), worksheetTaxDue() (+15 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (35): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+27 more)

### Community 82 - "public.ts"
Cohesion: 0.16
Nodes (18): pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES, StartState, InstantQuote (+10 more)

### Community 83 - "filed-returns.ts"
Cohesion: 0.15
Nodes (16): describeDue(), FREQUENCY_SECTIONS, ordinal(), periodWord, TAX_TYPE_GROUPS, taxTypeOfForm(), FiledFileRow, FiledReturn (+8 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification-actions.tsx"
Cohesion: 0.16
Nodes (17): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+9 more)

### Community 86 - "ledger/data.ts"
Cohesion: 0.11
Nodes (37): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton() (+29 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.09
Nodes (62): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+54 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.15
Nodes (21): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+13 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (23): AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY, pickAttribution() (+15 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (28): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+20 more)

### Community 93 - "leads/actions.ts"
Cohesion: 0.23
Nodes (17): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), convertLeadAction(), LeadState, markLostAction() (+9 more)

### Community 94 - "supabaseServer"
Cohesion: 0.07
Nodes (49): file(), amendFilingAction(), FilingsTabsFor(), GET(), GET(), GET(), acceptProposalAction(), AcceptState (+41 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "Centavos"
Cohesion: 0.07
Nodes (34): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BOOK_ABBR, BookEntry, BookLine (+26 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "fields.ts"
Cohesion: 0.07
Nodes (43): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), BatchRow (+35 more)

### Community 100 - "print.ts"
Cohesion: 0.08
Nodes (35): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_TITLES, BookKind (+27 more)

### Community 101 - "addDays"
Cohesion: 0.15
Nodes (29): shift(), addDays(), addMonths(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso() (+21 more)

### Community 102 - "select.tsx"
Cohesion: 0.08
Nodes (35): BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup() (+27 more)

### Community 103 - "compute.ts"
Cohesion: 0.14
Nodes (31): annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation(), monthlyTable() (+23 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "pending-review.tsx"
Cohesion: 0.13
Nodes (26): blankLine(), InvoiceForm(), InvoiceFormValue, Booking, BookingFields(), BooksChoices(), Codes, initialCodes() (+18 more)

### Community 106 - "brand/forms.tsx"
Cohesion: 0.14
Nodes (22): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+14 more)

### Community 107 - "sign-off.ts"
Cohesion: 0.11
Nodes (16): Row, QueueFiling, QueueViewer, ReviewQueue, ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS (+8 more)

### Community 108 - "cycle/actions.ts"
Cohesion: 0.13
Nodes (22): MonthComplete(), SentRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction() (+14 more)

### Community 109 - "social-button.tsx"
Cohesion: 0.06
Nodes (48): GET(), GET(), POST(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+40 more)

### Community 110 - "index.ts"
Cohesion: 0.03
Nodes (33): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+25 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.14
Nodes (19): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+11 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (45): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+37 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (41): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+33 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.07
Nodes (65): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+57 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (37): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+29 more)

### Community 118 - "parties/format.ts"
Cohesion: 0.16
Nodes (18): datAddress(), displayName(), fullAddress(), listNameCols(), Names, PARTY_SOURCES, PartyKind, PartySource (+10 more)

### Community 119 - "quote.ts"
Cohesion: 0.12
Nodes (28): PriceRow, buildQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem, EWT_NOTE, feeTax() (+20 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.08
Nodes (43): loadAssets(), newDocs(), oldDocs(), Party, row(), withNonDeductible(), dayBefore(), FilingRow (+35 more)

### Community 121 - "work/page.tsx"
Cohesion: 0.17
Nodes (19): Action(), MyWork(), MyWorkPage(), short(), TONE, lastMonth(), loadMyWork(), MyWork (+11 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.10
Nodes (33): GET(), safe(), loadAccounts(), loadBatchContext(), monthsBetween(), accountLabel(), BATCH_COLUMNS, BatchAccount (+25 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.14
Nodes (20): Detail(), PayNow(), credit(), ItemList(), proofMethod, VerifiedItems(), statusBadge, FirmBlock (+12 more)

### Community 126 - "documents/[id]/page.tsx"
Cohesion: 0.07
Nodes (52): BOOKED_TYPES, PayrollDocument(), applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap() (+44 more)

### Community 127 - "ocr/run.ts"
Cohesion: 0.15
Nodes (24): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP (+16 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (78): RFC-4180, SPREADSHEET_TYPES, geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf() (+70 more)

### Community 129 - "opening.ts"
Cohesion: 0.14
Nodes (19): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+11 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (51): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+43 more)

### Community 131 - "money.ts"
Cohesion: 0.20
Nodes (15): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+7 more)

### Community 132 - "binder/page.tsx"
Cohesion: 0.22
Nodes (13): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, metadata (+5 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (19): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+11 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.12
Nodes (14): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), SiteNotFound(), geist (+6 more)

### Community 136 - "react"
Cohesion: 0.04
Nodes (71): nextConfig, next, react, addClientNoteAction(), NoteState, NewEmployee(), NewEmployeePage(), postPayrollAction() (+63 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "buildSawt"
Cohesion: 0.21
Nodes (15): qapBuckets(), sawtBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo() (+7 more)

### Community 139 - "tax-codes.ts"
Cohesion: 0.20
Nodes (14): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+6 more)

### Community 140 - "queries.ts"
Cohesion: 0.19
Nodes (14): GET(), isNotificationKind(), BELL_LIMIT, BellData, bellData, bellDataFor, emailOffKinds(), emailPreferences() (+6 more)

### Community 141 - "batch/page.tsx"
Cohesion: 0.25
Nodes (12): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+4 more)

### Community 142 - "quote/page.tsx"
Cohesion: 0.14
Nodes (25): loadSchedules(), loadTaxOnFee(), longDate(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines() (+17 more)

### Community 143 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 144 - "ref_node_fs"
Cohesion: 0.03
Nodes (36): pg, outDir, pkgDir, require, { version }, dir, ctx, input (+28 more)

### Community 145 - "formatAmount"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 146 - "supabaseAdmin"
Cohesion: 0.13
Nodes (34): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+26 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.09
Nodes (31): Accounts(), AccountsPage(), GROUPS, AccountForm(), Access, STATUS, codes, PNL (+23 more)

### Community 148 - "billing/page.tsx"
Cohesion: 0.32
Nodes (11): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), PaymentsList() (+3 more)

### Community 149 - "package.json"
Cohesion: 0.18
Nodes (10): motion@^12.43.0, @supabase/ssr@^0.12.7, @tailwindcss/turbopack@4.3.3, name, packageManager, private, version, motion (+2 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (98): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+90 more)

### Community 151 - "settings/actions.ts"
Cohesion: 0.13
Nodes (22): addHolidayAction(), fieldErrors(), refreshAfterChange(), RuleRow, SettingsState, updateRuleAction(), easterSunday(), HolidayKind (+14 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 154 - "notification-settings-view.tsx"
Cohesion: 0.20
Nodes (14): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor() (+6 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (46): ApprovedReview(), ApprovedRow, ClientSelect(), loadBooking(), moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction() (+38 more)

### Community 156 - "steps.ts"
Cohesion: 0.13
Nodes (23): Agency, birForm(), BranchOptions, CaseStep, ClosureOptions, dayNumber(), daysBetween(), daysOpen() (+15 more)

### Community 157 - "template.ts"
Cohesion: 0.11
Nodes (19): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+11 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.05
Nodes (61): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+53 more)

### Community 159 - "app/page.tsx"
Cohesion: 0.13
Nodes (30): FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), ActingState (+22 more)

### Community 160 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (17): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+9 more)

### Community 163 - "proposal.ts"
Cohesion: 0.08
Nodes (37): jobName(), lineName(), longDate(), money(), php, ProposalData, ProposalView(), Rows() (+29 more)

### Community 164 - "portal/requests/page.tsx"
Cohesion: 0.25
Nodes (11): Row, PortalRequests(), Requests(), Row, when(), Direction, REQUEST_FILE_MAX, REQUEST_FILE_TYPES (+3 more)

### Community 165 - "receipts.ts"
Cohesion: 0.22
Nodes (11): firmBlockLines(), formatTin(), cents(), CLIENT_MONEY_KINDS, FEE_KINDS, GrossReceiptsWatch, grossReceiptsWatch(), pesos() (+3 more)

### Community 166 - "tieouts.test.ts"
Cohesion: 0.17
Nodes (8): RegisterRow, base, books, buy, sale, approved(), as(), root

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "documents/labels.ts"
Cohesion: 0.11
Nodes (27): Doc, when(), ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS (+19 more)

### Community 169 - "notifications-view.tsx"
Cohesion: 0.25
Nodes (13): Content(), PortalNotificationsPage(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one() (+5 more)

### Community 170 - "payroll/data.ts"
Cohesion: 0.11
Nodes (38): EmployeeDetail(), EmployeePage(), GET(), safe(), Release2316Form(), PayrollMonth(), PayrollMonthPage(), when() (+30 more)

### Community 171 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 172 - "requireOwner"
Cohesion: 0.08
Nodes (48): setClientStatusAction(), generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), cancelRegistrationAction(), addHolidayYearAction(), removeHolidayAction() (+40 more)

### Community 173 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 174 - "review.ts"
Cohesion: 0.36
Nodes (6): ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), SIGNED_REFS, quiet

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "layout.ts"
Cohesion: 0.09
Nodes (32): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, showDay() (+24 more)

### Community 177 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 178 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 179 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 180 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 181 - "payroll/payroll.test.ts"
Cohesion: 0.12
Nodes (29): DEFAULT_ITEMS, employee(), entry(), fixtureContext(), ITEMS, P(), pay(), checkRegister() (+21 more)

### Community 182 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 186 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1516 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `react` to `form-2307.ts`, `ui.ts`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `cx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `server.ts`, `payroll/forms.tsx`, `requireStaff`, `slots.ts`, `fees/[id]/page.tsx`, `Badge`, `marketing/attribution.ts`, `Skeleton`, `registrations/forms.tsx`, `Notice`, `year-end/page.tsx`, `missing-2307/page.tsx`, `LinkButton`, `clients/actions.ts`, `registrations/[id]/page.tsx`, `books/forms.tsx`, `settlement-pages.tsx`, `@remixicon/react`, `filings/actions.ts`, `public.ts`, `notification-actions.tsx`, `ledger/data.ts`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `leads/actions.ts`, `supabaseServer`, `fields.ts`, `print.ts`, `select.tsx`, `pending-review.tsx`, `brand/forms.tsx`, `cycle/actions.ts`, `social-button.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `work/page.tsx`, `batch/register.ts`, `statement.ts`, `documents/[id]/page.tsx`, `ocr/run.ts`, `return-file-actions.ts`, `money.ts`, `binder/page.tsx`, `fixed-assets/page.tsx`, `site-document.tsx`, `queries.ts`, `batch/page.tsx`, `quote/page.tsx`, `formatAmount`, `supabaseAdmin`, `ledger/types.ts`, `billing/page.tsx`, `package.json`, `blocks.tsx`, `settings/actions.ts`, `workpapers/page.tsx`, `app/documents/page.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `portal/requests/page.tsx`, `opengraph-image.tsx`, `documents/labels.ts`, `notifications-view.tsx`, `payroll/data.ts`, `requireOwner`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07800511508951406 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `client`, `ui.ts`, `fees/types.ts`, `devDependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `server.ts`, `slots.ts`, `fees/[id]/page.tsx`, `Badge`, `marketing/attribution.ts`, `rows.ts`, `registrations/forms.tsx`, `returns/types.ts`, `params.ts`, `arap.ts`, `safeguards.ts`, `year-end/page.tsx`, `LinkButton`, `filings/run.ts`, `clients/actions.ts`, `@remixicon/react`, `notes.ts`, `filings/actions.ts`, `public.ts`, `filed-returns.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `fields.ts`, `print.ts`, `addDays`, `compute.ts`, `sign-off.ts`, `cycle/actions.ts`, `social-button.tsx`, `index.ts`, `portal/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `quote.ts`, `returns/load.ts`, `work/page.tsx`, `batch/register.ts`, `documents/[id]/page.tsx`, `ocr/run.ts`, `read.test.ts`, `opening.ts`, `return-file-actions.ts`, `money.ts`, `gemini.ts`, `fixed-assets/page.tsx`, `ticked-allocation.test.ts`, `tax-codes.ts`, `notifications/format.ts`, `ref_node_fs`, `formatAmount`, `supabaseAdmin`, `ledger/types.ts`, `package.json`, `blocks.tsx`, `settings/actions.ts`, `ledger.test.ts`, `app/documents/page.tsx`, `steps.ts`, `template.ts`, `app/page.tsx`, `calendar/page.tsx`, `proposal.ts`, `portal/requests/page.tsx`, `receipts.ts`, `tieouts.test.ts`, `review.ts`, `acting-approver.test.ts`, `layout.ts`, `fixed-assets.test.ts`, `parallel-run.test.ts`, `payroll/payroll.test.ts`, `books-2307.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `month-complete.test.ts`, `workpapers.test.ts`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.07056451612903226 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `cx`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `button.tsx`, `server.ts`, `payroll/forms.tsx`, `modal.tsx`, `requireStaff`, `slots.ts`, `fees/[id]/page.tsx`, `Badge`, `Skeleton`, `input.tsx`, `registrations/forms.tsx`, `Notice`, `year-end/page.tsx`, `missing-2307/page.tsx`, `LinkButton`, `clients/actions.ts`, `registrations/[id]/page.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `settlement-pages.tsx`, `@remixicon/react`, `how-we-work/page.tsx`, `notification-actions.tsx`, `ledger/data.ts`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `leads/actions.ts`, `supabaseServer`, `print.ts`, `select.tsx`, `pending-review.tsx`, `brand/forms.tsx`, `cycle/actions.ts`, `social-button.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `work/page.tsx`, `statement.ts`, `documents/[id]/page.tsx`, `return-file-actions.ts`, `money.ts`, `binder/page.tsx`, `fixed-assets/page.tsx`, `site-document.tsx`, `queries.ts`, `batch/page.tsx`, `quote/page.tsx`, `formatAmount`, `ledger/types.ts`, `billing/page.tsx`, `package.json`, `blocks.tsx`, `workpapers/page.tsx`, `notification-settings-view.tsx`, `app/documents/page.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `bell-store.ts`, `calendar/page.tsx`, `proposal.ts`, `portal/requests/page.tsx`, `documents/labels.ts`, `notifications-view.tsx`, `payroll/data.ts`, `requireOwner`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._