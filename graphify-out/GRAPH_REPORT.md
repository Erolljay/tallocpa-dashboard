# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 652 files · ~495,791 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 4086 nodes · 14026 edges · 171 communities (150 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 119 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `07be04f9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [token]/page.tsx
- addDays
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- ui.tsx
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
- register-xlsx.ts
- scores/page.tsx
- income.ts
- payroll/types.ts
- ui.ts
- sign-in-form.tsx
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- brand/page.tsx
- workpapers/load.ts
- deadlines/page.tsx
- steps.ts
- [employeeId]/page.tsx
- getIdentity
- payroll/payroll.test.ts
- settlement-pages.tsx
- money.ts
- Notice
- settings/page.tsx
- Card
- fixed-assets.test.ts
- review-forms.tsx
- tabs.tsx
- cx
- Apple Design
- Centavos
- testing.ts
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
- quote.ts
- percentage.ts
- ledger/data.ts
- Badge
- button.tsx
- Pro components
- cx.ts
- [clientId]/page.tsx
- books/reports/page.tsx
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- brand/forms.tsx
- opening.ts
- Recipes
- payroll/data.ts
- BoardUI theming reference
- Pro templates
- next
- print/page.tsx
- leads/[id]/page.tsx
- formatAmount
- payroll/payroll.test.ts
- boardui
- rates.ts
- proof-upload.tsx
- parties/[id]/page.tsx
- db.test.ts
- react
- fees/forms.tsx
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- registrations/forms.tsx
- acting-approver.test.ts
- tools/page.tsx
- staff/page.tsx
- apply-migrations.sh
- cycle/page.tsx
- tax-codes.ts
- filings/[id]/page.tsx
- source.ts
- work/load.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- memo.ts
- profile.ts
- formatAmount
- checkbox.tsx
- safeguards-load.ts
- app/documents/page.tsx
- filings/actions.ts
- fields.ts
- binder/page.tsx
- statement-view.tsx
- filters.tsx
- ocr/run.ts
- sign-off-actions.tsx
- ledger.test.ts
- vitest
- social-button.tsx
- proxy.ts
- xlsx.ts
- FormModule
- ledger-lock.test.ts
- brand/actions.ts
- returns/load.ts
- bulk-actions.ts
- batch/actions.ts
- ref_node_fs
- fixed-assets/forms.tsx
- seed.ts
- loadAccounts
- templatePayload
- Lockup
- supabaseServer
- server-only
- BoardUI page patterns
- index.ts
- parts.ts
- Rework: one flow from lead to year-end
- workpapers.test.ts
- invoice-pages.tsx
- portal/requests/[id]/page.tsx
- names.ts
- month-complete.test.ts
- books-migration.test.ts
- tests/books.test.ts
- register-books.test.ts
- adjustments.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 262 edges
2. `Skeleton()` - 201 edges
3. `react` - 201 edges
4. `Notice()` - 192 edges
5. `cx` - 190 edges
6. `Button()` - 168 edges
7. `next` - 155 edges
8. `Card()` - 153 edges
9. `Badge()` - 148 edges
10. `Input()` - 124 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `approved()` --indirect_call--> `client()`  [INFERRED]
  supabase/tests/register-books.test.ts → src/lib/deadlines/coverage.test.ts
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

## Communities (171 total, 21 thin omitted)

### Community 0 - "[token]/page.tsx"
Cohesion: 0.18
Nodes (13): AcceptForm(), AcceptState, metadata, Proposal(), ProposalPage(), StartState, php, StartForm() (+5 more)

### Community 1 - "addDays"
Cohesion: 0.11
Nodes (38): PlannedObligation, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), DeadlineRule, EfpsGroup, FilingChannel (+30 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+12 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "gemini.ts"
Cohesion: 0.12
Nodes (17): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+9 more)

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

### Community 11 - "ui.tsx"
Cohesion: 0.13
Nodes (13): DocReviewActions(), NewParty(), NewPartyPage(), ReplyForm(), YearSelect(), buttonClass(), ButtonStyle, control (+5 more)

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
Cohesion: 0.10
Nodes (20): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+12 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (37): CASH_FLOW_CLASSES, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section (+29 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.12
Nodes (48): lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments() (+40 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "register-xlsx.ts"
Cohesion: 0.14
Nodes (23): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), CheckedRegister, checkRegister(), fmt(), ID_HEADERS (+15 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.06
Nodes (55): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+47 more)

### Community 42 - "income.ts"
Cohesion: 0.13
Nodes (33): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+25 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "ui.ts"
Cohesion: 0.10
Nodes (38): blankLine(), InvoiceForm(), InvoiceFormValue, Booking, BookingFields(), DirectoryParty, ENTRY_STATUS, ONLY_FOR (+30 more)

### Community 45 - "sign-in-form.tsx"
Cohesion: 0.22
Nodes (12): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+4 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (46): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+38 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (63): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+55 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "brand/page.tsx"
Cohesion: 0.14
Nodes (21): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), daysBetween(), expiryStatus() (+13 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.20
Nodes (17): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+9 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 53 - "steps.ts"
Cohesion: 0.05
Nodes (80): ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openYearRenewalsAction(), CompleteButton(), StepBadge() (+72 more)

### Community 54 - "[employeeId]/page.tsx"
Cohesion: 0.39
Nodes (6): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), payAccountsOf(), EMPLOYEE_COLUMNS

### Community 55 - "getIdentity"
Cohesion: 0.19
Nodes (18): ExplainForm(), NewRequestForm(), TicketForm(), ReplyForm(), send(), Textarea(), shrinkImage(), closeRequestAction() (+10 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (49): buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+41 more)

### Community 57 - "settlement-pages.tsx"
Cohesion: 0.09
Nodes (33): PaymentsNewPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), ReceiptsViewPage(), fmt(), OpenInvoice, SettlementForm() (+25 more)

### Community 58 - "money.ts"
Cohesion: 0.06
Nodes (62): tinDashed(), incomePayment(), Split, VatData, agentLines(), agentProblems(), amountText(), emptyResult() (+54 more)

### Community 59 - "Notice"
Cohesion: 0.11
Nodes (61): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+53 more)

### Community 60 - "settings/page.tsx"
Cohesion: 0.14
Nodes (19): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote, Rule, describeDue() (+11 more)

### Community 61 - "Card"
Cohesion: 0.08
Nodes (65): sendProposalAction(), activateAction(), createFromTemplateAction(), deleteDraftAction(), newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+57 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "review-forms.tsx"
Cohesion: 0.16
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+14 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.06
Nodes (41): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, InputOtp(), InputOtpProps, Kbd() (+33 more)

### Community 65 - "cx"
Cohesion: 0.08
Nodes (37): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+29 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "Centavos"
Cohesion: 0.14
Nodes (26): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+18 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 70 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (37): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+29 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.17
Nodes (31): BankAccountsRoute(), booksContext(), BooksContext, fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame() (+23 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.17
Nodes (15): Access, STATUS, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput, ChecklistItem, ItemStatus (+7 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.10
Nodes (27): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+19 more)

### Community 77 - "safeguards.ts"
Cohesion: 0.10
Nodes (30): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+22 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.05
Nodes (66): PriceRow, EngagementRow, Lines(), longDate(), money(), php, ProposalView(), TaxpayerType (+58 more)

### Community 80 - "percentage.ts"
Cohesion: 0.19
Nodes (29): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+21 more)

### Community 81 - "ledger/data.ts"
Cohesion: 0.11
Nodes (26): Accounts(), AccountsPage(), GROUPS, CashFlowClass, codes, PNL, COA_TEMPLATES, accountFromRow() (+18 more)

### Community 82 - "Badge"
Cohesion: 0.08
Nodes (53): GET(), MonthLock(), BooksMonthsPage(), Months(), one(), ClientReturnsPage(), FilingRow, Returns() (+45 more)

### Community 83 - "button.tsx"
Cohesion: 0.08
Nodes (27): @remixicon/react, ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+19 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.21
Nodes (20): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+12 more)

### Community 87 - "books/reports/page.tsx"
Cohesion: 0.14
Nodes (21): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+13 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (28): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+20 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.09
Nodes (29): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+21 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.11
Nodes (31): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+23 more)

### Community 93 - "brand/forms.tsx"
Cohesion: 0.36
Nodes (7): FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm()

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.17
Nodes (31): @supabase/supabase-js, saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when() (+23 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "next"
Cohesion: 0.07
Nodes (51): nextConfig, next, ClientList(), ClientsPage(), recomputeWorksheetAction(), GET(), Lines(), lineStyle (+43 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (48): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+40 more)

### Community 101 - "leads/[id]/page.tsx"
Cohesion: 0.15
Nodes (14): FunnelSwitch(), Lead(), LeadPage(), TYPE_LABEL, Leads(), LeadsPage(), acceptProposalAction(), LEAD_STATUS (+6 more)

### Community 102 - "formatAmount"
Cohesion: 0.18
Nodes (13): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, p(), PayrollRuns(), Run (+5 more)

### Community 103 - "payroll/payroll.test.ts"
Cohesion: 0.13
Nodes (22): BirCategory, Category, categoryTotals(), DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ItemKind, KIND_ORDER (+14 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 106 - "proof-upload.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.11
Nodes (35): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+27 more)

### Community 109 - "react"
Cohesion: 0.15
Nodes (13): react, CustomersRoute(), JournalRoute(), MonthSelect(), PaymentsListPage(), PaymentsEditPage(), PayslipsRoute(), PurchaseInvoicesListPage() (+5 more)

### Community 110 - "fees/forms.tsx"
Cohesion: 0.27
Nodes (10): FeeFormState, ActivateForm(), billingHint, CreateFromTemplateForm(), NewDraftForm(), PricesForm(), Result(), SettingsValues (+2 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.20
Nodes (19): OpeningAssetForm(), amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), Row (+11 more)

### Community 113 - "registrations/forms.tsx"
Cohesion: 0.09
Nodes (38): FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm(), RemoveAssignmentButton() (+30 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "tools/page.tsx"
Cohesion: 0.19
Nodes (19): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), OpeningChecklist(), AMENDMENT_BADGE (+11 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 118 - "cycle/page.tsx"
Cohesion: 0.10
Nodes (42): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), PortalClient, MonthComplete(), SentRow (+34 more)

### Community 119 - "tax-codes.ts"
Cohesion: 0.16
Nodes (17): SettingsPage(), SettingsRoute(), loadTaxCodes(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf() (+9 more)

### Community 120 - "filings/[id]/page.tsx"
Cohesion: 0.09
Nodes (39): amt(), ApprovalMemo(), Db, TIE, Event, eventText, Filing(), FilingPage() (+31 more)

### Community 121 - "source.ts"
Cohesion: 0.15
Nodes (22): ATC_MASTER, AtcInfo, normalizeAtc(), amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND, DocumentRow (+14 more)

### Community 122 - "work/load.ts"
Cohesion: 0.20
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.15
Nodes (17): accountLabel(), BatchCheck, BatchColumn, BatchContext, centavosOf(), checkRow(), findAccount(), isoDate() (+9 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.11
Nodes (17): Row, QueueFiling, QueueViewer, ReviewQueue, ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS (+9 more)

### Community 126 - "memo.ts"
Cohesion: 0.17
Nodes (14): ReviewNote, approvalMemo(), Memo, MemoInput, MemoMonth, ALWAYS, REFS_FOR_FORM, refsToSign() (+6 more)

### Community 127 - "profile.ts"
Cohesion: 0.14
Nodes (18): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), Expiry, ExpiryTone (+10 more)

### Community 128 - "formatAmount"
Cohesion: 0.22
Nodes (15): Batch(), BatchPage(), one(), toCentavos(), BooksSummaryPage(), Summary(), SummaryCard(), TransactionJournal() (+7 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "safeguards-load.ts"
Cohesion: 0.12
Nodes (29): ClientValues, SafeguardsNotice(), obligationChanges(), obligationsForTaxTypes(), TaxType, TaxTypeError, forms(), CoverageClient (+21 more)

### Community 131 - "app/documents/page.tsx"
Cohesion: 0.06
Nodes (66): Doc, DocumentsCard(), when(), ExceptionRow, approveDocumentAction(), BOOKED_TYPES, DocumentReviewPage(), loadBooking() (+58 more)

### Community 132 - "filings/actions.ts"
Cohesion: 0.19
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 133 - "fields.ts"
Cohesion: 0.16
Nodes (15): ok, FieldKey, keys, normalizeAmount(), normalizeFields(), normalizePartyKind(), normalizeTerms(), OCR_FIELDS (+7 more)

### Community 134 - "binder/page.tsx"
Cohesion: 0.32
Nodes (10): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, PrintButton() (+2 more)

### Community 135 - "statement-view.tsx"
Cohesion: 0.18
Nodes (14): Detail(), PayNow(), proofBadge, proofMethod, statusBadge, FirmBlock, PayAccount, PaymentProof (+6 more)

### Community 136 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 137 - "ocr/run.ts"
Cohesion: 0.25
Nodes (13): runOcr(), SKIP, lookupParties(), blank(), optionalText(), PartyInput, partySchema, HEAD_OFFICE (+5 more)

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.07
Nodes (11): pg, vitest, root, root, root, root, root, root (+3 more)

### Community 141 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "xlsx.ts"
Cohesion: 0.21
Nodes (13): GET(), safe(), loadAccounts(), BATCH_COLUMNS, BATCH_KINDS, buildBatchTemplate(), cellText(), MAX_ROWS (+5 more)

### Community 144 - "FormModule"
Cohesion: 0.11
Nodes (16): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, form1601C (+8 more)

### Community 146 - "brand/actions.ts"
Cohesion: 0.19
Nodes (14): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+6 more)

### Community 147 - "returns/load.ts"
Cohesion: 0.23
Nodes (14): loadAssets(), dayBefore(), FilingRow, ListedDocument, loadLedger(), loadWorksheet(), loadYearStatements(), PAYROLL_FORM_CODES (+6 more)

### Community 148 - "bulk-actions.ts"
Cohesion: 0.12
Nodes (21): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), BatchRow, DocumentCodes (+13 more)

### Community 149 - "batch/actions.ts"
Cohesion: 0.26
Nodes (11): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), loadBatchContext(), monthsBetween(), BatchAccount (+3 more)

### Community 150 - "ref_node_fs"
Cohesion: 0.10
Nodes (8): outDir, pkgDir, require, { version }, ctx, input, root, root

### Community 151 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm()

### Community 152 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 153 - "loadAccounts"
Cohesion: 0.31
Nodes (7): JournalEntryRoute(), NewEntry(), NewEntryPage(), JournalView(), loadEntryLines(), journalRows(), loadAccounts()

### Community 154 - "templatePayload"
Cohesion: 0.17
Nodes (8): templatePayload(), as(), client(), root, root, as(), books(), root

### Community 155 - "Lockup"
Cohesion: 0.43
Nodes (5): errors, Form(), LoginPage(), Lockup(), Mark()

### Community 156 - "supabaseServer"
Cohesion: 0.05
Nodes (87): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction() (+79 more)

### Community 157 - "server-only"
Cohesion: 0.17
Nodes (16): server-only, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+8 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 159 - "index.ts"
Cohesion: 0.09
Nodes (16): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+8 more)

### Community 160 - "parts.ts"
Cohesion: 0.12
Nodes (33): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+25 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.15
Nodes (12): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+4 more)

### Community 162 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 163 - "invoice-pages.tsx"
Cohesion: 0.13
Nodes (22): INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesViewPage() (+14 more)

### Community 164 - "portal/requests/[id]/page.tsx"
Cohesion: 0.46
Nodes (6): PortalRequest(), RequestDetail(), CloseRequestButton(), Thread(), ThreadMessage, when()

### Community 165 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 167 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 168 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 169 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1131 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `formatAmount`, `[token]/page.tsx`, `app/documents/page.tsx`, `filings/actions.ts`, `package.json`, `binder/page.tsx`, `sign-off-actions.tsx`, `ui.tsx`, `onboarding/page.tsx`, `proxy.ts`, `dependencies`, `xlsx.ts`, `brand/actions.ts`, `bulk-actions.ts`, `batch/actions.ts`, `fixed-assets/forms.tsx`, `loadAccounts`, `supabaseServer`, `server-only`, `parts.ts`, `invoice-pages.tsx`, `portal/requests/[id]/page.tsx`, `register-xlsx.ts`, `scores/page.tsx`, `ui.ts`, `sign-in-form.tsx`, `payroll/forms.tsx`, `lib/books/actions.ts`, `brand/page.tsx`, `deadlines/page.tsx`, `steps.ts`, `[employeeId]/page.tsx`, `getIdentity`, `settlement-pages.tsx`, `settings/page.tsx`, `Card`, `review-forms.tsx`, `tabs.tsx`, `books/forms.tsx`, `module-pages.tsx`, `opening-checklist.tsx`, `theme-toggle.tsx`, `ledger/data.ts`, `Badge`, `[clientId]/page.tsx`, `books/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `brand/forms.tsx`, `payroll/data.ts`, `print/page.tsx`, `leads/[id]/page.tsx`, `formatAmount`, `proof-upload.tsx`, `parties/[id]/page.tsx`, `react`, `fixed-assets/page.tsx`, `registrations/forms.tsx`, `tools/page.tsx`, `cycle/page.tsx`, `filings/[id]/page.tsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addDays` be split into smaller, more focused modules?**
  _Cohesion score 0.10707070707070707 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `formatAmount`, `[token]/page.tsx`, `checkbox.tsx`, `app/documents/page.tsx`, `notification.tsx`, `package.json`, `binder/page.tsx`, `statement-view.tsx`, `filters.tsx`, `sign-off-actions.tsx`, `ui.tsx`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `fixed-assets/forms.tsx`, `loadAccounts`, `Lockup`, `supabaseServer`, `parts.ts`, `invoice-pages.tsx`, `portal/requests/[id]/page.tsx`, `scores/page.tsx`, `ui.ts`, `sign-in-form.tsx`, `payroll/forms.tsx`, `modal.tsx`, `lib/books/actions.ts`, `brand/page.tsx`, `deadlines/page.tsx`, `steps.ts`, `[employeeId]/page.tsx`, `getIdentity`, `settlement-pages.tsx`, `Notice`, `settings/page.tsx`, `Card`, `review-forms.tsx`, `tabs.tsx`, `cx`, `file-upload.tsx`, `books/forms.tsx`, `module-pages.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `ledger/data.ts`, `Badge`, `button.tsx`, `cx.ts`, `[clientId]/page.tsx`, `books/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `brand/forms.tsx`, `payroll/data.ts`, `next`, `print/page.tsx`, `leads/[id]/page.tsx`, `formatAmount`, `proof-upload.tsx`, `parties/[id]/page.tsx`, `fees/forms.tsx`, `fixed-assets/page.tsx`, `registrations/forms.tsx`, `tools/page.tsx`, `staff/page.tsx`, `cycle/page.tsx`, `tax-codes.ts`, `filings/[id]/page.tsx`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `addDays`, `safeguards-load.ts`, `app/documents/page.tsx`, `arap.ts`, `package.json`, `fields.ts`, `gemini.ts`, `filters.tsx`, `filings/actions.ts`, `ledger.test.ts`, `onboarding/page.tsx`, `ledger-lock.test.ts`, `statements.ts`, `bulk-actions.ts`, `ref_node_fs`, `templatePayload`, `supabaseServer`, `server-only`, `index.ts`, `parts.ts`, `workpapers.test.ts`, `invoice-pages.tsx`, `names.ts`, `month-complete.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `scores/page.tsx`, `adjustments.test.ts`, `register-books.test.ts`, `ui.ts`, `sign-in-form.tsx`, `lib/books/actions.ts`, `brand/page.tsx`, `deadlines/page.tsx`, `steps.ts`, `payroll/payroll.test.ts`, `money.ts`, `settings/page.tsx`, `Card`, `fixed-assets.test.ts`, `testing.ts`, `funnel.test.ts`, `opening-checklist.tsx`, `safeguards.ts`, `quote.ts`, `ledger/data.ts`, `books/reports/page.tsx`, `document-scanner.tsx`, `opening.ts`, `print/page.tsx`, `leads/[id]/page.tsx`, `formatAmount`, `payroll/payroll.test.ts`, `rates.ts`, `parties/[id]/page.tsx`, `db.test.ts`, `fixed-assets/page.tsx`, `registrations/forms.tsx`, `acting-approver.test.ts`, `cycle/page.tsx`, `tax-codes.ts`, `filings/[id]/page.tsx`, `source.ts`, `work/load.ts`, `batch/register.ts`, `sign-off.ts`, `memo.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08275862068965517 - nodes in this community are weakly interconnected._