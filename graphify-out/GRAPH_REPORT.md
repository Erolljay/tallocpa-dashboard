# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 927 files · ~755,157 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5739 nodes · 20288 edges · 177 communities (156 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 180 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `49e1ff2f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- money.ts
- quote.ts
- work/page.tsx
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
- Sign-in & Setup Docs
- cx.ts
- Sign-off, Ledger & Payments
- package.json
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
- parts.ts
- button.tsx
- Badge
- payroll/forms.tsx
- modal.tsx
- deadlines/page.tsx
- scripts
- supabaseAdmin
- quote/page.tsx
- requireStaff
- documents/labels.ts
- documents/labels.ts
- cx
- payroll/data.ts
- registrations/forms.tsx
- money.ts
- Notice
- blocks.tsx
- arap.ts
- layout.ts
- year-end/page.tsx
- combobox.tsx
- formatAmount
- Apple Design
- generate.ts
- form-1601c.ts
- clients/[id]/page.tsx
- upload/page.tsx
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- dropdown.tsx
- stat-cards.tsx
- cycle/actions.ts
- theme-toggle.tsx
- documents/[id]/page.tsx
- ui.ts
- how-we-work/page.tsx
- index.ts
- transactions-actions.ts
- Pro components
- Centavos
- ledger/data.ts
- portal/reports/page.tsx
- ledger/types.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/forms.tsx
- requests/actions.ts
- Recipes
- book-income.ts
- BoardUI page patterns
- Pro templates
- review-form.tsx
- ledger/books.ts
- filings/run.ts
- 2316/page.tsx
- cycle/page.tsx
- boardui
- public.ts
- quote.ts
- filings/[id]/page.tsx
- cycle/page.tsx
- sign-in-form.tsx
- vitest
- Opening balances: checklist for any cut-off
- idle-watcher.tsx
- Card
- transactions-actions.ts
- [clientId]/page.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- getIdentity
- month.ts
- Centavos
- safeguards.ts
- worksheet/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- draft.ts
- parties/[id]/page.tsx
- read.test.ts
- opening.ts
- mime.ts
- status.ts
- spinner.tsx
- fields.ts
- fixed-assets/page.tsx
- site-document.tsx
- react
- ticked-allocation.test.ts
- Card
- Building UIs with BoardUI
- names.ts
- rates.ts
- morning.ts
- funnel.test.ts
- generate-qap-fixture.mjs
- register/page.tsx
- server-only
- ledger/types.ts
- approval-memo.tsx
- portal-statements-approval.test.ts
- (site)/page.tsx
- unlock-requests.tsx
- safeguards.ts
- workpapers/page.tsx
- adjustments.test.ts
- app/documents/page.tsx
- template.ts
- leads/[id]/page.tsx
- app/page.tsx
- Rework: one flow from lead to year-end
- slots.ts
- grid.ts
- opengraph-image.tsx
- filings/actions.ts
- supabaseServer
- app/settings/page.tsx
- sign-off-actions.tsx
- acting-approver.test.ts
- layout.ts
- money.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- books-migration.test.ts
- tests/books.test.ts
- returns-books.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 352 edges
2. `cx` - 295 edges
3. `react` - 264 edges
4. `Skeleton()` - 250 edges
5. `Notice()` - 245 edges
6. `next` - 224 edges
7. `Button()` - 221 edges
8. `Badge()` - 179 edges
9. `Card()` - 177 edges
10. `vitest` - 173 edges

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

## Communities (177 total, 21 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.07
Nodes (60): BooksContext, Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href(), Portal2307() (+52 more)

### Community 1 - "index.ts"
Cohesion: 0.06
Nodes (22): templatePayload(), as(), client(), root, as(), purchase(), root, as() (+14 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "money.ts"
Cohesion: 0.10
Nodes (26): MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, LOANS (+18 more)

### Community 4 - "quote.ts"
Cohesion: 0.07
Nodes (47): PriceRow, corp, items, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), has() (+39 more)

### Community 5 - "work/page.tsx"
Cohesion: 0.11
Nodes (30): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey, Requests(), RequestsPage() (+22 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (27): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), send() (+19 more)

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
Nodes (80): GET(), SheetPreview(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus() (+72 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx.ts"
Cohesion: 0.03
Nodes (88): NotificationFilterTabs(), NotificationRowData, AvatarColor, AvatarProps, AvatarSize, styles, Counter(), CounterColor (+80 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "package.json"
Cohesion: 0.05
Nodes (53): eslintConfig, dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1 (+45 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (41): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine() (+33 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.11
Nodes (60): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+52 more)

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
Cohesion: 0.10
Nodes (37): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+29 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (71): ParallelRun(), ParallelRunPage(), quarterMonths(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Atcs() (+63 more)

### Community 43 - "parts.ts"
Cohesion: 0.12
Nodes (20): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, one() (+12 more)

### Community 44 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "Badge"
Cohesion: 0.08
Nodes (67): EmployerCard(), RemittancesDue(), MonthRemittances(), GET(), ListRow, ORDER, Remittance(), RemittancePage() (+59 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.06
Nodes (75): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+67 more)

### Community 47 - "modal.tsx"
Cohesion: 0.15
Nodes (25): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), AlertDialog(), AlertDialogProps (+17 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.11
Nodes (41): server-only, bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), BookingState (+33 more)

### Community 51 - "quote/page.tsx"
Cohesion: 0.08
Nodes (54): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+46 more)

### Community 52 - "requireStaff"
Cohesion: 0.13
Nodes (39): HandlesContributionsSwitch(), RemittanceButton(), RemittanceFileUpload(), send(), TaskWorkflow(), requireStaff(), addRemittanceFile(), approveRemittanceAction() (+31 more)

### Community 53 - "documents/labels.ts"
Cohesion: 0.13
Nodes (36): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+28 more)

### Community 54 - "documents/labels.ts"
Cohesion: 0.13
Nodes (22): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+14 more)

### Community 55 - "cx"
Cohesion: 0.04
Nodes (82): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps, ComboBoxSelectionMode (+74 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.10
Nodes (44): saveMonthAction(), EmployeeDetail(), EmployeePage(), AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer (+36 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (88): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+80 more)

### Community 58 - "money.ts"
Cohesion: 0.05
Nodes (63): FinancialStatements, lookupAtc(), client, row(), payslipCsv(), payslipSchedule(), agentBackground(), agentErrors() (+55 more)

### Community 59 - "Notice"
Cohesion: 0.08
Nodes (88): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+80 more)

### Community 60 - "blocks.tsx"
Cohesion: 0.18
Nodes (15): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+7 more)

### Community 61 - "arap.ts"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 62 - "layout.ts"
Cohesion: 0.12
Nodes (29): SafeguardsNotice(), board, MARCO, none, RHEA, row(), steps, documentCutoff() (+21 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (27): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, Delegation, BooksMonthRow (+19 more)

### Community 64 - "combobox.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 65 - "formatAmount"
Cohesion: 0.07
Nodes (76): BankAccountsRoute(), booksContext(), fmtDate(), one(), SearchParams, BooksFrame(), BooksList(), Column (+68 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.14
Nodes (23): IsoDate, EfpsGroup, FilingChannel, FilingInstance, Frequency, Period, PeriodFilter, normalizeRdo() (+15 more)

### Community 68 - "form-1601c.ts"
Cohesion: 0.12
Nodes (27): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+19 more)

### Community 69 - "clients/[id]/page.tsx"
Cohesion: 0.05
Nodes (68): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+60 more)

### Community 70 - "upload/page.tsx"
Cohesion: 0.20
Nodes (18): DocumentsCard(), when(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), DocumentUpload() (+10 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (38): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+30 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.07
Nodes (63): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+55 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "dropdown.tsx"
Cohesion: 0.09
Nodes (58): qapBuckets(), SaleSplit, sawtBuckets(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS (+50 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "cycle/actions.ts"
Cohesion: 0.07
Nodes (39): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+31 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.11
Nodes (28): EmailSwitches(), EmailSwitchGroup, applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle() (+20 more)

### Community 79 - "documents/[id]/page.tsx"
Cohesion: 0.16
Nodes (17): DocReviewActions(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), PayrollIntake(), ColumnMapping() (+9 more)

### Community 80 - "ui.ts"
Cohesion: 0.07
Nodes (55): booksViewFor(), fmtMonth(), blankLine(), InvoiceFormValue, MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard() (+47 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.13
Nodes (35): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+27 more)

### Community 82 - "index.ts"
Cohesion: 0.06
Nodes (19): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+11 more)

### Community 83 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "Centavos"
Cohesion: 0.09
Nodes (41): AlphalistRow, previewOf(), RegisterPreview, totals(), Form2316Data, Form2316Line, AnnualSummary, MonthLines (+33 more)

### Community 86 - "ledger/data.ts"
Cohesion: 0.10
Nodes (39): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+31 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.07
Nodes (75): nextConfig, next, BookPrint(), BookPrintPage(), PrintButton(), PortalClient, portalContext(), Portal2316() (+67 more)

### Community 88 - "ledger/types.ts"
Cohesion: 0.16
Nodes (13): codes, PNL, COA_TEMPLATES, ClientBooks, AccountDef, BOOK_LOCK_FORMS, BOOKS, ENTRY_SOURCES (+5 more)

### Community 89 - "workpapers/load.ts"
Cohesion: 0.15
Nodes (22): ExplainState, explainTieAction(), SIGNED, RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd() (+14 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.12
Nodes (26): metadata, Start(), StartPage(), SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution() (+18 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "leads/forms.tsx"
Cohesion: 0.13
Nodes (35): PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+27 more)

### Community 94 - "requests/actions.ts"
Cohesion: 0.16
Nodes (21): AssignRequestForm(), ReplyForm(), send(), METHODS, ProofUpload(), send(), ProofState, startProofUpload() (+13 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "book-income.ts"
Cohesion: 0.26
Nodes (10): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, bookIncome(), INCOME_GROUPS (+2 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.05
Nodes (81): fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, ApproveItem, approveSelectedAction(), BOOKED, BulkState (+73 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (39): LooseLeafHead, Pad(), BOOK_ABBR, BookEntry, BookKind, BookLine, Column, ColumnarBook (+31 more)

### Community 101 - "filings/run.ts"
Cohesion: 0.13
Nodes (30): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), ymd(), DeadlineRule (+22 more)

### Community 102 - "2316/page.tsx"
Cohesion: 0.44
Nodes (7): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Form2316Sheet(), PrintButton(), load2316()

### Community 103 - "cycle/page.tsx"
Cohesion: 0.24
Nodes (17): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+9 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "public.ts"
Cohesion: 0.10
Nodes (34): quoteFor(), buildQuote(), catchUpFor(), cents(), feeTax(), instantView(), pesos(), Quote (+26 more)

### Community 106 - "quote.ts"
Cohesion: 0.06
Nodes (59): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+51 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (43): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind (+35 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.15
Nodes (21): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CloseCycleButton(), Message(), NothingToSubmitButton() (+13 more)

### Community 109 - "sign-in-form.tsx"
Cohesion: 0.09
Nodes (29): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+21 more)

### Community 110 - "vitest"
Cohesion: 0.02
Nodes (41): pg, vitest, dir, ctx, input, root, Data, root (+33 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 113 - "Card"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.14
Nodes (24): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+16 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (47): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+39 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.13
Nodes (27): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+19 more)

### Community 118 - "getIdentity"
Cohesion: 0.12
Nodes (29): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+21 more)

### Community 119 - "month.ts"
Cohesion: 0.29
Nodes (9): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+1 more)

### Community 120 - "Centavos"
Cohesion: 0.06
Nodes (60): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), LOCKED_STATUSES, DatFiles, Db, ATC_MASTER (+52 more)

### Community 121 - "safeguards.ts"
Cohesion: 0.20
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 122 - "worksheet/page.tsx"
Cohesion: 0.38
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (42): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+34 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.10
Nodes (35): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), PortalRemittances() (+27 more)

### Community 126 - "draft.ts"
Cohesion: 0.15
Nodes (21): file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), DraftIssue, draftSchema, draftToTemplate() (+13 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (55): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+47 more)

### Community 128 - "read.test.ts"
Cohesion: 0.04
Nodes (99): RFC-4180, exceljs, zod, applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction() (+91 more)

### Community 129 - "opening.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 130 - "mime.ts"
Cohesion: 0.09
Nodes (45): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+37 more)

### Community 131 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 132 - "spinner.tsx"
Cohesion: 0.32
Nodes (7): PendingGlyph(), Arc(), SIZES, Spinner(), SpinnerGlyph(), SpinnerProps, SpinnerSize

### Community 133 - "fields.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.12
Nodes (13): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), geist (+5 more)

### Community 136 - "react"
Cohesion: 0.06
Nodes (57): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+49 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "Card"
Cohesion: 0.15
Nodes (23): fmtDate(), lastMonth(), Reports(), ReportsPage(), amt(), Binder(), BinderPage(), MonthSection() (+15 more)

### Community 139 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 140 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 141 - "rates.ts"
Cohesion: 0.32
Nodes (13): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+5 more)

### Community 142 - "morning.ts"
Cohesion: 0.23
Nodes (13): GET(), Gap, Email, line(), longDay(), NEEDS, ownerEmail(), shortDay() (+5 more)

### Community 143 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 144 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 145 - "register/page.tsx"
Cohesion: 0.24
Nodes (17): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+9 more)

### Community 146 - "server-only"
Cohesion: 0.08
Nodes (43): @supabase/supabase-js, GET(), GET(), MonthComplete(), SentRow, TimelineRow, digestMessage(), DigestRow (+35 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.16
Nodes (18): Access, STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, ChecklistInput (+10 more)

### Community 148 - "approval-memo.tsx"
Cohesion: 0.15
Nodes (15): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, grossSales(), ReviewNote, approvalMemo() (+7 more)

### Community 150 - "(site)/page.tsx"
Cohesion: 0.05
Nodes (92): QuotesClosed(), robots(), AboutPage(), HOW, metadata, BirCalendarPage(), metadata, BRING (+84 more)

### Community 151 - "unlock-requests.tsx"
Cohesion: 0.83
Nodes (3): UnlockRequests(), when(), booksUnlockRequests()

### Community 152 - "safeguards.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.19
Nodes (20): noteAction(), raiseNoteAction(), signWorkpaperAction(), tickAdjustmentAction(), ExplainForm(), amt(), one(), shiftMonth() (+12 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (29): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths() (+21 more)

### Community 157 - "template.ts"
Cohesion: 0.12
Nodes (18): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS (+10 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (39): NotesCard(), bookedTime, LeadPage(), LeadTouch, Person, jobName(), lineName(), longDate() (+31 more)

### Community 159 - "app/page.tsx"
Cohesion: 0.10
Nodes (33): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary(), Queue() (+25 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "slots.ts"
Cohesion: 0.24
Nodes (18): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), buttonClass(), manilaInstant() (+10 more)

### Community 166 - "grid.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "filings/actions.ts"
Cohesion: 0.19
Nodes (18): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+10 more)

### Community 170 - "supabaseServer"
Cohesion: 0.06
Nodes (66): addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), addChargeAction(), applyCreditAction(), clearRemittedAction() (+58 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.07
Nodes (51): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+43 more)

### Community 174 - "sign-off-actions.tsx"
Cohesion: 0.21
Nodes (13): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+5 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "layout.ts"
Cohesion: 0.13
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 180 - "money.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 193 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 194 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 195 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 196 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1515 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `money.ts`, `quote.ts`, `work/page.tsx`, `onboarding/page.tsx`, `notification-bell.tsx`, `package.json`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `parts.ts`, `Badge`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `documents/labels.ts`, `payroll/data.ts`, `registrations/forms.tsx`, `money.ts`, `blocks.tsx`, `arap.ts`, `layout.ts`, `year-end/page.tsx`, `generate.ts`, `form-1601c.ts`, `clients/[id]/page.tsx`, `upload/page.tsx`, `payroll/payroll.test.ts`, `ui.ts`, `index.ts`, `portal/reports/page.tsx`, `ledger/types.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `book-income.ts`, `review-form.tsx`, `ledger/books.ts`, `filings/run.ts`, `cycle/page.tsx`, `public.ts`, `quote.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `sign-in-form.tsx`, `idle-watcher.tsx`, `Card`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `getIdentity`, `month.ts`, `Centavos`, `safeguards.ts`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `opening.ts`, `mime.ts`, `status.ts`, `fields.ts`, `fixed-assets/page.tsx`, `react`, `ticked-allocation.test.ts`, `names.ts`, `rates.ts`, `funnel.test.ts`, `server-only`, `ledger/types.ts`, `approval-memo.tsx`, `portal-statements-approval.test.ts`, `(site)/page.tsx`, `safeguards.ts`, `adjustments.test.ts`, `app/documents/page.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `slots.ts`, `filings/actions.ts`, `app/settings/page.tsx`, `acting-approver.test.ts`, `layout.ts`, `money.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `returns-books.test.ts`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07243243243243243 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `money.ts`, `quote.ts`, `work/page.tsx`, `onboarding/page.tsx`, `notification-bell.tsx`, `cx.ts`, `package.json`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `button.tsx`, `Badge`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `requireStaff`, `documents/labels.ts`, `documents/labels.ts`, `cx`, `payroll/data.ts`, `registrations/forms.tsx`, `Notice`, `year-end/page.tsx`, `combobox.tsx`, `formatAmount`, `clients/[id]/page.tsx`, `upload/page.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `cycle/actions.ts`, `theme-toggle.tsx`, `documents/[id]/page.tsx`, `ui.ts`, `how-we-work/page.tsx`, `transactions-actions.ts`, `ledger/data.ts`, `portal/reports/page.tsx`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/forms.tsx`, `requests/actions.ts`, `review-form.tsx`, `2316/page.tsx`, `quote.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `sign-in-form.tsx`, `idle-watcher.tsx`, `Card`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `getIdentity`, `worksheet/page.tsx`, `batch/register.ts`, `quote/page.tsx`, `parties/[id]/page.tsx`, `read.test.ts`, `mime.ts`, `spinner.tsx`, `fixed-assets/page.tsx`, `site-document.tsx`, `Card`, `rates.ts`, `register/page.tsx`, `server-only`, `(site)/page.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `slots.ts`, `grid.ts`, `supabaseServer`, `app/settings/page.tsx`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06463414634146342 - nodes in this community are weakly interconnected._
- **Why does `next` connect `portal/reports/page.tsx` to `form-2307.ts`, `money.ts`, `work/page.tsx`, `onboarding/page.tsx`, `notification-bell.tsx`, `cx.ts`, `package.json`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `Badge`, `payroll/forms.tsx`, `deadlines/page.tsx`, `supabaseAdmin`, `quote/page.tsx`, `requireStaff`, `documents/labels.ts`, `documents/labels.ts`, `payroll/data.ts`, `registrations/forms.tsx`, `combobox.tsx`, `formatAmount`, `clients/[id]/page.tsx`, `upload/page.tsx`, `books/forms.tsx`, `cycle/actions.ts`, `documents/[id]/page.tsx`, `ui.ts`, `transactions-actions.ts`, `ledger/data.ts`, `workpapers/load.ts`, `intake-picker.tsx`, `form-2316.tsx`, `leads/forms.tsx`, `requests/actions.ts`, `review-form.tsx`, `2316/page.tsx`, `quote.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `sign-in-form.tsx`, `idle-watcher.tsx`, `Card`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `getIdentity`, `Centavos`, `worksheet/page.tsx`, `batch/register.ts`, `quote/page.tsx`, `draft.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `mime.ts`, `fixed-assets/page.tsx`, `site-document.tsx`, `react`, `Card`, `rates.ts`, `morning.ts`, `register/page.tsx`, `server-only`, `ledger/types.ts`, `approval-memo.tsx`, `(site)/page.tsx`, `unlock-requests.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `grid.ts`, `opengraph-image.tsx`, `filings/actions.ts`, `supabaseServer`, `app/settings/page.tsx`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._