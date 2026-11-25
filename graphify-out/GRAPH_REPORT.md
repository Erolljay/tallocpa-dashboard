# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 784 files · ~625,113 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4905 nodes · 17047 edges · 196 communities (168 shown, 28 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 142 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `26f476eb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- filings/run.ts
- migrate.yml
- manilaToday
- arap.ts
- package.json
- lib/books/actions.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- supabaseServer
- Sign-in & Setup Docs
- clients/[id]/page.tsx
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
- requireStaff
- index.ts
- payroll/forms.tsx
- modal.tsx
- lock-bar.tsx
- scripts
- supabaseAdmin
- workpapers/load.ts
- deadlines/page.tsx
- lib/books/actions.ts
- review/page.tsx
- app/app/page.tsx
- money.ts
- Skeleton
- form-1604e.ts
- Notice
- requireOwner
- pending-review.tsx
- steps.ts
- ui.tsx
- cx
- select.tsx
- Apple Design
- proposal/[token]/page.tsx
- testing.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- invoice-pages.tsx
- Rules
- Animation Performance
- IsoDate
- stat-cards.tsx
- social-button.tsx
- theme-toggle.tsx
- quote.ts
- notification.tsx
- Badge
- parties/page.tsx
- button.tsx
- Pro components
- server-only
- acting-approver/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
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
- documents/[id]/page.tsx
- invoice-pages.tsx
- boardui
- rates.ts
- books/reports/statements/page.tsx
- proxy.ts
- [id]/returns/page.tsx
- profile.ts
- ref_node_fs
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- portal/page.tsx
- lib/books/actions.ts
- ledger/data.ts
- calendar/callback/route.ts
- apply-migrations.sh
- buildSawt
- PageHeader
- filings/[id]/page.tsx
- returns/load.ts
- LinkButton
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- [month]/page.tsx
- cycle/page.tsx
- read.test.ts
- checkbox.tsx
- return-file-actions.ts
- form-2307.tsx
- filings/actions.ts
- fields.ts
- work/load.ts
- manilaToday
- documents/labels.ts
- ticked-allocation.test.ts
- pg
- ledger.test.ts
- ref_node_path
- react
- Centavos
- Card
- Building UIs with BoardUI
- generate-qap-fixture.mjs
- formatAmount
- vitest
- calendar/staff.ts
- portalContext
- leads/[id]/page.tsx
- names.ts
- safeguards.ts
- parts.ts
- engine.ts
- app/documents/page.tsx
- workpapers.test.ts
- funnel.test.ts
- booksContext
- book-income.ts
- register-xlsx.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- books-migration.test.ts
- tests/books.test.ts
- fixed-assets.test.ts
- payroll-read-actions.ts
- file-upload.tsx
- client-reports.test.ts
- package.json
- worksheet/page.tsx
- staff/page.tsx
- parallel-run.test.ts
- registrations/[id]/page.tsx
- clients/actions.ts
- acting-approver.test.ts
- [employeeId]/page.tsx
- eslint.config.mjs
- binder/page.tsx
- db.test.ts
- templatePayload
- returns-sign-off.test.ts
- ledger-lock.test.ts
- books-2307.test.ts
- leads-pipeline.test.ts
- portal-statements-approval.test.ts
- batch/page.tsx
- cycle-forms.tsx
- fees.test.ts
- ledger-documents.test.ts
- tests/payroll.test.ts
- adjustments.test.ts
- batch-upload.test.ts
- payroll-books.test.ts
- portal-home.test.ts
- year-end.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 293 edges
2. `cx` - 237 edges
3. `Skeleton()` - 230 edges
4. `Notice()` - 226 edges
5. `react` - 224 edges
6. `Button()` - 194 edges
7. `next` - 183 edges
8. `Card()` - 163 edges
9. `Badge()` - 163 edges
10. `vitest` - 142 edges

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

## Communities (196 total, 28 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (40): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one(), portal2307() (+32 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.09
Nodes (26): generateFilingsNow(), GenerateState, GenerateButton(), EfpsGroup, FilingChannel, Frequency, PeriodFilter, ACTIVE (+18 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "manilaToday"
Cohesion: 0.12
Nodes (34): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+26 more)

### Community 4 - "arap.ts"
Cohesion: 0.13
Nodes (25): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+17 more)

### Community 5 - "package.json"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, tsx@^4.23.15, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "lib/books/actions.ts"
Cohesion: 0.08
Nodes (31): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, AmendmentFlag, BooksMonthRow (+23 more)

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

### Community 11 - "supabaseServer"
Cohesion: 0.07
Nodes (37): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), markCwtFollowedUpAction() (+29 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "clients/[id]/page.tsx"
Cohesion: 0.09
Nodes (40): AssignForm(), ClientUserForm(), EngagementForm(), IncomeTaxMethodForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), addClientFile() (+32 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (40): defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES, FsLine, FsLineKey (+32 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
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

### Community 40 - "lock-bar.tsx"
Cohesion: 0.14
Nodes (25): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+17 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (63): CELL, FirmParallelRunPage(), monthShort(), Summary(), atcRows(), BookInvoiceRow, compareParallelRun(), differs() (+55 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.09
Nodes (30): exceljs, monthlyTable(), monthlyWithholding(), cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS (+22 more)

### Community 44 - "requireStaff"
Cohesion: 0.24
Nodes (21): setIncomeTaxMethodAction(), Filing(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile() (+13 more)

### Community 45 - "index.ts"
Cohesion: 0.09
Nodes (16): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+8 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (61): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+53 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (39): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+31 more)

### Community 48 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+25 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (22): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+14 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 53 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (27): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+19 more)

### Community 54 - "review/page.tsx"
Cohesion: 0.28
Nodes (8): Queue(), ReviewPage(), Row, Section(), QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 55 - "app/app/page.tsx"
Cohesion: 0.18
Nodes (15): NotesCard(), ClientNoteForm(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry, noteEntry() (+7 more)

### Community 56 - "money.ts"
Cohesion: 0.09
Nodes (39): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+31 more)

### Community 57 - "Skeleton"
Cohesion: 0.10
Nodes (44): BankAccountsRoute(), fmtDate(), fmtMonth(), BooksFrame(), BooksList(), Column, ListRow, RowLink() (+36 more)

### Community 58 - "form-1604e.ts"
Cohesion: 0.06
Nodes (57): client, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel(), EwtLine (+49 more)

### Community 59 - "Notice"
Cohesion: 0.11
Nodes (56): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+48 more)

### Community 60 - "requireOwner"
Cohesion: 0.27
Nodes (14): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+6 more)

### Community 61 - "pending-review.tsx"
Cohesion: 0.13
Nodes (25): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), BooksChoices(), Codes (+17 more)

### Community 62 - "steps.ts"
Cohesion: 0.07
Nodes (58): ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+50 more)

### Community 63 - "ui.tsx"
Cohesion: 0.13
Nodes (18): NewParty(), NewPartyPage(), AddBranchForm(), BranchRowForm(), Branches(), BranchesPage(), METHODS, ProofUpload() (+10 more)

### Community 64 - "cx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "select.tsx"
Cohesion: 0.06
Nodes (52): SheetPreview(), Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext (+44 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "proposal/[token]/page.tsx"
Cohesion: 0.16
Nodes (18): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), SignInForm(), metadata, Proposal() (+10 more)

### Community 68 - "testing.ts"
Cohesion: 0.12
Nodes (27): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+19 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (49): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+41 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.05
Nodes (75): DocumentReviewPage(), Review(), mergePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one() (+67 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (40): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+32 more)

### Community 72 - "invoice-pages.tsx"
Cohesion: 0.09
Nodes (42): SearchParams, INVOICE_KINDS, InvoiceView(), Kind, Props, STATUS_TONE, JournalView(), PaymentsNewPage() (+34 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "IsoDate"
Cohesion: 0.19
Nodes (14): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+6 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView() (+42 more)

### Community 77 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (35): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+27 more)

### Community 79 - "quote.ts"
Cohesion: 0.05
Nodes (65): PriceRow, requestQuoteAction(), SERVICES, StartState, EstimatedProfile, estimateProfile(), has(), items (+57 more)

### Community 80 - "notification.tsx"
Cohesion: 0.05
Nodes (42): AvatarColor, AvatarProps, AvatarSize, styles, Counter(), CounterColor, CounterProps, styles (+34 more)

### Community 81 - "Badge"
Cohesion: 0.19
Nodes (18): ClientList(), ClientsPage(), Row, CyclePage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS (+10 more)

### Community 82 - "parties/page.tsx"
Cohesion: 0.10
Nodes (31): FormState, ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient(), EditClientPage() (+23 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "server-only"
Cohesion: 0.15
Nodes (18): server-only, GET(), GET(), digestMessage(), DigestRow, longDay(), peso, time() (+10 more)

### Community 86 - "acting-approver/page.tsx"
Cohesion: 0.19
Nodes (19): ActingState, appointActingAction(), endActingAction(), refresh(), EndButton(), Acting(), ActingApproverPage(), Approval (+11 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (64): PortalClient, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat() (+56 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (29): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+21 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.08
Nodes (32): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+24 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (34): BookingLink(), ConvertForm(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), Person, ProposalForm(), ReopenForm() (+26 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.08
Nodes (63): @supabase/supabase-js, GridRow, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+55 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "workpapers/page.tsx"
Cohesion: 0.14
Nodes (27): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+19 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (48): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_TITLES (+40 more)

### Community 101 - "ui.ts"
Cohesion: 0.08
Nodes (38): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), InvoiceInput, loadModuleCounts(), appliesTo(), canGoOn() (+30 more)

### Community 102 - "documents/[id]/page.tsx"
Cohesion: 0.10
Nodes (42): file(), GET(), safe(), BOOKED_TYPES, PayrollDocument(), ColumnMapping(), KIND_LABEL, MATCH_BADGE (+34 more)

### Community 103 - "invoice-pages.tsx"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.24
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+10 more)

### Community 106 - "books/reports/statements/page.tsx"
Cohesion: 0.19
Nodes (16): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+8 more)

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "[id]/returns/page.tsx"
Cohesion: 0.18
Nodes (15): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), Returns(), booksStillOpen(), filingsBooksReady(), filingsNeedingAmendment() (+7 more)

### Community 109 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 110 - "ref_node_fs"
Cohesion: 0.11
Nodes (7): ctx, input, root, HASH, LEAD, root, root

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.17
Nodes (22): fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, books(), checkInvoice(), checkSettlement(), invoiceModule() (+14 more)

### Community 115 - "ledger/data.ts"
Cohesion: 0.08
Nodes (49): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), Access, OpeningChecklist() (+41 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.19
Nodes (19): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+11 more)

### Community 118 - "buildSawt"
Cohesion: 0.17
Nodes (36): Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, addMonths(), branchCode() (+28 more)

### Community 119 - "PageHeader"
Cohesion: 0.18
Nodes (19): Cycle(), CycleWithClient, DocRow, ExceptionRow, shift(), CycleRow, EXCEPTION_DECISIONS, ExceptionDecision (+11 more)

### Community 120 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (35): FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText, FilingFile (+27 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.14
Nodes (22): FinancialStatements, withNonDeductible(), dayBefore(), FilingRow, ListedDocument, listInvoices(), loadEwtRemittances(), loadEwtYear() (+14 more)

### Community 122 - "LinkButton"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.07
Nodes (64): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+56 more)

### Community 126 - "[month]/page.tsx"
Cohesion: 0.15
Nodes (19): MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p() (+11 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.25
Nodes (14): MonthComplete(), SentRow, TimelineRow, closeCycleAction(), confirmMonthAction(), CycleState, decideExceptionAction(), nothingToSubmitAction() (+6 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (77): RFC-4180, geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES (+69 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "return-file-actions.ts"
Cohesion: 0.12
Nodes (30): RFC-2047, RFC-2822, GET(), DatFiles, datFiles(), Db, accessToken(), call() (+22 more)

### Community 131 - "form-2307.tsx"
Cohesion: 0.20
Nodes (15): PortalPrint2307Page(), Print(), portal2307Href(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+7 more)

### Community 132 - "filings/actions.ts"
Cohesion: 0.16
Nodes (20): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+12 more)

### Community 133 - "fields.ts"
Cohesion: 0.06
Nodes (43): BatchRow, checkFields(), Issue, num(), msgs(), ok, FieldKey, keys (+35 more)

### Community 134 - "work/load.ts"
Cohesion: 0.15
Nodes (22): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), addDays(), parseIso() (+14 more)

### Community 135 - "manilaToday"
Cohesion: 0.29
Nodes (12): accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+4 more)

### Community 136 - "documents/labels.ts"
Cohesion: 0.10
Nodes (36): DocReviewActions(), Doc, DocumentsCard(), when(), Row, Doc, Documents(), FolderKey (+28 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "pg"
Cohesion: 0.11
Nodes (6): pg, root, root, root, root, Row

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_path"
Cohesion: 0.10
Nodes (7): outDir, pkgDir, require, { version }, root, root, root

### Community 141 - "react"
Cohesion: 0.19
Nodes (10): react, InvoiceEdit(), JournalEntryRoute(), NewEntry(), NewEntryPage(), PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage(), SalesInvoicesEditPage() (+2 more)

### Community 142 - "Centavos"
Cohesion: 0.07
Nodes (40): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), Parties(), PartyRow() (+32 more)

### Community 143 - "Card"
Cohesion: 0.28
Nodes (18): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+10 more)

### Community 144 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "formatAmount"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 147 - "vitest"
Cohesion: 0.20
Nodes (6): vitest, Cutoff, cutoffOf(), ChecklistInput, base(), root

### Community 148 - "calendar/staff.ts"
Cohesion: 0.17
Nodes (19): Interval, Admin, Connection, PersonWeek, teamWeek(), accessToken(), CALENDAR_SCOPES, CalendarEvent (+11 more)

### Community 149 - "portalContext"
Cohesion: 0.13
Nodes (32): RequestDetail(), RequestPage(), Row, portalContext(), PortalRequest(), RequestDetail(), PortalRequests(), Requests() (+24 more)

### Community 150 - "leads/[id]/page.tsx"
Cohesion: 0.23
Nodes (17): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState (+9 more)

### Community 151 - "names.ts"
Cohesion: 0.25
Nodes (10): zod, amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text() (+2 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.09
Nodes (40): SafeguardsNotice(), Gap, isWeekend(), Email, line(), longDay(), NEEDS, ownerEmail() (+32 more)

### Community 153 - "parts.ts"
Cohesion: 0.09
Nodes (26): client(), ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine (+18 more)

### Community 154 - "engine.ts"
Cohesion: 0.14
Nodes (23): compareIso(), lastDayOfMonth(), DeadlineRule, fiscalYearOf(), followsCalendarYear(), generateFilingInstances(), nextWorkingDay(), Obligation (+15 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (25): loadBooking(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+17 more)

### Community 156 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 157 - "funnel.test.ts"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 158 - "booksContext"
Cohesion: 0.31
Nodes (11): booksContext(), BooksContext, one(), Print(), Print2307Page(), ParallelRun(), ParallelRunPage(), quarterMonths() (+3 more)

### Community 159 - "book-income.ts"
Cohesion: 0.26
Nodes (10): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, bookIncome(), INCOME_GROUPS (+2 more)

### Community 160 - "register-xlsx.ts"
Cohesion: 0.16
Nodes (19): checkRegister(), fmt(), ID_HEADERS, norm(), normalizeTin(), parseName(), tinDigits(), TOTAL_HEADERS (+11 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (16): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+8 more)

### Community 163 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 164 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 166 - "payroll-read-actions.ts"
Cohesion: 0.35
Nodes (11): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), headerKey() (+3 more)

### Community 167 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 168 - "client-reports.test.ts"
Cohesion: 0.32
Nodes (7): PendingGlyph(), Arc(), SIZES, Spinner(), SpinnerGlyph(), SpinnerProps, SpinnerSize

### Community 169 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 170 - "worksheet/page.tsx"
Cohesion: 0.38
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 171 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 172 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 173 - "registrations/[id]/page.tsx"
Cohesion: 0.17
Nodes (29): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+21 more)

### Community 174 - "clients/actions.ts"
Cohesion: 0.08
Nodes (44): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction() (+36 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "[employeeId]/page.tsx"
Cohesion: 0.44
Nodes (7): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), loadPriorEmployers(), payAccountsOf()

### Community 177 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 178 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 180 - "templatePayload"
Cohesion: 0.12
Nodes (9): templatePayload(), as(), client(), root, root, as(), books(), root (+1 more)

### Community 181 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 183 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 184 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 186 - "batch/page.tsx"
Cohesion: 0.70
Nodes (4): Batch(), BatchPage(), one(), toCentavos()

### Community 187 - "cycle-forms.tsx"
Cohesion: 0.70
Nodes (4): CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton()

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1319 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `filings/run.ts`, `manilaToday`, `arap.ts`, `lib/books/actions.ts`, `clients/[id]/page.tsx`, `dependencies`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `requireStaff`, `payroll/forms.tsx`, `modal.tsx`, `lock-bar.tsx`, `supabaseAdmin`, `deadlines/page.tsx`, `lib/books/actions.ts`, `review/page.tsx`, `Skeleton`, `requireOwner`, `pending-review.tsx`, `steps.ts`, `ui.tsx`, `select.tsx`, `proposal/[token]/page.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `invoice-pages.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `Badge`, `parties/page.tsx`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `payroll/data.ts`, `workpapers/page.tsx`, `ledger/books.ts`, `ui.ts`, `documents/[id]/page.tsx`, `books/reports/statements/page.tsx`, `proxy.ts`, `[id]/returns/page.tsx`, `profile.ts`, `fixed-assets/page.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `ledger/data.ts`, `calendar/callback/route.ts`, `PageHeader`, `filings/[id]/page.tsx`, `LinkButton`, `batch/register.ts`, `quote/page.tsx`, `[month]/page.tsx`, `cycle/page.tsx`, `return-file-actions.ts`, `form-2307.tsx`, `filings/actions.ts`, `work/load.ts`, `manilaToday`, `documents/labels.ts`, `react`, `Centavos`, `Card`, `formatAmount`, `portalContext`, `leads/[id]/page.tsx`, `names.ts`, `app/documents/page.tsx`, `funnel.test.ts`, `booksContext`, `payroll-read-actions.ts`, `package.json`, `worksheet/page.tsx`, `registrations/[id]/page.tsx`, `clients/actions.ts`, `[employeeId]/page.tsx`, `binder/page.tsx`, `batch/page.tsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11346938775510204 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `filings/run.ts`, `manilaToday`, `lib/books/actions.ts`, `supabaseServer`, `clients/[id]/page.tsx`, `dependencies`, `statements.ts`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `requireStaff`, `payroll/forms.tsx`, `modal.tsx`, `lock-bar.tsx`, `supabaseAdmin`, `deadlines/page.tsx`, `lib/books/actions.ts`, `review/page.tsx`, `app/app/page.tsx`, `Skeleton`, `Notice`, `pending-review.tsx`, `steps.ts`, `ui.tsx`, `cx`, `select.tsx`, `proposal/[token]/page.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `invoice-pages.tsx`, `stat-cards.tsx`, `social-button.tsx`, `theme-toggle.tsx`, `notification.tsx`, `Badge`, `parties/page.tsx`, `button.tsx`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `leads/[id]/page.tsx`, `workpapers/page.tsx`, `ledger/books.ts`, `ui.ts`, `documents/[id]/page.tsx`, `books/reports/statements/page.tsx`, `[id]/returns/page.tsx`, `profile.ts`, `fixed-assets/page.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `ledger/data.ts`, `calendar/callback/route.ts`, `PageHeader`, `filings/[id]/page.tsx`, `LinkButton`, `quote/page.tsx`, `[month]/page.tsx`, `cycle/page.tsx`, `checkbox.tsx`, `form-2307.tsx`, `work/load.ts`, `documents/labels.ts`, `Centavos`, `Card`, `formatAmount`, `portalContext`, `leads/[id]/page.tsx`, `app/documents/page.tsx`, `funnel.test.ts`, `booksContext`, `calendar/page.tsx`, `file-upload.tsx`, `client-reports.test.ts`, `package.json`, `worksheet/page.tsx`, `staff/page.tsx`, `registrations/[id]/page.tsx`, `[employeeId]/page.tsx`, `binder/page.tsx`, `batch/page.tsx`, `cycle-forms.tsx`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09487179487179487 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `filings/run.ts`, `arap.ts`, `package.json`, `supabaseServer`, `clients/[id]/page.tsx`, `statements.ts`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `payroll/types.ts`, `index.ts`, `lock-bar.tsx`, `supabaseAdmin`, `workpapers/load.ts`, `deadlines/page.tsx`, `lib/books/actions.ts`, `review/page.tsx`, `app/app/page.tsx`, `money.ts`, `form-1604e.ts`, `pending-review.tsx`, `steps.ts`, `testing.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `IsoDate`, `theme-toggle.tsx`, `quote.ts`, `parties/page.tsx`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `leads/[id]/page.tsx`, `opening.ts`, `payroll/data.ts`, `workpapers/page.tsx`, `ledger/books.ts`, `ui.ts`, `invoice-pages.tsx`, `rates.ts`, `[id]/returns/page.tsx`, `profile.ts`, `ref_node_fs`, `fixed-assets/page.tsx`, `portal/page.tsx`, `calendar/callback/route.ts`, `PageHeader`, `filings/[id]/page.tsx`, `batch/register.ts`, `quote/page.tsx`, `[month]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `form-2307.tsx`, `filings/actions.ts`, `fields.ts`, `work/load.ts`, `ticked-allocation.test.ts`, `pg`, `ledger.test.ts`, `ref_node_path`, `portalContext`, `safeguards.ts`, `parts.ts`, `engine.ts`, `app/documents/page.tsx`, `workpapers.test.ts`, `book-income.ts`, `calendar/page.tsx`, `books-migration.test.ts`, `tests/books.test.ts`, `fixed-assets.test.ts`, `package.json`, `parallel-run.test.ts`, `clients/actions.ts`, `acting-approver.test.ts`, `db.test.ts`, `templatePayload`, `returns-sign-off.test.ts`, `ledger-lock.test.ts`, `books-2307.test.ts`, `leads-pipeline.test.ts`, `portal-statements-approval.test.ts`, `fees.test.ts`, `ledger-documents.test.ts`, `tests/payroll.test.ts`, `adjustments.test.ts`, `batch-upload.test.ts`, `payroll-books.test.ts`, `portal-home.test.ts`, `year-end.test.ts`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._