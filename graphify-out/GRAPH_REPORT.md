# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1016 files · ~847,012 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6232 nodes · 22236 edges · 202 communities (181 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 193 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `5be4905b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- vitest
- migrate.yml
- ui.ts
- public.ts
- package.json
- formToObject
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/labels.ts
- Sign-in & Setup Docs
- next
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
- [month]/page.tsx
- returns/types.ts
- registrations/[id]/page.tsx
- payroll/payroll.test.ts
- modal.tsx
- site-document.tsx
- scripts
- access.ts
- button.tsx
- Badge
- webhook.ts
- tax-codes.ts
- structured-data.ts
- formatAmount
- proposal-view.tsx
- returns/load.ts
- steps.ts
- calendar/page.tsx
- books/export/route.ts
- board.ts
- lock-bar.tsx
- review-forms.tsx
- marketing/page.tsx
- Apple Design
- engine.ts
- testing.ts
- fees/[id]/page.tsx
- portalContext
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- status.ts
- getIdentity
- year-end/page.tsx
- parties/[id]/page.tsx
- how-we-work/page.tsx
- requireOwner
- cx.ts
- Pro components
- remittances/[id]/page.tsx
- Notice
- payroll/types.ts
- portal-billing.test.ts
- notifications-view.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- clients/[id]/page.tsx
- manilaToday
- Recipes
- react
- BoardUI page patterns
- Pro templates
- command-search.tsx
- ledger/books.ts
- ledger/data.ts
- combobox.tsx
- rates.ts
- boardui
- layout.ts
- Centavos
- remittances/forms.tsx
- leads/actions.ts
- payroll-read-actions.ts
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- showMonth
- lib/books/actions.ts
- collections/forms.tsx
- [clientId]/[year]/page.tsx
- apply-migrations.sh
- quote/page.tsx
- quote.ts
- opening.ts
- leads/[id]/page.tsx
- LinkButton
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- showDate
- chrome.tsx
- holiday-list.ts
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- app/settings/page.tsx
- zod
- ocr/run.ts
- opening-checklist.tsx
- clients/schema.ts
- clients/actions.ts
- ticked-allocation.test.ts
- settings/actions.ts
- pending-review.tsx
- work/load.ts
- payroll/forms.tsx
- upload/page.tsx
- safeguards-load.ts
- filed-returns.ts
- cycle/page.tsx
- server-only
- sign-off.ts
- template.ts
- theme-toggle.tsx
- blocks.tsx
- seed.ts
- ledger.test.ts
- payroll-read.tsx
- deadlines/dates.ts
- move-bar.tsx
- documents/[id]/page.tsx
- Card
- form-2307.tsx
- onboarding/page.tsx
- fixed-assets/forms.tsx
- Rework: one flow from lead to year-end
- calendar/staff.ts
- sign-off-actions.tsx
- app/documents/page.tsx
- [slug]/page.tsx
- filings/actions.ts
- opengraph-image.tsx
- cx
- requests/actions.ts
- deadlines/actions.ts
- month.ts
- supabaseServer
- cycle/actions.ts
- params.ts
- acting-approver.test.ts
- names.ts
- portal-statements-approval.test.ts
- generate-qap-fixture.mjs
- lead-attribution.test.ts
- bir-filing-calendar/page.tsx
- copy-opencv.mjs
- ContactAccess
- contribution-remittances.test.ts
- tests/register.test.ts
- tests/proposal-email.test.ts
- books-2307.test.ts
- return-files.tsx
- ocr/dates.ts
- parallel-run.test.ts
- Building UIs with BoardUI
- proof-upload.tsx
- eslint.config.mjs
- returns-sign-off.test.ts
- form.tsx
- books/reports/cwt-2307/page.tsx
- review-form.tsx
- @supabase/ssr
- @techstark/opencv-js
- db.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 399 edges
2. `cx` - 313 edges
3. `react` - 283 edges
4. `Notice()` - 269 edges
5. `Skeleton()` - 258 edges
6. `Button()` - 250 edges
7. `next` - 245 edges
8. `vitest` - 195 edges
9. `Badge()` - 187 edges
10. `Card()` - 187 edges

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

## Communities (202 total, 21 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.10
Nodes (45): one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href(), Portal2307() (+37 more)

### Community 1 - "vitest"
Cohesion: 0.02
Nodes (43): pg, vitest, dir, ctx, input, root, root, root (+35 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.09
Nodes (47): BooksContext, booksViewFor(), fmtMonth(), BooksLockBar(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard() (+39 more)

### Community 4 - "public.ts"
Cohesion: 0.09
Nodes (28): dateFmt, statusLabel, statusTone, Supabase, acceptProposalAction(), AcceptState, QuerySource, InstantQuote (+20 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "formToObject"
Cohesion: 0.12
Nodes (30): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+22 more)

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

### Community 11 - "documents/labels.ts"
Cohesion: 0.09
Nodes (39): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+31 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "next"
Cohesion: 0.06
Nodes (71): nextConfig, next, @remixicon/react, setupMissingChartsAction(), amt(), FixedAssets(), FixedAssetsPage(), one() (+63 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (46): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow() (+38 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (64): BirLineKey, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+56 more)

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
Cohesion: 0.07
Nodes (52): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), Rematch2307Button(), CwtLooseDocuments(), CwtTrackerGroups() (+44 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.08
Nodes (41): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+33 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (81): ParallelRun(), ParallelRunPage(), quarterMonths(), th(), Atcs(), Diff(), Documents(), FigureRows() (+73 more)

### Community 43 - "[month]/page.tsx"
Cohesion: 0.16
Nodes (16): PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db (+8 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.05
Nodes (74): branchOfTin(), payeeKeyOf(), tin9(), tinDashed(), tinDigits(), tinHasBranch(), client, agentLines() (+66 more)

### Community 45 - "registrations/[id]/page.tsx"
Cohesion: 0.09
Nodes (51): addStepFile(), removeStepFile(), startStepFileUpload(), CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus (+43 more)

### Community 46 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (40): exceljs, MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion() (+32 more)

### Community 47 - "modal.tsx"
Cohesion: 0.15
Nodes (26): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+18 more)

### Community 48 - "site-document.tsx"
Cohesion: 0.14
Nodes (11): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), geist, geistMono (+3 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "access.ts"
Cohesion: 0.12
Nodes (34): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+26 more)

### Community 51 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 52 - "Badge"
Cohesion: 0.06
Nodes (67): ClientReturnsPage(), FilingRow, Returns(), amt(), one(), shiftMonth(), SignStatus(), STATUS (+59 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (46): maxDuration, POST(), TelegramEnv, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked() (+38 more)

### Community 54 - "tax-codes.ts"
Cohesion: 0.17
Nodes (17): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+9 more)

### Community 55 - "structured-data.ts"
Cohesion: 0.10
Nodes (28): robots(), metadata, metadata, sitemap(), BRAND_NAME, QUOTE_LABEL, SITE_URL, siteUrl() (+20 more)

### Community 56 - "formatAmount"
Cohesion: 0.11
Nodes (62): booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow, RowLink() (+54 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.17
Nodes (16): jobName(), lineName(), longDate(), money(), php, ProposalView(), Rows(), Section() (+8 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.08
Nodes (47): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, FinancialStatements, row(), NonDeductibleRow, withNonDeductible(), dayBefore() (+39 more)

### Community 59 - "steps.ts"
Cohesion: 0.05
Nodes (83): ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction(), PROOF_TYPES (+75 more)

### Community 60 - "calendar/page.tsx"
Cohesion: 0.13
Nodes (32): cancelMeetingAction(), disconnectCalendarAction(), FormState, DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar() (+24 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.12
Nodes (24): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+16 more)

### Community 62 - "board.ts"
Cohesion: 0.12
Nodes (19): StepProgress(), Row, FilingRow, StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED (+11 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (29): ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months(), one() (+21 more)

### Community 64 - "review-forms.tsx"
Cohesion: 0.21
Nodes (14): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+6 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (59): ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable(), FirmMarketingPage() (+51 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.10
Nodes (42): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+34 more)

### Community 68 - "testing.ts"
Cohesion: 0.11
Nodes (28): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+20 more)

### Community 69 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (28): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+20 more)

### Community 70 - "portalContext"
Cohesion: 0.10
Nodes (58): PortalClient, portalContext, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker() (+50 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.11
Nodes (49): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+41 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.07
Nodes (62): EmployeeDetail(), EmployeePage(), GridRow, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory (+54 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.09
Nodes (49): SaleSplit, annualAttachments(), AtcKind, incomeAttachments(), Periods, periods(), incomePayment(), invoiceLabel() (+41 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 78 - "getIdentity"
Cohesion: 0.09
Nodes (35): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+27 more)

### Community 79 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (49): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), fmtDate(), PartyPage(), withDirectory() (+41 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.18
Nodes (27): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+19 more)

### Community 82 - "requireOwner"
Cohesion: 0.19
Nodes (23): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), peso (+15 more)

### Community 83 - "cx.ts"
Cohesion: 0.04
Nodes (63): AvatarColor, AvatarProps, AvatarSize, styles, CHIP_COLORS, ChipProps, ChipVariant, styles (+55 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "remittances/[id]/page.tsx"
Cohesion: 0.14
Nodes (34): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+26 more)

### Community 86 - "Notice"
Cohesion: 0.07
Nodes (90): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+82 more)

### Community 87 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notifications-view.tsx"
Cohesion: 0.06
Nodes (55): GET(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, Empty(), NotificationsView() (+47 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (23): AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY, pickAttribution() (+15 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "clients/[id]/page.tsx"
Cohesion: 0.18
Nodes (21): AssignForm(), CatchUpForm(), ClientUserForm(), EngagementForm(), IncomeTaxMethodForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton() (+13 more)

### Community 94 - "manilaToday"
Cohesion: 0.09
Nodes (52): RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks() (+44 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "react"
Cohesion: 0.05
Nodes (53): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+45 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "command-search.tsx"
Cohesion: 0.14
Nodes (20): globalSearch(), SearchHit, SearchKind, CommandSearch(), Icon, isMac(), KINDS, noop() (+12 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (46): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+38 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.10
Nodes (38): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), RepostRegisterButton(), ReverseForm(), OpeningChecklist() (+30 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (74): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItem(), ComboBoxItemProps, ComboBoxProps, ComboBoxSection() (+66 more)

### Community 103 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "layout.ts"
Cohesion: 0.06
Nodes (41): dir, readme, templates, digestMessage(), DigestRow, longDay(), peso, time() (+33 more)

### Community 106 - "Centavos"
Cohesion: 0.08
Nodes (45): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+37 more)

### Community 107 - "remittances/forms.tsx"
Cohesion: 0.23
Nodes (22): HandlesContributionsSwitch(), RemittanceButton(), RemittanceFileUpload(), send(), addRemittanceFile(), approveRemittanceAction(), generateRemittancesAction(), prepareRemittanceAction() (+14 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.09
Nodes (48): PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction() (+40 more)

### Community 109 - "payroll-read-actions.ts"
Cohesion: 0.09
Nodes (39): file(), GET(), safe(), applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction() (+31 more)

### Community 110 - "index.ts"
Cohesion: 0.03
Nodes (48): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+40 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 113 - "showMonth"
Cohesion: 0.08
Nodes (49): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+41 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.07
Nodes (54): blankLine(), InvoiceForm(), InvoiceFormValue, decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction() (+46 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.10
Nodes (48): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), LateSurchargeActions() (+40 more)

### Community 116 - "[clientId]/[year]/page.tsx"
Cohesion: 0.44
Nodes (7): PrintAll(), PrintAll2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton(), load2316()

### Community 118 - "quote/page.tsx"
Cohesion: 0.19
Nodes (17): loadSchedules(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage() (+9 more)

### Community 119 - "quote.ts"
Cohesion: 0.07
Nodes (52): PriceRow, EstimatedProfile, estimateProfile(), has(), items, schedule, OWNER_PRICES, OWNER_SETTINGS (+44 more)

### Community 120 - "opening.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (39): NoteState, NotesCard(), ClientNoteForm(), BookingLink(), DiscoveryCallForm(), LostForm(), ProposalEmailForm(), ProposalForm() (+31 more)

### Community 122 - "LinkButton"
Cohesion: 0.13
Nodes (34): FilingTable(), OwnerSections(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+26 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "showDate"
Cohesion: 0.10
Nodes (39): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), accessFor() (+31 more)

### Community 126 - "chrome.tsx"
Cohesion: 0.18
Nodes (17): metadata, QuotesClosed(), Start(), StartPage(), ContactList(), Lockup(), Mark(), NAV (+9 more)

### Community 127 - "holiday-list.ts"
Cohesion: 0.26
Nodes (10): easterSunday(), HolidayKind, HolidayRule, iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+2 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (74): RFC-4180, SPREADSHEET_TYPES, geminiJson(), BirCategory, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf() (+66 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.06
Nodes (48): GET(), GET(), POST(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+40 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (44): RFC-2047, RFC-2822, GET(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+36 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.14
Nodes (27): HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+19 more)

### Community 132 - "zod"
Cohesion: 0.11
Nodes (22): zod, addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), Branch, branchSchema (+14 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (42): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+34 more)

### Community 134 - "opening-checklist.tsx"
Cohesion: 0.11
Nodes (28): Access, STATUS, loadAssets(), Row, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD (+20 more)

### Community 135 - "clients/schema.ts"
Cohesion: 0.14
Nodes (12): ActingState, appointActingAction(), endActingAction(), refresh(), assignmentSchema, clientFields, editClientSchema, efpsGroupError (+4 more)

### Community 136 - "clients/actions.ts"
Cohesion: 0.10
Nodes (36): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setCatchUpAction(), setClientStatusAction() (+28 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "settings/actions.ts"
Cohesion: 0.21
Nodes (15): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+7 more)

### Community 139 - "pending-review.tsx"
Cohesion: 0.27
Nodes (10): Booking, Codes, initialCodes(), ocrKeys(), PendingReview(), PendingRow, PendingTaxCodes, ACCOUNT_SOURCES (+2 more)

### Community 140 - "work/load.ts"
Cohesion: 0.18
Nodes (15): standingLine(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (57): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+49 more)

### Community 142 - "upload/page.tsx"
Cohesion: 0.19
Nodes (18): Content(), NotificationSettingsPage(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), TelegramLinkButton() (+10 more)

### Community 143 - "safeguards-load.ts"
Cohesion: 0.10
Nodes (32): Gap, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board (+24 more)

### Community 144 - "filed-returns.ts"
Cohesion: 0.22
Nodes (11): taxTypeOfForm(), FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 145 - "cycle/page.tsx"
Cohesion: 0.23
Nodes (12): Cycle(), CyclePage(), CycleWithClient, DocRow, CycleRow, EXCEPTION_DECISIONS, ExceptionDecision, parseMonth() (+4 more)

### Community 146 - "server-only"
Cohesion: 0.12
Nodes (37): server-only, @supabase/supabase-js, GET(), GET(), GET(), emailProposalAction(), runActingDigest(), cancelDiscoveryCall() (+29 more)

### Community 147 - "sign-off.ts"
Cohesion: 0.18
Nodes (12): availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner, preparer (+4 more)

### Community 148 - "template.ts"
Cohesion: 0.11
Nodes (20): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS (+12 more)

### Community 149 - "theme-toggle.tsx"
Cohesion: 0.11
Nodes (28): EmailSwitches(), EmailSwitchGroup, applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle() (+20 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.11
Nodes (40): AboutPage(), HOW, metadata, BRING, ContactPage(), metadata, FaqPage(), metadata (+32 more)

### Community 151 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "payroll-read.tsx"
Cohesion: 0.10
Nodes (38): KIND_LABEL, MATCH_BADGE, peso(), ReadItem, SheetPreview(), emit(), listeners, markReadLocally() (+30 more)

### Community 154 - "deadlines/dates.ts"
Cohesion: 0.32
Nodes (11): DocumentsCard(), when(), shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd() (+3 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "documents/[id]/page.tsx"
Cohesion: 0.14
Nodes (28): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+20 more)

### Community 157 - "Card"
Cohesion: 0.09
Nodes (42): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+34 more)

### Community 158 - "form-2307.tsx"
Cohesion: 0.25
Nodes (12): Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set(), padded(), PartyFields() (+4 more)

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (32): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+24 more)

### Community 160 - "fixed-assets/forms.tsx"
Cohesion: 0.31
Nodes (10): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+2 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (35): GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches(), Interval (+27 more)

### Community 163 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 164 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (37): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending() (+29 more)

### Community 165 - "[slug]/page.tsx"
Cohesion: 0.29
Nodes (9): generateMetadata(), PICKER_SERVICE, Service(), ServicePage(), TextLink(), JsonLd(), serviceBySlug(), pageMetadata() (+1 more)

### Community 166 - "filings/actions.ts"
Cohesion: 0.05
Nodes (65): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+57 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "cx"
Cohesion: 0.09
Nodes (28): switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent (+20 more)

### Community 169 - "requests/actions.ts"
Cohesion: 0.13
Nodes (32): PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), uploadRequestFile(), ReturnStandingForm(), StandingUpload() (+24 more)

### Community 170 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 171 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 172 - "supabaseServer"
Cohesion: 0.11
Nodes (26): amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text(), cancelRegistrationAction(), completeRegistrationAction() (+18 more)

### Community 173 - "cycle/actions.ts"
Cohesion: 0.40
Nodes (9): CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), CycleState, decideExceptionAction(), nothingToSubmitAction(), refresh() (+1 more)

### Community 174 - "params.ts"
Cohesion: 0.33
Nodes (9): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+1 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 177 - "portal-statements-approval.test.ts"
Cohesion: 0.14
Nodes (4): MONTHS, root, Part, root

### Community 178 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 180 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 181 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 182 - "ContactAccess"
Cohesion: 0.25
Nodes (8): SwitcherBusiness, Identity, IdentityRow, ContactAccess, GrantInput, Contact, ContactBusiness, Row

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 186 - "books-2307.test.ts"
Cohesion: 0.18
Nodes (6): Data, root, Row, approved(), as(), root

### Community 187 - "return-files.tsx"
Cohesion: 0.50
Nodes (7): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), startReturnFileUpload()

### Community 188 - "ocr/dates.ts"
Cohesion: 0.43
Nodes (6): dateFarFromMonth(), iso(), month(), MONTHS, parsePrintedDate(), year()

### Community 189 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 190 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 191 - "proof-upload.tsx"
Cohesion: 0.47
Nodes (5): METHODS, ProofUpload(), send(), startProofUpload(), ProofMethod

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 193 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 194 - "form.tsx"
Cohesion: 0.70
Nodes (4): php, QuoteDetails(), StartForm(), Thanks()

### Community 195 - "books/reports/cwt-2307/page.tsx"
Cohesion: 0.83
Nodes (3): Cwt2307TrackerPage(), Tracker(), CwtFollowUpForm()

### Community 200 - "review-form.tsx"
Cohesion: 0.07
Nodes (52): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), DirectoryParty (+44 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1648 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `ui.ts`, `public.ts`, `package.json`, `formToObject`, `next`, `statements.ts`, `income.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `[month]/page.tsx`, `returns/types.ts`, `payroll/payroll.test.ts`, `access.ts`, `webhook.ts`, `tax-codes.ts`, `structured-data.ts`, `proposal-view.tsx`, `returns/load.ts`, `steps.ts`, `calendar/page.tsx`, `books/export/route.ts`, `board.ts`, `lock-bar.tsx`, `marketing/page.tsx`, `engine.ts`, `testing.ts`, `fees/[id]/page.tsx`, `portalContext`, `books/forms.tsx`, `payroll/data.ts`, `status.ts`, `getIdentity`, `year-end/page.tsx`, `parties/[id]/page.tsx`, `remittances/[id]/page.tsx`, `portal-billing.test.ts`, `notifications-view.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `ledger/books.ts`, `ledger/data.ts`, `rates.ts`, `layout.ts`, `Centavos`, `leads/actions.ts`, `index.ts`, `profile.ts`, `showMonth`, `collections/forms.tsx`, `quote.ts`, `opening.ts`, `leads/[id]/page.tsx`, `LinkButton`, `batch/register.ts`, `holiday-list.ts`, `read.test.ts`, `social-button.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `zod`, `ocr/run.ts`, `opening-checklist.tsx`, `clients/schema.ts`, `clients/actions.ts`, `ticked-allocation.test.ts`, `settings/actions.ts`, `work/load.ts`, `safeguards-load.ts`, `filed-returns.ts`, `cycle/page.tsx`, `server-only`, `sign-off.ts`, `template.ts`, `ledger.test.ts`, `deadlines/dates.ts`, `move-bar.tsx`, `onboarding/page.tsx`, `calendar/staff.ts`, `app/documents/page.tsx`, `filings/actions.ts`, `month.ts`, `params.ts`, `acting-approver.test.ts`, `names.ts`, `portal-statements-approval.test.ts`, `lead-attribution.test.ts`, `bir-filing-calendar/page.tsx`, `contribution-remittances.test.ts`, `tests/register.test.ts`, `tests/proposal-email.test.ts`, `books-2307.test.ts`, `ocr/dates.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `review-form.tsx`, `db.test.ts`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09800362976406533 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `form-2307.ts`, `ui.ts`, `public.ts`, `package.json`, `formToObject`, `documents/labels.ts`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `[month]/page.tsx`, `registrations/[id]/page.tsx`, `site-document.tsx`, `access.ts`, `Badge`, `webhook.ts`, `structured-data.ts`, `formatAmount`, `returns/load.ts`, `steps.ts`, `calendar/page.tsx`, `books/export/route.ts`, `lock-bar.tsx`, `review-forms.tsx`, `marketing/page.tsx`, `fees/[id]/page.tsx`, `portalContext`, `books/forms.tsx`, `payroll/data.ts`, `getIdentity`, `year-end/page.tsx`, `parties/[id]/page.tsx`, `requireOwner`, `remittances/[id]/page.tsx`, `notifications-view.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `clients/[id]/page.tsx`, `manilaToday`, `react`, `command-search.tsx`, `ledger/books.ts`, `ledger/data.ts`, `remittances/forms.tsx`, `leads/actions.ts`, `payroll-read-actions.ts`, `profile.ts`, `showMonth`, `lib/books/actions.ts`, `collections/forms.tsx`, `[clientId]/[year]/page.tsx`, `quote/page.tsx`, `leads/[id]/page.tsx`, `LinkButton`, `batch/register.ts`, `showDate`, `chrome.tsx`, `social-button.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `zod`, `opening-checklist.tsx`, `clients/schema.ts`, `clients/actions.ts`, `settings/actions.ts`, `pending-review.tsx`, `payroll/forms.tsx`, `upload/page.tsx`, `cycle/page.tsx`, `server-only`, `blocks.tsx`, `payroll-read.tsx`, `move-bar.tsx`, `documents/[id]/page.tsx`, `Card`, `form-2307.tsx`, `onboarding/page.tsx`, `fixed-assets/forms.tsx`, `calendar/staff.ts`, `sign-off-actions.tsx`, `app/documents/page.tsx`, `[slug]/page.tsx`, `filings/actions.ts`, `opengraph-image.tsx`, `cx`, `requests/actions.ts`, `deadlines/actions.ts`, `supabaseServer`, `cycle/actions.ts`, `return-files.tsx`, `proof-upload.tsx`, `books/reports/cwt-2307/page.tsx`, `review-form.tsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.021281943862589026 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `documents/labels.ts`, `next`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `[month]/page.tsx`, `registrations/[id]/page.tsx`, `modal.tsx`, `site-document.tsx`, `access.ts`, `button.tsx`, `Badge`, `structured-data.ts`, `formatAmount`, `steps.ts`, `calendar/page.tsx`, `lock-bar.tsx`, `review-forms.tsx`, `marketing/page.tsx`, `fees/[id]/page.tsx`, `portalContext`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `getIdentity`, `year-end/page.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `cx.ts`, `remittances/[id]/page.tsx`, `Notice`, `notifications-view.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `clients/[id]/page.tsx`, `manilaToday`, `command-search.tsx`, `ledger/books.ts`, `ledger/data.ts`, `combobox.tsx`, `remittances/forms.tsx`, `leads/actions.ts`, `profile.ts`, `showMonth`, `lib/books/actions.ts`, `collections/forms.tsx`, `[clientId]/[year]/page.tsx`, `quote/page.tsx`, `leads/[id]/page.tsx`, `LinkButton`, `batch/register.ts`, `showDate`, `chrome.tsx`, `social-button.tsx`, `app/settings/page.tsx`, `clients/actions.ts`, `pending-review.tsx`, `payroll/forms.tsx`, `upload/page.tsx`, `cycle/page.tsx`, `theme-toggle.tsx`, `blocks.tsx`, `payroll-read.tsx`, `move-bar.tsx`, `documents/[id]/page.tsx`, `Card`, `onboarding/page.tsx`, `fixed-assets/forms.tsx`, `sign-off-actions.tsx`, `app/documents/page.tsx`, `[slug]/page.tsx`, `cx`, `requests/actions.ts`, `deadlines/actions.ts`, `cycle/actions.ts`, `return-files.tsx`, `proof-upload.tsx`, `form.tsx`, `books/reports/cwt-2307/page.tsx`, `review-form.tsx`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._