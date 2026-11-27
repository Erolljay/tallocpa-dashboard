# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1094 files · ~899,630 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6669 nodes · 23576 edges · 231 communities (203 shown, 28 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 224 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `fdf40aca`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- client
- migrate.yml
- ui.ts
- fees/types.ts
- devDependencies
- ai-employees/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- review-form.tsx
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
- proposal-view.tsx
- returns/types.ts
- clients/actions.ts
- register-xlsx.ts
- modal.tsx
- registrations/actions.ts
- scripts
- payroll/data.ts
- book/actions.ts
- Badge
- webhook.ts
- leads/[id]/page.tsx
- lock-bar.tsx
- parallel-run.tsx
- Card
- returns/load.ts
- rules.ts
- fields.ts
- books/export/route.ts
- [month]/page.tsx
- ocr/run.ts
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
- registrations/forms.tsx
- stat-cards.tsx
- alphalist.ts
- engine.ts
- registrations/[id]/page.tsx
- parties/[id]/page.tsx
- how-we-work/page.tsx
- app/settings/notifications/page.tsx
- cx.ts
- Pro components
- lib/books/actions.ts
- button.tsx
- portalContext
- portal-billing.test.ts
- theme-toggle.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- employees-xlsx.ts
- supabaseServer
- Recipes
- vat.ts
- BoardUI page patterns
- Pro templates
- step-files.tsx
- ledger/books.ts
- tools/page.tsx
- cx
- supabaseAdmin
- boardui
- opening-checklist.tsx
- ref_node_fs
- board.ts
- leads/actions.ts
- Notice
- return-file-actions.ts
- Opening balances: checklist for any cut-off
- pending-review.tsx
- portal/page.tsx
- opening.ts
- requireOwner
- fees/types.ts
- apply-migrations.sh
- fees/schedule.ts
- notification-settings-view.tsx
- notification-bell.tsx
- workpapers/load.ts
- notifications/format.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- notes.ts
- notification-actions.tsx
- proposal.ts
- read.test.ts
- register-books.test.ts
- return-file-actions.ts
- deadlines/actions.ts
- module-pages.tsx
- ocr/run.ts
- queries.ts
- blocks.tsx
- formToObject
- ticked-allocation.test.ts
- onboarding/checklist.ts
- grid.ts
- status.ts
- LinkButton
- cancel.ts
- app/page.tsx
- steps.ts
- chief-of-staff/README.md
- server-only
- notifications-view.tsx
- fees/forms.tsx
- vitest
- onboarding/ai-tools.ts
- document-clerk/README.md
- filters.tsx
- bell-store.ts
- onboarding/page.tsx
- pending-review.tsx
- cycle/page.tsx
- [key]/page.tsx
- idle-watcher.tsx
- oauth/server.ts
- index.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- template.ts
- pg
- protocol.ts
- register/page.tsx
- opengraph-image.tsx
- ledger.test.ts
- terms.ts
- webhook/route.ts
- month.ts
- workpapers/page.tsx
- split-bundled-pdfs.test.ts
- books-2307.test.ts
- acting-approver.test.ts
- next
- supabaseServer
- db.test.ts
- lead-attribution.test.ts
- remittances/forms.tsx
- contribution-remittances.test.ts
- app/settings/page.tsx
- onboarding/forms.tsx
- rates.ts
- tests/proposal-email.test.ts
- seed.ts
- workpapers.test.ts
- social-button.tsx
- formatAmount
- funnel.test.ts
- deadlines/dates.ts
- profile.ts
- site-document.tsx
- tests/books.test.ts
- ai-document-clerk.test.ts
- sign-off-actions.tsx
- onboarding-officer/project-instructions.md
- react
- review/page.tsx
- pending-review.tsx
- names.ts
- contact-access.test.ts
- late-surcharges.test.ts
- templates/README.md
- registration.test.ts
- telegram-uploads.test.ts
- books-migration.test.ts
- returns-books.test.ts
- filings/actions.ts
- parallel-run.test.ts
- returns-sign-off.test.ts
- Morning brief
- Onboarding Officer's desk
- ai-desks/README.md
- package.json
- fixed-assets/forms.tsx
- 7. The TalloCPA OS MCP server
- proposal-email.ts
- workpapers/page.tsx
- ai-employees.test.ts
- BoardUI page patterns
- tieouts.test.ts
- eslint.config.mjs
- leads-pipeline.test.ts
- catch-up.test.ts
- defer-documents.test.ts
- ledger-documents.test.ts
- tests/register.test.ts
- adjustments.test.ts

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

## Communities (231 total, 28 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.07
Nodes (60): BooksContext, booksViewFor(), one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff() (+52 more)

### Community 1 - "client"
Cohesion: 0.06
Nodes (23): BOOK_LOCK_FORMS, as(), client(), root, approve(), as(), root, send2307() (+15 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.05
Nodes (73): fmtMonth(), blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard() (+65 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.09
Nodes (42): EngagementRow, proposal(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow (+34 more)

### Community 5 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+8 more)

### Community 6 - "ai-employees/page.tsx"
Cohesion: 0.10
Nodes (30): RFC-2606, ActivityList(), ActivityRow, outcome, when, AddWorkforceButton(), EnabledSwitch(), SettingsValues (+22 more)

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

### Community 11 - "review-form.tsx"
Cohesion: 0.14
Nodes (14): Booking, DirectoryParty, ENTRY_STATUS, fmtDay(), fmtMonthOf(), ONLY_FOR, typeLabel, PendingTaxCodes (+6 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "PageHeader"
Cohesion: 0.05
Nodes (85): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), EditClient(), EditClientPage(), NewClientPage() (+77 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, next@16.4.6, pg@^8.23.1, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (50): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, Amendment, AmendmentStatus (+42 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (79): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), annualAttachments(), balanceSheet(), compute1701() (+71 more)

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
Nodes (53): Cwt2307TrackerPage(), Tracker(), amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), PortalCwt2307Page() (+45 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (52): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+44 more)

### Community 43 - "proposal-view.tsx"
Cohesion: 0.29
Nodes (11): jobName(), lineName(), longDate(), money(), php, ProposalView(), Rows(), Section() (+3 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.05
Nodes (77): tinHasBranch(), client, form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+69 more)

### Community 45 - "clients/actions.ts"
Cohesion: 0.09
Nodes (33): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setCatchUpAction() (+25 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.11
Nodes (33): file(), GET(), safe(), PayrollDocument(), ReadPayrollButton(), buildEmployeeTemplate(), sortItems(), targetOptions() (+25 more)

### Community 47 - "modal.tsx"
Cohesion: 0.06
Nodes (51): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), SearchHit, SearchKind (+43 more)

### Community 48 - "registrations/actions.ts"
Cohesion: 0.10
Nodes (30): cancelRegistrationAction(), ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openRegistrationAction(), openYearRenewalsAction(), PROOF_TYPES (+22 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "payroll/data.ts"
Cohesion: 0.10
Nodes (38): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), certificatesFromRaw() (+30 more)

### Community 51 - "book/actions.ts"
Cohesion: 0.12
Nodes (35): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+27 more)

### Community 52 - "Badge"
Cohesion: 0.05
Nodes (90): EmployerCard(), ClientReturnsPage(), FilingRow, Returns(), Client, CollectionsPage(), OpenDue, Overview() (+82 more)

### Community 53 - "webhook.ts"
Cohesion: 0.11
Nodes (41): ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF, CODES (+33 more)

### Community 54 - "leads/[id]/page.tsx"
Cohesion: 0.14
Nodes (18): bookedTime, LeadPage(), LeadTouch, Person, sentDate, day(), Leads(), LeadsPage() (+10 more)

### Community 55 - "lock-bar.tsx"
Cohesion: 0.14
Nodes (22): BooksLockBar(), ICON, LockBarFor(), MonthLock(), LockContext, BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod() (+14 more)

### Community 56 - "parallel-run.tsx"
Cohesion: 0.13
Nodes (27): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+19 more)

### Community 57 - "Card"
Cohesion: 0.08
Nodes (54): loadLockContext(), BooksMonthsPage(), Months(), one(), amt(), FixedAssets(), FixedAssetsPage(), one() (+46 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.09
Nodes (42): FinancialStatements, ATC_MASTER, AtcInfo, normalizeAtc(), row(), withNonDeductible(), dayBefore(), FilingRow (+34 more)

### Community 59 - "rules.ts"
Cohesion: 0.10
Nodes (31): RFC-7636, RFC-8414, allowAction(), check(), Checked, ConsentState, denyAction(), GET() (+23 more)

### Community 60 - "fields.ts"
Cohesion: 0.14
Nodes (21): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+13 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.11
Nodes (28): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+20 more)

### Community 62 - "[month]/page.tsx"
Cohesion: 0.15
Nodes (19): PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db (+11 more)

### Community 63 - "ocr/run.ts"
Cohesion: 0.15
Nodes (21): isSplittable(), MAX_BUNDLE_PAGES, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+13 more)

### Community 64 - "year-end/page.tsx"
Cohesion: 0.13
Nodes (27): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+19 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.05
Nodes (68): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+60 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.13
Nodes (24): Rule, IsoDate, DeadlineRule, DueRule, EfpsGroup, FilingChannel, FilingInstance, Frequency (+16 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "getIdentity"
Cohesion: 0.11
Nodes (34): amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text(), CatchUpRecorded, ReplyForm() (+26 more)

### Community 70 - "Centavos"
Cohesion: 0.06
Nodes (61): GridRow, MonthGrid(), toInput(), AlphaCols, AlphalistRow, buildAlphalist(), Certificates2316, form2316() (+53 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (38): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+30 more)

### Community 72 - "work/load.ts"
Cohesion: 0.19
Nodes (15): loadAssets(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "registrations/forms.tsx"
Cohesion: 0.17
Nodes (22): openClientCaseAction(), caseNote, caseTitle, Check(), ChecklistPreview(), ClientCaseForm(), statusTone, submitLabel (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "alphalist.ts"
Cohesion: 0.20
Nodes (18): branch4(), tinDashed(), alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4() (+10 more)

### Community 78 - "engine.ts"
Cohesion: 0.22
Nodes (18): compareIso(), lastDayOfMonth(), fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), nextWorkingDay(), Obligation (+10 more)

### Community 79 - "registrations/[id]/page.tsx"
Cohesion: 0.11
Nodes (37): completeRegistrationAction(), CompleteButton(), StepBadge(), StepRow, caseStatus, CertificateDetails, certificateLabel(), fmt() (+29 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.09
Nodes (45): mergePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName() (+37 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "app/settings/notifications/page.tsx"
Cohesion: 0.12
Nodes (30): RemoveClientUserButton(), NotesCard(), ClientDetail(), ClientPage(), fmtDate(), fmtMonth(), frequencyLabel, PortalClosingNote() (+22 more)

### Community 83 - "cx.ts"
Cohesion: 0.04
Nodes (59): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+51 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "lib/books/actions.ts"
Cohesion: 0.09
Nodes (43): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+35 more)

### Community 86 - "button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 87 - "portalContext"
Cohesion: 0.08
Nodes (64): Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat(), BooksSection() (+56 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "theme-toggle.tsx"
Cohesion: 0.06
Nodes (57): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+49 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 93 - "employees-xlsx.ts"
Cohesion: 0.08
Nodes (31): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+23 more)

### Community 94 - "supabaseServer"
Cohesion: 0.05
Nodes (83): addClientNoteAction(), NoteState, markCwtFollowedUpAction(), recomputeWorksheetAction(), GET(), fieldErrors(), savePartyAction(), setPartyVerifiedAction() (+75 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "vat.ts"
Cohesion: 0.13
Nodes (41): SaleSplit, branchOfTin(), payeeKeyOf(), tin9(), tinDigits(), invoiceLabel(), sawtAnnualAttachments(), SawtAnnualForm (+33 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "step-files.tsx"
Cohesion: 0.43
Nodes (7): addStepFile(), removeStepFile(), startStepFileUpload(), FileChip(), StepFile, StepFileUpload(), send()

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+39 more)

### Community 101 - "tools/page.tsx"
Cohesion: 0.17
Nodes (21): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), RepostRegisterButton() (+13 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (99): react-aria-components, SheetPreview(), switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, ChipColor, Breadcrumb() (+91 more)

### Community 103 - "supabaseAdmin"
Cohesion: 0.11
Nodes (37): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+29 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "opening-checklist.tsx"
Cohesion: 0.11
Nodes (30): Access, OpeningChecklist(), STATUS, Row, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD (+22 more)

### Community 106 - "ref_node_fs"
Cohesion: 0.05
Nodes (23): outDir, pkgDir, require, { version }, dir, readme, templates, afterButton() (+15 more)

### Community 107 - "board.ts"
Cohesion: 0.07
Nodes (36): FilingGroup(), StepProgress(), Row, FilingRow, StepWho, CauseTag, causeTag(), DUE_GROUP_LABELS (+28 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.13
Nodes (32): PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction() (+24 more)

### Community 109 - "Notice"
Cohesion: 0.08
Nodes (89): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm(), EntryForm() (+81 more)

### Community 110 - "return-file-actions.ts"
Cohesion: 0.26
Nodes (17): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+9 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "pending-review.tsx"
Cohesion: 0.19
Nodes (13): BulkState, Codes, initialCodes(), ocrKeys(), PendingReview(), PendingRow, ACCOUNT_SOURCES, AccountSource (+5 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.07
Nodes (51): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+43 more)

### Community 114 - "opening.ts"
Cohesion: 0.09
Nodes (31): EntryLineOut, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+23 more)

### Community 115 - "requireOwner"
Cohesion: 0.06
Nodes (73): setupMissingChartsAction(), addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction() (+65 more)

### Community 116 - "fees/types.ts"
Cohesion: 0.17
Nodes (17): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+9 more)

### Community 118 - "fees/schedule.ts"
Cohesion: 0.12
Nodes (25): QuerySource, jobOptions(), instantView(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+17 more)

### Community 119 - "notification-settings-view.tsx"
Cohesion: 0.23
Nodes (12): EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS (+4 more)

### Community 120 - "notification-bell.tsx"
Cohesion: 0.26
Nodes (15): markReadLocally(), useBellData(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base() (+7 more)

### Community 121 - "workpapers/load.ts"
Cohesion: 0.19
Nodes (18): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+10 more)

### Community 122 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (45): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+37 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "notes.ts"
Cohesion: 0.21
Nodes (12): ICON, when, inquiryAnswers(), NoteEntry, noteEntry(), NoteRow, NoteSource, notesTimeline() (+4 more)

### Community 126 - "notification-actions.tsx"
Cohesion: 0.16
Nodes (17): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+9 more)

### Community 127 - "proposal.ts"
Cohesion: 0.19
Nodes (12): JobBand, JobGroup, jobGroupOf(), ProposalQuote, Quote, PRICE_SECTIONS, priceSection(), PriceSectionKey (+4 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (90): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+82 more)

### Community 129 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 130 - "return-file-actions.ts"
Cohesion: 0.15
Nodes (27): RFC-2047, RFC-2822, GET(), accessToken(), call(), findReplies(), headerOf(), MailMessage (+19 more)

### Community 131 - "deadlines/actions.ts"
Cohesion: 0.60
Nodes (4): generateFilingsNow(), generatePastFilingsAction(), GenerateState, runFilingGeneration()

### Community 132 - "module-pages.tsx"
Cohesion: 0.10
Nodes (63): booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow, RowLink() (+55 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.07
Nodes (24): OcrManyOutput, OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL (+16 more)

### Community 134 - "queries.ts"
Cohesion: 0.21
Nodes (13): GET(), isNotificationKind(), BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+5 more)

### Community 135 - "blocks.tsx"
Cohesion: 0.06
Nodes (90): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+82 more)

### Community 136 - "formToObject"
Cohesion: 0.07
Nodes (50): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+42 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "onboarding/checklist.ts"
Cohesion: 0.19
Nodes (11): checklistOf(), ItemState, MANUAL_ITEM_LABELS, MANUAL_ITEMS, ONBOARDING_GROUPS, onboardingChecklist(), OnboardingFacts, OnboardingItem (+3 more)

### Community 139 - "grid.ts"
Cohesion: 0.24
Nodes (11): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+3 more)

### Community 140 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 141 - "LinkButton"
Cohesion: 0.10
Nodes (50): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+42 more)

### Community 142 - "cancel.ts"
Cohesion: 0.26
Nodes (11): cancelMeetingAction(), cancelMyMeetingAction(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail(), manilaWhen() (+3 more)

### Community 143 - "app/page.tsx"
Cohesion: 0.07
Nodes (49): GET(), ClientValues, TAX_TYPES, TaxType, CoverageClient, coverageGaps(), Gap, GapKind (+41 more)

### Community 144 - "steps.ts"
Cohesion: 0.08
Nodes (26): Agency, amendmentWords, approval(), BillingFacts, BIR_CHANGES, birForm(), BranchOptions, CaseStep (+18 more)

### Community 145 - "chief-of-staff/README.md"
Cohesion: 0.17
Nodes (8): How you work, When the Owner asks something else, Your job, Before you start (TalloCPA OS), Check it, Chief of Staff's desk, Set up the desk (Cowork, once), Scheduled task: morning brief

### Community 146 - "server-only"
Cohesion: 0.08
Nodes (50): server-only, @supabase/supabase-js, GET(), GET(), emailProposalAction(), runActingDigest(), cancelDiscoveryCall(), CancelResult (+42 more)

### Community 147 - "notifications-view.tsx"
Cohesion: 0.30
Nodes (11): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, fullDateTime() (+3 more)

### Community 148 - "fees/forms.tsx"
Cohesion: 0.18
Nodes (21): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+13 more)

### Community 149 - "vitest"
Cohesion: 0.04
Nodes (15): vitest, ctx, input, root, root, root, root, root (+7 more)

### Community 150 - "onboarding/ai-tools.ts"
Cohesion: 0.06
Nodes (52): zod, DRAFT_KIND_LABELS, DraftLine, NewDraft, saveDraft(), clientRef, findClient(), getClient (+44 more)

### Community 151 - "document-clerk/README.md"
Cohesion: 0.17
Nodes (9): How you work, Your job, Before you start (TalloCPA OS), Check it, Document Clerk's desk, Set up the desk (Cowork, once), Review queue, Rules (+1 more)

### Community 152 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 153 - "bell-store.ts"
Cohesion: 0.42
Nodes (10): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+2 more)

### Community 154 - "onboarding/page.tsx"
Cohesion: 0.29
Nodes (10): ClientTab, ClientTabs(), UNDER, StatusButton(), RemoveFileButton(), TickForm(), fmtDate(), Onboarding() (+2 more)

### Community 155 - "pending-review.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "cycle/page.tsx"
Cohesion: 0.19
Nodes (17): Cycle(), CyclePage(), CycleWithClient, DocRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction() (+9 more)

### Community 157 - "[key]/page.tsx"
Cohesion: 0.11
Nodes (38): addWorkforceAction(), AiState, assignClientAction(), createAiLogin(), createKeyAction(), disconnectAppAction(), fieldErrors(), grantToolsAction() (+30 more)

### Community 158 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 159 - "oauth/server.ts"
Cohesion: 0.12
Nodes (24): copy(), hashKey(), isKeyShaped(), KEY_PREFIX, keyHint(), keyMatches(), KeyState, newKey() (+16 more)

### Community 160 - "index.ts"
Cohesion: 0.03
Nodes (32): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+24 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (19): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), Interval, manilaInstant(), appBookedEvents() (+11 more)

### Community 163 - "template.ts"
Cohesion: 0.07
Nodes (33): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, jobField, ProposalJob (+25 more)

### Community 164 - "pg"
Cohesion: 0.07
Nodes (8): pg, poolConfig(), root, root, Row, root, root, root

### Community 165 - "protocol.ts"
Cohesion: 0.08
Nodes (36): asAi(), borrow(), callsToday(), denied(), instructionsFor(), log(), manilaDay(), McpRequest (+28 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 169 - "terms.ts"
Cohesion: 0.27
Nodes (7): acceptProposalAction(), AcceptState, contentHash(), acceptedQuote(), canonicalContent(), defaultTerms(), ProposalContent

### Community 170 - "webhook/route.ts"
Cohesion: 0.25
Nodes (5): maxDuration, POST(), TelegramApi, telegramApi(), InlineKeyboard

### Community 171 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 172 - "workpapers/page.tsx"
Cohesion: 0.18
Nodes (13): ReviewNote, Memo, MemoInput, MemoMonth, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps() (+5 more)

### Community 173 - "split-bundled-pdfs.test.ts"
Cohesion: 0.29
Nodes (3): bundle(), Part, root

### Community 174 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "next"
Cohesion: 0.05
Nodes (78): nextConfig, next, DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, ApprovedReview() (+70 more)

### Community 177 - "supabaseServer"
Cohesion: 0.08
Nodes (41): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+33 more)

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 180 - "remittances/forms.tsx"
Cohesion: 0.19
Nodes (28): DueDateForm(), EmployerNumberForm(), HandlesContributionsSwitch(), PrepareForm(), RemitForm(), RemittanceButton(), RemittanceFileUpload(), send() (+20 more)

### Community 181 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 182 - "app/settings/page.tsx"
Cohesion: 0.06
Nodes (65): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+57 more)

### Community 183 - "onboarding/forms.tsx"
Cohesion: 0.28
Nodes (12): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), send() (+4 more)

### Community 184 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 186 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 187 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 188 - "social-button.tsx"
Cohesion: 0.09
Nodes (29): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+21 more)

### Community 189 - "formatAmount"
Cohesion: 0.25
Nodes (13): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), FinancialStatementsView(), StatementTable(), booksMonth() (+5 more)

### Community 190 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 191 - "deadlines/dates.ts"
Cohesion: 0.51
Nodes (7): shift(), addMonths(), toIso(), ymd(), monthChoices(), nextCutoff(), openMonth()

### Community 192 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 193 - "site-document.tsx"
Cohesion: 0.11
Nodes (16): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+8 more)

### Community 194 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "ai-document-clerk.test.ts"
Cohesion: 0.09
Nodes (23): maxDuration, POST(), OPTIONS, POST(), RFC-7591, OPTIONS, POST(), handleMcp() (+15 more)

### Community 196 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 197 - "onboarding-officer/project-instructions.md"
Cohesion: 0.22
Nodes (6): Onboard a client, Rules, Steps, How you work, Never, Your job

### Community 198 - "react"
Cohesion: 0.03
Nodes (113): react, @remixicon/react, BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), InvoiceEdit(), JournalEntryRoute(), JournalRoute() (+105 more)

### Community 199 - "review/page.tsx"
Cohesion: 0.11
Nodes (37): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+29 more)

### Community 200 - "pending-review.tsx"
Cohesion: 0.15
Nodes (22): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DocumentCodes, slpCategoryFromCodes() (+14 more)

### Community 201 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 208 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 210 - "filings/actions.ts"
Cohesion: 0.18
Nodes (19): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+11 more)

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

### Community 216 - "package.json"
Cohesion: 0.18
Nodes (10): motion@^12.43.0, @supabase/ssr@^0.12.7, tsx@^4.23.15, name, packageManager, private, version, motion (+2 more)

### Community 217 - "fixed-assets/forms.tsx"
Cohesion: 0.31
Nodes (10): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+2 more)

### Community 218 - "7. The TalloCPA OS MCP server"
Cohesion: 0.50
Nodes (4): 7.1 Parts, 7.2 Tools, 7.3 New features and the MCP, 7. The TalloCPA OS MCP server

### Community 220 - "proposal-email.ts"
Cohesion: 0.18
Nodes (11): digestMessage(), DigestRow, longDay(), peso, time(), firstName(), NOTE_MAX, php (+3 more)

### Community 223 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 225 - "ai-employees.test.ts"
Cohesion: 0.22
Nodes (5): BOOKS, CLIENT_RECORDS, DOCUMENT_RECORDS, OWN, root

### Community 226 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 227 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 228 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 231 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 237 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **31 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1804 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `client`, `ui.ts`, `fees/types.ts`, `devDependencies`, `ai-employees/page.tsx`, `PageHeader`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `returns/types.ts`, `clients/actions.ts`, `payroll/data.ts`, `book/actions.ts`, `Badge`, `webhook.ts`, `lock-bar.tsx`, `returns/load.ts`, `rules.ts`, `fields.ts`, `books/export/route.ts`, `[month]/page.tsx`, `ocr/run.ts`, `year-end/page.tsx`, `marketing/page.tsx`, `generate.ts`, `testing.ts`, `getIdentity`, `Centavos`, `work/load.ts`, `registrations/forms.tsx`, `engine.ts`, `parties/[id]/page.tsx`, `cx.ts`, `portalContext`, `portal-billing.test.ts`, `theme-toggle.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `supabaseServer`, `ledger/books.ts`, `supabaseAdmin`, `opening-checklist.tsx`, `ref_node_fs`, `board.ts`, `pending-review.tsx`, `portal/page.tsx`, `opening.ts`, `requireOwner`, `fees/types.ts`, `fees/schedule.ts`, `notifications/format.ts`, `batch/register.ts`, `notes.ts`, `proposal.ts`, `read.test.ts`, `register-books.test.ts`, `return-file-actions.ts`, `ocr/run.ts`, `blocks.tsx`, `formToObject`, `ticked-allocation.test.ts`, `onboarding/checklist.ts`, `status.ts`, `cancel.ts`, `app/page.tsx`, `server-only`, `fees/forms.tsx`, `onboarding/ai-tools.ts`, `filters.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `idle-watcher.tsx`, `oauth/server.ts`, `index.ts`, `calendar/page.tsx`, `template.ts`, `pg`, `protocol.ts`, `register/page.tsx`, `ledger.test.ts`, `terms.ts`, `month.ts`, `workpapers/page.tsx`, `split-bundled-pdfs.test.ts`, `books-2307.test.ts`, `acting-approver.test.ts`, `next`, `db.test.ts`, `lead-attribution.test.ts`, `contribution-remittances.test.ts`, `app/settings/page.tsx`, `rates.ts`, `tests/proposal-email.test.ts`, `workpapers.test.ts`, `social-button.tsx`, `formatAmount`, `funnel.test.ts`, `deadlines/dates.ts`, `profile.ts`, `tests/books.test.ts`, `ai-document-clerk.test.ts`, `review/page.tsx`, `pending-review.tsx`, `names.ts`, `contact-access.test.ts`, `late-surcharges.test.ts`, `registration.test.ts`, `telegram-uploads.test.ts`, `books-migration.test.ts`, `returns-books.test.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `package.json`, `proposal-email.ts`, `ai-employees.test.ts`, `tieouts.test.ts`, `leads-pipeline.test.ts`, `catch-up.test.ts`, `defer-documents.test.ts`, `ledger-documents.test.ts`, `tests/register.test.ts`, `adjustments.test.ts`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07192982456140351 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `ai-employees/page.tsx`, `review-form.tsx`, `PageHeader`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `clients/actions.ts`, `modal.tsx`, `payroll/data.ts`, `book/actions.ts`, `Badge`, `leads/[id]/page.tsx`, `lock-bar.tsx`, `parallel-run.tsx`, `Card`, `[month]/page.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `getIdentity`, `books/forms.tsx`, `registrations/forms.tsx`, `stat-cards.tsx`, `registrations/[id]/page.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `app/settings/notifications/page.tsx`, `cx.ts`, `lib/books/actions.ts`, `button.tsx`, `portalContext`, `theme-toggle.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `supabaseServer`, `step-files.tsx`, `ledger/books.ts`, `tools/page.tsx`, `cx`, `supabaseAdmin`, `leads/actions.ts`, `Notice`, `return-file-actions.ts`, `pending-review.tsx`, `portal/page.tsx`, `requireOwner`, `notification-settings-view.tsx`, `notification-bell.tsx`, `batch/register.ts`, `notification-actions.tsx`, `read.test.ts`, `deadlines/actions.ts`, `module-pages.tsx`, `queries.ts`, `blocks.tsx`, `formToObject`, `LinkButton`, `fees/forms.tsx`, `filters.tsx`, `bell-store.ts`, `onboarding/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `[key]/page.tsx`, `idle-watcher.tsx`, `calendar/page.tsx`, `template.ts`, `register/page.tsx`, `next`, `supabaseServer`, `remittances/forms.tsx`, `app/settings/page.tsx`, `onboarding/forms.tsx`, `social-button.tsx`, `formatAmount`, `profile.ts`, `site-document.tsx`, `sign-off-actions.tsx`, `review/page.tsx`, `package.json`, `fixed-assets/forms.tsx`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.059743954480796585 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `form-2307.ts`, `ui.ts`, `ai-employees/page.tsx`, `review-form.tsx`, `PageHeader`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `clients/actions.ts`, `register-xlsx.ts`, `modal.tsx`, `registrations/actions.ts`, `payroll/data.ts`, `book/actions.ts`, `Badge`, `leads/[id]/page.tsx`, `parallel-run.tsx`, `Card`, `rules.ts`, `books/export/route.ts`, `[month]/page.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `getIdentity`, `books/forms.tsx`, `registrations/[id]/page.tsx`, `parties/[id]/page.tsx`, `app/settings/notifications/page.tsx`, `lib/books/actions.ts`, `portalContext`, `theme-toggle.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `supabaseServer`, `step-files.tsx`, `ledger/books.ts`, `tools/page.tsx`, `cx`, `supabaseAdmin`, `opening-checklist.tsx`, `leads/actions.ts`, `return-file-actions.ts`, `pending-review.tsx`, `portal/page.tsx`, `requireOwner`, `notification-bell.tsx`, `batch/register.ts`, `notification-actions.tsx`, `read.test.ts`, `return-file-actions.ts`, `deadlines/actions.ts`, `module-pages.tsx`, `queries.ts`, `blocks.tsx`, `formToObject`, `LinkButton`, `app/page.tsx`, `server-only`, `notifications-view.tsx`, `fees/forms.tsx`, `onboarding/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `[key]/page.tsx`, `idle-watcher.tsx`, `calendar/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `terms.ts`, `webhook/route.ts`, `supabaseServer`, `remittances/forms.tsx`, `app/settings/page.tsx`, `onboarding/forms.tsx`, `social-button.tsx`, `formatAmount`, `profile.ts`, `site-document.tsx`, `ai-document-clerk.test.ts`, `sign-off-actions.tsx`, `react`, `review/page.tsx`, `pending-review.tsx`, `filings/actions.ts`, `package.json`, `fixed-assets/forms.tsx`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._