# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 792 files · ~636,035 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4929 nodes · 17122 edges · 165 communities (146 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 142 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `bd6ef2bb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- engine.ts
- migrate.yml
- manilaToday
- ledger/data.ts
- package.json
- year-end/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- requireStaff
- Sign-in & Setup Docs
- app/app/layout.tsx
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- vat.ts
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- lock-bar.tsx
- scores/page.tsx
- registrations/forms.tsx
- payroll/types.ts
- tests/register.test.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- filings/run.ts
- scripts
- supabaseAdmin
- tieouts.ts
- review/page.tsx
- app/settings/page.tsx
- filings/[id]/page.tsx
- app/app/page.tsx
- payroll/payroll.test.ts
- invoice-pages.tsx
- form-1604e.ts
- Notice
- supabaseServer
- toDecimalString
- LinkButton
- review-form.tsx
- cx
- select.tsx
- Apple Design
- next
- testing.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- formatAmount
- Rules
- Animation Performance
- booksContext
- stat-cards.tsx
- social-button.tsx
- theme-toggle.tsx
- quote/page.tsx
- books/reports/statements/page.tsx
- PageHeader
- portal/documents/page.tsx
- button.tsx
- Pro components
- server-only
- acting-approver/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- notification.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- opening.ts
- Recipes
- payroll/data.ts
- BoardUI page patterns
- Pro templates
- workpapers/page.tsx
- ledger/books.ts
- ui.ts
- form-2307.tsx
- Skeleton
- boardui
- rates.ts
- slots.ts
- proxy.ts
- review-form.tsx
- profile.ts
- vitest
- Opening balances: checklist for any cut-off
- assets/schedule.ts
- portal/page.tsx
- lib/books/actions.ts
- package.json
- calendar/callback/route.ts
- apply-migrations.sh
- buildSawt
- cycle/page.tsx
- fixed-assets/forms.tsx
- Centavos
- staff/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- [month]/page.tsx
- upload/page.tsx
- read.test.ts
- missing-2307/page.tsx
- return-file-actions.ts
- Building UIs with BoardUI
- filings/actions.ts
- gemini.ts
- work/load.ts
- proof-upload.tsx
- getIdentity
- ticked-allocation.test.ts
- proposal/[token]/page.tsx
- ledger.test.ts
- parties/new/page.tsx
- eslint.config.mjs
- generate-qap-fixture.mjs
- formatAmount
- ledger/types.ts
- calendar/staff.ts
- register-books.test.ts
- safeguards.ts
- parts.ts
- documents/[id]/page.tsx
- register-xlsx.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- books-migration.test.ts
- fixed-assets.test.ts
- toCentavos
- settings/actions.ts
- clients/actions.ts
- acting-approver.test.ts
- registrations/forms.tsx
- binder/page.tsx
- db.test.ts
- returns-sign-off.test.ts
- onboarding/page.tsx
- workpapers/load.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 293 edges
2. `cx` - 237 edges
3. `Skeleton()` - 230 edges
4. `Notice()` - 226 edges
5. `react` - 224 edges
6. `Button()` - 194 edges
7. `next` - 183 edges
8. `Badge()` - 163 edges
9. `Card()` - 163 edges
10. `vitest` - 146 edges

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

## Communities (165 total, 19 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (41): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page() (+33 more)

### Community 1 - "engine.ts"
Cohesion: 0.08
Nodes (45): TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, EfpsGroup, FilingChannel (+37 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "manilaToday"
Cohesion: 0.11
Nodes (32): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+24 more)

### Community 4 - "ledger/data.ts"
Cohesion: 0.11
Nodes (36): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+28 more)

### Community 5 - "package.json"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

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

### Community 11 - "requireStaff"
Cohesion: 0.29
Nodes (17): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+9 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "app/app/layout.tsx"
Cohesion: 0.09
Nodes (29): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+21 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (39): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine() (+31 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.08
Nodes (71): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), codes, PNL, COA_TEMPLATES (+63 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (29): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+21 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (68): CELL, FirmParallelRunPage(), monthShort(), Summary(), KIND, REASON, Section(), shortDate() (+60 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 45 - "index.ts"
Cohesion: 0.04
Nodes (40): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+32 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (61): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+53 more)

### Community 47 - "modal.tsx"
Cohesion: 0.09
Nodes (45): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+37 more)

### Community 48 - "filings/run.ts"
Cohesion: 0.12
Nodes (31): generateFilingsNow(), GenerateState, GenerateButton(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting() (+23 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.19
Nodes (20): server-only, bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book() (+12 more)

### Community 51 - "tieouts.ts"
Cohesion: 0.13
Nodes (15): ExplainState, explainTieAction(), SIGNED, RegisterLine, purchases(), sales(), base, books (+7 more)

### Community 52 - "review/page.tsx"
Cohesion: 0.15
Nodes (18): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), Returns(), Queue(), ReviewPage(), Row (+10 more)

### Community 53 - "app/settings/page.tsx"
Cohesion: 0.14
Nodes (29): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+21 more)

### Community 54 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (37): FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText, Filing() (+29 more)

### Community 55 - "app/app/page.tsx"
Cohesion: 0.11
Nodes (27): RemoveAssignmentButton(), RemoveClientUserButton(), NotesCard(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, ClientList() (+19 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (81): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+73 more)

### Community 57 - "invoice-pages.tsx"
Cohesion: 0.14
Nodes (22): INVOICE_KINDS, InvoiceView(), Kind, Props, STATUS_TONE, TransactionJournal(), loadClientParties(), loadEntryLines() (+14 more)

### Community 58 - "form-1604e.ts"
Cohesion: 0.05
Nodes (72): client, INPUTS, MONTH, PAYSLIP_COLUMNS, payslipSchedule(), agentBackground(), agentErrors(), tinDashed() (+64 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (75): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+67 more)

### Community 60 - "supabaseServer"
Cohesion: 0.07
Nodes (61): removeAssignmentAction(), setupMissingChartsAction(), addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction() (+53 more)

### Community 61 - "toDecimalString"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 62 - "LinkButton"
Cohesion: 0.19
Nodes (17): Batch(), BatchPage(), one(), toCentavos(), MonthSelect(), PrintAll(), PrintAll2316Page(), Certificates() (+9 more)

### Community 63 - "review-form.tsx"
Cohesion: 0.18
Nodes (13): DocReviewActions(), BookingFields(), DirectoryParty, ENTRY_STATUS, ONLY_FOR, ReviewForm(), typeLabel, ReplyForm() (+5 more)

### Community 64 - "cx"
Cohesion: 0.04
Nodes (61): Counter(), CounterColor, CounterProps, styles, StatusDot(), StatusDotColor, StatusDotProps, styles (+53 more)

### Community 65 - "select.tsx"
Cohesion: 0.08
Nodes (38): SheetPreview(), Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem() (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "next"
Cohesion: 0.08
Nodes (28): nextConfig, next, zod, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton() (+20 more)

### Community 68 - "testing.ts"
Cohesion: 0.11
Nodes (29): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+21 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (46): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+38 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (57): DocumentReviewPage(), Review(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage() (+49 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (40): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+32 more)

### Community 72 - "formatAmount"
Cohesion: 0.11
Nodes (40): BankAccountsRoute(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+32 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "booksContext"
Cohesion: 0.35
Nodes (10): booksContext(), one(), Print(), Print2307Page(), ParallelRun(), ParallelRunPage(), quarterMonths(), Form2307Sheet() (+2 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (45): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+37 more)

### Community 77 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (35): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+27 more)

### Community 79 - "quote/page.tsx"
Cohesion: 0.05
Nodes (70): loadTaxOnFee(), PriceRow, EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview() (+62 more)

### Community 80 - "books/reports/statements/page.tsx"
Cohesion: 0.18
Nodes (14): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+6 more)

### Community 81 - "PageHeader"
Cohesion: 0.11
Nodes (43): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+35 more)

### Community 82 - "portal/documents/page.tsx"
Cohesion: 0.16
Nodes (17): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+9 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (31): @remixicon/react, ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+23 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "server-only"
Cohesion: 0.15
Nodes (16): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+8 more)

### Community 86 - "acting-approver/page.tsx"
Cohesion: 0.15
Nodes (28): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+20 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (68): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote() (+60 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (27): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "notification.tsx"
Cohesion: 0.06
Nodes (37): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CHIP_COLORS, ChipColor (+29 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (36): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState (+28 more)

### Community 94 - "opening.ts"
Cohesion: 0.14
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.16
Nodes (29): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), certificatesFromRaw(), loadEntries(), loadPriorEmployers(), loadStored(), payAccountsOf() (+21 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "workpapers/page.tsx"
Cohesion: 0.19
Nodes (19): noteAction(), raiseNoteAction(), signWorkpaperAction(), tickAdjustmentAction(), ExplainForm(), amt(), one(), shiftMonth() (+11 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (46): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+38 more)

### Community 101 - "ui.ts"
Cohesion: 0.07
Nodes (52): blankLine(), InvoiceForm(), InvoiceFormValue, SettingsPage(), SettingsRoute(), fmt(), OpenInvoice, SettlementForm() (+44 more)

### Community 102 - "form-2307.tsx"
Cohesion: 0.22
Nodes (13): Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set(), padded(), PartyFields() (+5 more)

### Community 103 - "Skeleton"
Cohesion: 0.09
Nodes (40): react, InvoiceEdit(), JournalEntryRoute(), NewEntry(), NewEntryPage(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage() (+32 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "slots.ts"
Cohesion: 0.23
Nodes (14): addDays(), byDay(), DAY_LABEL, freeSlots(), isFree(), LabelledDay, manilaDate(), overlaps() (+6 more)

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "review-form.tsx"
Cohesion: 0.06
Nodes (52): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), Booking, BooksChoices() (+44 more)

### Community 109 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+50 more)

### Community 110 - "vitest"
Cohesion: 0.03
Nodes (33): pg, vitest, ctx, input, root, root, root, root (+25 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "assets/schedule.ts"
Cohesion: 0.21
Nodes (18): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), loadAssets(), Row (+10 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.09
Nodes (44): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+36 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (30): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+22 more)

### Community 115 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, tsx@^4.23.15, @types/node@^20, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.20
Nodes (18): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+10 more)

### Community 118 - "buildSawt"
Cohesion: 0.11
Nodes (52): SaleSplit, Periods, buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv(), sawtDat() (+44 more)

### Community 119 - "cycle/page.tsx"
Cohesion: 0.10
Nodes (34): Cycle(), CyclePage(), CycleWithClient, DocRow, FilingsTabs(), FilingsTabsFor(), Section, SECTIONS (+26 more)

### Community 120 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm()

### Community 121 - "Centavos"
Cohesion: 0.05
Nodes (70): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), Lines(), lineStyle, Problems(), sameFigures() (+62 more)

### Community 122 - "staff/page.tsx"
Cohesion: 0.42
Nodes (7): BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (42): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+34 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.07
Nodes (56): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+48 more)

### Community 126 - "[month]/page.tsx"
Cohesion: 0.17
Nodes (17): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+9 more)

### Community 127 - "upload/page.tsx"
Cohesion: 0.15
Nodes (24): DocumentsCard(), when(), shift(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload() (+16 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (73): applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), ITEM_KINDS, PayrollItem (+65 more)

### Community 129 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 130 - "return-file-actions.ts"
Cohesion: 0.13
Nodes (28): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, esubmissionMailEnv(), accessToken(), call(), headerOf() (+20 more)

### Community 131 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 132 - "filings/actions.ts"
Cohesion: 0.20
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+9 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 134 - "work/load.ts"
Cohesion: 0.17
Nodes (19): Action(), MyWork(), MyWorkPage(), short(), TONE, lastMonth(), loadMyWork(), MyWork (+11 more)

### Community 135 - "proof-upload.tsx"
Cohesion: 0.60
Nodes (5): METHODS, ProofUpload(), send(), startProofUpload(), submitProof()

### Community 136 - "getIdentity"
Cohesion: 0.17
Nodes (22): RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), Thread() (+14 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "proposal/[token]/page.tsx"
Cohesion: 0.17
Nodes (17): metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage(), Lockup(), Mark() (+9 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 144 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.14
Nodes (9): outDir, pkgDir, require, { version }, api, ctx, fn, rows (+1 more)

### Community 146 - "formatAmount"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.11
Nodes (25): Access, STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, ChecklistInput (+17 more)

### Community 148 - "calendar/staff.ts"
Cohesion: 0.17
Nodes (19): Interval, Admin, Connection, PersonWeek, teamWeek(), accessToken(), CALENDAR_SCOPES, CalendarEvent (+11 more)

### Community 150 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 152 - "safeguards.ts"
Cohesion: 0.08
Nodes (46): GET(), TAX_TYPES, CoverageClient, coverageGaps(), Gap, GapKind, isWeekend(), parseIso() (+38 more)

### Community 153 - "parts.ts"
Cohesion: 0.08
Nodes (57): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+49 more)

### Community 155 - "documents/[id]/page.tsx"
Cohesion: 0.11
Nodes (29): BOOKED_TYPES, loadBooking(), ReadPayrollButton(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths() (+21 more)

### Community 160 - "register-xlsx.ts"
Cohesion: 0.09
Nodes (33): RFC-4180, exceljs, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS (+25 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (16): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+8 more)

### Community 163 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 166 - "toCentavos"
Cohesion: 0.09
Nodes (37): file(), GET(), safe(), PayrollDocument(), PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview() (+29 more)

### Community 168 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 174 - "clients/actions.ts"
Cohesion: 0.07
Nodes (47): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setClientStatusAction(), setIncomeTaxMethodAction(), updateClientAction() (+39 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 177 - "registrations/forms.tsx"
Cohesion: 0.07
Nodes (58): ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+50 more)

### Community 178 - "binder/page.tsx"
Cohesion: 0.39
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, SIGNED_REFS

### Community 181 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (29): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+21 more)

### Community 193 - "workpapers/load.ts"
Cohesion: 0.13
Nodes (23): amt(), ApprovalMemo(), Db, TIE, Adjustment, c(), loadPeriodFile(), monthEnd() (+15 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1330 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `engine.ts`, `return-file-actions.ts`, `read.test.ts`, `filings/actions.ts`, `package.json`, `gemini.ts`, `work/load.ts`, `year-end/page.tsx`, `ticked-allocation.test.ts`, `ledger.test.ts`, `statements.ts`, `ledger/types.ts`, `vat.ts`, `register-books.test.ts`, `safeguards.ts`, `parts.ts`, `documents/[id]/page.tsx`, `calendar/page.tsx`, `books-migration.test.ts`, `fixed-assets.test.ts`, `lock-bar.tsx`, `settings/actions.ts`, `registrations/forms.tsx`, `scores/page.tsx`, `tests/register.test.ts`, `index.ts`, `clients/actions.ts`, `acting-approver.test.ts`, `filings/run.ts`, `registrations/forms.tsx`, `tieouts.ts`, `review/page.tsx`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `app/app/page.tsx`, `payroll/payroll.test.ts`, `invoice-pages.tsx`, `onboarding/page.tsx`, `form-1604e.ts`, `db.test.ts`, `toDecimalString`, `returns-sign-off.test.ts`, `workpapers/load.ts`, `next`, `testing.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `theme-toggle.tsx`, `quote/page.tsx`, `books/reports/statements/page.tsx`, `PageHeader`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `leads/[id]/page.tsx`, `opening.ts`, `ledger/books.ts`, `ui.ts`, `form-2307.tsx`, `rates.ts`, `slots.ts`, `review-form.tsx`, `profile.ts`, `assets/schedule.ts`, `portal/page.tsx`, `package.json`, `calendar/callback/route.ts`, `cycle/page.tsx`, `Centavos`, `batch/register.ts`, `quote/page.tsx`, `[month]/page.tsx`, `upload/page.tsx`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1085972850678733 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `form-2307.ts`, `manilaToday`, `ledger/data.ts`, `year-end/page.tsx`, `requireStaff`, `app/app/layout.tsx`, `dependencies`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `payroll/forms.tsx`, `modal.tsx`, `filings/run.ts`, `supabaseAdmin`, `tieouts.ts`, `review/page.tsx`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `app/app/page.tsx`, `invoice-pages.tsx`, `Notice`, `supabaseServer`, `LinkButton`, `review-form.tsx`, `cx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `formatAmount`, `booksContext`, `theme-toggle.tsx`, `quote/page.tsx`, `books/reports/statements/page.tsx`, `PageHeader`, `portal/documents/page.tsx`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `payroll/data.ts`, `workpapers/page.tsx`, `ledger/books.ts`, `ui.ts`, `form-2307.tsx`, `Skeleton`, `proxy.ts`, `review-form.tsx`, `profile.ts`, `assets/schedule.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `package.json`, `calendar/callback/route.ts`, `cycle/page.tsx`, `fixed-assets/forms.tsx`, `Centavos`, `batch/register.ts`, `quote/page.tsx`, `[month]/page.tsx`, `upload/page.tsx`, `read.test.ts`, `missing-2307/page.tsx`, `return-file-actions.ts`, `filings/actions.ts`, `work/load.ts`, `proof-upload.tsx`, `getIdentity`, `proposal/[token]/page.tsx`, `formatAmount`, `ledger/types.ts`, `safeguards.ts`, `parts.ts`, `documents/[id]/page.tsx`, `toCentavos`, `settings/actions.ts`, `clients/actions.ts`, `registrations/forms.tsx`, `binder/page.tsx`, `onboarding/page.tsx`, `workpapers/load.ts`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08282828282828283 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `form-2307.ts`, `manilaToday`, `ledger/data.ts`, `year-end/page.tsx`, `requireStaff`, `app/app/layout.tsx`, `dependencies`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `payroll/forms.tsx`, `modal.tsx`, `filings/run.ts`, `supabaseAdmin`, `tieouts.ts`, `review/page.tsx`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `app/app/page.tsx`, `invoice-pages.tsx`, `Notice`, `supabaseServer`, `LinkButton`, `review-form.tsx`, `cx`, `select.tsx`, `next`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `formatAmount`, `booksContext`, `stat-cards.tsx`, `social-button.tsx`, `theme-toggle.tsx`, `quote/page.tsx`, `books/reports/statements/page.tsx`, `PageHeader`, `portal/documents/page.tsx`, `button.tsx`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `notification.tsx`, `leads/[id]/page.tsx`, `payroll/data.ts`, `workpapers/page.tsx`, `ledger/books.ts`, `ui.ts`, `form-2307.tsx`, `review-form.tsx`, `profile.ts`, `assets/schedule.ts`, `portal/page.tsx`, `package.json`, `calendar/callback/route.ts`, `cycle/page.tsx`, `fixed-assets/forms.tsx`, `Centavos`, `staff/page.tsx`, `batch/register.ts`, `quote/page.tsx`, `[month]/page.tsx`, `upload/page.tsx`, `missing-2307/page.tsx`, `work/load.ts`, `proof-upload.tsx`, `getIdentity`, `proposal/[token]/page.tsx`, `parties/new/page.tsx`, `formatAmount`, `parts.ts`, `documents/[id]/page.tsx`, `calendar/page.tsx`, `toCentavos`, `clients/actions.ts`, `registrations/forms.tsx`, `binder/page.tsx`, `onboarding/page.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._