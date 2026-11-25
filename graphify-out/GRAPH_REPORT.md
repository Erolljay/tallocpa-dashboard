# Graph Report - agent-acceb1bc8d337a1b5  (2026-11-25)

## Corpus Check
- 682 files · ~535,622 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 6, (none) 5, .mdc 1)

## Summary
- 4269 nodes · 14673 edges · 166 communities (149 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 123 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `6761c41c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- start/page.tsx
- generate.ts
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- fields.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- registrations/forms.tsx
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
- [month]/page.tsx
- scores/page.tsx
- percentage.ts
- payroll/types.ts
- ui.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- profile.ts
- Centavos
- deadlines/page.tsx
- registrations/[id]/page.tsx
- manilaToday
- income.ts
- alphalist.ts
- react
- returns/types.ts
- Notice
- app/settings/page.tsx
- fees/[id]/page.tsx
- Textarea
- review-forms.tsx
- cx
- select.tsx
- Apple Design
- year.ts
- vitest
- fees/types.ts
- board.ts
- books/forms.tsx
- module-pages.tsx
- Rules
- Animation Performance
- ledger/types.ts
- stat-cards.tsx
- getIdentity
- theme-toggle.tsx
- quote.ts
- register/page.tsx
- clients/[id]/page.tsx
- sign-off.ts
- button.tsx
- Pro components
- cx.ts
- collections/forms.tsx
- statements/page.tsx
- portal-billing.test.ts
- input.tsx
- document-upload.tsx
- app/app/layout.tsx
- form-2316.tsx
- engine.ts
- opening.ts
- Recipes
- payroll/data.ts
- BoardUI page patterns
- Pro templates
- social-button.tsx
- print/page.tsx
- leads/[id]/page.tsx
- portal/payroll/actions.ts
- public.ts
- boardui
- rates.ts
- proof-actions.ts
- parties/[id]/page.tsx
- fees/schedule.ts
- formatAmount
- sidebar-toggle.tsx
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- money.ts
- acting-approver.test.ts
- tools/page.tsx
- quote/page.tsx
- apply-migrations.sh
- fees/data.ts
- tax-codes.ts
- review/page.tsx
- returns/load.ts
- Card
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- filings/[id]/page.tsx
- file-upload.tsx
- showMonth
- ledger/data.ts
- resolve.ts
- return-file-actions.ts
- documents/labels.ts
- register-books.test.ts
- review-form.tsx
- next-actions.ts
- next
- app/documents/page.tsx
- gemini.ts
- sign-off-actions.tsx
- ledger.test.ts
- ref_node_fs
- requireOwner
- proxy.ts
- morning.ts
- LinkButton
- batch/load.ts
- amountInput
- seed.ts
- proof-upload.tsx
- worksheet/page.tsx
- leads/forms.tsx
- [clientId]/page.tsx
- safeguards.ts
- batch/forms.tsx
- fees/forms.tsx
- xlsx.ts
- clients/schema.ts
- supabaseServer
- returns-sign-off.test.ts
- any-cutoff.test.ts
- payroll/payroll.test.ts
- Rework: one flow from lead to year-end
- books-migration.test.ts
- invoice-pages.tsx
- leads/actions.ts
- tests/books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 284 edges
2. `react` - 203 edges
3. `Skeleton()` - 202 edges
4. `Notice()` - 199 edges
5. `cx` - 196 edges
6. `Button()` - 180 edges
7. `next` - 161 edges
8. `Card()` - 157 edges
9. `Badge()` - 150 edges
10. `Input()` - 129 edges

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

## Communities (166 total, 17 thin omitted)

### Community 0 - "start/page.tsx"
Cohesion: 0.33
Nodes (8): requestQuoteAction(), php, StartForm(), metadata, Start(), StartPage(), funnelLive(), funnelOpen()

### Community 1 - "generate.ts"
Cohesion: 0.16
Nodes (20): Rule, IsoDate, DeadlineRule, DueRule, EfpsGroup, FilingChannel, Frequency, PeriodFilter (+12 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "fields.ts"
Cohesion: 0.07
Nodes (43): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), BatchRow (+35 more)

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

### Community 11 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (59): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+51 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.07
Nodes (45): ClientTab, ClientTabs(), UNDER, NotesCard(), addClientFile(), KINDS, OnboardingState, refresh() (+37 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (42): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, loadStatements(), FS_LINES, FsLine (+34 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.13
Nodes (41): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), buildSawt(), incomePayment() (+33 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "[month]/page.tsx"
Cohesion: 0.17
Nodes (29): saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), PayrollRuns() (+21 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "percentage.ts"
Cohesion: 0.20
Nodes (27): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), penalties(), quarterlyPayments(), compute1701Q() (+19 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "ui.ts"
Cohesion: 0.10
Nodes (32): BooksSummaryPage(), Summary(), SummaryCard(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, SettlementInput (+24 more)

### Community 45 - "index.ts"
Cohesion: 0.05
Nodes (24): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+16 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (55): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+47 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (39): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+31 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.06
Nodes (57): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+49 more)

### Community 51 - "Centavos"
Cohesion: 0.07
Nodes (52): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+44 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.11
Nodes (31): generateFilingsNow(), GenerateState, GenerateButton(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting() (+23 more)

### Community 53 - "registrations/[id]/page.tsx"
Cohesion: 0.13
Nodes (36): StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell(), RegistrationList() (+28 more)

### Community 54 - "manilaToday"
Cohesion: 0.13
Nodes (29): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+21 more)

### Community 55 - "income.ts"
Cohesion: 0.11
Nodes (39): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), reconciliation(), BookIncome, bookIncome() (+31 more)

### Community 56 - "alphalist.ts"
Cohesion: 0.14
Nodes (27): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+19 more)

### Community 57 - "react"
Cohesion: 0.10
Nodes (36): react, EmployeesRoute(), NewEntry(), NewEntryPage(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage() (+28 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (66): ATC_MASTER, AtcInfo, lookupAtc(), client, row(), form1601C, INPUTS, MONTH (+58 more)

### Community 59 - "Notice"
Cohesion: 0.13
Nodes (54): BatchUpload(), PreviewTable(), EntryForm(), ReleaseReportForm(), SetupForm(), OpeningAssetForm(), AssignForm(), ClientUserForm() (+46 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.15
Nodes (25): periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+17 more)

### Community 61 - "fees/[id]/page.tsx"
Cohesion: 0.19
Nodes (22): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+14 more)

### Community 62 - "Textarea"
Cohesion: 0.17
Nodes (13): NoteState, ClientNoteForm(), PayrollIntake(), SignOffState, AmendFilingForm(), ReplyForm(), Textarea(), ALLOWED (+5 more)

### Community 63 - "review-forms.tsx"
Cohesion: 0.23
Nodes (13): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), Msg() (+5 more)

### Community 64 - "cx"
Cohesion: 0.06
Nodes (40): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, InputOtp(), InputOtpProps, Kbd() (+32 more)

### Community 65 - "select.tsx"
Cohesion: 0.08
Nodes (37): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+29 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "year.ts"
Cohesion: 0.12
Nodes (28): GridRow, MonthGrid(), toInput(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+20 more)

### Community 68 - "vitest"
Cohesion: 0.13
Nodes (26): vitest, form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual (+18 more)

### Community 69 - "fees/types.ts"
Cohesion: 0.14
Nodes (23): EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), lastWholeMonths(), items (+15 more)

### Community 70 - "board.ts"
Cohesion: 0.13
Nodes (18): StepProgress(), Row, StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS (+10 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (42): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+34 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.12
Nodes (35): BankAccountsRoute(), booksContext(), BooksContext, fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList() (+27 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ledger/types.ts"
Cohesion: 0.12
Nodes (23): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Cutoff, cutoffOf(), TbRowOut, ChecklistInput (+15 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (38): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+30 more)

### Community 77 - "getIdentity"
Cohesion: 0.18
Nodes (22): RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), Thread() (+14 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.11
Nodes (27): react-dom@19.3.0, react-dom, applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle() (+19 more)

### Community 79 - "quote.ts"
Cohesion: 0.12
Nodes (25): PriceRow, buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos() (+17 more)

### Community 80 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 81 - "clients/[id]/page.tsx"
Cohesion: 0.08
Nodes (50): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+42 more)

### Community 82 - "sign-off.ts"
Cohesion: 0.18
Nodes (12): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, stepIndex(), client, owner, preparer (+4 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (28): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+20 more)

### Community 86 - "collections/forms.tsx"
Cohesion: 0.29
Nodes (11): AddChargeForm(), ApplyCreditButton(), BillingDaysForm(), OpenItem, PaymentAccount, ReasonAction(), RecordDepositForm(), Result() (+3 more)

### Community 87 - "statements/page.tsx"
Cohesion: 0.17
Nodes (19): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+11 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (29): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+21 more)

### Community 90 - "document-upload.tsx"
Cohesion: 0.12
Nodes (30): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, DocumentUpload(), send(), upload() (+22 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.17
Nodes (17): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+9 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 93 - "engine.ts"
Cohesion: 0.20
Nodes (19): compareIso(), isWeekend(), lastDayOfMonth(), FilingInstance, fiscalYearOf(), followsCalendarYear(), generateFilingInstances(), nextWorkingDay() (+11 more)

### Community 94 - "opening.ts"
Cohesion: 0.14
Nodes (19): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.10
Nodes (43): server-only, @supabase/supabase-js, AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Data, Form2316Employer (+35 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "social-button.tsx"
Cohesion: 0.11
Nodes (24): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+16 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (46): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+38 more)

### Community 101 - "leads/[id]/page.tsx"
Cohesion: 0.12
Nodes (24): Person, day(), Leads(), LeadsPage(), Row, ViewLink(), metadata, Proposal() (+16 more)

### Community 102 - "portal/payroll/actions.ts"
Cohesion: 0.31
Nodes (9): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), lastDay(), PAY_PERIODS, PayPeriod, periodEnd() (+1 more)

### Community 103 - "public.ts"
Cohesion: 0.13
Nodes (15): acceptProposalAction(), AcceptState, SERVICES, StartState, QuerySource, Quote, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS (+7 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+10 more)

### Community 106 - "proof-actions.ts"
Cohesion: 0.29
Nodes (9): amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text(), TYPES (+1 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.09
Nodes (40): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+32 more)

### Community 108 - "fees/schedule.ts"
Cohesion: 0.12
Nodes (16): conditionsSchema, num(), optionalAmount, range, ScheduleStatus, SettingsInput, settingsSchema, toFeeItem() (+8 more)

### Community 109 - "formatAmount"
Cohesion: 0.29
Nodes (9): Batch(), BatchPage(), one(), toCentavos(), TransactionJournal(), JournalRow, journalTotals(), amountText() (+1 more)

### Community 110 - "sidebar-toggle.tsx"
Cohesion: 0.18
Nodes (12): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+4 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 113 - "money.ts"
Cohesion: 0.21
Nodes (11): AGENCIES, Db, p(), Run, loadAssets(), applyRate(), basisPoints(), grossUp() (+3 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "tools/page.tsx"
Cohesion: 0.15
Nodes (26): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+18 more)

### Community 116 - "quote/page.tsx"
Cohesion: 0.21
Nodes (13): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), count() (+5 more)

### Community 118 - "fees/data.ts"
Cohesion: 0.26
Nodes (12): dateFmt, loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm() (+4 more)

### Community 119 - "tax-codes.ts"
Cohesion: 0.20
Nodes (14): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+6 more)

### Community 120 - "review/page.tsx"
Cohesion: 0.17
Nodes (22): Queue(), ReviewPage(), Section(), ActingState, appointActingAction(), endActingAction(), refresh(), EndButton() (+14 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.07
Nodes (53): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, DatFiles, datFiles(), Db, isDatKind(), MailAttachment (+45 more)

### Community 122 - "Card"
Cohesion: 0.07
Nodes (66): addClientNoteAction(), amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS (+58 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.16
Nodes (15): accountLabel(), BatchCheck, BatchColumn, BatchContext, centavosOf(), checkRow(), findAccount(), isoDate() (+7 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "filings/[id]/page.tsx"
Cohesion: 0.12
Nodes (28): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus, Event (+20 more)

### Community 126 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 127 - "showMonth"
Cohesion: 0.08
Nodes (52): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), PortalClient, MonthComplete(), SentRow (+44 more)

### Community 128 - "ledger/data.ts"
Cohesion: 0.19
Nodes (12): accountFromRow(), Amendment, AmendmentStatus, BooksClient, BooksMonth, ClientBooks, EntryLineOut, EntryOut (+4 more)

### Community 129 - "resolve.ts"
Cohesion: 0.28
Nodes (12): displayName(), fullAddress(), partyTinLabel(), ABBREVIATIONS, nameTokens(), PartyFields, ResolvedParty, resolveParty() (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.06
Nodes (60): RFC-2047, RFC-2822, GET(), GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload() (+52 more)

### Community 131 - "documents/labels.ts"
Cohesion: 0.13
Nodes (24): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+16 more)

### Community 132 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 133 - "review-form.tsx"
Cohesion: 0.12
Nodes (31): blankLine(), InvoiceForm(), InvoiceFormValue, Booking, BookingFields(), DirectoryParty, ENTRY_STATUS, ONLY_FOR (+23 more)

### Community 134 - "next-actions.ts"
Cohesion: 0.22
Nodes (10): MyWork, byUrgency(), filingItem(), nextActions(), RANK, Role, Urgency, URGENCY_LABELS (+2 more)

### Community 135 - "next"
Cohesion: 0.06
Nodes (54): nextConfig, next, @remixicon/react, Detail(), StatementPage(), errors, Form(), LoginPage() (+46 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (30): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending() (+22 more)

### Community 137 - "gemini.ts"
Cohesion: 0.11
Nodes (21): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+13 more)

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+2 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.03
Nodes (39): pg, outDir, pkgDir, require, { version }, BOOK_LOCK_FORMS, ctx, input (+31 more)

### Community 141 - "requireOwner"
Cohesion: 0.10
Nodes (34): zod@^4.6.7, zod, addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState (+26 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "morning.ts"
Cohesion: 0.35
Nodes (9): GET(), Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+1 more)

### Community 144 - "LinkButton"
Cohesion: 0.26
Nodes (13): MonthSelect(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Set() (+5 more)

### Community 145 - "batch/load.ts"
Cohesion: 0.31
Nodes (8): GET(), safe(), loadAccounts(), loadBatchContext(), monthsBetween(), BatchAccount, dupKey(), buildBatchTemplate()

### Community 146 - "amountInput"
Cohesion: 0.36
Nodes (11): inputs1701(), inputs1702RT(), penaltyInputs(), inputs1701Q(), inputs1702Q(), withoutBookFigures(), withoutMethodChoice(), inputsFor() (+3 more)

### Community 147 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 148 - "proof-upload.tsx"
Cohesion: 0.36
Nodes (8): METHODS, ProofUpload(), send(), ProofState, startProofUpload(), submitProof(), ProofMethod, shrinkImage()

### Community 149 - "worksheet/page.tsx"
Cohesion: 0.38
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 150 - "leads/forms.tsx"
Cohesion: 0.31
Nodes (9): DiscoveryCallForm(), FunnelSwitch(), LostForm(), Person, ProposalForm(), ReopenForm(), Result(), ReviewerForm() (+1 more)

### Community 151 - "[clientId]/page.tsx"
Cohesion: 0.12
Nodes (32): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), Client, CollectionsPage(), OpenDue (+24 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.12
Nodes (27): Gap, board, MARCO, none, RHEA, row(), steps, documentCutoff() (+19 more)

### Community 153 - "batch/forms.tsx"
Cohesion: 0.44
Nodes (7): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), BatchKind, checkBatch()

### Community 154 - "fees/forms.tsx"
Cohesion: 0.33
Nodes (8): ActivateForm(), billingHint, DeleteDraftButton(), NewDraftForm(), PricesForm(), Result(), ScheduleSettingsForm(), SettingsValues

### Community 155 - "xlsx.ts"
Cohesion: 0.31
Nodes (8): BATCH_COLUMNS, BATCH_KINDS, RawRow, cellText(), MAX_ROWS, norm(), readBatch(), sheetName()

### Community 156 - "clients/schema.ts"
Cohesion: 0.19
Nodes (8): assignmentSchema, clientFields, editClientSchema, efpsGroupError, engagementSchema, NewClient, newClientSchema, base

### Community 157 - "supabaseServer"
Cohesion: 0.09
Nodes (36): postPayrollAction(), PostState, PostPayrollButton(), addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState (+28 more)

### Community 158 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 159 - "any-cutoff.test.ts"
Cohesion: 0.50
Nodes (3): as(), client(), root

### Community 160 - "payroll/payroll.test.ts"
Cohesion: 0.13
Nodes (27): PayrollItem, employee(), entry(), fixtureContext(), ITEMS, P(), pay(), CheckedRegister (+19 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 163 - "invoice-pages.tsx"
Cohesion: 0.12
Nodes (26): one(), INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE (+18 more)

### Community 164 - "leads/actions.ts"
Cohesion: 0.25
Nodes (16): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), convertLeadAction(), LeadState, markLostAction() (+8 more)

### Community 165 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **20 isolated node(s):** `RFC-2047`, `RFC-2822`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1174 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `start/page.tsx`, `ledger/data.ts`, `return-file-actions.ts`, `documents/labels.ts`, `package.json`, `fields.ts`, `review-form.tsx`, `app/documents/page.tsx`, `sign-off-actions.tsx`, `registrations/forms.tsx`, `onboarding/page.tsx`, `requireOwner`, `morning.ts`, `dependencies`, `batch/load.ts`, `LinkButton`, `proxy.ts`, `proof-upload.tsx`, `worksheet/page.tsx`, `[clientId]/page.tsx`, `batch/forms.tsx`, `supabaseServer`, `invoice-pages.tsx`, `leads/actions.ts`, `[month]/page.tsx`, `scores/page.tsx`, `ui.ts`, `payroll/forms.tsx`, `lib/books/actions.ts`, `profile.ts`, `Centavos`, `deadlines/page.tsx`, `registrations/[id]/page.tsx`, `manilaToday`, `react`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `Textarea`, `review-forms.tsx`, `cx`, `books/forms.tsx`, `module-pages.tsx`, `ledger/types.ts`, `getIdentity`, `register/page.tsx`, `clients/[id]/page.tsx`, `statements/page.tsx`, `document-upload.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `payroll/data.ts`, `social-button.tsx`, `print/page.tsx`, `leads/[id]/page.tsx`, `portal/payroll/actions.ts`, `public.ts`, `proof-actions.ts`, `parties/[id]/page.tsx`, `formatAmount`, `sidebar-toggle.tsx`, `fixed-assets/page.tsx`, `money.ts`, `tools/page.tsx`, `quote/page.tsx`, `fees/data.ts`, `review/page.tsx`, `returns/load.ts`, `Card`, `filings/[id]/page.tsx`, `showMonth`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **What connects `RFC-2047`, `RFC-2822`, `DO_NOT_TRACK` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `start/page.tsx`, `return-file-actions.ts`, `documents/labels.ts`, `notification.tsx`, `package.json`, `review-form.tsx`, `next`, `app/documents/page.tsx`, `sign-off-actions.tsx`, `registrations/forms.tsx`, `onboarding/page.tsx`, `dependencies`, `LinkButton`, `statements.ts`, `proof-upload.tsx`, `worksheet/page.tsx`, `leads/forms.tsx`, `[clientId]/page.tsx`, `batch/forms.tsx`, `fees/forms.tsx`, `supabaseServer`, `invoice-pages.tsx`, `leads/actions.ts`, `[month]/page.tsx`, `scores/page.tsx`, `ui.ts`, `payroll/forms.tsx`, `modal.tsx`, `profile.ts`, `deadlines/page.tsx`, `registrations/[id]/page.tsx`, `manilaToday`, `Notice`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `Textarea`, `review-forms.tsx`, `cx`, `select.tsx`, `books/forms.tsx`, `module-pages.tsx`, `stat-cards.tsx`, `getIdentity`, `theme-toggle.tsx`, `register/page.tsx`, `clients/[id]/page.tsx`, `button.tsx`, `cx.ts`, `collections/forms.tsx`, `statements/page.tsx`, `input.tsx`, `document-upload.tsx`, `app/app/layout.tsx`, `social-button.tsx`, `print/page.tsx`, `leads/[id]/page.tsx`, `portal/payroll/actions.ts`, `parties/[id]/page.tsx`, `formatAmount`, `sidebar-toggle.tsx`, `fixed-assets/page.tsx`, `tools/page.tsx`, `quote/page.tsx`, `fees/data.ts`, `review/page.tsx`, `Card`, `filings/[id]/page.tsx`, `file-upload.tsx`, `showMonth`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08275862068965517 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `generate.ts`, `return-file-actions.ts`, `arap.ts`, `package.json`, `fields.ts`, `next-actions.ts`, `app/documents/page.tsx`, `gemini.ts`, `register-books.test.ts`, `registrations/forms.tsx`, `ref_node_fs`, `requireOwner`, `onboarding/page.tsx`, `ledger.test.ts`, `statements.ts`, `[clientId]/page.tsx`, `safeguards.ts`, `clients/schema.ts`, `returns-sign-off.test.ts`, `any-cutoff.test.ts`, `payroll/payroll.test.ts`, `books-migration.test.ts`, `invoice-pages.tsx`, `tests/books.test.ts`, `scores/page.tsx`, `ui.ts`, `index.ts`, `profile.ts`, `Centavos`, `registrations/[id]/page.tsx`, `manilaToday`, `returns/types.ts`, `app/settings/page.tsx`, `fees/types.ts`, `board.ts`, `ledger/types.ts`, `quote.ts`, `register/page.tsx`, `clients/[id]/page.tsx`, `sign-off.ts`, `portal-billing.test.ts`, `document-upload.tsx`, `engine.ts`, `opening.ts`, `payroll/data.ts`, `social-button.tsx`, `print/page.tsx`, `portal/payroll/actions.ts`, `public.ts`, `rates.ts`, `parties/[id]/page.tsx`, `fees/schedule.ts`, `fixed-assets/page.tsx`, `money.ts`, `acting-approver.test.ts`, `quote/page.tsx`, `tax-codes.ts`, `review/page.tsx`, `returns/load.ts`, `batch/register.ts`, `showMonth`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `arap.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14666666666666667 - nodes in this community are weakly interconnected._