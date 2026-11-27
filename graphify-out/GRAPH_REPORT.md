# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1006 files · ~836,236 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6176 nodes · 22017 edges · 191 communities (171 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 190 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `df1e07ca`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LinkButton
- index.ts
- migrate.yml
- formatAmount
- fees/types.ts
- package.json
- auth.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/labels.ts
- Sign-in & Setup Docs
- money.ts
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
- cwt-tracker.ts
- scores/page.tsx
- compare.ts
- documents/[id]/page.tsx
- form-1604e.ts
- documents/labels.ts
- [month]/page.tsx
- modal.tsx
- public.ts
- scripts
- supabaseAdmin
- branches/page.tsx
- Card
- webhook.ts
- module-pages.tsx
- worksheet/page.tsx
- settlement-pages.tsx
- proposal-view.tsx
- returns/types.ts
- steps.ts
- calendar/page.tsx
- ledger/data.ts
- payroll/types.ts
- lock-bar.tsx
- workpapers/page.tsx
- marketing/page.tsx
- Apple Design
- generate.ts
- testing.ts
- quote/page.tsx
- lib/books/actions.ts
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- invoice-pages.tsx
- theme-toggle.tsx
- cwt-2307-tracker.test.ts
- review-form.tsx
- how-we-work/page.tsx
- collections/forms.tsx
- cx
- Pro components
- requireStaff
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- notification-bell.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- workpapers/load.ts
- PageHeader
- Recipes
- tools/page.tsx
- BoardUI theming reference
- Pro templates
- filings/actions.ts
- Centavos
- ledger/types.ts
- combobox.tsx
- rates.ts
- boardui
- layout.ts
- Centavos
- contact-access.test.ts
- leads/forms.tsx
- Card
- client
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- collections/page.tsx
- react
- apply-migrations.sh
- quote/page.tsx
- quote.ts
- book/actions.ts
- leads/[id]/page.tsx
- Centavos
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- collections/actions.ts
- tin.ts
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- work/load.ts
- tax-codes.ts
- gemini.ts
- fixed-assets/page.tsx
- sign-off.ts
- clients/[id]/page.tsx
- ticked-allocation.test.ts
- transactions-actions.ts
- fields.ts
- proposal/[token]/page.tsx
- payroll/forms.tsx
- public.ts
- safeguards.ts
- messages.ts
- memo.ts
- server-only
- opening.ts
- template.ts
- theme-toggle.tsx
- blocks.tsx
- step-files.tsx
- ledger.test.ts
- brand/forms.tsx
- [clientId]/page.tsx
- move-bar.tsx
- bundle-tools.tsx
- form-2307.tsx
- transactions-actions.ts
- onboarding/forms.tsx
- cx
- Rework: one flow from lead to year-end
- google/calendar.ts
- late-submitters.ts
- app/documents/page.tsx
- collections/actions.ts
- register/page.tsx
- opengraph-image.tsx
- cx
- getIdentity
- books/periods.ts
- tieouts.test.ts
- requireOwner
- cycle/page.tsx
- notification-actions.tsx
- acting-approver.test.ts
- ocr/run.ts
- split-bundled-pdfs.test.ts
- return-files.tsx
- BoardUI page patterns
- ref_node_fs
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- onboarding/checklist.ts
- package.json
- eslint.config.mjs
- binder/page.tsx
- names.ts
- db.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 393 edges
2. `cx` - 308 edges
3. `react` - 280 edges
4. `Notice()` - 265 edges
5. `Skeleton()` - 258 edges
6. `Button()` - 248 edges
7. `next` - 242 edges
8. `vitest` - 193 edges
9. `Card()` - 186 edges
10. `Badge()` - 186 edges

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

## Communities (191 total, 20 thin omitted)

### Community 0 - "LinkButton"
Cohesion: 0.10
Nodes (46): booksContext(), BooksContext, booksViewFor(), one(), Certificates(), Staff2307Page(), Print(), Print2307Page() (+38 more)

### Community 1 - "index.ts"
Cohesion: 0.02
Nodes (63): pg, vitest, dir, acct(), ADVANCES_FROM, ASSETS, build(), CONTRA (+55 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "formatAmount"
Cohesion: 0.08
Nodes (52): fmtMonth(), BooksFrame(), WithdrawReportButton(), Payslips(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard() (+44 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.09
Nodes (31): acceptProposalAction(), AcceptState, instantView(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+23 more)

### Community 5 - "package.json"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "auth.ts"
Cohesion: 0.06
Nodes (67): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+59 more)

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

### Community 11 - "documents/labels.ts"
Cohesion: 0.10
Nodes (30): Doc, DocumentsCard(), when(), ExceptionRow, BundleDocument(), DocumentReviewPage(), loadBundle(), Review() (+22 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "money.ts"
Cohesion: 0.10
Nodes (33): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+25 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (35): defaultCashFlow(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section, Statement, add() (+27 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (80): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), annualAttachments(), balanceSheet(), compute1701() (+72 more)

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

### Community 40 - "cwt-tracker.ts"
Cohesion: 0.09
Nodes (48): Cwt2307TrackerPage(), Tracker(), amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), PortalCwt2307Page() (+40 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (70): ParallelRun(), ParallelRunPage(), quarterMonths(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Atcs() (+62 more)

### Community 43 - "documents/[id]/page.tsx"
Cohesion: 0.07
Nodes (50): BOOKED_TYPES, BundleChild, PayrollDocument(), Supabase, applyColumnsAction(), done(), payrollDocument(), PayrollReadState (+42 more)

### Community 44 - "form-1604e.ts"
Cohesion: 0.08
Nodes (51): branchOfTin(), payeeKeyOf(), tin9(), tinDashed(), tinDigits(), tinHasBranch(), agentBackground(), agentErrors() (+43 more)

### Community 45 - "documents/labels.ts"
Cohesion: 0.14
Nodes (25): one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), AttachBatchImage(), attach(), DocumentUpload() (+17 more)

### Community 46 - "[month]/page.tsx"
Cohesion: 0.15
Nodes (21): checkRegister(), fmt(), ID_HEADERS, norm(), normalizeTin(), parseName(), registerHeaders(), tinDigits() (+13 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "public.ts"
Cohesion: 0.06
Nodes (37): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+29 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.11
Nodes (36): generateFilingsNow(), generatePastFilingsAction(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction() (+28 more)

### Community 51 - "branches/page.tsx"
Cohesion: 0.32
Nodes (10): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), AddBranchForm(), BranchRowForm(), Branches() (+2 more)

### Community 52 - "Card"
Cohesion: 0.06
Nodes (55): ClientTabs(), ClientReturnsPage(), FilingRow, Returns(), FilingListRow, SignOffState, worksheetTaxDue(), bookKind (+47 more)

### Community 53 - "webhook.ts"
Cohesion: 0.08
Nodes (49): maxDuration, POST(), TelegramEnv, telegramEnv(), ClaimedNotification, TelegramApi, telegramApi(), ALLOWED (+41 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.08
Nodes (38): BankAccountsRoute(), SearchParams, BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), JournalRoute() (+30 more)

### Community 55 - "worksheet/page.tsx"
Cohesion: 0.39
Nodes (8): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage()

### Community 56 - "settlement-pages.tsx"
Cohesion: 0.13
Nodes (28): fmtDate(), InvoiceView(), JournalView(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsListPage() (+20 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.29
Nodes (11): jobName(), lineName(), longDate(), money(), php, ProposalView(), Rows(), Section() (+3 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (60): FinancialStatements, oldDocs(), client, row(), withNonDeductible(), BUSINESS_TAX_FORMS, form1601C, form1604C (+52 more)

### Community 59 - "steps.ts"
Cohesion: 0.04
Nodes (119): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+111 more)

### Community 60 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (19): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), Interval, manilaInstant(), appBookedEvents() (+11 more)

### Community 61 - "ledger/data.ts"
Cohesion: 0.12
Nodes (26): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+18 more)

### Community 62 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.14
Nodes (23): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+15 more)

### Community 64 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+14 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.05
Nodes (67): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+59 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.05
Nodes (72): Rule, PlannedObligation, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso() (+64 more)

### Community 68 - "testing.ts"
Cohesion: 0.14
Nodes (24): form1701, form1702RT, year, form1701Q, form1702Q, individual, form2551Q, individual (+16 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.11
Nodes (41): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+33 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.14
Nodes (25): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+17 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (38): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+30 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.07
Nodes (72): MonthGrid(), toInput(), AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory (+64 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.09
Nodes (46): qapBuckets(), sawtBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo() (+38 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "invoice-pages.tsx"
Cohesion: 0.12
Nodes (23): INVOICE_KINDS, InvoiceEdit(), InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage() (+15 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 79 - "cwt-2307-tracker.test.ts"
Cohesion: 0.04
Nodes (24): outDir, pkgDir, require, { version }, ctx, input, api, ctx (+16 more)

### Community 80 - "review-form.tsx"
Cohesion: 0.10
Nodes (37): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList(), Row (+29 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.13
Nodes (33): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+25 more)

### Community 82 - "collections/forms.tsx"
Cohesion: 0.18
Nodes (22): clearRemittedAction(), ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), LateSurchargeActions() (+14 more)

### Community 83 - "cx"
Cohesion: 0.04
Nodes (59): ClientTab, UNDER, AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps (+51 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "requireStaff"
Cohesion: 0.12
Nodes (38): EmployerCard(), RemittancesDue(), MonthRemittances(), GET(), ListRow, ORDER, Remittance(), RemittancePage() (+30 more)

### Community 86 - "Notice"
Cohesion: 0.07
Nodes (97): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm(), EntryForm() (+89 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (65): PortalClient, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat() (+57 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notification-bell.tsx"
Cohesion: 0.20
Nodes (14): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+6 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.10
Nodes (30): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+22 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.28
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Item(), mmddyyyy(), PartyFields() (+5 more)

### Community 93 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (19): RegisterLine, Adjustment, PeriodFile, MemoMonth, MonthActivity, Signoff, AssetTotals, LedgerTotals (+11 more)

### Community 94 - "PageHeader"
Cohesion: 0.07
Nodes (54): CyclePage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey, Remittances() (+46 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "tools/page.tsx"
Cohesion: 0.15
Nodes (25): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), RepostRegisterButton() (+17 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "filings/actions.ts"
Cohesion: 0.15
Nodes (21): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+13 more)

### Community 100 - "Centavos"
Cohesion: 0.08
Nodes (35): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_KINDS, BOOK_TITLES (+27 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.08
Nodes (38): Access, STATUS, BookEntry, CASH_FLOW_CLASSES, CashFlowClass, codes, PNL, COA_TEMPLATES (+30 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (77): react-aria-components, SheetPreview(), CHIP_COLORS, ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps (+69 more)

### Community 103 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "layout.ts"
Cohesion: 0.12
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 106 - "Centavos"
Cohesion: 0.12
Nodes (21): BOOK_ABBR, BookLine, Column, ColumnarBook, ColumnarRow, COLUMNS, JournalRow, LedgerSection (+13 more)

### Community 107 - "contact-access.test.ts"
Cohesion: 0.08
Nodes (6): root, HASH, LEAD, root, root, root

### Community 108 - "leads/forms.tsx"
Cohesion: 0.08
Nodes (53): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+45 more)

### Community 109 - "Card"
Cohesion: 0.09
Nodes (45): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), GET(), safe(), EmployeeForm(), Release2316Form() (+37 more)

### Community 110 - "client"
Cohesion: 0.08
Nodes (18): as(), client(), root, send(), as(), purchase(), root, doc() (+10 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.07
Nodes (53): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, StandingRow (+45 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (29): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+21 more)

### Community 115 - "collections/page.tsx"
Cohesion: 0.16
Nodes (26): Client, CollectionsPage(), OpenDue, Overview(), Stat(), ageOpenItems(), AGING_BUCKETS, AgingBucket (+18 more)

### Community 116 - "react"
Cohesion: 0.10
Nodes (36): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+28 more)

### Community 118 - "quote/page.tsx"
Cohesion: 0.17
Nodes (18): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), complexity() (+10 more)

### Community 119 - "quote.ts"
Cohesion: 0.08
Nodes (47): loadTaxOnFee(), PriceRow, EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile, estimateProfile() (+39 more)

### Community 120 - "book/actions.ts"
Cohesion: 0.21
Nodes (16): cancelMeetingAction(), cancelMyMeetingAction(), CancelState, BookingState, calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason() (+8 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (32): NotesCard(), ProposalSent, bookedTime, Lead(), LeadPage(), LeadTouch, Person, sentDate (+24 more)

### Community 122 - "Centavos"
Cohesion: 0.11
Nodes (33): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+25 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (38): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+30 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.09
Nodes (49): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), accessFor() (+41 more)

### Community 126 - "collections/actions.ts"
Cohesion: 0.21
Nodes (18): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+10 more)

### Community 127 - "tin.ts"
Cohesion: 0.22
Nodes (14): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), PARTY_COLUMNS, blank(), optionalText(), PartyInput (+6 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (80): RFC-4180, geminiJson(), BirCategory, ITEM_KINDS, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES (+72 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.09
Nodes (29): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+21 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.14
Nodes (29): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, esubmissionMailEnv(), accessToken(), call(), findReplies() (+21 more)

### Community 131 - "work/load.ts"
Cohesion: 0.11
Nodes (29): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), REQUEST_FILE_MAX, REQUEST_FILE_TYPES (+21 more)

### Community 132 - "tax-codes.ts"
Cohesion: 0.12
Nodes (29): blankLine(), InvoiceForm(), InvoiceFormValue, fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, BookingFields() (+21 more)

### Community 133 - "gemini.ts"
Cohesion: 0.08
Nodes (22): OcrManyOutput, OCR_DOC_TYPES, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+14 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 135 - "sign-off.ts"
Cohesion: 0.09
Nodes (38): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+30 more)

### Community 136 - "clients/[id]/page.tsx"
Cohesion: 0.06
Nodes (59): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+51 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 139 - "fields.ts"
Cohesion: 0.08
Nodes (39): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+31 more)

### Community 140 - "proposal/[token]/page.tsx"
Cohesion: 0.24
Nodes (11): PortalReport(), Report(), when(), metadata, Proposal(), ProposalPage(), FinancialStatementsView(), StatementTable() (+3 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.12
Nodes (40): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+32 more)

### Community 142 - "public.ts"
Cohesion: 0.06
Nodes (72): addClientNoteAction(), NoteState, markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), setPartyVerifiedAction(), setPresetAccountAction() (+64 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.07
Nodes (62): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+54 more)

### Community 144 - "messages.ts"
Cohesion: 0.20
Nodes (10): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, showDay() (+2 more)

### Community 145 - "memo.ts"
Cohesion: 0.21
Nodes (11): ReviewNote, Memo, MemoInput, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), SIGNED_REFS (+3 more)

### Community 146 - "server-only"
Cohesion: 0.12
Nodes (33): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+25 more)

### Community 147 - "opening.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 148 - "template.ts"
Cohesion: 0.07
Nodes (37): ProposalData, corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, ProposalJob (+29 more)

### Community 149 - "theme-toggle.tsx"
Cohesion: 0.19
Nodes (15): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor() (+7 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (104): nextConfig, next, GlobalNotFound(), metadata, metadata, QuotesClosed(), Start(), StartPage() (+96 more)

### Community 151 - "step-files.tsx"
Cohesion: 0.43
Nodes (7): addStepFile(), removeStepFile(), startStepFileUpload(), FileChip(), StepFile, StepFileUpload(), send()

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "brand/forms.tsx"
Cohesion: 0.29
Nodes (12): markReadLocally(), useBellData(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), Counter() (+4 more)

### Community 154 - "[clientId]/page.tsx"
Cohesion: 0.21
Nodes (13): GET(), isNotificationKind(), BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), latestNotifications(), loadBellData() (+5 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.32
Nodes (13): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+5 more)

### Community 156 - "bundle-tools.tsx"
Cohesion: 0.33
Nodes (10): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+2 more)

### Community 157 - "form-2307.tsx"
Cohesion: 0.26
Nodes (13): Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set(), padded(), PartyFields() (+5 more)

### Community 158 - "transactions-actions.ts"
Cohesion: 0.29
Nodes (7): Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, KIND_ORDER, AmountField

### Community 159 - "onboarding/forms.tsx"
Cohesion: 0.12
Nodes (30): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+22 more)

### Community 160 - "cx"
Cohesion: 0.42
Nodes (10): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+2 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "google/calendar.ts"
Cohesion: 0.11
Nodes (37): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+29 more)

### Community 163 - "late-submitters.ts"
Cohesion: 0.42
Nodes (6): isAlwaysLate(), isLateMonth(), LATE_SUBMITTER_RULES, LateSubmitter, lateSubmitters(), ScorecardRow

### Community 164 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (38): ApprovedReview(), ApprovedRow, ClientSelect(), loadBooking(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList() (+30 more)

### Community 165 - "collections/actions.ts"
Cohesion: 0.24
Nodes (13): Content(), NotificationsPage(), Content(), PortalNotificationsPage(), Empty(), NotificationsView(), one(), SearchParams (+5 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "cx"
Cohesion: 0.08
Nodes (36): @remixicon/react, ZoomPreview(), switchBusinessAction(), BusinessSwitcher(), SwitcherBusiness, ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, BusinessBar() (+28 more)

### Community 169 - "getIdentity"
Cohesion: 0.11
Nodes (35): zod@^4.6.7, zod, file(), send(), uploadRequestFile(), ReturnStandingForm(), StandingUpload(), send() (+27 more)

### Community 170 - "books/periods.ts"
Cohesion: 0.43
Nodes (6): BooksMonthRow, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 171 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 172 - "requireOwner"
Cohesion: 0.08
Nodes (56): ActingState, appointActingAction(), endActingAction(), refresh(), addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange() (+48 more)

### Community 173 - "cycle/page.tsx"
Cohesion: 0.16
Nodes (23): Cycle(), CycleWithClient, DocRow, shift(), CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+15 more)

### Community 174 - "notification-actions.tsx"
Cohesion: 0.15
Nodes (20): notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, IconComponent, Tab(), TabList() (+12 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "ocr/run.ts"
Cohesion: 0.15
Nodes (21): isSplittable(), MAX_BUNDLE_PAGES, ocrManySchema, OcrPart, page, pdfPageCount(), planRead(), ReadPlan (+13 more)

### Community 178 - "return-files.tsx"
Cohesion: 0.17
Nodes (23): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+15 more)

### Community 180 - "BoardUI page patterns"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 182 - "ref_node_fs"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "onboarding/checklist.ts"
Cohesion: 0.14
Nodes (6): root, Row, HASH, LEAD, root, Row

### Community 187 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 193 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 200 - "names.ts"
Cohesion: 0.09
Nodes (32): parseMany(), checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso() (+24 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1629 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `blocks.tsx` to `LinkButton`, `formatAmount`, `fees/types.ts`, `auth.ts`, `documents/labels.ts`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/[id]/page.tsx`, `documents/labels.ts`, `public.ts`, `supabaseAdmin`, `branches/page.tsx`, `Card`, `webhook.ts`, `module-pages.tsx`, `worksheet/page.tsx`, `settlement-pages.tsx`, `steps.ts`, `calendar/page.tsx`, `ledger/data.ts`, `lock-bar.tsx`, `workpapers/page.tsx`, `marketing/page.tsx`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `invoice-pages.tsx`, `review-form.tsx`, `collections/forms.tsx`, `cx`, `requireStaff`, `Notice`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `PageHeader`, `tools/page.tsx`, `filings/actions.ts`, `Centavos`, `ledger/types.ts`, `leads/forms.tsx`, `Card`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `collections/page.tsx`, `react`, `quote/page.tsx`, `quote.ts`, `book/actions.ts`, `leads/[id]/page.tsx`, `Centavos`, `batch/register.ts`, `statement.ts`, `collections/actions.ts`, `tin.ts`, `social-button.tsx`, `return-file-actions.ts`, `work/load.ts`, `tax-codes.ts`, `fixed-assets/page.tsx`, `sign-off.ts`, `clients/[id]/page.tsx`, `transactions-actions.ts`, `fields.ts`, `proposal/[token]/page.tsx`, `payroll/forms.tsx`, `public.ts`, `safeguards.ts`, `server-only`, `step-files.tsx`, `brand/forms.tsx`, `[clientId]/page.tsx`, `move-bar.tsx`, `bundle-tools.tsx`, `form-2307.tsx`, `onboarding/forms.tsx`, `google/calendar.ts`, `app/documents/page.tsx`, `collections/actions.ts`, `register/page.tsx`, `opengraph-image.tsx`, `cx`, `getIdentity`, `requireOwner`, `cycle/page.tsx`, `notification-actions.tsx`, `return-files.tsx`, `package.json`, `binder/page.tsx`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LinkButton` be split into smaller, more focused modules?**
  _Cohesion score 0.09818819403857393 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `index.ts` to `LinkButton`, `formatAmount`, `fees/types.ts`, `package.json`, `auth.ts`, `money.ts`, `statements.ts`, `income.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/[id]/page.tsx`, `form-1604e.ts`, `supabaseAdmin`, `Card`, `webhook.ts`, `module-pages.tsx`, `returns/types.ts`, `steps.ts`, `calendar/page.tsx`, `ledger/data.ts`, `lock-bar.tsx`, `marketing/page.tsx`, `generate.ts`, `testing.ts`, `quote/page.tsx`, `payroll/payroll.test.ts`, `invoice-pages.tsx`, `cwt-2307-tracker.test.ts`, `review-form.tsx`, `requireStaff`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `notification-bell.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `workpapers/load.ts`, `PageHeader`, `filings/actions.ts`, `Centavos`, `ledger/types.ts`, `rates.ts`, `layout.ts`, `contact-access.test.ts`, `client`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `collections/page.tsx`, `quote/page.tsx`, `quote.ts`, `book/actions.ts`, `leads/[id]/page.tsx`, `Centavos`, `batch/register.ts`, `read.test.ts`, `social-button.tsx`, `return-file-actions.ts`, `work/load.ts`, `gemini.ts`, `fixed-assets/page.tsx`, `sign-off.ts`, `clients/[id]/page.tsx`, `ticked-allocation.test.ts`, `fields.ts`, `safeguards.ts`, `messages.ts`, `memo.ts`, `server-only`, `opening.ts`, `template.ts`, `blocks.tsx`, `ledger.test.ts`, `move-bar.tsx`, `onboarding/forms.tsx`, `google/calendar.ts`, `late-submitters.ts`, `app/documents/page.tsx`, `register/page.tsx`, `cx`, `books/periods.ts`, `tieouts.test.ts`, `requireOwner`, `cycle/page.tsx`, `acting-approver.test.ts`, `ocr/run.ts`, `split-bundled-pdfs.test.ts`, `BoardUI page patterns`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `onboarding/checklist.ts`, `package.json`, `names.ts`, `db.test.ts`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.022058334994352533 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `LinkButton`, `formatAmount`, `auth.ts`, `documents/labels.ts`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/[id]/page.tsx`, `documents/labels.ts`, `modal.tsx`, `public.ts`, `supabaseAdmin`, `branches/page.tsx`, `Card`, `module-pages.tsx`, `worksheet/page.tsx`, `settlement-pages.tsx`, `steps.ts`, `calendar/page.tsx`, `lock-bar.tsx`, `workpapers/page.tsx`, `marketing/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `invoice-pages.tsx`, `theme-toggle.tsx`, `review-form.tsx`, `how-we-work/page.tsx`, `collections/forms.tsx`, `cx`, `requireStaff`, `Notice`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `PageHeader`, `tools/page.tsx`, `Centavos`, `ledger/types.ts`, `combobox.tsx`, `leads/forms.tsx`, `Card`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `collections/page.tsx`, `quote/page.tsx`, `quote.ts`, `leads/[id]/page.tsx`, `Centavos`, `statement.ts`, `social-button.tsx`, `work/load.ts`, `tax-codes.ts`, `fixed-assets/page.tsx`, `sign-off.ts`, `clients/[id]/page.tsx`, `transactions-actions.ts`, `fields.ts`, `proposal/[token]/page.tsx`, `payroll/forms.tsx`, `public.ts`, `safeguards.ts`, `template.ts`, `theme-toggle.tsx`, `blocks.tsx`, `step-files.tsx`, `brand/forms.tsx`, `[clientId]/page.tsx`, `move-bar.tsx`, `bundle-tools.tsx`, `onboarding/forms.tsx`, `cx`, `google/calendar.ts`, `app/documents/page.tsx`, `collections/actions.ts`, `register/page.tsx`, `cx`, `getIdentity`, `requireOwner`, `cycle/page.tsx`, `notification-actions.tsx`, `return-files.tsx`, `package.json`, `binder/page.tsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._