# Graph Report - agent-ab1656d1527a0564d  (2026-11-27)

## Corpus Check
- 956 files · ~783,134 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: .css 10, (none) 5, .woff2 3)

## Summary
- 5927 nodes · 20960 edges · 204 communities (173 shown, 31 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 185 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `b5e72a33`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- payroll/export/route.ts
- migrate.yml
- ui.ts
- public.ts
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- money.ts
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
- cx.ts
- review-form.tsx
- payroll/forms.tsx
- modal.tsx
- marketing/page.tsx
- scripts
- slots.ts
- fees/[id]/page.tsx
- Badge
- webhook.ts
- module-pages.tsx
- deadlines/page.tsx
- documents/[id]/page.tsx
- registrations/forms.tsx
- returns/types.ts
- deadlines/actions.ts
- quote/page.tsx
- ledger/data.ts
- safeguards.ts
- index.ts
- theme-toggle.tsx
- invoice-pages.tsx
- Apple Design
- filings/run.ts
- testing.ts
- filings/actions.ts
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
- ref_node_fs
- how-we-work/page.tsx
- Textarea
- task-form.tsx
- Pro components
- tax-codes.ts
- tools/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- payroll/payroll.test.ts
- next
- Recipes
- work/load.ts
- BoardUI page patterns
- Pro templates
- fields.ts
- ledger/books.ts
- ledger/types.ts
- cx
- rates.ts
- boardui
- return-file-actions.ts
- sign-off-actions.tsx
- filings/[id]/page.tsx
- cycle/page.tsx
- notifications/format.ts
- templatePayload
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- toCentavos
- quote.ts
- returns/load.ts
- env.ts
- layout.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- showDate
- collections/actions.ts
- parties/[id]/page.tsx
- read.test.ts
- sign-in-form.tsx
- mime.ts
- Notice
- showMonth
- ocr/run.ts
- fixed-assets/page.tsx
- site-document.tsx
- supabaseServer
- ticked-allocation.test.ts
- notification-settings-view.tsx
- pending-review.tsx
- upload/page.tsx
- social-button.tsx
- queries.ts
- filed-returns.ts
- bell-store.ts
- formatAmount
- supabaseAdmin
- opening.ts
- notifications-view.tsx
- eslint.config.mjs
- blocks.tsx
- @supabase/ssr
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- app/documents/page.tsx
- @techstark/opencv-js
- template.ts
- leads/forms.tsx
- manilaToday
- proof-actions.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- leads/[id]/page.tsx
- holiday-list.ts
- site/calendar.ts
- register/page.tsx
- opengraph-image.tsx
- documents/labels.ts
- missing-2307/page.tsx
- requireOwner
- binder/page.tsx
- app/settings/page.tsx
- tieouts.test.ts
- form-1604e.test.ts
- acting-approver.test.ts
- messages.ts
- Building UIs with BoardUI
- generate-qap-fixture.mjs
- post-button.tsx
- db.test.ts
- Centavos
- lead-attribution.test.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- split-bundled-pdfs.test.ts
- books-2307.test.ts
- funnel.test.ts
- leads-pipeline.test.ts
- notifications.test.ts
- portal-statements-approval.test.ts
- telegram-uploads.test.ts
- books-migration.test.ts
- defer-documents.test.ts
- register-books.test.ts
- tests/register.test.ts
- tasks-and-request-owners.test.ts
- workpapers.test.ts
- adjustments.test.ts
- batch-upload.test.ts
- contribution-payables.test.ts
- portal-reports.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 367 edges
2. `cx` - 304 edges
3. `react` - 271 edges
4. `Notice()` - 255 edges
5. `Skeleton()` - 254 edges
6. `next` - 233 edges
7. `Button()` - 232 edges
8. `Card()` - 182 edges
9. `Badge()` - 182 edges
10. `vitest` - 180 edges

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

## Communities (204 total, 31 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (49): booksContext(), BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff() (+41 more)

### Community 1 - "payroll/export/route.ts"
Cohesion: 0.22
Nodes (16): file(), GET(), safe(), yearWorksheet(), PayrollDocument(), ReadPayrollButton(), employeesForMonth(), buildEmployeeTemplate() (+8 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.09
Nodes (48): booksViewFor(), fmtMonth(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate(), lastMonth() (+40 more)

### Community 4 - "public.ts"
Cohesion: 0.13
Nodes (26): instantView(), Quote, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num() (+18 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (30): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+22 more)

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

### Community 11 - "money.ts"
Cohesion: 0.12
Nodes (30): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+22 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "notification-actions.tsx"
Cohesion: 0.16
Nodes (17): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+9 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (45): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES (+37 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (69): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+61 more)

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
Cohesion: 0.08
Nodes (47): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary() (+39 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (36): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+28 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (70): CELL, FirmParallelRunPage(), monthShort(), Summary(), KIND, REASON, Section(), shortDate() (+62 more)

### Community 43 - "employees-xlsx.ts"
Cohesion: 0.12
Nodes (18): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+10 more)

### Community 44 - "cx.ts"
Cohesion: 0.05
Nodes (51): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), Counter(), CounterColor, CounterProps (+43 more)

### Community 45 - "review-form.tsx"
Cohesion: 0.14
Nodes (24): blankLine(), InvoiceForm(), InvoiceFormValue, Booking, BookingFields(), DirectoryParty, ENTRY_STATUS, fmtDay() (+16 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.07
Nodes (65): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+57 more)

### Community 47 - "modal.tsx"
Cohesion: 0.06
Nodes (55): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), AvatarProps, Button() (+47 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (62): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+54 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.13
Nodes (31): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+23 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.12
Nodes (36): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+28 more)

### Community 52 - "Badge"
Cohesion: 0.11
Nodes (46): EmployerCard(), RemittancesDue(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS (+38 more)

### Community 53 - "webhook.ts"
Cohesion: 0.12
Nodes (28): TelegramApi, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF (+20 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.09
Nodes (33): BankAccountsRoute(), SearchParams, BooksFrame(), BooksList(), Column, ListRow, RowLink(), CustomersRoute() (+25 more)

### Community 55 - "deadlines/page.tsx"
Cohesion: 0.10
Nodes (39): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+31 more)

### Community 56 - "documents/[id]/page.tsx"
Cohesion: 0.13
Nodes (28): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+20 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (86): SectionTabs(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction() (+78 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (73): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+65 more)

### Community 59 - "deadlines/actions.ts"
Cohesion: 0.52
Nodes (5): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration()

### Community 60 - "quote/page.tsx"
Cohesion: 0.14
Nodes (21): loadTaxOnFee(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+13 more)

### Community 61 - "ledger/data.ts"
Cohesion: 0.08
Nodes (39): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+31 more)

### Community 62 - "safeguards.ts"
Cohesion: 0.09
Nodes (36): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+28 more)

### Community 63 - "index.ts"
Cohesion: 0.07
Nodes (20): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+12 more)

### Community 64 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (35): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+27 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.07
Nodes (54): fmtDate(), INVOICE_KINDS, InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE, JournalView() (+46 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.07
Nodes (54): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+46 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "filings/actions.ts"
Cohesion: 0.15
Nodes (22): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+14 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (40): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+32 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (40): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+32 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.08
Nodes (58): EmployeeDetail(), EmployeePage(), GridRow, AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer (+50 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.11
Nodes (50): SaleSplit, incomeAttachments(), Periods, periods(), buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments() (+42 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "react"
Cohesion: 0.06
Nodes (71): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+63 more)

### Community 78 - "app/layout.tsx"
Cohesion: 0.08
Nodes (40): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+32 more)

### Community 79 - "vitest"
Cohesion: 0.04
Nodes (20): pg, vitest, dir, root, root, root, root, root (+12 more)

### Community 80 - "ref_node_fs"
Cohesion: 0.07
Nodes (12): outDir, pkgDir, require, { version }, dir, readme, templates, ctx (+4 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "Textarea"
Cohesion: 0.15
Nodes (19): ClientNoteForm(), SignOffState, AmendFilingForm(), NewRequestForm(), ReplyForm(), TicketForm(), php, QuoteDetails() (+11 more)

### Community 83 - "task-form.tsx"
Cohesion: 0.10
Nodes (36): zod, addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState (+28 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tax-codes.ts"
Cohesion: 0.17
Nodes (17): slpCategoryFromCodes(), appliesTo(), canGoOn(), formsFor(), placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+9 more)

### Community 86 - "tools/page.tsx"
Cohesion: 0.15
Nodes (24): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+16 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.10
Nodes (58): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+50 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (23): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+15 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.25
Nodes (14): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+6 more)

### Community 93 - "payroll/payroll.test.ts"
Cohesion: 0.11
Nodes (31): annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation() (+23 more)

### Community 94 - "next"
Cohesion: 0.05
Nodes (68): nextConfig, next, @remixicon/react, FilingsTabsFor(), Section, SECTIONS, TabKey, RequestDetail() (+60 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "work/load.ts"
Cohesion: 0.17
Nodes (16): loadAssets(), Row, lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "fields.ts"
Cohesion: 0.11
Nodes (24): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, LOW_CONFIDENCE (+16 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (45): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+37 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.13
Nodes (23): Access, OpeningChecklist(), STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut (+15 more)

### Community 102 - "cx"
Cohesion: 0.03
Nodes (106): react-aria-components, SheetPreview(), ChipColor, Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, animateTag() (+98 more)

### Community 103 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "return-file-actions.ts"
Cohesion: 0.27
Nodes (16): ActionButton(), EsubmissionControls(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction() (+8 more)

### Community 106 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+2 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (46): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind (+38 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (27): Cycle(), CyclePage(), CycleWithClient, DocRow, MonthComplete(), SentRow, TimelineRow, CloseCycleButton() (+19 more)

### Community 109 - "notifications/format.ts"
Cohesion: 0.20
Nodes (14): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+6 more)

### Community 110 - "templatePayload"
Cohesion: 0.06
Nodes (23): templatePayload(), BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), as() (+15 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.06
Nodes (57): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+49 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (47): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+39 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.12
Nodes (34): disconnectCalendarAction(), GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches() (+26 more)

### Community 118 - "toCentavos"
Cohesion: 0.10
Nodes (36): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+28 more)

### Community 119 - "quote.ts"
Cohesion: 0.05
Nodes (74): PriceRow, EngagementRow, FeeGapPage(), Gap(), ProposalData, corp, items, proposal() (+66 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.06
Nodes (60): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+52 more)

### Community 121 - "env.ts"
Cohesion: 0.28
Nodes (9): maxDuration, POST(), Content(), NotificationSettingsPage(), TelegramEnv, telegramEnv(), ClaimedNotification, telegramApi() (+1 more)

### Community 122 - "layout.ts"
Cohesion: 0.15
Nodes (20): afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape(), Spec, SPECS, bodyBlocks() (+12 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (42): exceljs, BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe() (+34 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "showDate"
Cohesion: 0.11
Nodes (36): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail(), PayNow(), credit() (+28 more)

### Community 126 - "collections/actions.ts"
Cohesion: 0.26
Nodes (15): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), peso, recordDepositAction() (+7 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (48): mergePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList() (+40 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (75): RFC-4180, geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES (+67 more)

### Community 129 - "sign-in-form.tsx"
Cohesion: 0.18
Nodes (16): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+8 more)

### Community 130 - "mime.ts"
Cohesion: 0.11
Nodes (33): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, DatFiles, datFiles(), Db, accessToken() (+25 more)

### Community 131 - "Notice"
Cohesion: 0.09
Nodes (74): BatchUpload(), PreviewTable(), AccountForm(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), ReleaseReportForm(), SetupForm() (+66 more)

### Community 132 - "showMonth"
Cohesion: 0.32
Nodes (13): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+5 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (44): MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+36 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 136 - "supabaseServer"
Cohesion: 0.06
Nodes (71): addClientNoteAction(), NoteState, Detail(), StatementPage(), markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET() (+63 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "notification-settings-view.tsx"
Cohesion: 0.21
Nodes (12): EmailSwitches(), EmailSwitchGroup, Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS, NotificationAudience (+4 more)

### Community 139 - "pending-review.tsx"
Cohesion: 0.11
Nodes (30): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Codes (+22 more)

### Community 140 - "upload/page.tsx"
Cohesion: 0.30
Nodes (12): shift(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), TelegramUnlinkButton(), addMonths() (+4 more)

### Community 141 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 142 - "queries.ts"
Cohesion: 0.22
Nodes (12): GET(), BELL_LIMIT, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications(), loadBellData(), NotificationItem (+4 more)

### Community 143 - "filed-returns.ts"
Cohesion: 0.23
Nodes (10): FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear(), TaxTypeGroup (+2 more)

### Community 144 - "bell-store.ts"
Cohesion: 0.42
Nodes (10): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+2 more)

### Community 145 - "formatAmount"
Cohesion: 0.11
Nodes (30): ParallelRun(), ParallelRunPage(), quarterMonths(), PortalReport(), Report(), when(), Accreditation(), amount() (+22 more)

### Community 146 - "supabaseAdmin"
Cohesion: 0.15
Nodes (30): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+22 more)

### Community 147 - "opening.ts"
Cohesion: 0.16
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+9 more)

### Community 148 - "notifications-view.tsx"
Cohesion: 0.33
Nodes (10): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, fullDateTime() (+2 more)

### Community 149 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 150 - "blocks.tsx"
Cohesion: 0.06
Nodes (91): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+83 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.13
Nodes (27): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+19 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.22
Nodes (18): Bell(), markReadLocally(), useBellData(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell() (+10 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (30): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending() (+22 more)

### Community 157 - "template.ts"
Cohesion: 0.10
Nodes (20): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS (+12 more)

### Community 158 - "leads/forms.tsx"
Cohesion: 0.19
Nodes (25): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+17 more)

### Community 159 - "manilaToday"
Cohesion: 0.10
Nodes (41): DashboardStats(), FilingTable(), FilingsTabs(), OwnerSections(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView() (+33 more)

### Community 160 - "proof-actions.ts"
Cohesion: 0.23
Nodes (12): send(), amount, date, refresh(), rejectProofAction(), StartProof, startProofUpload(), submitProof() (+4 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.20
Nodes (20): FormState, DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant() (+12 more)

### Community 163 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (47): NotesCard(), FunnelSwitch(), bookedTime, Lead(), LeadPage(), LeadTouch, Person, day() (+39 more)

### Community 164 - "holiday-list.ts"
Cohesion: 0.27
Nodes (9): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), STANDARD_HOLIDAYS, StandardHoliday, suggestedDate() (+1 more)

### Community 165 - "site/calendar.ts"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 166 - "register/page.tsx"
Cohesion: 0.13
Nodes (34): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+26 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "documents/labels.ts"
Cohesion: 0.09
Nodes (35): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+27 more)

### Community 169 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 170 - "requireOwner"
Cohesion: 0.05
Nodes (78): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+70 more)

### Community 171 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.14
Nodes (27): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+19 more)

### Community 173 - "tieouts.test.ts"
Cohesion: 0.25
Nodes (5): RegisterRow, base, books, buy, sale

### Community 174 - "form-1604e.test.ts"
Cohesion: 0.25
Nodes (3): client, YEAR, EwtQuarter

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "messages.ts"
Cohesion: 0.17
Nodes (12): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+4 more)

### Community 177 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 178 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 179 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 181 - "Centavos"
Cohesion: 0.16
Nodes (18): Form2316Line, PriorAmounts, LABELS, PayTotals, TotalCheck, totalsAgree(), CheckedRegister, checkRegister() (+10 more)

### Community 182 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 186 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 187 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 188 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 192 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 194 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 197 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1565 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `form-2307.ts`, `payroll/export/route.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `notification-actions.tsx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `review-form.tsx`, `payroll/forms.tsx`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `Badge`, `module-pages.tsx`, `deadlines/page.tsx`, `documents/[id]/page.tsx`, `registrations/forms.tsx`, `deadlines/actions.ts`, `quote/page.tsx`, `ledger/data.ts`, `theme-toggle.tsx`, `invoice-pages.tsx`, `filings/actions.ts`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `react`, `app/layout.tsx`, `Textarea`, `task-form.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `ledger/books.ts`, `ledger/types.ts`, `cx`, `return-file-actions.ts`, `sign-off-actions.tsx`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `toCentavos`, `quote.ts`, `returns/load.ts`, `env.ts`, `batch/register.ts`, `showDate`, `collections/actions.ts`, `parties/[id]/page.tsx`, `sign-in-form.tsx`, `mime.ts`, `Notice`, `showMonth`, `fixed-assets/page.tsx`, `site-document.tsx`, `supabaseServer`, `pending-review.tsx`, `upload/page.tsx`, `queries.ts`, `formatAmount`, `supabaseAdmin`, `notifications-view.tsx`, `blocks.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `leads/forms.tsx`, `manilaToday`, `proof-actions.ts`, `leads/[id]/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `documents/labels.ts`, `missing-2307/page.tsx`, `requireOwner`, `binder/page.tsx`, `app/settings/page.tsx`, `post-button.tsx`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09180327868852459 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `ui.ts`, `public.ts`, `package.json`, `onboarding/page.tsx`, `money.ts`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `payroll/forms.tsx`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `Badge`, `webhook.ts`, `deadlines/page.tsx`, `registrations/forms.tsx`, `returns/types.ts`, `quote/page.tsx`, `ledger/data.ts`, `safeguards.ts`, `index.ts`, `theme-toggle.tsx`, `invoice-pages.tsx`, `filings/run.ts`, `testing.ts`, `filings/actions.ts`, `payroll/data.ts`, `app/layout.tsx`, `ref_node_fs`, `task-form.tsx`, `tax-codes.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `payroll/payroll.test.ts`, `next`, `work/load.ts`, `fields.ts`, `ledger/books.ts`, `ledger/types.ts`, `rates.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `notifications/format.ts`, `templatePayload`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `quote.ts`, `returns/load.ts`, `layout.ts`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `sign-in-form.tsx`, `mime.ts`, `showMonth`, `ocr/run.ts`, `fixed-assets/page.tsx`, `ticked-allocation.test.ts`, `pending-review.tsx`, `upload/page.tsx`, `filed-returns.ts`, `formatAmount`, `supabaseAdmin`, `opening.ts`, `blocks.tsx`, `ledger.test.ts`, `workpapers/page.tsx`, `app/documents/page.tsx`, `template.ts`, `manilaToday`, `calendar/page.tsx`, `leads/[id]/page.tsx`, `holiday-list.ts`, `site/calendar.ts`, `register/page.tsx`, `requireOwner`, `app/settings/page.tsx`, `tieouts.test.ts`, `form-1604e.test.ts`, `acting-approver.test.ts`, `messages.ts`, `db.test.ts`, `lead-attribution.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `split-bundled-pdfs.test.ts`, `books-2307.test.ts`, `funnel.test.ts`, `leads-pipeline.test.ts`, `notifications.test.ts`, `portal-statements-approval.test.ts`, `telegram-uploads.test.ts`, `books-migration.test.ts`, `defer-documents.test.ts`, `register-books.test.ts`, `tests/register.test.ts`, `tasks-and-request-owners.test.ts`, `workpapers.test.ts`, `adjustments.test.ts`, `batch-upload.test.ts`, `contribution-payables.test.ts`, `portal-reports.test.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `notification-actions.tsx`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `cx.ts`, `review-form.tsx`, `payroll/forms.tsx`, `modal.tsx`, `marketing/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `Badge`, `module-pages.tsx`, `deadlines/page.tsx`, `documents/[id]/page.tsx`, `registrations/forms.tsx`, `deadlines/actions.ts`, `quote/page.tsx`, `theme-toggle.tsx`, `invoice-pages.tsx`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `app/layout.tsx`, `how-we-work/page.tsx`, `Textarea`, `task-form.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `next`, `ledger/books.ts`, `cx`, `return-file-actions.ts`, `sign-off-actions.tsx`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `toCentavos`, `quote.ts`, `returns/load.ts`, `env.ts`, `batch/register.ts`, `showDate`, `parties/[id]/page.tsx`, `sign-in-form.tsx`, `Notice`, `showMonth`, `fixed-assets/page.tsx`, `site-document.tsx`, `supabaseServer`, `notification-settings-view.tsx`, `pending-review.tsx`, `upload/page.tsx`, `social-button.tsx`, `queries.ts`, `bell-store.ts`, `formatAmount`, `blocks.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `leads/forms.tsx`, `manilaToday`, `calendar/page.tsx`, `leads/[id]/page.tsx`, `register/page.tsx`, `documents/labels.ts`, `missing-2307/page.tsx`, `requireOwner`, `binder/page.tsx`, `app/settings/page.tsx`, `post-button.tsx`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `ui.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08583959899749373 - nodes in this community are weakly interconnected._