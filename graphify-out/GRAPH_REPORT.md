# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 513 files · ~405,371 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3404 nodes · 11168 edges · 153 communities (133 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 111 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `15b64d77`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-off-actions.tsx
- filings/run.ts
- migrate.yml
- percentage.ts
- arap.ts
- devDependencies
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- settings/page.tsx
- Sign-in & Setup Docs
- steps.ts
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
- fees/types.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- Skeleton
- ref_node_fs
- payroll/payroll.test.ts
- supabaseServer
- brand/page.tsx
- scripts
- percentage.ts
- ledger/types.ts
- fees/data.ts
- deadlines/page.tsx
- payroll/types.ts
- portal/documents/page.tsx
- alphalist.ts
- clients/actions.ts
- returns/types.ts
- books/page.tsx
- payroll/data.ts
- @remixicon/react
- fixed-assets.test.ts
- Badge
- tabs.tsx
- dropdown.tsx
- Apple Design
- returns/load.ts
- vitest
- Card
- supabaseAdmin
- books/forms.tsx
- react
- Rules
- Animation Performance
- fixed-assets/page.tsx
- stat-cards.tsx
- quote/page.tsx
- theme-toggle.tsx
- quote.ts
- profile.ts
- review-forms.tsx
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
- next
- BoardUI theming reference
- Pro templates
- collections/actions.ts
- print/page.tsx
- Textarea
- BoardUI page patterns
- brand/forms.tsx
- boardui
- rates.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- cycle/page.tsx
- settings/actions.ts
- fees/[id]/page.tsx
- buildSawt
- source.ts
- payroll/payroll.test.ts
- acting-approver.test.ts
- gap.ts
- parties/parties.test.ts
- apply-migrations.sh
- showMonth
- filings/actions.ts
- social-button.tsx
- breadcrumb.tsx
- ledger-closing.test.ts
- workpapers/page.tsx
- Staff and Owner UX review (Phase 1)
- filings/[id]/page.tsx
- documents/[id]/page.tsx
- package.json
- payment-actions.ts
- checkbox.tsx
- db.test.ts
- proof-actions.ts
- template.ts
- review.ts
- branches/actions.ts
- review-form.tsx
- app/documents/page.tsx
- src/app/layout.tsx
- copy-opencv.mjs
- ledger.test.ts
- month-complete.test.ts
- sign-in-form.tsx
- proxy.ts
- ledger-lock.test.ts
- tests/payroll.test.ts
- eslint.config.mjs
- books/reports/page.tsx
- parts.ts
- fields.ts
- statement-view.tsx
- workpapers.test.ts
- names.ts
- ref_node_fs

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 221 edges
2. `cx` - 151 edges
3. `Notice()` - 148 edges
4. `react` - 145 edges
5. `Button()` - 144 edges
6. `Skeleton()` - 126 edges
7. `next` - 121 edges
8. `Card()` - 119 edges
9. `Badge()` - 119 edges
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

## Communities (153 total, 20 thin omitted)

### Community 0 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+3 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.09
Nodes (45): PlannedObligation, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), toIso() (+37 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "percentage.ts"
Cohesion: 0.23
Nodes (23): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+15 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+12 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, tsx@^4.23.15, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

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

### Community 11 - "settings/page.tsx"
Cohesion: 0.17
Nodes (21): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote, Rule (+13 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "steps.ts"
Cohesion: 0.05
Nodes (88): ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+80 more)

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
Cohesion: 0.09
Nodes (40): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine() (+32 more)

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

### Community 40 - "fees/types.ts"
Cohesion: 0.19
Nodes (17): TAXPAYER_TYPES, TaxpayerType, count(), first(), pick(), profileFromQuery(), QuerySource, BOOKKEEPING_LEVELS (+9 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+30 more)

### Community 42 - "Notice"
Cohesion: 0.12
Nodes (53): ClientForm(), AccountForm(), ArapUpload(), EntryForm(), OpeningUpload(), ReleaseReportForm(), SetupForm(), ClientUserForm() (+45 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.07
Nodes (76): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+68 more)

### Community 44 - "Skeleton"
Cohesion: 0.12
Nodes (33): NewEntry(), NewEntryPage(), RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel (+25 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.08
Nodes (10): pg, vitest, root, root, root, root, root, root (+2 more)

### Community 46 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (40): BirCategory, Category, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ItemKind, KIND_ORDER, PayrollItem (+32 more)

### Community 47 - "supabaseServer"
Cohesion: 0.17
Nodes (20): removeAssignmentAction(), setClientStatusAction(), OwnerOnly(), cancelRegistrationAction(), ActingState, appointActingAction(), endActingAction(), refresh() (+12 more)

### Community 48 - "brand/page.tsx"
Cohesion: 0.14
Nodes (21): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), daysBetween(), expiryStatus() (+13 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "percentage.ts"
Cohesion: 0.09
Nodes (46): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), form1701, form1702RT (+38 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.07
Nodes (41): Accounts(), AccountsPage(), GROUPS, codes, PNL, acct(), ADVANCES_FROM, ASSETS (+33 more)

### Community 52 - "fees/data.ts"
Cohesion: 0.13
Nodes (19): zod, dateFmt, statusLabel, statusTone, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS (+11 more)

### Community 53 - "deadlines/page.tsx"
Cohesion: 0.07
Nodes (52): GET(), ClientValues, BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO (+44 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "portal/documents/page.tsx"
Cohesion: 0.15
Nodes (19): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+11 more)

### Community 56 - "alphalist.ts"
Cohesion: 0.14
Nodes (28): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+20 more)

### Community 57 - "clients/actions.ts"
Cohesion: 0.13
Nodes (23): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setupMissingChartsAction(), updateClientAction(), obligationChanges(), obligationsForTaxTypes() (+15 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (50): PayrollContext, VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel() (+42 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.15
Nodes (25): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm() (+17 more)

### Community 60 - "payroll/data.ts"
Cohesion: 0.14
Nodes (31): server-only, @supabase/supabase-js, EmployeeDetail(), EmployeePage(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction() (+23 more)

### Community 61 - "@remixicon/react"
Cohesion: 0.18
Nodes (20): @remixicon/react, RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail() (+12 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "Badge"
Cohesion: 0.25
Nodes (14): Detail(), StatementPage(), portalContext(), Payroll(), PortalPayroll(), STATUS, when(), Detail() (+6 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.05
Nodes (53): Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), InputOtp(), InputOtpProps (+45 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/load.ts"
Cohesion: 0.13
Nodes (24): loadAssets(), Row, Asset, FinancialStatements, dayBefore(), FilingRow, ListedDocument, loadLedger() (+16 more)

### Community 68 - "vitest"
Cohesion: 0.17
Nodes (19): year, BUSINESS_TAX_FORMS, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "Card"
Cohesion: 0.18
Nodes (16): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), Lines(), lineStyle (+8 more)

### Community 70 - "supabaseAdmin"
Cohesion: 0.38
Nodes (5): generateFilingsNow(), GenerateState, GenerateButton(), supabaseEnv(), supabaseAdmin()

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (35): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+27 more)

### Community 72 - "react"
Cohesion: 0.11
Nodes (19): react, FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), StatusButton(), postPayrollAction() (+11 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (34): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+26 more)

### Community 77 - "quote/page.tsx"
Cohesion: 0.20
Nodes (17): loadSchedules(), loadTaxOnFee(), longDate(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines() (+9 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.13
Nodes (25): buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos(), QuoteInput (+17 more)

### Community 80 - "profile.ts"
Cohesion: 0.15
Nodes (17): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), Expiry, ExpiryTone (+9 more)

### Community 81 - "review-forms.tsx"
Cohesion: 0.21
Nodes (14): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+6 more)

### Community 82 - "requireStaff"
Cohesion: 0.12
Nodes (35): FilingTable(), OwnerSections(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+27 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (28): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+20 more)

### Community 86 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 87 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (20): RegisterLine, Adjustment, PeriodFile, MonthActivity, Signoff, AssetTotals, LedgerTotals, PayrollTotals (+12 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (30): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+22 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (20): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+12 more)

### Community 92 - "LinkButton"
Cohesion: 0.12
Nodes (27): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, Certificates() (+19 more)

### Community 93 - "server-only"
Cohesion: 0.17
Nodes (16): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+8 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "next"
Cohesion: 0.09
Nodes (21): nextConfig, next, EditClient(), EditClientPage(), NewClientPage(), recomputeWorksheetAction(), WorksheetState, GET() (+13 more)

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
Nodes (45): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+37 more)

### Community 101 - "Textarea"
Cohesion: 0.23
Nodes (17): NewRequestForm(), TicketForm(), ReplyForm(), send(), Textarea(), getIdentity(), closeRequestAction(), createRequestAction() (+9 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "brand/forms.tsx"
Cohesion: 0.16
Nodes (19): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+10 more)

### Community 106 - "[clientId]/page.tsx"
Cohesion: 0.13
Nodes (34): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+26 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (31): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName() (+23 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.17
Nodes (20): DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CycleRow (+12 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 111 - "buildSawt"
Cohesion: 0.23
Nodes (13): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+5 more)

### Community 112 - "source.ts"
Cohesion: 0.17
Nodes (19): amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND, DocumentRow, fromRegisterLine(), isApproved(), monthInPeriod() (+11 more)

### Community 113 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (52): GridRow, AlphaCols, AlphalistRow, Certificates2316, form2316(), Form2316Data, Form2316Employer, Form2316Line (+44 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "gap.ts"
Cohesion: 0.22
Nodes (11): EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), items, PRICES (+3 more)

### Community 116 - "parties/parties.test.ts"
Cohesion: 0.14
Nodes (25): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), DOC_TYPES, normalizeTin(), runOcr() (+17 more)

### Community 118 - "showMonth"
Cohesion: 0.12
Nodes (33): PortalClient, MonthComplete(), SentRow, TimelineRow, Home(), KINDS, manilaDay(), MonthCard() (+25 more)

### Community 119 - "filings/actions.ts"
Cohesion: 0.24
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), c() (+6 more)

### Community 120 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 121 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 122 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 123 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (26): amt(), CertificatesTable(), Href, one(), PartsLink(), PurchasesTable(), Register(), RegisterPage() (+18 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "filings/[id]/page.tsx"
Cohesion: 0.11
Nodes (26): FilingListRow, Event, eventText, Filing(), FilingPage(), paymentText, when(), SignOffActions() (+18 more)

### Community 126 - "documents/[id]/page.tsx"
Cohesion: 0.29
Nodes (8): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), Booking, LOCKED_STATUSES, LockFiling, lockingFiling()

### Community 127 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 128 - "payment-actions.ts"
Cohesion: 0.33
Nodes (10): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+2 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 131 - "proof-actions.ts"
Cohesion: 0.27
Nodes (10): amount, date, refresh(), rejectProofAction(), StartProof, submitProof(), submitSchema, text() (+2 more)

### Community 132 - "template.ts"
Cohesion: 0.22
Nodes (6): items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL

### Community 133 - "review.ts"
Cohesion: 0.27
Nodes (8): ReviewNote, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), SIGNED_REFS, SignedRef, quiet

### Community 134 - "branches/actions.ts"
Cohesion: 0.48
Nodes (6): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), branchUpdateSchema

### Community 135 - "review-form.tsx"
Cohesion: 0.11
Nodes (24): DocReviewActions(), DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, ReplyForm(), DocumentUpload(), send() (+16 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.16
Nodes (19): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+11 more)

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 141 - "sign-in-form.tsx"
Cohesion: 0.19
Nodes (15): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+7 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 145 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 146 - "books/reports/page.tsx"
Cohesion: 0.17
Nodes (18): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+10 more)

### Community 147 - "parts.ts"
Cohesion: 0.13
Nodes (23): LineParts(), client(), ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr() (+15 more)

### Community 148 - "fields.ts"
Cohesion: 0.09
Nodes (36): approveSelectedAction(), BOOKED, BulkState, key(), approveDocumentAction(), PendingReview(), PendingRow, ACCOUNT_SOURCES (+28 more)

### Community 149 - "statement-view.tsx"
Cohesion: 0.18
Nodes (14): Detail(), PayNow(), proofBadge, proofMethod, statusBadge, FirmBlock, PayAccount, PaymentProof (+6 more)

### Community 150 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 151 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 153 - "ref_node_fs"
Cohesion: 0.13
Nodes (4): ctx, input, root, root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 991 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `sign-off-actions.tsx`, `payment-actions.ts`, `proof-actions.ts`, `branches/actions.ts`, `review-form.tsx`, `app/documents/page.tsx`, `src/app/layout.tsx`, `settings/page.tsx`, `steps.ts`, `sign-in-form.tsx`, `dependencies`, `proxy.ts`, `books/reports/page.tsx`, `fields.ts`, `scores/page.tsx`, `payroll/forms.tsx`, `Skeleton`, `supabaseServer`, `brand/page.tsx`, `ledger/types.ts`, `deadlines/page.tsx`, `portal/documents/page.tsx`, `clients/actions.ts`, `books/page.tsx`, `payroll/data.ts`, `@remixicon/react`, `Badge`, `Card`, `supabaseAdmin`, `books/forms.tsx`, `react`, `fixed-assets/page.tsx`, `quote/page.tsx`, `theme-toggle.tsx`, `review-forms.tsx`, `requireStaff`, `app/app/layout.tsx`, `LinkButton`, `server-only`, `collections/actions.ts`, `print/page.tsx`, `Textarea`, `brand/forms.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `cycle/page.tsx`, `settings/actions.ts`, `fees/[id]/page.tsx`, `parties/parties.test.ts`, `showMonth`, `filings/actions.ts`, `breadcrumb.tsx`, `workpapers/page.tsx`, `filings/[id]/page.tsx`, `documents/[id]/page.tsx`, `package.json`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09220779220779221 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `sign-off-actions.tsx`, `checkbox.tsx`, `review-form.tsx`, `app/documents/page.tsx`, `settings/page.tsx`, `steps.ts`, `sign-in-form.tsx`, `dependencies`, `books/reports/page.tsx`, `statements.ts`, `fields.ts`, `statement-view.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `Skeleton`, `brand/page.tsx`, `ledger/types.ts`, `deadlines/page.tsx`, `portal/documents/page.tsx`, `books/page.tsx`, `payroll/data.ts`, `@remixicon/react`, `Badge`, `tabs.tsx`, `dropdown.tsx`, `Card`, `supabaseAdmin`, `books/forms.tsx`, `fixed-assets/page.tsx`, `stat-cards.tsx`, `quote/page.tsx`, `theme-toggle.tsx`, `review-forms.tsx`, `requireStaff`, `button.tsx`, `cx.ts`, `file-upload.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `LinkButton`, `next`, `print/page.tsx`, `Textarea`, `brand/forms.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `cycle/page.tsx`, `fees/[id]/page.tsx`, `showMonth`, `social-button.tsx`, `breadcrumb.tsx`, `workpapers/page.tsx`, `filings/[id]/page.tsx`, `documents/[id]/page.tsx`, `package.json`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ref_node_fs` to `filings/run.ts`, `db.test.ts`, `template.ts`, `devDependencies`, `arap.ts`, `gemini.ts`, `app/documents/page.tsx`, `review.ts`, `settings/page.tsx`, `ledger.test.ts`, `steps.ts`, `sign-in-form.tsx`, `ledger-lock.test.ts`, `month-complete.test.ts`, `tests/payroll.test.ts`, `statements.ts`, `parts.ts`, `fields.ts`, `workpapers.test.ts`, `names.ts`, `ref_node_fs`, `scores/page.tsx`, `payroll/forms.tsx`, `payroll/payroll.test.ts`, `brand/page.tsx`, `ledger/types.ts`, `fees/data.ts`, `deadlines/page.tsx`, `clients/actions.ts`, `returns/types.ts`, `@remixicon/react`, `fixed-assets.test.ts`, `returns/load.ts`, `vitest`, `fixed-assets/page.tsx`, `quote.ts`, `requireStaff`, `workpapers/load.ts`, `document-scanner.tsx`, `server-only`, `opening.ts`, `next`, `print/page.tsx`, `rates.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `cycle/page.tsx`, `settings/actions.ts`, `source.ts`, `payroll/payroll.test.ts`, `acting-approver.test.ts`, `gap.ts`, `parties/parties.test.ts`, `showMonth`, `ledger-closing.test.ts`, `filings/[id]/page.tsx`, `documents/[id]/page.tsx`, `package.json`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `arap.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14666666666666667 - nodes in this community are weakly interconnected._