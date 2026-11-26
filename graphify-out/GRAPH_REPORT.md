# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 897 files · ~709,994 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5535 nodes · 19328 edges · 194 communities (174 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 175 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `a0903bfa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- december-rehearsal.test.ts
- migrate.yml
- ui.ts
- public.ts
- package.json
- clients/[id]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
- Sign-in & Setup Docs
- cx
- Sign-off, Ledger & Payments
- zod
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
- scores/page.tsx
- Centavos
- employees-xlsx.ts
- onboarding/forms.tsx
- index.ts
- payroll/forms.tsx
- modal.tsx
- board.ts
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- register-xlsx.ts
- documents/labels.ts
- module-pages.tsx
- marketing/page.tsx
- payroll/data.ts
- registrations/forms.tsx
- returns/types.ts
- Notice
- registrations/[id]/page.tsx
- arap.ts
- morning.ts
- lock-bar.tsx
- LinkButton
- invoice-pages.tsx
- Apple Design
- next
- testing.ts
- supabaseServer
- parties/parties.test.ts
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- ledger/data.ts
- stat-cards.tsx
- cycle-forms.tsx
- @remixicon/react
- proposal-view.test.ts
- Card
- how-we-work/page.tsx
- steps.test.ts
- link-button.tsx
- Pro components
- Textarea
- tools/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- workpapers/load.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- proposal.ts
- app/requests/[id]/page.tsx
- Recipes
- notifications-view.tsx
- BoardUI theming reference
- Pro templates
- review-form.tsx
- ledger/books.ts
- engine.ts
- select.tsx
- marketing/attribution.ts
- boardui
- fees/types.ts
- profile.ts
- filings/[id]/page.tsx
- template.ts
- sign-in-form.tsx
- vitest
- Opening balances: checklist for any cut-off
- tieouts.ts
- portal/page.tsx
- transactions-actions.ts
- [clientId]/page.tsx
- calendar/callback/route.ts
- apply-migrations.sh
- vat.ts
- proposal-view.tsx
- returns/load.ts
- work/load.ts
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- documents/[id]/page.tsx
- parties/[id]/page.tsx
- read.test.ts
- opening.ts
- return-file-actions.ts
- fields.ts
- onboarding/checklist.ts
- gemini.ts
- fixed-assets/page.tsx
- rates.ts
- react
- ticked-allocation.test.ts
- proof-upload.tsx
- ledger.test.ts
- queries.ts
- move-bar.tsx
- idle-watcher.tsx
- notifications/format.ts
- steps.ts
- register/page.tsx
- server-only
- ledger/types.ts
- leads/page.tsx
- sign-off-actions.tsx
- blocks.tsx
- holiday-list.ts
- addDays
- Badge
- notification-settings-view.tsx
- app/documents/page.tsx
- fixed-assets/forms.tsx
- quote.ts
- leads/[id]/page.tsx
- acting-approver/page.tsx
- bell-store.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- formatAmount
- filings/actions.ts
- form-1601c.ts
- social-button.tsx
- opengraph-image.tsx
- lead-attribution.test.ts
- terms.ts
- form.tsx
- return-files.tsx
- app/settings/page.tsx
- binder/page.tsx
- BoardUI page patterns
- acting-approver.test.ts
- fixed-assets.test.ts
- batch/page.tsx
- copy-opencv.mjs
- returns-sign-off.test.ts
- proposal/[token]/page.tsx
- [month]/page.tsx
- ledger-closing.test.ts
- ref_node_fs
- tests/books.test.ts
- portal-statements-approval.test.ts
- books/reports/statements/page.tsx
- filters.tsx
- seed.ts
- funnel.test.ts
- returns-books.test.ts
- templates/README.md
- register-books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 314 edges
2. `cx` - 282 edges
3. `react` - 254 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 235 edges
6. `next` - 211 edges
7. `Button()` - 206 edges
8. `Card()` - 167 edges
9. `vitest` - 167 edges
10. `Badge()` - 165 edges

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

## Communities (194 total, 20 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.07
Nodes (58): BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href() (+50 more)

### Community 1 - "december-rehearsal.test.ts"
Cohesion: 0.05
Nodes (25): BOOK_LOCK_FORMS, as(), client(), root, approved(), as(), root, approveIntoBooks() (+17 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (38): KINDS, AllocationRow, InvoiceLineRow, InvoiceRow, loadInvoices(), loadModuleCounts(), loadPartyBalances(), SettlementRow (+30 more)

### Community 4 - "public.ts"
Cohesion: 0.13
Nodes (25): QuerySource, instantView(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num() (+17 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "clients/[id]/page.tsx"
Cohesion: 0.15
Nodes (22): ClientTab, ClientTabs(), UNDER, RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), NotesCard(), fmtDate() (+14 more)

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
Nodes (21): SheetPreview(), markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base() (+13 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.03
Nodes (106): react-aria-components, NotificationFilterTabs(), AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps (+98 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "zod"
Cohesion: 0.09
Nodes (22): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+14 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (45): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES (+37 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.11
Nodes (41): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+33 more)

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

### Community 41 - "scores/page.tsx"
Cohesion: 0.08
Nodes (42): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+34 more)

### Community 42 - "Centavos"
Cohesion: 0.05
Nodes (78): KIND, REASON, Section(), shortDate(), STATUS_TONE, AtcComparison, atcRows(), BookInvoiceRow (+70 more)

### Community 43 - "employees-xlsx.ts"
Cohesion: 0.10
Nodes (21): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+13 more)

### Community 44 - "onboarding/forms.tsx"
Cohesion: 0.22
Nodes (16): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+8 more)

### Community 45 - "index.ts"
Cohesion: 0.05
Nodes (23): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+15 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (50): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+42 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (48): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+40 more)

### Community 48 - "board.ts"
Cohesion: 0.08
Nodes (31): StepProgress(), Row, FilingRow, StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED (+23 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.10
Nodes (42): generateFilingsNow(), generatePastFilingsAction(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction() (+34 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (31): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+23 more)

### Community 52 - "register-xlsx.ts"
Cohesion: 0.16
Nodes (21): GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), draftToTemplate(), initialDraft(), ID_HEADERS, registerHeaders() (+13 more)

### Community 53 - "documents/labels.ts"
Cohesion: 0.06
Nodes (64): Doc, DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow (+56 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.15
Nodes (37): booksContext(), fmtDate(), fmtMonth(), BooksFrame(), BooksList(), InvoiceList(), JournalEntryRoute(), JournalRoute() (+29 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (28): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+20 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.12
Nodes (34): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Certificates2316, certificatesFromRaw(), Form2316Employer, Form2316Signatory (+26 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.11
Nodes (26): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), FormState, caseNote, caseTitle, NewRegistrationForm(), statusTone (+18 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (65): lookupAtc(), incomePayment(), VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule() (+57 more)

### Community 59 - "Notice"
Cohesion: 0.08
Nodes (79): BatchUpload(), PreviewTable(), AccountForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), OpeningUpload() (+71 more)

### Community 60 - "registrations/[id]/page.tsx"
Cohesion: 0.17
Nodes (29): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+21 more)

### Community 61 - "arap.ts"
Cohesion: 0.15
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+10 more)

### Community 62 - "morning.ts"
Cohesion: 0.13
Nodes (18): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+10 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (28): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+20 more)

### Community 64 - "LinkButton"
Cohesion: 0.10
Nodes (29): SearchParams, Column, ListRow, RowLink(), NewEntry(), NewEntryPage(), MonthSelect(), PaymentsEditPage() (+21 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.14
Nodes (23): INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesViewPage(), TransactionJournal() (+15 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "next"
Cohesion: 0.06
Nodes (60): nextConfig, next, addClientNoteAction(), ClientList(), ClientsPage(), DashboardStats(), FilingTable(), markCwtFollowedUpAction() (+52 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "supabaseServer"
Cohesion: 0.05
Nodes (94): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+86 more)

### Community 70 - "parties/parties.test.ts"
Cohesion: 0.21
Nodes (16): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), lookupParties(), person, blank(), optionalText() (+8 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (42): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+34 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (59): GridRow, AlphaCols, alphaCols(), AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+51 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ledger/data.ts"
Cohesion: 0.12
Nodes (28): dayBefore(), GET(), safe(), Released, fromWorkbookData(), buildBookWorkbook(), accountFromRow(), Amendment (+20 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "cycle-forms.tsx"
Cohesion: 0.24
Nodes (12): MonthComplete(), CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction(), CycleState, decideExceptionAction() (+4 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.06
Nodes (55): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links() (+47 more)

### Community 79 - "proposal-view.test.ts"
Cohesion: 0.14
Nodes (14): ProposalData, corp, items, lastWholeMonths(), items, schedule, OWNER_PRICES, OWNER_SETTINGS (+6 more)

### Community 80 - "Card"
Cohesion: 0.15
Nodes (24): Branches(), BranchesPage(), dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel (+16 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (35): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+27 more)

### Community 82 - "steps.test.ts"
Cohesion: 0.13
Nodes (21): dtiRegisteredOn(), fieldErrors(), openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction(), updateStepAction(), Check(), ChecklistPreview() (+13 more)

### Community 83 - "link-button.tsx"
Cohesion: 0.07
Nodes (31): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+23 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "Textarea"
Cohesion: 0.18
Nodes (18): NoteState, ClientNoteForm(), NewRequestForm(), ReplyForm(), TicketForm(), ReplyForm(), send(), Textarea() (+10 more)

### Community 86 - "tools/page.tsx"
Cohesion: 0.18
Nodes (20): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm() (+12 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.09
Nodes (61): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+53 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "workpapers/load.ts"
Cohesion: 0.15
Nodes (21): amt(), ApprovalMemo(), Db, TIE, Adjustment, c(), loadPeriodFile(), monthEnd() (+13 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.10
Nodes (30): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+22 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (28): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+20 more)

### Community 93 - "proposal.ts"
Cohesion: 0.11
Nodes (37): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState (+29 more)

### Community 94 - "app/requests/[id]/page.tsx"
Cohesion: 0.18
Nodes (19): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "notifications-view.tsx"
Cohesion: 0.18
Nodes (19): Content(), NotificationsPage(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), NotificationRowData, Empty(), NotificationsView() (+11 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.07
Nodes (48): blankLine(), InvoiceForm(), InvoiceFormValue, ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED (+40 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (45): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+37 more)

### Community 101 - "engine.ts"
Cohesion: 0.10
Nodes (42): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+34 more)

### Community 102 - "select.tsx"
Cohesion: 0.09
Nodes (31): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+23 more)

### Community 103 - "marketing/attribution.ts"
Cohesion: 0.22
Nodes (22): GET(), Link, ATTR_COOKIE, ATTR_COOKIE_MAX_AGE, cleanText(), first(), firstTouch(), fromPage() (+14 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "fees/types.ts"
Cohesion: 0.17
Nodes (16): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+8 more)

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (60): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+52 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (60): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage() (+52 more)

### Community 108 - "template.ts"
Cohesion: 0.10
Nodes (21): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+13 more)

### Community 109 - "sign-in-form.tsx"
Cohesion: 0.17
Nodes (17): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+9 more)

### Community 110 - "vitest"
Cohesion: 0.03
Nodes (25): pg, vitest, ctx, input, root, root, root, root (+17 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "tieouts.ts"
Cohesion: 0.11
Nodes (17): RegisterLine, LedgerTotals, purchases(), sales(), base, books, buy, sale (+9 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (47): BooksChart(), compact, longMonth(), short(), shortMonth(), SentRow, TimelineRow, BooksCards() (+39 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (40): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), RunReadyButton(), VoidDepositForm() (+32 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.20
Nodes (16): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+8 more)

### Community 118 - "vat.ts"
Cohesion: 0.10
Nodes (69): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+61 more)

### Community 119 - "proposal-view.tsx"
Cohesion: 0.23
Nodes (13): jobName(), lineName(), longDate(), money(), php, ProposalView(), Rows(), Section() (+5 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.09
Nodes (41): FinancialStatements, ATC_MASTER, AtcInfo, normalizeAtc(), withNonDeductible(), dayBefore(), FilingRow, listInvoices() (+33 more)

### Community 121 - "work/load.ts"
Cohesion: 0.19
Nodes (15): loadAssets(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (38): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+30 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.13
Nodes (32): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), credit() (+24 more)

### Community 126 - "documents/[id]/page.tsx"
Cohesion: 0.07
Nodes (48): BOOKED_TYPES, PayrollDocument(), applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap() (+40 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.11
Nodes (33): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+25 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (78): RFC-4180, SPREADSHEET_TYPES, geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf() (+70 more)

### Community 129 - "opening.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (43): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+35 more)

### Community 131 - "fields.ts"
Cohesion: 0.11
Nodes (21): ok, FieldKey, keys, normalizeAmount(), normalizeFields(), normalizePartyKind(), normalizeTerms(), OCR_DOC_TYPES (+13 more)

### Community 132 - "onboarding/checklist.ts"
Cohesion: 0.22
Nodes (9): ItemState, MANUAL_ITEM_LABELS, ONBOARDING_GROUPS, onboardingChecklist(), OnboardingFacts, OnboardingItem, onboardingProgress(), state() (+1 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (22): OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, call(), GeminiOptions (+14 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (18): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), Row, accumulated() (+10 more)

### Community 135 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+11 more)

### Community 136 - "react"
Cohesion: 0.07
Nodes (42): react, BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), PaymentsNewPage(), PaymentsListPage(), PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage() (+34 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "proof-upload.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "queries.ts"
Cohesion: 0.19
Nodes (14): GET(), BELL_LIMIT, BellData, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+6 more)

### Community 141 - "move-bar.tsx"
Cohesion: 0.29
Nodes (12): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), unapproveSelectedAction(), MoveBar(), crossesYear() (+4 more)

### Community 142 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 143 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 144 - "steps.ts"
Cohesion: 0.15
Nodes (14): Agency, BranchOptions, CaseStep, ClosureOptions, dayNumber(), EMPLOYER_STEPS, LGU_STEPS, PlannedStep (+6 more)

### Community 145 - "register/page.tsx"
Cohesion: 0.12
Nodes (34): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+26 more)

### Community 146 - "server-only"
Cohesion: 0.11
Nodes (40): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+32 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.15
Nodes (19): Access, STATUS, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, ChecklistInput, ChecklistItem (+11 more)

### Community 148 - "leads/page.tsx"
Cohesion: 0.26
Nodes (11): FunnelSwitch(), day(), Leads(), LeadsPage(), Row, ViewLink(), isOpenStage(), LEAD_STAGE_ORDER (+3 more)

### Community 149 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.04
Nodes (120): GlobalNotFound(), metadata, metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage() (+112 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.16
Nodes (16): easterSunday(), HolidayKind, HolidayRule, iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+8 more)

### Community 152 - "addDays"
Cohesion: 0.10
Nodes (36): CoverageClient, coverageGaps(), Gap, GapKind, addDays(), isWeekend(), parseIso(), toIso() (+28 more)

### Community 153 - "Badge"
Cohesion: 0.18
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+14 more)

### Community 154 - "notification-settings-view.tsx"
Cohesion: 0.23
Nodes (11): EmailSwitches(), EmailSwitchGroup, Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS, NotificationAudience (+3 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (27): ClientSelect(), loadBooking(), Review(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths() (+19 more)

### Community 156 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm()

### Community 157 - "quote.ts"
Cohesion: 0.11
Nodes (36): EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), buildQuote(), catchUpFor() (+28 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.13
Nodes (17): bookedTime, LeadPage(), LeadTouch, Person, ICON, when, SERVICE_LABELS, inquiryAnswers() (+9 more)

### Community 159 - "acting-approver/page.tsx"
Cohesion: 0.22
Nodes (17): appointActingAction(), endActingAction(), refresh(), EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge (+9 more)

### Community 160 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.11
Nodes (37): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), Interval, Admin (+29 more)

### Community 163 - "formatAmount"
Cohesion: 0.40
Nodes (11): th(), Atcs(), Diff(), Documents(), FigureRows(), MonthDetail(), Parties(), PartyRow() (+3 more)

### Community 164 - "filings/actions.ts"
Cohesion: 0.15
Nodes (21): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+13 more)

### Community 165 - "form-1601c.ts"
Cohesion: 0.08
Nodes (29): Alphalist, tinDashed(), client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q (+21 more)

### Community 166 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 169 - "terms.ts"
Cohesion: 0.27
Nodes (7): acceptProposalAction(), AcceptState, contentHash(), acceptedQuote(), canonicalContent(), defaultTerms(), ProposalContent

### Community 170 - "form.tsx"
Cohesion: 0.29
Nodes (8): pageAttribution(), requestQuoteAction(), SERVICES, StartState, php, Thanks(), InstantQuote, Attribution

### Community 171 - "return-files.tsx"
Cohesion: 0.42
Nodes (8): file(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), startReturnFileUpload()

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (39): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+31 more)

### Community 173 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 174 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 177 - "batch/page.tsx"
Cohesion: 0.53
Nodes (5): Batch(), BatchPage(), one(), toCentavos(), BATCH_KINDS

### Community 178 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 180 - "proposal/[token]/page.tsx"
Cohesion: 0.53
Nodes (4): AcceptForm(), metadata, Proposal(), ProposalPage()

### Community 181 - "[month]/page.tsx"
Cohesion: 0.10
Nodes (38): saveMonthAction(), PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES (+30 more)

### Community 182 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 183 - "ref_node_fs"
Cohesion: 0.06
Nodes (11): dir, api, ctx, fn, rows, src, root, root (+3 more)

### Community 185 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 189 - "books/reports/statements/page.tsx"
Cohesion: 0.24
Nodes (12): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+4 more)

### Community 191 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 198 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 201 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 207 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1470 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `form-2307.ts`, `ui.ts`, `package.json`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `zod`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `onboarding/forms.tsx`, `payroll/forms.tsx`, `modal.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `register-xlsx.ts`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `registrations/[id]/page.tsx`, `lock-bar.tsx`, `LinkButton`, `invoice-pages.tsx`, `supabaseServer`, `parties/parties.test.ts`, `books/forms.tsx`, `ledger/data.ts`, `@remixicon/react`, `Card`, `link-button.tsx`, `Textarea`, `tools/page.tsx`, `portal/reports/page.tsx`, `workpapers/load.ts`, `intake-picker.tsx`, `form-2316.tsx`, `proposal.ts`, `app/requests/[id]/page.tsx`, `notifications-view.tsx`, `review-form.tsx`, `ledger/books.ts`, `marketing/attribution.ts`, `profile.ts`, `filings/[id]/page.tsx`, `sign-in-form.tsx`, `portal/page.tsx`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `batch/register.ts`, `manilaToday`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `return-file-actions.ts`, `fixed-assets/page.tsx`, `react`, `proof-upload.tsx`, `queries.ts`, `move-bar.tsx`, `idle-watcher.tsx`, `register/page.tsx`, `server-only`, `ledger/types.ts`, `leads/page.tsx`, `sign-off-actions.tsx`, `blocks.tsx`, `Badge`, `app/documents/page.tsx`, `fixed-assets/forms.tsx`, `leads/[id]/page.tsx`, `acting-approver/page.tsx`, `filings/actions.ts`, `opengraph-image.tsx`, `terms.ts`, `form.tsx`, `return-files.tsx`, `app/settings/page.tsx`, `binder/page.tsx`, `batch/page.tsx`, `proposal/[token]/page.tsx`, `[month]/page.tsx`, `books/reports/statements/page.tsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07441688263606072 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `december-rehearsal.test.ts`, `ui.ts`, `public.ts`, `package.json`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `index.ts`, `board.ts`, `supabaseAdmin`, `fees/[id]/page.tsx`, `documents/labels.ts`, `returns/types.ts`, `arap.ts`, `morning.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `testing.ts`, `supabaseServer`, `parties/parties.test.ts`, `payroll/payroll.test.ts`, `@remixicon/react`, `proposal-view.test.ts`, `steps.test.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `workpapers/load.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `app/requests/[id]/page.tsx`, `review-form.tsx`, `ledger/books.ts`, `engine.ts`, `marketing/attribution.ts`, `fees/types.ts`, `profile.ts`, `template.ts`, `sign-in-form.tsx`, `tieouts.ts`, `portal/page.tsx`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `returns/load.ts`, `work/load.ts`, `batch/register.ts`, `documents/[id]/page.tsx`, `read.test.ts`, `opening.ts`, `return-file-actions.ts`, `fields.ts`, `onboarding/checklist.ts`, `gemini.ts`, `fixed-assets/page.tsx`, `rates.ts`, `ticked-allocation.test.ts`, `ledger.test.ts`, `move-bar.tsx`, `idle-watcher.tsx`, `notifications/format.ts`, `register/page.tsx`, `server-only`, `ledger/types.ts`, `blocks.tsx`, `holiday-list.ts`, `addDays`, `app/documents/page.tsx`, `quote.ts`, `leads/[id]/page.tsx`, `acting-approver/page.tsx`, `calendar/page.tsx`, `filings/actions.ts`, `form-1601c.ts`, `lead-attribution.test.ts`, `terms.ts`, `app/settings/page.tsx`, `acting-approver.test.ts`, `fixed-assets.test.ts`, `returns-sign-off.test.ts`, `ledger-closing.test.ts`, `ref_node_fs`, `tests/books.test.ts`, `portal-statements-approval.test.ts`, `filters.tsx`, `funnel.test.ts`, `returns-books.test.ts`, `register-books.test.ts`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `december-rehearsal.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05353535353535353 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `cx`, `zod`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `onboarding/forms.tsx`, `payroll/forms.tsx`, `modal.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `Notice`, `registrations/[id]/page.tsx`, `lock-bar.tsx`, `LinkButton`, `invoice-pages.tsx`, `next`, `supabaseServer`, `books/forms.tsx`, `stat-cards.tsx`, `cycle-forms.tsx`, `@remixicon/react`, `proposal-view.test.ts`, `Card`, `how-we-work/page.tsx`, `link-button.tsx`, `Textarea`, `tools/page.tsx`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `proposal.ts`, `app/requests/[id]/page.tsx`, `notifications-view.tsx`, `review-form.tsx`, `ledger/books.ts`, `select.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `sign-in-form.tsx`, `portal/page.tsx`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/callback/route.ts`, `batch/register.ts`, `manilaToday`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `fixed-assets/page.tsx`, `proof-upload.tsx`, `queries.ts`, `move-bar.tsx`, `idle-watcher.tsx`, `register/page.tsx`, `leads/page.tsx`, `sign-off-actions.tsx`, `blocks.tsx`, `Badge`, `notification-settings-view.tsx`, `app/documents/page.tsx`, `fixed-assets/forms.tsx`, `leads/[id]/page.tsx`, `acting-approver/page.tsx`, `bell-store.ts`, `calendar/page.tsx`, `social-button.tsx`, `form.tsx`, `return-files.tsx`, `app/settings/page.tsx`, `binder/page.tsx`, `batch/page.tsx`, `proposal/[token]/page.tsx`, `[month]/page.tsx`, `books/reports/statements/page.tsx`, `filters.tsx`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._