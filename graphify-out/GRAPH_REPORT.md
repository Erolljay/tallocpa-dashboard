# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 868 files · ~680,600 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .css 8, (none) 4, .mdc 1)

## Summary
- 5395 nodes · 18809 edges · 199 communities (172 shown, 27 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 155 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `9eb124b8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- generate.ts
- migrate.yml
- form-1601c.ts
- fees/[id]/page.tsx
- devDependencies
- clients/[id]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
- Sign-in & Setup Docs
- documents/[id]/page.tsx
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
- scores/page.tsx
- Centavos
- payroll/types.ts
- module-pages.tsx
- index.ts
- payroll/forms.tsx
- modal.tsx
- addDays
- scripts
- slots.ts
- workpapers/page.tsx
- register-xlsx.ts
- app/settings/page.tsx
- settlement-pages.tsx
- marketing/page.tsx
- payroll/data.ts
- registrations/[id]/page.tsx
- returns/types.ts
- Notice
- digest.ts
- ledger/data.ts
- approval-memo.tsx
- manilaToday
- notification.tsx
- dropdown.tsx
- Apple Design
- server.ts
- testing.ts
- [clientId]/page.tsx
- source.ts
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- [month]/page.tsx
- stat-cards.tsx
- cycle-forms.tsx
- notification-settings-view.tsx
- quote/page.tsx
- @remixicon/react
- how-we-work/page.tsx
- supabaseServer
- button.tsx
- Pro components
- getIdentity
- Badge
- portal/reports/page.tsx
- portal-billing.test.ts
- Centavos
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- toCentavos
- Recipes
- notifications-view.tsx
- BoardUI page patterns
- Pro templates
- ui.ts
- ledger/books.ts
- addDays
- select.tsx
- Skeleton
- boardui
- staff/page.tsx
- profile.ts
- filings/[id]/page.tsx
- app/documents/page.tsx
- marketing/attribution.ts
- generate-qap-fixture.mjs
- Opening balances: checklist for any cut-off
- month.ts
- portal/page.tsx
- transactions-actions.ts
- collections.ts
- calendar/staff.ts
- apply-migrations.sh
- vat.ts
- documents/labels.ts
- returns/load.ts
- tests/register.test.ts
- notes.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- match.ts
- lib/books/actions.ts
- read.test.ts
- tieouts.ts
- return-file-actions.ts
- review/page.tsx
- onboarding/page.tsx
- gemini.ts
- work/load.ts
- rates.ts
- Skeleton
- ticked-allocation.test.ts
- books-ready.ts
- ledger.test.ts
- queries.ts
- filings/actions.ts
- booksContext
- notifications/format.ts
- names.ts
- tieouts.test.ts
- supabaseAdmin
- opening-checklist.tsx
- fixed-assets/page.tsx
- sign-off-actions.tsx
- (site)/page.tsx
- holiday-list.ts
- safeguards.ts
- cx
- workpapers/load.ts
- app/documents/page.tsx
- package.json
- proposal/[token]/page.tsx
- seed.ts
- filed-returns.ts
- bell-store.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- portal-nav.tsx
- binder/page.tsx
- missing-2307/page.tsx
- eslint.config.mjs
- opengraph-image.tsx
- vitest
- deadlines/actions.ts
- Building UIs with BoardUI
- register-books.test.ts
- describe.ts
- ledger-lock.test.ts
- templatePayload
- acting-approver.test.ts
- books-2307.test.ts
- registrations/forms.tsx
- parallel-run.test.ts
- returns-sign-off.test.ts
- formatAmount
- funnel.test.ts
- leads-pipeline.test.ts
- vitest
- books-migration.test.ts
- tests/books.test.ts
- notifications.test.ts
- portal-statements-approval.test.ts
- fees.test.ts
- fixed-assets.test.ts
- ledger-documents.test.ts
- month-complete.test.ts
- workpapers.test.ts
- review/page.tsx
- unlock-requests.tsx
- batch-upload.test.ts
- books-lock.test.ts
- year-end.test.ts
- @techstark/opencv-js

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 310 edges
2. `cx` - 276 edges
3. `react` - 248 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 233 edges
6. `next` - 207 edges
7. `Button()` - 204 edges
8. `Card()` - 166 edges
9. `Badge()` - 165 edges
10. `vitest` - 158 edges

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

## Communities (199 total, 27 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (40): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one(), portal2307() (+32 more)

### Community 1 - "generate.ts"
Cohesion: 0.10
Nodes (28): Rule, IsoDate, DueRule, EfpsGroup, FilingChannel, Frequency, PeriodFilter, ACTIVE (+20 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "form-1601c.ts"
Cohesion: 0.08
Nodes (28): Alphalist, tinDashed(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+20 more)

### Community 4 - "fees/[id]/page.tsx"
Cohesion: 0.07
Nodes (61): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+53 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/pg@^8.23.1, @types/react@^19, typescript@^5 (+7 more)

### Community 6 - "clients/[id]/page.tsx"
Cohesion: 0.11
Nodes (35): FormState, removeAssignmentAction(), updateClientAction(), ClientForm(), ClientValues, frequencyLabel, Props, EditClient() (+27 more)

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
Cohesion: 0.14
Nodes (21): markReadLocally(), BellPanel(), BellRow(), DotBadge(), NotificationBell(), base(), notificationSettingsHref(), notificationsHref() (+13 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "documents/[id]/page.tsx"
Cohesion: 0.14
Nodes (25): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), PayrollReadState, ColumnMapping(), KIND_LABEL (+17 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (50): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow() (+42 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (66): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+58 more)

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
Cohesion: 0.12
Nodes (29): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+21 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (36): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+28 more)

### Community 42 - "Centavos"
Cohesion: 0.05
Nodes (79): CELL, FirmParallelRunPage(), monthShort(), Summary(), KIND, REASON, Section(), shortDate() (+71 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.12
Nodes (19): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+11 more)

### Community 44 - "module-pages.tsx"
Cohesion: 0.07
Nodes (43): BankAccountsRoute(), fmtDate(), SearchParams, BooksList(), Column, ListRow, RowLink(), CustomersRoute() (+35 more)

### Community 45 - "index.ts"
Cohesion: 0.06
Nodes (20): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+12 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (55): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+47 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "addDays"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "slots.ts"
Cohesion: 0.13
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+25 more)

### Community 51 - "workpapers/page.tsx"
Cohesion: 0.23
Nodes (18): signWorkpaperAction(), tickAdjustmentAction(), ExplainForm(), amt(), one(), shiftMonth(), SignStatus(), STATUS (+10 more)

### Community 52 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (35): file(), GET(), safe(), RegisterPreview, buildEmployeeTemplate(), PayrollItem, draftToTemplate(), initialDraft() (+27 more)

### Community 53 - "app/settings/page.tsx"
Cohesion: 0.23
Nodes (17): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), PaymentSettingsState (+9 more)

### Community 54 - "settlement-pages.tsx"
Cohesion: 0.09
Nodes (37): PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage(), ReceiptsViewPage() (+29 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (28): ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable(), FirmMarketingPage() (+20 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.10
Nodes (47): GridRow, AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+39 more)

### Community 57 - "registrations/[id]/page.tsx"
Cohesion: 0.10
Nodes (48): SectionTabs(), ClientCaseKind, StepBadge(), StepForm(), StepRow, YearRenewalsForm(), caseStatus, fmt() (+40 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (59): client, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel(), EwtLine (+51 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (68): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm(), EntryForm() (+60 more)

### Community 60 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 61 - "ledger/data.ts"
Cohesion: 0.13
Nodes (24): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+16 more)

### Community 62 - "approval-memo.tsx"
Cohesion: 0.19
Nodes (12): amt(), ApprovalMemo(), Db, TIE, ReviewNote, approvalMemo(), Memo, MemoInput (+4 more)

### Community 63 - "manilaToday"
Cohesion: 0.17
Nodes (18): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, day(), dayFmt (+10 more)

### Community 64 - "notification.tsx"
Cohesion: 0.05
Nodes (46): Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, ButtonProps, CloseButton(), CloseButtonProps (+38 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.07
Nodes (37): react-aria-components, ClientTab, UNDER, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input() (+29 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "server.ts"
Cohesion: 0.08
Nodes (33): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+25 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (39): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+31 more)

### Community 70 - "source.ts"
Cohesion: 0.06
Nodes (64): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail() (+56 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (39): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+31 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (48): MonthGrid(), toInput(), alphaCols(), AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+40 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "[month]/page.tsx"
Cohesion: 0.14
Nodes (21): PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db (+13 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "cycle-forms.tsx"
Cohesion: 0.13
Nodes (28): Cycle(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload(), STREAM_INFO (+20 more)

### Community 78 - "notification-settings-view.tsx"
Cohesion: 0.14
Nodes (17): EmailSwitches(), EmailSwitchGroup, BellAudience, Switch(), SwitchProps, SwitchShape, SwitchSize, switchSizes (+9 more)

### Community 79 - "quote/page.tsx"
Cohesion: 0.06
Nodes (70): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage() (+62 more)

### Community 80 - "@remixicon/react"
Cohesion: 0.07
Nodes (57): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+49 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.11
Nodes (37): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+29 more)

### Community 82 - "supabaseServer"
Cohesion: 0.07
Nodes (61): addEngagementAction(), assignStaffAction(), fieldErrors(), addClientNoteAction(), NoteState, archiveLinkAction(), createLinkAction(), MarketingState (+53 more)

### Community 83 - "button.tsx"
Cohesion: 0.08
Nodes (30): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+22 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "getIdentity"
Cohesion: 0.15
Nodes (25): RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), Thread() (+17 more)

### Community 86 - "Badge"
Cohesion: 0.12
Nodes (32): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), ReverseForm() (+24 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.10
Nodes (58): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+50 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "Centavos"
Cohesion: 0.08
Nodes (35): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), Bucket, SaleSplit, ACCOUNTS (+27 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (27): metadata, Start(), StartPage(), Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize (+19 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.23
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.10
Nodes (35): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+27 more)

### Community 94 - "toCentavos"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "notifications-view.tsx"
Cohesion: 0.12
Nodes (28): notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, Empty(), NotificationsView(), one() (+20 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "ui.ts"
Cohesion: 0.07
Nodes (54): fmtMonth(), BooksFrame(), WithdrawReportButton(), blankLine(), InvoiceForm(), InvoiceFormValue, JournalEntryRoute(), JournalView() (+46 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (48): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+40 more)

### Community 101 - "addDays"
Cohesion: 0.17
Nodes (25): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule, FilingInstance (+17 more)

### Community 102 - "select.tsx"
Cohesion: 0.11
Nodes (28): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+20 more)

### Community 103 - "Skeleton"
Cohesion: 0.11
Nodes (28): react, INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE (+20 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "staff/page.tsx"
Cohesion: 0.15
Nodes (17): AddBranchForm(), BranchRowForm(), Branches(), BranchesPage(), FormState, BranchOption, BranchOptions(), InviteStaffForm() (+9 more)

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (48): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus, Event (+40 more)

### Community 108 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (42): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), DirectoryParty (+34 more)

### Community 109 - "marketing/attribution.ts"
Cohesion: 0.18
Nodes (27): GET(), Link, pageAttribution(), requestQuoteAction(), SERVICES, StartState, ATTR_COOKIE, ATTR_COOKIE_MAX_AGE (+19 more)

### Community 110 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "month.ts"
Cohesion: 0.13
Nodes (19): MonthComplete(), SentRow, TimelineRow, confirmMonthAction(), decideExceptionAction(), nothingToSubmitAction(), refresh(), text() (+11 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 115 - "collections.ts"
Cohesion: 0.17
Nodes (25): RunReadyButton(), Client, CollectionsPage(), OpenDue, Overview(), Stat(), ageOpenItems(), AGING_BUCKETS (+17 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.20
Nodes (17): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+9 more)

### Community 118 - "vat.ts"
Cohesion: 0.15
Nodes (37): incomeAttachments(), buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm (+29 more)

### Community 119 - "documents/labels.ts"
Cohesion: 0.09
Nodes (39): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+31 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.09
Nodes (38): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), Lines(), lineStyle, Problems(), sameFigures() (+30 more)

### Community 121 - "tests/register.test.ts"
Cohesion: 0.40
Nodes (4): DocumentRow, approved(), as(), root

### Community 122 - "notes.ts"
Cohesion: 0.18
Nodes (15): NotesCard(), ClientNoteForm(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry, noteEntry() (+7 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (41): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+33 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.11
Nodes (35): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+27 more)

### Community 126 - "match.ts"
Cohesion: 0.29
Nodes (10): digits(), editDistance(), EmployeeMatch, keyNo(), matchEmployee(), MatchStatus, nameScore(), nameWords() (+2 more)

### Community 127 - "lib/books/actions.ts"
Cohesion: 0.16
Nodes (22): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+14 more)

### Community 128 - "read.test.ts"
Cohesion: 0.04
Nodes (88): RFC-4180, applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), amountOf() (+80 more)

### Community 129 - "tieouts.ts"
Cohesion: 0.16
Nodes (15): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, RegisterLine, purchases(), sales() (+7 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (50): RFC-2047, RFC-2822, GET(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction() (+42 more)

### Community 131 - "review/page.tsx"
Cohesion: 0.18
Nodes (13): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, TabKey, Queue(), ReviewPage(), Row (+5 more)

### Community 132 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (30): ClientTabs(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+22 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 134 - "work/load.ts"
Cohesion: 0.16
Nodes (20): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), lastMonth(), loadMyWork() (+12 more)

### Community 135 - "rates.ts"
Cohesion: 0.23
Nodes (19): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+11 more)

### Community 136 - "Skeleton"
Cohesion: 0.09
Nodes (51): Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS, NewEntry() (+43 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "books-ready.ts"
Cohesion: 0.36
Nodes (7): BooksMonthRow, BOOKS_MONTH_STATUS_LABELS, BooksMonthStatus, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "queries.ts"
Cohesion: 0.19
Nodes (14): GET(), BELL_LIMIT, BellData, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+6 more)

### Community 141 - "filings/actions.ts"
Cohesion: 0.24
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 142 - "booksContext"
Cohesion: 0.33
Nodes (10): booksContext(), BooksContext, one(), Print(), Print2307Page(), ParallelRun(), ParallelRunPage(), quarterMonths() (+2 more)

### Community 143 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 144 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 145 - "tieouts.test.ts"
Cohesion: 0.18
Nodes (10): c(), one(), RegisterRow, line(), row(), toRegisterLine(), base, books (+2 more)

### Community 146 - "supabaseAdmin"
Cohesion: 0.09
Nodes (47): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+39 more)

### Community 147 - "opening-checklist.tsx"
Cohesion: 0.12
Nodes (22): Access, STATUS, Row, Asset, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput (+14 more)

### Community 148 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 149 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 150 - "(site)/page.tsx"
Cohesion: 0.04
Nodes (109): nextConfig, next, robots(), AboutPage(), HOW, metadata, BirCalendarPage(), metadata (+101 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.16
Nodes (16): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+8 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.09
Nodes (42): CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay(), NEEDS (+34 more)

### Community 153 - "cx"
Cohesion: 0.10
Nodes (40): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+32 more)

### Community 154 - "workpapers/load.ts"
Cohesion: 0.25
Nodes (12): Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ALWAYS, MonthActivity (+4 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.11
Nodes (28): Booking, ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+20 more)

### Community 156 - "package.json"
Cohesion: 0.18
Nodes (10): tailwind-merge@^3.7.1, @types/node@^20, @types/react-dom@^19, name, packageManager, private, version, tailwind-merge (+2 more)

### Community 157 - "proposal/[token]/page.tsx"
Cohesion: 0.25
Nodes (11): metadata, Proposal(), ProposalPage(), Lines(), longDate(), money(), php, ProposalData (+3 more)

### Community 158 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 159 - "filed-returns.ts"
Cohesion: 0.22
Nodes (11): taxTypeOfForm(), FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 160 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.11
Nodes (37): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), Interval, manilaInstant() (+29 more)

### Community 163 - "portal-nav.tsx"
Cohesion: 0.35
Nodes (8): PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab, Tab, under()

### Community 164 - "binder/page.tsx"
Cohesion: 0.39
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, SIGNED_REFS

### Community 165 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 166 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "vitest"
Cohesion: 0.10
Nodes (8): vitest, root, root, LEAD, LinkRow, ReportRow, root, root

### Community 169 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 170 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 171 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 172 - "describe.ts"
Cohesion: 0.40
Nodes (4): describeDue(), FREQUENCY_SECTIONS, periodWord, TAX_TYPE_GROUPS

### Community 174 - "templatePayload"
Cohesion: 0.10
Nodes (21): createClientAction(), setClientStatusAction(), setIncomeTaxMethodAction(), setupMissingChartsAction(), assignmentSchema, clientFields, editClientSchema, efpsGroupError (+13 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 177 - "registrations/forms.tsx"
Cohesion: 0.07
Nodes (57): StaffOptions(), cancelRegistrationAction(), completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+49 more)

### Community 178 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 180 - "formatAmount"
Cohesion: 0.16
Nodes (22): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), PortalPrint2307Page(), Print(), portal2307Href(), Accreditation() (+14 more)

### Community 181 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 182 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 183 - "vitest"
Cohesion: 0.04
Nodes (22): pg, outDir, pkgDir, require, { version }, ctx, input, root (+14 more)

### Community 184 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 185 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 189 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 192 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 193 - "review/page.tsx"
Cohesion: 0.14
Nodes (28): DashboardStats(), FilingTable(), OwnerSections(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice() (+20 more)

### Community 194 - "unlock-requests.tsx"
Cohesion: 0.83
Nodes (3): UnlockRequests(), when(), booksUnlockRequests()

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1440 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Skeleton` to `form-2307.ts`, `fees/[id]/page.tsx`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `documents/[id]/page.tsx`, `dependencies`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `module-pages.tsx`, `payroll/forms.tsx`, `modal.tsx`, `addDays`, `slots.ts`, `workpapers/page.tsx`, `app/settings/page.tsx`, `settlement-pages.tsx`, `marketing/page.tsx`, `registrations/[id]/page.tsx`, `Notice`, `manilaToday`, `notification.tsx`, `dropdown.tsx`, `server.ts`, `[clientId]/page.tsx`, `source.ts`, `books/forms.tsx`, `[month]/page.tsx`, `stat-cards.tsx`, `cycle-forms.tsx`, `notification-settings-view.tsx`, `quote/page.tsx`, `@remixicon/react`, `how-we-work/page.tsx`, `button.tsx`, `getIdentity`, `Badge`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/[id]/page.tsx`, `notifications-view.tsx`, `ui.ts`, `ledger/books.ts`, `select.tsx`, `staff/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `app/documents/page.tsx`, `month.ts`, `portal/page.tsx`, `collections.ts`, `calendar/staff.ts`, `documents/labels.ts`, `returns/load.ts`, `notes.ts`, `batch/register.ts`, `manilaToday`, `tieouts.ts`, `return-file-actions.ts`, `review/page.tsx`, `onboarding/page.tsx`, `work/load.ts`, `Skeleton`, `queries.ts`, `booksContext`, `fixed-assets/page.tsx`, `sign-off-actions.tsx`, `(site)/page.tsx`, `cx`, `app/documents/page.tsx`, `package.json`, `proposal/[token]/page.tsx`, `bell-store.ts`, `calendar/page.tsx`, `binder/page.tsx`, `missing-2307/page.tsx`, `deadlines/actions.ts`, `registrations/forms.tsx`, `formatAmount`, `review/page.tsx`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1110204081632653 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `generate.ts`, `fees/[id]/page.tsx`, `devDependencies`, `clients/[id]/page.tsx`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `module-pages.tsx`, `index.ts`, `addDays`, `slots.ts`, `payroll/data.ts`, `registrations/[id]/page.tsx`, `returns/types.ts`, `digest.ts`, `ledger/data.ts`, `approval-memo.tsx`, `manilaToday`, `server.ts`, `testing.ts`, `source.ts`, `payroll/payroll.test.ts`, `[month]/page.tsx`, `cycle-forms.tsx`, `quote/page.tsx`, `@remixicon/react`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/[id]/page.tsx`, `toCentavos`, `ui.ts`, `ledger/books.ts`, `addDays`, `Skeleton`, `staff/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `app/documents/page.tsx`, `marketing/attribution.ts`, `month.ts`, `portal/page.tsx`, `collections.ts`, `calendar/staff.ts`, `tests/register.test.ts`, `notes.ts`, `batch/register.ts`, `read.test.ts`, `return-file-actions.ts`, `review/page.tsx`, `onboarding/page.tsx`, `gemini.ts`, `work/load.ts`, `rates.ts`, `ticked-allocation.test.ts`, `books-ready.ts`, `ledger.test.ts`, `filings/actions.ts`, `notifications/format.ts`, `names.ts`, `tieouts.test.ts`, `supabaseAdmin`, `opening-checklist.tsx`, `fixed-assets/page.tsx`, `(site)/page.tsx`, `holiday-list.ts`, `safeguards.ts`, `app/documents/page.tsx`, `package.json`, `filed-returns.ts`, `calendar/page.tsx`, `portal-nav.tsx`, `register-books.test.ts`, `describe.ts`, `ledger-lock.test.ts`, `templatePayload`, `acting-approver.test.ts`, `books-2307.test.ts`, `registrations/forms.tsx`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `formatAmount`, `funnel.test.ts`, `leads-pipeline.test.ts`, `vitest`, `books-migration.test.ts`, `tests/books.test.ts`, `notifications.test.ts`, `portal-statements-approval.test.ts`, `fees.test.ts`, `fixed-assets.test.ts`, `ledger-documents.test.ts`, `month-complete.test.ts`, `workpapers.test.ts`, `review/page.tsx`, `batch-upload.test.ts`, `books-lock.test.ts`, `year-end.test.ts`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Should `generate.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09615384615384616 - nodes in this community are weakly interconnected._
- **Why does `next` connect `(site)/page.tsx` to `form-2307.ts`, `fees/[id]/page.tsx`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `documents/[id]/page.tsx`, `dependencies`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `module-pages.tsx`, `payroll/forms.tsx`, `addDays`, `slots.ts`, `workpapers/page.tsx`, `register-xlsx.ts`, `app/settings/page.tsx`, `settlement-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `registrations/[id]/page.tsx`, `ledger/data.ts`, `approval-memo.tsx`, `dropdown.tsx`, `server.ts`, `[clientId]/page.tsx`, `source.ts`, `books/forms.tsx`, `[month]/page.tsx`, `cycle-forms.tsx`, `quote/page.tsx`, `@remixicon/react`, `supabaseServer`, `button.tsx`, `getIdentity`, `Badge`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `notifications-view.tsx`, `ui.ts`, `ledger/books.ts`, `Skeleton`, `staff/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `app/documents/page.tsx`, `marketing/attribution.ts`, `month.ts`, `portal/page.tsx`, `transactions-actions.ts`, `collections.ts`, `calendar/staff.ts`, `documents/labels.ts`, `returns/load.ts`, `batch/register.ts`, `manilaToday`, `lib/books/actions.ts`, `read.test.ts`, `tieouts.ts`, `return-file-actions.ts`, `review/page.tsx`, `onboarding/page.tsx`, `work/load.ts`, `Skeleton`, `queries.ts`, `filings/actions.ts`, `booksContext`, `supabaseAdmin`, `opening-checklist.tsx`, `fixed-assets/page.tsx`, `sign-off-actions.tsx`, `cx`, `app/documents/page.tsx`, `package.json`, `proposal/[token]/page.tsx`, `portal-nav.tsx`, `binder/page.tsx`, `missing-2307/page.tsx`, `opengraph-image.tsx`, `deadlines/actions.ts`, `templatePayload`, `registrations/forms.tsx`, `formatAmount`, `review/page.tsx`, `unlock-requests.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._