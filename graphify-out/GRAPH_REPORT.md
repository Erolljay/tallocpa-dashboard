# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1005 files · ~834,802 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6171 nodes · 21992 edges · 201 communities (181 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 190 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `aecb72a0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- draft.ts
- migrate.yml
- ui.ts
- public.ts
- devDependencies
- PageHeader
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- vat.ts
- Sign-in & Setup Docs
- quote.ts
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
- payroll/types.ts
- notification-settings-view.tsx
- documents/actions.ts
- register-xlsx.ts
- settings/actions.ts
- button.tsx
- scripts
- slots.ts
- clients/[id]/page.tsx
- filings/[id]/page.tsx
- webhook.ts
- module-pages.tsx
- notification-actions.tsx
- react
- quote/page.tsx
- returns/types.ts
- registrations/forms.tsx
- calendar/page.tsx
- engine.ts
- template.ts
- lock-bar.tsx
- money.ts
- marketing/page.tsx
- Apple Design
- filings/run.ts
- testing.ts
- fees/[id]/page.tsx
- registrations/page.tsx
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- income.ts
- stat-cards.tsx
- react
- leads/page.tsx
- ref_node_fs
- parties/[id]/page.tsx
- how-we-work/page.tsx
- steps.ts
- cx.ts
- Pro components
- split-bundled-pdfs.test.ts
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- notifications/format.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- payroll/payroll.test.ts
- PageHeader
- Recipes
- cwt-2307-tracker.test.ts
- BoardUI page patterns
- Pro templates
- manilaToday
- ledger/types.ts
- ledger/types.ts
- cx
- rates.ts
- boardui
- addDays
- standing-forms.tsx
- review/page.tsx
- cycle/page.tsx
- client
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- telegram-uploads.test.ts
- lib/books/actions.ts
- collections/forms.tsx
- LinkButton
- apply-migrations.sh
- ui.tsx
- quote/page.tsx
- returns/load.ts
- theme-toggle.tsx
- app/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- cycle/actions.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- mime.ts
- work/load.ts
- tax-codes.ts
- ocr/run.ts
- fixed-assets/page.tsx
- idle-watcher.tsx
- requireOwner
- ticked-allocation.test.ts
- deadlines/page.tsx
- review-form.tsx
- registrations/actions.ts
- payroll/forms.tsx
- supabaseServer
- safeguards.ts
- auth-templates.ts
- MonthDetail
- server-only
- Centavos
- queries.ts
- notification-settings-view.tsx
- notifications-view.tsx
- registrations/[id]/page.tsx
- ledger.test.ts
- notification-bell.tsx
- queries.ts
- app/documents/page.tsx
- clients/[id]/page.tsx
- filings/[id]/page.tsx
- items.ts
- onboarding/page.tsx
- bell-store.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- grid.ts
- app/documents/page.tsx
- notifications-view.tsx
- register/page.tsx
- opengraph-image.tsx
- business-switcher.tsx
- @remixicon/react
- people/schema.ts
- sign-off-actions.tsx
- next-actions.ts
- db.test.ts
- notification-actions.tsx
- acting-approver.test.ts
- cancel.ts
- webhook/route.ts
- return-file-actions.ts
- month.ts
- site/calendar.ts
- status.ts
- Building UIs with BoardUI
- contribution-remittances.test.ts
- public.ts
- tests/proposal-email.test.ts
- site-document.tsx
- package.json
- reports/parallel-run/page.tsx
- registrations/new/page.tsx
- parallel-run.test.ts
- names.ts
- eslint.config.mjs
- binder/page.tsx
- books-migration.test.ts
- registration-fee-jobs.test.ts
- lock-by-return-type.test.ts
- fields.ts
- package.json
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 393 edges
2. `cx` - 308 edges
3. `react` - 280 edges
4. `Notice()` - 265 edges
5. `Skeleton()` - 258 edges
6. `Button()` - 248 edges
7. `next` - 242 edges
8. `vitest` - 193 edges
9. `Card()` - 186 edges
10. `Badge()` - 186 edges

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

## Communities (201 total, 20 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.16
Nodes (27): load2307Staff(), one(), portal2307(), SearchParams, By2307, fmt(), forms2307(), groupByAtc() (+19 more)

### Community 1 - "draft.ts"
Cohesion: 0.03
Nodes (39): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+31 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.09
Nodes (44): BooksContext, booksViewFor(), fmtMonth(), one(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard() (+36 more)

### Community 4 - "public.ts"
Cohesion: 0.10
Nodes (34): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+26 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "PageHeader"
Cohesion: 0.15
Nodes (29): AccessOptions(), AccessRowForm(), AddBusinessForm(), Business, NewContactForm(), RemoveBusinessButton(), RenameContactForm(), Result() (+21 more)

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
Cohesion: 0.08
Nodes (41): Doc, DocumentsCard(), when(), ExceptionRow, BOOKED_TYPES, BundleChild, DocumentReviewPage(), loadBooking() (+33 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "quote.ts"
Cohesion: 0.12
Nodes (25): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+17 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.06
Nodes (60): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), PrintButton(), CASH_FLOW_CLASSES, CashFlowClass (+52 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "modal.tsx"
Cohesion: 0.10
Nodes (62): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+54 more)

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
Nodes (47): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary() (+39 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (63): CELL, FirmParallelRunPage(), monthShort(), Summary(), KIND, REASON, Section(), shortDate() (+55 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.08
Nodes (39): PayrollDocument(), PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview(), peso(), ReadItem, ReadPayrollButton() (+31 more)

### Community 44 - "notification-settings-view.tsx"
Cohesion: 0.08
Nodes (54): branch4(), branchOfTin(), HEAD_OFFICE, ParsedTin, payeeKeyOf(), tin9(), tinDashed(), tinDigits() (+46 more)

### Community 45 - "documents/actions.ts"
Cohesion: 0.12
Nodes (30): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+22 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (30): GET(), safe(), Payroll(), PayrollPage(), monthlyTable(), buildEmployeeTemplate(), sortItems(), draftToTemplate() (+22 more)

### Community 47 - "settings/actions.ts"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.12
Nodes (35): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+27 more)

### Community 51 - "clients/[id]/page.tsx"
Cohesion: 0.11
Nodes (30): FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm(), IncomeTaxMethodForm() (+22 more)

### Community 52 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (44): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus, Event (+36 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (42): TelegramApi, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF (+34 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.12
Nodes (36): BankAccountsRoute(), booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+28 more)

### Community 55 - "notification-actions.tsx"
Cohesion: 0.19
Nodes (16): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+8 more)

### Community 56 - "react"
Cohesion: 0.11
Nodes (30): PaymentsNewPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), ReceiptsViewPage(), Kind, Props (+22 more)

### Community 57 - "quote/page.tsx"
Cohesion: 0.13
Nodes (22): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), jobName() (+14 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (57): client, form1701, form1702RT, NonDeductibleRow, withNonDeductible(), BUSINESS_TAX_FORMS, form1701Q, form1702Q (+49 more)

### Community 59 - "registrations/forms.tsx"
Cohesion: 0.11
Nodes (25): cancelRegistrationAction(), completeRegistrationAction(), FormState, openClientCaseAction(), caseNote, caseTitle, Check(), ClientCaseForm() (+17 more)

### Community 60 - "calendar/page.tsx"
Cohesion: 0.13
Nodes (32): cancelMeetingAction(), disconnectCalendarAction(), FormState, DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar() (+24 more)

### Community 61 - "engine.ts"
Cohesion: 0.13
Nodes (24): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+16 more)

### Community 62 - "template.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.11
Nodes (33): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+25 more)

### Community 64 - "money.ts"
Cohesion: 0.13
Nodes (28): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+20 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (66): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+58 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.08
Nodes (54): Rule, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso(), toIso() (+46 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (19): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "fees/[id]/page.tsx"
Cohesion: 0.09
Nodes (52): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+44 more)

### Community 70 - "registrations/page.tsx"
Cohesion: 0.16
Nodes (26): StepRow, YearRenewalsForm(), RegistrationList(), RegistrationsPage(), Row, CaseRow, clientStatus, fmt() (+18 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (39): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+31 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.06
Nodes (75): GridRow, MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv() (+67 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "income.ts"
Cohesion: 0.11
Nodes (47): annualAttachments(), incomeAttachments(), Periods, periods(), buildSawt(), incomePayment(), invoiceLabel(), sawtAnnualAttachments() (+39 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "react"
Cohesion: 0.10
Nodes (32): react, Accounts(), AccountsPage(), GROUPS, CustomersRoute(), INVOICE_KINDS, InvoiceEdit(), InvoiceView() (+24 more)

### Community 78 - "leads/page.tsx"
Cohesion: 0.06
Nodes (54): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+46 more)

### Community 79 - "ref_node_fs"
Cohesion: 0.02
Nodes (45): pg, outDir, pkgDir, require, { version }, ctx, input, api (+37 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.15
Nodes (24): MergeForm(), PresetAccountForm(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage() (+16 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "steps.ts"
Cohesion: 0.08
Nodes (27): Agency, amendmentWords, BillingFacts, BIR_CHANGES, birForm(), BranchOptions, CaseStep, certificateApplication (+19 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (84): ZoomPreview(), UserMenu(), NotificationFilterTabs(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles (+76 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "split-bundled-pdfs.test.ts"
Cohesion: 0.09
Nodes (57): EmployerCard(), file(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS (+49 more)

### Community 86 - "Notice"
Cohesion: 0.08
Nodes (81): ClientForm(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), OpeningUpload() (+73 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.10
Nodes (59): PortalClient, portalContext, Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+51 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.10
Nodes (30): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+22 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.28
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Item(), mmddyyyy(), PartyFields() (+5 more)

### Community 93 - "payroll/payroll.test.ts"
Cohesion: 0.11
Nodes (30): amt(), ApprovalMemo(), Db, TIE, RegisterLine, Adjustment, c(), loadPeriodFile() (+22 more)

### Community 94 - "PageHeader"
Cohesion: 0.11
Nodes (37): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+29 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "cwt-2307-tracker.test.ts"
Cohesion: 0.16
Nodes (24): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), RepostRegisterButton() (+16 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "manilaToday"
Cohesion: 0.17
Nodes (16): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+8 more)

### Community 100 - "ledger/types.ts"
Cohesion: 0.07
Nodes (45): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+37 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.12
Nodes (22): Access, STATUS, Cutoff, cutoffOf(), TbRowOut, ChecklistInput, ChecklistItem, ItemStatus (+14 more)

### Community 102 - "cx"
Cohesion: 0.05
Nodes (69): react-aria-components, ChipColor, animateTag(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps, ComboBoxSelectionMode, IconComponent (+61 more)

### Community 103 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "addDays"
Cohesion: 0.09
Nodes (30): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+22 more)

### Community 106 - "standing-forms.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 107 - "review/page.tsx"
Cohesion: 0.16
Nodes (15): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, TabKey, Queue(), ReviewPage(), Row (+7 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.10
Nodes (42): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+34 more)

### Community 109 - "client"
Cohesion: 0.10
Nodes (35): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), Certificates2316 (+27 more)

### Community 110 - "index.ts"
Cohesion: 0.07
Nodes (18): BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), as(), purchase() (+10 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (54): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+46 more)

### Community 113 - "telegram-uploads.test.ts"
Cohesion: 0.08
Nodes (46): BooksChart(), compact, longMonth(), short(), shortMonth(), SentRow, StandingRow, BooksCards() (+38 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (68): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+60 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.08
Nodes (60): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+52 more)

### Community 116 - "LinkButton"
Cohesion: 0.17
Nodes (20): Certificates(), Staff2307Page(), print2307Href(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), LeadsPage() (+12 more)

### Community 118 - "ui.tsx"
Cohesion: 0.08
Nodes (37): BatchUpload(), PreviewTable(), Batch(), BatchPage(), one(), toCentavos(), NewParty(), NewPartyPage() (+29 more)

### Community 119 - "quote/page.tsx"
Cohesion: 0.07
Nodes (58): EngagementRow, ProposalData, corp, items, proposal(), TaxpayerType, EstimatedProfile, estimateProfile() (+50 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.11
Nodes (28): newDocs(), oldDocs(), qapBuckets(), ATC_MASTER, AtcInfo, normalizeAtc(), row(), amount() (+20 more)

### Community 121 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (40): FunnelSwitch(), LostForm(), ProposalForm(), ReopenForm(), ReviewerForm(), bookedTime, Lead(), LeadPage() (+32 more)

### Community 122 - "app/page.tsx"
Cohesion: 0.18
Nodes (22): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+14 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (42): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+34 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.09
Nodes (43): Detail(), StatementPage(), MonthRemittances(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref() (+35 more)

### Community 126 - "cycle/actions.ts"
Cohesion: 0.40
Nodes (8): MonthComplete(), TimelineRow, confirmMonthAction(), CycleState, decideExceptionAction(), refresh(), text(), undoMonthAction()

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.16
Nodes (20): displayName(), fullAddress(), listNameCols(), Party, person, ABBREVIATIONS, fillFromDirectory(), nameTokens() (+12 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (75): applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), geminiJson(), PayrollItem (+67 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.09
Nodes (29): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+21 more)

### Community 130 - "mime.ts"
Cohesion: 0.11
Nodes (34): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, esubmissionMailEnv(), DatFiles, datFiles(), Db (+26 more)

### Community 131 - "work/load.ts"
Cohesion: 0.17
Nodes (15): standingLine(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 132 - "tax-codes.ts"
Cohesion: 0.09
Nodes (36): blankLine(), InvoiceForm(), InvoiceFormValue, fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, BookingFields() (+28 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.07
Nodes (23): OcrManyOutput, OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL (+15 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (28): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+20 more)

### Community 135 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 136 - "requireOwner"
Cohesion: 0.06
Nodes (63): zod@^4.6.7, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction() (+55 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.07
Nodes (48): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+40 more)

### Community 140 - "registrations/actions.ts"
Cohesion: 0.16
Nodes (20): dtiRegisteredOn(), fieldErrors(), openRegistrationAction(), openYearRenewalsAction(), PROOF_TYPES, updateStepAction(), branchSchema, certificateSchema (+12 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (56): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+48 more)

### Community 142 - "supabaseServer"
Cohesion: 0.06
Nodes (61): nextConfig, next, setIncomeTaxMethodAction(), addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton() (+53 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.08
Nodes (41): ClientValues, TaxType, CoverageClient, coverageGaps(), Gap, GapKind, line(), longDay() (+33 more)

### Community 144 - "auth-templates.ts"
Cohesion: 0.19
Nodes (11): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+3 more)

### Community 145 - "MonthDetail"
Cohesion: 0.43
Nodes (8): Atcs(), Diff(), Documents(), FigureRows(), MonthDetail(), Parties(), PartyRow(), Table()

### Community 146 - "server-only"
Cohesion: 0.13
Nodes (35): server-only, @supabase/supabase-js, GET(), GET(), GET(), emailProposalAction(), runActingDigest(), cancelDiscoveryCall() (+27 more)

### Community 147 - "Centavos"
Cohesion: 0.08
Nodes (37): AgingRow, CheckedUpdate, PNL_TYPES, EntryLineOut, CheckedOpening, checkOpening(), fmt(), ItemRow (+29 more)

### Community 148 - "queries.ts"
Cohesion: 0.11
Nodes (19): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+11 more)

### Community 149 - "notification-settings-view.tsx"
Cohesion: 0.20
Nodes (14): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor() (+6 more)

### Community 150 - "notifications-view.tsx"
Cohesion: 0.06
Nodes (93): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+85 more)

### Community 151 - "registrations/[id]/page.tsx"
Cohesion: 0.19
Nodes (18): addStepFile(), removeStepFile(), startStepFileUpload(), StepBadge(), caseStatus, CertificateDetails, certificateLabel(), fmt() (+10 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "notification-bell.tsx"
Cohesion: 0.25
Nodes (16): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), BellAudience (+8 more)

### Community 154 - "queries.ts"
Cohesion: 0.21
Nodes (13): GET(), isNotificationKind(), BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+5 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "clients/[id]/page.tsx"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 157 - "filings/[id]/page.tsx"
Cohesion: 0.18
Nodes (18): PortalPrint2307Page(), Print(), portal2307Href(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+10 more)

### Community 158 - "items.ts"
Cohesion: 0.18
Nodes (13): PayrollSetupPage(), Setup(), BirCategory, CATEGORIES, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS (+5 more)

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (31): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+23 more)

### Community 160 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.11
Nodes (33): GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches(), Interval (+25 more)

### Community 163 - "grid.ts"
Cohesion: 0.24
Nodes (11): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+3 more)

### Community 164 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (29): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending() (+21 more)

### Community 165 - "notifications-view.tsx"
Cohesion: 0.25
Nodes (12): Content(), NotificationsPage(), Content(), PortalNotificationsPage(), Empty(), NotificationsView(), one(), SearchParams (+4 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.10
Nodes (39): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+31 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "business-switcher.tsx"
Cohesion: 0.23
Nodes (12): switchBusinessAction(), BusinessSwitcher(), SwitcherBusiness, ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, DropdownDivider(), DropdownGroup(), DropdownItem() (+4 more)

### Community 169 - "@remixicon/react"
Cohesion: 0.10
Nodes (47): @remixicon/react, RequestDetail(), RequestPage(), Row, View, VIEWS, PortalRequest(), RequestDetail() (+39 more)

### Community 170 - "people/schema.ts"
Cohesion: 0.21
Nodes (11): access, clientUserSchema, contactAccessSchema, contactLinkSchema, contactNameSchema, email, inviteStaffSchema, name (+3 more)

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 172 - "next-actions.ts"
Cohesion: 0.17
Nodes (23): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+15 more)

### Community 173 - "db.test.ts"
Cohesion: 0.16
Nodes (23): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CloseCycleButton(), Message(), NothingToSubmitButton() (+15 more)

### Community 174 - "notification-actions.tsx"
Cohesion: 0.33
Nodes (9): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), NotificationRowData, markAllRead(), markRead(), NotificationActionResult, revalidateLists() (+1 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "cancel.ts"
Cohesion: 0.13
Nodes (26): mergePartyAction(), isSplittable(), MAX_BUNDLE_PAGES, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+18 more)

### Community 177 - "webhook/route.ts"
Cohesion: 0.33
Nodes (7): maxDuration, POST(), TelegramEnv, telegramEnv(), ClaimedNotification, telegramApi(), notifyTelegram()

### Community 178 - "return-file-actions.ts"
Cohesion: 0.26
Nodes (17): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+9 more)

### Community 179 - "month.ts"
Cohesion: 0.23
Nodes (10): FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear(), TaxTypeGroup (+2 more)

### Community 180 - "site/calendar.ts"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 181 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 182 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "public.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 186 - "site-document.tsx"
Cohesion: 0.12
Nodes (14): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), SiteNotFound(), geist (+6 more)

### Community 187 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 188 - "reports/parallel-run/page.tsx"
Cohesion: 0.60
Nodes (5): ParallelRun(), ParallelRunPage(), quarterMonths(), monthName(), StatusBadge()

### Community 189 - "registrations/new/page.tsx"
Cohesion: 0.47
Nodes (5): ClientCaseKind, clientCase, NewRegistrationPage(), OwnerOnly(), dtiRenewalDue()

### Community 190 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 191 - "names.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 193 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 194 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "registration-fee-jobs.test.ts"
Cohesion: 0.40
Nodes (3): as(), finishAndComplete(), root

### Community 200 - "fields.ts"
Cohesion: 0.11
Nodes (26): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+18 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1628 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `PageHeader`, `vat.ts`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `payroll/types.ts`, `documents/actions.ts`, `register-xlsx.ts`, `settings/actions.ts`, `button.tsx`, `slots.ts`, `clients/[id]/page.tsx`, `filings/[id]/page.tsx`, `module-pages.tsx`, `notification-actions.tsx`, `react`, `quote/page.tsx`, `registrations/forms.tsx`, `calendar/page.tsx`, `lock-bar.tsx`, `money.ts`, `marketing/page.tsx`, `fees/[id]/page.tsx`, `registrations/page.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `leads/page.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `cx.ts`, `split-bundled-pdfs.test.ts`, `Notice`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `PageHeader`, `cwt-2307-tracker.test.ts`, `ledger/types.ts`, `cx`, `standing-forms.tsx`, `review/page.tsx`, `cycle/page.tsx`, `client`, `profile.ts`, `telegram-uploads.test.ts`, `lib/books/actions.ts`, `collections/forms.tsx`, `LinkButton`, `ui.tsx`, `quote/page.tsx`, `theme-toggle.tsx`, `app/page.tsx`, `statement.ts`, `cycle/actions.ts`, `social-button.tsx`, `tax-codes.ts`, `fixed-assets/page.tsx`, `idle-watcher.tsx`, `requireOwner`, `deadlines/page.tsx`, `review-form.tsx`, `payroll/forms.tsx`, `supabaseServer`, `notification-settings-view.tsx`, `notifications-view.tsx`, `registrations/[id]/page.tsx`, `notification-bell.tsx`, `queries.ts`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `filings/[id]/page.tsx`, `items.ts`, `onboarding/page.tsx`, `bell-store.ts`, `app/documents/page.tsx`, `notifications-view.tsx`, `register/page.tsx`, `business-switcher.tsx`, `@remixicon/react`, `sign-off-actions.tsx`, `next-actions.ts`, `db.test.ts`, `notification-actions.tsx`, `return-file-actions.ts`, `site-document.tsx`, `package.json`, `reports/parallel-run/page.tsx`, `registrations/new/page.tsx`, `binder/page.tsx`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `draft.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.02664796633941094 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `PageHeader`, `vat.ts`, `quote.ts`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/actions.ts`, `register-xlsx.ts`, `slots.ts`, `clients/[id]/page.tsx`, `filings/[id]/page.tsx`, `module-pages.tsx`, `notification-actions.tsx`, `react`, `quote/page.tsx`, `calendar/page.tsx`, `engine.ts`, `lock-bar.tsx`, `money.ts`, `marketing/page.tsx`, `fees/[id]/page.tsx`, `registrations/page.tsx`, `books/forms.tsx`, `react`, `leads/page.tsx`, `parties/[id]/page.tsx`, `cx.ts`, `split-bundled-pdfs.test.ts`, `Notice`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `payroll/payroll.test.ts`, `PageHeader`, `cwt-2307-tracker.test.ts`, `manilaToday`, `ledger/types.ts`, `ledger/types.ts`, `standing-forms.tsx`, `review/page.tsx`, `cycle/page.tsx`, `client`, `profile.ts`, `telegram-uploads.test.ts`, `lib/books/actions.ts`, `collections/forms.tsx`, `LinkButton`, `ui.tsx`, `theme-toggle.tsx`, `app/page.tsx`, `batch/register.ts`, `statement.ts`, `cycle/actions.ts`, `read.test.ts`, `social-button.tsx`, `mime.ts`, `fixed-assets/page.tsx`, `idle-watcher.tsx`, `requireOwner`, `deadlines/page.tsx`, `review-form.tsx`, `registrations/actions.ts`, `payroll/forms.tsx`, `server-only`, `notifications-view.tsx`, `registrations/[id]/page.tsx`, `notification-bell.tsx`, `queries.ts`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `filings/[id]/page.tsx`, `onboarding/page.tsx`, `calendar/page.tsx`, `app/documents/page.tsx`, `notifications-view.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `business-switcher.tsx`, `@remixicon/react`, `sign-off-actions.tsx`, `next-actions.ts`, `db.test.ts`, `notification-actions.tsx`, `webhook/route.ts`, `return-file-actions.ts`, `site-document.tsx`, `package.json`, `reports/parallel-run/page.tsx`, `registrations/new/page.tsx`, `binder/page.tsx`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `testing.ts` to `form-2307.ts`, `draft.ts`, `ui.ts`, `public.ts`, `devDependencies`, `vat.ts`, `quote.ts`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `notification-settings-view.tsx`, `slots.ts`, `clients/[id]/page.tsx`, `filings/[id]/page.tsx`, `webhook.ts`, `notification-actions.tsx`, `returns/types.ts`, `registrations/forms.tsx`, `calendar/page.tsx`, `engine.ts`, `lock-bar.tsx`, `money.ts`, `marketing/page.tsx`, `filings/run.ts`, `fees/[id]/page.tsx`, `registrations/page.tsx`, `payroll/data.ts`, `leads/page.tsx`, `ref_node_fs`, `split-bundled-pdfs.test.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `notifications/format.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `payroll/payroll.test.ts`, `PageHeader`, `manilaToday`, `ledger/types.ts`, `ledger/types.ts`, `rates.ts`, `addDays`, `review/page.tsx`, `client`, `index.ts`, `profile.ts`, `telegram-uploads.test.ts`, `lib/books/actions.ts`, `collections/forms.tsx`, `quote/page.tsx`, `returns/load.ts`, `theme-toggle.tsx`, `app/page.tsx`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `mime.ts`, `work/load.ts`, `tax-codes.ts`, `ocr/run.ts`, `fixed-assets/page.tsx`, `idle-watcher.tsx`, `requireOwner`, `ticked-allocation.test.ts`, `deadlines/page.tsx`, `review-form.tsx`, `payroll/forms.tsx`, `safeguards.ts`, `auth-templates.ts`, `server-only`, `Centavos`, `queries.ts`, `notifications-view.tsx`, `ledger.test.ts`, `app/documents/page.tsx`, `onboarding/page.tsx`, `calendar/page.tsx`, `app/documents/page.tsx`, `register/page.tsx`, `people/schema.ts`, `next-actions.ts`, `db.test.ts`, `acting-approver.test.ts`, `cancel.ts`, `month.ts`, `site/calendar.ts`, `status.ts`, `contribution-remittances.test.ts`, `public.ts`, `tests/proposal-email.test.ts`, `package.json`, `parallel-run.test.ts`, `names.ts`, `books-migration.test.ts`, `registration-fee-jobs.test.ts`, `lock-by-return-type.test.ts`, `fields.ts`, `package.json`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Should `ui.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0899854862119013 - nodes in this community are weakly interconnected._