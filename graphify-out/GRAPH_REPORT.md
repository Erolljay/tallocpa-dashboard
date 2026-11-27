# Graph Report - agent-a90df0b736a9aff17  (2026-11-27)

## Corpus Check
- 963 files · ~789,273 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: .css 10, (none) 5, .woff2 3)

## Summary
- 5968 nodes · 21091 edges · 189 communities (169 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 187 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `ab62c26b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- review-form.tsx
- migrate.yml
- ui.ts
- public.ts
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- formatAmount
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
- payroll/types.ts
- button.tsx
- bundle-tools.tsx
- payroll/forms.tsx
- modal.tsx
- marketing/attribution.ts
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- requireStaff
- webhook.ts
- module-pages.tsx
- Card
- requireOwner
- marketing/page.tsx
- returns/types.ts
- steps.ts
- leads/[id]/page.tsx
- arap.ts
- ocr/run.ts
- lock-bar.tsx
- copy-opencv.mjs
- Skeleton
- Apple Design
- filings/run.ts
- testing.ts
- quote/page.tsx
- lib/books/actions.ts
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- invoice-pages.tsx
- parties/forms.tsx
- vitest
- proposal.ts
- how-we-work/page.tsx
- form-2307.tsx
- cx
- Pro components
- tax-codes.ts
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- register/page.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- Centavos
- Badge
- Recipes
- ledger/data.ts
- BoardUI theming reference
- Pro templates
- fields.ts
- ledger/books.ts
- ledger/types.ts
- combobox.tsx
- rates.ts
- boardui
- queries.ts
- getIdentity
- filings/[id]/page.tsx
- cycle/page.tsx
- client
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- [clientId]/page.tsx
- env.ts
- apply-migrations.sh
- notifications-view.tsx
- quote.ts
- returns/load.ts
- leads/actions.ts
- layout.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- notification-settings-view.tsx
- parties/[id]/page.tsx
- documents/[id]/page.tsx
- social-button.tsx
- return-file-actions.ts
- LinkButton
- move-bar.tsx
- gemini.ts
- fixed-assets/page.tsx
- batch/page.tsx
- supabaseServer
- ticked-allocation.test.ts
- notification-bell.tsx
- pending-review.tsx
- clients/[id]/page.tsx
- @remixicon/react
- filings/actions.ts
- safeguards.ts
- lock-actions.ts
- proof-actions.ts
- server-only
- cycle/actions.ts
- bell-store.ts
- [id]/books/page.tsx
- blocks.tsx
- month.ts
- ledger.test.ts
- workpapers/page.tsx
- notifications/format.ts
- app/documents/page.tsx
- registrations/forms.tsx
- template.ts
- notes.ts
- app/page.tsx
- app/requests/page.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- staff/page.tsx
- books/periods.ts
- BoardUI page patterns
- opengraph-image.tsx
- documents/labels.ts
- return-files.tsx
- clients/actions.ts
- react
- app/settings/page.tsx
- settings/actions.ts
- eslint.config.mjs
- acting-approver.test.ts
- tests/register.test.ts
- @supabase/ssr
- @techstark/opencv-js
- sign-in-form.tsx
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- site-document.tsx
- cwt-2307-tracker.test.ts
- books-migration.test.ts
- tests/books.test.ts
- telegram-uploads.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 368 edges
2. `cx` - 304 edges
3. `react` - 271 edges
4. `Notice()` - 256 edges
5. `Skeleton()` - 254 edges
6. `Button()` - 233 edges
7. `next` - 233 edges
8. `vitest` - 183 edges
9. `Badge()` - 182 edges
10. `Card()` - 182 edges

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

## Communities (189 total, 20 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.12
Nodes (38): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one(), portal2307() (+30 more)

### Community 1 - "review-form.tsx"
Cohesion: 0.10
Nodes (33): blankLine(), InvoiceForm(), fmt(), SettlementForm(), addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction() (+25 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (44): BooksFrame(), CustomersRoute(), MonthSelect(), SummaryCard(), KINDS, PartyList(), Cwt2307TrackerPage(), Tracker() (+36 more)

### Community 4 - "public.ts"
Cohesion: 0.16
Nodes (19): ProposalSetup, JobOption, jobOptions(), instantView(), FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+11 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (31): ClientTab, UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+23 more)

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

### Community 11 - "formatAmount"
Cohesion: 0.08
Nodes (45): AGENCIES, Db, LOANS, p(), Run, qapBuckets(), AlphaCols, alphaCols() (+37 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "notification-actions.tsx"
Cohesion: 0.16
Nodes (19): notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, IconComponent, Tab(), TabList() (+11 more)

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
Nodes (42): defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES, FsLine, FsLineKey (+34 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.11
Nodes (56): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+48 more)

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
Nodes (47): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), Rematch2307Button(), CwtLooseDocuments(), CwtTrackerGroups() (+39 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (80): ParallelRun(), ParallelRunPage(), quarterMonths(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Atcs() (+72 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "bundle-tools.tsx"
Cohesion: 0.46
Nodes (7): deleteBundleInvoiceAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice(), Status(), runOcrAction()

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.07
Nodes (72): Employees(), checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState (+64 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "marketing/attribution.ts"
Cohesion: 0.14
Nodes (33): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+25 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+25 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.09
Nodes (47): zod, activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction() (+39 more)

### Community 52 - "requireStaff"
Cohesion: 0.09
Nodes (57): EmployerCard(), markCwtFollowedUpAction(), FilingsTabs(), GET(), ListRow, ORDER, Remittance(), RemittancePage() (+49 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (47): maxDuration, POST(), TelegramEnv, telegramEnv(), ClaimedNotification, TelegramApi, telegramApi(), ALLOWED (+39 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.09
Nodes (27): BankAccountsRoute(), SearchParams, BooksList(), Column, ListRow, RowLink(), ReverseForm(), JournalEntryRoute() (+19 more)

### Community 55 - "Card"
Cohesion: 0.08
Nodes (48): ClientTabs(), ClientReturnsPage(), Returns(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting() (+40 more)

### Community 56 - "requireOwner"
Cohesion: 0.11
Nodes (37): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+29 more)

### Community 57 - "marketing/page.tsx"
Cohesion: 0.11
Nodes (27): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+19 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (59): lookupAtc(), client, VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule() (+51 more)

### Community 59 - "steps.ts"
Cohesion: 0.05
Nodes (81): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+73 more)

### Community 60 - "leads/[id]/page.tsx"
Cohesion: 0.11
Nodes (33): BookingLink(), ConvertForm(), CopyLink(), DiscoveryCallForm(), FunnelSwitch(), JobRow(), LostForm(), Person (+25 more)

### Community 61 - "arap.ts"
Cohesion: 0.15
Nodes (19): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+11 more)

### Community 62 - "ocr/run.ts"
Cohesion: 0.16
Nodes (20): isSplittable(), MAX_BUNDLE_PAGES, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+12 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.17
Nodes (21): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+13 more)

### Community 64 - "copy-opencv.mjs"
Cohesion: 0.18
Nodes (6): outDir, pkgDir, require, { version }, ctx, input

### Community 65 - "Skeleton"
Cohesion: 0.09
Nodes (42): fmtDate(), EmployeesRoute(), InvoiceView(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), PurchaseInvoicesViewPage() (+34 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.06
Nodes (61): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+53 more)

### Community 68 - "testing.ts"
Cohesion: 0.09
Nodes (34): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), form1701, form1702RT, year (+26 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.16
Nodes (19): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), complexity() (+11 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.14
Nodes (28): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+20 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (43): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+35 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.08
Nodes (52): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage() (+44 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.12
Nodes (51): SaleSplit, incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm (+43 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "invoice-pages.tsx"
Cohesion: 0.12
Nodes (21): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage() (+13 more)

### Community 78 - "parties/forms.tsx"
Cohesion: 0.20
Nodes (16): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), PRESET_ACCOUNTS (+8 more)

### Community 79 - "vitest"
Cohesion: 0.02
Nodes (42): pg, vitest, dir, root, root, root, root, root (+34 more)

### Community 80 - "proposal.ts"
Cohesion: 0.16
Nodes (15): bandForSales(), JOB_GROUPS, JobBand, JobGroup, jobGroupOf(), ProposalQuote, readJobs(), Quote (+7 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.11
Nodes (37): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+29 more)

### Community 82 - "form-2307.tsx"
Cohesion: 0.19
Nodes (16): PortalPrint2307Page(), Print(), portal2307Href(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+8 more)

### Community 83 - "cx"
Cohesion: 0.03
Nodes (93): ZoomPreview(), AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles (+85 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tax-codes.ts"
Cohesion: 0.16
Nodes (17): SettingsPage(), SettingsRoute(), loadTaxCodes(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf() (+9 more)

### Community 86 - "Notice"
Cohesion: 0.09
Nodes (74): ClientForm(), StaffOptions(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), CloseYearForm(), EntryForm() (+66 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (67): PortalClient, Portal2316(), Portal2316Page(), Books(), PortalBooks(), PortalCwt2307Page(), Tracker(), basePeriod() (+59 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "register/page.tsx"
Cohesion: 0.09
Nodes (41): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+33 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (24): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+16 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 93 - "Centavos"
Cohesion: 0.06
Nodes (71): file(), GET(), safe(), AlphalistRow, Form2316Data, Form2316Line, AnnualSummary, annualTax() (+63 more)

### Community 94 - "Badge"
Cohesion: 0.09
Nodes (56): SectionTabs(), RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow (+48 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "ledger/data.ts"
Cohesion: 0.09
Nodes (44): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ChangeBooksStartForm(), ConfirmAllButton(), ConfirmButton() (+36 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "fields.ts"
Cohesion: 0.10
Nodes (27): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+19 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (46): BookPrint(), BookPrintPage(), PrintButton(), BookPrint(), PortalBookPrint(), LooseLeafHead, LooseLeafPages(), Pad() (+38 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.08
Nodes (39): Access, STATUS, CASH_FLOW_CLASSES, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut (+31 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (79): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps, ComboBoxSelectionMode (+71 more)

### Community 103 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "queries.ts"
Cohesion: 0.18
Nodes (15): GET(), NotificationKind, BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+7 more)

### Community 106 - "getIdentity"
Cohesion: 0.12
Nodes (30): amendFilingAction(), PortalRequest(), RequestDetail(), DocumentUpload(), send(), upload(), Item, typeFromName() (+22 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (46): FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText, Filing() (+38 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.12
Nodes (30): DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one() (+22 more)

### Community 109 - "client"
Cohesion: 0.06
Nodes (22): as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll() (+14 more)

### Community 110 - "index.ts"
Cohesion: 0.04
Nodes (30): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+22 more)

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
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (45): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+37 more)

### Community 116 - "env.ts"
Cohesion: 0.20
Nodes (18): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+10 more)

### Community 118 - "notifications-view.tsx"
Cohesion: 0.24
Nodes (13): Content(), NotificationsPage(), Content(), PortalNotificationsPage(), Empty(), NotificationsView(), one(), SearchParams (+5 more)

### Community 119 - "quote.ts"
Cohesion: 0.10
Nodes (38): PriceRow, proposal(), EstimatedProfile, estimateProfile(), gapFor(), has(), buildProposalQuote(), buildQuote() (+30 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.07
Nodes (52): recomputeWorksheetAction(), WorksheetState, LOCKED_STATUSES, FinancialStatements, ATC_MASTER, AtcInfo, normalizeAtc(), row() (+44 more)

### Community 121 - "leads/actions.ts"
Cohesion: 0.15
Nodes (26): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), emailProposalAction() (+18 more)

### Community 122 - "layout.ts"
Cohesion: 0.13
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (38): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+30 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.11
Nodes (36): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), portalContext() (+28 more)

### Community 126 - "notification-settings-view.tsx"
Cohesion: 0.21
Nodes (13): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor() (+5 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (38): fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList(), Row, datAddress() (+30 more)

### Community 128 - "documents/[id]/page.tsx"
Cohesion: 0.03
Nodes (122): RFC-4180, BOOKED_TYPES, BundleChild, PayrollDocument(), Supabase, applyColumnsAction(), done(), payrollDocument() (+114 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "LinkButton"
Cohesion: 0.23
Nodes (16): booksContext(), BooksContext, booksViewFor(), one(), Print(), Print2307Page(), PrintAll(), PrintAll2316Page() (+8 more)

### Community 132 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 133 - "gemini.ts"
Cohesion: 0.07
Nodes (24): OcrManyOutput, OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL (+16 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (19): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), loadAssets(), Row (+11 more)

### Community 135 - "batch/page.tsx"
Cohesion: 0.23
Nodes (11): BatchUpload(), PreviewTable(), Batch(), BatchPage(), one(), toCentavos(), generateFilingsNow(), generatePastFilingsAction() (+3 more)

### Community 136 - "supabaseServer"
Cohesion: 0.06
Nodes (50): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), addBundleInvoiceAction() (+42 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "notification-bell.tsx"
Cohesion: 0.27
Nodes (13): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), Counter(), DropdownPopover() (+5 more)

### Community 139 - "pending-review.tsx"
Cohesion: 0.09
Nodes (38): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Codes (+30 more)

### Community 140 - "clients/[id]/page.tsx"
Cohesion: 0.15
Nodes (21): RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, ClientList(), ClientsPage(), Row (+13 more)

### Community 141 - "@remixicon/react"
Cohesion: 0.06
Nodes (63): @remixicon/react, ApprovedReview(), AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu() (+55 more)

### Community 142 - "filings/actions.ts"
Cohesion: 0.06
Nodes (60): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, advanceFilingAction() (+52 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.08
Nodes (37): board, MARCO, none, RHEA, row(), steps, documentCutoff(), DONE_FROM_STATUS (+29 more)

### Community 144 - "lock-actions.ts"
Cohesion: 0.31
Nodes (12): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+4 more)

### Community 145 - "proof-actions.ts"
Cohesion: 0.23
Nodes (12): send(), amount, date, refresh(), rejectProofAction(), StartProof, startProofUpload(), submitProof() (+4 more)

### Community 146 - "server-only"
Cohesion: 0.08
Nodes (49): server-only, @supabase/supabase-js, GET(), GET(), GET(), digestMessage(), DigestRow, longDay() (+41 more)

### Community 147 - "cycle/actions.ts"
Cohesion: 0.30
Nodes (10): MonthComplete(), SentRow, TimelineRow, confirmMonthAction(), CycleState, decideExceptionAction(), refresh(), text() (+2 more)

### Community 148 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 149 - "[id]/books/page.tsx"
Cohesion: 0.15
Nodes (20): fmtMonth(), WithdrawReportButton(), BooksSummaryPage(), Summary(), fmtDate(), lastMonth(), Reports(), ReportsPage() (+12 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.06
Nodes (93): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+85 more)

### Community 151 - "month.ts"
Cohesion: 0.29
Nodes (9): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+1 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+14 more)

### Community 154 - "notifications/format.ts"
Cohesion: 0.20
Nodes (14): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+6 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.11
Nodes (31): ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths() (+23 more)

### Community 156 - "registrations/forms.tsx"
Cohesion: 0.28
Nodes (8): caseNote, caseTitle, Check(), ChecklistPreview(), ClientCaseForm(), statusTone, submitLabel, today()

### Community 157 - "template.ts"
Cohesion: 0.06
Nodes (41): ProposalData, corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, jobField (+33 more)

### Community 158 - "notes.ts"
Cohesion: 0.18
Nodes (15): NotesCard(), ClientNoteForm(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry, noteEntry() (+7 more)

### Community 159 - "app/page.tsx"
Cohesion: 0.14
Nodes (31): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+23 more)

### Community 160 - "app/requests/page.tsx"
Cohesion: 0.19
Nodes (13): RequestsPage(), Row, View, VIEWS, PortalRequests(), Requests(), Row, when() (+5 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.12
Nodes (35): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), Interval, manilaInstant(), Admin (+27 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.17
Nodes (16): jobName(), lineName(), longDate(), money(), php, ProposalView(), Rows(), Section() (+8 more)

### Community 164 - "staff/page.tsx"
Cohesion: 0.42
Nodes (7): BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 165 - "books/periods.ts"
Cohesion: 0.36
Nodes (7): BooksMonthRow, BOOKS_MONTH_STATUS_LABELS, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 166 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "documents/labels.ts"
Cohesion: 0.10
Nodes (32): Doc, ExceptionRow, BundleDocument(), DocumentReviewPage(), loadBooking(), loadBundle(), Review(), Row (+24 more)

### Community 169 - "return-files.tsx"
Cohesion: 0.57
Nodes (6): ActionButton(), EsubmissionControls(), ReturnFileUpload(), send(), addReturnFile(), startReturnFileUpload()

### Community 170 - "clients/actions.ts"
Cohesion: 0.06
Nodes (56): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+48 more)

### Community 171 - "react"
Cohesion: 0.08
Nodes (34): react, DocReviewActions(), ExplainForm(), SignOffState, checkTone, checkWord, needsNote(), noteLabel() (+26 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.15
Nodes (26): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+18 more)

### Community 173 - "settings/actions.ts"
Cohesion: 0.21
Nodes (15): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+7 more)

### Community 174 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 182 - "sign-in-form.tsx"
Cohesion: 0.27
Nodes (10): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), notices, SignInForm(), Divider() (+2 more)

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 186 - "site-document.tsx"
Cohesion: 0.11
Nodes (16): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+8 more)

### Community 187 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 190 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 202 - "telegram-uploads.test.ts"
Cohesion: 0.14
Nodes (6): api, ctx, fn, rows, src, root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1576 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `review-form.tsx`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `formatAmount`, `notification-actions.tsx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `payroll/forms.tsx`, `marketing/attribution.ts`, `supabaseAdmin`, `fees/[id]/page.tsx`, `requireStaff`, `webhook.ts`, `module-pages.tsx`, `Card`, `requireOwner`, `marketing/page.tsx`, `steps.ts`, `leads/[id]/page.tsx`, `lock-bar.tsx`, `Skeleton`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `invoice-pages.tsx`, `parties/forms.tsx`, `form-2307.tsx`, `cx`, `Notice`, `portal/reports/page.tsx`, `register/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `Centavos`, `Badge`, `ledger/data.ts`, `ledger/books.ts`, `ledger/types.ts`, `queries.ts`, `getIdentity`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `env.ts`, `notifications-view.tsx`, `returns/load.ts`, `leads/actions.ts`, `batch/register.ts`, `manilaToday`, `parties/[id]/page.tsx`, `documents/[id]/page.tsx`, `return-file-actions.ts`, `LinkButton`, `move-bar.tsx`, `fixed-assets/page.tsx`, `batch/page.tsx`, `notification-bell.tsx`, `pending-review.tsx`, `clients/[id]/page.tsx`, `@remixicon/react`, `filings/actions.ts`, `lock-actions.ts`, `proof-actions.ts`, `server-only`, `cycle/actions.ts`, `[id]/books/page.tsx`, `blocks.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `app/page.tsx`, `app/requests/page.tsx`, `opengraph-image.tsx`, `documents/labels.ts`, `return-files.tsx`, `clients/actions.ts`, `react`, `app/settings/page.tsx`, `settings/actions.ts`, `site-document.tsx`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11649659863945579 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `ui.ts`, `public.ts`, `package.json`, `onboarding/page.tsx`, `formatAmount`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `payroll/forms.tsx`, `marketing/attribution.ts`, `supabaseAdmin`, `fees/[id]/page.tsx`, `requireStaff`, `webhook.ts`, `Card`, `returns/types.ts`, `steps.ts`, `arap.ts`, `ocr/run.ts`, `lock-bar.tsx`, `filings/run.ts`, `testing.ts`, `quote/page.tsx`, `payroll/data.ts`, `invoice-pages.tsx`, `proposal.ts`, `tax-codes.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `Centavos`, `Badge`, `fields.ts`, `ledger/books.ts`, `ledger/types.ts`, `rates.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `client`, `index.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `env.ts`, `quote.ts`, `returns/load.ts`, `leads/actions.ts`, `layout.ts`, `batch/register.ts`, `parties/[id]/page.tsx`, `documents/[id]/page.tsx`, `return-file-actions.ts`, `move-bar.tsx`, `gemini.ts`, `fixed-assets/page.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `pending-review.tsx`, `@remixicon/react`, `filings/actions.ts`, `safeguards.ts`, `server-only`, `[id]/books/page.tsx`, `blocks.tsx`, `month.ts`, `ledger.test.ts`, `notifications/format.ts`, `app/documents/page.tsx`, `template.ts`, `notes.ts`, `app/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `books/periods.ts`, `clients/actions.ts`, `app/settings/page.tsx`, `settings/actions.ts`, `acting-approver.test.ts`, `tests/register.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `cwt-2307-tracker.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `telegram-uploads.test.ts`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `review-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09615384615384616 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `review-form.tsx`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `notification-actions.tsx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `button.tsx`, `bundle-tools.tsx`, `payroll/forms.tsx`, `modal.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `requireStaff`, `module-pages.tsx`, `Card`, `marketing/page.tsx`, `steps.ts`, `leads/[id]/page.tsx`, `lock-bar.tsx`, `Skeleton`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `invoice-pages.tsx`, `parties/forms.tsx`, `how-we-work/page.tsx`, `form-2307.tsx`, `cx`, `tax-codes.ts`, `Notice`, `portal/reports/page.tsx`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `Badge`, `ledger/data.ts`, `ledger/books.ts`, `combobox.tsx`, `queries.ts`, `getIdentity`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `env.ts`, `notifications-view.tsx`, `leads/actions.ts`, `manilaToday`, `notification-settings-view.tsx`, `parties/[id]/page.tsx`, `documents/[id]/page.tsx`, `social-button.tsx`, `LinkButton`, `move-bar.tsx`, `fixed-assets/page.tsx`, `batch/page.tsx`, `supabaseServer`, `notification-bell.tsx`, `pending-review.tsx`, `clients/[id]/page.tsx`, `@remixicon/react`, `filings/actions.ts`, `cycle/actions.ts`, `bell-store.ts`, `[id]/books/page.tsx`, `blocks.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `registrations/forms.tsx`, `template.ts`, `notes.ts`, `app/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `staff/page.tsx`, `documents/labels.ts`, `return-files.tsx`, `clients/actions.ts`, `app/settings/page.tsx`, `sign-in-form.tsx`, `site-document.tsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._