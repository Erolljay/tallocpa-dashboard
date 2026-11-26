# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 788 files · ~627,446 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4915 nodes · 17085 edges · 205 communities (181 shown, 24 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 142 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `b4eb7b98`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- engine.ts
- migrate.yml
- manilaToday
- arap.ts
- package.json
- react
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- supabaseServer
- Sign-in & Setup Docs
- onboarding/page.tsx
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
- source.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- lock-bar.tsx
- scripts
- supabaseAdmin
- workpapers/load.ts
- deadlines/page.tsx
- lib/books/actions.ts
- showDate
- app/app/page.tsx
- money.ts
- Skeleton
- form-1604e.ts
- Notice
- requireOwner
- pending-review.tsx
- steps.ts
- public.ts
- cx
- select.tsx
- Apple Design
- @supabase/supabase-js
- testing.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- invoice-pages.tsx
- Rules
- Animation Performance
- ocr/run.ts
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
- rows.ts
- BoardUI page patterns
- Pro templates
- workpapers/page.tsx
- ledger/books.ts
- ui.ts
- match.ts
- invoice-pages.tsx
- boardui
- rates.ts
- cx.ts
- proxy.ts
- fields.ts
- profile.ts
- vitest
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
- returns/types.ts
- LinkButton
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- fees/[id]/page.tsx
- [month]/page.tsx
- cycle/page.tsx
- read.test.ts
- checkbox.tsx
- return-file-actions.ts
- form-2307.tsx
- filings/actions.ts
- gemini.ts
- work/load.ts
- manilaToday
- document-upload.tsx
- ticked-allocation.test.ts
- columns.ts
- ledger.test.ts
- ref_node_fs
- [clientId]/page.tsx
- Centavos
- approval-memo.tsx
- Building UIs with BoardUI
- generate-qap-fixture.mjs
- formatAmount
- ledger/types.ts
- calendar/staff.ts
- portalContext
- leads/[id]/page.tsx
- sidebar-toggle.tsx
- safeguards.ts
- parts.ts
- seed.ts
- documents/[id]/page.tsx
- workpapers.test.ts
- funnel.test.ts
- LinkButton
- income.ts
- payroll/payroll.test.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- books-migration.test.ts
- tests/books.test.ts
- fixed-assets.test.ts
- payroll-read-actions.ts
- file-upload.tsx
- settings/actions.ts
- quote/page.tsx
- staff/actions.ts
- staff/page.tsx
- parallel-run.test.ts
- registrations/[id]/page.tsx
- clients/actions.ts
- acting-approver.test.ts
- [employeeId]/page.tsx
- steps.ts
- binder/page.tsx
- db.test.ts
- templatePayload
- returns-sign-off.test.ts
- ledger-lock.test.ts
- books-2307.test.ts
- leads-pipeline.test.ts
- onboarding/forms.tsx
- lock-actions.ts
- bulk-actions.ts
- lib/books/actions.ts
- ledger-documents.test.ts
- tests/payroll.test.ts
- template.ts
- batch-upload.test.ts
- memo.ts
- clients/[id]/page.tsx
- grid.ts
- app/requests/page.tsx
- periods
- filters.tsx
- names.ts
- tieouts.test.ts
- branches/actions.ts
- accept-form.tsx
- month-complete.test.ts
- books-lock.test.ts

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
10. `vitest` - 144 edges

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

## Communities (205 total, 24 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (38): Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print(), one(), portal2307(), portal2307Href(), SearchParams (+30 more)

### Community 1 - "engine.ts"
Cohesion: 0.10
Nodes (41): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+33 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "manilaToday"
Cohesion: 0.08
Nodes (44): server-only, Detail(), StatementPage(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Detail() (+36 more)

### Community 4 - "arap.ts"
Cohesion: 0.13
Nodes (25): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+17 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "react"
Cohesion: 0.10
Nodes (24): react, setupMissingChartsAction(), postPayrollAction(), PostState, PostPayrollButton(), SetupCharts(), DirectoryParty, ENTRY_STATUS (+16 more)

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
Nodes (54): nextConfig, next, setIncomeTaxMethodAction(), NewEntry(), NewEntryPage(), addClientNoteAction(), NoteState, FilingTable() (+46 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.14
Nodes (19): ClientTab, ClientTabs(), UNDER, RemoveFileButton(), TickForm(), fmtDate(), Onboarding(), OnboardingPage() (+11 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+11 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (55): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+47 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.18
Nodes (31): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+23 more)

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
Cohesion: 0.13
Nodes (26): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+18 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (32): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+24 more)

### Community 42 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (67): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+59 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.12
Nodes (20): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+12 more)

### Community 44 - "source.ts"
Cohesion: 0.10
Nodes (34): recomputeWorksheetAction(), WorksheetState, qapBuckets(), sawtBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc() (+26 more)

### Community 45 - "index.ts"
Cohesion: 0.08
Nodes (17): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+9 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.06
Nodes (82): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+74 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.12
Nodes (33): GET(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book() (+25 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.15
Nodes (20): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MemoMonth (+12 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 53 - "lib/books/actions.ts"
Cohesion: 0.16
Nodes (24): periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+16 more)

### Community 54 - "showDate"
Cohesion: 0.11
Nodes (30): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, Queue(), ReviewPage(), Row, Section() (+22 more)

### Community 55 - "app/app/page.tsx"
Cohesion: 0.18
Nodes (15): NotesCard(), ClientNoteForm(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry, noteEntry() (+7 more)

### Community 56 - "money.ts"
Cohesion: 0.13
Nodes (31): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+23 more)

### Community 57 - "Skeleton"
Cohesion: 0.11
Nodes (34): BankAccountsRoute(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+26 more)

### Community 58 - "form-1604e.ts"
Cohesion: 0.08
Nodes (50): client, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel(), EwtLine (+42 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (74): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+66 more)

### Community 60 - "requireOwner"
Cohesion: 0.31
Nodes (15): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+7 more)

### Community 61 - "pending-review.tsx"
Cohesion: 0.15
Nodes (18): Booking, BooksChoices(), Codes, initialCodes(), ocrKeys(), PendingReview(), PendingRow, PendingTaxCodes (+10 more)

### Community 62 - "steps.ts"
Cohesion: 0.09
Nodes (43): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+35 more)

### Community 63 - "public.ts"
Cohesion: 0.09
Nodes (30): requestQuoteAction(), SERVICES, StartState, metadata, Start(), StartPage(), ProposalData, QuerySource (+22 more)

### Community 64 - "cx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "select.tsx"
Cohesion: 0.06
Nodes (55): SheetPreview(), Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext (+47 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "@supabase/supabase-js"
Cohesion: 0.17
Nodes (17): @supabase/supabase-js@^2.119.2, @supabase/supabase-js, GET(), GET(), code, email, sendSignInEmail(), SignInState (+9 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (39): Client, CollectionsPage(), OpenDue, Overview(), Stat(), ProofReview(), ageOpenItems(), AGING_BUCKETS (+31 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (38): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList(), Row (+30 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (40): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+32 more)

### Community 72 - "invoice-pages.tsx"
Cohesion: 0.08
Nodes (46): InvoiceEdit(), InvoiceView(), JournalEntryRoute(), JournalView(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage() (+38 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ocr/run.ts"
Cohesion: 0.16
Nodes (23): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), normalizeTin(), ocrProviderFromEnv(), runOcr(), runPendingOcr() (+15 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.10
Nodes (28): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+20 more)

### Community 77 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (35): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+27 more)

### Community 79 - "quote.ts"
Cohesion: 0.08
Nodes (47): PriceRow, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), items (+39 more)

### Community 80 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 81 - "Badge"
Cohesion: 0.21
Nodes (13): ClientList(), ClientsPage(), Row, FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs() (+5 more)

### Community 82 - "parties/page.tsx"
Cohesion: 0.16
Nodes (17): ClientValues, frequencyLabel, Props, StaffOptions(), EditClient(), EditClientPage(), Branch, branchSchema (+9 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "server-only"
Cohesion: 0.14
Nodes (18): GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage(), DigestRow, longDay(), peso (+10 more)

### Community 86 - "acting-approver/page.tsx"
Cohesion: 0.19
Nodes (19): ActingState, appointActingAction(), endActingAction(), refresh(), EndButton(), Acting(), ActingApproverPage(), Approval (+11 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (63): PortalClient, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat() (+55 more)

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

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (33): BookingLink(), ConvertForm(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), Person, ProposalForm(), ReopenForm() (+25 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "rows.ts"
Cohesion: 0.09
Nodes (37): AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+29 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+15 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.06
Nodes (50): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+42 more)

### Community 101 - "ui.ts"
Cohesion: 0.07
Nodes (48): blankLine(), InvoiceForm(), InvoiceFormValue, BooksSummaryPage(), Summary(), SummaryCard(), fmt(), OpenInvoice (+40 more)

### Community 102 - "match.ts"
Cohesion: 0.26
Nodes (11): matchesOf(), digits(), editDistance(), EmployeeMatch, keyNo(), matchEmployee(), MatchStatus, nameScore() (+3 more)

### Community 103 - "invoice-pages.tsx"
Cohesion: 0.20
Nodes (14): INVOICE_KINDS, InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesListPage(), SalesInvoicesListPage(), daysBetween() (+6 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 106 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "fields.ts"
Cohesion: 0.12
Nodes (23): BatchRow, Readiness, checkFields(), Issue, num(), msgs(), ok, FieldKey (+15 more)

### Community 109 - "profile.ts"
Cohesion: 0.06
Nodes (48): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+40 more)

### Community 110 - "vitest"
Cohesion: 0.05
Nodes (17): pg, vitest, root, root, HASH, LEAD, root, root (+9 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+19 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.09
Nodes (41): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+33 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 115 - "ledger/data.ts"
Cohesion: 0.13
Nodes (30): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), OpeningChecklist(), AMENDMENT_BADGE (+22 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.24
Nodes (15): disconnectCalendarAction(), GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches() (+7 more)

### Community 118 - "buildSawt"
Cohesion: 0.14
Nodes (38): incomeAttachments(), buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm (+30 more)

### Community 119 - "PageHeader"
Cohesion: 0.13
Nodes (27): DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one() (+19 more)

### Community 120 - "filings/[id]/page.tsx"
Cohesion: 0.09
Nodes (40): bookKind, BookRow, bookStatus, Event, eventText, Filing(), FilingFile, FilingPage() (+32 more)

### Community 121 - "returns/types.ts"
Cohesion: 0.08
Nodes (35): FinancialStatements, withNonDeductible(), PAYROLL_FORMS, client, YEAR, dayBefore(), FilingRow, ListedDocument (+27 more)

### Community 122 - "LinkButton"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 126 - "[month]/page.tsx"
Cohesion: 0.15
Nodes (18): AGENCIES, Db, p(), PayrollRuns(), Run, lastDay(), PAY_PERIODS, PayPeriod (+10 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.25
Nodes (13): MonthComplete(), SentRow, TimelineRow, peso, closeCycleAction(), confirmMonthAction(), CycleState, decideExceptionAction() (+5 more)

### Community 128 - "read.test.ts"
Cohesion: 0.07
Nodes (41): geminiJson(), amountOf(), applyColumns(), ANA1, ANA2, BASIC, CLIENT_SHEET, EMPLOYEES (+33 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "return-file-actions.ts"
Cohesion: 0.11
Nodes (31): RFC-2047, RFC-2822, EsubmissionMailEnv, DatFiles, datFiles(), Db, accessToken(), call() (+23 more)

### Community 131 - "form-2307.tsx"
Cohesion: 0.18
Nodes (18): Batch(), BatchPage(), one(), toCentavos(), Accreditation(), amount(), AmountRow(), DateCells() (+10 more)

### Community 132 - "filings/actions.ts"
Cohesion: 0.35
Nodes (11): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+3 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (19): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+11 more)

### Community 134 - "work/load.ts"
Cohesion: 0.12
Nodes (31): addDays(), isWeekend(), parseIso(), toIso(), documentCutoff(), DONE_FROM_STATUS, isWorkingDay(), loadBoard() (+23 more)

### Community 135 - "manilaToday"
Cohesion: 0.29
Nodes (12): accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+4 more)

### Community 136 - "document-upload.tsx"
Cohesion: 0.22
Nodes (15): DocumentUpload(), send(), upload(), Item, typeFromName(), METHODS, ProofUpload(), send() (+7 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "columns.ts"
Cohesion: 0.15
Nodes (22): CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS, findHeaderRow(), knownTarget(), liveTarget(), SavedMap (+14 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.09
Nodes (9): outDir, pkgDir, require, { version }, ctx, input, root, root (+1 more)

### Community 141 - "[clientId]/page.tsx"
Cohesion: 0.22
Nodes (20): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+12 more)

### Community 142 - "Centavos"
Cohesion: 0.14
Nodes (15): SaleSplit, Form2316Data, Form2316Line, LABELS, PayTotals, TotalCheck, CheckedRegister, MonthInput (+7 more)

### Community 143 - "approval-memo.tsx"
Cohesion: 0.31
Nodes (7): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, grossSales(), approvalMemo()

### Community 144 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "formatAmount"
Cohesion: 0.23
Nodes (12): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+4 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.11
Nodes (24): Access, STATUS, codes, PNL, COA_TEMPLATES, Cutoff, cutoffOf(), PNL_TYPES (+16 more)

### Community 148 - "calendar/staff.ts"
Cohesion: 0.16
Nodes (21): Interval, Admin, busyOf(), connect(), Connection, holidaysBetween(), PersonWeek, teamWeek() (+13 more)

### Community 149 - "portalContext"
Cohesion: 0.17
Nodes (24): @remixicon/react, RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send() (+16 more)

### Community 150 - "leads/[id]/page.tsx"
Cohesion: 0.23
Nodes (17): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState (+9 more)

### Community 151 - "sidebar-toggle.tsx"
Cohesion: 0.18
Nodes (12): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+4 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.10
Nodes (30): GET(), CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay() (+22 more)

### Community 153 - "parts.ts"
Cohesion: 0.10
Nodes (38): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+30 more)

### Community 154 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 155 - "documents/[id]/page.tsx"
Cohesion: 0.07
Nodes (50): Doc, ExceptionRow, ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), ApprovedTable() (+42 more)

### Community 156 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 157 - "funnel.test.ts"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 158 - "LinkButton"
Cohesion: 0.33
Nodes (11): booksContext(), BooksContext, one(), MonthSelect(), Certificates(), Staff2307Page(), Print(), Print2307Page() (+3 more)

### Community 159 - "income.ts"
Cohesion: 0.09
Nodes (44): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), form1701, form1702RT (+36 more)

### Community 160 - "payroll/payroll.test.ts"
Cohesion: 0.07
Nodes (62): file(), GET(), safe(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion() (+54 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.22
Nodes (18): FormState, DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton() (+10 more)

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
Cohesion: 0.17
Nodes (21): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+13 more)

### Community 167 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 168 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 169 - "quote/page.tsx"
Cohesion: 0.24
Nodes (14): loadSchedules(), loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview() (+6 more)

### Community 170 - "staff/actions.ts"
Cohesion: 0.23
Nodes (12): addClientUserAction(), fieldErrors(), inviteStaffAction(), removeClientUserAction(), updateStaffAction(), ensureLogin(), clientUserSchema, email (+4 more)

### Community 171 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 172 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 173 - "registrations/[id]/page.tsx"
Cohesion: 0.17
Nodes (28): StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+20 more)

### Community 174 - "clients/actions.ts"
Cohesion: 0.11
Nodes (25): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+17 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "[employeeId]/page.tsx"
Cohesion: 0.44
Nodes (7): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), PriorEmployerForm(), payAccountsOf()

### Community 177 - "steps.ts"
Cohesion: 0.14
Nodes (15): Agency, BranchOptions, CaseStep, ClosureOptions, EMPLOYER_STEPS, LGU_STEPS, PlannedStep, RegistrationOptions (+7 more)

### Community 178 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 180 - "templatePayload"
Cohesion: 0.11
Nodes (11): templatePayload(), as(), client(), root, as(), books(), root, MONTHS (+3 more)

### Community 181 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 183 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 184 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 185 - "onboarding/forms.tsx"
Cohesion: 0.28
Nodes (12): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), send() (+4 more)

### Community 186 - "lock-actions.ts"
Cohesion: 0.31
Nodes (13): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+5 more)

### Community 187 - "bulk-actions.ts"
Cohesion: 0.22
Nodes (12): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), DocumentCodes (+4 more)

### Community 188 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (13): AmendmentFlag, BooksMonthRow, booksUnlockRequests(), CodeSource, Db, DocumentPortion, DocumentPosting, InvoiceInput (+5 more)

### Community 191 - "template.ts"
Cohesion: 0.18
Nodes (10): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+2 more)

### Community 193 - "memo.ts"
Cohesion: 0.21
Nodes (11): ReviewNote, Memo, MemoInput, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), SIGNED_REFS (+3 more)

### Community 194 - "clients/[id]/page.tsx"
Cohesion: 0.36
Nodes (11): AssignForm(), ClientUserForm(), EngagementForm(), IncomeTaxMethodForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail() (+3 more)

### Community 195 - "grid.ts"
Cohesion: 0.24
Nodes (11): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+3 more)

### Community 196 - "app/requests/page.tsx"
Cohesion: 0.36
Nodes (8): Requests(), RequestsPage(), Row, Row, dayNumber(), daysBetween(), Direction, RequestStatus

### Community 197 - "periods"
Cohesion: 0.47
Nodes (9): Periods, periods(), addMonths(), docsWithin(), monthEnd(), monthWithin(), pad2(), quarterOf() (+1 more)

### Community 198 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 199 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 200 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 201 - "branches/actions.ts"
Cohesion: 0.60
Nodes (5): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction()

### Community 202 - "accept-form.tsx"
Cohesion: 0.70
Nodes (3): acceptProposalAction(), AcceptState, contentHash()

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1324 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `engine.ts`, `arap.ts`, `package.json`, `onboarding/page.tsx`, `statements.ts`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `source.ts`, `index.ts`, `lock-bar.tsx`, `supabaseAdmin`, `workpapers/load.ts`, `deadlines/page.tsx`, `lib/books/actions.ts`, `showDate`, `app/app/page.tsx`, `form-1604e.ts`, `pending-review.tsx`, `steps.ts`, `public.ts`, `@supabase/supabase-js`, `testing.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `theme-toggle.tsx`, `quote.ts`, `parties/page.tsx`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `leads/[id]/page.tsx`, `opening.ts`, `rows.ts`, `ledger/books.ts`, `ui.ts`, `invoice-pages.tsx`, `rates.ts`, `fields.ts`, `profile.ts`, `fixed-assets/page.tsx`, `portal/page.tsx`, `calendar/callback/route.ts`, `PageHeader`, `filings/[id]/page.tsx`, `returns/types.ts`, `batch/register.ts`, `[month]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `gemini.ts`, `work/load.ts`, `ticked-allocation.test.ts`, `ledger.test.ts`, `ref_node_fs`, `approval-memo.tsx`, `ledger/types.ts`, `portalContext`, `safeguards.ts`, `parts.ts`, `documents/[id]/page.tsx`, `workpapers.test.ts`, `payroll/payroll.test.ts`, `calendar/page.tsx`, `books-migration.test.ts`, `tests/books.test.ts`, `fixed-assets.test.ts`, `settings/actions.ts`, `staff/actions.ts`, `parallel-run.test.ts`, `clients/actions.ts`, `acting-approver.test.ts`, `db.test.ts`, `templatePayload`, `returns-sign-off.test.ts`, `ledger-lock.test.ts`, `books-2307.test.ts`, `leads-pipeline.test.ts`, `ledger-documents.test.ts`, `tests/payroll.test.ts`, `template.ts`, `batch-upload.test.ts`, `memo.ts`, `filters.tsx`, `names.ts`, `tieouts.test.ts`, `month-complete.test.ts`, `books-lock.test.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10815602836879433 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `manilaToday`, `arap.ts`, `package.json`, `react`, `onboarding/page.tsx`, `dependencies`, `statements.ts`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `source.ts`, `payroll/forms.tsx`, `lock-bar.tsx`, `supabaseAdmin`, `deadlines/page.tsx`, `lib/books/actions.ts`, `showDate`, `Skeleton`, `Notice`, `requireOwner`, `pending-review.tsx`, `steps.ts`, `public.ts`, `select.tsx`, `@supabase/supabase-js`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `invoice-pages.tsx`, `ocr/run.ts`, `theme-toggle.tsx`, `Badge`, `parties/page.tsx`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `workpapers/page.tsx`, `ledger/books.ts`, `ui.ts`, `invoice-pages.tsx`, `proxy.ts`, `profile.ts`, `fixed-assets/page.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `ledger/data.ts`, `calendar/callback/route.ts`, `PageHeader`, `filings/[id]/page.tsx`, `LinkButton`, `batch/register.ts`, `fees/[id]/page.tsx`, `[month]/page.tsx`, `cycle/page.tsx`, `form-2307.tsx`, `filings/actions.ts`, `manilaToday`, `document-upload.tsx`, `[clientId]/page.tsx`, `approval-memo.tsx`, `formatAmount`, `ledger/types.ts`, `portalContext`, `leads/[id]/page.tsx`, `sidebar-toggle.tsx`, `safeguards.ts`, `parts.ts`, `documents/[id]/page.tsx`, `funnel.test.ts`, `LinkButton`, `payroll/payroll.test.ts`, `payroll-read-actions.ts`, `settings/actions.ts`, `quote/page.tsx`, `staff/actions.ts`, `registrations/[id]/page.tsx`, `clients/actions.ts`, `[employeeId]/page.tsx`, `binder/page.tsx`, `onboarding/forms.tsx`, `lock-actions.ts`, `bulk-actions.ts`, `clients/[id]/page.tsx`, `app/requests/page.tsx`, `branches/actions.ts`, `accept-form.tsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09840425531914894 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `manilaToday`, `package.json`, `supabaseServer`, `onboarding/page.tsx`, `dependencies`, `statements.ts`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `payroll/forms.tsx`, `modal.tsx`, `lock-bar.tsx`, `supabaseAdmin`, `deadlines/page.tsx`, `lib/books/actions.ts`, `showDate`, `app/app/page.tsx`, `Skeleton`, `Notice`, `pending-review.tsx`, `steps.ts`, `public.ts`, `cx`, `select.tsx`, `@supabase/supabase-js`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `invoice-pages.tsx`, `stat-cards.tsx`, `social-button.tsx`, `theme-toggle.tsx`, `notification.tsx`, `Badge`, `parties/page.tsx`, `button.tsx`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `leads/[id]/page.tsx`, `workpapers/page.tsx`, `ledger/books.ts`, `ui.ts`, `invoice-pages.tsx`, `cx.ts`, `fixed-assets/page.tsx`, `portal/page.tsx`, `ledger/data.ts`, `PageHeader`, `filings/[id]/page.tsx`, `LinkButton`, `fees/[id]/page.tsx`, `cycle/page.tsx`, `checkbox.tsx`, `form-2307.tsx`, `document-upload.tsx`, `[clientId]/page.tsx`, `formatAmount`, `portalContext`, `leads/[id]/page.tsx`, `sidebar-toggle.tsx`, `parts.ts`, `documents/[id]/page.tsx`, `funnel.test.ts`, `LinkButton`, `calendar/page.tsx`, `payroll-read-actions.ts`, `file-upload.tsx`, `quote/page.tsx`, `staff/page.tsx`, `registrations/[id]/page.tsx`, `clients/actions.ts`, `[employeeId]/page.tsx`, `binder/page.tsx`, `onboarding/forms.tsx`, `clients/[id]/page.tsx`, `app/requests/page.tsx`, `filters.tsx`, `accept-form.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._