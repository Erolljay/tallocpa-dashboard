# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 987 files · ~824,662 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6088 nodes · 21593 edges · 206 communities (187 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 189 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `8d97702d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- match.ts
- migrate.yml
- ui.ts
- public.ts
- devDependencies
- register-xlsx.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- vat.ts
- Sign-in & Setup Docs
- registrations/[id]/page.tsx
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- modal.tsx
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
- clients/actions.ts
- notification-settings-view.tsx
- upload/page.tsx
- payroll/forms.tsx
- settings/actions.ts
- marketing/page.tsx
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- supabaseServer
- webhook.ts
- module-pages.tsx
- books/export/route.ts
- settlement-pages.tsx
- button.tsx
- returns/types.ts
- steps.ts
- portal/page.tsx
- engine.ts
- quote.ts
- lock-bar.tsx
- form-1601c.ts
- invoice-pages.tsx
- Apple Design
- generate.ts
- testing.ts
- params.ts
- year-end/page.tsx
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- income.ts
- stat-cards.tsx
- blocks.tsx
- site-document.tsx
- vitest
- parallel-run.tsx
- how-we-work/page.tsx
- leads/[id]/page.tsx
- cx.ts
- Pro components
- tax-codes.ts
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- register/page.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- payroll/payroll.test.ts
- PageHeader
- Recipes
- year-end/page.tsx
- BoardUI page patterns
- Pro templates
- manilaToday
- ledger/types.ts
- ledger/data.ts
- cx
- rates.ts
- boardui
- addDays
- standing-forms.tsx
- ledger/data.ts
- cycle/page.tsx
- client
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- ocr/run.ts
- marketing/attribution.ts
- collections/forms.tsx
- calendar/staff.ts
- apply-migrations.sh
- lock-actions.ts
- gap/page.tsx
- returns/load.ts
- theme-toggle.tsx
- Centavos
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- payroll/export/route.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- mime.ts
- brand/page.tsx
- board.ts
- ocr/run.ts
- fixed-assets/page.tsx
- LinkButton
- app/settings/page.tsx
- ticked-allocation.test.ts
- @remixicon/react
- review-form.tsx
- move-bar.tsx
- social-button.tsx
- transactions-actions.ts
- safeguards.ts
- filings/actions.ts
- notifications/format.ts
- server-only
- Centavos
- queries.ts
- brand/actions.ts
- notifications-view.tsx
- layout.ts
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- next
- clients/[id]/page.tsx
- sign-off.ts
- leads/[id]/page.tsx
- Badge
- react
- Rework: one flow from lead to year-end
- calendar/page.tsx
- template.ts
- payment-actions.ts
- bell-store.ts
- quote/page.tsx
- opengraph-image.tsx
- eslint.config.mjs
- staff/actions.ts
- books/periods.ts
- sign-off-actions.tsx
- next-actions.ts
- db.test.ts
- tests/proposal-email.test.ts
- acting-approver.test.ts
- calendar/actions.ts
- lead-attribution.test.ts
- formatAmount
- month.ts
- staff/page.tsx
- bundle-tools.tsx
- binder/page.tsx
- contribution-remittances.test.ts
- public.ts
- runs.tsx
- lookup.ts
- review-queue.ts
- review-forms.tsx
- filters.tsx
- BoardUI page patterns
- names.ts
- tieouts.test.ts
- parties/schema.ts
- tests/register.test.ts
- seed.ts
- fixed-assets.test.ts
- @types/react@^19
- workpapers/load.ts
- proposal-view.tsx
- package.json
- templates/README.md
- approval-memo.tsx
- fields.ts
- returns-sign-off.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 383 edges
2. `cx` - 306 edges
3. `react` - 275 edges
4. `Notice()` - 263 edges
5. `Skeleton()` - 254 edges
6. `Button()` - 242 edges
7. `next` - 238 edges
8. `vitest` - 190 edges
9. `Badge()` - 182 edges
10. `Card()` - 182 edges

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

## Communities (206 total, 19 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.16
Nodes (26): one(), portal2307(), SearchParams, By2307, fmt(), forms2307(), groupByAtc(), isBy2307() (+18 more)

### Community 1 - "match.ts"
Cohesion: 0.33
Nodes (9): digits(), editDistance(), keyNo(), matchEmployee(), MatchStatus, nameScore(), nameWords(), similarity() (+1 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (46): fmtMonth(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate(), lastMonth(), Reports() (+38 more)

### Community 4 - "public.ts"
Cohesion: 0.27
Nodes (7): acceptProposalAction(), AcceptState, contentHash(), acceptedQuote(), canonicalContent(), defaultTerms(), ProposalContent

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (31): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+23 more)

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

### Community 11 - "vat.ts"
Cohesion: 0.15
Nodes (38): annualAttachments(), incomeAttachments(), Periods, periods(), sawtAnnualAttachments(), sawtAttachments(), sawtCsv(), sawtDat() (+30 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "registrations/[id]/page.tsx"
Cohesion: 0.11
Nodes (37): addStepFile(), removeStepFile(), startStepFileUpload(), CompleteButton(), StepBadge(), YearRenewalsForm(), caseStatus, CertificateDetails (+29 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0, server-only@^0.0.1 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (38): defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section, Statement (+30 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

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
Cohesion: 0.08
Nodes (48): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), Rematch2307Button(), CwtLooseDocuments(), CwtTrackerGroups() (+40 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (53): atcRows(), BookInvoiceRow, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC (+45 more)

### Community 43 - "clients/actions.ts"
Cohesion: 0.11
Nodes (28): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), updateClientAction(), addBranchAction(), BranchState (+20 more)

### Community 44 - "notification-settings-view.tsx"
Cohesion: 0.15
Nodes (20): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), markAllRead(), markRead(), NotificationActionResult (+12 more)

### Community 45 - "upload/page.tsx"
Cohesion: 0.10
Nodes (37): FilingsTabsFor(), Content(), NotificationSettingsPage(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload() (+29 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (67): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+59 more)

### Community 47 - "settings/actions.ts"
Cohesion: 0.12
Nodes (25): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+17 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (27): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), CreateLinkForm(), N() (+19 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (30): generateFilingsNow(), generatePastFilingsAction(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction() (+22 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 52 - "supabaseServer"
Cohesion: 0.06
Nodes (77): setIncomeTaxMethodAction(), addClientNoteAction(), RetryBookEntry(), markCwtFollowedUpAction(), recomputeWorksheetAction(), GET(), retryReturnBookEntryAction(), fieldErrors() (+69 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (44): maxDuration, POST(), TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked(), Choice (+36 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.09
Nodes (38): BankAccountsRoute(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow, RowLink() (+30 more)

### Community 55 - "books/export/route.ts"
Cohesion: 0.12
Nodes (27): exceljs@4.4.0, exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging() (+19 more)

### Community 56 - "settlement-pages.tsx"
Cohesion: 0.09
Nodes (36): PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage(), ReceiptsViewPage() (+28 more)

### Community 57 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (70): Party, person, branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDashed() (+62 more)

### Community 59 - "steps.ts"
Cohesion: 0.05
Nodes (90): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+82 more)

### Community 60 - "portal/page.tsx"
Cohesion: 0.08
Nodes (46): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+38 more)

### Community 61 - "engine.ts"
Cohesion: 0.16
Nodes (29): shift(), addDays(), addMonths(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso() (+21 more)

### Community 62 - "quote.ts"
Cohesion: 0.07
Nodes (60): PriceRow, corp, items, proposal(), items, schedule, OWNER_PRICES, OWNER_SETTINGS (+52 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.17
Nodes (21): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+13 more)

### Community 64 - "form-1601c.ts"
Cohesion: 0.13
Nodes (18): Alphalist, agentLines(), agentProblems(), amountText(), emptyResult(), PAYROLL_NOT_LOADED, form1601C, INPUTS (+10 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.12
Nodes (28): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE (+20 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.13
Nodes (25): Rule, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance, Frequency, Period (+17 more)

### Community 68 - "testing.ts"
Cohesion: 0.10
Nodes (30): client, row(), form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q (+22 more)

### Community 69 - "params.ts"
Cohesion: 0.26
Nodes (11): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+3 more)

### Community 70 - "year-end/page.tsx"
Cohesion: 0.10
Nodes (32): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+24 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.12
Nodes (47): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+39 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.08
Nodes (50): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316() (+42 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "income.ts"
Cohesion: 0.10
Nodes (61): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+53 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): @remixicon/react, DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "blocks.tsx"
Cohesion: 0.05
Nodes (96): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+88 more)

### Community 78 - "site-document.tsx"
Cohesion: 0.12
Nodes (14): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), SiteNotFound(), geist (+6 more)

### Community 79 - "vitest"
Cohesion: 0.02
Nodes (41): pg, vitest, dir, ctx, input, root, root, root (+33 more)

### Community 80 - "parallel-run.tsx"
Cohesion: 0.16
Nodes (23): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+15 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.15
Nodes (30): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+22 more)

### Community 82 - "leads/[id]/page.tsx"
Cohesion: 0.06
Nodes (52): NoteState, NotesCard(), ClientNoteForm(), BookingLink(), ConvertForm(), DiscoveryCallForm(), FunnelSwitch(), LostForm() (+44 more)

### Community 83 - "cx.ts"
Cohesion: 0.04
Nodes (74): NotificationFilterTabs(), NotificationRowData, AvatarColor, AvatarProps, AvatarSize, styles, StatusDot(), StatusDotColor (+66 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "tax-codes.ts"
Cohesion: 0.15
Nodes (18): SettingsPage(), SettingsRoute(), appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES (+10 more)

### Community 86 - "Notice"
Cohesion: 0.06
Nodes (98): setupMissingChartsAction(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+90 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (66): Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker(), basePeriod(), HeldNote() (+58 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.11
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 93 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (56): annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation() (+48 more)

### Community 94 - "PageHeader"
Cohesion: 0.06
Nodes (77): ClientList(), ClientsPage(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Section, SECTIONS (+69 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "manilaToday"
Cohesion: 0.25
Nodes (21): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+13 more)

### Community 100 - "ledger/types.ts"
Cohesion: 0.07
Nodes (46): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+38 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.16
Nodes (16): Access, STATUS, loadAssets(), Row, Asset, Cutoff, cutoffOf(), PNL_TYPES (+8 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (99): react-aria-components, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, CounterColor, CounterProps (+91 more)

### Community 103 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "addDays"
Cohesion: 0.08
Nodes (46): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+38 more)

### Community 106 - "standing-forms.tsx"
Cohesion: 0.23
Nodes (11): zod@^4.6.7, zod, amount, date, refresh(), rejectProofAction(), StartProof, submitSchema (+3 more)

### Community 107 - "ledger/data.ts"
Cohesion: 0.08
Nodes (46): Accounts(), AccountsPage(), GROUPS, AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+38 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.23
Nodes (12): Cycle(), CyclePage(), CycleWithClient, DocRow, CycleRow, EXCEPTION_DECISIONS, ExceptionDecision, parseMonth() (+4 more)

### Community 109 - "client"
Cohesion: 0.06
Nodes (21): RegisterRow, as(), client(), root, send(), doc(), root, doc() (+13 more)

### Community 110 - "index.ts"
Cohesion: 0.03
Nodes (39): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+31 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.08
Nodes (33): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+25 more)

### Community 113 - "ocr/run.ts"
Cohesion: 0.16
Nodes (20): isSplittable(), MAX_BUNDLE_PAGES, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+12 more)

### Community 114 - "marketing/attribution.ts"
Cohesion: 0.13
Nodes (36): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+28 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.13
Nodes (33): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), VoidDepositForm(), WaiveDueForm() (+25 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.13
Nodes (27): cancelMeetingAction(), disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState() (+19 more)

### Community 118 - "lock-actions.ts"
Cohesion: 0.31
Nodes (12): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+4 more)

### Community 119 - "gap/page.tsx"
Cohesion: 0.18
Nodes (18): loadSchedules(), loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), Preview(), QuotePreviewPage(), TaxpayerType (+10 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.07
Nodes (47): BirLineKey, FinancialStatements, BookIncome, INCOME_GROUPS, NonDeductibleRow, withNonDeductible(), VatData, client (+39 more)

### Community 121 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (36): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+28 more)

### Community 122 - "Centavos"
Cohesion: 0.10
Nodes (22): AtcComparison, Bucket, DocumentDifference, Figure, PartyComparison, SaleSplit, AlphaCols, AlphalistRow (+14 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (44): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+36 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.09
Nodes (37): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), PortalClient (+29 more)

### Community 126 - "payroll/export/route.ts"
Cohesion: 0.21
Nodes (15): file(), GET(), safe(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when() (+7 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.12
Nodes (30): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+22 more)

### Community 128 - "read.test.ts"
Cohesion: 0.04
Nodes (94): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+86 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.17
Nodes (17): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+9 more)

### Community 130 - "mime.ts"
Cohesion: 0.09
Nodes (46): RFC-2047, RFC-2822, GET(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction() (+38 more)

### Community 131 - "brand/page.tsx"
Cohesion: 0.43
Nodes (6): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard()

### Community 132 - "board.ts"
Cohesion: 0.18
Nodes (18): FilingGroup(), StepProgress(), StepWho, CauseTag, causeTag(), DUE_GROUP_LABELS, DueGroup, FILED (+10 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.08
Nodes (23): OcrManyOutput, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+15 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 135 - "LinkButton"
Cohesion: 0.22
Nodes (19): booksContext(), BooksContext, booksViewFor(), one(), Certificates(), Staff2307Page(), Print(), Print2307Page() (+11 more)

### Community 136 - "app/settings/page.tsx"
Cohesion: 0.26
Nodes (12): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote(), SettingsPage(), describeDue() (+4 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "@remixicon/react"
Cohesion: 0.09
Nodes (36): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+28 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.10
Nodes (30): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), Codes, initialCodes() (+22 more)

### Community 140 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 141 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 142 - "transactions-actions.ts"
Cohesion: 0.14
Nodes (28): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+20 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.10
Nodes (31): CoverageClient, coverageGaps(), Gap, GapKind, board, MARCO, none, RHEA (+23 more)

### Community 144 - "filings/actions.ts"
Cohesion: 0.22
Nodes (16): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+8 more)

### Community 145 - "notifications/format.ts"
Cohesion: 0.20
Nodes (14): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+6 more)

### Community 146 - "server-only"
Cohesion: 0.09
Nodes (43): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+35 more)

### Community 147 - "Centavos"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 148 - "queries.ts"
Cohesion: 0.23
Nodes (11): GET(), BELL_LIMIT, bellDataFor, latestNotifications(), loadBellData(), NotificationFilter, NotificationItem, notificationSession() (+3 more)

### Community 149 - "brand/actions.ts"
Cohesion: 0.18
Nodes (15): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+7 more)

### Community 150 - "notifications-view.tsx"
Cohesion: 0.23
Nodes (13): Content(), NotificationsPage(), Content(), PortalNotificationsPage(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty() (+5 more)

### Community 151 - "layout.ts"
Cohesion: 0.10
Nodes (28): dir, readme, templates, digestMessage(), DigestRow, longDay(), peso, time() (+20 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.20
Nodes (15): ExplainForm(), amt(), one(), shiftMonth(), SignStatus(), STATUS, TieRow(), Workpapers() (+7 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.22
Nodes (18): Bell(), markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base() (+10 more)

### Community 155 - "next"
Cohesion: 0.05
Nodes (85): nextConfig, next, NewEntry(), NewEntryPage(), Doc, DocumentsCard(), when(), Certificates() (+77 more)

### Community 156 - "clients/[id]/page.tsx"
Cohesion: 0.09
Nodes (40): FormState, removeAssignmentAction(), ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient() (+32 more)

### Community 157 - "sign-off.ts"
Cohesion: 0.18
Nodes (12): availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner, preparer (+4 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.12
Nodes (36): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+28 more)

### Community 159 - "Badge"
Cohesion: 0.06
Nodes (81): EmployerCard(), ClientReturnsPage(), FilingRow, Returns(), Client, CollectionsPage(), OpenDue, Overview() (+73 more)

### Community 160 - "react"
Cohesion: 0.08
Nodes (48): react, DocReviewActions(), PayrollIntake(), SignOffState, AmendFilingForm(), PartyForm(), NewParty(), NewPartyPage() (+40 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.13
Nodes (31): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), addDays(), byDay(), CLIENT_MEETING (+23 more)

### Community 163 - "template.ts"
Cohesion: 0.09
Nodes (22): PRICE_SECTIONS, priceSection(), PriceSectionKey, AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED (+14 more)

### Community 164 - "payment-actions.ts"
Cohesion: 0.29
Nodes (12): accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+4 more)

### Community 165 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 166 - "quote/page.tsx"
Cohesion: 0.32
Nodes (7): COMPLEXITY_LABEL, Lines(), ProfileForm(), QuoteView(), TAXPAYER_LABEL, Total(), TAXPAYER_TYPES

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 169 - "staff/actions.ts"
Cohesion: 0.28
Nodes (10): addClientUserAction(), fieldErrors(), inviteStaffAction(), updateStaffAction(), ensureLogin(), clientUserSchema, email, inviteStaffSchema (+2 more)

### Community 170 - "books/periods.ts"
Cohesion: 0.36
Nodes (7): BooksMonthRow, BOOKS_MONTH_STATUS_LABELS, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+2 more)

### Community 172 - "next-actions.ts"
Cohesion: 0.22
Nodes (10): MyWork, byUrgency(), filingItem(), nextActions(), RANK, Role, Urgency, URGENCY_LABELS (+2 more)

### Community 173 - "db.test.ts"
Cohesion: 0.13
Nodes (3): root, Part, root

### Community 174 - "tests/proposal-email.test.ts"
Cohesion: 0.09
Nodes (13): outDir, pkgDir, require, { version }, api, ctx, fn, rows (+5 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "calendar/actions.ts"
Cohesion: 0.21
Nodes (16): cancelMyMeetingAction(), CancelState, calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail(), manilaWhen() (+8 more)

### Community 177 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 178 - "formatAmount"
Cohesion: 0.13
Nodes (24): PortalPrint2307Page(), Print(), portal2307Href(), PortalReport(), Report(), when(), Accreditation(), amount() (+16 more)

### Community 179 - "month.ts"
Cohesion: 0.25
Nodes (9): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), PLAIN, plainForm(), none, TimelineFiling (+1 more)

### Community 180 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 181 - "bundle-tools.tsx"
Cohesion: 0.33
Nodes (10): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+2 more)

### Community 182 - "binder/page.tsx"
Cohesion: 0.39
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, SIGNED_REFS

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "public.ts"
Cohesion: 0.11
Nodes (31): ProposalSetup, QuerySource, JobOption, ProposalQuote, instantView(), Quote, conditionsSchema, FEE_ITEM_COLUMNS (+23 more)

### Community 185 - "runs.tsx"
Cohesion: 0.17
Nodes (14): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+6 more)

### Community 186 - "lookup.ts"
Cohesion: 0.36
Nodes (8): mergePartyAction(), normalizeTin(), withDirectory(), lookupParties(), HEAD_OFFICE, parseTin(), partyKey(), partyKeyOf()

### Community 187 - "review-queue.ts"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 188 - "review-forms.tsx"
Cohesion: 0.46
Nodes (7): signWorkpaperAction(), tickAdjustmentAction(), Msg(), NoteActions(), RaiseNoteForm(), SignButtons(), TickButton()

### Community 189 - "filters.tsx"
Cohesion: 0.39
Nodes (5): PeriodFilter(), PeriodKey, periodRange(), PERIODS, ym()

### Community 190 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 191 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 192 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 193 - "parties/schema.ts"
Cohesion: 0.53
Nodes (5): blank(), optionalText(), PartyInput, partySchema, normalizeBranch()

### Community 194 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 196 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 200 - "workpapers/load.ts"
Cohesion: 0.15
Nodes (20): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, RegisterLine, Adjustment, PeriodFile (+12 more)

### Community 201 - "proposal-view.tsx"
Cohesion: 0.21
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 203 - "package.json"
Cohesion: 0.18
Nodes (10): react-dom@19.3.0, @supabase/ssr@^0.12.7, @tailwindcss/turbopack@4.3.3, name, packageManager, private, version, react-dom (+2 more)

### Community 209 - "approval-memo.tsx"
Cohesion: 0.15
Nodes (14): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, ReviewNote, approvalMemo(), Memo (+6 more)

### Community 211 - "fields.ts"
Cohesion: 0.08
Nodes (38): Booking, DirectoryParty, ENTRY_STATUS, fmtDay(), fmtMonthOf(), ONLY_FOR, typeLabel, PendingTaxCodes (+30 more)

### Community 212 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1614 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `ui.ts`, `public.ts`, `registrations/[id]/page.tsx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `clients/actions.ts`, `notification-settings-view.tsx`, `upload/page.tsx`, `payroll/forms.tsx`, `settings/actions.ts`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `supabaseServer`, `webhook.ts`, `module-pages.tsx`, `books/export/route.ts`, `settlement-pages.tsx`, `steps.ts`, `portal/page.tsx`, `lock-bar.tsx`, `invoice-pages.tsx`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `blocks.tsx`, `site-document.tsx`, `parallel-run.tsx`, `leads/[id]/page.tsx`, `cx.ts`, `Notice`, `portal/reports/page.tsx`, `register/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `PageHeader`, `year-end/page.tsx`, `manilaToday`, `ledger/types.ts`, `ledger/data.ts`, `addDays`, `standing-forms.tsx`, `ledger/data.ts`, `cycle/page.tsx`, `marketing/attribution.ts`, `collections/forms.tsx`, `calendar/staff.ts`, `lock-actions.ts`, `gap/page.tsx`, `theme-toggle.tsx`, `batch/register.ts`, `statement.ts`, `payroll/export/route.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `mime.ts`, `brand/page.tsx`, `fixed-assets/page.tsx`, `LinkButton`, `app/settings/page.tsx`, `@remixicon/react`, `review-form.tsx`, `move-bar.tsx`, `transactions-actions.ts`, `filings/actions.ts`, `server-only`, `queries.ts`, `brand/actions.ts`, `notifications-view.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `Badge`, `react`, `calendar/page.tsx`, `payment-actions.ts`, `quote/page.tsx`, `opengraph-image.tsx`, `staff/actions.ts`, `sign-off-actions.tsx`, `calendar/actions.ts`, `formatAmount`, `bundle-tools.tsx`, `binder/page.tsx`, `runs.tsx`, `workpapers/load.ts`, `proposal-view.tsx`, `package.json`, `approval-memo.tsx`, `fields.ts`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `ui.ts`, `public.ts`, `devDependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `clients/actions.ts`, `settings/actions.ts`, `webhook.ts`, `books/export/route.ts`, `returns/types.ts`, `steps.ts`, `portal/page.tsx`, `engine.ts`, `quote.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `generate.ts`, `testing.ts`, `params.ts`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `blocks.tsx`, `leads/[id]/page.tsx`, `tax-codes.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `payroll/payroll.test.ts`, `PageHeader`, `year-end/page.tsx`, `ledger/types.ts`, `ledger/data.ts`, `rates.ts`, `addDays`, `cycle/page.tsx`, `client`, `index.ts`, `profile.ts`, `ocr/run.ts`, `marketing/attribution.ts`, `collections/forms.tsx`, `calendar/staff.ts`, `returns/load.ts`, `theme-toggle.tsx`, `batch/register.ts`, `read.test.ts`, `social-button.tsx`, `mime.ts`, `board.ts`, `ocr/run.ts`, `fixed-assets/page.tsx`, `app/settings/page.tsx`, `ticked-allocation.test.ts`, `@remixicon/react`, `review-form.tsx`, `move-bar.tsx`, `safeguards.ts`, `notifications/format.ts`, `server-only`, `Centavos`, `layout.ts`, `ledger.test.ts`, `workpapers/page.tsx`, `next`, `clients/[id]/page.tsx`, `sign-off.ts`, `leads/[id]/page.tsx`, `Badge`, `calendar/page.tsx`, `template.ts`, `staff/actions.ts`, `books/periods.ts`, `next-actions.ts`, `db.test.ts`, `tests/proposal-email.test.ts`, `acting-approver.test.ts`, `calendar/actions.ts`, `lead-attribution.test.ts`, `month.ts`, `contribution-remittances.test.ts`, `public.ts`, `runs.tsx`, `review-queue.ts`, `filters.tsx`, `names.ts`, `tieouts.test.ts`, `tests/register.test.ts`, `fixed-assets.test.ts`, `package.json`, `approval-memo.tsx`, `fields.ts`, `returns-sign-off.test.ts`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `ui.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08315863032844165 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `registrations/[id]/page.tsx`, `dependencies`, `statements.ts`, `modal.tsx`, `cwt-tracker.ts`, `scores/page.tsx`, `notification-settings-view.tsx`, `upload/page.tsx`, `payroll/forms.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `supabaseServer`, `module-pages.tsx`, `settlement-pages.tsx`, `button.tsx`, `steps.ts`, `portal/page.tsx`, `quote.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `blocks.tsx`, `site-document.tsx`, `parallel-run.tsx`, `how-we-work/page.tsx`, `leads/[id]/page.tsx`, `cx.ts`, `tax-codes.ts`, `Notice`, `portal/reports/page.tsx`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `PageHeader`, `year-end/page.tsx`, `manilaToday`, `ledger/types.ts`, `cx`, `addDays`, `ledger/data.ts`, `cycle/page.tsx`, `marketing/attribution.ts`, `collections/forms.tsx`, `calendar/staff.ts`, `gap/page.tsx`, `theme-toggle.tsx`, `batch/register.ts`, `statement.ts`, `payroll/export/route.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `brand/page.tsx`, `fixed-assets/page.tsx`, `LinkButton`, `app/settings/page.tsx`, `@remixicon/react`, `review-form.tsx`, `move-bar.tsx`, `social-button.tsx`, `transactions-actions.ts`, `queries.ts`, `notifications-view.tsx`, `workpapers/page.tsx`, `notification-bell.tsx`, `next`, `clients/[id]/page.tsx`, `leads/[id]/page.tsx`, `Badge`, `calendar/page.tsx`, `bell-store.ts`, `quote/page.tsx`, `sign-off-actions.tsx`, `formatAmount`, `staff/page.tsx`, `bundle-tools.tsx`, `binder/page.tsx`, `runs.tsx`, `review-forms.tsx`, `filters.tsx`, `workpapers/load.ts`, `proposal-view.tsx`, `package.json`, `fields.ts`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._