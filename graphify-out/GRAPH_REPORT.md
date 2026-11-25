# Graph Report - agent-a8976973f629d5b97  (2026-11-25)

## Corpus Check
- 634 files · ~484,517 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 6, (none) 5, .mdc 1)

## Summary
- 3982 nodes · 13566 edges · 165 communities (143 shown, 22 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 118 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `76393128`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Skeleton
- addDays
- migrate.yml
- notification.tsx
- arap.ts
- devDependencies
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- formatAmount
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
- payroll/payroll.test.ts
- app/requests/page.tsx
- ocr/run.ts
- payroll/forms.tsx
- Centavos
- lib/books/actions.ts
- scripts
- percentage.ts
- approval-memo.tsx
- steps.ts
- registrations/page.tsx
- payroll/data.ts
- settings/actions.ts
- social-button.tsx
- @remixicon/react
- money.ts
- acting-approver/page.tsx
- app/settings/page.tsx
- ledger/data.ts
- fixed-assets.test.ts
- workpapers/page.tsx
- tabs.tsx
- cx
- Apple Design
- returns/types.ts
- testing.ts
- file-upload.tsx
- funnel.test.ts
- books/forms.tsx
- documents/[id]/page.tsx
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- registrations/[id]/page.tsx
- theme-toggle.tsx
- quote.ts
- filings/actions.ts
- Button
- Card
- button.tsx
- Pro components
- cx.ts
- [clientId]/page.tsx
- statements/page.tsx
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- profile.ts
- toCentavos
- Recipes
- tieouts.test.ts
- BoardUI theming reference
- Pro templates
- auth.ts
- print/page.tsx
- leads/[id]/page.tsx
- items.ts
- PageHeader
- boardui
- rates.ts
- Textarea
- parties/[id]/page.tsx
- db.test.ts
- seed-sql.ts
- Notice
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- clients/[id]/page.tsx
- acting-approver.test.ts
- ui.ts
- staff/page.tsx
- apply-migrations.sh
- cycle/page.tsx
- tax-codes.ts
- copy-opencv.mjs
- worksheet/page.tsx
- @supabase/supabase-js
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- ledger-lock.test.ts
- LinkButton
- post-button.tsx
- checkbox.tsx
- safeguards-load.ts
- register-books.test.ts
- requireOwner
- workpapers/load.ts
- binder/page.tsx
- batch-upload.test.ts
- documents/labels.ts
- sidebar-toggle.tsx
- sign-off-actions.tsx
- ledger.test.ts
- vitest
- sign-in-form.tsx
- proxy.ts
- showMonth
- FormModule
- fees.test.ts
- eslint.config.mjs
- review-form.tsx
- statement-view.tsx
- ref_node_fs
- package.json
- any-cutoff.test.ts
- supabaseServer
- generate-filings/route.ts
- BoardUI page patterns
- index.ts
- register/page.tsx
- Rework: one flow from lead to year-end
- workpapers.test.ts
- invoice-pages.tsx
- app/documents/page.tsx
- books-migration.test.ts
- tests/books.test.ts
- month-complete.test.ts
- pg

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 254 edges
2. `Skeleton()` - 197 edges
3. `react` - 195 edges
4. `Notice()` - 190 edges
5. `cx` - 175 edges
6. `Button()` - 168 edges
7. `next` - 151 edges
8. `Card()` - 146 edges
9. `Badge()` - 145 edges
10. `Input()` - 124 edges

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

## Communities (165 total, 22 thin omitted)

### Community 0 - "Skeleton"
Cohesion: 0.08
Nodes (34): react, BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), InvoiceEdit(), JournalEntryRoute(), JournalRoute(), PaymentsNewPage() (+26 more)

### Community 1 - "addDays"
Cohesion: 0.09
Nodes (46): Rule, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), toIso() (+38 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.16
Nodes (17): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+9 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, tsx@^4.23.15, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

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

### Community 11 - "formatAmount"
Cohesion: 0.15
Nodes (46): booksContext(), BooksContext, fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList() (+38 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (31): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+23 more)

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
Nodes (37): defaultCashFlow(), loadStatements(), FsLine, FsLineKey, isFsLine(), Section, Statement, add() (+29 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.12
Nodes (45): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), buildSawt(), incomePayment() (+37 more)

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
Cohesion: 0.14
Nodes (25): file(), GET(), safe(), buildEmployeeTemplate(), sortItems(), checkRegister(), fmt(), ID_HEADERS (+17 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (27): ClientRow, order, PartCell(), ScoredClient, Scores(), ScoresPage(), Trend(), ClientMonth (+19 more)

### Community 42 - "income.ts"
Cohesion: 0.11
Nodes (45): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+37 more)

### Community 43 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (29): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+21 more)

### Community 44 - "app/requests/page.tsx"
Cohesion: 0.15
Nodes (20): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey, Requests(), RequestsPage() (+12 more)

### Community 45 - "ocr/run.ts"
Cohesion: 0.20
Nodes (17): normalizeTin(), ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, lookupParties(), fillFromDirectory(), blank() (+9 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (64): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+56 more)

### Community 47 - "Centavos"
Cohesion: 0.08
Nodes (49): GridRow, AlphaCols, AlphalistRow, Certificates2316, form2316(), Form2316Data, Form2316Employer, Form2316Line (+41 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.08
Nodes (36): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+28 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "percentage.ts"
Cohesion: 0.21
Nodes (25): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+17 more)

### Community 51 - "approval-memo.tsx"
Cohesion: 0.20
Nodes (10): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, approvalMemo(), Memo, MemoInput (+2 more)

### Community 52 - "steps.ts"
Cohesion: 0.13
Nodes (24): Agency, birForm(), BranchOptions, CaseStep, ClosureOptions, dayNumber(), daysBetween(), daysOpen() (+16 more)

### Community 53 - "registrations/page.tsx"
Cohesion: 0.21
Nodes (18): StepRow, YearRenewalsForm(), RegistrationList(), RegistrationsPage(), Row, CaseRow, clientStatus, fmt() (+10 more)

### Community 54 - "payroll/data.ts"
Cohesion: 0.14
Nodes (31): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), PriorEmployerForm(), check(), GET() (+23 more)

### Community 55 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 56 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 57 - "@remixicon/react"
Cohesion: 0.36
Nodes (9): @remixicon/react, RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), Thread(), ThreadMessage (+1 more)

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (48): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), EwtLine (+40 more)

### Community 59 - "acting-approver/page.tsx"
Cohesion: 0.20
Nodes (20): ActingState, appointActingAction(), endActingAction(), refresh(), AppointForm(), EndButton(), Acting(), ActingApproverPage() (+12 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.18
Nodes (19): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote, SettingsPage() (+11 more)

### Community 61 - "ledger/data.ts"
Cohesion: 0.11
Nodes (27): CASH_FLOW_CLASSES, CashFlowClass, codes, PNL, accountFromRow(), Amendment, BooksClient, BooksMonth (+19 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.15
Nodes (25): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+17 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "cx"
Cohesion: 0.06
Nodes (48): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+40 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.11
Nodes (34): FinancialStatements, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist() (+26 more)

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
Cohesion: 0.15
Nodes (41): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+33 more)

### Community 72 - "documents/[id]/page.tsx"
Cohesion: 0.23
Nodes (12): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), PayrollIntake(), ReviewForm(), pendingDocumentTaxCodes() (+4 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.17
Nodes (16): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES (+8 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "registrations/[id]/page.tsx"
Cohesion: 0.42
Nodes (8): CompleteButton(), StepBadge(), StepForm(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell()

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.06
Nodes (56): EstimatedProfile, estimateProfile(), gapFor(), GapRow, has(), lastWholeMonths(), items, PRICES (+48 more)

### Community 80 - "filings/actions.ts"
Cohesion: 0.20
Nodes (16): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+8 more)

### Community 81 - "Button"
Cohesion: 0.10
Nodes (49): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+41 more)

### Community 82 - "Card"
Cohesion: 0.07
Nodes (59): DocReviewActions(), DocumentsCard(), when(), Client, CollectionsPage(), OpenDue, Overview(), RunBilling() (+51 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (27): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+19 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.09
Nodes (48): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+40 more)

### Community 87 - "statements/page.tsx"
Cohesion: 0.16
Nodes (20): ReleaseReportForm(), WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report() (+12 more)

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
Cohesion: 0.19
Nodes (15): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+7 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 93 - "profile.ts"
Cohesion: 0.06
Nodes (53): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+45 more)

### Community 94 - "toCentavos"
Cohesion: 0.14
Nodes (22): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+14 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "auth.ts"
Cohesion: 0.16
Nodes (18): DashboardStats(), GET(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+10 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.07
Nodes (50): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+42 more)

### Community 101 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (26): ConvertForm(), LostForm(), Lead(), LeadPage(), TYPE_LABEL, AcceptForm(), acceptProposalAction(), AcceptState (+18 more)

### Community 102 - "items.ts"
Cohesion: 0.12
Nodes (23): release2316Action(), ItemForm(), PayrollSettingsForm(), Release2316Form(), PayrollSetupPage(), Setup(), yearWorksheet(), PayrollYear() (+15 more)

### Community 103 - "PageHeader"
Cohesion: 0.11
Nodes (38): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+30 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "Textarea"
Cohesion: 0.25
Nodes (16): NewRequestForm(), TicketForm(), ReplyForm(), send(), Textarea(), getIdentity(), shrinkImage(), closeRequestAction() (+8 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.09
Nodes (42): PartyFormState, setPartyVerifiedAction(), MergeForm(), PartyForm(), PresetAccountForm(), VerifyButton(), fmtDate(), PartyDetail() (+34 more)

### Community 109 - "seed-sql.ts"
Cohesion: 0.60
Nodes (3): seedHolidays, buildSeedSql(), q()

### Community 110 - "Notice"
Cohesion: 0.06
Nodes (82): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+74 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 113 - "clients/[id]/page.tsx"
Cohesion: 0.06
Nodes (67): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction() (+59 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "ui.ts"
Cohesion: 0.08
Nodes (46): blankLine(), InvoiceForm(), InvoiceFormValue, BooksSummaryPage(), Summary(), SummaryCard(), fmt(), OpenInvoice (+38 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.27
Nodes (9): roleLabel, StaffList(), StaffPage(), clientUserSchema, email, inviteStaffSchema, loadPoints(), name (+1 more)

### Community 118 - "cycle/page.tsx"
Cohesion: 0.17
Nodes (22): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CloseCycleButton(), DecideExceptionForm(), Message() (+14 more)

### Community 119 - "tax-codes.ts"
Cohesion: 0.20
Nodes (14): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+6 more)

### Community 120 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 121 - "worksheet/page.tsx"
Cohesion: 0.08
Nodes (40): recomputeWorksheetAction(), WorksheetState, WorksheetInputsForm(), Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+32 more)

### Community 122 - "@supabase/supabase-js"
Cohesion: 0.14
Nodes (22): @supabase/supabase-js, Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), Row (+14 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (47): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), BatchUpload(), PreviewTable(), Batch() (+39 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.11
Nodes (17): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue(), ACTION_LABEL, availableActions(), FilingState (+9 more)

### Community 127 - "LinkButton"
Cohesion: 0.21
Nodes (16): EntryForm(), NewEntry(), NewEntryPage(), MonthSelect(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page() (+8 more)

### Community 128 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "safeguards-load.ts"
Cohesion: 0.08
Nodes (50): ClientValues, EngagementRow, TaxpayerType, TaxType, CoverageClient, coverageGaps(), Gap, GapKind (+42 more)

### Community 131 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 132 - "requireOwner"
Cohesion: 0.17
Nodes (19): generateFilingsNow(), GenerateState, GenerateButton(), FirmPage(), PLACES, Places(), convertLeadAction(), LeadState (+11 more)

### Community 133 - "workpapers/load.ts"
Cohesion: 0.17
Nodes (19): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote (+11 more)

### Community 134 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 136 - "documents/labels.ts"
Cohesion: 0.08
Nodes (37): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+29 more)

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
Cohesion: 0.09
Nodes (9): vitest, root, root, as(), books(), root, root, root (+1 more)

### Community 141 - "sign-in-form.tsx"
Cohesion: 0.17
Nodes (17): code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode(), errors, Form() (+9 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "showMonth"
Cohesion: 0.10
Nodes (35): PortalClient, portalContext(), MonthComplete(), SentRow, TimelineRow, Home(), KINDS, manilaDay() (+27 more)

### Community 144 - "FormModule"
Cohesion: 0.12
Nodes (13): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, PAYROLL_FORMS (+5 more)

### Community 147 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 148 - "review-form.tsx"
Cohesion: 0.07
Nodes (47): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), DirectoryParty (+39 more)

### Community 149 - "statement-view.tsx"
Cohesion: 0.15
Nodes (20): Detail(), PayNow(), METHODS, ProofUpload(), send(), proofBadge, proofMethod, statusBadge (+12 more)

### Community 150 - "ref_node_fs"
Cohesion: 0.12
Nodes (5): ctx, input, root, root, root

### Community 152 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 154 - "any-cutoff.test.ts"
Cohesion: 0.50
Nodes (3): as(), client(), root

### Community 156 - "supabaseServer"
Cohesion: 0.07
Nodes (41): nextConfig, next, server-only, zod, GET(), Detail(), StatementPage(), accountSchema (+33 more)

### Community 157 - "generate-filings/route.ts"
Cohesion: 0.18
Nodes (14): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+6 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 159 - "index.ts"
Cohesion: 0.09
Nodes (17): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+9 more)

### Community 160 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.15
Nodes (12): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+4 more)

### Community 162 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 163 - "invoice-pages.tsx"
Cohesion: 0.09
Nodes (29): INVOICE_KINDS, Kind, Props, STATUS_TONE, BooksLockBarSlot(), AllocationRow, InvoiceLineRow, InvoiceRow (+21 more)

### Community 164 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (27): ClientSelect(), PeriodFilter(), Booking, ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths() (+19 more)

### Community 167 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 168 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 170 - "pg"
Cohesion: 0.11
Nodes (5): pg, root, root, root, root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1116 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `post-button.tsx`, `Skeleton`, `requireOwner`, `binder/page.tsx`, `documents/labels.ts`, `sidebar-toggle.tsx`, `sign-off-actions.tsx`, `formatAmount`, `onboarding/page.tsx`, `sign-in-form.tsx`, `dependencies`, `showMonth`, `proxy.ts`, `review-form.tsx`, `statement-view.tsx`, `package.json`, `generate-filings/route.ts`, `register/page.tsx`, `invoice-pages.tsx`, `app/documents/page.tsx`, `register-xlsx.ts`, `scores/page.tsx`, `app/requests/page.tsx`, `payroll/forms.tsx`, `lib/books/actions.ts`, `approval-memo.tsx`, `registrations/page.tsx`, `payroll/data.ts`, `settings/actions.ts`, `@remixicon/react`, `acting-approver/page.tsx`, `app/settings/page.tsx`, `ledger/data.ts`, `workpapers/page.tsx`, `cx`, `books/forms.tsx`, `documents/[id]/page.tsx`, `opening-checklist.tsx`, `registrations/[id]/page.tsx`, `theme-toggle.tsx`, `filings/actions.ts`, `Button`, `Card`, `[clientId]/page.tsx`, `statements/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `profile.ts`, `auth.ts`, `print/page.tsx`, `leads/[id]/page.tsx`, `items.ts`, `PageHeader`, `Textarea`, `parties/[id]/page.tsx`, `Notice`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `ui.ts`, `cycle/page.tsx`, `worksheet/page.tsx`, `@supabase/supabase-js`, `batch/register.ts`, `LinkButton`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Skeleton` be split into smaller, more focused modules?**
  _Cohesion score 0.08361581920903954 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `addDays`, `safeguards-load.ts`, `register-books.test.ts`, `arap.ts`, `devDependencies`, `gemini.ts`, `batch-upload.test.ts`, `ledger.test.ts`, `onboarding/page.tsx`, `sign-in-form.tsx`, `showMonth`, `statements.ts`, `fees.test.ts`, `review-form.tsx`, `ref_node_fs`, `package.json`, `any-cutoff.test.ts`, `generate-filings/route.ts`, `index.ts`, `register/page.tsx`, `workpapers.test.ts`, `invoice-pages.tsx`, `app/documents/page.tsx`, `books-migration.test.ts`, `tests/books.test.ts`, `scores/page.tsx`, `month-complete.test.ts`, `payroll/payroll.test.ts`, `app/requests/page.tsx`, `pg`, `payroll/forms.tsx`, `Centavos`, `lib/books/actions.ts`, `approval-memo.tsx`, `steps.ts`, `settings/actions.ts`, `money.ts`, `acting-approver/page.tsx`, `app/settings/page.tsx`, `ledger/data.ts`, `fixed-assets.test.ts`, `testing.ts`, `funnel.test.ts`, `documents/[id]/page.tsx`, `opening-checklist.tsx`, `quote.ts`, `filings/actions.ts`, `[clientId]/page.tsx`, `document-scanner.tsx`, `profile.ts`, `toCentavos`, `tieouts.test.ts`, `print/page.tsx`, `leads/[id]/page.tsx`, `rates.ts`, `parties/[id]/page.tsx`, `db.test.ts`, `Notice`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `acting-approver.test.ts`, `ui.ts`, `staff/page.tsx`, `cycle/page.tsx`, `tax-codes.ts`, `worksheet/page.tsx`, `@supabase/supabase-js`, `batch/register.ts`, `sign-off.ts`, `ledger-lock.test.ts`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `addDays` be split into smaller, more focused modules?**
  _Cohesion score 0.09292929292929293 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `post-button.tsx`, `checkbox.tsx`, `notification.tsx`, `requireOwner`, `binder/page.tsx`, `documents/labels.ts`, `sidebar-toggle.tsx`, `sign-off-actions.tsx`, `formatAmount`, `onboarding/page.tsx`, `sign-in-form.tsx`, `dependencies`, `showMonth`, `statements.ts`, `review-form.tsx`, `statement-view.tsx`, `package.json`, `supabaseServer`, `register/page.tsx`, `invoice-pages.tsx`, `app/documents/page.tsx`, `scores/page.tsx`, `app/requests/page.tsx`, `payroll/forms.tsx`, `lib/books/actions.ts`, `registrations/page.tsx`, `payroll/data.ts`, `social-button.tsx`, `@remixicon/react`, `acting-approver/page.tsx`, `app/settings/page.tsx`, `workpapers/page.tsx`, `tabs.tsx`, `cx`, `file-upload.tsx`, `books/forms.tsx`, `documents/[id]/page.tsx`, `stat-cards.tsx`, `registrations/[id]/page.tsx`, `theme-toggle.tsx`, `Button`, `Card`, `button.tsx`, `cx.ts`, `[clientId]/page.tsx`, `statements/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `profile.ts`, `auth.ts`, `print/page.tsx`, `leads/[id]/page.tsx`, `items.ts`, `PageHeader`, `Textarea`, `parties/[id]/page.tsx`, `Notice`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `ui.ts`, `staff/page.tsx`, `cycle/page.tsx`, `worksheet/page.tsx`, `@supabase/supabase-js`, `batch/register.ts`, `LinkButton`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._