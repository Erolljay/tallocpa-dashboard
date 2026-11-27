# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1011 files · ~840,320 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6209 nodes · 22156 edges · 207 communities (177 shown, 30 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 194 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `0dee52f3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- fees/types.ts
- devDependencies
- auth.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/[id]/page.tsx
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
- returns/types.ts
- documents/actions.ts
- payroll/payroll.test.ts
- modal.tsx
- site-document.tsx
- scripts
- supabaseAdmin
- staff/page.tsx
- sign-off-actions.tsx
- webhook.ts
- module-pages.tsx
- formatAmount
- LinkButton
- proposal-view.tsx
- returns/load.ts
- steps.ts
- calendar/page.tsx
- ledger/data.ts
- board.ts
- Card
- workpapers/page.tsx
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
- @remixicon/react
- ref_node_path
- ocr/run.ts
- how-we-work/page.tsx
- registrations/[id]/page.tsx
- cx.ts
- Pro components
- showDate
- Notice
- blocks.tsx
- portal-billing.test.ts
- [id]/books/page.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- workpapers/load.ts
- requireStaff
- Recipes
- [employeeId]/page.tsx
- BoardUI theming reference
- Pro templates
- showMonth
- Centavos
- ledger/types.ts
- combobox.tsx
- rates.ts
- boardui
- layout.ts
- react
- pg
- leads/[id]/page.tsx
- button.tsx
- returns/books.test.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- lib/books/actions.ts
- [clientId]/page.tsx
- site/brand.ts
- apply-migrations.sh
- quote/page.tsx
- quote.ts
- cancel-server.ts
- notes.ts
- review-queue.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- filings/[id]/page.tsx
- leads-pipeline.test.ts
- holiday-list.ts
- read.test.ts
- social-button.tsx
- env.ts
- app/settings/page.tsx
- proof-upload.tsx
- gemini.ts
- work/load.ts
- items.ts
- clients/[id]/page.tsx
- ticked-allocation.test.ts
- idle-watcher.tsx
- opening.ts
- employees-xlsx.ts
- payroll/forms.tsx
- upload/page.tsx
- safeguards.ts
- tools/page.tsx
- return-file-actions.ts
- server-only
- register-xlsx.ts
- template.ts
- cycle/page.tsx
- [slug]/page.tsx
- seed.ts
- ledger.test.ts
- notification-bell.tsx
- deadlines/dates.ts
- move-bar.tsx
- morning.ts
- register/page.tsx
- auth-templates.ts
- onboarding/page.tsx
- fixed-assets/forms.tsx
- Rework: one flow from lead to year-end
- calendar/staff.ts
- month.ts
- app/documents/page.tsx
- package.json
- workpapers.test.ts
- opengraph-image.tsx
- cx
- getIdentity
- deadlines/actions.ts
- BoardUI page patterns
- supabaseServer
- ocr/dates.ts
- digest.ts
- acting-approver.test.ts
- names.ts
- ref_node_fs
- generate-qap-fixture.mjs
- contact-access.test.ts
- bir-filing-calendar/page.tsx
- late-surcharges.test.ts
- returns-sign-off.test.ts
- contribution-remittances.test.ts
- defer-documents.test.ts
- tests/proposal-email.test.ts
- books-2307.test.ts
- funnel.test.ts
- notifications.test.ts
- parallel-run.test.ts
- telegram-uploads.test.ts
- books-migration.test.ts
- eslint.config.mjs
- ledger-closing.test.ts
- tests/books.test.ts
- fees.test.ts
- fixed-assets.test.ts
- lock-by-return-type.test.ts
- vitest
- batch-row-images.test.ts
- review-form.tsx
- adjustments.test.ts
- books-lock.test.ts
- db.test.ts
- templates/README.md
- portal-reports.test.ts

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

## Communities (207 total, 30 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (55): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page() (+47 more)

### Community 1 - "index.ts"
Cohesion: 0.04
Nodes (32): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+24 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.10
Nodes (30): fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, PickOption, SettlementInput, taxOn(), allocateOldestFirst() (+22 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.08
Nodes (35): dateFmt, statusLabel, statusTone, Supabase, acceptProposalAction(), AcceptState, instantView(), conditionsSchema (+27 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19 (+7 more)

### Community 6 - "auth.ts"
Cohesion: 0.07
Nodes (61): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+53 more)

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

### Community 11 - "documents/[id]/page.tsx"
Cohesion: 0.08
Nodes (49): Doc, ExceptionRow, addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage() (+41 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "Badge"
Cohesion: 0.07
Nodes (59): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), ClientList(), ClientsPage() (+51 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0, server-only@^0.0.1 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (46): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), defaultCashFlow(), codes, PNL (+38 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (73): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), annualAttachments(), balanceSheet(), compute1701() (+65 more)

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
Cohesion: 0.09
Nodes (38): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+30 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (53): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+45 more)

### Community 43 - "toCentavos"
Cohesion: 0.11
Nodes (27): PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview(), peso(), ReadItem, DraftIssue, draftSchema (+19 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.06
Nodes (60): branchOfTin(), payeeKeyOf(), tinDigits(), tinHasBranch(), incomePayment(), agentBackground(), agentErrors(), atcSchedule() (+52 more)

### Community 45 - "documents/actions.ts"
Cohesion: 0.20
Nodes (17): AttachBatchImage(), attach(), DocumentUpload(), send(), upload(), Item, typeFromName(), ALLOWED (+9 more)

### Community 46 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (53): MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat() (+45 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (46): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), SearchHit, SearchKind (+38 more)

### Community 48 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (32): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), CancelState, BookingState (+24 more)

### Community 51 - "staff/page.tsx"
Cohesion: 0.15
Nodes (17): AddBranchForm(), BranchRowForm(), Branches(), BranchesPage(), FormState, BranchOption, BranchOptions(), InviteStaffForm() (+9 more)

### Community 52 - "sign-off-actions.tsx"
Cohesion: 0.15
Nodes (15): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+7 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (47): maxDuration, POST(), fitsDocType(), TelegramEnv, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS (+39 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.08
Nodes (39): BankAccountsRoute(), BooksList(), Column, ListRow, RowLink(), EmployeesRoute(), BankAccounts(), BOOK_NOTES (+31 more)

### Community 55 - "formatAmount"
Cohesion: 0.11
Nodes (32): Batch(), BatchPage(), one(), toCentavos(), ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs() (+24 more)

### Community 56 - "LinkButton"
Cohesion: 0.09
Nodes (46): fmtDate(), InvoiceFormValue, INVOICE_KINDS, InvoiceView(), Kind, Props, STATUS_TONE, NewEntry() (+38 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.07
Nodes (54): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+46 more)

### Community 59 - "steps.ts"
Cohesion: 0.05
Nodes (83): cancelRegistrationAction(), ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+75 more)

### Community 60 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (18): FormState, DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant() (+10 more)

### Community 61 - "ledger/data.ts"
Cohesion: 0.09
Nodes (36): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+28 more)

### Community 62 - "board.ts"
Cohesion: 0.10
Nodes (25): StepProgress(), StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS, fiveSteps() (+17 more)

### Community 63 - "Card"
Cohesion: 0.05
Nodes (87): ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months(), one() (+79 more)

### Community 64 - "workpapers/page.tsx"
Cohesion: 0.13
Nodes (27): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+19 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (60): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+52 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.10
Nodes (40): Rule, compareIso(), IsoDate, DeadlineRule, DueRule, EfpsGroup, FilingChannel, FilingInstance (+32 more)

### Community 68 - "testing.ts"
Cohesion: 0.17
Nodes (19): year, BUSINESS_TAX_FORMS, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (31): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+23 more)

### Community 70 - "portalContext"
Cohesion: 0.07
Nodes (73): PortalClient, portalContext, Content(), PortalNotificationsPage(), Portal2316(), Portal2316Page(), Books(), PortalBooks() (+65 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (43): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+35 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.07
Nodes (58): GridRow, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+50 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.12
Nodes (41): SaleSplit, tin9(), tinDashed(), Periods, invoiceLabel(), sawtAnnualAttachments(), SawtAnnualForm, sawtAttachments() (+33 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 78 - "@remixicon/react"
Cohesion: 0.06
Nodes (52): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+44 more)

### Community 79 - "ref_node_path"
Cohesion: 0.07
Nodes (9): outDir, pkgDir, require, { version }, root, root, root, root (+1 more)

### Community 80 - "ocr/run.ts"
Cohesion: 0.07
Nodes (55): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), fmtDate(), PartyDetail(), PartyPage(), pdfPageCount() (+47 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.18
Nodes (27): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+19 more)

### Community 82 - "registrations/[id]/page.tsx"
Cohesion: 0.10
Nodes (46): addStepFile(), completeRegistrationAction(), removeStepFile(), startStepFileUpload(), CompleteButton(), StepBadge(), StepForm(), StepRow (+38 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (65): react-dom@19.3.0, react-dom, AvatarColor, AvatarProps, AvatarSize, styles, CHIP_COLORS, ChipProps (+57 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "showDate"
Cohesion: 0.09
Nodes (64): EmployerCard(), MonthRemittances(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS (+56 more)

### Community 86 - "Notice"
Cohesion: 0.05
Nodes (116): setupMissingChartsAction(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+108 more)

### Community 87 - "blocks.tsx"
Cohesion: 0.12
Nodes (31): BRING, ContactList(), ContactPage(), metadata, FLOW_ICONS, GROUP_SPAN, HomePage(), metadata (+23 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "[id]/books/page.tsx"
Cohesion: 0.13
Nodes (34): booksContext(), booksViewFor(), fmtMonth(), one(), SearchParams, BooksFrame(), WithdrawReportButton(), BooksLockBar() (+26 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.10
Nodes (31): metadata, QuotesClosed(), Start(), StartPage(), Checkbox(), SelectItem(), AttributionKeeper(), noop() (+23 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (28): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+20 more)

### Community 93 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (22): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+14 more)

### Community 94 - "requireStaff"
Cohesion: 0.08
Nodes (57): setIncomeTaxMethodAction(), refresh(), removeClientFileAction(), tickOnboardingAction(), setPresetAccountAction(), RequestDetail(), RequestPage(), TaskDetail() (+49 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "[employeeId]/page.tsx"
Cohesion: 0.39
Nodes (7): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), loadPriorEmployers(), payAccountsOf(), displayName()

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "showMonth"
Cohesion: 0.13
Nodes (31): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, advanceFilingAction() (+23 more)

### Community 100 - "Centavos"
Cohesion: 0.05
Nodes (63): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+55 more)

### Community 101 - "ledger/types.ts"
Cohesion: 0.14
Nodes (21): Access, STATUS, CASH_FLOW_CLASSES, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut (+13 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (76): react-aria-components, SheetPreview(), ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps (+68 more)

### Community 103 - "rates.ts"
Cohesion: 0.24
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+10 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "layout.ts"
Cohesion: 0.19
Nodes (15): cycleMessage(), dayFmt, showDay(), bodyBlocks(), EmailAction, escapeHtml(), fullBrand(), linkify() (+7 more)

### Community 106 - "react"
Cohesion: 0.11
Nodes (23): react, CustomersRoute(), InvoiceEdit(), InvoiceList(), JournalEntryRoute(), JournalRoute(), ReportsIndex(), PartyList() (+15 more)

### Community 107 - "pg"
Cohesion: 0.07
Nodes (10): pg, root, LEAD, LinkRow, ReportRow, root, root, root (+2 more)

### Community 108 - "leads/[id]/page.tsx"
Cohesion: 0.06
Nodes (69): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+61 more)

### Community 109 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 110 - "returns/books.test.ts"
Cohesion: 0.08
Nodes (25): client, row(), form1701, form1702RT, form1701Q, form1702Q, form2551Q, form2550Q (+17 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (35): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+27 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.05
Nodes (72): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+64 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.12
Nodes (36): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+28 more)

### Community 116 - "site/brand.ts"
Cohesion: 0.16
Nodes (19): robots(), sitemap(), clean(), FALLBACK_BRAND, SiteBrand, BRAND_NAME, siteUrl(), TAGLINE (+11 more)

### Community 118 - "quote/page.tsx"
Cohesion: 0.16
Nodes (19): loadSchedules(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+11 more)

### Community 119 - "quote.ts"
Cohesion: 0.09
Nodes (44): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+36 more)

### Community 120 - "cancel-server.ts"
Cohesion: 0.22
Nodes (15): cancelMeetingAction(), cancelMyMeetingAction(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail(), manilaWhen() (+7 more)

### Community 121 - "notes.ts"
Cohesion: 0.13
Nodes (20): NotesCard(), ICON, NotesTimeline(), when, acceptedQuote(), canonicalContent(), defaultTerms(), ProposalContent (+12 more)

### Community 122 - "review-queue.ts"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "filings/[id]/page.tsx"
Cohesion: 0.05
Nodes (68): FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText, Filing() (+60 more)

### Community 126 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 127 - "holiday-list.ts"
Cohesion: 0.16
Nodes (16): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+8 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (74): applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), ITEM_KINDS, amountOf() (+66 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.09
Nodes (29): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+21 more)

### Community 130 - "env.ts"
Cohesion: 0.11
Nodes (35): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, esubmissionMailEnv(), DatFiles, datFiles(), Db (+27 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.26
Nodes (12): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote(), SettingsPage(), describeDue() (+4 more)

### Community 132 - "proof-upload.tsx"
Cohesion: 0.48
Nodes (6): METHODS, ProofUpload(), send(), startProofUpload(), submitProof(), ProofMethod

### Community 133 - "gemini.ts"
Cohesion: 0.06
Nodes (35): MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), ReadPlan, SPLIT_DOC_TYPES (+27 more)

### Community 134 - "work/load.ts"
Cohesion: 0.12
Nodes (27): loadAssets(), Row, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor(), monthIndex() (+19 more)

### Community 135 - "items.ts"
Cohesion: 0.12
Nodes (21): Release2316Form(), PayrollSetupPage(), Setup(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release() (+13 more)

### Community 136 - "clients/[id]/page.tsx"
Cohesion: 0.07
Nodes (54): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), updateClientAction(), ClientForm() (+46 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 139 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 140 - "employees-xlsx.ts"
Cohesion: 0.12
Nodes (19): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+11 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (62): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+54 more)

### Community 142 - "upload/page.tsx"
Cohesion: 0.22
Nodes (16): Content(), NotificationSettingsPage(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), TelegramLinkButton() (+8 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.11
Nodes (28): Gap, board, MARCO, none, RHEA, row(), steps, documentCutoff() (+20 more)

### Community 144 - "tools/page.tsx"
Cohesion: 0.20
Nodes (18): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), RepostRegisterButton(), ReverseForm(), OpeningChecklist() (+10 more)

### Community 145 - "return-file-actions.ts"
Cohesion: 0.25
Nodes (17): file(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction() (+9 more)

### Community 146 - "server-only"
Cohesion: 0.08
Nodes (44): server-only, @supabase/supabase-js, GET(), GET(), MonthComplete(), SentRow, StandingRow, TimelineRow (+36 more)

### Community 147 - "register-xlsx.ts"
Cohesion: 0.11
Nodes (30): RFC-4180, GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), PayrollItem, draftToTemplate(), filled() (+22 more)

### Community 148 - "template.ts"
Cohesion: 0.07
Nodes (31): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, jobField, ProposalJob (+23 more)

### Community 149 - "cycle/page.tsx"
Cohesion: 0.23
Nodes (12): Cycle(), CyclePage(), CycleWithClient, DocRow, CycleRow, EXCEPTION_DECISIONS, ExceptionDecision, parseMonth() (+4 more)

### Community 150 - "[slug]/page.tsx"
Cohesion: 0.12
Nodes (33): AboutPage(), HOW, metadata, FaqPage(), metadata, metadata, Part(), PrivacyPage() (+25 more)

### Community 151 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "notification-bell.tsx"
Cohesion: 0.04
Nodes (96): GET(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus(), onVisible() (+88 more)

### Community 154 - "deadlines/dates.ts"
Cohesion: 0.31
Nodes (12): shift(), addMonths(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), ymd(), periodsBetween() (+4 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.26
Nodes (14): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+6 more)

### Community 156 - "morning.ts"
Cohesion: 0.32
Nodes (10): GET(), Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+2 more)

### Community 157 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 158 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.13
Nodes (25): addClientFile(), KINDS, OnboardingState, startClientFileUpload(), ClientFileForm(), send(), RemoveFileButton(), TickForm() (+17 more)

### Community 160 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (38): disconnectCalendarAction(), GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches() (+30 more)

### Community 163 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 164 - "app/documents/page.tsx"
Cohesion: 0.09
Nodes (35): ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths(), Documents() (+27 more)

### Community 165 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @types/node@^20, typescript@^5, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 166 - "workpapers.test.ts"
Cohesion: 0.12
Nodes (11): RegisterRow, base, books, buy, sale, approved(), as(), root (+3 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "cx"
Cohesion: 0.08
Nodes (34): switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps (+26 more)

### Community 169 - "getIdentity"
Cohesion: 0.12
Nodes (35): PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), uploadRequestFile(), ReturnStandingForm(), StandingUpload() (+27 more)

### Community 170 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 171 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 172 - "supabaseServer"
Cohesion: 0.04
Nodes (92): nextConfig, zod@^4.6.7, next, zod, setClientStatusAction(), addClientNoteAction(), addChargeAction(), applyCreditAction() (+84 more)

### Community 173 - "ocr/dates.ts"
Cohesion: 0.43
Nodes (6): dateFarFromMonth(), iso(), month(), MONTHS, parsePrintedDate(), year()

### Community 174 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 177 - "ref_node_fs"
Cohesion: 0.07
Nodes (8): ctx, input, root, root, Part, root, root, root

### Community 178 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 180 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 182 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 186 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 187 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 189 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 191 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 193 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 194 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 196 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 198 - "vitest"
Cohesion: 0.08
Nodes (9): vitest, dir, root, MONTHS, root, root, Row, root (+1 more)

### Community 200 - "review-form.tsx"
Cohesion: 0.06
Nodes (60): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+52 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1641 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `ui.ts`, `fees/types.ts`, `devDependencies`, `auth.ts`, `Badge`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `returns/types.ts`, `payroll/payroll.test.ts`, `supabaseAdmin`, `staff/page.tsx`, `webhook.ts`, `module-pages.tsx`, `returns/load.ts`, `steps.ts`, `calendar/page.tsx`, `ledger/data.ts`, `board.ts`, `Card`, `workpapers/page.tsx`, `marketing/page.tsx`, `engine.ts`, `testing.ts`, `fees/[id]/page.tsx`, `portalContext`, `payroll/data.ts`, `status.ts`, `@remixicon/react`, `ref_node_path`, `ocr/run.ts`, `showDate`, `portal-billing.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `workpapers/load.ts`, `requireStaff`, `Centavos`, `ledger/types.ts`, `rates.ts`, `layout.ts`, `pg`, `leads/[id]/page.tsx`, `returns/books.test.ts`, `profile.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `site/brand.ts`, `quote/page.tsx`, `quote.ts`, `cancel-server.ts`, `notes.ts`, `review-queue.ts`, `batch/register.ts`, `leads-pipeline.test.ts`, `holiday-list.ts`, `read.test.ts`, `social-button.tsx`, `env.ts`, `app/settings/page.tsx`, `gemini.ts`, `work/load.ts`, `clients/[id]/page.tsx`, `ticked-allocation.test.ts`, `idle-watcher.tsx`, `opening.ts`, `payroll/forms.tsx`, `safeguards.ts`, `server-only`, `template.ts`, `cycle/page.tsx`, `ledger.test.ts`, `notification-bell.tsx`, `deadlines/dates.ts`, `move-bar.tsx`, `register/page.tsx`, `onboarding/page.tsx`, `calendar/staff.ts`, `month.ts`, `app/documents/page.tsx`, `package.json`, `workpapers.test.ts`, `getIdentity`, `ocr/dates.ts`, `digest.ts`, `acting-approver.test.ts`, `names.ts`, `ref_node_fs`, `contact-access.test.ts`, `bir-filing-calendar/page.tsx`, `late-surcharges.test.ts`, `returns-sign-off.test.ts`, `contribution-remittances.test.ts`, `defer-documents.test.ts`, `tests/proposal-email.test.ts`, `books-2307.test.ts`, `funnel.test.ts`, `notifications.test.ts`, `parallel-run.test.ts`, `telegram-uploads.test.ts`, `books-migration.test.ts`, `ledger-closing.test.ts`, `tests/books.test.ts`, `fees.test.ts`, `fixed-assets.test.ts`, `lock-by-return-type.test.ts`, `batch-row-images.test.ts`, `review-form.tsx`, `adjustments.test.ts`, `books-lock.test.ts`, `db.test.ts`, `portal-reports.test.ts`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07800511508951406 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `fees/types.ts`, `auth.ts`, `documents/[id]/page.tsx`, `Badge`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `documents/actions.ts`, `modal.tsx`, `site-document.tsx`, `supabaseAdmin`, `staff/page.tsx`, `sign-off-actions.tsx`, `webhook.ts`, `module-pages.tsx`, `formatAmount`, `LinkButton`, `proposal-view.tsx`, `returns/load.ts`, `steps.ts`, `calendar/page.tsx`, `ledger/data.ts`, `Card`, `workpapers/page.tsx`, `marketing/page.tsx`, `fees/[id]/page.tsx`, `portalContext`, `books/forms.tsx`, `payroll/data.ts`, `@remixicon/react`, `ocr/run.ts`, `registrations/[id]/page.tsx`, `showDate`, `Notice`, `blocks.tsx`, `[id]/books/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `requireStaff`, `[employeeId]/page.tsx`, `showMonth`, `Centavos`, `ledger/types.ts`, `leads/[id]/page.tsx`, `profile.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `site/brand.ts`, `quote/page.tsx`, `quote.ts`, `batch/register.ts`, `filings/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `env.ts`, `app/settings/page.tsx`, `proof-upload.tsx`, `items.ts`, `clients/[id]/page.tsx`, `idle-watcher.tsx`, `payroll/forms.tsx`, `upload/page.tsx`, `tools/page.tsx`, `return-file-actions.ts`, `server-only`, `register-xlsx.ts`, `cycle/page.tsx`, `[slug]/page.tsx`, `notification-bell.tsx`, `move-bar.tsx`, `morning.ts`, `register/page.tsx`, `onboarding/page.tsx`, `fixed-assets/forms.tsx`, `calendar/staff.ts`, `app/documents/page.tsx`, `package.json`, `opengraph-image.tsx`, `cx`, `getIdentity`, `deadlines/actions.ts`, `review-form.tsx`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04017857142857143 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `auth.ts`, `documents/[id]/page.tsx`, `Badge`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `toCentavos`, `documents/actions.ts`, `modal.tsx`, `site-document.tsx`, `supabaseAdmin`, `staff/page.tsx`, `sign-off-actions.tsx`, `module-pages.tsx`, `formatAmount`, `LinkButton`, `proposal-view.tsx`, `returns/load.ts`, `steps.ts`, `calendar/page.tsx`, `Card`, `workpapers/page.tsx`, `marketing/page.tsx`, `fees/[id]/page.tsx`, `portalContext`, `books/forms.tsx`, `stat-cards.tsx`, `@remixicon/react`, `ocr/run.ts`, `how-we-work/page.tsx`, `registrations/[id]/page.tsx`, `cx.ts`, `showDate`, `Notice`, `blocks.tsx`, `[id]/books/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `requireStaff`, `[employeeId]/page.tsx`, `showMonth`, `Centavos`, `combobox.tsx`, `leads/[id]/page.tsx`, `button.tsx`, `profile.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `quote/page.tsx`, `quote.ts`, `batch/register.ts`, `filings/[id]/page.tsx`, `social-button.tsx`, `app/settings/page.tsx`, `proof-upload.tsx`, `items.ts`, `clients/[id]/page.tsx`, `idle-watcher.tsx`, `payroll/forms.tsx`, `upload/page.tsx`, `tools/page.tsx`, `return-file-actions.ts`, `server-only`, `template.ts`, `cycle/page.tsx`, `[slug]/page.tsx`, `notification-bell.tsx`, `move-bar.tsx`, `register/page.tsx`, `onboarding/page.tsx`, `fixed-assets/forms.tsx`, `app/documents/page.tsx`, `package.json`, `cx`, `getIdentity`, `deadlines/actions.ts`, `supabaseServer`, `review-form.tsx`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._