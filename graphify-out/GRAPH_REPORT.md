# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 900 files · ~717,132 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5577 nodes · 19502 edges · 190 communities (172 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 174 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `4dd9687e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- marketing/attribution.ts
- package.json
- engine.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
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
- ledger/data.ts
- scores/page.tsx
- compare.ts
- payroll/types.ts
- filings/actions.ts
- returns-sign-off.test.ts
- items.ts
- modal.tsx
- deadlines/page.tsx
- scripts
- supabaseAdmin
- quote/page.tsx
- returns/types.ts
- documents/labels.ts
- module-pages.tsx
- marketing/page.tsx
- payroll/data.ts
- registrations/forms.tsx
- money.ts
- Notice
- blocks.tsx
- arap.ts
- morning.ts
- year-end/page.tsx
- combobox.tsx
- settlement-pages.tsx
- Apple Design
- supabaseServer
- form-1601c.ts
- clients/[id]/page.tsx
- lib/books/actions.ts
- books/forms.tsx
- form-1601c.ts
- Rules
- Animation Performance
- firm/parallel-run/page.tsx
- stat-cards.tsx
- month-complete.tsx
- theme-toggle.tsx
- vitest
- [clientId]/page.tsx
- how-we-work/page.tsx
- settings/actions.ts
- source.ts
- Pro components
- steps.ts
- tools/page.tsx
- portal/reports/statements/page.tsx
- portal-billing.test.ts
- Centavos
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- calendar/staff.ts
- Recipes
- notifications-view.tsx
- BoardUI page patterns
- Pro templates
- review-form.tsx
- ledger/books.ts
- filings/run.ts
- cx
- cycle/page.tsx
- boardui
- registrations/[id]/page.tsx
- brand/page.tsx
- showDate
- fields.ts
- supabaseServer
- ref_node_fs
- Opening balances: checklist for any cut-off
- cycle/actions.ts
- Card
- transactions-actions.ts
- [clientId]/page.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- vat.ts
- proposal-view.tsx
- returns/load.ts
- addDays
- layout.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- toCentavos
- books/reports/2307/page.tsx
- read.test.ts
- opening.ts
- mime.ts
- invoice-pages.tsx
- cx
- gemini.ts
- fixed-assets/page.tsx
- site-document.tsx
- react
- ticked-allocation.test.ts
- portal/reports/page.tsx
- getIdentity
- idle-watcher.tsx
- rates.ts
- notes.ts
- bulk-actions.ts
- parties/actions.ts
- parts.ts
- server-only
- ledger/types.ts
- returns/books.test.ts
- filings/[id]/page.tsx
- (site)/page.tsx
- payroll/export/route.ts
- safeguards.ts
- workpapers/page.tsx
- report-periods.ts
- app/documents/page.tsx
- profile.ts
- template.ts
- review-queue.ts
- Badge
- batch/forms.tsx
- Rework: one flow from lead to year-end
- calendar/staff.ts
- chrome.tsx
- filings/actions.ts
- formatAmount
- brand/actions.ts
- next
- lead-attribution.test.ts
- bir-filing-calendar/page.tsx
- SourceDocument
- draft.ts
- app/settings/page.tsx
- profile.ts
- registrations/[id]/page.tsx
- acting-approver.test.ts
- payment-forms.tsx
- match.ts
- batch/load.ts
- documents/actions.ts
- worksheet/page.tsx
- payroll/forms.tsx
- payments-list.tsx
- deadlines/actions.ts
- people/schema.ts
- digest.ts
- names.ts
- documents/period.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 315 edges
2. `cx` - 289 edges
3. `react` - 256 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 235 edges
6. `next` - 211 edges
7. `Button()` - 207 edges
8. `Card()` - 167 edges
9. `vitest` - 167 edges
10. `Badge()` - 165 edges

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

## Communities (190 total, 18 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (48): BooksContext, booksViewFor(), one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff() (+40 more)

### Community 1 - "index.ts"
Cohesion: 0.03
Nodes (56): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+48 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.10
Nodes (39): fmtMonth(), BooksLockBar(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate(), lastMonth() (+31 more)

### Community 4 - "marketing/attribution.ts"
Cohesion: 0.08
Nodes (42): COMPLEXITY_LABEL, Lines(), Preview(), QuoteView(), TAXPAYER_LABEL, Total(), complexity(), count() (+34 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "engine.ts"
Cohesion: 0.12
Nodes (29): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+21 more)

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

### Community 11 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (86): GET(), Bell(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus() (+78 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx.ts"
Cohesion: 0.05
Nodes (47): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, StatusDot(), StatusDotColor (+39 more)

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

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (41): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), statementsFrom(), FsLineKey, Section (+33 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (51): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+43 more)

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

### Community 40 - "ledger/data.ts"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (32): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+24 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (72): ParallelRun(), ParallelRunPage(), quarterMonths(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Atcs() (+64 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "filings/actions.ts"
Cohesion: 0.06
Nodes (45): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links() (+37 more)

### Community 45 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 46 - "items.ts"
Cohesion: 0.09
Nodes (49): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+41 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (38): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+30 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.13
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+21 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.12
Nodes (31): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+23 more)

### Community 51 - "quote/page.tsx"
Cohesion: 0.10
Nodes (47): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+39 more)

### Community 52 - "returns/types.ts"
Cohesion: 0.10
Nodes (40): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+32 more)

### Community 53 - "documents/labels.ts"
Cohesion: 0.13
Nodes (34): GET(), Link, pageAttribution(), requestQuoteAction(), SERVICES, StartState, php, Thanks() (+26 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.12
Nodes (37): BankAccountsRoute(), booksContext(), fmtDate(), BooksFrame(), BooksList(), Column, ListRow, RowLink() (+29 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.12
Nodes (25): archiveLinkAction(), ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+17 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.12
Nodes (33): EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), Form2316Signatory, paidInYear(), Payroll2316Raw, loadEntries() (+25 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.10
Nodes (37): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+29 more)

### Community 58 - "money.ts"
Cohesion: 0.07
Nodes (55): client, row(), VatData, payslipSchedule(), agentBackground(), agentErrors(), tinDashed(), atcSchedule() (+47 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (65): ClientForm(), BatchUpload(), PreviewTable(), AmendmentRequestForm(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), ReleaseReportForm() (+57 more)

### Community 60 - "blocks.tsx"
Cohesion: 0.11
Nodes (40): AboutPage(), BirCalendarPage(), BRING, ContactList(), ContactPage(), metadata, FaqPage(), metadata (+32 more)

### Community 61 - "arap.ts"
Cohesion: 0.08
Nodes (40): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+32 more)

### Community 62 - "morning.ts"
Cohesion: 0.19
Nodes (13): cycleMessage(), dayFmt, NoticeKind, showDay(), Due, Email, line(), longDay() (+5 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.17
Nodes (21): ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months(), one() (+13 more)

### Community 64 - "combobox.tsx"
Cohesion: 0.24
Nodes (10): portalContext(), decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row, Portal2316() (+2 more)

### Community 65 - "settlement-pages.tsx"
Cohesion: 0.09
Nodes (34): PaymentsNewPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), ReceiptsViewPage(), fmt(), OpenInvoice (+26 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "supabaseServer"
Cohesion: 0.05
Nodes (75): zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+67 more)

### Community 68 - "form-1601c.ts"
Cohesion: 0.13
Nodes (20): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+12 more)

### Community 69 - "clients/[id]/page.tsx"
Cohesion: 0.14
Nodes (25): FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm(), IncomeTaxMethodForm() (+17 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.09
Nodes (30): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), Returns(), UnlockRequests(), when(), AmendmentFlag (+22 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.11
Nodes (52): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+44 more)

### Community 72 - "form-1601c.ts"
Cohesion: 0.05
Nodes (72): GridRow, AlphaCols, AlphalistRow, form2316(), Form2316Data, Form2316Employer, Form2316Line, mmdd() (+64 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "firm/parallel-run/page.tsx"
Cohesion: 0.14
Nodes (11): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, WITHHOLDING_FORMS (+3 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "month-complete.tsx"
Cohesion: 0.12
Nodes (22): MonthComplete(), SentRow, TimelineRow, manilaDay(), MonthCard(), shortDay(), confirmMonthAction(), CycleState (+14 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (35): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+27 more)

### Community 79 - "vitest"
Cohesion: 0.11
Nodes (32): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+24 more)

### Community 80 - "[clientId]/page.tsx"
Cohesion: 0.17
Nodes (17): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+9 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.17
Nodes (28): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+20 more)

### Community 82 - "settings/actions.ts"
Cohesion: 0.20
Nodes (14): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+6 more)

### Community 83 - "source.ts"
Cohesion: 0.12
Nodes (29): sawtBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind (+21 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "steps.ts"
Cohesion: 0.10
Nodes (26): Agency, birForm(), BranchOptions, CaseStep, ClosureOptions, dayNumber(), daysBetween(), daysOpen() (+18 more)

### Community 86 - "tools/page.tsx"
Cohesion: 0.17
Nodes (22): AmendmentDecision(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload(), PermitForm() (+14 more)

### Community 87 - "portal/reports/statements/page.tsx"
Cohesion: 0.17
Nodes (24): PortalClient, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), ParamSelect(), emptyClass, linkClass (+16 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "Centavos"
Cohesion: 0.18
Nodes (13): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, ReviewNote, approvalMemo(), Memo (+5 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (24): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+16 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.18
Nodes (28): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+20 more)

### Community 94 - "calendar/staff.ts"
Cohesion: 0.20
Nodes (20): RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail(), PortalRequests() (+12 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "notifications-view.tsx"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.12
Nodes (31): blankLine(), InvoiceForm(), InvoiceFormValue, Booking, BookingFields(), DirectoryParty, ENTRY_STATUS, ONLY_FOR (+23 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+39 more)

### Community 101 - "filings/run.ts"
Cohesion: 0.10
Nodes (38): compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, EfpsGroup, FilingChannel, FilingInstance, fiscalYearOf() (+30 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (83): react-aria-components, SheetPreview(), CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, animateTag() (+75 more)

### Community 103 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (28): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+20 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "registrations/[id]/page.tsx"
Cohesion: 0.17
Nodes (25): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+17 more)

### Community 106 - "brand/page.tsx"
Cohesion: 0.14
Nodes (21): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), daysBetween(), expiryStatus() (+13 more)

### Community 107 - "showDate"
Cohesion: 0.08
Nodes (35): FilingRow, bookKind, BookRow, bookStatus, Event, eventText, FilingFile, FilingPage() (+27 more)

### Community 108 - "fields.ts"
Cohesion: 0.11
Nodes (24): BatchRow, ACCOUNT_SOURCES, Readiness, checkFields(), Issue, num(), msgs(), ok (+16 more)

### Community 109 - "supabaseServer"
Cohesion: 0.10
Nodes (28): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+20 more)

### Community 110 - "ref_node_fs"
Cohesion: 0.02
Nodes (38): pg, dir, readme, templates, ctx, input, root, root (+30 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "cycle/actions.ts"
Cohesion: 0.17
Nodes (19): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+11 more)

### Community 113 - "Card"
Cohesion: 0.12
Nodes (31): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+23 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.27
Nodes (16): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+8 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.07
Nodes (65): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+57 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.20
Nodes (16): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+8 more)

### Community 118 - "vat.ts"
Cohesion: 0.12
Nodes (54): costsOf(), salesOf(), compute(), inputsFor(), buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments() (+46 more)

### Community 119 - "proposal-view.tsx"
Cohesion: 0.06
Nodes (69): PriceRow, EngagementRow, corp, items, proposal(), TaxpayerType, EstimatedProfile, estimateProfile() (+61 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.08
Nodes (41): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), LOCKED_STATUSES, DatFiles, datFiles(), Db (+33 more)

### Community 121 - "addDays"
Cohesion: 0.06
Nodes (56): ClientValues, Action(), MyWork(), MyWorkPage(), short(), TONE, TAX_TYPES, TaxType (+48 more)

### Community 122 - "layout.ts"
Cohesion: 0.14
Nodes (22): afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape(), Spec, SPECS, dir (+14 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.14
Nodes (16): BATCH_COLUMNS, BATCH_KINDS, BatchCheck, BatchColumn, centavosOf(), checkRow(), findAccount(), isoDate() (+8 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.16
Nodes (22): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail(), PayNow(), PaymentsList() (+14 more)

### Community 126 - "toCentavos"
Cohesion: 0.11
Nodes (31): AGENCIES, Db, LOANS, p(), Run, applyColumnsAction(), done(), payrollDocument() (+23 more)

### Community 127 - "books/reports/2307/page.tsx"
Cohesion: 0.10
Nodes (38): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList(), Row (+30 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (73): RFC-4180, geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES (+65 more)

### Community 129 - "opening.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 130 - "mime.ts"
Cohesion: 0.10
Nodes (47): RFC-2047, RFC-2822, Filing(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+39 more)

### Community 131 - "invoice-pages.tsx"
Cohesion: 0.13
Nodes (20): SearchParams, INVOICE_KINDS, InvoiceEdit(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage() (+12 more)

### Community 132 - "cx"
Cohesion: 0.06
Nodes (49): NotificationFilterTabs(), NotificationRowData, Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes (+41 more)

### Community 133 - "gemini.ts"
Cohesion: 0.09
Nodes (27): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+19 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+18 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.11
Nodes (17): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+9 more)

### Community 136 - "react"
Cohesion: 0.06
Nodes (60): react, Batch(), BatchPage(), one(), toCentavos(), CustomersRoute(), NewEntry(), NewEntryPage() (+52 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "portal/reports/page.tsx"
Cohesion: 0.17
Nodes (21): BooksSection(), NavRow(), PortalReports(), Released, Reports(), Section(), Statements(), when() (+13 more)

### Community 139 - "getIdentity"
Cohesion: 0.18
Nodes (21): ReplyForm(), send(), METHODS, ProofUpload(), send(), getIdentity, ProofState, startProofUpload() (+13 more)

### Community 140 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 141 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 142 - "notes.ts"
Cohesion: 0.16
Nodes (17): addClientNoteAction(), NoteState, NotesCard(), ClientNoteForm(), ICON, NotesTimeline(), when, inquiryAnswers() (+9 more)

### Community 143 - "bulk-actions.ts"
Cohesion: 0.15
Nodes (18): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), DocumentCodes (+10 more)

### Community 144 - "parties/actions.ts"
Cohesion: 0.19
Nodes (18): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), normalizeTin(), lookupParties() (+10 more)

### Community 145 - "parts.ts"
Cohesion: 0.11
Nodes (23): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, isBalanced() (+15 more)

### Community 146 - "server-only"
Cohesion: 0.14
Nodes (31): server-only, @supabase/supabase-js, GET(), GET(), GET(), GET(), runActingDigest(), tellPreparer() (+23 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.12
Nodes (24): Access, STATUS, Row, Asset, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES (+16 more)

### Community 148 - "returns/books.test.ts"
Cohesion: 0.39
Nodes (7): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList()

### Community 149 - "filings/[id]/page.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 150 - "(site)/page.tsx"
Cohesion: 0.09
Nodes (37): robots(), HOW, metadata, FLOW_ICONS, GROUP_SPAN, metadata, metadata, sitemap() (+29 more)

### Community 151 - "payroll/export/route.ts"
Cohesion: 0.26
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+3 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 154 - "report-periods.ts"
Cohesion: 0.26
Nodes (16): basePeriod(), HeldNote(), holdsWhat(), periodTitle(), BooksYear, booksYears(), iso(), lockedMonths() (+8 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.09
Nodes (42): ApprovedReview(), ApprovedRow, ClientSelect(), DocumentReviewPage(), loadBooking(), Review(), moveSelectedAction(), MoveState (+34 more)

### Community 156 - "profile.ts"
Cohesion: 0.14
Nodes (18): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), Expiry, ExpiryTone (+10 more)

### Community 157 - "template.ts"
Cohesion: 0.09
Nodes (28): jobName(), lineName(), longDate(), money(), php, ProposalView(), Rows(), Section() (+20 more)

### Community 158 - "review-queue.ts"
Cohesion: 0.10
Nodes (27): FunnelSwitch(), bookedTime, LeadPage(), LeadSource(), LeadTouch, Person, day(), Leads() (+19 more)

### Community 159 - "Badge"
Cohesion: 0.09
Nodes (41): FilingListRow, FilingTable(), DeadlinesPage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs() (+33 more)

### Community 160 - "batch/forms.tsx"
Cohesion: 0.22
Nodes (15): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), accountLabel(), BatchKind, checkBatch() (+7 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (39): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), buttonClass(), Interval (+31 more)

### Community 163 - "chrome.tsx"
Cohesion: 0.14
Nodes (22): metadata, Proposal(), ProposalPage(), metadata, QuotesClosed(), Start(), StartPage(), Lockup() (+14 more)

### Community 164 - "filings/actions.ts"
Cohesion: 0.19
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+9 more)

### Community 165 - "formatAmount"
Cohesion: 0.22
Nodes (14): Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set(), padded(), PartyFields() (+6 more)

### Community 166 - "brand/actions.ts"
Cohesion: 0.19
Nodes (14): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+6 more)

### Community 167 - "next"
Cohesion: 0.11
Nodes (14): nextConfig, next, alt, contentType, Image(), montserrat(), size, postPayrollAction() (+6 more)

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.09
Nodes (13): outDir, pkgDir, require, { version }, api, ctx, fn, rows (+5 more)

### Community 169 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (9): metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn(), GROUPS (+1 more)

### Community 170 - "SourceDocument"
Cohesion: 0.15
Nodes (8): SaleSplit, SawtResult, Split, client, YEAR, ListedDocument, EwtQuarter, SourceDocument

### Community 171 - "draft.ts"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.22
Nodes (16): appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote(), Rule, SettingsPage(), describeDue() (+8 more)

### Community 173 - "profile.ts"
Cohesion: 0.20
Nodes (24): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+16 more)

### Community 174 - "registrations/[id]/page.tsx"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "payment-forms.tsx"
Cohesion: 0.38
Nodes (10): PaymentSettings(), AddPaymentAccountForm(), ChannelFields(), ChannelValues, EditPaymentAccountForm(), MoveAccountButtons(), PaymentDaysForm(), ReplaceQrForm() (+2 more)

### Community 177 - "match.ts"
Cohesion: 0.29
Nodes (10): digits(), editDistance(), EmployeeMatch, keyNo(), matchEmployee(), MatchStatus, nameScore(), nameWords() (+2 more)

### Community 178 - "batch/load.ts"
Cohesion: 0.33
Nodes (8): GET(), safe(), loadAccounts(), loadBatchContext(), monthsBetween(), BatchAccount, BatchContext, dupKey()

### Community 179 - "documents/actions.ts"
Cohesion: 0.33
Nodes (6): ALLOWED, DocActionState, replyDocumentAction(), reviewDocumentAction(), runOcrAction(), StartUpload

### Community 180 - "worksheet/page.tsx"
Cohesion: 0.38
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 181 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (45): saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), PayrollRuns() (+37 more)

### Community 182 - "payments-list.tsx"
Cohesion: 0.28
Nodes (8): credit(), ItemList(), proofMethod, VerifiedItems(), PaidItem, OpenStatementItem, PaymentProof, PROOF_STATUS

### Community 183 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 184 - "people/schema.ts"
Cohesion: 0.39
Nodes (6): clientUserSchema, email, inviteStaffSchema, loadPoints(), name, updateStaffSchema

### Community 185 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 186 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 187 - "documents/period.ts"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1477 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `form-1601c.ts` to `form-2307.ts`, `index.ts`, `ui.ts`, `marketing/attribution.ts`, `package.json`, `engine.ts`, `notification-bell.tsx`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `returns-sign-off.test.ts`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `returns/types.ts`, `documents/labels.ts`, `payroll/data.ts`, `money.ts`, `arap.ts`, `morning.ts`, `year-end/page.tsx`, `supabaseServer`, `clients/[id]/page.tsx`, `lib/books/actions.ts`, `form-1601c.ts`, `month-complete.tsx`, `theme-toggle.tsx`, `[clientId]/page.tsx`, `settings/actions.ts`, `source.ts`, `steps.ts`, `portal-billing.test.ts`, `Centavos`, `document-scanner.tsx`, `intake-picker.tsx`, `calendar/staff.ts`, `ledger/books.ts`, `filings/run.ts`, `cycle/page.tsx`, `brand/page.tsx`, `showDate`, `fields.ts`, `supabaseServer`, `ref_node_fs`, `Card`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `addDays`, `layout.ts`, `batch/register.ts`, `toCentavos`, `books/reports/2307/page.tsx`, `read.test.ts`, `opening.ts`, `mime.ts`, `invoice-pages.tsx`, `gemini.ts`, `fixed-assets/page.tsx`, `ticked-allocation.test.ts`, `portal/reports/page.tsx`, `idle-watcher.tsx`, `rates.ts`, `notes.ts`, `bulk-actions.ts`, `parts.ts`, `server-only`, `ledger/types.ts`, `(site)/page.tsx`, `payroll/export/route.ts`, `safeguards.ts`, `report-periods.ts`, `app/documents/page.tsx`, `review-queue.ts`, `Badge`, `calendar/staff.ts`, `filings/actions.ts`, `formatAmount`, `lead-attribution.test.ts`, `bir-filing-calendar/page.tsx`, `SourceDocument`, `app/settings/page.tsx`, `registrations/[id]/page.tsx`, `acting-approver.test.ts`, `people/schema.ts`, `digest.ts`, `names.ts`, `documents/period.ts`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09234972677595628 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `marketing/attribution.ts`, `package.json`, `engine.ts`, `notification-bell.tsx`, `cx.ts`, `dependencies`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `filings/actions.ts`, `items.ts`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `Notice`, `blocks.tsx`, `year-end/page.tsx`, `combobox.tsx`, `settlement-pages.tsx`, `supabaseServer`, `clients/[id]/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `stat-cards.tsx`, `month-complete.tsx`, `theme-toggle.tsx`, `vitest`, `[clientId]/page.tsx`, `how-we-work/page.tsx`, `tools/page.tsx`, `portal/reports/statements/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/[id]/page.tsx`, `calendar/staff.ts`, `review-form.tsx`, `ledger/books.ts`, `cx`, `cycle/page.tsx`, `registrations/[id]/page.tsx`, `brand/page.tsx`, `showDate`, `supabaseServer`, `Card`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `addDays`, `statement.ts`, `toCentavos`, `books/reports/2307/page.tsx`, `mime.ts`, `invoice-pages.tsx`, `cx`, `fixed-assets/page.tsx`, `site-document.tsx`, `portal/reports/page.tsx`, `getIdentity`, `idle-watcher.tsx`, `notes.ts`, `returns/books.test.ts`, `filings/[id]/page.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `review-queue.ts`, `Badge`, `batch/forms.tsx`, `calendar/staff.ts`, `chrome.tsx`, `formatAmount`, `next`, `app/settings/page.tsx`, `profile.ts`, `payment-forms.tsx`, `documents/actions.ts`, `worksheet/page.tsx`, `payroll/forms.tsx`, `deadlines/actions.ts`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.028891377379619262 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `form-2307.ts`, `ui.ts`, `marketing/attribution.ts`, `package.json`, `engine.ts`, `notification-bell.tsx`, `dependencies`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `filings/actions.ts`, `items.ts`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `Notice`, `blocks.tsx`, `arap.ts`, `year-end/page.tsx`, `combobox.tsx`, `settlement-pages.tsx`, `supabaseServer`, `clients/[id]/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `month-complete.tsx`, `theme-toggle.tsx`, `vitest`, `[clientId]/page.tsx`, `tools/page.tsx`, `portal/reports/statements/page.tsx`, `Centavos`, `intake-picker.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `calendar/staff.ts`, `review-form.tsx`, `ledger/books.ts`, `cycle/page.tsx`, `registrations/[id]/page.tsx`, `brand/page.tsx`, `showDate`, `supabaseServer`, `Card`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `returns/load.ts`, `addDays`, `statement.ts`, `toCentavos`, `books/reports/2307/page.tsx`, `mime.ts`, `invoice-pages.tsx`, `cx`, `fixed-assets/page.tsx`, `site-document.tsx`, `react`, `portal/reports/page.tsx`, `getIdentity`, `idle-watcher.tsx`, `notes.ts`, `bulk-actions.ts`, `parties/actions.ts`, `server-only`, `ledger/types.ts`, `filings/[id]/page.tsx`, `(site)/page.tsx`, `workpapers/page.tsx`, `report-periods.ts`, `app/documents/page.tsx`, `review-queue.ts`, `Badge`, `batch/forms.tsx`, `chrome.tsx`, `filings/actions.ts`, `formatAmount`, `brand/actions.ts`, `app/settings/page.tsx`, `profile.ts`, `batch/load.ts`, `documents/actions.ts`, `worksheet/page.tsx`, `payroll/forms.tsx`, `payments-list.tsx`, `deadlines/actions.ts`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._