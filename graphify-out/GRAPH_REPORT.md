# Graph Report - tallocpa-dashboard  (2026-11-28)

## Corpus Check
- 1111 files · ~915,960 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6773 nodes · 23845 edges · 210 communities (190 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 225 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `afce4c71`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- december-rehearsal.test.ts
- migrate.yml
- ui.ts
- fees/types.ts
- dependencies
- Card
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- money.ts
- Sign-in & Setup Docs
- PageHeader
- Sign-off, Ledger & Payments
- documents/[id]/page.tsx
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
- TalloCPA OS — AI Workforce (design note)
- Develop Commands
- cwt-tracker.ts
- scores/page.tsx
- compare.ts
- form.tsx
- returns/types.ts
- ocr/run.ts
- register-xlsx.ts
- command-search.tsx
- registrations/actions.ts
- scripts
- cx
- public.ts
- remittances/forms.tsx
- webhook.ts
- leads/[id]/page.tsx
- lock-bar.tsx
- [month]/page.tsx
- quote/page.tsx
- returns/load.ts
- authorize/page.tsx
- dropdown.tsx
- ledger/data.ts
- contacts/forms.tsx
- theme-toggle.tsx
- year-end/page.tsx
- marketing/page.tsx
- Apple Design
- generate.ts
- testing.ts
- requireStaff
- payroll/data.ts
- books/forms.tsx
- work/load.ts
- Rules
- Animation Performance
- report-periods.ts
- stat-cards.tsx
- money.ts
- formatAmount
- step-files.tsx
- parties/[id]/page.tsx
- how-we-work/page.tsx
- clients/[id]/page.tsx
- modal.tsx
- Pro components
- modal.tsx
- button.tsx
- portalContext
- settings/actions.ts
- theme-toggle.tsx
- document-scanner.tsx
- intake-picker.tsx
- LinkButton
- employees-xlsx.ts
- manilaToday
- Recipes
- sawt.ts
- BoardUI page patterns
- Pro templates
- toCentavos
- ledger/books.ts
- site/brand.ts
- combobox.tsx
- calendar/page.tsx
- boardui
- remittances/forms.tsx
- layout.ts
- chrome.tsx
- leads/actions.ts
- Notice
- lib/books/actions.ts
- Opening balances: checklist for any cut-off
- tin.ts
- portal/page.tsx
- opening.ts
- requireOwner
- (site)/page.tsx
- apply-migrations.sh
- fees/schedule.ts
- devDependencies
- notification-bell.tsx
- tieouts.ts
- onboarding/forms.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- brand/forms.tsx
- Collections Clerk's desk
- filed-returns.ts
- read.test.ts
- sign-in-form.tsx
- return-file-actions.ts
- tax-codes.ts
- module-pages.tsx
- ocr/run.ts
- portal/reports/cwt-2307/page.tsx
- blocks.tsx
- supabaseServer
- collections/summary.ts
- pre-review-assistant/README.md
- sign-off-actions.tsx
- invoice-pages.tsx
- payroll/forms.tsx
- workpapers/load.ts
- deadlines/page.tsx
- slots.ts
- chief-of-staff/README.md
- server-only
- Centavos
- TaxpayerType
- vitest
- onboarding/ai-tools.ts
- document-clerk/README.md
- documents/[id]/page.tsx
- notifications/format.ts
- filings/[id]/page.tsx
- pending-review.tsx
- cycle/page.tsx
- requireOwner
- idle-watcher.tsx
- package.json
- index.ts
- Rework: one flow from lead to year-end
- book/actions.ts
- getSiteBrand
- portal-billing.test.ts
- protocol.ts
- register/page.tsx
- opengraph-image.tsx
- ledger.test.ts
- cycle-forms.tsx
- ai-employees.test.ts
- deadlines/actions.ts
- memo.ts
- filters.tsx
- ticked-allocation.test.ts
- acting-approver.test.ts
- cwt-forms.tsx
- books/periods.ts
- register-books.test.ts
- site/calendar.ts
- db.test.ts
- morning.ts
- app/settings/page.tsx
- books/reports/cwt-2307/page.tsx
- rates.ts
- lead-attribution.test.ts
- eslint.config.mjs
- ledger-lock.test.ts
- social-button.tsx
- [id]/books/page.tsx
- contribution-remittances.test.ts
- funnel.test.ts
- profile.ts
- site-document.tsx
- books-migration.test.ts
- tests/books.test.ts
- fixed-assets.test.ts
- onboarding-officer/project-instructions.md
- react
- ledger-closing.test.ts
- fields.ts
- returns-books.test.ts
- templates/README.md
- filings/actions.ts
- parallel-run.test.ts
- returns-sign-off.test.ts
- ai-desks/README.md
- 7. The TalloCPA OS MCP server
- workpapers/page.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 426 edges
2. `cx` - 317 edges
3. `react` - 293 edges
4. `Notice()` - 285 edges
5. `Skeleton()` - 268 edges
6. `Button()` - 267 edges
7. `next` - 258 edges
8. `vitest` - 214 edges
9. `Card()` - 199 edges
10. `Badge()` - 195 edges

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

## Communities (210 total, 20 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (52): booksContext(), BooksContext, booksViewFor(), one(), Certificates(), Staff2307Page(), Print(), Print2307Page() (+44 more)

### Community 1 - "december-rehearsal.test.ts"
Cohesion: 0.04
Nodes (26): as(), client(), root, addFiling(), root, approveIntoBooks(), as(), generateFilings() (+18 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.07
Nodes (52): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+44 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.04
Nodes (97): PriceRow, EngagementRow, FeeGapPage(), Gap(), corp, items, proposal(), TaxpayerType (+89 more)

### Community 5 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, next@16.4.6, pg@^8.23.1, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+8 more)

### Community 6 - "Card"
Cohesion: 0.06
Nodes (58): Client, OpenDue, Overview(), Stat(), Detail(), maskNumber(), StatementPage(), metadata (+50 more)

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

### Community 11 - "money.ts"
Cohesion: 0.16
Nodes (21): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+13 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "PageHeader"
Cohesion: 0.06
Nodes (72): @remixicon/react, ClientList(), ClientsPage(), Row, SORTS, STATUS_GROUPS, Contacts(), ContactsPage() (+64 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "documents/[id]/page.tsx"
Cohesion: 0.11
Nodes (36): saveMonthAction(), file(), GET(), safe(), Payroll(), PayrollPage(), PayrollDocument(), ReadPayrollButton() (+28 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (41): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), statementsFrom(), FsLineKey, Section (+33 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (74): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), annualAttachments(), balanceSheet(), compute1701() (+66 more)

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

### Community 29 - "TalloCPA OS — AI Workforce (design note)"
Cohesion: 0.13
Nodes (15): 10. Data model (first draft), 11. Build order, 12. Open items, 1. The idea in one paragraph, 2. Principles, 3. The AI employees, 4.1 The in-app model is swappable, 4. Where they run and what they cost (+7 more)

### Community 40 - "cwt-tracker.ts"
Cohesion: 0.10
Nodes (38): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), addMonths(), buildTracker(), calendarQuarterStart() (+30 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.08
Nodes (42): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+34 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (76): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), monthName(), Parties() (+68 more)

### Community 43 - "form.tsx"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.04
Nodes (77): tinHasBranch(), client, form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+69 more)

### Community 45 - "ocr/run.ts"
Cohesion: 0.10
Nodes (27): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+19 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.11
Nodes (26): RFC-4180, exceljs, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS (+18 more)

### Community 47 - "command-search.tsx"
Cohesion: 0.14
Nodes (19): SearchHit, SearchKind, CommandSearch(), Icon, isMac(), KINDS, noop(), PAGES (+11 more)

### Community 48 - "registrations/actions.ts"
Cohesion: 0.04
Nodes (118): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+110 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "cx"
Cohesion: 0.09
Nodes (31): switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, DotBadge(), NotificationBell(), Counter(), BreadcrumbItemProps (+23 more)

### Community 51 - "public.ts"
Cohesion: 0.09
Nodes (38): ProposalSetup, acceptProposalAction(), AcceptState, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND (+30 more)

### Community 52 - "remittances/forms.tsx"
Cohesion: 0.11
Nodes (37): nextConfig, next, EmployerCard(), NewBillPage(), GET(), ListRow, ORDER, Remittance() (+29 more)

### Community 53 - "webhook.ts"
Cohesion: 0.08
Nodes (50): maxDuration, POST(), TelegramEnv, telegramEnv(), ClaimedNotification, TelegramApi, telegramApi(), ALLOWED (+42 more)

### Community 54 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (41): NotesCard(), BookingLink(), FunnelSwitch(), ProposalSent, ReopenForm(), bookedTime, Lead(), LeadPage() (+33 more)

### Community 55 - "lock-bar.tsx"
Cohesion: 0.15
Nodes (24): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+16 more)

### Community 56 - "[month]/page.tsx"
Cohesion: 0.09
Nodes (35): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction() (+27 more)

### Community 57 - "quote/page.tsx"
Cohesion: 0.09
Nodes (52): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+44 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.08
Nodes (45): row(), withNonDeductible(), dayBefore(), FilingRow, listInvoices(), loadEwtRemittances(), loadEwtYear(), loadLedger() (+37 more)

### Community 59 - "authorize/page.tsx"
Cohesion: 0.05
Nodes (67): RFC-7636, RFC-8414, maxDuration, POST(), copy(), allowAction(), check(), Checked (+59 more)

### Community 60 - "dropdown.tsx"
Cohesion: 0.12
Nodes (25): DropdownContext, DropdownContextValue, DropdownGroupProps, DropdownItemProps, DropdownPopoverProps, DropdownProps, DropdownVariant, DropdownVariantContext (+17 more)

### Community 61 - "ledger/data.ts"
Cohesion: 0.07
Nodes (58): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton() (+50 more)

### Community 62 - "contacts/forms.tsx"
Cohesion: 0.12
Nodes (29): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+21 more)

### Community 63 - "theme-toggle.tsx"
Cohesion: 0.11
Nodes (26): react-dom@19.3.0, react-dom, applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle() (+18 more)

### Community 64 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.09
Nodes (31): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+23 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.06
Nodes (64): Rule, compareIso(), IsoDate, lastDayOfMonth(), describeDue(), FREQUENCY_SECTIONS, ordinal(), periodWord (+56 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (19): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "requireStaff"
Cohesion: 0.06
Nodes (63): addClientNoteAction(), NoteState, amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text() (+55 more)

### Community 70 - "payroll/data.ts"
Cohesion: 0.07
Nodes (72): GridRow, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+64 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.08
Nodes (63): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+55 more)

### Community 72 - "work/load.ts"
Cohesion: 0.08
Nodes (46): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction() (+38 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "report-periods.ts"
Cohesion: 0.27
Nodes (15): basePeriod(), HeldNote(), holdsWhat(), BooksYear, booksYears(), iso(), monthEnd(), monthsOfReport() (+7 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "money.ts"
Cohesion: 0.30
Nodes (12): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), CollectionsPage(), Portal2316(), Portal2316Page(), Form2316Sheet() (+4 more)

### Community 78 - "formatAmount"
Cohesion: 0.15
Nodes (20): Batch(), BatchPage(), one(), toCentavos(), TransactionJournal(), Accreditation(), amount(), AmountRow() (+12 more)

### Community 79 - "step-files.tsx"
Cohesion: 0.39
Nodes (8): addStepFile(), removeStepFile(), startStepFileUpload(), FileChip(), StepFile, StepFileList(), StepFileUpload(), send()

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.11
Nodes (35): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName() (+27 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.15
Nodes (30): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+22 more)

### Community 82 - "clients/[id]/page.tsx"
Cohesion: 0.11
Nodes (31): ClientStatusTarget, FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), CatchUpForm(), ClientUserForm() (+23 more)

### Community 83 - "modal.tsx"
Cohesion: 0.03
Nodes (66): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+58 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "modal.tsx"
Cohesion: 0.11
Nodes (37): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+29 more)

### Community 86 - "button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 87 - "portalContext"
Cohesion: 0.13
Nodes (40): PortalClient, portalContext, Content(), PortalNotificationsPage(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+32 more)

### Community 88 - "settings/actions.ts"
Cohesion: 0.20
Nodes (16): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+8 more)

### Community 89 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (33): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+25 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.15
Nodes (21): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+13 more)

### Community 92 - "LinkButton"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "employees-xlsx.ts"
Cohesion: 0.12
Nodes (19): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+11 more)

### Community 94 - "manilaToday"
Cohesion: 0.06
Nodes (75): RequestDetail(), RequestPage(), Row, TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow (+67 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "sawt.ts"
Cohesion: 0.14
Nodes (41): branchOfTin(), payeeKeyOf(), tin9(), tinDashed(), tinDigits(), incomeAttachments(), buildSawt(), incomePayment() (+33 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "toCentavos"
Cohesion: 0.11
Nodes (30): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+22 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.09
Nodes (34): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_KINDS, BOOK_TITLES (+26 more)

### Community 101 - "site/brand.ts"
Cohesion: 0.17
Nodes (18): robots(), sitemap(), FALLBACK_BRAND, SiteBrand, BRAND_NAME, PRACTITIONER, siteUrl(), TAGLINE (+10 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.07
Nodes (49): react-aria-components, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, animateTag(), ComboBox() (+41 more)

### Community 103 - "calendar/page.tsx"
Cohesion: 0.08
Nodes (56): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), addDays(), dayLabel(), ERRORS (+48 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "remittances/forms.tsx"
Cohesion: 0.23
Nodes (22): HandlesContributionsSwitch(), RemittanceButton(), RemittanceFileUpload(), send(), addRemittanceFile(), approveRemittanceAction(), generateRemittancesAction(), prepareRemittanceAction() (+14 more)

### Community 106 - "layout.ts"
Cohesion: 0.12
Nodes (24): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+16 more)

### Community 107 - "chrome.tsx"
Cohesion: 0.22
Nodes (18): BRING, ContactList(), ContactPage(), metadata, HomePage(), ButtonLink(), Lockup(), Container() (+10 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.15
Nodes (31): assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction(), recordCallAction() (+23 more)

### Community 109 - "Notice"
Cohesion: 0.07
Nodes (93): ClientForm(), BatchUpload(), PreviewTable(), AmendmentRequestForm(), CloseYearForm(), EntryForm(), ReleaseReportForm(), SetupForm() (+85 more)

### Community 110 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (29): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+21 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "tin.ts"
Cohesion: 0.21
Nodes (16): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), lookupParties(), blank(), optionalText() (+8 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.06
Nodes (58): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+50 more)

### Community 114 - "opening.ts"
Cohesion: 0.16
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+9 more)

### Community 115 - "requireOwner"
Cohesion: 0.06
Nodes (73): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+65 more)

### Community 116 - "(site)/page.tsx"
Cohesion: 0.15
Nodes (16): FLOW_ICONS, GROUP_SPAN, metadata, metadata, H2_ON_NAVY, SectionHeading(), QUOTE_LABEL, Faq (+8 more)

### Community 118 - "fees/schedule.ts"
Cohesion: 0.13
Nodes (35): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+27 more)

### Community 119 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+8 more)

### Community 120 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (78): GET(), SheetPreview(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus() (+70 more)

### Community 121 - "tieouts.ts"
Cohesion: 0.13
Nodes (14): LedgerTotals, purchases(), sales(), base, books, buy, sale, tieOuts() (+6 more)

### Community 122 - "onboarding/forms.tsx"
Cohesion: 0.28
Nodes (12): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), send() (+4 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "brand/forms.tsx"
Cohesion: 0.33
Nodes (8): finishBrandUpload(), startBrandUpload(), BrandFileUpload(), upload(), FieldDef, FIELDS, pesoInput(), SUBMIT

### Community 126 - "Collections Clerk's desk"
Cohesion: 0.14
Nodes (11): Collections run, Rules, Steps, Where to deposit, How you work, Your job, Before you start (TalloCPA OS), Check it (+3 more)

### Community 127 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (60): PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS, findHeaderRow() (+52 more)

### Community 129 - "sign-in-form.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (51): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+43 more)

### Community 131 - "tax-codes.ts"
Cohesion: 0.17
Nodes (16): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+8 more)

### Community 132 - "module-pages.tsx"
Cohesion: 0.11
Nodes (25): BankAccountsRoute(), fmtDate(), fmtMonth(), BooksList(), Column, ListRow, RowLink(), EmployeesRoute() (+17 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.11
Nodes (17): OCR_READ_FIELDS, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiJson(), call() (+9 more)

### Community 134 - "portal/reports/cwt-2307/page.tsx"
Cohesion: 0.35
Nodes (11): PortalCwt2307Page(), Tracker(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure(), money() (+3 more)

### Community 135 - "blocks.tsx"
Cohesion: 0.14
Nodes (28): AboutPage(), HOW, metadata, FaqPage(), metadata, metadata, Part(), PrivacyPage() (+20 more)

### Community 136 - "supabaseServer"
Cohesion: 0.05
Nodes (74): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setCatchUpAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+66 more)

### Community 137 - "collections/summary.ts"
Cohesion: 0.24
Nodes (11): bucketFor(), bucketLabel, DEPOSIT_TO, ItemCategory, othersName(), REMITTANCE_BUCKETS, summarize(), SUMMARY_BUCKETS (+3 more)

### Community 138 - "pre-review-assistant/README.md"
Cohesion: 0.17
Nodes (9): Pre-review, Rules, Steps, How you work, Your job, Before you start (TalloCPA OS), Check it, Pre-Review Assistant's desk (+1 more)

### Community 139 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 140 - "invoice-pages.tsx"
Cohesion: 0.11
Nodes (34): INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesViewPage() (+26 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (51): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+43 more)

### Community 142 - "workpapers/load.ts"
Cohesion: 0.18
Nodes (19): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, RegisterLine (+11 more)

### Community 143 - "deadlines/page.tsx"
Cohesion: 0.06
Nodes (72): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+64 more)

### Community 144 - "slots.ts"
Cohesion: 0.13
Nodes (31): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+23 more)

### Community 145 - "chief-of-staff/README.md"
Cohesion: 0.12
Nodes (12): Format, Morning brief, Rules, Steps, How you work, When the Owner asks something else, Your job, Before you start (TalloCPA OS) (+4 more)

### Community 146 - "server-only"
Cohesion: 0.14
Nodes (32): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+24 more)

### Community 147 - "Centavos"
Cohesion: 0.07
Nodes (34): Prior, BOOK_ABBR, BookLine, Column, ColumnarBook, ColumnarRow, COLUMNS, crossFoots() (+26 more)

### Community 148 - "TaxpayerType"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 149 - "vitest"
Cohesion: 0.02
Nodes (50): pg, outDir, pkgDir, require, { version }, poolConfig(), ctx, input (+42 more)

### Community 150 - "onboarding/ai-tools.ts"
Cohesion: 0.05
Nodes (71): zod, DRAFT_KIND_LABELS, DraftLine, NewDraft, saveDraft(), clientRef, findClient(), getClient (+63 more)

### Community 151 - "document-clerk/README.md"
Cohesion: 0.17
Nodes (9): How you work, Your job, Before you start (TalloCPA OS), Check it, Document Clerk's desk, Set up the desk (Cowork, once), Review queue, Rules (+1 more)

### Community 152 - "documents/[id]/page.tsx"
Cohesion: 0.03
Nodes (134): Doc, ApprovedReview(), ApprovedRow, ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED (+126 more)

### Community 153 - "notifications/format.ts"
Cohesion: 0.19
Nodes (15): badgeText(), bellLabel(), clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay (+7 more)

### Community 154 - "filings/[id]/page.tsx"
Cohesion: 0.04
Nodes (90): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage() (+82 more)

### Community 155 - "pending-review.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (27): DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, shift() (+19 more)

### Community 157 - "requireOwner"
Cohesion: 0.05
Nodes (83): RFC-2606, addWorkforceAction(), AiState, createAiLogin(), createKeyAction(), disconnectAppAction(), fieldErrors(), grantToolsAction() (+75 more)

### Community 158 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 159 - "package.json"
Cohesion: 0.18
Nodes (10): motion@^12.43.0, @techstark/opencv-js@4.12.0-release.1, tailwindcss@4.3.3, name, packageManager, private, version, motion (+2 more)

### Community 160 - "index.ts"
Cohesion: 0.03
Nodes (29): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+21 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "book/actions.ts"
Cohesion: 0.22
Nodes (15): cancelMeetingAction(), cancelMyMeetingAction(), CancelState, calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail() (+7 more)

### Community 163 - "getSiteBrand"
Cohesion: 0.29
Nodes (10): metadata, QuotesClosed(), Start(), StartPage(), funnelLive(), clean(), getSiteBrand(), first() (+2 more)

### Community 164 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 165 - "protocol.ts"
Cohesion: 0.06
Nodes (45): asAi(), borrow(), callsToday(), denied(), instructionsFor(), log(), manilaDay(), McpRequest (+37 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 169 - "cycle-forms.tsx"
Cohesion: 0.33
Nodes (8): CloseCycleButton(), Message(), closeCycleAction(), CycleState, decideExceptionAction(), nothingToSubmitAction(), refresh(), text()

### Community 170 - "ai-employees.test.ts"
Cohesion: 0.22
Nodes (5): BOOKS, CLIENT_RECORDS, DOCUMENT_RECORDS, OWN, root

### Community 171 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 172 - "memo.ts"
Cohesion: 0.20
Nodes (12): approvalMemo(), Memo, MemoInput, MemoMonth, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps() (+4 more)

### Community 173 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 174 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "cwt-forms.tsx"
Cohesion: 0.57
Nodes (5): Rematch2307Button(), CwtActionState, markCwtFollowedUp(), rematch2307(), trackerPath()

### Community 177 - "books/periods.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 178 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 179 - "site/calendar.ts"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 181 - "morning.ts"
Cohesion: 0.15
Nodes (16): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, showDay() (+8 more)

### Community 182 - "app/settings/page.tsx"
Cohesion: 0.20
Nodes (21): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+13 more)

### Community 183 - "books/reports/cwt-2307/page.tsx"
Cohesion: 0.13
Nodes (21): ClientTab, ClientTabs(), UNDER, RemoveFileButton(), TickForm(), fmtDate(), Onboarding(), OnboardingPage() (+13 more)

### Community 184 - "rates.ts"
Cohesion: 0.24
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+10 more)

### Community 185 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 186 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 187 - "ledger-lock.test.ts"
Cohesion: 0.33
Nodes (3): BOOK_LOCK_FORMS, doc(), root

### Community 188 - "social-button.tsx"
Cohesion: 0.09
Nodes (29): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+21 more)

### Community 189 - "[id]/books/page.tsx"
Cohesion: 0.24
Nodes (16): BooksFrame(), BooksSummaryPage(), Summary(), SummaryCard(), Cwt2307TrackerPage(), Tracker(), fmtDate(), lastMonth() (+8 more)

### Community 190 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 191 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 192 - "profile.ts"
Cohesion: 0.07
Nodes (41): BrandSettingsState, refresh(), saveBrandSectionAction(), SAVED, BRAND_FILES, BrandFileKind, birSchema, blank() (+33 more)

### Community 193 - "site-document.tsx"
Cohesion: 0.11
Nodes (16): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+8 more)

### Community 194 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 196 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 197 - "onboarding-officer/project-instructions.md"
Cohesion: 0.15
Nodes (10): Onboard a client, Rules, Steps, How you work, Never, Your job, Before you start (TalloCPA OS), Check it (+2 more)

### Community 198 - "react"
Cohesion: 0.07
Nodes (48): react, SearchParams, CustomersRoute(), NewEntry(), NewEntryPage(), ReportsIndex(), KINDS, PartyList() (+40 more)

### Community 199 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 200 - "fields.ts"
Cohesion: 0.08
Nodes (27): msgs(), ok, dateFarFromMonth(), iso(), month(), MONTHS, parsePrintedDate(), year() (+19 more)

### Community 210 - "filings/actions.ts"
Cohesion: 0.27
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 211 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 212 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 218 - "7. The TalloCPA OS MCP server"
Cohesion: 0.50
Nodes (4): 7.1 Parts, 7.2 Tools, 7.3 New features and the MCP, 7. The TalloCPA OS MCP server

### Community 223 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

## Knowledge Gaps
- **31 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1855 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `testing.ts` to `form-2307.ts`, `december-rehearsal.test.ts`, `ui.ts`, `fees/types.ts`, `Card`, `money.ts`, `PageHeader`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `returns/types.ts`, `ocr/run.ts`, `registrations/actions.ts`, `public.ts`, `remittances/forms.tsx`, `webhook.ts`, `leads/[id]/page.tsx`, `lock-bar.tsx`, `quote/page.tsx`, `returns/load.ts`, `authorize/page.tsx`, `ledger/data.ts`, `contacts/forms.tsx`, `year-end/page.tsx`, `generate.ts`, `payroll/data.ts`, `books/forms.tsx`, `work/load.ts`, `report-periods.ts`, `formatAmount`, `parties/[id]/page.tsx`, `clients/[id]/page.tsx`, `settings/actions.ts`, `theme-toggle.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `toCentavos`, `ledger/books.ts`, `site/brand.ts`, `calendar/page.tsx`, `layout.ts`, `leads/actions.ts`, `portal/page.tsx`, `opening.ts`, `requireOwner`, `fees/schedule.ts`, `devDependencies`, `tieouts.ts`, `batch/register.ts`, `filed-returns.ts`, `read.test.ts`, `return-file-actions.ts`, `tax-codes.ts`, `ocr/run.ts`, `supabaseServer`, `collections/summary.ts`, `invoice-pages.tsx`, `deadlines/page.tsx`, `slots.ts`, `server-only`, `vitest`, `onboarding/ai-tools.ts`, `documents/[id]/page.tsx`, `notifications/format.ts`, `filings/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `requireOwner`, `idle-watcher.tsx`, `package.json`, `index.ts`, `book/actions.ts`, `portal-billing.test.ts`, `protocol.ts`, `register/page.tsx`, `ledger.test.ts`, `ai-employees.test.ts`, `memo.ts`, `filters.tsx`, `ticked-allocation.test.ts`, `acting-approver.test.ts`, `books/periods.ts`, `register-books.test.ts`, `site/calendar.ts`, `db.test.ts`, `morning.ts`, `books/reports/cwt-2307/page.tsx`, `rates.ts`, `lead-attribution.test.ts`, `ledger-lock.test.ts`, `social-button.tsx`, `contribution-remittances.test.ts`, `funnel.test.ts`, `profile.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `fixed-assets.test.ts`, `ledger-closing.test.ts`, `fields.ts`, `returns-books.test.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08717948717948718 - nodes in this community are weakly interconnected._
- **Why does `next` connect `remittances/forms.tsx` to `form-2307.ts`, `ui.ts`, `fees/types.ts`, `dependencies`, `Card`, `PageHeader`, `documents/[id]/page.tsx`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `form.tsx`, `command-search.tsx`, `registrations/actions.ts`, `cx`, `public.ts`, `webhook.ts`, `leads/[id]/page.tsx`, `lock-bar.tsx`, `[month]/page.tsx`, `quote/page.tsx`, `authorize/page.tsx`, `ledger/data.ts`, `contacts/forms.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `requireStaff`, `payroll/data.ts`, `books/forms.tsx`, `work/load.ts`, `report-periods.ts`, `money.ts`, `formatAmount`, `step-files.tsx`, `parties/[id]/page.tsx`, `clients/[id]/page.tsx`, `modal.tsx`, `portalContext`, `settings/actions.ts`, `theme-toggle.tsx`, `intake-picker.tsx`, `LinkButton`, `manilaToday`, `toCentavos`, `ledger/books.ts`, `site/brand.ts`, `calendar/page.tsx`, `remittances/forms.tsx`, `chrome.tsx`, `leads/actions.ts`, `lib/books/actions.ts`, `tin.ts`, `portal/page.tsx`, `requireOwner`, `(site)/page.tsx`, `fees/schedule.ts`, `notification-bell.tsx`, `onboarding/forms.tsx`, `batch/register.ts`, `brand/forms.tsx`, `sign-in-form.tsx`, `return-file-actions.ts`, `module-pages.tsx`, `portal/reports/cwt-2307/page.tsx`, `blocks.tsx`, `supabaseServer`, `sign-off-actions.tsx`, `invoice-pages.tsx`, `payroll/forms.tsx`, `workpapers/load.ts`, `deadlines/page.tsx`, `slots.ts`, `server-only`, `documents/[id]/page.tsx`, `filings/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `requireOwner`, `idle-watcher.tsx`, `package.json`, `book/actions.ts`, `getSiteBrand`, `register/page.tsx`, `opengraph-image.tsx`, `deadlines/actions.ts`, `cwt-forms.tsx`, `app/settings/page.tsx`, `books/reports/cwt-2307/page.tsx`, `social-button.tsx`, `[id]/books/page.tsx`, `profile.ts`, `site-document.tsx`, `react`, `filings/actions.ts`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `december-rehearsal.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03771043771043771 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `fees/types.ts`, `dependencies`, `Card`, `PageHeader`, `documents/[id]/page.tsx`, `statements.ts`, `scores/page.tsx`, `compare.ts`, `form.tsx`, `command-search.tsx`, `registrations/actions.ts`, `cx`, `remittances/forms.tsx`, `leads/[id]/page.tsx`, `lock-bar.tsx`, `[month]/page.tsx`, `quote/page.tsx`, `authorize/page.tsx`, `dropdown.tsx`, `ledger/data.ts`, `contacts/forms.tsx`, `theme-toggle.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `requireStaff`, `books/forms.tsx`, `work/load.ts`, `stat-cards.tsx`, `money.ts`, `formatAmount`, `step-files.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `clients/[id]/page.tsx`, `modal.tsx`, `modal.tsx`, `button.tsx`, `portalContext`, `theme-toggle.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `toCentavos`, `ledger/books.ts`, `combobox.tsx`, `calendar/page.tsx`, `remittances/forms.tsx`, `chrome.tsx`, `leads/actions.ts`, `Notice`, `lib/books/actions.ts`, `portal/page.tsx`, `requireOwner`, `fees/schedule.ts`, `notification-bell.tsx`, `onboarding/forms.tsx`, `batch/register.ts`, `brand/forms.tsx`, `sign-in-form.tsx`, `return-file-actions.ts`, `module-pages.tsx`, `portal/reports/cwt-2307/page.tsx`, `blocks.tsx`, `supabaseServer`, `sign-off-actions.tsx`, `invoice-pages.tsx`, `payroll/forms.tsx`, `workpapers/load.ts`, `deadlines/page.tsx`, `slots.ts`, `documents/[id]/page.tsx`, `filings/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `requireOwner`, `idle-watcher.tsx`, `package.json`, `getSiteBrand`, `register/page.tsx`, `cycle-forms.tsx`, `deadlines/actions.ts`, `filters.tsx`, `cwt-forms.tsx`, `app/settings/page.tsx`, `books/reports/cwt-2307/page.tsx`, `social-button.tsx`, `[id]/books/page.tsx`, `site-document.tsx`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._