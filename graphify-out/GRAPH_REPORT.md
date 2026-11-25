# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 511 files · ~402,216 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3395 nodes · 11137 edges · 149 communities (130 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 111 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `2976463f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-off.ts
- generate.ts
- migrate.yml
- FormModule
- arap.ts
- devDependencies
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- settings/page.tsx
- Sign-in & Setup Docs
- registrations/[id]/page.tsx
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
- clients/[id]/page.tsx
- scores/page.tsx
- Notice
- payroll/forms.tsx
- Skeleton
- ref_node_fs
- payroll/payroll.test.ts
- registrations/forms.tsx
- notification.tsx
- scripts
- percentage.ts
- ledger/types.ts
- payroll/data.ts
- deadlines/page.tsx
- payroll/types.ts
- portal/documents/page.tsx
- returns/types.ts
- clients/schema.ts
- returns/types.ts
- books/page.tsx
- gap/page.tsx
- @remixicon/react
- fixed-assets.test.ts
- statement-view.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- returns/load.ts
- vitest
- worksheet/page.tsx
- fields.ts
- books/forms.tsx
- react
- Rules
- Animation Performance
- deadlines/page.tsx
- stat-cards.tsx
- index.ts
- theme-toggle.tsx
- quote/page.tsx
- income.ts
- parties/parties.test.ts
- requireStaff
- button.tsx
- Pro components
- cx.ts
- file-upload.tsx
- workpapers/load.ts
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- LinkButton
- server-only
- opening.ts
- Recipes
- supabaseServer
- BoardUI theming reference
- Pro templates
- collections/actions.ts
- print/page.tsx
- Textarea
- BoardUI page patterns
- profile.ts
- boardui
- rates.ts
- books/reports/page.tsx
- parties/[id]/page.tsx
- engine.ts
- settings/actions.ts
- quote/page.tsx
- documents/[id]/page.tsx
- source.ts
- compute.ts
- acting-approver.test.ts
- pending-review.tsx
- parties/actions.ts
- apply-migrations.sh
- showMonth
- 2316/page.tsx
- buildSawt
- breadcrumb.tsx
- templatePayload
- Badge
- Staff and Owner UX review (Phase 1)
- sign-off-actions.tsx
- review-queue.ts
- template.ts
- year/[year]/page.tsx
- checkbox.tsx
- db.test.ts
- seed.ts
- IsoDate
- portal-nav.tsx
- fixed-assets/forms.tsx
- obligations.ts
- documents/period.ts
- src/app/layout.tsx
- copy-opencv.mjs
- ledger.test.ts
- register-books.test.ts
- sign-in-form.tsx
- proxy.ts
- ledger-lock.test.ts
- register.test.ts
- eslint.config.mjs
- parts.ts
- workpapers.test.ts
- fields.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 220 edges
2. `cx` - 151 edges
3. `Notice()` - 148 edges
4. `react` - 145 edges
5. `Button()` - 143 edges
6. `Skeleton()` - 126 edges
7. `next` - 121 edges
8. `Badge()` - 119 edges
9. `Card()` - 119 edges
10. `PageHeader()` - 101 edges

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

## Communities (149 total, 19 thin omitted)

### Community 0 - "sign-off.ts"
Cohesion: 0.17
Nodes (13): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner (+5 more)

### Community 1 - "generate.ts"
Cohesion: 0.14
Nodes (20): generateFilingsNow(), GenerateState, GenerateButton(), Rule, DueRule, EfpsGroup, FilingChannel, Frequency (+12 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "FormModule"
Cohesion: 0.14
Nodes (11): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, WITHHOLDING_FORMS (+3 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 5 - "devDependencies"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "gemini.ts"
Cohesion: 0.10
Nodes (23): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, ocrOutputSchema, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL (+15 more)

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

### Community 11 - "settings/page.tsx"
Cohesion: 0.17
Nodes (22): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+14 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "registrations/[id]/page.tsx"
Cohesion: 0.16
Nodes (30): CompleteButton(), StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+22 more)

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
Cohesion: 0.09
Nodes (39): CASH_FLOW_CLASSES, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section (+31 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.14
Nodes (42): Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow, addMonths() (+34 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "clients/[id]/page.tsx"
Cohesion: 0.12
Nodes (27): FormState, ClientForm(), frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm() (+19 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.06
Nodes (64): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), OcrRate (+56 more)

### Community 42 - "Notice"
Cohesion: 0.09
Nodes (56): AccountForm(), BookPicker(), EntryForm(), ReleaseReportForm(), EmployeeForm(), EmployeeUpload(), ItemForm(), PayrollSettingsForm() (+48 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (48): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+40 more)

### Community 44 - "Skeleton"
Cohesion: 0.07
Nodes (50): nextConfig, next, NewEntry(), NewEntryPage(), EditClient(), EditClientPage(), amt(), FixedAssets() (+42 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.07
Nodes (13): pg, vitest, ctx, input, root, root, root, root (+5 more)

### Community 46 - "payroll/payroll.test.ts"
Cohesion: 0.10
Nodes (40): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), applyRegister(), previewOf(), RegisterPreview, totals() (+32 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (57): ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction(), updateStepAction() (+49 more)

### Community 48 - "notification.tsx"
Cohesion: 0.08
Nodes (29): react-dom@19.3.0, react-dom, UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles (+21 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "percentage.ts"
Cohesion: 0.19
Nodes (28): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+20 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.10
Nodes (29): Accounts(), AccountsPage(), GROUPS, CashFlowClass, codes, PNL, COA_TEMPLATES, accountFromRow() (+21 more)

### Community 52 - "payroll/data.ts"
Cohesion: 0.10
Nodes (48): @supabase/supabase-js, saveMonthAction(), EmployeeDetail(), EmployeePage(), file(), GET(), safe(), PayrollMonth() (+40 more)

### Community 53 - "deadlines/page.tsx"
Cohesion: 0.13
Nodes (22): board, MARCO, none, RHEA, row(), steps, documentCutoff(), DONE_FROM_STATUS (+14 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "portal/documents/page.tsx"
Cohesion: 0.12
Nodes (27): Doc, when(), ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS (+19 more)

### Community 56 - "returns/types.ts"
Cohesion: 0.11
Nodes (33): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+25 more)

### Community 57 - "clients/schema.ts"
Cohesion: 0.12
Nodes (14): zod, assignmentSchema, clientFields, editClientSchema, efpsGroupError, engagementSchema, NewClient, newClientSchema (+6 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.08
Nodes (46): incomePayment(), VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule() (+38 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.18
Nodes (25): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+17 more)

### Community 60 - "gap/page.tsx"
Cohesion: 0.16
Nodes (21): loadSchedules(), loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), Preview(), TaxpayerType, EstimatedProfile (+13 more)

### Community 61 - "@remixicon/react"
Cohesion: 0.14
Nodes (25): @remixicon/react, RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, portalContext(), Nav() (+17 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "statement-view.tsx"
Cohesion: 0.16
Nodes (20): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Detail(), PayNow(), proofBadge, proofMethod (+12 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.07
Nodes (36): InputOtp(), InputOtpProps, Kbd(), KbdProps, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps (+28 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/load.ts"
Cohesion: 0.11
Nodes (21): recomputeWorksheetAction(), WorksheetState, FinancialStatements, Split, EwtLine, dayBefore(), FilingRow, ListedDocument (+13 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "worksheet/page.tsx"
Cohesion: 0.31
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 70 - "fields.ts"
Cohesion: 0.14
Nodes (17): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, ALLOWED, DocActionState (+9 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (37): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+29 more)

### Community 72 - "react"
Cohesion: 0.10
Nodes (22): react, DocReviewActions(), postPayrollAction(), PostState, PostPayrollButton(), ExplainState, ExplainForm(), SetupCharts() (+14 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "deadlines/page.tsx"
Cohesion: 0.15
Nodes (22): ClientValues, BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO, TAX_TYPES (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (34): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+26 more)

### Community 77 - "index.ts"
Cohesion: 0.11
Nodes (15): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+7 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "quote/page.tsx"
Cohesion: 0.08
Nodes (48): longDate(), PriceRow, COMPLEXITY_LABEL, Lines(), QuoteView(), TAXPAYER_LABEL, Total(), count() (+40 more)

### Community 80 - "income.ts"
Cohesion: 0.13
Nodes (33): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+25 more)

### Community 81 - "parties/parties.test.ts"
Cohesion: 0.21
Nodes (16): displayName(), fullAddress(), listNameCols(), Party, partyTinLabel(), person, ABBREVIATIONS, fillFromDirectory() (+8 more)

### Community 82 - "requireStaff"
Cohesion: 0.08
Nodes (54): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), FilingListRow, FilingTable() (+46 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 86 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 87 - "workpapers/load.ts"
Cohesion: 0.07
Nodes (51): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), Row (+43 more)

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
Cohesion: 0.14
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+11 more)

### Community 92 - "LinkButton"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 93 - "server-only"
Cohesion: 0.11
Nodes (26): server-only, GET(), GET(), digestMessage(), DigestRow, longDay(), peso, time() (+18 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+9 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "supabaseServer"
Cohesion: 0.08
Nodes (54): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction() (+46 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "collections/actions.ts"
Cohesion: 0.29
Nodes (13): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+5 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (49): exceljs, dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate() (+41 more)

### Community 101 - "Textarea"
Cohesion: 0.18
Nodes (21): NewRequestForm(), TicketForm(), CloseRequestButton(), ReplyForm(), send(), METHODS, ProofUpload(), send() (+13 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 106 - "books/reports/page.tsx"
Cohesion: 0.17
Nodes (17): fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when(), PortalReports() (+9 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.15
Nodes (20): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names (+12 more)

### Community 108 - "engine.ts"
Cohesion: 0.16
Nodes (28): DocumentsCard(), shift(), addDays(), addMonths(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso() (+20 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "quote/page.tsx"
Cohesion: 0.10
Nodes (39): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+31 more)

### Community 111 - "documents/[id]/page.tsx"
Cohesion: 0.22
Nodes (11): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), LOCKED_STATUSES, LockFiling, lockingFiling(), checkFields() (+3 more)

### Community 112 - "source.ts"
Cohesion: 0.22
Nodes (16): amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND, DocumentRow, fromRegisterLine(), isApproved(), monthInPeriod() (+8 more)

### Community 113 - "compute.ts"
Cohesion: 0.09
Nodes (49): GridRow, AlphaCols, AlphalistRow, certificatesFromRaw(), form2316(), Form2316Data, Form2316Employer, Form2316Line (+41 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "pending-review.tsx"
Cohesion: 0.12
Nodes (30): approveSelectedAction(), BOOKED, BulkState, key(), ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList() (+22 more)

### Community 116 - "parties/actions.ts"
Cohesion: 0.22
Nodes (14): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), blank(), optionalText(), PartyInput (+6 more)

### Community 118 - "showMonth"
Cohesion: 0.10
Nodes (37): Cycle(), CyclePage(), CycleWithClient, DocRow, PortalClient, MonthComplete(), SentRow, TimelineRow (+29 more)

### Community 119 - "2316/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 120 - "buildSawt"
Cohesion: 0.25
Nodes (12): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+4 more)

### Community 121 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 122 - "templatePayload"
Cohesion: 0.22
Nodes (5): templatePayload(), as(), books(), root, root

### Community 123 - "Badge"
Cohesion: 0.20
Nodes (17): amt(), one(), shiftMonth(), SignStatus(), STATUS, TieRow(), Workpapers(), WorkpapersPage() (+9 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off-actions.tsx"
Cohesion: 0.26
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 126 - "review-queue.ts"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 127 - "template.ts"
Cohesion: 0.22
Nodes (6): items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL

### Community 128 - "year/[year]/page.tsx"
Cohesion: 0.46
Nodes (7): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings()

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 131 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 132 - "IsoDate"
Cohesion: 0.21
Nodes (13): invoiceLabel(), missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling, TimelineItem (+5 more)

### Community 133 - "portal-nav.tsx"
Cohesion: 0.29
Nodes (6): baseTabs, GRID_COLS, payrollTab, registrationTab, reportsTab, requestsTab

### Community 134 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 135 - "obligations.ts"
Cohesion: 0.52
Nodes (5): obligationChanges(), obligationsForTaxTypes(), PlannedObligation, TaxTypeError, forms()

### Community 136 - "documents/period.ts"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 141 - "sign-in-form.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 144 - "register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 145 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 146 - "parts.ts"
Cohesion: 0.12
Nodes (37): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+29 more)

### Community 147 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 148 - "fields.ts"
Cohesion: 0.16
Nodes (16): ok, FieldKey, keys, normalizeAmount(), normalizeFields(), normalizePartyKind(), normalizeTerms(), normalizeTin() (+8 more)

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 986 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `year/[year]/page.tsx`, `generate.ts`, `checkbox.tsx`, `devDependencies`, `fixed-assets/forms.tsx`, `settings/page.tsx`, `registrations/[id]/page.tsx`, `sign-in-form.tsx`, `dependencies`, `parts.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `Skeleton`, `registrations/forms.tsx`, `notification.tsx`, `ledger/types.ts`, `payroll/data.ts`, `portal/documents/page.tsx`, `books/page.tsx`, `gap/page.tsx`, `@remixicon/react`, `statement-view.tsx`, `tabs.tsx`, `dropdown.tsx`, `worksheet/page.tsx`, `fields.ts`, `books/forms.tsx`, `deadlines/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `quote/page.tsx`, `requireStaff`, `button.tsx`, `cx.ts`, `file-upload.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `print/page.tsx`, `Textarea`, `profile.ts`, `books/reports/page.tsx`, `parties/[id]/page.tsx`, `quote/page.tsx`, `documents/[id]/page.tsx`, `pending-review.tsx`, `showMonth`, `2316/page.tsx`, `breadcrumb.tsx`, `Badge`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `generate.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1402116402116402 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Skeleton` to `year/[year]/page.tsx`, `generate.ts`, `devDependencies`, `fixed-assets/forms.tsx`, `portal-nav.tsx`, `src/app/layout.tsx`, `settings/page.tsx`, `registrations/[id]/page.tsx`, `sign-in-form.tsx`, `dependencies`, `proxy.ts`, `parts.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `payroll/forms.tsx`, `payroll/payroll.test.ts`, `registrations/forms.tsx`, `ledger/types.ts`, `payroll/data.ts`, `portal/documents/page.tsx`, `clients/schema.ts`, `books/page.tsx`, `gap/page.tsx`, `@remixicon/react`, `statement-view.tsx`, `returns/load.ts`, `worksheet/page.tsx`, `fields.ts`, `books/forms.tsx`, `react`, `deadlines/page.tsx`, `quote/page.tsx`, `requireStaff`, `workpapers/load.ts`, `app/app/layout.tsx`, `LinkButton`, `server-only`, `supabaseServer`, `collections/actions.ts`, `print/page.tsx`, `Textarea`, `profile.ts`, `books/reports/page.tsx`, `parties/[id]/page.tsx`, `settings/actions.ts`, `quote/page.tsx`, `documents/[id]/page.tsx`, `pending-review.tsx`, `parties/actions.ts`, `showMonth`, `2316/page.tsx`, `breadcrumb.tsx`, `Badge`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ref_node_fs` to `sign-off.ts`, `generate.ts`, `db.test.ts`, `IsoDate`, `devDependencies`, `arap.ts`, `obligations.ts`, `documents/period.ts`, `gemini.ts`, `settings/page.tsx`, `ledger.test.ts`, `registrations/[id]/page.tsx`, `sign-in-form.tsx`, `ledger-lock.test.ts`, `register-books.test.ts`, `register.test.ts`, `statements.ts`, `parts.ts`, `fields.ts`, `workpapers.test.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `payroll/forms.tsx`, `payroll/payroll.test.ts`, `registrations/forms.tsx`, `ledger/types.ts`, `deadlines/page.tsx`, `returns/types.ts`, `clients/schema.ts`, `returns/types.ts`, `gap/page.tsx`, `@remixicon/react`, `fixed-assets.test.ts`, `returns/load.ts`, `vitest`, `deadlines/page.tsx`, `index.ts`, `quote/page.tsx`, `parties/parties.test.ts`, `requireStaff`, `workpapers/load.ts`, `document-scanner.tsx`, `server-only`, `opening.ts`, `print/page.tsx`, `profile.ts`, `rates.ts`, `books/reports/page.tsx`, `engine.ts`, `settings/actions.ts`, `quote/page.tsx`, `documents/[id]/page.tsx`, `source.ts`, `compute.ts`, `acting-approver.test.ts`, `pending-review.tsx`, `showMonth`, `templatePayload`, `review-queue.ts`, `template.ts`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Should `FormModule` be split into smaller, more focused modules?**
  _Cohesion score 0.14166666666666666 - nodes in this community are weakly interconnected._