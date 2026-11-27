# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1017 files · ~847,478 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6235 nodes · 22255 edges · 207 communities (180 shown, 27 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 194 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `9cccd8cb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- vitest
- migrate.yml
- ui.ts
- public.ts
- package.json
- formToObject
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/labels.ts
- Sign-in & Setup Docs
- app/requests/page.tsx
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
- payroll/data.ts
- returns/types.ts
- settlement-pages.tsx
- payroll/payroll.test.ts
- modal.tsx
- site-document.tsx
- scripts
- access.ts
- button.tsx
- Card
- webhook.ts
- tax-codes.ts
- structured-data.ts
- module-pages.tsx
- proposal-view.tsx
- returns/load.ts
- steps.ts
- calendar/page.tsx
- books/export/route.ts
- formatAmount
- lock-bar.tsx
- review-forms.tsx
- marketing/page.tsx
- Apple Design
- engine.ts
- testing.ts
- fees/[id]/page.tsx
- portalContext
- books/forms.tsx
- year.ts
- Rules
- Animation Performance
- client
- stat-cards.tsx
- invoice-pages.tsx
- getIdentity
- year-end/page.tsx
- parties/[id]/page.tsx
- how-we-work/page.tsx
- requireOwner
- cx.ts
- Pro components
- remittances/[id]/page.tsx
- Notice
- payroll/types.ts
- portal-billing.test.ts
- notifications-view.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- filings/actions.ts
- manilaToday
- Recipes
- react
- BoardUI page patterns
- Pro templates
- generate.ts
- ledger/books.ts
- ledger/data.ts
- combobox.tsx
- rates.ts
- boardui
- ref_node_fs
- money.ts
- supabaseServer
- leads/actions.ts
- documents/[id]/page.tsx
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- showMonth
- lib/books/actions.ts
- collections/forms.tsx
- [clientId]/[year]/page.tsx
- apply-migrations.sh
- sign-in-form.tsx
- quote.ts
- opening.ts
- leads/[id]/page.tsx
- app/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- showDate
- chrome.tsx
- holiday-list.ts
- read.test.ts
- idle-watcher.tsx
- return-file-actions.ts
- app/settings/page.tsx
- auth.ts
- ocr/run.ts
- ledger/data.ts
- cancel-server.ts
- clients/actions.ts
- ticked-allocation.test.ts
- transactions-actions.ts
- site/brand.ts
- work/load.ts
- payroll/forms.tsx
- upload/page.tsx
- social-button.tsx
- approval-memo.tsx
- cycle/page.tsx
- dispatch.ts
- filings/[id]/page.tsx
- template.ts
- theme-toggle.tsx
- blocks.tsx
- seed.ts
- ledger.test.ts
- payment-forms.tsx
- package.json
- move-bar.tsx
- documents/[id]/page.tsx
- register/page.tsx
- lock.ts
- onboarding/page.tsx
- fixed-assets/page.tsx
- Rework: one flow from lead to year-end
- calendar/staff.ts
- Textarea
- app/documents/page.tsx
- books/periods.ts
- workpapers/load.ts
- opengraph-image.tsx
- cx
- requests/actions.ts
- binder/page.tsx
- month.ts
- tieouts.test.ts
- contact-access.test.ts
- cwt-2307-tracker.test.ts
- acting-approver.test.ts
- fields.ts
- portal-statements-approval.test.ts
- generate-qap-fixture.mjs
- lead-attribution.test.ts
- bir-filing-calendar/page.tsx
- copy-opencv.mjs
- late-surcharges.test.ts
- contribution-remittances.test.ts
- tests/register.test.ts
- pg
- books-2307.test.ts
- leads-pipeline.test.ts
- ocr/dates.ts
- parallel-run.test.ts
- Building UIs with BoardUI
- proof-upload.tsx
- eslint.config.mjs
- returns-sign-off.test.ts
- telegram-uploads.test.ts
- books-migration.test.ts
- tests/books.test.ts
- fees.test.ts
- lock-by-return-type.test.ts
- register-books.test.ts
- review-form.tsx
- returns-books.test.ts
- workpapers.test.ts
- db.test.ts
- templates/README.md
- batch-row-images.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 400 edges
2. `cx` - 313 edges
3. `react` - 284 edges
4. `Notice()` - 269 edges
5. `Skeleton()` - 258 edges
6. `Button()` - 252 edges
7. `next` - 245 edges
8. `vitest` - 195 edges
9. `Card()` - 187 edges
10. `Badge()` - 187 edges

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

## Communities (207 total, 27 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (47): BooksContext, Print(), Print2307Page(), load2307Staff(), PortalPrint2307Page(), Print(), one(), portal2307() (+39 more)

### Community 1 - "vitest"
Cohesion: 0.05
Nodes (15): vitest, root, root, root, root, HASH, LEAD, root (+7 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (59): booksContext(), booksViewFor(), fmtMonth(), one(), SearchParams, BooksFrame(), CustomersRoute(), Employees() (+51 more)

### Community 4 - "public.ts"
Cohesion: 0.08
Nodes (47): ProposalSetup, acceptProposalAction(), AcceptState, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND (+39 more)

### Community 5 - "package.json"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19 (+7 more)

### Community 6 - "formToObject"
Cohesion: 0.08
Nodes (48): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+40 more)

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
Nodes (35): PreviewTable(), DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc (+27 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "app/requests/page.tsx"
Cohesion: 0.10
Nodes (42): catchUpOnboardingAction(), CatchUpOnboarding(), ClientList(), ClientsPage(), SORTS, Contacts(), SORTS, when (+34 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0, server-only@^0.0.1 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (47): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), PrintButton(), CASH_FLOW_CLASSES, CashFlowClass (+39 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.06
Nodes (114): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), tinDashed(), annualAttachments(), balanceSheet() (+106 more)

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
Cohesion: 0.10
Nodes (42): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtLooseDocuments(), CwtTrackerGroups(), dateFmt (+34 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (40): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+32 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (72): AtcComparison, atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentDifference, DocumentReason (+64 more)

### Community 43 - "payroll/data.ts"
Cohesion: 0.10
Nodes (47): saveMonthAction(), EmployeeDetail(), EmployeePage(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db (+39 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.05
Nodes (76): branchOfTin(), payeeKeyOf(), tin9(), tinDigits(), tinHasBranch(), client, row(), VatData (+68 more)

### Community 45 - "settlement-pages.tsx"
Cohesion: 0.09
Nodes (30): PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage(), fmt(), OpenInvoice (+22 more)

### Community 46 - "payroll/payroll.test.ts"
Cohesion: 0.10
Nodes (37): file(), GET(), safe(), buildEmployeeTemplate(), PayrollItem, employee(), entry(), fixtureContext() (+29 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (46): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), SearchHit, SearchKind (+38 more)

### Community 48 - "site-document.tsx"
Cohesion: 0.14
Nodes (11): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), geist, geistMono (+3 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "access.ts"
Cohesion: 0.13
Nodes (27): server-only, @supabase/supabase-js, generateFilingsNow(), generatePastFilingsAction(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata (+19 more)

### Community 51 - "button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 52 - "Card"
Cohesion: 0.08
Nodes (52): ClientReturnsPage(), Returns(), AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT (+44 more)

### Community 53 - "webhook.ts"
Cohesion: 0.08
Nodes (48): maxDuration, POST(), ClaimedNotification, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked() (+40 more)

### Community 54 - "tax-codes.ts"
Cohesion: 0.12
Nodes (23): blankLine(), InvoiceForm(), InvoiceFormValue, appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf() (+15 more)

### Community 55 - "structured-data.ts"
Cohesion: 0.15
Nodes (19): robots(), metadata, sitemap(), SiteBrand, BRAND_NAME, PRACTITIONER, SITE_URL, siteUrl() (+11 more)

### Community 56 - "module-pages.tsx"
Cohesion: 0.12
Nodes (29): BankAccountsRoute(), fmtDate(), BooksList(), Column, ListRow, RowLink(), InvoiceView(), JournalEntryRoute() (+21 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.07
Nodes (50): DatFiles, isDatKind(), FinancialStatements, ParallelBooksRow, withNonDeductible(), dayBefore(), FilingRow, listInvoices() (+42 more)

### Community 59 - "steps.ts"
Cohesion: 0.04
Nodes (119): addStepFile(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction() (+111 more)

### Community 60 - "calendar/page.tsx"
Cohesion: 0.13
Nodes (30): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), addDays(), byDay(), DAY_LABEL (+22 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.12
Nodes (26): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+18 more)

### Community 62 - "formatAmount"
Cohesion: 0.13
Nodes (29): ParallelRun(), ParallelRunPage(), quarterMonths(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Atcs() (+21 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.19
Nodes (17): BooksLockBar(), ICON, LockBarFor(), MonthLock(), LockContext, day(), dayFmt, lockActionFor() (+9 more)

### Community 64 - "review-forms.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (59): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+51 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.22
Nodes (18): compareIso(), lastDayOfMonth(), fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), nextWorkingDay(), Obligation (+10 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "fees/[id]/page.tsx"
Cohesion: 0.10
Nodes (47): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+39 more)

### Community 70 - "portalContext"
Cohesion: 0.08
Nodes (68): Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker(), basePeriod(), HeldNote() (+60 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (42): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+34 more)

### Community 72 - "year.ts"
Cohesion: 0.07
Nodes (65): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+57 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "client"
Cohesion: 0.08
Nodes (15): BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), as(), purchase() (+7 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "invoice-pages.tsx"
Cohesion: 0.12
Nodes (24): INVOICE_KINDS, InvoiceEdit(), InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage() (+16 more)

### Community 78 - "getIdentity"
Cohesion: 0.09
Nodes (36): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+28 more)

### Community 79 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (46): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), withDirectory(), datAddress(), datNameCols(), displayName() (+38 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.18
Nodes (27): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+19 more)

### Community 82 - "requireOwner"
Cohesion: 0.09
Nodes (48): zod@^4.6.7, zod, addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema (+40 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (68): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+60 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "remittances/[id]/page.tsx"
Cohesion: 0.12
Nodes (44): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+36 more)

### Community 86 - "Notice"
Cohesion: 0.07
Nodes (89): ClientForm(), StaffOptions(), BatchUpload(), AccountForm(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), ReleaseReportForm() (+81 more)

### Community 87 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notifications-view.tsx"
Cohesion: 0.05
Nodes (90): GET(), Bell(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus() (+82 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.12
Nodes (25): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+17 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "filings/actions.ts"
Cohesion: 0.18
Nodes (19): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+11 more)

### Community 94 - "manilaToday"
Cohesion: 0.09
Nodes (48): RequestDetail(), RequestPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+40 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "react"
Cohesion: 0.08
Nodes (51): react, Batch(), BatchPage(), one(), toCentavos(), EmployeesRoute(), NewEntry(), NewEntryPage() (+43 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "generate.ts"
Cohesion: 0.18
Nodes (16): Rule, DueRule, EfpsGroup, FilingChannel, Frequency, PeriodFilter, ACTIVE, buildFilingRows() (+8 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (44): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+36 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.14
Nodes (28): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+20 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.04
Nodes (83): react-aria-components, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, animateTag(), ComboBox() (+75 more)

### Community 103 - "rates.ts"
Cohesion: 0.22
Nodes (20): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+12 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "ref_node_fs"
Cohesion: 0.06
Nodes (18): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+10 more)

### Community 106 - "money.ts"
Cohesion: 0.20
Nodes (14): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+6 more)

### Community 107 - "supabaseServer"
Cohesion: 0.06
Nodes (65): nextConfig, next, loadLockContext(), BooksMonthsPage(), Months(), one(), addClientNoteAction(), postPayrollAction() (+57 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.10
Nodes (44): PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction() (+36 more)

### Community 109 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (40): BOOKED_TYPES, BundleChild, PayrollDocument(), Supabase, PayrollReadState, ColumnMapping(), KIND_LABEL, MATCH_BADGE (+32 more)

### Community 110 - "index.ts"
Cohesion: 0.04
Nodes (30): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+22 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (57): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+49 more)

### Community 113 - "showMonth"
Cohesion: 0.09
Nodes (41): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, StandingRow (+33 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (24): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+16 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.10
Nodes (41): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), LateSurchargeActions() (+33 more)

### Community 116 - "[clientId]/[year]/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 118 - "sign-in-form.tsx"
Cohesion: 0.22
Nodes (13): code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode(), errors, Form() (+5 more)

### Community 119 - "quote.ts"
Cohesion: 0.08
Nodes (43): PriceRow, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), jobGroupOf() (+35 more)

### Community 120 - "opening.ts"
Cohesion: 0.15
Nodes (19): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+11 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (35): NotesCard(), ProposalSent, bookedTime, LeadPage(), LeadTouch, Person, sentDate, day() (+27 more)

### Community 122 - "app/page.tsx"
Cohesion: 0.08
Nodes (56): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+48 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "showDate"
Cohesion: 0.08
Nodes (52): Row, Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), accessFor(), PortalClient (+44 more)

### Community 126 - "chrome.tsx"
Cohesion: 0.20
Nodes (18): BRING, ContactList(), ContactPage(), metadata, SiteNotFound(), HomePage(), ButtonLink(), Container() (+10 more)

### Community 127 - "holiday-list.ts"
Cohesion: 0.15
Nodes (18): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+10 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (83): RFC-4180, applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), geminiJson() (+75 more)

### Community 129 - "idle-watcher.tsx"
Cohesion: 0.21
Nodes (18): ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS (+10 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (44): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+36 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.26
Nodes (12): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote(), SettingsPage(), describeDue() (+4 more)

### Community 132 - "auth.ts"
Cohesion: 0.10
Nodes (24): NewClientPage(), OwnerOnly(), addBranchAction(), errors(), refresh(), updateBranchAction(), Branches(), BranchesPage() (+16 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (43): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+35 more)

### Community 134 - "ledger/data.ts"
Cohesion: 0.09
Nodes (34): Access, STATUS, ColumnarBook, codes, PNL, COA_TEMPLATES, Cutoff, cutoffOf() (+26 more)

### Community 135 - "cancel-server.ts"
Cohesion: 0.24
Nodes (14): cancelMeetingAction(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail(), manilaWhen(), MAX_CANCEL_REASON (+6 more)

### Community 136 - "clients/actions.ts"
Cohesion: 0.06
Nodes (49): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setCatchUpAction(), setClientStatusAction() (+41 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 139 - "site/brand.ts"
Cohesion: 0.24
Nodes (13): metadata, QuotesClosed(), Start(), StartPage(), metadata, Part(), PrivacyPage(), funnelLive() (+5 more)

### Community 140 - "work/load.ts"
Cohesion: 0.17
Nodes (20): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), lastMonth(), loadMyWork() (+12 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (55): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+47 more)

### Community 142 - "upload/page.tsx"
Cohesion: 0.15
Nodes (21): ClientPage(), fmtDate(), fmtMonth(), frequencyLabel, Row, Content(), NotificationSettingsPage(), TelegramLinkButton() (+13 more)

### Community 143 - "social-button.tsx"
Cohesion: 0.18
Nodes (13): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButton(), SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps (+5 more)

### Community 144 - "approval-memo.tsx"
Cohesion: 0.21
Nodes (10): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, c(), loadPeriodFile(), monthEnd() (+2 more)

### Community 145 - "cycle/page.tsx"
Cohesion: 0.12
Nodes (31): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+23 more)

### Community 146 - "dispatch.ts"
Cohesion: 0.07
Nodes (59): GET(), GET(), GET(), digestMessage(), DigestRow, longDay(), peso, time() (+51 more)

### Community 147 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (44): FilingRow, RunReadyButton(), Client, CollectionsPage(), OpenDue, Overview(), Stat(), FilingListRow (+36 more)

### Community 148 - "template.ts"
Cohesion: 0.07
Nodes (31): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, ProposalJob, corp (+23 more)

### Community 149 - "theme-toggle.tsx"
Cohesion: 0.11
Nodes (26): react-dom@19.3.0, react-dom, applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle() (+18 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.10
Nodes (40): AboutPage(), HOW, metadata, FaqPage(), metadata, FLOW_ICONS, GROUP_SPAN, metadata (+32 more)

### Community 151 - "seed.ts"
Cohesion: 0.25
Nodes (8): DeadlineRule, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "payment-forms.tsx"
Cohesion: 0.33
Nodes (11): PaymentSettings(), PaymentSettingsState, AddPaymentAccountForm(), ChannelFields(), ChannelValues, EditPaymentAccountForm(), MoveAccountButtons(), PaymentDaysForm() (+3 more)

### Community 154 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @types/node@^20, typescript@^5, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.16
Nodes (22): BulkState, Booking, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+14 more)

### Community 156 - "documents/[id]/page.tsx"
Cohesion: 0.14
Nodes (24): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+16 more)

### Community 157 - "register/page.tsx"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 158 - "lock.ts"
Cohesion: 0.29
Nodes (7): INCOME_TAX, LockFiling, lockFormsFor(), lockingFiling(), PAYROLL, PURCHASES, SALES

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (32): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+24 more)

### Community 160 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.10
Nodes (40): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+32 more)

### Community 163 - "Textarea"
Cohesion: 0.11
Nodes (23): NoteState, ClientNoteForm(), SignOffState, CatchUpConfirmForms(), CatchUpRecorded, CatchUpRecordForm(), checkTone, checkWord (+15 more)

### Community 164 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (32): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending() (+24 more)

### Community 165 - "books/periods.ts"
Cohesion: 0.36
Nodes (7): BooksMonthRow, BOOKS_MONTH_STATUS_LABELS, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 166 - "workpapers/load.ts"
Cohesion: 0.15
Nodes (21): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+13 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "cx"
Cohesion: 0.09
Nodes (30): ZoomPreview(), switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, BreadcrumbItemProps, BreadcrumbProps, IconComponent (+22 more)

### Community 169 - "requests/actions.ts"
Cohesion: 0.14
Nodes (28): amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text(), ReplyForm(), send() (+20 more)

### Community 170 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 171 - "month.ts"
Cohesion: 0.17
Nodes (14): invoiceLabel(), MissingNumber, missingRanges(), PLAIN, plainForm(), none, TimelineFiling, TimelineItem (+6 more)

### Community 172 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 174 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fields.ts"
Cohesion: 0.13
Nodes (19): ok, FieldKey, keys, normalizeAmount(), normalizeFields(), normalizePartyKind(), normalizeTerms(), ocrOutputSchema (+11 more)

### Community 178 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 180 - "bir-filing-calendar/page.tsx"
Cohesion: 0.27
Nodes (11): BirCalendarPage(), metadata, TextLink(), FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup (+3 more)

### Community 181 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 185 - "pg"
Cohesion: 0.07
Nodes (10): pg, root, root, root, HASH, LEAD, root, Row (+2 more)

### Community 186 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 187 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 188 - "ocr/dates.ts"
Cohesion: 0.43
Nodes (6): dateFarFromMonth(), iso(), month(), MONTHS, parsePrintedDate(), year()

### Community 189 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 190 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 191 - "proof-upload.tsx"
Cohesion: 0.19
Nodes (16): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+8 more)

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 193 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 195 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 196 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 199 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 200 - "review-form.tsx"
Cohesion: 0.09
Nodes (37): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DirectoryParty, ENTRY_STATUS (+29 more)

### Community 202 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1648 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `public.ts`, `formToObject`, `documents/labels.ts`, `app/requests/page.tsx`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `payroll/data.ts`, `settlement-pages.tsx`, `payroll/payroll.test.ts`, `modal.tsx`, `site-document.tsx`, `access.ts`, `Card`, `webhook.ts`, `structured-data.ts`, `module-pages.tsx`, `proposal-view.tsx`, `steps.ts`, `calendar/page.tsx`, `books/export/route.ts`, `formatAmount`, `review-forms.tsx`, `marketing/page.tsx`, `fees/[id]/page.tsx`, `portalContext`, `books/forms.tsx`, `invoice-pages.tsx`, `getIdentity`, `year-end/page.tsx`, `parties/[id]/page.tsx`, `requireOwner`, `remittances/[id]/page.tsx`, `notifications-view.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `filings/actions.ts`, `manilaToday`, `react`, `ledger/books.ts`, `ledger/data.ts`, `money.ts`, `leads/actions.ts`, `documents/[id]/page.tsx`, `profile.ts`, `showMonth`, `lib/books/actions.ts`, `collections/forms.tsx`, `[clientId]/[year]/page.tsx`, `sign-in-form.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `batch/register.ts`, `showDate`, `chrome.tsx`, `read.test.ts`, `idle-watcher.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `auth.ts`, `ledger/data.ts`, `clients/actions.ts`, `transactions-actions.ts`, `site/brand.ts`, `work/load.ts`, `payroll/forms.tsx`, `upload/page.tsx`, `approval-memo.tsx`, `cycle/page.tsx`, `dispatch.ts`, `filings/[id]/page.tsx`, `blocks.tsx`, `package.json`, `move-bar.tsx`, `documents/[id]/page.tsx`, `register/page.tsx`, `onboarding/page.tsx`, `fixed-assets/page.tsx`, `calendar/staff.ts`, `Textarea`, `app/documents/page.tsx`, `opengraph-image.tsx`, `cx`, `requests/actions.ts`, `binder/page.tsx`, `proof-upload.tsx`, `review-form.tsx`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08708357685563997 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `ui.ts`, `public.ts`, `package.json`, `formToObject`, `app/requests/page.tsx`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `returns/types.ts`, `payroll/payroll.test.ts`, `access.ts`, `Card`, `webhook.ts`, `tax-codes.ts`, `structured-data.ts`, `returns/load.ts`, `steps.ts`, `calendar/page.tsx`, `books/export/route.ts`, `lock-bar.tsx`, `marketing/page.tsx`, `engine.ts`, `testing.ts`, `fees/[id]/page.tsx`, `portalContext`, `year.ts`, `client`, `invoice-pages.tsx`, `getIdentity`, `year-end/page.tsx`, `parties/[id]/page.tsx`, `remittances/[id]/page.tsx`, `portal-billing.test.ts`, `notifications-view.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `filings/actions.ts`, `manilaToday`, `generate.ts`, `ledger/books.ts`, `rates.ts`, `ref_node_fs`, `money.ts`, `leads/actions.ts`, `index.ts`, `profile.ts`, `showMonth`, `collections/forms.tsx`, `sign-in-form.tsx`, `quote.ts`, `opening.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `batch/register.ts`, `showDate`, `holiday-list.ts`, `read.test.ts`, `idle-watcher.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `auth.ts`, `ocr/run.ts`, `ledger/data.ts`, `cancel-server.ts`, `clients/actions.ts`, `ticked-allocation.test.ts`, `work/load.ts`, `payroll/forms.tsx`, `approval-memo.tsx`, `cycle/page.tsx`, `dispatch.ts`, `filings/[id]/page.tsx`, `template.ts`, `ledger.test.ts`, `package.json`, `move-bar.tsx`, `register/page.tsx`, `lock.ts`, `onboarding/page.tsx`, `fixed-assets/page.tsx`, `calendar/staff.ts`, `app/documents/page.tsx`, `books/periods.ts`, `workpapers/load.ts`, `month.ts`, `tieouts.test.ts`, `contact-access.test.ts`, `cwt-2307-tracker.test.ts`, `acting-approver.test.ts`, `fields.ts`, `portal-statements-approval.test.ts`, `lead-attribution.test.ts`, `bir-filing-calendar/page.tsx`, `late-surcharges.test.ts`, `contribution-remittances.test.ts`, `tests/register.test.ts`, `pg`, `books-2307.test.ts`, `leads-pipeline.test.ts`, `ocr/dates.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `telegram-uploads.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `fees.test.ts`, `lock-by-return-type.test.ts`, `register-books.test.ts`, `review-form.tsx`, `returns-books.test.ts`, `workpapers.test.ts`, `db.test.ts`, `batch-row-images.test.ts`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.04784313725490196 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `formToObject`, `documents/labels.ts`, `app/requests/page.tsx`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `payroll/data.ts`, `settlement-pages.tsx`, `modal.tsx`, `site-document.tsx`, `access.ts`, `button.tsx`, `Card`, `tax-codes.ts`, `structured-data.ts`, `module-pages.tsx`, `proposal-view.tsx`, `steps.ts`, `calendar/page.tsx`, `formatAmount`, `lock-bar.tsx`, `review-forms.tsx`, `marketing/page.tsx`, `fees/[id]/page.tsx`, `portalContext`, `books/forms.tsx`, `stat-cards.tsx`, `invoice-pages.tsx`, `getIdentity`, `year-end/page.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `requireOwner`, `cx.ts`, `remittances/[id]/page.tsx`, `Notice`, `notifications-view.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `ledger/books.ts`, `ledger/data.ts`, `combobox.tsx`, `money.ts`, `supabaseServer`, `leads/actions.ts`, `documents/[id]/page.tsx`, `profile.ts`, `showMonth`, `collections/forms.tsx`, `[clientId]/[year]/page.tsx`, `sign-in-form.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `batch/register.ts`, `showDate`, `chrome.tsx`, `idle-watcher.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `auth.ts`, `clients/actions.ts`, `site/brand.ts`, `work/load.ts`, `payroll/forms.tsx`, `upload/page.tsx`, `social-button.tsx`, `cycle/page.tsx`, `filings/[id]/page.tsx`, `template.ts`, `theme-toggle.tsx`, `blocks.tsx`, `payment-forms.tsx`, `package.json`, `move-bar.tsx`, `documents/[id]/page.tsx`, `register/page.tsx`, `onboarding/page.tsx`, `fixed-assets/page.tsx`, `calendar/staff.ts`, `Textarea`, `app/documents/page.tsx`, `cx`, `requests/actions.ts`, `binder/page.tsx`, `proof-upload.tsx`, `review-form.tsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._