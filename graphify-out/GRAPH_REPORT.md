# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 961 files · ~791,383 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5954 nodes · 21063 edges · 205 communities (182 shown, 23 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 187 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `17063318`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- fees/types.ts
- package.json
- onboarding/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- formToObject
- Sign-in & Setup Docs
- public.ts
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
- cwt-tracker.ts
- scores/page.tsx
- compare.ts
- (site)/page.tsx
- button.tsx
- documents/[id]/page.tsx
- payroll/forms.tsx
- modal.tsx
- marketing/page.tsx
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- remittances/[id]/page.tsx
- webhook.ts
- tax-codes.ts
- deadlines/page.tsx
- formatAmount
- ref_node_path
- returns/types.ts
- registrations/forms.tsx
- percentage.ts
- books/export/route.ts
- work/page.tsx
- lock-bar.tsx
- structured-data.ts
- status.ts
- Apple Design
- filings/run.ts
- testing.ts
- quote/page.tsx
- lib/books/actions.ts
- books/forms.tsx
- Centavos
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- react
- @remixicon/react
- vitest
- ledger/data.ts
- how-we-work/page.tsx
- notification.tsx
- cx
- Pro components
- bulk-actions.ts
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- gemini.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- approval-memo.tsx
- manilaToday
- Recipes
- tools/page.tsx
- BoardUI page patterns
- Pro templates
- filings/actions.ts
- ledger/books.ts
- opening-checklist.tsx
- combobox.tsx
- rates.ts
- boardui
- documents/actions.ts
- getIdentity
- filings/[id]/page.tsx
- cycle/page.tsx
- payroll/data.ts
- workpapers.test.ts
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- year-end/page.tsx
- requireOwner
- calendar/callback/route.ts
- apply-migrations.sh
- batch/forms.tsx
- quote.ts
- returns/load.ts
- leads/forms.tsx
- layout.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- Badge
- transactions-actions.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- form-2307.tsx
- pending-review.tsx
- ocr/run.ts
- fixed-assets/page.tsx
- sign-off.ts
- supabaseServer
- ticked-allocation.test.ts
- file-upload.tsx
- review-form.tsx
- env.ts
- idle-watcher.tsx
- workpapers/load.ts
- addDays
- auth-templates.ts
- parallel-run.tsx
- server-only
- opening.ts
- financial-statements-view.tsx
- blocks.tsx
- [slug]/page.tsx
- site/brand.ts
- ledger.test.ts
- workpapers/page.tsx
- notification-bell.tsx
- move-bar.tsx
- deadlines/actions.ts
- template.ts
- leads/[id]/page.tsx
- binder/page.tsx
- app/requests/page.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- filters.tsx
- portal/requests/[id]/page.tsx
- register/page.tsx
- opengraph-image.tsx
- books/periods.ts
- registrations/[id]/page.tsx
- clients/[id]/page.tsx
- sign-off-actions.tsx
- app/settings/page.tsx
- settings/actions.ts
- morning.ts
- acting-approver.test.ts
- names.ts
- tieouts.test.ts
- bir-filing-calendar/page.tsx
- Building UIs with BoardUI
- lead-attribution.test.ts
- xlsx.ts
- db.test.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- split-bundled-pdfs.test.ts
- site-document.tsx
- login/page.tsx
- books-2307.test.ts
- funnel.test.ts
- leads-pipeline.test.ts
- tests/books.test.ts
- parallel-run.test.ts
- accept-form.tsx
- books-migration.test.ts
- seed.ts
- fixed-assets.test.ts
- ledger-closing.test.ts
- lock-by-return-type.test.ts
- tests/payroll.test.ts
- register-books.test.ts
- generate-qap-fixture.mjs
- templates/README.md
- telegram-uploads.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 367 edges
2. `cx` - 304 edges
3. `react` - 271 edges
4. `Notice()` - 255 edges
5. `Skeleton()` - 254 edges
6. `next` - 233 edges
7. `Button()` - 232 edges
8. `Badge()` - 182 edges
9. `Card()` - 182 edges
10. `vitest` - 182 edges

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

## Communities (205 total, 23 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.12
Nodes (38): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one(), portal2307() (+30 more)

### Community 1 - "index.ts"
Cohesion: 0.05
Nodes (21): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+13 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.07
Nodes (60): BooksContext, booksViewFor(), fmtMonth(), blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage() (+52 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.10
Nodes (24): EngagementRow, TaxpayerType, ExistingClient, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+16 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (34): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+26 more)

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

### Community 11 - "formToObject"
Cohesion: 0.12
Nodes (22): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), addClientUserAction(), fieldErrors(), FormState (+14 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "public.ts"
Cohesion: 0.14
Nodes (24): pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES, StartState, complexity() (+16 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "zod"
Cohesion: 0.09
Nodes (23): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+15 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (37): defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section, Statement (+29 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (42): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), form1701, form1702RT (+34 more)

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
Nodes (49): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), PortalCwt2307Page(), Tracker(), CwtLooseDocuments() (+41 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (37): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+29 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (46): CELL, FirmParallelRunPage(), monthShort(), Summary(), atcRows(), BookInvoiceRow, Bucket, compareParallelRun() (+38 more)

### Community 43 - "(site)/page.tsx"
Cohesion: 0.15
Nodes (24): FLOW_ICONS, GROUP_SPAN, HomePage(), metadata, ButtonLink(), Lockup(), SectionHeading(), Container() (+16 more)

### Community 44 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 45 - "documents/[id]/page.tsx"
Cohesion: 0.06
Nodes (72): Doc, ExceptionRow, ClientSelect(), AddBundleInvoice(), BOOKED_TYPES, BundleChild, BundleDocument(), DocumentReviewPage() (+64 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.05
Nodes (90): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+82 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "marketing/page.tsx"
Cohesion: 0.07
Nodes (51): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+43 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (32): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+24 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.09
Nodes (60): EmployerCard(), RemittancesDue(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS (+52 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (42): SPREADSHEET_TYPES, TelegramApi, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery() (+34 more)

### Community 54 - "tax-codes.ts"
Cohesion: 0.20
Nodes (14): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+6 more)

### Community 55 - "deadlines/page.tsx"
Cohesion: 0.13
Nodes (30): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+22 more)

### Community 56 - "formatAmount"
Cohesion: 0.09
Nodes (69): booksContext(), fmtDate(), one(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+61 more)

### Community 57 - "ref_node_path"
Cohesion: 0.07
Nodes (10): outDir, pkgDir, require, { version }, ctx, input, root, root (+2 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.04
Nodes (101): branch4(), branchOfTin(), HEAD_OFFICE, ParsedTin, payeeKeyOf(), tin9(), tinDashed(), tinDigits() (+93 more)

### Community 59 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (57): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+49 more)

### Community 60 - "percentage.ts"
Cohesion: 0.17
Nodes (32): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+24 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.12
Nodes (25): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+17 more)

### Community 62 - "work/page.tsx"
Cohesion: 0.17
Nodes (19): Action(), MyWork(), MyWorkPage(), short(), TONE, lastMonth(), loadMyWork(), MyWork (+11 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.16
Nodes (22): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+14 more)

### Community 64 - "structured-data.ts"
Cohesion: 0.14
Nodes (21): robots(), metadata, SiteLayout(), sitemap(), SiteBrand, BRAND_NAME, PRACTITIONER, SITE_URL (+13 more)

### Community 65 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.10
Nodes (43): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+35 more)

### Community 68 - "testing.ts"
Cohesion: 0.17
Nodes (19): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+11 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.15
Nodes (24): dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase (+16 more)

### Community 70 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (26): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+18 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (45): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+37 more)

### Community 72 - "Centavos"
Cohesion: 0.05
Nodes (101): GridRow, AlphaCols, AlphalistRow, buildAlphalist(), Certificates2316, form2316(), Form2316Data, Form2316Employer (+93 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.10
Nodes (48): sawtBuckets(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments() (+40 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (37): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+29 more)

### Community 77 - "react"
Cohesion: 0.06
Nodes (63): react, Batch(), BatchPage(), one(), toCentavos(), BankAccountsRoute(), CustomersRoute(), EmployeesRoute() (+55 more)

### Community 78 - "@remixicon/react"
Cohesion: 0.07
Nodes (51): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+43 more)

### Community 79 - "vitest"
Cohesion: 0.03
Nodes (24): pg, vitest, dir, root, root, root, root, root (+16 more)

### Community 80 - "ledger/data.ts"
Cohesion: 0.12
Nodes (26): BookEntry, CASH_FLOW_CLASSES, CashFlowClass, codes, PNL, Amendment, AmendmentStatus, BooksMonth (+18 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.15
Nodes (30): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+22 more)

### Community 82 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 83 - "cx"
Cohesion: 0.03
Nodes (78): ClientTab, UNDER, NotificationFilterTabs(), NotificationRowData, CHIP_COLORS, ChipProps, ChipVariant, styles (+70 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "bulk-actions.ts"
Cohesion: 0.16
Nodes (19): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DocumentCodes, slpCategoryFromCodes() (+11 more)

### Community 86 - "Notice"
Cohesion: 0.08
Nodes (84): setupMissingChartsAction(), BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm(), EntryForm() (+76 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (65): PortalClient, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat() (+57 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "gemini.ts"
Cohesion: 0.11
Nodes (18): OCR_DOC_TYPES, OCR_READ_FIELDS, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiJson() (+10 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (24): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+16 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "approval-memo.tsx"
Cohesion: 0.19
Nodes (13): amt(), ApprovalMemo(), Db, TIE, ReviewNote, approvalMemo(), Memo, MemoInput (+5 more)

### Community 94 - "manilaToday"
Cohesion: 0.13
Nodes (34): RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks() (+26 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "tools/page.tsx"
Cohesion: 0.18
Nodes (20): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), RepostRegisterButton() (+12 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "filings/actions.ts"
Cohesion: 0.20
Nodes (15): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+7 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+39 more)

### Community 101 - "opening-checklist.tsx"
Cohesion: 0.18
Nodes (13): Access, STATUS, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput, ChecklistItem, ItemStatus (+5 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (80): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItem(), ComboBoxItemProps, ComboBoxProps, ComboBoxSection() (+72 more)

### Community 103 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "documents/actions.ts"
Cohesion: 0.21
Nodes (14): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice(), Status() (+6 more)

### Community 106 - "getIdentity"
Cohesion: 0.12
Nodes (32): CloseRequestButton(), ReplyForm(), send(), ProofReview(), METHODS, ProofUpload(), send(), getIdentity (+24 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (52): bookKind, BookRow, bookStatus, Event, eventText, Filing(), FilingFile, FilingPage() (+44 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.08
Nodes (49): DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), one() (+41 more)

### Community 109 - "payroll/data.ts"
Cohesion: 0.10
Nodes (36): EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), certificatesFromRaw() (+28 more)

### Community 110 - "workpapers.test.ts"
Cohesion: 0.08
Nodes (15): BOOK_LOCK_FORMS, as(), client(), root, generateFilings(), send(), doc(), root (+7 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.06
Nodes (59): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+51 more)

### Community 114 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 115 - "requireOwner"
Cohesion: 0.08
Nodes (65): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+57 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.20
Nodes (17): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+9 more)

### Community 118 - "batch/forms.tsx"
Cohesion: 0.26
Nodes (12): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), loadBatchContext(), monthsBetween(), BatchAccount (+4 more)

### Community 119 - "quote.ts"
Cohesion: 0.10
Nodes (38): proposal(), EstimatedProfile, estimateProfile(), gapFor(), GapRow, has(), buildProposalQuote(), buildQuote() (+30 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.08
Nodes (49): loadAssets(), FinancialStatements, ATC_MASTER, AtcInfo, normalizeAtc(), row(), withNonDeductible(), dayBefore() (+41 more)

### Community 121 - "leads/forms.tsx"
Cohesion: 0.13
Nodes (37): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+29 more)

### Community 122 - "layout.ts"
Cohesion: 0.26
Nodes (13): bodyBlocks(), DEFAULT_BRAND, EmailAction, escapeHtml(), fullBrand(), linkify(), plainTextToHtml(), receivingLine() (+5 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.14
Nodes (17): accountLabel(), BatchCheck, BatchColumn, BatchRow, centavosOf(), checkRow(), findAccount(), isoDate() (+9 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "Badge"
Cohesion: 0.09
Nodes (51): ClientTabs(), ClientReturnsPage(), FilingRow, Returns(), Detail(), StatementPage(), FilingListRow, FilingTable() (+43 more)

### Community 126 - "transactions-actions.ts"
Cohesion: 0.25
Nodes (16): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+8 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (54): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+46 more)

### Community 128 - "read.test.ts"
Cohesion: 0.04
Nodes (108): RFC-4180, applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction() (+100 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.18
Nodes (13): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButton(), SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps (+5 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (48): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+40 more)

### Community 131 - "form-2307.tsx"
Cohesion: 0.13
Nodes (27): Print(), Print2307Page(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), PortalPrint2307Page(), Print() (+19 more)

### Community 132 - "pending-review.tsx"
Cohesion: 0.18
Nodes (13): BulkState, Booking, Codes, initialCodes(), ocrKeys(), PendingReview(), PendingRow, PendingTaxCodes (+5 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.09
Nodes (28): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+20 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 135 - "sign-off.ts"
Cohesion: 0.18
Nodes (12): availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner, preparer (+4 more)

### Community 136 - "supabaseServer"
Cohesion: 0.06
Nodes (62): nextConfig, next, setIncomeTaxMethodAction(), addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton() (+54 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.08
Nodes (37): DirectoryParty, ENTRY_STATUS, fmtDay(), fmtMonthOf(), ONLY_FOR, typeLabel, CODE_SOURCE_LABELS, PORTION_LABELS (+29 more)

### Community 140 - "env.ts"
Cohesion: 0.29
Nodes (8): maxDuration, POST(), supabaseEnv(), TelegramEnv, telegramEnv(), ClaimedNotification, telegramApi(), notifyTelegram()

### Community 141 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 142 - "workpapers/load.ts"
Cohesion: 0.20
Nodes (17): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+9 more)

### Community 143 - "addDays"
Cohesion: 0.12
Nodes (33): SafeguardsNotice(), addDays(), isWeekend(), parseIso(), toIso(), board, MARCO, none (+25 more)

### Community 144 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 145 - "parallel-run.tsx"
Cohesion: 0.13
Nodes (26): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+18 more)

### Community 146 - "server-only"
Cohesion: 0.14
Nodes (29): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), confirmMonthAction(), tellPreparer() (+21 more)

### Community 147 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 148 - "financial-statements-view.tsx"
Cohesion: 0.29
Nodes (7): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), PrintButton(), Statement

### Community 149 - "blocks.tsx"
Cohesion: 0.29
Nodes (9): Breadcrumb(), BreadcrumbItem(), Crumb, Crumbs(), H2_ON_NAVY, JsonLd(), QUOTE_LABEL, breadcrumbLd() (+1 more)

### Community 150 - "[slug]/page.tsx"
Cohesion: 0.16
Nodes (28): AboutPage(), HOW, metadata, BirCalendarPage(), BRING, ContactList(), ContactPage(), metadata (+20 more)

### Community 151 - "site/brand.ts"
Cohesion: 0.33
Nodes (8): metadata, QuotesClosed(), Start(), StartPage(), funnelLive(), clean(), FALLBACK_BRAND, phoneLinks()

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.13
Nodes (27): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+19 more)

### Community 154 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (81): GET(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus(), onVisible() (+73 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.26
Nodes (14): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+6 more)

### Community 156 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 157 - "template.ts"
Cohesion: 0.07
Nodes (33): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, jobField, ProposalJob (+25 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (43): NotesCard(), ClientNoteForm(), BookingLink(), DiscoveryCallForm(), LostForm(), ReopenForm(), Result(), ReviewerForm() (+35 more)

### Community 159 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 160 - "app/requests/page.tsx"
Cohesion: 0.20
Nodes (15): Requests(), RequestsPage(), Row, View, VIEWS, PortalRequests(), Requests(), Row (+7 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.12
Nodes (36): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), Interval, manilaInstant(), Admin (+28 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.21
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 164 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 165 - "portal/requests/[id]/page.tsx"
Cohesion: 0.52
Nodes (5): PortalRequest(), RequestDetail(), Thread(), ThreadMessage, when()

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "books/periods.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 169 - "registrations/[id]/page.tsx"
Cohesion: 0.14
Nodes (32): SectionTabs(), CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration() (+24 more)

### Community 170 - "clients/[id]/page.tsx"
Cohesion: 0.08
Nodes (44): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+36 more)

### Community 171 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.13
Nodes (33): RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), accountSchema (+25 more)

### Community 173 - "settings/actions.ts"
Cohesion: 0.12
Nodes (27): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+19 more)

### Community 174 - "morning.ts"
Cohesion: 0.13
Nodes (18): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+10 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 177 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 178 - "bir-filing-calendar/page.tsx"
Cohesion: 0.26
Nodes (10): metadata, textLink, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 179 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 180 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 181 - "xlsx.ts"
Cohesion: 0.23
Nodes (13): GET(), safe(), loadAccounts(), BATCH_COLUMNS, BATCH_KINDS, buildBatchTemplate(), cellText(), MAX_ROWS (+5 more)

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 186 - "site-document.tsx"
Cohesion: 0.13
Nodes (13): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteNotFound(), geist, geistMono (+5 more)

### Community 187 - "login/page.tsx"
Cohesion: 0.40
Nodes (5): errors, Form(), LoginPage(), notices, IDLE_MINUTES

### Community 188 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 189 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 190 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 191 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 193 - "accept-form.tsx"
Cohesion: 0.70
Nodes (3): acceptProposalAction(), AcceptState, contentHash()

### Community 194 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 196 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 197 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 200 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 202 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1575 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `ui.ts`, `fees/types.ts`, `package.json`, `onboarding/page.tsx`, `formToObject`, `public.ts`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `tax-codes.ts`, `deadlines/page.tsx`, `ref_node_path`, `returns/types.ts`, `registrations/forms.tsx`, `books/export/route.ts`, `work/page.tsx`, `lock-bar.tsx`, `structured-data.ts`, `status.ts`, `filings/run.ts`, `testing.ts`, `Centavos`, `@remixicon/react`, `ledger/data.ts`, `bulk-actions.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `gemini.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `approval-memo.tsx`, `manilaToday`, `filings/actions.ts`, `ledger/books.ts`, `opening-checklist.tsx`, `rates.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `payroll/data.ts`, `workpapers.test.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `requireOwner`, `calendar/callback/route.ts`, `quote.ts`, `returns/load.ts`, `layout.ts`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `pending-review.tsx`, `ocr/run.ts`, `fixed-assets/page.tsx`, `sign-off.ts`, `supabaseServer`, `ticked-allocation.test.ts`, `review-form.tsx`, `idle-watcher.tsx`, `addDays`, `server-only`, `opening.ts`, `financial-statements-view.tsx`, `ledger.test.ts`, `workpapers/page.tsx`, `notification-bell.tsx`, `move-bar.tsx`, `template.ts`, `leads/[id]/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `filters.tsx`, `register/page.tsx`, `books/periods.ts`, `registrations/[id]/page.tsx`, `clients/[id]/page.tsx`, `app/settings/page.tsx`, `settings/actions.ts`, `morning.ts`, `acting-approver.test.ts`, `names.ts`, `tieouts.test.ts`, `bir-filing-calendar/page.tsx`, `lead-attribution.test.ts`, `db.test.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `split-bundled-pdfs.test.ts`, `books-2307.test.ts`, `funnel.test.ts`, `leads-pipeline.test.ts`, `tests/books.test.ts`, `parallel-run.test.ts`, `books-migration.test.ts`, `fixed-assets.test.ts`, `ledger-closing.test.ts`, `lock-by-return-type.test.ts`, `tests/payroll.test.ts`, `register-books.test.ts`, `telegram-uploads.test.ts`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11649659863945579 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `zod`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `(site)/page.tsx`, `button.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `deadlines/page.tsx`, `formatAmount`, `registrations/forms.tsx`, `work/page.tsx`, `lock-bar.tsx`, `structured-data.ts`, `quote/page.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `@remixicon/react`, `how-we-work/page.tsx`, `notification.tsx`, `cx`, `Notice`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `tools/page.tsx`, `ledger/books.ts`, `combobox.tsx`, `documents/actions.ts`, `getIdentity`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `payroll/data.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `requireOwner`, `calendar/callback/route.ts`, `batch/forms.tsx`, `leads/forms.tsx`, `Badge`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `return-file-actions.ts`, `form-2307.tsx`, `pending-review.tsx`, `fixed-assets/page.tsx`, `supabaseServer`, `file-upload.tsx`, `review-form.tsx`, `idle-watcher.tsx`, `parallel-run.tsx`, `financial-statements-view.tsx`, `blocks.tsx`, `[slug]/page.tsx`, `site/brand.ts`, `workpapers/page.tsx`, `notification-bell.tsx`, `move-bar.tsx`, `deadlines/actions.ts`, `template.ts`, `leads/[id]/page.tsx`, `binder/page.tsx`, `app/requests/page.tsx`, `calendar/page.tsx`, `proposal-view.tsx`, `filters.tsx`, `portal/requests/[id]/page.tsx`, `register/page.tsx`, `registrations/[id]/page.tsx`, `clients/[id]/page.tsx`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `settings/actions.ts`, `site-document.tsx`, `login/page.tsx`, `accept-form.tsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05398110661268556 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `package.json`, `onboarding/page.tsx`, `formToObject`, `public.ts`, `zod`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `(site)/page.tsx`, `documents/[id]/page.tsx`, `payroll/forms.tsx`, `marketing/page.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `remittances/[id]/page.tsx`, `deadlines/page.tsx`, `formatAmount`, `registrations/forms.tsx`, `books/export/route.ts`, `work/page.tsx`, `lock-bar.tsx`, `structured-data.ts`, `quote/page.tsx`, `lib/books/actions.ts`, `books/forms.tsx`, `react`, `@remixicon/react`, `ledger/data.ts`, `cx`, `bulk-actions.ts`, `Notice`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `approval-memo.tsx`, `manilaToday`, `tools/page.tsx`, `filings/actions.ts`, `ledger/books.ts`, `opening-checklist.tsx`, `documents/actions.ts`, `getIdentity`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `payroll/data.ts`, `profile.ts`, `portal/page.tsx`, `year-end/page.tsx`, `requireOwner`, `calendar/callback/route.ts`, `batch/forms.tsx`, `leads/forms.tsx`, `Badge`, `transactions-actions.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `form-2307.tsx`, `pending-review.tsx`, `fixed-assets/page.tsx`, `review-form.tsx`, `env.ts`, `idle-watcher.tsx`, `parallel-run.tsx`, `server-only`, `financial-statements-view.tsx`, `blocks.tsx`, `[slug]/page.tsx`, `site/brand.ts`, `workpapers/page.tsx`, `notification-bell.tsx`, `move-bar.tsx`, `deadlines/actions.ts`, `leads/[id]/page.tsx`, `binder/page.tsx`, `app/requests/page.tsx`, `proposal-view.tsx`, `portal/requests/[id]/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `registrations/[id]/page.tsx`, `clients/[id]/page.tsx`, `sign-off-actions.tsx`, `app/settings/page.tsx`, `settings/actions.ts`, `xlsx.ts`, `site-document.tsx`, `accept-form.tsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._