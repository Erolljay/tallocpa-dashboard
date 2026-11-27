# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1094 files · ~900,053 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6670 nodes · 23577 edges · 210 communities (192 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 224 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `96d17387`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- client
- migrate.yml
- ui.ts
- fees/types.ts
- devDependencies
- payroll-read.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- manilaToday
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
- TalloCPA OS — AI Workforce (design note)
- Develop Commands
- cwt-tracker.ts
- scores/page.tsx
- compare.ts
- form.tsx
- returns/types.ts
- clients/actions.ts
- register-xlsx.ts
- modal.tsx
- registrations/actions.ts
- scripts
- payroll/data.ts
- book/actions.ts
- remittances/[id]/page.tsx
- webhook.ts
- leads/[id]/page.tsx
- lock-bar.tsx
- parallel-run.tsx
- quote/page.tsx
- returns/load.ts
- rules.ts
- fields.ts
- books/export/route.ts
- [month]/page.tsx
- documents/[id]/page.tsx
- year-end/page.tsx
- marketing/page.tsx
- Apple Design
- generate.ts
- testing.ts
- getIdentity
- Centavos
- books/forms.tsx
- work/load.ts
- Rules
- Animation Performance
- settings/actions.ts
- stat-cards.tsx
- money.ts
- engine.ts
- registrations/page.tsx
- parties/[id]/page.tsx
- how-we-work/page.tsx
- app/settings/notifications/page.tsx
- cx.ts
- Pro components
- lib/books/actions.ts
- button.tsx
- portalContext
- requireStaff
- theme-toggle.tsx
- document-scanner.tsx
- intake-picker.tsx
- LinkButton
- employees-xlsx.ts
- tasks/page.tsx
- Recipes
- vat.ts
- BoardUI page patterns
- Pro templates
- registrations/[id]/page.tsx
- ledger/books.ts
- tools/page.tsx
- cx
- supabaseAdmin
- boardui
- opening-checklist.tsx
- layout.ts
- Badge
- leads/actions.ts
- Notice
- access.ts
- Opening balances: checklist for any cut-off
- Card
- portal/page.tsx
- opening.ts
- requireOwner
- transactions-actions.ts
- apply-migrations.sh
- fees/schedule.ts
- notification-settings-view.tsx
- notification-bell.tsx
- workpapers/load.ts
- notifications/format.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- bir-filing-calendar/page.tsx
- notification-actions.tsx
- form-2316.tsx
- read.test.ts
- sign-in-form.tsx
- return-file-actions.ts
- deadlines/actions.ts
- module-pages.tsx
- ocr/run.ts
- queries.ts
- blocks.tsx
- formToObject
- ticked-allocation.test.ts
- onboarding/page.tsx
- grid.ts
- status.ts
- LinkButton
- cancel.ts
- app/page.tsx
- steps.ts
- chief-of-staff/README.md
- server-only
- notifications-view.tsx
- TaxpayerType
- staff/page.tsx
- onboarding/ai-tools.ts
- document-clerk/README.md
- app/documents/page.tsx
- bell-store.ts
- clients/[id]/page.tsx
- pending-review.tsx
- cycle/page.tsx
- requireOwner
- idle-watcher.tsx
- oauth/server.ts
- vitest
- Rework: one flow from lead to year-end
- calendar/page.tsx
- template.ts
- books/periods.ts
- protocol.ts
- register/page.tsx
- opengraph-image.tsx
- ledger.test.ts
- supabaseServer
- env.ts
- late-submitters.ts
- review.ts
- copy-opencv.mjs
- binder/page.tsx
- acting-approver.test.ts
- documents/labels.ts
- proof-upload.tsx
- Building UIs with BoardUI
- catch-up-actions.ts
- cwt-forms.tsx
- contribution-remittances.test.ts
- app/settings/page.tsx
- books/reports/cwt-2307/page.tsx
- rates.ts
- tests/proposal-email.test.ts
- seed.ts
- social-button.tsx
- formatAmount
- deadlines/dates.ts
- profile.ts
- site-document.tsx
- ai-document-clerk.test.ts
- filings/[id]/page.tsx
- onboarding-officer/project-instructions.md
- react
- review/page.tsx
- pending-review.tsx
- templates/README.md
- filings/actions.ts
- parallel-run.test.ts
- returns-sign-off.test.ts
- Morning brief
- Onboarding Officer's desk
- ai-desks/README.md
- fixed-assets/page.tsx
- 7. The TalloCPA OS MCP server
- messages.ts
- workpapers/page.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 424 edges
2. `cx` - 317 edges
3. `react` - 292 edges
4. `Notice()` - 285 edges
5. `Button()` - 267 edges
6. `Skeleton()` - 266 edges
7. `next` - 257 edges
8. `vitest` - 210 edges
9. `Card()` - 197 edges
10. `Badge()` - 195 edges

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

## Communities (210 total, 18 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (47): one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href(), Portal2307() (+39 more)

### Community 1 - "client"
Cohesion: 0.03
Nodes (35): as(), client(), root, approved(), as(), root, approved(), as() (+27 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.05
Nodes (69): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+61 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.06
Nodes (65): corp, items, proposal(), EstimatedProfile, estimateProfile(), gapFor(), has(), items (+57 more)

### Community 5 - "devDependencies"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "payroll-read.tsx"
Cohesion: 0.07
Nodes (43): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+35 more)

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

### Community 11 - "manilaToday"
Cohesion: 0.10
Nodes (39): Detail(), maskNumber(), StatementPage(), metadata, Shared(), SharedStatementPage(), Detail(), PortalStatementDetail() (+31 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "PageHeader"
Cohesion: 0.09
Nodes (45): ClientList(), ClientsPage(), Row, SORTS, STATUS_GROUPS, Contacts(), ContactsPage(), SORTS (+37 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, pg@^8.23.1, react@19.3.0, react-aria-components@^1.22.1 (+12 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (40): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine() (+32 more)

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

### Community 29 - "TalloCPA OS — AI Workforce (design note)"
Cohesion: 0.13
Nodes (15): 10. Data model (first draft), 11. Build order, 12. Open items, 1. The idea in one paragraph, 2. Principles, 3. The AI employees, 4.1 The in-app model is swappable, 4. Where they run and what they cost (+7 more)

### Community 40 - "cwt-tracker.ts"
Cohesion: 0.08
Nodes (47): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary() (+39 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (50): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+42 more)

### Community 43 - "form.tsx"
Cohesion: 0.13
Nodes (36): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+28 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.05
Nodes (62): tinHasBranch(), client, row(), form2551Q, payslipCsv(), payslipSchedule(), agentBackground(), agentErrors() (+54 more)

### Community 45 - "clients/actions.ts"
Cohesion: 0.10
Nodes (28): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), removeAssignmentAction(), setCatchUpAction(), setClientStatusAction() (+20 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.14
Nodes (26): DEFAULT_ITEMS, PayrollItem, employee(), entry(), fixtureContext(), ITEMS, P(), pay() (+18 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (47): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), globalSearch(), SearchHit (+39 more)

### Community 48 - "registrations/actions.ts"
Cohesion: 0.10
Nodes (30): cancelRegistrationAction(), completeRegistrationAction(), dtiRegisteredOn(), FormState, openYearRenewalsAction(), PROOF_TYPES, caseNote, caseTitle (+22 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "payroll/data.ts"
Cohesion: 0.14
Nodes (31): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), Certificates2316 (+23 more)

### Community 51 - "book/actions.ts"
Cohesion: 0.12
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+25 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.09
Nodes (62): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+54 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (42): TelegramApi, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF (+34 more)

### Community 54 - "leads/[id]/page.tsx"
Cohesion: 0.06
Nodes (56): NotesCard(), BookingLink(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), ProposalSent, ReopenForm(), Result() (+48 more)

### Community 55 - "lock-bar.tsx"
Cohesion: 0.16
Nodes (22): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+14 more)

### Community 56 - "parallel-run.tsx"
Cohesion: 0.10
Nodes (32): ParallelRun(), ParallelRunPage(), quarterMonths(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Atcs() (+24 more)

### Community 57 - "quote/page.tsx"
Cohesion: 0.08
Nodes (56): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+48 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.06
Nodes (57): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+49 more)

### Community 59 - "rules.ts"
Cohesion: 0.11
Nodes (38): RFC-7636, RFC-8414, allowAction(), check(), Checked, ConsentState, denyAction(), ConsentForm() (+30 more)

### Community 60 - "fields.ts"
Cohesion: 0.09
Nodes (29): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+21 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.09
Nodes (39): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+31 more)

### Community 62 - "[month]/page.tsx"
Cohesion: 0.10
Nodes (40): postSubmissionAction(), previewRegisterAction(), saveMonthAction(), file(), GET(), safe(), PreviewTable(), SubmissionReview() (+32 more)

### Community 63 - "documents/[id]/page.tsx"
Cohesion: 0.10
Nodes (34): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+26 more)

### Community 64 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.09
Nodes (33): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+25 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.12
Nodes (27): PlannedObligation, TimelineFiling, TimelineItem, IsoDate, EfpsGroup, FilingChannel, FilingInstance, followsCalendarYear() (+19 more)

### Community 68 - "testing.ts"
Cohesion: 0.13
Nodes (25): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, individual (+17 more)

### Community 69 - "getIdentity"
Cohesion: 0.11
Nodes (41): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+33 more)

### Community 70 - "Centavos"
Cohesion: 0.08
Nodes (50): AlphaCols, AlphalistRow, buildAlphalist(), form2316(), Form2316Data, Form2316Employer, Form2316Line, Form2316Signatory (+42 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.07
Nodes (65): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+57 more)

### Community 72 - "work/load.ts"
Cohesion: 0.15
Nodes (23): Action(), MyWork(), MyWorkPage(), short(), TONE, filingsBooksReady(), booksReadyMap(), keepBooksReady() (+15 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/actions.ts"
Cohesion: 0.12
Nodes (28): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+20 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (51): @remixicon/react, DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill() (+43 more)

### Community 77 - "money.ts"
Cohesion: 0.10
Nodes (34): branch4(), alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell() (+26 more)

### Community 78 - "engine.ts"
Cohesion: 0.21
Nodes (20): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule, fiscalYearOf() (+12 more)

### Community 79 - "registrations/page.tsx"
Cohesion: 0.14
Nodes (25): ClientCaseKind, StepRow, YearRenewalsForm(), clientCase, NewRegistrationPage(), OwnerOnly(), RegistrationList(), RegistrationsPage() (+17 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (47): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), fmtDate(), PartyPage(), withDirectory(), datAddress() (+39 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (36): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+28 more)

### Community 82 - "app/settings/notifications/page.tsx"
Cohesion: 0.29
Nodes (10): Content(), NotificationSettingsPage(), TelegramLinkButton(), TelegramSwitch(), AnchorButton(), LinkState, setTelegramEnabledAction(), telegramLinkAction() (+2 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (82): ZoomPreview(), switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, AvatarColor, AvatarProps, AvatarSize (+74 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "lib/books/actions.ts"
Cohesion: 0.14
Nodes (24): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+16 more)

### Community 86 - "button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 87 - "portalContext"
Cohesion: 0.08
Nodes (67): PortalClient, portalContext, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker() (+59 more)

### Community 88 - "requireStaff"
Cohesion: 0.14
Nodes (29): ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), setPartyVerifiedAction(), setPresetAccountAction() (+21 more)

### Community 89 - "theme-toggle.tsx"
Cohesion: 0.06
Nodes (60): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+52 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "LinkButton"
Cohesion: 0.16
Nodes (20): Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS, NewEntry() (+12 more)

### Community 93 - "employees-xlsx.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 94 - "tasks/page.tsx"
Cohesion: 0.13
Nodes (30): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+22 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "vat.ts"
Cohesion: 0.11
Nodes (45): SaleSplit, branchOfTin(), payeeKeyOf(), tin9(), tinDashed(), tinDigits(), invoiceLabel(), sawtAnnualAttachments() (+37 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "registrations/[id]/page.tsx"
Cohesion: 0.19
Nodes (18): addStepFile(), removeStepFile(), startStepFileUpload(), StepBadge(), caseStatus, CertificateDetails, certificateLabel(), fmt() (+10 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (46): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+38 more)

### Community 101 - "tools/page.tsx"
Cohesion: 0.16
Nodes (23): AmendmentDecision(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload(), PermitForm() (+15 more)

### Community 102 - "cx"
Cohesion: 0.05
Nodes (76): react-aria-components, SheetPreview(), ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps (+68 more)

### Community 103 - "supabaseAdmin"
Cohesion: 0.11
Nodes (38): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+30 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "opening-checklist.tsx"
Cohesion: 0.15
Nodes (20): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, loadAssets(), Row, Asset, Cutoff (+12 more)

### Community 106 - "layout.ts"
Cohesion: 0.13
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 107 - "Badge"
Cohesion: 0.13
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.14
Nodes (32): assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction(), recordCallAction() (+24 more)

### Community 109 - "Notice"
Cohesion: 0.08
Nodes (81): setupMissingChartsAction(), ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), CloseYearForm(), EntryForm() (+73 more)

### Community 110 - "access.ts"
Cohesion: 0.18
Nodes (21): AccessOptions(), AccessRowForm(), AddBusinessForm(), Business, ContactDetailsForm(), NewContactForm(), RemoveBusinessButton(), Result() (+13 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "Card"
Cohesion: 0.30
Nodes (17): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+9 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (49): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, StandingRow (+41 more)

### Community 114 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+11 more)

### Community 115 - "requireOwner"
Cohesion: 0.07
Nodes (63): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+55 more)

### Community 116 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 118 - "fees/schedule.ts"
Cohesion: 0.08
Nodes (42): ProposalSetup, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery() (+34 more)

### Community 119 - "notification-settings-view.tsx"
Cohesion: 0.18
Nodes (16): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), isNotificationKind() (+8 more)

### Community 120 - "notification-bell.tsx"
Cohesion: 0.28
Nodes (13): markReadLocally(), useBellData(), BellPanel(), BellRow(), DotBadge(), NotificationBell(), Counter(), markAllRead() (+5 more)

### Community 121 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (23): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+15 more)

### Community 122 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 126 - "notification-actions.tsx"
Cohesion: 0.23
Nodes (12): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+4 more)

### Community 127 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (59): amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS, findHeaderRow(), knownTarget() (+51 more)

### Community 129 - "sign-in-form.tsx"
Cohesion: 0.27
Nodes (10): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), notices, SignInForm(), Divider() (+2 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (48): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+40 more)

### Community 131 - "deadlines/actions.ts"
Cohesion: 0.42
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 132 - "module-pages.tsx"
Cohesion: 0.09
Nodes (65): BankAccountsRoute(), booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+57 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (45): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+37 more)

### Community 134 - "queries.ts"
Cohesion: 0.18
Nodes (14): GET(), BellVariant, NotificationKind, BELL_LIMIT, BellData, bellData, bellDataFor, latestNotifications() (+6 more)

### Community 135 - "blocks.tsx"
Cohesion: 0.06
Nodes (84): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+76 more)

### Community 136 - "formToObject"
Cohesion: 0.08
Nodes (43): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+35 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "onboarding/page.tsx"
Cohesion: 0.08
Nodes (40): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+32 more)

### Community 139 - "grid.ts"
Cohesion: 0.24
Nodes (11): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+3 more)

### Community 140 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 141 - "LinkButton"
Cohesion: 0.10
Nodes (44): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+36 more)

### Community 142 - "cancel.ts"
Cohesion: 0.26
Nodes (11): cancelMeetingAction(), cancelMyMeetingAction(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail(), manilaWhen() (+3 more)

### Community 143 - "app/page.tsx"
Cohesion: 0.09
Nodes (37): Gap, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board (+29 more)

### Community 144 - "steps.ts"
Cohesion: 0.06
Nodes (51): fieldErrors(), openClientCaseAction(), openRegistrationAction(), Agency, amendmentWords, approval(), BillingFacts, BIR_CHANGES (+43 more)

### Community 145 - "chief-of-staff/README.md"
Cohesion: 0.17
Nodes (8): How you work, When the Owner asks something else, Your job, Before you start (TalloCPA OS), Check it, Chief of Staff's desk, Set up the desk (Cowork, once), Scheduled task: morning brief

### Community 146 - "server-only"
Cohesion: 0.13
Nodes (35): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), cancelDiscoveryCall(), CancelResult (+27 more)

### Community 147 - "notifications-view.tsx"
Cohesion: 0.24
Nodes (15): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, base() (+7 more)

### Community 148 - "TaxpayerType"
Cohesion: 0.27
Nodes (8): ClientValues, EngagementRow, TaxpayerType, TaxType, CoverageClient, coverageGaps(), GapKind, ExistingClient

### Community 149 - "staff/page.tsx"
Cohesion: 0.33
Nodes (9): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage() (+1 more)

### Community 150 - "onboarding/ai-tools.ts"
Cohesion: 0.06
Nodes (51): zod, DRAFT_KIND_LABELS, DraftLine, NewDraft, saveDraft(), clientRef, findClient(), getClient (+43 more)

### Community 151 - "document-clerk/README.md"
Cohesion: 0.17
Nodes (9): How you work, Your job, Before you start (TalloCPA OS), Check it, Document Clerk's desk, Set up the desk (Cowork, once), Review queue, Rules (+1 more)

### Community 152 - "app/documents/page.tsx"
Cohesion: 0.13
Nodes (28): ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths(), Documents() (+20 more)

### Community 153 - "bell-store.ts"
Cohesion: 0.42
Nodes (10): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+2 more)

### Community 154 - "clients/[id]/page.tsx"
Cohesion: 0.11
Nodes (31): FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), CatchUpForm(), ClientUserForm(), EngagementForm() (+23 more)

### Community 155 - "pending-review.tsx"
Cohesion: 0.26
Nodes (14): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+6 more)

### Community 156 - "cycle/page.tsx"
Cohesion: 0.19
Nodes (17): Cycle(), CycleWithClient, DocRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton(), closeCycleAction() (+9 more)

### Community 157 - "requireOwner"
Cohesion: 0.08
Nodes (59): RFC-2606, addWorkforceAction(), AiState, assignClientAction(), createAiLogin(), createKeyAction(), disconnectAppAction(), fieldErrors() (+51 more)

### Community 158 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (18): POST(), ACTIVITY, readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS (+10 more)

### Community 159 - "oauth/server.ts"
Cohesion: 0.08
Nodes (24): expiryFrom(), hashKey(), isKeyShaped(), KEY_LIFETIMES, KEY_PREFIX, KeyLifetime, keyMatches(), KeyState (+16 more)

### Community 160 - "vitest"
Cohesion: 0.01
Nodes (71): pg, vitest, dir, poolConfig(), root, root, BOOKS, CLIENT_RECORDS (+63 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (19): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), Interval, manilaInstant(), appBookedEvents() (+11 more)

### Community 163 - "template.ts"
Cohesion: 0.12
Nodes (17): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS (+9 more)

### Community 164 - "books/periods.ts"
Cohesion: 0.36
Nodes (7): BooksMonthRow, BOOKS_MONTH_STATUS_LABELS, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 165 - "protocol.ts"
Cohesion: 0.07
Nodes (44): asAi(), borrow(), callsToday(), denied(), instructionsFor(), log(), manilaDay(), McpRequest (+36 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.09
Nodes (26): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, KIND_LABELS (+18 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 169 - "supabaseServer"
Cohesion: 0.07
Nodes (37): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), markCwtFollowedUpAction() (+29 more)

### Community 170 - "env.ts"
Cohesion: 0.35
Nodes (7): maxDuration, POST(), TelegramEnv, telegramEnv(), ClaimedNotification, telegramApi(), notifyTelegram()

### Community 171 - "late-submitters.ts"
Cohesion: 0.42
Nodes (6): isAlwaysLate(), isLateMonth(), LATE_SUBMITTER_RULES, LateSubmitter, lateSubmitters(), ScorecardRow

### Community 172 - "review.ts"
Cohesion: 0.36
Nodes (6): ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), SIGNED_REFS, quiet

### Community 173 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 174 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "documents/labels.ts"
Cohesion: 0.08
Nodes (42): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+34 more)

### Community 177 - "proof-upload.tsx"
Cohesion: 0.13
Nodes (25): AttachBatchImage(), attach(), Detail(), PayNow(), SignInToUpload(), METHODS, ProofUpload(), send() (+17 more)

### Community 178 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 179 - "catch-up-actions.ts"
Cohesion: 0.48
Nodes (6): amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text()

### Community 180 - "cwt-forms.tsx"
Cohesion: 0.57
Nodes (5): Rematch2307Button(), CwtActionState, markCwtFollowedUp(), rematch2307(), trackerPath()

### Community 181 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 182 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (37): RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), Rule (+29 more)

### Community 183 - "books/reports/cwt-2307/page.tsx"
Cohesion: 0.83
Nodes (3): Cwt2307TrackerPage(), Tracker(), CwtFollowUpForm()

### Community 184 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.10
Nodes (11): ctx, input, api, ctx, fn, rows, src, HASH (+3 more)

### Community 186 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 188 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 189 - "formatAmount"
Cohesion: 0.09
Nodes (41): BooksContext, booksViewFor(), fmtMonth(), WithdrawReportButton(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate() (+33 more)

### Community 191 - "deadlines/dates.ts"
Cohesion: 0.64
Nodes (6): shift(), addMonths(), ymd(), monthChoices(), nextCutoff(), openMonth()

### Community 192 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 193 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 195 - "ai-document-clerk.test.ts"
Cohesion: 0.09
Nodes (31): maxDuration, POST(), OPTIONS, POST(), RFC-7591, OPTIONS, POST(), GET() (+23 more)

### Community 196 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (53): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, FilingTable(), SignOffState, bookKind, BookRow (+45 more)

### Community 197 - "onboarding-officer/project-instructions.md"
Cohesion: 0.22
Nodes (6): Onboard a client, Rules, Steps, How you work, Never, Your job

### Community 198 - "react"
Cohesion: 0.06
Nodes (42): react, JournalEntryRoute(), JournalRoute(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), PurchaseInvoicesEditPage() (+34 more)

### Community 199 - "review/page.tsx"
Cohesion: 0.11
Nodes (29): CatchUpRow, CatchUpSection(), Queue(), Row, Section(), EndButton(), Acting(), ActingApproverPage() (+21 more)

### Community 200 - "pending-review.tsx"
Cohesion: 0.08
Nodes (40): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+32 more)

### Community 210 - "filings/actions.ts"
Cohesion: 0.14
Nodes (23): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+15 more)

### Community 211 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 212 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 213 - "Morning brief"
Cohesion: 0.50
Nodes (4): Format, Morning brief, Rules, Steps

### Community 214 - "Onboarding Officer's desk"
Cohesion: 0.50
Nodes (4): Before you start (TalloCPA OS), Check it, Onboarding Officer's desk, Set up the desk (Cowork, once)

### Community 217 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 218 - "7. The TalloCPA OS MCP server"
Cohesion: 0.50
Nodes (4): 7.1 Parts, 7.2 Tools, 7.3 New features and the MCP, 7. The TalloCPA OS MCP server

### Community 220 - "messages.ts"
Cohesion: 0.17
Nodes (12): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+4 more)

### Community 223 - "workpapers/page.tsx"
Cohesion: 0.18
Nodes (21): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+13 more)

## Knowledge Gaps
- **31 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1805 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `client`, `ui.ts`, `fees/types.ts`, `devDependencies`, `payroll-read.tsx`, `PageHeader`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `form.tsx`, `returns/types.ts`, `clients/actions.ts`, `register-xlsx.ts`, `book/actions.ts`, `remittances/[id]/page.tsx`, `webhook.ts`, `leads/[id]/page.tsx`, `lock-bar.tsx`, `quote/page.tsx`, `returns/load.ts`, `rules.ts`, `fields.ts`, `books/export/route.ts`, `documents/[id]/page.tsx`, `year-end/page.tsx`, `generate.ts`, `testing.ts`, `getIdentity`, `Centavos`, `books/forms.tsx`, `settings/actions.ts`, `money.ts`, `engine.ts`, `parties/[id]/page.tsx`, `portalContext`, `theme-toggle.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `tasks/page.tsx`, `ledger/books.ts`, `supabaseAdmin`, `opening-checklist.tsx`, `layout.ts`, `leads/actions.ts`, `portal/page.tsx`, `opening.ts`, `requireOwner`, `fees/schedule.ts`, `workpapers/load.ts`, `notifications/format.ts`, `batch/register.ts`, `bir-filing-calendar/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `ocr/run.ts`, `blocks.tsx`, `formToObject`, `ticked-allocation.test.ts`, `onboarding/page.tsx`, `status.ts`, `cancel.ts`, `app/page.tsx`, `steps.ts`, `server-only`, `TaxpayerType`, `onboarding/ai-tools.ts`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `idle-watcher.tsx`, `oauth/server.ts`, `calendar/page.tsx`, `books/periods.ts`, `protocol.ts`, `register/page.tsx`, `ledger.test.ts`, `supabaseServer`, `late-submitters.ts`, `review.ts`, `acting-approver.test.ts`, `contribution-remittances.test.ts`, `app/settings/page.tsx`, `rates.ts`, `tests/proposal-email.test.ts`, `deadlines/dates.ts`, `profile.ts`, `ai-document-clerk.test.ts`, `filings/[id]/page.tsx`, `review/page.tsx`, `pending-review.tsx`, `filings/actions.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `fixed-assets/page.tsx`, `messages.ts`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09322033898305085 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `fees/types.ts`, `devDependencies`, `payroll-read.tsx`, `manilaToday`, `PageHeader`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `form.tsx`, `clients/actions.ts`, `modal.tsx`, `registrations/actions.ts`, `payroll/data.ts`, `book/actions.ts`, `remittances/[id]/page.tsx`, `leads/[id]/page.tsx`, `lock-bar.tsx`, `parallel-run.tsx`, `quote/page.tsx`, `returns/load.ts`, `rules.ts`, `[month]/page.tsx`, `documents/[id]/page.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `getIdentity`, `books/forms.tsx`, `work/load.ts`, `settings/actions.ts`, `stat-cards.tsx`, `registrations/page.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `app/settings/notifications/page.tsx`, `cx.ts`, `button.tsx`, `portalContext`, `requireStaff`, `theme-toggle.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `LinkButton`, `tasks/page.tsx`, `registrations/[id]/page.tsx`, `ledger/books.ts`, `tools/page.tsx`, `cx`, `supabaseAdmin`, `Badge`, `leads/actions.ts`, `Notice`, `access.ts`, `Card`, `portal/page.tsx`, `requireOwner`, `notification-settings-view.tsx`, `notification-bell.tsx`, `batch/register.ts`, `notification-actions.tsx`, `sign-in-form.tsx`, `return-file-actions.ts`, `deadlines/actions.ts`, `module-pages.tsx`, `queries.ts`, `blocks.tsx`, `formToObject`, `onboarding/page.tsx`, `LinkButton`, `staff/page.tsx`, `app/documents/page.tsx`, `bell-store.ts`, `clients/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `requireOwner`, `idle-watcher.tsx`, `calendar/page.tsx`, `supabaseServer`, `binder/page.tsx`, `documents/labels.ts`, `proof-upload.tsx`, `cwt-forms.tsx`, `app/settings/page.tsx`, `books/reports/cwt-2307/page.tsx`, `social-button.tsx`, `formatAmount`, `profile.ts`, `site-document.tsx`, `filings/[id]/page.tsx`, `review/page.tsx`, `pending-review.tsx`, `fixed-assets/page.tsx`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.0331002331002331 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `devDependencies`, `payroll-read.tsx`, `manilaToday`, `PageHeader`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `form.tsx`, `clients/actions.ts`, `modal.tsx`, `registrations/actions.ts`, `payroll/data.ts`, `book/actions.ts`, `remittances/[id]/page.tsx`, `leads/[id]/page.tsx`, `lock-bar.tsx`, `parallel-run.tsx`, `quote/page.tsx`, `returns/load.ts`, `rules.ts`, `books/export/route.ts`, `[month]/page.tsx`, `documents/[id]/page.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `getIdentity`, `books/forms.tsx`, `work/load.ts`, `settings/actions.ts`, `registrations/page.tsx`, `parties/[id]/page.tsx`, `app/settings/notifications/page.tsx`, `cx.ts`, `lib/books/actions.ts`, `portalContext`, `requireStaff`, `theme-toggle.tsx`, `intake-picker.tsx`, `LinkButton`, `tasks/page.tsx`, `registrations/[id]/page.tsx`, `ledger/books.ts`, `tools/page.tsx`, `supabaseAdmin`, `opening-checklist.tsx`, `Badge`, `leads/actions.ts`, `Notice`, `access.ts`, `Card`, `portal/page.tsx`, `requireOwner`, `transactions-actions.ts`, `notification-bell.tsx`, `batch/register.ts`, `notification-actions.tsx`, `form-2316.tsx`, `return-file-actions.ts`, `deadlines/actions.ts`, `module-pages.tsx`, `queries.ts`, `blocks.tsx`, `formToObject`, `onboarding/page.tsx`, `LinkButton`, `server-only`, `notifications-view.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `requireOwner`, `idle-watcher.tsx`, `calendar/page.tsx`, `opengraph-image.tsx`, `env.ts`, `binder/page.tsx`, `documents/labels.ts`, `proof-upload.tsx`, `catch-up-actions.ts`, `cwt-forms.tsx`, `app/settings/page.tsx`, `books/reports/cwt-2307/page.tsx`, `formatAmount`, `profile.ts`, `site-document.tsx`, `ai-document-clerk.test.ts`, `filings/[id]/page.tsx`, `react`, `review/page.tsx`, `pending-review.tsx`, `filings/actions.ts`, `fixed-assets/page.tsx`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._