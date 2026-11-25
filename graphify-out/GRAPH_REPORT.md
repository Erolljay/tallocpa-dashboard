# Graph Report - agent-ae3905de05aa47cc6  (2026-11-25)

## Corpus Check
- 719 files · ~562,915 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .css 7, (none) 5, .mdc 1)

## Summary
- 4467 nodes · 15430 edges · 161 communities (144 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 126 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `2a861284`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- engine.ts
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
- ui.ts
- scores/page.tsx
- income.ts
- payroll/types.ts
- formatAmount
- Badge
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- profile.ts
- workpapers/page.tsx
- board.ts
- safeguards.ts
- lock-bar.tsx
- ledger/data.ts
- Centavos
- Skeleton
- returns/types.ts
- Notice
- app/settings/page.tsx
- Card
- registration.test.ts
- server-only
- cx
- select.tsx
- Apple Design
- notes.ts
- vitest
- fees/types.ts
- format.ts
- books/forms.tsx
- module-pages.tsx
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- PageHeader
- theme-toggle.tsx
- quote.ts
- fees/forms.tsx
- clients/actions.ts
- branches.ts
- button.tsx
- Pro components
- @supabase/supabase-js
- registrations/forms.tsx
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
- ledger/books.ts
- portal/requests/page.tsx
- runs.tsx
- receipts.ts
- boardui
- rates.ts
- breadcrumb.tsx
- parties/parties.test.ts
- alphalist.ts
- form-2307.tsx
- steps.ts
- Opening balances: checklist for any cut-off
- fixed-assets/forms.tsx
- portal/page.tsx
- acting-approver.test.ts
- tools/page.tsx
- binder/page.tsx
- apply-migrations.sh
- brand/forms.tsx
- tax-codes.ts
- manilaToday
- returns/load.ts
- dates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- file-upload.tsx
- cycle/actions.ts
- review-form.tsx
- form-2307-list.tsx
- mime.ts
- summary.ts
- review-queue.ts
- names.ts
- addDays
- statement.ts
- app/documents/page.tsx
- copy-opencv.mjs
- sign-off-actions.tsx
- index.ts
- settings/actions.ts
- proxy.ts
- filed-returns.ts
- generate-qap-fixture.mjs
- template.ts
- brand/actions.ts
- leads/[id]/page.tsx
- requireOwner
- safeguards-load.ts
- register/page.tsx
- filters.tsx
- proposal-view.tsx
- supabaseServer
- money.ts
- payroll/payroll.test.ts
- Rework: one flow from lead to year-end
- BoardUI page patterns
- start/page.tsx
- @remixicon/react
- clients/[id]/page.tsx
- seed.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 281 edges
2. `cx` - 217 edges
3. `Skeleton()` - 216 edges
4. `react` - 211 edges
5. `Notice()` - 205 edges
6. `Button()` - 183 edges
7. `next` - 169 edges
8. `Card()` - 159 edges
9. `Badge()` - 148 edges
10. `vitest` - 128 edges

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

## Communities (161 total, 17 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.16
Nodes (27): BooksContext, load2307Staff(), one(), portal2307(), SearchParams, By2307, fmt(), forms2307() (+19 more)

### Community 1 - "engine.ts"
Cohesion: 0.10
Nodes (40): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+32 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.07
Nodes (30): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+22 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "gemini.ts"
Cohesion: 0.13
Nodes (16): OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+8 more)

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
Cohesion: 0.16
Nodes (26): CompleteButton(), StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+18 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (32): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+24 more)

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
Cohesion: 0.07
Nodes (51): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow() (+43 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.10
Nodes (53): ATC_MASTER, AtcInfo, lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS (+45 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "ui.ts"
Cohesion: 0.09
Nodes (37): WithdrawReportButton(), blankLine(), InvoiceForm(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate() (+29 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.13
Nodes (26): ClientRow, order, PartCell(), ScoredClient, Scores(), Trend(), ClientMonth, complianceScore() (+18 more)

### Community 42 - "income.ts"
Cohesion: 0.10
Nodes (65): BIR_LINES, BirLineKey, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701() (+57 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "formatAmount"
Cohesion: 0.09
Nodes (51): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, fmt() (+43 more)

### Community 45 - "Badge"
Cohesion: 0.15
Nodes (22): Payroll(), PayrollPage(), Detail(), StatementPage(), BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING (+14 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (40): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+32 more)

### Community 47 - "modal.tsx"
Cohesion: 0.09
Nodes (38): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+30 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.09
Nodes (44): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+36 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.11
Nodes (22): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+14 more)

### Community 51 - "workpapers/page.tsx"
Cohesion: 0.05
Nodes (72): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+64 more)

### Community 52 - "board.ts"
Cohesion: 0.18
Nodes (18): FilingGroup(), StepProgress(), StepWho, CauseTag, causeTag(), DUE_GROUP_LABELS, DueGroup, FILED (+10 more)

### Community 53 - "safeguards.ts"
Cohesion: 0.15
Nodes (20): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, isWeekend() (+12 more)

### Community 54 - "lock-bar.tsx"
Cohesion: 0.14
Nodes (22): BooksLockBar(), ICON, LockBarFor(), MonthLock(), LockContext, BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod() (+14 more)

### Community 55 - "ledger/data.ts"
Cohesion: 0.14
Nodes (25): dayBefore(), GET(), safe(), fromWorkbookData(), buildBookWorkbook(), accountFromRow(), Amendment, AmendmentStatus (+17 more)

### Community 56 - "Centavos"
Cohesion: 0.08
Nodes (50): GridRow, AlphaCols, AlphalistRow, Certificates2316, form2316(), Form2316Employer, Form2316Line, Form2316Party (+42 more)

### Community 57 - "Skeleton"
Cohesion: 0.05
Nodes (73): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+65 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (67): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+59 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (72): setupMissingChartsAction(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), EntryForm() (+64 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (34): RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote, SettingsPage() (+26 more)

### Community 61 - "Card"
Cohesion: 0.15
Nodes (31): dateFmt, loadItems(), loadSchedule(), loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel (+23 more)

### Community 62 - "registration.test.ts"
Cohesion: 0.12
Nodes (15): openClientCaseAction(), Check(), ChecklistPreview(), ClientCaseForm(), birForm(), branchStepsFor(), closureStepsFor(), registersWithSec() (+7 more)

### Community 63 - "server-only"
Cohesion: 0.17
Nodes (16): server-only, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+8 more)

### Community 64 - "cx"
Cohesion: 0.05
Nodes (57): Counter(), CounterColor, CounterProps, styles, StatusDot(), StatusDotColor, StatusDotProps, styles (+49 more)

### Community 65 - "select.tsx"
Cohesion: 0.10
Nodes (30): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+22 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "notes.ts"
Cohesion: 0.17
Nodes (16): NoteState, NotesCard(), ClientNoteForm(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry (+8 more)

### Community 68 - "vitest"
Cohesion: 0.13
Nodes (20): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+12 more)

### Community 69 - "fees/types.ts"
Cohesion: 0.13
Nodes (26): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+18 more)

### Community 70 - "format.ts"
Cohesion: 0.12
Nodes (26): datAddress(), datNameCols(), displayName(), fullAddress(), listNameCols(), Names, Party, PARTY_COLUMNS (+18 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (40): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+32 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.13
Nodes (37): BankAccountsRoute(), booksContext(), fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList() (+29 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.11
Nodes (29): Access, OpeningChecklist(), STATUS, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor() (+21 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (37): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+29 more)

### Community 77 - "PageHeader"
Cohesion: 0.08
Nodes (41): EditClient(), EditClientPage(), NewClientPage(), OwnerOnly(), ClientList(), ClientsPage(), FilingsTabs(), FilingsTabsFor() (+33 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "quote.ts"
Cohesion: 0.12
Nodes (25): PriceRow, buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos() (+17 more)

### Community 80 - "fees/forms.tsx"
Cohesion: 0.22
Nodes (18): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+10 more)

### Community 81 - "clients/actions.ts"
Cohesion: 0.10
Nodes (31): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, updateClientAction(), ClientForm(), frequencyLabel (+23 more)

### Community 82 - "branches.ts"
Cohesion: 0.25
Nodes (10): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), branchSchema, branchUpdateSchema, groupByBranch() (+2 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "@supabase/supabase-js"
Cohesion: 0.26
Nodes (9): @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, GenerateButton(), runOcrAction(), supabaseEnv(), runFilingGeneration() (+1 more)

### Community 86 - "registrations/forms.tsx"
Cohesion: 0.11
Nodes (27): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openRegistrationAction(), openYearRenewalsAction() (+19 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.14
Nodes (42): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+34 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (27): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.09
Nodes (29): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+21 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 93 - "public.ts"
Cohesion: 0.09
Nodes (26): acceptProposalAction(), AcceptState, requestQuoteAction(), SERVICES, StartState, QuerySource, conditionsSchema, FEE_ITEM_COLUMNS (+18 more)

### Community 94 - "ledger/types.ts"
Cohesion: 0.13
Nodes (21): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+13 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.14
Nodes (36): saveMonthAction(), PayrollMonth(), PayrollMonthPage(), when(), applyRegister(), previewOf(), totals(), certificatesFromRaw() (+28 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "social-button.tsx"
Cohesion: 0.11
Nodes (26): GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode(), errors (+18 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (46): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+38 more)

### Community 101 - "portal/requests/page.tsx"
Cohesion: 0.25
Nodes (11): Row, PortalRequests(), Requests(), Row, when(), Direction, REQUEST_FILE_MAX, REQUEST_FILE_TYPES (+3 more)

### Community 102 - "runs.tsx"
Cohesion: 0.22
Nodes (11): PostPayrollButton(), AGENCIES, Db, p(), PayrollRuns(), Run, lastDay(), PAY_PERIODS (+3 more)

### Community 103 - "receipts.ts"
Cohesion: 0.22
Nodes (11): firmBlockLines(), formatTin(), cents(), CLIENT_MONEY_KINDS, FEE_KINDS, GrossReceiptsWatch, grossReceiptsWatch(), pesos() (+3 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.20
Nodes (22): monthlyTable(), monthlyWithholding(), roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax() (+14 more)

### Community 106 - "breadcrumb.tsx"
Cohesion: 0.20
Nodes (8): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronDownSmall(), ChevronRightSmall(), IconProps

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.17
Nodes (21): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), runOcr(), SKIP, lookupParties(), person (+13 more)

### Community 108 - "alphalist.ts"
Cohesion: 0.15
Nodes (24): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+16 more)

### Community 109 - "form-2307.tsx"
Cohesion: 0.18
Nodes (16): PortalPrint2307Page(), Print(), portal2307Href(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+8 more)

### Community 110 - "steps.ts"
Cohesion: 0.15
Nodes (14): Agency, BranchOptions, CaseStep, ClosureOptions, dayNumber(), EMPLOYER_STEPS, LGU_STEPS, PlannedStep (+6 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (37): UserMenu(), BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents() (+29 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "tools/page.tsx"
Cohesion: 0.19
Nodes (19): AmendmentDecision(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm() (+11 more)

### Community 116 - "binder/page.tsx"
Cohesion: 0.26
Nodes (11): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, metadata (+3 more)

### Community 118 - "brand/forms.tsx"
Cohesion: 0.31
Nodes (10): finishBrandUpload(), startBrandUpload(), BrandFileUpload(), upload(), FieldDef, FIELDS, pesoInput(), Result() (+2 more)

### Community 119 - "tax-codes.ts"
Cohesion: 0.18
Nodes (14): loadTaxCodes(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+6 more)

### Community 120 - "manilaToday"
Cohesion: 0.05
Nodes (84): ClientReturnsPage(), FilingRow, Returns(), RunReadyButton(), Client, CollectionsPage(), OpenDue, Overview() (+76 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.08
Nodes (48): normalizeAtc(), NonDeductibleRow, withNonDeductible(), SawtResult, Split, dayBefore(), FilingRow, ListedDocument (+40 more)

### Community 122 - "dates.ts"
Cohesion: 0.51
Nodes (7): shift(), addMonths(), toIso(), ymd(), monthChoices(), nextCutoff(), openMonth()

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (42): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+34 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.17
Nodes (12): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, client, owner, preparer (+4 more)

### Community 126 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 127 - "cycle/actions.ts"
Cohesion: 0.21
Nodes (17): MonthComplete(), SentRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction() (+9 more)

### Community 128 - "review-form.tsx"
Cohesion: 0.06
Nodes (56): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), Booking, BookingFields() (+48 more)

### Community 129 - "form-2307-list.tsx"
Cohesion: 0.31
Nodes (8): Portal2307(), Portal2307Page(), fmtDate(), Form2307Pickers(), period2307Text(), BY_2307, Form2307Data, Period2307

### Community 130 - "mime.ts"
Cohesion: 0.12
Nodes (32): RFC-2047, RFC-2822, EsubmissionMailEnv, esubmissionMailEnv(), DatFiles, datFiles(), Db, accessToken() (+24 more)

### Community 131 - "summary.ts"
Cohesion: 0.29
Nodes (7): CycleRow, ExceptionDecision, parseMonth(), Submission, submission(), submissionLabel, submissionTone

### Community 132 - "review-queue.ts"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 133 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 134 - "addDays"
Cohesion: 0.16
Nodes (18): loadAssets(), Row, addDays(), parseIso(), lastMonth(), loadMyWork(), MyWork, plural() (+10 more)

### Community 135 - "statement.ts"
Cohesion: 0.15
Nodes (17): credit(), ItemList(), proofMethod, VerifiedItems(), FirmBlock, AllocationRow, groupPaidItems(), PaidItem (+9 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.06
Nodes (61): DocReviewActions(), Doc, DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow (+53 more)

### Community 137 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 140 - "index.ts"
Cohesion: 0.02
Nodes (78): pg, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST (+70 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.21
Nodes (15): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), periodWord (+7 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "template.ts"
Cohesion: 0.18
Nodes (10): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+2 more)

### Community 148 - "brand/actions.ts"
Cohesion: 0.21
Nodes (11): BrandSettingsState, refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, BRAND_FILES, BrandFileKind, parseSection() (+3 more)

### Community 150 - "leads/[id]/page.tsx"
Cohesion: 0.12
Nodes (31): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), convertLeadAction(), LeadState, markLostAction() (+23 more)

### Community 151 - "requireOwner"
Cohesion: 0.07
Nodes (67): zod@^4.6.7, zod, addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction() (+59 more)

### Community 152 - "safeguards-load.ts"
Cohesion: 0.09
Nodes (34): GET(), ClientValues, TAX_TYPES, TaxType, CoverageClient, coverageGaps(), Gap, GapKind (+26 more)

### Community 153 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 155 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 156 - "proposal-view.tsx"
Cohesion: 0.33
Nodes (8): Lines(), longDate(), money(), php, ProposalData, ProposalView(), Quote, SERVICE_LABELS

### Community 157 - "supabaseServer"
Cohesion: 0.06
Nodes (58): nextConfig, next, setIncomeTaxMethodAction(), loadLockContext(), BooksMonthsPage(), Months(), one(), addClientNoteAction() (+50 more)

### Community 159 - "money.ts"
Cohesion: 0.39
Nodes (6): applyRate(), basisPoints(), grossUp(), grouped, sum(), toCentavos()

### Community 160 - "payroll/payroll.test.ts"
Cohesion: 0.10
Nodes (38): exceljs, file(), GET(), safe(), yearWorksheet(), buildEmployeeTemplate(), PayrollItem, sortItems() (+30 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 172 - "start/page.tsx"
Cohesion: 0.16
Nodes (17): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+9 more)

### Community 173 - "@remixicon/react"
Cohesion: 0.10
Nodes (38): @remixicon/react, RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), one(), ORDER, PortalUpload() (+30 more)

### Community 174 - "clients/[id]/page.tsx"
Cohesion: 0.11
Nodes (31): removeAssignmentAction(), setClientStatusAction(), StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm(), IncomeTaxMethodForm(), RemoveAssignmentButton() (+23 more)

### Community 176 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

## Knowledge Gaps
- **20 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1211 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Skeleton` to `review-form.tsx`, `form-2307-list.tsx`, `notification.tsx`, `package.json`, `app/documents/page.tsx`, `sign-off-actions.tsx`, `registrations/[id]/page.tsx`, `onboarding/page.tsx`, `settings/actions.ts`, `dependencies`, `statements.ts`, `leads/[id]/page.tsx`, `requireOwner`, `register/page.tsx`, `filters.tsx`, `supabaseServer`, `ui.ts`, `scores/page.tsx`, `formatAmount`, `@remixicon/react`, `clients/[id]/page.tsx`, `modal.tsx`, `lib/books/actions.ts`, `payroll/forms.tsx`, `Badge`, `workpapers/page.tsx`, `start/page.tsx`, `lock-bar.tsx`, `Notice`, `app/settings/page.tsx`, `Card`, `cx`, `select.tsx`, `notes.ts`, `books/forms.tsx`, `module-pages.tsx`, `stat-cards.tsx`, `PageHeader`, `theme-toggle.tsx`, `fees/forms.tsx`, `clients/actions.ts`, `branches.ts`, `button.tsx`, `@supabase/supabase-js`, `registrations/forms.tsx`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `payroll/data.ts`, `social-button.tsx`, `ledger/books.ts`, `portal/requests/page.tsx`, `breadcrumb.tsx`, `form-2307.tsx`, `fixed-assets/forms.tsx`, `portal/page.tsx`, `tools/page.tsx`, `binder/page.tsx`, `brand/forms.tsx`, `manilaToday`, `batch/register.ts`, `file-upload.tsx`, `cycle/actions.ts`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10175763182238667 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `review-form.tsx`, `form-2307-list.tsx`, `package.json`, `statement.ts`, `app/documents/page.tsx`, `sign-off-actions.tsx`, `registrations/[id]/page.tsx`, `onboarding/page.tsx`, `settings/actions.ts`, `dependencies`, `proxy.ts`, `statements.ts`, `brand/actions.ts`, `leads/[id]/page.tsx`, `requireOwner`, `safeguards-load.ts`, `register/page.tsx`, `payroll/payroll.test.ts`, `ui.ts`, `scores/page.tsx`, `formatAmount`, `@remixicon/react`, `clients/[id]/page.tsx`, `payroll/forms.tsx`, `lib/books/actions.ts`, `Badge`, `start/page.tsx`, `workpapers/page.tsx`, `ledger/data.ts`, `Skeleton`, `Notice`, `app/settings/page.tsx`, `Card`, `server-only`, `books/forms.tsx`, `module-pages.tsx`, `opening-checklist.tsx`, `PageHeader`, `fees/forms.tsx`, `clients/actions.ts`, `branches.ts`, `@supabase/supabase-js`, `registrations/forms.tsx`, `portal/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `public.ts`, `payroll/data.ts`, `social-button.tsx`, `ledger/books.ts`, `portal/requests/page.tsx`, `runs.tsx`, `breadcrumb.tsx`, `parties/parties.test.ts`, `form-2307.tsx`, `fixed-assets/forms.tsx`, `portal/page.tsx`, `tools/page.tsx`, `binder/page.tsx`, `brand/forms.tsx`, `manilaToday`, `batch/register.ts`, `cycle/actions.ts`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `engine.ts`, `review-form.tsx`, `summary.ts`, `mime.ts`, `package.json`, `review-queue.ts`, `arap.ts`, `app/documents/page.tsx`, `gemini.ts`, `names.ts`, `registrations/[id]/page.tsx`, `index.ts`, `settings/actions.ts`, `onboarding/page.tsx`, `filed-returns.ts`, `statements.ts`, `template.ts`, `requireOwner`, `safeguards-load.ts`, `register/page.tsx`, `filters.tsx`, `money.ts`, `payroll/payroll.test.ts`, `ui.ts`, `scores/page.tsx`, `start/page.tsx`, `formatAmount`, `clients/[id]/page.tsx`, `workpapers/page.tsx`, `board.ts`, `safeguards.ts`, `lock-bar.tsx`, `Centavos`, `returns/types.ts`, `app/settings/page.tsx`, `registration.test.ts`, `server-only`, `notes.ts`, `fees/types.ts`, `opening-checklist.tsx`, `quote.ts`, `fees/forms.tsx`, `clients/actions.ts`, `branches.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `public.ts`, `ledger/types.ts`, `social-button.tsx`, `ledger/books.ts`, `portal/requests/page.tsx`, `runs.tsx`, `receipts.ts`, `rates.ts`, `parties/parties.test.ts`, `form-2307.tsx`, `portal/page.tsx`, `acting-approver.test.ts`, `tax-codes.ts`, `manilaToday`, `returns/load.ts`, `dates.ts`, `batch/register.ts`, `sign-off.ts`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07130124777183601 - nodes in this community are weakly interconnected._