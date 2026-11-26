# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 890 files · ~704,311 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5511 nodes · 19233 edges · 208 communities (187 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 174 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `b9f27105`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- december-rehearsal.test.ts
- migrate.yml
- tax-codes.ts
- public.ts
- package.json
- clients/[id]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
- Sign-in & Setup Docs
- notification.tsx
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
- year-end/page.tsx
- manilaToday
- compare.ts
- payroll/types.ts
- requireStaff
- index.ts
- payroll/forms.tsx
- modal.tsx
- deadlines/page.tsx
- scripts
- slots.ts
- fees/[id]/page.tsx
- payroll/payroll.test.ts
- documents/labels.ts
- module-pages.tsx
- marketing/page.tsx
- payroll/data.ts
- registrations/forms.tsx
- form-1604e.ts
- Notice
- steps.ts
- books/export/route.ts
- morning.ts
- lock-bar.tsx
- input.tsx
- invoice-pages.tsx
- Apple Design
- supabaseServer
- testing.ts
- clients/actions.ts
- parties/parties.test.ts
- books/forms.tsx
- year.ts
- Rules
- Animation Performance
- site-document.tsx
- file-upload.tsx
- cycle/page.tsx
- theme-toggle.tsx
- quote.ts
- app/layout.tsx
- how-we-work/page.tsx
- settings/actions.ts
- button.tsx
- Pro components
- getIdentity
- tools/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- filings/actions.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- site/brand.ts
- Recipes
- notifications-view.tsx
- BoardUI page patterns
- Pro templates
- formatAmount
- Centavos
- engine.ts
- select.tsx
- cx.ts
- boardui
- quote/page.tsx
- profile.ts
- filings/[id]/page.tsx
- template.ts
- stat-cards.tsx
- ref_node_fs
- Opening balances: checklist for any cut-off
- month.ts
- portal/page.tsx
- lib/books/actions.ts
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- vat.ts
- proposal-view.tsx
- returns/types.ts
- chrome.tsx
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- showDate
- toCentavos
- parties/[id]/page.tsx
- read.test.ts
- opening.ts
- return-file-actions.ts
- fields.ts
- onboarding/page.tsx
- gemini.ts
- fixed-assets/page.tsx
- compute.ts
- react
- ticked-allocation.test.ts
- review/page.tsx
- ledger.test.ts
- queries.ts
- bulk-actions.ts
- idle-watcher.tsx
- notifications/format.ts
- book-income.ts
- cx
- supabaseAdmin
- ledger/data.ts
- portal/layout.tsx
- direction.tsx
- @remixicon/react
- holiday-list.ts
- addDays
- workpapers/page.tsx
- switch.tsx
- Badge
- safeguards-load.ts
- gap/page.tsx
- notes.ts
- acting-approver/page.tsx
- bell-store.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- lock-actions.ts
- source.ts
- returns/books.test.ts
- social-button.tsx
- opengraph-image.tsx
- lead-attribution.test.ts
- booksContext
- Building UIs with BoardUI
- layout.ts
- app/settings/page.tsx
- resolve.ts
- requireOwner
- acting-approver.test.ts
- fixed-assets.test.ts
- xlsx.ts
- parallel-run.test.ts
- returns-sign-off.test.ts
- batch/load.ts
- payroll/export/route.ts
- leads-pipeline.test.ts
- vitest
- filings/run.ts
- tests/books.test.ts
- parties/forms.tsx
- portal-statements-approval.test.ts
- batch/forms.tsx
- books/reports/statements/page.tsx
- spinner.tsx
- filters.tsx
- scroll-fade.tsx
- names.ts
- bir-filing-calendar/page.tsx
- missing-2307/page.tsx
- generate-qap-fixture.mjs
- pagination.tsx
- seed.ts
- ledger-lock.test.ts
- tests/register.test.ts
- funnel.test.ts
- returns-books.test.ts
- books-migration.test.ts
- templates/README.md
- ledger-documents.test.ts
- register-books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 311 edges
2. `cx` - 280 edges
3. `react` - 252 edges
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

## Communities (208 total, 21 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.10
Nodes (42): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print() (+34 more)

### Community 1 - "december-rehearsal.test.ts"
Cohesion: 0.11
Nodes (13): as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll() (+5 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "tax-codes.ts"
Cohesion: 0.18
Nodes (15): SettingsPage(), SettingsRoute(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES (+7 more)

### Community 4 - "public.ts"
Cohesion: 0.12
Nodes (26): ProposalSetup, pageAttribution(), requestQuoteAction(), SERVICES, StartState, JobOption, InstantQuote, instantView() (+18 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "clients/[id]/page.tsx"
Cohesion: 0.11
Nodes (31): FormState, removeAssignmentAction(), setIncomeTaxMethodAction(), ClientForm(), frequencyLabel, Props, StaffOptions(), EditClient() (+23 more)

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
Cohesion: 0.25
Nodes (16): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), BellAudience (+8 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "notification.tsx"
Cohesion: 0.06
Nodes (33): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+25 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+12 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (37): defaultCashFlow(), codes, PNL, FS_LINES, FsLine, FsLineKey, isFsLine(), Section (+29 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.11
Nodes (61): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+53 more)

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

### Community 40 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 41 - "manilaToday"
Cohesion: 0.08
Nodes (46): DashboardStats(), FilingTable(), OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ActingNotice() (+38 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (62): CELL, FirmParallelRunPage(), monthShort(), Summary(), KIND, REASON, Section(), shortDate() (+54 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "requireStaff"
Cohesion: 0.14
Nodes (22): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), send() (+14 more)

### Community 45 - "index.ts"
Cohesion: 0.04
Nodes (30): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+22 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (58): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+50 more)

### Community 47 - "modal.tsx"
Cohesion: 0.16
Nodes (25): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+17 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+20 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.13
Nodes (32): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+24 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.11
Nodes (40): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+32 more)

### Community 52 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (44): MonthGrid(), toInput(), PayrollSetupPage(), Setup(), CATEGORIES, Category, CATEGORY_KEYS, categoryTotals() (+36 more)

### Community 53 - "documents/labels.ts"
Cohesion: 0.07
Nodes (47): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+39 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.12
Nodes (25): BankAccountsRoute(), fmtMonth(), BooksList(), Column, ListRow, RowLink(), CustomersRoute(), EmployeesRoute() (+17 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.07
Nodes (52): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+44 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.08
Nodes (50): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), AlphaCols (+42 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.08
Nodes (43): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+35 more)

### Community 58 - "form-1604e.ts"
Cohesion: 0.07
Nodes (58): qapBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), incomePayment(), agentBackground(), agentErrors() (+50 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (71): BatchUpload(), AmendmentRequestForm(), ArapUpload(), CloseYearForm(), EntryForm(), OpeningUpload(), ReleaseReportForm(), SetupForm() (+63 more)

### Community 60 - "steps.ts"
Cohesion: 0.08
Nodes (57): SectionTabs(), CompleteButton(), StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage() (+49 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.12
Nodes (26): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+18 more)

### Community 62 - "morning.ts"
Cohesion: 0.12
Nodes (20): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+12 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (29): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+21 more)

### Community 64 - "input.tsx"
Cohesion: 0.11
Nodes (29): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+21 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.08
Nodes (58): fmtDate(), SearchParams, BooksFrame(), INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind (+50 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "supabaseServer"
Cohesion: 0.06
Nodes (48): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), GET() (+40 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "clients/actions.ts"
Cohesion: 0.10
Nodes (30): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), updateClientAction(), addBranchAction(), BranchState (+22 more)

### Community 70 - "parties/parties.test.ts"
Cohesion: 0.22
Nodes (15): normalizeTin(), lookupParties(), person, blank(), optionalText(), PartyInput, partySchema, branch4() (+7 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (44): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+36 more)

### Community 72 - "year.ts"
Cohesion: 0.10
Nodes (40): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+32 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 76 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 77 - "cycle/page.tsx"
Cohesion: 0.17
Nodes (18): Cycle(), CyclePage(), CycleWithClient, DocRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction() (+10 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.17
Nodes (19): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+11 more)

### Community 79 - "quote.ts"
Cohesion: 0.09
Nodes (38): PriceRow, corp, items, proposal(), buildProposalQuote(), JOB_GROUPS, JobBand, jobField (+30 more)

### Community 80 - "app/layout.tsx"
Cohesion: 0.16
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+11 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (35): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+27 more)

### Community 82 - "settings/actions.ts"
Cohesion: 0.18
Nodes (17): zod@^4.6.7, zod, addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow (+9 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "getIdentity"
Cohesion: 0.18
Nodes (22): RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), Thread() (+14 more)

### Community 86 - "tools/page.tsx"
Cohesion: 0.17
Nodes (22): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), ReverseForm() (+14 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (70): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote() (+62 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "filings/actions.ts"
Cohesion: 0.06
Nodes (62): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, advanceFilingAction() (+54 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (25): Select(), SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind (+17 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.11
Nodes (40): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+32 more)

### Community 94 - "site/brand.ts"
Cohesion: 0.11
Nodes (27): robots(), sitemap(), clean(), FALLBACK_BRAND, SiteBrand, BRAND_NAME, PRACTITIONER, siteUrl() (+19 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "notifications-view.tsx"
Cohesion: 0.12
Nodes (27): notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, Empty(), NotificationsView(), one() (+19 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "formatAmount"
Cohesion: 0.06
Nodes (66): blankLine(), InvoiceForm(), InvoiceFormValue, BooksSummaryPage(), Summary(), SummaryCard(), fmt(), OpenInvoice (+58 more)

### Community 100 - "Centavos"
Cohesion: 0.06
Nodes (53): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+45 more)

### Community 101 - "engine.ts"
Cohesion: 0.09
Nodes (46): shift(), addMonths(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), toIso() (+38 more)

### Community 102 - "select.tsx"
Cohesion: 0.11
Nodes (28): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+20 more)

### Community 103 - "cx.ts"
Cohesion: 0.10
Nodes (19): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Checkbox(), CheckboxProps, CheckboxGlyph() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "quote/page.tsx"
Cohesion: 0.16
Nodes (18): COMPLEXITY_LABEL, Lines(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), complexity(), count() (+10 more)

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (54): FilingRow, FilingListRow, SignOffState, bookKind, BookRow, bookStatus, Event, eventText (+46 more)

### Community 108 - "template.ts"
Cohesion: 0.07
Nodes (34): conditionsSchema, optionalAmount, range, ScheduleStatus, SettingsInput, settingsSchema, AUDIT_FIRM_FALLBACK, AUDIT_ITEMS (+26 more)

### Community 109 - "stat-cards.tsx"
Cohesion: 0.12
Nodes (23): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+15 more)

### Community 110 - "ref_node_fs"
Cohesion: 0.05
Nodes (14): outDir, pkgDir, require, { version }, dir, ctx, input, root (+6 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (48): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+40 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (25): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+17 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.09
Nodes (51): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+43 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.12
Nodes (35): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+27 more)

### Community 118 - "vat.ts"
Cohesion: 0.12
Nodes (48): sawtBuckets(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments() (+40 more)

### Community 119 - "proposal-view.tsx"
Cohesion: 0.16
Nodes (17): jobName(), lineName(), longDate(), money(), php, ProposalView(), Rows(), Section() (+9 more)

### Community 120 - "returns/types.ts"
Cohesion: 0.06
Nodes (45): worksheetTaxDue(), FinancialStatements, SaleSplit, withNonDeductible(), BUSINESS_TAX_FORMS, SawtResult, Split, VatData (+37 more)

### Community 121 - "chrome.tsx"
Cohesion: 0.18
Nodes (19): metadata, QuotesClosed(), Start(), StartPage(), ButtonLink(), Lockup(), NAV, SiteChrome() (+11 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.15
Nodes (16): BatchCheck, BatchColumn, BatchContext, BatchRow, centavosOf(), checkRow(), findAccount(), isoDate() (+8 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "showDate"
Cohesion: 0.08
Nodes (49): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+41 more)

### Community 126 - "toCentavos"
Cohesion: 0.09
Nodes (39): PreviewTable(), applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction() (+31 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.16
Nodes (20): fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList(), Row, datAddress() (+12 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (79): RFC-4180, geminiJson(), ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, PayrollItem, amountOf() (+71 more)

### Community 129 - "opening.ts"
Cohesion: 0.16
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+9 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "fields.ts"
Cohesion: 0.13
Nodes (19): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, normalizeAmount() (+11 more)

### Community 132 - "onboarding/page.tsx"
Cohesion: 0.18
Nodes (16): RemoveFileButton(), TickForm(), fmtDate(), Onboarding(), OnboardingPage(), ItemState, MANUAL_ITEM_LABELS, MANUAL_ITEMS (+8 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (19): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+11 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 135 - "compute.ts"
Cohesion: 0.14
Nodes (30): annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation() (+22 more)

### Community 136 - "react"
Cohesion: 0.06
Nodes (62): react, setupMissingChartsAction(), Batch(), BatchPage(), one(), toCentavos(), JournalEntryRoute(), NewEntry() (+54 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "review/page.tsx"
Cohesion: 0.14
Nodes (20): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), Returns(), FilingsTabs(), Queue(), ReviewPage() (+12 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "queries.ts"
Cohesion: 0.13
Nodes (19): GET(), isNotificationKind(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS, NotificationAudience, NotificationGroup, NotificationKind, NotificationKindInfo (+11 more)

### Community 141 - "bulk-actions.ts"
Cohesion: 0.14
Nodes (18): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), DocumentCodes (+10 more)

### Community 142 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 143 - "notifications/format.ts"
Cohesion: 0.20
Nodes (14): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+6 more)

### Community 144 - "book-income.ts"
Cohesion: 0.27
Nodes (9): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, NonDeductibleRow (+1 more)

### Community 145 - "cx"
Cohesion: 0.09
Nodes (51): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+43 more)

### Community 146 - "supabaseAdmin"
Cohesion: 0.14
Nodes (33): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), decideExceptionAction(), tellPreparer() (+25 more)

### Community 147 - "ledger/data.ts"
Cohesion: 0.09
Nodes (36): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Asset, BookEntry, CASH_FLOW_CLASSES, CashFlowClass (+28 more)

### Community 148 - "portal/layout.tsx"
Cohesion: 0.24
Nodes (12): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+4 more)

### Community 149 - "direction.tsx"
Cohesion: 0.12
Nodes (18): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+10 more)

### Community 150 - "@remixicon/react"
Cohesion: 0.12
Nodes (41): @remixicon/react, AboutPage(), HOW, metadata, BRING, ContactList(), ContactPage(), metadata (+33 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.26
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+3 more)

### Community 152 - "addDays"
Cohesion: 0.08
Nodes (42): loadAssets(), Row, addDays(), board, MARCO, none, RHEA, row() (+34 more)

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 154 - "switch.tsx"
Cohesion: 0.24
Nodes (9): EmailSwitches(), EmailSwitchGroup, Switch(), SwitchProps, SwitchShape, SwitchSize, switchSizes, SwitchVisualState (+1 more)

### Community 155 - "Badge"
Cohesion: 0.09
Nodes (42): PreviewTable(), Payroll(), ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review() (+34 more)

### Community 156 - "safeguards-load.ts"
Cohesion: 0.22
Nodes (14): ClientValues, obligationChanges(), obligationsForTaxTypes(), TAX_TYPES, TaxpayerType, TaxType, TaxTypeError, forms() (+6 more)

### Community 157 - "gap/page.tsx"
Cohesion: 0.11
Nodes (27): EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow (+19 more)

### Community 158 - "notes.ts"
Cohesion: 0.20
Nodes (14): NotesCard(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry, noteEntry(), NoteRow (+6 more)

### Community 159 - "acting-approver/page.tsx"
Cohesion: 0.26
Nodes (14): EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge, activeFor(), Appointment, appointmentRow() (+6 more)

### Community 160 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (19): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+11 more)

### Community 163 - "lock-actions.ts"
Cohesion: 0.31
Nodes (13): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+5 more)

### Community 164 - "source.ts"
Cohesion: 0.22
Nodes (14): approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND, isApproved(), monthInPeriod(), monthOf(), monthsInPeriod(), priorKey() (+6 more)

### Community 165 - "returns/books.test.ts"
Cohesion: 0.16
Nodes (11): client, row(), form1701, form1702RT, form1701Q, form1702Q, form2551Q, form2550Q (+3 more)

### Community 166 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 169 - "booksContext"
Cohesion: 0.33
Nodes (10): booksContext(), BooksContext, one(), Print(), Print2307Page(), ParallelRun(), ParallelRunPage(), quarterMonths() (+2 more)

### Community 170 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 171 - "layout.ts"
Cohesion: 0.26
Nodes (13): bodyBlocks(), DEFAULT_BRAND, EmailAction, escapeHtml(), fullBrand(), linkify(), plainTextToHtml(), receivingLine() (+5 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (39): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), Rule (+31 more)

### Community 173 - "resolve.ts"
Cohesion: 0.23
Nodes (14): displayName(), fullAddress(), listNameCols(), Party, ABBREVIATIONS, fillFromDirectory(), nameTokens(), PartyFields (+6 more)

### Community 174 - "requireOwner"
Cohesion: 0.21
Nodes (20): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), peso, recordDepositAction() (+12 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 177 - "xlsx.ts"
Cohesion: 0.26
Nodes (11): accountLabel(), BATCH_COLUMNS, BATCH_KINDS, RawRow, buildBatchTemplate(), cellText(), MAX_ROWS, norm() (+3 more)

### Community 178 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 180 - "batch/load.ts"
Cohesion: 0.33
Nodes (8): GET(), safe(), loadAccounts(), loadBatchContext(), monthsBetween(), BatchAccount, dupKey(), XLSX_TYPE

### Community 181 - "payroll/export/route.ts"
Cohesion: 0.38
Nodes (9): file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), draftToTemplate(), initialDraft(), monthTitle() (+1 more)

### Community 182 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 183 - "vitest"
Cohesion: 0.05
Nodes (14): pg, vitest, root, root, root, root, root, root (+6 more)

### Community 184 - "filings/run.ts"
Cohesion: 0.36
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 185 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 186 - "parties/forms.tsx"
Cohesion: 0.36
Nodes (8): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), PartyKind

### Community 188 - "batch/forms.tsx"
Cohesion: 0.44
Nodes (7): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), BatchKind, checkBatch()

### Community 189 - "books/reports/statements/page.tsx"
Cohesion: 0.39
Nodes (8): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), loadReleasedReports(), loadStatements(), REPORT_KINDS

### Community 190 - "spinner.tsx"
Cohesion: 0.32
Nodes (7): PendingGlyph(), Arc(), SIZES, Spinner(), SpinnerGlyph(), SpinnerProps, SpinnerSize

### Community 191 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 192 - "scroll-fade.tsx"
Cohesion: 0.38
Nodes (6): SheetPreview(), SelectList(), SCROLL_FADE_DISTANCE, ScrollFade(), ScrollFadeProps, useScrollFade()

### Community 193 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 194 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 195 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 196 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 197 - "pagination.tsx"
Cohesion: 0.47
Nodes (4): Pagination(), PaginationProps, paginationRange(), useIsCompact()

### Community 198 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 199 - "ledger-lock.test.ts"
Cohesion: 0.33
Nodes (3): BOOK_LOCK_FORMS, doc(), root

### Community 200 - "tests/register.test.ts"
Cohesion: 0.40
Nodes (4): DocumentRow, approved(), as(), root

### Community 201 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 203 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 207 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1466 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `december-rehearsal.test.ts`, `tax-codes.ts`, `public.ts`, `package.json`, `clients/[id]/page.tsx`, `statements.ts`, `year-end/page.tsx`, `manilaToday`, `compare.ts`, `index.ts`, `payroll/forms.tsx`, `deadlines/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `payroll/payroll.test.ts`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `form-1604e.ts`, `steps.ts`, `books/export/route.ts`, `morning.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `supabaseServer`, `testing.ts`, `clients/actions.ts`, `parties/parties.test.ts`, `cycle/page.tsx`, `quote.ts`, `settings/actions.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `filings/actions.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `site/brand.ts`, `formatAmount`, `Centavos`, `engine.ts`, `quote/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `template.ts`, `ref_node_fs`, `month.ts`, `portal/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `proposal-view.tsx`, `returns/types.ts`, `batch/register.ts`, `read.test.ts`, `opening.ts`, `return-file-actions.ts`, `fields.ts`, `onboarding/page.tsx`, `gemini.ts`, `fixed-assets/page.tsx`, `compute.ts`, `ticked-allocation.test.ts`, `review/page.tsx`, `ledger.test.ts`, `bulk-actions.ts`, `idle-watcher.tsx`, `notifications/format.ts`, `cx`, `supabaseAdmin`, `ledger/data.ts`, `portal/layout.tsx`, `holiday-list.ts`, `addDays`, `Badge`, `safeguards-load.ts`, `gap/page.tsx`, `notes.ts`, `acting-approver/page.tsx`, `calendar/page.tsx`, `source.ts`, `returns/books.test.ts`, `lead-attribution.test.ts`, `layout.ts`, `app/settings/page.tsx`, `acting-approver.test.ts`, `fixed-assets.test.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `leads-pipeline.test.ts`, `tests/books.test.ts`, `portal-statements-approval.test.ts`, `filters.tsx`, `names.ts`, `bir-filing-calendar/page.tsx`, `ledger-lock.test.ts`, `tests/register.test.ts`, `funnel.test.ts`, `returns-books.test.ts`, `books-migration.test.ts`, `ledger-documents.test.ts`, `register-books.test.ts`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10482180293501048 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `tax-codes.ts`, `package.json`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `notification.tsx`, `dependencies`, `statements.ts`, `year-end/page.tsx`, `manilaToday`, `compare.ts`, `requireStaff`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `payroll/payroll.test.ts`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `Notice`, `steps.ts`, `lock-bar.tsx`, `input.tsx`, `invoice-pages.tsx`, `supabaseServer`, `books/forms.tsx`, `site-document.tsx`, `file-upload.tsx`, `cycle/page.tsx`, `theme-toggle.tsx`, `quote.ts`, `app/layout.tsx`, `how-we-work/page.tsx`, `button.tsx`, `getIdentity`, `tools/page.tsx`, `portal/reports/page.tsx`, `filings/actions.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/[id]/page.tsx`, `notifications-view.tsx`, `formatAmount`, `Centavos`, `select.tsx`, `cx.ts`, `quote/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `stat-cards.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `chrome.tsx`, `showDate`, `toCentavos`, `parties/[id]/page.tsx`, `onboarding/page.tsx`, `fixed-assets/page.tsx`, `review/page.tsx`, `queries.ts`, `idle-watcher.tsx`, `cx`, `portal/layout.tsx`, `direction.tsx`, `@remixicon/react`, `workpapers/page.tsx`, `switch.tsx`, `Badge`, `gap/page.tsx`, `acting-approver/page.tsx`, `bell-store.ts`, `calendar/page.tsx`, `social-button.tsx`, `booksContext`, `app/settings/page.tsx`, `filings/run.ts`, `parties/forms.tsx`, `batch/forms.tsx`, `books/reports/statements/page.tsx`, `spinner.tsx`, `filters.tsx`, `scroll-fade.tsx`, `missing-2307/page.tsx`, `pagination.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `december-rehearsal.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11462450592885376 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `public.ts`, `package.json`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `dependencies`, `year-end/page.tsx`, `manilaToday`, `compare.ts`, `requireStaff`, `payroll/forms.tsx`, `deadlines/page.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `steps.ts`, `books/export/route.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `clients/actions.ts`, `books/forms.tsx`, `site-document.tsx`, `cycle/page.tsx`, `app/layout.tsx`, `settings/actions.ts`, `getIdentity`, `tools/page.tsx`, `portal/reports/page.tsx`, `filings/actions.ts`, `intake-picker.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `site/brand.ts`, `notifications-view.tsx`, `formatAmount`, `Centavos`, `cx.ts`, `quote/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `chrome.tsx`, `showDate`, `toCentavos`, `parties/[id]/page.tsx`, `return-file-actions.ts`, `onboarding/page.tsx`, `fixed-assets/page.tsx`, `react`, `review/page.tsx`, `queries.ts`, `bulk-actions.ts`, `idle-watcher.tsx`, `cx`, `supabaseAdmin`, `ledger/data.ts`, `portal/layout.tsx`, `@remixicon/react`, `workpapers/page.tsx`, `Badge`, `gap/page.tsx`, `acting-approver/page.tsx`, `lock-actions.ts`, `opengraph-image.tsx`, `booksContext`, `app/settings/page.tsx`, `requireOwner`, `batch/load.ts`, `payroll/export/route.ts`, `filings/run.ts`, `parties/forms.tsx`, `batch/forms.tsx`, `books/reports/statements/page.tsx`, `missing-2307/page.tsx`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._