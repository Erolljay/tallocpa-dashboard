# Graph Report - agent-a1e17f57c46de1eee  (2026-11-27)

## Corpus Check
- 962 files · ~791,470 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: .css 10, (none) 5, .woff2 3)

## Summary
- 5967 nodes · 21114 edges · 213 communities (185 shown, 28 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 188 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `ab62c26b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- payroll-read.tsx
- migrate.yml
- ui.ts
- manilaToday
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- FormModule
- Sign-in & Setup Docs
- notification-actions.tsx
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
- employees-xlsx.ts
- button.tsx
- documents/[id]/page.tsx
- payroll/forms.tsx
- modal.tsx
- marketing/page.tsx
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- remittances/[id]/page.tsx
- webhook.ts
- Skeleton
- deadlines/page.tsx
- [month]/page.tsx
- ledger/data.ts
- returns/types.ts
- PageHeader
- requireStaff
- books/export/route.ts
- marketing/attribution.ts
- lock-bar.tsx
- copy-opencv.mjs
- settlement-pages.tsx
- Apple Design
- filings/run.ts
- testing.ts
- alphalist.ts
- lib/books/actions.ts
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- react
- @remixicon/react
- vitest
- invoice-pages.tsx
- how-we-work/page.tsx
- Badge
- cx
- Pro components
- tax-codes.ts
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- parts.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- payroll/payroll.test.ts
- work/page.tsx
- Recipes
- tools/page.tsx
- BoardUI theming reference
- Pro templates
- [clientId]/page.tsx
- ledger/books.ts
- opening-checklist.tsx
- combobox.tsx
- rates.ts
- boardui
- report-periods.ts
- app/requests/[id]/page.tsx
- filings/[id]/page.tsx
- cycle/page.tsx
- client
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- collections.ts
- calendar/staff.ts
- apply-migrations.sh
- settings/actions.ts
- quote.ts
- returns/load.ts
- leads/actions.ts
- ref_node_fs
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- Centavos
- ocr/run.ts
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- LinkButton
- move-bar.tsx
- gemini.ts
- fixed-assets/page.tsx
- notification-settings-view.tsx
- supabaseServer
- ticked-allocation.test.ts
- invoice-form.tsx
- review-form.tsx
- app/settings/notifications/page.tsx
- idle-watcher.tsx
- workpapers/load.ts
- safeguards.ts
- filings/actions.ts
- formatAmount
- server-only
- toCentavos
- transactions-actions.ts
- notifications-view.tsx
- blocks.tsx
- portal/reports/cwt-2307/page.tsx
- ledger.test.ts
- workpapers/page.tsx
- notifications/format.ts
- app/documents/page.tsx
- requireOwner
- queries.ts
- Card
- review/page.tsx
- notification-bell.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- layout.ts
- filed-returns.ts
- register/page.tsx
- opengraph-image.tsx
- cycle/actions.ts
- bell-store.ts
- clients/actions.ts
- sign-off-actions.tsx
- app/settings/page.tsx
- holiday-list.ts
- onboarding/actions.ts
- acting-approver.test.ts
- morning.ts
- books-ready.ts
- receipts.ts
- proof-actions.ts
- lead-attribution.test.ts
- register-xlsx.ts
- BoardUI page patterns
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- sign-in-form.tsx
- site-document.tsx
- firm/parallel-run/page.tsx
- leads-pipeline.test.ts
- parallel-run.test.ts
- books-migration.test.ts
- tests/books.test.ts
- ledger-closing.test.ts
- eslint.config.mjs
- books-2307.test.ts
- notifications.test.ts
- register-books.test.ts
- adjustments.test.ts
- binder/page.tsx
- missing-2307/page.tsx
- approve-and-post.test.ts
- batch-upload.test.ts
- generate-qap-fixture.mjs
- db.test.ts
- templates/README.md
- split-bundled-pdfs.test.ts
- funnel.test.ts
- telegram-uploads.test.ts
- ref_node_path
- client-reports.test.ts
- portal-reports.test.ts
- tasks-and-request-owners.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 370 edges
2. `cx` - 304 edges
3. `react` - 272 edges
4. `Notice()` - 258 edges
5. `Skeleton()` - 254 edges
6. `Button()` - 236 edges
7. `next` - 234 edges
8. `Badge()` - 182 edges
9. `Card()` - 182 edges
10. `vitest` - 182 edges

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

## Communities (213 total, 28 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (46): Print(), Print2307Page(), load2307Staff(), PortalPrint2307Page(), Print(), one(), portal2307(), portal2307Href() (+38 more)

### Community 1 - "payroll-read.tsx"
Cohesion: 0.07
Nodes (51): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+43 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (49): BooksContext, booksViewFor(), fmtMonth(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate() (+41 more)

### Community 4 - "manilaToday"
Cohesion: 0.09
Nodes (43): ProposalSetup, COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+35 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.15
Nodes (20): addClientFile(), startClientFileUpload(), ClientFileForm(), send(), RemoveFileButton(), TickForm(), fmtDate(), Onboarding() (+12 more)

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

### Community 11 - "FormModule"
Cohesion: 0.14
Nodes (12): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, form1601C (+4 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "notification-actions.tsx"
Cohesion: 0.15
Nodes (20): notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, IconComponent, Tab(), TabList() (+12 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+11 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (35): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), add(), buildStatements(), classOf() (+27 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (66): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+58 more)

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
Cohesion: 0.11
Nodes (36): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), Rematch2307Button(), addMonths(), buildTracker() (+28 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (51): atcRows(), BookInvoiceRow, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC (+43 more)

### Community 43 - "employees-xlsx.ts"
Cohesion: 0.11
Nodes (20): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+12 more)

### Community 44 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "documents/[id]/page.tsx"
Cohesion: 0.07
Nodes (53): Doc, when(), ExceptionRow, addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice() (+45 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (52): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+44 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.09
Nodes (31): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+23 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (30): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), BookingState, slotsFor() (+22 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.10
Nodes (41): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+33 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.14
Nodes (33): GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances(), RemittancesPage() (+25 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (43): maxDuration, POST(), TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked(), Choice (+35 more)

### Community 54 - "Skeleton"
Cohesion: 0.09
Nodes (49): BankAccountsRoute(), booksContext(), fmtDate(), one(), SearchParams, BooksFrame(), BooksList(), Column (+41 more)

### Community 55 - "deadlines/page.tsx"
Cohesion: 0.12
Nodes (32): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+24 more)

### Community 56 - "[month]/page.tsx"
Cohesion: 0.15
Nodes (22): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+14 more)

### Community 57 - "ledger/data.ts"
Cohesion: 0.09
Nodes (36): Accounts(), AccountsPage(), GROUPS, BookEntry, CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes (+28 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (67): client, INPUTS, MONTH, PAYSLIP_COLUMNS, payslipCsv(), payslipSchedule(), agentBackground(), agentErrors() (+59 more)

### Community 59 - "PageHeader"
Cohesion: 0.05
Nodes (96): ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction(), caseNote (+88 more)

### Community 60 - "requireStaff"
Cohesion: 0.14
Nodes (37): HandlesContributionsSwitch(), RemittanceButton(), RemittanceFileUpload(), send(), requireStaff(), addRemittanceFile(), approveRemittanceAction(), generateRemittancesAction() (+29 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.12
Nodes (28): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+20 more)

### Community 62 - "marketing/attribution.ts"
Cohesion: 0.13
Nodes (34): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+26 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.16
Nodes (22): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+14 more)

### Community 64 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 65 - "settlement-pages.tsx"
Cohesion: 0.10
Nodes (28): PaymentsNewPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), ReceiptsViewPage(), OpenInvoice, SettlementFormValue (+20 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.08
Nodes (48): Rule, addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule (+40 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "alphalist.ts"
Cohesion: 0.14
Nodes (25): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+17 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (26): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+18 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (39): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+31 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.08
Nodes (47): EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+39 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.14
Nodes (41): incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, addMonths() (+33 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (37): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+29 more)

### Community 77 - "react"
Cohesion: 0.10
Nodes (34): react, FormState, frequencyLabel, Props, StaffOptions(), EmployerCard(), AssignForm(), ClientUserForm() (+26 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.05
Nodes (59): react-dom@19.3.0, react-dom, @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel (+51 more)

### Community 79 - "vitest"
Cohesion: 0.05
Nodes (14): pg, vitest, root, root, root, root, root, root (+6 more)

### Community 80 - "invoice-pages.tsx"
Cohesion: 0.11
Nodes (27): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage() (+19 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.13
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "Badge"
Cohesion: 0.16
Nodes (22): BrandFileUpload(), FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm() (+14 more)

### Community 83 - "cx"
Cohesion: 0.03
Nodes (83): ZoomPreview(), AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles (+75 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tax-codes.ts"
Cohesion: 0.18
Nodes (15): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+7 more)

### Community 86 - "Notice"
Cohesion: 0.06
Nodes (108): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+100 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.13
Nodes (41): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), BooksSection(), NavRow() (+33 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "parts.ts"
Cohesion: 0.10
Nodes (23): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, one() (+15 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.09
Nodes (36): metadata, QuotesClosed(), Start(), StartPage(), Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState (+28 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (28): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+20 more)

### Community 93 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (48): GridRow, MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion() (+40 more)

### Community 94 - "work/page.tsx"
Cohesion: 0.09
Nodes (44): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey, one(), PartiesPage() (+36 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "tools/page.tsx"
Cohesion: 0.15
Nodes (23): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), RepostRegisterButton(), ReverseForm(), OpeningChecklist() (+15 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "[clientId]/page.tsx"
Cohesion: 0.20
Nodes (20): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+12 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (45): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+37 more)

### Community 101 - "opening-checklist.tsx"
Cohesion: 0.18
Nodes (15): Access, STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput, ChecklistItem (+7 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (73): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps, ComboBoxSelectionMode (+65 more)

### Community 103 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "report-periods.ts"
Cohesion: 0.23
Nodes (18): basePeriod(), HeldNote(), holdsWhat(), taxableYearStart(), PortalBooks, BooksYear, booksYears(), iso() (+10 more)

### Community 106 - "app/requests/[id]/page.tsx"
Cohesion: 0.09
Nodes (47): file(), RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), PortalRequests(), Requests(), when() (+39 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (43): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), FilingRow, Returns(), DashboardStats(), FilingListRow (+35 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.10
Nodes (38): DocumentsCard(), Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER (+30 more)

### Community 109 - "client"
Cohesion: 0.08
Nodes (15): BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), as(), purchase() (+7 more)

### Community 110 - "index.ts"
Cohesion: 0.06
Nodes (21): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+13 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.13
Nodes (19): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+11 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (26): FormState, ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd(), YearEndPage(), yearStartOf() (+18 more)

### Community 115 - "collections.ts"
Cohesion: 0.14
Nodes (28): Client, CollectionsPage(), OpenDue, Overview(), Stat(), ageOpenItems(), AGING_BUCKETS, AgingBucket (+20 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (37): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+29 more)

### Community 118 - "settings/actions.ts"
Cohesion: 0.18
Nodes (17): zod, addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState (+9 more)

### Community 119 - "quote.ts"
Cohesion: 0.04
Nodes (88): PriceRow, corp, items, proposal(), EstimatedProfile, estimateProfile(), gapFor(), has() (+80 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.07
Nodes (55): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+47 more)

### Community 121 - "leads/actions.ts"
Cohesion: 0.21
Nodes (19): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), convertLeadAction(), LeadState, markLostAction() (+11 more)

### Community 122 - "ref_node_fs"
Cohesion: 0.11
Nodes (13): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+5 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (45): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+37 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.11
Nodes (31): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail(), PayNow(), credit() (+23 more)

### Community 126 - "Centavos"
Cohesion: 0.11
Nodes (20): AtcComparison, Bucket, DocumentDifference, Figure, PartyComparison, SaleSplit, NonDeductibleRow, SawtResult (+12 more)

### Community 127 - "ocr/run.ts"
Cohesion: 0.08
Nodes (50): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), normalizeTin(), REREAD_APPROVED, SKIP, withDirectory() (+42 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (75): RFC-4180, geminiJson(), BirCategory, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf() (+67 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "LinkButton"
Cohesion: 0.26
Nodes (13): Certificates(), Staff2307Page(), print2307Href(), Certificates(), Form2316Page(), Portal2307(), Portal2307Page(), fmtDate() (+5 more)

### Community 132 - "move-bar.tsx"
Cohesion: 0.28
Nodes (13): ApprovedReview(), moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem (+5 more)

### Community 133 - "gemini.ts"
Cohesion: 0.06
Nodes (39): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+31 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.11
Nodes (33): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), loadAssets(), Row (+25 more)

### Community 135 - "notification-settings-view.tsx"
Cohesion: 0.19
Nodes (15): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor() (+7 more)

### Community 136 - "supabaseServer"
Cohesion: 0.05
Nodes (63): nextConfig, next, addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), addClientNoteAction() (+55 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "invoice-form.tsx"
Cohesion: 0.23
Nodes (14): blankLine(), InvoiceForm(), fmt(), SettlementForm(), Message(), OpeningAssetForm(), RunDepreciationButton(), SetupAssetForm() (+6 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.05
Nodes (62): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DirectoryParty, ENTRY_STATUS (+54 more)

### Community 140 - "app/settings/notifications/page.tsx"
Cohesion: 0.30
Nodes (12): Content(), NotificationSettingsPage(), TelegramLinkButton(), TelegramUnlinkButton(), AnchorButton(), TelegramEnv, telegramEnv(), LinkState (+4 more)

### Community 141 - "idle-watcher.tsx"
Cohesion: 0.21
Nodes (18): ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS (+10 more)

### Community 142 - "workpapers/load.ts"
Cohesion: 0.15
Nodes (20): RegisterLine, Adjustment, PeriodFile, Memo, MemoInput, MemoMonth, MonthActivity, REFS_FOR_FORM (+12 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.08
Nodes (42): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+34 more)

### Community 144 - "filings/actions.ts"
Cohesion: 0.20
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+9 more)

### Community 145 - "formatAmount"
Cohesion: 0.18
Nodes (23): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+15 more)

### Community 146 - "server-only"
Cohesion: 0.13
Nodes (32): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+24 more)

### Community 147 - "toCentavos"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 148 - "transactions-actions.ts"
Cohesion: 0.25
Nodes (16): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+8 more)

### Community 149 - "notifications-view.tsx"
Cohesion: 0.24
Nodes (13): Content(), NotificationsPage(), Content(), PortalNotificationsPage(), Empty(), NotificationsView(), one(), SearchParams (+5 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.06
Nodes (89): robots(), AboutPage(), HOW, metadata, BirCalendarPage(), metadata, BRING, ContactList() (+81 more)

### Community 151 - "portal/reports/cwt-2307/page.tsx"
Cohesion: 0.25
Nodes (14): PortalCwt2307Page(), Tracker(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure(), money() (+6 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.12
Nodes (28): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+20 more)

### Community 154 - "notifications/format.ts"
Cohesion: 0.20
Nodes (14): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+6 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.09
Nodes (38): ApprovedRow, BulkState, ClientSelect(), Booking, ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList() (+30 more)

### Community 156 - "requireOwner"
Cohesion: 0.08
Nodes (48): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), peso, recordDepositAction() (+40 more)

### Community 157 - "queries.ts"
Cohesion: 0.21
Nodes (13): GET(), isNotificationKind(), BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), latestNotifications(), loadBellData() (+5 more)

### Community 158 - "Card"
Cohesion: 0.07
Nodes (49): NewEntry(), NewEntryPage(), NotesCard(), ClientNoteForm(), NewEmployee(), NewEmployeePage(), bookingLinkAction(), BookingLink() (+41 more)

### Community 159 - "review/page.tsx"
Cohesion: 0.14
Nodes (23): Queue(), ReviewPage(), Row, Section(), EndButton(), Acting(), ActingApproverPage(), Approval (+15 more)

### Community 160 - "notification-bell.tsx"
Cohesion: 0.27
Nodes (13): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), Counter(), DropdownPopover() (+5 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.27
Nodes (16): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant(), appBookedEvents(), addDays() (+8 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.13
Nodes (20): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+12 more)

### Community 164 - "layout.ts"
Cohesion: 0.29
Nodes (12): bodyBlocks(), EmailAction, escapeHtml(), fullBrand(), linkify(), plainTextToHtml(), receivingLine(), renderEmail() (+4 more)

### Community 165 - "filed-returns.ts"
Cohesion: 0.22
Nodes (8): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, LegacyFileRow, TaxTypeGroup, rows, TYPE_ORDER

### Community 166 - "register/page.tsx"
Cohesion: 0.24
Nodes (17): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+9 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "cycle/actions.ts"
Cohesion: 0.27
Nodes (11): MonthComplete(), SentRow, StandingRow, TimelineRow, confirmMonthAction(), CycleState, decideExceptionAction(), refresh() (+3 more)

### Community 169 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 170 - "clients/actions.ts"
Cohesion: 0.06
Nodes (50): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction(), setupMissingChartsAction() (+42 more)

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.11
Nodes (22): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+14 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.18
Nodes (22): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+14 more)

### Community 173 - "holiday-list.ts"
Cohesion: 0.27
Nodes (9): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), STANDARD_HOLIDAYS, StandardHoliday, suggestedDate() (+1 more)

### Community 174 - "onboarding/actions.ts"
Cohesion: 0.27
Nodes (9): KINDS, OnboardingState, refresh(), removeClientFileAction(), tickOnboardingAction(), CLIENT_FILE_KINDS, CLIENT_FILE_MAX, CLIENT_FILE_TYPES (+1 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "morning.ts"
Cohesion: 0.13
Nodes (18): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+10 more)

### Community 177 - "books-ready.ts"
Cohesion: 0.35
Nodes (8): filingsBooksReady(), BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked(), booksReadyMap(), keepBooksReady()

### Community 178 - "receipts.ts"
Cohesion: 0.25
Nodes (9): cents(), CLIENT_MONEY_KINDS, FEE_KINDS, GrossReceiptsWatch, grossReceiptsWatch(), pesos(), ReceiptRow, VAT_THRESHOLD (+1 more)

### Community 179 - "proof-actions.ts"
Cohesion: 0.29
Nodes (9): amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text(), TYPES (+1 more)

### Community 180 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 181 - "register-xlsx.ts"
Cohesion: 0.15
Nodes (22): GET(), safe(), PayrollDocument(), ReadPayrollButton(), buildEmployeeTemplate(), sortItems(), targetOptions(), draftToTemplate() (+14 more)

### Community 182 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "sign-in-form.tsx"
Cohesion: 0.31
Nodes (8): errors, Form(), LoginPage(), notices, SignInForm(), Divider(), SocialButton(), IDLE_MINUTES

### Community 186 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 187 - "firm/parallel-run/page.tsx"
Cohesion: 0.43
Nodes (6): CELL, FirmParallelRunPage(), monthShort(), Summary(), MonthStatus, loadFirmParallelRun()

### Community 188 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 189 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 190 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 193 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 194 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 196 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 198 - "binder/page.tsx"
Cohesion: 0.22
Nodes (15): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, amt() (+7 more)

### Community 199 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 202 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 207 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 209 - "ref_node_path"
Cohesion: 0.07
Nodes (7): ctx, input, root, root, root, root, root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1570 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `payroll-read.tsx`, `ui.ts`, `manilaToday`, `package.json`, `onboarding/page.tsx`, `notification-actions.tsx`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `Skeleton`, `deadlines/page.tsx`, `[month]/page.tsx`, `ledger/data.ts`, `PageHeader`, `requireStaff`, `books/export/route.ts`, `marketing/attribution.ts`, `lock-bar.tsx`, `settlement-pages.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `react`, `@remixicon/react`, `invoice-pages.tsx`, `Badge`, `cx`, `Notice`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `work/page.tsx`, `tools/page.tsx`, `[clientId]/page.tsx`, `ledger/books.ts`, `opening-checklist.tsx`, `report-periods.ts`, `app/requests/[id]/page.tsx`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `portal/page.tsx`, `year-end/page.tsx`, `collections.ts`, `calendar/staff.ts`, `settings/actions.ts`, `returns/load.ts`, `leads/actions.ts`, `batch/register.ts`, `statement.ts`, `ocr/run.ts`, `return-file-actions.ts`, `LinkButton`, `move-bar.tsx`, `fixed-assets/page.tsx`, `review-form.tsx`, `app/settings/notifications/page.tsx`, `idle-watcher.tsx`, `filings/actions.ts`, `formatAmount`, `server-only`, `transactions-actions.ts`, `notifications-view.tsx`, `blocks.tsx`, `portal/reports/cwt-2307/page.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `requireOwner`, `queries.ts`, `Card`, `review/page.tsx`, `notification-bell.tsx`, `proposal-view.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `cycle/actions.ts`, `clients/actions.ts`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `onboarding/actions.ts`, `proof-actions.ts`, `register-xlsx.ts`, `site-document.tsx`, `firm/parallel-run/page.tsx`, `binder/page.tsx`, `missing-2307/page.tsx`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08953418027828192 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `payroll-read.tsx`, `ui.ts`, `manilaToday`, `package.json`, `onboarding/page.tsx`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/[id]/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `deadlines/page.tsx`, `ledger/data.ts`, `returns/types.ts`, `PageHeader`, `books/export/route.ts`, `marketing/attribution.ts`, `lock-bar.tsx`, `filings/run.ts`, `testing.ts`, `payroll/data.ts`, `react`, `@remixicon/react`, `invoice-pages.tsx`, `tax-codes.ts`, `portal-billing.test.ts`, `parts.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `payroll/payroll.test.ts`, `work/page.tsx`, `ledger/books.ts`, `opening-checklist.tsx`, `rates.ts`, `report-periods.ts`, `app/requests/[id]/page.tsx`, `cycle/page.tsx`, `client`, `index.ts`, `portal/page.tsx`, `year-end/page.tsx`, `collections.ts`, `calendar/staff.ts`, `settings/actions.ts`, `quote.ts`, `returns/load.ts`, `ref_node_fs`, `batch/register.ts`, `ocr/run.ts`, `read.test.ts`, `return-file-actions.ts`, `move-bar.tsx`, `gemini.ts`, `fixed-assets/page.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `review-form.tsx`, `idle-watcher.tsx`, `workpapers/load.ts`, `safeguards.ts`, `server-only`, `toCentavos`, `blocks.tsx`, `ledger.test.ts`, `workpapers/page.tsx`, `notifications/format.ts`, `app/documents/page.tsx`, `Card`, `review/page.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `layout.ts`, `filed-returns.ts`, `clients/actions.ts`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `holiday-list.ts`, `acting-approver.test.ts`, `morning.ts`, `books-ready.ts`, `receipts.ts`, `lead-attribution.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `leads-pipeline.test.ts`, `parallel-run.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `ledger-closing.test.ts`, `books-2307.test.ts`, `notifications.test.ts`, `register-books.test.ts`, `adjustments.test.ts`, `approve-and-post.test.ts`, `batch-upload.test.ts`, `db.test.ts`, `split-bundled-pdfs.test.ts`, `funnel.test.ts`, `telegram-uploads.test.ts`, `ref_node_path`, `client-reports.test.ts`, `portal-reports.test.ts`, `tasks-and-request-owners.test.ts`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Should `payroll-read.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0655367231638418 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `payroll-read.tsx`, `ui.ts`, `manilaToday`, `package.json`, `onboarding/page.tsx`, `notification-actions.tsx`, `dependencies`, `statements.ts`, `scores/page.tsx`, `button.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `Skeleton`, `deadlines/page.tsx`, `[month]/page.tsx`, `ledger/data.ts`, `PageHeader`, `requireStaff`, `lock-bar.tsx`, `settlement-pages.tsx`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `@remixicon/react`, `invoice-pages.tsx`, `how-we-work/page.tsx`, `Badge`, `cx`, `Notice`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `work/page.tsx`, `tools/page.tsx`, `[clientId]/page.tsx`, `ledger/books.ts`, `combobox.tsx`, `app/requests/[id]/page.tsx`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `portal/page.tsx`, `year-end/page.tsx`, `collections.ts`, `calendar/staff.ts`, `quote.ts`, `returns/load.ts`, `leads/actions.ts`, `batch/register.ts`, `statement.ts`, `ocr/run.ts`, `social-button.tsx`, `LinkButton`, `move-bar.tsx`, `fixed-assets/page.tsx`, `notification-settings-view.tsx`, `supabaseServer`, `invoice-form.tsx`, `review-form.tsx`, `app/settings/notifications/page.tsx`, `idle-watcher.tsx`, `formatAmount`, `transactions-actions.ts`, `notifications-view.tsx`, `blocks.tsx`, `portal/reports/cwt-2307/page.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `queries.ts`, `Card`, `review/page.tsx`, `notification-bell.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `register/page.tsx`, `cycle/actions.ts`, `bell-store.ts`, `clients/actions.ts`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `sign-in-form.tsx`, `site-document.tsx`, `firm/parallel-run/page.tsx`, `binder/page.tsx`, `missing-2307/page.tsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._