# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1070 files · ~884,278 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6556 nodes · 23328 edges · 203 communities (184 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 224 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `1c77712f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- client
- migrate.yml
- ui.ts
- fees/types.ts
- devDependencies
- [key]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/[id]/page.tsx
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
- TalloCPA OS — AI Workforce (design note)
- Develop Commands
- cwt-tracker.ts
- scores/page.tsx
- parallel-run.tsx
- quote.ts
- returns/types.ts
- templatePayload
- register-xlsx.ts
- modal.tsx
- registrations/forms.tsx
- scripts
- returns/types.ts
- book/actions.ts
- requireStaff
- webhook.ts
- leads/[id]/page.tsx
- marketing/page.tsx
- requireOwner
- proposal-view.tsx
- returns/load.ts
- authorize/page.tsx
- fields.ts
- books/export/route.ts
- supabaseServer
- react
- lock-bar.tsx
- form.tsx
- Apple Design
- engine.ts
- testing.ts
- work/page.tsx
- payroll/payroll.test.ts
- books/forms.tsx
- fixed-assets/page.tsx
- Rules
- Animation Performance
- money.ts
- stat-cards.tsx
- filings/[id]/page.tsx
- 2316/page.tsx
- registrations/[id]/page.tsx
- parties/[id]/page.tsx
- how-we-work/page.tsx
- app/settings/notifications/page.tsx
- cx.ts
- Pro components
- lib/books/actions.ts
- form-1601c.ts
- portalContext
- portal-billing.test.ts
- theme-toggle.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- employees-xlsx.ts
- @remixicon/react
- Recipes
- compare.ts
- BoardUI page patterns
- Pro templates
- firm/parallel-run/page.tsx
- ledger/books.ts
- ledger/data.ts
- cx
- supabaseAdmin
- boardui
- ledger/types.ts
- layout.ts
- getIdentity
- leads/actions.ts
- Notice
- react
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- opening.ts
- requireOwner
- quote/page.tsx
- apply-migrations.sh
- fees/schedule.ts
- notification-settings-view.tsx
- notification-bell.tsx
- workpapers/page.tsx
- notifications/format.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- showDate
- notification-actions.tsx
- portal/layout.tsx
- read.test.ts
- register-books.test.ts
- return-file-actions.ts
- deadlines/actions.ts
- module-pages.tsx
- ocr/run.ts
- queries.ts
- blocks.tsx
- formToObject
- ticked-allocation.test.ts
- brand/actions.ts
- filed-returns.ts
- invoice-pages.tsx
- LinkButton
- cancel.ts
- deadlines/page.tsx
- transactions-actions.ts
- lock.ts
- next
- notifications-view.tsx
- fees/[id]/page.tsx
- contact-access.test.ts
- zod
- generate-qap-fixture.mjs
- app/documents/page.tsx
- bell-store.ts
- book-income.ts
- pending-review.tsx
- cycle/page.tsx
- compare.test.ts
- idle-watcher.tsx
- year-end/page.tsx
- index.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- template.ts
- books-migration.test.ts
- handler.ts
- register/page.tsx
- opengraph-image.tsx
- ledger.test.ts
- staff/page.tsx
- Building UIs with BoardUI
- terms.ts
- names.ts
- split-bundled-pdfs.test.ts
- books-2307.test.ts
- acting-approver.test.ts
- documents/labels.ts
- documents/actions.ts
- db.test.ts
- lead-attribution.test.ts
- pending-review.tsx
- contribution-remittances.test.ts
- app/settings/page.tsx
- onboarding/page.tsx
- rates.ts
- tests/proposal-email.test.ts
- portal-statements-approval.test.ts
- workpapers.test.ts
- social-button.tsx
- formatAmount
- vitest
- return-files.tsx
- site-document.tsx
- tests/books.test.ts
- sign-off-actions.tsx
- review/page.tsx
- pending-review.tsx
- templates/README.md
- toCentavos
- parallel-run.test.ts
- returns-sign-off.test.ts
- fixed-assets.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 420 edges
2. `cx` - 317 edges
3. `react` - 291 edges
4. `Notice()` - 285 edges
5. `Skeleton()` - 266 edges
6. `Button()` - 265 edges
7. `next` - 256 edges
8. `vitest` - 206 edges
9. `Badge()` - 195 edges
10. `Card()` - 195 edges

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

## Communities (203 total, 19 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.10
Nodes (45): booksContext(), BooksContext, booksViewFor(), one(), Certificates(), Staff2307Page(), Print(), Print2307Page() (+37 more)

### Community 1 - "client"
Cohesion: 0.04
Nodes (26): BOOK_LOCK_FORMS, as(), client(), root, addFiling(), root, approveIntoBooks(), as() (+18 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (53): fmtMonth(), BooksFrame(), WithdrawReportButton(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate() (+45 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.10
Nodes (31): FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), gapFor(), GapRow, has(), lastWholeMonths() (+23 more)

### Community 5 - "devDependencies"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "[key]/page.tsx"
Cohesion: 0.07
Nodes (70): RFC-2606, addWorkforceAction(), AiState, assignClientAction(), createAiLogin(), createKeyAction(), disconnectAppAction(), fieldErrors() (+62 more)

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
Cohesion: 0.14
Nodes (26): deleteBundleInvoiceAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice(), Status(), BOOKED_TYPES, BundleChild (+18 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "PageHeader"
Cohesion: 0.06
Nodes (73): @remixicon/react, RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), fmtMonth(), frequencyLabel (+65 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.09
Nodes (22): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, pg@^8.23.1, react@19.3.0, react-aria-components@^1.22.1 (+14 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (36): defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section, Statement (+28 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.07
Nodes (106): annualAttachments(), balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+98 more)

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
Cohesion: 0.10
Nodes (19): 10. Data model (first draft), 11. Build order, 12. Open items, 1. The idea in one paragraph, 2. Principles, 3. The AI employees, 4.1 The in-app model is swappable, 4. Where they run and what they cost (+11 more)

### Community 40 - "cwt-tracker.ts"
Cohesion: 0.07
Nodes (57): Cwt2307TrackerPage(), Tracker(), amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), PortalCwt2307Page() (+49 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "parallel-run.tsx"
Cohesion: 0.13
Nodes (26): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+18 more)

### Community 43 - "quote.ts"
Cohesion: 0.09
Nodes (40): PriceRow, corp, items, proposal(), buildProposalQuote(), JobBand, jobField, JobGroup (+32 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.08
Nodes (50): branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDigits(), tinHasBranch(), agentBackground() (+42 more)

### Community 45 - "templatePayload"
Cohesion: 0.06
Nodes (61): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setCatchUpAction() (+53 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.11
Nodes (32): file(), GET(), safe(), buildEmployeeTemplate(), sortItems(), draftToTemplate(), initialDraft(), CheckedRegister (+24 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (45): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), SearchHit, SearchKind (+37 more)

### Community 48 - "registrations/forms.tsx"
Cohesion: 0.04
Nodes (92): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+84 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "returns/types.ts"
Cohesion: 0.06
Nodes (27): FinancialStatements, client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q (+19 more)

### Community 51 - "book/actions.ts"
Cohesion: 0.13
Nodes (32): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+24 more)

### Community 52 - "requireStaff"
Cohesion: 0.09
Nodes (66): EmployerCard(), RemittancesDue(), MonthRemittances(), GET(), ListRow, ORDER, Remittance(), RemittancePage() (+58 more)

### Community 53 - "webhook.ts"
Cohesion: 0.11
Nodes (41): ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF, CODES (+33 more)

### Community 54 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (41): NotesCard(), ClientNoteForm(), DiscoveryCallForm(), LostForm(), ProposalEmailForm(), ProposalForm(), ReopenForm(), ReviewerForm() (+33 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.09
Nodes (31): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+23 more)

### Community 56 - "requireOwner"
Cohesion: 0.09
Nodes (47): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+39 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.06
Nodes (59): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, LOCKED_STATUSES, qapBuckets(), sawtBuckets(), ATC_MASTER, AtcInfo (+51 more)

### Community 59 - "authorize/page.tsx"
Cohesion: 0.06
Nodes (64): copy(), allowAction(), check(), Checked, ConsentState, denyAction(), ConsentForm(), ConsentRequest (+56 more)

### Community 60 - "fields.ts"
Cohesion: 0.08
Nodes (39): DirectoryParty, ENTRY_STATUS, fmtDay(), fmtMonthOf(), ONLY_FOR, typeLabel, BatchRow, CODE_SOURCE_LABELS (+31 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.16
Nodes (17): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+9 more)

### Community 62 - "supabaseServer"
Cohesion: 0.05
Nodes (65): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), addBundleInvoiceAction() (+57 more)

### Community 63 - "react"
Cohesion: 0.07
Nodes (46): JournalEntryRoute(), NewEntry(), NewEntryPage(), JournalView(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage() (+38 more)

### Community 64 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (28): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+20 more)

### Community 65 - "form.tsx"
Cohesion: 0.13
Nodes (37): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+29 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.05
Nodes (68): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+60 more)

### Community 68 - "testing.ts"
Cohesion: 0.13
Nodes (20): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+12 more)

### Community 69 - "work/page.tsx"
Cohesion: 0.09
Nodes (40): RequestDetail(), RequestPage(), Row, Action(), MyWork(), MyWorkPage(), short(), TONE (+32 more)

### Community 70 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (80): GridRow, MonthGrid(), toInput(), AlphaCols, AlphalistRow, buildAlphalist(), Certificates2316, certificatesFromRaw() (+72 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (39): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+31 more)

### Community 72 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "money.ts"
Cohesion: 0.21
Nodes (14): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+6 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (47): DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent, PlainStatCard(), Stat (+39 more)

### Community 77 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (38): FilingRow, FilingListRow, worksheetTaxDue(), bookKind, BookRow, bookStatus, Event, eventText (+30 more)

### Community 78 - "2316/page.tsx"
Cohesion: 0.34
Nodes (10): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+2 more)

### Community 79 - "registrations/[id]/page.tsx"
Cohesion: 0.11
Nodes (32): addStepFile(), removeStepFile(), startStepFileUpload(), StepBadge(), StepRow, caseStatus, CertificateDetails, certificateLabel() (+24 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.09
Nodes (36): fmtDate(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress(), listNameCols(), Names (+28 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "app/settings/notifications/page.tsx"
Cohesion: 0.14
Nodes (20): maxDuration, POST(), Content(), NotificationSettingsPage(), TelegramLinkButton(), TelegramSwitch(), TelegramUnlinkButton(), AnchorButton() (+12 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (77): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+69 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "lib/books/actions.ts"
Cohesion: 0.12
Nodes (29): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+21 more)

### Community 86 - "form-1601c.ts"
Cohesion: 0.13
Nodes (29): tinDashed(), alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell() (+21 more)

### Community 87 - "portalContext"
Cohesion: 0.12
Nodes (52): Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat(), BooksSection() (+44 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "theme-toggle.tsx"
Cohesion: 0.07
Nodes (43): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+35 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "employees-xlsx.ts"
Cohesion: 0.12
Nodes (19): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+11 more)

### Community 94 - "@remixicon/react"
Cohesion: 0.10
Nodes (43): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+35 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "compare.ts"
Cohesion: 0.15
Nodes (21): atcRows(), Bucket, compareParallelRun(), DocumentReason, FigureGroup, fmtMonthShort(), KIND_OF_DOC, monthOf() (+13 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "firm/parallel-run/page.tsx"
Cohesion: 0.20
Nodes (15): CELL, FirmParallelRunPage(), monthShort(), Summary(), MonthComparison, MonthStatus, unmatchedIds(), vatMonths() (+7 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (46): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+38 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.12
Nodes (31): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+23 more)

### Community 102 - "cx"
Cohesion: 0.05
Nodes (75): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps, ComboBoxSelectionMode (+67 more)

### Community 103 - "supabaseAdmin"
Cohesion: 0.12
Nodes (36): disconnectCalendarAction(), FormState, GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE (+28 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "ledger/types.ts"
Cohesion: 0.07
Nodes (42): Accounts(), AccountsPage(), GROUPS, Access, STATUS, Row, Asset, CASH_FLOW_CLASSES (+34 more)

### Community 106 - "layout.ts"
Cohesion: 0.08
Nodes (34): dir, readme, templates, digestMessage(), DigestRow, longDay(), peso, time() (+26 more)

### Community 107 - "getIdentity"
Cohesion: 0.15
Nodes (28): amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text(), CatchUpRecorded, send() (+20 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.11
Nodes (38): assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction(), recordCallAction() (+30 more)

### Community 109 - "Notice"
Cohesion: 0.07
Nodes (91): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+83 more)

### Community 110 - "react"
Cohesion: 0.14
Nodes (19): react, blankLine(), InvoiceForm(), InvoiceFormValue, TransactionJournal(), PortalReport(), Report(), when() (+11 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.07
Nodes (42): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), birSchema, blank() (+34 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (49): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, StandingRow (+41 more)

### Community 114 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 115 - "requireOwner"
Cohesion: 0.08
Nodes (55): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), CHARGE_SUGGESTIONS (+47 more)

### Community 116 - "quote/page.tsx"
Cohesion: 0.14
Nodes (22): loadTaxOnFee(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+14 more)

### Community 118 - "fees/schedule.ts"
Cohesion: 0.12
Nodes (26): QuerySource, instantView(), conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num() (+18 more)

### Community 119 - "notification-settings-view.tsx"
Cohesion: 0.20
Nodes (14): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor() (+6 more)

### Community 120 - "notification-bell.tsx"
Cohesion: 0.23
Nodes (17): Bell(), markReadLocally(), useBellData(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell() (+9 more)

### Community 121 - "workpapers/page.tsx"
Cohesion: 0.05
Nodes (82): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+74 more)

### Community 122 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (43): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+35 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "showDate"
Cohesion: 0.09
Nodes (45): metadata, Shared(), SharedStatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref() (+37 more)

### Community 126 - "notification-actions.tsx"
Cohesion: 0.18
Nodes (16): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+8 more)

### Community 127 - "portal/layout.tsx"
Cohesion: 0.09
Nodes (31): switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, BusinessBar(), ClosingNotice(), Nav(), PortalLayout() (+23 more)

### Community 128 - "read.test.ts"
Cohesion: 0.04
Nodes (85): RFC-4180, exceljs, geminiJson(), BirCategory, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS (+77 more)

### Community 129 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (43): RFC-2047, RFC-2822, GET(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction(), ReturnFileState (+35 more)

### Community 131 - "deadlines/actions.ts"
Cohesion: 0.42
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 132 - "module-pages.tsx"
Cohesion: 0.07
Nodes (43): BankAccountsRoute(), SearchParams, BooksList(), Column, ListRow, RowLink(), CustomersRoute(), EmployeesRoute() (+35 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (46): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+38 more)

### Community 134 - "queries.ts"
Cohesion: 0.20
Nodes (13): GET(), isNotificationKind(), BELL_LIMIT, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications(), loadBellData() (+5 more)

### Community 135 - "blocks.tsx"
Cohesion: 0.05
Nodes (97): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+89 more)

### Community 136 - "formToObject"
Cohesion: 0.11
Nodes (30): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+22 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "brand/actions.ts"
Cohesion: 0.23
Nodes (12): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+4 more)

### Community 139 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 140 - "invoice-pages.tsx"
Cohesion: 0.08
Nodes (38): fmtDate(), INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE (+30 more)

### Community 141 - "LinkButton"
Cohesion: 0.08
Nodes (68): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+60 more)

### Community 142 - "cancel.ts"
Cohesion: 0.26
Nodes (11): cancelMeetingAction(), cancelMyMeetingAction(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail(), manilaWhen() (+3 more)

### Community 143 - "deadlines/page.tsx"
Cohesion: 0.05
Nodes (90): ClientReturnsPage(), Returns(), DashboardStats(), FilingTable(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage() (+82 more)

### Community 144 - "transactions-actions.ts"
Cohesion: 0.38
Nodes (11): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+3 more)

### Community 145 - "lock.ts"
Cohesion: 0.23
Nodes (10): amount(), INCOME_TAX, LockFiling, lockFormsFor(), lockingFiling(), lockKind(), PAYROLL, PURCHASES (+2 more)

### Community 146 - "next"
Cohesion: 0.12
Nodes (38): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), cancelDiscoveryCall(), CancelResult (+30 more)

### Community 147 - "notifications-view.tsx"
Cohesion: 0.30
Nodes (11): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, fullDateTime() (+3 more)

### Community 148 - "fees/[id]/page.tsx"
Cohesion: 0.11
Nodes (40): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+32 more)

### Community 149 - "contact-access.test.ts"
Cohesion: 0.15
Nodes (4): root, HASH, LEAD, root

### Community 150 - "zod"
Cohesion: 0.11
Nodes (24): zod, clientRef, findClient(), getClient, listMyClients, notYours(), upcomingFilings, isoDate (+16 more)

### Community 151 - "generate-qap-fixture.mjs"
Cohesion: 0.14
Nodes (9): outDir, pkgDir, require, { version }, api, ctx, fn, rows (+1 more)

### Community 152 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (29): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending() (+21 more)

### Community 153 - "bell-store.ts"
Cohesion: 0.42
Nodes (10): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+2 more)

### Community 154 - "book-income.ts"
Cohesion: 0.27
Nodes (9): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, NonDeductibleRow (+1 more)

### Community 155 - "pending-review.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "cycle/page.tsx"
Cohesion: 0.11
Nodes (32): DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, shift() (+24 more)

### Community 157 - "compare.test.ts"
Cohesion: 0.29
Nodes (9): BookInvoiceRow, differs(), ParallelBooksRow, ParallelRunInput, agreeing(), book(), invoice(), line() (+1 more)

### Community 158 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 159 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 160 - "index.ts"
Cohesion: 0.05
Nodes (26): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+18 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.22
Nodes (20): DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), Interval, manilaInstant() (+12 more)

### Community 163 - "template.ts"
Cohesion: 0.12
Nodes (18): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS (+10 more)

### Community 164 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "handler.ts"
Cohesion: 0.07
Nodes (40): asAi(), borrow(), callsToday(), denied(), handleMcp(), log(), manilaDay(), McpRequest (+32 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 169 - "staff/page.tsx"
Cohesion: 0.42
Nodes (7): BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 170 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 171 - "terms.ts"
Cohesion: 0.48
Nodes (4): acceptedQuote(), canonicalContent(), defaultTerms(), ProposalContent

### Community 172 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 173 - "split-bundled-pdfs.test.ts"
Cohesion: 0.29
Nodes (3): bundle(), Part, root

### Community 174 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "documents/labels.ts"
Cohesion: 0.12
Nodes (25): Doc, Row, Doc, Documents(), FolderKey, FOLDERS, Item, MONTHS (+17 more)

### Community 177 - "documents/actions.ts"
Cohesion: 0.08
Nodes (38): ReplyForm(), AttachBatchImage(), attach(), DocumentUpload(), send(), upload(), Item, typeFromName() (+30 more)

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 180 - "pending-review.tsx"
Cohesion: 0.18
Nodes (13): BulkState, Booking, Codes, initialCodes(), ocrKeys(), PendingReview(), PendingRow, PendingTaxCodes (+5 more)

### Community 181 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 182 - "app/settings/page.tsx"
Cohesion: 0.18
Nodes (22): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+14 more)

### Community 183 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (32): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+24 more)

### Community 184 - "rates.ts"
Cohesion: 0.20
Nodes (21): split(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+13 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.15
Nodes (7): maxDuration, POST(), mcpConnector(), HASH, LEAD, root, Row

### Community 187 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 188 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 189 - "formatAmount"
Cohesion: 0.19
Nodes (16): PortalPrint2307Page(), Print(), portal2307Href(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+8 more)

### Community 190 - "vitest"
Cohesion: 0.02
Nodes (36): pg, dir, poolConfig(), ctx, input, root, root, root (+28 more)

### Community 192 - "return-files.tsx"
Cohesion: 0.50
Nodes (7): ActionButton(), EsubmissionControls(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), startReturnFileUpload()

### Community 193 - "site-document.tsx"
Cohesion: 0.08
Nodes (24): GlobalNotFound(), metadata, apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter (+16 more)

### Community 194 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 196 - "sign-off-actions.tsx"
Cohesion: 0.26
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 199 - "review/page.tsx"
Cohesion: 0.13
Nodes (25): CatchUpRow, CatchUpSection(), Queue(), ReviewPage(), Row, Section(), EndButton(), Acting() (+17 more)

### Community 200 - "pending-review.tsx"
Cohesion: 0.16
Nodes (19): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DocumentCodes, slpCategoryFromCodes() (+11 more)

### Community 208 - "toCentavos"
Cohesion: 0.07
Nodes (47): AGENCIES, Db, LOANS, p(), PayrollRuns(), Run, applyColumnsAction(), done() (+39 more)

### Community 211 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 212 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 214 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

## Knowledge Gaps
- **31 isolated node(s):** `RFC-7591`, `RFC-8414`, `RFC-9728`, `RFC-9728`, `RFC-7636` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1742 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `testing.ts` to `form-2307.ts`, `client`, `ui.ts`, `fees/types.ts`, `devDependencies`, `[key]/page.tsx`, `PageHeader`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `quote.ts`, `returns/types.ts`, `templatePayload`, `registrations/forms.tsx`, `returns/types.ts`, `book/actions.ts`, `requireStaff`, `webhook.ts`, `leads/[id]/page.tsx`, `returns/load.ts`, `authorize/page.tsx`, `fields.ts`, `books/export/route.ts`, `supabaseServer`, `lock-bar.tsx`, `form.tsx`, `engine.ts`, `work/page.tsx`, `payroll/payroll.test.ts`, `fixed-assets/page.tsx`, `money.ts`, `filings/[id]/page.tsx`, `parties/[id]/page.tsx`, `portalContext`, `portal-billing.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `@remixicon/react`, `ledger/books.ts`, `supabaseAdmin`, `ledger/types.ts`, `layout.ts`, `leads/actions.ts`, `react`, `profile.ts`, `portal/page.tsx`, `opening.ts`, `requireOwner`, `quote/page.tsx`, `fees/schedule.ts`, `workpapers/page.tsx`, `notifications/format.ts`, `batch/register.ts`, `portal/layout.tsx`, `read.test.ts`, `register-books.test.ts`, `return-file-actions.ts`, `module-pages.tsx`, `ocr/run.ts`, `blocks.tsx`, `formToObject`, `ticked-allocation.test.ts`, `filed-returns.ts`, `invoice-pages.tsx`, `cancel.ts`, `deadlines/page.tsx`, `lock.ts`, `next`, `fees/[id]/page.tsx`, `contact-access.test.ts`, `zod`, `app/documents/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `compare.test.ts`, `idle-watcher.tsx`, `year-end/page.tsx`, `index.ts`, `calendar/page.tsx`, `books-migration.test.ts`, `handler.ts`, `register/page.tsx`, `ledger.test.ts`, `terms.ts`, `names.ts`, `split-bundled-pdfs.test.ts`, `books-2307.test.ts`, `acting-approver.test.ts`, `db.test.ts`, `lead-attribution.test.ts`, `pending-review.tsx`, `contribution-remittances.test.ts`, `app/settings/page.tsx`, `onboarding/page.tsx`, `rates.ts`, `tests/proposal-email.test.ts`, `portal-statements-approval.test.ts`, `workpapers.test.ts`, `vitest`, `tests/books.test.ts`, `review/page.tsx`, `pending-review.tsx`, `toCentavos`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `fixed-assets.test.ts`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **What connects `RFC-7591`, `RFC-8414`, `RFC-9728` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0998185117967332 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `fees/types.ts`, `devDependencies`, `[key]/page.tsx`, `documents/[id]/page.tsx`, `PageHeader`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `parallel-run.tsx`, `templatePayload`, `register-xlsx.ts`, `modal.tsx`, `registrations/forms.tsx`, `book/actions.ts`, `requireStaff`, `leads/[id]/page.tsx`, `marketing/page.tsx`, `requireOwner`, `proposal-view.tsx`, `returns/load.ts`, `authorize/page.tsx`, `fields.ts`, `react`, `lock-bar.tsx`, `form.tsx`, `work/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `money.ts`, `filings/[id]/page.tsx`, `2316/page.tsx`, `registrations/[id]/page.tsx`, `parties/[id]/page.tsx`, `app/settings/notifications/page.tsx`, `lib/books/actions.ts`, `portalContext`, `theme-toggle.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `@remixicon/react`, `firm/parallel-run/page.tsx`, `ledger/books.ts`, `ledger/data.ts`, `supabaseAdmin`, `ledger/types.ts`, `getIdentity`, `leads/actions.ts`, `Notice`, `react`, `profile.ts`, `portal/page.tsx`, `requireOwner`, `quote/page.tsx`, `notification-bell.tsx`, `workpapers/page.tsx`, `batch/register.ts`, `showDate`, `notification-actions.tsx`, `portal/layout.tsx`, `return-file-actions.ts`, `deadlines/actions.ts`, `module-pages.tsx`, `queries.ts`, `blocks.tsx`, `formToObject`, `brand/actions.ts`, `invoice-pages.tsx`, `LinkButton`, `deadlines/page.tsx`, `transactions-actions.ts`, `next`, `notifications-view.tsx`, `fees/[id]/page.tsx`, `app/documents/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `idle-watcher.tsx`, `year-end/page.tsx`, `calendar/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `documents/labels.ts`, `documents/actions.ts`, `pending-review.tsx`, `app/settings/page.tsx`, `onboarding/page.tsx`, `tests/proposal-email.test.ts`, `formatAmount`, `return-files.tsx`, `site-document.tsx`, `sign-off-actions.tsx`, `review/page.tsx`, `pending-review.tsx`, `toCentavos`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.03843466107617051 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `fees/types.ts`, `devDependencies`, `[key]/page.tsx`, `documents/[id]/page.tsx`, `PageHeader`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `parallel-run.tsx`, `quote.ts`, `templatePayload`, `modal.tsx`, `registrations/forms.tsx`, `book/actions.ts`, `requireStaff`, `leads/[id]/page.tsx`, `marketing/page.tsx`, `requireOwner`, `proposal-view.tsx`, `authorize/page.tsx`, `fields.ts`, `supabaseServer`, `react`, `lock-bar.tsx`, `form.tsx`, `work/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `money.ts`, `stat-cards.tsx`, `filings/[id]/page.tsx`, `2316/page.tsx`, `registrations/[id]/page.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `app/settings/notifications/page.tsx`, `cx.ts`, `portalContext`, `theme-toggle.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `@remixicon/react`, `firm/parallel-run/page.tsx`, `ledger/books.ts`, `ledger/data.ts`, `cx`, `supabaseAdmin`, `ledger/types.ts`, `getIdentity`, `leads/actions.ts`, `Notice`, `profile.ts`, `portal/page.tsx`, `requireOwner`, `quote/page.tsx`, `notification-settings-view.tsx`, `notification-bell.tsx`, `workpapers/page.tsx`, `batch/register.ts`, `showDate`, `notification-actions.tsx`, `portal/layout.tsx`, `deadlines/actions.ts`, `module-pages.tsx`, `queries.ts`, `blocks.tsx`, `invoice-pages.tsx`, `LinkButton`, `deadlines/page.tsx`, `transactions-actions.ts`, `fees/[id]/page.tsx`, `app/documents/page.tsx`, `bell-store.ts`, `pending-review.tsx`, `cycle/page.tsx`, `idle-watcher.tsx`, `year-end/page.tsx`, `calendar/page.tsx`, `register/page.tsx`, `staff/page.tsx`, `documents/labels.ts`, `documents/actions.ts`, `pending-review.tsx`, `app/settings/page.tsx`, `onboarding/page.tsx`, `social-button.tsx`, `formatAmount`, `return-files.tsx`, `site-document.tsx`, `sign-off-actions.tsx`, `review/page.tsx`, `toCentavos`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._