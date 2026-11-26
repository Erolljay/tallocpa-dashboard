# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 917 files · ~730,254 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5662 nodes · 19961 edges · 200 communities (174 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 183 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `06630ec6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- december-rehearsal.test.ts
- migrate.yml
- remittances/[id]/page.tsx
- fees/schedule.ts
- devDependencies
- registrations/forms.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- cx
- Sign-in & Setup Docs
- cx.ts
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
- onboarding/page.tsx
- index.ts
- payroll/forms.tsx
- modal.tsx
- deadlines/page.tsx
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- payroll/payroll.test.ts
- documents/labels.ts
- module-pages.tsx
- marketing/page.tsx
- [employeeId]/page.tsx
- work/page.tsx
- returns/types.ts
- Notice
- Badge
- books/export/route.ts
- layout.ts
- lock-bar.tsx
- Centavos
- status.ts
- Apple Design
- supabaseServer
- testing.ts
- requireOwner
- ocr/run.ts
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- input.tsx
- @remixicon/react
- Card
- theme-toggle.tsx
- proposal.ts
- branches/page.tsx
- how-we-work/page.tsx
- alphalist.ts
- link-button.tsx
- Pro components
- site-document.tsx
- tools/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- memo.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- collections/forms.tsx
- Recipes
- notifications-view.tsx
- BoardUI page patterns
- Pro templates
- ui.ts
- ledger/books.ts
- generate.ts
- select.tsx
- safeguards-load.ts
- boardui
- quote/page.tsx
- profile.ts
- manilaToday
- template.ts
- social-button.tsx
- vitest
- Opening balances: checklist for any cut-off
- tieouts.ts
- portal/page.tsx
- lib/books/actions.ts
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- vat.ts
- proposal-view.tsx
- returns/load.ts
- work/load.ts
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- portalContext
- toCentavos
- parties/[id]/page.tsx
- read.test.ts
- opening.ts
- mime.ts
- fields.ts
- morning.ts
- documents/[id]/page.tsx
- fixed-assets/page.tsx
- rates.ts
- react
- ticked-allocation.test.ts
- requests/actions.ts
- ledger.test.ts
- engine.ts
- move-bar.tsx
- sign-off.ts
- settings/actions.ts
- dates.ts
- register/page.tsx
- server-only
- ledger/data.ts
- workpapers/load.ts
- sign-off-actions.tsx
- blocks.tsx
- holiday-list.ts
- safeguards.ts
- workpapers/page.tsx
- package.json
- app/documents/page.tsx
- fixed-assets/forms.tsx
- quote.ts
- notes.ts
- deadlines/actions.ts
- approval-memo.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- formatAmount
- filings/actions.ts
- FormModule
- IsoDate
- opengraph-image.tsx
- lead-attribution.test.ts
- public.ts
- Building UIs with BoardUI
- filings/[id]/page.tsx
- app/settings/page.tsx
- binder/page.tsx
- db.test.ts
- acting-approver.test.ts
- fixed-assets.test.ts
- eslint.config.mjs
- ref_node_fs
- returns-sign-off.test.ts
- books-2307.test.ts
- [month]/page.tsx
- ledger-closing.test.ts
- generate-qap-fixture.mjs
- leads-pipeline.test.ts
- tests/books.test.ts
- notifications.test.ts
- portal-statements-approval.test.ts
- books-migration.test.ts
- books/reports/statements/page.tsx
- defer-documents.test.ts
- tests/parties.test.ts
- tests/register.test.ts
- adjustments.test.ts
- client-reports.test.ts
- year-end.test.ts
- engine.test.ts
- funnel.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 344 edges
2. `cx` - 286 edges
3. `react` - 262 edges
4. `Skeleton()` - 250 edges
5. `Notice()` - 244 edges
6. `next` - 223 edges
7. `Button()` - 220 edges
8. `Badge()` - 177 edges
9. `Card()` - 175 edges
10. `vitest` - 171 edges

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

## Communities (200 total, 26 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.07
Nodes (58): BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href() (+50 more)

### Community 1 - "december-rehearsal.test.ts"
Cohesion: 0.07
Nodes (23): templatePayload(), BOOK_LOCK_FORMS, as(), client(), root, approveIntoBooks(), as(), generateFilings() (+15 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "remittances/[id]/page.tsx"
Cohesion: 0.11
Nodes (42): EmployerCard(), amount(), ORDER, Remittance(), RemittancePage(), STEPS, Remittances(), RemittancesPage() (+34 more)

### Community 4 - "fees/schedule.ts"
Cohesion: 0.13
Nodes (16): conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, optionalAmount, range, ScheduleStatus (+8 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "registrations/forms.tsx"
Cohesion: 0.10
Nodes (32): ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient(), EditClientPage(), ClientDetail() (+24 more)

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

### Community 11 - "cx"
Cohesion: 0.10
Nodes (41): SheetPreview(), emit(), listeners, markReadLocally(), onChanged(), onFocus(), onVisible(), refreshBell() (+33 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx.ts"
Cohesion: 0.03
Nodes (69): react-aria-components, AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles (+61 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (40): defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES, FsLine, FsLineKey (+32 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (58): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+50 more)

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
Nodes (37): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+29 more)

### Community 42 - "compare.ts"
Cohesion: 0.07
Nodes (54): atcRows(), BookInvoiceRow, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC (+46 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (33): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+25 more)

### Community 45 - "index.ts"
Cohesion: 0.07
Nodes (19): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+11 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.12
Nodes (39): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+31 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (46): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+38 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (34): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+26 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.10
Nodes (45): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+37 more)

### Community 52 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (45): file(), GET(), safe(), MonthGrid(), toInput(), PayrollDocument(), monthlyTable(), monthlyWithholding() (+37 more)

### Community 53 - "documents/labels.ts"
Cohesion: 0.08
Nodes (42): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, approveDocumentAction(), Row, Doc (+34 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.08
Nodes (68): booksContext(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+60 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (61): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+53 more)

### Community 56 - "[employeeId]/page.tsx"
Cohesion: 0.40
Nodes (8): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), loadPriorEmployers(), payAccountsOf(), displayName()

### Community 57 - "work/page.tsx"
Cohesion: 0.13
Nodes (26): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey, TaskDetail(), TaskPage() (+18 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (71): client, row(), VatData, form1601C, INPUTS, MONTH, PAYSLIP_COLUMNS, payslipCsv() (+63 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (76): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm(), EntryForm() (+68 more)

### Community 60 - "Badge"
Cohesion: 0.04
Nodes (102): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+94 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.12
Nodes (25): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+17 more)

### Community 62 - "layout.ts"
Cohesion: 0.12
Nodes (23): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, showDay() (+15 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.14
Nodes (25): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+17 more)

### Community 64 - "Centavos"
Cohesion: 0.09
Nodes (28): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), AtcComparison, Bucket, DocumentDifference (+20 more)

### Community 65 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "supabaseServer"
Cohesion: 0.06
Nodes (69): nextConfig, next, setIncomeTaxMethodAction(), addClientNoteAction(), NoteState, ClientList(), ClientsPage(), Row (+61 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "requireOwner"
Cohesion: 0.09
Nodes (42): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction() (+34 more)

### Community 70 - "ocr/run.ts"
Cohesion: 0.17
Nodes (20): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP (+12 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (39): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+31 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.07
Nodes (62): GridRow, AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+54 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "input.tsx"
Cohesion: 0.12
Nodes (25): HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps, inputElementClassName (+17 more)

### Community 76 - "@remixicon/react"
Cohesion: 0.06
Nodes (45): @remixicon/react, DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+37 more)

### Community 77 - "Card"
Cohesion: 0.08
Nodes (37): Cycle(), CycleWithClient, DocRow, BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth() (+29 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.06
Nodes (55): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+47 more)

### Community 79 - "proposal.ts"
Cohesion: 0.10
Nodes (26): ProposalSetup, corp, items, proposal(), OWNER_PRICES, OWNER_SETTINGS, buildProposalQuote(), JOB_GROUPS (+18 more)

### Community 80 - "branches/page.tsx"
Cohesion: 0.20
Nodes (15): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), AddBranchForm(), BranchRowForm(), Branches() (+7 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (35): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+27 more)

### Community 82 - "alphalist.ts"
Cohesion: 0.15
Nodes (24): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+16 more)

### Community 83 - "link-button.tsx"
Cohesion: 0.10
Nodes (26): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 86 - "tools/page.tsx"
Cohesion: 0.16
Nodes (24): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), ReverseForm() (+16 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (64): PortalClient, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat() (+56 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "memo.ts"
Cohesion: 0.18
Nodes (13): ReviewNote, Memo, MemoInput, MemoMonth, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps() (+5 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.10
Nodes (30): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+22 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (46): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+38 more)

### Community 94 - "collections/forms.tsx"
Cohesion: 0.23
Nodes (18): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "notifications-view.tsx"
Cohesion: 0.05
Nodes (65): GET(), notifyNotificationsChanged(), EmailSwitches(), EmailSwitchGroup, MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData (+57 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "ui.ts"
Cohesion: 0.05
Nodes (83): blankLine(), InvoiceForm(), InvoiceFormValue, BooksSummaryPage(), Summary(), SummaryCard(), fmt(), OpenInvoice (+75 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (44): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookKind (+36 more)

### Community 101 - "generate.ts"
Cohesion: 0.16
Nodes (18): Rule, PlannedObligation, DueRule, EfpsGroup, FilingChannel, Frequency, PeriodFilter, ACTIVE (+10 more)

### Community 102 - "select.tsx"
Cohesion: 0.08
Nodes (36): Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider() (+28 more)

### Community 103 - "safeguards-load.ts"
Cohesion: 0.16
Nodes (15): Row, BoardRow, FilingRow, holidaySet(), loadBoard(), loadCoverage(), monthStart(), Risk (+7 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "quote/page.tsx"
Cohesion: 0.12
Nodes (25): PriceRow, COMPLEXITY_LABEL, Lines(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), TAXPAYER_TYPES (+17 more)

### Community 106 - "profile.ts"
Cohesion: 0.07
Nodes (45): zod@^4.6.7, zod, BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload (+37 more)

### Community 107 - "manilaToday"
Cohesion: 0.09
Nodes (49): ClientReturnsPage(), FilingRow, Returns(), DashboardStats(), FilingListRow, FilingTable(), OwnerSections(), ActingNotice() (+41 more)

### Community 108 - "template.ts"
Cohesion: 0.10
Nodes (19): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+11 more)

### Community 109 - "social-button.tsx"
Cohesion: 0.06
Nodes (52): GET(), GET(), POST(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+44 more)

### Community 110 - "vitest"
Cohesion: 0.05
Nodes (18): pg, vitest, dir, root, root, root, root, root (+10 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "tieouts.ts"
Cohesion: 0.12
Nodes (17): ExplainState, explainTieAction(), SIGNED, LedgerTotals, purchases(), sales(), base, books (+9 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (47): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, TimelineRow (+39 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.14
Nodes (28): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+20 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (39): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), RunReadyButton(), VoidDepositForm() (+31 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (37): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+29 more)

### Community 118 - "vat.ts"
Cohesion: 0.14
Nodes (46): incomeAttachments(), Periods, buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv(), sawtDat() (+38 more)

### Community 119 - "proposal-view.tsx"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.08
Nodes (48): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+40 more)

### Community 121 - "work/load.ts"
Cohesion: 0.20
Nodes (15): loadAssets(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (41): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+33 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "portalContext"
Cohesion: 0.09
Nodes (36): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), portalContext() (+28 more)

### Community 126 - "toCentavos"
Cohesion: 0.08
Nodes (43): PreviewTable(), applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction() (+35 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (37): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList(), Row (+29 more)

### Community 128 - "read.test.ts"
Cohesion: 0.04
Nodes (82): RFC-4180, SPREADSHEET_TYPES, base64(), GeminiError, geminiJson(), call(), GeminiOptions, inlineFile() (+74 more)

### Community 129 - "opening.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 130 - "mime.ts"
Cohesion: 0.11
Nodes (33): RFC-2047, RFC-2822, GET(), DatFiles, datFiles(), Db, accessToken(), call() (+25 more)

### Community 131 - "fields.ts"
Cohesion: 0.07
Nodes (33): msgs(), ok, FieldKey, keys, normalizeAmount(), normalizeFields(), normalizePartyKind(), normalizeTerms() (+25 more)

### Community 132 - "morning.ts"
Cohesion: 0.17
Nodes (15): Gap, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board (+7 more)

### Community 133 - "documents/[id]/page.tsx"
Cohesion: 0.22
Nodes (11): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), ReadPayrollButton(), pendingDocumentTaxCodes(), LockFiling, lockingFiling() (+3 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (18): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), Row, accumulated() (+10 more)

### Community 135 - "rates.ts"
Cohesion: 0.24
Nodes (18): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+10 more)

### Community 136 - "react"
Cohesion: 0.05
Nodes (71): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+63 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "requests/actions.ts"
Cohesion: 0.12
Nodes (29): ReplyForm(), send(), METHODS, ProofUpload(), send(), amount, date, ProofState (+21 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "engine.ts"
Cohesion: 0.29
Nodes (15): compareIso(), lastDayOfMonth(), fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), nextWorkingDay(), periodApplies() (+7 more)

### Community 141 - "move-bar.tsx"
Cohesion: 0.33
Nodes (11): ApprovedReview(), moveSelectedAction(), MoveState, plural(), unapproveSelectedAction(), MoveBar(), crossesYear(), MOVE_TARGETS (+3 more)

### Community 142 - "sign-off.ts"
Cohesion: 0.17
Nodes (13): ACTION_LABEL, availableActions(), FilingState, isNilReturn(), SIGN_OFF_STEPS, stepIndex(), client, owner (+5 more)

### Community 143 - "settings/actions.ts"
Cohesion: 0.32
Nodes (11): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+3 more)

### Community 144 - "dates.ts"
Cohesion: 0.39
Nodes (9): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff() (+1 more)

### Community 145 - "register/page.tsx"
Cohesion: 0.10
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 146 - "server-only"
Cohesion: 0.12
Nodes (34): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), confirmMonthAction(), decideExceptionAction() (+26 more)

### Community 147 - "ledger/data.ts"
Cohesion: 0.10
Nodes (33): Access, STATUS, BookEntry, CASH_FLOW_CLASSES, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES (+25 more)

### Community 148 - "workpapers/load.ts"
Cohesion: 0.27
Nodes (11): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+3 more)

### Community 149 - "sign-off-actions.tsx"
Cohesion: 0.23
Nodes (12): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+4 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (98): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+90 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.16
Nodes (17): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+9 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.24
Nodes (12): documentCutoff(), DONE_FROM_STATUS, isWorkingDay(), riskOf(), STEP_LABELS, StepKey, stepsFor(), march1601C() (+4 more)

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.19
Nodes (20): noteAction(), raiseNoteAction(), signWorkpaperAction(), tickAdjustmentAction(), ExplainForm(), amt(), one(), shiftMonth() (+12 more)

### Community 154 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (26): ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy() (+18 more)

### Community 156 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm()

### Community 157 - "quote.ts"
Cohesion: 0.09
Nodes (44): EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+36 more)

### Community 158 - "notes.ts"
Cohesion: 0.19
Nodes (15): NotesCard(), ICON, NotesTimeline(), when, SERVICE_LABELS, inquiryAnswers(), NoteEntry, noteEntry() (+7 more)

### Community 159 - "deadlines/actions.ts"
Cohesion: 0.42
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 160 - "approval-memo.tsx"
Cohesion: 0.31
Nodes (7): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, grossSales(), approvalMemo()

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.22
Nodes (20): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), Interval, manilaInstant() (+12 more)

### Community 163 - "formatAmount"
Cohesion: 0.22
Nodes (20): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+12 more)

### Community 164 - "filings/actions.ts"
Cohesion: 0.32
Nodes (12): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+4 more)

### Community 165 - "FormModule"
Cohesion: 0.15
Nodes (11): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, PAYROLL_FORMS (+3 more)

### Community 166 - "IsoDate"
Cohesion: 0.22
Nodes (9): TimelineFiling, TimelineItem, IsoDate, FilingInstance, Obligation, Period, DueDateUpdate, FilingRow (+1 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 169 - "public.ts"
Cohesion: 0.20
Nodes (12): acceptProposalAction(), AcceptState, QuerySource, InstantQuote, instantView(), brandSchedule(), contentHash(), instantQuote() (+4 more)

### Community 170 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 171 - "filings/[id]/page.tsx"
Cohesion: 0.14
Nodes (28): bookKind, BookRow, bookStatus, Event, eventText, Filing(), FilingFile, FilingPage() (+20 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (34): appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage(), accountSchema (+26 more)

### Community 173 - "binder/page.tsx"
Cohesion: 0.42
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, totals()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 177 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 178 - "ref_node_fs"
Cohesion: 0.07
Nodes (10): outDir, pkgDir, require, { version }, ctx, input, root, root (+2 more)

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 180 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 181 - "[month]/page.tsx"
Cohesion: 0.10
Nodes (39): saveMonthAction(), SubmissionReview(), PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton() (+31 more)

### Community 182 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 183 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 184 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 185 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 188 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 189 - "books/reports/statements/page.tsx"
Cohesion: 0.19
Nodes (15): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+7 more)

### Community 192 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 198 - "engine.test.ts"
Cohesion: 0.20
Nodes (10): DeadlineRule, dueDates(), none, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027 (+2 more)

### Community 201 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1496 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `december-rehearsal.test.ts`, `remittances/[id]/page.tsx`, `fees/schedule.ts`, `devDependencies`, `registrations/forms.tsx`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `onboarding/page.tsx`, `index.ts`, `deadlines/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `payroll/payroll.test.ts`, `marketing/page.tsx`, `work/page.tsx`, `returns/types.ts`, `Badge`, `books/export/route.ts`, `layout.ts`, `lock-bar.tsx`, `status.ts`, `testing.ts`, `requireOwner`, `payroll/data.ts`, `Card`, `theme-toggle.tsx`, `proposal.ts`, `branches/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `memo.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `notifications-view.tsx`, `ui.ts`, `ledger/books.ts`, `generate.ts`, `safeguards-load.ts`, `quote/page.tsx`, `profile.ts`, `manilaToday`, `template.ts`, `social-button.tsx`, `tieouts.ts`, `portal/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `returns/load.ts`, `batch/register.ts`, `toCentavos`, `parties/[id]/page.tsx`, `read.test.ts`, `opening.ts`, `mime.ts`, `fields.ts`, `morning.ts`, `documents/[id]/page.tsx`, `fixed-assets/page.tsx`, `rates.ts`, `ticked-allocation.test.ts`, `ledger.test.ts`, `move-bar.tsx`, `sign-off.ts`, `dates.ts`, `register/page.tsx`, `server-only`, `ledger/data.ts`, `blocks.tsx`, `holiday-list.ts`, `safeguards.ts`, `package.json`, `app/documents/page.tsx`, `quote.ts`, `notes.ts`, `approval-memo.tsx`, `calendar/page.tsx`, `lead-attribution.test.ts`, `public.ts`, `app/settings/page.tsx`, `db.test.ts`, `acting-approver.test.ts`, `fixed-assets.test.ts`, `ref_node_fs`, `returns-sign-off.test.ts`, `books-2307.test.ts`, `ledger-closing.test.ts`, `leads-pipeline.test.ts`, `tests/books.test.ts`, `notifications.test.ts`, `portal-statements-approval.test.ts`, `books-migration.test.ts`, `books/reports/statements/page.tsx`, `defer-documents.test.ts`, `tests/parties.test.ts`, `tests/register.test.ts`, `adjustments.test.ts`, `client-reports.test.ts`, `year-end.test.ts`, `engine.test.ts`, `funnel.test.ts`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07441688263606072 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `remittances/[id]/page.tsx`, `registrations/forms.tsx`, `cx`, `cx.ts`, `dependencies`, `year-end/page.tsx`, `scores/page.tsx`, `onboarding/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `[employeeId]/page.tsx`, `work/page.tsx`, `Notice`, `Badge`, `lock-bar.tsx`, `supabaseServer`, `requireOwner`, `books/forms.tsx`, `input.tsx`, `@remixicon/react`, `Card`, `theme-toggle.tsx`, `proposal.ts`, `branches/page.tsx`, `how-we-work/page.tsx`, `link-button.tsx`, `site-document.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/[id]/page.tsx`, `collections/forms.tsx`, `notifications-view.tsx`, `ui.ts`, `ledger/books.ts`, `select.tsx`, `quote/page.tsx`, `profile.ts`, `manilaToday`, `social-button.tsx`, `tieouts.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `proposal-view.tsx`, `returns/load.ts`, `batch/register.ts`, `portalContext`, `toCentavos`, `parties/[id]/page.tsx`, `documents/[id]/page.tsx`, `fixed-assets/page.tsx`, `requests/actions.ts`, `move-bar.tsx`, `settings/actions.ts`, `register/page.tsx`, `sign-off-actions.tsx`, `blocks.tsx`, `workpapers/page.tsx`, `package.json`, `app/documents/page.tsx`, `fixed-assets/forms.tsx`, `quote.ts`, `deadlines/actions.ts`, `calendar/page.tsx`, `formatAmount`, `filings/[id]/page.tsx`, `app/settings/page.tsx`, `binder/page.tsx`, `[month]/page.tsx`, `books/reports/statements/page.tsx`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `december-rehearsal.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06585365853658537 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `remittances/[id]/page.tsx`, `registrations/forms.tsx`, `cx`, `dependencies`, `year-end/page.tsx`, `scores/page.tsx`, `onboarding/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `payroll/payroll.test.ts`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `[employeeId]/page.tsx`, `work/page.tsx`, `Notice`, `Badge`, `books/export/route.ts`, `lock-bar.tsx`, `requireOwner`, `ocr/run.ts`, `books/forms.tsx`, `payroll/data.ts`, `Card`, `theme-toggle.tsx`, `branches/page.tsx`, `site-document.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `collections/forms.tsx`, `notifications-view.tsx`, `ui.ts`, `ledger/books.ts`, `select.tsx`, `quote/page.tsx`, `profile.ts`, `manilaToday`, `social-button.tsx`, `tieouts.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `proposal-view.tsx`, `returns/load.ts`, `batch/register.ts`, `portalContext`, `toCentavos`, `parties/[id]/page.tsx`, `mime.ts`, `documents/[id]/page.tsx`, `fixed-assets/page.tsx`, `react`, `requests/actions.ts`, `move-bar.tsx`, `settings/actions.ts`, `register/page.tsx`, `server-only`, `ledger/data.ts`, `sign-off-actions.tsx`, `blocks.tsx`, `workpapers/page.tsx`, `package.json`, `app/documents/page.tsx`, `fixed-assets/forms.tsx`, `quote.ts`, `deadlines/actions.ts`, `approval-memo.tsx`, `formatAmount`, `filings/actions.ts`, `opengraph-image.tsx`, `public.ts`, `filings/[id]/page.tsx`, `app/settings/page.tsx`, `binder/page.tsx`, `[month]/page.tsx`, `books/reports/statements/page.tsx`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._