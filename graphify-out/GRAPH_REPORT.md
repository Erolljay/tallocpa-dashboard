# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1095 files · ~900,388 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6674 nodes · 23610 edges · 205 communities (186 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 224 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `770bc38b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- client
- migrate.yml
- ui.ts
- quote.ts
- package.json
- statement.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- percentage.ts
- Sign-in & Setup Docs
- Badge
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
- quote.ts
- returns/types.ts
- client-form.tsx
- payroll/payroll.test.ts
- modal.tsx
- steps.ts
- scripts
- portal/reports/statements/page.tsx
- ref_node_fs
- showDate
- webhook.ts
- leads/[id]/page.tsx
- marketing/page.tsx
- tax-codes.ts
- supabase/server.ts
- returns/types.ts
- steps.ts
- fields.ts
- arap.ts
- auth.ts
- next
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
- ledger/data.ts
- stat-cards.tsx
- LinkButton
- invoice-form.tsx
- workpapers/load.ts
- parties/[id]/page.tsx
- how-we-work/page.tsx
- Notice
- cx
- Pro components
- lib/books/actions.ts
- react
- portal/reports/page.tsx
- settings/actions.ts
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
- cwt-tracker-view.tsx
- Centavos
- Card
- combobox.tsx
- supabaseAdmin
- boardui
- access.ts
- auth-templates.ts
- deadlines/page.tsx
- manilaToday
- report-periods.ts
- transactions-actions.ts
- Opening balances: checklist for any cut-off
- bundle-tools.tsx
- portal/page.tsx
- ledger/data.ts
- [clientId]/page.tsx
- app/requests/[id]/page.tsx
- apply-migrations.sh
- marketing/attribution.ts
- sign-off.ts
- @remixicon/react
- tieouts.ts
- filed-returns.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- cwt-match.tsx
- clients/schema.ts
- business-switcher.tsx
- read.test.ts
- proof-actions.ts
- mime.ts
- filings/run.ts
- module-pages.tsx
- ocr/run.ts
- holiday-list.ts
- blocks.tsx
- supabaseServer
- ticked-allocation.test.ts
- contacts/forms.tsx
- approval-memo.tsx
- invoice-pages.tsx
- payroll/forms.tsx
- binder/page.tsx
- deadlines/page.tsx
- portal/requests/page.tsx
- portal/reports/cwt-2307/page.tsx
- server-only
- coa.test.ts
- Building UIs with BoardUI
- vitest
- formatAmount
- status.ts
- app/documents/page.tsx
- firm/parallel-run/page.tsx
- filings/[id]/page.tsx
- move-bar.tsx
- cycle/page.tsx
- eslint.config.mjs
- step-files.tsx
- ai-drafts-panel.tsx
- books-2307.test.ts
- Rework: one flow from lead to year-end
- calendar/staff.ts
- generate-qap-fixture.mjs
- pg
- terms.ts
- register/page.tsx
- opengraph-image.tsx
- ledger.test.ts
- accept-form.tsx
- ledger-lock.test.ts
- react
- catch-up.test.ts
- documents/cutoff.ts
- notification-bell.tsx
- acting-approver.test.ts
- documents/[id]/page.tsx
- documents/actions.ts
- db.test.ts
- lead-attribution.test.ts
- list-search.tsx
- telegram-uploads.test.ts
- app/settings/page.tsx
- onboarding/page.tsx
- rates.ts
- tests/proposal-email.test.ts
- parallel-run.test.ts
- formatAmount
- profile.ts
- site-document.tsx
- onboarding-officer/project-instructions.md
- react
- review/page.tsx
- review-form.tsx
- templates/README.md
- filings/actions.ts
- parallel-run.test.ts
- returns-sign-off.test.ts
- Morning brief
- contribution-remittances.test.ts
- ai-desks/README.md
- 7. The TalloCPA OS MCP server
- workpapers/page.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 426 edges
2. `cx` - 317 edges
3. `react` - 293 edges
4. `Notice()` - 285 edges
5. `Skeleton()` - 268 edges
6. `Button()` - 267 edges
7. `next` - 258 edges
8. `vitest` - 210 edges
9. `Card()` - 199 edges
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

## Communities (205 total, 19 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (54): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print() (+46 more)

### Community 1 - "client"
Cohesion: 0.05
Nodes (28): as(), client(), root, approved(), as(), root, approve(), as() (+20 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.09
Nodes (44): BooksContext, booksViewFor(), fmtMonth(), blankLine(), InvoiceForm(), MonthSelect(), BooksSummaryPage(), Summary() (+36 more)

### Community 4 - "quote.ts"
Cohesion: 0.06
Nodes (66): ClientValues, PriceRow, EngagementRow, corp, items, proposal(), TaxpayerType, TaxType (+58 more)

### Community 5 - "package.json"
Cohesion: 0.05
Nodes (47): eslintConfig, dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, pg@^8.23.1, react@19.3.0 (+39 more)

### Community 6 - "statement.ts"
Cohesion: 0.15
Nodes (17): credit(), ItemList(), PaymentsList(), proofMethod, VerifiedItems(), FirmBlock, AllocationRow, PaidItem (+9 more)

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

### Community 11 - "percentage.ts"
Cohesion: 0.08
Nodes (39): tinDashed(), alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell() (+31 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "Badge"
Cohesion: 0.09
Nodes (56): ClientList(), ClientsPage(), SORTS, STATUS_GROUPS, RemoveBusinessButton(), Contacts(), ContactsPage(), SORTS (+48 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.08
Nodes (42): EmployeeDetail(), EmployeePage(), file(), GET(), safe(), Payroll(), PayrollPage(), BOOKED_TYPES (+34 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (38): CASH_FLOW_CLASSES, defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section (+30 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (81): annualAttachments(), balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+73 more)

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
Cohesion: 0.09
Nodes (43): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary() (+35 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.07
Nodes (52): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+44 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (49): atcRows(), BookInvoiceRow, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC (+41 more)

### Community 43 - "quote.ts"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.06
Nodes (54): client, row(), incomePayment(), payslipCsv(), payslipSchedule(), agentBackground(), agentErrors(), atcSchedule() (+46 more)

### Community 45 - "client-form.tsx"
Cohesion: 0.09
Nodes (35): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), isSplittable(), MAX_BUNDLE_PAGES, ocrManySchema (+27 more)

### Community 46 - "payroll/payroll.test.ts"
Cohesion: 0.12
Nodes (30): monthlyTable(), monthlyWithholding(), DEFAULT_ITEMS, PayrollItem, employee(), entry(), fixtureContext(), ITEMS (+22 more)

### Community 47 - "modal.tsx"
Cohesion: 0.14
Nodes (20): globalSearch(), SearchHit, SearchKind, CommandSearch(), Icon, isMac(), KINDS, noop() (+12 more)

### Community 48 - "steps.ts"
Cohesion: 0.05
Nodes (85): ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openYearRenewalsAction(), PROOF_TYPES (+77 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "portal/reports/statements/page.tsx"
Cohesion: 0.07
Nodes (25): CounterColor, CounterProps, styles, StatusDot(), StatusDotColor, StatusDotProps, styles, Breadcrumb() (+17 more)

### Community 51 - "ref_node_fs"
Cohesion: 0.11
Nodes (25): QuerySource, InstantQuote, instantView(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeScheduleRow, num() (+17 more)

### Community 52 - "showDate"
Cohesion: 0.09
Nodes (63): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+55 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (42): TelegramApi, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF (+34 more)

### Community 54 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (35): NotesCard(), FunnelSwitch(), ProposalSent, bookedTime, LeadPage(), LeadTouch, Person, sentDate (+27 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.13
Nodes (28): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+20 more)

### Community 56 - "tax-codes.ts"
Cohesion: 0.12
Nodes (29): one(), Cwt2307TrackerPage(), Tracker(), ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff() (+21 more)

### Community 57 - "supabase/server.ts"
Cohesion: 0.09
Nodes (51): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+43 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.08
Nodes (51): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), Lines(), lineStyle, Problems(), sameFigures() (+43 more)

### Community 59 - "steps.ts"
Cohesion: 0.05
Nodes (67): RFC-7636, RFC-8414, maxDuration, POST(), copy(), allowAction(), check(), Checked (+59 more)

### Community 60 - "fields.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 61 - "arap.ts"
Cohesion: 0.15
Nodes (19): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+11 more)

### Community 62 - "auth.ts"
Cohesion: 0.09
Nodes (40): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+32 more)

### Community 63 - "next"
Cohesion: 0.27
Nodes (10): Detail(), PortalStatementDetail(), accessFor(), decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page() (+2 more)

### Community 64 - "[month]/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (32): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), CreateLinkForm(), N() (+24 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.08
Nodes (49): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+41 more)

### Community 68 - "testing.ts"
Cohesion: 0.13
Nodes (26): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+18 more)

### Community 69 - "notification.tsx"
Cohesion: 0.13
Nodes (32): PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), uploadRequestFile(), StandingUpload(), send() (+24 more)

### Community 70 - "returns/types.ts"
Cohesion: 0.07
Nodes (63): @supabase/supabase-js, buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+55 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (39): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+31 more)

### Community 72 - "fixed-assets/page.tsx"
Cohesion: 0.09
Nodes (42): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+34 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ledger/data.ts"
Cohesion: 0.13
Nodes (26): dayBefore(), GET(), safe(), Released, fromWorkbookData(), buildBookWorkbook(), accountFromRow(), Amendment (+18 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "LinkButton"
Cohesion: 0.21
Nodes (16): Batch(), BatchPage(), one(), toCentavos(), Print(), Print2307Page(), PrintAll(), PrintAll2316Page() (+8 more)

### Community 78 - "invoice-form.tsx"
Cohesion: 0.17
Nodes (17): PaymentsNewPage(), PaymentsEditPage(), ReceiptsNewPage(), ReceiptsEditPage(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+9 more)

### Community 79 - "workpapers/load.ts"
Cohesion: 0.12
Nodes (34): addStepFile(), removeStepFile(), startStepFileUpload(), CompleteButton(), StepBadge(), caseStatus, CertificateDetails, certificateLabel() (+26 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.11
Nodes (32): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName() (+24 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.11
Nodes (36): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+28 more)

### Community 82 - "Notice"
Cohesion: 0.21
Nodes (15): RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), fmtMonth(), frequencyLabel, PortalClosingNote() (+7 more)

### Community 83 - "cx"
Cohesion: 0.04
Nodes (81): react-dom@19.3.0, react-dom, LockState, DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock() (+73 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (23): decideUnlockAction(), lockMonthAction(), refresh(), requestLockAction(), requestUnlockAction(), run(), text(), CodeSource (+15 more)

### Community 86 - "react"
Cohesion: 0.08
Nodes (30): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+22 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (64): PortalClient, portalContext, Content(), PortalNotificationsPage(), Portal2316(), Portal2316Page(), Books(), PortalBooks() (+56 more)

### Community 88 - "settings/actions.ts"
Cohesion: 0.17
Nodes (18): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange() (+10 more)

### Community 89 - "@remixicon/react"
Cohesion: 0.06
Nodes (56): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links() (+48 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (23): Checkbox(), SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), ATTRIBUTION_KEY (+15 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.23
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "workpapers/page.tsx"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 94 - "work/page.tsx"
Cohesion: 0.12
Nodes (39): RequestDetail(), RequestPage(), Row, TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow (+31 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.16
Nodes (28): branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDigits(), tinHasBranch(), invoiceLabel() (+20 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "cwt-tracker-view.tsx"
Cohesion: 0.11
Nodes (24): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+16 more)

### Community 100 - "Centavos"
Cohesion: 0.08
Nodes (39): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+31 more)

### Community 101 - "Card"
Cohesion: 0.18
Nodes (18): maxDuration, POST(), Content(), NotificationSettingsPage(), TelegramLinkButton(), TelegramSwitch(), TelegramUnlinkButton(), AnchorButton() (+10 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.04
Nodes (98): react-aria-components, KIND_LABEL, MATCH_BADGE, peso(), ReadItem, SheetPreview(), switchBusinessAction(), BusinessSwitcher() (+90 more)

### Community 103 - "supabaseAdmin"
Cohesion: 0.08
Nodes (55): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), addDays(), dayLabel(), ERRORS (+47 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "access.ts"
Cohesion: 0.10
Nodes (28): Access, STATUS, CashFlowClass, codes, PNL, COA_TEMPLATES, Cutoff, cutoffOf() (+20 more)

### Community 106 - "auth-templates.ts"
Cohesion: 0.11
Nodes (24): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+16 more)

### Community 107 - "deadlines/page.tsx"
Cohesion: 0.13
Nodes (30): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+22 more)

### Community 108 - "manilaToday"
Cohesion: 0.13
Nodes (35): PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction() (+27 more)

### Community 109 - "report-periods.ts"
Cohesion: 0.06
Nodes (107): ClientForm(), StaffOptions(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm() (+99 more)

### Community 110 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "bundle-tools.tsx"
Cohesion: 0.24
Nodes (15): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+7 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (47): BooksChart(), compact, longMonth(), short(), shortMonth(), SentRow, StandingRow, TimelineRow (+39 more)

### Community 114 - "ledger/data.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.06
Nodes (82): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+74 more)

### Community 116 - "app/requests/[id]/page.tsx"
Cohesion: 0.24
Nodes (12): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+4 more)

### Community 118 - "marketing/attribution.ts"
Cohesion: 0.15
Nodes (32): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+24 more)

### Community 119 - "sign-off.ts"
Cohesion: 0.10
Nodes (22): PRICE_SECTIONS, priceSection(), PriceSectionKey, AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL (+14 more)

### Community 120 - "@remixicon/react"
Cohesion: 0.13
Nodes (25): GET(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams (+17 more)

### Community 121 - "tieouts.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 122 - "filed-returns.ts"
Cohesion: 0.20
Nodes (19): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), BellAudience (+11 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "cwt-match.tsx"
Cohesion: 0.17
Nodes (19): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+11 more)

### Community 126 - "clients/schema.ts"
Cohesion: 0.18
Nodes (20): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), RepostRegisterButton() (+12 more)

### Community 127 - "business-switcher.tsx"
Cohesion: 0.21
Nodes (19): ClientOption, pesos, StaffOption, TaskDefaults, askClientAction(), createTaskAction(), fieldErrors(), optionalDate (+11 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (73): RFC-4180, BirCategory, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+65 more)

### Community 129 - "proof-actions.ts"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 130 - "mime.ts"
Cohesion: 0.09
Nodes (51): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+43 more)

### Community 131 - "filings/run.ts"
Cohesion: 0.17
Nodes (17): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+9 more)

### Community 132 - "module-pages.tsx"
Cohesion: 0.09
Nodes (62): booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow, RowLink() (+54 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.07
Nodes (25): OcrManyOutput, OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL (+17 more)

### Community 134 - "holiday-list.ts"
Cohesion: 0.16
Nodes (16): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+8 more)

### Community 135 - "blocks.tsx"
Cohesion: 0.06
Nodes (89): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+81 more)

### Community 136 - "supabaseServer"
Cohesion: 0.06
Nodes (54): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setCatchUpAction() (+46 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.18
Nodes (17): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), expiryStatus(), formatTin() (+9 more)

### Community 138 - "contacts/forms.tsx"
Cohesion: 0.21
Nodes (13): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor() (+5 more)

### Community 139 - "approval-memo.tsx"
Cohesion: 0.21
Nodes (10): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, c(), loadPeriodFile(), monthEnd() (+2 more)

### Community 140 - "invoice-pages.tsx"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (58): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+50 more)

### Community 142 - "binder/page.tsx"
Cohesion: 0.39
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, SIGNED_REFS

### Community 143 - "deadlines/page.tsx"
Cohesion: 0.08
Nodes (44): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+36 more)

### Community 144 - "portal/requests/page.tsx"
Cohesion: 0.10
Nodes (36): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+28 more)

### Community 145 - "portal/reports/cwt-2307/page.tsx"
Cohesion: 0.17
Nodes (8): How you work, When the Owner asks something else, Your job, Before you start (TalloCPA OS), Check it, Chief of Staff's desk, Set up the desk (Cowork, once), Scheduled task: morning brief

### Community 146 - "server-only"
Cohesion: 0.09
Nodes (53): server-only, GET(), GET(), GET(), MonthComplete(), runActingDigest(), closeCycleAction(), confirmMonthAction() (+45 more)

### Community 147 - "coa.test.ts"
Cohesion: 0.07
Nodes (33): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookLine, ColumnarRow, JournalRow (+25 more)

### Community 148 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 149 - "vitest"
Cohesion: 0.02
Nodes (55): pg, vitest, poolConfig(), ctx, input, root, root, root (+47 more)

### Community 150 - "formatAmount"
Cohesion: 0.06
Nodes (52): zod, DRAFT_KIND_LABELS, DraftLine, NewDraft, saveDraft(), clientRef, findClient(), getClient (+44 more)

### Community 151 - "status.ts"
Cohesion: 0.17
Nodes (9): How you work, Your job, Before you start (TalloCPA OS), Check it, Document Clerk's desk, Set up the desk (Cowork, once), Review queue, Rules (+1 more)

### Community 152 - "app/documents/page.tsx"
Cohesion: 0.09
Nodes (39): ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths(), Documents() (+31 more)

### Community 153 - "firm/parallel-run/page.tsx"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 154 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (58): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus, Event (+50 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.14
Nodes (24): ApprovedReview(), ApprovedRow, BulkState, Booking, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction() (+16 more)

### Community 156 - "cycle/page.tsx"
Cohesion: 0.18
Nodes (19): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CycleRow, EXCEPTION_DECISIONS, ExceptionDecision (+11 more)

### Community 157 - "eslint.config.mjs"
Cohesion: 0.07
Nodes (64): RFC-2606, addWorkforceAction(), AiState, assignClientAction(), createAiLogin(), createKeyAction(), disconnectAppAction(), fieldErrors() (+56 more)

### Community 158 - "step-files.tsx"
Cohesion: 0.14
Nodes (24): POST(), errors, Form(), LoginPage(), notices, ACTIVITY, IdleWatcher(), readCookie() (+16 more)

### Community 159 - "ai-drafts-panel.tsx"
Cohesion: 0.27
Nodes (12): metadata, Shared(), SharedStatementPage(), Billing(), PortalBilling(), statementHref(), StatementView(), statusBadge (+4 more)

### Community 160 - "books-2307.test.ts"
Cohesion: 0.02
Nodes (54): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+46 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.22
Nodes (15): cancelMeetingAction(), cancelMyMeetingAction(), CancelState, calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail() (+7 more)

### Community 163 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 164 - "pg"
Cohesion: 0.15
Nodes (7): outDir, pkgDir, require, { version }, as(), root, signIn()

### Community 165 - "terms.ts"
Cohesion: 0.04
Nodes (59): hashKey(), isKeyShaped(), keyMatches(), asAi(), borrow(), callsToday(), denied(), findCaller() (+51 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 169 - "accept-form.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 170 - "ledger-lock.test.ts"
Cohesion: 0.21
Nodes (13): ProposalSetup, JOB_GROUPS, JobBand, JobGroup, jobGroupOf(), JobOption, jobOptions(), ProposalQuote (+5 more)

### Community 171 - "react"
Cohesion: 0.23
Nodes (12): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+4 more)

### Community 172 - "catch-up.test.ts"
Cohesion: 0.15
Nodes (20): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+12 more)

### Community 173 - "documents/cutoff.ts"
Cohesion: 0.35
Nodes (11): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), headerKey() (+3 more)

### Community 174 - "notification-bell.tsx"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "documents/[id]/page.tsx"
Cohesion: 0.12
Nodes (29): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+21 more)

### Community 177 - "documents/actions.ts"
Cohesion: 0.14
Nodes (23): one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), AttachBatchImage(), attach(), DocumentUpload() (+15 more)

### Community 178 - "db.test.ts"
Cohesion: 0.22
Nodes (7): RegisterRow, approved(), as(), root, as(), bookedDoc(), root

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 180 - "list-search.tsx"
Cohesion: 0.46
Nodes (7): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings()

### Community 181 - "telegram-uploads.test.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 182 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (34): appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage(), accountSchema (+26 more)

### Community 183 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (32): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+24 more)

### Community 184 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+11 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.60
Nodes (4): Detail(), PayNow(), SignInToUpload(), PayAccount

### Community 188 - "parallel-run.test.ts"
Cohesion: 0.05
Nodes (60): nextConfig, next, EditClient(), EditClientPage(), addClientNoteAction(), NoteState, postPayrollAction(), PostState (+52 more)

### Community 189 - "formatAmount"
Cohesion: 0.20
Nodes (15): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+7 more)

### Community 192 - "profile.ts"
Cohesion: 0.12
Nodes (21): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+13 more)

### Community 193 - "site-document.tsx"
Cohesion: 0.16
Nodes (12): GlobalNotFound(), metadata, metadata, SiteLayout(), SiteNotFound(), geist, geistMono, montserrat (+4 more)

### Community 197 - "onboarding-officer/project-instructions.md"
Cohesion: 0.22
Nodes (6): Onboard a client, Rules, Steps, How you work, Never, Your job

### Community 198 - "react"
Cohesion: 0.07
Nodes (40): react, Accounts(), AccountsPage(), GROUPS, BankAccountsRoute(), CustomersRoute(), InvoiceFormValue, NewEntry() (+32 more)

### Community 199 - "review/page.tsx"
Cohesion: 0.26
Nodes (14): EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge, activeFor(), Appointment, appointmentRow() (+6 more)

### Community 200 - "review-form.tsx"
Cohesion: 0.06
Nodes (57): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DirectoryParty, ENTRY_STATUS (+49 more)

### Community 210 - "filings/actions.ts"
Cohesion: 0.19
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+9 more)

### Community 211 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 212 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 213 - "Morning brief"
Cohesion: 0.50
Nodes (4): Format, Morning brief, Rules, Steps

### Community 214 - "contribution-remittances.test.ts"
Cohesion: 0.50
Nodes (4): Before you start (TalloCPA OS), Check it, Onboarding Officer's desk, Set up the desk (Cowork, once)

### Community 218 - "7. The TalloCPA OS MCP server"
Cohesion: 0.50
Nodes (4): 7.1 Parts, 7.2 Tools, 7.3 New features and the MCP, 7. The TalloCPA OS MCP server

### Community 223 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

## Knowledge Gaps
- **31 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1805 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `client`, `ui.ts`, `quote.ts`, `package.json`, `percentage.ts`, `Badge`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `returns/types.ts`, `client-form.tsx`, `payroll/payroll.test.ts`, `steps.ts`, `ref_node_fs`, `showDate`, `webhook.ts`, `leads/[id]/page.tsx`, `marketing/page.tsx`, `returns/types.ts`, `steps.ts`, `fields.ts`, `arap.ts`, `[month]/page.tsx`, `engine.ts`, `testing.ts`, `notification.tsx`, `returns/types.ts`, `fixed-assets/page.tsx`, `workpapers/load.ts`, `portal/reports/page.tsx`, `@remixicon/react`, `document-scanner.tsx`, `intake-picker.tsx`, `work/page.tsx`, `cwt-tracker-view.tsx`, `Centavos`, `supabaseAdmin`, `access.ts`, `auth-templates.ts`, `deadlines/page.tsx`, `portal/page.tsx`, `ledger/data.ts`, `[clientId]/page.tsx`, `app/requests/[id]/page.tsx`, `marketing/attribution.ts`, `sign-off.ts`, `tieouts.ts`, `batch/register.ts`, `read.test.ts`, `mime.ts`, `filings/run.ts`, `ocr/run.ts`, `holiday-list.ts`, `blocks.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `approval-memo.tsx`, `invoice-pages.tsx`, `deadlines/page.tsx`, `portal/requests/page.tsx`, `server-only`, `coa.test.ts`, `formatAmount`, `app/documents/page.tsx`, `firm/parallel-run/page.tsx`, `filings/[id]/page.tsx`, `move-bar.tsx`, `cycle/page.tsx`, `eslint.config.mjs`, `step-files.tsx`, `books-2307.test.ts`, `calendar/staff.ts`, `pg`, `terms.ts`, `register/page.tsx`, `ledger.test.ts`, `catch-up.test.ts`, `acting-approver.test.ts`, `db.test.ts`, `lead-attribution.test.ts`, `telegram-uploads.test.ts`, `app/settings/page.tsx`, `onboarding/page.tsx`, `rates.ts`, `notifications.test.ts`, `parallel-run.test.ts`, `review/page.tsx`, `review-form.tsx`, `filings/actions.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07989464442493416 - nodes in this community are weakly interconnected._
- **Why does `next` connect `parallel-run.test.ts` to `form-2307.ts`, `ui.ts`, `package.json`, `statement.ts`, `Badge`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `quote.ts`, `client-form.tsx`, `modal.tsx`, `steps.ts`, `portal/reports/statements/page.tsx`, `showDate`, `leads/[id]/page.tsx`, `marketing/page.tsx`, `tax-codes.ts`, `supabase/server.ts`, `returns/types.ts`, `steps.ts`, `auth.ts`, `next`, `[month]/page.tsx`, `marketing/page.tsx`, `notification.tsx`, `returns/types.ts`, `books/forms.tsx`, `fixed-assets/page.tsx`, `ledger/data.ts`, `LinkButton`, `invoice-form.tsx`, `workpapers/load.ts`, `parties/[id]/page.tsx`, `Notice`, `lib/books/actions.ts`, `react`, `portal/reports/page.tsx`, `settings/actions.ts`, `@remixicon/react`, `intake-picker.tsx`, `form-2316.tsx`, `work/page.tsx`, `cwt-tracker-view.tsx`, `Centavos`, `Card`, `combobox.tsx`, `supabaseAdmin`, `access.ts`, `deadlines/page.tsx`, `manilaToday`, `report-periods.ts`, `transactions-actions.ts`, `bundle-tools.tsx`, `portal/page.tsx`, `[clientId]/page.tsx`, `marketing/attribution.ts`, `@remixicon/react`, `filed-returns.ts`, `batch/register.ts`, `cwt-match.tsx`, `clients/schema.ts`, `business-switcher.tsx`, `proof-actions.ts`, `mime.ts`, `module-pages.tsx`, `blocks.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `approval-memo.tsx`, `payroll/forms.tsx`, `binder/page.tsx`, `deadlines/page.tsx`, `portal/requests/page.tsx`, `server-only`, `app/documents/page.tsx`, `filings/[id]/page.tsx`, `move-bar.tsx`, `cycle/page.tsx`, `eslint.config.mjs`, `step-files.tsx`, `ai-drafts-panel.tsx`, `calendar/staff.ts`, `register/page.tsx`, `opengraph-image.tsx`, `react`, `documents/cutoff.ts`, `documents/[id]/page.tsx`, `documents/actions.ts`, `list-search.tsx`, `app/settings/page.tsx`, `onboarding/page.tsx`, `formatAmount`, `site-document.tsx`, `react`, `review/page.tsx`, `review-form.tsx`, `filings/actions.ts`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.045718432510885344 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `quote.ts`, `package.json`, `Badge`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `quote.ts`, `modal.tsx`, `steps.ts`, `portal/reports/statements/page.tsx`, `showDate`, `leads/[id]/page.tsx`, `marketing/page.tsx`, `tax-codes.ts`, `supabase/server.ts`, `returns/types.ts`, `steps.ts`, `auth.ts`, `next`, `[month]/page.tsx`, `marketing/page.tsx`, `notification.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `stat-cards.tsx`, `LinkButton`, `invoice-form.tsx`, `workpapers/load.ts`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `Notice`, `cx`, `react`, `portal/reports/page.tsx`, `settings/actions.ts`, `@remixicon/react`, `document-scanner.tsx`, `intake-picker.tsx`, `work/page.tsx`, `cwt-tracker-view.tsx`, `Centavos`, `Card`, `combobox.tsx`, `supabaseAdmin`, `deadlines/page.tsx`, `manilaToday`, `report-periods.ts`, `bundle-tools.tsx`, `portal/page.tsx`, `[clientId]/page.tsx`, `@remixicon/react`, `filed-returns.ts`, `batch/register.ts`, `cwt-match.tsx`, `clients/schema.ts`, `business-switcher.tsx`, `proof-actions.ts`, `mime.ts`, `module-pages.tsx`, `blocks.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `contacts/forms.tsx`, `payroll/forms.tsx`, `binder/page.tsx`, `deadlines/page.tsx`, `portal/requests/page.tsx`, `app/documents/page.tsx`, `filings/[id]/page.tsx`, `move-bar.tsx`, `cycle/page.tsx`, `eslint.config.mjs`, `step-files.tsx`, `ai-drafts-panel.tsx`, `register/page.tsx`, `accept-form.tsx`, `react`, `notification-bell.tsx`, `documents/[id]/page.tsx`, `documents/actions.ts`, `list-search.tsx`, `app/settings/page.tsx`, `onboarding/page.tsx`, `tests/proposal-email.test.ts`, `parallel-run.test.ts`, `formatAmount`, `site-document.tsx`, `review/page.tsx`, `review-form.tsx`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._