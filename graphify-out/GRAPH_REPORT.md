# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 412 files · ~298,381 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 2839 nodes · 8946 edges · 126 communities (108 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 90 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `08a1f73b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- engine.ts
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
- quote/page.tsx
- scripts
- manilaToday
- cx
- filings/run.ts
- source.ts
- payroll/types.ts
- supabaseServer
- compute.ts
- src/app/layout.tsx
- returns/types.ts
- books/page.tsx
- opening.ts
- [month]/page.tsx
- cycle/page.tsx
- sign-off-actions.tsx
- tabs.tsx
- cx
- Apple Design
- buildSawt
- testing.ts
- 2316/page.tsx
- staff/forms.tsx
- books/forms.tsx
- login/actions.ts
- Rules
- Animation Performance
- requireOwner
- stat-cards.tsx
- pg
- theme-toggle.tsx
- arap.ts
- income.ts
- form-2316.tsx
- requireStaff
- react
- Pro components
- notification.tsx
- cx.ts
- link-button.tsx
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
- items.ts
- quote.ts
- book-income.ts
- proof-actions.ts
- clients/[id]/page.tsx
- portal/documents/page.tsx
- ymd
- acting-approver.test.ts
- client-form.tsx
- ledger.test.ts
- eslint.config.mjs
- checkbox.tsx
- chip.tsx
- cycle/actions.ts
- upload.tsx
- Building UIs with BoardUI
- filters.tsx
- fees.test.ts
- tests/payroll.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 170 edges
2. `Notice()` - 126 edges
3. `cx` - 123 edges
4. `react` - 122 edges
5. `Button()` - 108 edges
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

## Communities (126 total, 18 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.13
Nodes (19): Event, eventText, Filing(), FilingPage(), paymentText, when(), ACTION_LABEL, availableActions() (+11 more)

### Community 1 - "engine.ts"
Cohesion: 0.16
Nodes (24): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule, fiscalYearOf() (+16 more)

### Community 2 - "worksheet/page.tsx"
Cohesion: 0.15
Nodes (18): FilingListRow, Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet() (+10 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.17
Nodes (20): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), ApprovedTable(), ClientList(), countBy() (+12 more)

### Community 4 - "next"
Cohesion: 0.08
Nodes (29): nextConfig, next, zod, Detail(), StatementPage(), approveDocumentAction(), advanceFilingAction(), amount (+21 more)

### Community 5 - "package.json"
Cohesion: 0.12
Nodes (22): devDependencies, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19 (+14 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.07
Nodes (39): Booking, DirectoryParty, ENTRY_STATUS, typeLabel, checkFields(), Issue, num(), msgs() (+31 more)

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
Nodes (29): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+21 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (57): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+49 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1, @supabase/supabase-js@^2.119.2 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (47): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), FinancialStatementsView(), StatementTable(), PrintButton() (+39 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.15
Nodes (41): incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, addMonths() (+33 more)

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
Cohesion: 0.11
Nodes (31): entry(), P(), monthlyTable(), monthlyWithholding(), DEFAULT_ITEMS, PayrollItem, employee(), entry() (+23 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "Notice"
Cohesion: 0.12
Nodes (53): ClientForm(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), EntryForm(), OpeningUpload(), PermitForm() (+45 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.14
Nodes (38): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+30 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.14
Nodes (29): server-only, @supabase/supabase-js, Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), Certificates2316 (+21 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.10
Nodes (8): outDir, pkgDir, require, { version }, ctx, input, root, root

### Community 46 - "Card"
Cohesion: 0.11
Nodes (42): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+34 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.14
Nodes (14): Split, dayBefore(), FilingRow, ListedDocument, LoadedWorksheet, loadLedger(), PAYROLL_FORM_CODES, SavedWorksheet (+6 more)

### Community 48 - "quote/page.tsx"
Cohesion: 0.08
Nodes (63): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+55 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.10
Nodes (34): PortalClient, portalContext(), Payroll(), PortalPayroll(), STATUS, when(), PortalReport(), Report() (+26 more)

### Community 51 - "cx"
Cohesion: 0.09
Nodes (25): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ButtonLink(), IconButton(), IconButtonProps (+17 more)

### Community 52 - "filings/run.ts"
Cohesion: 0.15
Nodes (22): Rule, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance, Frequency, Period (+14 more)

### Community 53 - "source.ts"
Cohesion: 0.07
Nodes (57): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+49 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "supabaseServer"
Cohesion: 0.11
Nodes (46): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), updateClientAction(), NewClientPage() (+38 more)

### Community 56 - "compute.ts"
Cohesion: 0.06
Nodes (68): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+60 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (50): VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel(), EwtLine (+42 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.11
Nodes (35): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), AMENDMENT_BADGE, Books() (+27 more)

### Community 60 - "opening.ts"
Cohesion: 0.11
Nodes (26): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+18 more)

### Community 61 - "[month]/page.tsx"
Cohesion: 0.20
Nodes (19): file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), GET(), employeesForMonth() (+11 more)

### Community 62 - "cycle/page.tsx"
Cohesion: 0.19
Nodes (16): Cycle(), CyclePage(), CycleWithClient, DocRow, CloseCycleButton(), Message(), NothingToSubmitButton(), CycleState (+8 more)

### Community 63 - "sign-off-actions.tsx"
Cohesion: 0.22
Nodes (12): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+4 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.07
Nodes (30): react-aria-components@^1.22.1, react-aria-components, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb (+22 more)

### Community 65 - "cx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "buildSawt"
Cohesion: 0.21
Nodes (14): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+6 more)

### Community 68 - "testing.ts"
Cohesion: 0.13
Nodes (25): vitest, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q, individual, amounts() (+17 more)

### Community 69 - "2316/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 70 - "staff/forms.tsx"
Cohesion: 0.47
Nodes (5): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm()

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (36): ArapState, checkArapFile(), checkOpeningFile(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction(), FormState (+28 more)

### Community 72 - "login/actions.ts"
Cohesion: 0.27
Nodes (8): GET(), GET(), code, email, sendSignInEmail(), signInWithGoogle(), verifySignInCode(), safeNextPath()

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "requireOwner"
Cohesion: 0.12
Nodes (29): SettingsState, periodWord, RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+21 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "pg"
Cohesion: 0.18
Nodes (4): pg@^8.23.1, pg, root, root

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (36): react-dom@19.3.0, react-dom, Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav() (+28 more)

### Community 79 - "arap.ts"
Cohesion: 0.14
Nodes (20): exceljs@4.4.0, exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount (+12 more)

### Community 80 - "income.ts"
Cohesion: 0.13
Nodes (39): bookIncome(), linesWithMovement(), BOOK_FIGURES, booksCover(), COMPARISON_COLUMNS, comparisonSchedule(), compute1701Q(), compute1702Q() (+31 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.20
Nodes (17): Design rules, The workflow, amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set() (+9 more)

### Community 82 - "requireStaff"
Cohesion: 0.12
Nodes (32): DashboardStats(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary(), Queue(), ReviewPage() (+24 more)

### Community 83 - "react"
Cohesion: 0.12
Nodes (19): react, @remixicon/react, FilingTable(), GenerateButton(), Deadlines(), DeadlinesPage(), Button(), ButtonLinkProps (+11 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (26): AvatarColor, AvatarProps, AvatarSize, styles, ButtonProps, CloseButton(), CloseButtonProps, CloseButtonSize (+18 more)

### Community 86 - "cx.ts"
Cohesion: 0.10
Nodes (17): Counter(), CounterColor, CounterProps, styles, StatusDot(), StatusDotColor, StatusDotProps, styles (+9 more)

### Community 87 - "link-button.tsx"
Cohesion: 0.24
Nodes (9): IconComponent, LinkButtonAnchorProps, LinkButtonBaseProps, LinkButtonButtonProps, LinkButtonProps, LinkButtonSize, linkButtonStyles, LinkButtonVariant (+1 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.13
Nodes (25): HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps, inputElementClassName (+17 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.15
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+11 more)

### Community 92 - "react"
Cohesion: 0.10
Nodes (41): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), EmployeeDetail(), EmployeePage(), NewEmployee() (+33 more)

### Community 93 - "generate-filings/route.ts"
Cohesion: 0.17
Nodes (16): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+8 more)

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

### Community 99 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (43): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+35 more)

### Community 101 - "settings/actions.ts"
Cohesion: 0.17
Nodes (16): generateFilingsNow(), GenerateState, addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, updateRuleAction() (+8 more)

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
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+11 more)

### Community 106 - "sign-in-form.tsx"
Cohesion: 0.36
Nodes (7): SignInState, errors, Form(), LoginPage(), SignInForm(), Divider(), SocialButton()

### Community 107 - "items.ts"
Cohesion: 0.18
Nodes (15): MonthGrid(), toInput(), PayrollSetupPage(), Setup(), BirCategory, CATEGORIES, Category, CATEGORY_KEYS (+7 more)

### Community 108 - "quote.ts"
Cohesion: 0.06
Nodes (61): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+53 more)

### Community 109 - "book-income.ts"
Cohesion: 0.36
Nodes (7): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS

### Community 110 - "proof-actions.ts"
Cohesion: 0.23
Nodes (12): send(), amount, date, refresh(), rejectProofAction(), StartProof, startProofUpload(), submitProof() (+4 more)

### Community 111 - "clients/[id]/page.tsx"
Cohesion: 0.19
Nodes (17): StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail() (+9 more)

### Community 112 - "portal/documents/page.tsx"
Cohesion: 0.11
Nodes (33): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+25 more)

### Community 113 - "ymd"
Cohesion: 0.64
Nodes (6): shift(), addMonths(), ymd(), monthChoices(), nextCutoff(), openMonth()

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "client-form.tsx"
Cohesion: 0.10
Nodes (25): FormState, ClientValues, frequencyLabel, Props, EditClient(), EditClientPage(), months, statusLabel (+17 more)

### Community 116 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 117 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 118 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 119 - "chip.tsx"
Cohesion: 0.33
Nodes (5): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles

### Community 120 - "cycle/actions.ts"
Cohesion: 0.60
Nodes (5): closeCycleAction(), decideExceptionAction(), nothingToSubmitAction(), refresh(), text()

### Community 121 - "upload.tsx"
Cohesion: 0.60
Nodes (4): PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), PortalPayrollUpload()

### Community 122 - "Building UIs with BoardUI"
Cohesion: 0.40
Nodes (5): BoardUI Pro, Building UIs with BoardUI, Choosing components, Going deeper, Known gotchas

### Community 123 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 856 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `worksheet/page.tsx`, `app/documents/page.tsx`, `next`, `package.json`, `review-form.tsx`, `profile.ts`, `dependencies`, `statements.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `Card`, `quote/page.tsx`, `manilaToday`, `cx`, `source.ts`, `supabaseServer`, `books/page.tsx`, `[month]/page.tsx`, `cycle/page.tsx`, `sign-off-actions.tsx`, `tabs.tsx`, `cx`, `2316/page.tsx`, `staff/forms.tsx`, `books/forms.tsx`, `requireOwner`, `stat-cards.tsx`, `theme-toggle.tsx`, `requireStaff`, `notification.tsx`, `cx.ts`, `link-button.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `react`, `social-button.tsx`, `file-upload.tsx`, `print/page.tsx`, `sign-in-form.tsx`, `items.ts`, `clients/[id]/page.tsx`, `portal/documents/page.tsx`, `client-form.tsx`, `checkbox.tsx`, `chip.tsx`, `upload.tsx`, `filters.tsx`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13438735177865613 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `filings/[id]/page.tsx`, `worksheet/page.tsx`, `app/documents/page.tsx`, `package.json`, `review-form.tsx`, `profile.ts`, `dependencies`, `statements.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `Card`, `quote/page.tsx`, `manilaToday`, `cx`, `source.ts`, `supabaseServer`, `src/app/layout.tsx`, `books/page.tsx`, `[month]/page.tsx`, `cycle/page.tsx`, `sign-off-actions.tsx`, `2316/page.tsx`, `books/forms.tsx`, `login/actions.ts`, `requireOwner`, `theme-toggle.tsx`, `form-2316.tsx`, `requireStaff`, `react`, `app/app/layout.tsx`, `react`, `generate-filings/route.ts`, `print/page.tsx`, `settings/actions.ts`, `proxy.ts`, `proof-actions.ts`, `clients/[id]/page.tsx`, `portal/documents/page.tsx`, `client-form.tsx`, `cycle/actions.ts`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.08181818181818182 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11857707509881422 - nodes in this community are weakly interconnected._
- **Should `review-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07102040816326531 - nodes in this community are weakly interconnected._