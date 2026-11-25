# Graph Report - agent-ad19f38fa666c6c06  (2026-11-25)

## Corpus Check
- 684 files · ~541,111 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 6, (none) 5, .mdc 1)

## Summary
- 4287 nodes · 14742 edges · 166 communities (146 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 123 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `e9e7026c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- settlement-pages.tsx
- engine.ts
- migrate.yml
- notification.tsx
- toDecimalString
- devDependencies
- fields.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- registrations/forms.tsx
- Sign-in & Setup Docs
- onboarding/page.tsx
- Sign-off, Ledger & Payments
- zod
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
- payroll/data.ts
- scores/page.tsx
- income.ts
- payroll/types.ts
- ui.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- profile.ts
- workpapers/load.ts
- deadlines/page.tsx
- portal/page.tsx
- lock-bar.tsx
- returns/load.ts
- Centavos
- react
- returns/types.ts
- Notice
- app/settings/page.tsx
- fees/[id]/page.tsx
- settlement-form.tsx
- workpapers/page.tsx
- cx
- select.tsx
- Apple Design
- payroll/payroll.test.ts
- testing.ts
- gap/page.tsx
- review/page.tsx
- books/forms.tsx
- formatAmount
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- getIdentity
- theme-toggle.tsx
- quote.ts
- Card
- Badge
- filings/actions.ts
- button.tsx
- Pro components
- cx.ts
- vitest
- statements/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- approval-memo.tsx
- toCentavos
- Recipes
- certificate.ts
- BoardUI theming reference
- Pro templates
- social-button.tsx
- print/page.tsx
- public.ts
- [month]/page.tsx
- staff/actions.ts
- boardui
- rates.ts
- proof-upload.tsx
- parties/[id]/page.tsx
- package.json
- LinkButton
- breadcrumb.tsx
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- money.ts
- acting-approver.test.ts
- tools/page.tsx
- binder/page.tsx
- apply-migrations.sh
- quote/page.tsx
- tax-codes.ts
- app/app/page.tsx
- source.ts
- PageHeader
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- filings/[id]/page.tsx
- file-upload.tsx
- cycle/page.tsx
- ledger/data.ts
- checkbox.tsx
- requireStaff
- documents/labels.ts
- register-books.test.ts
- review-form.tsx
- addDays
- manilaToday
- app/documents/page.tsx
- ticked-allocation.test.ts
- sign-off-actions.tsx
- ledger.test.ts
- ref_node_fs
- settings/actions.ts
- proxy.ts
- @supabase/supabase-js
- BoardUI page patterns
- generate-qap-fixture.mjs
- tieouts.test.ts
- db.test.ts
- copy-opencv.mjs
- worksheet/page.tsx
- leads/[id]/page.tsx
- requireOwner
- safeguards.ts
- ledger-lock.test.ts
- leads-pipeline.test.ts
- month-complete.test.ts
- returns-books.test.ts
- supabaseServer
- returns-sign-off.test.ts
- templatePayload
- register-xlsx.ts
- Rework: one flow from lead to year-end
- books-migration.test.ts
- status.ts
- workpapers.test.ts
- tests/books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 286 edges
2. `react` - 203 edges
3. `Skeleton()` - 202 edges
4. `Notice()` - 199 edges
5. `cx` - 196 edges
6. `Button()` - 181 edges
7. `next` - 161 edges
8. `Card()` - 157 edges
9. `Badge()` - 150 edges
10. `Input()` - 130 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Postgres Row-Level Security`  [INFERRED]
  README.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (166 total, 20 thin omitted)

### Community 0 - "settlement-pages.tsx"
Cohesion: 0.11
Nodes (28): InvoiceView(), PaymentsViewPage(), PurchaseInvoicesViewPage(), ReceiptsViewPage(), Kind, Props, SETTLEMENT_KINDS, SettlementView() (+20 more)

### Community 1 - "engine.ts"
Cohesion: 0.09
Nodes (44): Rule, PlannedObligation, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), DeadlineRule, DueRule (+36 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "toDecimalString"
Cohesion: 0.15
Nodes (21): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+13 more)

### Community 5 - "devDependencies"
Cohesion: 0.12
Nodes (16): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tsx@^4.23.15, @types/node@^20, @types/react@^19 (+8 more)

### Community 6 - "fields.ts"
Cohesion: 0.07
Nodes (37): msgs(), ok, FieldKey, keys, normalizeAmount(), normalizeFields(), normalizePartyKind(), normalizeTerms() (+29 more)

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

### Community 11 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (89): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+81 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (27): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), send() (+19 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "zod"
Cohesion: 0.10
Nodes (20): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+12 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (39): CASH_FLOW_CLASSES, defaultCashFlow(), codes, PNL, loadStatements(), FS_LINES, FsLine, FsLineKey (+31 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.15
Nodes (38): Periods, sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow, addMonths(), branchCode() (+30 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "payroll/data.ts"
Cohesion: 0.16
Nodes (27): previewRegisterAction(), release2316Action(), saveMonthAction(), file(), GET(), safe(), Release2316Form(), Payroll() (+19 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "income.ts"
Cohesion: 0.10
Nodes (64): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+56 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "ui.ts"
Cohesion: 0.13
Nodes (28): BooksFrame(), blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard() (+20 more)

### Community 45 - "index.ts"
Cohesion: 0.09
Nodes (17): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+9 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (37): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+29 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (32): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+24 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.14
Nodes (26): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+18 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.06
Nodes (60): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+52 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.17
Nodes (19): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote (+11 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 53 - "portal/page.tsx"
Cohesion: 0.14
Nodes (25): shift(), PortalClient, SentRow, Home(), KINDS, manilaDay(), MonthCard(), PortalHome() (+17 more)

### Community 54 - "lock-bar.tsx"
Cohesion: 0.10
Nodes (34): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+26 more)

### Community 55 - "returns/load.ts"
Cohesion: 0.11
Nodes (24): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), FinancialStatements, BookIncome, INCOME_GROUPS (+16 more)

### Community 56 - "Centavos"
Cohesion: 0.07
Nodes (60): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+52 more)

### Community 57 - "react"
Cohesion: 0.10
Nodes (27): react, BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), InvoiceEdit(), JournalRoute(), KINDS, PartyList() (+19 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (63): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+55 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (72): setupMissingChartsAction(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), EntryForm(), OpeningUpload() (+64 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (35): RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote, SettingsPage() (+27 more)

### Community 61 - "fees/[id]/page.tsx"
Cohesion: 0.11
Nodes (38): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+30 more)

### Community 62 - "settlement-form.tsx"
Cohesion: 0.17
Nodes (23): fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, books(), checkInvoice(), checkSettlement(), invoiceModule() (+15 more)

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.15
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

### Community 64 - "cx"
Cohesion: 0.07
Nodes (36): InputOtp(), InputOtpProps, Kbd(), KbdProps, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps (+28 more)

### Community 65 - "select.tsx"
Cohesion: 0.08
Nodes (39): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+31 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "payroll/payroll.test.ts"
Cohesion: 0.15
Nodes (21): BirCategory, Category, categoryTotals(), DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ItemKind, KIND_ORDER (+13 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "gap/page.tsx"
Cohesion: 0.17
Nodes (17): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+9 more)

### Community 70 - "review/page.tsx"
Cohesion: 0.28
Nodes (8): Queue(), ReviewPage(), Row, Section(), QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (37): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+29 more)

### Community 72 - "formatAmount"
Cohesion: 0.14
Nodes (34): booksContext(), BooksContext, fmtDate(), fmtMonth(), one(), SearchParams, BooksList(), Column (+26 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.15
Nodes (20): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, loadAssets(), Row, Asset, Cutoff (+12 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.08
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "getIdentity"
Cohesion: 0.12
Nodes (32): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+24 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.08
Nodes (44): count(), first(), pick(), profileFromQuery(), items, buildQuote(), cents(), CustomQuoteItem (+36 more)

### Community 80 - "Card"
Cohesion: 0.13
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 81 - "Badge"
Cohesion: 0.06
Nodes (58): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+50 more)

### Community 82 - "filings/actions.ts"
Cohesion: 0.20
Nodes (16): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+8 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.10
Nodes (17): Counter(), CounterColor, CounterProps, styles, StatusDot(), StatusDotColor, StatusDotProps, styles (+9 more)

### Community 86 - "vitest"
Cohesion: 0.11
Nodes (6): vitest, HASH, LEAD, root, root, root

### Community 87 - "statements/page.tsx"
Cohesion: 0.15
Nodes (19): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+11 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (27): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.09
Nodes (29): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+21 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (27): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+19 more)

### Community 93 - "approval-memo.tsx"
Cohesion: 0.20
Nodes (10): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, approvalMemo(), Memo, MemoInput (+2 more)

### Community 94 - "toCentavos"
Cohesion: 0.14
Nodes (21): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+13 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "certificate.ts"
Cohesion: 0.11
Nodes (31): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), Certificates2316, certificatesFromRaw(), form2316() (+23 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (46): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+38 more)

### Community 101 - "public.ts"
Cohesion: 0.10
Nodes (28): metadata, Proposal(), ProposalPage(), requestQuoteAction(), SERVICES, StartState, metadata, Start() (+20 more)

### Community 102 - "[month]/page.tsx"
Cohesion: 0.19
Nodes (15): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p(), PayrollRuns(), Run (+7 more)

### Community 103 - "staff/actions.ts"
Cohesion: 0.25
Nodes (13): addClientUserAction(), fieldErrors(), FormState, inviteStaffAction(), updateStaffAction(), BranchOption, BranchOptions(), InviteStaffForm() (+5 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "proof-upload.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (51): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+43 more)

### Community 108 - "package.json"
Cohesion: 0.15
Nodes (12): tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, @types/react-dom@^19, name, packageManager, private, version (+4 more)

### Community 109 - "LinkButton"
Cohesion: 0.27
Nodes (10): Batch(), BatchPage(), one(), toCentavos(), JournalEntryRoute(), NewEntry(), NewEntryPage(), JournalView() (+2 more)

### Community 110 - "breadcrumb.tsx"
Cohesion: 0.20
Nodes (8): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronDownSmall(), ChevronRightSmall(), IconProps

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.13
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+19 more)

### Community 113 - "money.ts"
Cohesion: 0.16
Nodes (16): SawtResult, Split, AtcTotal, docLabel(), EwtLine, ewtLines(), ListedDocument, applyRate() (+8 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "tools/page.tsx"
Cohesion: 0.19
Nodes (19): AmendmentDecision(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm() (+11 more)

### Community 116 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 118 - "quote/page.tsx"
Cohesion: 0.14
Nodes (22): dateFmt, loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm() (+14 more)

### Community 119 - "tax-codes.ts"
Cohesion: 0.20
Nodes (14): SettingsPage(), SettingsRoute(), loadTaxCodes(), appliesTo(), canGoOn(), formsFor(), placeOf(), RETURN_LINES (+6 more)

### Community 120 - "app/app/page.tsx"
Cohesion: 0.15
Nodes (26): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+18 more)

### Community 121 - "source.ts"
Cohesion: 0.10
Nodes (34): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+26 more)

### Community 122 - "PageHeader"
Cohesion: 0.08
Nodes (36): @remixicon/react, Accounts(), AccountsPage(), Certificates(), Form2316Page(), NewClientPage(), OwnerOnly(), ClientList() (+28 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (43): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind (+35 more)

### Community 126 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.14
Nodes (26): Cycle(), CycleWithClient, DocRow, MonthComplete(), TimelineRow, CloseCycleButton(), DecideExceptionForm(), Message() (+18 more)

### Community 128 - "ledger/data.ts"
Cohesion: 0.13
Nodes (23): GROUPS, CashFlowClass, accountFromRow(), Amendment, AmendmentStatus, BooksClient, BooksMonth, cents() (+15 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "requireStaff"
Cohesion: 0.10
Nodes (46): RFC-2047, RFC-2822, RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction() (+38 more)

### Community 131 - "documents/labels.ts"
Cohesion: 0.08
Nodes (42): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+34 more)

### Community 132 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 133 - "review-form.tsx"
Cohesion: 0.09
Nodes (37): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), Booking, DirectoryParty (+29 more)

### Community 134 - "addDays"
Cohesion: 0.13
Nodes (24): Action(), short(), TONE, filingsBooksReady(), addDays(), parseIso(), holidaySet(), loadBoard() (+16 more)

### Community 135 - "manilaToday"
Cohesion: 0.10
Nodes (39): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), portalContext() (+31 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.11
Nodes (32): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ApprovedTable(), BOOKED_TYPES (+24 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.06
Nodes (13): pg, ctx, input, root, root, root, root, root (+5 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.21
Nodes (15): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), periodWord (+7 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "@supabase/supabase-js"
Cohesion: 0.11
Nodes (23): @supabase/supabase-js, GET(), GET(), GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage() (+15 more)

### Community 144 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 147 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 148 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 149 - "worksheet/page.tsx"
Cohesion: 0.15
Nodes (18): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), Lines(), lineStyle, Problems(), sameFigures() (+10 more)

### Community 150 - "leads/[id]/page.tsx"
Cohesion: 0.11
Nodes (29): NotesCard(), ClientNoteForm(), ConvertForm(), DiscoveryCallForm(), LostForm(), Person, ProposalForm(), ReopenForm() (+21 more)

### Community 151 - "requireOwner"
Cohesion: 0.08
Nodes (65): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+57 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.09
Nodes (43): ClientValues, TaxpayerType, TaxType, CoverageClient, coverageGaps(), Gap, GapKind, Email (+35 more)

### Community 154 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 157 - "supabaseServer"
Cohesion: 0.08
Nodes (38): nextConfig, next, server-only, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton() (+30 more)

### Community 158 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 159 - "templatePayload"
Cohesion: 0.17
Nodes (8): templatePayload(), as(), client(), root, root, as(), books(), root

### Community 160 - "register-xlsx.ts"
Cohesion: 0.13
Nodes (30): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), GET(), sortItems(), checkRegister(), fmt() (+22 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 163 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 164 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 165 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **20 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1178 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `ledger/data.ts`, `settlement-pages.tsx`, `requireStaff`, `documents/labels.ts`, `review-form.tsx`, `addDays`, `manilaToday`, `app/documents/page.tsx`, `sign-off-actions.tsx`, `registrations/forms.tsx`, `onboarding/page.tsx`, `settings/actions.ts`, `@supabase/supabase-js`, `zod`, `proxy.ts`, `worksheet/page.tsx`, `leads/[id]/page.tsx`, `requireOwner`, `register-xlsx.ts`, `payroll/data.ts`, `scores/page.tsx`, `ui.ts`, `payroll/forms.tsx`, `lib/books/actions.ts`, `profile.ts`, `deadlines/page.tsx`, `portal/page.tsx`, `lock-bar.tsx`, `react`, `Notice`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `settlement-form.tsx`, `workpapers/page.tsx`, `gap/page.tsx`, `review/page.tsx`, `books/forms.tsx`, `formatAmount`, `opening-checklist.tsx`, `getIdentity`, `theme-toggle.tsx`, `Card`, `Badge`, `filings/actions.ts`, `statements/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `approval-memo.tsx`, `certificate.ts`, `social-button.tsx`, `print/page.tsx`, `public.ts`, `[month]/page.tsx`, `staff/actions.ts`, `proof-upload.tsx`, `parties/[id]/page.tsx`, `package.json`, `LinkButton`, `breadcrumb.tsx`, `fixed-assets/page.tsx`, `tools/page.tsx`, `binder/page.tsx`, `quote/page.tsx`, `app/app/page.tsx`, `PageHeader`, `batch/register.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `settlement-pages.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10873440285204991 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `engine.ts`, `requireStaff`, `toDecimalString`, `devDependencies`, `review-form.tsx`, `fields.ts`, `app/documents/page.tsx`, `addDays`, `register-books.test.ts`, `registrations/forms.tsx`, `ref_node_fs`, `settings/actions.ts`, `onboarding/page.tsx`, `@supabase/supabase-js`, `ledger.test.ts`, `ticked-allocation.test.ts`, `statements.ts`, `tieouts.test.ts`, `db.test.ts`, `leads/[id]/page.tsx`, `requireOwner`, `safeguards.ts`, `ledger-lock.test.ts`, `leads-pipeline.test.ts`, `month-complete.test.ts`, `returns-books.test.ts`, `returns-sign-off.test.ts`, `templatePayload`, `books-migration.test.ts`, `status.ts`, `workpapers.test.ts`, `tests/books.test.ts`, `scores/page.tsx`, `ui.ts`, `index.ts`, `profile.ts`, `deadlines/page.tsx`, `portal/page.tsx`, `lock-bar.tsx`, `Centavos`, `returns/types.ts`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `payroll/payroll.test.ts`, `testing.ts`, `gap/page.tsx`, `review/page.tsx`, `opening-checklist.tsx`, `getIdentity`, `quote.ts`, `Card`, `Badge`, `filings/actions.ts`, `statements/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `approval-memo.tsx`, `toCentavos`, `social-button.tsx`, `print/page.tsx`, `public.ts`, `[month]/page.tsx`, `rates.ts`, `parties/[id]/page.tsx`, `package.json`, `fixed-assets/page.tsx`, `money.ts`, `acting-approver.test.ts`, `tax-codes.ts`, `app/app/page.tsx`, `source.ts`, `batch/register.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09125188536953242 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `ledger/data.ts`, `settlement-pages.tsx`, `requireStaff`, `documents/labels.ts`, `notification.tsx`, `review-form.tsx`, `addDays`, `manilaToday`, `app/documents/page.tsx`, `checkbox.tsx`, `sign-off-actions.tsx`, `registrations/forms.tsx`, `onboarding/page.tsx`, `settings/actions.ts`, `zod`, `@supabase/supabase-js`, `worksheet/page.tsx`, `leads/[id]/page.tsx`, `requireOwner`, `supabaseServer`, `payroll/data.ts`, `scores/page.tsx`, `ui.ts`, `payroll/forms.tsx`, `modal.tsx`, `profile.ts`, `deadlines/page.tsx`, `portal/page.tsx`, `lock-bar.tsx`, `Notice`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `settlement-form.tsx`, `workpapers/page.tsx`, `cx`, `select.tsx`, `gap/page.tsx`, `review/page.tsx`, `books/forms.tsx`, `formatAmount`, `stat-cards.tsx`, `getIdentity`, `theme-toggle.tsx`, `Card`, `Badge`, `button.tsx`, `cx.ts`, `statements/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `certificate.ts`, `social-button.tsx`, `print/page.tsx`, `public.ts`, `[month]/page.tsx`, `staff/actions.ts`, `proof-upload.tsx`, `parties/[id]/page.tsx`, `package.json`, `LinkButton`, `breadcrumb.tsx`, `fixed-assets/page.tsx`, `tools/page.tsx`, `binder/page.tsx`, `quote/page.tsx`, `tax-codes.ts`, `app/app/page.tsx`, `PageHeader`, `filings/[id]/page.tsx`, `file-upload.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._