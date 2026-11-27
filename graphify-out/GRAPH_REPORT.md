# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1019 files · ~852,831 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6248 nodes · 22286 edges · 187 communities (167 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `471c5c50`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- Review
- package.json
- zod
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- module-pages.tsx
- Sign-in & Setup Docs
- Badge
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
- clients/[id]/page.tsx
- returns/types.ts
- invoice-pages.tsx
- register-xlsx.ts
- modal.tsx
- next
- scripts
- supabaseAdmin
- button.tsx
- remittances/[id]/page.tsx
- webhook.ts
- quote.ts
- binder/page.tsx
- registrations/[id]/page.tsx
- proposal-view.tsx
- returns/load.ts
- steps.ts
- app/requests/[id]/page.tsx
- opening.ts
- year-end/page.tsx
- lib/books/actions.ts
- report-periods.ts
- marketing/page.tsx
- Apple Design
- filings/run.ts
- testing.ts
- template.ts
- Centavos
- books/forms.tsx
- fixed-assets/page.tsx
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- clients/[id]/page.tsx
- Card
- documents/labels.ts
- parties/[id]/page.tsx
- how-we-work/page.tsx
- auth.ts
- cx.ts
- Pro components
- remittances/forms.tsx
- Notice
- portalContext
- portal-billing.test.ts
- board.ts
- document-scanner.tsx
- [slug]/page.tsx
- LinkButton
- memo.ts
- work/page.tsx
- Recipes
- payroll/data.ts
- BoardUI theming reference
- Pro templates
- calendar/page.tsx
- Centavos
- ledger/data.ts
- cx
- opening-checklist.tsx
- boardui
- leads/actions.ts
- cwt-tracker-view.tsx
- review-forms.tsx
- tieouts.test.ts
- documents/[id]/page.tsx
- app/page.tsx
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- sign-off-actions.tsx
- settings/actions.ts
- filings/actions.ts
- apply-migrations.sh
- manilaToday
- layout.ts
- cancel-server.ts
- leads/[id]/page.tsx
- FormModule
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- auth.ts
- addDays
- holiday-list.ts
- read.test.ts
- worksheet/page.tsx
- return-file-actions.ts
- app/settings/page.tsx
- react
- catch-up-forms.tsx
- fees/forms.tsx
- blocks.tsx
- client-form.tsx
- ticked-allocation.test.ts
- post-button.tsx
- work/load.ts
- workpapers/load.ts
- payroll/forms.tsx
- Building UIs with BoardUI
- deadlines/page.tsx
- messages.ts
- payroll/types.ts
- morning.ts
- @remixicon/react
- proposal/[token]/actions.ts
- split-bundled-pdfs.test.ts
- social-button.tsx
- move-bar.tsx
- server-only
- onboarding/page.tsx
- next
- Rework: one flow from lead to year-end
- calendar/staff.ts
- site-document.tsx
- collections/forms.tsx
- register/page.tsx
- opengraph-image.tsx
- Textarea
- arap.ts
- gemini.ts
- supabaseServer
- cycle/page.tsx
- notification-bell.tsx
- acting-approver.test.ts
- fields.ts
- tests/register.test.ts
- @supabase/ssr
- @techstark/opencv-js
- formatAmount
- filed-returns.ts
- rates.ts
- sign-off.ts
- [clientId]/[year]/page.tsx
- vitest
- eslint.config.mjs
- books/periods.ts
- deadlines/actions.ts
- filings/[id]/page.tsx
- review-form.tsx
- templates/README.md
- money.ts
- seed.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 399 edges
2. `cx` - 313 edges
3. `react` - 283 edges
4. `Notice()` - 272 edges
5. `Skeleton()` - 258 edges
6. `Button()` - 250 edges
7. `next` - 245 edges
8. `vitest` - 196 edges
9. `Badge()` - 187 edges
10. `Card()` - 187 edges

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

## Communities (187 total, 20 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (51): booksContext(), BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff() (+43 more)

### Community 1 - "index.ts"
Cohesion: 0.02
Nodes (56): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+48 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.05
Nodes (61): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), SummaryCard(), TransactionJournal(), SegmentedControl(), SegmentedControlItem() (+53 more)

### Community 4 - "Review"
Cohesion: 0.09
Nodes (39): DocReviewActions(), DocumentsCard(), when(), addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice() (+31 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "zod"
Cohesion: 0.10
Nodes (25): zod, send(), amount, date, refresh(), rejectProofAction(), StartProof, startProofUpload() (+17 more)

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

### Community 11 - "module-pages.tsx"
Cohesion: 0.10
Nodes (36): BankAccountsRoute(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+28 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "Badge"
Cohesion: 0.11
Nodes (44): ClientList(), ClientsPage(), SORTS, STATUS_GROUPS, Contacts(), ContactsPage(), SORTS, when (+36 more)

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
Cohesion: 0.09
Nodes (37): FinancialStatementsView(), StatementTable(), statementsFrom(), FsLineKey, Section, add(), buildStatements(), classOf() (+29 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (58): BIR_LINES, BirLineKey, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701() (+50 more)

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
Nodes (43): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), Rematch2307Button(), CwtActionState, markCwtFollowedUp() (+35 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (37): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+29 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (69): CELL, FirmParallelRunPage(), monthShort(), Summary(), KIND, REASON, Section(), shortDate() (+61 more)

### Community 43 - "clients/[id]/page.tsx"
Cohesion: 0.30
Nodes (12): Content(), NotificationSettingsPage(), TelegramLinkButton(), TelegramUnlinkButton(), AnchorButton(), TelegramEnv, telegramEnv(), LinkState (+4 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.07
Nodes (53): tin9(), tinDashed(), client, row(), VatData, payslipSchedule(), agentBackground(), agentErrors() (+45 more)

### Community 45 - "invoice-pages.tsx"
Cohesion: 0.12
Nodes (22): INVOICE_KINDS, InvoiceEdit(), InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage() (+14 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.21
Nodes (13): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+5 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (46): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), SearchHit, SearchKind (+38 more)

### Community 48 - "next"
Cohesion: 0.12
Nodes (28): nextConfig, next, addClientNoteAction(), GET(), globalSearch(), UnlockRequests(), when(), ClientOption (+20 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.11
Nodes (38): GET(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book() (+30 more)

### Community 51 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.12
Nodes (36): EmployerCard(), RemittancesDue(), MonthRemittances(), GET(), ListRow, ORDER, Remittance(), RemittancePage() (+28 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (46): maxDuration, POST(), runOcr(), TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked() (+38 more)

### Community 54 - "quote.ts"
Cohesion: 0.06
Nodes (61): PriceRow, corp, items, proposal(), EstimatedProfile, estimateProfile(), gapFor(), has() (+53 more)

### Community 55 - "binder/page.tsx"
Cohesion: 0.38
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, PrintButton()

### Community 56 - "registrations/[id]/page.tsx"
Cohesion: 0.12
Nodes (35): addStepFile(), removeStepFile(), startStepFileUpload(), CompleteButton(), StepBadge(), StepRow, caseStatus, CertificateDetails (+27 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.20
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.07
Nodes (51): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, DatFiles, datFiles(), Db, isDatKind(), oldDocs() (+43 more)

### Community 59 - "steps.ts"
Cohesion: 0.04
Nodes (84): ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openYearRenewalsAction(), PROOF_TYPES, updateStepAction() (+76 more)

### Community 60 - "app/requests/[id]/page.tsx"
Cohesion: 0.14
Nodes (24): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+16 more)

### Community 61 - "opening.ts"
Cohesion: 0.14
Nodes (20): exceljs, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+12 more)

### Community 62 - "year-end/page.tsx"
Cohesion: 0.07
Nodes (49): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+41 more)

### Community 63 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (40): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+32 more)

### Community 64 - "report-periods.ts"
Cohesion: 0.29
Nodes (14): basePeriod(), HeldNote(), holdsWhat(), BooksYear, booksYears(), iso(), monthEnd(), monthsOfReport() (+6 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (64): ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable(), FirmMarketingPage() (+56 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.10
Nodes (45): Rule, PlannedObligation, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), DeadlineRule (+37 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "template.ts"
Cohesion: 0.07
Nodes (44): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+36 more)

### Community 70 - "Centavos"
Cohesion: 0.05
Nodes (97): GridRow, FinancialStatements, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat() (+89 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.11
Nodes (52): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+44 more)

### Community 72 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.09
Nodes (57): SaleSplit, annualAttachments(), incomeAttachments(), Periods, periods(), inputsFor(), buildSawt(), incomePayment() (+49 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "clients/[id]/page.tsx"
Cohesion: 0.16
Nodes (22): StaffOptions(), AssignForm(), CatchUpForm(), ClientUserForm(), EngagementForm(), IncomeTaxMethodForm(), RemoveAssignmentButton(), RemoveClientUserButton() (+14 more)

### Community 78 - "Card"
Cohesion: 0.13
Nodes (21): ClientTab, ClientTabs(), UNDER, NewEmployee(), ClientReturnsPage(), Returns(), PayrollPending(), NewParty() (+13 more)

### Community 79 - "documents/labels.ts"
Cohesion: 0.12
Nodes (23): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+15 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (56): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), fmtDate(), PartyPage(), REREAD_APPROVED (+48 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "auth.ts"
Cohesion: 0.14
Nodes (19): AuditRow, Contact(), ContactPage(), day, when, SwitcherBusiness, Identity, IdentityRow (+11 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (65): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+57 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "remittances/forms.tsx"
Cohesion: 0.23
Nodes (22): HandlesContributionsSwitch(), RemittanceButton(), RemittanceFileUpload(), send(), addRemittanceFile(), approveRemittanceAction(), generateRemittancesAction(), prepareRemittanceAction() (+14 more)

### Community 86 - "Notice"
Cohesion: 0.07
Nodes (89): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm() (+81 more)

### Community 87 - "portalContext"
Cohesion: 0.12
Nodes (33): ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, PortalClient, portalContext, Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+25 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "board.ts"
Cohesion: 0.15
Nodes (27): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "[slug]/page.tsx"
Cohesion: 0.10
Nodes (30): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+22 more)

### Community 92 - "LinkButton"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "memo.ts"
Cohesion: 0.22
Nodes (11): amt(), ApprovalMemo(), Db, TIE, approvalMemo(), Memo, MemoInput, MemoMonth (+3 more)

### Community 94 - "work/page.tsx"
Cohesion: 0.13
Nodes (30): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+22 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.14
Nodes (28): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), Certificates2316 (+20 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (19): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), Interval, manilaInstant(), appBookedEvents() (+11 more)

### Community 100 - "Centavos"
Cohesion: 0.07
Nodes (45): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+37 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.08
Nodes (55): booksViewFor(), dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton() (+47 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (101): react-aria-components, ApprovedReview(), SheetPreview(), ZoomPreview(), switchBusinessAction(), BusinessSwitcher(), DotBadge(), NotificationBell() (+93 more)

### Community 103 - "opening-checklist.tsx"
Cohesion: 0.09
Nodes (27): Access, OpeningChecklist(), STATUS, Asset, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES (+19 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "leads/actions.ts"
Cohesion: 0.10
Nodes (43): assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction(), recordCallAction() (+35 more)

### Community 106 - "cwt-tracker-view.tsx"
Cohesion: 0.35
Nodes (11): Cwt2307TrackerPage(), Tracker(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure(), money() (+3 more)

### Community 107 - "review-forms.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 108 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 109 - "documents/[id]/page.tsx"
Cohesion: 0.07
Nodes (54): file(), GET(), safe(), Payroll(), PayrollPage(), BOOKED_TYPES, BundleChild, PayrollDocument() (+46 more)

### Community 110 - "app/page.tsx"
Cohesion: 0.22
Nodes (17): DashboardStats(), FilingListRow, FilingTable(), OwnerSections(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView() (+9 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (59): BrandSettingsState, finishBrandUpload(), refresh(), SAVED, startBrandUpload(), BrandFileUpload(), upload(), FieldDef (+51 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (44): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, StandingRow (+36 more)

### Community 114 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 115 - "settings/actions.ts"
Cohesion: 0.20
Nodes (17): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+9 more)

### Community 116 - "filings/actions.ts"
Cohesion: 0.19
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+9 more)

### Community 118 - "manilaToday"
Cohesion: 0.07
Nodes (60): dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase (+52 more)

### Community 119 - "layout.ts"
Cohesion: 0.13
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 120 - "cancel-server.ts"
Cohesion: 0.24
Nodes (14): cancelMeetingAction(), cancelMyMeetingAction(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail(), manilaWhen() (+6 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (42): BookingLink(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), ProposalSent, ReopenForm(), Result(), ReviewerForm() (+34 more)

### Community 122 - "FormModule"
Cohesion: 0.15
Nodes (10): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, LoadedWorksheet (+2 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "auth.ts"
Cohesion: 0.09
Nodes (41): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), accessFor(), decideMissing2307Action(), DecisionState (+33 more)

### Community 126 - "addDays"
Cohesion: 0.25
Nodes (16): EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge, activeFor(), Appointment, appointmentRow() (+8 more)

### Community 127 - "holiday-list.ts"
Cohesion: 0.26
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+3 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (73): applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), PayrollItem, amountOf() (+65 more)

### Community 129 - "worksheet/page.tsx"
Cohesion: 0.38
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (47): RFC-2047, RFC-2822, Filing(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+39 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.18
Nodes (21): appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage(), AddPaymentAccountForm() (+13 more)

### Community 132 - "react"
Cohesion: 0.07
Nodes (58): react, Accounts(), AccountsPage(), GROUPS, InvoiceView(), NewEntry(), NewEntryPage(), PaymentsNewPage() (+50 more)

### Community 133 - "catch-up-forms.tsx"
Cohesion: 0.42
Nodes (7): amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text(), CatchUpRecorded

### Community 134 - "fees/forms.tsx"
Cohesion: 0.33
Nodes (8): ActivateForm(), billingHint, DeleteDraftButton(), NewDraftForm(), PricesForm(), Result(), ScheduleSettingsForm(), SettingsValues

### Community 135 - "blocks.tsx"
Cohesion: 0.05
Nodes (101): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+93 more)

### Community 136 - "client-form.tsx"
Cohesion: 0.07
Nodes (32): FormState, ClientValues, frequencyLabel, Props, EngagementRow, Branch, branchSchema, branchUpdateSchema (+24 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 139 - "work/load.ts"
Cohesion: 0.17
Nodes (16): loadAssets(), Row, lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 140 - "workpapers/load.ts"
Cohesion: 0.16
Nodes (19): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote (+11 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.07
Nodes (72): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+64 more)

### Community 142 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 143 - "deadlines/page.tsx"
Cohesion: 0.09
Nodes (34): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+26 more)

### Community 144 - "messages.ts"
Cohesion: 0.38
Nodes (5): cycleMessage(), dayFmt, NoticeKind, showDay(), Due

### Community 145 - "payroll/types.ts"
Cohesion: 0.11
Nodes (21): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+13 more)

### Community 146 - "morning.ts"
Cohesion: 0.20
Nodes (13): digestMessage(), DigestRow, longDay(), peso, time(), Email, line(), longDay() (+5 more)

### Community 147 - "@remixicon/react"
Cohesion: 0.06
Nodes (52): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+44 more)

### Community 148 - "proposal/[token]/actions.ts"
Cohesion: 0.67
Nodes (3): acceptProposalAction(), AcceptState, contentHash()

### Community 149 - "split-bundled-pdfs.test.ts"
Cohesion: 0.09
Nodes (11): outDir, pkgDir, require, { version }, api, ctx, fn, rows (+3 more)

### Community 154 - "social-button.tsx"
Cohesion: 0.06
Nodes (46): GET(), GET(), POST(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+38 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.32
Nodes (13): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+5 more)

### Community 156 - "server-only"
Cohesion: 0.14
Nodes (29): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+21 more)

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.09
Nodes (34): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), send() (+26 more)

### Community 160 - "next"
Cohesion: 0.08
Nodes (38): ApprovedRow, loadBooking(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths() (+30 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (38): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+30 more)

### Community 163 - "site-document.tsx"
Cohesion: 0.14
Nodes (11): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), geist, geistMono (+3 more)

### Community 165 - "collections/forms.tsx"
Cohesion: 0.10
Nodes (48): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+40 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 169 - "Textarea"
Cohesion: 0.19
Nodes (24): NewRequestForm(), TicketForm(), ReplyForm(), send(), uploadRequestFile(), ReturnStandingForm(), StandingSwitches(), StandingUpload() (+16 more)

### Community 170 - "arap.ts"
Cohesion: 0.16
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+10 more)

### Community 171 - "gemini.ts"
Cohesion: 0.06
Nodes (39): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+31 more)

### Community 172 - "supabaseServer"
Cohesion: 0.05
Nodes (87): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), removeAssignmentAction(), setCatchUpAction(), setClientStatusAction() (+79 more)

### Community 173 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (30): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+22 more)

### Community 174 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (91): @remixicon/react, GET(), Content(), PortalNotificationSettingsPage(), emit(), listeners, markReadLocally(), notifyNotificationsChanged() (+83 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fields.ts"
Cohesion: 0.09
Nodes (29): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+21 more)

### Community 177 - "tests/register.test.ts"
Cohesion: 0.10
Nodes (12): approved(), as(), root, approved(), as(), root, approved(), as() (+4 more)

### Community 180 - "formatAmount"
Cohesion: 0.12
Nodes (29): Batch(), BatchPage(), one(), toCentavos(), ParallelRun(), ParallelRunPage(), quarterMonths(), Accreditation() (+21 more)

### Community 182 - "filed-returns.ts"
Cohesion: 0.16
Nodes (23): BooksSection(), NavRow(), PortalReports(), Released, Reports(), Section(), Statements(), when() (+15 more)

### Community 184 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 187 - "sign-off.ts"
Cohesion: 0.11
Nodes (19): Row, FilingRow, QueueFiling, QueueViewer, ReviewQueue, reviewQueue(), ACTION_LABEL, availableActions() (+11 more)

### Community 188 - "[clientId]/[year]/page.tsx"
Cohesion: 0.34
Nodes (10): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), linkClass, Form2316Sheet() (+2 more)

### Community 190 - "vitest"
Cohesion: 0.02
Nodes (53): pg, vitest, dir, ctx, input, root, root, root (+45 more)

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 195 - "books/periods.ts"
Cohesion: 0.35
Nodes (8): filingsBooksReady(), BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked(), booksReadyMap(), keepBooksReady()

### Community 197 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 199 - "filings/[id]/page.tsx"
Cohesion: 0.12
Nodes (23): FilingRow, bookKind, BookRow, bookStatus, Event, eventText, FilingFile, FilingPage() (+15 more)

### Community 200 - "review-form.tsx"
Cohesion: 0.07
Nodes (48): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+40 more)

### Community 208 - "money.ts"
Cohesion: 0.14
Nodes (21): PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview(), peso(), ReadItem, addTotals(), checkTotals() (+13 more)

### Community 209 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1657 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `form-2307.ts`, `ui.ts`, `Review`, `package.json`, `zod`, `module-pages.tsx`, `Badge`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `clients/[id]/page.tsx`, `invoice-pages.tsx`, `modal.tsx`, `supabaseAdmin`, `remittances/[id]/page.tsx`, `webhook.ts`, `binder/page.tsx`, `registrations/[id]/page.tsx`, `proposal-view.tsx`, `returns/load.ts`, `steps.ts`, `app/requests/[id]/page.tsx`, `year-end/page.tsx`, `lib/books/actions.ts`, `report-periods.ts`, `marketing/page.tsx`, `template.ts`, `books/forms.tsx`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `Card`, `documents/labels.ts`, `parties/[id]/page.tsx`, `auth.ts`, `remittances/forms.tsx`, `Notice`, `portalContext`, `board.ts`, `[slug]/page.tsx`, `LinkButton`, `memo.ts`, `work/page.tsx`, `payroll/data.ts`, `calendar/page.tsx`, `Centavos`, `ledger/data.ts`, `cx`, `opening-checklist.tsx`, `leads/actions.ts`, `cwt-tracker-view.tsx`, `review-forms.tsx`, `documents/[id]/page.tsx`, `app/page.tsx`, `profile.ts`, `portal/page.tsx`, `sign-off-actions.tsx`, `settings/actions.ts`, `filings/actions.ts`, `manilaToday`, `leads/[id]/page.tsx`, `batch/register.ts`, `auth.ts`, `addDays`, `read.test.ts`, `worksheet/page.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `react`, `catch-up-forms.tsx`, `blocks.tsx`, `post-button.tsx`, `payroll/forms.tsx`, `@remixicon/react`, `proposal/[token]/actions.ts`, `social-button.tsx`, `move-bar.tsx`, `server-only`, `onboarding/page.tsx`, `next`, `calendar/staff.ts`, `site-document.tsx`, `collections/forms.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `Textarea`, `supabaseServer`, `cycle/page.tsx`, `notification-bell.tsx`, `formatAmount`, `filed-returns.ts`, `[clientId]/[year]/page.tsx`, `deadlines/actions.ts`, `filings/[id]/page.tsx`, `review-form.tsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08978174603174603 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `ui.ts`, `package.json`, `zod`, `Badge`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `returns/types.ts`, `invoice-pages.tsx`, `supabaseAdmin`, `remittances/[id]/page.tsx`, `webhook.ts`, `quote.ts`, `returns/load.ts`, `steps.ts`, `app/requests/[id]/page.tsx`, `opening.ts`, `year-end/page.tsx`, `report-periods.ts`, `marketing/page.tsx`, `filings/run.ts`, `testing.ts`, `template.ts`, `Centavos`, `books/forms.tsx`, `fixed-assets/page.tsx`, `parties/[id]/page.tsx`, `portal-billing.test.ts`, `board.ts`, `document-scanner.tsx`, `[slug]/page.tsx`, `memo.ts`, `work/page.tsx`, `calendar/page.tsx`, `Centavos`, `opening-checklist.tsx`, `leads/actions.ts`, `tieouts.test.ts`, `profile.ts`, `portal/page.tsx`, `settings/actions.ts`, `filings/actions.ts`, `manilaToday`, `layout.ts`, `cancel-server.ts`, `leads/[id]/page.tsx`, `batch/register.ts`, `addDays`, `holiday-list.ts`, `read.test.ts`, `return-file-actions.ts`, `app/settings/page.tsx`, `blocks.tsx`, `client-form.tsx`, `ticked-allocation.test.ts`, `work/load.ts`, `payroll/forms.tsx`, `deadlines/page.tsx`, `messages.ts`, `morning.ts`, `@remixicon/react`, `split-bundled-pdfs.test.ts`, `social-button.tsx`, `move-bar.tsx`, `server-only`, `onboarding/page.tsx`, `next`, `calendar/staff.ts`, `collections/forms.tsx`, `register/page.tsx`, `arap.ts`, `gemini.ts`, `cycle/page.tsx`, `notification-bell.tsx`, `acting-approver.test.ts`, `fields.ts`, `tests/register.test.ts`, `formatAmount`, `filed-returns.ts`, `rates.ts`, `sign-off.ts`, `books/periods.ts`, `review-form.tsx`, `money.ts`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.024863339798977254 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `Review`, `package.json`, `module-pages.tsx`, `Badge`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `clients/[id]/page.tsx`, `invoice-pages.tsx`, `modal.tsx`, `next`, `supabaseAdmin`, `button.tsx`, `remittances/[id]/page.tsx`, `quote.ts`, `binder/page.tsx`, `registrations/[id]/page.tsx`, `proposal-view.tsx`, `steps.ts`, `app/requests/[id]/page.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `template.ts`, `books/forms.tsx`, `fixed-assets/page.tsx`, `stat-cards.tsx`, `clients/[id]/page.tsx`, `Card`, `documents/labels.ts`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `auth.ts`, `cx.ts`, `remittances/forms.tsx`, `Notice`, `portalContext`, `board.ts`, `document-scanner.tsx`, `[slug]/page.tsx`, `work/page.tsx`, `payroll/data.ts`, `calendar/page.tsx`, `Centavos`, `ledger/data.ts`, `cx`, `leads/actions.ts`, `cwt-tracker-view.tsx`, `review-forms.tsx`, `documents/[id]/page.tsx`, `app/page.tsx`, `profile.ts`, `portal/page.tsx`, `sign-off-actions.tsx`, `settings/actions.ts`, `manilaToday`, `leads/[id]/page.tsx`, `batch/register.ts`, `auth.ts`, `addDays`, `worksheet/page.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `catch-up-forms.tsx`, `fees/forms.tsx`, `blocks.tsx`, `client-form.tsx`, `post-button.tsx`, `payroll/forms.tsx`, `@remixicon/react`, `social-button.tsx`, `move-bar.tsx`, `onboarding/page.tsx`, `next`, `calendar/staff.ts`, `site-document.tsx`, `collections/forms.tsx`, `register/page.tsx`, `Textarea`, `supabaseServer`, `cycle/page.tsx`, `notification-bell.tsx`, `formatAmount`, `filed-returns.ts`, `[clientId]/[year]/page.tsx`, `deadlines/actions.ts`, `filings/[id]/page.tsx`, `review-form.tsx`, `money.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._