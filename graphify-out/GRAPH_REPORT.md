# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1025 files · ~855,233 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6268 nodes · 22375 edges · 211 communities (181 shown, 30 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `d9ef4c6d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- Review
- package.json
- auth.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- tax-codes.ts
- Sign-in & Setup Docs
- PageHeader
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
- quote/page.tsx
- returns/types.ts
- generate-qap-fixture.mjs
- lock-bar.tsx
- modal.tsx
- registrations/forms.tsx
- scripts
- supabaseAdmin
- button.tsx
- remittances/[id]/page.tsx
- webhook.ts
- leads/[id]/page.tsx
- @remixicon/react
- requireOwner
- proposal-view.tsx
- returns/load.ts
- steps.ts
- app/requests/[id]/page.tsx
- opening.ts
- year-end/page.tsx
- lib/books/actions.ts
- notifications.test.ts
- marketing/page.tsx
- Apple Design
- filings/run.ts
- testing.ts
- quote/page.tsx
- Centavos
- books/forms.tsx
- fixed-assets/page.tsx
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- react
- LinkButton
- workpapers/page.tsx
- source.ts
- how-we-work/page.tsx
- Notice
- cx.ts
- Pro components
- remittances/forms.tsx
- Button
- portal/reports/statements/page.tsx
- portal-billing.test.ts
- board.ts
- document-scanner.tsx
- [slug]/page.tsx
- LinkButton
- gemini.ts
- tasks/page.tsx
- Recipes
- payroll/data.ts
- BoardUI theming reference
- Pro templates
- calendar/staff.ts
- Centavos
- ledger/data.ts
- cx
- opening-checklist.tsx
- boardui
- ref_node_fs
- layout.ts
- opening-checklist.tsx
- tieouts.test.ts
- app/settings/page.tsx
- arap.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- Review
- layout.ts
- filings/actions.ts
- apply-migrations.sh
- fees/types.ts
- brand/forms.tsx
- cancel-server.ts
- leads/[id]/page.tsx
- calendar/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- auth.ts
- notification-bell.tsx
- reports/books/page.tsx
- read.test.ts
- Filing
- return-file-actions.ts
- settings/actions.ts
- Skeleton
- portal/returns/page.tsx
- task-form.tsx
- blocks.tsx
- clients/actions.ts
- ticked-allocation.test.ts
- compute.ts
- onboarding/forms.tsx
- workpapers/load.ts
- payroll/forms.tsx
- lock-by-return-type.test.ts
- manilaToday
- items.ts
- payroll/types.ts
- month.ts
- idle-watcher.tsx
- fees/[id]/page.tsx
- pg
- notifications-view.tsx
- notification-settings-view.tsx
- portalContext
- notifications/format.ts
- social-button.tsx
- move-bar.tsx
- layout.ts
- queries.ts
- parties/[id]/page.tsx
- onboarding/page.tsx
- supabaseServer
- Rework: one flow from lead to year-end
- status.ts
- gap/page.tsx
- ledger.test.ts
- bir-filing-calendar/page.tsx
- register/page.tsx
- opengraph-image.tsx
- tests/proposal-email.test.ts
- Textarea
- cwt-tracker-view.tsx
- sign-off-actions.tsx
- bell-store.ts
- cycle/page.tsx
- notification-actions.tsx
- acting-approver.test.ts
- sign-in-form.tsx
- ref_node_fs
- ref_node_path
- contact-access.test.ts
- book-income.ts
- contribution-remittances.test.ts
- portal/reports/page.tsx
- staff/page.tsx
- rates.ts
- inactive-client-portal.test.ts
- BoardUI page patterns
- sign-off.ts
- [clientId]/[year]/page.tsx
- split-bundled-pdfs.test.ts
- vitest
- parallel-run.test.ts
- books-2307.test.ts
- portal-statements-approval.test.ts
- books-migration.test.ts
- inactive-client-portal.test.ts
- leads-pipeline.test.ts
- portal-statements-approval.test.ts
- defer-documents.test.ts
- sign-off-actions.tsx
- review-form.tsx
- tests/payroll.test.ts
- register-books.test.ts
- approve-and-post.test.ts
- templates/README.md
- batch-row-images.test.ts
- client-reports.test.ts
- toCentavos
- payroll-books.test.ts
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
9. `Badge()` - 187 edges
10. `Card()` - 187 edges

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

## Communities (211 total, 30 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (49): Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print(), one(), portal2307(), portal2307Href(), SearchParams (+41 more)

### Community 1 - "index.ts"
Cohesion: 0.04
Nodes (32): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+24 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.06
Nodes (60): booksViewFor(), fmtMonth(), blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage(), Summary() (+52 more)

### Community 4 - "Review"
Cohesion: 0.24
Nodes (12): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+4 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "auth.ts"
Cohesion: 0.11
Nodes (26): CELL, FirmParallelRunPage(), monthShort(), Summary(), Content(), NotificationSettingsPage(), SwitcherBusiness, ALL_BUSINESSES (+18 more)

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

### Community 11 - "tax-codes.ts"
Cohesion: 0.09
Nodes (39): ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths() (+31 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "PageHeader"
Cohesion: 0.07
Nodes (62): ClientList(), ClientsPage(), Row, SORTS, STATUS_GROUPS, ContactFormState, AccessOptions(), AccessRowForm() (+54 more)

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
Cohesion: 0.06
Nodes (65): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+57 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (73): annualAttachments(), balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+65 more)

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
Nodes (34): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), addMonths(), buildTracker(), calendarQuarterStart() (+26 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (73): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+65 more)

### Community 43 - "quote/page.tsx"
Cohesion: 0.06
Nodes (44): corp, items, proposal(), items, schedule, OWNER_PRICES, OWNER_SETTINGS, JOB_GROUPS (+36 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.04
Nodes (83): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+75 more)

### Community 45 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 46 - "lock-bar.tsx"
Cohesion: 0.11
Nodes (33): exceljs, file(), GET(), safe(), PayrollDocument(), ReadPayrollButton(), buildEmployeeTemplate(), sortItems() (+25 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (46): LockState, DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), globalSearch() (+38 more)

### Community 48 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (63): ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient(), EditClientPage(), NewClientPage() (+55 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.10
Nodes (39): generateFilingsNow(), generatePastFilingsAction(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction() (+31 more)

### Community 51 - "button.tsx"
Cohesion: 0.09
Nodes (25): ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles, IconButtonProps (+17 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.13
Nodes (38): EmployerCard(), RemittancesDue(), MonthRemittances(), GET(), ListRow, ORDER, Remittance(), RemittancePage() (+30 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (46): maxDuration, POST(), TelegramEnv, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked() (+38 more)

### Community 54 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (35): BookingLink(), ConvertForm(), CopyLink(), DiscoveryCallForm(), FunnelSwitch(), JobRow(), LeadContact, LostForm() (+27 more)

### Community 55 - "@remixicon/react"
Cohesion: 0.10
Nodes (30): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+22 more)

### Community 56 - "requireOwner"
Cohesion: 0.15
Nodes (31): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), peso (+23 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.14
Nodes (19): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+11 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.07
Nodes (58): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+50 more)

### Community 59 - "steps.ts"
Cohesion: 0.04
Nodes (91): addStepFile(), completeRegistrationAction(), openClientCaseAction(), removeStepFile(), startStepFileUpload(), CompleteButton(), StepBadge(), StepRow (+83 more)

### Community 60 - "app/requests/[id]/page.tsx"
Cohesion: 0.10
Nodes (37): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), Returns(), AmendmentCard(), BooksStillOpen(), Deadlines() (+29 more)

### Community 61 - "opening.ts"
Cohesion: 0.16
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 62 - "year-end/page.tsx"
Cohesion: 0.16
Nodes (22): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+14 more)

### Community 63 - "lib/books/actions.ts"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.05
Nodes (68): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+60 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.07
Nodes (58): Rule, MissingNumber, PLAIN, TimelineFiling, TimelineItem, addDays(), compareIso(), IsoDate (+50 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.16
Nodes (21): dateFmt, loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm() (+13 more)

### Community 70 - "Centavos"
Cohesion: 0.07
Nodes (59): GridRow, EntryLineOut, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat() (+51 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (41): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+33 more)

### Community 72 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (18): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), Row, accumulated() (+10 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.09
Nodes (49): sawtBuckets(), branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDashed(), tinDigits() (+41 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "react"
Cohesion: 0.13
Nodes (17): react, fmt(), SettlementForm(), ItemForm(), PayrollSettingsForm(), PayrollSetupPage(), Setup(), PastReturnsForm() (+9 more)

### Community 78 - "LinkButton"
Cohesion: 0.27
Nodes (12): BooksContext, one(), NewEntry(), NewEntryPage(), Certificates(), Staff2307Page(), Print(), Print2307Page() (+4 more)

### Community 79 - "workpapers/page.tsx"
Cohesion: 0.06
Nodes (70): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, amt() (+62 more)

### Community 80 - "source.ts"
Cohesion: 0.10
Nodes (32): datAddress(), datNameCols(), displayName(), fullAddress(), listNameCols(), Names, Party, PARTY_COLUMNS (+24 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "Notice"
Cohesion: 0.17
Nodes (25): BatchUpload(), PreviewTable(), Batch(), BatchPage(), one(), toCentavos(), AssignForm(), CatchUpForm() (+17 more)

### Community 83 - "cx.ts"
Cohesion: 0.04
Nodes (56): AvatarColor, AvatarProps, AvatarSize, styles, StatusDot(), StatusDotColor, StatusDotProps, styles (+48 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "remittances/forms.tsx"
Cohesion: 0.15
Nodes (23): decideUnlockAction(), lockMonthAction(), refresh(), requestLockAction(), requestUnlockAction(), run(), text(), AmendmentFlag (+15 more)

### Community 86 - "Button"
Cohesion: 0.07
Nodes (74): AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), OpeningUpload() (+66 more)

### Community 87 - "portal/reports/statements/page.tsx"
Cohesion: 0.21
Nodes (21): basePeriod(), HeldNote(), holdsWhat(), PortalStatements(), Statements(), REPORT_KINDS, loadPortalTrialBalance(), PortalBooks (+13 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "board.ts"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "[slug]/page.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "LinkButton"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 93 - "gemini.ts"
Cohesion: 0.23
Nodes (13): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), Msg() (+5 more)

### Community 94 - "tasks/page.tsx"
Cohesion: 0.16
Nodes (23): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+15 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.11
Nodes (39): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage() (+31 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "calendar/staff.ts"
Cohesion: 0.32
Nodes (11): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), linkClass, Form2316Set() (+3 more)

### Community 100 - "Centavos"
Cohesion: 0.07
Nodes (48): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+40 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.10
Nodes (41): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+33 more)

### Community 102 - "cx"
Cohesion: 0.05
Nodes (87): react-aria-components, SheetPreview(), ChipColor, Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, animateTag() (+79 more)

### Community 103 - "opening-checklist.tsx"
Cohesion: 0.12
Nodes (13): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), geist (+5 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "ref_node_fs"
Cohesion: 0.06
Nodes (20): outDir, pkgDir, require, { version }, dir, readme, templates, afterButton() (+12 more)

### Community 106 - "layout.ts"
Cohesion: 0.12
Nodes (23): digestMessage(), DigestRow, longDay(), peso, time(), bodyBlocks(), EmailAction, escapeHtml() (+15 more)

### Community 107 - "opening-checklist.tsx"
Cohesion: 0.18
Nodes (15): Access, STATUS, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput, ChecklistItem, ItemStatus (+7 more)

### Community 108 - "tieouts.test.ts"
Cohesion: 0.17
Nodes (24): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+16 more)

### Community 109 - "app/settings/page.tsx"
Cohesion: 0.16
Nodes (24): HolidayForm(), HolidayYearForm(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+16 more)

### Community 110 - "arap.ts"
Cohesion: 0.09
Nodes (15): as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll() (+7 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (44): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, StandingRow (+36 more)

### Community 114 - "Review"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 115 - "layout.ts"
Cohesion: 0.10
Nodes (49): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+41 more)

### Community 116 - "filings/actions.ts"
Cohesion: 0.14
Nodes (26): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+18 more)

### Community 118 - "fees/types.ts"
Cohesion: 0.10
Nodes (33): ProposalSetup, JobOption, ProposalQuote, instantView(), Quote, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS (+25 more)

### Community 119 - "brand/forms.tsx"
Cohesion: 0.38
Nodes (6): FieldDef, FIELDS, pesoInput(), Result(), SUBMIT, TaxForm()

### Community 120 - "cancel-server.ts"
Cohesion: 0.25
Nodes (13): cancelMeetingAction(), cancelMyMeetingAction(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail(), MAX_CANCEL_REASON (+5 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.13
Nodes (34): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), Rematch2307Button(), HandlesContributionsSwitch(), RemittanceButton() (+26 more)

### Community 122 - "calendar/page.tsx"
Cohesion: 0.12
Nodes (27): CatchUpRow, CatchUpSection(), Queue(), ReviewPage(), Row, Section(), EndButton(), Acting() (+19 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "auth.ts"
Cohesion: 0.07
Nodes (50): statementLinkAction(), Detail(), StatementPage(), metadata, Shared(), SharedStatementPage(), Detail(), PortalStatementDetail() (+42 more)

### Community 126 - "notification-bell.tsx"
Cohesion: 0.16
Nodes (23): switchBusinessAction(), BusinessSwitcher(), markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell() (+15 more)

### Community 127 - "reports/books/page.tsx"
Cohesion: 0.22
Nodes (17): Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker(), ParamSelect(), emptyClass (+9 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (74): RFC-4180, BirCategory, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES (+66 more)

### Community 129 - "Filing"
Cohesion: 0.47
Nodes (8): Filing(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), startReturnFileUpload()

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "settings/actions.ts"
Cohesion: 0.12
Nodes (27): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+19 more)

### Community 132 - "Skeleton"
Cohesion: 0.05
Nodes (102): BankAccountsRoute(), booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+94 more)

### Community 133 - "portal/returns/page.tsx"
Cohesion: 0.06
Nodes (47): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+39 more)

### Community 134 - "task-form.tsx"
Cohesion: 0.21
Nodes (20): ClientOption, pesos, StaffOption, TaskDefaults, TaskWorkflow(), askClientAction(), createTaskAction(), fieldErrors() (+12 more)

### Community 135 - "blocks.tsx"
Cohesion: 0.06
Nodes (89): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+81 more)

### Community 136 - "clients/actions.ts"
Cohesion: 0.06
Nodes (54): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setCatchUpAction() (+46 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "compute.ts"
Cohesion: 0.19
Nodes (20): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+12 more)

### Community 139 - "onboarding/forms.tsx"
Cohesion: 0.16
Nodes (21): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), sortTasks(), lastMonth() (+13 more)

### Community 140 - "workpapers/load.ts"
Cohesion: 0.23
Nodes (19): DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaWhen(), manilaInstant() (+11 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (58): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+50 more)

### Community 143 - "manilaToday"
Cohesion: 0.09
Nodes (40): FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), currentClientStatuses (+32 more)

### Community 144 - "items.ts"
Cohesion: 0.12
Nodes (28): PriceRow, buildQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem, EWT_NOTE, feeTax() (+20 more)

### Community 145 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 146 - "month.ts"
Cohesion: 0.08
Nodes (51): server-only, @supabase/supabase-js, GET(), GET(), GET(), emailProposalAction(), runActingDigest(), contactLogin() (+43 more)

### Community 147 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 148 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 149 - "pg"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 150 - "notifications-view.tsx"
Cohesion: 0.19
Nodes (17): Content(), NotificationsPage(), Content(), PortalNotificationsPage(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty() (+9 more)

### Community 151 - "notification-settings-view.tsx"
Cohesion: 0.18
Nodes (15): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor() (+7 more)

### Community 152 - "portalContext"
Cohesion: 0.24
Nodes (13): portalContext, BusinessBar(), ClosingNotice(), Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS (+5 more)

### Community 153 - "notifications/format.ts"
Cohesion: 0.18
Nodes (14): badgeText(), bellLabel(), clock, DayGroup, dayLabel(), daysBetween(), longDay, longDayYear (+6 more)

### Community 154 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.28
Nodes (13): ApprovedReview(), moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem (+5 more)

### Community 156 - "layout.ts"
Cohesion: 0.09
Nodes (45): Doc, DocumentsCard(), when(), ExceptionRow, deleteBundleInvoiceAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain() (+37 more)

### Community 157 - "queries.ts"
Cohesion: 0.18
Nodes (14): GET(), Bell(), BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+6 more)

### Community 158 - "parties/[id]/page.tsx"
Cohesion: 0.25
Nodes (13): setPartyVerifiedAction(), MergeForm(), PartyForm(), PresetAccountForm(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage() (+5 more)

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.07
Nodes (45): NotesCard(), ClientNoteForm(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload() (+37 more)

### Community 160 - "supabaseServer"
Cohesion: 0.06
Nodes (48): nextConfig, next, addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), addClientNoteAction() (+40 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "status.ts"
Cohesion: 0.11
Nodes (38): disconnectCalendarAction(), FormState, GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE (+30 more)

### Community 163 - "gap/page.tsx"
Cohesion: 0.24
Nodes (13): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+5 more)

### Community 164 - "ledger.test.ts"
Cohesion: 0.36
Nodes (7): BooksMonthRow, BOOKS_MONTH_STATUS_LABELS, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 165 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.11
Nodes (39): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+31 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "tests/proposal-email.test.ts"
Cohesion: 0.25
Nodes (8): Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ITEM_KINDS, KIND_ORDER, AmountField

### Community 169 - "Textarea"
Cohesion: 0.07
Nodes (52): zod, amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text(), AttachBatchImage() (+44 more)

### Community 170 - "cwt-tracker-view.tsx"
Cohesion: 0.24
Nodes (12): CwtLooseDocuments(), CwtTrackerGroups(), dateFmt, Figure(), money(), showDate(), showStamp(), stampFmt (+4 more)

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 172 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 173 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (30): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+22 more)

### Community 174 - "notification-actions.tsx"
Cohesion: 0.18
Nodes (16): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+8 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "sign-in-form.tsx"
Cohesion: 0.31
Nodes (9): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), notices, SignInForm(), Divider() (+1 more)

### Community 177 - "ref_node_fs"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 178 - "ref_node_path"
Cohesion: 0.06
Nodes (8): root, root, HASH, LEAD, root, root, root, root

### Community 179 - "contact-access.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 180 - "book-income.ts"
Cohesion: 0.27
Nodes (9): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, NonDeductibleRow (+1 more)

### Community 181 - "contribution-remittances.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 182 - "portal/reports/page.tsx"
Cohesion: 0.18
Nodes (21): BooksSection(), NavRow(), PortalReports(), Released, Reports(), Section(), Statements(), when() (+13 more)

### Community 183 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 184 - "rates.ts"
Cohesion: 0.24
Nodes (17): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+9 more)

### Community 185 - "inactive-client-portal.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 186 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 188 - "[clientId]/[year]/page.tsx"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 190 - "vitest"
Cohesion: 0.04
Nodes (15): pg, vitest, root, root, root, root, root, root (+7 more)

### Community 191 - "parallel-run.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 193 - "portal-statements-approval.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 194 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 196 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 199 - "sign-off-actions.tsx"
Cohesion: 0.08
Nodes (36): FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText, FilingFile (+28 more)

### Community 200 - "review-form.tsx"
Cohesion: 0.05
Nodes (77): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+69 more)

### Community 202 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 208 - "toCentavos"
Cohesion: 0.10
Nodes (38): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+30 more)

### Community 214 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1665 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `ui.ts`, `Review`, `package.json`, `tax-codes.ts`, `PageHeader`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `quote/page.tsx`, `returns/types.ts`, `lock-bar.tsx`, `registrations/forms.tsx`, `supabaseAdmin`, `remittances/[id]/page.tsx`, `webhook.ts`, `proposal-view.tsx`, `returns/load.ts`, `steps.ts`, `app/requests/[id]/page.tsx`, `opening.ts`, `year-end/page.tsx`, `lib/books/actions.ts`, `notifications.test.ts`, `marketing/page.tsx`, `filings/run.ts`, `testing.ts`, `Centavos`, `fixed-assets/page.tsx`, `workpapers/page.tsx`, `source.ts`, `portal/reports/statements/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `[slug]/page.tsx`, `tasks/page.tsx`, `Centavos`, `ref_node_fs`, `layout.ts`, `opening-checklist.tsx`, `app/settings/page.tsx`, `arap.ts`, `profile.ts`, `portal/page.tsx`, `Review`, `layout.ts`, `filings/actions.ts`, `fees/types.ts`, `cancel-server.ts`, `calendar/page.tsx`, `batch/register.ts`, `auth.ts`, `read.test.ts`, `return-file-actions.ts`, `settings/actions.ts`, `Skeleton`, `portal/returns/page.tsx`, `blocks.tsx`, `clients/actions.ts`, `ticked-allocation.test.ts`, `onboarding/forms.tsx`, `workpapers/load.ts`, `payroll/forms.tsx`, `lock-by-return-type.test.ts`, `manilaToday`, `items.ts`, `month.ts`, `idle-watcher.tsx`, `fees/[id]/page.tsx`, `portalContext`, `notifications/format.ts`, `move-bar.tsx`, `onboarding/page.tsx`, `supabaseServer`, `status.ts`, `ledger.test.ts`, `bir-filing-calendar/page.tsx`, `register/page.tsx`, `cycle/page.tsx`, `acting-approver.test.ts`, `ref_node_fs`, `ref_node_path`, `contact-access.test.ts`, `contribution-remittances.test.ts`, `portal/reports/page.tsx`, `rates.ts`, `inactive-client-portal.test.ts`, `sign-off.ts`, `[clientId]/[year]/page.tsx`, `split-bundled-pdfs.test.ts`, `parallel-run.test.ts`, `books-2307.test.ts`, `portal-statements-approval.test.ts`, `books-migration.test.ts`, `inactive-client-portal.test.ts`, `leads-pipeline.test.ts`, `portal-statements-approval.test.ts`, `defer-documents.test.ts`, `sign-off-actions.tsx`, `review-form.tsx`, `tests/payroll.test.ts`, `register-books.test.ts`, `approve-and-post.test.ts`, `batch-row-images.test.ts`, `client-reports.test.ts`, `payroll-books.test.ts`, `contribution-remittances.test.ts`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08196721311475409 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `package.json`, `auth.ts`, `tax-codes.ts`, `PageHeader`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `lock-bar.tsx`, `modal.tsx`, `registrations/forms.tsx`, `supabaseAdmin`, `remittances/[id]/page.tsx`, `webhook.ts`, `leads/[id]/page.tsx`, `@remixicon/react`, `requireOwner`, `proposal-view.tsx`, `returns/load.ts`, `steps.ts`, `app/requests/[id]/page.tsx`, `year-end/page.tsx`, `lib/books/actions.ts`, `marketing/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `react`, `LinkButton`, `workpapers/page.tsx`, `Notice`, `remittances/forms.tsx`, `Button`, `portal/reports/statements/page.tsx`, `[slug]/page.tsx`, `LinkButton`, `gemini.ts`, `tasks/page.tsx`, `payroll/data.ts`, `calendar/staff.ts`, `Centavos`, `ledger/data.ts`, `cx`, `opening-checklist.tsx`, `opening-checklist.tsx`, `tieouts.test.ts`, `app/settings/page.tsx`, `profile.ts`, `portal/page.tsx`, `layout.ts`, `filings/actions.ts`, `brand/forms.tsx`, `leads/[id]/page.tsx`, `calendar/page.tsx`, `batch/register.ts`, `auth.ts`, `notification-bell.tsx`, `reports/books/page.tsx`, `Filing`, `return-file-actions.ts`, `settings/actions.ts`, `Skeleton`, `task-form.tsx`, `blocks.tsx`, `clients/actions.ts`, `onboarding/forms.tsx`, `workpapers/load.ts`, `payroll/forms.tsx`, `manilaToday`, `month.ts`, `idle-watcher.tsx`, `fees/[id]/page.tsx`, `pg`, `notifications-view.tsx`, `portalContext`, `move-bar.tsx`, `layout.ts`, `queries.ts`, `parties/[id]/page.tsx`, `onboarding/page.tsx`, `status.ts`, `gap/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `Textarea`, `cwt-tracker-view.tsx`, `sign-off-actions.tsx`, `cycle/page.tsx`, `notification-actions.tsx`, `portal/reports/page.tsx`, `sign-off-actions.tsx`, `review-form.tsx`, `toCentavos`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.036231884057971016 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `auth.ts`, `tax-codes.ts`, `PageHeader`, `dependencies`, `statements.ts`, `scores/page.tsx`, `compare.ts`, `quote/page.tsx`, `modal.tsx`, `registrations/forms.tsx`, `supabaseAdmin`, `button.tsx`, `remittances/[id]/page.tsx`, `leads/[id]/page.tsx`, `@remixicon/react`, `proposal-view.tsx`, `returns/load.ts`, `steps.ts`, `app/requests/[id]/page.tsx`, `year-end/page.tsx`, `lib/books/actions.ts`, `marketing/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `stat-cards.tsx`, `LinkButton`, `workpapers/page.tsx`, `how-we-work/page.tsx`, `Notice`, `cx.ts`, `Button`, `portal/reports/statements/page.tsx`, `board.ts`, `document-scanner.tsx`, `[slug]/page.tsx`, `gemini.ts`, `tasks/page.tsx`, `payroll/data.ts`, `calendar/staff.ts`, `Centavos`, `ledger/data.ts`, `cx`, `opening-checklist.tsx`, `tieouts.test.ts`, `app/settings/page.tsx`, `profile.ts`, `portal/page.tsx`, `layout.ts`, `filings/actions.ts`, `brand/forms.tsx`, `leads/[id]/page.tsx`, `calendar/page.tsx`, `auth.ts`, `notification-bell.tsx`, `reports/books/page.tsx`, `Filing`, `settings/actions.ts`, `Skeleton`, `task-form.tsx`, `blocks.tsx`, `onboarding/forms.tsx`, `workpapers/load.ts`, `payroll/forms.tsx`, `manilaToday`, `idle-watcher.tsx`, `fees/[id]/page.tsx`, `pg`, `notifications-view.tsx`, `notification-settings-view.tsx`, `portalContext`, `social-button.tsx`, `move-bar.tsx`, `layout.ts`, `queries.ts`, `parties/[id]/page.tsx`, `onboarding/page.tsx`, `supabaseServer`, `status.ts`, `gap/page.tsx`, `register/page.tsx`, `Textarea`, `cwt-tracker-view.tsx`, `sign-off-actions.tsx`, `bell-store.ts`, `cycle/page.tsx`, `notification-actions.tsx`, `sign-in-form.tsx`, `portal/reports/page.tsx`, `staff/page.tsx`, `sign-off-actions.tsx`, `review-form.tsx`, `toCentavos`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._