# Graph Report - agent-a290d9eab37138a8f  (2026-11-25)

## Corpus Check
- 696 files · ~543,759 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .css 7, (none) 5, .mdc 1)

## Summary
- 4346 nodes · 14980 edges · 177 communities (156 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `e9e7026c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- filings/run.ts
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- review-form.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- steps.ts
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
- [id]/payroll/actions.ts
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
- PageHeader
- cycle/page.tsx
- returns/books.test.ts
- returns/types.ts
- Skeleton
- money.ts
- Notice
- requireOwner
- fees/[id]/page.tsx
- brand/forms.tsx
- workpapers/page.tsx
- cx
- select.tsx
- Apple Design
- payroll/data.ts
- testing.ts
- fees/types.ts
- review/page.tsx
- books/forms.tsx
- module-pages.tsx
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- @remixicon/react
- theme-toggle.tsx
- quote.ts
- register/page.tsx
- clients/[id]/page.tsx
- server-only
- button.tsx
- Pro components
- cx.ts
- registration/page.tsx
- statements/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- pg
- opening.ts
- Recipes
- Centavos
- BoardUI page patterns
- Pro templates
- social-button.tsx
- books/print/page.tsx
- leads/[id]/page.tsx
- register-xlsx.ts
- public.ts
- boardui
- rates.ts
- document-upload.tsx
- format.ts
- template.ts
- formatAmount
- sidebar-toggle.tsx
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- toCentavos
- acting-approver.test.ts
- tools/page.tsx
- filings/actions.ts
- apply-migrations.sh
- fees/schedule.ts
- tax-codes.ts
- app/app/page.tsx
- source.ts
- supabaseServer
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- filings/[id]/page.tsx
- file-upload.tsx
- portal/page.tsx
- ledger/data.ts
- registrations/actions.ts
- mime.ts
- documents/labels.ts
- register-books.test.ts
- ref_node_fs
- work/page.tsx
- Card
- app/documents/page.tsx
- fields.ts
- approval-memo.tsx
- ledger.test.ts
- vitest
- formToObject
- proxy.ts
- return-file-actions.ts
- LinkButton
- [token]/page.tsx
- return-files.tsx
- @supabase/supabase-js
- sign-in-form.tsx
- worksheet/page.tsx
- binder/page.tsx
- [clientId]/page.tsx
- safeguards.ts
- people/schema.ts
- fees/page.tsx
- Building UIs with BoardUI
- branches/page.tsx
- collections/actions.ts
- returns-sign-off.test.ts
- templatePayload
- payroll/register.ts
- Rework: one flow from lead to year-end
- books-migration.test.ts
- status.ts
- generate-qap-fixture.mjs
- tests/books.test.ts
- tieouts.test.ts
- eslint.config.mjs
- copy-opencv.mjs
- documents/period.ts
- ledger-lock.test.ts
- funnel.test.ts
- fixed-assets.test.ts
- ledger-documents.test.ts
- month-complete.test.ts
- returns-books.test.ts
- workpapers.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 284 edges
2. `Skeleton()` - 210 edges
3. `react` - 209 edges
4. `Notice()` - 203 edges
5. `cx` - 199 edges
6. `Button()` - 182 edges
7. `next` - 166 edges
8. `Card()` - 157 edges
9. `Badge()` - 150 edges
10. `Input()` - 129 edges

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

## Communities (177 total, 21 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (39): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one() (+31 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.08
Nodes (49): TimelineFiling, TimelineItem, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso() (+41 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 4 - "arap.ts"
Cohesion: 0.16
Nodes (19): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+11 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.08
Nodes (43): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+35 more)

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

### Community 11 - "steps.ts"
Cohesion: 0.11
Nodes (27): openClientCaseAction(), Agency, birForm(), BranchOptions, branchStepsFor(), CaseStep, ClosureOptions, closureStepsFor() (+19 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (32): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+24 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+10 more)

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
Cohesion: 0.11
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

### Community 40 - "[id]/payroll/actions.ts"
Cohesion: 0.13
Nodes (41): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), fieldErrors(), fileOf(), friendly(), postSubmissionAction(), previewEmployeesAction() (+33 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "income.ts"
Cohesion: 0.10
Nodes (64): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+56 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "ui.ts"
Cohesion: 0.08
Nodes (40): blankLine(), InvoiceForm(), InvoiceFormValue, BooksLockBar(), MonthSelect(), KINDS, PartyList(), fmt() (+32 more)

### Community 45 - "index.ts"
Cohesion: 0.09
Nodes (16): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+8 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (49): EmployeeImportState, FormState, RegisterState, GridRow, KIND_TITLE, MonthGrid(), PriorEmployerValues, toInput() (+41 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (68): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+60 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.08
Nodes (32): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+24 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.17
Nodes (19): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote (+11 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.13
Nodes (30): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+22 more)

### Community 53 - "PageHeader"
Cohesion: 0.18
Nodes (26): ClientList(), ClientsPage(), CyclePage(), SectionTabs(), StepBadge(), StepRow, caseStatus, fmt() (+18 more)

### Community 54 - "cycle/page.tsx"
Cohesion: 0.15
Nodes (25): DocumentsCard(), when(), Cycle(), CycleWithClient, DocRow, shift(), CloseCycleButton(), DecideExceptionForm() (+17 more)

### Community 55 - "returns/books.test.ts"
Cohesion: 0.11
Nodes (18): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), client, row(), form1701 (+10 more)

### Community 56 - "returns/types.ts"
Cohesion: 0.07
Nodes (44): Alphalist, tinDashed(), withNonDeductible(), BUSINESS_TAX_FORMS, VatData, agentLines(), agentProblems(), amountText() (+36 more)

### Community 57 - "Skeleton"
Cohesion: 0.10
Nodes (24): react, BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), InvoiceEdit(), JournalEntryRoute(), JournalRoute(), PaymentsNewPage() (+16 more)

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (50): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), EwtLine (+42 more)

### Community 59 - "Notice"
Cohesion: 0.07
Nodes (86): setupMissingChartsAction(), BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+78 more)

### Community 60 - "requireOwner"
Cohesion: 0.08
Nodes (55): zod@^4.6.7, zod, addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState (+47 more)

### Community 61 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (28): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+20 more)

### Community 62 - "brand/forms.tsx"
Cohesion: 0.13
Nodes (28): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+20 more)

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.15
Nodes (25): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+17 more)

### Community 64 - "cx"
Cohesion: 0.08
Nodes (32): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Checkbox(), CheckboxProps, CheckboxGlyph() (+24 more)

### Community 65 - "select.tsx"
Cohesion: 0.07
Nodes (40): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+32 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "payroll/data.ts"
Cohesion: 0.12
Nodes (32): release2316Action(), EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), Release2316Form(), yearWorksheet() (+24 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "fees/types.ts"
Cohesion: 0.13
Nodes (25): TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), items (+17 more)

### Community 70 - "review/page.tsx"
Cohesion: 0.16
Nodes (15): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, TabKey, Queue(), ReviewPage(), Row (+7 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (41): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+33 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.11
Nodes (53): booksContext(), fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList(), Column (+45 more)

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
Cohesion: 0.06
Nodes (42): react-aria-components, DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+34 more)

### Community 77 - "@remixicon/react"
Cohesion: 0.36
Nodes (9): @remixicon/react, RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), Thread(), ThreadMessage (+1 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.13
Nodes (23): buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos(), QuoteLine (+15 more)

### Community 80 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 81 - "clients/[id]/page.tsx"
Cohesion: 0.07
Nodes (56): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+48 more)

### Community 82 - "server-only"
Cohesion: 0.17
Nodes (16): server-only, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+8 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (30): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+22 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 86 - "registration/page.tsx"
Cohesion: 0.21
Nodes (16): Requests(), RequestsPage(), Row, clientStatus, fmt(), PortalRegistration(), Registration(), PortalRequests() (+8 more)

### Community 87 - "statements/page.tsx"
Cohesion: 0.14
Nodes (21): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+13 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (25): HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps, inputElementClassName (+17 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (21): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+13 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "pg"
Cohesion: 0.10
Nodes (5): pg, root, root, root, root

### Community 94 - "opening.ts"
Cohesion: 0.14
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "Centavos"
Cohesion: 0.10
Nodes (45): AlphaCols, alphaCols(), AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+37 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 100 - "books/print/page.tsx"
Cohesion: 0.08
Nodes (46): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+38 more)

### Community 101 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (54): NotesCard(), FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), convertLeadAction(), LeadState (+46 more)

### Community 102 - "register-xlsx.ts"
Cohesion: 0.17
Nodes (23): file(), GET(), safe(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), GET() (+15 more)

### Community 103 - "public.ts"
Cohesion: 0.26
Nodes (10): SERVICES, StartState, metadata, Start(), StartPage(), brandSchedule(), FUNNEL_BRAND, funnelLive() (+2 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "document-upload.tsx"
Cohesion: 0.14
Nodes (23): DocumentUpload(), send(), upload(), Item, typeFromName(), METHODS, ProofUpload(), send() (+15 more)

### Community 107 - "format.ts"
Cohesion: 0.10
Nodes (39): normalizeTin(), runOcr(), SKIP, datAddress(), datNameCols(), displayName(), fullAddress(), listNameCols() (+31 more)

### Community 108 - "template.ts"
Cohesion: 0.15
Nodes (12): count(), first(), pick(), profileFromQuery(), items, conditionsSchema, settingsSchema, DOCUMENT_BANDS (+4 more)

### Community 109 - "formatAmount"
Cohesion: 0.18
Nodes (19): BooksSummaryPage(), Summary(), SummaryCard(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+11 more)

### Community 110 - "sidebar-toggle.tsx"
Cohesion: 0.18
Nodes (12): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+4 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 113 - "toCentavos"
Cohesion: 0.22
Nodes (11): AGENCIES, Db, p(), PayrollRuns(), Run, lastDay(), PAY_PERIODS, PayPeriod (+3 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "tools/page.tsx"
Cohesion: 0.19
Nodes (19): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), OpeningChecklist(), AMENDMENT_BADGE (+11 more)

### Community 116 - "filings/actions.ts"
Cohesion: 0.20
Nodes (16): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+8 more)

### Community 118 - "fees/schedule.ts"
Cohesion: 0.12
Nodes (26): dateFmt, loadItems(), loadSchedules(), loadTaxOnFee(), statusLabel, statusTone, Supabase, EngagementRow (+18 more)

### Community 119 - "tax-codes.ts"
Cohesion: 0.16
Nodes (17): SettingsPage(), SettingsRoute(), loadTaxCodes(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf() (+9 more)

### Community 120 - "app/app/page.tsx"
Cohesion: 0.17
Nodes (23): DashboardStats(), ActingNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), Acting(), ActingApproverPage() (+15 more)

### Community 121 - "source.ts"
Cohesion: 0.11
Nodes (29): ATC_MASTER, AtcInfo, normalizeAtc(), SawtResult, Split, ListedDocument, amount(), approvedFields() (+21 more)

### Community 122 - "supabaseServer"
Cohesion: 0.04
Nodes (81): nextConfig, next, setIncomeTaxMethodAction(), addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton() (+73 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (44): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+36 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (53): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, SignOffState, bookKind, BookRow, bookStatus (+45 more)

### Community 126 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 127 - "portal/page.tsx"
Cohesion: 0.13
Nodes (26): PortalClient, portalContext(), MonthComplete(), SentRow, TimelineRow, Home(), KINDS, manilaDay() (+18 more)

### Community 128 - "ledger/data.ts"
Cohesion: 0.12
Nodes (25): BookEntry, CashFlowClass, codes, PNL, COA_TEMPLATES, accountFromRow(), Amendment, AmendmentStatus (+17 more)

### Community 129 - "registrations/actions.ts"
Cohesion: 0.15
Nodes (16): dtiRegisteredOn(), FormState, openYearRenewalsAction(), YearRenewalsForm(), branchSchema, checkbox, closureSchema, newRegistrationSchema (+8 more)

### Community 130 - "mime.ts"
Cohesion: 0.15
Nodes (25): RFC-2047, RFC-2822, GET(), accessToken(), call(), headerOf(), MailMessage, MailPart (+17 more)

### Community 131 - "documents/labels.ts"
Cohesion: 0.12
Nodes (23): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+15 more)

### Community 132 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 133 - "ref_node_fs"
Cohesion: 0.12
Nodes (5): ctx, input, root, root, root

### Community 134 - "work/page.tsx"
Cohesion: 0.17
Nodes (21): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), keepBooksReady(), lastMonth() (+13 more)

### Community 135 - "Card"
Cohesion: 0.10
Nodes (43): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), Detail(), StatementPage() (+35 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.13
Nodes (28): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ApprovedTable(), BOOKED_TYPES (+20 more)

### Community 137 - "fields.ts"
Cohesion: 0.07
Nodes (37): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, normalizeAmount() (+29 more)

### Community 138 - "approval-memo.tsx"
Cohesion: 0.20
Nodes (10): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, approvalMemo(), Memo, MemoInput (+2 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.07
Nodes (11): vitest, Data, root, Row, HASH, LEAD, root, root (+3 more)

### Community 141 - "formToObject"
Cohesion: 0.15
Nodes (20): fieldErrors(), openRegistrationAction(), ActingState, appointActingAction(), endActingAction(), refresh(), EndButton(), addClientUserAction() (+12 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "return-file-actions.ts"
Cohesion: 0.23
Nodes (12): ReturnFileState, sendEsubmissionAction(), TYPES, EsubmissionMailEnv, esubmissionMailEnv(), DatFiles, datFiles(), Db (+4 more)

### Community 144 - "LinkButton"
Cohesion: 0.20
Nodes (18): NewEntry(), NewEntryPage(), Print(), Print2307Page(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page() (+10 more)

### Community 145 - "[token]/page.tsx"
Cohesion: 0.25
Nodes (11): metadata, Proposal(), ProposalPage(), Lines(), longDate(), money(), php, ProposalData (+3 more)

### Community 146 - "return-files.tsx"
Cohesion: 0.32
Nodes (12): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+4 more)

### Community 147 - "@supabase/supabase-js"
Cohesion: 0.35
Nodes (7): @supabase/supabase-js, generateFilingsNow(), GenerateState, GenerateButton(), supabaseEnv(), runFilingGeneration(), supabaseAdmin()

### Community 148 - "sign-in-form.tsx"
Cohesion: 0.36
Nodes (7): SignInState, errors, Form(), LoginPage(), SignInForm(), Divider(), SocialButton()

### Community 149 - "worksheet/page.tsx"
Cohesion: 0.36
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 150 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 151 - "[clientId]/page.tsx"
Cohesion: 0.12
Nodes (36): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+28 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.09
Nodes (39): GET(), CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay() (+31 more)

### Community 153 - "people/schema.ts"
Cohesion: 0.39
Nodes (6): clientUserSchema, email, inviteStaffSchema, loadPoints(), name, updateStaffSchema

### Community 154 - "fees/page.tsx"
Cohesion: 0.46
Nodes (7): longDate(), nextEffectiveDate(), CreateFromTemplateForm(), NewDraftForm(), StartNewVersionForm(), FeeSchedulePage(), Schedules()

### Community 155 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 156 - "branches/page.tsx"
Cohesion: 0.52
Nodes (5): BranchState, AddBranchForm(), BranchRowForm(), Branches(), BranchesPage()

### Community 157 - "collections/actions.ts"
Cohesion: 0.29
Nodes (13): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+5 more)

### Community 158 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 159 - "templatePayload"
Cohesion: 0.13
Nodes (9): templatePayload(), as(), client(), root, root, root, as(), books() (+1 more)

### Community 160 - "payroll/register.ts"
Cohesion: 0.26
Nodes (11): PayrollItem, CheckedRegister, checkRegister(), fmt(), ID_HEADERS, NewEmployeeRow, norm(), normalizeTin() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 163 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 164 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 165 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 166 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 167 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 168 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 169 - "documents/period.ts"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 171 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 172 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 176 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

## Knowledge Gaps
- **20 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1183 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Skeleton` to `form-2307.ts`, `documents/labels.ts`, `notification.tsx`, `package.json`, `review-form.tsx`, `Card`, `app/documents/page.tsx`, `work/page.tsx`, `onboarding/page.tsx`, `formToObject`, `dependencies`, `LinkButton`, `[token]/page.tsx`, `return-files.tsx`, `@supabase/supabase-js`, `sign-in-form.tsx`, `worksheet/page.tsx`, `binder/page.tsx`, `[clientId]/page.tsx`, `fees/page.tsx`, `branches/page.tsx`, `[id]/payroll/actions.ts`, `scores/page.tsx`, `ui.ts`, `payroll/forms.tsx`, `modal.tsx`, `lib/books/actions.ts`, `deadlines/page.tsx`, `PageHeader`, `cycle/page.tsx`, `Notice`, `requireOwner`, `fees/[id]/page.tsx`, `brand/forms.tsx`, `workpapers/page.tsx`, `cx`, `select.tsx`, `payroll/data.ts`, `review/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `stat-cards.tsx`, `@remixicon/react`, `theme-toggle.tsx`, `register/page.tsx`, `clients/[id]/page.tsx`, `button.tsx`, `cx.ts`, `registration/page.tsx`, `statements/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `social-button.tsx`, `books/print/page.tsx`, `leads/[id]/page.tsx`, `public.ts`, `document-upload.tsx`, `formatAmount`, `sidebar-toggle.tsx`, `fixed-assets/page.tsx`, `tools/page.tsx`, `fees/schedule.ts`, `tax-codes.ts`, `app/app/page.tsx`, `supabaseServer`, `batch/register.ts`, `filings/[id]/page.tsx`, `file-upload.tsx`, `portal/page.tsx`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1126530612244898 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `registrations/actions.ts`, `mime.ts`, `documents/labels.ts`, `ledger/data.ts`, `package.json`, `review-form.tsx`, `Card`, `app/documents/page.tsx`, `work/page.tsx`, `approval-memo.tsx`, `onboarding/page.tsx`, `formToObject`, `dependencies`, `LinkButton`, `return-file-actions.ts`, `return-files.tsx`, `@supabase/supabase-js`, `[token]/page.tsx`, `worksheet/page.tsx`, `binder/page.tsx`, `[clientId]/page.tsx`, `safeguards.ts`, `fees/page.tsx`, `branches/page.tsx`, `collections/actions.ts`, `[id]/payroll/actions.ts`, `scores/page.tsx`, `ui.ts`, `lib/books/actions.ts`, `deadlines/page.tsx`, `PageHeader`, `cycle/page.tsx`, `Notice`, `requireOwner`, `fees/[id]/page.tsx`, `brand/forms.tsx`, `workpapers/page.tsx`, `cx`, `payroll/data.ts`, `review/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `opening-checklist.tsx`, `proxy.ts`, `@remixicon/react`, `theme-toggle.tsx`, `register/page.tsx`, `clients/[id]/page.tsx`, `server-only`, `registration/page.tsx`, `statements/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `books/print/page.tsx`, `leads/[id]/page.tsx`, `register-xlsx.ts`, `public.ts`, `document-upload.tsx`, `formatAmount`, `sidebar-toggle.tsx`, `fixed-assets/page.tsx`, `toCentavos`, `tools/page.tsx`, `filings/actions.ts`, `fees/schedule.ts`, `app/app/page.tsx`, `batch/register.ts`, `filings/[id]/page.tsx`, `portal/page.tsx`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08038075092543628 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `filings/run.ts`, `mime.ts`, `ledger/data.ts`, `arap.ts`, `package.json`, `review-form.tsx`, `ref_node_fs`, `app/documents/page.tsx`, `fields.ts`, `approval-memo.tsx`, `steps.ts`, `ledger.test.ts`, `onboarding/page.tsx`, `statements.ts`, `[clientId]/page.tsx`, `safeguards.ts`, `people/schema.ts`, `register-books.test.ts`, `returns-sign-off.test.ts`, `templatePayload`, `books-migration.test.ts`, `status.ts`, `tests/books.test.ts`, `tieouts.test.ts`, `documents/period.ts`, `scores/page.tsx`, `funnel.test.ts`, `ui.ts`, `index.ts`, `payroll/forms.tsx`, `fixed-assets.test.ts`, `lib/books/actions.ts`, `ledger-documents.test.ts`, `profile.ts`, `ledger-lock.test.ts`, `deadlines/page.tsx`, `month-complete.test.ts`, `cycle/page.tsx`, `returns/books.test.ts`, `returns-books.test.ts`, `workpapers.test.ts`, `money.ts`, `requireOwner`, `testing.ts`, `fees/types.ts`, `review/page.tsx`, `opening-checklist.tsx`, `quote.ts`, `register/page.tsx`, `clients/[id]/page.tsx`, `server-only`, `registration/page.tsx`, `statements/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `pg`, `opening.ts`, `Centavos`, `books/print/page.tsx`, `leads/[id]/page.tsx`, `rates.ts`, `format.ts`, `template.ts`, `fixed-assets/page.tsx`, `toCentavos`, `acting-approver.test.ts`, `filings/actions.ts`, `tax-codes.ts`, `app/app/page.tsx`, `source.ts`, `supabaseServer`, `batch/register.ts`, `filings/[id]/page.tsx`, `portal/page.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._