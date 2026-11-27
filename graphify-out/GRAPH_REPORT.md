# Graph Report - agent-aa05840049b9640db  (2026-11-27)

## Corpus Check
- 968 files · ~794,638 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: .css 10, (none) 5, .woff2 3)

## Summary
- 5985 nodes · 21191 edges · 206 communities (177 shown, 29 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 187 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `ab62c26b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LinkButton
- money.ts
- migrate.yml
- ui.ts
- public.ts
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- form-1601c.ts
- Sign-in & Setup Docs
- notification-bell.tsx
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
- payroll/payroll.test.ts
- link-button.tsx
- review-form.tsx
- payroll/forms.tsx
- modal.tsx
- form.tsx
- scripts
- slots.ts
- fees/[id]/page.tsx
- requireStaff
- webhook.ts
- formatAmount
- deadlines/page.tsx
- fields.ts
- marketing/page.tsx
- returns/types.ts
- registrations/forms.tsx
- portal/page.tsx
- books/export/route.ts
- work/load.ts
- lock-bar.tsx
- ref_node_path
- invoice-pages.tsx
- Apple Design
- engine.ts
- testing.ts
- quote/page.tsx
- lib/books/actions.ts
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- react
- app/layout.tsx
- vitest
- status.ts
- how-we-work/page.tsx
- ledger/data.ts
- notification.tsx
- Pro components
- module-pages.tsx
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- register/page.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- Centavos
- manilaToday
- Recipes
- tools/page.tsx
- BoardUI page patterns
- Pro templates
- names.ts
- ledger/books.ts
- ledger/types.ts
- combobox.tsx
- rates.ts
- boardui
- dropdown.tsx
- supabaseServer
- filings/[id]/page.tsx
- cycle/page.tsx
- client
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- documents/[id]/page.tsx
- year-end/page.tsx
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- calendar/actions.ts
- quote.ts
- returns/load.ts
- leads/forms.tsx
- ref_node_fs
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- Badge
- structured-data.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- 2316/page.tsx
- move-bar.tsx
- ocr/run.ts
- fixed-assets/page.tsx
- chrome.tsx
- cwt-forms.tsx
- ticked-allocation.test.ts
- theme-toggle.tsx
- pending-review.tsx
- server.ts
- idle-watcher.tsx
- workpapers/page.tsx
- safeguards.ts
- transactions-actions.ts
- parallel-run.tsx
- supabaseAdmin
- items.ts
- blocks.tsx
- FormModule
- [slug]/page.tsx
- portal/requests/page.tsx
- ledger.test.ts
- review-forms.tsx
- fixed-assets/forms.tsx
- app/documents/page.tsx
- proof-upload.tsx
- template.ts
- leads/[id]/page.tsx
- app/page.tsx
- PageHeader
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- book-income.ts
- worksheet/page.tsx
- books-ready.ts
- opengraph-image.tsx
- deadlines/actions.ts
- filters.tsx
- clients/actions.ts
- eslint.config.mjs
- app/settings/page.tsx
- books-2307.test.ts
- cx
- acting-approver.test.ts
- safeguards-load.ts
- notifications.test.ts
- bir-filing-calendar/page.tsx
- returns-books.test.ts
- lead-attribution.test.ts
- register-xlsx.ts
- approve-and-post.test.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- next
- site-document.tsx
- batch-row-images.test.ts
- contribution-payables.test.ts
- parallel-run.test.ts
- books-migration.test.ts
- tests/books.test.ts
- @supabase/ssr
- file-upload.tsx
- @techstark/opencv-js
- seed.ts
- site/brand.ts
- binder/page.tsx
- layout.ts
- generate-qap-fixture.mjs
- templates/README.md
- split-bundled-pdfs.test.ts
- telegram-uploads.test.ts
- fees.test.ts
- portal-home.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 372 edges
2. `cx` - 306 edges
3. `react` - 273 edges
4. `Notice()` - 257 edges
5. `Skeleton()` - 254 edges
6. `next` - 235 edges
7. `Button()` - 234 edges
8. `vitest` - 184 edges
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

## Communities (206 total, 29 thin omitted)

### Community 0 - "LinkButton"
Cohesion: 0.07
Nodes (60): BooksContext, Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href(), Portal2307() (+52 more)

### Community 1 - "money.ts"
Cohesion: 0.11
Nodes (28): PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview(), peso(), ReadItem, DraftIssue, draftSchema (+20 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (43): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+35 more)

### Community 4 - "public.ts"
Cohesion: 0.09
Nodes (37): dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase (+29 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.09
Nodes (36): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+28 more)

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

### Community 11 - "form-1601c.ts"
Cohesion: 0.12
Nodes (30): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+22 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (82): GET(), Content(), PortalNotificationSettingsPage(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged() (+74 more)

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
Cohesion: 0.07
Nodes (49): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), CASH_FLOW_CLASSES, defaultCashFlow(), codes (+41 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.11
Nodes (60): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+52 more)

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
Cohesion: 0.08
Nodes (40): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+32 more)

### Community 42 - "compare.ts"
Cohesion: 0.07
Nodes (53): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+45 more)

### Community 43 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (32): exceljs, entry(), P(), cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS (+24 more)

### Community 44 - "link-button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 45 - "review-form.tsx"
Cohesion: 0.12
Nodes (19): Booking, DirectoryParty, ENTRY_STATUS, fmtDay(), fmtMonthOf(), ONLY_FOR, typeLabel, PendingTaxCodes (+11 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.07
Nodes (73): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+65 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (32): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+24 more)

### Community 48 - "form.tsx"
Cohesion: 0.13
Nodes (36): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+28 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.13
Nodes (32): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+24 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.15
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 52 - "requireStaff"
Cohesion: 0.09
Nodes (65): EmployerCard(), RemittancesDue(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS (+57 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (46): maxDuration, POST(), SPREADSHEET_TYPES, ClaimedNotification, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS (+38 more)

### Community 54 - "formatAmount"
Cohesion: 0.13
Nodes (43): booksContext(), booksViewFor(), fmtDate(), fmtMonth(), one(), BooksFrame(), BooksList(), CustomersRoute() (+35 more)

### Community 55 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 56 - "fields.ts"
Cohesion: 0.13
Nodes (20): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+12 more)

### Community 57 - "marketing/page.tsx"
Cohesion: 0.14
Nodes (18): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+10 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (67): ATC_MASTER, AtcInfo, lookupAtc(), client, row(), VatData, payslipSchedule(), agentBackground() (+59 more)

### Community 59 - "registrations/forms.tsx"
Cohesion: 0.07
Nodes (59): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+51 more)

### Community 60 - "portal/page.tsx"
Cohesion: 0.08
Nodes (44): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+36 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.13
Nodes (24): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+16 more)

### Community 62 - "work/load.ts"
Cohesion: 0.18
Nodes (16): loadAssets(), Risk, lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.15
Nodes (22): BooksLockBar(), ICON, LockBarFor(), MonthLock(), LockContext, BooksMonthsPage(), Months(), one() (+14 more)

### Community 64 - "ref_node_path"
Cohesion: 0.08
Nodes (9): outDir, pkgDir, require, { version }, ctx, input, root, root (+1 more)

### Community 65 - "invoice-pages.tsx"
Cohesion: 0.09
Nodes (43): SearchParams, INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PaymentsNewPage() (+35 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.09
Nodes (46): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+38 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.17
Nodes (17): COMPLEXITY_LABEL, Lines(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), complexity(), count() (+9 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (26): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+18 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (41): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+33 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.10
Nodes (34): NewEmployee(), NewEmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release() (+26 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.12
Nodes (51): incomeAttachments(), Periods, buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv(), sawtDat() (+43 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (38): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+30 more)

### Community 77 - "react"
Cohesion: 0.06
Nodes (46): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+38 more)

### Community 78 - "app/layout.tsx"
Cohesion: 0.09
Nodes (32): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+24 more)

### Community 79 - "vitest"
Cohesion: 0.05
Nodes (13): pg, vitest, root, root, root, root, root, root (+5 more)

### Community 80 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.15
Nodes (30): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+22 more)

### Community 82 - "ledger/data.ts"
Cohesion: 0.15
Nodes (20): Released, accountFromRow(), Amendment, AmendmentStatus, bookEntryFromRow(), BooksClient, BooksMonth, cents() (+12 more)

### Community 83 - "notification.tsx"
Cohesion: 0.06
Nodes (37): AvatarColor, AvatarProps, AvatarSize, styles, ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles (+29 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "module-pages.tsx"
Cohesion: 0.11
Nodes (25): Column, ListRow, RowLink(), BOOK_NOTES, dayBefore(), INVOICE_LABEL, Props, SettingsPage() (+17 more)

### Community 86 - "Notice"
Cohesion: 0.08
Nodes (78): BatchUpload(), AccountForm(), AmendmentRequestForm(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), ReleaseReportForm(), SetupForm() (+70 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (65): Detail(), PortalStatementDetail(), PortalClient, portalContext(), Content(), PortalNotificationsPage(), Portal2316(), Portal2316Page() (+57 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "register/page.tsx"
Cohesion: 0.10
Nodes (40): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+32 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (24): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+16 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 93 - "Centavos"
Cohesion: 0.07
Nodes (60): AlphaCols, AlphalistRow, Certificates2316, certificatesFromRaw(), form2316(), Form2316Data, Form2316Employer, Form2316Line (+52 more)

### Community 94 - "manilaToday"
Cohesion: 0.08
Nodes (54): RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks() (+46 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "tools/page.tsx"
Cohesion: 0.17
Nodes (22): AmendmentDecision(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload(), PermitForm() (+14 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+39 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.07
Nodes (41): Access, STATUS, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, CheckedOpening (+33 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.06
Nodes (53): react-aria-components, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, animateTag(), ComboBox() (+45 more)

### Community 103 - "rates.ts"
Cohesion: 0.27
Nodes (13): AmountRate, CorporateRate, IncomeTaxTable, percentageTaxNonbankRate(), percentageTaxRate(), PercentRate, pickEffective(), RateEntry (+5 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "dropdown.tsx"
Cohesion: 0.09
Nodes (35): SheetPreview(), Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem() (+27 more)

### Community 106 - "supabaseServer"
Cohesion: 0.05
Nodes (85): addClientNoteAction(), addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), peso (+77 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (49): FilingRow, FilingListRow, SignOffState, bookKind, BookRow, bookStatus, Event, eventText (+41 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (28): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+20 more)

### Community 109 - "client"
Cohesion: 0.08
Nodes (14): BOOK_LOCK_FORMS, as(), client(), root, send(), as(), purchase(), root (+6 more)

### Community 110 - "index.ts"
Cohesion: 0.04
Nodes (30): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+22 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (56): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+48 more)

### Community 113 - "documents/[id]/page.tsx"
Cohesion: 0.07
Nodes (60): @remixicon/react, DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, deleteBundleInvoiceAction(), AddBundleInvoice() (+52 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.09
Nodes (50): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+42 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (34): GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches(), Interval (+26 more)

### Community 118 - "calendar/actions.ts"
Cohesion: 0.21
Nodes (16): cancelMeetingAction(), FormState, cancelMyMeetingAction(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail() (+8 more)

### Community 119 - "quote.ts"
Cohesion: 0.07
Nodes (57): PriceRow, EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), has() (+49 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.10
Nodes (39): FinancialStatements, normalizeAtc(), withNonDeductible(), dayBefore(), FilingRow, listInvoices(), loadEwtRemittances(), loadEwtYear() (+31 more)

### Community 121 - "leads/forms.tsx"
Cohesion: 0.11
Nodes (43): assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+35 more)

### Community 122 - "ref_node_fs"
Cohesion: 0.06
Nodes (19): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+11 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "Badge"
Cohesion: 0.12
Nodes (33): PreviewTable(), BrandSettings(), GrossReceiptsCard(), Billing(), PortalBilling(), statementHref(), Detail(), PayNow() (+25 more)

### Community 126 - "structured-data.ts"
Cohesion: 0.14
Nodes (20): robots(), metadata, sitemap(), SiteBrand, BRAND_NAME, QUOTE_LABEL, SITE_URL, siteUrl() (+12 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (48): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList(), Row (+40 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (78): RFC-4180, geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES (+70 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (51): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+43 more)

### Community 131 - "2316/page.tsx"
Cohesion: 0.42
Nodes (7): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Form2316Set(), Form2316Sheet(), load2316()

### Community 132 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (43): MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+35 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (18): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), Row, accumulated() (+10 more)

### Community 135 - "chrome.tsx"
Cohesion: 0.18
Nodes (19): GlobalNotFound(), metadata, SiteLayout(), SiteNotFound(), HomePage(), SiteDocument(), ButtonLink(), Lockup() (+11 more)

### Community 136 - "cwt-forms.tsx"
Cohesion: 0.57
Nodes (5): Rematch2307Button(), CwtActionState, markCwtFollowedUp(), rematch2307(), trackerPath()

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 139 - "pending-review.tsx"
Cohesion: 0.10
Nodes (32): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Codes (+24 more)

### Community 140 - "server.ts"
Cohesion: 0.16
Nodes (24): RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, Row, Content() (+16 more)

### Community 141 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 142 - "workpapers/page.tsx"
Cohesion: 0.06
Nodes (65): ExplainForm(), amt(), one(), shiftMonth(), SignStatus(), STATUS, TieRow(), Workpapers() (+57 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.11
Nodes (27): isWeekend(), line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board (+19 more)

### Community 144 - "transactions-actions.ts"
Cohesion: 0.25
Nodes (16): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+8 more)

### Community 145 - "parallel-run.tsx"
Cohesion: 0.15
Nodes (22): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), Parties(), PartyRow() (+14 more)

### Community 146 - "supabaseAdmin"
Cohesion: 0.11
Nodes (39): server-only, @supabase/supabase-js, GET(), GET(), GET(), MonthComplete(), SentRow, TimelineRow (+31 more)

### Community 147 - "items.ts"
Cohesion: 0.19
Nodes (13): PayrollSetupPage(), Setup(), loadPayrollSettings(), BirCategory, CATEGORIES, Category, CATEGORY_KEYS, DEDUCTION_FIELDS (+5 more)

### Community 148 - "blocks.tsx"
Cohesion: 0.14
Nodes (20): FLOW_ICONS, GROUP_SPAN, metadata, metadata, BreadcrumbItem(), Crumb, Crumbs(), H1 (+12 more)

### Community 149 - "FormModule"
Cohesion: 0.15
Nodes (10): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, LoadedWorksheet (+2 more)

### Community 150 - "[slug]/page.tsx"
Cohesion: 0.14
Nodes (28): AboutPage(), HOW, metadata, BRING, ContactList(), ContactPage(), metadata, FaqPage() (+20 more)

### Community 151 - "portal/requests/page.tsx"
Cohesion: 0.83
Nodes (3): PortalRequests(), Requests(), when()

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "review-forms.tsx"
Cohesion: 0.23
Nodes (13): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), Msg() (+5 more)

### Community 154 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm()

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (27): ApprovedReview(), ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths() (+19 more)

### Community 156 - "proof-upload.tsx"
Cohesion: 0.35
Nodes (8): ReplyForm(), METHODS, ProofUpload(), send(), ProofState, startProofUpload(), submitProof(), shrinkImage()

### Community 157 - "template.ts"
Cohesion: 0.11
Nodes (20): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS (+12 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (47): NotesCard(), BookingLink(), ReopenForm(), bookedTime, Lead(), LeadPage(), LeadSource(), LeadTouch (+39 more)

### Community 159 - "app/page.tsx"
Cohesion: 0.09
Nodes (40): loadLockContext(), FilingTable(), OwnerSections(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary() (+32 more)

### Community 160 - "PageHeader"
Cohesion: 0.09
Nodes (53): ClientList(), ClientsPage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey (+45 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.20
Nodes (21): disconnectCalendarAction(), DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton() (+13 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 164 - "book-income.ts"
Cohesion: 0.27
Nodes (9): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, NonDeductibleRow (+1 more)

### Community 165 - "worksheet/page.tsx"
Cohesion: 0.36
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 166 - "books-ready.ts"
Cohesion: 0.40
Nodes (7): filingsBooksReady(), isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked(), booksReadyMap(), keepBooksReady()

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "deadlines/actions.ts"
Cohesion: 0.42
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 169 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 170 - "clients/actions.ts"
Cohesion: 0.07
Nodes (56): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+48 more)

### Community 171 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.07
Nodes (52): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+44 more)

### Community 173 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 174 - "cx"
Cohesion: 0.05
Nodes (61): ApprovedRow, NotificationFilterTabs(), NotificationRowData, CounterColor, CounterProps, styles, StatusDot(), StatusDotColor (+53 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "safeguards-load.ts"
Cohesion: 0.23
Nodes (11): SafeguardsNotice(), CoverageClient, coverageGaps(), Gap, GapKind, FilingRow, holidaySet(), loadBoard() (+3 more)

### Community 178 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 180 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 181 - "register-xlsx.ts"
Cohesion: 0.13
Nodes (26): file(), GET(), safe(), PayrollDocument(), ReadPayrollButton(), employeesForMonth(), buildEmployeeTemplate(), sortItems() (+18 more)

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "next"
Cohesion: 0.09
Nodes (26): nextConfig, next, zod, postPayrollAction(), PostState, PostPayrollButton(), GET(), GET() (+18 more)

### Community 186 - "site-document.tsx"
Cohesion: 0.18
Nodes (7): inter, metadata, montserrat, geist, geistMono, montserrat, themeScript

### Community 189 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 190 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 193 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 195 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 196 - "site/brand.ts"
Cohesion: 0.33
Nodes (8): metadata, QuotesClosed(), Start(), StartPage(), funnelLive(), clean(), FALLBACK_BRAND, phoneLinks()

### Community 198 - "binder/page.tsx"
Cohesion: 0.38
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, PrintButton()

### Community 201 - "layout.ts"
Cohesion: 0.10
Nodes (26): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+18 more)

### Community 202 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1575 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `LinkButton`, `ui.ts`, `public.ts`, `package.json`, `onboarding/page.tsx`, `notification-bell.tsx`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `review-form.tsx`, `payroll/forms.tsx`, `form.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `requireStaff`, `webhook.ts`, `formatAmount`, `deadlines/page.tsx`, `marketing/page.tsx`, `registrations/forms.tsx`, `portal/page.tsx`, `books/export/route.ts`, `lock-bar.tsx`, `invoice-pages.tsx`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `payroll/data.ts`, `react`, `app/layout.tsx`, `ledger/data.ts`, `module-pages.tsx`, `portal/reports/page.tsx`, `register/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `manilaToday`, `tools/page.tsx`, `ledger/books.ts`, `ledger/types.ts`, `supabaseServer`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `documents/[id]/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `calendar/actions.ts`, `leads/forms.tsx`, `batch/register.ts`, `Badge`, `structured-data.ts`, `parties/[id]/page.tsx`, `return-file-actions.ts`, `2316/page.tsx`, `move-bar.tsx`, `fixed-assets/page.tsx`, `chrome.tsx`, `cwt-forms.tsx`, `pending-review.tsx`, `server.ts`, `idle-watcher.tsx`, `workpapers/page.tsx`, `transactions-actions.ts`, `parallel-run.tsx`, `supabaseAdmin`, `blocks.tsx`, `[slug]/page.tsx`, `portal/requests/page.tsx`, `review-forms.tsx`, `fixed-assets/forms.tsx`, `app/documents/page.tsx`, `proof-upload.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `PageHeader`, `calendar/page.tsx`, `proposal-view.tsx`, `worksheet/page.tsx`, `opengraph-image.tsx`, `deadlines/actions.ts`, `clients/actions.ts`, `app/settings/page.tsx`, `cx`, `register-xlsx.ts`, `site-document.tsx`, `site/brand.ts`, `binder/page.tsx`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LinkButton` be split into smaller, more focused modules?**
  _Cohesion score 0.07243243243243243 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `LinkButton`, `money.ts`, `ui.ts`, `public.ts`, `package.json`, `onboarding/page.tsx`, `notification-bell.tsx`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `link-button.tsx`, `review-form.tsx`, `payroll/forms.tsx`, `modal.tsx`, `form.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `requireStaff`, `formatAmount`, `deadlines/page.tsx`, `marketing/page.tsx`, `registrations/forms.tsx`, `portal/page.tsx`, `lock-bar.tsx`, `invoice-pages.tsx`, `quote/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `app/layout.tsx`, `how-we-work/page.tsx`, `notification.tsx`, `module-pages.tsx`, `Notice`, `portal/reports/page.tsx`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `tools/page.tsx`, `ledger/books.ts`, `combobox.tsx`, `dropdown.tsx`, `supabaseServer`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `profile.ts`, `documents/[id]/page.tsx`, `year-end/page.tsx`, `[clientId]/page.tsx`, `leads/forms.tsx`, `batch/register.ts`, `Badge`, `structured-data.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `return-file-actions.ts`, `2316/page.tsx`, `move-bar.tsx`, `fixed-assets/page.tsx`, `chrome.tsx`, `cwt-forms.tsx`, `theme-toggle.tsx`, `pending-review.tsx`, `server.ts`, `idle-watcher.tsx`, `workpapers/page.tsx`, `parallel-run.tsx`, `supabaseAdmin`, `items.ts`, `blocks.tsx`, `[slug]/page.tsx`, `portal/requests/page.tsx`, `review-forms.tsx`, `fixed-assets/forms.tsx`, `app/documents/page.tsx`, `proof-upload.tsx`, `leads/[id]/page.tsx`, `app/page.tsx`, `PageHeader`, `calendar/page.tsx`, `proposal-view.tsx`, `worksheet/page.tsx`, `deadlines/actions.ts`, `filters.tsx`, `clients/actions.ts`, `app/settings/page.tsx`, `cx`, `next`, `site-document.tsx`, `file-upload.tsx`, `site/brand.ts`, `binder/page.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Should `money.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10588235294117647 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `LinkButton`, `money.ts`, `ui.ts`, `public.ts`, `package.json`, `onboarding/page.tsx`, `notification-bell.tsx`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `payroll/payroll.test.ts`, `payroll/forms.tsx`, `form.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `requireStaff`, `webhook.ts`, `deadlines/page.tsx`, `fields.ts`, `returns/types.ts`, `registrations/forms.tsx`, `portal/page.tsx`, `books/export/route.ts`, `lock-bar.tsx`, `ref_node_path`, `engine.ts`, `testing.ts`, `quote/page.tsx`, `payroll/data.ts`, `app/layout.tsx`, `status.ts`, `module-pages.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `Centavos`, `manilaToday`, `names.ts`, `ledger/books.ts`, `ledger/types.ts`, `rates.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `client`, `index.ts`, `profile.ts`, `year-end/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `calendar/actions.ts`, `quote.ts`, `returns/load.ts`, `leads/forms.tsx`, `ref_node_fs`, `batch/register.ts`, `structured-data.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `move-bar.tsx`, `ocr/run.ts`, `fixed-assets/page.tsx`, `ticked-allocation.test.ts`, `pending-review.tsx`, `idle-watcher.tsx`, `workpapers/page.tsx`, `safeguards.ts`, `supabaseAdmin`, `ledger.test.ts`, `app/documents/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `app/page.tsx`, `PageHeader`, `calendar/page.tsx`, `books-ready.ts`, `filters.tsx`, `clients/actions.ts`, `app/settings/page.tsx`, `books-2307.test.ts`, `acting-approver.test.ts`, `safeguards-load.ts`, `notifications.test.ts`, `bir-filing-calendar/page.tsx`, `returns-books.test.ts`, `lead-attribution.test.ts`, `approve-and-post.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `next`, `batch-row-images.test.ts`, `contribution-payables.test.ts`, `parallel-run.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `layout.ts`, `split-bundled-pdfs.test.ts`, `telegram-uploads.test.ts`, `fees.test.ts`, `portal-home.test.ts`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._