# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 588 files · ~466,612 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3782 nodes · 12518 edges · 171 communities (150 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 114 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `1abf8166`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- settings/page.tsx
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- gemini.ts
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
- toCentavos
- scores/page.tsx
- percentage.ts
- payroll/types.ts
- @remixicon/react
- parties/forms.tsx
- payroll/forms.tsx
- collections/actions.ts
- lib/books/actions.ts
- scripts
- income.ts
- memo.ts
- batch/register.ts
- ledger/data.ts
- payroll/data.ts
- worksheet/page.tsx
- Centavos
- clients/schema.ts
- money.ts
- Notice
- settings/page.tsx
- filings/[id]/page.tsx
- fixed-assets.test.ts
- review-forms.tsx
- tabs.tsx
- cx
- Apple Design
- returns/types.ts
- testing.ts
- file-upload.tsx
- funnel.test.ts
- books/forms.tsx
- clients/[id]/page.tsx
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- safeguards.ts
- theme-toggle.tsx
- quote.ts
- filings/actions.ts
- books/page.tsx
- app/app/page.tsx
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
- profile.ts
- opening.ts
- Recipes
- ledger-lock.test.ts
- BoardUI theming reference
- Pro templates
- Skeleton
- print/page.tsx
- public.ts
- payroll/payroll.test.ts
- registrations/forms.tsx
- boardui
- rates.ts
- Textarea
- parties/[id]/page.tsx
- db.test.ts
- settings/actions.ts
- fees/[id]/page.tsx
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- clients/[id]/page.tsx
- acting-approver.test.ts
- pending-review.tsx
- staff/page.tsx
- apply-migrations.sh
- cycle/page.tsx
- tax-codes.ts
- batch/template/route.ts
- source.ts
- work/load.ts
- xlsx.ts
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- supabaseAdmin
- LinkButton
- leads/[id]/page.tsx
- checkbox.tsx
- morning.ts
- supabaseServer
- quote/page.tsx
- tieouts.ts
- binder/page.tsx
- fixed-assets/forms.tsx
- app/documents/page.tsx
- src/app/layout.tsx
- ui.tsx
- ledger.test.ts
- vitest
- social-button.tsx
- proxy.ts
- cycle/actions.ts
- FormModule
- zod
- periods
- eslint.config.mjs
- fields.ts
- manilaToday
- copy-opencv.mjs
- lookupAtc
- package.json
- names.ts
- templatePayload
- amountInput
- requireOwner
- server-only
- BoardUI page patterns
- index.ts
- parts.ts
- Rework: one flow from lead to year-end
- workpapers.test.ts
- status.ts
- filters.tsx
- money.ts
- register-books.test.ts
- books-migration.test.ts
- tests/books.test.ts
- month-complete.test.ts
- tests/register.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 254 edges
2. `Notice()` - 176 edges
3. `cx` - 163 edges
4. `Button()` - 162 edges
5. `react` - 161 edges
6. `Skeleton()` - 145 edges
7. `next` - 141 edges
8. `Card()` - 138 edges
9. `Badge()` - 135 edges
10. `PageHeader()` - 115 edges

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

## Communities (171 total, 21 thin omitted)

### Community 0 - "react"
Cohesion: 0.10
Nodes (29): react, sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), SignInForm(), AcceptForm() (+21 more)

### Community 1 - "settings/page.tsx"
Cohesion: 0.08
Nodes (47): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+39 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.14
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 5 - "package.json"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

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

### Community 11 - "steps.ts"
Cohesion: 0.13
Nodes (36): ClientCaseKind, CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration() (+28 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (30): ClientTab, ClientTabs(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload() (+22 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (38): CASH_FLOW_CLASSES, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section (+30 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.18
Nodes (31): sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow, branchCode(), crlf(), csv() (+23 more)

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
Cohesion: 0.13
Nodes (29): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p(), PayrollRuns(), Run (+21 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.07
Nodes (54): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+46 more)

### Community 42 - "percentage.ts"
Cohesion: 0.17
Nodes (30): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+22 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "@remixicon/react"
Cohesion: 0.18
Nodes (20): @remixicon/react, RequestDetail(), RequestPage(), Row, PortalClient, portalContext(), PortalRequest(), RequestDetail() (+12 more)

### Community 45 - "parties/forms.tsx"
Cohesion: 0.19
Nodes (18): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), runOcr(), SKIP, lookupParties() (+10 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (52): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+44 more)

### Community 47 - "collections/actions.ts"
Cohesion: 0.32
Nodes (12): addChargeAction(), applyCreditAction(), date, depositSchema, peso, recordDepositAction(), refresh(), runBillingAction() (+4 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.07
Nodes (31): AmendmentFlag, BooksMonthRow, CodeSource, Db, decideBooksUnlock(), DocumentCodes, DocumentPortion, DocumentPosting (+23 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "income.ts"
Cohesion: 0.13
Nodes (32): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), reconciliation(), BookIncome (+24 more)

### Community 51 - "memo.ts"
Cohesion: 0.14
Nodes (20): Adjustment, PeriodFile, ReviewNote, approvalMemo(), Memo, MemoInput, MemoMonth, ALWAYS (+12 more)

### Community 52 - "batch/register.ts"
Cohesion: 0.11
Nodes (28): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+20 more)

### Community 53 - "ledger/data.ts"
Cohesion: 0.10
Nodes (30): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), BookEntry, CashFlowClass, codes (+22 more)

### Community 54 - "payroll/data.ts"
Cohesion: 0.14
Nodes (31): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Certificates2316, certificatesFromRaw(), Form2316Signatory, mmdd() (+23 more)

### Community 55 - "worksheet/page.tsx"
Cohesion: 0.11
Nodes (26): Doc, ExceptionRow, Row, Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+18 more)

### Community 56 - "Centavos"
Cohesion: 0.08
Nodes (50): GridRow, MonthGrid(), toInput(), AlphalistRow, Form2316Data, Form2316Line, AnnualSummary, annualSummary() (+42 more)

### Community 57 - "clients/schema.ts"
Cohesion: 0.19
Nodes (8): assignmentSchema, clientFields, editClientSchema, efpsGroupError, engagementSchema, NewClient, newClientSchema, base

### Community 58 - "money.ts"
Cohesion: 0.09
Nodes (40): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), ewtLines() (+32 more)

### Community 59 - "Notice"
Cohesion: 0.11
Nodes (46): StaffOptions(), BatchUpload(), PreviewTable(), AccountForm(), EntryForm(), ReleaseReportForm(), DocReviewActions(), OpeningAssetForm() (+38 more)

### Community 60 - "settings/page.tsx"
Cohesion: 0.17
Nodes (22): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+14 more)

### Community 61 - "filings/[id]/page.tsx"
Cohesion: 0.18
Nodes (16): FilingListRow, ApprovalMemo(), Event, eventText, Filing(), FilingPage(), paymentText, when() (+8 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "review-forms.tsx"
Cohesion: 0.17
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+14 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "cx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.08
Nodes (45): FinancialStatements, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4() (+37 more)

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
Cohesion: 0.18
Nodes (37): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+29 more)

### Community 72 - "clients/[id]/page.tsx"
Cohesion: 0.14
Nodes (27): createClientAction(), fieldErrors(), FormState, updateClientAction(), ClientForm(), ClientValues, frequencyLabel, Props (+19 more)

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
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "safeguards.ts"
Cohesion: 0.11
Nodes (28): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, isWeekend() (+20 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.06
Nodes (61): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), EstimatedProfile (+53 more)

### Community 80 - "filings/actions.ts"
Cohesion: 0.17
Nodes (18): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+10 more)

### Community 81 - "books/page.tsx"
Cohesion: 0.13
Nodes (31): setupMissingChartsAction(), AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton() (+23 more)

### Community 82 - "app/app/page.tsx"
Cohesion: 0.14
Nodes (25): Queue(), ReviewPage(), Row, Section(), Acting(), ActingApproverPage(), Approval, stateBadge (+17 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.21
Nodes (20): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+12 more)

### Community 87 - "books/reports/page.tsx"
Cohesion: 0.15
Nodes (19): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+11 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (28): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+20 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.17
Nodes (17): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+9 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 93 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 94 - "opening.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "Skeleton"
Cohesion: 0.11
Nodes (46): ClientList(), ClientsPage(), DashboardStats(), FilingTable(), BoardTable(), Deadlines(), DeadlinesPage(), one() (+38 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (46): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+38 more)

### Community 101 - "public.ts"
Cohesion: 0.15
Nodes (15): acceptProposalAction(), AcceptState, requestQuoteAction(), SERVICES, StartState, QuerySource, Quote, toSettings() (+7 more)

### Community 102 - "payroll/payroll.test.ts"
Cohesion: 0.17
Nodes (23): file(), GET(), safe(), Payroll(), PayrollPage(), GET(), employeesForMonth(), loadItems() (+15 more)

### Community 103 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (42): FormState, caseNote, caseTitle, Check(), ChecklistPreview(), ClientCaseForm(), statusTone, submitLabel (+34 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+10 more)

### Community 106 - "Textarea"
Cohesion: 0.17
Nodes (18): NewRequestForm(), TicketForm(), ReplyForm(), send(), METHODS, ProofUpload(), shrinkImage(), closeRequestAction() (+10 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (36): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName() (+28 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "fees/[id]/page.tsx"
Cohesion: 0.08
Nodes (55): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+47 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.25
Nodes (16): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), accumulated(), bookFor() (+8 more)

### Community 113 - "clients/[id]/page.tsx"
Cohesion: 0.15
Nodes (14): ClientPage(), fmtDate(), frequencyLabel, Row, Branch, branchSchema, branchUpdateSchema, groupByBranch() (+6 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "pending-review.tsx"
Cohesion: 0.19
Nodes (15): approveSelectedAction(), BOOKED, BulkState, key(), PendingReview(), PendingRow, ACCOUNT_SOURCES, AccountSource (+7 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 118 - "cycle/page.tsx"
Cohesion: 0.09
Nodes (42): DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), MonthComplete() (+34 more)

### Community 119 - "tax-codes.ts"
Cohesion: 0.18
Nodes (16): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+8 more)

### Community 121 - "source.ts"
Cohesion: 0.11
Nodes (29): Split, EwtLine, dayBefore(), FilingRow, ListedDocument, loadLedger(), loadWorksheet(), PAYROLL_FORM_CODES (+21 more)

### Community 122 - "work/load.ts"
Cohesion: 0.16
Nodes (17): loadAssets(), Row, Asset, lastMonth(), loadMyWork(), MyWork, plural(), ym() (+9 more)

### Community 123 - "xlsx.ts"
Cohesion: 0.18
Nodes (14): exceljs, accountLabel(), BATCH_COLUMNS, RawRow, ACCOUNTS, RENT, SALE, buildBatchTemplate() (+6 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.12
Nodes (20): Gap, BoardRow, FilingRow, holidaySet(), Risk, Step, ACTION_LABEL, availableActions() (+12 more)

### Community 126 - "supabaseAdmin"
Cohesion: 0.32
Nodes (7): @supabase/supabase-js, generateFilingsNow(), GenerateState, GenerateButton(), supabaseEnv(), runFilingGeneration(), supabaseAdmin()

### Community 127 - "LinkButton"
Cohesion: 0.37
Nodes (10): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+2 more)

### Community 128 - "leads/[id]/page.tsx"
Cohesion: 0.39
Nodes (6): Lead(), LeadPage(), TYPE_LABEL, LEAD_STATUS, LeadStatus, defaultTerms()

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "morning.ts"
Cohesion: 0.27
Nodes (11): GET(), Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+3 more)

### Community 131 - "supabaseServer"
Cohesion: 0.06
Nodes (47): nextConfig, next, postPayrollAction(), PostState, PostPayrollButton(), Detail(), StatementPage(), recomputeWorksheetAction() (+39 more)

### Community 132 - "quote/page.tsx"
Cohesion: 0.26
Nodes (12): convertLeadAction(), LeadState, refresh(), sendProposalAction(), setFunnelOpenAction(), setLeadStatusAction(), loadSchedules(), loadTaxOnFee() (+4 more)

### Community 133 - "tieouts.ts"
Cohesion: 0.17
Nodes (11): RegisterLine, LedgerTotals, purchases(), sales(), base, books, buy, sale (+3 more)

### Community 134 - "binder/page.tsx"
Cohesion: 0.43
Nodes (6): amt(), MonthSection(), one(), RegisterTable(), TIE_STATUS, SIGNED_REFS

### Community 135 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm()

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (27): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ApprovedTable(), BOOKED_TYPES (+19 more)

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "ui.tsx"
Cohesion: 0.09
Nodes (27): ExplainForm(), PayrollIntake(), SignOffState, AmendFilingForm(), checkTone, checkWord, needsNote(), noteLabel() (+19 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.05
Nodes (16): pg, vitest, ctx, input, root, root, root, root (+8 more)

### Community 141 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "cycle/actions.ts"
Cohesion: 0.25
Nodes (12): SentRow, TimelineRow, closeCycleAction(), confirmMonthAction(), CycleState, decideExceptionAction(), nothingToSubmitAction(), refresh() (+4 more)

### Community 144 - "FormModule"
Cohesion: 0.14
Nodes (11): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, LoadedWorksheet (+3 more)

### Community 145 - "zod"
Cohesion: 0.29
Nodes (11): zod, accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+3 more)

### Community 146 - "periods"
Cohesion: 0.67
Nodes (7): Periods, periods(), addMonths(), monthEnd(), pad2(), quarterOf(), taxableYear()

### Community 147 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 148 - "fields.ts"
Cohesion: 0.10
Nodes (30): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, BatchRow, streamOf() (+22 more)

### Community 149 - "manilaToday"
Cohesion: 0.09
Nodes (34): Binder(), BinderPage(), Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat() (+26 more)

### Community 150 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 151 - "lookupAtc"
Cohesion: 0.29
Nodes (10): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+2 more)

### Community 152 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, tsx@^4.23.15, @types/node@^20, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 153 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 154 - "templatePayload"
Cohesion: 0.16
Nodes (8): templatePayload(), as(), client(), root, as(), books(), root, root

### Community 155 - "amountInput"
Cohesion: 0.40
Nodes (10): inputs1701(), inputs1702RT(), penaltyInputs(), inputs1701Q(), inputs1702Q(), withoutBookFigures(), inputsFor(), amountInput() (+2 more)

### Community 156 - "requireOwner"
Cohesion: 0.12
Nodes (33): addEngagementAction(), assignStaffAction(), removeAssignmentAction(), setClientStatusAction(), FirmPage(), PLACES, Places(), cancelRegistrationAction() (+25 more)

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
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.15
Nodes (12): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+4 more)

### Community 162 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 163 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 164 - "filters.tsx"
Cohesion: 0.39
Nodes (5): PeriodFilter(), PeriodKey, periodRange(), PERIODS, ym()

### Community 165 - "money.ts"
Cohesion: 0.43
Nodes (5): applyRate(), basisPoints(), grossUp(), grouped, sum()

### Community 166 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 167 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 168 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 170 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1103 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `settings/page.tsx`, `supabaseServer`, `arap.ts`, `package.json`, `gemini.ts`, `tieouts.ts`, `app/documents/page.tsx`, `steps.ts`, `ledger.test.ts`, `onboarding/page.tsx`, `statements.ts`, `fields.ts`, `package.json`, `names.ts`, `templatePayload`, `server-only`, `index.ts`, `parts.ts`, `workpapers.test.ts`, `status.ts`, `filters.tsx`, `money.ts`, `register-books.test.ts`, `books-migration.test.ts`, `toCentavos`, `scores/page.tsx`, `tests/books.test.ts`, `month-complete.test.ts`, `@remixicon/react`, `tests/register.test.ts`, `lib/books/actions.ts`, `memo.ts`, `ledger/data.ts`, `Centavos`, `clients/schema.ts`, `money.ts`, `settings/page.tsx`, `fixed-assets.test.ts`, `returns/types.ts`, `testing.ts`, `funnel.test.ts`, `clients/[id]/page.tsx`, `opening-checklist.tsx`, `safeguards.ts`, `quote.ts`, `filings/actions.ts`, `app/app/page.tsx`, `books/reports/page.tsx`, `document-scanner.tsx`, `profile.ts`, `opening.ts`, `ledger-lock.test.ts`, `print/page.tsx`, `public.ts`, `registrations/forms.tsx`, `rates.ts`, `parties/[id]/page.tsx`, `db.test.ts`, `settings/actions.ts`, `fees/[id]/page.tsx`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `acting-approver.test.ts`, `pending-review.tsx`, `cycle/page.tsx`, `tax-codes.ts`, `source.ts`, `work/load.ts`, `xlsx.ts`, `sign-off.ts`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.10256410256410256 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `leads/[id]/page.tsx`, `checkbox.tsx`, `supabaseServer`, `quote/page.tsx`, `notification.tsx`, `binder/page.tsx`, `fixed-assets/forms.tsx`, `app/documents/page.tsx`, `ui.tsx`, `steps.ts`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `cycle/actions.ts`, `fields.ts`, `manilaToday`, `package.json`, `requireOwner`, `parts.ts`, `filters.tsx`, `toCentavos`, `scores/page.tsx`, `@remixicon/react`, `payroll/forms.tsx`, `batch/register.ts`, `ledger/data.ts`, `payroll/data.ts`, `worksheet/page.tsx`, `Notice`, `settings/page.tsx`, `filings/[id]/page.tsx`, `review-forms.tsx`, `tabs.tsx`, `cx`, `file-upload.tsx`, `books/forms.tsx`, `clients/[id]/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `quote.ts`, `books/page.tsx`, `app/app/page.tsx`, `button.tsx`, `cx.ts`, `[clientId]/page.tsx`, `books/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `profile.ts`, `Skeleton`, `print/page.tsx`, `payroll/payroll.test.ts`, `registrations/forms.tsx`, `Textarea`, `parties/[id]/page.tsx`, `fees/[id]/page.tsx`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `pending-review.tsx`, `staff/page.tsx`, `cycle/page.tsx`, `supabaseAdmin`, `LinkButton`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `settings/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08082706766917293 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `leads/[id]/page.tsx`, `react`, `morning.ts`, `quote/page.tsx`, `binder/page.tsx`, `fixed-assets/forms.tsx`, `app/documents/page.tsx`, `src/app/layout.tsx`, `ui.tsx`, `steps.ts`, `onboarding/page.tsx`, `proxy.ts`, `dependencies`, `cycle/actions.ts`, `zod`, `fields.ts`, `manilaToday`, `package.json`, `requireOwner`, `server-only`, `parts.ts`, `toCentavos`, `scores/page.tsx`, `@remixicon/react`, `parties/forms.tsx`, `payroll/forms.tsx`, `collections/actions.ts`, `batch/register.ts`, `ledger/data.ts`, `payroll/data.ts`, `worksheet/page.tsx`, `Notice`, `settings/page.tsx`, `filings/[id]/page.tsx`, `review-forms.tsx`, `cx`, `books/forms.tsx`, `clients/[id]/page.tsx`, `opening-checklist.tsx`, `theme-toggle.tsx`, `quote.ts`, `filings/actions.ts`, `books/page.tsx`, `app/app/page.tsx`, `[clientId]/page.tsx`, `books/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `profile.ts`, `Skeleton`, `print/page.tsx`, `public.ts`, `payroll/payroll.test.ts`, `Textarea`, `parties/[id]/page.tsx`, `settings/actions.ts`, `fees/[id]/page.tsx`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `batch/template/route.ts`, `supabaseAdmin`, `LinkButton`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._