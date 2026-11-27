# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1025 files · ~855,670 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6270 nodes · 22385 edges · 195 communities (174 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `c493521d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- vitest
- migrate.yml
- ui.ts
- quote/page.tsx
- package.json
- auth.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/[id]/page.tsx
- Sign-in & Setup Docs
- Skeleton
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
- quote.ts
- returns/types.ts
- clients/actions.ts
- payroll/payroll.test.ts
- modal.tsx
- app/page.tsx
- scripts
- supabaseAdmin
- button.tsx
- requireStaff
- webhook.ts
- cx
- marketing/page.tsx
- tax-codes.ts
- chrome.tsx
- returns/load.ts
- steps.ts
- fields.ts
- arap.ts
- lock-bar.tsx
- invoice-pages.tsx
- [month]/page.tsx
- marketing/page.tsx
- Apple Design
- engine.ts
- testing.ts
- notification.tsx
- returns/types.ts
- books/forms.tsx
- fixed-assets/page.tsx
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- deadlines/actions.ts
- formatAmount
- workpapers/load.ts
- parties/[id]/page.tsx
- how-we-work/page.tsx
- module-pages.tsx
- cx
- Pro components
- lib/books/actions.ts
- react
- portalContext
- portal-billing.test.ts
- @remixicon/react
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- workpapers/page.tsx
- work/page.tsx
- Recipes
- payroll/data.ts
- BoardUI page patterns
- Pro templates
- LinkButton
- Centavos
- tools/page.tsx
- combobox.tsx
- site-document.tsx
- boardui
- access.ts
- layout.ts
- module-pages.tsx
- leads/actions.ts
- report-periods.ts
- [id]/books/page.tsx
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- ledger/data.ts
- [clientId]/page.tsx
- app/requests/[id]/page.tsx
- apply-migrations.sh
- fees/schedule.ts
- tax-codes.ts
- cancel-server.ts
- notifications/format.ts
- proof-upload.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- filings/actions.ts
- morning.ts
- read.test.ts
- bir-filing-calendar/page.tsx
- mime.ts
- app/settings/page.tsx
- settlement-pages.tsx
- ocr/run.ts
- leads/[id]/page.tsx
- blocks.tsx
- formToObject
- ticked-allocation.test.ts
- filings/actions.ts
- branches/page.tsx
- books/data.ts
- payroll/forms.tsx
- webhook/route.ts
- deadlines/page.tsx
- holiday-list.ts
- portal/reports/cwt-2307/page.tsx
- server-only
- app/layout.tsx
- template.ts
- seed.ts
- formatAmount
- status.ts
- filters.tsx
- split-bundled-pdfs.test.ts
- social-button.tsx
- move-bar.tsx
- app/documents/page.tsx
- eslint.config.mjs
- step-files.tsx
- clients/[id]/page.tsx
- books-2307.test.ts
- Rework: one flow from lead to year-end
- calendar/staff.ts
- template.ts
- binder/page.tsx
- terms.ts
- register/page.tsx
- opengraph-image.tsx
- ledger.test.ts
- getIdentity
- eslint.config.mjs
- react
- catch-up.test.ts
- documents/cutoff.ts
- notification-bell.tsx
- acting-approver.test.ts
- names.ts
- returns-sign-off.test.ts
- db.test.ts
- lead-attribution.test.ts
- list-search.tsx
- telegram-uploads.test.ts
- tests/register.test.ts
- rates.ts
- tests/proposal-email.test.ts
- batch-upload.test.ts
- parallel-run.test.ts
- ref_node_fs
- tests/books.test.ts
- Badge
- review-form.tsx
- templates/README.md
- Centavos
- contribution-remittances.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 400 edges
2. `cx` - 315 edges
3. `react` - 286 edges
4. `Notice()` - 274 edges
5. `Skeleton()` - 260 edges
6. `Button()` - 250 edges
7. `next` - 246 edges
8. `vitest` - 198 edges
9. `Card()` - 189 edges
10. `Badge()` - 187 edges

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

## Communities (195 total, 21 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (57): BooksContext, Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href(), Portal2307() (+49 more)

### Community 1 - "vitest"
Cohesion: 0.02
Nodes (63): vitest, dir, acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST (+55 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.09
Nodes (39): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+31 more)

### Community 4 - "quote/page.tsx"
Cohesion: 0.11
Nodes (27): loadTaxOnFee(), PriceRow, COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL (+19 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "auth.ts"
Cohesion: 0.14
Nodes (16): CELL, FirmParallelRunPage(), monthShort(), Summary(), ActingState, appointActingAction(), endActingAction(), refresh() (+8 more)

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

### Community 11 - "documents/[id]/page.tsx"
Cohesion: 0.12
Nodes (28): deleteBundleInvoiceAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice(), Status(), BOOKED_TYPES, BundleChild (+20 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "Skeleton"
Cohesion: 0.07
Nodes (73): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), EmployeeDetail(), EmployeePage(), Payroll() (+65 more)

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
Cohesion: 0.07
Nodes (51): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), defaultCashFlow(), codes, PNL (+43 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (78): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), annualAttachments(), balanceSheet(), compute1701() (+70 more)

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
Nodes (51): Cwt2307TrackerPage(), Tracker(), amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtFollowUpForm() (+43 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (52): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+44 more)

### Community 43 - "quote.ts"
Cohesion: 0.06
Nodes (66): ProposalSetup, corp, items, proposal(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+58 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.05
Nodes (61): SaleSplit, tinDashed(), tinHasBranch(), client, row(), SawtResult, Split, payslipSchedule() (+53 more)

### Community 45 - "clients/actions.ts"
Cohesion: 0.09
Nodes (29): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), removeAssignmentAction(), setCatchUpAction(), setClientStatusAction() (+21 more)

### Community 46 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (44): MonthGrid(), toInput(), PayrollDocument(), ReadPayrollButton(), monthlyTable(), monthlyWithholding(), BirCategory, Category (+36 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (45): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), globalSearch(), SearchHit (+37 more)

### Community 48 - "app/page.tsx"
Cohesion: 0.07
Nodes (37): ClientCaseKind, dtiRegisteredOn(), fieldErrors(), openRegistrationAction(), openYearRenewalsAction(), PROOF_TYPES, updateStepAction(), ChecklistPreview() (+29 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.16
Nodes (22): Booking(), BookingPage(), metadata, when, slotsFor(), addDays(), byDay(), DAY_LABEL (+14 more)

### Community 51 - "button.tsx"
Cohesion: 0.06
Nodes (38): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+30 more)

### Community 52 - "requireStaff"
Cohesion: 0.13
Nodes (36): EmployerCard(), RemittancesDue(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS (+28 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (42): SPREADSHEET_TYPES, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF (+34 more)

### Community 54 - "cx"
Cohesion: 0.07
Nodes (50): NotesCard(), ClientNoteForm(), BookingLink(), ConvertForm(), CopyLink(), DiscoveryCallForm(), FunnelSwitch(), JobRow() (+42 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (28): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+20 more)

### Community 56 - "tax-codes.ts"
Cohesion: 0.14
Nodes (33): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), peso (+25 more)

### Community 57 - "chrome.tsx"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.06
Nodes (58): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+50 more)

### Community 59 - "steps.ts"
Cohesion: 0.05
Nodes (92): cancelRegistrationAction(), completeRegistrationAction(), FormState, openClientCaseAction(), caseNote, caseTitle, Check(), CityField() (+84 more)

### Community 60 - "fields.ts"
Cohesion: 0.11
Nodes (26): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+18 more)

### Community 61 - "arap.ts"
Cohesion: 0.16
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 62 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (31): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+23 more)

### Community 63 - "invoice-pages.tsx"
Cohesion: 0.12
Nodes (22): INVOICE_KINDS, InvoiceEdit(), InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage() (+14 more)

### Community 64 - "[month]/page.tsx"
Cohesion: 0.13
Nodes (26): file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db (+18 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.12
Nodes (37): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+29 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.10
Nodes (41): PlannedObligation, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), DeadlineRule, EfpsGroup, FilingChannel (+33 more)

### Community 68 - "testing.ts"
Cohesion: 0.12
Nodes (26): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+18 more)

### Community 69 - "notification.tsx"
Cohesion: 0.08
Nodes (27): react-dom@19.3.0, react-dom, AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 70 - "returns/types.ts"
Cohesion: 0.09
Nodes (37): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell(), datDate() (+29 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (39): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+31 more)

### Community 72 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (19): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), loadAssets(), Row (+11 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.12
Nodes (38): branchOfTin(), payeeKeyOf(), tin9(), tinDigits(), invoiceLabel(), sawtAnnualAttachments(), SawtAnnualForm, sawtAttachments() (+30 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (45): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+37 more)

### Community 77 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 78 - "formatAmount"
Cohesion: 0.13
Nodes (29): booksContext(), one(), ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents() (+21 more)

### Community 79 - "workpapers/load.ts"
Cohesion: 0.10
Nodes (31): amt(), Db, TIE, BOOKS_GO_LIVE, RegisterLine, Adjustment, c(), loadPeriodFile() (+23 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.09
Nodes (45): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+37 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.10
Nodes (38): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+30 more)

### Community 82 - "module-pages.tsx"
Cohesion: 0.15
Nodes (29): FormState, ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), AssignForm(), CatchUpForm() (+21 more)

### Community 83 - "cx"
Cohesion: 0.04
Nodes (65): ApprovedRow, switchBusinessAction(), BusinessSwitcher(), CounterColor, CounterProps, styles, StatusDot(), StatusDotColor (+57 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (40): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+32 more)

### Community 86 - "react"
Cohesion: 0.07
Nodes (76): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+68 more)

### Community 87 - "portalContext"
Cohesion: 0.08
Nodes (71): ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, PortalClient, portalContext, Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+63 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "@remixicon/react"
Cohesion: 0.06
Nodes (52): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+44 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 93 - "workpapers/page.tsx"
Cohesion: 0.13
Nodes (18): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, ExplainForm(), amt(), one() (+10 more)

### Community 94 - "work/page.tsx"
Cohesion: 0.09
Nodes (38): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, View, VIEWS, Action() (+30 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.07
Nodes (67): GridRow, buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+59 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "LinkButton"
Cohesion: 0.39
Nodes (8): PrintAll(), PrintAll2316Page(), Portal2316(), Portal2316Page(), Form2316Set(), Form2316Sheet(), PrintButton(), load2316()

### Community 100 - "Centavos"
Cohesion: 0.06
Nodes (52): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages() (+44 more)

### Community 101 - "tools/page.tsx"
Cohesion: 0.16
Nodes (22): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), RepostRegisterButton(), ReverseForm(), OpeningChecklist() (+14 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (80): react-aria-components, SheetPreview(), ChipColor, animateTag(), ComboBox(), ComboBoxItem(), ComboBoxItemProps, ComboBoxProps (+72 more)

### Community 103 - "site-document.tsx"
Cohesion: 0.16
Nodes (12): GlobalNotFound(), metadata, metadata, SiteLayout(), SiteNotFound(), geist, geistMono, montserrat (+4 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "access.ts"
Cohesion: 0.16
Nodes (24): AccessOptions(), AccessRowForm(), AddBusinessForm(), Business, ContactDetailsForm(), NewContactForm(), RemoveBusinessButton(), Result() (+16 more)

### Community 106 - "layout.ts"
Cohesion: 0.13
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 107 - "module-pages.tsx"
Cohesion: 0.14
Nodes (21): BankAccountsRoute(), fmtDate(), BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), JournalRoute() (+13 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.14
Nodes (28): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+20 more)

### Community 109 - "report-periods.ts"
Cohesion: 0.14
Nodes (29): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+21 more)

### Community 110 - "[id]/books/page.tsx"
Cohesion: 0.17
Nodes (23): booksViewFor(), fmtMonth(), SearchParams, BooksFrame(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate() (+15 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (47): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+39 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (43): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+35 more)

### Community 114 - "ledger/data.ts"
Cohesion: 0.06
Nodes (51): Access, STATUS, BookEntry, CASH_FLOW_CLASSES, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES (+43 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.09
Nodes (50): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+42 more)

### Community 116 - "app/requests/[id]/page.tsx"
Cohesion: 0.08
Nodes (55): RequestDetail(), RequestPage(), NewRequestForm(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests() (+47 more)

### Community 118 - "fees/schedule.ts"
Cohesion: 0.13
Nodes (23): QuerySource, instantView(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num() (+15 more)

### Community 119 - "tax-codes.ts"
Cohesion: 0.14
Nodes (19): SettingsPage(), SettingsRoute(), loadTaxCodes(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf() (+11 more)

### Community 120 - "cancel-server.ts"
Cohesion: 0.19
Nodes (17): cancelMeetingAction(), cancelMyMeetingAction(), CancelState, BookingState, calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason() (+9 more)

### Community 121 - "notifications/format.ts"
Cohesion: 0.19
Nodes (28): DueDateForm(), EmployerNumberForm(), HandlesContributionsSwitch(), PrepareForm(), RemitForm(), RemittanceButton(), RemittanceFileUpload(), send() (+20 more)

### Community 122 - "proof-upload.tsx"
Cohesion: 0.11
Nodes (28): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, TabKey, CatchUpRow, CatchUpSection(), Queue() (+20 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (45): exceljs, BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage() (+37 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.09
Nodes (40): Detail(), maskNumber(), StatementPage(), metadata, Shared(), SharedStatementPage(), Detail(), PortalStatementDetail() (+32 more)

### Community 126 - "filings/actions.ts"
Cohesion: 0.26
Nodes (15): markReadLocally(), useBellData(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base() (+7 more)

### Community 127 - "morning.ts"
Cohesion: 0.13
Nodes (18): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+10 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (86): RFC-4180, applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), GeminiError (+78 more)

### Community 129 - "bir-filing-calendar/page.tsx"
Cohesion: 0.50
Nodes (7): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), startReturnFileUpload()

### Community 130 - "mime.ts"
Cohesion: 0.10
Nodes (43): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+35 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.20
Nodes (16): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+8 more)

### Community 132 - "settlement-pages.tsx"
Cohesion: 0.09
Nodes (33): InvoiceView(), JournalEntryRoute(), JournalView(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), PurchaseInvoicesViewPage() (+25 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (43): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+35 more)

### Community 134 - "leads/[id]/page.tsx"
Cohesion: 0.29
Nodes (14): askClientAction(), createTaskAction(), fieldErrors(), optionalDate, optionalMonth, parse(), refresh(), reviewTaskAction() (+6 more)

### Community 135 - "blocks.tsx"
Cohesion: 0.06
Nodes (92): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+84 more)

### Community 136 - "formToObject"
Cohesion: 0.12
Nodes (30): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+22 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "filings/actions.ts"
Cohesion: 0.16
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+9 more)

### Community 139 - "branches/page.tsx"
Cohesion: 0.18
Nodes (12): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), Branches(), BranchesPage(), branchSchema (+4 more)

### Community 140 - "books/data.ts"
Cohesion: 0.19
Nodes (12): CustomersRoute(), KINDS, PartyList(), SuppliersRoute(), AllocationRow, InvoiceLineRow, InvoiceRow, loadInvoices() (+4 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (53): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+45 more)

### Community 142 - "webhook/route.ts"
Cohesion: 0.26
Nodes (8): maxDuration, POST(), telegramEnv(), ClaimedNotification, TelegramApi, telegramApi(), InlineKeyboard, notifyTelegram()

### Community 143 - "deadlines/page.tsx"
Cohesion: 0.06
Nodes (70): FilingListRow, FilingTable(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup() (+62 more)

### Community 144 - "holiday-list.ts"
Cohesion: 0.23
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), STANDARD_HOLIDAYS, StandardHoliday (+3 more)

### Community 145 - "portal/reports/cwt-2307/page.tsx"
Cohesion: 0.12
Nodes (19): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+11 more)

### Community 146 - "server-only"
Cohesion: 0.10
Nodes (43): server-only, @supabase/supabase-js, GET(), GET(), GET(), bookDiscoveryCallAction(), MonthComplete(), SentRow (+35 more)

### Community 147 - "app/layout.tsx"
Cohesion: 0.21
Nodes (18): ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS (+10 more)

### Community 148 - "template.ts"
Cohesion: 0.11
Nodes (43): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+35 more)

### Community 149 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 150 - "formatAmount"
Cohesion: 0.25
Nodes (13): Content(), PortalNotificationsPage(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one() (+5 more)

### Community 151 - "status.ts"
Cohesion: 0.20
Nodes (14): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor() (+6 more)

### Community 152 - "filters.tsx"
Cohesion: 0.33
Nodes (6): ClientSelect(), PeriodFilter(), PeriodKey, periodRange(), PERIODS, ym()

### Community 153 - "split-bundled-pdfs.test.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 154 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.16
Nodes (22): BulkState, Booking, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+14 more)

### Community 156 - "app/documents/page.tsx"
Cohesion: 0.06
Nodes (71): Doc, DocumentsCard(), when(), Cycle(), CycleWithClient, DocRow, ExceptionRow, ApprovedReview() (+63 more)

### Community 157 - "eslint.config.mjs"
Cohesion: 0.21
Nodes (13): GET(), isNotificationKind(), BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+5 more)

### Community 158 - "step-files.tsx"
Cohesion: 0.39
Nodes (8): addStepFile(), removeStepFile(), startStepFileUpload(), FileChip(), StepFile, StepFileList(), StepFileUpload(), send()

### Community 159 - "clients/[id]/page.tsx"
Cohesion: 0.06
Nodes (60): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+52 more)

### Community 160 - "books-2307.test.ts"
Cohesion: 0.06
Nodes (47): nextConfig, next, addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), addClientNoteAction() (+39 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.08
Nodes (57): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), addDays(), dayLabel(), ERRORS (+49 more)

### Community 163 - "template.ts"
Cohesion: 0.10
Nodes (21): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+13 more)

### Community 164 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 165 - "terms.ts"
Cohesion: 0.48
Nodes (4): acceptedQuote(), canonicalContent(), defaultTerms(), ProposalContent

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 169 - "getIdentity"
Cohesion: 0.07
Nodes (40): zod, amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text(), bookClientMeetingAction() (+32 more)

### Community 170 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 171 - "react"
Cohesion: 0.08
Nodes (38): react, DocReviewActions(), PayrollIntake(), SignOffState, AmendFilingForm(), CatchUpConfirmForms(), CatchUpRecorded, CatchUpRecordForm() (+30 more)

### Community 172 - "catch-up.test.ts"
Cohesion: 0.42
Nodes (10): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+2 more)

### Community 173 - "documents/cutoff.ts"
Cohesion: 0.64
Nodes (6): shift(), addMonths(), ymd(), monthChoices(), nextCutoff(), openMonth()

### Community 174 - "notification-bell.tsx"
Cohesion: 0.16
Nodes (17): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+9 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "names.ts"
Cohesion: 0.27
Nodes (10): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), notices, SignInForm(), Divider() (+2 more)

### Community 177 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.14
Nodes (6): LEAD, LinkRow, ReportRow, root, root, Row

### Community 180 - "list-search.tsx"
Cohesion: 0.40
Nodes (5): ListFilter, ListOption, ListToolbarProps, LiveToolbar(), Toolbar()

### Community 182 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 184 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 188 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 190 - "ref_node_fs"
Cohesion: 0.02
Nodes (42): pg, outDir, pkgDir, require, { version }, ctx, input, api (+34 more)

### Community 194 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 199 - "Badge"
Cohesion: 0.07
Nodes (49): ClientReturnsPage(), FilingRow, Returns(), SignStatus(), ApprovalMemo(), bookKind, BookRow, bookStatus (+41 more)

### Community 200 - "review-form.tsx"
Cohesion: 0.08
Nodes (37): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DirectoryParty, ENTRY_STATUS (+29 more)

### Community 208 - "Centavos"
Cohesion: 0.08
Nodes (38): PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview(), peso(), ReadItem, AlphaCols, AlphalistRow (+30 more)

### Community 214 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1666 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `books-2307.test.ts` to `form-2307.ts`, `ui.ts`, `quote/page.tsx`, `package.json`, `auth.ts`, `documents/[id]/page.tsx`, `Skeleton`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `clients/actions.ts`, `modal.tsx`, `app/page.tsx`, `supabaseAdmin`, `button.tsx`, `requireStaff`, `cx`, `marketing/page.tsx`, `tax-codes.ts`, `chrome.tsx`, `returns/load.ts`, `steps.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `[month]/page.tsx`, `marketing/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `deadlines/actions.ts`, `formatAmount`, `workpapers/load.ts`, `parties/[id]/page.tsx`, `module-pages.tsx`, `cx`, `lib/books/actions.ts`, `react`, `portalContext`, `@remixicon/react`, `intake-picker.tsx`, `form-2316.tsx`, `workpapers/page.tsx`, `work/page.tsx`, `payroll/data.ts`, `LinkButton`, `Centavos`, `tools/page.tsx`, `site-document.tsx`, `access.ts`, `module-pages.tsx`, `leads/actions.ts`, `report-periods.ts`, `[id]/books/page.tsx`, `profile.ts`, `portal/page.tsx`, `ledger/data.ts`, `[clientId]/page.tsx`, `app/requests/[id]/page.tsx`, `cancel-server.ts`, `notifications/format.ts`, `proof-upload.tsx`, `batch/register.ts`, `manilaToday`, `filings/actions.ts`, `read.test.ts`, `bir-filing-calendar/page.tsx`, `mime.ts`, `app/settings/page.tsx`, `settlement-pages.tsx`, `leads/[id]/page.tsx`, `blocks.tsx`, `formToObject`, `filings/actions.ts`, `branches/page.tsx`, `books/data.ts`, `payroll/forms.tsx`, `webhook/route.ts`, `deadlines/page.tsx`, `server-only`, `app/layout.tsx`, `template.ts`, `formatAmount`, `move-bar.tsx`, `app/documents/page.tsx`, `eslint.config.mjs`, `step-files.tsx`, `clients/[id]/page.tsx`, `calendar/staff.ts`, `binder/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `getIdentity`, `react`, `notification-bell.tsx`, `list-search.tsx`, `Badge`, `review-form.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07511737089201878 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `ui.ts`, `quote/page.tsx`, `package.json`, `documents/[id]/page.tsx`, `Skeleton`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `quote.ts`, `returns/types.ts`, `clients/actions.ts`, `payroll/payroll.test.ts`, `app/page.tsx`, `supabaseAdmin`, `requireStaff`, `webhook.ts`, `cx`, `returns/load.ts`, `steps.ts`, `fields.ts`, `arap.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `[month]/page.tsx`, `marketing/page.tsx`, `engine.ts`, `testing.ts`, `returns/types.ts`, `fixed-assets/page.tsx`, `workpapers/load.ts`, `parties/[id]/page.tsx`, `portalContext`, `portal-billing.test.ts`, `@remixicon/react`, `document-scanner.tsx`, `intake-picker.tsx`, `workpapers/page.tsx`, `work/page.tsx`, `payroll/data.ts`, `Centavos`, `layout.ts`, `leads/actions.ts`, `report-periods.ts`, `profile.ts`, `portal/page.tsx`, `ledger/data.ts`, `[clientId]/page.tsx`, `app/requests/[id]/page.tsx`, `fees/schedule.ts`, `tax-codes.ts`, `cancel-server.ts`, `proof-upload.tsx`, `batch/register.ts`, `manilaToday`, `morning.ts`, `read.test.ts`, `mime.ts`, `app/settings/page.tsx`, `ocr/run.ts`, `blocks.tsx`, `formToObject`, `ticked-allocation.test.ts`, `filings/actions.ts`, `branches/page.tsx`, `deadlines/page.tsx`, `holiday-list.ts`, `server-only`, `app/layout.tsx`, `template.ts`, `filters.tsx`, `split-bundled-pdfs.test.ts`, `move-bar.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `books-2307.test.ts`, `calendar/staff.ts`, `template.ts`, `terms.ts`, `register/page.tsx`, `ledger.test.ts`, `documents/cutoff.ts`, `acting-approver.test.ts`, `returns-sign-off.test.ts`, `db.test.ts`, `lead-attribution.test.ts`, `telegram-uploads.test.ts`, `tests/register.test.ts`, `rates.ts`, `tests/proposal-email.test.ts`, `batch-upload.test.ts`, `parallel-run.test.ts`, `ref_node_fs`, `tests/books.test.ts`, `Badge`, `review-form.tsx`, `contribution-remittances.test.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.022614451185879757 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `quote/page.tsx`, `package.json`, `auth.ts`, `documents/[id]/page.tsx`, `Skeleton`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `quote.ts`, `clients/actions.ts`, `modal.tsx`, `app/page.tsx`, `supabaseAdmin`, `button.tsx`, `requireStaff`, `cx`, `marketing/page.tsx`, `chrome.tsx`, `returns/load.ts`, `steps.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `[month]/page.tsx`, `marketing/page.tsx`, `notification.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `stat-cards.tsx`, `deadlines/actions.ts`, `formatAmount`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `module-pages.tsx`, `cx`, `lib/books/actions.ts`, `react`, `portalContext`, `@remixicon/react`, `document-scanner.tsx`, `intake-picker.tsx`, `workpapers/page.tsx`, `work/page.tsx`, `payroll/data.ts`, `LinkButton`, `Centavos`, `tools/page.tsx`, `combobox.tsx`, `site-document.tsx`, `access.ts`, `module-pages.tsx`, `leads/actions.ts`, `report-periods.ts`, `[id]/books/page.tsx`, `portal/page.tsx`, `[clientId]/page.tsx`, `app/requests/[id]/page.tsx`, `tax-codes.ts`, `notifications/format.ts`, `proof-upload.tsx`, `batch/register.ts`, `manilaToday`, `filings/actions.ts`, `bir-filing-calendar/page.tsx`, `settlement-pages.tsx`, `blocks.tsx`, `branches/page.tsx`, `books/data.ts`, `payroll/forms.tsx`, `deadlines/page.tsx`, `server-only`, `app/layout.tsx`, `template.ts`, `formatAmount`, `status.ts`, `filters.tsx`, `social-button.tsx`, `move-bar.tsx`, `app/documents/page.tsx`, `eslint.config.mjs`, `step-files.tsx`, `clients/[id]/page.tsx`, `books-2307.test.ts`, `calendar/staff.ts`, `binder/page.tsx`, `register/page.tsx`, `getIdentity`, `catch-up.test.ts`, `notification-bell.tsx`, `names.ts`, `list-search.tsx`, `Badge`, `review-form.tsx`, `Centavos`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._