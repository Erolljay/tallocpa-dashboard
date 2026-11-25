# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 692 files · ~546,507 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 4329 nodes · 14909 edges · 186 communities (164 shown, 22 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 123 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `c0fa0d6d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- manilaToday
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
- settlement-pages.tsx
- social-button.tsx
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- profile.ts
- workpapers/load.ts
- deadlines/page.tsx
- month.ts
- lock-bar.tsx
- Centavos
- year.ts
- Skeleton
- money.ts
- Notice
- payment-forms.tsx
- fees/[id]/page.tsx
- registrations/forms.tsx
- workpapers/page.tsx
- cx
- select.tsx
- Apple Design
- items.ts
- returns/books.test.ts
- party-pages.tsx
- brand/actions.ts
- books/forms.tsx
- formatAmount
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- getIdentity
- theme-toggle.tsx
- fees/types.ts
- parts.ts
- clients/[id]/page.tsx
- sign-off.ts
- button.tsx
- Pro components
- cx.ts
- funnel.test.ts
- formatAmount
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
- staff/actions.ts
- boardui
- rates.ts
- proof-actions.ts
- parties/[id]/page.tsx
- alphalist.ts
- Card
- steps.ts
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- portal/page.tsx
- acting-approver.test.ts
- ledger/data.ts
- staff/page.tsx
- apply-migrations.sh
- portal/page.tsx
- module-pages.tsx
- review/page.tsx
- returns/load.ts
- 2316/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- app/app/page.tsx
- file-upload.tsx
- cycle/page.tsx
- pending-review.tsx
- checkbox.tsx
- server-only
- documents/labels.ts
- tieouts.test.ts
- review-form.tsx
- work/page.tsx
- @remixicon/react
- app/documents/page.tsx
- gemini.ts
- Textarea
- ledger.test.ts
- vitest
- settings/actions.ts
- proxy.ts
- auth.ts
- requireOwner
- generate-qap-fixture.mjs
- upload/page.tsx
- db.test.ts
- @remixicon/react
- worksheet/page.tsx
- leads/[id]/page.tsx
- manilaToday
- safeguards.ts
- register/page.tsx
- leads-pipeline.test.ts
- staff/actions.ts
- requireOwner
- supabaseServer
- BoardUI page patterns
- any-cutoff.test.ts
- payroll/register.ts
- Rework: one flow from lead to year-end
- books-migration.test.ts
- invoice-pages.tsx
- leads/actions.ts
- tests/books.test.ts
- FormModule
- @supabase/supabase-js
- ref_node_fs
- leads/actions.ts
- app/settings/page.tsx
- cycle/actions.ts
- portal/layout.tsx
- requests/actions.ts
- [id]/forms.tsx
- books-ready.ts
- seed.ts
- @remixicon/react
- Building UIs with BoardUI
- staff/forms.tsx
- names.ts
- fees.test.ts
- fixed-assets.test.ts
- ledger-closing.test.ts
- ledger-documents.test.ts
- books-list.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 286 edges
2. `Skeleton()` - 204 edges
3. `react` - 204 edges
4. `cx` - 203 edges
5. `Notice()` - 199 edges
6. `Button()` - 183 edges
7. `next` - 163 edges
8. `Card()` - 161 edges
9. `Badge()` - 152 edges
10. `Input()` - 130 edges

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

## Communities (186 total, 22 thin omitted)

### Community 0 - "manilaToday"
Cohesion: 0.11
Nodes (27): react, MonthSelect(), PaymentsNewPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), ReceiptsViewPage() (+19 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.11
Nodes (36): Rule, compareIso(), IsoDate, DeadlineRule, DueRule, EfpsGroup, FilingChannel, FilingInstance (+28 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "gemini.ts"
Cohesion: 0.11
Nodes (17): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, ocrOutputSchema, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL (+9 more)

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
Cohesion: 0.14
Nodes (34): SectionTabs(), completeRegistrationAction(), CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt() (+26 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (31): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), send() (+23 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+8 more)

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
Cohesion: 0.11
Nodes (54): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments(), Periods (+46 more)

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
Cohesion: 0.37
Nodes (11): file(), GET(), safe(), yearWorksheet(), GET(), employeesForMonth(), buildEmployeeTemplate(), buildRegisterTemplate() (+3 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (31): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+23 more)

### Community 42 - "income.ts"
Cohesion: 0.11
Nodes (53): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+45 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.12
Nodes (21): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EmployeeImportRow, readEmployeeFile(), reasonChoices (+13 more)

### Community 44 - "settlement-pages.tsx"
Cohesion: 0.10
Nodes (32): blankLine(), InvoiceForm(), InvoiceFormValue, fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, SelectItem() (+24 more)

### Community 45 - "social-button.tsx"
Cohesion: 0.08
Nodes (18): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+10 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.13
Nodes (40): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+32 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (32): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+24 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.11
Nodes (36): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+28 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.12
Nodes (28): amt(), ApprovalMemo(), Db, TIE, RegisterLine, Adjustment, c(), loadPeriodFile() (+20 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.15
Nodes (27): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+19 more)

### Community 53 - "month.ts"
Cohesion: 0.29
Nodes (9): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+1 more)

### Community 54 - "lock-bar.tsx"
Cohesion: 0.14
Nodes (26): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+18 more)

### Community 55 - "Centavos"
Cohesion: 0.13
Nodes (19): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), NewEmployeeRow, BookIncome, INCOME_GROUPS (+11 more)

### Community 56 - "year.ts"
Cohesion: 0.09
Nodes (47): GridRow, buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+39 more)

### Community 57 - "Skeleton"
Cohesion: 0.10
Nodes (22): BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), JournalRoute(), PaymentsListPage(), PayslipsRoute(), PurchaseInvoicesListPage(), ReceiptsListPage() (+14 more)

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (53): lookupAtc(), client, INPUTS, MONTH, PAYSLIP_COLUMNS, payslipCsv(), payslipSchedule(), agentBackground() (+45 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (67): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+59 more)

### Community 60 - "payment-forms.tsx"
Cohesion: 0.26
Nodes (15): accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+7 more)

### Community 61 - "fees/[id]/page.tsx"
Cohesion: 0.15
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 62 - "registrations/forms.tsx"
Cohesion: 0.13
Nodes (30): cancelRegistrationAction(), ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+22 more)

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.15
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

### Community 64 - "cx"
Cohesion: 0.07
Nodes (29): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+21 more)

### Community 65 - "select.tsx"
Cohesion: 0.06
Nodes (49): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+41 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "items.ts"
Cohesion: 0.18
Nodes (14): PayrollSetupPage(), Setup(), loadPayrollSettings(), BirCategory, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS (+6 more)

### Community 68 - "returns/books.test.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "party-pages.tsx"
Cohesion: 0.17
Nodes (17): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+9 more)

### Community 70 - "brand/actions.ts"
Cohesion: 0.17
Nodes (14): DeadlinesPage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, TabKey, Queue(), ReviewPage() (+6 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (36): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+28 more)

### Community 72 - "formatAmount"
Cohesion: 0.17
Nodes (37): booksContext(), BooksContext, fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList() (+29 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.12
Nodes (24): Access, STATUS, codes, PNL, Cutoff, cutoffOf(), TbRowOut, ChecklistInput (+16 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (37): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+29 more)

### Community 77 - "getIdentity"
Cohesion: 0.16
Nodes (25): RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, portalContext(), Payroll(), PortalPayroll() (+17 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "fees/types.ts"
Cohesion: 0.08
Nodes (44): count(), first(), pick(), profileFromQuery(), items, buildQuote(), cents(), CustomQuoteItem (+36 more)

### Community 80 - "parts.ts"
Cohesion: 0.12
Nodes (20): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, one() (+12 more)

### Community 81 - "clients/[id]/page.tsx"
Cohesion: 0.06
Nodes (54): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setClientStatusAction(), setIncomeTaxMethodAction(), setupMissingChartsAction() (+46 more)

### Community 82 - "sign-off.ts"
Cohesion: 0.18
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+9 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 86 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 87 - "formatAmount"
Cohesion: 0.15
Nodes (20): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+12 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (27): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.09
Nodes (31): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+23 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "public.ts"
Cohesion: 0.10
Nodes (23): SERVICES, StartState, QuerySource, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+15 more)

### Community 94 - "ledger/types.ts"
Cohesion: 0.14
Nodes (19): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.22
Nodes (18): EmployeeDetail(), EmployeePage(), loadPriorEmployers(), payAccountsOf(), PayrollSettings, loadPayrollContext(), Row, cents() (+10 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (48): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+40 more)

### Community 101 - "leads/[id]/page.tsx"
Cohesion: 0.16
Nodes (18): metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage(), Lockup(), Mark() (+10 more)

### Community 102 - "[month]/page.tsx"
Cohesion: 0.13
Nodes (24): MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p() (+16 more)

### Community 103 - "staff/actions.ts"
Cohesion: 0.20
Nodes (13): addClientUserAction(), fieldErrors(), updateStaffAction(), roleLabel, StaffList(), StaffPage(), ensureLogin(), clientUserSchema (+5 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.16
Nodes (24): applyRate(), basisPoints(), grossUp(), grouped, roundHalfAway(), sum(), AmountRate, CorporateRate (+16 more)

### Community 106 - "proof-actions.ts"
Cohesion: 0.21
Nodes (13): send(), amount, date, ProofState, refresh(), rejectProofAction(), StartProof, startProofUpload() (+5 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.05
Nodes (74): server-only, GET(), fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), VerifyButton(), fmtDate() (+66 more)

### Community 108 - "alphalist.ts"
Cohesion: 0.14
Nodes (25): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+17 more)

### Community 109 - "Card"
Cohesion: 0.11
Nodes (33): Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS, NewEntry() (+25 more)

### Community 110 - "steps.ts"
Cohesion: 0.08
Nodes (26): TAXPAYER_TYPES, branchSchema, checkbox, closureSchema, newRegistrationSchema, renewalSchema, stepUpdateSchema, updateSchema (+18 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (28): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+20 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (36): PortalClient, BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents() (+28 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "ledger/data.ts"
Cohesion: 0.12
Nodes (28): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), OpeningChecklist(), AMENDMENT_BADGE (+20 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.38
Nodes (9): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, grossSales() (+1 more)

### Community 118 - "portal/page.tsx"
Cohesion: 0.19
Nodes (17): dateFmt, loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm() (+9 more)

### Community 119 - "module-pages.tsx"
Cohesion: 0.20
Nodes (14): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+6 more)

### Community 120 - "review/page.tsx"
Cohesion: 0.17
Nodes (26): FilingListRow, FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+18 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.08
Nodes (51): FinancialStatements, ATC_MASTER, AtcInfo, normalizeAtc(), row(), withNonDeductible(), SawtResult, Split (+43 more)

### Community 122 - "2316/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "app/app/page.tsx"
Cohesion: 0.07
Nodes (41): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), FilingRow, Returns(), bookKind, BookRow (+33 more)

### Community 126 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.20
Nodes (16): Cycle(), CyclePage(), CycleWithClient, DocRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+8 more)

### Community 128 - "pending-review.tsx"
Cohesion: 0.13
Nodes (21): BulkState, Booking, BookingFields(), BooksChoices(), Codes, initialCodes(), ocrKeys(), PendingReview() (+13 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "server-only"
Cohesion: 0.08
Nodes (52): RFC-2047, RFC-2822, GET(), Filing(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload() (+44 more)

### Community 131 - "documents/labels.ts"
Cohesion: 0.12
Nodes (25): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+17 more)

### Community 132 - "tieouts.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 133 - "review-form.tsx"
Cohesion: 0.09
Nodes (38): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DirectoryParty, ENTRY_STATUS (+30 more)

### Community 134 - "work/page.tsx"
Cohesion: 0.15
Nodes (21): Action(), MyWork(), MyWorkPage(), short(), TONE, holidaySet(), loadBoard(), lastMonth() (+13 more)

### Community 135 - "@remixicon/react"
Cohesion: 0.14
Nodes (26): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), credit(), ItemList(), PaymentsList() (+18 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.11
Nodes (32): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ApprovedTable(), BOOKED_TYPES (+24 more)

### Community 137 - "gemini.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "Textarea"
Cohesion: 0.12
Nodes (22): ClientNoteForm(), SignOffState, AmendFilingForm(), checkTone, checkWord, needsNote(), noteLabel(), noteRequired() (+14 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.06
Nodes (12): pg, vitest, root, root, root, root, root, root (+4 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "auth.ts"
Cohesion: 0.25
Nodes (7): generateFilingsNow(), GenerateState, GenerateButton(), Identity, IdentityRow, StaffRole, runFilingGeneration()

### Community 144 - "requireOwner"
Cohesion: 0.22
Nodes (20): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), peso, recordDepositAction() (+12 more)

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "upload/page.tsx"
Cohesion: 0.20
Nodes (17): shift(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), addMonths(), isWeekend() (+9 more)

### Community 148 - "@remixicon/react"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 149 - "worksheet/page.tsx"
Cohesion: 0.39
Nodes (8): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage()

### Community 150 - "leads/[id]/page.tsx"
Cohesion: 0.13
Nodes (23): NotesCard(), ReopenForm(), Lead(), LeadPage(), Person, ICON, NotesTimeline(), when (+15 more)

### Community 151 - "manilaToday"
Cohesion: 0.09
Nodes (50): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+42 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.08
Nodes (44): GET(), ClientValues, TaxpayerType, TaxType, CoverageClient, coverageGaps(), Gap, GapKind (+36 more)

### Community 153 - "register/page.tsx"
Cohesion: 0.24
Nodes (17): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+9 more)

### Community 154 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 157 - "supabaseServer"
Cohesion: 0.06
Nodes (44): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), markCwtFollowedUpAction() (+36 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 159 - "any-cutoff.test.ts"
Cohesion: 0.50
Nodes (3): as(), client(), root

### Community 160 - "payroll/register.ts"
Cohesion: 0.11
Nodes (31): exceljs, monthlyTable(), monthlyWithholding(), EMPLOYEE_SHEET, PayrollItem, employee(), entry(), fixtureContext() (+23 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 163 - "invoice-pages.tsx"
Cohesion: 0.11
Nodes (25): INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, SettingsPage(), PurchaseInvoicesEditPage() (+17 more)

### Community 164 - "leads/actions.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 165 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 166 - "FormModule"
Cohesion: 0.14
Nodes (12): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, form1601C (+4 more)

### Community 167 - "@supabase/supabase-js"
Cohesion: 0.24
Nodes (14): @supabase/supabase-js@^2.119.2, @supabase/supabase-js, DocumentUpload(), send(), upload(), Item, typeFromName(), ReplyForm() (+6 more)

### Community 168 - "ref_node_fs"
Cohesion: 0.12
Nodes (5): ctx, input, root, root, root

### Community 169 - "leads/actions.ts"
Cohesion: 0.32
Nodes (15): PLACES, assignReviewerAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+7 more)

### Community 170 - "app/settings/page.tsx"
Cohesion: 0.24
Nodes (12): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote, describeDue(), FREQUENCY_SECTIONS (+4 more)

### Community 171 - "cycle/actions.ts"
Cohesion: 0.25
Nodes (13): MonthComplete(), SentRow, TimelineRow, closeCycleAction(), confirmMonthAction(), CycleState, decideExceptionAction(), nothingToSubmitAction() (+5 more)

### Community 172 - "portal/layout.tsx"
Cohesion: 0.27
Nodes (10): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+2 more)

### Community 173 - "requests/actions.ts"
Cohesion: 0.27
Nodes (10): zod@^4.6.7, zod, closeRequestAction(), createRequestAction(), openTicketAction(), refresh(), requestSchema, text() (+2 more)

### Community 174 - "[id]/forms.tsx"
Cohesion: 0.33
Nodes (10): removeAssignmentAction(), StaffOptions(), AssignForm(), ClientUserForm(), IncomeTaxMethodForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton() (+2 more)

### Community 175 - "books-ready.ts"
Cohesion: 0.35
Nodes (8): filingsBooksReady(), BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked(), booksReadyMap(), keepBooksReady()

### Community 176 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 177 - "@remixicon/react"
Cohesion: 0.31
Nodes (7): @remixicon/react@^4.9.0, @remixicon/react, Detail(), PayNow(), METHODS, PayAccount, ProofMethod

### Community 178 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 179 - "staff/forms.tsx"
Cohesion: 0.43
Nodes (6): FormState, inviteStaffAction(), BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm()

### Community 180 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 182 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 183 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 185 - "books-list.tsx"
Cohesion: 0.50
Nodes (3): Column, ListRow, RowLink()

## Knowledge Gaps
- **20 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1185 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `manilaToday` to `notification.tsx`, `package.json`, `registrations/[id]/page.tsx`, `onboarding/page.tsx`, `dependencies`, `statements.ts`, `scores/page.tsx`, `settlement-pages.tsx`, `payroll/forms.tsx`, `modal.tsx`, `profile.ts`, `deadlines/page.tsx`, `lock-bar.tsx`, `Skeleton`, `Notice`, `payment-forms.tsx`, `fees/[id]/page.tsx`, `registrations/forms.tsx`, `workpapers/page.tsx`, `cx`, `select.tsx`, `items.ts`, `party-pages.tsx`, `brand/actions.ts`, `books/forms.tsx`, `formatAmount`, `stat-cards.tsx`, `getIdentity`, `theme-toggle.tsx`, `clients/[id]/page.tsx`, `button.tsx`, `cx.ts`, `formatAmount`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `payroll/data.ts`, `social-button.tsx`, `print/page.tsx`, `leads/[id]/page.tsx`, `[month]/page.tsx`, `staff/actions.ts`, `parties/[id]/page.tsx`, `Card`, `fixed-assets/page.tsx`, `portal/page.tsx`, `ledger/data.ts`, `staff/page.tsx`, `portal/page.tsx`, `review/page.tsx`, `2316/page.tsx`, `batch/register.ts`, `app/app/page.tsx`, `file-upload.tsx`, `cycle/page.tsx`, `pending-review.tsx`, `checkbox.tsx`, `server-only`, `documents/labels.ts`, `review-form.tsx`, `work/page.tsx`, `@remixicon/react`, `app/documents/page.tsx`, `Textarea`, `auth.ts`, `upload/page.tsx`, `worksheet/page.tsx`, `leads/[id]/page.tsx`, `manilaToday`, `register/page.tsx`, `supabaseServer`, `invoice-pages.tsx`, `@supabase/supabase-js`, `leads/actions.ts`, `app/settings/page.tsx`, `cycle/actions.ts`, `portal/layout.tsx`, `[id]/forms.tsx`, `@remixicon/react`, `staff/forms.tsx`, `books-list.tsx`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `manilaToday` be split into smaller, more focused modules?**
  _Cohesion score 0.11095305832147938 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `manilaToday`, `pending-review.tsx`, `server-only`, `documents/labels.ts`, `package.json`, `review-form.tsx`, `work/page.tsx`, `app/documents/page.tsx`, `@remixicon/react`, `Textarea`, `registrations/[id]/page.tsx`, `onboarding/page.tsx`, `settings/actions.ts`, `dependencies`, `requireOwner`, `auth.ts`, `upload/page.tsx`, `proxy.ts`, `worksheet/page.tsx`, `leads/[id]/page.tsx`, `manilaToday`, `safeguards.ts`, `register/page.tsx`, `invoice-pages.tsx`, `@supabase/supabase-js`, `payroll/export/route.ts`, `leads/actions.ts`, `scores/page.tsx`, `app/settings/page.tsx`, `cycle/actions.ts`, `portal/layout.tsx`, `payroll/forms.tsx`, `requests/actions.ts`, `lib/books/actions.ts`, `@remixicon/react`, `profile.ts`, `workpapers/load.ts`, `deadlines/page.tsx`, `lock-bar.tsx`, `books-list.tsx`, `Skeleton`, `payment-forms.tsx`, `fees/[id]/page.tsx`, `registrations/forms.tsx`, `workpapers/page.tsx`, `select.tsx`, `party-pages.tsx`, `brand/actions.ts`, `books/forms.tsx`, `formatAmount`, `opening-checklist.tsx`, `getIdentity`, `clients/[id]/page.tsx`, `sign-off.ts`, `formatAmount`, `app/app/layout.tsx`, `form-2316.tsx`, `payroll/data.ts`, `print/page.tsx`, `leads/[id]/page.tsx`, `[month]/page.tsx`, `staff/actions.ts`, `proof-actions.ts`, `parties/[id]/page.tsx`, `Card`, `fixed-assets/page.tsx`, `portal/page.tsx`, `ledger/data.ts`, `staff/page.tsx`, `portal/page.tsx`, `review/page.tsx`, `2316/page.tsx`, `batch/register.ts`, `app/app/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10909090909090909 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `filings/run.ts`, `arap.ts`, `package.json`, `gemini.ts`, `registrations/[id]/page.tsx`, `onboarding/page.tsx`, `statements.ts`, `scores/page.tsx`, `settlement-pages.tsx`, `social-button.tsx`, `profile.ts`, `workpapers/load.ts`, `deadlines/page.tsx`, `month.ts`, `lock-bar.tsx`, `year.ts`, `money.ts`, `fees/[id]/page.tsx`, `registrations/forms.tsx`, `returns/books.test.ts`, `party-pages.tsx`, `brand/actions.ts`, `opening-checklist.tsx`, `getIdentity`, `fees/types.ts`, `parts.ts`, `clients/[id]/page.tsx`, `sign-off.ts`, `funnel.test.ts`, `portal-billing.test.ts`, `document-scanner.tsx`, `public.ts`, `ledger/types.ts`, `print/page.tsx`, `[month]/page.tsx`, `staff/actions.ts`, `rates.ts`, `parties/[id]/page.tsx`, `fixed-assets/page.tsx`, `portal/page.tsx`, `acting-approver.test.ts`, `module-pages.tsx`, `review/page.tsx`, `returns/load.ts`, `batch/register.ts`, `app/app/page.tsx`, `cycle/page.tsx`, `pending-review.tsx`, `server-only`, `tieouts.test.ts`, `review-form.tsx`, `work/page.tsx`, `app/documents/page.tsx`, `gemini.ts`, `ledger.test.ts`, `settings/actions.ts`, `upload/page.tsx`, `db.test.ts`, `leads/[id]/page.tsx`, `manilaToday`, `safeguards.ts`, `leads-pipeline.test.ts`, `staff/actions.ts`, `requireOwner`, `supabaseServer`, `BoardUI page patterns`, `any-cutoff.test.ts`, `payroll/register.ts`, `books-migration.test.ts`, `invoice-pages.tsx`, `leads/actions.ts`, `tests/books.test.ts`, `ref_node_fs`, `app/settings/page.tsx`, `portal/layout.tsx`, `books-ready.ts`, `names.ts`, `fees.test.ts`, `fixed-assets.test.ts`, `ledger-closing.test.ts`, `ledger-documents.test.ts`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._