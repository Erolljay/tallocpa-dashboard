# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 717 files · ~560,244 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4469 nodes · 15442 edges · 171 communities (153 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `708b30f6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- filings/run.ts
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- registrations/[id]/page.tsx
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
- payroll/export/route.ts
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
- month.ts
- percentage.ts
- ledger/data.ts
- year.ts
- Skeleton
- money.ts
- Notice
- payment-forms.tsx
- quote/page.tsx
- registrations/forms.tsx
- workpapers/page.tsx
- cx
- select.tsx
- Apple Design
- items.ts
- returns/books.test.ts
- party-pages.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- formatAmount
- Rules
- Animation Performance
- ledger/types.ts
- stat-cards.tsx
- Card
- theme-toggle.tsx
- quote.ts
- parts.ts
- requireOwner
- sign-off.ts
- button.tsx
- Pro components
- cx.ts
- registrations/actions.ts
- portal/reports/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- public.ts
- ledger/types.ts
- Recipes
- payroll/data.ts
- BoardUI theming reference
- Pro templates
- social-button.tsx
- print/page.tsx
- leads/[id]/page.tsx
- [month]/page.tsx
- obligations.ts
- boardui
- rates.ts
- fees/types.ts
- parties/parties.test.ts
- alphalist.ts
- formatAmount
- steps.ts
- Opening balances: checklist for any cut-off
- fixed-assets/forms.tsx
- portal/page.tsx
- acting-approver.test.ts
- ledger/data.ts
- staff/page.tsx
- apply-migrations.sh
- brand/forms.tsx
- module-pages.tsx
- filings/[id]/page.tsx
- returns/load.ts
- 2316/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- file-upload.tsx
- cycle/page.tsx
- pending-review.tsx
- checkbox.tsx
- server-only
- resolve.ts
- tieouts.test.ts
- fields.ts
- work/page.tsx
- @remixicon/react
- manilaToday
- gemini.ts
- Textarea
- ledger.test.ts
- ref_node_fs
- settings-schema.ts
- proxy.ts
- filed-returns.ts
- util.ts
- generate-qap-fixture.mjs
- template.ts
- db.test.ts
- brand/actions.ts
- sign-in-form.tsx
- leads/[id]/page.tsx
- manilaToday
- safeguards.ts
- register/page.tsx
- quote.test.ts
- filters.tsx
- proposal-view.tsx
- supabaseServer
- BoardUI page patterns
- money.ts
- payroll/register.ts
- Rework: one flow from lead to year-end
- BoardUI page patterns
- eslint.config.mjs
- proof-review.tsx
- describe.ts
- portal/layout.tsx
- requests/actions.ts
- clients/[id]/page.tsx
- seed.ts
- party-pages.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 282 edges
2. `Skeleton()` - 216 edges
3. `cx` - 215 edges
4. `react` - 211 edges
5. `Notice()` - 205 edges
6. `Button()` - 183 edges
7. `next` - 169 edges
8. `Card()` - 159 edges
9. `Badge()` - 148 edges
10. `Input()` - 128 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `approved()` --indirect_call--> `client()`  [INFERRED]
  supabase/tests/register-books.test.ts → src/lib/deadlines/coverage.test.ts
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (171 total, 18 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (48): BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href() (+40 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.10
Nodes (40): Rule, PlannedObligation, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), DeadlineRule, DueRule (+32 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.12
Nodes (26): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+18 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

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

### Community 11 - "registrations/[id]/page.tsx"
Cohesion: 0.17
Nodes (29): StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+21 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (27): ClientTab, ClientTabs(), UNDER, OnboardingState, RemoveFileButton(), TickForm(), fmtDate(), Onboarding() (+19 more)

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
Cohesion: 0.08
Nodes (44): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, statementsFrom(), FS_LINES, FsLine (+36 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.11
Nodes (43): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments(), buildSawt() (+35 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "payroll/export/route.ts"
Cohesion: 0.22
Nodes (14): release2316Action(), file(), GET(), safe(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage() (+6 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (41): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+33 more)

### Community 42 - "income.ts"
Cohesion: 0.11
Nodes (41): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), deductionSchedule(), inputs1701() (+33 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "ui.ts"
Cohesion: 0.07
Nodes (44): MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+36 more)

### Community 45 - "index.ts"
Cohesion: 0.04
Nodes (40): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+32 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.13
Nodes (42): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+34 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (67): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+59 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.08
Nodes (32): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+24 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (23): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+15 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.13
Nodes (19): StepProgress(), Row, StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS (+11 more)

### Community 53 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 54 - "percentage.ts"
Cohesion: 0.22
Nodes (25): compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q(), cwt() (+17 more)

### Community 55 - "ledger/data.ts"
Cohesion: 0.12
Nodes (26): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), Released, accountFromRow(), Amendment (+18 more)

### Community 56 - "year.ts"
Cohesion: 0.09
Nodes (46): GridRow, AlphaCols, AlphalistRow, Certificates2316, form2316(), Form2316Data, Form2316Employer, Form2316Line (+38 more)

### Community 57 - "Skeleton"
Cohesion: 0.08
Nodes (34): react, BankAccountsRoute(), EmployeesRoute(), InvoiceEdit(), JournalEntryRoute(), JournalRoute(), PaymentsNewPage(), PaymentsListPage() (+26 more)

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (49): lookupAtc(), client, row(), agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal (+41 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (74): ClientForm(), BatchUpload(), PreviewTable(), EntryForm(), ReleaseReportForm(), SetupForm(), ClientFileForm(), EmployeeForm() (+66 more)

### Community 60 - "payment-forms.tsx"
Cohesion: 0.20
Nodes (22): PaymentSettings(), accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction() (+14 more)

### Community 61 - "quote/page.tsx"
Cohesion: 0.06
Nodes (81): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), convertLeadAction(), markLostAction(), recordCallAction() (+73 more)

### Community 62 - "registrations/forms.tsx"
Cohesion: 0.12
Nodes (26): completeRegistrationAction(), fieldErrors(), openClientCaseAction(), openRegistrationAction(), updateStepAction(), caseNote, caseTitle, Check() (+18 more)

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (21): ExplainState, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm(), amt(), one(), shiftMonth(), SignStatus() (+13 more)

### Community 64 - "cx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "select.tsx"
Cohesion: 0.06
Nodes (52): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+44 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "items.ts"
Cohesion: 0.17
Nodes (14): PayrollSetupPage(), Setup(), loadPayrollSettings(), BirCategory, CATEGORIES, Category, CATEGORY_KEYS, DEDUCTION_FIELDS (+6 more)

### Community 68 - "returns/books.test.ts"
Cohesion: 0.12
Nodes (28): vitest, form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual (+20 more)

### Community 69 - "party-pages.tsx"
Cohesion: 0.21
Nodes (14): estimateProfile(), ExistingClient, gapFor(), GapRow, has(), items, PRICES, schedule (+6 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.16
Nodes (20): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, PARTY_COLUMNS (+12 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (44): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+36 more)

### Community 72 - "formatAmount"
Cohesion: 0.15
Nodes (42): booksContext(), fmtDate(), fmtMonth(), BooksFrame(), BooksList(), INVOICE_KINDS, InvoiceList(), InvoiceView() (+34 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ledger/types.ts"
Cohesion: 0.09
Nodes (41): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, amt(), FixedAssets(), FixedAssetsPage(), one() (+33 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.10
Nodes (27): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+19 more)

### Community 77 - "Card"
Cohesion: 0.09
Nodes (46): ClientList(), ClientsPage(), CyclePage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs() (+38 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "quote.ts"
Cohesion: 0.19
Nodes (16): PriceRow, buildQuote(), cents(), CustomQuoteItem, inRange(), matches(), pesos(), QuoteLine (+8 more)

### Community 80 - "parts.ts"
Cohesion: 0.13
Nodes (13): c(), one(), RegisterRow, line(), row(), toRegisterLine(), base, books (+5 more)

### Community 81 - "requireOwner"
Cohesion: 0.06
Nodes (64): zod@^4.6.7, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction() (+56 more)

### Community 82 - "sign-off.ts"
Cohesion: 0.16
Nodes (21): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+13 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): @remixicon/react, ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 86 - "registrations/actions.ts"
Cohesion: 0.16
Nodes (17): cancelRegistrationAction(), ClientCaseKind, dtiRegisteredOn(), FormState, openYearRenewalsAction(), clientCase, NewRegistrationPage(), OwnerOnly() (+9 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.12
Nodes (44): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+36 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (29): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+21 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.09
Nodes (29): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+21 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 93 - "public.ts"
Cohesion: 0.19
Nodes (10): SERVICES, StartState, QuerySource, brandSchedule(), contentHash(), FUNNEL_BRAND, instantQuote(), canonicalContent() (+2 more)

### Community 94 - "ledger/types.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.20
Nodes (21): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), certificatesFromRaw(), loadPriorEmployers(), payAccountsOf(), PayrollClient, PayrollSettings (+13 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.07
Nodes (45): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+37 more)

### Community 101 - "leads/[id]/page.tsx"
Cohesion: 0.24
Nodes (11): metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage(), Lockup(), Mark() (+3 more)

### Community 102 - "[month]/page.tsx"
Cohesion: 0.14
Nodes (20): MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton() (+12 more)

### Community 103 - "obligations.ts"
Cohesion: 0.19
Nodes (15): ClientValues, EngagementRow, obligationChanges(), obligationsForTaxTypes(), TAX_TYPES, TAXPAYER_TYPES, TaxpayerType, TaxType (+7 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.21
Nodes (21): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+13 more)

### Community 106 - "fees/types.ts"
Cohesion: 0.22
Nodes (13): EstimatedProfile, count(), first(), pick(), profileFromQuery(), BOOKKEEPING_LEVELS, BookkeepingLevel, ClientProfile (+5 more)

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.21
Nodes (16): mergePartyAction(), runOcr(), SKIP, lookupParties(), person, fillFromDirectory(), blank(), optionalText() (+8 more)

### Community 108 - "alphalist.ts"
Cohesion: 0.11
Nodes (33): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+25 more)

### Community 109 - "formatAmount"
Cohesion: 0.21
Nodes (15): Batch(), BatchPage(), one(), toCentavos(), Accreditation(), amount(), AmountRow(), DateCells() (+7 more)

### Community 110 - "steps.ts"
Cohesion: 0.13
Nodes (16): Agency, BranchOptions, CaseStep, ClosureOptions, dayNumber(), EMPLOYER_STEPS, LGU_STEPS, PlannedStep (+8 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/forms.tsx"
Cohesion: 0.53
Nodes (5): AssetState, Message(), OpeningAssetForm(), RunDepreciationButton(), SetupAssetForm()

### Community 113 - "portal/page.tsx"
Cohesion: 0.12
Nodes (32): BooksChart(), compact, longMonth(), short(), shortMonth(), SentRow, BooksCards(), cents() (+24 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "ledger/data.ts"
Cohesion: 0.15
Nodes (26): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+18 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 118 - "brand/forms.tsx"
Cohesion: 0.17
Nodes (13): BrandSettingsState, FieldDef, FIELDS, pesoInput(), Result(), SUBMIT, TaxForm(), BRAND_FILES (+5 more)

### Community 119 - "module-pages.tsx"
Cohesion: 0.13
Nodes (23): blankLine(), InvoiceForm(), InvoiceFormValue, SettingsPage(), PickOption, loadTaxCodes(), appliesTo(), canGoOn() (+15 more)

### Community 120 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (79): ClientReturnsPage(), FilingRow, Returns(), DashboardStats(), FilingListRow, FilingTable(), AmendmentCard(), BooksStillOpen() (+71 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.08
Nodes (51): FinancialStatements, ATC_MASTER, AtcInfo, normalizeAtc(), NonDeductibleRow, withNonDeductible(), dayBefore(), FilingRow (+43 more)

### Community 122 - "2316/page.tsx"
Cohesion: 0.29
Nodes (11): NewEntry(), NewEntryPage(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Form2316Set(), Form2316Sheet() (+3 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.18
Nodes (12): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, stepIndex(), client, owner, preparer (+4 more)

### Community 126 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.11
Nodes (33): Cycle(), CycleWithClient, DocRow, ExceptionRow, shift(), MonthComplete(), TimelineRow, CloseCycleButton() (+25 more)

### Community 128 - "pending-review.tsx"
Cohesion: 0.10
Nodes (29): BulkState, Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, BooksChoices(), Codes (+21 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "server-only"
Cohesion: 0.05
Nodes (69): RFC-2047, RFC-2822, server-only, GET(), GET(), GET(), generateFilingsNow(), GenerateState (+61 more)

### Community 131 - "resolve.ts"
Cohesion: 0.24
Nodes (13): displayName(), fullAddress(), listNameCols(), Party, ABBREVIATIONS, nameTokens(), PartyFields, ResolvedParty (+5 more)

### Community 132 - "tieouts.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 133 - "fields.ts"
Cohesion: 0.12
Nodes (21): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, normalizeAmount() (+13 more)

### Community 134 - "work/page.tsx"
Cohesion: 0.20
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 135 - "@remixicon/react"
Cohesion: 0.12
Nodes (29): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), credit() (+21 more)

### Community 136 - "manilaToday"
Cohesion: 0.05
Nodes (81): Doc, DocumentsCard(), when(), ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key() (+73 more)

### Community 137 - "gemini.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "Textarea"
Cohesion: 0.14
Nodes (17): DocReviewActions(), SignOffState, AmendFilingForm(), checkTone, checkWord, needsNote(), noteLabel(), noteRequired() (+9 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.03
Nodes (29): pg, outDir, pkgDir, require, { version }, ctx, input, root (+21 more)

### Community 141 - "settings-schema.ts"
Cohesion: 0.43
Nodes (5): checkbox, dayBefore(), holidaySchema, ruleEditSchema, base

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "filed-returns.ts"
Cohesion: 0.23
Nodes (10): FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear(), TaxTypeGroup (+2 more)

### Community 144 - "util.ts"
Cohesion: 0.42
Nodes (11): Periods, periods(), addMonths(), docsWithin(), Filer, monthEnd(), monthsBetween(), monthWithin() (+3 more)

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "template.ts"
Cohesion: 0.20
Nodes (7): items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL, FeeItemTemplate

### Community 148 - "brand/actions.ts"
Cohesion: 0.33
Nodes (9): finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload(), upload() (+1 more)

### Community 149 - "sign-in-form.tsx"
Cohesion: 0.36
Nodes (7): SignInState, errors, Form(), LoginPage(), SignInForm(), Divider(), SocialButton()

### Community 150 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (40): NoteState, NotesCard(), ClientNoteForm(), LeadState, DiscoveryCallForm(), FunnelSwitch(), LostForm(), Person (+32 more)

### Community 151 - "manilaToday"
Cohesion: 0.12
Nodes (33): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+25 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.10
Nodes (36): Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board (+28 more)

### Community 153 - "register/page.tsx"
Cohesion: 0.14
Nodes (29): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+21 more)

### Community 154 - "quote.test.ts"
Cohesion: 0.28
Nodes (7): EWT_NOTE, base, code(), priced(), quote(), settings, TEST_PRICES

### Community 155 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 156 - "proposal-view.tsx"
Cohesion: 0.39
Nodes (7): Lines(), longDate(), money(), php, ProposalData, ProposalView(), Quote

### Community 157 - "supabaseServer"
Cohesion: 0.05
Nodes (77): nextConfig, next, EditClient(), EditClientPage(), addOpeningAssetAction(), refresh(), runDepreciationAction(), setupAssetAction() (+69 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 159 - "money.ts"
Cohesion: 0.43
Nodes (5): applyRate(), basisPoints(), grossUp(), grouped, sum()

### Community 160 - "payroll/register.ts"
Cohesion: 0.11
Nodes (34): monthlyTable(), monthlyWithholding(), PayrollItem, sortItems(), employee(), entry(), fixtureContext(), ITEMS (+26 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 163 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 164 - "proof-review.tsx"
Cohesion: 0.70
Nodes (4): ProofReview(), suggestTicks(), tickedSplit(), toCents()

### Community 170 - "describe.ts"
Cohesion: 0.40
Nodes (4): FREQUENCY_SECTIONS, periodWord, TAX_TYPE_GROUPS, taxTypeOfForm()

### Community 172 - "portal/layout.tsx"
Cohesion: 0.27
Nodes (10): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+2 more)

### Community 173 - "requests/actions.ts"
Cohesion: 0.16
Nodes (21): PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), Thread(), ThreadMessage, when() (+13 more)

### Community 174 - "clients/[id]/page.tsx"
Cohesion: 0.15
Nodes (22): FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm(), IncomeTaxMethodForm() (+14 more)

### Community 176 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 185 - "party-pages.tsx"
Cohesion: 0.22
Nodes (9): SearchParams, Column, ListRow, RowLink(), CustomersRoute(), KINDS, PartyList(), SuppliersRoute() (+1 more)

## Knowledge Gaps
- **20 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1209 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Skeleton` to `form-2307.ts`, `pending-review.tsx`, `server-only`, `notification.tsx`, `checkbox.tsx`, `package.json`, `@remixicon/react`, `manilaToday`, `Textarea`, `registrations/[id]/page.tsx`, `onboarding/page.tsx`, `dependencies`, `sign-in-form.tsx`, `leads/[id]/page.tsx`, `manilaToday`, `register/page.tsx`, `filters.tsx`, `supabaseServer`, `proof-review.tsx`, `payroll/export/route.ts`, `scores/page.tsx`, `ui.ts`, `portal/layout.tsx`, `clients/[id]/page.tsx`, `modal.tsx`, `lib/books/actions.ts`, `payroll/forms.tsx`, `requests/actions.ts`, `ledger/data.ts`, `party-pages.tsx`, `Notice`, `payment-forms.tsx`, `quote/page.tsx`, `registrations/forms.tsx`, `workpapers/page.tsx`, `cx`, `select.tsx`, `items.ts`, `parties/[id]/page.tsx`, `books/forms.tsx`, `ledger/types.ts`, `stat-cards.tsx`, `Card`, `theme-toggle.tsx`, `requireOwner`, `button.tsx`, `cx.ts`, `registrations/actions.ts`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `payroll/data.ts`, `social-button.tsx`, `print/page.tsx`, `leads/[id]/page.tsx`, `[month]/page.tsx`, `formatAmount`, `fixed-assets/forms.tsx`, `portal/page.tsx`, `ledger/data.ts`, `staff/page.tsx`, `brand/forms.tsx`, `module-pages.tsx`, `filings/[id]/page.tsx`, `2316/page.tsx`, `batch/register.ts`, `file-upload.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0912568306010929 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `pending-review.tsx`, `server-only`, `arap.ts`, `package.json`, `@remixicon/react`, `manilaToday`, `Textarea`, `registrations/[id]/page.tsx`, `onboarding/page.tsx`, `proxy.ts`, `dependencies`, `brand/actions.ts`, `leads/[id]/page.tsx`, `manilaToday`, `register/page.tsx`, `payroll/export/route.ts`, `scores/page.tsx`, `ui.ts`, `portal/layout.tsx`, `clients/[id]/page.tsx`, `payroll/forms.tsx`, `lib/books/actions.ts`, `requests/actions.ts`, `ledger/data.ts`, `party-pages.tsx`, `Skeleton`, `payment-forms.tsx`, `quote/page.tsx`, `workpapers/page.tsx`, `select.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `formatAmount`, `ledger/types.ts`, `Card`, `requireOwner`, `sign-off.ts`, `button.tsx`, `registrations/actions.ts`, `portal/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `payroll/data.ts`, `print/page.tsx`, `leads/[id]/page.tsx`, `[month]/page.tsx`, `formatAmount`, `portal/page.tsx`, `ledger/data.ts`, `staff/page.tsx`, `brand/forms.tsx`, `filings/[id]/page.tsx`, `2316/page.tsx`, `batch/register.ts`, `cycle/page.tsx`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1026827012025902 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `returns/books.test.ts` to `form-2307.ts`, `filings/run.ts`, `server-only`, `pending-review.tsx`, `arap.ts`, `package.json`, `fields.ts`, `gemini.ts`, `manilaToday`, `work/page.tsx`, `tieouts.test.ts`, `ledger.test.ts`, `ref_node_fs`, `settings-schema.ts`, `onboarding/page.tsx`, `filed-returns.ts`, `gemini.ts`, `template.ts`, `statements.ts`, `db.test.ts`, `leads/[id]/page.tsx`, `manilaToday`, `safeguards.ts`, `quote.test.ts`, `filters.tsx`, `supabaseServer`, `BoardUI page patterns`, `money.ts`, `payroll/register.ts`, `scores/page.tsx`, `describe.ts`, `portal/layout.tsx`, `ui.ts`, `clients/[id]/page.tsx`, `requests/actions.ts`, `lib/books/actions.ts`, `index.ts`, `profile.ts`, `workpapers/load.ts`, `deadlines/page.tsx`, `month.ts`, `year.ts`, `money.ts`, `quote/page.tsx`, `registrations/forms.tsx`, `workpapers/page.tsx`, `party-pages.tsx`, `formatAmount`, `ledger/types.ts`, `parts.ts`, `requireOwner`, `sign-off.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `public.ts`, `ledger/types.ts`, `print/page.tsx`, `[month]/page.tsx`, `obligations.ts`, `rates.ts`, `parties/parties.test.ts`, `formatAmount`, `portal/page.tsx`, `acting-approver.test.ts`, `module-pages.tsx`, `filings/[id]/page.tsx`, `returns/load.ts`, `batch/register.ts`, `sign-off.ts`, `cycle/page.tsx`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._