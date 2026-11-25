# Graph Report - agent-aa02c9eac9e20480b  (2026-11-25)

## Corpus Check
- 721 files · ~564,220 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .css 7, (none) 5, .mdc 1)

## Summary
- 4484 nodes · 15499 edges · 170 communities (151 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `2a861284`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- filings/run.ts
- migrate.yml
- notification.tsx
- books/export/route.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- PageHeader
- Sign-in & Setup Docs
- onboarding/page.tsx
- Sign-off, Ledger & Payments
- copy-opencv.mjs
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
- payroll/page.tsx
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
- review/page.tsx
- app/app/page.tsx
- Centavos
- Skeleton
- returns/types.ts
- Notice
- app/settings/page.tsx
- fees/[id]/page.tsx
- registrations/forms.tsx
- Badge
- cx
- select.tsx
- Apple Design
- fees/schedule.ts
- testing.ts
- server-only
- parties/[id]/page.tsx
- books/forms.tsx
- module-pages.tsx
- Rules
- Animation Performance
- ledger/data.ts
- stat-cards.tsx
- proof-actions.ts
- theme-toggle.tsx
- quote.ts
- workpapers.test.ts
- supabaseServer
- binder/page.tsx
- button.tsx
- Pro components
- cx.ts
- approval-memo.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- public.ts
- opening.ts
- Recipes
- payroll/data.ts
- BoardUI page patterns
- Pro templates
- social-button.tsx
- ledger/books.ts
- [token]/page.tsx
- [month]/page.tsx
- [clientId]/page.tsx
- boardui
- compute.ts
- fees/types.ts
- documents/[id]/page.tsx
- form-1601c.ts
- formatAmount
- LinkButton
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- portal/page.tsx
- acting-approver.test.ts
- tools/page.tsx
- settlement-pages.tsx
- apply-migrations.sh
- leads/actions.ts
- invoice-pages.tsx
- filings/[id]/page.tsx
- returns/load.ts
- 2316/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- file-upload.tsx
- cycle/page.tsx
- supabaseAdmin
- checkbox.tsx
- mime.ts
- upload/page.tsx
- staff/page.tsx
- fields.ts
- work/page.tsx
- manilaToday
- documents/labels.ts
- ticked-allocation.test.ts
- sign-off-actions.tsx
- ledger.test.ts
- vitest
- settings/actions.ts
- book-income.ts
- morning.ts
- Building UIs with BoardUI
- generate-qap-fixture.mjs
- names.ts
- db.test.ts
- proof-upload.tsx
- sign-in-form.tsx
- leads/[id]/page.tsx
- collections/page.tsx
- safeguards.ts
- Card
- books-2307.test.ts
- app/documents/page.tsx
- funnel.test.ts
- next
- returns-sign-off.test.ts
- money.ts
- payroll/payroll.test.ts
- Rework: one flow from lead to year-end
- portal-statements-approval.test.ts
- books-migration.test.ts
- tests/books.test.ts
- fixed-assets.test.ts
- portal/layout.tsx
- @remixicon/react
- clients/[id]/page.tsx
- seed.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 282 edges
2. `cx` - 217 edges
3. `Skeleton()` - 216 edges
4. `react` - 211 edges
5. `Notice()` - 207 edges
6. `Button()` - 183 edges
7. `next` - 170 edges
8. `Card()` - 159 edges
9. `Badge()` - 148 edges
10. `vitest` - 129 edges

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

## Communities (170 total, 19 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.10
Nodes (42): BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href() (+34 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.10
Nodes (42): Rule, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), toIso() (+34 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "books/export/route.ts"
Cohesion: 0.12
Nodes (25): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+17 more)

### Community 5 - "package.json"
Cohesion: 0.05
Nodes (50): eslintConfig, dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0 (+42 more)

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

### Community 11 - "PageHeader"
Cohesion: 0.10
Nodes (48): CyclePage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey, one() (+40 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (28): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), send() (+20 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (42): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+34 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.14
Nodes (39): ATC_MASTER, AtcInfo, lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS (+31 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "payroll/page.tsx"
Cohesion: 0.33
Nodes (9): GET(), safe(), Payroll(), PayrollPage(), employeesForMonth(), buildEmployeeTemplate(), monthTitle(), byName() (+1 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (31): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+23 more)

### Community 42 - "income.ts"
Cohesion: 0.09
Nodes (72): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+64 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "ui.ts"
Cohesion: 0.06
Nodes (64): blankLine(), InvoiceForm(), InvoiceFormValue, BooksSummaryPage(), Summary(), SummaryCard(), TransactionJournal(), Booking (+56 more)

### Community 45 - "index.ts"
Cohesion: 0.05
Nodes (31): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+23 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.13
Nodes (41): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+33 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (68): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+60 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.06
Nodes (53): BrandSettingsState, BrandFileUpload(), FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT (+45 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.12
Nodes (25): month1601C(), RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart() (+17 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 53 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 54 - "review/page.tsx"
Cohesion: 0.14
Nodes (19): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), Returns(), Queue(), ReviewPage(), Row (+11 more)

### Community 55 - "app/app/page.tsx"
Cohesion: 0.17
Nodes (23): DashboardStats(), FilingTable(), OwnerSections(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary() (+15 more)

### Community 56 - "Centavos"
Cohesion: 0.07
Nodes (46): GridRow, Note, StatementLine, Certificates2316, form2316(), Form2316Employer, Form2316Signatory, mmdd() (+38 more)

### Community 57 - "Skeleton"
Cohesion: 0.09
Nodes (29): react, CustomersRoute(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage() (+21 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (58): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+50 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (66): setupMissingChartsAction(), ClientForm(), BatchUpload(), AccountForm(), AmendmentRequestForm(), ChangeBooksStartForm(), EntryForm(), ReleaseReportForm() (+58 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.16
Nodes (25): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+17 more)

### Community 61 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (31): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+23 more)

### Community 62 - "registrations/forms.tsx"
Cohesion: 0.07
Nodes (53): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+45 more)

### Community 63 - "Badge"
Cohesion: 0.19
Nodes (20): PreviewTable(), ExplainState, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm(), amt(), one(), shiftMonth() (+12 more)

### Community 64 - "cx"
Cohesion: 0.06
Nodes (43): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, InputOtp(), InputOtpProps, Kbd() (+35 more)

### Community 65 - "select.tsx"
Cohesion: 0.08
Nodes (37): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+29 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "fees/schedule.ts"
Cohesion: 0.13
Nodes (24): dateFmt, loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm() (+16 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "server-only"
Cohesion: 0.16
Nodes (17): server-only, @supabase/supabase-js, GET(), digestMessage(), DigestRow, longDay(), peso, time() (+9 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.11
Nodes (33): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+25 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (38): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+30 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.12
Nodes (40): BankAccountsRoute(), booksContext(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column (+32 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ledger/data.ts"
Cohesion: 0.08
Nodes (39): Access, STATUS, Released, CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), Cutoff, cutoffOf() (+31 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (37): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+29 more)

### Community 77 - "proof-actions.ts"
Cohesion: 0.12
Nodes (19): zod, GET(), GET(), code, email, sendSignInEmail(), signInWithGoogle(), verifySignInCode() (+11 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "quote.ts"
Cohesion: 0.11
Nodes (34): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+26 more)

### Community 80 - "workpapers.test.ts"
Cohesion: 0.20
Nodes (8): client(), RegisterRow, approved(), as(), root, as(), bookedDoc(), root

### Community 81 - "supabaseServer"
Cohesion: 0.09
Nodes (56): setClientStatusAction(), explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, addChargeAction(), applyCreditAction(), clearRemittedAction() (+48 more)

### Community 82 - "binder/page.tsx"
Cohesion: 0.19
Nodes (17): Binder(), BinderPage(), one(), TIE_STATUS, advanceFilingAction(), amendFilingAction(), amount, reviewHolding() (+9 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 86 - "approval-memo.tsx"
Cohesion: 0.13
Nodes (18): amt(), ApprovalMemo(), Db, TIE, ReviewNote, approvalMemo(), Memo, MemoInput (+10 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (63): PortalClient, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), HeldNote(), BooksSection(), NavRow() (+55 more)

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
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "public.ts"
Cohesion: 0.11
Nodes (23): acceptProposalAction(), AcceptState, requestQuoteAction(), SERVICES, StartState, Lines(), longDate(), money() (+15 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.15
Nodes (29): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), certificatesFromRaw() (+21 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (46): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+38 more)

### Community 101 - "[token]/page.tsx"
Cohesion: 0.24
Nodes (11): metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage(), Lockup(), Mark() (+3 more)

### Community 102 - "[month]/page.tsx"
Cohesion: 0.16
Nodes (17): PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db (+9 more)

### Community 103 - "[clientId]/page.tsx"
Cohesion: 0.23
Nodes (20): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+12 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "compute.ts"
Cohesion: 0.15
Nodes (29): annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation(), monthlyTable() (+21 more)

### Community 106 - "fees/types.ts"
Cohesion: 0.11
Nodes (22): items, PRICES, schedule, settings, count(), first(), pick(), profileFromQuery() (+14 more)

### Community 107 - "documents/[id]/page.tsx"
Cohesion: 0.14
Nodes (23): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), mergePartyAction(), DOC_TYPES, LockFiling, lockingFiling() (+15 more)

### Community 108 - "form-1601c.ts"
Cohesion: 0.10
Nodes (36): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+28 more)

### Community 109 - "formatAmount"
Cohesion: 0.19
Nodes (17): PortalPrint2307Page(), Print(), portal2307Href(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+9 more)

### Community 110 - "LinkButton"
Cohesion: 0.21
Nodes (13): Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS, NewEntry() (+5 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (35): BooksChart(), compact, longMonth(), short(), shortMonth(), SentRow, BooksCards(), cents() (+27 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "tools/page.tsx"
Cohesion: 0.14
Nodes (27): AmendmentDecision(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+19 more)

### Community 116 - "settlement-pages.tsx"
Cohesion: 0.24
Nodes (15): fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, Kind, Props, SETTLEMENT_KINDS, SettlementEdit() (+7 more)

### Community 118 - "leads/actions.ts"
Cohesion: 0.34
Nodes (13): PLACES, assignReviewerAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+5 more)

### Community 119 - "invoice-pages.tsx"
Cohesion: 0.11
Nodes (29): INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesViewPage(), VoidForm() (+21 more)

### Community 120 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (37): FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText, Filing() (+29 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.09
Nodes (46): loadAssets(), FinancialStatements, normalizeAtc(), withNonDeductible(), dayBefore(), FilingRow, ListedDocument, listInvoices() (+38 more)

### Community 122 - "2316/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.26
Nodes (12): loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView() (+4 more)

### Community 126 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (27): Cycle(), CycleWithClient, DocRow, shift(), MonthComplete(), TimelineRow, CloseCycleButton(), DecideExceptionForm() (+19 more)

### Community 128 - "supabaseAdmin"
Cohesion: 0.23
Nodes (10): GET(), GET(), generateFilingsNow(), GenerateState, GenerateButton(), runMorningEmail(), runOcrAction(), supabaseEnv() (+2 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "mime.ts"
Cohesion: 0.13
Nodes (28): RFC-2047, RFC-2822, EsubmissionMailEnv, esubmissionMailEnv(), accessToken(), call(), headerOf(), MailMessage (+20 more)

### Community 131 - "upload/page.tsx"
Cohesion: 0.36
Nodes (10): one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), addMonths(), ymd(), monthChoices() (+2 more)

### Community 132 - "staff/page.tsx"
Cohesion: 0.27
Nodes (9): roleLabel, StaffList(), StaffPage(), clientUserSchema, email, inviteStaffSchema, loadPoints(), name (+1 more)

### Community 133 - "fields.ts"
Cohesion: 0.08
Nodes (36): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), BatchRow, DocumentCodes (+28 more)

### Community 134 - "work/page.tsx"
Cohesion: 0.15
Nodes (23): SafeguardsNotice(), Action(), MyWork(), MyWorkPage(), short(), TONE, loadBoard(), loadCoverage() (+15 more)

### Community 135 - "manilaToday"
Cohesion: 0.11
Nodes (36): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), portalContext() (+28 more)

### Community 136 - "documents/labels.ts"
Cohesion: 0.09
Nodes (39): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, approveDocumentAction(), Row, Doc (+31 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.04
Nodes (23): pg, vitest, ctx, input, root, root, root, root (+15 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 142 - "book-income.ts"
Cohesion: 0.27
Nodes (9): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, NonDeductibleRow (+1 more)

### Community 143 - "morning.ts"
Cohesion: 0.31
Nodes (9): Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), RISK_LABELS (+1 more)

### Community 144 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 148 - "proof-upload.tsx"
Cohesion: 0.60
Nodes (5): METHODS, ProofUpload(), send(), startProofUpload(), submitProof()

### Community 149 - "sign-in-form.tsx"
Cohesion: 0.36
Nodes (7): SignInState, errors, Form(), LoginPage(), SignInForm(), Divider(), SocialButton()

### Community 150 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (38): NoteState, NotesCard(), ClientNoteForm(), ConvertForm(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), Person (+30 more)

### Community 151 - "collections/page.tsx"
Cohesion: 0.14
Nodes (28): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), ageOpenItems(), AGING_BUCKETS (+20 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.13
Nodes (25): board, MARCO, none, RHEA, row(), steps, documentCutoff(), DONE_FROM_STATUS (+17 more)

### Community 153 - "Card"
Cohesion: 0.12
Nodes (38): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+30 more)

### Community 154 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (24): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+16 more)

### Community 156 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 157 - "next"
Cohesion: 0.07
Nodes (39): nextConfig, next, addClientNoteAction(), send(), markCwtFollowedUpAction(), recomputeWorksheetAction(), GET(), addReturnFile() (+31 more)

### Community 158 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 159 - "money.ts"
Cohesion: 0.18
Nodes (16): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+8 more)

### Community 160 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (42): MonthGrid(), toInput(), BirCategory, Category, categoryTotals(), DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS (+34 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 163 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 164 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 172 - "portal/layout.tsx"
Cohesion: 0.27
Nodes (10): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+2 more)

### Community 173 - "@remixicon/react"
Cohesion: 0.12
Nodes (32): @remixicon/react, file(), RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests() (+24 more)

### Community 174 - "clients/[id]/page.tsx"
Cohesion: 0.06
Nodes (59): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setIncomeTaxMethodAction(), updateClientAction() (+51 more)

### Community 176 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

## Knowledge Gaps
- **20 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1214 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `filings/run.ts`, `mime.ts`, `upload/page.tsx`, `books/export/route.ts`, `package.json`, `fields.ts`, `gemini.ts`, `staff/page.tsx`, `ticked-allocation.test.ts`, `ledger.test.ts`, `settings/actions.ts`, `onboarding/page.tsx`, `statements.ts`, `names.ts`, `db.test.ts`, `leads/[id]/page.tsx`, `collections/page.tsx`, `safeguards.ts`, `Card`, `books-2307.test.ts`, `app/documents/page.tsx`, `funnel.test.ts`, `returns-sign-off.test.ts`, `money.ts`, `payroll/payroll.test.ts`, `portal-statements-approval.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `fixed-assets.test.ts`, `scores/page.tsx`, `portal/layout.tsx`, `ui.ts`, `clients/[id]/page.tsx`, `index.ts`, `lib/books/actions.ts`, `@remixicon/react`, `profile.ts`, `workpapers/load.ts`, `deadlines/page.tsx`, `month.ts`, `review/page.tsx`, `app/app/page.tsx`, `Centavos`, `returns/types.ts`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `registrations/forms.tsx`, `testing.ts`, `server-only`, `parties/[id]/page.tsx`, `ledger/data.ts`, `proof-actions.ts`, `quote.ts`, `workpapers.test.ts`, `approval-memo.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `public.ts`, `opening.ts`, `ledger/books.ts`, `[month]/page.tsx`, `compute.ts`, `fees/types.ts`, `documents/[id]/page.tsx`, `fixed-assets/page.tsx`, `portal/page.tsx`, `acting-approver.test.ts`, `invoice-pages.tsx`, `filings/[id]/page.tsx`, `returns/load.ts`, `batch/register.ts`, `cycle/page.tsx`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10303030303030303 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `supabaseAdmin`, `form-2307.ts`, `upload/page.tsx`, `books/export/route.ts`, `package.json`, `fields.ts`, `manilaToday`, `documents/labels.ts`, `work/page.tsx`, `sign-off-actions.tsx`, `PageHeader`, `onboarding/page.tsx`, `settings/actions.ts`, `statements.ts`, `proof-upload.tsx`, `leads/[id]/page.tsx`, `collections/page.tsx`, `Card`, `app/documents/page.tsx`, `money.ts`, `payroll/page.tsx`, `scores/page.tsx`, `ui.ts`, `@remixicon/react`, `clients/[id]/page.tsx`, `payroll/forms.tsx`, `lib/books/actions.ts`, `portal/layout.tsx`, `profile.ts`, `deadlines/page.tsx`, `review/page.tsx`, `app/app/page.tsx`, `Skeleton`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `registrations/forms.tsx`, `Badge`, `cx`, `fees/schedule.ts`, `server-only`, `parties/[id]/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `ledger/data.ts`, `proof-actions.ts`, `supabaseServer`, `binder/page.tsx`, `approval-memo.tsx`, `portal/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `public.ts`, `payroll/data.ts`, `ledger/books.ts`, `[token]/page.tsx`, `[month]/page.tsx`, `[clientId]/page.tsx`, `documents/[id]/page.tsx`, `formatAmount`, `LinkButton`, `fixed-assets/page.tsx`, `portal/page.tsx`, `tools/page.tsx`, `settlement-pages.tsx`, `leads/actions.ts`, `invoice-pages.tsx`, `filings/[id]/page.tsx`, `2316/page.tsx`, `batch/register.ts`, `quote/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10256410256410256 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `form-2307.ts`, `supabaseAdmin`, `checkbox.tsx`, `upload/page.tsx`, `staff/page.tsx`, `package.json`, `work/page.tsx`, `manilaToday`, `documents/labels.ts`, `notification.tsx`, `sign-off-actions.tsx`, `PageHeader`, `onboarding/page.tsx`, `statements.ts`, `proof-upload.tsx`, `sign-in-form.tsx`, `leads/[id]/page.tsx`, `collections/page.tsx`, `Card`, `app/documents/page.tsx`, `next`, `money.ts`, `payroll/page.tsx`, `scores/page.tsx`, `ui.ts`, `@remixicon/react`, `clients/[id]/page.tsx`, `modal.tsx`, `lib/books/actions.ts`, `payroll/forms.tsx`, `profile.ts`, `portal/layout.tsx`, `deadlines/page.tsx`, `review/page.tsx`, `app/app/page.tsx`, `Notice`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `registrations/forms.tsx`, `Badge`, `cx`, `select.tsx`, `fees/schedule.ts`, `parties/[id]/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `binder/page.tsx`, `button.tsx`, `cx.ts`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `payroll/data.ts`, `social-button.tsx`, `ledger/books.ts`, `[token]/page.tsx`, `[month]/page.tsx`, `[clientId]/page.tsx`, `documents/[id]/page.tsx`, `formatAmount`, `LinkButton`, `fixed-assets/page.tsx`, `portal/page.tsx`, `tools/page.tsx`, `settlement-pages.tsx`, `invoice-pages.tsx`, `filings/[id]/page.tsx`, `2316/page.tsx`, `batch/register.ts`, `quote/page.tsx`, `file-upload.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._