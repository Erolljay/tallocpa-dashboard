# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 737 files · ~584,679 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4629 nodes · 16009 edges · 170 communities (152 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 128 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `5cf1c480`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- filings/run.ts
- migrate.yml
- cx.ts
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- ui.tsx
- Sign-in & Setup Docs
- onboarding/page.tsx
- Sign-off, Ledger & Payments
- zod
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
- toCentavos
- scores/page.tsx
- percentage.ts
- payroll/types.ts
- ui.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- Badge
- workpapers/load.ts
- deadlines/page.tsx
- month.ts
- review/page.tsx
- ledger/data.ts
- Centavos
- Skeleton
- money.ts
- Notice
- app/settings/page.tsx
- quote/page.tsx
- registrations/forms.tsx
- ledger-closing.test.ts
- cx
- select.tsx
- Apple Design
- public.ts
- returns/books.test.ts
- [clientId]/page.tsx
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
- notification.tsx
- supabaseServer
- Card
- button.tsx
- Pro components
- parties/[id]/page.tsx
- cycle/actions.ts
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
- workpapers/page.tsx
- print/page.tsx
- tax-codes.ts
- payroll-read.tsx
- status.ts
- boardui
- rates.ts
- money.ts
- proxy.ts
- alphalist.ts
- brand/page.tsx
- auth.ts
- Opening balances: checklist for any cut-off
- fixed-assets/forms.tsx
- portal/page.tsx
- parties/parties.test.ts
- tools/page.tsx
- items.ts
- apply-migrations.sh
- upload/page.tsx
- settlement-pages.tsx
- filings/[id]/page.tsx
- returns/load.ts
- 2316/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- filings/actions.ts
- cycle/page.tsx
- read.test.ts
- checkbox.tsx
- server-only
- profile.ts
- LinkButton
- fields.ts
- work/page.tsx
- @remixicon/react
- manilaToday
- gemini.ts
- sidebar-toggle.tsx
- ledger.test.ts
- ref_node_fs
- settings/actions.ts
- income.ts
- binder/page.tsx
- util.ts
- generate-qap-fixture.mjs
- template.ts
- db.test.ts
- filed-returns.ts
- zod
- leads/[id]/page.tsx
- approval-memo.tsx
- safeguards.ts
- register/page.tsx
- sign-off-actions.tsx
- filters.tsx
- staff/page.tsx
- document-upload.tsx
- copy-opencv.mjs
- periods
- register-xlsx.ts
- Rework: one flow from lead to year-end
- review.ts
- eslint.config.mjs
- proof-review.tsx
- fixed-assets.test.ts
- post-button.tsx
- portal/layout.tsx
- requests/actions.ts
- clients/[id]/page.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 284 edges
2. `cx` - 223 edges
3. `Skeleton()` - 216 edges
4. `react` - 212 edges
5. `Notice()` - 210 edges
6. `Button()` - 187 edges
7. `next` - 171 edges
8. `Card()` - 159 edges
9. `Badge()` - 151 edges
10. `vitest` - 131 edges

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

## Communities (170 total, 18 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (47): Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print(), one(), portal2307(), portal2307Href(), SearchParams (+39 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.08
Nodes (47): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+39 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "cx.ts"
Cohesion: 0.06
Nodes (27): ClientTab, UNDER, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter() (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "gemini.ts"
Cohesion: 0.09
Nodes (27): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+19 more)

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

### Community 11 - "ui.tsx"
Cohesion: 0.08
Nodes (36): Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS, NewEntry() (+28 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (29): ClientTabs(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+21 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "zod"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (38): defaultCashFlow(), codes, PNL, COA_TEMPLATES, FS_LINES, FsLine, FsLineKey, isFsLine() (+30 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.12
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

### Community 40 - "toCentavos"
Cohesion: 0.11
Nodes (33): file(), GET(), safe(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review() (+25 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "percentage.ts"
Cohesion: 0.17
Nodes (32): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+24 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "ui.ts"
Cohesion: 0.09
Nodes (41): blankLine(), InvoiceForm(), InvoiceFormValue, Booking, BookingFields(), DirectoryParty, ENTRY_STATUS, ONLY_FOR (+33 more)

### Community 45 - "index.ts"
Cohesion: 0.05
Nodes (27): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+19 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (50): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+42 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.05
Nodes (71): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+63 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "Badge"
Cohesion: 0.16
Nodes (20): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+12 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (23): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+15 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.11
Nodes (39): ClientReturnsPage(), Returns(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup() (+31 more)

### Community 53 - "month.ts"
Cohesion: 0.39
Nodes (7): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none

### Community 54 - "review/page.tsx"
Cohesion: 0.19
Nodes (11): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, TabKey, ReviewPage(), Row, QueueFiling (+3 more)

### Community 55 - "ledger/data.ts"
Cohesion: 0.15
Nodes (26): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+18 more)

### Community 56 - "Centavos"
Cohesion: 0.08
Nodes (50): GridRow, AlphalistRow, AnnualSummary, annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion() (+42 more)

### Community 57 - "Skeleton"
Cohesion: 0.08
Nodes (35): react, BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind (+27 more)

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (55): client, row(), form1601C, INPUTS, MONTH, PAYSLIP_COLUMNS, payslipCsv(), payslipSchedule() (+47 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (66): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), EntryForm(), OpeningUpload() (+58 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.16
Nodes (25): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+17 more)

### Community 61 - "quote/page.tsx"
Cohesion: 0.15
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 62 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (75): ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction(), CompleteButton() (+67 more)

### Community 63 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 64 - "cx"
Cohesion: 0.06
Nodes (33): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+25 more)

### Community 65 - "select.tsx"
Cohesion: 0.06
Nodes (49): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+41 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "public.ts"
Cohesion: 0.10
Nodes (23): acceptProposalAction(), AcceptState, SERVICES, StartState, QuerySource, conditionsSchema, FEE_SCHEDULE_COLUMNS, FeeItemRow (+15 more)

### Community 68 - "returns/books.test.ts"
Cohesion: 0.13
Nodes (26): vitest, form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual (+18 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (48): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+40 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.13
Nodes (25): datAddress(), datNameCols(), displayName(), fullAddress(), listNameCols(), Names, Party, PARTY_COLUMNS (+17 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (44): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+36 more)

### Community 72 - "formatAmount"
Cohesion: 0.20
Nodes (27): fmtDate(), fmtMonth(), BooksFrame(), BooksList(), Column, ListRow, RowLink(), InvoiceList() (+19 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ledger/types.ts"
Cohesion: 0.09
Nodes (37): Access, STATUS, BookEntry, CASH_FLOW_CLASSES, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES (+29 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (44): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+36 more)

### Community 77 - "Card"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "quote.ts"
Cohesion: 0.07
Nodes (54): TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, has(), items, PRICES, schedule (+46 more)

### Community 80 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 81 - "supabaseServer"
Cohesion: 0.09
Nodes (46): addClientNoteAction(), NoteState, addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction() (+38 more)

### Community 82 - "Card"
Cohesion: 0.08
Nodes (49): FormState, removeAssignmentAction(), ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient() (+41 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "parties/[id]/page.tsx"
Cohesion: 0.31
Nodes (11): setPartyVerifiedAction(), MergeForm(), PresetAccountForm(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), PARTY_KINDS (+3 more)

### Community 86 - "cycle/actions.ts"
Cohesion: 0.26
Nodes (13): SentRow, TimelineRow, closeCycleAction(), confirmMonthAction(), CycleState, decideExceptionAction(), nothingToSubmitAction(), refresh() (+5 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (67): nextConfig, next, PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks() (+59 more)

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
Cohesion: 0.17
Nodes (17): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+9 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "public.ts"
Cohesion: 0.17
Nodes (17): metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage(), Lockup(), Mark() (+9 more)

### Community 94 - "ledger/types.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.10
Nodes (45): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory (+37 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (21): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+13 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.06
Nodes (53): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages() (+45 more)

### Community 101 - "tax-codes.ts"
Cohesion: 0.13
Nodes (22): SearchParams, dayBefore(), INVOICE_LABEL, Props, SettingsPage(), SettingsRoute(), ClientPending(), payslips() (+14 more)

### Community 102 - "payroll-read.tsx"
Cohesion: 0.12
Nodes (27): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+19 more)

### Community 103 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.24
Nodes (17): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+9 more)

### Community 106 - "money.ts"
Cohesion: 0.16
Nodes (17): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+9 more)

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "alphalist.ts"
Cohesion: 0.15
Nodes (23): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist() (+15 more)

### Community 109 - "brand/page.tsx"
Cohesion: 0.14
Nodes (21): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), daysBetween(), expiryStatus() (+13 more)

### Community 110 - "auth.ts"
Cohesion: 0.18
Nodes (19): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), convertLeadAction(), LeadState, markLostAction() (+11 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/forms.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "parties/parties.test.ts"
Cohesion: 0.19
Nodes (17): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), lookupParties(), person, blank() (+9 more)

### Community 115 - "tools/page.tsx"
Cohesion: 0.18
Nodes (20): AmendmentDecision(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm() (+12 more)

### Community 116 - "items.ts"
Cohesion: 0.16
Nodes (17): PayrollSetupPage(), Setup(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings() (+9 more)

### Community 118 - "upload/page.tsx"
Cohesion: 0.25
Nodes (14): shift(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), addMonths(), isWeekend() (+6 more)

### Community 119 - "settlement-pages.tsx"
Cohesion: 0.10
Nodes (34): JournalEntryRoute(), JournalView(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, Kind, Props (+26 more)

### Community 120 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (37): FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText, Filing() (+29 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.07
Nodes (54): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), LOCKED_STATUSES, ATC_MASTER, AtcInfo, lookupAtc() (+46 more)

### Community 122 - "2316/page.tsx"
Cohesion: 0.44
Nodes (7): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Form2316Sheet(), PrintButton(), load2316()

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (41): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+33 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.13
Nodes (27): dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase (+19 more)

### Community 126 - "filings/actions.ts"
Cohesion: 0.19
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.22
Nodes (15): Cycle(), CycleWithClient, DocRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton(), CycleRow (+7 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (62): BirCategory, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+54 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "server-only"
Cohesion: 0.06
Nodes (71): RFC-2047, RFC-2822, server-only, GET(), GET(), generateFilingsNow(), GenerateState, GenerateButton() (+63 more)

### Community 131 - "profile.ts"
Cohesion: 0.15
Nodes (17): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), Expiry, ExpiryTone (+9 more)

### Community 132 - "LinkButton"
Cohesion: 0.31
Nodes (12): booksContext(), BooksContext, one(), MonthSelect(), Certificates(), Staff2307Page(), Print(), Print2307Page() (+4 more)

### Community 133 - "fields.ts"
Cohesion: 0.08
Nodes (38): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), BatchRow (+30 more)

### Community 134 - "work/page.tsx"
Cohesion: 0.16
Nodes (23): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), addDays(), holidaySet() (+15 more)

### Community 135 - "@remixicon/react"
Cohesion: 0.11
Nodes (33): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+25 more)

### Community 136 - "manilaToday"
Cohesion: 0.15
Nodes (19): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+11 more)

### Community 137 - "gemini.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "sidebar-toggle.tsx"
Cohesion: 0.18
Nodes (12): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+4 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.02
Nodes (33): pg, ctx, input, as(), root, signIn(), root, root (+25 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 142 - "income.ts"
Cohesion: 0.11
Nodes (41): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+33 more)

### Community 143 - "binder/page.tsx"
Cohesion: 0.26
Nodes (14): amt(), CertificatesTable(), PartsLink(), PurchasesTable(), SalesTable(), th(), amt(), Binder() (+6 more)

### Community 144 - "util.ts"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "template.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 148 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 149 - "zod"
Cohesion: 0.24
Nodes (11): zod, amount, date, refresh(), rejectProofAction(), StartProof, submitProof(), submitSchema (+3 more)

### Community 150 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (34): NotesCard(), ClientNoteForm(), FunnelSwitch(), ReopenForm(), Lead(), LeadPage(), Person, day() (+26 more)

### Community 151 - "approval-memo.tsx"
Cohesion: 0.23
Nodes (11): amt(), ApprovalMemo(), Db, TIE, month1601C(), grossSales(), c(), loadPeriodFile() (+3 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.09
Nodes (39): GET(), CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay() (+31 more)

### Community 153 - "register/page.tsx"
Cohesion: 0.09
Nodes (34): Href, LineParts(), one(), Register(), RegisterPage(), shiftMonth(), SOURCE, client() (+26 more)

### Community 154 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 155 - "filters.tsx"
Cohesion: 0.13
Nodes (22): ApprovedTable(), BOOKED_TYPES, ClientList(), confirmedMonths(), countBy(), Documents(), DocumentsPage(), MonthCell() (+14 more)

### Community 156 - "staff/page.tsx"
Cohesion: 0.42
Nodes (7): BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 157 - "document-upload.tsx"
Cohesion: 0.12
Nodes (24): DocReviewActions(), DocumentsCard(), when(), DocumentUpload(), send(), upload(), Item, typeFromName() (+16 more)

### Community 158 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 159 - "periods"
Cohesion: 0.67
Nodes (7): Periods, periods(), addMonths(), monthEnd(), pad2(), quarterOf(), taxableYear()

### Community 160 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (23): RFC-4180, exceljs, ItemKind, filled(), Grid, GridResult, isCsv(), isXls() (+15 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "review.ts"
Cohesion: 0.43
Nodes (5): ALWAYS, refsToSign(), reviewGaps(), SIGNED_REFS, quiet

### Community 163 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 164 - "proof-review.tsx"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 166 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 172 - "portal/layout.tsx"
Cohesion: 0.27
Nodes (10): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+2 more)

### Community 173 - "requests/actions.ts"
Cohesion: 0.13
Nodes (34): @remixicon/react, RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests() (+26 more)

### Community 174 - "clients/[id]/page.tsx"
Cohesion: 0.09
Nodes (34): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), setIncomeTaxMethodAction(), setupMissingChartsAction(), updateClientAction() (+26 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1262 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `returns/books.test.ts` to `form-2307.ts`, `filings/run.ts`, `server-only`, `read.test.ts`, `arap.ts`, `package.json`, `fields.ts`, `gemini.ts`, `gemini.ts`, `ledger.test.ts`, `ref_node_fs`, `settings/actions.ts`, `onboarding/page.tsx`, `statements.ts`, `template.ts`, `filed-returns.ts`, `db.test.ts`, `leads/[id]/page.tsx`, `safeguards.ts`, `register/page.tsx`, `filters.tsx`, `review.ts`, `eslint.config.mjs`, `proof-review.tsx`, `fixed-assets.test.ts`, `scores/page.tsx`, `portal/layout.tsx`, `ui.ts`, `clients/[id]/page.tsx`, `requests/actions.ts`, `lib/books/actions.ts`, `index.ts`, `workpapers/load.ts`, `deadlines/page.tsx`, `month.ts`, `review/page.tsx`, `ledger/data.ts`, `Centavos`, `money.ts`, `app/settings/page.tsx`, `quote/page.tsx`, `registrations/forms.tsx`, `ledger-closing.test.ts`, `public.ts`, `[clientId]/page.tsx`, `ledger/types.ts`, `Card`, `quote.ts`, `Card`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `ledger/types.ts`, `payroll/data.ts`, `print/page.tsx`, `tax-codes.ts`, `payroll-read.tsx`, `status.ts`, `rates.ts`, `money.ts`, `brand/page.tsx`, `fixed-assets/forms.tsx`, `portal/page.tsx`, `parties/parties.test.ts`, `upload/page.tsx`, `filings/[id]/page.tsx`, `returns/load.ts`, `batch/register.ts`, `filings/actions.ts`, `cycle/page.tsx`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08469449485783424 - nodes in this community are weakly interconnected._
- **Why does `next` connect `portal/reports/page.tsx` to `form-2307.ts`, `cx.ts`, `package.json`, `ui.tsx`, `onboarding/page.tsx`, `zod`, `toCentavos`, `scores/page.tsx`, `ui.ts`, `payroll/forms.tsx`, `lib/books/actions.ts`, `Badge`, `deadlines/page.tsx`, `review/page.tsx`, `ledger/data.ts`, `Skeleton`, `app/settings/page.tsx`, `quote/page.tsx`, `registrations/forms.tsx`, `select.tsx`, `public.ts`, `[clientId]/page.tsx`, `books/forms.tsx`, `formatAmount`, `ledger/types.ts`, `Card`, `supabaseServer`, `Card`, `parties/[id]/page.tsx`, `cycle/actions.ts`, `app/app/layout.tsx`, `form-2316.tsx`, `public.ts`, `payroll/data.ts`, `workpapers/page.tsx`, `print/page.tsx`, `tax-codes.ts`, `payroll-read.tsx`, `money.ts`, `proxy.ts`, `brand/page.tsx`, `auth.ts`, `fixed-assets/forms.tsx`, `portal/page.tsx`, `parties/parties.test.ts`, `tools/page.tsx`, `items.ts`, `upload/page.tsx`, `settlement-pages.tsx`, `filings/[id]/page.tsx`, `returns/load.ts`, `2316/page.tsx`, `batch/register.ts`, `quote/page.tsx`, `filings/actions.ts`, `cycle/page.tsx`, `server-only`, `LinkButton`, `fields.ts`, `work/page.tsx`, `@remixicon/react`, `manilaToday`, `sidebar-toggle.tsx`, `settings/actions.ts`, `binder/page.tsx`, `zod`, `leads/[id]/page.tsx`, `approval-memo.tsx`, `safeguards.ts`, `register/page.tsx`, `sign-off-actions.tsx`, `filters.tsx`, `document-upload.tsx`, `post-button.tsx`, `portal/layout.tsx`, `requests/actions.ts`, `clients/[id]/page.tsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08007013442431327 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `form-2307.ts`, `checkbox.tsx`, `server-only`, `cx.ts`, `LinkButton`, `package.json`, `work/page.tsx`, `@remixicon/react`, `manilaToday`, `sidebar-toggle.tsx`, `ui.tsx`, `onboarding/page.tsx`, `zod`, `binder/page.tsx`, `leads/[id]/page.tsx`, `register/page.tsx`, `sign-off-actions.tsx`, `filters.tsx`, `staff/page.tsx`, `document-upload.tsx`, `post-button.tsx`, `toCentavos`, `scores/page.tsx`, `ui.ts`, `requests/actions.ts`, `payroll/forms.tsx`, `modal.tsx`, `lib/books/actions.ts`, `portal/layout.tsx`, `Badge`, `deadlines/page.tsx`, `review/page.tsx`, `ledger/data.ts`, `Notice`, `app/settings/page.tsx`, `quote/page.tsx`, `registrations/forms.tsx`, `cx`, `select.tsx`, `[clientId]/page.tsx`, `books/forms.tsx`, `formatAmount`, `stat-cards.tsx`, `Card`, `theme-toggle.tsx`, `notification.tsx`, `Card`, `button.tsx`, `parties/[id]/page.tsx`, `cycle/actions.ts`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `public.ts`, `payroll/data.ts`, `workpapers/page.tsx`, `print/page.tsx`, `tax-codes.ts`, `payroll-read.tsx`, `money.ts`, `brand/page.tsx`, `auth.ts`, `fixed-assets/forms.tsx`, `portal/page.tsx`, `tools/page.tsx`, `items.ts`, `upload/page.tsx`, `settlement-pages.tsx`, `filings/[id]/page.tsx`, `2316/page.tsx`, `quote/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._