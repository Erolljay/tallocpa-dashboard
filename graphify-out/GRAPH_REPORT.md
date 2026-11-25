# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 491 files · ~387,549 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3304 nodes · 10798 edges · 148 communities (130 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 111 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `b19e4cdd`
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
- register/page.tsx
- Sign-in & Setup Docs
- brand/forms.tsx
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
- certificate.ts
- ref_node_fs
- [month]/page.tsx
- registrations/forms.tsx
- engine.ts
- scripts
- manilaToday
- ledger/data.ts
- certificate.ts
- deadlines/page.tsx
- payroll/types.ts
- supabaseServer
- Centavos
- staff/page.tsx
- returns/types.ts
- books/page.tsx
- gap.ts
- register-xlsx.ts
- index.ts
- statement-view.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- source.ts
- vitest
- worksheet/page.tsx
- fields.ts
- books/forms.tsx
- sign-in-form.tsx
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- compute1702RT
- theme-toggle.tsx
- quote.ts
- income.ts
- collections/forms.tsx
- requireStaff
- button.tsx
- Pro components
- cx.ts
- file-upload.tsx
- workpapers/page.tsx
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- LinkButton
- server-only
- opening.ts
- Recipes
- clients/schema.ts
- BoardUI theming reference
- Pro templates
- next
- print/page.tsx
- Textarea
- BoardUI page patterns
- profile.ts
- boardui
- rates.ts
- formatAmount
- parties/parties.test.ts
- react
- settings/actions.ts
- fees/actions.ts
- app/documents/page.tsx
- cycle/page.tsx
- payroll/payroll.test.ts
- acting-approver.test.ts
- Skeleton
- auth.ts
- apply-migrations.sh
- portal/documents/page.tsx
- Button
- fees/data.ts
- Select
- quote/page.tsx
- showMonth
- Staff and Owner UX review (Phase 1)
- sign-off-actions.tsx
- safeguards.ts
- template.ts
- fees/types.ts
- checkbox.tsx
- seed.ts
- ui.tsx
- brand/actions.ts
- FormModule
- document-upload.tsx
- receipts.ts
- ledger.test.ts
- src/app/layout.tsx
- copy-opencv.mjs
- package.json
- templatePayload
- gap/page.tsx
- proxy.ts
- brand/page.tsx
- people/schema.ts
- eslint.config.mjs
- register-books.test.ts
- ledger-lock.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 209 edges
2. `cx` - 149 edges
3. `Notice()` - 146 edges
4. `react` - 141 edges
5. `Button()` - 133 edges
6. `Skeleton()` - 124 edges
7. `next` - 117 edges
8. `Card()` - 115 edges
9. `Badge()` - 114 edges
10. `PageHeader()` - 99 edges

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

## Communities (148 total, 18 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.13
Nodes (19): Event, eventText, Filing(), FilingPage(), paymentText, when(), ACTION_LABEL, availableActions() (+11 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.13
Nodes (25): Rule, TimelineFiling, TimelineItem, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance (+17 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "documents/[id]/page.tsx"
Cohesion: 0.29
Nodes (8): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), Booking, LOCKED_STATUSES, LockFiling, lockingFiling()

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (21): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+13 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, typescript@^5 (+7 more)

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

### Community 11 - "register/page.tsx"
Cohesion: 0.13
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "brand/forms.tsx"
Cohesion: 0.36
Nodes (7): FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm()

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (36): defaultCashFlow(), loadStatements(), FsLine, FsLineKey, isFsLine(), Section, Statement, add() (+28 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.12
Nodes (44): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+36 more)

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
Cohesion: 0.26
Nodes (12): RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, Row (+4 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (32): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+24 more)

### Community 42 - "Notice"
Cohesion: 0.11
Nodes (40): FormState, ClientForm(), frequencyLabel, Props, StaffOptions(), ArapUpload(), CloseYearForm(), OpeningUpload() (+32 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (51): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+43 more)

### Community 44 - "certificate.ts"
Cohesion: 0.15
Nodes (26): server-only, @supabase/supabase-js, EmployeeDetail(), EmployeePage(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction() (+18 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.07
Nodes (12): pg, vitest, ctx, input, root, root, root, root (+4 more)

### Community 46 - "[month]/page.tsx"
Cohesion: 0.17
Nodes (26): saveMonthAction(), PayrollMonth(), PayrollMonthPage(), when(), applyRegister(), previewOf(), totals(), loadEmployees() (+18 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (61): ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), FormState, openClientCaseAction(), openYearRenewalsAction(), caseNote, caseTitle (+53 more)

### Community 48 - "engine.ts"
Cohesion: 0.22
Nodes (19): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), fiscalYearOf(), followsCalendarYear() (+11 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.14
Nodes (25): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), ageOpenItems(), AGING_BUCKETS (+17 more)

### Community 51 - "ledger/data.ts"
Cohesion: 0.09
Nodes (33): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), CASH_FLOW_CLASSES, CashFlowClass, codes (+25 more)

### Community 52 - "certificate.ts"
Cohesion: 0.15
Nodes (21): buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Data, Form2316Employer, Form2316Line, Form2316Signatory (+13 more)

### Community 53 - "deadlines/page.tsx"
Cohesion: 0.10
Nodes (35): ClientValues, BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO, SafeguardsNotice() (+27 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.12
Nodes (21): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EmployeeImportRow, readEmployeeFile(), reasonChoices (+13 more)

### Community 55 - "supabaseServer"
Cohesion: 0.08
Nodes (58): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction() (+50 more)

### Community 56 - "Centavos"
Cohesion: 0.08
Nodes (50): FinancialStatements, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+42 more)

### Community 57 - "staff/page.tsx"
Cohesion: 0.20
Nodes (10): Branches(), BranchesPage(), roleLabel, StaffList(), StaffPage(), Branch, branchSchema, groupByBranch() (+2 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (53): incomePayment(), Split, VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal (+45 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.18
Nodes (21): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), AMENDMENT_BADGE, Books() (+13 more)

### Community 60 - "gap.ts"
Cohesion: 0.17
Nodes (16): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+8 more)

### Community 61 - "register-xlsx.ts"
Cohesion: 0.16
Nodes (23): exceljs, file(), GET(), safe(), GET(), employeesForMonth(), buildEmployeeTemplate(), ID_HEADERS (+15 more)

### Community 62 - "index.ts"
Cohesion: 0.11
Nodes (15): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+7 more)

### Community 63 - "statement-view.tsx"
Cohesion: 0.16
Nodes (20): Detail(), PortalStatementDetail(), Latest(), PortalStatement(), Detail(), PayNow(), proofBadge, proofMethod (+12 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.06
Nodes (43): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, InputOtp(), InputOtpProps, Kbd() (+35 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "source.ts"
Cohesion: 0.11
Nodes (31): dayBefore(), FilingRow, ListedDocument, loadLedger(), loadWorksheet(), PAYROLL_FORM_CODES, SavedWorksheet, Supabase (+23 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "worksheet/page.tsx"
Cohesion: 0.31
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 70 - "fields.ts"
Cohesion: 0.08
Nodes (37): approveSelectedAction(), BOOKED, BulkState, key(), ACCOUNT_SOURCES, bulkReadiness(), needsConfirming(), Readiness (+29 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.19
Nodes (35): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+27 more)

### Community 72 - "sign-in-form.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.16
Nodes (23): SettingsState, HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+15 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "compute1702RT"
Cohesion: 0.19
Nodes (27): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+19 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "quote.ts"
Cohesion: 0.12
Nodes (25): PriceRow, buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos() (+17 more)

### Community 80 - "income.ts"
Cohesion: 0.11
Nodes (42): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+34 more)

### Community 81 - "collections/forms.tsx"
Cohesion: 0.15
Nodes (30): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+22 more)

### Community 82 - "requireStaff"
Cohesion: 0.13
Nodes (31): DashboardStats(), FilingListRow, FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary() (+23 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.04
Nodes (47): AvatarColor, AvatarProps, AvatarSize, styles, CHIP_COLORS, ChipColor, ChipProps, ChipVariant (+39 more)

### Community 86 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 87 - "workpapers/page.tsx"
Cohesion: 0.08
Nodes (39): ExplainState, explainTieAction(), ExplainForm(), amt(), one(), shiftMonth(), STATUS, TieRow() (+31 more)

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
Cohesion: 0.09
Nodes (30): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+22 more)

### Community 92 - "LinkButton"
Cohesion: 0.12
Nodes (30): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+22 more)

### Community 93 - "server-only"
Cohesion: 0.17
Nodes (16): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+8 more)

### Community 94 - "opening.ts"
Cohesion: 0.14
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "clients/schema.ts"
Cohesion: 0.14
Nodes (14): obligationChanges(), obligationsForTaxTypes(), PlannedObligation, TAXPAYER_TYPES, TaxTypeError, forms(), assignmentSchema, clientFields (+6 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "next"
Cohesion: 0.10
Nodes (22): nextConfig, next, GET(), generateFilingsNow(), approveDocumentAction(), POST(), GET(), GET() (+14 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (45): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+37 more)

### Community 101 - "Textarea"
Cohesion: 0.16
Nodes (22): zod@^4.6.7, zod, advanceFilingAction(), amendFilingAction(), amount, stepData(), text(), ReplyForm() (+14 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "profile.ts"
Cohesion: 0.11
Nodes (22): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+14 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "formatAmount"
Cohesion: 0.15
Nodes (22): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+14 more)

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.09
Nodes (48): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), normalizeTin(), runOcr(), SKIP, datAddress() (+40 more)

### Community 108 - "react"
Cohesion: 0.17
Nodes (13): react, DocReviewActions(), NewEmployee(), NewEmployeePage(), EmployeeForm(), BookingFields(), DirectoryParty, ENTRY_STATUS (+5 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.27
Nodes (11): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, updateRuleAction(), checkbox, dayBefore() (+3 more)

### Community 110 - "fees/actions.ts"
Cohesion: 0.17
Nodes (23): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+15 more)

### Community 111 - "app/documents/page.tsx"
Cohesion: 0.13
Nodes (24): Payroll(), PayrollPage(), ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths() (+16 more)

### Community 112 - "cycle/page.tsx"
Cohesion: 0.19
Nodes (18): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CycleRow, EXCEPTION_DECISIONS, ExceptionDecision (+10 more)

### Community 113 - "payroll/payroll.test.ts"
Cohesion: 0.15
Nodes (23): GridRow, annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), employeeContributions(), grossCompensation(), monthlyTable() (+15 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "Skeleton"
Cohesion: 0.09
Nodes (59): @remixicon/react, ClientList(), ClientsPage(), one(), PartiesPage(), PartyList(), Row, StepBadge() (+51 more)

### Community 116 - "auth.ts"
Cohesion: 0.12
Nodes (20): recomputeWorksheetAction(), GET(), fieldErrors(), savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), NewParty(), NewPartyPage() (+12 more)

### Community 118 - "portal/documents/page.tsx"
Cohesion: 0.14
Nodes (22): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+14 more)

### Community 119 - "Button"
Cohesion: 0.17
Nodes (18): SetupCharts(), GenerateState, GenerateButton(), ActivateForm(), billingHint, CreateFromTemplateForm(), DeleteDraftButton(), NewDraftForm() (+10 more)

### Community 120 - "fees/data.ts"
Cohesion: 0.17
Nodes (16): dateFmt, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num() (+8 more)

### Community 121 - "Select"
Cohesion: 0.16
Nodes (14): AccountForm(), BookPicker(), EntryForm(), SetupForm(), PeriodFilter(), PendingReview(), StepForm(), ProfileForm() (+6 more)

### Community 122 - "quote/page.tsx"
Cohesion: 0.26
Nodes (11): loadTaxOnFee(), longDate(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL (+3 more)

### Community 123 - "showMonth"
Cohesion: 0.17
Nodes (19): PortalClient, MonthComplete(), SentRow, TimelineRow, Home(), KINDS, manilaDay(), MonthCard() (+11 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off-actions.tsx"
Cohesion: 0.29
Nodes (10): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), SignOffActions() (+2 more)

### Community 126 - "safeguards.ts"
Cohesion: 0.17
Nodes (18): board, MARCO, none, RHEA, row(), steps, documentCutoff(), DONE_FROM_STATUS (+10 more)

### Community 127 - "template.ts"
Cohesion: 0.29
Nodes (4): DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, NON_INDIVIDUAL

### Community 128 - "fees/types.ts"
Cohesion: 0.16
Nodes (17): count(), first(), pick(), profileFromQuery(), QuerySource, items, suggestedAnnualItems(), BILLINGS (+9 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "seed.ts"
Cohesion: 0.25
Nodes (8): DeadlineRule, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 131 - "ui.tsx"
Cohesion: 0.15
Nodes (15): AmendmentRequestForm(), RecordDepositForm(), SignOffState, AmendFilingForm(), NewRequestForm(), ReplyForm(), TicketForm(), buttonClass() (+7 more)

### Community 132 - "brand/actions.ts"
Cohesion: 0.19
Nodes (14): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+6 more)

### Community 133 - "FormModule"
Cohesion: 0.14
Nodes (11): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, WITHHOLDING_FORMS (+3 more)

### Community 134 - "document-upload.tsx"
Cohesion: 0.27
Nodes (10): DocumentUpload(), send(), upload(), Item, METHODS, ProofUpload(), send(), startProofUpload() (+2 more)

### Community 135 - "receipts.ts"
Cohesion: 0.22
Nodes (11): firmBlockLines(), formatTin(), cents(), CLIENT_MONEY_KINDS, FEE_KINDS, GrossReceiptsWatch, grossReceiptsWatch(), pesos() (+3 more)

### Community 136 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 139 - "package.json"
Cohesion: 0.18
Nodes (10): @techstark/opencv-js@4.12.0-release.1, tsx@^4.23.15, @types/react-dom@^19, name, packageManager, private, version, @techstark/opencv-js (+2 more)

### Community 140 - "templatePayload"
Cohesion: 0.22
Nodes (5): templatePayload(), as(), books(), root, root

### Community 141 - "gap/page.tsx"
Cohesion: 0.43
Nodes (6): loadSchedules(), nextEffectiveDate(), FeeGapPage(), Gap(), FeeSchedulePage(), Schedules()

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "brand/page.tsx"
Cohesion: 0.43
Nodes (6): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard()

### Community 144 - "people/schema.ts"
Cohesion: 0.43
Nodes (5): clientUserSchema, email, inviteStaffSchema, name, updateStaffSchema

### Community 145 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 146 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 968 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `checkbox.tsx`, `documents/[id]/page.tsx`, `ui.tsx`, `document-upload.tsx`, `package.json`, `register/page.tsx`, `brand/forms.tsx`, `gap/page.tsx`, `dependencies`, `brand/page.tsx`, `statements.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `certificate.ts`, `[month]/page.tsx`, `registrations/forms.tsx`, `manilaToday`, `ledger/data.ts`, `deadlines/page.tsx`, `supabaseServer`, `staff/page.tsx`, `books/page.tsx`, `statement-view.tsx`, `tabs.tsx`, `dropdown.tsx`, `worksheet/page.tsx`, `books/forms.tsx`, `sign-in-form.tsx`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `collections/forms.tsx`, `requireStaff`, `button.tsx`, `cx.ts`, `file-upload.tsx`, `workpapers/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `LinkButton`, `print/page.tsx`, `Textarea`, `formatAmount`, `parties/parties.test.ts`, `fees/actions.ts`, `app/documents/page.tsx`, `cycle/page.tsx`, `Skeleton`, `auth.ts`, `portal/documents/page.tsx`, `Button`, `Select`, `quote/page.tsx`, `showMonth`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13438735177865613 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ref_node_fs` to `fees/types.ts`, `filings/run.ts`, `filings/[id]/page.tsx`, `documents/[id]/page.tsx`, `arap.ts`, `devDependencies`, `gemini.ts`, `receipts.ts`, `ledger.test.ts`, `package.json`, `register/page.tsx`, `templatePayload`, `people/schema.ts`, `statements.ts`, `ledger-lock.test.ts`, `register-books.test.ts`, `scores/page.tsx`, `registrations/forms.tsx`, `engine.ts`, `manilaToday`, `ledger/data.ts`, `certificate.ts`, `deadlines/page.tsx`, `staff/page.tsx`, `returns/types.ts`, `gap.ts`, `index.ts`, `source.ts`, `vitest`, `fields.ts`, `sign-in-form.tsx`, `settings/page.tsx`, `quote.ts`, `requireStaff`, `workpapers/page.tsx`, `document-scanner.tsx`, `server-only`, `opening.ts`, `clients/schema.ts`, `print/page.tsx`, `rates.ts`, `parties/parties.test.ts`, `settings/actions.ts`, `app/documents/page.tsx`, `cycle/page.tsx`, `payroll/payroll.test.ts`, `acting-approver.test.ts`, `Skeleton`, `auth.ts`, `fees/data.ts`, `showMonth`, `safeguards.ts`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12688172043010754 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `filings/[id]/page.tsx`, `documents/[id]/page.tsx`, `brand/actions.ts`, `ui.tsx`, `document-upload.tsx`, `src/app/layout.tsx`, `package.json`, `register/page.tsx`, `brand/forms.tsx`, `gap/page.tsx`, `dependencies`, `brand/page.tsx`, `proxy.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `payroll/forms.tsx`, `certificate.ts`, `[month]/page.tsx`, `registrations/forms.tsx`, `manilaToday`, `ledger/data.ts`, `deadlines/page.tsx`, `supabaseServer`, `staff/page.tsx`, `books/page.tsx`, `register-xlsx.ts`, `statement-view.tsx`, `tabs.tsx`, `worksheet/page.tsx`, `fields.ts`, `books/forms.tsx`, `sign-in-form.tsx`, `settings/page.tsx`, `collections/forms.tsx`, `requireStaff`, `workpapers/page.tsx`, `app/app/layout.tsx`, `LinkButton`, `server-only`, `print/page.tsx`, `Textarea`, `formatAmount`, `parties/parties.test.ts`, `react`, `settings/actions.ts`, `fees/actions.ts`, `app/documents/page.tsx`, `cycle/page.tsx`, `Skeleton`, `auth.ts`, `portal/documents/page.tsx`, `Select`, `quote/page.tsx`, `showMonth`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._