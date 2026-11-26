# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 892 files · ~708,711 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5548 nodes · 19387 edges · 189 communities (164 shown, 25 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 174 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `bdcf447c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- client
- migrate.yml
- tax-codes.ts
- public.ts
- package.json
- clients/[id]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- transactions-actions.ts
- Sign-in & Setup Docs
- cx
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
- portal/books.ts
- scores/page.tsx
- compare.ts
- payroll/types.ts
- filings/actions.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- deadlines/page.tsx
- scripts
- supabaseAdmin
- quote/page.tsx
- Centavos
- getIdentity
- documents/labels.ts
- marketing/page.tsx
- payroll/data.ts
- registrations/forms.tsx
- money.ts
- Notice
- marketing/attribution.ts
- arap.ts
- layout.ts
- year-end/page.tsx
- quote/page.tsx
- module-pages.tsx
- Apple Design
- supabaseServer
- testing.ts
- requireOwner
- return-file-actions.ts
- books/forms.tsx
- form-1601c.ts
- Rules
- Animation Performance
- site-document.tsx
- stat-cards.tsx
- cycle/page.tsx
- @remixicon/react
- addDays
- notes.ts
- how-we-work/page.tsx
- settings/actions.ts
- link-button.tsx
- Pro components
- form-2307.tsx
- ledger/data.ts
- portal/reports/page.tsx
- portal-billing.test.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/forms.tsx
- filed-returns.ts
- Recipes
- Card
- BoardUI page patterns
- Pro templates
- ui.ts
- ledger/books.ts
- filings/run.ts
- dropdown.tsx
- messages.ts
- boardui
- params.ts
- profile.ts
- filings/[id]/page.tsx
- template.ts
- db.test.ts
- ref_node_fs
- Opening balances: checklist for any cut-off
- ledger-closing.test.ts
- Card
- lib/books/actions.ts
- [clientId]/page.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- vat.ts
- proposal-view.tsx
- returns/types.ts
- tests/payroll.test.ts
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- work/page.tsx
- parties/[id]/page.tsx
- read.test.ts
- opening.ts
- mime.ts
- fields.ts
- onboarding/page.tsx
- gemini.ts
- fixed-assets/page.tsx
- rates.ts
- react
- ticked-allocation.test.ts
- report-periods.ts
- ledger.test.ts
- notification-bell.tsx
- bulk-actions.ts
- idle-watcher.tsx
- holiday-list.ts
- lookupAtc
- parts.ts
- server-only
- ledger/types.ts
- sign-off-actions.tsx
- zod
- blocks.tsx
- seed.ts
- safeguards.ts
- workpapers/page.tsx
- status.ts
- app/documents/page.tsx
- deadlines/actions.ts
- quote.ts
- leads/[id]/page.tsx
- Badge
- periods
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proof-upload.tsx
- books-2307.test.ts
- business.ts
- social-button.tsx
- opengraph-image.tsx
- pg
- leads-pipeline.test.ts
- Building UIs with BoardUI
- portal-statements-approval.test.ts
- app/settings/page.tsx
- ledger-documents.test.ts
- ledger-lock.test.ts
- acting-approver.test.ts
- fixed-assets.test.ts
- batch-upload.test.ts
- parallel-run.test.ts
- returns-sign-off.test.ts
- match.ts
- vitest
- tests/books.test.ts
- books/reports/statements/page.tsx
- funnel.test.ts
- returns-books.test.ts
- books-migration.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 311 edges
2. `cx` - 286 edges
3. `react` - 254 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 233 edges
6. `next` - 209 edges
7. `Button()` - 204 edges
8. `Card()` - 166 edges
9. `Badge()` - 165 edges
10. `vitest` - 165 edges

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

## Communities (189 total, 25 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (39): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one(), portal2307() (+31 more)

### Community 1 - "client"
Cohesion: 0.09
Nodes (17): as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll() (+9 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "tax-codes.ts"
Cohesion: 0.19
Nodes (15): SettingsPage(), SettingsRoute(), appliesTo(), canGoOn(), formsFor(), placeOf(), RETURN_LINES, ReturnForm (+7 more)

### Community 4 - "public.ts"
Cohesion: 0.10
Nodes (26): QuerySource, InstantQuote, instantView(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+18 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "clients/[id]/page.tsx"
Cohesion: 0.06
Nodes (54): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setClientStatusAction(), setIncomeTaxMethodAction(), setupMissingChartsAction() (+46 more)

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

### Community 11 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.04
Nodes (93): react-aria-components, NotificationFilterTabs(), ChipColor, StatusDot(), StatusDotColor, StatusDotProps, styles, Checkbox() (+85 more)

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
Cohesion: 0.09
Nodes (36): statementsFrom(), FsLine, FsLineKey, isFsLine(), Section, Statement, add(), buildStatements() (+28 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (55): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+47 more)

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

### Community 40 - "portal/books.ts"
Cohesion: 0.28
Nodes (8): Released, accountFromRow(), BooksClient, ReleasedReport, ReportKind, PortalBooks, portalBooksReader(), StatementHold

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (37): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+29 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (70): ParallelRun(), ParallelRunPage(), quarterMonths(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Atcs() (+62 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "filings/actions.ts"
Cohesion: 0.14
Nodes (21): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+13 more)

### Community 45 - "index.ts"
Cohesion: 0.07
Nodes (18): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+10 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.06
Nodes (80): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+72 more)

### Community 47 - "modal.tsx"
Cohesion: 0.04
Nodes (68): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), AvatarColor, AvatarProps (+60 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.10
Nodes (41): ClientTabs(), ClientReturnsPage(), Returns(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting() (+33 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (30): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+22 more)

### Community 51 - "quote/page.tsx"
Cohesion: 0.15
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 52 - "Centavos"
Cohesion: 0.06
Nodes (79): GridRow, MonthGrid(), AlphalistRow, Form2316Data, Form2316Line, AnnualSummary, annualTax(), computeEmployeeYear() (+71 more)

### Community 53 - "getIdentity"
Cohesion: 0.12
Nodes (33): RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail(), PortalRequests() (+25 more)

### Community 54 - "documents/labels.ts"
Cohesion: 0.11
Nodes (29): Doc, Row, Doc, Documents(), FolderKey, FOLDERS, Item, MONTHS (+21 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (26): archiveLinkAction(), ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+18 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.13
Nodes (30): EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), Form2316Signatory, paidInYear(), Payroll2316Raw, loadEntries() (+22 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (85): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+77 more)

### Community 58 - "money.ts"
Cohesion: 0.05
Nodes (73): SaleSplit, client, SawtResult, Split, form1601C, INPUTS, MONTH, PAYSLIP_COLUMNS (+65 more)

### Community 59 - "Notice"
Cohesion: 0.07
Nodes (91): BatchUpload(), PreviewTable(), AmendmentRequestForm(), CloseYearForm(), ReleaseReportForm(), SetupForm(), DocReviewActions(), AssignForm() (+83 more)

### Community 60 - "marketing/attribution.ts"
Cohesion: 0.17
Nodes (28): GET(), Link, pageAttribution(), requestQuoteAction(), SERVICES, StartState, FUNNEL_BRAND, ATTR_COOKIE (+20 more)

### Community 61 - "arap.ts"
Cohesion: 0.13
Nodes (24): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+16 more)

### Community 62 - "layout.ts"
Cohesion: 0.14
Nodes (21): digestMessage(), DigestRow, longDay(), peso, time(), Email, bodyBlocks(), DEFAULT_BRAND (+13 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.06
Nodes (58): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+50 more)

### Community 64 - "quote/page.tsx"
Cohesion: 0.15
Nodes (25): dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase (+17 more)

### Community 65 - "module-pages.tsx"
Cohesion: 0.07
Nodes (71): booksContext(), fmtDate(), one(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+63 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "supabaseServer"
Cohesion: 0.05
Nodes (53): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), createLinkAction() (+45 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "requireOwner"
Cohesion: 0.12
Nodes (37): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+29 more)

### Community 70 - "return-file-actions.ts"
Cohesion: 0.25
Nodes (19): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), markCwtFollowedUpAction(), addReturnFile(), checkEsubmissionReplyAction() (+11 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.12
Nodes (47): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+39 more)

### Community 72 - "form-1601c.ts"
Cohesion: 0.10
Nodes (35): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist() (+27 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "cycle/page.tsx"
Cohesion: 0.12
Nodes (32): DocumentsCard(), when(), Cycle(), CycleWithClient, DocRow, ExceptionRow, shift(), one() (+24 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.06
Nodes (55): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links() (+47 more)

### Community 79 - "addDays"
Cohesion: 0.20
Nodes (21): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), fiscalYearOf(), followsCalendarYear() (+13 more)

### Community 80 - "notes.ts"
Cohesion: 0.17
Nodes (16): NotesCard(), ICON, NotesTimeline(), when, taxpayerTypeLabel, SERVICE_LABELS, inquiryAnswers(), NoteEntry (+8 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "settings/actions.ts"
Cohesion: 0.21
Nodes (16): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+8 more)

### Community 83 - "link-button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "form-2307.tsx"
Cohesion: 0.13
Nodes (26): Print(), Print2307Page(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), PortalPrint2307Page(), Print() (+18 more)

### Community 86 - "ledger/data.ts"
Cohesion: 0.08
Nodes (48): AmendmentDecision(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload(), PermitForm() (+40 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.21
Nodes (25): Books(), PortalBooks(), BooksSection(), NavRow(), PortalReports(), Reports(), Section(), Statements() (+17 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.10
Nodes (35): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, amt() (+27 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (22): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), ATTRIBUTION_KEY, pickAttribution() (+14 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "leads/forms.tsx"
Cohesion: 0.15
Nodes (31): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+23 more)

### Community 94 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "Card"
Cohesion: 0.28
Nodes (18): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+10 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "ui.ts"
Cohesion: 0.06
Nodes (62): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+54 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (48): BookPrint(), BookPrintPage(), PrintButton(), BookPrint(), PortalBookPrint(), LooseLeafHead, LooseLeafPages(), Pad() (+40 more)

### Community 101 - "filings/run.ts"
Cohesion: 0.13
Nodes (27): Rule, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance, Frequency, Period (+19 more)

### Community 102 - "dropdown.tsx"
Cohesion: 0.08
Nodes (36): Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider() (+28 more)

### Community 103 - "messages.ts"
Cohesion: 0.38
Nodes (5): cycleMessage(), dayFmt, NoticeKind, showDay(), Due

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "params.ts"
Cohesion: 0.20
Nodes (14): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+6 more)

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.10
Nodes (26): bookKind, BookRow, bookStatus, Event, eventText, Filing(), FilingFile, FilingPage() (+18 more)

### Community 108 - "template.ts"
Cohesion: 0.12
Nodes (18): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, billedWhen(), BOOKKEEPING_LABEL, DOCUMENT_BANDS (+10 more)

### Community 110 - "ref_node_fs"
Cohesion: 0.06
Nodes (14): outDir, pkgDir, require, { version }, ctx, input, api, ctx (+6 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 113 - "Card"
Cohesion: 0.07
Nodes (55): UserMenu(), PortalClient, portalContext(), BooksChart(), compact, longMonth(), short(), shortMonth() (+47 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (23): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+15 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (41): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), RunReadyButton(), VoidDepositForm() (+33 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.12
Nodes (36): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+28 more)

### Community 118 - "vat.ts"
Cohesion: 0.13
Nodes (50): incomeAttachments(), compute(), inputsFor(), buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv() (+42 more)

### Community 119 - "proposal-view.tsx"
Cohesion: 0.20
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 120 - "returns/types.ts"
Cohesion: 0.06
Nodes (65): recomputeWorksheetAction(), GET(), Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when() (+57 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (38): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+30 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.09
Nodes (46): FilingRow, Detail(), StatementPage(), FilingListRow, Detail(), PortalStatementDetail(), Billing(), PortalBilling() (+38 more)

### Community 126 - "work/page.tsx"
Cohesion: 0.18
Nodes (15): Action(), MyWork(), MyWorkPage(), short(), TONE, MyWork, byUrgency(), filingItem() (+7 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (53): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+45 more)

### Community 128 - "read.test.ts"
Cohesion: 0.04
Nodes (105): RFC-4180, applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction() (+97 more)

### Community 129 - "opening.ts"
Cohesion: 0.15
Nodes (19): CashFlowClass, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+11 more)

### Community 130 - "mime.ts"
Cohesion: 0.11
Nodes (33): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, DatFiles, datFiles(), Db, accessToken() (+25 more)

### Community 131 - "fields.ts"
Cohesion: 0.11
Nodes (24): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, normalizeAmount() (+16 more)

### Community 132 - "onboarding/page.tsx"
Cohesion: 0.07
Nodes (44): removeAssignmentAction(), ClientTab, UNDER, RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), addClientFile(), KINDS (+36 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (19): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+11 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.12
Nodes (30): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+22 more)

### Community 135 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 136 - "react"
Cohesion: 0.06
Nodes (55): react, Batch(), BatchPage(), one(), toCentavos(), BankAccountsRoute(), CustomersRoute(), EmployeesRoute() (+47 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "report-periods.ts"
Cohesion: 0.27
Nodes (15): basePeriod(), HeldNote(), holdsWhat(), BooksYear, booksYears(), iso(), lockedMonths(), monthEnd() (+7 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (89): GET(), SheetPreview(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus() (+81 more)

### Community 141 - "bulk-actions.ts"
Cohesion: 0.11
Nodes (25): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), BatchRow (+17 more)

### Community 142 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 143 - "holiday-list.ts"
Cohesion: 0.23
Nodes (12): HolidayYearForm(), easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList() (+4 more)

### Community 144 - "lookupAtc"
Cohesion: 0.26
Nodes (12): qapBuckets(), sawtBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo() (+4 more)

### Community 145 - "parts.ts"
Cohesion: 0.10
Nodes (23): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, KIND_LABELS (+15 more)

### Community 146 - "server-only"
Cohesion: 0.14
Nodes (32): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), decideExceptionAction(), tellPreparer() (+24 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.15
Nodes (20): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES (+12 more)

### Community 148 - "sign-off-actions.tsx"
Cohesion: 0.23
Nodes (12): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+4 more)

### Community 149 - "zod"
Cohesion: 0.23
Nodes (11): zod, amount, date, ProofState, refresh(), rejectProofAction(), StartProof, submitSchema (+3 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.05
Nodes (98): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+90 more)

### Community 151 - "seed.ts"
Cohesion: 0.25
Nodes (8): DeadlineRule, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 152 - "safeguards.ts"
Cohesion: 0.11
Nodes (33): line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board, MARCO (+25 more)

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

### Community 154 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (31): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ReadPayrollButton(), ApprovedTable(), BOOKED_TYPES (+23 more)

### Community 156 - "deadlines/actions.ts"
Cohesion: 0.52
Nodes (4): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton()

### Community 157 - "quote.ts"
Cohesion: 0.06
Nodes (64): PriceRow, EngagementRow, corp, items, proposal(), TaxpayerType, EstimatedProfile, estimateProfile() (+56 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.14
Nodes (22): BookingLink(), ReopenForm(), bookedTime, Lead(), LeadPage(), LeadSource(), LeadTouch, Person (+14 more)

### Community 159 - "Badge"
Cohesion: 0.10
Nodes (35): DashboardStats(), FilingTable(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey (+27 more)

### Community 160 - "periods"
Cohesion: 0.67
Nodes (7): Periods, periods(), addMonths(), monthEnd(), pad2(), quarterOf(), taxableYear()

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.20
Nodes (21): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), buttonClass(), Interval (+13 more)

### Community 163 - "proof-upload.tsx"
Cohesion: 0.60
Nodes (5): METHODS, ProofUpload(), send(), startProofUpload(), submitProof()

### Community 164 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 165 - "business.ts"
Cohesion: 0.25
Nodes (7): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q

### Community 166 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "pg"
Cohesion: 0.08
Nodes (10): pg, root, root, root, LEAD, LinkRow, ReportRow, root (+2 more)

### Community 169 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 170 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.23
Nodes (14): appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage(), MoveAccountButtons() (+6 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 178 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 181 - "match.ts"
Cohesion: 0.29
Nodes (10): digits(), editDistance(), EmployeeMatch, keyNo(), matchEmployee(), MatchStatus, nameScore(), nameWords() (+2 more)

### Community 183 - "vitest"
Cohesion: 0.05
Nodes (14): vitest, dir, root, root, root, root, Row, root (+6 more)

### Community 185 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 189 - "books/reports/statements/page.tsx"
Cohesion: 0.15
Nodes (26): BooksContext, booksViewFor(), fmtMonth(), WithdrawReportButton(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate() (+18 more)

### Community 201 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 203 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1471 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `client`, `tax-codes.ts`, `public.ts`, `package.json`, `clients/[id]/page.tsx`, `statements.ts`, `scores/page.tsx`, `compare.ts`, `filings/actions.ts`, `index.ts`, `payroll/forms.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `Centavos`, `getIdentity`, `payroll/data.ts`, `registrations/forms.tsx`, `money.ts`, `marketing/attribution.ts`, `arap.ts`, `layout.ts`, `year-end/page.tsx`, `supabaseServer`, `testing.ts`, `form-1601c.ts`, `cycle/page.tsx`, `@remixicon/react`, `addDays`, `notes.ts`, `settings/actions.ts`, `ledger/data.ts`, `portal-billing.test.ts`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `filed-returns.ts`, `ui.ts`, `ledger/books.ts`, `filings/run.ts`, `messages.ts`, `params.ts`, `profile.ts`, `filings/[id]/page.tsx`, `db.test.ts`, `ref_node_fs`, `ledger-closing.test.ts`, `Card`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `returns/types.ts`, `tests/payroll.test.ts`, `batch/register.ts`, `work/page.tsx`, `parties/[id]/page.tsx`, `read.test.ts`, `opening.ts`, `mime.ts`, `fields.ts`, `onboarding/page.tsx`, `gemini.ts`, `fixed-assets/page.tsx`, `rates.ts`, `ticked-allocation.test.ts`, `report-periods.ts`, `ledger.test.ts`, `notification-bell.tsx`, `bulk-actions.ts`, `idle-watcher.tsx`, `holiday-list.ts`, `parts.ts`, `server-only`, `ledger/types.ts`, `blocks.tsx`, `safeguards.ts`, `status.ts`, `app/documents/page.tsx`, `quote.ts`, `Badge`, `calendar/page.tsx`, `books-2307.test.ts`, `pg`, `leads-pipeline.test.ts`, `portal-statements-approval.test.ts`, `app/settings/page.tsx`, `ledger-documents.test.ts`, `ledger-lock.test.ts`, `acting-approver.test.ts`, `fixed-assets.test.ts`, `batch-upload.test.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `tests/books.test.ts`, `funnel.test.ts`, `returns-books.test.ts`, `books-migration.test.ts`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11428571428571428 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `read.test.ts`, `mime.ts`, `onboarding/page.tsx`, `package.json`, `clients/[id]/page.tsx`, `fixed-assets/page.tsx`, `react`, `report-periods.ts`, `transactions-actions.ts`, `notification-bell.tsx`, `bulk-actions.ts`, `idle-watcher.tsx`, `dependencies`, `server-only`, `ledger/types.ts`, `sign-off-actions.tsx`, `zod`, `blocks.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `deadlines/actions.ts`, `leads/[id]/page.tsx`, `Badge`, `proof-upload.tsx`, `opengraph-image.tsx`, `scores/page.tsx`, `compare.ts`, `filings/actions.ts`, `app/settings/page.tsx`, `payroll/forms.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `getIdentity`, `documents/labels.ts`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `Notice`, `marketing/attribution.ts`, `arap.ts`, `books/reports/statements/page.tsx`, `year-end/page.tsx`, `quote/page.tsx`, `module-pages.tsx`, `requireOwner`, `return-file-actions.ts`, `books/forms.tsx`, `site-document.tsx`, `cycle/page.tsx`, `@remixicon/react`, `settings/actions.ts`, `form-2307.tsx`, `ledger/data.ts`, `portal/reports/page.tsx`, `workpapers/load.ts`, `intake-picker.tsx`, `form-2316.tsx`, `leads/forms.tsx`, `Card`, `ui.ts`, `ledger/books.ts`, `dropdown.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `Card`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `returns/types.ts`, `batch/register.ts`, `manilaToday`, `work/page.tsx`, `parties/[id]/page.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.08923076923076922 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `read.test.ts`, `tax-codes.ts`, `onboarding/page.tsx`, `package.json`, `clients/[id]/page.tsx`, `fixed-assets/page.tsx`, `transactions-actions.ts`, `notification-bell.tsx`, `cx`, `idle-watcher.tsx`, `dependencies`, `statements.ts`, `sign-off-actions.tsx`, `blocks.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `deadlines/actions.ts`, `quote.ts`, `leads/[id]/page.tsx`, `Badge`, `calendar/page.tsx`, `proof-upload.tsx`, `social-button.tsx`, `scores/page.tsx`, `compare.ts`, `app/settings/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `getIdentity`, `documents/labels.ts`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `Notice`, `books/reports/statements/page.tsx`, `year-end/page.tsx`, `quote/page.tsx`, `module-pages.tsx`, `supabaseServer`, `requireOwner`, `return-file-actions.ts`, `books/forms.tsx`, `site-document.tsx`, `stat-cards.tsx`, `cycle/page.tsx`, `@remixicon/react`, `how-we-work/page.tsx`, `settings/actions.ts`, `link-button.tsx`, `form-2307.tsx`, `ledger/data.ts`, `portal/reports/page.tsx`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/forms.tsx`, `Card`, `ui.ts`, `ledger/books.ts`, `dropdown.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `Card`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `returns/types.ts`, `batch/register.ts`, `manilaToday`, `work/page.tsx`, `parties/[id]/page.tsx`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._