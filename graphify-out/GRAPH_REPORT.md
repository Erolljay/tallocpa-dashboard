# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 938 files · ~762,512 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5809 nodes · 20562 edges · 199 communities (174 shown, 25 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 180 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `195867e3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- client
- migrate.yml
- LinkButton
- quote.ts
- work/page.tsx
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- react
- Sign-in & Setup Docs
- cx.ts
- Sign-off, Ledger & Payments
- package.json
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
- parts.ts
- button.tsx
- Badge
- payroll/forms.tsx
- modal.tsx
- marketing/page.tsx
- scripts
- supabaseAdmin
- quote/page.tsx
- requireStaff
- documents/labels.ts
- module-pages.tsx
- deadlines/page.tsx
- payroll/data.ts
- Badge
- money.ts
- Notice
- blocks.tsx
- arap.ts
- safeguards.ts
- year-end/page.tsx
- peso
- formatAmount
- Apple Design
- addDays
- form-1601c.ts
- registrations/forms.tsx
- parallel-run.tsx
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- dropdown.tsx
- stat-cards.tsx
- cycle/actions.ts
- theme-toggle.tsx
- pg
- filings/actions.ts
- how-we-work/page.tsx
- index.ts
- app/settings/page.tsx
- Pro components
- Textarea
- ledger/data.ts
- portal/reports/page.tsx
- ledger/types.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- proposal.ts
- getIdentity
- Recipes
- safeguards-load.ts
- BoardUI page patterns
- Pro templates
- fields.ts
- ledger/books.ts
- [id]/actions.ts
- combobox.tsx
- cycle/page.tsx
- boardui
- pending-review.tsx
- brand/forms.tsx
- filings/[id]/page.tsx
- cycle/page.tsx
- idle-watcher.tsx
- vitest
- Opening balances: checklist for any cut-off
- idle-watcher.tsx
- Card
- transactions-actions.ts
- [clientId]/page.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- move-bar.tsx
- month.ts
- Centavos
- safeguards.ts
- worksheet/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- draft.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- mime.ts
- status.ts
- binder/page.tsx
- fields.ts
- fixed-assets/page.tsx
- site-document.tsx
- supabaseServer
- ticked-allocation.test.ts
- review-form.tsx
- Building UIs with BoardUI
- staff/page.tsx
- formatAmount
- morning.ts
- month-complete.tsx
- ref_node_path
- register/page.tsx
- server-only
- ledger/types.ts
- proof-actions.ts
- booksContext
- (site)/page.tsx
- unlock-requests.tsx
- safeguards.ts
- workpapers/page.tsx
- notification-bell.tsx
- app/documents/page.tsx
- firm/parallel-run/page.tsx
- template.ts
- leads/[id]/page.tsx
- app/page.tsx
- proof-upload.tsx
- Rework: one flow from lead to year-end
- slots.ts
- proposal-view.tsx
- db.test.ts
- receipts.ts
- grid.ts
- opengraph-image.tsx
- filings/actions.ts
- lead-attribution.test.ts
- toCentavos
- seed.ts
- requireOwner
- BoardUI page patterns
- approval-memo.tsx
- acting-approver.test.ts
- layout.ts
- ref_node_fs
- eslint.config.mjs
- documents/period.ts
- money.ts
- register-xlsx.ts
- books-2307.test.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- tests/register.test.ts
- workpapers.test.ts
- funnel.test.ts
- leads-pipeline.test.ts
- portal-statements-approval.test.ts
- books-migration.test.ts
- tests/books.test.ts
- fees.test.ts
- adjustments.test.ts
- payroll-books.test.ts
- portal-reports.test.ts
- year-end.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 355 edges
2. `cx` - 300 edges
3. `react` - 268 edges
4. `Skeleton()` - 254 edges
5. `Notice()` - 251 edges
6. `next` - 229 edges
7. `Button()` - 224 edges
8. `Badge()` - 181 edges
9. `Card()` - 179 edges
10. `vitest` - 175 edges

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

## Communities (199 total, 25 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.10
Nodes (42): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print() (+34 more)

### Community 1 - "client"
Cohesion: 0.08
Nodes (13): BOOK_LOCK_FORMS, as(), client(), root, as(), purchase(), root, doc() (+5 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "LinkButton"
Cohesion: 0.08
Nodes (54): BooksContext, booksViewFor(), fmtMonth(), SearchParams, BooksFrame(), MonthSelect(), BooksSummaryPage(), Summary() (+46 more)

### Community 4 - "quote.ts"
Cohesion: 0.12
Nodes (24): ProposalSetup, JobOption, jobOptions(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, num() (+16 more)

### Community 5 - "work/page.tsx"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (31): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+23 more)

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

### Community 11 - "react"
Cohesion: 0.10
Nodes (26): react, setupMissingChartsAction(), setYearEndCheckAction(), TickForm(), SetupCharts(), NewParty(), NewPartyPage(), AddBranchForm() (+18 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx.ts"
Cohesion: 0.03
Nodes (89): NotificationFilterTabs(), NotificationRowData, AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps (+81 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "package.json"
Cohesion: 0.10
Nodes (20): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+12 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (44): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), PrintButton(), CASH_FLOW_CLASSES, defaultCashFlow() (+36 more)

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

### Community 40 - "ledger/data.ts"
Cohesion: 0.08
Nodes (47): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary() (+39 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (41): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+33 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (53): atcRows(), BookInvoiceRow, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC (+45 more)

### Community 43 - "parts.ts"
Cohesion: 0.11
Nodes (20): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+12 more)

### Community 44 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "Badge"
Cohesion: 0.08
Nodes (49): ClientList(), ClientsPage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey (+41 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (55): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+47 more)

### Community 47 - "modal.tsx"
Cohesion: 0.10
Nodes (35): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+27 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.11
Nodes (26): archiveLinkAction(), MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php (+18 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.12
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+25 more)

### Community 51 - "quote/page.tsx"
Cohesion: 0.16
Nodes (25): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+17 more)

### Community 52 - "requireStaff"
Cohesion: 0.06
Nodes (87): EmployerCard(), FilingRow, FilingListRow, RemittancesDue(), bookKind, BookRow, bookStatus, Event (+79 more)

### Community 53 - "documents/labels.ts"
Cohesion: 0.15
Nodes (30): GET(), Link, pageAttribution(), PreviewState, SERVICES, StartState, FUNNEL_BRAND, ATTR_COOKIE (+22 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.13
Nodes (24): BankAccountsRoute(), fmtDate(), BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), JournalEntryRoute() (+16 more)

### Community 55 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.15
Nodes (28): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Certificates2316, certificatesFromRaw(), loadEntries(), loadPriorEmployers() (+20 more)

### Community 57 - "Badge"
Cohesion: 0.05
Nodes (95): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+87 more)

### Community 58 - "money.ts"
Cohesion: 0.05
Nodes (80): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+72 more)

### Community 59 - "Notice"
Cohesion: 0.07
Nodes (90): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+82 more)

### Community 60 - "blocks.tsx"
Cohesion: 0.16
Nodes (19): TaxpayerType, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery() (+11 more)

### Community 61 - "arap.ts"
Cohesion: 0.15
Nodes (20): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+12 more)

### Community 62 - "safeguards.ts"
Cohesion: 0.09
Nodes (30): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+22 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.11
Nodes (32): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+24 more)

### Community 64 - "peso"
Cohesion: 0.13
Nodes (19): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+11 more)

### Community 65 - "formatAmount"
Cohesion: 0.11
Nodes (26): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE (+18 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "addDays"
Cohesion: 0.10
Nodes (46): Rule, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), toIso() (+38 more)

### Community 68 - "form-1601c.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "registrations/forms.tsx"
Cohesion: 0.08
Nodes (50): FormState, removeAssignmentAction(), ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient() (+42 more)

### Community 70 - "parallel-run.tsx"
Cohesion: 0.13
Nodes (26): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+18 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.11
Nodes (50): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+42 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (75): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+67 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "dropdown.tsx"
Cohesion: 0.18
Nodes (31): sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtResult, branchCode(), crlf(), csv() (+23 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "cycle/actions.ts"
Cohesion: 0.08
Nodes (39): CustomersRoute(), NewEntry(), NewEntryPage(), ReportsIndex(), PartyList(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage() (+31 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.07
Nodes (52): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+44 more)

### Community 79 - "pg"
Cohesion: 0.08
Nodes (8): pg, root, root, root, root, Row, root, root

### Community 80 - "filings/actions.ts"
Cohesion: 0.27
Nodes (13): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+5 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.11
Nodes (36): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+28 more)

### Community 82 - "index.ts"
Cohesion: 0.20
Nodes (12): acceptProposalAction(), AcceptState, QuerySource, InstantQuote, instantView(), brandSchedule(), contentHash(), instantQuote() (+4 more)

### Community 83 - "app/settings/page.tsx"
Cohesion: 0.26
Nodes (12): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote(), SettingsPage(), describeDue() (+4 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "Textarea"
Cohesion: 0.18
Nodes (19): PaymentSettings(), AddPaymentAccountForm(), ChannelFields(), ChannelValues, EditPaymentAccountForm(), MoveAccountButtons(), PaymentDaysForm(), ReplaceQrForm() (+11 more)

### Community 86 - "ledger/data.ts"
Cohesion: 0.10
Nodes (40): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+32 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (70): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+62 more)

### Community 88 - "ledger/types.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.19
Nodes (17): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote (+9 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (28): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+20 more)

### Community 93 - "proposal.ts"
Cohesion: 0.16
Nodes (23): assignReviewerAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), sendProposalAction(), setFunnelOpenAction() (+15 more)

### Community 94 - "getIdentity"
Cohesion: 0.25
Nodes (15): ReplyForm(), send(), getIdentity, shrinkImage(), assignRequestAction(), closeRequestAction(), createRequestAction(), openTicketAction() (+7 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "safeguards-load.ts"
Cohesion: 0.20
Nodes (14): SafeguardsNotice(), CoverageClient, coverageGaps(), Gap, GapKind, BoardRow, FilingRow, holidaySet() (+6 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "fields.ts"
Cohesion: 0.13
Nodes (21): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, normalizeAmount() (+13 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.05
Nodes (65): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+57 more)

### Community 101 - "[id]/actions.ts"
Cohesion: 0.22
Nodes (12): approveDocumentAction(), BatchRow, slpCategoryFromCodes(), BooksChoices, has(), Missing, missingForApproval(), missingMessage() (+4 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.04
Nodes (84): react-aria-components, KIND_LABEL, MATCH_BADGE, ReadItem, SheetPreview(), ChipColor, animateTag(), ComboBox() (+76 more)

### Community 103 - "cycle/page.tsx"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "pending-review.tsx"
Cohesion: 0.13
Nodes (25): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), BooksChoices(), Codes (+17 more)

### Community 106 - "brand/forms.tsx"
Cohesion: 0.19
Nodes (20): finishBrandUpload(), startBrandUpload(), BrandFileUpload(), upload(), FieldDef, FIELDS, pesoInput(), Result() (+12 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.17
Nodes (13): availableActions(), FilingState, isNilReturn(), SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner (+5 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (29): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+21 more)

### Community 109 - "idle-watcher.tsx"
Cohesion: 0.21
Nodes (18): ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS (+10 more)

### Community 110 - "vitest"
Cohesion: 0.04
Nodes (28): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+20 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "idle-watcher.tsx"
Cohesion: 0.09
Nodes (30): BrandSettingsState, refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, BRAND_FILES, BrandFileKind, birSchema (+22 more)

### Community 113 - "Card"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.05
Nodes (68): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+60 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (38): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+30 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.11
Nodes (36): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+28 more)

### Community 118 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 119 - "month.ts"
Cohesion: 0.09
Nodes (39): PriceRow, proposal(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+31 more)

### Community 120 - "Centavos"
Cohesion: 0.07
Nodes (46): BirLineKey, FinancialStatements, BookIncome, INCOME_GROUPS, NonDeductibleRow, withNonDeductible(), dayBefore(), FilingRow (+38 more)

### Community 121 - "safeguards.ts"
Cohesion: 0.18
Nodes (16): loadAssets(), Row, lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 122 - "worksheet/page.tsx"
Cohesion: 0.11
Nodes (14): vitest, dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate (+6 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (38): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+30 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.12
Nodes (30): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail(), PayNow(), credit() (+22 more)

### Community 126 - "draft.ts"
Cohesion: 0.09
Nodes (42): file(), GET(), safe(), BOOKED_TYPES, PayrollDocument(), applyColumnsAction(), done(), payrollDocument() (+34 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (49): mergePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), runOcr(), SKIP, datAddress() (+41 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (72): RFC-4180, geminiJson(), amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+64 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "mime.ts"
Cohesion: 0.09
Nodes (48): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+40 more)

### Community 131 - "status.ts"
Cohesion: 0.16
Nodes (19): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+11 more)

### Community 132 - "binder/page.tsx"
Cohesion: 0.42
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, monthsOf()

### Community 133 - "fields.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 136 - "supabaseServer"
Cohesion: 0.05
Nodes (69): nextConfig, next, addClientNoteAction(), NoteState, Detail(), StatementPage(), FilingTable(), markCwtFollowedUpAction() (+61 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "review-form.tsx"
Cohesion: 0.15
Nodes (13): Booking, DirectoryParty, ENTRY_STATUS, fmtDay(), fmtMonthOf(), ONLY_FOR, typeLabel, PendingTaxCodes (+5 more)

### Community 139 - "Building UIs with BoardUI"
Cohesion: 0.14
Nodes (20): SettingsPage(), SettingsRoute(), loadTaxCodes(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf() (+12 more)

### Community 140 - "staff/page.tsx"
Cohesion: 0.33
Nodes (9): FormState, inviteStaffAction(), BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList() (+1 more)

### Community 141 - "formatAmount"
Cohesion: 0.19
Nodes (17): Batch(), BatchPage(), one(), toCentavos(), Accreditation(), amount(), AmountRow(), DateCells() (+9 more)

### Community 142 - "morning.ts"
Cohesion: 0.13
Nodes (26): dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase (+18 more)

### Community 143 - "month-complete.tsx"
Cohesion: 0.24
Nodes (10): MonthComplete(), SentRow, TimelineRow, confirmMonthAction(), CycleState, decideExceptionAction(), refresh(), text() (+2 more)

### Community 144 - "ref_node_path"
Cohesion: 0.08
Nodes (8): outDir, pkgDir, require, { version }, root, root, root, root

### Community 145 - "register/page.tsx"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 146 - "server-only"
Cohesion: 0.12
Nodes (37): server-only, @supabase/supabase-js, GET(), GET(), GET(), generateFilingsNow(), generatePastFilingsAction(), runActingDigest() (+29 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.08
Nodes (38): Access, OpeningChecklist(), STATUS, Asset, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES (+30 more)

### Community 148 - "proof-actions.ts"
Cohesion: 0.29
Nodes (9): amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text(), TYPES (+1 more)

### Community 149 - "booksContext"
Cohesion: 0.47
Nodes (7): booksContext(), one(), Print(), Print2307Page(), Cwt2307TrackerPage(), Tracker(), CwtFollowUpForm()

### Community 150 - "(site)/page.tsx"
Cohesion: 0.05
Nodes (96): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+88 more)

### Community 151 - "unlock-requests.tsx"
Cohesion: 0.16
Nodes (16): easterSunday(), HolidayKind, HolidayRule, iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+8 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.15
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.04
Nodes (90): GET(), Content(), NotificationsPage(), Content(), NotificationSettingsPage(), Content(), PortalNotificationsPage(), Content() (+82 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (29): ApprovedReview(), ApprovedRow, DocumentReviewPage(), loadBooking(), Review(), ApprovedTable(), BOOKED_TYPES, ClientList() (+21 more)

### Community 156 - "firm/parallel-run/page.tsx"
Cohesion: 0.43
Nodes (6): CELL, FirmParallelRunPage(), monthShort(), Summary(), MonthStatus, loadFirmParallelRun()

### Community 157 - "template.ts"
Cohesion: 0.07
Nodes (34): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, jobField, ProposalJob (+26 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.06
Nodes (54): NotesCard(), ClientNoteForm(), FirmPage(), PLACES, Places(), REVIEWER_PLACES, bookingLinkAction(), reopenLeadAction() (+46 more)

### Community 159 - "app/page.tsx"
Cohesion: 0.12
Nodes (27): Queue(), ReviewPage(), Row, Section(), ActingState, appointActingAction(), endActingAction(), refresh() (+19 more)

### Community 160 - "proof-upload.tsx"
Cohesion: 0.48
Nodes (6): METHODS, ProofUpload(), send(), ProofState, startProofUpload(), submitProof()

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "slots.ts"
Cohesion: 0.26
Nodes (17): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+9 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.21
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 165 - "receipts.ts"
Cohesion: 0.22
Nodes (11): firmBlockLines(), formatTin(), cents(), CLIENT_MONEY_KINDS, FEE_KINDS, GrossReceiptsWatch, grossReceiptsWatch(), pesos() (+3 more)

### Community 166 - "grid.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "filings/actions.ts"
Cohesion: 0.11
Nodes (31): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+23 more)

### Community 169 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 170 - "toCentavos"
Cohesion: 0.09
Nodes (32): MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton() (+24 more)

### Community 171 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 172 - "requireOwner"
Cohesion: 0.06
Nodes (64): zod@^4.6.7, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), setIncomeTaxMethodAction() (+56 more)

### Community 173 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 174 - "approval-memo.tsx"
Cohesion: 0.14
Nodes (17): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, approvalMemo(), Memo, MemoInput (+9 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "layout.ts"
Cohesion: 0.09
Nodes (31): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+23 more)

### Community 177 - "ref_node_fs"
Cohesion: 0.08
Nodes (10): ctx, input, api, ctx, fn, rows, src, root (+2 more)

### Community 178 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 179 - "documents/period.ts"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 180 - "money.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 181 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (28): previewOf(), RegisterPreview, totals(), PayrollItem, CheckedRegister, checkRegister(), fmt(), ID_HEADERS (+20 more)

### Community 182 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "tests/register.test.ts"
Cohesion: 0.40
Nodes (4): DocumentRow, approved(), as(), root

### Community 186 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 187 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 188 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 190 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1528 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `form-2307.ts`, `LinkButton`, `work/page.tsx`, `onboarding/page.tsx`, `cx.ts`, `package.json`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `button.tsx`, `Badge`, `payroll/forms.tsx`, `modal.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `requireStaff`, `module-pages.tsx`, `deadlines/page.tsx`, `payroll/data.ts`, `Badge`, `Notice`, `year-end/page.tsx`, `peso`, `formatAmount`, `registrations/forms.tsx`, `parallel-run.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `cycle/actions.ts`, `theme-toggle.tsx`, `how-we-work/page.tsx`, `app/settings/page.tsx`, `Textarea`, `ledger/data.ts`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `getIdentity`, `ledger/books.ts`, `combobox.tsx`, `pending-review.tsx`, `brand/forms.tsx`, `cycle/page.tsx`, `idle-watcher.tsx`, `Card`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `move-bar.tsx`, `quote/page.tsx`, `draft.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `mime.ts`, `status.ts`, `binder/page.tsx`, `fixed-assets/page.tsx`, `site-document.tsx`, `supabaseServer`, `review-form.tsx`, `Building UIs with BoardUI`, `staff/page.tsx`, `formatAmount`, `morning.ts`, `month-complete.tsx`, `register/page.tsx`, `booksContext`, `(site)/page.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `firm/parallel-run/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `proof-upload.tsx`, `slots.ts`, `proposal-view.tsx`, `filings/actions.ts`, `toCentavos`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10482180293501048 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `LinkButton`, `work/page.tsx`, `onboarding/page.tsx`, `react`, `cx.ts`, `package.json`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `Badge`, `payroll/forms.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `requireStaff`, `documents/labels.ts`, `module-pages.tsx`, `deadlines/page.tsx`, `payroll/data.ts`, `Badge`, `Notice`, `year-end/page.tsx`, `peso`, `formatAmount`, `registrations/forms.tsx`, `parallel-run.tsx`, `books/forms.tsx`, `cycle/actions.ts`, `theme-toggle.tsx`, `filings/actions.ts`, `index.ts`, `app/settings/page.tsx`, `ledger/data.ts`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `proposal.ts`, `getIdentity`, `ledger/books.ts`, `[id]/actions.ts`, `pending-review.tsx`, `brand/forms.tsx`, `cycle/page.tsx`, `idle-watcher.tsx`, `idle-watcher.tsx`, `Card`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `move-bar.tsx`, `batch/register.ts`, `quote/page.tsx`, `draft.ts`, `parties/[id]/page.tsx`, `mime.ts`, `status.ts`, `binder/page.tsx`, `fixed-assets/page.tsx`, `site-document.tsx`, `review-form.tsx`, `formatAmount`, `morning.ts`, `month-complete.tsx`, `register/page.tsx`, `server-only`, `ledger/types.ts`, `proof-actions.ts`, `booksContext`, `(site)/page.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `firm/parallel-run/page.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `proof-upload.tsx`, `proposal-view.tsx`, `opengraph-image.tsx`, `filings/actions.ts`, `toCentavos`, `requireOwner`, `approval-memo.tsx`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.08307692307692308 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `worksheet/page.tsx` to `form-2307.ts`, `client`, `LinkButton`, `quote.ts`, `work/page.tsx`, `onboarding/page.tsx`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `Badge`, `supabaseAdmin`, `quote/page.tsx`, `requireStaff`, `documents/labels.ts`, `deadlines/page.tsx`, `Badge`, `money.ts`, `blocks.tsx`, `arap.ts`, `safeguards.ts`, `year-end/page.tsx`, `formatAmount`, `addDays`, `form-1601c.ts`, `registrations/forms.tsx`, `books/forms.tsx`, `payroll/payroll.test.ts`, `theme-toggle.tsx`, `pg`, `index.ts`, `app/settings/page.tsx`, `portal/reports/page.tsx`, `ledger/types.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `safeguards-load.ts`, `fields.ts`, `ledger/books.ts`, `[id]/actions.ts`, `cycle/page.tsx`, `pending-review.tsx`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `idle-watcher.tsx`, `vitest`, `Card`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `move-bar.tsx`, `month.ts`, `Centavos`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `mime.ts`, `status.ts`, `fields.ts`, `fixed-assets/page.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `Building UIs with BoardUI`, `ref_node_path`, `register/page.tsx`, `server-only`, `ledger/types.ts`, `(site)/page.tsx`, `unlock-requests.tsx`, `safeguards.ts`, `notification-bell.tsx`, `app/documents/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `slots.ts`, `db.test.ts`, `receipts.ts`, `grid.ts`, `lead-attribution.test.ts`, `toCentavos`, `requireOwner`, `approval-memo.tsx`, `acting-approver.test.ts`, `layout.ts`, `ref_node_fs`, `documents/period.ts`, `money.ts`, `books-2307.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `tests/register.test.ts`, `workpapers.test.ts`, `funnel.test.ts`, `leads-pipeline.test.ts`, `portal-statements-approval.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `fees.test.ts`, `adjustments.test.ts`, `payroll-books.test.ts`, `portal-reports.test.ts`, `year-end.test.ts`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._