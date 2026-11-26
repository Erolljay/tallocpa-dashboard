# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 797 files · ~640,056 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4958 nodes · 17219 edges · 189 communities (162 shown, 27 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 144 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `2a080660`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- engine.ts
- migrate.yml
- statement.ts
- public.ts
- package.json
- registrations/forms.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- return-file-actions.ts
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
- year-end/page.tsx
- scores/page.tsx
- registrations/forms.tsx
- payroll/types.ts
- module-pages.tsx
- index.ts
- payroll/forms.tsx
- modal.tsx
- board.ts
- scripts
- supabaseAdmin
- workpapers/page.tsx
- payroll/payroll.test.ts
- app/settings/page.tsx
- filings/[id]/page.tsx
- leads/[id]/page.tsx
- year.ts
- status.ts
- form-1604e.ts
- Notice
- formToObject
- toDecimalString
- alphalist.ts
- lock-bar.tsx
- cx
- select.tsx
- Apple Design
- sign-in-form.tsx
- testing.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- calendar/staff.ts
- Rules
- Animation Performance
- safeguards-load.ts
- stat-cards.tsx
- social-button.tsx
- theme-toggle.tsx
- quote.ts
- profile.ts
- Badge
- registration.test.ts
- button.tsx
- Pro components
- server-only
- deadlines/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- notification.tsx
- form-2316.tsx
- leads/actions.ts
- opening.ts
- Recipes
- payroll/data.ts
- BoardUI page patterns
- Pro templates
- formatAmount
- ledger/books.ts
- ui.ts
- settings/actions.ts
- Skeleton
- boardui
- rates.ts
- brand/forms.tsx
- proxy.ts
- review-form.tsx
- brand/page.tsx
- ref_node_path
- Opening balances: checklist for any cut-off
- assets/schedule.ts
- portal/page.tsx
- lib/books/actions.ts
- package.json
- calendar/callback/route.ts
- apply-migrations.sh
- buildSawt
- app/documents/page.tsx
- registrations/[id]/page.tsx
- Centavos
- review-forms.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- documents/[id]/page.tsx
- dates.ts
- read.test.ts
- manilaToday
- return-file-actions.ts
- fees/[id]/page.tsx
- onboarding/forms.tsx
- gemini.ts
- work/load.ts
- sign-off.ts
- proof-actions.ts
- ticked-allocation.test.ts
- proposal-view.tsx
- ledger.test.ts
- fees/types.ts
- parallel-run.tsx
- steps.ts
- registration/page.tsx
- eslint.config.mjs
- ref_node_fs
- morning.ts
- ledger/types.ts
- fixed-assets/forms.tsx
- file-upload.tsx
- register-books.test.ts
- ledger-lock.test.ts
- safeguards.ts
- register/page.tsx
- funnel.test.ts
- filters.tsx
- leads-pipeline.test.ts
- parallel-run.test.ts
- portal-statements-approval.test.ts
- sign-off-actions.tsx
- december-rehearsal.test.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- books-migration.test.ts
- templatePayload
- fixed-assets.test.ts
- seed.ts
- deadlines/actions.ts
- items.ts
- Building UIs with BoardUI
- tests/register.test.ts
- tests/books.test.ts
- registrations/new/page.tsx
- month-complete.test.ts
- clients/[id]/page.tsx
- acting-approver.test.ts
- tests/parties.test.ts
- registrations/actions.ts
- tests/payroll.test.ts
- db.test.ts
- checkbox.tsx
- books/periods.ts
- books-2307.test.ts
- fees.test.ts
- adjustments.test.ts
- onboarding/page.tsx
- batch-upload.test.ts
- client-reports.test.ts
- supabaseServer

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 294 edges
2. `cx` - 237 edges
3. `Skeleton()` - 230 edges
4. `Notice()` - 229 edges
5. `react` - 225 edges
6. `Button()` - 197 edges
7. `next` - 183 edges
8. `Card()` - 163 edges
9. `Badge()` - 163 edges
10. `vitest` - 148 edges

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

## Communities (189 total, 27 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (55): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page() (+47 more)

### Community 1 - "engine.ts"
Cohesion: 0.10
Nodes (44): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+36 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "statement.ts"
Cohesion: 0.09
Nodes (37): ReplyForm(), send(), Detail(), PayNow(), credit(), ItemList(), proofMethod, VerifiedItems() (+29 more)

### Community 4 - "public.ts"
Cohesion: 0.11
Nodes (26): dateFmt, Supabase, acceptProposalAction(), AcceptState, SERVICES, StartState, metadata, Start() (+18 more)

### Community 5 - "package.json"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "registrations/forms.tsx"
Cohesion: 0.15
Nodes (13): Row, cancelRegistrationAction(), completeRegistrationAction(), FormState, caseNote, caseTitle, statusTone, submitLabel (+5 more)

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

### Community 11 - "return-file-actions.ts"
Cohesion: 0.18
Nodes (23): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+15 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+11 more)

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
Cohesion: 0.08
Nodes (47): WithdrawReportButton(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate(), lastMonth(), Reports(), ReportsPage() (+39 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.09
Nodes (68): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+60 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "year-end/page.tsx"
Cohesion: 0.11
Nodes (31): ClientTab, ClientTabs(), UNDER, FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE (+23 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (36): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+28 more)

### Community 42 - "registrations/forms.tsx"
Cohesion: 0.08
Nodes (46): atcRows(), BookInvoiceRow, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC (+38 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "module-pages.tsx"
Cohesion: 0.16
Nodes (17): SettingsPage(), SettingsRoute(), loadTaxCodes(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf() (+9 more)

### Community 45 - "index.ts"
Cohesion: 0.07
Nodes (18): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+10 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.07
Nodes (65): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+57 more)

### Community 47 - "modal.tsx"
Cohesion: 0.09
Nodes (45): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+37 more)

### Community 48 - "board.ts"
Cohesion: 0.21
Nodes (13): StepProgress(), StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS, fiveSteps() (+5 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+25 more)

### Community 51 - "workpapers/page.tsx"
Cohesion: 0.04
Nodes (79): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+71 more)

### Community 52 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (40): file(), GET(), safe(), monthlyTable(), monthlyWithholding(), employeesForMonth(), buildEmployeeTemplate(), PayrollItem (+32 more)

### Community 53 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (35): RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote() (+27 more)

### Community 54 - "filings/[id]/page.tsx"
Cohesion: 0.10
Nodes (29): FilingRow, FilingListRow, amt(), ApprovalMemo(), Db, TIE, bookKind, BookRow (+21 more)

### Community 55 - "leads/[id]/page.tsx"
Cohesion: 0.11
Nodes (27): NotesCard(), bookedTime, Lead(), LeadPage(), Person, ICON, NotesTimeline(), when (+19 more)

### Community 56 - "year.ts"
Cohesion: 0.13
Nodes (28): GridRow, MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion() (+20 more)

### Community 57 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 58 - "form-1604e.ts"
Cohesion: 0.04
Nodes (91): FinancialStatements, lookupAtc(), client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q (+83 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (71): setupMissingChartsAction(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+63 more)

### Community 60 - "formToObject"
Cohesion: 0.13
Nodes (22): ActingState, appointActingAction(), endActingAction(), refresh(), addBranchAction(), BranchState, errors(), refresh() (+14 more)

### Community 61 - "toDecimalString"
Cohesion: 0.07
Nodes (50): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+42 more)

### Community 62 - "alphalist.ts"
Cohesion: 0.16
Nodes (23): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+15 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.17
Nodes (18): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, day(), dayFmt (+10 more)

### Community 64 - "cx"
Cohesion: 0.05
Nodes (45): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, DropdownPopover(), InputOtp(), InputOtpProps (+37 more)

### Community 65 - "select.tsx"
Cohesion: 0.09
Nodes (33): react-aria-components@^1.22.1, react-aria-components, Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps (+25 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "sign-in-form.tsx"
Cohesion: 0.14
Nodes (19): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+11 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.08
Nodes (61): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+53 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (58): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+50 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (38): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+30 more)

### Community 72 - "calendar/staff.ts"
Cohesion: 0.17
Nodes (21): Interval, Admin, busyOf(), connect(), Connection, PersonWeek, teamWeek(), accessToken() (+13 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "safeguards-load.ts"
Cohesion: 0.15
Nodes (14): Row, CoverageClient, coverageGaps(), Gap, GapKind, BoardRow, FilingRow, holidaySet() (+6 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (38): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+30 more)

### Community 77 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (35): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+27 more)

### Community 79 - "quote.ts"
Cohesion: 0.10
Nodes (38): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+30 more)

### Community 80 - "profile.ts"
Cohesion: 0.14
Nodes (18): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+10 more)

### Community 81 - "Badge"
Cohesion: 0.21
Nodes (16): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), Row, CloseRequestButton(), Thread() (+8 more)

### Community 82 - "registration.test.ts"
Cohesion: 0.15
Nodes (12): Check(), ChecklistPreview(), ClientCaseForm(), birForm(), branchStepsFor(), closureStepsFor(), registersWithSec(), stepsFor() (+4 more)

### Community 83 - "button.tsx"
Cohesion: 0.06
Nodes (38): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+30 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "server-only"
Cohesion: 0.18
Nodes (15): server-only, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+7 more)

### Community 86 - "deadlines/page.tsx"
Cohesion: 0.08
Nodes (58): ClientReturnsPage(), Returns(), FilingTable(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting() (+50 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.09
Nodes (63): Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat(), BooksSection() (+55 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (23): HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps, inputElementClassName (+15 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "notification.tsx"
Cohesion: 0.05
Nodes (45): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CHIP_COLORS, ChipColor (+37 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.23
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/actions.ts"
Cohesion: 0.26
Nodes (18): PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+10 more)

### Community 94 - "opening.ts"
Cohesion: 0.16
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+9 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.10
Nodes (45): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer (+37 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "formatAmount"
Cohesion: 0.09
Nodes (64): BankAccountsRoute(), booksContext(), fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList() (+56 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (47): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+39 more)

### Community 101 - "ui.ts"
Cohesion: 0.12
Nodes (22): MonthSelect(), AllocationRow, InvoiceLineRow, InvoiceRow, loadModuleCounts(), loadSettlements(), SettlementRow, taxOn() (+14 more)

### Community 102 - "settings/actions.ts"
Cohesion: 0.12
Nodes (27): zod, addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState (+19 more)

### Community 103 - "Skeleton"
Cohesion: 0.05
Nodes (75): nextConfig, next, react, CustomersRoute(), NewEntry(), NewEntryPage(), BooksMonthsPage(), Months() (+67 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+11 more)

### Community 106 - "brand/forms.tsx"
Cohesion: 0.13
Nodes (24): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+16 more)

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "review-form.tsx"
Cohesion: 0.06
Nodes (65): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+57 more)

### Community 109 - "brand/page.tsx"
Cohesion: 0.17
Nodes (19): SectionForm(), BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), expiryStatus() (+11 more)

### Community 110 - "ref_node_path"
Cohesion: 0.05
Nodes (16): pg, vitest, root, root, root, root, root, root (+8 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "assets/schedule.ts"
Cohesion: 0.35
Nodes (10): accumulated(), bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor(), monthIndex(), monthTotals(), rangeTotals(), RESIDUAL (+2 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.12
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.09
Nodes (44): blankLine(), InvoiceForm(), InvoiceFormValue, fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, books() (+36 more)

### Community 115 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, tsx@^4.23.15, @types/node@^20, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.21
Nodes (17): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+9 more)

### Community 118 - "buildSawt"
Cohesion: 0.12
Nodes (48): sawtBuckets(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments() (+40 more)

### Community 119 - "app/documents/page.tsx"
Cohesion: 0.06
Nodes (73): DocReviewActions(), Doc, DocumentsCard(), when(), Cycle(), CycleWithClient, DocRow, ExceptionRow (+65 more)

### Community 120 - "registrations/[id]/page.tsx"
Cohesion: 0.24
Nodes (15): CompleteButton(), StepBadge(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell(), dayNumber() (+7 more)

### Community 121 - "Centavos"
Cohesion: 0.12
Nodes (36): loadAssets(), ATC_MASTER, AtcInfo, normalizeAtc(), withNonDeductible(), dayBefore(), FilingRow, listInvoices() (+28 more)

### Community 122 - "review-forms.tsx"
Cohesion: 0.23
Nodes (13): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), Msg() (+5 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (44): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+36 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.13
Nodes (27): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, NewParty() (+19 more)

### Community 126 - "documents/[id]/page.tsx"
Cohesion: 0.06
Nodes (60): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), applyColumnsAction(), done(), payrollDocument() (+52 more)

### Community 127 - "dates.ts"
Cohesion: 0.39
Nodes (9): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff() (+1 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (72): RFC-4180, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS, findHeaderRow() (+64 more)

### Community 129 - "manilaToday"
Cohesion: 0.15
Nodes (25): Client, CollectionsPage(), OpenDue, Overview(), Stat(), Detail(), StatementPage(), Detail() (+17 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.14
Nodes (28): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, accessToken(), call(), findReplies(), headerOf() (+20 more)

### Community 131 - "fees/[id]/page.tsx"
Cohesion: 0.12
Nodes (36): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+28 more)

### Community 132 - "onboarding/forms.tsx"
Cohesion: 0.28
Nodes (12): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), send() (+4 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 134 - "work/load.ts"
Cohesion: 0.20
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 135 - "sign-off.ts"
Cohesion: 0.18
Nodes (12): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, stepIndex(), client, owner, preparer (+4 more)

### Community 136 - "proof-actions.ts"
Cohesion: 0.29
Nodes (9): amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text(), TYPES (+1 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "proposal-view.tsx"
Cohesion: 0.29
Nodes (9): Lines(), longDate(), money(), php, ProposalData, ProposalView(), Quote, QuoteLine (+1 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "fees/types.ts"
Cohesion: 0.11
Nodes (21): count(), first(), pick(), profileFromQuery(), QuerySource, items, DOCUMENT_BANDS, EMPLOYEE_BANDS (+13 more)

### Community 141 - "parallel-run.tsx"
Cohesion: 0.13
Nodes (27): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+19 more)

### Community 142 - "steps.ts"
Cohesion: 0.15
Nodes (14): Agency, BranchOptions, CaseStep, ClosureOptions, EMPLOYER_STEPS, LGU_STEPS, PlannedStep, RegistrationOptions (+6 more)

### Community 143 - "registration/page.tsx"
Cohesion: 0.25
Nodes (13): StepRow, Row, CaseRow, clientStatus, fmt(), PortalRegistration(), Registration(), daysTone() (+5 more)

### Community 144 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 145 - "ref_node_fs"
Cohesion: 0.08
Nodes (13): outDir, pkgDir, require, { version }, ctx, input, api, ctx (+5 more)

### Community 146 - "morning.ts"
Cohesion: 0.35
Nodes (9): GET(), Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+1 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.07
Nodes (48): Accounts(), AccountsPage(), GROUPS, Access, STATUS, Row, Asset, CASH_FLOW_CLASSES (+40 more)

### Community 148 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 149 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 150 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 152 - "safeguards.ts"
Cohesion: 0.10
Nodes (31): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+23 more)

### Community 153 - "register/page.tsx"
Cohesion: 0.27
Nodes (17): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+9 more)

### Community 154 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 155 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 156 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 157 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 159 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 160 - "december-rehearsal.test.ts"
Cohesion: 0.21
Nodes (6): approveIntoBooks(), as(), lockMonth(), payroll(), root, Row

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (17): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+9 more)

### Community 163 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 164 - "templatePayload"
Cohesion: 0.12
Nodes (11): templatePayload(), as(), client(), root, as(), books(), root, root (+3 more)

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 166 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 167 - "deadlines/actions.ts"
Cohesion: 0.42
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 168 - "items.ts"
Cohesion: 0.25
Nodes (8): BirCategory, Category, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ItemKind, KIND_ORDER, AmountField

### Community 169 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 170 - "tests/register.test.ts"
Cohesion: 0.40
Nodes (4): DocumentRow, approved(), as(), root

### Community 171 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 172 - "registrations/new/page.tsx"
Cohesion: 0.39
Nodes (6): ClientCaseKind, clientCase, NewRegistrationPage(), OwnerOnly(), manilaDate(), dtiRenewalDue()

### Community 174 - "clients/[id]/page.tsx"
Cohesion: 0.07
Nodes (52): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+44 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 177 - "registrations/actions.ts"
Cohesion: 0.19
Nodes (16): dtiRegisteredOn(), fieldErrors(), openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction(), updateStepAction(), branchSchema, checkbox (+8 more)

### Community 180 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 181 - "books/periods.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 182 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 185 - "onboarding/page.tsx"
Cohesion: 0.18
Nodes (16): RemoveFileButton(), TickForm(), fmtDate(), Onboarding(), OnboardingPage(), ItemState, MANUAL_ITEM_LABELS, MANUAL_ITEMS (+8 more)

### Community 193 - "supabaseServer"
Cohesion: 0.06
Nodes (80): @remixicon/react, setIncomeTaxMethodAction(), amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth() (+72 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1338 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `ref_node_path` to `form-2307.ts`, `engine.ts`, `package.json`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `module-pages.tsx`, `index.ts`, `payroll/forms.tsx`, `board.ts`, `supabaseAdmin`, `workpapers/page.tsx`, `payroll/payroll.test.ts`, `app/settings/page.tsx`, `leads/[id]/page.tsx`, `status.ts`, `form-1604e.ts`, `formToObject`, `toDecimalString`, `lock-bar.tsx`, `sign-in-form.tsx`, `testing.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `safeguards-load.ts`, `theme-toggle.tsx`, `quote.ts`, `Badge`, `registration.test.ts`, `server-only`, `deadlines/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `opening.ts`, `payroll/data.ts`, `ledger/books.ts`, `ui.ts`, `settings/actions.ts`, `rates.ts`, `review-form.tsx`, `brand/page.tsx`, `assets/schedule.ts`, `portal/page.tsx`, `package.json`, `calendar/callback/route.ts`, `app/documents/page.tsx`, `registrations/[id]/page.tsx`, `Centavos`, `batch/register.ts`, `documents/[id]/page.tsx`, `dates.ts`, `read.test.ts`, `return-file-actions.ts`, `fees/[id]/page.tsx`, `gemini.ts`, `work/load.ts`, `sign-off.ts`, `ticked-allocation.test.ts`, `ledger.test.ts`, `fees/types.ts`, `ref_node_fs`, `ledger/types.ts`, `register-books.test.ts`, `ledger-lock.test.ts`, `safeguards.ts`, `funnel.test.ts`, `filters.tsx`, `leads-pipeline.test.ts`, `parallel-run.test.ts`, `portal-statements-approval.test.ts`, `december-rehearsal.test.ts`, `calendar/page.tsx`, `books-migration.test.ts`, `templatePayload`, `fixed-assets.test.ts`, `tests/register.test.ts`, `tests/books.test.ts`, `month-complete.test.ts`, `clients/[id]/page.tsx`, `acting-approver.test.ts`, `tests/parties.test.ts`, `tests/payroll.test.ts`, `db.test.ts`, `books/periods.ts`, `books-2307.test.ts`, `fees.test.ts`, `adjustments.test.ts`, `onboarding/page.tsx`, `batch-upload.test.ts`, `client-reports.test.ts`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07800511508951406 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Skeleton` to `form-2307.ts`, `manilaToday`, `return-file-actions.ts`, `fees/[id]/page.tsx`, `onboarding/forms.tsx`, `public.ts`, `statement.ts`, `proof-actions.ts`, `return-file-actions.ts`, `parallel-run.tsx`, `app/app/layout.tsx`, `dependencies`, `registration/page.tsx`, `morning.ts`, `ledger/types.ts`, `statements.ts`, `fixed-assets/forms.tsx`, `register/page.tsx`, `sign-off-actions.tsx`, `deadlines/actions.ts`, `year-end/page.tsx`, `scores/page.tsx`, `registrations/new/page.tsx`, `clients/[id]/page.tsx`, `modal.tsx`, `payroll/forms.tsx`, `registrations/actions.ts`, `supabaseAdmin`, `workpapers/page.tsx`, `payroll/payroll.test.ts`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `leads/[id]/page.tsx`, `onboarding/page.tsx`, `formToObject`, `toDecimalString`, `cx`, `supabaseServer`, `sign-in-form.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `theme-toggle.tsx`, `Badge`, `button.tsx`, `server-only`, `deadlines/page.tsx`, `portal/reports/page.tsx`, `form-2316.tsx`, `leads/actions.ts`, `payroll/data.ts`, `formatAmount`, `ledger/books.ts`, `ui.ts`, `settings/actions.ts`, `brand/forms.tsx`, `proxy.ts`, `review-form.tsx`, `brand/page.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `package.json`, `calendar/callback/route.ts`, `app/documents/page.tsx`, `registrations/[id]/page.tsx`, `review-forms.tsx`, `batch/register.ts`, `quote/page.tsx`, `documents/[id]/page.tsx`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09647058823529411 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `form-2307.ts`, `manilaToday`, `fees/[id]/page.tsx`, `onboarding/forms.tsx`, `public.ts`, `registrations/forms.tsx`, `statement.ts`, `return-file-actions.ts`, `parallel-run.tsx`, `app/app/layout.tsx`, `dependencies`, `registration/page.tsx`, `statements.ts`, `ledger/types.ts`, `fixed-assets/forms.tsx`, `file-upload.tsx`, `register/page.tsx`, `filters.tsx`, `sign-off-actions.tsx`, `calendar/page.tsx`, `deadlines/actions.ts`, `year-end/page.tsx`, `scores/page.tsx`, `module-pages.tsx`, `registrations/new/page.tsx`, `clients/[id]/page.tsx`, `modal.tsx`, `payroll/forms.tsx`, `supabaseAdmin`, `checkbox.tsx`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `leads/[id]/page.tsx`, `onboarding/page.tsx`, `Notice`, `formToObject`, `toDecimalString`, `lock-bar.tsx`, `cx`, `supabaseServer`, `select.tsx`, `sign-in-form.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `social-button.tsx`, `theme-toggle.tsx`, `Badge`, `button.tsx`, `deadlines/page.tsx`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `notification.tsx`, `leads/actions.ts`, `payroll/data.ts`, `formatAmount`, `ledger/books.ts`, `ui.ts`, `settings/actions.ts`, `brand/forms.tsx`, `review-form.tsx`, `brand/page.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `package.json`, `calendar/callback/route.ts`, `app/documents/page.tsx`, `registrations/[id]/page.tsx`, `review-forms.tsx`, `batch/register.ts`, `quote/page.tsx`, `documents/[id]/page.tsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._