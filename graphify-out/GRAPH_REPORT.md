# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 592 files · ~468,744 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3792 nodes · 12549 edges · 171 communities (148 shown, 23 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `c73d5663`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- start/page.tsx
- generate.ts
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- manilaToday
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
- @remixicon/react
- parties/forms.tsx
- payroll/forms.tsx
- Centavos
- lib/books/actions.ts
- scripts
- profile.ts
- memo.ts
- batch/forms.tsx
- engine.ts
- payroll/data.ts
- receipts.ts
- payroll/payroll.test.ts
- clients/schema.ts
- money.ts
- Notice
- settings/page.tsx
- toCentavos
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
- resolve.ts
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- safeguards.ts
- theme-toggle.tsx
- quote.ts
- filings/actions.ts
- books/page.tsx
- requireStaff
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
- dates.ts
- BoardUI theming reference
- Pro templates
- react
- print/page.tsx
- public.ts
- payroll/data.ts
- registrations/forms.tsx
- boardui
- rates.ts
- Textarea
- parties/[id]/page.tsx
- db.test.ts
- seed.ts
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
- review-queue.ts
- source.ts
- work/load.ts
- xlsx.ts
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- deadlines/actions.ts
- ui.tsx
- Card
- checkbox.tsx
- safeguards-load.ts
- documents/actions.ts
- quote/page.tsx
- tieouts.ts
- binder/page.tsx
- fixed-assets/forms.tsx
- Badge
- sidebar-toggle.tsx
- sign-off-actions.tsx
- ledger.test.ts
- vitest
- social-button.tsx
- proxy.ts
- IsoDate
- FormModule
- messages.ts
- fees.test.ts
- eslint.config.mjs
- fields.ts
- statement-view.tsx
- ref_node_fs
- lookupAtc
- package.json
- names.ts
- any-cutoff.test.ts
- ledger-closing.test.ts
- supabaseServer
- server-only
- BoardUI page patterns
- ledger/types.ts
- parts.ts
- Rework: one flow from lead to year-end
- workpapers.test.ts
- status.ts
- filters.tsx
- ledger-documents.test.ts
- tests/parties.test.ts
- books-migration.test.ts
- tests/books.test.ts
- month-complete.test.ts
- tests/payroll.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 254 edges
2. `Notice()` - 176 edges
3. `cx` - 167 edges
4. `Button()` - 162 edges
5. `react` - 162 edges
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

## Communities (171 total, 23 thin omitted)

### Community 0 - "start/page.tsx"
Cohesion: 0.31
Nodes (8): Proposal(), php, StartForm(), metadata, Start(), StartPage(), funnelLive(), funnelOpen()

### Community 1 - "generate.ts"
Cohesion: 0.15
Nodes (19): Rule, PlannedObligation, DueRule, EfpsGroup, FilingChannel, Frequency, PeriodFilter, ACTIVE (+11 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (28): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, ButtonProps, CloseButton() (+20 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (19): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+11 more)

### Community 5 - "package.json"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

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

### Community 11 - "manilaToday"
Cohesion: 0.20
Nodes (17): Detail(), StatementPage(), portalContext(), Payroll(), PortalPayroll(), STATUS, when(), PortalReport() (+9 more)

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
Cohesion: 0.09
Nodes (39): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine() (+31 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.13
Nodes (43): incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow (+35 more)

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
Cohesion: 0.13
Nodes (30): saveMonthAction(), applyRegister(), previewOf(), totals(), PayrollItem, sortItems(), checkRegister(), fmt() (+22 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (36): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+28 more)

### Community 42 - "income.ts"
Cohesion: 0.11
Nodes (59): BIR_LINES, BirLineKey, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701() (+51 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "@remixicon/react"
Cohesion: 0.16
Nodes (22): @remixicon/react, RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail() (+14 more)

### Community 45 - "parties/forms.tsx"
Cohesion: 0.21
Nodes (15): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), lookupParties(), blank() (+7 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (40): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+32 more)

### Community 47 - "Centavos"
Cohesion: 0.15
Nodes (22): GridRow, AlphaCols, AlphalistRow, Form2316Line, AnnualSummary, MonthLines, PriorAmounts, Suggestion (+14 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.07
Nodes (31): AmendmentFlag, BooksMonthRow, CodeSource, Db, decideBooksUnlock(), DocumentCodes, DocumentPortion, DocumentPosting (+23 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.14
Nodes (19): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+11 more)

### Community 51 - "memo.ts"
Cohesion: 0.15
Nodes (15): ReviewNote, Memo, MemoInput, MemoMonth, ALWAYS, MonthActivity, REFS_FOR_FORM, refsToSign() (+7 more)

### Community 52 - "batch/forms.tsx"
Cohesion: 0.27
Nodes (12): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), loadAccounts(), loadBatchContext(), monthsBetween() (+4 more)

### Community 53 - "engine.ts"
Cohesion: 0.23
Nodes (17): compareIso(), lastDayOfMonth(), DeadlineRule, fiscalYearOf(), followsCalendarYear(), generateFilingInstances(), nextWorkingDay(), Obligation (+9 more)

### Community 54 - "payroll/data.ts"
Cohesion: 0.16
Nodes (26): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), GET(), Certificates2316, certificatesFromRaw(), Form2316Signatory (+18 more)

### Community 55 - "receipts.ts"
Cohesion: 0.22
Nodes (11): firmBlockLines(), formatTin(), cents(), CLIENT_MONEY_KINDS, FEE_KINDS, GrossReceiptsWatch, grossReceiptsWatch(), pesos() (+3 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.15
Nodes (25): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+17 more)

### Community 57 - "clients/schema.ts"
Cohesion: 0.14
Nodes (14): zod, obligationChanges(), obligationsForTaxTypes(), TAXPAYER_TYPES, TaxTypeError, forms(), assignmentSchema, clientFields (+6 more)

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (58): FinancialStatements, Split, INPUTS, MONTH, agentBackground(), agentErrors(), tinDashed(), atcSchedule() (+50 more)

### Community 59 - "Notice"
Cohesion: 0.11
Nodes (63): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ChangeBooksStartForm(), EntryForm(), ReleaseReportForm() (+55 more)

### Community 60 - "settings/page.tsx"
Cohesion: 0.08
Nodes (42): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), periodWord (+34 more)

### Community 61 - "toCentavos"
Cohesion: 0.23
Nodes (14): amt(), ApprovalMemo(), Db, TIE, loadAssets(), dayBefore(), loadLedger(), toCentavos() (+6 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "review-forms.tsx"
Cohesion: 0.17
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "cx"
Cohesion: 0.06
Nodes (51): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+43 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.10
Nodes (37): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+29 more)

### Community 68 - "testing.ts"
Cohesion: 0.17
Nodes (19): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+11 more)

### Community 69 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 70 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (42): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+34 more)

### Community 72 - "resolve.ts"
Cohesion: 0.29
Nodes (12): displayName(), fullAddress(), partyTinLabel(), ABBREVIATIONS, fillFromDirectory(), nameTokens(), PartyFields, resolveParty() (+4 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.14
Nodes (21): Access, OpeningChecklist(), STATUS, Row, Asset, Cutoff, cutoffOf(), PNL_TYPES (+13 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "safeguards.ts"
Cohesion: 0.22
Nodes (13): documentCutoff(), DONE_FROM_STATUS, isWorkingDay(), riskOf(), STEP_LABELS, StepKey, stepsFor(), StepWho (+5 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.06
Nodes (58): TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), lastWholeMonths() (+50 more)

### Community 80 - "filings/actions.ts"
Cohesion: 0.38
Nodes (10): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+2 more)

### Community 81 - "books/page.tsx"
Cohesion: 0.16
Nodes (23): AmendmentDecision(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+15 more)

### Community 82 - "requireStaff"
Cohesion: 0.09
Nodes (50): DashboardStats(), FilingListRow, FilingTable(), BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE (+42 more)

### Community 83 - "button.tsx"
Cohesion: 0.08
Nodes (30): Button(), ButtonLink(), ButtonLinkProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+22 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (37): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+29 more)

### Community 87 - "books/reports/page.tsx"
Cohesion: 0.18
Nodes (17): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReports(), Reports(), when() (+9 more)

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
Cohesion: 0.14
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+11 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.15
Nodes (21): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+13 more)

### Community 93 - "brand/forms.tsx"
Cohesion: 0.14
Nodes (21): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+13 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "dates.ts"
Cohesion: 0.39
Nodes (9): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff() (+1 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "react"
Cohesion: 0.08
Nodes (51): nextConfig, next, react, Accounts(), AccountsPage(), GROUPS, EditClient(), EditClientPage() (+43 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.07
Nodes (57): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+49 more)

### Community 101 - "public.ts"
Cohesion: 0.07
Nodes (35): dateFmt, statusLabel, statusTone, Supabase, acceptProposalAction(), AcceptState, requestQuoteAction(), SERVICES (+27 more)

### Community 102 - "payroll/data.ts"
Cohesion: 0.09
Nodes (43): GET(), safe(), EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), file(), GET() (+35 more)

### Community 103 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (79): ClientCaseKind, dtiRegisteredOn(), FormState, openClientCaseAction(), openYearRenewalsAction(), caseNote, caseTitle, Check() (+71 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "Textarea"
Cohesion: 0.13
Nodes (28): ReplyForm(), send(), METHODS, ProofUpload(), send(), getIdentity(), amount, date (+20 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.13
Nodes (25): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), listNameCols(), Names (+17 more)

### Community 109 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 110 - "fees/[id]/page.tsx"
Cohesion: 0.15
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.35
Nodes (10): accumulated(), bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor(), monthIndex(), monthTotals(), rangeTotals(), RESIDUAL (+2 more)

### Community 113 - "clients/[id]/page.tsx"
Cohesion: 0.12
Nodes (27): FormState, ClientValues, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm() (+19 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "pending-review.tsx"
Cohesion: 0.19
Nodes (15): approveSelectedAction(), BOOKED, BulkState, key(), PendingReview(), PendingRow, ACCOUNT_SOURCES, AccountSource (+7 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.43
Nodes (6): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), StaffList()

### Community 118 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (26): Cycle(), CyclePage(), CycleWithClient, DocRow, MonthComplete(), TimelineRow, CloseCycleButton(), Message() (+18 more)

### Community 119 - "tax-codes.ts"
Cohesion: 0.18
Nodes (16): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+8 more)

### Community 120 - "review-queue.ts"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 121 - "source.ts"
Cohesion: 0.08
Nodes (43): recomputeWorksheetAction(), WorksheetState, GET(), Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+35 more)

### Community 122 - "work/load.ts"
Cohesion: 0.20
Nodes (16): addDays(), loadBoard(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 123 - "xlsx.ts"
Cohesion: 0.12
Nodes (25): accountLabel(), BATCH_COLUMNS, BATCH_KINDS, BatchCheck, BatchColumn, BatchContext, centavosOf(), checkRow() (+17 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.17
Nodes (13): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner (+5 more)

### Community 126 - "deadlines/actions.ts"
Cohesion: 0.60
Nodes (4): generateFilingsNow(), GenerateState, GenerateButton(), runFilingGeneration()

### Community 127 - "ui.tsx"
Cohesion: 0.12
Nodes (28): Batch(), BatchPage(), one(), toCentavos(), NewEntry(), NewEntryPage(), amt(), FixedAssets() (+20 more)

### Community 128 - "Card"
Cohesion: 0.13
Nodes (23): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), Lead(), LeadPage() (+15 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "safeguards-load.ts"
Cohesion: 0.10
Nodes (27): CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay(), NEEDS (+19 more)

### Community 131 - "documents/actions.ts"
Cohesion: 0.18
Nodes (15): send(), upload(), typeFromName(), ALLOWED, finishUpload(), replyDocumentAction(), runOcrAction(), StartUpload (+7 more)

### Community 132 - "quote/page.tsx"
Cohesion: 0.19
Nodes (21): convertLeadAction(), LeadState, refresh(), sendProposalAction(), setFunnelOpenAction(), setLeadStatusAction(), FunnelSwitch(), loadItems() (+13 more)

### Community 133 - "tieouts.ts"
Cohesion: 0.14
Nodes (15): RegisterLine, PeriodFile, AssetTotals, LedgerTotals, PayrollTotals, purchases(), sales(), base (+7 more)

### Community 134 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 135 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 136 - "Badge"
Cohesion: 0.07
Nodes (62): Doc, DocumentsCard(), when(), ExceptionRow, ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking() (+54 more)

### Community 137 - "sidebar-toggle.tsx"
Cohesion: 0.18
Nodes (12): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+4 more)

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.07
Nodes (12): pg, vitest, root, root, root, root, root, root (+4 more)

### Community 141 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "IsoDate"
Cohesion: 0.21
Nodes (13): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+5 more)

### Community 144 - "FormModule"
Cohesion: 0.14
Nodes (12): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, form1601C (+4 more)

### Community 145 - "messages.ts"
Cohesion: 0.38
Nodes (5): cycleMessage(), dayFmt, NoticeKind, showDay(), Due

### Community 147 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 148 - "fields.ts"
Cohesion: 0.10
Nodes (30): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, BatchRow, streamOf() (+22 more)

### Community 149 - "statement-view.tsx"
Cohesion: 0.18
Nodes (14): Detail(), PayNow(), proofBadge, proofMethod, statusBadge, FirmBlock, PayAccount, PaymentProof (+6 more)

### Community 150 - "ref_node_fs"
Cohesion: 0.13
Nodes (7): outDir, pkgDir, require, { version }, ctx, input, root

### Community 151 - "lookupAtc"
Cohesion: 0.25
Nodes (12): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+4 more)

### Community 152 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, tsx@^4.23.15, @types/node@^20, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 153 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 154 - "any-cutoff.test.ts"
Cohesion: 0.50
Nodes (3): as(), client(), root

### Community 155 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 156 - "supabaseServer"
Cohesion: 0.08
Nodes (54): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction() (+46 more)

### Community 157 - "server-only"
Cohesion: 0.18
Nodes (14): server-only, @supabase/supabase-js, GET(), GET(), digestMessage(), DigestRow, longDay(), peso (+6 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 159 - "ledger/types.ts"
Cohesion: 0.08
Nodes (27): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+19 more)

### Community 160 - "parts.ts"
Cohesion: 0.11
Nodes (39): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+31 more)

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
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 167 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 168 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1103 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `react` to `Card`, `start/page.tsx`, `documents/actions.ts`, `quote/page.tsx`, `binder/page.tsx`, `fixed-assets/forms.tsx`, `Badge`, `sidebar-toggle.tsx`, `sign-off-actions.tsx`, `manilaToday`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `proxy.ts`, `fields.ts`, `package.json`, `supabaseServer`, `server-only`, `parts.ts`, `scores/page.tsx`, `@remixicon/react`, `parties/forms.tsx`, `payroll/forms.tsx`, `batch/forms.tsx`, `payroll/data.ts`, `Notice`, `settings/page.tsx`, `toCentavos`, `review-forms.tsx`, `cx`, `books/forms.tsx`, `opening-checklist.tsx`, `theme-toggle.tsx`, `filings/actions.ts`, `books/page.tsx`, `requireStaff`, `[clientId]/page.tsx`, `books/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `brand/forms.tsx`, `print/page.tsx`, `public.ts`, `payroll/data.ts`, `registrations/forms.tsx`, `Textarea`, `parties/[id]/page.tsx`, `fees/[id]/page.tsx`, `clients/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `source.ts`, `deadlines/actions.ts`, `ui.tsx`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `generate.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14624505928853754 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `generate.ts`, `safeguards-load.ts`, `arap.ts`, `package.json`, `gemini.ts`, `tieouts.ts`, `Badge`, `ledger.test.ts`, `onboarding/page.tsx`, `social-button.tsx`, `IsoDate`, `messages.ts`, `statements.ts`, `fees.test.ts`, `fields.ts`, `ref_node_fs`, `package.json`, `names.ts`, `any-cutoff.test.ts`, `ledger-closing.test.ts`, `server-only`, `ledger/types.ts`, `parts.ts`, `workpapers.test.ts`, `status.ts`, `filters.tsx`, `ledger-documents.test.ts`, `tests/parties.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `scores/page.tsx`, `month-complete.test.ts`, `tests/payroll.test.ts`, `@remixicon/react`, `payroll/forms.tsx`, `lib/books/actions.ts`, `memo.ts`, `engine.ts`, `receipts.ts`, `payroll/payroll.test.ts`, `clients/schema.ts`, `money.ts`, `settings/page.tsx`, `fixed-assets.test.ts`, `returns/types.ts`, `testing.ts`, `funnel.test.ts`, `opening-checklist.tsx`, `safeguards.ts`, `quote.ts`, `requireStaff`, `[clientId]/page.tsx`, `document-scanner.tsx`, `opening.ts`, `dates.ts`, `print/page.tsx`, `public.ts`, `registrations/forms.tsx`, `rates.ts`, `parties/[id]/page.tsx`, `db.test.ts`, `fees/[id]/page.tsx`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `acting-approver.test.ts`, `pending-review.tsx`, `cycle/page.tsx`, `tax-codes.ts`, `review-queue.ts`, `source.ts`, `xlsx.ts`, `sign-off.ts`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `Card`, `start/page.tsx`, `checkbox.tsx`, `notification.tsx`, `quote/page.tsx`, `binder/page.tsx`, `fixed-assets/forms.tsx`, `Badge`, `sidebar-toggle.tsx`, `sign-off-actions.tsx`, `manilaToday`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `statements.ts`, `fields.ts`, `statement-view.tsx`, `package.json`, `supabaseServer`, `parts.ts`, `filters.tsx`, `scores/page.tsx`, `@remixicon/react`, `payroll/forms.tsx`, `batch/forms.tsx`, `Notice`, `settings/page.tsx`, `review-forms.tsx`, `tabs.tsx`, `cx`, `file-upload.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `books/page.tsx`, `requireStaff`, `button.tsx`, `cx.ts`, `[clientId]/page.tsx`, `books/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `brand/forms.tsx`, `print/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `Textarea`, `parties/[id]/page.tsx`, `fees/[id]/page.tsx`, `clients/[id]/page.tsx`, `pending-review.tsx`, `staff/page.tsx`, `cycle/page.tsx`, `source.ts`, `deadlines/actions.ts`, `ui.tsx`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07956989247311828 - nodes in this community are weakly interconnected._