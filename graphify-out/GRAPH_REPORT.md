# Graph Report - agent-a015340669e4492a7  (2026-11-25)

## Corpus Check
- 655 files · ~500,346 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 6, (none) 5, .mdc 1)

## Summary
- 4108 nodes · 14110 edges · 174 communities (153 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 119 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `3bcc86bf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- start/page.tsx
- filings/run.ts
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- registrations/forms.tsx
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
- payroll/payroll.test.ts
- scores/page.tsx
- income.ts
- payroll/types.ts
- ui.ts
- social-button.tsx
- [id]/payroll/actions.ts
- modal.tsx
- lib/books/actions.ts
- scripts
- brand/page.tsx
- workpapers/load.ts
- deadlines/page.tsx
- registrations/[id]/page.tsx
- lock-bar.tsx
- getIdentity
- year.ts
- react
- returns/types.ts
- ui.tsx
- app/settings/page.tsx
- fees/[id]/page.tsx
- fixed-assets.test.ts
- workpapers/page.tsx
- tabs.tsx
- cx
- Apple Design
- alphalist.ts
- vitest
- file-upload.tsx
- funnel.test.ts
- books/forms.tsx
- module-pages.tsx
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- safeguards.ts
- theme-toggle.tsx
- quote/page.tsx
- Card
- portalContext
- requireStaff
- @remixicon/react
- Pro components
- cx.ts
- [clientId]/page.tsx
- formatAmount
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- sidebar-toggle.tsx
- opening.ts
- Recipes
- payroll/data.ts
- BoardUI theming reference
- Pro templates
- supabaseServer
- books.ts
- manilaToday
- [month]/page.tsx
- items.ts
- boardui
- rates.ts
- requireOwner
- parties/[id]/page.tsx
- db.test.ts
- LinkButton
- cycle/actions.ts
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- Badge
- acting-approver.test.ts
- ledger/data.ts
- staff/page.tsx
- apply-migrations.sh
- cycle/page.tsx
- books/data.ts
- review/page.tsx
- returns/load.ts
- addDays
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- filings/[id]/page.tsx
- memo.ts
- profile.ts
- steps.ts
- checkbox.tsx
- server-only
- documents/labels.ts
- filings/actions.ts
- review-form.tsx
- binder/page.tsx
- statement.ts
- app/documents/page.tsx
- parties/actions.ts
- sign-off-actions.tsx
- ledger.test.ts
- ref_node_fs
- settings/actions.ts
- proxy.ts
- apply.ts
- 2316/page.tsx
- print/page.tsx
- brand/actions.ts
- ocr/run.ts
- pending-review.tsx
- PageHeader
- fees.test.ts
- books-ready.ts
- books/export/route.ts
- money.ts
- templatePayload
- spinner.tsx
- clients/actions.ts
- acting/run.ts
- BoardUI page patterns
- index.ts
- Centavos
- Rework: one flow from lead to year-end
- workpapers.test.ts
- invoice-pages.tsx
- cycle/run.ts
- names.ts
- portal-billing.test.ts
- books-migration.test.ts
- tests/books.test.ts
- register-books.test.ts
- eslint.config.mjs
- tests/parties.test.ts
- tests/register.test.ts
- client-reports.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 264 edges
2. `Skeleton()` - 201 edges
3. `react` - 201 edges
4. `cx` - 193 edges
5. `Notice()` - 192 edges
6. `Button()` - 169 edges
7. `next` - 156 edges
8. `Card()` - 155 edges
9. `Badge()` - 150 edges
10. `Input()` - 125 edges

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

## Communities (174 total, 21 thin omitted)

### Community 0 - "start/page.tsx"
Cohesion: 0.53
Nodes (5): metadata, Start(), StartPage(), funnelLive(), funnelOpen()

### Community 1 - "filings/run.ts"
Cohesion: 0.08
Nodes (47): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+39 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (29): react-dom@19.3.0, react-dom, UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles (+21 more)

### Community 4 - "arap.ts"
Cohesion: 0.14
Nodes (21): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+13 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "gemini.ts"
Cohesion: 0.12
Nodes (16): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+8 more)

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
Cohesion: 0.09
Nodes (42): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+34 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (31): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+23 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (35): loadStatements(), FsLine, FsLineKey, isFsLine(), Section, Statement, add(), buildStatements() (+27 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.15
Nodes (42): Periods, periods(), buildSawt(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, addMonths() (+34 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "payroll/payroll.test.ts"
Cohesion: 0.12
Nodes (31): monthlyTable(), monthlyWithholding(), PayrollItem, sortItems(), employee(), entry(), fixtureContext(), ITEMS (+23 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "income.ts"
Cohesion: 0.10
Nodes (58): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+50 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "ui.ts"
Cohesion: 0.13
Nodes (29): blankLine(), InvoiceForm(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, BookingFields(), BooksChoices() (+21 more)

### Community 45 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 46 - "[id]/payroll/actions.ts"
Cohesion: 0.11
Nodes (42): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+34 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (39): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+31 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.14
Nodes (28): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+20 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "brand/page.tsx"
Cohesion: 0.14
Nodes (21): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), daysBetween(), expiryStatus() (+13 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.19
Nodes (15): RegisterLine, Adjustment, PeriodFile, MemoMonth, MonthActivity, Signoff, AssetTotals, LedgerTotals (+7 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.15
Nodes (27): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+19 more)

### Community 53 - "registrations/[id]/page.tsx"
Cohesion: 0.16
Nodes (30): StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+22 more)

### Community 54 - "lock-bar.tsx"
Cohesion: 0.17
Nodes (22): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+14 more)

### Community 55 - "getIdentity"
Cohesion: 0.13
Nodes (31): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+23 more)

### Community 56 - "year.ts"
Cohesion: 0.09
Nodes (44): GridRow, buildAlphalist(), Certificates2316, form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+36 more)

### Community 57 - "react"
Cohesion: 0.12
Nodes (24): react, InvoiceEdit(), PaymentsNewPage(), PaymentsEditPage(), PaymentsViewPage(), PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage(), PurchaseInvoicesListPage() (+16 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.08
Nodes (48): Split, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel() (+40 more)

### Community 59 - "ui.tsx"
Cohesion: 0.07
Nodes (80): BatchUpload(), PreviewTable(), ReleaseReportForm(), SetupForm(), DocReviewActions(), NewEmployee(), NewEmployeePage(), EmployeeForm() (+72 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.15
Nodes (26): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+18 more)

### Community 61 - "fees/[id]/page.tsx"
Cohesion: 0.07
Nodes (63): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+55 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.11
Nodes (28): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+20 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "cx"
Cohesion: 0.06
Nodes (52): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+44 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "alphalist.ts"
Cohesion: 0.12
Nodes (30): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+22 more)

### Community 68 - "vitest"
Cohesion: 0.12
Nodes (28): vitest, form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual (+20 more)

### Community 69 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 70 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (43): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+35 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.10
Nodes (41): BankAccountsRoute(), booksContext(), BooksContext, fmtDate(), fmtMonth(), one(), SearchParams, BooksList() (+33 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.16
Nodes (17): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput (+9 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.12
Nodes (23): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+15 more)

### Community 77 - "safeguards.ts"
Cohesion: 0.08
Nodes (39): TAX_TYPES, TaxType, CoverageClient, coverageGaps(), Gap, GapKind, Email, line() (+31 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "quote/page.tsx"
Cohesion: 0.06
Nodes (69): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage() (+61 more)

### Community 80 - "Card"
Cohesion: 0.28
Nodes (18): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+10 more)

### Community 81 - "portalContext"
Cohesion: 0.23
Nodes (15): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), PortalClient, portalContext(), Payroll() (+7 more)

### Community 82 - "requireStaff"
Cohesion: 0.14
Nodes (28): ClientReturnsPage(), FilingRow, Returns(), DashboardStats(), FilingListRow, FilingTable(), SignOffActions(), ActingNotice() (+20 more)

### Community 83 - "@remixicon/react"
Cohesion: 0.07
Nodes (31): @remixicon/react, ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+23 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.08
Nodes (55): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+47 more)

### Community 87 - "formatAmount"
Cohesion: 0.19
Nodes (18): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+10 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (27): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.09
Nodes (28): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.14
Nodes (22): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+14 more)

### Community 93 - "sidebar-toggle.tsx"
Cohesion: 0.18
Nodes (12): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+4 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.17
Nodes (26): EmployeeDetail(), EmployeePage(), GET(), certificatesFromRaw(), employeesForMonth(), loadEntries(), loadPriorEmployers(), payAccountsOf() (+18 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "supabaseServer"
Cohesion: 0.07
Nodes (42): nextConfig, next, ClientValues, EditClient(), EditClientPage(), postPayrollAction(), PostState, PostPayrollButton() (+34 more)

### Community 100 - "books.ts"
Cohesion: 0.10
Nodes (25): BOOK_ABBR, BOOK_KINDS, BOOK_TITLES, BookLine, Column, ColumnarBook, columnarBook(), ColumnarRow (+17 more)

### Community 101 - "manilaToday"
Cohesion: 0.10
Nodes (31): Detail(), StatementPage(), convertLeadAction(), LeadState, refresh(), sendProposalAction(), setFunnelOpenAction(), setLeadStatusAction() (+23 more)

### Community 102 - "[month]/page.tsx"
Cohesion: 0.18
Nodes (16): MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p() (+8 more)

### Community 103 - "items.ts"
Cohesion: 0.17
Nodes (14): PayrollSetupPage(), Setup(), loadPayrollSettings(), BirCategory, CATEGORIES, Category, CATEGORY_KEYS, DEDUCTION_FIELDS (+6 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+12 more)

### Community 106 - "requireOwner"
Cohesion: 0.12
Nodes (28): zod@^4.6.7, zod, FirmPage(), PLACES, Places(), StartBrandUpload, accountSchema, addPaymentAccountAction() (+20 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.11
Nodes (33): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+25 more)

### Community 109 - "LinkButton"
Cohesion: 0.14
Nodes (22): BooksFrame(), CustomersRoute(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), KINDS, PartyList() (+14 more)

### Community 110 - "cycle/actions.ts"
Cohesion: 0.22
Nodes (14): MonthComplete(), SentRow, TimelineRow, closeCycleAction(), confirmMonthAction(), CycleState, decideExceptionAction(), nothingToSubmitAction() (+6 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 113 - "Badge"
Cohesion: 0.15
Nodes (24): FormState, ClientForm(), frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm() (+16 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "ledger/data.ts"
Cohesion: 0.07
Nodes (51): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+43 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 118 - "cycle/page.tsx"
Cohesion: 0.10
Nodes (34): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), Home(), KINDS, manilaDay() (+26 more)

### Community 119 - "books/data.ts"
Cohesion: 0.11
Nodes (23): SettingsPage(), SettingsRoute(), AllocationRow, InvoiceLineRow, InvoiceRow, loadTaxCodes(), SettlementRow, appliesTo() (+15 more)

### Community 120 - "review/page.tsx"
Cohesion: 0.11
Nodes (29): DeadlinesPage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, TabKey, Queue(), ReviewPage() (+21 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.06
Nodes (52): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+44 more)

### Community 122 - "addDays"
Cohesion: 0.17
Nodes (22): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), addDays(), loadBoard() (+14 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (42): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+34 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "filings/[id]/page.tsx"
Cohesion: 0.13
Nodes (20): Event, eventText, Filing(), FilingPage(), paymentText, when(), PaymentCheck, ACTION_LABEL (+12 more)

### Community 126 - "memo.ts"
Cohesion: 0.21
Nodes (11): ReviewNote, Memo, MemoInput, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), SIGNED_REFS (+3 more)

### Community 127 - "profile.ts"
Cohesion: 0.14
Nodes (18): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), Expiry, ExpiryTone (+10 more)

### Community 128 - "steps.ts"
Cohesion: 0.14
Nodes (16): Agency, birForm(), BranchOptions, CaseStep, ClosureOptions, dayNumber(), EMPLOYER_STEPS, LGU_STEPS (+8 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "server-only"
Cohesion: 0.21
Nodes (13): server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, GenerateButton(), longDay(), ownerEmail() (+5 more)

### Community 131 - "documents/labels.ts"
Cohesion: 0.09
Nodes (37): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+29 more)

### Community 132 - "filings/actions.ts"
Cohesion: 0.19
Nodes (18): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+10 more)

### Community 133 - "review-form.tsx"
Cohesion: 0.09
Nodes (38): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DirectoryParty, ENTRY_STATUS (+30 more)

### Community 134 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 135 - "statement.ts"
Cohesion: 0.12
Nodes (20): Detail(), PayNow(), credit(), proofMethod, PrintButton(), statusBadge, FirmBlock, AllocationRow (+12 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.11
Nodes (31): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ApprovedTable(), BOOKED_TYPES (+23 more)

### Community 137 - "parties/actions.ts"
Cohesion: 0.18
Nodes (17): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), normalizeTin(), PARTY_COLUMNS (+9 more)

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.36
Nodes (8): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheckView(), StepForm(), today()

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.04
Nodes (18): pg, outDir, pkgDir, require, { version }, ctx, input, root (+10 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "apply.ts"
Cohesion: 0.16
Nodes (14): GET(), safe(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), previewOf(), RegisterPreview (+6 more)

### Community 144 - "2316/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 145 - "print/page.tsx"
Cohesion: 0.29
Nodes (10): BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad(), PrintButton(), taxableYearStart(), pageBook() (+2 more)

### Community 146 - "brand/actions.ts"
Cohesion: 0.19
Nodes (14): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+6 more)

### Community 147 - "ocr/run.ts"
Cohesion: 0.30
Nodes (10): GET(), runActingDigest(), runDocumentCycles(), ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, lookupParties() (+2 more)

### Community 148 - "pending-review.tsx"
Cohesion: 0.14
Nodes (16): BulkState, Booking, Codes, initialCodes(), ocrKeys(), PendingReview(), PendingRow, PendingTaxCodes (+8 more)

### Community 149 - "PageHeader"
Cohesion: 0.35
Nodes (10): ClientList(), ClientsPage(), SectionTabs(), one(), PartiesPage(), PartyList(), Row, Requests() (+2 more)

### Community 151 - "books-ready.ts"
Cohesion: 0.35
Nodes (8): filingsBooksReady(), BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked(), booksReadyMap(), keepBooksReady()

### Community 152 - "books/export/route.ts"
Cohesion: 0.36
Nodes (8): dayBefore(), GET(), safe(), fromWorkbookData(), BookKind, buildBookWorkbook(), loadBookEntries(), PrintBook

### Community 153 - "money.ts"
Cohesion: 0.36
Nodes (6): incomePayment(), applyRate(), basisPoints(), grossUp(), grouped, sum()

### Community 154 - "templatePayload"
Cohesion: 0.12
Nodes (9): templatePayload(), as(), client(), root, root, as(), books(), root (+1 more)

### Community 155 - "spinner.tsx"
Cohesion: 0.32
Nodes (7): PendingGlyph(), Arc(), SIZES, Spinner(), SpinnerGlyph(), SpinnerProps, SpinnerSize

### Community 156 - "clients/actions.ts"
Cohesion: 0.10
Nodes (29): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction() (+21 more)

### Community 157 - "acting/run.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 158 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 159 - "index.ts"
Cohesion: 0.10
Nodes (19): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+11 more)

### Community 160 - "Centavos"
Cohesion: 0.11
Nodes (25): EntryLineOut, ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine (+17 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.15
Nodes (12): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+4 more)

### Community 162 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 163 - "invoice-pages.tsx"
Cohesion: 0.15
Nodes (19): InvoiceFormValue, INVOICE_KINDS, InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesViewPage(), TransactionJournal() (+11 more)

### Community 164 - "cycle/run.ts"
Cohesion: 0.43
Nodes (5): cycleMessage(), dayFmt, NoticeKind, showDay(), Due

### Community 165 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 166 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 167 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 168 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 169 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 170 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 172 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1136 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `start/page.tsx`, `checkbox.tsx`, `server-only`, `documents/labels.ts`, `notification.tsx`, `package.json`, `binder/page.tsx`, `review-form.tsx`, `app/documents/page.tsx`, `statement.ts`, `sign-off-actions.tsx`, `registrations/forms.tsx`, `onboarding/page.tsx`, `dependencies`, `2316/page.tsx`, `print/page.tsx`, `statements.ts`, `pending-review.tsx`, `PageHeader`, `spinner.tsx`, `invoice-pages.tsx`, `scores/page.tsx`, `ui.ts`, `social-button.tsx`, `[id]/payroll/actions.ts`, `modal.tsx`, `lib/books/actions.ts`, `brand/page.tsx`, `deadlines/page.tsx`, `registrations/[id]/page.tsx`, `lock-bar.tsx`, `getIdentity`, `ui.tsx`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `workpapers/page.tsx`, `tabs.tsx`, `cx`, `file-upload.tsx`, `books/forms.tsx`, `module-pages.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `quote/page.tsx`, `Card`, `portalContext`, `requireStaff`, `@remixicon/react`, `cx.ts`, `[clientId]/page.tsx`, `formatAmount`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `sidebar-toggle.tsx`, `payroll/data.ts`, `supabaseServer`, `manilaToday`, `[month]/page.tsx`, `items.ts`, `requireOwner`, `parties/[id]/page.tsx`, `LinkButton`, `cycle/actions.ts`, `fixed-assets/page.tsx`, `Badge`, `ledger/data.ts`, `staff/page.tsx`, `cycle/page.tsx`, `books/data.ts`, `review/page.tsx`, `returns/load.ts`, `addDays`, `batch/register.ts`, `filings/[id]/page.tsx`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08007013442431327 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `filings/run.ts`, `arap.ts`, `package.json`, `review-form.tsx`, `gemini.ts`, `app/documents/page.tsx`, `ledger.test.ts`, `ref_node_fs`, `settings/actions.ts`, `onboarding/page.tsx`, `registrations/forms.tsx`, `statements.ts`, `pending-review.tsx`, `fees.test.ts`, `books-ready.ts`, `money.ts`, `templatePayload`, `clients/actions.ts`, `acting/run.ts`, `index.ts`, `Centavos`, `workpapers.test.ts`, `invoice-pages.tsx`, `cycle/run.ts`, `names.ts`, `portal-billing.test.ts`, `books-migration.test.ts`, `payroll/payroll.test.ts`, `scores/page.tsx`, `tests/books.test.ts`, `tests/parties.test.ts`, `ui.ts`, `social-button.tsx`, `client-reports.test.ts`, `register-books.test.ts`, `tests/register.test.ts`, `brand/page.tsx`, `workpapers/load.ts`, `deadlines/page.tsx`, `registrations/[id]/page.tsx`, `lock-bar.tsx`, `getIdentity`, `year.ts`, `returns/types.ts`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `fixed-assets.test.ts`, `workpapers/page.tsx`, `funnel.test.ts`, `opening-checklist.tsx`, `safeguards.ts`, `quote/page.tsx`, `[clientId]/page.tsx`, `document-scanner.tsx`, `opening.ts`, `supabaseServer`, `books.ts`, `manilaToday`, `[month]/page.tsx`, `rates.ts`, `parties/[id]/page.tsx`, `db.test.ts`, `fixed-assets/page.tsx`, `acting-approver.test.ts`, `ledger/data.ts`, `cycle/page.tsx`, `books/data.ts`, `review/page.tsx`, `returns/load.ts`, `batch/register.ts`, `filings/[id]/page.tsx`, `memo.ts`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `start/page.tsx`, `server-only`, `documents/labels.ts`, `filings/actions.ts`, `package.json`, `binder/page.tsx`, `review-form.tsx`, `app/documents/page.tsx`, `parties/actions.ts`, `sign-off-actions.tsx`, `registrations/forms.tsx`, `statement.ts`, `onboarding/page.tsx`, `settings/actions.ts`, `dependencies`, `apply.ts`, `print/page.tsx`, `2316/page.tsx`, `ocr/run.ts`, `pending-review.tsx`, `PageHeader`, `brand/actions.ts`, `proxy.ts`, `books/export/route.ts`, `clients/actions.ts`, `invoice-pages.tsx`, `scores/page.tsx`, `social-button.tsx`, `[id]/payroll/actions.ts`, `modal.tsx`, `lib/books/actions.ts`, `brand/page.tsx`, `deadlines/page.tsx`, `registrations/[id]/page.tsx`, `lock-bar.tsx`, `getIdentity`, `ui.tsx`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `workpapers/page.tsx`, `cx`, `books/forms.tsx`, `module-pages.tsx`, `opening-checklist.tsx`, `quote/page.tsx`, `Card`, `portalContext`, `requireStaff`, `[clientId]/page.tsx`, `formatAmount`, `app/app/layout.tsx`, `form-2316.tsx`, `sidebar-toggle.tsx`, `payroll/data.ts`, `manilaToday`, `[month]/page.tsx`, `requireOwner`, `parties/[id]/page.tsx`, `LinkButton`, `cycle/actions.ts`, `fixed-assets/page.tsx`, `Badge`, `ledger/data.ts`, `cycle/page.tsx`, `review/page.tsx`, `returns/load.ts`, `addDays`, `batch/register.ts`, `filings/[id]/page.tsx`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07661290322580645 - nodes in this community are weakly interconnected._