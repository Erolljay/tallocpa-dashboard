# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 925 files · ~753,792 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5729 nodes · 20255 edges · 203 communities (181 shown, 22 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 180 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `5cf7af5b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- money.ts
- fees/types.ts
- devDependencies
- onboarding/page.tsx
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
- button.tsx
- returns-sign-off.test.ts
- payroll/forms.tsx
- modal.tsx
- board.ts
- scripts
- supabaseAdmin
- quote/page.tsx
- form-1601c.ts
- documents/labels.ts
- formatAmount
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
- invoice-pages.tsx
- Apple Design
- generate.ts
- form-1601c.ts
- supabaseServer
- registrations/[id]/page.tsx
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- dropdown.tsx
- stat-cards.tsx
- cycle/actions.ts
- theme-toggle.tsx
- documents/actions.ts
- ui.ts
- how-we-work/page.tsx
- index.ts
- staff/page.tsx
- Pro components
- alphalist.ts
- ledger/data.ts
- portal/reports/page.tsx
- portal-billing.test.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- proposal.ts
- requests/actions.ts
- Recipes
- book-income.ts
- BoardUI page patterns
- Pro templates
- review-form.tsx
- ledger/books.ts
- filings/run.ts
- cx
- cycle/page.tsx
- boardui
- public.ts
- quote.ts
- Card
- cycle/actions.ts
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
- proposal-view.tsx
- Centavos
- safeguards.ts
- ref_node_fs
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- [month]/page.tsx
- parties/parties.test.ts
- read.test.ts
- opening.ts
- mime.ts
- invoice-pages.tsx
- parties/[id]/page.tsx
- fields.ts
- assets/schedule.ts
- site-document.tsx
- react
- ticked-allocation.test.ts
- books/reports/statements/page.tsx
- getIdentity
- idle-watcher.tsx
- rates.ts
- client-form.tsx
- showMonth
- ref_node_fs
- parts.ts
- server-only
- ledger/types.ts
- approval-memo.tsx
- filings/[id]/page.tsx
- (site)/page.tsx
- @remixicon/react
- safeguards.ts
- workpapers/page.tsx
- leads/[id]/page.tsx
- app/documents/page.tsx
- profile.ts
- template.ts
- review-queue.ts
- FilingStatus
- onboarding/forms.tsx
- Rework: one flow from lead to year-end
- slots.ts
- items.ts
- filings/actions.ts
- form-2307.ts
- grid.ts
- opengraph-image.tsx
- filings/actions.ts
- bir-filing-calendar/page.tsx
- post-button.tsx
- social-button.tsx
- app/settings/page.tsx
- profile.ts
- sign-off.ts
- acting-approver.test.ts
- layout.ts
- collections/forms.tsx
- xlsx.ts
- parties/forms.tsx
- money.ts
- fixed-assets/forms.tsx
- year/[year]/page.tsx
- quote/page.tsx
- tin.ts
- seed.ts
- portal-nav.tsx
- branches.ts
- ocr/run.ts
- review.ts
- filters.tsx
- books/periods.ts
- books-2307.test.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- books-migration.test.ts
- tests/books.test.ts
- defer-documents.test.ts
- returns-books.test.ts
- workpapers.test.ts
- portal-home.test.ts
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
10. `vitest` - 172 edges

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

## Communities (203 total, 22 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.07
Nodes (59): BooksContext, Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href(), Portal2307() (+51 more)

### Community 1 - "index.ts"
Cohesion: 0.07
Nodes (18): as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll() (+10 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "money.ts"
Cohesion: 0.11
Nodes (34): blankLine(), InvoiceForm(), Booking, BookingFields(), DirectoryParty, ENTRY_STATUS, fmtDay(), fmtMonthOf() (+26 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.10
Nodes (30): EstimatedProfile, estimateProfile(), gapFor(), GapRow, has(), lastWholeMonths(), items, schedule (+22 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (22): ClientTab, ClientTabs(), UNDER, RemoveFileButton(), TickForm(), fmtDate(), Onboarding(), OnboardingPage() (+14 more)

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
Cohesion: 0.17
Nodes (26): emit(), listeners, markReadLocally(), onChanged(), onFocus(), onVisible(), refreshBell(), set() (+18 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx.ts"
Cohesion: 0.04
Nodes (64): AvatarColor, AvatarProps, AvatarSize, styles, Counter(), CounterColor, CounterProps, styles (+56 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (41): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES (+33 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (63): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+55 more)

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
Nodes (28): CloseYearForm(), FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear() (+20 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (35): PreviewTable(), OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order (+27 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (81): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+73 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.13
Nodes (19): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EmployeeImportRow, reasonChoices, REGIONS (+11 more)

### Community 44 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "returns-sign-off.test.ts"
Cohesion: 0.06
Nodes (79): GET(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey, RequestDetail() (+71 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (67): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+59 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "board.ts"
Cohesion: 0.23
Nodes (12): StepProgress(), CauseTag, DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS, fiveSteps(), isNil() (+4 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.14
Nodes (30): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+22 more)

### Community 51 - "quote/page.tsx"
Cohesion: 0.10
Nodes (44): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+36 more)

### Community 52 - "form-1601c.ts"
Cohesion: 0.11
Nodes (45): nextConfig, next, EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage() (+37 more)

### Community 53 - "documents/labels.ts"
Cohesion: 0.13
Nodes (37): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+29 more)

### Community 54 - "formatAmount"
Cohesion: 0.13
Nodes (34): BankAccountsRoute(), booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+26 more)

### Community 55 - "cx"
Cohesion: 0.05
Nodes (68): react-aria-components, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Breadcrumb(), BreadcrumbItem() (+60 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.09
Nodes (45): GridRow, AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+37 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.11
Nodes (35): cancelRegistrationAction(), ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+27 more)

### Community 58 - "money.ts"
Cohesion: 0.05
Nodes (70): client, BUSINESS_TAX_FORMS, form1601C, INPUTS, MONTH, PAYSLIP_COLUMNS, payslipCsv(), payslipSchedule() (+62 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (67): AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), EntryForm(), OpeningUpload(), PermitForm(), SetupForm() (+59 more)

### Community 60 - "blocks.tsx"
Cohesion: 0.24
Nodes (12): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+4 more)

### Community 61 - "arap.ts"
Cohesion: 0.10
Nodes (35): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+27 more)

### Community 62 - "layout.ts"
Cohesion: 0.10
Nodes (31): line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board, MARCO (+23 more)

### Community 63 - "year-end/page.tsx"
Cohesion: 0.18
Nodes (18): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, booksMonthStatus(), day() (+10 more)

### Community 64 - "combobox.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.08
Nodes (54): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesViewPage() (+46 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.13
Nodes (21): TimelineFiling, TimelineItem, IsoDate, EfpsGroup, FilingChannel, FilingInstance, Period, normalizeRdo() (+13 more)

### Community 68 - "form-1601c.ts"
Cohesion: 0.14
Nodes (24): form1701, form1702RT, year, form1701Q, form1702Q, individual, form2551Q, individual (+16 more)

### Community 69 - "supabaseServer"
Cohesion: 0.06
Nodes (75): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+67 more)

### Community 70 - "registrations/[id]/page.tsx"
Cohesion: 0.15
Nodes (33): completeRegistrationAction(), CancelForm(), CompleteButton(), StepBadge(), StepForm(), StepRow, YearRenewalsForm(), caseStatus (+25 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (45): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+37 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (50): annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation() (+42 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "dropdown.tsx"
Cohesion: 0.12
Nodes (47): SaleSplit, incomeAttachments(), Periods, periods(), buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments() (+39 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "cycle/actions.ts"
Cohesion: 0.08
Nodes (34): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+26 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.17
Nodes (19): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+11 more)

### Community 79 - "documents/actions.ts"
Cohesion: 0.21
Nodes (12): DocumentUpload(), send(), upload(), typeFromName(), ALLOWED, DocActionState, finishUpload(), replyDocumentAction() (+4 more)

### Community 80 - "ui.ts"
Cohesion: 0.12
Nodes (33): booksViewFor(), fmtMonth(), one(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), SegmentedControl() (+25 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.15
Nodes (30): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+22 more)

### Community 82 - "index.ts"
Cohesion: 0.04
Nodes (27): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+19 more)

### Community 83 - "staff/page.tsx"
Cohesion: 0.27
Nodes (9): roleLabel, StaffList(), StaffPage(), clientUserSchema, email, inviteStaffSchema, loadPoints(), name (+1 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "alphalist.ts"
Cohesion: 0.15
Nodes (25): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+17 more)

### Community 86 - "ledger/data.ts"
Cohesion: 0.14
Nodes (24): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), RepostRegisterButton(), ReverseForm(), OpeningChecklist() (+16 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (65): Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote() (+57 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.13
Nodes (21): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+13 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.15
Nodes (20): AttributionKeeper(), noop(), readAttribution(), useAttribution(), ATTRIBUTION_KEY, pickAttribution(), withAttribution(), first() (+12 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.11
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 93 - "proposal.ts"
Cohesion: 0.09
Nodes (37): ProposalSetup, jobName(), lineName(), longDate(), money(), php, ProposalData, ProposalView() (+29 more)

### Community 94 - "requests/actions.ts"
Cohesion: 0.12
Nodes (29): ReplyForm(), send(), METHODS, ProofUpload(), send(), amount, date, ProofState (+21 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "book-income.ts"
Cohesion: 0.26
Nodes (9): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, NonDeductibleRow (+1 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.07
Nodes (43): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), BatchRow (+35 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.05
Nodes (61): exceljs@4.4.0, exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad() (+53 more)

### Community 101 - "filings/run.ts"
Cohesion: 0.20
Nodes (20): compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances() (+12 more)

### Community 102 - "cx"
Cohesion: 0.08
Nodes (37): SheetPreview(), Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem() (+29 more)

### Community 103 - "cycle/page.tsx"
Cohesion: 0.23
Nodes (18): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate(), percentageTaxRate() (+10 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "public.ts"
Cohesion: 0.14
Nodes (17): QuerySource, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeScheduleRow, num(), toFeeItem(), toSettings(), proposalStart() (+9 more)

### Community 106 - "quote.ts"
Cohesion: 0.06
Nodes (60): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+52 more)

### Community 107 - "Card"
Cohesion: 0.06
Nodes (89): ClientReturnsPage(), FilingRow, Returns(), Client, CollectionsPage(), OpenDue, Overview(), Stat() (+81 more)

### Community 108 - "cycle/actions.ts"
Cohesion: 0.40
Nodes (9): CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), CycleState, decideExceptionAction(), nothingToSubmitAction(), refresh() (+1 more)

### Community 109 - "sign-in-form.tsx"
Cohesion: 0.17
Nodes (17): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+9 more)

### Community 110 - "vitest"
Cohesion: 0.03
Nodes (24): pg, vitest, ctx, input, root, root, root, root (+16 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 113 - "Card"
Cohesion: 0.08
Nodes (47): PortalClient, BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow (+39 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.10
Nodes (42): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+34 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.08
Nodes (56): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+48 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.13
Nodes (28): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+20 more)

### Community 118 - "getIdentity"
Cohesion: 0.19
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+11 more)

### Community 119 - "proposal-view.tsx"
Cohesion: 0.11
Nodes (31): PriceRow, quoteFor(), buildQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem, documentBand() (+23 more)

### Community 120 - "Centavos"
Cohesion: 0.07
Nodes (56): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, FollowUpForm(), WorksheetInputsForm(), Lines(), lineStyle, Problems() (+48 more)

### Community 121 - "safeguards.ts"
Cohesion: 0.17
Nodes (16): loadAssets(), Row, lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 122 - "ref_node_fs"
Cohesion: 0.19
Nodes (11): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+3 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (44): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), BatchUpload(), Batch(), BatchPage() (+36 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.08
Nodes (46): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, Detail() (+38 more)

### Community 126 - "[month]/page.tsx"
Cohesion: 0.08
Nodes (46): file(), GET(), safe(), BOOKED_TYPES, PayrollDocument(), PayrollReadState, KIND_LABEL, MATCH_BADGE (+38 more)

### Community 127 - "parties/parties.test.ts"
Cohesion: 0.22
Nodes (15): displayName(), fullAddress(), listNameCols(), Party, partyTinLabel(), person, ABBREVIATIONS, nameTokens() (+7 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (76): RFC-4180, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+68 more)

### Community 129 - "opening.ts"
Cohesion: 0.15
Nodes (18): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+10 more)

### Community 130 - "mime.ts"
Cohesion: 0.09
Nodes (51): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+43 more)

### Community 131 - "invoice-pages.tsx"
Cohesion: 0.17
Nodes (19): zod, addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState (+11 more)

### Community 132 - "parties/[id]/page.tsx"
Cohesion: 0.20
Nodes (16): MergeForm(), PresetAccountForm(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names (+8 more)

### Community 133 - "fields.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 134 - "assets/schedule.ts"
Cohesion: 0.35
Nodes (10): accumulated(), bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor(), monthIndex(), monthTotals(), rangeTotals(), RESIDUAL (+2 more)

### Community 135 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 136 - "react"
Cohesion: 0.05
Nodes (83): react, CustomersRoute(), NewEntry(), NewEntryPage(), BooksMonthsPage(), Months(), one(), PaymentsNewPage() (+75 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "books/reports/statements/page.tsx"
Cohesion: 0.19
Nodes (17): ReleaseReportForm(), WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report() (+9 more)

### Community 139 - "getIdentity"
Cohesion: 0.16
Nodes (18): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+10 more)

### Community 140 - "idle-watcher.tsx"
Cohesion: 0.18
Nodes (14): GET(), NotificationKind, BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+6 more)

### Community 141 - "rates.ts"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 142 - "client-form.tsx"
Cohesion: 0.13
Nodes (24): ClientForm(), ClientValues, frequencyLabel, Props, EditClient(), EditClientPage(), EngagementRow, months (+16 more)

### Community 143 - "showMonth"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 144 - "ref_node_fs"
Cohesion: 0.08
Nodes (12): outDir, pkgDir, require, { version }, api, ctx, fn, rows (+4 more)

### Community 145 - "parts.ts"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 146 - "server-only"
Cohesion: 0.14
Nodes (31): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+23 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.15
Nodes (20): Access, STATUS, Asset, Cutoff, cutoffOf(), TbRowOut, ChecklistInput, ChecklistItem (+12 more)

### Community 148 - "approval-memo.tsx"
Cohesion: 0.18
Nodes (11): amt(), Db, TIE, BOOKS_GO_LIVE, ReviewNote, approvalMemo(), Memo, MemoMonth (+3 more)

### Community 149 - "filings/[id]/page.tsx"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 150 - "(site)/page.tsx"
Cohesion: 0.06
Nodes (90): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+82 more)

### Community 151 - "@remixicon/react"
Cohesion: 0.27
Nodes (9): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), STANDARD_HOLIDAYS, StandardHoliday, suggestedDate() (+1 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

### Community 154 - "leads/[id]/page.tsx"
Cohesion: 0.16
Nodes (15): EmailSwitches(), EmailSwitchGroup, Switch(), SwitchProps, SwitchShape, SwitchSize, switchSizes, SwitchVisualState (+7 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.05
Nodes (79): @remixicon/react, Doc, DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow (+71 more)

### Community 156 - "profile.ts"
Cohesion: 0.09
Nodes (22): Agency, birForm(), BranchOptions, branchStepsFor(), CaseStep, ClosureOptions, dayNumber(), EMPLOYER_STEPS (+14 more)

### Community 157 - "template.ts"
Cohesion: 0.11
Nodes (20): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+12 more)

### Community 158 - "review-queue.ts"
Cohesion: 0.07
Nodes (51): addClientNoteAction(), NoteState, NotesCard(), ClientNoteForm(), PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction() (+43 more)

### Community 159 - "FilingStatus"
Cohesion: 0.25
Nodes (7): Row, FilingRow, QueueFiling, QueueViewer, ReviewQueue, reviewQueue(), FilingStatus

### Community 160 - "onboarding/forms.tsx"
Cohesion: 0.28
Nodes (13): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+5 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "slots.ts"
Cohesion: 0.15
Nodes (28): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), Interval, manilaInstant() (+20 more)

### Community 163 - "items.ts"
Cohesion: 0.17
Nodes (14): PayrollSettingsForm(), PayrollSetupPage(), Setup(), BirCategory, CATEGORIES, Category, CATEGORY_KEYS, DEDUCTION_FIELDS (+6 more)

### Community 165 - "form-2307.ts"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 166 - "grid.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "filings/actions.ts"
Cohesion: 0.26
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 169 - "bir-filing-calendar/page.tsx"
Cohesion: 0.12
Nodes (28): notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, Empty(), NotificationsView(), one() (+20 more)

### Community 170 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 171 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (37): appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), Rule, accountSchema (+29 more)

### Community 173 - "profile.ts"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 174 - "sign-off.ts"
Cohesion: 0.18
Nodes (12): availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner, preparer (+4 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "layout.ts"
Cohesion: 0.11
Nodes (25): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+17 more)

### Community 177 - "collections/forms.tsx"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 178 - "xlsx.ts"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 179 - "parties/forms.tsx"
Cohesion: 0.24
Nodes (12): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), PRESET_ACCOUNTS (+4 more)

### Community 180 - "money.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 181 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 182 - "year/[year]/page.tsx"
Cohesion: 0.27
Nodes (10): release2316Action(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings() (+2 more)

### Community 183 - "quote/page.tsx"
Cohesion: 0.27
Nodes (10): loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView() (+2 more)

### Community 184 - "tin.ts"
Cohesion: 0.29
Nodes (9): PARTY_COLUMNS, blank(), optionalText(), PartyInput, partySchema, HEAD_OFFICE, normalizeBranch(), ParsedTin (+1 more)

### Community 185 - "seed.ts"
Cohesion: 0.25
Nodes (8): DeadlineRule, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 186 - "portal-nav.tsx"
Cohesion: 0.38
Nodes (7): activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab, Tab, under()

### Community 187 - "branches.ts"
Cohesion: 0.31
Nodes (6): Branch, branchSchema, branchUpdateSchema, groupByBranch(), bac, ilo

### Community 188 - "ocr/run.ts"
Cohesion: 0.43
Nodes (7): ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, lookupParties(), fillFromDirectory(), partyKey()

### Community 189 - "review.ts"
Cohesion: 0.36
Nodes (6): ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), SIGNED_REFS, quiet

### Community 190 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 191 - "books/periods.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 192 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

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

### Community 199 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1511 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `form-1601c.ts` to `form-2307.ts`, `money.ts`, `onboarding/page.tsx`, `notification-bell.tsx`, `dependencies`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `returns-sign-off.test.ts`, `payroll/forms.tsx`, `supabaseAdmin`, `quote/page.tsx`, `documents/labels.ts`, `formatAmount`, `cx`, `payroll/data.ts`, `registrations/forms.tsx`, `Notice`, `arap.ts`, `combobox.tsx`, `invoice-pages.tsx`, `supabaseServer`, `registrations/[id]/page.tsx`, `books/forms.tsx`, `cycle/actions.ts`, `documents/actions.ts`, `ui.ts`, `ledger/data.ts`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `requests/actions.ts`, `review-form.tsx`, `ledger/books.ts`, `quote.ts`, `Card`, `cycle/actions.ts`, `sign-in-form.tsx`, `idle-watcher.tsx`, `Card`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `getIdentity`, `Centavos`, `batch/register.ts`, `quote/page.tsx`, `[month]/page.tsx`, `mime.ts`, `invoice-pages.tsx`, `parties/[id]/page.tsx`, `site-document.tsx`, `react`, `books/reports/statements/page.tsx`, `idle-watcher.tsx`, `rates.ts`, `client-form.tsx`, `parts.ts`, `server-only`, `ledger/types.ts`, `approval-memo.tsx`, `filings/[id]/page.tsx`, `(site)/page.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `review-queue.ts`, `onboarding/forms.tsx`, `grid.ts`, `opengraph-image.tsx`, `filings/actions.ts`, `bir-filing-calendar/page.tsx`, `post-button.tsx`, `app/settings/page.tsx`, `parties/forms.tsx`, `fixed-assets/forms.tsx`, `year/[year]/page.tsx`, `quote/page.tsx`, `portal-nav.tsx`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07219548315438726 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `money.ts`, `fees/types.ts`, `devDependencies`, `onboarding/page.tsx`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `returns-sign-off.test.ts`, `payroll/forms.tsx`, `board.ts`, `supabaseAdmin`, `quote/page.tsx`, `form-1601c.ts`, `documents/labels.ts`, `payroll/data.ts`, `money.ts`, `blocks.tsx`, `arap.ts`, `layout.ts`, `year-end/page.tsx`, `invoice-pages.tsx`, `generate.ts`, `form-1601c.ts`, `supabaseServer`, `registrations/[id]/page.tsx`, `payroll/payroll.test.ts`, `ui.ts`, `index.ts`, `staff/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `proposal.ts`, `book-income.ts`, `review-form.tsx`, `ledger/books.ts`, `filings/run.ts`, `cycle/page.tsx`, `public.ts`, `quote.ts`, `Card`, `sign-in-form.tsx`, `idle-watcher.tsx`, `Card`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `proposal-view.tsx`, `Centavos`, `safeguards.ts`, `ref_node_fs`, `batch/register.ts`, `[month]/page.tsx`, `parties/parties.test.ts`, `read.test.ts`, `opening.ts`, `mime.ts`, `invoice-pages.tsx`, `fields.ts`, `assets/schedule.ts`, `ticked-allocation.test.ts`, `getIdentity`, `rates.ts`, `client-form.tsx`, `showMonth`, `ref_node_fs`, `parts.ts`, `server-only`, `ledger/types.ts`, `approval-memo.tsx`, `filings/[id]/page.tsx`, `(site)/page.tsx`, `@remixicon/react`, `safeguards.ts`, `app/documents/page.tsx`, `profile.ts`, `template.ts`, `review-queue.ts`, `FilingStatus`, `slots.ts`, `filings/actions.ts`, `form-2307.ts`, `app/settings/page.tsx`, `sign-off.ts`, `acting-approver.test.ts`, `layout.ts`, `collections/forms.tsx`, `money.ts`, `portal-nav.tsx`, `branches.ts`, `review.ts`, `filters.tsx`, `books/periods.ts`, `books-2307.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `defer-documents.test.ts`, `returns-books.test.ts`, `workpapers.test.ts`, `portal-home.test.ts`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07096774193548387 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `money.ts`, `onboarding/page.tsx`, `notification-bell.tsx`, `cx.ts`, `dependencies`, `statements.ts`, `ledger/data.ts`, `scores/page.tsx`, `compare.ts`, `button.tsx`, `returns-sign-off.test.ts`, `payroll/forms.tsx`, `modal.tsx`, `supabaseAdmin`, `quote/page.tsx`, `form-1601c.ts`, `documents/labels.ts`, `formatAmount`, `cx`, `registrations/forms.tsx`, `Notice`, `year-end/page.tsx`, `combobox.tsx`, `invoice-pages.tsx`, `supabaseServer`, `registrations/[id]/page.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `cycle/actions.ts`, `theme-toggle.tsx`, `documents/actions.ts`, `ui.ts`, `how-we-work/page.tsx`, `staff/page.tsx`, `ledger/data.ts`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `proposal.ts`, `requests/actions.ts`, `ledger/books.ts`, `cx`, `quote.ts`, `Card`, `cycle/actions.ts`, `sign-in-form.tsx`, `idle-watcher.tsx`, `Card`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `getIdentity`, `Centavos`, `batch/register.ts`, `quote/page.tsx`, `[month]/page.tsx`, `mime.ts`, `invoice-pages.tsx`, `parties/[id]/page.tsx`, `site-document.tsx`, `books/reports/statements/page.tsx`, `idle-watcher.tsx`, `rates.ts`, `client-form.tsx`, `parts.ts`, `filings/[id]/page.tsx`, `(site)/page.tsx`, `workpapers/page.tsx`, `leads/[id]/page.tsx`, `app/documents/page.tsx`, `review-queue.ts`, `onboarding/forms.tsx`, `slots.ts`, `items.ts`, `grid.ts`, `bir-filing-calendar/page.tsx`, `post-button.tsx`, `social-button.tsx`, `app/settings/page.tsx`, `parties/forms.tsx`, `fixed-assets/forms.tsx`, `year/[year]/page.tsx`, `quote/page.tsx`, `filters.tsx`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._