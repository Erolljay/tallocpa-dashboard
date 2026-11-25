# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 506 files · ~398,627 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3368 nodes · 11046 edges · 144 communities (126 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 111 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `2415ae28`
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
- Card
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
- [month]/page.tsx
- registrations/forms.tsx
- notification.tsx
- scripts
- manilaToday
- ledger/types.ts
- payroll/data.ts
- deadlines/page.tsx
- payroll/types.ts
- document-upload.tsx
- Centavos
- branches/page.tsx
- returns/types.ts
- books/page.tsx
- gap.ts
- register-xlsx.ts
- fixed-assets/page.tsx
- statement-view.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- returns/types.ts
- vitest
- worksheet/page.tsx
- fields.ts
- books/forms.tsx
- social-button.tsx
- Rules
- Animation Performance
- client-form.tsx
- stat-cards.tsx
- profile.ts
- theme-toggle.tsx
- quote.ts
- income.ts
- payment-forms.tsx
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
- clients/actions.ts
- BoardUI theming reference
- Pro templates
- supabaseServer
- print/page.tsx
- Textarea
- BoardUI page patterns
- brand/forms.tsx
- boardui
- rates.ts
- books/reports/page.tsx
- parties/[id]/page.tsx
- engine.ts
- settings/actions.ts
- quote/page.tsx
- app/documents/page.tsx
- dates.ts
- compute.ts
- acting-approver.test.ts
- pending-review.tsx
- parties/actions.ts
- apply-migrations.sh
- showMonth
- fees/types.ts
- fees/schedule.ts
- supabaseAdmin
- receipts.ts
- Skeleton
- Staff and Owner UX review (Phase 1)
- sign-off-actions.tsx
- fees/forms.tsx
- template.ts
- package.json
- checkbox.tsx
- db.test.ts
- seed.ts
- IsoDate
- quote.test.ts
- fixed-assets/forms.tsx
- checks.test.ts
- documents/period.ts
- src/app/layout.tsx
- copy-opencv.mjs
- sign-in-form.tsx
- proxy.ts
- eslint.config.mjs
- parts.ts
- names.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 217 edges
2. `cx` - 151 edges
3. `Notice()` - 148 edges
4. `react` - 144 edges
5. `Button()` - 139 edges
6. `Skeleton()` - 126 edges
7. `next` - 121 edges
8. `Card()` - 119 edges
9. `Badge()` - 118 edges
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

## Communities (144 total, 18 thin omitted)

### Community 0 - "sign-off.ts"
Cohesion: 0.11
Nodes (17): Row, QueueFiling, QueueViewer, ReviewQueue, ACTION_LABEL, availableActions(), FilingState, FilingStatus (+9 more)

### Community 1 - "generate.ts"
Cohesion: 0.14
Nodes (19): Rule, FREQUENCY_SECTIONS, periodWord, TAX_TYPE_GROUPS, DueRule, EfpsGroup, FilingChannel, Frequency (+11 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "FormModule"
Cohesion: 0.12
Nodes (15): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, form1601C (+7 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (19): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+11 more)

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

### Community 11 - "Card"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "registrations/[id]/page.tsx"
Cohesion: 0.14
Nodes (32): CompleteButton(), StepBadge(), YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+24 more)

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
Cohesion: 0.10
Nodes (35): defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section, Statement (+27 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.11
Nodes (52): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+44 more)

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
Cohesion: 0.20
Nodes (16): removeAssignmentAction(), StaffOptions(), AssignForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail(), ClientPage() (+8 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (37): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+29 more)

### Community 42 - "Notice"
Cohesion: 0.14
Nodes (50): ClientForm(), AccountForm(), EntryForm(), ReleaseReportForm(), SetupForm(), ClientUserForm(), EngagementForm(), EmployeeForm() (+42 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (49): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+41 more)

### Community 44 - "Skeleton"
Cohesion: 0.11
Nodes (33): react, setupMissingChartsAction(), Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), EmployeeDetail() (+25 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.04
Nodes (22): pg, templatePayload(), BOOK_LOCK_FORMS, ctx, input, root, root, root (+14 more)

### Community 46 - "[month]/page.tsx"
Cohesion: 0.09
Nodes (41): saveMonthAction(), PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES (+33 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (65): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+57 more)

### Community 48 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.11
Nodes (38): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), BillingDaysForm(), ReasonAction() (+30 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.07
Nodes (44): BookEntry, ColumnarBook, CASH_FLOW_CLASSES, CashFlowClass, codes, PNL, acct(), ADVANCES_FROM (+36 more)

### Community 52 - "payroll/data.ts"
Cohesion: 0.17
Nodes (24): Certificates2316, certificatesFromRaw(), Form2316Signatory, paidInYear(), Payroll2316Raw, loadEntries(), PayrollClient, PayrollSettings (+16 more)

### Community 53 - "deadlines/page.tsx"
Cohesion: 0.10
Nodes (36): Gap, Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+28 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.09
Nodes (30): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+22 more)

### Community 55 - "document-upload.tsx"
Cohesion: 0.14
Nodes (21): DocReviewActions(), ReplyForm(), DocumentUpload(), send(), upload(), Item, METHODS, ProofUpload() (+13 more)

### Community 56 - "Centavos"
Cohesion: 0.11
Nodes (33): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist() (+25 more)

### Community 57 - "branches/page.tsx"
Cohesion: 0.18
Nodes (13): zod@^4.6.7, zod, addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), Branch (+5 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (52): agentProblems(), amountText(), emptyResult(), PAYROLL_NOT_LOADED, INPUTS, MONTH, agentBackground(), agentErrors() (+44 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.15
Nodes (26): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+18 more)

### Community 60 - "gap.ts"
Cohesion: 0.18
Nodes (15): EstimatedProfile, estimateProfile(), ExistingClient, GapRow, has(), items, PRICES, schedule (+7 more)

### Community 61 - "register-xlsx.ts"
Cohesion: 0.17
Nodes (23): file(), GET(), safe(), GET(), employeesForMonth(), buildEmployeeTemplate(), PayrollItem, sortItems() (+15 more)

### Community 62 - "fixed-assets/page.tsx"
Cohesion: 0.18
Nodes (15): loadAssets(), Row, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor(), monthIndex() (+7 more)

### Community 63 - "statement-view.tsx"
Cohesion: 0.18
Nodes (14): Detail(), PayNow(), proofBadge, proofMethod, statusBadge, FirmBlock, PayAccount, PaymentProof (+6 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.09
Nodes (42): recomputeWorksheetAction(), WorksheetState, FinancialStatements, Split, VatData, dayBefore(), FilingRow, ListedDocument (+34 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (19): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "worksheet/page.tsx"
Cohesion: 0.14
Nodes (21): amt(), one(), shiftMonth(), STATUS, TieRow(), Workpapers(), WorkpapersPage(), FilingListRow (+13 more)

### Community 70 - "fields.ts"
Cohesion: 0.13
Nodes (21): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, FieldKey, keys (+13 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.19
Nodes (34): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+26 more)

### Community 72 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "client-form.tsx"
Cohesion: 0.21
Nodes (15): FormState, ClientValues, frequencyLabel, Props, EngagementRow, obligationsForTaxTypes(), PlannedObligation, TAX_TYPES (+7 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "profile.ts"
Cohesion: 0.14
Nodes (19): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+11 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.18
Nodes (18): PriceRow, gapFor(), buildQuote(), cents(), CustomQuoteItem, documentBand(), inRange(), matches() (+10 more)

### Community 80 - "income.ts"
Cohesion: 0.10
Nodes (61): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+53 more)

### Community 81 - "payment-forms.tsx"
Cohesion: 0.28
Nodes (14): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+6 more)

### Community 82 - "requireStaff"
Cohesion: 0.09
Nodes (53): DashboardStats(), FilingTable(), BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO (+45 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (33): @remixicon/react, Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant (+25 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (21): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+13 more)

### Community 86 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 87 - "workpapers/load.ts"
Cohesion: 0.09
Nodes (35): ExplainState, explainTieAction(), advanceFilingAction(), amendFilingAction(), amount, SignOffState, stepData(), text() (+27 more)

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
Cohesion: 0.13
Nodes (21): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+13 more)

### Community 92 - "LinkButton"
Cohesion: 0.11
Nodes (31): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+23 more)

### Community 93 - "server-only"
Cohesion: 0.16
Nodes (17): server-only, @supabase/supabase-js, GET(), digestMessage(), DigestRow, longDay(), peso, time() (+9 more)

### Community 94 - "opening.ts"
Cohesion: 0.13
Nodes (22): checkUpdate(), CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload() (+14 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "clients/actions.ts"
Cohesion: 0.12
Nodes (23): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), updateClientAction(), addClientUserAction(), fieldErrors(), FormState (+15 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "supabaseServer"
Cohesion: 0.08
Nodes (45): nextConfig, next, setClientStatusAction(), EditClient(), EditClientPage(), NewClientPage(), OwnerOnly(), addChargeAction() (+37 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (43): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+35 more)

### Community 101 - "Textarea"
Cohesion: 0.14
Nodes (25): ExplainForm(), AmendFilingForm(), NewRequestForm(), PortalRequest(), RequestDetail(), TicketForm(), CloseRequestButton(), ReplyForm() (+17 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "brand/forms.tsx"
Cohesion: 0.14
Nodes (22): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+14 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 106 - "books/reports/page.tsx"
Cohesion: 0.21
Nodes (16): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReports(), Reports(), when() (+8 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.11
Nodes (34): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+26 more)

### Community 108 - "engine.ts"
Cohesion: 0.23
Nodes (17): compareIso(), lastDayOfMonth(), DeadlineRule, fiscalYearOf(), followsCalendarYear(), generateFilingInstances(), nextWorkingDay(), Obligation (+9 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "quote/page.tsx"
Cohesion: 0.11
Nodes (44): activateAction(), createFromTemplateAction(), deleteDraftAction(), newDraftSchema, refresh(), savePricesAction(), saveSettingsAction(), startNewVersionAction() (+36 more)

### Community 111 - "app/documents/page.tsx"
Cohesion: 0.17
Nodes (18): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+10 more)

### Community 112 - "dates.ts"
Cohesion: 0.39
Nodes (9): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff() (+1 more)

### Community 113 - "compute.ts"
Cohesion: 0.09
Nodes (42): GridRow, EntryLineOut, Note, StatementLine, AlphalistRow, AnnualSummary, annualTax(), computeEmployeeYear() (+34 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "pending-review.tsx"
Cohesion: 0.21
Nodes (14): approveSelectedAction(), BOOKED, BulkState, key(), PendingReview(), PendingRow, ACCOUNT_SOURCES, AccountSource (+6 more)

### Community 116 - "parties/actions.ts"
Cohesion: 0.17
Nodes (20): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), normalizeTin(), runOcr(), SKIP (+12 more)

### Community 118 - "showMonth"
Cohesion: 0.07
Nodes (55): Doc, DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow (+47 more)

### Community 119 - "fees/types.ts"
Cohesion: 0.21
Nodes (13): count(), first(), pick(), profileFromQuery(), QuerySource, BOOKKEEPING_LEVELS, BookkeepingLevel, COMPLEXITY_FLAGS (+5 more)

### Community 120 - "fees/schedule.ts"
Cohesion: 0.15
Nodes (12): conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, optionalAmount, range, ScheduleStatus (+4 more)

### Community 121 - "supabaseAdmin"
Cohesion: 0.28
Nodes (8): GET(), generateFilingsNow(), GenerateState, GenerateButton(), runOcrAction(), supabaseEnv(), runFilingGeneration(), supabaseAdmin()

### Community 122 - "receipts.ts"
Cohesion: 0.22
Nodes (11): firmBlockLines(), formatTin(), cents(), CLIENT_MONEY_KINDS, FEE_KINDS, GrossReceiptsWatch, grossReceiptsWatch(), pesos() (+3 more)

### Community 123 - "Skeleton"
Cohesion: 0.12
Nodes (34): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), Detail(), StatementPage() (+26 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off-actions.tsx"
Cohesion: 0.31
Nodes (9): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+1 more)

### Community 126 - "fees/forms.tsx"
Cohesion: 0.26
Nodes (11): FeeFormState, ActivateForm(), billingHint, CreateFromTemplateForm(), DeleteDraftButton(), NewDraftForm(), PricesForm(), Result() (+3 more)

### Community 127 - "template.ts"
Cohesion: 0.20
Nodes (7): items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL, FeeItemTemplate

### Community 128 - "package.json"
Cohesion: 0.18
Nodes (10): @techstark/opencv-js@4.12.0-release.1, tsx@^4.23.15, @types/react-dom@^19, name, packageManager, private, version, @techstark/opencv-js (+2 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 131 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 132 - "IsoDate"
Cohesion: 0.19
Nodes (14): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+6 more)

### Community 133 - "quote.test.ts"
Cohesion: 0.28
Nodes (7): EWT_NOTE, base, code(), priced(), quote(), settings, TEST_PRICES

### Community 134 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 135 - "checks.test.ts"
Cohesion: 0.31
Nodes (7): checkFields(), Issue, num(), msgs(), ok, normalizeAmount(), ocrOutputSchema

### Community 136 - "documents/period.ts"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 141 - "sign-in-form.tsx"
Cohesion: 0.14
Nodes (19): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+11 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 145 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 146 - "parts.ts"
Cohesion: 0.10
Nodes (26): client(), ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine (+18 more)

### Community 148 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 980 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Skeleton` to `package.json`, `checkbox.tsx`, `fixed-assets/forms.tsx`, `Card`, `registrations/[id]/page.tsx`, `sign-in-form.tsx`, `dependencies`, `statements.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `[month]/page.tsx`, `registrations/forms.tsx`, `notification.tsx`, `manilaToday`, `document-upload.tsx`, `books/page.tsx`, `statement-view.tsx`, `tabs.tsx`, `dropdown.tsx`, `worksheet/page.tsx`, `fields.ts`, `books/forms.tsx`, `social-button.tsx`, `client-form.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `payment-forms.tsx`, `requireStaff`, `button.tsx`, `cx.ts`, `file-upload.tsx`, `workpapers/load.ts`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `LinkButton`, `supabaseServer`, `print/page.tsx`, `Textarea`, `brand/forms.tsx`, `books/reports/page.tsx`, `parties/[id]/page.tsx`, `quote/page.tsx`, `app/documents/page.tsx`, `pending-review.tsx`, `showMonth`, `supabaseAdmin`, `Skeleton`, `sign-off-actions.tsx`, `fees/forms.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `sign-off.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11231884057971014 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `package.json`, `generate.ts`, `sign-off.ts`, `db.test.ts`, `IsoDate`, `devDependencies`, `quote.test.ts`, `arap.ts`, `documents/period.ts`, `checks.test.ts`, `gemini.ts`, `Card`, `registrations/[id]/page.tsx`, `sign-in-form.tsx`, `statements.ts`, `parts.ts`, `names.ts`, `scores/page.tsx`, `ref_node_fs`, `[month]/page.tsx`, `registrations/forms.tsx`, `manilaToday`, `ledger/types.ts`, `deadlines/page.tsx`, `payroll/types.ts`, `Centavos`, `branches/page.tsx`, `returns/types.ts`, `gap.ts`, `fixed-assets/page.tsx`, `returns/types.ts`, `fields.ts`, `client-form.tsx`, `requireStaff`, `workpapers/load.ts`, `document-scanner.tsx`, `server-only`, `opening.ts`, `clients/actions.ts`, `print/page.tsx`, `rates.ts`, `parties/[id]/page.tsx`, `engine.ts`, `settings/actions.ts`, `quote/page.tsx`, `app/documents/page.tsx`, `dates.ts`, `acting-approver.test.ts`, `pending-review.tsx`, `showMonth`, `receipts.ts`, `template.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Should `generate.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14130434782608695 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `package.json`, `fixed-assets/forms.tsx`, `src/app/layout.tsx`, `Card`, `registrations/[id]/page.tsx`, `sign-in-form.tsx`, `dependencies`, `proxy.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `payroll/forms.tsx`, `Skeleton`, `[month]/page.tsx`, `registrations/forms.tsx`, `manilaToday`, `ledger/types.ts`, `payroll/data.ts`, `document-upload.tsx`, `branches/page.tsx`, `books/page.tsx`, `register-xlsx.ts`, `dropdown.tsx`, `returns/types.ts`, `worksheet/page.tsx`, `fields.ts`, `books/forms.tsx`, `theme-toggle.tsx`, `payment-forms.tsx`, `requireStaff`, `workpapers/load.ts`, `app/app/layout.tsx`, `LinkButton`, `server-only`, `clients/actions.ts`, `print/page.tsx`, `Textarea`, `brand/forms.tsx`, `books/reports/page.tsx`, `parties/[id]/page.tsx`, `settings/actions.ts`, `quote/page.tsx`, `app/documents/page.tsx`, `pending-review.tsx`, `parties/actions.ts`, `showMonth`, `supabaseAdmin`, `Skeleton`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._