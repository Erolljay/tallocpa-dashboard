# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 499 files · ~393,726 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3345 nodes · 10964 edges · 152 communities (132 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 111 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `08ea23b2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- filings/run.ts
- migrate.yml
- documents/[id]/page.tsx
- arap.ts
- devDependencies
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- Card
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
- clients/[id]/page.tsx
- scores/page.tsx
- Notice
- payroll/forms.tsx
- Skeleton
- vitest
- [month]/page.tsx
- registrations/forms.tsx
- notification.tsx
- scripts
- manilaToday
- ledger/types.ts
- payroll/data.ts
- deadlines/page.tsx
- payroll/types.ts
- proof-upload.tsx
- Centavos
- branches/page.tsx
- returns/types.ts
- books/page.tsx
- fees/types.ts
- register-xlsx.ts
- fixed-assets/page.tsx
- statement-view.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- source.ts
- vitest
- worksheet/page.tsx
- fields.ts
- books/forms.tsx
- social-button.tsx
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- compute1702RT
- theme-toggle.tsx
- quote.ts
- income.ts
- requireOwner
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
- react
- BoardUI theming reference
- Pro templates
- supabaseServer
- print/page.tsx
- Textarea
- BoardUI page patterns
- profile.ts
- boardui
- rates.ts
- books/reports/page.tsx
- parties/[id]/page.tsx
- payroll/payroll.test.ts
- settings/actions.ts
- fees/actions.ts
- app/documents/page.tsx
- cycle/page.tsx
- compute.ts
- acting-approver.test.ts
- Badge
- parties/actions.ts
- apply-migrations.sh
- portal/documents/page.tsx
- Centavos
- fees/data.ts
- staff/page.tsx
- quote/page.tsx
- showMonth
- Staff and Owner UX review (Phase 1)
- sign-off-actions.tsx
- ledger/data.ts
- template.ts
- resolve.ts
- checkbox.tsx
- db.test.ts
- 2316/page.tsx
- IsoDate
- lookupAtc
- fixed-assets/forms.tsx
- year/[year]/page.tsx
- ledger.test.ts
- filings/actions.ts
- ref_node_fs
- fees.test.ts
- workpapers/page.tsx
- sign-in-form.tsx
- proxy.ts
- ocr/run.ts
- staff/actions.ts
- eslint.config.mjs
- parts.ts
- ledger-lock.test.ts
- names.ts
- tieouts.test.ts
- fixed-assets.test.ts
- tests/payroll.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 215 edges
2. `cx` - 151 edges
3. `Notice()` - 148 edges
4. `react` - 143 edges
5. `Button()` - 137 edges
6. `Skeleton()` - 126 edges
7. `next` - 119 edges
8. `Card()` - 117 edges
9. `Badge()` - 116 edges
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

## Communities (152 total, 20 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (37): FilingListRow, Event, eventText, Filing(), FilingPage(), paymentText, when(), SignOffActions() (+29 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.09
Nodes (42): Rule, compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule, DueRule (+34 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "documents/[id]/page.tsx"
Cohesion: 0.31
Nodes (7): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), Booking, LockFiling, lockingFiling()

### Community 4 - "arap.ts"
Cohesion: 0.14
Nodes (20): exceljs@4.4.0, exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount (+12 more)

### Community 5 - "devDependencies"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "gemini.ts"
Cohesion: 0.13
Nodes (15): OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+7 more)

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

### Community 11 - "Card"
Cohesion: 0.20
Nodes (24): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+16 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "steps.ts"
Cohesion: 0.09
Nodes (49): CompleteButton(), StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+41 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (39): defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section, Statement (+31 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.15
Nodes (42): incomeAttachments(), Periods, periods(), buildSawt(), incomePayment(), sawtAttachments(), sawtCsv(), sawtDat() (+34 more)

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
Cohesion: 0.21
Nodes (17): removeAssignmentAction(), StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton() (+9 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (34): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+26 more)

### Community 42 - "Notice"
Cohesion: 0.11
Nodes (58): AccountForm(), AmendmentRequestForm(), ArapUpload(), EntryForm(), OpeningUpload(), ReleaseReportForm(), SetupForm(), DocReviewActions() (+50 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.12
Nodes (40): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+32 more)

### Community 44 - "Skeleton"
Cohesion: 0.14
Nodes (28): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), EmployeeDetail(), EmployeePage(), NewEmployee() (+20 more)

### Community 45 - "vitest"
Cohesion: 0.09
Nodes (14): pg, vitest, templatePayload(), root, root, as(), books(), root (+6 more)

### Community 46 - "[month]/page.tsx"
Cohesion: 0.13
Nodes (29): PayrollMonth(), PayrollMonthPage(), when(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), previewOf() (+21 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.11
Nodes (38): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+30 more)

### Community 48 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.10
Nodes (42): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), BillingDaysForm() (+34 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.09
Nodes (29): CASH_FLOW_CLASSES, CashFlowClass, codes, PNL, acct(), ADVANCES_FROM, ASSETS, build() (+21 more)

### Community 52 - "payroll/data.ts"
Cohesion: 0.12
Nodes (36): buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+28 more)

### Community 53 - "deadlines/page.tsx"
Cohesion: 0.08
Nodes (49): GET(), BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO, TAX_TYPES (+41 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "proof-upload.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 56 - "Centavos"
Cohesion: 0.13
Nodes (28): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+20 more)

### Community 57 - "branches/page.tsx"
Cohesion: 0.21
Nodes (14): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), AddBranchForm(), BranchRowForm(), Branches() (+6 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (48): BUSINESS_TAX_FORMS, VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel() (+40 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.17
Nodes (21): AmendmentDecision(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm() (+13 more)

### Community 60 - "fees/types.ts"
Cohesion: 0.11
Nodes (31): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+23 more)

### Community 61 - "register-xlsx.ts"
Cohesion: 0.17
Nodes (21): file(), GET(), safe(), GET(), employeesForMonth(), buildEmployeeTemplate(), PayrollItem, sortItems() (+13 more)

### Community 62 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (18): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), loadAssets(), Row (+10 more)

### Community 63 - "statement-view.tsx"
Cohesion: 0.14
Nodes (23): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Latest(), PortalStatement(), Detail(), PayNow() (+15 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "source.ts"
Cohesion: 0.17
Nodes (19): amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND, DocumentRow, fromRegisterLine(), isApproved(), monthInPeriod() (+11 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "worksheet/page.tsx"
Cohesion: 0.18
Nodes (16): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+8 more)

### Community 70 - "fields.ts"
Cohesion: 0.08
Nodes (39): approveSelectedAction(), BOOKED, BulkState, key(), DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel (+31 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (39): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+31 more)

### Community 72 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.17
Nodes (22): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "compute1702RT"
Cohesion: 0.19
Nodes (27): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+19 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.13
Nodes (23): buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos(), QuoteLine (+15 more)

### Community 80 - "income.ts"
Cohesion: 0.11
Nodes (39): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), form1701, form1702RT (+31 more)

### Community 81 - "requireOwner"
Cohesion: 0.17
Nodes (25): zod@^4.6.7, zod, addChargeAction(), applyCreditAction(), date, depositSchema, peso, recordDepositAction() (+17 more)

### Community 82 - "requireStaff"
Cohesion: 0.14
Nodes (29): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+21 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 86 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 87 - "workpapers/load.ts"
Cohesion: 0.21
Nodes (17): month1601C(), RegisterLine, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), AssetTotals (+9 more)

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
Cohesion: 0.13
Nodes (21): server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage(), DigestRow (+13 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "react"
Cohesion: 0.10
Nodes (35): react, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setClientStatusAction(), setupMissingChartsAction() (+27 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "supabaseServer"
Cohesion: 0.07
Nodes (36): nextConfig, next, ExplainState, explainTieAction(), approveDocumentAction(), recomputeWorksheetAction(), WorksheetState, GET() (+28 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.09
Nodes (39): BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad(), PrintButton(), BOOK_ABBR, BOOK_KINDS (+31 more)

### Community 101 - "Textarea"
Cohesion: 0.19
Nodes (20): DocumentUpload(), send(), upload(), Item, ReplyForm(), send(), getIdentity(), finishUpload() (+12 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.25
Nodes (17): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+9 more)

### Community 106 - "books/reports/page.tsx"
Cohesion: 0.30
Nodes (10): fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReports(), Reports(), when(), loadReleasedReports() (+2 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.15
Nodes (21): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), listNameCols(), Names (+13 more)

### Community 108 - "payroll/payroll.test.ts"
Cohesion: 0.14
Nodes (20): MonthGrid(), toInput(), entry(), P(), BirCategory, Category, categoryTotals(), DEDUCTION_FIELDS (+12 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "fees/actions.ts"
Cohesion: 0.17
Nodes (26): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+18 more)

### Community 111 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (22): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+14 more)

### Community 112 - "cycle/page.tsx"
Cohesion: 0.20
Nodes (17): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CycleRow, ExceptionDecision, parseMonth() (+9 more)

### Community 113 - "compute.ts"
Cohesion: 0.15
Nodes (26): GridRow, annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation() (+18 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "Badge"
Cohesion: 0.19
Nodes (21): @remixicon/react, RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail() (+13 more)

### Community 116 - "parties/actions.ts"
Cohesion: 0.23
Nodes (13): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), blank(), optionalText() (+5 more)

### Community 118 - "portal/documents/page.tsx"
Cohesion: 0.13
Nodes (23): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+15 more)

### Community 119 - "Centavos"
Cohesion: 0.11
Nodes (22): FinancialStatements, SawtResult, SawtRow, SlpRow, SlsRow, Split, AtcTotal, EwtLine (+14 more)

### Community 120 - "fees/data.ts"
Cohesion: 0.13
Nodes (21): dateFmt, longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm(), StartNewVersionForm() (+13 more)

### Community 121 - "staff/page.tsx"
Cohesion: 0.39
Nodes (7): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList()

### Community 122 - "quote/page.tsx"
Cohesion: 0.24
Nodes (14): loadSchedules(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage() (+6 more)

### Community 123 - "showMonth"
Cohesion: 0.13
Nodes (29): PortalClient, portalContext(), MonthComplete(), SentRow, TimelineRow, Home(), KINDS, manilaDay() (+21 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off-actions.tsx"
Cohesion: 0.22
Nodes (12): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+4 more)

### Community 126 - "ledger/data.ts"
Cohesion: 0.16
Nodes (20): dayBefore(), GET(), safe(), fromWorkbookData(), buildBookWorkbook(), accountFromRow(), Amendment, AmendmentStatus (+12 more)

### Community 127 - "template.ts"
Cohesion: 0.20
Nodes (7): conditionsSchema, settingsSchema, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL

### Community 128 - "resolve.ts"
Cohesion: 0.21
Nodes (13): displayName(), fullAddress(), Party, partyTinLabel(), ABBREVIATIONS, nameTokens(), PartyFields, ResolvedParty (+5 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 131 - "2316/page.tsx"
Cohesion: 0.32
Nodes (11): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Set(), Form2316Sheet() (+3 more)

### Community 132 - "IsoDate"
Cohesion: 0.21
Nodes (13): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+5 more)

### Community 133 - "lookupAtc"
Cohesion: 0.29
Nodes (10): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+2 more)

### Community 134 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm()

### Community 135 - "year/[year]/page.tsx"
Cohesion: 0.36
Nodes (8): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings(), PayrollClient

### Community 136 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 137 - "filings/actions.ts"
Cohesion: 0.36
Nodes (9): advanceFilingAction(), amendFilingAction(), amount, stepData(), text(), tieOutsBlocking(), blockingTies(), monthsOf() (+1 more)

### Community 138 - "ref_node_fs"
Cohesion: 0.10
Nodes (8): outDir, pkgDir, require, { version }, ctx, input, root, root

### Community 140 - "workpapers/page.tsx"
Cohesion: 0.39
Nodes (8): amt(), one(), shiftMonth(), STATUS, TieRow(), Workpapers(), WorkpapersPage(), TieStatus

### Community 141 - "sign-in-form.tsx"
Cohesion: 0.43
Nodes (6): errors, Form(), LoginPage(), SignInForm(), Divider(), SocialButton()

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "ocr/run.ts"
Cohesion: 0.43
Nodes (7): ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, lookupParties(), fillFromDirectory(), partyKey()

### Community 144 - "staff/actions.ts"
Cohesion: 0.25
Nodes (11): addClientUserAction(), fieldErrors(), inviteStaffAction(), removeClientUserAction(), updateStaffAction(), ensureLogin(), clientUserSchema, email (+3 more)

### Community 145 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 146 - "parts.ts"
Cohesion: 0.12
Nodes (21): client(), ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine (+13 more)

### Community 148 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 149 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 150 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 974 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `filings/[id]/page.tsx`, `2316/page.tsx`, `documents/[id]/page.tsx`, `devDependencies`, `fixed-assets/forms.tsx`, `year/[year]/page.tsx`, `filings/actions.ts`, `Card`, `workpapers/page.tsx`, `steps.ts`, `proxy.ts`, `dependencies`, `staff/actions.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `Skeleton`, `[month]/page.tsx`, `registrations/forms.tsx`, `manilaToday`, `payroll/data.ts`, `deadlines/page.tsx`, `proof-upload.tsx`, `branches/page.tsx`, `books/page.tsx`, `register-xlsx.ts`, `fixed-assets/page.tsx`, `statement-view.tsx`, `dropdown.tsx`, `worksheet/page.tsx`, `fields.ts`, `books/forms.tsx`, `settings/page.tsx`, `theme-toggle.tsx`, `requireOwner`, `requireStaff`, `app/app/layout.tsx`, `LinkButton`, `server-only`, `react`, `print/page.tsx`, `Textarea`, `profile.ts`, `books/reports/page.tsx`, `parties/[id]/page.tsx`, `settings/actions.ts`, `fees/actions.ts`, `app/documents/page.tsx`, `cycle/page.tsx`, `Badge`, `parties/actions.ts`, `portal/documents/page.tsx`, `fees/data.ts`, `quote/page.tsx`, `showMonth`, `sign-off-actions.tsx`, `ledger/data.ts`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07993197278911565 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `filings/[id]/page.tsx`, `filings/run.ts`, `resolve.ts`, `documents/[id]/page.tsx`, `IsoDate`, `devDependencies`, `arap.ts`, `gemini.ts`, `db.test.ts`, `ledger.test.ts`, `ref_node_fs`, `fees.test.ts`, `steps.ts`, `staff/actions.ts`, `statements.ts`, `parts.ts`, `names.ts`, `tieouts.test.ts`, `fixed-assets.test.ts`, `ledger-lock.test.ts`, `tests/payroll.test.ts`, `scores/page.tsx`, `manilaToday`, `ledger/types.ts`, `payroll/data.ts`, `deadlines/page.tsx`, `branches/page.tsx`, `returns/types.ts`, `fees/types.ts`, `fixed-assets/page.tsx`, `source.ts`, `vitest`, `worksheet/page.tsx`, `fields.ts`, `settings/page.tsx`, `quote.ts`, `requireStaff`, `document-scanner.tsx`, `server-only`, `opening.ts`, `react`, `supabaseServer`, `print/page.tsx`, `profile.ts`, `rates.ts`, `parties/[id]/page.tsx`, `payroll/payroll.test.ts`, `settings/actions.ts`, `app/documents/page.tsx`, `cycle/page.tsx`, `acting-approver.test.ts`, `Badge`, `template.ts`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08925979680696662 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `checkbox.tsx`, `2316/page.tsx`, `documents/[id]/page.tsx`, `devDependencies`, `fixed-assets/forms.tsx`, `year/[year]/page.tsx`, `Card`, `workpapers/page.tsx`, `steps.ts`, `sign-in-form.tsx`, `dependencies`, `statements.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `Skeleton`, `[month]/page.tsx`, `registrations/forms.tsx`, `notification.tsx`, `manilaToday`, `deadlines/page.tsx`, `proof-upload.tsx`, `branches/page.tsx`, `books/page.tsx`, `fixed-assets/page.tsx`, `statement-view.tsx`, `tabs.tsx`, `dropdown.tsx`, `worksheet/page.tsx`, `fields.ts`, `books/forms.tsx`, `social-button.tsx`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `requireStaff`, `button.tsx`, `cx.ts`, `file-upload.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `server-only`, `print/page.tsx`, `Textarea`, `profile.ts`, `books/reports/page.tsx`, `parties/[id]/page.tsx`, `fees/actions.ts`, `app/documents/page.tsx`, `cycle/page.tsx`, `Badge`, `portal/documents/page.tsx`, `fees/data.ts`, `staff/page.tsx`, `quote/page.tsx`, `showMonth`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._