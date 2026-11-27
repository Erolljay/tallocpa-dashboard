# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1012 files · ~843,122 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6211 nodes · 22155 edges · 200 communities (173 shown, 27 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `0dee52f3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- draft.ts
- migrate.yml
- ui.ts
- public.ts
- devDependencies
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- cycle/page.tsx
- Sign-in & Setup Docs
- Badge
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
- cwt-tracker.ts
- scores/page.tsx
- compare.ts
- toCentavos
- button.tsx
- documents/[id]/page.tsx
- payroll/forms.tsx
- modal.tsx
- marketing/page.tsx
- scripts
- slots.ts
- link-button.tsx
- requireStaff
- webhook.ts
- module-pages.tsx
- supabaseServer
- react
- steps.ts
- returns/types.ts
- registrations/forms.tsx
- percentage.ts
- arap.ts
- work/page.tsx
- lock-bar.tsx
- workpapers/page.tsx
- invoice-pages.tsx
- Apple Design
- filings/run.ts
- testing.ts
- quote/page.tsx
- portalContext
- books/forms.tsx
- Centavos
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- Skeleton
- @remixicon/react
- vitest
- ledger/data.ts
- how-we-work/page.tsx
- blocks.tsx
- cx
- Pro components
- review/page.tsx
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- notification-bell.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- workpapers/load.ts
- tasks/page.tsx
- Recipes
- tools/page.tsx
- BoardUI page patterns
- Pro templates
- steps.test.ts
- ledger/books.ts
- ledger/types.ts
- combobox.tsx
- remittances/labels.ts
- boardui
- documents/actions.ts
- lib/books/actions.ts
- auth-templates.ts
- cycle/page.tsx
- [month]/page.tsx
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- manilaToday
- quote.ts
- source.ts
- leads/forms.tsx
- layout.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- Badge
- leads-pipeline.test.ts
- parties/parties.test.ts
- read.test.ts
- zod
- return-file-actions.ts
- app/settings/page.tsx
- notifications/format.ts
- ocr/run.ts
- fixed-assets/page.tsx
- site/brand.ts
- supabaseServer
- ticked-allocation.test.ts
- opening.ts
- work/page.tsx
- command-search.tsx
- idle-watcher.tsx
- statement-view.tsx
- safeguards.ts
- bell-store.ts
- employees-xlsx.ts
- supabaseAdmin
- idle-watcher.tsx
- notifications-view.tsx
- opening-checklist.tsx
- structured-data.ts
- social-button.tsx
- ledger.test.ts
- LinkButton
- transactions-actions.ts
- app/documents/page.tsx
- documents/[id]/page.tsx
- formatAmount
- review/page.tsx
- app/page.tsx
- month.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- step-files.tsx
- engine.ts
- Building UIs with BoardUI
- register/page.tsx
- opengraph-image.tsx
- cx
- registrations/[id]/page.tsx
- requireOwner
- portal-statements-approval.test.ts
- requireOwner
- holiday-list.ts
- notifications-view.tsx
- acting-approver.test.ts
- eslint.config.mjs
- returns-sign-off.test.ts
- bir-filing-calendar/page.tsx
- Building UIs with BoardUI
- lead-attribution.test.ts
- defer-documents.test.ts
- ledger-lock.test.ts
- portal-home.test.ts
- @types/react@^19
- tests/proposal-email.test.ts
- funnel.test.ts
- notifications.test.ts
- telegram-uploads.test.ts
- tests/books.test.ts
- eslint.config.mjs
- binder/page.tsx
- tests/books.test.ts
- fixed-assets.test.ts
- lock-by-return-type.test.ts
- review-form.tsx
- package.json
- db.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 395 edges
2. `cx` - 313 edges
3. `react` - 282 edges
4. `Notice()` - 265 edges
5. `Skeleton()` - 258 edges
6. `Button()` - 246 edges
7. `next` - 244 edges
8. `vitest` - 194 edges
9. `Badge()` - 186 edges
10. `Card()` - 186 edges

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

## Communities (200 total, 27 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (52): BooksContext, load2307Staff(), Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print(), one(), portal2307() (+44 more)

### Community 1 - "draft.ts"
Cohesion: 0.04
Nodes (40): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setIncomeTaxMethodAction(), setupMissingChartsAction(), taxableYearStart(), acct() (+32 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.06
Nodes (67): booksViewFor(), fmtMonth(), one(), WithdrawReportButton(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard() (+59 more)

### Community 4 - "public.ts"
Cohesion: 0.17
Nodes (17): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+9 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.07
Nodes (49): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+41 more)

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

### Community 11 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (30): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+22 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "Badge"
Cohesion: 0.07
Nodes (80): ClientList(), ClientsPage(), SORTS, Contacts(), ContactsPage(), SORTS, when, FilingsTabs() (+72 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (36): PortalReport(), Report(), when(), FinancialStatementsView(), statementsFrom(), add(), buildStatements(), classOf() (+28 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (69): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+61 more)

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

### Community 40 - "cwt-tracker.ts"
Cohesion: 0.11
Nodes (35): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), addMonths(), buildTracker(), calendarQuarterStart() (+27 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.07
Nodes (51): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+43 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (72): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+64 more)

### Community 43 - "toCentavos"
Cohesion: 0.10
Nodes (38): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+30 more)

### Community 44 - "button.tsx"
Cohesion: 0.07
Nodes (57): branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDashed(), tinDigits(), tinHasBranch() (+49 more)

### Community 45 - "documents/[id]/page.tsx"
Cohesion: 0.23
Nodes (15): AttachBatchImage(), attach(), DocumentUpload(), send(), upload(), Item, typeFromName(), ALLOWED (+7 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (32): file(), GET(), safe(), PayrollDocument(), ReadPayrollButton(), buildEmployeeTemplate(), sortItems(), targetOptions() (+24 more)

### Community 47 - "modal.tsx"
Cohesion: 0.09
Nodes (36): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), ButtonLinkProps (+28 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.14
Nodes (11): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), geist, geistMono (+3 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.11
Nodes (34): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), cancelMyMeetingAction(), Book() (+26 more)

### Community 51 - "link-button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 52 - "requireStaff"
Cohesion: 0.06
Nodes (48): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind (+40 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (44): maxDuration, POST(), TelegramApi, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons() (+36 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.17
Nodes (16): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+8 more)

### Community 55 - "supabaseServer"
Cohesion: 0.05
Nodes (62): nextConfig, next, EditClient(), EditClientPage(), addClientNoteAction(), NoteState, postPayrollAction(), PostState (+54 more)

### Community 56 - "react"
Cohesion: 0.06
Nodes (90): react, BankAccountsRoute(), booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column (+82 more)

### Community 57 - "steps.ts"
Cohesion: 0.29
Nodes (11): jobName(), lineName(), longDate(), money(), php, ProposalView(), Rows(), Section() (+3 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (60): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+52 more)

### Community 59 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (84): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+76 more)

### Community 60 - "percentage.ts"
Cohesion: 0.26
Nodes (17): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaWhen(), manilaInstant(), appBookedEvents() (+9 more)

### Community 61 - "arap.ts"
Cohesion: 0.14
Nodes (22): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+14 more)

### Community 62 - "work/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (30): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+22 more)

### Community 64 - "workpapers/page.tsx"
Cohesion: 0.13
Nodes (26): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+18 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.06
Nodes (62): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+54 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.08
Nodes (49): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+41 more)

### Community 68 - "testing.ts"
Cohesion: 0.12
Nodes (28): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+20 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.14
Nodes (31): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+23 more)

### Community 70 - "portalContext"
Cohesion: 0.13
Nodes (27): PortalClient, portalContext, Content(), PortalNotificationsPage(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker() (+19 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (40): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+32 more)

### Community 72 - "Centavos"
Cohesion: 0.06
Nodes (79): GridRow, MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv() (+71 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.09
Nodes (58): annualAttachments(), inputs1701(), inputs1702RT(), penaltyInputs(), incomeAttachments(), inputs1701Q(), inputs1702Q(), Periods (+50 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (45): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+37 more)

### Community 77 - "Skeleton"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 78 - "@remixicon/react"
Cohesion: 0.08
Nodes (47): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+39 more)

### Community 79 - "vitest"
Cohesion: 0.03
Nodes (35): pg, vitest, outDir, pkgDir, require, { version }, dir, ctx (+27 more)

### Community 80 - "ledger/data.ts"
Cohesion: 0.09
Nodes (39): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName() (+31 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.18
Nodes (27): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+19 more)

### Community 82 - "blocks.tsx"
Cohesion: 0.16
Nodes (25): SiteNotFound(), FLOW_ICONS, GROUP_SPAN, HomePage(), metadata, BreadcrumbItem(), ButtonLink(), Crumb (+17 more)

### Community 83 - "cx"
Cohesion: 0.03
Nodes (65): react-dom@19.3.0, react-dom, AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps (+57 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "review/page.tsx"
Cohesion: 0.14
Nodes (39): NewParty(), NewPartyPage(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+31 more)

### Community 86 - "Notice"
Cohesion: 0.05
Nodes (119): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+111 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.13
Nodes (44): Books(), PortalBooks(), basePeriod(), HeldNote(), holdsWhat(), BooksSection(), NavRow(), PortalReports() (+36 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notification-bell.tsx"
Cohesion: 0.09
Nodes (44): SheetPreview(), emit(), listeners, markReadLocally(), onChanged(), onFocus(), onVisible(), refreshBell() (+36 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): generateMetadata(), PICKER_SERVICE, ServicePage(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "workpapers/load.ts"
Cohesion: 0.10
Nodes (28): RegisterLine, Adjustment, monthEnd(), PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth (+20 more)

### Community 94 - "tasks/page.tsx"
Cohesion: 0.10
Nodes (44): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+36 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "tools/page.tsx"
Cohesion: 0.08
Nodes (46): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage() (+38 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "steps.test.ts"
Cohesion: 0.18
Nodes (20): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+12 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (47): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+39 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.07
Nodes (54): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), RepostRegisterButton(), ReverseForm(), AMENDMENT_BADGE (+46 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.04
Nodes (80): react-aria-components, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, animateTag(), ComboBox() (+72 more)

### Community 103 - "remittances/labels.ts"
Cohesion: 0.13
Nodes (26): EmployerCard(), GET(), Row, PortalRemittances(), Remittances(), Row, HandlesContributionsSwitch(), Contribution (+18 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "documents/actions.ts"
Cohesion: 0.11
Nodes (25): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+17 more)

### Community 106 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (28): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+20 more)

### Community 107 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.09
Nodes (46): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+38 more)

### Community 109 - "[month]/page.tsx"
Cohesion: 0.18
Nodes (16): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+8 more)

### Community 110 - "index.ts"
Cohesion: 0.07
Nodes (20): as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll() (+12 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (35): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+27 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.13
Nodes (27): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+19 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.14
Nodes (28): RunReadyButton(), Client, CollectionsPage(), OpenDue, Overview(), Stat(), ageOpenItems(), AGING_BUCKETS (+20 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.34
Nodes (10): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+2 more)

### Community 118 - "manilaToday"
Cohesion: 0.08
Nodes (47): ProposalSetup, dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone (+39 more)

### Community 119 - "quote.ts"
Cohesion: 0.07
Nodes (59): PriceRow, EngagementRow, ProposalData, corp, items, TaxpayerType, EstimatedProfile, estimateProfile() (+51 more)

### Community 120 - "source.ts"
Cohesion: 0.20
Nodes (16): cancelMeetingAction(), disconnectCalendarAction(), FormState, DisconnectButton(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason() (+8 more)

### Community 121 - "leads/forms.tsx"
Cohesion: 0.07
Nodes (45): NotesCard(), BookingLink(), DiscoveryCallForm(), FunnelSwitch(), LostForm(), ProposalSent, ReopenForm(), Result() (+37 more)

### Community 122 - "layout.ts"
Cohesion: 0.16
Nodes (27): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+19 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (44): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+36 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "Badge"
Cohesion: 0.11
Nodes (31): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), accessFor(), Missing(), Missing2307Page() (+23 more)

### Community 126 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 127 - "parties/parties.test.ts"
Cohesion: 0.26
Nodes (10): easterSunday(), HolidayKind, HolidayRule, iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+2 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (76): RFC-4180, SPREADSHEET_TYPES, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES (+68 more)

### Community 129 - "zod"
Cohesion: 0.16
Nodes (18): zod, GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+10 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.10
Nodes (33): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+25 more)

### Community 132 - "notifications/format.ts"
Cohesion: 0.17
Nodes (18): Detail(), PayNow(), METHODS, ProofUpload(), send(), amount, date, ProofState (+10 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (41): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, pdfPageCount(), planRead() (+33 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+19 more)

### Community 135 - "site/brand.ts"
Cohesion: 0.15
Nodes (24): AboutPage(), HOW, metadata, BRING, ContactList(), ContactPage(), metadata, FaqPage() (+16 more)

### Community 136 - "supabaseServer"
Cohesion: 0.06
Nodes (62): FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction(), ClientValues, frequencyLabel, Props, StaffOptions() (+54 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "opening.ts"
Cohesion: 0.14
Nodes (20): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+12 more)

### Community 139 - "work/page.tsx"
Cohesion: 0.17
Nodes (20): Action(), MyWork(), MyWorkPage(), short(), TONE, keepBooksReady(), lastMonth(), loadMyWork() (+12 more)

### Community 140 - "command-search.tsx"
Cohesion: 0.14
Nodes (20): globalSearch(), SearchHit, SearchKind, CommandSearch(), Icon, isMac(), KINDS, noop() (+12 more)

### Community 141 - "idle-watcher.tsx"
Cohesion: 0.09
Nodes (52): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+44 more)

### Community 142 - "statement-view.tsx"
Cohesion: 0.17
Nodes (17): metadata, Proposal(), ProposalPage(), metadata, QuotesClosed(), Start(), StartPage(), Lockup() (+9 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.10
Nodes (36): Gap, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board (+28 more)

### Community 144 - "bell-store.ts"
Cohesion: 0.24
Nodes (7): FiledFileRow, FiledReturn, FiledReturnRow, LegacyFileRow, TaxTypeGroup, rows, TYPE_ORDER

### Community 145 - "employees-xlsx.ts"
Cohesion: 0.11
Nodes (20): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+12 more)

### Community 146 - "supabaseAdmin"
Cohesion: 0.13
Nodes (34): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+26 more)

### Community 147 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (18): POST(), ACTIVITY, readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS (+10 more)

### Community 148 - "notifications-view.tsx"
Cohesion: 0.11
Nodes (19): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+11 more)

### Community 149 - "opening-checklist.tsx"
Cohesion: 0.18
Nodes (15): Access, OpeningChecklist(), STATUS, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput, ChecklistItem (+7 more)

### Community 150 - "structured-data.ts"
Cohesion: 0.10
Nodes (30): robots(), metadata, metadata, sitemap(), JsonLd(), SiteBrand, BRAND_NAME, SITE_URL (+22 more)

### Community 151 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "LinkButton"
Cohesion: 0.28
Nodes (10): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), Certificates(), Staff2307Page(), print2307Href() (+2 more)

### Community 154 - "transactions-actions.ts"
Cohesion: 0.38
Nodes (11): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+3 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.32
Nodes (13): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+5 more)

### Community 156 - "documents/[id]/page.tsx"
Cohesion: 0.07
Nodes (52): Doc, DocumentsCard(), when(), ExceptionRow, addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction() (+44 more)

### Community 157 - "formatAmount"
Cohesion: 0.14
Nodes (24): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), Parties(), PartyRow() (+16 more)

### Community 158 - "review/page.tsx"
Cohesion: 0.28
Nodes (8): Queue(), ReviewPage(), Row, Section(), QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 159 - "app/page.tsx"
Cohesion: 0.12
Nodes (29): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+21 more)

### Community 160 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.11
Nodes (36): GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches(), Admin (+28 more)

### Community 163 - "step-files.tsx"
Cohesion: 0.39
Nodes (8): addStepFile(), removeStepFile(), startStepFileUpload(), FileChip(), StepFile, StepFileList(), StepFileUpload(), send()

### Community 164 - "engine.ts"
Cohesion: 0.08
Nodes (40): ApprovedReview(), ApprovedRow, ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths() (+32 more)

### Community 165 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 166 - "register/page.tsx"
Cohesion: 0.11
Nodes (39): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+31 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "cx"
Cohesion: 0.09
Nodes (32): switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent (+24 more)

### Community 169 - "registrations/[id]/page.tsx"
Cohesion: 0.13
Nodes (36): RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), uploadRequestFile() (+28 more)

### Community 170 - "requireOwner"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 172 - "requireOwner"
Cohesion: 0.10
Nodes (50): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+42 more)

### Community 173 - "holiday-list.ts"
Cohesion: 0.24
Nodes (10): MonthComplete(), SentRow, StandingRow, TimelineRow, confirmMonthAction(), CycleState, decideExceptionAction(), refresh() (+2 more)

### Community 174 - "notifications-view.tsx"
Cohesion: 0.06
Nodes (55): GET(), Content(), NotificationsPage(), Content(), PortalNotificationSettingsPage(), notifyNotificationsChanged(), EmailSwitches(), EmailSwitchGroup (+47 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "eslint.config.mjs"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 177 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 178 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 179 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 180 - "lead-attribution.test.ts"
Cohesion: 0.27
Nodes (11): BirCalendarPage(), metadata, TextLink(), FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup (+3 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 187 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 193 - "binder/page.tsx"
Cohesion: 0.42
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, grossSales()

### Community 194 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 196 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 200 - "review-form.tsx"
Cohesion: 0.05
Nodes (68): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+60 more)

### Community 201 - "package.json"
Cohesion: 0.18
Nodes (10): @supabase/ssr@^0.12.7, @techstark/opencv-js@4.12.0-release.1, tsx@^4.23.15, name, packageManager, private, version, @supabase/ssr (+2 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1643 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `draft.ts`, `ui.ts`, `onboarding/page.tsx`, `cycle/page.tsx`, `Badge`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `toCentavos`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `marketing/page.tsx`, `slots.ts`, `requireStaff`, `webhook.ts`, `react`, `returns/types.ts`, `registrations/forms.tsx`, `percentage.ts`, `arap.ts`, `work/page.tsx`, `lock-bar.tsx`, `workpapers/page.tsx`, `invoice-pages.tsx`, `quote/page.tsx`, `portalContext`, `books/forms.tsx`, `@remixicon/react`, `ledger/data.ts`, `blocks.tsx`, `review/page.tsx`, `Notice`, `portal/reports/page.tsx`, `notification-bell.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `tasks/page.tsx`, `tools/page.tsx`, `steps.test.ts`, `ledger/books.ts`, `ledger/types.ts`, `remittances/labels.ts`, `lib/books/actions.ts`, `cycle/page.tsx`, `[month]/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `manilaToday`, `source.ts`, `leads/forms.tsx`, `layout.ts`, `batch/register.ts`, `Badge`, `zod`, `return-file-actions.ts`, `app/settings/page.tsx`, `notifications/format.ts`, `fixed-assets/page.tsx`, `site/brand.ts`, `supabaseServer`, `work/page.tsx`, `command-search.tsx`, `idle-watcher.tsx`, `statement-view.tsx`, `supabaseAdmin`, `idle-watcher.tsx`, `opening-checklist.tsx`, `structured-data.ts`, `LinkButton`, `transactions-actions.ts`, `app/documents/page.tsx`, `documents/[id]/page.tsx`, `formatAmount`, `review/page.tsx`, `app/page.tsx`, `calendar/page.tsx`, `step-files.tsx`, `engine.ts`, `register/page.tsx`, `opengraph-image.tsx`, `cx`, `registrations/[id]/page.tsx`, `requireOwner`, `requireOwner`, `holiday-list.ts`, `notifications-view.tsx`, `binder/page.tsx`, `review-form.tsx`, `package.json`?**
  _High betweenness centrality (0.187) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08028846153846154 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `draft.ts`, `ui.ts`, `public.ts`, `devDependencies`, `onboarding/page.tsx`, `cycle/page.tsx`, `Badge`, `statements.ts`, `income.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `button.tsx`, `slots.ts`, `requireStaff`, `webhook.ts`, `module-pages.tsx`, `returns/types.ts`, `registrations/forms.tsx`, `percentage.ts`, `arap.ts`, `work/page.tsx`, `lock-bar.tsx`, `workpapers/page.tsx`, `invoice-pages.tsx`, `filings/run.ts`, `testing.ts`, `quote/page.tsx`, `Centavos`, `Skeleton`, `@remixicon/react`, `ledger/data.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `notification-bell.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `workpapers/load.ts`, `tasks/page.tsx`, `tools/page.tsx`, `ledger/books.ts`, `ledger/types.ts`, `remittances/labels.ts`, `documents/actions.ts`, `cycle/page.tsx`, `[month]/page.tsx`, `index.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `manilaToday`, `quote.ts`, `source.ts`, `leads/forms.tsx`, `layout.ts`, `batch/register.ts`, `leads-pipeline.test.ts`, `parties/parties.test.ts`, `read.test.ts`, `zod`, `return-file-actions.ts`, `app/settings/page.tsx`, `ocr/run.ts`, `fixed-assets/page.tsx`, `supabaseServer`, `ticked-allocation.test.ts`, `opening.ts`, `work/page.tsx`, `safeguards.ts`, `bell-store.ts`, `supabaseAdmin`, `idle-watcher.tsx`, `notifications-view.tsx`, `opening-checklist.tsx`, `structured-data.ts`, `ledger.test.ts`, `app/documents/page.tsx`, `review/page.tsx`, `app/page.tsx`, `month.ts`, `calendar/page.tsx`, `engine.ts`, `register/page.tsx`, `registrations/[id]/page.tsx`, `portal-statements-approval.test.ts`, `acting-approver.test.ts`, `eslint.config.mjs`, `returns-sign-off.test.ts`, `Building UIs with BoardUI`, `lead-attribution.test.ts`, `defer-documents.test.ts`, `ledger-lock.test.ts`, `portal-home.test.ts`, `tests/proposal-email.test.ts`, `funnel.test.ts`, `notifications.test.ts`, `telegram-uploads.test.ts`, `tests/books.test.ts`, `tests/books.test.ts`, `fixed-assets.test.ts`, `lock-by-return-type.test.ts`, `review-form.tsx`, `package.json`, `db.test.ts`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Should `draft.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03508771929824561 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `onboarding/page.tsx`, `cycle/page.tsx`, `Badge`, `dependencies`, `statements.ts`, `scores/page.tsx`, `toCentavos`, `documents/[id]/page.tsx`, `modal.tsx`, `marketing/page.tsx`, `slots.ts`, `link-button.tsx`, `requireStaff`, `supabaseServer`, `returns/types.ts`, `registrations/forms.tsx`, `percentage.ts`, `work/page.tsx`, `lock-bar.tsx`, `workpapers/page.tsx`, `invoice-pages.tsx`, `quote/page.tsx`, `portalContext`, `books/forms.tsx`, `stat-cards.tsx`, `@remixicon/react`, `ledger/data.ts`, `how-we-work/page.tsx`, `blocks.tsx`, `cx`, `review/page.tsx`, `Notice`, `portal/reports/page.tsx`, `notification-bell.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `tasks/page.tsx`, `tools/page.tsx`, `ledger/books.ts`, `ledger/types.ts`, `combobox.tsx`, `remittances/labels.ts`, `cycle/page.tsx`, `[month]/page.tsx`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `manilaToday`, `quote.ts`, `source.ts`, `leads/forms.tsx`, `layout.ts`, `batch/register.ts`, `Badge`, `zod`, `app/settings/page.tsx`, `notifications/format.ts`, `fixed-assets/page.tsx`, `site/brand.ts`, `supabaseServer`, `work/page.tsx`, `command-search.tsx`, `idle-watcher.tsx`, `statement-view.tsx`, `idle-watcher.tsx`, `structured-data.ts`, `social-button.tsx`, `LinkButton`, `transactions-actions.ts`, `app/documents/page.tsx`, `documents/[id]/page.tsx`, `formatAmount`, `review/page.tsx`, `app/page.tsx`, `step-files.tsx`, `engine.ts`, `register/page.tsx`, `cx`, `registrations/[id]/page.tsx`, `requireOwner`, `requireOwner`, `holiday-list.ts`, `notifications-view.tsx`, `binder/page.tsx`, `review-form.tsx`, `package.json`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._