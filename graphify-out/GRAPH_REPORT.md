# Graph Report - agent-a836eb37c27875ba9  (2026-11-25)

## Corpus Check
- 655 files · ~507,042 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 6, (none) 5, .mdc 1)

## Summary
- 4124 nodes · 14176 edges · 179 communities (154 shown, 25 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 120 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `a8591718`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- supabaseServer
- engine.ts
- migrate.yml
- notification.tsx
- money.ts
- devDependencies
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/actions.ts
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
- payroll/payroll.test.ts
- scores/page.tsx
- returns/load.ts
- payroll/types.ts
- formatAmount
- sign-in-form.tsx
- payroll/forms.tsx
- modal.tsx
- manilaToday
- scripts
- profile.ts
- workpapers/load.ts
- deadlines/page.tsx
- registrations/forms.tsx
- registrations/[id]/page.tsx
- Textarea
- Centavos
- books/data.ts
- returns/types.ts
- Notice
- app/settings/page.tsx
- quote/page.tsx
- fixed-assets.test.ts
- workpapers/page.tsx
- tabs.tsx
- cx
- Apple Design
- form-1601c.ts
- testing.ts
- file-upload.tsx
- funnel.test.ts
- books/forms.tsx
- settlement-pages.tsx
- Rules
- Animation Performance
- vitest
- stat-cards.tsx
- safeguards.ts
- theme-toggle.tsx
- quote.ts
- income.ts
- ledger/data.ts
- Badge
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
- steps.ts
- opening.ts
- Recipes
- payroll/data.ts
- BoardUI theming reference
- Pro templates
- PageHeader
- print/page.tsx
- public.ts
- [month]/page.tsx
- items.ts
- boardui
- rates.ts
- requireOwner
- parties/[id]/page.tsx
- db.test.ts
- lib/books/actions.ts
- review-form.tsx
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- clients/[id]/page.tsx
- acting-approver.test.ts
- tools/page.tsx
- staff/page.tsx
- apply-migrations.sh
- showMonth
- module-pages.tsx
- requireStaff
- source.ts
- addDays
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- worksheet/page.tsx
- approval-memo.tsx
- Card
- LinkButton
- checkbox.tsx
- safeguards-load.ts
- documents/labels.ts
- filings/actions.ts
- fields.ts
- binder/page.tsx
- statement-view.tsx
- filters.tsx
- parties/actions.ts
- sign-off-actions.tsx
- ledger.test.ts
- ref_node_path
- social-button.tsx
- proxy.ts
- parties/parties.test.ts
- pg
- ledger-lock.test.ts
- transactions-actions.ts
- payment-forms.tsx
- pending-review.tsx
- ref_node_fs
- copy-opencv.mjs
- lookupAtc
- package.json
- documents/[id]/page.tsx
- any-cutoff.test.ts
- month.ts
- clients/actions.ts
- server-only
- BoardUI page patterns
- index.ts
- register/page.tsx
- Rework: one flow from lead to year-end
- workpapers.test.ts
- react
- app/requests/[id]/page.tsx
- invoice-form.tsx
- month-complete.test.ts
- books-migration.test.ts
- tests/books.test.ts
- status.ts
- adjustments.test.ts
- digest.ts
- eslint.config.mjs
- ledger-closing.test.ts
- tests/parties.test.ts
- tests/payroll.test.ts
- client-reports.test.ts
- payroll-books.test.ts
- workpaper-reviews.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 264 edges
2. `Skeleton()` - 201 edges
3. `react` - 201 edges
4. `Notice()` - 194 edges
5. `cx` - 190 edges
6. `Button()` - 170 edges
7. `next` - 155 edges
8. `Card()` - 153 edges
9. `Badge()` - 148 edges
10. `Input()` - 125 edges

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

## Communities (179 total, 25 thin omitted)

### Community 0 - "supabaseServer"
Cohesion: 0.08
Nodes (33): nextConfig, next, postPayrollAction(), PostState, PostPayrollButton(), Detail(), StatementPage(), markCwtFollowedUpAction() (+25 more)

### Community 1 - "engine.ts"
Cohesion: 0.10
Nodes (42): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+34 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "money.ts"
Cohesion: 0.12
Nodes (24): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+16 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, typescript@^5 (+7 more)

### Community 6 - "gemini.ts"
Cohesion: 0.11
Nodes (18): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, ocrOutputSchema, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL (+10 more)

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

### Community 11 - "documents/actions.ts"
Cohesion: 0.23
Nodes (9): DocReviewActions(), ReplyForm(), ALLOWED, DocActionState, replyDocumentAction(), reviewDocumentAction(), runOcrAction(), StartUpload (+1 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (29): ClientTabs(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+21 more)

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
Nodes (38): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine() (+30 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.12
Nodes (52): incomeAttachments(), Periods, periods(), buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv() (+44 more)

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
Nodes (40): file(), GET(), safe(), GET(), monthlyTable(), monthlyWithholding(), employeesForMonth(), buildEmployeeTemplate() (+32 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "returns/load.ts"
Cohesion: 0.09
Nodes (31): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), FinancialStatements, BookIncome, bookIncome() (+23 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "formatAmount"
Cohesion: 0.12
Nodes (31): BooksSummaryPage(), Summary(), SummaryCard(), TransactionJournal(), BookingFields(), BooksChoices(), TaxCode, taxOn() (+23 more)

### Community 45 - "sign-in-form.tsx"
Cohesion: 0.19
Nodes (15): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+7 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (50): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+42 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (32): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+24 more)

### Community 48 - "manilaToday"
Cohesion: 0.11
Nodes (31): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+23 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.16
Nodes (19): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote (+11 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 53 - "registrations/forms.tsx"
Cohesion: 0.09
Nodes (36): ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), FormState, openClientCaseAction(), openYearRenewalsAction(), caseNote, caseTitle (+28 more)

### Community 54 - "registrations/[id]/page.tsx"
Cohesion: 0.18
Nodes (24): StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+16 more)

### Community 55 - "Textarea"
Cohesion: 0.16
Nodes (24): NewRequestForm(), TicketForm(), ReplyForm(), send(), METHODS, ProofUpload(), send(), Textarea() (+16 more)

### Community 56 - "Centavos"
Cohesion: 0.08
Nodes (53): GridRow, EntryLineOut, Note, StatementLine, AlphaCols, AlphalistAgent, AlphalistRow, buildAlphalist() (+45 more)

### Community 57 - "books/data.ts"
Cohesion: 0.13
Nodes (16): MonthSelect(), PaymentsViewPage(), ReceiptsViewPage(), SettlementView(), AllocationRow, InvoiceLineRow, InvoiceRow, loadAllocations() (+8 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (54): client, SawtResult, Split, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal (+46 more)

### Community 59 - "Notice"
Cohesion: 0.12
Nodes (56): ClientForm(), BatchUpload(), PreviewTable(), EntryForm(), ReleaseReportForm(), SetupForm(), OpeningAssetForm(), EmployeeForm() (+48 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (29): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), periodWord (+21 more)

### Community 61 - "quote/page.tsx"
Cohesion: 0.07
Nodes (67): convertLeadAction(), LeadState, refresh(), sendProposalAction(), setFunnelOpenAction(), setLeadStatusAction(), activateAction(), createFromTemplateAction() (+59 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "cx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "form-1601c.ts"
Cohesion: 0.10
Nodes (30): alphaCols(), Alphalist, alphalistCsv(), alphalistDat(), branch4(), csvCell(), datDate(), prevDat() (+22 more)

### Community 68 - "testing.ts"
Cohesion: 0.12
Nodes (27): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+19 more)

### Community 69 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 70 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (43): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+35 more)

### Community 72 - "settlement-pages.tsx"
Cohesion: 0.14
Nodes (35): booksContext(), BooksContext, fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList() (+27 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vitest"
Cohesion: 0.14
Nodes (21): vitest, ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, loadAssets(), Row, Asset (+13 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.10
Nodes (27): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+19 more)

### Community 77 - "safeguards.ts"
Cohesion: 0.11
Nodes (27): Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board (+19 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.06
Nodes (61): EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+53 more)

### Community 80 - "income.ts"
Cohesion: 0.11
Nodes (55): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+47 more)

### Community 81 - "ledger/data.ts"
Cohesion: 0.15
Nodes (18): codes, PNL, Amendment, AmendmentStatus, BooksClient, BooksMonth, cents(), ClientBooks (+10 more)

### Community 82 - "Badge"
Cohesion: 0.12
Nodes (31): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, FilingTable(), ApprovalMemo(), Event, eventText (+23 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.06
Nodes (27): ClientTab, UNDER, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter() (+19 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (40): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+32 more)

### Community 87 - "statements/page.tsx"
Cohesion: 0.15
Nodes (19): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+11 more)

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
Cohesion: 0.09
Nodes (29): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+21 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 93 - "steps.ts"
Cohesion: 0.13
Nodes (24): Agency, birForm(), BranchOptions, CaseStep, ClosureOptions, dayNumber(), daysBetween(), daysOpen() (+16 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.16
Nodes (27): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), certificatesFromRaw() (+19 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "PageHeader"
Cohesion: 0.14
Nodes (23): @remixicon/react, ClientList(), ClientsPage(), Row, CyclePage(), FilingsTabsFor(), Section, SECTIONS (+15 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (47): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+39 more)

### Community 101 - "public.ts"
Cohesion: 0.07
Nodes (41): FunnelSwitch(), LeadPage(), TYPE_LABEL, Leads(), LeadsPage(), acceptProposalAction(), AcceptState, metadata (+33 more)

### Community 102 - "[month]/page.tsx"
Cohesion: 0.19
Nodes (15): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p(), PayrollRuns(), Run (+7 more)

### Community 103 - "items.ts"
Cohesion: 0.16
Nodes (14): MonthGrid(), toInput(), entry(), P(), BirCategory, Category, categoryTotals(), DEDUCTION_FIELDS (+6 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+12 more)

### Community 106 - "requireOwner"
Cohesion: 0.12
Nodes (30): zod@^4.6.7, zod, addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso (+22 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.19
Nodes (16): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, PARTY_ROLES (+8 more)

### Community 108 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 109 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (23): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+15 more)

### Community 110 - "review-form.tsx"
Cohesion: 0.14
Nodes (18): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, PendingTaxCodes, postDocumentToBooks() (+10 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 113 - "clients/[id]/page.tsx"
Cohesion: 0.33
Nodes (12): StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm(), IncomeTaxMethodForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton() (+4 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "tools/page.tsx"
Cohesion: 0.17
Nodes (22): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+14 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 118 - "showMonth"
Cohesion: 0.10
Nodes (42): Cycle(), CycleWithClient, DocRow, shift(), PayrollDocument(), MonthComplete(), SentRow, TimelineRow (+34 more)

### Community 119 - "module-pages.tsx"
Cohesion: 0.11
Nodes (26): JournalEntryRoute(), dayBefore(), INVOICE_LABEL, JournalView(), Props, SettingsPage(), SettingsRoute(), payslips() (+18 more)

### Community 120 - "requireStaff"
Cohesion: 0.10
Nodes (39): DashboardStats(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), Queue() (+31 more)

### Community 121 - "source.ts"
Cohesion: 0.15
Nodes (22): row(), amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND, DocumentRow, fromBooksRow(), fromRegisterLine() (+14 more)

### Community 122 - "addDays"
Cohesion: 0.15
Nodes (24): Action(), MyWork(), MyWorkPage(), short(), TONE, addDays(), isWeekend(), parseIso() (+16 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "worksheet/page.tsx"
Cohesion: 0.12
Nodes (21): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+13 more)

### Community 126 - "approval-memo.tsx"
Cohesion: 0.16
Nodes (15): amt(), Db, TIE, approvalMemo(), Memo, MemoInput, MemoMonth, ALWAYS (+7 more)

### Community 127 - "Card"
Cohesion: 0.20
Nodes (19): ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents(), DocumentsPage() (+11 more)

### Community 128 - "LinkButton"
Cohesion: 0.24
Nodes (15): Batch(), BatchPage(), one(), toCentavos(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page() (+7 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "safeguards-load.ts"
Cohesion: 0.24
Nodes (12): TaxType, CoverageClient, coverageGaps(), Gap, GapKind, BoardRow, holidaySet(), loadCoverage() (+4 more)

### Community 131 - "documents/labels.ts"
Cohesion: 0.10
Nodes (33): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+25 more)

### Community 132 - "filings/actions.ts"
Cohesion: 0.19
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 133 - "fields.ts"
Cohesion: 0.16
Nodes (16): ok, FieldKey, keys, normalizeAmount(), normalizeFields(), normalizePartyKind(), normalizeTerms(), normalizeTin() (+8 more)

### Community 134 - "binder/page.tsx"
Cohesion: 0.26
Nodes (14): amt(), CertificatesTable(), PartsLink(), PurchasesTable(), SalesTable(), th(), amt(), Binder() (+6 more)

### Community 135 - "statement-view.tsx"
Cohesion: 0.16
Nodes (20): Detail(), PortalStatementDetail(), Latest(), PortalStatement(), Detail(), PayNow(), proofBadge, proofMethod (+12 more)

### Community 136 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 137 - "parties/actions.ts"
Cohesion: 0.16
Nodes (21): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), runOcr(), SKIP (+13 more)

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_path"
Cohesion: 0.13
Nodes (3): root, root, root

### Community 141 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "parties/parties.test.ts"
Cohesion: 0.22
Nodes (15): displayName(), fullAddress(), listNameCols(), Party, partyTinLabel(), person, ABBREVIATIONS, nameTokens() (+7 more)

### Community 144 - "pg"
Cohesion: 0.12
Nodes (5): pg, root, root, root, root

### Community 146 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 147 - "payment-forms.tsx"
Cohesion: 0.28
Nodes (14): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+6 more)

### Community 148 - "pending-review.tsx"
Cohesion: 0.12
Nodes (23): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), Codes, initialCodes() (+15 more)

### Community 149 - "ref_node_fs"
Cohesion: 0.14
Nodes (5): ctx, input, root, root, Row

### Community 150 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 151 - "lookupAtc"
Cohesion: 0.29
Nodes (10): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+2 more)

### Community 152 - "package.json"
Cohesion: 0.18
Nodes (10): @techstark/opencv-js@4.12.0-release.1, tsx@^4.23.15, @types/react-dom@^19, name, packageManager, private, version, @techstark/opencv-js (+2 more)

### Community 153 - "documents/[id]/page.tsx"
Cohesion: 0.33
Nodes (7): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), pendingDocumentTaxCodes(), LockFiling, lockingFiling()

### Community 154 - "any-cutoff.test.ts"
Cohesion: 0.50
Nodes (3): as(), client(), root

### Community 155 - "month.ts"
Cohesion: 0.25
Nodes (9): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), PLAIN, plainForm(), none, TimelineFiling (+1 more)

### Community 156 - "clients/actions.ts"
Cohesion: 0.06
Nodes (49): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+41 more)

### Community 157 - "server-only"
Cohesion: 0.15
Nodes (19): server-only, GET(), GET(), generateFilingsNow(), GenerateState, GenerateButton(), runActingDigest(), sendEmail() (+11 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 159 - "index.ts"
Cohesion: 0.11
Nodes (16): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+8 more)

### Community 160 - "register/page.tsx"
Cohesion: 0.11
Nodes (32): Href, LineParts(), one(), Register(), RegisterPage(), shiftMonth(), SOURCE, client() (+24 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.15
Nodes (12): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+4 more)

### Community 162 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 163 - "react"
Cohesion: 0.08
Nodes (44): react, BankAccountsRoute(), EmployeesRoute(), InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind (+36 more)

### Community 164 - "app/requests/[id]/page.tsx"
Cohesion: 0.21
Nodes (17): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+9 more)

### Community 165 - "invoice-form.tsx"
Cohesion: 0.40
Nodes (7): blankLine(), InvoiceForm(), fmt(), SettlementForm(), SelectItem(), Pick(), PickOption

### Community 167 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 168 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 169 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 171 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 172 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 173 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1141 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `LinkButton`, `supabaseServer`, `checkbox.tsx`, `documents/labels.ts`, `notification.tsx`, `binder/page.tsx`, `statement-view.tsx`, `filters.tsx`, `sign-off-actions.tsx`, `documents/actions.ts`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `transactions-actions.ts`, `payment-forms.tsx`, `pending-review.tsx`, `package.json`, `documents/[id]/page.tsx`, `clients/actions.ts`, `server-only`, `register/page.tsx`, `app/requests/[id]/page.tsx`, `invoice-form.tsx`, `scores/page.tsx`, `formatAmount`, `sign-in-form.tsx`, `payroll/forms.tsx`, `modal.tsx`, `manilaToday`, `profile.ts`, `deadlines/page.tsx`, `registrations/forms.tsx`, `registrations/[id]/page.tsx`, `Textarea`, `books/data.ts`, `Notice`, `app/settings/page.tsx`, `quote/page.tsx`, `workpapers/page.tsx`, `tabs.tsx`, `cx`, `file-upload.tsx`, `books/forms.tsx`, `settlement-pages.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `quote.ts`, `Badge`, `button.tsx`, `cx.ts`, `[clientId]/page.tsx`, `statements/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `payroll/data.ts`, `PageHeader`, `print/page.tsx`, `public.ts`, `[month]/page.tsx`, `requireOwner`, `parties/[id]/page.tsx`, `review-form.tsx`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `tools/page.tsx`, `staff/page.tsx`, `showMonth`, `module-pages.tsx`, `requireStaff`, `addDays`, `batch/register.ts`, `worksheet/page.tsx`, `Card`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `supabaseServer` be split into smaller, more focused modules?**
  _Cohesion score 0.083710407239819 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `engine.ts`, `money.ts`, `devDependencies`, `gemini.ts`, `onboarding/page.tsx`, `statements.ts`, `payroll/payroll.test.ts`, `scores/page.tsx`, `returns/load.ts`, `formatAmount`, `sign-in-form.tsx`, `manilaToday`, `profile.ts`, `deadlines/page.tsx`, `registrations/forms.tsx`, `Centavos`, `returns/types.ts`, `app/settings/page.tsx`, `quote/page.tsx`, `fixed-assets.test.ts`, `testing.ts`, `funnel.test.ts`, `safeguards.ts`, `quote.ts`, `ledger/data.ts`, `[clientId]/page.tsx`, `statements/page.tsx`, `document-scanner.tsx`, `steps.ts`, `opening.ts`, `print/page.tsx`, `public.ts`, `[month]/page.tsx`, `rates.ts`, `db.test.ts`, `fixed-assets/page.tsx`, `acting-approver.test.ts`, `showMonth`, `module-pages.tsx`, `requireStaff`, `source.ts`, `batch/register.ts`, `worksheet/page.tsx`, `approval-memo.tsx`, `safeguards-load.ts`, `filings/actions.ts`, `fields.ts`, `filters.tsx`, `ledger.test.ts`, `ref_node_path`, `parties/parties.test.ts`, `pg`, `ledger-lock.test.ts`, `pending-review.tsx`, `ref_node_fs`, `package.json`, `documents/[id]/page.tsx`, `any-cutoff.test.ts`, `month.ts`, `clients/actions.ts`, `server-only`, `index.ts`, `register/page.tsx`, `workpapers.test.ts`, `app/requests/[id]/page.tsx`, `month-complete.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `status.ts`, `adjustments.test.ts`, `digest.ts`, `ledger-closing.test.ts`, `tests/parties.test.ts`, `tests/payroll.test.ts`, `client-reports.test.ts`, `payroll-books.test.ts`, `workpaper-reviews.test.ts`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0963265306122449 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `LinkButton`, `documents/labels.ts`, `filings/actions.ts`, `binder/page.tsx`, `statement-view.tsx`, `parties/actions.ts`, `sign-off-actions.tsx`, `documents/actions.ts`, `onboarding/page.tsx`, `proxy.ts`, `dependencies`, `transactions-actions.ts`, `payment-forms.tsx`, `pending-review.tsx`, `package.json`, `documents/[id]/page.tsx`, `clients/actions.ts`, `server-only`, `register/page.tsx`, `react`, `app/requests/[id]/page.tsx`, `payroll/payroll.test.ts`, `scores/page.tsx`, `formatAmount`, `sign-in-form.tsx`, `payroll/forms.tsx`, `manilaToday`, `profile.ts`, `deadlines/page.tsx`, `registrations/forms.tsx`, `registrations/[id]/page.tsx`, `Textarea`, `books/data.ts`, `app/settings/page.tsx`, `quote/page.tsx`, `workpapers/page.tsx`, `cx`, `books/forms.tsx`, `settlement-pages.tsx`, `vitest`, `theme-toggle.tsx`, `quote.ts`, `ledger/data.ts`, `Badge`, `cx.ts`, `[clientId]/page.tsx`, `statements/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `payroll/data.ts`, `PageHeader`, `print/page.tsx`, `public.ts`, `[month]/page.tsx`, `requireOwner`, `parties/[id]/page.tsx`, `lib/books/actions.ts`, `review-form.tsx`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `tools/page.tsx`, `showMonth`, `module-pages.tsx`, `requireStaff`, `addDays`, `batch/register.ts`, `worksheet/page.tsx`, `approval-memo.tsx`, `Card`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._