# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 664 files · ~507,841 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 4158 nodes · 14274 edges · 183 communities (162 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 120 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `14c17fdc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- manilaToday
- filings/run.ts
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- fields.ts
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
- settlement-pages.tsx
- social-button.tsx
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- profile.ts
- workpapers/load.ts
- deadlines/page.tsx
- Badge
- quote/page.tsx
- app/requests/page.tsx
- year.ts
- react
- money.ts
- Notice
- app/settings/page.tsx
- public.ts
- fixed-assets.test.ts
- workpapers/page.tsx
- cx
- select.tsx
- Apple Design
- alphalist.ts
- testing.ts
- file-upload.tsx
- funnel.test.ts
- books/forms.tsx
- books/page.tsx
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- safeguards-load.ts
- theme-toggle.tsx
- fees/types.ts
- Card
- client-form.tsx
- requireStaff
- button.tsx
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
- ledger/types.ts
- Recipes
- payroll/data.ts
- BoardUI theming reference
- Pro templates
- supabaseServer
- print/page.tsx
- leads/[id]/page.tsx
- toCentavos
- fees/[id]/page.tsx
- boardui
- rates.ts
- payment-forms.tsx
- parties/[id]/page.tsx
- db.test.ts
- LinkButton
- showMonth
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- clients/[id]/page.tsx
- acting-approver.test.ts
- ledger/data.ts
- staff/page.tsx
- apply-migrations.sh
- portal/page.tsx
- module-pages.tsx
- review/page.tsx
- returns/load.ts
- addDays
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- filings/[id]/page.tsx
- memo.ts
- cycle/page.tsx
- portal/documents/page.tsx
- checkbox.tsx
- server-only
- documents/labels.ts
- filings/actions.ts
- review-form.tsx
- binder/page.tsx
- @remixicon/react
- app/documents/page.tsx
- parties/actions.ts
- sign-off-actions.tsx
- ledger.test.ts
- ref_node_fs
- settings/actions.ts
- proxy.ts
- batch/load.ts
- 2316/page.tsx
- showDate
- engine.ts
- gap/page.tsx
- proof-upload.tsx
- PageHeader
- vitest
- collections.ts
- morning.ts
- safeguards.ts
- any-cutoff.test.ts
- staff/actions.ts
- clients/actions.ts
- requireOwner
- BoardUI page patterns
- index.ts
- Centavos
- Rework: one flow from lead to year-end
- documents/[id]/page.tsx
- invoice-pages.tsx
- leads/actions.ts
- dates.ts
- portal-billing.test.ts
- books-migration.test.ts
- tests/books.test.ts
- seed.ts
- batch/forms.tsx
- tests/parties.test.ts
- approval-memo.tsx
- fees/page.tsx
- xlsx.ts
- sign-in-form.tsx
- business.ts
- copy-opencv.mjs
- ledger-lock.test.ts
- leads-pipeline.test.ts
- accept-form.tsx
- ledger-closing.test.ts
- ledger-documents.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 271 edges
2. `Skeleton()` - 202 edges
3. `react` - 202 edges
4. `cx` - 196 edges
5. `Notice()` - 193 edges
6. `Button()` - 174 edges
7. `Card()` - 157 edges
8. `next` - 157 edges
9. `Badge()` - 150 edges
10. `Input()` - 126 edges

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

## Communities (183 total, 21 thin omitted)

### Community 0 - "manilaToday"
Cohesion: 0.18
Nodes (16): metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage(), Lines(), longDate() (+8 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.14
Nodes (21): TimelineFiling, TimelineItem, IsoDate, EfpsGroup, FilingChannel, FilingInstance, Period, PeriodFilter (+13 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): react-dom@19.3.0, react-dom, AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "fields.ts"
Cohesion: 0.07
Nodes (36): ok, FieldKey, keys, normalizeAmount(), normalizeFields(), normalizePartyKind(), normalizeTerms(), normalizeTin() (+28 more)

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
Cohesion: 0.07
Nodes (58): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+50 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (29): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+21 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (39): CASH_FLOW_CLASSES, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section (+31 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.12
Nodes (48): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments(), Periods (+40 more)

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
Nodes (31): file(), GET(), safe(), GET(), employeesForMonth(), buildEmployeeTemplate(), DEFAULT_ITEMS, PayrollItem (+23 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "income.ts"
Cohesion: 0.11
Nodes (58): BirLineKey, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+50 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "settlement-pages.tsx"
Cohesion: 0.13
Nodes (28): PaymentsListPage(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, Kind, Props, SETTLEMENT_KINDS (+20 more)

### Community 45 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (54): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+46 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (32): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+24 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (68): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+60 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (21): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MemoMonth (+13 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 53 - "Badge"
Cohesion: 0.16
Nodes (32): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+24 more)

### Community 54 - "quote/page.tsx"
Cohesion: 0.13
Nodes (25): PriceRow, COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+17 more)

### Community 55 - "app/requests/page.tsx"
Cohesion: 0.18
Nodes (20): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+12 more)

### Community 56 - "year.ts"
Cohesion: 0.10
Nodes (40): Certificates2316, form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear(), Payroll2316Raw, period2316() (+32 more)

### Community 57 - "react"
Cohesion: 0.09
Nodes (31): react, CustomersRoute(), EmployeesRoute(), InvoiceEdit(), Employees(), PaymentsNewPage(), PaymentsEditPage(), PaymentsViewPage() (+23 more)

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (53): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), ewtLines() (+45 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (71): setupMissingChartsAction(), ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker() (+63 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.20
Nodes (15): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote, Rule, SettingsPage() (+7 more)

### Community 61 - "public.ts"
Cohesion: 0.12
Nodes (24): zod, dateFmt, Supabase, requestQuoteAction(), SERVICES, StartState, QuerySource, conditionsSchema (+16 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.18
Nodes (20): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+12 more)

### Community 64 - "cx"
Cohesion: 0.06
Nodes (42): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, InputOtp(), InputOtpProps, Kbd() (+34 more)

### Community 65 - "select.tsx"
Cohesion: 0.07
Nodes (40): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+32 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "alphalist.ts"
Cohesion: 0.10
Nodes (35): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+27 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 70 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 71 - "books/forms.tsx"
Cohesion: 0.12
Nodes (46): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+38 more)

### Community 72 - "books/page.tsx"
Cohesion: 0.09
Nodes (35): BankAccountsRoute(), booksContext(), BooksContext, fmtMonth(), one(), SearchParams, BooksFrame(), BooksList() (+27 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.15
Nodes (18): Access, STATUS, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, ChecklistInput, ChecklistItem (+10 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (37): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+29 more)

### Community 77 - "safeguards-load.ts"
Cohesion: 0.21
Nodes (14): TAX_TYPES, TaxType, CoverageClient, coverageGaps(), Gap, GapKind, BoardRow, FilingRow (+6 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "fees/types.ts"
Cohesion: 0.08
Nodes (33): items, PRICES, schedule, settings, count(), first(), pick(), profileFromQuery() (+25 more)

### Community 80 - "Card"
Cohesion: 0.32
Nodes (16): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+8 more)

### Community 81 - "client-form.tsx"
Cohesion: 0.16
Nodes (18): FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), addBranchAction(), BranchState, errors() (+10 more)

### Community 82 - "requireStaff"
Cohesion: 0.14
Nodes (26): DashboardStats(), FilingTable(), recomputeWorksheetAction(), WorksheetState, GET(), Lines(), lineStyle, Problems() (+18 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.19
Nodes (21): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+13 more)

### Community 87 - "formatAmount"
Cohesion: 0.18
Nodes (19): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+11 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (27): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.09
Nodes (30): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+22 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 93 - "sidebar-toggle.tsx"
Cohesion: 0.18
Nodes (12): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+4 more)

### Community 94 - "ledger/types.ts"
Cohesion: 0.14
Nodes (20): CashFlowClass, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload() (+12 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.19
Nodes (22): EmployeeDetail(), EmployeePage(), certificatesFromRaw(), loadEntries(), loadPriorEmployers(), payAccountsOf(), PayrollClient, PayrollSettings (+14 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "supabaseServer"
Cohesion: 0.07
Nodes (46): nextConfig, next, EditClient(), EditClientPage(), addClientNoteAction(), NoteState, postPayrollAction(), PostState (+38 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (43): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+35 more)

### Community 101 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (41): NotesCard(), ClientNoteForm(), ConvertForm(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), Person, ProposalForm() (+33 more)

### Community 102 - "toCentavos"
Cohesion: 0.10
Nodes (41): previewRegisterAction(), saveMonthAction(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p() (+33 more)

### Community 103 - "fees/[id]/page.tsx"
Cohesion: 0.19
Nodes (22): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+14 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.24
Nodes (17): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+9 more)

### Community 106 - "payment-forms.tsx"
Cohesion: 0.20
Nodes (22): PaymentSettings(), accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction() (+14 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (36): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName() (+28 more)

### Community 109 - "LinkButton"
Cohesion: 0.20
Nodes (14): Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS, JournalEntryRoute() (+6 more)

### Community 110 - "showMonth"
Cohesion: 0.42
Nodes (9): closeCycleAction(), confirmMonthAction(), decideExceptionAction(), nothingToSubmitAction(), refresh(), tellPreparer(), text(), undoMonthAction() (+1 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 113 - "clients/[id]/page.tsx"
Cohesion: 0.14
Nodes (21): removeAssignmentAction(), ClientTab, ClientTabs(), UNDER, RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage() (+13 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "ledger/data.ts"
Cohesion: 0.10
Nodes (36): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), OpeningChecklist(), AMENDMENT_BADGE (+28 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 118 - "portal/page.tsx"
Cohesion: 0.17
Nodes (19): PortalClient, MonthComplete(), SentRow, TimelineRow, Home(), KINDS, manilaDay(), MonthCard() (+11 more)

### Community 119 - "module-pages.tsx"
Cohesion: 0.10
Nodes (37): blankLine(), InvoiceForm(), INVOICE_LABEL, Props, SettingsPage(), SettingsRoute(), TransactionJournal(), loadTaxCodes() (+29 more)

### Community 120 - "review/page.tsx"
Cohesion: 0.12
Nodes (27): Queue(), ReviewPage(), Row, Section(), ActingState, appointActingAction(), endActingAction(), refresh() (+19 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.08
Nodes (40): FinancialStatements, ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), Split, VatData, EwtLine (+32 more)

### Community 122 - "addDays"
Cohesion: 0.18
Nodes (18): loadAssets(), addDays(), holidaySet(), loadBoard(), lastMonth(), loadMyWork(), MyWork, plural() (+10 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.15
Nodes (16): accountLabel(), BatchCheck, BatchColumn, BatchRow, centavosOf(), checkRow(), findAccount(), isoDate() (+8 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "filings/[id]/page.tsx"
Cohesion: 0.11
Nodes (23): Event, eventText, Filing(), FilingPage(), paymentText, when(), PaymentCheck, SignOffActions() (+15 more)

### Community 126 - "memo.ts"
Cohesion: 0.21
Nodes (11): ReviewNote, Memo, MemoInput, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), SIGNED_REFS (+3 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.20
Nodes (16): Cycle(), CyclePage(), CycleWithClient, DocRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+8 more)

### Community 128 - "portal/documents/page.tsx"
Cohesion: 0.16
Nodes (17): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+9 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "server-only"
Cohesion: 0.12
Nodes (25): server-only, @supabase/supabase-js, GET(), GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage() (+17 more)

### Community 131 - "documents/labels.ts"
Cohesion: 0.15
Nodes (21): DocumentsCard(), when(), DocumentUpload(), send(), upload(), Item, typeFromName(), ALLOWED (+13 more)

### Community 132 - "filings/actions.ts"
Cohesion: 0.18
Nodes (15): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+7 more)

### Community 133 - "review-form.tsx"
Cohesion: 0.08
Nodes (41): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+33 more)

### Community 134 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 135 - "@remixicon/react"
Cohesion: 0.11
Nodes (31): @remixicon/react, Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref() (+23 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (23): loadBooking(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+15 more)

### Community 137 - "parties/actions.ts"
Cohesion: 0.19
Nodes (18): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), runOcr(), SKIP, lookupParties() (+10 more)

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.31
Nodes (9): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheckView(), StepForm() (+1 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.06
Nodes (13): pg, ctx, input, root, root, root, root, root (+5 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.22
Nodes (14): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), periodWord (+6 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "batch/load.ts"
Cohesion: 0.27
Nodes (9): GET(), safe(), loadAccounts(), loadBatchContext(), monthsBetween(), BatchContext, dupKey(), buildBatchTemplate() (+1 more)

### Community 144 - "2316/page.tsx"
Cohesion: 0.32
Nodes (11): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Set(), Form2316Sheet() (+3 more)

### Community 145 - "showDate"
Cohesion: 0.21
Nodes (15): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), FilingListRow, PortalReturns() (+7 more)

### Community 146 - "engine.ts"
Cohesion: 0.24
Nodes (16): compareIso(), lastDayOfMonth(), DeadlineRule, fiscalYearOf(), followsCalendarYear(), generateFilingInstances(), nextWorkingDay(), Obligation (+8 more)

### Community 147 - "gap/page.tsx"
Cohesion: 0.20
Nodes (16): ClientValues, loadSchedules(), loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile (+8 more)

### Community 148 - "proof-upload.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 149 - "PageHeader"
Cohesion: 0.17
Nodes (19): ClientList(), ClientsPage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey (+11 more)

### Community 150 - "vitest"
Cohesion: 0.13
Nodes (4): vitest, root, root, root

### Community 151 - "collections.ts"
Cohesion: 0.23
Nodes (15): ageOpenItems(), AGING_BUCKETS, AgingBucket, agingBucket(), daysPastDue(), describeBillingDays(), fromCents(), groupPaidItems() (+7 more)

### Community 152 - "morning.ts"
Cohesion: 0.17
Nodes (15): Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board (+7 more)

### Community 153 - "safeguards.ts"
Cohesion: 0.24
Nodes (12): documentCutoff(), DONE_FROM_STATUS, isWorkingDay(), riskOf(), STEP_LABELS, StepKey, stepsFor(), march1601C() (+4 more)

### Community 154 - "any-cutoff.test.ts"
Cohesion: 0.50
Nodes (3): as(), client(), root

### Community 155 - "staff/actions.ts"
Cohesion: 0.24
Nodes (12): addClientUserAction(), fieldErrors(), inviteStaffAction(), removeClientUserAction(), updateStaffAction(), ensureLogin(), clientUserSchema, email (+4 more)

### Community 156 - "clients/actions.ts"
Cohesion: 0.13
Nodes (24): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), updateClientAction(), obligationChanges(), obligationsForTaxTypes() (+16 more)

### Community 157 - "requireOwner"
Cohesion: 0.36
Nodes (13): addChargeAction(), applyCreditAction(), date, depositSchema, peso, recordDepositAction(), refresh(), runBillingAction() (+5 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 159 - "index.ts"
Cohesion: 0.10
Nodes (16): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+8 more)

### Community 160 - "Centavos"
Cohesion: 0.08
Nodes (32): client(), CheckedRegister, NewEmployeeRow, ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr() (+24 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "documents/[id]/page.tsx"
Cohesion: 0.24
Nodes (10): BOOKED_TYPES, DocumentReviewPage(), PayrollDocument(), Review(), LOCKED_STATUSES, LockFiling, lockingFiling(), checkFields() (+2 more)

### Community 163 - "invoice-pages.tsx"
Cohesion: 0.14
Nodes (22): fmtDate(), InvoiceFormValue, INVOICE_KINDS, InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE (+14 more)

### Community 164 - "leads/actions.ts"
Cohesion: 0.34
Nodes (13): PLACES, assignReviewerAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+5 more)

### Community 165 - "dates.ts"
Cohesion: 0.39
Nodes (9): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff() (+1 more)

### Community 166 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 167 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 168 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 169 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 170 - "batch/forms.tsx"
Cohesion: 0.44
Nodes (7): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), BatchKind, checkBatch()

### Community 172 - "approval-memo.tsx"
Cohesion: 0.31
Nodes (7): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, grossSales(), approvalMemo()

### Community 173 - "fees/page.tsx"
Cohesion: 0.36
Nodes (8): longDate(), nextEffectiveDate(), statusLabel, statusTone, CreateFromTemplateForm(), StartNewVersionForm(), FeeSchedulePage(), Schedules()

### Community 174 - "xlsx.ts"
Cohesion: 0.31
Nodes (8): BATCH_COLUMNS, BATCH_KINDS, BatchAccount, cellText(), MAX_ROWS, norm(), readBatch(), sheetName()

### Community 175 - "sign-in-form.tsx"
Cohesion: 0.43
Nodes (6): errors, Form(), LoginPage(), SignInForm(), Divider(), SocialButton()

### Community 176 - "business.ts"
Cohesion: 0.25
Nodes (7): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q

### Community 177 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 179 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 180 - "accept-form.tsx"
Cohesion: 0.70
Nodes (3): acceptProposalAction(), AcceptState, contentHash()

### Community 181 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1149 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `portal/documents/page.tsx`, `manilaToday`, `server-only`, `documents/labels.ts`, `filings/actions.ts`, `package.json`, `binder/page.tsx`, `@remixicon/react`, `review-form.tsx`, `app/documents/page.tsx`, `sign-off-actions.tsx`, `parties/actions.ts`, `registrations/forms.tsx`, `onboarding/page.tsx`, `settings/actions.ts`, `dependencies`, `batch/load.ts`, `2316/page.tsx`, `showDate`, `gap/page.tsx`, `proof-upload.tsx`, `PageHeader`, `proxy.ts`, `staff/actions.ts`, `clients/actions.ts`, `requireOwner`, `documents/[id]/page.tsx`, `invoice-pages.tsx`, `leads/actions.ts`, `payroll/payroll.test.ts`, `scores/page.tsx`, `batch/forms.tsx`, `settlement-pages.tsx`, `approval-memo.tsx`, `payroll/forms.tsx`, `fees/page.tsx`, `lib/books/actions.ts`, `profile.ts`, `deadlines/page.tsx`, `Badge`, `quote/page.tsx`, `app/requests/page.tsx`, `accept-form.tsx`, `react`, `Notice`, `app/settings/page.tsx`, `workpapers/page.tsx`, `cx`, `books/forms.tsx`, `books/page.tsx`, `opening-checklist.tsx`, `Card`, `client-form.tsx`, `requireStaff`, `[clientId]/page.tsx`, `formatAmount`, `app/app/layout.tsx`, `form-2316.tsx`, `sidebar-toggle.tsx`, `payroll/data.ts`, `print/page.tsx`, `leads/[id]/page.tsx`, `toCentavos`, `fees/[id]/page.tsx`, `payment-forms.tsx`, `parties/[id]/page.tsx`, `LinkButton`, `showMonth`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `ledger/data.ts`, `portal/page.tsx`, `module-pages.tsx`, `review/page.tsx`, `filings/[id]/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14245014245014245 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `filings/run.ts`, `server-only`, `arap.ts`, `package.json`, `review-form.tsx`, `fields.ts`, `app/documents/page.tsx`, `filings/actions.ts`, `registrations/forms.tsx`, `ref_node_fs`, `settings/actions.ts`, `onboarding/page.tsx`, `ledger.test.ts`, `statements.ts`, `engine.ts`, `collections.ts`, `morning.ts`, `safeguards.ts`, `any-cutoff.test.ts`, `staff/actions.ts`, `clients/actions.ts`, `index.ts`, `Centavos`, `documents/[id]/page.tsx`, `invoice-pages.tsx`, `dates.ts`, `portal-billing.test.ts`, `books-migration.test.ts`, `payroll/payroll.test.ts`, `scores/page.tsx`, `tests/books.test.ts`, `tests/parties.test.ts`, `approval-memo.tsx`, `lib/books/actions.ts`, `profile.ts`, `workpapers/load.ts`, `deadlines/page.tsx`, `leads-pipeline.test.ts`, `ledger-closing.test.ts`, `app/requests/page.tsx`, `year.ts`, `ledger-documents.test.ts`, `money.ts`, `ledger-lock.test.ts`, `app/settings/page.tsx`, `fixed-assets.test.ts`, `testing.ts`, `funnel.test.ts`, `books/forms.tsx`, `opening-checklist.tsx`, `safeguards-load.ts`, `fees/types.ts`, `client-form.tsx`, `document-scanner.tsx`, `ledger/types.ts`, `supabaseServer`, `print/page.tsx`, `leads/[id]/page.tsx`, `toCentavos`, `fees/[id]/page.tsx`, `rates.ts`, `parties/[id]/page.tsx`, `db.test.ts`, `fixed-assets/page.tsx`, `acting-approver.test.ts`, `portal/page.tsx`, `module-pages.tsx`, `review/page.tsx`, `returns/load.ts`, `batch/register.ts`, `filings/[id]/page.tsx`, `memo.ts`, `cycle/page.tsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `manilaToday`, `notification.tsx`, `package.json`, `registrations/forms.tsx`, `onboarding/page.tsx`, `dependencies`, `statements.ts`, `scores/page.tsx`, `settlement-pages.tsx`, `social-button.tsx`, `payroll/forms.tsx`, `modal.tsx`, `lib/books/actions.ts`, `profile.ts`, `deadlines/page.tsx`, `Badge`, `quote/page.tsx`, `app/requests/page.tsx`, `Notice`, `app/settings/page.tsx`, `workpapers/page.tsx`, `cx`, `select.tsx`, `file-upload.tsx`, `books/forms.tsx`, `books/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `Card`, `client-form.tsx`, `requireStaff`, `button.tsx`, `cx.ts`, `[clientId]/page.tsx`, `formatAmount`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `sidebar-toggle.tsx`, `payroll/data.ts`, `supabaseServer`, `print/page.tsx`, `leads/[id]/page.tsx`, `toCentavos`, `fees/[id]/page.tsx`, `payment-forms.tsx`, `parties/[id]/page.tsx`, `LinkButton`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `ledger/data.ts`, `staff/page.tsx`, `portal/page.tsx`, `module-pages.tsx`, `review/page.tsx`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `portal/documents/page.tsx`, `checkbox.tsx`, `server-only`, `documents/labels.ts`, `review-form.tsx`, `binder/page.tsx`, `@remixicon/react`, `app/documents/page.tsx`, `sign-off-actions.tsx`, `settings/actions.ts`, `2316/page.tsx`, `showDate`, `gap/page.tsx`, `proof-upload.tsx`, `PageHeader`, `documents/[id]/page.tsx`, `invoice-pages.tsx`, `batch/forms.tsx`, `fees/page.tsx`, `sign-in-form.tsx`, `accept-form.tsx`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07816091954022988 - nodes in this community are weakly interconnected._