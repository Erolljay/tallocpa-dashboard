# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 796 files · ~639,572 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4955 nodes · 17198 edges · 185 communities (159 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 144 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `82592c0a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- engine.ts
- migrate.yml
- manilaToday
- public.ts
- package.json
- clients/[id]/page.tsx
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
- module-pages.tsx
- index.ts
- payroll/forms.tsx
- modal.tsx
- filings/run.ts
- scripts
- supabaseAdmin
- workpapers/page.tsx
- register-xlsx.ts
- app/settings/page.tsx
- filings/[id]/page.tsx
- notes.ts
- payroll/payroll.test.ts
- invoice-pages.tsx
- form-1604e.ts
- Notice
- collections/actions.ts
- toDecimalString
- Centavos
- lib/books/actions.ts
- cx
- select.tsx
- Apple Design
- sign-in-form.tsx
- testing.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- party-pages.tsx
- Rules
- Animation Performance
- safeguards-load.ts
- stat-cards.tsx
- social-button.tsx
- theme-toggle.tsx
- quote.ts
- books-lock.test.ts
- Badge
- documents/labels.ts
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
- settlement-pages.tsx
- ledger/books.ts
- ui.ts
- settings/actions.ts
- Skeleton
- boardui
- rates.ts
- brand/forms.tsx
- proxy.ts
- manilaToday
- profile.ts
- ref_node_path
- Opening balances: checklist for any cut-off
- assets/schedule.ts
- portal/page.tsx
- lib/books/actions.ts
- package.json
- calendar/callback/route.ts
- apply-migrations.sh
- buildSawt
- cycle/actions.ts
- documents/[id]/page.tsx
- Centavos
- @remixicon/react
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- toCentavos
- cycle/page.tsx
- read.test.ts
- missing-2307/page.tsx
- return-file-actions.ts
- fees/[id]/page.tsx
- parties/parties.test.ts
- gemini.ts
- work/load.ts
- [month]/page.tsx
- Textarea
- ticked-allocation.test.ts
- proposal-view.tsx
- ledger.test.ts
- template.ts
- booksContext
- parties/actions.ts
- parties/page.tsx
- eslint.config.mjs
- ref_node_fs
- fields.ts
- ledger/types.ts
- 2316/page.tsx
- file-upload.tsx
- register-books.test.ts
- ledger-lock.test.ts
- safeguards.ts
- parts.ts
- funnel.test.ts
- app/documents/page.tsx
- leads-pipeline.test.ts
- parallel-run.test.ts
- portal-statements-approval.test.ts
- holiday-list.ts
- grid.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- books-migration.test.ts
- templatePayload
- fixed-assets.test.ts
- toCentavos
- breadcrumb.tsx
- ocr/run.ts
- Building UIs with BoardUI
- tests/register.test.ts
- tests/books.test.ts
- ledger-documents.test.ts
- month-complete.test.ts
- supabaseServer
- acting-approver.test.ts
- tests/parties.test.ts
- registrations/forms.tsx
- tests/payroll.test.ts
- db.test.ts
- workpapers.test.ts
- returns-sign-off.test.ts
- payroll-books.test.ts
- onboarding/page.tsx
- money.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 294 edges
2. `cx` - 237 edges
3. `Skeleton()` - 230 edges
4. `Notice()` - 227 edges
5. `react` - 224 edges
6. `Button()` - 195 edges
7. `next` - 183 edges
8. `Card()` - 163 edges
9. `Badge()` - 163 edges
10. `vitest` - 148 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `generateFilings()` --calls--> `buildFilingRows()`  [EXTRACTED]
  supabase/tests/december-rehearsal.test.ts → src/lib/filings/generate.ts
- `worksheet()` --indirect_call--> `fromBooksRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/returns/source.ts
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (185 total, 26 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (52): BooksContext, load2307Staff(), Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print(), one(), portal2307() (+44 more)

### Community 1 - "engine.ts"
Cohesion: 0.08
Nodes (49): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+41 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "manilaToday"
Cohesion: 0.11
Nodes (34): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail(), PayNow(), credit() (+26 more)

### Community 4 - "public.ts"
Cohesion: 0.09
Nodes (33): requestQuoteAction(), SERVICES, StartState, count(), first(), pick(), profileFromQuery(), QuerySource (+25 more)

### Community 5 - "package.json"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, tsx@^4.23.15, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "clients/[id]/page.tsx"
Cohesion: 0.12
Nodes (29): FormState, removeAssignmentAction(), frequencyLabel, Props, StaffOptions(), DocumentsCard(), when(), AssignForm() (+21 more)

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
Cohesion: 0.11
Nodes (35): setIncomeTaxMethodAction(), addClientNoteAction(), NoteState, DashboardStats(), FilingTable(), Filing(), ActionButton(), EsubmissionControls() (+27 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "app/app/layout.tsx"
Cohesion: 0.11
Nodes (27): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+19 more)

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
Cohesion: 0.09
Nodes (72): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+64 more)

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
Cohesion: 0.06
Nodes (65): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+57 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (66): CELL, FirmParallelRunPage(), monthShort(), Summary(), KIND, REASON, Section(), shortDate() (+58 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "module-pages.tsx"
Cohesion: 0.11
Nodes (26): BankAccountsRoute(), BankAccounts(), dayBefore(), INVOICE_LABEL, Payslips(), Props, SettingsPage(), PayslipsRoute() (+18 more)

### Community 45 - "index.ts"
Cohesion: 0.07
Nodes (19): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+11 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (55): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+47 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (39): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+31 more)

### Community 48 - "filings/run.ts"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+20 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.12
Nodes (33): server-only, bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book() (+25 more)

### Community 51 - "workpapers/page.tsx"
Cohesion: 0.05
Nodes (76): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), Binder() (+68 more)

### Community 52 - "register-xlsx.ts"
Cohesion: 0.13
Nodes (25): Payroll(), PayrollPage(), sortItems(), CheckedRegister, checkRegister(), fmt(), ID_HEADERS, norm() (+17 more)

### Community 53 - "app/settings/page.tsx"
Cohesion: 0.13
Nodes (29): appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage(), accountSchema (+21 more)

### Community 54 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (47): FilingRow, FilingListRow, SignOffState, bookKind, BookRow, bookStatus, Event, eventText (+39 more)

### Community 55 - "notes.ts"
Cohesion: 0.20
Nodes (14): NotesCard(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry, noteEntry(), NoteRow (+6 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.07
Nodes (67): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+59 more)

### Community 57 - "invoice-pages.tsx"
Cohesion: 0.18
Nodes (16): INVOICE_KINDS, InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesListPage(), SalesInvoicesListPage(), loadInvoices() (+8 more)

### Community 58 - "form-1604e.ts"
Cohesion: 0.05
Nodes (80): lookupAtc(), client, row(), BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q (+72 more)

### Community 59 - "Notice"
Cohesion: 0.07
Nodes (99): ClientForm(), BatchUpload(), AccountForm(), AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker() (+91 more)

### Community 60 - "collections/actions.ts"
Cohesion: 0.24
Nodes (16): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+8 more)

### Community 61 - "toDecimalString"
Cohesion: 0.11
Nodes (28): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+20 more)

### Community 62 - "Centavos"
Cohesion: 0.08
Nodes (28): BatchCheck, Note, StatementLine, Bucket, NewEmployeeRow, ACCOUNTS, birLabel(), bookkeepingPart() (+20 more)

### Community 63 - "lib/books/actions.ts"
Cohesion: 0.11
Nodes (24): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, CodeSource, Db (+16 more)

### Community 64 - "cx"
Cohesion: 0.05
Nodes (51): react-aria-components, MonthComplete(), Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes (+43 more)

### Community 65 - "select.tsx"
Cohesion: 0.08
Nodes (38): SheetPreview(), Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem() (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "sign-in-form.tsx"
Cohesion: 0.21
Nodes (13): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+5 more)

### Community 68 - "testing.ts"
Cohesion: 0.16
Nodes (21): vitest, form1701, form1702RT, year, individual, individual, amounts(), cert2307() (+13 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (46): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+38 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.16
Nodes (19): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, PARTY_COLUMNS (+11 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.13
Nodes (47): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+39 more)

### Community 72 - "party-pages.tsx"
Cohesion: 0.16
Nodes (15): SearchParams, BooksList(), Column, ListRow, RowLink(), CustomersRoute(), EmployeesRoute(), JournalRoute() (+7 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "safeguards-load.ts"
Cohesion: 0.16
Nodes (20): ClientValues, PlannedObligation, TAX_TYPES, TaxpayerType, TaxType, CoverageClient, coverageGaps(), Gap (+12 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (37): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+29 more)

### Community 77 - "social-button.tsx"
Cohesion: 0.18
Nodes (13): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButton(), SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps (+5 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (35): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+27 more)

### Community 79 - "quote.ts"
Cohesion: 0.13
Nodes (29): EstimatedProfile, estimateProfile(), ExistingClient, has(), buildQuote(), cents(), CustomQuoteItem, documentBand() (+21 more)

### Community 81 - "Badge"
Cohesion: 0.17
Nodes (23): PreviewTable(), RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail() (+15 more)

### Community 82 - "documents/labels.ts"
Cohesion: 0.13
Nodes (23): Doc, ExceptionRow, Row, portalContext(), Doc, Documents(), FolderKey, FOLDERS (+15 more)

### Community 83 - "button.tsx"
Cohesion: 0.06
Nodes (38): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+30 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "server-only"
Cohesion: 0.11
Nodes (22): GET(), GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage(), DigestRow, longDay() (+14 more)

### Community 86 - "acting-approver/page.tsx"
Cohesion: 0.14
Nodes (24): Queue(), ReviewPage(), Row, Section(), EndButton(), Acting(), ActingApproverPage(), Approval (+16 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (64): PortalClient, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat() (+56 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (25): HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps, inputElementClassName (+17 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "notification.tsx"
Cohesion: 0.04
Nodes (50): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CHIP_COLORS, ChipColor (+42 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.13
Nodes (35): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+27 more)

### Community 94 - "opening.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.14
Nodes (32): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), Form2316Signatory, mmdd(), paidInYear() (+24 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "settlement-pages.tsx"
Cohesion: 0.09
Nodes (44): fmtDate(), InvoiceView(), JournalView(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage() (+36 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (46): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_TITLES (+38 more)

### Community 101 - "ui.ts"
Cohesion: 0.13
Nodes (26): fmtMonth(), BooksFrame(), ReportsIndex(), BooksSummaryPage(), Summary(), SummaryCard(), ReportsRoute(), loadModuleCounts() (+18 more)

### Community 102 - "settings/actions.ts"
Cohesion: 0.17
Nodes (19): zod, addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState (+11 more)

### Community 103 - "Skeleton"
Cohesion: 0.08
Nodes (47): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+39 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.24
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+10 more)

### Community 106 - "brand/forms.tsx"
Cohesion: 0.18
Nodes (18): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+10 more)

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "manilaToday"
Cohesion: 0.11
Nodes (27): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), BooksChoices(), Codes (+19 more)

### Community 109 - "profile.ts"
Cohesion: 0.08
Nodes (40): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), birSchema, blank() (+32 more)

### Community 110 - "ref_node_path"
Cohesion: 0.05
Nodes (12): pg, root, root, root, root, root, root, root (+4 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "assets/schedule.ts"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+19 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.12
Nodes (31): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+23 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (25): blankLine(), InvoiceForm(), InvoiceFormValue, books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate() (+17 more)

### Community 115 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.13
Nodes (33): disconnectCalendarAction(), GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches() (+25 more)

### Community 118 - "buildSawt"
Cohesion: 0.14
Nodes (40): SaleSplit, Periods, invoiceLabel(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtResult (+32 more)

### Community 119 - "cycle/actions.ts"
Cohesion: 0.20
Nodes (18): SentRow, TimelineRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction() (+10 more)

### Community 120 - "documents/[id]/page.tsx"
Cohesion: 0.17
Nodes (16): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ReadPayrollButton(), pendingDocumentTaxCodes(), LOCKED_STATUSES (+8 more)

### Community 121 - "Centavos"
Cohesion: 0.06
Nodes (51): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), FinancialStatements, ATC_MASTER, AtcInfo, normalizeAtc() (+43 more)

### Community 122 - "@remixicon/react"
Cohesion: 0.19
Nodes (17): @remixicon/react, one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), DocumentUpload(), send() (+9 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.15
Nodes (25): dateFmt, loadItems(), loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone (+17 more)

### Community 126 - "toCentavos"
Cohesion: 0.12
Nodes (28): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+20 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.20
Nodes (17): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CycleRow, ExceptionDecision, parseMonth() (+9 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (63): BirCategory, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+55 more)

### Community 129 - "missing-2307/page.tsx"
Cohesion: 0.33
Nodes (7): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row, peso

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (39): RFC-2047, RFC-2822, GET(), ReturnFileState, sendEsubmissionAction(), TYPES, EsubmissionMailEnv, esubmissionMailEnv() (+31 more)

### Community 131 - "fees/[id]/page.tsx"
Cohesion: 0.20
Nodes (17): FeeFormState, loadSchedule(), ActivateForm(), billingHint, DeleteDraftButton(), PriceRow, PricesForm(), Result() (+9 more)

### Community 132 - "parties/parties.test.ts"
Cohesion: 0.22
Nodes (15): displayName(), fullAddress(), listNameCols(), Party, person, ABBREVIATIONS, fillFromDirectory(), nameTokens() (+7 more)

### Community 133 - "gemini.ts"
Cohesion: 0.11
Nodes (19): OCR_DOC_TYPES, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiJson() (+11 more)

### Community 134 - "work/load.ts"
Cohesion: 0.14
Nodes (24): Action(), MyWork(), MyWorkPage(), short(), TONE, addDays(), isWeekend(), parseIso() (+16 more)

### Community 135 - "[month]/page.tsx"
Cohesion: 0.20
Nodes (15): MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, LOANS (+7 more)

### Community 136 - "Textarea"
Cohesion: 0.14
Nodes (24): ReplyForm(), send(), getIdentity(), amount, date, ProofState, refresh(), rejectProofAction() (+16 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "proposal-view.tsx"
Cohesion: 0.17
Nodes (12): Lines(), longDate(), money(), php, ProposalData, ProposalView(), Quote, QuoteLine (+4 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "template.ts"
Cohesion: 0.14
Nodes (11): items, PRICES, schedule, settings, items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+3 more)

### Community 141 - "booksContext"
Cohesion: 0.30
Nodes (11): booksContext(), one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), print2307Href(), ParallelRun() (+3 more)

### Community 142 - "parties/actions.ts"
Cohesion: 0.23
Nodes (13): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), blank(), optionalText() (+5 more)

### Community 143 - "parties/page.tsx"
Cohesion: 0.36
Nodes (7): one(), PartiesPage(), PartyList(), Row, PARTY_KINDS, partyTinLabel(), VAT_STATUSES

### Community 144 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 145 - "ref_node_fs"
Cohesion: 0.07
Nodes (14): outDir, pkgDir, require, { version }, ctx, input, api, ctx (+6 more)

### Community 146 - "fields.ts"
Cohesion: 0.12
Nodes (21): ok, FieldKey, keys, normalizeAmount(), normalizeFields(), normalizePartyKind(), normalizeTerms(), normalizeTin() (+13 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.09
Nodes (34): Access, STATUS, CASH_FLOW_CLASSES, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES, Amendment (+26 more)

### Community 148 - "2316/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 149 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 150 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 152 - "safeguards.ts"
Cohesion: 0.10
Nodes (33): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, line() (+25 more)

### Community 153 - "parts.ts"
Cohesion: 0.11
Nodes (43): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+35 more)

### Community 154 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (22): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+14 more)

### Community 156 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 157 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 159 - "holiday-list.ts"
Cohesion: 0.26
Nodes (10): easterSunday(), HolidayKind, HolidayRule, iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+2 more)

### Community 160 - "grid.ts"
Cohesion: 0.24
Nodes (11): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.18
Nodes (22): FormState, DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton() (+14 more)

### Community 163 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 164 - "templatePayload"
Cohesion: 0.07
Nodes (13): templatePayload(), as(), client(), root, root, root, as(), books() (+5 more)

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 166 - "toCentavos"
Cohesion: 0.14
Nodes (22): file(), GET(), safe(), loadStored(), buildEmployeeTemplate(), DraftIssue, draftSchema, draftToTemplate() (+14 more)

### Community 167 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 168 - "ocr/run.ts"
Cohesion: 0.36
Nodes (9): ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, lookupParties(), partyKey(), loadColumnMap(), runPayrollRead() (+1 more)

### Community 169 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 170 - "tests/register.test.ts"
Cohesion: 0.40
Nodes (4): DocumentRow, approved(), as(), root

### Community 171 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 174 - "supabaseServer"
Cohesion: 0.05
Nodes (76): nextConfig, next, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), setupMissingChartsAction() (+68 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 177 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (88): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+80 more)

### Community 180 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 181 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (29): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+21 more)

### Community 193 - "money.ts"
Cohesion: 0.19
Nodes (15): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+7 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1338 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `testing.ts` to `form-2307.ts`, `engine.ts`, `public.ts`, `package.json`, `clients/[id]/page.tsx`, `statements.ts`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `module-pages.tsx`, `index.ts`, `filings/run.ts`, `supabaseAdmin`, `workpapers/page.tsx`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `notes.ts`, `payroll/payroll.test.ts`, `invoice-pages.tsx`, `form-1604e.ts`, `toDecimalString`, `sign-in-form.tsx`, `[clientId]/page.tsx`, `safeguards-load.ts`, `theme-toggle.tsx`, `quote.ts`, `books-lock.test.ts`, `Badge`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `opening.ts`, `ledger/books.ts`, `ui.ts`, `settings/actions.ts`, `rates.ts`, `manilaToday`, `profile.ts`, `ref_node_path`, `assets/schedule.ts`, `portal/page.tsx`, `package.json`, `calendar/callback/route.ts`, `documents/[id]/page.tsx`, `Centavos`, `batch/register.ts`, `toCentavos`, `cycle/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `parties/parties.test.ts`, `gemini.ts`, `work/load.ts`, `ticked-allocation.test.ts`, `proposal-view.tsx`, `ledger.test.ts`, `template.ts`, `ref_node_fs`, `fields.ts`, `ledger/types.ts`, `register-books.test.ts`, `ledger-lock.test.ts`, `safeguards.ts`, `parts.ts`, `funnel.test.ts`, `app/documents/page.tsx`, `leads-pipeline.test.ts`, `parallel-run.test.ts`, `portal-statements-approval.test.ts`, `holiday-list.ts`, `calendar/page.tsx`, `books-migration.test.ts`, `templatePayload`, `fixed-assets.test.ts`, `tests/register.test.ts`, `tests/books.test.ts`, `ledger-documents.test.ts`, `month-complete.test.ts`, `supabaseServer`, `acting-approver.test.ts`, `tests/parties.test.ts`, `registrations/forms.tsx`, `tests/payroll.test.ts`, `db.test.ts`, `workpapers.test.ts`, `returns-sign-off.test.ts`, `payroll-books.test.ts`, `onboarding/page.tsx`, `money.ts`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08028846153846154 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `form-2307.ts`, `manilaToday`, `clients/[id]/page.tsx`, `requireStaff`, `app/app/layout.tsx`, `dependencies`, `statements.ts`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `module-pages.tsx`, `payroll/forms.tsx`, `modal.tsx`, `filings/run.ts`, `supabaseAdmin`, `workpapers/page.tsx`, `register-xlsx.ts`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `invoice-pages.tsx`, `Notice`, `lib/books/actions.ts`, `cx`, `select.tsx`, `sign-in-form.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `party-pages.tsx`, `stat-cards.tsx`, `social-button.tsx`, `theme-toggle.tsx`, `Badge`, `documents/labels.ts`, `button.tsx`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `notification.tsx`, `leads/[id]/page.tsx`, `payroll/data.ts`, `settlement-pages.tsx`, `ledger/books.ts`, `ui.ts`, `settings/actions.ts`, `brand/forms.tsx`, `manilaToday`, `profile.ts`, `assets/schedule.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `package.json`, `cycle/actions.ts`, `documents/[id]/page.tsx`, `@remixicon/react`, `batch/register.ts`, `quote/page.tsx`, `toCentavos`, `cycle/page.tsx`, `missing-2307/page.tsx`, `fees/[id]/page.tsx`, `work/load.ts`, `[month]/page.tsx`, `Textarea`, `booksContext`, `parties/page.tsx`, `2316/page.tsx`, `file-upload.tsx`, `parts.ts`, `app/documents/page.tsx`, `calendar/page.tsx`, `breadcrumb.tsx`, `supabaseServer`, `registrations/forms.tsx`, `onboarding/page.tsx`, `money.ts`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07831677381648158 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `manilaToday`, `clients/[id]/page.tsx`, `requireStaff`, `app/app/layout.tsx`, `dependencies`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `module-pages.tsx`, `payroll/forms.tsx`, `modal.tsx`, `filings/run.ts`, `supabaseAdmin`, `workpapers/page.tsx`, `register-xlsx.ts`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `invoice-pages.tsx`, `Notice`, `collections/actions.ts`, `toDecimalString`, `lib/books/actions.ts`, `sign-in-form.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `party-pages.tsx`, `theme-toggle.tsx`, `Badge`, `documents/labels.ts`, `button.tsx`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `payroll/data.ts`, `settlement-pages.tsx`, `ledger/books.ts`, `ui.ts`, `settings/actions.ts`, `Skeleton`, `brand/forms.tsx`, `proxy.ts`, `manilaToday`, `profile.ts`, `assets/schedule.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `package.json`, `calendar/callback/route.ts`, `cycle/actions.ts`, `documents/[id]/page.tsx`, `Centavos`, `@remixicon/react`, `batch/register.ts`, `quote/page.tsx`, `toCentavos`, `cycle/page.tsx`, `missing-2307/page.tsx`, `return-file-actions.ts`, `fees/[id]/page.tsx`, `work/load.ts`, `[month]/page.tsx`, `Textarea`, `booksContext`, `parties/actions.ts`, `parties/page.tsx`, `ledger/types.ts`, `2316/page.tsx`, `parts.ts`, `app/documents/page.tsx`, `toCentavos`, `breadcrumb.tsx`, `registrations/forms.tsx`, `onboarding/page.tsx`, `money.ts`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._