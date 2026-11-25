# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 774 files · ~605,462 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4803 nodes · 16673 edges · 187 communities (162 shown, 25 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 129 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `006283d3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- filings/run.ts
- migrate.yml
- cx.ts
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- ui.tsx
- Sign-in & Setup Docs
- requireStaff
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
- documents/[id]/page.tsx
- scores/page.tsx
- percentage.ts
- payroll/types.ts
- pending-review.tsx
- index.ts
- payroll/forms.tsx
- modal.tsx
- lock-bar.tsx
- scripts
- supabaseAdmin
- workpapers/load.ts
- deadlines/page.tsx
- month.ts
- review/page.tsx
- app/app/page.tsx
- Centavos
- Skeleton
- form-1604e.ts
- Notice
- app/settings/page.tsx
- fees/[id]/page.tsx
- registrations/forms.tsx
- templatePayload
- cx
- select.tsx
- Apple Design
- public.ts
- testing.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- module-pages.tsx
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- social-button.tsx
- theme-toggle.tsx
- quote.ts
- notification.tsx
- supabaseServer
- PageHeader
- button.tsx
- Pro components
- server-only
- year-end/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- proposal/[token]/page.tsx
- opening.ts
- Recipes
- payroll/data.ts
- BoardUI page patterns
- Pro templates
- workpapers/page.tsx
- ledger/books.ts
- invoice-form.tsx
- toCentavos
- invoice-pages.tsx
- boardui
- rates.ts
- worksheet/page.tsx
- proxy.ts
- money.ts
- profile.ts
- leads/actions.ts
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- portal/page.tsx
- lib/books/actions.ts
- ledger/data.ts
- calendar/callback/route.ts
- apply-migrations.sh
- upload/page.tsx
- settlement-pages.tsx
- filings/[id]/page.tsx
- returns/load.ts
- LinkButton
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- filings/actions.ts
- cycle/page.tsx
- read.test.ts
- checkbox.tsx
- return-file-actions.ts
- fees/types.ts
- ui.ts
- fields.ts
- work/load.ts
- manilaToday
- documents/labels.ts
- ticked-allocation.test.ts
- returns/books.test.ts
- ledger.test.ts
- vitest
- settings/actions.ts
- income.ts
- binder/page.tsx
- Building UIs with BoardUI
- generate-qap-fixture.mjs
- formatAmount
- db.test.ts
- calendar/staff.ts
- getIdentity
- leads/[id]/page.tsx
- Card
- safeguards.ts
- parts.ts
- ref_node_fs
- app/documents/page.tsx
- staff/page.tsx
- review-form.tsx
- ref_node_path
- proposal-view.tsx
- grid.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- books-migration.test.ts
- tests/books.test.ts
- fixed-assets.test.ts
- gap/page.tsx
- file-upload.tsx
- morning.ts
- fees/page.tsx
- missing-2307/page.tsx
- spinner.tsx
- form-1604e.test.ts
- Badge
- clients/actions.ts
- acting-approver.test.ts
- books/periods.ts
- eslint.config.mjs
- ledger-lock.test.ts
- leads-pipeline.test.ts
- portal-statements-approval.test.ts
- returns-sign-off.test.ts
- ledger-documents.test.ts
- month-complete.test.ts
- returns-books.test.ts
- payroll-books.test.ts
- portal-reports.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 291 edges
2. `cx` - 227 edges
3. `Skeleton()` - 226 edges
4. `Notice()` - 222 edges
5. `react` - 221 edges
6. `Button()` - 194 edges
7. `next` - 180 edges
8. `Card()` - 163 edges
9. `Badge()` - 157 edges
10. `vitest` - 139 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Postgres Row-Level Security`  [INFERRED]
  README.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (187 total, 25 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (43): booksContext(), BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff() (+35 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.08
Nodes (48): TimelineFiling, TimelineItem, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso() (+40 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 4 - "arap.ts"
Cohesion: 0.16
Nodes (18): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+10 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "gemini.ts"
Cohesion: 0.09
Nodes (22): DOC_TYPES, OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL (+14 more)

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

### Community 11 - "ui.tsx"
Cohesion: 0.10
Nodes (21): NewEmployee(), NewEmployeePage(), NewParty(), NewPartyPage(), AddBranchForm(), BranchRowForm(), Branches(), BranchesPage() (+13 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "requireStaff"
Cohesion: 0.12
Nodes (30): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+22 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (54): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+46 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.11
Nodes (51): lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments() (+43 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "documents/[id]/page.tsx"
Cohesion: 0.08
Nodes (48): file(), GET(), safe(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review() (+40 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.08
Nodes (42): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+34 more)

### Community 42 - "percentage.ts"
Cohesion: 0.17
Nodes (33): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+25 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "pending-review.tsx"
Cohesion: 0.11
Nodes (29): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), Booking, BooksChoices() (+21 more)

### Community 45 - "index.ts"
Cohesion: 0.08
Nodes (17): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+9 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (55): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+47 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (39): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+31 more)

### Community 48 - "lock-bar.tsx"
Cohesion: 0.16
Nodes (23): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+15 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.15
Nodes (29): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+21 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (22): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+14 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.15
Nodes (27): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+19 more)

### Community 53 - "month.ts"
Cohesion: 0.33
Nodes (8): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none

### Community 54 - "review/page.tsx"
Cohesion: 0.14
Nodes (18): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), Returns(), Queue(), ReviewPage(), Row (+10 more)

### Community 55 - "app/app/page.tsx"
Cohesion: 0.19
Nodes (20): FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary(), EndButton(), Acting() (+12 more)

### Community 56 - "Centavos"
Cohesion: 0.06
Nodes (70): GridRow, MonthGrid(), toInput(), AlphaCols, AlphalistRow, buildAlphalist(), certificatesFromRaw(), form2316() (+62 more)

### Community 57 - "Skeleton"
Cohesion: 0.15
Nodes (19): react, InvoiceEdit(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage(), ReceiptsNewPage() (+11 more)

### Community 58 - "form-1604e.ts"
Cohesion: 0.07
Nodes (52): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), ewtLines() (+44 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (70): setupMissingChartsAction(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), CloseYearForm() (+62 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (40): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+32 more)

### Community 61 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 62 - "registrations/forms.tsx"
Cohesion: 0.07
Nodes (59): StaffOptions(), ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+51 more)

### Community 63 - "templatePayload"
Cohesion: 0.13
Nodes (11): templatePayload(), as(), client(), root, as(), books(), root, as() (+3 more)

### Community 64 - "cx"
Cohesion: 0.06
Nodes (41): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, InputOtp(), InputOtpProps, Kbd() (+33 more)

### Community 65 - "select.tsx"
Cohesion: 0.08
Nodes (39): SheetPreview(), Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem() (+31 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "public.ts"
Cohesion: 0.15
Nodes (20): dateFmt, Supabase, SERVICES, StartState, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+12 more)

### Community 68 - "testing.ts"
Cohesion: 0.17
Nodes (19): year, BUSINESS_TAX_FORMS, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (48): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+40 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (52): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+44 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.13
Nodes (44): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+36 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.10
Nodes (32): BankAccountsRoute(), fmtDate(), SearchParams, BooksList(), Column, ListRow, RowLink(), CustomersRoute() (+24 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.17
Nodes (16): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput (+8 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (38): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+30 more)

### Community 77 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (37): react-dom@19.3.0, react-dom, Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs (+29 more)

### Community 79 - "quote.ts"
Cohesion: 0.12
Nodes (29): EstimatedProfile, ExistingClient, buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange() (+21 more)

### Community 80 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 81 - "supabaseServer"
Cohesion: 0.05
Nodes (69): nextConfig, next, zod, removeAssignmentAction(), setClientStatusAction(), addClientNoteAction(), NoteState, postPayrollAction() (+61 more)

### Community 82 - "PageHeader"
Cohesion: 0.10
Nodes (35): @remixicon/react, RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, ClientList() (+27 more)

### Community 83 - "button.tsx"
Cohesion: 0.06
Nodes (38): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+30 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "server-only"
Cohesion: 0.11
Nodes (23): server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage(), DigestRow (+15 more)

### Community 86 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (67): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote() (+59 more)

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
Cohesion: 0.16
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+11 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "proposal/[token]/page.tsx"
Cohesion: 0.24
Nodes (11): metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage(), Lockup(), Mark() (+3 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.12
Nodes (33): EmployeeDetail(), EmployeePage(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p() (+25 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "workpapers/page.tsx"
Cohesion: 0.14
Nodes (26): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+18 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+39 more)

### Community 101 - "invoice-form.tsx"
Cohesion: 0.13
Nodes (23): blankLine(), InvoiceForm(), InvoiceFormValue, SettingsPage(), SettingsRoute(), PickOption, loadTaxCodes(), appliesTo() (+15 more)

### Community 102 - "toCentavos"
Cohesion: 0.14
Nodes (25): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+17 more)

### Community 103 - "invoice-pages.tsx"
Cohesion: 0.12
Nodes (29): INVOICE_KINDS, InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesViewPage(), PurchaseInvoicesListPage() (+21 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "worksheet/page.tsx"
Cohesion: 0.39
Nodes (8): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage()

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "money.ts"
Cohesion: 0.09
Nodes (40): FinancialStatements, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell() (+32 more)

### Community 109 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 110 - "leads/actions.ts"
Cohesion: 0.35
Nodes (13): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+5 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+19 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.12
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (26): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+18 more)

### Community 115 - "ledger/data.ts"
Cohesion: 0.08
Nodes (45): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+37 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.20
Nodes (18): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+10 more)

### Community 118 - "upload/page.tsx"
Cohesion: 0.30
Nodes (12): DocumentsCard(), when(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), addMonths() (+4 more)

### Community 119 - "settlement-pages.tsx"
Cohesion: 0.15
Nodes (19): PaymentsViewPage(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, Kind, Props, SETTLEMENT_KINDS (+11 more)

### Community 120 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (49): FilingRow, FilingListRow, SignOffState, bookKind, BookRow, bookStatus, Event, eventText (+41 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.08
Nodes (47): ATC_MASTER, AtcInfo, normalizeAtc(), NonDeductibleRow, withNonDeductible(), VatData, dayBefore(), FilingRow (+39 more)

### Community 122 - "LinkButton"
Cohesion: 0.25
Nodes (14): Batch(), BatchPage(), one(), toCentavos(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page() (+6 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.27
Nodes (10): loadTaxOnFee(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+2 more)

### Community 126 - "filings/actions.ts"
Cohesion: 0.16
Nodes (20): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+12 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.12
Nodes (28): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), MonthComplete(), SentRow, TimelineRow (+20 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (67): geminiJson(), BirCategory, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES (+59 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (45): RFC-2047, RFC-2822, GET(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction() (+37 more)

### Community 131 - "fees/types.ts"
Cohesion: 0.12
Nodes (20): count(), first(), pick(), profileFromQuery(), QuerySource, items, DOCUMENT_BANDS, EMPLOYEE_BANDS (+12 more)

### Community 132 - "ui.ts"
Cohesion: 0.15
Nodes (22): fmtMonth(), BooksFrame(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), loadModuleCounts(), TaxCodePlace (+14 more)

### Community 133 - "fields.ts"
Cohesion: 0.09
Nodes (31): approveDocumentAction(), BatchRow, postDocumentToBooks(), unpostDocumentFromBooks(), streamOf(), checkFields(), Issue, num() (+23 more)

### Community 134 - "work/load.ts"
Cohesion: 0.19
Nodes (15): keepBooksReady(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 135 - "manilaToday"
Cohesion: 0.11
Nodes (35): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+27 more)

### Community 136 - "documents/labels.ts"
Cohesion: 0.13
Nodes (21): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+13 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "returns/books.test.ts"
Cohesion: 0.11
Nodes (15): client, row(), form1701, form1702RT, form1701Q, form1702Q, form2551Q, SawtResult (+7 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.06
Nodes (11): pg, vitest, root, root, root, root, root, root (+3 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 142 - "income.ts"
Cohesion: 0.12
Nodes (35): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+27 more)

### Community 143 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 144 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "formatAmount"
Cohesion: 0.19
Nodes (17): PortalPrint2307Page(), Print(), portal2307Href(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+9 more)

### Community 148 - "calendar/staff.ts"
Cohesion: 0.17
Nodes (18): Interval, Admin, Connection, PersonWeek, accessToken(), CALENDAR_SCOPES, CalendarEvent, emailOf() (+10 more)

### Community 149 - "getIdentity"
Cohesion: 0.20
Nodes (19): ReplyForm(), send(), METHODS, ProofUpload(), send(), getIdentity(), ProofState, startProofUpload() (+11 more)

### Community 150 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (39): NotesCard(), ClientNoteForm(), BookingLink(), ConvertForm(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), Person (+31 more)

### Community 151 - "Card"
Cohesion: 0.28
Nodes (18): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+10 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.11
Nodes (31): SafeguardsNotice(), coverageGaps(), board, MARCO, none, RHEA, row(), steps (+23 more)

### Community 153 - "parts.ts"
Cohesion: 0.09
Nodes (26): client(), ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine (+18 more)

### Community 154 - "ref_node_fs"
Cohesion: 0.11
Nodes (7): ctx, input, root, HASH, LEAD, root, root

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (25): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+17 more)

### Community 156 - "staff/page.tsx"
Cohesion: 0.38
Nodes (8): inviteStaffAction(), BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 157 - "review-form.tsx"
Cohesion: 0.15
Nodes (19): DocReviewActions(), DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, DocumentUpload(), send(), upload() (+11 more)

### Community 158 - "ref_node_path"
Cohesion: 0.09
Nodes (9): outDir, pkgDir, require, { version }, Data, root, Row, root (+1 more)

### Community 159 - "proposal-view.tsx"
Cohesion: 0.15
Nodes (14): acceptProposalAction(), AcceptState, Lines(), longDate(), money(), php, ProposalData, ProposalView() (+6 more)

### Community 160 - "grid.ts"
Cohesion: 0.18
Nodes (15): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+7 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.28
Nodes (15): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant(), teamWeek(), addDays() (+7 more)

### Community 163 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 164 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 166 - "gap/page.tsx"
Cohesion: 0.19
Nodes (13): loadSchedules(), EngagementRow, FeeGapPage(), Gap(), estimateProfile(), gapFor(), GapRow, has() (+5 more)

### Community 167 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 168 - "morning.ts"
Cohesion: 0.35
Nodes (9): GET(), Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+1 more)

### Community 169 - "fees/page.tsx"
Cohesion: 0.36
Nodes (8): longDate(), nextEffectiveDate(), statusLabel, statusTone, CreateFromTemplateForm(), StartNewVersionForm(), FeeSchedulePage(), Schedules()

### Community 170 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 171 - "spinner.tsx"
Cohesion: 0.32
Nodes (7): PendingGlyph(), Arc(), SIZES, Spinner(), SpinnerGlyph(), SpinnerProps, SpinnerSize

### Community 172 - "form-1604e.test.ts"
Cohesion: 0.25
Nodes (3): client, YEAR, EwtQuarter

### Community 173 - "Badge"
Cohesion: 0.10
Nodes (51): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+43 more)

### Community 174 - "clients/actions.ts"
Cohesion: 0.07
Nodes (48): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setIncomeTaxMethodAction(), updateClientAction(), ClientForm() (+40 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "books/periods.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 177 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 179 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 181 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1300 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `filings/run.ts`, `arap.ts`, `package.json`, `gemini.ts`, `requireStaff`, `statements.ts`, `scores/page.tsx`, `pending-review.tsx`, `index.ts`, `lock-bar.tsx`, `supabaseAdmin`, `workpapers/load.ts`, `deadlines/page.tsx`, `month.ts`, `review/page.tsx`, `app/app/page.tsx`, `Centavos`, `form-1604e.ts`, `app/settings/page.tsx`, `registrations/forms.tsx`, `templatePayload`, `public.ts`, `testing.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `opening-checklist.tsx`, `theme-toggle.tsx`, `quote.ts`, `supabaseServer`, `server-only`, `year-end/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `opening.ts`, `workpapers/page.tsx`, `ledger/books.ts`, `invoice-form.tsx`, `toCentavos`, `invoice-pages.tsx`, `rates.ts`, `money.ts`, `profile.ts`, `fixed-assets/page.tsx`, `portal/page.tsx`, `ledger/data.ts`, `calendar/callback/route.ts`, `upload/page.tsx`, `filings/[id]/page.tsx`, `returns/load.ts`, `batch/register.ts`, `filings/actions.ts`, `cycle/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `fees/types.ts`, `ui.ts`, `fields.ts`, `work/load.ts`, `ticked-allocation.test.ts`, `returns/books.test.ts`, `ledger.test.ts`, `settings/actions.ts`, `formatAmount`, `db.test.ts`, `leads/[id]/page.tsx`, `safeguards.ts`, `parts.ts`, `ref_node_fs`, `app/documents/page.tsx`, `ref_node_path`, `proposal-view.tsx`, `calendar/page.tsx`, `books-migration.test.ts`, `tests/books.test.ts`, `fixed-assets.test.ts`, `gap/page.tsx`, `form-1604e.test.ts`, `Badge`, `clients/actions.ts`, `acting-approver.test.ts`, `books/periods.ts`, `ledger-lock.test.ts`, `leads-pipeline.test.ts`, `portal-statements-approval.test.ts`, `returns-sign-off.test.ts`, `ledger-documents.test.ts`, `month-complete.test.ts`, `returns-books.test.ts`, `payroll-books.test.ts`, `portal-reports.test.ts`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10572390572390572 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `return-file-actions.ts`, `ui.ts`, `package.json`, `fields.ts`, `manilaToday`, `documents/labels.ts`, `ui.tsx`, `requireStaff`, `settings/actions.ts`, `dependencies`, `binder/page.tsx`, `statements.ts`, `formatAmount`, `getIdentity`, `leads/[id]/page.tsx`, `Card`, `app/documents/page.tsx`, `review-form.tsx`, `proposal-view.tsx`, `gap/page.tsx`, `morning.ts`, `documents/[id]/page.tsx`, `scores/page.tsx`, `fees/page.tsx`, `pending-review.tsx`, `Badge`, `clients/actions.ts`, `modal.tsx`, `lock-bar.tsx`, `payroll/forms.tsx`, `supabaseAdmin`, `missing-2307/page.tsx`, `deadlines/page.tsx`, `review/page.tsx`, `app/app/page.tsx`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `registrations/forms.tsx`, `cx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `opening-checklist.tsx`, `theme-toggle.tsx`, `PageHeader`, `button.tsx`, `server-only`, `year-end/page.tsx`, `portal/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `proposal/[token]/page.tsx`, `payroll/data.ts`, `workpapers/page.tsx`, `ledger/books.ts`, `toCentavos`, `invoice-pages.tsx`, `worksheet/page.tsx`, `proxy.ts`, `profile.ts`, `leads/actions.ts`, `fixed-assets/page.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `ledger/data.ts`, `calendar/callback/route.ts`, `upload/page.tsx`, `settlement-pages.tsx`, `filings/[id]/page.tsx`, `LinkButton`, `batch/register.ts`, `quote/page.tsx`, `filings/actions.ts`, `cycle/page.tsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08087431693989071 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `form-2307.ts`, `cx.ts`, `package.json`, `ui.tsx`, `requireStaff`, `dependencies`, `statements.ts`, `documents/[id]/page.tsx`, `scores/page.tsx`, `pending-review.tsx`, `payroll/forms.tsx`, `modal.tsx`, `lock-bar.tsx`, `supabaseAdmin`, `deadlines/page.tsx`, `review/page.tsx`, `app/app/page.tsx`, `Notice`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `registrations/forms.tsx`, `cx`, `select.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `stat-cards.tsx`, `social-button.tsx`, `theme-toggle.tsx`, `notification.tsx`, `supabaseServer`, `PageHeader`, `button.tsx`, `server-only`, `year-end/page.tsx`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `proposal/[token]/page.tsx`, `payroll/data.ts`, `workpapers/page.tsx`, `ledger/books.ts`, `invoice-form.tsx`, `toCentavos`, `invoice-pages.tsx`, `worksheet/page.tsx`, `profile.ts`, `fixed-assets/page.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `ledger/data.ts`, `calendar/callback/route.ts`, `upload/page.tsx`, `settlement-pages.tsx`, `filings/[id]/page.tsx`, `LinkButton`, `quote/page.tsx`, `cycle/page.tsx`, `checkbox.tsx`, `return-file-actions.ts`, `ui.ts`, `manilaToday`, `documents/labels.ts`, `binder/page.tsx`, `formatAmount`, `getIdentity`, `leads/[id]/page.tsx`, `Card`, `app/documents/page.tsx`, `staff/page.tsx`, `review-form.tsx`, `calendar/page.tsx`, `gap/page.tsx`, `file-upload.tsx`, `fees/page.tsx`, `missing-2307/page.tsx`, `spinner.tsx`, `Badge`, `clients/actions.ts`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._