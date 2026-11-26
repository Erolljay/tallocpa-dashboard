# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 892 files · ~707,702 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5537 nodes · 19342 edges · 178 communities (155 shown, 23 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 174 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `a0903bfa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- client
- migrate.yml
- tax-codes.ts
- public.ts
- package.json
- clients/[id]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- react
- Sign-in & Setup Docs
- cx
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- income.ts
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- ledger/data.ts
- scores/page.tsx
- compare.ts
- year.ts
- filings/actions.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- deadlines/page.tsx
- scripts
- supabaseAdmin
- quote/page.tsx
- payroll/payroll.test.ts
- getIdentity
- module-pages.tsx
- marketing/page.tsx
- payroll/data.ts
- registrations/forms.tsx
- money.ts
- Notice
- tieouts.ts
- arap.ts
- morning.ts
- year-end/page.tsx
- brand/forms.tsx
- invoice-pages.tsx
- Apple Design
- supabaseServer
- testing.ts
- branches/page.tsx
- return-file-actions.ts
- books/forms.tsx
- form-1601c.ts
- Rules
- Animation Performance
- site-document.tsx
- stat-cards.tsx
- cycle/page.tsx
- @remixicon/react
- parallel-run.tsx
- sign-in-form.tsx
- how-we-work/page.tsx
- settings/actions.ts
- link-button.tsx
- Pro components
- 2316/page.tsx
- tools/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/forms.tsx
- filed-returns.ts
- Recipes
- binder/page.tsx
- BoardUI page patterns
- Pro templates
- formatAmount
- ledger/books.ts
- filings/run.ts
- combobox.tsx
- messages.ts
- boardui
- params.ts
- profile.ts
- filings/[id]/page.tsx
- template.ts
- db.test.ts
- ref_node_fs
- Opening balances: checklist for any cut-off
- ledger-closing.test.ts
- Card
- lib/books/actions.ts
- [clientId]/page.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- vat.ts
- proposal-view.tsx
- returns/types.ts
- tests/payroll.test.ts
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- toCentavos
- parties/[id]/page.tsx
- read.test.ts
- opening.ts
- mime.ts
- fields.ts
- onboarding/page.tsx
- gemini.ts
- fixed-assets/page.tsx
- rates.ts
- Skeleton
- ticked-allocation.test.ts
- contribution-payables.test.ts
- ledger.test.ts
- notification-bell.tsx
- bulk-actions.ts
- idle-watcher.tsx
- portal-reports.test.ts
- Centavos
- register/page.tsx
- server-only
- ledger/types.ts
- blocks.tsx
- safeguards.ts
- workpapers/page.tsx
- app/documents/page.tsx
- quote.ts
- leads/[id]/page.tsx
- Badge
- Rework: one flow from lead to year-end
- calendar/page.tsx
- returns/books.test.ts
- social-button.tsx
- opengraph-image.tsx
- lead-attribution.test.ts
- booksContext
- Building UIs with BoardUI
- app/settings/page.tsx
- acting-approver.test.ts
- fixed-assets.test.ts
- parallel-run.test.ts
- returns-sign-off.test.ts
- documents/[id]/page.tsx
- vitest
- tests/books.test.ts
- books/reports/statements/page.tsx
- generate-qap-fixture.mjs
- funnel.test.ts
- returns-books.test.ts
- books-migration.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 311 edges
2. `cx` - 286 edges
3. `react` - 254 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 233 edges
6. `next` - 209 edges
7. `Button()` - 204 edges
8. `Card()` - 166 edges
9. `Badge()` - 165 edges
10. `vitest` - 165 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `worksheet()` --indirect_call--> `fromBooksRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/returns/source.ts
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

## Communities (178 total, 23 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (55): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page() (+47 more)

### Community 1 - "client"
Cohesion: 0.09
Nodes (12): BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), doc(), root (+4 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "tax-codes.ts"
Cohesion: 0.18
Nodes (15): SettingsPage(), SettingsRoute(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES (+7 more)

### Community 4 - "public.ts"
Cohesion: 0.12
Nodes (28): proposal(), jobGroupOf(), jobOptions(), buildQuote(), catchUpFor(), cents(), feeTax(), instantView() (+20 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "clients/[id]/page.tsx"
Cohesion: 0.06
Nodes (51): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setIncomeTaxMethodAction(), setupMissingChartsAction() (+43 more)

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

### Community 11 - "react"
Cohesion: 0.12
Nodes (25): react, PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage() (+17 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.03
Nodes (87): NotificationFilterTabs(), NotificationRowData, AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps (+79 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+13 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (42): CASH_FLOW_CLASSES, defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES, FsLine (+34 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (62): BIR_LINES, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+54 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 25 - "Vercel Cron Config"
Cohesion: 0.50
Nodes (3): crons, regions, $schema

### Community 40 - "ledger/data.ts"
Cohesion: 0.14
Nodes (24): dayBefore(), GET(), safe(), Released, fromWorkbookData(), buildBookWorkbook(), accountFromRow(), Amendment (+16 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.06
Nodes (62): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, OcrRate, OwnerSections() (+54 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (50): atcRows(), BookInvoiceRow, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC (+42 more)

### Community 43 - "year.ts"
Cohesion: 0.07
Nodes (55): GridRow, Certificates2316, form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear(), Payroll2316Raw (+47 more)

### Community 44 - "filings/actions.ts"
Cohesion: 0.15
Nodes (20): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+12 more)

### Community 45 - "index.ts"
Cohesion: 0.06
Nodes (20): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+12 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (65): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+57 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (40): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), ButtonLinkProps (+32 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.15
Nodes (27): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+19 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+25 more)

### Community 51 - "quote/page.tsx"
Cohesion: 0.09
Nodes (51): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+43 more)

### Community 52 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (43): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+35 more)

### Community 53 - "getIdentity"
Cohesion: 0.09
Nodes (38): Row, PortalRequests(), Requests(), Row, when(), DocumentUpload(), send(), upload() (+30 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.07
Nodes (58): BankAccountsRoute(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+50 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (58): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+50 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.10
Nodes (36): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), certificatesFromRaw() (+28 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (89): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+81 more)

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (55): incomePayment(), agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel(), EwtLine (+47 more)

### Community 59 - "Notice"
Cohesion: 0.07
Nodes (94): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm() (+86 more)

### Community 60 - "tieouts.ts"
Cohesion: 0.13
Nodes (15): RegisterLine, LedgerTotals, purchases(), sales(), base, books, buy, sale (+7 more)

### Community 61 - "arap.ts"
Cohesion: 0.15
Nodes (20): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+12 more)

### Community 62 - "morning.ts"
Cohesion: 0.17
Nodes (15): digestMessage(), DigestRow, longDay(), peso, time(), Email, line(), longDay() (+7 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.06
Nodes (56): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+48 more)

### Community 64 - "brand/forms.tsx"
Cohesion: 0.20
Nodes (16): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+8 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.09
Nodes (38): INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage() (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "supabaseServer"
Cohesion: 0.04
Nodes (81): nextConfig, next, setClientStatusAction(), EditClient(), EditClientPage(), addOpeningAssetAction(), AssetState, refresh() (+73 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "branches/page.tsx"
Cohesion: 0.20
Nodes (14): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), BranchRowForm(), Branches(), BranchesPage() (+6 more)

### Community 70 - "return-file-actions.ts"
Cohesion: 0.27
Nodes (16): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+8 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.13
Nodes (44): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+36 more)

### Community 72 - "form-1601c.ts"
Cohesion: 0.11
Nodes (32): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+24 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "site-document.tsx"
Cohesion: 0.12
Nodes (14): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), SiteNotFound(), geist (+6 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (29): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+21 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.06
Nodes (55): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+47 more)

### Community 79 - "parallel-run.tsx"
Cohesion: 0.20
Nodes (17): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), Parties(), PartyRow() (+9 more)

### Community 80 - "sign-in-form.tsx"
Cohesion: 0.20
Nodes (14): code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode(), errors, Form() (+6 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "settings/actions.ts"
Cohesion: 0.12
Nodes (26): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+18 more)

### Community 83 - "link-button.tsx"
Cohesion: 0.10
Nodes (26): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "2316/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 86 - "tools/page.tsx"
Cohesion: 0.18
Nodes (20): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), ReverseForm() (+12 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.13
Nodes (47): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote() (+39 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.13
Nodes (23): amt(), ApprovalMemo(), Db, TIE, loadAssets(), Row, Adjustment, c() (+15 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (29): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, ComboBoxItem(), SelectItem() (+21 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/forms.tsx"
Cohesion: 0.15
Nodes (32): PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+24 more)

### Community 94 - "filed-returns.ts"
Cohesion: 0.23
Nodes (10): FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear(), TaxTypeGroup (+2 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "formatAmount"
Cohesion: 0.12
Nodes (33): blankLine(), InvoiceForm(), InvoiceFormValue, Message(), OpeningAssetForm(), RunDepreciationButton(), SetupAssetForm(), Booking (+25 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+39 more)

### Community 101 - "filings/run.ts"
Cohesion: 0.07
Nodes (58): generatePastFilingsAction(), Rule, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso() (+50 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.04
Nodes (79): react-aria-components, SheetPreview(), ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps (+71 more)

### Community 103 - "messages.ts"
Cohesion: 0.38
Nodes (5): cycleMessage(), dayFmt, NoticeKind, showDay(), Due

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "params.ts"
Cohesion: 0.20
Nodes (14): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+6 more)

### Community 106 - "profile.ts"
Cohesion: 0.07
Nodes (39): COLUMNS, EXPIRING, fmtMonth(), birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema (+31 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (44): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus, Event (+36 more)

### Community 108 - "template.ts"
Cohesion: 0.10
Nodes (21): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, billedWhen(), BOOKKEEPING_LABEL, DOCUMENT_BANDS (+13 more)

### Community 110 - "ref_node_fs"
Cohesion: 0.08
Nodes (10): outDir, pkgDir, require, { version }, dir, ctx, input, root (+2 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 113 - "Card"
Cohesion: 0.07
Nodes (51): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, TimelineRow (+43 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.11
Nodes (38): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+30 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.09
Nodes (49): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+41 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.20
Nodes (16): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+8 more)

### Community 118 - "vat.ts"
Cohesion: 0.15
Nodes (39): incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, addMonths() (+31 more)

### Community 119 - "proposal-view.tsx"
Cohesion: 0.10
Nodes (25): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+17 more)

### Community 120 - "returns/types.ts"
Cohesion: 0.05
Nodes (65): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+57 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (41): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+33 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.10
Nodes (39): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Missing() (+31 more)

### Community 126 - "toCentavos"
Cohesion: 0.13
Nodes (27): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+19 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (60): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+52 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (78): RFC-4180, geminiJson(), BirCategory, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf() (+70 more)

### Community 129 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 130 - "mime.ts"
Cohesion: 0.10
Nodes (37): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, esubmissionMailEnv(), GoogleCalendarEnv, supabaseEnv(), DatFiles (+29 more)

### Community 131 - "fields.ts"
Cohesion: 0.09
Nodes (29): ACCOUNT_SOURCES, Readiness, checkFields(), Issue, num(), msgs(), ok, FieldKey (+21 more)

### Community 132 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (32): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+24 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (19): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+11 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.25
Nodes (16): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), accumulated(), bookFor() (+8 more)

### Community 135 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 136 - "Skeleton"
Cohesion: 0.09
Nodes (43): Batch(), BatchPage(), one(), toCentavos(), NewEntry(), NewEntryPage(), ReportsRoute(), NewEmployee() (+35 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (78): GET(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus(), onVisible() (+70 more)

### Community 141 - "bulk-actions.ts"
Cohesion: 0.15
Nodes (19): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), DocumentCodes (+11 more)

### Community 142 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 144 - "Centavos"
Cohesion: 0.10
Nodes (23): BirLineKey, AtcComparison, Bucket, DocumentDifference, Figure, PartyComparison, SaleSplit, BookIncome (+15 more)

### Community 145 - "register/page.tsx"
Cohesion: 0.11
Nodes (38): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+30 more)

### Community 146 - "server-only"
Cohesion: 0.10
Nodes (44): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), decideExceptionAction(), tellPreparer() (+36 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.13
Nodes (24): Access, OpeningChecklist(), STATUS, Asset, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES (+16 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (98): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+90 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.08
Nodes (46): Action(), MyWork(), short(), TONE, board, MARCO, none, RHEA (+38 more)

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.15
Nodes (23): ClientSelect(), PeriodFilter(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy() (+15 more)

### Community 157 - "quote.ts"
Cohesion: 0.07
Nodes (52): PriceRow, EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient (+44 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (36): NotesCard(), FunnelSwitch(), bookedTime, Lead(), LeadPage(), LeadSource(), LeadTouch, Person (+28 more)

### Community 159 - "Badge"
Cohesion: 0.07
Nodes (53): ClientList(), DashboardStats(), FilingTable(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs() (+45 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.11
Nodes (37): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), Interval, manilaInstant() (+29 more)

### Community 165 - "returns/books.test.ts"
Cohesion: 0.11
Nodes (13): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+5 more)

### Community 166 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 169 - "booksContext"
Cohesion: 0.38
Nodes (9): booksContext(), one(), Print(), Print2307Page(), ParallelRun(), ParallelRunPage(), quarterMonths(), monthName() (+1 more)

### Community 170 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.13
Nodes (31): appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage(), accountSchema (+23 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 178 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 181 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (39): zod, file(), GET(), safe(), Payroll(), PayrollPage(), BOOKED_TYPES, DocumentReviewPage() (+31 more)

### Community 183 - "vitest"
Cohesion: 0.04
Nodes (21): pg, vitest, root, root, root, root, root, root (+13 more)

### Community 185 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 189 - "books/reports/statements/page.tsx"
Cohesion: 0.24
Nodes (14): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+6 more)

### Community 196 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 201 - "funnel.test.ts"
Cohesion: 0.15
Nodes (5): HASH, LEAD, root, root, Row

### Community 203 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1470 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `form-2307.ts`, `tax-codes.ts`, `onboarding/page.tsx`, `package.json`, `clients/[id]/page.tsx`, `fixed-assets/page.tsx`, `Skeleton`, `notification-bell.tsx`, `cx`, `idle-watcher.tsx`, `dependencies`, `register/page.tsx`, `statements.ts`, `blocks.tsx`, `safeguards.ts`, `workpapers/page.tsx`, `app/documents/page.tsx`, `quote.ts`, `leads/[id]/page.tsx`, `Badge`, `calendar/page.tsx`, `social-button.tsx`, `booksContext`, `scores/page.tsx`, `app/settings/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `getIdentity`, `module-pages.tsx`, `documents/[id]/page.tsx`, `payroll/data.ts`, `marketing/page.tsx`, `registrations/forms.tsx`, `Notice`, `books/reports/statements/page.tsx`, `year-end/page.tsx`, `brand/forms.tsx`, `invoice-pages.tsx`, `supabaseServer`, `branches/page.tsx`, `return-file-actions.ts`, `books/forms.tsx`, `site-document.tsx`, `stat-cards.tsx`, `cycle/page.tsx`, `@remixicon/react`, `parallel-run.tsx`, `sign-in-form.tsx`, `how-we-work/page.tsx`, `settings/actions.ts`, `link-button.tsx`, `2316/page.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/forms.tsx`, `binder/page.tsx`, `formatAmount`, `ledger/books.ts`, `combobox.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `Card`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `returns/types.ts`, `batch/register.ts`, `manilaToday`, `toCentavos`, `parties/[id]/page.tsx`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07800511508951406 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `client`, `tax-codes.ts`, `public.ts`, `package.json`, `clients/[id]/page.tsx`, `statements.ts`, `scores/page.tsx`, `compare.ts`, `year.ts`, `filings/actions.ts`, `index.ts`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `payroll/payroll.test.ts`, `getIdentity`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `money.ts`, `tieouts.ts`, `arap.ts`, `morning.ts`, `year-end/page.tsx`, `invoice-pages.tsx`, `supabaseServer`, `testing.ts`, `branches/page.tsx`, `cycle/page.tsx`, `@remixicon/react`, `settings/actions.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `filed-returns.ts`, `ledger/books.ts`, `filings/run.ts`, `messages.ts`, `params.ts`, `profile.ts`, `filings/[id]/page.tsx`, `template.ts`, `db.test.ts`, `ref_node_fs`, `ledger-closing.test.ts`, `Card`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `returns/types.ts`, `tests/payroll.test.ts`, `batch/register.ts`, `toCentavos`, `parties/[id]/page.tsx`, `read.test.ts`, `opening.ts`, `mime.ts`, `fields.ts`, `onboarding/page.tsx`, `gemini.ts`, `fixed-assets/page.tsx`, `rates.ts`, `ticked-allocation.test.ts`, `contribution-payables.test.ts`, `ledger.test.ts`, `notification-bell.tsx`, `bulk-actions.ts`, `idle-watcher.tsx`, `portal-reports.test.ts`, `register/page.tsx`, `server-only`, `ledger/types.ts`, `blocks.tsx`, `safeguards.ts`, `app/documents/page.tsx`, `quote.ts`, `leads/[id]/page.tsx`, `Badge`, `calendar/page.tsx`, `returns/books.test.ts`, `lead-attribution.test.ts`, `app/settings/page.tsx`, `acting-approver.test.ts`, `fixed-assets.test.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `documents/[id]/page.tsx`, `tests/books.test.ts`, `funnel.test.ts`, `returns-books.test.ts`, `books-migration.test.ts`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `mime.ts`, `onboarding/page.tsx`, `package.json`, `clients/[id]/page.tsx`, `fixed-assets/page.tsx`, `Skeleton`, `react`, `notification-bell.tsx`, `bulk-actions.ts`, `idle-watcher.tsx`, `dependencies`, `cx`, `register/page.tsx`, `server-only`, `ledger/types.ts`, `blocks.tsx`, `safeguards.ts`, `workpapers/page.tsx`, `app/documents/page.tsx`, `quote.ts`, `leads/[id]/page.tsx`, `Badge`, `opengraph-image.tsx`, `ledger/data.ts`, `booksContext`, `scores/page.tsx`, `filings/actions.ts`, `app/settings/page.tsx`, `payroll/forms.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `getIdentity`, `module-pages.tsx`, `documents/[id]/page.tsx`, `payroll/data.ts`, `marketing/page.tsx`, `registrations/forms.tsx`, `Notice`, `books/reports/statements/page.tsx`, `year-end/page.tsx`, `brand/forms.tsx`, `invoice-pages.tsx`, `branches/page.tsx`, `return-file-actions.ts`, `books/forms.tsx`, `site-document.tsx`, `cycle/page.tsx`, `@remixicon/react`, `parallel-run.tsx`, `sign-in-form.tsx`, `settings/actions.ts`, `2316/page.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `workpapers/load.ts`, `intake-picker.tsx`, `form-2316.tsx`, `leads/forms.tsx`, `binder/page.tsx`, `formatAmount`, `ledger/books.ts`, `profile.ts`, `filings/[id]/page.tsx`, `Card`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `returns/types.ts`, `batch/register.ts`, `manilaToday`, `toCentavos`, `parties/[id]/page.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._