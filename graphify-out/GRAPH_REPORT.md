# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 420 files · ~308,872 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 2878 nodes · 9192 edges · 134 communities (116 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 101 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `9e4f8904`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- filings/run.ts
- worksheet/page.tsx
- app/documents/page.tsx
- next
- package.json
- review-form.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- ledger/types.ts
- Sign-in & Setup Docs
- profile.ts
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
- payroll/payroll.test.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- payroll/data.ts
- ref_node_fs
- Card
- returns/load.ts
- Card
- scripts
- statement-view.tsx
- breadcrumb.tsx
- returns/types.ts
- parties/[id]/page.tsx
- payroll/types.ts
- requireOwner
- compute.ts
- src/app/layout.tsx
- returns/types.ts
- books/page.tsx
- quote.ts
- [month]/page.tsx
- cycle/page.tsx
- books/reports/page.tsx
- tabs.tsx
- cx
- Apple Design
- source.ts
- testing.ts
- 2316/page.tsx
- staff/forms.tsx
- books/forms.tsx
- clients/[id]/page.tsx
- Rules
- Animation Performance
- requireOwner
- stat-cards.tsx
- templatePayload
- theme-toggle.tsx
- toCentavos
- income.ts
- form-2316.tsx
- acting-approver/page.tsx
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- [clientId]/page.tsx
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- react
- generate-filings/route.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- settings/actions.ts
- BoardUI page patterns
- proxy.ts
- boardui
- rates.ts
- sign-in-form.tsx
- parties/actions.ts
- fees/types.ts
- income.ts
- proof-actions.ts
- client-form.tsx
- portal/documents/page.tsx
- PageHeader
- acting-approver.test.ts
- client-form.tsx
- ledger.test.ts
- requireStaff
- checkbox.tsx
- Skeleton
- fees/data.ts
- upload.tsx
- staff/actions.ts
- parties/parties.test.ts
- @remixicon/react
- review/page.tsx
- template-copy.tsx
- payment-actions.ts
- periods
- copy-opencv.mjs
- switch.tsx
- brand/forms.tsx
- fees/page.tsx
- ledger-lock.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 171 edges
2. `Notice()` - 128 edges
3. `cx` - 123 edges
4. `react` - 123 edges
5. `Button()` - 111 edges
6. `Skeleton()` - 103 edges
7. `next` - 99 edges
8. `Card()` - 92 edges
9. `requireOwner()` - 88 edges
10. `Badge()` - 85 edges

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

## Communities (134 total, 18 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.10
Nodes (29): Event, eventText, Filing(), FilingPage(), paymentText, when(), checkTone, checkWord (+21 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.08
Nodes (48): Rule, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule (+40 more)

### Community 2 - "worksheet/page.tsx"
Cohesion: 0.31
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (20): ClientSelect(), ApprovedTable(), ClientList(), countBy(), Documents(), DocumentsPage(), MonthCell(), one() (+12 more)

### Community 4 - "next"
Cohesion: 0.10
Nodes (26): nextConfig, next, Detail(), StatementPage(), recomputeWorksheetAction(), WorksheetState, GET(), Branches() (+18 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.07
Nodes (40): approveDocumentAction(), DirectoryParty, ENTRY_STATUS, typeLabel, DocActionState, checkFields(), Issue, num() (+32 more)

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

### Community 11 - "ledger/types.ts"
Cohesion: 0.08
Nodes (40): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), CashFlowClass, acct(), ADVANCES_FROM (+32 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (53): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+45 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (43): CASH_FLOW_CLASSES, defaultCashFlow(), codes, PNL, COA_TEMPLATES, loadStatements(), FS_LINES, FsLine (+35 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.14
Nodes (40): atcInfo(), atcKind(), normalizeAtc(), buildSawt(), incomePayment(), sawtAttachments(), sawtCsv(), sawtDat() (+32 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "payroll/payroll.test.ts"
Cohesion: 0.10
Nodes (37): BirCategory, Category, categoryTotals(), DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, KIND_ORDER, PayrollItem (+29 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "Notice"
Cohesion: 0.17
Nodes (37): AccountForm(), AmendmentRequestForm(), EntryForm(), ReleaseReportForm(), SetupForm(), DocReviewActions(), ClientUserForm(), EngagementForm() (+29 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (47): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+39 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.14
Nodes (29): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), check() (+21 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.08
Nodes (9): pg@^8.23.1, pg, ctx, input, root, root, root, root (+1 more)

### Community 46 - "Card"
Cohesion: 0.16
Nodes (22): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), ageOpenItems(), AGING_BUCKETS (+14 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.24
Nodes (10): FinancialStatements, dayBefore(), FilingRow, ListedDocument, loadLedger(), PAYROLL_FORM_CODES, SavedWorksheet, Supabase (+2 more)

### Community 48 - "Card"
Cohesion: 0.15
Nodes (31): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+23 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "statement-view.tsx"
Cohesion: 0.16
Nodes (16): Detail(), PayNow(), METHODS, proofBadge, proofMethod, statusBadge, FirmBlock, ProofState (+8 more)

### Community 51 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 52 - "returns/types.ts"
Cohesion: 0.11
Nodes (34): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+26 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.15
Nodes (20): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names (+12 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "requireOwner"
Cohesion: 0.23
Nodes (18): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+10 more)

### Community 56 - "compute.ts"
Cohesion: 0.08
Nodes (49): GridRow, Certificates2316, form2316(), Form2316Data, Form2316Employer, Form2316Line, Form2316Signatory, mmdd() (+41 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (50): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), EwtLine (+42 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.16
Nodes (24): AmendmentDecision(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+16 more)

### Community 60 - "quote.ts"
Cohesion: 0.12
Nodes (31): EstimatedProfile, estimateProfile(), gapFor(), GapRow, has(), buildQuote(), cents(), CustomQuoteItem (+23 more)

### Community 61 - "[month]/page.tsx"
Cohesion: 0.25
Nodes (15): file(), GET(), safe(), Payroll(), PayrollPage(), GET(), employeesForMonth(), loadStored() (+7 more)

### Community 62 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (28): Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, shift(), CloseCycleButton(), Message() (+20 more)

### Community 63 - "books/reports/page.tsx"
Cohesion: 0.14
Nodes (20): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+12 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "cx"
Cohesion: 0.08
Nodes (43): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+35 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "source.ts"
Cohesion: 0.15
Nodes (22): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, AtcKind, BUSINESS_TAX_ATCS, toSource() (+14 more)

### Community 68 - "testing.ts"
Cohesion: 0.12
Nodes (28): vitest, form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual (+20 more)

### Community 69 - "2316/page.tsx"
Cohesion: 0.33
Nodes (11): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+3 more)

### Community 70 - "staff/forms.tsx"
Cohesion: 0.42
Nodes (7): BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 71 - "books/forms.tsx"
Cohesion: 0.19
Nodes (34): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+26 more)

### Community 72 - "clients/[id]/page.tsx"
Cohesion: 0.16
Nodes (20): FormState, removeAssignmentAction(), setClientStatusAction(), AssignForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail() (+12 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "requireOwner"
Cohesion: 0.17
Nodes (22): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.12
Nodes (24): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+16 more)

### Community 77 - "templatePayload"
Cohesion: 0.22
Nodes (5): templatePayload(), as(), books(), root, root

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.17
Nodes (17): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+9 more)

### Community 79 - "toCentavos"
Cohesion: 0.08
Nodes (39): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+31 more)

### Community 80 - "income.ts"
Cohesion: 0.23
Nodes (23): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+15 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 82 - "acting-approver/page.tsx"
Cohesion: 0.27
Nodes (15): EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge, activeFor(), Appointment, appointmentRow() (+7 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 86 - "cx.ts"
Cohesion: 0.07
Nodes (28): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+20 more)

### Community 87 - "[clientId]/page.tsx"
Cohesion: 0.21
Nodes (20): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+12 more)

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
Cohesion: 0.27
Nodes (11): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+3 more)

### Community 92 - "react"
Cohesion: 0.14
Nodes (18): react, PartyForm(), NewParty(), NewPartyPage(), one(), PartiesPage(), PartyList(), Row (+10 more)

### Community 93 - "generate-filings/route.ts"
Cohesion: 0.17
Nodes (16): server-only, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+8 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (48): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+40 more)

### Community 101 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 106 - "sign-in-form.tsx"
Cohesion: 0.24
Nodes (12): code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode(), errors, Form() (+4 more)

### Community 107 - "parties/actions.ts"
Cohesion: 0.20
Nodes (17): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), runOcr(), SKIP, lookupParties(), blank() (+9 more)

### Community 108 - "fees/types.ts"
Cohesion: 0.09
Nodes (28): EngagementRow, TaxpayerType, ExistingClient, items, PRICES, schedule, settings, count() (+20 more)

### Community 109 - "income.ts"
Cohesion: 0.11
Nodes (42): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+34 more)

### Community 110 - "proof-actions.ts"
Cohesion: 0.16
Nodes (19): advanceFilingAction(), amendFilingAction(), amount, SignOffState, stepData(), text(), send(), getIdentity() (+11 more)

### Community 111 - "client-form.tsx"
Cohesion: 0.13
Nodes (23): zod, ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient(), EditClientPage() (+15 more)

### Community 112 - "portal/documents/page.tsx"
Cohesion: 0.10
Nodes (37): Doc, DocumentsCard(), when(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), Booking (+29 more)

### Community 113 - "PageHeader"
Cohesion: 0.20
Nodes (18): NewEmployee(), NewEmployeePage(), loadSchedules(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines() (+10 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "client-form.tsx"
Cohesion: 0.16
Nodes (19): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), updateClientAction(), obligationChanges(), obligationsForTaxTypes(), TAXPAYER_TYPES (+11 more)

### Community 116 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 117 - "requireStaff"
Cohesion: 0.20
Nodes (17): FilingListRow, FilingTable(), Deadlines(), DeadlinesPage(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView() (+9 more)

### Community 118 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 119 - "Skeleton"
Cohesion: 0.24
Nodes (17): SignOffActions(), portalContext(), Payroll(), PortalPayroll(), STATUS, when(), PortalReturns(), Returns() (+9 more)

### Community 120 - "fees/data.ts"
Cohesion: 0.14
Nodes (18): dateFmt, statusLabel, statusTone, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+10 more)

### Community 121 - "upload.tsx"
Cohesion: 0.60
Nodes (4): PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), PortalPayrollUpload()

### Community 122 - "staff/actions.ts"
Cohesion: 0.20
Nodes (13): @supabase/supabase-js, generateFilingsNow(), GenerateState, GenerateButton(), addClientUserAction(), fieldErrors(), FormState, inviteStaffAction() (+5 more)

### Community 123 - "parties/parties.test.ts"
Cohesion: 0.26
Nodes (13): displayName(), fullAddress(), listNameCols(), partyTinLabel(), person, ABBREVIATIONS, fillFromDirectory(), nameTokens() (+5 more)

### Community 124 - "@remixicon/react"
Cohesion: 0.22
Nodes (11): @remixicon/react, Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), reportsTab (+3 more)

### Community 125 - "review/page.tsx"
Cohesion: 0.26
Nodes (10): Queue(), ReviewPage(), Row, Section(), showDate(), QueueFiling, QueueViewer, ReviewQueue (+2 more)

### Community 126 - "template-copy.tsx"
Cohesion: 0.14
Nodes (10): CopyContext, CopySettings, dataProps, dataText, MenuContext, renderProps, TemplateCopyTranslator, textProps (+2 more)

### Community 127 - "payment-actions.ts"
Cohesion: 0.33
Nodes (10): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+2 more)

### Community 128 - "periods"
Cohesion: 0.40
Nodes (10): incomeAttachments(), Periods, periods(), addMonths(), docsWithin(), monthEnd(), monthWithin(), pad2() (+2 more)

### Community 129 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 130 - "switch.tsx"
Cohesion: 0.29
Nodes (7): Switch(), SwitchProps, SwitchShape, SwitchSize, switchSizes, SwitchTrack(), SwitchVisualState

### Community 131 - "brand/forms.tsx"
Cohesion: 0.38
Nodes (6): FieldDef, FIELDS, pesoInput(), Result(), SUBMIT, TaxForm()

### Community 132 - "fees/page.tsx"
Cohesion: 0.52
Nodes (6): longDate(), nextEffectiveDate(), CreateFromTemplateForm(), StartNewVersionForm(), FeeSchedulePage(), Schedules()

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 856 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `worksheet/page.tsx`, `app/documents/page.tsx`, `next`, `package.json`, `review-form.tsx`, `brand/forms.tsx`, `fees/page.tsx`, `switch.tsx`, `ledger/types.ts`, `profile.ts`, `dependencies`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `Card`, `Card`, `statement-view.tsx`, `breadcrumb.tsx`, `parties/[id]/page.tsx`, `books/page.tsx`, `[month]/page.tsx`, `cycle/page.tsx`, `books/reports/page.tsx`, `tabs.tsx`, `cx`, `2316/page.tsx`, `staff/forms.tsx`, `books/forms.tsx`, `clients/[id]/page.tsx`, `requireOwner`, `stat-cards.tsx`, `theme-toggle.tsx`, `acting-approver/page.tsx`, `button.tsx`, `notification.tsx`, `cx.ts`, `[clientId]/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `social-button.tsx`, `file-upload.tsx`, `print/page.tsx`, `sign-in-form.tsx`, `client-form.tsx`, `portal/documents/page.tsx`, `PageHeader`, `requireStaff`, `checkbox.tsx`, `Skeleton`, `upload.tsx`, `staff/actions.ts`, `@remixicon/react`, `review/page.tsx`, `template-copy.tsx`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0962566844919786 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `filings/[id]/page.tsx`, `worksheet/page.tsx`, `app/documents/page.tsx`, `brand/forms.tsx`, `package.json`, `review-form.tsx`, `fees/page.tsx`, `ledger/types.ts`, `profile.ts`, `dependencies`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `Card`, `Card`, `statement-view.tsx`, `breadcrumb.tsx`, `parties/[id]/page.tsx`, `requireOwner`, `src/app/layout.tsx`, `books/page.tsx`, `[month]/page.tsx`, `cycle/page.tsx`, `books/reports/page.tsx`, `2316/page.tsx`, `books/forms.tsx`, `clients/[id]/page.tsx`, `requireOwner`, `form-2316.tsx`, `acting-approver/page.tsx`, `[clientId]/page.tsx`, `app/app/layout.tsx`, `react`, `generate-filings/route.ts`, `print/page.tsx`, `settings/actions.ts`, `proxy.ts`, `sign-in-form.tsx`, `parties/actions.ts`, `proof-actions.ts`, `client-form.tsx`, `portal/documents/page.tsx`, `PageHeader`, `client-form.tsx`, `requireStaff`, `Skeleton`, `staff/actions.ts`, `@remixicon/react`, `review/page.tsx`, `payment-actions.ts`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07978142076502732 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `testing.ts` to `filings/[id]/page.tsx`, `filings/run.ts`, `app/documents/page.tsx`, `next`, `package.json`, `review-form.tsx`, `ledger-lock.test.ts`, `profile.ts`, `statements.ts`, `payroll/payroll.test.ts`, `scores/page.tsx`, `ref_node_fs`, `Card`, `compute.ts`, `returns/types.ts`, `quote.ts`, `cycle/page.tsx`, `books/reports/page.tsx`, `source.ts`, `requireOwner`, `templatePayload`, `toCentavos`, `acting-approver/page.tsx`, `document-scanner.tsx`, `generate-filings/route.ts`, `db.test.ts`, `print/page.tsx`, `settings/actions.ts`, `rates.ts`, `fees/types.ts`, `client-form.tsx`, `acting-approver.test.ts`, `client-form.tsx`, `ledger.test.ts`, `fees/data.ts`, `parties/parties.test.ts`, `review/page.tsx`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Should `app/documents/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14461538461538462 - nodes in this community are weakly interconnected._