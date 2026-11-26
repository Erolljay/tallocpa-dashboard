# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 897 files · ~711,789 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5542 nodes · 19356 edges · 191 communities (165 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 175 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `1ef0163e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LinkButton
- templatePayload
- migrate.yml
- ui.ts
- public.ts
- package.json
- server.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
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
- year-end/page.tsx
- scores/page.tsx
- compare.ts
- payroll/types.ts
- @remixicon/react
- index.ts
- payroll/forms.tsx
- modal.tsx
- safeguards.ts
- scripts
- slots.ts
- fees/[id]/page.tsx
- books-context.ts
- marketing/attribution.ts
- module-pages.tsx
- marketing/page.tsx
- payroll/data.ts
- registrations/forms.tsx
- returns/types.ts
- Notice
- quote/page.tsx
- arap.ts
- site-document.tsx
- lock-bar.tsx
- decision.tsx
- Skeleton
- Apple Design
- idle-watcher.tsx
- testing.ts
- supabaseServer
- formatAmount
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- books/reports/statements/page.tsx
- stat-cards.tsx
- cycle/actions.ts
- theme-toggle.tsx
- documents/labels.ts
- parties/parties.test.ts
- how-we-work/page.tsx
- rates.ts
- social-button.tsx
- Pro components
- auth-templates.ts
- ledger/data.ts
- portal/reports/page.tsx
- portal-billing.test.ts
- filings/actions.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- getIdentity
- Recipes
- seed.ts
- BoardUI page patterns
- Pro templates
- review-form.tsx
- ledger/books.ts
- engine.ts
- select.tsx
- PageHeader
- boardui
- gap/page.tsx
- profile.ts
- board.ts
- dates.ts
- sign-in-form.tsx
- vitest
- Opening balances: checklist for any cut-off
- lib/books/actions.ts
- money.ts
- transactions-actions.ts
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- vat.ts
- quote.ts
- source.ts
- work/load.ts
- server-only
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- next
- documents/[id]/page.tsx
- parties/[id]/page.tsx
- read.test.ts
- opening.ts
- return-file-actions.ts
- filed-returns.ts
- notification-actions.tsx
- gemini.ts
- fixed-assets/page.tsx
- tin.ts
- react
- ticked-allocation.test.ts
- proof-actions.ts
- proof-upload.tsx
- queries.ts
- runs.tsx
- terms.ts
- notifications/format.ts
- db.test.ts
- Centavos
- filings/run.ts
- ledger/types.ts
- notifications-view.tsx
- sign-off-actions.tsx
- blocks.tsx
- holiday-list.ts
- ledger.test.ts
- workpapers/page.tsx
- notification-settings-view.tsx
- app/documents/page.tsx
- month.ts
- template.ts
- notes.ts
- deadlines/page.tsx
- bell-store.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- return-files.tsx
- ocr/run.ts
- items.ts
- opengraph-image.tsx
- lead-attribution.test.ts
- notifications.test.ts
- portal-statements-approval.test.ts
- Building UIs with BoardUI
- Textarea
- register/page.tsx
- NotificationSettingsView
- acting-approver.test.ts
- tests/books.test.ts
- defer-documents.test.ts
- ref_node_fs
- fixed-assets.test.ts
- parallel-run.test.ts
- register-xlsx.ts
- books/periods.ts
- copy-opencv.mjs
- returns-sign-off.test.ts
- batch-upload.test.ts
- client-reports.test.ts
- payroll-books.test.ts
- portal-home.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 315 edges
2. `cx` - 285 edges
3. `react` - 254 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 235 edges
6. `next` - 211 edges
7. `Button()` - 206 edges
8. `Card()` - 167 edges
9. `vitest` - 167 edges
10. `Badge()` - 165 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `worksheet()` --indirect_call--> `employeeFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts
- `worksheet()` --indirect_call--> `itemFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts
- `worksheet()` --indirect_call--> `priorEmployerFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (191 total, 26 thin omitted)

### Community 0 - "LinkButton"
Cohesion: 0.10
Nodes (42): BooksContext, NewEntry(), NewEntryPage(), Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307() (+34 more)

### Community 1 - "templatePayload"
Cohesion: 0.07
Nodes (20): templatePayload(), as(), client(), root, approved(), as(), root, send() (+12 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.06
Nodes (58): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), TransactionJournal() (+50 more)

### Community 4 - "public.ts"
Cohesion: 0.11
Nodes (29): zod, ProposalSetup, QuerySource, JobOption, InstantQuote, instantView(), conditionsSchema, FEE_ITEM_COLUMNS (+21 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "server.ts"
Cohesion: 0.07
Nodes (49): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientNoteAction(), addClientFile(), KINDS, OnboardingState (+41 more)

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

### Community 11 - "notification-bell.tsx"
Cohesion: 0.25
Nodes (16): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), BellAudience (+8 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.03
Nodes (103): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+95 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+12 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (43): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), TbRowOut (+35 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (67): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+59 more)

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

### Community 40 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (41): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+33 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (76): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), monthName(), Parties() (+68 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "@remixicon/react"
Cohesion: 0.09
Nodes (28): @remixicon/react, apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps (+20 more)

### Community 45 - "index.ts"
Cohesion: 0.07
Nodes (18): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+10 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (56): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+48 more)

### Community 47 - "modal.tsx"
Cohesion: 0.09
Nodes (46): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+38 more)

### Community 48 - "safeguards.ts"
Cohesion: 0.09
Nodes (37): CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay(), NEEDS (+29 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.12
Nodes (32): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+24 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.10
Nodes (44): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+36 more)

### Community 52 - "books-context.ts"
Cohesion: 0.16
Nodes (20): one(), SearchParams, Print(), Print2307Page(), ParallelRun(), ParallelRunPage(), quarterMonths(), PrintAll() (+12 more)

### Community 53 - "marketing/attribution.ts"
Cohesion: 0.14
Nodes (32): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+24 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.12
Nodes (38): BankAccountsRoute(), booksContext(), fmtDate(), fmtMonth(), BooksFrame(), BooksList(), Column, ListRow (+30 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (29): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+21 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.12
Nodes (35): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), Certificates2316 (+27 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (96): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+88 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (64): client, INPUTS, MONTH, PAYSLIP_COLUMNS, payslipCsv(), payslipSchedule(), agentBackground(), agentErrors() (+56 more)

### Community 59 - "Notice"
Cohesion: 0.08
Nodes (75): setupMissingChartsAction(), ClientForm(), StaffOptions(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload() (+67 more)

### Community 60 - "quote/page.tsx"
Cohesion: 0.13
Nodes (25): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), TAXPAYER_TYPES (+17 more)

### Community 61 - "arap.ts"
Cohesion: 0.16
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 62 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.17
Nodes (17): BooksLockBar(), ICON, LockBarFor(), MonthLock(), LockContext, day(), dayFmt, LockAction (+9 more)

### Community 64 - "decision.tsx"
Cohesion: 0.70
Nodes (3): decideMissing2307Action(), DecisionState, Decision()

### Community 65 - "Skeleton"
Cohesion: 0.08
Nodes (41): INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesViewPage() (+33 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 68 - "testing.ts"
Cohesion: 0.11
Nodes (29): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+21 more)

### Community 69 - "supabaseServer"
Cohesion: 0.04
Nodes (107): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+99 more)

### Community 70 - "formatAmount"
Cohesion: 0.17
Nodes (18): Batch(), BatchPage(), one(), toCentavos(), Accreditation(), amount(), AmountRow(), DateCells() (+10 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (40): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+32 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (78): GridRow, MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv() (+70 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "books/reports/statements/page.tsx"
Cohesion: 0.19
Nodes (15): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+7 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (38): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+30 more)

### Community 77 - "cycle/actions.ts"
Cohesion: 0.24
Nodes (15): MonthComplete(), SentRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction() (+7 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.07
Nodes (49): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+41 more)

### Community 79 - "documents/labels.ts"
Cohesion: 0.08
Nodes (44): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+36 more)

### Community 80 - "parties/parties.test.ts"
Cohesion: 0.22
Nodes (15): displayName(), fullAddress(), listNameCols(), Party, partyTinLabel(), person, ABBREVIATIONS, nameTokens() (+7 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (35): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+27 more)

### Community 82 - "rates.ts"
Cohesion: 0.27
Nodes (13): AmountRate, CorporateRate, IncomeTaxTable, percentageTaxNonbankRate(), percentageTaxRate(), PercentRate, pickEffective(), RateEntry (+5 more)

### Community 83 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 86 - "ledger/data.ts"
Cohesion: 0.11
Nodes (35): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+27 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.11
Nodes (53): PortalClient, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat() (+45 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "filings/actions.ts"
Cohesion: 0.06
Nodes (57): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, advanceFilingAction() (+49 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.09
Nodes (34): metadata, QuotesClosed(), Start(), StartPage(), Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState (+26 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (44): PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+36 more)

### Community 94 - "getIdentity"
Cohesion: 0.19
Nodes (21): RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), Thread() (+13 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.07
Nodes (47): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), DirectoryParty (+39 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.06
Nodes (51): exceljs@4.4.0, exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad() (+43 more)

### Community 101 - "engine.ts"
Cohesion: 0.09
Nodes (45): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+37 more)

### Community 102 - "select.tsx"
Cohesion: 0.06
Nodes (53): react-aria-components, Dropdown(), DropdownContext, DropdownContextValue, DropdownGroupProps, DropdownItemProps, DropdownPopoverProps, DropdownProps (+45 more)

### Community 103 - "PageHeader"
Cohesion: 0.09
Nodes (34): ClientList(), ClientsPage(), Cycle(), CyclePage(), CycleWithClient, DocRow, CELL, FirmParallelRunPage() (+26 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "gap/page.tsx"
Cohesion: 0.24
Nodes (13): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+5 more)

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (60): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+52 more)

### Community 107 - "board.ts"
Cohesion: 0.08
Nodes (32): StepProgress(), Row, FilingRow, StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED (+24 more)

### Community 108 - "dates.ts"
Cohesion: 0.39
Nodes (9): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff() (+1 more)

### Community 109 - "sign-in-form.tsx"
Cohesion: 0.17
Nodes (17): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+9 more)

### Community 110 - "vitest"
Cohesion: 0.04
Nodes (24): pg, vitest, ctx, input, Data, root, Row, root (+16 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "lib/books/actions.ts"
Cohesion: 0.17
Nodes (12): AmendmentFlag, BooksMonthRow, CodeSource, Db, DocumentPortion, DocumentPosting, InvoiceInput, InvoiceLineInput (+4 more)

### Community 113 - "money.ts"
Cohesion: 0.08
Nodes (46): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+38 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (46): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+38 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (36): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+28 more)

### Community 118 - "vat.ts"
Cohesion: 0.13
Nodes (48): incomeAttachments(), Periods, periods(), buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv() (+40 more)

### Community 119 - "quote.ts"
Cohesion: 0.11
Nodes (32): PriceRow, proposal(), buildProposalQuote(), buildQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem (+24 more)

### Community 120 - "source.ts"
Cohesion: 0.11
Nodes (29): row(), amount(), approvedFields(), BooksSourceRow, buildPriorFigures(), DOC_TYPE_OF_KIND, DocumentRow, flattenFigures() (+21 more)

### Community 121 - "work/load.ts"
Cohesion: 0.20
Nodes (15): loadAssets(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 122 - "server-only"
Cohesion: 0.10
Nodes (40): server-only, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+32 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (41): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+33 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "next"
Cohesion: 0.06
Nodes (84): nextConfig, next, ClientReturnsPage(), FilingRow, Returns(), Client, CollectionsPage(), OpenDue (+76 more)

### Community 126 - "documents/[id]/page.tsx"
Cohesion: 0.07
Nodes (55): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), applyColumnsAction(), done(), payrollDocument(), PayrollReadState (+47 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.17
Nodes (18): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, PARTY_KINDS (+10 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (73): RFC-4180, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+65 more)

### Community 129 - "opening.ts"
Cohesion: 0.14
Nodes (20): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+12 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "filed-returns.ts"
Cohesion: 0.23
Nodes (10): FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear(), TaxTypeGroup (+2 more)

### Community 132 - "notification-actions.tsx"
Cohesion: 0.16
Nodes (19): notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, IconComponent, Tab(), TabList() (+11 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 135 - "tin.ts"
Cohesion: 0.29
Nodes (9): PARTY_COLUMNS, blank(), optionalText(), PartyInput, partySchema, HEAD_OFFICE, normalizeBranch(), ParsedTin (+1 more)

### Community 136 - "react"
Cohesion: 0.08
Nodes (40): react, PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage() (+32 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "proof-actions.ts"
Cohesion: 0.29
Nodes (9): amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text(), TYPES (+1 more)

### Community 139 - "proof-upload.tsx"
Cohesion: 0.60
Nodes (5): METHODS, ProofUpload(), send(), startProofUpload(), submitProof()

### Community 140 - "queries.ts"
Cohesion: 0.19
Nodes (14): GET(), isNotificationKind(), BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+6 more)

### Community 141 - "runs.tsx"
Cohesion: 0.25
Nodes (8): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), Run

### Community 142 - "terms.ts"
Cohesion: 0.27
Nodes (7): acceptProposalAction(), AcceptState, contentHash(), acceptedQuote(), canonicalContent(), defaultTerms(), ProposalContent

### Community 143 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 145 - "Centavos"
Cohesion: 0.06
Nodes (45): FinancialStatements, Note, StatementLine, Bucket, SaleSplit, NewEmployeeRow, Position, EntryLine (+37 more)

### Community 146 - "filings/run.ts"
Cohesion: 0.16
Nodes (17): @supabase/supabase-js, GET(), GET(), generateFilingsNow(), generatePastFilingsAction(), siteOrigin(), supabaseEnv(), refreshDueDates() (+9 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.13
Nodes (21): Access, STATUS, Cutoff, cutoffOf(), ChecklistInput, ChecklistItem, ItemStatus, longDate() (+13 more)

### Community 148 - "notifications-view.tsx"
Cohesion: 0.39
Nodes (8): Empty(), NotificationsView(), one(), SearchParams, fullDateTime(), timeOfDay(), listNotifications(), unreadCount()

### Community 149 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.06
Nodes (91): robots(), AboutPage(), HOW, metadata, BirCalendarPage(), metadata, BRING, ContactList() (+83 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.16
Nodes (17): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+9 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

### Community 154 - "notification-settings-view.tsx"
Cohesion: 0.23
Nodes (11): EmailSwitches(), EmailSwitchGroup, Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS, NotificationAudience (+3 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.09
Nodes (43): ApprovedReview(), ApprovedRow, ClientSelect(), moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction() (+35 more)

### Community 156 - "month.ts"
Cohesion: 0.39
Nodes (7): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none

### Community 157 - "template.ts"
Cohesion: 0.06
Nodes (45): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, bandForSales(), JOB_GROUPS (+37 more)

### Community 158 - "notes.ts"
Cohesion: 0.17
Nodes (16): NoteState, NotesCard(), ClientNoteForm(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry (+8 more)

### Community 159 - "deadlines/page.tsx"
Cohesion: 0.08
Nodes (51): loadLockContext(), BooksMonthsPage(), Months(), one(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage() (+43 more)

### Community 160 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.22
Nodes (20): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), Interval, manilaInstant() (+12 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.21
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 164 - "return-files.tsx"
Cohesion: 0.50
Nodes (7): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), startReturnFileUpload()

### Community 165 - "ocr/run.ts"
Cohesion: 0.43
Nodes (7): ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, lookupParties(), fillFromDirectory(), partyKey()

### Community 166 - "items.ts"
Cohesion: 0.29
Nodes (7): BirCategory, Category, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, KIND_ORDER, AmountField

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 171 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 172 - "Textarea"
Cohesion: 0.12
Nodes (29): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+21 more)

### Community 173 - "register/page.tsx"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 174 - "NotificationSettingsView"
Cohesion: 0.48
Nodes (5): Content(), NotificationSettingsPage(), Content(), PortalNotificationSettingsPage(), NotificationSettingsView()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 178 - "ref_node_fs"
Cohesion: 0.07
Nodes (12): dir, api, ctx, fn, rows, src, HASH, LEAD (+4 more)

### Community 179 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 180 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 181 - "register-xlsx.ts"
Cohesion: 0.11
Nodes (29): file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), draftToTemplate(), initialDraft(), CheckedRegister (+21 more)

### Community 182 - "books/periods.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 183 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1472 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `LinkButton`, `return-file-actions.ts`, `ui.ts`, `notification-actions.tsx`, `package.json`, `server.ts`, `fixed-assets/page.tsx`, `react`, `proof-actions.ts`, `notification-bell.tsx`, `queries.ts`, `runs.tsx`, `terms.ts`, `dependencies`, `cx`, `proof-upload.tsx`, `filings/run.ts`, `ledger/types.ts`, `notifications-view.tsx`, `sign-off-actions.tsx`, `blocks.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `deadlines/page.tsx`, `proposal-view.tsx`, `return-files.tsx`, `opengraph-image.tsx`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `Textarea`, `register/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `books-context.ts`, `register-xlsx.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `marketing/attribution.ts`, `quote/page.tsx`, `site-document.tsx`, `decision.tsx`, `Skeleton`, `idle-watcher.tsx`, `supabaseServer`, `formatAmount`, `books/forms.tsx`, `books/reports/statements/page.tsx`, `cycle/actions.ts`, `theme-toggle.tsx`, `documents/labels.ts`, `ledger/data.ts`, `portal/reports/page.tsx`, `filings/actions.ts`, `intake-picker.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `getIdentity`, `review-form.tsx`, `ledger/books.ts`, `PageHeader`, `gap/page.tsx`, `profile.ts`, `sign-in-form.tsx`, `money.ts`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `server-only`, `batch/register.ts`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LinkButton` be split into smaller, more focused modules?**
  _Cohesion score 0.10449927431059507 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `LinkButton`, `templatePayload`, `ui.ts`, `public.ts`, `package.json`, `server.ts`, `statements.ts`, `income.ts`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `index.ts`, `payroll/forms.tsx`, `safeguards.ts`, `slots.ts`, `fees/[id]/page.tsx`, `marketing/attribution.ts`, `registrations/forms.tsx`, `returns/types.ts`, `quote/page.tsx`, `arap.ts`, `lock-bar.tsx`, `Skeleton`, `idle-watcher.tsx`, `testing.ts`, `supabaseServer`, `formatAmount`, `payroll/payroll.test.ts`, `theme-toggle.tsx`, `parties/parties.test.ts`, `rates.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `filings/actions.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `review-form.tsx`, `ledger/books.ts`, `engine.ts`, `PageHeader`, `profile.ts`, `board.ts`, `dates.ts`, `sign-in-form.tsx`, `money.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `quote.ts`, `source.ts`, `server-only`, `batch/register.ts`, `read.test.ts`, `opening.ts`, `return-file-actions.ts`, `filed-returns.ts`, `gemini.ts`, `fixed-assets/page.tsx`, `ticked-allocation.test.ts`, `terms.ts`, `notifications/format.ts`, `db.test.ts`, `filings/run.ts`, `ledger/types.ts`, `blocks.tsx`, `holiday-list.ts`, `ledger.test.ts`, `app/documents/page.tsx`, `month.ts`, `template.ts`, `notes.ts`, `deadlines/page.tsx`, `calendar/page.tsx`, `lead-attribution.test.ts`, `notifications.test.ts`, `portal-statements-approval.test.ts`, `Textarea`, `register/page.tsx`, `acting-approver.test.ts`, `tests/books.test.ts`, `defer-documents.test.ts`, `ref_node_fs`, `fixed-assets.test.ts`, `parallel-run.test.ts`, `books/periods.ts`, `returns-sign-off.test.ts`, `batch-upload.test.ts`, `client-reports.test.ts`, `payroll-books.test.ts`, `portal-home.test.ts`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `templatePayload` be split into smaller, more focused modules?**
  _Cohesion score 0.07057057057057058 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `LinkButton`, `ui.ts`, `package.json`, `server.ts`, `notification-bell.tsx`, `cx`, `dependencies`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `@remixicon/react`, `payroll/forms.tsx`, `modal.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `books-context.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `Notice`, `quote/page.tsx`, `site-document.tsx`, `lock-bar.tsx`, `decision.tsx`, `Skeleton`, `idle-watcher.tsx`, `supabaseServer`, `formatAmount`, `books/forms.tsx`, `books/reports/statements/page.tsx`, `stat-cards.tsx`, `cycle/actions.ts`, `theme-toggle.tsx`, `documents/labels.ts`, `how-we-work/page.tsx`, `social-button.tsx`, `ledger/data.ts`, `portal/reports/page.tsx`, `filings/actions.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/[id]/page.tsx`, `getIdentity`, `review-form.tsx`, `ledger/books.ts`, `select.tsx`, `PageHeader`, `gap/page.tsx`, `profile.ts`, `sign-in-form.tsx`, `money.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `next`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `notification-actions.tsx`, `fixed-assets/page.tsx`, `proof-upload.tsx`, `queries.ts`, `runs.tsx`, `sign-off-actions.tsx`, `blocks.tsx`, `workpapers/page.tsx`, `notification-settings-view.tsx`, `app/documents/page.tsx`, `template.ts`, `notes.ts`, `deadlines/page.tsx`, `bell-store.ts`, `calendar/page.tsx`, `proposal-view.tsx`, `return-files.tsx`, `Textarea`, `register/page.tsx`, `NotificationSettingsView`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._