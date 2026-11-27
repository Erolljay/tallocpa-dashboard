# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 959 files · ~786,467 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5948 nodes · 21025 edges · 217 communities (190 shown, 27 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 187 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `f20ed5c2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- documents/[id]/page.tsx
- migrate.yml
- ui.ts
- public.ts
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- returns/types.ts
- Sign-in & Setup Docs
- notifications-view.tsx
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- ledger/data.ts
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
- payroll/types.ts
- link-button.tsx
- documents/[id]/page.tsx
- payroll/forms.tsx
- modal.tsx
- marketing/page.tsx
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- remittances/[id]/page.tsx
- webhook.ts
- module-pages.tsx
- deadlines/page.tsx
- [month]/page.tsx
- steps.ts
- money.ts
- registrations/forms.tsx
- cx.ts
- books/export/route.ts
- work/page.tsx
- lock-bar.tsx
- ref_node_fs
- settlement-pages.tsx
- Apple Design
- generate.ts
- testing.ts
- quote/page.tsx
- lib/books/actions.ts
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- react
- app/layout.tsx
- vitest
- status.ts
- how-we-work/page.tsx
- form-2307.tsx
- notification.tsx
- Pro components
- tax-codes.ts
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- parts.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- Centavos
- manilaToday
- Recipes
- ledger/data.ts
- BoardUI theming reference
- Pro templates
- names.ts
- Centavos
- opening-checklist.tsx
- cx
- rates.ts
- boardui
- dropdown.tsx
- getIdentity
- filings/[id]/page.tsx
- cycle/page.tsx
- client
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- documents/labels.ts
- year-end/page.tsx
- Field
- google/calendar.ts
- apply-migrations.sh
- payroll-read.tsx
- quote.ts
- source.ts
- leads/forms.tsx
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- structured-data.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- LinkButton
- move-bar.tsx
- gemini.ts
- fixed-assets/page.tsx
- chrome.tsx
- supabaseServer
- ticked-allocation.test.ts
- theme-toggle.tsx
- bulk-actions.ts
- env.ts
- idle-watcher.tsx
- workpapers/load.ts
- addDays
- filings/actions.ts
- formatAmount
- server-only
- opening.ts
- blocks.tsx
- formatAmount
- [slug]/page.tsx
- next
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- app/documents/page.tsx
- registrations/forms.tsx
- template.ts
- leads/[id]/page.tsx
- app/page.tsx
- app/requests/page.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- engine.ts
- filed-returns.ts
- Card
- opengraph-image.tsx
- portal/documents/page.tsx
- registrations/[id]/page.tsx
- requireOwner
- sign-off-actions.tsx
- Textarea
- holiday-list.ts
- react-aria-components
- acting-approver.test.ts
- morning.ts
- runs.tsx
- bir-filing-calendar/page.tsx
- Building UIs with BoardUI
- lead-attribution.test.ts
- register-xlsx.ts
- sign-in-form.tsx
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- login/page.tsx
- site-document.tsx
- cwt-2307-tracker.test.ts
- pg
- parallel-run.test.ts
- books-migration.test.ts
- tests/books.test.ts
- ledger-closing.test.ts
- file-upload.tsx
- portal-nav.tsx
- seed.ts
- site/brand.ts
- breadcrumb.tsx
- binder/page.tsx
- missing-2307/page.tsx
- [id]/books/print/page.tsx
- digest.ts
- generate-qap-fixture.mjs
- db.test.ts
- templates/README.md
- split-bundled-pdfs.test.ts
- funnel.test.ts
- telegram-uploads.test.ts
- fees.test.ts
- fixed-assets.test.ts
- tests/parties.test.ts
- tests/payroll.test.ts
- tasks-and-request-owners.test.ts
- workpapers.test.ts
- books-lock.test.ts
- portal-home.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 367 edges
2. `cx` - 304 edges
3. `react` - 271 edges
4. `Notice()` - 255 edges
5. `Skeleton()` - 254 edges
6. `next` - 233 edges
7. `Button()` - 232 edges
8. `Badge()` - 182 edges
9. `Card()` - 182 edges
10. `vitest` - 181 edges

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

## Communities (217 total, 27 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (40): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one() (+32 more)

### Community 1 - "documents/[id]/page.tsx"
Cohesion: 0.14
Nodes (23): file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), DraftIssue, draftSchema, draftToTemplate() (+15 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (42): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+34 more)

### Community 4 - "public.ts"
Cohesion: 0.09
Nodes (36): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+28 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (31): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+23 more)

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

### Community 11 - "returns/types.ts"
Cohesion: 0.06
Nodes (49): BirLineKey, FinancialStatements, client, row(), form1701, form1702RT, BookIncome, INCOME_GROUPS (+41 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "notifications-view.tsx"
Cohesion: 0.06
Nodes (56): GET(), Content(), PortalNotificationsPage(), Content(), PortalNotificationSettingsPage(), notifyNotificationsChanged(), EmailSwitches(), EmailSwitchGroup (+48 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.09
Nodes (22): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+14 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "ledger/data.ts"
Cohesion: 0.09
Nodes (38): CASH_FLOW_CLASSES, defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section (+30 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.11
Nodes (62): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+54 more)

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
Nodes (43): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary() (+35 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (52): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+44 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "link-button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "documents/[id]/page.tsx"
Cohesion: 0.16
Nodes (25): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+17 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (48): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+40 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (65): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+57 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.12
Nodes (32): server-only, bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), BookingState (+24 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.11
Nodes (39): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+31 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.12
Nodes (44): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+36 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (43): maxDuration, POST(), TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked(), Choice (+35 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.11
Nodes (38): booksContext(), fmtDate(), one(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+30 more)

### Community 55 - "deadlines/page.tsx"
Cohesion: 0.10
Nodes (37): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage() (+29 more)

### Community 56 - "[month]/page.tsx"
Cohesion: 0.15
Nodes (32): saveMonthAction(), MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), Payroll(), PayrollPage() (+24 more)

### Community 57 - "steps.ts"
Cohesion: 0.13
Nodes (22): Agency, birForm(), BranchOptions, CaseStep, ClosureOptions, daysOpen(), EMPLOYER_STEPS, LGU_STEPS (+14 more)

### Community 58 - "money.ts"
Cohesion: 0.06
Nodes (62): SaleSplit, SawtResult, Split, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal (+54 more)

### Community 59 - "registrations/forms.tsx"
Cohesion: 0.12
Nodes (23): dtiRegisteredOn(), fieldErrors(), openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction(), Check(), ClientCaseForm(), branchSchema (+15 more)

### Community 60 - "cx.ts"
Cohesion: 0.09
Nodes (26): @remixicon/react, Batch(), BatchPage(), one(), toCentavos(), day(), Leads(), LeadsPage() (+18 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.11
Nodes (29): dayBefore(), GET(), safe(), cents(), accountLabel(), AGING, aging(), agingBucket() (+21 more)

### Community 62 - "work/page.tsx"
Cohesion: 0.16
Nodes (20): Action(), MyWork(), short(), TONE, loadAssets(), Row, lastMonth(), loadMyWork() (+12 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (29): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+21 more)

### Community 64 - "ref_node_fs"
Cohesion: 0.07
Nodes (14): outDir, pkgDir, require, { version }, dir, readme, templates, ctx (+6 more)

### Community 65 - "settlement-pages.tsx"
Cohesion: 0.11
Nodes (39): INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PaymentsViewPage(), PurchaseInvoicesViewPage() (+31 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.13
Nodes (25): Rule, PlannedObligation, TimelineFiling, TimelineItem, IsoDate, DeadlineRule, EfpsGroup, FilingChannel (+17 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.12
Nodes (25): ClientValues, loadSchedules(), loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines() (+17 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (42): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+34 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.11
Nodes (51): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+43 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.09
Nodes (44): EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+36 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.15
Nodes (39): incomeAttachments(), Periods, buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv(), sawtDat() (+31 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (38): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+30 more)

### Community 77 - "react"
Cohesion: 0.04
Nodes (72): react, BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), PaymentsNewPage(), PaymentsEditPage(), PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage() (+64 more)

### Community 78 - "app/layout.tsx"
Cohesion: 0.13
Nodes (23): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+15 more)

### Community 79 - "vitest"
Cohesion: 0.05
Nodes (15): vitest, dir, root, root, root, root, root, root (+7 more)

### Community 80 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.15
Nodes (30): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+22 more)

### Community 82 - "form-2307.tsx"
Cohesion: 0.16
Nodes (14): Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set(), padded(), PartyFields() (+6 more)

### Community 83 - "notification.tsx"
Cohesion: 0.07
Nodes (30): AvatarColor, AvatarProps, AvatarSize, styles, StatusDot(), StatusDotColor, StatusDotProps, styles (+22 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tax-codes.ts"
Cohesion: 0.21
Nodes (13): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+5 more)

### Community 86 - "Notice"
Cohesion: 0.07
Nodes (91): ClientForm(), BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+83 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.11
Nodes (55): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker() (+47 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "parts.ts"
Cohesion: 0.11
Nodes (22): ACCOUNTS, bookkeepingPart(), c(), cr(), dr(), EntryLine, isBalanced(), one() (+14 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (24): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+16 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "Centavos"
Cohesion: 0.07
Nodes (61): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+53 more)

### Community 94 - "manilaToday"
Cohesion: 0.09
Nodes (48): RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks() (+40 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "ledger/data.ts"
Cohesion: 0.11
Nodes (32): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), RepostRegisterButton(), ReverseForm(), OpeningChecklist() (+24 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 100 - "Centavos"
Cohesion: 0.07
Nodes (40): LooseLeafHead, Pad(), BOOK_ABBR, BookEntry, BookKind, BookLine, Column, ColumnarBook (+32 more)

### Community 101 - "opening-checklist.tsx"
Cohesion: 0.14
Nodes (22): Access, STATUS, Asset, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut (+14 more)

### Community 102 - "cx"
Cohesion: 0.05
Nodes (71): SheetPreview(), CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Checkbox(), CheckboxProps (+63 more)

### Community 103 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "dropdown.tsx"
Cohesion: 0.11
Nodes (28): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+20 more)

### Community 106 - "getIdentity"
Cohesion: 0.12
Nodes (30): ReplyForm(), send(), ProofUpload(), send(), getIdentity, amount, date, ProofState (+22 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (52): ClientTabs(), ClientReturnsPage(), FilingRow, Returns(), FilingListRow, ApprovalMemo(), bookKind, BookRow (+44 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.15
Nodes (24): Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, shift(), CloseCycleButton(), Message() (+16 more)

### Community 109 - "client"
Cohesion: 0.08
Nodes (16): BOOK_LOCK_FORMS, as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth() (+8 more)

### Community 110 - "index.ts"
Cohesion: 0.06
Nodes (22): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+14 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (55): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+47 more)

### Community 113 - "documents/labels.ts"
Cohesion: 0.07
Nodes (50): DocReviewActions(), Doc, DocumentsCard(), when(), Row, Doc, Item, BooksChart() (+42 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 115 - "Field"
Cohesion: 0.08
Nodes (63): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+55 more)

### Community 116 - "google/calendar.ts"
Cohesion: 0.12
Nodes (35): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+27 more)

### Community 118 - "payroll-read.tsx"
Cohesion: 0.22
Nodes (12): KIND_LABEL, MATCH_BADGE, PayrollReadReview(), peso(), ReadItem, addTotals(), checkTotals(), LABELS (+4 more)

### Community 119 - "quote.ts"
Cohesion: 0.08
Nodes (46): corp, items, EstimatedProfile, estimateProfile(), gapFor(), has(), items, schedule (+38 more)

### Community 120 - "source.ts"
Cohesion: 0.09
Nodes (38): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+30 more)

### Community 121 - "leads/forms.tsx"
Cohesion: 0.12
Nodes (40): PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+32 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.32
Nodes (7): afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape(), Spec, SPECS

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (41): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+33 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.11
Nodes (35): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), one() (+27 more)

### Community 126 - "structured-data.ts"
Cohesion: 0.14
Nodes (20): robots(), metadata, sitemap(), SiteBrand, BRAND_NAME, QUOTE_LABEL, SITE_URL, siteUrl() (+12 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (53): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage() (+45 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (78): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), SPREADSHEET_TYPES (+70 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.12
Nodes (31): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, esubmissionMailEnv(), TelegramEnv, accessToken(), call() (+23 more)

### Community 131 - "LinkButton"
Cohesion: 0.19
Nodes (18): NewEntry(), NewEntryPage(), Print(), Print2307Page(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page() (+10 more)

### Community 132 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 133 - "gemini.ts"
Cohesion: 0.06
Nodes (37): MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+29 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 135 - "chrome.tsx"
Cohesion: 0.18
Nodes (19): GlobalNotFound(), metadata, SiteLayout(), SiteNotFound(), HomePage(), SiteDocument(), ButtonLink(), Lockup() (+11 more)

### Community 136 - "supabaseServer"
Cohesion: 0.07
Nodes (61): addClientNoteAction(), NoteState, ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), markCwtFollowedUpAction() (+53 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 139 - "bulk-actions.ts"
Cohesion: 0.05
Nodes (70): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+62 more)

### Community 140 - "env.ts"
Cohesion: 0.14
Nodes (24): removeAssignmentAction(), RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, Row (+16 more)

### Community 141 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (18): POST(), ACTIVITY, readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS (+10 more)

### Community 142 - "workpapers/load.ts"
Cohesion: 0.11
Nodes (29): amt(), Db, TIE, RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd() (+21 more)

### Community 143 - "addDays"
Cohesion: 0.09
Nodes (40): SafeguardsNotice(), invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+32 more)

### Community 144 - "filings/actions.ts"
Cohesion: 0.19
Nodes (18): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+10 more)

### Community 145 - "formatAmount"
Cohesion: 0.13
Nodes (26): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+18 more)

### Community 146 - "server-only"
Cohesion: 0.07
Nodes (56): @supabase/supabase-js, GET(), GET(), GET(), MonthComplete(), SentRow, TimelineRow, runActingDigest() (+48 more)

### Community 147 - "opening.ts"
Cohesion: 0.15
Nodes (20): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+12 more)

### Community 148 - "blocks.tsx"
Cohesion: 0.14
Nodes (20): FLOW_ICONS, GROUP_SPAN, metadata, metadata, BreadcrumbItem(), Crumb, Crumbs(), H1 (+12 more)

### Community 149 - "formatAmount"
Cohesion: 0.21
Nodes (22): booksViewFor(), fmtMonth(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate(), lastMonth(), Reports() (+14 more)

### Community 150 - "[slug]/page.tsx"
Cohesion: 0.14
Nodes (28): AboutPage(), HOW, metadata, BRING, ContactList(), ContactPage(), metadata, FaqPage() (+20 more)

### Community 151 - "next"
Cohesion: 0.11
Nodes (15): nextConfig, next, ClientTab, UNDER, Book(), PortalBookPage(), when, PortalReport() (+7 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.08
Nodes (45): Bell(), emit(), listeners, markReadLocally(), onChanged(), onFocus(), onVisible(), refreshBell() (+37 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.11
Nodes (30): ApprovedReview(), ApprovedRow, ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths() (+22 more)

### Community 156 - "registrations/forms.tsx"
Cohesion: 0.15
Nodes (18): frequencyLabel, Props, StaffOptions(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), FormState, caseNote (+10 more)

### Community 157 - "template.ts"
Cohesion: 0.10
Nodes (22): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS (+14 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (29): NotesCard(), bookedTime, Lead(), LeadPage(), LeadTouch, Person, ICON, NotesTimeline() (+21 more)

### Community 159 - "app/page.tsx"
Cohesion: 0.11
Nodes (31): FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary(), Queue(), ReviewPage() (+23 more)

### Community 160 - "app/requests/page.tsx"
Cohesion: 0.17
Nodes (18): SectionTabs(), Requests(), RequestsPage(), Row, View, VIEWS, clientStatus, fmt() (+10 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (19): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), Interval, manilaInstant(), appBookedEvents() (+11 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.15
Nodes (19): PriceRow, metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money() (+11 more)

### Community 164 - "engine.ts"
Cohesion: 0.19
Nodes (20): compareIso(), lastDayOfMonth(), FilingInstance, fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), nextWorkingDay() (+12 more)

### Community 165 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 166 - "Card"
Cohesion: 0.21
Nodes (19): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+11 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "portal/documents/page.tsx"
Cohesion: 0.24
Nodes (10): Documents(), FolderKey, FOLDERS, MONTHS, one(), PayrollFile, payrollStatus, PortalDocuments() (+2 more)

### Community 169 - "registrations/[id]/page.tsx"
Cohesion: 0.19
Nodes (20): StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+12 more)

### Community 170 - "requireOwner"
Cohesion: 0.07
Nodes (55): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setClientStatusAction(), setIncomeTaxMethodAction(), setupMissingChartsAction() (+47 more)

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.23
Nodes (12): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+4 more)

### Community 172 - "Textarea"
Cohesion: 0.12
Nodes (34): appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage(), accountSchema (+26 more)

### Community 173 - "holiday-list.ts"
Cohesion: 0.16
Nodes (15): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+7 more)

### Community 174 - "react-aria-components"
Cohesion: 0.13
Nodes (17): react-aria-components, SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab(), PillTabList() (+9 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "morning.ts"
Cohesion: 0.31
Nodes (9): Gap, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), RISK_LABELS (+1 more)

### Community 177 - "runs.tsx"
Cohesion: 0.17
Nodes (14): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+6 more)

### Community 178 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 179 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 180 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 181 - "register-xlsx.ts"
Cohesion: 0.13
Nodes (24): RFC-4180, exceljs, sortItems(), filled(), Grid, GridResult, isCsv(), isXls() (+16 more)

### Community 182 - "sign-in-form.tsx"
Cohesion: 0.20
Nodes (13): code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode(), SignInForm(), Divider() (+5 more)

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "login/page.tsx"
Cohesion: 0.26
Nodes (8): GET(), GET(), errors, Form(), LoginPage(), notices, safeNextPath(), IDLE_MINUTES

### Community 186 - "site-document.tsx"
Cohesion: 0.18
Nodes (7): inter, metadata, montserrat, geist, geistMono, montserrat, themeScript

### Community 187 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 188 - "pg"
Cohesion: 0.07
Nodes (9): pg, root, root, root, root, root, HASH, LEAD (+1 more)

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

### Community 193 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 194 - "portal-nav.tsx"
Cohesion: 0.35
Nodes (8): PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab, Tab, under()

### Community 195 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 196 - "site/brand.ts"
Cohesion: 0.33
Nodes (8): metadata, QuotesClosed(), Start(), StartPage(), funnelLive(), clean(), FALLBACK_BRAND, phoneLinks()

### Community 197 - "breadcrumb.tsx"
Cohesion: 0.24
Nodes (6): Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 198 - "binder/page.tsx"
Cohesion: 0.42
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, totals()

### Community 199 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 200 - "[id]/books/print/page.tsx"
Cohesion: 0.52
Nodes (5): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafPages(), bookPeriodLabel()

### Community 201 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 202 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 207 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 210 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 214 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1567 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `ui.ts`, `public.ts`, `package.json`, `onboarding/page.tsx`, `returns/types.ts`, `ledger/data.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `deadlines/page.tsx`, `steps.ts`, `money.ts`, `registrations/forms.tsx`, `books/export/route.ts`, `work/page.tsx`, `lock-bar.tsx`, `ref_node_fs`, `generate.ts`, `testing.ts`, `quote/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `react`, `status.ts`, `form-2307.tsx`, `tax-codes.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `parts.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `Centavos`, `manilaToday`, `names.ts`, `Centavos`, `opening-checklist.tsx`, `rates.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `client`, `index.ts`, `profile.ts`, `documents/labels.ts`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `quote.ts`, `source.ts`, `batch/register.ts`, `structured-data.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `move-bar.tsx`, `gemini.ts`, `fixed-assets/page.tsx`, `ticked-allocation.test.ts`, `bulk-actions.ts`, `idle-watcher.tsx`, `workpapers/load.ts`, `addDays`, `filings/actions.ts`, `server-only`, `opening.ts`, `ledger.test.ts`, `notification-bell.tsx`, `app/documents/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `engine.ts`, `filed-returns.ts`, `requireOwner`, `Textarea`, `holiday-list.ts`, `acting-approver.test.ts`, `runs.tsx`, `bir-filing-calendar/page.tsx`, `lead-attribution.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `login/page.tsx`, `cwt-2307-tracker.test.ts`, `pg`, `parallel-run.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `ledger-closing.test.ts`, `portal-nav.tsx`, `digest.ts`, `db.test.ts`, `split-bundled-pdfs.test.ts`, `funnel.test.ts`, `telegram-uploads.test.ts`, `fees.test.ts`, `fixed-assets.test.ts`, `tests/parties.test.ts`, `tests/payroll.test.ts`, `tasks-and-request-owners.test.ts`, `workpapers.test.ts`, `books-lock.test.ts`, `portal-home.test.ts`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1126530612244898 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `notifications-view.tsx`, `dependencies`, `ledger/data.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `link-button.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `module-pages.tsx`, `deadlines/page.tsx`, `[month]/page.tsx`, `cx.ts`, `work/page.tsx`, `lock-bar.tsx`, `settlement-pages.tsx`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `app/layout.tsx`, `how-we-work/page.tsx`, `form-2307.tsx`, `notification.tsx`, `Notice`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `ledger/data.ts`, `cx`, `dropdown.tsx`, `getIdentity`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `documents/labels.ts`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `payroll-read.tsx`, `quote.ts`, `source.ts`, `leads/forms.tsx`, `batch/register.ts`, `manilaToday`, `structured-data.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `LinkButton`, `move-bar.tsx`, `fixed-assets/page.tsx`, `chrome.tsx`, `supabaseServer`, `theme-toggle.tsx`, `bulk-actions.ts`, `env.ts`, `idle-watcher.tsx`, `formatAmount`, `server-only`, `blocks.tsx`, `formatAmount`, `[slug]/page.tsx`, `next`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `registrations/forms.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `Card`, `portal/documents/page.tsx`, `registrations/[id]/page.tsx`, `requireOwner`, `sign-off-actions.tsx`, `Textarea`, `react-aria-components`, `runs.tsx`, `sign-in-form.tsx`, `login/page.tsx`, `site-document.tsx`, `file-upload.tsx`, `site/brand.ts`, `breadcrumb.tsx`, `binder/page.tsx`, `missing-2307/page.tsx`, `[id]/books/print/page.tsx`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Should `documents/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13846153846153847 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `form-2307.ts`, `documents/[id]/page.tsx`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `notifications-view.tsx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `module-pages.tsx`, `deadlines/page.tsx`, `[month]/page.tsx`, `registrations/forms.tsx`, `cx.ts`, `books/export/route.ts`, `work/page.tsx`, `lock-bar.tsx`, `settlement-pages.tsx`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `react`, `app/layout.tsx`, `form-2307.tsx`, `Notice`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `manilaToday`, `ledger/data.ts`, `opening-checklist.tsx`, `getIdentity`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `documents/labels.ts`, `year-end/page.tsx`, `Field`, `google/calendar.ts`, `source.ts`, `leads/forms.tsx`, `batch/register.ts`, `manilaToday`, `structured-data.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `LinkButton`, `move-bar.tsx`, `fixed-assets/page.tsx`, `chrome.tsx`, `supabaseServer`, `bulk-actions.ts`, `env.ts`, `idle-watcher.tsx`, `workpapers/load.ts`, `filings/actions.ts`, `formatAmount`, `server-only`, `blocks.tsx`, `formatAmount`, `[slug]/page.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `app/requests/page.tsx`, `proposal-view.tsx`, `Card`, `opengraph-image.tsx`, `portal/documents/page.tsx`, `registrations/[id]/page.tsx`, `requireOwner`, `sign-off-actions.tsx`, `Textarea`, `runs.tsx`, `sign-in-form.tsx`, `login/page.tsx`, `site-document.tsx`, `portal-nav.tsx`, `site/brand.ts`, `breadcrumb.tsx`, `binder/page.tsx`, `missing-2307/page.tsx`, `[id]/books/print/page.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._