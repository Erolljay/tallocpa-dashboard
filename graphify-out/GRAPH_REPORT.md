# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1019 files · ~853,246 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6248 nodes · 22307 edges · 212 communities (180 shown, 32 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `ade8dea8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- templatePayload
- migrate.yml
- ui.ts
- Review
- package.json
- formatAmount
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- tax-codes.ts
- Sign-in & Setup Docs
- PageHeader
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
- quote/page.tsx
- returns/types.ts
- index.ts
- lock-bar.tsx
- modal.tsx
- vitest
- scripts
- supabaseAdmin
- button.tsx
- remittances/[id]/page.tsx
- webhook.ts
- quote.ts
- binder/page.tsx
- collections/page.tsx
- proposal-view.tsx
- returns/load.ts
- steps.ts
- app/requests/[id]/page.tsx
- opening.ts
- year-end/page.tsx
- lib/books/actions.ts
- theme-toggle.tsx
- marketing/page.tsx
- Apple Design
- filings/run.ts
- testing.ts
- template.ts
- Centavos
- books/forms.tsx
- fixed-assets/page.tsx
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- clients/[id]/page.tsx
- manilaToday
- documents/labels.ts
- source.ts
- how-we-work/page.tsx
- [id]/books/page.tsx
- cx.ts
- Pro components
- remittances/forms.tsx
- Notice
- portalContext
- portal-billing.test.ts
- board.ts
- document-scanner.tsx
- [slug]/page.tsx
- LinkButton
- gemini.ts
- work/page.tsx
- Recipes
- payroll/data.ts
- BoardUI theming reference
- Pro templates
- calendar/staff.ts
- Centavos
- ledger/data.ts
- cx
- opening-checklist.tsx
- boardui
- leads/actions.ts
- cwt-tracker-view.tsx
- review-forms.tsx
- tieouts.test.ts
- documents/[id]/page.tsx
- arap.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- Review
- layout.ts
- filings/actions.ts
- apply-migrations.sh
- fees/types.ts
- auth-templates.ts
- cancel-server.ts
- leads/[id]/page.tsx
- calendar/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- auth.ts
- addDays
- holiday-list.ts
- read.test.ts
- fees/forms.tsx
- return-file-actions.ts
- app/settings/page.tsx
- react
- portal/returns/page.tsx
- transactions-actions.ts
- blocks.tsx
- client-form.tsx
- ticked-allocation.test.ts
- post-button.tsx
- onboarding/forms.tsx
- workpapers/load.ts
- payroll/forms.tsx
- Building UIs with BoardUI
- app/page.tsx
- items.ts
- payroll/types.ts
- month.ts
- @remixicon/react
- LinkButton
- pg
- tests/register.test.ts
- social-button.tsx
- month-complete.tsx
- generate-qap-fixture.mjs
- zod
- move-bar.tsx
- layout.ts
- review.ts
- lead-attribution.test.ts
- onboarding/page.tsx
- next
- Rework: one flow from lead to year-end
- status.ts
- site-document.tsx
- ledger.test.ts
- collections/forms.tsx
- register/page.tsx
- opengraph-image.tsx
- tests/proposal-email.test.ts
- Textarea
- copy-opencv.mjs
- bundle.ts
- supabaseServer
- cycle/page.tsx
- notification-bell.tsx
- acting-approver.test.ts
- fields.ts
- ref_node_fs
- @supabase/ssr
- contact-access.test.ts
- formatAmount
- contribution-remittances.test.ts
- digest.ts
- funnel.test.ts
- rates.ts
- inactive-client-portal.test.ts
- late-surcharges.test.ts
- sign-off.ts
- [clientId]/[year]/page.tsx
- leads-pipeline.test.ts
- ref_node_path
- parallel-run.test.ts
- eslint.config.mjs
- portal-statements-approval.test.ts
- books-migration.test.ts
- @techstark/opencv-js
- tests/books.test.ts
- deadlines/actions.ts
- defer-documents.test.ts
- sign-off-actions.tsx
- review-form.tsx
- lock-by-return-type.test.ts
- returns-books.test.ts
- approve-and-post.test.ts
- templates/README.md
- batch-row-images.test.ts
- batch-upload.test.ts
- money.ts
- engine.ts
- books-lock.test.ts
- payroll-books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 399 edges
2. `cx` - 313 edges
3. `react` - 283 edges
4. `Notice()` - 274 edges
5. `Skeleton()` - 258 edges
6. `Button()` - 250 edges
7. `next` - 245 edges
8. `vitest` - 196 edges
9. `Badge()` - 187 edges
10. `Card()` - 187 edges

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

## Communities (212 total, 32 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.07
Nodes (58): BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href() (+50 more)

### Community 1 - "templatePayload"
Cohesion: 0.07
Nodes (22): templatePayload(), as(), client(), root, generateFilings(), send(), as(), purchase() (+14 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.07
Nodes (52): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), SummaryCard(), fmt(), OpenInvoice, SettlementForm() (+44 more)

### Community 4 - "Review"
Cohesion: 0.09
Nodes (35): DocReviewActions(), DocumentsCard(), when(), AttachBatchImage(), attach(), DocumentUpload(), send(), upload() (+27 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "formatAmount"
Cohesion: 0.11
Nodes (59): booksContext(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+51 more)

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

### Community 11 - "tax-codes.ts"
Cohesion: 0.17
Nodes (17): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+9 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "PageHeader"
Cohesion: 0.07
Nodes (67): ClientList(), ClientsPage(), Row, SORTS, STATUS_GROUPS, Contacts(), ContactsPage(), SORTS (+59 more)

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
Nodes (44): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES (+36 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (65): BIR_LINES, BirLineKey, balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701() (+57 more)

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
Nodes (43): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), Rematch2307Button(), CwtActionState, markCwtFollowedUp() (+35 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (37): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+29 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (57): CELL, FirmParallelRunPage(), monthShort(), Summary(), KIND, REASON, Section(), shortDate() (+49 more)

### Community 43 - "quote/page.tsx"
Cohesion: 0.12
Nodes (35): dateFmt, loadItems(), loadSchedule(), loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel (+27 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.06
Nodes (74): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), REREAD_APPROVED, SKIP, withDirectory() (+66 more)

### Community 45 - "index.ts"
Cohesion: 0.05
Nodes (22): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+14 more)

### Community 46 - "lock-bar.tsx"
Cohesion: 0.17
Nodes (21): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+13 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (46): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), SearchHit, SearchKind (+38 more)

### Community 48 - "vitest"
Cohesion: 0.07
Nodes (7): vitest, root, root, root, root, root, root

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.11
Nodes (39): GET(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), cancelMyMeetingAction() (+31 more)

### Community 51 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.07
Nodes (65): EmployerCard(), ClientReturnsPage(), FilingRow, Returns(), RemittancesDue(), bookKind, BookRow, bookStatus (+57 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (45): maxDuration, POST(), TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked(), Choice (+37 more)

### Community 54 - "quote.ts"
Cohesion: 0.09
Nodes (39): PriceRow, proposal(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+31 more)

### Community 55 - "binder/page.tsx"
Cohesion: 0.38
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, PrintButton()

### Community 56 - "collections/page.tsx"
Cohesion: 0.18
Nodes (24): Client, CollectionsPage(), OpenDue, Overview(), Stat(), ageOpenItems(), AGING_BUCKETS, AgingBucket (+16 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.21
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.04
Nodes (60): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, DatFiles, datFiles(), Db, isDatKind(), MailAttachment (+52 more)

### Community 59 - "steps.ts"
Cohesion: 0.04
Nodes (116): addStepFile(), ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openYearRenewalsAction(), PROOF_TYPES (+108 more)

### Community 60 - "app/requests/[id]/page.tsx"
Cohesion: 0.14
Nodes (22): Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row, when(), CloseRequestButton() (+14 more)

### Community 61 - "opening.ts"
Cohesion: 0.16
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+9 more)

### Community 62 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 63 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (26): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+18 more)

### Community 64 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (66): ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable(), FirmMarketingPage() (+58 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.13
Nodes (23): Rule, PlannedObligation, DueRule, EfpsGroup, FilingChannel, Frequency, nextWorkingDay(), PeriodFilter (+15 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "template.ts"
Cohesion: 0.06
Nodes (38): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, jobField, jobGroupOf() (+30 more)

### Community 70 - "Centavos"
Cohesion: 0.06
Nodes (80): GridRow, MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv() (+72 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (42): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+34 more)

### Community 72 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.08
Nodes (61): SaleSplit, sawtBuckets(), annualAttachments(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS (+53 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "clients/[id]/page.tsx"
Cohesion: 0.14
Nodes (26): RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), NoteState, NotesCard(), ClientNoteForm(), ClientDetail(), ClientPage() (+18 more)

### Community 78 - "manilaToday"
Cohesion: 0.15
Nodes (19): Detail(), StatementPage(), ProposalSetup, profileFromStored(), JOB_GROUPS, JobBand, JobGroup, JobOption (+11 more)

### Community 79 - "documents/labels.ts"
Cohesion: 0.13
Nodes (22): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+14 more)

### Community 80 - "source.ts"
Cohesion: 0.07
Nodes (48): fmtDate(), PartyPage(), oldDocs(), qapBuckets(), datAddress(), datNameCols(), displayName(), fullAddress() (+40 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.11
Nodes (36): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+28 more)

### Community 82 - "[id]/books/page.tsx"
Cohesion: 0.20
Nodes (19): booksViewFor(), WithdrawReportButton(), BooksSummaryPage(), Summary(), fmtDate(), lastMonth(), Reports(), ReportsPage() (+11 more)

### Community 83 - "cx.ts"
Cohesion: 0.05
Nodes (48): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+40 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "remittances/forms.tsx"
Cohesion: 0.19
Nodes (26): NewParty(), NewPartyPage(), globalSearch(), HandlesContributionsSwitch(), RemittanceButton(), RemittanceFileUpload(), send(), requireStaff() (+18 more)

### Community 86 - "Notice"
Cohesion: 0.08
Nodes (87): setupMissingChartsAction(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm() (+79 more)

### Community 87 - "portalContext"
Cohesion: 0.08
Nodes (69): PortalClient, portalContext, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker() (+61 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "board.ts"
Cohesion: 0.10
Nodes (37): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+29 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "[slug]/page.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "LinkButton"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "gemini.ts"
Cohesion: 0.07
Nodes (25): OcrManyOutput, OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL (+17 more)

### Community 94 - "work/page.tsx"
Cohesion: 0.08
Nodes (50): nextConfig, next, addClientNoteAction(), GET(), RequestDetail(), RequestPage(), TaskDetail(), TaskPage() (+42 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.11
Nodes (37): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), Certificates2316 (+29 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (36): GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches(), Admin (+28 more)

### Community 100 - "Centavos"
Cohesion: 0.07
Nodes (48): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+40 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.10
Nodes (40): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton() (+32 more)

### Community 102 - "cx"
Cohesion: 0.03
Nodes (119): react-aria-components, ApprovedReview(), SheetPreview(), ZoomPreview(), switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE (+111 more)

### Community 103 - "opening-checklist.tsx"
Cohesion: 0.13
Nodes (23): Access, STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, ChecklistInput (+15 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "leads/actions.ts"
Cohesion: 0.14
Nodes (33): assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction(), recordCallAction() (+25 more)

### Community 106 - "cwt-tracker-view.tsx"
Cohesion: 0.35
Nodes (11): Cwt2307TrackerPage(), Tracker(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure(), money() (+3 more)

### Community 107 - "review-forms.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 108 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 109 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (43): file(), GET(), safe(), Payroll(), PayrollPage(), BOOKED_TYPES, BundleChild, PayrollDocument() (+35 more)

### Community 110 - "arap.ts"
Cohesion: 0.15
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+10 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "Review"
Cohesion: 0.20
Nodes (17): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+9 more)

### Community 115 - "layout.ts"
Cohesion: 0.17
Nodes (17): cycleMessage(), dayFmt, NoticeKind, showDay(), Due, bodyBlocks(), EmailAction, escapeHtml() (+9 more)

### Community 116 - "filings/actions.ts"
Cohesion: 0.15
Nodes (22): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+14 more)

### Community 118 - "fees/types.ts"
Cohesion: 0.07
Nodes (41): EngagementRow, acceptProposalAction(), AcceptState, TaxpayerType, complexity(), count(), EWT_CHOICES, first() (+33 more)

### Community 119 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 120 - "cancel-server.ts"
Cohesion: 0.18
Nodes (18): cancelMeetingAction(), disconnectCalendarAction(), FormState, DisconnectButton(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason() (+10 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (42): BookingLink(), DiscoveryCallForm(), LostForm(), ProposalSent, ReopenForm(), Result(), ReviewerForm(), bookedTime (+34 more)

### Community 122 - "calendar/page.tsx"
Cohesion: 0.27
Nodes (16): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant(), appBookedEvents(), addDays() (+8 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "auth.ts"
Cohesion: 0.11
Nodes (33): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail(), PayNow(), credit() (+25 more)

### Community 126 - "addDays"
Cohesion: 0.12
Nodes (27): CatchUpRow, CatchUpSection(), Queue(), ReviewPage(), Row, Section(), EndButton(), Acting() (+19 more)

### Community 127 - "holiday-list.ts"
Cohesion: 0.26
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+3 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (75): RFC-4180, SPREADSHEET_TYPES, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES (+67 more)

### Community 129 - "fees/forms.tsx"
Cohesion: 0.22
Nodes (17): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+9 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (46): RFC-2047, RFC-2822, Filing(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+38 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.08
Nodes (53): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+45 more)

### Community 132 - "react"
Cohesion: 0.06
Nodes (43): react, BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), JournalEntryRoute(), JournalRoute(), PaymentsNewPage(), PaymentsListPage() (+35 more)

### Community 133 - "portal/returns/page.tsx"
Cohesion: 0.36
Nodes (7): accessFor(), decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 134 - "transactions-actions.ts"
Cohesion: 0.30
Nodes (14): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+6 more)

### Community 135 - "blocks.tsx"
Cohesion: 0.05
Nodes (95): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+87 more)

### Community 136 - "client-form.tsx"
Cohesion: 0.06
Nodes (52): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setCatchUpAction() (+44 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 139 - "onboarding/forms.tsx"
Cohesion: 0.26
Nodes (14): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+6 more)

### Community 140 - "workpapers/load.ts"
Cohesion: 0.15
Nodes (21): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+13 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (58): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+50 more)

### Community 142 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 143 - "app/page.tsx"
Cohesion: 0.05
Nodes (72): DashboardStats(), FilingListRow, FilingTable(), OwnerSections(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView() (+64 more)

### Community 144 - "items.ts"
Cohesion: 0.20
Nodes (12): PayrollSetupPage(), Setup(), loadPayrollSettings(), BirCategory, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS (+4 more)

### Community 145 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 146 - "month.ts"
Cohesion: 0.22
Nodes (13): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+5 more)

### Community 147 - "@remixicon/react"
Cohesion: 0.07
Nodes (49): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+41 more)

### Community 148 - "LinkButton"
Cohesion: 0.19
Nodes (13): Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS, NewEntry() (+5 more)

### Community 149 - "pg"
Cohesion: 0.06
Nodes (10): pg, root, Row, root, root, Part, root, root (+2 more)

### Community 150 - "tests/register.test.ts"
Cohesion: 0.20
Nodes (4): root, approved(), as(), root

### Community 151 - "social-button.tsx"
Cohesion: 0.18
Nodes (13): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButton(), SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps (+5 more)

### Community 152 - "month-complete.tsx"
Cohesion: 0.28
Nodes (8): MonthComplete(), SentRow, StandingRow, TimelineRow, confirmMonthAction(), CycleState, undoMonthAction(), MissingRange

### Community 153 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 154 - "zod"
Cohesion: 0.17
Nodes (16): zod, GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+8 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.32
Nodes (13): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+5 more)

### Community 156 - "layout.ts"
Cohesion: 0.10
Nodes (39): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+31 more)

### Community 157 - "review.ts"
Cohesion: 0.43
Nodes (5): ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), quiet

### Community 158 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.16
Nodes (16): ClientTab, ClientTabs(), UNDER, fmtDate(), Onboarding(), OnboardingPage(), ItemState, MANUAL_ITEM_LABELS (+8 more)

### Community 160 - "next"
Cohesion: 0.08
Nodes (38): ApprovedRow, ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths(), Documents() (+30 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 163 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 164 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 165 - "collections/forms.tsx"
Cohesion: 0.16
Nodes (24): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+16 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 169 - "Textarea"
Cohesion: 0.17
Nodes (26): amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text(), ReplyForm(), send() (+18 more)

### Community 170 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 171 - "bundle.ts"
Cohesion: 0.18
Nodes (15): isSplittable(), MAX_BUNDLE_PAGES, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+7 more)

### Community 172 - "supabaseServer"
Cohesion: 0.06
Nodes (74): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), peso (+66 more)

### Community 173 - "cycle/page.tsx"
Cohesion: 0.11
Nodes (34): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload() (+26 more)

### Community 174 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (84): GET(), Content(), PortalNotificationSettingsPage(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged() (+76 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fields.ts"
Cohesion: 0.10
Nodes (27): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+19 more)

### Community 177 - "ref_node_fs"
Cohesion: 0.08
Nodes (8): dir, root, root, root, as(), attach(), root, root

### Community 180 - "formatAmount"
Cohesion: 0.27
Nodes (13): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), MonthDetail() (+5 more)

### Community 181 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 182 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 183 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 184 - "rates.ts"
Cohesion: 0.24
Nodes (17): AmountRate, CorporateRate, corporateRates(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate(), percentageTaxRate(), PercentRate (+9 more)

### Community 187 - "sign-off.ts"
Cohesion: 0.12
Nodes (21): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+13 more)

### Community 188 - "[clientId]/[year]/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 189 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 190 - "ref_node_path"
Cohesion: 0.06
Nodes (8): ctx, input, root, root, root, root, root, root

### Community 191 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 194 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 196 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 197 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 199 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 200 - "review-form.tsx"
Cohesion: 0.07
Nodes (50): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+42 more)

### Community 208 - "money.ts"
Cohesion: 0.08
Nodes (44): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+36 more)

### Community 209 - "engine.ts"
Cohesion: 0.12
Nodes (27): compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule, FilingInstance, fiscalYearOf() (+19 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1657 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `work/page.tsx` to `form-2307.ts`, `ui.ts`, `Review`, `package.json`, `formatAmount`, `PageHeader`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `quote/page.tsx`, `returns/types.ts`, `lock-bar.tsx`, `modal.tsx`, `supabaseAdmin`, `remittances/[id]/page.tsx`, `webhook.ts`, `binder/page.tsx`, `collections/page.tsx`, `proposal-view.tsx`, `returns/load.ts`, `steps.ts`, `app/requests/[id]/page.tsx`, `year-end/page.tsx`, `lib/books/actions.ts`, `marketing/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `clients/[id]/page.tsx`, `manilaToday`, `documents/labels.ts`, `source.ts`, `[id]/books/page.tsx`, `remittances/forms.tsx`, `portalContext`, `board.ts`, `[slug]/page.tsx`, `LinkButton`, `payroll/data.ts`, `calendar/staff.ts`, `Centavos`, `ledger/data.ts`, `cx`, `opening-checklist.tsx`, `leads/actions.ts`, `cwt-tracker-view.tsx`, `review-forms.tsx`, `documents/[id]/page.tsx`, `profile.ts`, `portal/page.tsx`, `Review`, `filings/actions.ts`, `fees/types.ts`, `cancel-server.ts`, `leads/[id]/page.tsx`, `calendar/page.tsx`, `batch/register.ts`, `auth.ts`, `addDays`, `fees/forms.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `react`, `portal/returns/page.tsx`, `transactions-actions.ts`, `blocks.tsx`, `client-form.tsx`, `post-button.tsx`, `onboarding/forms.tsx`, `payroll/forms.tsx`, `app/page.tsx`, `@remixicon/react`, `LinkButton`, `month-complete.tsx`, `zod`, `move-bar.tsx`, `layout.ts`, `onboarding/page.tsx`, `next`, `site-document.tsx`, `collections/forms.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `Textarea`, `supabaseServer`, `cycle/page.tsx`, `notification-bell.tsx`, `formatAmount`, `sign-off.ts`, `[clientId]/[year]/page.tsx`, `deadlines/actions.ts`, `sign-off-actions.tsx`, `review-form.tsx`, `money.ts`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07441688263606072 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `templatePayload`, `ui.ts`, `package.json`, `tax-codes.ts`, `PageHeader`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `returns/types.ts`, `index.ts`, `lock-bar.tsx`, `supabaseAdmin`, `remittances/[id]/page.tsx`, `webhook.ts`, `quote.ts`, `collections/page.tsx`, `returns/load.ts`, `steps.ts`, `app/requests/[id]/page.tsx`, `opening.ts`, `year-end/page.tsx`, `marketing/page.tsx`, `filings/run.ts`, `testing.ts`, `template.ts`, `Centavos`, `fixed-assets/page.tsx`, `source.ts`, `portalContext`, `portal-billing.test.ts`, `board.ts`, `document-scanner.tsx`, `[slug]/page.tsx`, `gemini.ts`, `work/page.tsx`, `calendar/staff.ts`, `Centavos`, `opening-checklist.tsx`, `leads/actions.ts`, `tieouts.test.ts`, `arap.ts`, `profile.ts`, `portal/page.tsx`, `layout.ts`, `filings/actions.ts`, `fees/types.ts`, `cancel-server.ts`, `leads/[id]/page.tsx`, `calendar/page.tsx`, `batch/register.ts`, `addDays`, `holiday-list.ts`, `read.test.ts`, `return-file-actions.ts`, `app/settings/page.tsx`, `blocks.tsx`, `client-form.tsx`, `ticked-allocation.test.ts`, `workpapers/load.ts`, `payroll/forms.tsx`, `app/page.tsx`, `month.ts`, `@remixicon/react`, `pg`, `tests/register.test.ts`, `zod`, `move-bar.tsx`, `layout.ts`, `review.ts`, `lead-attribution.test.ts`, `onboarding/page.tsx`, `next`, `status.ts`, `ledger.test.ts`, `register/page.tsx`, `tests/proposal-email.test.ts`, `bundle.ts`, `supabaseServer`, `cycle/page.tsx`, `notification-bell.tsx`, `acting-approver.test.ts`, `fields.ts`, `ref_node_fs`, `contact-access.test.ts`, `contribution-remittances.test.ts`, `digest.ts`, `funnel.test.ts`, `rates.ts`, `inactive-client-portal.test.ts`, `late-surcharges.test.ts`, `sign-off.ts`, `leads-pipeline.test.ts`, `ref_node_path`, `parallel-run.test.ts`, `portal-statements-approval.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `defer-documents.test.ts`, `review-form.tsx`, `lock-by-return-type.test.ts`, `returns-books.test.ts`, `approve-and-post.test.ts`, `batch-row-images.test.ts`, `batch-upload.test.ts`, `money.ts`, `engine.ts`, `books-lock.test.ts`, `payroll-books.test.ts`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Should `templatePayload` be split into smaller, more focused modules?**
  _Cohesion score 0.06970128022759602 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `Review`, `package.json`, `formatAmount`, `PageHeader`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `quote/page.tsx`, `lock-bar.tsx`, `modal.tsx`, `supabaseAdmin`, `button.tsx`, `remittances/[id]/page.tsx`, `binder/page.tsx`, `collections/page.tsx`, `proposal-view.tsx`, `steps.ts`, `app/requests/[id]/page.tsx`, `year-end/page.tsx`, `theme-toggle.tsx`, `marketing/page.tsx`, `template.ts`, `books/forms.tsx`, `fixed-assets/page.tsx`, `stat-cards.tsx`, `clients/[id]/page.tsx`, `manilaToday`, `documents/labels.ts`, `source.ts`, `how-we-work/page.tsx`, `[id]/books/page.tsx`, `cx.ts`, `remittances/forms.tsx`, `Notice`, `portalContext`, `board.ts`, `document-scanner.tsx`, `[slug]/page.tsx`, `work/page.tsx`, `payroll/data.ts`, `Centavos`, `ledger/data.ts`, `cx`, `leads/actions.ts`, `cwt-tracker-view.tsx`, `review-forms.tsx`, `documents/[id]/page.tsx`, `profile.ts`, `portal/page.tsx`, `Review`, `cancel-server.ts`, `leads/[id]/page.tsx`, `calendar/page.tsx`, `batch/register.ts`, `auth.ts`, `addDays`, `fees/forms.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `portal/returns/page.tsx`, `blocks.tsx`, `client-form.tsx`, `post-button.tsx`, `onboarding/forms.tsx`, `payroll/forms.tsx`, `app/page.tsx`, `items.ts`, `@remixicon/react`, `LinkButton`, `social-button.tsx`, `month-complete.tsx`, `zod`, `move-bar.tsx`, `onboarding/page.tsx`, `next`, `site-document.tsx`, `collections/forms.tsx`, `register/page.tsx`, `Textarea`, `supabaseServer`, `cycle/page.tsx`, `notification-bell.tsx`, `formatAmount`, `sign-off.ts`, `[clientId]/[year]/page.tsx`, `deadlines/actions.ts`, `sign-off-actions.tsx`, `review-form.tsx`, `money.ts`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._