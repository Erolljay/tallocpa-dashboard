# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 790 files · ~629,151 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4920 nodes · 17106 edges · 186 communities (163 shown, 23 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 147 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `f7c74c2d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- engine.ts
- migrate.yml
- manilaToday
- ledger/data.ts
- package.json
- ui.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- requireStaff
- Sign-in & Setup Docs
- onboarding/page.tsx
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- vat.ts
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- lock-bar.tsx
- scores/page.tsx
- registrations/forms.tsx
- payroll/types.ts
- tests/register.test.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- filings/run.ts
- scripts
- supabaseAdmin
- workpapers/load.ts
- board.ts
- app/settings/page.tsx
- filings/[id]/page.tsx
- app/app/page.tsx
- payroll/payroll.test.ts
- tax-codes.ts
- form-1604e.ts
- Notice
- supabaseServer
- safeguards.ts
- registration.test.ts
- public.ts
- cx
- select.tsx
- Apple Design
- @supabase/supabase-js
- testing.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- formatAmount
- Rules
- Animation Performance
- parallel-run.tsx
- stat-cards.tsx
- social-button.tsx
- theme-toggle.tsx
- quote.ts
- books/reports/statements/page.tsx
- Skeleton
- fees/types.ts
- button.tsx
- Pro components
- server-only
- acting-approver/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- opening.ts
- Recipes
- rows.ts
- BoardUI page patterns
- Pro templates
- workpapers/page.tsx
- ledger/books.ts
- ui.ts
- gap.ts
- react
- boardui
- rates.ts
- cx.ts
- proxy.ts
- review-form.tsx
- profile.ts
- vitest
- Opening balances: checklist for any cut-off
- assets/schedule.ts
- portal/page.tsx
- lib/books/actions.ts
- registrations/actions.ts
- calendar/callback/route.ts
- apply-migrations.sh
- buildSawt
- cycle/page.tsx
- fixed-assets/forms.tsx
- Centavos
- fees/forms.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- runs.tsx
- documents/cutoff.ts
- read.test.ts
- checkbox.tsx
- return-file-actions.ts
- spinner.tsx
- filings/actions.ts
- gemini.ts
- work/load.ts
- payment-forms.tsx
- Textarea
- ticked-allocation.test.ts
- proposal-view.tsx
- ledger.test.ts
- ref_node_fs
- BoardUI page patterns
- items.ts
- brand/forms.tsx
- eslint.config.mjs
- generate-qap-fixture.mjs
- formatAmount
- ledger/types.ts
- calendar/staff.ts
- portal/requests/page.tsx
- register-books.test.ts
- funnel.test.ts
- safeguards.ts
- parts.ts
- seed.ts
- documents/[id]/page.tsx
- workpapers.test.ts
- portal-statements-approval.test.ts
- returns-books.test.ts
- FormModule
- register-xlsx.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- books-migration.test.ts
- tests/books.test.ts
- fixed-assets.test.ts
- toCentavos
- settings/actions.ts
- parallel-run.test.ts
- registrations/forms.tsx
- clients/actions.ts
- acting-approver.test.ts
- steps.ts
- binder/page.tsx
- db.test.ts
- templatePayload
- returns-sign-off.test.ts
- ledger-lock.test.ts
- leads-pipeline.test.ts
- onboarding/forms.tsx
- ledger-documents.test.ts
- template.ts
- batch-upload.test.ts
- memo.ts
- registration/page.tsx
- names.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 293 edges
2. `cx` - 237 edges
3. `Skeleton()` - 230 edges
4. `Notice()` - 226 edges
5. `react` - 224 edges
6. `Button()` - 194 edges
7. `next` - 183 edges
8. `Card()` - 163 edges
9. `Badge()` - 163 edges
10. `vitest` - 145 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `send()` --indirect_call--> `client()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/filings/generate.test.ts
- `worksheet()` --indirect_call--> `fromBooksRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/returns/source.ts
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (186 total, 23 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (57): BooksContext, Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href(), Portal2307() (+49 more)

### Community 1 - "engine.ts"
Cohesion: 0.10
Nodes (47): Rule, PlannedObligation, TimelineFiling, TimelineItem, addDays(), compareIso(), IsoDate, isWeekend() (+39 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "manilaToday"
Cohesion: 0.10
Nodes (37): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), decideMissing2307Action() (+29 more)

### Community 4 - "ledger/data.ts"
Cohesion: 0.07
Nodes (54): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+46 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "ui.tsx"
Cohesion: 0.13
Nodes (13): setYearEndCheckAction(), TickForm(), PeriodKey, periodRange(), PERIODS, ym(), YearSelect(), buttonClass() (+5 more)

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

### Community 11 - "requireStaff"
Cohesion: 0.11
Nodes (30): addClientNoteAction(), FilingTable(), markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), Lines(), lineStyle (+22 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.20
Nodes (10): ItemState, MANUAL_ITEM_LABELS, MANUAL_ITEMS, ONBOARDING_GROUPS, onboardingChecklist(), OnboardingFacts, OnboardingItem, onboardingProgress() (+2 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (43): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, statementsFrom(), TbRowOut, FS_LINES (+35 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.11
Nodes (59): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+51 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "lock-bar.tsx"
Cohesion: 0.07
Nodes (52): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+44 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "registrations/forms.tsx"
Cohesion: 0.07
Nodes (54): atcRows(), BookInvoiceRow, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC (+46 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 45 - "index.ts"
Cohesion: 0.07
Nodes (20): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+12 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (63): @supabase/supabase-js, checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState (+55 more)

### Community 47 - "modal.tsx"
Cohesion: 0.10
Nodes (42): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+34 more)

### Community 48 - "filings/run.ts"
Cohesion: 0.13
Nodes (26): ClientReturnsPage(), Returns(), generateFilingsNow(), GenerateState, GenerateButton(), AmendmentCard(), BooksStillOpen(), Deadlines() (+18 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+25 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.11
Nodes (24): loadAssets(), Row, month1601C(), RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd() (+16 more)

### Community 52 - "board.ts"
Cohesion: 0.08
Nodes (32): StepProgress(), Row, FilingRow, StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED (+24 more)

### Community 53 - "app/settings/page.tsx"
Cohesion: 0.27
Nodes (11): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote(), describeDue(), FREQUENCY_SECTIONS (+3 more)

### Community 54 - "filings/[id]/page.tsx"
Cohesion: 0.10
Nodes (31): FilingRow, FilingListRow, amt(), ApprovalMemo(), Db, TIE, bookKind, BookRow (+23 more)

### Community 55 - "app/app/page.tsx"
Cohesion: 0.20
Nodes (14): NotesCard(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry, noteEntry(), NoteRow (+6 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.07
Nodes (65): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+57 more)

### Community 57 - "tax-codes.ts"
Cohesion: 0.17
Nodes (16): SettingsPage(), SettingsRoute(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES (+8 more)

### Community 58 - "form-1604e.ts"
Cohesion: 0.06
Nodes (70): client, row(), VatData, INPUTS, MONTH, PAYSLIP_COLUMNS, payslipCsv(), payslipSchedule() (+62 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (67): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), CloseYearForm(), EntryForm() (+59 more)

### Community 60 - "supabaseServer"
Cohesion: 0.06
Nodes (64): nextConfig, next, removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), addChargeAction(), applyCreditAction(), clearRemittedAction() (+56 more)

### Community 61 - "safeguards.ts"
Cohesion: 0.14
Nodes (22): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+14 more)

### Community 62 - "registration.test.ts"
Cohesion: 0.17
Nodes (11): dtiRegisteredOn(), fieldErrors(), openClientCaseAction(), openYearRenewalsAction(), updateStepAction(), branchStepsFor(), closureStepsFor(), registersWithSec() (+3 more)

### Community 63 - "public.ts"
Cohesion: 0.12
Nodes (21): acceptProposalAction(), AcceptState, requestQuoteAction(), SERVICES, StartState, metadata, Start(), StartPage() (+13 more)

### Community 64 - "cx"
Cohesion: 0.05
Nodes (47): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, InputOtp(), InputOtpProps, Kbd() (+39 more)

### Community 65 - "select.tsx"
Cohesion: 0.08
Nodes (36): SheetPreview(), Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem() (+28 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "@supabase/supabase-js"
Cohesion: 0.19
Nodes (15): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+7 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (48): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+40 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (52): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+44 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (42): GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction() (+34 more)

### Community 72 - "formatAmount"
Cohesion: 0.07
Nodes (65): BankAccountsRoute(), booksContext(), fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList() (+57 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "parallel-run.tsx"
Cohesion: 0.16
Nodes (23): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+15 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (37): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+29 more)

### Community 79 - "quote.ts"
Cohesion: 0.13
Nodes (23): PriceRow, buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos() (+15 more)

### Community 80 - "books/reports/statements/page.tsx"
Cohesion: 0.24
Nodes (14): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+6 more)

### Community 81 - "Skeleton"
Cohesion: 0.06
Nodes (91): @remixicon/react, Accounts(), AccountsPage(), NewEntry(), NewEntryPage(), ClientTab, ClientTabs(), UNDER (+83 more)

### Community 82 - "fees/types.ts"
Cohesion: 0.16
Nodes (18): EngagementRow, TaxpayerType, EstimatedProfile, ExistingClient, count(), first(), pick(), profileFromQuery() (+10 more)

### Community 83 - "button.tsx"
Cohesion: 0.06
Nodes (38): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+30 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "server-only"
Cohesion: 0.18
Nodes (15): server-only, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+7 more)

### Community 86 - "acting-approver/page.tsx"
Cohesion: 0.21
Nodes (18): Queue(), ReviewPage(), Section(), EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge (+10 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (70): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+62 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (27): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.07
Nodes (38): react-dom@19.3.0, react-dom, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu() (+30 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (26): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+18 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.16
Nodes (21): bookingLinkAction(), LeadState, reopenLeadAction(), BookingLink(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), Person (+13 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "rows.ts"
Cohesion: 0.12
Nodes (24): client(), Certificates2316, loadPayrollContext(), Row, cents(), EMPLOYEE_COLUMNS, employeeFromRow(), ENTRY_COLUMNS (+16 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.06
Nodes (48): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+40 more)

### Community 101 - "ui.ts"
Cohesion: 0.09
Nodes (36): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmt() (+28 more)

### Community 102 - "gap.ts"
Cohesion: 0.23
Nodes (13): estimateProfile(), gapFor(), GapRow, has(), items, PRICES, schedule, settings (+5 more)

### Community 103 - "react"
Cohesion: 0.08
Nodes (31): react, INVOICE_KINDS, InvoiceEdit(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesViewPage() (+23 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.14
Nodes (31): annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation(), monthlyTable() (+23 more)

### Community 106 - "cx.ts"
Cohesion: 0.07
Nodes (28): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+20 more)

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "review-form.tsx"
Cohesion: 0.06
Nodes (59): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+51 more)

### Community 109 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), SAVED, startBrandUpload(), BrandFileUpload(), upload(), BrandSettings() (+44 more)

### Community 110 - "vitest"
Cohesion: 0.05
Nodes (15): pg, vitest, root, root, root, root, root, root (+7 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "assets/schedule.ts"
Cohesion: 0.35
Nodes (10): accumulated(), bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor(), monthIndex(), monthTotals(), rangeTotals(), RESIDUAL (+2 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (35): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+27 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (27): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+19 more)

### Community 115 - "registrations/actions.ts"
Cohesion: 0.21
Nodes (11): ClientCaseKind, FormState, branchSchema, checkbox, closureSchema, newRegistrationSchema, renewalSchema, stepUpdateSchema (+3 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.20
Nodes (18): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+10 more)

### Community 118 - "buildSawt"
Cohesion: 0.15
Nodes (40): incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, addMonths() (+32 more)

### Community 119 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (27): Cycle(), CyclePage(), CycleWithClient, DocRow, MonthComplete(), SentRow, TimelineRow, CloseCycleButton() (+19 more)

### Community 120 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 121 - "Centavos"
Cohesion: 0.06
Nodes (62): BirLineKey, FinancialStatements, AtcComparison, Bucket, DocumentDifference, Figure, PartyComparison, SaleSplit (+54 more)

### Community 122 - "fees/forms.tsx"
Cohesion: 0.29
Nodes (10): ActivateForm(), billingHint, CreateFromTemplateForm(), DeleteDraftButton(), NewDraftForm(), PricesForm(), Result(), ScheduleSettingsForm() (+2 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (44): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+36 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.07
Nodes (68): zod, FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), convertLeadAction(), markLostAction() (+60 more)

### Community 126 - "runs.tsx"
Cohesion: 0.27
Nodes (9): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, p(), PayrollRuns(), Run (+1 more)

### Community 127 - "documents/cutoff.ts"
Cohesion: 0.64
Nodes (6): shift(), addMonths(), ymd(), monthChoices(), nextCutoff(), openMonth()

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (61): CATEGORIES, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+53 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (46): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+38 more)

### Community 131 - "spinner.tsx"
Cohesion: 0.32
Nodes (7): PendingGlyph(), Arc(), SIZES, Spinner(), SpinnerGlyph(), SpinnerProps, SpinnerSize

### Community 132 - "filings/actions.ts"
Cohesion: 0.32
Nodes (12): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+4 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 134 - "work/load.ts"
Cohesion: 0.20
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 135 - "payment-forms.tsx"
Cohesion: 0.33
Nodes (11): PaymentSettings(), PaymentSettingsState, AddPaymentAccountForm(), ChannelFields(), ChannelValues, EditPaymentAccountForm(), MoveAccountButtons(), PaymentDaysForm() (+3 more)

### Community 136 - "Textarea"
Cohesion: 0.09
Nodes (38): DocReviewActions(), NoteState, ClientNoteForm(), NewRequestForm(), ReplyForm(), TicketForm(), DocumentUpload(), send() (+30 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "proposal-view.tsx"
Cohesion: 0.39
Nodes (7): Lines(), longDate(), money(), php, ProposalData, ProposalView(), Quote

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.09
Nodes (9): outDir, pkgDir, require, { version }, ctx, input, root, root (+1 more)

### Community 141 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 142 - "items.ts"
Cohesion: 0.13
Nodes (21): PayrollSetupPage(), Setup(), BirCategory, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS (+13 more)

### Community 143 - "brand/forms.tsx"
Cohesion: 0.38
Nodes (6): FieldDef, FIELDS, pesoInput(), Result(), SUBMIT, TaxForm()

### Community 144 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "formatAmount"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.14
Nodes (21): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES (+13 more)

### Community 148 - "calendar/staff.ts"
Cohesion: 0.17
Nodes (19): Interval, Admin, Connection, PersonWeek, teamWeek(), accessToken(), CALENDAR_SCOPES, CalendarEvent (+11 more)

### Community 149 - "portal/requests/page.tsx"
Cohesion: 0.24
Nodes (10): Row, PortalRequests(), Requests(), Row, when(), Direction, REQUEST_FILE_MAX, REQUEST_FILE_TYPES (+2 more)

### Community 150 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 151 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 152 - "safeguards.ts"
Cohesion: 0.13
Nodes (27): TaxType, CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay() (+19 more)

### Community 153 - "parts.ts"
Cohesion: 0.12
Nodes (34): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+26 more)

### Community 154 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 155 - "documents/[id]/page.tsx"
Cohesion: 0.06
Nodes (64): GET(), Doc, DocumentsCard(), when(), Payroll(), PayrollPage(), ExceptionRow, ClientSelect() (+56 more)

### Community 156 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 159 - "FormModule"
Cohesion: 0.13
Nodes (13): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, form1601C (+5 more)

### Community 160 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (31): RFC-4180, file(), GET(), safe(), buildEmployeeTemplate(), draftToTemplate(), initialDraft(), filled() (+23 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (16): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+8 more)

### Community 163 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 164 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 166 - "toCentavos"
Cohesion: 0.07
Nodes (50): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+42 more)

### Community 168 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 172 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 173 - "registrations/forms.tsx"
Cohesion: 0.13
Nodes (22): completeRegistrationAction(), caseNote, caseTitle, Check(), CompleteButton(), statusTone, StepBadge(), StepRow (+14 more)

### Community 174 - "clients/actions.ts"
Cohesion: 0.08
Nodes (44): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setIncomeTaxMethodAction(), updateClientAction(), ClientForm() (+36 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 177 - "steps.ts"
Cohesion: 0.11
Nodes (20): Agency, birForm(), BranchOptions, CaseStep, ClosureOptions, dayNumber(), EMPLOYER_STEPS, LGU_STEPS (+12 more)

### Community 178 - "binder/page.tsx"
Cohesion: 0.26
Nodes (11): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, metadata (+3 more)

### Community 180 - "templatePayload"
Cohesion: 0.11
Nodes (10): templatePayload(), as(), client(), root, root, as(), books(), root (+2 more)

### Community 181 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 184 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 185 - "onboarding/forms.tsx"
Cohesion: 0.24
Nodes (15): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+7 more)

### Community 191 - "template.ts"
Cohesion: 0.20
Nodes (7): items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL, FeeItemTemplate

### Community 193 - "memo.ts"
Cohesion: 0.16
Nodes (14): ReviewNote, Memo, MemoInput, MemoMonth, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps() (+6 more)

### Community 196 - "registration/page.tsx"
Cohesion: 0.33
Nodes (10): clientStatus, fmt(), PortalRegistration(), Registration(), daysBetween(), daysOpen(), nextStep(), progress() (+2 more)

### Community 199 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1324 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `form-2307.ts`, `checkbox.tsx`, `return-file-actions.ts`, `manilaToday`, `ledger/data.ts`, `package.json`, `ui.tsx`, `payment-forms.tsx`, `Textarea`, `spinner.tsx`, `requireStaff`, `items.ts`, `dependencies`, `brand/forms.tsx`, `formatAmount`, `statements.ts`, `portal/requests/page.tsx`, `parts.ts`, `documents/[id]/page.tsx`, `calendar/page.tsx`, `toCentavos`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `clients/actions.ts`, `modal.tsx`, `payroll/forms.tsx`, `filings/run.ts`, `binder/page.tsx`, `supabaseAdmin`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `tax-codes.ts`, `onboarding/forms.tsx`, `Notice`, `supabaseServer`, `public.ts`, `cx`, `select.tsx`, `@supabase/supabase-js`, `registration/page.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `formatAmount`, `parallel-run.tsx`, `stat-cards.tsx`, `social-button.tsx`, `theme-toggle.tsx`, `books/reports/statements/page.tsx`, `Skeleton`, `button.tsx`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `workpapers/page.tsx`, `ledger/books.ts`, `ui.ts`, `cx.ts`, `review-form.tsx`, `profile.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `calendar/callback/route.ts`, `cycle/page.tsx`, `fixed-assets/forms.tsx`, `fees/forms.tsx`, `batch/register.ts`, `quote/page.tsx`, `runs.tsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07511737089201878 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `engine.ts`, `ledger/data.ts`, `package.json`, `ui.tsx`, `onboarding/page.tsx`, `statements.ts`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `tests/register.test.ts`, `index.ts`, `supabaseAdmin`, `workpapers/load.ts`, `board.ts`, `app/settings/page.tsx`, `app/app/page.tsx`, `payroll/payroll.test.ts`, `tax-codes.ts`, `form-1604e.ts`, `safeguards.ts`, `registration.test.ts`, `public.ts`, `@supabase/supabase-js`, `testing.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `theme-toggle.tsx`, `quote.ts`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `opening.ts`, `rows.ts`, `ledger/books.ts`, `ui.ts`, `gap.ts`, `react`, `rates.ts`, `review-form.tsx`, `profile.ts`, `assets/schedule.ts`, `portal/page.tsx`, `calendar/callback/route.ts`, `cycle/page.tsx`, `Centavos`, `batch/register.ts`, `quote/page.tsx`, `documents/cutoff.ts`, `read.test.ts`, `return-file-actions.ts`, `gemini.ts`, `work/load.ts`, `ticked-allocation.test.ts`, `ledger.test.ts`, `ref_node_fs`, `ledger/types.ts`, `portal/requests/page.tsx`, `register-books.test.ts`, `funnel.test.ts`, `safeguards.ts`, `parts.ts`, `documents/[id]/page.tsx`, `workpapers.test.ts`, `portal-statements-approval.test.ts`, `returns-books.test.ts`, `calendar/page.tsx`, `books-migration.test.ts`, `tests/books.test.ts`, `fixed-assets.test.ts`, `toCentavos`, `settings/actions.ts`, `parallel-run.test.ts`, `clients/actions.ts`, `acting-approver.test.ts`, `steps.ts`, `db.test.ts`, `templatePayload`, `returns-sign-off.test.ts`, `ledger-lock.test.ts`, `leads-pipeline.test.ts`, `ledger-documents.test.ts`, `template.ts`, `batch-upload.test.ts`, `memo.ts`, `registration/page.tsx`, `names.ts`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0957372466806429 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `return-file-actions.ts`, `manilaToday`, `ledger/data.ts`, `package.json`, `filings/actions.ts`, `ui.tsx`, `Textarea`, `requireStaff`, `dependencies`, `brand/forms.tsx`, `formatAmount`, `ledger/types.ts`, `portal/requests/page.tsx`, `parts.ts`, `documents/[id]/page.tsx`, `register-xlsx.ts`, `toCentavos`, `lock-bar.tsx`, `scores/page.tsx`, `settings/actions.ts`, `registrations/forms.tsx`, `clients/actions.ts`, `modal.tsx`, `payroll/forms.tsx`, `filings/run.ts`, `binder/page.tsx`, `supabaseAdmin`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `onboarding/forms.tsx`, `public.ts`, `cx`, `@supabase/supabase-js`, `registration/page.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `formatAmount`, `parallel-run.tsx`, `theme-toggle.tsx`, `books/reports/statements/page.tsx`, `Skeleton`, `button.tsx`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `workpapers/page.tsx`, `ledger/books.ts`, `ui.ts`, `react`, `proxy.ts`, `review-form.tsx`, `profile.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `registrations/actions.ts`, `calendar/callback/route.ts`, `cycle/page.tsx`, `fixed-assets/forms.tsx`, `batch/register.ts`, `quote/page.tsx`, `runs.tsx`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._