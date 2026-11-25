# Graph Report - agent-a115c136270a39034  (2026-11-25)

## Corpus Check
- 661 files · ~503,057 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 6, (none) 5, .mdc 1)

## Summary
- 4135 nodes · 14189 edges · 179 communities (153 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 120 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `964704e7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [token]/page.tsx
- engine.ts
- migrate.yml
- cx.ts
- arap.ts
- devDependencies
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
- toCentavos
- scores/page.tsx
- book-income.ts
- payroll/types.ts
- ui.ts
- registrations/[id]/page.tsx
- payroll/forms.tsx
- modal.tsx
- lock-bar.tsx
- scripts
- profile.ts
- workpapers/load.ts
- board.ts
- registrations/forms.tsx
- payroll/data.ts
- requireStaff
- rows.ts
- formatAmount
- returns/types.ts
- Notice
- app/settings/page.tsx
- public.ts
- fixed-assets.test.ts
- workpapers/page.tsx
- tabs.tsx
- cx
- Apple Design
- money.ts
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
- income.ts
- ledger/data.ts
- deadlines/page.tsx
- link-button.tsx
- Pro components
- formToObject
- manilaToday
- fees/types.ts
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- notes.ts
- opening.ts
- Recipes
- register-xlsx.ts
- BoardUI theming reference
- Pro templates
- PageHeader
- print/page.tsx
- leads/[id]/page.tsx
- ledger/types.ts
- payroll/payroll.test.ts
- boardui
- vitest
- quote/page.tsx
- parties/[id]/page.tsx
- db.test.ts
- portal/documents/page.tsx
- fees/[id]/page.tsx
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- clients/[id]/page.tsx
- acting-approver.test.ts
- Button
- staff/page.tsx
- apply-migrations.sh
- cycle/page.tsx
- portal/page.tsx
- app/app/page.tsx
- returns/load.ts
- next-actions.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- transactions-actions.ts
- Centavos
- documents/labels.ts
- books/page.tsx
- checkbox.tsx
- safeguards-load.ts
- app/documents/page.tsx
- filings/actions.ts
- settings/actions.ts
- binder/page.tsx
- portalContext
- gap/page.tsx
- parties/actions.ts
- sign-off-actions.tsx
- ledger.test.ts
- ref_node_path
- social-button.tsx
- proxy.ts
- cycle/actions.ts
- ref_node_fs
- ledger-lock.test.ts
- documents/[id]/page.tsx
- leads/actions.ts
- fields.ts
- package.json
- copy-opencv.mjs
- InvoiceList
- seed.ts
- books/data.ts
- any-cutoff.test.ts
- ymd
- supabaseServer
- filings/run.ts
- BoardUI page patterns
- index.ts
- Card
- Rework: one flow from lead to year-end
- workpapers.test.ts
- react
- Badge
- spinner.tsx
- pg
- books-migration.test.ts
- tests/books.test.ts
- eslint.config.mjs
- leads-pipeline.test.ts
- fees.test.ts
- ledger-closing.test.ts
- ledger-documents.test.ts
- tests/payroll.test.ts
- batch-upload.test.ts
- books-lock.test.ts
- payroll-documents.test.ts
- workpaper-reviews.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 269 edges
2. `Skeleton()` - 202 edges
3. `react` - 202 edges
4. `Notice()` - 193 edges
5. `cx` - 193 edges
6. `Button()` - 173 edges
7. `next` - 156 edges
8. `Card()` - 155 edges
9. `Badge()` - 148 edges
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

## Communities (179 total, 26 thin omitted)

### Community 0 - "[token]/page.tsx"
Cohesion: 0.11
Nodes (25): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), SignInForm(), AcceptForm(), acceptProposalAction() (+17 more)

### Community 1 - "engine.ts"
Cohesion: 0.11
Nodes (35): compareIso(), IsoDate, lastDayOfMonth(), EfpsGroup, FilingChannel, FilingInstance, fiscalYearOf(), followsCalendarYear() (+27 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "cx.ts"
Cohesion: 0.04
Nodes (51): ClientTab, UNDER, AvatarColor, AvatarProps, AvatarSize, styles, Counter(), CounterColor (+43 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, tsx@^4.23.15, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "gemini.ts"
Cohesion: 0.11
Nodes (17): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, ocrOutputSchema, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL (+9 more)

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
Cohesion: 0.10
Nodes (27): DocReviewActions(), ExplainForm(), PayrollIntake(), DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, ActivateForm() (+19 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (29): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+21 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (50): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+42 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.12
Nodes (50): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments(), Periods (+42 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "toCentavos"
Cohesion: 0.12
Nodes (28): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p(), PayrollRuns(), Run (+20 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "book-income.ts"
Cohesion: 0.29
Nodes (8): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, LedgerMovement

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "ui.ts"
Cohesion: 0.08
Nodes (47): blankLine(), InvoiceForm(), InvoiceFormValue, Booking, BooksChoices(), Codes, initialCodes(), ocrKeys() (+39 more)

### Community 45 - "registrations/[id]/page.tsx"
Cohesion: 0.16
Nodes (30): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+22 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (56): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+48 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (39): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+31 more)

### Community 48 - "lock-bar.tsx"
Cohesion: 0.11
Nodes (32): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+24 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.06
Nodes (53): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+45 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.11
Nodes (30): amt(), ApprovalMemo(), Db, TIE, month1601C(), RegisterLine, Adjustment, c() (+22 more)

### Community 52 - "board.ts"
Cohesion: 0.10
Nodes (30): FilingGroup(), StepProgress(), CauseTag, causeTag(), DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS (+22 more)

### Community 53 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (60): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+52 more)

### Community 54 - "payroll/data.ts"
Cohesion: 0.19
Nodes (16): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage() (+8 more)

### Community 55 - "requireStaff"
Cohesion: 0.23
Nodes (16): ReplyForm(), send(), getIdentity(), requireStaff(), StartUpload, shrinkImage(), closeRequestAction(), createRequestAction() (+8 more)

### Community 56 - "rows.ts"
Cohesion: 0.09
Nodes (43): GridRow, AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+35 more)

### Community 57 - "formatAmount"
Cohesion: 0.12
Nodes (25): PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), ReceiptsListPage(), ReceiptsEditPage(), fmt(), OpenInvoice, SettlementForm() (+17 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (52): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), EwtLine (+44 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (50): ClientForm(), BatchUpload(), PreviewTable(), BookPicker(), EntryForm(), ReleaseReportForm(), SetupForm(), OpeningAssetForm() (+42 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.16
Nodes (24): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+16 more)

### Community 61 - "public.ts"
Cohesion: 0.14
Nodes (22): SERVICES, StartState, ProposalData, QuerySource, Quote, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS (+14 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+14 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "cx"
Cohesion: 0.06
Nodes (48): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+40 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "money.ts"
Cohesion: 0.11
Nodes (31): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+23 more)

### Community 68 - "testing.ts"
Cohesion: 0.13
Nodes (25): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+17 more)

### Community 69 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 70 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (41): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+33 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.12
Nodes (24): BankAccountsRoute(), BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), JournalRoute(), BankAccounts() (+16 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.16
Nodes (18): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput (+10 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (43): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+35 more)

### Community 77 - "safeguards.ts"
Cohesion: 0.20
Nodes (16): isWeekend(), row(), documentCutoff(), DONE_FROM_STATUS, isWorkingDay(), RISK_ORDER, riskOf(), STEP_LABELS (+8 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.12
Nodes (31): PriceRow, EstimatedProfile, ExistingClient, buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE (+23 more)

### Community 80 - "income.ts"
Cohesion: 0.12
Nodes (52): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+44 more)

### Community 81 - "ledger/data.ts"
Cohesion: 0.16
Nodes (21): dayBefore(), GET(), safe(), fromWorkbookData(), buildBookWorkbook(), CashFlowClass, accountFromRow(), Amendment (+13 more)

### Community 82 - "deadlines/page.tsx"
Cohesion: 0.08
Nodes (49): ClientTabs(), ClientReturnsPage(), FilingRow, Returns(), FilingListRow, AmendmentCard(), BooksStillOpen(), Deadlines() (+41 more)

### Community 83 - "link-button.tsx"
Cohesion: 0.07
Nodes (31): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+23 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "formToObject"
Cohesion: 0.10
Nodes (26): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), addClientUserAction(), fieldErrors(), FormState (+18 more)

### Community 86 - "manilaToday"
Cohesion: 0.12
Nodes (33): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+25 more)

### Community 87 - "fees/types.ts"
Cohesion: 0.11
Nodes (21): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+13 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (29): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+21 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.16
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+11 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.11
Nodes (31): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+23 more)

### Community 93 - "notes.ts"
Cohesion: 0.14
Nodes (19): NotesCard(), ClientNoteForm(), Row, ICON, NotesTimeline(), when, statusLabel, statusTone (+11 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "register-xlsx.ts"
Cohesion: 0.15
Nodes (25): file(), GET(), safe(), GET(), employeesForMonth(), buildEmployeeTemplate(), PayrollItem, sortItems() (+17 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "PageHeader"
Cohesion: 0.10
Nodes (32): @remixicon/react, NewEntry(), NewEntryPage(), ClientList(), ClientsPage(), FirmPage(), PLACES, Places() (+24 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (40): exceljs, BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad(), PrintButton(), BOOK_ABBR (+32 more)

### Community 101 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (30): ConvertForm(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), Person, ProposalForm(), ReopenForm(), Result() (+22 more)

### Community 102 - "ledger/types.ts"
Cohesion: 0.13
Nodes (17): CASH_FLOW_CLASSES, defaultCashFlow(), codes, PNL, ClientBooks, FS_LINES, FsLine, FsLineKey (+9 more)

### Community 103 - "payroll/payroll.test.ts"
Cohesion: 0.14
Nodes (27): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+19 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "vitest"
Cohesion: 0.25
Nodes (17): vitest, AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+9 more)

### Community 106 - "quote/page.tsx"
Cohesion: 0.19
Nodes (18): dateFmt, loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm() (+10 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.11
Nodes (33): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+25 more)

### Community 109 - "portal/documents/page.tsx"
Cohesion: 0.15
Nodes (18): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+10 more)

### Community 110 - "fees/[id]/page.tsx"
Cohesion: 0.20
Nodes (21): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+13 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.13
Nodes (29): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+21 more)

### Community 113 - "clients/[id]/page.tsx"
Cohesion: 0.12
Nodes (27): FormState, removeAssignmentAction(), frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm() (+19 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "Button"
Cohesion: 0.14
Nodes (31): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+23 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.42
Nodes (7): BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 118 - "cycle/page.tsx"
Cohesion: 0.20
Nodes (16): Cycle(), CyclePage(), CycleWithClient, DocRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+8 more)

### Community 119 - "portal/page.tsx"
Cohesion: 0.19
Nodes (16): PortalClient, Home(), KINDS, manilaDay(), MonthCard(), PortalHome(), shortDay(), invoiceLabel() (+8 more)

### Community 120 - "app/app/page.tsx"
Cohesion: 0.09
Nodes (41): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+33 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.08
Nodes (47): recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when() (+39 more)

### Community 122 - "next-actions.ts"
Cohesion: 0.22
Nodes (10): MyWork, byUrgency(), filingItem(), nextActions(), RANK, Role, Urgency, URGENCY_LABELS (+2 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (42): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+34 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "transactions-actions.ts"
Cohesion: 0.27
Nodes (16): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+8 more)

### Community 126 - "Centavos"
Cohesion: 0.14
Nodes (14): EntryLineOut, NewEmployeeRow, EntryLine, RegisterTotals, TaxLine, SawtResult, SawtRow, SlpRow (+6 more)

### Community 127 - "documents/labels.ts"
Cohesion: 0.21
Nodes (15): DocumentsCard(), when(), DocumentUpload(), send(), upload(), Item, typeFromName(), finishUpload() (+7 more)

### Community 128 - "books/page.tsx"
Cohesion: 0.16
Nodes (21): booksContext(), BooksContext, fmtMonth(), one(), SearchParams, BooksFrame(), CustomersRoute(), MonthSelect() (+13 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "safeguards-load.ts"
Cohesion: 0.11
Nodes (26): ClientValues, TAX_TYPES, TaxType, CoverageClient, coverageGaps(), Gap, GapKind, Email (+18 more)

### Community 131 - "app/documents/page.tsx"
Cohesion: 0.15
Nodes (23): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+15 more)

### Community 132 - "filings/actions.ts"
Cohesion: 0.22
Nodes (15): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+7 more)

### Community 133 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 134 - "binder/page.tsx"
Cohesion: 0.42
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, grossSales()

### Community 135 - "portalContext"
Cohesion: 0.12
Nodes (27): Detail(), StatementPage(), portalContext(), Payroll(), PortalPayroll(), STATUS, when(), Detail() (+19 more)

### Community 136 - "gap/page.tsx"
Cohesion: 0.19
Nodes (13): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), estimateProfile(), gapFor(), GapRow, has() (+5 more)

### Community 137 - "parties/actions.ts"
Cohesion: 0.15
Nodes (23): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), ocrProviderFromEnv(), runOcr() (+15 more)

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.26
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_path"
Cohesion: 0.13
Nodes (3): root, root, root

### Community 141 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "cycle/actions.ts"
Cohesion: 0.25
Nodes (13): MonthComplete(), SentRow, TimelineRow, closeCycleAction(), confirmMonthAction(), CycleState, decideExceptionAction(), nothingToSubmitAction() (+5 more)

### Community 144 - "ref_node_fs"
Cohesion: 0.15
Nodes (4): ctx, input, root, root

### Community 146 - "documents/[id]/page.tsx"
Cohesion: 0.28
Nodes (9): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), pendingDocumentTaxCodes(), LOCKED_STATUSES, LockFiling (+1 more)

### Community 147 - "leads/actions.ts"
Cohesion: 0.38
Nodes (12): assignReviewerAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction(), sendProposalAction() (+4 more)

### Community 148 - "fields.ts"
Cohesion: 0.07
Nodes (45): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), BatchRow (+37 more)

### Community 149 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 150 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 151 - "InvoiceList"
Cohesion: 0.36
Nodes (8): InvoiceList(), daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 152 - "seed.ts"
Cohesion: 0.25
Nodes (8): DeadlineRule, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 153 - "books/data.ts"
Cohesion: 0.25
Nodes (8): AllocationRow, InvoiceLineRow, InvoiceRow, loadInvoices(), loadPartyBalances(), SettlementRow, BooksModule, JournalLineIn

### Community 154 - "any-cutoff.test.ts"
Cohesion: 0.50
Nodes (3): as(), client(), root

### Community 155 - "ymd"
Cohesion: 0.64
Nodes (6): shift(), addMonths(), ymd(), monthChoices(), nextCutoff(), openMonth()

### Community 156 - "supabaseServer"
Cohesion: 0.05
Nodes (74): nextConfig, next, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction() (+66 more)

### Community 157 - "filings/run.ts"
Cohesion: 0.12
Nodes (24): server-only, @supabase/supabase-js, GET(), GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage() (+16 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 159 - "index.ts"
Cohesion: 0.11
Nodes (16): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+8 more)

### Community 160 - "Card"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.15
Nodes (12): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+4 more)

### Community 162 - "workpapers.test.ts"
Cohesion: 0.17
Nodes (8): LedgerTotals, base, books, buy, sale, as(), bookedDoc(), root

### Community 163 - "react"
Cohesion: 0.11
Nodes (33): react, fmtDate(), INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE (+25 more)

### Community 164 - "Badge"
Cohesion: 0.20
Nodes (20): RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail(), PortalRequests() (+12 more)

### Community 165 - "spinner.tsx"
Cohesion: 0.32
Nodes (7): PendingGlyph(), Arc(), SIZES, Spinner(), SpinnerGlyph(), SpinnerProps, SpinnerSize

### Community 166 - "pg"
Cohesion: 0.15
Nodes (4): pg, root, root, root

### Community 167 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 168 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 169 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 170 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 172 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1144 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `books/page.tsx`, `[token]/page.tsx`, `checkbox.tsx`, `app/documents/page.tsx`, `cx.ts`, `binder/page.tsx`, `portalContext`, `gap/page.tsx`, `sign-off-actions.tsx`, `ui.tsx`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `cycle/actions.ts`, `statements.ts`, `documents/[id]/page.tsx`, `package.json`, `supabaseServer`, `filings/run.ts`, `Card`, `Badge`, `spinner.tsx`, `toCentavos`, `scores/page.tsx`, `ui.ts`, `registrations/[id]/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `lock-bar.tsx`, `profile.ts`, `registrations/forms.tsx`, `payroll/data.ts`, `requireStaff`, `formatAmount`, `Notice`, `app/settings/page.tsx`, `workpapers/page.tsx`, `tabs.tsx`, `cx`, `file-upload.tsx`, `books/forms.tsx`, `module-pages.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `deadlines/page.tsx`, `link-button.tsx`, `manilaToday`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `notes.ts`, `PageHeader`, `print/page.tsx`, `leads/[id]/page.tsx`, `quote/page.tsx`, `parties/[id]/page.tsx`, `portal/documents/page.tsx`, `fees/[id]/page.tsx`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `Button`, `staff/page.tsx`, `cycle/page.tsx`, `portal/page.tsx`, `app/app/page.tsx`, `returns/load.ts`, `batch/register.ts`, `transactions-actions.ts`, `documents/labels.ts`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `[token]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11051693404634581 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `engine.ts`, `arap.ts`, `devDependencies`, `gemini.ts`, `onboarding/page.tsx`, `statements.ts`, `toCentavos`, `scores/page.tsx`, `book-income.ts`, `ui.ts`, `registrations/[id]/page.tsx`, `lock-bar.tsx`, `profile.ts`, `workpapers/load.ts`, `board.ts`, `registrations/forms.tsx`, `rows.ts`, `returns/types.ts`, `app/settings/page.tsx`, `public.ts`, `fixed-assets.test.ts`, `money.ts`, `testing.ts`, `funnel.test.ts`, `opening-checklist.tsx`, `safeguards.ts`, `quote.ts`, `formToObject`, `manilaToday`, `fees/types.ts`, `document-scanner.tsx`, `notes.ts`, `opening.ts`, `print/page.tsx`, `leads/[id]/page.tsx`, `ledger/types.ts`, `payroll/payroll.test.ts`, `parties/[id]/page.tsx`, `db.test.ts`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `acting-approver.test.ts`, `cycle/page.tsx`, `portal/page.tsx`, `app/app/page.tsx`, `returns/load.ts`, `next-actions.ts`, `batch/register.ts`, `safeguards-load.ts`, `app/documents/page.tsx`, `filings/actions.ts`, `settings/actions.ts`, `gap/page.tsx`, `ledger.test.ts`, `ref_node_path`, `ref_node_fs`, `ledger-lock.test.ts`, `documents/[id]/page.tsx`, `fields.ts`, `package.json`, `InvoiceList`, `any-cutoff.test.ts`, `ymd`, `supabaseServer`, `filings/run.ts`, `index.ts`, `Card`, `workpapers.test.ts`, `Badge`, `pg`, `books-migration.test.ts`, `tests/books.test.ts`, `leads-pipeline.test.ts`, `fees.test.ts`, `ledger-closing.test.ts`, `ledger-documents.test.ts`, `tests/payroll.test.ts`, `batch-upload.test.ts`, `books-lock.test.ts`, `payroll-documents.test.ts`, `workpaper-reviews.test.ts`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11498257839721254 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `books/page.tsx`, `[token]/page.tsx`, `cx.ts`, `app/documents/page.tsx`, `filings/actions.ts`, `binder/page.tsx`, `portalContext`, `settings/actions.ts`, `parties/actions.ts`, `sign-off-actions.tsx`, `ui.tsx`, `gap/page.tsx`, `onboarding/page.tsx`, `proxy.ts`, `dependencies`, `cycle/actions.ts`, `statements.ts`, `documents/[id]/page.tsx`, `fields.ts`, `package.json`, `leads/actions.ts`, `filings/run.ts`, `Card`, `react`, `Badge`, `toCentavos`, `scores/page.tsx`, `ui.ts`, `registrations/[id]/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `lock-bar.tsx`, `profile.ts`, `workpapers/load.ts`, `registrations/forms.tsx`, `payroll/data.ts`, `requireStaff`, `formatAmount`, `Notice`, `app/settings/page.tsx`, `workpapers/page.tsx`, `cx`, `books/forms.tsx`, `module-pages.tsx`, `opening-checklist.tsx`, `theme-toggle.tsx`, `ledger/data.ts`, `deadlines/page.tsx`, `link-button.tsx`, `formToObject`, `manilaToday`, `app/app/layout.tsx`, `form-2316.tsx`, `register-xlsx.ts`, `PageHeader`, `print/page.tsx`, `leads/[id]/page.tsx`, `quote/page.tsx`, `parties/[id]/page.tsx`, `portal/documents/page.tsx`, `fees/[id]/page.tsx`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `Button`, `cycle/page.tsx`, `portal/page.tsx`, `app/app/page.tsx`, `returns/load.ts`, `batch/register.ts`, `transactions-actions.ts`, `documents/labels.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._